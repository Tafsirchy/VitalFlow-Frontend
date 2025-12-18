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
      color: "from-red-600 to-red-700",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@vitalflow.com",
      badge: "2hr reply",
      color: "from-blue-600 to-blue-700",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Agrabad, CTG",
      badge: "Mon-Sat",
      color: "from-green-600 to-green-700",
      href: "#",
    },
  ];

  const achievements = [
    {
      icon: Users,
      label: "Active Donors",
      value: "15,000+",
      color: "from-red-600 to-red-700",
    },
    {
      icon: Activity,
      label: "Lives Saved",
      value: "3,500+",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "98%",
      color: "from-green-600 to-green-700",
    },
    {
      icon: TrendingUp,
      label: "Cities Covered",
      value: "50+",
      color: "from-orange-600 to-orange-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-red-600 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10 w-11/12 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-red-50 px-5 py-2.5 rounded-full mb-6 border border-red-100"
          >
            <HeartHandshake className="text-red-600" size={20} />
            <span className="font-bold text-sm text-red-600 uppercase tracking-wide">
              We're Here to Help
            </span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900">Get in </span>
            <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Questions about blood donation? Need urgent assistance? We're here
            24/7 to support you.
          </p>
        </motion.div>

        {/* Contact Method Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 group overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <div className="relative flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <method.icon className="text-white" size={28} />
                </motion.div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-base">
                      {method.title}
                    </h3>
                    <span className="text-xs px-2.5 py-1 bg-red-50 text-red-600 rounded-full font-semibold">
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 break-words">
                    {method.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-200 h-full">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full mb-4 shadow-lg"
                >
                  <MessageCircle size={18} className="animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Quick Response
                  </span>
                </motion.div>
                <h3 className="text-3xl font-bold mb-3">
                  <span className="text-gray-900">Drop us a </span>
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Message
                  </span>
                </h3>
                <p className="text-gray-600">We'll respond within 2 hours</p>
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
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                      <CheckCircle2 className="text-white" size={48} />
                    </motion.div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-3">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-600 text-lg">
                      We'll respond within 2 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                              focusedField === "name"
                                ? "text-red-600"
                                : "text-gray-400"
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
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all text-gray-900"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                              focusedField === "phone"
                                ? "text-red-600"
                                : "text-gray-400"
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
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all text-gray-900"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Email
                      </label>
                      <div className="relative">
                        <AtSign
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                            focusedField === "email"
                              ? "text-red-600"
                              : "text-gray-400"
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
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all cursor-pointer text-gray-900"
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
                      <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows="5"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all resize-none text-gray-900"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                          />
                          <span>Sending...</span>
                        </>
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

          {/* Sidebar - 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Working Hours Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock size={22} />
                </div>
                <h3 className="text-xl font-bold">Working Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Mon-Fri", "9:00 AM - 8:00 PM"],
                  ["Saturday", "10:00 AM - 6:00 PM"],
                  ["Sunday", "10:00 AM - 4:00 PM"],
                ].map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between items-center py-3 border-b border-white/20 last:border-0"
                  >
                    <span className="font-semibold">{day}</span>
                    <span className="text-white/90 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-5 bg-white/15 rounded-xl p-4 text-center backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="text-green-400" size={18} />
                  <span className="font-bold text-green-400 text-sm uppercase tracking-wide">
                    Emergency 24/7
                  </span>
                </div>
                <p className="text-xs text-white/90">
                  Available for urgent requests anytime
                </p>
              </motion.div>
            </div>

            {/* Impact Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-5 text-center text-lg">
                Our Impact
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                    >
                      <stat.icon className="text-white" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
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
