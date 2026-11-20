import React, { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import {
  Calendar,
  Clock,
  MapPin,
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
  PlusCircle,
  Filter,
  User,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchRequests = useCallback(() => {
    setLoading(true);
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request || []);
        setTotalRequest(res.data.totalRequest || 0);
      })
      .catch((error) => {
        console.error("Failed to fetch requests:", error);
        toast.error("Failed to load requests");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

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
        setMyRequest((prevRequests) =>
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
    if (!window.confirm("Are you sure you want to delete this blood request?")) {
      return;
    }

    try {
      const response = await axiosSecure.delete(`/delete-request/${id}`);

      if (response.data) {
        setMyRequest((prevRequests) =>
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
    navigate(`/dashboard/edit-request/${id}`);
    setActiveDropdown(null);
  };

  const handleViewDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending Verification
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
            Transfusion Completed
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

  const stats = {
    pending: myRequest.filter((r) => r.donation_status === "pending").length,
    inprogress: myRequest.filter((r) => r.donation_status === "inprogress").length,
    done: myRequest.filter((r) => r.donation_status === "done").length,
    canceled: myRequest.filter((r) => r.donation_status === "canceled").length,
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Symmetrical Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20 mb-5">
            <Droplet size={32} fill="currentColor" />
          </div>
          <span className="section-eyebrow block">PERSONAL DISPATCH MANAGEMENT</span>
          <h1 className="section-title">My Blood Donation Requests</h1>
          <p className="section-subtitle">
            Track, coordinate, and review the medical status of your emergency transfusion requests and volunteer commitments in real time.
          </p>
        </div>

        {/* Overview Stats Bar & Controls */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] p-4 sm:p-5 mb-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-light)] mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                Request Activity Overview
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Total Registered: <span className="font-bold text-red-600">{totalRequest}</span> emergency requests
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Link
                to="/dashboard/add-request"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-red-500/20 transition-smooth"
              >
                <PlusCircle size={14} />
                New Request
              </Link>

              <div className="flex items-center gap-2 bg-[var(--background-main)] px-2.5 py-1.5 rounded-lg border border-[var(--border-light)]">
                <Filter size={13} className="text-[var(--text-muted)]" />
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

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[var(--background-main)] rounded-xl p-3.5 border border-[var(--border-light)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
                Pending Verification
              </span>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {stats.pending}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Awaiting donor match</p>
            </div>

            <div className="bg-[var(--background-main)] rounded-xl p-3.5 border border-[var(--border-light)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                In Progress
              </span>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {stats.inprogress}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Donor committed</p>
            </div>

            <div className="bg-[var(--background-main)] rounded-xl p-3.5 border border-[var(--border-light)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-0.5">
                Completed
              </span>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {stats.done}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Successful transfusions</p>
            </div>

            <div className="bg-[var(--background-main)] rounded-xl p-3.5 border border-[var(--border-light)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-0.5">
                Cancelled
              </span>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {stats.canceled}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Withdrawn requests</p>
            </div>
          </div>
        </div>

        {/* Request Records Table */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-8 h-8 border-3 border-red-500/20 border-t-red-600 rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold text-[var(--text-secondary)]">
                Loading your blood donation records...
              </p>
            </div>
          ) : myRequest.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Droplet size={24} />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                No Donation Requests Found
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-4">
                You have not created any emergency blood donation requests yet. Whenever you submit a case, its real-time matching status and assigned donors will be listed here.
              </p>
              <Link
                to="/dashboard/add-request"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-smooth"
              >
                <PlusCircle size={14} />
                Create First Request
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--background-main)] border-b border-[var(--border-light)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <th className="py-2.5 px-3.5">#</th>
                    <th className="py-2.5 px-3.5">Patient Name</th>
                    <th className="py-2.5 px-3.5">Hospital & Area</th>
                    <th className="py-2.5 px-3.5">Schedule</th>
                    <th className="py-2.5 px-3.5">Blood Group</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5">Assigned Donor</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-light)] text-xs sm:text-sm">
                  {myRequest.map((request, index) => (
                    <tr
                      key={request._id}
                      className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-2.5 px-3.5 font-bold text-xs text-[var(--text-muted)]">
                        {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, "0")}
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div className="font-bold text-[var(--text-primary)]">
                          {request.recipient_name}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] truncate max-w-[160px]">
                          {request.hospital}
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <MapPin size={12} className="text-red-500 shrink-0" />
                          <span>
                            {request.recipient_district}, {request.recipient_upazila}
                          </span>
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

                      <td className="py-2.5 px-3.5">
                        {request.donation_status === "inprogress" ? (
                          <div className="bg-[var(--background-main)] border border-blue-500/20 rounded-lg px-2.5 py-1.5 text-xs">
                            <p className="font-bold text-[var(--text-primary)]">
                              {request.requester_name || "Volunteer Donor"}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] truncate max-w-[140px]">
                              {request.requester_email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] italic">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === request._id ? null : request._id
                              )
                            }
                            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activeDropdown === request._id && (
                            <>
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className="absolute right-0 mt-1 w-48 bg-[var(--background-card)] rounded-2xl shadow-xl border border-[var(--border-light)] py-2 z-40 text-left text-xs font-medium">
                                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-light)] mb-1">
                                  Request Actions
                                </div>

                                {request.donation_status === "inprogress" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(request._id, "done")
                                      }
                                      className="w-full px-4 py-2 hover:bg-emerald-500/10 text-emerald-600 flex items-center gap-2.5"
                                    >
                                      <CheckCircle size={14} />
                                      Mark Completed
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(request._id, "canceled")
                                      }
                                      className="w-full px-4 py-2 hover:bg-rose-500/10 text-rose-600 flex items-center gap-2.5"
                                    >
                                      <XCircle size={14} />
                                      Cancel Request
                                    </button>
                                    <div className="my-1 border-t border-[var(--border-light)]" />
                                  </>
                                )}

                                {request.donation_status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleEdit(request._id)}
                                      className="w-full px-4 py-2 hover:bg-amber-500/10 text-amber-600 flex items-center gap-2.5"
                                    >
                                      <Edit size={14} />
                                      Edit Details
                                    </button>
                                    <div className="my-1 border-t border-[var(--border-light)]" />
                                  </>
                                )}

                                <button
                                  onClick={() => handleViewDetails(request._id)}
                                  className="w-full px-4 py-2 hover:bg-blue-500/10 text-blue-600 flex items-center gap-2.5"
                                >
                                  <Eye size={14} />
                                  View Public Record
                                </button>

                                <div className="my-1 border-t border-[var(--border-light)]" />

                                <button
                                  onClick={() => handleDelete(request._id)}
                                  className="w-full px-4 py-2 hover:bg-red-500/10 text-red-600 flex items-center gap-2.5"
                                >
                                  <Trash2 size={14} />
                                  Delete Request
                                </button>
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
        {!loading && myRequest.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalRequest)} of {totalRequest}{" "}
              total emergency requests
            </p>

            <div className="inline-flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
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
                className="p-2.5 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequest;
