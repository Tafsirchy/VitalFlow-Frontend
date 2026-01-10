import React, { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { Heart, MapPin, Calendar, Sparkles, MoveRight, Star, Activity, Zap, Shield, Target, Radio } from "lucide-react";
import emergencyImg from "../../assets/success_story_emergency.png";
import communityImg from "../../assets/success_story_community.png";
import rareBloodImg from "../../assets/success_story_rare_blood.png";
import milestoneImg from "../../assets/success_story_milestone.png";
import gsap from "gsap";

const SuccessStories = () => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const targetScrollLeft = useRef(0);
  const scrollTracker = useRef({ value: 0 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftAtStart = useRef(0);

  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x"
  });

  // Smoothed Wheel-to-Horizontal Bridge logic (GSAP + Lenis Harmony)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Synchronize virtual tracker with initial scroll state
    scrollTracker.current.value = el.scrollLeft;
    targetScrollLeft.current = el.scrollLeft;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 1) return;
      
      const canScrollLeft = el.scrollLeft > 2;
      const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 2;

      if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
        e.preventDefault();
        
        // Extreme Pacing coefficient: 0.15 (Ultra-slow for one-by-one feel)
        const slowDelta = e.deltaY * 0.15;
        targetScrollLeft.current = Math.max(
          0,
          Math.min(el.scrollWidth - el.clientWidth, targetScrollLeft.current + slowDelta)
        );

        // GSAP-powered ultra-smooth glide
        gsap.to(el, {
          scrollLeft: targetScrollLeft.current,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    // --- Drag-to-Scroll (Grab) Logic with GSAP ---
    const onMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftAtStart.current = el.scrollLeft;
      el.classList.add('cursor-grabbing');
      el.classList.remove('cursor-grab');
      gsap.killTweensOf(el); // Stop any ongoing wheel animations
    };

    const stopDragging = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      el.classList.add('cursor-grab');
      el.classList.remove('cursor-grabbing');
      
      // Update the bridge target so wheel-scroll picks up from here
      targetScrollLeft.current = el.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.2; // Optimized drag sensitivity
      
      el.scrollLeft = scrollLeftAtStart.current - walk;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);
    el.addEventListener("mouseleave", stopDragging);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      el.removeEventListener("mouseleave", stopDragging);
      gsap.killTweensOf(el);
    };
  }, []);
  
  // Kinetic background typography (Opposite direction + Parallax)
  const bgTextX = useTransform(scrollXProgress, [0, 1], ["-15%", "15%"]);
  
  // Chroma Shift: Background intensity shifts from Deep Crimson to Midnight Blue based on scroll
  const backgroundColor = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    ["rgba(10, 10, 10, 1)", "rgba(20, 5, 5, 1)", "rgba(5, 5, 20, 1)"]
  );

  // Vertical parallax for background shards
  const shardY = useTransform(scrollXProgress, [0, 1], [0, -300]);

  const stories = [
    {
      title: "The 2-Hour Miracle",
      desc: "Emergency O+ units synced and delivered to the Alpha sector within a 120-minute window, saving a critical patient.",
      location: "Central Med Core",
      date: "DEC 2025",
      image: emergencyImg,
      impact: "LIFE RESTORED",
      tags: ["Emergency", "O+ Cluster"],
      vitalId: "SIG-882-X",
      chroma: "from-red-600/20"
    },
    {
      title: "Community Grid",
      desc: "50+ biological donors linked life-streams to support a pediatric ward for an entire month cycle.",
      location: "Coastal Sector Hub",
      date: "NOV 2025",
      image: communityImg,
      impact: "50+ SYNCED",
      tags: ["Community", "Long-term"],
      vitalId: "GRID-SYNC-50",
      chroma: "from-blue-600/20"
    },
    {
      title: "Genesis Flow",
      desc: "One rare AB- donor traveled across 3 sectors to save a mother in active labor. Dual survival confirmed.",
      location: "Highland Sector",
      date: "OCT 2025",
      image: rareBloodImg,
      impact: "SURVIVAL SYNC",
      tags: ["Rare Blood", "Emergency"],
      vitalId: "GEN-002-LIFE",
      chroma: "from-rose-600/20"
    },
    {
      title: "Network Milestone",
      desc: "Our 1000th successful transfer mission completed, marking a new era in biological connectivity.",
      location: "Global Grid",
      date: "SEP 2025",
      image: milestoneImg,
      impact: "1000 MISSIONS",
      tags: ["Global", "Trust"],
      vitalId: "NET-1000-FIN",
      chroma: "from-emerald-600/20"
    }
  ];

  return (
    <Motion.section 
      ref={targetRef} 
      style={{ backgroundColor }}
      className="relative pt-10 pb-20 transition-colors duration-1000 select-none overflow-hidden"
    >
      
      {/* Container For Horizontal Snap Scroll */}
      <div className="relative flex flex-col">
        
        {/* Neural Data Stream: Background Glitch/Code visuals */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
           {[...Array(10)].map((_, i) => (
             <Motion.div
               key={i}
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
               className="text-[8px] font-mono text-white whitespace-nowrap absolute"
               style={{ top: `${i * 10}%` }}
             >
                {Array(50).fill("0101 AF-99 SYNC_ERROR_NULL SIGNAL_RESTORED ").join("")}
             </Motion.div>
           ))}
        </div>

        {/* Kinetic Background Typography (Mega-Text) */}
        <Motion.div 
          style={{ x: bgTextX }}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.04] pointer-events-none select-none"
        >
           <h2 className="text-[35rem] lg:text-[45rem] font-black text-white leading-none flex gap-60">
              <span>CHRONICLES</span>
              <span>PROTOCOLS</span>
              <span>ARCHIVE</span>
           </h2>
        </Motion.div>

        {/* Floating Neural Shards (Parallax) */}
        <Motion.div 
          style={{ y: shardY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
           <div className="absolute top-1/4 left-1/4 w-40 h-40 ultra-glass rounded-full blur-[100px] bg-red-600/20 animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-60 h-60 ultra-glass rounded-full blur-[120px] bg-blue-600/10" />
           <div className="absolute top-1/3 left-1/3 w-px h-[1000px] bg-gradient-to-b from-transparent via-red-500/10 to-transparent rotate-45" />
           <div className="absolute top-0 right-1/4 w-px h-[1000px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent -rotate-12" />
        </Motion.div>

        {/* Content Header Area */}
        <div className="relative z-20 w-11/12 mx-auto pt-10 pb-6">
           <div className="space-y-4">
              <Motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full ultra-glass border border-red-500/20 shadow-xl"
              >
                 <Activity size={12} className="text-red-600 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                    Mission Archive Vol. 01 // Deep Sync
                 </span>
              </Motion.div>
              <div className="relative">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tighter uppercase">
                    History <br />
                    <span className="text-gradient-crimson italic tracking-[-0.05em]">Archive</span>
                 </h2>
                 {/* Scanline decoration */}
                 <Motion.div 
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-px bg-red-600/20 blur-[1px] -z-10" 
                 />
              </div>
           </div>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 flex items-end overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="flex gap-8 pl-[4.166%] items-end relative z-10 flex-nowrap pt-8 pr-[4.166%]">
               {stories.map((story, i) => (
                 <div key={i} className="flex-shrink-0 w-[85vw] lg:w-[42vw] max-w-2xl h-[320px] group relative snap-center">
                    
                    {/* Neural Pulse Link (Abstract connector) */}
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-px bg-gradient-to-r from-red-600 to-transparent z-20 opacity-20 group-hover:opacity-100 group-hover:w-20 transition-all duration-700" />
                    
                    <Motion.div 
                       className="relative w-full h-full ultra-glass rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_-25px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row backdrop-blur-3xl group-hover:border-red-500/40 transition-colors duration-700"
                    >
                   
                   {/* Visual Half with Decryption Scan */}
                   <div className="relative w-full lg:w-[40%] h-1/2 lg:h-full overflow-hidden">
                      <Motion.img 
                        whileHover={{ scale: 1.1, filter: "contrast(1.2)" }}
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${story.chroma} to-transparent opacity-60`} />
                      
                      {/* Biometric Vital Badge (Interactive) */}
                      <Motion.div 
                        whileHover={{ x: 5 }}
                        className="absolute bottom-3 left-3 py-1.5 px-3 rounded-lg ultra-glass border border-white/20 shadow-2xl space-y-0.5 group/vital"
                      >
                         <div className="flex items-center gap-2">
                            <Radio size={6} className="text-red-500 animate-pulse" />
                            <p className="text-[6px] font-black uppercase text-red-500 tracking-[0.3em]">Protocol Linked</p>
                         </div>
                         <p className="text-xs font-black text-white tracking-widest uppercase">{story.vitalId}</p>
                      </Motion.div>
 
                      {/* Floating Impact Node */}
                      <div className="absolute top-3 left-3 py-1 px-3 rounded-lg ultra-glass border border-white/20 shadow-2xl flex items-center gap-2">
                         <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                         </div>
                         <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white">{story.impact}</span>
                      </div>
                   </div>
 
                   {/* Content Half (Tactical Layout) */}
                   <div className="flex-1 p-4 flex flex-col justify-between relative">
                      
                      {/* Ghost Background Logo */}
                      <div className="absolute -bottom-10 -right-10 opacity-[0.03] scale-[2.5] group-hover:opacity-[0.06] group-hover:rotate-45 transition-all duration-1000 pointer-events-none">
                         <Shield size={60} className="text-white" />
                      </div>
 
                      <div className="space-y-3 relative z-10">
                         <div className="flex flex-wrap gap-2">
                            {story.tags.map((tag, j) => (
                               <span key={j} className="px-2 py-0.5 rounded-full bg-red-600/5 border border-red-500/10 text-[7px] font-black uppercase text-red-600 tracking-[0.2em] backdrop-blur-md">{tag}</span>
                            ))}
                         </div>
                         <div className="space-y-1">
                            <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white leading-tight tracking-tighter uppercase">
                               {story.title}
                            </h3>
                            <p className="text-[10px] md:text-xs text-white/50 font-medium leading-relaxed max-w-md italic line-clamp-2">
                               "{story.desc}"
                            </p>
                         </div>
                      </div>
 
                      {/* Creative Data Stream (Neural Visualization) */}
                      <div className="relative py-2 space-y-2 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                               <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40">Neural Link Active</span>
                            </div>
                            <span className="text-[7px] font-mono text-white/20">0X{i}F-SYNC-PROT</span>
                         </div>
                         
                         {/* Heartbeat Waveform */}
                         <div className="h-8 flex items-end gap-[2px] px-1">
                            {[...Array(24)].map((_, idx) => (
                               <Motion.div 
                                 key={idx}
                                 animate={{ 
                                   height: ["10%", `${Math.random() * 80 + 10}%`, "10%"],
                                   backgroundColor: ["rgba(220,38,38,0.2)", "rgba(220,38,38,0.6)", "rgba(220,38,38,0.2)"]
                                 }}
                                 transition={{ 
                                   duration: 1.2, 
                                   repeat: Infinity, 
                                   delay: idx * 0.05,
                                   ease: "easeInOut"
                                 }}
                                 className="w-[3px] rounded-full"
                               />
                            ))}
                         </div>
 
                         <div className="flex justify-between items-center text-[6px] font-mono text-white/10 tracking-widest uppercase px-1">
                            <div className="flex gap-4">
                               <span>Stability: Optimal</span>
                               <span>Latency: 0.{i}4ms</span>
                            </div>
                            <span>Vol: 1.{i}V</span>
                         </div>
                      </div>
 
                       <div className="flex items-end justify-between border-t border-white/10 pt-2 mt-1 gap-2">
                          <div className="grid grid-cols-1 gap-0.5">
                             <div className="flex items-center gap-2 text-white/40">
                                <div className="w-4 h-px bg-red-600/50" />
                                <MapPin size={8} className="text-red-600" />
                                <span className="text-[7px] font-black uppercase tracking-[0.1em]">{story.location}</span>
                             </div>
                             <div className="flex items-center gap-2 text-white/40">
                                <div className="w-4 h-px bg-blue-600/30" />
                                <Calendar size={8} />
                                <span className="text-[7px] font-bold tracking-[0.05em]">{story.date}</span>
                             </div>
                          </div>
                          
                          <Motion.button 
                            whileHover={{ scale: 1.1, rotate: 180, backgroundColor: "#fff", color: "#000" }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_5px_10px_rgba(220,38,38,0.2)] transition-all duration-500 z-10"
                          >
                             <Zap size={14} />
                          </Motion.button>
                       </div>
                   </div>

                </Motion.div>
             </div>
           ))}

           {/* The "Deep Neural Access" Terminal (World-Class Finale) */}
           <div className="flex-shrink-0 w-[240px] h-[320px] flex items-center justify-center p-1 relative snap-end">
              <Motion.div 
                className="text-center space-y-2 group cursor-pointer relative z-10 ultra-glass p-6 rounded-[2rem] border border-white/5 hover:border-red-600 transition-all duration-1000 shadow-2xl"
              >
                 <div className="relative w-16 h-16 mx-auto">
                    <Motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-red-600/30 rounded-full"
                    />
                    <div className="absolute inset-2 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                       <Motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ duration: 1.5, repeat: Infinity }}
                       >
                          <Activity className="text-white" size={24} />
                       </Motion.div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-red-600/20 text-red-600 text-[7px] font-black uppercase tracking-[0.3em] animate-pulse">
                       Awaiting Sync
                    </div>
                    <h4 className="text-lg font-black text-white tracking-[0.1em] uppercase leading-tight">
                       Deep <br /> Archives
                    </h4>
                 </div>
              </Motion.div>

              {/* Background Terminal Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full -z-10" />
           </div>
        </div>
        </div>

        {/* Global Neural Pulse Status Bar (Tactical Metric Ruler) */}
        <div className="absolute bottom-10 left-12 right-12 h-[2px] bg-white/5 flex items-center">
           {/* Ambient Line Glow */}
           <div className="absolute inset-x-0 h-[20px] bg-red-600/5 blur-[20px] -z-10" />
           
           {/* Segmented Markers (Tactical Ruler) */}
           <div className="absolute inset-0 flex justify-between pointer-events-none px-[2px]">
              {[...Array(stories.length + 2)].map((_, idx) => (
                 <div key={idx} className="w-[1px] h-3 bg-white/10 -top-1 relative" />
              ))}
           </div>

           <Motion.div 
             style={{ scaleX: scrollXProgress }} 
             className="h-full w-full bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 origin-left shadow-[0_0_20px_rgba(220,38,38,0.8)]" 
           />
           <Motion.div 
            style={{ left: useTransform(scrollXProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full blur-[4px] z-20 flex items-center justify-center"
           >
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
           </Motion.div>
           
           <div className="absolute -top-8 right-0 text-[8px] font-black text-[var(--text-muted)] tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Sector Synchronization: {(scrollXProgress.get() * 100).toFixed(0)}%
           </div>
        </div>

      </div>

    </Motion.section>
  );
};

export default SuccessStories;
