"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTruck,
  FaChartBar,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaChevronDown,
  FaBoxes,
  FaTachometerAlt,
  FaHome,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface CollectorSidebarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export default function CollectorSidebar({ activeSection = "dashboard", onNavigate }: CollectorSidebarProps) {
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
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const navItems = [
    { id: "home", name: "Home", icon: <FaHome />, href: "/" },
    { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "pickups", name: "My Pickups", icon: <FaBoxes /> },
    { id: "analytics", name: "Analytics", icon: <FaChartBar /> },
    { id: "map", name: "Route Map", icon: <FaMapMarkerAlt /> },
    { id: "earnings", name: "Earnings", icon: <FaMoneyBillWave /> },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen fixed left-0 top-0 p-6 flex flex-col z-50"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0c4a6e 100%)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            background: "linear-gradient(135deg, #06b6d4, #0891b2)",
            boxShadow: "0 8px 24px rgba(6,182,212,0.3)",
          }}
        >
          <FaTruck className="text-xl text-white" />
        </div>
        <div>
          <h1
            className="text-xl font-black tracking-tight"
            style={{
              background: "linear-gradient(to right, #ffffff, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            EcoCycle
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">
            Collector Hub
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = item.id === activeSection;
          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group text-left w-full ${
                isActive
                  ? "text-white shadow-lg"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              style={
                isActive
                  ? {
                      background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                      boxShadow: "0 8px 24px rgba(6,182,212,0.25)",
                    }
                  : {}
              }
            >
              <span
                className={`text-lg transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="collector-active"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  style={{
                    boxShadow: "0 0 8px rgba(255,255,255,0.8)",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-white/10 relative z-50">
        {loading ? (
          <div className="animate-pulse bg-white/5 p-4 rounded-2xl h-[72px] border border-white/5" />
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-2xl flex items-center justify-between border border-white/10 text-left group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                  }}
                >
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white leading-none">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  <span className="text-xs text-cyan-300 mt-1 capitalize font-medium">
                    Collector
                  </span>
                </div>
              </div>
              <FaChevronDown
                className={`text-cyan-400 text-sm transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[calc(100%+8px)] left-0 w-full rounded-2xl shadow-2xl overflow-hidden z-50"
                  style={{
                    background: "#0f172a",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                >
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <p className="text-sm font-semibold truncate text-white">
                      {user.name || "Collector Profile"}
                    </p>
                    <p className="text-xs text-cyan-300/80 truncate mt-1">
                      {user.email}
                    </p>
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
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl transition-all shadow-lg text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #0891b2, #06b6d4)",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </motion.div>
  );
}
