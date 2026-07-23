import {z} from "zod";

export const createSlotSchema = z.object({
    date: z.string().trim().refine( 
            (date)=> !isNaN(Date.parse(date)),
            "Invalid date format"
        ),
    time: z.string().regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Invalid time format"
        ),
    serviceId: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid service ID"
        )
    
})

export const getAvailableSlotsSchema = z.object({
    date: z.string().optional().refine( 
            (date)=> !isNaN(Date.parse(date)),
            "Invalid date format"
        ),
    serviceId: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid service ID"
        )
})