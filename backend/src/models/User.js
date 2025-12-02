import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  role: { type: String, enum: ["user","admin"], default: "user" },
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
