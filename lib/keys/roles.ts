// lib/keys/roles.ts
// Crew roles — flexible, expandable

export const ROLE_KEYS = [
  'host',
  'supporter',
  'dev',
  'oracle',
  'artist',
  'trader',
  'other',
] as const;

export type RoleKey = typeof ROLE_KEYS[number];

export const ROLE_DISPLAY: Record<RoleKey, string> = {
  host: 'Space Host',
  supporter: 'Shield',
  dev: 'Code Warlord',
  oracle: 'Signal',
  artist: 'Pixel Savage',
  trader: 'Alpha Sniper',
  other: 'Degen',
};

export const ROLE_PENDING: string[] = [];
