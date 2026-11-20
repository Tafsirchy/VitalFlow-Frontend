import React from "react";
import { XCircle, ArrowLeft, RefreshCcw, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6">
        <div className="w-full max-w-lg bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] shadow-sm p-6 sm:p-8 text-center transition-smooth">
          {/* Symmetrical Icon */}
          <div className="w-16 h-16 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-sm">
            <XCircle size={36} />
          </div>

          <span className="section-eyebrow text-amber-600">TRANSACTION CANCELLED</span>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-1 mb-2">
            Payment Not Completed
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5 max-w-md mx-auto">
            Your transaction was cancelled before completion. No charges were made to your account. You can return to the fund page whenever you are ready.
          </p>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)] font-bold text-xs uppercase tracking-wider transition-smooth"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>

            <Link
              to="/funding"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-red-500/20 transition-smooth"
            >
              <Heart size={14} />
              Try Again
            </Link>
          </div>
        </div>
    </div>
  );
};

export default PaymentCancelled;
