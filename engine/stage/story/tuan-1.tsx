/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 1 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-1.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 *
 * Truyện: Há miệng chờ sung (tập 4), Ba chú heo con (tập 5), Thánh Gióng (tập 7).
 */
import type React from "react";
import type { Expr } from "../../lib/stage-types.ts";
import type { PropTuan1, RoleTuan1, SceneTuan1 } from "../../lib/story/tuan-1.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, INK, Lines, type PropDef } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";

type HeadProps = { expr: Expr; talk: number; blink: boolean };

// ================================================================ vai

/** Tai + khuôn mặt người cơ bản (khung như vai mẫu). */
const HumanFace: React.FC<{ skin: string; rx?: number }> = ({ skin, rx = 76 }) => (
  <>
    <ellipse cx="94" cy="208" rx="14" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
    <ellipse cx="266" cy="208" rx="14" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
    <rect x="94" y="112" width="172" height="178" rx={rx} fill={skin} stroke={INK} strokeWidth="7" />
  </>
);

/** Đầu heo: mặt tròn hồng, tai vểnh, mõm to có hai lỗ mũi. */
const PigHead: React.FC<HeadProps & { children?: React.ReactNode }> = ({ expr, talk, blink, children }) => {
  const skin = "#F4B3C2";
  const g: FaceGeo = { eyeL: 140, eyeR: 220, eyeY: 182, browY: 152, mouthY: 282, browColor: INK };
  return (
    <g>
      {/* Tai vểnh */}
      <path d="M100 150 L74 70 L150 122 Z" fill={skin} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      <path d="M260 150 L286 70 L210 122 Z" fill={skin} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      <ellipse cx="180" cy="208" rx="98" ry="96" fill={skin} stroke={INK} strokeWidth="7" />
      <ellipse cx="128" cy="244" rx="14" ry="9" fill="#FF8FA3" opacity="0.8" />
      <ellipse cx="232" cy="244" rx="14" ry="9" fill="#FF8FA3" opacity="0.8" />
      <Brows expr={expr} g={g} />
      <Eyes expr={expr} g={g} blink={blink} big />
      {/* Mõm */}
      <ellipse cx="180" cy="232" rx="44" ry="30" fill="#F7C6D2" stroke={INK} strokeWidth="7" />
      <ellipse cx="164" cy="232" rx="8" ry="12" fill={INK} />
      <ellipse cx="196" cy="232" rx="8" ry="12" fill={INK} />
      <Mouth expr={expr} y={g.mouthY} talk={talk} color="#C2185B" />
      {children}
    </g>
  );
};

const PIG_LOOK_ARM = 24;

