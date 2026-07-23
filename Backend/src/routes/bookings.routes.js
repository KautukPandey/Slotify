import express from "express";
import { protect } from "../middlewares/protect.js";
import { providerProtect } from "../middlewares/providerProtect.js";
import { createBooking,getMyBookings,cancelBooking,getProviderBookings,completeBooking } from "../controllers/booking.controller.js";
import { createBookingSchema,cancelBookingSchema,completeBookingSchema } from "../validations/booking.validation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router()

router.post("/bookings",protect,validate(createBookingSchema),createBooking)
router.get("/bookings/me",protect,getMyBookings)
router.patch("/bookings/cancel",protect,validate(cancelBookingSchema),cancelBooking)
router.get("/bookings/provider",protect,providerProtect,getProviderBookings)

router.patch("/bookings/complete",protect,providerProtect,validate(completeBookingSchema),completeBooking)

export default router