import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F2D52",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alpsolar.pk"),
  title: {
    default: `${siteConfig.companyName} | Tier-1 Solar Panels & AlpSolarr Distributor Pakistan`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "South Punjab's premier solar energy EPC firm and official AlpSolarr distributor. Tier-1 solar panel installations, hybrid inverters, lithium energy storage, and MEPCO net-metering in Multan, Bahawalpur, D.G. Khan & Rahim Yar Khan.",
  keywords: [
    "solar panel multan",
    "alp solar pakistan",
    "alpsolarr inverter",
    "solar system price pakistan",
    "mepco net metering",
    "livo battery pakistan",
    "pulse hybrid inverter",
    "atlas bess pakistan",
    "solar tubewell multan",
    "solar installer south punjab",
  ],
  authors: [{ name: siteConfig.companyName }],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://alpsolar.pk",
    siteName: siteConfig.companyName,
    title: `${siteConfig.companyName} | Tier-1 Solar Panels & AlpSolarr Inverters`,
    description:
      "Save up to 90% on electricity bills with official AlpSolarr hybrid inverters, lithium batteries, and MEPCO net-metering systems.",
    images: [
      {
        url: "/images/solar-podium-new-blended.png?v=70",
        width: 1200,
        height: 630,
        alt: siteConfig.companyName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | Solar Systems Pakistan`,
    description:
      "Official Tier-1 Solar Panels, Hybrid Inverters, and Lithium Storage Batteries across Pakistan.",
    images: ["/images/solar-podium-new-blended.png?v=70"],
  },
  icons: {
    icon: "/images/logo.png?v=25",
    apple: "/images/logo.png?v=25",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://alpsolar.pk/#organization",
      name: siteConfig.companyName,
      url: "https://alpsolar.pk",
      logo: "https://alpsolar.pk/images/logo.png?v=25",
      image: "https://alpsolar.pk/images/solar-podium-new-blended.png?v=70",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressLocality: "Multan",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      priceRange: "PKR",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://alpsolar.pk/#website",
      url: "https://alpsolar.pk",
      name: siteConfig.companyName,
      publisher: {
        "@id": "https://alpsolar.pk/#organization",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="overflow-x-hidden antialiased text-slate-900 bg-slate-50 selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CallButton />
        <ChatWidget />
      </body>
    </html>
  );
}