export const roles: Record<RoleTuan1, Role> = {
  /** Người qua đường: nón lá sáng, áo nâu sẫm. */
  "sung-passerby": {
    look: { skin: "#E8B98A", sleeve: "#4A3426", legs: "#F2EBDD", shoe: "#E8B98A" },
    headY: 60,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 178, mouthY: 254, browColor: INK };
      return (
        <g>
          <HumanFace skin="#E8B98A" />
          <path d="M96 176 Q180 150 264 176 L262 140 Q180 120 98 140 Z" fill="#1E1B2E" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Quai nón */}
          <path d="M104 150 Q130 300 180 292 Q230 300 256 150" fill="none" stroke="#7A4E2D" strokeWidth="4" />
          {/* Nón lá */}
          <path d="M18 156 L180 26 L342 156 Q180 178 18 156 Z" fill="#EDE3C8" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          {[60, 100, 140].map((d) => (
            <path key={d} d={`M${18 + d * 0.9} ${156 - d * 0.8} Q180 ${170 - d} ${342 - d * 0.9} ${156 - d * 0.8}`} fill="none" stroke="#B9A77E" strokeWidth="4" />
          ))}
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M120 420 L240 420 L248 470 L112 470 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M114 312 Q180 292 246 312 L244 436 L116 436 Z" fill="#4A3426" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M180 304 L180 436" stroke="#2E2018" strokeWidth="6" />
        {[340, 372, 404].map((y) => (
          <circle key={y} cx="192" cy={y} r="6" fill="#E8C547" stroke={INK} strokeWidth="3" />
        ))}
      </g>
    ),
  },

  /** Heo anh: mũ rơm, áo sáng kẻ sọc. */
  "heo-anh": {
    look: { skin: "#F4B3C2", sleeve: "#FFF3B0", legs: "#F4B3C2", shoe: "#5A3A3A", arm: PIG_LOOK_ARM },
    headY: 110,
    Head: (p) => (
      <PigHead {...p}>
        {/* Mũ rơm */}
        <ellipse cx="180" cy="118" rx="128" ry="22" fill="#F2D675" stroke={INK} strokeWidth="7" />
        <path d="M110 118 Q112 52 180 50 Q248 52 250 118 Z" fill="#F2D675" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M112 104 Q180 92 248 104" fill="none" stroke="#C0392B" strokeWidth="10" />
        {[130, 160, 200, 230].map((x) => (
          <line key={x} x1={x} y1="66" x2={x - 6} y2="96" stroke="#C9A24E" strokeWidth="4" />
        ))}
      </PigHead>
    ),
    Torso: () => (
      <g>
        <path d="M122 422 L238 422 L246 466 L114 466 Z" fill="#7FB3E8" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M116 312 Q180 292 244 312 L240 430 L120 430 Z" fill="#FFF3B0" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[340, 370, 400].map((y) => (
          <line key={y} x1="122" y1={y} x2="238" y2={y} stroke="#E8A33D" strokeWidth="7" />
        ))}
      </g>
    ),
  },

  /** Heo út: khăn thợ sẫm, quần yếm sẫm, tay trần. */
  "heo-ut": {
    look: { skin: "#F4B3C2", sleeve: "#F4B3C2", legs: "#2B3A55", shoe: "#5A3A3A", arm: PIG_LOOK_ARM },
    headY: 120,
    Head: (p) => (
      <PigHead {...p}>
        {/* Khăn buộc đầu */}
        <path d="M96 150 Q100 92 180 88 Q260 92 264 150 Q180 126 96 150 Z" fill="#2B3A55" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M262 132 Q300 120 312 96 M262 140 Q304 146 318 128" fill="none" stroke="#2B3A55" strokeWidth="12" strokeLinecap="round" />
        {[130, 170, 210, 240].map((x) => (
          <circle key={x} cx={x} cy={118 + (x % 3) * 4} r="5" fill="#FFFFFF" />
        ))}
      </PigHead>
    ),
    Torso: () => (
      <g>
        <path d="M116 312 Q180 292 244 312 L240 430 L120 430 Z" fill="#FFFFFF" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Quần yếm */}
        <path d="M128 352 L232 352 L246 470 L114 470 Z" fill="#2B3A55" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M134 352 L126 306 M226 352 L234 306" stroke="#2B3A55" strokeWidth="14" strokeLinecap="round" />
        <rect x="156" y="372" width="48" height="36" rx="5" fill="#3E5279" stroke={INK} strokeWidth="5" />
        <circle cx="134" cy="360" r="7" fill="#E8C547" stroke={INK} strokeWidth="3" />
        <circle cx="226" cy="360" r="7" fill="#E8C547" stroke={INK} strokeWidth="3" />
      </g>
    ),
  },

  /** Sói: đầu xám đậm, tai nhọn, mõm dài nhe nanh. */
  soi: {
    look: { skin: "#6B6F7A", sleeve: "#2E2A33", legs: "#4A4550", shoe: "#6B6F7A", arm: 24 },
    headY: 90,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 146, eyeR: 206, eyeY: 180, browY: 150, mouthY: 262, browColor: INK };
      return (
        <g>
          {/* Tai nhọn */}
          <path d="M100 150 L96 40 L160 116 Z" fill="#6B6F7A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M228 120 L268 30 L276 150 Z" fill="#6B6F7A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M110 128 L108 74 L140 112 Z M240 118 L262 70 L264 132 Z" fill="#C9CED6" />
          <path d="M92 220 Q86 120 180 108 Q270 116 270 210 Q262 290 180 292 Q104 292 92 220 Z" fill="#6B6F7A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          {/* Lông má bờm xờm */}
          <path d="M94 230 L70 246 L98 254 L80 274 L112 270" fill="#6B6F7A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          {/* Mõm dài */}
          <path d="M160 216 Q230 196 330 222 Q340 250 310 262 Q240 280 168 270 Z" fill="#C9CED6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <ellipse cx="326" cy="226" rx="18" ry="14" fill={INK} />
          <ellipse cx="146" cy="180" rx="24" ry="22" fill="#F2EBDD" stroke={INK} strokeWidth="4" />
          <ellipse cx="206" cy="180" rx="24" ry="22" fill="#F2EBDD" stroke={INK} strokeWidth="4" />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Brows expr={expr} g={g} />
          {talk > 0 || expr === "shock" ? (
            <ellipse cx="250" cy="270" rx="44" ry={8 + talk * 14 + (expr === "shock" ? 10 : 0)} fill="#8B1E24" stroke={INK} strokeWidth="5" />
          ) : (
            <path d="M176 266 Q240 284 304 262" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          )}
          {/* Nanh */}
          <path d="M210 268 L218 290 L226 270 M270 266 L278 288 L286 264" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M116 312 Q180 292 244 312 L258 476 L230 462 L206 480 L180 462 L154 480 L130 462 L102 476 Z" fill="#2E2A33" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 352 L210 304" fill="#C9CED6" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M140 400 L160 412 M200 380 L222 392" stroke="#4A4550" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },

  /** Cậu bé Gióng: đầu trọc để chỏm, yếm đỏ. */
  "giong-boy": {
    look: { skin: "#F6C89F", sleeve: "#F6C89F", legs: "#FFF8E7", shoe: "#F6C89F" },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 206, browY: 178, mouthY: 254, browColor: INK };
      return (
        <g>
          <HumanFace skin="#F6C89F" rx={86} />
          {/* Chỏm tóc trái đào */}
          <path d="M150 122 Q160 70 196 82 Q214 100 200 124 Q176 112 150 122 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="124" cy="236" rx="12" ry="8" fill="#FF8FA3" opacity="0.75" />
          <ellipse cx="236" cy="236" rx="12" ry="8" fill="#FF8FA3" opacity="0.75" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M120 420 L240 420 L248 470 L112 470 Z" fill="#FFF8E7" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M118 312 Q180 296 242 312 L238 432 L122 432 Z" fill="#F6C89F" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Yếm đỏ */}
        <path d="M180 318 L234 372 L180 440 L126 372 Z" fill="#C0392B" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M150 340 L132 300 M210 340 L228 300" stroke="#C0392B" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },

  /** Tráng sĩ Gióng: mũ sắt có chóp, giáp sắt vảy sáng, khăn đỏ. */
  "giong-hero": {
    look: { skin: "#E9B48A", sleeve: "#B7BEC8", legs: "#5A606B", shoe: "#2A2730", arm: 28 },
    headY: 70,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 206, browY: 180, mouthY: 256, browColor: INK };
      return (
        <g>
          <HumanFace skin="#E9B48A" rx={70} />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Mũ sắt: chóp nhọn, vành, hai bên che tai */}
          <path d="M84 176 Q78 74 180 66 Q282 74 276 176 L262 178 Q250 128 180 124 Q110 128 98 178 Z" fill="#C9CED6" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          <path d="M84 170 L80 240 L104 232 L100 176 M276 170 L280 240 L256 232 L260 176" fill="#C9CED6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M166 70 L180 10 L194 70 Z" fill="#C9CED6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <circle cx="180" cy="14" r="10" fill="#C0392B" stroke={INK} strokeWidth="4" />
          <path d="M92 150 Q180 118 268 150" fill="none" stroke="#7B828E" strokeWidth="8" />
          <circle cx="180" cy="104" r="12" fill="#E8C547" stroke={INK} strokeWidth="4" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M116 312 Q180 292 244 312 L254 470 Q180 484 106 470 Z" fill="#B7BEC8" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[330, 362, 394, 426].map((y, r) =>
          [0, 1, 2, 3, 4].map((i) => (
            <path key={`${y}-${i}`} d={`M${124 + i * 24 + (r % 2) * 12} ${y} q12 16 24 0`} fill="none" stroke="#6E7682" strokeWidth="5" />
          )),
        )}
        <rect x="112" y="440" width="136" height="20" rx="6" fill="#5A606B" stroke={INK} strokeWidth="6" />
        {/* Khăn đỏ quàng cổ */}
        <path d="M128 302 Q180 330 232 302 L226 322 Q180 344 134 322 Z" fill="#C0392B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M134 318 Q100 360 84 420 L110 410 Q122 366 150 330 Z" fill="#C0392B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      </g>
    ),
  },

  /** Bà con làng Gióng: khăn mỏ quạ sẫm, áo tứ thân nâu, yếm trắng. */
  "giong-villager": {
    look: { skin: "#F3CFA6", sleeve: "#7A4E2D", legs: "#2E2A33", shoe: "#F3CFA6" },
    headY: 90,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 206, browY: 180, mouthY: 254, browColor: INK };
      return (
        <g>
          <HumanFace skin="#F3CFA6" rx={80} />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <ellipse cx="128" cy="236" rx="11" ry="7" fill="#FF8FA3" opacity="0.6" />
          <ellipse cx="232" cy="236" rx="11" ry="7" fill="#FF8FA3" opacity="0.6" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Khăn mỏ quạ: khăn sẫm trùm đầu, mỏ nhọn trên trán, hai vạt buông */}
          <path d="M82 236 Q70 110 180 92 Q290 110 278 236 L262 232 Q262 160 180 158 Q98 160 98 232 Z" fill="#2E2A33" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M148 100 L180 40 L212 100 Q180 90 148 100 Z" fill="#2E2A33" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M98 160 Q180 140 262 160" fill="none" stroke="#4A4550" strokeWidth="6" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy sẫm dài */}
        <path d="M118 410 L242 410 L256 482 L104 482 Z" fill="#2E2A33" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Yếm trắng, hai vạt áo tứ thân nâu */}
        <path d="M130 306 Q180 296 230 306 L232 420 L128 420 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M114 312 Q140 302 156 300 L150 428 L112 428 Z" fill="#7A4E2D" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M246 312 Q220 302 204 300 L210 428 L248 428 Z" fill="#7A4E2D" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="112" y="404" width="136" height="16" rx="6" fill="#C0392B" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },

  /** Giặc Ân: mũ nhọn đen có tua đỏ, râu xồm, giáp tối. */
  "giong-enemy": {
    look: { skin: "#D9A27A", sleeve: "#2E2A33", legs: "#2E2A33", shoe: "#1E1B2E", arm: 24 },
    headY: 90,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 200, browY: 172, mouthY: 248, browColor: INK };
      return (
        <g>
          <HumanFace skin="#D9A27A" rx={64} />
          {/* Lông mày rậm */}
          <g transform="translate(0 -2)">
            <Brows expr={expr === "neutral" ? "angry" : expr} g={g} />
          </g>
          <path d={`M126 ${g.browY - 2} L174 ${g.browY + 10} M234 ${g.browY - 2} L186 ${g.browY + 10}`} stroke={INK} strokeWidth="11" strokeLinecap="round" />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Râu xồm */}
          <path d="M106 236 Q110 330 180 340 Q250 330 254 236 Q236 262 220 252 Q200 270 180 258 Q160 270 140 252 Q124 262 106 236 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Mouth expr={expr} y={g.mouthY + 16} talk={talk} color="#8B1E24" />
          {/* Mũ nhọn đen, tua đỏ */}
          <path d="M80 160 Q82 120 120 104 L180 -6 L240 104 Q278 120 280 160 Q180 136 80 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          <path d="M180 -6 Q150 30 168 62 M180 -6 Q206 40 190 70" fill="none" stroke="#C0392B" strokeWidth="10" strokeLinecap="round" />
          <path d="M84 156 Q180 130 276 156" fill="none" stroke="#7B828E" strokeWidth="8" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M114 312 Q180 292 246 312 L256 474 Q180 488 104 474 Z" fill="#2E2A33" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[340, 380, 420].map((y) => (
          <rect key={y} x="128" y={y} width="104" height="26" rx="6" fill="#4A4550" stroke={INK} strokeWidth="5" />
        ))}
        <circle cx="180" cy="326" r="13" fill="#7B828E" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
};

