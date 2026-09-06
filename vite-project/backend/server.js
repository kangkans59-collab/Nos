import "dotenv/config";
import express from "express";

import sellerRouter from "./routes/sellerRoutes.js";
import authRouter from "./routes/authRoutes.js";
import authenticate from "./middleware/authMiddleware.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Only allow your React app
}));

import marketplaceRoutes from './routes/marketplace.js';
import produceRoutes from './routes/produce.js';
import reservationRoutes from './routes/reservation.js';
import pickupPlanRoutes from './routes/pick_up.js';
import transactionRoutes from './routes/transaction.js';   // add near the other route imports
...
app.use(transactionRoutes);                                  // add near the other app.use(...Routes) lines

app.use(express.json());

app.use(marketplaceRoutes);
app.use(produceRoutes);
app.use(reservationRoutes);
app.use(pickupPlanRoutes);

mongoose.connect("mongodb://localhost:27017/userInfo")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));








console.log("JWT SECRET:", process.env.JWT_SECRET);

app.use("/api/sellers",authRouter);
sellerRouter.use(authenticate);
app.use("/api/sellers", sellerRouter);

app.listen(5000,()=>{console.log("Server is running at port 5000");});
