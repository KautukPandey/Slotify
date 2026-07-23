import { z } from "zod";

export const createServiceSchema = z.object({
    name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Service name must be at least 3 characters"),

    description: z
    .string()
    .trim()
    .min(10,"Description must be at least 10 characters"),

    price: z
    .coerce
    .number()
    .positive("Price must be greater than 0"),

    duration: z
    .coerce
    .number()
    .positive("Duration must be greater than 0")
    .max(1440,"Duration cannot exceed 24 hours")
})