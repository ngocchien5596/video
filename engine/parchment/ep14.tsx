/**
 * Tập "Rét âm độ mà sao Việt Nam vẫn hiếm có tuyết?": cảnh vẽ riêng, đổi hình theo câu đang đọc (`li`, `lf`),
 * bám trường `shot` trong projects/kien-thuc/src/episodes/tuan-3.ts. Chữ tối thiểu: con số và tên ba hiện tượng.
 * Toạ độ gốc sân khấu: x 60..910, y 93..835 (mặt đất y = 780). Milo đứng ở x 800.
 */
import React from "react";
import { ease, Pop, pop, wave } from "./anim.tsx";
import { Label } from "./ep10.tsx";
import { type Anim, GROUND, linePose, T } from "./kit.tsx";
import { INK } from "./ParchmentHud.tsx";
import { Stickman } from "./Stickman.tsx";

export const READY: boolean = true;

const CREAM = "#FFF6DD";
const ICE = "#E8F5FC";
const COLD = "#5B93C9";
const WARM = "#F0A05A";
const WET = "#4D8FD1";

const Milo: React.FC<{ lf: number; pose: Parameters<typeof linePose>[2][number] }> = ({ lf, pose }) => (
  <Stickman x={800} y={GROUND} scale={0.82} {...linePose(0, lf, [pose])} />
);

// ---------------------------------------------------------------- đồ vật

/** Nền trời phủ kín sân khấu; top/bot là màu trên, dưới. */
const Sky: React.FC<{ id: string; top: string; bot: string }> = ({ id, top, bot }) => (
  <g>
    <defs>
      <linearGradient id={`e14-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bot} />
      </linearGradient>
    </defs>
    <rect x={40} y={80} width={900} height={780} fill={`url(#e14-${id})`} />
  </g>
);

const Ground: React.FC<{ y?: number; color?: string }> = ({ y = 740, color = "#DCE7EC" }) => (
  <path d={`M40 ${y} Q260 ${y - 30} 480 ${y} T940 ${y} L940 870 L40 870 Z`} fill={color} stroke={INK.line} strokeWidth={5} />
);

/** Dãy núi; cap: phần phủ trắng trên đỉnh (0..1). */
const Mountains: React.FC<{ cap?: number; base?: number; far?: string; near?: string }> = ({ cap = 0, base = 760, far = "#8FA9B8", near = "#5F7F86" }) => (
  <g stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <path d={`M40 ${base} L210 ${base - 270} L330 ${base - 150} L520 ${base - 390} L700 ${base - 170} L800 ${base - 270} L940 ${base - 120} L940 ${base} Z`} fill={far} />
    {cap > 0 ? <path d={`M452 ${base - 303} L520 ${base - 390} L592 ${base - 302} L560 ${base - 285} L530 ${base - 312} L500 ${base - 284} Z`} fill="#FFFFFF" opacity={cap} /> : null}
    <path d={`M40 ${base} L150 ${base - 130} L320 ${base - 30} L470 ${base - 180} L640 ${base - 40} L790 ${base - 140} L940 ${base - 30} L940 ${base + 110} L40 ${base + 110} Z`} fill={near} />
  </g>
);

/** Bông tuyết sáu cánh, tâm (x, y). */
const Flake: React.FC<{ x: number; y: number; r: number; rot?: number; c?: string; o?: number }> = ({ x, y, r, rot = 0, c = "#FFFFFF", o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o} strokeLinecap="round" fill="none">
    {[INK.line, c].map((col, k) => (
      <g key={col} stroke={col} strokeWidth={k ? r * 0.13 : r * 0.13 + Math.min(6, r * 0.16)}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} transform={`rotate(${a})`} d={`M0 0 L0 ${-r} M0 ${-r * 0.45} L${r * 0.22} ${-r * 0.68} M0 ${-r * 0.45} L${-r * 0.22} ${-r * 0.68} M0 ${-r * 0.72} L${r * 0.15} ${-r * 0.9} M0 ${-r * 0.72} L${-r * 0.15} ${-r * 0.9}`} />
        ))}
      </g>
    ))}
  </g>
);

const Drop: React.FC<{ x: number; y: number; r: number; o?: number }> = ({ x, y, r, o = 1 }) => (
  <path d={`M${x} ${y - r * 1.6} Q${x + r * 1.2} ${y} ${x + r} ${y + r * 0.4} A${r} ${r} 0 0 1 ${x - r} ${y + r * 0.4} Q${x - r * 1.2} ${y} ${x} ${y - r * 1.6} Z`} fill={WET} stroke={INK.line} strokeWidth={3} opacity={o} />
);

