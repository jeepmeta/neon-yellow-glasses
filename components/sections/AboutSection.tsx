"use client";

import { motion } from "framer-motion"; // ← fix the import (was wrong)
import { Cover } from "@/components/ui/cover";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.9,
      delayChildren: 0.9,
      staggerChildren: 0.22,
    },
  },
} as const; // ← this locks literals → Variants happy

const word = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const, // ← explicit literal (extra safety)
      stiffness: 260,
      damping: 18,
      mass: 0.6,
    },
  },
} as const; // ← same here

export default function AboutSection() {
  return (
    <section
      className="
        py-6 px-5
        sm:py-8 sm:px-6
        md:py-10 md:px-8
        bg-transparent
        text-center
        overflow-hidden
      "
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={container}
        className="
          text-5xl font-black tracking-tighter
          sm:text-5xl md:text-6xl lg:text-7xl
          text-[#FFE154]
          inline-flex flex-wrap justify-center gap-x-4 sm:gap-x-6
          gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-7
          leading-[1.1] sm:leading-[1.05]
          max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl lg:max-w-6xl mx-auto
          px-2 sm:px-4 md:px-0
        "
      >
        <motion.span variants={word}>CARTOONS.</motion.span>

        <motion.span variants={word}>
          <Cover>CHAOS.</Cover>
        </motion.span>

        <motion.span variants={word}>CRYPTO.</motion.span>
      </motion.div>
    </section>
  );
}
