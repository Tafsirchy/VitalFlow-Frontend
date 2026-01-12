import React, { useState, useMemo, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, Search, Tag, Newspaper, Activity, Heart, Bookmark, Share2 } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// --- Sub-component: Neural Background ---
const NeuralBackground = () => {
  const points = useMemo(() => 
    [...Array(15)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 4
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
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.2, 1],
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

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "donation tips", "health", "success stories", "news"];

  const blogPosts = [
    {
      id: 1,
      title: "5 Essential Tips for First-Time Blood Donors",
      excerpt:
        "Everything you need to know before your first blood donation. From preparation to post-donation care.",
      image: "https://images.unsplash.com/photo-1615461065929-4fb2111022e6?auto=format&fit=crop&w=800&q=80",
      author: "Dr. Sarah Ahmed",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      category: "donation tips",
    },
    {
      id: 2,
      title: "The Science Behind Blood Types",
      excerpt:
        "Understanding blood types, compatibility, and why they matter in transfusions.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
      author: "Dr. Michael Chen",
      date: "Jan 3, 2026",
      readTime: "7 min read",
      category: "health",
    },
    {
      id: 3,
      title: "How One Donation Saved Three Lives",
      excerpt:
        "A heartwarming story of how a single blood donation made an incredible impact on three families.",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?auto=format&fit=crop&w=800&q=80",
      author: "Priya Patel",
      date: "Dec 28, 2025",
      readTime: "4 min read",
      category: "success stories",
    },
    {
      id: 4,
      title: "VitalFlow Reaches 15,000 Active Donors",
      excerpt:
        "Celebrating a major milestone as our community continues to grow and save more lives.",
      image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=800&q=80",
      author: "VitalFlow Team",
      date: "Dec 25, 2025",
      readTime: "3 min read",
      category: "news",
    },
    {
      id: 5,
      title: "Preparing for Blood Donation: Do's and Don'ts",
      excerpt:
        "A comprehensive guide on what to eat, avoid, and expect before donating blood.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      author: "Dr. Sarah Ahmed",
      date: "Dec 20, 2025",
      readTime: "6 min read",
      category: "donation tips",
    },
    {
      id: 6,
      title: "Understanding Platelet Donation",
      excerpt:
        "Learn about platelet donation, its importance, and how it differs from whole blood donation.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80",
      author: "Dr. Michael Chen",
      date: "Dec 15, 2025",
      readTime: "5 min read",
      category: "health",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[var(--background-main)] selection:bg-red-500/30">
        <main className="relative pt-10 overflow-hidden">
            <NeuralBackground />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Hero section */}
                <div className="text-center mb-20 mt-10 max-w-4xl mx-auto space-y-8">
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full ultra-glass border border-[var(--primary-red)]/20 shadow-[0_0_20px_rgba(100,13,20,0.1)]"
                    >
                        <Newspaper size={14} className="text-[var(--primary-red)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">
                        Intelligence Archives v.2.0
                        </span>
                    </Motion.div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none tracking-tighter uppercase">
                        VitalFlow <br />
                        <span className="text-gradient-crimson italic"><ScrambleText text="Insight Hub" /></span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium opacity-60 max-w-2xl mx-auto leading-relaxed italic">
                        Explore decrypted data blocks containing life-saving protocols, operative field reports, and grid intelligence updates.
                    </p>
                </div>

                {/* Search & Filter Protocol */}
                <section className="mb-12">
                    <div className="relative ultra-glass rounded-[2.5rem] p-4 lg:p-6 border border-white/10 shadow-3xl max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            {/* Search */}
                            <div className="flex-1 relative w-full group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--primary-red)] opacity-50 group-focus-within:opacity-100 transition-opacity" size={22} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Interrogate Archives..."
                                    className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-[var(--primary-red)]/50 focus:outline-none text-[var(--text-primary)] font-black placeholder:text-[var(--text-muted)] placeholder:opacity-30 placeholder:italic transition-all"
                                />
                            </div>

                            {/* Categories */}
                            <div className="flex gap-3 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar">
                                {categories.map((category) => (
                                    <Motion.button
                                        key={category}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] whitespace-nowrap transition-all border ${
                                            selectedCategory === category
                                            ? "bg-[var(--primary-red)] text-white border-transparent shadow-[0_0_20px_rgba(100,13,20,0.3)]"
                                            : "ultra-glass text-[var(--text-secondary)] border-white/10 opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        {category}
                                    </Motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Archive Grid */}
                <section className="pb-32">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.length === 0 ? (
                            <Motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-32 ultra-glass rounded-[3rem] border border-dashed border-white/20"
                            >
                                <p className="text-xl text-[var(--text-muted)] font-black uppercase tracking-[0.2em] italic">
                                    Archive Search Result: NULL
                                </p>
                            </Motion.div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post, index) => (
                                    <Motion.div
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        onClick={() => navigate(`/blog/${post.id}`)}
                                        className="relative ultra-glass rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[var(--primary-red)]/30 transition-all duration-500 cursor-pointer group shadow-2xl flex flex-col h-full"
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-64 overflow-hidden">
                                            <Motion.img
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-main)] via-transparent to-transparent opacity-80" />
                                            
                                            <div className="absolute top-6 left-6">
                                                <span className="px-3 py-1 bg-[var(--primary-red)] text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                                                    {post.category}
                                                </span>
                                            </div>
                                            
                                            <div className="absolute bottom-6 right-6 flex gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                                <button className="p-2.5 ultra-glass rounded-xl text-white/70 hover:text-[var(--primary-red)]"><Heart size={18} /></button>
                                                <button className="p-2.5 ultra-glass rounded-xl text-white/70 hover:text-[var(--primary-red)]"><Bookmark size={18} /></button>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 opacity-70">
                                                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[var(--primary-red)]" /> {post.date}</span>
                                                <span className="flex items-center gap-1.5"><Clock size={12} className="text-[var(--primary-red)]" /> {post.readTime}</span>
                                            </div>

                                            <h3 className="text-2xl font-black text-[var(--text-primary)] leading-tight mb-4 group-hover:text-gradient-crimson transition-all line-clamp-2 uppercase italic tracking-tighter">
                                                {post.title}
                                            </h3>
                                            
                                            <p className="text-[var(--text-secondary)] font-medium opacity-60 italic mb-8 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[var(--primary-red)]/10 flex items-center justify-center border border-[var(--primary-red)]/20">
                                                        <User size={14} className="text-[var(--primary-red)]" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">{post.author}</span>
                                                </div>
                                                <div className="w-10 h-10 ultra-glass rounded-xl flex items-center justify-center text-[var(--primary-red)] group-hover:bg-[var(--primary-red)] group-hover:text-white transition-all duration-300">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Scanline Effect */}
                                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                                    </Motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </main>
    </div>
  );
};

export default Blog;
