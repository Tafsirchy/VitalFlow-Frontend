import React from "react";
import { Outlet } from "react-router";
import Aside from "../Components/Aside/Aside";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-red-50/20 to-blue-50/20">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <Aside />
      </aside>

      {/* Mobile Sidebar - Handled inside Aside component */}
      <div className="lg:hidden">
        <Aside />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 bg-red-100/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 p-4 lg:p-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
