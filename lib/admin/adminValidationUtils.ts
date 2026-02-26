// lib/admin/adminValidationUtils.ts

'use server';

import type { CrewMember } from '@/lib/crew/crewTypes';

import { PLATFORM_KEYS } from '@/lib/keys/platforms';
import { ROLE_KEYS } from '@/lib/keys/roles';
import { GROUP_KEYS } from '@/lib/keys/groups';

type ValidationResult = {
  valid: boolean;
  errors: string[];
  cleaned: Partial<CrewMember>;
};

const isString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0;

const isValidTimeRange = (v: unknown): v is string => {
  if (!isString(v)) return false;
  return /^\d{2}:\d{2}-\d{2}:\d{2}$/.test(v);
};

const isValidHandle = (v: unknown): v is string =>
  isString(v) && /^@?[a-zA-Z0-9_]+$/.test(v);

export function validateCrewUpdate(
  incoming: any,
  daoScope: string
): ValidationResult {
  const errors: string[] = [];
  const cleaned: Partial<CrewMember> = {};

  if (!Array.isArray(incoming.daos) || !incoming.daos.includes(daoScope)) {
    errors.push('You are not authorized to edit this member.');
    return { valid: false, errors, cleaned: {} };
  }

  if (incoming.name !== undefined) {
    if (!isString(incoming.name)) errors.push('Invalid name.');
    else cleaned.name = incoming.name.trim();
  }

  if (incoming.handle !== undefined) {
    if (!isValidHandle(incoming.handle)) errors.push('Invalid handle format.');
    else cleaned.handle = incoming.handle.replace(/^@/, '');
  }

  if (incoming.bio !== undefined) {
    if (!isString(incoming.bio)) errors.push('Invalid bio.');
    else cleaned.bio = incoming.bio.trim();
  }

  if (incoming.role !== undefined) {
    if (!ROLE_KEYS.includes(incoming.role)) {
      errors.push(`Invalid role: ${incoming.role}`);
    } else {
      cleaned.role = incoming.role;
    }
  }

  if (incoming.tier !== undefined) {
    if (!isString(incoming.tier)) errors.push('Invalid tier.');
    else cleaned.tier = incoming.tier;
  }

  if (incoming.status !== undefined) {
    if (!isString(incoming.status)) errors.push('Invalid status.');
    else cleaned.status = incoming.status;
  }

  if (incoming.spaceTitle !== undefined) {
    if (!isString(incoming.spaceTitle)) errors.push('Invalid spaceTitle.');
    else cleaned.spaceTitle = incoming.spaceTitle.trim();
  }

  if (incoming.spaceDescription !== undefined) {
    if (!isString(incoming.spaceDescription)) errors.push('Invalid spaceDescription.');
    else cleaned.spaceDescription = incoming.spaceDescription.trim();
  }

  if (incoming.spaceTimeUTC !== undefined) {
    if (!isValidTimeRange(incoming.spaceTimeUTC)) {
      errors.push('Invalid spaceTimeUTC format. Expected HH:MM-HH:MM');
    } else {
      cleaned.spaceTimeUTC = incoming.spaceTimeUTC;
    }
  }

  if (incoming.spacePlatform !== undefined) {
    if (!PLATFORM_KEYS.includes(incoming.spacePlatform)) {
      errors.push(`Invalid spacePlatform: ${incoming.spacePlatform}`);
    } else {
      cleaned.spacePlatform = incoming.spacePlatform;
    }
  }

  if (incoming.spaceRecurring !== undefined) {
    if (typeof incoming.spaceRecurring !== 'boolean') {
      errors.push('spaceRecurring must be boolean.');
    } else {
      cleaned.spaceRecurring = incoming.spaceRecurring;
    }
  }

  if (incoming.socials !== undefined) {
    if (typeof incoming.socials !== 'object' || Array.isArray(incoming.socials)) {
      errors.push('Invalid socials object.');
    } else {
      const cleanedSocials: Record<string, string> = {};
      for (const [platform, handle] of Object.entries(incoming.socials)) {
        if (!PLATFORM_KEYS.includes(platform as any)) {
          errors.push(`Invalid social platform: ${platform}`);
          continue;
        }
        if (!isValidHandle(handle)) {
          errors.push(`Invalid handle for ${platform}.`);
          continue;
        }
        cleanedSocials[platform] = handle.replace(/^@/, '');
      }
      cleaned.socials = cleanedSocials;
    }
  }

  if (incoming.groups !== undefined) {
    if (!Array.isArray(incoming.groups)) {
      errors.push('groups must be an array.');
    } else {
      cleaned.groups = incoming.groups.filter((g: any) =>
        GROUP_KEYS.includes(g)
      );
    }
  }

  if (incoming.customBadges !== undefined) {
    if (!Array.isArray(incoming.customBadges)) {
      errors.push('customBadges must be an array.');
    } else {
      cleaned.customBadges = incoming.customBadges.map((b: any) => String(b));
    }
  }

  if (incoming.wallets !== undefined) {
    if (typeof incoming.wallets !== 'object' || Array.isArray(incoming.wallets)) {
      errors.push('wallets must be an object.');
    } else {
      const cleanedWallets: Record<string, string> = {};
      for (const [chain, addr] of Object.entries(incoming.wallets)) {
        if (!isString(addr)) {
          errors.push(`Invalid wallet address for ${chain}.`);
          continue;
        }
        cleanedWallets[chain] = addr.trim();
      }
      cleaned.wallets = cleanedWallets;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    cleaned,
  };
}
