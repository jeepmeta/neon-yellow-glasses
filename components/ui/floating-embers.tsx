// components/ui/floating-embers.tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function FloatingEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    interface Ember {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      fadeRate: number;
      life: number;
      rotation: number;
      depth: number; // 0-1, deeper = slower/smaller/fainter
    }

    const embers: Ember[] = [];
    const MAX_EMBERS = 40;

    for (let i = 0; i < MAX_EMBERS; i++) {
      embers.push(createEmber());
    }

    function createEmber(): Ember {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1 + depth * 5,
        vx: (Math.random() - 0.5) * (0.3 + depth * 0.6),
        vy: -(0.2 + depth * 0.8),
        alpha: 0.03 + depth * 0.14,
        fadeRate: 0.0003 + depth * 0.0009,
        life: Math.random() * 1800 + 900,
        rotation: Math.random() * Math.PI * 2,
        depth,
      };
    }

    let frame = 0;
    let lastScrollY = window.scrollY;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      embers.forEach((e, idx) => {
        // Base drift + wobble
        e.x += e.vx + Math.sin(frame * 0.012 + idx) * 0.35;
        e.y += e.vy + Math.cos(frame * 0.014 + idx) * 0.25;

        // SCROLL PARALLAX – deeper = less movement (3D layers)
        e.y += scrollDelta * (0.08 + e.depth * 0.25);

        if (e.x < 0 || e.x > w) e.vx *= -0.8;
        if (e.y < 0 || e.y > h) e.vy *= -0.8;

        e.alpha -= e.fadeRate;
        e.life--;
        e.rotation += 0.004;

        if (e.life <= 0 || e.alpha < 0.01) {
          Object.assign(e, createEmber());
        }

        ctx.save();
        ctx.globalAlpha = e.alpha;
        ctx.translate(e.x, e.y);
        ctx.rotate(e.rotation);

        ctx.fillStyle = "#FFE154";
        ctx.fillRect(-e.size / 2, -e.size / 2, e.size, e.size);

        ctx.restore();
      });

      if (Math.random() < 0.015 && embers.length < MAX_EMBERS + 8) {
        embers.push(createEmber());
      }

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-[-1]",
        "mix-blend-screen will-change-transform",
      )}
      aria-hidden="true"
    />
  );
}
