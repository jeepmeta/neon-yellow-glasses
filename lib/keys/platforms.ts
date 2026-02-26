// lib/keys/platforms.ts
// Controlled vocabulary for social + streaming platforms

export const PLATFORM_KEYS = [
  'x',
  'youtube',
  'twitch',
  'kick',
  'tiktok',
  'instagram',
  'discord',
  'telegram',
  'lens',
  'farcaster',
] as const;

export type PlatformKey = typeof PLATFORM_KEYS[number];

// Optional metadata for UI
export const PLATFORM_META: Record<PlatformKey, { icon: string; color: string }> = {
  x: { icon: 'x', color: '#ffffff' },
  youtube: { icon: 'youtube', color: '#ff0000' },
  twitch: { icon: 'twitch', color: '#9146ff' },
  kick: { icon: 'kick', color: '#53fc18' },
  tiktok: { icon: 'tiktok', color: '#000000' },
  instagram: { icon: 'instagram', color: '#e1306c' },
  discord: { icon: 'discord', color: '#5865f2' },
  telegram: { icon: 'telegram', color: '#0088cc' },
  lens: { icon: 'lens', color: '#abfe2c' },
  farcaster: { icon: 'farcaster', color: '#8c52ff' },
};

// Pending submissions from DAO admins
export const PLATFORM_PENDING: string[] = [];
