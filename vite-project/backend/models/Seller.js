import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    item:{
        type:String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    expire_info:{
        type: String,
        required: true
    },
    pickup_info:{
        type: String,
        required: true
    }
},{timestamps:true});

const Seller = mongoose.model("sellers",sellerSchema);
export default Seller;