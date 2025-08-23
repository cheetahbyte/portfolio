// src/app/page.tsx
import MeCard from "@/components/Me";
import ProfileImageCard from "@/components/ProfileImageCard";
import SocialsCard from "@/components/SocialsCard";
import LocationCard from "@/components/LocationCard";
import LocalTimeCard from "@/components/LocalTimeCard";
import StackCard from "@/components/StackCard";
import StatCard from "@/components/StatCard";
import LightSwitchCard from "@/components/LightSwitch";

function Placeholder({ label = "", className = "" }) {
  return (
    <section className={`rounded-2xl bg-[#171717] text-white/60 p-6 flex items-center justify-center ${className}`}>
      {label && <span className="text-lg">{label}</span>}
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,232,240,0.15), transparent 70%), #1E1E1E",
        }}
      />

      {/* Bento container */}
      <main className="w-[65%] max-w-[1200px] rounded-3xl p-6" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="grid grid-cols-5 auto-rows-[160px] gap-4">
          {/* Row 1 */}
          <MeCard />
          <ProfileImageCard/>
          <SocialsCard/>
           <LocalTimeCard />
          
          {/* Socials as tall right column */}
          

          {/* Row 2 */}
          <LocationCard  />
          
          <Placeholder label="E" className="col-start-2 row-start-2 col-span-1" />
          <Placeholder label="F" className="col-start-3 row-start-2 col-span-1" />
          <StatCard/>
          <StackCard/>
          

          {/* Row 3 */}
          <Placeholder label="I" className="col-start-3 row-start-3 col-span-1" />
         
          <Placeholder label="I" className="col-start-3 row-start-3 col-span-1" />
          <Placeholder label="ABC" className="col-start-4 row-start-1 col-span-1 row-span-2" />
          <LightSwitchCard/>
          <Placeholder label="J" className="col-start-3 row-start-3 col-span-2" />
        </div>
      </main>
    </div>
  );
}
