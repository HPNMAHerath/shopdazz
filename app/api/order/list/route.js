import dbConnection from "@/config/mongodb";
import Product from "@/models/Product";
import Address from "@/models/Address";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



// fetch all orders for authenticated user | GET /api/order/list | Private (Clerk Authentication required)
export async function GET(req) {
    try {
        const {userId} = getAuth(req)

        await dbConnection();

        //Fetch orders
        const orders = await Order.find({userId, $or: [{paymentType: "COD"}, {paymentType: "Stripe", isPaid: true}]}).populate("address items.product")

        return NextResponse.json({success:true, orders})

    }catch (error) {
        return NextResponse.json({success:false, message: error.message})
    }
}