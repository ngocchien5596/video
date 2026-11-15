/**
 * Hình vẽ đạo cụ / phông của series "Ông Ơi, Chỗ Này Lạ Lắm!". Tên khai báo ở engine/lib/story/cho-la.ts.
 * Phong cách chung (engine/stage/village.tsx): viền nâu đậm, đổ bóng mềm, bảng màu ấm; chi tiết quan trọng nằm trong y 300–1240.
 */
import type React from "react";
import { TEXT_FONT } from "../../components/brand.ts";
import type { PropChoLa, RoleChoLa, SceneChoLa } from "../../lib/story/cho-la.ts";
import { Floor, FLOOR, LINE as INK, type PropDef, Unmirror } from "../draw.tsx";
import type { Role } from "../face.tsx";
import { Cloud, SoftShadow, WarmSky } from "../village.tsx";

export const roles: Record<RoleChoLa, Role> = {};

// ---------------------------------------------------------------- đạo cụ

const SHIRT: Record<string, string> = { do: "#C8503C", xanh: "#4F7FA8", vang: "#E3A631" };

/** Xe máy tay ga nhìn ngang (thân kem kiểu cổ), đầu xe bên phải, có người lái đội mũ bảo hiểm. */
const Scooter: React.FC<{ shirt: string }> = ({ shirt }) => (
  <g>
    <SoftShadow cy={-2} rx={250} ry={26} />
    {/* Bánh xe */}
    {[-150, 150].map((x) => (
      <g key={x}>
        <circle cx={x} cy="-62" r="62" fill="url(#w-dark)" stroke={INK} strokeWidth="8" />
        <circle cx={x} cy="-62" r="28" fill="url(#w-metal)" stroke={INK} strokeWidth="6" />
        <circle cx={x} cy="-62" r="8" fill="#5A5550" />
      </g>
    ))}
    {/* Chắn bùn trước */}
    <path d="M100 -100 Q150 -150 210 -110" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
    <path d="M100 -100 Q150 -150 210 -110" fill="none" stroke="#EFE3C8" strokeWidth="12" strokeLinecap="round" />
    {/* Thân xe */}
    <path
      d="M-215 -110 Q-226 -196 -120 -204 L40 -204 Q70 -204 80 -170 L120 -110 Q160 -150 190 -250 L215 -250 Q200 -150 215 -110 Z"
      fill="url(#w-glaze)"
      stroke={INK}
      strokeWidth="9"
      strokeLinejoin="round"
    />
    <path d="M-200 -128 Q-180 -112 100 -118" fill="none" stroke="#C9B48E" strokeWidth="6" strokeLinecap="round" />
    <path d="M-196 -170 Q-180 -192 -120 -194" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
    <path d="M-180 -207 Q-120 -252 0 -238 L30 -207 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {/* Tay lái, gương, đèn */}
    <path d="M190 -250 L170 -300 L215 -300" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
    <line x1="182" y1="-300" x2="170" y2="-340" stroke={INK} strokeWidth="5" />
    <ellipse cx="168" cy="-346" rx="12" ry="8" fill="url(#w-metal)" stroke={INK} strokeWidth="4" />
    <circle cx="232" cy="-235" r="18" fill="#FFE9A8" stroke={INK} strokeWidth="6" />
    <circle cx="228" cy="-240" r="6" fill="#FFFFFF" />
    {/* Người lái: chân, thân, tay, đầu đội mũ bảo hiểm */}
    <path d="M-40 -215 L20 -150 L70 -150" fill="none" stroke={INK} strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-40 -215 L20 -150 L70 -150" fill="none" stroke="#4A3A2E" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-72 -215 L-32 -362 L42 -362 L22 -215 Z" fill={shirt} stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M-60 -230 L-28 -350" stroke="#FFFFFF" strokeWidth="6" opacity="0.25" strokeLinecap="round" />
    <path d="M20 -340 L120 -300 L175 -300" fill="none" stroke={INK} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 -340 L120 -300 L175 -300" fill="none" stroke={shirt} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="178" cy="-300" r="12" fill="#F2C9A0" stroke={INK} strokeWidth="5" />
    <circle cx="10" cy="-405" r="44" fill="#F2C9A0" stroke={INK} strokeWidth="7" />
    <path d="M-40 -402 Q-42 -470 12 -472 Q64 -470 62 -408 L-40 -402 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M-30 -430 Q-20 -460 10 -462" fill="none" stroke="#FFF0B8" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <path d="M22 -432 L64 -426 L60 -404 L22 -408 Z" fill="#BFD8D0" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M-36 -404 L-24 -372" stroke={INK} strokeWidth="4" />
  </g>
);

