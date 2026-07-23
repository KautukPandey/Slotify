import express from "express"
import {protect} from "../middlewares/protect.js"
import { providerProtect } from "../middlewares/providerProtect.js"
import { createSlot,getAvailableSlots,getMySlots } from "../controllers/slot.controller.js"
import { createSlotSchema,getAvailableSlotsSchema } from "../validations/slot.validation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router()

router.post("/slots",protect,providerProtect,validate(createSlotSchema),createSlot)
router.get("/slots",validate(getAvailableSlotsSchema),getAvailableSlots)
router.get("/slots/me", protect, providerProtect, getMySlots)

export default router