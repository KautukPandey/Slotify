import express from "express";
import { protect } from "../middlewares/protect.js";
import { createBooking,getMyBookings,cancelBooking } from "../controllers/booking.controller.js";
const router = express.Router()

router.post("/bookings",protect,createBooking)
router.get("/bookings/me",protect,getMyBookings)
router.patch("/bookings/cancel",protect,cancelBooking)

export default router