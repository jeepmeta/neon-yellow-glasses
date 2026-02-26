// lib/crew/model.ts

export interface CrewMember {
  id: string;
  name: string;
  handle: string;
  pfp: string;
  daos?: string[];
  role?: string;

  bio: string | null;
  space_title: string | null;
  space_description: string | null;
  space_start_time: string | null;
  space_end_time: string | null;

  lighter_bic: string | null;
  lighter_zippo_closed: string | null;
  lighter_zippo_open: string | null;
  lighter_zippo_frames: string[] | null;

  is_active_host: boolean | null;

  x_handle: string | null;
  instagram_handle: string | null;
  youtube_handle: string | null;
  tiktok_handle: string | null;
  twitch_handle: string | null;
  kick_handle: string | null;
  reddit_handle: string | null;
  github_handle: string | null;
  telegram_handle: string | null;
  discord_handle: string | null;

  custom_badges: string[] | null;

  tags: string | null; // ← Supabase text column with JSON array string
}

export interface UICrewMember extends CrewMember {
  socials: Record<string, string>;
  parsedTags: string[]; // ← clean array for rendering badges/emojis
  isZippo?: boolean;
  isBic?: boolean;
  lighterFrames?: string[];
}

export function toUICrew(db: CrewMember): UICrewMember {
  const socials: Record<string, string> = {};

  if (db.x_handle) socials.x = db.x_handle;
  if (db.instagram_handle) socials.instagram = db.instagram_handle;
  if (db.youtube_handle) socials.youtube = db.youtube_handle;
  if (db.tiktok_handle) socials.tiktok = db.tiktok_handle;
  if (db.twitch_handle) socials.twitch = db.twitch_handle;
  if (db.kick_handle) socials.kick = db.kick_handle;
  if (db.reddit_handle) socials.reddit = db.reddit_handle;
  if (db.github_handle) socials.github = db.github_handle;
  if (db.telegram_handle) socials.telegram = db.telegram_handle;
  if (db.discord_handle) socials.discord = db.discord_handle;

  console.log(`[toUICrew] ${db.handle} - raw tags column:`, db.tags);
  console.log(`[toUICrew] ${db.handle} - type of tags:`, typeof db.tags);

  // Parse tags – handle Supabase array column OR JSON string fallback
  let parsedTags: string[] = [];

  if (db.tags) {
    if (Array.isArray(db.tags)) {
      parsedTags = db.tags
        .filter((t): t is string => typeof t === "string" && !!t.trim())
        .map((t) => t.trim());
    } else if (typeof db.tags === "string") {
      try {
        const parsed = JSON.parse(db.tags.trim());
        if (Array.isArray(parsed)) {
          parsedTags = parsed
            .filter((t): t is string => typeof t === "string" && !!t.trim())
            .map((t) => t.trim());
        }
      } catch (e) {
        console.warn(`Tags JSON parse failed for ${db.handle}:`, db.tags, e);
      }
    }
  }

  console.log(`[toUICrew] ${db.handle} → parsedTags (final):`, parsedTags);

  return {
    ...db,
    socials,
    parsedTags,
  };
}
