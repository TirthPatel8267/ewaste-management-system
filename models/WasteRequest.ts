import mongoose from "mongoose";

const WasteRequestSchema = new mongoose.Schema({

  userId:{
    type:String,
    required:true
  },

  wasteType:{
    type:String,
    required:true
  },

  address:{
    type:String,
    required:true
  },

  pickupDate:{
    type:String,
    required:true
  },

  status:{
    type:String,
    default:"pending"
  }

},{timestamps:true});

export default mongoose.models.WasteRequest || mongoose.model("WasteRequest",WasteRequestSchema);