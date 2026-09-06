// models/Produce.js
import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, index: true }, // e.g., "Vegetables", "Dairy"
  pricePerUnit: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., "lbs", "kg", "bunch"
  
  // Inventory tracking
  quantityAvailable: { type: Number, required: true, min: 0 },
  quantityReserved: { type: Number, default: 0 },
  
  // We save basic seller info right on the listing for faster reads
  seller: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true }
  },
  
  status: { type: String, enum: ['active', 'sold-out', 'expired'], default: 'active' },
  expiryAt: { type: Date, required: true, index: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('produces', produceSchema);