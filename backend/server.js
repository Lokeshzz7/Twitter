import dotenv from "dotenv";
import express from "express";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse req.body(from user)
app.use(express.urlencoded({ extended: true })); //in postman key and val

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  connectMongoDB();
});
