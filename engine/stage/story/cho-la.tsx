/**
 * Hình vẽ đạo cụ / phông của series "Ông Ơi, Chỗ Này Lạ Lắm!". Tên khai báo ở engine/lib/story/cho-la.ts.
 * Phong cách giống các phông khác: hoạt hình phẳng, viền đen dày; chi tiết quan trọng nằm trong y 300–1240.
 */
import type React from "react";
import { TEXT_FONT } from "../../components/brand.ts";
import type { PropChoLa, RoleChoLa, SceneChoLa } from "../../lib/story/cho-la.ts";
import { Floor, FLOOR, INK, type PropDef, Unmirror } from "../draw.tsx";
import type { Role } from "../face.tsx";

export const roles: Record<RoleChoLa, Role> = {};

// ---------------------------------------------------------------- đạo cụ

const SHIRT: Record<string, string> = { do: "#D9483B", xanh: "#3D7BD9", vang: "#F2B33D" };

/** Xe máy tay ga nhìn ngang, đầu xe bên phải, có người lái. */
const Scooter: React.FC<{ shirt: string }> = ({ shirt }) => (
  <g>
    {/* Bánh xe */}
    {[-150, 150].map((x) => (
      <g key={x}>
        <circle cx={x} cy="-62" r="62" fill="#1E1B2E" stroke={INK} strokeWidth="8" />
        <circle cx={x} cy="-62" r="24" fill="#C9CED6" stroke={INK} strokeWidth="6" />
      </g>
    ))}
    {/* Thân xe */}
    <path
      d="M-215 -110 Q-220 -190 -120 -200 L40 -200 Q70 -200 80 -170 L120 -110 Q160 -150 190 -250 L215 -250 Q200 -150 215 -110 Z"
      fill="#E9EEF2"
      stroke={INK}
      strokeWidth="9"
      strokeLinejoin="round"
    />
    <path d="M-180 -205 Q-120 -250 0 -235 L30 -205 Z" fill="#3A3A48" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {/* Tay lái, đèn */}
    <path d="M190 -250 L170 -300 L215 -300" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
    <circle cx="232" cy="-235" r="16" fill="#FFE27A" stroke={INK} strokeWidth="6" />
    {/* Người lái: chân, thân, tay, đầu đội mũ bảo hiểm */}
    <path d="M-40 -215 L20 -150 L70 -150" fill="none" stroke="#2E3A59" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M-70 -215 L-30 -360 L40 -360 L20 -215 Z" fill={shirt} stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M20 -340 L120 -300 L175 -300" fill="none" stroke={shirt} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 -340 L120 -300 L175 -300" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <circle cx="10" cy="-405" r="44" fill="#F4C9A0" stroke={INK} strokeWidth="7" />
    <path d="M-38 -405 Q-40 -468 12 -470 Q62 -468 60 -410 L-38 -405 Z" fill="#F2F2F2" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M22 -430 L62 -425 L58 -405 L22 -408 Z" fill="#8FD3F4" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
  </g>
);

