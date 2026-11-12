"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/** Saves on each click. Replies default on; exam reminders default off. */
export default function EmailPrefs() {
  const me = useQuery(api.users.getCurrent);
  const setPrefs = useMutation(api.users.setEmailPrefs);
  const [error, setError] = useState("");
  if (!me) return null;

  const replies = me.emailReplies !== false;
  const reminders = me.emailReminders === true;
  const update = async (next: { emailReplies: boolean; emailReminders: boolean }) => {
    setError("");
    try { await setPrefs(next); } catch { setError("We couldn't save that. Please try again."); }
  };

  const row = (label: string, detail: string, on: boolean, toggle: () => void) => (
    <label className="flex cursor-pointer items-start gap-3 py-3">
      <input type="checkbox" checked={on} onChange={toggle} className="mt-1 h-4 w-4" />
      <span><span className="block text-sm font-bold text-gray-900">{label}</span><span className="block text-xs text-gray-500">{detail}</span></span>
    </label>
  );

  return (
    <section className="mt-8 rounded-lg border border-gray-200 bg-white p-7 shadow-sm md:p-10">
      <h2 className="text-sm font-bold text-gray-900">Emails</h2>
      <div className="divide-y divide-gray-100">
        {row("Replies to my questions", "An email when someone answers a question you posted.", replies, () => update({ emailReplies: !replies, emailReminders: reminders }))}
        {row("Exam reminders", "A short email a week and a day before an exam in one of your subjects.", reminders, () => update({ emailReplies: replies, emailReminders: !reminders }))}
      </div>
      {error && <p className="mt-2 text-xs font-bold text-red-600">{error}</p>}
    </section>
  );
}
