/**
 * Tập 4 "Đếm chữ cái để kết án một nữ hoàng" (thư mật Mary xứ Scotland, phân tích tần số): cảnh vẽ riêng cho từng hồi,
 * đổi hình theo câu đang đọc (`li`, `lf`) đúng như trường `shot` trong projects/kien-thuc/src/episodes/tuan-1.ts.
 * Toạ độ gốc của sân khấu: rộng x 60..910, cao y 92..780 (mặt đất y = 780). Hình chính nằm ở x 80..700, Milo đứng x ≈ 815.
 */
import React from "react";
import { interpolate } from "remotion";
import { DrawLine, DrawPath, ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { type Anim, Card, Cross, GROUND, linePose, poseAt, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { type Pose, Stickman } from "./Stickman.tsx";

const MILO_X = 815;
const PAPER = "#F8EDCF";
const PAPER_EDGE = "#D9BE86";
const CINK = "#5A2A12";
const GOLD = "#F2BE4A";
const GLOW = "#FFC93C";
const CHALK = "#F4F1E6";
const CHALK_Y = "#FFE27A";

const rnd = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};

// ---------------------------------------------------------------- ký hiệu mật mã

/** 13 ký hiệu lạ (nét vẽ trong ô −1..1), vẽ bằng đường nên không phụ thuộc phông chữ. */
const GLYPH_D = [
  "M -1 1 L 0 -1 L 1 1 Z",
  "M -1 -1 L 1 -1 L -0.2 1",
  "M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0 M 0 -1.25 L 0 1.25",
  "M -1 -1 L 1 1 M 1 -1 L -1 1 M -1 -1 L 1 -1",
  "M 1 -1 L -1 -1 L 0 0 L -1 1 L 1 1",
  "M -1 1 L -1 -1 L 1 -1 L 1 1",
  "M -1 -1 L 0 1 L 1 -1 M -0.5 -1 L 0.5 -1",
  "M 0 1 L 0 -1 M -0.8 -0.2 L 0 -1 L 0.8 -0.2",
  "M -1 0 Q -0.5 -1.2 0 0 Q 0.5 1.2 1 0 M -1 1 L 1 1",
  "M -1 -1 L 1 -1 L 1 1 L -1 1 Z M 0 0 L 0.05 0",
  "M -1 1 L 1 -1 M -1 -0.1 L 0.1 1 M 0.1 -1 L 1 0",
  "M -1 -0.4 L 1 -0.4 M -1 0.4 L 1 0.4 M 0 -1 L 0 1",
  "M -0.8 -1 Q 1.3 -1 0 0 Q -1.3 1 0.8 1",
];

/** Ký hiệu số `k` tại (x, y), nửa cỡ `s`. */
const Glyph: React.FC<{ k: number; x: number; y: number; s: number; color?: string; w?: number; rot?: number }> = ({ k, x, y, s, color = CINK, w = 4, rot = 0 }) => (
  <path
    d={GLYPH_D[((k % GLYPH_D.length) + GLYPH_D.length) % GLYPH_D.length]}
    transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
    fill="none"
    stroke={color}
    strokeWidth={w / s}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/** Chữ cái → ký hiệu (E dùng ký hiệu 0, chữ hay gặp dùng ký hiệu số nhỏ). */
const KEY = "ETAONISHRDLCU";
const glyphOf = (ch: string) => {
  const i = KEY.indexOf(ch);
  return i >= 0 ? i : (ch.charCodeAt(0) * 7) % 13;
};

/** Dãy ký hiệu giả, ký hiệu 0 gặp nhiều nhất (giống chữ E trong thư thật). */
const WEIGHTS = [26, 16, 13, 11, 9, 8, 6, 4, 3, 2, 1, 1, 1];
const WSUM = WEIGHTS.reduce((a, b) => a + b, 0);
const glyphSeq = (seed: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    let r = rnd(seed * 101 + i) * WSUM;
    for (let k = 0; k < WEIGHTS.length; k++) {
      r -= WEIGHTS[k];
      if (r <= 0) return k;
    }
    return 0;
  });

/** Tờ thư mật: giấy cũ, các hàng ký hiệu lạ; `reveal` hiện dần từng ký hiệu; `hl` làm sáng một loại ký hiệu. */
const CipherSheet: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  rows: number;
  cols: number;
  seed?: number;
  reveal?: number;
  rot?: number;
  hl?: number;
  hlP?: number;
  frame: number;
  children?: React.ReactNode;
}> = ({ x, y, w, h, rows, cols, seed = 1, reveal = 1, rot = 0, hl = -1, hlP = 0, frame, children }) => {
  const seq = glyphSeq(seed, rows * cols);
  const cw = (w - 50) / cols;
  const ch = (h - 50) / rows;
  const s = Math.min(cw, ch) * 0.3;
  const pulse = 0.75 + 0.25 * Math.sin(frame * 0.2);
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 8} y={y + 10} width={w} height={h} rx={6} fill="rgba(0,0,0,0.22)" />
      <rect x={x} y={y} width={w} height={h} rx={6} fill={PAPER} stroke={INK.line} strokeWidth={4} />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={4} fill="none" stroke={PAPER_EDGE} strokeWidth={3} />
      {seq.map((k, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const show = Math.min(1, Math.max(0, reveal * seq.length - i));
        if (show <= 0) return null;
        const gx = x + 25 + cw * (c + 0.5);
        const gy = y + 25 + ch * (r + 0.5);
        const lit = k === hl && hlP > 0.01;
        return (
          <g key={i} opacity={show}>
            {lit ? <circle cx={gx} cy={gy} r={s * 1.9} fill={GLOW} opacity={hlP * pulse * 0.85} /> : null}
            <Glyph k={k} x={gx} y={gy} s={s} color={lit ? INK.red : CINK} w={Math.max(2.5, s * 0.32)} />
          </g>
        );
      })}
      {children}
    </g>
  );
};

/** Que đếm theo nhóm năm (bốn que dọc, que thứ năm gạch chéo); `n` que đã vẽ. */
const Tally: React.FC<{ x: number; y: number; n: number; h?: number; gap?: number; color?: string; w?: number }> = ({ x, y, n, h = 40, gap = 11, color = CINK, w = 4.5 }) => (
  <g>
    {Array.from({ length: Math.max(0, Math.floor(n)) }, (_, i) => {
      const g = Math.floor(i / 5);
      const k = i % 5;
      const gx = x + g * (gap * 5 + 6);
      return k < 4 ? (
        <line key={i} x1={gx + k * gap} y1={y - h} x2={gx + k * gap} y2={y} stroke={color} strokeWidth={w} strokeLinecap="round" />
      ) : (
        <line key={i} x1={gx - 6} y1={y - h * 0.2} x2={gx + gap * 3 + 6} y2={y - h * 0.8} stroke={color} strokeWidth={w} strokeLinecap="round" />
      );
    })}
  </g>
);

// ---------------------------------------------------------------- nét vẽ dần (giá treo cổ) + bàn tay cầm bút lông

type Pt = [number, number];
const segLen = (pts: Pt[]) => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

/** Vẽ dần nhiều nét theo thứ tự; trả về đường đã vẽ và đầu bút hiện tại. */
const strokesAt = (strokes: Pt[][], p: number) => {
  const total = strokes.map(segLen).reduce((a, b) => a + b, 0);
  let left = Math.max(0, Math.min(1, p)) * total;
  let d = "";
  let tip: Pt = strokes[0][0];
  for (const pts of strokes) {
    if (left <= 0) break;
    d += `M ${pts[0][0]} ${pts[0][1]} `;
    tip = pts[0];
    for (let i = 1; i < pts.length && left > 0; i++) {
      const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (left >= L) {
        d += `L ${pts[i][0]} ${pts[i][1]} `;
        tip = pts[i];
        left -= L;
      } else {
        const t = left / L;
        tip = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
        d += `L ${tip[0]} ${tip[1]} `;
        left = 0;
      }
    }
  }
  return { d, tip };
};

/** Giá treo cổ nhỏ (gốc: chân trái), cao 130 px khi k = 1. */
const gallowsStrokes = (gx: number, gy: number, k: number): Pt[][] => {
  const P = (x: number, y: number): Pt => [gx + x * k, gy + y * k];
  const noose = Array.from({ length: 13 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 12) * Math.PI * 2;
    return P(80 + Math.cos(a) * 12, -84 + Math.sin(a) * 14);
  });
  return [[P(0, 0), P(100, 0)], [P(24, 0), P(24, -130)], [P(24, -130), P(86, -130)], [P(24, -100), P(54, -130)], [P(80, -130), P(80, -98)], noose];
};

