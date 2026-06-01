import express from "express"
import {protect} from "../middlewares/protect.js"
import { providerProtect } from "../middlewares/providerProtect.js"
import { createSlot,getAvailableSlots,getMySlots } from "../controllers/slot.controller.js"

const router = express.Router()

router.post("/slots",protect,providerProtect,createSlot)
router.get("/slots",getAvailableSlots)
router.get("/slots/me", protect, providerProtect, getMySlots)

export default router