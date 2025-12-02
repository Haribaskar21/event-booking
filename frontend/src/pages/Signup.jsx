import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await API.post("/auth/signup", form);
      // auto-login
      const loginRes = await API.post("/auth/login", { email: form.email, password: form.password });
      localStorage.setItem("userToken", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      navigate("/events");
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      <div className="w-full max-w-md bg-gray-900/60 border border-gray-800 backdrop-blur-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Create account</h2>
        {err && <div className="mb-3 text-sm text-red-400 bg-red-900/30 p-2 rounded">{err}</div>}
        <form className="space-y-3" onSubmit={submit}>
          <input required name="name" value={form.name} onChange={onChange} placeholder="Full name"
            className="w-full bg-gray-900 border border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input required name="email" value={form.email} onChange={onChange} type="email" placeholder="Email"
            className="w-full bg-gray-900 border border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)"
            className="w-full bg-gray-900 border border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input required name="password" value={form.password} onChange={onChange} type="password" placeholder="Password (min 6 chars)"
            className="w-full bg-gray-900 border border-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-medium">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-300 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
