import jwt from "jsonwebtoken";
export default function  generateTokenAndSetCookie  (userId, res)  {
  try{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
       expiresIn: "30d",
    });

  res.cookie("jwt", token, {
    //sending it as cookie
    maxAge: 30 * 24 * 60 * 60 * 1000, //Milli secs
    httpOnly: true, //prevent xxs attacks cross-site scripting attacks
    sameSite: "strict", //csrf attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
   }catch(error){
    console.error(error);
    throw new Error("cant gen token")
    }
}
