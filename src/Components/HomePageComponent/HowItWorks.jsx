import React from "react";
import { UserPlus, BellRing, PhoneCall, Heart, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Register Profile",
      desc: "Create your confidential donor account with your blood group, district, and availability.",
    },
    {
      number: "02",
      icon: BellRing,
      title: "Receive Live Alerts",
      desc: "Get notified the moment a patient in your area requires an emergency transfusion matching your type.",
    },
    {
      number: "03",
      icon: PhoneCall,
      title: "Direct Coordination",
      desc: "Connect seamlessly with verified hospital staff and family coordinators to confirm appointment details.",
    },
    {
      number: "04",
      icon: Heart,
      title: "Save a Life",
      desc: "Complete your donation safely at the medical center and help someone return home to their family.",
    },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-main)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <Zap size={13} className="text-red-600" />
            <span>Simple, Transparent & Secure</span>
          </div>

          <h2 className="section-title">
            How VitalFlow <span className="text-gradient-crimson italic">Works</span>
          </h2>

          <p className="section-subtitle">
            A streamlined four-step journey designed to connect volunteer blood donors with patients in urgent need without bureaucracy or delay.
          </p>
        </div>

        {/* 4 Symmetric Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-[var(--border-light)] dark:border-zinc-800 flex flex-col justify-between transition-all hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/5 group"
            >
              <div>
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 flex items-center justify-center text-[var(--primary-red)] group-hover:scale-105 transition-transform">
                    <step.icon size={22} />
                  </div>
                  <span className="text-3xl font-extrabold text-[var(--border-light)] dark:text-zinc-800 tracking-tighter">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-red)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Step completion pill */}
              <div className="pt-3 mt-3 border-t border-[var(--border-light)] dark:border-zinc-800/80 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>Step {step.number} Protocol</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-[var(--border-light)] dark:border-zinc-800 text-xs font-semibold text-[var(--text-muted)]">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>Donor information is strictly confidential and shared only during confirmed emergency matching.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
