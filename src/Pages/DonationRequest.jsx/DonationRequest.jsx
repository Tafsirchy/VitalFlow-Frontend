import React, { useEffect, useState } from "react";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Zap,
  Users,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const PendingDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/pending-donation-requests");
      setRequests(data);
    } catch (error) {
      toast.error("Failed to fetch pending requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };

  const bloodGroups = ["all", ...new Set(requests.map((r) => r.bloodGroup))];

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.bloodGroup === filter);

  return (
    <section>
      <navbar>
        <Navbar />
      </navbar>
      <main>
        <div className="relative min-h-screen bg-gradient-to-br from-red-900 via-rose-800 to-pink-900 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Floating Blood Drops */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="absolute"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            >
              <Droplet
                size={40 + i * 10}
                className="text-white/10"
                fill="currentColor"
              />
            </motion.div>
          ))}

          <div className="relative max-w-7xl mx-auto px-4 py-16">
            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-6 relative"
              >
                <Droplet
                  size={100}
                  className="text-white drop-shadow-2xl"
                  fill="currentColor"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white rounded-full blur-3xl"
                />
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
                Urgent Blood Requests
              </h1>
              <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
                Every second counts. Your donation can save a life today.
              </p>

              {/* Stats Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-8 bg-white/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/30"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-yellow-300" size={24} />
                  <div className="text-left">
                    <p className="text-3xl font-bold text-white">
                      {requests.length}
                    </p>
                    <p className="text-sm text-red-100">Pending Requests</p>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/30" />
                <div className="flex items-center gap-2">
                  <Users className="text-green-300" size={24} />
                  <div className="text-left">
                    <p className="text-3xl font-bold text-white">
                      {new Set(requests.map((r) => r.bloodGroup)).size}
                    </p>
                    <p className="text-sm text-red-100">Blood Groups</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Blood Group Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {bloodGroups.map((group, index) => (
                <motion.button
                  key={group}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(group)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    filter === group
                      ? "bg-white text-red-600 shadow-2xl scale-110"
                      : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  }`}
                >
                  {group === "all" ? "All Groups" : group}
                </motion.button>
              ))}
            </motion.div>

            {/* Loading Skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-96 rounded-3xl bg-white/10 backdrop-blur-md animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* Request Cards */}
            {!isLoading && filteredRequests.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {filteredRequests.map((request, index) => (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.2 },
                      }}
                      className="relative group"
                    >
                      {/* Card Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

                      <div className="relative bg-gradient-to-br from-white via-red-50 to-rose-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-white/50">
                        {/* Urgency Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            <Zap size={14} fill="currentColor" />
                            URGENT
                          </div>
                        </div>

                        <div className="p-6">
                          {/* Blood Group Display */}
                          <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-full blur-xl opacity-50" />
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className="relative bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-2xl"
                              >
                                <Droplet
                                  size={32}
                                  className="absolute top-2 left-2 opacity-30"
                                  fill="currentColor"
                                />
                                <span className="text-4xl font-black relative z-10">
                                  {request.bloodGroup}
                                </span>
                              </motion.div>
                            </div>
                          </div>

                          {/* Recipient Info */}
                          <div className="text-center mb-6">
                            <p className="text-xs uppercase tracking-widest text-red-600 font-bold mb-1">
                              Patient Name
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mb-4">
                              {request.recipient_name}
                            </p>

                            {/* Location */}
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center justify-center gap-2 text-gray-700 bg-white/80 rounded-xl px-4 py-3 mb-4"
                            >
                              <MapPin
                                className="text-red-500 flex-shrink-0"
                                size={20}
                              />
                              <p className="text-sm font-semibold">
                                {request.recipient_upazila},{" "}
                                {request.recipient_district}
                              </p>
                            </motion.div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border border-red-100">
                                <Calendar
                                  size={18}
                                  className="text-red-500 mx-auto mb-1"
                                />
                                <p className="text-xs font-bold text-gray-900">
                                  {request.date}
                                </p>
                              </div>
                              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border border-red-100">
                                <Clock
                                  size={18}
                                  className="text-red-500 mx-auto mb-1"
                                />
                                <p className="text-xs font-bold text-gray-900">
                                  {request.time}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* View Details Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleViewDetails(request._id)}
                            className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                          >
                            <Eye size={20} />
                            <span>View Full Details</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight size={20} />
                            </motion.div>
                          </motion.button>
                        </div>

                        {/* Bottom Accent */}
                        <div className="h-2 bg-gradient-to-r from-red-500 via-pink-500 to-red-500" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && filteredRequests.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-white/20"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Droplet size={120} className="mx-auto text-white/40 mb-6" />
                </motion.div>
                <h3 className="text-4xl font-bold text-white mb-4">
                  {filter === "all"
                    ? "No Pending Requests"
                    : `No ${filter} Requests`}
                </h3>
                <p className="text-xl text-red-100 mb-8">
                  {filter === "all"
                    ? "All requests have been fulfilled. Check back soon!"
                    : "Try selecting a different blood group."}
                </p>
                {filter !== "all" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter("all")}
                    className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:shadow-2xl"
                  >
                    View All Requests
                  </motion.button>
                )}
              </motion.div>
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
