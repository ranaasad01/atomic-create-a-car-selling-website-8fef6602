"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, Shield, Award, Headphones, ChevronRight, Fuel, Gauge, Settings, MapPin, Phone, Mail, CheckCircle, ArrowRight, Car, Users, TrendingUp, Heart } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  CTA_LABEL,
  CTA_HREF,
  BRAND_COLORS,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const featuredCars = [
  {
    id: 1,
    name: "BMW M4 Competition",
    year: 2024,
    price: 89500,
    mileage: 1200,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://www.topgear.com/sites/default/files/2024/10/1-BMW-M4-review-2024-UK.jpg",
    badge: "New Arrival",
    rating: 4.9,
    reviews: 24,
  },
  {
    id: 2,
    name: "Mercedes-Benz GLE 63",
    year: 2023,
    price: 112000,
    mileage: 8400,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://wieck-mbusa-production.s3.amazonaws.com/photos/bf54041590dbd5f04db0229d7dab2b2fb821fd0e/preview-928x522.jpg",
    badge: "Hot Deal",
    rating: 4.8,
    reviews: 31,
  },
  {
    id: 3,
    name: "Porsche 911 Carrera S",
    year: 2024,
    price: 145000,
    mileage: 500,
    fuel: "Petrol",
    transmission: "PDK",
    image: "https://a.storyblok.com/f/322327/3840x1266/cd758f4c72/cz26w03ox0004-carrera-s-desktop.jpg/m/2560x822/smart/filters:format(webp)?dpl=dpl_H8NsfKgAzDVwzxAg3jaVYta9BHaC",
    badge: "Premium",
    rating: 5.0,
    reviews: 18,
  },
  {
    id: 4,
    name: "Audi RS6 Avant",
    year: 2023,
    price: 98000,
    mileage: 5600,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://hips.hearstapps.com/hmg-prod/images/2026-audi-rs6-avant-performance-109-692f1db9029cf.jpg",
    badge: "Popular",
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 5,
    name: "Tesla Model S Plaid",
    year: 2024,
    price: 104000,
    mileage: 2100,
    fuel: "Electric",
    transmission: "Single Speed",
    image: "https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-s-plaid-134-68f6610846819.jpg?crop=0.769xw:0.578xh;0.172xw,0.285xh&resize=1200:*",
    badge: "Electric",
    rating: 4.9,
    reviews: 37,
  },
  {
    id: 6,
    name: "Range Rover Sport SVR",
    year: 2023,
    price: 128000,
    mileage: 11200,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://www.thedrive.com/wp-content/uploads/images-by-url-td/content/2018/07/hero-20180711-xt2x4325.jpg",
    badge: "Luxury SUV",
    rating: 4.8,
    reviews: 29,
  },
];

const whyUsItems = [
  {
    icon: Shield,
    title: "Certified & Inspected",
    description:
      "Every vehicle undergoes a rigorous 150-point inspection by certified mechanics before listing. Zero surprises, guaranteed.",
  },
  {
    icon: Award,
    title: "Best Price Promise",
    description:
      "We match or beat any competitor's price on equivalent vehicles. Drive away knowing you got the best deal on the market.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Our expert advisors are available 7 days a week to guide you through every step — from browsing to driving off the lot.",
  },
  {
    icon: TrendingUp,
    title: "Flexible Financing",
    description:
      "Tailored finance plans with rates from 3.9% APR. Get pre-approved in minutes with no impact on your credit score.",
  },
  {
    icon: CheckCircle,
    title: "Full History Reports",
    description:
      "Comprehensive vehicle history reports included free with every listing — accidents, ownership, service records and more.",
  },
  {
    icon: Heart,
    title: "7-Day Return Policy",
    description:
      "Not completely in love? Return your car within 7 days, no questions asked. Your satisfaction is our top priority.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "James Hartwell",
    role: "Entrepreneur",
    avatar: "https://www.carsmart.net/static/dealer-20788/7_day_alt.png",
    rating: 5,
    text: "AutoElite made buying my Porsche 911 an absolute pleasure. The team was transparent, knowledgeable, and the car was exactly as described. I'll never buy from anywhere else.",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Marketing Director",
    avatar: "https://simons.berkeley.edu/sites/default/files/styles/post_card_lg_2x/public/sophiachen-2.jpeg.jpg?h=1e66e246&itok=uwDk6IIX",
    rating: 5,
    text: "I was nervous about buying a luxury car online, but AutoElite's 7-day return policy and detailed inspection reports gave me total confidence. My Mercedes arrived flawless.",
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Architect",
    avatar: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3122882.png&w=350&h=254",
    rating: 5,
    text: "The financing process was seamless — pre-approved in under 10 minutes. The team found me a better rate than my own bank. Couldn't be happier with my BMW M4.",
  },
];

