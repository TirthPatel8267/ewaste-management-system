"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Account Created ✅");
        window.location.href = "/login";
      } else {
        alert(data.message || "Error ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-green-100 to-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-300 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* Card */}
      <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[1000px] border border-white/40">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Account 🚀
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 bg-white/80">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 outline-none bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 bg-white/80">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 outline-none bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 bg-white/80">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="flex items-center border rounded-lg px-3 bg-white/80">
            <FaUserTag className="text-gray-400 mr-2" />
            <select
              className="w-full p-3 outline-none bg-transparent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="collector">Collector</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white p-3 rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => (window.location.href = "/login")}
            className="text-green-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}