import React from "react";
import { motion as Motion } from "framer-motion";
import { Droplet, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const CreativeDashboardStats = ({ requests = [], bloodStats = {} }) => {
  // Calculate stats
  const stats = {
    total: requests.length,
    pending: requests.filter(r => (r.status || r.donation_status) === "pending").length,
    inprogress: requests.filter(r => (r.status || r.donation_status) === "inprogress").length,
    completed: requests.filter(r => (r.status || r.donation_status) === "done").length,
    cancelled: requests.filter(r => (r.status || r.donation_status) === "canceled").length,
  };

  const statusCards = [
    {
      label: "Pending",
      count: stats.pending,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bgGlow: "bg-amber-500/20",
      iconColor: "text-amber-500",
      borderColor: "border-amber-500/30",
    },
    {
      label: "In Progress",
      count: stats.inprogress,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/20",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Completed",
      count: stats.completed,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-500/20",
      iconColor: "text-green-500",
      borderColor: "border-green-500/30",
    },
    {
      label: "Cancelled",
      count: stats.cancelled,
      icon: XCircle,
      color: "from-red-500 to-rose-500",
      bgGlow: "bg-red-500/20",
      iconColor: "text-red-500",
      borderColor: "border-red-500/30",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Request Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Real-time overview of all donation requests
        </p>
      </Motion.div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <Motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative overflow-hidden rounded-2xl border-2 ${card.borderColor} bg-white dark:bg-gray-800 p-6 shadow-lg`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 ${card.bgGlow} blur-2xl opacity-50`} />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <Motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg mb-4`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </Motion.div>

              {/* Count */}
              <Motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="text-4xl font-black text-gray-900 dark:text-white mb-2"
              >
                {card.count}
              </Motion.div>

              {/* Label */}
              <p className={`text-sm font-semibold ${card.iconColor}`}>
                {card.label}
              </p>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(card.count / stats.total) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${card.color}`}
                />
              </div>
            </div>

            {/* Animated Border Pulse */}
            <Motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              className={`absolute inset-0 border-2 ${card.borderColor} rounded-2xl pointer-events-none`}
            />
          </Motion.div>
        ))}
      </div>

      {/* Blood Type Visual Representation */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
            <Droplet className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Blood Type Distribution
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available donor blood groups
            </p>
          </div>
        </div>

        {/* Blood Type Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type, index) => {
            const count = bloodStats[type] || 0;
            const maxCount = Math.max(...Object.values(bloodStats), 1);
            const percentage = (count / maxCount) * 100;

            return (
              <Motion.div
                key={type}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                {/* Circular Progress */}
                <svg className="w-full h-auto" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress Circle */}
                  <Motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={{
                      strokeDasharray: `${(percentage / 100) * 251.2} 251.2`,
                    }}
                    transition={{ delay: 0.8 + index * 0.05, duration: 1 }}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DC2626" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg md:text-xl font-black text-red-600 dark:text-red-400">
                    {type}
                  </span>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    {count}
                  </span>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </Motion.div>

      {/* Activity Timeline Preview */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-blue-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <Motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold"
          >
            Live
          </Motion.div>
        </div>

        <div className="space-y-2">
          {requests.slice(0, 3).map((req, index) => (
            <Motion.div
              key={req._id || index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm"
            >
              <Droplet
                className="w-4 h-4 text-red-500"
                fill="currentColor"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {req.recipient_name || req.recipientName || "Anonymous"}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {req.bloodGroup || req.blood || "Unknown"} • {req.donation_status || req.status || "Pending"}
                </p>
              </div>
            </Motion.div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
};

export default CreativeDashboardStats;
