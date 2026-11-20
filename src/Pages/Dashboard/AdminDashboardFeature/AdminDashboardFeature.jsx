import React, { useEffect, useState } from "react";
import { motion as Motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, DollarSign, Droplet, HeartHandshake, TrendingUp, ShieldCheck } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CountUp = ({ end, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, end, { duration });
    return animation.stop;
  }, [end, count, duration]);

  return <Motion.span>{rounded}</Motion.span>;
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
          totalUsers: usersRes.data?.length || 0,
          totalFunding: fundingRes.data?.totalAmount || 0,
          totalRequests: requestsRes.data?.totalRequest || 0,
        });
      } catch (error) {
        toast.error("Failed to load platform statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  const statCards = [
    {
      title: "Registered Donors",
      description: "Verified community blood donors",
      value: stats.totalUsers,
      icon: Users,
      color: "from-red-600 to-red-700",
      accent: "text-red-600",
      bgAccent: "bg-red-500/10",
      borderAccent: "border-red-500/20",
    },
    {
      title: "Community Life Fund",
      description: "Direct patient & medical subsidies",
      value: stats.totalFunding,
      icon: DollarSign,
      color: "from-emerald-600 to-teal-700",
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/20",
      prefix: "$",
    },
    {
      title: "Emergency Requests",
      description: "Transfusion cases coordinated",
      value: stats.totalRequests,
      icon: Droplet,
      color: "from-blue-600 to-indigo-700",
      accent: "text-blue-600",
      bgAccent: "bg-blue-500/10",
      borderAccent: "border-blue-500/20",
    },
  ];

  return (
    <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] p-4 sm:p-5 lg:p-6 shadow-sm transition-smooth mb-5">
      {/* Symmetrical Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-[var(--border-light)] mb-4">
        <div>
          <span className="section-eyebrow block">EXECUTIVE OVERVIEW</span>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Network Operations & Impact Summary
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Real-time telemetry tracking verified volunteer donors, community funding, and emergency blood dispatches.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Network Active
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-[var(--background-main)] rounded-xl p-4 border border-[var(--border-light)] shadow-sm hover:border-red-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-sm`}
              >
                <card.icon size={18} />
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${card.bgAccent} ${card.accent} ${card.borderAccent}`}
              >
                Verified Record
              </span>
            </div>

            <div className="space-y-0.5 mb-3">
              <div className="flex items-baseline gap-1">
                {card.prefix && (
                  <span className="text-xl font-black text-[var(--text-primary)]">
                    {card.prefix}
                  </span>
                )}
                <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  {loading ? "..." : <CountUp end={card.value} duration={2} />}
                </div>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                {card.title}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                {card.description}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[var(--border-light)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <TrendingUp size={12} className={card.accent} />
                Network Synced
              </span>
              <span className="font-semibold">100% Reliable</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardFeature;
