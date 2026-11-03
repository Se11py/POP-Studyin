"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder-convex-url.convex.cloud";
const convex = new ConvexReactClient(convexUrl);
const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

function PostHogIdentity() {
  const { isLoaded, user } = useUser();
  const identifiedUserId = useRef<string | null>(null);
  const email = user?.primaryEmailAddress?.emailAddress;
  const name = user?.fullName;

  useEffect(() => {
    if (!isLoaded || !posthogConfigured) return;

    if (!user) {
      if (identifiedUserId.current) {
        posthog.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === user.id) return;

    if (identifiedUserId.current) {
      posthog.reset();
    }

    const personProperties: Record<string, string> = {};
    if (email) personProperties.email = email;
    if (name) personProperties.name = name;

    posthog.identify(user.id, personProperties);
    identifiedUserId.current = user.id;
  }, [email, isLoaded, name, user]);

  return null;
}

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <PostHogIdentity />
      {children}
    </ConvexProviderWithClerk>
  );
}
