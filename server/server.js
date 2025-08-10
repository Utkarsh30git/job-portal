import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import User from './models/User.js'; // Import User model

// Initialize express
const app = express()

// Connect to MongoDB
await connectDB();

// Middleware for webhooks (IMPORTANT: Raw body for webhook signature verification)
app.use('/webhooks', express.raw({ type: 'application/json' }));

// Regular middleware for other routes
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API Working')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Test route to check database connection and users
app.get('/test-db', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const users = await User.find({}).limit(5).select('clerkId email firstName lastName createdAt');
    
    res.json({
      message: 'Database connection successful',
      userCount: userCount,
      users: users,
      databaseName: process.env.MONGODB_URI ? 'Connected' : 'Not connected'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database test failed',
      message: error.message
    });
  }
});

// Manual user sync route (for testing)
app.get('/sync-users', async (req, res) => {
  try {
    // This is a simple test route to manually create a user
    const testUser = new User({
      clerkId: 'test_' + Date.now(),
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    });
    
    await testUser.save();
    
    res.json({
      message: 'Test user created',
      user: testUser
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create test user',
      message: error.message
    });
  }
});

// Webhook route
app.post('/webhooks', clerkWebhooks);

// Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Available routes:')
  console.log('- GET / (API status)')
  console.log('- GET /test-db (Test database connection)')
  console.log('- GET /sync-users (Create test user)')
  console.log('- POST /webhooks (Clerk webhook)')
})