/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 4 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-4.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 */
import type React from "react";
import type { Expr } from "../../lib/stage-types.ts";
import type { PropTuan4, RoleTuan4, SceneTuan4 } from "../../lib/story/tuan-4.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, LINE as INK, Lines, type PropDef } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";
import {
  Bamboo,
  Canopy,
  Cloud as VCloud,
  DistantTrees,
  FarMountains,
  GrassTuft,
  HangingLeaves,
  Hills,
  Jar,
  PAL,
  Reeds,
  SoftShadow,
  SkyRays,
  TileRoof,
  Tree,
  WarmSky,
  WaterBand,
} from "../village.tsx";

// ---------------------------------------------------------------- nét dùng chung

/** Mắt nhắm (thầy bói mù): cong xuống, vui thì cong lên. */
const ClosedEyes: React.FC<{ expr: Expr; g: FaceGeo }> = ({ expr, g }) => (
  <>
    {[g.eyeL, g.eyeR].map((x) => (
      <path
        key={x}
        d={expr === "happy" ? `M${x - 14} ${g.eyeY + 4} Q${x} ${g.eyeY - 10} ${x + 14} ${g.eyeY + 4}` : `M${x - 14} ${g.eyeY} Q${x} ${g.eyeY + 10} ${x + 14} ${g.eyeY}`}
        fill="none"
        stroke={INK}
        strokeWidth="6"
        strokeLinecap="round"
      />
    ))}
  </>
);

/** Áo dài chấm gối (thân y 300–480). */
const Robe: React.FC<{ fill: string; trim?: string }> = ({ fill, trim }) => (
  <>
    <path d="M116 312 Q180 292 244 312 L262 480 Q180 494 98 480 Z" fill={fill} stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {trim ? <path d="M150 304 L180 344 L210 304" fill="none" stroke={trim} strokeWidth="7" strokeLinecap="round" /> : null}
  </>
);

// ---------------------------------------------------------------- vai

const MIDAS_SKIN = "#F1C9A0";
const BARBER_SKIN = "#F3CFA6";
const BEO_SKIN = "#F3CFA6";
const GAY_SKIN = "#E2B48A";
const CROW = "#24212B";
const FOX = "#D9772E";
const TAM_SKIN = "#F8D8B8";
const CAM_SKIN = "#F3CFA6";
const DIGHE_SKIN = "#E2B48A";

