/**
 * Tập 15 "Trời rét, cẩn thận khí gas": cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc (`li`, `lf`),
 * bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts. Không vẽ hiện trường vụ nổ có thật.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780).
 */
import React from "react";
import { ease, Pop, pop, wave } from "./anim.tsx";
import { Label } from "./ep10.tsx";
import { Person, Room } from "./ep13.tsx";
import { type Anim, Chalkboard, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

export const READY: boolean = true;

const CREAM = "#FFF6DD";
const GLOW = "#FFE27A";
const RED = "#D94A3D";
const GAS = "#B9CF6A";

const Milo: React.FC<{ li: number; lf: number; poses: Parameters<typeof linePose>[2]; x?: number }> = ({ li, lf, poses, x = 800 }) => (
  <Stickman x={x} y={GROUND} scale={0.82} {...linePose(li, lf, poses)} />
);

// ---------------------------------------------------------------- đồ vật

/** Bình gas đứng, (x, y) là tâm đáy, cao ~250·s. */
const Cylinder: React.FC<{ x: number; y: number; s?: number; valve?: number }> = ({ x, y, s = 1, valve = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <ellipse cx={0} cy={2} rx={92} ry={12} fill="#000" opacity={0.2} stroke="none" />
    <path d="M-62 -14 L62 -14 L58 2 L-58 2 Z" fill="#9C2F26" />
    <path d="M-80 -150 Q-80 -188 -40 -192 L40 -192 Q80 -188 80 -150 L80 -40 Q80 -8 44 -8 L-44 -8 Q-80 -8 -80 -40 Z" fill={RED} />
    <path d="M-62 -146 Q-60 -172 -38 -176 L-30 -24 Q-60 -24 -62 -48 Z" fill="#FFFFFF" opacity={0.22} stroke="none" />
    <path d="M-80 -100 L80 -100" strokeWidth={4} opacity={0.5} />
    <path d="M-48 -192 L-44 -252 L-28 -252 L-28 -192 M48 -192 L44 -252 L28 -252 L28 -192" fill="#B93A2F" />
    <rect x={-52} y={-264} width={104} height={16} rx={8} fill="#B93A2F" />
    <rect x={-13} y={-222} width={26} height={30} fill="#C9A04A" />
    <g transform={`translate(0 -228) scale(${Math.cos(valve * Math.PI) * 0.9 + 0.1} 1)`}>
      <rect x={-22} y={-9} width={44} height={14} rx={7} fill="#3F4650" />
    </g>
  </g>
);

/** Bếp hai lò trên tủ bếp. (x, y) là góc trên trái mặt bếp. */
const Counter: React.FC<{ x: number; y: number; w: number; bottom?: number; fire?: boolean; frame?: number }> = ({ x, y, w, bottom = 780, fire = false, frame = 0 }) => (
  <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <rect x={x + 10} y={y + 26} width={w - 20} height={bottom - y - 26} fill="#8FB0A8" />
    <rect x={x + 30} y={y + 52} width={(w - 80) / 2} height={bottom - y - 80} rx={6} fill="#A9C6BE" />
    <rect x={x + w / 2 + 10} y={y + 52} width={(w - 80) / 2} height={bottom - y - 80} rx={6} fill="#A9C6BE" />
    <circle cx={x + w / 2 - 22} cy={y + 90} r={6} fill={INK.gold} />
    <circle cx={x + w / 2 + 22} cy={y + 90} r={6} fill={INK.gold} />
    <rect x={x} y={y} width={w} height={28} rx={6} fill="#E8E2D4" />
    <rect x={x + 40} y={y - 24} width={w - 80} height={26} rx={6} fill="#4A515C" />
    <circle cx={x + 80} cy={y - 10} r={7} fill={CREAM} />
    <circle cx={x + w - 80} cy={y - 10} r={7} fill={CREAM} />
    {fire ? [-30, -10, 10, 30].map((d, i) => <path key={d} d={`M${x + w / 2 + d - 8} ${y - 26} q8 ${-22 - wave(frame, 0.5, 5, i)} 16 0 Z`} fill="#5AA9F0" strokeWidth={2} />) : null}
    <path d={`M${x + w / 2 - 66} ${y - 92} L${x + w / 2 - 58} ${y - 34} Q${x + w / 2} ${y - 26} ${x + w / 2 + 58} ${y - 34} L${x + w / 2 + 66} ${y - 92} Z`} fill="#9AA5B0" />
    <path d={`M${x + w / 2 - 66} ${y - 84} h-24 M${x + w / 2 + 66} ${y - 84} h24`} strokeWidth={11} strokeLinecap="round" />
    <rect x={x + w / 2 - 74} y={y - 106} width={148} height={16} rx={8} fill="#7D8893" />
    <circle cx={x + w / 2} cy={y - 114} r={10} fill="#4A515C" />
  </g>
);

/** Cửa sổ bếp, `open` 0 đóng → 1 mở trượt sang phải. */
const Win: React.FC<{ x: number; y: number; w?: number; h?: number; open: number; night?: boolean }> = ({ x, y, w = 260, h = 230, open, night = false }) => (
  <g stroke={INK.line} strokeWidth={5}>
    <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx={8} fill="#B98552" />
    <rect x={x} y={y} width={w} height={h} fill={night ? "#18234A" : "#B9CBD8"} />
    {night ? (
      <g stroke="none" fill={CREAM}>
        <circle cx={x + 60} cy={y + 56} r={26} fill="#F5EBC0" />
        {[[130, 40], [40, 150], [110, 120], [160, 170]].map(([a, b]) => <circle key={a} cx={x + a} cy={y + b} r={3} />)}
      </g>
    ) : (
      <path d={`M${x} ${y + h} L${x} ${y + h - 50} L${x + 60} ${y + h - 100} L${x + 120} ${y + h - 60} L${x + 190} ${y + h - 120} L${x + w} ${y + h - 50} L${x + w} ${y + h} Z`} fill="#8CA3AE" strokeWidth={3} />
    )}
    <g fill="#DDEFF6" fillOpacity={0.5}>
      <rect x={x + w / 2} y={y} width={w / 2} height={h} />
      <rect x={x + (open * w) / 2} y={y} width={w / 2} height={h} fillOpacity={0.62} />
    </g>
  </g>
);

/** Gian bếp: tường, gạch men, cửa sổ, tủ bếp, bình gas nối dây. */
const Kitchen: React.FC<{ frame: number; open?: number; night?: boolean; fire?: boolean; valve?: number }> = ({ frame, open = 0, night = false, fire = false, valve = 0 }) => (
  <g>
    <Room win={false} night={night} floor={720} />
    <g opacity={night ? 0.35 : 0.9}>
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => <rect key={`${r}-${c}`} x={62 + c * 58} y={372 + r * 46} width={54} height={42} rx={4} fill={(r + c) % 2 ? "#F7F0DF" : "#E7DCC2"} stroke="#CDBF9F" strokeWidth={2} />),
      )}
    </g>
    <Win x={570} y={170} open={open} night={night} />
    <Counter x={60} y={520} w={410} bottom={776} fire={fire} frame={frame} />
    <path d="M590 566 Q520 480 500 560 T440 590" fill="none" stroke={INK.line} strokeWidth={18} strokeLinecap="round" />
    <path d="M590 566 Q520 480 500 560 T440 590" fill="none" stroke="#E08A3C" strokeWidth={10} strokeLinecap="round" />
    <Cylinder x={590} y={790} valve={valve} />
    {night ? <rect x={40} y={70} width={900} height={790} fill="#101A3C" opacity={0.22} /> : null}
  </g>
);

