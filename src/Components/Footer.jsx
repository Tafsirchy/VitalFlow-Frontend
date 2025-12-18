import React from "react";
import { Link } from "react-router";
import logo from "../assets/image.png";
import {
  Activity,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { name: "Donation Requests", path: "/donation-requests" },
      { name: "Funding", path: "/funding" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "About Us", path: "/about" },
    ],
    resources: [
      { name: "Blood Donation Guide", path: "/guide" },
      { name: "FAQs", path: "/faqs" },
      { name: "Blog", path: "/blog" },
      { name: "Contact Support", path: "/support" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Disclaimer", path: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="w-11/12 mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-12 h-12 flex items-center justify-center p-1"
              >
                <img
                  src={logo}
                  alt="VitalFlow Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  VitalFlow
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Activity size={12} />
                  Blood Donation Platform
                </p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Connecting life-savers with those in need. VitalFlow is dedicated
              to making blood donation accessible, efficient, and impactful for
              communities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-red-600 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-600 group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-blue-600 group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gray-900 group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Centered Copyright and Social Icons */}
      <div className="border-t border-gray-300">
        <div className="w-11/12 mx-auto py-6">
          <div className="flex flex-col items-center gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={2} />
                </motion.a>
              ))}
            </div>

            {/* Copyright - Centered */}
            <p className="text-gray-600 text-sm text-center">
              © {new Date().getFullYear()} VitalFlow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
