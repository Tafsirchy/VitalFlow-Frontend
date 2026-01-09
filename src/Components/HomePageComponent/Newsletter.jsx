import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, Loader, Radio, Activity, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid biological address detected");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast.success("Sector synchronization complete!");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 2000);
  };

  return (
    <section className="py-10 bg-[var(--background-main)] relative overflow-hidden select-none">
      
      {/* High-Concept Background Visual (Full-Bleed) */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
         <Motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] lg:w-[1200px] lg:h-[1200px] border border-white/5 rounded-full"
         />
         <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-soft-light" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="mx-auto max-w-5xl lg:max-w-6xl ultra-glass rounded-[3rem] lg:rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row min-h-[300px] lg:min-h-[350px]">
           
           {/* Left: Branding & Signal Status */}
           <div className="w-full lg:w-[45%] bg-gradient-to-br from-red-600 to-red-950 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
              
              {/* Animated Bio-Grid Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="relative z-10 space-y-4 lg:space-y-6">
                 <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/20 backdrop-blur-3xl border border-white/40 flex items-center justify-center shadow-2xl">
                    <Radio className="text-white animate-pulse" size={28} />
                 </div>
                 <div className="space-y-2 lg:space-y-3">
                     <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
                        Signal <br />
                        Syncing <br />
                        <span className="opacity-50 text-xl md:text-2xl lg:text-3xl">Active</span>
                     </h2>
                     <p className="text-sm lg:text-base text-red-100 font-medium opacity-80 max-w-xs leading-relaxed">
                        Maintain a constant link within the biological core. Receive direct broadcasts.
                     </p>
                 </div>
              </div>

              {/* Status Metrics (Unique UI) */}
              <div className="relative z-10 pt-6 lg:pt-8 border-t border-white/20 flex gap-6">
                 <div className="flex items-center gap-2">
                    <Activity size={10} className="text-white/60" />
                    <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-white/80">0.1ms Pulse</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={10} className="text-white/60" />
                    <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-white/80">AES-256 Link</span>
                 </div>
              </div>

           </div>

           {/* Right: The Subscription Terminal */}
           <div className="flex-1 bg-black/40 p-8 lg:p-12 flex flex-col justify-center relative">
              
              <AnimatePresence mode="wait">
                 {isSubscribed ? (
                    <Motion.div
                      key="success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-4 lg:space-y-6 relative z-10"
                    >
                       <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto border border-white/20 shadow-2xl">
                          <CheckCircle className="text-white" size={40} />
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase">Synchronized</h3>
                          <p className="text-xs lg:text-sm text-white/60 font-medium">Your address is integrated into the cluster.</p>
                       </div>
                    </Motion.div>
                 ) : (
                    <Motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 lg:space-y-10 relative z-10"
                    >
                       <div className="space-y-1 lg:space-y-2 text-center lg:text-left">
                          <p className="text-[9px] lg:text-[10px] font-black text-red-600 uppercase tracking-[0.6em]">Protocol Initiation</p>
                          <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase italic">Subscribe to Core</h3>
                       </div>

                       <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
                          <div className="relative group">
                             <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-600 transition-colors" size={18} />
                             <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER BIOLOGICAL ADDRESS..."
                                disabled={isSubmitting}
                                className="w-full h-14 lg:h-16 pl-14 pr-8 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl text-base lg:text-lg font-black text-white placeholder-white/20 focus:outline-none focus:border-red-600/50 focus:bg-white/10 transition-all uppercase tracking-widest"
                                required
                             />
                          </div>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-14 lg:h-16 bg-white text-black font-black text-base lg:text-lg rounded-xl lg:rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl disabled:opacity-50"
                          >
                             {isSubmitting ? (
                               <Loader className="animate-spin" size={20} />
                             ) : (
                               <>
                                 <span className="tracking-tighter">INITIATE LINK</span>
                                 <Send size={18} className="rotate-45" />
                               </>
                             )}
                          </button>
                       </form>

                       <p className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.4em] text-white/30 text-center lg:text-left">
                          By syncing, you agree to our Biological Privacy Protocol.
                       </p>
                    </Motion.div>
                 )}
              </AnimatePresence>

           </div>

        </div>
      </div>

    </section>
  );
};

export default Newsletter;
