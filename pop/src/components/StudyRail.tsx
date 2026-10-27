"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Grip, ArrowRight, Pin, BookOpen } from "lucide-react";
import { toolLinks, usePinnedTools, useRecentSubjects, useRecordRecentSubject } from "@/lib/studyNav";
import { classesData } from "@/app/classes/[id]/classesData";

// Study tools offered in the Tools pop-up (platform pages like Blueprints / Hall of Fame stay in the sidebar)
const HIDDEN_FROM_TOOLS = new Set(["/pathways", "/hall-of-fame"]);
const studyTools = toolLinks.filter((t) => !HIDDEN_FROM_TOOLS.has(t.href));
const toolBlurbs: Record<string, string> = {
  "/classes": "Browse every course you're enrolled in",
  "/flashcards": "Drill a deck before the next quiz",
  "/interactives": "Play with the ideas instead of reading them",
  "/dictionary": "Look up a term you keep forgetting",
};
type PopoverId = "subjects" | "tools";

/** Hover label that floats to the right of a rail item on desktop. */
function Tip({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:block z-50">
      {children}
    </span>
  );
}

const shortName = (name: string) => name.split(" ")[0].replace("Mathematics", "Maths");
const ease = [0.22, 1, 0.36, 1] as const;

/** Hand-drawn underline — deliberately a little uneven. */
function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 8" className={className} fill="none" aria-hidden>
      <path d="M1.5 5.2c4.2-2.6 7.4-2.9 10.6-.6 3.3 2.4 6.4 2.1 9.8-.4 3.5-2.5 6.9-2.4 10.1.2 2.9 2.3 6.2 2.2 14.2-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Wobbly divider between the subject and tool halves of the rail. */
function Wobble() {
  return (
    <svg viewBox="0 0 44 10" className="hidden lg:block w-11 h-2.5 my-4 text-[#0056D2]/25" fill="none" aria-hidden>
      <path d="M1 6c5-4 8 3 13 0s8-4 13 .5S36 8 43 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Italic serif group heading — matches the platform's "Current Modules" voice. */
function RailLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`hidden lg:flex items-center gap-1 font-serif italic text-[12px] text-slate-600 ${className}`}>
      {children}
    </span>
  );
}

/** Pop-up panel beside its rail button (below the strip on mobile). Each pop-up enters from its own direction. */
function Popover({
  title,
  hint,
  from,
  children,
}: {
  title: string;
  hint: string;
  from: { x?: number; y?: number };
  children: React.ReactNode;
}) {
  return (
    <motion.div
      role="dialog"
      aria-label={title}
      initial={{ opacity: 0, ...from }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...from, transition: { duration: 0.18 } }}
      transition={{ duration: 0.34, ease }}
      className="fixed z-50 left-3 right-3 top-[64px] lg:left-[92px] lg:right-auto lg:top-auto lg:w-[312px] lg:-mt-4 overflow-hidden rounded-lg bg-white border border-[#CFE6F5] shadow-[0_18px_40px_-18px_rgba(0,86,210,0.35)]"
    >
      <div className="relative bg-[#DFF2FC] px-5 pt-4 pb-3.5">
        <span className="absolute -right-5 -top-7 w-20 h-20 rounded-full bg-white/50" aria-hidden />
        <h3 className="relative font-serif text-[17px] text-slate-900 leading-tight">{title}</h3>
        <p className="relative text-[12px] text-slate-600 mt-0.5">{hint}</p>
      </div>
      {children}
    </motion.div>
  );
}

