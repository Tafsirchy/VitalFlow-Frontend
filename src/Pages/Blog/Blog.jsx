import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, Search, Tag } from "lucide-react";
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
              VitalFlow{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stories, tips, and insights from the world of blood donation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:focus:border-red-400 outline-none transition-all text-gray-900 dark:text-white"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 dark:text-gray-400">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-600 dark:bg-red-500 text-white text-sm font-bold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span className="text-sm">{post.date}</span>
                      </div>
                      <ArrowRight className="text-red-600 dark:text-red-400 group-hover:translate-x-2 transition-transform" size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
