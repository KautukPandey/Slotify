import mongoose from "mongoose"

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    }
},{timestamps:true})

slotSchema.index({ date: 1, time: 1, service: 1},{ unique:true })

export default mongoose.model("Slot",slotSchema)