import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res)=>{
    try {
        const {name,email,password,city,role} = req.body
    
        const lowerEmail = email.toLowerCase()
        
        const existingUser = await User.findOne({email:lowerEmail})
        if(existingUser){
            return res.status(409).json({message:"User already exists"})
        }
        const user = await User.create({ name, email: lowerEmail, password, role: assignedRole, city })

        return res.status(201).json(
            {
                message:"Registration successfull",
                user: {
                    _id:user._id,
                    name,
                    email:lowerEmail,
                    city,
                    role: user.role
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
        
        const user = await User.findOne({email:lowerEmail})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({_id:user._id,role:user.role},process.env.JWTSECRET,{expiresIn:"3d"})

        return res.status(200).json({
            message: "Login successful",
            token
        })
    } catch (error) {
        console.log("Error in login of user ",error);
        return res.status(500).json({message:"Error in login of user "})
    }
}

export const getMe = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password")
        return res.status(200).json({
            message: "User fetched",
            user
            })
        
    } catch (error) {
        console.log("Error in getting info of user ",error);
        return res.status(500).json({message:"Error in getting info of user "})
    }
}