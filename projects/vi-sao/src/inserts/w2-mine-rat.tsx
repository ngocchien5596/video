/**
 * Cảnh chèn toàn khung cho tập "Vì sao thợ mỏ nuôi chuột dưới hầm lò?" (5 bước, mỗi bước một câu giải thích):
 *   0  Cận nóc lò: đá bị đè nứt dần, bụi rơi, chữ "lách tách… răng rắc…"
 *   1  Tai người 20.000 Hz, tai chuột 76.000 Hz: "GẦN GẤP 4"
 *   2  Đường lò: đàn chuột chạy ra phía cửa lò sáng, thợ mỏ bỏ cuốc chạy theo
 *   3  Chuột quanh quẩn kiếm ăn cạnh cặp lồng, thợ mỏ đào tiếp: "YÊN TÂM"
 *   4  Thợ mỏ và chuột: "Đời này qua đời khác", nhãn "BẠN CANH LÒ"
 * Khung 1080×1920; nội dung chính trong y 300–1300 (trên là thanh tiêu đề, dưới là phụ đề).
 * Nguồn: xem kịch bản tập 7 (tuan-2.ts).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";

const INK = "#2A1A10";
const RED = "#E5484D";
const GREEN = "#2F9E44";
const SEA = "#3D7BD9";
const GLOW = "#FFE7A3";
const PAPER = "#F6E7C8";
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);

/** Chữ to có viền, đọc rõ trên nền tối lẫn nền sáng. */
const Txt: React.FC<{ x: number; y: number; text: string; size: number; fill?: string; stroke?: string; opacity?: number; rotate?: number; anchor?: "start" | "middle" | "end" }> = ({
  x,
  y,
  text,
  size,
  fill = GLOW,
  stroke = INK,
  opacity = 1,
  rotate = 0,
  anchor = "middle",
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontFamily={TEXT_FONT}
    fontWeight="900"
    fontSize={size}
    fill={fill}
    stroke={stroke}
    strokeWidth={size * 0.14}
    strokeLinejoin="round"
    paintOrder="stroke"
    opacity={opacity}
    transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
  >
    {text}
  </text>
);

const Defs: React.FC = () => (
  <defs>
    <linearGradient id="ins-rock" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#2B241F" />
      <stop offset="1" stopColor="#4A3F35" />
    </linearGradient>
    <radialGradient id="ins-lamp" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#FFD27A" stopOpacity="0.75" />
      <stop offset="0.45" stopColor="#F5A945" stopOpacity="0.22" />
      <stop offset="1" stopColor="#F5A945" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="ins-exit" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#FFF6D6" />
      <stop offset="0.6" stopColor="#FFE2A0" stopOpacity="0.7" />
      <stop offset="1" stopColor="#FFE2A0" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="ins-wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#A9743F" />
      <stop offset="1" stopColor="#6E4524" />
    </linearGradient>
    <radialGradient id="ins-fur" cx="0.4" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#A89A8E" />
      <stop offset="1" stopColor="#6F6258" />
    </radialGradient>
    <radialGradient id="ins-vig" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0.6" stopColor="#000" stopOpacity="0" />
      <stop offset="1" stopColor="#000" stopOpacity="0.45" />
    </radialGradient>
  </defs>
);

/** Chuột nhìn sang phải (flip: sang trái); run 0..1 nhịp chân; ear độ vểnh tai. */
const Rat: React.FC<{ x: number; y: number; s?: number; flip?: boolean; run?: number; ear?: number; nibble?: number }> = ({ x, y, s = 1, flip, run, ear = 1, nibble = 0 }) => {
  const leg = run === undefined ? 0 : Math.sin(run * Math.PI * 2) * 10;
  const bob = run === undefined ? 0 : Math.abs(Math.sin(run * Math.PI * 2)) * -4;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${flip ? -s : s} ${s})`} stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="0" cy="4" rx="58" ry="8" fill="#000" opacity="0.25" stroke="none" />
      <path d="M-52 -14 Q-96 -10 -120 -40 Q-128 -52 -118 -54" fill="none" strokeWidth="6" stroke="#C99A92" />
      <path d="M-52 -14 Q-96 -10 -120 -40" fill="none" strokeWidth="2" stroke={INK} opacity="0.5" />
      <line x1={-26 + leg} y1="-8" x2={-30 + leg} y2="4" strokeWidth="6" />
      <line x1={22 - leg} y1="-8" x2={26 - leg} y2="4" strokeWidth="6" />
      <path d="M-58 -10 Q-60 -54 -8 -56 Q34 -56 48 -32 L70 -20 Q52 -4 24 -6 L-48 -6 Z" fill="url(#ins-fur)" />
      <path d="M-40 -14 Q-10 -6 20 -10" fill="none" stroke={INK} strokeWidth="2" opacity="0.4" />
      <g transform={`rotate(${nibble * 6} 50 -30)`}>
        <ellipse cx="22" cy="-56" rx={15 * ear} ry={18 * ear} fill="#E9B8B0" />
        <ellipse cx="22" cy="-55" rx={8 * ear} ry={11 * ear} fill="#D48F86" stroke="none" />
        <circle cx="44" cy="-34" r="5" fill={INK} stroke="none" />
        <circle cx="46" cy="-36" r="1.6" fill="#fff" stroke="none" />
        <circle cx="70" cy="-20" r="5" fill="#E9B8B0" />
        {[-8, 0, 8].map((d) => (
          <line key={d} x1="64" y1={-20} x2="94" y2={-22 + d} strokeWidth="1.6" />
        ))}
      </g>
    </g>
  );
};

/** Thợ mỏ: mũ vàng có đèn, áo bảo hộ xanh xám, ủng; run 0..1 nhịp chạy. */
const Miner: React.FC<{ x: number; y: number; s?: number; run?: number; flip?: boolean; dig?: number }> = ({ x, y, s = 1, run, flip, dig }) => {
  const k = run === undefined ? 0 : Math.sin(run * Math.PI * 2) * 22;
  const lean = run === undefined ? 0 : 8;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="0" cy="4" rx="50" ry="9" fill="#000" opacity="0.25" stroke="none" />
      <g transform={`rotate(${lean} 0 -60)`}>
        <path d={`M-10 -70 L${-18 - k} -8 L${-30 - k} -2 L${-8 - k} 0 Z`} fill="#3E4A55" />
        <path d={`M10 -70 L${18 + k} -8 L${6 + k} 0 L${30 + k} -2 Z`} fill="#3E4A55" />
        <rect x="-26" y="-150" width="52" height="86" rx="14" fill="#5C7184" />
        <rect x="-26" y="-108" width="52" height="10" fill="#E8D36A" opacity="0.9" />
        {dig === undefined ? (
          <path d={`M14 -138 Q${40 + k * 0.6} -110 ${34 + k} ${run === undefined ? -82 : -120}`} fill="none" strokeWidth="11" stroke="#5C7184" />
        ) : (
          <g transform={`rotate(${dig} 14 -130)`}>
            <path d="M14 -138 L60 -170" fill="none" strokeWidth="11" stroke="#5C7184" />
            <line x1="56" y1="-166" x2="90" y2="-220" strokeWidth="7" stroke="#7A5230" />
            <path d="M66 -238 Q92 -228 112 -200 Q90 -214 72 -218 Z" fill="#9AA3AB" />
          </g>
        )}
        <path d={`M-14 -138 Q${-40 - k * 0.6} -110 ${-34 - k} ${run === undefined ? -82 : -100}`} fill="none" strokeWidth="11" stroke="#5C7184" />
        <circle cx="0" cy="-178" r="30" fill="#F2C9A0" />
        <circle cx="10" cy="-182" r="3.5" fill={INK} stroke="none" />
        <path d="M4 -164 Q12 -160 18 -166" fill="none" strokeWidth="3" />
        <path d="M-6 -170 Q-2 -158 8 -160" fill="none" strokeWidth="2" opacity="0.4" />
        <path d="M-36 -186 Q-34 -224 0 -224 Q34 -224 36 -186 Z" fill="#FFC83D" />
        <rect x="-40" y="-190" width="80" height="10" rx="5" fill="#E9A92A" />
        <circle cx="30" cy="-204" r="9" fill="#FFF6D6" />
      </g>
    </g>
  );
};

/** Vì chống gỗ nhìn ngang (một cột). */
const Post: React.FC<{ x: number; top: number; bottom: number; w?: number }> = ({ x, top, bottom, w = 46 }) => (
  <rect x={x - w / 2} y={top} width={w} height={bottom - top} fill="url(#ins-wood)" stroke={INK} strokeWidth="6" />
);

const Lamp: React.FC<{ x: number; y: number; s?: number; flicker?: number }> = ({ x, y, s = 1, flicker = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={260 * flicker} fill="url(#ins-lamp)" />
    <line x1="0" y1="-80" x2="0" y2="-26" stroke={INK} strokeWidth="5" />
    <path d="M-20 -26 L20 -26 L26 22 L-26 22 Z" fill={GLOW} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="-30" y="20" width="60" height="14" rx="5" fill="#4A4038" stroke={INK} strokeWidth="5" />
    <circle cy="-2" r="11" fill="#FFF6D6" />
  </g>
);

// ---------------------------------------------------------------- bước 0: cận nóc lò nứt
const Roof: React.FC<{ stepFrame: number; frame: number }> = ({ stepFrame, frame }) => {
  const crack = ease(stepFrame / 60);
  const ring = (frame % 24) / 24;
  const pebbles = [180, 420, 610, 860];
  return (
    <g>
      <rect width="1080" height="1920" fill="url(#ins-rock)" />
      {/* Nóc lò đá nhìn từ dưới lên, xà gỗ đỡ ngang */}
      <path d="M0 260 L1080 260 L1080 760 Q820 820 540 790 Q260 820 0 760 Z" fill="#5E544B" stroke={INK} strokeWidth="8" />
      {[[120, 420, 90], [400, 380, 120], [700, 450, 100], [930, 400, 80], [260, 620, 110], [820, 640, 90]].map(([x, y, r], i) => (
        <path key={i} d={`M${x - r} ${y} q${r * 0.5} ${-r * 0.4} ${r} ${-r * 0.1} q${r * 0.6} ${r * 0.2} ${r} ${r * 0.4} q${-r * 0.8} ${r * 0.4} ${-r * 2} ${-r * 0.3} z`} fill="#6D6258" stroke="#3A322B" strokeWidth="5" />
      ))}
      <path
        d="M330 300 L380 400 L340 470 L420 560 L390 650 L450 760 M380 400 L470 430 M720 290 L680 380 L750 470 L700 560 L760 690 M750 470 L840 500"
        fill="none"
        stroke="#120D0A"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1400"
        strokeDashoffset={1400 * (1 - crack)}
      />
      <rect x="-20" y="780" width="1120" height="70" fill="url(#ins-wood)" stroke={INK} strokeWidth="8" />
      <Post x={90} top={850} bottom={1920} w={70} />
      <Post x={990} top={850} bottom={1920} w={70} />
      <Lamp x={250} y={930} s={1.2} flicker={1 + 0.03 * Math.sin(frame / 3)} />
      {/* Bụi đá lả tả rơi */}
      {pebbles.map((x, i) => {
        const fall = ((stepFrame * 6 + i * 120) % 700) * crack;
        return <circle key={x} cx={x + 20 * Math.sin(i + fall / 80)} cy={800 + fall} r={6 + (i % 2) * 4} fill="#8A7E72" opacity={crack} />;
      })}
      {/* Sóng tiếng nứt toả xuống */}
      {[0, 1, 2].map((i) => {
        const p = (ring + i / 3) % 1;
        return <path key={i} d={`M${540 - 160 - p * 260} ${860 + p * 200} Q540 ${960 + p * 280} ${540 + 160 + p * 260} ${860 + p * 200}`} fill="none" stroke="#9CC9FF" strokeWidth="8" opacity={(1 - p) * crack} />;
      })}
      <Txt x={540} y={1110} text="lách tách…" size={110} opacity={ease((stepFrame - 15) / 10)} rotate={-4} />
      <Txt x={560} y={1250} text="răng rắc…" size={110} opacity={ease((stepFrame - 40) / 10)} rotate={3} />
      <rect width="1080" height="1920" fill="url(#ins-vig)" />
    </g>
  );
};

// ---------------------------------------------------------------- bước 1: tai người và tai chuột
const Ears: React.FC<{ stepFrame: number; frame: number }> = ({ stepFrame, frame }) => {
  const g1 = ease(stepFrame / 30);
  const g2 = ease((stepFrame - 25) / 50);
  const W = 860;
  return (
    <g>
      <rect width="1080" height="1920" fill={PAPER} />
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1="0" y1={80 * i} x2="1080" y2={80 * i + 40} stroke="#E8D3A8" strokeWidth="3" />
      ))}
      <rect x="0" y="1290" width="1080" height="630" fill="#3A2A1E" />
      <rect x="0" y="1284" width="1080" height="12" fill="#8A5530" />
      {/* Người */}
      <g transform="translate(150 560)">
        <circle r="110" fill="#F2C9A0" stroke={INK} strokeWidth="7" />
        <path d="M-90 -40 Q-80 -120 10 -118 Q90 -112 100 -40 Q60 -80 0 -76 Q-60 -78 -90 -40 Z" fill="#2B2B2B" stroke={INK} strokeWidth="6" />
        <ellipse cx="100" cy="10" rx="26" ry="40" fill="#F0B98D" stroke={INK} strokeWidth="6" />
        <circle cx="30" cy="0" r="9" fill={INK} />
      </g>
      <Txt x={300} y={470} text="Tai người" size={64} fill={INK} stroke={PAPER} anchor="start" />
      <rect x={110} y={700} width={W * (20 / 76) * g1} height={110} rx={24} fill={SEA} stroke={INK} strokeWidth="7" />
      <Txt x={140 + W * (20 / 76) * g1} y={782} text="20.000 Hz" size={72} fill={INK} stroke={PAPER} anchor="start" opacity={g1} />
      {/* Chuột */}
      <Rat x={240} y={1100} s={2.2} ear={1 + 0.12 * Math.abs(Math.sin(frame / 6))} />
      <Txt x={460} y={980} text="Tai chuột" size={64} fill={INK} stroke={PAPER} anchor="start" />
      <rect x={110} y={1150} width={W * g2} height={110} rx={24} fill={RED} stroke={INK} strokeWidth="7" />
      <Txt x={90 + W * g2} y={1232} text="76.000 Hz" size={72} fill="#FFFFFF" stroke={INK} anchor="end" opacity={clamp01(g2 * 2 - 1)} />
      <g opacity={ease((stepFrame - 80) / 10)} transform="rotate(-5 760 600)">
        <rect x={560} y={540} width={420} height={120} rx={60} fill="#FFFFFF" stroke={RED} strokeWidth="9" />
        <Txt x={770} y={625} text="GẦN GẤP 4" size={70} fill={RED} stroke="#FFFFFF" />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- bước 2: chuột chạy ra, thợ mỏ chạy theo
const Run: React.FC<{ stepFrame: number; frame: number }> = ({ stepFrame, frame }) => {
  const floor = 1230;
  const scroll = (stepFrame * 9) % 360;
  return (
    <g>
      <rect width="1080" height="1920" fill="url(#ins-rock)" />
      {/* Cửa lò sáng bên phải */}
      <ellipse cx="1080" cy="900" rx="420" ry="520" fill="url(#ins-exit)" />
      <path d="M0 520 Q540 470 1080 520 L1080 600 Q540 560 0 600 Z" fill="#1E1A17" opacity="0.8" />
      {/* Vì chống lướt qua, tạo cảm giác chạy */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = ((i * 360 - scroll) % 1800) - 180;
        return (
          <g key={i}>
            <rect x={x - 20} y={600} width={480} height={46} fill="url(#ins-wood)" stroke={INK} strokeWidth="6" />
            <Post x={x} top={640} bottom={floor} />
          </g>
        );
      })}
      <rect x="0" y={floor} width="1080" height={1920 - floor} fill="#3C3229" />
      {[0, 1].map((r) => (
        <line key={r} x1="0" y1={floor + 30 + r * 60} x2="1080" y2={floor + 30 + r * 60} stroke="#9A948C" strokeWidth="10" />
      ))}
      {/* Đàn chuột */}
      {[0, 1, 2, 3].map((i) => (
        <Rat key={i} x={470 + i * 150 + ((stepFrame * 3) % 40)} y={floor - 4 - (i % 2) * 6} s={1.5 - i * 0.05} run={(stepFrame / 7 + i * 0.27) % 1} />
      ))}
      {/* Thợ mỏ chạy theo, cái cuốc rơi lại phía sau */}
      <g transform={`rotate(${Math.min(80, stepFrame * 3)} 120 ${floor})`}>
        <line x1="60" y1={floor - 10} x2="190" y2={floor - 120} stroke="#7A5230" strokeWidth="12" strokeLinecap="round" />
      </g>
      <Miner x={300 + Math.min(stepFrame * 1.5, 80)} y={floor} s={2.1} run={(stepFrame / 9) % 1} />
      <Lamp x={760} y={720} s={0.9} flicker={1 + 0.04 * Math.sin(frame / 3)} />
      <Txt x={540} y={470} text="Chuột chạy ra…" size={92} opacity={ease(stepFrame / 10)} />
      <Txt x={540} y={580} text="thợ mỏ chạy theo!" size={92} fill="#FFFFFF" opacity={ease((stepFrame - 30) / 10)} />
      <rect width="1080" height="1920" fill="url(#ins-vig)" />
    </g>
  );
};

// ---------------------------------------------------------------- bước 3: chuột còn quanh quẩn, yên tâm đào tiếp
const Safe: React.FC<{ stepFrame: number; frame: number }> = ({ stepFrame, frame }) => {
  const floor = 1240;
  const dig = -10 + 18 * Math.max(0, Math.sin(frame / 6));
  return (
    <g>
      <rect width="1080" height="1920" fill="url(#ins-rock)" />
      {/* Vách than bên trái */}
      <path d={`M0 300 L300 330 Q360 600 320 900 Q380 1100 340 ${floor} L0 ${floor} Z`} fill="#1C1815" stroke={INK} strokeWidth="8" />
      {[[80, 520], [200, 700], [120, 960], [240, 1100]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l40 -24 l50 14 l-14 36 l-56 10 Z`} fill="#2E2823" stroke="#0E0B09" strokeWidth="5" />
      ))}
      <rect x="-20" y="560" width="1120" height="50" fill="url(#ins-wood)" stroke={INK} strokeWidth="6" />
      <Post x={1000} top={600} bottom={floor} />
      <Lamp x={700} y={680} s={1.1} flicker={1 + 0.03 * Math.sin(frame / 4)} />
      <rect x="0" y={floor} width="1080" height={1920 - floor} fill="#3C3229" />
      <Miner x={470} y={floor} s={2.1} flip dig={dig} />
      {/* Cặp lồng và vụn đồ ăn, chuột kiếm ăn */}
      <g transform={`translate(800 ${floor})`}>
        <ellipse cx="0" cy="4" rx="70" ry="10" fill="#000" opacity="0.25" />
        <rect x="-56" y="-120" width="112" height="120" rx="14" fill="#B9C2C9" stroke={INK} strokeWidth="6" />
        <line x1="-56" y1="-80" x2="56" y2="-80" stroke={INK} strokeWidth="5" />
        <line x1="-56" y1="-40" x2="56" y2="-40" stroke={INK} strokeWidth="5" />
        <path d="M-40 -120 Q0 -170 40 -120" fill="none" stroke={INK} strokeWidth="7" />
      </g>
      {[[640, 6], [700, 4], [930, 5]].map(([x, r], i) => (
        <circle key={i} cx={x} cy={floor - 4} r={r} fill="#F2E6C9" stroke={INK} strokeWidth="2" />
      ))}
      <Rat x={640} y={floor - 2} s={1.6} flip nibble={Math.abs(Math.sin(frame / 4))} />
      <Rat x={960} y={floor - 2} s={1.4} nibble={Math.abs(Math.sin(frame / 5 + 1))} />
      <Txt x={540} y={470} text="Chuột còn quanh quẩn" size={80} opacity={ease(stepFrame / 10)} />
      <g opacity={ease((stepFrame - 20) / 10)} transform="rotate(-4 540 550)">
        <rect x={290} y={480} width={500} height={130} rx={65} fill="#FFFFFF" stroke={GREEN} strokeWidth="10" />
        <Txt x={540} y={572} text="YÊN TÂM" size={86} fill={GREEN} stroke="#FFFFFF" />
      </g>
      <rect width="1080" height="1920" fill="url(#ins-vig)" />
    </g>
  );
};

