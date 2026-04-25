"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import PickupChart from "@/components/PickupChart";
import DeviceChart from "@/components/DeviceChart";
import ImpactVisuals from "@/components/ImpactVisuals";
import { FaClock, FaCheckCircle, FaExclamationCircle, FaRecycle, FaArrowRight, FaHistory, FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

export default function DashboardClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <main className="ml-72 p-8 w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Hello, Eco Warrior <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium italic">
              Empowering a cleaner planet, one device at a time.
            </p>
          </div>
          
          <div className="flex gap-4 items-center">
             <div className="glass-card w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 relative cursor-pointer hover:text-emerald-500 transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
             </div>
             <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">System Active</span>
             </div>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-12 gap-8"
        >
          {/* Main Left Content */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Requests", val: data?.stats?.total, color: "emerald", icon: <FaRecycle /> },
                { label: "Pending", val: data?.stats?.pending, color: "amber", icon: <FaClock /> },
                { label: "Completed", val: data?.stats?.completed, color: "blue", icon: <FaCheckCircle /> },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  variants={item}
                  className="glass-card p-6 rounded-[2rem] card-hover group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-100 flex items-center justify-center text-2xl text-${stat.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-4xl font-black mt-1">
                    <CountUp end={stat.val || 0} duration={2.5} />
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Impact Tracking Board */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-2xl font-bold text-gray-800">Environmental Impact</h2>
                 <button className="text-emerald-600 font-bold text-sm hover:underline flex items-center gap-1">
                    See full report <FaArrowRight className="text-xs" />
                 </button>
              </div>
              <ImpactVisuals 
                co2Saved={data?.impact?.co2Saved || "0"} 
                metalsRecovered={data?.impact?.metalsRecovered || "0"} 
              />
            </motion.div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={item} className="glass-card p-8 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Pickup Forecast</h3>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Growth</div>
                </div>
                <PickupChart chartData={data?.chartData?.monthly} />
              </motion.div>

              <motion.div variants={item} className="glass-card p-8 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Waste Distribution</h3>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Device Type</div>
                </div>
                <DeviceChart chartData={data?.chartData?.categories} />
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar Section */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Recent Activity Timeline */}
            <motion.div variants={item} className="glass-card p-8 rounded-[2rem] flex-1">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                   <FaHistory className="text-emerald-500" /> Recent Activity
                 </h3>
               </div>

               <div className="space-y-6">
                  <AnimatePresence>
                    {(data?.recentRequests || []).length > 0 ? (
                      data.recentRequests.map((req: any, i: number) => (
                        <motion.div 
                          key={req._id} 
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4 group cursor-pointer"
                        >
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2 ${
                              req.status?.toLowerCase() === 'completed' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 
                              req.status?.toLowerCase() === 'pending' ? 'bg-amber-50 border-amber-400 text-amber-500' : 
                              'bg-blue-50 border-blue-400 text-blue-500'
                            }`}>
                              {req.status?.toLowerCase() === 'completed' ? <FaCheckCircle /> : req.status?.toLowerCase() === 'pending' ? <FaClock /> : <FaExclamationCircle />}
                            </div>
                            {i !== (data.recentRequests.length - 1) && <div className="w-0.5 h-full bg-gray-100 my-1 group-hover:bg-emerald-100 transition-colors" />}
                          </div>
                          <div className="pb-4">
                            <h4 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{req.category || "General E-Waste"}</h4>
                            <p className="text-xs font-semibold text-gray-400 uppercase mt-0.5">{new Date(req.createdAt || req.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{req.address}</p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic text-center py-10">No recent activity found.</p>
                    )}
                  </AnimatePresence>
               </div>

               <button className="w-full mt-6 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                 View All Activity
               </button>
            </motion.div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}