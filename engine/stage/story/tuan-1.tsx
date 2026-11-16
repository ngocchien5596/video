/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 1 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-1.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 *
 * Truyện: Há miệng chờ sung (tập 4), Ba chú heo con (tập 5), Thánh Gióng (tập 7); đồ bể cá, muối (Cá không ăn muối cá ươn).
 */
import type React from "react";
import type { Expr } from "../../lib/stage-types.ts";
import type { PropTuan1, RoleTuan1, SceneTuan1 } from "../../lib/story/tuan-1.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, LINE as INK, Lines, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";
import { Bamboo as VBamboo, BambooFence, Canopy, Cloud as VCloud, FarMountains, GrassTuft, Hills, Shine, SoftShadow, SkyRays, ThatchHut, Tree, WarmSky } from "../village.tsx";

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
      <ellipse cx="128" cy="244" rx="14" ry="9" fill="#F2A08A" opacity="0.8" />
      <ellipse cx="232" cy="244" rx="14" ry="9" fill="#F2A08A" opacity="0.8" />
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
          <path d="M96 176 Q180 150 264 176 L262 140 Q180 120 98 140 Z" fill="#2E2420" />
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
          <circle key={y} cx="192" cy={y} r="6" fill="#E3B23C" stroke={INK} strokeWidth="3" />
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
        <path d="M112 104 Q180 92 248 104" fill="none" stroke="#B8402E" strokeWidth="10" />
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
        <circle cx="134" cy="360" r="7" fill="#E3B23C" stroke={INK} strokeWidth="3" />
        <circle cx="226" cy="360" r="7" fill="#E3B23C" stroke={INK} strokeWidth="3" />
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
          <path d="M150 122 Q160 70 196 82 Q214 100 200 124 Q176 112 150 122 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="124" cy="236" rx="12" ry="8" fill="#F2A08A" opacity="0.75" />
          <ellipse cx="236" cy="236" rx="12" ry="8" fill="#F2A08A" opacity="0.75" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M120 420 L240 420 L248 470 L112 470 Z" fill="#FFF8E7" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M118 312 Q180 296 242 312 L238 432 L122 432 Z" fill="#F6C89F" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Yếm đỏ */}
        <path d="M180 318 L234 372 L180 440 L126 372 Z" fill="#B8402E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M150 340 L132 300 M210 340 L228 300" stroke="#B8402E" strokeWidth="6" strokeLinecap="round" />
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
          <circle cx="180" cy="14" r="10" fill="#B8402E" stroke={INK} strokeWidth="4" />
          <path d="M92 150 Q180 118 268 150" fill="none" stroke="#7B828E" strokeWidth="8" />
          <circle cx="180" cy="104" r="12" fill="#E3B23C" stroke={INK} strokeWidth="4" />
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
        <path d="M128 302 Q180 330 232 302 L226 322 Q180 344 134 322 Z" fill="#B8402E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M134 318 Q100 360 84 420 L110 410 Q122 366 150 330 Z" fill="#B8402E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
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
          <ellipse cx="128" cy="236" rx="11" ry="7" fill="#F2A08A" opacity="0.6" />
          <ellipse cx="232" cy="236" rx="11" ry="7" fill="#F2A08A" opacity="0.6" />
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
        <rect x="112" y="404" width="136" height="16" rx="6" fill="#B8402E" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },

  /** Giặc Ân: mũ nhọn đen có tua đỏ, râu xồm, giáp tối. */
  "giong-enemy": {
    look: { skin: "#D9A27A", sleeve: "#2E2A33", legs: "#2E2A33", shoe: "#2E2420", arm: 24 },
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
          <path d="M106 236 Q110 330 180 340 Q250 330 254 236 Q236 262 220 252 Q200 270 180 258 Q160 270 140 252 Q124 262 106 236 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Mouth expr={expr} y={g.mouthY + 16} talk={talk} color="#8B1E24" />
          {/* Mũ nhọn đen, tua đỏ */}
          <path d="M80 160 Q82 120 120 104 L180 -6 L240 104 Q278 120 280 160 Q180 136 80 160 Z" fill="#2E2420" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          <path d="M180 -6 Q150 30 168 62 M180 -6 Q206 40 190 70" fill="none" stroke="#B8402E" strokeWidth="10" strokeLinecap="round" />
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

/** Anh chàng lười nằm ngửa trên manh chiếu cói; đầu bên trái. `angry` = mồm ngậm sung, mặt cau có, bóng thoại. */
const LazyMan: React.FC<{ angry: boolean }> = ({ angry }) => {
  const skin = "#F0C49A";
  return (
    <g>
      <SoftShadow cx={0} cy={-4} rx={320} ry={30} />
      {/* Manh chiếu cói: nan đan chéo, viền đỏ hai đầu */}
      <path d="M-282 0 L-262 -28 L278 -28 L296 0 Z" fill="url(#t1-mat)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {Array.from({ length: 28 }, (_, i) => {
        const x = -262 + i * 20;
        return <path key={i} d={`M${x} -26 L${x - 8} -2`} stroke="#B99A5E" strokeWidth="3" opacity="0.8" />;
      })}
      <path d="M-268 -14 L284 -14" stroke="#B99A5E" strokeWidth="3" opacity="0.7" />
      <path d="M-250 -26 L-270 -2 M-232 -26 L-252 -2 M256 -26 L272 -2 M238 -26 L254 -2" stroke="#B8402E" strokeWidth="6" />
      {/* Quần nâu: chân co gác lên nhau, bàn chân dựng */}
      <path d="M100 -60 L196 -122 L268 -50" fill="none" stroke={INK} strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 -60 L196 -122 L268 -50" fill="none" stroke="#7A4E2C" strokeWidth="33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 -74 L190 -118" fill="none" stroke="#A8744A" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
      <path d="M90 -50 L250 -46" fill="none" stroke={INK} strokeWidth="44" strokeLinecap="round" />
      <path d="M90 -50 L250 -46" fill="none" stroke="#6B4423" strokeWidth="31" strokeLinecap="round" />
      <path d="M110 -58 L240 -56" fill="none" stroke="#8E623A" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      {/* Bàn chân trần dựng */}
      <path d="M256 -46 Q252 -96 268 -108 Q286 -104 284 -60 Q282 -44 268 -42 Z" fill={skin} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <path d="M270 -46 Q266 -100 282 -110 Q298 -104 296 -62 Q294 -46 282 -44 Z" fill={skin} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {/* Áo cánh nâu nhạt có miếng vá, nếp gấp, cúc */}
      <path d="M-112 -40 Q-118 -114 -60 -120 L84 -114 Q122 -102 120 -40 Q118 -28 100 -28 L-96 -28 Q-112 -28 -112 -40 Z" fill="url(#t1-cream)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      <path d="M-80 -40 Q-40 -60 0 -44 M30 -36 Q60 -56 96 -42" fill="none" stroke="#C9B48A" strokeWidth="5" strokeLinecap="round" />
      <path d="M-104 -50 Q-104 -100 -60 -112" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
      <rect x="-10" y="-98" width="42" height="34" fill="#C9A86E" stroke={INK} strokeWidth="4" transform="rotate(-8 10 -81)" />
      <path d="M-6 -94 l4 4 m10 -6 l4 4 m10 -6 l4 4 M-2 -70 l4 4 m14 -6 l4 4" stroke="#7A5A30" strokeWidth="3" strokeLinecap="round" />
      {[-40, -10, 20].map((y, i) => (
        <circle key={y} cx={-60 + i * 4} cy={y - 66} r="5" fill="url(#w-wood)" stroke={INK} strokeWidth="2.5" />
      ))}
      <rect x="84" y="-76" width="36" height="20" rx="6" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="5" />
      {/* Tay gối sau đầu */}
      <path d="M-70 -110 L-140 -150 L-220 -128" fill="none" stroke={INK} strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-70 -110 L-140 -150 L-220 -128" fill="none" stroke={skin} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-82 -116 L-138 -146" fill="none" stroke="#FBDDBC" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
      {angry ? (
        <>
          {/* Tay giơ nắm đấm */}
          <path d="M40 -112 L60 -200 L30 -260" fill="none" stroke={INK} strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 -112 L60 -200 L30 -260" fill="none" stroke={skin} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="-268" r="24" fill={skin} stroke={INK} strokeWidth="6" />
          <path d="M14 -280 q8 -6 16 0 m-16 12 q8 -6 16 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Tay đặt hờ trên bụng */}
          <path d="M40 -110 L70 -78 L20 -64" fill="none" stroke={INK} strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 -110 L70 -78 L20 -64" fill="none" stroke={skin} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="16" cy="-64" rx="18" ry="14" fill={skin} stroke={INK} strokeWidth="5" />
        </>
      )}
      {/* Đầu nằm nghiêng, mặt ngửa lên trời: gáy + tóc bên trái, mũi chĩa lên, cằm bên phải */}
      <g transform="translate(-170 -92)">
        <ellipse cx="0" cy="0" rx="78" ry="68" fill={skin} stroke={INK} strokeWidth="7" />
        <path d="M30 -40 Q50 -10 40 30" fill="none" stroke="#D99E72" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
        <path d="M-76 10 Q-84 -50 -30 -66 Q-20 -40 -40 -10 Q-40 30 -10 60 Q-60 60 -76 10 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-60 -20 Q-56 -44 -38 -54" fill="none" stroke="#6A5448" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="-14" cy="14" rx="14" ry="18" fill={skin} stroke={INK} strokeWidth="5" />
        <ellipse cx="30" cy="10" rx="14" ry="9" fill="#F2A08A" opacity="0.7" />
        {/* Mũi */}
        <path d="M2 -64 Q8 -94 26 -70" fill={skin} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {angry ? (
          <>
            {/* Mày cau, mắt trợn, má phồng ngậm sung */}
            <path d="M-26 -50 L4 -40" stroke={INK} strokeWidth="8" strokeLinecap="round" />
            <circle cx="-8" cy="-28" r="8" fill={INK} />
            <ellipse cx="44" cy="-30" rx="34" ry="30" fill={skin} stroke={INK} strokeWidth="6" />
            <circle cx="56" cy="-52" r="12" fill="url(#t1-fig)" stroke={INK} strokeWidth="4" />
          </>
        ) : (
          <>
            {/* Mắt lim dim, miệng há thật to hướng lên trời */}
            <path d="M-24 -36 q12 10 24 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
            <g transform="rotate(-30 52 -46)">
              <ellipse cx="52" cy="-46" rx="30" ry="40" fill="#5A1418" stroke={INK} strokeWidth="7" />
              <path d="M30 -78 Q52 -88 74 -78" fill="none" stroke="#FFF8E8" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="52" cy="-22" rx="16" ry="10" fill="#D9584A" />
            </g>
          </>
        )}
      </g>
      {/* Nón lá bỏ cạnh chiếu */}
      <g transform="translate(-300 -20) rotate(-14)">
        <path d="M-56 10 L0 -44 L56 10 Q0 22 -56 10 Z" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-30 -14 L30 -14 M-44 0 L44 0" stroke="#B48A48" strokeWidth="3" />
      </g>
      {angry ? (
        <g transform="translate(-200 -560)">
          <path d="M-150 -60 Q-150 -110 -90 -110 L90 -110 Q150 -110 150 -60 Q150 -10 90 -10 L-40 -10 L-90 40 L-80 -10 L-90 -10 Q-150 -10 -150 -60 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Lines text="LƯỜI THẾ!" cy={-60} width={260} max={56} color={INK} font={TEXT_FONT} />
        </g>
      ) : null}
    </g>
  );
};

