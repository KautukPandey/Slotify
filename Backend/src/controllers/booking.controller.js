import Booking from "../models/booking.model.js";
import Slot from "../models/slot.model.js"

export const createBooking = async(req,res) => {
    try {
        const {slotId,note} = req.body
        if(!slotId){
            return res.status(400).json({message: "Slot Id is required"})
        }

        const slot = await Slot.findById(slotId)
        if(!slot){
            return res.status(400).json({message: "Slot does not exists"})
        }
        const alreadyBooked = await Booking.findOne({
            slot: slot._id,
            status: "confirmed"
        })
        if(alreadyBooked){
            return res.status(400).json({message: "Slot already booked"})
        }
        const now = new Date()
        const today = new Date()
        today.setHours(0,0,0,0)

        const currentTime = now.toTimeString().slice(0,5)


        if(slot.date){
            const selectedDate = new Date(slot.date)
            selectedDate.setHours(0,0,0,0)

            if(selectedDate<today){
                return res.status(400).json({ message: "Select valid date and time"})
            }
            else if(selectedDate.getTime()===today.getTime() && slot.time<currentTime){
                return res.status(400).json({ message: "Select valid date and time"})
            }
        }


        const booking = await Booking.create({
            slot: slot._id,
            service: slot.service,
            provider: slot.createdBy,
            customer: req.user._id,
            note: note ? note : "",
            status: "confirmed"
        })

        return res.status(201).json({
            message: "Booking created",
            booking
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while creating booking"})
    }
}

export const getMyBookings = async(req,res) => {
    try {
        const myBookings = await Booking.find({
            customer: req.user._id
        })
        .populate("service","name")
        .populate("provider","businessName")
        .populate("slot","date time")
        

        return res.status(200).json({
            message: "My Bookings fetched",
            myBookings
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while fetching my bookings"})
    }
}

export const cancelBooking = async(req,res) => {
    try {
        const {bookingId} = req.body
        if(!bookingId){
            return res.status(400).json({message: "Booking ID missing"})
        }
        const booking = await Booking.findById(bookingId)
        if(!booking){
            return res.status(404).json({message: "Booking doesn't exists"})
        }
        if(booking.status==="cancelled" || booking.status==="completed"){
            return res.status(400).json({message: "Booking already completed/cancelled"})
        }
        if(booking.customer.toString()!==req.user._id.toString()){
            return res.status(403).json({message: "Forbidden"})
        }
        booking.status = "cancelled"
        await booking.save()

        return res.status(200).json({
            message: "Booking cancelled",
            booking
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while cancelling booking"})
    }
}

export const getProviderBookings = async(req,res) => {
    try {
        const providerBookings = await Booking.find({
            provider: req.provider._id
        })
        .populate("service","name")
        .populate("slot","date time")
        .populate("customer","name email")

        return res.status(200).json({
            message: "Provider's bookings fetched",
            providerBookings
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error in getting Provider's booking"})
    }
}

export const completeBooking = async(req,res) => {
    try {
        const {bookingId} = req.body
        if(!bookingId){
            return res.status(400).json({message: "Booking ID missing"})
        }
        const booking = await Booking.findById(bookingId)
        if(!booking){
            return res.status(404).json({message: "Booking doesn't exists"})
        }
        if(booking.status==="cancelled" || booking.status==="completed"){
            return res.status(400).json({message: "Booking already completed/cancelled"})
        }
        if(booking.provider.toString()!==req.provider._id.toString()){
            return res.status(403).json({message: "Forbidden"})
        }
        booking.status = "completed"
        await booking.save()

        return res.status(200).json({
            message: "Booking completed",
            booking
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error in completing the booking"})
    }
}