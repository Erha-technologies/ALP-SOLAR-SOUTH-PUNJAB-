import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MEPCO Net Metering Service | Turnkey Green Meter License",
  description: "Complete 4-step turnkey MEPCO bi-directional net-metering licensing service in Multan and South Punjab. Sell excess solar power to grid.",
  keywords: ["mepco net metering multan","green meter license cost pakistan","bi directional solar meter"],
  openGraph: {
    title: "MEPCO Net Metering Service | Turnkey Green Meter License",
    description: "Complete 4-step turnkey MEPCO bi-directional net-metering licensing service in Multan and South Punjab. Sell excess solar power to grid.",
    url: "https://alpsolar.pk/net-metering",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
