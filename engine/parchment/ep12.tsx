/**
 * Tập 12 "Mở khoá điện thoại bằng hơi thở": cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc
 * (`li`, `lf`), bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780).
 */
import React from "react";
import { countUp, ease, Pop, pop, wave } from "./anim.tsx";
import { Person, Room } from "./ep13.tsx";
import { type Anim, Chalkboard, Check, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

export const READY: boolean = true;

const CREAM = "#FFF6DD";
const GLOW = "#FFE27A";
const SKIN = "#F2C9A0";
const SKIN2 = "#E3AE80";
const BREATH = "#F6FDFF";
const SCREEN = "#1F3346";
const MOL = ["#E0703A", "#5BA3D9", "#7CC474", "#9B7BD8", "#F2BE4A", "#E86A92"];

const Milo: React.FC<{ li: number; lf: number; poses: Parameters<typeof linePose>[2]; x?: number }> = ({ li, lf, poses, x = 800 }) => (
  <Stickman x={x} y={GROUND} scale={0.82} {...linePose(li, lf, poses)} />
);

// ---------------------------------------------------------------- đồ vật

/** Ổ khoá, tâm thân khoá (x, y); open 0..1. */
const Lock: React.FC<{ x: number; y: number; s?: number; open?: number; color?: string }> = ({ x, y, s = 1, open = 0, color = GLOW }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinecap="round">
    <g transform={`translate(0 ${-open * 8}) rotate(${open * 32} 24 -18)`} fill="none">
      <path d="M-24 -14 L-24 -40 Q-24 -66 0 -66 Q24 -66 24 -40 L24 -14" strokeWidth={18} />
      <path d="M-24 -14 L-24 -40 Q-24 -66 0 -66 Q24 -66 24 -40 L24 -14" stroke="#D9DEE4" strokeWidth={9} />
    </g>
    <rect x={-44} y={-22} width={88} height={70} rx={12} fill={color} />
    <circle cx={0} cy={6} r={9} fill={INK.line} stroke="none" />
    <rect x={-4} y={8} width={8} height={22} rx={4} fill={INK.line} stroke="none" />
  </g>
);

/** Dấu vân tay, tâm (x, y). */
const Fingerprint: React.FC<{ x: number; y: number; r?: number; color?: string }> = ({ x, y, r = 60, color = GLOW }) => (
  <g fill="none" stroke={color} strokeWidth={r * 0.075} strokeLinecap="round">
    {[0.14, 0.32, 0.5, 0.68, 0.86].map((k, i) => (
      <path
        key={k}
        d={`M${x - r * k} ${y + r * (0.62 - i * 0.06)} L${x - r * k} ${y - r * 0.1} Q${x - r * k} ${y - r * (0.25 + k * 0.95)} ${x} ${y - r * (0.25 + k * 0.95)} Q${x + r * k} ${y - r * (0.25 + k * 0.95)} ${x + r * k} ${y - r * 0.1} L${x + r * k} ${y + r * (0.5 - i * 0.07)}`}
      />
    ))}
  </g>
);

/** Điện thoại đứng, tâm (x, y), cao 440·s; màn hình x ±101, y ±200. */
const Phone: React.FC<{ x: number; y: number; s?: number; glow?: number; screen?: string; children?: React.ReactNode }> = ({ x, y, s = 1, glow = 0, screen = SCREEN, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 ? <rect x={-146} y={-250} width={292} height={500} rx={60} fill={GLOW} opacity={0.4 * glow} /> : null}
    <rect x={-115} y={-220} width={230} height={440} rx={36} fill="#2A2F3A" stroke={INK.line} strokeWidth={6} />
    <rect x={-101} y={-204} width={202} height={408} rx={26} fill={screen} />
    <path d="M-88 -190 L-40 -190 L-92 -60 Z" fill="#FFFFFF" opacity={0.07} />
    <rect x={-30} y={-194} width={60} height={14} rx={7} fill="#12161D" />
    {children}
  </g>
);

/** Người nhìn nghiêng sang phải từ ngực trở lên, (x, y) là tâm đầu, đầu cao ~280·s. Miệng ở (x + 138s, y + 82s). */
const Bust: React.FC<{ x: number; y: number; s?: number; frame: number; girl?: boolean; shirt?: string; puff?: number; flip?: boolean }> = ({
  x, y, s = 1, frame, girl = true, shirt = "#E9725B", puff = 0, flip = false,
}) => {
  const hair = girl ? "#6B3F22" : "#2E2018";
  const blink = frame % 96 < 5;
  const b = wave(frame, 0.09, 3);
  return (
    <g transform={`translate(${x} ${y + b}) scale(${flip ? -s : s} ${s})`} stroke={INK.line} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
      {girl ? <path d={`M-96 -70 Q-200 -80 -190 60 Q${-186 + wave(frame, 0.1, 8)} 150 -130 170 Q-150 60 -90 20 Z`} fill={hair} /> : null}
      <path d="M-196 640 L-190 400 Q-184 246 -70 206 L64 206 Q156 236 168 400 L176 640 Z" fill={shirt} />
      <path d="M-74 208 Q0 262 66 208 L58 120 L-70 90 Z" fill={SKIN2} />
      <path d="M-112 0 Q-116 -136 12 -140 Q106 -136 112 -48 Q110 -26 116 -8 Q146 22 144 36 Q138 48 118 46 Q116 54 126 60 Q146 66 138 76 Q148 86 136 96 Q122 100 118 108 Q110 142 66 146 Q-60 150 -112 0 Z" fill={SKIN} />
      <ellipse cx={74} cy={74 - puff * 2} rx={24 + puff * 12} ry={18 + puff * 10} fill="#F09A84" opacity={0.5} stroke="none" />
      <path d="M-114 30 Q-150 -150 20 -164 Q130 -156 116 -62 Q80 -104 30 -96 Q-20 -90 -30 -30 Q-36 10 -60 40 Q-90 60 -114 30 Z" fill={hair} />
      <path d="M-90 -60 Q-70 -120 0 -136" fill="none" stroke="#FFFFFF" opacity={0.18} strokeWidth={10} />
      <path d="M-46 8 Q-72 -10 -72 22 Q-66 52 -42 42" fill={SKIN} />
      {blink ? <path d="M54 -18 Q68 -8 84 -18" fill="none" /> : (
        <g>
          <ellipse cx={70} cy={-18} rx={18} ry={24} fill="#FFFFFF" strokeWidth={4} />
          <circle cx={76} cy={-16} r={11} fill="#3B2614" stroke="none" />
          <circle cx={80} cy={-21} r={4} fill="#FFFFFF" stroke="none" />
        </g>
      )}
      <path d="M46 -58 Q68 -72 92 -58" fill="none" strokeWidth={5} />
      <ellipse cx={138} cy={84} rx={5 + puff * 3} ry={5 + puff * 5} fill="#8E3A2E" strokeWidth={3} />
    </g>
  );
};

/** Luồng hơi thở mềm bay từ (x1, y1) tới (x2, y2), có hạt màu lẫn trong. `d` là mật độ hạt 0..1. */
const Stream: React.FC<{ x1: number; y1: number; x2: number; y2: number; lf: number; at?: number; frame: number; color?: string; d?: number; w?: number; n?: number; mol?: string[] }> = ({
  x1, y1, x2, y2, lf, at = 0, frame, color = BREATH, d = 1, w = 60, n = 22, mol = MOL,
}) => {
  const t = lf - at;
  if (t <= 0) return null;
  const on = Math.min(1, t / 18);
  const reach = Math.min(1, t / 34);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
  return (
    <g opacity={on}>
      {Array.from({ length: n }, (_, i) => {
        const k = (frame / 64 + i / n) % 1;
        if (k > reach) return null;
        const off = Math.sin(i * 2.4 + frame * 0.06) * w * (0.25 + k * 0.6);
        return <circle key={i} cx={x1 + (x2 - x1) * k - uy * off} cy={y1 + (y2 - y1) * k + ux * off} r={14 + w * 0.62 * k} fill={color} opacity={0.5 * Math.sin(Math.PI * Math.min(1, k * 0.92 + 0.08))} />;
      })}
      {Array.from({ length: Math.round(30 * d) }, (_, i) => {
        const k = (frame / 58 + i * 0.618) % 1;
        if (k > reach) return null;
        const off = Math.sin(i * 4.1 + frame * 0.08) * w * (0.2 + k * 0.9);
        return <circle key={i} cx={x1 + (x2 - x1) * k - uy * off} cy={y1 + (y2 - y1) * k + ux * off} r={7 + (i % 3) * 2} fill={mol[i % mol.length]} stroke={INK.line} strokeWidth={2.5} opacity={Math.min(1, 8 * k, 6 * (1 - k))} />;
      })}
    </g>
  );
};

/** Phân tử: hạt giữa và hai hạt phụ. */
const Molecule: React.FC<{ x: number; y: number; c?: string; s?: number; rot?: number }> = ({ x, y, c = MOL[0], s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={INK.line} strokeWidth={3}>
    <path d="M0 0 L-22 -14 M0 0 L22 -12" strokeWidth={5} />
    <circle cx={-22} cy={-14} r={9} fill={CREAM} />
    <circle cx={22} cy={-12} r={9} fill={CREAM} />
    <circle r={15} fill={c} />
    <circle cx={-5} cy={-5} r={4} fill="#FFFFFF" opacity={0.6} stroke="none" />
  </g>
);

type Mood = "ok" | "puzzled" | "happy";
/** Mũi máy: con robot có chiếc mũi to bên trái. Tâm thân (x, y), rộng ~300·s. */
const NoseBot: React.FC<{ x: number; y: number; s?: number; frame: number; mood?: Mood; cap?: number; sniff?: boolean; legs?: boolean }> = ({ x, y, s = 1, frame, mood = "ok", cap = 0, sniff = false, legs = true }) => {
  const blink = frame % 84 < 5;
  const sn = sniff ? wave(frame, 0.5, 6) : 0;
  return (
    <g transform={`translate(${x} ${y + wave(frame, 0.08, 4)}) scale(${s})`} stroke={INK.line} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
      {legs ? <path d="M-60 120 L-60 168 M60 120 L60 168" strokeWidth={22} /> : null}
      {legs ? <path d="M-96 176 Q-96 150 -60 150 Q-36 150 -36 176 Z M36 176 Q36 150 64 150 Q96 150 96 176 Z" fill="#7D8C99" /> : null}
      <path d="M150 20 Q200 40 188 96" fill="none" strokeWidth={22} />
      <path d="M150 20 Q200 40 188 96" fill="none" stroke="#A9B7C3" strokeWidth={12} />
      <circle cx={188} cy={102} r={18} fill="#7D8C99" />
      <path d="M0 -138 L0 -176" strokeWidth={8} />
      <circle cx={0} cy={-184} r={14} fill={mood === "puzzled" ? "#E0703A" : "#7CF29A"} />
      <rect x={-150} y={-138} width={300} height={264} rx={60} fill="#CFDAE3" />
      <path d="M-128 60 Q0 100 128 60 L128 70 Q124 106 92 106 L-92 106 Q-124 106 -128 70 Z" fill="#AEBECB" stroke="none" />
      <rect x={-78} y={-108} width={204} height={140} rx={34} fill={SCREEN} />
      {[-18, 66].map((ex) =>
        blink ? <path key={ex} d={`M${ex - 18} -56 L${ex + 18} -56`} stroke="#8FF0FF" strokeWidth={8} /> : mood === "happy" ? (
          <path key={ex} d={`M${ex - 20} -46 Q${ex} -82 ${ex + 20} -46`} fill="none" stroke="#8FF0FF" strokeWidth={9} />
        ) : (
          <ellipse key={ex} cx={ex} cy={-56} rx={14} ry={mood === "puzzled" && ex > 0 ? 12 : 22} fill="#8FF0FF" stroke="none" />
        ),
      )}
      <path d={mood === "happy" ? "M0 -14 Q24 14 48 -14" : mood === "puzzled" ? "M2 2 Q14 -14 26 0 Q36 12 48 -2" : "M8 -6 Q24 4 40 -6"} fill="none" stroke="#8FF0FF" strokeWidth={7} />
      <g transform={`translate(${-sn} 0) scale(${1 + sn * 0.008})`}>
        <path d="M-96 -70 Q-206 -10 -214 48 Q-212 88 -160 84 Q-120 92 -92 62 Q-76 -10 -96 -70 Z" fill="#E9A37E" />
        <path d="M-188 58 Q-174 42 -156 60" fill="none" strokeWidth={7} />
        <ellipse cx={-168} cy={4} rx={10} ry={22} fill="#FFFFFF" opacity={0.35} stroke="none" transform="rotate(38 -168 4)" />
      </g>
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={-30 + i * 44} cy={76} r={13} fill={Math.sin(frame * 0.2 + i * 1.9) > 0 ? MOL[i] : "#6B7882"} strokeWidth={4} />)}
      {cap > 0 ? (
        <g transform={`translate(10 ${-146 - (1 - Math.min(1, cap)) * 200})`}>
          <path d="M-60 -14 L-60 22 Q0 46 60 22 L60 -14 Z" fill="#2B3350" />
          <path d="M0 -62 L128 -20 L0 20 L-128 -20 Z" fill="#37416A" />
          <path d={`M0 -20 L98 -10 L${98 + wave(frame, 0.12, 6)} 44`} fill="none" stroke={GLOW} strokeWidth={7} />
          <circle cx={98 + wave(frame, 0.12, 6)} cy={50} r={10} fill={GLOW} />
        </g>
      ) : null}
    </g>
  );
};

