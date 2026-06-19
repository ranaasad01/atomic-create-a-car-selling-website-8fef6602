"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle as Twitter, Globe as Facebook, Briefcase as Linkedin, Camera as Instagram, Sparkles } from 'lucide-react';
import { navLinks, APP_NAME, APP_DESCRIPTION } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "#inventory" },
  { label: "Featured Cars", href: "#featured" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[#0a0a16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#e94560] flex items-center justify-center shadow-lg shadow-[#e94560]/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Auto</span>
                <span className="text-[#e94560]">Elite</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {APP_DESCRIPTION}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#e94560]/20 hover:text-[#e94560] text-white/50 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/50 hover:text-[#e94560] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#e94560] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Car Types */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Browse By Type
            </h3>
            <ul className="space-y-3">
              {[
                "Sedans",
                "SUVs & Crossovers",
                "Sports Cars",
                "Electric Vehicles",
                "Trucks & Pickups",
                "Luxury Cars",
              ].map((type) => (
                <li key={type}>
                  <Link
                    href={getHref("#inventory")}
                    onClick={(e) => handleLinkClick(e, "#inventory")}
                    className="text-white/50 hover:text-[#e94560] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#e94560] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e94560] mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">
                  1200 Auto Drive, Suite 400
                  <br />
                  Los Angeles, CA 90001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e94560] shrink-0" />
                <a
                  href="tel:+13105550199"
                  className="text-white/50 hover:text-[#e94560] text-sm transition-colors"
                >
                  +1 (310) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e94560] shrink-0" />
                <a
                  href="mailto:hello@autoelite.com"
                  className="text-white/50 hover:text-[#e94560] text-sm transition-colors"
                >
                  hello@autoelite.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}