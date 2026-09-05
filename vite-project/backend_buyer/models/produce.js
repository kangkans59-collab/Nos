const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      enum: ["kg", "quintal", "ton", "litre", "piece"],
    },

    pricePerUnit: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      village: String,
      district: String,
      state: String,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["available", "sold", "expired"],
      default: "available",
    },

    availableUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Produce", produceSchema);
