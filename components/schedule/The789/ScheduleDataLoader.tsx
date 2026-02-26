// components/schedule/The789/ScheduleDataLoader.tsx
// This file is SERVER-ONLY – do NOT add "use client"

import { getAllCrew } from "@/lib/crew/queries";
import { toUICrewList } from "@/lib/crew/transform";
import ScheduleSection from "./blocks/ScheduleSection";

export default async function ScheduleDataLoader() {
  const rawCrew = await getAllCrew();
  const crew = toUICrewList(rawCrew);

  return <ScheduleSection crew={crew} />;
}
