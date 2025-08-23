// src/app/page.tsx
import MeCard from "@/components/Me";
import ProfileImageCard from "@/components/ProfileImageCard";
import SocialsCard from "@/components/SocialsCard";
import LocationCard from "@/components/LocationCard";
import LocalTimeCard from "@/components/LocalTimeCard";
import StackCard from "@/components/StackCard";
import StatCard from "@/components/StatCard";
import LightSwitchCard from "@/components/LightSwitch";
import LightSource from "@/components/LightSource";
import AgeCard from "@/components/AgeCard";
import ContactCard from "@/components/ContactCard";
import ProjectsCard from "@/components/ProjectsCard";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <LightSource/>

      {/* Bento container */}
      <main className="w-full md:w-[65%] max-w-[1200px] rounded-3xl p-6" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="grid grid-cols-2 md:grid-cols-5 auto-rows-[160px] gap-4">
          {/* Row 1 */}
          <MeCard />
          <ProfileImageCard/>
          <SocialsCard/>
           <LocalTimeCard />
          
          {/* Socials as tall right column */}
          

          {/* Row 2 */}
          <LocationCard  />
          
          <AgeCard/>
          <StatCard/>
          <StackCard/>
          

          {/* Row 3 */}
          <ProjectsCard/>
          <LightSwitchCard/>
          <ContactCard/>
        </div>
      </main>
    </div>
  );
}