const Gallows: React.FC<{ gx: number; gy: number; k?: number; p: number; color?: string; glow?: number }> = ({ gx, gy, k = 1, p, color = CINK, glow = 0 }) => {
  const { d } = strokesAt(gallowsStrokes(gx, gy, k), p);
  if (!d) return null;
  return (
    <g>
      {glow > 0.01 ? <path d={d} fill="none" stroke={GLOW} strokeWidth={18 * k} strokeLinecap="round" strokeLinejoin="round" opacity={glow} filter="url(#soft-glow)" /> : null}
      <path d={d} fill="none" stroke={color} strokeWidth={6 * k} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** Bàn tay áo dạ cầm bút lông ngỗng; đầu ngòi tại (x, y). */
const QuillHand: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M 30 -40 L 170 -330" stroke="#3B2C44" strokeWidth={56} strokeLinecap="round" />
    <path d="M 0 0 L 118 -190" stroke={INK.line} strokeWidth={4} strokeLinecap="round" />
    <path d="M 46 -66 Q 70 -170 150 -232 Q 130 -140 60 -60 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
    <path d="M 56 -70 Q 90 -150 138 -210" fill="none" stroke="#C9C1B0" strokeWidth={2} />
    <circle cx={40} cy={-56} r={24} fill="#F4F1EA" stroke={INK.line} strokeWidth={3} />
    <ellipse cx={22} cy={-30} rx={22} ry={17} fill="#EBB892" stroke={INK.line} strokeWidth={3} />
    <path d="M 8 -20 Q 2 -10 6 -4" fill="none" stroke={INK.line} strokeWidth={3} strokeLinecap="round" />
  </g>
);

// ---------------------------------------------------------------- nhân vật & đạo cụ

/** Nữ hoàng Mary (nửa người): mũ trùm trắng hình tim, cổ áo xếp nếp, váy đen. Gốc: giữa mép dưới. `write` = tay đang viết. */
const Mary: React.FC<{ x: number; y: number; s?: number; frame: number; smile?: number; write?: number; look?: number }> = ({ x, y, s = 1, frame, smile = 0.5, write = 0, look = 0 }) => {
  const bob = wave(frame, 0.09, 1.5);
  const blink = (frame + 23) % 97 < 4 ? 0.15 : 1;
  const hx = 50 + (write > 0 ? 4 + wave(frame, 0.45, 9) * write : 0);
  const hy = write > 0 ? interpolate(write, [0, 1], [-40, -12]) + wave(frame, 0.9, 3) * write : -40;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -74 0 Q -78 -70 -50 -92 L 50 -92 Q 78 -70 74 0 Z" fill="#2B2236" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
      <path d="M -14 -92 L 0 -20 L 14 -92 Z" fill="#4A3A5C" />
      {[-22, -11, 0, 11, 22].map((px) => (
        <circle key={px} cx={px * 0.9} cy={-70 + Math.abs(px) * 0.35} r={3.2} fill="#FFFDF5" stroke={INK.line} strokeWidth={1} />
      ))}
      <g transform={`translate(0 ${bob})`}>
        <rect x={-11} y={-118} width={22} height={24} fill="#F1CDB0" stroke={INK.line} strokeWidth={3} />
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={-44 + i * 11} cy={-96 + Math.abs(i - 4) * 1.2} r={10} fill="#FFFDF5" stroke={INK.line} strokeWidth={2.5} />
        ))}
        <path d="M -38 -150 Q -46 -112 -30 -104 L -24 -150 Z M 38 -150 Q 46 -112 30 -104 L 24 -150 Z" fill="#9A4B2A" stroke={INK.line} strokeWidth={2.5} />
        <ellipse cx={0} cy={-146} rx={32} ry={38} fill="#F1CDB0" stroke={INK.line} strokeWidth={4} />
        <path d="M -30 -158 Q -24 -176 0 -174 Q 24 -176 30 -158 Q 14 -166 0 -160 Q -14 -166 -30 -158 Z" fill="#9A4B2A" />
        <path d="M -46 -134 Q -54 -192 -10 -192 L 0 -180 L 10 -192 Q 54 -192 46 -134 Q 40 -178 0 -176 Q -40 -178 -46 -134 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={3.5} strokeLinejoin="round" />
        <g transform={`translate(${look * 3} 0)`}>
          <ellipse cx={-12} cy={-146} rx={4.5} ry={5.5 * blink} fill={INK.line} />
          <ellipse cx={12} cy={-146} rx={4.5} ry={5.5 * blink} fill={INK.line} />
        </g>
        <path d="M -21 -158 Q -13 -163 -5 -159 M 5 -159 Q 13 -163 21 -158" fill="none" stroke="#7A3A1E" strokeWidth={3} strokeLinecap="round" />
        <path d="M 0 -142 L -3 -130 L 3 -130" fill="none" stroke="#C99A7C" strokeWidth={2.5} strokeLinecap="round" />
        <path d={`M -10 -121 Q 0 ${-121 + 8 * smile} 10 -121`} fill="none" stroke="#9E2A2B" strokeWidth={3.5} strokeLinecap="round" />
        <circle cx={-20} cy={-130} r={6} fill="#F2A0A0" opacity={0.5} />
        <circle cx={20} cy={-130} r={6} fill="#F2A0A0" opacity={0.5} />
      </g>
      {/* Tay phải (phía phải khung) */}
      <path d={`M 52 -84 Q 74 -50 ${hx} ${hy}`} fill="none" stroke="#2B2236" strokeWidth={20} strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={10} fill="#F1CDB0" stroke={INK.line} strokeWidth={2.5} />
      {write > 0.01 ? (
        <g transform={`translate(${hx} ${hy})`} opacity={write}>
          <path d="M -4 6 L 30 -60" stroke={INK.line} strokeWidth={3} />
          <path d="M 12 -24 Q 22 -60 44 -78 Q 36 -46 18 -20 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={2} />
        </g>
      ) : null}
    </g>
  );
};

/** Thùng bia nhìn từ đáy (lăn ngang): thân trụ, vành đai sắt, ván gỗ xoay theo `roll` (độ). Gốc: điểm chạm đất. */
const Barrel: React.FC<{ x: number; y: number; roll?: number; s?: number }> = ({ x, y, roll = 0, s = 1 }) => {
  const R = 58;
  return (
    <g transform={`translate(${x} ${y - R * s}) scale(${s})`}>
      <ellipse cx={-4} cy={R - 2} rx={R + 22} ry={9} fill="rgba(40,24,10,0.28)" />
      <path d={`M -34 ${-R} L 0 ${-R} A ${R} ${R} 0 0 1 0 ${R} L -34 ${R} A ${R} ${R} 0 0 1 -34 ${-R} Z`} fill="#8A5527" stroke={INK.line} strokeWidth={4} />
      <line x1={-30} y1={-R + 2} x2={-30} y2={R - 2} stroke="#5E3818" strokeWidth={6} />
      <circle cx={0} cy={0} r={R} fill="#B87A3E" stroke={INK.line} strokeWidth={4} />
      <circle cx={0} cy={0} r={R - 9} fill="#C98D4E" stroke="#4A4A4A" strokeWidth={6} />
      <g transform={`rotate(${roll})`}>
        {[-30, -15, 0, 15, 30].map((o) => {
          const half = Math.sqrt(Math.max(0, (R - 12) ** 2 - o * o));
          return <line key={o} x1={o} y1={-half} x2={o} y2={half} stroke="#8A5527" strokeWidth={3} />;
        })}
        <circle cx={0} cy={-30} r={7} fill="#5E3818" stroke={INK.line} strokeWidth={2} />
      </g>
    </g>
  );
};

/** Phong thư gấp nhỏ có dấu sáp đỏ. */
const Folded: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-40} y={-26} width={80} height={52} rx={3} fill={PAPER} stroke={INK.line} strokeWidth={3} />
    <path d="M -40 -26 L 0 4 L 40 -26" fill="none" stroke={INK.line} strokeWidth={3} />
    <circle cx={0} cy={4} r={9} fill={INK.red} stroke={INK.line} strokeWidth={2} />
  </g>
);

/** Thẻ vàng (năm, nhãn) bật ra. */
const YearTag: React.FC<{ x: number; y: number; text: string; p: number; rot?: number; size?: number }> = ({ x, y, text, p, rot = -6, size = 40 }) => {
  const w = text.length * size * 0.62 + 36;
  return (
    <Pop p={p} cx={x} cy={y}>
      <g transform={`rotate(${rot} ${x} ${y})`}>
        <rect x={x - w / 2 + 4} y={y - size * 0.8 + 6} width={w} height={size * 1.6} rx={10} fill="rgba(0,0,0,0.25)" />
        <rect x={x - w / 2} y={y - size * 0.8} width={w} height={size * 1.6} rx={10} fill={GOLD} stroke={INK.line} strokeWidth={4} />
        <text x={x} y={y + size * 0.36} textAnchor="middle" fill={INK.line} fontSize={size} {...T}>
          {text}
        </text>
      </g>
    </Pop>
  );
};

/** Bảng tên vai Milo đang đóng (treo phía trên đầu). */
const RolePlate: React.FC<{ text: string; p: number; frame: number }> = ({ text, p, frame }) => {
  const w = text.length * 20 + 40;
  const y = 300;
  const cx = Math.min(MILO_X, 896 - w / 2);
  return (
    <Pop p={p} cx={cx} cy={y}>
      <g transform={`rotate(${wave(frame, 0.06, 2)} ${cx} ${y - 40})`}>
        <path d={`M ${cx - w / 3} ${y - 22} L ${cx} ${y - 46} L ${cx + w / 3} ${y - 22}`} fill="none" stroke={INK.line} strokeWidth={3} />
        <rect x={cx - w / 2} y={y - 22} width={w} height={46} rx={8} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
        <text x={cx} y={y + 12} textAnchor="middle" fill="#FFF6DD" fontSize={30} {...T}>
          {text}
        </text>
      </g>
    </Pop>
  );
};

/** Chữ viết tay (nghiêng, mực đỏ) hiện dần từ trái sang phải. */
const Handwrite: React.FC<{ x: number; y: number; text: string; p: number; size?: number; color?: string; id: string }> = ({ x, y, text, p, size = 50, color = INK.red, id }) => {
  if (p <= 0.01) return null;
  const w = text.length * size * 0.66 + 40;
  const x0 = x - w / 2;
  return (
    <g>
      <clipPath id={`e04-hw-${id}`}>
        <rect x={x0} y={y - size * 1.2} width={w * p} height={size * 1.7} />
      </clipPath>
      <g clipPath={`url(#e04-hw-${id})`}>
        <text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} {...T} fontStyle="italic" transform={`rotate(-3 ${x} ${y})`}>
          {text}
        </text>
      </g>
    </g>
  );
};

/** Mũi tên chỉ xuống nhún nhảy (về phía ô bình luận). */
const DownArrow: React.FC<{ x: number; y: number; p: number; frame: number }> = ({ x, y, p, frame }) => (
  <Pop p={p} cx={x} cy={y}>
    <g transform={`translate(${x} ${y + Math.abs(Math.sin(frame * 0.18)) * 14})`}>
      <path d="M -14 -40 L 14 -40 L 14 0 L 30 0 L 0 34 L -30 0 L -14 0 Z" fill={INK.red} stroke={INK.line} strokeWidth={3} strokeLinejoin="round" />
    </g>
  </Pop>
);

/** Mũi tên cong vẽ dần. */
const ArcArrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; arc?: number; p: number; color: string; w?: number }> = ({ x1, y1, x2, y2, arc = 40, p, color, w = 5 }) => {
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
          d={`M ${x2} ${y2} L ${x2 - 18 * Math.cos(ang - 0.5)} ${y2 - 18 * Math.sin(ang - 0.5)} M ${x2} ${y2} L ${x2 - 18 * Math.cos(ang + 0.5)} ${y2 - 18 * Math.sin(ang + 0.5)}`}
          stroke={color}
          strokeWidth={w}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
};

/** Bàn gỗ ngang (mặt bàn tại y). */
const Table: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <g>
    <rect x={x} y={y} width={w} height={24} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    <rect x={x + 26} y={y + 24} width={22} height={GROUND - y - 24} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
    <rect x={x + w - 48} y={y + 24} width={22} height={GROUND - y - 24} fill={INK.woodDark} stroke={INK.line} strokeWidth={3} />
  </g>
);

/** Cây nến cháy; `out` 0 → 1 tắt dần, bốc khói. */
const Candle: React.FC<{ x: number; y: number; frame: number; out?: number }> = ({ x, y, frame, out = 0 }) => (
  <g>
    <rect x={x - 12} y={y - 70} width={24} height={70} rx={4} fill="#FFF3D6" stroke={INK.line} strokeWidth={3} />
    <ellipse cx={x} cy={y} rx={26} ry={8} fill="#C9A45C" stroke={INK.line} strokeWidth={3} />
    {out < 1 ? (
      <g opacity={1 - out} transform={`translate(${x} ${y - 74}) scale(${1 + wave(frame, 0.5, 0.08)} ${1 + wave(frame, 0.37, 0.12)})`}>
        <circle cx={0} cy={-14} r={26} fill="rgba(255,214,102,0.35)" />
        <path d="M 0 -34 Q 12 -14 0 0 Q -12 -14 0 -34 Z" fill="#FFB43C" stroke="#C0661A" strokeWidth={2} />
        <path d="M 0 -22 Q 5 -10 0 -3 Q -5 -10 0 -22 Z" fill="#FFF3B0" />
      </g>
    ) : null}
    {out > 0.05 ? (
      <path
        d={`M ${x} ${y - 74} q 10 -20 0 -40 q -10 -20 0 -40`}
        fill="none"
        stroke="rgba(90,80,70,0.5)"
        strokeWidth={5}
        strokeLinecap="round"
        opacity={Math.min(1, out * 2) * (0.6 + 0.3 * Math.sin(frame * 0.1))}
        transform={`translate(${wave(frame, 0.1, 4)} ${-out * 20})`}
      />
    ) : null}
  </g>
);

