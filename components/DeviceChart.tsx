"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DeviceChart({ chartData }: { chartData?: { labels: string[], data: number[] } }) {
  const data = {
    labels: chartData?.labels || ["Laptops", "Mobiles", "Printers", "Batteries", "Others"],
    datasets: [
      {
        label: "Recycled",
        data: chartData?.data || [0, 0, 0, 0, 0],
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#6366f1"
        ],
        borderWidth: 0,
        hoverOffset: 12,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 11,
            family: "'Outfit', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: "#064e3b",
        padding: 12,
        cornerRadius: 12,
      },
    },
    cutout: "70%",
  };

  return (
    <div className="h-[250px] w-full flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}