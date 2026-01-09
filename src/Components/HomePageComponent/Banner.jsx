import React, { useRef, useState } from "react";
import { Droplets, Search, Heart, MoveRight, Sparkles, Shield, Activity, Users, Zap, Target, Globe, Radio } from "lucide-react";
import { motion as Motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 35 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const [rainDrops] = useState(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${(i * 5) + (Math.random() * 5)}%`,
      duration: 5 + Math.random() * 8,
      delay: i * 0.3,
      scale: 0.3 + Math.random() * 0.7
    }))
  );

  const handleMouseMove = (e) => {
    if (bannerRef.current) {
      const rect = bannerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  return (
    <div 
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[var(--background-main)] min-h-[500px] flex items-center select-none py-12 md:py-16"
    >
      
      {/* High-Frequency Neural Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-soft-light" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
        
        {/* Animated Grid Connector (Static but glowing) */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-red-500/10 to-transparent" />

        {/* Kinetic Biometric Rain */}
        {rainDrops.map((d) => (
          <Motion.div
            key={d.id}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: ["0vh", "120vh"], opacity: [0, 0.5, 0] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "linear" }}
            className="absolute rounded-full"
            style={{ 
              left: d.left, 
              width: `${1.5 * d.scale}px`, 
              height: `${30 * d.scale}px`, 
              background: 'linear-gradient(to bottom, rgba(220,38,38,0.4), transparent)' 
            }}
          />
        ))}

        {/* Large Decorative Neural Blobs */}
        <Motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -right-[10%] w-[1000px] h-[1000px] bg-red-600/10 rounded-full blur-[200px]"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 h-full flex items-center">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left: Tactical Mission Content */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ultra-glass border border-red-500/20 shadow-xl">
                    <Activity size={8} className="text-red-600 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[var(--test-primary)]">Alpha-01 Node</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[8px] font-black uppercase tracking-[0.2em]">
                    <Globe size={10} />
                    <span>Link Active</span>
                 </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] leading-[1] tracking-[-0.04em] uppercase">
                  Vital <br />
                  <span className="text-gradient-crimson italic tracking-[-0.08em]">Network</span>
                </h1>
                <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium max-w-lg leading-[1.6] opacity-60">
                  Precision biological synchronization. We've mapped every drop to connect heroes with hearts in a single, high-frequency pulse.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Motion.button
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/register")}
                  className="group relative h-12 md:h-14 px-10 md:px-12 rounded-2xl bg-red-600 text-white font-black text-base md:text-lg shadow-[0_20px_40px_rgba(220,38,38,0.4)] overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-4">
                    <Zap size={24} className="group-hover:rotate-12 transition-transform fill-white" />
                    <span>SYNC NOW</span>
                  </div>
                </Motion.button>

                <Motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  onClick={() => navigate("/search")}
                  className="ultra-glass group flex items-center gap-4 text-base md:text-lg font-black text-[var(--text-primary)] px-8 md:px-10 py-2.5 md:py-3 rounded-2xl border border-white/10 transition-all shadow-2xl"
                >
                  <span>PROBE SECTORS</span>
                  <MoveRight size={24} className="group-hover:translate-x-2 transition-transform text-red-600" />
                </Motion.button>
              </div>

               {/* Precise Biological Metrics */}
              <div className="flex items-center gap-12 pt-3 mt-2 border-t border-white/5 opacity-80">
                {[
                  { l: "ACTIVE CARRIERS", v: "15.8K", i: Users, c: "red-600" },
                  { l: "LIFE RESTORED", v: "4,290", i: Heart, c: "rose-600" },
                  { l: "SYNC LEVEL", v: "100%", i: Activity, c: "blue-500" }
                ].map((s, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                     <div className="flex items-center gap-3">
                        <s.i size={14} className={`text-${s.c}`} />
                        <span className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">{s.v}</span>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">{s.l}</span>
                  </div>
                ))}
              </div>
            </Motion.div>
          </div>

          {/* Right: The Biometric Core Shard */}
          <div className="col-span-12 lg:col-span-5 hidden lg:flex justify-center items-center relative">
            <Motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full aspect-square max-w-[550px]"
            >
              {/* Glass Packaging */}
              <div className="w-full h-full ultra-glass rounded-[5rem] border border-white/20 shadow-[0_80px_120px_-30px_rgba(0,0,0,0.6)] flex items-center justify-center p-12 relative overflow-hidden group">
                 
                 {/* Liquid Core Turbulence */}
                 <Motion.div
                   animate={{ 
                    borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%"],
                    rotate: [0, 360]
                   }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-8 bg-red-600/10 blur-[100px] -z-10"
                 />

                 {/* The Master Drop SVG (Biological Focal Point) */}
                 <div className="relative z-10 scale-[1.2]">
                    <Motion.div 
                      animate={{ 
                        y: [0, -30, 0],
                        scale: [1, 1.08, 1],
                        filter: ["drop-shadow(0 40px 60px rgba(220,38,38,0.5))", "drop-shadow(0 60px 90px rgba(220,38,38,0.8))", "drop-shadow(0 40px 60px rgba(220,38,38,0.5))"]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                       <svg width="240" height="300" viewBox="0 0 220 300" fill="none">
                          <defs>
                            <radialGradient id="neural_core" cx="50%" cy="50%" r="50%" fx="50%" fy="30%">
                               <stop offset="0%" stopColor="#ff1111" />
                               <stop offset="70%" stopColor="#880000" />
                               <stop offset="100%" stopColor="#220000" />
                            </radialGradient>
                          </defs>
                          <path 
                            d="M110 0C110 0 0 135 0 210C0 270.751 49.2487 320 110 320C170.751 320 220 270.751 220 210C220 135 110 0 110 0Z" 
                            fill="url(#neural_core)" 
                          />
                          <ellipse cx="60" cy="180" rx="20" ry="40" fill="white" fillOpacity="0.2" transform="rotate(-15 60 180)" />
                          
                          <Motion.path 
                            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            transform="translate(85, 185) scale(2)"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                            fill="white" 
                          />
                       </svg>
                    </Motion.div>

                    {/* High-Frequency Orbital Array */}
                    {[Shield, Target, Radio, Activity].map((Icon, i) => (
                      <Motion.div
                        key={i}
                        animate={{ 
                          rotate: [0, 360],
                          x: [Math.cos((i * 1.57)) * 220, Math.cos((i * 1.57) + 6.28) * 220],
                          y: [Math.sin((i * 1.57)) * 220, Math.sin((i * 1.57) + 6.28) * 220]
                        }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 ultra-glass rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
                      >
                         <Icon size={24} className="text-red-600" />
                      </Motion.div>
                    ))}
                 </div>
              </div>

              {/* Geometric Shards for Depth */}
              <div className="absolute -inset-16 border border-white/5 rounded-[6rem] -z-10 translate-z-[-50px] opacity-40" />
              <div className="absolute -inset-24 border border-white/5 rounded-[7rem] -z-20 translate-z-[-100px] opacity-20" />
            </Motion.div>
          </div>

        </div>
      </div>
      
      {/* Sector Signal Identifier */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4 opacity-30">
         <Radio size={14} className="text-red-600 animate-pulse" />
         <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--test-primary)]">Biological Feedback Link : STABLE</span>
      </div>

    </div>
  );
};

export default Banner;
