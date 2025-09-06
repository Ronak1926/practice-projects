import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"

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
        
        const salt = await bcrypt.gensalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({username,email,password:hashedPassword})

        await newUser.save()

        return res.status(201).json({message: "User registered successfully", user:{
            ...newUser._doc, password:""
        }})

    } catch (error) {
       console.log("Error in the signup controller" + error.message)
        res.status(500).json({ message: "internal server error" })
    }
}