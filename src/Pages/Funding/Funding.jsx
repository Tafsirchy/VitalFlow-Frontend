import React, { useEffect, useState, useContext } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Heart,
  Calendar,
  User,
  TrendingUp,
  Award,
  Sparkles,
  X,
  ArrowRight,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [fundings, setFundings] = useState([]);
  const [stats, setStats] = useState({ totalAmount: 0, totalDonations: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isDonating, setIsDonating] = useState(false);

  useEffect(() => {
    fetchFundings();
    fetchStats();
  }, []);

  useEffect(() => {
    if (!showDonateModal) {
      setSelectedAmount(null);
      setDonateAmount("");
    }
  }, [showDonateModal]);

  const fetchFundings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosSecure.get("/all-funding");
      setFundings(data);
    } catch (error) {
      console.error("Failed to load funding records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axiosSecure.get("/total-funding");
      setStats(data);
    } catch (error) {
      console.error("Failed to load funding stats:", error);
    }
  };

  const handleDonate = async () => {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    const amount = selectedAmount || donateAmount;

    if (!amount || amount <= 0) {
      toast.error("Please select or enter a valid contribution amount");
      return;
    }

    try {
      setIsDonating(true);
      const res = await axiosSecure.post("/create-payment-checkout", {
        donateAmount: amount,
        donorEmail: user.email,
      });

      window.location.href = res.data.url;
    } catch (error) {
      setIsDonating(false);
      toast.error("Failed to initiate secure checkout. Please try again.");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
            <div className="section-eyebrow">
              <ShieldCheck size={13} className="text-[var(--primary-red)]" />
              <span>Transparent Medical Relief Fund</span>
            </div>
            <h1 className="section-title">
              VitalFlow Community <br />
              <span className="text-gradient-crimson italic">Life Support Fund</span>
            </h1>
            <p className="section-subtitle">
              Every dollar contributed supports emergency blood transfusions, donor transport logistics, and sterile medical testing kits for underserved patients.
            </p>

            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setShowDonateModal(true)}
                className="btn-premium !px-8 !py-3 !text-sm shadow-lg shadow-red-600/20 flex items-center gap-2.5"
              >
                <Heart size={18} fill="currentColor" />
                <span>Make a Contribution</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Impact Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-10">
            {/* Total Resources */}
            <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-[var(--primary-red)]/30 transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-[var(--primary-red)] flex items-center justify-center">
                    <DollarSign size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    Audited Fund
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-1.5 tracking-tight">
                  ${stats.totalAmount.toLocaleString()}
                </div>
                <h3 className="text-base font-bold text-[var(--text-secondary)]">Total Relief Funds Raised</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                  Directly deployed for patient emergency transfusions, testing kits, and nationwide logistics.
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
                <span>Hospital Partners Supported</span>
                <span className="font-bold text-[var(--text-primary)]">140+ Facilities</span>
              </div>
            </div>

            {/* Total Life Impacts */}
            <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-[var(--primary-red)]/30 transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-[var(--primary-red)] flex items-center justify-center">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    Verified Outcomes
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-1.5 tracking-tight">
                  {stats.totalDonations.toLocaleString()}
                </div>
                <h3 className="text-base font-bold text-[var(--text-secondary)]">Patient Treatments Assisted</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                  Individuals whose emergency transfusion costs or logistics were covered by this fund.
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
                <span>Average Response Window</span>
                <span className="font-bold text-[var(--text-primary)]">&lt; 2.5 Hours</span>
              </div>
            </div>
          </div>

          {/* Recent Community Contributions Table */}
          <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl shadow-sm overflow-hidden mb-10">
            <div className="p-4 sm:p-6 border-b border-[var(--border-light)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[var(--text-primary)]">Recent Community Contributions</h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Public ledger of transparent humanitarian support from verified donors.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={13} />
                <span>100% Direct Allocation</span>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 rounded-full border-3 border-[var(--primary-red)]/20 border-t-[var(--primary-red)] animate-spin mx-auto mb-3" />
                <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Loading Contributions...
                </p>
              </div>
            ) : fundings.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <Heart size={30} className="mx-auto mb-2 opacity-40" />
                <p className="font-bold text-xs sm:text-sm">Be the first to contribute to the Life Support Fund</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[var(--background-main)]/60 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-light)]">
                      <th className="px-4 py-3">Contributor</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Receipt Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm">
                    {fundings.slice(0, 10).map((fund, idx) => (
                      <tr key={idx} className="hover:bg-[var(--background-main)]/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[var(--background-main)] border border-[var(--border-light)] flex items-center justify-center font-bold text-xs text-[var(--text-secondary)]">
                              <User size={14} />
                            </div>
                            <div>
                              <div className="font-bold text-[var(--text-primary)]">
                                {fund.donorName || "Kind Contributor"}
                              </div>
                              <div className="text-[11px] text-[var(--text-muted)]">
                                {fund.donorEmail ? fund.donorEmail.replace(/(.{2})(.*)(?=@)/, "$1***") : "Anonymous"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-black text-[var(--primary-red)] text-sm sm:text-base">
                          ${fund.amount}
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">
                          {formatDate(fund.paidAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                            <CheckCircle2 size={11} />
                            <span>Verified</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Contribution Modal */}
      <AnimatePresence>
        {showDonateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDonateModal(false)}
            />
            <Motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[var(--background-card)] rounded-3xl border border-[var(--border-light)] shadow-2xl overflow-hidden p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center">
                    <Heart size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[var(--text-primary)]">Donate to VitalFlow</h3>
                    <p className="text-xs text-[var(--text-muted)]">Secure payment via Stripe</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDonateModal(false)}
                  className="p-2 rounded-lg hover:bg-[var(--background-main)] text-[var(--text-muted)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block mb-3">
                    Select Contribution Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {quickAmounts.map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          setSelectedAmount((prev) => (prev === val ? null : val));
                          setDonateAmount("");
                        }}
                        className={`py-3 rounded-2xl font-black text-base border transition-all ${
                          selectedAmount === val
                            ? "bg-[var(--primary-red)] text-white border-[var(--primary-red)] shadow-md shadow-red-600/30"
                            : "bg-[var(--background-main)] text-[var(--text-primary)] border-[var(--border-light)] hover:border-[var(--primary-red)]/50"
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                    Or Enter Custom Amount ($ USD)
                  </label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="number"
                      value={donateAmount}
                      onChange={(e) => {
                        setDonateAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      placeholder="e.g., 75"
                      className="w-full h-14 pl-12 pr-4 bg-[var(--background-main)] border border-[var(--border-light)] rounded-2xl font-bold text-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] text-xs text-[var(--text-secondary)] flex items-center gap-3">
                  <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
                  <span>256-bit SSL encrypted checkout. You will be redirected to the secure gateway.</span>
                </div>

                <button
                  onClick={handleDonate}
                  disabled={isDonating || (!selectedAmount && !donateAmount)}
                  className="btn-premium w-full !py-4 shadow-xl shadow-red-600/20 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {isDonating ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Proceed to Contribution</span>
                      <ArrowRight size={16} />
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

export default FundingPage;
