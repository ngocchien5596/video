/**
 * Tập 11 "Con gà hay quả trứng có trước?": cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc
 * (`li`, `lf`), bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780).
 */
import React from "react";
import { ease, Fade, Pop, pop, wave } from "./anim.tsx";
import { Label, Space, Stamp } from "./ep10.tsx";
import { type Anim, Chalkboard, Cross, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

const CREAM = "#FFF6DD";
const GLOW = "#FFE27A";
const SHELL = "#F6E7CC";
const COMB = "#D93A2B";
const BEAK = "#F0A030";
const MILO_X = 800;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const mix = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * k)).join(",")})`;
};

const Milo: React.FC<{ li: number; lf: number; poses: Parameters<typeof linePose>[2]; x?: number }> = ({ li, lf, poses, x = MILO_X }) => (
  <Stickman x={x} y={GROUND} scale={0.82} {...linePose(li, lf, poses)} />
);

// ---------------------------------------------------------------- nhân vật, đồ vật

/** Con gà nhìn sang phải, (x, y) là điểm chân chạm đất. body/tail: màu lông; wild: gà rừng đuôi dài. */
const Chicken: React.FC<{ x: number; y: number; s?: number; body?: string; tail?: string; frame?: number; flip?: boolean; peck?: number }> = ({
  x,
  y,
  s = 1,
  body = "#FBF7EE",
  tail = "#FBF7EE",
  frame = 0,
  flip = false,
  peck = 0,
}) => {
  const bob = wave(frame, 0.18, 3);
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
      {/* chân */}
      {[-16, 18].map((dx) => (
        <g key={dx}>
          <line x1={dx} y1={-56} x2={dx - 2} y2={-4} stroke={BEAK} strokeWidth={8} />
          <path d={`M${dx - 22} 0 L${dx - 2} -4 L${dx + 18} 0 M${dx - 2} -4 L${dx - 4} 6`} fill="none" stroke={BEAK} strokeWidth={6} />
        </g>
      ))}
      {/* đuôi */}
      <path d="M-70 -110 Q-130 -190 -100 -230 Q-80 -170 -40 -150 Q-100 -200 -60 -240 Q-40 -170 -20 -140 Z" fill={tail} />
      {/* thân */}
      <ellipse cx={0} cy={-110} rx={82} ry={62} fill={body} />
      <path d="M-30 -120 Q10 -150 40 -110 Q10 -86 -30 -96 Z" fill={mix("#FFFFFF", body.startsWith("#") ? body : "#FFFFFF", 0.6)} opacity={0.9} />
      {/* cổ và đầu */}
      <g transform={`translate(0 ${bob}) rotate(${peck * 40} 52 -130)`}>
        <path d="M30 -140 Q50 -200 70 -196 Q90 -150 70 -120 Z" fill={body} />
        <circle cx={68} cy={-196} r={30} fill={body} />
        <path d="M50 -222 Q55 -246 64 -226 Q70 -250 78 -226 Q86 -246 90 -220 Z" fill={COMB} />
        <path d="M96 -200 L122 -190 L96 -180 Z" fill={BEAK} />
        <path d="M90 -176 Q96 -156 86 -152 Q78 -160 84 -176 Z" fill={COMB} />
        <circle cx={78} cy={-202} r={5} fill={INK.line} />
      </g>
    </g>
  );
};

/** Quả trứng, tâm (x, y). */
const Egg: React.FC<{ x: number; y: number; rx?: number; ry?: number; fill?: string; spots?: boolean; rot?: number }> = ({ x, y, rx = 60, ry = 78, fill = SHELL, spots = false, rot = 0 }) => (
  <g transform={`rotate(${rot} ${x} ${y})`}>
    <path
      d={`M${x} ${y - ry} C${x + rx * 1.15} ${y - ry} ${x + rx * 1.1} ${y + ry} ${x} ${y + ry} C${x - rx * 1.1} ${y + ry} ${x - rx * 1.15} ${y - ry} ${x} ${y - ry} Z`}
      fill={fill}
      stroke={INK.line}
      strokeWidth={5}
    />
    <path d={`M${x - rx * 0.45} ${y - ry * 0.35} Q${x - rx * 0.35} ${y - ry * 0.7} ${x - rx * 0.05} ${y - ry * 0.75}`} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
    {spots
      ? [
          [-0.4, 0.1],
          [0.3, -0.3],
          [0.2, 0.4],
          [-0.1, -0.5],
          [0.5, 0.15],
        ].map(([dx, dy], i) => <circle key={i} cx={x + dx * rx} cy={y + dy * ry} r={rx * 0.08} fill="#9C8A6A" />)
      : null}
  </g>
);

/** Hai mũi tên cong đuổi nhau quanh tâm (cx, cy). */
const CircleArrows: React.FC<{ cx: number; cy: number; r: number; frame: number; p?: number; stop?: number }> = ({ cx, cy, r, frame, p = 1, stop }) => {
  const a0 = stop ?? frame * 1.6;
  return (
    <g opacity={p} stroke={INK.red} fill="none" strokeWidth={8} strokeLinecap="round">
      {[0, 180].map((off) => {
        const a = ((a0 + off) * Math.PI) / 180;
        const b = a + 2.2;
        const x1 = cx + r * Math.cos(a);
        const y1 = cy + r * 0.55 * Math.sin(a);
        const x2 = cx + r * Math.cos(b);
        const y2 = cy + r * 0.55 * Math.sin(b);
        const tx = -Math.sin(b);
        const ty = Math.cos(b) * 0.55;
        const L = Math.hypot(tx, ty);
        const ux = tx / L;
        const uy = ty / L;
        return (
          <g key={off}>
            <path d={`M${x1} ${y1} A${r} ${r * 0.55} 0 0 1 ${x2} ${y2}`} />
            <path d={`M${x2 + ux * 22} ${y2 + uy * 22} L${x2 - uy * 16} ${y2 + ux * 16} L${x2 + uy * 16} ${y2 - ux * 16} Z`} fill={INK.red} strokeWidth={3} />
          </g>
        );
      })}
    </g>
  );
};

/** Tủ siêu máy tính có đèn nhấp nháy. */
const Rack: React.FC<{ x: number; y: number; w?: number; h?: number; frame: number; seed?: number }> = ({ x, y, w = 130, h = 420, frame, seed = 0 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={10} fill="#33404F" stroke={INK.line} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, r) => (
      <g key={r}>
        <rect x={x + 14} y={y + 20 + r * 44} width={w - 28} height={30} rx={4} fill="#23303D" />
        {[0, 1, 2, 3].map((c) => {
          const on = Math.sin(frame * 0.5 + r * 1.7 + c * 2.3 + seed) > 0.2;
          return <circle key={c} cx={x + 30 + c * 22} cy={y + 35 + r * 44} r={5} fill={on ? (c % 2 ? "#7CF29A" : GLOW) : "#4A5866"} />;
        })}
      </g>
    ))}
  </g>
);

/** Hạt chất vôi li ti. */
const Grain: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 12 }) => (
  <polygon
    points={Array.from({ length: 6 }, (_, i) => `${x + r * Math.cos((i * Math.PI) / 3)},${y + r * Math.sin((i * Math.PI) / 3)}`).join(" ")}
    fill="#F3F1EA"
    stroke={INK.line}
    strokeWidth={3}
  />
);

/** Protein OC-17 như cái kẹp hai càng, tâm (x, y); grip 0..1 càng khép lại. */
const Protein: React.FC<{ x: number; y: number; grip: number; frame: number; s?: number }> = ({ x, y, grip, frame, s = 1 }) => (
  <g transform={`translate(${x} ${y + wave(frame, 0.12, 5)}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
    <path d="M-50 -10 Q-70 -50 -30 -60 Q0 -80 30 -60 Q70 -50 50 -10 Q60 30 20 40 Q-10 60 -40 40 Q-70 25 -50 -10 Z" fill="#9B7BD8" />
    <path d={`M40 -30 Q${110 - 30 * grip} -70 ${130 - 40 * grip} ${-10 + 10 * grip}`} fill="none" stroke="#7A5BC0" strokeWidth={14} />
    <path d={`M40 20 Q${110 - 30 * grip} 60 ${130 - 40 * grip} ${10 - 10 * grip}`} fill="none" stroke="#7A5BC0" strokeWidth={14} />
    <circle cx={-14} cy={-24} r={6} fill={INK.line} />
    <circle cx={10} cy={-24} r={6} fill={INK.line} />
    <path d="M-14 0 Q-2 10 10 0" fill="none" />
  </g>
);

