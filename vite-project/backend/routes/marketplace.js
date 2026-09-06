import express from 'express';
import produces from '../models/produce.js';
import Reservation from '../models/reservation.js';
import PickupPlan from '../models/pick_plan.js';
import Transaction from '../models/transaction.js';

const router = express.Router();

router.get('/api/marketplace-data', async (req, res) => {
  try {
    console.log("Fetching marketplace data from database...");
    
    
    const [produce, reservations, pickupplans, transactions] = await Promise.all([
      produces.find({ status: 'active' }).sort({ expiryAt: 1 }),
      Reservation.find().sort({ createdAt: -1 }),
      PickupPlan.find().sort({ createdAt: -1 }),
      Transaction.find().sort({ completedAt: -1 })
    ]);

    res.status(200).json({
      produce,
      reservations,
      pickupPlans,
      transactions: []
    });
    res.status(200).json({ produce, reservations, pickupplans, transactions });
  } catch (error) {
    console.error("CRASH in marketplace-data route:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
