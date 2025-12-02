import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function EventDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [ev, setEv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingState, setBookingState] = useState({ loading: false, error: "" });

  useEffect(() => {
    API.get(`/events/${id}`)
      .then(res => setEv(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    setBookingState({ loading: true, error: "" });
    try {
      // backend: POST /api/events/:id/book
      const res = await API.post(`/events/${id}/book`);
      const bookingId = res.data.bookingId || res.data._id || res.data.booking_id;
      // navigate to success and pass booking + event in location state for quick render
      nav(`/booking-success/${bookingId}`, { state: { bookingId, event: ev } });
    } catch (err) {
      const msg = err.response?.data?.message || "Booking failed";
      setBookingState({ loading: false, error: msg });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="animate-pulse">Loading event...</div>
      </div>
    );
  }

  if (!ev) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div>Event not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      <Navbar />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-3xl mx-auto bg-gray-900/60 border border-gray-800 rounded-xl p-6">
          <h1 className="text-3xl font-bold text-white">{ev.title}</h1>
          <p className="text-gray-400 mt-2">{ev.date} • {ev.time || "Time TBA"} • {ev.venue}</p>

          <div className="mt-4 text-gray-300 leading-relaxed">
            {ev.description || "No description provided."}
          </div>

          {ev.speakers && ev.speakers.length > 0 && (
            <section className="mt-4">
              <h3 className="text-white font-semibold">Speakers</h3>
              <ul className="mt-2 text-gray-300">
                {ev.speakers.map((s, i) => <li key={i}>{s.name || s}</li>)}
              </ul>
            </section>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleBook}
              disabled={bookingState.loading}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium"
            >
              {bookingState.loading ? "Booking..." : "Book / Register"}
            </button>

            <div className="text-sm text-gray-400">Remaining seats: <span className="font-semibold">{/* optional: show seats */}—</span></div>
          </div>

          {bookingState.error && <div className="mt-3 text-sm text-red-400">{bookingState.error}</div>}
        </div>
      </main>
    </div>
  );
}
