import SidebarAdmin from "../../components/SidebarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useEffect, useState } from "react";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    capacity: "",
  });

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEventData(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/admin/events/${id}`, eventData);
      } else {
        await api.post(`/admin/events`, eventData);
      }
      navigate("/admin/events");
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const formFields = [
    { key: "title", type: "text", label: "Event Title" },
    { key: "description", type: "textarea", label: "Description" },
    { key: "date", type: "date", label: "Event Date" },
    { key: "time", type: "time", label: "Event Time" },
    { key: "venue", type: "text", label: "Venue" },
    { key: "capacity", type: "number", label: "Capacity" },
  ];

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <SidebarAdmin />

      <main className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-blue-400 mb-8">
          {id ? "Edit Event" : "Create New Event"}
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {formFields.map((field) =>
            field.type === "textarea" ? (
              <textarea
                key={field.key}
                rows="4"
                required
                placeholder={field.label}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                value={eventData[field.key]}
                onChange={(e) =>
                  setEventData({ ...eventData, [field.key]: e.target.value })
                }
              />
            ) : (
              <input
                key={field.key}
                type={field.type}
                required
                placeholder={field.label}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                value={eventData[field.key]}
                onChange={(e) =>
                  setEventData({ ...eventData, [field.key]: e.target.value })
                }
              />
            )
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
            >
              {id ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