/** Lớp gas sát sàn, `k` 0..1 là độ dày. */
const Fog: React.FC<{ frame: number; k: number; h?: number; spread?: number; x?: number }> = ({ frame, k, h = 190, spread = 1, x = 590 }) =>
  k <= 0.01 ? null : (
    <g>
      {[0, 1, 2, 3].map((layer) => {
        const x0 = x + (40 - x) * spread, x1 = x + (940 - x) * spread;
        const top = 850 - h * k * (1 - layer * 0.2);
        const pts = Array.from({ length: 25 }, (_, i) => {
          const t = i / 24;
          const edge = spread < 1 ? Math.sin(t * Math.PI) ** 0.5 : 1;
          const y = 862 - (862 - top - wave(frame, 0.05, 11, i * 0.8 + layer * 2) - wave(frame, 0.03, 8, i * 0.37 + layer)) * edge;
          return `${x0 + (x1 - x0) * t} ${y}`;
        });
        return <path key={layer} d={`M${x0} 864 L${pts.join(" L")} L${x1} 864 Z`} fill={layer % 2 ? "#C9DB84" : GAS} opacity={0.3} strokeLinejoin="round" />;
      })}
    </g>
  );

/** Luồng gió: các nét cong chạy từ phải sang trái. */
const Wind: React.FC<{ frame: number; p: number; x0: number; x1: number; y: number; color?: string; n?: number }> = ({ frame, p, x0, x1, y, color = "#FFFFFF", n = 4 }) =>
  p <= 0.01 ? null : (
    <g fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" opacity={p}>
      {Array.from({ length: n }, (_, i) => {
        const yy = y + i * 46;
        const L = x1 - x0;
        return <path key={i} d={`M${x1} ${yy} q${-L * 0.25} -40 ${-L * 0.5} 0 t${-L * 0.5} 0`} strokeDasharray="90 70" strokeDashoffset={-frame * 7 - i * 50} />;
      })}
    </g>
  );

