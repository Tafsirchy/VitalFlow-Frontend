import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import {
  Menu,
  X,
  Droplet,
  LayoutDashboard,
  LogOut,
  Activity,
  ChevronDown,
  Home,
  Heart,
  DollarSign,
  User,
  Grid3x3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/image.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    setIsDropdownOpen(false);
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => 
        console.log(error));
  };

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
      isActive
        ? "bg-red-600 text-white shadow-lg shadow-red-500/50"
        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
    }`;

  const navigationItems = [
    { path: "/", label: "Home", icon: Home, color: "from-red-500 to-pink-500" },
    {
      path: "/donation-requests",
      label: "Donations",
      icon: Heart,
      color: "from-blue-500 to-cyan-500",
    },
    {
      path: "/funding",
      label: "Funding",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      requireAuth: true,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-purple-500 to-indigo-500",
      requireAuth: true,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
    >
      <div className="w-11/12 mx-auto px-0">
        <div className="flex items-center justify-between py-1">
          {/* -------- Logo Section -------- */}
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className="flex items-center gap-1 group pointer-events-auto"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative"
              >
                <div className="w-14 h-14 flex items-center justify-center p-1">
                  <img
                    src={logo}
                    alt="VitalFlow Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  VitalFlow
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Activity size={12} />
                  Blood Donation
                </p>
              </div>
            </Link>

            {/* Mobile/Tablet Grid Menu Button - ONLY SHOWN WHEN USER IS LOGGED IN */}
            {user && (
              <div className="lg:hidden relative ml-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 hover:from-red-100 hover:to-blue-100 transition-all"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={20} className="text-red-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Grid3x3 size={20} className="text-red-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Floating Grid Menu */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-sm z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -20 }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 300,
                        }}
                        className="absolute left-0 top-14 z-50"
                      >
                        {/* Main Grid Container */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-4 w-[280px]">
                          {/* User Card (if logged in) */}
                          {user && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="mb-4 p-3 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl shadow-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="w-12 h-12 rounded-full ring-2 ring-white ring-offset-2 ring-offset-transparent">
                                    <img
                                      src={
                                        user.photoURL ||
                                        "https://i.ibb.co/9ZQZQZQ/user.png"
                                      }
                                      alt={user.displayName || "User"}
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-sm truncate text-white">
                                    {user.displayName || "User"}
                                  </p>
                                  <p className="text-xs text-white/80 truncate">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Grid Navigation */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            {navigationItems.map((item, idx) => {
                              if (item.requireAuth && !user) return null;

                              return (
                                <motion.div
                                  key={item.path}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                  <NavLink
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `block h-24 rounded-2xl p-3 transition-all ${
                                        isActive
                                          ? "bg-gradient-to-br shadow-lg scale-105"
                                          : "bg-gray-50 hover:bg-gray-100"
                                      } ${isActive ? item.color : ""}`
                                    }
                                  >
                                    {({ isActive }) => (
                                      <div className="flex flex-col items-center justify-center h-full gap-2">
                                        <div
                                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                            isActive
                                              ? "bg-white/20"
                                              : "bg-white shadow-sm"
                                          }`}
                                        >
                                          <item.icon
                                            size={20}
                                            className={
                                              isActive
                                                ? "text-white"
                                                : "text-gray-700"
                                            }
                                          />
                                        </div>
                                        <span
                                          className={`text-xs font-bold ${
                                            isActive
                                              ? "text-white"
                                              : "text-gray-700"
                                          }`}
                                        >
                                          {item.label}
                                        </span>
                                      </div>
                                    )}
                                  </NavLink>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Logout Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <button
                              onClick={() => {
                                handleLogOut();
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 font-bold py-3 rounded-xl transition-all border border-red-200"
                            >
                              <LogOut size={18} />
                              <span>Logout</span>
                            </button>
                          </motion.div>
                        </div>

                        {/* Floating Arrow Indicator */}
                        <div className="absolute -top-2 left-8 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* -------- Desktop Navigation (Centered) -------- */}
          <div className="hidden lg:absolute left-1/2 -translate-x-1/2 lg:flex items-center gap-3">
            <NavLink to="/donation-requests" className={navLinkStyle}>
              Donation Requests
            </NavLink>

            {user && (
              <NavLink to="/funding" className={navLinkStyle}>
                Funding
              </NavLink>
            )}
          </div>

          {/* -------- Right Section -------- */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                {/* Mobile/Tablet Grid Menu Button - SHOWN WHEN USER IS LOGGED OUT */}
                <div className="lg:hidden relative">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 hover:from-red-100 hover:to-blue-100 transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X size={20} className="text-red-600" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Grid3x3 size={20} className="text-red-600" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Floating Grid Menu */}
                  <AnimatePresence>
                    {isMobileMenuOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-sm z-40"
                          onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: -20 }}
                          transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                          }}
                          className="absolute right-0 top-14 z-50"
                        >
                          {/* Main Grid Container */}
                          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-4 w-[280px]">
                            {/* Grid Navigation */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              {navigationItems.map((item, idx) => {
                                if (item.requireAuth && !user) return null;

                                return (
                                  <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                  >
                                    <NavLink
                                      to={item.path}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className={({ isActive }) =>
                                        `block h-24 rounded-2xl p-3 transition-all ${
                                          isActive
                                            ? "bg-gradient-to-br shadow-lg scale-105"
                                            : "bg-gray-50 hover:bg-gray-100"
                                        } ${isActive ? item.color : ""}`
                                      }
                                    >
                                      {({ isActive }) => (
                                        <div className="flex flex-col items-center justify-center h-full gap-2">
                                          <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                              isActive
                                                ? "bg-white/20"
                                                : "bg-white shadow-sm"
                                            }`}
                                          >
                                            <item.icon
                                              size={20}
                                              className={
                                                isActive
                                                  ? "text-white"
                                                  : "text-gray-700"
                                              }
                                            />
                                          </div>
                                          <span
                                            className={`text-xs font-bold ${
                                              isActive
                                                ? "text-white"
                                                : "text-gray-700"
                                            }`}
                                          >
                                            {item.label}
                                          </span>
                                        </div>
                                      )}
                                    </NavLink>
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Login Button */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Link
                                to="/auth/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                  Login
                                </button>
                              </Link>
                            </motion.div>
                          </div>

                          {/* Floating Arrow Indicator - adjusted for right side */}
                          <div className="absolute -top-2 right-8 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Login Button */}
                <Link to="/auth/login" className="hidden lg:block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-error gap-2 shadow-lg shadow-red-500/30"
                  >
                    Login
                  </motion.button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="cursor-pointer relative"
                >
                  <div className="avatar">
                    <div className="w-11 h-11 rounded-full ring ring-red-500 ring-offset-2 hover:ring-blue-500 transition-all duration-300">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/9ZQZQZQ/user.png"
                        }
                        alt={user.displayName || "User"}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </motion.div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10"
                        onClick={() => setIsDropdownOpen(false)}
                      />

                      {/* Dropdown menu */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-4 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 space-y-1 z-20"
                      >
                        <div className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div className="avatar">
                              <div className="w-10 h-10 rounded-full">
                                <img
                                  src={
                                    user.photoURL ||
                                    "https://i.ibb.co/9ZQZQZQ/user.png"
                                  }
                                  alt={user.displayName || "User"}
                                />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm truncate text-gray-900">
                                {user.displayName || "User"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="divider my-1"></div>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                          <LayoutDashboard size={18} />
                          <span className="font-semibold">Dashboard</span>
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all text-red-600 font-semibold"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
