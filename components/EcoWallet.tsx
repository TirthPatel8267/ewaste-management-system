"use client";

import { motion } from "framer-motion";
import { FaCoins, FaGift, FaChartLine } from "react-icons/fa";

interface WalletProps {
  points: number;
  rank: string;
}

export default function EcoWallet({ points, rank }: WalletProps) {
  const nextLevelPoints = rank === "Bronze" ? 500 : rank === "Silver" ? 1000 : 2500;
  const progress = (points / nextLevelPoints) * 100;

  return (
    <div className="premium-gradient p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
      <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-emerald-100/70 text-sm font-semibold uppercase tracking-[0.2em]">Current Balance</p>
            <div className="flex items-center gap-3 mt-1">
              <FaCoins className="text-3xl text-yellow-400 animate-pulse" />
              <h2 className="text-5xl font-black">{points.toLocaleString()}</h2>
              <span className="text-xl font-medium text-emerald-200">Credits</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30 text-sm font-bold">
            {rank} Rank
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider text-emerald-100">
            <span>Progress to {rank === "Gold" ? "Legend" : rank === "Silver" ? "Gold" : "Silver"}</span>
            <span>{Math.min(progress, 100).toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full bg-emerald-900/40 rounded-full overflow-hidden border border-emerald-500/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white text-emerald-900 font-bold py-3 px-4 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg">
            <FaGift /> Redeem
          </button>
          <button className="flex items-center justify-center gap-2 bg-emerald-800/40 border border-white/20 text-white font-bold py-3 px-4 rounded-2xl hover:bg-emerald-700/50 transition-colors">
            <FaChartLine /> History
          </button>
        </div>
      </div>
    </div>
  );
}
