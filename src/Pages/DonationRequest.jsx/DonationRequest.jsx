import React, { useEffect, useState } from "react";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Hospital,
  Activity,
  Heart,
  AlertCircle,
  Users,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchPendingRequests = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/pending-donation-requests");
      setRequests(data);
    } catch (err) {
      toast.error("Failed to fetch pending requests");
    } finally {
      setIsLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const handleViewDetails = (id) => {
    navigate(`/donation-details/${id}`);
  };

  const bloodGroups = ["all", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.bloodGroup === filter);

  return (
    <div className="bg-[var(--background-main)] min-h-screen select-none">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Symmetrical Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
            <div className="section-eyebrow mx-auto">
              <Activity size={13} className="text-red-600 animate-pulse" />
              <span>Emergency Dispatch Registry</span>
            </div>

            <h1 className="section-title">
              All Blood <span className="text-gradient-crimson italic">Donation Requests</span>
            </h1>

            <p className="section-subtitle">
              Browse authenticated emergency transfusion requests from verified hospitals. Filter by your blood group to connect immediately with coordinators.
            </p>

            {/* Quick Summary Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                <Droplet size={13} className="fill-current" />
                {requests.length} Pending Transfusions
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={13} />
                100% Medical Staff Authenticated
              </span>
            </div>
          </div>

          {/* Blood Group Filter Pills */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-[var(--border-light)] dark:border-zinc-800 shadow-sm">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setFilter(group)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === group
                      ? "bg-[var(--primary-red)] text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-red-600 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {group === "all" ? "All Groups" : group}
                </button>
              ))}
            </div>
          </div>

          {/* Request Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-56 rounded-2xl bg-white dark:bg-zinc-900 border border-[var(--border-light)] dark:border-zinc-800 animate-pulse p-5" />
                ))}
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-[var(--border-light)] dark:border-zinc-800 p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/5 group"
                  >
                    <div>
                      {/* Card Header: Blood Type + Status */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-light)] dark:border-zinc-800/80">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                            <span className="text-xl font-black text-red-600 dark:text-red-400">
                              {request.bloodGroup}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                              Required Blood
                            </span>
                            <span className="text-sm font-bold text-[var(--text-primary)]">
                              {request.units || 1} {request.units > 1 ? "Units" : "Unit"}
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-red-500/10 text-red-600 border border-red-500/20">
                          {request.donation_status || "Urgent"}
                        </span>
                      </div>

                      {/* Recipient & Location Info */}
                      <div className="py-3.5 space-y-2">
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-red-600 transition-colors line-clamp-1">
                          {request.recipient_name}
                        </h3>

                        <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                          <div className="flex items-center gap-2">
                            <Hospital size={14} className="text-[var(--primary-red)] shrink-0" />
                            <span className="truncate">{request.hospital}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[var(--primary-red)] shrink-0" />
                            <span className="truncate">{request.recipient_district}{request.recipient_upazila ? `, ${request.recipient_upazila}` : ''}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-[var(--primary-red)] shrink-0" />
                            <span>Required: {request.date} ({request.time || "Immediate"})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-[var(--border-light)] dark:border-zinc-800/80">
                      <button
                        onClick={() => handleViewDetails(request._id)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[var(--primary-red)] hover:bg-[var(--primary-red-hover)] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm"
                      >
                        <Heart size={14} className="fill-white" />
                        <span>View Details & Donate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center py-10 px-6 bg-white dark:bg-zinc-900 rounded-2xl border border-[var(--border-light)] dark:border-zinc-800 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">No Active Requests</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  There are currently no pending requests for blood group <span className="font-bold text-[var(--primary-red)]">{filter.toUpperCase()}</span>. Thank you for staying ready.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default DonationRequest;
