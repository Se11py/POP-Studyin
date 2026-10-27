"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Menu, X } from "lucide-react";
import { toolLinks } from "@/lib/studyNav";

export { toolLinks };

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  onNavigate,
  block,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onNavigate?: () => void;
  block?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-2 rounded-lg text-sm font-bold transition-colors ${
        block ? "px-3 py-2.5" : "px-3 py-2"
      } ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  );
}

function AuthSection({ stacked = false, onNavigate }: { stacked?: boolean; onNavigate?: () => void }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <div className={`flex items-center gap-3 ${stacked ? "justify-between" : ""}`}>
        <div className="flex items-center justify-center p-1 bg-gray-50 border border-gray-200 rounded-full shrink-0">
          <UserButton />
        </div>
        <Link href="/profile" onClick={onNavigate} className="text-sm font-bold text-gray-700 hover:text-blue-700 transition-colors">
          Profile
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${stacked ? "flex-col items-stretch" : ""}`}>
      <SignInButton mode="modal">
        <button className="px-4 py-2 text-blue-700 font-bold rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors text-sm">
          Log In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="px-4 py-2 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors text-sm shadow-sm">
          Join for Free
        </button>
      </SignUpButton>
    </div>
  );
}

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-8 w-auto" priority />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {isLoaded && isSignedIn && (
            <NavLink href="/dashboard" label="Dashboard" icon={LayoutGrid} isActive={pathname === "/dashboard"} />
          )}
          {toolLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} icon={link.icon} isActive={pathname === link.href} />
          ))}
        </nav>

        {/* Desktop auth/profile */}
        <div className="hidden lg:flex items-center shrink-0">
          <AuthSection />
        </div>

        {/* Mobile/tablet menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-gray-600 hover:text-blue-700 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile/tablet dropdown panel */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <nav className="flex flex-col gap-1 p-3">
              {isLoaded && isSignedIn && (
                <NavLink href="/dashboard" label="Dashboard" icon={LayoutGrid} isActive={pathname === "/dashboard"} onNavigate={closeMenu} block />
              )}
              {toolLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  isActive={pathname === link.href}
                  onNavigate={closeMenu}
                  block
                />
              ))}
            </nav>
            <div className="p-3 border-t border-gray-100">
              <AuthSection stacked onNavigate={closeMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
