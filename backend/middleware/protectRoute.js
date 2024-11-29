import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res) => {
    try{
       const token=req.cookies.jwt;
       if(!token){
            return res.status(401).json({error:"Not authorized, no token"});
       }
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       if(!decoded){
            return res.status(401).json({error:"Not authorized, Invalid"});
       }
       const user = await User.findById(decoded.id).select("-password");
       if(!user){
            return res.status(404).json({error:"User not found"});
       }    
       req.user=user;
       next();
    }

    catch(err){
        console.error(error);
        res.status(500).json({error:"server error"});
    }
}