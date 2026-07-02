import { z } from "zod";

export const createProviderSchema = z.object({
    businessName: 
        z.string().trim().min(3,"Business name must be at least 3 characters"),
    city: 
        z.string().trim().min(2, "City must be at least 2 characters"),
    description: 
        z.string().trim().min(10,"Description must be at least 10 characters")
});

export const getProvidersSchema = z.object({
    city:
        z.string().trim().toLowerCase().optional(),
    search:
        z.string().trim().optional(),
    page:
        z.coerce.number().int().positive().default(1),
    limit:
        z.coerce.number().int().max(50).default(9),
    sort:
        z.enum(["name","newest"]).default("newest")
});