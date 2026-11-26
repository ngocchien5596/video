/**
 * Tập 13 "Gấp giấy quá 7 lần": cảnh vẽ riêng cho từng hồi, đổi hình theo câu đang đọc (`li`, `lf`),
 * bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts. Ít chữ: chỉ số lần gấp và con số trong câu.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780). Milo đứng ở x 800.
 */
import React from "react";
import { ease, Pop, pop, wave } from "./anim.tsx";
import { Label, Space } from "./ep10.tsx";
import { type Anim, Chalkboard, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

/** Đặt true khi cảnh riêng đã sẵn sàng; false thì tập dùng TopicScene chung. */
export const READY: boolean = true;

const CREAM = "#FFF6DD";
const GLOW = "#FFE27A";
const PAPER = "#FFFDF6";
const EDGE = "#E3D9C2";
const SHADE = "#CFC3A6";
const SKIN = "#F2C9A0";
const MILO_X = 800;

const Milo: React.FC<{ li: number; lf: number; poses: Parameters<typeof linePose>[2]; x?: number }> = ({ li, lf, poses, x = MILO_X }) => (
  <Stickman x={x} y={GROUND} scale={0.82} {...linePose(li, lf, poses)} />
);

// ---------------------------------------------------------------- đồ vật

/** Bộ đếm số lần gấp: vòng tròn có số to. */
const Counter: React.FC<{ x: number; y: number; n: number; r?: number; color?: string; p?: number }> = ({ x, y, n, r = 62, color = INK.red, p = 1 }) => (
  <Pop p={p} cx={x} cy={y}>
    <circle cx={x} cy={y} r={r} fill={CREAM} stroke={color} strokeWidth={8} />
    <text x={x} y={y + r * (n > 99 ? 0.28 : 0.36)} textAnchor="middle" fontSize={n > 99 ? r * 0.8 : r * 1.05} fill={color} {...T}>
      {n}
    </text>
  </Pop>
);

/** Huy chương kỷ lục có số. */
const Medal: React.FC<{ x: number; y: number; n: number; p?: number; frame: number }> = ({ x, y, n, p = 1, frame }) => (
  <Pop p={p} cx={x} cy={y}>
    <path d={`M${x - 40} ${y - 150} L${x - 10} ${y - 50} L${x + 10} ${y - 50} L${x + 40} ${y - 150} Z`} fill={INK.red} stroke={INK.line} strokeWidth={4} />
    <circle cx={x} cy={y} r={78 + wave(frame, 0.12, 3)} fill={GLOW} opacity={0.4} />
    <circle cx={x} cy={y} r={64} fill={INK.goldFill} stroke={INK.line} strokeWidth={6} />
    <circle cx={x} cy={y} r={48} fill="none" stroke={INK.gold} strokeWidth={4} />
    <text x={x} y={y + 22} textAnchor="middle" fontSize={64} fill={INK.line} {...T}>
      {n}
    </text>
  </Pop>
);

/** Trái Đất. */
const Earth: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g stroke={INK.line} strokeWidth={4}>
    <circle cx={x} cy={y} r={r} fill="#3D7EC4" />
    <path d={`M${x - r * 0.6} ${y - r * 0.3} q${r * 0.3} ${-r * 0.4} ${r * 0.6} ${-r * 0.1} q${r * 0.1} ${r * 0.4} ${-r * 0.2} ${r * 0.5} q${-r * 0.4} ${r * 0.1} ${-r * 0.4} ${-r * 0.4} Z`} fill="#6FAE4E" strokeWidth={3} />
    <path d={`M${x + r * 0.2} ${y + r * 0.2} q${r * 0.4} ${-r * 0.1} ${r * 0.5} ${r * 0.3} q${-r * 0.2} ${r * 0.3} ${-r * 0.5} ${r * 0.1} Z`} fill="#6FAE4E" strokeWidth={3} />
  </g>
);

/** Mặt Trăng. */
const Moon: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g stroke={INK.line} strokeWidth={4}>
    <circle cx={x} cy={y} r={r} fill="#D9D6CC" />
    <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.18} fill="#BDB9AD" strokeWidth={2} />
    <circle cx={x + r * 0.3} cy={y + r * 0.25} r={r * 0.12} fill="#BDB9AD" strokeWidth={2} />
  </g>
);


