import React from "react";
import { Search, Heart, ShieldCheck, Activity, Users, Clock, CheckCircle2, Hospital, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const bloodGroups = [
    { type: "A+", demand: "High Demand", urgent: true },
    { type: "O+", demand: "Critical", urgent: true },
    { type: "B+", demand: "Optimal", urgent: false },
    { type: "AB+", demand: "Needed", urgent: false },
    { type: "O-", demand: "Universal", urgent: true },
    { type: "A-", demand: "Needed", urgent: false },
  ];

  return (
    <div className="relative overflow-hidden bg-[var(--background-main)] select-none py-10 sm:py-14 lg:py-16 border-b border-[var(--border-light)] dark:border-zinc-800/60">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(220,38,38,0.06)_0%,transparent_70%)]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(100,13,20,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Command & Vision */}
          <div className="col-span-12 lg:col-span-7 space-y-5">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">
                National Blood Emergency Network
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)] leading-[1.08] tracking-tight">
                Every Drop Connects. <br />
                <span className="text-gradient-crimson italic">Every Second Saves.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed pt-2">
                VitalFlow bridges the critical gap between voluntary blood donors, emergency patients, and certified healthcare facilities in real time.
              </p>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => navigate("/auth/register")}
                className="h-12 px-6 rounded-2xl bg-[var(--primary-red)] hover:bg-[var(--primary-red-hover)] text-white font-bold text-sm shadow-md shadow-red-950/20 transition-all flex items-center gap-2.5 active:scale-[0.98]"
              >
                <Heart size={18} className="fill-white" />
                <span>Become a Donor</span>
              </button>

              <button
                onClick={() => navigate("/search")}
                className="h-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-[var(--border-light)] dark:border-zinc-800 hover:border-red-500/40 text-[var(--text-primary)] font-bold text-sm transition-all flex items-center gap-2.5 shadow-sm active:scale-[0.98]"
              >
                <Search size={18} className="text-[var(--primary-red)]" />
                <span>Find Blood Near You</span>
              </button>
            </div>

            {/* Symmetrical Metric Trust Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-[var(--border-light)] dark:border-zinc-800/80 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">15,800+</p>
                <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">Verified Donors</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">4,290+</p>
                <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">Lives Restored</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">&lt; 15 min</p>
                <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5">Response Time</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Authority Live Status Card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-5 sm:p-6 border border-[var(--border-light)] dark:border-zinc-800 shadow-xl shadow-black/5 relative overflow-hidden">
              
              {/* Header of Live Card */}
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-light)] dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-[var(--primary-red)]">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)]">Emergency Dispatch</h3>
                    <p className="text-xs text-[var(--text-muted)]">Verified Medical Facilities</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Sync
                </div>
              </div>

              {/* Blood Group Grid Status */}
              <div className="py-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Live Blood Group Demand
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {bloodGroups.map((bg, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        bg.urgent
                          ? "bg-red-50/50 dark:bg-red-950/20 border-red-500/30"
                          : "bg-gray-50/50 dark:bg-zinc-800/30 border-[var(--border-light)] dark:border-zinc-800"
                      }`}
                    >
                      <span className={`text-xl font-extrabold block ${bg.urgent ? "text-[var(--primary-red)]" : "text-[var(--text-primary)]"}`}>
                        {bg.type}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider block mt-0.5 ${bg.urgent ? "text-red-600 dark:text-red-400" : "text-[var(--text-muted)]"}`}>
                        {bg.demand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-[var(--border-light)] dark:border-zinc-800/80 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="font-medium">100% Verified Hospitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[var(--primary-red)]" />
                  <span className="font-medium">24/7 Fast Response</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
