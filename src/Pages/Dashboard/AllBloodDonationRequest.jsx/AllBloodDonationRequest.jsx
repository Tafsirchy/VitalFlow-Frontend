import React, { useContext, useEffect, useState } from "react";
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
  Filter,
  Mail,
  UserCheck,
  Activity,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllBloodDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [totalRequest, setTotalRequest] = useState(0);
  const [allRequests, setAllRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [userRole, setUserRole] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserRole();
  }, [user]);

  useEffect(() => {
    if (userRole) {
      fetchRequests();
    }
  }, [currentPage, itemsPerPage, filterStatus, userRole]);

  const fetchUserRole = async () => {
    if (user?.email) {
      try {
        const response = await axiosSecure.get(`/donor/role/${user.email}`);
        setUserRole(response.data?.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    }
  };

  const fetchRequests = () => {
    setLoading(true);
    axiosSecure
      .get(
        `/all-requests?page=${
          currentPage - 1
        }&size=${itemsPerPage}&filter=${filterStatus}`
      )
      .then((res) => {
        setAllRequests(res.data.request);
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
        setAllRequests((prevRequests) =>
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
    if (userRole !== "Admin") {
      toast.error("Only admins can delete requests");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    try {
      const response = await axiosSecure.delete(`/admin/delete-request/${id}`);

      if (response.data) {
        setAllRequests((prevRequests) =>
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
    if (userRole !== "Admin") {
      toast.error("Only admins can edit requests");
      return;
    }
    navigate(`/dashboard/edit-request/${id}`);
    setActiveDropdown(null);
  };

  const handleView = (id) => {
    if (userRole !== "Admin") {
      toast.error("Only admins can view details");
      return;
    }
    navigate(`/donation-details/${id}`);
    setActiveDropdown(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-300";
      case "inprogress":
        return "bg-blue-50 text-blue-700 border-blue-300";
      case "done":
        return "bg-emerald-50 text-emerald-700 border-emerald-300";
      case "canceled":
        return "bg-rose-50 text-rose-700 border-rose-300";
      default:
        return "bg-gray-50 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle size={12} className="animate-pulse" />;
      case "inprogress":
        return <Activity size={12} className="animate-pulse" />;
      case "done":
        return <CheckCircle size={12} />;
      case "canceled":
        return <XCircle size={12} />;
      default:
        return null;
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

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const isAdmin = userRole === "Admin";
  const isVolunteer = userRole === "Volunteer";

  const getStatusCount = () => {
    const counts = {
      all: totalRequest,
      pending: 0,
      inprogress: 0,
      done: 0,
      canceled: 0,
    };
    allRequests.forEach((req) => {
      if (counts[req.donation_status] !== undefined) {
        counts[req.donation_status]++;
      }
    });
    return counts;
  };

  const statusCounts = getStatusCount();

  return (
    <div className="bg-gradient-to-br from-rose-50 via-red-50 to-orange-50">
      <div className="py-8 px-5">
        <div className="">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
            />
          </div>

          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />

            <div className="relative">
              <div className="flex items-start justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-red-600 via-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30"
                  >
                    <Droplet
                      className="text-white"
                      size={32}
                      fill="currentColor"
                    />
                  </motion.div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Blood Donation Requests
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2 flex-wrap">
                      {isVolunteer && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
                          Volunteer Access
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-green-500 rounded-full"
                        />
                        Managing {totalRequest} total requests
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <Filter
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <select
                      value={filterStatus}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className="pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none cursor-pointer font-medium text-gray-700 hover:border-gray-300"
                    >
                      <option value="all">
                        All Status ({statusCounts.all})
                      </option>
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </motion.div>

                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none cursor-pointer font-medium text-gray-700 hover:border-gray-300"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </motion.select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Table Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mb-4"
                />
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-gray-600 font-medium"
                >
                  Loading requests...
                </motion.p>
              </div>
            ) : allRequests.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32"
              >
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
                <p className="text-gray-600 text-lg">
                  {filterStatus !== "all"
                    ? `No ${filterStatus} requests available at this time.`
                    : "No donation requests available at the moment."}
                </p>
              </motion.div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Requester
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Location
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Blood
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="text-gray-700 font-bold py-4 text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {allRequests.map((request, index) => (
                        <motion.tr
                          key={request._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-blue-50/50 transition-all duration-300 group"
                        >
                          <td className="font-bold text-gray-700 py-4">
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="w-8 h-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center text-sm"
                            >
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </motion.div>
                          </td>

                          <td className="py-4">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="space-y-1"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                  <User className="text-white" size={16} />
                                </div>
                                <span className="font-semibold text-gray-900">
                                  {request.requester_name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 ml-10">
                                <Mail className="text-gray-400" size={12} />
                                <span className="text-xs text-gray-600">
                                  {request.requester_email}
                                </span>
                              </div>
                            </motion.div>
                          </td>

                          <td className="py-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 w-fit"
                            >
                              <User className="text-purple-600" size={16} />
                              <span className="font-semibold text-gray-900">
                                {request.recipient_name}
                              </span>
                            </motion.div>
                          </td>

                          <td className="py-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 w-fit"
                            >
                              <MapPin className="text-green-600" size={16} />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {request.recipient_district}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {request.recipient_upazila}
                                </div>
                              </div>
                            </motion.div>
                          </td>

                          <td className="py-4">
                            <div className="space-y-2">
                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2 text-sm px-2 py-1 bg-orange-50 rounded-lg border border-orange-100"
                              >
                                <Calendar
                                  className="text-orange-600"
                                  size={14}
                                />
                                <span className="text-gray-700 font-medium">
                                  {request.date}
                                </span>
                              </motion.div>
                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2 text-sm px-2 py-1 bg-blue-50 rounded-lg border border-blue-100"
                              >
                                <Clock className="text-blue-600" size={14} />
                                <span className="text-gray-700 font-medium">
                                  {request.time}
                                </span>
                              </motion.div>
                            </div>
                          </td>

                          <td className="py-4">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="px-4 py-2 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-xl text-base font-bold shadow-lg shadow-red-500/30 border-2 border-red-300 w-fit"
                            >
                              {request.bloodGroup}
                            </motion.div>
                          </td>

                          <td className="py-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className={`px-3 py-2 rounded-xl text-xs font-bold border-2 inline-flex items-center gap-2 ${getStatusColor(
                                request.donation_status
                              )}`}
                            >
                              {getStatusIcon(request.donation_status)}
                              <span className="uppercase tracking-wide">
                                {request.donation_status}
                              </span>
                            </motion.div>
                          </td>

                          <td className="py-4">
                            {request.donation_status === "inprogress" ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-3 min-w-[200px] shadow-md"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <UserCheck
                                      className="text-white"
                                      size={12}
                                    />
                                  </div>
                                  <span className="font-bold text-blue-900 text-sm">
                                    {request.requester_name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 ml-8">
                                  <Mail className="text-blue-500" size={12} />
                                  <span className="text-xs text-blue-700 font-medium">
                                    {request.requester_email}
                                  </span>
                                </div>
                              </motion.div>
                            ) : (
                              <span className="text-gray-400 text-2xl">—</span>
                            )}
                          </td>

                          <td className="py-4">
                            <div className="relative">
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  setActiveDropdown(
                                    activeDropdown === request._id
                                      ? null
                                      : request._id
                                  )
                                }
                                className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-100 hover:to-pink-100 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-red-300"
                              >
                                <MoreVertical
                                  size={18}
                                  className="text-gray-700"
                                />
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
                                      initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        y: -10,
                                      }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-gray-200 py-2 z-20 overflow-hidden"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-blue-50/50 pointer-events-none" />

                                      {request.donation_status ===
                                        "inprogress" && (
                                        <>
                                          <motion.button
                                            whileHover={{ x: 5 }}
                                            onClick={() =>
                                              handleStatusUpdate(
                                                request._id,
                                                "done"
                                              )
                                            }
                                            className="relative w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all flex items-center gap-3 text-green-700 font-semibold group"
                                          >
                                            <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                                              <CheckCircle size={16} />
                                            </div>
                                            Mark as Done
                                          </motion.button>
                                          <motion.button
                                            whileHover={{ x: 5 }}
                                            onClick={() =>
                                              handleStatusUpdate(
                                                request._id,
                                                "canceled"
                                              )
                                            }
                                            className="relative w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all flex items-center gap-3 text-red-700 font-semibold group"
                                          >
                                            <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                                              <XCircle size={16} />
                                            </div>
                                            Cancel
                                          </motion.button>
                                          <div className="border-t-2 border-gray-200 my-2 mx-2"></div>
                                        </>
                                      )}

                                      {isAdmin && (
                                        <>
                                          {request.donation_status ===
                                            "pending" && (
                                            <>
                                              <motion.button
                                                whileHover={{ x: 5 }}
                                                onClick={() =>
                                                  handleEdit(request._id)
                                                }
                                                className="relative w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all flex items-center gap-3 text-orange-700 font-semibold group"
                                              >
                                                <div className="w-8 h-8 bg-orange-100 group-hover:bg-orange-200 rounded-lg flex items-center justify-center transition-colors">
                                                  <Edit size={16} />
                                                </div>
                                                Edit
                                              </motion.button>
                                              <div className="border-t-2 border-gray-200 my-2 mx-2"></div>
                                            </>
                                          )}

                                          <motion.button
                                            whileHover={{ x: 5 }}
                                            onClick={() =>
                                              handleView(request._id)
                                            }
                                            className="relative w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all flex items-center gap-3 text-blue-700 font-semibold group"
                                          >
                                            <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                                              <Eye size={16} />
                                            </div>
                                            View Details
                                          </motion.button>

                                          <div className="border-t-2 border-gray-200 my-2 mx-2"></div>

                                          <motion.button
                                            whileHover={{ x: 5 }}
                                            onClick={() =>
                                              handleDelete(request._id)
                                            }
                                            className="relative w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all flex items-center gap-3 text-red-700 font-semibold group"
                                          >
                                            <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                                              <Trash2 size={16} />
                                            </div>
                                            Delete
                                          </motion.button>
                                        </>
                                      )}

                                      {isVolunteer && (
                                        <div className="px-4 py-3 text-xs text-gray-500 italic bg-gray-50 rounded-lg mx-2">
                                          Limited volunteer access
                                        </div>
                                      )}
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {!loading && allRequests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex justify-center items-center gap-2 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-5 py-2.5 bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:border-red-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 transition-all font-semibold text-gray-700 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <ChevronLeft size={18} />
                Previous
              </motion.button>

              {currentPage > 3 && numberOfPages > 5 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(1)}
                    className="w-11 h-11 bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 transition-all font-bold text-gray-700 shadow-lg hover:shadow-xl"
                  >
                    1
                  </motion.button>
                  {currentPage > 4 && (
                    <span className="px-2 text-gray-400 font-bold text-lg">
                      ⋯
                    </span>
                  )}
                </>
              )}

              {getPageNumbers().map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: page === currentPage ? 1 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl transition-all font-bold shadow-lg hover:shadow-xl ${
                    page === currentPage
                      ? "bg-gradient-to-br from-red-600 via-rose-500 to-pink-600 text-white border-2 border-red-400 shadow-red-500/40 scale-110"
                      : "bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 hover:border-red-300"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </motion.button>
              ))}

              {currentPage < numberOfPages - 2 && numberOfPages > 5 && (
                <>
                  {currentPage < numberOfPages - 3 && (
                    <span className="px-2 text-gray-400 font-bold text-lg">
                      ⋯
                    </span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(numberOfPages)}
                    className="w-11 h-11 bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:border-gray-400 transition-all font-bold text-gray-700 shadow-lg hover:shadow-xl"
                  >
                    {numberOfPages}
                  </motion.button>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentPage === numberOfPages}
                className="px-5 py-2.5 bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-blue-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 transition-all font-semibold text-gray-700 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Next
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* Pagination Info */}
          {!loading && allRequests.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-6"
            >
              <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
                <p className="text-gray-600 font-medium">
                  Showing{" "}
                  <span className="text-red-600 font-bold">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-red-600 font-bold">
                    {Math.min(currentPage * itemsPerPage, totalRequest)}
                  </span>{" "}
                  of{" "}
                  <span className="text-red-600 font-bold">{totalRequest}</span>{" "}
                  requests
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
