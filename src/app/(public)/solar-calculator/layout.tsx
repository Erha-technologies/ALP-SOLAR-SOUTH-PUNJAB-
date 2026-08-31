import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Bill Calculator Pakistan | System Sizing & Cost Estimate",
  description: "Calculate your monthly solar electricity generation, bill savings, dynamic PKR system cost, and required Tier-1 solar panels with ALP Solar Calculator.",
  keywords: ["solar calculator pakistan","solar bill savings multan","10kw solar cost pakistan","solar unit calculator"],
  openGraph: {
    title: "Solar Bill Calculator Pakistan | System Sizing & Cost Estimate",
    description: "Calculate your monthly solar electricity generation, bill savings, dynamic PKR system cost, and required Tier-1 solar panels with ALP Solar Calculator.",
    url: "https://alpsolar.pk/solar-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
