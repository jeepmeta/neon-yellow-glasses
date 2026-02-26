// app/crew/[handle]/page.tsx

import { notFound } from "next/navigation";
import ClientCrewDetail from "./ClientCrewDetail";
import { getCrewMemberByHandle } from "@/lib/crew/queries";
import { toUICrew } from "@/lib/crew/model";

export default async function CrewDetailPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await props.params;

  const raw = await getCrewMemberByHandle(handle);

  if (!raw) {
    return notFound();
  }

  const member = toUICrew(raw);

  return <ClientCrewDetail member={member} isModal={false} />;
}
