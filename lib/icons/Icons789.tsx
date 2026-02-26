// lib/icons/Icons789.tsx

import { cn } from "@/lib/utils";

export const DAO_YELLOW = "#FFE154";

export const BRAND_COLORS: Record<string, string> = {
  x: "#000000",
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#000000",
  twitch: "#9146FF",
  kick: "#53FC18",
  reddit: "#FF4500",
  github: "#000000",
  telegram: "#26A5E4",
  discord: "#5865F2",
};

export const ICON_PATHS: Record<string, string> = {
  x: "/icons/x.svg",
  instagram: "/icons/instagram.svg",
  youtube: "/icons/youtube.svg",
  tiktok: "/icons/tiktok.svg",
  twitch: "/icons/twitch.svg",
  kick: "/icons/kick.svg",
  reddit: "/icons/reddit.svg",
  github: "/icons/github.svg",
  telegram: "/icons/telegram.svg",
  discord: "/icons/discord.svg",
};

export type Icon789Name = keyof typeof ICON_PATHS;

export function Icon789({
  name,
  variant = "dao",
  size = 32,
  className,
}: {
  name: Icon789Name;
  variant?: "dao" | "brand";
  size?: number;
  className?: string;
}) {
  const src = ICON_PATHS[name];
  const color =
    variant === "dao" ? DAO_YELLOW : BRAND_COLORS[name] || "#FFFFFF";

  return (
    <div
      className={cn("inline-block", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
