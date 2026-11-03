"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageShell from "@/components/PageShell";
import SubjectSidebar from "./components/SubjectSidebar";
import { getOverview, type OverviewUnit } from "./overviewData";

const blue = "text-[#1c3bff]";

function TopicLinks({ study }: { study: string }) {
  return (
    <span className={`shrink-0 text-[11px] font-bold ${blue}`}>
      <Link href={study} className="hover:underline">notes</Link>
      {" · "}
      <Link href="/flashcards" className="hover:underline">cards</Link>
      {" · "}
      <Link href={study} className="hover:underline">quiz</Link>
    </span>
  );
}

function Unit({ unit, study }: { unit: OverviewUnit; study: string }) {
  return (
    <section>
      <div className="flex items-baseline gap-4 border-b-2 border-[#111] pb-1.5">
        <span className={`text-[clamp(22px,1.8vw,30px)] font-bold leading-none tracking-[-0.03em] ${blue}`}>
          {String(unit.n).padStart(2, "0")}
        </span>
        <h2 className="flex-1 text-[clamp(16px,1.3vw,21px)] font-bold tracking-[-0.02em]">{unit.title}</h2>
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{unit.topics.length} topics</span>
      </div>
      {unit.topics.map((tp) => (
        <div key={tp.id} className="flex items-center justify-between gap-4 border-b border-[#d9d4c4] py-[clamp(1px,0.3vh,5px)] text-[clamp(12px,0.95vw,14px)]">
          <Link href={study} className={`flex min-w-0 gap-3 hover:underline ${tp.done ? `font-bold ${blue}` : ""}`}>
            <span className="min-w-7 shrink-0">{tp.id}</span>
            <span className="min-w-0">
              {tp.title}
              {tp.tag && <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-[#8d8978]">{tp.tag}</span>}
              {tp.done && <span className="ml-2" aria-label="done">✓</span>}
            </span>
          </Link>
          <TopicLinks study={study} />
        </div>
      ))}
    </section>
  );
}

export default function SubjectOverviewPage() {
  const params = useParams();
  const classId = (params.id as string) || "igcse-physics";
  const data = getOverview(classId);
  const [tier, setTier] = useState(0);

  if (!data) {
    return (
      <PageShell eyebrow="Classes — not found" title="No such class.">
        <p className="pt-6 text-lg">
          We couldn&apos;t find that class. <Link href="/classes" className="font-bold text-[#1c3bff]">Back to all classes →</Link>
        </p>
      </PageShell>
    );
  }

  const study = `/classes/${classId}/study`;
  const units = data.tiers ? data.tiers[tier].units : data.units;
  const allTopics = units.flatMap((u) => u.topics);
  const done = allTopics.filter((tp) => tp.done).length;
  const next = allTopics.find((tp) => !tp.done);

  // Fill the left column until it holds about half the topics, so the two columns balance
  const half = allTopics.length / 2;
  const left: OverviewUnit[] = [];
  const right: OverviewUnit[] = [];
  let count = 0;
  let splitDone = false;
  for (const unit of units) {
    if (!splitDone && count + unit.topics.length / 2 <= half) {
      left.push(unit);
      count += unit.topics.length;
    } else {
      splitDone = true;
      right.push(unit);
    }
  }

  const jump = [
    { label: data.cards ? `Flashcards · ${data.cards} cards` : "Flashcards", href: "/flashcards" },
    { label: "Lightning quiz · 60 sec", href: study },
    { label: "Mock exam", href: `/classes/mock/${classId}` },
    { label: data.papers ? `Past papers · ${data.papers}` : "Past papers", href: study },
    { label: "POP Arena", href: "/arena" },
  ];

  const sideLinks = [
    { label: "Overview", href: `/classes/${classId}` },
    { label: "Revision notes", href: study },
    { label: "Flashcards", href: "/flashcards" },
    { label: "Past papers", href: study },
    { label: "Mock exam", href: `/classes/mock/${classId}` },
    { label: "POP Arena", href: "/arena" },
    { label: "Discussion", href: study },
  ];

  return (
    <PageShell
      eyebrow={`${data.name} ${data.code} — Subject overview`.toUpperCase()}
      title={`${data.name}.`}
      titleAside={data.blurb}
      topLeft={<Link href="/classes" className="text-sm font-bold text-[#1c3bff]">← All classes</Link>}
      sidebar={
        <SubjectSidebar
          subject={data.name.toUpperCase()}
          code={data.code}
          links={sideLinks}
          blurb={`${data.board} ${data.level} ${data.name}. ${
            units.length ? `${["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"][units.length] ?? units.length} units, ${allTopics.length} topics, every one mapped to the syllabus you'll sit.` : "Units are being added."
          }`}
          progress={{ done, total: allTopics.length, next: next ? `${next.id} ${next.title}` : undefined }}
          footer={data.syllabusLine.replaceAll(" · ", "  ·  ")}
        />
      }
    >
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-[#d9d4c4] pb-2 text-[clamp(11px,0.9vw,14px)]">
        <span className={`text-[11px] font-bold uppercase tracking-wide ${blue}`}>Jump in</span>
        {jump.map((j) => (
          <Link key={j.label} href={j.href} className="font-bold hover:text-[#1c3bff]">
            {j.label} →
          </Link>
        ))}
      </div>

      {data.tiers && (
        <div className="mt-3 flex gap-7" role="tablist">
          {data.tiers.map((tr, i) => (
            <button
              key={tr.name}
              role="tab"
              aria-selected={tier === i}
              onClick={() => setTier(i)}
              className={`border-b-2 pb-1 text-[clamp(15px,1.15vw,19px)] font-bold transition-colors ${
                tier === i ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {tr.name}
            </button>
          ))}
        </div>
      )}

      {units.length === 0 ? (
        <p className="py-10 text-lg">The {data.name} syllabus map is still being written. Check back soon.</p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
          <div className="space-y-[clamp(8px,1.4vh,20px)]">
            {left.map((u) => <Unit key={u.n} unit={u} study={study} />)}
            {data.quiz && (
              <div className="border-l-4 border-[#1c3bff] pl-4">
                <p className={`text-[11px] font-bold uppercase tracking-wide ${blue}`}>Lightning quiz · This week</p>
                <p className="mt-1 text-[clamp(16px,1.35vw,21px)] italic leading-snug">{data.quiz}</p>
                <Link href={study} className={`mt-3 inline-block text-sm font-bold ${blue}`}>Start the quiz →</Link>
              </div>
            )}
          </div>
          <div className="space-y-[clamp(8px,1.4vh,20px)]">
            {right.map((u) => <Unit key={u.n} unit={u} study={study} />)}
          </div>
        </div>
      )}
    </PageShell>
  );
}
