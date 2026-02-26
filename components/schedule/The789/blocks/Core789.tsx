// components/schedule/The789/blocks/Core789.tsx
"use client";

import { motion } from "motion/react";
import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { UICrewMember } from "@/lib/crew/model";
import { cn } from "@/lib/utils";

const FLAME_VIDEO = "/lighters/flames/zippoflame.webm";
const FALLBACK_ZIPPO_CLOSED = "/lighters/zippos/closed/fallback.webp";
const FALLBACK_ZIPPO_OPEN = "/lighters/zippos/open/fallback.webp";

const CORE789_HANDLES = ["vibesmetax", "wookimeta", "gatormetax"] as const;

type Props = {
  crew: UICrewMember[];
};

export default function Core789Block({ crew }: Props) {
  const router = useRouter();

  const displayed = useMemo(() => {
    return CORE789_HANDLES.map((h) =>
      crew.find((m) => m.handle.toLowerCase() === h.toLowerCase()),
    ).filter((m): m is UICrewMember => !!m);
  }, [crew]);

  const [liveStates, setLiveStates] = useState<Record<string, boolean>>({});

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

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

      setLiveStates(newStates);
    };

    checkLive();
    const interval = setInterval(checkLive, 10000); // recheck every 10s

    return () => clearInterval(interval);
  }, [displayed]);

  useEffect(() => {
    displayed.forEach((member) => {
      const video = videoRefs.current[member.handle];
      if (!video) return;

      const isLive = liveStates[member.handle] ?? false;

      if (isLive) {
        const timer = setTimeout(() => {
          video.style.opacity = "1";
          video.play().catch((err) => console.error("Flame play failed:", err));
        }, 1800);

        return () => clearTimeout(timer);
      } else {
        video.pause();
        video.currentTime = 0;
        video.style.opacity = "0";
      }
    });
  }, [liveStates, displayed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={cn(
        "grid grid-cols-3",
        "gap-1 xs:gap-1 sm:gap-1 md:gap-4 lg:gap-5",
        "mx-auto",
        "max-w-[100vw] -mx-6 xs:-mx-3 sm:-mx-2 md:mx-auto",
        "px-0 xs:px-0 sm:px-1 md:px-6 lg:px-8 xl:px-10",
        "md:max-w-[min(85vw,960px)] lg:max-w-[min(70vw,1100px)] xl:max-w-[min(60vw,1200px)] 2xl:max-w-[min(55vw,1300px)]",
        "-translate-x-[3%] sm:-translate-x-[2.5%] md:-translate-x-[2%] lg:-translate-x-2%",
        "pb-6 md:pb-8 lg:pb-10",
        "justify-items-center justify-center",
      )}
    >
      {displayed.map((member, index) => {
        const isLive = liveStates[member.handle] ?? false;

        const zippoClosed =
          member.lighter_zippo_closed || FALLBACK_ZIPPO_CLOSED;
        const zippoOpen = member.lighter_zippo_open || FALLBACK_ZIPPO_OPEN;
        const transFrames = member.lighter_zippo_frames || [];

        return (
          <motion.button
            key={member.id}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2 + index * 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.07, y: -10 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "group relative aspect-square w-full overflow-visible rounded-2xl cursor-pointer",
              "min-w-[calc(33.333%-0.5rem)] xs:min-w-[calc(33.333%-0.75rem)]",
              "md:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px] 2xl:max-w-[400px]",
              isLive && "z-10 scale-[1.08] md:scale-[1.10]",
            )}
            onClick={() => router.push(`/crew/${member.handle}`)}
          >
            <video
              ref={(el) => {
                videoRefs.current[member.handle] = el;
              }}
              src={FLAME_VIDEO}
              muted
              loop
              playsInline
              preload="auto"
              className={cn(
                "absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none z-0 transition-all duration-700",
                isLive
                  ? "opacity-100 brightness-125 contrast-110 saturate-120" // flame goes nuclear when live
                  : "opacity-0",
              )}
            />

            <div
              className={cn(
                "relative w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700",
                isLive
                  ? "zippo-anim-opening brightness-125 saturate-135"
                  : "zippo-anim-closing brightness-115 saturate-125",
              )}
              style={
                {
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  "--zippo-closed": `url(${zippoClosed})`,
                  "--zippo-open": `url(${zippoOpen})`,
                  "--zippo-frame-1": `url(${transFrames[0] || FALLBACK_ZIPPO_CLOSED})`,
                  "--zippo-frame-2": `url(${transFrames[1] || FALLBACK_ZIPPO_CLOSED})`,
                  "--zippo-frame-3": `url(${transFrames[2] || FALLBACK_ZIPPO_CLOSED})`,
                  "--zippo-frame-4": `url(${transFrames[3] || FALLBACK_ZIPPO_CLOSED})`,
                } as React.CSSProperties
              }
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
}
