"use client";

import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";
import { motion } from "framer-motion";

export default function QuickMap() {
  return (
    <div className="glass-card rounded-[2rem] overflow-hidden shadow-xl border border-white/40 group">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FaMapMarkerAlt className="text-emerald-500" /> Nearest Center
          </h3>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">2.4 km away</span>
        </div>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Green Earth Recycling - Ahmedabad, Gujarat
        </p>
      </div>

      <div className="relative h-44 w-full">
        <iframe
          src="https://maps.google.com?q=Ahmedabad&output=embed"
          className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-t border-white/20 shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.1)]" />
      </div>

      <div className="p-4 bg-gray-50/50 backdrop-blur-sm flex gap-3">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Ahmedabad"
          target="_blank"
          className="flex-1 bg-white text-emerald-700 border border-emerald-100 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
        >
          <FaDirections /> Directions
        </a>
      </div>
    </div>
  );
}
