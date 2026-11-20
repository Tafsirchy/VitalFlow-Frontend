import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Heart,
  Droplet,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  UserCheck,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDashboardFeature from "../AdminDashboardFeature/AdminDashboardFeature";
import CreativeDashboardStats from "../../../Components/Dashboard/CreativeDashboardStats";
import DataAnalysis from "../../../Components/Dashboard/DataAnalysis";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const [myRecentRequests, setMyRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    allRequests: [],
    allDonors: [],
    totalUsers: 0,
    totalFunding: 0,
    bloodTypeDistribution: {},
    requestsByStatus: {},
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchRecentRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/my-recent-requests");
      setMyRecentRequests(response.data);
    } catch (error) {
      console.error("Error fetching recent requests:", error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  const fetchUserRole = useCallback(async () => {
    if (!user?.email) {
      setRoleLoading(false);
      return;
    }
    try {
      setRoleLoading(true);
      const response = await axiosSecure.get(`/donor/role/${user.email}`);
      setUserRole(response.data?.role || "Donor");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole("Donor");
    } finally {
      setRoleLoading(false);
    }
  }, [user?.email, axiosSecure]);

  const fetchDashboardStats = useCallback(async () => {
    try {
      const [allRequestsRes, allDonorsRes, totalFundingRes] = await Promise.all([
        axiosSecure.get("/all-requests?size=1000&page=0"),
        axiosSecure.get("/donor"),
        axiosSecure.get("/total-funding"),
      ]);

      const allRequests = allRequestsRes.data.request || [];
      const allDonors = allDonorsRes.data || [];
      const funding = totalFundingRes.data || {};

      const bloodTypes = {};
      allDonors.forEach((donor) => {
        const bloodType = donor.blood || donor.bloodGroup;
        if (bloodType) {
          bloodTypes[bloodType] = (bloodTypes[bloodType] || 0) + 1;
        }
      });

      const statusCount = {
        pending: allRequests.filter((r) => r.donation_status === "pending").length,
        inprogress: allRequests.filter((r) => r.donation_status === "inprogress").length,
        done: allRequests.filter((r) => r.donation_status === "done").length,
        canceled: allRequests.filter((r) => r.donation_status === "canceled").length,
      };

      setDashboardStats({
        allRequests,
        allDonors,
        totalUsers: allDonors.length,
        totalFunding: funding.totalAmount || 0,
        bloodTypeDistribution: bloodTypes,
        requestsByStatus: statusCount,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchRecentRequests();
    fetchUserRole();
  }, [fetchRecentRequests, fetchUserRole]);

  useEffect(() => {
    if (userRole === "Admin" || userRole === "Volunteer") {
      fetchDashboardStats();
    }
  }, [userRole, fetchDashboardStats]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/update-donation-status/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchRecentRequests();
      setActiveDropdown(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation request?")) {
      try {
        await axiosSecure.delete(`/delete-request/${id}`);
        toast.success("Request removed successfully");
        fetchRecentRequests();
        setActiveDropdown(null);
      } catch (error) {
        console.error("Error deleting request:", error);
        toast.error("Failed to delete request");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "inprogress":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case "done":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
      case "canceled":
        return "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="space-y-5">
      {/* Symmetrical Member Welcome Hero */}
      <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[var(--primary-red)]/30 shrink-0">
              <img
                src={user?.photoURL || "https://ui-avatars.com/api/?name=User&size=100&background=C62828&color=fff"}
                alt={user?.displayName || "Member"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-[var(--primary-red)] text-[11px] font-bold uppercase tracking-wider mb-0.5">
                <ShieldCheck size={12} />
                <span>{userRole || "Voluntary Donor"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Welcome back, {user?.displayName || "Member"}
              </h1>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Connected to Bangladesh's 24/7 voluntary emergency blood network.
              </p>
            </div>
          </div>

          {userRole === "Donor" && (
            <Link
              to="/dashboard/add-request"
              className="btn-premium !px-4 !py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/20 shrink-0"
            >
              <Plus size={15} />
              <span>Create Blood Request</span>
            </Link>
          )}
        </div>
      </div>

      {/* Role Loading */}
      {roleLoading && (
        <div className="py-12 text-center">
          <div className="w-10 h-10 rounded-full border-4 border-[var(--primary-red)]/20 border-t-[var(--primary-red)] animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Loading Dashboard...
          </p>
        </div>
      )}

      {/* Admin / Volunteer View */}
      {!roleLoading && (userRole === "Admin" || userRole === "Volunteer") && (
        <div className="space-y-5">
          <AdminDashboardFeature />
          <CreativeDashboardStats
            requests={dashboardStats.allRequests}
            bloodStats={dashboardStats.bloodTypeDistribution}
          />
          <DataAnalysis
            requests={dashboardStats.allRequests}
            totalUsers={dashboardStats.totalUsers}
          />
        </div>
      )}

      {/* Donor Recent Requests View */}
      {!roleLoading && userRole === "Donor" && (
        <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-light)]">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[var(--text-primary)]">
                My Recent Blood Requests
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Active donation directives requested from your account.
              </p>
            </div>
            <Link
              to="/dashboard/my-requests"
              className="text-xs font-bold text-[var(--primary-red)] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 rounded-full border-4 border-[var(--primary-red)]/20 border-t-[var(--primary-red)] animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-[var(--text-muted)]">Loading recent requests...</p>
            </div>
          ) : myRecentRequests.length === 0 ? (
            <div className="py-16 text-center text-[var(--text-muted)]">
              <Droplet size={36} className="mx-auto mb-3 opacity-30 text-[var(--primary-red)]" fill="currentColor" />
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">No Active Blood Requests</h3>
              <p className="text-xs max-w-sm mx-auto mb-6">
                When you or your relatives need blood, create a verified request here.
              </p>
              <Link
                to="/dashboard/add-request"
                className="btn-premium !px-6 !py-3 text-xs font-bold inline-flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Create Blood Request</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[var(--background-main)]/60 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-light)]">
                    <th className="px-3.5 py-2.5">Patient</th>
                    <th className="px-3.5 py-2.5">Blood Group</th>
                    <th className="px-3.5 py-2.5">Hospital & Location</th>
                    <th className="px-3.5 py-2.5">Schedule</th>
                    <th className="px-3.5 py-2.5">Status</th>
                    <th className="px-3.5 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)]">
                  {myRecentRequests.map((req) => (
                    <tr key={req._id} className="hover:bg-[var(--background-main)]/40 transition-colors">
                      <td className="px-3.5 py-2.5 font-bold text-[var(--text-primary)]">
                        {req.recipient_name}
                      </td>
                      <td className="px-3.5 py-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-black text-xs">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-xs">
                        <div className="font-semibold text-[var(--text-primary)]">{req.hospital}</div>
                        <div className="text-[var(--text-muted)]">{req.recipient_district}, {req.recipient_upazila}</div>
                      </td>
                      <td className="px-3.5 py-2.5 text-xs font-medium text-[var(--text-secondary)]">
                        {req.date} ({req.time})
                      </td>
                      <td className="px-3.5 py-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(req.donation_status)}`}>
                          {req.donation_status === "inprogress" ? "In Progress" : req.donation_status}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === req._id ? null : req._id)}
                            className="p-2 rounded-lg hover:bg-[var(--background-main)] text-[var(--text-muted)] transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === req._id && (
                              <>
                                <div
                                  className="fixed inset-0 z-40"
                                  onClick={() => setActiveDropdown(null)}
                                />
                                <Motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="absolute right-0 mt-2 w-48 bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl shadow-xl p-2 z-50 text-xs font-bold space-y-1 text-left"
                                >
                                  {req.donation_status === "inprogress" && (
                                    <>
                                      <button
                                        onClick={() => handleStatusUpdate(req._id, "done")}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-emerald-500/10 text-emerald-600 transition-colors"
                                      >
                                        <CheckCircle size={14} />
                                        <span>Mark as Done</span>
                                      </button>
                                      <button
                                        onClick={() => handleStatusUpdate(req._id, "canceled")}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-600 transition-colors"
                                      >
                                        <XCircle size={14} />
                                        <span>Cancel Request</span>
                                      </button>
                                      <div className="h-px bg-[var(--border-light)] my-1" />
                                    </>
                                  )}

                                  <button
                                    onClick={() => navigate(`/donation-details/${req._id}`)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[var(--background-main)] text-[var(--text-primary)] transition-colors"
                                  >
                                    <Eye size={14} />
                                    <span>View Details</span>
                                  </button>

                                  <button
                                    onClick={() => handleDelete(req._id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-600 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete</span>
                                  </button>
                                </Motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainDashboard;