/** Cột đèn giao thông, `lit` là đèn đang sáng. */
const TrafficLight: React.FC<{ lit: string }> = ({ lit }) => {
  const lights: [string, string, number][] = [
    ["do", "#E8503A", -745],
    ["vang", "#F2B93A", -665],
    ["xanh", "#5BB86A", -585],
  ];
  return (
    <g>
      <SoftShadow cy={-2} rx={70} />
      <rect x="-30" y="-24" width="60" height="24" rx="6" fill="#6B655C" stroke={INK} strokeWidth="6" />
      <rect x="-14" y="-560" width="28" height="540" fill="url(#w-metal)" stroke={INK} strokeWidth="7" />
      <rect x="-14" y="-260" width="28" height="22" fill="#E3A631" stroke={INK} strokeWidth="4" />
      <rect x="-60" y="-806" width="120" height="282" rx="24" fill="url(#w-dark)" stroke={INK} strokeWidth="9" />
      {lights.map(([k, color, y]) => (
        <g key={k}>
          <path d={`M-40 ${y - 30} Q0 ${y - 52} 40 ${y - 30}`} fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
          {lit === k ? <circle cx="0" cy={y} r="56" fill={color} opacity="0.35" /> : null}
          <circle cx="0" cy={y} r="30" fill={lit === k ? color : "#4A4440"} stroke={INK} strokeWidth="6" />
          {lit === k ? <circle cx="-9" cy={y - 9} r="8" fill="#FFFFFF" opacity="0.7" /> : null}
        </g>
      ))}
    </g>
  );
};

export const props: Record<PropChoLa, PropDef> = {
  "cl-xe-may": {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <Scooter shirt={SHIRT[text ?? ""] ?? SHIRT.xanh} />
      </Unmirror>
    ),
  },
  "cl-den-giao-thong": {
    mode: "upright",
    draw: ({ text }) => <TrafficLight lit={text ?? "tat"} />,
  },
  "cl-bien-bao": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <SoftShadow cy={-2} rx={50} />
        <rect x="-10" y="-430" width="20" height="430" fill="url(#w-metal)" stroke={INK} strokeWidth="6" />
        <circle cx="0" cy="-500" r="90" fill="#FBF3E2" stroke="#C8503C" strokeWidth="22" />
        <circle cx="0" cy="-500" r="101" fill="none" stroke={INK} strokeWidth="6" />
        <text x="0" y="-488" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={(text ?? "").length > 6 ? 34 : 46} fill={INK}>
          {text ?? ""}
        </text>
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Cây thông: tán tam giác xếp tầng, mặt sáng bên trái. */
const Pine: React.FC<{ x: number; y: number; s?: number; tone?: string; far?: boolean }> = ({ x, y, s = 1, tone = "#4E7A55", far }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-10" y="-60" width="20" height="60" fill="url(#w-wood-h)" stroke={far ? "#7A6A50" : INK} strokeWidth="5" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <path
          d={`M${-90 + i * 16} ${-50 - i * 70} Q${-40 + i * 8} ${-70 - i * 70} 0 ${-170 - i * 70} Q${40 - i * 8} ${-70 - i * 70} ${90 - i * 16} ${-50 - i * 70} Q0 ${-36 - i * 70} ${-90 + i * 16} ${-50 - i * 70} Z`}
          fill={tone}
          stroke={far ? "#6E7A5A" : INK}
          strokeWidth={far ? 4 : 6}
          strokeLinejoin="round"
        />
        <path d={`M${-70 + i * 14} ${-56 - i * 70} Q${-30 + i * 6} ${-80 - i * 70} -6 ${-150 - i * 70}`} fill="none" stroke="#FFFFFF" strokeWidth="6" opacity="0.18" strokeLinecap="round" />
      </g>
    ))}
  </g>
);

/** Biệt thự kiểu Pháp mái ngói nhọn, cửa chớp xanh. */
const Villa: React.FC<{ x: number; y: number; s?: number; wall?: string; roof?: string }> = ({ x, y, s = 1, wall = "#F3E3C3" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-110" y="-200" width="220" height="200" fill={wall} stroke={INK} strokeWidth="7" />
    <rect x="40" y="-196" width="66" height="192" fill="#3A2416" opacity="0.08" />
    <path d="M-130 -195 L0 -330 L130 -195 Z" fill="url(#w-tile)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    {[-290, -260, -230].map((yy) => {
      const half = ((yy + 330) / 135) * 130;
      return <line key={yy} x1={-half + 6} y1={yy} x2={half - 6} y2={yy} stroke="#7E3324" strokeWidth="3" opacity="0.6" />;
    })}
    <rect x="40" y="-300" width="30" height="70" fill="#B9AD98" stroke={INK} strokeWidth="5" />
    {[-60, 40].map((wx) => (
      <g key={wx}>
        <rect x={wx} y="-160" width="36" height="50" fill="#5E7F7A" stroke={INK} strokeWidth="5" />
        <rect x={wx - 12} y="-160" width="12" height="50" fill="#6E9446" stroke={INK} strokeWidth="3" />
        <rect x={wx + 36} y="-160" width="12" height="50" fill="#6E9446" stroke={INK} strokeWidth="3" />
      </g>
    ))}
    <rect x="-18" y="-90" width="40" height="90" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
    <rect x="-118" y="-8" width="236" height="8" fill="#B9AD98" />
  </g>
);

