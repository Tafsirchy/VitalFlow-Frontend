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
        `http://localhost:5000/urgent-requests?bloodGroup=${selectedBloodType}`
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

  const urgencyStyle = {
    CRITICAL: "from-red-600 to-red-800",
    URGENT: "from-orange-500 to-orange-700",
    MODERATE: "from-yellow-400 to-yellow-600",
  };
  return (
    <div className="relative py-28 bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] overflow-hidden">
      {/* floating background blobs */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-red-200 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-200 rounded-full blur-3xl opacity-30"
      />

      <div className="w-11/12 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 text-white shadow-lg mb-5">
            <HeartPulse className="animate-pulse" size={18} />
            <span className="text-sm font-semibold tracking-wide">
              Real-Time Life Saving Requests
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Someone Needs <span className="text-red-600">Your Blood</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Instant nearby blood requests displayed in a live interactive feed.
            Every response can save a life.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-xl px-6 py-8 text-center">
            <div className="flex justify-center items-center gap-2 mb-5">
              <Filter size={18} className="text-blue-700" />
              <h4 className="font-semibold text-gray-800 tracking-wide">
                Filter by Blood Group
              </h4>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {bloodTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedBloodType(type)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    selectedBloodType === type
                      ? { boxShadow: "0 0 0 6px rgba(220,38,38,0.15)" }
                      : { boxShadow: "0 0 0 0 rgba(220,38,38,0)" }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all uppercase ${
                    selectedBloodType === type
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-red-50"
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && urgentRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Droplets className="text-gray-400" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Urgent Requests
            </h3>
            <p className="text-gray-600">
              {selectedBloodType === "all"
                ? "There are no urgent blood donation requests at the moment."
                : `No urgent requests for ${selectedBloodType} blood type.`}
            </p>
          </motion.div>
        )}

        {/* Timeline Cards */}
        {!loading && urgentRequests.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBloodType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {urgentRequests.map((req, i) => {
                const urgency = getUrgencyLevel(req.createdAt);
                return (
                  <motion.div
                    key={req._id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white/80 backdrop-blur-xl border rounded-3xl shadow-xl p-8"
                  >
                    {/* floating blood orb */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${urgencyStyle[urgency]} text-white flex flex-col items-center justify-center shadow-xl`}
                    >
                      <Droplets />
                      <span className="font-bold">{req.bloodGroup}</span>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {req.recipient_name}
                        </h3>

                        <div className="flex items-center gap-2 text-blue-700 font-medium mb-4">
                          <Hospital size={16} />
                          <span>{req.hospital}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-400" />
                            <span>
                              {req.address}, {req.recipient_upazila},{" "}
                              {req.recipient_district}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span>{req.date}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <span>
                              {req.time} • {getTimeAgo(req.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-red-600 font-semibold">
                            <AlertTriangle size={16} />
                            <span>{urgency}</span>
                          </div>
                        </div>

                        {req.message && (
                          <div className="mt-4 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                            <MessageSquare
                              size={16}
                              className="text-blue-600 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-sm text-gray-700">
                              {req.message}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 lg:flex-col">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Phone size={18} /> Contact
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg transition-colors"
                        >
                          Respond
                        </motion.button>
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
