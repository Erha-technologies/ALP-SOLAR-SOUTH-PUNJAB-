import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Alex_Brush, Poppins } from "next/font/google";

// Display face — headings only, used with restraint (see docs/FRONTEND.md)
export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Poppins face — sub headings & clean modern typography
export const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Body face — paragraphs, nav, forms
export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Data face — system specs, kWh/kW readouts, stat counters
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// Signature calligraphic script face — matches target handwritten cursive font
export const fontScript = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontPoppins.variable} ${fontBody.variable} ${fontMono.variable} ${fontScript.variable}`;


