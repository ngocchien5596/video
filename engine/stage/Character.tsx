import React from "react";
import type { Expr, PropRef, RoleId } from "../lib/stage-types.ts";
import { COLORS } from "../components/brand.ts";
import { Brows, Eyes, type FaceGeo, type Look, Mouth, type Role } from "./face.tsx";
import { STORY_ROLES } from "./story/index.ts";
import type { ArmAngles } from "./poses.ts";
import { PROPS } from "./props.tsx";
import { propId, propText } from "./track.ts";

/**
 * Con rối Cụ Đồ và Thằng Cháu, vẽ theo bản thiết kế nhân vật chính thức (projects/CD_TC.png):
 * phong cách vector ấm kiểu tranh dân gian hiện đại, viền nâu đậm rõ, đổ bóng mềm bằng gradient.
 * - Cụ Đồ: cụ già gầy, hơi khom; khăn đóng nâu sẫm, tóc bạc hai bên, kính tròn gọng mảnh, lông mày bạc rậm,
 *   râu trắng dài nhọn tới ngực, má hồng; áo dài the nâu quá gối, tay áo rộng; quần trắng ống rộng; giày vải đen.
 * - Thằng Cháu: cậu bé ~7 tuổi, thấp hơn hẳn ông, đầu to; tóc đen bù xù nhiều chỏm, mắt to tròn đen, má hồng;
 *   áo cánh vàng nghệ cổ đứng cài cúc tàu; quần soóc nâu; dép quai.
 * Khung xương (vai, hông, độ dài tay chân) giữ nguyên như cũ để đạo cụ cầm tay và các vai truyện vẫn khớp.
 */

const INK = COLORS.ink;
/** Viền nâu rất sẫm của nhân vật chính (ấm hơn mực đen). */
const LINE = "#2B1A12";

/** Khung vẽ của một con rối; chân chạm đáy khung. Nhân vật quay mặt sang phải. */
export const PUPPET_W = 360;
export const PUPPET_H = 560;

const SHOULDER = { front: { x: 240, y: 324 }, back: { x: 120, y: 324 } };
const UPPER = 64;
const FORE = 60;
const HIP_Y = 452;
const LEG = 74;
/** Đáy khung (mặt sàn) trong toạ độ con rối. */
const GROUND = PUPPET_H - 14;
/** Khung xương: vai trước / sau, độ dài cánh tay, cẳng tay, độ cao hông, độ dài chân, hai điểm hông. */
type Skeleton = {
  front: { x: number; y: number };
  back: { x: number; y: number };
  upper: number;
  fore: number;
  hip: number;
  leg: number;
  hipX: [number, number];
};
/** Khung chuẩn (Cụ Đồ và mọi vai truyện). */
const BASE_SK: Skeleton = { front: SHOULDER.front, back: SHOULDER.back, upper: UPPER, fore: FORE, hip: HIP_Y, leg: LEG, hipX: [158, 202] };
/**
 * Thằng Cháu tuổi thiếu niên (12–14): cao khoảng 87% Cụ Đồ, vai rộng, tay chân dài; vẽ trực tiếp theo tỉ lệ này
 * (không thu nhỏ cả người) nên nét viền dày đúng bằng Cụ Đồ.
 */
const TC_SK: Skeleton = { front: { x: 244, y: 316 }, back: { x: 116, y: 316 }, upper: 68, fore: 64, hip: GROUND - 20 - 108, leg: 108, hipX: [156, 204] };
/** Đầu Thằng Cháu (vẽ ở khung đầu chuẩn) thu về cỡ này, cằm đặt ở y = TC_CHIN. */
const TC_HEAD_K = 0.64;
const TC_CHIN = 306;

const PAL = {
  cdSkin: "#F2C9A0",
  cdSkinShade: "#DFA77C",
  robe: "#7A4A2A",
  robeDark: "#5A341C",
  robeLight: "#94603A",
  turban: "#4A2E1F",
  turbanFold: "#6E4630",
  white: "#F7F3EA",
  whiteShade: "#D9D3C6",
  trousers: "#F4EFE4",
  cdShoe: "#2A211C",
  tcSkin: "#F7CFA8",
  tcSkinShade: "#E8AE82",
  hair: "#1E1715",
  shirt: "#E9A825",
  shirtLight: "#F6C24A",
  shirtDark: "#C7861A",
  shorts: "#6B4A35",
  shortsDark: "#523625",
  sandal: "#7A4A2A",
  cheek: "#F28B82",
  mouth: "#7A2318",
  tongue: "#E8707A",
};