const Fig: React.FC<{ y: number }> = ({ y }) => (
  <g transform={`translate(0 ${y}) scale(1.5)`}>
    <circle cx="0" cy="0" r="22" fill="url(#t1-fig)" stroke={INK} strokeWidth="6" />
    <path d="M-4 -22 L0 -32 L6 -22" fill="#6B8E3A" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <circle cx="-7" cy="-6" r="5" fill="#E2EFB8" />
    <circle cx="6" cy="8" r="3" fill="url(#w-lacquer)" opacity="0.7" />
  </g>
);

/** Chân tảng đá kê dưới nhà. */
const Footing: React.FC<{ w: number }> = ({ w }) => (
  <g>
    {Array.from({ length: Math.round(w / 56) }, (_, i) => {
      const x = -w / 2 + i * 56;
      return <rect key={i} x={x} y="-22" width="54" height="22" rx="8" fill={i % 2 ? "#B9AD98" : "#A89C86"} stroke={INK} strokeWidth="5" />;
    })}
  </g>
);

/** Ba ngôi nhà của ba chú heo: nhà rơm, nhà gỗ, nhà gạch (đáy ở y = 0, rộng ~400). */
const House: React.FC<{ kind: "straw" | "wood" | "brick" }> = ({ kind }) => {
  if (kind === "straw") {
    return (
      <g>
        <SoftShadow cy={-4} rx={240} />
        {/* Vách bó rơm buộc lạt */}
        <rect x="-140" y="-250" width="280" height="250" fill="url(#t1-straw)" stroke={INK} strokeWidth="8" />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${-128 + i * 21} -240 q-6 120 4 236`} fill="none" stroke="#C9A24E" strokeWidth="5" />
        ))}
        {[-190, -110, -40].map((y) => (
          <g key={y}>
            <path d={`M-140 ${y} Q0 ${y + 10} 140 ${y}`} fill="none" stroke={INK} strokeWidth="11" />
            <path d={`M-140 ${y} Q0 ${y + 10} 140 ${y}`} fill="none" stroke="#9A6236" strokeWidth="6" />
          </g>
        ))}
        <path d="M-128 -236 L-128 -10" stroke="#FFF1B8" strokeWidth="8" opacity="0.5" />
        {/* Cửa liếp tre */}
        <path d="M-42 0 L-42 -128 Q0 -170 42 -128 L42 0 Z" fill="#3B2615" stroke={INK} strokeWidth="7" />
        <path d="M-42 0 L-42 -128 Q-24 -146 -6 -150 L-6 0 Z" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {[-34, -24, -14].map((x) => (
          <line key={x} x1={x} y1={-134 + (x + 34) * -0.6} x2={x} y2="-4" stroke="#A9853A" strokeWidth="3" />
        ))}
        <path d="M-40 -90 L-8 -90 M-40 -40 L-8 -40" stroke="#9A6236" strokeWidth="5" />
        {/* Mái rơm hai lớp bờm xờm */}
        <path d="M-196 -226 L0 -446 L196 -226 L174 -210 L152 -230 L130 -206 L106 -228 L82 -204 L58 -226 L32 -202 L8 -226 L-18 -202 L-44 -226 L-70 -204 L-96 -228 L-122 -206 L-148 -230 L-172 -208 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-120 -300 L0 -420 L120 -300 L100 -290 L80 -306 L58 -286 L34 -304 L10 -284 L-14 -304 L-38 -284 L-62 -306 L-86 -286 L-106 -304 Z" fill="#F2C860" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {[-150, -100, -50, 50, 100, 150].map((x) => (
          <line key={x} x1={x * 0.15} y1="-420" x2={x} y2="-236" stroke="#B5892A" strokeWidth="4" />
        ))}
        <path d="M-130 -260 L-20 -400" stroke="#FFF1B8" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
        {/* Chỏm buộc */}
        <path d="M-16 -436 Q0 -480 16 -436" fill="url(#t1-straw)" stroke={INK} strokeWidth="5" />
        <rect x="-18" y="-444" width="36" height="12" rx="5" fill="#9A6236" stroke={INK} strokeWidth="4" />
      </g>
    );
  }
  if (kind === "wood") {
    return (
      <g>
        <SoftShadow cy={-4} rx={240} />
        <Footing w={320} />
        {/* Vách ván ngang có vân */}
        <rect x="-150" y="-282" width="300" height="262" fill="url(#w-wood-h)" stroke={INK} strokeWidth="8" />
        {[-246, -210, -174, -138, -102, -66].map((y, i) => (
          <g key={y}>
            <line x1="-150" y1={y} x2="150" y2={y} stroke="#5E3A20" strokeWidth="5" />
            <path d={`M${-120 + (i % 3) * 60} ${y + 18} q30 -8 60 0`} fill="none" stroke="#7B4B28" strokeWidth="3" />
            <circle cx={-140 + (i % 2) * 280} cy={y + 18} r="4" fill={INK} />
          </g>
        ))}
        {/* Cột góc */}
        <rect x="-162" y="-290" width="24" height="270" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="6" />
        <rect x="138" y="-290" width="24" height="270" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="6" />
        {/* Cửa ván có thanh chéo */}
        <rect x="-46" y="-160" width="92" height="140" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="7" />
        <path d="M-40 -150 L40 -30 M-40 -90 L40 -90" stroke="#A8744A" strokeWidth="7" />
        <circle cx="28" cy="-86" r="6" fill="url(#w-brass)" stroke={INK} strokeWidth="3" />
        {/* Cửa sổ chống */}
        <rect x="70" y="-236" width="56" height="50" fill="#3A2416" stroke={INK} strokeWidth="6" />
        <path d="M66 -236 L130 -236 L140 -270 L56 -270 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <line x1="98" y1="-236" x2="98" y2="-186" stroke="#A8744A" strokeWidth="5" />
        {/* Mái ván lợp chồng */}
        <path d="M-190 -268 L0 -444 L190 -268 L176 -256 L0 -414 L-176 -256 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-172 -262 L0 -420 L172 -262 Z" fill="#8A5530" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[-330, -300, -270].map((y, i) => (
          <path key={y} d={`M${-150 + i * 30 - (y + 330) * 0.6} ${y + 50} L${150 - i * 30 + (y + 330) * 0.6} ${y + 50}`} stroke="#5E3A20" strokeWidth="4" />
        ))}
        {[-120, -60, 0, 60, 120].map((x) => (
          <line key={x} x1={x * 0.35} y1={-400 + Math.abs(x) * 0.2} x2={x} y2="-266" stroke="#5E3A20" strokeWidth="3" opacity="0.7" />
        ))}
        <path d="M-150 -276 L-20 -396" stroke="#D9A574" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        {/* Bậc gỗ */}
        <rect x="-64" y="-22" width="128" height="22" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
      </g>
    );
  }
  return (
    <g>
      <SoftShadow cy={-4} rx={250} />
      {/* Ống khói và khói */}
      <path d="M100 -500 q-20 -30 0 -56 q20 -26 0 -54" fill="none" stroke="#E8DCC8" strokeWidth="14" strokeLinecap="round" opacity="0.8" />
      <rect x="70" y="-470" width="56" height="120" fill="url(#t1-brick)" stroke={INK} strokeWidth="8" />
      <rect x="62" y="-484" width="72" height="22" rx="3" fill="url(#t1-slate)" stroke={INK} strokeWidth="6" />
      {/* Tường gạch */}
      <rect x="-160" y="-290" width="320" height="290" fill="url(#t1-brick)" stroke={INK} strokeWidth="8" />
      {Array.from({ length: 9 }, (_, r) => (
        <g key={r}>
          <line x1="-160" y1={-32 * (r + 1)} x2="160" y2={-32 * (r + 1)} stroke="#E6CBB0" strokeWidth="4" />
          {Array.from({ length: 5 }, (_, c) => (
            <line key={c} x1={-160 + c * 70 + (r % 2) * 35} y1={-32 * (r + 1)} x2={-160 + c * 70 + (r % 2) * 35} y2={-32 * r} stroke="#E6CBB0" strokeWidth="4" />
          ))}
        </g>
      ))}
      <rect x="-160" y="-290" width="320" height="30" fill="#3A2416" opacity="0.25" />
      {/* Cửa vòm gỗ, bậc đá */}
      <path d="M-52 -4 L-52 -130 Q0 -186 52 -130 L52 -4 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="7" />
      <path d="M-52 -130 Q0 -186 52 -130" fill="none" stroke="#E6CBB0" strokeWidth="10" />
      <line x1="0" y1="-160" x2="0" y2="-4" stroke="#4A2B16" strokeWidth="4" />
      <circle cx="30" cy="-74" r="7" fill="url(#w-brass)" stroke={INK} strokeWidth="3" />
      <rect x="-72" y="-16" width="144" height="16" rx="4" fill="#B9AD98" stroke={INK} strokeWidth="5" />
      {/* Cửa sổ sáng đèn, bệ hoa */}
      <rect x="70" y="-232" width="72" height="72" fill="#F4D27A" stroke={INK} strokeWidth="7" />
      <rect x="70" y="-232" width="72" height="72" fill="url(#w-glow)" />
      <path d="M106 -232 L106 -160 M70 -196 L142 -196" stroke={INK} strokeWidth="6" />
      <rect x="64" y="-162" width="84" height="14" rx="3" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
      {[80, 100, 120, 136].map((x, i) => (
        <circle key={x} cx={x} cy={-170} r="8" fill={i % 2 ? "#E5484D" : "#F0A02C"} stroke={INK} strokeWidth="3" />
      ))}
      <rect x="-140" y="-232" width="64" height="64" fill="#3A2416" stroke={INK} strokeWidth="7" />
      <path d="M-108 -232 L-108 -168 M-140 -200 L-76 -200" stroke="#C08A55" strokeWidth="5" />
      {/* Mái ngói đá phiến có hàng vảy */}
      <path d="M-200 -280 L0 -446 L200 -280 Q0 -266 -200 -280 Z" fill="url(#t1-slate)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      {[0.25, 0.45, 0.65, 0.85].map((t) => {
        const y = -446 + 166 * t;
        const half = 200 * t;
        const n = Math.max(2, Math.round((half * 2) / 34));
        let d = `M${-half} ${y}`;
        for (let i = 0; i < n; i++) d += ` q${half / n} 10 ${(half * 2) / n} 0`;
        return <path key={t} d={d} fill="none" stroke="#2E2420" strokeWidth="4" opacity="0.7" />;
      })}
      <path d="M-170 -290 L-30 -410" stroke="#9C8478" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
      {/* Chậu hoa cạnh cửa */}
      <path d="M-120 -4 L-112 -40 L-80 -40 L-72 -4 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="-96" cy="-56" r="18" fill="url(#w-leaf)" stroke={INK} strokeWidth="4" />
      <circle cx="-100" cy="-62" r="6" fill="#E5484D" stroke={INK} strokeWidth="2" />
    </g>
  );
};

/** Nong tre tròn đan nong mốt đặt dưới đất; con là đồ đựng bên trên. */
const Nong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g>
    <SoftShadow cy={-6} rx={210} />
    <defs>
      <clipPath id="t1-nong-clip">
        <ellipse cx="0" cy="-26" rx="166" ry="27" />
      </clipPath>
    </defs>
    <ellipse cx="0" cy="-26" rx="170" ry="30" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="7" />
    <g clipPath="url(#t1-nong-clip)" opacity="0.55">
      {Array.from({ length: 22 }, (_, i) => (
        <line key={`a${i}`} x1={-200 + i * 20} y1="-60" x2={-170 + i * 20} y2="10" stroke="#A9853A" strokeWidth="3" />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <line key={`b${i}`} x1={-170 + i * 20} y1="-60" x2={-200 + i * 20} y2="10" stroke="#A9853A" strokeWidth="3" />
      ))}
    </g>
    {children}
    {/* Vành nong cạp mây */}
    <path d="M-170 -26 Q-168 -4 0 0 Q168 -4 170 -26 Q168 -12 0 -12 Q-168 -12 -170 -26 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {Array.from({ length: 13 }, (_, i) => {
      const x = -150 + i * 25;
      const y = -6 - Math.abs(x) * 0.02;
      return <path key={x} d={`M${x} ${y - 6} l6 8`} stroke="#4A2B16" strokeWidth="4" strokeLinecap="round" />;
    })}
  </g>
);

/** Gradient riêng của đạo cụ tuần 1 (lông chó, lông mèo mướp, thịt quay, tre, rơm, gạch, sắt...). */
/** Bể cá vàng tròn trên đế gỗ (Cá không ăn muối cá ươn). `scared`: muối rắc trên mặt nước, cá nép đáy bể mắt tròn xoe. */
const Fishbowl: React.FC<{ scared: boolean; text?: string }> = ({ scared, text }) => (
  <g>
    <SoftShadow cy={-4} rx={120} />
    {/* Bình thủy tinh và nước */}
    <path d="M-70 -206 Q-132 -160 -116 -90 Q-100 -26 0 -26 Q100 -26 116 -90 Q132 -160 70 -206 Z" fill="#DDF3FB" fillOpacity="0.6" />
    <path d="M-108 -164 Q0 -152 108 -164 Q124 -116 110 -84 Q94 -34 0 -34 Q-94 -34 -110 -84 Q-124 -116 -108 -164 Z" fill="#62BDE3" opacity="0.8" />
    <path d="M-108 -164 Q0 -152 108 -164" fill="none" stroke="#FFFFFF" strokeWidth="5" opacity="0.8" />
    {/* Sỏi đáy và rong */}
    {[-60, -34, -8, 18, 44, 68].map((x, i) => (
      <ellipse key={x} cx={x} cy={-44 - (i % 2) * 4} rx="15" ry="9" fill={["#E9B872", "#D9826B", "#B9C7A0"][i % 3]} stroke={INK} strokeWidth="3" />
    ))}
    <path d="M-62 -52 Q-80 -86 -60 -110 Q-46 -128 -62 -146 M-46 -52 Q-36 -80 -50 -102" fill="none" stroke="#3E9A4E" strokeWidth="9" strokeLinecap="round" />
    {/* Cá vàng */}
    <g transform={scared ? "translate(36 -70) rotate(-6)" : "translate(14 -112) rotate(-4)"}>
      <path d="M-28 0 L-62 -24 Q-54 0 -62 24 Z" fill="#F7A13A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="0" cy="0" rx="36" ry="24" fill="#F2832B" stroke={INK} strokeWidth="5" />
      <path d="M-4 -22 Q4 -40 18 -22" fill="#F7A13A" stroke={INK} strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M-12 -18 Q-18 0 -12 18" fill="none" stroke="#C8601C" strokeWidth="3.5" />
      {scared ? (
        <>
          <circle cx="16" cy="-6" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="3.5" />
          <circle cx="16" cy="-6" r="3.5" fill={INK} />
          <ellipse cx="28" cy="10" rx="5" ry="6" fill={INK} />
          <path d="M42 -34 q8 10 0 16 q-8 -6 0 -16 Z" fill="#9AD8FF" stroke={INK} strokeWidth="2.5" />
        </>
      ) : (
        <>
          <circle cx="16" cy="-6" r="8" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
          <circle cx="18" cy="-6" r="4" fill={INK} />
          <path d="M24 8 q6 4 10 -2" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
    </g>
    {/* Bọt nước */}
    {[
      [44, -140, 7],
      [56, -158, 5],
      [-20, -130, 5],
    ].map(([x, y, r]) => (
      <circle key={x} cx={x} cy={y} r={r} fill="none" stroke="#FFFFFF" strokeWidth="3" />
    ))}
    {/* Muối rắc trên mặt nước, vài hạt chìm xuống */}
    {scared
      ? [-80, -56, -30, -6, 20, 46, 72, -44, 8, 58].map((x, i) => (
          <rect key={i} x={x} y={i > 6 ? -136 + (i % 3) * 14 : -168} width="8" height="8" fill="#FFFFFF" stroke="#9FB2BE" strokeWidth="1.5" transform={`rotate(25 ${x} -164)`} />
        ))
      : null}
    {/* Viền bình, vành miệng, vệt sáng */}
    <path d="M-70 -206 Q-132 -160 -116 -90 Q-100 -26 0 -26 Q100 -26 116 -90 Q132 -160 70 -206" fill="none" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <ellipse cx="0" cy="-206" rx="72" ry="12" fill="none" stroke={INK} strokeWidth="7" />
    <Shine d="M-92 -150 Q-104 -110 -88 -72" opacity={0.7} />
    {/* Đế gỗ */}
    <rect x="-84" y="-30" width="168" height="30" rx="9" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
    {text ? (
      <g transform="translate(-40 -268)">
        <rect x="-78" y="-34" width="156" height="56" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
        <path d="M22 22 L34 40 L8 22 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <Lines text={text} cy={-6} width={136} max={30} color={INK} font={TEXT_FONT} />
      </g>
    ) : null}
  </g>
);

const T1Defs: React.FC = () => (
  <defs>
    <radialGradient id="t1-fur" cx="0.36" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#FFCB78" />
      <stop offset="0.6" stopColor="#F2A53E" />
      <stop offset="1" stopColor="#C77826" />
    </radialGradient>
    <linearGradient id="t1-ear" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#CC7A32" />
      <stop offset="1" stopColor="#8A4818" />
    </linearGradient>
    <radialGradient id="t1-tabby" cx="0.36" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#F8B868" />
      <stop offset="0.6" stopColor="#E58E36" />
      <stop offset="1" stopColor="#B4601C" />
    </radialGradient>
    <radialGradient id="t1-cream" cx="0.4" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#FFFBF0" />
      <stop offset="1" stopColor="#EED8B0" />
    </radialGradient>
    <radialGradient id="t1-meat" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#ECA058" />
      <stop offset="0.6" stopColor="#C2602A" />
      <stop offset="1" stopColor="#8A3A14" />
    </radialGradient>
    <linearGradient id="t1-bamboo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F0D59A" />
      <stop offset="1" stopColor="#BE9150" />
    </linearGradient>
    <linearGradient id="t1-straw" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#F8DE8A" />
      <stop offset="0.6" stopColor="#E9C462" />
      <stop offset="1" stopColor="#C49A3A" />
    </linearGradient>
    <linearGradient id="t1-brick" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#C8603F" />
      <stop offset="0.6" stopColor="#B04E34" />
      <stop offset="1" stopColor="#8A3A26" />
    </linearGradient>
    <linearGradient id="t1-slate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#6A5248" />
      <stop offset="1" stopColor="#4A3830" />
    </linearGradient>
    <linearGradient id="t1-steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#9C9C96" />
      <stop offset="1" stopColor="#5E5E5A" />
    </linearGradient>
    <radialGradient id="t1-fire" cx="0.3" cy="0.5" r="0.8">
      <stop offset="0" stopColor="#FFE08A" />
      <stop offset="0.5" stopColor="#F59A2E" />
      <stop offset="1" stopColor="#D2581E" />
    </radialGradient>
    <radialGradient id="t1-egg" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#8A5E96" />
      <stop offset="0.6" stopColor="#5A3468" />
      <stop offset="1" stopColor="#3A1E46" />
    </radialGradient>
    <radialGradient id="t1-fig" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#D8E48E" />
      <stop offset="0.6" stopColor="#A6B85A" />
      <stop offset="1" stopColor="#728638" />
    </radialGradient>
    <linearGradient id="t1-mat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F2DDA8" />
      <stop offset="1" stopColor="#CDAE6E" />
    </linearGradient>
    <linearGradient id="t1-rope" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#E0B878" />
      <stop offset="1" stopColor="#A87A3C" />
    </linearGradient>
  </defs>
);

const rawProps: Record<PropTuan1, PropDef> = {
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
        <SoftShadow cy={-4} rx={200} />
        {/* Đống rơm đổ sập: nhiều lớp, cọng lởm chởm */}
        <path d="M-160 0 Q-120 -56 -40 -48 Q20 -86 100 -46 Q150 -30 170 0 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-110 -14 Q-60 -40 0 -30 Q60 -50 120 -16" fill="none" stroke="#B5892A" strokeWidth="5" strokeLinecap="round" />
        {[-130, -90, -50, -10, 30, 70, 110, 140].map((x, i) => (
          <path key={x} d={`M${x} ${-20 - (i % 3) * 10} l${(i % 2 ? 1 : -1) * 18} ${-30 - (i % 3) * 8}`} stroke={INK} strokeWidth="9" strokeLinecap="round" />
        ))}
        {[-130, -90, -50, -10, 30, 70, 110, 140].map((x, i) => (
          <path key={`s${x}`} d={`M${x} ${-20 - (i % 3) * 10} l${(i % 2 ? 1 : -1) * 18} ${-30 - (i % 3) * 8}`} stroke="#F2D675" strokeWidth="4" strokeLinecap="round" />
        ))}
        {/* Mấy thanh tre khung nhà gãy */}
        <path d="M-60 -20 L-110 -130 M50 -30 L120 -110" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M-60 -20 L-110 -130 M50 -30 L120 -110" stroke="#C9A24E" strokeWidth="8" strokeLinecap="round" />
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
          [140, -300, -70],
          [-200, -380, 30],
        ].map(([x, y, r]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-42 0 Q0 -8 42 0 Q0 8 -42 0 Z" fill="url(#t1-straw)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <path d="M36 0 l12 -6 M36 0 l12 6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        {/* Gió xoáy */}
        <path d="M-230 -290 q40 -30 80 0 q20 18 0 30 M110 -330 q40 -30 80 0 q20 18 0 30 M-70 -190 q30 -22 60 0" fill="none" stroke="#FFF3D6" strokeWidth="7" strokeLinecap="round" />
        <path d="M-230 -290 q40 -30 80 0 q20 18 0 30 M110 -330 q40 -30 80 0 q20 18 0 30 M-70 -190 q30 -22 60 0" fill="none" stroke="#C9B48A" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
  },
  "heo-wood-ruin": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={220} />
        {/* Bụi gỗ tung */}
        {[
          [-170, -60, 34],
          [180, -70, 30],
          [-20, -40, 40],
        ].map(([x, y, r]) => (
          <circle key={x} cx={x} cy={y} r={r} fill="#E8D6B4" stroke="#B99A6E" strokeWidth="4" opacity="0.8" />
        ))}
        {[
          [-90, -30, 18],
          [70, -40, -22],
          [-10, -70, 6],
          [-120, -90, 62],
          [110, -100, -58],
          [20, -120, -14],
        ].map(([x, y, r], i) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            {/* Ván gãy: một đầu răng cưa */}
            <path d="M-110 -16 L96 -16 L104 -6 L94 2 L110 10 L100 16 L-110 16 Z" fill="url(#w-wood-h)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <path d={`M-96 ${i % 2 ? -4 : 4} q50 -8 100 0 t60 0`} fill="none" stroke="#6E4324" strokeWidth="3" />
            <path d="M-104 -10 L80 -10" stroke="#E2B07A" strokeWidth="3" opacity="0.6" />
            <circle cx="-90" cy="0" r="4" fill="url(#w-metal)" stroke={INK} strokeWidth="2" />
          </g>
        ))}
        {/* Mái ván gãy gập */}
        <path d="M-80 -210 L0 -170 L60 -230" fill="none" stroke={INK} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-80 -210 L0 -170 L60 -230" fill="none" stroke="#7B4B28" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-70 -214 L-4 -180" fill="none" stroke="#B87C48" strokeWidth="5" strokeLinecap="round" />
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
        <rect x="-36" y="-96" width="72" height="16" rx="6" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "heo-plank": {
    mode: "upright",
    draw: () => (
      <g transform="rotate(-20)">
        <rect x="-24" y="-220" width="48" height="240" rx="4" fill="url(#w-wood-h)" stroke={INK} strokeWidth="7" />
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
            <rect x="-56" y="-32" width="112" height="32" rx="3" fill="url(#t1-brick)" stroke={INK} strokeWidth="6" />
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
        {/* Cơm trắng vun đầy, đổ bóng dưới chân, hạt cơm */}
        <path d="M-142 -32 Q-124 -152 0 -160 Q124 -152 142 -32 Q0 -16 -142 -32 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-130 -40 Q0 -24 130 -40 Q100 -60 0 -56 Q-100 -60 -130 -40 Z" fill="#D9CFB8" opacity="0.6" />
        {[
          [-70, -80],
          [-20, -120],
          [40, -96],
          [80, -60],
          [-100, -50],
          [10, -60],
          [-50, -110],
          [70, -120],
          [100, -84],
          [-30, -140],
          [20, -136],
          [-80, -100],
        ].map(([x, y], i) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="7" ry="4" fill="#CFC6B2" transform={`rotate(${(i * 37) % 90} ${x} ${y})`} />
        ))}
        <path d="M-90 -110 Q-60 -146 -10 -150" fill="none" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
        {/* Hơi nóng bốc lên */}
        {[-40, 10, 60].map((x) => (
          <g key={x}>
            <path d={`M${x} -172 q-12 -30 4 -52 q14 -20 0 -42`} fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" opacity="0.35" />
            <path d={`M${x} -172 q-12 -30 4 -52 q14 -20 0 -42`} fill="none" stroke="#FFF8E8" strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
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
          [-44, -156],
          [6, -160],
          [54, -152],
        ].map(([x, y]) => (
          <g key={`${x}${y}`}>
            <circle cx={x} cy={y} r="26" fill="url(#t1-egg)" stroke={INK} strokeWidth="5" />
            {/* Đài cà xanh hình sao */}
            <path d={`M${x - 14} ${y - 20} L${x - 4} ${y - 22} L${x} ${y - 34} L${x + 4} ${y - 22} L${x + 14} ${y - 20} L${x + 4} ${y - 16} L${x} ${y - 12} L${x - 4} ${y - 16} Z`} fill="url(#w-leaf)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <path d={`M${x - 14} ${y - 4} q2 -10 10 -14`} fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          </g>
        ))}
      </Nong>
    ),
  },
  "giong-rice-basket": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={110} />
        {/* Gạo vun có hạt */}
        <path d="M-74 -62 Q-62 -152 0 -154 Q62 -152 74 -62 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[
          [-30, -100],
          [10, -126],
          [36, -90],
          [-10, -84],
          [-46, -78],
          [50, -110],
        ].map(([x, y], i) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="6" ry="3.5" fill="#CFC6B2" transform={`rotate(${i * 40} ${x} ${y})`} />
        ))}
        <path d="M-50 -100 Q-36 -134 -6 -142" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        {/* Thúng đan */}
        <defs>
          <clipPath id="t1-thung-clip">
            <path d="M-92 -70 L92 -70 Q84 0 0 0 Q-84 0 -92 -70 Z" />
          </clipPath>
        </defs>
        <path d="M-92 -70 L92 -70 Q84 0 0 0 Q-84 0 -92 -70 Z" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <g clipPath="url(#t1-thung-clip)" opacity="0.6">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`a${i}`} d={`M${-110 + i * 18} -70 l30 70`} stroke="#9C7A3A" strokeWidth="3" />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`b${i}`} d={`M${-80 + i * 18} -70 l-30 70`} stroke="#9C7A3A" strokeWidth="3" />
          ))}
        </g>
        <path d="M-84 -50 Q-80 -14 -40 -6" fill="none" stroke="#FFF1C8" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <rect x="-98" y="-80" width="196" height="18" rx="9" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
        {[-80, -50, -20, 10, 40, 70].map((x) => (
          <path key={x} d={`M${x} -78 l8 14`} stroke="#4A2B16" strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>
    ),
  },
  "giong-iron-horse": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={300} />
        {/* Lửa phun từ miệng, nhiều lưỡi */}
        <path d="M440 -380 Q500 -450 600 -430 Q560 -414 640 -396 Q580 -380 620 -340 Q556 -360 560 -316 Q500 -356 440 -350 Z" fill="url(#t1-fire)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M458 -372 Q510 -414 576 -404 Q544 -388 594 -376 Q540 -370 556 -344 Q506 -364 458 -360 Z" fill="#FFE08A" />
        {/* Đuôi lửa */}
        <path d="M-196 -178 Q-300 -250 -320 -150 Q-286 -186 -280 -120 Q-250 -170 -236 -110 Q-224 -160 -196 -130 Z" fill="url(#t1-fire)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-206 -166 Q-270 -206 -290 -156 Q-262 -170 -256 -134 Q-236 -164 -212 -144 Z" fill="#FFE08A" />
        {/* Bốn chân sắt có khớp gối, móng sắt */}
        {[-150, -96, 96, 150].map((x, i) => (
          <g key={x}>
            <path d={`M${x} -120 L${x + (i < 2 ? -6 : 6)} -64 L${x} -24`} fill="none" stroke={INK} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`M${x} -120 L${x + (i < 2 ? -6 : 6)} -64 L${x} -24`} fill="none" stroke={i % 2 ? "#7E7E78" : "#9C9C96"} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={x + (i < 2 ? -6 : 6)} cy={-64} r="13" fill="url(#w-metal)" stroke={INK} strokeWidth="5" />
            <path d={`M${x - 26} 0 L${x - 20} -26 L${x + 20} -26 L${x + 26} 0 Z`} fill="url(#w-dark)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          </g>
        ))}
        {/* Cổ ngựa giáp vảy */}
        <path d="M150 -160 Q250 -230 290 -390" fill="none" stroke={INK} strokeWidth="120" strokeLinecap="round" />
        <path d="M150 -160 Q250 -230 290 -390" fill="none" stroke="#A3A39C" strokeWidth="102" strokeLinecap="round" />
        <path d="M168 -186 Q240 -236 270 -360" fill="none" stroke="#D4D4CC" strokeWidth="18" strokeLinecap="round" opacity="0.7" />
        {[0.25, 0.45, 0.65, 0.85].map((t) => {
          const x = 150 + (290 - 150) * t + 40 * Math.sin(Math.PI * t);
          const y = -160 + (-390 + 160) * t - 20 * Math.sin(Math.PI * t);
          return <path key={t} d={`M${x - 46} ${y + 14} Q${x} ${y - 10} ${x + 46} ${y + 14}`} fill="none" stroke="#5E5E5A" strokeWidth="5" />;
        })}
        {/* Bờm lửa dựng */}
        <path d="M196 -240 L150 -268 L200 -290 L166 -330 L224 -340 L200 -390 L254 -392 L246 -446 L280 -420 Z" fill="url(#t1-fire)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Đầu ngựa: mũ giáp, tai nhọn, chùm lông đỏ */}
        <path d="M262 -440 L268 -526 L312 -452 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M250 -420 Q300 -486 384 -444 Q444 -412 460 -380 Q466 -338 420 -332 Q360 -328 300 -340 Q248 -360 250 -420 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        <path d="M290 -446 Q350 -480 420 -420 L404 -404 Q350 -450 296 -424 Z" fill="url(#t1-steel)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M300 -436 Q340 -458 380 -440" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
        <path d="M296 -470 Q280 -540 320 -560 Q312 -520 336 -500 Q330 -540 360 -548 Q344 -500 320 -464 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="318" cy="-408" r="15" fill="#FFE08A" stroke={INK} strokeWidth="5" />
        <circle cx="320" cy="-408" r="6" fill={INK} />
        <ellipse cx="440" cy="-368" rx="8" ry="6" fill={INK} />
        <path d="M410 -340 Q436 -350 456 -362" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        {/* Dây cương đỏ */}
        <path d="M300 -350 L330 -420 M300 -350 L384 -356 M300 -350 Q220 -290 120 -200" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
        <path d="M300 -350 L330 -420 M300 -350 L384 -356 M300 -350 Q220 -290 120 -200" fill="none" stroke="#B8402E" strokeWidth="6" strokeLinecap="round" />
        {/* Thân + giáp phủ vảy */}
        <ellipse cx="0" cy="-152" rx="222" ry="76" fill="url(#w-metal)" stroke={INK} strokeWidth="9" />
        <path d="M-180 -190 Q-60 -230 120 -206" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
        <path d="M-204 -140 Q0 -100 204 -140 L188 -50 Q0 -28 -188 -50 Z" fill="url(#t1-steel)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[-150, -100, -50, 0, 50, 100, 150].map((x) => (
          <path key={x} d={`M${x - 25} ${-108 + Math.abs(x) * 0.08} q25 22 50 0`} fill="none" stroke="#3E3E3A" strokeWidth="4" />
        ))}
        {[-160, -110, -60, -10, 40, 90, 140].map((x) => (
          <circle key={x} cx={x + 10} cy={-70 + Math.abs(x) * 0.05} r="6" fill="url(#w-brass)" stroke={INK} strokeWidth="3" />
        ))}
        <path d="M-188 -50 Q0 -28 188 -50 L184 -40 Q0 -16 -184 -40 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Yên sơn son viền đồng */}
        <path d="M-74 -216 Q0 -240 74 -216 L62 -184 Q0 -200 -62 -184 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-66 -212 Q0 -232 66 -212" fill="none" stroke="url(#w-brass)" strokeWidth="6" />
      </g>
    ),
  },
  "giong-iron-rod": {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-20" x2="0" y2="230" stroke={INK} strokeWidth="24" strokeLinecap="round" />
        <line x1="0" y1="-20" x2="0" y2="230" stroke="#7E7E78" strokeWidth="14" strokeLinecap="round" />
        <line x1="-3" y1="-10" x2="-3" y2="220" stroke="#D4D4CC" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        {/* Chuôi quấn vải đỏ */}
        {[-14, -2, 10, 22].map((y) => (
          <path key={y} d={`M-12 ${y} L12 ${y + 8}`} stroke={INK} strokeWidth="9" strokeLinecap="round" />
        ))}
        {[-14, -2, 10, 22].map((y) => (
          <path key={`r${y}`} d={`M-12 ${y} L12 ${y + 8}`} stroke="#B8402E" strokeWidth="5" strokeLinecap="round" />
        ))}
        {/* Đai đồng */}
        {[50, 120, 190].map((y) => (
          <rect key={y} x="-15" y={y} width="30" height="14" rx="5" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        ))}
        <circle cx="0" cy="234" r="14" fill="url(#w-metal)" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },

  // ------------------------------------------------ Chó Vàng & Mèo Mướp (Tập 3: Chó treo mèo đậy)
  "cho-vang-treo": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        {/* Dây thừng thả từ trần nhà qua ròng rọc gỗ */}
        <line x1="0" y1="-1260" x2="0" y2="-610" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-1260" x2="0" y2="-610" stroke="#C89B54" strokeWidth="10" strokeLinecap="round" />
        <circle cx="0" cy="-770" r="28" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
        <circle cx="0" cy="-770" r="10" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        {/* Hai dây đai treo vào bụng con Vàng */}
        <path d="M0 -616 L-44 -516 M0 -616 L40 -516" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <path d="M0 -616 L-44 -516 M0 -616 L40 -516" stroke="#C89B54" strokeWidth="7" strokeLinecap="round" />
        <circle cx="0" cy="-616" r="12" fill="url(#w-turmeric)" stroke={INK} strokeWidth="5" />

        {/* Con Vàng lơ lửng trên cao */}
        <g transform="translate(0 -470)">
          {/* Đuôi cong vểnh và vạch ngoáy đuôi */}
          <path d="M-86 -26 Q-148 -78 -118 -124 Q-96 -110 -102 -74" fill="none" stroke={INK} strokeWidth="24" strokeLinecap="round" />
          <path d="M-86 -26 Q-148 -78 -118 -124 Q-96 -110 -102 -74" fill="none" stroke="#F4A940" strokeWidth="14" strokeLinecap="round" />
          <path d="M-142 -96 q-16 -18 -4 -36 M-158 -82 q-18 -20 -4 -40" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />

          {/* Hai chân sau & hai chân trước buông thõng đạp giữa không trung */}
          {[
            [-68, 42, 16],
            [-36, 52, -10],
            [32, 52, 12],
            [62, 42, -14],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <rect x="-15" y="-20" width="30" height="68" rx="15" fill="url(#t1-fur)" stroke={INK} strokeWidth="6" />
              <ellipse cx="0" cy="46" rx="18" ry="12" fill="url(#t1-cream)" stroke={INK} strokeWidth="5" />
              <circle cx="0" cy="48" r="5" fill="#F2A08A" />
            </g>
          ))}

          {/* Thân chó béo tròn */}
          <ellipse cx="-6" cy="0" rx="96" ry="64" fill="url(#t1-fur)" stroke={INK} strokeWidth="7" />
          <ellipse cx="-4" cy="18" rx="68" ry="38" fill="url(#t1-cream)" />
          <Shine d="M-84 -20 Q-74 -44 -52 -54" opacity={0.6} />

          {/* Đai vải đỏ quấn bụng treo lên */}
          <path d="M-52 -56 L42 -56 L50 54 L-60 54 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <line x1="-22" y1="-54" x2="-28" y2="52" stroke="#FFD93D" strokeWidth="6" />
          <line x1="14" y1="-54" x2="18" y2="52" stroke="#FFD93D" strokeWidth="6" />

          {/* Vòng cổ xanh + chuông vàng */}
          <path d="M52 -42 Q78 -12 58 28" fill="none" stroke="#2B6CB0" strokeWidth="14" strokeLinecap="round" />
          <circle cx="72" cy="22" r="14" fill="url(#w-brass)" stroke={INK} strokeWidth="5" />
          <circle cx="72" cy="25" r="3" fill={INK} />

          {/* Đầu con Vàng ngơ ngác nhìn xuống */}
          <g transform="translate(86 -42)">
            {/* Tai sau cụp */}
            <path d="M18 -56 Q62 -66 56 -8 Q48 16 26 2 Z" fill="url(#t1-ear)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            {/* Khuôn mặt tròn */}
            <ellipse cx="0" cy="0" rx="64" ry="58" fill="url(#t1-fur)" stroke={INK} strokeWidth="7" />
            <ellipse cx="18" cy="14" rx="40" ry="32" fill="url(#t1-cream)" />
            {/* Tai trước cụp */}
            <path d="M-26 -48 Q-72 -44 -58 14 Q-42 30 -24 6 Z" fill="url(#t1-ear)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
            {/* Mắt tròn xoe ngơ ngác */}
            <circle cx="-6" cy="-12" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <circle cx="-4" cy="-10" r="5" fill={INK} />
            <circle cx="26" cy="-12" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <circle cx="28" cy="-10" r="5" fill={INK} />
            <path d="M-18 -30 Q-6 -38 4 -30 M16 -30 Q26 -38 38 -30" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            {/* Má hồng */}
            <ellipse cx="-18" cy="8" rx="10" ry="6" fill="#F2A08A" opacity="0.8" />
            {/* Mũi đen + lưỡi hồng thè */}
            <ellipse cx="38" cy="4" rx="13" ry="10" fill={INK} />
            <ellipse cx="35" cy="1" rx="4" ry="2.5" fill="#FFFFFF" />
            <path d="M14 22 Q26 52 40 24 Z" fill="#FF6B8B" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <path d="M6 18 Q22 28 34 16 Q44 26 52 16" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            {/* Giọt mồ hôi ngơ ngác */}
            <path d="M-42 -36 Q-50 -16 -38 -14 Q-26 -16 -34 -36 Z" fill="#F0CB8E" stroke={INK} strokeWidth="4" />
          </g>

          {text ? (
            <g transform="translate(90 -170)">
              <rect x="-88" y="-38" width="176" height="64" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
              <path d="M-16 26 L-4 46 L14 26 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
              <Lines text={text} cy={-6} width={150} max={34} color={INK} font={TEXT_FONT} />
            </g>
          ) : null}
        </g>
      </g>
    ),
  },

  "cho-vang": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <SoftShadow cx={-10} cy={-4} rx={120} />
        {/* Đuôi cong vẫy */}
        <path d="M-66 -46 Q-126 -86 -102 -136" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M-66 -46 Q-126 -86 -102 -136" fill="none" stroke="#F4A940" strokeWidth="12" strokeLinecap="round" />
        <path d="M-124 -106 q-14 -16 -4 -34 M-138 -92 q-16 -18 -4 -36" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        {/* Thân ngồi */}
        <ellipse cx="-14" cy="-64" rx="68" ry="58" fill="url(#t1-fur)" stroke={INK} strokeWidth="7" />
        <ellipse cx="12" cy="-58" rx="44" ry="46" fill="url(#t1-cream)" />
        <Shine d="M-66 -86 Q-58 -106 -38 -114" opacity={0.6} />
        {/* Chân sau & chân trước */}
        <ellipse cx="-52" cy="-16" rx="28" ry="18" fill="url(#t1-fur)" stroke={INK} strokeWidth="6" />
        <rect x="-8" y="-58" width="26" height="58" rx="12" fill="url(#t1-fur)" stroke={INK} strokeWidth="6" />
        <rect x="22" y="-58" width="26" height="58" rx="12" fill="url(#t1-fur)" stroke={INK} strokeWidth="6" />
        <ellipse cx="6" cy="-4" rx="16" ry="10" fill="url(#t1-cream)" stroke={INK} strokeWidth="5" />
        <ellipse cx="36" cy="-4" rx="16" ry="10" fill="url(#t1-cream)" stroke={INK} strokeWidth="5" />
        {/* Vòng cổ đỏ + chuông vàng */}
        <path d="M-18 -112 Q22 -96 52 -112" fill="none" stroke="#D64545" strokeWidth="14" strokeLinecap="round" />
        <circle cx="32" cy="-98" r="13" fill="url(#w-brass)" stroke={INK} strokeWidth="5" />
        {/* Đầu con Vàng */}
        <g transform="translate(22 -156)">
          <ellipse cx="0" cy="0" rx="58" ry="52" fill="url(#t1-fur)" stroke={INK} strokeWidth="7" />
          <ellipse cx="18" cy="12" rx="36" ry="28" fill="url(#t1-cream)" />
          <path d="M-24 -42 Q-66 -36 -52 16 Q-36 30 -20 6 Z" fill="url(#t1-ear)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <circle cx="-4" cy="-10" r="9" fill={INK} />
          <circle cx="-6" cy="-13" r="3" fill="#FFFFFF" />
          <circle cx="26" cy="-10" r="9" fill={INK} />
          <circle cx="24" cy="-13" r="3" fill="#FFFFFF" />
          <ellipse cx="38" cy="4" rx="12" ry="9" fill={INK} />
          <path d="M14 20 Q26 46 38 22 Z" fill="#FF6B8B" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <path d="M6 16 Q22 26 32 14 Q42 24 50 14" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        </g>
        {text ? (
          <g transform="translate(26 -266)">
            <rect x="-84" y="-36" width="168" height="60" rx="20" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
            <path d="M-14 24 L-2 42 L12 24 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <Lines text={text} cy={-6} width={144} max={32} color={INK} font={TEXT_FONT} />
          </g>
        ) : null}
      </g>
    ),
  },

  "cho-vang-an": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cx={10} cy={-4} rx={170} />
        {/* Đuôi vẫy tít */}
        <path d="M-92 -78 Q-154 -128 -124 -176" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M-92 -78 Q-154 -128 -124 -176" fill="none" stroke="#F4A940" strokeWidth="12" strokeLinecap="round" />
        <path d="M-148 -144 q-16 -18 -4 -36 M-100 -164 q14 -18 32 -10" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        {/* Thân cúi chổng mông ăn */}
        <ellipse cx="-32" cy="-62" rx="76" ry="52" fill="url(#t1-fur)" stroke={INK} strokeWidth="7" transform="rotate(14 -32 -62)" />
        <ellipse cx="-82" cy="-16" rx="26" ry="16" fill="url(#t1-fur)" stroke={INK} strokeWidth="6" />
        <ellipse cx="18" cy="-12" rx="24" ry="14" fill="url(#t1-cream)" stroke={INK} strokeWidth="6" />
        {/* Vòng cổ đỏ */}
        <path d="M18 -96 Q38 -62 20 -26" fill="none" stroke="#D64545" strokeWidth="13" strokeLinecap="round" />
        {/* Đầu cúi gặm đùi thịt */}
        <g transform="translate(56 -56) rotate(18)">
          <ellipse cx="0" cy="0" rx="54" ry="48" fill="url(#t1-fur)" stroke={INK} strokeWidth="7" />
          <ellipse cx="18" cy="14" rx="36" ry="28" fill="url(#t1-cream)" />
          <path d="M-20 -38 Q-58 -28 -44 20 Q-28 32 -14 8 Z" fill="url(#t1-ear)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          {/* Mắt nhắm tít sung sướng */}
          <path d="M-12 -10 q10 -12 20 0 M18 -10 q10 -12 20 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-6" cy="8" rx="10" ry="6" fill="#F2A08A" opacity="0.85" />
          <ellipse cx="36" cy="2" rx="11" ry="8" fill={INK} />
        </g>
        {/* Đùi thịt quay to dưới đất */}
        <g transform="translate(118 -24) rotate(-14)">
          <rect x="28" y="-14" width="44" height="16" rx="7" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
          <circle cx="72" cy="-14" r="10" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
          <circle cx="72" cy="2" r="10" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
          <ellipse cx="0" cy="-8" rx="46" ry="30" fill="url(#t1-meat)" stroke={INK} strokeWidth="6" />
          <ellipse cx="-8" cy="-16" rx="18" ry="9" fill="#E9A75A" />
        </g>
        {/* Tia ngon lành */}
        <path d="M76 -124 L84 -146 M104 -116 L122 -134 M124 -94 L146 -102" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },

  "meo-muop-day": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <SoftShadow cx={0} cy={-4} rx={200} />
        {/* Đuôi mèo vằn thò ra bên trái lồng bàn */}
        <path d="M-126 -18 Q-192 -42 -176 -108 Q-162 -144 -138 -122" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M-126 -18 Q-192 -42 -176 -108 Q-162 -144 -138 -122" fill="none" stroke="#E89238" strokeWidth="12" strokeLinecap="round" />
        <path d="M-164 -52 l14 -6 M-174 -78 l14 -4 M-168 -104 l14 2" stroke="#6B3E16" strokeWidth="6" strokeLinecap="round" />

        {/* Cái lồng bàn đan tre bị kênh nghiêng */}
        <g transform="translate(-10 -8) rotate(-8)">
          <path d="M-144 0 Q-140 -168 0 -174 Q140 -168 144 0 Z" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          {/* Nan tre đan chéo */}
          {[-90, -45, 0, 45, 90].map((x) => (
            <path key={x} d={`M${x} 0 Q${x * 0.5} -162 0 -172`} fill="none" stroke="#B58938" strokeWidth="5" />
          ))}
          {[-42, -88, -130].map((y, i) => (
            <line key={y} x1={-136 + i * 26} y1={y} x2={136 - i * 26} y2={y} stroke="#B58938" strokeWidth="5" />
          ))}
          {/* Núm cầm lồng bàn và vành đế */}
          <path d="M-24 -172 Q0 -206 24 -172" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
          <rect x="-150" y="-16" width="300" height="18" rx="8" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" />
          <Shine d="M-110 -60 Q-100 -120 -50 -150" opacity={0.5} />
        </g>

        {/* Đầu con Mướp lém lỉnh thò ra khỏi mép phải lồng bàn */}
        <g transform="translate(124 -58)">
          {/* Chân trước thò ra */}
          <ellipse cx="-16" cy="48" rx="20" ry="12" fill="url(#t1-cream)" stroke={INK} strokeWidth="6" />
          {/* Hai tai nhọn */}
          <path d="M-42 -26 L-52 -78 L-8 -46 Z" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M-40 -34 L-46 -64 L-18 -44 Z" fill="#FF9EB5" />
          <path d="M12 -46 L46 -78 L42 -22 Z" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M18 -44 L38 -64 L36 -28 Z" fill="#FF9EB5" />
          {/* Mặt mèo tròn */}
          <ellipse cx="0" cy="0" rx="52" ry="44" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" />
          <ellipse cx="4" cy="14" rx="34" ry="24" fill="url(#t1-cream)" />
          {/* Vằn chữ M trên trán & vằn má */}
          <path d="M-16 -32 L-8 -18 L0 -30 L8 -18 L16 -32" fill="none" stroke="#6B3E16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-44 -4 L-30 -2 M-42 6 L-28 6 M44 -4 L30 -2 M42 6 L28 6" stroke="#6B3E16" strokeWidth="4.5" strokeLinecap="round" />
          {/* Mắt xanh lá tinh ranh */}
          <ellipse cx="-16" cy="-4" rx="11" ry="12" fill="#68D391" stroke={INK} strokeWidth="5" />
          <ellipse cx="-14" cy="-4" rx="4" ry="9" fill={INK} />
          <ellipse cx="18" cy="-4" rx="11" ry="12" fill="#68D391" stroke={INK} strokeWidth="5" />
          <ellipse cx="20" cy="-4" rx="4" ry="9" fill={INK} />
          {/* Mũi hồng + miệng chữ w + ria mép */}
          <polygon points="-6,8 6,8 0,15" fill="#FF6B8B" stroke={INK} strokeWidth="3" />
          <path d="M-14 20 Q-6 28 0 18 Q6 28 14 20" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M-32 10 L-68 4 M-32 18 L-68 20 M32 10 L68 4 M32 18 L68 20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>

        {text ? (
          <g transform="translate(130 -178)">
            <rect x="-78" y="-34" width="156" height="56" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
            <path d="M-12 22 L-2 38 L10 22 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <Lines text={text} cy={-6} width={136} max={30} color={INK} font={TEXT_FONT} />
          </g>
        ) : null}
      </g>
    ),
  },

  "meo-muop": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        <SoftShadow cx={0} cy={-4} rx={100} />
        {/* Đuôi dài vằn mướp cong hình dấu hỏi */}
        <path d="M-46 -32 Q-112 -58 -98 -128 Q-86 -166 -58 -144" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M-46 -32 Q-112 -58 -98 -128 Q-86 -166 -58 -144" fill="none" stroke="#E89238" strokeWidth="11" strokeLinecap="round" />
        <path d="M-86 -66 l12 -4 M-96 -94 l12 -2 M-90 -122 l12 2" stroke="#6B3E16" strokeWidth="5.5" strokeLinecap="round" />
        {/* Thân mèo ngồi */}
        <ellipse cx="-8" cy="-58" rx="54" ry="52" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" />
        <path d="M-48 -78 L-24 -72 M-52 -58 L-26 -54 M-46 -38 L-22 -36" stroke="#6B3E16" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="10" cy="-52" rx="34" ry="40" fill="url(#t1-cream)" />
        <Shine d="M-50 -90 Q-40 -106 -24 -110" opacity={0.55} />
        {/* Chân */}
        <ellipse cx="-38" cy="-12" rx="22" ry="14" fill="url(#t1-tabby)" stroke={INK} strokeWidth="6" />
        <rect x="-4" y="-50" width="22" height="50" rx="10" fill="url(#t1-tabby)" stroke={INK} strokeWidth="6" />
        <rect x="20" y="-50" width="22" height="50" rx="10" fill="url(#t1-tabby)" stroke={INK} strokeWidth="6" />
        <ellipse cx="8" cy="-4" rx="14" ry="9" fill="url(#t1-cream)" stroke={INK} strokeWidth="5" />
        <ellipse cx="32" cy="-4" rx="14" ry="9" fill="url(#t1-cream)" stroke={INK} strokeWidth="5" />
        {/* Vòng cổ xanh + lục lạc */}
        <path d="M-16 -102 Q16 -88 42 -102" fill="none" stroke="#2B6CB0" strokeWidth="12" strokeLinecap="round" />
        <circle cx="24" cy="-90" r="11" fill="url(#w-brass)" stroke={INK} strokeWidth="4.5" />
        {/* Đầu mèo */}
        <g transform="translate(14 -146)">
          <path d="M-42 -26 L-52 -78 L-8 -46 Z" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M-40 -34 L-46 -64 L-18 -44 Z" fill="#FF9EB5" />
          <path d="M12 -46 L46 -78 L42 -22 Z" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M18 -44 L38 -64 L36 -28 Z" fill="#FF9EB5" />
          <ellipse cx="0" cy="0" rx="52" ry="44" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" />
          <ellipse cx="4" cy="14" rx="34" ry="24" fill="url(#t1-cream)" />
          <path d="M-16 -32 L-8 -18 L0 -30 L8 -18 L16 -32" fill="none" stroke="#6B3E16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="-16" cy="-4" rx="11" ry="12" fill="#68D391" stroke={INK} strokeWidth="5" />
          <ellipse cx="-14" cy="-4" rx="4" ry="9" fill={INK} />
          <ellipse cx="18" cy="-4" rx="11" ry="12" fill="#68D391" stroke={INK} strokeWidth="5" />
          <ellipse cx="20" cy="-4" rx="4" ry="9" fill={INK} />
          <polygon points="-6,8 6,8 0,15" fill="#FF6B8B" stroke={INK} strokeWidth="3" />
          <path d="M-14 20 Q-6 28 0 18 Q6 28 14 20" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M-32 10 L-68 4 M-32 18 L-68 20 M32 10 L68 4 M32 18 L68 20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
        {text ? (
          <g transform="translate(20 -252)">
            <rect x="-78" y="-34" width="156" height="56" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
            <path d="M-12 22 L-2 38 L10 22 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <Lines text={text} cy={-6} width={136} max={30} color={INK} font={TEXT_FONT} />
          </g>
        ) : null}
      </g>
    ),
  },

  "meo-muop-an": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cx={20} cy={-4} rx={130} />
        {/* Đuôi ngoe nguẩy khoái chí */}
        <path d="M-56 -36 Q-122 -68 -104 -138 Q-90 -174 -62 -152" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M-56 -36 Q-122 -68 -104 -138 Q-90 -174 -62 -152" fill="none" stroke="#E89238" strokeWidth="11" strokeLinecap="round" />
        {/* Thân mèo ngồi trên bàn */}
        <ellipse cx="-14" cy="-58" rx="54" ry="50" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" />
        <ellipse cx="4" cy="-52" rx="34" ry="38" fill="url(#t1-cream)" />
        {/* Đầu mèo mắt nhắm tít khoái chí */}
        <g transform="translate(8 -138) rotate(8)">
          <path d="M-42 -26 L-52 -78 L-8 -46 Z" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M-40 -34 L-46 -64 L-18 -44 Z" fill="#FF9EB5" />
          <path d="M12 -46 L46 -78 L42 -22 Z" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M18 -44 L38 -64 L36 -28 Z" fill="#FF9EB5" />
          <ellipse cx="0" cy="0" rx="52" ry="44" fill="url(#t1-tabby)" stroke={INK} strokeWidth="7" />
          <ellipse cx="6" cy="14" rx="34" ry="24" fill="url(#t1-cream)" />
          <path d="M-16 -32 L-8 -18 L0 -30 L8 -18 L16 -32" fill="none" stroke="#6B3E16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-24 -4 q10 -12 20 0 M8 -4 q10 -12 20 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-22" cy="10" rx="9" ry="5" fill="#F2A08A" opacity="0.85" />
          <ellipse cx="26" cy="10" rx="9" ry="5" fill="#F2A08A" opacity="0.85" />
          <polygon points="-4,8 8,8 2,15" fill="#FF6B8B" stroke={INK} strokeWidth="3" />
          <path d="M-6 18 Q6 36 18 18 Z" fill="#FF6B8B" stroke={INK} strokeWidth="4" />
          <path d="M-30 12 L-64 6 M-30 20 L-64 22 M34 12 L68 6 M34 20 L68 22" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* Đĩa cá kho và con cá bị gặm trước mặt mèo */}
        <g transform="translate(56 -12)">
          <ellipse cx="0" cy="-6" rx="74" ry="18" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
          <ellipse cx="0" cy="-8" rx="54" ry="11" fill="url(#t1-meat)" opacity="0.55" />
          {/* Thân cá kho */}
          <path d="M-46 -18 Q-10 -44 34 -18 L58 -34 L54 -4 L34 -14 Q-10 4 -46 -18 Z" fill="#B8561E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <circle cx="-26" cy="-20" r="4" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
          <path d="M-6 -26 L-2 -12 M10 -26 L14 -12" stroke="#FFE08A" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        {/* Chân trước ôm cá */}
        <ellipse cx="22" cy="-42" rx="18" ry="11" fill="url(#t1-cream)" stroke={INK} strokeWidth="5" transform="rotate(20 22 -42)" />
      </g>
    ),
  },

  "gio-thit-treo": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Dây thừng treo từ trần nhà xuống */}
        <line x1="0" y1="-1260" x2="0" y2="-660" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <line x1="0" y1="-1260" x2="0" y2="-660" stroke="#C89B54" strokeWidth="7" strokeLinecap="round" />
        <circle cx="0" cy="-800" r="22" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
        <path d="M0 -660 L-58 -560 M0 -660 L58 -560" stroke={INK} strokeWidth="10" strokeLinecap="round" />
        {/* Giỏ tre đan đựng đùi thịt thơm phức */}
        <g transform="translate(0 -540)">
          {/* Khói thơm bốc lên */}
          <path d="M-24 -78 q-10 -18 4 -34 q12 -16 0 -32 M18 -84 q-10 -18 4 -34 q12 -16 0 -32" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
          {/* Đùi thịt quay trong giỏ */}
          <g transform="translate(-6 -26) rotate(-18)">
            <rect x="24" y="-12" width="42" height="16" rx="7" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
            <circle cx="66" cy="-12" r="9" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
            <circle cx="66" cy="4" r="9" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
            <ellipse cx="-6" cy="-6" rx="44" ry="28" fill="url(#t1-meat)" stroke={INK} strokeWidth="6" />
            <ellipse cx="-14" cy="-14" rx="16" ry="8" fill="#E9A75A" />
          </g>
          {/* Giỏ tre */}
          <path d="M-76 -20 L76 -20 Q64 38 0 38 Q-64 38 -76 -20 Z" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="-82" y="-28" width="164" height="14" rx="6" fill="url(#t1-rope)" stroke={INK} strokeWidth="6" />
          <Shine d="M-56 -4 Q-50 18 -30 28" opacity={0.5} />
          {[-44, -14, 16, 46].map((x) => (
            <line key={x} x1={x} y1="-14" x2={x * 0.75} y2="32" stroke="#B58938" strokeWidth="4.5" />
          ))}
        </g>
      </g>
    ),
  },

  "ca-be-ca": {
    mode: "upright",
    draw: ({ text }) => <Fishbowl scared={false} text={text} />,
  },

  "ca-be-ca-so": {
    mode: "upright",
    draw: ({ text }) => <Fishbowl scared text={text} />,
  },

  "ca-hu-muoi": {
    mode: "upright",
    draw: ({ mirrored }) => (
      <g>
        {/* Hũ sành nâu, miệng vun muối trắng */}
        <path d="M-40 -96 Q-60 -62 -50 -18 Q-44 0 0 0 Q44 0 50 -18 Q60 -62 40 -96 Z" fill="#8A5A3B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-30 -84 Q-44 -56 -38 -24" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" />
        <rect x="-36" y="-110" width="72" height="18" rx="7" fill="#6E4428" stroke={INK} strokeWidth="6" />
        <path d="M-32 -110 Q-8 -146 16 -128 Q30 -122 32 -110 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {[
          [-14, -122],
          [4, -132],
          [18, -118],
        ].map(([x, y]) => (
          <rect key={`${x}`} x={x} y={y} width="6" height="6" fill="#DDE6EE" transform={`rotate(20 ${x} ${y})`} />
        ))}
        {/* Nhãn giấy "MUỐI" */}
        <rect x="-34" y="-76" width="68" height="36" rx="5" fill="#F7E6C4" stroke={INK} strokeWidth="4.5" />
        <Unmirror mirrored={mirrored}>
          <text x="0" y="-50" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="22" fill="#B8382A">
            MUỐI
          </text>
        </Unmirror>
      </g>
    ),
  },

  "ca-ro-uop": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={120} />
        {/* Ba con cá bạc nằm trong rổ, phủ muối trắng */}
        {[
          [-50, -58, -8],
          [10, -66, 6],
          [56, -54, -4],
        ].map(([x, y, r]) => (
          <g key={`${x}`} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-46 0 Q-6 -26 36 0 Q-6 24 -46 0 Z" fill="#C9D6DE" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <path d="M36 0 L58 -16 L54 0 L58 16 Z" fill="#9FB2BE" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            <circle cx="-30" cy="-3" r="5" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
            <circle cx="-30" cy="-3" r="2" fill={INK} />
            <path d="M-20 -14 Q-14 0 -20 12" fill="none" stroke={INK} strokeWidth="3" />
          </g>
        ))}
        {/* Hạt muối rắc đều */}
        {[-74, -52, -30, -8, 14, 36, 58, 80, -62, -18, 26, 70].map((x, i) => (
          <rect key={i} x={x} y={-80 + (i % 3) * 12 + (i > 7 ? 18 : 0)} width="7" height="7" fill="#FFFFFF" stroke="#B8C6D0" strokeWidth="1.5" transform={`rotate(25 ${x} ${-80 + (i % 3) * 12})`} />
        ))}
        {/* Rổ tre */}
        <path d="M-120 -44 L120 -44 Q106 0 0 0 Q-106 0 -120 -44 Z" fill="url(#t1-bamboo)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-126" y="-52" width="252" height="14" rx="6" fill="url(#t1-rope)" stroke={INK} strokeWidth="6" />
        {[-80, -40, 0, 40, 80].map((x) => (
          <line key={x} x1={x} y1="-38" x2={x * 0.8} y2="-4" stroke="#B58938" strokeWidth="4.5" />
        ))}
      </g>
    ),
  },

  "ca-ca-uon": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={110} />
        <ellipse cx="0" cy="-12" rx="100" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
        {/* Cá ươn xám xịt, mắt dấu X */}
        <path d="M-66 -26 Q-10 -62 46 -26 Q-10 6 -66 -26 Z" fill="#9AA889" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M46 -26 L78 -48 L72 -26 L78 -4 Z" fill="#7E8C6E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-50 -36 l10 10 M-40 -36 l-10 10" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <path d="M-28 -44 Q-20 -26 -28 -10" fill="none" stroke={INK} strokeWidth="3.5" />
        <ellipse cx="6" cy="-30" rx="10" ry="6" fill="#6F7E5E" opacity="0.7" />
        {/* Mùi hôi bốc lên */}
        {[-40, 0, 40].map((x, i) => (
          <path key={x} d={`M${x} -66 q-14 -18 0 -36 q14 -18 0 -36 q-14 -18 0 -36`} fill="none" stroke="#7BAA3A" strokeWidth="7" strokeLinecap="round" opacity={0.85 - i * 0.1} />
        ))}
        {/* Hai con ruồi */}
        {[
          [-62, -150],
          [58, -176],
        ].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <ellipse cx="-7" cy="-9" rx="8" ry="5" fill="#E8F4FF" stroke={INK} strokeWidth="2.5" transform="rotate(-30 -7 -9)" />
            <ellipse cx="7" cy="-9" rx="8" ry="5" fill="#E8F4FF" stroke={INK} strokeWidth="2.5" transform="rotate(30 7 -9)" />
            <circle cx="0" cy="0" r="7" fill={INK} />
          </g>
        ))}
      </g>
    ),
  },
};

/** Mọi đạo cụ tự kèm gradient riêng "t1-". */
export const props = Object.fromEntries(
  Object.entries(rawProps).map(([id, p]) => [
    id,
    {
      mode: p.mode,
      draw: (o: Parameters<PropDef["draw"]>[0]) => (
        <g>
          <T1Defs />
          {p.draw(o)}
        </g>
      ),
    },
  ]),
) as Record<PropTuan1, PropDef>;

// ================================================================ phông

/** Ruộng lúa bậc thang phối cảnh (trung cảnh): các bờ ruộng cong, mạ xanh vàng xen nhau. */
const RiceTerraces: React.FC<{ y0: number; y1: number; id: string }> = ({ y0, y1, id }) => {
  const rows = 5;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9D88E" />
          <stop offset="1" stopColor="#9DB866" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6D58A" />
          <stop offset="1" stopColor="#C9B060" />
        </linearGradient>
      </defs>
      {Array.from({ length: rows }, (_, r) => {
        const a = y0 + ((y1 - y0) * r * (r + 1)) / (rows * (rows + 1));
        const b = y0 + ((y1 - y0) * (r + 1) * (r + 2)) / (rows * (rows + 1));
        const bend = 14 + r * 6;
        return (
          <g key={r}>
            <path
              d={`M-20 ${a} Q540 ${a - bend} 1100 ${a} L1100 ${b} Q540 ${b - bend - 6} -20 ${b} Z`}
              fill={`url(#${id}-${r % 2 ? "b" : "a"})`}
              stroke="#7A6A3E"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {Array.from({ length: 10 + r * 3 }, (_, i) => {
              const x = ((i + 0.5) * 1100) / (10 + r * 3);
              const yy = (a + b) / 2 - bend * 0.5 * (1 - ((x - 540) / 560) ** 2);
              return <path key={i} d={`M${x - 6} ${yy + 6} l6 -${10 + r * 2} l6 ${10 + r * 2}`} fill="none" stroke="#6E8E3E" strokeWidth={2 + r * 0.6} strokeLinecap="round" opacity="0.7" />;
            })}
          </g>
        );
      })}
    </>
  );
};

