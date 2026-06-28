import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
    }

},{timestamps:true})

providerSchema.index({
    city: 1
})

export default mongoose.model("Provider",providerSchema)