import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Energy Systems | Residential, Commercial & Tubewells",
  description: "Custom turnkey solar power systems for home villas, commercial plazas, industrial factories, and agricultural tubewells across Pakistan.",
  keywords: ["residential solar multan","commercial solar system pakistan","agricultural solar tubewell"],
  openGraph: {
    title: "Solar Energy Systems | Residential, Commercial & Tubewells",
    description: "Custom turnkey solar power systems for home villas, commercial plazas, industrial factories, and agricultural tubewells across Pakistan.",
    url: "https://alpsolar.pk/solar-systems",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