/** Phòng học ở nhà: tường, cửa sổ, sàn gỗ. */
export const Room: React.FC<{ night?: boolean; floor?: number; win?: boolean }> = ({ night = false, floor = 700, win = true }) => (
  <g>
    <rect x={40} y={70} width={900} height={790} fill={night ? "#5B6C93" : "#BFDCD8"} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={60 + i * 90} y={70} width={40} height={floor - 70} fill="#FFFFFF" opacity={night ? 0.05 : 0.16} />
    ))}
    {win ? (
      <g stroke={INK.line} strokeWidth={5}>
        <rect x={610} y={150} width={220} height={240} rx={8} fill={night ? "#1B2748" : "#DDF2FA"} />
        {night ? (
          <g stroke="none">
            <circle cx={760} cy={215} r={34} fill="#F5EBC0" />
            {[[650, 190], [690, 250], [645, 330], [790, 330], [735, 350]].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r={3} fill={CREAM} />
            ))}
          </g>
        ) : (
          <g stroke="none">
            <circle cx={770} cy={210} r={26} fill="#FBD65B" />
            <path d="M614 386 L614 340 Q670 300 720 335 Q770 310 826 345 L826 386 Z" fill="#8FC77B" />
          </g>
        )}
        <path d="M720 150 L720 390 M610 270 L830 270" />
        <rect x={596} y={388} width={248} height={18} rx={5} fill="#D9A066" />
      </g>
    ) : null}
    <rect x={40} y={floor} width={900} height={880 - floor} fill={night ? "#7A573C" : "#C98F5A"} />
    <rect x={40} y={floor - 16} width={900} height={18} fill={night ? "#94745A" : "#EBD3AC"} stroke={INK.line} strokeWidth={3} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={40} y1={floor + 30 + i * 34} x2={940} y2={floor + 30 + i * 34} stroke="#000" opacity={0.12} strokeWidth={3} />
    ))}
  </g>
);

/** Mặt bàn gỗ nhìn chếch, mép trước ở y + h. */
const Table: React.FC<{ x: number; y: number; w: number; h?: number; legs?: boolean }> = ({ x, y, w, h = 130, legs = true }) => (
  <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    {legs ? [x + 30, x + w - 60].map((lx) => <rect key={lx} x={lx} y={y + h} width={30} height={840 - y - h} fill="#8A5A34" />) : null}
    <path d={`M${x + 60} ${y} L${x + w - 60} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`} fill="#C98B52" />
    <rect x={x} y={y + h} width={w} height={26} rx={6} fill="#A56B39" />
    {[0.3, 0.6, 0.85].map((t) => (
      <line key={t} x1={x + 60 - 60 * t + 20} y1={y + h * t} x2={x + w - 60 + 60 * t - 20} y2={y + h * t} stroke="#A56B39" strokeWidth={2.5} opacity={0.6} />
    ))}
  </g>
);

const SW = [460, 400, 345, 300, 262, 230, 206, 188];
const SD = [290, 264, 238, 214, 192, 174, 160, 148];

/** Khối giấy nằm trên mặt phẳng: mặt trên, mặt trước và mặt phải có vân lớp. (x, y) = giữa cạnh trước, chạm bàn. */
const Block: React.FC<{ x: number; y: number; w: number; d: number; t: number; n?: number }> = ({ x, y, w, d, t, n = 6 }) => {
  const k = d * 0.42;
  const m = Math.min(16, n);
  return (
    <g transform={`translate(${x - k / 2} ${y})`} stroke={INK.line} strokeWidth={4} strokeLinejoin="round">
      <path d={`M${-w / 2 - 6} 8 L${w / 2} 8 L${w / 2 + k + 12} ${-k * 0.9 + 8} L${w / 2 + k} ${-k * 0.9 - 10} Z`} fill="#000" opacity={0.18} stroke="none" />
      <path d={`M${w / 2} 0 L${w / 2 + k} ${-k * 0.9} L${w / 2 + k} ${-k * 0.9 - t} L${w / 2} ${-t} Z`} fill={SHADE} />
      <rect x={-w / 2} y={-t} width={w} height={t} fill={EDGE} />
      <path d={`M${-w / 2} ${-t} L${w / 2} ${-t} L${w / 2 + k} ${-k * 0.9 - t} L${-w / 2 + k} ${-k * 0.9 - t} Z`} fill={PAPER} />
      {t > 8
        ? Array.from({ length: m - 1 }, (_, i) => {
            const yy = (-t * (i + 1)) / m;
            return <path key={i} d={`M${-w / 2} ${yy} L${w / 2} ${yy} L${w / 2 + k} ${yy - k * 0.9}`} fill="none" stroke="#A8997A" strokeWidth={1.6} />;
          })
        : null}
    </g>
  );
};

const thickOf = (n: number) => 3 + Math.pow(2, n) * 0.56;

