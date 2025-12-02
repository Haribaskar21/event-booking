import SidebarAdmin from "../../components/SidebarAdmin";
import { Link } from "react-router-dom";
import api from "../../api";
import { useEffect, useState } from "react";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const deleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/admin/events/${id}`);
      getEvents();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      <SidebarAdmin />

      <main className="flex-1 p-8 text-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500 tracking-wide">
            Events Management
          </h1>

          <Link
            to="/admin/events/new"
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-lg transition-all duration-200 text-white font-semibold shadow-lg"
          >
            + Create Event
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-800 bg-gray-900/40 backdrop-blur-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="p-4 font-semibold text-left">Name</th>
                <th className="p-4 font-semibold text-left">Date</th>
                <th className="p-4 font-semibold text-left">Status</th>
                <th className="p-4 font-semibold text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr
                    key={event._id}
                    className={`border-b border-gray-700 hover:bg-gray-800/60 transition ${
                      index % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/10"
                    }`}
                  >
                    <td className="p-4">{event.title}</td>

                    <td className="p-4">
                      {event.date ? event.date.slice(0, 10) : "—"}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-md text-green-400 border border-green-600 bg-green-900/40 text-sm font-medium">
                        Active
                      </span>
                    </td>

                    <td className="p-4 flex gap-3">
                      <Link
                        to={`/admin/events/${event._id}`}
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 hover:bg-yellow-600 transition-all"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 hover:bg-red-700 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-gray-500 italic tracking-wide"
                  >
                    No events found…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <p className="mt-4 text-gray-400">
          Total Events:{" "}
          <span className="text-blue-400 font-bold">{events.length}</span>
        </p>
      </main>
    </div>
  );
}