// ================================================================ đạo cụ

/** Anh chàng lười nằm ngửa trên manh chiếu; đầu bên trái. `angry` = mồm ngậm sung, mặt cau có, bóng thoại. */
const LazyMan: React.FC<{ angry: boolean }> = ({ angry }) => {
  const skin = "#F0C49A";
  return (
    <g>
      {/* Manh chiếu */}
      <path d="M-280 0 L-262 -26 L276 -26 L292 0 Z" fill="#E8D9A8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {[-200, -120, -40, 40, 120, 200].map((x) => (
        <line key={x} x1={x} y1="-24" x2={x + 8} y2="-2" stroke="#B9A77E" strokeWidth="4" />
      ))}
      {/* Chân co gác lên nhau, bàn chân dựng */}
      <path d="M100 -60 L196 -122 L268 -50" fill="none" stroke={INK} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 -60 L196 -122 L268 -50" fill="none" stroke="#6B4423" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="270" cy="-74" rx="14" ry="30" fill={skin} stroke={INK} strokeWidth="6" />
      <path d="M90 -50 L250 -46" fill="none" stroke={INK} strokeWidth="42" strokeLinecap="round" />
      <path d="M90 -50 L250 -46" fill="none" stroke="#6B4423" strokeWidth="30" strokeLinecap="round" />
      <ellipse cx="262" cy="-74" rx="13" ry="28" fill={skin} stroke={INK} strokeWidth="6" />
      {/* Thân: áo cánh trắng có miếng vá */}
      <path d="M-112 -40 Q-118 -112 -60 -118 L84 -112 Q120 -100 118 -40 Q116 -28 100 -28 L-96 -28 Q-112 -28 -112 -40 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      <rect x="-10" y="-96" width="40" height="34" fill="#B9A77E" stroke={INK} strokeWidth="4" transform="rotate(-8 10 -79)" />
      <rect x="84" y="-74" width="34" height="18" rx="5" fill="#6B4423" stroke={INK} strokeWidth="5" />
      {/* Tay gối sau đầu */}
      <path d="M-70 -110 L-140 -150 L-220 -128" fill="none" stroke={INK} strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-70 -110 L-140 -150 L-220 -128" fill="none" stroke={skin} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
      {angry ? (
        <>
          {/* Tay giơ nắm đấm */}
          <path d="M40 -112 L60 -200 L30 -260" fill="none" stroke={INK} strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 -112 L60 -200 L30 -260" fill="none" stroke={skin} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="-268" r="22" fill={skin} stroke={INK} strokeWidth="6" />
        </>
      ) : (
        <>
          <path d="M40 -110 L70 -78 L20 -64" fill="none" stroke={INK} strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 -110 L70 -78 L20 -64" fill="none" stroke={skin} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {/* Đầu ngửa: đỉnh đầu bên trái, mặt hướng lên trời */}
      {/* Đầu nằm nghiêng, mặt ngửa lên trời: gáy + tóc bên trái, mũi chĩa lên, cằm bên phải */}
      <g transform="translate(-170 -92)">
        <ellipse cx="0" cy="0" rx="78" ry="68" fill={skin} stroke={INK} strokeWidth="7" />
        <path d="M-76 10 Q-84 -50 -30 -66 Q-20 -40 -40 -10 Q-40 30 -10 60 Q-60 60 -76 10 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="-14" cy="14" rx="14" ry="18" fill={skin} stroke={INK} strokeWidth="5" />
        {/* Mũi */}
        <path d="M2 -64 Q8 -94 26 -70" fill={skin} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {angry ? (
          <>
            {/* Mày cau, mắt trợn, má phồng ngậm sung */}
            <path d="M-26 -50 L4 -40" stroke={INK} strokeWidth="8" strokeLinecap="round" />
            <circle cx="-8" cy="-28" r="8" fill={INK} />
            <ellipse cx="44" cy="-30" rx="34" ry="30" fill={skin} stroke={INK} strokeWidth="6" />
            <circle cx="56" cy="-52" r="12" fill="#9BB25A" stroke={INK} strokeWidth="4" />
          </>
        ) : (
          <>
            {/* Mắt lim dim, miệng há thật to hướng lên trời */}
            <path d="M-24 -36 q12 10 24 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
            <g transform="rotate(-30 52 -46)">
              <ellipse cx="52" cy="-46" rx="30" ry="40" fill="#5A1418" stroke={INK} strokeWidth="7" />
              <path d="M30 -78 Q52 -88 74 -78" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="52" cy="-22" rx="16" ry="10" fill="#E5484D" />
            </g>
          </>
        )}
      </g>
      {angry ? (
        <g transform="translate(-200 -560)">
          <path d="M-150 -60 Q-150 -110 -90 -110 L90 -110 Q150 -110 150 -60 Q150 -10 90 -10 L-40 -10 L-90 40 L-80 -10 L-90 -10 Q-150 -10 -150 -60 Z" fill="#FFFFFF" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Lines text="LƯỜI THẾ!" cy={-60} width={260} max={56} color={INK} font={TEXT_FONT} />
        </g>
      ) : null}
    </g>
  );
};

