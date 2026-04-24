import express from "express"
import {protect} from "../middlewares/protect.js"
import { authorizeRoles } from "../middlewares/role.js"
import { bookSlot } from "../controllers/slot.controller.js"

const router = express.Router()

router.post("/book-slot",protect,authorizeRoles("user"),bookSlot)
router.post("/create-slot", protect, authorizeRoles("admin"), createSlot)


export default router