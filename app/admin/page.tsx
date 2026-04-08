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

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  const chartData = [
    { name: "Pending", value: stats.pending },
    { name: "Approved", value: stats.approved },
    { name: "Completed", value: stats.completed },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-green-600">
        📊 Admin Analytics Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div data-aos="fade-up" className="bg-white p-6 rounded-xl shadow">
          <p>Total Pickups</p>
          <h2 className="text-2xl font-bold text-green-600">
            {stats.total}
          </h2>
        </div>

        <div data-aos="fade-up" className="bg-yellow-100 p-6 rounded-xl shadow">
          <p>Pending</p>
          <h2 className="text-2xl font-bold">
            {stats.pending}
          </h2>
        </div>

        <div data-aos="fade-up" className="bg-blue-100 p-6 rounded-xl shadow">
          <p>Approved</p>
          <h2 className="text-2xl font-bold">
            {stats.approved}
          </h2>
        </div>

        <div data-aos="fade-up" className="bg-green-100 p-6 rounded-xl shadow">
          <p>Completed</p>
          <h2 className="text-2xl font-bold">
            {stats.completed}
          </h2>
        </div>

      </div>

      {/* CHART */}
      <div data-aos="fade-up" className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Pickup Status Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}