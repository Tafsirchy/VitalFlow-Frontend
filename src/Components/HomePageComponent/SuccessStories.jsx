import React from "react";
import { Heart, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import emergencyImg from "../../assets/success_story_emergency.png";
import communityImg from "../../assets/success_story_community.png";
import rareBloodImg from "../../assets/success_story_rare_blood.png";
import milestoneImg from "../../assets/success_story_milestone.png";

const SuccessStories = () => {
  const stories = [
    {
      title: "The Two-Hour Miracle",
      desc: "Emergency O-negative units were matched and delivered to the central surgical ICU within 90 minutes, stabilizing a patient following a severe collision.",
      location: "Dhaka Medical College Hospital",
      date: "Dec 2025",
      image: emergencyImg,
      impact: "Life Saved",
      tag: "Emergency Trauma"
    },
    {
      title: "Pediatric Care Drive",
      desc: "Over 45 voluntary donors coordinated through VitalFlow to provide ongoing platelet transfusions for pediatric oncology patients across four weeks.",
      location: "Chittagong Children's Hospital",
      date: "Nov 2025",
      image: communityImg,
      impact: "45+ Transfusions",
      tag: "Pediatric Support"
    },
    {
      title: "Rare Blood Group Match",
      desc: "When a mother experienced severe obstetric hemorrhage requiring rare AB-negative blood, a verified donor responded within 35 minutes.",
      location: "Sylhet Osmani Medical",
      date: "Oct 2025",
      image: rareBloodImg,
      impact: "Mother & Child Safe",
      tag: "Rare Blood Match"
    },
    {
      title: "4,000th Donation Milestone",
      desc: "A milestone celebrated with our 4,000th verified match, demonstrating the strength and compassion of our growing nationwide donor family.",
      location: "National Community Network",
      date: "Sep 2025",
      image: milestoneImg,
      impact: "4,000th Match",
      tag: "Network Milestone"
    }
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-main)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <Heart size={13} className="text-red-600" />
            <span>Stories of Hope & Recovery</span>
          </div>

          <h2 className="section-title">
            Every Donation Has a <span className="text-gradient-crimson italic">Story</span>
          </h2>

          <p className="section-subtitle">
            True accounts from families, doctors, and volunteer heroes where immediate voluntary blood donation made the ultimate difference.
          </p>
        </div>

        {/* 4 Symmetric Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stories.map((story, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-[var(--border-light)] dark:border-zinc-800 p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/5 group"
            >
              <div className="space-y-3">
                {/* Image Container */}
                <div className="h-40 sm:h-44 w-full rounded-xl overflow-hidden bg-black/5 relative">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md">
                    {story.impact}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-red-600" /> {story.location}</span>
                </div>

                {/* Title & Body */}
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--primary-red)] transition-colors">
                  {story.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  {story.desc}
                </p>
              </div>

              {/* Tag Footer */}
              <div className="pt-3 mt-4 border-t border-[var(--border-light)] dark:border-zinc-800/80 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--primary-red)]">{story.tag}</span>
                <span>{story.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;
