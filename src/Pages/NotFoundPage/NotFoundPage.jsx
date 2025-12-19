import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Droplet, Heart, Home, Search } from "lucide-react";

const NotFoundPage = () => {
  const droplets = [...Array(12)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center px-4 py-5 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {droplets.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-300 opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -150,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 150,
              x: Math.random() * window.innerWidth,
              rotate: 360,
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          >
            <Droplet
              size={40 + Math.random() * 60}
              fill="currentColor"
              className="drop-shadow-xl"
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Creative 404 with Morphing Drop + Heart Fusion */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="mb-4"
        >
          <div className="relative inline-block">
            {/* Pulsing Heart inside Droplet */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart size={90} className="text-red-600" fill="currentColor" />
            </motion.div>

            {/* Outer Droplet Shape */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Droplet
                size={180}
                className="text-red-500"
                fill="currentColor"
              />
            </motion.div>

            {/* 404 Text Overlaid */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl">
                404
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Title & Message - Tighter spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Lost in the Bloodstream?
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            This page took a detour while trying to save a life. Don't worry —
            we'll get you back on track! 💉
          </p>
        </motion.div>

        {/* Searching Icon Animation (like it's looking for the page) */}
        <motion.div
          className="my-5"
          animate={{
            rotate: [0, 15, -15, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Search size={60} className="text-blue-600 mx-auto drop-shadow-md" />
        </motion.div>

        {/* Back to Home Button - Prominent & Animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl"
          >
            <Home size={26} />
            Return Home & Save Lives
          </Link>
        </motion.div>

        {/* Fun Closing Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 text-sm text-gray-500"
        >
          Every lost page helps us find better ways to connect donors ❤️
        </motion.p>
      </div>
    </div>
  );
};

export default NotFoundPage;
