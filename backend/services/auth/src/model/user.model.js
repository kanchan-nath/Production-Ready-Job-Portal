import mongoose, { model, Schema } from "mongoose"

const userSchema = new Schema ({
    userName:{
        type:String,
        required: true,
    },
    

}, {timestamps: true})

export const User = new mongoose.model("User", userSchema)