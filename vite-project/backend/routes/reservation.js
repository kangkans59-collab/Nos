import express from 'express';
import Produce from '../models/produce.js';
import Reservation from '../models/reservation.js';

const reserveRouter = express.Router();

reserveRouter.post('/api/reservations', async (req, res) => {
  try {
    // 1. Extract data from the incoming request (sent by your React frontend)
    const { produceId, quantity, buyer } = req.body;

    // 2. The Safe Database Update (Atomic Operation)
    const updatedProduce = await Produce.findOneAndUpdate(
      { 
        _id: produceId, 
        quantityAvailable: { $gte: quantity } // CRITICAL: Only match if enough stock exists
      },
      { 
        $inc: { 
          quantityAvailable: -quantity, // Decrease available stock
          quantityReserved: quantity    // Increase reserved stock
        } 
      },
      { 
        new: true // Return the updated document so we can send it to React
      }
    );

    // 3. Handle the race condition / out of stock scenario
    if (!updatedProduce) {
      return res.status(400).json({ 
        error: "Reservation failed. The item is sold out or doesn't have enough quantity available." 
      });
    }

    // 4. Create the digital receipt (Reservation)
    const newReservation = await Reservation.create({
      produceId: updatedProduce._id,
      produceName: updatedProduce.name,
      buyerId: buyer.id,
      buyerName: buyer.name,
      sellerId: updatedProduce.seller.id,
      sellerName: updatedProduce.seller.name,
      quantity: quantity,
      unit: updatedProduce.unit,
      zone: updatedProduce.seller.location, // Assuming pickup is at seller's location
      status: 'ready-for-pickup'
    });

    // 5. Send back exactly what your React reducer expects
    res.status(201).json({
      updatedProduce,
      newReservation
    });

  } catch (error) {
    console.error("Reservation Error:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

export default reserveRouter;