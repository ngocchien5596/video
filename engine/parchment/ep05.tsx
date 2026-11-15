/**
 * Tập 5 "Ngồi trong ô tô an toàn khi có sét là nhờ lốp cao su?" (Tin được hay Tin đồn?): cảnh vẽ riêng cho từng hồi,
 * đổi hình theo câu đang đọc (`li`, `lf`) bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-1.ts.
 * Toạ độ gốc sân khấu: x 60..910, y 93..780 (mặt đất y = 780). Hiệu ứng chính của mỗi câu xong trong ~70 khung đầu câu,
 * phần sau chỉ còn chuyển động nhẹ lặp (mưa, tia lửa, dòng điện chạy).
 */
import React from "react";
import { interpolate } from "remotion";
import { DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Card, Check, Cross, GROUND, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { type Pose, Stickman } from "./Stickman.tsx";

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

const BOLT = "#FFE27A";
const CUR = "#FFD23F";
const SPARK = "#C3B0FF";
const CREAM = "#FFF6DD";
const MILO_X = 800;

type Pt = [number, number];
type PoseState = { pose: Pose; prevPose?: Pose; poseT?: number };

// ---------------------------------------------------------------- tiện ích

/** Số giả ngẫu nhiên 0..1 cố định theo chỉ số (hình không đổi giữa các khung). */
const rnd = (i: number) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const polyD = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const polyLen = (pts: Pt[]) => pts.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

/** Đường gấp khúc kiểu tia sét từ (x1, y1) tới (x2, y2). */
const zigzag = (x1: number, y1: number, x2: number, y2: number, seed: number, segs = 9, amp = 26): Pt[] => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L;
  const ny = dx / L;
  return Array.from({ length: segs + 1 }, (_, k) => {
    const t = k / segs;
    const o = k === 0 || k === segs ? 0 : (rnd(seed * 13 + k) - 0.5) * 2 * amp;
    return [x1 + dx * t + nx * o, y1 + dy * t + ny * o] as Pt;
  });
};

/** Chuỗi tư thế trong một câu: [khung bắt đầu, tư thế]; bước đầu chuyển từ `prev` (tư thế cuối câu trước). */
const chain = (lf: number, prev: Pose | undefined, steps: [number, Pose][]): PoseState => {
  let k = 0;
  for (let i = 0; i < steps.length; i++) if (lf >= steps[i][0]) k = i;
  const [at, pose] = steps[k];
  return { pose, prevPose: k > 0 ? steps[k - 1][1] : prev, poseT: ease(lf, at, 12) };
};

/** Phóng to quanh (cx, cy). */
const zoomT = (z: number, cx: number, cy: number) => `translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`;

// ---------------------------------------------------------------- hiệu ứng điện

/** Tia sét vẽ dần (quầng sáng + lõi trắng). */
const Bolt: React.FC<{ pts: Pt[]; p: number; o?: number; w?: number; color?: string }> = ({ pts, p, o = 1, w = 1, color = BOLT }) => {
  if (p <= 0.01 || o <= 0.01) return null;
  const d = polyD(pts);
  const len = polyLen(pts);
  const common = { d, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" } as const;
  return (
    <g opacity={o}>
      <DrawPath p={p} length={len} {...common} stroke={color} strokeWidth={26 * w} opacity={0.55} filter="url(#e05-glow)" />
      <DrawPath p={p} length={len} {...common} stroke={color} strokeWidth={11 * w} />
      <DrawPath p={p} length={len} {...common} stroke="#FFFFFF" strokeWidth={4.5 * w} />
    </g>
  );
};

/** Dòng điện vàng chạy dọc một đường: vẽ dần, xong thì các vạch sáng trôi liên tục theo chiều dòng điện. */
const Flow: React.FC<{ pts: Pt[]; p: number; frame: number; w?: number }> = ({ pts, p, frame, w = 1 }) => {
  if (p <= 0.01) return null;
  const d = polyD(pts);
  const len = polyLen(pts);
  const common = { d, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" } as const;
  return (
    <g>
      <DrawPath p={p} length={len} {...common} stroke={CUR} strokeWidth={22 * w} opacity={0.5} filter="url(#e05-glow)" />
      <DrawPath p={p} length={len} {...common} stroke={CUR} strokeWidth={9 * w} />
      {p > 0.98 ? <path {...common} stroke="#FFFFFF" strokeWidth={4 * w} strokeDasharray={`${14 * w} ${24 * w}`} strokeDashoffset={-frame * 5 * w} /> : null}
    </g>
  );
};

/** Tia lửa tím nhỏ nhấp nháy từ điểm (x, y) theo hướng (nx, ny). */
const Spark: React.FC<{ x: number; y: number; nx: number; ny: number; k: number; frame: number; len?: number }> = ({ x, y, nx, ny, k, frame, len = 70 }) => {
  const cyc = (frame + k * 5) % 14;
  if (cyc >= 6) return null;
  const gen = Math.floor((frame + k * 5) / 14);
  const a = Math.atan2(ny, nx) + (rnd(k * 3 + gen) - 0.5) * 0.9;
  const L = len * (0.6 + rnd(k * 7 + gen) * 0.6);
  const pts = zigzag(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, k * 11 + gen, 4, 10);
  return <Bolt pts={pts} p={1} o={1 - cyc / 7} w={0.45} color={SPARK} />;
};

/** Chớp trắng phủ toàn sân khấu. */
const Flash: React.FC<{ a: number }> = ({ a }) => (a > 0.01 ? <rect x={0} y={0} width={1000} height={900} fill="#FFFFFF" opacity={a} /> : null);

/** Mưa xiên. */
const Rain: React.FC<{ frame: number; o?: number; n?: number }> = ({ frame, o = 1, n = 44 }) =>
  o <= 0.01 ? null : (
    <g opacity={o}>
      {Array.from({ length: n }, (_, i) => {
        const sp = 24 + (i % 5) * 4;
        const y = ((frame * sp + i * 173) % 760) + 60;
        const x = 70 + ((i * 97) % 960) - (y - 60) * 0.25;
        return <line key={i} x1={x} y1={y} x2={x - 9} y2={y + 36} stroke="rgba(205,225,255,0.6)" strokeWidth={3} strokeLinecap="round" />;
      })}
    </g>
  );

// ---------------------------------------------------------------- khung chữ, mũi tên, con dấu

/** Thẻ chữ đặt trên hình (căn giữa tại x, đỉnh tại y). */
const Tag: React.FC<{ x: number; y: number; lines: string[]; size?: number; color?: string; border?: string; bg?: string; p: number; w?: number; rot?: number }> = ({
  x,
  y,
  lines,
  size = 40,
  color = INK.line,
  border = INK.line,
  bg = CREAM,
  p,
  w,
  rot = 0,
}) => {
  const width = w ?? Math.max(...lines.map((l) => l.length)) * size * 0.64 + 44;
  const h = lines.length * size * 1.18 + 26;
  return (
    <Pop p={p} cx={x} cy={y + h / 2}>
      <g transform={`rotate(${rot} ${x} ${y + h / 2})`}>
        <rect x={x - width / 2 + 5} y={y + 7} width={width} height={h} rx={14} fill="rgba(0,0,0,0.22)" />
        <rect x={x - width / 2} y={y} width={width} height={h} rx={14} fill={bg} stroke={border} strokeWidth={4} />
        {lines.map((l, i) => (
          <text key={l} x={x} y={y + 13 + size * (i * 1.18 + 0.95)} textAnchor="middle" fill={color} fontSize={size} {...T}>
            {l}
          </text>
        ))}
      </g>
    </Pop>
  );
};

/** Con dấu cao su đóng mạnh xuống (phóng to rồi thu về). */
const Stamp: React.FC<{ x: number; y: number; text: string; p: number; rot?: number; size?: number; color?: string }> = ({ x, y, text, p, rot = -8, size = 40, color = INK.red }) => {
  if (p <= 0.01) return null;
  const w = text.length * size * 0.66 + 40;
  const s = 1 + (1 - Math.min(1, p)) * 0.8;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, p * 1.4)}>
      <rect x={-w / 2} y={-size * 0.95} width={w} height={size * 1.6} rx={10} fill="rgba(255,246,221,0.92)" stroke={color} strokeWidth={6} />
      <rect x={-w / 2 + 8} y={-size * 0.95 + 8} width={w - 16} height={size * 1.6 - 16} rx={6} fill="none" stroke={color} strokeWidth={2.5} />
      <text x={0} y={size * 0.32} textAnchor="middle" fill={color} fontSize={size} {...T}>
        {text}
      </text>
    </g>
  );
};

/** Mũi tên thẳng vẽ dần. */
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p: number; color?: string; w?: number }> = ({ x1, y1, x2, y2, p, color = INK.red, w = 6 }) => {
  if (p <= 0.01) return null;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;
  return (
    <g>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path
        d={`M ${ex} ${ey} L ${ex - 22 * Math.cos(ang - 0.45)} ${ey - 22 * Math.sin(ang - 0.45)} M ${ex} ${ey} L ${ex - 22 * Math.cos(ang + 0.45)} ${ey - 22 * Math.sin(ang + 0.45)}`}
        stroke={color}
        strokeWidth={w}
        strokeLinecap="round"
      />
    </g>
  );
};

