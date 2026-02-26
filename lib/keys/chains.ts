// lib/keys/chains.ts
// Supported blockchain networks

export const CHAIN_KEYS = [
  'solana',
  'ethereum',
  'bitcoin',
  'dogecoin',
  'base',
  'arbitrum',
  'polygon',
  'xrp',
  'other',
] as const;

export type ChainKey = typeof CHAIN_KEYS[number];

export const CHAIN_META: Record<ChainKey, { color: string }> = {
  solana: { color: '#00FFA3' },
  ethereum: { color: '#627EEA' },
  bitcoin: { color: '#F7931A' },
  dogecoin: { color: '#C2A633' },
  base: { color: '#0052FF' },
  arbitrum: { color: '#28A0F0' },
  polygon: { color: '#8247E5' },
  xrp: { color: '#000000' },
  other: { color: '#FFE154' },
};

export const CHAIN_PENDING: string[] = [];
