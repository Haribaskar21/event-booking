import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="text-gray-400">Discover and book events</div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-36 bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-gray-400">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => (
              <article key={ev._id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{ev.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">{ev.date} • {ev.time || "Time TBA"}</p>
                    <p className="text-sm text-gray-300 mt-2">{ev.venue}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Capacity</div>
                    <div className="font-semibold text-white">{ev.capacity || 0}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link to={`/event/${ev._id}`} className="text-blue-300 hover:underline">View details</Link>
                  <span className="text-sm text-gray-400">{/* placeholder for status */}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
