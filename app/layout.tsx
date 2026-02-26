// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react"; // add this if not already inferred

import Singularity from "@/components/ui/singularity";
import Footer from "@/components/ui/footer";
import FloatingEmbers from "@/components/ui/floating-embers";
import "./globals.css";

export const metadata: Metadata = {
  title: "789 Studios Empire Hub",
  description:
    "Yellow-black domination. Crew. Schedule. Hot takes. Let's fucking go.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
  modal, // ← Next.js injects this when @modal slot is active
}: Readonly<{
  children: ReactNode;
  modal?: ReactNode; // optional because default.tsx returns null when no modal
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased min-h-screen flex flex-col relative">
        {/* Pixel void – locked at bottom of stack */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <FloatingEmbers />
        </div>

        {/* Everything else lives in normal flow or higher */}
        <Singularity />

        {/* Main content */}
        <main className="flex-1 w-full relative z-0">{children}</main>

        {/* Modal overlay – renders on top when intercepted */}
        {modal}

        <Footer />
      </body>
    </html>
  );
}
