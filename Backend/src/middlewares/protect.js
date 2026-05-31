import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protect = async(req,res,next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({message: "Unauthorized"})
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const token = authHeader.split(" ")[1]
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token,process.env.JWTSECRET)
        const user = await User.findById(decoded._id)
        if(!user){
            return res.status(401).json({message: "User does not exists"})
        }
        req.user = user
        
        next()
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({message:"Unauthorized"})
    }
}