/** Tờ giấy đang được gấp: `v` = số lần gấp (phần lẻ là nửa tờ đang lật sang). */
const FoldingSheet: React.FC<{ x: number; y: number; v: number; s?: number; shake?: number }> = ({ x, y, v, s = 1, shake = 0 }) => {
  const n = Math.min(7, Math.floor(v));
  const f = n >= 7 ? 0 : v - n;
  const flip = Math.min(1, f / 0.7);
  const zoom = Math.max(0, (f - 0.7) / 0.3);
  const w = SW[n], d = SD[n], t = thickOf(n);
  const dx = shake ? Math.sin(shake * 1.6) * 4 : 0;
  if (f === 0) return <g transform={`translate(${x + dx} ${y}) scale(${s})`}><Block x={0} y={0} w={w} d={d} t={t} n={Math.pow(2, n)} /></g>;
  if (zoom > 0) {
    const mx = (a: number, b: number) => a + (b - a) * zoom;
    return <g transform={`translate(${x} ${y}) scale(${s})`}><Block x={mx(-w / 4, 0)} y={0} w={mx(w / 2, SW[n + 1])} d={mx(d, SD[n + 1])} t={thickOf(n + 1)} n={Math.pow(2, n + 1)} /></g>;
  }
  const a = flip * Math.PI;
  const k = d * 0.42;
  const ox = (Math.cos(a) * w) / 2;
  const oy = (-Math.sin(a) * w) / 2.2 - t;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Block x={-w / 4} y={0} w={w / 2} d={d} t={t} n={Math.pow(2, n)} />
      <g transform={`translate(${-k / 2} 0)`} stroke={INK.line} strokeWidth={4} strokeLinejoin="round">
        <path d={`M0 ${-t} L${k} ${-k * 0.9 - t} L${ox + k} ${oy - k * 0.9} L${ox} ${oy} Z`} fill={flip < 0.5 ? PAPER : "#F1E9D6"} />
        <path d={`M0 ${-t} L${ox} ${oy} L${ox + Math.sin(a) * t} ${oy + t * 0.8 * Math.abs(Math.cos(a))} L0 0 Z`} fill={EDGE} />
      </g>
    </g>
  );
};

