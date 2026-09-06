import express from 'express';
import Produce from '../models/produce.js';

const router = express.Router();

router.post('/api/produce', async (req, res) => {
  try {
    const { 
      name, category, pricePerUnit, unit, 
      quantityAvailable, expiryAt, seller 
    } = req.body;

    const newProduce = await Produce.create({
      name,
      category,
      pricePerUnit,
      unit,
      quantityAvailable,
      expiryAt,
      seller: {
        id: seller.id,
        name: seller.name,
        location: seller.location
      }
    });

    res.status(201).json(newProduce);
  } catch (error) {
    console.error("Add Produce Error:", error);
    res.status(500).json({ error: "Failed to create new produce listing." });
  }
});

export default router;