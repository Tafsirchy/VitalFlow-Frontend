import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Droplet,
  ChevronLeft,
  ChevronRight,
  Activity,
  TrendingUp,
  Filter,
} from "lucide-react";
import { toast } from "react-toastify";

const MyRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, [currentPage, itemsPerPage]);

  const fetchRequests = () => {
    setLoading(true);
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.error("Failed to fetch requests:", error);
        toast.error("Failed to load requests");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await axiosSecure.patch(
        `/update-donation-status/${id}`,
        { status: status }
      );

      if (response.data) {
        setMyRequest((prevRequests) =>
          prevRequests.map((req) =>
            req._id === id ? { ...req, donation_status: status } : req
          )
        );
        toast.success(`Status updated to ${status}`);
        setActiveDropdown(null);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    try {
      const response = await axiosSecure.delete(`/delete-request/${id}`);

      if (response.data) {
        setMyRequest((prevRequests) =>
          prevRequests.filter((req) => req._id !== id)
        );
        setTotalRequest((prev) => prev - 1);
        toast.success("Request deleted successfully");
        setActiveDropdown(null);
      }
    } catch (error) {
      console.error("Failed to delete request:", error);
      toast.error("Failed to delete request");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-request/${id}`);
    setActiveDropdown(null);
  };

  const handleViewDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "inprogress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "done":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "canceled":
        return "bg-rose-100 text-rose-700 border-rose-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(numberOfPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return pages.slice(startPage - 1, endPage);
  };

  // Calculate statistics
  const stats = {
    pending: myRequest.filter((r) => r.donation_status === "pending").length,
    inprogress: myRequest.filter((r) => r.donation_status === "inprogress")
      .length,
    done: myRequest.filter((r) => r.donation_status === "done").length,
    canceled: myRequest.filter((r) => r.donation_status === "canceled").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-blue-50/20 py-6 sm:py-8 lg:py-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-red-400 to-pink-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-white via-white to-red-50/30 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-xl mb-6 sm:mb-8"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Top section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 via-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                    <Droplet
                      className="text-white"
                      size={32}
                      fill="currentColor"
                    />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-red-500 rounded-2xl blur-xl opacity-50"
                  />
                </motion.div>

                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 mb-2">
                    My Donation Requests
                  </h1>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Activity size={16} className="text-red-500" />
                    <span className="font-semibold text-sm sm:text-base">
                      Total{" "}
                      <span className="text-red-600 font-bold">
                        {totalRequest}
                      </span>{" "}
                      active requests
                    </span>
                  </div>
                </div>
              </div>

              {/* Items per page selector */}
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200 shadow-lg">
                <Filter size={18} className="text-gray-500" />
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none outline-none font-semibold text-gray-700 cursor-pointer text-sm"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-700 text-xs sm:text-sm font-bold uppercase tracking-wide">
                    Pending
                  </span>
                  <Clock size={16} className="text-amber-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-700">
                  {stats.pending}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wide">
                    In Progress
                  </span>
                  <TrendingUp size={16} className="text-blue-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-blue-700">
                  {stats.inprogress}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-wide">
                    Completed
                  </span>
                  <CheckCircle size={16} className="text-emerald-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-700">
                  {stats.done}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl p-4 border border-rose-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-rose-700 text-xs sm:text-sm font-bold uppercase tracking-wide">
                    Canceled
                  </span>
                  <XCircle size={16} className="text-rose-500" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-rose-700">
                  {stats.canceled}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="relative w-16 h-16 mb-6"
              >
                <div className="absolute inset-0 border-4 border-red-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full" />
              </motion.div>
              <p className="text-gray-600 font-semibold">
                Loading your requests...
              </p>
            </div>
          ) : myRequest.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Droplet className="text-gray-400" size={48} />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Requests Found
              </h3>
              <p className="text-gray-600">
                You haven't created any donation requests yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-gray-800 font-bold text-sm">#</th>
                    <th className="text-gray-800 font-bold text-sm">
                      Recipient
                    </th>
                    <th className="text-gray-800 font-bold text-sm">
                      Location
                    </th>
                    <th className="text-gray-800 font-bold text-sm">
                      Schedule
                    </th>
                    <th className="text-gray-800 font-bold text-sm">Blood</th>
                    <th className="text-gray-800 font-bold text-sm">Status</th>
                    <th className="text-gray-800 font-bold text-sm">
                      Donor Info
                    </th>
                    <th className="text-gray-800 font-bold text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {myRequest.map((request, index) => (
                    <motion.tr
                      key={request._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all border-b border-gray-100"
                    >
                      <td className="font-bold text-gray-700">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs">
                            {request.recipient_name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {request.recipient_name}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <MapPin className="text-gray-400" size={14} />
                          <span className="text-sm text-gray-700">
                            {request.recipient_district},{" "}
                            {request.recipient_upazila}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="text-gray-400" size={12} />
                            <span className="text-gray-700">
                              {request.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="text-gray-400" size={12} />
                            <span className="text-gray-700">
                              {request.time}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full text-xs font-black shadow-sm">
                          {request.bloodGroup}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(
                            request.donation_status
                          )}`}
                        >
                          {request.donation_status}
                        </span>
                      </td>

                      <td>
                        {request.donation_status === "inprogress" ? (
                          <div className="space-y-1">
                            <p className="font-bold text-gray-900 text-sm">
                              {request.requester_name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {request.requester_email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-semibold">—</span>
                        )}
                      </td>

                      <td>
                        <div className="relative">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === request._id
                                  ? null
                                  : request._id
                              )
                            }
                            className="btn btn-ghost btn-sm btn-circle hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50"
                          >
                            <MoreVertical size={18} />
                          </motion.button>

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
                                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-20 overflow-hidden"
                                >
                                  {request.donation_status === "inprogress" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            request._id,
                                            "done"
                                          )
                                        }
                                        className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-3 text-emerald-700 font-bold text-sm"
                                      >
                                        <CheckCircle size={18} />
                                        Mark as Done
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            request._id,
                                            "canceled"
                                          )
                                        }
                                        className="w-full px-4 py-3 text-left hover:bg-rose-50 transition-colors flex items-center gap-3 text-rose-700 font-bold text-sm"
                                      >
                                        <XCircle size={18} />
                                        Cancel Request
                                      </button>
                                      <div className="border-t-2 border-gray-100 my-1"></div>
                                    </>
                                  )}

                                  {request.donation_status === "pending" && (
                                    <>
                                      <button
                                        onClick={() => handleEdit(request._id)}
                                        className="w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors flex items-center gap-3 text-amber-700 font-bold text-sm"
                                      >
                                        <Edit size={18} />
                                        Edit Request
                                      </button>
                                      <div className="border-t-2 border-gray-100 my-1"></div>
                                    </>
                                  )}

                                  <button
                                    onClick={() =>
                                      handleViewDetails(request._id)
                                    }
                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-blue-700 font-bold text-sm"
                                  >
                                    <Eye size={18} />
                                    View Details
                                  </button>

                                  <div className="border-t-2 border-gray-100 my-1"></div>

                                  <button
                                    onClick={() => handleDelete(request._id)}
                                    className="w-full px-4 py-3 text-left hover:bg-rose-50 transition-colors flex items-center gap-3 text-rose-700 font-bold text-sm"
                                  >
                                    <Trash2 size={18} />
                                    Delete Request
                                  </button>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {!loading && myRequest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-red-500 rounded-xl font-bold text-gray-700 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </motion.button>

              {currentPage > 3 && numberOfPages > 5 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-red-500 rounded-xl font-bold text-gray-700 hover:text-red-600 transition-all shadow-sm"
                  >
                    1
                  </motion.button>
                  {currentPage > 4 && (
                    <span className="px-2 text-gray-400 font-bold">...</span>
                  )}
                </>
              )}

              {getPageNumbers().map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl font-bold transition-all shadow-sm ${
                    page === currentPage
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white border-2 border-transparent shadow-lg shadow-red-500/30"
                      : "bg-white border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </motion.button>
              ))}

              {currentPage < numberOfPages - 2 && numberOfPages > 5 && (
                <>
                  {currentPage < numberOfPages - 3 && (
                    <span className="px-2 text-gray-400 font-bold">...</span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(numberOfPages)}
                    className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-red-500 rounded-xl font-bold text-gray-700 hover:text-red-600 transition-all shadow-sm"
                  >
                    {numberOfPages}
                  </motion.button>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentPage === numberOfPages}
                className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-red-500 rounded-xl font-bold text-gray-700 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-xl border-2 border-gray-200 shadow-sm">
              <p className="text-gray-700 font-semibold text-sm">
                Showing{" "}
                <span className="text-red-600">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="text-red-600">
                  {Math.min(currentPage * itemsPerPage, totalRequest)}
                </span>{" "}
                of <span className="text-red-600">{totalRequest}</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyRequest;
