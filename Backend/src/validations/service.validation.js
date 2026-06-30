import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string().trim().min(3),
    description: z.string().trim().min(10),
    price: z.coerce.number(),
    duration: z.coerce.number()
})