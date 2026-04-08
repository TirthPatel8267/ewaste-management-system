import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });
