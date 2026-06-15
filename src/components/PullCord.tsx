"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
  px: number;
  py: number;
  pinned: boolean;
};

const N = 14;
const REST = 9;
const GRAVITY = 0.6;
const DAMP = 0.97;
const ITERS = 20;
const CW = 100;
const TOGGLE_PULL = 30;

function makePoints(): Point[] {
  const cx = CW / 2;
  return Array.from({ length: N }, (_, i) => ({
    x: cx,
    y: i * REST,
    px: cx,
    py: i * REST,
    pinned: i === 0,
  }));
}

function simulate(pts: Point[], dragPt: Point | null) {
  for (const p of pts) {
    if (p.pinned || p === dragPt) {
      continue;
    }

    const vx = (p.x - p.px) * DAMP;
    const vy = (p.y - p.py) * DAMP;
    p.px = p.x;
    p.py = p.y;
    p.x += vx;
    p.y += vy + GRAVITY;
  }

  for (let iter = 0; iter < ITERS; iter += 1) {
    pts[0].x = CW / 2;
    pts[0].y = 0;

    for (let i = 0; i < N - 1; i += 1) {
      const a = pts[i];
      const b = pts[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.001;
      const corr = ((d - REST) / d) * 0.5;
      const cx = dx * corr;
      const cy = dy * corr;

      if (!a.pinned && a !== dragPt) {
        a.x += cx;
        a.y += cy;
      }

      if (!b.pinned && b !== dragPt) {
        b.x -= cx;
        b.y -= cy;
      }
    }

    for (const p of pts) {
      if (p.pinned) {
        continue;
      }

      p.x = Math.max(8, Math.min(CW - 8, p.x));

      if (p.y < 0) {
        p.y = 0;
      }
    }
  }
}

export function PullCord() {
  const [isDark, setIsDark] = useState(false);
  const [height, setHeight] = useState(800);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ptsRef = useRef<Point[]>(makePoints());
  const dragRef = useRef(false);
  const dragPtRef = useRef<Point | null>(null);
  const dragStartYRef = useRef(0);
  const lastDragYRef = useRef(0);
  const prevDragYRef = useRef(0);
  const toggleArmedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const isDarkRef = useRef(isDark);
  const reducedMotionRef = useRef(false);
  const startLoopRef = useRef<() => void>(() => {});
  const settleFramesRef = useRef(0);

  const toggleTheme = useCallback(() => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  useEffect(() => {
    lastTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const next = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
  }, []);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    setHeight(window.innerHeight);
    const onResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const draw = useCallback(
    (isDarkMode: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      const pts = ptsRef.current;
      ctx.clearRect(0, 0, CW, height);

      const cordCol = isDarkMode ? "#888780" : "#5f5e5a";
      const tasselCol = isDarkMode ? "#d3d1c7" : "#2c2c2a";

      ctx.save();
      ctx.strokeStyle = cordCol;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < N; i += 1) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
      ctx.restore();

      const tip = pts[N - 1];
      const ty = tip.y + 16;

      ctx.save();
      ctx.fillStyle = tasselCol;
      ctx.beginPath();
      ctx.ellipse(tip.x, ty, 7, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = cordCol;
      ctx.lineWidth = 1.2;
      for (const ox of [-3, 0, 3]) {
        ctx.beginPath();
        ctx.moveTo(tip.x + ox, ty - 6);
        ctx.lineTo(tip.x + ox, ty + 6);
        ctx.stroke();
      }
      ctx.restore();
    },
    [height],
  );

  useEffect(() => {
    draw(isDark);
  }, [draw, isDark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
    };

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const stop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const loop = (now: number) => {
      if (document.hidden || reducedMotionRef.current) {
        draw(isDarkRef.current);
        rafRef.current = 0;
        return;
      }

      const dt = Math.min((now - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = now;

      for (let i = 0; i < Math.ceil(dt); i += 1) {
        simulate(ptsRef.current, dragPtRef.current);
      }

      draw(isDarkRef.current);

      if (!dragRef.current) {
        settleFramesRef.current -= 1;

        if (settleFramesRef.current <= 0) {
          settleFramesRef.current = 0;
          rafRef.current = 0;
          return;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (rafRef.current || document.hidden || reducedMotionRef.current) {
        draw(isDarkRef.current);
        return;
      }

      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    };

    startLoopRef.current = start;

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
        return;
      }

      if (dragRef.current || settleFramesRef.current > 0) {
        start();
        return;
      }

      draw(isDarkRef.current);
    };

    draw(isDarkRef.current);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [draw]);

  useEffect(() => {
    const getTip = () => ptsRef.current[N - 1];

    const toCanvasCoords = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return { x: 0, y: 0 };
      }

      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const hitTassel = (canvasX: number, canvasY: number) => {
      const tip = getTip();
      return Math.hypot(canvasX - tip.x, canvasY - (tip.y + 16)) < 20;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!canvasRef.current) {
        return;
      }

      const { x, y } = toCanvasCoords(event.clientX, event.clientY);
      if (hitTassel(x, y)) {
        dragRef.current = true;
        dragPtRef.current = getTip();
        dragStartYRef.current = y;
        prevDragYRef.current = y;
        lastDragYRef.current = y;
        toggleArmedRef.current = true;
        document.body.style.cursor = "grabbing";
        startLoopRef.current();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canvasRef.current) {
        return;
      }

      if (!dragRef.current) {
        const { x, y } = toCanvasCoords(event.clientX, event.clientY);
        document.body.style.cursor = hitTassel(x, y) ? "grab" : "";
        return;
      }

      const { x, y } = toCanvasCoords(event.clientX, event.clientY);
      prevDragYRef.current = lastDragYRef.current;
      lastDragYRef.current = y;

      const tip = getTip();
      tip.px = tip.x;
      tip.py = tip.y;
      tip.x = x;
      tip.y = y - 16;

      const pulled = y - dragStartYRef.current;
      if (pulled < TOGGLE_PULL) {
        toggleArmedRef.current = true;
      }

      if (pulled >= TOGGLE_PULL && toggleArmedRef.current) {
        toggleArmedRef.current = false;
        toggleTheme();
      }
    };

    const onPointerUp = () => {
      if (!dragRef.current) {
        return;
      }

      dragRef.current = false;
      const velocity = lastDragYRef.current - prevDragYRef.current;
      const tip = getTip();
      tip.px = tip.x;
      tip.py = tip.y - velocity * 1.5;
      dragPtRef.current = null;
      settleFramesRef.current = 120;
      document.body.style.cursor = "";
      startLoopRef.current();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
    };
  }, [toggleTheme]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative z-10 -mb-1 size-2 rounded-full"
        style={{ background: isDark ? "#444441" : "#b4b2a9" }}
      />
      <canvas
        ref={canvasRef}
        width={CW}
        height={height}
        className="block touch-none pointer-events-none"
      />
    </div>
  );
}
