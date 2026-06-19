import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoElite — Premium Car Marketplace",
  description:
    "Discover your perfect car at AutoElite. Browse thousands of premium vehicles, compare models, and connect with trusted dealers.",
  keywords: "cars, buy cars, used cars, new cars, car marketplace, auto dealer",
  openGraph: {
    title: "AutoElite — Premium Car Marketplace",
    description:
      "Discover your perfect car at AutoElite. Browse thousands of premium vehicles, compare models, and connect with trusted dealers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0d0d1a] text-white antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}