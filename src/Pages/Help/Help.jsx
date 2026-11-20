import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  Activity,
  ShieldCheck,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Droplet,
} from "lucide-react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpTopics = [
    {
      icon: BookOpen,
      title: "Getting Started as a Donor",
      description: "How to register, verify your profile, and receive emergency donation notices in your district.",
    },
    {
      icon: Droplet,
      title: "Requesting Blood in Emergencies",
      description: "Step-by-step guidance on creating verified donation requests for hospitalized patients.",
    },
    {
      icon: ShieldCheck,
      title: "Safety & Medical Standards",
      description: "Eligibility criteria, donation intervals, and hospital safety protocols across Bangladesh.",
    },
  ];

  const faqs = [
    {
      question: "Who is eligible to donate blood through VitalFlow?",
      answer:
        "Healthy individuals aged 18 to 60, weighing at least 45 kg (for females) or 50 kg (for males), with normal hemoglobin levels (12.5 g/dL+) and no recent history of major infections, surgeries, or high-risk medications.",
    },
    {
      question: "How long must I wait between blood donations?",
      answer:
        "For whole blood donations, the safe interval is 90 days (3 months) for men and 120 days (4 months) for women. For platelet apheresis donations, you may donate every 14 days, up to 24 times per year.",
    },
    {
      question: "Does VitalFlow charge any fee for connecting donors?",
      answer:
        "Never. VitalFlow is 100% free and voluntary. Buying or selling blood is strictly illegal under Bangladesh law and completely prohibited on our network.",
    },
    {
      question: "How do I request blood for an emergency patient?",
      answer:
        "Navigate to 'Create Request' or the emergency form, specify the patient name, hospital, required blood group, date, and contact number. Our platform immediately notifies registered donors in your upazila and district.",
    },
    {
      question: "How does hospital verification work?",
      answer:
        "Donations take place exclusively at registered hospitals or certified blood banks. The treating facility performs cross-matching, ABO screening, and transmissible infection testing (HIV, Hepatitis B/C, Syphilis, Malaria) before transfusion.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
            <div className="section-eyebrow">
              <HelpCircle size={13} className="text-[var(--primary-red)]" />
              <span>Assistance & Knowledge Desk</span>
            </div>
            <h1 className="section-title">
              How Can We <br />
              <span className="text-gradient-crimson italic">Support You Today?</span>
            </h1>
            <p className="section-subtitle">
              Find fast answers to common questions about voluntary blood donation, patient emergency requests, donor eligibility, and hospital verification.
            </p>

            {/* Search Input */}
            <div className="mt-5 max-w-2xl mx-auto relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search topics (e.g., eligibility, intervals, emergency)..."
                className="w-full h-11 pl-11 pr-4 bg-[var(--background-card)] border border-[var(--border-light)] rounded-xl text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] shadow-sm transition-all"
              />
            </div>
          </div>

          {/* 3 Guide Topic Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 lg:mb-10">
            {helpTopics.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <div
                  key={idx}
                  className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:border-[var(--primary-red)]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-[var(--text-primary)] mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* FAQ Accordion Section */}
          <div className="max-w-4xl mx-auto mb-8 lg:mb-10">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-1.5">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Essential information on voluntary blood donation and hospital protocols.
              </p>
            </div>

            <div className="space-y-2.5">
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-3 font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--primary-red)] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[var(--text-muted)] transition-transform duration-300 shrink-0 ${
                        expandedFaq === idx ? "rotate-180 text-[var(--primary-red)]" : ""
                      }`}
                    />
                  </button>

                  {expandedFaq === idx && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-light)]/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-10 bg-[var(--background-card)] border border-[var(--border-light)] rounded-xl text-[var(--text-muted)]">
                  <p className="font-semibold text-xs sm:text-sm">No matching questions found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Emergency 24/7 Helpline Banner */}
          <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 text-center max-w-4xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center mx-auto mb-3">
              <Phone size={22} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-1.5">
              Need Immediate Emergency Help?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed mb-5">
              If a patient requires emergency blood right now, call our 24/7 national emergency coordination helpline directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:+8801712345678"
                className="btn-premium !px-6 !py-3 text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg shadow-red-600/20"
              >
                <Phone size={15} />
                <span>Call Hotline: +880 1712-345678</span>
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)] hover:border-[var(--primary-red)] text-xs uppercase tracking-wider font-bold text-[var(--text-primary)] transition-all"
              >
                Send Support Ticket
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