/** Cột đèn giao thông, `lit` là đèn đang sáng. */
const TrafficLight: React.FC<{ lit: string }> = ({ lit }) => {
  const on = (k: string, color: string) => (lit === k ? color : "#3A3A48");
  return (
    <g>
      <rect x="-14" y="-560" width="28" height="560" fill="#5A5F6A" stroke={INK} strokeWidth="7" />
      <rect x="-56" y="-800" width="112" height="270" rx="22" fill="#2A2A33" stroke={INK} strokeWidth="9" />
      {[
        ["do", "#FF3B30", -745],
        ["vang", "#FFCC00", -665],
        ["xanh", "#34C759", -585],
      ].map(([k, color, y]) => (
        <g key={k as string}>
          {lit === k ? <circle cx="0" cy={y as number} r="46" fill={color as string} opacity="0.35" /> : null}
          <circle cx="0" cy={y as number} r="30" fill={on(k as string, color as string)} stroke={INK} strokeWidth="6" />
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
        <rect x="-10" y="-430" width="20" height="430" fill="#9AA0AA" stroke={INK} strokeWidth="6" />
        <circle cx="0" cy="-500" r="90" fill="#FFFFFF" stroke="#D9483B" strokeWidth="22" />
        <circle cx="0" cy="-500" r="101" fill="none" stroke={INK} strokeWidth="6" />
        <text x="0" y="-488" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={(text ?? "").length > 6 ? 34 : 46} fill={INK}>
          {text ?? ""}
        </text>
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Cây thông: tán tam giác xếp tầng. */
const Pine: React.FC<{ x: number; y: number; s?: number; tone?: string }> = ({ x, y, s = 1, tone = "#2F6B4F" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-10" y="-60" width="20" height="60" fill="#6B4A2E" stroke={INK} strokeWidth="5" />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M${-90 + i * 16} ${-50 - i * 70} L0 ${-170 - i * 70} L${90 - i * 16} ${-50 - i * 70} Z`}
        fill={tone}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
    ))}
  </g>
);

/** Biệt thự kiểu Pháp mái nhọn. */
const Villa: React.FC<{ x: number; y: number; s?: number; wall?: string; roof?: string }> = ({ x, y, s = 1, wall = "#F3E3C3", roof = "#B5523B" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-110" y="-200" width="220" height="200" fill={wall} stroke={INK} strokeWidth="7" />
    <path d="M-130 -195 L0 -330 L130 -195 Z" fill={roof} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <rect x="40" y="-300" width="30" height="70" fill="#8E8E99" stroke={INK} strokeWidth="5" />
    {[-60, 40].map((wx) => (
      <rect key={wx} x={wx} y="-160" width="36" height="50" fill="#A8DDF0" stroke={INK} strokeWidth="5" />
    ))}
    <rect x="-18" y="-90" width="40" height="90" fill="#7A4E2D" stroke={INK} strokeWidth="5" />
  </g>
);

const Fog: React.FC<{ y: number; opacity?: number }> = ({ y, opacity = 0.55 }) => (
  <g opacity={opacity}>
    {[80, 330, 600, 860].map((x, i) => (
      <ellipse key={x} cx={x} cy={y + (i % 2) * 30} rx="230" ry="46" fill="#FFFFFF" />
    ))}
  </g>
);

const Sky: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9CC7DC" />
        <stop offset="1" stopColor="#E3EEF2" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill={`url(#${id})`} />
  </>
);

/** Đường dốc leo lên đồi thông, biệt thự, sương mù; vỉa hè đá phía trước. */
const DaLatDoc: React.FC = () => (
  <>
    <Sky id="cl-doc-sky" />
    {/* Đồi xa */}
    <path d="M0 760 Q260 560 540 640 Q800 540 1080 620 L1080 1100 L0 1100 Z" fill="#7FA88A" stroke={INK} strokeWidth="6" />
    {[120, 260, 820, 960].map((x, i) => (
      <Pine key={x} x={x} y={700 + (i % 2) * 40} s={0.55} tone="#3E7A5C" />
    ))}
    <Fog y={650} opacity={0.5} />
    {/* Con dốc: dải đường leo từ dưới trái lên phải */}
    <path d="M-40 1240 L380 1240 L1120 640 L1120 520 Z" fill="#6E6E7A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M120 1200 L1080 590" stroke="#F2F2F2" strokeWidth="10" strokeDasharray="60 50" />
    <Villa x={300} y={940} s={0.8} />
    <Villa x={770} y={760} s={0.6} wall="#E9D7F0" roof="#6E4BA0" />
    <Pine x={70} y={1100} s={0.9} />
    <Pine x={960} y={1010} s={0.75} />
    <Fog y={980} opacity={0.35} />
    <Floor color="#A79C8C" line="#958A7A" />
  </>
);

/** Ngã tư nhỏ không đèn: nhà phố hai bên, hàng thông, vạch qua đường. */
const NgaTu: React.FC = () => (
  <>
    <Sky id="cl-ngatu-sky" />
    <path d="M0 820 Q300 700 540 760 Q800 690 1080 760 L1080 1000 L0 1000 Z" fill="#8DB79A" stroke={INK} strokeWidth="6" />
    {[160, 420, 690, 940].map((x) => (
      <Pine key={x} x={x} y={830} s={0.6} tone="#3E7A5C" />
    ))}
    <Fog y={760} opacity={0.4} />
    {/* Nhà phố hai bên */}
    <Villa x={140} y={1000} s={0.85} wall="#F7E7B5" roof="#C0603F" />
    <Villa x={940} y={1000} s={0.85} wall="#D8ECF2" roof="#4F7FA8" />
    {/* Mặt đường ngã tư và vạch qua đường */}
    <rect x="0" y="1000" width="1080" height={FLOOR - 1000} fill="#6E6E7A" stroke={INK} strokeWidth="6" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={300 + i * 62} y="1030" width="34" height="150" fill="#F2F2F2" opacity="0.9" />
    ))}
    <Floor color="#A79C8C" line="#958A7A" />
  </>
);

export const scenes: Record<SceneChoLa, React.FC> = {
  "cl-da-lat-doc": DaLatDoc,
  "cl-nga-tu": NgaTu,
};
