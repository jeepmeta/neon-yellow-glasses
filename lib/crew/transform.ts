import type { CrewMember } from "@/lib/types/crew";
import type { UICrewMember } from "./model";

export function toUICrew(member: CrewMember): UICrewMember {
  const isZippo = Boolean(member.lighter_zippo);
  const isBic = Boolean(member.lighter_bic);

  return {
    ...member,
    isZippo,
    isBic,
    lighterFrames: member.lighter_zippo_frames ?? [],
  };
}

export function toUICrewList(members: CrewMember[]): UICrewMember[] {
  return members.map(toUICrew);
}
