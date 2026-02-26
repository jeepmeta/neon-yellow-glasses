"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  {
    href: "https://x.com/789studiosonx",
    src: "/images/doginaldogs-csn/x2.webp",
    alt: "X",
  },
  { href: "https://yellowdao.xyz", src: "/images/789/ydao2.webp", alt: "YDAO" },
  {
    href: "https://doginaldogs.com",
    src: "/images/doginaldogs-csn/doginaldogs2.webp",
    alt: "DD",
  },
  {
    href: "https://cryptospaces.net",
    src: "/images/doginaldogs-csn/csn2.webp",
    alt: "CSN",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#FFE154] border-t-4 border-black py-10 px-6 text-black">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-10">
        {/* Brand left */}
        <div className="space-y-3 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            789 STUDIOS
          </h2>
          <p className="text-xl sm:text-2xl font-bold">
            Cartoons. Chaos. Crypto.
          </p>
          <p className="text-3xl sm:text-4xl font-black">
            Yellow goes{" "}
            <motion.span
              className="inline-block px-3 py-1 bg-black text-[#FFE154] rounded-lg font-black text-4xl sm:text-5xl shadow-[0_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-shadow duration-150"
              animate={{
                y: [
                  0, -0.6, 0.6, -0.6, 0.6, -0.6, 0.6, -0.6, 0.6, -0.6, 0.6,
                  -0.6, 0.6, 0,
                ],
                rotate: [
                  0, -0.4, 0.4, -0.4, 0.4, -0.4, 0.4, -0.4, 0.4, -0.4, 0.4,
                  -0.4, 0.4, 0,
                ],
              }}
              transition={{
                duration: 1.2,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              brrrr
            </motion.span>
          </p>
        </div>

        {/* Links + copyright right/center mobile */}
        <div className="flex flex-col items-center sm:items-end gap-4">
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
            {links.map(({ href, src, alt }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-2 active:scale-90 active:rotate-0"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={56}
                  height={56}
                  className="w-14 h-14 sm:w-14 sm:h-14 md:w-18 md:h-18 transition-shadow duration-300"
                  priority
                />
              </a>
            ))}
          </div>

          <div className="text-center sm:text-right">
            <p className="text-sm font-black tracking-wide leading-none">
              © 789 STUDIOS
            </p>
            <p className="text-sm font-black tracking-wide leading-none">
              ALL CHAOS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
