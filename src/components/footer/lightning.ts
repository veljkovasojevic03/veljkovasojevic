/**
 * Munja „kao u The Flash“: rekurzivno lomljena linija sa granama, brzo se iscrta,
 * zatreperi i ugasi. Preneseno iz design/stil-poredjenje.html.
 */

type Point = [number, number];

export type Strike = {
  main: Point[];
  branches: { from: number; pts: Point[] }[];
  t0: number;
  life: number;
};

/** Sredina se pomera nasumično, pa se svaka polovina lomi dalje (sve manje). */
function zig(x1: number, y1: number, x2: number, y2: number, disp: number, out: Point[]) {
  if (disp < 2.2) {
    out.push([x2, y2]);
    return;
  }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * disp;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
  zig(x1, y1, mx, my, disp / 2, out);
  zig(mx, my, x2, y2, disp / 2, out);
}

function line(x1: number, y1: number, x2: number, y2: number, disp: number): Point[] {
  const points: Point[] = [[x1, y1]];
  zig(x1, y1, x2, y2, disp, points);
  return points;
}

/** Glavni krak od (x1, y1) do (x2, y2) i nekoliko kratkih grana. */
export function makeBolt(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  disp: number,
  branchCount: number,
  life: number,
): Strike {
  const main = line(x1, y1, x2, y2, disp);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const branches = Array.from({ length: branchCount }, () => {
    const k = Math.floor(Math.random() * (main.length - 2)) + 1;
    const [ax, ay] = main[k];
    const bl = len * (0.1 + Math.random() * 0.2);
    const angle = (Math.random() - 0.5) * 2.4;
    return {
      from: k / main.length,
      pts: line(ax, ay, ax + Math.cos(angle) * bl, ay + Math.sin(angle) * bl, bl * 0.5),
    };
  });
  return { main, branches, t0: performance.now(), life };
}

function trace(ctx: CanvasRenderingContext2D, pts: Point[], upto: number) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  const n = Math.max(1, Math.floor(pts.length * upto));
  for (let i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
}

/**
 * Crta sve žive udare i vraća one koji još traju.
 * Faze: rast (18% života), treperenje (do 58%), gašenje.
 */
export function drawStrikes(
  ctx: CanvasRenderingContext2D,
  strikes: Strike[],
  now: number,
  width: number,
  height: number,
  colors: { energy: string; hot: string },
): Strike[] {
  ctx.clearRect(0, 0, width, height);
  const alive = strikes.filter((s) => now - s.t0 < s.life);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const s of alive) {
    const t = now - s.t0;
    const growFor = s.life * 0.18;
    const grow = Math.min(1, t / growFor);
    ctx.globalAlpha =
      t < growFor
        ? 1
        : t < s.life * 0.58
          ? Math.random() > 0.35
            ? 1
            : 0.25
          : Math.max(0, 1 - (t - s.life * 0.58) / (s.life * 0.42));

    // Spoljni sjaj, pa usijano jezgro.
    ctx.shadowColor = colors.energy;
    ctx.shadowBlur = 22;
    ctx.strokeStyle = colors.energy;
    ctx.lineWidth = 3.2;
    trace(ctx, s.main, grow);
    ctx.stroke();
    ctx.shadowBlur = 8;
    ctx.strokeStyle = colors.hot;
    ctx.lineWidth = 1.3;
    trace(ctx, s.main, grow);
    ctx.stroke();

    for (const branch of s.branches) {
      if (grow < branch.from) continue;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = colors.energy;
      ctx.lineWidth = 1.4;
      trace(ctx, branch.pts, Math.min(1, (grow - branch.from) * 3 + 0.2));
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  return alive;
}
