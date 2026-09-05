const Order = require("../models/Order");
const Produce = require("../models/Produce");

// CREATE ORDER

const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const produce = await Produce.findById(item.produceId);

      if (!produce) {
        return res.status(404).json({
          message: "Produce not found",
        });
      }

      if (produce.status !== "available") {
        return res.status(400).json({
          message: `${produce.name} is not available`,
        });
      }

      if (produce.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough ${produce.name} available`,
        });
      }

      const subtotal = produce.pricePerUnit * item.quantity;

      totalAmount += subtotal;

      orderItems.push({
        produceId: produce._id,

        name: produce.name,

        quantity: item.quantity,

        unit: produce.unit,

        pricePerUnit: produce.pricePerUnit,

        subtotal,
      });
    }

    const order = await Order.create({
      buyerId: req.buyer._id,

      items: orderItems,

      totalAmount,

      deliveryAddress,

      paymentMethod,
    });

    // Reduce available quantity

    for (const item of items) {
      await Produce.findByIdAndUpdate(item.produceId, {
        $inc: {
          quantity: -item.quantity,
        },
      });
    }

    res.status(201).json({
      message: "Order placed successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",

      error: error.message,
    });
  }
};

// GET BUYER ORDER HISTORY

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyerId: req.buyer._id,
    })
      .populate("items.produceId")
      .sort({
        createdAt: -1,
      });

    res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",

      error: error.message,
    });
  }
};

// GET SINGLE ORDER

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      buyerId: req.buyer._id,
    }).populate("items.produceId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",

      error: error.message,
    });
  }
};

// CANCEL ORDER

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,

      buyerId: req.buyer._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.orderStatus === "shipped" ||
      order.orderStatus === "delivered" ||
      order.orderStatus === "cancelled"
    ) {
      return res.status(400).json({
        message: "Order cannot be cancelled",
      });
    }

    order.orderStatus = "cancelled";

    await order.save();

    // Return produce quantity

    for (const item of order.items) {
      await Produce.findByIdAndUpdate(
        item.produceId,

        {
          $inc: {
            quantity: item.quantity,
          },

          $set: {
            status: "available",
          },
        },
      );
    }

    res.json({
      message: "Order cancelled successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel order",

      error: error.message,
    });
  }
};

module.exports = {
  createOrder,

  getMyOrders,

  getOrderById,

  cancelOrder,
};
