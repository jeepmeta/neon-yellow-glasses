// lib/admin/adminAuth.ts

'use server';

import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

type AdminRecord = {
  dao: string;
  username: string;
  passwordHash: string;
};

// Load from env or config file
const ADMINS: AdminRecord[] = [
  {
    dao: 'The789',
    username: process.env.ADMIN_789_USER!,
    passwordHash: process.env.ADMIN_789_PASSHASH!,
  },
  {
    dao: 'OTFMedia',
    username: process.env.ADMIN_OTF_USER!,
    passwordHash: process.env.ADMIN_OTF_PASSHASH!,
  },
  {
    dao: 'TypeMedia',
    username: process.env.ADMIN_TYPE_USER!,
    passwordHash: process.env.ADMIN_TYPE_PASSHASH!,
  },
  {
    dao: 'CryptoSpacesNetwork',
    username: process.env.ADMIN_CSN_USER!,
    passwordHash: process.env.ADMIN_CSN_PASSHASH!,
  },
];

export type AdminSession = {
  id: string;
  dao: string;
  username: string;
  createdAt: number;
};

const SESSIONS = new Map<string, AdminSession>();

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<AdminSession | null> {
  const admin = ADMINS.find(a => a.username === username);
  if (!admin) return null;

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return null;

  const session: AdminSession = {
    id: randomUUID(),
    dao: admin.dao,
    username: admin.username,
    createdAt: Date.now(),
  };

  SESSIONS.set(session.id, session);
  return session;
}

export async function getSession(sessionId: string | undefined): Promise<AdminSession | null> {
  if (!sessionId) return null;
  return SESSIONS.get(sessionId) || null;
}

export async function requireDAO(session: AdminSession | null, dao: string): Promise<boolean> {
  return !!session && session.dao === dao;
}

export async function logout(sessionId: string) {
  SESSIONS.delete(sessionId);
}