export const roles: Record<RoleTuan4, Role> = {
  "midas-vua": {
    look: { skin: MIDAS_SKIN, sleeve: "#4B2E83", legs: "#F2EBDD", shoe: "#C9A227" },
    headY: 160,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 202, browY: 174, mouthY: 248, browColor: INK };
      return (
        <g>
          {/* Tai lừa dựng cao */}
          <path d="M124 150 Q64 50 98 -24 Q154 30 154 136 Z" fill="#A9A39A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M128 128 Q92 60 104 6 Q138 52 140 124 Z" fill="#F2C2C2" />
          <path d="M236 150 Q296 50 262 -24 Q206 30 206 136 Z" fill="#A9A39A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M232 128 Q268 60 256 6 Q222 52 220 124 Z" fill="#F2C2C2" />
          <rect x="92" y="112" width="176" height="178" rx="74" fill={MIDAS_SKIN} stroke={INK} strokeWidth="7" />
          {/* Tóc xoăn và vòng vàng */}
          <path d="M88 168 C80 92 280 92 272 168 Q250 140 226 150 Q204 128 180 146 Q156 128 134 150 Q110 140 88 168 Z" fill="#4A3424" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M96 150 Q180 122 264 150" fill="none" stroke="#E3B23C" strokeWidth="12" strokeLinecap="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Râu xoăn quanh cằm */}
          <path d="M100 232 Q96 326 180 336 Q264 326 260 232 Q244 282 180 284 Q116 282 100 232 Z" fill="#4A3424" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M116 312 Q180 292 244 312 L262 480 Q180 494 98 480 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Áo choàng tím viền vàng chéo vai */}
        <path d="M112 314 Q170 296 230 304 L150 482 Q120 484 98 480 Z" fill="#4B2E83" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M222 306 L144 478" stroke="#E3B23C" strokeWidth="8" strokeLinecap="round" />
        <rect x="104" y="408" width="152" height="16" rx="6" fill="#E3B23C" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "midas-tho-cao": {
    look: { skin: BARBER_SKIN, sleeve: "#2E2A3A", legs: "#2E2A3A", shoe: "#5C4128" },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 194, browY: 166, mouthY: 256, browColor: INK };
      return (
        <g>
          <ellipse cx="92" cy="206" rx="15" ry="20" fill={BARBER_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="268" cy="206" rx="15" ry="20" fill={BARBER_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="92" y="112" width="176" height="178" rx="80" fill={BARBER_SKIN} stroke={INK} strokeWidth="7" />
          {/* Đầu hói bóng, tóc hai bên mai */}
          <path d="M90 200 Q84 150 104 128 L112 196 Z M270 200 Q276 150 256 128 L248 196 Z" fill="#2E2A3A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <path d="M140 132 Q170 120 196 126" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Ria cong hai đầu */}
          <path d="M180 232 Q150 222 128 236 Q118 222 132 212 M180 232 Q210 222 232 236 Q242 222 228 212" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M116 312 Q180 292 244 312 L250 470 L110 470 Z" fill="#2E2A3A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Tạp dề trắng, túi có cái lược */}
        <path d="M136 330 L224 330 L236 476 L124 476 Z" fill="#F4F1E8" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="156" y="392" width="48" height="36" rx="4" fill="#F4F1E8" stroke={INK} strokeWidth="5" />
        <path d="M162 392 L162 378 M172 392 L172 378 M182 392 L182 378 M192 392 L192 378" stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  "thay-boi-beo": {
    look: { skin: BEO_SKIN, sleeve: "#3B2F2A", legs: "#F2EBDD", shoe: "#2E2420", arm: 26 },
    headY: 120,
    Head: ({ expr, talk }) => {
      const g: FaceGeo = { eyeL: 146, eyeR: 214, eyeY: 204, browY: 178, mouthY: 250, browColor: "#F4F1E8" };
      return (
        <g>
          <ellipse cx="84" cy="212" rx="15" ry="20" fill={BEO_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="276" cy="212" rx="15" ry="20" fill={BEO_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="84" y="116" width="192" height="176" rx="86" fill={BEO_SKIN} stroke={INK} strokeWidth="7" />
          {/* Khăn xếp */}
          <path d="M82 160 C78 80 282 80 278 160 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M88 140 Q180 112 272 140 M96 118 Q180 92 264 118" fill="none" stroke="#5A5560" strokeWidth="6" />
          <Brows expr={expr} g={g} />
          <ClosedEyes expr={expr} g={g} />
          <ellipse cx="116" cy="236" rx="12" ry="8" fill="#E89A8A" opacity="0.7" />
          <ellipse cx="244" cy="236" rx="12" ry="8" fill="#E89A8A" opacity="0.7" />
          {/* Râu bạc dài */}
          <path d="M140 262 Q180 380 220 262 Q180 276 140 262 Z" fill="#F4F1E8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          <path d="M134 238 Q180 222 226 238 Q206 248 180 244 Q154 248 134 238 Z" fill="#F4F1E8" stroke={INK} strokeWidth="5" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo the tối, bụng tròn */}
        <path d="M112 312 Q180 292 248 312 Q286 400 262 482 Q180 498 98 482 Q74 400 112 312 Z" fill="#3B2F2A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 344 L210 304" fill="none" stroke="#F2EBDD" strokeWidth="7" strokeLinecap="round" />
        {[370, 410, 450].map((y) => (
          <circle key={y} cx="196" cy={y} r="6" fill="#E3B23C" stroke={INK} strokeWidth="3" />
        ))}
      </g>
    ),
  },
  "thay-boi-gay": {
    look: { skin: GAY_SKIN, sleeve: "#D9CBAE", legs: "#5C4128", shoe: "#2E2420" },
    headY: 116,
    Head: ({ expr, talk }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 196, browY: 160, mouthY: 256, browColor: INK };
      return (
        <g>
          <ellipse cx="104" cy="208" rx="13" ry="20" fill={GAY_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="256" cy="208" rx="13" ry="20" fill={GAY_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="104" y="106" width="152" height="196" rx="66" fill={GAY_SKIN} stroke={INK} strokeWidth="7" />
          {/* Đầu hói, chỏm tóc buộc trên đỉnh */}
          <path d="M174 108 Q166 66 190 58 Q200 76 186 108 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M140 124 Q164 112 186 116" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
          <Brows expr={expr} g={g} />
          {/* Kính đen tròn */}
          <line x1="104" y1={g.eyeY - 6} x2="126" y2={g.eyeY - 4} stroke={INK} strokeWidth="5" />
          <line x1="256" y1={g.eyeY - 6} x2="234" y2={g.eyeY - 4} stroke={INK} strokeWidth="5" />
          <circle cx={g.eyeL} cy={g.eyeY} r="27" fill="#14121F" stroke={INK} strokeWidth="6" />
          <circle cx={g.eyeR} cy={g.eyeY} r="27" fill="#14121F" stroke={INK} strokeWidth="6" />
          <line x1="178" y1={g.eyeY} x2="182" y2={g.eyeY} stroke={INK} strokeWidth="6" />
          <path d={`M${g.eyeL - 12} ${g.eyeY - 12} q8 -6 16 -2 M${g.eyeR - 12} ${g.eyeY - 12} q8 -6 16 -2`} fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Râu dê */}
          <path d="M168 286 L180 340 L192 286 Z" fill="#2E2420" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M122 312 Q180 294 238 312 L252 480 Q180 492 108 480 Z" fill="#D9CBAE" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M156 304 L180 340 L204 304" fill="none" stroke="#5C4128" strokeWidth="6" strokeLinecap="round" />
        <rect x="112" y="404" width="136" height="22" rx="6" fill="#3B2F2A" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
  "qua-cao-qua": {
    look: { skin: "#4A4552", sleeve: CROW, legs: "#6B6670", shoe: "#6B6670", arm: 28 },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 142, eyeR: 196, eyeY: 192, browY: 160, mouthY: 0, browColor: "#B9B5C2" };
      const open = talk > 0 || expr === "happy" || expr === "shock";
      return (
        <g>
          {/* Chỏm lông */}
          <path d="M150 124 Q132 72 160 60 Q164 92 176 112 Q180 60 208 58 Q196 96 198 124 Z" fill={CROW} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <rect x="96" y="114" width="168" height="172" rx="80" fill={CROW} stroke={INK} strokeWidth="7" />
          {[g.eyeL, g.eyeR].map((x) => (
            <circle key={x} cx={x} cy={g.eyeY} r="18" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          ))}
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Mỏ to chĩa ngang */}
          {open ? (
            <>
              <path d="M210 226 L312 240 L210 262 Z" fill="#7A1E24" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
              <path d="M206 214 Q262 200 324 208 Q270 226 208 236 Z" fill="#C9C2B0" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
              <path d="M208 252 Q258 268 306 278 Q256 286 206 268 Z" fill="#C9C2B0" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <path d="M206 214 Q266 214 326 238 Q266 252 206 256 Z" fill="#C9C2B0" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
              <path d="M210 236 Q266 240 318 238" fill="none" stroke={INK} strokeWidth="4" />
            </>
          )}
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Đuôi lông đen sau lưng */}
        <path d="M124 420 L54 470 L70 440 L40 446 L64 416 L36 410 L118 384 Z" fill={CROW} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M114 312 Q180 290 246 312 Q262 410 236 470 Q180 486 124 470 Q98 410 114 312 Z" fill={CROW} stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[350, 390, 430].map((y) => (
          <path key={y} d={`M150 ${y} q15 12 30 0 q15 12 30 0`} fill="none" stroke="#5A5560" strokeWidth="5" strokeLinecap="round" />
        ))}
      </g>
    ),
  },
  "qua-cao-cao": {
    look: { skin: "#F4F1E8", sleeve: FOX, legs: "#4A2A14", shoe: "#2E2420" },
    headY: 130,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 146, eyeR: 214, eyeY: 194, browY: 168, mouthY: 266, browColor: INK };
      return (
        <g>
          {/* Tai nhọn */}
          <path d="M100 168 L86 50 L164 126 Z" fill={FOX} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M106 140 L98 80 L140 122 Z" fill="#3A2416" />
          <path d="M260 168 L274 50 L196 126 Z" fill={FOX} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M254 140 L262 80 L220 122 Z" fill="#3A2416" />
          <path d="M88 160 Q86 120 180 112 Q274 120 272 160 Q284 230 230 268 Q200 296 180 298 Q160 296 130 268 Q76 230 88 160 Z" fill={FOX} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          {/* Mõm trắng, má trắng */}
          <path d="M96 210 Q120 250 150 236 Q164 290 180 296 Q196 290 210 236 Q240 250 264 210 Q268 262 220 286 Q200 300 180 300 Q160 300 140 286 Q92 262 96 210 Z" fill="#F4F1E8" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <ellipse cx="180" cy="236" rx="16" ry="11" fill={INK} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Đuôi xù đầu trắng */}
        <path d="M130 440 Q40 470 18 380 Q6 320 52 296 Q60 380 140 398 Z" fill={FOX} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M18 380 Q6 320 52 296 Q50 330 58 352 Q36 360 18 380 Z" fill="#F4F1E8" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M116 312 Q180 292 244 312 L254 476 Q180 490 106 476 Z" fill={FOX} stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M148 306 Q180 330 212 306 Q222 400 180 440 Q138 400 148 306 Z" fill="#F4F1E8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      </g>
    ),
  },
  "tam-cam-tam": {
    look: { skin: TAM_SKIN, sleeve: "#F2EBDD", legs: "#2B2630", shoe: "#B8402E" },
    headY: 112,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 176, mouthY: 252, browColor: INK };
      return (
        <g>
          {/* Búi tóc cài hoa */}
          <circle cx="180" cy="94" r="38" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <circle cx="216" cy="80" r="14" fill="#F4F1E8" stroke={INK} strokeWidth="5" />
          <circle cx="216" cy="80" r="5" fill="#E3B23C" />
          <ellipse cx="96" cy="212" rx="13" ry="18" fill={TAM_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="264" cy="212" rx="13" ry="18" fill={TAM_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="96" y="116" width="168" height="176" rx="82" fill={TAM_SKIN} stroke={INK} strokeWidth="7" />
          <path d="M90 176 C82 92 278 92 270 176 Q236 134 180 140 Q124 134 90 176 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="124" cy="236" rx="12" ry="7" fill="#F2A08A" opacity="0.7" />
          <ellipse cx="236" cy="236" rx="12" ry="7" fill="#F2A08A" opacity="0.7" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy đen dài, áo tứ thân sáng, yếm, dải thắt lưng */}
        <path d="M120 420 L240 420 L262 486 L98 486 Z" fill="#2B2630" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M116 312 Q180 292 244 312 L246 440 L114 440 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M146 306 Q180 340 214 306 L210 420 L150 420 Z" fill="#E07B5A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="112" y="414" width="136" height="18" rx="6" fill="#7FA557" stroke={INK} strokeWidth="5" />
        <path d="M232 430 L242 470 M222 430 L226 468" stroke="#7FA557" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
  },
  "tam-cam-cam": {
    look: { skin: CAM_SKIN, sleeve: "#5E2A40", legs: "#2B2630", shoe: "#E3B23C" },
    headY: 116,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 176, mouthY: 254, browColor: INK };
      return (
        <g>
          {/* Hai búi tóc hai bên */}
          <circle cx="98" cy="122" r="30" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <circle cx="262" cy="122" r="30" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <path d="M80 112 L60 98 M280 112 L300 98" stroke="#E3B23C" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="96" cy="214" rx="13" ry="18" fill={CAM_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="264" cy="214" rx="13" ry="18" fill={CAM_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="96" y="116" width="168" height="176" rx="78" fill={CAM_SKIN} stroke={INK} strokeWidth="7" />
          <path d="M92 172 C86 96 274 96 268 172 Q262 150 240 146 L230 162 L214 144 Q180 136 146 144 L130 162 L120 146 Q98 150 92 172 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
          {/* Nốt ruồi */}
          <circle cx="214" cy="264" r="6" fill={INK} />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M120 420 L240 420 L262 486 L98 486 Z" fill="#2B2630" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M116 312 Q180 292 244 312 L246 440 L114 440 Z" fill="#5E2A40" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[
          [140, 340],
          [200, 330],
          [170, 372],
          [224, 380],
          [136, 400],
          [196, 412],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="#F2C2D2" />
        ))}
        <rect x="112" y="414" width="136" height="18" rx="6" fill="#E3B23C" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "tam-cam-di-ghe": {
    look: { skin: DIGHE_SKIN, sleeve: "#3B2A22", legs: "#2E2420", shoe: "#5C4128" },
    headY: 104,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 178, mouthY: 256, browColor: INK };
      return (
        <g>
          <ellipse cx="100" cy="214" rx="13" ry="20" fill={DIGHE_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="260" cy="214" rx="13" ry="20" fill={DIGHE_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="100" y="120" width="160" height="182" rx="70" fill={DIGHE_SKIN} stroke={INK} strokeWidth="7" />
          {/* Khăn vấn đen to tròn */}
          <path d="M78 172 C60 60 300 60 282 172 Q180 140 78 172 Z" fill="#14121F" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M84 150 Q180 112 276 150 M96 120 Q180 84 264 120" fill="none" stroke="#4A4552" strokeWidth="6" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Nếp nhăn, nốt ruồi */}
          <path d="M124 232 q8 10 0 20 M236 232 q-8 10 0 20 M126 186 q-8 -4 -14 2 M234 186 q8 -4 14 2" fill="none" stroke="#9C6B3C" strokeWidth="4" strokeLinecap="round" />
          <circle cx="140" cy="262" r="7" fill={INK} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#5A1414" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <Robe fill="#3B2A22" trim="#C9B79C" />
        <rect x="108" y="404" width="144" height="18" rx="6" fill="#8A8F99" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- đạo cụ

/** Miếng pho mát hình nêm: mặt trên sáng, mặt cắt sẫm, lỗ tròn, vệt bóng. */
const Cheese: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={20} rx={60} ry={9} />
    <path d="M-50 20 L50 20 L50 -14 L-50 -30 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-50 -30 L50 -14 L50 -6 L-50 -20 Z" fill="#FBE29A" />
    <path d="M-50 -30 L50 -14" stroke={INK} strokeWidth="4" />
    <path d="M14 20 L50 20 L50 -14 Q30 2 14 20 Z" fill="#B57A16" opacity="0.35" />
    <ellipse cx="-22" cy="2" rx="8" ry="7" fill="#B07A1C" stroke={INK} strokeWidth="2.5" />
    <ellipse cx="16" cy="8" rx="5" ry="5" fill="#B07A1C" stroke={INK} strokeWidth="2.5" />
    <ellipse cx="34" cy="-2" rx="6" ry="5" fill="#B07A1C" stroke={INK} strokeWidth="2.5" />
    <path d="M-40 -18 L-10 -13" stroke="#FFF6D8" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
  </g>
);

/** Thân lau sậy có bông nâu (dùng cho midas-lau-say). */
const ReedStem: React.FC<{ x: number; h: number; tip: number }> = ({ x, h, tip }) => (
  <g>
    <path d={`M${x} 0 Q${x + 10} ${-h / 2} ${tip} ${-h}`} fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    <path d={`M${x} 0 Q${x + 10} ${-h / 2} ${tip} ${-h}`} fill="none" stroke="#9AB866" strokeWidth="7" strokeLinecap="round" />
    <path d={`M${x - 1} -10 Q${x + 7} ${-h / 2} ${tip - 3} ${-h + 10}`} fill="none" stroke="#C9DB94" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <ellipse cx={tip - 2} cy={-h + 36} rx="14" ry="42" fill="url(#w-wood)" stroke={INK} strokeWidth="5" transform={`rotate(12 ${tip - 2} ${-h + 36})`} />
    <path d={`M${tip - 8} ${-h + 14} q-2 20 0 40`} fill="none" stroke="#E2B07A" strokeWidth="4" strokeLinecap="round" opacity="0.8" transform={`rotate(12 ${tip - 2} ${-h + 36})`} />
  </g>
);

export const props: Record<PropTuan4, PropDef> = {
  "midas-mu": {
    mode: "upright",
    draw: () => (
      <g>
        <defs>
          <linearGradient id="t4-cap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B84A4E" />
            <stop offset="1" stopColor="#6E2230" />
          </linearGradient>
        </defs>
        {/* Mũ trùm Phry-gi-a, chóp cong về trước */}
        <path d="M-124 6 Q-140 -150 -40 -214 Q50 -262 112 -186 Q150 -140 126 -110 Q104 -128 92 -112 Q130 -60 124 6 Z" fill="url(#t4-cap)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M40 -190 Q90 -160 92 -112 Q130 -60 124 6 L70 6 Q96 -80 40 -190 Z" fill="#4E1622" opacity="0.35" />
        <path d="M-90 -140 Q-30 -200 40 -206" fill="none" stroke="#E08A7E" strokeWidth="10" strokeLinecap="round" opacity="0.75" />
        <path d="M-100 -60 Q-104 -100 -84 -130" fill="none" stroke="#E08A7E" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
        <rect x="-130" y="-26" width="260" height="34" rx="10" fill="url(#w-brass)" stroke={INK} strokeWidth="7" />
        <path d="M-118 -16 L118 -16" stroke="#FFF0B8" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        {[-80, -30, 20, 70].map((x) => (
          <g key={x}>
            <circle cx={x} cy="-9" r="8" fill="url(#w-lacquer)" stroke={INK} strokeWidth="3" />
            <circle cx={x - 2.5} cy="-11.5" r="2.5" fill="#FFFFFF" opacity="0.8" />
          </g>
        ))}
      </g>
    ),
  },
  "midas-keo": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M-8 12 L10 120 L0 124 Z M8 12 L-10 120 L0 124 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-3 24 L5 100" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="-14" cy="0" r="14" fill="none" stroke={INK} strokeWidth="11" />
        <circle cx="14" cy="0" r="14" fill="none" stroke={INK} strokeWidth="11" />
        <circle cx="-14" cy="0" r="14" fill="none" stroke="#D9A23A" strokeWidth="5" />
        <circle cx="14" cy="0" r="14" fill="none" stroke="#D9A23A" strokeWidth="5" />
        <circle cx="0" cy="14" r="4" fill="#8F8F88" stroke={INK} strokeWidth="2.5" />
      </g>
    ),
  },
  "midas-xeng": {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-40" x2="0" y2="150" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-40" x2="0" y2="150" stroke="#9A6236" strokeWidth="10" strokeLinecap="round" />
        <line x1="-2" y1="-30" x2="-2" y2="140" stroke="#D9A46C" strokeWidth="3" strokeLinecap="round" />
        <rect x="-10" y="132" width="20" height="22" rx="4" fill="#8F8F88" stroke={INK} strokeWidth="4" />
        <path d="M-36 146 L36 146 L32 210 Q0 240 -32 210 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-22 158 L-20 206" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        <path d="M-30 214 Q0 236 30 214" fill="none" stroke="#7A4A2A" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      </g>
    ),
  },
  "midas-ho": {
    mode: "upright",
    draw: () => (
      <g>
        <defs>
          <radialGradient id="t4-hole" cx="0.5" cy="0.6" r="0.6">
            <stop offset="0" stopColor="#1E120A" />
            <stop offset="1" stopColor="#4A2E18" />
          </radialGradient>
        </defs>
        <SoftShadow cx={60} cy={2} rx={200} ry={20} />
        {/* Đống đất đào lên */}
        <path d="M80 4 Q100 -70 160 -76 Q220 -70 236 4 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M110 -30 Q130 -64 160 -66" fill="none" stroke="#E2A976" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <path d="M120 -40 l10 -6 M170 -50 l12 2 M200 -24 l8 -8" stroke="#5C341C" strokeWidth="6" strokeLinecap="round" />
        {[[100, -6], [228, -4], [150, -14]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="9" ry="6" fill="#B9AD98" stroke={INK} strokeWidth="3" />
        ))}
        {/* Miệng hố */}
        <ellipse cx="-20" cy="-4" rx="120" ry="30" fill="url(#w-clay)" stroke={INK} strokeWidth="7" />
        <ellipse cx="-20" cy="0" rx="96" ry="20" fill="url(#t4-hole)" />
        <path d="M-110 -10 Q-20 -36 70 -12" fill="none" stroke="#E2A976" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
      </g>
    ),
  },
  "midas-u-dat": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cx={-15} cy={2} rx={130} ry={14} />
        <path d="M-130 4 Q-60 -44 -20 -42 Q40 -44 100 4 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-90 -16 Q-50 -36 -20 -34" fill="none" stroke="#E2A976" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <path d="M-70 -20 l12 -4 M-20 -30 l12 4 M30 -18 l10 -6" stroke="#5C341C" strokeWidth="6" strokeLinecap="round" />
        {[[-104, -2], [74, -4]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="9" ry="6" fill="#B9AD98" stroke={INK} strokeWidth="3" />
        ))}
      </g>
    ),
  },
  "midas-lau-say": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <SoftShadow cy={2} rx={170} ry={18} />
        {/* Thân lau sậy nghiêng theo gió */}
        {[-90, -60, -30, 0, 30, 60, 90].map((x, i) => (
          <ReedStem key={x} x={x} h={360 + (i % 3) * 60} tip={x + 40} />
        ))}
        {[-110, -40, 50, 110].map((x, i) => (
          <path
            key={x}
            d={`M${x} 0 Q${x + (i % 2 ? 50 : -40)} -120 ${x + (i % 2 ? 90 : -60)} -170 Q${x + (i % 2 ? 30 : -10)} -100 ${x + 10} 0 Z`}
            fill={i % 2 ? PAL.leaf : PAL.leafDark}
            stroke={INK}
            strokeWidth="5"
            strokeLinejoin="round"
          />
        ))}
        {/* Gió và lời rì rào */}
        {text ? (
          <g>
            <path d="M-200 -560 Q-100 -610 0 -560 T200 -560 L200 -460 Q100 -410 0 -460 T-200 -460 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
            <path d="M-260 -520 q30 -14 50 0 M210 -500 q30 -14 50 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
            <Lines text={text} cy={-510} width={370} max={40} font={TEXT_FONT} />
          </g>
        ) : (
          <g>
            <path d="M-220 -470 q40 -20 80 0 t80 0 M60 -520 q40 -20 80 0 t80 0" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
            <path d="M-220 -470 q40 -20 80 0 t80 0 M60 -520 q40 -20 80 0 t80 0" fill="none" stroke="#FBF1DC" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}
      </g>
    ),
  },
  "thay-boi-gay-truc": {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-30" x2="0" y2="230" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <line x1="0" y1="-30" x2="0" y2="230" stroke="#C9A24E" strokeWidth="8" strokeLinecap="round" />
        <line x1="-2" y1="-24" x2="-2" y2="224" stroke="#F0D58A" strokeWidth="2.5" strokeLinecap="round" />
        {[40, 110, 180].map((y) => (
          <g key={y}>
            <line x1="-9" y1={y} x2="9" y2={y} stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <line x1="-4" y1={y + 5} x2="4" y2={y + 5} stroke="#8A6A2A" strokeWidth="2" />
          </g>
        ))}
      </g>
    ),
  },
  "thay-boi-voi": {
    mode: "upright",
    draw: () => (
      <g>
        <defs>
          <radialGradient id="t4-ele" cx="0.38" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#C4BBB0" />
            <stop offset="0.6" stopColor="#A39A90" />
            <stop offset="1" stopColor="#7E756C" />
          </radialGradient>
          <linearGradient id="t4-ele-leg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#B7AEA4" />
            <stop offset="1" stopColor="#857C72" />
          </linearGradient>
        </defs>
        <SoftShadow cx={-20} cy={-2} rx={360} ry={34} />
        {/* Đuôi bên phải, chổi lông đuôi */}
        <path d="M236 -580 Q292 -500 284 -380" fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <path d="M236 -580 Q292 -500 284 -380" fill="none" stroke="#A39A90" strokeWidth="9" strokeLinecap="round" />
        <path d="M270 -390 L262 -336 L278 -352 L284 -330 L294 -352 L306 -336 L300 -394 Z" fill="#3E322A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Chân phía xa */}
        <rect x="120" y="-400" width="84" height="390" rx="22" fill="#7A7068" stroke={INK} strokeWidth="8" />
        <rect x="-160" y="-400" width="84" height="390" rx="22" fill="#7A7068" stroke={INK} strokeWidth="8" />
        {/* Thân */}
        <ellipse cx="20" cy="-560" rx="250" ry="200" fill="url(#t4-ele)" stroke={INK} strokeWidth="9" />
        <path d="M-140 -660 Q-40 -740 100 -720" fill="none" stroke="#DDD5CA" strokeWidth="12" strokeLinecap="round" opacity="0.55" />
        {[[60, -520], [140, -600], [-20, -470], [180, -480]].map(([cx, cy], i) => (
          <path key={i} d={`M${cx} ${cy} q14 -8 28 0`} fill="none" stroke="#6E655C" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        ))}
        {/* Chân phía gần, to như cột đình */}
        <rect x="50" y="-430" width="100" height="432" rx="26" fill="url(#t4-ele-leg)" stroke={INK} strokeWidth="9" />
        <rect x="-134" y="-430" width="100" height="432" rx="26" fill="url(#t4-ele-leg)" stroke={INK} strokeWidth="9" />
        {[-134, 50].map((x) => (
          <g key={x}>
            <path d={`M${x + 18} -250 q30 -10 60 0 M${x + 22} -140 q26 -8 52 0`} fill="none" stroke="#6E655C" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            <path d={`M${x + 16} -6 q10 -16 20 0 M${x + 42} -6 q10 -16 20 0 M${x + 68} -6 q10 -16 20 0`} fill="#EDE3D2" stroke={INK} strokeWidth="5" />
          </g>
        ))}
        {/* Vòi buông dài xuống đất */}
        <path d="M-270 -600 Q-344 -480 -326 -320 Q-308 -160 -330 -70 Q-342 -24 -306 -14" fill="none" stroke={INK} strokeWidth="66" strokeLinecap="round" />
        <path d="M-270 -600 Q-344 -480 -326 -320 Q-308 -160 -330 -70 Q-342 -24 -306 -14" fill="none" stroke="#A39A90" strokeWidth="50" strokeLinecap="round" />
        <path d="M-290 -580 Q-350 -470 -338 -330" fill="none" stroke="#C9C0B4" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
        {[-460, -400, -340, -280, -220, -160].map((y) => (
          <path key={y} d={`M-344 ${y} q18 6 36 0`} fill="none" stroke={INK} strokeWidth="4" />
        ))}
        {/* Đầu */}
        <ellipse cx="-200" cy="-650" rx="125" ry="120" fill="url(#t4-ele)" stroke={INK} strokeWidth="9" />
        {/* Tai to như cái quạt thóc */}
        <path d="M-160 -750 Q-20 -770 -30 -610 Q-30 -470 -150 -500 Q-130 -620 -160 -750 Z" fill="#B7AEA4" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-142 -730 Q-50 -740 -54 -620 Q-56 -520 -136 -522 Q-118 -620 -142 -730 Z" fill="#D9A79A" opacity="0.55" />
        <path d="M-130 -700 Q-70 -690 -70 -620" fill="none" stroke="#857C72" strokeWidth="6" strokeLinecap="round" />
        {/* Ngà trắng */}
        <path d="M-236 -566 Q-246 -480 -320 -470 Q-276 -500 -262 -572 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <circle cx="-250" cy="-672" r="11" fill={INK} />
        <circle cx="-253" cy="-676" r="3.5" fill="#FFFFFF" />
        <path d="M-272 -700 q18 -10 34 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="-220" cy="-620" rx="16" ry="9" fill="#D9A79A" opacity="0.6" />
      </g>
    ),
  },
  "qua-cao-pho-mat-mo": {
    mode: "upright",
    draw: () => <Cheese x={176} y={74} s={1.6} />,
  },
  "qua-cao-pho-mat-cao": {
    mode: "upright",
    draw: () => <Cheese x={10} y={126} s={1.4} />,
  },
  "qua-cao-pho-mat": {
    mode: "upright",
    draw: () => <Cheese x={0} y={-30} s={1.4} />,
  },
  "tam-cam-hai": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={2} rx={84} ry={10} />
        <path d="M-70 0 Q-80 -40 -40 -46 L30 -50 Q72 -50 78 -10 Q80 4 60 4 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-66 -6 Q0 2 70 -4" fill="none" stroke="#5E1E16" strokeWidth="6" opacity="0.5" />
        <path d="M-50 -40 Q-20 -64 20 -46" fill="#3A1A12" stroke={INK} strokeWidth="5" />
        <path d="M-30 -24 q10 -12 20 0 q10 -12 20 0 M24 -28 l8 -8 l8 8 l-8 8 Z" fill="none" stroke="#F4C55A" strokeWidth="5" strokeLinejoin="round" />
        <path d="M60 -40 Q90 -56 100 -36 Q88 -30 72 -30" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-58 -30 Q-50 -42 -34 -42" fill="none" stroke="#F2A08A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <path d="M-70 0 L60 4" stroke="#E3B23C" strokeWidth="4" />
      </g>
    ),
  },
  "tam-cam-mu-phuong": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Cánh phượng hai bên */}
        <path d="M-100 -30 Q-170 -70 -190 -20 Q-150 -40 -110 -6 Z M100 -30 Q170 -70 190 -20 Q150 -40 110 -6 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-120 -32 Q-150 -48 -170 -34 M120 -32 Q150 -48 170 -34" fill="none" stroke="#A8362A" strokeWidth="4" strokeLinecap="round" />
        <path d="M-100 0 L-110 -70 L-60 -40 L-30 -110 L0 -60 L30 -110 L60 -40 L110 -70 L100 0 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-96 -12 L96 -12" stroke="#A8362A" strokeWidth="6" />
        <path d="M-80 -50 L-40 -32 M-30 -90 L-14 -54" stroke="#FFF0B8" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <circle cx="0" cy="-34" r="15" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
        <circle cx="-4" cy="-38" r="4" fill="#FFFFFF" opacity="0.8" />
        <circle cx="-56" cy="-24" r="8" fill={PAL.leaf} stroke={INK} strokeWidth="4" />
        <circle cx="56" cy="-24" r="8" fill={PAL.leaf} stroke={INK} strokeWidth="4" />
        {[-30, 0, 30].map((x) => (
          <g key={x}>
            <line x1={x} y1="0" x2={x} y2="26" stroke="#B07A22" strokeWidth="5" />
            <circle cx={x} cy="30" r="5" fill="#F6E9CF" stroke={INK} strokeWidth="2.5" />
          </g>
        ))}
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Cột đá Hy Lạp có rãnh, chân và đầu cột, đổ bóng phải. */
const GreekColumn: React.FC<{ x: number; top: number; bottom: number }> = ({ x, top, bottom }) => (
  <g>
    <rect x={x - 42} y={top} width="84" height={bottom - top} fill="url(#t4-col)" stroke={INK} strokeWidth="8" />
    {[-22, -4, 14].map((d) => (
      <line key={d} x1={x + d} y1={top + 14} x2={x + d} y2={bottom - 14} stroke="#C2A67E" strokeWidth="5" opacity="0.8" />
    ))}
    <line x1={x - 30} y1={top + 14} x2={x - 30} y2={bottom - 14} stroke="#FFFDF4" strokeWidth="6" opacity="0.8" />
    <path d={`M${x - 60} ${top} Q${x - 70} ${top - 24} ${x - 44} ${top - 28} L${x + 44} ${top - 28} Q${x + 70} ${top - 24} ${x + 60} ${top} Z`} fill="#EBDDC0" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <circle cx={x - 50} cy={top - 12} r="8" fill="none" stroke="#A8906A" strokeWidth="4" />
    <circle cx={x + 50} cy={top - 12} r="8" fill="none" stroke="#A8906A" strokeWidth="4" />
    <rect x={x - 58} y={bottom - 30} width="116" height="30" rx="4" fill="#EBDDC0" stroke={INK} strokeWidth="7" />
    <rect x={x - 50} y={bottom - 44} width="100" height="16" rx="4" fill="#EBDDC0" stroke={INK} strokeWidth="6" />
  </g>
);

