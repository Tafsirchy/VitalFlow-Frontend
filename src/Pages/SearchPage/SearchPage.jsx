import axios from "axios";
import {
  Search,
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  User,
  Mail,
  MessageSquare,
  Heart,
  Activity,
  Target,
  Users,
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Eye } from "lucide-react";

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.4] dark:opacity-[0.15]">
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

const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      const sorted = [...res.data.districts].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      setDistricts(sorted);
    });

    axios.get("/upazilas.json").then((res) => {
      const sorted = [...res.data.upazilas].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      setUpazilas(sorted);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    axiosInstance
      .get(
        `/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
      )
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setSearchResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      inprogress: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
      completed: "bg-gradient-to-r from-green-400 to-emerald-400 text-white",
      cancelled: "bg-gradient-to-r from-red-400 to-rose-400 text-white",
    };

    return (
      <Motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`px-3 py-1 rounded-full text-[10px] font-black shadow-lg uppercase tracking-wider ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status === "inprogress"
          ? "In Progress"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </Motion.span>
    );
  };

  return (
    <section className="bg-[var(--background-main)] min-h-screen font-sans selection:bg-red-500/30">
      <navbar>
        <Navbar></Navbar>
      </navbar>
      <main className="relative pt-10 overflow-hidden">
        <NeuralBackground />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 px-4">
            <div className="space-y-4 text-left">
              <Motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full ultra-glass border border-white/10"
              >
                <Activity size={14} className="text-red-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                  Tactical Search Console v.04
                </span>
              </Motion.div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
                Find Life <br />
                <span className="text-gradient-crimson italic">Carriers</span>
              </h1>
            </div>
            
            <div className="max-w-md space-y-4 mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <Activity size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Sync: Active</span>
              </div>
              <p className="text-base text-[var(--text-secondary)] font-medium opacity-60 leading-relaxed">
                Connect with the vital network to identify donors in your specified sector. Every signal counts towards the collective life-circuit.
              </p>
            </div>
          </div>

          <Motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative ultra-glass rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] mb-20 group"
          >
            {/* Scanline decoration */}
            <Motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-red-600/10 blur-[1px] -z-10" 
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                  <Droplet size={14} className="text-red-600" />
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full h-14 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:border-red-600/50 transition-all cursor-pointer hover:bg-white/10"
                >
                  <option value="" className="bg-[var(--background-main)]">All Sectors</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                    <option key={group} value={group} className="bg-[var(--background-main)]">{group}</option>
                  ))}
                </select>
              </Motion.div>

              {/* District */}
              <Motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                  <MapPin size={14} className="text-red-600" />
                  District Cluster
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-14 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:border-red-600/50 transition-all cursor-pointer hover:bg-white/10"
                >
                  <option value="" className="bg-[var(--background-main)]">Global Sector</option>
                  {districts.map((d) => (
                    <option key={d.name} value={d.name} className="bg-[var(--background-main)]">
                      {d.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </Motion.div>

              <Motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                  <MapPin size={14} className="text-red-600" />
                  Sub-Sector
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full h-14 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:border-red-600/50 transition-all cursor-pointer hover:bg-white/10"
                >
                  <option value="" className="bg-[var(--background-main)]">All Nodes</option>
                  {upazilas.map((u) => (
                    <option key={u.name} value={u.name} className="bg-[var(--background-main)]">
                      {u.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </Motion.div>

              <Motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-end"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative overflow-hidden w-full h-14 rounded-xl bg-red-600 text-white font-black text-sm uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.5)] disabled:opacity-50 group px-6 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <Activity className="animate-spin" size={20} />
                  ) : (
                    <Search size={20} />
                  )}
                  <span>{isLoading ? "Syncing..." : "Initiate Search"}</span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </Motion.div>
            </div>
          </Motion.form>

          <AnimatePresence mode="wait">
            {!hasSearched ? (
              <Motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
                className="py-10"
              >
                <div className="text-center space-y-12 py-16 ultra-glass rounded-[3rem] border border-white/10 relative overflow-hidden">
                  {/* Pulsing Core */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <Motion.div 
                      animate={{ scale: [1, 2, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-64 h-64 bg-red-600 rounded-full blur-[100px]"
                    />
                  </div>

                  <div className="flex justify-center gap-12">
                    {[0, 1, 2].map((i) => (
                      <Motion.div
                        key={i}
                        animate={{
                          y: [0, -20, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                          <Heart className="text-red-600" size={40} fill="currentColor" />
                        </div>
                      </Motion.div>
                    ))}
                  </div>

                  <div className="space-y-4 px-6">
                    <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">
                      Ready to Synchronize?
                    </h2>
                    <p className="text-base text-[var(--text-secondary)] font-medium max-w-2xl mx-auto leading-relaxed opacity-70">
                      Scan the biological database to identify available carriers in your current coordinate cluster. Immediate response protocols active.
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 flex-wrap px-6">
                    {[
                      { icon: Droplet, label: "BIOTYPES", value: "8" },
                      { icon: Activity, label: "RESTORED", value: "1.2K" },
                      { icon: Users, label: "CARRIERS", value: "850+" }
                    ].map((stat, i) => (
                      <Motion.div
                        key={i}
                        whileHover={{ y: -5, borderColor: "var(--primary-red)" }}
                        className="ultra-glass rounded-2xl p-6 border border-white/10 min-w-[160px] text-center transition-colors shadow-xl"
                      >
                        <stat.icon className="text-red-600 mx-auto mb-3" size={28} />
                        <div className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[9px] font-black text-[var(--text-muted)] tracking-widest uppercase mt-1">
                          {stat.label}
                        </div>
                      </Motion.div>
                    ))}
                  </div>
                </div>
              </Motion.div>
            ) : (
              <Motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pb-20"
              >
                {isLoading ? (
                  <div className="text-center py-20">
                    <Motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block p-6 rounded-full ultra-glass border border-red-500/30"
                    >
                      <Droplet className="text-red-600" size={48} />
                    </Motion.div>
                    <p className="mt-8 text-[11px] font-black text-red-600 tracking-[0.5em] uppercase animate-pulse">
                      Synchronizing Neural Network...
                    </p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <Motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 mb-10"
                    >
                      <div className="h-10 w-1.5 bg-red-600 rounded-full" />
                      <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                        Identified <span className="text-red-600">{searchResults.length}</span> Active Carrier{searchResults.length !== 1 ? "s" : ""}
                      </h2>
                    </Motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {searchResults.map((request, index) => (
                        <Motion.div
                          key={request._id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className="group relative ultra-glass rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-red-500/30 transition-all duration-500 shadow-xl"
                        >
                          <div className="p-6 space-y-4">
                            {/* Card Header */}
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                <Motion.div 
                                  whileHover={{ scale: 1.05 }}
                                  className="w-16 h-16 rounded-3xl bg-white dark:bg-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] flex items-center justify-center border border-white/20"
                                >
                                  <span className="text-xl font-black text-red-600 tracking-tighter">
                                    {request.bloodGroup}
                                  </span>
                                </Motion.div>
                                <div>
                                  <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tight leading-none mb-1">
                                    {request.recipient_name}
                                  </h3>
                                  <div className="flex items-center gap-1.5 text-red-600 dark:text-red-500 font-bold">
                                    <Hospital size={12} />
                                    <span className="text-[10px] uppercase tracking-wide truncate max-w-[140px]">
                                      {request.hospital || "Central Medical Nodes"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {getStatusBadge(request.donation_status)}
                              </div>
                            </div>

                            {/* Card Info Grid */}
                            <div className="grid grid-cols-2 gap-4 pb-2">
                              <div className="space-y-3">
                                <div className="space-y-0.5">
                                  <p className="text-[8px] font-black text-[var(--text-muted)] tracking-widest uppercase opacity-80">CLUSTER</p>
                                  <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                                    <MapPin size={12} className="text-red-600 dark:text-red-500" />
                                    <span className="text-xs font-black uppercase truncate">{request.recipient_district}</span>
                                  </div>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[8px] font-black text-[var(--text-muted)] tracking-widest uppercase opacity-80">SYNC DATE</p>
                                  <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                                    <Calendar size={12} className="text-red-600 dark:text-red-500" />
                                    <span className="text-xs font-black uppercase">{request.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="space-y-0.5">
                                  <p className="text-[8px] font-black text-[var(--text-muted)] tracking-widest uppercase opacity-80">SUB-SECTOR</p>
                                  <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                                    <Target size={12} className="text-red-600 dark:text-red-500" />
                                    <span className="text-xs font-black uppercase truncate">{request.recipient_upazila}</span>
                                  </div>
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[8px] font-black text-[var(--text-muted)] tracking-widest uppercase opacity-80">SYNC TIME</p>
                                  <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                                    <Clock size={12} className="text-red-600 dark:text-red-500" />
                                    <span className="text-xs font-black uppercase">{request.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Requester Metadata */}
                            <div className="pt-4 border-t border-white/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 border border-white/10 flex items-center justify-center">
                                    <User size={12} className="text-[var(--text-muted)]" />
                                  </div>
                                  <div className="text-[9px] uppercase font-black tracking-widest text-[var(--text-secondary)]">
                                    REQ: <span className="text-red-600 dark:text-red-500 font-bold">{request.requester_name.split(' ')[0]}</span>
                                  </div>
                                </div>
                                <a
                                  href={`mailto:${request.requester_email}`}
                                  className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 border border-white/10 flex items-center justify-center hover:bg-red-600/10 transition-colors group/mail"
                                >
                                  <Mail size={12} className="text-[var(--text-muted)] group-hover/mail:text-red-600 dark:group-hover/mail:text-red-500" />
                                </a>
                              </div>
                              {request.message && (
                                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/10 border border-white/5 italic shadow-inner">
                                  <p className="text-[10px] text-[var(--text-secondary)] opacity-90 leading-relaxed font-semibold">
                                    "{request.message}"
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Result action button */}
                            <Motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => navigate(`/donation-details/${request._id}`)}
                              className="w-full bg-[var(--primary-red)] text-white font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(100,13,20,0.2)] hover:shadow-[0_15px_30px_rgba(100,13,20,0.4)] transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                            >
                              <Eye size={18} />
                              <span className="text-xs uppercase tracking-widest">Connect</span>
                              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                            </Motion.button>
                          </div>
                        </Motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-32 ultra-glass rounded-[3rem] border border-white/10 shadow-2xl"
                  >
                    <Motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="inline-block p-8 rounded-full bg-red-600/5 border border-red-500/10 mb-8 shadow-inner"
                    >
                      <Search className="text-red-600/30" size={64} />
                    </Motion.div>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-3">
                      Zero Carriers Identified
                    </h3>
                    <p className="text-base text-[var(--text-secondary)] font-medium max-w-md mx-auto opacity-60 leading-relaxed">
                      Biological scan yielded no results for this specific sector. Adjust your tactical parameters and re-probe the neural network.
                    </p>
                  </Motion.div>
                )}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </section>
  );
};

export default SearchPage;
