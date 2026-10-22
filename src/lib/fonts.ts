import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";

export const funnelDisplay = Funnel_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-funnel-display",
  display: "swap",
});

export const funnelSans = Funnel_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-funnel-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = [
  funnelDisplay.variable,
  funnelSans.variable,
  geistMono.variable,
].join(" ");
