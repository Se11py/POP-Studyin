"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  const { user, isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();

  const navLinks = [
    { label: "Classes", href: "/classes" },
    { label: "Flashcards", href: "/flashcards" },
    { label: "Interactives", href: "/interactives" },
    { label: "Dictionary", href: "/dictionary" },
    { label: "Blueprints", href: "/pathways" },
    { label: "Hall of Fame", href: "/hall-of-fame" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        {/* Brand Logo & Navigation Links */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 flex items-center justify-center rounded">
              <span className="text-white text-xl font-bold font-serif tracking-tighter">P</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-blue-900">POP Studying</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? "text-blue-700 font-bold" : "hover:text-blue-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Auth Section */}
        <div className="flex items-center gap-4">
          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="px-5 py-2.5 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-[15px] shadow-md">
                Dashboard
              </Link>
              <Link href="/profile" className="hidden md:block px-4 py-2.5 text-blue-700 font-bold rounded border border-blue-100 hover:bg-blue-50 transition-colors text-[15px]">
                Profile
              </Link>
              <div className="flex items-center justify-center p-1 bg-gray-50 border border-gray-200 rounded-full">
                <UserButton />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="hidden md:block text-blue-700 hover:text-blue-900 transition-colors text-[15px] font-bold px-4 py-2">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-[15px] shadow-md">
                  Join for Free
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
