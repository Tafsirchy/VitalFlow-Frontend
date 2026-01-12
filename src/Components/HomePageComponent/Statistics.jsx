import React, { useEffect, useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { TrendingUp, Users, MapPin, Heart, Activity, Globe, ShieldCheck, Zap } from "lucide-react";

// --- Custom Hooks ---

// Scramble Text Hook
const useScrambleText = (finalValue, duration = 1500, isVisible = false) => {
  const [displayValue, setDisplayValue] = useState("");
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;
    const valueStr = String(finalValue);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const scrambled = valueStr
        .split("")
        .map((char, i) => {
          if (progress > (i / valueStr.length)) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayValue(scrambled);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [finalValue, duration, isVisible]);

  return displayValue;
};

// --- Sub-components ---

// ECG Pulse Wave Component
const ECGSymbol = ({ className }) => {
  return (
    <svg viewBox="0 0 100 40" className={className} preserveAspectRatio="none">
      <Motion.path
        d="M 0 20 L 30 20 L 35 15 L 40 25 L 45 5 L 50 35 L 55 20 L 60 20 L 65 15 L 70 20 L 100 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1],
          opacity: [0, 1, 0],
          pathOffset: [0, 0, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.5, 1]
        }}
      />
      <Motion.path
        d="M 0 20 L 30 20 L 35 15 L 40 25 L 45 5 L 50 35 L 55 20 L 60 20 L 65 15 L 70 20 L 100 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
      />
    </svg>
  );
};

// Vital Circular Gauge
const VitalGauge = ({ progress, isActive, colorClass }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Track */}
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          className="stroke-[var(--glass-border)]"
          fill="none"
          strokeWidth="4"
        />
        {/* Progress Arc */}
        <Motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className={colorClass}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? progress : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
      {/* Pulse Outer Ring */}
      <Motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`absolute inset-0 rounded-full border-2 ${colorClass}`}
      />
    </div>
  );
};

const StatisticsCard = ({ stat, index, isVisible }) => {
  const scrambledValue = useScrambleText(stat.value, 2000, isVisible);
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 10;
    const y = (e.clientX - rect.left - rect.width / 2) / -10;
    setRotate({ x, y });
  };

  return (
    <Motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        perspective: 1000,
        rotateX: rotate.x,
        rotateY: rotate.y,
        transition: "all 0.1s ease-out"
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative group h-[280px]"
    >
      <div className="absolute inset-0 rounded-[2rem] glass-morphism overflow-hidden">
        {/* Biometric Background Detail */}
        <div className="absolute top-4 right-4 opacity-10">
          <Globe size={80} className="text-[var(--text-primary)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-full items-center text-center">
          {/* Gauge Icon Container */}
          <div className="w-20 h-20 relative mb-4">
            <VitalGauge 
              progress={index === 0 ? 0.8 : index === 1 ? 0.6 : index === 2 ? 0.9 : 0.99} 
              isActive={isVisible} 
              colorClass="text-[var(--primary-red)]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <stat.icon className="text-[var(--text-primary)]" size={24} />
            </div>
          </div>

          {/* Scrambled Number */}
          <h3 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-1 tracking-tighter">
            {scrambledValue}{stat.suffix}
          </h3>
          
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary-red)] mb-4 bg-[var(--primary-red)]/5 px-3 py-1 rounded-full border border-[var(--primary-red)]/10">
            {stat.label}
          </p>

          <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed px-4 mb-4">
            {stat.desc}
          </p>

          {/* ECG Footer */}
          <div className="mt-auto w-full pt-4 border-t border-[var(--glass-border)] flex flex-col items-center">
            <ECGSymbol className="w-full h-8 text-[var(--primary-red)]" />
            <div className="flex justify-between w-full mt-2 px-2">
              <span className="text-[8px] text-[var(--text-muted)] font-mono">BPM: SYNCED</span>
              <span className="text-[8px] text-green-600 font-mono font-bold animate-pulse">● LIVE_NODE</span>
            </div>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-red)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Motion.div>
  );
};

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      icon: Users,
      value: 15842,
      label: "Active Donors",
      desc: "Verified blood donors linked to the central cluster",
      suffix: ""
    },
    {
      icon: Heart,
      value: 4290,
      label: "Lives Saved",
      desc: "Emergency procedures completed successfully",
      suffix: ""
    },
    {
      icon: MapPin,
      value: 64,
      label: "Districts",
      desc: "Full geometric coverage across neural sector",
      suffix: ""
    },
    {
      icon: TrendingUp,
      value: 99.8,
      label: "Success Rate",
      desc: "Biological compatibility verification precision",
      suffix: "%"
    }
  ];

  return (
    <section className="relative py-20 bg-[var(--background-main)] overflow-hidden transition-colors duration-500">
      
      {/* Bio-Digital Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Morphing Liquid Blobs */}
        <Motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--primary-red)]/5 blur-[120px] rounded-full"
        />
        <Motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[var(--primary-red)]/10 blur-[100px] rounded-full"
        />

        {/* Neural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, var(--primary-red) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border-2 border-red-500/30 text-[var(--primary-red)]"
          >
            <Activity size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Impact Monitor v.02</span>
          </Motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
            Network <span className="text-gradient-crimson italic">Bio-Metrics</span>
          </h2>
          
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-sm lg:text-base font-medium font-mono uppercase">
            &gt; Real-time synchronization with active life-saving nodes across the biological cluster.
          </p>
        </div>

        {/* Cards Grid */}
        <Motion.div 
          onViewportEnter={() => setIsVisible(true)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <StatisticsCard 
              key={idx} 
              stat={stat} 
              index={idx} 
              isVisible={isVisible} 
            />
          ))}
        </Motion.div>

        {/* Footer Technical Detail */}
        <div className="mt-20 flex flex-col lg:flex-row items-center justify-between gap-8 border-t border-[var(--glass-border)] pt-10">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">System Load</div>
              <div className="h-1 w-32 bg-[var(--primary-red)]/10 rounded-full overflow-hidden">
                <Motion.div 
                  animate={{ width: ["10%", "85%", "40%", "95%"] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="h-full bg-[var(--primary-red)]"
                />
              </div>
            </div>
            <div className="space-y-1 text-right lg:text-left">
              <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">Nodes Active</div>
              <div className="text-xs text-[var(--text-primary)] font-mono font-bold">1.25k Signal Cluster</div>
            </div>
          </div>

          <div className="flex gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-lg border border-[var(--glass-border)] flex items-center justify-center text-[10px] text-[var(--text-muted)] font-mono">
                0{i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Statistics;
