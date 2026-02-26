import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// ENV
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// PATHS
const PUBLIC_DIR = path.join(process.cwd(), "public");
const BICS_DIR = path.join(PUBLIC_DIR, "lighters/bics");
const ZIPPOS_DIR = path.join(PUBLIC_DIR, "lighters/zippos");

// ZIPPO MEMBERS
const ZIPPO_MEMBERS = ["Gator", "Vibes", "Wooki"];

// HELPERS
function findImage(basePath: string, name: string) {
  const webp = path.join(basePath, `${name}.webp`);
  const avif = path.join(basePath, `${name}.avif`);
  if (fs.existsSync(webp)) return webp.replace(PUBLIC_DIR, "");
  if (fs.existsSync(avif)) return avif.replace(PUBLIC_DIR, "");
  return null;
}

function findZippoImages(member: string) {
  const folder = path.join(ZIPPOS_DIR, member);
  if (!fs.existsSync(folder)) return null;

  const files = fs.readdirSync(folder);

  const open = files.find((f) => f.includes("open"));
  const frames = files
    .filter((f) => f.includes("trans"))
    .sort((a, b) => {
      const na = parseInt(a.match(/(\d+)/)?.[0] ?? "0");
      const nb = parseInt(b.match(/(\d+)/)?.[0] ?? "0");
      return na - nb;
    });

  return {
    open: open ? `/lighters/zippos/${member}/${open}` : null,
    frames: frames.map((f) => `/lighters/zippos/${member}/${f}`),
  };
}

async function main() {
  console.log("Seeding crew_members...");

  // Load your existing static crew data
  const crewData = JSON.parse(
    fs.readFileSync("lib/crew/data/all.json", "utf8"),
  );

  for (const member of crewData) {
    const name = member.name;
    const isZippo = ZIPPO_MEMBERS.includes(name);

    let lighter_bic = null;
    let lighter_zippo = null;
    let lighter_zippo_frames = null;

    if (isZippo) {
      const zippo = findZippoImages(name);
      lighter_zippo = zippo?.open ?? null;
      lighter_zippo_frames = zippo?.frames ?? null;
    } else {
      lighter_bic = findImage(BICS_DIR, name);
    }

    const { error } = await supabase.from("crew_members").upsert({
      ...member,
      lighter_bic,
      lighter_zippo,
      lighter_zippo_frames,
    });

    if (error) {
      console.error("Error inserting:", name, error);
    } else {
      console.log("Inserted:", name);
    }
  }

  console.log("Done.");
}

main();