const LOOK: Record<"CD" | "TC", Look> = {
  CD: { skin: PAL.cdSkin, sleeve: PAL.robe, legs: PAL.trousers, shoe: PAL.cdShoe, arm: 26 },
  TC: { skin: PAL.tcSkin, sleeve: PAL.tcSkin, legs: PAL.tcSkin, shoe: PAL.sandal, arm: 24 },
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Toạ độ khuỷu và bàn tay từ góc vai/khuỷu. side = +1 tay trước, -1 tay sau. */
export const armPoints = (side: 1 | -1, [shoulder, elbow]: [number, number], sk: Skeleton = BASE_SK) => {
  const s = side === 1 ? sk.front : sk.back;
  const e = { x: s.x + side * Math.sin(rad(shoulder)) * sk.upper, y: s.y + Math.cos(rad(shoulder)) * sk.upper };
  const fore = shoulder + elbow;
  const h = { x: e.x + side * Math.sin(rad(fore)) * sk.fore, y: e.y + Math.cos(rad(fore)) * sk.fore };
  return { s, e, h, fore };
};

// ---------------------------------------------------------------- gradient dùng chung

/** Gradient đổ bóng mềm (id cố định: mọi con rối dùng chung định nghĩa giống hệt nhau). */
const Defs: React.FC = () => (
  <defs>
    <linearGradient id="pp-robe" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={PAL.robeDark} />
      <stop offset="0.45" stopColor={PAL.robe} />
      <stop offset="0.8" stopColor={PAL.robeLight} />
      <stop offset="1" stopColor={PAL.robe} />
    </linearGradient>
    <linearGradient id="pp-shirt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={PAL.shirtDark} />
      <stop offset="0.5" stopColor={PAL.shirt} />
      <stop offset="0.85" stopColor={PAL.shirtLight} />
      <stop offset="1" stopColor={PAL.shirt} />
    </linearGradient>
    <linearGradient id="pp-shorts" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={PAL.shortsDark} />
      <stop offset="0.6" stopColor={PAL.shorts} />
      <stop offset="1" stopColor="#7E5A42" />
    </linearGradient>
    <radialGradient id="pp-cd-face" cx="0.6" cy="0.35" r="0.75">
      <stop offset="0" stopColor="#F8D7B4" />
      <stop offset="0.7" stopColor={PAL.cdSkin} />
      <stop offset="1" stopColor={PAL.cdSkinShade} />
    </radialGradient>
    <radialGradient id="pp-tc-face" cx="0.6" cy="0.38" r="0.72">
      <stop offset="0" stopColor="#FCE0C0" />
      <stop offset="0.7" stopColor={PAL.tcSkin} />
      <stop offset="1" stopColor={PAL.tcSkinShade} />
    </radialGradient>
    <linearGradient id="pp-beard" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="1" stopColor={PAL.whiteShade} />
    </linearGradient>
    <linearGradient id="pp-turban" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5E3B28" />
      <stop offset="1" stopColor={PAL.turban} />
    </linearGradient>
    <linearGradient id="pp-trousers" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#DCD5C6" />
      <stop offset="1" stopColor={PAL.trousers} />
    </linearGradient>
  </defs>
);

// ---------------------------------------------------------------- nét mặt nhân vật chính

/** Lông mày: [nghiêng trái, nghiêng phải, nhấc lên] (độ / px). Âm ở nghiêng = đầu trong cụp xuống (cau mày). */
const BROW: Record<Expr, [number, number, number]> = {
  neutral: [0, 0, 0],
  happy: [-3, -3, 6],
  shock: [-6, -6, 16],
  angry: [14, 14, -4],
  smug: [0, -10, 2],
  confused: [-10, 10, 4],
  sad: [-14, -14, 6],
};

/** Một bên lông mày. side -1 = bên trái hình, +1 = bên phải hình; tilt dương = đầu phía trong hạ xuống. */
const Brow: React.FC<{ x: number; y: number; side: -1 | 1; tilt: number; bushy: boolean; color: string; sw?: number }> = ({ x, y, side, tilt, bushy, color, sw = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${-side * tilt})`}>
    {bushy ? (
      <path
        d={`M${-24 * side} 4 Q${-20 * side} -12 ${2 * side} -12 Q${22 * side} -12 ${28 * side} 2 Q${16 * side} -2 ${10 * side} 2 Q${0} -4 ${-8 * side} 4 Q${-16 * side} 0 ${-24 * side} 4 Z`}
        fill={color}
        stroke={LINE}
        strokeWidth={4 * sw}
        strokeLinejoin="round"
      />
    ) : (
      <path d={`M${-16} 0 Q0 -9 16 0`} fill="none" stroke={color} strokeWidth={9 * sw} strokeLinecap="round" />
    )}
  </g>
);

const lid = (expr: Expr, x: number, y: number, rx: number, ry: number, side: -1 | 1, skin: string, sw: number) => {
  // [độ cao mép mí ở phía trong (gần mũi), ở phía ngoài] tính từ tâm mắt
  const edge: Partial<Record<Expr, [number, number]>> = { angry: [-1, -ry * 0.7], smug: [-1, -1], sad: [-ry * 0.7, -1] };
  const e = edge[expr];
  if (!e) return null;
  const inX = x - side * (rx + 4);
  const outX = x + side * (rx + 4);
  return (
    <g>
      <path d={`M${inX} ${y - ry - 6} L${outX} ${y - ry - 6} L${outX} ${y + e[1]} L${inX} ${y + e[0]} Z`} fill={skin} />
      <path d={`M${inX} ${y + e[0]} L${outX} ${y + e[1]}`} stroke={LINE} strokeWidth={4 * sw} strokeLinecap="round" />
    </g>
  );
};

/** Mắt. size: bán kính; kind CD = mắt nhỏ sau kính, TC = mắt to tròn đen long lanh. */
const Eye: React.FC<{ x: number; y: number; expr: Expr; blink: boolean; big: boolean; side: -1 | 1; skin: string; sw?: number }> = ({
  x,
  y,
  expr,
  blink,
  big,
  side,
  skin,
  sw = 1,
}) => {
  const rx = big ? 13 : 7;
  const ry = big ? 16 : 8.5;
  if (expr === "happy") {
    return <path d={`M${x - rx - 2} ${y + 4} Q${x} ${y - ry - 4} ${x + rx + 2} ${y + 4}`} fill="none" stroke={LINE} strokeWidth={(big ? 7 : 5) * sw} strokeLinecap="round" />;
  }
  if (blink) {
    return <path d={`M${x - rx - 1} ${y} Q${x} ${y + ry * 0.7} ${x + rx + 1} ${y}`} fill="none" stroke={LINE} strokeWidth={(big ? 6 : 5) * sw} strokeLinecap="round" />;
  }
  if (expr === "shock") {
    return (
      <g>
        <ellipse cx={x} cy={y} rx={rx + 6} ry={ry + 6} fill="#FFFFFF" stroke={LINE} strokeWidth={4 * sw} />
        <circle cx={x} cy={y} r={big ? 7 : 4} fill={LINE} />
        <circle cx={x + 2} cy={y - 2} r={big ? 2.5 : 1.5} fill="#FFFFFF" />
      </g>
    );
  }
  const lookUp = expr === "confused" ? -3 : 0;
  const small = expr === "confused" && side === -1 ? 0.8 : 1;
  return (
    <g>
      <ellipse cx={x} cy={y + lookUp} rx={rx * small} ry={ry * small} fill={LINE} />
      <circle cx={x + rx * 0.35} cy={y + lookUp - ry * 0.4} r={big ? 5 : 2.6} fill="#FFFFFF" />
      {big ? <circle cx={x - rx * 0.35} cy={y + lookUp + ry * 0.35} r="2.6" fill="#FFFFFF" opacity="0.85" /> : null}
      {/* Mí mắt: cau (angry), lim dim (smug), sụp buồn (sad): mảng da che nửa trên + nét mí */}
      {lid(expr, x, y, rx, ry, side, skin, sw)}
    </g>
  );
};

/** Miệng: talk 0..1 = độ mở khi nói. w = nửa bề ngang. */
const FaceMouth: React.FC<{ expr: Expr; x: number; y: number; talk: number; w: number; sw?: number }> = ({ expr, x, y, talk, w, sw = 1 }) => {
  const open = (top: number, depth: number, width: number) => (
    <g>
      <path
        d={`M${x - width} ${y + top} Q${x} ${y + top - 4} ${x + width} ${y + top} Q${x + width * 0.9} ${y + depth} ${x} ${y + depth + 2} Q${x - width * 0.9} ${y + depth} ${x - width} ${y + top} Z`}
        fill={PAL.mouth}
        stroke={LINE}
        strokeWidth={4 * sw}
        strokeLinejoin="round"
      />
      {depth > 10 ? <ellipse cx={x} cy={y + depth - 4} rx={width * 0.5} ry={Math.min(6, depth * 0.25)} fill={PAL.tongue} /> : null}
      {depth > 12 ? <path d={`M${x - width * 0.75} ${y + top + 2} L${x + width * 0.75} ${y + top + 2}`} stroke="#FFFFFF" strokeWidth={4 * sw} strokeLinecap="round" /> : null}
    </g>
  );
  if (talk > 0) {
    const width = expr === "happy" ? w * 1.25 : expr === "shock" ? w * 0.75 : w;
    return open(-2, 4 + talk * (expr === "happy" ? 22 : 18), width);
  }
  switch (expr) {
    case "happy":
      return open(-4, 18, w * 1.2);
    case "shock":
      return <ellipse cx={x} cy={y + 6} rx={w * 0.55} ry={w * 0.8} fill={PAL.mouth} stroke={LINE} strokeWidth={4 * sw} />;
    case "angry":
      return <path d={`M${x - w * 0.8} ${y + 8} Q${x} ${y - 4} ${x + w * 0.8} ${y + 8}`} fill="none" stroke={LINE} strokeWidth={5 * sw} strokeLinecap="round" />;
    case "smug":
      return <path d={`M${x - w * 0.8} ${y + 2} Q${x + w * 0.1} ${y + 9} ${x + w} ${y - 6}`} fill="none" stroke={LINE} strokeWidth={5 * sw} strokeLinecap="round" />;
    case "confused":
      return <ellipse cx={x + w * 0.35} cy={y + 4} rx={w * 0.32} ry={w * 0.26} fill={PAL.mouth} stroke={LINE} strokeWidth={4 * sw} />;
    case "sad":
      return <path d={`M${x - w * 0.75} ${y + 9} Q${x} ${y - 3} ${x + w * 0.75} ${y + 9}`} fill="none" stroke={LINE} strokeWidth={5 * sw} strokeLinecap="round" />;
    default:
      return <path d={`M${x - w * 0.8} ${y} Q${x} ${y + 10} ${x + w * 0.8} ${y}`} fill="none" stroke={LINE} strokeWidth={5 * sw} strokeLinecap="round" />;
  }
};

type HeadProps = { expr: Expr; talk: number; blink: boolean };

const CuDoHead: React.FC<HeadProps> = ({ expr, talk, blink }) => {
  const [tl, tr, lift] = BROW[expr];
  const eyeY = 202;
  return (
    <g>
      {/* Tai, tóc bạc lộ hai bên dưới khăn */}
      <ellipse cx="104" cy="212" rx="13" ry="21" fill={PAL.cdSkin} stroke={LINE} strokeWidth="5" />
      <ellipse cx="256" cy="212" rx="13" ry="21" fill={PAL.cdSkin} stroke={LINE} strokeWidth="5" />
      <path d="M104 162 Q94 194 102 226 Q114 214 116 188 Z" fill={PAL.white} stroke={LINE} strokeWidth="4" strokeLinejoin="round" />
      <path d="M256 162 Q266 194 258 226 Q246 214 244 188 Z" fill={PAL.white} stroke={LINE} strokeWidth="4" strokeLinejoin="round" />
      {/* Mặt hơi dài, gầy */}
      <path d="M110 150 Q104 268 180 290 Q256 268 250 150 Z" fill="url(#pp-cd-face)" stroke={LINE} strokeWidth="6" strokeLinejoin="round" />
      {/* Nếp nhăn trán và đuôi mắt */}
      <path d="M150 168 Q180 162 210 168" fill="none" stroke={PAL.cdSkinShade} strokeWidth="3" strokeLinecap="round" />
      {/* Khăn đóng nâu sẫm, các nếp quấn và chữ nhân trước trán */}
      <path d="M100 166 Q92 96 180 90 Q268 96 260 166 Q180 150 100 166 Z" fill="url(#pp-turban)" stroke={LINE} strokeWidth="6" strokeLinejoin="round" />
      <path d="M103 150 Q180 132 257 150 M106 132 Q180 112 254 132 M116 114 Q180 96 244 114" fill="none" stroke={PAL.turbanFold} strokeWidth="5" strokeLinecap="round" />
      <path d="M164 156 L180 126 L196 156" fill="none" stroke={PAL.turbanFold} strokeWidth="5" strokeLinejoin="round" />
      {/* Lông mày bạc rậm */}
      <Brow x={150} y={170 - lift} side={-1} tilt={tl} bushy color={PAL.white} />
      <Brow x={210} y={170 - lift} side={1} tilt={tr} bushy color={PAL.white} />
      <Eye x={152} y={eyeY} expr={expr} blink={blink} big={false} side={-1} skin="#F6D3AE" />
      <Eye x={208} y={eyeY} expr={expr} blink={blink} big={false} side={1} skin="#F6D3AE" />
      {/* Kính tròn gọng mảnh */}
      <circle cx="152" cy={eyeY} r="21" fill="#FFFFFF" fillOpacity="0.18" stroke={LINE} strokeWidth="3.5" />
      <circle cx="208" cy={eyeY} r="21" fill="#FFFFFF" fillOpacity="0.18" stroke={LINE} strokeWidth="3.5" />
      <path d="M173 200 Q180 195 187 200 M131 198 L112 194 M229 198 L248 194" fill="none" stroke={LINE} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M140 190 L146 184 M196 190 L202 184" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      {/* Mũi, má hồng */}
      <path d="M180 212 Q172 234 184 238" fill="none" stroke={PAL.cdSkinShade} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="132" cy="236" rx="14" ry="8" fill={PAL.cheek} opacity="0.55" />
      <ellipse cx="228" cy="236" rx="14" ry="8" fill={PAL.cheek} opacity="0.55" />
      {/* Râu trắng dài, nhọn xuống tới ngực */}
      <path
        d="M126 238 Q118 298 156 336 Q172 366 184 410 Q192 368 208 336 Q244 298 236 238 Q214 266 180 266 Q148 266 126 238 Z"
        fill="url(#pp-beard)"
        stroke={LINE}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M162 290 Q170 330 182 370 M196 292 Q196 330 188 372" fill="none" stroke={PAL.whiteShade} strokeWidth="3" strokeLinecap="round" />
      <FaceMouth expr={expr} x={180} y={256} talk={talk} w={14} />
      {/* Ria */}
      <path
        d="M144 252 Q160 236 180 245 Q200 236 216 252 Q204 260 192 254 Q186 250 180 254 Q174 250 168 254 Q156 260 144 252 Z"
        fill={PAL.white}
        stroke={LINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  );
};

/** Đầu Thằng Cháu; sw = hệ số độ dày nét (đầu được thu nhỏ khi ghép vào thân nên nét phải dày lên tương ứng). */
const ThangChauHead: React.FC<HeadProps & { sw?: number }> = ({ expr, talk, blink, sw = 1 }) => {
  const [tl, tr, lift] = BROW[expr];
  const eyeY = 214;
  return (
    <g>
      <ellipse cx="92" cy="220" rx="15" ry="19" fill={PAL.tcSkin} stroke={LINE} strokeWidth={5 * sw} />
      <ellipse cx="268" cy="220" rx="15" ry="19" fill={PAL.tcSkin} stroke={LINE} strokeWidth={5 * sw} />
      {/* Mặt tròn bầu bĩnh */}
      <ellipse cx="180" cy="210" rx="88" ry="84" fill="url(#pp-tc-face)" stroke={LINE} strokeWidth={6 * sw} />
      {/* Tóc đen bù xù nhiều chỏm */}
      <path
        d="M92 206 Q88 186 101 171 Q90 154 88 126 Q93 138 99 132 Q89 120 97 91 Q105 110 113 106 Q103 86 122 60 Q127 87 136 86 Q128 63 155 43 Q152 74 161 76 Q160 48 193 37 Q180 70 187 74 Q196 49 230 49 Q208 74 214 81 Q228 62 259 72 Q233 87 236 95 Q252 86 277 104 Q253 107 254 116 Q264 115 282 138 Q266 132 264 141 Q266 142 276 167 Q270 157 266 165 Q276 186 268 204 Q258 174 248 160 Q240 176 226 166 Q220 186 204 166 Q194 184 182 162 Q168 184 156 162 Q144 182 132 160 Q118 176 112 156 Q98 176 92 206 Z"
        fill={PAL.hair}
        stroke={LINE}
        strokeWidth={5 * sw}
        strokeLinejoin="round"
      />
            <path d="M130 112 Q156 92 182 96 M206 92 Q230 96 246 116 M104 158 Q112 138 126 132" fill="none" stroke="#4A3C38" strokeWidth={5 * sw} strokeLinecap="round" />
      <Brow x={146} y={180 - lift} side={-1} tilt={tl} bushy={false} color={PAL.hair} sw={sw} />
      <Brow x={214} y={180 - lift} side={1} tilt={tr} bushy={false} color={PAL.hair} sw={sw} />
      <Eye x={146} y={eyeY} expr={expr} blink={blink} big side={-1} skin="#FAD9B8" sw={sw} />
      <Eye x={214} y={eyeY} expr={expr} blink={blink} big side={1} skin="#FAD9B8" sw={sw} />
      <path d="M176 238 Q180 244 186 238" fill="none" stroke={PAL.tcSkinShade} strokeWidth={5 * sw} strokeLinecap="round" />
      <ellipse cx="118" cy="246" rx="17" ry="10" fill={PAL.cheek} opacity="0.6" />
      <ellipse cx="242" cy="246" rx="17" ry="10" fill={PAL.cheek} opacity="0.6" />
      <FaceMouth expr={expr} x={180} y={262} talk={talk} w={16} sw={sw} />
    </g>
  );
};

// ---------------------------------------------------------------- thân

const Limb: React.FC<{ d: string; color: string; width: number; line?: string }> = ({ d, color, width, line = INK }) => (
  <>
    <path d={d} fill="none" stroke={line} strokeWidth={width + 11} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
  </>
);

/** Giày nhìn nghiêng, mũi giày quay về phía trước (sang phải). sandal = dép quai (lộ bàn chân). */
const Shoe: React.FC<{ x: number; y: number; color: string; tilt: number; sandal?: string }> = ({ x, y, color, tilt, sandal }) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt * 0.35})`}>
    {sandal ? (
      <>
        <path d="M-18 -10 Q-20 4 -16 8 L34 8 Q40 4 36 -4 Q30 -12 14 -12 Z" fill={sandal} stroke={LINE} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-22 8 L40 8 Q44 14 38 16 L-20 16 Q-26 14 -22 8 Z" fill={color} stroke={LINE} strokeWidth="5" strokeLinejoin="round" />
        <path d="M2 -11 Q10 4 22 -10" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M-20 -12 Q-22 -2 -20 12 L34 12 Q42 12 40 2 Q36 -12 14 -14 L-4 -14 Q-18 -16 -20 -12 Z" fill={color} stroke={LINE} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-18 9 L37 9" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      </>
    )}
  </g>
);

