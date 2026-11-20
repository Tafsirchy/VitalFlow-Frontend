import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  User,
  Mail,
  MapPin,
  Hospital,
  Calendar,
  Clock,
  MessageSquare,
  Droplet,
  X,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Star,
  ThumbsUp,
  Share2,
  Phone,
  Shield,
  Activity,
  Lock,
  UserCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [relatedRequests, setRelatedRequests] = useState([]);

  const reviews = useMemo(
    () => [
      {
        id: 1,
        reviewer_name: "Dr. K. Rahman",
        reviewer_type: "Hospital Coordinator",
        rating: 5,
        comment:
          "Verified emergency requirement. Patient is admitted at the transfusion unit and the team is ready for matching.",
        date: "Today",
        verified: true,
        helpful_count: 14,
      },
      {
        id: 2,
        reviewer_name: "Tanvir Ahmed",
        reviewer_type: "Regular Volunteer Donor",
        rating: 5,
        comment:
          "I donated through VitalFlow last month for this hospital. The staff was professional and the process took only 25 minutes.",
        date: "2 days ago",
        verified: true,
        helpful_count: 9,
      },
    ],
    []
  );

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
    });

    axiosSecure.get(`/requests?limit=4`).then((res) => {
      setRelatedRequests(res.data.slice(0, 4));
    });
  }, [id, axiosSecure]);

  const handleConfirmDonation = async () => {
    if (!user) {
      toast.info("Please login to donate");
      navigate("/auth/login", { state: { from: `/donation-details/${id}` } });
      return;
    }

    try {
      setLoading(true);
      await axiosSecure.patch(`/update-donation-status/${id}`, {
        status: "inprogress",
      });
      setRequest((prev) => ({
        ...prev,
        donation_status: "inprogress",
      }));
      toast.success("Thank you! You have confirmed your commitment to donate ❤️");
      setOpen(false);
    } catch (error) {
      console.error("Donation confirmation failed:", error);
      toast.error("Failed to confirm donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-main)]">
        <div className="w-12 h-12 rounded-full border-4 border-[var(--primary-red)]/20 border-t-[var(--primary-red)] animate-spin" />
      </div>
    );
  }

  const isOwnRequest = user?.email === request.requester_email;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20";
      case "inprogress":
        return "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "done":
        return "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 border-zinc-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Awaiting Volunteer Donor";
      case "inprogress":
        return "Donation in Progress";
      case "done":
        return "Transfusion Completed";
      default:
        return status;
    }
  };

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-[var(--background-main)] text-[var(--text-primary)]">
      <main className="py-6 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--border-light)]">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-colors group"
            >
              <div className="p-1.5 rounded-lg bg-[var(--background-card)] border border-[var(--border-light)] group-hover:border-[var(--primary-red)] transition-all">
                <ArrowLeft size={13} />
              </div>
              <span>Back to Requests</span>
            </button>

            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${getStatusColor(
                request.donation_status
              )}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{getStatusText(request.donation_status)}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            {/* Left Content Area (8 Cols) */}
            <div className="lg:col-span-8 space-y-5">
              {/* Medical Case Hero Card */}
              <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left mb-6">
                  {/* Blood Badge */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white flex flex-col items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-200">Needed</span>
                    <span className="text-3xl sm:text-4xl font-black tracking-tight">{request.bloodGroup}</span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-[var(--primary-red)] text-xs font-bold uppercase tracking-wider">
                      <Droplet size={11} fill="currentColor" />
                      <span>Emergency Requirement</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                      {request.recipient_name}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                      <Hospital size={15} className="text-[var(--primary-red)]" />
                      <span>{request.hospital || "Medical College Hospital"}</span>
                    </div>
                  </div>
                </div>

                {/* Patient Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                      Required Date
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-1">
                      <Calendar size={13} className="text-[var(--primary-red)]" />
                      {request.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                      Target Time
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-1">
                      <Clock size={13} className="text-[var(--primary-red)]" />
                      {request.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                      District
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-1">
                      <MapPin size={13} className="text-[var(--primary-red)]" />
                      {request.recipient_district}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                      Upazila
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-1">
                      <MapPin size={13} className="text-[var(--primary-red)]" />
                      {request.recipient_upazila}
                    </span>
                  </div>
                </div>
              </div>

              {/* Case Details & Hospital Specs */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Requester Contact Information */}
                <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[var(--border-light)]">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center font-bold">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[var(--text-primary)]">Contact Person</h3>
                      <p className="text-[11px] text-[var(--text-muted)]">Verified Request Coordinator</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
                        Coordinator Name
                      </span>
                      <span className="font-bold text-[var(--text-primary)]">{request.requester_name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${request.requester_email}`}
                        className="font-medium text-[var(--primary-red)] hover:underline break-all text-xs"
                      >
                        {request.requester_email}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
                        Case ID
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        VF-{id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hospital Facility Location */}
                <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[var(--border-light)]">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                      <Hospital size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[var(--text-primary)]">Medical Facility</h3>
                      <p className="text-[11px] text-[var(--text-muted)]">Verified Hospital Location</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
                        Hospital Name
                      </span>
                      <span className="font-bold text-[var(--text-primary)]">{request.hospital}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
                        Street Address
                      </span>
                      <span className="font-medium text-[var(--text-secondary)] leading-relaxed text-xs">
                        {request.address}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle2 size={13} />
                      <span>Facility Verified by Staff</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient's Note / Message */}
              {request.message && (
                <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-3xl p-8 sm:p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 text-[var(--primary-red)]">
                    <MessageSquare size={18} />
                    <h3 className="text-sm font-black uppercase tracking-wider">Patient Situation & Note</h3>
                  </div>
                  <blockquote className="text-lg text-[var(--text-secondary)] italic leading-relaxed pl-6 border-l-4 border-[var(--primary-red)]">
                    "{request.message}"
                  </blockquote>
                </div>
              )}

              {/* Hospital & Volunteer Feedback */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)]">
                  <div>
                    <h3 className="text-xl font-black text-[var(--text-primary)]">Medical & Donor Feedback</h3>
                    <p className="text-xs text-[var(--text-muted)]">Verified reviews from coordinators and past donors</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--background-card)] border border-[var(--border-light)]">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black">{avgRating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-3xl p-6 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-sm text-[var(--text-primary)]">{rev.reviewer_name}</h4>
                          <span className="text-xs text-[var(--text-muted)]">{rev.reviewer_type}</span>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{rev.date}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed mb-4">
                        "{rev.comment}"
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)] text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <CheckCircle size={14} className="text-emerald-500" /> Verified
                        </span>
                        <span>{rev.helpful_count} people found this helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Sidebar (4 Cols) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Commitment Action Box */}
              <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-3xl p-8 shadow-xl">
                <h3 className="text-base font-black text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                  Volunteer As Donor
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                  Confirm your availability to donate blood for this patient. You will be matched with the hospital coordinator.
                </p>

                {request.donation_status === "pending" && !isOwnRequest ? (
                  <button
                    onClick={() =>
                      user
                        ? setOpen(true)
                        : navigate("/auth/login", {
                            state: { from: `/donation-details/${id}` },
                          })
                    }
                    className="btn-premium w-full !py-4 shadow-xl shadow-red-600/20 text-center font-bold text-sm flex items-center justify-center gap-2 mb-4"
                  >
                    <Heart size={18} fill="currentColor" />
                    <span>I Want to Donate Blood</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] text-center text-xs font-bold text-[var(--text-muted)] mb-4">
                    {isOwnRequest
                      ? "You created this donation request"
                      : "This request already has an active donor"}
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-[var(--border-light)] text-xs">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Shield size={16} className="text-emerald-500 shrink-0" />
                    <span>100% voluntary, no charges ever involved</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Direct coordination at hospital premises</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Clock size={16} className="text-emerald-500 shrink-0" />
                    <span>Average donation takes 20-30 minutes</span>
                  </div>
                </div>
              </div>

              {/* Related Emergency Requests */}
              {relatedRequests.length > 0 && (
                <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-3xl p-6 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    Other Urgent Requests
                  </h4>
                  <div className="space-y-3">
                    {relatedRequests
                      .filter((r) => r._id !== id)
                      .slice(0, 3)
                      .map((rel) => (
                        <button
                          key={rel._id}
                          onClick={() => navigate(`/donation-details/${rel._id}`)}
                          className="w-full text-left p-3.5 rounded-2xl bg-[var(--background-main)] hover:border-[var(--primary-red)] border border-transparent transition-all group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base font-black text-[var(--primary-red)]">
                              {rel.bloodGroup}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                              {rel.recipient_district}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                            {rel.recipient_name}
                          </p>
                          <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                            {rel.hospital}
                          </p>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {open && user && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !loading && setOpen(false)}
            />
            <Motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[var(--background-card)] rounded-3xl border border-[var(--border-light)] shadow-2xl overflow-hidden p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center">
                    <Heart size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[var(--text-primary)]">Confirm Donation Commitment</h3>
                    <p className="text-xs text-[var(--text-muted)]">Voluntary Blood Donor Network</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--background-main)] text-[var(--text-muted)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 mb-6 text-sm text-[var(--text-secondary)]">
                <div className="p-4 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Patient:</span>
                    <span className="font-bold text-[var(--text-primary)]">{request.recipient_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Blood Group:</span>
                    <span className="font-bold text-[var(--primary-red)]">{request.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Hospital:</span>
                    <span className="font-bold text-[var(--text-primary)]">{request.hospital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Required Date:</span>
                    <span className="font-bold text-[var(--text-primary)]">{request.date} ({request.time})</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Please note:</strong> By confirming, the patient and hospital team will be notified that you are willing to donate. Please only confirm if you are in good health and able to reach the designated hospital.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={loading}
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3.5 rounded-2xl border border-[var(--border-light)] hover:bg-[var(--background-main)] text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  onClick={handleConfirmDonation}
                  className="flex-[2] btn-premium !py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Confirm Commitment</span>
                    </>
                  )}
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationDetails;
