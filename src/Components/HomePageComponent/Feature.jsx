import React, { useState } from "react";
import {
  Droplets,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  HeartPulse,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Feature = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("ALL");

  const bloodTypes = ["ALL", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const urgentRequests = [
    {
      id: 1,
      patientName: "Mohammad Rahman",
      bloodType: "O-",
      hospital: "CMCH",
      location: "Agrabad",
      urgency: "CRITICAL",
      timePosted: "15 min ago",
      unitsNeeded: 3,
      contact: "+8801712345678",
    },
    {
      id: 2,
      patientName: "Ayesha Begum",
      bloodType: "AB+",
      hospital: "Max Hospital",
      location: "Nasirabad",
      urgency: "URGENT",
      timePosted: "45 min ago",
      unitsNeeded: 2,
      contact: "+8801823456789",
    },
    {
      id: 3,
      patientName: "Karim Ahmed",
      bloodType: "B+",
      hospital: "Imperial Hospital",
      location: "Khulshi",
      urgency: "MODERATE",
      timePosted: "2 hours ago",
      unitsNeeded: 1,
      contact: "+8801934567890",
    },
  ];

  const filtered =
    selectedBloodType === "ALL"
      ? urgentRequests
      : urgentRequests.filter((r) => r.bloodType === selectedBloodType);

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
            {/* Title */}
            <div className="flex justify-center items-center gap-2 mb-5">
              <Filter size={18} className="text-blue-700" />
              <h4 className="font-semibold text-gray-800 tracking-wide">
                Filter by Blood Group
              </h4>
            </div>

            {/* Buttons */}
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
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
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

        {/* Timeline Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBloodType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {filtered.map((req, i) => (
              <motion.div
                key={req.id}
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
                  className={`absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${
                    urgencyStyle[req.urgency]
                  } text-white flex flex-col items-center justify-center shadow-xl`}
                >
                  <Droplets />
                  <span className="font-bold">{req.bloodType}</span>
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {req.patientName}
                    </h3>
                    <p className="text-blue-700 font-medium">{req.hospital}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {req.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {req.timePosted}
                      </span>
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <AlertTriangle size={14} /> {req.urgency}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href={`tel:${req.contact}`}
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg flex items-center gap-2"
                    >
                      <Phone size={18} /> Call
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold shadow-lg"
                    >
                      Respond
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feature;
