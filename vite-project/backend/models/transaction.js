// models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  produceName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String, required: true },
  pricePerUnit: { type: Number, required: true, min: 0 },

  seller: { type: String, required: true },
  buyer: { type: String, required: true },
  pickupLocation: { type: String, required: true },

  completedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);
