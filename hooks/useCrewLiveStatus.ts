"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/realtimeClient";

type LiveStatus = {
  id: string;
  isLive: boolean;
};

export function useCrewLiveStatus(crewId: string) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;

    async function init() {
      const { data, error } = await supabase
        .from("crew_members")
        .select("status")
        .eq("id", crewId)
        .maybeSingle();

      if (!active) return;
      if (!error && data) {
        setIsLive(data.status === "live");
      }

      const channel = supabase
        .channel(`crew_live_${crewId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "crew_members",
            filter: `id=eq.${crewId}`,
          },
          (payload) => {
            const newStatus = (payload.new as Record<string, string>).status;
            setIsLive(newStatus === "live");
          },
        )
        .subscribe();

      return () => {
        active = false;
        supabase.removeChannel(channel);
      };
    }

    const cleanupPromise = init();
    return () => {
      active = false;
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [crewId]);

  return { isLive };
}