/** Bàn tay có tay áo, ngón hướng vào trong. side 1 = tay bên trái khung, -1 = bên phải. */
const Hand: React.FC<{ x: number; y: number; side: 1 | -1; s?: number; rot?: number }> = ({ x, y, side, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${side * s} ${s}) rotate(${rot})`} fill={SKIN} stroke={INK.line} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round">
    <path d="M-330 70 L-120 -42 L-96 42 L-300 190 Z" fill="#5BA3D9" />
    <path d="M-132 -46 L-104 -58 L-76 36 L-104 50 Z" fill="#3F7FB0" />
    <path d="M-100 -44 Q-70 -62 -40 -52 L8 -40 Q22 -34 14 -22 Q4 -16 -22 -20 L12 -14 Q26 -6 14 4 Q0 6 -24 2 L6 10 Q18 18 6 26 Q-8 28 -30 22 L-8 30 Q0 40 -12 44 Q-50 50 -78 34 Z" />
    <path d="M-62 -50 Q-40 -84 -12 -80 Q2 -74 -8 -62 Q-26 -56 -32 -46" />
  </g>
);

/** Người kiểu hoạt hình đầu to. Tay `la`, `ra`: góc giơ tay (0 buông, 1 ngang, 2 giơ cao). (x, y) là chân. */
export const Person: React.FC<{ x: number; y: number; h?: number; frame: number; la?: number; ra?: number; kind?: "girl" | "teacher" | "boy"; shirt?: string; happy?: boolean; flip?: boolean }> = ({
  x, y, h = 380, frame, la = 0.2, ra = 0.2, kind = "girl", shirt = "#E9725B", happy = false, flip = false,
}) => {
  const k = h / 380;
  const b = wave(frame, 0.09, 2.5);
  const blink = frame % 96 < 5;
  const hair = kind === "girl" ? "#6B3F22" : kind === "teacher" ? "#7C7C80" : "#2E2018";
  const arm = (side: 1 | -1, v: number) => {
    const a = ((70 - v * 70) * Math.PI) / 180;
    const ex = side * (40 + Math.cos(a) * 46), ey = -188 + Math.sin(a) * 46;
    const a2 = a - v * 0.35;
    const hx = ex + side * Math.cos(a2) * 44, hy = ey + Math.sin(a2) * 44;
    return (
      <g fill="none">
        <path d={`M${side * 38} -190 L${ex} ${ey} L${hx} ${hy}`} stroke={INK.line} strokeWidth={28} />
        <path d={`M${side * 38} -190 L${ex} ${ey}`} stroke={shirt} strokeWidth={20} />
        <path d={`M${ex} ${ey} L${hx} ${hy}`} stroke={SKIN} strokeWidth={19} />
        <circle cx={hx} cy={hy} r={13} fill={SKIN} stroke={INK.line} strokeWidth={4} />
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`} stroke={INK.line} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx={0} cy={4} rx={76} ry={12} fill="#000" opacity={0.2} stroke="none" />
      {kind === "girl" ? <path d={`M34 ${-318 + b} Q118 ${-320 + b} 102 ${-232 + b} Q96 ${-200 + b} 76 ${-192 + b} Q86 ${-240 + b} 40 ${-262 + b} Z`} fill={hair} /> : null}
      <path d="M-34 -110 L-32 -12 L-6 -12 L0 -90 L6 -12 L32 -12 L34 -110 Z" fill={kind === "teacher" ? "#4B4F5C" : "#3E6394"} />
      <path d="M-34 -12 Q-58 -6 -54 4 L-4 4 L-6 -12 Z M34 -12 Q58 -6 54 4 L4 4 L6 -12 Z" fill={kind === "girl" ? CREAM : "#3A2A20"} />
      {arm(-1, la)}
      <path d="M-40 -204 Q0 -220 40 -204 L46 -98 Q0 -86 -46 -98 Z" fill={shirt} />
      {kind === "teacher" ? <path d="M0 -206 L-9 -192 L-6 -136 L0 -124 L6 -136 L9 -192 Z" fill={INK.red} strokeWidth={3} /> : <path d="M-18 -208 Q0 -186 18 -208" fill={SKIN} strokeWidth={4} />}
      {arm(1, ra)}
      <g transform={`translate(0 ${b})`}>
        <circle cx={-64} cy={-268} r={11} fill={SKIN} />
        <circle cx={64} cy={-268} r={11} fill={SKIN} />
        <path d="M-64 -280 Q-64 -344 0 -344 Q64 -344 64 -280 Q64 -212 0 -210 Q-64 -212 -64 -280 Z" fill={SKIN} />
        {kind === "girl" ? (
          <path d="M-68 -270 Q-80 -364 0 -364 Q80 -364 68 -270 Q62 -306 34 -320 Q-10 -300 -50 -312 Q-64 -300 -68 -270 Z" fill={hair} />
        ) : kind === "teacher" ? (
          <path d="M-68 -268 Q-76 -350 -10 -358 Q74 -362 68 -268 Q60 -300 50 -318 Q0 -334 -46 -316 Q-60 -300 -68 -268 Z" fill={hair} />
        ) : (
          <path d="M-66 -280 Q-72 -340 -40 -350 L-28 -366 L-8 -352 L14 -368 L26 -350 Q72 -342 66 -280 Q50 -316 0 -314 Q-50 -314 -66 -280 Z" fill={hair} />
        )}
        {[-24, 24].map((ex) =>
          blink ? (
            <path key={ex} d={`M${ex - 12} -268 Q${ex} -260 ${ex + 12} -268`} fill="none" strokeWidth={4} />
          ) : (
            <g key={ex}>
              <ellipse cx={ex} cy={-268} rx={14} ry={17} fill="#FFFFFF" strokeWidth={3.5} />
              <circle cx={ex + 1} cy={-266} r={8.5} fill="#3B2614" stroke="none" />
              <circle cx={ex + 4} cy={-270} r={3} fill="#FFFFFF" stroke="none" />
            </g>
          ),
        )}
        {kind === "teacher" ? <path d="M-42 -268 a18 20 0 1 0 36 0 a18 20 0 1 0 -36 0 M6 -268 a18 20 0 1 0 36 0 a18 20 0 1 0 -36 0 M-6 -270 L6 -270" fill="none" strokeWidth={4} /> : null}
        <path d="M-38 -294 Q-24 -302 -12 -295 M12 -295 Q24 -302 38 -294" fill="none" strokeWidth={4} />
        <ellipse cx={-42} cy={-244} rx={10} ry={6} fill="#F09A84" opacity={0.55} stroke="none" />
        <ellipse cx={42} cy={-244} rx={10} ry={6} fill="#F09A84" opacity={0.55} stroke="none" />
        {happy ? <path d="M-18 -238 Q0 -212 18 -238 Z" fill="#B3402F" strokeWidth={4} /> : <path d="M-14 -234 Q0 -224 14 -234" fill="none" strokeWidth={4} />}
      </g>
    </g>
  );
};

/** Cuộn giấy dựng đứng. */
const PaperRoll: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5}>
    <path d="M-70 -150 L-70 0 Q0 34 70 0 L70 -150 Z" fill={PAPER} />
    <path d="M40 -140 L40 12 Q58 8 70 0 L70 -150 Z" fill={EDGE} stroke="none" />
    <ellipse cx={0} cy={-150} rx={70} ry={26} fill={CREAM} />
    {[52, 36].map((r) => <ellipse key={r} cx={0} cy={-150} rx={r} ry={r * 0.37} fill="none" stroke={SHADE} strokeWidth={2.5} />)}
    <ellipse cx={0} cy={-150} rx={20} ry={8} fill="#A8794C" />
  </g>
);

/** Giấy vụn ăn mừng. */
const Confetti: React.FC<{ t: number }> = ({ t }) =>
  t <= 0 ? null : (
    <g>
      {Array.from({ length: 34 }, (_, i) => {
        const y = 60 + ((i * 97) % 300) - 300 + t * (4 + (i % 4));
        return y > 840 ? null : <rect key={i} x={80 + ((i * 149) % 810) + Math.sin(t * 0.1 + i) * 14} y={y} width={14} height={9} fill={[INK.red, GLOW, "#5BA3D9", "#7CC474"][i % 4]} transform={`rotate(${t * 6 + i * 40} ${80 + ((i * 149) % 810)} ${y})`} />;
      })}
    </g>
  );

