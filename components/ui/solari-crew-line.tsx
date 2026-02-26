// components/ui/SolariCrewLine.tsx
"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { UICrewMember } from "@/lib/crew/model";

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-?!".split("");

type Props = {
  member: UICrewMember | null | undefined;
  index: number;
};

function InvalidMemberFallback({ index }: { index: number }) {
  console.warn(`SolariCrewLine[${index}] – invalid member data`);
  return (
    <div
      className="h-28 md:h-32 bg-black/40 border border-[#FFE154]/20 rounded-xl flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="text-[#FFE154]/30 text-sm font-mono">
        CREW DATA GLITCH – CHECK SUPABASE ROW
      </span>
    </div>
  );
}

function SolariCrewLineInner({
  member,
  index,
}: {
  member: UICrewMember;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [revealed, setRevealed] = useState(false);
  const [scrambleIndex, setScrambleIndex] = useState(0);

  const safeName = (member.name || "UNKNOWN DEGEN").toUpperCase();
  const safeRole = (member.role || "CREW MEMBER").toUpperCase();
  const fullText = `${safeName}   ${safeRole}`;
  const chars = fullText.split("");

  useEffect(() => {
    if (!isInView) return;

    const scrambleTimer = setInterval(() => {
      setScrambleIndex((prev) => prev + 1);
    }, 80);

    const revealTimer = setTimeout(
      () => {
        clearInterval(scrambleTimer);
        setRevealed(true);
      },
      1200 + index * 200,
    );

    return () => {
      clearInterval(scrambleTimer);
      clearTimeout(revealTimer);
    };
  }, [isInView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="flex items-center gap-3 md:gap-4 w-full max-w-5xl mx-auto px-4"
    >
      {/* PFP flip */}
      <motion.div
        className="relative w-20 h-20 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 border-[#FFE154]/60 shadow-[0_0_20px_#FFE15433]"
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{
          rotateX: revealed ? 0 : 90,
          opacity: revealed ? 1 : 0,
        }}
        transition={{
          duration: 1.1,
          delay: index * 0.2 + 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <Image
          src={member.pfp || "/fallback-pfp.webp"}
          alt={safeName}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Solari flaps */}
      <div className="flex flex-wrap gap-1 md:gap-1.5">
        {chars.map((char, i) => {
          const isSpace = char === " ";
          const target = isSpace ? " " : char;

          let displayChar = " ";
          if (revealed) {
            displayChar = target;
          } else if (scrambleIndex > i + 5) {
            displayChar = target;
          } else if (scrambleIndex > i) {
            displayChar =
              FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
          }

          return (
            <motion.div
              key={`${index}-${i}`}
              className={cn(
                "relative w-8 h-10 md:w-10 md:h-12 bg-black border border-[#FFE154]/40 rounded-sm overflow-hidden shadow-inner flex items-center justify-center",
                isSpace && "bg-transparent border-transparent w-4 md:w-6",
              )}
              animate={{
                rotateX: revealed || scrambleIndex > i ? [90, 0] : [0, 90],
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15 + i * 0.03,
                ease: "backOut",
              }}
            >
              {!isSpace && (
                <span className="text-[#FFE154] font-mono font-bold text-lg md:text-2xl tracking-wider drop-shadow-[0_1px_4px_rgba(255,225,84,0.6)]">
                  {displayChar}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function SolariCrewLine({ member, index }: Props) {
  if (!member || !member.handle || !member.name) {
    return <InvalidMemberFallback index={index} />;
  }
  return <SolariCrewLineInner member={member} index={index} />;
}
