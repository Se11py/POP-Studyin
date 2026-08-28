"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useIsStandalone } from "@/hooks/useIsStandalone";

// Shown briefly on cold start when the app is launched from the home screen —
// mounted once in the root layout, so it never reappears on client-side navigation.
export default function StartupScreen() {
  const isStandalone = useIsStandalone();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isStandalone) return;
    const timer = setTimeout(() => setDismissed(true), 1100);
    return () => clearTimeout(timer);
  }, [isStandalone]);

  return (
    <AnimatePresence>
      {isStandalone && !dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-[#0056D2]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl"
          >
            <Image src="/icon-192.png" alt="POP Studying" width={192} height={192} className="w-full h-full object-cover" priority />
          </motion.div>
          <span className="text-white font-bold text-lg tracking-wide">POP Studying</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
