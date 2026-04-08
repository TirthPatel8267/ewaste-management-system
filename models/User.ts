import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
  type: String,
  enum: ["admin", "collector", "user"],
  default: "user",
},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //points: {
     // type:Number,
      //default: 0,
    //},
  },

  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);