const Flask: React.FC<{ x: number; y: number; c: string; s?: number }> = ({ x, y, c, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={4} strokeLinejoin="round">
    <path d="M-12 -84 L-12 -50 L-40 -6 Q-40 0 -32 0 L32 0 Q40 0 40 -6 L12 -50 L12 -84 Z" fill="#EAF6FA" />
    <path d="M-26 -28 L-40 -6 Q-40 0 -32 0 L32 0 Q40 0 40 -6 L26 -28 Z" fill={c} strokeWidth={3} />
    <rect x={-18} y={-92} width={36} height={10} rx={4} fill="#EAF6FA" />
  </g>
);

/** Phòng thí nghiệm: tường xanh, giá lọ, sàn gạch. */
const Lab: React.FC<{ floor?: number; shelf?: boolean }> = ({ floor = 700, shelf = true }) => (
  <g>
    <rect x={40} y={70} width={900} height={790} fill="#C7DDE8" />
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={40 + i * 160} y={70} width={78} height={floor - 70} fill="#FFFFFF" opacity={0.14} />)}
    {shelf ? (
      <g>
        <Flask x={130} y={206} c="#7CC474" s={0.8} />
        <Flask x={215} y={206} c="#E0703A" s={0.95} />
        <Flask x={310} y={206} c="#9B7BD8" s={0.75} />
        <Flask x={660} y={206} c="#5BA3D9" s={0.95} />
        <Flask x={750} y={206} c="#F2BE4A" s={0.75} />
        <Flask x={840} y={206} c="#E86A92" s={0.9} />
        <rect x={80} y={206} width={290} height={16} rx={5} fill="#A9855E" stroke={INK.line} strokeWidth={4} />
        <rect x={610} y={206} width={290} height={16} rx={5} fill="#A9855E" stroke={INK.line} strokeWidth={4} />
      </g>
    ) : null}
    <rect x={40} y={floor} width={900} height={170} fill="#9DB4C2" />
    <rect x={40} y={floor - 10} width={900} height={14} fill="#E8F1F5" stroke={INK.line} strokeWidth={3} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={490 + (i - 3) * 130} y1={floor} x2={490 + (i - 3) * 230} y2={860} stroke="#000" opacity={0.12} strokeWidth={3} />)}
    <line x1={40} x2={940} y1={floor + 60} y2={floor + 60} stroke="#000" opacity={0.12} strokeWidth={3} />
  </g>
);

