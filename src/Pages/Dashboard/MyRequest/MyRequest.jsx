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

  // Get page numbers to display (show max 5 pages at a time)
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

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Droplet className="text-white" size={24} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Donation Requests
                </h1>
                <p className="text-gray-600 text-sm">
                  Total {totalRequest} requests
                </p>
              </div>
            </div>

            {/* Items per page selector */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="select select-bordered select-sm bg-white border-gray-300"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
              />
            </div>
          ) : myRequest.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Requests Found
              </h3>
              <p className="text-gray-600">
                You haven't created any donation requests yet.
              </p>
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
                    <th className="text-gray-700 font-semibold">Location</th>
                    <th className="text-gray-700 font-semibold">Date & Time</th>
                    <th className="text-gray-700 font-semibold">Blood Group</th>
                    <th className="text-gray-700 font-semibold">Status</th>
                    <th className="text-gray-700 font-semibold">Donor Info</th>
                    <th className="text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {myRequest.map((request, index) => (
                    <tr
                      key={request._id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <td className="font-semibold text-gray-700">
                        {(currentPage - 1) * itemsPerPage + index + 1}
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
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="text-gray-400" size={14} />
                            <span className="text-gray-700">
                              {request.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="text-gray-400" size={14} />
                            <span className="text-gray-700">
                              {request.time}
                            </span>
                          </div>
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
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              {request.requester_name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {request.requester_email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
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
                            className="btn btn-ghost btn-sm btn-circle hover:bg-gray-200"
                          >
                            <MoreVertical size={18} />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === request._id && (
                              <>
                                {/* Backdrop */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="fixed inset-0 z-10"
                                  onClick={() => setActiveDropdown(null)}
                                />

                                {/* Dropdown Menu */}
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20"
                                >
                                  {/* Done and Cancel buttons - ONLY for inprogress status */}
                                  {request.donation_status === "inprogress" && (
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

                                  {/* Edit button - ONLY for pending status */}
                                  {request.donation_status === "pending" && (
                                    <>
                                      <button
                                        onClick={() => handleEdit(request._id)}
                                        className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors flex items-center gap-2 text-orange-700 font-medium"
                                      >
                                        <Edit size={16} />
                                        Edit
                                      </button>
                                      <div className="border-t border-gray-200 my-1"></div>
                                    </>
                                  )}

                                  {/* View button - Always visible */}
                                  <button
                                    onClick={() =>
                                      handleViewDetails(request._id)
                                    }
                                    className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 text-blue-700 font-medium"
                                  >
                                    <Eye size={16} />
                                    View Details
                                  </button>

                                  <div className="border-t border-gray-200 my-1"></div>

                                  {/* Delete button - Always visible */}
                                  <button
                                    onClick={() => handleDelete(request._id)}
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
        </motion.div>

        {/* Pagination */}
        {!loading && myRequest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex justify-center items-center gap-2 flex-wrap"
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="btn btn-sm bg-white border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <ChevronLeft size={18} />
              Prev
            </button>

            {currentPage > 3 && numberOfPages > 5 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="btn btn-sm bg-white border-gray-300 hover:bg-gray-50"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
              </>
            )}

            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`btn btn-sm ${
                  page === currentPage
                    ? "bg-gradient-to-r from-red-600 to-blue-600 text-white border-transparent hover:from-red-700 hover:to-blue-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            {currentPage < numberOfPages - 2 && numberOfPages > 5 && (
              <>
                {currentPage < numberOfPages - 3 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(numberOfPages)}
                  className="btn btn-sm bg-white border-gray-300 hover:bg-gray-50"
                >
                  {numberOfPages}
                </button>
              </>
            )}

            <button
              onClick={handleNext}
              disabled={currentPage === numberOfPages}
              className="btn btn-sm bg-white border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {/* Pagination info */}
        {!loading && myRequest.length > 0 && (
          <p className="text-center text-gray-600 text-sm mt-4">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalRequest)} of{" "}
            {totalRequest} requests
          </p>
        )}
      </div>
    </div>
  );
};

export default MyRequest;
