import dbConnection from "@/config/mongodb";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



// Create a new Address for the authentication user | POST /api/user/add-address | Private (clerk authentication)
export async function POST(req) {
    try {
        const {userId} = getAuth(req)
        const {address} = await req.json()
        
        await dbConnection();
        const newAddress = await Address.create({...address, userId,})
       
        return NextResponse.json({success:true, message: "Address Added", newAddress})

    }catch (error) {
        return NextResponse.json({success:false, message: error.message})
    }
}