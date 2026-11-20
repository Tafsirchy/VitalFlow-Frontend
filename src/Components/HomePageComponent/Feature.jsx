import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Droplets, MapPin, Calendar, Hospital, Target, ArrowRight, Activity, Heart, AlertCircle, Clock
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const getUrgencyBadge = (dateString) => {
  const diffInHours = (new Date() - new Date(dateString)) / (1000 * 60 * 60);
  if (diffInHours < 2) return { label: "CRITICAL", color: "bg-red-500/10 text-red-600 border-red-500/20" };
  if (diffInHours < 12) return { label: "URGENT", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" };
  return { label: "STABLE", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
};

const UrgentCard = ({ req, navigate }) => {
  const urgency = getUrgencyBadge(req.createdAt || req.date);

  return (
    <div className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-[var(--border-light)] dark:border-zinc-800 p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/5 group">
      
      {/* Top Header: Blood Group & Urgency */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-light)] dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 flex items-center justify-center">
              <span className="text-lg font-black text-red-600 dark:text-red-400">
                {req.bloodGroup}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] block uppercase tracking-wider">Required Blood</span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {req.units || 1} {req.units > 1 ? "Units" : "Unit"} Needed
              </span>
            </div>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${urgency.color}`}>
            {urgency.label}
          </span>
        </div>

        {/* Recipient Details */}
        <div className="py-3.5 space-y-2">
          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-red-600 transition-colors line-clamp-1">
            {req.recipient_name}
          </h3>

          <div className="space-y-2 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <Hospital size={14} className="text-[var(--primary-red)] shrink-0" />
              <span className="truncate">{req.hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[var(--primary-red)] shrink-0" />
              <span className="truncate">{req.recipient_district}{req.recipient_upazila ? `, ${req.recipient_upazila}` : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[var(--primary-red)] shrink-0" />
              <span>Required by: {req.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-[var(--border-light)] dark:border-zinc-800/80">
        <button
          onClick={() => navigate(`/donation-details/${req._id}`)}
          className="w-full py-3 px-4 rounded-xl bg-[var(--primary-red)] hover:bg-[var(--primary-red-hover)] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm"
        >
          <Heart size={14} className="fill-white" />
          <span>Donate Now</span>
        </button>
      </div>

    </div>
  );
};

const Feature = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("all");
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bloodTypes = ["all", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const fetchUrgentRequests = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(
        `${apiUrl}/urgent-requests?bloodGroup=${selectedBloodType}`
      );
      setUrgentRequests(res.data);
    } catch {
      toast.error("Failed to load urgent requests");
    } finally {
      setLoading(false);
    }
  }, [selectedBloodType]);

  useEffect(() => {
    fetchUrgentRequests();
  }, [fetchUrgentRequests]);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-section)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <Activity size={13} className="text-red-600 animate-pulse" />
            <span>Verified Emergency Pipeline</span>
          </div>

          <h2 className="section-title">
            Urgent Blood <span className="text-gradient-crimson italic">Requests</span>
          </h2>

          <p className="section-subtitle">
            Patients currently awaiting life-saving blood across verified hospital centers. Filter by blood group to respond immediately.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-[var(--border-light)] dark:border-zinc-800 shadow-sm">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedBloodType(type)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedBloodType === type
                    ? "bg-[var(--primary-red)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-red-600 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid with Negative Space & Rhythmic Alignment */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Connecting to emergency records...
            </p>
          </div>
        ) : urgentRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {urgentRequests.map((req) => (
              <UrgentCard key={req._id} req={req} navigate={navigate} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-10 px-6 bg-white dark:bg-zinc-900 rounded-3xl border border-[var(--border-light)] dark:border-zinc-800 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Heart size={24} />
            </div>
            <h3 className="font-bold text-lg text-[var(--text-primary)]">All Clear in this Category</h3>
            <p className="text-xs text-[var(--text-muted)]">
              No critical blood requests for <span className="font-bold text-[var(--primary-red)]">{selectedBloodType.toUpperCase()}</span> right now. Thank you for staying ready.
            </p>
          </div>
        )}

        {/* Bottom CTA Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/donation-requests")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary-red)] hover:text-[var(--primary-red-hover)] transition-colors group"
          >
            <span>Explore all verified donation requests</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Feature;
