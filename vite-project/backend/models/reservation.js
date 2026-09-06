// models/Reservation.js
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  produceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produce', required: true },
  produceName: { type: String, required: true },
  
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerName: { type: String, required: true },
  
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String, required: true },
  
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String, required: true },
  zone: { type: String }, // Where pickup occurs
  
  status: { 
    type: String, 
    enum: ['ready-for-pickup', 'grouped', 'completed', 'cancelled'], 
    default: 'ready-for-pickup' 
  },
  pickupWindow: { type: String, default: 'Awaiting pickup plan' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Reservation', reservationSchema);