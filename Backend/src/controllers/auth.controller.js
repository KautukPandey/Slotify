import User from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"Bad request!! Fields cannot be empty"})
        }
        const lowerEmail = email.toLowerCase()
        if(!lowerEmail.includes('@')){
            return res.status(400).json({message:"Invalid email format"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const existingUser = await User.findOne({email:lowerEmail})
        if(existingUser){
            return res.status(409).json({message:"User already exists"})
        }
        const user = await User.create({name,email:lowerEmail,password})

        return res.status(201).json(
            {
                message:"Registration successfull",
                user: {
                    _id:user._id,
                    name,
                    email:lowerEmail
                }
            }
        )

    } catch (error) {
        console.log("Error in registration of user ",error);
        return res.status(500).json({message:"Error in registration of user "})
    }
}

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"Fields cannot be empty"})
        }
        const lowerEmail = email.toLowerCase()
        

        const user = await User.findOne({email:lowerEmail})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({_id:user._id,role:user.role},process.env.JWTSECRET,{expiresIn:"3days"})

        return res.status(200).json({
            message: "Login successful",
            token
        })
    } catch (error) {
        console.log("Error in login of user ",error);
        return res.status(500).json({message:"Error in login of user "})
    }
}