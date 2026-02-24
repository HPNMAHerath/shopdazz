import dbConnection from "@/config/mongodb";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import  {v2 as cloudinary} from "cloudinary"
import authSeller from "@/lib/authSeller";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLDN_NAME,
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_API_SECRET,
})

// Create a new product and upload images to Cloudinary | POST /api/product/add | Private (seller only)
export async function POST(req) {
    try {
        const {userId} = getAuth(req)

        //Validate seller authorization
        const isSeller = await authSeller(userId)
        if(!isSeller){
            return NextResponse.json({success:false, messsage: "Not Authorizaed"})
        }

        const formData = await req.formData()

        // EXtracr Product fields
        const name = formData.get("name")
        const description = formData.get("description")
        const category = formData.get("category")
        const subCategory = formData.get("subCategory")
        const price = formData.get("price")
        const offerPrice = formData.get("offerPrice")
        const popular = formData.get("popular")

        //Extract product images
        const files = formData.getAll("images")
        if(!files || files.length === 0){
            return NextResponse.json({success:false, message: "No files upload"})
        }

        //Upload images to Cloudinary
        const uploadResults = await Promise.all(files.map(async (file)=> {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            return new Promise((resolve, reject)=>{
                const stream = cloudinary.uploader.upload_stream(
                    {resource_type: 'auto'},
                    (error, result)=> {
                        if(error) reject(error)
                        else resolve(result)
                    }
                )
                stream.end(buffer)
            })
        }))

        const images = uploadResults.map((item)=> item.secure_url)
        const isPopular = popular === "true " || popular === true

        await dbConnection()

        // Create product category
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            subCategory,
            price:Number(price),
            offerPrice:Number(offerPrice),
            images,
            popular: isPopular,
            date: Date.now()
        })

        return NextResponse.json({success:true, message: "Product Added", newProduct})

    }catch (error) {
        return NextResponse.json({success:false, message: error.message})
    }
}