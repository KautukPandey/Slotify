import express from "express";
import { protect } from "../middlewares/protect.js";
import { providerProtect } from "../middlewares/providerProtect.js";
import { createBooking,getMyBookings,cancelBooking,getProviderBookings,completeBooking } from "../controllers/booking.controller.js";
const router = express.Router()

router.post("/bookings",protect,createBooking)
router.get("/bookings/me",protect,getMyBookings)
router.patch("/bookings/cancel",protect,cancelBooking)
router.get("/bookings/provider",protect,providerProtect,getProviderBookings)

router.patch("/bookings/complete",protect,providerProtect,completeBooking)

export default router