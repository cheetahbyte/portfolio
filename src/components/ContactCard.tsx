"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

const EMAIL = "contact@leonhardbreuer.de"; // <-- anpassen

export default function ContactCard() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  return (
    <section
      className="col-start-4 row-start-3 col-span-2 p-6 rounded-2xl bg-[#171717] text-white/90 flex flex-col gap-4"
      aria-labelledby="contact-title"
    >
      {/* Header */}
      <header>
        <h2
          id="contact-title"
          className="text-xl font-semibold flex items-center gap-2"
        >
          <Mail className="size-5" />
          Let’s talk via email
        </h2>
        <p className="text-sm text-gray-400">Usually replies within 24h</p>
      </header>

      {/* Actions */}
      <div className="flex gap-3 mt-3">
        {/* Email link */}
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium
                     bg-white text-black hover:bg-gray-200 transition"
          data-rybbit-event="email_href" 
        >
          <Mail className="size-4" />
          Email me
        </a>

        {/* Copy button */}
        <button
          type="button"
          onClick={copy}
          data-rybbit-event="email_copy" 
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium
                     bg-white/10 hover:bg-white/20 transition"
        >
          {copied ? (
            <Check className="size-4 text-emerald-400" />
          ) : (
            <Copy className="size-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </section>
  );
}
