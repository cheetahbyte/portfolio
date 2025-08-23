'use client'

import { useLightStore } from "@/store/LightProvider"


export default function LightSource() {
    const {toggled} = useLightStore((state) => state)
    return toggled && <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,232,240,0.15), transparent 70%), #1E1E1E",
        }}
      />
}