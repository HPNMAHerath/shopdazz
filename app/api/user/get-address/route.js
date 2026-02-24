import dbConnection from "@/config/mongodb";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



// Get all saved  Address for the authentication user | GET /api/user/get-address | Private (clerk authentication)
export async function GET(req) {
    try {
        const {userId} = getAuth(req)
        
        await dbConnection();
        const addresses = await Address.find({userId})
       
        return NextResponse.json({success:true, addresses})

    }catch (error) {
        return NextResponse.json({success:false, message: error.message})
    }
}