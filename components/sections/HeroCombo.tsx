"use client";

import { motion } from "motion/react";
import HeroMarq from "./HeroSection";
import AboutSection from "./AboutSection";

export default function HeroCombo() {
  return (
    <div
      className="
        relative bg-transparent h-screen
        grid
        grid-rows-[3fr_2fr]
        md:grid-rows-[3fr_1fr]
      "
    >
      {/* Hero – slow fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="flex items-center justify-center overflow-hidden"
      >
        <HeroMarq />
      </motion.div>

      <div className="overflow-hidden">
        <AboutSection />
      </div>
    </div>
  );
}
