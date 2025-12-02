import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

export default function BookingSuccess() {
  const loc = useLocation();
  const params = useParams();
  const bookingId = params.id || (loc.state && loc.state.bookingId);
  const [event, setEvent] = useState(loc.state?.event || null);
  const [loading, setLoading] = useState(!event);

  useEffect(() => {
    // If event not passed in state, try to fetch from my-bookings and find it
    if (event || !bookingId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await API.get("/events/my/bookings");
        const booking = res.data.find(b => (b._id === bookingId || b.bookingId === bookingId || String(b._id) === String(bookingId)));
        if (booking) {
          setEvent(booking.eventId || booking.event);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto bg-gray-900/60 border border-gray-800 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-300 mb-2">Booking Successful</h2>
          <p className="text-gray-300 mb-4">Booking ID: <span className="font-mono text-sm text-white">{bookingId}</span></p>

          {loading ? (
            <div className="animate-pulse h-24" />
          ) : event ? (
            <>
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p className="text-gray-400">{event.date} • {event.time || "Time TBA"}</p>
              <p className="text-gray-300 mt-3">{event.venue}</p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <Link to="/my-bookings" className="px-4 py-2 bg-blue-600 rounded">View My Bookings</Link>
                <a
                  href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title || "")}&dates=${(event.date || "").replace(/-/g,'')}/${(event.date || "").replace(/-/g,'')}&details=${encodeURIComponent(event.description || "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-gray-700 rounded"
                >
                  Add to calendar
                </a>
              </div>
            </>
          ) : (
            <div className="text-gray-400">Event details not available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
