import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  User,
  AtSign,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  Loader2
} from "lucide-react";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "24/7 Emergency Line",
      value: "+880 1712-345678",
      badge: "Immediate Response",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Donor Support Email",
      value: "support@vitalflow.org",
      badge: "Replies in < 2 Hours",
      href: "mailto:support@vitalflow.org",
    },
    {
      icon: MapPin,
      title: "National Headquarters",
      value: "Agrabad Commercial Area, Chattogram",
      badge: "Open 6 Days/Week",
      href: "#",
    },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-[var(--background-main)] border-b border-[var(--border-light)] dark:border-zinc-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetric Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="section-eyebrow mx-auto">
            <HeartHandshake size={13} className="text-red-600" />
            <span>Support & Coordination</span>
          </div>

          <h2 className="section-title">
            Get in Touch With <span className="text-gradient-crimson italic">Our Team</span>
          </h2>

          <p className="section-subtitle">
            Need urgent assistance, have questions regarding eligibility, or interested in organizing a community blood drive? We are here for you 24/7.
          </p>
        </div>

        {/* 3 Symmetric Contact Cards with Negative Space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.href}
              className="bg-white dark:bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-[var(--border-light)] dark:border-zinc-800 shadow-sm hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/5 transition-all group flex items-start gap-4"
            >
              <div className="w-11 h-11 bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 rounded-xl flex items-center justify-center text-[var(--primary-red)] shrink-0 group-hover:scale-105 transition-transform">
                <method.icon size={20} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[var(--primary-red)] uppercase tracking-wider block">
                  {method.badge}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                  {method.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Form and Sidebar Container with Symmetrical Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-[var(--border-light)] dark:border-zinc-800 shadow-sm">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Message Sent Successfully</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                  Thank you for reaching out. A VitalFlow medical coordinator will respond to your inquiry promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                      <User size={12} className="text-red-600" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-[var(--border-light)] dark:border-zinc-700 text-[var(--text-primary)] focus:border-red-600 focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                      <AtSign size={12} className="text-red-600" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tanvir@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-[var(--border-light)] dark:border-zinc-700 text-[var(--text-primary)] focus:border-red-600 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                      <Phone size={12} className="text-red-600" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1700-000000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-[var(--border-light)] dark:border-zinc-700 text-[var(--text-primary)] focus:border-red-600 focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                      <MessageCircle size={12} className="text-red-600" /> Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Urgent Blood Request Query"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-[var(--border-light)] dark:border-zinc-700 text-[var(--text-primary)] focus:border-red-600 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, patient location, or how we can assist..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-[var(--border-light)] dark:border-zinc-700 text-[var(--text-primary)] focus:border-red-600 focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[var(--primary-red)] hover:bg-[var(--primary-red-hover)] text-white font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-colors shadow-lg disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message to Team</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gradient-to-br from-[#250902] via-[#640d14] to-[#800e13] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold">Coordination Hours</h3>
                  <p className="text-xs text-white/70">Central Dispatch Desk</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-3">
                <div className="flex justify-between text-xs py-1 border-b border-white/10">
                  <span className="text-white/70">Monday - Friday</span>
                  <span className="font-bold">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-white/10">
                  <span className="text-white/70">Saturday</span>
                  <span className="font-bold">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-white/10">
                  <span className="text-white/70">Sunday</span>
                  <span className="font-bold">09:00 - 18:00</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <ShieldCheck size={15} />
                  <span>24/7 Emergency Transfusion Desk</span>
                </div>
                <p className="text-[11px] text-white/75 mt-1">
                  For immediate trauma or surgical crises, our emergency line is staffed 24/7.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactUs;
