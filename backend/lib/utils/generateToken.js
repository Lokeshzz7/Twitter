import jwt from "jsonwebtoken";


//get priority and server have info
//each time user logs in, token generated and stored in cookie
//cookies are also sent at aeach and every time od request 


export default function  generateTokenAndSetCookie  (userId, res)  {
  try{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
       expiresIn: "30d",
    });

  res.cookie("jwt", token, {
    //sending it as cookie
    maxAge: 30 * 24 * 60 * 60 * 1000, //Milli secs(30 days)
    httpOnly: true, //localhost https for host prot frm client
    sameSite: "strict", //csrf attacks cross-site request forgery attacks eg to eg.com only not other .com
    secure: process.env.NODE_ENV !== "development",//prod cos secure needed https
  });
   }catch(error){
    console.error(error);
    throw new Error("cant gen token")
    }
}
