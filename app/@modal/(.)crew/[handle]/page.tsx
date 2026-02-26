// app/@modal/(.)crew/[handle]/page.tsx
import { notFound } from "next/navigation";
import { getCrewMemberByHandle } from "@/lib/crew/queries";
import { toUICrew } from "@/lib/crew/model";
import { CrewModalOverlay } from "@/components/degeneratum/CrewModalOverlay";

export default async function CrewModalIntercept({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const raw = await getCrewMemberByHandle(handle);
  if (!raw) notFound();

  const member = toUICrew(raw);

  return <CrewModalOverlay member={member} />;
}
