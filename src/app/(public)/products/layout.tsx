import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official AlpSolarr Products Catalog | Inverters, Batteries & ESS",
  description: "Explore official AlpSolarr PULSE & ROSA hybrid inverters, LIVO & COMO lithium storage batteries, FlexCube mobile ESS trailers, and ATLAS industrial BESS containers.",
  keywords: ["alpsolarr inverter price","pulse s4 inverter","livo 16 pro battery","atlas bess pakistan","lithium battery solar pakistan"],
  openGraph: {
    title: "Official AlpSolarr Products Catalog | Inverters, Batteries & ESS",
    description: "Explore official AlpSolarr PULSE & ROSA hybrid inverters, LIVO & COMO lithium storage batteries, FlexCube mobile ESS trailers, and ATLAS industrial BESS containers.",
    url: "https://alpsolar.pk/products",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
