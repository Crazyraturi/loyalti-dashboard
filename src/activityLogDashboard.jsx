import React, { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  LayoutDashboard,
  MessageSquare,
  Box,
  Users,
  List,
} from "lucide-react";

const logs = [
  {
    id: 1,
    user: "Admin John",
    action: "Edited Product",
    target: "Nike Shoes",
    date: "Aug 28, 2025 – 10:32 AM",
    status: "Success",
  },
  {
    id: 2,
    user: "User Priya",
    action: "Approved Review",
    target: "Bag (Review #123)",
    date: "Aug 27, 2025 – 7:15 PM",
    status: "Success",
  },
  {
    id: 3,
    user: "Admin Raj",
    action: "Updated Status",
    target: "Order #456 → Shipped",
    date: "Aug 27, 2025 – 6:50 PM",
    status: "Pending",
  },
  {
    id: 4,
    user: "Admin Meena",
    action: "Deleted Product",
    target: "Old Watch Model",
    date: "Aug 26, 2025 – 5:10 PM",
    status: "Failed",
  },
];

const ActivityLogDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredLogs = () => {
    if (activeTab === "all") return logs;
    if (activeTab === "products")
      return logs.filter((l) => l.action.toLowerCase().includes("product"));
    if (activeTab === "reviews")
      return logs.filter((l) => l.action.toLowerCase().includes("review"));
    if (activeTab === "users")
      return logs.filter((l) => l.action.toLowerCase().includes("user"));
    if (activeTab === "system")
      return logs.filter((l) => l.action.toLowerCase().includes("status"));
    return logs;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <LayoutDashboard /> Admin Panel
        </h2>
        <nav className="flex flex-col gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600 transition">
            <Box size={18} /> Products
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600 transition">
            <MessageSquare size={18} /> Reviews
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600 transition">
            <Users size={18} /> Users
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-900">
            <List size={18} /> Activity Logs
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Activity Logs</h1>
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-2 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-8 pr-4 py-2 border rounded-lg text-sm w-64 focus:ring focus:ring-blue-300"
              />
            </div>
            <button className="flex items-center gap-1 border px-3 py-2 rounded-lg text-sm bg-white hover:bg-gray-50">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-4">
          {["all", "products", "reviews", "users", "system"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-left">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Target</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredLogs().map((l) => (
                <tr key={l.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{l.user}</td>
                  <td className="p-3">{l.action}</td>
                  <td className="p-3">{l.target}</td>
                  <td className="p-3 text-gray-500">{l.date}</td>
                  <td className="p-3">
                    {l.status === "Success" && (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle size={16} /> {l.status}
                      </span>
                    )}
                    {l.status === "Pending" && (
                      <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                        <Clock size={16} /> {l.status}
                      </span>
                    )}
                    {l.status === "Failed" && (
                      <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                        <AlertTriangle size={16} /> {l.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

     
    </div>
  );
};

export default ActivityLogDashboard;
