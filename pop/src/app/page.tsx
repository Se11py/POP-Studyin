"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Already signed in — skip the marketing page and go straight into the app
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    router.replace(user.unsafeMetadata?.onboardingCompleted === true ? "/dashboard" : "/onboarding");
  }, [isLoaded, isSignedIn, user, router]);

  return <LandingPage />;
}
