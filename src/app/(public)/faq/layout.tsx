import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Energy FAQ | Frequently Asked Questions | ALP Solar",
  description: "Find answers to frequently asked questions about solar panel efficiency, hybrid inverter warranties, net-metering approvals, and battery payback.",
  keywords: ["solar faq pakistan","net metering question multan","solar battery life faq"],
  openGraph: {
    title: "Solar Energy FAQ | Frequently Asked Questions | ALP Solar",
    description: "Find answers to frequently asked questions about solar panel efficiency, hybrid inverter warranties, net-metering approvals, and battery payback.",
    url: "https://alpsolar.pk/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
