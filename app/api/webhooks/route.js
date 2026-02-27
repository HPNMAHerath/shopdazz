import dbConnection from "@/config/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { err } from "inngest/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
    const body = await req.text() //RAW body
    const sig = req.headers.get("stripe-signature")

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        console.error("Webhools signature error: ", err.message)
        return NextResponse.json({success:false, message:err.message})
    }

    await dbConnection()

    //handle checkout session and expiration
    if(event.type === "checkout.session.completed"){
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        const userId = session.metadata?.userId;

        if(orderId){
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
        }
        if(userId){
            await User.findIdByAndUpdate(userId, {cartItems: {}})
        }

        console.log("chekout.session.completed processed: ", orderId)
    } else if(event.type === "checkout.session.expired"){
        const session = event.data.object;
        const orderId = session.metadata?.orderId;

        if(orderId){
            await Order.findByIdAndDelete(orderId)
            console.log("chekout.session.expired deleted order: ", orderId)
        }
    } else {
        // ignore oter events
        console.log("Ignored stripe events: ", event.type)
    }

    return NextResponse.json({received: true})
   
    } catch (error) {
        console.error("Webhook handler error: ", error)
        return NextResponse.json({success:false, message:error.message})
    }
}