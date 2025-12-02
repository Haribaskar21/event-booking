import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: { type: String, enum: ["booked","cancelled","attended"], default: "booked" }
}, { timestamps: true });

bookingSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