// ---------------------------------------------------------------- bước 4: đời này qua đời khác, chuột là bạn canh lò
const Lore: React.FC<{ stepFrame: number; frame: number }> = ({ stepFrame, frame }) => {
  const pop = ease((stepFrame - 35) / 8);
  const sc = pop < 1 ? 1.5 - 0.5 * pop : 1;
  return (
    <g>
      <rect width="1080" height="1920" fill={PAPER} />
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1="0" y1={80 * i} x2="1080" y2={80 * i + 40} stroke="#E8D3A8" strokeWidth="3" />
      ))}
      <rect x="0" y="1290" width="1080" height="630" fill="#3A2A1E" />
      <rect x="0" y="1284" width="1080" height="12" fill="#8A5530" />
      <circle cx="540" cy="850" r="260" fill="#EBD3A4" stroke={INK} strokeWidth="6" />
      <line x1="310" y1="1010" x2="790" y2="1010" stroke={INK} strokeWidth="6" />
      <Miner x={440} y={1010} s={1.75} />
      <Rat x={670} y={1008} s={1.7} flip ear={1 + 0.1 * Math.abs(Math.sin(frame / 7))} />
      <Txt x={540} y={500} text="Đời này" size={96} fill={INK} stroke={PAPER} opacity={ease(stepFrame / 10)} />
      <Txt x={540} y={605} text="qua đời khác" size={96} fill={INK} stroke={PAPER} opacity={ease((stepFrame - 12) / 10)} />
      <g opacity={pop} transform={`rotate(-4 540 1150) translate(540 1150) scale(${sc}) translate(-540 -1150)`}>
        <rect x={240} y={1085} width={600} height={130} rx={65} fill="#FFFFFF" stroke={GREEN} strokeWidth="10" />
        <Txt x={540} y={1177} text="BẠN CANH LÒ" size={80} fill={GREEN} stroke="#FFFFFF" />
      </g>
    </g>
  );
};

export const W2MineRatInsert: React.FC<BoardProps> = ({ step, stepFrame, frame }) => (
  <g>
    <Defs />
    {step === 0 ? <Roof stepFrame={stepFrame} frame={frame} /> : null}
    {step === 1 ? <Ears stepFrame={stepFrame} frame={frame} /> : null}
    {step === 2 ? <Run stepFrame={stepFrame} frame={frame} /> : null}
    {step === 3 ? <Safe stepFrame={stepFrame} frame={frame} /> : null}
    {step === 4 ? <Lore stepFrame={stepFrame} frame={frame} /> : null}
  </g>
);
