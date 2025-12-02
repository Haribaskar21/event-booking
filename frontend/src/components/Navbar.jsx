import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md px-6 py-4 shadow-lg flex items-center justify-between text-white fixed w-full z-50">
      <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
        Eventify
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-400 transition">Events</Link>
        {userToken && (
          <Link to="/my-bookings" className="hover:text-blue-400 transition">
            My Bookings
          </Link>
        )}

        {!userToken ? (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
