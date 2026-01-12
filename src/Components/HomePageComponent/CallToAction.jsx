import React from "react";
import { motion as Motion } from "framer-motion";
import { Users, ArrowRight, Zap, Target, Activity } from "lucide-react";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 bg-[var(--background-main)] relative overflow-hidden select-none">
      
      {/* High-Impact Bio-Flash Layer */}
      <div className="mx-auto w-[95%] max-w-7xl relative overflow-hidden rounded-[3rem] lg:rounded-[4rem] bg-premium-gradient shadow-[0_60px_100px_-20px_rgba(220,38,38,0.5)]">
        
        {/* Animated Background Kinetics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <Motion.div 
             animate={{ 
               scale: [1, 1.5, 1],
               rotate: [0, 180, 360],
               opacity: [0.3, 0.6, 0.3]
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute -top-1/4 -right-1/4 w-full aspect-square bg-white/10 blur-[150px] rounded-full" 
           />
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
           
           {/* Neural Scanline */}
           <Motion.div 
             animate={{ top: ["-10%", "110%"] }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-px bg-white/20 blur-[1px] z-10"
           />
        </div>

        <div className="relative z-10 px-6 py-10 lg:py-16 text-center space-y-6 lg:space-y-8">
           
           {/* Biological Ignition Icon */}
           <Motion.div
             initial={{ scale: 0, rotate: -45 }}
             whileInView={{ scale: 1, rotate: 0 }}
             viewport={{ once: true }}
             transition={{ type: "spring", stiffness: 100, damping: 12 }}
             className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/40 shadow-2xl relative"
           >
              <Zap className="text-white fill-white" size={32} />
              
              {/* Spinning Ring */}
              <Motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] border border-dashed border-white/40 rounded-[2rem] md:rounded-[2.5rem]"
              />
              <Motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/20 rounded-[2rem] md:rounded-[2.5rem] blur-xl"
              />
           </Motion.div>

            <div className="space-y-3 lg:space-y-4">
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter uppercase">
                  IGNITE THE <br />
                  <span className="italic font-light">LIFE CIRCUIT</span>
               </h2>

               <p className="text-base md:text-lg lg:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                  Your biological essence is the ultimate resource. Join the global cluster and synchronize your heartbeat with the infinite network.
               </p>
            </div>

           {/* High-Contrast Action Hub */}
           <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center pt-4">
              <button
                onClick={() => navigate("/auth/register")}
                className="group relative h-14 md:h-16 lg:h-20 px-8 lg:px-12 bg-white text-red-600 rounded-2xl md:rounded-3xl font-black text-base lg:text-xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
              >
                <span>BECOME A CARRIER</span>
                <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/donation-requests")}
                className="h-14 md:h-16 lg:h-20 px-6 lg:px-10 bg-black/20 text-white border border-white/30 rounded-2xl md:rounded-3xl font-black text-sm lg:text-base backdrop-blur-xl hover:bg-black/30 transition-all active:scale-95"
              >
                PROBE SECTORS
              </button>
           </div>

           {/* Live Sync Metrics */}
           <div className="pt-8 lg:pt-12 border-t border-white/20 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
              {[
                { i: Users, v: "15.8K", l: "CARRIERS" },
                { i: Target, v: "4.2K", l: "RESTORED" },
                { i: Activity, v: "24/7", l: "PULSE" },
                { i: Zap, v: "100%", l: "SYNC" }
              ].map((stat, i) => (
                <div key={i} className="space-y-0.5 lg:space-y-1">
                   <div className="flex items-center justify-center gap-2 text-white/60 mb-1">
                      <stat.i size={10} />
                      <span className="text-[8px] lg:text-[9px] font-black tracking-widest uppercase">{stat.l}</span>
                   </div>
                   <p className="text-2xl lg:text-4xl font-black text-white tracking-tighter">{stat.v}</p>
                </div>
              ))}
           </div>

        </div>

        {/* Diagonal Light Strike Decorative */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>

    </section>
  );
};

// Re-using MoveRight from lucide-react if needed or just use ArrowRight
const MoveRight = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 8L22 12L18 16" /><path d="M2 12H22" />
  </svg>
);

export default CallToAction;
