import { serve } from "inngest/next";
import { createUserOrders, inngest, syncUserCreated, syncUserDeleted, syncUserUpdated } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreated,
    syncUserUpdated, 
    syncUserDeleted,
    createUserOrders,
  ],
});