import { z } from "zod";

export const createProviderSchema = z.object({
    businessName: 
        z.string().trim().min(3,"Business name must be at least 3 characters"),
    city: 
        z.string().trim().min(2, "City must be at least 2 characters"),
    description: 
        z.string().trim().min(10,"Description must be at least 10 characters")
});