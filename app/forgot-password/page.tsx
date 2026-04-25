"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
      } else {
        setError("No account found with this email. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10">

        {/* Back to Login */}
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors mb-8 font-medium"
        >
          <FaArrowLeft className="text-xs" /> Back to Login
        </Link>

        {!sent ? (
          <>
            {/* Title */}
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              Forgot Password? 🔐
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4 font-medium">
                ❌ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Reset Link
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-3xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Email Sent! ✅
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              We've sent a password reset link to <strong>{email}</strong>.
              Check your inbox (and spam folder).
            </p>
            <p className="text-xs text-gray-400">
              Link expires in 15 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}