import { Inngest } from "inngest";
import  dbConnection  from "./mongodb";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "shopdazz-app" });

//HAndle user creation - to save user data to database
export const syncUserCreated = inngest.createFunction(
    { id: "sync-clerk-user-created" },
    { event: "clerk/user.created" },
    async ({ event }) => {
  
      await dbConnection();
  
      const data = event.data;
  
      // Safe email extraction
      const primaryEmail = data.email_addresses?.[0]?.email_address;
  
      if (!primaryEmail) {
        throw new Error("User email not found in Clerk event");
      }
  
      const userData = {
        _id: data.id,
        email: primaryEmail,
        name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
        imageUrl: data.image_url,
      };
  
      await User.create(userData);
    }
  )


//Sync updated Clerk user data into MongoDB
export const syncUserUpdated = inngest.createFunction(
    {id: "sync-clerk-user-updated"},
    {event: "clerk/user.updated"},
    async ({event})=> {
        const {id, first_name, last_name, email_address, image_url} = event.data

        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: image_url
        }

        await dbConnection()
        await User.findByIdAndUpdate(id, userData)
    }
)

// Sync user deletion from clerk to mongoDB
export const syncUserDeleted = inngest.createFunction(
    {id: "sync-clerk-user-deleted"},
    {event: "clerk/user.deleted"},
    async ({event})=> {
        const {id} = event.data

        await dbConnection()
        await User.findByIdAndDelete(id)
    }
)

// Batch create orders using Inngest
export const createUserOrders = inngest.createFunction(
  {
    id:'create-user-order',
    //Batch config: process up to 5 events of after 5 seconds
    batchEvents: {
      maxSize: 5,
      timeout: '5s'
    }

  },
  {event: 'order/created'},

  //Handler for batched events
  async ({events})=>{
    //Convert incoming events into order documents
    const orders = events.map(({data})=>({
      userId: data.userId,
      items: data.items,
      amount: data.amount,
      address: data.address,
      date: data.date,
      paymentType: data.paymentType
    }))

    // iinsert all orders at once
    await dbConnection()
    await Order.insertMany(orders)

    return {success: true, processed: orders.length}
  }
)