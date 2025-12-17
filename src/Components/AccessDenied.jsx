import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router"; // Fixed import (was "react-router")
import { ShieldAlert, Lock, AlertTriangle, X, ArrowLeft } from "lucide-react";

const AccessDenied = () => {
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);
  const [particles, setParticles] = useState([]);

 useEffect(() => {
   // Generate random particles
   const newParticles = Array.from({ length: 20 }, (_, i) => ({
     id: i,
     x: Math.random() * 100,
     y: Math.random() * 100,
     size: Math.random() * 4 + 2,
     duration: Math.random() * 3 + 2,
   }));
   setParticles(newParticles);

   // Random glitch effect every 3 seconds
   const glitchInterval = setInterval(() => {
     setGlitchActive(true);
     setTimeout(() => setGlitchActive(false), 200);
   }, 3000);

   return () => clearInterval(glitchInterval);
 }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const shieldVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.2, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
        animate={{
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Main content card */}
        <motion.div
          className={`bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-red-500/20 ${
            glitchActive ? "animate-pulse" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Shield icon with pulse effect */}
          <div className="relative flex justify-center mb-8">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="absolute w-32 h-32 rounded-full bg-red-500/30 blur-xl"
            />
            <motion.div
              variants={shieldVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <ShieldAlert
                className="w-24 h-24 text-red-500"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          {/* Title with glitch effect */}
          <motion.h1
            variants={itemVariants}
            className={`text-5xl md:text-6xl font-bold text-center mb-4 ${
              glitchActive ? "text-red-400 blur-sm" : "text-red-500"
            } transition-all duration-200`}
          >
            ACCESS DENIED
          </motion.h1>

          {/* Error code */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Lock className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-mono text-lg">ERROR 403</span>
            <Lock className="w-5 h-5 text-red-400" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-center text-lg mb-8 leading-relaxed"
          >
            You don't have permission to access this resource. This area is
            restricted and requires proper authorization.
          </motion.p>

          {/* Warning box */}
          <motion.div
            variants={itemVariants}
            className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 mb-8 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">
              If you believe this is an error, please contact your system
              administrator or try logging in with the appropriate credentials.
            </p>
          </motion.div>

          {/* Action button - NOW FUNCTIONAL */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.button
              onClick={() => navigate(-1)} // This makes the button go back!
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-red-500/30 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating locks decoration */}
        <div className="absolute -top-10 -left-10 opacity-20">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Lock className="w-16 h-16 text-red-500" />
          </motion.div>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-20">
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <X className="w-16 h-16 text-red-500" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
