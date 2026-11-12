"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDoneTopics } from "@/hooks/useDoneTopics";
import { getOverview } from "@/app/classes/[id]/overviewData";
import { buildPlan, daysUntil, gradeScale, topicsFor } from "@/lib/studyPlan";

/** Dashboard summary of the student's study plan. Shows a prompt to make one if there isn't one yet. */
export default function PlanCard() {
  const plan = useQuery(api.plans.mine);
  const { done } = useDoneTopics(plan?.classId);
  if (plan === undefined) return null;

  const wrap = "block border-l border-[#111] pl-5 py-1";
  if (!plan) {
    return (
      <div className={wrap}>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">Study plan</p>
        <p className="mt-1 text-[clamp(20px,1.7vw,26px)] font-bold leading-tight tracking-[-0.02em]">Set a target grade and exam date. Get a week-by-week plan.</p>
        <Link href="/plan" className="mt-3 inline-flex h-10 items-center bg-[#111] px-6 text-sm font-bold text-white hover:bg-[#1c3bff]">Make my plan →</Link>
      </div>
    );
  }

  const topics = topicsFor(plan.classId, plan.tier);
  const doneCount = topics.filter((t) => done.includes(t.id)).length;
  const days = daysUntil(plan.examDate);
  const next = buildPlan(topics, done, plan.examDate, gradeScale(plan.classId).indexOf(plan.targetGrade) <= 1).flatMap((w) => w.topics)[0];

  return (
    <div className={wrap}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{getOverview(plan.classId)?.name} · aiming for {plan.targetGrade}</p>
      <p className="mt-1 text-[clamp(20px,1.7vw,26px)] font-bold leading-tight tracking-[-0.02em]">
        {days < 0 ? "Exam date passed." : `${days} ${days === 1 ? "day" : "days"} to go · ${doneCount} of ${topics.length} topics done`}
      </p>
      {next && <p className="mt-1 text-[15px] text-[#4a4a44]">Next up: {next.id} {next.title}</p>}
      <Link href="/plan" className="mt-3 inline-flex h-10 items-center bg-[#111] px-6 text-sm font-bold text-white hover:bg-[#1c3bff]">Open plan →</Link>
    </div>
  );
}
