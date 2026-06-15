import { ElsewhereSection } from "@/components/ElsewhereSection";
import { GenericSection } from "@/components/GenericSection";
import { StackItem } from "@/components/StackItem";
import { ThoughtItem } from "@/components/ThoughtItem";
import { WorkItem } from "@/components/WorkItem";
import { getThoughts } from "@/lib/gray";
import { portfolio } from "@/lib/portfolio";

export default function Home() {
  const thoughts = getThoughts().slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <section id="hero">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {portfolio.name}
          <span className="ml-1 text-neutral-400 dark:text-neutral-500">.</span>
        </h1>

        <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
          {portfolio.description[0]}{" "}
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            {portfolio.description[1]}
          </span>{" "}
          {portfolio.description[2]}
        </p>
      </section>

      <GenericSection title="Selected Work">
        <ul>
          {portfolio.works.map((work) => (
            <WorkItem key={work.title} {...work} />
          ))}
        </ul>
      </GenericSection>

      <GenericSection
        title="Writing"
        description="essays, mostly short"
        extra={
          <p className="text-xs text-neutral-500">
            Read all at{" "}
            <a
              href="/thoughts"
              className="underline decoration-[1px] underline-offset-4"
            >
              /thoughts
            </a>
          </p>
        }
      >
        <ul>
          {thoughts.map((thought) => (
            <ThoughtItem
              key={thought.id}
              title={thought.title}
              description={thought.description}
              date={thought.date}
              href={`/thoughts/${thought.id}`}
            />
          ))}
        </ul>
      </GenericSection>

      <GenericSection title="Stack">
        <ul className="flex flex-wrap gap-2">
          {portfolio.stack.map((technology) => (
            <StackItem key={technology} technology={technology} />
          ))}
        </ul>
      </GenericSection>

      <ElsewhereSection links={portfolio.elsewhere} />
    </div>
  );
}
