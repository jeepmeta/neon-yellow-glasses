// app/test-scroll/page.tsx
"use client";

import Singularity from "@/components/ui/singularity";

export default function TestScrollPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Singularity menu – only Home + Test Section */}
      <Singularity />

      {/* Tall spacer so we can scroll */}
      <div className="h-[150vh] bg-gradient-to-b from-black to-[#1a1a1a]" />

      {/* The target section */}
      <section
        id="test-section"
        className="h-screen flex items-center justify-center bg-[#111]"
      >
        <div className="text-center">
          <h1 className="text-6xl font-black text-[#FFE154] mb-8">
            TEST SECTION – WE MADE IT
          </h1>
          <p className="text-2xl text-white/80">
            If you see this after clicking Test Section in menu → anchors
            fucking work.
          </p>
        </div>
      </section>

      {/* Even more spacer to prove scroll distance */}
      <div className="h-[100vh]" />
    </div>
  );
}
