import { useCallback, useEffect, useRef, useState } from "react";

interface PullCordProps {
	isDark: boolean;
	onToggle: () => void;
}

interface Point {
	x: number;
	y: number;
	px: number;
	py: number;
	pinned: boolean;
}

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
		if (p.pinned || p === dragPt) continue;
		const vx = (p.x - p.px) * DAMP;
		const vy = (p.y - p.py) * DAMP;
		p.px = p.x;
		p.py = p.y;
		p.x += vx;
		p.y += vy + GRAVITY;
	}

	for (let iter = 0; iter < ITERS; iter++) {
		pts[0].x = CW / 2;
		pts[0].y = 0;
		for (let i = 0; i < N - 1; i++) {
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
			if (p.pinned) continue;
			p.x = Math.max(8, Math.min(CW - 8, p.x));
			if (p.y < 0) p.y = 0;
		}
	}
}

export default function PullCord({ isDark, onToggle }: PullCordProps) {
	const [height, setHeight] = useState(800);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ptsRef = useRef<Point[]>(makePoints());
	const dragRef = useRef(false);
	const dragPtRef = useRef<Point | null>(null);
	const dragStartYRef = useRef(0);
	const lastDragYRef = useRef(0);
	const prevDragYRef = useRef(0);
	const toggledThisDragRef = useRef(false);
	const rafRef = useRef<number>(0);
	const lastTimeRef = useRef(performance.now());
	const isDarkRef = useRef(isDark);

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
			if (!canvas) return;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const pts = ptsRef.current;
			ctx.clearRect(0, 0, CW, height);

			const cordCol = isDarkMode ? "#888780" : "#5F5E5A";
			const tasselCol = isDarkMode ? "#D3D1C7" : "#2C2C2A";

			ctx.save();
			ctx.strokeStyle = cordCol;
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.beginPath();
			ctx.moveTo(pts[0].x, pts[0].y);
			for (let i = 1; i < N; i++) ctx.lineTo(pts[i].x, pts[i].y);
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
		const loop = (now: number) => {
			const dt = Math.min((now - lastTimeRef.current) / 16.67, 3);
			lastTimeRef.current = now;
			for (let i = 0; i < Math.ceil(dt); i++)
				simulate(ptsRef.current, dragPtRef.current);
			draw(isDarkRef.current);
			rafRef.current = requestAnimationFrame(loop);
		};
		rafRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(rafRef.current);
	}, [draw]);

	const getTip = () => ptsRef.current[N - 1];

	const hitTassel = (canvasX: number, canvasY: number) => {
		const tip = getTip();
		return Math.hypot(canvasX - tip.x, canvasY - (tip.y + 16)) < 20;
	};

	const toCanvasCoords = (clientX: number, clientY: number) => {
		const r = canvasRef.current!.getBoundingClientRect();
		return { x: clientX - r.left, y: clientY - r.top };
	};

	useEffect(() => {
		const onPointerDown = (e: PointerEvent) => {
			if (!canvasRef.current) return;
			const { x, y } = toCanvasCoords(e.clientX, e.clientY);
			if (hitTassel(x, y)) {
				dragRef.current = true;
				dragPtRef.current = getTip();
				dragStartYRef.current = y;
				prevDragYRef.current = y;
				lastDragYRef.current = y;
				toggledThisDragRef.current = false;
				document.body.style.cursor = "grabbing";
			}
		};

		const onPointerMove = (e: PointerEvent) => {
			if (!canvasRef.current) return;
			if (!dragRef.current) {
				const { x, y } = toCanvasCoords(e.clientX, e.clientY);
				document.body.style.cursor = hitTassel(x, y) ? "grab" : "";
				return;
			}
			const { x, y } = toCanvasCoords(e.clientX, e.clientY);
			prevDragYRef.current = lastDragYRef.current;
			lastDragYRef.current = y;
			const tip = getTip();
			tip.px = tip.x;
			tip.py = tip.y;
			tip.x = x;
			tip.y = y - 16;

			const pulled = y - dragStartYRef.current;
			if (pulled >= TOGGLE_PULL && !toggledThisDragRef.current) {
				toggledThisDragRef.current = true;
				onToggle();
			}
		};

		const onPointerUp = () => {
			if (!dragRef.current) return;
			dragRef.current = false;
			const velocity = lastDragYRef.current - prevDragYRef.current;
			const tip = getTip();
			tip.px = tip.x;
			tip.py = tip.y - velocity * 1.5;
			dragPtRef.current = null;
			document.body.style.cursor = "";
		};

		const onTouchStart = (e: TouchEvent) => {
			if (!canvasRef.current || e.touches.length !== 1) return;
			const t = e.touches[0];
			const { x, y } = toCanvasCoords(t.clientX, t.clientY);
			if (hitTassel(x, y)) e.preventDefault();
		};

		const onTouchMove = (e: TouchEvent) => {
			if (dragRef.current) e.preventDefault();
		};

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("pointermove", onPointerMove);
		document.addEventListener("pointerup", onPointerUp);
		document.addEventListener("pointercancel", onPointerUp);
		document.addEventListener("touchstart", onTouchStart, { passive: false });
		document.addEventListener("touchmove", onTouchMove, { passive: false });

		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("pointerup", onPointerUp);
			document.removeEventListener("pointercancel", onPointerUp);
			document.removeEventListener("touchstart", onTouchStart);
			document.removeEventListener("touchmove", onTouchMove);
		};
	}, [onToggle]);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div
				style={{
					width: 8,
					height: 8,
					borderRadius: "50%",
					background: isDark ? "#444441" : "#B4B2A9",
					marginBottom: -4,
					position: "relative",
					zIndex: 1,
				}}
			/>
			<canvas
				ref={canvasRef}
				width={CW}
				height={height}
				style={{ display: "block", touchAction: "none", pointerEvents: "none" }}
			/>
		</div>
	);
}