const Fog: React.FC<{ y: number; opacity?: number }> = ({ y, opacity = 0.55 }) => (
  <g opacity={opacity}>
    {[80, 330, 600, 860].map((x, i) => (
      <ellipse key={x} cx={x} cy={y + (i % 2) * 30} rx="230" ry="46" fill="#FFF8EA" />
    ))}
  </g>
);

/** Vỉa hè lát đá phía trước. */
const Sidewalk: React.FC = () => (
  <>
    <Floor color="#BCAA8C" line="#A6957A" />
    <rect x="0" y={FLOOR + 4} width="1080" height="16" fill="#D9C7A6" opacity="0.7" />
  </>
);

/** Đường dốc leo lên đồi thông, biệt thự, sương mù; vỉa hè đá phía trước. */
const DaLatDoc: React.FC = () => (
  <>
    <WarmSky id="cl-doc-sky" h={FLOOR} top="#E9CFA0" bottom="#F7EBD2" sun={[860, 300]} />
    <Cloud x={260} y={330} s={0.8} />
    {/* Đồi xa */}
    <path d="M0 760 Q260 560 540 640 Q800 540 1080 620 L1080 1100 L0 1100 Z" fill="#A9B98E" stroke="#8A8A66" strokeWidth="4" />
    {[120, 260, 820, 960].map((x, i) => (
      <Pine key={x} x={x} y={700 + (i % 2) * 40} s={0.55} tone="#8EA678" far />
    ))}
    <Fog y={650} opacity={0.5} />
    {/* Con dốc: dải đường leo từ dưới trái lên phải */}
    <path d="M-40 1240 L380 1240 L1120 640 L1120 520 Z" fill="#8C8478" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M-40 1240 L80 1240 L1120 560 L1120 520 Z" fill="#A39A8C" />
    <path d="M120 1200 L1080 590" stroke="#F4E9D2" strokeWidth="10" strokeDasharray="60 50" />
    <Villa x={300} y={940} s={0.8} />
    <Villa x={770} y={760} s={0.6} wall="#EBD9B8" />
    <Pine x={70} y={1100} s={0.9} />
    <Pine x={960} y={1010} s={0.75} />
    <Fog y={980} opacity={0.3} />
    <Sidewalk />
  </>
);

/** Ngã tư nhỏ không đèn: nhà phố hai bên, hàng thông, vạch qua đường. */
const NgaTu: React.FC = () => (
  <>
    <WarmSky id="cl-ngatu-sky" h={FLOOR} top="#E9CFA0" bottom="#F7EBD2" sun={[540, 420]} />
    <Cloud x={820} y={300} s={0.7} />
    <path d="M0 820 Q300 700 540 760 Q800 690 1080 760 L1080 1000 L0 1000 Z" fill="#A9B98E" stroke="#8A8A66" strokeWidth="4" />
    {[160, 420, 690, 940].map((x) => (
      <Pine key={x} x={x} y={830} s={0.6} tone="#7E9C6E" far />
    ))}
    <Fog y={760} opacity={0.4} />
    {/* Nhà phố hai bên */}
    <Villa x={140} y={1000} s={0.85} wall="#F3DFB0" />
    <Villa x={940} y={1000} s={0.85} wall="#E8DCC4" />
    {/* Mặt đường ngã tư và vạch qua đường */}
    <rect x="0" y="1000" width="1080" height={FLOOR - 1000} fill="#8C8478" stroke={INK} strokeWidth="6" />
    <rect x="0" y="1000" width="1080" height="40" fill="#A39A8C" opacity="0.7" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={300 + i * 62} y="1030" width="34" height="150" rx="3" fill="#F4E9D2" opacity="0.9" />
    ))}
    <Sidewalk />
  </>
);

export const scenes: Record<SceneChoLa, React.FC> = {
  "cl-da-lat-doc": DaLatDoc,
  "cl-nga-tu": NgaTu,
};