/** Thiên hà xoắn ốc bằng sao. */
const Galaxy: React.FC<{ x: number; y: number; r: number; frame: number; c: string }> = ({ x, y, r, frame, c }) => (
  <g transform={`translate(${x} ${y}) rotate(-18) scale(1 0.55)`}>
    <circle r={r * 0.9} fill={c} opacity={0.1} />
    <circle r={r * 0.5} fill={c} opacity={0.18} />
    <g transform={`rotate(${frame * 0.5})`}>
      {[0, 1, 2].flatMap((a) =>
        Array.from({ length: 26 }, (_, i) => {
          const t = i / 26, g = a * 2.094 + t * 4.2, q = r * (0.12 + t * 0.88), j = ((i * 37) % 11) - 5;
          return <circle key={`${a}-${i}`} cx={Math.cos(g) * q + j * r * 0.012} cy={Math.sin(g) * q - j * r * 0.012} r={r * 0.075 * (1.1 - t * 0.7)} fill={i % 4 ? c : CREAM} opacity={0.95 - t * 0.5} />;
        }),
      )}
    </g>
    <circle r={r * 0.2} fill={CREAM} />
  </g>
);

// ---------------------------------------------------------------- hồi 1: tới lần thứ bảy thì bó tay
const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    const v = Math.min(7, Math.max(0, lf - 50) / 20);
    const stuck = v >= 7;
    const reach = SW[Math.min(7, Math.floor(v))] / 2 + 40;
    const sq = stuck ? Math.sin(frame * 0.5) * 7 : 0;
    return (
      <g>
        <Room floor={470} />
        <Table x={40} y={450} w={900} h={330} legs={false} />
        <FoldingSheet x={450} y={690} v={v} s={1.1} shake={stuck ? frame : 0} />
        <Hand x={450 - reach + sq} y={650} side={1} rot={stuck ? 6 : 0} />
        <Hand x={520 + reach - sq} y={640} side={-1} rot={stuck ? 6 : 0} />
        <Counter x={300} y={240} n={Math.floor(v)} r={76} />
      </g>
    );
  }
  if (li === 1) {
    const g = pop(lf, fps, 140);
    return (
      <g>
        <Room />
        <Table x={90} y={560} w={400} h={90} />
        <FoldingSheet x={290} y={632} v={7} />
        <Counter x={300} y={330} n={7} r={70} p={pop(lf, fps, 20)} />
        <Pop p={g} cx={690} cy={790}>
          <Person x={690} y={800} h={470} frame={frame} la={0.3} ra={1.6 * ease(lf, 150, 20)} happy />
        </Pop>
        <Medal x={500} y={310} n={12} p={pop(lf, fps, 170)} frame={frame} />
      </g>
    );
  }
  return (
    <g>
      <Room win={false} />
      <PaperRoll x={180} y={775} s={1.3} />
      <Person x={430} y={800} h={470} frame={frame} la={1.1} ra={0.3} happy />
      <Label x={640} y={330 + wave(frame, 0.12, 8)} text="?" size={190} color={INK.red} p={pop(lf, fps, 6)} />
      <Milo li={0} lf={lf} poses={["scratch"]} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 2: số lớp nhân đôi
const STACK = [2, 4, 8, 16, 32, 64, 128];

const Barrier: React.FC<Anim> = ({ li, lf, fps }) => {
  if (li === 0) {
    const v = Math.min(3, Math.max(0, lf - 45) / 30);
    const n = Math.floor(v), m = Math.pow(2, n);
    return (
      <g>
        <Room win={false} floor={560} />
        <Table x={30} y={600} w={920} h={180} legs={false} />
        <FoldingSheet x={370} y={745} v={v} s={0.95} />
        <g>
          <line x1={500} y1={640} x2={585} y2={470} stroke={INK.line} strokeWidth={5} strokeDasharray="10 8" />
          <clipPath id="e13lens"><circle cx={640} cy={310} r={175} /></clipPath>
          <circle cx={640} cy={310} r={175} fill="#F3E3C0" />
          <g clipPath="url(#e13lens)">
            <rect x={440} y={430} width={400} height={80} fill="#C98B52" />
            {Array.from({ length: m }, (_, i) => (
              <rect key={i} x={480} y={430 - (i + 1) * 26} width={420} height={22} rx={4} fill={i % 2 ? CREAM : PAPER} stroke={INK.line} strokeWidth={3} />
            ))}
          </g>
          <circle cx={640} cy={310} r={175} fill="none" stroke={INK.gold} strokeWidth={14} />
          <circle cx={640} cy={310} r={183} fill="none" stroke={INK.line} strokeWidth={4} />
        </g>
        <Counter x={250} y={280} n={n} r={76} p={pop(lf, fps, 60)} />
      </g>
    );
  }
  const at = [14, 58, 96, 140, 158, 176, 194];
  const cur = at.filter((a) => lf >= a).length;
  return (
    <g>
      <Room win={false} floor={720} />
      <Table x={50} y={700} w={690} h={50} legs={false} />
      {STACK.map((v, i) => {
        const p = ease(lf, at[i], 16);
        const h = (500 * v) / 128;
        const x = 112 + i * 92;
        return p <= 0 ? null : (
          <g key={v} opacity={p}>
            <Block x={x} y={740} w={54} d={40} t={Math.max(3, h * p)} n={v} />
            <text x={x} y={740 - h * p - 30} textAnchor="middle" fontSize={i === 6 ? 60 : 36} fill={i === 6 ? INK.red : INK.line} stroke={CREAM} strokeWidth={7} paintOrder="stroke" {...T}>
              {v}
            </text>
          </g>
        );
      })}
      <Counter x={250} y={250} n={Math.max(1, cur)} r={76} />
      <Milo li={0} lf={lf} poses={["eureka"]} x={815} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 3: Britney Gallivan
const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0)
    return (
      <g>
        <Room win={false} floor={640} />
        <Chalkboard x={280} y={150} w={570} h={330} />
        <Label x={590} y={395} text="12" size={200} color={CREAM} p={pop(lf, fps, 150)} />
        <Person x={170} y={720} h={460} frame={frame} kind="teacher" shirt="#E8E2D0" ra={1.2 * ease(lf, 110, 20)} />
        {[[430, "boy", "#5BA3D9"], [640, "girl", "#E9725B"], [840, "boy", "#7CC474"]].map(([x, kd, c], i) => (
          <g key={i}>
            <Person x={x as number} y={850} h={300} frame={frame + i * 31} kind={kd as "boy"} shirt={c as string} ra={i === 1 ? 1.9 * ease(lf, 200, 18) : 0.2} happy={i === 1} />
            <rect x={(x as number) - 88} y={760} width={176} height={90} rx={8} fill="#B77A45" stroke={INK.line} strokeWidth={5} />
            <rect x={(x as number) - 96} y={748} width={192} height={18} rx={6} fill="#D9A066" stroke={INK.line} strokeWidth={5} />
          </g>
        ))}
      </g>
    );
  if (li === 1) {
    const st = lf < 70 ? 0 : lf < 135 ? 1 : 2;
    const m = [1, 2, 4][st];
    const red = ease(lf, 40, 24);
    const gap = 34;
    return (
      <g>
        <Room win={false} floor={720} />
        <rect x={350} y={130} width={540} height={560} rx={24} fill="#F6E7C6" stroke={INK.line} strokeWidth={5} />
        {Array.from({ length: m }, (_, i) => {
          const r = 22 + i * gap;
          const p = st === 0 ? 1 : ease(lf, (st === 1 ? 70 : 135) + i * 6, 16);
          const d = `M390 ${350 - r} L640 ${350 - r} A${r} ${r} 0 0 1 640 ${350 + r} L390 ${350 + r}`;
          return (
            <g key={i} opacity={i < m / 2 && st > 0 ? 1 : p} fill="none">
              <path d={d} stroke={INK.line} strokeWidth={22} />
              <path d={d} stroke={PAPER} strokeWidth={15} />
              <path d={`M640 ${350 - r} A${r} ${r} 0 0 1 640 ${350 + r}`} stroke={INK.red} strokeWidth={15} opacity={red * (0.8 + 0.2 * Math.sin(frame * 0.2))} />
            </g>
          );
        })}
        <rect x={390} y={585} width={460} height={40} rx={10} fill={PAPER} stroke={INK.line} strokeWidth={4} />
        <rect x={390} y={585} width={[46, 130, 390][st] * red} height={40} rx={10} fill={INK.red} stroke={INK.line} strokeWidth={4} />
        <Person x={205} y={800} h={470} frame={frame} la={0.2} ra={1.0 + 0.1 * Math.sin(frame * 0.1)} />
      </g>
    );
  }
  if (li === 2) {
    const g = ease(lf, 60, 70);
    const L = 190 * (1 + 3 * g);
    return (
      <g>
        <Room win={false} floor={560} />
        <Person x={170} y={640} h={420} frame={frame} la={0.2} ra={0.9} />
        <g stroke={INK.line} strokeWidth={4}>
          <path d={`M100 690 L${100 + L} 690 L${100 + L - 14} 770 L86 770 Z`} fill={PAPER} />
          {[1, 2, 3].map((i) => (L > i * 190 + 4 ? <path key={i} d={`M${100 + i * 190} 690 L${86 + i * 190} 770`} stroke={INK.green} strokeWidth={6} strokeDasharray="12 8" /> : null))}
          <g transform={`translate(${96 + L} 730)`}>
            <ellipse cx={0} cy={0} rx={30} ry={46} fill={EDGE} />
            <g transform={`rotate(${g * 900})`}><path d="M-14 0 A14 14 0 1 1 10 10" fill="none" /></g>
          </g>
        </g>
        <Label x={600} y={400} text="×4" size={200} color={INK.green} p={pop(lf, fps, 100)} />
      </g>
    );
  }
  // hành lang dài: trải giấy, gấp dần tới 12
  const n = Math.min(12, Math.floor(Math.min(1, Math.max(0, (lf - 120) / 100)) * 12.001));
  const un = ease(lf, 6, 70);
  const VX = 520, VY = 330;
  const len = lf < 120 ? un : Math.pow(0.66, n);
  const far = 1 - 0.94 * len;
  const base = 800;
  const P = (x: number, y: number, t: number): [number, number] => [VX + (x - VX) * t, VY + (y - VY) * t];
  const tk = n * 9;
  const q = [P(380, base, 1), P(620, base, 1), P(620, base, far), P(380, base, far)];
  const pt = (a: [number, number], up = 0) => `${a[0]} ${a[1] - up}`;
  const done = lf - 228;
  return (
    <g>
      <rect x={40} y={70} width={900} height={790} fill="#DCE6DC" />
      <path d={`M40 860 L${VX - 60} ${VY + 50} L${VX + 60} ${VY + 50} L940 860 Z`} fill="#D3A872" />
      <path d={`M40 70 L${VX - 60} ${VY - 50} L${VX + 60} ${VY - 50} L940 70 Z`} fill="#F5F0DF" />
      <rect x={VX - 60} y={VY - 50} width={120} height={100} fill="#BFDCE8" stroke={INK.line} strokeWidth={4} />
      {[0.9, 0.62, 0.42, 0.29].map((t) => (
        <g key={t} stroke={INK.line} strokeWidth={4 * t + 1} strokeLinejoin="round">
          <path d={`M${pt(P(20, 840, t))} L${pt(P(20, 230, t))} L${pt(P(20, 230, t * 0.8))} L${pt(P(20, 840, t * 0.8))} Z`} fill="#7FA6A0" />
          <path d={`M${pt(P(1010, 840, t))} L${pt(P(1010, 230, t))} L${pt(P(1010, 230, t * 0.8))} L${pt(P(1010, 840, t * 0.8))} Z`} fill="#7FA6A0" />
          <path d={`M${pt(P(400, 40, t))} L${pt(P(640, 40, t))} L${pt(P(640, 40, t * 0.88))} L${pt(P(400, 40, t * 0.88))} Z`} fill={GLOW} />
        </g>
      ))}
      <g stroke={INK.line} strokeWidth={4} strokeLinejoin="round">
        {tk > 0 ? <path d={`M${pt(q[1])} L${pt(q[2])} L${pt(q[2], tk * far)} L${pt(q[1], tk)} Z`} fill={SHADE} /> : null}
        {tk > 0 ? <path d={`M${pt(q[0])} L${pt(q[1])} L${pt(q[1], tk)} L${pt(q[0], tk)} Z`} fill={EDGE} /> : null}
        <path d={`M${pt(q[0], tk)} L${pt(q[1], tk)} L${pt(q[2], tk * far)} L${pt(q[3], tk * far)} Z`} fill={PAPER} />
        {tk > 12 ? Array.from({ length: n }, (_, i) => <line key={i} x1={q[0][0]} x2={q[1][0]} y1={base - (tk * (i + 1)) / (n + 1)} y2={base - (tk * (i + 1)) / (n + 1)} stroke="#A8997A" strokeWidth={1.8} />) : null}
      </g>
      <Person x={215} y={815} h={430} frame={frame} la={0.2} ra={done > 0 ? 1.9 : 0.9} happy={done > 0} />
      {lf < 120 ? <Label x={750} y={560} text="1.200 m" size={64} color={INK.blue} p={pop(lf, fps, 50)} /> : null}
      {lf >= 120 && done <= 0 ? <Counter x={740} y={330} n={n} r={80} /> : null}
      <Confetti t={done} />
      <Medal x={740} y={380} n={12} p={pop(lf, fps, 228)} frame={frame} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 4: cấp số nhân
const Theorem: React.FC<Anim> = ({ li, lf, fps }) => {
  if (li === 0)
    return (
      <g>
        <Room win={false} floor={720} />
        <Chalkboard x={90} y={160} w={620} h={470} open={ease(lf, 0, 16)} />
        {["1", "2", "4", "8"].map((t, i) => (
          <g key={t}>
            <Label x={170 + i * 150} y={300} text={t} size={80} color={CREAM} p={pop(lf, fps, 16 + i * 18)} />
            {i ? <Label x={95 + i * 150} y={290} text="→" size={50} color="#9FC4A8" p={pop(lf, fps, 10 + i * 18)} /> : null}
          </g>
        ))}
        <Label x={400} y={440} text="CẤP SỐ NHÂN" size={66} color={GLOW} p={pop(lf, fps, 100)} />
        <Label x={400} y={570} text="q = 2" size={92} color={CREAM} p={pop(lf, fps, 136)} />
        <Milo li={0} lf={lf} poses={["present"]} />
      </g>
    );
  const k = ease(lf, 10, 170);
  const pts = Array.from({ length: 81 }, (_, i) => i / 80).filter((t) => t <= k).map((t) => [130 + t * 540, 730 - (Math.pow(2, t * 10) - 1) * 0.6]);
  const last = pts[pts.length - 1] ?? [130, 730];
  return (
    <g>
      <Room win={false} floor={760} />
      <rect x={85} y={120} width={620} height={640} rx={10} fill="#FBF6E6" stroke={INK.line} strokeWidth={5} />
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={130 + i * 54} y1={130} x2={130 + i * 54} y2={750} stroke="#BBD3E3" strokeWidth={2} />)}
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={95} y1={730 - i * 58} x2={695} y2={730 - i * 58} stroke="#BBD3E3" strokeWidth={2} />)}
      <path d="M130 150 L130 730 L685 730" fill="none" stroke={INK.line} strokeWidth={6} />
      <path d={`M${pts.map((q) => q.join(" ")).join(" L")}`} fill="none" stroke={INK.red} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={17} fill={INK.goldFill} stroke={INK.line} strokeWidth={5} />
      <Milo li={0} lf={lf} poses={["eureka"]} />
    </g>
  );
};

