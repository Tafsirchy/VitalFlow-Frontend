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
  Info,
  Mail,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import logo from "../assets/image.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const handleLogOut = () => {
    setIsDropdownOpen(false);
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[var(--primary-red)] text-white shadow-lg shadow-[var(--primary-red)]/50"
        : "text-gray-700 dark:text-gray-200 hover:bg-[var(--primary-red-light)]/10 hover:text-[var(--primary-red)]"
    }`;

  const navigationItems = [
    { path: "/", label: "Home", icon: Home, color: "from-[var(--primary-red-dark)] to-[var(--primary-red)]" },
    {
      path: "/donation-requests",
      label: "Donations",
      icon: Heart,
      color: "from-[var(--primary-red)] to-[var(--primary-red-light)]",
    },
    {
      path: "/funding",
      label: "Funding",
      icon: DollarSign,
      color: "from-[var(--secondary-slate-dark)] to-[var(--secondary-slate)]",
      requireAuth: true,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-[var(--primary-red-deepest)] to-[var(--primary-red-dark)]",
      requireAuth: true,
    },
  ];

  return (
    <>
      <Motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 glass-morphism !border-b-0"
      >
        <div className="w-11/12 mx-auto px-0">
          <div className="flex items-center justify-between py-1">
            {/* -------- Logo Section -------- */}
            <div className="flex items-center gap-1">
              <a
                href="/"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}
                className="flex items-center gap-1 group pointer-events-auto cursor-pointer"
              >
                <Motion.div
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
                </Motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient-crimson">
                    VitalFlow
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Activity size={12} />
                    Blood Donation
                  </p>
                </div>
              </a>

              {/* Mobile/Tablet Grid Menu Button - ONLY SHOWN WHEN USER IS LOGGED IN */}
              {user && (
                <div className="lg:hidden relative ml-2">
                  <Motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 hover:from-red-100 hover:to-blue-100 transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <Motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X size={20} className="text-red-600" />
                        </Motion.div>
                      ) : (
                        <Motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Grid3x3 size={20} className="text-red-600" />
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </Motion.button>
                </div>
              )}
            </div>

            {/* -------- Desktop Navigation (Centered) -------- */}
            <div className="hidden lg:absolute left-1/2 -translate-x-1/2 lg:flex items-center gap-3">
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
              
              <NavLink to="/search" className={navLinkStyle}>
                Search
              </NavLink>
              
              <NavLink to="/donation-requests" className={navLinkStyle}>
                Donations
              </NavLink>

              {user && (
                <NavLink to="/funding" className={navLinkStyle}>
                  Funding
                </NavLink>
              )}
              
              {/* About Us Dropdown - Available for ALL users */}
              <div className="relative">
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold"
                >
                  <Info size={18} />
                  <span>About Us</span>
                  <Motion.div
                    animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </Motion.div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isAboutDropdownOpen && (
                    <Motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setIsAboutDropdownOpen(true)}
                      onMouseLeave={() => setIsAboutDropdownOpen(false)}
                      className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <NavLink
                          to="/about"
                          onClick={() => setIsAboutDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--primary-red-light)]/10 transition-all group"
                        >
                          <Info className="text-[var(--primary-red)]" size={20} />
                          <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-[var(--primary-red)]">
                            About VitalFlow
                          </span>
                        </NavLink>
                        
                        <NavLink
                          to="/contact"
                          onClick={() => setIsAboutDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all group"
                        >
                          <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                          <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            Contact Us
                          </span>
                        </NavLink>
                        
                        <NavLink
                          to="/blog"
                          onClick={() => setIsAboutDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 dark:hover:bg-gray-700 transition-all group"
                        >
                          <BookOpen className="text-purple-600 dark:text-purple-400" size={20} />
                          <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                            Blog
                          </span>
                        </NavLink>
                        
                        <NavLink
                          to="/help"
                          onClick={() => setIsAboutDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-gray-700 transition-all group"
                        >
                          <HelpCircle className="text-green-600 dark:text-green-400" size={20} />
                          <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400">
                            Help & Support
                          </span>
                        </NavLink>
                      </div>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* -------- Right Section -------- */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {!user ? (
                <>
                  {/* Mobile/Tablet Grid Menu Button - SHOWN WHEN USER IS LOGGED OUT */}
                  <div className="lg:hidden relative">
                    <Motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 hover:from-red-100 hover:to-blue-100 transition-all"
                    >
                      <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                          <Motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X size={20} className="text-red-600" />
                          </Motion.div>
                        ) : (
                          <Motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Grid3x3 size={20} className="text-red-600" />
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </Motion.button>
                  </div>

                  {/* Desktop Login Button */}
                  <Link to="/auth/login" className="hidden lg:block">
                    <button className="btn-premium">
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <Motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer relative"
                  >
                    <div className="avatar">
                      <div className="w-11 h-11 rounded-full overflow-hidden ring ring-[var(--primary-red)] ring-offset-2 hover:ring-[var(--primary-red-hover)] transition-all duration-300">
                        <img
                          src={
                            user.photoURL || "https://i.ibb.co/9ZQZQZQ/user.png"
                          }
                          alt={user.displayName || "User"}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </Motion.div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        {/* Backdrop overlay - FIXED: Changed z-index from z-10 to z-40 */}
                        <Motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-40"
                          onClick={() => setIsDropdownOpen(false)}
                        />

                        {/* Dropdown menu - FIXED: Changed z-index from z-20 to z-50 */}
                        <Motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-4 w-64 rounded-2xl glass-morphism !p-3 !space-y-1 z-50 border-white/20"
                        >
                          <div className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className="avatar">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
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
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--primary-red)]/10 hover:text-[var(--primary-red)] transition-all"
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
                        </Motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </Motion.nav>

      {/* -------- Mobile Menu (MOVED OUTSIDE NAVBAR) -------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - FIXED: Added z-40 and lg:hidden */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Container - FIXED: Changed from absolute to fixed, adjusted positioning */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className={`fixed ${
                user ? "left-4" : "right-4"
              } top-20 z-50 lg:hidden`}
            >
              {/* Main Grid Container */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-4 w-[280px]">
                {/* User Card (if logged in) */}
                {user && (
                  <Motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 p-3 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-transparent">
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
                  </Motion.div>
                )}

                {/* Grid Navigation */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {navigationItems.map((item, idx) => {
                    if (item.requireAuth && !user) return null;

                    return (
                      <Motion.div
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
                                    isActive ? "text-white" : "text-gray-700"
                                  }
                                />
                              </div>
                              <span
                                className={`text-xs font-bold ${
                                  isActive ? "text-white" : "text-gray-700"
                                }`}
                              >
                                {item.label}
                              </span>
                            </div>
                          )}
                        </NavLink>
                      </Motion.div>
                    );
                  })}
                </div>

                {/* Logout/Login Button */}
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {user ? (
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
                  ) : (
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Login
                      </button>
                    </Link>
                  )}
                </Motion.div>
              </div>

              {/* Floating Arrow Indicator - FIXED: Adjusted position based on user state */}
              <div
                className={`absolute -top-2 ${
                  user ? "left-8" : "right-8"
                } w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200`}
              ></div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
