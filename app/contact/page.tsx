"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Message Sent ✅");
  };

  return (
    <div className="ml-64 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl space-y-6">

        <h2 className="text-3xl font-bold text-green-600 text-center">
          📞 Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div className="relative">
            <FaCommentDots className="absolute top-4 left-3 text-gray-400" />
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            Send Message 🚀
          </button>

        </form>

      </div>
    </div>
  );
}