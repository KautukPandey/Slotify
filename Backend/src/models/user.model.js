import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
},{timestamps:true})

userSchema.pre("save",async function () {
    try {
        if(!this.isModified("password")) return;
        const hashedPass = await bcrypt.hash(this.password,10)
        this.password = hashedPass       
    } catch (error) {
        throw new Error("Error occured in hashing")       
    }
})

export default mongoose.model("User",userSchema)