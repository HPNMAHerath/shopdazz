import dbConnection from "@/config/mongodb";
import Product from "@/models/Product";
import Address from "@/models/Address";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/lib/authSeller";



// fetch all orders for seller | GET /api/order/seller-list | Private (seller only)
export async function GET(req) {
    try {
        const {userId} = getAuth(req)
        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({success:false, message: "Not Authorized"})
        }

        await dbConnection();

        //Fetch orders
        const orders = await Order.find({$or: [{paymentType: "COD"}, {paymentType: "Stripe", isPaid: true}]}).populate("address items.product")

        return NextResponse.json({success:true, orders})

    }catch (error) {
        return NextResponse.json({success:false, message: error.message})
    }
}