/** Phòng làm việc của người giải mã: tường gỗ ốp, khung cửa sổ chì. */
const Study: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={60} y={92} width={850} height={688} fill="rgba(120,80,40,0.10)" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={70 + i * 96} y={560} width={84} height={190} rx={4} fill="rgba(140,90,45,0.12)" stroke="rgba(110,68,35,0.25)" strokeWidth={3} />
    ))}
    <rect x={60} y={548} width={850} height={10} fill="rgba(110,68,35,0.25)" />
    <rect x={540} y={130} width={150} height={190} rx={70} fill="rgba(190,215,225,0.35)" stroke="rgba(59,38,20,0.4)" strokeWidth={5} />
    {Array.from({ length: 5 }, (_, i) => (
      <line key={i} x1={540 + i * 30} y1={140} x2={540 + i * 30 + 60} y2={320} stroke="rgba(59,38,20,0.25)" strokeWidth={2} />
    ))}
    <circle cx={615} cy={220} r={60 + wave(frame, 0.05, 4)} fill="rgba(255,236,170,0.12)" />
  </g>
);

// ---------------------------------------------------------------- hồi 1: mở đầu

/** Dinh thự Chartley: nhà khung gỗ kiểu Tudor, mái dốc, ống khói, ô cửa sáng đèn của Mary. */
const Manor: React.FC<{ frame: number; p: number }> = ({ frame, p }) => (
  <g opacity={p}>
    <rect x={60} y={92} width={850} height={470} fill="rgba(160,190,205,0.18)" />
    <path d="M 60 470 Q 220 410 400 460 Q 600 400 910 450 L 910 560 L 60 560 Z" fill="rgba(120,140,80,0.18)" />
    <rect x={60} y={540} width={850} height={240} fill="rgba(170,130,80,0.16)" />
    <path d="M 84 330 L 140 236 L 520 236 L 576 330 Z" fill="#7A4A2E" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    {[150, 330].map((gx) => (
      <path key={gx} d={`M ${gx} 330 L ${gx + 70} 200 L ${gx + 140} 330 Z`} fill="#E8D3A8" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
    ))}
    {[178, 470].map((cx) => (
      <rect key={cx} x={cx} y={170} width={30} height={70} fill="#9C5B3B" stroke={INK.line} strokeWidth={3} />
    ))}
    {[0, 1].map((i) => (
      <circle key={i} cx={192 + wave(frame, 0.04, 8, i) + i * 10} cy={150 - ((frame * 0.6 + i * 30) % 60)} r={12 + i * 4} fill="rgba(120,110,100,0.25)" />
    ))}
    <rect x={100} y={330} width={460} height={212} fill="#E8D3A8" stroke={INK.line} strokeWidth={4} />
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} x1={100 + i * 40} y1={330} x2={100 + i * 40} y2={542} stroke="#5E3818" strokeWidth={6} />
    ))}
    <line x1={100} y1={436} x2={560} y2={436} stroke="#5E3818" strokeWidth={6} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${180 + i * 120} 436 L ${220 + i * 120} 330`} stroke="#5E3818" strokeWidth={5} />
    ))}
    {[0, 1].map((i) => (
      <path key={i} d={`M ${185 + i * 180} 260 L ${220 + i * 180} 230 L ${255 + i * 180} 260 M ${220 + i * 180} 230 L ${220 + i * 180} 330`} fill="none" stroke="#5E3818" strokeWidth={5} />
    ))}
    {[140, 260, 380, 480].map((wx, i) => (
      <g key={wx}>
        <rect x={wx} y={460} width={50} height={56} fill={i === 0 ? "#FFE08A" : "#6D8796"} stroke={INK.line} strokeWidth={3} />
        <path d={`M ${wx} ${460} L ${wx + 50} ${516} M ${wx + 50} ${460} L ${wx} ${516}`} stroke="rgba(59,38,20,0.45)" strokeWidth={2} />
      </g>
    ))}
    <rect x={300} y={356} width={60} height={56} fill="#6D8796" stroke={INK.line} strokeWidth={3} />
    <text x={330} y={318} textAnchor="middle" fill={INK.line} fontSize={30} {...T} letterSpacing={2}>
      CHARTLEY
    </text>
  </g>
);

/** Cổng đá có vòm tối (tiền cảnh bên phải). */
const Gate: React.FC<{ p: number }> = ({ p }) => (
  <g opacity={p}>
    <path d="M 552 780 L 552 420 L 700 420 L 700 780 Z" fill="#B9A890" stroke={INK.line} strokeWidth={4} />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1={552} y1={450 + i * 42} x2={700} y2={450 + i * 42} stroke="rgba(59,38,20,0.25)" strokeWidth={3} />
    ))}
    <path d="M 578 780 L 578 540 A 48 48 0 0 1 674 540 L 674 780 Z" fill="#2A1C12" stroke={INK.line} strokeWidth={4} />
    <path d="M 544 420 L 552 396 L 700 396 L 708 420 Z" fill="#9F8E76" stroke={INK.line} strokeWidth={4} />
  </g>
);

const GALLOWS_AT = { gx: 450, gy: 640 };

const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  // Câu 1: cận cảnh lá thư, bàn tay vẽ giá treo cổ. Câu 2: lùi máy ra dinh thự, thư vào thùng bia lăn ra cổng.
  const close = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 22) : 0;
  const draw = li === 0 ? ease(lf, 14, 52) : 1;
  const handIn = li === 0 ? ease(lf, 0, 14) * (1 - ease(lf, 72, 16)) : 0;
  const { tip } = strokesAt(gallowsStrokes(GALLOWS_AT.gx, GALLOWS_AT.gy, 1), draw);
  const manor = li === 1 ? ease(lf, 4, 20) : 0;
  const fly = li === 1 ? ease(lf, 26, 20) : 0;
  const rollP = li === 1 ? ease(lf, 46, 30) : 0;
  const barrelX = interpolate(rollP, [0, 1], [410, 626]);
  const desk = li >= 2;
  const deskIn = li === 2 ? ease(lf, 0, 18) : 1;
  const tallies = li === 2 ? ease(lf, 14, 50) : 1;
  const keyP = li === 2 ? pop(lf, fps, 6) : 0;
  const sheetOut = li === 3 ? ease(lf, 0, 16) : 0;
  const board = li === 3 ? pop(lf, fps, 14) : 0;
  const flipT = Math.max(0, lf - 40);
  const flipK = Math.floor(flipT / 46);
  const flipA = Math.PI * (flipK + ease(flipT - flipK * 46, 0, 14));
  const pose =
    li === 0
      ? { pose: "point" as Pose }
      : li === 1
        ? poseAt(lf, 40, "point", "present")
        : li === 2
          ? { pose: "point" as Pose, prevPose: "present" as Pose, poseT: ease(lf, 0, 12) }
          : { pose: "present" as Pose, prevPose: "point" as Pose, poseT: ease(lf, 0, 12) };
  const cards: [string, string][] = [
    ["CHARTLEY, NƯỚC ANH · 1586", "Giá treo cổ trên một lá thư mật"],
    ["NỮ HOÀNG MARY XỨ SCOTLAND", "Thư mật giấu trong thùng bia"],
    ["CHÌA KHOÁ ĐẦU TIÊN", "ĐẾM"],
    ["CÒN BẠN?", "CÓ hay KHÔNG? Ghi bình luận!"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  const counts = [9, 6, 4, 2];
  return (
    <g>
      {/* Câu 2: dinh thự Chartley */}
      {manor > 0.01 ? (
        <g>
          <Manor frame={frame} p={manor} />
          <Gate p={manor} />
          <Fade p={ease(lf, 10, 18)} dy={30}>
            <Mary x={210} y={612} s={1.15} frame={frame} write={1 - ease(lf, 22, 10)} smile={0.6} look={fly > 0 ? 1 : 0} />
            <Table x={86} y={600} w={270} />
          </Fade>
          {fly < 1 ? (
            <Fade p={ease(lf, 12, 10)}>
              <Folded x={interpolate(fly, [0, 1], [250, barrelX])} y={interpolate(fly, [0, 1], [588, 690]) - Math.sin(fly * Math.PI) * 120} s={0.9 - fly * 0.5} r={fly * 200} />
            </Fade>
          ) : null}
          <g opacity={1 - ease(rollP, 0.8, 0.2)}>
            <Barrel x={barrelX} y={GROUND} roll={rollP * 300} />
          </g>
        </g>
      ) : null}
      {/* Câu 1: cận cảnh lá thư và nét bút vẽ giá treo cổ */}
      {close > 0.01 ? (
        <g opacity={close} transform={`translate(${(1 - close) * 120} ${(1 - close) * 260}) scale(${0.6 + close * 0.4})`}>
          <rect x={60} y={92} width={850} height={688} fill="rgba(90,50,20,0.10)" />
          <CipherSheet x={90} y={150} w={600} h={580} rows={6} cols={7} seed={4} frame={frame} rot={-2}>
            <rect x={400} y={460} width={250} height={230} rx={8} fill="rgba(244,228,193,0.92)" stroke={PAPER_EDGE} strokeWidth={3} />
            <Gallows gx={GALLOWS_AT.gx} gy={GALLOWS_AT.gy} p={draw} />
          </CipherSheet>
          {handIn > 0.01 ? (
            <g transform={`translate(${(1 - handIn) * 300} ${-(1 - handIn) * 200})`}>
              <QuillHand x={tip[0]} y={tip[1]} />
            </g>
          ) : null}
          <YearTag x={180} y={180} text="1586" p={li === 0 ? pop(lf, fps, 4) : 1} size={52} />
        </g>
      ) : null}
      {/* Câu 3–4: bàn giải mã của Phelippes */}
      {desk ? (
        <g opacity={deskIn}>
          <Study frame={frame} />
          <Table x={80} y={620} w={600} />
          <Candle x={630} y={620} frame={frame} />
          <CipherSheet x={96} y={250} w={300} h={330} rows={5} cols={4} seed={4} frame={frame} rot={-3} hl={0} hlP={li === 2 ? ease(lf, 60, 12) : 0} />
          {sheetOut < 1 ? (
            <g opacity={1 - sheetOut} transform={`translate(${sheetOut * 80} 0)`}>
              <rect x={420} y={262} width={260} height={320} rx={6} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} transform="rotate(3 550 422)" />
              {counts.map((n, i) => (
                <g key={i}>
                  <Glyph k={i} x={458} y={316 + i * 70} s={18} w={5} color={i === 0 ? INK.red : CINK} />
                  <Tally x={496} y={336 + i * 70} n={n * tallies} h={42} color={i === 0 ? INK.red : CINK} />
                </g>
              ))}
            </g>
          ) : null}
          {li === 2 ? (
            <Pop p={keyP} cx={380} cy={180}>
              <g transform={`rotate(${wave(frame, 0.08, 4)} 380 180)`}>
                <circle cx={300} cy={180} r={36} fill="none" stroke={GOLD} strokeWidth={16} />
                <circle cx={300} cy={180} r={36} fill="none" stroke={INK.line} strokeWidth={3} />
                <rect x={334} y={172} width={160} height={18} rx={6} fill={GOLD} stroke={INK.line} strokeWidth={3} />
                <path d="M 450 190 L 450 218 L 468 218 L 468 190 M 476 190 L 476 210 L 492 210 L 492 190" fill={GOLD} stroke={INK.line} strokeWidth={3} />
              </g>
              <text x={570} y={204} textAnchor="middle" fill={INK.red} fontSize={66} {...T}>
                ĐẾM.
              </text>
            </Pop>
          ) : null}
          {li === 3 ? (
            <>
              <Handwrite x={330} y={200} text="ĐẾM CÓ ĐỦ KHÔNG?" p={ease(lf, 6, 36)} size={50} id="hook" />
              <Pop p={board} cx={600} cy={420}>
                <line x1={650} y1={470} x2={690} y2={600} stroke={INK.woodDark} strokeWidth={10} strokeLinecap="round" />
                <g transform={`translate(600 410) scale(${Math.max(0.03, Math.abs(Math.cos(flipA)))} 1)`}>
                  <rect x={-118} y={-62} width={236} height={124} rx={14} fill={Math.cos(flipA) >= 0 ? INK.green : INK.red} stroke={INK.line} strokeWidth={5} />
                  <text x={0} y={22} textAnchor="middle" fill="#FFFFFF" fontSize={62} {...T}>
                    {Math.cos(flipA) >= 0 ? "CÓ" : "KHÔNG"}
                  </text>
                </g>
              </Pop>
              <DownArrow x={420} y={700} p={pop(lf, fps, 50)} frame={frame} />
            </>
          ) : null}
        </g>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} {...pose} />
      {li >= 2 ? <RolePlate text="PHELIPPES" p={li === 2 ? pop(lf, fps, 10) : 1} frame={frame} /> : null}
      <Card title={title} formula={formula} p={1} fp={li === 0 ? 1 : pop(lf, fps, 0)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: rào cản

const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TILE = 44;
const TILE_STEP = 46;
const TILE_X0 = 88;

/** Vị trí (ô) của ký hiệu g ở bước tráo thứ k: hoán vị g → (g·a + 3k) mod 13. */
const slotAt = (g: number, k: number) => {
  const a = [1, 5, 8, 3, 11, 7, 2, 9, 4, 12, 6, 10][k % 12];
  return (g * a + k * 3) % 13;
};

/** Bảng chữ cái A–Z và hàng ký hiệu bên dưới tráo qua tráo lại. */
const Shuffler: React.FC<{ t: number; p: number }> = ({ t, p }) => {
  const step = 14;
  const k = Math.floor(t / step);
  const e = ease(t - k * step, 0, step * 0.7);
  return (
    <g opacity={p}>
      {[0, 1].map((row) => (
        <g key={row}>
          {Array.from({ length: 13 }, (_, i) => {
            const x = TILE_X0 + i * TILE_STEP;
            const y = 170 + row * 150;
            return (
              <g key={i}>
                <rect x={x} y={y} width={TILE} height={52} rx={6} fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
                <text x={x + TILE / 2} y={y + 39} textAnchor="middle" fill={INK.line} fontSize={32} {...T}>
                  {ABC[row * 13 + i]}
                </text>
                <line x1={x + TILE / 2} y1={y + 54} x2={x + TILE / 2} y2={y + 70} stroke={INK.soft} strokeWidth={3} />
              </g>
            );
          })}
          {Array.from({ length: 13 }, (_, g) => {
            const a = slotAt(g, k + row * 5);
            const b = slotAt(g, k + 1 + row * 5);
            const sx = TILE_X0 + interpolate(e, [0, 1], [a, b]) * TILE_STEP;
            const sy = 170 + row * 150 + 96 - Math.sin(e * Math.PI) * 26 * (g % 2 ? 1 : -1);
            return (
              <g key={g}>
                <rect x={sx} y={sy - 24} width={TILE} height={48} rx={6} fill="#EFD9A8" stroke={CINK} strokeWidth={3} />
                <Glyph k={g} x={sx + TILE / 2} y={sy} s={13} w={4} rot={row * 180} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
};

const Barrier: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const shuffle = li <= 1 ? 1 : li === 2 ? 1 - ease(lf, 0, 16) : 0;
  // Câu 1 tráo đều tay; câu 2 tráo nhanh dần (thời gian ảo tăng nhanh hơn khung thật).
  const st = li === 0 ? lf : 200 + lf + ease(lf, 0, 60) * 60 + Math.max(0, lf - 60) * 1.5;
  const tries = li === 0 ? Math.floor(Math.max(0, lf - 20) / 14) + 1 : 0;
  const big = li === 1 ? pop(lf, fps, 16) : li === 2 ? 1 - ease(lf, 0, 14) : 0;
  const machine = li === 2 ? ease(lf, 6, 18) : 0;
  const bars = li === 2 ? ease(lf, 26, 34) : 0;
  const page = li === 3 ? ease(lf, 0, 20) : 0;
  const cards: [string, string, boolean][] = [
    ["THỬ TỪNG CÁCH THAY CHỮ", "Đổi chữ ↔ ký hiệu tới khi ra nghĩa", false],
    ["BẢNG THAY 26 CHỮ CÁI", "≈ 400 triệu tỉ tỉ cách xếp", false],
    ["1 TỈ CÁCH MỖI GIÂY", "Vẫn cần hơn 12 tỉ năm", false],
    ["BẢN MÃ CỦA MARY", "Có ký hiệu thay cho cả từ", false],
  ];
  const [title, formula, ok] = cards[Math.min(li, 3)];
  const sand = (frame * 0.9) % 30;
  return (
    <g>
      <rect x={60} y={92} width={850} height={688} fill="rgba(120,80,40,0.08)" />
      <path d="M 60 700 Q 300 660 520 700 Q 720 670 910 700 L 910 780 L 60 780 Z" fill="rgba(160,120,70,0.14)" />
      {shuffle > 0.01 ? <Shuffler t={st} p={shuffle} /> : null}
      {li === 0 ? (
        <Fade p={ease(lf, 20, 12)} dy={10}>
          <rect x={210} y={505} width={360} height={84} rx={14} fill="#FFF6DD" stroke={INK.line} strokeWidth={4} />
          <text x={390} y={562} textAnchor="middle" fill={INK.blue} fontSize={42} {...T}>
            LẦN THỬ #{tries}
          </text>
          <Cross x={600} y={547} r={26} bare p={tries > 1 ? 1 : 0} />
        </Fade>
      ) : null}
      {big > 0.01 ? (
        <Pop p={big} cx={390} cy={600}>
          <rect x={120} y={510} width={540} height={170} rx={18} fill="#2F4A3A" stroke={INK.wood} strokeWidth={10} />
          <text x={390} y={566} textAnchor="middle" fill={CHALK} fontSize={34} {...T}>
            SỐ CÁCH XẾP
          </text>
          <text x={370} y={642} textAnchor="middle" fill={CHALK_Y} fontSize={62} {...T}>
            26! ≈ 4 × 10
            <tspan dy={-28} fontSize={38}>
              26
            </tspan>
          </text>
          <Cross x={640} y={520} r={30} p={li === 1 ? pop(lf, fps, 50) : 1} />
        </Pop>
      ) : null}
      {/* Câu 3: cỗ máy thử 1 tỉ cách/giây, đồng hồ cát, thanh so với tuổi vũ trụ */}
      {machine > 0.01 ? (
        <g opacity={machine}>
          <g transform={`translate(${(1 - machine) * -200} 0)`}>
            <rect x={96} y={170} width={260} height={230} rx={18} fill="#8A97A0" stroke={INK.line} strokeWidth={5} />
            <rect x={116} y={190} width={220} height={74} rx={10} fill="#0F2A1A" stroke={INK.line} strokeWidth={3} />
            <text x={226} y={240} textAnchor="middle" fill="#7CFF8A" fontSize={32} {...T}>
              1 TỈ / GIÂY
            </text>
            {[0, 1].map((i) => (
              <g key={i} transform={`rotate(${frame * (i ? -6 : 8)} ${170 + i * 112} 330)`}>
                <circle cx={170 + i * 112} cy={330} r={40} fill="#C9A45C" stroke={INK.line} strokeWidth={4} strokeDasharray="12 6" />
                <circle cx={170 + i * 112} cy={330} r={12} fill={INK.line} />
                <line x1={170 + i * 112} y1={296} x2={170 + i * 112} y2={364} stroke={INK.line} strokeWidth={4} />
              </g>
            ))}
          </g>
          {/* Đồng hồ cát */}
          <g transform={`translate(520 290) rotate(${wave(frame, 0.05, 2)})`}>
            <rect x={-80} y={-130} width={160} height={16} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
            <rect x={-80} y={114} width={160} height={16} rx={6} fill={INK.wood} stroke={INK.line} strokeWidth={3} />
            <path d="M -62 -114 L 62 -114 Q 60 -40 8 0 Q 60 40 62 114 L -62 114 Q -60 40 -8 0 Q -60 -40 -62 -114 Z" fill="rgba(220,240,250,0.6)" stroke={INK.line} strokeWidth={4} />
            <path d="M -40 -50 L 40 -50 Q 30 -20 6 -4 L -6 -4 Q -30 -20 -40 -50 Z" fill="#E7B95A" />
            <path d="M -56 112 Q 0 60 56 112 Z" fill="#E7B95A" />
            <line x1={0} y1={-4} x2={0} y2={100} stroke="#E7B95A" strokeWidth={4} strokeDasharray="6 6" strokeDashoffset={-sand} />
          </g>
          {/* Hai thanh thời gian */}
          {[
            { label: "HƠN 12 TỈ NĂM", v: 12 / 13.8, c: INK.red, y: 470 },
            { label: "TUỔI VŨ TRỤ · 13,8 TỈ NĂM", v: 1, c: INK.blue, y: 580 },
          ].map((b) => (
            <g key={b.label}>
              <text x={100} y={b.y - 12} fill={b.c} fontSize={34} {...T}>
                {b.label}
              </text>
              <rect x={100} y={b.y} width={580} height={46} rx={10} fill="rgba(59,38,20,0.08)" stroke={INK.line} strokeWidth={3} />
              <rect x={100} y={b.y} width={580 * b.v * bars} height={46} rx={10} fill={b.c} opacity={0.85} />
            </g>
          ))}
          <Cross x={610} y={680} r={30} p={pop(lf, fps, 64)} />
        </g>
      ) : null}
      {/* Câu 4: trang mã của Mary, ký hiệu cho cả từ; Mary mỉm cười */}
      {page > 0.01 ? (
        <g opacity={page}>
          <g transform={`translate(0 ${(1 - page) * 40}) rotate(-2 290 440)`}>
            <rect x={96} y={150} width={400} height={590} rx={6} fill={PAPER} stroke={INK.line} strokeWidth={4} />
            <text x={296} y={200} textAnchor="middle" fill={CINK} fontSize={34} {...T}>
              BẢNG MÃ
            </text>
            {["A", "B", "C", "D", "E", "F"].map((ch, i) => (
              <Fade key={ch} p={ease(lf, 8 + i * 3, 10)}>
                <text x={130 + (i % 2) * 180} y={258 + Math.floor(i / 2) * 58} fill={INK.line} fontSize={34} {...T}>
                  {ch} =
                </text>
                <Glyph k={(i * 5 + 2) % 13} x={215 + (i % 2) * 180} y={246 + Math.floor(i / 2) * 58} s={15} w={4} />
              </Fade>
            ))}
            <line x1={120} y1={420} x2={472} y2={420} stroke={CINK} strokeWidth={3} />
            {["and", "the", "for", "with"].map((w, i) => {
              const p = ease(lf, 30 + i * 8, 12);
              return (
                <g key={w} opacity={p} transform={`translate(${(1 - p) * -30} 0)`}>
                  <rect x={120} y={436 + i * 70} width={352} height={58} rx={8} fill={i % 2 ? "rgba(242,190,74,0.18)" : "rgba(242,190,74,0.32)"} />
                  <text x={140} y={478 + i * 70} fill={INK.red} fontSize={38} {...T}>
                    {w}
                  </text>
                  <text x={268} y={478 + i * 70} fill={INK.line} fontSize={34} {...T}>
                    =
                  </text>
                  <Glyph k={(i * 3 + 7) % 13} x={340} y={465 + i * 70} s={16} w={4.5} />
                  <Glyph k={(i * 7 + 4) % 13} x={392} y={465 + i * 70} s={12} w={4} rot={90} />
                </g>
              );
            })}
          </g>
          <Fade p={ease(lf, 20, 18)} dy={30}>
            <Mary x={606} y={GROUND} s={1.3} frame={frame} smile={0.6 + ease(lf, 50, 16) * 0.6} look={-1} />
          </Fade>
          <Pop p={pop(lf, fps, 56)} cx={600} cy={300}>
            <rect x={492} y={236} width={220} height={110} rx={20} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
            <path d="M 580 346 L 600 380 L 616 346 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" />
            <rect x={572} y={338} width={50} height={10} fill="#FFFDF5" />
            <text x={602} y={284} textAnchor="middle" fill={INK.line} fontSize={30} {...T}>
              KHÔNG AI
            </text>
            <text x={602} y={322} textAnchor="middle" fill={INK.red} fontSize={30} {...T}>
              ĐỌC NỔI!
            </text>
          </Pop>
        </g>
      ) : null}
      <Stickman
        x={MILO_X + (li === 3 ? 20 : 0)}
        y={GROUND}
        {...(li === 2 ? poseAt(lf, 60, "scratch", "think") : linePose(li, lf, ["think", "scratch", "scratch", "think"]))}
        badge="?!"
        badgeP={li === 1 ? pop(lf, fps, 40) * (1 - ease(lf, 90, 10)) : 0}
      />
      <Card title={title} formula={formula} p={pop(bf, fps, 6)} fp={pop(lf, fps, 4)} ok={ok} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: eureka (đếm thay vì thử)

/** Thư viện Nhà Thông thái ở Baghdad: vòm cửa nhọn, đèn treo, kệ sách. */
const Baghdad: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={60} y={92} width={850} height={688} fill="rgba(60,110,140,0.10)" />
    {[0, 1, 2].map((i) => {
      const ax = 90 + i * 210;
      return (
        <g key={i}>
          <path d={`M ${ax} 600 L ${ax} 260 Q ${ax} 170 ${ax + 85} 140 Q ${ax + 170} 170 ${ax + 170} 260 L ${ax + 170} 600 Z`} fill="rgba(29,106,140,0.12)" stroke="rgba(29,106,140,0.45)" strokeWidth={6} />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x={ax + 14} y={330 + r * 66} width={142} height={8} fill="rgba(110,68,35,0.35)" />
              {Array.from({ length: 7 }, (_, b) => (
                <rect
                  key={b}
                  x={ax + 20 + b * 19}
                  y={330 + r * 66 - 40 - ((b * 7 + r) % 3) * 6}
                  width={15}
                  height={40 + ((b * 7 + r) % 3) * 6}
                  fill={["#B5543C", "#2F6B5E", "#C79A3E", "#6D4C8A"][(b + r + i) % 4]}
                  opacity={0.35}
                />
              ))}
            </g>
          ))}
        </g>
      );
    })}
    {[195, 405].map((lx, i) => (
      <g key={lx} transform={`rotate(${wave(frame, 0.05, 3, i)} ${lx} 92)`}>
        <line x1={lx} y1={92} x2={lx} y2={150} stroke={INK.line} strokeWidth={3} />
        <path d={`M ${lx - 22} 150 L ${lx + 22} 150 L ${lx + 14} 186 L ${lx - 14} 186 Z`} fill="#C79A3E" stroke={INK.line} strokeWidth={3} />
        <circle cx={lx} cy={170} r={34} fill="rgba(255,214,102,0.25)" />
      </g>
    ))}
  </g>
);

/** Biểu đồ cột tần số (gốc trục tại x, y; cao tối đa h); `grow` 0 → 1 mọc cột; `labels` là chữ hoặc số ký hiệu. */
const Bars: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  values: number[];
  labels: (string | number)[];
  grow: number;
  color?: string;
  hl?: number[];
  hlP?: number;
  max?: number;
}> = ({ x, y, w, h, values, labels, grow, color = INK.blue, hl = [], hlP = 0, max }) => {
  const n = values.length;
  const step = w / n;
  const top = max ?? Math.max(...values);
  return (
    <g>
      <line x1={x - 6} y1={y} x2={x + w + 6} y2={y} stroke={INK.line} strokeWidth={4} />
      {values.map((v, i) => {
        const g = Math.min(1, Math.max(0, grow * 1.4 - (i / n) * 0.4));
        const bh = Math.max(2, (v / top) * h * g);
        const bx = x + i * step + step * 0.14;
        const lit = hl.includes(i);
        const lab = labels[i];
        return (
          <g key={i}>
            <rect x={bx} y={y - bh} width={step * 0.72} height={bh} fill={lit && hlP > 0.01 ? GLOW : color} stroke={INK.line} strokeWidth={2.5} opacity={0.9} />
            {typeof lab === "string" ? (
              <text x={bx + step * 0.36} y={y + 34} textAnchor="middle" fill={lit ? INK.red : INK.line} fontSize={Math.min(32, step * 0.8)} {...T}>
                {lab}
              </text>
            ) : (
              <Glyph k={lab} x={bx + step * 0.36} y={y + 22} s={Math.min(11, step * 0.25)} w={3.5} color={lit ? INK.red : CINK} />
            )}
          </g>
        );
      })}
    </g>
  );
};

const EN_FREQ = [12.7, 9.1, 8.2, 7.5, 7.0, 6.7, 6.3, 6.1, 6.0, 0.15, 0.1, 0.15, 0.07];
const EN_LET = ["E", "T", "A", "O", "I", "N", "S", "H", "R", "J", "Q", "X", "Z"];

/** Thư mật "vỡ" thành chữ: ô ký hiệu lật dần thành chữ cái (E trước, rồi từng từ quen). */
const PLAIN = "SENDTHELETTERANDKEEPTHESECRET ";
const WORDS: [number, number][] = [
  [4, 7],
  [13, 16],
  [20, 23],
  [0, 4],
  [16, 20],
  [7, 13],
  [23, 29],
];
const revealOrder = (i: number) => {
  if (PLAIN[i] === "E") return 0;
  const w = WORDS.findIndex(([a, b]) => i >= a && i < b);
  return w < 0 ? 99 : w + 1;
};

const Eureka: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const kindi = li <= 1 ? 1 : li === 2 ? 1 - ease(lf, 0, 16) : 0;
  const ph = li === 2 ? ease(lf, 6, 18) : li === 3 ? 1 : 0;
  const tallyP = li === 0 ? ease(lf, 18, 50) : 1;
  const bars = li === 1 ? ease(lf, 6, 30) : li === 2 ? 1 : 0;
  const bookOut = li === 0 ? 0 : li === 1 ? ease(lf, 0, 16) : 1;
  const cards: [string, string][] = [
    ["AL-KINDI · BAGHDAD · ~NĂM 850", "Đừng thử, hãy đếm"],
    ["TIẾNG ANH", "E ≈ 13% · J + Q + X + Z < 1%"],
    ["THOMAS PHELIPPES · 1586", "Ký hiệu hay gặp nhất → chữ E"],
    ["CHÌA KHOÁ ĐẦU TIÊN", "Bản mã bắt đầu vỡ ra từng mảnh"],
  ];
  const [title, formula] = cards[Math.min(li, 3)];
  const bookLetters = ["E", "T", "A", "O", "N"];
  const bookCounts = [13, 9, 8, 7, 6];
  const phCounts = [14, 9, 7, 5, 3, 2];
  const pose =
    li === 3
      ? poseAt(lf, 50, "point", "eureka")
      : li === 2
        ? { pose: "point" as Pose, prevPose: "present" as Pose, poseT: ease(lf, 0, 12) }
        : linePose(li, lf, ["point", "present"]);
  return (
    <g>
      {kindi > 0.01 ? (
        <g opacity={kindi}>
          <Baghdad frame={frame} />
          {bookOut < 1 ? (
            <g opacity={1 - bookOut}>
              {/* Sách mở: dòng chữ và que đếm dưới từng chữ cái */}
              <path d="M 96 330 Q 240 300 384 330 L 384 640 Q 240 612 96 640 Z" fill={PAPER} stroke={INK.line} strokeWidth={4} />
              <path d="M 384 330 Q 528 300 672 330 L 672 640 Q 528 612 384 640 Z" fill={PAPER} stroke={INK.line} strokeWidth={4} />
              <line x1={384} y1={330} x2={384} y2={640} stroke={INK.line} strokeWidth={4} />
              {Array.from({ length: 6 }, (_, i) => (
                <line key={i} x1={120} y1={370 + i * 40} x2={360 - (i % 3) * 30} y2={370 + i * 40} stroke={INK.soft} strokeWidth={6} />
              ))}
              {bookLetters.map((ch, i) => (
                <g key={ch}>
                  <text x={420} y={390 + i * 54} fill={INK.line} fontSize={40} {...T}>
                    {ch}
                  </text>
                  <Tally x={468} y={388 + i * 54} n={Math.round(bookCounts[i] * tallyP)} h={34} gap={9} color={i === 0 ? INK.red : CINK} w={4} />
                </g>
              ))}
              <Handwrite x={384} y={230} text="ĐỪNG THỬ, HÃY ĐẾM" p={li === 0 ? ease(lf, 44, 30) : 1} size={50} id="kindi" />
            </g>
          ) : null}
          {bars > 0.01 ? (
            <g opacity={Math.min(1, bars * 3)}>
              <rect x={86} y={150} width={604} height={560} rx={16} fill="rgba(255,253,245,0.92)" stroke={INK.line} strokeWidth={4} />
              <Bars x={116} y={640} w={560} h={380} values={EN_FREQ} labels={EN_LET} grow={bars} hl={[0]} hlP={1} />
              <Pop p={li === 1 ? pop(lf, fps, 34) : 1} cx={204} cy={216}>
                <rect x={114} y={186} width={180} height={60} rx={12} fill={INK.red} stroke={INK.line} strokeWidth={3} />
                <text x={204} y={230} textAnchor="middle" fill="#FFFFFF" fontSize={38} {...T}>
                  E ≈ 13%
                </text>
              </Pop>
              <Fade p={li === 1 ? ease(lf, 50, 14) : 1} dy={10}>
                <path d="M 508 590 L 508 570 L 676 570 L 676 590" fill="none" stroke={INK.red} strokeWidth={5} />
                <text x={592} y={552} textAnchor="middle" fill={INK.red} fontSize={40} {...T}>
                  &lt; 1%
                </text>
              </Fade>
            </g>
          ) : null}
        </g>
      ) : null}
      {/* Câu 3–4: trở lại 1586, bàn của Phelippes */}
      {ph > 0.01 ? (
        <g opacity={ph}>
          <Study frame={frame} />
          <Table x={80} y={660} w={600} />
          {li === 2 ? (
            <>
              <CipherSheet x={92} y={180} w={250} h={440} rows={8} cols={4} seed={7} frame={frame} rot={-2} hl={0} hlP={ease(lf, 56, 14)} />
              <rect x={364} y={168} width={320} height={470} rx={8} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
              {phCounts.map((n, i) => {
                const p = ease(lf, 14 + i * 5, 12);
                const y = 220 + i * 72;
                return (
                  <g key={i} opacity={p} transform={`translate(${(1 - p) * -120} 0)`}>
                    {i === 0 ? <rect x={372} y={y - 34} width={304} height={66} rx={10} fill={GLOW} opacity={ease(lf, 56, 14) * (0.55 + 0.25 * Math.sin(frame * 0.2))} /> : null}
                    <Glyph k={i} x={400} y={y} s={18} w={5} color={i === 0 ? INK.red : CINK} />
                    <Tally x={436} y={y + 20} n={Math.round(n * ease(lf, 24 + i * 4, 30))} h={38} gap={9} color={i === 0 ? INK.red : CINK} w={4} />
                  </g>
                );
              })}
              <Pop p={pop(lf, fps, 62)} cx={640} cy={220}>
                <circle cx={640} cy={220} r={30} fill={INK.red} stroke={INK.line} strokeWidth={3} />
                <text x={640} y={234} textAnchor="middle" fill="#FFFFFF" fontSize={40} {...T}>
                  E
                </text>
              </Pop>
            </>
          ) : null}
          {li === 3 ? (
            <g>
              <rect x={100} y={150} width={580} height={500} rx={8} fill="rgba(0,0,0,0.22)" transform="translate(8 10)" />
              <rect x={100} y={150} width={580} height={500} rx={8} fill={PAPER} stroke={INK.line} strokeWidth={4} />
              {Array.from({ length: 30 }, (_, i) => {
                const c = i % 6;
                const r = Math.floor(i / 6);
                const cx = 150 + c * 96;
                const cy = 210 + r * 96;
                const ch = PLAIN[i];
                const ord = revealOrder(i);
                const t = ord === 99 ? 0 : ease(lf, 4 + ord * 9, 10);
                const flip = Math.abs(Math.cos(t * Math.PI));
                const shown = t > 0.5;
                if (ch === " ") return null;
                return (
                  <g key={i} transform={`translate(${cx + 32} ${cy}) scale(${Math.max(0.04, flip)} 1) translate(${-cx - 32} ${-cy})`}>
                    <rect x={cx - 6} y={cy - 36} width={76} height={72} rx={8} fill={shown ? (ch === "E" ? GLOW : "#FFFDF5") : "#EFD9A8"} stroke={INK.line} strokeWidth={3} />
                    {shown ? (
                      <text x={cx + 32} y={cy + 17} textAnchor="middle" fill={ch === "E" ? INK.red : INK.line} fontSize={48} {...T}>
                        {ch}
                      </text>
                    ) : (
                      <Glyph k={glyphOf(ch)} x={cx + 32} y={cy} s={16} w={4.5} />
                    )}
                  </g>
                );
              })}
            </g>
          ) : null}
        </g>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} {...pose} badge="RA RỒI!" badgeP={li === 3 ? pop(lf, fps, 54) : 0} />
      {li !== 3 ? <RolePlate text={li <= 1 ? "AL-KINDI" : "PHELIPPES"} p={li === 0 ? pop(bf, fps, 10) : li === 2 ? pop(lf, fps, 8) : 1} frame={frame} /> : null}
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: định lý (bảng & biểu đồ tần số, Toán 9)

const CIPHER_FREQ = [6.9, 12.5, 4.0, 8.8, 2.2, 7.4, 0.4, 5.6, 1.1];
const CIPHER_LAB = [5, 0, 7, 1, 9, 2, 12, 3, 10];

const Theorem: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const table = li === 0 ? ease(lf, 10, 20) : li === 1 ? 1 - ease(lf, 0, 16) : 0;
  const book = li === 0 ? ease(lf, 30, 24) : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const chart = li === 1 ? ease(lf, 18, 36) : 0;
  const pair = li === 2 ? ease(lf, 0, 18) : 0;
  const cards: [string, string][] = [
    ["TOÁN 9 · BẢNG TẦN SỐ", "Bảng tần số & biểu đồ tần số"],
    ["TẦN SỐ = SỐ LẦN XUẤT HIỆN", "1.000 chữ cái → cột E ≈ 127"],
    ["ĐẶT HAI BIỂU ĐỒ CẠNH NHAU", "Cột cao khớp cột cao"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  const head = ["E", "T", "A", "O", "…"];
  const tallyN = [13, 9, 8, 7];
  return (
    <g>
      <rect x={60} y={92} width={850} height={688} fill="rgba(120,80,40,0.06)" />
      {/* Câu 1: que đếm gom thành bảng hai dòng; sách Toán 9 mở */}
      {table > 0.01 ? (
        <g opacity={table} transform={`translate(0 ${(1 - table) * 30})`}>
          <rect x={90} y={150} width={600} height={220} rx={12} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
          <line x1={90} y1={260} x2={690} y2={260} stroke={INK.line} strokeWidth={3} />
          <line x1={250} y1={150} x2={250} y2={370} stroke={INK.line} strokeWidth={3} />
          <text x={170} y={218} textAnchor="middle" fill={INK.blue} fontSize={32} {...T}>
            Chữ cái
          </text>
          <text x={170} y={328} textAnchor="middle" fill={INK.blue} fontSize={32} {...T}>
            Số lần
          </text>
          {head.map((h, i) => (
            <g key={h}>
              {i > 0 ? <line x1={250 + i * 88} y1={150} x2={250 + i * 88} y2={370} stroke={INK.soft} strokeWidth={2} /> : null}
              <text x={294 + i * 88} y={220} textAnchor="middle" fill={i === 0 ? INK.red : INK.line} fontSize={40} {...T}>
                {h}
              </text>
              {i < 4 ? <Tally x={262 + i * 88} y={336} n={Math.round(tallyN[i] * ease(lf, 22 + i * 6, 26))} h={30} gap={6} w={3.5} color={i === 0 ? INK.red : CINK} /> : null}
            </g>
          ))}
        </g>
      ) : null}
      {book > 0.01 ? (
        <g opacity={Math.min(1, book * 2)} transform="translate(390 590)">
          <path d="M -260 -150 L 0 -130 L 260 -150 L 260 120 L 0 140 L -260 120 Z" fill={INK.blue} stroke={INK.line} strokeWidth={4} />
          <path d="M 0 -130 Q 120 -160 244 -136 L 244 108 Q 120 90 0 124 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
          <g transform={`scale(${Math.max(0.02, book)} 1)`}>
            <path d="M 0 -130 Q -120 -160 -244 -136 L -244 108 Q -120 90 0 124 Z" fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
            <text x={-122} y={-70} textAnchor="middle" fill={INK.blue} fontSize={40} {...T}>
              TOÁN 9
            </text>
            <text x={-122} y={-20} textAnchor="middle" fill={INK.line} fontSize={26} {...T}>
              Bảng tần số và
            </text>
            <text x={-122} y={14} textAnchor="middle" fill={INK.line} fontSize={26} {...T}>
              biểu đồ tần số
            </text>
          </g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={40 + i * 46} y={60 - [60, 90, 40, 70][i] * book} width={30} height={[60, 90, 40, 70][i] * book} fill={INK.blue} opacity={0.6} />
          ))}
          <line x1={30} y1={60} x2={226} y2={60} stroke={INK.line} strokeWidth={3} />
          <line x1={30} y1={-100} x2={226} y2={-100} stroke={INK.soft} strokeWidth={5} />
          <line x1={30} y1={-74} x2={180} y2={-74} stroke={INK.soft} strokeWidth={5} />
        </g>
      ) : null}
      {/* Câu 2: định nghĩa + biểu đồ cột, E = 127 trên 1.000 chữ */}
      {li === 1 ? (
        <g>
          <Pop p={pop(lf, fps, 6)} cx={390} cy={180}>
            <rect x={92} y={136} width={596} height={88} rx={14} fill={INK.wood} stroke={INK.line} strokeWidth={5} />
            <rect x={92} y={136} width={596} height={88} rx={14} fill={GLOW} opacity={0.25 + 0.15 * Math.sin(frame * 0.15)} />
            <text x={390} y={193} textAnchor="middle" fill="#FFF6DD" fontSize={34} {...T}>
              TẦN SỐ = SỐ LẦN XUẤT HIỆN
            </text>
          </Pop>
          {chart > 0.01 ? (
            <g opacity={Math.min(1, chart * 3)}>
              <Bars x={110} y={700} w={570} h={360} values={EN_FREQ.slice(0, 9)} labels={EN_LET.slice(0, 9)} grow={chart} hl={[0]} hlP={1} />
              <Pop p={pop(lf, fps, 52)} cx={152} cy={306}>
                <text x={152} y={322} textAnchor="middle" fill={INK.red} fontSize={46} {...T}>
                  127
                </text>
              </Pop>
              <Fade p={ease(lf, 58, 14)} dy={10}>
                <rect x={420} y={262} width={256} height={64} rx={12} fill="#FFF6DD" stroke={INK.line} strokeWidth={3} />
                <text x={548} y={306} textAnchor="middle" fill={INK.line} fontSize={34} {...T}>
                  / 1.000 CHỮ
                </text>
              </Fade>
            </g>
          ) : null}
        </g>
      ) : null}
      {/* Câu 3: hai biểu đồ cạnh nhau, nối cột cao với cột cao */}
      {pair > 0.01 ? (
        <g opacity={pair}>
          {[
            { x: 84, title: "BẢN MÃ", c: "#8A5527" },
            { x: 394, title: "TIẾNG ANH", c: INK.blue },
          ].map((p) => (
            <g key={p.title}>
              <rect x={p.x} y={250} width={300} height={430} rx={14} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
              <text x={p.x + 150} y={300} textAnchor="middle" fill={p.c} fontSize={34} {...T}>
                {p.title}
              </text>
            </g>
          ))}
          <Bars x={100} y={630} w={270} h={250} values={CIPHER_FREQ} labels={CIPHER_LAB} grow={ease(lf, 6, 26)} color="#B8743A" hl={[1, 3]} hlP={ease(lf, 44, 12)} />
          <Bars x={410} y={630} w={270} h={250} values={EN_FREQ.slice(0, 9)} labels={EN_LET.slice(0, 9)} grow={ease(lf, 10, 26)} hl={[0, 1]} hlP={ease(lf, 44, 12)} />
          <ArcArrow x1={146} y1={364} x2={428} y2={364} arc={90} p={ease(lf, 40, 22)} color={INK.red} w={6} />
          <ArcArrow x1={206} y1={448} x2={458} y2={428} arc={50} p={ease(lf, 54, 20)} color={INK.red} w={5} />
          <Handwrite x={390} y={196} text="CAO ↔ CAO" p={ease(lf, 64, 20)} size={52} id="pair" />
        </g>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} {...linePose(li, lf, ["present", "point", "point"])} badge="E!" badgeP={li === 1 ? pop(lf, fps, 54) * (1 - ease(lf, 110, 10)) : 0} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: hộp cờ Scrabble

/** Quân chữ gỗ: chữ cái to, điểm nhỏ ở góc. */
const Tile: React.FC<{ x: number; y: number; ch: string; pts?: string; s?: number; glow?: number; rot?: number }> = ({ x, y, ch, pts, s = 34, glow = 0, rot = 0 }) => (
  <g transform={`rotate(${rot} ${x} ${y})`}>
    {glow > 0.01 ? <rect x={x - s / 2 - 8} y={y - s / 2 - 8} width={s + 16} height={s + 16} rx={8} fill={GLOW} opacity={glow} filter="url(#soft-glow)" /> : null}
    <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={s * 0.14} fill="#F3DDB0" stroke={INK.line} strokeWidth={Math.max(2, s * 0.07)} />
    <text x={x - (pts ? s * 0.06 : 0)} y={y + s * 0.26} textAnchor="middle" fill={INK.line} fontSize={s * 0.7} {...T}>
      {ch}
    </text>
    {pts ? (
      <text x={x + s * 0.34} y={y + s * 0.38} textAnchor="middle" fill={INK.line} fontSize={s * 0.28} {...T}>
        {pts}
      </text>
    ) : null}
  </g>
);

/** Số quân của một số chữ trong hộp Scrabble tiếng Anh (bộ 100 quân). */
const SCR: [string, number][] = [
  ["E", 12],
  ["A", 9],
  ["I", 9],
  ["O", 8],
  ["N", 6],
  ["R", 6],
  ["T", 6],
  ["L", 4],
  ["S", 4],
  ["U", 4],
  ["D", 4],
  ["Q", 1],
  ["Z", 1],
];
const SCR_TILES = SCR.flatMap(([ch, n], col) => Array.from({ length: n }, (_, k) => ({ ch, col, k })));

const Realworld: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const lid = li === 0 ? ease(lf, 8, 18) : 1;
  const paper = li === 0 ? ease(lf, 24, 20) : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const box = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 30, 16) : 0;
  const board = li === 2 ? ease(lf, 0, 18) : 0;
  const place = li === 2 ? ease(lf, 18, 28) : 0;
  const cards: [string, string][] = [
    ["SCRABBLE · ALFRED BUTTS", "Đếm chữ trên trang nhất New York Times"],
    ["100 QUÂN CHỮ", "E: 12 quân, 1 điểm · Q, Z: mỗi chữ 1 quân"],
    ["LẦN TỚI XẾP CHỮ", "Bạn đang chơi trên một bảng tần số"],
  ];
  const [title, formula] = cards[Math.min(li, 2)];
  const pose = li === 2 ? poseAt(lf, 10, "present", "touch") : linePose(li, lf, ["present", "point"]);
  const ex = interpolate(place, [0, 1], [690, 409.5]);
  const ey = interpolate(place, [0, 1], [600, 549]) - Math.sin(place * Math.PI) * 120;
  return (
    <g>
      {/* Phòng khách: tường sọc, bàn */}
      <rect x={60} y={92} width={850} height={688} fill="rgba(200,150,90,0.10)" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={80 + i * 72} y1={92} x2={80 + i * 72} y2={640} stroke="rgba(150,100,50,0.10)" strokeWidth={8} />
      ))}
      <Table x={70} y={700} w={620} />
      {/* Câu 1: hộp cờ mở nắp; trang nhất báo cũ với vòng bút chì */}
      {box > 0.01 ? (
        <g opacity={box}>
          <rect x={420} y={610} width={250} height={90} rx={8} fill="#7A2E2A" stroke={INK.line} strokeWidth={4} />
          <rect x={430} y={620} width={230} height={70} rx={4} fill="#5A1F1C" />
          {li === 0 ? Array.from({ length: 10 }, (_, i) => <Tile key={i} x={455 + (i % 5) * 44} y={640 + Math.floor(i / 5) * 32} ch={"EAIONRTLSU"[i]} s={30} />) : null}
          <g transform={`rotate(${-lid * 70} 420 610)`}>
            <rect x={420} y={590} width={250} height={26} rx={6} fill="#B33A33" stroke={INK.line} strokeWidth={4} />
            <text x={545} y={611} textAnchor="middle" fill="#FFF6DD" fontSize={22} {...T} letterSpacing={2}>
              SCRABBLE
            </text>
          </g>
          {li === 1 ? (
            <text x={545} y={668} textAnchor="middle" fill="#FFF6DD" fontSize={28} {...T}>
              100 QUÂN
            </text>
          ) : null}
        </g>
      ) : null}
      {paper > 0.01 ? (
        <g opacity={paper} transform={`translate(0 ${(1 - paper) * -40}) rotate(-3 250 380)`}>
          <rect x={92} y={150} width={330} height={420} fill="rgba(0,0,0,0.2)" transform="translate(8 10)" />
          <rect x={92} y={150} width={330} height={420} fill="#F4F0E4" stroke={INK.line} strokeWidth={5} />
          <rect x={80} y={138} width={354} height={444} fill="none" stroke={INK.wood} strokeWidth={10} />
          <text x={257} y={202} textAnchor="middle" fill={INK.line} fontSize={28} {...T} fontStyle="italic">
            The New York Times
          </text>
          <line x1={110} y1={216} x2={404} y2={216} stroke={INK.line} strokeWidth={3} />
          {[0, 1, 2].map((c) =>
            Array.from({ length: 9 }, (_, r) => (
              <line key={`${c}-${r}`} x1={112 + c * 100} y1={248 + r * 34} x2={192 + c * 100 - ((r * 3 + c) % 4) * 6} y2={248 + r * 34} stroke="rgba(59,38,20,0.35)" strokeWidth={6} />
            )),
          )}
          {[
            [140, 248],
            [252, 316],
            [330, 384],
            [170, 452],
            [290, 486],
            [360, 282],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <rect x={cx - 17} y={cy - 17} width={34} height={34} fill="#F4F0E4" />
              <text x={cx} y={cy + 10} textAnchor="middle" fill={INK.line} fontSize={28} {...T}>
                {i % 2 ? "E" : "e"}
              </text>
              <DrawPath p={ease(lf, 40 + i * 5, 10)} length={110} d={`M ${cx + 18} ${cy} A 18 18 0 1 1 ${cx + 17.9} ${cy - 3}`} fill="none" stroke="#6B6B6B" strokeWidth={3.5} />
            </g>
          ))}
        </g>
      ) : null}
      {/* Câu 2: đổ quân ra bàn rồi xếp thành biểu đồ cột */}
      {li === 1
        ? SCR_TILES.map((t, i) => {
            const d = 10 + (i % 26) * 1.2 + Math.floor(i / 26) * 4;
            const pour = ease(lf, d, 10);
            if (pour <= 0.01) return null;
            const sort = ease(lf, 34 + t.col * 2, 18);
            const hx = 300 + rnd(i) * 360;
            const hy = 680 - rnd(i + 50) * 60;
            const tx = 106 + t.col * 46;
            const ty = 680 - t.k * 36;
            const x = interpolate(sort, [0, 1], [interpolate(pour, [0, 1], [545, hx]), tx]);
            const y = interpolate(sort, [0, 1], [interpolate(pour, [0, 1], [640, hy]) - Math.sin(pour * Math.PI) * 120, ty]);
            const isQZ = t.ch === "Q" || t.ch === "Z";
            return (
              <Tile
                key={i}
                x={x}
                y={y}
                ch={t.ch}
                pts={t.ch === "E" ? "1" : undefined}
                s={34}
                rot={(1 - sort) * (rnd(i + 9) * 60 - 30)}
                glow={isQZ ? ease(lf, 70, 12) * (0.6 + 0.4 * Math.sin(frame * 0.2)) : 0}
              />
            );
          })
        : null}
      {li === 1 ? (
        <>
          <Pop p={pop(lf, fps, 58)} cx={221} cy={200}>
            <rect x={96} y={168} width={250} height={64} rx={12} fill={INK.red} stroke={INK.line} strokeWidth={3} />
            <text x={221} y={213} textAnchor="middle" fill="#FFFFFF" fontSize={34} {...T}>
              E: 12 QUÂN
            </text>
          </Pop>
          <Pop p={pop(lf, fps, 72)} cx={540} cy={516}>
            <path d="M 560 540 L 622 644 M 590 540 L 652 644" stroke={INK.red} strokeWidth={4} strokeLinecap="round" />
            <rect x={470} y={494} width={140} height={44} rx={10} fill="#FFF6DD" stroke={INK.red} strokeWidth={3} />
            <text x={540} y={526} textAnchor="middle" fill={INK.red} fontSize={28} {...T}>
              ĐIỂM CAO!
            </text>
          </Pop>
        </>
      ) : null}
      {/* Câu 3: bàn cờ, Milo đặt quân E */}
      {board > 0.01 ? (
        <g opacity={board} transform={`translate(0 ${(1 - board) * 40})`}>
          <rect x={150} y={330} width={380} height={370} rx={10} fill="#C7B48C" stroke={INK.line} strokeWidth={5} />
          {Array.from({ length: 11 * 11 }, (_, i) => {
            const c = i % 11;
            const r = Math.floor(i / 11);
            const special = (c + r) % 5 === 0 && (c * r) % 3 === 0 ? (c % 2 ? "#D96B5E" : "#6FA8C9") : "#E9DDBE";
            return <rect key={i} x={160 + c * 33 + 1} y={338 + r * 32.6 + 1} width={31} height={30.6} fill={c === 5 && r === 5 ? "#E79AA0" : special} />;
          })}
          {["C", "O", "D"].map((ch, i) => (
            <Tile key={ch} x={160 + (i + 4) * 33 + 16.5} y={338 + 6 * 32.6 + 15.3} ch={ch} s={31} />
          ))}
          <Tile x={ex} y={ey} ch="E" pts="1" s={place < 1 ? 40 - place * 9 : 31} glow={place >= 1 ? 0.5 + 0.3 * Math.sin(frame * 0.2) : 0} />
          {place >= 1 ? (
            <Pop p={pop(lf, fps, 48)} cx={440} cy={500}>
              <path d="M 440 470 L 448 492 L 470 494 L 452 506 L 458 528 L 440 516 L 422 528 L 428 506 L 410 494 L 432 492 Z" fill={GLOW} stroke={INK.line} strokeWidth={2.5} />
            </Pop>
          ) : null}
          <Handwrite x={340} y={240} text="BẢNG TẦN SỐ!" p={ease(lf, 50, 24)} size={52} id="scr" />
        </g>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} {...pose} badge="E!" badgeP={li === 2 ? pop(lf, fps, 52) : 0} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: 57 lá thư năm 2023 và kết

/** Con dấu "1587" đóng mạnh xuống. */
const Stamp1587: React.FC<{ p: number }> = ({ p }) => {
  if (p <= 0.01) return null;
  const s = 1 + (1 - Math.min(1, p)) * 0.8;
  return (
    <g transform={`translate(600 280) rotate(-8) scale(${s})`} opacity={Math.min(1, p * 1.4)}>
      <rect x={-110} y={-52} width={220} height={104} rx={12} fill="rgba(255,246,221,0.92)" stroke={INK.red} strokeWidth={7} />
      <text x={0} y={24} textAnchor="middle" fill={INK.red} fontSize={66} {...T}>
        1587
      </text>
    </g>
  );
};

const Cosmic: React.FC<Anim> = ({ li, lf, bf, fps, frame }) => {
  const wall = li === 0 ? 1 : li === 1 ? 1 - ease(lf, 0, 14) : 0;
  const split = li === 1 ? ease(lf, 6, 16) : li === 2 ? 1 - ease(lf, 0, 14) : 0;
  const screen = li === 2 ? ease(lf, 6, 16) : li === 3 ? 1 - ease(lf, 0, 14) : 0;
  const mary = li === 3 ? ease(lf, 6, 20) : li === 4 ? 1 - ease(lf, 0, 14) : 0;
  const end = li === 4 ? ease(lf, 6, 20) : 0;
  const cards: [string, string][] = [
    ["NĂM 2023 · THƯ VIỆN QUỐC GIA PHÁP", "Thêm 57 lá thư mật của Mary"],
    ["MÃ ĐỒNG ÂM · 1578–1584", "1 chữ hay gặp → nhiều ký hiệu"],
    ["PHẦN MỀM GIẢI MÃ", "Hơn 150.000 ký hiệu → ~50.000 từ"],
    ["MARY XỨ SCOTLAND", "Bị kết tội, xử tử năm 1587"],
    ["TẤT CẢ BẮT ĐẦU TỪ", "Một phép đếm"],
  ];
  const [title, formula] = cards[Math.min(li, 4)];
  const sym = li === 2 ? Math.round(ease(lf, 10, 50) * 150000) : 0;
  const french = ["MADAME", "LA REINE", "LETTRE", "ANGLETERRE"];
  const pose =
    li <= 1
      ? { pose: "point" as Pose }
      : li === 2
        ? poseAt(lf, 60, "point", "present")
        : li === 3
          ? { pose: "idle" as Pose, prevPose: "present" as Pose, poseT: ease(lf, 0, 14) }
          : { pose: "point" as Pose, prevPose: "idle" as Pose, poseT: ease(lf, 0, 14) };
  return (
    <g>
      <rect x={60} y={92} width={850} height={688} fill="rgba(80,70,90,0.08)" />
      {/* Câu 1: kho số của thư viện, 57 lá thư bay ra thành bức tường */}
      {wall > 0.01 ? (
        <g opacity={wall}>
          <rect x={96} y={500} width={290} height={190} rx={14} fill="#3A3F45" stroke={INK.line} strokeWidth={5} />
          <rect x={112} y={516} width={258} height={146} rx={6} fill="#DDEBF2" />
          <rect x={112} y={516} width={258} height={30} fill={INK.blue} />
          <text x={241} y={539} textAnchor="middle" fill="#FFFFFF" fontSize={20} {...T}>
            THƯ VIỆN QUỐC GIA PHÁP
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={130 + i * 80} y={566} width={56} height={42} rx={4} fill="#F2C14E" stroke={INK.line} strokeWidth={2} />
              <line x1={134 + i * 80} y1={630} x2={182 + i * 80} y2={630} stroke={INK.soft} strokeWidth={5} />
            </g>
          ))}
          <rect x={210} y={690} width={62} height={30} fill="#5A6066" stroke={INK.line} strokeWidth={3} />
          <rect x={170} y={716} width={142} height={16} rx={6} fill="#5A6066" stroke={INK.line} strokeWidth={3} />
          {Array.from({ length: 57 }, (_, i) => {
            const c = i % 10;
            const r = Math.floor(i / 10);
            const tx = 124 + c * 58;
            const ty = 170 + r * 56;
            const p = li === 0 ? ease(lf, 6 + i * 0.9, 16) : 1;
            if (p <= 0.01) return null;
            const x = interpolate(p, [0, 1], [241, tx]);
            const y = interpolate(p, [0, 1], [590, ty]) - Math.sin(p * Math.PI) * 60;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${(1 - p) * 120 + ((i * 7) % 9) - 4}) scale(${0.4 + p * 0.6})`}>
                <rect x={-22} y={-24} width={44} height={48} rx={3} fill={PAPER} stroke={INK.line} strokeWidth={2.5} />
                <Glyph k={i} x={-8} y={-8} s={6} w={2.5} />
                <Glyph k={i + 3} x={8} y={-8} s={6} w={2.5} />
                <line x1={-14} y1={10} x2={14} y2={10} stroke={CINK} strokeWidth={2.5} />
              </g>
            );
          })}
          <YearTag x={560} y={590} text="57 LÁ THƯ" p={li === 0 ? pop(lf, fps, 62) : 1} size={44} rot={-4} />
          <YearTag x={540} y={680} text="2023" p={li === 0 ? pop(lf, fps, 30) : 1} size={36} rot={4} />
        </g>
      ) : null}
      {/* Câu 2: một chữ E tách thành nhiều ký hiệu; các cột tần số bị san phẳng */}
      {split > 0.01 ? (
        <g opacity={split}>
          <YearTag x={390} y={170} text="1578–1584" p={li === 1 ? pop(lf, fps, 8) : 1} size={40} rot={-3} />
          <circle cx={200} cy={330} r={66} fill={INK.red} stroke={INK.line} strokeWidth={5} />
          <text x={200} y={358} textAnchor="middle" fill="#FFFFFF" fontSize={80} {...T}>
            E
          </text>
          {[0, 1, 2, 3].map((i) => {
            const p = ease(lf, 20 + i * 5, 16);
            const tx = 110 + i * 60;
            return (
              <g key={i}>
                <DrawLine p={p} x1={200} y1={396} x2={tx} y2={512} stroke={INK.red} strokeWidth={4} strokeLinecap="round" />
                <Pop p={p} cx={tx} cy={540}>
                  <rect x={tx - 26} y={514} width={52} height={52} rx={8} fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
                  <Glyph k={[0, 4, 8, 11][i]} x={tx} y={540} s={14} w={4} color={INK.red} />
                </Pop>
              </g>
            );
          })}
          <rect x={360} y={250} width={330} height={440} rx={14} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
          <Bars
            x={384}
            y={640}
            w={286}
            h={300}
            max={12.7}
            values={[12.7, 9.1, 8.2, 7.5, 4.3, 2.5].map((v, i) => interpolate(ease(lf, 36, 34), [0, 1], [v, 6.2 + (i % 2) * 0.5]))}
            labels={[0, 1, 2, 3, 4, 5]}
            grow={1}
            color="#B8743A"
          />
          <Pop p={pop(lf, fps, 70)} cx={525} cy={300}>
            <text x={525} y={312} textAnchor="middle" fill={INK.red} fontSize={36} {...T}>
              SAN PHẲNG!
            </text>
          </Pop>
        </g>
      ) : null}
      {/* Câu 3: phần mềm chạy dòng ký hiệu, rồi chữ Pháp hiện ra */}
      {screen > 0.01 ? (
        <g opacity={screen}>
          <rect x={90} y={150} width={600} height={470} rx={18} fill="#3A3F45" stroke={INK.line} strokeWidth={5} />
          <rect x={110} y={170} width={560} height={400} rx={8} fill="#0F2A1A" />
          <clipPath id="e04-screen">
            <rect x={110} y={250} width={560} height={240} />
          </clipPath>
          <g clipPath="url(#e04-screen)" opacity={1 - ease(lf, 54, 14) * 0.6}>
            {Array.from({ length: 8 }, (_, r) =>
              Array.from({ length: 14 }, (_, c) => {
                const y = 262 + ((((r * 34 - frame * 2.2) % 272) + 272) % 272);
                return <Glyph key={`${r}-${c}`} k={(r * 5 + c * 3) % 13} x={136 + c * 38} y={y} s={9} w={2.5} color="#7CFF8A" />;
              }),
            )}
          </g>
          <text x={390} y={226} textAnchor="middle" fill="#7CFF8A" fontSize={40} {...T}>
            {sym >= 150000 ? "> 150.000" : sym.toLocaleString("vi-VN")} KÝ HIỆU
          </text>
          {french.map((w, i) => {
            const p = ease(lf, 56 + i * 6, 12);
            return (
              <g key={w} opacity={p}>
                <rect x={130 + (i % 2) * 270} y={274 + Math.floor(i / 2) * 90} width={250} height={64} rx={10} fill="#FFFDF5" stroke={INK.line} strokeWidth={3} />
                <text x={255 + (i % 2) * 270} y={318 + Math.floor(i / 2) * 90} textAnchor="middle" fill={INK.blue} fontSize={30} {...T}>
                  {w}
                </text>
              </g>
            );
          })}
          <Pop p={pop(lf, fps, 72)} cx={390} cy={530}>
            <text x={390} y={546} textAnchor="middle" fill={CHALK_Y} fontSize={44} {...T}>
              ≈ 50.000 TỪ
            </text>
          </Pop>
          <rect x={340} y={620} width={100} height={50} fill="#5A6066" stroke={INK.line} strokeWidth={3} />
          <rect x={270} y={666} width={240} height={20} rx={6} fill="#5A6066" stroke={INK.line} strokeWidth={3} />
        </g>
      ) : null}
      {/* Câu 4: chân dung Mary, ngọn nến tắt, năm 1587 */}
      {mary > 0.01 ? (
        <g opacity={mary}>
          <rect x={60} y={92} width={850} height={688} fill="rgba(30,20,30,0.18)" />
          <ellipse cx={330} cy={420} rx={190} ry={250} fill={INK.wood} stroke={INK.line} strokeWidth={6} />
          <ellipse cx={330} cy={420} rx={168} ry={228} fill="#E9DCC2" stroke={INK.line} strokeWidth={3} />
          <clipPath id="e04-portrait">
            <ellipse cx={330} cy={420} rx={168} ry={228} />
          </clipPath>
          <g clipPath="url(#e04-portrait)">
            <Mary x={330} y={680} s={1.75} frame={frame} smile={-0.3} />
          </g>
          <Candle x={600} y={660} frame={frame} out={li === 3 ? ease(lf, 30, 20) : 1} />
          <Stamp1587 p={li === 3 ? ease(lf, 44, 10) : 1} />
        </g>
      ) : null}
      {/* Câu 5: lá thư năm 1586 với chiếc giá treo cổ nhỏ */}
      {end > 0.01 ? (
        <g opacity={end} transform={`translate(${(1 - end) * 40} 0)`}>
          <CipherSheet x={96} y={160} w={590} h={560} rows={6} cols={7} seed={4} frame={frame} rot={-2} hl={0} hlP={ease(lf, 40, 16) * 0.6}>
            <rect x={400} y={470} width={250} height={230} rx={8} fill="rgba(244,228,193,0.92)" stroke={PAPER_EDGE} strokeWidth={3} />
            <Gallows gx={GALLOWS_AT.gx} gy={GALLOWS_AT.gy + 10} p={1} glow={ease(lf, 20, 16) * (0.6 + 0.4 * Math.sin(frame * 0.15))} />
          </CipherSheet>
          <YearTag x={190} y={190} text="1586" p={1} size={52} />
          <Pop p={pop(lf, fps, 44)} cx={250} cy={600}>
            <rect x={130} y={560} width={250} height={80} rx={14} fill="#FFFDF5" stroke={INK.line} strokeWidth={4} />
            <Tally x={160} y={618} n={7} h={40} gap={10} color={INK.red} />
          </Pop>
        </g>
      ) : null}
      <Stickman x={MILO_X} y={GROUND} {...pose} />
      <Card title={title} formula={formula} p={pop(bf, fps, 8)} fp={pop(lf, fps, 4)} ok={li !== 3} />
    </g>
  );
};

const EP04: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

export const Ep04Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP04[beatKind] ?? Hook;
  return <Beat {...a} />;
};

/** Gradient / pattern riêng của tập (id đặt tiền tố "e04-"), được đặt vào <defs> của khung cảnh. */
export const Ep04Defs: React.FC = () => (
  <radialGradient id="e04-vignette" cx="50%" cy="45%" r="70%">
    <stop offset="60%" stopColor="rgba(0,0,0,0)" />
    <stop offset="100%" stopColor="rgba(30,15,5,0.35)" />
  </radialGradient>
);
