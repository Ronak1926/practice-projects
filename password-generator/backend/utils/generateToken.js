import jwt from "jsonwebtoken";

export const genTokenAndSetCookie =(userId, res) =>{
    // Payload must match what protect.route.js expects (decoded.userId)
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "15d" })
    res.cookie("jwt-password", token, {
        // Correct property is maxAge (camelCase) and use proper multiplication
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", 
        secure: process.env.NODE_ENV === "production",
    })
    return token;
}