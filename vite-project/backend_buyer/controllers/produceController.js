const Produce = require("../models/Produce");

// GET ALL AVAILABLE PRODUCE
const getAllProduce = async (req, res) => {
  try {
    const { category, search, district } = req.query;

    let filter = {
      status: "available",
      quantity: { $gt: 0 },
    };

    if (category) {
      filter.category = category;
    }

    if (district) {
      filter["location.district"] = district;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const produce = await Produce.find(filter)
      .populate("sellerId", "name phone")
      .sort({ createdAt: -1 });

    res.json({
      count: produce.length,
      produce,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch produce",
      error: error.message,
    });
  }
};

// GET SINGLE PRODUCE
const getProduceById = async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id).populate(
      "sellerId",
      "name phone",
    );

    if (!produce) {
      return res.status(404).json({
        message: "Produce not found",
      });
    }

    res.json(produce);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch produce",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProduce,
  getProduceById,
};
