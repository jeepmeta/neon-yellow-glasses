// components/sections/CrewGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/realtimeClient";
import { toUICrewList } from "@/lib/crew/transform";
import type { UICrewMember } from "@/lib/crew/model";

export default function CrewGrid() {
  const [crew, setCrew] = useState<UICrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchThe789() {
      try {
        const { data, error } = await supabase
          .from("crew_members")
          .select("*")
          .contains("daos", ["The789"])
          .order("name", { ascending: true });

        if (error) throw error;

        setCrew(toUICrewList(data || []));
      } catch (err: any) {
        console.error("The789 grid fetch died:", err.message);
        setError("789 LEGION OFFLINE – CHECK SUPABASE");
      } finally {
        setLoading(false);
      }
    }

    fetchThe789();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-[#FFE154]/50 text-xl font-mono animate-pulse">
          PULLING THE789 CREW...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-xl font-bold">{error}</p>
      </div>
    );
  }

  if (crew.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#FFE154]/50 text-xl font-mono">
          NO 789 CREW FOUND – WAR ROOM QUIET?
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
          grid 
          grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 
          md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 
          gap-6 xs:gap-8 sm:gap-10 md:gap-12 
          justify-items-center
        "
        >
          {crew.map((member, idx) => (
            <motion.div
              key={member.id || member.handle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              className="w-full max-w-[140px] xs:max-w-[160px] md:max-w-[180px]"
            >
              <Link
                href={`/crew/${member.handle}`}
                className="group block text-center"
              >
                <div
                  className="
                  relative aspect-square w-full mx-auto 
                  rounded-full overflow-hidden 
                  border-4 border-[#FFE154]/70 
                  bg-transparent/60 
                  shadow-[0_0_20px_rgba(255,225,84,0.25)]
                  group-hover:border-[#FFE154] group-hover:shadow-[0_0_40px_#FFE15460]
                  transition-all duration-300
                "
                >
                  <Image
                    src={member.pfp || "/fallback-pfp.webp"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <h3
                    className="
                    text-[#FFE154] font-black text-sm xs:text-base md:text-lg 
                    tracking-tight drop-shadow-[0_1px_4px_rgba(255,225,84,0.6)]
                    group-hover:text-white transition-colors
                  "
                  >
                    {member.name}
                  </h3>
                  <p
                    className="
                    text-[#FFE154]/80 text-xs xs:text-sm md:text-base 
                    font-medium tracking-wide
                  "
                  >
                    {member.role || "CREW"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
