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
import { motion as Motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { name: "Donation Requests", path: "/donation-requests" },
      { name: "Funding", path: "/funding" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "About Us", path: "/about" },
    ],
    resources: [
      { name: "Help & Support", path: "/help" },
      { name: "Blog", path: "/blog" },
      { name: "Contact Us", path: "/contact" },
      { name: "Search Donors", path: "/search" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "About VitalFlow", path: "/about" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-[var(--primary-red)] hover:border-[var(--primary-red)] hover:bg-[var(--primary-red-light)]/10" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-[var(--primary-red)] hover:border-[var(--primary-red)] hover:bg-[var(--primary-red-light)]/10" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-[var(--primary-red)] hover:border-[var(--primary-red)] hover:bg-[var(--primary-red-light)]/10" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-[var(--primary-red)] hover:border-[var(--primary-red)] hover:bg-[var(--primary-red-light)]/10" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-[var(--primary-red)] hover:border-[var(--primary-red)] hover:bg-[var(--primary-red-light)]/10" },
  ];

  return (
    <footer className="relative bg-[var(--background-main)] border-t border-[var(--border-light)] overflow-hidden">
      {/* Decorative Gradient Blob */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--primary-red)]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--primary-red)]/5 rounded-full blur-3xl pointer-events-none"></div>
      {/* Main Footer Content */}
      <div className="w-11/12 mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <Motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-12 h-12 flex items-center justify-center p-1"
              >
                <img
                  src={logo}
                  alt="VitalFlow Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(100,13,20,0.3)]"
                />
              </Motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gradient-crimson">
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
                    className="text-[var(--text-secondary)] hover:text-[var(--primary-red)] transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[var(--primary-red)] group-hover:w-3 transition-all duration-300"></span>
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
      <div className="border-t border-[var(--border-light)]">
        <div className="w-11/12 mx-auto py-6">
          <div className="flex flex-col items-center gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Motion.a
                  key={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 glass-morphism ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={2} />
                </Motion.a>
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
