import {User} from "../models/user.model.js"
import bcrypt from "bcrypt"
import { genTokenAndSetCookie } from "../utils/generateToken.js";

export async function signUp(req, res) {
    try {
        const { email, username, password} = req.body;

        if(!email || !username || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(!emailRegEx.test(email)){
            return res.status(400).json({message: "Invalid email address"});
        }

        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const isUserExists = await User.findOne({email:email})

        if(isUserExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const isUsernameExists = await User.findOne({username:username})

        if(isUsernameExists){
            return res.status(400).json({message:"Username already taken"});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({username,email,password:hashedPassword})
        genTokenAndSetCookie(newUser._id,res)
        await newUser.save()

        return res.status(201).json({message: "User registered successfully", user:{
            ...newUser._doc, password:""
        }})

    } catch (error) {
       console.log("Error in the signup controller" + error.message)
        res.status(500).json({ message: "internal server error" })
    }
}

export async function login(req,res){
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        const user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({message:"No such User exists!"})
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid Password"})
        }

        genTokenAndSetCookie(user._id,res)

        res.status(200).json({message:"Login Successful",
            user:{
                ...user._doc,password:""
            }
        })

    } catch (error) {
        console.log("Error in the login controller "+ error.message )
        res.status(500).json({message:"internal server error"})
    }
}

export async function logout(req,res){
    try {
        res.clearCookie("jwt-password",{
            httpOnly:true,
            sameSite:"Strict",
            secure:process.env.NODE_ENV === "production"
        })
        res.status(200).json({message:"Logout Successful"})
    } catch (error) {
        console.log("Error in the logout controller "+ error.message )
        res.status(500).json({message:"internal server error"})
    }
    
}

export async function authCheck(req, res) {
    try {
        res.stauts(200).json({user:req.user})
    } catch (error) {
        console.log("Error in the authCheck controller "+ error.message )
        res.status(500).json({message:"internal server error"})
    }
}