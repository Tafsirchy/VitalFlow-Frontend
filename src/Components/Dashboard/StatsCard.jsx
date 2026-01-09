import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = "from-red-500 to-rose-600",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            {title}
          </p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">
            {value}
          </h3>
          {trend !== undefined && trend !== null && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm font-semibold ${
                trend >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend)}%</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs font-normal ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`p-4 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
        >
          {Icon && <Icon className="w-8 h-8 text-white" />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
