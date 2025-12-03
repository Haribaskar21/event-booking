import SidebarAdmin from "../../components/SidebarAdmin";
import api from "../../api";
import { useEffect, useState } from "react";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/admin/login";
    return;
  }
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    console.error(err.response?.data || err);
  }
};


  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <SidebarAdmin />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-400">
            Manage Users
          </h1>
        </div>

        <div className="mt-8 overflow-x-auto rounded-lg shadow-lg bg-gray-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase text-xs tracking-wider border-b border-gray-600">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b border-gray-700 hover:bg-gray-750 transition"
                  >
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-gray-300">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
