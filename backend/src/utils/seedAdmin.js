import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ email: "admin@tdtv.com" });
  if (!exists) {
    const hashed = await bcrypt.hash("Admin@123", 10);
    await User.create({ name: "Admin", email: "admin@tdtv.com", password: hashed, role: "admin" });
    console.log("Admin created");
  } else {
    console.log("Admin already exists");
  }
  process.exit();
}
run();
