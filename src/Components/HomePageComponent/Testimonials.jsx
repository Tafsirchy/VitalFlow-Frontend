import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Heart, Star, ShieldCheck, Activity, Zap } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "SARAH AHMED",
      role: "BIOLOGICAL DONOR",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      quote: "VitalFlow synced my biological signal with a recipient in minutes. The precision of this transfer hub is unprecedented in my sector.",
      bloodType: "O+",
      donations: 5,
      impact: "CRITICAL SYNC",
      chroma: "rgba(100, 13, 20, 0.15)",
      accent: "#640d14"
    },
    {
      name: "DR. MICHAEL CHEN",
      role: "CORE COORDINATOR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      quote: "Connecting hearts at high frequency. VitalFlow's neural architecture has reduced sector response times by 85%.",
      bloodType: "A+",
      donations: 12,
      impact: "NETWORK GROWTH",
      chroma: "rgba(128, 14, 19, 0.15)",
      accent: "#800e13"
    },
    {
      name: "PRIYA PATEL",
      role: "LIFE RECIPIENT",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
      quote: "During my father's surgery, the pulse of the community was overwhelming. The network delivered life when every millisecond counted.",
      bloodType: "B+",
      donations: 3,
      impact: "GENESIS EVENT",
      chroma: "rgba(173, 40, 49, 0.15)",
      accent: "#ad2831"
    },
    {
      name: "JAMES RODS",
      role: "VETERAN DONOR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      quote: "Contributing a drop to the infinite. I've been part of the cluster for years, but this hub makes every transfer feel like a milestone.",
      bloodType: "AB+",
      donations: 18,
      impact: "18+ CIRCUITS",
      chroma: "rgba(56, 4, 14, 0.15)",
      accent: "#38040e"
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-12 bg-[var(--background-main)] relative overflow-hidden select-none">
      
      {/* Abstract Background Architecture */}
      <div className="absolute inset-0 pointer-events-none">
        <Motion.div 
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          style={{ backgroundColor: testimonials[currentIndex].chroma }}
          className="absolute inset-0 blur-[150px]"
        />
        <div className="absolute top-0 left-12 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        
        {/* Animated Particles */}
        {[...Array(5)].map((_, i) => (
          <Motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              x: (i * 200) - 400
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-0 w-1 h-20 bg-gradient-to-t from-red-600/20 to-transparent blur-sm"
            style={{ left: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
           <div className="relative">
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[var(--text-primary)] opacity-5 leading-[0.75] tracking-[-0.08em] uppercase absolute -top-8 -left-10 select-none">
                ECHOES
             </h2>
             <div className="relative z-10 space-y-4">
               <Motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="inline-flex items-center gap-3 px-6 py-2 rounded-full ultra-glass border border-[var(--glass-border)]"
               >
                 <Activity size={12} style={{ color: testimonials[currentIndex].accent }} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                    NETWORK SIGNALS
                 </span>
               </Motion.div>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter leading-none">
                   Voices of <br />
                   <span className="italic" style={{ color: testimonials[currentIndex].accent }}>The Vital Network</span>
                </h2>
             </div>
           </div>
           
           {/* Visual Progress Shard */}
           <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                 <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                 <Motion.circle 
                   cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" 
                   style={{ color: testimonials[currentIndex].accent }}
                   initial={{ strokeDasharray: "276 276", strokeDashoffset: 276 }}
                   animate={{ strokeDashoffset: 276 - (276 * (currentIndex + 1)) / testimonials.length }}
                   transition={{ duration: 0.8 }}
                 />
              </svg>
              <span className="absolute text-xl font-black text-[var(--text-primary)] opacity-80 italic">
                 0{currentIndex+1}
              </span>
           </div>
        </div>

        {/* Cinematic Display Area */}
        <div className="relative min-h-[350px] lg:min-h-[400px] flex items-center">
           <AnimatePresence mode="wait">
             <Motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full"
             >
                
                {/* Visual Shard (The Reviewer) */}
                <div className="lg:col-span-4 relative group/shard">
                   <div className="relative w-full aspect-[3/4] max-w-[300px] mx-auto lg:mx-0 rounded-[1rem] overflow-hidden ultra-glass border border-white/10 shadow-2xl">
                      <Motion.img 
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover/shard:grayscale-0 group-hover/shard:opacity-100 transition-all duration-700" 
                      />
                      
                      {/* Neural Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      <Motion.div 
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-px bg-white/10 z-10"
                      />
 
                      {/* Identity Badge */}
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl ultra-glass border border-[var(--glass-border)] backdrop-blur-xl">
                         <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: testimonials[currentIndex].accent }}>
                            {testimonials[currentIndex].impact}
                         </p>
                         <h4 className="text-xl font-black text-white tracking-widest uppercase">
                            {testimonials[currentIndex].name}
                         </h4>
                      </div>
                   </div>
                   
                   {/* Floating Blood Halo */}
                   <Motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 3, repeat: Infinity }}
                     className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl z-20 font-black text-white text-sm"
                     style={{ backgroundColor: testimonials[currentIndex].accent }}
                   >
                      {testimonials[currentIndex].bloodType}
                   </Motion.div>
                </div>
 
                {/* Content Shard */}
                <div className="lg:col-span-8 space-y-8">
                   <div className="relative">
                      <Quote className="absolute -top-6 -left-6 opacity-5" size={80} style={{ color: testimonials[currentIndex].accent }} />
                      <Motion.p 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-primary)] opacity-90 italic leading-tight tracking-tighter relative z-10"
                      >
                         "{testimonials[currentIndex].quote}"
                      </Motion.p>
                   </div>
 
                   <div className="flex flex-wrap items-center gap-8">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">DESIGNATION</p>
                         <h5 className="text-sm font-bold text-[var(--text-primary)] tracking-widest uppercase">{testimonials[currentIndex].role}</h5>
                      </div>
                      
                      <div className="h-8 w-px bg-[var(--glass-border)]" />
 
                      <div className="space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">SYNC RATING</p>
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Motion.div
                                key={i}
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  backgroundColor: i < 4 ? testimonials[currentIndex].accent : "rgba(255,255,255,0.1)"
                                }}
                                transition={{ delay: i * 0.1 }}
                                className="w-4 h-1 rounded-full"
                              />
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
 
             </Motion.div>
           </AnimatePresence>
 
           {/* Fixed Static Controls */}
           <div className="absolute -bottom-10 right-0 flex gap-4 z-30">
              <button 
                onClick={prev} 
                className="w-12 h-12 rounded-full ultra-glass border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group"
              >
                 <ChevronLeft size={20} className="text-white group-hover:scale-125 transition-transform" />
              </button>
              <button 
                onClick={next} 
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-xl"
                style={{ backgroundColor: testimonials[currentIndex].accent }}
              >
                 <ChevronRight size={20} className="text-white" />
              </button>
           </div>
        </div>
 
        {/* Verification Strip */}
        <div className="mt-8 pt-6 border-t border-[var(--glass-border)] flex flex-wrap gap-8 opacity-40">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} style={{ color: testimonials[currentIndex].accent }} />
              <span className="text-[10px] font-black tracking-widest text-[var(--text-primary)] uppercase">Neural Identity Verified</span>
           </div>
           <div className="flex items-center gap-2">
              <Zap size={14} style={{ color: testimonials[currentIndex].accent }} />
              <span className="text-[10px] font-black tracking-widest text-[var(--text-primary)] uppercase">Quantum Signal Sync</span>
           </div>
        </div>
 
      </div>
    </section>
  );
};

export default Testimonials;
