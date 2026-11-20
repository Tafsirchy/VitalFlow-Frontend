import React, { useEffect } from "react";
import { CheckCircle, ArrowLeft, Heart, Home } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router";
import useAxios from "../../Hooks/useAxios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!sessionId) return;

    axiosInstance
      .post(`/success-payment?session_id=${sessionId}`)
      .then(() => {})
      .catch((err) => {
        console.error("Payment confirmation error:", err);
      });
  }, [axiosInstance, sessionId]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6">
        <div className="w-full max-w-lg bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] shadow-sm p-6 sm:p-8 text-center transition-smooth">
          {/* Symmetrical Icon */}
          <div className="w-16 h-16 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-sm">
            <CheckCircle size={36} />
          </div>

          <span className="section-eyebrow text-emerald-600">CONTRIBUTION CONFIRMED</span>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-1 mb-2">
            Thank You for Your Support
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5 max-w-md mx-auto">
            Your generous contribution to the VitalFlow Community Life Support Fund has been processed successfully. Every dollar fuels emergency transfusions, critical logistics, and patient aid.
          </p>

          {/* Details Card */}
          {sessionId && (
            <div className="rounded-xl bg-[var(--background-main)] border border-[var(--border-light)] p-3.5 text-left mb-5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-medium">Payment Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Verified & Completed
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-medium">Session Reference</span>
                <span className="font-mono text-[11px] text-[var(--text-secondary)] truncate max-w-[200px]">
                  {sessionId}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Link
              to="/funding"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)] font-bold text-xs uppercase tracking-wider transition-smooth"
            >
              <Heart size={15} className="text-red-600" />
              View Fund
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-red-500/20 transition-smooth"
            >
              <Home size={15} />
              Return Home
            </Link>
          </div>
        </div>
    </div>
  );
};

export default PaymentSuccess;
