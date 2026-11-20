import React, { useState, useEffect } from "react";
import {
  Scale,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Activity,
  Lock,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

const sections = [
  { id: "intro", title: "1. Acceptance of Terms", icon: FileText },
  { id: "eligibility", title: "2. Eligibility Criteria", icon: UserCheck },
  { id: "accounts", title: "3. Account Responsibilities", icon: Lock },
  { id: "prohibited", title: "4. Prohibited Activities", icon: XCircle },
  { id: "protocols", title: "5. Donation Protocols", icon: Activity },
  { id: "disclaimers", title: "6. Medical Disclaimers", icon: AlertTriangle },
  { id: "liability", title: "7. Limitation of Liability", icon: Scale },
  { id: "contact", title: "8. Legal Inquiries", icon: Shield },
];

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
            <div className="section-eyebrow">
              <Scale size={13} className="text-[var(--primary-red)]" />
              <span>User Agreement & Framework</span>
            </div>
            <h1 className="section-title">
              Terms of <span className="text-gradient-crimson italic">Service</span>
            </h1>
            <p className="section-subtitle">
              The operational rules and legal commitments governing your participation in the VitalFlow voluntary blood donation network.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Sticky Sidebar ToC */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 shadow-sm space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 px-2.5">
                  Document Sections
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        activeSection === section.id
                          ? "bg-[var(--primary-red)] text-white shadow-sm"
                          : "text-[var(--text-secondary)] hover:bg-[var(--background-main)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <section.icon size={14} />
                      <span className="truncate">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Document Content */}
            <div className="lg:col-span-8 bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm space-y-8">
              <section id="intro" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    By accessing or using the VitalFlow platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must refrain from using the platform.
                  </p>
                  <p>
                    These terms apply to all visitors, registered donors, patient coordinators, volunteers, and administrative personnel who interact with our network.
                  </p>
                </div>
              </section>

              <section id="eligibility" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  2. Eligibility Criteria
                </h2>
                <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>To register as a voluntary blood donor on VitalFlow, you must:</p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] space-y-1">
                      <div className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span>Age & Weight Threshold</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">Be 18 to 60 years of age and weigh at least 45 kg.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] space-y-1">
                      <div className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span>Truthful Medical Disclosure</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">Provide accurate personal and contact information.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="accounts" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  3. User Account Responsibilities
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  You are responsible for safeguarding your login credentials. You agree to notify VitalFlow immediately if you suspect any unauthorized access to your account.
                </p>
              </section>

              <section id="prohibited" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  4. Strictly Prohibited Activities
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
                    <h4 className="font-bold text-sm text-red-600 flex items-center gap-2">
                      <XCircle size={16} /> Commercial Exploitation
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Commercial buying or selling of blood units is strictly illegal under the laws of Bangladesh and will result in immediate permanent account termination and referral to legal authorities.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
                    <h4 className="font-bold text-sm text-red-600 flex items-center gap-2">
                      <XCircle size={16} /> Misrepresentation
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Impersonating medical staff, falsifying patient requirements, or scraping donor directories for marketing purposes is strictly forbidden.
                    </p>
                  </div>
                </div>
              </section>

              <section id="protocols" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  5. Clinical Donation Protocols
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  VitalFlow operates exclusively as a communication and matching directory. Actual blood collection, screening, cross-matching, and transfusion must occur exclusively at certified hospitals and registered blood centers under licensed clinical supervision.
                </p>
              </section>

              <section id="disclaimers" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  6. Medical Disclaimers
                </h2>
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                  <strong>Notice:</strong> VitalFlow is a voluntary civic matching tool and does not provide direct medical diagnosis or treatment. The treating hospital is solely responsible for determining donor suitability, disease screening, and blood compatibility before any transfusion.
                </div>
              </section>

              <section id="liability" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  To the fullest extent permitted by law, VitalFlow and its volunteer operators shall not be liable for any indirect, incidental, or consequential damages arising from interactions between voluntary donors and patient families.
                </p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  8. Legal & Operational Inquiries
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  For official inquiries regarding these terms or institutional hospital agreements, please contact:
                </p>
                <div className="p-4 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] font-bold text-sm text-[var(--primary-red)] inline-block">
                  legal@vitalflow.com
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
