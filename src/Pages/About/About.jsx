import React from "react";
import { motion as Motion } from "framer-motion";
import {
  Users,
  Target,
  Heart,
  Award,
  TrendingUp,
  Shield,
  Activity,
  Droplet,
  Globe,
  Clock,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "15,800+", label: "Active Donors" },
    { icon: Heart, value: "4,290+", label: "Lives Assisted" },
    { icon: Globe, value: "64", label: "Districts Covered" },
    { icon: Shield, value: "24/7", label: "Emergency Support" },
  ];

  const team = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80",
      bio: "Hematologist and transfusion specialist leading our clinical protocols and safety verification standards.",
    },
    {
      name: "Michael Chen",
      role: "Director of Operations",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&q=80",
      bio: "Logistics strategist coordinating nationwide emergency hospital integrations and volunteer networks.",
    },
    {
      name: "Priya Patel",
      role: "Head of Community Outreach",
      image: "https://images.unsplash.com/photo-1594824813583-009148d4e9d0?w=400&h=400&fit=crop&q=80",
      bio: "Advocate dedicated to donor mobilization, university campaigns, and community awareness drives.",
    },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Verified Donors",
      desc: "Every voluntary donor profile is verified with active contact points and eligibility confirmation before matching.",
    },
    {
      icon: Clock,
      title: "Emergency Response",
      desc: "Our automated dispatch notifies nearby voluntary donors immediately when critical blood units are needed.",
    },
    {
      icon: Globe,
      title: "Nationwide Reach",
      desc: "Comprehensive active network spanning all 64 districts and 495 upazilas across Bangladesh.",
    },
    {
      icon: HeartHandshake,
      title: "100% Free & Altruistic",
      desc: "VitalFlow operates strictly as a humanitarian service. No charges or fees are ever levied on patients or donors.",
    },
    {
      icon: Activity,
      title: "Clinical Safety First",
      desc: "All donations are conducted exclusively at registered medical hospitals and blood transfusion centers.",
    },
    {
      icon: CheckCircle2,
      title: "Community Trust",
      desc: "Transparent coordination with verified hospital personnel, patient families, and civic volunteers.",
    },
  ];

  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
            <div className="section-eyebrow">
              <Heart size={13} className="text-[var(--primary-red)] fill-current" />
              <span>Our Mission & Vision</span>
            </div>
            <h1 className="section-title">
              Bridging the Distance Between <br />
              <span className="text-gradient-crimson italic">Every Drop & Every Life</span>
            </h1>
            <p className="section-subtitle">
              VitalFlow was founded on a simple premise: no patient in Bangladesh should lose their life waiting for compatible blood. We unite voluntary donors, hospitals, and families into one seamless humanitarian network.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-10">
            <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-[var(--primary-red)]/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-[var(--primary-red)] flex items-center justify-center mb-4">
                  <Target size={24} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                  Our Mission
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  To eliminate preventable fatalities resulting from blood scarcity by providing a dependable, real-time, and 100% voluntary blood matching platform accessible to every citizen regardless of geographical barriers.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[var(--border-light)] flex items-center gap-2 text-xs font-bold text-[var(--primary-red)]">
                <CheckCircle2 size={15} />
                <span>Zero Latency Emergency Matching</span>
              </div>
            </div>

            <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-[var(--primary-red)]/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-[var(--primary-red)] flex items-center justify-center mb-4">
                  <Award size={24} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                  Our Vision
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  A society where voluntary blood donation is a celebrated civic culture, where every medical facility maintains immediate access to verified donors, and where technology serves humanitarian dignity.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[var(--border-light)] flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={15} />
                <span>Universal Blood Security</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8 lg:mb-10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 text-center shadow-sm"
              >
                <stat.icon className="text-[var(--primary-red)] mx-auto mb-2" size={22} />
                <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Core Values / Pillars */}
          <div className="mb-8 lg:mb-10">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-2">
                Our Core Pillars
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                The standards and values that guide our operations every day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 hover:border-[var(--primary-red)]/30 transition-all shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <val.icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-[var(--text-primary)] mb-1.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-2">
                Clinical & Advisory Leadership
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Experienced medical professionals and operations leaders overseeing the VitalFlow network.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 text-center shadow-sm flex flex-col items-center hover:border-[var(--primary-red)]/30 transition-all"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-red-500/20 mb-3.5 shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] mb-0.5">
                    {member.name}
                  </h3>
                  <span className="text-[11px] font-bold text-[var(--primary-red)] uppercase tracking-wider mb-2.5 block">
                    {member.role}
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