/** Chân dung tròn. */
const Portrait: React.FC<{ x: number; y: number; r: number; kind: "girl" | "boy" | "teacher"; frame: number; shirt?: string; id: string; bg?: string; happy?: boolean }> = ({ x, y, r, kind, frame, shirt, id, bg = "#F7E3BE", happy }) => (
  <g>
    <clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath>
    <circle cx={x} cy={y} r={r} fill={bg} />
    <g clipPath={`url(#${id})`}><Person x={x} y={y + r * 3.2} h={r * 4.3} frame={frame} kind={kind} shirt={shirt} happy={happy} la={0} ra={0} /></g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={INK.line} strokeWidth={6} />
  </g>
);

/** Ngón tay to dựng đứng, đầu ngón ở (x, y). */
const Finger: React.FC<{ x: number; y: number; s?: number; children?: React.ReactNode }> = ({ x, y, s = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={6} strokeLinejoin="round">
    <path d="M-100 760 L-100 110 Q-100 0 0 0 Q100 0 100 110 L100 760 Z" fill={SKIN} />
    <path d="M-100 620 L-100 110 Q-98 60 -80 36 Q-76 300 -72 760 L-100 760 Z" fill={SKIN2} stroke="none" opacity={0.6} />
    <path d="M-70 330 Q0 352 70 330 M-66 352 Q0 374 66 352" fill="none" strokeWidth={4} opacity={0.5} />
    {children}
  </g>
);

// ---------------------------------------------------------------- hồi 1
const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const step = lf < 84 ? 0 : lf < 122 ? 1 : 2;
    const sp = step === 0 ? 1 : pop(lf, fps, step === 1 ? 84 : 122);
    const dots = Math.min(4, Math.max(0, Math.floor((lf - 30) / 12)));
    return (
      <g>
        <Room floor={700} />
        <Person x={735} y={822} h={500} frame={frame} la={0.35 + ease(lf, 24, 14) * 0.45} ra={0.15} flip={false} happy />
        <Phone x={310} y={452} s={1.56}>
          <Pop p={sp} cx={0} cy={0}>
            {step === 0 ? (
              <g>
                {[0, 1, 2, 3].map((i) => <circle key={i} cx={-54 + i * 36} cy={-110} r={11} fill={i < dots ? GLOW : "none"} stroke={GLOW} strokeWidth={4} />)}
                {Array.from({ length: 9 }, (_, i) => {
                  const hit = [0, 4, 7, 2][dots] === i && lf > 24 && (lf - 30) % 12 < 8;
                  return (
                    <g key={i}>
                      <circle cx={-58 + (i % 3) * 58} cy={-40 + Math.floor(i / 3) * 62} r={25} fill={hit ? GLOW : "#2D4A63"} stroke="#6E93B5" strokeWidth={3} />
                      <text x={-58 + (i % 3) * 58} y={-31 + Math.floor(i / 3) * 62} textAnchor="middle" fontSize={26} fill={hit ? INK.line : CREAM} {...T}>{i + 1}</text>
                    </g>
                  );
                })}
              </g>
            ) : step === 1 ? (
              <g>
                <circle r={86} fill="#2D4A63" />
                <Fingerprint x={0} y={4} r={68} />
                <line x1={-80} x2={80} y1={wave(lf, 0.2, 70)} y2={wave(lf, 0.2, 70)} stroke="#7CF29A" strokeWidth={6} />
              </g>
            ) : (
              <g>
                <Portrait x={0} y={0} r={66} kind="girl" frame={frame} id="e12face" happy />
                {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => <path key={i} d={`M${a * 84} ${b * 52} L${a * 84} ${b * 84} L${a * 52} ${b * 84}`} fill="none" stroke={GLOW} strokeWidth={7} strokeLinecap="round" />)}
                <line x1={-80} x2={80} y1={wave(lf, 0.16, 76)} y2={wave(lf, 0.16, 76)} stroke="#7CF29A" strokeWidth={6} />
              </g>
            )}
          </Pop>
        </Phone>
      </g>
    );
  }
  if (li === 1) {
    const go = 118;
    const open = ease(lf, go + 52, 16);
    return (
      <g>
        <Lab floor={740} />
        <Stream x1={365} y1={492} x2={690} y2={440} lf={lf} at={go} frame={frame} w={64} />
        <Bust x={235} y={420} s={0.95} frame={frame} puff={ease(lf, go - 12, 12)} />
        <Phone x={740} y={440} s={1.36} glow={open} screen={open > 0.5 ? "#2F6B4F" : SCREEN}>
          <Lock x={0} y={10} s={1.5} open={open} color={open > 0.5 ? "#9BEFA8" : GLOW} />
        </Phone>
      </g>
    );
  }
  return (
    <g>
      <Room floor={720} win={false} />
      <g transform={`translate(390 390) scale(${0.85 + 0.15 * ease(lf, 0, 20)})`}>
        {Array.from({ length: 11 }, (_, i) => {
          const a = (i * Math.PI * 2) / 11 + frame * 0.006;
          return <circle key={i} cx={Math.cos(a) * 170} cy={Math.sin(a) * 130} r={112 + wave(frame, 0.08, 8, i)} fill="#DFF3F9" opacity={0.75} />;
        })}
        <ellipse rx={190} ry={150} fill="#DFF3F9" />
        {Array.from({ length: 16 }, (_, i) => {
          const a = i * 2.4 + frame * 0.012;
          const r = 120 + (i % 4) * 42;
          return <Molecule key={i} x={Math.cos(a) * r * 1.05} y={Math.sin(a) * r * 0.82} c={MOL[i % MOL.length]} s={0.95} rot={frame + i * 40} />;
        })}
        <Pop p={pop(lf, fps, 22)} cx={0} cy={0}>
          <text x={0} y={92} textAnchor="middle" fontSize={260} fill={INK.red} stroke={CREAM} strokeWidth={14} paintOrder="stroke" {...T}>?</text>
        </Pop>
      </g>
      <Milo li={0} lf={lf} poses={["scratch"]} x={800} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2
const Barrier: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const copy = ease(lf, 78, 34);
    const band = pop(lf, fps, 150);
    return (
      <g>
        <Room floor={720} win={false} />
        <Finger x={270} y={180}>
          <Fingerprint x={0} y={150} r={76} color="#A8632F" />
          <Pop p={band} cx={0} cy={150}>
            <g transform="rotate(-18 0 150)">
              <rect x={-130} y={100} width={260} height={100} rx={44} fill="#E8B98A" />
              <rect x={-48} y={106} width={96} height={88} rx={8} fill="#F7E6CF" strokeWidth={4} />
              {[-96, -76, 76, 96].map((a) => [132, 168].map((b) => <circle key={`${a}${b}`} cx={a} cy={b} r={4} fill="#A8794C" stroke="none" />))}
            </g>
          </Pop>
        </Finger>
        {copy > 0 ? (
          <g opacity={Math.min(1, copy * 2)} transform={`translate(${-330 * (1 - copy)} 0)`}>
            <g transform="rotate(5 670 400)" stroke={INK.line} strokeWidth={6}>
              <rect x={516} y={206} width={330} height={400} rx={12} fill="#000" opacity={0.15} stroke="none" />
              <rect x={505} y={195} width={330} height={400} rx={12} fill={CREAM} />
              <Fingerprint x={670} y={410} r={140} color="#A8632F" />
            </g>
          </g>
        ) : null}
        {copy > 0.95 ? <path d={`M400 390 L466 390 M444 368 L466 390 L444 412`} fill="none" stroke={INK.red} strokeWidth={12} strokeLinecap="round" opacity={ease(lf, 112, 10)} /> : null}
      </g>
    );
  }
  if (li === 1) {
    return (
      <g>
        <Lab floor={740} shelf={false} />
        {Array.from({ length: 4 }, (_, i) => {
          const k = (frame / 130 + i / 4) % 1;
          return <Molecule key={i} x={180 + i * 78 + wave(frame, 0.05, 12, i)} y={548 - k * 290} c={MOL[i]} s={1.1} rot={frame * 0.8 + i * 60} />;
        })}
        <g stroke={INK.line} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
          <path d="M40 560 Q220 520 400 572 L470 590 Q520 596 560 622 Q578 640 560 650 L470 640 Q520 664 540 690 Q540 708 516 704 L440 680 Q250 720 40 720 Z" fill={SKIN} />
          <path d="M40 688 Q240 696 420 660" fill="none" stroke={SKIN2} strokeWidth={14} />
          <path d="M40 540 Q110 530 170 540 L176 726 L40 730 Z" fill="#E9725B" />
        </g>
        <NoseBot x={662} y={400} s={1.08} frame={frame} mood={lf > 112 ? "puzzled" : "ok"} sniff={lf > 60} />
        <Pop p={pop(lf, fps, 118)} cx={850} cy={170}>
          <text x={850} y={210} textAnchor="middle" fontSize={120} fill={INK.red} stroke={CREAM} strokeWidth={10} paintOrder="stroke" {...T}>?</text>
        </Pop>
      </g>
    );
  }
  const nod = ease(lf, 120, 16);
  return (
    <g>
      <Lab floor={740} shelf={false} />
      <Stream x1={372} y1={412} x2={900} y2={215} lf={lf} at={4} frame={frame} w={120} n={34} d={2.6} />
      <Bust x={235} y={330} s={1} frame={frame} puff={1} />
      <rect x={40} y={742} width={370} height={118} fill="#9DB4C2" opacity={0} />
      <Person x={590} y={832} h={400} frame={frame} kind="teacher" shirt="#F4F7F9" la={0.2 + nod * 0.4} ra={0.2 + nod * 0.9} happy />
      <Person x={800} y={832} h={380} frame={frame + 30} kind="boy" shirt="#F4F7F9" la={0.2 + nod * 1} ra={0.2} happy />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3
const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const n = Math.min(28, Math.max(0, Math.floor((lf - 26) / 2.6)));
    const spots = Array.from({ length: 28 }, (_, i) => {
      const a = i * 2.39996;
      const r = 248 * Math.sqrt((i + 0.5) / 28);
      return [385 + Math.cos(a) * r, 385 + Math.sin(a) * r];
    });
    return (
      <g>
        <Lab floor={740} shelf={false} />
        <g stroke={INK.line} strokeWidth={6}>
          <path d="M600 600 L720 730" strokeWidth={62} strokeLinecap="round" />
          <path d="M600 600 L720 730" stroke="#A56B39" strokeWidth={46} strokeLinecap="round" />
          <circle cx={385} cy={385} r={304} fill="#C9A04A" />
          <circle cx={385} cy={385} r={278} fill="#E6F6FB" />
        </g>
        {spots.map(([x, y], i) => (i < n ? (
          <Pop key={i} p={pop(lf, fps, 26 + i * 2.6)} cx={x} cy={y}>
            <Molecule x={x} y={y + wave(frame, 0.08, 4, i)} c={MOL[i % MOL.length]} s={1.15} rot={wave(frame, 0.04, 24, i)} />
          </Pop>
        ) : null))}
        <path d="M180 290 Q230 190 330 160" fill="none" stroke="#FFFFFF" strokeWidth={18} strokeLinecap="round" opacity={0.7} />
        {n > 0 ? <text x={796} y={290} textAnchor="middle" fontSize={128} fill={INK.red} stroke={CREAM} strokeWidth={12} paintOrder="stroke" {...T}>{countUp(n / 28, 28)}</text> : null}
        <Milo li={0} lf={lf} poses={["present"]} x={825} />
      </g>
    );
  }
  const cell = 118, x0 = 254, y0 = 232;
  const fall = (i: number) => ((frame + i * 13) % 104) / 104;
  return (
    <g>
      <Lab floor={760} shelf={false} />
      <g stroke={INK.line} strokeWidth={5}>
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i} fill="#C9A04A">
            <rect x={x0 - 62} y={y0 + 6 + i * 68} width={44} height={22} rx={4} />
            <rect x={x0 + 490} y={y0 + 6 + i * 68} width={44} height={22} rx={4} />
            <rect x={x0 + 8 + i * 68} y={y0 + 490} width={22} height={44} rx={4} />
          </g>
        ))}
        <rect x={x0 - 30} y={y0 - 30} width={532} height={532} rx={34} fill="#35504A" />
        <rect x={x0 - 14} y={y0 - 14} width={500} height={500} rx={22} fill="#28403B" strokeWidth={3} />
      </g>
      {Array.from({ length: 16 }, (_, i) => {
        const p = pop(lf, fps, 8 + i * 4);
        const cx = x0 + (i % 4) * cell + 59, cy = y0 + Math.floor(i / 4) * cell + 59;
        const k = i % 8 < 8 ? fall(i * 3) : 0;
        const lit = lf > 120 && k > 0.6 ? 1 - Math.abs(k - 0.8) * 5 : 0;
        const c = MOL[(i * 5 + Math.floor(i / 4)) % MOL.length];
        return (
          <Pop key={i} p={p} cx={cx} cy={cy}>
            {lit > 0 ? <rect x={cx - 60} y={cy - 60} width={120} height={120} rx={26} fill={c} opacity={0.5 * lit} /> : null}
            <rect x={cx - 48} y={cy - 48} width={96} height={96} rx={18} fill={lit > 0 ? c : "#DCE6E8"} stroke={INK.line} strokeWidth={5} />
            <rect x={cx - 34} y={cy - 34} width={68} height={68} rx={12} fill="none" stroke={c} strokeWidth={7} opacity={lit > 0 ? 0 : 1} />
            {lit > 0 ? <Molecule x={cx} y={cy + 4} c={CREAM} s={1} /> : null}
          </Pop>
        );
      })}
      {lf > 110
        ? Array.from({ length: 16 }, (_, i) => {
            const k = fall(i * 3);
            if (k > 0.62) return null;
            const cx = x0 + (i % 4) * cell + 59, cy = y0 + Math.floor(i / 4) * cell + 59;
            const q = k / 0.62;
            return <Molecule key={i} x={cx + (1 - q) * 60 * (i % 2 ? 1 : -1)} y={110 + (cy - 110) * q * q} c={MOL[(i * 5 + Math.floor(i / 4)) % MOL.length]} s={1} rot={frame * 3} />;
          })
        : null}
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4
const PROFILE = [
  [0.35, 0.9, 0.5, 0.2, 0.75, 0.4],
  [0.8, 0.3, 0.65, 0.95, 0.25, 0.5],
  [0.2, 0.55, 0.95, 0.4, 0.35, 0.85],
];
const Bars: React.FC<{ x: number; y: number; h: number; v: number[]; p?: number; w?: number; line?: string }> = ({ x, y, h, v, p = 1, w = 46, line = INK.line }) => (
  <g>
    {v.map((k, i) => <rect key={i} x={x + i * (w + 18)} y={y - h * k * p} width={w} height={Math.max(1, h * k * p)} rx={6} fill={MOL[i]} stroke={line} strokeWidth={4} />)}
  </g>
);

