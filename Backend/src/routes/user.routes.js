import express from "express"
import {protect} from "../middlewares/protect.js"

const router = express.Router()

router.get("/profile",protect,(req,res)=>{
    return res.status(200).json({
        message: "User profile",
        user: req.user
    })
})

export default router