/** Bình gốm Hy Lạp hai quai (tiền cảnh), đáy ở (x, y). */
const Amphora: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-4} rx={80} />
    <path d="M-34 -230 Q-80 -200 -46 -170" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
    <path d="M34 -230 Q80 -200 46 -170" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
    <path d="M-34 -230 Q-80 -200 -46 -170" fill="none" stroke="#B5643A" strokeWidth="8" strokeLinecap="round" />
    <path d="M34 -230 Q80 -200 46 -170" fill="none" stroke="#B5643A" strokeWidth="8" strokeLinecap="round" />
    <path d="M-26 -250 L26 -250 L22 -214 Q78 -190 72 -110 Q66 -40 30 -16 L36 0 L-36 0 L-30 -16 Q-66 -40 -72 -110 Q-78 -190 -22 -214 Z" fill="url(#t4-terra)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M-68 -130 L68 -130 L66 -96 L-66 -96 Z" fill="#2E1E14" />
    {[-48, -24, 0, 24, 48].map((dx) => (
      <path key={dx} d={`M${dx - 8} -104 l8 -18 l8 18`} fill="none" stroke="#E7B07A" strokeWidth="4" strokeLinejoin="round" />
    ))}
    <path d="M-32 -60 Q0 -48 32 -60" fill="none" stroke="#2E1E14" strokeWidth="6" />
    <path d="M-52 -180 Q-60 -150 -56 -120" fill="none" stroke="#F2C79A" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
    <rect x="-32" y="-262" width="64" height="16" rx="6" fill="#B5643A" stroke={INK} strokeWidth="6" />
  </g>
);

