import Slot from "../models/slot.model.js"
import Service from "../models/service.model.js"
import Booking from "../models/booking.model.js"

export const createSlot = async(req,res) => {
    try {
        const {date,time,serviceId} = req.body
        if(!date || !time || !serviceId){
            return res.status(400).json({message:"Complete fields required"})
        }
        const service = await Service.findById(serviceId)
        if(!service){
            return res.status(400).json({message:"Service does not exist"})
        }
        if (!service.isActive) {
            return res.status(400).json({ message: "Service is not active" })
        }
        if (service.provider.toString() !== req.provider._id.toString()) {
            return res.status(403).json({ message: "Not authorized" })
        }
        const normalizedDate = new Date(date)
        normalizedDate.setHours(0, 0, 0, 0)
        const slot = await Slot.create({
            date: normalizedDate,
            time,
            createdBy: req.provider._id,
            service: serviceId
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
        const { date ,serviceId} = req.query

        if (!serviceId) {
            return res.status(400).json({
                message: "serviceId is required"
            })
        }
        
        const service = await Service.findById(serviceId)

        if (!service || !service.isActive) {
            return res.status(404).json({
                message: "Service not found or inactive"
            })
        }

        const now = new Date()
        const today = new Date()
        today.setHours(0,0,0,0)

        const currentTime = now.toTimeString().slice(0,5)

        const bookedSlotIds = await Booking.find({
            service: serviceId,
            status: "confirmed"
        }).distinct("slot")
        const filter = {
            service: serviceId,
            _id: { $nin: bookedSlotIds }
        }
        if (date) {
            const selectedDate = new Date(date)
            selectedDate.setHours(0,0,0,0)

            if(selectedDate>today){
                filter.date = selectedDate
            }
            else if(selectedDate.getTime()===today.getTime()){
                filter.date = selectedDate
                filter.time = { $gt: currentTime}
            }
            else{
                return res.status(200).json({
                    message: "No slots available",
                    count: 0,
                    slots: []
                })
            }
        }

        const slots = await Slot.find(filter).sort({time:1}).select("date time")
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

// export const getMyBookings = async(req,res) => {
//     try {
//         const slots = await Slot.find({bookedBy:req.user._id}).sort({createdAt:-1})

//         return res.status(200).json({
//             message:"Slots fetched",
//             count: slots.length,
//             slots
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"Error while getting bookings"})
//     }
// }

// export const rescheduleBooking = async(req,res) => {
//     try {
//         const {oldSlotId,newSlotId} = req.body

//         if(!oldSlotId || !newSlotId){
//             return res.status(400).json({message: "Both IDs are required"})
//         }

//         if (oldSlotId === newSlotId) {
//             return res.status(400).json({
//                 message: "Cannot reschedule to the same slot"
//             })
//         }

//         const oldSlot = await Slot.findById(oldSlotId)
//         const newSlot = await Slot.findById(newSlotId)

//         if (!oldSlot || !newSlot) {
//             return res.status(404).json({
//                 message: "One or both slots not found"
//             })
//         }

//         if(!oldSlot.isBooked || oldSlot.bookedBy.toString() !== req.user._id.toString()){
//             return res.status(403).json({
//                 message: "Not authorized to reschedule this slot"
//             })
//         }

//         if (newSlot.isBooked) {
//             return res.status(400).json({
//                 message: "New slot is already booked"
//             })
//         }

//         const now = new Date()
//         const today = new Date()
//         today.setHours(0,0,0,0)
        
//         const slotDate = new Date(newSlot.date)
//         slotDate.setHours(0, 0, 0, 0)

//         const currentTime = now.toTimeString().slice(0, 5)

//         if(slotDate < today || (slotDate.getTime()===today.getTime() && newSlot.time <= currentTime)){
//             return res.status(400).json({
//                 message: "Cannot reschedule to a past slot"
//             })
//         }

//         const bookedNewSlot = await Slot.findOneAndUpdate({
//             _id: newSlotId,
//             isBooked: false
//         },{
//             isBooked: true,
//             bookedBy: req.user._id
//         },{new: true})

//         if (!bookedNewSlot) {
//             return res.status(400).json({
//                 message: "Failed to book new slot (already taken)"
//             })
//         }

//         await Slot.findOneAndUpdate({
//             _id: oldSlotId,
//             isBooked: true,
//             bookedBy: req.user._id
//         },{
//             isBooked: false,
//             bookedBy: null
//         })

//         return res.status(200).json({
//             message: "Rescheduled successfully",
//             newSlot: bookedNewSlot
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message: "Error while rescheduling"})
//     }
// }