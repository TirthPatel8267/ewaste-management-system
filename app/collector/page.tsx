"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTruck,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import CollectorSidebar from "@/components/CollectorSidebar";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

const CYAN = "#06b6d4";
const CYAN_DARK = "#0891b2";
const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Pending: { bg: "rgba(251,191,36,0.1)", text: "#fbbf24", border: "rgba(251,191,36,0.3)" },
  Approved: { bg: "rgba(96,165,250,0.1)", text: "#60a5fa", border: "rgba(96,165,250,0.3)" },
  Accepted: { bg: "rgba(167,139,250,0.1)", text: "#a78bfa", border: "rgba(167,139,250,0.3)" },
  "Out for Pickup": { bg: "rgba(251,146,60,0.1)", text: "#fb923c", border: "rgba(251,146,60,0.3)" },
  Completed: { bg: "rgba(52,211,153,0.1)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
};
const PIE_COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899"];

export default function CollectorPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [filter, setFilter] = useState("all");
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    dashboard: useRef<HTMLDivElement>(null),
    pickups: useRef<HTMLDivElement>(null),
    analytics: useRef<HTMLDivElement>(null),
    map: useRef<HTMLDivElement>(null),
    earnings: useRef<HTMLDivElement>(null),
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/collector/stats");
      const result = await res.json();
      setData(result);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  const filteredPickups = data?.pickups?.filter((p: any) => {
    if (filter === "all") return true;
    if (filter === "active") return ["Approved", "Accepted", "Out for Pickup"].includes(p.status);
    if (filter === "completed") return p.status === "Completed";
    if (filter === "pending") return p.status === "Pending";
    return true;
  }) || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a, #0c4a6e)" }}>
        <CollectorSidebar />
        <main className="ml-72 flex-1 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-14 h-14 border-4 border-t-transparent rounded-full"
            style={{ borderColor: `${CYAN} transparent ${CYAN} ${CYAN}` }}
          />
        </main>
      </div>
    );
  }

  const stats = data?.stats || {};
  const earnings = data?.earnings || {};
  const weeklyChart = (data?.charts?.weekly?.labels || []).map((l: string, i: number) => ({
    name: l, pickups: data?.charts?.weekly?.data?.[i] || 0,
  }));
  const categoryChart = (data?.charts?.categories?.labels || []).map((l: string, i: number) => ({
    name: l, value: data?.charts?.categories?.data?.[i] || 0,
  }));
  const earningsChart = (earnings?.monthly?.labels || []).map((l: string, i: number) => ({
    name: l, amount: earnings?.monthly?.data?.[i] || 0,
  }));

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="flex min-h-screen" style={{ background: "linear-gradient(160deg, #0f172a 0%, #0c4a6e 40%, #164e63 100%)" }}>
      <CollectorSidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="ml-72 flex-1 p-8 overflow-y-auto collector-scrollbar">
        {/* ========== HEADER ========== */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Welcome back, {data?.collectorName || "Collector"} <span className="animate-bounce">🚀</span>
            </h1>
            <p className="text-slate-400 mt-1 font-medium">
              {dateStr} • <span className="text-cyan-400">{timeStr}</span>
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative cursor-pointer transition-colors collector-card">
              <FaBell className="text-lg text-slate-400" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full status-pulse" style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
            </div>
            <div className="collector-card px-5 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full status-pulse" style={{ background: "#34d399" }} />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">On Duty</span>
            </div>
          </div>
        </motion.div>

        {/* ========== STATS ROW ========== */}
        <motion.div ref={sectionRefs.dashboard} variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Assigned", value: stats.totalAssigned || 0, icon: <FaBoxes />, gradient: "linear-gradient(135deg, #06b6d4, #0891b2)", shadow: "rgba(6,182,212,0.3)" },
            { label: "In Progress", value: stats.inProgress || 0, icon: <FaTruck />, gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)", shadow: "rgba(139,92,246,0.3)" },
            { label: "Completed Today", value: stats.completedToday || 0, icon: <FaCheckCircle />, gradient: "linear-gradient(135deg, #10b981, #059669)", shadow: "rgba(16,185,129,0.3)" },
            { label: "Completion Rate", value: stats.completionRate || 0, icon: <FaPercentage />, gradient: "linear-gradient(135deg, #f59e0b, #d97706)", shadow: "rgba(245,158,11,0.3)", suffix: "%" },
          ].map((s, i) => (
            <motion.div key={i} variants={item} className="collector-card glow-card rounded-3xl p-6 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl"
                  style={{ background: s.gradient, boxShadow: `0 8px 24px ${s.shadow}` }}>
                  {s.icon}
                </div>
                <FaArrowUp className="text-emerald-400 text-sm" />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{s.label}</p>
              <h3 className="text-3xl font-black text-white">
                <CountUp end={s.value} duration={2} />{s.suffix || ""}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== ACTIVE PICKUPS ========== */}
        <motion.div ref={sectionRefs.pickups} variants={item} initial="hidden" animate="show" className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <FaBoxes className="text-cyan-400" /> Active Pickups
            </h2>
            <div className="flex gap-2">
              {["all", "active", "pending", "completed"].map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                  style={filter === f ? { background: "linear-gradient(135deg, #0891b2, #06b6d4)", boxShadow: "0 4px 16px rgba(6,182,212,0.3)" } : { background: "rgba(255,255,255,0.03)" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredPickups.length > 0 ? filteredPickups.map((p: any, i: number) => {
                const sc = STATUS_COLORS[p.status] || STATUS_COLORS.Pending;
                return (
                  <motion.div key={p._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                    className="collector-card glow-card rounded-2xl p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                          style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}>
                          {(p.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white text-lg truncate">{p.name || "Unknown"}</h3>
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                              style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                              {p.status === "Out for Pickup" || p.status === "Accepted" ? (
                                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full status-pulse" style={{ background: sc.text }} /> {p.status}</span>
                              ) : p.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-cyan-500/60" />{p.address || "No address"}</span>
                            {p.phone && <span className="flex items-center gap-1.5"><FaPhone className="text-cyan-500/60" />{p.phone}</span>}
                            <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-cyan-500/60" />{p.date || new Date(p.createdAt).toLocaleDateString()}</span>
                          </div>
                          {p.category && <span className="inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">📦 {p.category}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 shrink-0">
                        {p.status === "Approved" && (
                          <button onClick={() => updateStatus(p._id, "Accepted")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", boxShadow: "0 4px 16px rgba(139,92,246,0.3)" }}>
                            <FaCheckCircle /> Accept
                          </button>
                        )}
                        {p.status === "Accepted" && (
                          <button onClick={() => updateStatus(p._id, "Out for Pickup")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.3)" }}>
                            <FaTruck /> Start Pickup
                          </button>
                        )}
                        {p.status === "Out for Pickup" && (
                          <button onClick={() => updateStatus(p._id, "Completed")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 16px rgba(16,185,129,0.3)" }}>
                            <FaCheckCircle /> Complete
                          </button>
                        )}
                        {p.status === "Completed" && (
                          <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                            <FaCheckCircle /> Done
                          </div>
                        )}
                        {p.status === "Pending" && (
                          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-amber-400/60">
                            <FaClock /> Awaiting Admin
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              }) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="collector-card rounded-2xl p-16 text-center">
                  <FaLeaf className="text-5xl text-cyan-500/20 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No pickups match this filter</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ========== ANALYTICS ========== */}
        <motion.div ref={sectionRefs.analytics} variants={container} initial="hidden" animate="show" className="mb-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
            <FaChartLine className="text-cyan-400" /> Performance Analytics
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekly Chart */}
            <motion.div variants={item} className="collector-card glow-card rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Weekly Pickups</h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last 7 Days</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 12, color: "#fff" }} />
                  <Bar dataKey="pickups" fill={CYAN} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Category Pie */}
            <motion.div variants={item} className="collector-card glow-card rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Waste Categories</h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Distribution</span>
              </div>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={220}>
                  <PieChart>
                    <Pie data={categoryChart} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={4} strokeWidth={0}>
                      {categoryChart.map((_: any, i: number) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 12, color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 flex-1">
                  {categoryChart.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-slate-400 flex-1 truncate">{c.name}</span>
                      <span className="text-white font-bold">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Avg Response", value: `${stats.avgResponseTime || 0}h`, icon: <FaClock />, color: CYAN },
              { label: "Total Completed", value: stats.completedTotal || 0, icon: <FaCheckCircle />, color: "#10b981" },
              { label: "Pending Queue", value: stats.pending || 0, icon: <FaBoxes />, color: "#f59e0b" },
              { label: "Streak", value: `${Math.min(stats.completedToday || 0, 7)}d`, icon: <FaFire />, color: "#ef4444" },
            ].map((m, i) => (
              <motion.div key={i} variants={item} className="collector-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}15`, color: m.color }}>
                  {m.icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{m.label}</p>
                  <p className="text-xl font-black text-white">{typeof m.value === "number" ? <CountUp end={m.value} duration={2} /> : m.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== EARNINGS ========== */}
        <motion.div ref={sectionRefs.earnings} variants={container} initial="hidden" animate="show" className="mb-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
            <FaMoneyBillWave className="text-cyan-400" /> Earnings Tracker
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Total Earnings Card */}
            <motion.div variants={item} className="md:col-span-1 rounded-3xl p-8 animate-gradient"
              style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)", backgroundSize: "200% 200%" }}>
              <p className="text-cyan-100 text-sm font-bold uppercase tracking-wider mb-2">Total Earnings</p>
              <h3 className="text-5xl font-black text-white mb-1">
                ₹<CountUp end={earnings.total || 0} duration={2.5} separator="," />
              </h3>
              <p className="text-cyan-200 text-sm font-medium mt-2">
                Today: <span className="font-bold text-white">₹{earnings.today || 0}</span>
              </p>
              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                <span className="text-cyan-100 text-xs font-medium">₹{earnings.perPickup}/pickup</span>
                <span className="flex items-center gap-1 text-emerald-300 text-xs font-bold">
                  <FaArrowUp /> Active
                </span>
              </div>
            </motion.div>

            {/* Monthly Trend */}
            <motion.div variants={item} className="md:col-span-2 collector-card glow-card rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Monthly Trend</h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last 6 Months</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={earningsChart}>
                  <defs>
                    <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CYAN} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 12, color: "#fff" }}
                    formatter={(v: any) => [`₹${v}`, "Earnings"]} />
                  <Area type="monotone" dataKey="amount" stroke={CYAN} strokeWidth={2.5} fill="url(#earningsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>

        {/* ========== MAP PLACEHOLDER ========== */}
        <motion.div ref={sectionRefs.map} variants={item} initial="hidden" animate="show" className="mb-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-cyan-400" /> Route Map
          </h2>
          <div className="collector-card glow-card rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {(data?.pickups || []).filter((p: any) => p.location?.lat && p.location?.lng).slice(0, 8).map((p: any, i: number) => (
                <div key={i} className="collector-card rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    style={{ background: p.status === "Completed" ? "rgba(16,185,129,0.15)" : "rgba(6,182,212,0.15)", color: p.status === "Completed" ? "#34d399" : CYAN }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-bold truncate">{p.name || "Pickup"}</p>
                    <p className="text-slate-500 text-xs truncate">{p.address || "No location"}</p>
                  </div>
                </div>
              ))}
              {(data?.pickups || []).filter((p: any) => p.location?.lat).length === 0 && (
                <div className="col-span-full text-center py-8">
                  <FaMapMarkerAlt className="text-4xl text-cyan-500/20 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No pickup locations available</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/5">
          <p className="text-slate-600 text-sm font-medium">EcoCycle Collector Hub • Empowering Green Collections</p>
        </div>
      </main>
    </div>
  );
}