/** Thẻ chữ dạng tờ báo / trích dẫn. */
const Card: React.FC<{ x: number; y: number; w: number; h: number; head?: string; headColor?: string; p: number; rot?: number; children?: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  head,
  headColor = INK.blue,
  p,
  rot = 0,
  children,
}) => (
  <Pop p={p} cx={x + w / 2} cy={y + h / 2}>
    <g transform={rot ? `rotate(${rot} ${x + w / 2} ${y + h / 2})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={18} fill={CREAM} stroke={INK.line} strokeWidth={5} />
      {head ? (
        <>
          <rect x={x} y={y} width={w} height={70} rx={18} fill={headColor} stroke={INK.line} strokeWidth={5} />
          <text x={x + w / 2} y={y + 48} textAnchor="middle" fontSize={34} fill={CREAM} {...T}>
            {head}
          </text>
        </>
      ) : null}
      {children}
    </g>
  </Pop>
);

/** Dải gene: các đoạn màu, đoạn `hot` tô đỏ (đột biến). */
const Gene: React.FC<{ x: number; y: number; w?: number; hot?: boolean; p?: number }> = ({ x, y, w = 200, hot = false, p = 1 }) => {
  const n = 8;
  const cols = ["#5BA3D9", "#7CC474", "#F2BE4A", "#9B7BD8"];
  return (
    <g opacity={p}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + (i * w) / n} y={y} width={w / n} height={26} fill={hot && i === 5 ? INK.red : cols[i % 4]} stroke={INK.line} strokeWidth={3} />
      ))}
    </g>
  );
};

/** Tinh trùng nhỏ bơi sang phải. */
const Sperm: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => (
  <g>
    <path d={`M${x - 70} ${y + wave(frame, 0.6, 8)} Q${x - 45} ${y - wave(frame, 0.6, 10)} ${x - 18} ${y}`} fill="none" stroke={INK.line} strokeWidth={4} />
    <ellipse cx={x} cy={y} rx={18} ry={13} fill="#DDE9F5" stroke={INK.line} strokeWidth={4} />
  </g>
);

/** Ổ trứng khủng long trên nền đất. */
const DinoNest: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={30} rx={170} ry={46} fill="#B88A55" stroke={INK.line} strokeWidth={5} />
    <Egg x={-80} y={-20} rx={46} ry={62} fill="#E9DCC0" spots rot={-12} />
    <Egg x={80} y={-20} rx={46} ry={62} fill="#E9DCC0" spots rot={12} />
    <Egg x={0} y={-40} rx={50} ry={68} fill="#E9DCC0" spots />
    <path d="M-170 30 Q-120 70 0 74 Q120 70 170 30" fill="none" stroke={INK.line} strokeWidth={5} />
  </g>
);

/** Thằn lằn cổ (loài có màng ối) nhìn sang phải. */
const Lizard: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
    <path d="M-60 0 Q-140 -6 -180 24" fill="none" stroke="#6E9A4A" strokeWidth={16} />
    <ellipse cx={0} cy={-6} rx={70} ry={26} fill="#7FB05A" />
    <ellipse cx={82} cy={-14} rx={32} ry={20} fill="#7FB05A" />
    <circle cx={92} cy={-20} r={4} fill={INK.line} />
    {[-40, 30].map((dx) => (
      <path key={dx} d={`M${dx} 12 L${dx - 10} 34 L${dx + 8} 34`} fill="none" />
    ))}
  </g>
);

/** Khủng long cổ dài (dòng chân thằn lằn), nhìn sang phải, chân chạm (x, y). */
const Dino: React.FC<{ x: number; y: number; s?: number; frame?: number }> = ({ x, y, s = 1, frame = 0 }) => {
  const nod = Math.sin(frame / 14) * 4;
  const C = "#8DAE6A";
  const D = "#6E9050";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-60 -70 Q-170 -80 -240 -30" fill="none" stroke={INK.line} strokeWidth={34} />
      <path d="M-60 -70 Q-170 -80 -240 -30" fill="none" stroke={D} strokeWidth={24} />
      {[-40, 40].map((dx) => (
        <g key={dx}>
          <line x1={dx} y1={-60} x2={dx} y2={0} stroke={INK.line} strokeWidth={30} />
          <line x1={dx} y1={-60} x2={dx} y2={-4} stroke={D} strokeWidth={20} />
        </g>
      ))}
      <path d={`M50 -100 Q100 -160 ${110 + nod} -230`} fill="none" stroke={INK.line} strokeWidth={36} />
      <path d={`M50 -100 Q100 -160 ${110 + nod} -230`} fill="none" stroke={C} strokeWidth={26} />
      <ellipse cx={0} cy={-80} rx={90} ry={54} fill={C} stroke={INK.line} strokeWidth={5} />
      <path d="M-50 -60 Q0 -40 50 -60" fill="none" stroke={D} strokeWidth={5} />
      <ellipse cx={128 + nod} cy={-238} rx={34} ry={20} fill={C} stroke={INK.line} strokeWidth={5} />
      <circle cx={136 + nod} cy={-244} r={4.5} fill={INK.line} />
    </g>
  );
};

/** Con cá nhỏ nhìn sang phải. */
const Fish: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <path d="M-60 0 L-90 -26 L-90 26 Z" fill="#5BA3D9" />
    <ellipse cx={0} cy={0} rx={64} ry={34} fill="#7FC1EA" />
    <circle cx={34} cy={-8} r={5} fill={INK.line} />
  </g>
);

/** Cái cây nhỏ, gốc ở (x, y). */
const Tree: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5}>
    <rect x={-12} y={-70} width={24} height={70} fill={INK.wood} />
    <circle cx={0} cy={-110} r={56} fill="#6FAE4E" />
    <circle cx={-30} cy={-90} r={30} fill="#7FBE5A" />
  </g>
);

/** Người que đơn giản, cao h, chân ở (x, y). */
const Person: React.FC<{ x: number; y: number; h: number; color?: string }> = ({ x, y, h, color = "#5B8BD1" }) => {
  const head = h * 0.13;
  return (
    <g stroke={INK.line} strokeWidth={5} strokeLinecap="round">
      <line x1={x} y1={y - h * 0.45} x2={x - h * 0.12} y2={y} />
      <line x1={x} y1={y - h * 0.45} x2={x + h * 0.12} y2={y} />
      <rect x={x - h * 0.12} y={y - h * 0.78} width={h * 0.24} height={h * 0.36} rx={h * 0.06} fill={color} />
      <line x1={x - h * 0.1} y1={y - h * 0.72} x2={x - h * 0.22} y2={y - h * 0.45} />
      <line x1={x + h * 0.1} y1={y - h * 0.72} x2={x + h * 0.22} y2={y - h * 0.45} />
      <circle cx={x} cy={y - h * 0.78 - head} r={head} fill="#F2C9A0" />
    </g>
  );
};

/** Khủng long chân thú nhỏ có lông, đi hai chân, nhìn sang phải. (x, y) là chân chạm đất. */
const Theropod: React.FC<{ x: number; y: number; s?: number; frame?: number }> = ({ x, y, s = 1, frame = 0 }) => {
  const step = Math.sin(frame / 8) * 8;
  const C = "#9C8A4E";
  const D = "#6F6234";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-40 -130 Q-140 -150 -220 -120 Q-140 -118 -40 -100 Z" fill={D} />
      {[-1, 1].map((k) => (
        <path key={k} d={`M${-6 + k * 8} -110 L${16 + k * step} -60 L${-2 + k * step} -6 M${-2 + k * step} -6 L${22 + k * step} -2`} fill="none" stroke={INK.line} strokeWidth={12} />
      ))}
      <ellipse cx={0} cy={-125} rx={66} ry={40} fill={C} />
      <path d="M40 -140 Q70 -190 96 -196 L110 -172 Q80 -160 60 -112 Z" fill={C} />
      <path d="M90 -214 Q150 -214 162 -192 Q150 -176 96 -172 Z" fill={C} />
      <path d="M118 -180 l6 8 l6 -8 l6 8 l6 -8" fill="none" strokeWidth={3} />
      <circle cx={112} cy={-202} r={5} fill={INK.line} />
      <path d="M50 -116 L86 -92 L96 -100" fill="none" strokeWidth={6} />
      {[-40, -14, 12].map((dx) => (
        <path key={dx} d={`M${dx} -162 q10 -22 22 -4`} fill="none" stroke={D} strokeWidth={5} />
      ))}
    </g>
  );
};

/** Chim cổ có răng, móng ở cánh, đuôi xương dài có lông (kiểu Archaeopteryx). (x, y) là chân. */
const AncientBird: React.FC<{ x: number; y: number; s?: number; frame?: number }> = ({ x, y, s = 1, frame = 0 }) => {
  const flap = Math.sin(frame / 7) * 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
      <line x1={-40} y1={-100} x2={-170} y2={-80} strokeWidth={6} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M${-60 - i * 24} ${-97 + i * 3} q-14 -26 -30 -22`} fill="#5E7FA8" strokeWidth={3} />
          <path d={`M${-60 - i * 24} ${-97 + i * 3} q-14 24 -30 22`} fill="#5E7FA8" strokeWidth={3} />
        </g>
      ))}
      {[-8, 12].map((dx) => (
        <path key={dx} d={`M${dx} -80 L${dx + 6} -40 L${dx} 0 M${dx} 0 l18 2`} fill="none" strokeWidth={9} />
      ))}
      <ellipse cx={0} cy={-104} rx={58} ry={36} fill="#7898C0" />
      <path d={`M-10 -120 L-90 ${-210 - flap} L-30 ${-200 - flap} L20 -128 Z`} fill="#5E7FA8" />
      <path d={`M-90 ${-210 - flap} l-14 -8 M-74 ${-208 - flap} l-8 -14`} fill="none" strokeWidth={4} />
      <path d="M36 -120 Q56 -160 74 -168" fill="none" stroke="#7898C0" strokeWidth={22} />
      <path d="M36 -120 Q56 -160 74 -168" fill="none" strokeWidth={4} opacity={0} />
      <circle cx={78} cy={-172} r={22} fill="#7898C0" />
      <path d="M96 -178 L136 -170 L96 -160 Z" fill="#C9B38A" />
      <path d="M104 -168 l3 5 l3 -5 l3 5 l3 -5" fill="none" strokeWidth={2} />
      <circle cx={82} cy={-178} r={4} fill={INK.line} />
    </g>
  );
};

