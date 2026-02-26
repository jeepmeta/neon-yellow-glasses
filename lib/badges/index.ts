// lib/badges/index.ts
// SINGLE SOURCE OF TRUTH – badge metadata v1.1 – yellow-black domination edition

export type BadgeCategory = "role" | "time" | "content" | "special" | "future";

export interface BadgeMeta {
  category: BadgeCategory;
  emoji?: string;
  color?: string; // future: per-badge glow color if we want overrides
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
  svg?: string; // path fragment → `/badges/${svg}.svg` or `/svg/${svg}.svg`
}

// We use the key as tag → no duplication
export const badgeRegistry: Record<string, BadgeMeta> = {
  // ── ROLE ────────────────────────────────────────────────
  "space-host": { category: "role", emoji: "🎤" },
  "gm-grinder": { category: "role", emoji: "☕" },
  "alpha-caller": { category: "role", emoji: "📣" },
  "raid-lieutenant": { category: "role", emoji: "⚔️" },
  "defense-king": { category: "role", emoji: "🛡️" },
  "core-founder": { category: "role", emoji: "👑" },
  "code-sniper": { category: "role", emoji: "💻" },
  "network-godfather": { category: "role", emoji: "🤝" },
  "onboarding-glue": { category: "role", emoji: "🧲" },
  "society-genius": { category: "role", emoji: "🤯" },

  // ── TIME ────────────────────────────────────────────────
  "dawn-patrol": { category: "time", emoji: "🌅" },
  "morning-raid": { category: "time", emoji: "⚡" },
  "daytime-alpha": { category: "time", emoji: "☀️" },
  "prime-time": { category: "time", emoji: "🌆" },
  "evening-vibes": { category: "time", emoji: "🍻" },
  "night-owl": { category: "time", emoji: "🦉" },
  "graveyard-shift": { category: "time", emoji: "⚰️" },
  "timezone-hopper": { category: "time", emoji: "🛫" },

  // ── CONTENT ─────────────────────────────────────────────
  "news-nukes": { category: "content", emoji: "💣" },
  "alpha-drops": { category: "content", emoji: "💧" },
  "loud-chaos": { category: "content", emoji: "📢" },
  "mindset-redpill": { category: "content", emoji: "💊" },
  "spiritual-portal": { category: "content", emoji: "🌀" },
  "brand-growth": { category: "content", emoji: "🌱" },
  "gaming-guru": { category: "content", emoji: "🎮" },
  "culture-roast": { category: "content", emoji: "🔥" },
  "art-pixel": { category: "content", emoji: "🎨" },
  "market-ta": { category: "content", emoji: "📊" },
  "technical-sniper": { category: "content", emoji: "🎯" },

  // ── SPECIAL ─────────────────────────────────────────────
  "ai-hybrid": { category: "special", emoji: "🤖" },
  "legendary-builder": { category: "special", emoji: "🛠️" },
  "csn-host": { category: "special", emoji: "🎙️", svg: "csn" },
  "The-789": { category: "special", emoji: "👻", svg: "789-b" },
  "y-dao": { category: "special", emoji: "🐉", svg: "ydao" },

  // ── FUTURE ──────────────────────────────────────────────
  "oracle-chaos": { category: "future", emoji: "🔮" },
  "pixel-savage": { category: "future", emoji: "🖼️" },
  "signal-one": { category: "future", emoji: "📡" },
} as const; // ← makes keys literal types → better autocomplete

// ── Exports ─────────────────────────────────────────────────
export type Tag = keyof typeof badgeRegistry;

export const allTags = Object.keys(badgeRegistry) as Tag[];

// Optional: category helpers if you need them later
export const badgesByCategory = {
  role: allTags.filter((t) => badgeRegistry[t].category === "role"),
  time: allTags.filter((t) => badgeRegistry[t].category === "time"),
  content: allTags.filter((t) => badgeRegistry[t].category === "content"),
  special: allTags.filter((t) => badgeRegistry[t].category === "special"),
  future: allTags.filter((t) => badgeRegistry[t].category === "future"),
} as const;
