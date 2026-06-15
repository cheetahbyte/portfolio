import type { ReactNode } from "react";

import { LegalLinks } from "@/components/LegalLinks";
import { PullCord } from "@/components/PullCord";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <div className="fixed top-0 right-0 z-50">
        <PullCord />
      </div>
      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pt-10 transition-all duration-700 sm:px-8 sm:pt-32">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-4xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <LegalLinks />
      </footer>
    </div>
  );
}
