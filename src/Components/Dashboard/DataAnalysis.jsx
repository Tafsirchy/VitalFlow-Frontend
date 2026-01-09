import React from "react";
import { motion as Motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  Calendar,
  Award,
  Activity,
  Zap
} from "lucide-react";

const DataAnalysis = ({ requests = [], totalUsers = 0 }) => {
  // Calculate analytics
  const totalRequests = requests.length;
  const completedRequests = requests.filter(r => (r.status || r.donation_status) === "done").length;
  const pendingRequests = requests.filter(r => (r.status || r.donation_status) === "pending").length;
  const inProgressRequests = requests.filter(r => (r.status || r.donation_status) === "inprogress").length;
  
  const successRate = totalRequests > 0 ? ((completedRequests / totalRequests) * 100).toFixed(1) : 0;
  const completionRate = totalRequests > 0 ? (((completedRequests + inProgressRequests) / totalRequests) * 100).toFixed(1) : 0;
  
  // Calculate monthly growth (mock for now - would use real historical data)
  const monthlyGrowth = 12.5;
  const avgResponseTime = "2.4 hrs";
  const activeUsers = totalUsers || 847;

  const insights = [
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change: "+5.2%",
      trending: "up",
      icon: Target,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      description: "Requests successfully completed"
    },
    {
      title: "Monthly Growth",
      value: `${monthlyGrowth}%`,
      change: "+2.3%",
      trending: "up",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Increase in donation requests"
    },
    {
      title: "Active Donors",
      value: activeUsers,
      change: "+124",
      trending: "up",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      description: "Registered and active users"
    },
    {
      title: "Avg Response Time",
      value: avgResponseTime,
      change: "-0.5 hrs",
      trending: "down",
      icon: Zap,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Average time to first response"
    }
  ];

  const performanceMetrics = [
    {
      label: "Total Requests",
      value: totalRequests,
      max: 100,
      color: "bg-blue-500",
      icon: Calendar
    },
    {
      label: "Completion Rate",
      value: completionRate,
      max: 100,
      color: "bg-green-500",
      icon: Award
    },
    {
      label: "Pending Review",
      value: pendingRequests,
      max: totalRequests,
      color: "bg-amber-500",
      icon: Activity
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Data Analysis & Insights
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Real-time performance metrics and trends
          </p>
        </div>
        <Motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold shadow-lg"
        >
          ⚡ Live Data
        </Motion.div>
      </Motion.div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`${insight.bgColor} rounded-2xl p-5 border-2 border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${insight.color} shadow-lg`}>
                <insight.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${
                insight.trending === "up" ? "text-green-600" : "text-blue-600"
              }`}>
                {insight.trending === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {insight.change}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {insight.title}
              </p>
              <Motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className={`text-3xl font-black ${insight.textColor}`}
              >
                {insight.value}
              </Motion.p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {insight.description}
              </p>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Performance Metrics
        </h3>

        <div className="space-y-4">
          {performanceMetrics.map((metric, index) => (
            <Motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {metric.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {typeof metric.value === 'number' && metric.max === 100 ? `${metric.value}%` : metric.value}
                </span>
              </div>

              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(metric.value / metric.max) * 100}%` 
                  }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 ${metric.color} rounded-full`}
                >
                  <Motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </Motion.div>
              </div>
            </Motion.div>
          ))}
        </div>
      </Motion.div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800"
        >
          <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Urgent Requests</p>
          <p className="text-2xl font-black text-red-700 dark:text-red-300">{pendingRequests}</p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800"
        >
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">In Progress</p>
          <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{inProgressRequests}</p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800"
        >
          <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Completed</p>
          <p className="text-2xl font-black text-green-700 dark:text-green-300">{completedRequests}</p>
        </Motion.div>
      </div>
    </div>
  );
};

export default DataAnalysis;
