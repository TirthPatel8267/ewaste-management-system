"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function TrackingPage() {
  const [data, setData] = useState<any>(null);

  // 📡 Fetch tracking data
  const fetchData = async () => {
    try {
      const res = await fetch("/api/tracking");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 Status Steps
  const steps = [
    "Pending",
    "Approved",
    "Accepted",
    "Out for Pickup",
    "Completed",
  ];

  if (!data) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading tracking...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          📦 Pickup Tracking
        </h1>

        {/* Current Status */}
        <div className="text-center mb-10">
          <p className="text-gray-500">Current Status</p>
          <h2 className="text-2xl font-bold text-green-600">
            {data.status}
          </h2>
        </div>

        {/* Stepper */}
        <div className="relative flex justify-between items-center">

          {steps.map((step, index) => {
            const isCompleted =
              steps.indexOf(data.status) >= index;

            return (
              <div key={index} className="flex-1 text-center relative">

                {/* Line */}
                {index !== 0 && (
                  <div
                    className={`absolute top-4 left-0 w-full h-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{ zIndex: 0 }}
                  />
                )}

                {/* Circle */}
                <div
                  className={`relative z-10 w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white text-lg ${
                    isCompleted
                      ? "bg-green-600"
                      : "bg-gray-300"
                  } transition duration-300`}
                >
                  {isCompleted ? <FaCheckCircle /> : index + 1}
                </div>

                {/* Label */}
                <p className="mt-2 text-sm font-medium">
                  {step}
                </p>

              </div>
            );
          })}

        </div>

        {/* Extra Info */}
        <div className="mt-10 bg-green-50 p-6 rounded-xl text-center">

          <p className="text-gray-600">
            🚚 Your pickup is being processed. Please stay available at your location.
          </p>

        </div>

      </div>

    </div>
  );
}