import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("vitalflow-theme") || "light";
    }
    return "light";
  });
  const [mounted, setMounted] = useState(false);

  // Set mounted on initial load
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme attribute on state change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vitalflow-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("vitalflow-theme", newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-transparent animate-pulse" />
    );
  }

  return (
    <Motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 relative flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <AnimatePresence>
        {theme === "light" ? (
          <Motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="text-amber-500 absolute"
          >
            <Sun size={22} strokeWidth={2.5} className="drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
          </Motion.div>
        ) : (
          <Motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="text-blue-400 absolute"
          >
            <Moon size={22} strokeWidth={2.5} className="drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]" />
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.button>
  );
};

export default ThemeToggle;