/** Mũi tên cong vẽ dần, vồng lên `arc` px. */
const ArcArrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; arc?: number; p: number; color: string; w?: number }> = ({ x1, y1, x2, y2, arc = 40, p, color, w = 6 }) => {
  if (p <= 0.01) return null;
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - arc;
  const len = Math.hypot(x2 - x1, y2 - y1) + arc * 1.6;
  const ang = Math.atan2(y2 - my, x2 - mx);
  return (
    <g>
      <DrawPath p={p} length={len} d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />
      {p > 0.95 ? (
        <path
          d={`M ${x2} ${y2} L ${x2 - 22 * Math.cos(ang - 0.5)} ${y2 - 22 * Math.sin(ang - 0.5)} M ${x2} ${y2} L ${x2 - 22 * Math.cos(ang + 0.5)} ${y2 - 22 * Math.sin(ang + 0.5)}`}
          stroke={color}
          strokeWidth={w}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
};

/** Mũi tên chỉ xuống nhún nhảy (về phía ô bình luận). */
const DownArrow: React.FC<{ x: number; y: number; p: number; frame: number }> = ({ x, y, p, frame }) => (
  <Pop p={p} cx={x} cy={y}>
    <g transform={`translate(${x} ${y + Math.abs(Math.sin(frame * 0.18)) * 14})`}>
      <path d="M -16 -44 L 16 -44 L 16 0 L 34 0 L 0 38 L -34 0 L -16 0 Z" fill={INK.red} stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
    </g>
  </Pop>
);

// ---------------------------------------------------------------- Milo: phụ kiện bám đúng chuyển động của Stickman

/**
 * Vẽ thêm đồ lên người Milo theo đúng chuỗi biến đổi trong Stickman.tsx (thở, đung đưa, đi bộ, nghiêng đầu),
 * để mũ bảo hiểm / đuôi áo không lệch khỏi người. `layer`: "body" = toạ độ thân, "head" = toạ độ đầu.
 */
const Rig: React.FC<{ x: number; y: number; s: number; frame: number; layer: "body" | "head"; tilt?: number; enter?: number; from?: number; children: React.ReactNode }> = ({
  x,
  y,
  s,
  frame,
  layer,
  tilt = 0,
  enter = 1,
  from = 320,
  children,
}) => {
  const traveled = enter * Math.abs(from);
  const walkAmp = Math.min(1, Math.max(0, (1 - enter) * 7));
  const phase = (traveled / 58) * Math.PI;
  const dir = from > 0 ? -1 : 1;
  const dx = (1 - enter) * from;
  const bob = -Math.abs(Math.sin(phase)) * 4 * walkAmp;
  const lean = dir * 4 * walkAmp;
  const breath = Math.sin(frame * 0.11) * 1.8;
  const sway = Math.sin(frame * 0.045) * 1.2;
  const headTilt = tilt + Math.sin(frame * 0.07) * 2.5 + Math.sin(frame * 0.19) * 1.2;
  return (
    <g transform={`translate(${x + dx} ${y}) scale(${s * 1.32})`}>
      <g transform={`rotate(${lean + sway * 0.3})`}>
        <g transform={`translate(0 ${bob + breath * 0.5})`}>
          {layer === "body" ? children : <g transform={`translate(0 ${-172 + breath * 0.4}) rotate(${headTilt})`}>{children}</g>}
        </g>
      </g>
    </g>
  );
};

/** Mũ bảo hiểm xe máy (toạ độ đầu Milo). */
const HelmetShape: React.FC = () => (
  <g>
    <path d="M -50 -46 L -44 -20 Q 0 2 44 -20 L 50 -46" fill="none" stroke="#2B1A0E" strokeWidth={3} />
    <path d="M -54 -74 Q -58 -146 0 -148 Q 58 -146 54 -74 Q 0 -86 -54 -74 Z" fill="#E53935" stroke="#2B1A0E" strokeWidth={3.4} strokeLinejoin="round" />
    <path d="M -30 -136 Q 0 -146 30 -136" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" opacity={0.85} />
    <path d="M -58 -76 Q 0 -90 58 -76 L 60 -68 Q 0 -80 -60 -68 Z" fill="#B71C1C" stroke="#2B1A0E" strokeWidth={2.6} />
    <path d="M -36 -120 Q -30 -134 -14 -138" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={5} strokeLinecap="round" />
  </g>
);

/** Đuôi áo đuôi tôm của Faraday (toạ độ thân, vẽ sau lưng Milo). */
const TailCoat: React.FC = () => (
  <g>
    <path d="M -30 -112 L -50 -22 L -22 -36 L -10 -106 Z" fill="#2F3550" stroke="#2B1A0E" strokeWidth={3} strokeLinejoin="round" />
    <path d="M 30 -112 L 50 -22 L 22 -36 L 10 -106 Z" fill="#2F3550" stroke="#2B1A0E" strokeWidth={3} strokeLinejoin="round" />
  </g>
);

/** Khăn quàng cổ trắng kiểu thế kỷ 19 (toạ độ thân). */
const Cravat: React.FC = () => (
  <g transform="translate(0 -166)">
    <path d="M 0 0 L -12 -7 L -12 7 Z M 0 0 L 12 -7 L 12 7 Z" fill="#FBF6EA" stroke="#2B1A0E" strokeWidth={2.2} strokeLinejoin="round" />
    <path d="M -4 2 L -7 18 L 0 14 L 7 18 L 4 2 Z" fill="#FBF6EA" stroke="#2B1A0E" strokeWidth={2} strokeLinejoin="round" />
  </g>
);

// ---------------------------------------------------------------- ô tô (gốc: giữa mặt đất, đầu xe quay sang trái)

const CAR_BODY =
  "M -315 -70 Q -322 -150 -270 -170 L -165 -192 L -105 -318 Q -98 -332 -80 -334 L 120 -336 Q 142 -336 156 -320 L 228 -200 L 290 -190 Q 326 -180 322 -120 L 320 -70 Q 318 -48 296 -48 L -294 -48 Q -315 -48 -315 -70 Z";
const SOFT_BODY = "M -315 -70 Q -322 -150 -270 -170 L -165 -192 L 228 -200 L 290 -190 Q 326 -180 322 -120 L 320 -70 Q 318 -48 296 -48 L -294 -48 Q -315 -48 -315 -70 Z";
const WIN_F = "M -150 -194 L -98 -316 L 8 -318 L 8 -194 Z";
const WIN_R = "M 28 -194 L 28 -318 L 118 -318 Q 132 -318 140 -306 L 204 -194 Z";
const WHEEL_X = [-190, 200];

/** Hai nhánh dòng sét trên vỏ xe: từ nóc, men theo mái và thành xe, qua bánh xuống đất (toạ độ xe). */
const CUR_F: Pt[] = [
  [0, -336],
  [-80, -334],
  [-105, -318],
  [-165, -192],
  [-270, -170],
  [-312, -125],
  [-315, -72],
  [-250, -52],
  [-190, -52],
  [-190, 0],
];
const CUR_R: Pt[] = [
  [0, -336],
  [120, -336],
  [156, -320],
  [228, -200],
  [290, -190],
  [320, -130],
  [320, -72],
  [260, -52],
  [200, -52],
  [200, 0],
];

const Wheels: React.FC<{ tires?: number; frame: number }> = ({ tires = 0, frame }) => {
  const tp = 0.65 + 0.35 * Math.sin(frame * 0.25);
  return (
    <g>
      {WHEEL_X.map((wx) => (
        <g key={wx}>
          <path d={`M ${wx - 68} -48 A 68 68 0 0 1 ${wx + 68} -48 Z`} fill="#1E1A18" />
          {tires > 0.01 ? <circle cx={wx} cy={-54} r={60} fill="none" stroke="#FF8A3D" strokeWidth={26} opacity={tires * tp} filter="url(#e05-glow)" /> : null}
          <circle cx={wx} cy={-54} r={54} fill="#2A2A2A" stroke={tires > 0.01 ? "#FF8A3D" : INK.line} strokeWidth={4 + tires * 6} />
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1={wx + Math.cos((i * Math.PI) / 6) * 44}
              y1={-54 + Math.sin((i * Math.PI) / 6) * 44}
              x2={wx + Math.cos((i * Math.PI) / 6) * 52}
              y2={-54 + Math.sin((i * Math.PI) / 6) * 52}
              stroke="#4A4A4A"
              strokeWidth={4}
            />
          ))}
          <circle cx={wx} cy={-54} r={28} fill="#C8CDD2" stroke={INK.line} strokeWidth={3} />
          <circle cx={wx} cy={-54} r={8} fill="#7D858C" />
        </g>
      ))}
    </g>
  );
};

/**
 * Ô tô nhìn ngang. kind: "sedan" mui kín (có Milo ngồi trong qua `milo`), "soft" mui trần đã kéo mui vải, "glass" vỏ sợi thủy tinh.
 * `cage` 0..1: vỏ xe sáng lên thành khung lồng Faraday; `tires` 0..1: tô đậm bốn lốp.
 */
