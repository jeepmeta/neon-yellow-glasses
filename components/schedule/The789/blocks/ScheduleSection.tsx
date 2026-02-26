// components/schedule/The789/ScheduleSection.tsx
"use client";

import DawnBlock from "./DawnBlock";
import Core789Block from "./Core789";
import GraveyardBlock from "./GraveyardBlock";
import Image from "next/image";
import type { UICrewMember } from "@/lib/crew/model";
import { cn } from "@/lib/utils";

interface ScheduleSectionProps {
  crew: UICrewMember[];
}

export default function ScheduleSection({ crew }: ScheduleSectionProps) {
  return (
    <section className="relative bg-transparent text-white overflow-visible">
      {/* Background flame texture – controlled height to kill tablet gaps */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lighters/flames/background.webp"
          alt="Burning background"
          fill
          className={cn(
            "object-cover mix-blend-screen pointer-events-none transition-all",
            // Mobile: full aggressive height
            "min-h-screen opacity-30",
            // Tablets: cap height so content doesn't get pushed to hell
            "md:min-h-[80vh] lg:min-h-[90vh] xl:min-h-screen",
            // Optional: softer on very wide screens
            "2xl:opacity-25",
          )}
          priority
        />
      </div>

      {/* Content wrapper – push up if bg is shorter */}
      <div className="relative z-10">
        <div
          className={cn(
            "max-w-[95vw] mx-auto px-4",
            // Match bg height control + extra bottom padding only when needed
            "pb-16 md:pb-20 lg:pb-24 xl:pb-32",
            // If bg is capped on tablet, add negative margin to pull content up
            "md:-mt-8 lg:-mt-10 xl:mt-10",
          )}
        >
          <DawnBlock crew={crew} />
          <Core789Block crew={crew} />
          <GraveyardBlock crew={crew} />
        </div>
      </div>
    </section>
  );
}
