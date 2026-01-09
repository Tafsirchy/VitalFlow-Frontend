import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+880 1712-345678",
      subtitle: "24/7 Emergency Line",
      color: "from-red-500 to-rose-600",
      href: "tel:+8801712345678",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@vitalflow.com",
      subtitle: "Response within 2 hours",
      color: "from-blue-500 to-indigo-600",
      href: "mailto:support@vitalflow.com",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Agrabad, Chittagong",
      subtitle: "Mon-Sat: 9 AM - 6 PM",
      color: "from-green-500 to-emerald-600",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions? Need help? We're here 24/7 to support you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 text-center group"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <Icon className="text-white" size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {info.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {info.subtitle}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="w-11/12 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We'll respond within 2 hours
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="py-16 text-center"
              >
                <CheckCircle className="w-24 h-24 text-green-600 dark:text-green-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Message Sent!
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition-all text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1712-345678"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition-all text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition-all text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition-all text-gray-900 dark:text-white"
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

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-4 top-4 text-gray-400"
                      size={20}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition-all resize-none text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-500 dark:to-rose-500 hover:from-red-700 hover:to-rose-700 text-white font-bold py-5 rounded-xl shadow-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-3xl p-12 text-white text-center"
          >
            <Clock className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Office Hours</h3>
            <div className="space-y-2 text-lg">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
              <p className="text-yellow-300 font-bold mt-4">
                Emergency Support: 24/7
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
