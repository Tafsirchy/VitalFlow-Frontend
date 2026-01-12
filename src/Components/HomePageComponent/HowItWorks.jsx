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
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: "01",
      icon: UserPlus,
      title: "Register Profile",
      desc: "Join our network with your essential donor information",
      color: "red-600",
      gradient: "from-red-600 to-rose-600",
      subIcon: Activity,
      command: "init_profile()",
      status: "ONLINE"
    },
    {
      id: "02",
      icon: Search,
      title: "Find Requests",
      desc: "Discover matching blood needs in your area",
      color: "rose-600",
      gradient: "from-rose-600 to-pink-600",
      subIcon: Zap,
      command: "scan_requests()",
      status: "SCANNING"
    },
    {
      id: "03",
      icon: Phone,
      title: "Connect & Coordinate",
      desc: "Schedule and confirm your donation details",
      color: "pink-600",
      gradient: "from-pink-600 to-red-600",
      subIcon: Target,
      command: "establish_link()",
      status: "SYNCING"
    },
    {
      id: "04",
      icon: Heart,
      title: "Save a Life",
      desc: "Complete donation and make lasting impact",
      color: "red-700",
      gradient: "from-red-700 to-red-900",
      subIcon: ShieldCheck,
      command: "execute_mission()",
      status: "SUCCESS"
    }
  ];

  // SVG Path for connections
  const ConnectionLine = ({ from, to, isActive }) => {
    return (
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`gradient-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(220, 38, 38, 0.3)" />
            <stop offset="50%" stopColor="rgba(220, 38, 38, 0.6)" />
            <stop offset="100%" stopColor="rgba(220, 38, 38, 0.3)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Horizontal connection line */}
        <Motion.line
          x1={`${(from * 25) + 12.5}%`}
          y1="50%"
          x2={`${(to * 25) + 12.5}%`}
          y2="50%"
          stroke={`url(#gradient-${from}-${to})`}
          strokeWidth="2"
          strokeDasharray="8 4"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: isActive ? 1 : 0.7, 
            opacity: isActive ? 1 : 0.5 
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* Energy particle flowing through */}
        {isActive && (
          <Motion.circle
            r="4"
            fill="rgba(220, 38, 38, 0.9)"
            filter="url(#glow)"
            initial={{ 
              cx: `${(from * 25) + 12.5}%`,
              cy: "50%"
            }}
            animate={{ 
              cx: `${(to * 25) + 12.5}%`,
              cy: "50%"
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </svg>
    );
  };

  // Pulse Ring Animation
  const PulseRings = ({ isActive }) => {
    if (!isActive) return null;
    
    return (
      <>
        {[0, 1, 2].map((i) => (
          <Motion.div
            key={i}
            className="absolute inset-0 rounded-xl border-2 border-red-600"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.5 + (i * 0.3), opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </>
    );
  };

  return (
    <section className="relative py-8 bg-[var(--background-main)] overflow-hidden select-none">
      
      {/* Circuit Board Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Horizontal traces */}
              <path d="M0 20 L40 20 L40 40 L60 40 L60 20 L100 20" stroke="var(--primary-red)" strokeWidth="1" fill="none"/>
              <path d="M0 60 L30 60 L30 80 L70 80 L70 60 L100 60" stroke="var(--primary-red)" strokeWidth="1" fill="none"/>
              {/* Vertical traces */}
              <path d="M20 0 L20 40 L40 40 L40 60 L20 60 L20 100" stroke="var(--primary-red)" strokeWidth="1" fill="none"/>
              <path d="M80 0 L80 30 L60 30 L60 70 L80 70 L80 100" stroke="var(--primary-red)" strokeWidth="1" fill="none"/>
              {/* Connection nodes */}
              <circle cx="20" cy="20" r="2" fill="var(--primary-red)"/>
              <circle cx="40" cy="40" r="2" fill="var(--primary-red)"/>
              <circle cx="60" cy="60" r="2" fill="var(--primary-red)"/>
              <circle cx="80" cy="80" r="2" fill="var(--primary-red)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Pulsing Energy Core */}
      <Motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[80px] rounded-full"
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-20">
        
        <div className="mb-6 space-y-3">
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-morphism border-2 border-red-500/30"
          >
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={10} className="text-red-600" />
            </Motion.div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
               Circuit Protocol
            </span>
          </Motion.div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
                 How It <span className="text-gradient-crimson italic">Works</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium opacity-60 mt-2 max-w-md">
                 Four interconnected steps to execute the life-saving protocol
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute inset-0">
            {steps.slice(0, -1).map((_, i) => (
              <ConnectionLine 
                key={i} 
                from={i} 
                to={i + 1} 
                isActive={activeStep === i || activeStep === i + 1}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {steps.map((step, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                onMouseEnter={() => setActiveStep(i)}
                whileHover={{ y: -8 }}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeStep === i ? 'scale-[1.02]' : ''
                }`}
              >
                <div 
                  className="relative h-full rounded-2xl p-5 flex flex-col border-2 overflow-hidden"
                  style={{
                    background: 'var(--background-card)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: activeStep === i
                      ? '0 0 30px rgba(220, 38, 38, 0.3), var(--shadow-premium-lg)'
                      : 'var(--shadow-glass)',
                    borderColor: activeStep === i 
                      ? 'rgba(220, 38, 38, 0.5)' 
                      : 'var(--glass-border)'
                  }}
                >
                  {/* Circuit Node Rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <PulseRings isActive={activeStep === i} />
                  </div>

                  {/* Energy Flow Overlay */}
                  <Motion.div
                    animate={{ 
                      opacity: activeStep === i ? [0.1, 0.3, 0.1] : 0
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20 rounded-2xl pointer-events-none"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Node Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl relative overflow-hidden group/node"
                        style={{
                          background: activeStep === i
                            ? `linear-gradient(135deg, ${step.gradient.split(' ').join(', ')})`
                            : 'rgba(255, 255, 255, 0.05)',
                          border: activeStep === i 
                            ? '2px solid rgba(220, 38, 38, 0.6)' 
                            : '1px solid var(--glass-border)',
                          boxShadow: activeStep === i 
                            ? '0 0 15px rgba(220, 38, 38, 0.4)' 
                            : 'none'
                        }}
                      >
                        <span className={activeStep === i ? 'text-white' : 'text-[var(--text-muted)]'}>
                          {step.id}
                        </span>
                        
                        {/* Corner LED indicators */}
                        <Motion.div
                          animate={{ opacity: activeStep === i ? [0.5, 1, 0.5] : 0.2 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-600"
                        />
                      </div>

                      {/* Status Badge */}
                      {activeStep === i && (
                        <Motion.div
                          initial={{ scale: 0, x: 10 }}
                          animate={{ scale: 1, x: 0 }}
                          className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-600/20 border border-red-600/30"
                        >
                          <Motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-red-600"
                          />
                          <span className="text-[8px] font-bold text-red-600 uppercase tracking-wider">
                            {step.status}
                          </span>
                        </Motion.div>
                      )}
                    </div>

                    {/* Circuit Node Icon */}
                    <Motion.div 
                      className="mb-4 flex justify-center relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: activeStep === i
                            ? `linear-gradient(135deg, ${step.gradient.split(' ').join(', ')})`
                            : 'rgba(220, 38, 38, 0.1)',
                          border: '2px solid rgba(220, 38, 38, 0.3)',
                          boxShadow: activeStep === i 
                            ? '0 0 20px rgba(220, 38, 38, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)' 
                            : 'none'
                        }}
                      >
                        {/* Inner circuit pattern */}
                        <div className="absolute inset-0">
                          <svg className="w-full h-full opacity-20">
                            <circle cx="50%" cy="50%" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                            <circle cx="50%" cy="50%" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                          </svg>
                        </div>

                        {React.createElement(step.icon, { 
                          size: 28, 
                          className: activeStep === i ? "text-white relative z-10" : "text-red-600 relative z-10",
                          strokeWidth: 2.5
                        })}

                        {/* Corner connectors */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-600/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-600/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-600/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-600/50" />
                      </div>
                    </Motion.div>

                    {/* Step Title */}
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-2 leading-tight text-[var(--text-primary)]">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs font-medium leading-relaxed mb-4 text-[var(--text-secondary)] opacity-70">
                      {step.desc}
                    </p>

                    {/* Command Line */}
                    <div className="mb-3">
                      <div className="bg-black/20 border border-red-600/20 rounded-lg px-2 py-1.5 font-mono text-[10px]">
                        <span className="text-red-600">&gt;</span>
                        <span className="text-[var(--text-muted)] ml-1">{step.command}</span>
                        <Motion.span
                          animate={{ opacity: activeStep === i ? [0, 1, 0] : 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-red-600"
                        >
                          _
                        </Motion.span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {completedSteps.includes(i) && (
                          <Motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle2 size={12} className="text-green-500" />
                          </Motion.div>
                        )}
                        <span className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                          Node {i + 1}/4
                        </span>
                      </div>

                      {i < steps.length - 1 && (
                        <Motion.div
                          animate={{ x: activeStep === i ? [0, 3, 0] : 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight size={12} className="text-red-600" />
                        </Motion.div>
                      )}
                    </div>
                  </div>

                  {/* Glowing border on hover */}
                  <Motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${step.gradient.split(' ').join(', ')})`,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude'
                    }}
                  />
                </div>
              </Motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <Motion.div 
              key={i}
              onClick={() => setActiveStep(i)}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer relative overflow-hidden ${
                activeStep === i ? 'w-8 bg-red-600' : 'w-1 bg-[var(--text-muted)]/30'
              }`}
              whileHover={{ scale: 1.2 }}
            >
              {activeStep === i && (
                <Motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </Motion.div>
          ))}
        </div>

        {/* Circuit Completion Indicator */}
        <Motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/20 bg-red-600/5">
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Activity size={14} className="text-red-600" />
            </Motion.div>
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Protocol Status: Active
            </span>
            <Motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
