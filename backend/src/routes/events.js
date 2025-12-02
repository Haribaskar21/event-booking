import express from "express";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get all events (public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single event by id (public)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Book an event (requires user auth)
router.post("/:id/book", auth(), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const userId = req.user.id;

    // Check if already booked
    const existing = await Booking.findOne({ userId, eventId: event._id });
    if (existing) return res.status(409).json({ message: "Already booked" });

    // Check capacity
    const count = await Booking.countDocuments({ eventId: event._id });
    if (count >= event.capacity) return res.status(422).json({ message: "Event full" });

    const booking = await Booking.create({ userId, eventId: event._id });
    res.status(201).json({ bookingId: booking._id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
