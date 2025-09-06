import express from "express"

import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())

app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello")

})

app.listen(5000,() =>{
    console.log("Server is running on the Port 5000")
})