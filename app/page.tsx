// app/page.tsx
import HeroCombo from "@/components/sections/HeroCombo";
import { ScheduleHeader } from "@/components/ui/header-schedule";
import ScheduleSection from "@/components/schedule/The789/blocks/ScheduleSection";
import { HotTakesHeader } from "@/components/ui/header-hottakes";
import HotTakesSection from "@/components/sections/HotTakesSection";
import { PicturesHeader } from "@/components/ui/header-pictures";
import ThreeDCarouselOne from "@/components/sections/ThreeDCarouselOne";
import ThreeDCarouselTwo from "@/components/sections/ThreeDCarouselTwo";
import { CrewHeader } from "@/components/ui/header-crew";
import { getAllCrew } from "@/lib/crew/queries";
import { toUICrewList } from "@/lib/crew/transform";
import CrewGrid from "@/components/sections/CrewGrid";

export default async function Home() {
  const rawCrew = await getAllCrew();
  const crew = toUICrewList(rawCrew);

  return (
    <div className="bg-transparent text-white min-h-screen flex flex-col">
      <HeroCombo />

      <section id="live-spaces">
        <ScheduleHeader />
        <ScheduleSection crew={crew} />
      </section>

      <section id="hot-takes">
        <HotTakesHeader />
        <HotTakesSection />
      </section>

      <section id="dd-events">
        <PicturesHeader />
        <ThreeDCarouselOne />
        <ThreeDCarouselTwo />
      </section>

      <section id="crew">
        <CrewHeader />
        <CrewGrid />
      </section>
    </div>
  );
}
