import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Package,
  Plus,
  Menu,
  X,
  Droplet,
  Activity,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/image.png";
import { toast } from "react-toastify";

/* =========================
   Reusable NavItem Component
========================= */

/* =========================
   Main Aside Component
========================= */
const Aside = () => {
  const { role, user, logOut } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-circle btn-error shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -320 } : { x: 0 }}
        animate={{
          x: isMobile ? (isSidebarOpen ? 0 : -320) : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80
          h-screen
          flex flex-col
          bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 backdrop-blur-xl
          border-r border-gray-200/50 shadow-2xl
        `}
      >
        {/* Logo Section with Animation */}
        <div className="px-6 py-6 border-b border-gray-200/50 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          <div className="flex items-center gap-3 relative z-10">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center p-1">
                <img
                  src={logo}
                  alt="VitalFlow Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
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
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-transparent">
          <NavItem
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            isMobile={isMobile}
            closeSidebar={setIsSidebarOpen}
          />

          {role === "Donor" && (
            <>
              <NavItem
                to="/dashboard/add-request"
                icon={Plus}
                label="Add Request"
                isMobile={isMobile}
                closeSidebar={setIsSidebarOpen}
              />

              <NavItem
                to="/dashboard/my-requests"
                icon={Package} // or Droplet
                label="My Requests"
                isMobile={isMobile}
                closeSidebar={setIsSidebarOpen}
              />
            </>
          )}

          {role !== "Donor" && (
            <NavItem
              to="/dashboard/all-users"
              icon={Users}
              label="All Users"
              isMobile={isMobile}
              closeSidebar={setIsSidebarOpen}
            />
          )}
          {(role === "Admin" || role === "Volunteer") && (
            <NavItem
              to="/dashboard/all-blood-donation-request"
              icon={Droplet}
              label="All Blood Requests"
              isMobile={isMobile}
              closeSidebar={setIsSidebarOpen}
            />
          )}
        </nav>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-gray-200/50 space-y-3 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm">
          {/* User Info Card */}
          <motion.div
            className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card-body p-4">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-white/30 ring-offset-2 ring-offset-blue-500">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user?.displayName || "User"}
                        className="object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.classList.add("placeholder");
                          e.target.parentElement.innerHTML = `<div class="bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm"><span class="text-lg font-bold">${
                            user?.displayName?.charAt(0) || "G"
                          }</span></div>`;
                        }}
                      />
                    ) : (
                      <div className="bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-lg font-bold">
                          {user?.displayName?.charAt(0) || "G"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">
                    {user?.displayName || "Guest User"}
                  </p>
                  <p className="text-xs opacity-90 truncate">
                    {user?.email || "guest@example.com"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogOut}
            className="btn btn-outline btn-error w-full gap-2 hover:btn-error group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} className="group-hover:animate-bounce" />
            <span className="font-semibold">Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Aside;

const NavItem = ({ to, icon: Icon, label, isMobile, closeSidebar }) => (
  <NavLink
    to={to}
    onClick={() => isMobile && closeSidebar(false)}
    className="block"
  >
    {({ isActive }) => (
      <motion.div
        whileHover={{ scale: 1.03, x: 5 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-3 px-4 py-3.5 rounded-2xl
          transition-all duration-300 relative overflow-hidden
          ${
            isActive
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
              : "text-gray-700 hover:bg-white/60 backdrop-blur-sm"
          }
        `}
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <div className={`relative z-10 ${isActive ? "animate-pulse" : ""}`}>
          <Icon size={20} />
        </div>
        <span className="font-semibold relative z-10">{label}</span>

        {isActive && (
          <motion.div
            className="ml-auto"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        )}
      </motion.div>
    )}
  </NavLink>
);
