"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import AppSidebar, { SIDEBAR_WIDTH } from "@/components/AppSidebar";

/**
 * Shared frame for the app pages: blue sidebar, cream canvas, account controls,
 * then an eyebrow + oversized title above a heavy rule. Page content goes in children.
 */
export default function PageShell({
  eyebrow,
  title,
  children,
  sidebar,
  topLeft,
  titleAside,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  /** Replaces the default app sidebar (it must be fixed at --sbw wide on md+). */
  sidebar?: ReactNode;
  /** Sits at the left of the account bar, e.g. a back link. */
  topLeft?: ReactNode;
  /** Short copy to the right of the title. */
  titleAside?: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div
      className="min-h-screen bg-[#f4f1e8] text-[#111] [&_h1]:!mb-0 [&_h2]:!mb-0 [&_h3]:!mb-0 [&_h4]:!mb-0"
      style={{ ["--sbw" as string]: SIDEBAR_WIDTH, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {sidebar ?? <AppSidebar />}

      <main className="flex min-h-screen flex-col px-6 pb-5 pt-6 md:ml-[var(--sbw)] md:px-[clamp(32px,3.5vw,64px)]">
        <div className="flex items-center justify-between gap-6">
          <div>{topLeft}</div>
          <div className="flex items-center gap-6">
          {isLoaded && isSignedIn ? (
            <>
              <Link href="/dashboard" className="text-sm font-bold">Dashboard</Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm font-bold">Log in</Link>
              <Link href="/sign-up" className="flex h-9 items-center bg-[#111] px-8 text-sm font-bold text-white">
                Start free →
              </Link>
            </>
          )}
          </div>
        </div>

        <p className="mt-4 text-[12px] font-bold uppercase tracking-wide text-[#1c3bff] md:mt-[clamp(16px,3vh,32px)]">{eyebrow}</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
          <h1 className="text-[clamp(52px,5.4vw,104px)] font-bold leading-[1] tracking-[-0.04em]">{title}</h1>
          {titleAside && <div className="max-w-[clamp(280px,30vw,460px)] pb-2 text-[clamp(14px,1.1vw,17px)] leading-snug text-[#4a4a44]">{titleAside}</div>}
        </div>
        <div className="mt-2 border-t-[4px] border-[#111]" />

        <div className="flex flex-1 flex-col">{children}</div>
      </main>
    </div>
  );
}