const Fig: React.FC<{ y: number }> = ({ y }) => (
  <g transform={`translate(0 ${y}) scale(1.5)`}>
    <circle cx="0" cy="0" r="22" fill="#9BB25A" stroke={INK} strokeWidth="6" />
    <path d="M-4 -22 L0 -32 L6 -22" fill="#6B8E3A" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <circle cx="-7" cy="-6" r="5" fill="#E2EFB8" />
    <circle cx="6" cy="8" r="3" fill="#C0392B" opacity="0.7" />
  </g>
);

/** Thân nhà: rect tường + mái, dùng chung cho 3 nhà. */
const House: React.FC<{ kind: "straw" | "wood" | "brick" }> = ({ kind }) => {
  if (kind === "straw") {
    return (
      <g>
        <rect x="-140" y="-250" width="280" height="250" fill="#F2D675" stroke={INK} strokeWidth="8" />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${-128 + i * 21} -240 q-6 120 4 236`} fill="none" stroke="#C9A24E" strokeWidth="5" />
        ))}
        <path d="M-40 0 L-40 -130 Q0 -170 40 -130 L40 0 Z" fill="#3B2E1E" stroke={INK} strokeWidth="7" />
        {/* Mái rơm bờm xờm */}
        <path d="M-190 -230 L0 -440 L190 -230 L170 -214 L150 -232 L128 -210 L104 -230 L80 -208 L56 -228 L30 -206 L6 -228 L-20 -206 L-46 -228 L-70 -208 L-96 -230 L-120 -210 L-146 -232 L-168 -212 Z" fill="#E8C547" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[-120, -70, -20, 30, 80, 130].map((x) => (
          <line key={x} x1={x * 0.3} y1="-410" x2={x} y2="-238" stroke="#B5892A" strokeWidth="5" />
        ))}
      </g>
    );
  }
  if (kind === "wood") {
    return (
      <g>
        <rect x="-150" y="-270" width="300" height="270" fill="#A8743F" stroke={INK} strokeWidth="8" />
        {[-230, -190, -150, -110, -70, -30].map((y) => (
          <line key={y} x1="-150" y1={y} x2="150" y2={y} stroke="#6B4423" strokeWidth="5" />
        ))}
        {[-100, 20, 90].map((x, i) => (
          <circle key={x} cx={x} cy={-250 + i * 80} r="4" fill={INK} />
        ))}
        <rect x="-44" y="-150" width="88" height="150" fill="#5C3A1E" stroke={INK} strokeWidth="7" />
        <path d="M-180 -262 L0 -430 L180 -262 Z" fill="#6B4423" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[-120, -60, 0, 60, 120].map((x) => (
          <line key={x} x1={x} y1={-262 - (180 - Math.abs(x)) * 0.9} x2={x} y2="-264" stroke="#4A2E16" strokeWidth="5" />
        ))}
      </g>
    );
  }
  return (
    <g>
      {/* Ống khói */}
      <rect x="70" y="-470" width="56" height="120" fill="#B5452F" stroke={INK} strokeWidth="8" />
      <rect x="62" y="-484" width="72" height="22" fill="#5E626B" stroke={INK} strokeWidth="6" />
      <rect x="-160" y="-290" width="320" height="290" fill="#B5452F" stroke={INK} strokeWidth="8" />
      {Array.from({ length: 9 }, (_, r) => (
        <g key={r}>
          <line x1="-160" y1={-32 * (r + 1)} x2="160" y2={-32 * (r + 1)} stroke="#F2EBDD" strokeWidth="4" />
          {Array.from({ length: 5 }, (_, c) => (
            <line key={c} x1={-160 + c * 70 + (r % 2) * 35} y1={-32 * (r + 1)} x2={-160 + c * 70 + (r % 2) * 35} y2={-32 * r} stroke="#F2EBDD" strokeWidth="4" />
          ))}
        </g>
      ))}
      <rect x="-50" y="-160" width="100" height="160" rx="10" fill="#4A2E16" stroke={INK} strokeWidth="7" />
      <circle cx="30" cy="-80" r="7" fill="#E8C547" stroke={INK} strokeWidth="3" />
      <rect x="70" y="-230" width="70" height="70" fill="#FFE27A" stroke={INK} strokeWidth="7" />
      <path d="M105 -230 L105 -160 M70 -195 L140 -195" stroke={INK} strokeWidth="6" />
      <path d="M-196 -282 L0 -440 L196 -282 Z" fill="#4A4550" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M-150 -306 L150 -306 M-100 -346 L100 -346 M-50 -386 L50 -386" stroke="#2E2A33" strokeWidth="6" />
    </g>
  );
};

/** Nong tre tròn đặt dưới đất; con là đồ đựng bên trên. */
const Nong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g>
    <ellipse cx="0" cy="-26" rx="170" ry="30" fill="#C9A24E" stroke={INK} strokeWidth="7" />
    {children}
    <path d="M-170 -26 Q-168 -6 0 -2 Q168 -6 170 -26 Q168 -10 0 -12 Q-168 -10 -170 -26 Z" fill="#9C7A3A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {[-120, -70, -20, 30, 80, 130].map((x) => (
      <line key={x} x1={x} y1="-14" x2={x + 10} y2="-4" stroke="#6B4E1E" strokeWidth="4" />
    ))}
  </g>
);

export const props: Record<PropTuan1, PropDef> = {
  "sung-lazy-man": { mode: "upright", draw: () => <LazyMan angry={false} /> },
  "sung-lazy-angry": { mode: "upright", draw: () => <LazyMan angry /> },
  "sung-fig": { mode: "upright", draw: () => <Fig y={-34} /> },
  "sung-fig-fall": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-12 -420 L-12 -380 M0 -440 L0 -380 M12 -420 L12 -380" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        <Fig y={-340} />
      </g>
    ),
  },

  "heo-straw-house": { mode: "upright", draw: () => <House kind="straw" /> },
  "heo-wood-house": { mode: "upright", draw: () => <House kind="wood" /> },
  "heo-brick-house": { mode: "upright", draw: () => <House kind="brick" /> },
  "heo-straw-ruin": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-150 0 Q-100 -50 -20 -40 Q40 -70 110 -30 Q150 -20 160 0 Z" fill="#E8C547" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Cọng rơm bay tung */}
        {[
          [-180, -200, -30],
          [-90, -330, 20],
          [10, -260, -60],
          [100, -380, 40],
          [170, -220, -20],
          [-40, -440, 70],
          [60, -150, 10],
          [-150, -120, 50],
        ].map(([x, y, r]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <rect x="-40" y="-5" width="80" height="10" rx="5" fill="#F2D675" stroke={INK} strokeWidth="4" />
          </g>
        ))}
        <path d="M-200 -300 q30 -20 60 0 M120 -300 q30 -20 60 0 M-60 -180 q30 -20 60 0" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "heo-wood-ruin": {
    mode: "upright",
    draw: () => (
      <g>
        {[
          [-90, -30, 18],
          [70, -40, -22],
          [-10, -70, 6],
          [-120, -90, 62],
          [110, -100, -58],
          [20, -120, -14],
        ].map(([x, y, r]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <rect x="-110" y="-16" width="220" height="32" rx="4" fill="#A8743F" stroke={INK} strokeWidth="6" />
            <line x1="-90" y1="0" x2="90" y2="0" stroke="#6B4423" strokeWidth="4" />
          </g>
        ))}
        <path d="M-80 -210 L0 -170 L60 -230" fill="none" stroke="#6B4423" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  "heo-straw-bundle": {
    mode: "upright",
    draw: () => (
      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-36 + i * 9} y1="0" x2={-60 + i * 15} y2="-170" stroke={INK} strokeWidth="11" strokeLinecap="round" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-36 + i * 9} y1="0" x2={-60 + i * 15} y2="-170" stroke="#F2D675" strokeWidth="6" strokeLinecap="round" />
        ))}
        <rect x="-36" y="-96" width="72" height="16" rx="6" fill="#C0392B" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "heo-plank": {
    mode: "upright",
    draw: () => (
      <g transform="rotate(-20)">
        <rect x="-24" y="-220" width="48" height="240" rx="4" fill="#A8743F" stroke={INK} strokeWidth="7" />
        <path d="M-10 -200 q6 60 0 120 M10 -150 q-6 50 0 120" fill="none" stroke="#6B4423" strokeWidth="4" />
      </g>
    ),
  },
  "heo-brick": {
    mode: "upright",
    draw: () => (
      <g>
        {[0, 1, 2].map((r) => (
          <g key={r} transform={`translate(${(r % 2) * 10 - 5} ${-r * 34})`}>
            <rect x="-56" y="-32" width="112" height="32" rx="3" fill="#B5452F" stroke={INK} strokeWidth="6" />
            <line x1="0" y1="-32" x2="0" y2="0" stroke="#F2EBDD" strokeWidth="4" />
          </g>
        ))}
      </g>
    ),
  },

  "giong-nong-com": {
    mode: "upright",
    draw: () => (
      <Nong>
        <path d="M-140 -32 Q-120 -150 0 -158 Q120 -150 140 -32 Z" fill="#FFFFFF" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[
          [-70, -80],
          [-20, -120],
          [40, -96],
          [80, -60],
          [-100, -50],
          [10, -60],
        ].map(([x, y]) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="7" ry="4" fill="#E6E1D3" />
        ))}
        <path d="M-40 -170 q-10 -30 6 -50 M10 -176 q-10 -30 6 -50 M60 -168 q-10 -30 6 -50" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      </Nong>
    ),
  },
  "giong-nong-ca": {
    mode: "upright",
    draw: () => (
      <Nong>
        {[
          [-120, -40],
          [-70, -44],
          [-20, -46],
          [30, -46],
          [80, -44],
          [126, -40],
          [-96, -78],
          [-46, -84],
          [4, -86],
          [54, -84],
          [102, -78],
          [-70, -118],
          [-20, -124],
          [30, -122],
          [78, -114],
        ].map(([x, y]) => (
          <g key={`${x}${y}`}>
            <circle cx={x} cy={y} r="26" fill="#4B2E5A" stroke={INK} strokeWidth="5" />
            <path d={`M${x - 10} ${y - 24} L${x} ${y - 34} L${x + 10} ${y - 24} Z`} fill="#3FA34D" stroke={INK} strokeWidth="3" />
            <circle cx={x - 8} cy={y - 8} r="6" fill="#FFFFFF" opacity="0.5" />
          </g>
        ))}
      </Nong>
    ),
  },
  "giong-rice-basket": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-70 -60 Q-60 -150 0 -150 Q60 -150 70 -60 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-92 -70 L92 -70 Q84 0 0 0 Q-84 0 -92 -70 Z" fill="#C9A24E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[-60, -30, 0, 30, 60].map((x) => (
          <line key={x} x1={x} y1="-66" x2={x * 0.8} y2="-6" stroke="#9C7A3A" strokeWidth="4" />
        ))}
        <path d="M-92 -70 L92 -70" stroke="#9C7A3A" strokeWidth="10" />
      </g>
    ),
  },
  "giong-iron-horse": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Lửa phun từ miệng */}
        <path d="M440 -380 Q520 -440 620 -400 Q570 -390 600 -350 Q530 -366 540 -320 Q490 -360 440 -350 Z" fill="#FF8C1A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M456 -374 Q510 -404 570 -392 Q536 -380 550 -356 Q506 -370 456 -360 Z" fill="#FFE27A" />
        {/* Đuôi lửa */}
        <path d="M-200 -170 Q-280 -220 -300 -140 Q-270 -170 -260 -120 Q-240 -160 -200 -130 Z" fill="#FF8C1A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Móng */}
        {[-150, -90, 90, 150].map((x) => (
          <g key={x}>
            <rect x={x - 20} y="-60" width="40" height="44" fill="#5A606B" stroke={INK} strokeWidth="6" />
            <rect x={x - 26} y="-20" width="52" height="20" rx="4" fill="#2E2A33" stroke={INK} strokeWidth="6" />
          </g>
        ))}
        {/* Cổ và đầu ngựa */}
        <path d="M150 -160 Q250 -230 290 -390" fill="none" stroke={INK} strokeWidth="118" strokeLinecap="round" />
        <path d="M150 -160 Q250 -230 290 -390" fill="none" stroke="#9AA3AE" strokeWidth="100" strokeLinecap="round" />
        {/* Bờm sắt dựng như răng cưa */}
        <path d="M200 -250 L160 -270 L206 -296 L180 -330 L232 -344 L216 -386 L262 -390 L256 -440" fill="#5A606B" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Đầu ngựa dài, tai nhọn */}
        <path d="M262 -440 L270 -520 L310 -450 Z" fill="#9AA3AE" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M250 -420 Q300 -480 380 -440 Q440 -410 456 -380 Q462 -340 420 -334 Q360 -330 300 -340 Q250 -360 250 -420 Z" fill="#9AA3AE" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        <path d="M300 -440 Q360 -470 420 -414" fill="none" stroke="#C9CED6" strokeWidth="8" strokeLinecap="round" />
        <circle cx="316" cy="-412" r="14" fill="#FFE27A" stroke={INK} strokeWidth="5" />
        <circle cx="318" cy="-412" r="5" fill={INK} />
        <ellipse cx="438" cy="-370" rx="8" ry="6" fill={INK} />
        <path d="M410 -340 Q436 -350 456 -362" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <path d="M300 -350 L330 -420 M300 -350 L380 -356" fill="none" stroke="#C0392B" strokeWidth="6" strokeLinecap="round" />
        {/* Thân + giáp phủ */}
        <ellipse cx="0" cy="-150" rx="220" ry="74" fill="#9AA3AE" stroke={INK} strokeWidth="9" />
        <path d="M-200 -140 Q0 -100 200 -140 L184 -52 Q0 -30 -184 -52 Z" fill="#7B828E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[-150, -100, -50, 0, 50, 100, 150].map((x) => (
          <circle key={x} cx={x} cy={-80 + Math.abs(x) * 0.06} r="7" fill="#C9CED6" stroke={INK} strokeWidth="3" />
        ))}
        {/* Yên */}
        <path d="M-70 -214 Q0 -236 70 -214 L60 -186 Q0 -200 -60 -186 Z" fill="#C0392B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-150 -190 Q-110 -200 -80 -196" fill="none" stroke="#C9CED6" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "giong-iron-rod": {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-20" x2="0" y2="230" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <line x1="0" y1="-20" x2="0" y2="230" stroke="#7B828E" strokeWidth="13" strokeLinecap="round" />
        {[40, 110, 180].map((y) => (
          <rect key={y} x="-14" y={y} width="28" height="14" rx="4" fill="#C9CED6" stroke={INK} strokeWidth="4" />
        ))}
      </g>
    ),
  },
};

// ================================================================ phông

const Clouds: React.FC<{ list: [number, number, number][] }> = ({ list }) => (
  <>
    {list.map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF">
        <ellipse cx="0" cy="0" rx="90" ry="40" />
        <ellipse cx="-60" cy="12" rx="60" ry="30" />
        <ellipse cx="64" cy="10" rx="64" ry="32" />
      </g>
    ))}
  </>
);

/** Bụi tre: nhiều thân mảnh, lá chụm ở ngọn. */
const Bamboo: React.FC<{ x: number; h: number; dark?: boolean }> = ({ x, h, dark }) => {
  const stem = dark ? "#4E7A3A" : "#7FB04A";
  const leaf = dark ? "#2C5A37" : "#3F8A3F";
  return (
    <g>
      {[-40, -16, 8, 30, 52].map((dx, i) => (
        <path key={dx} d={`M${x + dx} ${FLOOR} Q${x + dx + (i - 2) * 14} ${FLOOR - h / 2} ${x + dx + (i - 2) * 40} ${FLOOR - h - (i % 2) * 40}`} fill="none" stroke={stem} strokeWidth="10" />
      ))}
      {[
        [-90, -h + 10, 90],
        [0, -h - 50, 110],
        [90, -h + 20, 90],
        [-40, -h + 120, 70],
        [60, -h + 110, 70],
      ].map(([dx, dy, r]) => (
        <ellipse key={`${dx}${dy}`} cx={x + dx} cy={FLOOR + dy} rx={r} ry={r * 0.6} fill={leaf} stroke={INK} strokeWidth="6" />
      ))}
    </g>
  );
};

const SungTree: React.FC = () => (
  <>
    <defs>
      <linearGradient id="sung-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7CC8EE" />
        <stop offset="1" stopColor="#DDF3FC" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#sung-sky)" />
    <circle cx="880" cy="360" r="66" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <Clouds list={[[620, 430, 0.8], [960, 560, 0.6]]} />
    {/* Đồng lúa xa, bờ ruộng */}
    <path d={`M0 920 Q300 880 600 910 Q860 930 1080 900 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#9CCB5A" stroke={INK} strokeWidth="6" />
    {[980, 1050, 1120, 1180].map((y, i) => (
      <path key={y} d={`M0 ${y} Q540 ${y - 30 + i * 6} 1080 ${y}`} fill="none" stroke="#7FB04A" strokeWidth="6" />
    ))}
    <Bamboo x={960} h={420} />
    {/* Cây sung: thân to, rễ bám đất, tán rộng */}
    <path d={`M120 ${FLOOR} Q160 1000 150 760 L290 760 Q280 1000 340 ${FLOOR} Z`} fill="#8B6A4A" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M220 780 Q300 640 420 600 M180 780 Q120 660 60 620" fill="none" stroke={INK} strokeWidth="44" strokeLinecap="round" />
    <path d="M220 780 Q300 640 420 600 M180 780 Q120 660 60 620" fill="none" stroke="#8B6A4A" strokeWidth="30" strokeLinecap="round" />
    <ellipse cx="240" cy="520" rx="300" ry="180" fill="#3F7A3A" stroke={INK} strokeWidth="9" />
    <ellipse cx="470" cy="600" rx="170" ry="110" fill="#4A8A42" stroke={INK} strokeWidth="8" />
    <ellipse cx="60" cy="640" rx="140" ry="100" fill="#4A8A42" stroke={INK} strokeWidth="8" />
    {/* Quả sung mọc chùm trên thân và cành */}
    {[
      [180, 860],
      [204, 884],
      [170, 900],
      [262, 960],
      [284, 940],
      [250, 1000],
      [210, 1080],
      [236, 1100],
      [330, 650],
      [356, 630],
      [110, 680],
      [90, 660],
      [400, 610],
    ].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="17" fill="#B7CF6A" stroke={INK} strokeWidth="5" />
    ))}
    <Floor color="#C9A26E" line="#B38D5C" />
  </>
);

