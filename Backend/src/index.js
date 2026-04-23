import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import { connectDB } from "./db/db.js"
import dotenv from "dotenv"
dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
console.log("ENV:", process.env.MONGODB_URI)
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})
