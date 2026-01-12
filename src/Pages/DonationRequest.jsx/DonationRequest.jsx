import React, { useEffect, useState, useMemo } from "react";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Zap,
  Users,
  AlertCircle,
  Target,
  Hospital,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
  const circles = useMemo(() => 
    [...Array(20)].map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 1000,
      r: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    })), []);

  const paths = useMemo(() => [
    { d: "M0,500 Q250,200 500,500 T1000,500", duration: 5, delay: 0 },
    { d: "M0,300 Q300,600 600,300 T1000,300", duration: 7, delay: 1 }
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.3] dark:opacity-[0.1]">
      <svg className="w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-red)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <Motion.path
            key={i}
            d={p.d}
            fill="none"
            stroke="url(#neural-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
        {circles.map((c, i) => (
          <Motion.circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="var(--primary-red)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ 
              duration: c.duration, 
              repeat: Infinity, 
              delay: c.delay 
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const PendingDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchPendingRequests = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/pending-donation-requests");
      setRequests(data);
    } catch (err) {
      toast.error("Failed to fetch pending requests");
    } finally {
      setIsLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const handleViewDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };

  const bloodGroups = ["all", ...new Set(requests.map((r) => r.bloodGroup))];

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.bloodGroup === filter);

  return (
    <section className="bg-[var(--background-main)] min-h-screen">
      <navbar>
        <Navbar />
      </navbar>
      <main className="relative pt-20 overflow-hidden">
        <NeuralBackground />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Hero Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div className="space-y-6 max-w-2xl">
              <Motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full ultra-glass border border-red-500/20 shadow-sm"
              >
                <AlertCircle size={14} className="text-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                  Active Emergency Protocol
                </span>
              </Motion.div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
                Urgent <br />
                <span className="text-gradient-crimson italic">Blood Requests</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] font-medium opacity-70 leading-relaxed max-w-xl">
                Every circuit connects a生命 (life). Every donation bridges the void. Synchronize with the network to identify critical requests in your sector.
              </p>
            </div>

            {/* Stats Banner */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-6 md:gap-8 bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] px-10 py-6 border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-600/10 rounded-2xl">
                  <Droplet className="text-red-600" size={28} />
                </div>
                <div>
                  <p className="text-3xl font-black text-[var(--text-primary)] leading-none">{requests.length}</p>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-1">Pending</p>
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-600/10 rounded-2xl">
                  <Users className="text-red-600" size={28} />
                </div>
                <div>
                  <p className="text-3xl font-black text-[var(--text-primary)] leading-none">{new Set(requests.map((r) => r.bloodGroup)).size}</p>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-1">Sectors</p>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* Blood Group Filter */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 mb-20 p-4 ultra-glass rounded-[2rem] border border-white/5"
          >
            {bloodGroups.map((group) => (
              <Motion.button
                key={group}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(group)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === group
                    ? "bg-[var(--primary-red)] text-white shadow-[0_10px_20px_rgba(100,13,20,0.3)]"
                    : "bg-white/5 text-[var(--text-secondary)] border border-white/10 hover:bg-white/10"
                }`}
              >
                {group === "all" ? "All Sectors" : group}
              </Motion.button>
            ))}
          </Motion.div>

          {/* Request Grid */}
          <div className="min-h-[400px] pb-24">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[420px] rounded-[2.5rem] ultra-glass animate-pulse border border-white/5" />
                ))}
              </div>
            ) : filteredRequests.length > 0 ? (
              <Motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode='popLayout'>
                  {filteredRequests.map((request, index) => (
                    <Motion.div
                      key={request._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group relative"
                    >
                      <div className="relative ultra-glass rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-red-500/30 transition-all duration-500 shadow-2xl flex flex-col h-full">
                        {/* Status Bar */}
                        <div className="absolute top-6 right-6 z-10 flex gap-2">
                          <div className="bg-[var(--primary-red)] text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase flex items-center gap-1 shadow-lg">
                            <Zap size={10} fill="currentColor" />
                            CRITICAL
                          </div>
                        </div>

                        <div className="p-8 flex-grow">
                          {/* Header: Blood Group & Name */}
                          <div className="flex items-center gap-5 mb-8">
                            <Motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="w-16 h-16 rounded-3xl bg-white dark:bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center border border-white/20 shrink-0"
                            >
                              <span className="text-xl font-black text-[var(--primary-red)] tracking-tighter">
                                {request.bloodGroup}
                              </span>
                            </Motion.div>
                            <div className="min-w-0">
                              <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tight leading-none mb-2 truncate">
                                {request.recipient_name}
                              </h3>
                              <div className="flex items-center gap-2 text-[var(--primary-red)] font-bold">
                                <Hospital size={14} />
                                <span className="text-[10px] uppercase tracking-widest truncate">
                                  {request.hospital || "Central Medical Cluster"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Info Matrix */}
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-[var(--text-muted)] tracking-[0.2em] uppercase">Coordinate</p>
                                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                                  <MapPin size={14} className="text-[var(--primary-red)]" />
                                  <span className="text-xs font-black uppercase truncate">{request.recipient_district}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-[var(--text-muted)] tracking-[0.2em] uppercase">Temporal Window</p>
                                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                                  <Calendar size={14} className="text-[var(--primary-red)]" />
                                  <span className="text-xs font-black uppercase">{request.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-[var(--text-muted)] tracking-[0.2em] uppercase">Sub-Sector</p>
                                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                                  <Target size={14} className="text-[var(--primary-red)]" />
                                  <span className="text-xs font-black uppercase truncate">{request.recipient_upazila}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-[var(--text-muted)] tracking-[0.2em] uppercase">Sync Time</p>
                                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                                  <Clock size={14} className="text-[var(--primary-red)]" />
                                  <span className="text-xs font-black uppercase">{request.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleViewDetails(request._id)}
                            className="w-full bg-[var(--primary-red)] text-white font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(100,13,20,0.2)] hover:shadow-[0_15px_30px_rgba(100,13,20,0.4)] transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                          >
                            <Eye size={18} />
                            <span className="text-xs uppercase tracking-widest">Connect</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                          </Motion.button>
                        </div>

                        {/* Card Footer/Accent */}
                        <div className="h-2 bg-gradient-to-r from-transparent via-[var(--primary-red)]/50 to-transparent opacity-30" />
                      </div>
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </Motion.div>
            ) : (
              /* Empty State */
              <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 ultra-glass rounded-[4rem] border border-white/10 shadow-3xl overflow-hidden relative"
              >
                <div className="absolute inset-0 -z-10 bg-red-600/5 blur-[120px]" />
                <Motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-10 inline-block p-10 rounded-full bg-red-600/5 border border-red-500/10 shadow-inner"
                >
                  <Droplet size={80} className="text-[var(--primary-red)]/30" strokeWidth={1} />
                </Motion.div>
                <h3 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-4">
                  All Systems Clear
                </h3>
                <p className="text-lg text-[var(--text-secondary)] font-medium max-w-lg mx-auto opacity-60 leading-relaxed mb-10">
                  {filter === "all"
                    ? "Initial sweep suggests all critical requests have been synchronized. The network is stable."
                    : `No active signals detected for the ${filter} sector. Monitoring continues...`}
                </p>
                {filter !== "all" && (
                  <button
                    onClick={() => setFilter("all")}
                    className="px-10 py-4 bg-[var(--primary-red)] text-white font-black rounded-xl shadow-xl hover:scale-105 transition-transform uppercase text-xs tracking-widest"
                  >
                    Reset Grid Scan
                  </button>
                )}
              </Motion.div>
            )}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default PendingDonationRequests;
