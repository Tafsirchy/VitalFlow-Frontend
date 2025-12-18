import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/image.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import {
  Menu,
  X,
  Droplet,
  LayoutDashboard,
  LogOut,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      .catch((error) => console.error(error));
  };

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
      isActive
        ? "bg-red-600 text-white shadow-lg shadow-red-500/50"
        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
    }`;

  const mobileNavLinkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
      isActive
        ? "bg-red-600 text-white"
        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
    }`;

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
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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

          {/* -------- Desktop Navigation -------- */}
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
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <Link to="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-error gap-2 shadow-lg shadow-red-500/30"
                >
                  Login
                </motion.button>
              </Link>
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

          {/* -------- Mobile Menu Button -------- */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden btn btn-ghost btn-circle"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* -------- Mobile Menu -------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* User Info in Mobile Menu */}
                {user && (
                  <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full ring ring-blue-500 ring-offset-2">
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
                          <p className="font-bold text-sm truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <nav className="space-y-2">
                  <NavLink
                    to="/donation-requests"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileNavLinkStyle}
                  >
                    Donation Requests
                  </NavLink>

                  {user && (
                    <NavLink
                      to="/funding"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={mobileNavLinkStyle}
                    >
                      Funding
                    </NavLink>
                  )}

                  {user && (
                    <NavLink
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={mobileNavLinkStyle}
                    >
                      <div className="flex items-center gap-2">
                        <LayoutDashboard size={18} />
                        Dashboard
                      </div>
                    </NavLink>
                  )}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  {!user ? (
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="btn btn-error w-full gap-2">
                        Login
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn btn-outline btn-error w-full gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
