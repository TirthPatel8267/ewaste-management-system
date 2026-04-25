"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaRecycle, FaCalculator, FaComment, FaMapMarkerAlt, FaSignOutAlt, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
  };

  const navItems = [
    { name: "Home", icon: <FaHome />, href: "http://localhost:3000/" },
    { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
    { name: "Request Pickup", icon: <FaRecycle />, href: "/request" },
    { name: "Price Estimator", icon: <FaCalculator />, href: "/estimator" },
    { name: "Find Centers", icon: <FaMapMarkerAlt />, href: "/centers" },
    { name: "Feedback", icon: <FaComment />, href: "/feedback" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen fixed left-0 top-0 p-6 flex flex-col bg-[#064e3b] text-white shadow-2xl z-50 border-r border-emerald-800/30"
    >
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <FaRecycle className="text-2xl text-white animate-spin-slow" />
        </div>
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
          EcoCycle
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${pathname === item.href
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
              : "text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white"
              }`}
          >
            <span className={`text-xl transition-transform duration-300 ${pathname === item.href ? "scale-110" : "group-hover:scale-110"}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
            {pathname === item.href && (
              <motion.div
                layoutId="active-pill"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-emerald-800/50 relative z-50">
        {loading ? (
          <div className="animate-pulse bg-emerald-900/40 p-4 rounded-2xl h-[72px] border border-emerald-800/30"></div>
        ) : user ? (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-emerald-900/40 hover:bg-emerald-800/50 transition-colors p-3 rounded-2xl flex items-center justify-between border border-emerald-800/30 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white leading-none">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <span className="text-xs text-emerald-300 mt-1 capitalize font-medium">
                    {user.role || 'User'}
                  </span>
                </div>
              </div>
              <FaChevronDown className={`text-emerald-400 text-sm transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-[#064e3b] outline outline-1 outline-emerald-700 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-emerald-800/50 bg-emerald-900/20">
                    <p className="text-sm font-semibold truncate text-white">{user.name || 'User Profile'}</p>
                    <p className="text-xs text-emerald-300/80 truncate mt-1">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-4 text-red-300 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-bold"
                  >
                    <FaSignOutAlt className="text-lg" />
                    Secure Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 p-3.5 rounded-xl transition-all shadow-lg text-sm font-bold"
          >
            <FaUserCircle className="text-lg" />
            Login
          </Link>
        )}
      </div>
    </motion.div>
  );
}