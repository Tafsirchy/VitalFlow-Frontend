import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Activity, Zap, ShieldCheck, Target } from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      id: "PROT-01",
      question: "Who can initiate a donation cycle?",
      answer: "Individuals aged 18-65, weighing 50kg+, in optimal health state. Requires a 90-day quiescent period since the last cycle.",
      icon: Activity
    },
    {
      id: "PROT-02",
      question: "What is the synchronization frequency?",
      answer: "Whole blood cycles can be initiated every 12 weeks. Specialized platelet syncs can occur up to 24 times per annual orbit.",
      icon: Zap
    },
    {
      id: "PROT-03",
      question: "Is biological integrity maintained?",
      answer: "Absolute. Every interface utilizes sterile, single-use hardware. Managed by certified biological core technicians.",
      icon: ShieldCheck
    },
    {
      id: "PROT-04",
      question: "What is the duration of a transfer mission?",
      answer: "Initial screening and sync takes 45-60 minutes. The direct life-transfer phase is typically achieved in 10-15 minutes.",
      icon: Target
    }
  ];

  return (
    <section className="py-10 bg-[var(--background-main)] relative overflow-hidden select-none">
      
      {/* Abstract Background Knowledge Base */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute -left-20 top-1/4 w-96 h-96 bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        
        {/* Tactical Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10">
           <div className="space-y-3">
              <Motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full ultra-glass border border-red-500/20 shadow-xl"
              >
                 <HelpCircle size={12} className="text-red-600 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">
                    Information Core
                 </span>
              </Motion.div>
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-[1.1] tracking-tighter uppercase">
                  Neural <br />
                  <span className="text-gradient-crimson italic">Knowledge</span>
               </h2>
           </div>
           
            <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium opacity-60 max-w-sm leading-relaxed">
               Every query regarding the biological network, decrypted for your safety and synchronization.
            </p>
        </div>

        {/* Unique Side-by-Side Node Display */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
           
           {/* Left: Interactive Navigation */}
           <div className="col-span-12 lg:col-span-5 space-y-2 lg:space-y-3">
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative w-full text-left p-5 lg:p-6 rounded-[2rem] lg:rounded-[2.5rem] transition-all duration-500 border
                    ${activeIndex === i ? 'ultra-glass border-red-500/30 shadow-2xl scale-[1.02]' : 'border-white/5 opacity-40 hover:opacity-80'}`}
                >
                   <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                        ${activeIndex === i ? 'bg-red-600 shadow-[0_10px_20px_rgba(220,38,38,0.4)]' : 'ultra-glass border border-white/10'}`}>
                         <faq.icon size={22} className={activeIndex === i ? 'text-white' : 'text-red-600'} />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">{faq.id}</p>
                         <h3 className="text-base md:text-xl font-black text-[var(--text-primary)] tracking-tight uppercase">{faq.question}</h3>
                      </div>
                   </div>
                   
                   {activeIndex === i && (
                     <Motion.div 
                       layoutId="active_faq_pill"
                       className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-600 rounded-full"
                     />
                   )}
                </button>
              ))}
           </div>

           {/* Right: The Decryption Panel */}
           <div className="col-span-12 lg:col-span-7 relative">
              <div className="sticky top-12 h-[380px] lg:h-[480px] w-full ultra-glass rounded-[3rem] lg:rounded-[4rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-8 lg:p-12 flex flex-col justify-center overflow-hidden">
                 
                 {/* Internal Neural Visual */}
                 <div className="absolute inset-0 pointer-events-none opacity-30">
                    <Motion.div 
                      key={activeIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.1 }}
                      transition={{ duration: 2 }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)]" 
                    />
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                 </div>

                 <AnimatePresence mode="wait">
                    <Motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-8 lg:space-y-10 relative z-10"
                    >
                       <div className="space-y-2 lg:space-y-3">
                          <p className="text-[9px] lg:text-[10px] font-black text-red-600 uppercase tracking-[0.6em]">Authorized Response</p>
                          <h4 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-[0.95] tracking-tighter uppercase italic">
                             {faqs[activeIndex].question}
                          </h4>
                       </div>

                       <div className="space-y-6">
                          <div className="w-12 lg:w-16 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full" />
                          <p className="text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed opacity-70 italic max-w-xl">
                             "{faqs[activeIndex].answer}"
                          </p>
                       </div>

                       <div className="pt-6 lg:pt-10 flex gap-8 lg:gap-12">
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Encryption State</p>
                             <p className="text-[10px] font-bold text-red-600 uppercase">FULLY DECRYPTED</p>
                          </div>
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Access Level</p>
                             <p className="text-[10px] font-bold text-blue-500 uppercase">PUBLIC ARCHIVE</p>
                          </div>
                       </div>
                    </Motion.div>
                 </AnimatePresence>

                 {/* Corner Decorative Shards */}
                 <div className="absolute top-8 right-8 w-20 h-20 ultra-glass rounded-3xl rotate-12 opacity-20 border border-white/20" />
                 <div className="absolute bottom-8 left-8 w-14 h-14 ultra-glass rounded-2xl -rotate-15 opacity-10 border border-white/20" />
              </div>
           </div>

        </div>

        {/* Global Support Callout (Unique UI) */}
        <div className="mt-16 lg:mt-24 text-center">
           <Motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative inline-flex items-center gap-6 px-10 lg:px-12 py-5 lg:py-6 ultra-glass rounded-[2rem] border border-white/10 group overflow-hidden"
           >
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <HelpCircle size={22} className="text-red-600 relative z-10 group-hover:text-white" />
              <div className="text-left relative z-10 transition-colors duration-500 group-hover:text-white">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Specific Query?</p>
                 <p className="text-base lg:text-lg font-black uppercase tracking-tight">Initiate Support Link</p>
              </div>
              <ChevronDown className="relative z-10 -rotate-90 group-hover:text-white transition-transform duration-500" />
           </Motion.button>
        </div>

      </div>

    </section>
  );
};

export default FAQ;
