import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Create new stripe order of authenticated user | POST /api/order/stripe | Private (Clerk authentication required)
export async function POST(req) {
    try {
        const {userId} = getAuth(req)
        const {address, items} =await req.json()
        const origin = req.headers.get("origin")

        //validate incoming payload
        if(!address || !items || items.length === 0){
            return NextResponse.json({success:false, message:"Invalid order data"})
        }

        //Calculate total payable amount
        let amount = 0
        let productData = [];
        for (const item of items){
            const product = await Product.findById(item.product)
            if(!product) continue

            productData.push({
                name:product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            })

            amount += product.offerPrice * item.quantity
        }

        // Add 2% Tax
        const taxAmount = Math.floor(amount * 0.02)
        const finalAmount = amount + taxAmount

        // test the order flow directly - save order directly
         const order = await Order.create({
                userId,
                address,
                items,
                amount: finalAmount,
                date: Date.now(),
                paymentType: "Stripe"
        })

        //line items for products
        const line_items = productData.map((item)=>({
            price_data: {
                currency: "usd",
                product_data: {name: item.name},
                unit_amount: item.price * 100 // price without tax
            },
            quantity: item.quantity,
        }));

        //Add tax as a seperate line items
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {name: "Tax (2%)"},
                unit_amount: taxAmount * 100 // tax in cents
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/order-confirmation`,
            cancel_url: `${origin}/cart`,
            payment_intent_data: {
                metadata: {
                    orderId: order._id.toString(),
                        userId,
                },
            },
            metadata: {
                orderId: order._id.toString(),
                    userId,
            },
        })

        const url = session.url

        return NextResponse.json({success: true, url})

    } catch (error) {
        console.log("orderr creation error: ", error)
        return NextResponse.json({success: false, message: error.message})
    }

}