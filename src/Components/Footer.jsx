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
  Heart,
  ShieldCheck
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { name: "Emergency Requests", path: "/donation-requests" },
      { name: "Funding & Support", path: "/funding" },
      { name: "Donor Dashboard", path: "/dashboard" },
      { name: "About VitalFlow", path: "/about" },
    ],
    resources: [
      { name: "Help & FAQ", path: "/help" },
      { name: "Medical Blog", path: "/blog" },
      { name: "Contact & Desk", path: "/contact" },
      { name: "Find Donors Near You", path: "/search" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Health Verification Policy", path: "/about" },
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
    <footer className="relative bg-[var(--background-main)] border-t border-[var(--border-light)] dark:border-zinc-800/80 select-none">
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center p-1 rounded-xl bg-red-500/10 border border-red-500/20">
                <img
                  src={logo}
                  alt="VitalFlow Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gradient-crimson tracking-tight">
                  VitalFlow
                </h2>
                <p className="text-[11px] font-semibold tracking-wider text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                  <Activity size={11} className="text-red-600" />
                  National Life Grid
                </p>
              </div>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm font-normal">
              VitalFlow is dedicated to making voluntary blood donation accessible, swift, and transparent across every district. Every donor is a verified life-saver.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl border border-[var(--border-light)] dark:border-zinc-800 flex items-center justify-center text-[var(--text-secondary)] hover:text-red-600 hover:border-red-500/30 transition-colors shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider">
              Emergency Grid
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--primary-red)] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider">
              Support & Guide
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--primary-red)] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider">
              Verification & Trust
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--primary-red)] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Symmetrical Bottom Copyright Bar */}
      <div className="border-t border-[var(--border-light)] dark:border-zinc-800/80 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} VitalFlow National Emergency Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Encrypted Medical Standards</span>
            <span>•</span>
            <span>24/7 Verified Matching</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
