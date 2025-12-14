import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Headphones,
  CheckCircle2,
  User,
  AtSign,
  Zap,
  HeartHandshake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      value: "+880 1712-345678",
      description: "Available 24/7",
      color: "bg-gradient-to-br from-[#C62828] to-[#B71C1C]",
      href: "tel:+8801712345678",
      iconColor: "text-[#C62828]",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "support@vitalflow.com",
      description: "Reply in 2 hours",
      color: "bg-gradient-to-br from-[#0D47A1] to-[#08306B]",
      href: "mailto:support@vitalflow.com",
      iconColor: "text-[#0D47A1]",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Agrabad, Chittagong",
      description: "Open Mon-Sat",
      color: "bg-gradient-to-br from-[#2E7D32] to-[#1B5E20]",
      href: "#",
      iconColor: "text-[#2E7D32]",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C62828 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-48 -right-48 w-96 h-96 bg-[#C62828] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#0D47A1] rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#FFEBEE] px-5 py-2 rounded-full mb-6"
          >
            <HeartHandshake className="text-[#C62828]" size={20} />
            <span className="font-bold text-sm text-[#C62828]">
              WE'RE HERE TO HELP
            </span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#212121]">Get in </span>
            <span className="text-[#C62828]">Touch</span>
          </h2>

          <p className="text-xl text-[#616161] leading-relaxed">
            Have questions about blood donation? Need urgent assistance?
            <br className="hidden md:block" />
            Our dedicated team is ready to support you 24/7.
          </p>
        </motion.div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto">
          {/* Contact Methods - Top Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-[#E0E0E0] cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`${method.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-xl`}
                  >
                    <method.icon className="text-white" size={28} />
                  </motion.div>

                  <h3 className="font-bold text-[#212121] mb-2">
                    {method.title}
                  </h3>
                  <p
                    className={`text-lg font-semibold ${method.iconColor} mb-1`}
                  >
                    {method.value}
                  </p>
                  <p className="text-sm text-[#9E9E9E]">{method.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form and Info Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-white to-[#FAFAFA] rounded-3xl shadow-2xl p-8 lg:p-10 border border-[#E0E0E0]">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C62828] to-[#B71C1C] text-white px-4 py-2 rounded-full mb-4 shadow-lg"
                  >
                    <MessageCircle size={18} className="animate-pulse" />
                    <span className="text-sm font-bold">QUICK RESPONSE</span>
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-3">
                    <span className="text-[#212121]">Drop us a </span>
                    <span className="bg-gradient-to-r from-[#C62828] to-[#B71C1C] bg-clip-text text-transparent">
                      Message
                    </span>
                  </h3>
                  <p className="text-[#616161] text-lg">
                    We'll get back to you within 2 hours
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-24 h-24 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                      >
                        <CheckCircle2 className="text-white" size={48} />
                      </motion.div>
                      <h4 className="text-3xl font-bold text-[#212121] mb-3">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-[#616161] text-lg">
                        We'll respond to you within 2 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Name and Phone Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#212121] mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User
                              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                                focusedField === "name"
                                  ? "text-[#C62828]"
                                  : "text-[#9E9E9E]"
                              }`}
                              size={20}
                            />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="John Doe"
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E0E0E0] rounded-xl focus:border-[#C62828] focus:ring-4 focus:ring-[#FFEBEE] outline-none transition-all text-[#212121]"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#212121] mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone
                              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                                focusedField === "phone"
                                  ? "text-[#C62828]"
                                  : "text-[#9E9E9E]"
                              }`}
                              size={20}
                            />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="+880 1712-345678"
                              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E0E0E0] rounded-xl focus:border-[#C62828] focus:ring-4 focus:ring-[#FFEBEE] outline-none transition-all text-[#212121]"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#212121] mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <AtSign
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                              focusedField === "email"
                                ? "text-[#C62828]"
                                : "text-[#9E9E9E]"
                            }`}
                            size={20}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E0E0E0] rounded-xl focus:border-[#C62828] focus:ring-4 focus:ring-[#FFEBEE] outline-none transition-all text-[#212121]"
                            required
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-[#212121] mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-4 bg-white border-2 border-[#E0E0E0] rounded-xl focus:border-[#C62828] focus:ring-4 focus:ring-[#FFEBEE] outline-none transition-all text-[#212121] cursor-pointer"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="urgent">Urgent Blood Request</option>
                          <option value="donation">Donation Information</option>
                          <option value="technical">Technical Support</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-[#212121] mb-2">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Tell us how we can help you..."
                          rows="5"
                          className="w-full px-4 py-4 bg-white border-2 border-[#E0E0E0] rounded-xl focus:border-[#C62828] focus:ring-4 focus:ring-[#FFEBEE] outline-none transition-all resize-none text-[#212121]"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full bg-gradient-to-r from-[#C62828] to-[#B71C1C] hover:from-[#B71C1C] hover:to-[#C62828] text-white font-bold py-5 rounded-xl shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 text-lg transition-all"
                      >
                        {isSubmitting ? (
                          <span className="loading loading-spinner loading-lg"></span>
                        ) : (
                          <>
                            <Send size={22} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sidebar Info - Takes 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Working Hours */}
              <div className="bg-gradient-to-br from-[#0D47A1] to-[#08306B] rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={28} />
                  <h3 className="text-2xl font-bold">Hours</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span className="font-semibold">Mon - Fri</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span className="font-semibold">Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span className="font-semibold">Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Emergency</span>
                    <span className="text-[#66BB6A] font-bold">24/7</span>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="text-[#66BB6A]" size={20} />
                    <span className="font-bold text-[#66BB6A]">
                      Emergency Line Active
                    </span>
                  </div>
                  <p className="text-sm text-white/80">
                    Available for urgent blood requests
                  </p>
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E0E0E0]">
                <h4 className="font-bold text-[#212121] mb-4 text-center">
                  Response Stats
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#FFEBEE] rounded-xl">
                    <div className="text-3xl font-bold text-[#C62828]">
                      2min
                    </div>
                    <div className="text-xs text-[#616161] mt-1">
                      Avg Response
                    </div>
                  </div>
                  <div className="text-center p-4 bg-[#E8F5E9] rounded-xl">
                    <div className="text-3xl font-bold text-[#2E7D32]">98%</div>
                    <div className="text-xs text-[#616161] mt-1">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-[#FFEBEE] to-white rounded-2xl p-6 border-2 border-[#C62828]/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C62828] rounded-full flex items-center justify-center mx-auto mb-3">
                    <HeartHandshake className="text-white" size={32} />
                  </div>
                  <h4 className="font-bold text-[#212121] mb-2">
                    Trusted by 15,000+ Donors
                  </h4>
                  <p className="text-sm text-[#616161]">
                    Join our community of lifesavers
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
