import jwt from "jsonwebtoken";

export const genTokenAndSetCookie =(userId, res) =>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"15d"})
    res.cookie("jwt-password",token,{
        maxage:15*24**60*60*1000,
        httpOnly:true,
        sameSite:"Strict",
        secure:process.env.NODE_ENV === "production"
    })
    return token;
}