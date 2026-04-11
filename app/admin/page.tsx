"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [pickups, setPickups] = useState<any[]>([]);

  // 📥 Fetch all pickups
  const fetchPickups = async () => {
    const res = await fetch("/api/admin/pickups");
    const data = await res.json();
    setPickups(data.pickups);
  };

  useEffect(() => {
    fetchPickups();
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

    fetchPickups(); // refresh
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-green-600">
        Admin Dashboard
      </h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-green-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pickups.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.category}</td>
              <td className="p-2 border">{p.date}</td>
              <td className="p-2 border">{p.status}</td>

              <td className="p-2 border space-x-2">

                <button
                  onClick={() => updateStatus(p._id, "Approved")}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(p._id, "Completed")}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Complete
                </button>

                <button
                  onClick={() => updateStatus(p._id, "Rejected")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}