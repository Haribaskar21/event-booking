import express from "express";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Admin only
const adminAuth = auth(true);

// Dashboard overview
router.get("/overview", adminAuth, async (req, res) => {
  const totalEvents = await Event.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();
  res.json({ totalEvents, totalUsers, totalBookings });
});

// Admin CRUD for events
router.get("/events", adminAuth, async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

router.post("/events", adminAuth, async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
});

router.put("/events/:id", adminAuth, async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

router.delete("/events/:id", adminAuth, async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ message: "Event deleted" });
});

// Admin bookings
router.get("/bookings", adminAuth, async (req, res) => {
  const bookings = await Booking.find().populate("userId eventId");
  res.json(bookings);
});

// Admin users
router.get("/users", adminAuth, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
