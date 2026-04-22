import express from "express"

const app = express()
const PORT = 8000 || process.env.PORT



app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})
