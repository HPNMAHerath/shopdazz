import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const authSeller = async (userId)=>{
    try {
        const client = clerkClient()
        const user = await client.user.getUser(userId)

        const isSeller =user?.publicMetaData?.role === "seller"
        return isSeller
    }catch (error) {
        return NextResponse.json({success:false, message: error.message})
    }
}

export default authSeller