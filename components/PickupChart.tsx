"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PickupChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "E-Waste Pickups",
        data: [5, 9, 7, 14, 10, 18],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.3)",
      },
    ],
  };

 return <Line data={data} options={{ responsive: true }} />;
}