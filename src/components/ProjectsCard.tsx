import { ArrowRight, ArrowUpRight, Code2, Flag, PiggyBank } from "lucide-react";
import Image from "next/image";

export default function ProjectsCard() {
  const projects = [
    {
      title: "flagly.pro",
      link: "https://flagly.dev",
      element: (
        <Image
          alt="flagly logo"
          width={20}
          height={20}
          src="https://www.flagly.dev/icon.svg"
        />
      ),
    },
    {
      title: "keinbudget",
      link: "https://github.com/cheetahbyte/keinbudget",
      element: <PiggyBank size={20} />,
    },
    {
      title: "flagly",
      link: "https://github.com/cheetahbyte/flagly",
      element: <Flag size={20} />,
    },
  ];

  return (
    <section
      className="col-span-2 row-span-2 md:col-start-4 md:row-start-1 md:col-span-1 md:row-span-2 p-4 rounded-2xl
                 bg-neutral-900/80 
                 text-white/90 flex flex-col"
      aria-labelledby="projects"
    >
      <h2
        id="projects"
        className="text-lg font-semibold flex items-center gap-2 mb-3"
      >
        <Code2 className="size-4" />
        Projects
      </h2>

      {/* Vertical list of project links with enhanced styling */}
      <div className="flex flex-col gap-2 flex-1">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg p-3
                       bg-neutral-900/50 hover:bg-neutral-800/60
                       border border-neutral-800 hover:border-neutral-700
                       flex items-center justify-between
                       transition-all duration-200"
          >
            {/* Left side: Emoji and Title */}
            <div className="flex items-center gap-3">
              <span className="text-lg bg-neutral-800/70 p-1 rounded-md">
                {p.element}
              </span>
              <span className="text-sm font-medium truncate">{p.title}</span>
            </div>

            {/* Right side: Arrow icon appears on hover */}
            <ArrowUpRight
              className="size-4 shrink-0 text-neutral-500
                         transition-all duration-200
                         opacity-0 -translate-x-2 
                         group-hover:opacity-100 group-hover:translate-x-0"
            />
          </a>
        ))}
      </div>

      {/* "See all" link acts as a footer call-to-action */}
      <a
        href="https://github.com/cheetahbyte?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-lg mt-2
                   flex items-center justify-between px-3 py-2
                   text-sm font-medium text-neutral-400 hover:text-white
                   hover:bg-neutral-800/50
                   transition-all duration-200"
      >
        <span>See all projects</span>
        <ArrowRight
          className="size-4 shrink-0
                     transition-transform duration-200
                     group-hover:translate-x-1"
        />
      </a>
    </section>
  );
}