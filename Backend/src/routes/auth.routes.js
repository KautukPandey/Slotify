import express from "express"
import {registerUser,loginUser,getMe} from "../controllers/auth.controller.js"
import { protect } from "../middlewares/protect.js"


const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getMe",protect,getMe)

export default router
