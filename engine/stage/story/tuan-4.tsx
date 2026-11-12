/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 4 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-4.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 */
import type React from "react";
import type { Expr } from "../../lib/stage-types.ts";
import type { PropTuan4, RoleTuan4, SceneTuan4 } from "../../lib/story/tuan-4.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, INK, Lines, type PropDef } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";

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
          <path d="M96 150 Q180 122 264 150" fill="none" stroke="#E8C547" strokeWidth="12" strokeLinecap="round" />
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
        <path d="M222 306 L144 478" stroke="#E8C547" strokeWidth="8" strokeLinecap="round" />
        <rect x="104" y="408" width="152" height="16" rx="6" fill="#E8C547" stroke={INK} strokeWidth="5" />
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
    look: { skin: BEO_SKIN, sleeve: "#3B2F2A", legs: "#F2EBDD", shoe: "#1E1B2E", arm: 26 },
    headY: 120,
    Head: ({ expr, talk }) => {
      const g: FaceGeo = { eyeL: 146, eyeR: 214, eyeY: 204, browY: 178, mouthY: 250, browColor: "#F4F1E8" };
      return (
        <g>
          <ellipse cx="84" cy="212" rx="15" ry="20" fill={BEO_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="276" cy="212" rx="15" ry="20" fill={BEO_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="84" y="116" width="192" height="176" rx="86" fill={BEO_SKIN} stroke={INK} strokeWidth="7" />
          {/* Khăn xếp */}
          <path d="M82 160 C78 80 282 80 278 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
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
          <circle key={y} cx="196" cy={y} r="6" fill="#E8C547" stroke={INK} strokeWidth="3" />
        ))}
      </g>
    ),
  },
  "thay-boi-gay": {
    look: { skin: GAY_SKIN, sleeve: "#D9CBAE", legs: "#5C4128", shoe: "#1E1B2E" },
    headY: 116,
    Head: ({ expr, talk }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 196, browY: 160, mouthY: 256, browColor: INK };
      return (
        <g>
          <ellipse cx="104" cy="208" rx="13" ry="20" fill={GAY_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="256" cy="208" rx="13" ry="20" fill={GAY_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="104" y="106" width="152" height="196" rx="66" fill={GAY_SKIN} stroke={INK} strokeWidth="7" />
          {/* Đầu hói, chỏm tóc buộc trên đỉnh */}
          <path d="M174 108 Q166 66 190 58 Q200 76 186 108 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
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
          <path d="M168 286 L180 340 L192 286 Z" fill="#1E1B2E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
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
    look: { skin: "#F4F1E8", sleeve: FOX, legs: "#4A2A14", shoe: "#1E1B2E" },
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
    look: { skin: TAM_SKIN, sleeve: "#F2EBDD", legs: "#2B2630", shoe: "#C0392B" },
    headY: 112,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 176, mouthY: 252, browColor: INK };
      return (
        <g>
          {/* Búi tóc cài hoa */}
          <circle cx="180" cy="94" r="38" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <circle cx="216" cy="80" r="14" fill="#F4F1E8" stroke={INK} strokeWidth="5" />
          <circle cx="216" cy="80" r="5" fill="#E8C547" />
          <ellipse cx="96" cy="212" rx="13" ry="18" fill={TAM_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="264" cy="212" rx="13" ry="18" fill={TAM_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="96" y="116" width="168" height="176" rx="82" fill={TAM_SKIN} stroke={INK} strokeWidth="7" />
          <path d="M90 176 C82 92 278 92 270 176 Q236 134 180 140 Q124 134 90 176 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="124" cy="236" rx="12" ry="7" fill="#FF8FA3" opacity="0.7" />
          <ellipse cx="236" cy="236" rx="12" ry="7" fill="#FF8FA3" opacity="0.7" />
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
        <rect x="112" y="414" width="136" height="18" rx="6" fill="#3FA34D" stroke={INK} strokeWidth="5" />
        <path d="M232 430 L242 470 M222 430 L226 468" stroke="#3FA34D" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
  },
  "tam-cam-cam": {
    look: { skin: CAM_SKIN, sleeve: "#5E2A40", legs: "#2B2630", shoe: "#E8C547" },
    headY: 116,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 176, mouthY: 254, browColor: INK };
      return (
        <g>
          {/* Hai búi tóc hai bên */}
          <circle cx="98" cy="122" r="30" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <circle cx="262" cy="122" r="30" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <path d="M80 112 L60 98 M280 112 L300 98" stroke="#E8C547" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="96" cy="214" rx="13" ry="18" fill={CAM_SKIN} stroke={INK} strokeWidth="6" />
          <ellipse cx="264" cy="214" rx="13" ry="18" fill={CAM_SKIN} stroke={INK} strokeWidth="6" />
          <rect x="96" y="116" width="168" height="176" rx="78" fill={CAM_SKIN} stroke={INK} strokeWidth="7" />
          <path d="M92 172 C86 96 274 96 268 172 Q262 150 240 146 L230 162 L214 144 Q180 136 146 144 L130 162 L120 146 Q98 150 92 172 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
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
        <rect x="112" y="414" width="136" height="18" rx="6" fill="#E8C547" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "tam-cam-di-ghe": {
    look: { skin: DIGHE_SKIN, sleeve: "#3B2A22", legs: "#1E1B2E", shoe: "#5C4128" },
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

const Cheese: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-50 20 L50 20 L50 -14 L-50 -30 Z" fill="#F6D65A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-50 -30 L50 -14" stroke={INK} strokeWidth="4" />
    <circle cx="-22" cy="0" r="7" fill="#D9AE2E" />
    <circle cx="16" cy="6" r="5" fill="#D9AE2E" />
    <circle cx="34" cy="-4" r="6" fill="#D9AE2E" />
  </g>
);

export const props: Record<PropTuan4, PropDef> = {
  "midas-mu": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Mũ trùm Phry-gi-a, chóp cong về trước */}
        <path d="M-124 6 Q-140 -150 -40 -214 Q50 -262 112 -186 Q150 -140 126 -110 Q104 -128 92 -112 Q130 -60 124 6 Z" fill="#7A2E5A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-80 -150 Q-20 -200 50 -200" fill="none" stroke="#A85482" strokeWidth="10" strokeLinecap="round" />
        <rect x="-130" y="-26" width="260" height="34" rx="10" fill="#E8C547" stroke={INK} strokeWidth="7" />
        {[-80, -30, 20, 70].map((x) => (
          <circle key={x} cx={x} cy="-9" r="7" fill="#C0392B" stroke={INK} strokeWidth="3" />
        ))}
      </g>
    ),
  },
  "midas-keo": {
    mode: "extend",
    draw: () => (
      <g>
        <circle cx="-14" cy="0" r="14" fill="none" stroke={INK} strokeWidth="7" />
        <circle cx="14" cy="0" r="14" fill="none" stroke={INK} strokeWidth="7" />
        <path d="M-8 12 L10 120 L0 124 Z M8 12 L-10 120 L0 124 Z" fill="#C9CED6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "midas-xeng": {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-40" x2="0" y2="150" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-40" x2="0" y2="150" stroke="#9C6B3C" strokeWidth="10" strokeLinecap="round" />
        <path d="M-36 146 L36 146 L32 210 Q0 240 -32 210 Z" fill="#C9CED6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      </g>
    ),
  },
  "midas-ho": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M80 4 Q100 -70 160 -76 Q220 -70 236 4 Z" fill="#7A5A3A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M120 -40 l10 -6 M170 -50 l12 2 M200 -24 l8 -8" stroke="#5C4128" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="-20" cy="-4" rx="120" ry="30" fill="#5C4128" stroke={INK} strokeWidth="7" />
        <ellipse cx="-20" cy="0" rx="96" ry="20" fill="#14121F" />
      </g>
    ),
  },
  "midas-u-dat": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-130 4 Q-60 -44 -20 -42 Q40 -44 100 4 Z" fill="#7A5A3A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-70 -20 l12 -4 M-20 -30 l12 4 M30 -18 l10 -6" stroke="#5C4128" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "midas-lau-say": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        {/* Thân lau sậy nghiêng theo gió */}
        {[-90, -60, -30, 0, 30, 60, 90].map((x, i) => {
          const h = 360 + (i % 3) * 60;
          const tip = x + 40;
          return (
            <g key={x}>
              <path d={`M${x} 0 Q${x + 10} ${-h / 2} ${tip} ${-h}`} fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
              <path d={`M${x} 0 Q${x + 10} ${-h / 2} ${tip} ${-h}`} fill="none" stroke="#7FA65A" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx={tip - 2} cy={-h + 36} rx="13" ry="40" fill="#8A5A2E" stroke={INK} strokeWidth="5" transform={`rotate(12 ${tip - 2} ${-h + 36})`} />
            </g>
          );
        })}
        {[-110, -40, 50, 110].map((x, i) => (
          <path key={x} d={`M${x} 0 Q${x + (i % 2 ? 50 : -40)} -120 ${x + (i % 2 ? 90 : -60)} -170 Q${x + (i % 2 ? 30 : -10)} -100 ${x + 10} 0 Z`} fill="#5E8C3E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        ))}
        {/* Gió và lời rì rào */}
        {text ? (
          <g>
            <path d="M-200 -560 Q-100 -610 0 -560 T200 -560 L200 -460 Q100 -410 0 -460 T-200 -460 Z" fill="#F4F1E8" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
            <path d="M-260 -520 q30 -14 50 0 M210 -500 q30 -14 50 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
            <Lines text={text} cy={-510} width={370} max={40} font={TEXT_FONT} />
          </g>
        ) : (
          <path d="M-220 -470 q40 -20 80 0 t80 0 M60 -520 q40 -20 80 0 t80 0" fill="none" stroke="#F4F1E8" strokeWidth="8" strokeLinecap="round" />
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
        {[40, 110, 180].map((y) => (
          <line key={y} x1="-8" y1={y} x2="8" y2={y} stroke={INK} strokeWidth="5" />
        ))}
      </g>
    ),
  },
  "thay-boi-voi": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Đuôi bên phải, chổi lông đuôi */}
        <path d="M236 -580 Q292 -500 284 -380" fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <path d="M236 -580 Q292 -500 284 -380" fill="none" stroke="#9EA3AC" strokeWidth="9" strokeLinecap="round" />
        <path d="M270 -390 L262 -336 L278 -352 L284 -330 L294 -352 L306 -336 L300 -394 Z" fill="#3A3640" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Chân phía xa */}
        <rect x="120" y="-400" width="84" height="390" rx="22" fill="#7E838D" stroke={INK} strokeWidth="8" />
        <rect x="-160" y="-400" width="84" height="390" rx="22" fill="#7E838D" stroke={INK} strokeWidth="8" />
        {/* Thân */}
        <ellipse cx="20" cy="-560" rx="250" ry="200" fill="#9EA3AC" stroke={INK} strokeWidth="9" />
        {/* Chân phía gần, to như cột đình */}
        <rect x="50" y="-430" width="100" height="432" rx="26" fill="#9EA3AC" stroke={INK} strokeWidth="9" />
        <rect x="-134" y="-430" width="100" height="432" rx="26" fill="#9EA3AC" stroke={INK} strokeWidth="9" />
        {[-134, 50].map((x) => (
          <path key={x} d={`M${x + 16} -6 q10 -16 20 0 M${x + 42} -6 q10 -16 20 0 M${x + 68} -6 q10 -16 20 0`} fill="none" stroke={INK} strokeWidth="5" />
        ))}
        {/* Vòi buông dài xuống đất */}
        <path d="M-270 -600 Q-344 -480 -326 -320 Q-308 -160 -330 -70 Q-342 -24 -306 -14" fill="none" stroke={INK} strokeWidth="66" strokeLinecap="round" />
        <path d="M-270 -600 Q-344 -480 -326 -320 Q-308 -160 -330 -70 Q-342 -24 -306 -14" fill="none" stroke="#9EA3AC" strokeWidth="50" strokeLinecap="round" />
        {[-460, -400, -340, -280, -220, -160].map((y) => (
          <path key={y} d={`M-344 ${y} q18 6 36 0`} fill="none" stroke={INK} strokeWidth="4" />
        ))}
        {/* Đầu */}
        <ellipse cx="-200" cy="-650" rx="125" ry="120" fill="#9EA3AC" stroke={INK} strokeWidth="9" />
        {/* Tai to như cái quạt thóc */}
        <path d="M-160 -750 Q-20 -770 -30 -610 Q-30 -470 -150 -500 Q-130 -620 -160 -750 Z" fill="#B4B9C2" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-130 -700 Q-70 -690 -70 -620" fill="none" stroke="#7E838D" strokeWidth="6" strokeLinecap="round" />
        {/* Ngà trắng */}
        <path d="M-236 -566 Q-246 -480 -320 -470 Q-276 -500 -262 -572 Z" fill="#F4F1E8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <circle cx="-250" cy="-672" r="11" fill={INK} />
        <path d="M-272 -700 q18 -10 34 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
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
        <path d="M-70 0 Q-80 -40 -40 -46 L30 -50 Q72 -50 78 -10 Q80 4 60 4 Z" fill="#C0392B" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-50 -40 Q-20 -64 20 -46" fill="none" stroke={INK} strokeWidth="5" />
        <path d="M-30 -24 q10 -12 20 0 q10 -12 20 0 M24 -28 l8 -8 l8 8 l-8 8 Z" fill="none" stroke="#E8C547" strokeWidth="5" strokeLinejoin="round" />
        <path d="M60 -40 Q90 -56 100 -36 Q88 -30 72 -30" fill="#C0392B" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "tam-cam-mu-phuong": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-100 0 L-110 -70 L-60 -40 L-30 -110 L0 -60 L30 -110 L60 -40 L110 -70 L100 0 Z" fill="#E8C547" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Cánh phượng hai bên */}
        <path d="M-100 -30 Q-170 -70 -190 -20 Q-150 -40 -110 -6 Z M100 -30 Q170 -70 190 -20 Q150 -40 110 -6 Z" fill="#E8C547" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <circle cx="0" cy="-30" r="14" fill="#C0392B" stroke={INK} strokeWidth="5" />
        <circle cx="-56" cy="-20" r="8" fill="#3FA34D" stroke={INK} strokeWidth="4" />
        <circle cx="56" cy="-20" r="8" fill="#3FA34D" stroke={INK} strokeWidth="4" />
        {[-30, 0, 30].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="28" stroke="#E8C547" strokeWidth="5" />
        ))}
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

const Sky: React.FC<{ id: string; top: string; bottom: string }> = ({ id, top, bottom }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bottom} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill={`url(#${id})`} />
  </>
);

