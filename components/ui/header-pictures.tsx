"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const FLIP_WORDS = ["DOGINAL DOGS", "DD VEGAS", "DD MIAMI", "DD WORLD"];

export function PicturesHeader() {
  const id = useId();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(300);
  const textRef = React.useRef<HTMLSpanElement>(null);

  const updateWidth = () => {
    if (textRef.current) {
      setWidth(textRef.current.scrollWidth + 60); // breathing room
    }
  };

  useEffect(() => {
    updateWidth();
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FLIP_WORDS.length);
    }, 3400);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
          relative 
          bg-transparent 
          overflow-visible
          pt-[clamp(4rem,10vw,12rem)]
          pb-2 md:pb-4 lg:pb-6
        "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          layout
          layoutId={`empire-header-${id}`}
          animate={{ width }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "inline-block font-black tracking-[-0.04em]",
            "text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
            "text-[#FFE154]",
            "leading-none drop-shadow-[0_0_20px_#FFE15480]",
            "whitespace-nowrap",
            "relative z-10",
          )}
        >
          <motion.span
            ref={textRef}
            key={FLIP_WORDS[currentIndex]}
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.04,
            }}
            className="inline-block whitespace-nowrap"
          >
            {FLIP_WORDS[currentIndex].split("").map((char, idx) => (
              <motion.span
                key={`${char}-${idx}-${currentIndex}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.03 + 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Underline glow pulse – still slaps */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
          className="h-1.5 bg-gradient-to-r from-transparent via-[#FFE154] to-transparent mx-auto mt-6 max-w-xs rounded-full"
        />
      </div>
    </section>
  );
}
