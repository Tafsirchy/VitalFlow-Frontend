import React, { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { Heart, MapPin, Calendar, Sparkles, MoveRight, Star, Activity, Zap, Shield, Target, Radio } from "lucide-react";
import emergencyImg from "../../assets/success_story_emergency.png";
import communityImg from "../../assets/success_story_community.png";
import rareBloodImg from "../../assets/success_story_rare_blood.png";
import milestoneImg from "../../assets/success_story_milestone.png";

const SuccessStories = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Base horizontal scroll for cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  
  // Kinetic background typography (Opposite direction + Parallax)
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Chroma Shift: Background intensity shifts from Deep Crimson to Midnight Blue based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(10, 10, 10, 1)", "rgba(20, 5, 5, 1)", "rgba(5, 5, 20, 1)"]
  );

  // Vertical parallax for background shards
  const shardY = useTransform(scrollYProgress, [0, 1], [0, -300]);

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
      className="relative h-[150vh] transition-colors duration-1000 select-none"
    >
      
      {/* Sticky Container For Horizontal Scroll */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
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
        <div className="absolute top-10 inset-x-0 z-20">
           <div className="container mx-auto px-6 lg:px-10 space-y-3">
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
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase">
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

            <Motion.div style={{ x }} className="flex gap-8 px-6 lg:px-10 items-end h-full pt-10 pb-20 relative z-10 flex-nowrap">
               {stories.map((story, i) => (
                 <div key={i} className="flex-shrink-0 w-[85vw] lg:w-[45vw] max-w-3xl h-[50vh] group relative">
                    
                    {/* Neural Pulse Link (Abstract connector) */}
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-px bg-gradient-to-r from-red-600 to-transparent z-20 opacity-20 group-hover:opacity-100 group-hover:w-20 transition-all duration-700" />
                    
                    <Motion.div 
                       whileHover={{ y: -5 }}
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
                        className="absolute bottom-4 left-4 py-2 px-4 rounded-xl ultra-glass border border-white/20 shadow-2xl space-y-1 group/vital"
                      >
                         <div className="flex items-center gap-2">
                            <Radio size={8} className="text-red-500 animate-pulse" />
                            <p className="text-[7px] font-black uppercase text-red-500 tracking-[0.4em]">Protocol Linked</p>
                         </div>
                         <p className="text-base font-black text-white tracking-widest uppercase">{story.vitalId}</p>
                      </Motion.div>
 
                      {/* Floating Impact Node */}
                      <div className="absolute top-4 left-4 py-1.5 px-4 rounded-xl ultra-glass border border-white/20 shadow-2xl flex items-center gap-3">
                         <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                         </div>
                         <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">{story.impact}</span>
                      </div>
                   </div>
 
                   {/* Content Half (Tactical Layout) */}
                   <div className="flex-1 p-3 lg:p-4 flex flex-col justify-between relative">
                      
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
                            <p className="text-[10px] md:text-xs text-white/50 font-medium leading-relaxed max-w-md italic">
                               "{story.desc}"
                            </p>
                         </div>
                      </div>
 
                      {/* Creative Data Stream (Neural Visualization) */}
                      <div className="relative py-4 space-y-3 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                               <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40">Neural Link Active</span>
                            </div>
                            <span className="text-[7px] font-mono text-white/20">0X{i}F-SYNC-PROT</span>
                         </div>
                         
                         {/* Heartbeat Waveform */}
                         <div className="h-10 flex items-end gap-[3px] px-2">
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
 
                      <div className="flex flex-col sm:flex-row items-end justify-between border-t border-white/10 pt-2 mt-2 gap-2">
                         <div className="grid grid-cols-1 gap-1">
                            <div className="flex items-center gap-3 text-white/40">
                               <div className="w-6 h-px bg-red-600/50" />
                               <MapPin size={10} className="text-red-600" />
                               <span className="text-[8px] font-black uppercase tracking-[0.1em]">{story.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40">
                               <div className="w-6 h-px bg-blue-600/30" />
                               <Calendar size={10} />
                               <span className="text-[8px] font-bold tracking-[0.05em]">{story.date}</span>
                            </div>
                         </div>
                         
                         <Motion.button 
                           whileHover={{ scale: 1.1, rotate: 180, backgroundColor: "#fff", color: "#000" }}
                           whileTap={{ scale: 0.9 }}
                           className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_8px_16px_rgba(220,38,38,0.3)] transition-all duration-500 z-10"
                         >
                            <Zap size={16} />
                         </Motion.button>
                      </div>
                   </div>

                </Motion.div>
             </div>
           ))}

           {/* The "Deep Neural Access" Terminal (World-Class Finale) */}
           <div className="flex-shrink-0 w-[240px] h-[50vh] flex items-center justify-center p-4 relative">
              <Motion.div 
                whileHover={{ scale: 1.05 }}
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[150px] rounded-full -z-10" />
           </div>
        </Motion.div>

        {/* Global Neural Pulse Status Bar */}
        <div className="absolute bottom-8 left-12 right-12 h-[2px] bg-white/5 flex items-center">
           <Motion.div 
             style={{ scaleX: scrollYProgress }} 
             className="h-full w-full bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 origin-left shadow-[0_0_20px_rgba(220,38,38,0.8)]" 
           />
           <Motion.div 
            style={{ left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full blur-[4px] z-20 flex items-center justify-center"
           >
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
           </Motion.div>
           
           <div className="absolute -top-8 right-0 text-[8px] font-black text-[var(--text-muted)] tracking-widest uppercase">
              Sector Synchronization: {(scrollYProgress.get() * 100).toFixed(0)}%
           </div>
        </div>

      </div>

    </Motion.section>
  );
};

export default SuccessStories;
