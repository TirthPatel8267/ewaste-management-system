"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Toggle theme
  //const toggleTheme = () => {
    //const html = document.documentElement;

    //if (dark) {
     // html.classList.remove("dark");
      //localStorage.setItem("theme", "light");
    //} else {
     // html.classList.add("dark");
      //localStorage.setItem("theme", "dark");
    //}

    //setDark(!dark);
  //};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass shadow-lg backdrop-blur-md bg-black/30 border-b border-white/20 dark:bg-gray-900/70">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2 text-white text-3xl font-bold gradient-text">
          ♻
          <span>E-Waste</span>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6 text-white text-lg font-medium">

          <Link href="/" className="hover:text-green-400 transition">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-green-400 transition">
            Dashboard
          </Link>

          <Link href="/request" className="hover:text-green-400 transition">
            Pickup
          </Link>
          <Link href="/tracking" className="hover:text-green-400 transition">
           Tracking
          </Link>
          <Link href="/ai" className="hover:text-green-400 transition">
          AI Detect
          </Link>

          <Link href="/feedback" className="hover:text-green-400 transition">
            Feedback
          </Link>

          <Link href="/about" className="hover:text-green-400 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-green-400 transition">
            Contact
          </Link>

        

          {/* Login Button */}
          <Link
            href="/login"
            className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}