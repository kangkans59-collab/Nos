import express from 'express';
import produces from '../models/pick_plan.js';
import Reservation from '../models/reservation.js';
import PickupPlan from '../models/pick_plan.js';

const router = express.Router();

router.get('/api/marketplace-data', async (req, res) => {
  try {
    const [produce, reservations, pickupplans] = await Promise.all([
      produces.find({ status: 'active' }).sort({ expiryAt: 1 }),
      Reservation.find().sort({ createdAt: -1 }),
      PickupPlan.find().sort({ createdAt: -1 })
    ]);

    res.status(200).json({
      produce,
      reservations,
      pickupplans,
      transactions: []
    });
  } catch (error) {
    console.error("Fetch Marketplace Data Error:", error);
    res.status(500).json({ error: "Failed to fetch marketplace data." });
  }
});

export default router;