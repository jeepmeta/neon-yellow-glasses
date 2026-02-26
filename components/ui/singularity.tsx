// components/ui/singularity.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href: string;
};

export default function Singularity() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const menuItems: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Live Spaces", href: "#live-spaces" },
    { label: "HotTakes", href: "#hot-takes" },
    { label: "789 and DD", href: "#dd-events" },
    { label: "Crew", href: "#crew" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (
        buttonRef.current?.contains(event.target as Node) ||
        document
          .querySelector(".singularity-menu")
          ?.contains(event.target as Node)
      ) {
        return; // safe click inside dot or menu
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen]);

  // Smooth hide/reveal on scroll
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (currentY > lastScrollY.current && currentY > 200) {
          setIsVisible(false);
        } else if (currentY < lastScrollY.current) {
          setIsVisible(true);
        }

        lastScrollY.current = currentY;
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 3.2, ease: "easeOut" }}
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-[9999] flex flex-col items-start pointer-events-auto"
    >
      <motion.div
        animate={{
          translateY: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0.3,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
      >
        {/* Yellow dot */}
        <motion.button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#FFE154]",
            "flex items-center justify-center border-2 border-black/40 overflow-hidden",
            "shadow-none hover:shadow-none transition-none pointer-events-auto",
          )}
          animate={{
            scale: shouldReduceMotion ? 1 : [1, 1.08, 1],
            rotate: shouldReduceMotion ? 0 : [0, 3, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 11,
            ease: "easeOut",
            times: [0, 0.3, 1],
          }}
          whileHover={{ scale: 1.12, rotate: 8 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? -360 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-14 h-14 sm:w-16 sm:h-16"
          >
            <Image
              src="/svg/789-b.svg"
              alt="789 Studios"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.button>

        {/* Menu */}
        <LazyMotion features={domAnimation}>
          {isOpen && (
            <motion.div
              className="mt-4 flex flex-col gap-3 items-start pointer-events-auto max-w-[90vw] singularity-menu"
              initial={{ opacity: 0, scale: 0.8, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -15 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.25,
                ease: "easeOut",
              }}
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (item.href === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        const target = document.querySelector(item.href);
                        if (target) {
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-center px-6 py-3.5 rounded-full bg-black/90 backdrop-blur-md",
                      "border border-[#FFE154]/40 text-[#FFE154] font-bold shadow-md",
                      "hover:bg-[#FFE154] hover:text-black hover:border-black hover:shadow-[0_0_20px_#FFE154/50]",
                      "transition-all duration-300 text-sm sm:text-base min-w-[160px] sm:min-w-[200px] cursor-pointer w-full",
                    )}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </LazyMotion>
      </motion.div>
    </motion.div>
  );
}
