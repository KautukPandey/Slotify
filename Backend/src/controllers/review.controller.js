import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import Provider from "../models/provider.model.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking doesn't exists" });
    }
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Not the owner access denied" });
    }
    if (booking.status !== "completed") {
      return res.status(400).json({ message: "Complete the booking first" });
    }

    const existingReview = await Review.findOne({
      booking: bookingId,
    });
    if (existingReview) {
      return res.status(400).json({ message: "Booking already exists" });
    }

    const review = await Review.create({
      booking: bookingId,
      provider: booking.provider,
      customer: booking.customer,
      rating,
      comment: comment || "",
    });

    return res.status(201).json({
      message: "Review created",
      review,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while creating review" });
  }
};

export const getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 9

    const skip = (page-1)*limit

    if (!providerId) {
      return res.status(400).json({ message: "Provider's Id is required" });
    }
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Provider doesn't exists" });
    }
    const reviews = await Review.find({
      provider: providerId,
    })
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    
    const reviewCount = await Review.countDocuments({
      provider: providerId
    });
    const totalPages = Math.ceil(reviewCount / limit);
    

    const ratingStats = await Review.aggregate([
      {
        $match: {
          provider: provider._id
        }
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    const averageRating =
      ratingStats.length > 0
        ? Number(ratingStats[0].averageRating.toFixed(1))
        : 0;
    return res.status(200).json({
      message: "Reviews fetched",
      page,
      limit,
      reviewCount,
      totalPages,
      averageRating,
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting reviews" });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ customer: req.user._id });
    return res.status(200).json({
      message: "My reviews fetched",
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting my reviews" });
  }
};
