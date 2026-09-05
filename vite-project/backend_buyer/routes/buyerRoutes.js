const express = require("express");

const router = express.Router();

const {
  registerBuyer,
  loginBuyer,
  getProfile,
  updateProfile,
} = require("../controllers/buyerController");

const protect = require("../middleware/authMiddleware");

// Public routes

router.post("/register", registerBuyer);

router.post("/login", loginBuyer);

// Protected routes

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;
