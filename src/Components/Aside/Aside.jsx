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
  Home,
  ShieldCheck,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Aside = () => {
  const { role, user, logOut } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed out successfully");
        navigate("/");
      })
      .catch((error) => toast.error(error));
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
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[80] w-14 h-14 flex items-center justify-center bg-[var(--primary-red)] text-white rounded-full shadow-2xl"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-16 left-0 z-40 w-80 h-[calc(100vh-64px)]
          flex flex-col bg-[var(--background-card)] border-r border-[var(--border-light)]
          transition-transform duration-300 lg:translate-x-0
          ${isMobile ? (isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full") : ""}
        `}
      >
        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <NavItem
            to="/dashboard"
            icon={LayoutDashboard}
            label="Overview"
            isMobile={isMobile}
            closeSidebar={setIsSidebarOpen}
            end={true}
          />

          <NavItem
            to="/dashboard/profile"
            icon={Settings}
            label="My Profile"
            isMobile={isMobile}
            closeSidebar={setIsSidebarOpen}
          />

          {role === "Donor" && (
            <>
              <NavItem
                to="/dashboard/add-request"
                icon={Plus}
                label="Create Request"
                isMobile={isMobile}
                closeSidebar={setIsSidebarOpen}
              />

              <NavItem
                to="/dashboard/my-requests"
                icon={Package}
                label="My Requests"
                isMobile={isMobile}
                closeSidebar={setIsSidebarOpen}
              />
            </>
          )}

          {role === "Admin" && (
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

        {/* Footer User Info & Actions */}
        <div className="p-4 border-t border-[var(--border-light)] bg-[var(--background-main)]/50 space-y-4">
          {/* Member Card */}
          <div className="p-4 rounded-2xl bg-[var(--background-card)] border border-[var(--border-light)] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-red-500/20 shrink-0">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "Member"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[var(--primary-red)] text-white w-full h-full flex items-center justify-center font-bold">
                  {user?.displayName?.charAt(0) || "M"}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                {user?.displayName || "Member"}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                <ShieldCheck size={12} />
                <span>{role || "Verified Donor"}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[var(--background-card)] border border-[var(--border-light)] hover:border-[var(--primary-red)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--primary-red)] transition-all"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>

            <button
              onClick={handleLogOut}
              className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[var(--background-card)] border border-[var(--border-light)] hover:border-red-500 text-xs font-bold text-[var(--text-secondary)] hover:text-red-600 transition-all"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;

const NavItem = ({ to, icon: Icon, label, isMobile, closeSidebar, end = false }) => (
  <NavLink
    to={to}
    end={end}
    onClick={() => isMobile && closeSidebar(false)}
    className={({ isActive }) => `
      flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
      ${
        isActive
          ? "bg-[var(--primary-red)] text-white shadow-md shadow-red-600/20"
          : "text-[var(--text-secondary)] hover:bg-[var(--background-main)] hover:text-[var(--text-primary)]"
      }
    `}
  >
    <Icon size={16} />
    <span>{label}</span>
  </NavLink>
);
