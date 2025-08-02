const User = require("../Model/users");
const jwt = require('jsonwebtoken')

exports.protectRoute = async(req,res,next)=>{

    const token = req.cookies.jwt;

    if(!token) return res.status(401).json({ message: "No token found" });

    const decode = jwt.verify(token,process.env.JWT_SECRET)

    if(!decode) return res.status(401).json({ message: "Invalid token" });

    const user = await User.findById(decode.userID).select("-password")


    if(!user) return res.status(404).json({ message: "User not found" });

    req.user = user

    next();

}