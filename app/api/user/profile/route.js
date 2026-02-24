import dbConnection from "@/config/mongodb";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Fetch authentication user's full profile from MongoDB | GET /api/user/profile | Private
export async function GET(req) {
    try{
        const {userId} = getAuth(req)
        if(!userId){
            return NextResponse.json({success:false, message: "Unauthorized access"})
        }

        await dbConnection()

        const user = await User.findById(userId)
        if(!user){
            return NextResponse.json({succcess:false, message:"User not found"})
        }

        return NextResponse.json({success:true, user})


    }catch (error) {
        console.error("GET /api/user/profile error:", error)
        return NextResponse.json({success:true, message: "Something went wrong while fetching the user"})
    }
}


