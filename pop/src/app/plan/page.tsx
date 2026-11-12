"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageShell from "@/components/PageShell";
import { useDoneTopics } from "@/hooks/useDoneTopics";
import { getOverview, overviewClassIds } from "@/app/classes/[id]/overviewData";
import { buildPlan, daysUntil, gradeScale, todayBangkok, topicsFor } from "@/lib/studyPlan";

const label = "text-[11px] font-bold uppercase tracking-wide text-[#8d8978]";
const input = "mt-1.5 h-11 w-full border-0 border-b-2 border-[#111] bg-transparent px-0 text-base outline-none focus:border-[#1c3bff]";

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

function Setup({ initial, onDone }: { initial?: { classId: string; tier?: string; targetGrade: string; university?: string; examDate: string }; onDone: () => void }) {
  const save = useMutation(api.plans.save);
  const [classId, setClassId] = useState(initial?.classId ?? "");
  const [tier, setTier] = useState(initial?.tier ?? "");
  const [grade, setGrade] = useState(initial?.targetGrade ?? "");
  const [uni, setUni] = useState(initial?.university ?? "");
  const [date, setDate] = useState(initial?.examDate ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const overview = classId ? getOverview(classId) : null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!classId || !grade || !date) return setError("Choose a subject, a target grade and your exam date.");
    if (daysUntil(date) < 0) return setError("That date has already passed. Choose your next exam.");
    setBusy(true);
    try {
      await save({ classId, tier: overview?.tiers ? tier || overview.tiers[0].name : undefined, targetGrade: grade, university: uni || undefined, examDate: date });
      onDone();
    } catch {
      setError("We couldn't save your plan. Please try again.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid max-w-[880px] gap-x-12 gap-y-7 pt-6 md:grid-cols-2">
      <label className="block md:col-span-2">
        <span className={label}>Subject</span>
        <select value={classId} onChange={(e) => { setClassId(e.target.value); setGrade(""); setTier(""); }} className={input}>
          <option value="">Choose a subject</option>
          {overviewClassIds.map((id) => { const o = getOverview(id)!; return <option key={id} value={id}>{o.name} · {o.code} · {o.board}</option>; })}
        </select>
      </label>
      {overview?.tiers && (
        <label className="block">
          <span className={label}>Tier</span>
          <select value={tier || overview.tiers[0].name} onChange={(e) => setTier(e.target.value)} className={input}>
            {overview.tiers.map((t) => <option key={t.name}>{t.name}</option>)}
          </select>
        </label>
      )}
      <div>
        <span className={label}>Target grade</span>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Target grade">
          {(classId ? gradeScale(classId) : []).map((g) => (
            <button type="button" role="radio" aria-checked={grade === g} key={g} onClick={() => setGrade(g)}
              className={`h-11 min-w-12 px-4 text-lg font-bold ${grade === g ? "bg-[#1c3bff] text-white" : "bg-[#111]/[0.06] text-[#111] hover:bg-[#111]/10"}`}>{g}</button>
          ))}
          {!classId && <span className="text-sm text-[#8d8978]">Pick a subject first.</span>}
        </div>
      </div>
      <label className="block">
        <span className={label}>Your exam date</span>
        <input type="date" min={todayBangkok()} value={date} onChange={(e) => setDate(e.target.value)} className={input} />
      </label>
      <label className="block">
        <span className={label}>University or course (optional)</span>
        <input value={uni} maxLength={80} onChange={(e) => setUni(e.target.value)} placeholder="e.g. Imperial, Physics" className={input} />
      </label>
      <div className="md:col-span-2">
        {error && <p className="mb-3 text-sm font-bold text-[#c01818]" role="alert">{error}</p>}
        <button disabled={busy} className="h-11 bg-[#111] px-8 text-sm font-bold text-white hover:bg-[#1c3bff] disabled:opacity-60">{busy ? "Saving…" : initial ? "Update plan" : "Make my plan"}</button>
        <p className="mt-3 max-w-[60ch] text-sm text-[#4a4a44]">Use the date on your own timetable. We spread the topics you haven&apos;t finished over the weeks until then.</p>
      </div>
    </form>
  );
}

export default function PlanPage() {
  const plan = useQuery(api.plans.mine);
  const remove = useMutation(api.plans.remove);
  const [editing, setEditing] = useState(false);
  const { done, toggle } = useDoneTopics(plan?.classId);

  if (plan === undefined) return <PageShell eyebrow="Study plan" title="Your plan."><p className="py-10 text-[#4a4a44]">Loading…</p></PageShell>;

  if (!plan || editing) {
    return (
      <PageShell eyebrow="Study plan" title={plan ? "Change your plan." : "Plan your revision."}>
        <Setup initial={plan ?? undefined} onDone={() => setEditing(false)} />
      </PageShell>
    );
  }

  const overview = getOverview(plan.classId);
  const topics = topicsFor(plan.classId, plan.tier);
  const doneCount = topics.filter((t) => done.includes(t.id)).length;
  const pct = topics.length ? Math.round((doneCount / topics.length) * 100) : 0;
  const days = daysUntil(plan.examDate);
  const weeks = buildPlan(topics, done, plan.examDate, gradeScale(plan.classId).indexOf(plan.targetGrade) <= 1);
  const thisWeek = weeks[0];
  const next = weeks.flatMap((w) => w.topics)[0];
  const unitEnds: number[] = [];
  topics.forEach((t, i) => { if (i < topics.length - 1 && topics[i + 1].unit !== t.unit) unitEnds.push(((i + 1) / topics.length) * 100); });

  return (
    <PageShell
      eyebrow="Study plan"
      title={days < 0 ? "Exam date passed." : `${days} ${days === 1 ? "day" : "days"} to ${overview?.name ?? "your exam"}.`}
      titleAside={<>Aiming for <b>{plan.targetGrade}</b>{plan.university ? <> · {plan.university}</> : null}</>}
    >
      <section className="pt-6" aria-label="Topic progress">
        <p className={label}>{overview?.name} {overview?.code}{plan.tier ? ` · ${plan.tier}` : ""} · exam {fmt(plan.examDate)}</p>
        <div className="relative mt-3 h-7 bg-[#e1ded6]">
          <div className="h-full bg-[#1c3bff]" style={{ width: `${pct}%` }} />
          {unitEnds.map((x) => <span key={x} className="absolute inset-y-0 w-px bg-[#111]" style={{ left: `${x}%` }} />)}
        </div>
        <p className="mt-2 text-sm font-bold">{doneCount} of {topics.length} topics done · {pct}%</p>
      </section>

      <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">
            {thisWeek?.kind === "papers" ? "This week: past papers" : `This week, from ${thisWeek ? fmt(thisWeek.start) : ""}`}
          </h2>
          {thisWeek?.kind === "topics" && thisWeek.topics.length === 0 && <p className="py-4 text-[#4a4a44]">Every topic is ticked off. Spend the time on past papers.</p>}
          {thisWeek?.kind === "papers" && <p className="py-4 text-[#4a4a44]">Do full past papers against the clock and mark them with the mark scheme.</p>}
          {thisWeek?.topics.map((t) => (
            <label key={t.id} className="flex cursor-pointer items-center gap-4 border-b border-[#d9d4c4] py-3">
              <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggle(t.id)} className="h-5 w-5 accent-[#1c3bff]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{t.unit}</span>
                <span className="block text-[clamp(17px,1.4vw,21px)] font-bold leading-tight tracking-[-0.01em]">{t.id} {t.title}</span>
              </span>
              <Link href={`/classes/${plan.classId}/study?topic=${encodeURIComponent(t.id)}`} className="shrink-0 text-sm font-bold text-[#1c3bff] underline underline-offset-4">Revise</Link>
            </label>
          ))}

          <h2 className="mt-10 border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">Coming weeks</h2>
          {weeks.slice(1).length === 0 && <p className="py-4 text-[#4a4a44]">No more weeks before the exam.</p>}
          {weeks.slice(1).map((w) => (
            <div key={w.start} className="flex gap-5 border-b border-[#d9d4c4] py-3">
              <p className="w-16 shrink-0 text-sm font-bold tabular-nums">{fmt(w.start)}</p>
              <p className="min-w-0 text-[15px] leading-snug text-[#4a4a44]">
                {w.kind === "papers" ? "Past papers under timing" : w.topics.length ? w.topics.map((t) => t.title).join(", ") : "Free: catch up or revise weak spots"}
              </p>
            </div>
          ))}
        </section>

        <aside>
          <div className="border-l border-[#111] pl-5" style={{ borderLeftWidth: 1 }}>
            <p className={label}>Next up</p>
            {next ? (
              <>
                <p className="mt-1 text-[clamp(24px,2.2vw,34px)] font-bold leading-[1.08] tracking-[-0.03em]">{next.id} {next.title}</p>
                <Link href={`/classes/${plan.classId}/study?topic=${encodeURIComponent(next.id)}`} className="mt-5 inline-flex h-11 items-center bg-[#111] px-7 text-sm font-bold text-white hover:bg-[#1c3bff]">Start the revision →</Link>
              </>
            ) : (
              <p className="mt-1 text-[clamp(20px,1.8vw,28px)] font-bold leading-tight">Nothing left to cover. Past papers next.</p>
            )}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
            <button onClick={() => setEditing(true)} className="text-[#1c3bff] underline underline-offset-4">Change plan</button>
            <button onClick={() => { if (confirm("Delete your study plan? Your ticked topics stay.")) void remove(); }} className="text-[#4a4a44] underline underline-offset-4">Delete plan</button>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
