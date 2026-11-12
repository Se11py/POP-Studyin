"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

/** Clerk card restyled to the app: flat, square, cream. */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#111111",
    colorBackground: "#fbf8ef",
    colorText: "#111111",
    colorTextSecondary: "#4a4a44",
    colorInputBackground: "#ffffff",
    borderRadius: "0px",
    fontFamily: "inherit",
  },
  elements: {
    card: "shadow-none border border-[#d9d4c4]",
    formButtonPrimary: "bg-[#111] hover:bg-[#1c3bff] text-sm font-bold normal-case",
    footerActionLink: "text-[#1c3bff] font-bold",
  },
};

/** Blue brand panel on the left (hidden on phones), the Clerk form on cream on the right. */
export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-[#f2eee1] lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-[#1c3bff] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" aria-label="POP Studying home"><Logo variant="white" className="h-16 w-auto" priority /></Link>
        <div>
          <p className="max-w-[12ch] text-[clamp(44px,5vw,76px)] font-bold leading-[0.98] tracking-[-0.04em]">Revise the way the exam asks.</p>
          <p className="mt-5 max-w-[40ch] text-lg leading-snug text-white/85">IGCSE and A-Level revision for students in Bangkok: syllabus notes, flashcards and a discussion board where students help each other.</p>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Cambridge · Pearson Edexcel</p>
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border-[60px] border-white/10" />
        <span aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full border-[60px] border-white/10" />
      </aside>
      <main className="flex flex-col items-center justify-center gap-6 px-4 py-10">
        <Link href="/" aria-label="POP Studying home" className="lg:hidden"><Logo variant="black" className="h-12 w-auto" priority /></Link>
        {children}
      </main>
    </div>
  );
}