const HeoMeadow: React.FC = () => (
  <>
    <defs>
      <linearGradient id="heo-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6EC6F0" />
        <stop offset="1" stopColor="#D6F2FC" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#heo-sky)" />
    <circle cx="150" cy="360" r="64" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <Clouds list={[[420, 400, 0.9], [860, 330, 1]]} />
    <ellipse cx="250" cy="1060" rx="520" ry="260" fill="#8CC85A" stroke={INK} strokeWidth="7" />
    <ellipse cx="880" cy="1020" rx="480" ry="280" fill="#7AB84E" stroke={INK} strokeWidth="7" />
    {/* Cây tròn xa */}
    {[
      [600, 820],
      [960, 780],
    ].map(([x, y]) => (
      <g key={x}>
        <rect x={x - 10} y={y} width="20" height="70" fill="#8B5A2B" stroke={INK} strokeWidth="5" />
        <circle cx={x} cy={y - 30} r="56" fill="#3FA34D" stroke={INK} strokeWidth="6" />
      </g>
    ))}
    {[120, 300, 700, 900].map((x) => (
      <g key={x} transform={`translate(${x} 1160)`}>
        <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
        <circle cx="0" cy="0" r="4" fill="#FFD93D" />
      </g>
    ))}
    <Floor color="#6DBE45" line="#5DAA3A" />
  </>
);

