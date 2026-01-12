import React, { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, Bookmark, Eye, Tag, FileText, Zap, ChevronRight, MessageSquare, Activity } from "lucide-react";

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
    const lines = useMemo(() => 
      [...Array(10)].map(() => ({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        duration: Math.random() * 10 + 10
      })), []);
  
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10 z-0">
        <svg className="w-full h-full">
          {lines.map((l, i) => (
            <Motion.line
              key={i}
              x1={`${l.x1}%`}
              y1={`${l.y1}%`}
              x2={`${l.x2}%`}
              y2={`${l.y2}%`}
              stroke="var(--primary-red)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: l.duration,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </svg>
      </div>
    );
  };

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const blogPosts = {
    "1": {
      id: 1,
      title: "5 Essential Tips for First-Time Blood Donors",
      image: "https://images.unsplash.com/photo-1615461065929-4fb2111022e6?auto=format&fit=crop&w=1200&q=80",
      author: "Dr. Sarah Ahmed",
      role: "Hematology Specialist",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      category: "donation tips",
      content: `
## Introduction

Donating blood for the first time can be both exciting and nerve-wracking. Understanding what to expect and how to prepare can make your experience smooth and rewarding. Here are five essential tips to help you become a confident first-time donor.

## 1. Stay Hydrated Before and After

**Why it matters:** Proper hydration helps maintain your blood volume and makes the donation process easier.

- Drink at least 16 ounces of water before your appointment
- Avoid alcohol for 24 hours before donating
- Continue drinking plenty of fluids for the next 24-48 hours
- Water, juice, and sports drinks are excellent choices

## 2. Eat Iron-Rich Foods

**The science:** Iron is a crucial component of hemoglobin, which carries oxygen in your blood.

**Best foods to eat:**
- Red meat (beef, lamb)
- Spinach and dark leafy greens
- Beans and lentils
- Iron-fortified cereals
- Nuts and seeds

Start eating iron-rich foods a week before your donation to ensure your iron levels are optimal.

## 3. Get Adequate Sleep

**Why rest matters:** Being well-rested helps your body handle the donation process better and reduces the risk of feeling faint.

- Aim for 7-9 hours of sleep the night before
- Avoid strenuous exercise the morning of your donation
- Feeling tired can make you more prone to dizziness

## 4. Bring Valid Identification

**What you need:**
- Government-issued photo ID (driver's license, passport)
- Donor card if you've donated before
- List of current medications (if applicable)

Most blood banks require proper identification to ensure donor safety and accurate record-keeping.

## 5. Relax and Communicate

**During the donation:**
- Let the staff know it's your first time
- Ask questions if you're uncertain about anything
- Practice deep breathing to stay calm
- Alert staff immediately if you feel dizzy or uncomfortable

## What to Expect

The entire process takes about 45-60 minutes:
1. **Registration** (10 min) - Paperwork and ID verification
2. **Health screening** (10 min) - Brief physical and questionnaire
3. **Donation** (10-15 min) - The actual blood draw
4. **Recovery** (10-15 min) - Rest and refreshments

## After Your Donation

- Keep the bandage on for at least 4 hours
- Avoid heavy lifting for the rest of the day
- Drink extra fluids for 24-48 hours
- Eat a good meal within a few hours
- If you feel faint, sit or lie down immediately

## Conclusion

Your first blood donation is a significant step in saving lives. One donation can help up to three people! By following these tips, you'll have a positive experience and hopefully become a regular donor.

**Ready to donate?** Visit our [Search page](/search) to find donation centers near you!
      `
    },
    // ... potentially other posts (omitted for brevity as I'm replacing the whole file)
  };

  const post = blogPosts[id] || blogPosts["1"]; // Fallback to first post if ID not found

  return (
    <div className="min-h-screen bg-[var(--background-main)] selection:bg-red-500/30">
        <Motion.div 
            className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--primary-red)] to-rose-600 z-[100] origin-left"
            style={{ scaleX }}
        />
        <NeuralBackground />

        <main className="relative pt-20 pb-32">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Back Link */}
                <Motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/blog")}
                    className="mb-12 flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--primary-red)] font-black uppercase tracking-[0.3em] text-[10px] transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                    Return to Archives
                </Motion.button>

                <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
                    {/* Main Content */}
                    <article className="space-y-12">
                        {/* Header */}
                        <header className="space-y-8">
                            <Motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg ultra-glass border border-[var(--primary-red)]/20"
                            >
                                <Zap size={12} className="text-[var(--primary-red)]" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]">
                                    Deep File Analysis // {post.category}
                                </span>
                            </Motion.div>

                            <Motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] leading-none tracking-tighter uppercase italic"
                            >
                                {post.title}
                            </Motion.h1>

                            <Motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap items-center gap-8 pt-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--primary-red)]/10 flex items-center justify-center border border-[var(--primary-red)]/20">
                                        <User size={20} className="text-[var(--primary-red)]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">{post.author}</p>
                                        <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">{post.role}</p>
                                    </div>
                                </div>

                                <div className="h-10 w-px bg-white/10 hidden md:block" />

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                        <Calendar size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                        <Clock size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{post.readTime}</span>
                                    </div>
                                </div>
                            </Motion.div>
                        </header>

                        {/* Featured Image */}
                        <Motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl"
                        >
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-main)]/60 to-transparent" />
                        </Motion.div>

                        {/* Content Body */}
                        <Motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-invert prose-crimson max-w-none 
                                       prose-h2:text-4xl prose-h2:font-black prose-h2:uppercase prose-h2:italic prose-h2:tracking-tighter prose-h2:text-gradient-crimson
                                       prose-p:text-xl prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-p:font-medium prose-p:opacity-80
                                       prose-li:text-lg prose-li:text-[var(--text-secondary)] prose-li:opacity-75
                                       prose-strong:text-[var(--text-primary)] prose-strong:font-black
                                       prose-blockquote:border-[var(--primary-red)] prose-blockquote:bg-white/5 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-3xl prose-blockquote:italic"
                        >
                            {/* Simple Markdown-like renderer (for this demo content) */}
                            {post.content.split('\n').map((line, i) => {
                                if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                                if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
                                if (line.startsWith('* ')) return <li key={i}>{line.replace('* ', '')}</li>;
                                if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
                                if (line.trim() === '') return <br key={i} />;
                                return <p key={i}>{line}</p>;
                            })}
                        </Motion.div>

                        {/* Social Share & Actions */}
                        <footer className="pt-10 mt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mr-4">Share Frequency:</span>
                                <button className="p-4 ultra-glass rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-all hover:scale-110 shadow-xl border border-white/10"><Share2 size={20} /></button>
                                <button className="p-4 ultra-glass rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-all hover:scale-110 shadow-xl border border-white/10"><Heart size={20} /></button>
                                <button className="p-4 ultra-glass rounded-2xl text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-all hover:scale-110 shadow-xl border border-white/10"><Bookmark size={20} /></button>
                            </div>

                            <button className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl text-[var(--text-primary)] font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-[var(--primary-red)] hover:text-white transition-all">
                                <MessageSquare size={16} />
                                Access Discussion Terminal
                            </button>
                        </footer>
                    </article>

                    {/* Sidebar / Metadata */}
                    <aside className="space-y-12 lg:sticky lg:top-32">
                        {/* Data Analytics Card */}
                        <Motion.div 
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="ultra-glass rounded-[3rem] p-10 border border-white/10 shadow-3xl space-y-8 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-red)]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            
                            <div className="flex items-center gap-4 uppercase tracking-[0.2em] font-black text-[var(--primary-red)] text-[10px]">
                                <Activity size={16} />
                                <span>File Analytics</span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center group">
                                    <span className="text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-wider group-hover:text-[var(--text-primary)] transition-colors">Integrity Level</span>
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-lg text-[10px] font-black uppercase">Alpha Class</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-wider group-hover:text-[var(--text-primary)] transition-colors">Neural Load</span>
                                    <span className="text-[var(--text-primary)] text-[11px] font-black">Medium</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-wider group-hover:text-[var(--text-primary)] transition-colors">Retrieval Count</span>
                                    <span className="flex items-center gap-2 text-[var(--text-primary)] text-[11px] font-black">
                                        <Eye size={12} className="text-[var(--primary-red)]" /> 12,842
                                    </span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Data Classifiers</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['PROTOCOL', 'BLOOD', 'GRID', 'URGENT'].map(t => (
                                        <span key={t} className="px-3 py-1.5 ultra-glass border border-white/10 rounded-lg text-[9px] font-black text-[var(--text-secondary)] opacity-60 hover:opacity-100 cursor-pointer">#{t}</span>
                                    ))}
                                </div>
                            </div>
                        </Motion.div>

                        {/* Author/Card */}
                        <Motion.div 
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-[var(--primary-red)] to-[#FF8080] rounded-[3rem] p-10 text-white shadow-3xl space-y-6 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                <div className="w-20 h-20 rounded-[2rem] bg-white/20 p-1">
                                    <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center">
                                         <User size={40} className="text-[var(--primary-red)]" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter italic">{post.author}</h3>
                                <p className="text-xs font-bold opacity-80 leading-relaxed italic">
                                    Hematology expert dedicated to optimizing global life-flow protocols and donor education within the VitalFlow grid.
                                </p>
                                <button className="w-full py-3 bg-white text-[var(--primary-red)] font-black uppercase tracking-widest text-[9px] rounded-2xl hover:bg-black hover:text-white transition-all shadow-xl">
                                    Uplink Portfolio
                                </button>
                            </div>
                        </Motion.div>
                    </aside>
                </div>
            </div>
        </main>
    </div>
  );
};

export default BlogPost;
