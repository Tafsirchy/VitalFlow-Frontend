import React from "react";
import { Heart, Search, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-section)] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#250902] via-[#640d14] to-[#800e13] p-6 sm:p-10 lg:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-950/40 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90">
              <Heart size={13} className="fill-white" />
              <span>Make an Immediate Impact</span>
            </div>

            {/* Symmetrical Commanding Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Join the Network That Saves Lives Every Single Day
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-white/85 font-normal leading-relaxed max-w-2xl mx-auto">
              A single blood donation takes less than an hour and can save up to three lives. Register today as a voluntary donor and stand ready when someone in your community needs you most.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate("/auth/register")}
                className="h-12 px-6 rounded-xl bg-white text-[var(--primary-red)] hover:bg-gray-100 font-bold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2.5 active:scale-[0.98]"
              >
                <span>Register as a Donor</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/donation-requests")}
                className="h-12 px-6 rounded-xl bg-black/25 hover:bg-black/40 border border-white/30 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2.5 active:scale-[0.98]"
              >
                <Search size={16} />
                <span>View Urgent Requests</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-5 border-t border-white/15 text-xs text-white/80 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                100% Free & Voluntary
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-400" />
                Confidential Health Data
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                Verified Hospital Transfers
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CallToAction;
