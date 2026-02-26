// components/degeneratum/CrewModalOverlay.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import ClientCrewDetail from "@/app/crew/[handle]/ClientCrewDetail";
import type { UICrewMember } from "@/lib/crew/model";

interface Props {
  member: UICrewMember;
}

export function CrewModalOverlay({ member }: Props) {
  const router = useRouter();
  const scrollYRef = useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo({
        top: scrollYRef.current,
        behavior: "instant",
      });
    };
  }, []);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-8"
      onClick={handleBackdropClick}
    >
      <div
        className="
          relative w-full max-w-[min(520px,100%)]
          md:max-w-[min(800px,90vw)]
          lg:max-w-[min(1000px,85vw)]
          mx-auto
          overflow-visible
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* BACK button – moved higher + more mobile-safe */}
        <button
          onClick={() => router.back()}
          className="
            absolute -top-6 sm:-top-6 right-0 sm:right-4
            px-5 py-2.5
            bg-black/90 border-2 border-[#FFE154]/50
            rounded-full text-[#FFE154] font-black text-base sm:text-xl
            uppercase tracking-tight
            hover:bg-[#FFE154]/10 hover:border-[#FFE154]/70
            transition-all shadow-md z-50
          "
        >
          ← BACK
        </button>

        {/* Card wrapper – forces centering + better scaling */}
        <div className="flex justify-center">
          <ClientCrewDetail member={member} isModal={true} />
        </div>
      </div>
    </div>
  );
}