/** Nhà tranh xa trong làng. */
const Hut: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-120" y="-150" width="240" height="150" fill="#CDB892" stroke={INK} strokeWidth="7" />
    <rect x="-30" y="-100" width="60" height="100" fill="#3B2E1E" stroke={INK} strokeWidth="6" />
    <path d="M-170 -130 Q-120 -260 0 -280 Q120 -260 170 -130 Q0 -110 -170 -130 Z" fill="#B08A3E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {[-120, -60, 0, 60, 120].map((dx) => (
      <line key={dx} x1={dx * 0.4} y1="-260" x2={dx} y2="-130" stroke="#8C6A2A" strokeWidth="5" />
    ))}
  </g>
);

const GiongVillage: React.FC = () => (
  <>
    <defs>
      <linearGradient id="giong-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8FD0F0" />
        <stop offset="1" stopColor="#F2EED8" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#giong-sky)" />
    <Clouds list={[[300, 380, 0.8], [800, 330, 0.9]]} />
    {/* Luỹ tre bao quanh làng */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <ellipse key={i} cx={i * 180} cy={860 + (i % 2) * 30} rx="150" ry="110" fill="#3F7A3A" stroke={INK} strokeWidth="6" />
    ))}
    <rect x="0" y="880" width="1080" height={FLOOR - 880} fill="#3F7A3A" />
    <Hut x={760} y={1080} s={1} />
    {/* Cây cau */}
    <path d={`M200 ${FLOOR} Q190 900 214 640`} fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
    <path d={`M200 ${FLOOR} Q190 900 214 640`} fill="none" stroke="#B9A27A" strokeWidth="14" strokeLinecap="round" />
    {[-60, -20, 20, 60, 100, 140].map((a) => (
      <path key={a} d={`M214 640 q${Math.cos((a * Math.PI) / 180) * 120} ${-Math.sin((a * Math.PI) / 180) * 50 - 40} ${Math.cos((a * Math.PI) / 180) * 170} ${Math.abs(Math.sin((a * Math.PI) / 180)) * 40 + 10}`} fill="none" stroke="#3FA34D" strokeWidth="16" strokeLinecap="round" />
    ))}
    {/* Sân đất, rào tre thấp */}
    <rect x="0" y="1120" width="1080" height={FLOOR - 1120} fill="#C9A26E" />
    {Array.from({ length: 10 }, (_, i) => (
      <line key={i} x1={i * 120 + 30} y1="1140" x2={i * 120 + 30} y2="1080" stroke="#8C6A2A" strokeWidth="10" strokeLinecap="round" />
    ))}
    <line x1="0" y1="1100" x2="1080" y2="1100" stroke="#8C6A2A" strokeWidth="8" />
    <Floor color="#B38D5C" line="#9E7A4C" />
  </>
);

