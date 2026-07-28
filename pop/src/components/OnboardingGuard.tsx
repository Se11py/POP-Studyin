"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const exemptPaths = ["/", "/landing", "/sign-in", "/sign-up", "/onboarding", "/hall-of-fame"];

export default function OnboardingGuard({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || exemptPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return;
    if (user.unsafeMetadata?.onboardingCompleted !== true) router.replace("/onboarding");
  }, [isLoaded, isSignedIn, pathname, router, user]);

  return children;
}
