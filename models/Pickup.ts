import mongoose from "mongoose";

const PickupSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  category: String,
  date: String,
  time: String,
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
});

export default mongoose.models.Pickup ||
  mongoose.model("Pickup", PickupSchema);