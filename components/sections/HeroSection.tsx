"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const images = [
  "images/789/789csn.avif",
  "crew/Gary.avif",
  "crew/Paws.avif",
  "crew/Armor.avif",
  "images/doginaldogs-CSN/doginaldogs.avif",
  "crew/Vibes.avif",
  "images/doginaldogs-CSN/x.avif",
  "images/doginaldogs-CSN/csn.avif",
  "crew/Anthem.avif",
  "crew/Bark.avif",
  "crew/Artsy.avif",
  "crew/Sauce.avif",
  "crew/Gator.avif",
  "images/789/789csn.avif",
  "crew/Neuro.avif",
  "crew/Artsy.avif",
  "images/projects/ydao.avif",
  "crew/Gary.avif",
  "images/789/789csn.avif",
  "crew/Grami.avif",
  "crew/Leah.avif",
  "crew/Wooki.avif",
  "images/projects/ydao.avif",
  "crew/Jeep.avif",
  "images/doginaldogs-CSN/doginaldogs.avif",
  "crew/Gary.avif",
  "crew/Shield.avif",
  "crew/Truck.avif",
  "crew/Shibo.avif",
  "images/doginaldogs-CSN/csn.avif",
  "crew/Gary.avif",
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
