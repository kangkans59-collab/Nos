const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

// All order routes require buyer authentication

router.use(protect);

// Create order

router.post("/", createOrder);

// Get buyer's orders

router.get("/", getMyOrders);

// Get specific order

router.get("/:id", getOrderById);

// Cancel order

router.put("/:id/cancel", cancelOrder);

module.exports = router;
