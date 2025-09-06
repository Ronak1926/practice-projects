import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    generatedPasswords:{
        type:Array,
        default:[]
    }
})

export const User = mongoose.model("User",userSchema)