/** Nhiệt kế. */
const Thermo: React.FC<{ x: number; y: number; h?: number; v: number }> = ({ x, y, h = 300, v }) => (
  <g stroke={INK.line} strokeWidth={5}>
    <rect x={x - 26} y={y} width={52} height={h} rx={26} fill={CREAM} />
    <circle cx={x} cy={y + h + 22} r={44} fill="#4B8FE0" />
    <rect x={x - 11} y={y + 24 + (h - 40) * (1 - v)} width={22} height={(h - 40) * v + 34} rx={10} fill="#4B8FE0" strokeWidth={3} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={x + 12} x2={x + 26} y1={y + 40 + i * 42} y2={y + 40 + i * 42} strokeWidth={3} />)}
  </g>
);

/** Ngôi nhà phố cửa đóng kín, đèn sáng trong nhà. */
const Home: React.FC<{ x: number; y: number; s?: number; wall?: string; shut?: number }> = ({ x, y, s = 1, wall = "#E9C98F", shut = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <rect x={-120} y={-270} width={240} height={270} fill={wall} />
    <path d="M-146 -262 L0 -370 L146 -262 Z" fill="#A34A36" />
    {[-64, 64].map((wx) => (
      <g key={wx}>
        <rect x={wx - 38} y={-230} width={76} height={80} fill={GLOW} />
        <rect x={wx - 38} y={-230} width={38 * shut} height={80} fill="#7A9BA8" />
        <rect x={wx + 38 - 38 * shut} y={-230} width={38 * shut} height={80} fill="#7A9BA8" />
      </g>
    ))}
    <rect x={-60} y={-120} width={120} height={120} fill={GLOW} />
    <rect x={-60} y={-120} width={120} height={Math.max(1, 120 * shut)} fill="#8C959C" />
    {Array.from({ length: Math.floor(6 * shut) }, (_, i) => <line key={i} x1={-60} x2={60} y1={-100 + i * 18} y2={-100 + i * 18} strokeWidth={2.5} />)}
  </g>
);

/** Dấu cấm: vòng đỏ gạch chéo quanh (x, y). */
const Ban: React.FC<{ x: number; y: number; r: number; p: number }> = ({ x, y, r, p }) => (
  <Pop p={p} cx={x} cy={y}>
    <circle cx={x} cy={y} r={r} fill="none" stroke={RED} strokeWidth={18} />
    <line x1={x - r * 0.7} y1={y - r * 0.7} x2={x + r * 0.7} y2={y + r * 0.7} stroke={RED} strokeWidth={18} />
  </Pop>
);

/** Tia điện loé. */
const Spark: React.FC<{ x: number; y: number; r: number; frame: number; p?: number }> = ({ x, y, r, frame, p = 1 }) =>
  p <= 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${frame * 9}) scale(${p * (0.85 + 0.15 * Math.sin(frame * 0.9))})`}>
      <circle r={r * 1.3} fill={GLOW} opacity={0.35} />
      <path
        d={Array.from({ length: 16 }, (_, i) => {
          const a = (i * Math.PI) / 8;
          const q = i % 2 ? r * 0.36 : r;
          return `${i ? "L" : "M"}${Math.cos(a) * q} ${Math.sin(a) * q}`;
        }).join(" ") + " Z"}
        fill="#FFF3A8"
        stroke="#E8932F"
        strokeWidth={4}
      />
    </g>
  );

/** Bàn tay to chỉ ngón trỏ sang phải; đầu ngón ở (x, y). */
const BigHand: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#F2C9A0" stroke={INK.line} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
    <path d="M-520 40 L-330 -30 L-300 110 L-520 230 Z" fill="#8B6BB8" />
    <path d="M-345 -38 L-300 -50 L-262 100 L-312 122 Z" fill="#6F529C" />
    <path d="M-290 -40 Q-240 -64 -190 -44 L-20 -24 Q4 -18 2 0 Q0 18 -24 18 L-150 14 Q-118 24 -124 44 Q-128 60 -150 58 Q-128 70 -138 90 Q-146 102 -168 96 Q-160 116 -182 122 Q-230 126 -268 98 Z" />
    <path d="M-236 -50 Q-200 -100 -160 -96 Q-140 -88 -154 -70 L-190 -44" />
    <path d="M-34 -16 Q-16 -14 -14 -2" fill="none" strokeWidth={3} />
  </g>
);

const Phone: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5}>
    <rect x={-42} y={-78} width={84} height={156} rx={16} fill="#39404C" />
    <rect x={-32} y={-60} width={64} height={112} rx={4} fill="#BFE3F4" />
    <circle cx={0} cy={64} r={7} fill={CREAM} strokeWidth={2} />
  </g>
);

const Switch: React.FC<{ x: number; y: number; s?: number; on?: boolean }> = ({ x, y, s = 1, on = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5}>
    <rect x={-70} y={-80} width={140} height={160} rx={16} fill="#FBF8EF" />
    <rect x={-32} y={-50} width={64} height={100} rx={8} fill="#E6E0D0" />
    <rect x={-32} y={on ? -50 : 0} width={64} height={50} rx={8} fill="#FFFFFF" />
  </g>
);

// ---------------------------------------------------------------- hồi 1
const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    return (
      <g>
        <Room win={false} floor={690} />
        <g stroke={INK.line} strokeWidth={6}>
          <rect x={90} y={600} width={520} height={110} rx={10} fill="#A56B39" />
          <rect x={110} y={180} width={480} height={360} rx={18} fill="#2C3240" />
          <rect x={134} y={204} width={432} height={312} rx={8} fill="#F5D9B8" />
          <path d="M290 540 L410 540 L430 600 L270 600 Z" fill="#2C3240" />
        </g>
        <clipPath id="e15tv"><rect x={137} y={207} width={426} height={306} rx={8} /></clipPath>
        <g clipPath="url(#e15tv)">
          <circle cx={350} cy={380} r={210} fill="#FBE9C9" opacity={0.7} />
          <Cylinder x={250} y={490} s={0.88} />
          <g transform="translate(440 400) scale(0.8)">
            {Array.from({ length: 7 }, (_, i) => {
              const t = ((frame + i * 14) % 98) / 98;
              return <circle key={i} cx={-190 + t * 200} cy={-70 + t * 170} r={18 + t * 34} fill={GAS} opacity={0.55 * (1 - t)} />;
            })}
          </g>
          <Pop p={pop(lf, fps, 45)} cx={450} cy={350}>
            <path d="M450 262 L540 420 L360 420 Z" fill="#FFCF3F" stroke={INK.line} strokeWidth={7} strokeLinejoin="round" opacity={0.75 + 0.25 * Math.sin(frame * 0.25)} />
            <path d="M450 312 L450 368" stroke={INK.line} strokeWidth={16} strokeLinecap="round" />
            <circle cx={450} cy={396} r={9} fill={INK.line} />
          </Pop>
        </g>
        <Person x={770} y={815} h={450} frame={frame} la={0.3 + ease(lf, 60, 16) * 0.9} ra={0.2} flip />
      </g>
    );
  }
  if (li === 1) {
    const shut = ease(lf, 20, 60);
    return (
      <g>
        <rect x={40} y={70} width={900} height={790} fill="#7F93AE" />
        <path d="M40 520 L180 400 L330 500 L520 360 L700 500 L860 410 L940 480 L940 700 L40 700 Z" fill="#6A7E98" />
        <rect x={40} y={690} width={900} height={170} fill="#6B6F72" />
        <rect x={40} y={690} width={900} height={14} fill="#8C9094" />
        <Home x={190} y={720} s={0.95} wall="#D8C39A" shut={shut} />
        <Home x={480} y={720} s={1.12} wall="#E9C98F" shut={shut} />
        <Wind frame={frame} p={0.85} x0={80} x1={880} y={170} color="#E8F2FA" n={4} />
        <Thermo x={830} y={300} v={0.8 - 0.55 * ease(lf, 20, 110)} />
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={900 - ((frame * (6 + (i % 4)) + i * 130) % 900)} cy={420 + ((i * 61) % 360) + wave(frame, 0.2, 10, i)} rx={11} ry={5} fill="#C98A3A" transform={`rotate(${frame * 5} ${900 - ((frame * (6 + (i % 4)) + i * 130) % 900)} ${420 + ((i * 61) % 360)})`} />
        ))}
      </g>
    );
  }
  return (
    <g>
      <Kitchen frame={frame} />
      <Label x={330} y={320 + wave(frame, 0.14, 8)} text="?" size={190} color={INK.red} p={pop(lf, fps, 4)} />
      <Milo li={0} lf={lf} poses={["scratch"]} x={790} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: đóng kín cửa
const Barrier: React.FC<Anim> = ({ lf, frame }) => {
  const c = ease(lf, 70, 40);
  return (
    <g>
      <Kitchen frame={frame} open={1 - c} fire />
      <Wind frame={frame} p={0.95 * (1 - c)} x0={110} x1={690} y={230} n={4} />
      <Wind frame={frame} p={0.7 * c} x0={712} x1={900} y={200} color="#8FB6D8" n={3} />
      <Milo li={0} lf={lf} poses={["point"]} x={815} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: gas nặng hơn không khí
const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const sp = ease(lf, 50, 80);
    return (
      <g>
        <Kitchen frame={frame} />
        {Array.from({ length: 16 }, (_, i) => {
          const t = ((lf + i * 9) % 70) / 70;
          if (lf < t * 40 + 10) return null;
          return <circle key={i} cx={630 + 60 * Math.sin(t * 1.6) + wave(frame, 0.2, 6, i)} cy={570 + t * t * 230} r={14 + t * 26} fill={GAS} stroke="#8FA53F" strokeWidth={2} opacity={0.62 * (1 - t * 0.4)} />;
        })}
        <Fog frame={frame} k={0.75 * sp} spread={sp} />
        <g opacity={ease(lf, 24, 14)} stroke={INK.red} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M770 ${560 + wave(frame, 0.15, 8)} v130 m-34 -36 l34 38 l34 -38`} />
        </g>
      </g>
    );
  }
  if (li === 1) {
    const a = 13 * ease(lf, 90, 40) + wave(frame, 0.08, 1);
    const rad = (a * Math.PI) / 180;
    const arm = 185;
    const L: [number, number] = [392 - Math.cos(rad) * arm, 330 - Math.sin(rad) * arm];
    const R: [number, number] = [392 + Math.cos(rad) * arm, 330 + Math.sin(rad) * arm];
    const pan = ([x, y]: [number, number], c: string, label: string) => (
      <g stroke={INK.line} strokeWidth={4}>
        <path d={`M${x} ${y} L${x - 78} ${y + 170} M${x} ${y} L${x + 78} ${y + 170}`} stroke={CREAM} />
        <circle cx={x} cy={y + 112} r={62} fill={c} />
        <path d={`M${x - 24} ${y + 78} q10 -18 30 -20`} stroke="#FFFFFF" strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d={`M${x - 92} ${y + 170} Q${x} ${y + 214} ${x + 92} ${y + 170} Z`} fill={INK.goldFill} />
        <text x={x} y={y + 252} textAnchor="middle" fontSize={40} fill={CREAM} stroke="none" {...T}>{label}</text>
      </g>
    );
    return (
      <g>
        <Room win={false} floor={740} />
        <Chalkboard x={90} y={140} w={620} h={540} open={ease(lf, 0, 16)} />
        <g opacity={ease(lf, 14, 14)}>
          <path d="M392 320 L392 620 M322 640 L462 640" stroke={CREAM} strokeWidth={12} strokeLinecap="round" />
          <line x1={L[0]} y1={L[1]} x2={R[0]} y2={R[1]} stroke={CREAM} strokeWidth={12} strokeLinecap="round" />
          <circle cx={392} cy={330} r={15} fill={INK.goldFill} stroke={INK.line} strokeWidth={4} />
          {pan(L, "#A9D8F0", "không khí")}
          {pan(R, GAS, "khí gas")}
        </g>
        <Label x={400} y={225} text="nặng gấp 1,5 – 2 lần" size={50} color={GLOW} p={pop(lf, fps, 150)} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    );
  }
  const k = ease(lf, 10, 200);
  const h = 22 + (lf / 240) * 8;
  return (
    <g>
      <Kitchen frame={frame} night />
      <g stroke={INK.line} strokeWidth={6}>
        <circle cx={270} cy={250} r={92} fill={CREAM} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={270 + Math.sin(a) * 72} y1={250 - Math.cos(a) * 72} x2={270 + Math.sin(a) * 82} y2={250 - Math.cos(a) * 82} strokeWidth={5} />;
        })}
        <line x1={270} y1={250} x2={270 + Math.sin((h / 12) * 2 * Math.PI) * 42} y2={250 - Math.cos((h / 12) * 2 * Math.PI) * 42} strokeWidth={9} strokeLinecap="round" />
        <line x1={270} y1={250} x2={270 + Math.sin(h * 2 * Math.PI) * 62} y2={250 - Math.cos(h * 2 * Math.PI) * 62} strokeWidth={6} strokeLinecap="round" />
      </g>
      <Fog frame={frame} k={k} h={330} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: tĩnh điện
