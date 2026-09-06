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
      transactions: [
        { id: 'TXN-58231', produceName: 'Heirloom Tomatoes', quantity: 12, unit: 'kg', pricePerUnit: 18, seller: 'Green Valley Farms', buyer: 'Ramesh K.', pickupLocation: 'Sector 12 Community Hub', completedAt: '2026-09-05T18:42:00' },
        { id: 'TXN-58219', produceName: 'Sweet Corn', quantity: 20, unit: 'kg', pricePerUnit: 12, seller: 'Lakshmi Growers', buyer: 'Fatima S.', pickupLocation: 'Lakeview Market', completedAt: '2026-09-05T13:10:00' },
        { id: 'TXN-58204', produceName: 'Mangoes', quantity: 30, unit: 'kg', pricePerUnit: 45, seller: 'Hill Crest Farms', buyer: 'Vikram D.', pickupLocation: 'Sector 9 Depot', completedAt: '2026-09-04T19:05:00' },
        { id: 'TXN-58190', produceName: 'Bananas', quantity: 10, unit: 'dozen', pricePerUnit: 22, seller: 'Village Co-op', buyer: 'Meena T.', pickupLocation: 'Riverside Corner', completedAt: '2026-09-04T11:22:00' },
      ]
    });
  } catch (error) {
    console.error("Fetch Marketplace Data Error:", error);
    res.status(500).json({ error: "Failed to fetch marketplace data." });
  }
});

export default router;
