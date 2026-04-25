import mongoose from "mongoose";

const PickupSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  category: String,
  date: String,
  time: String,
  userId: {
    type: String,
    required: false,
  },
 status: {
  type: String,
  enum: ["Pending", "Approved", "Accepted", "Out for Pickup", "Completed"],
  default: "Pending",
},
  location: {
    lat: Number,
    lng: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { strict: false, timestamps: true });

delete mongoose.models.Pickup;
export default mongoose.model("Pickup", PickupSchema);