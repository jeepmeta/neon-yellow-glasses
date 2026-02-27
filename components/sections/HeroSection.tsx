"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const images = [
  "images/789/789csn.webp",
  "crew/Gary.webp",
  "crew/Paws.webp",
  "crew/Armor.webp",
  "images/doginaldogs-CSN/doginaldogs.webp",
  "crew/Vibes.webp",
  "images/doginaldogs-CSN/x.webp",
  "images/doginaldogs-CSN/csn.webp",
  "crew/Anthem.webp",
  "crew/Bark.webp",
  "crew/Artsy.webp",
  "crew/Sauce.webp",
  "crew/Gator.webp",
  "images/789/789csn.webp",
  "crew/Neuro.webp",
  "crew/Artsy.webp",
  "images/projects/ydao.webp",
  "crew/Gary.webp",
  "images/789/789csn.webp",
  "crew/Grami.webp",
  "crew/Leah.webp",
  "crew/Wooki.webp",
  "images/projects/ydao.webp",
  "crew/Jeep.webp",
  "images/doginaldogs-CSN/doginaldogs.webp",
  "crew/Gary.webp",
  "crew/Shield.webp",
  "crew/Truck.webp",
  "crew/Shibo.webp",
  "images/doginaldogs-CSN/csn.webp",
  "crew/Gary.webp",
];

export default function HeroMarq() {
  return (
    <div
      className="
        w-full max-w-7xl mx-auto
        rounded-3xl bg-transparent
        p-4 sm:p-6 lg:p-8 xl:p-12
        ring-1 ring-[#FFE154]/15
        flex items-center justify-center
        min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]
        max-h-[75vh] overflow-hidden
      "
    >
      <ThreeDMarquee images={images} />
    </div>
  );
}
