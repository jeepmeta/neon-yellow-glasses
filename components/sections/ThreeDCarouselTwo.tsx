// components/ui/3d-carousel.tsx (or wherever you wanna drop it)
"use client";

import React, { useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

/* 1️⃣ Assets ————————————————————————— */
const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ' +
  'width="160" height="220"><rect width="100%" height="100%" ' +
  'fill="%23000000"/><text x="50%" y="50%" dominant-baseline="middle"' +
  ' text-anchor="middle" fill="%23FFE154" font-size="18">789</text></svg>'; // yellow-black branded fallback

const DEFAULT_IMAGES = [
  "/ddVegas/dd7.webp",
  "/ddVegas/dd8.webp",
  "/ddVegas/dd9.webp",
  "/ddVegas/dd10.webp",
  "/ddVegas/dd11.webp",
  "/ddVegas/dd12.webp",
];

/* 2️⃣ Config ————————————————————————— */
const CARD_W = 200;
const CARD_H = 200;
const RADIUS = 210;
const TILT_SENSITIVITY = 0.6;
const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.08;
const IDLE_TIMEOUT = 2000;

/* 3️⃣ Card Component (Memoized) ——— */
interface CardProps {
  src: string;
  transform: string;
  cardW: number;
  cardH: number;
  index: number; // for priority on first cards
}
const Card = React.memo(
  ({ src, transform, cardW, cardH, index }: CardProps) => (
    <div
      className="absolute"
      style={{
        width: cardW,
        height: cardH,
        transform,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden bg-transparent border border-[#FFE154]/30 shadow-lg shadow-black/50
                 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_#FFE154/40] hover:z-10"
        style={{ backfaceVisibility: "hidden" }}
      >
        <Image
          src={src}
          alt="Carousel crew shot"
          width={cardW}
          height={cardH}
          className="w-full h-full object-cover"
          quality={75} // balance quality vs speed
          priority={index < 3} // preload first 3 visible cards
          placeholder="blur"
          blurDataURL={FALLBACK} // instant blur placeholder
          onError={(e) => {
            e.currentTarget.src = FALLBACK;
          }}
          draggable={false}
        />
      </div>
    </div>
  ),
);
Card.displayName = "Card";

/* 4️⃣ Main Carousel —————————————————— */
interface ThreeDCarouselProps {
  images?: string[];
  radius?: number;
  cardW?: number;
  cardH?: number;
}
const ThreeDCarouselTwo = React.memo(
  ({
    images = DEFAULT_IMAGES,
    radius = RADIUS,
    cardW = CARD_W,
    cardH = CARD_H,
  }: ThreeDCarouselProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);
    const tiltRef = useRef(0);
    const targetTiltRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef(0);
    const initialRotationRef = useRef(0);
    const lastInteractionRef = useRef(Date.now());
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!parentRef.current || isDraggingRef.current) return;
        lastInteractionRef.current = Date.now();
        const parentRect = parentRef.current.getBoundingClientRect();
        const mouseY = e.clientY - parentRect.top;
        const normalizedY = (mouseY / parentRect.height - 0.5) * 2;
        targetTiltRef.current = -normalizedY * TILT_SENSITIVITY;
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
      const animate = () => {
        if (!isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 0.01) {
            rotationRef.current += velocityRef.current;
            velocityRef.current *= INERTIA_FRICTION;
          } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
            rotationRef.current += AUTOSPIN_SPEED;
          }
        }
        tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;

        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
      };
    }, []);

    const handleDragStart = useCallback((clientX: number) => {
      lastInteractionRef.current = Date.now();
      isDraggingRef.current = true;
      velocityRef.current = 0;
      dragStartRef.current = clientX;
      initialRotationRef.current = rotationRef.current;
    }, []);

    const handleDragMove = useCallback((clientX: number) => {
      if (!isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();
      const deltaX = clientX - dragStartRef.current;
      const newRotation =
        initialRotationRef.current + deltaX * DRAG_SENSITIVITY;
      velocityRef.current = newRotation - rotationRef.current;
      rotationRef.current = newRotation;
    }, []);

    const handleDragEnd = useCallback(() => {
      isDraggingRef.current = false;
      lastInteractionRef.current = Date.now();
    }, []);

    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onTouchStart = (e: React.TouchEvent) =>
      handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) =>
      handleDragMove(e.touches[0].clientX);

    const cards = useMemo(
      () =>
        images.map((src, idx) => ({
          key: idx,
          src,
          transform: `rotateY(${(idx * 360) / images.length}deg) translateZ(${radius}px)`,
          index: idx,
        })),
      [images, radius],
    );

    return (
      <div
        ref={parentRef}
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative"
          style={{
            perspective: 1500,
            perspectiveOrigin: "center",
            width: Math.max(cardW * 1.5, radius * 2.2),
            height: Math.max(cardH * 1.8, radius * 1.5),
          }}
        >
          <div
            ref={wheelRef}
            className="relative"
            style={{
              width: cardW,
              height: cardH,
              transformStyle: "preserve-3d",
              willChange: "transform",
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -cardW / 2,
              marginTop: -cardH / 2,
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.key}
                src={card.src}
                transform={card.transform}
                cardW={cardW}
                cardH={cardH}
                index={card.index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
ThreeDCarouselTwo.displayName = "ThreeDCarouselTwo";

export default ThreeDCarouselTwo;
