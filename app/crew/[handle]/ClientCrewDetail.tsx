// app/crew/[handle]/ClientCrewDetail.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { UICrewMember } from "@/lib/crew/model";
import { Icon789 } from "@/lib/icons/Icons789";
import { badgeRegistry } from "@/lib/badges";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { BadgePill } from "@/components/degeneratum/BadgePill";

interface Props {
  member: UICrewMember;
  isModal?: boolean;
}

export default function ClientCrewDetail({ member, isModal = false }: Props) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const [tiltEnabled, setTiltEnabled] = useState(false);

  // Shared hover state for one pill at a time
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  const socialsEntries = Object.entries(member.socials || {});

  useEffect(() => {
    console.log("CrewDetail - parsedTags:", member.parsedTags);
    console.log("CrewDetail - raw tags:", member.tags);
  }, [member]);

  // Tilt lerp
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setTilt((prev) => ({
        x: prev.x + (targetTilt.current.x - prev.x) * 0.1,
        y: prev.y + (targetTilt.current.y - prev.y) * 0.1,
      }));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Mouse tilt desktop
  useEffect(() => {
    if (!tiltEnabled || window.innerWidth < 768) return;

    const handleMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetTilt.current = {
        x: -(e.clientY - centerY) * 0.05,
        y: (e.clientX - centerX) * 0.05,
      };
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [tiltEnabled]);

  useEffect(() => {
    const t = setTimeout(() => setTiltEnabled(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isModal) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") router.back();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isModal, router]);

  useOutsideClick(cardRef, () => {
    if (isModal) router.back();
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transform: tiltEnabled
          ? `perspective(2000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "none",
      }}
      className={`
        pointer-events-auto
        w-full max-w-[520px]
        bg-neutral-950 rounded-3xl
        overflow-visible
        flex flex-col
        shadow-2xl shadow-black/70 border border-[#FFE154]/20
        relative
        ${isModal ? "max-h-[90vh]" : "max-h-[95vh]"}
      `}
    >
      {/* Header */}
      <div className="flex items-start p-5 md:p-6 gap-5 border-b border-[#FFE154]/10">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-[#FFE154]/50 bg-black/40 shadow-xl shrink-0">
          <Image
            src={member.pfp}
            alt={member.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <h1 className="text-[#FFE154] font-black text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight truncate">
            {member.name}
          </h1>
          <p className="text-gray-300 font-medium text-xl md:text-xl lg:text-2xl leading-snug -mb-1 truncate">
            @{member.handle}
          </p>
          <div className="mt-3">
            <motion.a
              href={`https://x.com/${member.handle}`}
              target="_blank"
              className="inline-flex items-center gap-4 px-3 py-2 rounded-full bg-[#FFE154]/10 border border-[#FFE154]/40 text-[#FFE154] font-bold hover:bg-[#FFE154]/20 transition-all text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Follow on <Icon789 name="x" variant="dao" size={28} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Content container – overflow-visible escape */}
      <div className="flex-1 p-5 md:p-6 overflow-y-auto scrollbar-hide overflow-visible relative">
        <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6 line-clamp-[8]">
          {member.bio}
        </p>
        {member.space_title && (
          <h2 className="text-[#FFE154] font-bold text-xl md:text-2xl mb-2">
            {member.space_title}
          </h2>
        )}
        {member.space_description && (
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-[6]">
            {member.space_description}
          </p>
        )}

        {/* Badge belt – horizontal, no wrap */}
        <div className="flex flex-nowrap gap-3 mb-6 items-center overflow-x-auto pb-2 scrollbar-hide">
          {member.parsedTags?.length ? (
            member.parsedTags.map((tag) => {
              const meta = badgeRegistry[tag as keyof typeof badgeRegistry];
              if (!meta) return null;

              return (
                <BadgePill
                  key={tag}
                  emoji={meta.emoji || "❓"}
                  tag={tag}
                  onHoverStart={() => setHoveredTag(tag)}
                  onHoverEnd={() => setHoveredTag(null)}
                />
              );
            })
          ) : (
            <span className="text-gray-600 text-sm italic">
              No tags yet – alpha grind incoming
            </span>
          )}
        </div>

        {/* Global pill – renders at card level, escapes all overflow */}
        <AnimatePresence>
          {hoveredTag && (
            <motion.div
              initial={{ opacity: 0, y: [-20] }}
              animate={{ opacity: 1, y: [-30] }}
              exit={{ opacity: 0, y: [-20] }}
              transition={{ duration: 0.24 }}
              className="
                absolute top-[-4rem] left-1/2 -translate-x-1/2 z-[200]
                bg-black/95 border-2 border-[#FFE154]/60 rounded-full
                px-6 py-1.5 text-base font-medium text-[#FFE154] whitespace-nowrap
                shadow-2xl shadow-[#FFE154]/40 pointer-events-none
              "
            >
              {badgeRegistry[hoveredTag as keyof typeof badgeRegistry]?.emoji ||
                "❓"}{" "}
              {hoveredTag}
            </motion.div>
          )}
        </AnimatePresence>

        {socialsEntries.length > 0 && (
          <div className="mt-6">
            <h3 className="text-[#FFE154] font-bold text-lg mb-3">Socials</h3>
            <div className="flex flex-wrap gap-3">
              {socialsEntries.map(([plat, handle]) => (
                <a
                  key={plat}
                  href={`https://${plat}.com/${handle}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#FFE154]/50 hover:bg-[#FFE154]/5 transition-all text-sm"
                >
                  <Icon789 name={plat as never} variant="dao" size={24} />
                  <span className="text-gray-200">@{handle}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
