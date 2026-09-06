import express from 'express';
import Transaction from '../models/transaction.js';

const router = express.Router();

// Seller logs a completed sale. The frontend only shows this form when
// role === 'seller'; buyers only ever read from GET /api/marketplace-data.
router.post('/api/transactions', async (req, res) => {
  try {
    const { produceName, quantity, unit, pricePerUnit, seller, buyer, pickupLocation } = req.body;

    const newTransaction = await Transaction.create({
      produceName, quantity, unit, pricePerUnit, seller, buyer, pickupLocation,
      completedAt: new Date(),
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({ error: "Failed to record transaction." });
  }
});

export default router;
