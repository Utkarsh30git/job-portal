import { Webhook } from "svix";
import User from "../models/User.js";

// API Controlller Function to Manage Clerk User with database
 export const clerkWebhooks = async (req, res) => {
    try{

        // create a Svix instance with clerk Webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);


        // Verifying Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting data from request body
        const { type, data } = req.body;

        // Switch Cases for different Events 
        switch (type) {
             // Handle user created event
            case "user.created":{

               const userData ={
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                imageUrl:data.image_url,
                resume:''
               }
               await User.create(userData);
               res.json({})
               break;
            }
               
              // Handle user updated event   
            case "user.updated":{
                const userData = {
                
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                imageUrl:data.image_url,
               
               }
               await User.findByIdAndUpdate(data.id, userData);
               res.json({})
               break;
            }
               
               // Handle user deleted event   
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
               res.json({})
               break;
            }
              
                
            default:
                // Handle unknown event type
                break;
        }

    }
    catch (error) {
        console.log(error.message);
        res.json({success:false,message:'Webhooks Error'})
    }
}