const Car: React.FC<{
  id: string;
  x: number;
  y?: number;
  s?: number;
  frame: number;
  kind?: "sedan" | "soft" | "glass";
  milo?: React.ReactNode;
  tires?: number;
  cage?: number;
  color?: string;
}> = ({ id, x, y = GROUND, s = 1, frame, kind = "sedan", milo, tires = 0, cage = 0, color = "#C9483A" }) => {
  const clip = `e05-cab-${id}`;
  const fill = kind === "glass" ? "#E6ECEE" : kind === "soft" ? "#2F8F86" : color;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={335} ry={16} fill="rgba(0,0,0,0.32)" />
      {kind === "soft" ? (
        <g>
          {/* Mui vải đã kéo lên: căng trên các thanh cong */}
          <path d="M -150 -194 L -112 -300 Q -20 -330 90 -318 Q 170 -300 222 -200 Z" fill="#D8C49A" stroke={INK.line} strokeWidth={5} strokeLinejoin="round" />
          {[-60, 20, 100].map((sx) => (
            <path key={sx} d={`M ${sx} -194 Q ${sx + 6} -270 ${sx + 4} -318`} fill="none" stroke="#B49C6E" strokeWidth={4} />
          ))}
          <path d="M -128 -210 L -100 -290 L -40 -298 L -40 -210 Z" fill="rgba(190,225,245,0.5)" stroke={INK.line} strokeWidth={4} />
          <path d={SOFT_BODY} fill={fill} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" />
        </g>
      ) : (
        <g>
          <clipPath id={clip}>
            <path d={`${WIN_F} ${WIN_R}`} />
          </clipPath>
          <g clipPath={`url(#${clip})`}>
            <rect x={-200} y={-340} width={420} height={160} fill="#2B3140" />
            <path d="M -4 -194 L 2 -282 Q 6 -296 20 -296 L 34 -296 L 30 -194 Z" fill="#6B5642" />
            <path d="M 130 -194 L 132 -270 Q 134 -284 148 -284 L 170 -284 L 176 -194 Z" fill="#5A4A3A" />
            {milo}
            <path d={`${WIN_F} ${WIN_R}`} fill="rgba(190,225,245,0.2)" />
            <line x1={-118} y1={-214} x2={-80} y2={-300} stroke="rgba(255,255,255,0.45)" strokeWidth={10} strokeLinecap="round" />
            <line x1={50} y1={-214} x2={80} y2={-300} stroke="rgba(255,255,255,0.3)" strokeWidth={8} strokeLinecap="round" />
          </g>
          <path d={`${CAR_BODY} ${WIN_F} ${WIN_R}`} fillRule="evenodd" fill={fill} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" />
          {kind === "glass" ? <path d={CAR_BODY} fill="url(#e05-fiber)" opacity={0.7} /> : null}
          <path d={`${WIN_F} ${WIN_R}`} fill="none" stroke={INK.line} strokeWidth={4} />
        </g>
      )}
      {/* Chi tiết: khe cửa, tay nắm, đèn, cản */}
      <line x1={18} y1={-194} x2={18} y2={-62} stroke={INK.line} strokeWidth={3} />
      <line x1={-158} y1={-192} x2={-168} y2={-62} stroke={INK.line} strokeWidth={3} />
      <rect x={-40} y={-172} width={36} height={9} rx={4} fill="rgba(0,0,0,0.35)" />
      <rect x={60} y={-172} width={36} height={9} rx={4} fill="rgba(0,0,0,0.35)" />
      <line x1={-300} y1={-122} x2={312} y2={-122} stroke="rgba(0,0,0,0.18)" strokeWidth={6} />
      <ellipse cx={-302} cy={-140} rx={12} ry={16} fill="#FFE9A0" stroke={INK.line} strokeWidth={3} />
      <rect x={306} y={-162} width={14} height={30} rx={4} fill="#E53935" stroke={INK.line} strokeWidth={3} />
      <rect x={-326} y={-92} width={62} height={20} rx={8} fill="#B9BEC4" stroke={INK.line} strokeWidth={3} />
      <rect x={270} y={-92} width={58} height={20} rx={8} fill="#B9BEC4" stroke={INK.line} strokeWidth={3} />
      <Wheels tires={tires} frame={frame} />
      {cage > 0.01 ? (
        <g opacity={cage}>
          <path d={CAR_BODY} fill="url(#e05-mesh)" />
          <path d={CAR_BODY} fill="none" stroke="#FFD54A" strokeWidth={18} opacity={0.7} filter="url(#e05-glow)" />
          <path d={`${CAR_BODY} ${WIN_F} ${WIN_R}`} fill="none" stroke="#FFE98A" strokeWidth={6} strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
};

/** Milo ngồi sau vô lăng (toạ độ xe). */
const Driver: React.FC<PoseState & { o?: number }> = ({ o = 1, ...pose }) =>
  o <= 0.01 ? null : (
    <g opacity={o}>
      <Stickman x={-62} y={-46} scale={0.66} {...pose} />
      <path d="M -150 -205 L -118 -232" stroke="#222" strokeWidth={10} strokeLinecap="round" />
    </g>
  );

/** Toạ độ khung của các điểm trên xe (xe tại x, mặt đất, tỉ lệ s). */
const carPts = (pts: Pt[], x: number, s: number, y = GROUND): Pt[] => pts.map(([px, py]) => [x + px * s, y + py * s]);

// ---------------------------------------------------------------- phông nền

const StormCloud: React.FC<{ x: number; y: number; s?: number; fill?: string; rim?: string }> = ({ x, y, s = 1, fill = "#3B4258", rim = "#5A627C" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M -160 34 Q -196 -6 -140 -30 Q -130 -84 -64 -74 Q -32 -122 32 -96 Q 94 -118 116 -64 Q 178 -64 168 -12 Q 200 20 158 42 Z"
      fill={fill}
      stroke={rim}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path d="M -120 20 Q -60 34 0 22 Q 60 36 130 22" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={8} strokeLinecap="round" />
  </g>
);

/** Đêm giông trên đường quê: trời tím than, mây giông, ruộng tối, mặt đường có vạch giữa. */
const NightRoad: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={40} y={80} width={900} height={700} fill="url(#e05-night)" />
    <StormCloud x={250 + wave(frame, 0.012, 14)} y={160} s={1.25} />
    <StormCloud x={720 + wave(frame, 0.01, 16, 1)} y={140} s={1.05} fill="#353B50" />
    <path d="M 40 640 Q 250 600 480 628 Q 700 592 940 622 L 940 780 L 40 780 Z" fill="#2C4632" />
    {[656, 676, 698, 718].map((y, i) => (
      <path key={y} d={`M 40 ${y} Q 480 ${y - 10 - i * 2} 940 ${y}`} fill="none" stroke="rgba(120,170,100,0.35)" strokeWidth={4} />
    ))}
    <rect x={40} y={732} width={900} height={48} fill="#45464C" />
    <line x1={40} y1={733} x2={940} y2={733} stroke="#24252A" strokeWidth={3} />
    <line x1={40} y1={758} x2={940} y2={758} stroke="#E8D9A0" strokeWidth={5} strokeDasharray="44 30" opacity={0.7} />
  </g>
);

/** Phông sáng nhẹ cho các cảnh giải thích (giấy da, đồi xa). */
const SoftBg: React.FC = () => (
  <g>
    <rect x={40} y={80} width={900} height={700} fill="rgba(200,150,90,0.08)" />
    <path d="M 40 690 Q 220 610 400 680 Q 580 620 760 690 Q 860 650 940 670 L 940 780 L 40 780 Z" fill="rgba(160,120,70,0.16)" />
  </g>
);

// ---------------------------------------------------------------- hồi 1: mở đầu

const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  const boltP = li === 0 ? ease(lf, 12, 10) : 0;
  const boltO = li === 0 ? 1 - ease(lf, 42, 16) : 0;
  const flash = li === 0 ? ease(lf, 21, 3) * (1 - ease(lf, 24, 22)) : 0;
  const q = li === 0 ? pop(lf, fps, 50) : li === 1 ? 1 - ease(lf, 0, 12) : 0;
  const z = li === 1 ? ease(lf, 0, 26) : li === 2 ? 1 - ease(lf, 0, 22) : 0;
  const tires = li === 1 ? ease(lf, 22, 14) : li === 2 ? 1 - ease(lf, 0, 16) : 0;
  const away = li === 2 ? ease(lf, 0, 28) : 0;
  const carX = interpolate(away, [0, 1], [450, 250]);
  const carS = 1 - away * 0.45;
  const zoom = 1 + 0.45 * z;
  const driver: PoseState = li === 0 ? chain(lf, undefined, [[0, "idle"], [48, "scratch"]]) : { pose: "think", prevPose: "scratch", poseT: ease(lf, 0, 12) };
  const tireAt = (wx: number): Pt => [450 + wx * zoom, 740 + (726 - 740) * zoom];
  const cards: [string, string][] = [
    ["SÉT ĐÁNH TRÚNG NÓC Ô TÔ", "Người bên trong vẫn bình an?"],
    ["LỜI GIẢI THÍCH QUEN THUỘC", "Nhờ 4 lốp cao su cách điện?"],
    ["CÒN BẠN? GHI VÀO BÌNH LUẬN", "Tin được · Tin đồn · Tùy?"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  const cells: [string, string, string][] = [
    ["TIN", "ĐƯỢC", INK.green],
    ["TIN", "ĐỒN", INK.red],
    ["TÙY", "?", INK.blue],
  ];
  return (
    <g>
      <g transform={zoomT(zoom, 450, 740)}>
        <NightRoad frame={frame} />
        <Bolt pts={zigzag(470, 96, 450, GROUND - 336, 3, 10, 34)} p={boltP} o={boltO} />
        <Car id="h" x={carX} s={carS} frame={frame} tires={tires} milo={<Driver {...driver} o={1 - away} />} />
      </g>
      <Flash a={flash * 0.9} />
      {/* Dấu hỏi lớn trên nóc xe */}
      <Pop p={q} cx={450} cy={340}>
        <text x={450 + wave(frame, 0.1, 4)} y={400} textAnchor="middle" fill={BOLT} stroke={INK.line} strokeWidth={5} paintOrder="stroke" fontSize={150} {...T}>
          ?
        </text>
      </Pop>
      {li === 1 ? (
        <g>
          <Tag x={450} y={150} lines={["CAO SU = CÁCH ĐIỆN?"]} size={46} color={INK.red} border={INK.red} p={pop(lf, fps, 34)} />
          <Arrow x1={330} y1={232} x2={tireAt(WHEEL_X[0])[0] + 20} y2={tireAt(WHEEL_X[0])[1] - 90} p={ease(lf, 42, 14)} color="#FF8A3D" w={8} />
          <Arrow x1={570} y1={232} x2={tireAt(WHEEL_X[1])[0] - 20} y2={tireAt(WHEEL_X[1])[1] - 90} p={ease(lf, 46, 14)} color="#FF8A3D" w={8} />
        </g>
      ) : null}
      {li === 2 ? (
        <g>
          <Pop p={pop(lf, fps, 26)} cx={360} cy={225}>
            <rect x={96} y={140} width={534} height={176} rx={18} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
            {cells.map(([a, b, c], i) => (
              <g key={a + b}>
                <rect x={112 + i * 172} y={156} width={158} height={144} rx={12} fill={c} stroke={INK.line} strokeWidth={3} />
                <text x={191 + i * 172} y={218} textAnchor="middle" fill="#FFFFFF" fontSize={46} {...T}>
                  {a}
                </text>
                <text x={191 + i * 172} y={272} textAnchor="middle" fill="#FFFFFF" fontSize={46} {...T}>
                  {b}
                </text>
              </g>
            ))}
          </Pop>
          <DownArrow x={540} y={400} p={pop(lf, fps, 50)} frame={frame} />
          <Stickman x={MILO_X} y={GROUND} enter={ease(lf, 4, 36)} from={300} {...chain(lf, undefined, [[0, "idle"], [42, "point"]])} />
        </g>
      ) : null}
      <Rain frame={frame} />
      <Card title={title} formula={formula} p={1} fp={li === 0 ? 1 : pop(lf, fps, 0)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: rào cản

const Glove: React.FC<{ x: number; y: number; r: number; flip?: boolean }> = ({ x, y, r, flip }) => {
  const G = "#F2C230";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${flip ? -1 : 1} 1)`}>
      {[-36, -16, 4, 24].map((fx, i) => (
        <rect key={fx} x={fx} y={-118 + (i === 0 || i === 3 ? 22 : 0)} width={19} height={92} rx={9.5} fill={G} stroke={INK.line} strokeWidth={4} />
      ))}
      <ellipse cx={-52} cy={6} rx={15} ry={38} transform="rotate(-32 -52 6)" fill={G} stroke={INK.line} strokeWidth={4} />
      <rect x={-46} y={-56} width={94} height={104} rx={32} fill={G} stroke={INK.line} strokeWidth={4} />
      <rect x={-40} y={40} width={82} height={92} rx={12} fill="#E0A82E" stroke={INK.line} strokeWidth={4} />
      {[64, 84, 104].map((ry) => (
        <line key={ry} x1={-34} y1={ry} x2={36} y2={ry} stroke="#B9861B" strokeWidth={3} />
      ))}
      <path d="M -26 -40 Q -30 0 -18 30" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={7} strokeLinecap="round" />
    </g>
  );
};

const Barrier: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const gloves = li === 0 ? ease(lf, 2, 18) : li === 1 ? 1 - ease(lf, 0, 16) : 0;
  const flip = li === 1 ? ease(lf, 6, 22) : 0;
  const panel = li === 2 ? ease(lf, 0, 16) : 0;
  const tire = li === 3 ? ease(lf, 0, 16) : 0;
  const cards: [string, string, boolean][] = [
    ["NGHE RẤT XUÔI TAI", "Cao su là chất cách điện ✔", true],
    ["CƠ QUAN KHÍ TƯỢNG QUỐC GIA MỸ", "Xếp vào hàng: LỜI ĐỒN", false],
    ["KHÔNG KHÍ CŨNG CÁCH ĐIỆN", "Sét vẫn xé toạc hàng km!", false],
    ["SÉT LUỒN QUA LÕI THÉP", "Lốp còn hay bị sét phá hỏng", false],
  ];
  const [title, formula, ok] = cards[Math.min(li, 3)];
  const pose: PoseState =
    li === 0
      ? chain(lf, undefined, [[0, "think"], [30, "present"]])
      : li === 1
        ? chain(lf, "present", [[0, "point"]])
        : li === 2
          ? chain(lf, "point", [[0, "think"], [52, "point"]])
          : chain(lf, "point", [[0, "scratch"], [60, "point"]]);
  // Mặt cắt lốp (câu 4)
  const TC: Pt = [350, 556];
  const arc = (side: 1 | -1): Pt[] => [
    ...Array.from({ length: 13 }, (_, k) => {
      const a = -Math.PI / 2 + side * (k / 12) * Math.PI;
      return [TC[0] + Math.cos(a) * 190, TC[1] + Math.sin(a) * 190] as Pt;
    }),
    [TC[0], 778],
  ];
  const strike = li === 3 ? ease(lf, 4, 10) : 0;
  const flowP = li === 3 ? ease(lf, 14, 24) : 0;
  const smoke = li === 3 ? ease(lf, 34, 20) : 0;
  return (
    <g>
      <SoftBg />
      {/* Câu 1: đôi găng cao su thợ điện */}
      {gloves > 0.01 ? (
        <g opacity={gloves} transform={`translate(${(1 - gloves) * -260} 0)`}>
          <Glove x={210} y={420} r={-14} />
          <Glove x={430} y={430} r={12} flip />
          <Tag x={320} y={600} lines={["CÁCH ĐIỆN ✔"]} size={48} color={INK.green} border={INK.green} p={li === 0 ? pop(lf, fps, 30) : 1} />
        </g>
      ) : null}
      {/* Câu 2: tờ giấy "Lời đồn về sét" lật ra, đóng dấu LỜI ĐỒN */}
      {flip > 0.01 ? (
        <g transform={`translate(330 440) scale(${flip} 1) rotate(${(1 - flip) * -10})`}>
          <rect x={-226} y={-274} width={460} height={548} rx={10} fill="rgba(0,0,0,0.2)" />
          <rect x={-234} y={-282} width={460} height={548} rx={10} fill="#FBF3DC" stroke={INK.line} strokeWidth={4} />
          <rect x={-234} y={-282} width={460} height={92} rx={10} fill={INK.blue} stroke={INK.line} strokeWidth={4} />
          <text x={-4} y={-222} textAnchor="middle" fill="#FFFFFF" fontSize={44} {...T}>
            LỜI ĐỒN VỀ SÉT
          </text>
          <text x={-4} y={-146} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
            CƠ QUAN KHÍ TƯỢNG
          </text>
          <text x={-4} y={-108} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
            QUỐC GIA MỸ
          </text>
          {[-62, -36].map((ly) => (
            <line key={ly} x1={-196} y1={ly} x2={186} y2={ly} stroke={INK.soft} strokeWidth={6} />
          ))}
          <rect x={-212} y={-6} width={420 * ease(lf, 24, 14)} height={124} rx={10} fill="rgba(255,226,122,0.7)" />
          <text x={-4} y={44} textAnchor="middle" fill={INK.line} fontSize={40} {...T}>
            Lốp cao su bảo vệ
          </text>
          <text x={-4} y={96} textAnchor="middle" fill={INK.line} fontSize={40} {...T}>
            bạn khỏi sét
          </text>
          {[160, 186, 212].map((ly) => (
            <line key={ly} x1={-196} y1={ly} x2={ly === 212 ? 60 : 186} y2={ly} stroke={INK.soft} strokeWidth={6} />
          ))}
        </g>
      ) : null}
      {li === 1 ? <Stamp x={330} y={612} text="LỜI ĐỒN" p={ease(lf, 44, 8)} size={60} rot={-10} /> : null}
      {/* Câu 3: cột không khí cao hàng km giữa mây giông và mặt đất */}
      {panel > 0.01 ? (
        <g opacity={panel}>
          <rect x={80} y={108} width={590} height={672} rx={14} fill="url(#e05-air)" stroke={INK.line} strokeWidth={4} />
          <rect x={80} y={742} width={590} height={38} fill="#8A6A43" />
          <StormCloud x={340} y={168} s={0.95} />
          <Bolt pts={zigzag(330, 210, 330, 738, 5, 11, 36)} p={ease(lf, 10, 22)} o={0.75 + 0.25 * Math.sin(frame * 0.6)} />
          <line x1={118} y1={214} x2={118} y2={738} stroke={INK.line} strokeWidth={5} />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={106} y1={214 + i * 52.4} x2={i % 5 === 0 ? 140 : 130} y2={214 + i * 52.4} stroke={INK.line} strokeWidth={4} />
          ))}
          <path d="M 106 230 L 118 210 L 130 230 M 106 722 L 118 742 L 130 722" fill="none" stroke={INK.line} strokeWidth={5} />
          <Tag x={530} y={300} lines={["HÀNG KM", "KHÔNG KHÍ", "= CÁCH ĐIỆN"]} size={36} w={250} p={pop(lf, fps, 34)} />
          {/* Lớp lốp mỏng xíu đặt ở chân tia sét để so */}
          <rect x={296} y={732} width={68} height={9} rx={3} fill="#1E1E1E" opacity={ease(lf, 50, 8)} />
          <Arrow x1={470} y1={668} x2={372} y2={728} p={ease(lf, 54, 12)} color={INK.red} w={6} />
          <Fade p={ease(lf, 54, 12)}>
            <text x={520} y={672} textAnchor="middle" fill={INK.red} fontSize={46} {...T}>
              LỐP
            </text>
          </Fade>
        </g>
      ) : null}
      {/* Câu 4: mặt cắt lốp, sét luồn qua lõi thép xuống đất, lốp xì khói */}
      {tire > 0.01 ? (
        <g opacity={tire}>
          <circle cx={TC[0]} cy={TC[1]} r={222} fill="#2C2C2C" stroke={INK.line} strokeWidth={5} />
          {Array.from({ length: 28 }, (_, i) => (
            <rect key={i} x={TC[0] - 9} y={TC[1] - 226} width={18} height={20} rx={3} fill="#1A1A1A" transform={`rotate(${i * (360 / 28)} ${TC[0]} ${TC[1]})`} />
          ))}
          <circle cx={TC[0]} cy={TC[1]} r={204} fill="none" stroke="#4A4A4A" strokeWidth={30} />
          {[198, 190, 182].map((r) => (
            <circle key={r} cx={TC[0]} cy={TC[1]} r={r} fill="none" stroke="#C3CCD3" strokeWidth={3.5} strokeDasharray="26 6" />
          ))}
          <circle cx={TC[0]} cy={TC[1]} r={128} fill="#C8CDD2" stroke={INK.line} strokeWidth={5} />
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x={TC[0] - 12} y={TC[1] - 112} width={24} height={70} rx={10} fill="#9AA3AA" transform={`rotate(${i * 72} ${TC[0]} ${TC[1]})`} />
          ))}
          <circle cx={TC[0]} cy={TC[1]} r={30} fill="#7D858C" stroke={INK.line} strokeWidth={4} />
          {/* Vết cháy xém */}
          {smoke > 0.01
            ? [-0.9, -0.2, 0.6].map((a) => <ellipse key={a} cx={TC[0] + Math.cos(a - 1.3) * 210} cy={TC[1] + Math.sin(a - 1.3) * 210} rx={26} ry={18} fill="#0E0E0E" opacity={smoke * 0.8} />)
            : null}
          <Tag x={175} y={208} lines={["LÕI THÉP"]} size={38} p={pop(lf, fps, 26)} />
          <line x1={200} y1={272} x2={TC[0] - 128} y2={TC[1] - 150} stroke={INK.line} strokeWidth={4} opacity={ease(lf, 30, 8)} />
          <Bolt pts={zigzag(TC[0], 96, TC[0], TC[1] - 222, 9, 6, 26)} p={strike} o={1 - 0.4 * ease(lf, 50, 20)} />
          <Flow pts={arc(1)} p={flowP} frame={frame} w={0.8} />
          <Flow pts={arc(-1)} p={flowP} frame={frame} w={0.8} />
          {Array.from({ length: 6 }, (_, i) => {
            const t = ((frame * 0.8 + i * 16) % 96) / 96;
            return (
              <circle
                key={i}
                cx={TC[0] + (i - 2.5) * 62 + wave(frame, 0.06, 16, i)}
                cy={TC[1] - 200 - t * 230}
                r={22 + t * 34}
                fill="#77716B"
                opacity={smoke * (1 - t) * 0.55}
              />
            );
          })}
          <Tag x={600} y={140} lines={["CAO SU CHẶN SÉT"]} size={36} color={INK.line} p={pop(lf, fps, 40)} />
          <Cross x={600} y={176} r={46} bare p={pop(lf, fps, 58)} />
        </g>
      ) : null}
      <Stickman x={MILO_X + 10} y={GROUND} {...pose} />
      {li === 1 ? (
        <Fade p={ease(lf, 10, 12)}>
          <g transform={`translate(${MILO_X + 10 + 66} ${GROUND - 150 + wave(frame, 0.16, 2.5)}) rotate(12)`}>
            <rect x={-26} y={-36} width={52} height={70} rx={4} fill="#5B7FA6" stroke={INK.line} strokeWidth={3.5} />
            <rect x={-20} y={-30} width={40} height={58} fill="#FBF6EA" />
            {[-18, -8, 2, 12].map((ly) => (
              <line key={ly} x1={-14} y1={ly} x2={14} y2={ly} stroke={INK.soft} strokeWidth={3} />
            ))}
          </g>
        </Fade>
      ) : null}
      <Card title={title} formula={formula} p={pop(bf, fps, 6)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: eureka (lồng Faraday 1836)

/** Giảng đường Viện Hoàng gia: tường gỗ ấm, hàng ghế hình móng ngựa, sàn gỗ. */
const Hall: React.FC = () => (
  <g>
    <rect x={40} y={80} width={900} height={700} fill="#EBD3A4" />
    {[0, 1, 2, 3, 4].map((k) => {
      const rx = 300 + k * 70;
      const ry = 110 + k * 46;
      return (
        <g key={k} opacity={0.75}>
          <path d={`M ${485 - rx} 96 A ${rx} ${ry} 0 0 0 ${485 + rx} 96`} fill="none" stroke="#B5814B" strokeWidth={22} />
          <path d={`M ${485 - rx} 108 A ${rx} ${ry} 0 0 0 ${485 + rx} 108`} fill="none" stroke="#8E5F32" strokeWidth={4} />
        </g>
      );
    })}
    <rect x={40} y={740} width={900} height={40} fill="#A87B4E" />
    <line x1={40} y1={740} x2={940} y2={740} stroke={INK.woodDark} strokeWidth={4} />
  </g>
);

const CF = { x0: 80, x1: 640, y0: 220, y1: 780 };
const CD: Pt = [62, -58];
/** 12 cạnh khung lập phương: 4 cạnh sau, 4 cạnh nối, 4 cạnh trước (thứ tự vẽ dần). */
const CUBE_EDGES: [Pt, Pt][] = (() => {
  const f: Pt[] = [
    [CF.x0, CF.y1],
    [CF.x0, CF.y0],
    [CF.x1, CF.y0],
    [CF.x1, CF.y1],
  ];
  const b: Pt[] = f.map(([x, y]) => [x + CD[0], y + CD[1]]);
  const e: [Pt, Pt][] = [];
  for (let i = 0; i < 4; i++) e.push([b[i], b[(i + 1) % 4]]);
  for (let i = 0; i < 4; i++) e.push([f[i], b[i]]);
  for (let i = 0; i < 4; i++) e.push([f[i], f[(i + 1) % 4]]);
  return e;
})();
const TOP_FACE = `M ${CF.x0} ${CF.y0} L ${CF.x0 + CD[0]} ${CF.y0 + CD[1]} L ${CF.x1 + CD[0]} ${CF.y0 + CD[1]} L ${CF.x1} ${CF.y0} Z`;
const SIDE_FACE = `M ${CF.x1} ${CF.y0} L ${CF.x1 + CD[0]} ${CF.y0 + CD[1]} L ${CF.x1 + CD[0]} ${CF.y1 + CD[1]} L ${CF.x1} ${CF.y1} Z`;
const FRONT_FACE = `M ${CF.x0} ${CF.y0} L ${CF.x1} ${CF.y0} L ${CF.x1} ${CF.y1} L ${CF.x0} ${CF.y1} Z`;

/** Tia lửa trên mặt ngoài lồng: điểm gốc + hướng ra ngoài. */
const CAGE_SPARKS = Array.from({ length: 18 }, (_, k) => {
  const e = k % 3;
  const t = 0.08 + rnd(k * 5) * 0.84;
  if (e === 0) return { x: CF.x0, y: CF.y0 + t * (CF.y1 - CF.y0 - 60), nx: -1, ny: -0.2 };
  if (e === 1) return { x: CF.x0 + CD[0] + t * (CF.x1 - CF.x0), y: CF.y0 + CD[1], nx: 0, ny: -1 };
  return { x: CF.x1 + CD[0], y: CF.y0 + CD[1] + t * (CF.y1 - CF.y0 - 80), nx: 1, ny: -0.1 };
});

/** Lưới dây đồng trên mặt trước: 9 dây dọc rồi 9 dây ngang. */
const MESH_LINES: [Pt, Pt][] = [
  ...Array.from({ length: 9 }, (_, i) => [[CF.x0 + i * 70, CF.y0], [CF.x0 + i * 70, CF.y1]] as [Pt, Pt]),
  ...Array.from({ length: 9 }, (_, j) => [[CF.x0, CF.y0 + j * 70], [CF.x1, CF.y0 + j * 70]] as [Pt, Pt]),
];

/** Máy phát tĩnh điện: hai đĩa kính quay ngược chiều, hai quả cầu đồng phóng tia lửa. */
const Machine: React.FC<{ x: number; frame: number; p: number }> = ({ x, frame, p }) => (
  <Pop p={p} cx={x} cy={640}>
    <rect x={x - 82} y={728} width={164} height={52} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    <rect x={x - 9} y={590} width={18} height={140} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
    {[-1, 1].map((k) => (
      <g key={k} transform={`translate(${x + k * 8} 600) rotate(${frame * 7 * k})`}>
        <circle r={74} fill="rgba(200,230,240,0.55)" stroke={INK.line} strokeWidth={4} />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={46} y={-6} width={22} height={12} rx={3} fill="#C9A45C" stroke={INK.line} strokeWidth={1.5} transform={`rotate(${i * 45})`} />
        ))}
      </g>
    ))}
    <circle cx={x} cy={600} r={12} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
    <line x1={x} y1={600} x2={x + Math.cos(frame * 0.25) * 40} y2={600 + Math.sin(frame * 0.25) * 40} stroke={INK.line} strokeWidth={7} strokeLinecap="round" />
    {[-1, 1].map((k) => (
      <g key={k}>
        <line x1={x + k * 50} y1={728} x2={x + k * 50} y2={482} stroke="#B98A3A" strokeWidth={6} />
        <circle cx={x + k * 50} cy={474} r={17} fill="url(#e05-brass)" stroke={INK.line} strokeWidth={3} />
      </g>
    ))}
    {frame % 10 < 5 ? <Bolt pts={zigzag(x - 34, 474, x + 34, 474, Math.floor(frame / 10), 4, 9)} p={1} w={0.4} color={SPARK} /> : null}
  </Pop>
);

/** Điện nghiệm lá vàng đặt trên ghế đẩu (y = mặt ghế). */
const Electroscope: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 54} y={y} width={108} height={14} rx={4} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
    <line x1={x - 40} y1={y + 14} x2={x - 48} y2={GROUND} stroke={INK.woodDark} strokeWidth={8} />
    <line x1={x + 40} y1={y + 14} x2={x + 48} y2={GROUND} stroke={INK.woodDark} strokeWidth={8} />
    <ellipse cx={x} cy={y - 46} rx={48} ry={46} fill="rgba(215,238,248,0.6)" stroke={INK.line} strokeWidth={4} />
    <rect x={x - 16} y={y - 108} width={32} height={22} rx={4} fill="#8D6E4A" stroke={INK.line} strokeWidth={3} />
    <line x1={x} y1={y - 150} x2={x} y2={y - 62} stroke="#B98A3A" strokeWidth={6} />
    <circle cx={x} cy={y - 156} r={13} fill="url(#e05-brass)" stroke={INK.line} strokeWidth={3} />
    <path
      d={`M ${x - 3} ${y - 62} L ${x - 5} ${y - 18} L ${x - 1} ${y - 18} Z M ${x + 3} ${y - 62} L ${x + 5} ${y - 18} L ${x + 1} ${y - 18} Z`}
      fill="#F2C230"
      stroke="#B9861B"
      strokeWidth={1.5}
    />
    <path d={`M ${x - 30} ${y - 70} Q ${x - 36} ${y - 46} ${x - 24} ${y - 24}`} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={5} strokeLinecap="round" />
  </g>
);

/** Ngọn nến cháy đứng thẳng trên ghế đẩu. */
const Candle: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => {
  const fl = 1 + Math.sin(frame * 0.5) * 0.04;
  return (
    <g>
      <rect x={x - 44} y={y} width={88} height={14} rx={4} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
      <line x1={x - 32} y1={y + 14} x2={x - 40} y2={GROUND} stroke={INK.woodDark} strokeWidth={8} />
      <line x1={x + 32} y1={y + 14} x2={x + 40} y2={GROUND} stroke={INK.woodDark} strokeWidth={8} />
      <ellipse cx={x} cy={y - 2} rx={30} ry={8} fill="#C9A45C" stroke={INK.line} strokeWidth={3} />
      <rect x={x - 14} y={y - 100} width={28} height={98} rx={4} fill="#FBF3DC" stroke={INK.line} strokeWidth={3} />
      <line x1={x} y1={y - 100} x2={x} y2={y - 112} stroke={INK.line} strokeWidth={3} />
      <circle cx={x} cy={y - 130} r={34} fill="rgba(255,214,102,0.35)" />
      <g transform={`translate(${x} ${y - 110}) scale(1 ${fl})`}>
        <path d="M 0 -48 Q 16 -18 12 -4 Q 8 6 0 6 Q -8 6 -12 -4 Q -16 -18 0 -48 Z" fill="#FFB238" stroke="#C26A12" strokeWidth={2.5} />
        <path d="M 0 -26 Q 7 -10 5 -2 Q 0 4 -5 -2 Q -7 -10 0 -26 Z" fill="#FFF3B0" />
      </g>
    </g>
  );
};

const Eureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const hall = li === 0 ? 0 : li === 1 ? ease(lf, 0, 20) : 1;
  const beams = li === 1 ? ease(lf, 14, 40) : li > 1 ? 1 : 0;
  const meshT = li === 2 ? lf : li > 2 ? 999 : -1;
  const paper = li === 2 ? ease(lf, 30, 10) : li > 2 ? 1 : 0;
  const foilAll = li === 2 ? ease(lf, 56, 10) : li > 2 ? 1 : 0;
  const seeIn = li === 3 ? ease(lf, 0, 14) : 0;
  const section = li === 4 ? ease(lf, 0, 16) : 0;
  const cube3d = 1 - section;
  const machine = li === 3 ? pop(lf, fps, 40) : li > 3 ? 1 : 0;
  const sparks = li === 3 ? ease(lf, 50, 8) : li === 4 ? 0.65 : 0;
  const miloX = li >= 3 ? 360 : MILO_X;
  const cards: [string, string][] = [
    ["THỨ GÌ CHE CHỞ?", "Chính lớp vỏ bao quanh!"],
    ["MICHAEL FARADAY · LONDON 1836", "Lồng lập phương, cạnh ≈ 3,7 m"],
    ["KHUNG GỖ + LƯỚI ĐỒNG + GIẤY + LÁ THIẾC", "Một lớp vỏ kim loại kín"],
    ["THEO CHÍNH FARADAY KỂ LẠI", "Mặt ngoài nạp điện cực mạnh"],
    ["ĐIỆN NGHIỆM, NẾN: KHÔNG ĐỘNG TĨNH", "Điện chỉ nằm ở lớp vỏ ngoài!"],
  ];
  const [title, formula] = cards[Math.min(li, 4)];
  const pose: PoseState =
    li === 1
      ? chain(lf, undefined, [[0, "idle"], [42, "present"]])
      : li === 2
        ? chain(lf, "present", [[0, "point"]])
        : li === 3
          ? chain(lf, "point", [[0, "idle"], [50, "present"]])
          : chain(lf, "present", [[0, "think"], [36, "eureka"]]);
  const miloEnter = li === 1 ? ease(lf, 8, 30) : li === 3 ? ease(lf, 6, 40) : 1;
  const miloFrom = li === 3 ? MILO_X - 360 : 300;
  // Mũi bút vẽ lưới đồng đang ở đâu
  const meshK = Math.min(MESH_LINES.length - 1, Math.max(0, Math.floor(meshT / 1.6)));
  const meshTip = (() => {
    const [a, b] = MESH_LINES[meshK];
    const p = ease(meshT, meshK * 1.6, 6);
    return [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p] as Pt;
  })();
  const pencil = li === 2 ? ease(lf, 0, 6) * (1 - ease(lf, 34, 8)) : 0;
  const milo = (
    <>
      <Rig x={miloX} y={GROUND} s={0.8} frame={frame} layer="body" enter={miloEnter} from={miloFrom}>
        <TailCoat />
      </Rig>
      <Stickman x={miloX} y={GROUND} scale={0.8} enter={miloEnter} from={miloFrom} {...pose} />
      <Rig x={miloX} y={GROUND} s={0.8} frame={frame} layer="body" enter={miloEnter} from={miloFrom}>
        <Cravat />
      </Rig>
    </>
  );
  return (
    <g>
      {hall < 1 ? (
        <g opacity={1 - hall}>
          <NightRoad frame={frame} />
          <Car
            id="e"
            x={470}
            s={0.85}
            frame={frame}
            cage={li === 0 ? ease(lf, 34, 12) * (1 - 0.3 * ease(lf, 52, 16)) : 1}
            milo={<Driver {...chain(lf, undefined, [[0, "think"], [40, "eureka"]])} />}
          />
          <Rain frame={frame} />
          <Tag x={470} y={150} lines={["THỨ GÌ CHE CHỞ?"]} size={50} color={INK.red} p={pop(lf, fps, 4)} />
          <Tag x={250} y={300} lines={["LỚP VỎ!"]} size={50} color={INK.green} border={INK.green} p={li === 0 ? pop(lf, fps, 44) : 1} />
          <Arrow x1={300} y1={380} x2={360} y2={GROUND - 300} p={li === 0 ? ease(lf, 50, 12) : 1} color={INK.green} w={7} />
        </g>
      ) : null}
      {hall > 0.01 ? (
        <g opacity={hall}>
          <Hall />
          {cube3d > 0.01 ? (
            <g opacity={cube3d}>
              {/* Lòng lồng (thấy được khi mặt trước trong suốt) */}
              {seeIn > 0.01 ? <rect x={CF.x0 + CD[0]} y={CF.y0 + CD[1]} width={CF.x1 - CF.x0} height={CF.y1 - CF.y0} fill="rgba(70,55,40,0.25)" opacity={seeIn} /> : null}
              {CUBE_EDGES.slice(0, 8).map(([a, b], i) => (
                <DrawLine key={i} p={ease(beams * 40, i * 2.2, 10)} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK.woodDark} strokeWidth={i < 4 ? 8 : 10} strokeLinecap="round" />
              ))}
              {li === 3 ? milo : null}
              {/* Mặt trên + mặt bên: giấy rồi lá thiếc */}
              {paper > 0.01 ? (
                <g opacity={1 - seeIn * 0.55}>
                  <path d={TOP_FACE} fill="#F3E6C6" opacity={paper * 0.9} />
                  <path d={SIDE_FACE} fill="#E5D3AA" opacity={paper * 0.9} />
                  <path d={TOP_FACE} fill="url(#e05-foil)" opacity={foilAll} />
                  <path d={SIDE_FACE} fill="url(#e05-foil-dark)" opacity={foilAll} />
                  <path d={TOP_FACE} fill="url(#e05-copper)" opacity={paper * (1 - foilAll) * 0.8} />
                  <path d={SIDE_FACE} fill="url(#e05-copper)" opacity={paper * (1 - foilAll) * 0.8} />
                </g>
              ) : null}
              {/* Mặt trước: giấy + dải lá thiếc */}
              <g opacity={1 - seeIn * 0.62}>
                {paper > 0.01 ? <path d={FRONT_FACE} fill="#F7ECCF" opacity={paper * 0.9} /> : null}
                {Array.from({ length: 6 }, (_, i) => {
                  const h = li === 2 ? ease(lf, 38 + i * 4, 10) : li > 2 ? 1 : 0;
                  return h > 0.01 ? (
                    <rect key={i} x={CF.x0 + 6 + i * 92.4} y={CF.y0} width={86} height={(CF.y1 - CF.y0) * h} fill="url(#e05-foil)" stroke="rgba(90,100,110,0.5)" strokeWidth={2} />
                  ) : null;
                })}
              </g>
              {/* Lưới dây đồng vẽ dần */}
              {meshT >= 0
                ? MESH_LINES.map(([a, b], k) => (
                    <DrawLine key={k} p={ease(meshT, k * 1.6, 6)} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#C46A2A" strokeWidth={4} opacity={1 - foilAll * 0.6} />
                  ))
                : null}
              {CUBE_EDGES.slice(8).map(([a, b], i) => (
                <DrawLine key={i} p={ease(beams * 40, 18 + i * 2.2, 10)} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK.wood} strokeWidth={14} strokeLinecap="round" />
              ))}
              {/* Lấp lánh lá thiếc */}
              {foilAll > 0.5
                ? Array.from({ length: 6 }, (_, i) => {
                    const tw = Math.max(0, Math.sin(frame * 0.2 + i * 1.7));
                    const sx = CF.x0 + 60 + rnd(i * 9) * 460;
                    const sy = CF.y0 + 40 + rnd(i * 4 + 1) * 480;
                    return (
                      <path
                        key={i}
                        d={`M ${sx} ${sy - 16 * tw} L ${sx + 4} ${sy} L ${sx} ${sy + 16 * tw} L ${sx - 4} ${sy} Z M ${sx - 16 * tw} ${sy} L ${sx} ${sy - 4} L ${sx + 16 * tw} ${sy} L ${sx} ${sy + 4} Z`}
                        fill="#FFFFFF"
                        opacity={(1 - seeIn) * 0.9}
                      />
                    );
                  })
                : null}
              {/* Thước đo cạnh */}
              {li === 1 ? (
                <Fade p={ease(lf, 40, 14)}>
                  <line x1={CF.x0 + 14} y1={262} x2={CF.x1 - 14} y2={262} stroke={INK.red} strokeWidth={5} />
                  <path d={`M ${CF.x0 + 34} 248 L ${CF.x0 + 14} 262 L ${CF.x0 + 34} 276 M ${CF.x1 - 34} 248 L ${CF.x1 - 14} 262 L ${CF.x1 - 34} 276`} fill="none" stroke={INK.red} strokeWidth={5} />
                  <Tag x={360} y={290} lines={["≈ 3,7 m"]} size={58} color={INK.red} border={INK.red} p={pop(lf, fps, 46)} />
                </Fade>
              ) : null}
              {li === 2 ? <Tag x={360} y={440} lines={["VỎ KIM LOẠI"]} size={56} color={INK.red} border={INK.red} p={pop(lf, fps, 64)} /> : null}
              {/* Bàn tay cầm bút vẽ lưới */}
              {pencil > 0.01 ? (
                <g opacity={pencil} transform={`translate(${meshTip[0]} ${meshTip[1]}) rotate(-35)`}>
                  <rect x={-6} y={-70} width={12} height={58} fill="#F2C230" stroke={INK.line} strokeWidth={2.5} />
                  <path d="M -6 -12 L 0 4 L 6 -12 Z" fill="#E8C9A0" stroke={INK.line} strokeWidth={2.5} />
                  <ellipse cx={0} cy={-70} rx={22} ry={18} fill="#EBB892" stroke={INK.line} strokeWidth={3} />
                  <rect x={-18} y={-120} width={36} height={44} rx={10} fill="#2F3550" stroke={INK.line} strokeWidth={3} />
                </g>
              ) : null}
            </g>
          ) : null}
          {/* Câu 5: mặt cắt lồng — điện tích + chỉ ở lớp vỏ ngoài, bên trong trống trơn */}
          {section > 0.01 ? (
            <g opacity={section}>
              <rect x={110} y={232} width={500} height={548} fill="rgba(255,248,230,0.55)" />
              <rect x={110} y={232} width={500} height={548} fill="none" stroke="url(#e05-foil-dark)" strokeWidth={22} />
              <rect x={110} y={232} width={500} height={548} fill="none" stroke={INK.line} strokeWidth={3} />
              {[
                ...Array.from({ length: 8 }, (_, i) => [80, 270 + i * 66] as Pt),
                ...Array.from({ length: 7 }, (_, i) => [150 + i * 70, 206] as Pt),
                ...Array.from({ length: 8 }, (_, i) => [640, 270 + i * 66] as Pt),
              ].map(([px, py], i) => (
                <Pop key={i} p={pop(lf, fps, 8 + i * 1.3)} cx={px} cy={py}>
                  <text x={px} y={py + 15} textAnchor="middle" fill={INK.red} fontSize={46} {...T}>
                    +
                  </text>
                </Pop>
              ))}
              <Electroscope x={190} y={640} />
              <Candle x={535} y={640} frame={frame} />
              <Tag x={360} y={262} lines={["BÊN TRONG: 0"]} size={52} color={INK.green} border={INK.green} p={pop(lf, fps, 50)} />
            </g>
          ) : null}
          {li === 3 ? (
            <Fade p={ease(lf, 10, 14)}>
              <text x={430} y={132} textAnchor="middle" fill={INK.line} fontSize={36} fontStyle="italic" {...T}>
                “theo chính Faraday kể lại”
              </text>
            </Fade>
          ) : null}
          {machine > 0.01 ? (
            <g>
              <Machine x={810} frame={frame} p={machine} />
              <line x1={760} y1={474} x2={CF.x1 + CD[0]} y2={430} stroke="#C46A2A" strokeWidth={5} opacity={Math.min(1, machine)} />
            </g>
          ) : null}
          {sparks > 0.01 ? (
            <g opacity={sparks}>
              {CAGE_SPARKS.map((s, k) =>
                li === 4 ? (
                  <Spark key={k} x={s.nx < 0 ? 100 : s.nx > 0 ? 620 : s.x * 0.85 + 50} y={s.ny === -1 ? 222 : s.y} nx={s.nx} ny={s.ny} k={k} frame={frame} len={60} />
                ) : (
                  <Spark key={k} {...s} k={k} frame={frame} />
                ),
              )}
            </g>
          ) : null}
          {li !== 3 && li >= 1 ? milo : null}
        </g>
      ) : null}
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: định lý (vật dẫn, vật cách điện → lồng Faraday trên xe)

const Theorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const cols = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const grow = li === 0 ? 0 : li === 1 ? ease(lf, 0, 26) : 1;
  const carS = interpolate(grow, [0, 1], [0.55, 1]);
  const carO = li === 2 ? 1 - ease(lf, 0, 16) : 1;
  const cage = li === 1 ? ease(lf, 20, 14) : li === 2 ? 1 : 0;
  const strike = li === 1 ? ease(lf, 28, 8) : 0;
  const flowP = li === 1 ? ease(lf, 36, 28) : 0;
  const panels = li === 2 ? ease(lf, 6, 18) : 0;
  const cards: [string, string, boolean][] = [
    ["KHTN 8 · BÀI 21", "Kim loại DẪN · cao su CÁCH", true],
    ["VỎ Ô TÔ KÍN = LỒNG FARADAY", "Sét → vỏ kim loại → đất", true],
    ["MUI TRẦN · VỎ SỢI THỦY TINH", "Không che chở được bạn", false],
  ];
  const [title, formula, ok] = cards[Math.min(li, 2)];
  const board = (x: number, head: string, color: string, items: string[], d: number, from: number) => {
    const p = li === 0 ? ease(lf, d, 16) : 1;
    return (
      <g opacity={p * cols} transform={`translate(${(1 - p) * from} 0)`}>
        <rect x={x} y={142} width={380} height={330} rx={16} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
        <rect x={x + 14} y={156} width={352} height={302} rx={10} fill="#FBF3DC" />
        <text x={x + 190} y={212} textAnchor="middle" fill={color} fontSize={40} {...T}>
          {head}
        </text>
        <line x1={x + 40} y1={232} x2={x + 340} y2={232} stroke={color} strokeWidth={4} />
        {items.map((it, i) => (
          <Fade key={it} p={li === 0 ? ease(lf, d + 12 + i * 6, 10) : 1} dy={10}>
            <circle cx={x + 62} cy={290 + i * 62} r={13} fill={color} />
            <text x={x + 90} y={304 + i * 62} fill={INK.line} fontSize={40} {...T}>
              {it}
            </text>
          </Fade>
        ))}
      </g>
    );
  };
  const roofY = GROUND - 336 * carS;
  return (
    <g>
      <NightRoad frame={frame} />
      {carO > 0.01 ? (
        <g opacity={carO}>
          <Bolt pts={zigzag(480, 96, 470, roofY, 21, 8, 30)} p={strike} o={li === 1 ? 1 - 0.75 * ease(lf, 56, 20) : 0.25} />
          <Car id="t" x={470} s={carS} frame={frame} cage={cage} milo={<Driver pose="idle" />} />
          <Flow pts={carPts(CUR_F, 470, carS)} p={flowP} frame={frame} />
          <Flow pts={carPts(CUR_R, 470, carS)} p={flowP} frame={frame} />
          {flowP > 0.98 ? WHEEL_X.map((wx) => <Spark key={wx} x={470 + wx} y={GROUND - 4} nx={wx < 0 ? -0.6 : 0.6} ny={-0.4} k={wx > 0 ? 3 : 8} frame={frame} len={50} />) : null}
          {li === 1 ? <Tag x={470} y={116} lines={["Sét → vỏ kim loại → đất"]} size={40} color={INK.line} p={pop(lf, fps, 66)} /> : null}
        </g>
      ) : null}
      {cols > 0.01 ? (
        <g>
          <text x={470} y={124} textAnchor="middle" fill="#FFE9A8" fontSize={32} {...T} opacity={cols}>
            📖 KHTN 8 · Bài 21
          </text>
          {board(66, "VẬT DẪN ĐIỆN", INK.blue, ["thanh nhôm", "sắt", "đồng"], 4, -240)}
          {board(494, "VẬT CÁCH ĐIỆN", INK.red, ["cao su", "nhựa", "gỗ khô"], 30, 240)}
        </g>
      ) : null}
      {panels > 0.01 ? (
        <g opacity={panels}>
          {[
            { y: 116, cap: "MUI TRẦN (ĐÃ KÉO MUI)", kind: "soft" as const, d: 34 },
            { y: 456, cap: "VỎ SỢI THỦY TINH", kind: "glass" as const, d: 46 },
          ].map(({ y, cap, kind, d }) => (
            <g key={kind} transform={`translate(0 ${(1 - panels) * 40})`}>
              <rect x={70} y={y} width={560} height={318} rx={16} fill="#FBF3DC" stroke={INK.line} strokeWidth={4} />
              <text x={350} y={y + 52} textAnchor="middle" fill={INK.line} fontSize={36} {...T}>
                {cap}
              </text>
              <rect x={86} y={y + 268} width={528} height={34} fill="#5A5B60" />
              <Car id={kind} kind={kind} x={350} y={y + 290} s={0.62} frame={frame} />
              <Stamp x={420} y={y + 200} text="✖ KHÔNG BẢO VỆ" p={ease(lf, d, 8)} size={34} rot={-8} />
            </g>
          ))}
        </g>
      ) : null}
      {li === 2 ? <Stickman x={MILO_X + 15} y={GROUND} scale={0.95} enter={ease(lf, 0, 30)} from={260} {...chain(lf, undefined, [[0, "idle"], [32, "point"]])} /> : null}
      <Rain frame={frame} o={li === 2 ? 0.5 : 0.85} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: đời thực (xe máy giữa đồng)

/** Xe máy nhìn ngang, đầu xe quay sang trái (gốc: giữa mặt đất). `spin`: góc quay bánh. */
const Motorbike: React.FC<{ x: number; spin: number; stand?: boolean }> = ({ x, spin, stand }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <ellipse cx={0} cy={2} rx={150} ry={10} fill="rgba(40,24,10,0.3)" />
    {[-112, 112].map((wx) => (
      <g key={wx} transform={`translate(${wx} -44) rotate(${spin})`}>
        <circle r={44} fill="#262626" stroke={INK.line} strokeWidth={4} />
        <circle r={30} fill="#9AA3AA" stroke={INK.line} strokeWidth={3} />
        {[0, 60, 120].map((a) => (
          <line key={a} x1={-28} y1={0} x2={28} y2={0} stroke="#5E666C" strokeWidth={4} transform={`rotate(${a})`} />
        ))}
        <circle r={7} fill="#5E666C" />
      </g>
    ))}
    {stand ? <line x1={20} y1={-40} x2={0} y2={0} stroke="#555" strokeWidth={6} strokeLinecap="round" /> : null}
    <line x1={-112} y1={-44} x2={-88} y2={-158} stroke="#6D6D6D" strokeWidth={9} strokeLinecap="round" />
    <path d="M 70 -96 L 150 -96 Q 160 -86 150 -76 L 112 -76" fill="#B71C1C" stroke={INK.line} strokeWidth={3} />
    <rect x={-10} y={-58} width={130} height={13} rx={6} fill="#B0B6BC" stroke={INK.line} strokeWidth={3} />
    <rect x={-46} y={-80} width={80} height={40} rx={8} fill="#6D6D6D" stroke={INK.line} strokeWidth={3} />
    <path d="M -84 -118 Q -60 -150 0 -128 L 100 -120 Q 128 -116 120 -92 L 50 -76 L -40 -72 Q -86 -84 -84 -118 Z" fill="#C62828" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -6 -126 Q 46 -144 116 -124 L 110 -112 L 0 -116 Z" fill="#2A2A2A" stroke={INK.line} strokeWidth={3} />
    <ellipse cx={-98} cy={-128} rx={11} ry={15} fill="#FFE9A0" stroke={INK.line} strokeWidth={3} />
    <line x1={-92} y1={-160} x2={-70} y2={-154} stroke={INK.line} strokeWidth={8} strokeLinecap="round" />
    <rect x={10} y={-26} width={44} height={8} rx={4} fill="#444" />
  </g>
);

/** Ruộng lúa chiều giông: trời xám, mây đen, ruộng xanh, bờ ruộng đất nâu. */
const Field: React.FC<{ frame: number; dark?: number }> = ({ frame, dark = 0 }) => (
  <g>
    <rect x={40} y={80} width={900} height={700} fill="url(#e05-dusk)" />
    <StormCloud x={230 + wave(frame, 0.012, 10)} y={172} s={1.45} fill="#424A5E" />
    <StormCloud x={520 + wave(frame, 0.01, 12, 2)} y={128} s={0.9} fill="#545C70" />
    <path d="M 40 560 Q 200 536 380 552 Q 600 530 940 548 L 940 580 L 40 580 Z" fill="#4F6E3A" />
    <rect x={40} y={572} width={900} height={170} fill="#7DAF4A" />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1={40} y1={586 + i * 20} x2={940} y2={586 + i * 20} stroke="#5E9238" strokeWidth={4 + i * 0.6} />
    ))}
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M ${70 + i * 64} 600 l 6 -14 l 6 14`} fill="none" stroke="#9CCB62" strokeWidth={3} />
    ))}
    <rect x={40} y={738} width={900} height={42} fill="#8A6A43" />
    <line x1={40} y1={738} x2={940} y2={738} stroke="#5C4528" strokeWidth={3} />
    {dark > 0.01 ? <rect x={40} y={80} width={900} height={700} fill="#1A2030" opacity={dark} /> : null}
  </g>
);

const Banyan: React.FC<{ x: number }> = ({ x }) => (
  <g>
    <path
      d={`M ${x - 26} ${GROUND} Q ${x - 18} ${GROUND - 150} ${x - 22} ${GROUND - 260} L ${x + 22} ${GROUND - 260} Q ${x + 18} ${GROUND - 150} ${x + 30} ${GROUND} Z`}
      fill="#6E4A2A"
      stroke={INK.line}
      strokeWidth={4}
    />
    {[-70, -40, 40, 72].map((o) => (
      <line key={o} x1={x + o} y1={GROUND - 290} x2={x + o * 0.9} y2={GROUND - 120} stroke="#7A5634" strokeWidth={3} />
    ))}
    {[
      [0, -330, 92],
      [-70, -300, 64],
      [70, -296, 66],
      [-36, -380, 62],
      [42, -376, 58],
    ].map(([dx, dy, r]) => (
      <circle key={`${dx}${dy}`} cx={x + dx} cy={GROUND + dy} r={r} fill="#3E7A3A" stroke={INK.line} strokeWidth={4} />
    ))}
  </g>
);

const Pole: React.FC<{ x: number }> = ({ x }) => (
  <g>
    <path d={`M ${x - 10} ${GROUND} L ${x - 6} ${GROUND - 420} L ${x + 6} ${GROUND - 420} L ${x + 10} ${GROUND} Z`} fill="#B9B4A8" stroke={INK.line} strokeWidth={4} />
    <rect x={x - 54} y={GROUND - 400} width={108} height={12} fill="#8A857A" stroke={INK.line} strokeWidth={3} />
    {[-44, 0, 44].map((o) => (
      <rect key={o} x={x + o - 5} y={GROUND - 414} width={10} height={14} rx={3} fill="#EDEAE0" stroke={INK.line} strokeWidth={2} />
    ))}
    {[-44, 44].map((o) => (
      <path key={o} d={`M 40 ${GROUND - 380} Q ${x / 2} ${GROUND - 350} ${x + o} ${GROUND - 410} Q ${(x + 940) / 2} ${GROUND - 350} 940 ${GROUND - 380}`} fill="none" stroke="#3A3A3A" strokeWidth={2.5} />
    ))}
  </g>
);

const House: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-170} width={180} height={170} fill="#C8714A" stroke={INK.line} strokeWidth={4} />
    {Array.from({ length: 7 }, (_, i) => (
      <line key={i} x1={-90} y1={-150 + i * 24} x2={90} y2={-150 + i * 24} stroke="#A55A37" strokeWidth={2.5} />
    ))}
    <path d="M -112 -166 L 0 -250 L 112 -166 Z" fill="#9C2F22" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-26} y={-96} width={52} height={96} fill="#6E4423" stroke={INK.line} strokeWidth={3} />
    <rect x={40} y={-130} width={38} height={36} fill="#FFE9A0" stroke={INK.line} strokeWidth={3} />
    <rect x={-78} y={-130} width={38} height={36} fill="#FFE9A0" stroke={INK.line} strokeWidth={3} />
  </g>
);

