import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Heart, Users, ShieldCheck } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Farhana Yasmin",
      role: "ICU Specialist, DMCH",
      image: "https://images.unsplash.com/photo-1594824813589-98006e8f471e?auto=format&fit=crop&w=400&q=80",
      quote: "VitalFlow has transformed how we manage acute surgical trauma. In cases where every 10 minutes matter, having verified voluntary donors located within kilometers saves lives before complications arise.",
      bloodType: "A+",
      stats: "Partnered on 120+ Matches"
    },
    {
      name: "Tanvir Chowdhury",
      role: "Voluntary Regular Donor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "Donating through VitalFlow is effortless. You receive an alert, confirm your availability, and the hospital coordinator handles everything smoothly. I've donated 8 times now and will continue.",
      bloodType: "O+",
      stats: "8 Donations Completed"
    },
    {
      name: "Nusrat Jahan",
      role: "Recovered Patient's Sister",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "When my brother was undergoing emergency neurosurgery, our family was devastated and scrambling for rare blood. Within 40 minutes of posting on VitalFlow, two donors arrived at the blood bank.",
      bloodType: "B-",
      stats: "Emergency Recipient"
    },
    {
      name: "Kazi Moniruzzaman",
      role: "Community Blood Drive Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      quote: "The transparency and security of VitalFlow gives our donors confidence. No middle-agents, no confusion—just direct, compassionate community solidarity.",
      bloodType: "O-",
      stats: "15 Donations Completed"
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-section)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <Users size={13} className="text-red-600" />
            <span>Community Trust & Testimonials</span>
          </div>

          <h2 className="section-title">
            Trusted by Doctors & <span className="text-gradient-crimson italic">Donors</span>
          </h2>

          <p className="section-subtitle">
            Hear directly from medical professionals, selfless voluntary donors, and the families whose lives were saved by our emergency network.
          </p>
        </div>

        {/* Featured Testimonial Card with Generous Negative Space */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900/90 rounded-2xl sm:rounded-3xl border border-[var(--border-light)] dark:border-zinc-800 p-5 sm:p-8 lg:p-10 shadow-lg shadow-black/5 relative">
          
          <Quote className="text-red-600/20 absolute top-5 right-5 sm:top-8 sm:right-8" size={48} />

          <div className="relative z-10 space-y-5">
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-primary)] font-normal leading-relaxed italic">
              "{current.quote}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[var(--border-light)] dark:border-zinc-800/80">
              <div className="flex items-center gap-3.5">
                <img 
                  src={current.image} 
                  alt={current.name} 
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-red-500/20"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">
                    {current.role} • <span className="text-red-600 font-semibold">{current.stats}</span>
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={prev}
                  aria-label="Previous Testimonial"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-[var(--text-primary)] transition-colors flex items-center justify-center border border-[var(--border-light)] dark:border-zinc-700 active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-xs font-bold text-[var(--text-muted)] px-1.5">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={next}
                  aria-label="Next Testimonial"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-red-500/10 hover:text-red-600 text-[var(--text-primary)] transition-colors flex items-center justify-center border border-[var(--border-light)] dark:border-zinc-700 active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
