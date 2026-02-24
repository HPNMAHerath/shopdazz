import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { inngest } from "@/config/inngest";

// Create new order of authenticated user | POST /api/order/create | Private (Clerk authentication required)
export async function POST(req) {
    try {
        const {userId} = getAuth(req)
        const {address, items} =await req.json()

        //validate incoming payload
        if(!address || !items || items.length === 0){
            return NextResponse.json({success:false, message:"Invalid order data"})
        }

        //Calculate total payable amount
        let amount = 0
        for (const item of items){
            const product = await Product.findById(item.product)
            if(!product) continue

            amount += product.offerPrice * item.quantity
        }

        // Add 2% Tax
        const fiinalAmount = amount + Math.floor(amount * 0.02)

        await inngest.send({
            name: "order/created",
            data: {
                userId,
                address,
                items,
                amount: fiinalAmount,
                date: Date.now(),
                paymentType: "COD"    
            }
        })

        // comment the event and test the order flow directly - save order directly
        //await Order.create({
        //        userId,
        //        address,
        //        items,
        //        amount: fiinalAmount,
         //       date: Date.now(),
         //       paymentType: "COD"
        //})

        // Clear user cart after order placement
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({success: true, message:"order Placed"})

    } catch (error) {
        console.log("orderr creation error: ", error)
        return NextResponse.json({success: false, message: error.message})
    }

}