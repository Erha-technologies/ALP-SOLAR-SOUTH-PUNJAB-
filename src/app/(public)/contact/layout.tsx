import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Office Locations | ALP Solar South Punjab",
  description: "Get in touch with ALP Solar South Punjab engineers in Multan, Bahawalpur, D.G. Khan & Rahim Yar Khan. Call +92 300 1234567 for free site surveys.",
  keywords: ["contact alp solar","solar office multan","solar company phone number multan"],
  openGraph: {
    title: "Contact Us & Office Locations | ALP Solar South Punjab",
    description: "Get in touch with ALP Solar South Punjab engineers in Multan, Bahawalpur, D.G. Khan & Rahim Yar Khan. Call +92 300 1234567 for free site surveys.",
    url: "https://alpsolar.pk/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