function SubjectsPopover({ classId, onClose }: { classId?: string; onClose: () => void }) {
  return (
    <Popover title="Jump to another subject" hint="Your progress in each one is saved." from={{ x: -10 }}>
      <div className="p-2">
        {Object.entries(classesData).map(([id, c]) => {
          const isCurrent = id === classId;
          return (
            <Link
              key={id}
              href={`/classes/${id}`}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded px-2.5 py-2 transition-colors ${
                isCurrent ? "bg-[#DFF2FC]/60" : "hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-9 h-9 shrink-0 rounded flex items-center justify-center [&_svg]:w-[18px] [&_svg]:h-[18px] transition-transform group-hover:-rotate-6 ${
                  isCurrent ? "bg-[#0056D2] text-white" : "bg-[#DFF2FC] text-[#0056D2]"
                }`}
              >
                {c.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[14px] font-semibold text-slate-900 truncate">{c.name}</span>
                <span className="block text-[11px] text-slate-500 tracking-wide">
                  {c.level} · {c.syllabusCode.replace(/^.*\((\d+)\)$/, "$1")}
                </span>
              </span>
              {isCurrent && (
                <span className="shrink-0 font-serif italic text-[11px] text-[#0056D2] -rotate-3">you&rsquo;re here</span>
              )}
            </Link>
          );
        })}
      </div>
      <Link
        href="/classes"
        onClick={onClose}
        className="group flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[13px] font-semibold text-[#0056D2]"
      >
        See every class
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </Popover>
  );
}

function ToolsPopover({ onClose }: { onClose: () => void }) {
  const { isPinned, togglePin } = usePinnedTools();
  return (
    <Popover title="Open a study tool" hint="Tap the pin to keep a tool on the rail." from={{ y: 10 }}>
      <div className="p-2 space-y-0.5">
        {studyTools.map(({ label, href, icon: Icon }) => {
          const pinnedNow = isPinned(href);
          return (
            <div key={href} className="group relative">
              <Link
                href={href}
                onClick={onClose}
                className="flex items-start gap-3 rounded px-2.5 py-2.5 pr-10 hover:bg-slate-50 transition-colors"
              >
                <Icon size={18} className="mt-0.5 shrink-0 text-slate-400 group-hover:text-[#0056D2] transition-colors" />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2 text-[14px] font-semibold text-slate-900">
                    {label}
                    {pinnedNow && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#DFF2FC] px-2 py-0.5 text-[10px] font-semibold text-[#0056D2]">
                        <Pin size={9} className="fill-current rotate-12" /> Pinned
                      </span>
                    )}
                  </span>
                  <span className="block text-[12px] text-slate-500 leading-snug mt-0.5">{toolBlurbs[href]}</span>
                </span>
              </Link>
              <button
                onClick={() => togglePin(href)}
                aria-pressed={pinnedNow}
                aria-label={pinnedNow ? `Unpin ${label}` : `Pin ${label}`}
                title={pinnedNow ? "Unpin" : "Pin to rail"}
                className={`absolute right-2 top-2.5 p-1.5 rounded transition ${
                  pinnedNow ? "text-[#0056D2]" : "text-slate-300 lg:opacity-0 group-hover:opacity-100 hover:text-[#0056D2] hover:bg-white"
                }`}
              >
                <Pin size={14} className={pinnedNow ? "fill-current rotate-12" : ""} />
              </button>
            </div>
          );
        })}
      </div>
    </Popover>
  );
}

/**
 * Platform rail: current subject (hero), recent subjects, study tools pop-up, pinned tools.
 * Without a `classId` (e.g. on the dashboard) the hero tile becomes "Subjects" and opens the same picker.
 */
export default function StudyRail({ classId }: { classId?: string }) {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState<PopoverId | null>(null);
  useRecordRecentSubject(classId);
  const recent = useRecentSubjects({ exclude: classId });
  const { pinned } = usePinnedTools();
  const current = classId ? classesData[classId] : undefined;
  const hero = current
    ? { icon: current.icon, label: shortName(current.name), aria: `Current subject: ${current.name}. Switch subject`, tip: "Switch subject" }
    : { icon: <BookOpen />, label: "Subjects", aria: "Open a subject", tip: "Open a subject" };
  const toggle = (id: PopoverId) => setOpen((v) => (v === id ? null : id));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      // Clicks on a rail button or inside a pop-up are handled there
      if ((e.target as HTMLElement).closest("[data-rail-popover]")) return;
      setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <aside className="z-40 sticky top-0 bg-[#DFF2FC] border-b border-[#CFE6F5] lg:fixed lg:inset-y-0 lg:left-0 lg:w-[84px] lg:border-b-0 lg:border-r">
      {/* Off-centre accent shapes */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="absolute -right-8 -top-10 w-24 h-24 rounded-full bg-white/50" />
        <span className="hidden lg:block absolute -left-10 bottom-24 w-20 h-20 rounded-full bg-white/35" />
      </span>

      <div className="relative flex items-center gap-2 px-3 py-2 overflow-x-auto lg:overflow-visible lg:flex-col lg:h-full lg:px-0 lg:pt-5 lg:pb-4 lg:gap-0">
        <Link href="/dashboard" title="POP home" className="shrink-0 px-1 lg:mb-6 transition-transform hover:-rotate-3">
          <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-7 w-auto lg:h-auto lg:w-[52px] mix-blend-multiply" priority />
        </Link>

        {/* Current subject (or the subject picker) — the one big tile on the rail */}
        <div data-rail-popover className="lg:relative flex">
          <button
            onClick={() => toggle("subjects")}
            aria-expanded={open === "subjects"}
            aria-label={hero.aria}
            className="group relative shrink-0 flex flex-col items-center"
          >
            <span
              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center [&_svg]:w-6 [&_svg]:h-6 transition-all duration-300 ${
                open === "subjects"
                  ? "bg-[#0056D2] text-white shadow-[0_10px_22px_-10px_rgba(0,86,210,0.8)]"
                  : "bg-white text-[#0056D2] shadow-[0_8px_18px_-10px_rgba(0,86,210,0.55)] group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_22px_-10px_rgba(0,86,210,0.6)]"
              }`}
            >
              {hero.icon}
            </span>
            <span className="hidden lg:block mt-1.5 text-[11px] font-bold text-slate-900 leading-none">{hero.label}</span>
            <Squiggle className="hidden lg:block w-9 h-1.5 mt-0.5 text-[#0056D2] translate-x-1" />
            {open !== "subjects" && <Tip>{hero.tip}</Tip>}
          </button>
          <AnimatePresence>
            {open === "subjects" && <SubjectsPopover key="subjects" classId={classId} onClose={() => setOpen(null)} />}
          </AnimatePresence>
        </div>

        {/* Recent subjects — small, round, quieter */}
        {recent.length > 0 && (
          <>
            <RailLabel className="mt-5 mb-1.5 -ml-2">recent</RailLabel>
            <div className="flex gap-1.5 lg:flex-col lg:items-center lg:gap-1.5">
              {recent.map(({ id, name, icon }) => (
                <Link
                  key={id}
                  href={`/classes/${id}`}
                  aria-label={`Recent: ${name}`}
                  className="group relative shrink-0 w-9 h-9 rounded bg-white/60 text-slate-600 flex items-center justify-center [&_svg]:w-4 [&_svg]:h-4 transition-all hover:bg-white hover:text-[#0056D2] hover:translate-x-0.5"
                >
                  {icon}
                  <Tip>{name}</Tip>
                </Link>
              ))}
            </div>
          </>
        )}

        <span className="lg:hidden shrink-0 w-px h-7 bg-[#0056D2]/15 mx-1" aria-hidden />
        <Wobble />

        {/* Tools — dashed outline so it reads as "opens something" */}
        <div data-rail-popover className="lg:relative flex">
          <button
            onClick={() => toggle("tools")}
            aria-expanded={open === "tools"}
            aria-label="Study tools"
            className="group relative shrink-0 flex flex-col items-center"
          >
            <span
              className={`w-11 h-11 rounded-md flex items-center justify-center border-[1.5px] transition-all duration-300 ${
                open === "tools"
                  ? "bg-[#0056D2] border-[#0056D2] text-white"
                  : "border-dashed border-[#0056D2]/40 text-[#0056D2] group-hover:border-solid group-hover:bg-white/70"
              }`}
            >
              <Grip size={19} className={`transition-transform duration-300 ${open === "tools" ? "rotate-90" : "group-hover:rotate-45"}`} />
            </span>
            <span className="hidden lg:block mt-1.5 text-[11px] font-semibold text-slate-700 leading-none">Tools</span>
            {open !== "tools" && <Tip>Study tools</Tip>}
          </button>
          <AnimatePresence>
            {open === "tools" && <ToolsPopover key="tools" onClose={() => setOpen(null)} />}
          </AnimatePresence>
        </div>

        {/* Pinned tools (shared with the platform sidebar) */}
        {pinned.length > 0 && (
          <RailLabel className="mt-5 mb-1.5 ml-1">
            pinned <Pin size={10} className="fill-current rotate-[20deg] text-[#0056D2]" />
          </RailLabel>
        )}
        <div className="flex gap-1.5 lg:flex-col lg:items-center lg:gap-2">
          {pinned.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={`Pinned: ${label}`}
              className="group relative shrink-0 flex flex-col items-center rounded px-1.5 py-1.5 lg:w-[64px] text-slate-600 transition-colors hover:bg-white/70 hover:text-[#0056D2]"
            >
              <span className="relative">
                <Icon size={18} />
                <Pin size={9} className="absolute -top-1.5 -right-2 fill-[#0056D2] text-[#0056D2] rotate-[25deg]" />
              </span>
              <span className="hidden lg:block mt-1 text-[10px] font-semibold leading-none">{label}</span>
              <Tip>{label} · pinned</Tip>
            </Link>
          ))}
        </div>

        {isSignedIn && (
          <div className="shrink-0 ml-auto lg:ml-0 lg:mt-auto flex items-center justify-center p-1 bg-white/70 rounded-full">
            <UserButton />
          </div>
        )}
      </div>
    </aside>
  );
}
