import React from "react";
import { motion as Motion } from "framer-motion";
import { TrendingUp, Users, MapPin, Heart, Activity, Globe, ShieldCheck, Zap } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      value: "15,842",
      label: "Active Donors",
      protocol: "DONOR-NET-X",
      status: "PROTOCOL LINKED",
      color: "red-600",
      desc: "Verified donors ready to help nationwide",
      subIcon: Globe,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-600/30 via-red-900/10 to-transparent"
    },
    {
      icon: Heart,
      value: "4,290",
      label: "Lives Saved",
      protocol: "LIFE-SYNC-42",
      status: "EMERGENCY",
      color: "rose-600",
      desc: "Successful donations completed with care",
      subIcon: Activity,
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-600/30 via-rose-900/10 to-transparent"
    },
    {
      icon: MapPin,
      value: "64",
      label: "Districts",
      protocol: "GRID-MAP-64",
      status: "Q2 CLUSTER",
      color: "blue-600",
      desc: "Complete coverage across Bangladesh",
      subIcon: Zap,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-600/30 via-blue-900/10 to-transparent"
    },
    {
      icon: TrendingUp,
      value: "99.8%",
      label: "Success Rate",
      protocol: "SIG-998-A",
      status: "VERIFIED",
      color: "green-600",
      desc: "Proven track record of life-saving impact",
      subIcon: ShieldCheck,
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-600/30 via-green-900/10 to-transparent"
    }
  ];

  return (
    <section className="relative py-8 bg-[var(--background-main)] overflow-hidden select-none">
      
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] bg-[radial-gradient(var(--primary-red)_1px,transparent_1px)] [background-size:40px_40px]" />
         
         <Motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.02, 0.05, 0.02] 
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full"
         />
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-20">
        
        <div className="mb-8 space-y-6">
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="relative group">
              <div className="relative inline-flex flex-col items-start gap-0.5 px-5 py-3 rounded-xl border border-[var(--glass-border)] glass-morphism">
                <div className="flex items-center gap-2 mb-1">
                  <Motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-600"
                  />
                  <span className="text-[8px] font-bold text-[var(--text-muted)] tracking-[0.25em] uppercase">
                    Mission Archive Vol. 01 // Deep Sync
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <h1 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                    HISTORY
                  </h1>
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight" style={{ 
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ARCHIVE
                  </h1>
                </div>
                
                <Motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-2 bg-red-600/10 blur-xl rounded-xl -z-10"
                />
              </div>
            </div>
          </Motion.div>

          <Motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[var(--text-secondary)] font-medium opacity-60 max-w-2xl">
            Real-time impact dashboard tracking our life-saving network across the nation.
          </Motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
           
           {stats.map((stat, i) => (
             <Motion.div 
               key={i}
               initial={{ opacity: 0, y: 30, scale: 0.9 }}
               whileInView={{ opacity: 1, y: 0, scale: 1 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ 
                 duration: 0.6, 
                 delay: i * 0.12,
                 ease: [0.22, 1, 0.36, 1]
               }}
               whileHover={{ 
                 y: -12, 
                 scale: 1.04
               }}
               className="relative group cursor-pointer overflow-hidden"
             >
                <div 
                  className="relative h-full rounded-2xl p-6 flex flex-col border border-[var(--glass-border)]"
                  style={{
                    background: 'var(--background-card)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: 'var(--shadow-premium-lg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: `linear-gradient(135deg, ${stat.bgGradient.split(' ').map(c => c.replace('/', '/')).join(', ')})`
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <Motion.div 
                      whileHover={{ scale: 1.15 }}
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(100,13,20,0.25), rgba(128,14,19,0.15))',
                        border: '1.5px solid rgba(220,38,38,0.25)',
                        boxShadow: 'var(--shadow-premium)'
                      }}
                    >
                      <Motion.div
                        animate={{ 
                          scale: [1, 1.08, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        className="relative z-10"
                      >
                        {React.createElement(stat.icon, { 
                          size: 26, 
                          className: "text-[var(--primary-red-hover)] drop-shadow-md",
                          strokeWidth: 2.5
                        })}
                      </Motion.div>
                    </Motion.div>

                    <Motion.h3 
                      className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 relative"
                      style={{
                        background: `linear-gradient(135deg, var(--primary-red), var(--primary-red-hover))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {stat.value}
                    </Motion.h3>

                    <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3 text-[var(--text-muted)]">
                       {stat.label}
                    </p>

                    {stat.desc && (
                      <p className="text-xs font-medium leading-relaxed mb-4 text-[var(--text-secondary)] opacity-70">
                         {stat.desc}
                      </p>
                    )}

                    <Motion.div
                      className="mt-auto pt-3 w-full flex items-center justify-between border-t border-[var(--glass-border)]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.12 + 0.5 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Live Data
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-green-500" strokeWidth={2.5} />
                        <span className="text-[9px] font-black text-green-500">
                          {i === 0 ? '+12%' : i === 1 ? '+8%' : i === 2 ? '+3' : '+0.2%'}
                        </span>
                      </div>
                    </Motion.div>
                  </div>

                  <Motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-red), transparent)',
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

        <div className="mt-8 max-w-4xl mx-auto">
          <Motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-px bg-gradient-to-r from-transparent via-[var(--primary-red)]/20 to-transparent origin-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
