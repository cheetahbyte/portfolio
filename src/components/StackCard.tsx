import {
  SiGo,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiPython,
  SiGit,
  SiDocker,
} from "@icons-pack/react-simple-icons";
import styles from "./StackCard.module.css";

export default function LocalTimeCard() {
  const icons = [
    <SiNextdotjs key="next" size={35} />,
    <SiReact key="react" size={35} />,
    <SiGo key="go" size={35} />,
    <SiPostgresql key="pg" size={35} />,
    <SiTailwindcss key="tw" size={35} />,
    <SiTypescript key="ts" size={35} />,
    <SiPython key="py" size={35} />,
    <SiGit key="git" size={35} />,
    <SiDocker key="docker" size={35} />,
  ];

  return (
    <section className="rounded-2xl bg-[#171717] text-white/90 col-span-2 md:col-span-2 row-span-1 p-6 md:row-start-3 md:col-start-1">
      <h2 className="text-3xl mb-2">My Tech-Stack</h2>

      <div className={`relative overflow-hidden w-full h-[64px] p-4 ${styles.marquee}`}>
        <div className={styles.track}>
          {/* panel 1 */}
          <div className={styles.panel}>{icons}</div>
          {/* panel 2 (duplicate for seamless loop) */}
          <div className={styles.panel} aria-hidden="true">{icons}</div>
        </div>
      </div>
    </section>
  );
}