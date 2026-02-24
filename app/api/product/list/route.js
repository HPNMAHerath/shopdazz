import dbConnection from "@/config/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";



// fetch all products | GET /api/product/list | Public
export async function GET(req) {
    try {

        await dbConnection();
        
        const products = await Product.find({})

        return NextResponse.json({success:true, products})

    }catch (error) {
        console.error("GET /api/product/list error: ", error)
        return NextResponse.json({success:false, message: error.message})
    }
}