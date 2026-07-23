import {z} from "zod";

export const createBookingSchema = z.object({
    slotId: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid slot ID"),
    note: z.string().trim().max(300, "Note cannot exceed 300 characters").optional(),

})

export const cancelBookingSchema = z.object({
    bookingId: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid booking ID"
        )
})

export const completeBookingSchema = z.object({
    bookingId: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid booking ID"
        )
})