const Theorem: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const learn = 92;
    if (lf < learn) {
      return (
        <g>
          <Lab floor={740} shelf={false} />
          {Array.from({ length: 18 }, (_, i) => {
            const a = i * 2.4 + frame * 0.014;
            return <Molecule key={i} x={480 + Math.cos(a) * (300 + (i % 3) * 50)} y={400 + Math.sin(a) * (210 + (i % 3) * 45)} c={MOL[i % MOL.length]} s={1.1} rot={frame * 1.4 + i * 30} />;
          })}
          <NoseBot x={500} y={420} s={1.25} frame={frame} mood="puzzled" sniff={lf < 40} />
          <Pop p={pop(lf, fps, 40)} cx={700} cy={170}>
            <text x={740} y={200} textAnchor="middle" fontSize={130} fill={INK.red} stroke={CREAM} strokeWidth={10} paintOrder="stroke" {...T}>?</text>
          </Pop>
        </g>
      );
    }
    const q = lf - learn;
    return (
      <g>
        <Room floor={740} win={false} />
        <Chalkboard x={110} y={124} w={740} h={240} open={ease(q, 0, 16)} />
        <Pop p={pop(q, fps, 36)} cx={480} cy={240}>
          <text x={480} y={280} textAnchor="middle" fontSize={112} fill={CREAM} {...T}>HỌC MÁY</text>
        </Pop>
        <NoseBot x={480} y={575} s={0.9} frame={frame} mood="happy" cap={pop(q, fps, 10)} legs={false} />
        <g stroke={INK.line} strokeWidth={6} strokeLinejoin="round">
          <rect x={190} y={700} width={580} height={30} rx={8} fill="#C98B52" />
          <path d="M226 730 L226 850 M734 730 L734 850" strokeWidth={26} />
          <path d="M226 730 L226 850 M734 730 L734 850" strokeWidth={16} stroke="#8A5A34" />
          <path d="M480 694 Q420 660 340 676 L340 700 L480 704 Z M480 694 Q540 660 620 676 L620 700 L480 704 Z" fill={CREAM} />
        </g>
      </g>
    );
  }
  const build = (r: number) => ease(lf, 20 + r * 26, 26);
  const cmp = 178;
  const hit = pop(lf, fps, cmp + 78);
  const shrink = ease(lf, cmp - 18, 18);
  const bw = 66 - 38 * shrink;
  const rowY = [290, 480, 670];
  const pos = lf < cmp + 20 ? 2 : 2 - ease(lf, cmp + 22, 20) - ease(lf, cmp + 50, 20);
  const kinds = ["girl", "teacher", "boy"] as const;
  const shirts = ["#E9725B", "#6FA36B", "#5BA3D9"];
  return (
    <g>
      <Room floor={760} win={false} />
      <Chalkboard x={76} y={110} w={810} h={620} />
      {hit > 0 ? <rect x={88} y={122} width={786} height={190} rx={22} fill={GLOW} opacity={0.26 * Math.min(1, hit)} /> : null}
      {kinds.map((k, r) => (
        <g key={k}>
          <Portrait x={176} y={rowY[r] - 72} r={72} kind={k} frame={frame + r * 25} shirt={shirts[r]} id={`e12p${r}`} happy={r === 0 && hit > 0.5} />
          <Bars x={290} y={rowY[r]} h={150} v={PROFILE[r]} p={build(r)} w={bw} line={CREAM} />
          <line x1={278} x2={284 + 6 * (bw + 18)} y1={rowY[r]} y2={rowY[r]} stroke={CREAM} strokeWidth={5} />
        </g>
      ))}
      {lf > cmp ? (
        <g transform={`translate(${(1 - ease(lf, cmp, 18)) * 300} ${rowY[0] + (rowY[2] - rowY[0]) * (pos / 2)})`}>
          <rect x={590} y={-172} width={290} height={190} rx={20} fill="#EAF7FB" stroke={INK.line} strokeWidth={6} />
          <Bars x={606} y={0} h={150} v={PROFILE[0]} w={26} />
        </g>
      ) : null}
      <Check x={580} y={rowY[0] - 70} p={hit} r={52} color="#4CB65C" />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5
const CREW = Array.from({ length: 20 }, (_, i) => ({ kind: (["girl", "boy", "teacher"] as const)[(i * 2 + Math.floor(i / 5)) % 3], shirt: ["#E9725B", "#5BA3D9", "#7CC474", "#9B7BD8", "#F2BE4A"][i % 5] }));
const Realworld: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const many = lf > 168;
    const g = Math.min(100, Math.max(0, Math.floor((lf - 50) * 1.25)));
    return (
      <g>
        <Lab floor={600} shelf={false} />
        <g stroke={INK.line} strokeWidth={6}>
          <rect x={90} y={112} width={450} height={440} rx={26} fill="#F7FBFC" />
        </g>
        {Array.from({ length: 100 }, (_, i) => {
          const on = i < g;
          const miss = i === 37 || i === 84;
          return <circle key={i} cx={126 + (i % 10) * 42} cy={148 + Math.floor(i / 10) * 41} r={16} fill={!on ? "#D8E0E4" : miss ? "#D94A3D" : "#4CB65C"} stroke={INK.line} strokeWidth={3} />;
        })}
        <NoseBot x={722} y={350} s={0.78} frame={frame} mood={g >= 100 ? "happy" : "ok"} sniff={g < 100} />
        {many
          ? CREW.map((c, i) => {
              const x = 106 + (i % 10) * 83, y = i < 10 ? 738 : 846;
              return <Pop key={i} p={pop(lf, fps, 168 + i * 1.5)} cx={x} cy={y}><Person x={x} y={y} h={172} frame={frame + i * 13} kind={c.kind} shirt={c.shirt} happy la={0.1} ra={0.1} /></Pop>;
            })
          : CREW.slice(0, 6).map((c, i) => {
              const x = 130 + i * 142;
              return <Pop key={i} p={pop(lf, fps, 6 + i * 5)} cx={x} cy={826}><Person x={x} y={826} h={255} frame={frame + i * 13} kind={c.kind} shirt={c.shirt} la={0.15} ra={0.15} /></Pop>;
            })}
      </g>
    );
  }
  const ch = ease(lf, 158, 14);
  const turn = ease(lf, 50, 70);
  return (
    <g>
      <Room floor={720} win={false} />
      <Person x={300} y={860} h={560} frame={frame} ra={0.1} la={0.1 + ch * 0.4} shirt="#E9725B" happy={ch > 0.5} flip />
      <g stroke={INK.line} strokeWidth={6} strokeLinejoin="round">
        <path d="M80 690 L880 690 L920 750 L40 750 Z" fill="#C98B52" />
        <rect x={40} y={750} width={880} height={30} rx={6} fill="#A56B39" />
        <path d="M430 660 Q430 726 520 730 Q610 726 610 660 Z" fill="#F4F7F9" />
        <path d="M434 660 Q460 604 520 606 Q580 604 606 660 Z" fill="#FFFFFF" />
        <ellipse cx={720} cy={704} rx={92} ry={26} fill="#F4F7F9" />
        <path d="M646 698 Q670 640 730 652 Q790 650 794 698 Q720 720 646 698 Z" fill="#B5622F" />
        <path d="M668 680 Q700 662 760 676" fill="none" stroke="#E08A3C" strokeWidth={7} />
        <path d="M110 690 Q116 726 160 728 Q206 726 212 690 Z" fill="#7CC474" />
        <ellipse cx={161} cy={690} rx={52} ry={14} fill="#A9DE9C" />
      </g>
      {[500, 540, 700, 745].map((x, i) => <path key={x} d={`M${x} ${596 - i * 2} q${12 + wave(frame, 0.1, 6, i)} -24 0 -44 q-14 -22 0 -42`} fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={0.65} />)}
      <g opacity={1 - ch}>
        <circle cx={680} cy={290} r={150} fill={CREAM} stroke={INK.line} strokeWidth={10} />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={680} y1={166} x2={680} y2={i % 3 ? 178 : 190} stroke={INK.line} strokeWidth={8} transform={`rotate(${i * 30} 680 290)`} />)}
        <path d={`M680 290 L680 140 A150 150 0 0 1 ${680 + 150 * Math.sin(turn * Math.PI * 0.999)} ${290 - 150 * Math.cos(turn * Math.PI * 0.999)} Z`} fill="#E0703A" opacity={0.35} />
        <line x1={680} y1={290} x2={680} y2={176} stroke={INK.line} strokeWidth={10} strokeLinecap="round" transform={`rotate(${turn * 2160} 680 290)`} />
        <line x1={680} y1={290} x2={680} y2={216} stroke={INK.red} strokeWidth={14} strokeLinecap="round" transform={`rotate(${turn * 180} 680 290)`} />
        <circle cx={680} cy={290} r={12} fill={INK.line} />
      </g>
      {ch > 0 ? <Stream x1={322} y1={510} x2={860} y2={270} lf={lf} at={158} frame={frame} color={["#F2C27A", "#CFE08A", "#E9A7B8"][Math.floor((lf - 158) / 24) % 3]} w={110} n={30} d={1.6} /> : null}
    </g>
  );
};

