// Placeholder configuration — brief §56: never hard-code real company
// facts until supplied. Swap these for values pulled from the `settings`
// table (see prisma/seed.ts `company.*` keys) once the API layer is live.
export const siteConfig = {
  companyName: "ALP Solar South Punjab",
  logoUrl: "/images/logo.png?v=25",
  phone: "+92 300 1234567",
  whatsappNumber: "+923001234567", // digits only, e.g. "92XXXXXXXXXX" — used to build wa.me links
  email: "info@alpsolar.pk",
  address: "Multan / South Punjab, Pakistan",
  googleMapsUrl: "[GOOGLE MAPS URL]",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Solar Solutions", href: "/solar-systems" },
    { label: "Packages", href: "/packages" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Calculator", href: "/solar-calculator" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

/** Builds a wa.me link with an optional pre-filled message. */
export function buildWhatsAppLink(message?: string) {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
