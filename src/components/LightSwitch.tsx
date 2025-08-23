"use client";

import { useLightStore } from "@/store/LightProvider";
import { useCallback, useState } from "react";

export default function LightSwitchCard() {
  const [isOn, setIsOn] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: abc
  const toggle = useCallback(() => {
    setIsOn((v) => !v);
    play();
  }, []);
  const { toggle: toggleLight } = useLightStore((state) => state);
  function play() {
    toggleLight();
    var audio = document.getElementById("a1") as HTMLAudioElement;
    audio?.play();
  }

  return (
    <section className="hidden md:flex rounded-2xl bg-[#171717] text-white/90 md:col-start-3 md:row-start-3 row-span-1 col-span-1 p-6 items-center justify-center">
      {/* Switch frame */}
      <div className="relative w-full h-full">
        {/* Outer bezel */}
        <div className="absolute inset-0 rounded-xl bg-[#232323] shadow-[0_2px_6px_rgba(0,0,0,.6),inset_0_0_0_1px_rgba(255,255,255,.04)]" />

        {/* Inner recess */}
        <div className="absolute inset-1 rounded-lg bg-[#1b1b1b] shadow-[inset_0_6px_14px_rgba(0,0,0,.7),inset_0_-2px_0_rgba(255,255,255,.03)]" />

        {/* Rocker */}
        <button
          type="button"
          aria-pressed={isOn}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          className="cursor-pointer group absolute inset-2 rounded-md w-[calc(100%-1rem)] h-[calc(100%-1rem)] outline-none focus-visible:ring-2 focus-visible:ring-white/20 transition-transform duration-200"
          style={{
            transform: isOn
              ? "perspective(600px) rotateX(10deg) translateY(1px)"
              : "perspective(600px) rotateX(-10deg) translateY(-1px)",
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #222 40%, #1a1a1a 100%)",
            boxShadow: isOn
              ? "inset 0 8px 16px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.05), 0 4px 8px rgba(0,0,0,.45)"
              : "inset 0 6px 12px rgba(0,0,0,.55), inset 0 -2px 0 rgba(255,255,255,.05), 0 6px 12px rgba(0,0,0,.5)",
          }}
        >
          {/* Bottom lip shadow */}
          <span
            aria-hidden
            className={`absolute left-2 right-2 bottom-1 h-2 rounded-sm transition-opacity duration-200 ${
              isOn ? "opacity-70" : "opacity-30"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.5))",
              filter: "blur(0.3px)",
            }}
          />

          {/* Status dot */}
          <span
            aria-hidden
            className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-opacity duration-200 ${
              isOn
                ? "bg-emerald-400/70 shadow-[0_0_10px_rgba(16,185,129,.6)]"
                : "bg-white/10"
            }`}
          />
        </button>
      </div>
      <audio id="a1" src="/click.mp3">
        <track
          kind="captions"
          src="/click-captions.vtt"
          srcLang="en"
          label="English captions"
          default
        />
      </audio>
    </section>
  );
}