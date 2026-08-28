"use client";

import { FormEvent, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Sidebar from "@/components/Sidebar";
import { AtSign, Check, Save, School, UserRound } from "lucide-react";
import { requiresCustomSchool, schools, subjects, yearGroups } from "@/lib/onboardingOptions";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const saveProfile = useMutation(api.users.saveProfile);
  const [yearGroup, setYearGroup] = useState("");
  const [school, setSchool] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [wantsToContribute, setWantsToContribute] = useState(false);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const metadata = user.unsafeMetadata as Record<string, unknown>;
    const savedSchool = typeof metadata.school === "string" ? metadata.school : "";
    const schoolIsPreset = schools.includes(savedSchool);
    setYearGroup(typeof metadata.yearGroup === "string" ? metadata.yearGroup : "");
    setSchool(schoolIsPreset ? savedSchool : savedSchool ? "Other" : "");
    setCustomSchool(schoolIsPreset ? "" : savedSchool);
    setSelectedSubjects(Array.isArray(metadata.subjects) ? metadata.subjects.filter((item): item is string => typeof item === "string") : []);
    setInstagram(typeof metadata.instagram === "string" ? metadata.instagram : "");
    setWantsToContribute(metadata.wantsToContribute === true);
  }, [user]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) => current.includes(subject) ? current.filter((item) => item !== subject) : [...current, subject]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !yearGroup || !school || selectedSubjects.length === 0) {
      setStatus("Please complete your year, school, and at least one subject.");
      return;
    }
    const normalizedInstagram = instagram.trim().replace(/^@/, "");
    if (wantsToContribute && !normalizedInstagram) {
      setStatus("Please provide your Instagram username if you'd like to become a contributor.");
      return;
    }
    if (requiresCustomSchool(school) && !customSchool.trim()) {
      setStatus("Please enter your school name.");
      return;
    }

    setIsSaving(true);
    setStatus("");
    try {
      const profile = {
        onboardingCompleted: true,
        yearGroup,
        school: requiresCustomSchool(school) ? customSchool.trim() : school,
        subjects: selectedSubjects,
        instagram: normalizedInstagram,
        wantsToContribute,
      };
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, ...profile } });
      await saveProfile(profile);
      setStatus("Your profile has been updated.");
    } catch {
      setStatus("We couldn't save your changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm font-bold text-gray-500">Loading your profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800 pt-20 md:pt-10 md:pl-64">
      <Sidebar />
      <main className="mx-auto max-w-4xl px-6 pb-20">
        <div className="mb-8"><div className="mb-3 inline-flex items-center gap-2 rounded border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700"><UserRound className="h-4 w-4" /> Account settings</div><h1 className="text-4xl font-bold tracking-tight text-gray-900">Your profile</h1><p className="mt-3 text-gray-600">Update your student details and contributor preferences whenever you need to.</p></div>
        <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-gray-200 bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-6 md:grid-cols-2"><label className="space-y-2"><span className="text-sm font-bold text-gray-900">Year or grade</span><select required value={yearGroup} onChange={(event) => setYearGroup(event.target.value)} className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700"><option value="">Select your year</option>{yearGroups.map((year) => <option key={year}>{year}</option>)}</select></label><label className="space-y-2"><span className="flex items-center gap-2 text-sm font-bold text-gray-900"><School className="h-4 w-4 text-blue-700" /> School</span><select required value={school} onChange={(event) => setSchool(event.target.value)} className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700"><option value="">Select your school</option>{schools.map((item) => <option key={item}>{item}</option>)}</select></label></div>
          {requiresCustomSchool(school) && <label className="block space-y-2"><span className="text-sm font-bold text-gray-900">School name</span><input required value={customSchool} onChange={(event) => setCustomSchool(event.target.value)} placeholder="Enter your school name" className="w-full rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-700" /></label>}
          <fieldset><legend className="mb-3 text-sm font-bold text-gray-900">Subjects you are interested in</legend><div className="grid gap-2 sm:grid-cols-2">{subjects.map((subject) => { const selected = selectedSubjects.includes(subject); return <button type="button" key={subject} onClick={() => toggleSubject(subject)} className={`flex items-center justify-between rounded border px-4 py-3 text-left text-sm font-bold ${selected ? "border-blue-700 bg-blue-50 text-blue-800" : "border-gray-200 text-gray-600 hover:border-blue-200"}`}><span>{subject}</span>{selected && <Check className="h-4 w-4" />}</button>; })}</div></fieldset>
          <label className="block space-y-2"><span className="flex items-center gap-2 text-sm font-bold text-gray-900"><AtSign className="h-4 w-4 text-rose-500" /> Instagram <span className={`font-normal ${wantsToContribute ? "text-blue-700" : "text-gray-400"}`}>{wantsToContribute ? "(required for contributors)" : "(optional)"}</span></span><div className="flex items-center rounded border border-gray-300 px-4 focus-within:border-blue-700"><span className="text-sm text-gray-400">@</span><input required={wantsToContribute} value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="yourusername" className="w-full border-0 px-2 py-3 text-sm outline-none" /></div></label>
          <fieldset><legend className="mb-3 text-sm font-bold text-gray-900">Contributor preference</legend><div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setWantsToContribute(true)} className={`rounded border p-4 text-left ${wantsToContribute ? "border-blue-700 bg-blue-50" : "border-gray-200"}`}><span className="block text-sm font-bold">Yes, I’d love to help</span><span className="mt-1 block text-xs text-gray-500">Share notes, flashcards, or interactives.</span></button><button type="button" onClick={() => setWantsToContribute(false)} className={`rounded border p-4 text-left ${!wantsToContribute ? "border-blue-700 bg-blue-50" : "border-gray-200"}`}><span className="block text-sm font-bold">Maybe later</span><span className="mt-1 block text-xs text-gray-500">You can change this anytime.</span></button></div></fieldset>
          <div className="flex flex-col justify-between gap-4 border-t border-gray-100 pt-7 sm:flex-row sm:items-center"><p role="status" className={`text-sm font-bold ${status.includes("updated") ? "text-green-600" : "text-red-600"}`}>{status}</p><button type="submit" disabled={isSaving} className="inline-flex items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800 disabled:opacity-60"><Save className="h-4 w-4" />{isSaving ? "Saving..." : "Save changes"}</button></div>
        </form>
      </main>
    </div>
  );
}
