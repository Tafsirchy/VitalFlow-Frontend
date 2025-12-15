import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  User,
  AtSign,
  Zap,
  HeartHandshake,
  CheckCircle2,
  Activity,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [focusedField, setFocusedField] = useState(null);

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
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency",
      value: "+880 1712-345678",
      badge: "24/7",
      color: "from-[#C62828] to-[#B71C1C]",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@vitalflow.com",
      badge: "2hr reply",
      color: "from-[#0D47A1] to-[#08306B]",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Agrabad, CTG",
      badge: "Mon-Sat",
      color: "from-[#2E7D32] to-[#1B5E20]",
      href: "#",
    },
  ];

  const achievements = [
    {
      icon: Users,
      label: "Active Donors",
      value: "15,000+",
      color: "from-[#C62828] to-[#B71C1C]",
    },
    {
      icon: Activity,
      label: "Lives Saved",
      value: "3,500+",
      color: "from-[#0D47A1] to-[#08306B]",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "98%",
      color: "from-[#2E7D32] to-[#1B5E20]",
    },
    {
      icon: TrendingUp,
      label: "Cities Covered",
      value: "50+",
      color: "from-[#D84315] to-[#BF360C]",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-[#C62828] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0D47A1] rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-flex items-center gap-2 bg-[#FFEBEE] px-4 py-2 rounded-full mb-4"
          >
            <HeartHandshake className="text-[#C62828]" size={18} />
            <span className="font-bold text-xs text-[#C62828]">
              WE'RE HERE TO HELP
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-[#212121]">Get in </span>
            <span className="text-[#C62828]">Touch</span>
          </h2>
          <p className="text-lg text-[#616161]">
            Questions about blood donation? Need urgent assistance? We're here
            24/7.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all border border-[#E0E0E0] group overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <div className="relative flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <method.icon className="text-white" size={24} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#212121] text-sm">
                      {method.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-[#FFEBEE] text-[#C62828] rounded-full font-semibold">
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#0D47A1] truncate">
                    {method.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-[#E0E0E0]">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C62828] to-[#B71C1C] text-white px-3 py-1.5 rounded-full mb-3 shadow-lg"
                >
                  <MessageCircle size={16} className="animate-pulse" />
                  <span className="text-xs font-bold">QUICK RESPONSE</span>
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">
                  <span className="text-[#212121]">Drop us a </span>
                  <span className="bg-gradient-to-r from-[#C62828] to-[#B71C1C] bg-clip-text text-transparent">
                    Message
                  </span>
                </h3>
                <p className="text-[#616161]">We'll respond within 2 hours</p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="w-20 h-20 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                    >
                      <CheckCircle2 className="text-white" size={40} />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-[#212121] mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-[#616161]">
                      We'll respond within 2 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#212121] mb-1.5">
                          FULL NAME
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                              focusedField === "name"
                                ? "text-[#C62828]"
                                : "text-[#9E9E9E]"
                            }`}
                            size={18}
                          />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe"
                            className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-xl focus:bg-white focus:border-[#C62828] focus:ring-2 focus:ring-[#FFEBEE] outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#212121] mb-1.5">
                          PHONE
                        </label>
                        <div className="relative">
                          <Phone
                            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                              focusedField === "phone"
                                ? "text-[#C62828]"
                                : "text-[#9E9E9E]"
                            }`}
                            size={18}
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="+880 1712-345678"
                            className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-xl focus:bg-white focus:border-[#C62828] focus:ring-2 focus:ring-[#FFEBEE] outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#212121] mb-1.5">
                        EMAIL
                      </label>
                      <div className="relative">
                        <AtSign
                          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                            focusedField === "email"
                              ? "text-[#C62828]"
                              : "text-[#9E9E9E]"
                          }`}
                          size={18}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="john@example.com"
                          className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-xl focus:bg-white focus:border-[#C62828] focus:ring-2 focus:ring-[#FFEBEE] outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#212121] mb-1.5">
                        SUBJECT
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-xl focus:bg-white focus:border-[#C62828] focus:ring-2 focus:ring-[#FFEBEE] outline-none transition-all cursor-pointer"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="urgent">Urgent Blood Request</option>
                        <option value="donation">Donation Info</option>
                        <option value="technical">Tech Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#212121] mb-1.5">
                        MESSAGE
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows="4"
                        className="w-full px-4 py-3 bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-xl focus:bg-white focus:border-[#C62828] focus:ring-2 focus:ring-[#FFEBEE] outline-none transition-all resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-[#C62828] to-[#B71C1C] hover:from-[#B71C1C] hover:to-[#C62828] text-white font-bold py-4 rounded-xl shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Working Hours */}
            <div className="bg-gradient-to-br from-[#0D47A1] to-[#08306B] rounded-2xl p-5 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={22} />
                <h3 className="text-lg font-bold">Working Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ["Mon-Fri", "9:00 AM - 8:00 PM"],
                  ["Saturday", "10:00 AM - 6:00 PM"],
                  ["Sunday", "10:00 AM - 4:00 PM"],
                ].map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between py-2 border-b border-white/20 last:border-0"
                  >
                    <span className="font-semibold">{day}</span>
                    <span className="text-white/90">{hours}</span>
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Zap className="text-[#66BB6A]" size={16} />
                  <span className="font-bold text-[#66BB6A] text-xs">
                    EMERGENCY 24/7
                  </span>
                </div>
                <p className="text-xs text-white/80">
                  Available for urgent requests
                </p>
              </motion.div>
            </div>

            {/* Response Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-[#E0E0E0]">
                <div className="text-3xl font-bold text-[#C62828]">2min</div>
                <div className="text-xs text-[#616161] mt-1">Response</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center border border-[#E0E0E0]">
                <div className="text-3xl font-bold text-[#2E7D32]">98%</div>
                <div className="text-xs text-[#616161] mt-1">Satisfaction</div>
              </div>
            </div>

            {/* Trust Badge */}
            {/* <div className="bg-gradient-to-br from-[#FFEBEE] to-white rounded-xl p-5 border-2 border-[#C62828]/20 text-center">
              <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center mx-auto mb-3">
                <HeartHandshake className="text-white" size={22} />
              </div>
              <h4 className="font-bold text-[#212121] text-sm mb-1">
                15,000+ Donors Trust Us
              </h4>
              <p className="text-xs text-[#616161]">
                Join our lifesaving community
              </p>
            </div> */}

            {/* Impact Statistics */}
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-[#E0E0E0]">
              <h4 className="font-bold text-[#212121] mb-4 text-center">
                Our Impact
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-3 bg-gradient-to-br from-[#FAFAFA] to-white rounded-xl border border-[#E0E0E0]"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <stat.icon className="text-white" size={18} />
                    </div>
                    <div className="text-xl font-bold text-[#212121]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#616161] mt-0.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
