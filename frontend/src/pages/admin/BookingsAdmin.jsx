import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../api";
import { useEffect, useState } from "react";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data);
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
          <h1 className="text-3xl font-bold text-blue-500 tracking-wide">Bookings Management</h1>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-800 bg-gray-900/50 backdrop-blur-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">User</th>
                <th className="p-4 text-left font-semibold">Event</th>
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b, index) => (
                  <tr
                    key={b._id}
                    className={`border-b border-gray-800 hover:bg-gray-800/60 transition ${
                      index % 2 === 0 ? "bg-gray-900/40" : "bg-gray-900/20"
                    }`}
                  >
                    <td className="p-4 capitalize">{b.userId?.name || "N/A"}</td>
                    <td className="p-4">{b.eventId?.title || "N/A"}</td>
                    <td className="p-4">{b.createdAt?.slice(0, 10)}</td>
                    <td
                      className={`p-4 font-semibold ${
                        b.status === "confirmed"
                          ? "text-green-400"
                          : b.status === "cancelled"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {b.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">
                    No bookings found 😕
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Count Info */}
        <p className="mt-4 text-gray-500">
          Total Bookings: <span className="text-blue-400 font-semibold">{bookings.length}</span>
        </p>
      </main>
    </div>
  );
}
