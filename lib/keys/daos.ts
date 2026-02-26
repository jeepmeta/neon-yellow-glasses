// lib/keys/daos.ts
// DAOs that can appear on crew cards or schedules

export const DAO_KEYS = [
  "The789",
  "OTFMedia",
  "TypeMedia",
  "CryptoSpacesNetwork",
] as const;

export type DaoKey = (typeof DAO_KEYS)[number];

export const DAO_PENDING: string[] = [];
