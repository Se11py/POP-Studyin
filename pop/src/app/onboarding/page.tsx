"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { ArrowRight, AtSign, Check, School, Sparkles } from "lucide-react";
import { requiresCustomSchool, schools, subjects, yearGroups } from "@/lib/onboardingOptions";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const saveProfile = useMutation(api.users.saveProfile);
  const router = useRouter();
  const [yearGroup, setYearGroup] = useState("");
  const [school, setSchool] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [wantsToContribute, setWantsToContribute] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const showCustomSchool = requiresCustomSchool(school);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) => current.includes(subject) ? current.filter((item) => item !== subject) : [...current, subject]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !yearGroup || selectedSubjects.length === 0 || !school || wantsToContribute === null) {
      setError("Please complete each required field before continuing.");
      return;
    }
    if (showCustomSchool && !customSchool.trim()) {
      setError("Please tell us which school you attend.");
      return;
    }
    const normalizedInstagram = instagram.trim().replace(/^@/, "");
    if (wantsToContribute && !normalizedInstagram) {
      setError("Please provide your Instagram username if you'd like to become a contributor.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const profile = {
        onboardingCompleted: true,
        yearGroup,
        school: showCustomSchool ? customSchool.trim() : school,
        subjects: selectedSubjects,
        instagram: normalizedInstagram,
        wantsToContribute,
      };
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, ...profile } });
      await saveProfile(profile);
      router.replace("/dashboard");
    } catch {
      setError("We couldn't save your details. Please try again.");
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm font-bold text-gray-500">Loading your profile...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center">
          <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-11 w-auto" priority />
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-blue-50 px-7 py-8 md:px-12 md:py-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded border border-blue-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700"><Sparkles className="h-4 w-4" /> A few quick questions</div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Make POP yours.</h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">Tell us a little about yourself so we can tailor your study experience and connect you with the right resources.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-9 px-7 py-8 md:px-12 md:py-10">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2"><span className="text-sm font-bold text-gray-900">What year or grade are you in? <span className="text-blue-700">*</span></span><select required value={yearGroup} onChange={(event) => setYearGroup(event.target.value)} className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-blue-700"><option value="">Select your year</option>{yearGroups.map((year) => <option key={year}>{year}</option>)}</select></label>
              <label className="space-y-2"><span className="flex items-center gap-2 text-sm font-bold text-gray-900"><School className="h-4 w-4 text-blue-700" /> Which school are you from? <span className="text-blue-700">*</span></span><select required value={school} onChange={(event) => setSchool(event.target.value)} className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-blue-700"><option value="">Select your school</option>{schools.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>

            {showCustomSchool && <label className="-mt-5 block space-y-2"><span className="text-sm font-bold text-gray-900">School name <span className="text-blue-700">*</span></span><input required value={customSchool} onChange={(event) => setCustomSchool(event.target.value)} placeholder="Enter your school name" className="w-full rounded border border-gray-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-blue-700" /></label>}

            <fieldset><legend className="mb-3 text-sm font-bold text-gray-900">Which subjects are you interested in? <span className="text-blue-700">*</span></legend><div className="grid gap-2 sm:grid-cols-2">{subjects.map((subject) => { const selected = selectedSubjects.includes(subject); return <button type="button" key={subject} onClick={() => toggleSubject(subject)} className={`flex items-center justify-between rounded border px-4 py-3 text-left text-sm font-bold transition-colors ${selected ? "border-blue-700 bg-blue-50 text-blue-800" : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-700"}`}><span>{subject}</span>{selected && <Check className="h-4 w-4" />}</button>; })}</div></fieldset>

            <label className="block space-y-2"><span className="flex items-center gap-2 text-sm font-bold text-gray-900"><AtSign className="h-4 w-4 text-rose-500" /> Instagram <span className={`font-normal ${wantsToContribute ? "text-blue-700" : "text-gray-400"}`}>{wantsToContribute ? "(required for contributors)" : "(optional)"}</span></span><div className="flex items-center rounded border border-gray-300 px-4 focus-within:border-blue-700"><span className="text-sm text-gray-400">@</span><input required={wantsToContribute === true} value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="yourusername" className="w-full border-0 px-2 py-3 text-sm outline-none placeholder:text-gray-400" /></div></label>

            <fieldset><legend className="mb-3 text-sm font-bold text-gray-900">Would you like to become a contributor? <span className="text-blue-700">*</span></legend><div className="grid gap-3 sm:grid-cols-2">{[{ value: true, label: "Yes, I’d love to help", detail: "Share notes, flashcards, or interactives." }, { value: false, label: "Maybe later", detail: "You can change this anytime." }].map((option) => <button type="button" key={option.label} onClick={() => setWantsToContribute(option.value)} className={`rounded border p-4 text-left transition-colors ${wantsToContribute === option.value ? "border-blue-700 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}><span className="block text-sm font-bold text-gray-900">{option.label}</span><span className="mt-1 block text-xs text-gray-500">{option.detail}</span></button>)}</div></fieldset>

            {error && <p role="alert" className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
            <div className="flex flex-col items-start justify-between gap-4 border-t border-gray-100 pt-7 sm:flex-row sm:items-center"><p className="text-xs leading-relaxed text-gray-400">Your details help personalize POP. Instagram is only required if you choose to become a contributor.</p><button type="submit" disabled={isSaving} className="inline-flex shrink-0 items-center gap-2 rounded bg-blue-700 px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Saving..." : "Continue"}<ArrowRight className="h-4 w-4" /></button></div>
          </form>
        </div>
      </div>
    </main>
  );
}