/** Cung điện Hy Lạp: tường đá kem, ô cửa nhìn trời chiều, trán tường, cột đá ấm, ngai vàng, rèm đỏ rượu, bình gốm hai mép. */
const MidasCung: React.FC = () => (
  <>
    <defs>
      <linearGradient id="t4-col" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFF7E6" />
        <stop offset="0.55" stopColor="#EADAB8" />
        <stop offset="1" stopColor="#BFA27A" />
      </linearGradient>
      <linearGradient id="t4-hall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#C99E6A" />
        <stop offset="1" stopColor="#E6CC9C" />
      </linearGradient>
      <linearGradient id="t4-curtain" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#6E2230" />
        <stop offset="0.5" stopColor="#A8404A" />
        <stop offset="1" stopColor="#7A2634" />
      </linearGradient>
      <linearGradient id="t4-terra" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#E09060" />
        <stop offset="0.6" stopColor="#C06A3E" />
        <stop offset="1" stopColor="#8A4422" />
      </linearGradient>
      <linearGradient id="t4-arch-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F3C98A" />
        <stop offset="1" stopColor="#FCEFD2" />
      </linearGradient>
    </defs>
    {/* Hậu cảnh: tường đá trong điện, ô cửa vòm nhìn ra trời chiều và đồi ô liu xa */}
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#t4-hall)" />
    {[300, 780].map((x) => (
      <g key={x}>
        <path d={`M${x - 90} 1000 L${x - 90} 700 Q${x} 600 ${x + 90} 700 L${x + 90} 1000 Z`} fill="url(#t4-arch-sky)" stroke={INK} strokeWidth="7" />
        <path d={`M${x - 90} 930 Q${x - 30} 880 ${x + 20} 910 Q${x + 60} 880 ${x + 90} 900 L${x + 90} 1000 L${x - 90} 1000 Z`} fill="#B9CC86" stroke="#6E5A3E" strokeWidth="4" />
        <circle cx={x + 30} cy="740" r="22" fill="#FFF3CF" />
        <path d={`M${x - 104} 1000 L${x + 104} 1000 L${x + 104} 1020 L${x - 104} 1020 Z`} fill="#EBDDC0" stroke={INK} strokeWidth="6" />
      </g>
    ))}
    {/* Diềm hoa văn chữ triện trên tường */}
    <rect x="0" y="540" width="1080" height="44" fill="#A8693A" stroke={INK} strokeWidth="6" />
    {Array.from({ length: 18 }, (_, i) => (
      <path key={i} d={`M${i * 62 + 8} 574 l0 -24 l36 0 l0 14 l-18 0 l0 -6`} fill="none" stroke="#F4D27A" strokeWidth="5" strokeLinejoin="round" />
    ))}
    {/* Ngai vàng giữa (sau nhân vật) */}
    <rect x="430" y="1100" width="220" height="140" fill="#8A5530" stroke={INK} strokeWidth="7" />
    <path d="M470 1150 L470 860 Q540 790 610 860 L610 1150 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M490 1120 L490 880 Q540 830 590 880" fill="none" stroke="#FFF0B8" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <circle cx="540" cy="880" r="16" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
    <rect x="446" y="1050" width="188" height="44" rx="12" fill="url(#t4-cap)" stroke={INK} strokeWidth="7" />
    <defs>
      <linearGradient id="t4-cap" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#B84A4E" />
        <stop offset="1" stopColor="#6E2230" />
      </linearGradient>
    </defs>
    {/* Trung cảnh: trán tường tam giác và hàng cột */}
    <path d="M110 430 L540 250 L970 430 Z" fill="#F2E6CC" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M190 412 L540 270 L890 412 Z" fill="#E2CFA8" stroke="#A8906A" strokeWidth="4" />
    <circle cx="540" cy="360" r="34" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
    <path d="M520 360 l20 -20 l20 20 l-20 20 Z" fill="none" stroke="#7A4A2A" strokeWidth="4" />
    <rect x="90" y="426" width="900" height="56" fill="#EBDDC0" stroke={INK} strokeWidth="9" />
    {Array.from({ length: 22 }, (_, i) => (
      <rect key={i} x={104 + i * 40} y="440" width="18" height="30" fill="#C9AE84" />
    ))}
    {[190, 400, 680, 890].map((x) => (
      <GreekColumn key={x} x={x} top={510} bottom={FLOOR} />
    ))}
    <Floor color="#E2CDA4" line="#C2A67E" />
    {/* Tiền cảnh: rèm đỏ rượu vén hai bên, bình gốm hai mép */}
    <path d="M-10 -10 L250 -10 Q170 160 110 420 Q70 640 60 900 L-10 900 Z" fill="url(#t4-curtain)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M1090 -10 L830 -10 Q910 160 970 420 Q1010 640 1020 900 L1090 900 Z" fill="url(#t4-curtain)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M40 0 Q50 300 30 880 M150 0 Q110 220 80 600 M1040 0 Q1030 300 1050 880 M930 0 Q970 220 1000 600" fill="none" stroke="#4E1622" strokeWidth="5" opacity="0.6" />
    <path d="M190 0 Q140 160 100 340" fill="none" stroke="#E08A7E" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
    {[[50, 900], [1030, 900]].map(([x, y]) => (
      <g key={x}>
        <rect x={x - 40} y={y - 20} width="80" height="30" rx="12" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
        <path d={`M${x} ${y + 10} l-14 50 l28 0 Z`} fill="#D9A23A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ))}
    <rect x="-10" y="-10" width="1100" height="40" fill="#7A2634" stroke={INK} strokeWidth="7" />
    <Amphora x={70} y={1360} s={0.9} />
    <Amphora x={1010} y={1380} s={1} />
  </>
);

/** Bãi đất ven sông: trời chiều ấm, núi xa, đồi, dòng sông, bờ cỏ; tiền cảnh khóm lau hai mép. */
const MidasDongCo: React.FC = () => (
  <>
    <WarmSky id="midas-sky" h={FLOOR} sun={[820, 400]} />
    <VCloud x={260} y={330} s={1.1} />
    <VCloud x={700} y={250} s={0.7} />
    <FarMountains peaks={[[180, 640, 300], [520, 700, 260], [880, 610, 320]]} foot={900} color="#D8C29C" shade="#BFA57E" line="#9A8262" />
    <Hills id="midas-h1" y={860} amp={60} waves={2} phase={0.6} top="#B9CC86" base="#8DAA5E" line="#6E5A3E" sw={5} />
    <Tree x={900} y={990} s={0.55} tone="far" />
    <Tree x={140} y={1000} s={0.42} tone="far" flip />
    <Hills id="midas-h2" y={990} amp={30} waves={2} phase={2} top="#A9C77A" base="#7FA557" />
    <WaterBand id="midas-water" y0={1060} y1={1170} />
    <path d={`M-20 1170 Q300 1150 540 1172 Q800 1192 1100 1166 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="#9DB86A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <Floor color="#9DB86A" line="#86A158" />
    <Reeds x={70} y={1250} s={1} />
    <Reeds x={1010} y={1250} s={0.9} flip />
    <GrassTuft x={240} y={1420} s={1.2} />
    <GrassTuft x={860} y={1480} s={1.3} flip />
    <SkyRays from={[820, 400]} opacity={0.12} />
  </>
);

/** Đình làng nhỏ nhìn chính diện (hậu cảnh), chân ở (x, y). */
const Dinh: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-4} rx={420} ry={30} />
    <rect x="-380" y="-40" width="760" height="40" fill="#A9553C" stroke={INK} strokeWidth="7" />
    <rect x="-340" y="-300" width="680" height="260" fill="#4A2E18" stroke={INK} strokeWidth="7" />
    <rect x="-120" y="-280" width="240" height="240" fill="#E9A94A" opacity="0.5" />
    <rect x="-120" y="-280" width="240" height="240" fill="url(#w-glow)" opacity="0.6" />
    {[-310, -170, -50, 50, 170, 310].map((px) => (
      <rect key={px} x={px - 16} y="-300" width="32" height="260" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" />
    ))}
    <g transform="translate(0 -294)">
      <TileRoof w={880} top={620} h={190} />
    </g>
    {/* Rồng chầu mặt trời trên bờ nóc */}
    <circle cx="0" cy="-526" r="22" fill="url(#w-brass)" stroke={INK} strokeWidth="5" />
    <path d="M-30 -520 q-30 -26 -70 -10 M30 -520 q30 -26 70 -10" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
  </g>
);

/** Cổng làng: hai trụ vôi vàng, mái ngói nhỏ trên, biển "ĐẦU LÀNG" giữa. */
const VillageGate: React.FC = () => (
  <g>
    <SoftShadow cx={265} cy={FLOOR - 4} rx={260} ry={26} />
    {/* Tường thấp hai bên cổng */}
    <rect x="-20" y="1060" width="110" height={FLOOR - 1060} fill="#E2C48A" stroke={INK} strokeWidth="7" />
    <rect x="440" y="1080" width="70" height={FLOOR - 1080} fill="#E2C48A" stroke={INK} strokeWidth="7" />
    {/* Trụ cổng */}
    {[115, 415].map((x) => (
      <g key={x}>
        <rect x={x - 38} y="660" width="76" height={FLOOR - 660} fill="url(#t4-pillar)" stroke={INK} strokeWidth="8" />
        <rect x={x - 48} y={FLOOR - 50} width="96" height="50" fill="#C9A26A" stroke={INK} strokeWidth="7" />
        <rect x={x - 46} y="640" width="92" height="30" fill="#C9A26A" stroke={INK} strokeWidth="7" />
        <rect x={x - 20} y="720" width="40" height="300" fill="none" stroke="#A9803E" strokeWidth="4" />
        {/* Mái nhỏ trên trụ */}
        <path d={`M${x - 64} 640 Q${x} 610 ${x + 64} 640 L${x + 44} 600 L${x - 44} 600 Z`} fill="url(#w-tile)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d={`M${x - 20} 600 Q${x} 560 ${x + 20} 600 Z`} fill="url(#w-brass)" stroke={INK} strokeWidth="5" />
      </g>
    ))}
    {/* Vòm cổng và mái chính */}
    <path d="M153 780 Q265 700 377 780 L377 740 L153 740 Z" fill="#E2C48A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <rect x="153" y="690" width="224" height="60" fill="#E2C48A" stroke={INK} strokeWidth="7" />
    <rect x="166" y="694" width="198" height="52" rx="5" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
    <text x="265" y="733" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="34" fill="#F6E2A8">
      ĐẦU LÀNG
    </text>
    <g transform="translate(265 690)">
      <path d="M-200 0 L-150 -60 L150 -60 L200 0 Q0 16 -200 0 Z" fill="url(#w-tile)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      {[-30, -45].map((yy, i) => (
        <path key={i} d={`M${-170 + i * 10} ${yy + 16} Q0 ${yy + 26} ${170 - i * 10} ${yy + 16}`} fill="none" stroke="#7E3324" strokeWidth="4" opacity="0.7" />
      ))}
      <path d="M-180 -70 Q-160 -56 -150 -60 L150 -60 Q160 -56 180 -70 Q170 -50 150 -50 L-150 -50 Q-170 -50 -180 -70 Z" fill="#7E3324" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <path d="M-206 2 Q-226 -4 -232 -30 M206 2 Q226 -4 232 -30" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
    </g>
  </g>
);

/** Đầu làng Bắc Bộ chiều nắng: lũy tre, cổng làng có biển, đình làng xa, cây đa, đường đất. */
const ThayBoiLang: React.FC = () => (
  <>
    <defs>
      <linearGradient id="t4-pillar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#F6E2B0" />
        <stop offset="0.6" stopColor="#E2C48A" />
        <stop offset="1" stopColor="#B8955A" />
      </linearGradient>
      <linearGradient id="t4-road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E6C892" />
        <stop offset="1" stopColor="#C9A26A" />
      </linearGradient>
    </defs>
    <WarmSky id="t4-tbl-sky" h={FLOOR} sun={[760, 360]} />
    <VCloud x={860} y={250} s={0.9} />
    <VCloud x={420} y={420} s={0.6} />
    <DistantTrees y={900} />
    <Hills id="t4-tbl-h" y={1010} amp={20} waves={2} phase={1} top="#B9CC86" base="#9DB86A" line="#6E5A3E" sw={5} />
    <Dinh x={760} y={1060} s={0.55} />
    {/* Lũy tre sau cổng */}
    <Bamboo x={60} y={1100} s={0.8} />
    <Bamboo x={300} y={1080} s={0.7} flip />
    <Bamboo x={500} y={1090} s={0.6} />
    {/* Đường đất vào làng */}
    <path d={`M180 1090 L350 1090 L700 ${FLOOR} L-20 ${FLOOR} L-20 1180 Z`} fill="url(#t4-road)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d={`M-20 1090 L180 1090 L-20 1180 Z M350 1090 L1100 1090 L1100 ${FLOOR} L700 ${FLOOR} Z`} fill="#A9C77A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <VillageGate />
    <Tree x={1010} y={1180} s={0.95} flip />
    <Floor color="#D2AE78" line="#B8925C" />
    <GrassTuft x={40} y={1300} s={1.1} />
    <GrassTuft x={1040} y={1330} s={1.2} flip />
    <GrassTuft x={130} y={1520} s={1.4} />
    <HangingLeaves side={1} y={-20} />
    <SkyRays from={[760, 360]} opacity={0.1} />
  </>
);

/** Khóm dương xỉ, gốc ở (x, y). */
const Fern: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {[-64, -32, 0, 30, 60].map((a, i) => {
      const h = 190 + (i % 2) * 40;
      // Lá răng cưa: mép phải đi lên, mép trái đi xuống.
      const right = Array.from({ length: 7 }, (_, k) => `L${(k % 2 ? 18 : 34) * (1 - k / 8)} ${-(h * (k + 1)) / 8}`).join(" ");
      const left = Array.from({ length: 7 }, (_, k) => `L${-(k % 2 ? 18 : 34) * (1 - (6 - k) / 8)} ${-(h * (7 - k)) / 8}`).join(" ");
      return (
        <g key={a} transform={`rotate(${a})`}>
          <path d={`M0 0 ${right} L0 ${-h} ${left} Z`} fill={i % 2 ? PAL.leaf : PAL.leafDark} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <path d={`M0 -6 L0 ${-h + 14}`} stroke={i % 2 ? PAL.leafDark : PAL.leafLight} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    })}
  </g>
);

/** Hai cây nấm nhỏ dưới tán rừng, gốc ở (x, y). */
const Mushroom: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <SoftShadow cy={0} rx={50} ry={8} />
    {[
      [-16, 1],
      [20, 0.7],
    ].map(([dx, k]) => (
      <g key={dx} transform={`translate(${dx} 0) scale(${k})`}>
        <rect x="-9" y="-46" width="18" height="46" rx="6" fill="#F6E9CF" stroke={INK} strokeWidth="5" />
        <path d="M-34 -40 Q-30 -82 0 -84 Q30 -82 34 -40 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="-12" cy="-62" r="6" fill="#FBF1DC" />
        <circle cx="12" cy="-54" r="4" fill="#FBF1DC" />
      </g>
    ))}
  </g>
);

/** Rừng chiều nắng: cây sồi to bên trái có cành thấp chìa ngang ngay dưới chân con rối đứng x ≈ 0.25, hàng cây xa, dương xỉ hai mép. */
const QuaCaoRung: React.FC = () => (
  <>
    <defs>
      <linearGradient id="t4-trunk" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#B87C48" />
        <stop offset="0.55" stopColor="#8A5530" />
        <stop offset="1" stopColor="#5C3A20" />
      </linearGradient>
    </defs>
    <WarmSky id="t4-qcr-sky" h={FLOOR} top="#F0C27E" bottom="#FAEBC8" sun={[820, 520]} />
    <VCloud x={860} y={300} s={0.8} />
    <DistantTrees y={880} color="#B7C690" line="#9A8A64" />
    {/* Hàng cây trung cảnh */}
    <Tree x={640} y={1040} s={0.5} tone="far" />
    <Tree x={980} y={1030} s={0.6} tone="far" flip />
    <Tree x={810} y={1100} s={0.62} />
    <Hills id="t4-qcr-h" y={1080} amp={24} waves={2} phase={2.2} top="#A9C77A" base="#86A158" line="#6E5A3E" sw={5} />
    {/* Cây sồi to bên trái */}
    <path d={`M20 ${FLOOR} Q60 1000 70 760 Q72 640 40 560 L250 560 Q210 660 214 780 Q220 1020 250 ${FLOOR} Z`} fill="url(#t4-trunk)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M100 700 q24 50 4 100 M180 930 q-18 40 0 90 M120 1080 q14 30 0 60" fill="none" stroke="#4A2B16" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="160" cy="980" rx="18" ry="26" fill="#3A2416" stroke={INK} strokeWidth="5" />
    <path d={`M20 ${FLOOR} Q-10 ${FLOOR - 10} -30 ${FLOOR} M250 ${FLOOR} Q290 ${FLOOR - 16} 320 ${FLOOR}`} fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    <path d="M230 600 Q320 560 400 500" fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
    <path d="M230 600 Q320 560 400 500" fill="none" stroke="#8A5530" strokeWidth="14" strokeLinecap="round" />
    <Canopy
      blobs={[
        [40, 380, 170],
        [220, 300, 160],
        [380, 430, 130],
        [-40, 560, 120],
        [180, 520, 130],
        [460, 520, 90],
      ]}
    />
    <Floor color="#A3BA6C" line="#8AA15A" />
    {/* Cành thấp chìa ngang làm chỗ đứng cho quạ */}
    <path d="M140 1180 Q300 1216 470 1226 Q500 1232 496 1256 Q330 1262 150 1290 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M200 1240 q60 -8 120 0" fill="none" stroke="#4A2E16" strokeWidth="6" strokeLinecap="round" />
    <path d="M180 1210 Q320 1228 460 1234" fill="none" stroke="#E2B07A" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
    <path d="M420 1226 Q450 1180 500 1170" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    <path d="M420 1226 Q450 1180 500 1170" fill="none" stroke="#8A5530" strokeWidth="7" strokeLinecap="round" />
    <path d="M500 1170 Q528 1150 552 1162 Q530 1180 500 1170 Z" fill={PAL.leaf} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M500 1170 Q514 1192 540 1196 Q526 1172 500 1170 Z" fill={PAL.leafDark} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    {/* Tiền cảnh: dương xỉ, nấm, cỏ mép phải */}
    <Fern x={1020} y={1300} s={1.1} flip />
    <Fern x={900} y={1500} s={0.9} />
    <Mushroom x={620} y={1330} />
    <GrassTuft x={70} y={1420} s={1.3} />
    <SkyRays from={[820, 520]} opacity={0.12} />
  </>
);

/** Đèn lồng đỏ treo, đỉnh dây ở (x, y). */
const Lantern: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y + 130} r="110" fill="url(#w-glow)" opacity="0.6" />
    <line x1={x} y1={y} x2={x} y2={y + 70} stroke={INK} strokeWidth="5" />
    <rect x={x - 24} y={y + 70} width="48" height="14" rx="3" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
    <ellipse cx={x} cy={y + 130} rx="46" ry="54" fill="url(#t4-lantern)" stroke={INK} strokeWidth="7" />
    {[-24, 0, 24].map((d) => (
      <path key={d} d={`M${x + d} ${y + 80} Q${x + d * 1.7} ${y + 130} ${x + d} ${y + 180}`} fill="none" stroke="#8A2C22" strokeWidth="3" opacity="0.7" />
    ))}
    <path d={`M${x - 26} ${y + 104} Q${x - 32} ${y + 128} ${x - 24} ${y + 152}`} fill="none" stroke="#FFD9A0" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    <rect x={x - 20} y={y + 178} width="40" height="12" rx="3" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
    <path d={`M${x - 8} ${y + 190} l0 46 M${x} ${y + 190} l0 54 M${x + 8} ${y + 190} l0 46`} stroke="#D9A23A" strokeWidth="4" strokeLinecap="round" />
  </g>
);

/** Đỉnh đồng / lư hương ba chân (tiền cảnh), đáy ở (x, y). */
const Censer: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-4} rx={100} />
    {[-50, 0, 50].map((dx) => (
      <path key={dx} d={`M${dx - 10} -60 L${dx - 14} 0 L${dx + 14} 0 L${dx + 10} -60 Z`} fill="#B07A22" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    ))}
    <path d="M-80 -150 L80 -150 Q90 -60 40 -50 L-40 -50 Q-90 -60 -80 -150 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M-60 -120 Q-60 -80 -36 -66" fill="none" stroke="#FFF0B8" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
    <path d="M-50 -110 q16 -12 32 0 q16 -12 32 0 q16 -12 32 0" fill="none" stroke="#7A4A16" strokeWidth="4" />
    <rect x="-92" y="-166" width="184" height="20" rx="8" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
    <path d="M-92 -160 Q-120 -190 -100 -210 M92 -160 Q120 -190 100 -210" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
    <path d="M-92 -160 Q-120 -190 -100 -210 M92 -160 Q120 -190 100 -210" fill="none" stroke="#D9A23A" strokeWidth="6" strokeLinecap="round" />
    <path d="M-20 -230 Q-36 -200 -14 -180 Q-30 -220 -20 -230 M10 -250 Q-6 -210 18 -186" fill="none" stroke="#E9DCC4" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
  </g>
);

/** Điện vua: xà gỗ chạm, hoành phi, cột sơn son rồng vàng, ngai rồng, đèn lồng, lư đồng hai mép. */
const TamCamCung: React.FC = () => (
  <>
    <defs>
      <linearGradient id="t4-tcc-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B8743E" />
        <stop offset="0.5" stopColor="#D9A86A" />
        <stop offset="1" stopColor="#E9C894" />
      </linearGradient>
      <radialGradient id="t4-lantern" cx="0.38" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#F27A5A" />
        <stop offset="0.6" stopColor="#C8402E" />
        <stop offset="1" stopColor="#8A2C22" />
      </radialGradient>
      <linearGradient id="t4-col-red" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#D85A44" />
        <stop offset="0.55" stopColor="#A8362A" />
        <stop offset="1" stopColor="#6E2018" />
      </linearGradient>
    </defs>
    {/* Hậu cảnh: vách gỗ trong điện, cửa bức bàn */}
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#t4-tcc-wall)" />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <rect x={20 + i * 116} y="560" width="108" height="440" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
        <rect x={34 + i * 116} y="580" width="80" height="200" fill="#5E3A20" />
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={50 + i * 116 + k * 16} y1="580" x2={50 + i * 116 + k * 16} y2="780" stroke="#C48D57" strokeWidth="4" />
        ))}
        <rect x={36 + i * 116} y="820" width="76" height="150" rx="4" fill="none" stroke="#6E4324" strokeWidth="4" />
      </g>
    ))}
    {/* Hoành phi sơn son thếp vàng */}
    <rect x="330" y="400" width="420" height="110" rx="10" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" />
    <rect x="346" y="414" width="388" height="82" rx="6" fill="none" stroke="#F4C55A" strokeWidth="5" />
    {[420, 500, 580, 660].map((x) => (
      <circle key={x} cx={x} cy="455" r="22" fill="none" stroke="#F4C55A" strokeWidth="6" />
    ))}
    {/* Bệ và ngai rồng giữa (sau nhân vật) */}
    <rect x="330" y="1110" width="420" height="130" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" />
    <rect x="300" y="1090" width="480" height="30" fill="url(#w-brass)" stroke={INK} strokeWidth="7" />
    <path d="M410 1090 L410 800 Q540 700 670 800 L670 1090 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M440 1060 L440 820 Q540 750 640 820 L640 1060 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <circle cx="540" cy="760" r="24" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" />
    <path d="M500 900 q40 -40 80 0 q-40 40 -80 0 Z" fill="none" stroke="#F4C55A" strokeWidth="5" />
    <path d="M410 840 q-50 -10 -60 40 q20 -10 40 0 M670 840 q50 -10 60 40 q-20 -10 -40 0" fill="url(#w-brass)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M430 1010 L650 1010" stroke="#F4C55A" strokeWidth="6" />
    {/* Trung cảnh: xà gỗ, diềm chạm, mái hiên */}
    <rect x="-20" y="0" width="1120" height="250" fill="url(#w-wood-dark)" />
    <rect x="-20" y="230" width="1120" height="70" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${i * 80 + 10} 284 q20 -36 40 0 q-20 -14 -40 0 Z`} fill="#D9A23A" stroke={INK} strokeWidth="3" />
    ))}
    <path d="M-20 300 L1100 300 L1100 330 Q540 352 -20 330 Z" fill="#5E3A20" stroke={INK} strokeWidth="6" />
    {/* Cột sơn son có rồng vàng quấn */}
    {[110, 970].map((x) => (
      <g key={x}>
        <rect x={x - 46} y="320" width="92" height={FLOOR - 320} fill="url(#t4-col-red)" stroke={INK} strokeWidth="8" />
        <path d={`M${x - 46} 520 q92 40 0 90 q-92 40 0 90 q92 40 0 90 q-92 40 0 90`} fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <path d={`M${x - 46} 520 q92 40 0 90 q-92 40 0 90 q92 40 0 90 q-92 40 0 90`} fill="none" stroke="#E3B23C" strokeWidth="10" strokeLinecap="round" />
        <path d={`M${x - 46} 500 q-6 -26 20 -30 q20 -2 26 20 Z`} fill="#E3B23C" stroke={INK} strokeWidth="5" />
        <line x1={x - 30} y1="340" x2={x - 30} y2={FLOOR - 40} stroke="#F28A70" strokeWidth="6" opacity="0.5" />
        <rect x={x - 62} y={FLOOR - 40} width="124" height="40" rx="6" fill="#B9AD98" stroke={INK} strokeWidth="7" />
      </g>
    ))}
    <Lantern x={290} y={330} />
    <Lantern x={790} y={330} />
    <Floor color="#B4644A" line="#954E38" />
    {/* Tiền cảnh: lư đồng hai mép */}
    <Censer x={60} y={1380} s={0.9} />
    <Censer x={1020} y={1400} s={1} />
  </>
);