const GiongBattle: React.FC = () => (
  <>
    <defs>
      <linearGradient id="giong-battle-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E89A5A" />
        <stop offset="1" stopColor="#F6DDB0" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#giong-battle-sky)" />
    {/* Núi xa */}
    <path d={`M-20 1000 L180 640 L320 820 L520 560 L720 860 L880 700 L1100 960 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="#7B6F80" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d={`M-20 1080 Q300 960 560 1060 Q820 980 1100 1060 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="#8C7A5A" stroke={INK} strokeWidth="6" />
    {/* Khói */}
    {[
      [300, 760, 1],
      [860, 640, 0.8],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`} fill="#5E5A63" opacity="0.7">
        <circle cx="0" cy="0" r="50" />
        <circle cx="40" cy="-50" r="44" />
        <circle cx="10" cy="-110" r="36" />
      </g>
    ))}
    {/* Cờ giặc đổ */}
    {[
      [700, 1140, 24],
      [960, 1150, -30],
    ].map(([x, y, r]) => (
      <g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
        <line x1="0" y1="0" x2="0" y2="-200" stroke={INK} strokeWidth="10" />
        <path d="M0 -200 L90 -170 L0 -140 Z" fill="#1E1B2E" stroke={INK} strokeWidth="5" />
      </g>
    ))}
    <Bamboo x={90} h={480} dark />
    <Floor color="#9C8058" line="#8A704C" />
  </>
);

export const scenes: Record<SceneTuan1, React.FC> = {
  "sung-tree": SungTree,
  "heo-meadow": HeoMeadow,
  "giong-village": GiongVillage,
  "giong-battle": GiongBattle,
};
