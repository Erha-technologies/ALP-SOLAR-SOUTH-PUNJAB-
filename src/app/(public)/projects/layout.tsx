import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completed Solar Projects Portfolio | Multan & South Punjab",
  description: "View our portfolio of over 1,450+ successful residential, commercial, industrial, and agricultural solar installations across South Punjab.",
  keywords: ["solar project multan","solar installations bahawalpur","alp solar portfolio"],
  openGraph: {
    title: "Completed Solar Projects Portfolio | Multan & South Punjab",
    description: "View our portfolio of over 1,450+ successful residential, commercial, industrial, and agricultural solar installations across South Punjab.",
    url: "https://alpsolar.pk/projects",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
