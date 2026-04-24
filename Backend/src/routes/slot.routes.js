import express from "express"
import {protect} from "../middlewares/protect.js"
import { authorizeRoles } from "../middlewares/role.js"
import { bookSlot, createSlot, getAvailableSlots } from "../controllers/slot.controller.js"

const router = express.Router()

router.patch("/book/:slotId",protect,authorizeRoles("user"),bookSlot)
router.post("/create", protect, authorizeRoles("admin"), createSlot)
router.get("/available",getAvailableSlots)

export default router