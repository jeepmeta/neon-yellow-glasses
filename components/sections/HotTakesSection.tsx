"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { hotTakeCards } from "@/lib/projects";

export default function HotTakesSection() {
  const [active, setActive] = useState<(typeof hotTakeCards)[number] | null>(
    null,
  );
  const id = useId();
  const modalRef = useRef<HTMLDivElement>(null);

  // 3D tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });

  // Enable tilt after delay
  const [tiltEnabled, setTiltEnabled] = useState(false);

  // Smooth inertia loop (lerp)
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

  // Cursor tracking for tilt
  useEffect(() => {
    if (!active) return;

    const handleMove = (e: MouseEvent) => {
      if (!tiltEnabled) return;
      if (window.innerWidth < 768) return;
      if (!modalRef.current) return;

      const rect = modalRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      targetTilt.current = {
        x: -(deltaY * 0.05),
        y: deltaX * 0.05,
      };
    };

    const handleLeave = () => {
      targetTilt.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [active, tiltEnabled]);

  // ESC key + body scroll lock
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Delay tilt activation by 0.5s after modal opens
  useEffect(() => {
    if (active) {
      setTiltEnabled(false);
      const t = setTimeout(() => setTiltEnabled(true), 1000);
      return () => clearTimeout(t);
    } else {
      setTiltEnabled(false);
    }
  }, [active]);

  // Click outside modal
  useOutsideClick(modalRef, () => setActive(null));

  return (
    <section className="py-10 px-6 bg-transparent relative">
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-2 bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Modal – fixed to fit like a card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overflow-hidden pointer-events-none">
            {/* Close button (mobile) */}
            <motion.button
              key={`close-${active.title}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-4 right-4 lg:hidden bg-white rounded-full h-8 w-8 flex items-center justify-center shadow pointer-events-auto"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            {/* Modal Card */}
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={modalRef}
              style={{
                transform:
                  tiltEnabled && window.innerWidth >= 768
                    ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : "none",
                maxHeight: "85vh",
              }}
              className="
                pointer-events-auto
                w-full max-w-[520px]
                bg-white dark:bg-neutral-900
                sm:rounded-3xl overflow-hidden
                flex flex-col
                transition-transform duration-150
                max-h-[90vh]
              "
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-64 sm:h-64 md:h-80 object-cover object-top"
                />
              </motion.div>

              <div className="flex-1 overflow-y-auto pr-2">
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-neutral-800 dark:text-neutral-200 text-lg"
                      >
                        {active.title}
                      </motion.h3>

                      <motion.p
                        layoutId={`tagline-${active.tagline}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm"
                      >
                        {active.tagline}
                      </motion.p>
                    </div>

                    <motion.a
                      layout
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                      text-neutral-700 dark:text-neutral-300
                      text-sm md:text-base
                    "
                  >
                    {active.content.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-4">
                        {para}
                      </p>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Staggered Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.3,
            },
          },
        }}
        className="
          mt-6
          w-full max-w-6xl mx-auto
          grid grid-cols-2 md:grid-cols-3
          gap-3 sm:gap-2 md:gap-3 lg:gap-4
          justify-items-center justify-center
        "
      >
        {hotTakeCards.map((card) => (
          <motion.div
            key={card.title}
            layoutId={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                },
              },
            }}
            whileHover={
              typeof window !== "undefined" && window.innerWidth >= 768
                ? {
                    y: -6,
                    scale: 1.03,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    },
                  }
                : {}
            }
            className="
              bg-white dark:bg-neutral-900
              rounded-xl overflow-hidden
              cursor-pointer
              shadow-md hover:shadow-xl
              transition-shadow
              p-2 sm:p-3 md:p-4
              flex flex-col gap-2 sm:gap-3
              w-full max-w-[min(100%,20rem)] mx-auto
            "
          >
            <motion.div layoutId={`image-${card.title}-${id}`}>
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-20 sm:h-28 md:h-48 object-cover rounded-lg"
              />
            </motion.div>

            <div className="text-center">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-bold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base md:text-lg"
              >
                {card.title}
              </motion.h3>

              <motion.p
                layoutId={`tagline-${card.tagline}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base mt-1"
              >
                {card.tagline}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-black dark:text-black"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);
