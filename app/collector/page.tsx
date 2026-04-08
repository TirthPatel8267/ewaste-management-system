"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTruck,
} from "react-icons/fa";

export default function CollectorPage() {
  const [data, setData] = useState<any[]>([]);

  // 📡 Fetch data
  const fetchData = async () => {
    const res = await fetch("/api/tracking");
    const result = await res.json();
    setData(result ? [result] : []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 Update status
  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    fetchData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-blue-100 text-blue-600";
      case "Accepted":
        return "bg-purple-100 text-purple-600";
      case "Out for Pickup":
        return "bg-yellow-100 text-yellow-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-50 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🚚 Collector Dashboard
      </h1>

      {/* Cards */}
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-2xl transition"
        >
          {/* Top Info */}
          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FaUser /> {item.name}
              </h2>

              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <FaMapMarkerAlt /> {item.address || "No address"}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                📦 {item.category}
              </p>
            </div>

            {/* Status */}
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                item.status
              )}`}
            >
              {item.status}
            </span>

          </div>

          {/* Divider */}
          <div className="border-t my-4" />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">

            {item.status === "Approved" && (
              <button
                onClick={() => updateStatus(item._id, "Accepted")}
                className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                <FaCheckCircle /> Accept Job
              </button>
            )}

            {item.status === "Accepted" && (
              <button
                onClick={() => updateStatus(item._id, "Out for Pickup")}
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <FaTruck /> Start Pickup
              </button>
            )}

            {item.status === "Out for Pickup" && (
              <button
                onClick={() => updateStatus(item._id, "Completed")}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <FaCheckCircle /> Mark Completed
              </button>
            )}

            {item.status === "Completed" && (
              <div className="text-green-600 font-semibold flex items-center gap-2">
                <FaCheckCircle /> Pickup Done
              </div>
            )}

            {item.status === "Pending" && (
              <div className="text-gray-500">
                Waiting for admin approval...
              </div>
            )}

          </div>

        </div>
      ))}

    </div>
  );
}