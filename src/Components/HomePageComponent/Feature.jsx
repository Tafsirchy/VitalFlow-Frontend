import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Droplets,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  HeartPulse,
  Filter,
  Calendar,
  Hospital,
  MessageSquare,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Feature = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("all");
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const bloodTypes = ["all", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    fetchUrgentRequests();
  }, [selectedBloodType]);

  const fetchUrgentRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://vital-flow-backend-khaki.vercel.app/urgent-requests?bloodGroup=${selectedBloodType}`
      );
      setUrgentRequests(res.data);
    } catch (error) {
      toast.error("Failed to fetch urgent requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const getUrgencyLevel = (dateString) => {
    const diffInHours = (new Date() - new Date(dateString)) / (1000 * 60 * 60);

    if (diffInHours < 2) return "CRITICAL";
    if (diffInHours < 12) return "URGENT";
    return "MODERATE";
  };

  const urgencyConfig = {
    CRITICAL: {
      gradient: "from-rose-500 via-red-600 to-red-700",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      pulse: "animate-pulse",
    },
    URGENT: {
      gradient: "from-orange-400 via-orange-500 to-orange-600",
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
      pulse: "",
    },
    MODERATE: {
      gradient: "from-amber-400 via-yellow-500 to-yellow-600",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      pulse: "",
    },
  };

  // Generate random positions for falling blood drops
  const drops = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <div className="relative min-h-screen py-12 sm:py-16 md:py-24 lg:py-28 bg-gradient-to-br from-slate-50 via-red-50/20 to-slate-100 overflow-hidden">
      {/* Animated Falling Blood Drops Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 0.6, 0.4, 0] }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: "linear",
            }}
            className="absolute"
            style={{ left: drop.left }}
          >
            <Droplets
              size={32}
              className="text-red-500/60 drop-shadow-lg"
              fill="currentColor"
            />
          </motion.div>
        ))}

        {/* Very subtle blurred glows for depth */}
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-red-300/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 22, repeat: Infinity, delay: 6 }}
          className="absolute bottom-32 right-20 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartPulse size={20} />
            </motion.div>
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              Live Emergency Feed
            </span>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-red-700 to-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Someone Needs Your Blood
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-red-600">
              Right Now
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            Real-time blood requests from your community. Every second counts,
            and your response could save a life today.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-2xl bg-white/80 border border-white/60 rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-900/10 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 text-blue-600">
                  <Filter size={20} className="sm:w-5 sm:h-5" />
                  <h4 className="font-bold text-base sm:text-lg tracking-wide">
                    Filter Blood Type
                  </h4>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300" />
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  {urgentRequests.length} active{" "}
                  {urgentRequests.length === 1 ? "request" : "requests"}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {bloodTypes.map((type, index) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedBloodType(type)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base uppercase transition-all duration-300 ${
                      selectedBloodType === type
                        ? "bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white shadow-lg shadow-red-500/50 scale-105"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-red-50 hover:to-rose-50 hover:text-red-600 border border-gray-200"
                    }`}
                  >
                    {selectedBloodType === type && (
                      <motion.div
                        layoutId="activeBloodType"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl sm:rounded-2xl"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{type}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-16 sm:py-20 lg:py-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6"
            >
              <div className="absolute inset-0 border-4 border-red-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full" />
            </motion.div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Loading urgent requests...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && urgentRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 sm:py-20 lg:py-32"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl"
            >
              <Droplets className="text-gray-400" size={48} />
            </motion.div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              No Urgent Requests
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-md mx-auto px-4">
              {selectedBloodType === "all"
                ? "Great news! There are no urgent blood requests at this moment."
                : `No urgent requests for ${selectedBloodType} blood type right now.`}
            </p>
          </motion.div>
        )}

        {/* Request Cards */}
        {!loading && urgentRequests.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBloodType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto"
            >
              {urgentRequests.map((req, i) => {
                const urgency = getUrgencyLevel(req.createdAt);
                const config = urgencyConfig[urgency];

                return (
                  <motion.div
                    key={req._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${config.gradient} rounded-2xl sm:rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    />

                    <div className="relative backdrop-blur-xl bg-white/90 border border-white/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                      {/* Urgency banner */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r ${config.gradient} ${config.pulse}`}
                      />

                      <div className="p-5 sm:p-6 lg:p-7">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                          {/* Left section */}
                          <div className="flex-1 space-y-3 sm:space-y-4">
                            {/* Header with blood type badge */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 break-words">
                                  {req.recipient_name}
                                </h3>

                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                    <Hospital
                                      size={16}
                                      className="flex-shrink-0"
                                    />
                                    <span className="break-words">
                                      {req.hospital}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Blood type floating badge */}
                              <motion.div
                                animate={{
                                  y: [0, -6, 0],
                                  rotate: [0, 5, 0],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-xl flex flex-col items-center justify-center text-white transform hover:scale-110 transition-transform duration-300`}
                              >
                                <Droplets className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                                <span className="font-black text-base sm:text-lg">
                                  {req.bloodGroup}
                                </span>
                              </motion.div>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                              <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                                <MapPin
                                  size={16}
                                  className="text-gray-500 mt-0.5 flex-shrink-0"
                                />
                                <span className="text-xs text-gray-700 font-medium leading-relaxed break-words">
                                  {req.address}, {req.recipient_upazila},{" "}
                                  {req.recipient_district}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                                <Calendar
                                  size={16}
                                  className="text-gray-500 flex-shrink-0"
                                />
                                <span className="text-xs text-gray-700 font-medium break-words">
                                  {req.date}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                                <Clock
                                  size={16}
                                  className="text-gray-500 flex-shrink-0"
                                />
                                <span className="text-xs text-gray-700 font-medium">
                                  {req.time} • {getTimeAgo(req.createdAt)}
                                </span>
                              </div>

                              <div
                                className={`flex items-center gap-2 p-3 ${config.bg} rounded-xl border ${config.border}`}
                              >
                                <AlertTriangle
                                  size={16}
                                  className={`${config.text} flex-shrink-0 ${config.pulse}`}
                                />
                                <span
                                  className={`text-xs ${config.text} font-bold uppercase tracking-wide`}
                                >
                                  {urgency}
                                </span>
                              </div>
                            </div>

                            {/* Message */}
                            {req.message && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="flex items-start gap-2 sm:gap-3 bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-3 sm:p-4"
                              >
                                <MessageSquare
                                  size={16}
                                  className="text-blue-600 mt-1 flex-shrink-0"
                                />
                                <p className="text-xs text-gray-700 leading-relaxed break-words">
                                  {req.message}
                                </p>
                              </motion.div>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 justify-stretch">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 lg:flex-none lg:w-36 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all duration-300 text-sm"
                            >
                              <Phone size={16} />
                              <span>Contact</span>
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 lg:flex-none lg:w-36 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all duration-300 text-sm"
                            >
                              <Zap size={16} />
                              <span>Respond</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Feature;
