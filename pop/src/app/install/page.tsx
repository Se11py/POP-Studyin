"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Laptop, Share, Smartphone, TabletSmartphone } from "lucide-react";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { usePlatform, type Platform } from "@/hooks/usePlatform";

const tabs: { id: Platform; label: string; icon: typeof Smartphone }[] = [
  { id: "ios", label: "iPhone / iPad", icon: Smartphone },
  { id: "android", label: "Android", icon: TabletSmartphone },
  { id: "desktop", label: "Desktop", icon: Laptop },
];

export default function InstallPage() {
  const isStandalone = useIsStandalone();
  const platform = usePlatform();
  const { canInstall, promptInstall } = useInstallPrompt();
  const [selectedTab, setSelectedTab] = useState<Platform | null>(null);
  const activeTab = selectedTab ?? platform;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-8 w-auto" priority />
          </Link>
          <Link href="/landing" className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-blue-700 transition-colors">
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-widest text-blue-700">
            <Smartphone size={14} />
            Install POP Studying
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-serif">
            Get the app on your device
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            No app store needed — add POP Studying to your home screen in a few taps.
          </p>
        </div>

        {isStandalone ? (
          <div className="bg-white border border-emerald-200 rounded-lg shadow-sm p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
            <h2 className="text-xl font-bold text-gray-900">You&apos;re already using the app!</h2>
            <p className="text-gray-600">This device already has POP Studying installed. Nothing else to do.</p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded font-bold hover:bg-blue-800 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
                      isActive
                        ? "border-blue-700 text-blue-700 bg-blue-50/50"
                        : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-8 md:p-10">
              {activeTab === "ios" && (
                <div className="space-y-6">
                  <ol className="space-y-5">
                    <Step number={1} title="Open this page in Safari">
                      Add to Home Screen only works from Safari — if you&apos;re in another browser or app, copy this link into Safari first.
                    </Step>
                    <Step number={2} title="Tap the Share icon">
                      <span className="inline-flex items-center gap-1.5">
                        Tap <Share size={14} className="inline text-blue-700" /> in Safari&apos;s toolbar (bottom on iPhone, top on iPad).
                      </span>
                    </Step>
                    <Step number={3} title='Tap "Add to Home Screen"'>
                      Scroll down the share sheet until you see it, then tap it.
                    </Step>
                    <Step number={4} title='Tap "Add"'>
                      Confirm in the top-right corner — the POP icon will appear on your home screen.
                    </Step>
                  </ol>
                </div>
              )}

              {activeTab === "android" && (
                <div className="space-y-6">
                  {canInstall ? (
                    <div className="text-center space-y-4 py-4">
                      <p className="text-gray-600">Your browser can install POP Studying directly.</p>
                      <button
                        onClick={promptInstall}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white rounded font-bold hover:bg-blue-800 transition-colors shadow-md"
                      >
                        Install App
                      </button>
                    </div>
                  ) : (
                    <ol className="space-y-5">
                      <Step number={1} title="Open the browser menu">
                        Tap the <strong>⋮</strong> (three dots) in the top-right corner of Chrome.
                      </Step>
                      <Step number={2} title='Tap "Add to Home screen" or "Install app"'>
                        The exact wording depends on your browser version.
                      </Step>
                      <Step number={3} title="Confirm">
                        Tap <strong>Install</strong> (or <strong>Add</strong>) — the POP icon will appear on your home screen.
                      </Step>
                    </ol>
                  )}
                </div>
              )}

              {activeTab === "desktop" && (
                <div className="space-y-6">
                  {canInstall ? (
                    <div className="text-center space-y-4 py-4">
                      <p className="text-gray-600">Your browser can install POP Studying as a desktop app.</p>
                      <button
                        onClick={promptInstall}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white rounded font-bold hover:bg-blue-800 transition-colors shadow-md"
                      >
                        Install App
                      </button>
                    </div>
                  ) : (
                    <ol className="space-y-5">
                      <Step number={1} title="Look for the install icon">
                        In Chrome or Edge, check the right side of the address bar for an install icon.
                      </Step>
                      <Step number={2} title="Or use the browser menu">
                        Open the browser&apos;s menu and look for <strong>&quot;Install POP Studying&quot;</strong> or <strong>&quot;Add to Home Screen.&quot;</strong>
                      </Step>
                      <Step number={3} title="Confirm">
                        Click <strong>Install</strong> — POP Studying will open in its own window.
                      </Step>
                    </ol>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="shrink-0 w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center">
        {number}
      </span>
      <div className="pt-0.5">
        <p className="font-bold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{children}</p>
      </div>
    </li>
  );
}
