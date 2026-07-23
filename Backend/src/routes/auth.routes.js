import express from "express"
import {registerUser,loginUser,getMe} from "../controllers/auth.controller.js"
import { protect } from "../middlewares/protect.js"
import { validate } from "../middlewares/validate.js";
import { registerSchema , loginSchema } from "../validations/auth.validation.js";

const router = express.Router()

router.post("/register",validate(registerSchema),registerUser)
router.post("/login",validate(loginSchema),loginUser)
router.get("/getMe",protect,getMe)

export default router