const Theorem: React.FC<Anim> = ({ li, lf, frame }) => {
  if (li === 0) {
    const st = ease(lf, 90, 30);
    const up = ease(lf, 110, 40);
    return (
      <g>
        <Room floor={700} />
        <g transform="translate(450 830) scale(1.5)">
          <g stroke="#6B3F22" strokeWidth={6} strokeLinecap="round" fill="none" opacity={st}>
            {Array.from({ length: 13 }, (_, i) => {
              const a = (-160 + i * 11.6) * (Math.PI / 180);
              const x = Math.cos(a) * 62, y = -298 + Math.sin(a) * 52;
              return <path key={i} d={`M${x} ${y} q${Math.cos(a) * 24 + wave(frame, 0.5, 5, i)} ${Math.sin(a) * 20} ${Math.cos(a) * 52 * st} ${Math.sin(a) * 48 * st + wave(frame, 0.4, 4, i)}`} />;
            })}
          </g>
          <Person x={0} y={0} h={380} frame={frame} la={0.2 + up * 1.1} ra={0.2 + up * 1.1} shirt="#8B6BB8" happy={lf < 90} />
          <g stroke="#5F4590" strokeWidth={3} fill="none" opacity={0.7}>
            {[-178, -156, -134, -112].map((y) => <path key={y} d={`M-40 ${y} q8 -8 16 0 t16 0 t16 0 t16 0 t16 0`} />)}
          </g>
        </g>
        {st > 0 ? [[290, 470], [610, 455], [330, 640], [590, 650], [450, 250]].map(([x, y], i) => <Spark key={i} x={x} y={y} r={24 + (i % 2) * 8} frame={frame + i * 20} p={st * ((frame + i * 7) % 22 < 12 ? 1 : 0)} />) : null}
      </g>
    );
  }
  if (li === 1) {
    const g = ease(lf, 40, 50);
    return (
      <g>
        <Kitchen frame={frame} night />
        <Fog frame={frame} k={0.8 * g} h={300} />
        <Pop p={ease(lf, 100, 14)} cx={300} cy={300}>
          <circle cx={300} cy={300} r={140} fill={CREAM} stroke={INK.line} strokeWidth={6} />
          <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
            <rect x={262} y={290} width={76} height={110} rx={10} fill="#3F8FD0" />
            <rect x={270} y={256} width={60} height={36} fill="#AEB6BE" />
            <path d={`M300 ${196 + wave(frame, 0.5, 4)} Q334 240 300 258 Q266 240 300 ${196 + wave(frame, 0.5, 4)} Z`} fill="#F59B2E" />
          </g>
        </Pop>
        <Ban x={300} y={300} r={140} p={ease(lf, 125, 12)} />
      </g>
    );
  }
  // cận cảnh tay nắm cửa, rồi công tắc
  const second = lf >= 112;
  const l2 = second ? lf - 112 : lf;
  const reach = ease(l2, 8, 34);
  const hit = l2 > 44;
  const fire = ease(lf, 166, 24);
  const tx = second ? 560 : 590, ty = 430;
  return (
    <g>
      <rect x={40} y={70} width={900} height={790} fill={second ? "#D9E3DC" : "#9A6238"} />
      {second ? (
        <g>
          {Array.from({ length: 10 }, (_, i) => <rect key={i} x={60 + i * 90} y={70} width={40} height={790} fill="#FFFFFF" opacity={0.25} />)}
          <Switch x={670} y={420} s={1.6} on={hit} />
        </g>
      ) : (
        <g>
          {[120, 520].map((y) => <rect key={y} x={130} y={y} width={720} height={y === 120 ? 340 : 330} rx={14} fill="#8A5630" stroke="#6F4324" strokeWidth={8} />)}
          <g stroke={INK.line} strokeWidth={6}>
            <rect x={630} y={320} width={120} height={230} rx={24} fill="#B9BFC6" />
            <circle cx={664} cy={430} r={76} fill="#D5DAE0" />
            <path d="M614 400 Q630 372 660 368" stroke="#FFFFFF" strokeWidth={12} fill="none" strokeLinecap="round" />
            <path d="M690 506 l0 22" strokeWidth={10} strokeLinecap="round" />
          </g>
        </g>
      )}
      <Fog frame={frame} k={0.9} h={300} />
      <BigHand x={tx - 170 * (1 - reach)} y={ty} s={1.05} />
      {hit ? <Spark x={tx + 12} y={ty - 4} r={62} frame={frame} p={Math.min(1, (l2 - 44) / 6)} /> : null}
      {fire > 0 ? (
        <g opacity={fire}>
          {Array.from({ length: 9 }, (_, i) => {
            const x = 90 + i * 100, hh = (170 + ((i * 53) % 130)) * fire + wave(frame, 0.4, 22, i);
            return <path key={i} d={`M${x - 80} 860 Q${x - 60} ${860 - hh * 0.6} ${x} ${860 - hh} Q${x + 66} ${860 - hh * 0.55} ${x + 80} 860 Z`} fill={i % 2 ? "#F59B2E" : "#E9632E"} opacity={0.85} />;
          })}
          {Array.from({ length: 7 }, (_, i) => {
            const x = 140 + i * 120, hh = 110 * fire + wave(frame, 0.5, 18, i * 2);
            return <path key={i} d={`M${x - 46} 860 Q${x - 30} ${860 - hh * 0.6} ${x} ${860 - hh} Q${x + 36} ${860 - hh * 0.5} ${x + 46} 860 Z`} fill={GLOW} opacity={0.85} />;
          })}
        </g>
      ) : null}
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: dây dẫn gas
const Hose: React.FC<{ old: number }> = ({ old }) => (
  <g strokeLinecap="round" fill="none">
    <path d="M40 620 Q240 660 360 520 T640 420" stroke={INK.line} strokeWidth={112} />
    <path d="M40 620 Q240 660 360 520 T640 420" stroke="#E08A3C" strokeWidth={98} />
    <path d="M40 620 Q240 660 360 520 T640 420" stroke="#8A6A50" strokeWidth={98} opacity={old} />
    <path d="M40 594 Q230 632 342 496 T640 394" stroke="#FFFFFF" strokeWidth={12} opacity={0.35 * (1 - old)} />
  </g>
);

const Joint: React.FC = () => (
  <g stroke={INK.line} strokeWidth={6} strokeLinejoin="round">
    <rect x={600} y={350} width={50} height={142} rx={10} fill="#AEB6BE" />
    <rect x={650} y={374} width={120} height={94} fill="#C9A04A" />
    <rect x={770} y={340} width={150} height={162} rx={16} fill="#8C959C" />
    <rect x={612} y={322} width={26} height={34} rx={6} fill="#7D868E" />
  </g>
);

const Realworld: React.FC<Anim> = ({ li, lf, frame }) => {
  if (li === 0) {
    const old = ease(lf, 60, 60);
    const cr = ease(lf, 100, 50);
    return (
      <g>
        <Room win={false} floor={760} />
        <Hose old={old} />
        <Joint />
        <g stroke="#2C1D12" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={cr}>
          {[[180, 632], [330, 552], [440, 458]].map(([x, y]) => <path key={x} d={`M${x - 22} ${y - 34 * cr} l16 22 l-12 16 l22 ${24 * cr} M${x - 6} ${y - 12} l22 -8 M${x + 2} ${y + 8} l18 6`} />)}
        </g>
        {cr > 0.6
          ? Array.from({ length: 12 }, (_, i) => {
              const t = ((lf + i * 8) % 60) / 60;
              const b = [[330, 552], [440, 458], [180, 632]][i % 3];
              return <circle key={i} cx={b[0] + (i % 2 ? 30 : -10) + t * 46} cy={b[1] + 40 + t * 180} r={12 + t * 24} fill={GAS} opacity={0.6 * (1 - t)} />;
            })
          : null}
        <Thermo x={220} y={160} h={250} v={0.85 - 0.6 * ease(lf, 130, 70)} />
      </g>
    );
  }
  const soap = ease(lf, 95, 36);
  const bub = ease(lf, 140, 50);
  return (
    <g>
      <Room win={false} floor={760} />
      <Hose old={0.35} />
      <Joint />
      {lf < 100
        ? Array.from({ length: 10 }, (_, i) => {
            const t = ((lf + i * 7) % 60) / 60;
            return <circle key={i} cx={626 + (i % 3) * 16 + t * 30} cy={500 + t * 220} r={12 + t * 26} fill={GAS} opacity={0.62 * (1 - t)} />;
          })
        : null}
      <g opacity={soap} fill="#FFFFFF" stroke="#9CC6DA" strokeWidth={3}>
        {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={585 + (i % 3) * 40} cy={350 + Math.floor(i / 3) * 70 + wave(frame, 0.1, 3, i)} rx={36} ry={30} opacity={0.75} />)}
      </g>
      {Array.from({ length: 12 }, (_, i) => {
        const t = ((lf + i * 11) % 70) / 70;
        const r = (16 + (i % 4) * 9) * Math.min(1, t * 2.2) * bub;
        const x = 590 + ((i * 47) % 110), y = 350 + ((i * 31) % 150) - t * 150;
        return r < 1 ? null : (
          <g key={i} opacity={1 - t * 0.6}>
            <circle cx={x} cy={y} r={r} fill="#DDF3FB" fillOpacity={0.75} stroke="#5FA9C8" strokeWidth={4} />
            <path d={`M${x - r * 0.5} ${y - r * 0.2} q${r * 0.1} ${-r * 0.4} ${r * 0.5} ${-r * 0.45}`} stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
      <g transform={`translate(${430 + ease(lf, 78, 20) * 120 + wave(lf, 0.25, soap > 0 && bub < 0.3 ? 26 : 0)} ${250 + (1 - ease(lf, 78, 20)) * -200}) rotate(24)`} stroke={INK.line} strokeWidth={5} opacity={ease(lf, 72, 12) * (1 - ease(lf, 165, 16))}>
        <rect x={-24} y={-170} width={48} height={150} rx={18} fill="#4FA3D1" />
        <rect x={-36} y={-24} width={72} height={34} fill="#AEB6BE" />
        <path d="M-36 10 L-40 76 L40 76 L36 10 Z" fill="#F2E4C2" />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6: làm gì cho an toàn
const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const open = 0.5 * ease(lf, 40, 40);
    const turn = ease(lf, 140, 40);
    return (
      <g>
        <Kitchen frame={frame} open={open} valve={turn} />
        <Wind frame={frame} p={ease(lf, 70, 20) * 0.9} x0={120} x1={690} y={230} n={3} />
        <Pop p={pop(lf, fps, 115)} cx={780} cy={600}>
          <circle cx={775} cy={600} r={125} fill={CREAM} stroke={INK.gold} strokeWidth={10} />
          <g stroke={INK.line} strokeWidth={5}>
            <rect x={745} y={620} width={60} height={70} fill="#C9A04A" />
            <g transform={`translate(775 600) rotate(${turn * 90})`}>
              <rect x={-82} y={-20} width={164} height={40} rx={20} fill={RED} />
              <circle r={14} fill="#3F4650" />
            </g>
          </g>
          <path d="M700 520 A110 110 0 0 1 850 520 m-4 -30 l6 32 l-32 2" fill="none" stroke={INK.blue} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={1 - turn} />
        </Pop>
      </g>
    );
  }
  if (li === 1) {
    if (lf < 145)
      return (
        <g>
          <Kitchen frame={frame} />
          <Fog frame={frame} k={0.6} h={280} />
          <Pop p={pop(lf, fps, 40)} cx={280} cy={290}>
            <circle cx={280} cy={290} r={132} fill={CREAM} />
            <Switch x={280} y={290} s={0.95} />
          </Pop>
          <Ban x={280} y={290} r={132} p={pop(lf, fps, 55)} />
          <Pop p={pop(lf, fps, 84)} cx={640} cy={290}>
            <circle cx={640} cy={290} r={132} fill={CREAM} />
            <Phone x={640} y={290} s={1.05} />
          </Pop>
          <Ban x={640} y={290} r={132} p={pop(lf, fps, 94)} />
        </g>
      );
    const o = ease(lf, 175, 24);
    const go = ease(lf, 215, 60);
    return (
      <g>
        <Kitchen frame={frame} open={o} valve={ease(lf, 150, 18)} />
        <Fog frame={frame} k={0.6 * (1 - ease(lf, 190, 80))} h={280} />
        <Wind frame={frame} p={o * 0.9} x0={120} x1={690} y={230} n={4} />
        <Person x={820 + go * 240} y={815} h={430} frame={frame} la={1.3 * (1 - o) + 0.3} ra={0.6} />
      </g>
    );
  }
  return (
    <g>
      <rect x={40} y={70} width={900} height={790} fill="#BBD3E2" />
      <path d="M40 480 L200 360 L360 470 L540 340 L720 470 L940 380 L940 700 L40 700 Z" fill="#9DB8C6" />
      <rect x={40} y={700} width={900} height={160} fill="#93B07A" />
      <Home x={240} y={720} s={1.05} shut={0} />
      <Person x={560} y={815} h={450} frame={frame} la={0.2} ra={1.75} />
      <Phone x={655} y={548} s={0.5} />
      <g opacity={1 - ease(lf, 84, 12)}><Label x={640} y={270} text="114" size={150} color={INK.red} p={pop(lf, fps, 30)} /></g>
      <Milo li={0} lf={lf} poses={["wave"]} x={810} />
    </g>
  );
};

const EP15: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep15Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP15[beatKind] ?? Hook;
  return <Beat {...a} />;
};
