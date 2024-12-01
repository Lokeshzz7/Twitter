import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";


export const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    console.log("Received request body:", req.body);
    console.log(req.body.email);
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email",
      });
    }

    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({
        error: "Username is taken",
      });
    }
    console.log("Username from request:", username);

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    //hashing pass
    //1234 will become kdgednewxdniui@626
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed pass", hashedPassword);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("signup error", error);
    res.status(500).json({
      error: "Server error",
    });
  }
};


export const login = async (req, res) => {
    const {username,password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({
                error:"All fields are required"
            })
        }
        const user = await User.findOne({username});
        const isMatch = user && (await bcrypt.compare(password,user?.password||""));
        if(!user||!isMatch){
            return res.status(400).json({
                error:"Invalid username and password"
            })
        }  
    }
    catch(error){
        console.log("Error in login",error.message);
        res.status(500).json({
            error:"Internal Server error"})
    }
  
};


export const logout = async (req, res) => {
  try{
    res.cookie("jwt", "", {
      maxAge: 1,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({
        message:"Logged out successfully"
      })
  }
  catch{
    console.log("Error in logout",error.message);
    res.status(500).json({
      error:"Internal Server error"
    })

  }
};


export const getMe=async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
        if(!user){
        return res.status(404).json({
            error:"User not found"
        })
        }
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error in getMe",error.message);
        res.status(500).json({
        error:"Internal Server error"
        })
    }
};