const Legs: React.FC<{ look: Look; swing: number; who: "CD" | "TC" | null; sk: Skeleton }> = ({ look, swing, who, sk }) => {
  const len = sk.leg;
  const hip = sk.hip;
  return (
  <>
    {[
      { x: sk.hipX[0], a: swing },
      { x: sk.hipX[1], a: -swing },
    ].map(({ x, a }) => {
      const fx = x + Math.sin(rad(a)) * len;
      const fy = hip + Math.cos(rad(a)) * len;
      return (
        <g key={x}>
          {who === "CD" ? (
            // Quần trắng ống rộng: ống quần loe ở cổ chân
            <>
              <Limb d={`M${x} ${hip} L${fx} ${fy - 6}`} color={PAL.trousers} width={30} line={LINE} />
              <path
                d={`M${fx - 22} ${fy + 2} L${fx - 14} ${fy - 26} L${fx + 14} ${fy - 26} L${fx + 24} ${fy + 2} Z`}
                fill="url(#pp-trousers)"
                stroke={LINE}
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <Limb d={`M${x} ${hip} L${fx} ${fy}`} color={look.legs} width={who === "TC" ? 26 : 22} line={who ? LINE : INK} />
          )}
          <Shoe x={fx + 2} y={fy + 6} color={look.shoe} tilt={a} sandal={who === "TC" ? PAL.tcSkin : undefined} />
        </g>
      );
    })}
  </>
  );
};

