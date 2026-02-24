import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    completeName: {type:String, required: true},
    phone: {type:String, required: true},
    zipcode: {type:String, required: true},
    city: {type:String, required: true},
    state: {type:String, required: true},
    country: {type:String, required: true},
    streetAddress: {type:String, required: true},
}, )

const Address = mongoose.models.address || mongoose.model('address', addressSchema)

export default Address