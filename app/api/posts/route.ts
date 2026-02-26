import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await supabaseServer();

    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return Response.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