/** Bàn tay: lòng bàn tay theo hướng cẳng tay, có ngón cái, viền đậm. */
const Hand: React.FC<{ at: { x: number; y: number }; fore: number; side: 1 | -1; skin: string; line: string }> = ({ at, fore, side, skin, line }) => (
  <g transform={`translate(${at.x} ${at.y}) rotate(${-side * fore})`}>
    <ellipse cx={side * -9} cy="4" rx="7" ry="10" transform={`rotate(${side * 30} ${side * -9} 4)`} fill={skin} stroke={line} strokeWidth="5" />
    <ellipse cx="0" cy="8" rx="15" ry="17" fill={skin} stroke={line} strokeWidth="6" />
    <path d="M-6 16 Q0 20 6 16" fill="none" stroke={line} strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
  </g>
);

/** Tay áo rộng của áo dài: loe dần về phía cổ tay. */
const WideCuff: React.FC<{ a: ReturnType<typeof armPoints> }> = ({ a }) => {
  const dx = a.h.x - a.e.x;
  const dy = a.h.y - a.e.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const m = { x: a.e.x + dx * 0.25, y: a.e.y + dy * 0.25 };
  const end = { x: a.h.x - (dx / len) * 6, y: a.h.y - (dy / len) * 6 };
  const p = (o: { x: number; y: number }, w: number) => `${o.x + nx * w} ${o.y + ny * w}`;
  return (
    <path
      d={`M${p(m, 16)} L${p(end, 26)} Q${end.x + (dx / len) * 6} ${end.y + (dy / len) * 6} ${p(end, -26)} L${p(m, -16)} Z`}
      fill="url(#pp-robe)"
      stroke={LINE}
      strokeWidth="5"
      strokeLinejoin="round"
    />
  );
};

