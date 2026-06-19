export type NavLink = {
  label: string;
  href: string;
};

export const APP_NAME = "AutoElite";
export const APP_TAGLINE = "Drive Your Dream";
export const APP_DESCRIPTION =
  "Premium car marketplace connecting buyers with trusted dealers across the country.";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "#inventory" },
  { label: "Featured", href: "#featured" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const CTA_LABEL = "Browse All";
export const CTA_HREF = "#inventory";

export const BRAND_COLORS = {
  primary: "#e94560",
  dark: "#1a1a2e",
  darker: "#0d0d1a",
  light: "#f5f5f5",
  accent: "#e94560",
} as const;