const Cloud: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF">
    <ellipse cx="0" cy="0" rx="90" ry="40" />
    <ellipse cx="-60" cy="12" rx="60" ry="30" />
    <ellipse cx="64" cy="10" rx="64" ry="32" />
  </g>
);

/** Cung điện Hy Lạp: cột đá trắng, trán tường tam giác, rèm tím, ngai vàng. */
const MidasCung: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#3A3448" />
    {/* Rèm tím hai bên */}
    <path d="M0 300 L250 300 Q200 700 250 1240 L0 1240 Z" fill="#5E3A7A" stroke={INK} strokeWidth="8" />
    <path d="M1080 300 L830 300 Q880 700 830 1240 L1080 1240 Z" fill="#5E3A7A" stroke={INK} strokeWidth="8" />
    {/* Trán tường tam giác */}
    <path d="M150 440 L540 280 L930 440 Z" fill="#E6E1D6" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <rect x="130" y="436" width="820" height="50" fill="#E6E1D6" stroke={INK} strokeWidth="9" />
    {/* Cột đá có rãnh */}
    {[200, 400, 680, 880].map((x) => (
      <g key={x}>
        <rect x={x - 42} y="486" width="84" height={FLOOR - 540} fill="#F4F1E8" stroke={INK} strokeWidth="8" />
        {[-20, 0, 20].map((d) => (
          <line key={d} x1={x + d} y1="500" x2={x + d} y2={FLOOR - 70} stroke="#BDB7AA" strokeWidth="5" />
        ))}
        <rect x={x - 56} y="486" width="112" height="26" fill="#E6E1D6" stroke={INK} strokeWidth="7" />
        <rect x={x - 56} y={FLOOR - 56} width="112" height="26" fill="#E6E1D6" stroke={INK} strokeWidth="7" />
      </g>
    ))}
    {/* Ngai vàng */}
    <path d="M470 1240 L470 860 Q540 800 610 860 L610 1240 Z" fill="#C9A227" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <rect x="450" y="1040" width="180" height="40" rx="10" fill="#7A2E5A" stroke={INK} strokeWidth="7" />
    <Floor color="#BDB7AA" line="#A9A397" />
  </>
);

