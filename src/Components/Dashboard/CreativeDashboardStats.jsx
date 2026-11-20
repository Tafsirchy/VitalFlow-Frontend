import React from "react";
import { Droplet, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";

const CreativeDashboardStats = ({ requests = [], bloodStats = {} }) => {
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => (r.status || r.donation_status) === "pending").length,
    inprogress: requests.filter((r) => (r.status || r.donation_status) === "inprogress").length,
    completed: requests.filter((r) => (r.status || r.donation_status) === "done").length,
    cancelled: requests.filter((r) => (r.status || r.donation_status) === "canceled").length,
  };

  const statusCards = [
    {
      label: "Pending Verification",
      count: stats.pending,
      icon: Clock,
      text: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "In Progress",
      count: stats.inprogress,
      icon: TrendingUp,
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Transfusion Completed",
      count: stats.completed,
      icon: CheckCircle,
      text: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Cancelled",
      count: stats.cancelled,
      icon: XCircle,
      text: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {statusCards.map((card) => (
          <div
            key={card.label}
            className={`bg-[var(--background-card)] border ${card.border} rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between`}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                {card.label}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {card.count}
              </div>
            </div>
            <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.text} flex items-center justify-center`}>
              <card.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Blood Group Distribution Grid */}
      <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center">
            <Droplet size={20} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)]">
              Blood Group Distribution
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Registered active voluntary donors across Bangladesh by blood group.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => {
            const count = bloodStats[type] || 0;
            return (
              <div
                key={type}
                className="p-3.5 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)] flex items-center justify-between"
              >
                <div>
                  <span className="text-xl sm:text-2xl font-black text-[var(--text-primary)] block">
                    {type}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Compatible
                  </span>
                </div>
                <div className="text-xl font-black text-[var(--primary-red)]">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreativeDashboardStats;
