import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import { connectDB } from "./db/db.js"

connectDB()
const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})
