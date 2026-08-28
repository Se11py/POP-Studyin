import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POP Arena — Live Quiz Battles",
  description: "Fast-paced live multiplayer quiz games for IGCSE & A-Level revision.",
};

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
