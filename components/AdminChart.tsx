"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", pickups: 4 },
  { name: "Tue", pickups: 6 },
  { name: "Wed", pickups: 3 },
  { name: "Thu", pickups: 8 },
  { name: "Fri", pickups: 5 },
];

export default function AdminChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4">
        Weekly Pickups
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pickups" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}