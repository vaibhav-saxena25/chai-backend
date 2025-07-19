import mongoose, { Schema } from "mongoose";

const subscriptonSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Subscription = mongoose.model("Subscription", subscriptonSchema);