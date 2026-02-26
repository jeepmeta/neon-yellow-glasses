// lib/admin/mergePendingUpdates.ts
'use server';

import fs from 'fs';
import path from 'path';
import crewStaticData from '@/lib/crew/crewStaticData';
import { getPendingUpdates, removePendingUpdate } from './pendingUpdates';

export function mergePendingUpdate(index: number) {
  const pending = getPendingUpdates();
  const update = pending[index];
  if (!update) return false;

  const filePath = path.join(process.cwd(), 'lib/crew/crewStaticData.ts');
  const members = [...crewStaticData];

  const idx = members.findIndex(m => m.id === update.id);
  if (idx === -1) return false;

  const updated = { ...members[idx], ...update.changes };
  members[idx] = updated;

  const output = `import type { CrewMember } from './crewTypes';

export const crewStaticData: CrewMember[] = ${JSON.stringify(members, null, 2)};

export default crewStaticData;
`;

  fs.writeFileSync(filePath, output, 'utf8');

  removePendingUpdate(index);
  return true;
}
