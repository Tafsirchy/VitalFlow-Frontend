import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion as Motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router";
import { ChevronRight, HelpCircle, Activity, Zap, ShieldCheck, Target, Terminal, Fingerprint, Search, Info } from "lucide-react";

// --- Sub-component: Decryption Text Effect ---
const DecryptionText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// --- Sub-component: Neural Signal Visualizer ---
const SignalPulse = () => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const newBars = [...Array(20)].map(() => ({
      duration: 1.5 + Math.random(),
      heights: [10, Math.random() * 40 + 10, 10],
    }));
    setBars(newBars);
  }, []);

  if (bars.length === 0) return <div className="h-12" />;

  return (
    <div className="pt-2 flex justify-center items-center gap-1 h-12 opacity-40">
      {bars.map((bar, i) => (
        <Motion.div
          key={i}
          animate={{ 
            height: bar.heights,
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: bar.duration, 
            repeat: Infinity,
            delay: i * 0.05
          }}
          className="w-1 bg-red-600 rounded-full"
        />
      ))}
      <div className="ml-4 flex flex-col justify-center">
        <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.2em]">Neural Signal Syncing...</span>
        <div className="w-24 h-0.5 bg-red-600/20 rounded-full overflow-hidden mt-1">
          <Motion.div 
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const newDots = [...Array(15)].map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 1000,
      r: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-red)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <Motion.path
          d="M0,500 Q250,200 500,500 T1000,500"
          fill="none"
          stroke="url(#neural-grad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <Motion.path
          d="M0,300 Q300,600 600,300 T1000,300"
          fill="none"
          stroke="url(#neural-grad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        {dots.map((dot, i) => (
          <Motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="var(--primary-red)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay }}
          />
        ))}
      </svg>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yRange = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const faqs = [
    {
      id: "PROT-01",
      question: "Who can initiate a donation cycle?",
      answer: "Individuals aged 18-65, weighing 50kg+, in optimal health state. Requires a 90-day quiescent period since the last cycle.",
      icon: Activity,
      category: "Eligibility"
    },
    {
      id: "PROT-02",
      question: "What is the synchronization frequency?",
      answer: "Whole blood cycles can be initiated every 12 weeks. Specialized platelet syncs can occur up to 24 times per annual orbit.",
      icon: Zap,
      category: "Timing"
    },
    {
      id: "PROT-03",
      question: "Is biological integrity maintained?",
      answer: "Absolute. Every interface utilizes sterile, single-use hardware. Managed by certified biological core technicians.",
      icon: ShieldCheck,
      category: "Safety"
    },
    {
      id: "PROT-04",
      question: "What is the duration of a transfer mission?",
      answer: "Initial screening and sync takes 45-60 minutes. The direct life-transfer phase is typically achieved in 10-15 minutes.",
      icon: Target,
      category: "Operation"
    }
  ];

  return (
    <section ref={containerRef} className="py-16 bg-[var(--background-main)] relative overflow-hidden select-none font-outfit">
      <NeuralBackground />
      
      {/* Decorative Floating Elements */}
      <Motion.div 
        style={{ y: yRange }}
        className="absolute top-20 -right-20 w-80 h-80 bg-red-600/5 blur-[120px] rounded-full" 
      />
      <Motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 -left-20 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full" 
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16 px-4">
          <div className="space-y-4">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full ultra-glass border border-red-500/20"
            >
              <Fingerprint size={14} className="text-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]">
                Accessing Neural Core
              </span>
            </Motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
              Neural <br />
              <span className="text-gradient-crimson italic">Knowledge</span>
            </h2>
          </div>
          
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2 text-red-600">
               <Terminal size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">System Status: Nominal</span>
            </div>
            <p className="text-base text-[var(--text-secondary)] font-medium opacity-70 leading-relaxed">
              Decrypted intelligence regarding biological synchronization protocols. Explore the core database for mission directives.
            </p>
          </div>
        </div>

        {/* Main Interface Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Navigation: Tactical List */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {faqs.map((faq, i) => (
              <Motion.button
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                onClick={() => setActiveIndex(i)}
                className={`group relative w-full text-left p-6 rounded-3xl transition-all duration-500 border overflow-hidden
                  ${activeIndex === i 
                    ? 'bg-gradient-to-r from-red-600/10 to-transparent border-red-500/40 shadow-[0_20px_40px_-20px_rgba(220,38,38,0.3)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'}`}
              >
                {/* Active Selection Glow */}
                {activeIndex === i && (
                  <Motion.div 
                    layoutId="faq-active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-transparent z-0"
                  />
                )}

                <div className="flex items-center gap-6 relative z-10">
                  {/* Icon Node */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative
                    ${activeIndex === i ? 'bg-red-600 scale-110' : 'bg-white/5 border border-white/10'}`}>
                    <faq.icon size={24} className={activeIndex === i ? 'text-white' : 'text-red-600/60 group-hover:text-red-600 transition-colors'} />
                    {activeIndex === i && (
                      <Motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-red-600 rounded-2xl"
                      />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-red-600/60 uppercase tracking-widest">{faq.id} // {faq.category}</span>
                      {activeIndex === i && <ChevronRight size={14} className="text-red-600 animate-pulse" />}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] tracking-tight uppercase group-hover:translate-x-1 transition-transform">{faq.question}</h3>
                  </div>
                </div>

                {/* Tactical Sidebar */}
                {activeIndex === i && (
                  <Motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"
                  />
                )}
              </Motion.button>
            ))}
          </div>

          {/* Right Panel: The Neural Core Display */}
          <div className="col-span-12 lg:col-span-7 perspective-1000">
            <Motion.div
              key={activeIndex}
              initial={{ rotateY: 20, opacity: 0, x: 50, scale: 0.95 }}
              animate={{ rotateY: 0, opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[550px] w-full ultra-glass rounded-[3rem] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] p-8 md:p-14 flex flex-col justify-start overflow-hidden group"
            >
              {/* Internal HUD Elements */}
              <div className="absolute top-8 left-8 flex gap-4 opacity-40">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 rounded-full ${i === activeIndex ? 'bg-red-600' : 'bg-white/20'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase">Encryption: Level 4</span>
              </div>

              <div className="absolute top-8 right-8">
                <Search size={18} className="text-red-600/40" />
              </div>

              {/* Central Information Stack */}
              <div className="space-y-5 relative z-10 mt-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-red-600" />
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em]">Query Identified</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl lg:text-4xl font-black text-[var(--text-primary)] leading-[0.95] tracking-tighter uppercase italic">
                    {faqs[activeIndex].question}
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full" />
                  <div className="h-[120px]">
                    <AnimatePresence mode="wait">
                      <Motion.p
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed italic"
                      >
                        <DecryptionText text={faqs[activeIndex].answer} />
                      </Motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Creative Content: Neural Signal Visualizer */}
                <SignalPulse activeIndex={activeIndex} />
              </div>

              {/* Bottom Metadata: Redesigned Center Aligned */}
              <div className="mt-5 pt-5 border-t border-white/5 relative z-10">
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                  <div className="flex flex-col items-center text-center px-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-1.5">Authorization</p>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Granted</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px h-8 bg-white/5" />

                  <div className="flex flex-col items-center text-center px-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-1.5">Data Source</p>
                    <div className="px-3 py-1 rounded-full bg-red-600/5 border border-red-500/20">
                      <p className="text-[9px] font-bold text-red-600 uppercase tracking-tighter">VitalFlow Core</p>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-8 bg-white/5" />

                  <div className="flex flex-col items-center text-center px-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-1.5">Archive ID</p>
                    <div className="px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20">
                      <p className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">{faqs[activeIndex].id}-NC</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Decorative Overlays - Removed external texture to prevent "purple gap" issue */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/10 rotate-45 blur-3xl opacity-50 transition-opacity group-hover:opacity-80" />
            </Motion.div>
          </div>
        </div>

        {/* Tactical Footer Action & Navigation */}
        <div className="mt-10 flex flex-col items-center gap-12">
          {/* Scroll Visual */}
          <Motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent rounded-full"
          />

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* New "More Things To Know" Navigation Button */}
            <Motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/help")}
              className="group relative px-10 py-5 rounded-2xl ultra-glass border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500 transition-all">
                  <Info size={18} className="text-blue-500 group-hover:animate-bounce" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:text-blue-500/80 transition-colors">Deeper Intelligence</p>
                  <p className="text-base font-black uppercase tracking-tighter group-hover:text-[var(--text-primary)] transition-colors">More Things To Know</p>
                </div>
                <ChevronRight size={18} className="text-white/20 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
