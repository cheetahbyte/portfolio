import { GenericSection } from "@/components/GenericSection";
import { ThoughtItem } from "@/components/ThoughtItem";
import { getThoughts } from "@/lib/gray";

export default function ThoughtsPage() {
  const thoughts = getThoughts();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Thoughts
          <span className="ml-1 text-neutral-400 dark:text-neutral-500">.</span>
        </h1>
        <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
          Essays and notes, mostly short.
        </p>
      </header>

      <GenericSection title="Writing">
        {thoughts.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No thoughts yet.
          </p>
        ) : (
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
        )}
      </GenericSection>
    </div>
  );
}
