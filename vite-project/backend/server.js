import "dotenv/config";
import express from "express";
import sellerRouter from "./routes/sellerRoutes.js";
import authRouter from "./routes/authRoutes.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/userInfo")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



const app = express();
app.use(express.json());

console.log("JWT SECRET:", process.env.JWT_SECRET);

app.use("/seller", sellerRouter);
app.use("/auth",authRouter);

app.listen(6000,()=>{console.log("Server is running at port 6000");})