import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, DollarSign, Droplet } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CountUp = ({ end, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, end, { duration });
    return animation.stop;
  }, [end, count, duration]);

  return <motion.span>{rounded}</motion.span>;
};

const AdminDashboardFeature = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersRes, fundingRes, requestsRes] = await Promise.all([
          axiosSecure.get("/donor"),
          axiosSecure.get("/total-funding"),
          axiosSecure.get("/all-requests?size=1&page=0"),
        ]);

        setStats({
          totalUsers: usersRes.data.length,
          totalFunding: fundingRes.data.totalAmount,
          totalRequests: requestsRes.data.totalRequest,
        });
      } catch (error) {
        toast.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  const statCards = [
    {
      title: "Total Donors",
      value: stats.totalUsers,
      icon: Users,
      color: "from-purple-500 to-pink-600",
      glow: "shadow-purple-500/50",
      particleColor: "text-purple-300",
    },
    {
      title: "Total Funding",
      value: stats.totalFunding,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-500/50",
      particleColor: "text-emerald-300",
      prefix: "$",
    },
    {
      title: "Total Requests",
      value: stats.totalRequests,
      icon: Droplet,
      color: "from-red-500 to-orange-600",
      glow: "shadow-red-500/50",
      particleColor: "text-red-300",
    },
  ];

  const particles = [...Array(10)];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className={`absolute opacity-20 ${statCards[i % 3].particleColor}`}
            initial={{ y: "100%", x: `${Math.random() * 100}%` }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <Droplet size={30 + Math.random() * 40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Platform Overview
        </h2>
        <p className="text-gray-600 mt-2">Real-time impact at a glance</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.2 + 0.3,
              type: "spring",
              stiffness: 80,
            }}
            whileHover={{
              y: -12,
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            className="relative group"
          >
            {/* Glassmorphic Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 group-hover:shadow-3xl">
              {/* Gradient Top Bar */}
              <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />

              <div className="p-8">
                {/* Icon with Glowing Ring */}
                <div className="relative mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r opacity-30 blur-xl"
                    style={{ backgroundImage: `conic-gradient(${card.color})` }}
                  />
                  <div
                    className={`relative w-20 h-20 mx-auto bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-2xl ${card.glow}`}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <card.icon className="text-white" size={36} />
                    </motion.div>
                  </div>
                </div>

                {/* Count Up Number */}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-gray-800">
                    {loading ? (
                      <span className="text-gray-400">...</span>
                    ) : (
                      <>
                        {card.prefix && <span className="text-3xl">$</span>}
                        <CountUp end={card.value} duration={2.5} />
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mt-4">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {card.title === "Total Funding"
                      ? "Lifetime contributions"
                      : "Across the platform"}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardFeature;
