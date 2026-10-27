"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ChevronRight, Menu, X, Pin, PinOff } from "lucide-react";
import { toolLinks, usePinnedTools, useRecentSubjects } from "@/lib/studyNav";

function SectionLabel({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 px-3 pt-4 pb-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
      {icon}
      {children}
    </p>
  );
}

function SidebarNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();
  const isToolRoute = toolLinks.some((link) => link.href === pathname);
  const [toolsOpen, setToolsOpen] = useState(isToolRoute);
  const { pinned, isPinned, togglePin } = usePinnedTools();
  const recent = useRecentSubjects();

  return (
    <div className="flex flex-col h-full">
      <Link href="/" onClick={onNavigate} className="flex items-center px-5 h-20 shrink-0 border-b border-gray-100">
        <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-9 w-auto" priority />
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {isLoaded && isSignedIn && (
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
              pathname === "/dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid size={18} />
            <span>Dashboard</span>
          </Link>
        )}

        {/* Pinned tools */}
        <SectionLabel icon={<Pin size={11} className="fill-current" />}>Pinned</SectionLabel>
        {pinned.length === 0 ? (
          <p className="px-3 pb-1 text-xs text-gray-400 leading-relaxed">
            Nothing pinned yet. Hover a tool below and tap the pin to keep it here.
          </p>
        ) : (
          pinned.map(({ label, href, icon: Icon }) => (
            <div key={href} className="group relative">
              <Link
                href={href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 pr-9 rounded-lg text-sm font-bold transition-colors ${
                  pathname === href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
              <button
                onClick={() => togglePin(href)}
                aria-label={`Unpin ${label}`}
                title="Unpin"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded text-gray-300 opacity-100 md:opacity-0 group-hover:opacity-100 hover:text-gray-700 hover:bg-white transition"
              >
                <PinOff size={14} />
              </button>
            </div>
          ))
        )}

        {/* Recently opened subjects */}
        {recent.length > 0 && (
          <>
            <SectionLabel>Recent</SectionLabel>
            {recent.map((subject) => {
              const href = `/classes/${subject.id}`;
              return (
                <Link
                  key={subject.id}
                  href={href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors [&_svg]:w-4 [&_svg]:h-4 ${
                    pathname === href ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-gray-400">{subject.icon}</span>
                  <span className="flex-1 min-w-0 truncate font-medium">{subject.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{subject.level}</span>
                </Link>
              );
            })}
          </>
        )}

        <div className="pt-3">
          <button
            onClick={() => setToolsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span>Tools</span>
            <ChevronRight size={14} className={`transition-transform ${toolsOpen ? "rotate-90" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {toolsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-1 pb-1 space-y-1">
                  {toolLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    const pinnedNow = isPinned(link.href);
                    return (
                      <div key={link.href} className="group relative">
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className={`flex items-center gap-3 pl-6 pr-10 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-700 font-bold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <Icon size={16} />
                          <span>{link.label}</span>
                        </Link>
                        <button
                          onClick={() => togglePin(link.href)}
                          aria-pressed={pinnedNow}
                          aria-label={pinnedNow ? `Unpin ${link.label}` : `Pin ${link.label}`}
                          title={pinnedNow ? "Pinned — click to unpin" : "Pin to top"}
                          className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded transition ${
                            pinnedNow
                              ? "text-blue-700 opacity-100"
                              : "text-gray-300 opacity-100 md:opacity-0 group-hover:opacity-100 hover:text-blue-700 hover:bg-white"
                          }`}
                        >
                          <Pin size={14} className={pinnedNow ? "fill-current" : ""} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="shrink-0 border-t border-gray-100 p-4">
        {isLoaded && isSignedIn ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1 bg-gray-50 border border-gray-200 rounded-full shrink-0">
              <UserButton />
            </div>
            <Link href="/profile" onClick={onNavigate} className="flex-1 text-sm font-bold text-gray-700 hover:text-blue-700 transition-colors">
              Profile
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <SignUpButton mode="modal">
              <button className="w-full px-4 py-2.5 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-sm shadow-md">
                Join for Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="w-full px-4 py-2.5 text-blue-700 font-bold rounded border border-blue-100 hover:bg-blue-50 transition-colors text-sm">
                Log In
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-64 md:flex-col bg-white border-r border-gray-200">
        <SidebarNavContent />
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-8 w-auto" priority />
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 -mr-2 text-gray-600 hover:text-blue-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="md:hidden fixed inset-0 z-50 bg-black/40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute top-5 right-4 p-1 text-gray-400 hover:text-gray-700 transition-colors z-10"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              <SidebarNavContent onNavigate={() => setDrawerOpen(false)} />
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
