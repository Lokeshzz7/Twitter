import { v2 as cloudinary } from "cloudinary";//v2 is a version (updating and storing image)
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";


import connectMongoDB from "./db/connectMongoDB.js";


import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.route.js";


dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json()); //to parse req.body(from user)
app.use(express.urlencoded({ extended: true })); //in postman key and val
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  connectMongoDB();
});
