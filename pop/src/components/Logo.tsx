"use client";

import Image from "next/image";
import { useCatMode } from "@/hooks/useCatMode";

const VARIANTS = {
  black: { src: "/logo-black.png", width: 1700, height: 752 },
  white: { src: "/logo-white.png", width: 1700, height: 752 },
  pop: { src: "/logo-pop.png", width: 1244, height: 752 },
};

/** The POP Studying logo. In cat mode every variant becomes the square cat-mode logo. */
export default function Logo({ variant = "black", className, priority }: { variant?: keyof typeof VARIANTS; className?: string; priority?: boolean }) {
  const cat = useCatMode();
  const v = cat ? { src: "/logo-cat.png", width: 540, height: 540 } : VARIANTS[variant];
  return <Image src={v.src} alt="POP Studying" width={v.width} height={v.height} className={`${className ?? ""}${cat ? " rounded-[12%]" : ""}`} priority={priority} />;
}
