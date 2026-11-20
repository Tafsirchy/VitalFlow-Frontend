import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Bell,
  ChevronRight,
  Activity,
  FileText,
  Globe,
  Clock,
  CheckCircle2,
} from "lucide-react";

const sections = [
  { id: "intro", title: "1. Overview", icon: FileText },
  { id: "collection", title: "2. Information We Collect", icon: Database },
  { id: "usage", title: "3. How We Use Information", icon: Activity },
  { id: "sharing", title: "4. Information Sharing", icon: Globe },
  { id: "security", title: "5. Data Security", icon: Shield },
  { id: "rights", title: "6. Your Privacy Rights", icon: UserCheck },
  { id: "retention", title: "7. Data Retention", icon: Clock },
  { id: "contact", title: "8. Privacy Inquiries", icon: Bell },
];

const PrivacyPolicy = () => {
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
              <Shield size={13} className="text-[var(--primary-red)]" />
              <span>Confidentiality & Compliance</span>
            </div>
            <h1 className="section-title">
              Privacy <span className="text-gradient-crimson italic">Policy</span>
            </h1>
            <p className="section-subtitle">
              VitalFlow is committed to protecting your personal, medical, and contact information with the highest standards of data security and ethics.
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
                  1. Overview & Commitment
                </h2>
                <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Welcome to VitalFlow. As a voluntary humanitarian network dedicated to emergency blood matching across Bangladesh, we understand that trust is fundamental. This policy explains what information we collect, why we collect it, and how your privacy is safeguarded.
                  </p>
                  <p>
                    By creating an account, registering as a voluntary donor, or submitting a blood request on VitalFlow, you agree to the data collection and usage practices described herein.
                  </p>
                </div>
              </section>

              <section id="collection" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  2. Information We Collect
                </h2>
                <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>We collect only the essential details required to facilitate voluntary blood donation matching:</p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)]">
                      <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Donor Information</h4>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        <li>• Full name & contact phone number</li>
                        <li>• Blood group (ABO & Rh factor)</li>
                        <li>• Geographical district & upazila</li>
                        <li>• Date of last donation</li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)]">
                      <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Patient Requests</h4>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        <li>• Patient name & hospital facility</li>
                        <li>• Required blood group & units</li>
                        <li>• Urgency date and time</li>
                        <li>• Contact person email and phone</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="usage" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  3. How We Use Information
                </h2>
                <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>Your information is used strictly to achieve life-saving coordination:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Matching patient requirements with nearby compatible voluntary donors.</li>
                    <li>Notifying registered donors of urgent needs in their registered upazila or district.</li>
                    <li>Enabling direct, transparent communication between patient families and matched donors.</li>
                    <li>Maintaining platform security, preventing spam, and auditing donation integrity.</li>
                  </ul>
                </div>
              </section>

              <section id="sharing" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  4. Information Sharing & Protection
                </h2>
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                  <strong>Zero Commercialization Guarantee:</strong> VitalFlow will NEVER sell, lease, rent, or monetize your personal or medical data to third-party advertisers or commercial entities under any circumstances.
                </div>
              </section>

              <section id="security" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  5. Data Security Standards
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  All communications and authentication transactions are encrypted using industry-standard TLS 1.3 / SSL protocols. Passwords and credentials are stored using salted cryptographic hashes.
                </p>
              </section>

              <section id="rights" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  6. Your Privacy Rights
                </h2>
                <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>You have the right at any time to:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Access and update your profile details via the Member Dashboard.</li>
                    <li>Update your availability status (e.g., mark temporarily unavailable after donating).</li>
                    <li>Request complete account deactivation and removal of your contact information.</li>
                  </ul>
                </div>
              </section>

              <section id="retention" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  7. Data Retention Policy
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Donation request logs and activity histories are retained for verification, medical integrity, and community statistics. Upon account deletion, all personal contact information is anonymized.
                </p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  8. Privacy Inquiries
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  For questions regarding our privacy practices or to submit a data inquiry, please contact our data compliance desk at:
                </p>
                <div className="p-4 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] font-bold text-sm text-[var(--primary-red)] inline-block">
                  privacy@vitalflow.com
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
