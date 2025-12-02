import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUsers, FaClipboardList } from "react-icons/fa";

export default function SidebarAdmin() {
  return (
    <aside className="w-64 bg-gray-950 text-gray-200 min-h-screen py-6 px-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-blue-400">Admin Panel</h2>

      <nav className="space-y-3">
        <Link className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg" to="/admin">
          <FaHome /> Dashboard
        </Link>

        <Link className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg" to="/admin/events">
          <FaCalendarAlt /> Manage Events
        </Link>

        <Link className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg" to="/admin/users">
          <FaUsers /> Users
        </Link>

        <Link className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg" to="/admin/bookings">
          <FaClipboardList /> Bookings
        </Link>
      </nav>
    </aside>
  );
}
