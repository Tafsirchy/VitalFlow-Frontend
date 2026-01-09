import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
} from "lucide-react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpTopics = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using VitalFlow",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: MessageCircle,
      title: "Donation Process",
      description: "How to request and donate blood",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: HelpCircle,
      title: "Account & Profile",
      description: "Manage your account settings",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the 'Register' button in the top right corner, fill in your details including name, email, blood type, and location. Verify your email and you're all set!",
    },
    {
      question: "How can I request blood?",
      answer:
        "Once logged in, go to your Dashboard and click 'Add Request'. Fill in the required details including blood type needed, hospital location, urgency level, and contact information.",
    },
    {
      question: "How do I find donors near me?",
      answer:
        "Use the 'Search' feature in the navigation bar. You can filter by blood type, location (district/upazila), and availability. The system will show you compatible donors in your area.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes! We use enterprise-grade encryption to protect your data. Your contact information is only shared with verified users, and you have full control over your privacy settings.",
    },
    {
      question: "How long does blood donation take?",
      answer:
        "The actual blood donation takes about 10-15 minutes. However, the entire process including registration, health screening, and post-donation refreshments typically takes 45-60 minutes.",
    },
    {
      question: "Can I donate blood if I have a tattoo?",
      answer:
        "Yes, you can donate if your tattoo is at least 6 months old and was done at a licensed facility using sterile equipment. Always inform the medical staff about recent tattoos or piercings.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 3 months (12 weeks). Platelet donations can be done more frequently, up to 24 times a year. Always consult with medical professionals before donating.",
    },
    {
      question: "What should I do after donating?",
      answer:
        "Rest for 10-15 minutes, drink plenty of fluids, eat something, avoid heavy lifting for a few hours, and keep the bandage on for at least 4 hours. If you feel dizzy or unwell, contact medical staff immediately.",
    },
    {
      question: "How can I delete my account?",
      answer:
        "Go to Dashboard > Profile > Account Settings and click 'Delete Account'. Note that this action is irreversible and all your data will be permanently removed.",
    },
    {
      question: "Who can I contact for urgent support?",
      answer:
        "For urgent blood requests or emergencies, call our 24/7 helpline at +880 1712-345678. For general inquiries, use the contact form or email support@vitalflow.com.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <HelpCircle className="w-20 h-20 mx-auto mb-6 text-red-600 dark:text-red-400" />
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
              How Can We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400">
                Help?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions and get the support you need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="w-11/12 max-w-4xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-red-500 dark:focus:border-red-400 outline-none transition-all text-lg text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">
            Browse by Topic
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {helpTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${topic.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {topic.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="w-11/12 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className={`${
                        expandedFaq === index
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-400"
                      }`}
                      size={24}
                    />
                  </motion.div>
                </button>

                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No results found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-blue-600 dark:from-red-700 dark:to-blue-700">
        <div className="w-11/12 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-black mb-6">Still Need Help?</h2>
          <p className="text-xl mb-8">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Mail size={24} />
              Contact Us
            </a>
            <a
              href="tel:+8801712345678"
              className="px-8 py-4 bg-transparent border-4 border-white text-white font-bold rounded-xl hover:bg-white hover:text-red-600 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Phone size={24} />
              Call Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
