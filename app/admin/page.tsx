"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [pickups, setPickups] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // 📊 Fetch data
  const fetchData = async () => {
    const statsRes = await fetch("/api/admin/stats");
    const statsData = await statsRes.json();

    const pickupRes = await fetch("/api/admin/pickups");
    const pickupData = await pickupRes.json();

    setStats(statsData);
    setPickups(pickupData.pickups || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 Update Status
  const updateStatus = async (id: string, status: string) => {
    setLoadingId(id);

    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    await fetchData();
    setLoadingId(null);
  };

  if (!stats) return <div className="p-6">Loading...</div>;

  const chartData = [
    { name: "Pending", value: stats.pending },
    { name: "Approved", value: stats.approved },
    { name: "Completed", value: stats.completed },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-6 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-700">
          🚀 Admin Dashboard
        </h1>
        <span className="text-sm text-gray-500">
          Welcome Admin 👋
        </span>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border">
          <p className="text-gray-500">Total Pickups</p>
          <h2 className="text-3xl font-bold text-green-600">
            {stats.total}
          </h2>
        </div>

        <div className="bg-yellow-100/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border">
          <p>Pending</p>
          <h2 className="text-2xl font-bold">{stats.pending}</h2>
        </div>

        <div className="bg-blue-100/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border">
          <p>Approved</p>
          <h2 className="text-2xl font-bold">{stats.approved}</h2>
        </div>

        <div className="bg-green-100/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border">
          <p>Completed</p>
          <h2 className="text-2xl font-bold">{stats.completed}</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border">

        <h2 className="text-xl font-semibold mb-4">
          📊 Pickup Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* TABLE */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border">

        <h2 className="text-xl font-semibold mb-4">
          📦 Pickup Requests
        </h2>

        <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-xl">

          <table className="w-full text-sm text-center">

            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pickups.map((p) => {
                const status = p.status?.toLowerCase();

                return (
                  <tr key={p._id} className="hover:bg-gray-50 transition">

                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.date}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      {status === "pending" && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                      {status === "approved" && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          Approved
                        </span>
                      )}
                      {status === "completed" && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Completed
                        </span>
                      )}
                      {status === "rejected" && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3">
                      <div className="flex justify-center gap-2">

                        {status === "pending" && (
                          <button
                            onClick={() => updateStatus(p._id, "Approved")}
                            disabled={loadingId === p._id}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs shadow"
                          >
                            {loadingId === p._id ? "..." : "Approve"}
                          </button>
                        )}

                        {status === "approved" && (
                          <button
                            onClick={() => updateStatus(p._id, "Completed")}
                            disabled={loadingId === p._id}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                          >
                            {loadingId === p._id ? "..." : "Complete"}
                          </button>
                        )}

                        {(status === "pending" || status === "approved") && (
                          <button
                            onClick={() => updateStatus(p._id, "Rejected")}
                            disabled={loadingId === p._id}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs shadow"
                          >
                            {loadingId === p._id ? "..." : "Reject"}
                          </button>
                        )}

                        {status === "completed" && (
                          <span className="text-green-600 font-semibold text-xs">
                            ✔ Done
                          </span>
                        )}

                        {status === "rejected" && (
                          <span className="text-red-600 font-semibold text-xs">
                            ✖ Rejected
                          </span>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}