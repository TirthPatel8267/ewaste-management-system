"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function Feedback() {
  return (
    <DashboardLayout>

      {/* Main Container */}
      <div className="ml-64 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Feedback 💬
          </h1>
          <p className="text-gray-500">
            Help us improve your experience
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10 hover:shadow-green-200 transition">

          <form className="space-y-6">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
                required
              />
            </div>

            {/* Feedback Type */}
            <select
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            >
              <option>Select Feedback Type</option>
              <option>Service</option>
              <option>Website</option>
              <option>Pickup Experience</option>
            </select>

            {/* Message */}
            <div className="relative">
              <FaCommentDots className="absolute top-4 left-3 text-gray-400" />
              <textarea
                rows={4}
                placeholder="Write your feedback..."
                className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Submit Feedback 🚀
            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>
  );
}