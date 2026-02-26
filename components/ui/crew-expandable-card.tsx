// components/ui/crew-expandable-card.tsx
"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { crewStaticData } from "@/lib/crew/crewStaticData"; // default export

// ── Exact type matching your data (minimal interface for now) ──
export interface CrewMember {
  id: string;
  name: string;
  handle: string;
  pfp: string;
  modal?: string;
  bio: string;
  role: string;
  tier: string;
  status: string;
  verified: boolean;
  isActiveHost: boolean;
  activityScore: number;
  scheduleOverrides: Record<string, boolean>;
  spaceTitle?: string;
  spaceDescription?: string;
  spaceTimeUTC?: string;
  spacePlatform?: string;
  spaceRecurring?: boolean;
  socials: { x?: string; [key: string]: string | undefined };
  customBadges: string[];
  // ... other fields we ignore for UI right now
}

export function CrewExpandableCard() {
  const [active, setActive] = useState<CrewMember | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(null));

  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl font-black text-[#FFE154] hover:bg-[#FFE154]/20 transition-colors"
              onClick={() => setActive(null)}
            >
              ✕
            </motion.button>

            <motion.div
              layoutId={`crew-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#FFE154]/30 bg-black/95 shadow-2xl shadow-[#FFE154]/10"
            >
              <div className="flex flex-col gap-8 p-6 sm:p-8 md:p-10">
                {/* ── Top section: PFP + identity ── */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <motion.div
                    layoutId={`pfp-${active.id}-${id}`}
                    className="h-40 w-40 shrink-0 overflow-hidden rounded-xl border-4 border-[#FFE154]/50 shadow-lg shadow-[#FFE154]/20 sm:h-48 sm:w-48"
                  >
                    <Image
                      src={active.modal || active.pfp}
                      alt={active.name}
                      width={192}
                      height={192}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </motion.div>

                  <div className="flex-1 space-y-4">
                    <motion.h2
                      layoutId={`name-${active.id}-${id}`}
                      className="text-4xl font-black leading-none tracking-tight text-[#FFE154] sm:text-5xl"
                    >
                      {active.name}
                    </motion.h2>

                    <motion.p
                      layoutId={`handle-${active.id}-${id}`}
                      className="text-2xl font-bold text-[#FFE154]/80"
                    >
                      @{active.handle.replace(/^@/, "")}
                    </motion.p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#FFE154]/40 bg-[#FFE154]/10 px-4 py-1.5 text-base font-bold uppercase tracking-wide">
                        {active.role}
                      </span>

                      {active.isActiveHost && (
                        <span className="animate-pulse rounded-full bg-red-600/90 px-4 py-1.5 text-base font-black">
                          LIVE HOST
                        </span>
                      )}

                      {active.verified && (
                        <span className="text-2xl text-[#FFE154]">✓</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Bottom section: bio + badges + links ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 text-lg leading-relaxed text-white/90"
                >
                  <p className="line-clamp-5 md:line-clamp-none">{active.bio}</p>

                  {active.customBadges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {active.customBadges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full border border-[#FFE154]/30 bg-[#FFE154]/10 px-3 py-1 text-sm font-bold"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {active.spaceTitle && (
                    <div className="rounded-xl border border-[#FFE154]/20 bg-black/60 p-5">
                      <div className="mb-2 text-xl font-black text-[#FFE154]">
                        {active.spaceTitle}
                      </div>
                      {active.spaceTimeUTC && (
                        <div className="text-[#FFE154]/80">
                          {active.spaceTimeUTC} UTC • {active.spaceRecurring ? "♾️ Recurring" : "One-time"}
                        </div>
                      )}
                    </div>
                  )}

                  {active.socials.x && (
                    <Link
                      href={`https://x.com/${active.socials.x.replace(/^@/, "")}`}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full bg-[#FFE154] px-7 py-3.5 font-black text-black hover:bg-[#FFE154]/90 hover:scale-105 transition-all"
                    >
                      Follow @{active.socials.x.replace(/^@/, "")} → 
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {crewStaticData.map((member) => (
          <motion.div
            key={member.id}
            layoutId={`crew-${member.id}-${id}`}
            onClick={() => setActive(member)}
            className={cn(
              "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-[#FFE154]/20 bg-black/60",
              "hover:border-[#FFE154]/60 hover:shadow-[0_0_20px_#FFE15430] transition-all duration-300"
            )}
          >
            <motion.div layoutId={`pfp-${member.id}-${id}`} className="h-full w-full">
              <Image
                src={member.pfp}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Floating name pill */}
            <motion.div
              layoutId={`name-${member.id}-${id}`}
              className="absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 rounded-full border border-[#FFE154]/40 bg-black/85 px-4 py-2.5 text-center text-base font-bold text-[#FFE154] shadow-lg backdrop-blur-sm sm:text-lg"
            >
              {member.name}
            </motion.div>

            {/* Optional time pill – for schedule view later */}
            {/* {member.spaceTimeUTC && (
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 rounded-full border border-[#FFE154]/30 bg-black/90 px-4 py-1.5 text-xs font-bold text-[#FFE154]">
                {member.spaceTimeUTC}
              </div>
            )} */}
          </motion.div>
        ))}
      </div>
    </>
  );
}