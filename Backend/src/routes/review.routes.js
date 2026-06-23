import express from "express";
import { protect } from "../middlewares/protect.js";
import { createReview, getProviderReviews, getMyReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/reviews/create",protect,createReview)
router.get("/reviews/provider/:providerId",getProviderReviews)
router.get("/reviews/my", protect, getMyReviews)

export default router