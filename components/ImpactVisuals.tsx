"use client";

import { motion } from "framer-motion";
import { FaTree, FaTint, FaCloud } from "react-icons/fa";

interface ImpactProps {
  co2Saved: string;
  metalsRecovered: string;
}

export default function ImpactVisuals({ co2Saved, metalsRecovered }: ImpactProps) {
  const treesSaved = (parseFloat(co2Saved) / 20).toFixed(2); // Mock logic: 20kg CO2 = 1 tree year

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="glass-card p-6 rounded-3xl flex flex-col items-center text-center group"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
          <FaCloud className="text-3xl text-emerald-600 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">CO₂ Emissions Saved</h3>
        <p className="text-3xl font-black text-emerald-700">{co2Saved} kg</p>
        <p className="text-xs text-gray-400 mt-2">Offset equivalent to 12 flights</p>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="glass-card p-6 rounded-3xl flex flex-col items-center text-center group"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
          <FaTree className="text-3xl text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Trees Equivalent</h3>
        <p className="text-3xl font-black text-blue-700">{treesSaved}</p>
        <p className="text-xs text-gray-400 mt-2">Forest growth potential</p>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="glass-card p-6 rounded-3xl flex flex-col items-center text-center group"
      >
        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
          <FaTint className="text-3xl text-amber-600 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Metals Recovered</h3>
        <p className="text-3xl font-black text-amber-700">{metalsRecovered} kg</p>
        <p className="text-xs text-gray-400 mt-2">Gold, Silver & Palladium</p>
      </motion.div>
    </div>
  );
}
