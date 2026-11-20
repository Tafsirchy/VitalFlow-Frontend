import { useNavigate, Link, Outlet } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import logo from "../assets/image.png";
import ThemeToggle from "../Components/ThemeToggle";
import Aside from "../Components/Aside/Aside";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  Activity,
  Heart,
  ChevronDown
} from "lucide-react";

const DashboardLayout = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isLikelyLoggedIn = typeof window !== "undefined" && localStorage.getItem("vitalflow-is-logged-in") === "true";

  const handleLogOut = () => {
    setIsDropdownOpen(false);
    logOut()
      .then(() => {
        toast.success("Signed out successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background-main)] text-[var(--text-primary)]">
      {/* Dashboard Topbar */}
      <header className="fixed top-0 left-0 w-full z-[60] bg-[var(--background-card)] border-b border-[var(--border-light)] shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center p-1.5 border border-red-500/20">
                <img
                  src={logo}
                  alt="VitalFlow Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-black text-gradient-crimson leading-none">
                  VitalFlow
                </h1>
                <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase mt-0.5">
                  Member Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Right Tools & User Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />

            {loading ? (
              isLikelyLoggedIn ? (
                <div className="w-10 h-10 rounded-full bg-[var(--background-main)] animate-pulse" />
              ) : (
                <div className="w-24 h-10 rounded-xl bg-[var(--background-main)] animate-pulse hidden sm:block" />
              )
            ) : user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-[var(--background-main)] transition-all cursor-pointer group"
                >
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                      {user.displayName || "Member"}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--primary-red)]">
                      Verified Account
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-red)]/30 group-hover:border-[var(--primary-red)] transition-all">
                    <img
                      src={user.photoURL || "https://ui-avatars.com/api/?name=User&size=100&background=C62828&color=fff"}
                      alt={user.displayName || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown size={14} className="text-[var(--text-muted)] hidden sm:block" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <Motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-64 rounded-3xl bg-[var(--background-card)] border border-[var(--border-light)] p-3 shadow-2xl z-50 space-y-1"
                      >
                        <div className="p-3">
                          <p className="font-bold text-sm text-[var(--text-primary)] truncate">
                            {user.displayName || "Member"}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="h-px bg-[var(--border-light)] my-1" />

                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] transition-all"
                        >
                          <LayoutDashboard size={16} className="text-[var(--primary-red)]" />
                          <span>Dashboard Overview</span>
                        </Link>

                        <Link
                          to="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] transition-all"
                        >
                          <Settings size={16} className="text-[var(--primary-red)]" />
                          <span>Profile & Settings</span>
                        </Link>

                        <div className="h-px bg-[var(--border-light)] my-1" />

                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 text-red-600 transition-all font-bold text-xs uppercase tracking-wider"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </Motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        <Aside />

        {/* Space Reserver for Desktop Sidebar */}
        <div className="hidden lg:block shrink-0 w-80" aria-hidden="true" />

        <main className="flex-1 min-w-0 flex flex-col p-3.5 sm:p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
