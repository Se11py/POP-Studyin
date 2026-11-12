"use client";

import { FormEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageShell from "@/components/PageShell";
import { subjects as allSubjects, yearGroups } from "@/lib/onboardingOptions";
import posthog from "posthog-js";

const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

type Tab = "apply" | "fame";

const tabs: { id: Tab; label: string }[] = [
  { id: "apply", label: "Apply to contribute" },
  { id: "fame", label: "Hall of fame" },
];

const contributionTypes = ["Notes", "Flashcards", "Interactives", "Past-paper walkthroughs", "Practice questions"];

// Placeholder roster until contributors are stored somewhere real
const contributors = [
  { name: "Amelia Chen", school: "Y13 · Harrow International School", subjects: ["Mathematics", "Physics"], contribution: "Built clear, exam-ready walkthroughs for mechanics and calculus.", resources: 24 },
  { name: "Daniel Okafor", school: "Y12 · Bangkok Patana School", subjects: ["Biology"], contribution: "Turned complex cell biology into memorable visual revision notes.", resources: 18 },
  { name: "Sofia Williams", school: "Y13 · Shrewsbury International School", subjects: ["Chemistry", "Biology"], contribution: "Curated the reaction and molecular biology decks students return to.", resources: 31 },
  { name: "Leo Martins", school: "Y12 · UWC Thailand", subjects: ["Computer Science"], contribution: "Made algorithms easier to understand through hands-on interactives.", resources: 12 },
  { name: "Nadia Rahman", school: "Y13 · British International School Phuket", subjects: ["English Literature", "History"], contribution: "Shared annotation frameworks that help ideas become stronger arguments.", resources: 16 },
  { name: "Ethan Brooks", school: "Y12 · Bromsgrove International School", subjects: ["Mathematics", "Economics"], contribution: "Created challenging practice sets with explanations, not just answers.", resources: 21 },
];

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");

const fieldLabel = "text-[12px] font-bold uppercase tracking-wide text-[#4a4a44]";
const inputCls = "mt-1 w-full border-b border-[#111] bg-transparent py-2 text-[16px] outline-none placeholder:text-[#8d8978]";

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`border px-3 py-1.5 text-[13px] font-bold transition-colors ${
        on ? "border-[#1c3bff] bg-[#1c3bff] text-white" : "border-[#111] hover:bg-[#ece8da]"
      }`}
    >
      {children}
    </button>
  );
}

function ApplyForm() {
  const { user } = useUser();
  const [yearGroup, setYearGroup] = useState("");
  const [instagram, setInstagram] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [why, setWhy] = useState("");
  const [sample, setSample] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const apply = useMutation(api.applications.submit);

  const toggle = (list: string[], set: (v: string[]) => void, item: string) =>
    set(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!yearGroup || picked.length === 0 || types.length === 0 || why.trim().length < 20) {
      setError("Please choose a year, at least one subject and one contribution type, and tell us a bit more about why.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await apply({ yearGroup, instagram: instagram.trim() || undefined, subjects: picked, types, why: why.trim(), sample: sample.trim() || undefined });
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error && err.message.includes("already applied") ? "You've already applied. We'll be in touch." : "We couldn't send your application. Please try again.");
      return;
    }
    if (posthogConfigured) {
      posthog.capture("contribution_application_submitted", {
        subject_count: picked.length,
        contribution_type_count: types.length,
      });
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="py-12">
        <p className="text-[12px] font-bold uppercase tracking-wide text-[#1c3bff]">Application received</p>
        <p className="mt-1 text-[clamp(28px,2.6vw,42px)] font-bold leading-[1.05] tracking-[-0.03em]">Thanks{user?.firstName ? `, ${user.firstName}` : ""}.</p>
        <p className="mt-2 max-w-[56ch] text-[clamp(15px,1.2vw,18px)] text-[#4a4a44]">
          We review applications every week and will message you on Instagram or by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-x-12 gap-y-7 pt-6 lg:grid-cols-2">
      <div className="space-y-7">
        <label className="block">
          <span className={fieldLabel}>Name</span>
          <input value={user?.fullName ?? ""} readOnly className={`${inputCls} text-[#4a4a44]`} />
        </label>
        <label className="block">
          <span className={fieldLabel}>Year group *</span>
          <select value={yearGroup} onChange={(e) => setYearGroup(e.target.value)} className={inputCls}>
            <option value="">Select your year</option>
            {yearGroups.map((y) => <option key={y}>{y}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={fieldLabel}>Instagram (optional)</span>
          <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourusername" className={inputCls} />
        </label>
        <div>
          <span className={fieldLabel}>Subjects you can help with *</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {allSubjects.map((s) => <Chip key={s} on={picked.includes(s)} onClick={() => toggle(picked, setPicked, s)}>{s}</Chip>)}
          </div>
        </div>
        <div>
          <span className={fieldLabel}>What would you contribute? *</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {contributionTypes.map((t) => <Chip key={t} on={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>{t}</Chip>)}
          </div>
        </div>
      </div>

      <div className="space-y-7">
        <label className="block">
          <span className={fieldLabel}>Why do you want to contribute? *</span>
          <textarea value={why} onChange={(e) => setWhy(e.target.value)} rows={5} placeholder="Tell us what you'd like to make and who it would help." className={`${inputCls} resize-none`} />
        </label>
        <label className="block">
          <span className={fieldLabel}>Link to an example of your work (optional)</span>
          <input value={sample} onChange={(e) => setSample(e.target.value)} placeholder="https://" className={inputCls} />
        </label>
        {error && <p role="alert" className="border-l-4 border-[#1c3bff] pl-3 text-sm font-bold">{error}</p>}
        <button type="submit" disabled={busy} className="h-11 bg-[#111] px-8 text-sm font-bold text-white hover:bg-[#1c3bff]">
          Send application →
        </button>
      </div>
    </form>
  );
}

function HallOfFame() {
  return (
    <div className="mt-3 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
      {contributors.map((c) => (
        <article key={c.name} className="flex gap-4 border-b border-[#d9d4c4] py-[clamp(12px,2vh,22px)]">
          <div className="grid h-14 w-14 shrink-0 place-items-center bg-[#1c3bff] text-lg font-bold text-white">{initials(c.name)}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[clamp(20px,1.75vw,28px)] font-bold leading-[1.1] tracking-[-0.02em]">{c.name}</h3>
              <span className="shrink-0 text-[clamp(20px,1.7vw,26px)] font-bold tracking-[-0.02em] text-[#1c3bff]">{c.resources}</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{c.school} · {c.subjects.join(", ")}</p>
            <p className="mt-1 text-[clamp(13px,1vw,15px)] text-[#4a4a44]">{c.contribution}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ContributePage() {
  const [tab, setTab] = useState<Tab>("apply");

  return (
    <PageShell eyebrow="Contribute — help build POP" title="Make it better.">
      <div className="pt-3" role="tablist">
        <div className="flex flex-wrap gap-x-7 gap-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`border-b-2 pb-2 text-[clamp(16px,1.25vw,20px)] font-bold transition-colors ${
                tab === t.id ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tab === "apply" ? <ApplyForm /> : <HallOfFame />}
    </PageShell>
  );
}