const Neck: React.FC<{ skin: string; line: string; teen: boolean }> = ({ skin, line, teen }) =>
  teen ? (
    <path d="M167 282 L167 314 L193 314 L193 282 Z" fill={skin} stroke={line} strokeWidth="5" strokeLinejoin="round" />
  ) : (
    <path d="M162 262 L162 318 L198 318 L198 262 Z" fill={skin} stroke={line} strokeWidth="5" strokeLinejoin="round" />
  );

const Torso: React.FC<{ who: "CD" | "TC" }> = ({ who }) =>
  who === "CD" ? (
    <g>
      {/* Áo dài the nâu dài quá gối, xẻ tà hai bên */}
      <path d="M122 312 Q180 294 238 312 L254 420 L270 504 Q180 520 90 504 L106 420 Z" fill="url(#pp-robe)" stroke={LINE} strokeWidth="7" strokeLinejoin="round" />
      <path d="M100 504 L110 446 M260 504 L250 446" stroke={LINE} strokeWidth="5" strokeLinecap="round" />
      <path d="M96 490 Q180 504 264 490" fill="none" stroke={PAL.robeDark} strokeWidth="6" />
      {/* Vạt chéo cài khuy bên phải */}
      <path d="M180 318 Q204 328 216 356 L226 470" fill="none" stroke={PAL.robeDark} strokeWidth="5" strokeLinecap="round" />
      {[334, 352, 376, 404].map((y, i) => (
        <circle key={y} cx={198 + Math.min(i, 2) * 8} cy={y} r="4.5" fill="#C9A26A" stroke={LINE} strokeWidth="3" />
      ))}
      {/* Cổ đứng màu kem */}
      <path d="M156 300 Q180 310 204 300 L206 316 Q180 326 154 316 Z" fill={PAL.white} stroke={LINE} strokeWidth="4" strokeLinejoin="round" />
    </g>
  ) : (
    <g transform="translate(0 10)">
      {/* Quần soóc nâu dài gần tới gối */}
      <path d="M118 392 L242 392 L252 462 L188 464 L180 432 L172 464 L108 462 Z" fill="url(#pp-shorts)" stroke={LINE} strokeWidth="6" strokeLinejoin="round" />
      {/* Áo cánh vàng nghệ, vai rộng, cổ đứng, hàng cúc tàu */}
      <path d="M112 306 Q180 290 248 306 L252 400 Q180 410 108 400 Z" fill="url(#pp-shirt)" stroke={LINE} strokeWidth="6" strokeLinejoin="round" />
      <path d="M180 306 L180 404" stroke={PAL.shirtDark} strokeWidth="4" />
      {[324, 346, 368, 390].map((y) => (
        <g key={y}>
          <path d={`M168 ${y} Q180 ${y - 5} 192 ${y}`} fill="none" stroke="#8A5A1A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="193" cy={y} r="4" fill="#8A5A1A" />
        </g>
      ))}
      <path d="M158 290 L202 290 L204 306 Q180 312 156 306 Z" fill={PAL.shirt} stroke={LINE} strokeWidth="4" strokeLinejoin="round" />
    </g>
  );

