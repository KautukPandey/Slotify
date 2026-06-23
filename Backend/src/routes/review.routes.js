import express from "express";
import { protect } from "../middlewares/protect.js";
import { createReview, getProviderReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/reviews/create",protect,createReview)
router.get("/reviews/provider/:providerId",getProviderReviews)

export default router