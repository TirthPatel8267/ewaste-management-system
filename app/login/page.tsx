"use client";

import {useRouter} from "next/navigation";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useEffect } from "react";

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: any) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data.role);

    if (data.success) {
      // 🔥 ROLE BASED REDIRECT
      if (data.role === "admin") {
        window.location.href = "/admin";
      } else if (data.role === "collector") {
        window.location.href = "/collector";
      } else {
        router.push("/dashboard"); // ✅ USER FIX
        router.refresh
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Login failed ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="text-green-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => (window.location.href = "/register")}
            className="text-green-600 cursor-pointer hover:underline font-medium"
          >
            Sign Up
          </span>
        </p>

      </div>

    </div>
  );
}