/** Bụi tre xa mờ (hậu cảnh) và đường đất chạy vào giữa. */
const DirtPath: React.FC<{ y0: number; x0: number; w0: number; id: string }> = ({ y0, x0, w0, id }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E3C38E" />
        <stop offset="1" stopColor="#C49A62" />
      </linearGradient>
    </defs>
    <path d={`M${x0 - w0 / 2} ${y0} Q${x0} ${y0 - 6} ${x0 + w0 / 2} ${y0} Q760 ${FLOOR - 120} 900 ${FLOOR + 4} L340 ${FLOOR + 4} Q560 ${FLOOR - 140} ${x0 - w0 / 2} ${y0} Z`} fill={`url(#${id})`} stroke="#8A6A42" strokeWidth="5" strokeLinejoin="round" />
  </>
);

/** Cây sung to: thân xù xì có quả mọc chùm, rễ bám đất, tán rộng nhiều lớp; gốc ở (x, FLOOR). */
const FigTree: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${FLOOR})`}>
    <SoftShadow cy={-4} rx={260} ry={34} />
    {/* Cành lớn */}
    {["M40 -470 Q120 -600 260 -650", "M-10 -470 Q-80 -590 -170 -630", "M30 -520 Q50 -640 20 -720"].map((d) => (
      <g key={d}>
        <path d={d} fill="none" stroke={INK} strokeWidth="50" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#8A6448" strokeWidth="36" strokeLinecap="round" />
      </g>
    ))}
    {/* Thân và rễ */}
    <path
      d="M-130 0 Q-90 -20 -80 -60 Q-60 -260 -80 -480 L120 -480 Q100 -260 120 -60 Q130 -20 170 0 Q100 -4 80 -30 Q40 0 20 0 Q-10 -6 -30 -30 Q-60 -4 -130 0 Z"
      fill="url(#w-wood-h)"
      stroke={INK}
      strokeWidth="9"
      strokeLinejoin="round"
    />
    <path d="M-40 -440 Q-30 -300 -46 -120 M60 -400 Q74 -260 58 -110" fill="none" stroke="#5E3A20" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
    <path d="M-56 -420 Q-50 -300 -60 -180" fill="none" stroke="#E2B07A" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
    {/* Tán lá */}
    <Canopy
      blobs={[
        [-170, -700, 130],
        [0, -790, 160],
        [180, -720, 140],
        [300, -630, 100],
        [-260, -610, 90],
        [70, -640, 120],
        [-90, -620, 110],
      ]}
      sw={8}
    />
    {/* Quả sung mọc chùm trên thân và cành */}
    {[
      [-30, -380],
      [-8, -360],
      [-40, -350],
      [70, -300],
      [90, -320],
      [56, -270],
      [10, -180],
      [36, -170],
      [-20, -160],
      [140, -600],
      [166, -620],
      [-110, -590],
      [-130, -610],
      [230, -650],
    ].map(([fx, fy]) => (
      <g key={`${fx}${fy}`}>
        <circle cx={fx} cy={fy} r="16" fill="#B9CC6E" stroke={INK} strokeWidth="5" />
        <circle cx={fx - 5} cy={fy - 5} r="5" fill="#E8F0B8" />
      </g>
    ))}
  </g>
);

/** Đường làng có cây sung to bên trái (quả mọc chùm trên thân), đồng lúa xa, đường đất. */
const SungTree: React.FC = () => (
  <>
    <WarmSky id="t1-sung-sky" h={FLOOR} sun={[860, 380]} />
    <VCloud x={600} y={300} s={0.9} />
    <VCloud x={960} y={520} s={0.6} />
    <FarMountains peaks={[[520, 760, 260], [820, 700, 300], [1080, 780, 220]]} foot={930} color="#D8C49E" shade="#C0A880" line="#9A8262" />
    <Hills id="t1-sung-h" y={900} amp={40} waves={2} phase={1.2} bottom={960} top="#B9CC86" base="#9DB86A" line="#6E5A3E" sw={5} />
    <Tree x={640} y={960} s={0.32} tone="far" />
    <ThatchHut x={860} y={960} s={0.34} />
    <RiceTerraces y0={950} y1={FLOOR} id="t1-sung-rice" />
    <DirtPath y0={950} x0={700} w0={60} id="t1-sung-path" />
    <VBamboo x={1010} y={FLOOR} s={0.62} flip />
    <FigTree x={170} />
    <Floor color="#C9A26E" line="#B38D5C" />
    <GrassTuft x={60} y={1300} s={1.1} />
    <GrassTuft x={1010} y={1330} s={1.2} flip />
    <GrassTuft x={940} y={1520} s={1.4} />
    <SkyRays from={[860, 380]} opacity={0.1} />
  </>
);

/** Đồng cỏ có đồi, cây xa, hoa dại (Ba chú heo con). */
const HeoMeadow: React.FC = () => (
  <>
    <WarmSky id="t1-heo-sky" h={FLOOR} sun={[180, 360]} />
    <VCloud x={480} y={380} s={1} />
    <VCloud x={880} y={290} s={1.1} />
    <FarMountains peaks={[[300, 740, 280], [700, 680, 320], [1000, 760, 240]]} foot={930} color="#D6C6A0" shade="#BCA884" line="#9A8262" />
    <Hills id="t1-heo-h1" y={900} amp={70} waves={2} phase={0.4} top="#C3D49C" base="#9DB57A" line="#7A6A48" sw={5} />
    <Tree x={600} y={960} s={0.34} tone="far" />
    <Tree x={930} y={940} s={0.4} tone="far" flip />
    <Hills id="t1-heo-h2" y={1040} amp={60} waves={2} phase={2.3} top="#B4CD82" base="#86A85A" />
    <Tree x={80} y={1120} s={0.5} />
    {/* Hoa dại trên đồi */}
    {[
      [300, 1100],
      [420, 1140],
      [700, 1110],
      [850, 1150],
      [560, 1170],
      [980, 1120],
    ].map(([x, y], i) => (
      <g key={x} transform={`translate(${x} ${y})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 7} cy={Math.sin((a * Math.PI) / 180) * 7} r="6" fill={i % 2 ? "#FFF6E0" : "#F2C14E"} stroke={INK} strokeWidth="2.5" />
        ))}
        <circle cx="0" cy="0" r="4" fill={i % 2 ? "#E3A631" : "#B8513A"} />
      </g>
    ))}
    <Floor color="#A9BC74" line="#8FA45E" />
    <GrassTuft x={50} y={1290} s={1.2} />
    <GrassTuft x={1030} y={1300} s={1.1} flip />
    <GrassTuft x={170} y={1500} s={1.4} flip />
    <GrassTuft x={920} y={1560} s={1.5} />
  </>
);

