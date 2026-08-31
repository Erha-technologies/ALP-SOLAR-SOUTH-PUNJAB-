import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Systems Packages & Pricing | 5kW, 7kW, 10kW & 15kW",
  description: "Compare complete turnkey solar package prices including Tier-1 bi-facial panels, hybrid smart inverters, mounting structures, and MEPCO net-metering.",
  keywords: ["5kw solar package price pakistan","10kw solar package multan","15kw solar price pakistan"],
  openGraph: {
    title: "Solar Systems Packages & Pricing | 5kW, 7kW, 10kW & 15kW",
    description: "Compare complete turnkey solar package prices including Tier-1 bi-facial panels, hybrid smart inverters, mounting structures, and MEPCO net-metering.",
    url: "https://alpsolar.pk/packages",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
