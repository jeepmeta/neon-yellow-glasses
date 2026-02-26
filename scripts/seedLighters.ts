import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Hosts with ZIPPO lighters
const ZIPPO_HOSTS = ["vibesmetax", "wookimeta", "gatormetax"];

// All hosts in your schedule
const ALL_HOSTS = [
  "gramixmeta",
  "leahbluewater",
  "godsburnt",
  "pawsmeta",
  "shieldmetax",
  "anthemhayek",
  "barkmeta",
  "saucemeta",
  "dreammetax",
  "growxmeta",
  "neurometax",
  "artsymeta",
  "truckmeta",
  "vibesmetax",
  "wookimeta",
  "gatormetax",
];

function bicPath(handle: string) {
  return `/lighters/bics/${handle}.webp`;
}

function zippoPaths(handle: string) {
  return {
    open: `/lighters/zippos/${handle}/${handle}_open.webp`,
    closed: `/lighters/zippos/${handle}/${handle}_closed.webp`,
    frames: [
      `/lighters/zippos/${handle}/${handle}_opening_0.webp`,
      `/lighters/zippos/${handle}/${handle}_opening_1.webp`,
      `/lighters/zippos/${handle}/${handle}_opening_2.webp`,
      `/lighters/zippos/${handle}/${handle}_opening_3.webp`,
    ],
  };
}

async function run() {
  for (const handle of ALL_HOSTS) {
    const isZippo = ZIPPO_HOSTS.includes(handle);

    const lighter_bic = bicPath(handle);
    const lighter_zippo = isZippo ? zippoPaths(handle).open : null;
    const lighter_zippo_frames = isZippo ? zippoPaths(handle).frames : null;

    const { error } = await supabase
      .from("crew_members")
      .update({
        lighter_bic,
        lighter_zippo,
        lighter_zippo_frames,
      })
      .eq("handle", handle);

    if (error) {
      console.error(`❌ Failed for ${handle}`, error);
    } else {
      console.log(`✅ Updated ${handle}`);
    }
  }

  console.log("🎉 Lighter seeding complete.");
}

run();
