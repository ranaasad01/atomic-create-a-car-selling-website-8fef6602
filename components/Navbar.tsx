"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from 'lucide-react';
import { navLinks, APP_NAME, CTA_LABEL, CTA_HREF } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
      // If not on homepage, let Next.js navigate to /#section naturally
    } else {
      setIsOpen(false);
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d1a]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-[#e94560] flex items-center justify-center shadow-lg shadow-[#e94560]/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Auto</span>
                <span className="text-[#e94560]">Elite</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#e94560] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={getHref(CTA_HREF)}
                onClick={(e) => handleNavClick(e, CTA_HREF)}
                className="px-5 py-2.5 bg-[#e94560] hover:bg-[#d63a55] text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-[#e94560]/25"
              >
                {CTA_LABEL}
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[#0d0d1a]/98 backdrop-blur-md border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                className="mt-2"
              >
                <Link
                  href={getHref(CTA_HREF)}
                  onClick={(e) => handleNavClick(e, CTA_HREF)}
                  className="block w-full text-center px-5 py-3 bg-[#e94560] hover:bg-[#d63a55] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  {CTA_LABEL}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}