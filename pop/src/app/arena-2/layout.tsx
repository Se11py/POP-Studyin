import type { Metadata } from "next";
import { Big_Shoulders, Familjen_Grotesk, Martian_Mono } from "next/font/google";
import "./arena2.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--a2-font-display",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--a2-font-mono",
});

const body = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--a2-font-body",
});

export const metadata: Metadata = {
  title: "POP Arena — Live Broadcast",
  description:
    "Stadium-style live multiplayer quiz battles for IGCSE & A-Level revision.",
};

export default function Arena2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${mono.variable} ${body.variable}`}>
      {children}
    </div>
  );
}
