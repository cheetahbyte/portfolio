import { BriefcaseBusiness, Mail } from "lucide-solid";
import { siNextdotjs, siGo, siPostgresql, siReact, siTypescript, siTanstack, siKubernetes, siGithub, siDiscord, siX, siBluesky } from "simple-icons";

// Only these SVG paths are bundled; no external image requests.
const brands: Record<string, string> = {
  'Next.js': siNextdotjs.path,
  Go: siGo.path,
  PostgreSQL: siPostgresql.path,
  React: siReact.path,
  Typescript: siTypescript.path,
  'Tanstack (Start)': siTanstack.path,
  K8s: siKubernetes.path,
  GitHub: siGithub.path,
  Discord: siDiscord.path,
  X: siX.path,
  Bluesky: siBluesky.path,
};

export function InlineIcon(props: { name: string }) {
  if (props.name === 'Email') return <Mail class="inline-icon" aria-hidden="true" />;
  if (props.name === 'LinkedIn') return <BriefcaseBusiness class="inline-icon" aria-hidden="true" />;
  return (
    <svg class="inline-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={brands[props.name]} />
    </svg>
  );
}