/** Cây cau thân mảnh, tàu lá xoè; gốc ở (x, y). */
const ArecaPalm: React.FC<{ x: number; y: number; h: number }> = ({ x, y, h }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={`M0 0 Q-14 ${-h * 0.5} 10 ${-h}`} fill="none" stroke={INK} strokeWidth="30" strokeLinecap="round" />
    <path d={`M0 0 Q-14 ${-h * 0.5} 10 ${-h}`} fill="none" stroke="#C4B08A" strokeWidth="18" strokeLinecap="round" />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1={-12} y1={(-h * (i + 1)) / 9} x2={12} y2={(-h * (i + 1)) / 9} stroke="#8A7458" strokeWidth="4" />
    ))}
    {/* Tàu lá cong rủ, lá chét hai bên */}
    {[
      [-1, 200, -40],
      [-1, 160, 30],
      [-1, 110, -90],
      [1, 200, -40],
      [1, 160, 30],
      [1, 110, -90],
      [1, 40, -150],
      [-1, 40, -150],
    ].map(([side, len, lift], i) => {
      const d = `M0 0 Q${side * len * 0.5} ${lift - 40} ${side * len} ${lift + 70}`;
      return (
        <g key={i} transform={`translate(10 ${-h})`}>
          {Array.from({ length: 7 }, (_, k) => {
            const t = (k + 1) / 8;
            const px = side * len * t;
            const py = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * (lift - 40) + t * t * (lift + 70);
            return (
              <g key={k}>
                <path d={`M${px} ${py} q${side * 14} 30 ${side * 8} 56`} fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
                <path d={`M${px} ${py} q${side * 14} 30 ${side * 8} 56`} fill="none" stroke={i % 2 ? "#7FA557" : "#5E8C40"} strokeWidth="5" strokeLinecap="round" />
                <path d={`M${px} ${py} q${-side * 6} 30 ${-side * 12} 48`} fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
                <path d={`M${px} ${py} q${-side * 6} 30 ${-side * 12} 48`} fill="none" stroke={i % 2 ? "#5E8C40" : "#7FA557"} strokeWidth="5" strokeLinecap="round" />
              </g>
            );
          })}
          <path d={d} fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#8FAE5A" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    })}
    {[-14, 4, 22].map((dx) => (
      <circle key={dx} cx={10 + dx} cy={-h + 30} r="11" fill="#9DB86A" stroke={INK} strokeWidth="4" />
    ))}
  </g>
);

/** Làng Gióng: luỹ tre bao quanh, nhà tranh, cây cau, rào tre, sân đất. */
const GiongVillage: React.FC = () => (
  <>
    <WarmSky id="t1-giong-sky" h={FLOOR} sun={[300, 360]} />
    <VCloud x={700} y={300} s={1} />
    <VCloud x={240} y={520} s={0.6} />
    <FarMountains peaks={[[200, 780, 260], [600, 740, 300], [950, 790, 240]]} foot={920} color="#D8C8A4" shade="#BFAC88" line="#9A8262" opacity={0.85} />
    {/* Luỹ tre xanh bao quanh làng (hậu cảnh) */}
    {[60, 240, 420, 600, 780, 960].map((x, i) => (
      <VBamboo key={x} x={x} y={1010} s={0.42 + (i % 2) * 0.06} flip={i % 2 === 1} />
    ))}
    <Hills id="t1-giong-h" y={1000} amp={16} waves={3} phase={0.5} top="#9DB86A" base="#7FA557" />
    <ThatchHut x={780} y={1110} s={0.78} />
    <ArecaPalm x={200} y={1130} h={520} />
    <BambooFence x0={-20} x1={560} y={1150} h={90} />
    <path d={`M-20 1150 Q540 1132 1100 1150 L1100 ${FLOOR + 6} L-20 ${FLOOR + 6} Z`} fill="#D9B886" stroke={INK} strokeWidth="5" />
    <Floor color="#C9A26E" line="#B38D5C" />
    <GrassTuft x={40} y={1300} s={1.1} />
    <GrassTuft x={1040} y={1310} s={1.2} flip />
    <GrassTuft x={980} y={1540} s={1.4} />
  </>
);

/** Khói đen cuồn cuộn có viền (chiến trường). */
const Smoke: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Canopy
      blobs={[
        [0, 0, 56],
        [44, -56, 48],
        [8, -120, 42],
        [40, -180, 34],
        [-40, -40, 40],
      ]}
      base="#7A6A64"
      light="#A0908A"
      dark="#4E423E"
      sw={5}
    />
  </g>
);

/** Chiến trường chân núi lúc hoàng hôn: núi xa, khói, cờ giặc đổ, bụi tre bên trái (Gióng nhổ tre). */
const GiongBattle: React.FC = () => (
  <>
    <WarmSky id="t1-battle-sky" h={FLOOR} top="#D9774A" bottom="#F6D6A0" sun={[760, 560]} />
    <FarMountains peaks={[[180, 640, 260], [520, 560, 300], [880, 700, 260]]} foot={1010} color="#9C7E78" shade="#7E625E" line="#5E4440" />
    <FarMountains peaks={[[60, 860, 220], [380, 820, 240], [760, 860, 260], [1060, 840, 200]]} foot={1060} color="#86685E" shade="#6A4E46" line="#4E3630" />
    {/* Lửa cháy xa và khói */}
    <ellipse cx="620" cy="1060" rx="220" ry="40" fill="url(#w-glow)" />
    <Smoke x={330} y={980} s={1.1} />
    <Smoke x={880} y={900} s={0.9} />
    <Hills id="t1-battle-h" y={1080} amp={30} waves={2} phase={1.4} top="#B49268" base="#8E6E4A" />
    {/* Cờ giặc đổ */}
    {[
      [700, 1170, 24],
      [960, 1180, -30],
    ].map(([x, y, r]) => (
      <g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
        <line x1="0" y1="0" x2="0" y2="-200" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="-200" stroke="#8A6448" strokeWidth="7" strokeLinecap="round" />
        <path d="M0 -200 L90 -176 Q70 -160 90 -140 L0 -140 Z" fill="url(#w-dark)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ))}
    <VBamboo x={110} y={FLOOR} s={0.7} />
    <Floor color="#A8885E" line="#927250" />
    <GrassTuft x={1020} y={1310} s={1.1} color="#9A9A58" flip />
    <GrassTuft x={60} y={1480} s={1.3} color="#9A9A58" />
    <SkyRays from={[760, 560]} opacity={0.1} />
  </>
);

export const scenes: Record<SceneTuan1, React.FC> = {
  "sung-tree": SungTree,
  "heo-meadow": HeoMeadow,
  "giong-village": GiongVillage,
  "giong-battle": GiongBattle,
};
