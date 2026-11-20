import React from "react";
import { Users, Heart, MapPin, ShieldCheck, Activity } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      value: "15,800+",
      label: "Registered Donors",
      description: "Active voluntary donors ready to answer calls for emergency transfusions across all blood groups."
    },
    {
      icon: Heart,
      value: "4,290+",
      label: "Lives Restored",
      description: "Direct matches completed in critical trauma, maternal care, and surgical interventions."
    },
    {
      icon: MapPin,
      value: "64",
      label: "Districts Covered",
      description: "Comprehensive nationwide presence enabling rapid local donor dispatch within minutes."
    },
    {
      icon: ShieldCheck,
      value: "99.8%",
      label: "Verification Rate",
      description: "Every single blood request is authenticated directly with attending medical personnel."
    }
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-section)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <Activity size={13} className="text-red-600" />
            <span>Verified Impact Metrics</span>
          </div>

          <h2 className="section-title">
            Our Collective <span className="text-gradient-crimson italic">Impact</span>
          </h2>

          <p className="section-subtitle">
            Real-time data demonstrating how our community of donors and certified hospitals are transforming emergency blood delivery nationwide.
          </p>
        </div>

        {/* 4 Symmetric Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-[var(--border-light)] dark:border-zinc-800 flex flex-col justify-between transition-all hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/5 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 flex items-center justify-center text-[var(--primary-red)] mb-4 group-hover:scale-105 transition-transform">
                  <stat.icon size={22} />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-1">
                  {stat.value}
                </p>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                  {stat.label}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                  {stat.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[var(--border-light)] dark:border-zinc-800/80 flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                <span>Verified Metric</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Live</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Statistics;