const CloudShape: React.FC<{ x: number; y: number; s?: number; c?: string; frame: number }> = ({ x, y, s = 1, c = "#F4F8FB", frame }) => (
  <g transform={`translate(${x + wave(frame, 0.03, 6)} ${y}) scale(${s})`}>
    <path d="M-250 60 Q-310 50 -300 0 Q-290 -50 -220 -48 Q-200 -120 -110 -110 Q-60 -165 20 -140 Q90 -160 130 -100 Q210 -110 230 -45 Q300 -40 300 10 Q300 60 240 60 Z" fill={c} stroke={INK.line} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-220 30 Q-60 50 180 30" fill="none" stroke={INK.soft} strokeWidth={5} strokeLinecap="round" />
  </g>
);

/** Nhiệt kế đứng; v 0..1 là mức cột; (x, y) là tâm bầu. */
const Thermo: React.FC<{ x: number; y: number; h?: number; v: number; color?: string; s?: number }> = ({ x, y, h = 260, v, color = INK.red, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5}>
    <rect x={-22} y={-h - 20} width={44} height={h + 20} rx={22} fill="#FFFFFF" />
    <circle cx={0} cy={0} r={38} fill="#FFFFFF" />
    <circle cx={0} cy={0} r={25} fill={color} stroke="none" />
    <rect x={-9} y={-10 - (h - 10) * v} width={18} height={14 + (h - 10) * v} rx={8} fill={color} stroke="none" />
    {[0.2, 0.4, 0.6, 0.8].map((k) => (
      <line key={k} x1={8} y1={-10 - (h - 10) * k} x2={22} y2={-10 - (h - 10) * k} strokeWidth={3} />
    ))}
  </g>
);

/** Cây trụi lá; ice 0..1: băng phủ trắng cành. */
const BareTree: React.FC<{ x: number; y: number; s?: number; ice: number }> = ({ x, y, s = 1, ice }) => {
  const d = "M0 0 L0 -150 M0 -70 L-60 -140 L-70 -190 M-36 -112 L-80 -120 M0 -100 L60 -170 L64 -220 M34 -140 L84 -150 M0 -150 L-24 -220 M0 -150 L26 -230";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK.line} strokeWidth={18} />
      <path d={d} stroke="#7A5A40" strokeWidth={10} />
      <path d={d} stroke="#FFFFFF" strokeWidth={9} opacity={ice} transform="translate(-2 -4)" />
      {[[-70, -165], [-80, -120], [62, -200], [84, -150], [-24, -205], [24, -210]].map(([ix, iy]) => (
        <path key={`${ix}${iy}`} d={`M${ix - 7} ${iy} L${ix + 7} ${iy} L${ix} ${iy + 34 * ice} Z`} fill={ICE} stroke={INK.line} strokeWidth={2.5} opacity={ice} />
      ))}
    </g>
  );
};

/** Gió rét thổi ngang. */
const Wind: React.FC<{ frame: number; y: number; o?: number }> = ({ frame, y, o = 1 }) => {
  const k = (frame % 90) / 90;
  return (
    <path d={`M${-200 + 1200 * k} ${y} q70 -26 150 0 t150 0`} fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" opacity={o * Math.sin(Math.PI * k)} />
  );
};

/** Vùng cắt đúng bằng sân khấu cho vật trôi ra ngoài mép. */
const Clip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g>
    <defs>
      <clipPath id="e14-clip">
        <rect x={40} y={80} width={900} height={780} />
      </clipPath>
    </defs>
    <g clipPath="url(#e14-clip)">{children}</g>
  </g>
);

/** Tuyết rơi lấp đầy vùng y0..y1. */
const Snowfall: React.FC<{ frame: number; n?: number; y0: number; y1: number; x0?: number; x1?: number; o?: number }> = ({ frame, n = 22, y0, y1, x0 = 70, x1 = 900, o = 1 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const k = (frame / (150 + (i % 5) * 25) + i * 0.137) % 1;
      const x = x0 + ((i * 173) % (x1 - x0)) + wave(frame, 0.05, 14, i);
      return <Flake key={i} x={x} y={y0 + (y1 - y0) * k} r={14 + (i % 4) * 4} rot={frame * 0.8 + i * 30} o={o * Math.min(1, 6 * k, 6 * (1 - k))} />;
    })}
  </g>
);

