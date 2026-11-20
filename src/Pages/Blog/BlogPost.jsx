import React from "react";
import { useParams, useNavigate } from "react-router";
import { motion as Motion, useScroll } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  Hospital,
} from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const blogPosts = {
    "1": {
      id: 1,
      title: "5 Essential Tips for First-Time Blood Donors",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&h=675&fit=crop",
      author: "Dr. Sarah Ahmed",
      role: "Hematology & Transfusion Specialist",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      category: "donation tips",
      content: `
## Introduction

Donating blood for the first time is one of the most direct and meaningful ways to save a life. Knowing what to expect and following simple preparation steps ensures your donation is comfortable, quick, and rewarding. Here are five essential tips from our medical team.

## 1. Stay Thoroughly Hydrated

Proper hydration keeps your blood volume balanced and makes finding a vein straightforward for hospital staff.

- Drink at least 500ml (2 glasses) of water 30–60 minutes prior to your appointment.
- Avoid caffeine and caffeinated sodas on the morning of donation, as they act as mild diuretics.
- Continue drinking fluids steadily for the next 24 to 48 hours after donating.

## 2. Consume an Iron-Rich Meal

Iron is the foundation of hemoglobin, the protein responsible for transporting oxygen throughout your body.

**Best foods before donating:**
- Spinach, lentils, beans, and dark green vegetables
- Lean poultry or beef
- Iron-fortified cereals and citrus fruits (Vitamin C enhances iron absorption)

Avoid fatty foods right before donating, as excess fats in the bloodstream can interfere with blood testing.

## 3. Prioritize Rest and Sleep

Being well-rested reduces the chance of dizziness and helps your cardiovascular system adjust smoothly during and after donation.

- Aim for 7 to 8 hours of restful sleep the night before.
- Avoid heavy gym workouts or vigorous physical labor on the day of donation.

## 4. Carry Valid Identification

Medical safety protocols require positive donor identification:
- National ID (NID), Passport, or Driving License
- Any records of past donations or donor club cards
- A list of any daily prescription medications you take

## 5. Communicate Openly with Healthcare Staff

Don't hesitate to inform the nursing or phlebotomy team that this is your first time. They will guide you through each step, keep you relaxed, and ensure you remain comfortable throughout the 10-minute donation procedure.

## Post-Donation Care

After donating, spend 10 to 15 minutes in the refreshment area enjoying juice and snacks. Keep the small sterile bandage on for a few hours, avoid heavy lifting for the rest of the day, and celebrate the fact that your single donation can save up to three lives.
      `,
    },
    "2": {
      id: 2,
      title: "The Science Behind Blood Types & Compatibility",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=675&fit=crop",
      author: "Dr. Michael Chen",
      role: "Transfusion Medicine Director",
      date: "Jan 3, 2026",
      readTime: "7 min read",
      category: "health",
      content: `
## Understanding Human Blood Groups

Human blood groups are determined by the presence or absence of specific protein markers (antigens) on the surface of red blood cells. The two most critical classifications are the ABO system and the Rh factor.

## The ABO System

- **Type A:** Carries A antigens on red blood cells and anti-B antibodies in plasma.
- **Type B:** Carries B antigens on red blood cells and anti-A antibodies in plasma.
- **Type AB:** Carries both A and B antigens, with no antibodies against either.
- **Type O:** Carries neither A nor B antigens, but carries both anti-A and anti-B antibodies.

## The Rh Factor (Positive vs. Negative)

In addition to ABO antigens, red blood cells may carry the Rh factor protein:
- If present, you are **Rh-positive (+)**.
- If absent, you are **Rh-negative (-)**.

Rh-negative blood is significantly rarer in Bangladesh (roughly 2-3% of the population), making voluntary Rh-negative donors extraordinarily vital for emergency maternal care and trauma units.

## Universal Donor & Universal Recipient

- **O Negative (O-):** Known as the universal red blood cell donor, since its cells lack A, B, and Rh antigens, allowing safe emergency transfusions when a patient's blood type cannot be tested in time.
- **AB Positive (AB+):** Known as the universal red blood cell recipient, as their plasma contains no antibodies against foreign red blood cells.

## Why Accurate Typing Matters

Administering an incompatible blood unit causes acute hemolytic transfusion reactions, which can be life-threatening. Through VitalFlow, every patient request undergoes strict ABO/Rh cross-matching at the treating hospital before transfusion.
      `,
    },
  };

  const post = blogPosts[id] || blogPosts["1"];

  return (
    <div className="min-h-screen bg-[var(--background-main)] text-[var(--text-primary)]">
      <Motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--primary-red)] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="py-6 sm:py-10 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-colors mb-4 group"
          >
            <div className="p-1.5 rounded-lg bg-[var(--background-card)] border border-[var(--border-light)] group-hover:border-[var(--primary-red)] transition-all">
              <ArrowLeft size={13} />
            </div>
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <header className="mb-5 text-center sm:text-left">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[var(--primary-red)]/10 text-[var(--primary-red)] text-xs font-bold uppercase tracking-wider mb-2.5">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] leading-tight tracking-tight mb-3">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 pb-3 border-b border-[var(--border-light)] text-xs text-[var(--text-secondary)] font-medium">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-[var(--primary-red)]" />
                <span className="font-bold text-[var(--text-primary)]">{post.author}</span>
                <span className="text-[var(--text-muted)]">({post.role})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[var(--primary-red)]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[var(--primary-red)]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-md mb-6 aspect-[16/9]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Body */}
          <article className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-[var(--text-secondary)] leading-relaxed font-normal">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-6 mb-2">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="ml-4 list-disc text-sm sm:text-base">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="font-bold text-[var(--text-primary)] text-sm sm:text-base">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.trim() === "") return null;
              return <p key={i} className="text-sm sm:text-base leading-relaxed">{line}</p>;
            })}
          </article>

          {/* Author Bio Box */}
          <div className="mt-8 pt-5 border-t border-[var(--border-light)] bg-[var(--background-card)] border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center font-bold text-xl shrink-0">
              {post.author.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-black text-[var(--text-primary)]">{post.author}</h3>
              <p className="text-[11px] text-[var(--primary-red)] font-bold uppercase tracking-wider">{post.role}</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Dedicated to clinical safety, voluntary donor education, and public health awareness within the VitalFlow network.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
