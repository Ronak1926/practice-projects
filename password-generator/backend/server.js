import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import authRoute from "./routes/auth.route.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRoute)


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on the  http://localhost:${PORT}`)
})