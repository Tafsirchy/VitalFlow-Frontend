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
  Users,
  Activity,
  Award,
  TrendingUp,
  Heart,
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

  // Fixed: Removed TypeScript syntax
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Fixed: Removed TypeScript syntax
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
      color: "from-red-500 to-rose-600",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@vitalflow.com",
      badge: "2hr reply",
      color: "from-blue-500 to-indigo-600",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Agrabad, CTG",
      badge: "Mon-Sat",
      color: "from-emerald-500 to-teal-600",
      href: "#",
    },
  ];

  const achievements = [
    {
      icon: Users,
      label: "Active Donors",
      value: "15,000+",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: Activity,
      label: "Lives Saved",
      value: "3,500+",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "98%",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: TrendingUp,
      label: "Cities Covered",
      value: "50+",
      color: "from-orange-500 to-amber-600",
    },
  ];

  // Floating blood cell particles
  const particles = Array.from({ length: 8 });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-red-400 to-rose-500 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1.1, 1.4, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-0 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-30"
      />

      {/* Floating Heart Particles (Blood Cells) */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 1000 }}
          animate={{ y: [-200, window.innerHeight + 200] }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
          className="absolute w-5 h-5 opacity-50"
          style={{ left: `${Math.random() * 100}%` }}
        >
          <Heart
            className="w-full h-full text-red-500 drop-shadow-lg"
            fill="currentColor"
          />
        </motion.div>
      ))}

      <div className="container mx-auto relative z-10 w-11/12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-red-50/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-red-200 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <HeartHandshake className="text-red-600" size={24} />
            </motion.div>
            <span className="font-bold text-red-600 uppercase tracking-wider">
              We're Here to Help
            </span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-900"
            >
              Get in
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.6 }}
              className="bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 bg-clip-text text-transparent inline-block"
            >
              Touch
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Questions about blood donation? Need urgent assistance? We're here
            24/7 to support you.
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -12, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6`}
              >
                <method.icon className="text-white" size={36} />
              </motion.div>
              <h3 className="font-bold text-xl text-gray-900 text-center mb-2">
                {method.title}
              </h3>
              <p className="text-lg font-bold text-center mb-3 text-gray-800">
                {method.value}
              </p>
              <span className="inline-block mx-auto px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-full">
                {method.badge}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 h-full">
              <div className="text-center mb-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-full mb-6 shadow-xl"
                >
                  <MessageCircle size={22} className="animate-pulse" />
                  <span className="font-bold uppercase tracking-wide">
                    Quick Response
                  </span>
                </motion.div>
                <h3 className="text-4xl font-bold">
                  Drop us a{" "}
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Message
                  </span>
                </h3>
                <p className="text-gray-600 mt-3">
                  We'll respond within 2 hours
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                    >
                      <CheckCircle2 className="text-white" size={64} />
                    </motion.div>
                    <h4 className="text-4xl font-bold text-gray-900 mb-4">
                      Message Sent!
                    </h4>
                    <p className="text-xl text-gray-600">
                      Thank you. We'll get back soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {["name", "phone"].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                            {field === "name" ? "Full Name" : "Phone"}
                          </label>
                          <div className="relative">
                            {field === "name" ? (
                              <User
                                className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${
                                  focusedField === field
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                                size={22}
                              />
                            ) : (
                              <Phone
                                className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${
                                  focusedField === field
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                                size={22}
                              />
                            )}
                            <input
                              type={field === "phone" ? "tel" : "text"}
                              name={field}
                              value={formData[field]}
                              onChange={handleChange}
                              onFocus={() => setFocusedField(field)}
                              onBlur={() => setFocusedField(null)}
                              placeholder={
                                field === "name"
                                  ? "John Doe"
                                  : "+880 1712-345678"
                              }
                              className="w-full pl-14 pr-5 py-4 bg-gray-50/70 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all text-gray-900 font-medium"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                        Email
                      </label>
                      <div className="relative">
                        <AtSign
                          className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${
                            focusedField === "email"
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                          size={22}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="john@example.com"
                          className="w-full pl-14 pr-5 py-4 bg-gray-50/70 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50/70 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all cursor-pointer font-medium text-gray-900"
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
                      <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you today?"
                        rows={5}
                        className="w-full px-5 py-4 bg-gray-50/70 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all resize-none font-medium text-gray-900"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70"
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
                            className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                          />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={24} />
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Working Hours */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
              />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Clock size={28} />
                </div>
                <h3 className="text-2xl font-bold">Working Hours</h3>
              </div>
              <div className="space-y-4">
                {[
                  ["Mon-Fri", "9:00 AM - 8:00 PM"],
                  ["Saturday", "10:00 AM - 6:00 PM"],
                  ["Sunday", "10:00 AM - 4:00 PM"],
                ].map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between py-3 border-b border-white/20 last:border-0"
                  >
                    <span className="font-semibold">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-5 text-center border border-white/30"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="text-yellow-300" size={20} />
                  <span className="font-bold text-yellow-300 uppercase text-sm">
                    Emergency 24/7
                  </span>
                </div>
                <p className="text-sm opacity-90">
                  Always here when you need us
                </p>
              </motion.div>
            </div>

            {/* Impact Stats */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
              <h4 className="text-2xl font-bold text-center mb-8 text-gray-900">
                Our Impact
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-center"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
                    >
                      <stat.icon className="text-white" size={28} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 font-medium">
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
