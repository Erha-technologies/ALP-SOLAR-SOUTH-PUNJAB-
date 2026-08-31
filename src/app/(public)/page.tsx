import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQPreview } from "@/components/sections/FAQPreview";

export const metadata: Metadata = {
  title: "Solar Installation Company in Pakistan",
  description:
    "Professional solar design, installation, and after-sales support for homes and businesses across Pakistan. Calculate your system, compare packages, and get a free quote.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ProcessSection />
      <CalculatorTeaser />
      <PackagesPreview />
      <FAQPreview />
    </>
  );
}
