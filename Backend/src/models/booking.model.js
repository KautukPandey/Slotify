import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    slot:     { type: mongoose.Schema.Types.ObjectId, ref: "Slot",     required: true, unique: true },
    service:  { type: mongoose.Schema.Types.ObjectId, ref: "Service",  required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User",     required: true },
    status:   { type: String,   enum: ["confirmed","cancelled","completed"], default: "confirmed" },
    note:     { type: String,   default: "" }
}, { timestamps: true })

export default mongoose.model("Booking",bookingSchema)