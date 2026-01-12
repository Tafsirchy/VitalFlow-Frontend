import React, { useState, useMemo, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  Activity,
  Zap,
  Shield,
  Clock,
  ExternalLink
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
  const circles = useMemo(() => 
    [...Array(15)].map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 1000,
      r: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.4] dark:opacity-[0.15]">
      <svg className="w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <radialGradient id="help-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary-red)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {circles.map((c, i) => (
          <Motion.circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="var(--primary-red)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ 
              duration: c.duration, 
              repeat: Infinity, 
              delay: c.delay 
            }}
          />
        ))}
      </svg>
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
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpTopics = [
    {
      icon: BookOpen,
      title: "System Initiation",
      description: "Fundamental operational protocols for the VitalFlow grid.",
      glow: "from-red-500/20",
    },
    {
      icon: Activity,
      title: "Transfer Protocols",
      description: "Directives for high-frequency life-flow synchronization.",
      glow: "from-blue-500/10",
    },
    {
      icon: Shield,
      title: "Security Linkage",
      description: "Advanced data encryption and neural privacy settings.",
      glow: "from-emerald-500/10",
    },
  ];

  const faqs = [
    {
      question: "How do I initiate grid registration?",
      answer: "Navigate to the Authentication terminal, provide unique biometric identifiers, and synchronize your biotype. Our system requires verification to ensure carrier integrity."
    },
    {
      question: "What is the procedure for urgent requests?",
      answer: "In the event of a critical deficit, activate the 'Emergency Protocol' on your dashboard. Specify the biotype, coordinates, and urgency factor for immediate matching."
    },
    {
      question: "How are biological carriers verified?",
      answer: "Every node in the VitalFlow grid undergoes multi-factor authentication, including historical data cross-referencing and facility verification."
    },
    {
      question: "Is my data encrypted within the grid?",
      answer: "We utilize quantum-resistant encryption (Grade 5 Neural) to shield all biological and personal identifiers. Your data is only visible to verified uplink partners."
    },
    {
      question: "How frequent can carrier transfers occur?",
      answer: "Bio-standard recovery time is 3 months. Our AI monitors your recuperation cycle to ensure 100% carrier safety before the next synchronization."
    }
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[var(--background-main)] selection:bg-red-500/30">
      <main className="relative pt-10 overflow-hidden">
        <NeuralBackground />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20 mt-10 max-w-4xl mx-auto space-y-7">
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full ultra-glass border border-[var(--primary-red)]/20"
            >
              <Zap size={14} className="text-[var(--primary-red)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">
                Support Node v.9.4
              </span>
            </Motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none tracking-tighter uppercase">
              <ScrambleText text="Operational" /> <br />
              <span className="text-gradient-crimson italic">Support Grid</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium opacity-60 max-w-2xl mx-auto leading-relaxed italic">
              Access the VitalFlow knowledge base to synchronize your understanding of the global circulatory grid.
            </p>

            {/* Search Interface */}
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-3xl mx-auto group mt-12"
            >
              <div className="absolute inset-0 bg-[var(--primary-red)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative ultra-glass rounded-[2rem] border border-white/10 dark:border-white/5 p-2 flex items-center shadow-3xl">
                <div className="pl-6 text-[var(--primary-red)] opacity-50">
                  <Search size={24} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Intercept data from the help matrix..."
                  className="w-full bg-transparent border-none outline-none py-5 px-6 text-lg font-black text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:opacity-30"
                />
              </div>
            </Motion.div>
          </div>

          {/* Topics Grid */}
          <section className="mb-32">
            <div className="grid md:grid-cols-3 gap-8">
              {helpTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative ultra-glass rounded-[2.5rem] p-10 border border-white/10 group-hover:border-[var(--primary-red)]/30 transition-all duration-500 flex flex-col items-center h-full text-center shadow-2xl">
                       <div className={`absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br ${topic.glow} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                      
                      <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-lg group-hover:shadow-[0_0_30px_rgba(100,13,20,0.2)] transition-all">
                        <Icon className="text-[var(--primary-red)]" size={32} />
                      </div>
                      <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-4">{topic.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] font-semibold opacity-60 leading-relaxed italic">
                        {topic.description}
                      </p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
          </section>

          {/* FAQ Interface */}
          <section className="max-w-4xl mx-auto mb-32 px-4">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-4">
                Decrypted <span className="text-gradient-crimson italic">Knowledge</span>
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-transparent via-[var(--primary-red)] to-transparent mx-auto rounded-full" />
            </Motion.div>

            <div className="space-y-6">
              <AnimatePresence>
                {filteredFaqs.map((faq, index) => (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="relative ultra-glass rounded-3xl border border-white/10 dark:border-white/5 overflow-hidden group hover:border-[var(--primary-red)]/20 transition-all shadow-xl">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-8 text-left flex items-center justify-between"
                      >
                        <span className="text-xl font-black text-[var(--text-primary)] tracking-tight pr-8">
                          {faq.question}
                        </span>
                        <div className={`p-2 rounded-xl bg-white dark:bg-white/5 border border-white/10 transition-transform duration-500 ${expandedFaq === index ? "rotate-180 text-[var(--primary-red)]" : "text-[var(--text-muted)]"}`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedFaq === index && (
                          <Motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 pb-8"
                          >
                            <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed italic opacity-80 border-t border-white/10 pt-6">
                              {faq.answer}
                            </p>
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Motion.div>
                ))}
              </AnimatePresence>

              {filteredFaqs.length === 0 && (
                <Motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 ultra-glass rounded-[3rem] border border-dashed border-white/20"
                >
                  <p className="text-xl text-[var(--text-muted)] font-black uppercase tracking-[0.2em] italic">
                    Grid Data Null - Search Protocol Failed
                  </p>
                </Motion.div>
              )}
            </div>
          </section>

          {/* Emergency Uplink */}
          <section className="mb-32">
             <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative p-1 bg-gradient-to-r from-[var(--primary-red)] via-[#FF8080] to-[var(--primary-red)] rounded-[3.5rem] shadow-3xl overflow-hidden group"
            >
               <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative bg-[var(--background-main)] rounded-[3.4rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary-red)]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                
                <div className="text-center lg:text-left space-y-6 relative z-10">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-none uppercase">
                    Still <span className="text-gradient-crimson italic">Disconnected?</span>
                  </h2>
                  <p className="text-xl text-[var(--text-secondary)] font-medium opacity-60 max-w-xl italic">
                    Initiate a direct uplink to our 24/7 neural support operatives for immediate battlefield assistance.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
                   <Motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href='/contact'}
                    className="flex-1 lg:flex-none px-10 py-5 bg-[var(--primary-red)] text-white font-black rounded-2xl shadow-2xl flex items-center justify-center gap-3 group/btn overflow-hidden relative"
                  >
                    <Mail size={22} className="relative z-10" />
                    <span className="relative z-10 uppercase tracking-widest text-sm">Open Uplink</span>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </Motion.button>

                  <Motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 lg:flex-none px-10 py-5 ultra-glass border border-white/20 text-[var(--text-primary)] font-black rounded-2xl flex items-center justify-center gap-3 overflow-hidden group/call"
                  >
                    <Phone size={22} className="text-[var(--primary-red)]" />
                    <span className="uppercase tracking-widest text-sm italic">Voice Comms</span>
                    <div className="absolute inset-0 bg-[var(--primary-red)]/5 -translate-x-full group-hover/call:translate-x-0 transition-transform duration-500" />
                  </Motion.button>
                </div>
              </div>
            </Motion.div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help;
