import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Droplets, MapPin, Clock, Phone, AlertTriangle, HeartPulse, Filter,
  Calendar, Hospital, MessageSquare, Zap, Search, Target, Users, Sparkles, Activity
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const getUrgencyLevel = (dateString) => {
  const diffInHours = (new Date() - new Date(dateString)) / (1000 * 60 * 60);
  if (diffInHours < 2) return "CRITICAL";
  if (diffInHours < 12) return "URGENT";
  return "STABLE";
};



const HeartbeatBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
        <Motion.div
          animate={{ 
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--primary-red) 1px, transparent 1px),
              linear-gradient(90deg, var(--primary-red) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Heartbeat Wave Patterns */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[1.08] dark:opacity-[0.15]">
        <defs>
          <linearGradient id="heartbeat-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary-red)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary-red)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary-red)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {[0, 1, 2].map((index) => (
          <Motion.path
            key={index}
            d={`M -200 ${150 + index * 120} 
                L 0 ${150 + index * 120} 
                L 40 ${150 + index * 120} 
                L 60 ${130 + index * 120} 
                L 80 ${170 + index * 120} 
                L 100 ${90 + index * 120} 
                L 120 ${210 + index * 120} 
                L 140 ${130 + index * 120} 
                L 160 ${170 + index * 120} 
                L 180 ${150 + index * 120} 
                L 2000 ${150 + index * 120}`}
            fill="none"
            stroke="url(#heartbeat-grad)"
            strokeWidth="2"
            initial={{ x: -200 }}
            animate={{ x: [0, 400] }}
            transition={{ 
              duration: 8 + index * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: index * 1.5
            }}
          />
        ))}
      </svg>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <Motion.div
          key={`particle-${i}`}
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0 
          }}
          animate={{ 
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            scale: [0, 1, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 rounded-full bg-red-500"
        />
      ))}

      {/* Pulsing Medical Cross Icons */}
      {[...Array(5)].map((_, i) => (
        <Motion.div
          key={`cross-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, 0.05, 0],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15 + i * 3, 
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
          className="absolute text-red-600"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
          </svg>
        </Motion.div>
      ))}

      {/* Scanning Lines */}
      {[...Array(4)].map((_, i) => (
        <Motion.div
          key={`scan-${i}`}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ 
            duration: 8 + i * 2, 
            repeat: Infinity, 
            delay: i * 2, 
            ease: "linear" 
          }}
          className="absolute top-0 bottom-0 w-96 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
          style={{ 
            top: `${10 + i * 20}%`, 
            height: '15%',
            transform: 'skewX(-12deg)'
          }}
        />
      ))}

      {/* Circular Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.08]">
        {[...Array(3)].map((_, i) => (
          <Motion.div
            key={`ring-${i}`}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 2, 4],
              opacity: [0.5, 0.2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut"
            }}
            className="absolute border-2 border-red-600 rounded-full"
            style={{
              width: '300px',
              height: '300px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

const UrgentCard = ({ req, index, navigate }) => {
  const urgency = getUrgencyLevel(req.createdAt);
  const isCritical = urgency === "CRITICAL";
  const isUrgent = urgency === "URGENT";
  
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative h-full ${isCritical ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      {/* Main Card Container */}
      <div className="relative overflow-hidden h-full rounded-2xl glass-morphism hover:border-[var(--primary-red)]/30 transition-all duration-500" style={{
        boxShadow: '0 0 0 0 transparent',
        transition: 'box-shadow 0.5s ease, border-color 0.5s ease'
      }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(100,13,20,0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 0 transparent'}>
        
        {/* Urgency Status Ribbon */}
        <Motion.div 
          className="absolute top-4 -right-12 z-30 rotate-45 w-40 text-center py-1.5 shadow-lg"
          style={{
            backgroundColor: urgency === "CRITICAL" 
              ? 'var(--primary-red)' 
              : urgency === "URGENT"
              ? 'var(--primary-red-hover)'
              : 'var(--primary-red-light)',
          }}
          animate={urgency === "CRITICAL" ? {
            boxShadow: [
              '0 0 20px rgba(100,13,20,0.5)',
              '0 0 30px rgba(100,13,20,0.8)',
              '0 0 20px rgba(100,13,20,0.5)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-on-primary)' }}>
            {urgency}
          </span>
        </Motion.div>
        
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(var(--primary-red) 1px, transparent 1px),
                linear-gradient(90deg, var(--primary-red) 1px, transparent 1px)
              `,
              backgroundSize: '15px 15px',
            }}
          />
        </div>

        {/* Glowing Gradient Orb */}
        <Motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle, rgba(100,13,20,0.6), rgba(128,14,19,0.4), rgba(173,40,49,0.2), transparent)'
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full p-6">
          
          {/* Header Section - Compact */}
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Blood Group Badge - Left */}
            <Motion.div
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
              className="relative z-20 flex-shrink-0"
            >
              <div className="relative flex items-center justify-center w-16 h-16 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm" style={{
                background: 'linear-gradient(135deg, rgba(100,13,20,0.3), rgba(128,14,19,0.2), rgba(173,40,49,0.15))',
                borderWidth: '2px',
                borderColor: 'rgba(100,13,20,0.4)',
                boxShadow: '0 10px 25px -5px rgba(100,13,20,0.3)'
              }}>
                <Motion.div
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 blur-md" style={{ background: 'linear-gradient(135deg, rgba(100,13,20,0.3), rgba(128,14,19,0.25), rgba(173,40,49,0.15))' }}
                />
                <span className="relative z-10 font-black text-2xl drop-shadow-lg" style={{ color: 'var(--primary-red-hover)' }}>
                  {req.bloodGroup}
                </span>
              </div>
            </Motion.div>

            {/* Title & Hospital - Right */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black uppercase tracking-tight leading-tight mb-1.5 text-gradient-crimson" style={{ color: 'var(--text-primary)' }}>
                {req.recipient_name}
              </h3>
              <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <Hospital size={11} style={{ color: 'var(--primary-red)', opacity: 0.7 }} />
                <span className="text-[10px] font-semibold uppercase tracking-wide truncate">
                  {req.hospital}
                </span>
              </div>
            </div>
          </div>

          {/* Info Pills - Compact Horizontal Layout */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Location */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] dark:bg-white/[0.02] border border-white/[0.06]">
              <MapPin size={11} style={{ color: 'var(--secondary-slate)', opacity: 0.7 }} />
              <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-primary)' }}>
                {req.recipient_district}
              </span>
            </div>
            
            {/* Deadline */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] dark:bg-white/[0.02] border border-white/[0.06]">
              <Calendar size={11} style={{ color: 'var(--primary-red-light)', opacity: 0.7 }} />
              <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-primary)' }}>
                {req.date}
              </span>
            </div>
            
            {/* Units */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border" style={{
              backgroundColor: 'rgba(217,119,6,0.1)',
              borderColor: 'rgba(217,119,6,0.3)'
            }}>
              <Target size={11} style={{ color: 'var(--accent-amber)', opacity: 0.9 }} />
              <span className="text-[10px] font-black uppercase" style={{ color: 'var(--accent-amber)' }}>
                {req.units || 1} {req.units > 1 ? 'Units' : 'Unit'}
              </span>
            </div>
          </div>

          {/* Network Visualization - Simplified for compact layout */}
          <div className="relative flex items-center justify-center h-32 mb-4">
            {/* Central Pulse */}
            <Motion.div
              className="absolute"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-20 h-20 rounded-full" style={{
                background: 'radial-gradient(circle, rgba(100,13,20,0.3), rgba(128,14,19,0.2), transparent)'
              }} />
            </Motion.div>
            
            {/* Connection Nodes - Reduced to 4 */}
            {[...Array(4)].map((_, i) => {
              const angle = (i * 90) * (Math.PI / 180);
              const radius = 50;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="absolute w-2 h-2 rounded-full border"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    background: 'linear-gradient(135deg, var(--primary-red), var(--primary-red-hover))',
                    borderColor: 'rgba(100,13,20,0.5)',
                    boxShadow: '0 0 10px rgba(100,13,20,0.4)'
                  }}
                />
              );
            })}
            
            {/* Center Icon */}
            <HeartPulse size={32} style={{ color: 'var(--primary-red-hover)', opacity: 0.8 }} className="relative z-10" />
          </div>

          {/* Action Button - Full Width */}
          <div className="mt-auto">
            <Motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/donation-details/${req._id}`);
              }}
              className="w-full px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, var(--primary-red), var(--primary-red-hover))',
                boxShadow: 'var(--shadow-premium)',
                color: 'var(--text-on-primary)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-premium-lg)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Zap size={16} className="fill-current" />
              DONATE NOW
            </Motion.button>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

const Feature = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("all");
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bloodTypes = ["all", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const fetchUrgentRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://vital-flow-backend-khaki.vercel.app/urgent-requests?bloodGroup=${selectedBloodType}`
      );
      setUrgentRequests(res.data);
    } catch {
      toast.error("Sector synchronization failed");
    } finally {
      setLoading(false);
    }
  }, [selectedBloodType]);

  useEffect(() => {
    fetchUrgentRequests();
  }, [fetchUrgentRequests]);

  return (
    <section className="relative py-20 bg-[var(--background-main)] overflow-hidden select-none">
      <HeartbeatBackground />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-red-600 rounded-full" />
                <p className="text-[11px] font-black text-red-600 tracking-[0.3em] uppercase">Emergency Response Pipeline</p>
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tighter uppercase">
                Critical <br />
                <span className="text-gradient-crimson italic">Demands</span>
             </h2>
             
             <div className="flex gap-6 pt-2">
                {[
                   { l: "ACTIVE NODES", v: "284", c: "text-red-500" },
                   { l: "SYNC RATE", v: "99.8%", c: "text-blue-500" }
                ].map((m, i) => (
                   <div key={i} className="space-y-0.5">
                      <p className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase">{m.l}</p>
                      <p className={`text-lg font-black ${m.c}`}>{m.v}</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col items-end gap-5">
             {/* Filter Pills */}
             <div className="ultra-glass p-1.5 rounded-2xl border border-white/5 flex flex-wrap gap-1 bg-white/[0.02]">
                {bloodTypes.map((type) => (
                   <button
                     key={type}
                     onClick={() => setSelectedBloodType(type)}
                     className={`relative px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                       ${selectedBloodType === type ? 'text-white' : 'text-[var(--text-secondary)] hover:text-red-600'}`}
                   >
                     {selectedBloodType === type && (
                       <Motion.div 
                         layoutId="filter_pill"
                         className="absolute inset-0 bg-red-600 rounded-xl shadow-lg -z-10"
                       />
                     )}
                     {type}
                   </button>
                ))}
             </div>
             <div className="flex items-center gap-2 opacity-40">
                <Motion.div 
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="w-1.5 h-1.5 rounded-full bg-red-600" 
                />
                <span className="text-[9px] font-black text-[var(--text-muted)] tracking-[0.3em] uppercase">Real-time Data Stream</span>
             </div>
          </div>
        </div>

        {/* Card Grid Layout - Creative Asymmetric Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr">
          {loading ? (
             <div className="col-span-full flex flex-col items-center justify-center py-32">
                <Motion.div 
                   animate={{ 
                     rotate: 360,
                     scale: [1, 1.15, 1],
                     borderColor: ["#dc2626", "#ec4899", "#a855f7", "#dc2626"]
                   }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                   className="w-16 h-16 border-[5px] border-t-transparent border-red-600 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                />
                <p className="mt-8 text-[11px] font-black text-transparent bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text tracking-[0.5em] uppercase animate-pulse">Initializing Emergency Response</p>
             </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {urgentRequests.length > 0 ? (
                urgentRequests.map((req, i) => (
                  <UrgentCard 
                    key={req._id} 
                    req={req} 
                    index={i}
                    navigate={navigate}
                  />
                ))
              ) : (
                <Motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full text-center py-32 border border-dashed border-white/10 rounded-3xl bg-gradient-to-br from-[#1a1a2e]/50 to-[#0f0f1e]/50 backdrop-blur-sm"
                >
                  <Search size={50} className="mx-auto text-red-600/20 mb-6" />
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">No Active Emergency Requests</h3>
                  <p className="text-xs text-gray-400 mt-3 font-semibold tracking-widest uppercase">Check back soon for urgent blood donation needs</p>
                </Motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Related Content Section - Redesigned */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blood Donation Impact Stats */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: 'var(--shadow-premium)',
              borderColor: 'var(--primary-red)'
            }}
            className="relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300" 
            style={{ 
              background: 'var(--background-card)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-glass)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl" style={{ 
                backgroundColor: 'rgba(100,13,20,0.15)',
                border: '1px solid rgba(100,13,20,0.25)'
              }}>
                <HeartPulse size={28} style={{ color: 'var(--primary-red-hover)' }} strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Your Impact
              </h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-black" style={{ color: 'var(--primary-red)' }}>3</span>
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Lives Saved</span>
                </div>
                <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Per Donation</p>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-black" style={{ color: 'var(--primary-red)' }}>120</span>
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Days Between</span>
                </div>
                <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Donations</p>
              </div>
              
              <p className="text-xs font-medium leading-relaxed pt-4 border-t" style={{ 
                borderColor: 'var(--border-light)',
                color: 'var(--text-secondary)' 
              }}>
                Every donation can save up to three lives. Your contribution makes a real difference in emergencies.
              </p>
            </div>
          </Motion.div>

          {/* Emergency Hotline */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: 'var(--shadow-premium)',
              borderColor: 'var(--primary-red)'
            }}
            className="relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300"
            style={{ 
              background: 'var(--background-card)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-glass)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl" style={{ 
                backgroundColor: 'rgba(100,13,20,0.15)',
                border: '1px solid rgba(100,13,20,0.25)'
              }}>
                <Phone size={28} style={{ color: 'var(--primary-red-hover)' }} strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Emergency Hotline
              </h3>
            </div>
            
            <div className="space-y-4">
              <Motion.a
                href="tel:999"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="block w-full px-8 py-4 rounded-xl font-black text-2xl uppercase tracking-wider transition-all duration-500 text-center"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-red-deepest), var(--primary-red-dark), var(--primary-red))',
                  boxShadow: 'var(--shadow-premium)',
                  color: 'var(--text-on-primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-premium-lg)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Phone size={24} className="fill-current" />
                999
              </Motion.a>
              
              <p className="text-xs font-medium leading-relaxed text-center" style={{ color: 'var(--text-secondary)' }}>
                24/7 Emergency blood request support. Call immediately for critical situations.
              </p>
              
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <ul className="space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--primary-red)', marginTop: '2px' }}>•</span>
                    <span>Immediate response for life-threatening emergencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--primary-red)', marginTop: '2px' }}>•</span>
                    <span>Connect with verified donors in your area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--primary-red)', marginTop: '2px' }}>•</span>
                    <span>Available nationwide, any blood type</span>
                  </li>
                </ul>
              </div>
            </div>
          </Motion.div>

          {/* Call to Action - Become a Donor */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate('/register')}
            className="relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{ 
              background: 'var(--background-card)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-glass)'
            }}
            whileHover={{ 
              boxShadow: 'var(--shadow-premium)',
              borderColor: 'var(--primary-red)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl" style={{ 
                backgroundColor: 'rgba(100,13,20,0.15)',
                border: '1px solid rgba(100,13,20,0.25)'
              }}>
                <Droplets size={28} style={{ color: 'var(--primary-red-hover)' }} strokeWidth={2.5} />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Become a Donor
              </h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Join our community of life-savers. Register today and be notified when your blood type is urgently needed.
              </p>
              
              <div className="space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-start gap-2">
                  <span style={{ color: 'var(--primary-red)', marginTop: '2px' }}>✓</span>
                  <span>Get instant notifications for matching requests</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: 'var(--primary-red)', marginTop: '2px' }}>✓</span>
                  <span>Track your donation history and impact</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: 'var(--primary-red)', marginTop: '2px' }}>✓</span>
                  <span>Connect with recipients and save lives</span>
                </div>
              </div>
              
              <Motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/register');
                }}
                className="w-full px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-red-deepest), var(--primary-red-dark), var(--primary-red))',
                  boxShadow: 'var(--shadow-premium)',
                  color: 'var(--text-on-primary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-premium-lg)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Sparkles size={16} />
                REGISTER NOW
              </Motion.button>
            </div>
          </Motion.div>
        </div>

        {/* Blood Donation Eligibility - Redesigned */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 rounded-2xl p-8"
          style={{ 
            background: 'var(--background-card)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-glass)'
          }}
        >
          <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(100,13,20,0.15)' }}>
              <AlertTriangle size={24} style={{ color: 'var(--primary-red-hover)' }} strokeWidth={2.5} />
            </div>
            Blood Donation Eligibility
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Age', value: '18-65 Years', icon: Users },
              { label: 'Weight', value: '≥50 KG', icon: Target },
              { label: 'Health', value: 'Good Condition', icon: HeartPulse },
              { label: 'Frequency', value: 'Every 120 Days', icon: Calendar }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300" style={{
                background: 'var(--background-section)',
                border: '1px solid var(--border-light)'
              }}>
                <div className="p-2.5 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(100,13,20,0.12)' }}>
                  <item.icon size={20} style={{ color: 'var(--primary-red-hover)' }} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                  <p className="text-sm font-black uppercase" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Feature;
