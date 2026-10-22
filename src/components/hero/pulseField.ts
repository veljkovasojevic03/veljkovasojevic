/**
 * Impulsi struje kroz mrežu tačaka (logika iz design/stil-poredjenje.html).
 * Impuls ide od tačke do tačke pod pravim uglovima, sa svetlom glavom i
 * repom koji bledi. rAF radi samo dok ima impulsa; između impulsa čeka tajmer.
 */

/** Razmak tačaka; mora biti isti kao u CSS mreži (.hero-dots). */
export const GRID = 22;

/** ms po koraku mreže (brzina glave). */
const STEP_MS = 26;
/** Dužina repa u koracima. */
const TAIL = 7;
/** Šansa da impuls skrene na svakom koraku. */
const TURN_CHANCE = 0.28;
const MAX_DPR = 2;

type Point = [col: number, row: number];
type Run = { points: Point[]; start: number };

export type PulseOptions = {
  /** Pauza između automatskih impulsa [min, max] u ms. */
  interval: [number, number];
  /** Najviše impulsa istovremeno. */
  maxRuns: number;
};

export type PulseField = {
  spawnAt: (x: number, y: number) => void;
  setActive: (active: boolean) => void;
  resize: () => void;
  destroy: () => void;
};

export function createPulseField(
  canvas: HTMLCanvasElement,
  options: PulseOptions,
): PulseField {
  const ctx = canvas.getContext("2d");
  const rgb = getComputedStyle(canvas).getPropertyValue("--energy-rgb").trim();
  let width = 0;
  let height = 0;
  let runs: Run[] = [];
  let frame = 0;
  let timer = 0;
  let active = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const spawn = (col?: number, row?: number) => {
    const cols = Math.floor(width / GRID);
    const rows = Math.floor(height / GRID);
    if (!cols || !rows) return;
    let c = col ?? Math.floor(Math.random() * cols);
    let r = row ?? Math.floor(Math.random() * rows);
    const dirs: Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    let dir = dirs[Math.floor(Math.random() * 4)];
    const points: Point[] = [[c, r]];
    const length = 22 + Math.floor(Math.random() * 16);
    for (let i = 0; i < length; i++) {
      if (Math.random() < TURN_CHANCE) {
        dir = Math.random() < 0.5 ? [dir[1], -dir[0]] : [-dir[1], dir[0]];
      }
      c += dir[0];
      r += dir[1];
      points.push([c, r]);
    }
    runs.push({ points, start: performance.now() });
    if (runs.length > options.maxRuns) runs.shift();
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const at = (p: Point) => [p[0] * GRID + GRID / 2, p[1] * GRID + GRID / 2] as const;

  const draw = (now: number) => {
    frame = 0;
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    runs = runs.filter((run) => (now - run.start) / STEP_MS < run.points.length + TAIL);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 1.4;
    ctx.shadowColor = `rgb(${rgb})`;

    for (const run of runs) {
      const progress = Math.floor((now - run.start) / STEP_MS);
      // rAF vreme može biti malo pre performance.now() pri spawnu na klik.
      const head = Math.max(0, Math.min(run.points.length - 1, progress));
      const from = Math.max(0, progress - TAIL);

      ctx.shadowBlur = 10;
      for (let i = from; i < head; i++) {
        const alpha = ((i - from + 1) / (TAIL + 1)) * 0.9;
        const [x1, y1] = at(run.points[i]);
        const [x2, y2] = at(run.points[i + 1]);
        ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      if (progress < run.points.length) {
        const [x, y] = at(run.points[head]);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    if (runs.length) frame = requestAnimationFrame(draw);
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!active) return;
    const [min, max] = options.interval;
    timer = window.setTimeout(() => {
      if (active && !document.hidden) spawn();
      schedule();
    }, min + Math.random() * (max - min));
  };

  resize();

  return {
    spawnAt(x, y) {
      spawn(Math.round((x - GRID / 2) / GRID), Math.round((y - GRID / 2) / GRID));
    },
    setActive(next) {
      if (next === active) return;
      active = next;
      if (active) {
        schedule();
      } else {
        window.clearTimeout(timer);
        cancelAnimationFrame(frame);
        frame = 0;
        runs = [];
        ctx?.clearRect(0, 0, width, height);
      }
    },
    resize,
    destroy() {
      active = false;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    },
  };
}
