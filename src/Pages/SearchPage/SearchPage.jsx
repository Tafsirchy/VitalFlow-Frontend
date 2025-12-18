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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

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
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status === "inprogress"
          ? "In Progress"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </motion.span>
    );
  };

  return (
    <section>
      <navbar>
        <Navbar></Navbar>
      </navbar>
      <main>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-12">
          <div className="w-11/12 max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-4"
              >
                <Droplet className="text-red-600 mx-auto" size={64} />
              </motion.div>
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 mb-4">
                Find Blood Donors
              </h1>
              <p className="text-gray-600 text-lg">
                Search for blood donation requests and save lives today
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-pink-500/5 to-rose-500/5 rounded-3xl blur-xl"></div>

              <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
                {/* Blood Group */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col w-full md:w-1/4"
                >
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Droplet size={16} className="text-red-600" />
                    Blood Group
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="select select-bordered w-full rounded-xl bg-white border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                  >
                    <option value="">All Blood Groups</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </motion.div>

                {/* District */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col w-full md:w-1/4"
                >
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-red-600" />
                    District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="select select-bordered w-full rounded-xl bg-white border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                  >
                    <option value="">All Districts</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Upazila */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col w-full md:w-1/4"
                >
                  <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-red-600" />
                    Upazila
                  </label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="select select-bordered w-full rounded-xl bg-white border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                  >
                    <option value="">All Upazilas</option>
                    {upazilas.map((u) => (
                      <option key={u.name} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Search Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-1/4"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative overflow-hidden w-full h-[48px] rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold transition-all shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Search size={20} />
                      {isLoading ? "Searching..." : "Search"}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </button>
                </motion.div>
              </div>
            </motion.form>

            {/* Default Animated Message */}
            <AnimatePresence mode="wait">
              {!hasSearched && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-16"
                >
                  <div className="relative">
                    {/* Animated Background Circles */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-300 to-pink-300 rounded-full blur-3xl -z-10"
                    />

                    <div className="text-center space-y-8 py-16">
                      {/* Animated Hearts */}
                      <div className="flex justify-center gap-8">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -20, 0],
                              rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          >
                            <Heart
                              className="text-red-500"
                              size={48}
                              fill="currentColor"
                            />
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                      >
                        <h2 className="text-4xl font-bold text-gray-800">
                          Ready to Save Lives?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                          Use the search filters above to find blood donation
                          requests in your area. Every search brings you one
                          step closer to helping someone in need.
                        </p>
                      </motion.div>

                      {/* Animated Stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex justify-center gap-8 flex-wrap"
                      >
                        {[
                          { icon: Droplet, label: "Blood Types", value: "8" },
                          {
                            icon: Activity,
                            label: "Lives Saved",
                            value: "1000+",
                          },
                          {
                            icon: Heart,
                            label: "Active Donors",
                            value: "500+",
                          },
                        ].map((stat, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 min-w-[150px]"
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <stat.icon
                                className="text-red-600 mx-auto mb-2"
                                size={32}
                              />
                            </motion.div>
                            <div className="text-3xl font-bold text-gray-800">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Call to Action */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-8"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-flex items-center gap-2 text-red-600 font-semibold text-lg"
                        >
                          <Search className="animate-bounce" size={24} />
                          Start your search now
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Search Results */}
              {hasSearched && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-12"
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block"
                      >
                        <Droplet className="text-red-600" size={64} />
                      </motion.div>
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-6 text-xl text-gray-600 font-semibold"
                      >
                        Searching for blood donors...
                      </motion.p>
                    </motion.div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🎯
                        </motion.div>
                        Found {searchResults.length} Request
                        {searchResults.length !== 1 ? "s" : ""}
                      </motion.h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((request, index) => (
                          <motion.div
                            key={request._id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 100,
                            }}
                            whileHover={{
                              y: -10,
                              scale: 1.02,
                              transition: { duration: 0.2 },
                            }}
                            className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-white/40 overflow-hidden"
                          >
                            {/* Animated gradient background on hover */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              animate={{
                                backgroundPosition: ["0% 0%", "100% 100%"],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />

                            <div className="relative z-10">
                              {/* Blood Group Badge */}
                              <div className="flex items-center justify-between mb-4">
                                <motion.div
                                  className="flex items-center gap-2"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <Droplet
                                      className="text-red-600"
                                      size={28}
                                      fill="currentColor"
                                    />
                                  </motion.div>
                                  <span className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                    {request.bloodGroup}
                                  </span>
                                </motion.div>
                                {getStatusBadge(request.donation_status)}
                              </div>

                              {/* Recipient Info */}
                              <div className="space-y-3 mb-4">
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  className="flex items-start gap-2"
                                >
                                  <User
                                    className="text-red-500 mt-1 flex-shrink-0"
                                    size={18}
                                  />
                                  <div>
                                    <p className="text-xs text-gray-500 font-semibold">
                                      Recipient
                                    </p>
                                    <p className="font-bold text-gray-800">
                                      {request.recipient_name}
                                    </p>
                                  </div>
                                </motion.div>

                                <motion.div
                                  whileHover={{ x: 5 }}
                                  className="flex items-start gap-2"
                                >
                                  <MapPin
                                    className="text-red-500 mt-1 flex-shrink-0"
                                    size={18}
                                  />
                                  <div>
                                    <p className="text-xs text-gray-500 font-semibold">
                                      Location
                                    </p>
                                    <p className="text-sm text-gray-700 font-medium">
                                      {request.recipient_upazila},{" "}
                                      {request.recipient_district}
                                    </p>
                                    {request.address && (
                                      <p className="text-xs text-gray-600 mt-1">
                                        {request.address}
                                      </p>
                                    )}
                                  </div>
                                </motion.div>

                                <motion.div
                                  whileHover={{ x: 5 }}
                                  className="flex items-start gap-2"
                                >
                                  <Hospital
                                    className="text-red-500 mt-1 flex-shrink-0"
                                    size={18}
                                  />
                                  <div>
                                    <p className="text-xs text-gray-500 font-semibold">
                                      Hospital
                                    </p>
                                    <p className="text-sm text-gray-700 font-medium">
                                      {request.hospital}
                                    </p>
                                  </div>
                                </motion.div>

                                <div className="flex items-center gap-4">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2"
                                  >
                                    <Calendar
                                      className="text-red-500"
                                      size={18}
                                    />
                                    <span className="text-sm text-gray-700 font-medium">
                                      {request.date}
                                    </span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2"
                                  >
                                    <Clock className="text-red-500" size={18} />
                                    <span className="text-sm text-gray-700 font-medium">
                                      {request.time}
                                    </span>
                                  </motion.div>
                                </div>
                              </div>

                              {/* Requester Info */}
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="border-t border-gray-200 pt-3 space-y-2 bg-gray-50/50 rounded-lg p-3 -mx-3"
                              >
                                <div className="flex items-center gap-2">
                                  <User className="text-gray-400" size={16} />
                                  <p className="text-xs text-gray-600">
                                    Requested by:{" "}
                                    <span className="font-bold">
                                      {request.requester_name}
                                    </span>
                                  </p>
                                </div>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  className="flex items-center gap-2"
                                >
                                  <Mail className="text-gray-400" size={16} />
                                  <a
                                    href={`mailto:${request.requester_email}`}
                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                  >
                                    {request.requester_email}
                                  </a>
                                </motion.div>
                                {request.message && (
                                  <div className="flex items-start gap-2">
                                    <MessageSquare
                                      className="text-gray-400 mt-1 flex-shrink-0"
                                      size={16}
                                    />
                                    <p className="text-xs text-gray-600 italic">
                                      {request.message}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl"
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Droplet className="mx-auto text-gray-300" size={80} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-3 mt-6">
                        No Results Found
                      </h3>
                      <p className="text-gray-500 text-lg">
                        Try adjusting your search filters to find blood donation
                        requests.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </section>
  );
};

export default SearchPage;
