import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import OnboardingGuard from "@/components/OnboardingGuard";

export const metadata: Metadata = {
  title: "POP",
  description: "An all-in-one educational platform for secondary students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        </head>
        <body className="font-sans antialiased">
          <ConvexClientProvider><OnboardingGuard>{children}</OnboardingGuard></ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}