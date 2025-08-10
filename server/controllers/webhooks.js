import { Webhook } from 'svix';
import User from '../models/User.js'; // We'll create this model

export const clerkWebhooks = async (req, res) => {
  try {
    console.log('🔔 Webhook received');
    
    // Get the webhook secret from environment variables
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!WEBHOOK_SECRET) {
      console.error('❌ Missing CLERK_WEBHOOK_SECRET');
      return res.status(500).json({ error: 'Missing webhook secret' });
    }

    // Get the headers and body
    const headers = req.headers;
    const payload = req.body;

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
      // Verify the webhook signature
      evt = wh.verify(JSON.stringify(payload), headers);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Extract the data from the event
    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    console.log(`📩 Processing event: ${eventType} for user: ${id}`);

    // Handle different event types
    switch (eventType) {
      case 'user.created':
        try {
          // Check if user already exists (prevent duplicates)
          const existingUser = await User.findOne({ clerkId: id });
          
          if (existingUser) {
            console.log('⚠️  User already exists in database');
            return res.status(200).json({ message: 'User already exists' });
          }

          // Create new user in MongoDB
          const newUser = new User({
            clerkId: id,
            email: attributes.email_addresses?.[0]?.email_address,
            firstName: attributes.first_name || '',
            lastName: attributes.last_name || '',
            imageUrl: attributes.image_url || '',
            createdAt: new Date(),
            updatedAt: new Date()
          });

          await newUser.save();
          
          console.log('✅ User created successfully in MongoDB:', {
            id: newUser._id,
            clerkId: id,
            email: newUser.email
          });

        } catch (createError) {
          console.error('❌ Error creating user:', createError);
          // Don't return error to Clerk - let it retry
          if (createError.code === 11000) {
            console.log('Duplicate key error - user already exists');
            return res.status(200).json({ message: 'User already exists' });
          }
          throw createError;
        }
        break;

      case 'user.updated':
        try {
          const updatedUser = await User.findOneAndUpdate(
            { clerkId: id },
            {
              email: attributes.email_addresses?.[0]?.email_address,
              firstName: attributes.first_name || '',
              lastName: attributes.last_name || '',
              imageUrl: attributes.image_url || '',
              updatedAt: new Date()
            },
            { new: true }
          );

          if (updatedUser) {
            console.log('✅ User updated successfully:', updatedUser.email);
          } else {
            console.log('⚠️  User not found for update:', id);
          }
        } catch (updateError) {
          console.error('❌ Error updating user:', updateError);
          throw updateError;
        }
        break;

      case 'user.deleted':
        try {
          const deletedUser = await User.findOneAndDelete({ clerkId: id });
          
          if (deletedUser) {
            console.log('✅ User deleted successfully:', deletedUser.email);
          } else {
            console.log('⚠️  User not found for deletion:', id);
          }
        } catch (deleteError) {
          console.error('❌ Error deleting user:', deleteError);
          throw deleteError;
        }
        break;

      default:
        console.log(`ℹ️  Unhandled event type: ${eventType}`);
    }

    // Return success response to Clerk
    return res.status(200).json({ 
      message: 'Webhook processed successfully',
      eventType: eventType,
      userId: id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Webhook processing failed:', error);
    
    // Return error response to Clerk
    return res.status(500).json({ 
      error: 'Webhook processing failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};