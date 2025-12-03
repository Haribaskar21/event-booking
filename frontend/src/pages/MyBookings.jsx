import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await API.get("/events/my/bookings");
        setBookings(res.data);
      } catch (error) {
        setErr(error.response?.data?.message || "Could not load bookings");
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

        {loading ? (
          <div className="space-y-3">
            <div className="h-16 bg-gray-800 rounded animate-pulse" />
            <div className="h-16 bg-gray-800 rounded animate-pulse" />
          </div>
        ) : err ? (
          <div className="text-red-400">{err}</div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-400">You haven't booked any events yet.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const ev = b.eventId || b.event;
              const bookedAt = new Date(b.createdAt || b.created_at || b.date).toLocaleString();
              return (
                <div key={b._id || b.bookingId} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{ev?.title || "Unknown event"}</h3>
                    <p className="text-sm text-gray-400">{ev?.date} • {ev?.time || "Time TBA"}</p>
                    <p className="text-xs text-gray-500 mt-1">Booked on {bookedAt}</p>
                  </div>

                  <div className="text-right">
                    <div className={`px-3 py-1 rounded text-sm ${
                      b.status === "booked"
                        ? "bg-green-700 text-white"
                        : b.status === "cancelled"
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}>
                      {b.status || "—"}
                    </div>

                    <div className="mt-3">
                      <Link to={`/event/${ev?._id || ev?.id}`} className="text-blue-300 hover:underline">View</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
