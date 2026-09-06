import express from 'express';
import PickupPlan from '../models/pick_plan.js';
import Reservation from '../models/reservation.js';

const router = express.Router();

router.post('/api/pickup-plans', async (req, res) => {
  try {
    const { reservationIds, location, window, notes, buyerId } = req.body;

    const involvedReservations = await Reservation.find({ 
      _id: { $in: reservationIds } 
    });

    const totalQuantity = involvedReservations.reduce((sum, r) => sum + r.quantity, 0);

    const newPlan = await PickupPlan.create({
      buyerId: buyerId || involvedReservations[0].buyerId,
      reservations: reservationIds,
      zone: location,
      window,
      notes,
      reservationCount: involvedReservations.length,
      totalQuantity,
      status: 'Scheduled'
    });

    await Reservation.updateMany(
      { _id: { $in: reservationIds } },
      { 
        $set: { 
          status: 'grouped', 
          pickupWindow: window 
        } 
      }
    );

    const updatedReservations = await Reservation.find({ 
      _id: { $in: reservationIds } 
    });

    res.status(201).json({
      newPlan,
      updatedReservations
    });
  } catch (error) {
    console.error("Create Pickup Plan Error:", error);
    res.status(500).json({ error: "Failed to create pickup plan." });
  }
});

export default router;