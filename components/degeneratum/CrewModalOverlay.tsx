// components/degeneratum/CrewModalOverlay.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import ClientCrewDetail from "@/app/crew/[handle]/ClientCrewDetail";

interface Props {
  member: never;
}

export function CrewModalOverlay({ member }: Props) {
  const router = useRouter();
  const scrollYRef = useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;

    document.body.style.overflow = "visible";
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
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-[520px] md:max-w-[800px] lg:max-w-[1000px] overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute -top-4 right-4 px-4 py-1 bg-black/90 border-2 border-[#FFE154]/50 rounded-full text-[#FFE154] font-black text-xl uppercase tracking-tight hover:bg-[#FFE154]/10 hover:border-[#FFE154]/70 transition-all"
        >
          ←
        </button>

        <ClientCrewDetail member={member} isModal={true} />
      </div>
    </div>
  );
}
