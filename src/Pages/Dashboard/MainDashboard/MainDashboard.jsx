import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Heart,
  AlertCircle,
  Droplet,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  UserCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdminDashboardFeature from "../AdminDashboardFeature/AdminDashboardFeature";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const [myRecentRequests, setMyRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userRole, setUserRole] = useState(null); // "Admin", "Volunteer", "Donor"
  const [roleLoading, setRoleLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentRequests();
    fetchUserRole();
  }, []);

  const fetchRecentRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/my-recent-requests");
      setMyRecentRequests(response.data);
    } catch (error) {
      console.error("Error fetching recent requests:", error);
      toast.error("Failed to load recent requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = async () => {
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
      setUserRole("Donor"); // fallback to donor
    } finally {
      setRoleLoading(false);
    }
  };

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
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axiosSecure.delete(`/delete-request/${id}`);
        toast.success("Request deleted successfully");
        fetchRecentRequests();
        setActiveDropdown(null);
      } catch (error) {
        console.error("Error deleting request:", error);
        toast.error("Failed to delete request");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-request/${id}`);
  };

  const handleView = (id) => {
    navigate(`/dashboard/view-request/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "inprogress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "done":
        return "bg-green-100 text-green-700 border-green-200";
      case "canceled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-red-600 via-red-500 to-blue-600 rounded-3xl p-8 mb-8 text-white overflow-hidden shadow-2xl"
        >
          {/* Animated Background Particles (Floating Blood Drops) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                initial={{ y: "100%", x: `${i * 20}%` }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.5,
                }}
              >
                <Droplet
                  size={80 + i * 20}
                  fill="currentColor"
                  className="drop-shadow-2xl"
                />
              </motion.div>
            ))}
          </div>

          {/* Glowing Heart Pulse */}
          <div className="absolute top-4 right-8">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-white/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart
                size={60}
                className="text-white drop-shadow-2xl"
                fill="currentColor"
              />
            </motion.div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {/* Avatar + Greeting */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-5"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/40">
                    <Heart size={40} fill="white" />
                  </div>
                  {/* Online Indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg"
                  >
                    <Activity
                      size={14}
                      className="text-white absolute inset-1"
                    />
                  </motion.div>
                </div>

                <div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl lg:text-5xl font-black tracking-tight"
                  >
                    Welcome back,
                    <span className="block text-white/90 text-3xl lg:text-4xl mt-1">
                      {user?.displayName || "Lifesaver"}! ❤️
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/90 text-lg mt-2 font-medium"
                  >
                    You're making the world healthier — one drop at a time.
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Dynamic Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {/* Total Requests Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      Your Requests
                    </p>
                    <p className="text-4xl font-black mt-2">
                      {myRecentRequests.length}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Droplet
                      size={50}
                      className="text-white/70"
                      fill="currentColor"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Online Status Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Status</p>
                    <div className="flex items-center gap-3 mt-3">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-4 h-4 bg-green-400 rounded-full"
                      />
                      <p className="text-2xl font-bold">Active & Ready</p>
                    </div>
                  </div>
                  <Activity size={50} className="text-green-300" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>

        {/* Loading role */}
        {roleLoading && (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Admin / Volunteer Dashboard Feature */}
        {!roleLoading && (userRole === "Admin" || userRole === "Volunteer") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <AdminDashboardFeature />
          </motion.div>
        )}

        {/* Regular Donor Dashboard - Recent Requests */}
        {!roleLoading && userRole === "Donor" && (
          <>
            {/* Recent Requests Section */}
            {myRecentRequests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6"
              >
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <Droplet
                          className="text-white"
                          size={20}
                          fill="currentColor"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Recent Donation Requests
                        </h2>
                        <p className="text-sm text-gray-600">
                          Your latest 3 requests
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
                    />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200">
                          <th className="text-gray-700 font-semibold">#</th>
                          <th className="text-gray-700 font-semibold">
                            Recipient Name
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Recipient Location
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Donation Date
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Donation Time
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Blood Group
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Donation Status
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Donor Information
                          </th>
                          <th className="text-gray-700 font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {myRecentRequests.map((request, index) => (
                          <tr
                            key={request._id}
                            className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                          >
                            <td className="font-semibold text-gray-700">
                              {index + 1}
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <User className="text-gray-400" size={16} />
                                <span className="font-medium text-gray-900">
                                  {request.recipient_name}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <MapPin className="text-gray-400" size={16} />
                                <span className="text-sm text-gray-700">
                                  {request.recipient_district},{" "}
                                  {request.recipient_upazila}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="text-gray-400" size={14} />
                                <span className="text-gray-700">
                                  {request.date}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="text-gray-400" size={14} />
                                <span className="text-gray-700">
                                  {request.time}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold border border-red-200">
                                {request.bloodGroup}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                  request.donation_status
                                )}`}
                              >
                                {request.donation_status}
                              </span>
                            </td>
                            <td>
                              {request.donation_status === "inprogress" ? (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 min-w-[200px]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <UserCheck
                                      className="text-blue-600"
                                      size={14}
                                    />
                                    <span className="font-semibold text-blue-900 text-sm">
                                      {request.requester_name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="text-blue-500" size={12} />
                                    <span className="text-xs text-blue-700">
                                      {request.requester_email}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </td>
                            <td>
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setActiveDropdown(
                                      activeDropdown === request._id
                                        ? null
                                        : request._id
                                    )
                                  }
                                  className="btn btn-ghost btn-sm btn-circle"
                                >
                                  <MoreVertical size={18} />
                                </button>
                                <AnimatePresence>
                                  {activeDropdown === request._id && (
                                    <>
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-10"
                                        onClick={() => setActiveDropdown(null)}
                                      />
                                      <motion.div
                                        initial={{
                                          opacity: 0,
                                          scale: 0.95,
                                          y: -10,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{
                                          opacity: 0,
                                          scale: 0.95,
                                          y: -10,
                                        }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20"
                                      >
                                        {request.donation_status ===
                                          "inprogress" && (
                                          <>
                                            <button
                                              onClick={() =>
                                                handleStatusUpdate(
                                                  request._id,
                                                  "done"
                                                )
                                              }
                                              className="w-full px-4 py-2 text-left hover:bg-green-50 transition-colors flex items-center gap-2 text-green-700 font-medium"
                                            >
                                              <CheckCircle size={16} />
                                              Mark as Done
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleStatusUpdate(
                                                  request._id,
                                                  "canceled"
                                                )
                                              }
                                              className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-700 font-medium"
                                            >
                                              <XCircle size={16} />
                                              Cancel
                                            </button>
                                            <div className="border-t border-gray-200 my-1"></div>
                                          </>
                                        )}
                                        {request.donation_status ===
                                          "pending" && (
                                          <>
                                            <button
                                              onClick={() =>
                                                handleEdit(request._id)
                                              }
                                              className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center gap-2 text-orange-700 font-medium"
                                            >
                                              <Edit size={16} />
                                              Edit
                                            </button>
                                            <div className="border-t border-gray-200 my-1"></div>
                                          </>
                                        )}
                                        <button
                                          onClick={() =>
                                            handleView(request._id)
                                          }
                                          className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 text-blue-700 font-medium"
                                        >
                                          <Eye size={16} />
                                          View Details
                                        </button>
                                        <div className="border-t border-gray-200 my-1"></div>
                                        <button
                                          onClick={() =>
                                            handleDelete(request._id)
                                          }
                                          className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-700 font-medium"
                                        >
                                          <Trash2 size={16} />
                                          Delete
                                        </button>
                                      </motion.div>
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

                {/* View All Requests Button */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <Link to="/dashboard/my-requests">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      View My All Requests
                      <ArrowRight size={20} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {!loading && myRecentRequests.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-gray-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Donation Requests Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't created any donation requests. Start saving lives
                  today!
                </p>
                <Link to="/dashboard/add-request">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg"
                  >
                    Create Your First Request
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
