import React, { useContext, useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
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
  ShieldCheck,
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

  const fetchUserRole = useCallback(async () => {
    if (user?.email) {
      try {
        const response = await axiosSecure.get(`/donor/role/${user.email}`);
        setUserRole(response.data?.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    }
  }, [user, axiosSecure]);

  const fetchRequests = useCallback(() => {
    setLoading(true);
    axiosSecure
      .get(
        `/all-requests?page=${
          currentPage - 1
        }&size=${itemsPerPage}&filter=${filterStatus}`
      )
      .then((res) => {
        setAllRequests(res.data.request || []);
        setTotalRequest(res.data.totalRequest || 0);
      })
      .catch((error) => {
        console.error("Failed to fetch requests:", error);
        toast.error("Failed to load requests");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, filterStatus, axiosSecure]);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  useEffect(() => {
    if (userRole) {
      fetchRequests();
    }
  }, [userRole, fetchRequests]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage) || 1;
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
        toast.success(`Request status updated to ${status}`);
        setActiveDropdown(null);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== "Admin") {
      toast.error("Only administrators can delete donation requests");
      return;
    }

    if (!window.confirm("Are you sure you want to permanently delete this blood request?")) {
      return;
    }

    try {
      const response = await axiosSecure.delete(`/admin/delete-request/${id}`);

      if (response.data) {
        setAllRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== id)
        );
        setTotalRequest((prev) => Math.max(0, prev - 1));
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
      toast.error("Only administrators can edit requests");
      return;
    }
    navigate(`/dashboard/edit-request/${id}`);
    setActiveDropdown(null);
  };

  const handleView = (id) => {
    navigate(`/donation-details/${id}`);
    setActiveDropdown(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending
          </span>
        );
      case "inprogress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            In Progress
          </span>
        );
      case "done":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle size={13} />
            Completed
          </span>
        );
      case "canceled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <XCircle size={13} />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-600 border border-zinc-500/20">
            {status}
          </span>
        );
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

  return (
    <div className="py-3 sm:py-5 lg:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        {/* Symmetrical Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md shadow-red-500/20 mb-3">
            <Droplet size={24} fill="currentColor" />
          </div>
          <span className="section-eyebrow block">ADMINISTRATIVE DISPATCH MANAGEMENT</span>
          <h1 className="section-title">All Blood Donation Requests</h1>
          <p className="section-subtitle">
            Monitor, coordinate, and moderate emergency blood donation requests across the national network with clinical precision.
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] p-4 sm:p-5 mb-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                National Request Registry
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Showing <span className="font-bold text-red-600">{allRequests.length}</span> of{" "}
                <span className="font-bold text-[var(--text-primary)]">{totalRequest}</span> total registered requests
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-[var(--background-main)] px-2.5 py-1.5 rounded-lg border border-[var(--border-light)]">
                <Filter size={13} className="text-red-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="all">All Request Statuses</option>
                  <option value="pending">Pending Verification</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Completed Transfusions</option>
                  <option value="canceled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-[var(--background-main)] px-2.5 py-1.5 rounded-lg border border-[var(--border-light)]">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none outline-none font-bold text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-red-500/20 border-t-red-600 rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold text-[var(--text-secondary)]">
                Loading national blood registry records...
              </p>
            </div>
          ) : allRequests.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="w-10 h-10 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-2.5">
                <AlertCircle size={20} />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                No Records Found
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                No blood requests match the selected status filter. Adjust your filter to view pending or completed requests.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--background-main)] border-b border-[var(--border-light)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <th className="py-2.5 px-3.5">Requester</th>
                    <th className="py-2.5 px-3.5">Patient</th>
                    <th className="py-2.5 px-3.5">Hospital & Area</th>
                    <th className="py-2.5 px-3.5">Schedule</th>
                    <th className="py-2.5 px-3.5">Blood Group</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)] text-xs sm:text-sm">
                  {allRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-xs">
                            <User size={14} />
                          </div>
                          <div>
                            <div className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">
                              {request.requester_name}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)]">
                              {request.requester_email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <span className="font-bold text-[var(--text-primary)]">
                          {request.recipient_name}
                        </span>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <MapPin size={12} className="text-red-500 shrink-0" />
                          <span>
                            {request.recipient_district}, {request.recipient_upazila}
                          </span>
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate max-w-[180px]">
                          {request.hospital}
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <Calendar size={12} className="text-blue-500 shrink-0" />
                          <span>{request.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mt-0.5">
                          <Clock size={11} className="text-amber-500 shrink-0" />
                          <span>{request.time}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-red-500/10 text-red-600 border border-red-500/20">
                          {request.bloodGroup}
                        </span>
                      </td>

                      <td className="py-2.5 px-3.5">
                        {getStatusBadge(request.donation_status)}
                      </td>

                      <td className="py-2.5 px-3.5 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === request._id ? null : request._id
                              )
                            }
                            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            <MoreVertical size={15} />
                          </button>

                          {activeDropdown === request._id && (
                            <>
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className="absolute right-0 mt-1 w-48 bg-[var(--background-card)] rounded-xl shadow-xl border border-[var(--border-light)] py-1.5 z-40 text-left text-xs font-medium">
                                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-light)] mb-1">
                                  Administrative Actions
                                </div>

                                {request.donation_status === "inprogress" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(request._id, "done")
                                      }
                                      className="w-full px-3 py-1.5 hover:bg-emerald-500/10 text-emerald-600 flex items-center gap-2"
                                    >
                                      <CheckCircle size={13} />
                                      Mark Completed
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(request._id, "canceled")
                                      }
                                      className="w-full px-3 py-1.5 hover:bg-rose-500/10 text-rose-600 flex items-center gap-2"
                                    >
                                      <XCircle size={13} />
                                      Cancel Request
                                    </button>
                                    <div className="my-1 border-t border-[var(--border-light)]" />
                                  </>
                                )}

                                <button
                                  onClick={() => handleView(request._id)}
                                  className="w-full px-3 py-1.5 hover:bg-blue-500/10 text-blue-600 flex items-center gap-2"
                                >
                                  <Eye size={13} />
                                  View Public Case
                                </button>

                                {isAdmin && (
                                  <>
                                    {request.donation_status === "pending" && (
                                      <button
                                        onClick={() => handleEdit(request._id)}
                                        className="w-full px-3 py-1.5 hover:bg-amber-500/10 text-amber-600 flex items-center gap-2"
                                      >
                                        <Edit size={13} />
                                        Edit Details
                                      </button>
                                    )}

                                    <div className="my-1 border-t border-[var(--border-light)]" />

                                    <button
                                      onClick={() => handleDelete(request._id)}
                                      className="w-full px-3 py-1.5 hover:bg-red-500/10 text-red-600 flex items-center gap-2"
                                    >
                                      <Trash2 size={13} />
                                      Delete Record
                                    </button>
                                  </>
                                )}

                                {isVolunteer && !isAdmin && (
                                  <div className="px-3 py-1 text-[10px] text-[var(--text-muted)] italic">
                                    Volunteer permissions (Read Only)
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Bar */}
        {!loading && allRequests.length > 0 && (
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalRequest)} of {totalRequest}{" "}
              total emergency requests
            </p>

            <div className="inline-flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[var(--border-light)] bg-[var(--background-card)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
              >
                <ChevronLeft size={15} />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    page === currentPage
                      ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                      : "border border-[var(--border-light)] bg-[var(--background-card)] hover:border-red-500 text-[var(--text-secondary)]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === numberOfPages}
                className="p-2 rounded-lg border border-[var(--border-light)] bg-[var(--background-card)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