/** Đồng hồ cát lật ngược (flip 0 → 1), cát chảy theo `flow`. */
const Hourglass: React.FC<{ x: number; y: number; flip: number; flow: number }> = ({ x, y, flip, flow }) => {
  const H = 128;
  const W = 92;
  const before = flip < 0.5;
  const topAmt = before ? 0 : 1 - flow;
  return (
    <g transform={`translate(${x} ${y}) rotate(${flip * 180})`}>
      <rect x={-W - 18} y={-H - 26} width={(W + 18) * 2} height={22} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      <rect x={-W - 18} y={H + 4} width={(W + 18) * 2} height={22} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
      {[-1, 1].map((k) => (
        <rect key={k} x={k * (W + 6) - 6} y={-H - 6} width={12} height={H * 2 + 12} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
      ))}
      {/* Cát (toạ độ trước khi lật: buồng dưới là y > 0) */}
      {before ? (
        <path d={`M ${-W * 0.9} ${H - 2} L ${W * 0.9} ${H - 2} L ${W * 0.55} ${H * 0.45} L ${-W * 0.55} ${H * 0.45} Z`} fill="#E3B866" />
      ) : (
        <>
          {topAmt > 0.01 ? <path d={`M 0 8 L ${W * 0.75 * topAmt} ${H * 0.8 * topAmt + 8} L ${-W * 0.75 * topAmt} ${H * 0.8 * topAmt + 8} Z`} fill="#E3B866" /> : null}
          {flow > 0.01 ? (
            <path d={`M ${-W * 0.9} ${-H + 2} L ${W * 0.9} ${-H + 2} L ${W * 0.9 - 30 * flow} ${-H + 2 + 70 * flow} L ${-W * 0.9 + 30 * flow} ${-H + 2 + 70 * flow} Z`} fill="#E3B866" />
          ) : null}
          {flow > 0.01 && topAmt > 0.02 ? <line x1={0} y1={0} x2={0} y2={-H + 70 * flow} stroke="#E3B866" strokeWidth={4} /> : null}
        </>
      )}
      <path d={`M ${-W} ${-H} L ${W} ${-H} L 8 -4 L 8 4 L ${W} ${H} L ${-W} ${H} L -8 4 L -8 -4 Z`} fill="rgba(210,235,245,0.35)" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};

const Realworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const ride = li === 0 ? ease(lf, 0, 60) : 1;
  const bikeX = interpolate(ride, [0, 1], [230, 450]);
  const spin = -(bikeX - 230) * 1.3;
  const outline = li === 0 ? ease(lf, 14, 22) * (1 - ease(lf, 64, 14)) : 0;
  const ring = li === 1 ? ease(lf, 16, 26) : 0;
  const porch = li === 3 ? ease(lf, 0, 18) : 0;
  const onBike = li <= 1;
  const miloX = onBike ? bikeX + 30 : 600;
  const miloY = onBike ? GROUND - 14 : li === 2 ? GROUND - 14 * (1 - ease(lf, 0, 10)) : GROUND;
  const miloFrom = li === 2 ? -120 : 320;
  const miloEnter = li === 2 ? ease(lf, 2, 34) : 1;
  const pose: PoseState = onBike ? { pose: "present" } : li === 2 ? chain(lf, "present", [[0, "idle"], [40, "pointR"]]) : chain(lf, "pointR", [[0, "idle"], [40, "think"]]);
  const cards: [string, string, boolean][] = [
    ["XE MÁY THÌ SAO?", "Không có vỏ = không có lồng", false],
    ["NGHE SẤM = ĐANG TRONG TẦM SÉT", "Sét đánh xa khoảng 16 km", false],
    ["RỜI XE · VÀO NHÀ KIÊN CỐ / Ô TÔ KÍN", "Tránh gốc cây, cột điện", true],
    ["CHỜ CHO CHẮC", "≥ 30 phút sau tiếng sấm cuối", true],
  ];
  const [title, formula, ok] = cards[Math.min(li, 3)];
  const cloud: Pt = [230, 172];
  const R = 700 * ring;
  const ang = 0.35;
  return (
    <g>
      <Field frame={frame} />
      {li === 2 ? (
        <g>
          <Banyan x={180} />
          <Pole x={340} />
          <House x={800} y={740} s={0.95} />
          <Car id="r" x={812} s={0.27} frame={frame} />
          <Cross x={180} y={440} r={38} p={pop(lf, fps, 26)} />
          <Cross x={340} y={470} r={38} p={pop(lf, fps, 34)} />
          <ArcArrow x1={560} y1={360} x2={760} y2={470} arc={70} p={ease(lf, 44, 14)} color={INK.green} w={9} />
          <Check x={800} y={440} r={44} p={pop(lf, fps, 54)} />
          <Check x={880} y={690} r={30} p={pop(lf, fps, 60)} />
        </g>
      ) : null}
      {li <= 2 ? <Motorbike x={bikeX} spin={spin} stand={li === 2} /> : null}
      {porch < 0.5 ? (
        <g opacity={1 - porch * 2}>
          <Stickman x={miloX} y={miloY} scale={0.85} enter={miloEnter} from={miloFrom} {...pose} />
          <Rig x={miloX} y={miloY} s={0.85} frame={frame} layer="head" enter={miloEnter} from={miloFrom}>
            <HelmetShape />
          </Rig>
        </g>
      ) : null}
      {/* Xe máy phủ lên chân Milo khi đang ngồi lái */}
      {onBike ? (
        <g>
          <clipPath id="e05-bike-front">
            <rect x={bikeX - 100} y={GROUND - 152} width={240} height={128} />
          </clipPath>
          <g clipPath="url(#e05-bike-front)">
            <Motorbike x={bikeX} spin={spin} />
          </g>
        </g>
      ) : null}
      {/* Câu 1: viền chấm quanh người vẽ ra rồi biến mất */}
      {outline > 0.01 ? (
        <DrawPath
          p={Math.min(1, outline * 1.4)}
          length={1640}
          d={`M ${bikeX - 120} ${GROUND - 440} L ${bikeX + 190} ${GROUND - 440} L ${bikeX + 190} ${GROUND + 4} L ${bikeX - 170} ${GROUND + 4} L ${bikeX - 170} ${GROUND - 440} Z`}
          fill="none"
          stroke={INK.red}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={li === 0 && lf > 60 ? outline : 1}
        />
      ) : null}
      {li === 0 ? <Tag x={660} y={130} lines={["KHÔNG CÓ VỎ", "= KHÔNG CÓ LỒNG"]} size={42} color={INK.red} border={INK.red} p={pop(lf, fps, 38)} /> : null}
      {/* Câu 2: tiếng sấm, vòng tầm sét quanh đám mây */}
      {li === 1 ? (
        <g>
          {R > 1 ? (
            <g>
              <circle cx={cloud[0]} cy={cloud[1]} r={R} fill="rgba(192,57,43,0.10)" stroke={INK.red} strokeWidth={6} strokeDasharray="18 12" />
              <DrawLine p={ease(lf, 30, 14)} x1={cloud[0]} y1={cloud[1]} x2={cloud[0] + Math.cos(ang) * 700} y2={cloud[1] + Math.sin(ang) * 700} stroke={INK.red} strokeWidth={5} />
              <Tag x={cloud[0] + Math.cos(ang) * 330} y={cloud[1] + Math.sin(ang) * 330 - 36} lines={["≈ 16 km"]} size={44} color={INK.red} border={INK.red} p={pop(lf, fps, 40)} />
            </g>
          ) : null}
          <Pop p={pop(lf, fps, 2)} cx={270} cy={330}>
            <text
              x={270 + wave(frame, 1.7, 3)}
              y={342}
              textAnchor="middle"
              fill="#FFE27A"
              stroke={INK.line}
              strokeWidth={6}
              paintOrder="stroke"
              fontSize={62}
              {...T}
              transform={`rotate(${-6 + wave(frame, 0.9, 2)} 270 330)`}
            >
              ÙNG ÙNG!
            </text>
          </Pop>
          <Tag x={640} y={112} lines={["NGHE SẤM =", "ĐANG TRONG TẦM SÉT"]} size={36} w={440} color={INK.line} p={pop(lf, fps, 56)} />
          {lf > 2 && lf < 14 ? <Bolt pts={zigzag(250, 210, 330, 520, 31, 7, 22)} p={1} o={1 - (lf - 2) / 12} w={0.7} /> : null}
        </g>
      ) : null}
      {/* Câu 4: trú dưới hiên nhà, đồng hồ cát lật ngược */}
      {porch > 0.01 ? (
        <g opacity={porch}>
          <Field frame={frame} dark={0.25} />
          <rect x={600} y={240} width={340} height={540} fill="#C8714A" stroke={INK.line} strokeWidth={4} />
          {Array.from({ length: 21 }, (_, i) => (
            <line key={i} x1={600} y1={262 + i * 25} x2={940} y2={262 + i * 25} stroke="#A55A37" strokeWidth={2.5} />
          ))}
          <rect x={730} y={500} width={130} height={280} fill="#6E4423" stroke={INK.line} strokeWidth={4} />
          <path d="M 420 300 L 940 196 L 940 246 L 440 330 Z" fill="#9C2F22" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={450 + i * 56} y1={318 - i * 11} x2={440 + i * 56} y2={300 - i * 11} stroke="#6E1F16" strokeWidth={3} />
          ))}
          <rect x={452} y={320} width={20} height={460} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
          <rect x={440} y={762} width={500} height={18} fill="#B9A58A" stroke={INK.line} strokeWidth={3} />
          <Stickman x={690} y={GROUND} scale={0.95} {...pose} />
          <Hourglass x={250} y={500} flip={ease(lf, 6, 22)} flow={Math.min(1, Math.max(0, (lf - 30) / 400))} />
          <Tag x={250} y={124} lines={["30 PHÚT SAU", "TIẾNG SẤM CUỐI"]} size={44} color={INK.red} border={INK.red} p={pop(lf, fps, 34)} />
        </g>
      ) : null}
      <Rain frame={frame} o={0.55} n={30} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: vũ trụ (máy bay bị sét đánh → phán quyết)

