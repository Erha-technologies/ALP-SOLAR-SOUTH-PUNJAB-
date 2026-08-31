import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Mission, Vision & Core Values | ALP Solar",
  description: "Discover ALP Solar South Punjab's mission, vision, and core engineering values. PEC certified engineers delivering Tier-1 solar installations across Pakistan.",
  keywords: ["about alp solar","solar epc multan","solar engineering company pakistan"],
  openGraph: {
    title: "About Us | Our Mission, Vision & Core Values | ALP Solar",
    description: "Discover ALP Solar South Punjab's mission, vision, and core engineering values. PEC certified engineers delivering Tier-1 solar installations across Pakistan.",
    url: "https://alpsolar.pk/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
