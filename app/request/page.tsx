"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaLaptop,
  FaCalendarAlt,
  FaClock,
  FaUpload,
  FaEnvelope,
} from "react-icons/fa";

export default function RequestPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    category: "",
    date: "",
    time: "",
    photo: null as File | null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/pickup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Pickup Request Submitted ✅");
        router.push("/dashboard");
      } else {
        alert("Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="ml-64 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10 space-y-6"
      >

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-600">
          ♻ Schedule Pickup
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute top-4 left-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

        </div>
        
        {/* Email */}
<div className="relative">
  <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
  <input
    type="email"
    name="email"
    placeholder="Email Address"
    className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
    onChange={handleChange}
    required
  />
</div>

        

        {/* Address */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute top-4 left-3 text-gray-400" />
          <textarea
            name="address"
            placeholder="Full Address"
            className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            onChange={handleChange}
            required
          />
        </div>
        {/* google map pickup location */}
        <div className="rounded-xl overflow-hidden">
  <iframe
   src={`https://maps.google.com/maps?q=${form.address}&output=embed`}
    className="w-full h-64 border-0"
    loading="lazy"
  ></iframe>
</div>

        {/* Category */}
        <div className="relative">
          <FaLaptop className="absolute top-4 left-3 text-gray-400" />
          <select
            name="category"
            className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option>Laptop</option>
            <option>Mobile</option>
            <option>Batteries</option>
            <option>Printer</option>
            <option>Other</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-5">

          <div className="relative">
            <FaCalendarAlt className="absolute top-4 left-3 text-gray-400" />
            <input
              type="date"
              name="date"
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <FaClock className="absolute top-4 left-3 text-gray-400" />
            <select
              name="time"
              className="w-full pl-10 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              required
            >
              <option value="">Select Time Slot</option>
              <option>10 AM - 12 PM</option>
              <option>12 PM - 2 PM</option>
              <option>2 PM - 4 PM</option>
              <option>4 PM - 6 PM</option>
            </select>
          </div>

        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-300 p-5 rounded-xl text-center hover:border-green-400 transition cursor-pointer">

          <FaUpload className="text-2xl text-gray-400 mx-auto mb-2" />

          <p className="text-gray-500">
            Click to upload item photo
          </p>

          <input
            type="file"
            name="photo"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg"
        >
          Submit Pickup Request 🚀
        </button>

      </form>

    </div>
  );
}