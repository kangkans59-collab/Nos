const Buyer = require("../models/Buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER BUYER
const registerBuyer = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const existingBuyer = await Buyer.findOne({ email });

    if (existingBuyer) {
      return res.status(400).json({
        message: "Buyer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const buyer = await Buyer.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    res.status(201).json({
      message: "Buyer registered successfully",

      token: generateToken(buyer._id),

      buyer: {
        id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        address: buyer.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// LOGIN BUYER
const loginBuyer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyer = await Buyer.findOne({ email });

    if (!buyer) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, buyer.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",

      token: generateToken(buyer._id),

      buyer: {
        id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        address: buyer.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// GET PROFILE
const getProfile = async (req, res) => {
  res.json({
    buyer: req.buyer,
  });
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.buyer._id);

    buyer.name = req.body.name || buyer.name;
    buyer.phone = req.body.phone || buyer.phone;

    if (req.body.address) {
      buyer.address = req.body.address;
    }

    await buyer.save();

    res.json({
      message: "Profile updated successfully",
      buyer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerBuyer,
  loginBuyer,
  getProfile,
  updateProfile,
};
