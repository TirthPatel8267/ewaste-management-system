"use client";

import Link from "next/link";
import { FaHome, FaPlus, FaRecycle, FaCalculator, FaComment } from "react-icons/fa";
const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  window.location.href = "/login";
};

export default function Sidebar() {
  const handleLogout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  window.location.href = "/login";
};
  return (
    <div data-aos="fade-up" className="w-64 h-screen bg-green-700 text-white fixed left-0 top-0 p-6">

      <h1 className="text-2xl font-bold mb-10">
        ♻ E-Waste
      </h1>
      
      <nav className="flex flex-col gap-6 text-lg">

        <Link href="http://localhost:3000/" className="flex items-center gap-2 p-2 rounded hover:bg-green-600 transition">
        <FaHome />
          Home
        </Link>

        <Link href="/request" className="flex items-center gap-2 p-2 rounded hover:bg-green-600 transition">
          <FaRecycle /> Request Pickup
          
        </Link>

        <Link href="/ai" className="flex items-center gap-2 p-2 rounded hover:bg-green-600 transition">
          <FaCalculator /> Price Estimator
        
        </Link>
        <Link href="/centers" className="flex items-center gap-2 p-2 rounded hover:bg-green-600 transition">
          <FaCalculator /> Find Centers
        
        </Link>


        <Link href="/feedback" className="flex items-center gap-2 p-2 rounded hover:bg-green-600 transition">
          <FaComment />Feedback
        </Link>
        <button
                 onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded mt-6"
                  >
                    Logout
                  </button>
      </nav>

    </div>
  );
}