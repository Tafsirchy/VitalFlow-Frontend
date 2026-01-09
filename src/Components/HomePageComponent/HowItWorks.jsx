import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Search,
  Phone,
  Heart,
  MoveRight,
  Zap,
  Activity,
  ShieldCheck,
  Target,
  ArrowRight
} from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      icon: UserPlus,
      title: "Register Profile",
      desc: "Join our network with your essential donor information",
      color: "red-600",
      gradient: "from-red-600 to-rose-600",
      subIcon: Activity
    },
    {
      id: "02",
      icon: Search,
      title: "Find Requests",
      desc: "Discover matching blood needs in your area",
      color: "rose-600",
      gradient: "from-rose-600 to-pink-600",
      subIcon: Zap
    },
    {
      id: "03",
      icon: Phone,
      title: "Connect & Coordinate",
      desc: "Schedule and confirm your donation details",
      color: "pink-600",
      gradient: "from-pink-600 to-red-600",
      subIcon: Target
    },
    {
      id: "04",
      icon: Heart,
      title: "Save a Life",
      desc: "Complete donation and make lasting impact",
      color: "red-700",
      gradient: "from-red-700 to-red-900",
      subIcon: ShieldCheck
    }
  ];

  return (
    <section className="relative py-8 bg-[var(--background-main)] overflow-hidden select-none">
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(var(--primary-red)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-20">
        
        <div className="mb-6 space-y-3">
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-morphism border border-red-500/20"
          >
            <Zap size={10} className="text-red-600 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
               Simple Process
            </span>
          </Motion.div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tighter">
                 How It <span className="text-gradient-crimson italic">Works</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium opacity-60 mt-2 max-w-md">
                 Four simple steps to make a life-saving difference
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setActiveStep(i)}
              whileHover={{ y: -8 }}
              className={`relative group cursor-pointer transition-all duration-300 ${
                activeStep === i ? 'scale-[1.02]' : ''
              }`}
            >
              <div 
                className="relative h-full rounded-2xl p-5 flex flex-col border border-[var(--glass-border)] overflow-hidden"
                style={{
                  background: 'var(--background-card)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: activeStep === i
                    ? 'var(--shadow-premium-lg)'
                    : 'var(--shadow-glass)'
                }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl relative overflow-hidden"
                      style={{
                        background: activeStep === i
                          ? `linear-gradient(135deg, ${step.gradient.split(' ').join(', ')})`
                          : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--glass-border)'
                      }}
                    >
                      <span className={activeStep === i ? 'text-white' : 'text-[var(--text-muted)]'}>
                        {step.id}
                      </span>
                    </div>

                    {activeStep === i && (
                      <Motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[8px] font-bold text-red-600 uppercase tracking-wider">Active</span>
                      </Motion.div>
                    )}
                  </div>

                  <Motion.div className="mb-4 flex justify-center">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center relative"
                      style={{
                        background: activeStep === i
                          ? `linear-gradient(135deg, ${step.gradient.split(' ').join(', ')})`
                          : 'rgba(220, 38, 38, 0.1)',
                        border: '1px solid rgba(220, 38, 38, 0.2)'
                      }}
                    >
                      {React.createElement(step.icon, { 
                        size: 28, 
                        className: activeStep === i ? "text-white" : "text-red-600",
                        strokeWidth: 2.5
                      })}
                    </div>
                  </Motion.div>

                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-2 leading-tight text-[var(--text-primary)]">
                    {step.title}
                  </h3>

                  <p className="text-xs font-medium leading-relaxed mb-4 text-[var(--text-secondary)] opacity-70">
                    {step.desc}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                    <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Step {i + 1}/4
                    </span>
                  </div>
                </div>

                <Motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${step.gradient.split(' ').join(', ')})`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />
              </div>
            </Motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                activeStep === i ? 'w-8 bg-red-600' : 'w-1 bg-[var(--text-muted)]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
