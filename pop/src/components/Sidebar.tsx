"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, BookOpen, Layers, Activity, BookA, Compass, Trophy,
  ChevronRight, Menu, X,
} from "lucide-react";

const toolLinks = [
  { label: "Classes", href: "/classes", icon: BookOpen },
  { label: "Flashcards", href: "/flashcards", icon: Layers },
  { label: "Interactives", href: "/interactives", icon: Activity },
  { label: "Dictionary", href: "/dictionary", icon: BookA },
  { label: "Blueprints", href: "/pathways", icon: Compass },
  { label: "Hall of Fame", href: "/hall-of-fame", icon: Trophy },
];

function SidebarNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();
  const isToolRoute = toolLinks.some((link) => link.href === pathname);
  const [toolsOpen, setToolsOpen] = useState(isToolRoute);

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

        <div>
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
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 pl-6 pr-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-bold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Icon size={16} />
                        <span>{link.label}</span>
                      </Link>
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
