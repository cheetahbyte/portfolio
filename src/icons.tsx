import { BriefcaseBusiness, Mail } from "lucide-solid";
import { onMount, onCleanup } from "solid-js";
import { placeIcon } from "./icon-placement";
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
  let host!: HTMLSpanElement;
  onMount(() => {
    const link = host.closest('.icon-label')!;
    const content = link.closest('.site-shell')!;
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let hovering = false;
    let observing = false;
    const update = () => {
      const focused = link.matches(':focus-visible');
      const active = (hovering && pointer.matches) || focused;
      host.dataset.keyboard = String(focused);
      if (!active) {
        delete host.dataset.placed;
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update, true);
        observer.disconnect();
        observing = false;
        return;
      }
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
      const rects: DOMRect[] = [];
      const range = document.createRange();
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent?.trim() || node.parentElement?.closest('svg, .icon-position, script, style')) continue;
        range.selectNodeContents(node);
        rects.push(...range.getClientRects());
      }
      const point = placeIcon(link.getBoundingClientRect(), rects, {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
      if (point) {
        host.style.left = `${point.left}px`;
        host.style.top = `${point.top}px`;
        host.dataset.placed = 'true';
      } else delete host.dataset.placed;
      if (!observing) {
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        observer.observe(content);
        observing = true;
      }
    };
    const observer = new ResizeObserver(update);
    const enter = () => { hovering = true; update(); };
    const leave = () => { hovering = false; update(); };
    link.addEventListener('mouseenter', enter);
    link.addEventListener('mouseleave', leave);
    link.addEventListener('focus', update);
    link.addEventListener('blur', update);
    pointer.addEventListener('change', update);
    onCleanup(() => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      link.removeEventListener('mouseenter', enter);
      link.removeEventListener('mouseleave', leave);
      link.removeEventListener('focus', update);
      link.removeEventListener('blur', update);
      pointer.removeEventListener('change', update);
    });
  });
  return (
    <span ref={host} class="icon-position" aria-hidden="true">
      {props.name === 'Wave' ? <span class="wave-emoji">👋</span> :
        props.name === 'Email' ? <Mail class="inline-icon" aria-hidden="true" /> :
        props.name === 'LinkedIn' ? <BriefcaseBusiness class="inline-icon" aria-hidden="true" /> :
        <svg class="inline-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={brands[props.name]} />
        </svg>}
    </span>
  );
}
