import React, { useState, useMemo, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  Zap,
  Globe,
  Radio,
  Wifi,
  Terminal,
  ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
  const points = useMemo(() => 
    [...Array(20)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 5 + 5
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {points.map((p, i) => (
        <Motion.div
          key={i}
          className="absolute bg-[var(--primary-red)] rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Sub-component: Scramble Text ---
const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Signal Syncing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Uplink Established. Message data encrypted and sent.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 2500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Voice Channel",
      value: "+880 1712-345678",
      subtitle: "Emergency High-Priority Line",
      glow: "red",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Data Packet",
      value: "support@vitalflow.com",
      subtitle: "Encrypted Communication Path",
      glow: "blue",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Geospatial Node",
      value: "Agrabad, Chittagong",
      subtitle: "Main Operational Hub",
      glow: "emerald",
      href: "#",
    },
  ];

  return (
    <div className="bg-[var(--background-main)] selection:bg-red-500/30">
      <main className="relative pt-10 overflow-hidden">
        <NeuralBackground />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-24 mt-10 max-w-4xl mx-auto space-y-8">
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full ultra-glass border border-[var(--primary-red)]/20 shadow-[0_0_20px_rgba(100,13,20,0.1)]"
            >
              <Radio size={14} className="text-[var(--primary-red)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">
                Uplink Protocol Initialized
              </span>
            </Motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none tracking-tighter uppercase">
              Establish <br />
              <span className="text-gradient-crimson italic"><ScrambleText text="Communications" /></span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium opacity-60 max-w-2xl mx-auto leading-relaxed italic">
              Synchronize with the VitalFlow command center. Our neural operatives are standing by for immediate data transmission.
            </p>
          </div>

          {/* Contact Nodes */}
          <section className="mb-32">
            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative group block"
                  >
                    <div className="relative ultra-glass rounded-[2.5rem] p-10 border border-white/10 group-hover:border-[var(--primary-red)]/30 transition-all duration-500 flex flex-col items-center h-full text-center shadow-2xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-red)]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="w-20 h-20 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-lg group-hover:shadow-[0_0_30px_rgba(100,13,20,0.2)] transition-all">
                        <Icon className="text-[var(--primary-red)]" size={36} />
                      </div>
                      <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-2 group-hover:text-gradient-crimson transition-all">{info.title}</h3>
                      <p className="text-lg font-black text-[var(--text-primary)] mb-2 tracking-tight">
                        {info.value}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest opacity-60">
                        {info.subtitle}
                      </p>
                    </div>
                  </Motion.a>
                );
              })}
            </div>
          </section>

          {/* Form Section */}
          <section className="max-w-5xl mx-auto mb-32 grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side: Terminal Info */}
            <Motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                  Transmission <span className="text-gradient-crimson italic">Parameters</span>
                </h2>
                <p className="text-lg text-[var(--text-secondary)] font-medium opacity-60 leading-relaxed italic">
                  Complete the transmission manifest below. Our decryption array will process your request within a 2-hour window.
                </p>
              </div>

              <div className="ultra-glass rounded-3xl p-10 border border-white/10 space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[var(--text-primary)] uppercase tracking-wider text-sm">Response Frequency</h4>
                    <p className="text-[var(--text-secondary)] font-medium italic opacity-60">Sub-2 hour synchronization</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-[var(--primary-red)]/10 rounded-xl text-[var(--primary-red)]">
                    <Wifi size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[var(--text-primary)] uppercase tracking-wider text-sm">Signal Range</h4>
                    <p className="text-[var(--text-secondary)] font-medium italic opacity-60">Global Coverage (64 Districts)</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[var(--text-primary)] uppercase tracking-wider text-sm">System Status</h4>
                    <p className="text-emerald-500 font-bold italic">All Nodes Operational</p>
                  </div>
                </div>
              </div>
            </Motion.div>

            {/* Right Side: Form */}
            <Motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary-red)] to-rose-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
              <div className="relative ultra-glass rounded-[3rem] border border-white/10 p-10 md:p-12 shadow-3xl">
                {isSubmitted ? (
                  <Motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-20 text-center space-y-8"
                  >
                    <div className="relative inline-block">
                       <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto" />
                       <Motion.div 
                        initial={{ opacity: 0, scale: 2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" 
                        />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-4">
                        Uplink Established
                      </h3>
                      <p className="text-lg text-[var(--text-secondary)] font-medium opacity-60 italic">
                        Your data packet has been successfully encrypted and routed. A neural operative will contact you shortly.
                      </p>
                    </div>
                    <Motion.button
                      onClick={() => setIsSubmitted(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 ultra-glass border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-[var(--text-primary)]"
                    >
                      New Transmission
                    </Motion.button>
                  </Motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Operative Name</label>
                        <div className="relative ultra-glass rounded-2xl border border-white/10 focus-within:border-[var(--primary-red)]/50 transition-all">
                          <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--primary-red)] opacity-50" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="IDENTIFY YOURSELF"
                            className="bg-transparent w-full py-4 pl-14 pr-5 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-muted)] placeholder:opacity-30 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Frequency Access</label>
                        <div className="relative ultra-glass rounded-2xl border border-white/10 focus-within:border-[var(--primary-red)]/50 transition-all">
                          <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--primary-red)] opacity-50" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+880 GRID CODE"
                            className="bg-transparent w-full py-4 pl-14 pr-5 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-muted)] placeholder:opacity-30 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Digital Coordinates</label>
                      <div className="relative ultra-glass rounded-2xl border border-white/10 focus-within:border-[var(--primary-red)]/50 transition-all">
                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--primary-red)] opacity-50" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="EMAIL@GRID.COM"
                          className="bg-transparent w-full py-4 pl-14 pr-5 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-muted)] placeholder:opacity-30 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Transmission Vector</label>
                      <div className="relative ultra-glass rounded-2xl border border-white/10 focus-within:border-[var(--primary-red)]/50 transition-all">
                         <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--primary-red)] opacity-50" />
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="bg-transparent w-full py-4 pl-14 pr-5 text-[var(--text-primary)] font-bold focus:outline-none appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-[var(--background-main)]">SELECT VECTOR</option>
                            <option value="general" className="bg-[var(--background-main)]">General Inquiry</option>
                            <option value="urgent" className="bg-[var(--background-main)]">Urgent Deficit Signal</option>
                            <option value="technical" className="bg-[var(--background-main)]">System Bug Reprt</option>
                            <option value="feedback" className="bg-[var(--background-main)]">User Experience Data</option>
                          </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Encrypted Payload</label>
                      <div className="relative ultra-glass rounded-3xl border border-white/10 focus-within:border-[var(--primary-red)]/50 transition-all">
                        <MessageSquare size={18} className="absolute left-5 top-6 text-[var(--primary-red)] opacity-50" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="ENTER DATA BLOCK..."
                          className="bg-transparent w-full py-6 pl-14 pr-5 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-muted)] placeholder:opacity-30 focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    <Motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative group/btn overflow-hidden p-5 bg-[var(--primary-red)] rounded-2xl flex items-center justify-center gap-4 transition-all"
                    >
                       <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                      
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="font-black text-white uppercase tracking-[0.3em] text-xs">Syncing Signals...</span>
                        </div>
                      ) : (
                        <>
                          <Send size={20} className="text-white relative z-10" />
                          <span className="font-black text-white uppercase tracking-[0.3em] text-xs relative z-10">Initialize Uplink</span>
                        </>
                      )}
                    </Motion.button>
                  </form>
                )}
              </div>
            </Motion.div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
