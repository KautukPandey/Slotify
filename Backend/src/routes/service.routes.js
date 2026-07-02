import express from "express";
import { protect } from "../middlewares/protect.js";
import { providerProtect } from "../middlewares/providerProtect.js";
import { createService, getAllServices, getMyServices, getProviderServices } from "../controllers/service.controller.js";
import { validate } from "../middlewares/validate.js";
import { createServiceSchema } from "../validations/service.validation.js";

const router = express.Router()

router.post(
    "/services",
    protect,
    providerProtect,
    validate(createServiceSchema),
    createService
)
router.get("/services",getAllServices)
router.get("/services/me", protect, providerProtect, getMyServices)
router.get("/providers/:providerId/services", getProviderServices)

export default router