// ---------------------------------------------------------------- đạo cụ gắn trên người

const HeldProp: React.FC<{
  prop: PropRef | null;
  at: { x: number; y: number };
  fore: number;
  side: 1 | -1;
  mirrored: boolean;
  two: boolean;
  /** Phóng thêm đồ cầm tay (Thằng Cháu người nhỏ nhưng đồ vẫn phải đọc được). */
  scale?: number;
}> = ({ prop, at, fore, side, mirrored, two, scale = 1 }) => {
  const id = propId(prop);
  if (!id) return null;
  const def = PROPS[id as keyof typeof PROPS];
  const text = propText(prop);
  if (def.mode === "extend") {
    return <g transform={`translate(${at.x} ${at.y}) rotate(${-side * fore}) scale(${scale})`}>{def.draw({ text, mirrored })}</g>;
  }
  return <g transform={`translate(${at.x} ${at.y + (two ? 62 : 22) * scale}) scale(${scale})`}>{def.draw({ text, mirrored })}</g>;
};

const Worn: React.FC<{ prop: PropRef | null; x: number; y: number; scale?: number; mirrored: boolean }> = ({
  prop,
  x,
  y,
  scale = 1,
  mirrored,
}) => {
  const id = propId(prop);
  if (!id) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {PROPS[id as keyof typeof PROPS].draw({ text: propText(prop), mirrored })}
    </g>
  );
};

