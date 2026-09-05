const express = require("express");

const router = express.Router();

const {
  getAllProduce,
  getProduceById,
} = require("../controllers/produceController");

// Get all available produce

router.get("/", getAllProduce);

// Get specific produce

router.get("/:id", getProduceById);

module.exports = router;
