import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import OnboardingGuard from "@/components/OnboardingGuard";
import StartupScreen from "@/components/StartupScreen";

export const metadata: Metadata = {
  title: "POP",
  description: "An all-in-one educational platform for secondary students.",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "POP Studying",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0056D2",
  viewportFit: "cover",
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
          <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Prompt:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-sans antialiased">
          <StartupScreen />
          <ConvexClientProvider><OnboardingGuard>{children}</OnboardingGuard></ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}