// ---------------------------------------------------------------- vai trong truyện (cảnh hồi ức)

const BASE_ROLES = {
  /** Thạch Sanh: chàng trai khoẻ mạnh, da rám nắng, búi tóc, khăn đỏ buộc trán, áo cánh nâu, tay trần. */
  "thach-sanh": {
    look: { skin: "#E2A574", sleeve: "#E2A574", legs: "#6B4423", shoe: "#E2A574", arm: 28 },
    headY: 70,
    Head: ({ expr, talk, blink }) => {
      const skin = "#E2A574";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 200, browY: 172, mouthY: 252, browColor: INK };
      return (
        <g>
          <ellipse cx="92" cy="208" rx="15" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
          <ellipse cx="268" cy="208" rx="15" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
          <rect x="92" y="112" width="176" height="178" rx="74" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Búi tóc trên đỉnh đầu */}
          <circle cx="180" cy="80" r="30" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <path d="M86 160 C80 84 280 84 274 160 Q230 140 180 142 Q130 140 86 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Khăn đỏ buộc trán, đuôi khăn bay sau gáy */}
          <path d="M88 150 Q180 126 272 150" fill="none" stroke="#C0392B" strokeWidth="16" strokeLinecap="round" />
          <path d="M92 150 Q62 160 48 196 M92 152 Q70 176 70 212" fill="none" stroke="#C0392B" strokeWidth="10" strokeLinecap="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Quần nâu, thắt lưng đỏ */}
        <path d="M120 420 L240 420 L248 470 L112 470 Z" fill="#6B4423" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Ngực trần + áo cánh nâu mở vạt */}
        <path d="M112 312 Q180 290 248 312 L242 430 L118 430 Z" fill="#E2A574" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M112 312 Q140 302 158 300 L150 430 L118 430 Z" fill="#7A4E2D" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M248 312 Q220 302 202 300 L210 430 L242 430 Z" fill="#7A4E2D" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M162 350 Q180 360 198 350" fill="none" stroke="#B9814F" strokeWidth="5" strokeLinecap="round" />
        <rect x="114" y="412" width="132" height="20" rx="6" fill="#C0392B" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
  /** Lý Thông: gã bán rượu gian xảo, mặt dài, khăn vấn nâu đỏ, ria mép vểnh, râu dê, áo dài nâu đỏ. */
  "ly-thong": {
    look: { skin: "#F3CFA6", sleeve: "#8E3B2F", legs: "#F2EBDD", shoe: "#1E1B2E" },
    headY: 150,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3CFA6";
      const g: FaceGeo = { eyeL: 154, eyeR: 206, eyeY: 194, browY: 168, mouthY: 254, browColor: INK };
      return (
        <g>
          <ellipse cx="100" cy="206" rx="13" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
          <ellipse cx="260" cy="206" rx="13" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
          <rect x="100" y="112" width="160" height="184" rx="68" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Khăn vấn */}
          <path d="M90 156 C86 70 274 70 270 156 Z" fill="#6E2430" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M98 132 Q180 104 262 132 M104 112 Q180 86 256 112" fill="none" stroke="#9C3A48" strokeWidth="6" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Ria mép vểnh và râu dê */}
          <path d="M178 234 Q150 238 132 216 M182 234 Q210 238 228 216" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
          <path d="M170 284 L180 316 L190 284 Z" fill="#1E1B2E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M116 312 Q180 292 244 312 L264 480 Q180 494 96 480 Z" fill="#8E3B2F" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 344 L210 304" fill="none" stroke="#F2EBDD" strokeWidth="7" strokeLinecap="round" />
        <rect x="108" y="396" width="144" height="18" rx="6" fill="#E8C547" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
} satisfies Partial<Record<RoleId, Role>>;

/** Mọi vai: vai chung + vai truyện (engine/stage/story). */
const ROLES = { ...BASE_ROLES, ...STORY_ROLES } as Record<RoleId, Role>;

// ---------------------------------------------------------------- con rối

export type PuppetProps = {
  who: "CD" | "TC";
  /** Đóng vai nhân vật trong truyện (cảnh hồi ức). */
  role?: RoleId | null;
  expr: Expr;
  arms: ArmAngles;
  /** Đồ trên tay, đội đầu, dán trán, đeo lưng. */
  hand: PropRef | null;
  head: PropRef | null;
  face: PropRef | null;
  back: PropRef | null;
  /** Độ mở miệng khi nói, 0 = ngậm. */
  talk: number;
  blink: boolean;
  /** Góc vung chân khi đi. */
  legSwing: number;
  /** Nghiêng đầu (độ). */
  headTilt: number;
  /** true = quay mặt sang trái. */
  mirrored: boolean;
  /** Nhấc / hạ nửa thân trên (thở, nhún khi nói), chân vẫn chạm đất. */
  bodyDy?: number;
  /** Gật đầu (đầu hạ xuống bao nhiêu px). */
  headDy?: number;
  /** Đầu phồng nhẹ khi đổi nét mặt (0 = bình thường). */
  headPop?: number;
};

/** Con rối vẽ trong khung PUPPET_W × PUPPET_H, đáy khung là mặt sàn. */
export const Puppet: React.FC<PuppetProps> = (p) => {
  const role = p.role ? ROLES[p.role] : null;
  const main = role ? null : p.who;
  const look = role ? role.look : LOOK[p.who];
  const line = main ? LINE : INK;
  const arm = look.arm ?? 22;
  const sk = main === "TC" ? TC_SK : BASE_SK;
  const front = armPoints(1, p.arms.front, sk);
  const back = armPoints(-1, p.arms.back, sk);
  const twoHanded = p.arms.front[1] < -60 && p.arms.back[1] < -60;
  const handAt = twoHanded ? { x: (front.h.x + back.h.x) / 2, y: (front.h.y + back.h.y) / 2 } : front.h;
  const armPath = (a: ReturnType<typeof armPoints>) => `M${a.s.x} ${a.s.y} L${a.e.x} ${a.e.y} L${a.h.x} ${a.h.y}`;
  const sleevePath = (a: ReturnType<typeof armPoints>) =>
    `M${a.s.x} ${a.s.y} L${a.s.x + (a.e.x - a.s.x) * 0.55} ${a.s.y + (a.e.y - a.s.y) * 0.55}`;
  const bodyDy = p.bodyDy ?? 0;
  const pop = 1 + (p.headPop ?? 0);
  // Cụ Đồ hơi khom về phía trước; đầu Thằng Cháu to so với người.
  const stoop = main === "CD" ? `rotate(4 180 ${HIP_Y})` : "";
  const headTransform =
    main === "TC"
      ? `translate(0 ${p.headDy ?? 0}) rotate(${p.headTilt} 180 ${TC_CHIN}) translate(180 ${TC_CHIN}) scale(${TC_HEAD_K * pop}) translate(-180 -294)`
      : `translate(0 ${(p.headDy ?? 0) - 8}) rotate(${p.headTilt} 180 300) translate(180 296) scale(${pop}) translate(-180 -296)`;
  const headY = role ? role.headY : main === "CD" ? 100 : 118;

  const armLayer = (a: ReturnType<typeof armPoints>, i: number) => (
    <g key={i}>
      <Limb d={armPath(a)} color={look.sleeve} width={arm} line={line} />
      {main === "TC" ? <Limb d={sleevePath(a)} color={PAL.shirt} width={arm + 6} line={LINE} /> : null}
      {main === "CD" ? <WideCuff a={a} /> : null}
    </g>
  );

  const body = (
    <>
      <Worn prop={p.back} x={128} y={sk.hip} mirrored={p.mirrored} />
      <Legs look={look} swing={p.legSwing} who={main} sk={sk} />
      <g transform={`translate(0 ${bodyDy}) ${stoop}`}>
        <Neck skin={look.skin} line={line} teen={main === "TC"} />
        {role ? <role.Torso /> : <Torso who={p.who} />}
        {/* Tay sau vẽ trước đầu (râu Cụ Đồ phủ lên), tay trước vẽ sau cùng */}
        {armLayer(back, 0)}
        <g transform={headTransform}>
          {role ? (
            <role.Head expr={p.expr} talk={p.talk} blink={p.blink} />
          ) : p.who === "CD" ? (
            <CuDoHead expr={p.expr} talk={p.talk} blink={p.blink} />
          ) : (
            <ThangChauHead expr={p.expr} talk={p.talk} blink={p.blink} sw={1 / TC_HEAD_K} />
          )}
          <Worn prop={p.face} x={180} y={182} scale={0.72} mirrored={p.mirrored} />
          <Worn prop={p.head} x={180} y={headY} mirrored={p.mirrored} />
        </g>
        {armLayer(front, 1)}
        <HeldProp prop={p.hand} at={handAt} fore={front.fore} side={1} mirrored={p.mirrored} two={twoHanded} scale={1} />
        {[back, front].map((a, i) => (
          <Hand key={i} at={a.h} fore={a.fore} side={i === 0 ? -1 : 1} skin={look.skin} line={line} />
        ))}
      </g>
    </>
  );

  return (
    <g transform={p.mirrored ? `translate(${PUPPET_W} 0) scale(-1 1)` : undefined}>
      <Defs />
      {body}
    </g>
  );
};
