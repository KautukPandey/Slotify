import jwt from "jsonwebtoken"

export const protect = (req,res,next) => {
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

        req.user = decoded

        next()
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({message:"Unauthorized"})
    }
}