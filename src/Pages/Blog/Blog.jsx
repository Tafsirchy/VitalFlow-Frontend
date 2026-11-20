import React, { useState } from "react";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Newspaper,
  Heart,
  Bookmark,
} from "lucide-react";
import { useNavigate } from "react-router";

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
        "Everything you need to know before your first blood donation: from hydration and nutrition to the donation procedure and post-donation care.",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1000&h=675&fit=crop&q=80",
      author: "Dr. Sarah Ahmed",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      category: "donation tips",
    },
    {
      id: 2,
      title: "The Science Behind Blood Types & Compatibility",
      excerpt:
        "An in-depth explanation of ABO antigens, the Rh factor, why compatibility matters in transfusions, and why Type O Negative is the universal donor.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&h=675&fit=crop&q=80",
      author: "Dr. Michael Chen",
      date: "Jan 3, 2026",
      readTime: "7 min read",
      category: "health",
    },
    {
      id: 3,
      title: "How One Single Donation Saved Three Lives in Chittagong",
      excerpt:
        "A heartwarming medical account of how a whole blood donation was fractionated into red cells, platelets, and plasma to rescue three critical patients.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1000&h=675&fit=crop&q=80",
      author: "Priya Patel",
      date: "Dec 28, 2025",
      readTime: "4 min read",
      category: "success stories",
    },
    {
      id: 4,
      title: "VitalFlow Network Surpasses 15,000 Verified Donors",
      excerpt:
        "Reflecting on a milestone of civic solidarity across Bangladesh as thousands of voluntary donors register to protect emergency patients.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1000&h=675&fit=crop&q=80",
      author: "VitalFlow Team",
      date: "Dec 25, 2025",
      readTime: "3 min read",
      category: "news",
    },
    {
      id: 5,
      title: "Pre-Donation Nutrition: What to Eat & Avoid",
      excerpt:
        "Clinical guidance on iron-rich meals, proper water intake, and foods to avoid on the morning of your voluntary blood donation appointment.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&h=675&fit=crop&q=80",
      author: "Dr. Sarah Ahmed",
      date: "Dec 20, 2025",
      readTime: "6 min read",
      category: "donation tips",
    },
    {
      id: 6,
      title: "Understanding Platelet & Plasma Donation",
      excerpt:
        "How apheresis donation helps dengue patients, cancer patients undergoing chemotherapy, and burn victims requiring critical clotting factors.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&h=675&fit=crop&q=80",
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
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
            <div className="section-eyebrow">
              <Newspaper size={13} className="text-[var(--primary-red)]" />
              <span>Medical Knowledge & Stories</span>
            </div>
            <h1 className="section-title">
              VitalFlow Journal & <br />
              <span className="text-gradient-crimson italic">Donor Health Insights</span>
            </h1>
            <p className="section-subtitle">
              Expert clinical advice, blood transfusion science, practical donor preparation guides, and true life-saving stories from across our community.
            </p>
          </div>

          {/* Search & Categories Bar */}
          <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 shadow-sm mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Search Input */}
              <div className="relative w-full lg:flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles, guides, or medical topics..."
                  className="w-full h-11 pl-10 pr-3.5 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                      selectedCategory === cat
                        ? "bg-[var(--primary-red)] text-white border-[var(--primary-red)] shadow-sm"
                        : "bg-[var(--background-main)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--primary-red)]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Article Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl">
              <Newspaper size={32} className="text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No Articles Found</h3>
              <p className="text-xs text-[var(--text-secondary)]">Try searching with different keywords or switch categories.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[var(--primary-red)]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Featured Image */}
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-red)] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-3 text-xs font-semibold text-[var(--text-muted)] mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-[var(--primary-red)]" /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-[var(--primary-red)]" /> {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--primary-red)] transition-colors leading-snug mb-2">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-[var(--border-light)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)] font-semibold">
                      <User size={13} className="text-[var(--primary-red)]" />
                      <span>{post.author}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 font-bold text-[var(--primary-red)] group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
