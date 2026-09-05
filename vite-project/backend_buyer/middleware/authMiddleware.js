const jwt = require("jsonwebtoken");
const Buyer = require("../models/Buyer");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const buyer = await Buyer.findById(decoded.id).select("-password");

    if (!buyer) {
      return res.status(401).json({
        message: "Buyer not found",
      });
    }

    req.buyer = buyer;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;
