import express from "express"
import authRoutes from "./routes/auth.routes.js"
import slotRoutes from "./routes/slot.routes.js"
import providerRoutes from "./routes/provider.routes.js"
import serviceRoutes from "./routes/service.routes.js"
import bookingRoutes from "./routes/bookings.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import { connectDB } from "./db/db.js"
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoutes)
app.use("/api", slotRoutes)
app.use("/api", providerRoutes)
app.use("/api",serviceRoutes)
app.use("/api",bookingRoutes)
app.use("/api",reviewRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);   
    
})
