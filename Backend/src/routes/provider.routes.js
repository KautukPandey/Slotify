import express from "express";
import { protect } from "../middlewares/protect.js";
import { providerProtect } from "../middlewares/providerProtect.js";
import { createProfile,getMyProviderProfile,getProviderById,getProviders } from "../controllers/provider.controller.js";
import { validate } from "../middlewares/validate.js";
import { createProviderSchema } from "../validations/provider.validation.js";

const router = express.Router()

router.post(
    "/providers",
    protect,
    providerProtect,
    validate(createProviderSchema),
    createProfile
)
router.get("/providers",getProviders)
router.get("/providers/me",protect,providerProtect,getMyProviderProfile)
router.get("/providers/:id",getProviderById)

export default router