// lib/keys/badges.ts
// Badge registry — used by badgeUtils + admin UI

export const BADGE_KEYS = [
  'space-host',
  'dawn-patrol',
  'mindset-redpill',
  'mystic-cosmic',
  'philosophy',
  'gm-grinder',
  'morning-raid',
  'news-nukes',
  'chill-coffee',
  'reply-lord',
  'daytime-alpha',
  'alpha-drops',
  'loud-chaos',
  'alpha-caller',
] as const;

export type BadgeKey = typeof BADGE_KEYS[number];

export const BADGE_PENDING: string[] = [];
