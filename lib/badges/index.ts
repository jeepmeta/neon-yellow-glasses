// lib/badges/index.ts
// SINGLE SOURCE OF TRUTH – badge metadata v1.1 – yellow domination

export type BadgeCategory = "role" | "time" | "content" | "special" | "future";

export interface BadgeMeta {
  tag: string;
  category: BadgeCategory;
  emoji?: string;
  color?: string; // future override
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
  svg?: string; // fragment → /badges/${svg}.svg or /svg/${svg}.svg (no extension)
}

export const badgeRegistry: Record<string, BadgeMeta> = {
  // ── ROLE ────────────────────────────────────────────────
  "space-host": { tag: "space-host", category: "role", emoji: "🎤", svg: "" },
  "gm-grinder": { tag: "gm-grinder", category: "role", emoji: "☕", svg: "" },
  "alpha-caller": {
    tag: "alpha-caller",
    category: "role",
    emoji: "📣",
    svg: "",
  },
  "raid-lieutenant": {
    tag: "raid-lieutenant",
    category: "role",
    emoji: "⚔️",
    svg: "",
  },
  "defense-king": {
    tag: "defense-king",
    category: "role",
    emoji: "🛡️",
    svg: "",
  },
  "core-founder": {
    tag: "core-founder",
    category: "role",
    emoji: "👑",
    svg: "",
  },
  "code-sniper": { tag: "code-sniper", category: "role", emoji: "💻", svg: "" },
  "network-godfather": {
    tag: "network-godfather",
    category: "role",
    emoji: "🤝",
    svg: "",
  },
  "onboarding-glue": {
    tag: "onboarding-glue",
    category: "role",
    emoji: "🧲",
    svg: "",
  },
  "society-genius": {
    tag: "society-genius",
    category: "role",
    emoji: "🤯",
    svg: "",
  },

  // ── TIME ────────────────────────────────────────────────
  "dawn-patrol": { tag: "dawn-patrol", category: "time", emoji: "🌅", svg: "" },
  "morning-raid": {
    tag: "morning-raid",
    category: "time",
    emoji: "⚡",
    svg: "",
  },
  "daytime-alpha": {
    tag: "daytime-alpha",
    category: "time",
    emoji: "☀️",
    svg: "",
  },
  "prime-time": { tag: "prime-time", category: "time", emoji: "🌆", svg: "" },
  "evening-vibes": {
    tag: "evening-vibes",
    category: "time",
    emoji: "🍻",
    svg: "",
  },
  "night-owl": { tag: "night-owl", category: "time", emoji: "🦉", svg: "" },
  "graveyard-shift": {
    tag: "graveyard-shift",
    category: "time",
    emoji: "⚰️",
    svg: "",
  },
  "timezone-hopper": {
    tag: "timezone-hopper",
    category: "time",
    emoji: "🛫",
    svg: "",
  },

  // ── CONTENT ─────────────────────────────────────────────
  "news-nukes": {
    tag: "news-nukes",
    category: "content",
    emoji: "💣",
    svg: "",
  },
  "alpha-drops": {
    tag: "alpha-drops",
    category: "content",
    emoji: "💧",
    svg: "",
  },
  "loud-chaos": {
    tag: "loud-chaos",
    category: "content",
    emoji: "📢",
    svg: "",
  },
  "mindset-redpill": {
    tag: "mindset-redpill",
    category: "content",
    emoji: "💊",
    svg: "",
  },
  "spiritual-portal": {
    tag: "spiritual-portal",
    category: "content",
    emoji: "🌀",
    svg: "",
  },
  "brand-growth": {
    tag: "brand-growth",
    category: "content",
    emoji: "🌱",
    svg: "",
  },
  gaming: { tag: "gaming", category: "content", emoji: "🎮", svg: "" },
  "culture-roast": {
    tag: "culture-roast",
    category: "content",
    emoji: "🔥",
    svg: "",
  },
  "art-pixel": { tag: "art-pixel", category: "content", emoji: "🎨", svg: "" },
  "market-ta": { tag: "market-ta", category: "content", emoji: "📊", svg: "" },
  "technical-sniper": {
    tag: "technical-sniper",
    category: "content",
    emoji: "🎯",
    svg: "",
  },

  // ── SPECIAL ─────────────────────────────────────────────
  "ai-hybrid": { tag: "ai-hybrid", category: "special", emoji: "🤖", svg: "" },
  "legendary-builder": {
    tag: "legendary-builder",
    category: "special",
    emoji: "🛠️",
    svg: "",
  },
  "csn-host": {
    tag: "csn-host",
    category: "special",
    emoji: "🎙️",
    svg: "",
  },
  "The-789": {
    tag: "The-789",
    category: "special",
    emoji: "👻",
    svg: "",
  },
  "y-dao": {
    tag: "y-dao",
    category: "special",
    emoji: "🐉",
    svg: "",
  },

  // ── FUTURE ──────────────────────────────────────────────
  oracle: { tag: "oracle", category: "future", emoji: "🔮", svg: "" },
  "pixel-savage": {
    tag: "pixel-savage",
    category: "future",
    emoji: "🖼️",
    svg: "",
  },
  signal: { tag: "signal", category: "future", emoji: "📡", svg: "" },
};

export type Tag = keyof typeof badgeRegistry;
export const allTags = Object.keys(badgeRegistry) as Tag[];
