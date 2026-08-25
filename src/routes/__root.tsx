import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { SiteShell } from "../components";
import styleCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { title: "Leonhard Breuer | Portfolio" },
      {
        name: "description",
        content:
          "Computer science student in Germany, building things for the web",
      },
    ],
    links: [{ rel: "stylesheet", href: styleCss }],
  }),
  shellComponent: RootComponent,
});
function RootComponent() {
  return (
    <html
      lang="en"
      class="min-h-full bg-bg font-sans text-fg transition-colors duration-500"
    >
      <head>
        <HydrationScript />
        <script>{`try { const t = localStorage.getItem('theme'); document.documentElement.classList.toggle('dark', t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches) } catch {}`}</script>
        <HeadContent />
      </head>
      <body class="min-h-full bg-bg">
        <Suspense>
          <SiteShell>
            <Outlet />
          </SiteShell>
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