const PLANE_X = 440;
const PLANE_Y = 500;

/** Máy bay chở khách nhìn ngang, mũi quay sang trái (gốc: giữa thân). */
const Plane: React.FC = () => (
  <g>
    <path d="M 270 -46 L 330 -172 L 372 -172 L 352 -54 Z" fill="#DCE3EA" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 300 -2 L 392 -24 L 402 -10 L 316 18 Z" fill="#C9D2DA" stroke={INK.line} strokeWidth={3.5} strokeLinejoin="round" />
    <path d="M -330 0 Q -332 -40 -270 -46 L 290 -46 Q 340 -46 362 -58 L 360 -20 Q 330 40 260 44 L -270 44 Q -330 40 -330 0 Z" fill="#F1F4F7" stroke={INK.line} strokeWidth={4.5} strokeLinejoin="round" />
    <rect x={-300} y={6} width={600} height={10} fill={INK.blue} />
    <path d="M -306 -16 Q -300 -32 -280 -34 L -258 -34 L -258 -16 Z" fill="#2B3140" stroke={INK.line} strokeWidth={2.5} />
    {Array.from({ length: 15 }, (_, i) => (
      <circle key={i} cx={-210 + i * 32} cy={-16} r={8} fill="#7FB3D5" stroke={INK.line} strokeWidth={2} />
    ))}
    <path d="M -40 26 L 120 26 L 260 168 L 206 176 Z" fill="#D2DAE1" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx={86} cy={74} rx={52} ry={22} fill="#AEB8C0" stroke={INK.line} strokeWidth={3.5} />
    <ellipse cx={40} cy={74} rx={8} ry={18} fill="#4A4F55" />
    {/* Cửa khoang bánh đáp đóng kín dưới bụng */}
    <rect x={-30} y={36} width={84} height={8} rx={3} fill="none" stroke={INK.line} strokeWidth={2.5} strokeDasharray="6 4" />
  </g>
);

const Cosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const sky = li <= 1 ? 1 : 1 - ease(lf, 0, 18);
  const py = PLANE_Y + wave(frame, 0.05, 6);
  const nose: Pt = [PLANE_X - 328, py];
  const strike = li === 0 ? ease(lf, 12, 10) : 0;
  const flash = li === 0 ? ease(lf, 21, 3) * (1 - ease(lf, 24, 20)) : 0;
  const flowP = li === 1 ? ease(lf, 4, 36) : 0;
  const exit = li === 1 ? ease(lf, 40, 8) : 0;
  const gear = li === 1 ? pop(lf, fps, 46) : 0;
  const stamp = li === 2 ? ease(lf, 16, 8) : 0;
  const cage = li === 2 ? ease(lf, 40, 16) : 0;
  const tail: Pt = [PLANE_X + 352, py - 170];
  const hull: Pt[] = [nose, [PLANE_X - 300, py - 38], [PLANE_X - 270, py - 47], [PLANE_X + 270, py - 47], [PLANE_X + 330, py - 172], tail];
  const cards: [string, string][] = [
    ["KỸ SƯ CHỐNG SÉT EDWARD RUPKE", "Mỗi máy bay Mỹ: > 1 lần sét/năm"],
    ["DÒNG ĐIỆN CHẠY DỌC VỎ NHÔM", "Không bánh nào chạm đất!"],
    ["PHÁN QUYẾT: TIN ĐỒN!", "Lớp vỏ kim loại mới che chở bạn"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  const portPose: PoseState = li === 0 ? chain(lf, undefined, [[0, "idle"], [40, "point"]]) : chain(lf, "point", [[0, "think"], [52, "eureka"]]);
  const PC: Pt = [722, 202];
  return (
    <g>
      {sky > 0.01 ? (
        <g opacity={sky}>
          <rect x={40} y={80} width={900} height={700} fill="url(#e05-sky)" />
          {Array.from({ length: 6 }, (_, i) => {
            const x = ((((i * 250 - frame * 1.4) % 1500) + 1500) % 1500) - 200;
            return <StormCloud key={`t${i}`} x={x} y={150 + (i % 2) * 40} s={0.8} fill="#2E3650" rim="#414A66" />;
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const x = ((((i * 260 - frame * 3) % 1560) + 1560) % 1560) - 200;
            return <StormCloud key={`b${i}`} x={x} y={730 - (i % 2) * 26} s={1.4} fill="#4A5572" rim="#5F6A88" />;
          })}
          <g transform={`translate(${PLANE_X} ${py})`}>
            <Plane />
          </g>
          <Bolt pts={zigzag(250, 92, nose[0] + 4, nose[1] - 6, 41, 8, 28)} p={strike} o={li === 0 ? 1 - 0.6 * ease(lf, 44, 20) : 0} />
          <Flow pts={hull} p={flowP} frame={frame} w={0.85} />
          {exit > 0.01
            ? Array.from({ length: 7 }, (_, i) => {
                const a = -Math.PI * 0.95 + i * 0.32;
                const L = 40 + 30 * Math.abs(Math.sin(frame * 0.4 + i));
                return <line key={i} x1={tail[0]} y1={tail[1]} x2={tail[0] + Math.cos(a + 0.9) * L * exit} y2={tail[1] + Math.sin(a + 0.9) * L * exit} stroke={CUR} strokeWidth={5} strokeLinecap="round" />;
              })
            : null}
          {li === 0 ? <Tag x={400} y={130} lines={["> 1 LẦN / NĂM", "MỖI MÁY BAY"]} size={46} w={400} color={INK.red} border={INK.red} p={pop(lf, fps, 38)} /> : null}
          {/* Ô cửa sổ: Milo kỹ sư hàng không ngồi cạnh cửa sổ */}
          <g>
            <clipPath id="e05-port">
              <circle cx={PC[0]} cy={PC[1]} r={104} />
            </clipPath>
            <circle cx={PC[0]} cy={PC[1]} r={104} fill="#DCE3EA" />
            <g clipPath="url(#e05-port)">
              <rect x={PC[0] - 110} y={PC[1] + 60} width={220} height={60} fill="#5A6A86" />
              <Stickman x={PC[0] + 6} y={PC[1] + 232} scale={0.78} {...portPose} />
            </g>
            <circle cx={PC[0]} cy={PC[1]} r={104} fill="none" stroke="#9AA5AE" strokeWidth={16} />
            <circle cx={PC[0]} cy={PC[1]} r={113} fill="none" stroke={INK.line} strokeWidth={4} />
            <line x1={PC[0] - 60} y1={PC[1] + 92} x2={PLANE_X + 190} y2={py - 26} stroke="#9AA5AE" strokeWidth={4} strokeDasharray="8 6" />
          </g>
          {/* Cận cảnh bụng máy bay: bánh đáp thu gọn */}
          {gear > 0.01 ? (
            <g>
              <line x1={PLANE_X + 10} y1={py + 44} x2={270} y2={590} stroke="#DCE3EA" strokeWidth={3} strokeDasharray="8 6" opacity={Math.min(1, gear)} />
              <Pop p={gear} cx={200} cy={650}>
                <clipPath id="e05-gear">
                  <circle cx={200} cy={650} r={96} />
                </clipPath>
                <circle cx={200} cy={650} r={96} fill="#5B6B8C" />
                <g clipPath="url(#e05-gear)">
                  {/* Bụng máy bay cắt ngang: khoang bánh đáp, bánh nằm gọn bên trong, cửa khoang đóng */}
                  <path d="M 90 540 L 310 540 L 310 640 Q 200 690 90 640 Z" fill="#F1F4F7" stroke={INK.line} strokeWidth={4} />
                  <rect x={160} y={592} width={80} height={62} rx={6} fill="#2B3140" />
                  <circle cx={200} cy={622} r={26} fill="#262626" stroke="#9AA3AA" strokeWidth={3} />
                  <circle cx={200} cy={622} r={10} fill="#9AA3AA" />
                  <path d="M 150 660 Q 200 672 250 660" fill="none" stroke="#7E8A93" strokeWidth={9} strokeLinecap="round" />
                  <path d="M 200 690 L 200 738" stroke="#FFE27A" strokeWidth={5} strokeDasharray="8 8" />
                  <path d="M 188 728 L 200 744 L 212 728" fill="none" stroke="#FFE27A" strokeWidth={5} />
                </g>
                <circle cx={200} cy={650} r={96} fill="none" stroke="#DCE3EA" strokeWidth={8} />
                <circle cx={200} cy={650} r={101} fill="none" stroke={INK.line} strokeWidth={3} />
              </Pop>
              <Fade p={ease(lf, 54, 12)} dy={10}>
                <text x={600} y={716} textAnchor="middle" fill="#FFE27A" stroke="#1B2238" strokeWidth={8} paintOrder="stroke" fontSize={44} fontStyle="italic" {...T}>
                  chẳng bánh nào
                </text>
                <text x={600} y={766} textAnchor="middle" fill="#FFE27A" stroke="#1B2238" strokeWidth={8} paintOrder="stroke" fontSize={44} fontStyle="italic" {...T}>
                  chạm đất!
                </text>
              </Fade>
            </g>
          ) : null}
          <Flash a={flash * 0.85} />
        </g>
      ) : null}
      {/* Câu 3: về lại chiếc ô tô mui kín, phán quyết TIN ĐỒN! */}
      {li === 2 ? (
        <g opacity={1 - sky}>
          <NightRoad frame={frame} />
          <Car id="c" x={470} s={0.95} frame={frame} cage={cage} tires={stamp * (1 - cage)} milo={<Driver {...chain(lf, undefined, [[0, "idle"], [44, "eureka"]])} />} />
          <Stamp x={470} y={700} text="TIN ĐỒN!" p={stamp} size={72} rot={-7} />
          <Tag x={470} y={120} lines={["LỒNG FARADAY"]} size={50} color={INK.green} border={INK.green} p={pop(lf, fps, 58)} />
          <Rain frame={frame} o={0.7} />
        </g>
      ) : null}
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

const EP05: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep05Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP05[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient / pattern riêng của tập (id đặt tiền tố "e05-"), được đặt vào <defs> của khung cảnh. */
export const Ep05Defs: React.FC = () => (
  <>
    <filter id="e05-glow" filterUnits="userSpaceOnUse" x={-2000} y={-2000} width={5000} height={5000}>
      <feGaussianBlur stdDeviation="8" />
    </filter>
    <linearGradient id="e05-night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#141A30" />
      <stop offset="100%" stopColor="#3A4868" />
    </linearGradient>
    <linearGradient id="e05-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#10162B" />
      <stop offset="100%" stopColor="#34425F" />
    </linearGradient>
    <linearGradient id="e05-dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#5E6F7E" />
      <stop offset="100%" stopColor="#C9C3A2" />
    </linearGradient>
    <linearGradient id="e05-air" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#B9C6D0" />
      <stop offset="100%" stopColor="#EFE6CC" />
    </linearGradient>
    <linearGradient id="e05-foil" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#F4F7F9" />
      <stop offset="45%" stopColor="#B9C3CA" />
      <stop offset="60%" stopColor="#E9EEF1" />
      <stop offset="100%" stopColor="#9AA6AE" />
    </linearGradient>
    <linearGradient id="e05-foil-dark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#C9D1D7" />
      <stop offset="100%" stopColor="#7E8A93" />
    </linearGradient>
    <linearGradient id="e05-brass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFE082" />
      <stop offset="100%" stopColor="#9E7020" />
    </linearGradient>
    <pattern id="e05-mesh" width={34} height={34} patternUnits="userSpaceOnUse">
      <path d="M 0 0 L 34 0 M 0 0 L 0 34" stroke="#FFE27A" strokeWidth={3} opacity={0.75} />
    </pattern>
    <pattern id="e05-copper" width={70} height={70} patternUnits="userSpaceOnUse" x={10} y={10}>
      <path d="M 0 0 L 70 0 M 0 0 L 0 70" stroke="#C46A2A" strokeWidth={4} />
    </pattern>
    <pattern id="e05-fiber" width={18} height={18} patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <path d="M 0 0 L 18 0 M 0 9 L 18 9" stroke="#AFC3C8" strokeWidth={1.6} />
      <path d="M 4 0 L 4 18" stroke="#C9D6DA" strokeWidth={1.2} />
    </pattern>
  </>
);
