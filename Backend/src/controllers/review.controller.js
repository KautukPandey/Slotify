import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import Provider from "../models/provider.model.js";

export const createReview = async(req,res) => {
    try {
        const {bookingId,rating,comment} = req.body

        if(!bookingId || !rating){
            return res.status(400).json({message:"Fields cannot be empty"})
        }
        const booking = await Booking.findById(bookingId)
        if(!booking){
            return res.status(404).json({message: "Booking doesn't exists"})
        }
        if(booking.customer.toString()!==req.user._id.toString()){
            return res.status(400).json({message: "Not the owner access denied"})
        }
        if(booking.status !== "completed"){
            return res.status(400).json({message: "Complete the booking first"})
        }

        const existingReview = await Review.findOne({
            booking: bookingId
        })
        if(existingReview){
            return res.status(400).json({message: "Booking already exists"})
        }

        const review = await Review.create({
            booking: bookingId,
            provider: booking.provider,
            customer: booking.customer,
            rating,
            comment: comment || ""
        })

        return res.status(201).json({
            message: "Review created",
            review
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while creating review"})
    }
}

export const getProviderReviews = async(req,res) => {
    try {
        const {providerId} = req.params
        if(!providerId){
            return res.status(400).json({ message: "Provider's Id is required"})
        }
        const provider = await Provider.findById(providerId)
        if(!provider){
            return res.status(404).json({ message: "Provider doesn't exists"})
        }
        const reviews = await Review.find({
            provider: providerId
        })
        .populate("customer","name")
        .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Reviews fetched",
            count: reviews.length,
            reviews
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while getting reviews"})
    }
}