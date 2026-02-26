import type { CrewMember } from "./model";
import type { UICrewMember } from "./model";

export function toUICrew(member: CrewMember): UICrewMember {
  const isZippo = Boolean(
    member.lighter_zippo_closed || member.lighter_zippo_open,
  );
  const isBic = Boolean(member.lighter_bic);

  // Build socials map
  const socials: Record<string, string> = {};
  if (member.x_handle) socials.x = member.x_handle;
  if (member.instagram_handle) socials.instagram = member.instagram_handle;
  if (member.youtube_handle) socials.youtube = member.youtube_handle;
  if (member.tiktok_handle) socials.tiktok = member.tiktok_handle;
  if (member.twitch_handle) socials.twitch = member.twitch_handle;
  if (member.kick_handle) socials.kick = member.kick_handle;
  if (member.reddit_handle) socials.reddit = member.reddit_handle;
  if (member.github_handle) socials.github = member.github_handle;
  if (member.telegram_handle) socials.telegram = member.telegram_handle;
  if (member.discord_handle) socials.discord = member.discord_handle;

  // Parse tags
  let parsedTags: string[] = [];
  if (member.tags) {
    if (Array.isArray(member.tags)) {
      parsedTags = member.tags
        .filter((t): t is string => typeof t === "string" && !!t.trim())
        .map((t) => t.trim());
    } else if (typeof member.tags === "string") {
      try {
        const parsed = JSON.parse(member.tags.trim());
        if (Array.isArray(parsed)) {
          parsedTags = parsed
            .filter((t): t is string => typeof t === "string" && !!t.trim())
            .map((t) => t.trim());
        }
      } catch (e) {
        console.warn(
          `Tags JSON parse failed for ${member.handle}:`,
          member.tags,
          e,
        );
      }
    }
  }

  return {
    ...member,
    isZippo,
    isBic,
    lighterFrames: member.lighter_zippo_frames ?? [],
    socials,
    parsedTags,
  };
}

export function toUICrewList(members: CrewMember[]): UICrewMember[] {
  return members.map(toUICrew);
}
