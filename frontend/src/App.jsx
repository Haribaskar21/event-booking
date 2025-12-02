import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EventsAdmin from "./pages/admin/EventsAdmin";
import EditEvent from "./pages/admin/EditEvent";
import UsersAdmin from "./pages/admin/UsersAdmin";
import BookingsAdmin from "./pages/admin/BookingsAdmin";

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("adminToken"));
  const location = useLocation();

  // Re-check admin token whenever path changes
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, [location.pathname]);

  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/booking-success/:id" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/events"
          element={isAdmin ? <EventsAdmin /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/events/:id"
          element={isAdmin ? <EditEvent /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/events/new"
          element={isAdmin ? <EditEvent /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/users"
          element={isAdmin ? <UsersAdmin /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/bookings"
          element={isAdmin ? <BookingsAdmin /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
