import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  Activity,
  ShieldCheck,
  Building,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent to our coordination team.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 1200);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      value: "+880 1712-345678",
      subtitle: "24/7 National Emergency Blood Helpline",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Support Email",
      value: "support@vitalflow.com",
      subtitle: "Inquiries & Hospital Coordination",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      value: "Agrabad C/A, Chittagong",
      subtitle: "Central Operations & Volunteer Center",
      href: "#",
    },
  ];

  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
            <div className="section-eyebrow">
              <Phone size={13} className="text-[var(--primary-red)]" />
              <span>We Are Here 24/7</span>
            </div>
            <h1 className="section-title">
              Contact VitalFlow & <br />
              <span className="text-gradient-crimson italic">Emergency Support</span>
            </h1>
            <p className="section-subtitle">
              Need immediate blood for a critical patient, have questions about donation, or wish to partner as a hospital? Our coordination desk is always available.
            </p>
          </div>

          {/* 3 Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 lg:mb-10">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <a
                  key={idx}
                  href={info.href}
                  className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:border-[var(--primary-red)]/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-[var(--text-primary)] mb-1">
                    {info.title}
                  </h3>
                  <p className="text-sm font-black text-[var(--primary-red)] mb-1">
                    {info.value}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-medium">
                    {info.subtitle}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Contact & Coordination Form */}
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-start max-w-6xl mx-auto">
            {/* Left Guidance Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                  Send a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  For non-urgent inquiries, hospital integrations, or feedback, submit your details. Our coordination desk will respond within 2 to 4 hours.
                </p>
              </div>

              <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 text-[var(--primary-red)] flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">Emergency Dispatch</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">24 Hours / 7 Days a week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Building size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">Administrative Desk</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">Confidential Communications</h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Your personal data is protected by strict privacy policies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7 bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-xl">
              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)]">
                    Message Successfully Delivered
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Our support coordinator will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-lg bg-[var(--background-main)] border border-[var(--border-light)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--primary-red)] transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+880 1712-000000"
                        className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Inquiry Category
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all cursor-pointer"
                    >
                      <option value="">Select Topic</option>
                      <option value="urgent">Emergency Blood Need Assistance</option>
                      <option value="donor">Voluntary Donor Registration Query</option>
                      <option value="hospital">Hospital Partnership Inquiry</option>
                      <option value="technical">Platform Feedback or Bug Report</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Describe your inquiry in detail..."
                      className="w-full p-3 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-premium w-full !h-12 !rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="animate-spin" size={16} />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
