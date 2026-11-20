import React from "react";
import { 
  TrendingUp, 
  Target, 
  Users, 
  Clock,
  Activity,
  Award,
} from "lucide-react";

const DataAnalysis = ({ requests = [], totalUsers = 0 }) => {
  const totalRequests = requests.length;
  const completedRequests = requests.filter((r) => (r.status || r.donation_status) === "done").length;
  const inProgressRequests = requests.filter((r) => (r.status || r.donation_status) === "inprogress").length;

  const successRate = totalRequests > 0 ? ((completedRequests / totalRequests) * 100).toFixed(1) : 0;
  const completionRate = totalRequests > 0 ? (((completedRequests + inProgressRequests) / totalRequests) * 100).toFixed(1) : 0;

  const insights = [
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: Target,
      desc: "Emergency requests successfully resolved",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Monthly Influx",
      value: "+14.8%",
      icon: TrendingUp,
      desc: "Growth in voluntary donor participation",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Donors",
      value: totalUsers || "15,800+",
      icon: Users,
      desc: "Verified voluntary citizens ready to donate",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Avg Response Time",
      value: "2.4 hrs",
      icon: Clock,
      desc: "Time from request creation to first donor match",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)]">
          Network Performance & Clinical Analytics
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Real-time metrics measuring emergency fulfillment efficiency across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {insights.map((item) => (
          <div
            key={item.title}
            className="p-3.5 sm:p-4 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)]"
          >
            <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center mb-2.5`}>
              <item.icon size={16} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
              {item.title}
            </span>
            <div className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-1">
              {item.value}
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAnalysis;
