import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../api";
import { useEffect, useState } from "react";
import { Calendar, Users, Ticket } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await api.get("/admin/overview");
      setData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      }
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Events",
      value: loading ? "..." : data.totalEvents,
      icon: <Calendar size={40} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Total Users",
      value: loading ? "..." : data.totalUsers,
      icon: <Users size={40} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Total Bookings",
      value: loading ? "..." : data.totalBookings,
      icon: <Ticket size={40} />,
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <SidebarAdmin />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold mb-10 text-blue-400 drop-shadow-lg tracking-wide">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.color} p-8 rounded-2xl shadow-xl 
              transform hover:scale-105 transition duration-300 flex items-center gap-6`}
            >
              <div className="text-white opacity-90">{card.icon}</div>
              <div>
                <p className="text-4xl font-bold text-white">{card.value}</p>
                <p className="text-gray-200 mt-1 text-sm uppercase tracking-wide">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
