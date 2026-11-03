"use client";

import Link from "next/link";
import Circuit from "@/components/Circuit";

type Link_ = { label: string; href: string };

export default function SubjectSidebar({
  subject,
  code,
  links,
  blurb,
  progress,
  footer,
}: {
  subject: string;
  code: string;
  links: Link_[];
  blurb: string;
  progress: { done: number; total: number; next?: string };
  footer: string;
}) {
  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <aside
      className="relative flex flex-col overflow-hidden bg-[#1c3bff] text-white md:fixed md:inset-y-0 md:left-0 md:z-40 md:h-screen md:w-[var(--sbw)]"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <Circuit id="sb-subject" />

      <div className="relative z-10 px-6 pb-4 pt-7 md:px-10 md:pt-10">
        <Link href="/" className="block leading-none">
          <span className="block text-[clamp(30px,2.9vw,44px)] font-bold tracking-tight">POP</span>
          <span className="mt-1 block text-[clamp(14px,1.2vw,17px)]">Studying</span>
        </Link>

        <p className="mt-[clamp(14px,3vh,32px)] text-[11px] font-bold uppercase tracking-wide">
          <Link href="/classes" className="hover:underline">Classes</Link>
          <span className="mx-2 text-white/60">/</span>
          {subject}
        </p>

        <nav className="mt-3 flex gap-x-5 gap-y-1 overflow-x-auto md:flex-col md:gap-y-[clamp(0px,0.4vh,4px)] md:overflow-visible">
          {links.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`whitespace-nowrap py-[clamp(2px,0.5vh,5px)] text-[clamp(14px,1.2vw,19px)] transition-colors ${
                i === 0 ? "font-bold text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {i === 0 && "— "}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="relative z-10 hidden min-h-0 flex-1 flex-col justify-end px-10 pb-[clamp(16px,3vh,32px)] md:flex">
        <p className="-ml-1 text-[clamp(72px,min(13vw,14vh),260px)] font-bold leading-[0.8] tracking-[-0.06em]">{code}</p>
        <p className="mt-[clamp(14px,3vh,32px)] max-w-[34ch] text-[clamp(14px,1.25vw,18px)] leading-snug">{blurb}</p>

        <p className="mt-[clamp(14px,3vh,34px)] text-[11px] font-bold uppercase tracking-wide">Your progress</p>
        <div className="mt-2 h-[3px] bg-white/30">
          <div className="h-full bg-white" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-[clamp(12px,0.95vw,14px)]">
          {pct}% &nbsp;·&nbsp; {progress.done} of {progress.total} topics done
          {progress.next && <> &nbsp;·&nbsp; next up: {progress.next}</>}
        </p>

        <p className="mt-[clamp(14px,3vh,34px)] text-[11px] font-bold tracking-wide text-white/70">{footer}</p>
      </div>
    </aside>
  );
}