const stats = [
  { value: "12,000+", label: "Cars Sold", icon: Car },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
  { value: "500+", label: "Trusted Dealers", icon: Users },
  { value: "15 Yrs", label: "Industry Experience", icon: Award },
];

const inventoryFilters = ["All", "Sedan", "SUV", "Sports", "Electric", "Luxury"];

const contactInfo = [
  { icon: MapPin, label: "123 AutoElite Boulevard, Los Angeles, CA 90001" },
  { icon: Phone, label: "+1 (800) 555-AUTO" },
  { icon: Mail, label: "hello@autoelite.com" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

function CarCard({ car, index }: { car: (typeof featuredCars)[0]; index: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#e94560]/40 hover:shadow-xl hover:shadow-[#e94560]/10 transition-all duration-300"
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 bg-[#e94560] text-white text-xs font-semibold rounded-full shadow-lg">
          {car.badge}
        </span>
      </div>

      {/* Wishlist */}
      <button
        onClick={() => setLiked((p) => !p)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-[#e94560]/20 transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            liked ? "text-[#e94560] fill-[#e94560]" : "text-white/70"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23e94560' font-size='14' font-family='sans-serif'%3ECar Image%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-bold text-base leading-tight">{car.name}</h3>
            <p className="text-white/40 text-xs mt-0.5">{car.year}</p>
          </div>
          <div className="text-right">
            <p className="text-[#e94560] font-bold text-lg">
              ${(car.price ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <StarRating rating={car.rating} />
          <span className="text-white/40 text-xs">({car.reviews})</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg p-2">
            <Gauge className="w-3.5 h-3.5 text-[#e94560]" />
            <span className="text-white/60 text-xs">{(car.mileage ?? 0).toLocaleString()} mi</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg p-2">
            <Fuel className="w-3.5 h-3.5 text-[#e94560]" />
            <span className="text-white/60 text-xs">{car.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/5 rounded-lg p-2">
            <Settings className="w-3.5 h-3.5 text-[#e94560]" />
            <span className="text-white/60 text-xs truncate">{car.transmission?.split(" ")?.[0] ?? "Auto"}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 bg-[#e94560]/10 hover:bg-[#e94560] border border-[#e94560]/30 hover:border-[#e94560] text-[#e94560] hover:text-white text-sm font-semibold rounded-xl transition-all duration-200"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "Buy a Car",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#0d0d1a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/2019/11/01/1a_bmw_wanchaishowroom_finedata_1.jpg?itok=vi_G10jb"
            alt="Luxury car showroom"
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a] via-[#0d0d1a]/80 to-[#1a1a2e]" />
          {/* Decorative blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e94560]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#e94560]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Pill badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e94560]/15 border border-[#e94560]/30 text-[#e94560] text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e94560] animate-pulse" />
                Premium Car Marketplace
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
            >
              <span className="text-white">Drive Your</span>
              <br />
              <span className="text-[#e94560]">Dream Car</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
            >
              {APP_DESCRIPTION} Explore thousands of certified pre-owned and new
              vehicles from the world's most prestigious brands.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <motion.a
                href={CTA_HREF}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#e94560] hover:bg-[#d63a55] text-white font-bold text-base rounded-xl shadow-2xl shadow-[#e94560]/30 transition-colors duration-200 flex items-center gap-2"
              >
                {CTA_LABEL}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#why-us"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-base rounded-xl transition-all duration-200"
              >
                Why Choose Us
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-4"
                >
                  <stat.icon className="w-5 h-5 text-[#e94560] mb-1" />
                  <span className="text-white font-black text-xl">{stat.value}</span>
                  <span className="text-white/40 text-xs">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#e94560] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── FEATURED INVENTORY ───────────────────────────────────────────── */}
      <section id="inventory" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Collection
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black text-white mb-4">
              Featured <span className="text-[#e94560]">Inventory</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-xl mx-auto">
              Hand-picked premium vehicles from the world's most coveted brands, all certified and ready to drive.
            </motion.p>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {inventoryFilters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-[#e94560] text-white shadow-lg shadow-[#e94560]/25"
                    : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#e94560]/40 hover:border-[#e94560] text-[#e94560] font-semibold rounded-xl hover:bg-[#e94560]/10 transition-all duration-200"
            >
              View All Vehicles
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a16]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-3">
              The AutoElite Difference
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black text-white mb-4">
              Why Thousands Choose <span className="text-[#e94560]">Us</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-xl mx-auto">
              We've reimagined the car buying experience from the ground up — transparent, stress-free, and built around you.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyUsItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#e94560]/30 hover:bg-[#e94560]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/15 flex items-center justify-center mb-5 group-hover:bg-[#e94560]/25 transition-colors">
                  <item.icon className="w-6 h-6 text-[#e94560]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BANNER / CTA STRIP ───────────────────────────────────────────── */}
      <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e94560]/20 via-[#e94560]/10 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <img
            src="https://t3.ftcdn.net/jpg/09/69/46/42/360_F_969464294_gnDoX7Dfn35fFu6O5GLZxJZEgvdDsQdE.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={slideInLeft} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-3">
                Limited Time Offer
              </motion.p>
              <motion.h2 variants={slideInLeft} className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Get Pre-Approved in{" "}
                <span className="text-[#e94560]">Under 10 Minutes</span>
              </motion.h2>
              <motion.p variants={slideInLeft} className="text-white/60 text-lg mb-8 leading-relaxed">
                Our streamlined financing process means you can focus on finding your perfect car, not paperwork. Rates from 3.9% APR with flexible terms up to 84 months.
              </motion.p>
              <motion.div variants={slideInLeft} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e94560] hover:bg-[#d63a55] text-white font-bold rounded-xl shadow-xl shadow-[#e94560]/30 transition-colors"
                >
                  Apply for Finance
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#inventory"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold rounded-xl transition-all"
                >
                  Browse Cars First
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a16]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-3">
              Customer Stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black text-white mb-4">
              What Our Drivers <span className="text-[#e94560]">Say</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-xl mx-auto">
              Real experiences from real customers who found their dream car with AutoElite.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#e94560]/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e94560]/20 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black text-white mb-4">
              Ready to Find Your <span className="text-[#e94560]">Car?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-xl mx-auto">
              Our expert advisors are standing by to help you find the perfect vehicle. Reach out today.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <h3 className="text-white font-bold text-2xl mb-6">Visit or Call Us</h3>
              <div className="space-y-5 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#e94560]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#e94560]" />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed pt-2">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-white font-semibold mb-3">Opening Hours</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "9:00 AM – 8:00 PM" },
                    { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
                    { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between">
                      <span className="text-white/50">{row.day}</span>
                      <span className="text-white font-medium">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 bg-[#e94560]/10 border border-[#e94560]/30 rounded-2xl text-center"
                >
                  <CheckCircle className="w-14 h-14 text-[#e94560] mx-auto mb-4" />
                  <h3 className="text-white font-bold text-2xl mb-2">Message Sent!</h3>
                  <p className="text-white/60">
                    Thank you for reaching out. One of our advisors will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-4 p-8 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="John Smith"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e94560]/50 focus:bg-white/8 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e94560]/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e94560]/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">I'm Interested In</label>
                      <select
                        name="interest"
                        value={contactForm.interest}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 bg-[#1a1a2e] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#e94560]/50 transition-all"
                      >
                        <option>Buy a Car</option>
                        <option>Sell My Car</option>
                        <option>Finance Options</option>
                        <option>Test Drive</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us what you're looking for..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e94560]/50 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-[#e94560] hover:bg-[#d63a55] text-white font-bold rounded-xl shadow-xl shadow-[#e94560]/25 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}