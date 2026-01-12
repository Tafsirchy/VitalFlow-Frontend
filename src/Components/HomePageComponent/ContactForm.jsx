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
import { motion as Motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

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
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 8 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 20 + Math.random() * 20
      }))
    );
  }, []);

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
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@vitalflow.com",
      badge: "2hr reply",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Agrabad, CTG",
      badge: "Mon-Sat",
      href: "#",
    },
  ];

  const achievements = [
    {
      icon: Users,
      label: "Active Donors",
      value: "15,000+",
    },
    {
      icon: Activity,
      label: "Lives Saved",
      value: "3,500+",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "98%",
    },
    {
      icon: TrendingUp,
      label: "Cities Covered",
      value: "50+",
    },
  ];

  return (
    <section className="py-10 bg-[var(--background-main)] relative overflow-hidden">
      {/* Animated Background Blobs */}
      <Motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-red-400 to-rose-500 rounded-full blur-3xl opacity-10"
      />
      <Motion.div
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
        className="absolute bottom-0 -right-32 w-80 h-80 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-red-dark)] rounded-full blur-3xl opacity-10"
      />

      {/* Floating Heart Particles (Blood Cells) */}
      {particles.map((particle, i) => (
        <Motion.div
          key={i}
          initial={{ y: "120vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.4, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
          className="absolute w-4 h-4 opacity-30"
          style={{ left: particle.left }}
        >
          <Heart
            className="w-full h-full text-red-600/30 drop-shadow-lg"
            fill="currentColor"
          />
        </Motion.div>
      ))}

      <div className="container mx-auto relative z-10 w-11/12 max-w-7xl">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-12"
        >
          <Motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-3 ultra-glass px-5 py-2.5 rounded-full mb-6 border border-white/10 shadow-lg"
          >
            <Motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <HeartHandshake className="text-red-600" size={20} />
            </Motion.div>
            <span className="font-black text-[var(--text-primary)] uppercase tracking-widest text-[10px]">
              We're Here to Help
            </span>
          </Motion.div>

          <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tighter uppercase">
            <Motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--text-primary)]"
            >
              Get in
            </Motion.span>{" "}
            <Motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.6 }}
              className="text-gradient-crimson italic"
            >
              Touch
            </Motion.span>
          </h2>

          <Motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base lg:text-lg text-[var(--text-secondary)] font-medium max-w-2xl mx-auto opacity-70"
          >
            Questions about blood donation? Need urgent assistance? We're here
            24/7 to support the biological cluster.
          </Motion.p>
        </Motion.div>

        {/* Contact Methods */}
        <Motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-8 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {contactMethods.map((method, idx) => (
            <Motion.a
              key={idx}
              href={method.href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative ultra-glass bg-white/5 rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-xl transition-all duration-500 border border-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 lg:w-16 lg:h-16 bg-premium-gradient rounded-2xl flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-12 transition-transform duration-500">
                   <method.icon className="text-white" size={28} />
                 </div>
                 <div className="space-y-0.5">
                    <h3 className="font-black text-sm text-red-600 uppercase tracking-widest">
                      {method.title}
                    </h3>
                    <p className="text-base lg:text-lg font-black text-[var(--text-primary)] tracking-tight">
                      {method.value}
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-red-600/10 text-red-600 text-[8px] font-black rounded-full uppercase tracking-tighter">
                      {method.badge}
                    </span>
                 </div>
              </div>
            </Motion.a>
          ))}
        </Motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
          {/* Contact Form */}
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="ultra-glass bg-white/5 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl p-6 lg:p-10 border border-white/10 h-full">
              <div className="text-center mb-8">
                <Motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center gap-3 bg-premium-gradient text-white px-5 py-2 rounded-full mb-4 shadow-xl"
                >
                  <MessageCircle size={18} className="animate-pulse" />
                  <span className="font-black uppercase tracking-widest text-[9px]">
                    Quick Response Link
                  </span>
                </Motion.div>
                <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">
                  Initiate <br />
                  <span className="text-gradient-crimson italic">Communication</span>
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <Motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <Motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                      <CheckCircle2 className="text-white" size={48} />
                    </Motion.div>
                    <h4 className="text-3xl font-black text-[var(--text-primary)] mb-2 uppercase tracking-tight">
                      Signal Transferred
                    </h4>
                    <p className="text-sm lg:text-base text-[var(--text-secondary)] font-medium opacity-70">
                      Thank you. Our biological core technicians will respond soon.
                    </p>
                  </Motion.div>
                ) : (
                  <Motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 lg:space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                      {["name", "phone"].map((field) => (
                        <div key={field}>
                          <label className="block text-[10px] font-black text-[var(--text-primary)] mb-2 uppercase tracking-[0.2em] opacity-50">
                            {field === "name" ? "Authorized Name" : "Pulse Interface"}
                          </label>
                          <div className="relative group">
                            {field === "name" ? (
                              <User
                                className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                                  focusedField === field
                                    ? "text-red-600"
                                    : "text-white/20"
                                }`}
                                size={18}
                              />
                            ) : (
                              <Phone
                                className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                                  focusedField === field
                                    ? "text-red-600"
                                    : "text-white/20"
                                }`}
                                size={18}
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
                                  ? "IDENTIFY..."
                                  : "+880Pulse..."
                              }
                              className="w-full pl-12 pr-5 py-3.5 lg:py-4 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl focus:border-red-600/50 focus:bg-white/10 outline-none transition-all text-sm lg:text-base text-[var(--text-primary)] font-black uppercase tracking-widest"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-primary)] mb-2 uppercase tracking-[0.2em] opacity-50">
                        Biological Address
                      </label>
                      <div className="relative group">
                        <AtSign
                          className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                            focusedField === "email"
                              ? "text-red-600"
                              : "text-white/20"
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
                          placeholder="CORE@NETWORK..."
                          className="w-full pl-12 pr-5 py-3.5 lg:py-4 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl focus:border-red-600/50 focus:bg-white/10 outline-none transition-all text-sm lg:text-base text-[var(--text-primary)] font-black uppercase tracking-widest"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-primary)] mb-2 uppercase tracking-[0.2em] opacity-50">
                        Neural Sector
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 lg:py-4 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl focus:border-red-600/50 focus:bg-white/10 outline-none transition-all cursor-pointer font-black text-xs lg:text-sm text-[var(--text-primary)] uppercase tracking-widest"
                        required
                      >
                        <option value="" className="bg-black text-white">Select Sector</option>
                        <option value="general" className="bg-black text-white">General Inquiry</option>
                        <option value="urgent" className="bg-black text-white">Urgent Blood Request</option>
                        <option value="donation" className="bg-black text-white">Donation Protocol</option>
                        <option value="technical" className="bg-black text-white">Tech Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-primary)] mb-2 uppercase tracking-[0.2em] opacity-50">
                        Transmission Content
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="INPUT BROADCAST MESSAGE..."
                        rows={4}
                        className="w-full px-5 py-3.5 lg:py-4 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl focus:border-red-600/50 focus:bg-white/10 outline-none transition-all resize-none font-medium text-sm lg:text-base text-[var(--text-primary)] uppercase tracking-tight"
                        required
                      />
                    </div>

                    <Motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="group w-full py-3 lg:py-4 bg-white text-black font-black text-base lg:text-lg rounded-xl lg:rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          />
                          <span className="uppercase tracking-[0.2em] text-xs">Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span className="uppercase tracking-[0.2em] text-xs lg:text-sm">Initiate Broadcast</span>
                        </>
                      )}
                    </Motion.button>
                  </Motion.form>
                )}
              </AnimatePresence>
            </div>
          </Motion.div>

          {/* Sidebar */}
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8.5"
          >
            {/* Working Hours */}
            <div className="bg-premium-gradient rounded-[2rem] lg:rounded-[3.5rem] p-6 lg:p-8 text-white shadow-2xl overflow-hidden relative border border-white/20">
              <Motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-16 -right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter italic">Sync Window</h3>
              </div>
              <div className="space-y-3 relative z-10">
                {[
                  ["Mon-Fri", "09:00 - 20:00"],
                  ["Saturday", "10:00 - 18:00"],
                  ["Sunday", "10:00 - 16:00"],
                ].map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between py-2.5 border-b border-white/10 last:border-0"
                  >
                    <span className="font-bold text-[10px] uppercase tracking-widest opacity-60">{day}</span>
                    <span className="font-black text-xs tracking-widest">{hours}</span>
                  </div>
                ))}
              </div>
              <Motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 relative z-10"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="font-black text-yellow-400 uppercase text-[9px] tracking-[0.3em]">
                    Pulse 24/7
                  </span>
                </div>
                <p className="text-[10px] uppercase font-bold opacity-70">
                  Emergency Bypass Active
                </p>
              </Motion.div>
            </div>

            {/* Impact Stats */}
            <div className="ultra-glass bg-white/5 border border-white/10 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 shadow-2xl">
              <h4 className="text-sm font-black text-center mb-6 lg:mb-8 text-red-600 uppercase tracking-[0.4em]">
                Network Impact
              </h4>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {achievements.map((stat, idx) => (
                  <Motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group"
                  >
                    <div
                      className="w-12 h-12 lg:w-14 lg:h-14 ultra-glass rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl border border-white/5 group-hover:border-red-600/30 transition-colors"
                    >
                      <stat.icon className="text-red-600" size={20} />
                    </div>
                    <div className="text-lg lg:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[8px] lg:text-[9px] text-[var(--text-secondary)] mt-0.5 font-black uppercase tracking-widest opacity-50">
                      {stat.label}
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
