import React, { useState, useEffect } from "react";
import {
  Cookie,
  Settings,
  Info,
  Shield,
  Activity,
  Globe,
  Lock,
  Database,
  CheckCircle2,
} from "lucide-react";

const sections = [
  { id: "intro", title: "1. What Are Cookies", icon: Info },
  { id: "types", title: "2. Types of Cookies We Use", icon: Database },
  { id: "purpose", title: "3. Purpose of Collection", icon: Activity },
  { id: "analytics", title: "4. Third-Party Analytics", icon: Globe },
  { id: "control", title: "5. Managing Preferences", icon: Settings },
  { id: "contact", title: "6. Questions & Contact", icon: Lock },
];

const CookiePolicy = () => {
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
              <Cookie size={13} className="text-[var(--primary-red)]" />
              <span>Session & Preferences</span>
            </div>
            <h1 className="section-title">
              Cookie <span className="text-gradient-crimson italic">Policy</span>
            </h1>
            <p className="section-subtitle">
              Learn how VitalFlow uses essential session tokens and analytics to deliver a secure, fast, and seamless experience.
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
                  1. What Are Cookies
                </h2>
                <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Cookies are small text files stored on your browser or device when you visit websites. They remember your authenticated login state, dark/light theme preferences, and essential session configurations.
                  </p>
                </div>
              </section>

              <section id="types" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  2. Types of Cookies We Use
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] space-y-2">
                    <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                      <Shield size={16} className="text-[var(--primary-red)]" /> Essential Cookies
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Required for secure authentication, session persistence, and CSRF protection. The platform cannot function properly without them.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[var(--background-main)] border border-[var(--border-light)] space-y-2">
                    <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                      <Activity size={16} className="text-blue-500" /> Preference Cookies
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Remember your UI settings, including theme mode (Dark/Light) and regional search preferences.
                    </p>
                  </div>
                </div>
              </section>

              <section id="purpose" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  3. Purpose of Collection
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We use cookies strictly to maintain user sessions, prevent unauthorized account takeovers, and ensure smooth navigation between donor dashboards and public search pages.
                </p>
              </section>

              <section id="analytics" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  4. Third-Party Analytics
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We may utilize anonymized analytics (such as Google Analytics or performance monitors) to detect website latency and improve loading speeds across slower 3G/4G connections in rural districts. No personal donor identities or blood types are ever transmitted to third-party ad networks.
                </p>
              </section>

              <section id="control" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  5. Managing Your Preferences
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  You can control or clear cookies at any time through your web browser settings (Chrome, Safari, Edge, Firefox). Please note that disabling essential cookies will prevent you from logging into your donor or admin dashboard.
                </p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                  6. Questions & Contact
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  If you have questions about our cookie usage, please contact our technical team:
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

export default CookiePolicy;
