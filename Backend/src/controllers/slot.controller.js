import Slot from "../models/slot.model.js"

export const createSlot = async(req,res) => {
    try {
        const {date,time} = req.body
        if(!date || !time){
            return res.status(400).json({message:"Both fields required"})
        }

        const normalizedDate = new Date(date)
        normalizedDate.setHours(0, 0, 0, 0)
        const slot = await Slot.create({
            date: normalizedDate,
            time,
            createdBy: req.user._id
        })
        return res.status(201).json({
            message: "Slot created successfully",
            slot
        })
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Slot already exists" })
        }
        console.log(error);
        return res.status(400).json({message: "Error in creating slot"})
    }
}

export const getAvailableSlots = async(req,res) => {
    try {
        const { date } = req.query

        const filter = {
            isBooked: false
        }

        if (date) {
            const normalizedDate = new Date(date)
            normalizedDate.setHours(0, 0, 0, 0)
            filter.date = normalizedDate
        }

        const slots = await Slot.find(filter)
        return res.status(200).json({
            message: "Slots fetched successfully",
            count: slots.length,
            slots
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error in getting available slots"})
    }
}

export const bookSlot = async(req,res) => {
    try {
        const {slotId} = req.query

        if (!slotId) {
            return res.status(400).json({ message: "Slot ID is required" })
        }

        const slot = await Slot.findOneAndUpdate({
            _id: slotId,
            isBooked: false
        },{
            isBooked: true,
            bookedBy: req.user._id
        })

        if(!slot){
            return res.status(400).json({
                message:"Slot not available or already booked"
            })
        }

        return res.status(200).json({
            message: "Slot booked",
            slot    
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error while booking slots"})
    }
}