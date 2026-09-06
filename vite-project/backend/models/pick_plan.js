// models/PickupPlan.js
import mongoose from 'mongoose';

const pickupPlanSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Array of ObjectIds linking back to the specific reservations
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  
  zone: { type: String, required: true },
  window: { type: String, required: true }, // e.g., "Tuesday 2PM - 4PM"
  notes: { type: String }, // e.g., "Leave at back door"
  
  status: { type: String, enum: ['Scheduled', 'In-Progress', 'Completed'], default: 'Scheduled' },
  reservationCount: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PickupPlan', pickupPlanSchema);