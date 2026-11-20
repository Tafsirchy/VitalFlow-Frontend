import React from "react";
import { Link } from "react-router";
import { Droplet, Heart, Home, Search, ArrowRight } from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const NotFoundPage = () => {
  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-10 sm:py-14 lg:py-16 px-4">
        <div className="max-w-xl mx-auto text-center space-y-5">
          {/* Symmetrical 404 Icon & Badge */}
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 text-[var(--primary-red)] flex items-center justify-center mx-auto shadow-lg shadow-red-500/10">
              <Droplet size={48} fill="currentColor" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[var(--primary-red)] text-white text-[10px] font-black shadow-md">
              404
            </div>
          </div>

          {/* Headings */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
              The page you are looking for does not exist or may have been relocated. Every second counts in saving lives — let's guide you back to the network.
            </p>
          </div>

          {/* Symmetrical Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              to="/"
              className="btn-premium !px-6 !py-2.5 text-xs font-bold flex items-center gap-2 shadow-md shadow-red-600/20"
            >
              <Home size={16} />
              <span>Return to Home</span>
            </Link>

            <Link
              to="/search"
              className="px-8 py-4 rounded-2xl bg-[var(--background-card)] border border-[var(--border-light)] hover:border-[var(--primary-red)] text-sm font-bold text-[var(--text-primary)] transition-all flex items-center gap-2 shadow-sm"
            >
              <Search size={18} className="text-[var(--primary-red)]" />
              <span>Search Donors</span>
            </Link>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-medium">
            VitalFlow — Bangladesh's 24/7 Voluntary Blood Donation Network
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