/** Bãi đất ven sông: trời, đồi, dòng sông, nền cỏ. */
const MidasDongCo: React.FC = () => (
  <>
    <Sky id="midas-sky" top="#7CC4EA" bottom="#D7F0FB" />
    <circle cx="880" cy="360" r="62" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <Cloud x={240} y={400} s={1} />
    <path d={`M-20 900 Q200 700 420 860 Q620 720 840 850 Q980 760 1100 820 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="#8DBF6A" stroke={INK} strokeWidth="7" />
    {/* Dòng sông */}
    <path d={`M-20 1010 Q300 980 560 1010 Q820 1040 1100 1000 L1100 1110 Q800 1140 540 1110 Q280 1080 -20 1120 Z`} fill="#5FA8D3" stroke={INK} strokeWidth="6" />
    <path d="M120 1050 q40 -12 80 0 M520 1060 q40 -12 80 0 M860 1060 q40 -12 80 0" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    {/* Mấy cụm cỏ */}
    {[80, 980].map((x) => (
      <path key={x} d={`M${x - 40} 1180 L${x - 30} 1120 L${x - 10} 1176 L${x} 1100 L${x + 12} 1176 L${x + 30} 1120 L${x + 40} 1180 Z`} fill="#4F8A3A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    ))}
    <Floor color="#6DA845" line="#5E973A" />
  </>
);

/** Đầu làng: cổng làng, mái đình xa, lũy tre, đường đất. */
const ThayBoiLang: React.FC = () => (
  <>
    <Sky id="tbl-sky" top="#86C9EC" bottom="#E2F4FB" />
    <Cloud x={820} y={360} s={0.9} />
    {/* Lũy tre */}
    <path d={`M-20 880 Q60 640 140 860 Q200 600 300 860 Q380 660 440 870 L440 ${FLOOR} L-20 ${FLOOR} Z`} fill="#4F8A3A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    {/* Mái đình cong xa xa */}
    <rect x="620" y="760" width="360" height="200" fill="#D9C8A4" stroke={INK} strokeWidth="7" />
    {[680, 760, 840, 920].map((x) => (
      <rect key={x} x={x - 12} y="780" width="24" height="180" fill="#8E3B2F" stroke={INK} strokeWidth="5" />
    ))}
    <path d="M580 780 Q560 720 600 730 Q800 680 1000 730 Q1040 720 1020 780 Z" fill="#7A3A2A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M600 730 Q570 700 560 690 M1000 730 Q1030 700 1040 690" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    {/* Cổng làng */}
    <rect x="80" y="620" width="70" height={FLOOR - 620} fill="#CDB892" stroke={INK} strokeWidth="8" />
    <rect x="380" y="620" width="70" height={FLOOR - 620} fill="#CDB892" stroke={INK} strokeWidth="8" />
    <path d="M40 640 Q265 560 490 640 L490 680 L40 680 Z" fill="#7A3A2A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <rect x="160" y="690" width="210" height="60" rx="6" fill="#F4F1E8" stroke={INK} strokeWidth="6" />
    <text x="265" y="733" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="38" fill={INK}>
      ĐẦU LÀNG
    </text>
    <Floor color="#C9A877" line="#B5946A" />
  </>
);

/** Rừng ban ngày, gốc cây to bên trái có cành thấp chìa ngang ngay dưới chân con rối đứng x ≈ 0.25. */
const QuaCaoRung: React.FC = () => (
  <>
    <Sky id="qcr-sky" top="#9ED3EE" bottom="#E6F6FC" />
    <Cloud x={760} y={380} s={0.9} />
    {/* Rặng cây xa */}
    {[
      [600, 880, 130],
      [780, 860, 150],
      [960, 890, 130],
    ].map(([x, y, r]) => (
      <g key={x}>
        <rect x={x - 18} y={y} width="36" height={FLOOR - y} fill="#6B4423" stroke={INK} strokeWidth="6" />
        <circle cx={x} cy={y - 40} r={r} fill="#5E9C48" stroke={INK} strokeWidth="7" />
      </g>
    ))}
    {/* Cây to bên trái */}
    <path d={`M30 ${FLOOR} L60 560 L210 560 L230 ${FLOOR} Z`} fill="#6B4423" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M90 700 q20 40 0 80 M170 900 q-16 40 0 80" fill="none" stroke="#4A2E16" strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="160" cy="430" rx="260" ry="170" fill="#4F8A3A" stroke={INK} strokeWidth="9" />
    <ellipse cx="380" cy="500" rx="140" ry="100" fill="#4F8A3A" stroke={INK} strokeWidth="9" />
    <Floor color="#7DB357" line="#6CA048" />
    {/* Cành thấp chìa ngang làm chỗ đứng cho quạ */}
    <path d="M140 1180 Q300 1216 470 1226 Q500 1232 496 1256 Q330 1262 150 1290 Z" fill="#7A4E2D" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M200 1240 q60 -8 120 0" fill="none" stroke="#4A2E16" strokeWidth="6" strokeLinecap="round" />
    <path d="M420 1226 Q450 1180 500 1170" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    <path d="M420 1226 Q450 1180 500 1170" fill="none" stroke="#7A4E2D" strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="510" cy="1164" rx="26" ry="14" fill="#5E9C48" stroke={INK} strokeWidth="5" />
  </>
);

/** Điện vua: cột đỏ, ngai vàng, đèn lồng, mái cong. */
const TamCamCung: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#E9D7A8" />
    {/* Mái cong */}
    <path d="M-40 300 L1120 300 L1120 420 Q540 480 -40 420 Z" fill="#7A2E22" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M-40 420 Q-60 380 -20 380 M1120 420 Q1140 380 1100 380" fill="none" stroke={INK} strokeWidth="8" />
    {/* Ngai vàng giữa */}
    <rect x="400" y="760" width="280" height="300" rx="20" fill="#E8C547" stroke={INK} strokeWidth="8" />
    <path d="M440 760 Q540 660 640 760" fill="#E8C547" stroke={INK} strokeWidth="8" />
    <circle cx="540" cy="740" r="26" fill="#C0392B" stroke={INK} strokeWidth="6" />
    <rect x="420" y="980" width="240" height="40" rx="10" fill="#C0392B" stroke={INK} strokeWidth="6" />
    <rect x="360" y="1060" width="360" height="180" fill="#8E3B2F" stroke={INK} strokeWidth="8" />
    {/* Cột đỏ có rồng uốn */}
    {[120, 960].map((x) => (
      <g key={x}>
        <rect x={x - 40} y="420" width="80" height={FLOOR - 420} fill="#B03A2E" stroke={INK} strokeWidth="8" />
        <path d={`M${x - 40} 560 q80 40 0 90 q-80 40 0 90 q80 40 0 90`} fill="none" stroke="#E8C547" strokeWidth="10" />
      </g>
    ))}
    {/* Đèn lồng */}
    {[300, 780].map((x) => (
      <g key={x}>
        <line x1={x} y1="440" x2={x} y2="520" stroke={INK} strokeWidth="5" />
        <ellipse cx={x} cy="570" rx="44" ry="54" fill="#E5484D" stroke={INK} strokeWidth="7" />
        <rect x={x - 24} y="512" width="48" height="12" fill="#E8C547" stroke={INK} strokeWidth="4" />
        <path d={`M${x} 624 l0 40`} stroke="#E8C547" strokeWidth="6" />
      </g>
    ))}
    <Floor color="#B08A5C" line="#9C784C" />
  </>
);

/** Nhà tranh ban đêm của mẹ con Cám: vách đất, cửa sổ có trăng, đèn dầu trên chõng. */
const TamCamNha: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#6E5B44" />
    {Array.from({ length: 8 }, (_, i) => (
      <path key={i} d={`M${i * 140 + 30} ${600 + (i % 3) * 130} q40 -14 80 0`} fill="none" stroke="#5A4A36" strokeWidth="6" strokeLinecap="round" />
    ))}
    {/* Mái tranh trong */}
    <path d="M-40 0 L1120 0 L1120 340 Q540 420 -40 340 Z" fill="#8C6A2A" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    {Array.from({ length: 22 }, (_, i) => (
      <line key={i} x1={i * 52} y1="40" x2={i * 52 - 18} y2={360 + Math.sin(i) * 16} stroke="#6E521E" strokeWidth="5" />
    ))}
    {/* Cửa sổ song tre, trăng đêm */}
    <rect x="680" y="480" width="260" height="240" fill="#1A2244" stroke={INK} strokeWidth="10" />
    <circle cx="860" cy="560" r="40" fill="#FFF3C4" />
    {[730, 780, 830, 880].map((x) => (
      <line key={x} x1={x} y1="480" x2={x} y2="720" stroke="#8C6A2A" strokeWidth="10" />
    ))}
    {/* Chõng tre và đèn dầu */}
    <rect x="80" y="1040" width="300" height="26" fill="#C9A24E" stroke={INK} strokeWidth="7" />
    <rect x="100" y="1066" width="20" height="174" fill="#C9A24E" stroke={INK} strokeWidth="6" />
    <rect x="340" y="1066" width="20" height="174" fill="#C9A24E" stroke={INK} strokeWidth="6" />
    <circle cx="230" cy="960" r="90" fill="#FFE27A" opacity="0.25" />
    <path d="M200 1040 L210 990 L250 990 L260 1040 Z" fill="#7A4421" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M230 990 Q214 960 230 930 Q246 960 230 990 Z" fill="#FFB22C" stroke={INK} strokeWidth="5" />
    <Floor color="#7A6248" line="#6A543C" />
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
