// components/degeneratum/BadgePill.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface BadgePillProps {
  emoji?: string;
  tag: string;
  svg?: string;
}

export function BadgePill({ emoji = "❓", tag, svg }: BadgePillProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hasSvg = !!svg;
  const bgColor = hasSvg ? "bg-[#FFE154]" : "bg-black/95";
  const textColor = hasSvg ? "text-black" : "text-[#FFE154]";
  const borderColor = hasSvg ? "border-black/30" : "border-[#FFE154]/60";
  const shadowColor = hasSvg ? "shadow-black/30" : "shadow-[#FFE154]/30";

  return (
    <div
      className="
        relative flex items-center justify-center shrink-0
        w-10 h-10 md:w-12 md:h-12 rounded-full
        bg-black/60 border border-[#FFE154]/40
        hover:border-[#FFE154]/80 hover:bg-[#FFE154]/5 hover:scale-110 hover:shadow-lg hover:shadow-[#FFE154]/30
        transition-all duration-300
        cursor-default select-none overflow-visible
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG first, emoji fallback */}
      {svg ? (
        <Image
          src={`/${svg}`}
          alt={tag}
          width={36}
          height={36}
          className="drop-shadow-[0_0_8px_#FFE15480] scale-90 md:scale-100 object-contain"
        />
      ) : (
        <span className="text-2xl md:text-3xl scale-80 leading-tight pointer-events-none">
          {emoji}
        </span>
      )}

      {/* Hover pill – DAO Yellow bg when SVG, black when emoji */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`
              absolute -top-20 left-1/2 -translate-x-1/2 z-[100]
              ${bgColor} ${borderColor} rounded-full
              px-5 py-2 text-sm font-medium ${textColor} whitespace-nowrap
              shadow-2xl ${shadowColor} pointer-events-none
            `}
          >
            {svg ? (
              <Image
                src={`/${svg}`}
                alt={tag}
                width={20}
                height={20}
                className="inline-block mr-2 align-middle drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
              />
            ) : (
              <span className="mr-1.5">{emoji}</span>
            )}
            {tag}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