const Arrow: React.FC<{ x: number; y: number; len: number; rot: number; c: string; p: number }> = ({ x, y, len, rot, c, p }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={Math.min(1, p * 2)}>
    <path d={`M0 0 L${len * p} 0`} stroke={INK.line} strokeWidth={26} />
    <path d={`M${len * p - 4} -34 L${len * p + 44} 0 L${len * p - 4} 34 Z`} fill={c} stroke={INK.line} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M0 0 L${len * p} 0`} stroke={c} strokeWidth={17} />
  </g>
);

// ---------------------------------------------------------------- hồi 1
const Hook: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <Clip>
    {li === 0 ? (
      <g>
        <Sky id="h0" top="#A9C3D6" bot="#E6EFF3" />
        <Mountains />
        <Thermo x={690} y={600} h={300} s={1.15} v={0.85 - 0.65 * ease(lf, 110, 110)} color={lf > 190 ? COLD : INK.red} />
        <Label x={340} y={300} text={lf < 205 ? "0 °C" : "ÂM ĐỘ"} size={110} color={INK.blue} p={pop(lf, fps, lf < 205 ? 160 : 205)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Sky id="h1" top="#B7CAD6" bot="#EDF3F6" />
        <Mountains far="#A9BBC5" near="#8FA6AE" base={700} />
        <Ground color="#E8F0F4" />
        <BareTree x={230} y={750} s={1.5} ice={ease(lf, 5, 50)} />
        <BareTree x={520} y={770} s={1.9} ice={ease(lf, 15, 60)} />
        <BareTree x={790} y={745} s={1.4} ice={ease(lf, 25, 60)} />
        {[220, 330, 460].map((y, i) => (
          <Wind key={y} frame={frame + i * 32} y={y} o={0.9} />
        ))}
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Sky id="h2" top="#8FA3B3" bot="#D7E1E7" />
        <CloudShape x={330} y={280} s={0.95} c="#C9D5DD" frame={frame} />
        <CloudShape x={720} y={210} s={0.6} c="#D6E0E6" frame={frame + 60} />
        <Ground color="#E8F0F4" />
        <BareTree x={220} y={750} s={1.2} ice={1} />
        <Label x={480} y={600 + wave(frame, 0.12, 8)} text="?" size={210} color={INK.red} p={pop(lf, fps, 14)} />
        <Milo lf={lf} pose="scratch" />
      </g>
    ) : null}
  </Clip>
);

// ---------------------------------------------------------------- hồi 2
const Barrier: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <Clip>
    {li === 0 ? (
      <g>
        <Sky id="b0" top="#8DB4D3" bot="#E3EEF4" />
        <Ground />
        <Pop p={pop(lf, fps, 6)} cx={420} cy={260}>
          <CloudShape x={420} y={270} s={0.95} frame={frame} />
        </Pop>
        <Thermo x={420} y={745} h={190} v={0.15} color={COLD} />
        <Arrow x={420} y={510} len={90} rot={-90} c={INK.goldFill} p={ease(lf, 100, 24)} />
        <Milo lf={lf} pose="pointR" />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Sky id="b1" top="#18243F" bot="#2E4468" />
        {Array.from({ length: 26 }, (_, i) => (
          <circle key={i} cx={60 + ((i * 137) % 860)} cy={100 + ((i * 89) % 720)} r={2 + (i % 3)} fill={CREAM} opacity={0.6} />
        ))}
        <defs>
          <clipPath id="e14-globe">
            <circle cx={480} cy={490} r={280} />
          </clipPath>
        </defs>
        <circle cx={480} cy={490} r={280} fill="#5BA3D9" stroke={INK.line} strokeWidth={6} />
        <g clipPath="url(#e14-globe)">
          <rect x={190} y={379} width={580} height={222} fill={WARM} opacity={0.75 * ease(lf, 10, 24)} />
          <path d={`M180 180 H780 V${270 + 170 * ease(lf, 110, 80)} Q${630} ${330 + 170 * ease(lf, 110, 80)} 480 ${280 + 190 * ease(lf, 110, 80)} T180 ${270 + 150 * ease(lf, 110, 80)} Z`} fill="#DDF0FA" opacity={0.92} />
          <path d="M200 490 H760" stroke={INK.line} strokeWidth={4} strokeDasharray="14 12" />
          <path d="M480 210 V770 M480 210 Q300 490 480 770 M480 210 Q660 490 480 770" fill="none" stroke={INK.line} strokeWidth={2.5} opacity={0.3} />
        </g>
        <circle cx={540} cy={394} r={14 + wave(frame, 0.15, 3)} fill={INK.red} stroke={CREAM} strokeWidth={5} opacity={ease(lf, 20, 12)} />
        {[340, 480, 620].map((x, i) => (
          <Arrow key={x} x={x} y={235} len={90} rot={90} c={COLD} p={ease(lf, 115 + i * 8, 40)} />
        ))}
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Sky id="b2" top={COLD} bot="#BBD6EA" />
        <rect x={40} y={400} width={900} height={160 * ease(lf, 40, 30)} fill={WARM} opacity={0.9} />
        <CloudShape x={520} y={240} s={0.8} frame={frame} />
        <Ground color="#DCE9F1" />
        <path d={`M40 400 q75 ${wave(frame, 0.08, 16)} 150 0 t150 0 t150 0 t150 0 t150 0 t150 0`} fill="none" stroke={CREAM} strokeWidth={6} opacity={ease(lf, 40, 30)} />
        <Thermo x={160} y={350} h={110} v={0.15} color={COLD} s={0.9} />
        <Pop p={pop(lf, fps, 60)} cx={380} cy={490}>
          <Thermo x={380} y={530} h={110} v={0.75} color={INK.red} s={0.9} />
        </Pop>
        <Thermo x={600} y={735} h={110} v={0.15} color={COLD} s={0.9} />
        <Milo lf={lf} pose="think" />
      </g>
    ) : null}
  </Clip>
);

// ---------------------------------------------------------------- hồi 3
const Eureka: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <Clip>
    {li === 0 ? (
      <g>
        <Sky id="e0" top="#4F7FB0" bot="#A9CBE4" />
        <CloudShape x={480} y={500} s={1.45} c="#EAF2F8" frame={frame} />
        {Array.from({ length: 18 }, (_, i) => {
          const a = (i * Math.PI * 2) / 18;
          const k = ease(lf, 10 + (i % 3) * 8, 100);
          const R = 300 * (1 - k);
          return <circle key={i} cx={480 + Math.cos(a + k * 2) * R} cy={470 + Math.sin(a + k * 2) * R * 0.5} r={13} fill="#9CCBEA" stroke={INK.line} strokeWidth={3} opacity={1 - ease(lf, 95, 20)} />;
        })}
        <g opacity={ease(lf, 70, 30)}>
          <Flake x={480} y={470} r={40 + 130 * ease(lf, 70, 60)} rot={frame * 0.4} />
        </g>
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Sky id="e1" top="#4F7FB0" bot="#C6DDEE" />
        <CloudShape x={480} y={290} s={1.1} frame={frame} />
        <Ground color="#FFFFFF" />
        <Snowfall frame={frame} n={14} y0={370} y1={740} o={0.75} />
        <Flake x={480 + wave(lf, 0.06, 40)} y={380 + 320 * Math.min(1, lf / 150)} r={70} rot={lf} />
      </g>
    ) : null}
    {li === 2
      ? (() => {
          const rain = lf >= 170;
          return (
            <g>
              <Sky id="e2" top="#4F7FB0" bot="#B5CDDD" />
              <CloudShape x={400} y={240} s={0.8} frame={frame} />
              <rect x={40} y={400} width={900} height={150} fill={WARM} opacity={0.9} />
              <path d={`M40 400 q75 ${wave(frame, 0.08, 16)} 150 0 t150 0 t150 0 t150 0 t150 0 t150 0`} fill="none" stroke={CREAM} strokeWidth={6} />
              <Ground color="#C9D6DC" />
              <Snowfall frame={frame} n={10} y0={280} y1={430} x0={150} x1={660} />
              {Array.from({ length: 16 }, (_, i) => {
                const k = (frame / 45 + i * 0.21) % 1;
                return <Drop key={i} x={150 + ((i * 97) % 520)} y={450 + 270 * k} r={11} o={Math.min(1, 8 * k, 8 * (1 - k)) * ease(lf, 40, 20)} />;
              })}
              <Label x={770} y={500} text="> 0 °C" size={56} color={INK.red} p={ease(lf, 25, 14)} />
              {rain ? <Thermo x={690} y={745} h={130} v={0.3} color={COLD} /> : null}
              <Label x={815} y={700} text="1–2 °C" size={50} color={INK.blue} p={pop(lf, fps, 170)} />
            </g>
          );
        })()
      : null}
  </Clip>
);

// ---------------------------------------------------------------- hồi 4
const Theorem: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <Clip>
    {li === 0 ? (
      <g>
        <Sky id="t0" top="#6FA0CC" bot="#E6F0F6" />
        <path d="M120 870 L470 190 L820 870 Z" fill="#6E8C92" stroke={INK.line} strokeWidth={6} strokeLinejoin="round" />
        <path d="M385 356 L470 190 L555 356 L520 336 L490 372 L460 336 L425 376 Z" fill="#FFFFFF" stroke={INK.line} strokeWidth={4} strokeLinejoin="round" opacity={ease(lf, 20, 40)} />
        <CloudShape x={280} y={580} s={0.65} frame={frame} />
        <CloudShape x={650} y={640} s={0.6} frame={frame + 80} />
        <Snowfall frame={frame} n={14} y0={110} y1={380} x0={250} x1={700} o={ease(lf, 20, 30)} />
        <Arrow x={860} y={760} len={380} rot={-90} c={INK.goldFill} p={ease(lf, 90, 40)} />
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Sky id="t1" top="#7FB0D8" bot="#F3EBD6" />
        <path d="M40 870 L40 780 L230 780 L230 650 L430 650 L430 520 L630 520 L630 390 L940 390 L940 870 Z" fill="#7F9A8C" stroke={INK.line} strokeWidth={6} strokeLinejoin="round" />
        {[0, 1, 2, 3].map((i) => (
          <Pop key={i} p={pop(lf, fps, 20 + i * 32)} cx={140 + i * 200} cy={700 - i * 130}>
            <Thermo x={140 + i * 200} y={745 - i * 130} h={120} v={0.85 - i * 0.2} color={["#C0392B", "#C98A3A", "#6E9BC0", COLD][i]} />
          </Pop>
        ))}
        <Label x={330} y={790} text="100 m" size={48} color={CREAM} p={pop(lf, fps, 125)} />
        <Label x={300} y={260} text="−0,6 °C" size={92} color={INK.blue} p={pop(lf, fps, 170)} />
      </g>
    ) : null}
    {li === 2 ? (
      <g>
        <Sky id="t2" top="#4F7FB0" bot="#D3E4F0" />
        <Mountains cap={ease(lf, 70, 50)} base={800} />
        <CloudShape x={520} y={250} s={0.9} frame={frame} />
        <g transform={`translate(${-30 * (1 - ease(lf, 5, 30))} 0)`}>
          {[200, 300].map((y) => (
            <Arrow key={y} x={70} y={y} len={110} rot={0} c={ICE} p={ease(lf, 5, 30)} />
          ))}
        </g>
        {[0, 1, 2].map((i) => (
          <Drop key={i} x={840 + (i - 1) * 40 - 40 * ease(lf, 45, 40)} y={320 - Math.abs(i - 1) * 46} r={22} o={ease(lf, 45, 20)} />
        ))}
        <Snowfall frame={frame} n={18} y0={320} y1={620} x0={300} x1={760} o={ease(lf, 80, 30)} />
      </g>
    ) : null}
  </Clip>
);

// ---------------------------------------------------------------- hồi 5
const Leaf: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK.line} strokeWidth={5} strokeLinejoin="round">
    <path d="M-200 40 Q-110 -130 70 -100 Q170 -80 210 -10 Q110 90 -40 90 Q-150 90 -200 40 Z" fill="#5F9E4C" />
    <path d="M-250 70 Q-60 10 210 -10 M-90 32 L-40 -70 M0 14 L70 -70 M-60 28 L0 80 M40 8 L110 46" fill="none" stroke="#3E7536" strokeLinecap="round" />
  </g>
);

const Realworld: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <Clip>
    {li === 0 ? (
      <g>
        <Sky id="r0" top="#A9C3D6" bot="#E6EFF3" />
        {["TUYẾT", "BĂNG GIÁ", "SƯƠNG MUỐI"].map((t, i) => {
          const x = 70 + i * 284;
          const cx = x + 132;
          return (
            <Pop key={t} p={pop(lf, fps, [0, 50, 80][i])} cx={cx} cy={460}>
              <rect x={x} y={190} width={264} height={540} rx={22} fill={["#6F97BE", "#B9CFDB", "#DDE8D2"][i]} stroke={INK.line} strokeWidth={6} />
              {i === 0 ? [[-70, 290, 34], [60, 340, 42], [-30, 450, 48], [70, 540, 34], [-70, 580, 40]].map(([dx, y, r]) => <Flake key={y} x={cx + dx} y={y + wave(frame, 0.06, 10, y)} r={r} rot={frame * 0.6 + y} />) : null}
              {i === 1 ? <BareTree x={cx} y={630} s={1.35} ice={1} /> : null}
              {i === 2 ? (
                <g>
                  <Leaf x={cx} y={460} s={0.52} />
                  {Array.from({ length: 22 }, (_, k) => (
                    <circle key={k} cx={cx - 85 + ((k * 41) % 170)} cy={432 + ((k * 23) % 56)} r={6} fill="#FFFFFF" stroke={INK.line} strokeWidth={1.5} />
                  ))}
                </g>
              ) : null}
              <text x={cx} y={704} textAnchor="middle" fontSize={32} fill={INK.line} {...T}>
                {t}
              </text>
            </Pop>
          );
        })}
      </g>
    ) : null}
    {li === 1 ? (
      <g>
        <Sky id="r1" top="#F4D9A8" bot="#CFE0D2" />
        <circle cx={770} cy={220} r={70} fill="#FFE27A" stroke={INK.line} strokeWidth={5} />
        <Leaf x={480} y={520} s={1.75} />
        {Array.from({ length: 26 }, (_, i) => {
          const k = pop(lf, fps, 40 + i * 4);
          const bx = 250 + ((i * 97) % 480);
          const by = 440 + ((i * 53) % 180);
          return k > 0.01 ? <Flake key={i} x={bx} y={by} r={(16 + (i % 3) * 5) * k} rot={i * 20} /> : null;
        })}
      </g>
    ) : null}
  </Clip>
);

// ---------------------------------------------------------------- hồi 6
const Cosmic: React.FC<Anim> = ({ li, lf, fps, frame }) => (
  <Clip>
    {li === 0
      ? (() => {
          const k = ease(lf, 30, 150);
          return (
            <g>
              <Sky id="c0" top="#3F6C9E" bot="#A9CBE4" />
              <g transform={`translate(0 ${-560 * k})`}>
                <CloudShape x={480} y={330} s={1.25} frame={frame} />
                <path d="M40 1300 L210 1120 L330 1220 L520 1060 L700 1210 L940 1150 L940 1330 L40 1330 Z" fill="#7F9DB0" stroke={INK.line} strokeWidth={5} />
                <path d="M40 1300 Q260 1270 480 1300 T940 1300 L940 1600 L40 1600 Z" fill="#FFFFFF" stroke={INK.line} strokeWidth={5} />
              </g>
              <Flake x={480 + wave(lf, 0.06, 46)} y={380 + 130 * k} r={90} rot={lf * 0.9} />
            </g>
          );
        })()
      : null}
    {li === 1 ? (
      <g>
        <Sky id="c1" top="#3F6C9E" bot="#C6DDEE" />
        <CloudShape x={450} y={240} s={0.8} frame={frame} />
        <Mountains cap={1} base={800} near="#DCE8EF" far="#A3BBCB" />
        {[700, 470, 250].map((y, i) => (
          <Pop key={y} p={pop(lf, fps, [10, 120, 140][i])} cx={130} cy={y}>
            <Thermo x={130} y={y + 50} h={110} v={0.15} color={COLD} s={0.9} />
          </Pop>
        ))}
        <Snowfall frame={frame} n={26} y0={250} y1={780} x0={200} x1={900} o={ease(lf, 130, 40)} />
        <Milo lf={lf} pose="wave" />
      </g>
    ) : null}
  </Clip>
);

const EP14: Record<string, React.FC<Anim>> = { hook: Hook, barrier: Barrier, eureka: Eureka, theorem: Theorem, realworld: Realworld, cosmic: Cosmic };

export const Ep14Scene: React.FC<Anim & { beatKind: string }> = ({ beatKind, ...a }) => {
  const Beat = EP14[beatKind] ?? Hook;
  return <Beat {...a} />;
};