// ---------------------------------------------------------------- hồi 5: tới Mặt Trăng, vũ trụ và kết
const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => {
  if (li === 0) {
    if (lf < 165)
      return (
        <g>
          <Space frame={frame} />
          <circle cx={490} cy={440} r={260} fill="#6E8FD0" opacity={0.14} />
          <g transform={`rotate(${wave(frame, 0.05, 5)} 490 440) translate(0 ${wave(frame, 0.07, 10)})`}>
            <path d="M330 360 L620 310 L690 500 L390 560 Z" fill={PAPER} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" />
            <path d="M390 560 L690 500 L690 506 L390 567 Z" fill={SHADE} />
          </g>
          <Label x={490} y={730} text="0,1 mm" size={84} color={GLOW} p={pop(lf, fps, 40)} />
        </g>
      );
    const k = ease(lf, 170, 80);
    const top = 620 - 500 * k;
    return (
      <g>
        <Space frame={frame} />
        <circle cx={480} cy={790} r={215} fill="#5FA8E8" opacity={0.2} />
        <Earth x={480} y={790} r={185} />
        <circle cx={690} cy={290} r={110} fill={CREAM} opacity={0.1} />
        <Moon x={690} y={290} r={84} />
        <rect x={452} y={top} width={56} height={620 - top} fill={PAPER} stroke={INK.line} strokeWidth={4} />
        <rect x={488} y={top} width={18} height={620 - top} fill={SHADE} opacity={0.7} />
        {Array.from({ length: Math.floor((620 - top) / 12) }, (_, i) => <line key={i} x1={454} x2={506} y1={614 - i * 12} y2={614 - i * 12} stroke="#A8997A" strokeWidth={1.6} />)}
        <Counter x={260} y={330} n={Math.round(42 * k)} r={92} />
      </g>
    );
  }
  if (li === 1) {
    const k = ease(lf, 10, 110);
    return (
      <g>
        <Space frame={frame} />
        {([[220, 560, 100, "#F09AB0"], [740, 230, 130, "#8FC7F0"], [250, 220, 90, "#B9A6F0"], [740, 620, 150, "#F2BE4A"], [480, 400, 80, "#8FE0C8"]] as [number, number, number, string][]).map(([x, y, r, c], i) => (
          <Pop key={i} p={pop(lf, fps, i * 9)} cx={x} cy={y}>
            <Galaxy x={x} y={y} r={r} frame={frame + i * 30} c={c} />
          </Pop>
        ))}
        <rect x={468} y={860 - 800 * k} width={26} height={800 * k + 10} fill={PAPER} stroke={INK.line} strokeWidth={3} />
        <rect x={484} y={860 - 800 * k} width={9} height={800 * k + 10} fill={SHADE} />
        <Counter x={300} y={720} n={Math.round(103 * k)} r={88} />
      </g>
    );
  }
  return (
    <g>
      <Room night />
      <Table x={90} y={560} w={480} h={100} />
      <FoldingSheet x={320} y={640} v={7} />
      <Milo li={0} lf={lf} poses={["wave"]} />
    </g>
  );
};

const EP13: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, cosmic: Cosmic };

export const Ep13Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP13[beatKind] ?? Hook;
  return <Beat {...a} />;
};
