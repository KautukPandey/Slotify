import express from "express";
import { protect } from "../middlewares/protect.js";
import { providerProtect } from "../middlewares/providerProtect.js";
import { createService, getAllServices } from "../controllers/service.controller.js";


const router = express.Router()

router.post("/services",protect,providerProtect,createService)
router.get("/services",getAllServices)


export default router