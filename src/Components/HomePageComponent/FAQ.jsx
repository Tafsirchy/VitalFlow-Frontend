import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Heart, Activity, CheckCircle2 } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Who is eligible to donate blood?",
      answer: "Individuals aged 18 to 65, weighing at least 50 kg (110 lbs), and in good general health are eligible. You must have a minimum 90-day quiescent period since your last whole blood donation and meet standard blood pressure and hemoglobin guidelines verified on-site.",
      category: "Eligibility"
    },
    {
      question: "How often can I safely donate blood?",
      answer: "Whole blood donations can be made safely every 12 weeks (3 months) for male donors and every 16 weeks (4 months) for female donors. Specialized platelet apheresis donations can occur every 2 to 4 weeks under medical guidance.",
      category: "Frequency"
    },
    {
      question: "Is the donation process sterile and safe?",
      answer: "Absolutely. Every single donation uses new, factory-sealed, single-use sterile equipment. The needle and collection tubing are immediately disposed of in biohazard containers after one use. It is physically impossible to contract any infectious disease through donating blood.",
      category: "Safety"
    },
    {
      question: "How long does the entire appointment take?",
      answer: "The total visit takes approximately 45 to 60 minutes. This includes a confidential health history check, a quick hemoglobin fingerstick test, 8 to 10 minutes for the actual blood draw, and 15 minutes of rest with refreshments.",
      category: "Process"
    },
    {
      question: "What should I do before and after my donation?",
      answer: "Before donating, drink 2 to 3 glasses of water and eat a wholesome meal within 3 hours (avoid greasy foods). After donating, stay hydrated, keep the bandage on for a few hours, avoid heavy lifting for the rest of the day, and enjoy your refreshments.",
      category: "Preparation"
    }
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-main)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <HelpCircle size={13} className="text-red-600" />
            <span>Donation Guide & Medical Safety</span>
          </div>

          <h2 className="section-title">
            Frequently Asked <span className="text-gradient-crimson italic">Questions</span>
          </h2>

          <p className="section-subtitle">
            Clear, transparent medical guidance on donor eligibility, safety standards, and what to expect during your life-saving appointment.
          </p>
        </div>

        {/* Centered Symmetrical Accordion */}
        <div className="max-w-3xl mx-auto space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/90 rounded-xl border border-[var(--border-light)] dark:border-zinc-800 overflow-hidden transition-all hover:border-red-500/30 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 font-bold text-sm sm:text-base text-[var(--text-primary)]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold text-[var(--primary-red)] uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-500/10 dark:bg-red-500/15">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[var(--primary-red)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 sm:pb-5 pt-0 border-t border-[var(--border-light)] dark:border-zinc-800/60 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
