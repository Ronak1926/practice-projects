import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import authRoute from "./routes/auth.route.js"
import cors from "cors"
import passwordRoute from "./routes/password.route.js";

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(cookieParser())

// CORS configuration to allow frontend with credentials (cookies)
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

app.use("/api/auth", authRoute);
app.use("/api/passwords", passwordRoute);

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on the  http://localhost:${PORT}`)
})