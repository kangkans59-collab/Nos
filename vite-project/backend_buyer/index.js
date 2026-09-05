const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load environment variables

dotenv.config();

// Connect to MongoDB

connectDB();

// Create Express application

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes

const buyerRoutes = require("./routes/buyerRoutes");

const produceRoutes = require("./routes/produceRoutes");

const orderRoutes = require("./routes/orderRoutes");

app.use("/api/buyers", buyerRoutes);

app.use("/api/produce", produceRoutes);

app.use("/api/orders", orderRoutes);

// Test route

app.get("/", (req, res) => {
  res.json({
    message: "Rural Produce Surplus Exchange API is running",
  });
});

// 404 handler

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global error handler

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal server error",

    error: err.message,
  });
});

// Start server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
