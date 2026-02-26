import { supabaseServer } from "@/lib/supabase/server";
import { toUICrew, type CrewMember } from "@/lib/crew/model";

const TABLE = "crew_members";

export async function getAllCrew(): Promise<CrewMember[]> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*, tags")
    .order("activity_score", { ascending: false });

  if (error) throw error;
  return data as CrewMember[];
}

export async function getCrewMemberByHandle(
  handle: string,
): Promise<CrewMember | null> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*, tags")
    .eq("handle", handle)
    .maybeSingle();

  if (error) throw error;
  return data as CrewMember | null;
}

export async function getThe789Crew() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("crew_members")
    .select("*, tags")
    .contains("daos", ["The789"]);

  if (error) throw new Error(`Supabase crew query failed: ${error.message}`);

  return data.map(toUICrew);
}
