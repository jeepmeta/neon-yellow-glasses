// lib/keys/groups.ts
// Internal crew groups, raid teams, squads, etc.

export const GROUP_KEYS = [
  'raid-team',
  'alpha-crew',
  'growth-squad',
  'mod-team',
  'community',
] as const;

export type GroupKey = typeof GROUP_KEYS[number];

export const GROUP_PENDING: string[] = [];
