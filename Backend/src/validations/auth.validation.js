import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(3,"Name must be at least 3 characters"),
    email: z.string().trim().email("Invalid email address").toLowerCase(),
    password: z.string().min(8,"Password must be at least 8 characters"),
    role: z.enum(["customer", "provider"]).default("customer"),
    city: z.string().trim().min(2,"City must be atleast 2 characters")
})

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email address").toLowerCase(),
    password: z.string().min(1,"Password is requried")
})