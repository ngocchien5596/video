import React from "react";
import type { Expr, PropRef, RoleId } from "../lib/stage-types.ts";
import { COLORS } from "../components/brand.ts";
import type { ArmAngles } from "./poses.ts";
import { PROPS } from "./props.tsx";
import { propId, propText } from "./track.ts";

const INK = COLORS.ink;

/** Khung vẽ của một con rối; chân chạm đáy khung. Nhân vật quay mặt sang phải. */
export const PUPPET_W = 360;
export const PUPPET_H = 560;

const SHOULDER = { front: { x: 240, y: 324 }, back: { x: 120, y: 324 } };
const UPPER = 64;
const FORE = 60;
const HIP_Y = 452;
const LEG = 74;

type Look = {
  skin: string;
  sleeve: string;
  legs: string;
  shoe: string;
  /** Độ dày tay (mặc định 22). */
  arm?: number;
};

const LOOK: Record<"CD" | "TC", Look> = {
  CD: { skin: "#F6C89F", sleeve: "#2B3A55", legs: "#FFF8E7", shoe: "#1E1B2E" },
  TC: { skin: "#FAD2B0", sleeve: "#FAD2B0", legs: "#FAD2B0", shoe: "#E5484D" },
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Toạ độ khuỷu và bàn tay từ góc vai/khuỷu. side = +1 tay trước, -1 tay sau. */
export const armPoints = (side: 1 | -1, [shoulder, elbow]: [number, number]) => {
  const s = side === 1 ? SHOULDER.front : SHOULDER.back;
  const e = { x: s.x + side * Math.sin(rad(shoulder)) * UPPER, y: s.y + Math.cos(rad(shoulder)) * UPPER };
  const fore = shoulder + elbow;
  const h = { x: e.x + side * Math.sin(rad(fore)) * FORE, y: e.y + Math.cos(rad(fore)) * FORE };
  return { s, e, h, fore };
};

// ---------------------------------------------------------------- nét mặt

type FaceGeo = { eyeL: number; eyeR: number; eyeY: number; browY: number; mouthY: number; browColor: string };

const Eyes: React.FC<{ expr: Expr; g: FaceGeo; blink: boolean; big: boolean }> = ({ expr, g, blink, big }) => {
  const r = big ? 11 : 7;
  return (
    <>
      {[g.eyeL, g.eyeR].map((x) => {
        if (expr === "happy") {
          return (
            <path
              key={x}
              d={`M${x - 12} ${g.eyeY + 4} Q${x} ${g.eyeY - 12} ${x + 12} ${g.eyeY + 4}`}
              fill="none"
              stroke={INK}
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        }
        if (expr === "shock") {
          return (
            <g key={x}>
              <circle cx={x} cy={g.eyeY} r={r + 7} fill="#FFFFFF" stroke={INK} strokeWidth="5" />
              <circle cx={x} cy={g.eyeY} r="4" fill={INK} />
            </g>
          );
        }
        if (blink) {
          return (
            <line key={x} x1={x - 10} y1={g.eyeY} x2={x + 10} y2={g.eyeY} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          );
        }
        return (
          <g key={x}>
            <circle cx={x} cy={g.eyeY} r={r} fill={INK} />
            {big ? <circle cx={x + 3} cy={g.eyeY - 4} r="3.5" fill="#FFFFFF" /> : null}
            {expr === "smug" ? (
              <path d={`M${x - 14} ${g.eyeY - 2} L${x + 14} ${g.eyeY - 2}`} stroke={INK} strokeWidth="6" strokeLinecap="round" />
            ) : null}
          </g>
        );
      })}
    </>
  );
};

/** Lông mày: [độ nghiêng trái, độ nghiêng phải, độ nhấc lên]. */
const BROWS: Record<Expr, [number, number, number]> = {
  neutral: [0, 0, 0],
  happy: [-4, 4, 6],
  shock: [-6, 6, 16],
  angry: [10, -10, -2],
  smug: [0, -8, 4],
  confused: [-8, 8, 0],
  sad: [-10, 10, 6],
};

const Brows: React.FC<{ expr: Expr; g: FaceGeo }> = ({ expr, g }) => {
  const [tl, tr, lift] = BROWS[expr];
  const y = g.browY - lift;
  const confusedR = expr === "confused" ? 10 : 0;
  return (
    <>
      <path
        d={`M${g.eyeL - 16} ${y - tl} Q${g.eyeL} ${y - 8} ${g.eyeL + 14} ${y + tl}`}
        fill="none"
        stroke={g.browColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={`M${g.eyeR - 14} ${y + tr + confusedR} Q${g.eyeR} ${y - 8 + confusedR} ${g.eyeR + 16} ${y - tr + confusedR}`}
        fill="none"
        stroke={g.browColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </>
  );
};

/** Miệng: talk 0..1 là độ mở khi đang nói. */
const Mouth: React.FC<{ expr: Expr; y: number; talk: number; color: string }> = ({ expr, y, talk, color }) => {
  const x = 180;
  if (talk > 0) {
    const wide = expr === "happy" ? 18 : expr === "angry" ? 17 : 13;
    return <ellipse cx={x} cy={y} rx={wide} ry={4 + talk * 13} fill={color} stroke={INK} strokeWidth="5" />;
  }
  switch (expr) {
    case "happy":
      return <path d={`M${x - 20} ${y - 6} Q${x} ${y + 22} ${x + 20} ${y - 6} Z`} fill={color} stroke={INK} strokeWidth="5" strokeLinejoin="round" />;
    case "shock":
      return <ellipse cx={x} cy={y + 2} rx="12" ry="17" fill={color} stroke={INK} strokeWidth="5" />;
    case "angry":
      return <path d={`M${x - 18} ${y + 8} Q${x} ${y - 10} ${x + 18} ${y + 8} Z`} fill={color} stroke={INK} strokeWidth="5" strokeLinejoin="round" />;
    case "smug":
      return <path d={`M${x - 16} ${y + 2} Q${x + 2} ${y + 8} ${x + 20} ${y - 8}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
    case "confused":
      return <path d={`M${x - 16} ${y + 2} q8 -8 16 0 t16 0`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
    case "sad":
      return <path d={`M${x - 16} ${y + 8} Q${x} ${y - 6} ${x + 16} ${y + 8}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
    default:
      return <path d={`M${x - 14} ${y} Q${x} ${y + 10} ${x + 14} ${y}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
  }
};

const CuDoHead: React.FC<{ expr: Expr; talk: number; blink: boolean }> = ({ expr, talk, blink }) => {
  const skin = LOOK.CD.skin;
  const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 192, browY: 162, mouthY: 252, browColor: "#FFFFFF" };
  return (
    <g>
      <ellipse cx="95" cy="206" rx="14" ry="22" fill={skin} stroke={INK} strokeWidth="6" />
      <ellipse cx="265" cy="206" rx="14" ry="22" fill={skin} stroke={INK} strokeWidth="6" />
      <rect x="95" y="108" width="170" height="178" rx="78" fill={skin} stroke={INK} strokeWidth="7" />
      {/* Khăn đóng */}
      <path d="M84 150 C84 60 276 60 276 150 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
      <path d="M92 116 Q180 88 268 116" fill="none" stroke="#FFD93D" strokeWidth="6" />
      <path d="M86 140 Q180 112 274 140" fill="none" stroke="#FFD93D" strokeWidth="6" />
      <Brows expr={expr} g={g} />
      {/* Kính tròn */}
      <circle cx={g.eyeL} cy={g.eyeY} r="25" fill="#FFFFFF44" stroke={INK} strokeWidth="6" />
      <circle cx={g.eyeR} cy={g.eyeY} r="25" fill="#FFFFFF44" stroke={INK} strokeWidth="6" />
      <line x1="175" y1={g.eyeY} x2="185" y2={g.eyeY} stroke={INK} strokeWidth="6" />
      <Eyes expr={expr} g={g} blink={blink} big={false} />
      <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
      {/* Ria và râu bạc */}
      <path d="M140 236 Q180 222 220 236 Q206 246 180 242 Q154 246 140 236 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
      <path d="M150 272 Q180 352 210 272 Q180 282 150 272 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    </g>
  );
};

const ThangChauHead: React.FC<{ expr: Expr; talk: number; blink: boolean }> = ({ expr, talk, blink }) => {
  const skin = LOOK.TC.skin;
  const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 202, browY: 174, mouthY: 250, browColor: INK };
  return (
    <g>
      <ellipse cx="92" cy="210" rx="15" ry="19" fill={skin} stroke={INK} strokeWidth="6" />
      <ellipse cx="268" cy="210" rx="15" ry="19" fill={skin} stroke={INK} strokeWidth="6" />
      <rect x="92" y="112" width="176" height="174" rx="80" fill={skin} stroke={INK} strokeWidth="7" />
      {/* Tóc ngố và chỏm tóc */}
      <path d="M86 164 C78 70 282 70 274 164 Q240 130 180 138 Q120 130 86 164 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
      <path d="M172 84 Q186 40 216 58 Q198 66 192 82" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      <Brows expr={expr} g={g} />
      <Eyes expr={expr} g={g} blink={blink} big />
      <ellipse cx="126" cy="230" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
      <ellipse cx="234" cy="230" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
      <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
    </g>
  );
};

// ---------------------------------------------------------------- thân

const Limb: React.FC<{ d: string; color: string; width: number }> = ({ d, color, width }) => (
  <>
    <path d={d} fill="none" stroke={INK} strokeWidth={width + 12} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const Legs: React.FC<{ look: Look; swing: number }> = ({ look, swing }) => (
  <>
    {[
      { x: 156, a: swing },
      { x: 204, a: -swing },
    ].map(({ x, a }) => {
      const fx = x + Math.sin(rad(a)) * LEG;
      const fy = HIP_Y + Math.cos(rad(a)) * LEG;
      return (
        <g key={x}>
          <Limb d={`M${x} ${HIP_Y} L${fx} ${fy}`} color={look.legs} width={22} />
          <ellipse cx={fx + 10} cy={fy + 8} rx="26" ry="14" fill={look.shoe} stroke={INK} strokeWidth="6" />
        </g>
      );
    })}
  </>
);

const Torso: React.FC<{ who: "CD" | "TC" }> = ({ who }) =>
  who === "CD" ? (
    <g>
      {/* Áo dài the */}
      <path d="M116 312 Q180 292 244 312 L262 478 Q180 492 98 478 Z" fill="#2B3A55" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      <path d="M180 300 L180 480" stroke="#22304A" strokeWidth="6" />
      <path d="M150 304 L180 344 L210 304" fill="none" stroke="#FFF8E7" strokeWidth="7" strokeLinecap="round" />
    </g>
  ) : (
    <g>
      {/* Áo thun cam + quần đùi xanh */}
      <path d="M122 422 L238 422 L246 466 L114 466 Z" fill="#3D7BD9" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      <path d="M118 312 Q180 294 242 312 L240 430 L120 430 Z" fill="#FF6B35" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      <path d="M152 304 Q180 324 208 304" fill="none" stroke="#FFD93D" strokeWidth="7" strokeLinecap="round" />
    </g>
  );

// ---------------------------------------------------------------- đạo cụ gắn trên người

const HeldProp: React.FC<{ prop: PropRef | null; at: { x: number; y: number }; fore: number; side: 1 | -1; mirrored: boolean; two: boolean }> = ({
  prop,
  at,
  fore,
  side,
  mirrored,
  two,
}) => {
  const id = propId(prop);
  if (!id) return null;
  const def = PROPS[id as keyof typeof PROPS];
  const text = propText(prop);
  if (def.mode === "extend") {
    return <g transform={`translate(${at.x} ${at.y}) rotate(${-side * fore})`}>{def.draw({ text, mirrored })}</g>;
  }
  return <g transform={`translate(${at.x} ${at.y + (two ? 62 : 22)})`}>{def.draw({ text, mirrored })}</g>;
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

type Role = {
  look: Look;
  Head: React.FC<{ expr: Expr; talk: number; blink: boolean }>;
  Torso: React.FC;
  /** Toạ độ y đáy đồ đội đầu. */
  headY: number;
};

const ROLES: Record<RoleId, Role> = {
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
};

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
};

/** Con rối vẽ trong khung PUPPET_W × PUPPET_H, đáy khung là mặt sàn. */
export const Puppet: React.FC<PuppetProps> = (p) => {
  const role = p.role ? ROLES[p.role] : null;
  const look = role ? role.look : LOOK[p.who];
  const arm = look.arm ?? 22;
  const front = armPoints(1, p.arms.front);
  const back = armPoints(-1, p.arms.back);
  const twoHanded = p.arms.front[1] < -60 && p.arms.back[1] < -60;
  const handAt = twoHanded ? { x: (front.h.x + back.h.x) / 2, y: (front.h.y + back.h.y) / 2 } : front.h;
  const armPath = (a: ReturnType<typeof armPoints>) => `M${a.s.x} ${a.s.y} L${a.e.x} ${a.e.y} L${a.h.x} ${a.h.y}`;

  return (
    <g transform={p.mirrored ? `translate(${PUPPET_W} 0) scale(-1 1)` : undefined}>
      <Worn prop={p.back} x={128} y={452} mirrored={p.mirrored} />
      <Legs look={look} swing={p.legSwing} />
      {role ? <role.Torso /> : <Torso who={p.who} />}
      <g transform={`rotate(${p.headTilt} 180 300)`}>
        {role ? (
          <role.Head expr={p.expr} talk={p.talk} blink={p.blink} />
        ) : p.who === "CD" ? (
          <CuDoHead expr={p.expr} talk={p.talk} blink={p.blink} />
        ) : (
          <ThangChauHead expr={p.expr} talk={p.talk} blink={p.blink} />
        )}
        <Worn prop={p.face} x={180} y={182} scale={0.72} mirrored={p.mirrored} />
        <Worn prop={p.head} x={180} y={role ? role.headY : p.who === "CD" ? 112 : 132} mirrored={p.mirrored} />
      </g>
      {[back, front].map((a, i) => (
        <Limb key={i} d={armPath(a)} color={look.sleeve} width={arm} />
      ))}
      <HeldProp prop={p.hand} at={handAt} fore={front.fore} side={1} mirrored={p.mirrored} two={twoHanded} />
      {[back, front].map((a, i) => (
        <circle key={i} cx={a.h.x} cy={a.h.y} r="15" fill={look.skin} stroke={INK} strokeWidth="6" />
      ))}
    </g>
  );
};
