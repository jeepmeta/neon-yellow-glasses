// components/schedule/The789/blocks/DawnBlock.tsx
"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { UICrewMember } from "@/lib/crew/model";
import { cn } from "@/lib/utils";

const FLAME_VIDEO = "/lighters/flames/bicflame.webm";
const FALLBACK_BIC = "/fallback-bic.webp";

const DAWN_HANDLES = [
  "leahbluewater",
  "gramixmeta",
  "godsburnt",
  "pawsmeta",
  "shieldmetax",
  "anthemhayek",
  "wellmeta",
  "barkmeta",
] as const;

type Props = {
  crew: UICrewMember[];
};

export default function DawnBlock({ crew }: Props) {
  const router = useRouter();

  const displayed = useMemo(() => {
    return DAWN_HANDLES.map((h) =>
      crew.find((m) => m.handle.toLowerCase() === h.toLowerCase()),
    ).filter((m): m is UICrewMember => !!m);
  }, [crew]);

  const [liveStates, setLiveStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkLive = () => {
      const now = new Date();
      const todayUTC = now.toISOString().split("T")[0];

      const newStates: Record<string, boolean> = {};

      displayed.forEach((member) => {
        if (!member.space_start_time || !member.space_end_time) {
          newStates[member.handle] = false;
          return;
        }

        const startStr = `${todayUTC}T${member.space_start_time.padEnd(5, "0")}:00Z`;
        const endStr = `${todayUTC}T${member.space_end_time.padEnd(5, "0")}:00Z`;

        const start = new Date(startStr);
        const end = new Date(endStr);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          newStates[member.handle] = false;
          return;
        }

        newStates[member.handle] = now >= start && now <= end;
      });

      setLiveStates((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(newStates)) return prev;
        return newStates;
      });
    };

    checkLive();
    const interval = setInterval(checkLive, 10000);

    return () => clearInterval(interval);
  }, [displayed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="
        grid 
        grid-cols-4 sm:grid-cols-4 md:grid-cols-8 
        gap-2 xs:gap-2 sm:gap-3 md:gap-4 
        mx-auto max-w-[min(95vw,1400px)]
        px-1 sm:px-1 md:px-2 
        pb-4 md:pb-4 lg:pb-6
      "
    >
      {displayed.map((member, index) => {
        const isLive = liveStates[member.handle] ?? false;
        const bicSrc = member.lighter_bic || FALLBACK_BIC;

        return (
          <motion.button
            key={member.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.15 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.07, y: -10 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "group relative aspect-[540/1080] w-full overflow-visible rounded-2xl cursor-pointer mx-auto",
              isLive && "z-10 scale-[1.06] md:scale-[1.08]",
            )}
            onClick={() => router.push(`/crew/${member.handle}`)}
          >
            <video
              src={FLAME_VIDEO}
              muted
              loop
              playsInline
              className={cn(
                "absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none z-0 transition-all duration-700",
                isLive
                  ? "opacity-100 brightness-125 contrast-110"
                  : "opacity-0",
              )}
              autoPlay={isLive}
              ref={(el) => {
                if (!el) return;
                if (isLive) {
                  el.play().catch(() => {});
                } else {
                  el.pause();
                  el.currentTime = 0;
                }
              }}
            />

            <Image
              src={bicSrc}
              alt={`${member.name} lighter`}
              fill
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16.66vw, 12.5vw"
              className={cn(
                "object-cover transition-transform duration-700 relative z-10",
                isLive
                  ? "brightness-125 saturate-135 scale-105"
                  : "brightness-115 saturate-125",
              )}
              loading="lazy"
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
}