/** Tổ tiên giống vượn đi bằng bốn chi, chống đốt ngón tay. (x, y) là chân. */
const Ape: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const F = "#6B4A2E";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-50 -90 L-60 -40 L-50 0" fill="none" stroke={F} strokeWidth={22} />
      <path d="M-50 -90 L-60 -40 L-50 0" fill="none" strokeWidth={4} opacity={0} />
      <ellipse cx={-10} cy={-110} rx={70} ry={46} fill={F} transform="rotate(-18 -10 -110)" />
      <path d="M40 -130 L60 -60 L58 0" fill="none" stroke={F} strokeWidth={24} />
      <circle cx={70} cy={-150} r={34} fill={F} />
      <ellipse cx={86} cy={-142} rx={18} ry={14} fill="#C9A07A" />
      <circle cx={80} cy={-158} r={4} fill={INK.line} />
      <circle cx={58} cy={2} r={10} fill={F} />
    </g>
  );
};

/** Người cổ: đứng hai chân, lưng hơi khom, lông nâu. (x, y) là chân. */
const EarlyHuman: React.FC<{ x: number; y: number; h: number }> = ({ x, y, h }) => {
  const k = h / 300;
  const F = "#8A5E3B";
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} stroke={INK.line} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-4 -140 L-30 -70 L-26 0 M-4 -140 L20 -72 L26 0" fill="none" stroke={F} strokeWidth={22} />
      <path d="M-14 -150 Q0 -230 30 -250" fill="none" stroke={F} strokeWidth={46} />
      <path d="M24 -232 L50 -160 L44 -112" fill="none" stroke={F} strokeWidth={16} />
      <circle cx={44} cy={-272} r={30} fill={F} strokeWidth={5} />
      <ellipse cx={62} cy={-266} rx={14} ry={14} fill="#C9A07A" strokeWidth={4} />
      <circle cx={58} cy={-280} r={4} fill={INK.line} />
    </g>
  );
};

