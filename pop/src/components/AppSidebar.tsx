"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Circuit from "@/components/Circuit";

const FIRST_PAPER = new Date(2027, 3, 27); // 27 Apr 2027

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Classes", href: "/classes" },
  { label: "Past papers", href: "/classes" },
  { label: "Mocks", href: "/classes" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Interactives", href: "/interactives" },
  { label: "POP Arena", href: "/arena" },
  { label: "Dictionary", href: "/dictionary" },
  { label: "Discussion", href: "/discussion" },
  { label: "Contribute", href: "/contribute" },
];

/** Width of the sidebar on desktop; pages offset their content by the same variable. */
export const SIDEBAR_WIDTH = "clamp(320px, 32vw, 560px)";

export default function AppSidebar() {
  const pathname = usePathname();
  const [days, setDays] = useState(182);

  useEffect(() => {
    const t = setTimeout(() => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      setDays(Math.max(0, Math.round((FIRST_PAPER.getTime() - today.getTime()) / 86400000)));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Several entries share a route for now, so only the first match reads as active
  const activeIndex = navItems.findIndex((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <aside
      className="relative flex flex-col overflow-hidden bg-[#1c3bff] text-white md:fixed md:inset-y-0 md:left-0 md:z-40 md:h-screen md:w-[var(--sbw)]"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <Circuit id="sb" />

      <div className="relative z-10 px-6 pb-4 pt-7 md:px-10 md:pt-10">
        <Link href="/" className="block leading-none">
          <span className="block text-[clamp(30px,2.9vw,44px)] font-bold tracking-tight">POP</span>
          <span className="mt-1 block text-[clamp(14px,1.2vw,17px)]">Studying</span>
        </Link>

        <nav className="mt-6 flex gap-x-5 gap-y-1 overflow-x-auto md:mt-[clamp(18px,4vh,56px)] md:flex-col md:gap-y-[clamp(0px,0.5vh,6px)] md:overflow-visible">
          {navItems.map((item, i) => {
            const active = i === activeIndex;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap py-[clamp(2px,0.55vh,6px)] text-[clamp(14px,1.2vw,19px)] transition-colors ${
                  active ? "font-bold text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {active && "— "}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="relative z-10 hidden min-h-0 flex-1 flex-col justify-end px-10 pb-[clamp(16px,3vh,32px)] md:flex">
        <div className="relative mx-auto flex aspect-square w-[min(100%,27vh)] max-w-[360px] items-center justify-center">
          <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <circle cx="150" cy="150" r="148" fill="none" stroke="#fff" strokeOpacity=".5" />
            <circle cx="150" cy="150" r="124" fill="none" stroke="#fff" strokeOpacity=".2" />
            <circle cx="150" cy="298" r="7" fill="#fff" />
          </svg>
          <span className="absolute -bottom-1 left-1/2 ml-4 translate-y-[18px] text-[11px] font-bold tracking-wide">TODAY</span>
          <span className="relative whitespace-nowrap text-[clamp(72px,min(12vw,15vh),240px)] font-bold leading-[0.8] tracking-[-0.06em]">
            {days}
          </span>
        </div>

        <p className="mt-[clamp(24px,5vh,40px)] text-[clamp(13px,1.2vw,17px)] leading-snug">
          days until the May/June 2027 papers. Eight classes are open, each built on the exact syllabus.
        </p>
        <p className="mt-[clamp(10px,2vh,20px)] text-[11px] font-bold tracking-wide text-white/70">IGCSE &nbsp;·&nbsp; A-LEVEL &nbsp;·&nbsp; CAMBRIDGE</p>
      </div>
    </aside>
  );
}
