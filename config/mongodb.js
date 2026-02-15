import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) throw new Error("MONGO_URI is missing")

let dbCache = global.mongoose

if(!dbCache) {
    dbCache = global.mongoose = {conn: null, promise: null}
}

async function dbConnection(){
    //Return existing connection if present
    if(dbCache.conn) return dbCache.conn

    //Create a new connection promise if none exists
    if(!dbCache.promise) {
        const options = {
            dbName: "shopdazz", //Change if needed
            bufferCommands: false, // prevent mongoose from buffering operations
        }

        dbCache.promise = mongoose.connect(MONGO_URI, options).then(mongoose => {
            console.log ("✔️ MongoDB connected")
            return mongoose
        }).catch(err => {
            console.log("❌ MongoDB connection failed: ", err.message)
            throw err

        })
    }

    //Await the promise and cahe the connection object
    dbCache.conn = await dbCache.promise
    return dbCache.conn
}

export default dbConnection