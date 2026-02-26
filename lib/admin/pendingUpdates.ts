// lib/admin/pendingUpdates.ts
"use server";

import fs from "fs";
import path from "path";

export type PendingUpdate = {
  id: string; // crew member id
  dao: string;
  changes: Record<string, any>;
  submittedBy: string;
  submittedAt: string;
};

const FILE_PATH = path.join(process.cwd(), "data/pendingUpdates.json");

function load(): PendingUpdate[] {
  if (!fs.existsSync(FILE_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  } catch (err) {
    console.error("[PendingUpdates] Failed to parse JSON:", err);
    // Return empty array but log the error so it's not completely silent
    return [];
  }
}

function save(list: PendingUpdate[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2), "utf8");
}

export function addPendingUpdate(update: PendingUpdate) {
  const list = load();
  list.push(update);
  save(list);
}

export function getPendingUpdates(): PendingUpdate[] {
  return load();
}

export function removePendingUpdate(index: number) {
  const list = load();
  list.splice(index, 1);
  save(list);
}
