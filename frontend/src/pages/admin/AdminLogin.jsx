import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const { data } = await API.post("auth/login", form);

if (data.user.role !== "admin") return setError("Admins only!");

localStorage.setItem("token", data.token); // new

navigate("/admin");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-center text-3xl font-bold mb-8 text-white tracking-wide">
          Admin Panel
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 bg-red-900/40 p-2 rounded border border-red-700">
            {error}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Secure access • Admins Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