// ---------------------------------------------------------------- hồi 6
const Pho: React.FC = () => (
  <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <path d="M-70 -20 Q-66 46 0 50 Q66 46 70 -20 Z" fill="#F4F7F9" />
    <ellipse cx={0} cy={-20} rx={70} ry={22} fill="#E9B45A" />
    <path d="M-44 -22 Q-20 -34 0 -22 T44 -22" fill="none" stroke={CREAM} strokeWidth={7} />
    <circle cx={22} cy={-14} r={9} fill="#7CC474" strokeWidth={3} />
    <circle cx={-26} cy={-12} r={8} fill="#B5622F" strokeWidth={3} />
  </g>
);
const Orange: React.FC = () => (
  <g stroke={INK.line} strokeWidth={5}>
    <circle r={54} fill="#F29A3A" />
    <path d="M0 -52 Q34 -86 62 -62 Q34 -40 0 -52 Z" fill="#6FB35C" />
    <ellipse cx={-20} cy={-18} rx={12} ry={18} fill="#FFFFFF" opacity={0.35} stroke="none" />
  </g>
);
const Coffee: React.FC = () => (
  <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <path d="M48 -24 Q92 -20 84 10 Q76 34 40 28" fill="none" strokeWidth={10} />
    <path d="M-54 -36 L-44 50 L44 50 L54 -36 Z" fill={CREAM} />
    <ellipse cx={0} cy={-36} rx={54} ry={16} fill="#6B3F22" />
  </g>
);

