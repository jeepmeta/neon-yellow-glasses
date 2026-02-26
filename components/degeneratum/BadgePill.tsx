// components/degeneratum/BadgePill.tsx
"use client";

interface BadgePillProps {
  emoji?: string;
  tag: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function BadgePill({
  emoji = "❓",
  onHoverStart,
  onHoverEnd,
}: BadgePillProps) {
  return (
    <div
      className="
        relative flex items-center justify-center shrink-0
        w-10 h-10 md:w-12 md:h-12 rounded-full
        bg-black/60 border border-[#FFE154]/40
        hover:border-[#FFE154]/90 hover:bg-[#FFE154]/10 hover:shadow-lg hover:shadow-[#FFE154]/90
        hover:scale-110 transition-all duration-300 ease-out
        cursor-default select-none overflow-visible
        "
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <span className="text-xl md:text-2xl scale-75 md:scale-80 leading-tight pointer-events-none">
        {emoji}
      </span>
    </div>
  );
}