/** Đường thời gian ngang. */
const Timeline: React.FC<{ y: number; x0?: number; x1?: number; p?: number }> = ({ y, x0 = 80, x1 = 890, p = 1 }) => (
  <g opacity={p}>
    <line x1={x0} y1={y} x2={x1 - 30} y2={y} stroke={INK.line} strokeWidth={8} strokeLinecap="round" />
    <path d={`M${x1} ${y} L${x1 - 40} ${y - 22} L${x1 - 40} ${y + 22} Z`} fill={INK.line} />
    <text x={x1 - 20} y={y + 52} textAnchor="end" fontSize={30} fill={INK.line} {...T}>
      NAY
    </text>
  </g>
);

// ---------------------------------------------------------------- hồi 1: câu đố
const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Pop p={pop(lf, fps, 0)} cx={230} cy={600}>
          <Chicken x={230} y={720} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 12)} cx={700} cy={640}>
          <Egg x={700} y={640} rx={70} ry={92} />
        </Pop>
        <CircleArrows cx={470} cy={560} r={300} frame={frame} p={ease(lf, 30, 14)} />
        <Label x={470} y={540 + wave(frame, 0.12, 8)} text="?" size={170} color={INK.red} p={pop(lf, fps, 24)} />
        <Label x={480} y={190} text="GÀ HAY TRỨNG?" size={56} color={INK.line} p={pop(lf, fps, 6)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Card x={90} y={150} w={580} h={430} head="BÁO MẠNG" p={pop(lf, fps, 0)}>
          <text x={380} y={330} textAnchor="middle" fontSize={70} fill={INK.red} {...T}>
            GÀ CÓ
          </text>
          <text x={380} y={410} textAnchor="middle" fontSize={70} fill={INK.red} {...T}>
            TRƯỚC!
          </text>
          <text x={380} y={500} textAnchor="middle" fontSize={30} fill={INK.line} {...T}>
            CÁC NHÀ KHOA HỌC ANH
          </text>
        </Card>
        <Stamp x={380} y={690} text="ĐÃ CHỨNG MINH?" p={pop(lf, fps, 90)} size={44} rot={-4} />
        <Milo li={0} lf={lf} poses={["think"]} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        {[100, 250, 400].map((x, i) => (
          <Pop key={x} p={pop(lf, fps, i * 6)} cx={x + 65} cy={450}>
            <Rack x={x} y={230} frame={frame} seed={i * 3} />
          </Pop>
        ))}
        <Label x={330} y={190} text="SIÊU MÁY TÍNH" size={44} color={INK.blue} p={pop(lf, fps, 10)} />
        {[
          { x: 210, t: "GÀ", c: COMB },
          { x: 450, t: "TRỨNG", c: INK.gold },
        ].map((b, i) => (
          <Pop key={b.t} p={pop(lf, fps, 90 + i * 10)} cx={b.x} cy={735}>
            <rect x={b.x - 100} y={700} width={200} height={70} rx={35} fill={b.c} stroke={INK.line} strokeWidth={5} />
            <text x={b.x} y={748} textAnchor="middle" fontSize={40} fill={CREAM} {...T}>
              {b.t}
            </text>
          </Pop>
        ))}
        <Milo li={0} lf={lf} poses={["scratch"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 2: gạt cái tít báo
const GRAINS: [number, number][] = [
  [-180, -120],
  [170, -150],
  [-210, 90],
  [200, 110],
  [-60, -200],
  [60, 190],
  [-150, 10],
  [150, -20],
];

const Barrier: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Egg x={230} y={480} rx={110} ry={145} />
        <circle cx={300} cy={400} r={30} fill="none" stroke={INK.red} strokeWidth={5} opacity={ease(lf, 20, 10)} />
        <g opacity={ease(lf, 30, 14)}>
          <line x1={320} y1={378} x2={560} y2={260} stroke={INK.red} strokeWidth={4} strokeDasharray="10 8" />
          <line x1={320} y1={422} x2={560} y2={640} stroke={INK.red} strokeWidth={4} strokeDasharray="10 8" />
          <circle cx={660} cy={450} r={210} fill="#FBF3E0" stroke={INK.red} strokeWidth={6} />
          {GRAINS.map(([dx, dy], i) => (
            <Grain key={i} x={660 + dx * 0.7} y={450 + dy * 0.8} r={16} />
          ))}
          <Protein x={630} y={450} grip={0.3} frame={frame} s={0.8} />
        </g>
        <Stamp x={230} y={200} text="NĂM 2010" p={pop(lf, fps, 6)} size={44} color={INK.blue} />
        <Label x={660} y={760} text="PROTEIN OC-17" size={42} color={INK.blue} p={pop(lf, fps, 120)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <circle cx={480} cy={470} r={260} fill="#FBF3E0" stroke={INK.line} strokeWidth={5} />
        {(() => {
          const gather = ease(lf, 40, 50);
          return (
            <g>
              {GRAINS.map(([dx, dy], i) => {
                const tx = 560 + ((i % 3) - 1) * 30;
                const ty = 450 + (Math.floor(i / 3) - 1) * 30;
                const x = 480 + dx * 1.2 + (tx - 480 - dx * 1.2) * gather + wave(frame, 0.1, 6, i) * (1 - gather);
                const y = 450 + dy * 1.2 + (ty - 450 - dy * 1.2) * gather + wave(frame, 0.08, 6, i * 2) * (1 - gather);
                return <Grain key={i} x={x} y={y} r={16} />;
              })}
              {gather > 0.95 ? (
                <polygon
                  points={Array.from({ length: 6 }, (_, i) => `${560 + 62 * Math.cos((i * Math.PI) / 3 + Math.PI / 6)},${450 + 62 * Math.sin((i * Math.PI) / 3 + Math.PI / 6)}`).join(" ")}
                  fill="none"
                  stroke={INK.blue}
                  strokeWidth={6}
                />
              ) : null}
              <Protein x={300 + 160 * ease(lf, 10, 30)} y={450} grip={gather} frame={frame} />
            </g>
          );
        })()}
        <Label x={480} y={190} text="HẠT VÔI LI TI" size={42} color={INK.line} p={pop(lf, fps, 8)} />
        <Label x={480} y={740} text="KẾT THÀNH TINH THỂ" size={42} color={INK.blue} p={pop(lf, fps, 80)} />
        <Stamp x={480} y={810} text="VỎ CỨNG NHANH" p={pop(lf, fps, 140)} color={INK.green} size={40} rot={-3} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Chicken x={200} y={760} s={0.85} frame={frame} />
        <Egg x={360} y={720} rx={40} ry={52} />
        <Card x={100} y={150} w={560} h={330} p={pop(lf, fps, 20)} rot={-3}>
          <rect x={100} y={150} width={560} height={330} rx={18} fill="none" stroke={INK.red} strokeWidth={8} />
          <text x={380} y={280} textAnchor="middle" fontSize={58} fill={INK.red} {...T}>
            PHẢI CÓ GÀ
          </text>
          <text x={380} y={360} textAnchor="middle" fontSize={58} fill={INK.red} {...T}>
            MỚI CÓ TRỨNG!
          </text>
        </Card>
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <Card x={100} y={120} w={460} h={190} p={1} rot={-3}>
          <text x={330} y={200} textAnchor="middle" fontSize={40} fill={INK.red} {...T}>
            PHẢI CÓ GÀ
          </text>
          <text x={330} y={260} textAnchor="middle" fontSize={40} fill={INK.red} {...T}>
            MỚI CÓ TRỨNG!
          </text>
        </Card>
        <Cross x={540} y={170} r={50} p={pop(lf, fps, 170)} />
        <Card x={90} y={350} w={590} h={200} head="ĐẠI HỌC WARWICK" p={pop(lf, fps, 10)}>
          <text x={385} y={480} textAnchor="middle" fontSize={44} fill={INK.line} {...T}>
            CHỈ LÀ MỘT PHẦN
          </text>
        </Card>
        <Stamp x={385} y={680} text="CHƯA PHẢI LỜI GIẢI CUỐI" p={pop(lf, fps, 110)} size={36} rot={-3} />
        <Milo li={0} lf={lf} poses={["think"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 3: lật lại lịch sử
const JUNGLE = { body: "#C8642E", tail: "#2F4A3A" };

const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Timeline y={560} p={ease(lf, 0, 14)} />
        <Pop p={pop(lf, fps, 20)} cx={360} cy={450}>
          <Chicken x={360} y={540} s={0.85} body={JUNGLE.body} tail={JUNGLE.tail} frame={frame} />
        </Pop>
        <Label x={360} y={250} text="GÀ RỪNG LÔNG ĐỎ" size={36} color={INK.line} p={pop(lf, fps, 30)} />
        <path d={`M470 430 L${470 + 140 * ease(lf, 70, 20)} 430`} stroke={INK.green} strokeWidth={10} strokeLinecap="round" />
        <Pop p={pop(lf, fps, 90)} cx={720} cy={450}>
          <Chicken x={720} y={540} s={0.85} frame={frame} />
        </Pop>
        <Label x={720} y={250} text="GÀ NHÀ" size={40} color={INK.line} p={pop(lf, fps, 96)} />
        <Stamp x={560} y={700} text="KHOẢNG 10.000 NĂM" p={pop(lf, fps, 130)} size={40} color={INK.blue} rot={-3} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Timeline y={600} />
        <g opacity={ease(lf, 0, 10)}>
          <Chicken x={830} y={590} s={0.3} frame={frame} />
          <line x1={830} y1={600} x2={830} y2={640} stroke={INK.line} strokeWidth={4} />
        </g>
        <Pop p={pop(lf, fps, 40)} cx={250} cy={480}>
          <DinoNest x={250} y={510} s={0.9} />
        </Pop>
        <Pop p={pop(lf, fps, 60)} cx={540} cy={450}>
          <Dino x={560} y={590} s={0.9} frame={frame} />
        </Pop>
        <line x1={250} y1={580} x2={250} y2={640} stroke={INK.line} strokeWidth={6} opacity={ease(lf, 40, 10)} />
        <Label x={280} y={720} text="195 TRIỆU NĂM" size={46} color={INK.red} p={pop(lf, fps, 80)} />
        <Label x={480} y={200} text="TRỨNG CỔ NHẤT TỪNG THẤY" size={38} color={INK.line} p={pop(lf, fps, 20)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Timeline y={600} />
        <DinoNest x={250} y={510} s={0.9} />
        <Chicken x={830} y={590} s={0.3} frame={frame} />
        <path d={`M260 660 Q545 ${760} 830 660`} fill="none" stroke={INK.red} strokeWidth={6} strokeDasharray="14 10" opacity={ease(lf, 10, 20)} />
        <Label x={545} y={800} text="CÁCH NHAU RẤT XA" size={38} color={INK.red} p={pop(lf, fps, 40)} />
        <Stamp x={480} y={220} text="TRỨNG CÓ TRƯỚC" p={pop(lf, fps, 70)} color={INK.green} size={50} rot={-4} />
        <Pop p={pop(lf, fps, 150)} cx={545} cy={400}>
          <Egg x={545} y={400} rx={52} ry={68} />
          <text x={545} y={428} textAnchor="middle" fontSize={70} fill={INK.red} {...T}>
            ?
          </text>
        </Pop>
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <Egg x={380} y={500} rx={130} ry={170} />
        <Label x={380} y={560 + wave(frame, 0.12, 8)} text="?" size={160} color={INK.red} p={pop(lf, fps, 20)} />
        <Label x={380} y={210} text="CÒN TRỨNG GÀ?" size={50} color={INK.line} p={pop(lf, fps, 6)} />
        <Milo li={0} lf={lf} poses={["eureka"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 4: SGK, đột biến gene
const NEAR = { body: "#B77B45", tail: "#3E5A44" };

const Theorem: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Chalkboard x={90} y={130} w={560} h={280} open={ease(lf, 0, 16)} />
        <Fade p={ease(lf, 14, 12)}>
          <text x={370} y={210} textAnchor="middle" fontSize={38} fill={CREAM} {...T}>
            SINH HỌC 12 · BÀI 4
          </text>
          <text x={370} y={310} textAnchor="middle" fontSize={56} fill={GLOW} {...T}>
            ĐỘT BIẾN GENE
          </text>
        </Fade>
        {/* tế bào sinh dục của bố mẹ → con */}
        <g opacity={ease(lf, 60, 14)}>
          <circle cx={190} cy={560} r={64} fill="#F7D9C4" stroke={INK.line} strokeWidth={5} />
          <Gene x={130} y={547} w={120} hot />
          <path d={`M270 560 L${270 + 140 * ease(lf, 90, 24)} 560`} stroke={INK.red} strokeWidth={10} strokeLinecap="round" />
          <circle cx={540} cy={560} r={80} fill="#F7E7C4" stroke={INK.line} strokeWidth={5} opacity={ease(lf, 110, 10)} />
          <Gene x={470} y={547} w={140} hot p={ease(lf, 110, 10)} />
        </g>
        <Label x={190} y={680} text="BỐ MẸ" size={34} color={INK.line} p={pop(lf, fps, 70)} />
        <Label x={540} y={700} text="ĐỜI CON" size={34} color={INK.line} p={pop(lf, fps, 120)} />
        <Label x={380} y={790} text="NGUYÊN LIỆU CỦA TIẾN HOÁ" size={34} color={INK.green} p={pop(lf, fps, 180)} />
        <Milo li={0} lf={lf} poses={["point"]} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Chicken x={170} y={400} s={0.6} body={NEAR.body} tail={NEAR.tail} frame={frame} />
        <Chicken x={790} y={400} s={0.6} body={NEAR.body} tail={NEAR.tail} frame={frame + 20} flip />
        <Label x={480} y={190} text="CHƯA HẲN LÀ GÀ" size={42} color={INK.gold} p={pop(lf, fps, 10)} />
        {(() => {
          const k = ease(lf, 50, 60);
          const meet = k > 0.98;
          return (
            <g>
              <Egg x={480} y={610} rx={140} ry={180} fill="#FBF3E0" />
              {!meet ? (
                <g>
                  <Sperm x={230 + 220 * k} y={470 + 140 * k} frame={frame} />
                  <circle cx={730 - 230 * k} cy={470 + 140 * k} r={34} fill="#F7D9C4" stroke={INK.line} strokeWidth={4} />
                </g>
              ) : (
                <Pop p={pop(lf, fps, 112)} cx={480} cy={610}>
                  <circle cx={480} cy={610} r={60} fill="#F7D9C4" stroke={INK.line} strokeWidth={5} />
                  <Gene x={430} y={598} w={100} hot />
                </Pop>
              )}
              <Gene x={150} y={440} w={120} hot p={1 - k} />
              <Gene x={690} y={440} w={120} hot p={1 - k} />
            </g>
          );
        })()}
        <Label x={480} y={830} text="HỢP TỬ" size={40} color={INK.blue} p={pop(lf, fps, 120)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Card x={90} y={120} w={590} h={160} p={pop(lf, fps, 4)}>
          <text x={385} y={190} textAnchor="middle" fontSize={38} fill={INK.line} {...T}>
            JOHN BROOKFIELD
          </text>
          <text x={385} y={245} textAnchor="middle" fontSize={30} fill={INK.blue} {...T}>
            ĐẠI HỌC NOTTINGHAM
          </text>
        </Card>
        <Egg x={360} y={540} rx={150} ry={190} fill="#FBF3E0" />
        {/* phôi gà cuộn tròn */}
        <g transform={`translate(360 560) scale(${0.85 + 0.15 * ease(lf, 40, 60)})`}>
          <path d="M-50 20 Q-70 -50 0 -60 Q60 -60 60 0 Q60 50 10 60 Q-30 60 -20 30" fill="#F6C1B0" stroke={INK.line} strokeWidth={5} />
          <circle cx={20} cy={-30} r={26} fill="#F6C1B0" stroke={INK.line} strokeWidth={5} />
          <circle cx={28} cy={-34} r={6} fill={INK.line} />
        </g>
        <Gene x={270} y={660} w={180} hot />
        <Stamp x={360} y={810} text="ĐÃ LÀ GÀ" p={pop(lf, fps, 150)} color={INK.green} size={42} rot={-3} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        {(() => {
          const crack = ease(lf, 10, 30);
          const out = ease(lf, 40, 30);
          return (
            <g>
              <g transform={`translate(0 ${-60 * out}) rotate(${-25 * out} 380 420)`}>
                <path d="M250 420 C250 260 510 260 510 420 L470 400 L430 430 L390 395 L350 430 L310 400 L270 430 Z" fill={SHELL} stroke={INK.line} strokeWidth={5} />
              </g>
              <g transform={`translate(380 ${560 - 70 * out}) scale(${0.6 + 0.4 * out})`}>
                <ellipse cx={0} cy={-10} rx={80} ry={70} fill="#FFD84A" stroke={INK.line} strokeWidth={5} />
                <circle cx={40} cy={-80} r={44} fill="#FFD84A" stroke={INK.line} strokeWidth={5} />
                <circle cx={54} cy={-88} r={6} fill={INK.line} />
                <path d="M80 -84 L104 -76 L80 -68 Z" fill={BEAK} stroke={INK.line} strokeWidth={4} />
              </g>
              <path d="M250 430 C250 660 510 660 510 430 L470 410 L430 440 L390 405 L350 440 L310 410 L270 440 Z" fill={SHELL} stroke={INK.line} strokeWidth={5} />
              <path d={`M270 ${430} L310 ${410} L350 ${440} L390 ${405} L430 ${440} L470 ${410}`} fill="none" stroke={INK.line} strokeWidth={4} opacity={1 - crack * 0} />
            </g>
          );
        })()}
        <Stamp x={380} y={190} text="TRỨNG CÓ TRƯỚC" p={pop(lf, fps, 90)} color={INK.green} size={48} rot={-4} />
        <Milo li={0} lf={lf} poses={["eureka"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 5: không có con gà đầu tiên duy nhất
const Realworld: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <defs>
          <linearGradient id="e11-evo" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9C8A4E" />
            <stop offset="0.4" stopColor="#7898C0" />
            <stop offset="0.7" stopColor={JUNGLE.body} />
            <stop offset="1" stopColor="#FBF7EE" />
          </linearGradient>
        </defs>
        <Label x={480} y={175} text="GÀ TỪ ĐÂU MÀ CÓ?" size={46} color={INK.line} p={pop(lf, fps, 4)} />
        <Pop p={pop(lf, fps, 10)} cx={190} cy={480}>
          <Theropod x={200} y={560} s={0.5} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 50)} cx={420} cy={480}>
          <AncientBird x={420} y={560} s={0.55} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 100)} cx={600} cy={480}>
          <Chicken x={595} y={560} s={0.45} body={JUNGLE.body} tail={JUNGLE.tail} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 130)} cx={800} cy={480}>
          <Chicken x={795} y={560} s={0.45} frame={frame + 9} />
        </Pop>
        {[292, 520, 702].map((x, i) => (
          <path key={x} d={`M${x - 18} 470 L${x + 18} 470 M${x + 4} 456 L${x + 20} 470 L${x + 4} 484`} fill="none" stroke={INK.red} strokeWidth={7} strokeLinecap="round" opacity={ease(lf, 40 + i * 45, 10)} />
        ))}
        {[
          { x: 190, a: "KHỦNG LONG", b: "CHÂN THÚ", at: 20 },
          { x: 420, a: "CHIM CỔ", b: "CÓ RĂNG", at: 60 },
          { x: 600, a: "GÀ RỪNG", b: "LÔNG ĐỎ", at: 110 },
          { x: 800, a: "GÀ NHÀ", b: "", at: 140 },
        ].map((r) => (
          <g key={r.x}>
            <Label x={r.x} y={620} text={r.a} size={28} color={INK.line} p={pop(lf, fps, r.at)} />
            {r.b ? <Label x={r.x} y={656} text={r.b} size={24} color={INK.blue} p={pop(lf, fps, r.at + 4)} /> : null}
          </g>
        ))}
        <rect x={90} y={700} width={790} height={34} rx={17} fill="url(#e11-evo)" stroke={INK.line} strokeWidth={4} opacity={ease(lf, 150, 14)} />
        <Label x={480} y={800} text="QUA VÔ SỐ THẾ HỆ" size={38} color={INK.red} p={pop(lf, fps, 160)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Label x={480} y={175} text="NGƯỜI TỪ ĐÂU MÀ CÓ?" size={46} color={INK.line} p={pop(lf, fps, 4)} />
        <line x1={90} y1={600} x2={880} y2={600} stroke={INK.wood} strokeWidth={6} opacity={ease(lf, 0, 14)} />
        <Pop p={pop(lf, fps, 10)} cx={200} cy={520}>
          <Ape x={200} y={600} s={1} />
        </Pop>
        <Pop p={pop(lf, fps, 60)} cx={470} cy={480}>
          <EarlyHuman x={470} y={600} h={250} />
        </Pop>
        <Pop p={pop(lf, fps, 110)} cx={720} cy={460}>
          <Person x={720} y={600} h={300} />
        </Pop>
        {[335, 595].map((x, i) => (
          <path key={x} d={`M${x - 18} 470 L${x + 18} 470 M${x + 4} 456 L${x + 20} 470 L${x + 4} 484`} fill="none" stroke={INK.red} strokeWidth={7} strokeLinecap="round" opacity={ease(lf, 50 + i * 50, 10)} />
        ))}
        {[
          { x: 200, a: "TỔ TIÊN", b: "GIỐNG VƯỢN", at: 20 },
          { x: 470, a: "NGƯỜI CỔ", b: "", at: 70 },
          { x: 720, a: "NGƯỜI NAY", b: "", at: 120 },
        ].map((r) => (
          <g key={r.x}>
            <Label x={r.x} y={650} text={r.a} size={30} color={INK.line} p={pop(lf, fps, r.at)} />
            {r.b ? <Label x={r.x} y={688} text={r.b} size={26} color={INK.blue} p={pop(lf, fps, r.at + 4)} /> : null}
          </g>
        ))}
        <Label x={480} y={250} text="CHỪNG 6 TRIỆU NĂM" size={36} color={INK.blue} p={pop(lf, fps, 60)} />
        <Stamp x={480} y={790} text="KHÔNG CÓ NGÀY NHẢY VỌT" p={pop(lf, fps, 200)} size={36} rot={-3} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Egg x={260} y={480} rx={120} ry={160} />
        <path d="M260 320 C390 320 385 640 260 640" fill="none" stroke={INK.blue} strokeWidth={14} opacity={0.6 * ease(lf, 90, 14)} />
        <Pop p={pop(lf, fps, 50)} cx={470} cy={470}>
          <Protein x={470} y={470} grip={ease(lf, 70, 20)} frame={frame} s={0.7} />
        </Pop>
        {[[420, 400], [430, 540], [520, 420], [530, 520]].map(([gx, gy], i) => (
          <g key={i} opacity={ease(lf, 40 + i * 6, 10)}>
            <Grain x={gx} y={gy} r={10} />
          </g>
        ))}
        <Label x={300} y={730} text="OC-17: VỎ CỨNG NHANH" size={36} color={INK.blue} p={pop(lf, fps, 100)} />
        <Stamp x={330} y={200} text="ĐÁP ÁN: TRỨNG" p={pop(lf, fps, 10)} color={INK.green} size={48} rot={-4} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    ) : null}
  </g>
);

// ---------------------------------------------------------------- hồi 6: tổ tiên chung
const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <g>
    {li === 0 ? (
      <g>
        <Label x={480} y={170} text="LẦN NGƯỢC VỀ QUÁ KHỨ" size={42} color={INK.line} p={pop(lf, fps, 6)} />
        <line x1={130} y1={220} x2={130} y2={220 + 560 * ease(lf, 0, 120)} stroke={INK.wood} strokeWidth={10} strokeLinecap="round" />
        <path d={`M108 ${222 + 560 * ease(lf, 0, 120)} L130 ${252 + 560 * ease(lf, 0, 120)} L152 ${222 + 560 * ease(lf, 0, 120)}`} fill={INK.wood} />
        {[
          { y: 300, at: 0, text: "GÀ", color: INK.line },
          { y: 520, at: 50, text: "KHỦNG LONG", color: INK.line },
          { y: 730, at: 100, text: "320 TRIỆU NĂM", color: INK.red },
        ].map((r) => (
          <g key={r.y}>
            <circle cx={130} cy={r.y} r={16} fill={GLOW} stroke={INK.line} strokeWidth={4} opacity={ease(lf, r.at, 10)} />
            <Label x={560} y={r.y + 10} text={r.text} size={34} color={r.color} p={pop(lf, fps, r.at + 20)} anchor="start" />
          </g>
        ))}
        <Pop p={pop(lf, fps, 0)} cx={360} cy={260}>
          <Chicken x={360} y={320} s={0.5} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 50)} cx={360} cy={470}>
          <Theropod x={360} y={600} s={0.6} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 100)} cx={360} cy={720}>
          <Lizard x={380} y={740} s={0.9} />
          <Egg x={230} y={720} rx={30} ry={40} spots />
        </Pop>
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Space frame={frame} />
        {[160, 330, 500, 670, 820].map((x, i) => (
          <path
            key={x}
            d={`M${x} 120 Q${x + (480 - x) * 0.3} 400 480 620`}
            fill="none"
            stroke={GLOW}
            strokeWidth={5}
            strokeDasharray="1200"
            strokeDashoffset={1200 * (1 - ease(lf, 10 + i * 8, 50))}
            opacity={0.7}
          />
        ))}
        <circle cx={480} cy={620} r={30 + 8 * Math.sin(frame / 6)} fill={GLOW} opacity={ease(lf, 60, 14)} />
        <circle cx={480} cy={620} r={70 + 10 * Math.sin(frame / 6)} fill={GLOW} opacity={0.25 * ease(lf, 60, 14)} />
        <Label x={480} y={740} text="LUCA" size={56} color={GLOW} p={pop(lf, fps, 70)} />
        <Stamp x={480} y={200} text="4 TỈ NĂM TRƯỚC" p={pop(lf, fps, 100)} size={44} rot={-3} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <circle cx={480} cy={700} r={28 + 6 * Math.sin(frame / 6)} fill={GLOW} stroke={INK.line} strokeWidth={4} />
        {[
          [170, 420],
          [380, 330],
          [590, 330],
          [790, 420],
        ].map(([x, y], i) => (
          <path key={i} d={`M480 690 Q${(480 + x) / 2} ${y + 220} ${x} ${y + 70}`} fill="none" stroke={INK.wood} strokeWidth={10} strokeLinecap="round" strokeDasharray="700" strokeDashoffset={700 * (1 - ease(lf, i * 10, 30))} />
        ))}
        <Pop p={pop(lf, fps, 30)} cx={170} cy={400}>
          <Tree x={170} y={490} s={0.8} />
        </Pop>
        <Pop p={pop(lf, fps, 45)} cx={380} cy={380}>
          <Fish x={380} y={380} s={0.9} />
        </Pop>
        <Pop p={pop(lf, fps, 60)} cx={590} cy={350}>
          <Chicken x={590} y={420} s={0.45} frame={frame} />
        </Pop>
        <Pop p={pop(lf, fps, 75)} cx={790} cy={400}>
          <Person x={790} y={490} h={170} />
        </Pop>
        <Label x={480} y={190} text="HỌ HÀNG RẤT XA" size={48} color={INK.green} p={pop(lf, fps, 120)} />
        <Label x={480} y={800} text="LUCA" size={40} color={INK.gold} p={pop(lf, fps, 10)} />
      </g>
    ) : null}
    {li === 3 ? (
      <g>
        <Chicken x={230} y={720} frame={frame} />
        <Egg x={600} y={620} rx={80} ry={104} />
        <circle cx={600} cy={620} r={140 + 8 * Math.sin(frame / 6)} fill="none" stroke={GLOW} strokeWidth={10} opacity={ease(lf, 40, 14)} />
        <CircleArrows cx={430} cy={560} r={300} frame={frame} stop={Math.min(lf * 1.6, 70)} p={1 - ease(lf, 60, 20)} />
        <Stamp x={480} y={200} text="TRỨNG CÓ TRƯỚC" p={pop(lf, fps, 60)} color={INK.green} size={50} rot={-4} />
        <Label x={480} y={320} text="MẸ NÓ CHƯA HẲN LÀ GÀ" size={34} color={INK.line} p={pop(lf, fps, 150)} />
      </g>
    ) : null}
  </g>
);

const EP11: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep11Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP11[beatKind] ?? Hook;
  return <Beat {...a} />;
};

// giữ clamp01 cho các lần chỉnh sau
void clamp01;