const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const k = Math.min(2, Math.floor(lf / 38));
    const Food = [Pho, Orange, Coffee][k];
    const col = ["#F2C27A", "#F7B27A", "#C9A78C"][k];
    return (
      <g>
        <Lab floor={760} shelf={false} />
        <Stream x1={346} y1={502} x2={540} y2={486} lf={lf} at={2} frame={frame} color={col} w={54} d={1.1} />
        <Bust x={215} y={430} s={0.95} frame={frame} puff={1} />
        <g transform="translate(480 240) scale(1.3)">
          <circle r={98} fill={CREAM} opacity={0.85} stroke={INK.line} strokeWidth={4} />
          <g transform={`scale(${pop(lf, fps, k * 38)})`}><Food /></g>
        </g>
        <NoseBot x={712} y={480} s={0.9} frame={frame} mood={lf > 104 ? "happy" : "ok"} sniff />
        <Pop p={pop(lf, fps, 104)} cx={790} cy={200}>
          <Portrait x={790} y={190} r={78} kind="girl" frame={frame} id="e12cz" happy bg="#CDEFD4" />
        </Pop>
      </g>
    );
  }
  const no = ease(lf, 122, 14);
  return (
    <g>
      <Room floor={720} />
      <Person x={225} y={860} h={540} frame={frame} happy ra={0.1} la={0.6 - no * 0.2} flip />
      <Stream x1={246} y1={524} x2={520} y2={400} lf={lf} at={70} frame={frame} color="#C7A3C9" w={60} d={0.9} mol={["#8A5FA8", "#B08AC9", "#6F4B86"]} />
      <g stroke={INK.line} strokeWidth={6} strokeLinejoin="round">
        <path d="M76 690 L440 690 L470 750 L50 750 Z" fill="#C98B52" />
        <rect x={50} y={750} width={420} height={28} rx={6} fill="#A56B39" />
        <path d="M80 776 L80 852 M440 776 L440 852" strokeWidth={22} />
        <ellipse cx={230} cy={698} rx={150} ry={36} fill="#E0B96C" />
        <ellipse cx={230} cy={692} rx={128} ry={28} fill="#8FBF6B" />
        {[0, 1, 2].map((i) => <path key={i} d={`M${140 + i * 32} 690 q16 -26 34 0 q-16 16 -34 0`} fill={CREAM} strokeWidth={4} />)}
        {[0, 1, 2, 3].map((i) => <rect key={i} x={238 + (i % 2) * 38} y={662 + Math.floor(i / 2) * 22} width={36} height={24} rx={5} fill="#E8A63C" strokeWidth={4} />)}
        <path d="M352 668 Q354 712 392 714 Q430 712 432 668 Z" fill="#F4F7F9" />
        <ellipse cx={392} cy={668} rx={40} ry={13} fill="#7E5A86" />
      </g>
      <g transform={`rotate(${no * wave(lf, 0.55, 5)} 610 420)`}>
        <Phone x={610} y={400} s={1.12} screen={no > 0.5 ? "#8E4A44" : "#2F6B4F"}>
          {[-40, 40].map((ex) => <ellipse key={ex} cx={ex} cy={-40} rx={13} ry={no > 0.5 ? 10 : 20} fill={CREAM} />)}
          {no > 0.5 ? <path d="M-60 -76 L-24 -60 M60 -76 L24 -60" stroke={CREAM} strokeWidth={9} strokeLinecap="round" /> : null}
          <path d={no > 0.5 ? "M-36 46 Q-18 16 0 34 Q18 52 36 24" : "M-34 16 Q0 46 34 16"} fill="none" stroke={CREAM} strokeWidth={10} strokeLinecap="round" />
          <Pop p={pop(lf, fps, 124)} cx={0} cy={130}><Lock x={0} y={130} s={0.8} /></Pop>
        </Phone>
      </g>
      <Milo li={0} lf={lf} poses={["wave"]} x={815} />
    </g>
  );
};

const EP12: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep12Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP12[beatKind] ?? Hook;
  return <Beat {...a} />;
};