/** Nhà tranh ban đêm của mẹ con Cám: vách đất ấm, mái tranh trong, cửa sổ có trăng, đèn dầu toả sáng, chõng tre, chum nước, nón lá trên vách. */
const TamCamNha: React.FC = () => (
  <>
    <defs>
      <radialGradient id="t4-tcn-wall" cx="0.25" cy="0.55" r="0.9">
        <stop offset="0" stopColor="#A9784A" />
        <stop offset="0.5" stopColor="#7A5232" />
        <stop offset="1" stopColor="#4A2E1C" />
      </radialGradient>
      <linearGradient id="t4-tcn-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2A2440" />
        <stop offset="1" stopColor="#4A3A52" />
      </linearGradient>
      <linearGradient id="t4-thatch" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5E4220" />
        <stop offset="1" stopColor="#A9762E" />
      </linearGradient>
    </defs>
    {/* Hậu cảnh: vách đất, vết trát */}
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#t4-tcn-wall)" />
    {Array.from({ length: 10 }, (_, i) => (
      <path key={i} d={`M${(i * 233) % 1000 + 30} ${520 + ((i * 157) % 560)} q40 -14 80 0`} fill="none" stroke="#5A3A22" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
    ))}
    {/* Khung cột tre */}
    {[40, 1040].map((x) => (
      <rect key={x} x={x - 22} y="300" width="44" height={FLOOR - 300} fill="url(#w-wood-h)" stroke={INK} strokeWidth="7" />
    ))}
    {/* Cửa sổ song tre, trời đêm có trăng */}
    <rect x="660" y="470" width="300" height="260" fill="url(#t4-tcn-night)" stroke={INK} strokeWidth="10" />
    <circle cx="860" cy="560" r="80" fill="#FFE7A8" opacity="0.18" />
    <circle cx="860" cy="560" r="42" fill="#FFF3CF" stroke="#E9C878" strokeWidth="4" />
    {[[720, 520], [930, 680], [700, 660]].map(([sx, sy], i) => (
      <circle key={i} cx={sx} cy={sy} r="4" fill="#FFF3CF" />
    ))}
    <path d="M660 700 Q760 650 820 690 Q890 640 960 690 L960 730 L660 730 Z" fill="#2E3A2A" opacity="0.8" />
    {[715, 770, 825, 880, 935].map((x) => (
      <rect key={x} x={x - 8} y="470" width="16" height="260" rx="6" fill="#C9A24E" stroke={INK} strokeWidth="4" />
    ))}
    <rect x="640" y="726" width="340" height="24" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
    {/* Nón lá treo vách */}
    <g transform="translate(470 560)">
      <path d="M-80 30 L0 -50 L80 30 Q0 46 -80 30 Z" fill="#E9CF94" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {[-40, -14, 14, 40].map((d) => (
        <line key={d} x1="0" y1="-50" x2={d * 1.9} y2={34 - Math.abs(d) * 0.08} stroke="#B89A5A" strokeWidth="3" />
      ))}
      <path d="M-50 0 L0 -40" stroke="#FFF3CF" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <circle cx="0" cy="-56" r="5" fill={INK} />
    </g>
    {/* Mái tranh nhìn từ trong */}
    <rect x="-20" y="0" width="1120" height="330" fill="url(#t4-thatch)" />
    {Array.from({ length: 24 }, (_, i) => (
      <line key={i} x1={i * 48} y1="0" x2={i * 48 - 18} y2={330 + Math.sin(i) * 14} stroke="#4A3216" strokeWidth="4" opacity="0.7" />
    ))}
    <path d="M-20 300 Q540 360 1100 300 L1100 340 Q540 400 -20 340 Z" fill="#A9762E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <rect x="-20" y="250" width="1120" height="30" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="6" />
    {/* Quầng đèn dầu và chõng tre (sau nhân vật) */}
    <circle cx="240" cy="1090" r="300" fill="url(#w-glow)" opacity="0.75" />
    {/* Chõng tre: mặt nan tre nhìn chếch, khung tre có đốt, chân thấp */}
    <SoftShadow cx={240} cy={1238} rx={220} ry={18} />
    {[
      [98, 1138, 1206],
      [432, 1138, 1206],
    ].map(([x, y0, y1]) => (
      <rect key={x} x={x - 9} y={y0} width="18" height={y1 - y0} rx="6" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
    ))}
    <path d="M44 1178 L404 1178 L444 1132 L84 1132 Z" fill="#D8B266" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {[0.2, 0.4, 0.6, 0.8].map((k) => (
      <line key={k} x1={44 + 40 * k} y1={1178 - 46 * k} x2={404 + 40 * k} y2={1178 - 46 * k} stroke="#A9853A" strokeWidth="4" />
    ))}
    {[0.1, 0.3, 0.5, 0.7, 0.9].map((k) => (
      <line key={`n${k}`} x1={44 + 360 * k} y1="1178" x2={84 + 360 * k} y2="1132" stroke="#B8944A" strokeWidth="2" opacity="0.6" />
    ))}
    <path d="M90 1140 L420 1140" stroke="#F4DE9A" strokeWidth="4" opacity="0.7" />
    {/* Khung tre trước và hông */}
    <rect x="36" y="1174" width="378" height="20" rx="10" fill="#C9A24E" stroke={INK} strokeWidth="6" />
    {[110, 200, 290, 370].map((x) => (
      <line key={x} x1={x} y1="1176" x2={x} y2="1192" stroke={INK} strokeWidth="4" />
    ))}
    <path d="M410 1184 L448 1138" stroke={INK} strokeWidth="18" strokeLinecap="round" />
    <path d="M410 1184 L448 1138" stroke="#B08A3E" strokeWidth="10" strokeLinecap="round" />
    {[
      [56, 1192],
      [394, 1192],
    ].map(([x, y]) => (
      <rect key={x} x={x - 11} y={y} width="22" height={FLOOR - y} rx="6" fill="#B08A3E" stroke={INK} strokeWidth="6" />
    ))}
    {/* Đèn dầu trên chõng */}
    <path d="M220 1158 L230 1118 L270 1118 L280 1158 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="238" y="1106" width="24" height="14" fill="#8A5530" stroke={INK} strokeWidth="4" />
    <path d="M250 1108 Q232 1076 250 1044 Q268 1076 250 1108 Z" fill="#FFB22C" stroke={INK} strokeWidth="5" />
    <path d="M250 1100 Q242 1082 250 1064 Q258 1082 250 1100 Z" fill="#FFF0B8" />
    {/* Bát nước chè cạnh đèn */}
    <path d="M320 1150 Q322 1130 346 1128 Q370 1130 372 1150 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M330 1140 Q346 1134 362 1140" stroke={PAL.blueGlaze} strokeWidth="3" fill="none" />
    <Floor color="#8A6A48" line="#74563A" />
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#w-glow)" opacity="0.15" />
    {/* Tiền cảnh: chum nước góc phải, bó rơm góc trái */}
    <Jar x={990} y={1390} s={1} />
    <g transform="translate(60 1380)">
      <SoftShadow cy={-4} rx={90} />
      <path d="M-70 0 Q-80 -70 -40 -110 L40 -110 Q80 -70 70 0 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {[-40, -20, 0, 20, 40].map((d) => (
        <line key={d} x1={d} y1="-104" x2={d * 1.3} y2="-6" stroke="#A9762E" strokeWidth="3" />
      ))}
      <rect x="-60" y="-66" width="120" height="14" fill="#8A5530" stroke={INK} strokeWidth="4" />
    </g>
  </>
);

export const scenes: Record<SceneTuan4, React.FC> = {
  "midas-cung": MidasCung,
  "midas-dong-co": MidasDongCo,
  "thay-boi-lang": ThayBoiLang,
  "qua-cao-rung": QuaCaoRung,
  "tam-cam-cung": TamCamCung,
  "tam-cam-nha": TamCamNha,
};
