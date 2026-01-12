import React, { useMemo, useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  TrendingUp, 
  Shield, 
  Activity, 
  Droplet,
  Zap,
  Globe,
  Clock,
  CheckCircle2
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
  const circles = useMemo(() => 
    [...Array(20)].map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 1000,
      r: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    })), []);

  const paths = useMemo(() => [
    { d: "M0,500 Q250,200 500,500 T1000,500", duration: 5, delay: 0 },
    { d: "M0,300 Q300,600 600,300 T1000,300", duration: 7, delay: 1 }
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.4] dark:opacity-[0.15]">
      <svg className="w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-red)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <Motion.path
            key={i}
            d={p.d}
            fill="none"
            stroke="url(#neural-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
        {circles.map((c, i) => (
          <Motion.circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="var(--primary-red)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ 
              duration: c.duration, 
              repeat: Infinity, 
              delay: c.delay 
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// --- Sub-component: Text Scramble (Simulated) ---
const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const About = () => {
  const stats = [
    { icon: Users, value: "15,000+", label: "Active Carriers" },
    { icon: Heart, value: "3,200+", label: "Restored Lives" },
    { icon: TrendingUp, value: "98%", label: "Sync Accuracy" },
    { icon: Shield, value: "24/7", label: "Neural Support" },
  ];

  const team = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Strategic Executive",
      image: "https://i.pravatar.cc/300?img=45",
      bio: "Medical visionary architecting the next generation of circulatory networks.",
    },
    {
      name: "Michael Chen",
      role: "Medical Director",
      image: "https://i.pravatar.cc/300?img=12",
      bio: "Master of transfusion protocols and biological synchronization systems.",
    },
    {
      name: "Priya Patel",
      role: "Community Liaison",
      image: "https://i.pravatar.cc/300?img=32",
      bio: "Orchestrating the human-circuit connections for maximum life-flow.",
    },
  ];

  const coreValues = [
    { icon: Shield, title: "Verified Nodes", desc: "Every carrier undergoes a rigorous biological authentication process." },
    { icon: Clock, title: "Temporal Priority", desc: "Emergency protocols active 24/7 for instantaneous signal matching." },
    { icon: Zap, title: "Neural Linkage", desc: "Advanced algorithm ensures the closest matches in the circulatory grid." },
    { icon: Globe, title: "Global Sync", desc: "A world without boundaries where life-flow is accessible to all biotypes." },
    { icon: Activity, title: "Carrier Centric", desc: "Empowering donors through a community-driven technological ecosystem." },
    { icon: CheckCircle2, title: "Zero Latency", desc: "Completely free platform ensuring every drop connects without delay." },
  ];

  return (
    <div className="bg-[var(--background-main)] font-sans selection:bg-red-500/30">      
      <main className="relative pt-10 overflow-hidden">
        <NeuralBackground />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24 mt-16 px-4">
            <div className="space-y-6 text-left max-w-2xl">
              <Motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full ultra-glass border border-[var(--primary-red)]/20"
              >
                <Activity size={14} className="text-[var(--primary-red)] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                  Strategic Protocol v.0.1
                </span>
              </Motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
                <ScrambleText text="The Vision" /> <br />
                <span className="text-gradient-crimson italic">Beyond Circulations</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] font-medium opacity-60 leading-relaxed max-w-xl">
                VitalFlow is not just a platform; it's a synthetic heartbeat designed to synchronize the global circulatory grid. We identify the silence between heartbeats and bridge it with life.
              </p>
            </div>
            
            <Motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex justify-center gap-6 flex-wrap lg:mb-4"
            >
              <div className="p-8 ultra-glass rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary-red)]/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all group-hover:bg-[var(--primary-red)]/10" />
                <div className="relative text-center">
                  <Droplet className="text-[var(--primary-red)] mx-auto mb-4 animate-bounce" size={40} />
                  <p className="text-4xl font-black text-[var(--text-primary)] leading-none mb-1">100%</p>
                  <p className="text-[10px] font-black text-[var(--text-muted)] tracking-widest uppercase">Pure Altruism</p>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* Tactical Objectives Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {[
              { 
                title: "Tactical Mission", 
                icon: Target, 
                desc: "To engineer a seamless circulatory bridge where technology meets biological necessity, ensuring zero latency in life-flow restoration.",
                glow: "from-[var(--primary-red)]/20" 
              },
              { 
                title: "Global Vision", 
                icon: Award, 
                desc: "A globally synchronized grid where every person in need of biological carriers has immediate uplink to verified, compatible donors.",
                glow: "from-blue-500/10" 
              }
            ].map((obj, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group h-full"
              >
                <div className="relative ultra-glass rounded-[3rem] p-10 border border-white/10 dark:border-white/5 h-full flex flex-col items-start hover:border-[var(--primary-red)]/30 transition-all duration-500 shadow-3xl overflow-hidden">
                  <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${obj.glow} rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-700`} />
                  
                  <div className="w-16 h-16 bg-white dark:bg-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] rounded-2xl flex items-center justify-center mb-8 shrink-0">
                    <obj.icon className="text-[var(--primary-red)]" size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">{obj.title}</h2>
                  <p className="text-lg text-[var(--text-secondary)] font-medium opacity-70 leading-relaxed italic">
                    {obj.desc}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>

          {/* Neural Links / Stats */}
          <div className="mb-20">
            <Motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="text-center p-8 ultra-glass rounded-3xl border border-white/10 group"
                  >
                    <div className="w-14 h-14 bg-[var(--primary-red)]/5 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-[var(--primary-red)]/30 transition-all">
                      <Icon className="text-[var(--primary-red)]" size={28} />
                    </div>
                    <div className="text-4xl font-black text-[var(--text-primary)] mb-2 tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-black text-[var(--text-muted)] tracking-widest uppercase">
                      {stat.label}
                    </div>
                  </Motion.div>
                );
              })}
            </Motion.div>
          </div>

          {/* Core Operatives / Team */}
          <section className="mb-32">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-4">
                Core <span className="text-gradient-crimson italic">Operatives</span>
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[var(--primary-red)] to-transparent mx-auto rounded-full" />
            </Motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-full flex flex-col"
                >
                  <div className="relative h-full ultra-glass rounded-[3rem] p-10 border border-white/10 hover:border-[var(--primary-red)]/40 transition-all duration-500 shadow-2xl flex flex-col items-center">
                    <div className="relative mb-8 pt-4">
                      <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden ring-4 ring-[var(--primary-red)]/20 ring-offset-8 ring-offset-[var(--background-main)] shadow-2xl transition-all group-hover:ring-[var(--primary-red)]/50 group-hover:-translate-y-2">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-xl shadow-lg border-2 border-white">
                        <Zap size={14} className="text-white fill-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight text-center mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[10px] bg-[var(--primary-red)]/10 text-[var(--primary-red)] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
                      {member.role}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] text-center leading-relaxed font-semibold line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </section>

          {/* Grid Advantages */}
          <section className="pb-32">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                Circulatory <span className="italic text-gradient-crimson">Advantage</span>
              </h2>
            </Motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((feature, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/5 dark:bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-[var(--primary-red)]/[0.03] hover:border-[var(--primary-red)]/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      <feature.icon className="text-[var(--primary-red)]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tight mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] opacity-70 leading-relaxed font-semibold">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
