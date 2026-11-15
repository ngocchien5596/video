/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 4b (Nói vậy). Tên khai báo ở engine/lib/story/tuan-4b.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 *
 * Truyện: tập 27 mùa lũ (chuyện thật), tập 28 Vịt con xấu xí, tập 29 Sọ Dừa.
 */
import type React from "react";
import type { PropTuan4B, RoleTuan4B, SceneTuan4B } from "../../lib/story/tuan-4b.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, LINE as INK, Lines, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";
import {
  Bamboo,
  BambooFence,
  Cloud as VCloud,
  DistantTrees,
  FarMountains,
  GrassTuft,
  HangingLeaves,
  Hills,
  PAL,
  PotPlant,
  Reeds,
  Shine,
  SoftShadow,
  SkyRays,
  ThatchHut,
  TileRoof,
  Tree,
  VillageHouse,
  WarmSky,
  WaterBand,
} from "../village.tsx";

// ---------------------------------------------------------------- vai

const FaceBase: React.FC<{ skin: string; ears?: boolean }> = ({ skin, ears = true }) => (
  <>
    {ears ? (
      <>
        <ellipse cx="94" cy="208" rx="14" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
        <ellipse cx="266" cy="208" rx="14" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
      </>
    ) : null}
    <rect x="94" y="114" width="172" height="176" rx="76" fill={skin} stroke={INK} strokeWidth="7" />
  </>
);

/** Mỏ vịt nhìn chính diện: nửa trên, nửa dưới hé ra khi ngạc nhiên. */
const DuckBill: React.FC<{ expr: string; y: number; color: string }> = ({ expr, y, color }) => {
  const open = expr === "shock" ? 16 : expr === "angry" ? 8 : 0;
  return (
    <>
      {open ? <ellipse cx="180" cy={y + 10 + open / 2} rx="40" ry={10 + open / 2} fill="#3B1E1E" stroke={INK} strokeWidth="5" /> : null}
      <ellipse cx="180" cy={y + 14 + open} rx="44" ry="12" fill={color} stroke={INK} strokeWidth="6" />
      <ellipse cx="180" cy={y} rx="52" ry="20" fill={color} stroke={INK} strokeWidth="6" />
      <circle cx="166" cy={y - 6} r="4" fill={INK} />
      <circle cx="194" cy={y - 6} r="4" fill={INK} />
    </>
  );
};

export const roles: Record<RoleTuan4B, Role> = {
  "lu-tai-xe": {
    look: { skin: "#E2A574", sleeve: "#ECE6D6", legs: "#2B3A55", shoe: "#2E2420", arm: 26 },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const skin = "#E2A574";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 178, mouthY: 258, browColor: INK };
      return (
        <g>
          <FaceBase skin={skin} />
          {/* Mũ lưỡi trai tối, lưỡi trai chìa về phía trước */}
          <path d="M90 160 C88 76 272 76 270 160 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M150 156 Q240 140 330 160 Q300 178 160 172 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <circle cx="180" cy="88" r="9" fill="#ECE6D6" stroke={INK} strokeWidth="4" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Ria mép rậm */}
          <path d="M140 238 Q180 222 220 238 Q200 248 180 244 Q160 248 140 238 Z" fill="#2E2420" stroke={INK} strokeWidth="4" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo khoác sáng có khoá kéo, túi; khăn quàng kẻ ô tối */}
        <path d="M114 312 Q180 292 246 312 L250 470 L110 470 Z" fill="#ECE6D6" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <line x1="180" y1="320" x2="180" y2="468" stroke={INK} strokeWidth="6" />
        <rect x="126" y="400" width="40" height="34" rx="4" fill="#D6CEB8" stroke={INK} strokeWidth="5" />
        <rect x="194" y="400" width="40" height="34" rx="4" fill="#D6CEB8" stroke={INK} strokeWidth="5" />
        <path d="M128 300 Q180 330 232 300 L236 322 Q180 352 124 322 Z" fill="#3A3A48" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M206 330 L222 392 L196 386 Z" fill="#3A3A48" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M146 312 L146 330 M170 318 L170 338 M194 318 L194 338 M218 312 L218 330" stroke="#ECE6D6" strokeWidth="4" />
      </g>
    ),
  },
  "lu-tinh-nguyen": {
    look: { skin: "#FAD2B0", sleeve: "#FAD2B0", legs: "#C9CED6", shoe: "#2E2420" },
    headY: 60,
    Head: ({ expr, talk, blink }) => {
      const skin = "#FAD2B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 210, browY: 184, mouthY: 258, browColor: INK };
      return (
        <g>
          <FaceBase skin={skin} />
          {/* Tóc ngắn tối dưới vành nón */}
          <path d="M92 190 C84 120 276 120 268 190 Q236 160 180 164 Q124 160 92 190 Z" fill="#2E2420" stroke={INK} strokeWidth="6" />
          {/* Nón lá trắng */}
          <path d="M40 160 L180 22 L320 160 Q180 186 40 160 Z" fill="#F4ECD2" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          <path d="M84 150 L180 46 M130 160 L180 46 M230 160 L180 46 M276 150 L180 46" fill="none" stroke="#C9B98A" strokeWidth="4" />
          <path d="M64 150 Q180 172 296 150" fill="none" stroke="#C9B98A" strokeWidth="5" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="126" cy="236" rx="11" ry="7" fill="#F2A08A" opacity="0.75" />
          <ellipse cx="234" cy="236" rx="11" ry="7" fill="#F2A08A" opacity="0.75" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Quần sáng, áo phông tối có hình trái tim sáng */}
        <path d="M122 420 L238 420 L246 470 L114 470 Z" fill="#C9CED6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M116 312 Q180 294 244 312 L242 432 L118 432 Z" fill="#2E6FB8" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 306 Q180 326 210 306" fill="none" stroke="#F4ECD2" strokeWidth="7" strokeLinecap="round" />
        <path d="M180 400 C140 372 150 340 180 360 C210 340 220 372 180 400 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "vit-con-xau": {
    look: { skin: "#8A8F99", sleeve: "#8A8F99", legs: "#E8A13A", shoe: "#E8A13A", arm: 26 },
    headY: 110,
    Head: ({ expr, blink }) => {
      const g: FaceGeo = { eyeL: 148, eyeR: 212, eyeY: 192, browY: 162, mouthY: 250, browColor: INK };
      return (
        <g>
          {/* Đầu tròn lông xám, túm lông bù xù trên đỉnh và hai bên má */}
          <path d="M150 124 Q140 86 166 96 Q170 70 190 94 Q214 80 206 124 Z" fill="#6E737C" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M100 222 Q72 226 80 246 Q90 256 106 254 Z M260 222 Q288 226 280 246 Q270 256 254 254 Z" fill="#6E737C" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <ellipse cx="180" cy="204" rx="92" ry="88" fill="#8A8F99" stroke={INK} strokeWidth="7" />
          <path d="M120 150 q12 10 4 22 M232 160 q-10 10 -2 22 M150 270 q10 -8 20 2" fill="none" stroke="#5E626B" strokeWidth="5" strokeLinecap="round" />
          <circle cx={g.eyeL} cy={g.eyeY} r="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <circle cx={g.eyeR} cy={g.eyeY} r="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <DuckBill expr={expr} y={244} color="#E8A13A" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Thân xám lông xơ xác, bụng sáng hơn, đuôi túm */}
        <path d="M110 330 L92 312 L124 314 L136 296 L156 312 L180 294 L204 312 L224 296 L236 314 L268 312 L250 330 Q276 420 236 470 Q180 490 124 470 Q84 420 110 330 Z" fill="#8A8F99" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <ellipse cx="180" cy="418" rx="44" ry="46" fill="#B4B9C2" stroke={INK} strokeWidth="5" />
        <path d="M100 440 L64 452 L92 466 L70 486 L112 470 Z" fill="#6E737C" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      </g>
    ),
  },
  "thien-nga": {
    look: { skin: "#FFFFFF", sleeve: "#FFFFFF", legs: "#2E2420", shoe: "#2E2420", arm: 30 },
    headY: 100,
    Head: ({ expr, blink }) => {
      const g: FaceGeo = { eyeL: 172, eyeR: 214, eyeY: 140, browY: 116, mouthY: 200, browColor: INK };
      return (
        <g>
          {/* Cổ dài cong hình chữ S */}
          <path d="M176 330 Q118 270 150 210 Q176 164 182 140" fill="none" stroke={INK} strokeWidth="58" strokeLinecap="round" />
          <path d="M176 330 Q118 270 150 210 Q176 164 182 140" fill="none" stroke="#FFFFFF" strokeWidth="44" strokeLinecap="round" />
          {/* Đầu nhỏ, mỏ cam có bướu đen chìa sang phải */}
          <path d="M228 128 L304 150 L230 168 Z" fill="#F28C28" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M222 122 Q244 130 236 152 Q222 168 212 150 Z" fill="#2E2420" stroke={INK} strokeWidth="4" />
          <ellipse cx="190" cy="142" rx="50" ry="42" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
          <path d="M222 122 Q240 134 232 152 Q222 160 216 150 Z" fill="#2E2420" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Ánh lấp lánh trên đầu */}
          <path d="M122 90 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Thân lông trắng muốt, cánh xếp lớp, đuôi vểnh */}
        <path d="M96 430 L52 404 L86 444 L60 470 L112 466 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M112 320 Q180 296 248 320 Q284 410 240 472 Q180 492 120 472 Q76 410 112 320 Z" fill="#FFFFFF" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M130 360 Q170 380 160 430 M150 350 Q196 368 192 424 M126 400 Q150 420 146 456" fill="none" stroke="#C9CED6" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "ga-tay": {
    look: { skin: "#3A2A1E", sleeve: "#4A3424", legs: "#D9A88A", shoe: "#D9A88A", arm: 30 },
    headY: 130,
    Head: ({ expr, blink }) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 184, browY: 156, mouthY: 250, browColor: INK };
      return (
        <g>
          {/* Cổ trọc, yếm đỏ thõng dưới cằm */}
          <path d="M140 270 Q130 330 150 320 Q160 344 176 326 Q190 346 202 324 Q222 334 218 270 Z" fill="#B22222" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <ellipse cx="180" cy="196" rx="74" ry="84" fill="#C7D3E3" stroke={INK} strokeWidth="7" />
          {/* Vài sợi lông tơ trên đỉnh đầu trọc */}
          <path d="M170 114 q-6 -22 6 -30 M186 114 q4 -24 18 -26" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Mỏ ngắn + mào thịt đỏ thõng qua mỏ */}
          <path d="M162 214 L198 214 L180 246 Z" fill="#E3B23C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <path d="M184 206 Q206 220 200 262 Q196 290 210 300" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
          <path d="M184 206 Q206 220 200 262 Q196 290 210 300" fill="none" stroke="#B22222" strokeWidth="11" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Đuôi xoè quạt to sau lưng, mỗi nan có viền sáng */}
        {[-70, -46, -23, 0, 23, 46, 70].map((a) => (
          <g key={a} transform={`rotate(${a} 180 400)`}>
            <path d="M180 400 L150 160 Q180 130 210 160 Z" fill="#5C4128" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <path d="M160 186 Q180 166 200 186" fill="none" stroke="#F2EBDD" strokeWidth="9" strokeLinecap="round" />
          </g>
        ))}
        {/* Thân tròn phồng, ngực lông tối */}
        <ellipse cx="180" cy="400" rx="92" ry="84" fill="#3A2A1E" stroke={INK} strokeWidth="8" />
        <path d="M130 380 q14 14 28 0 q14 14 28 0 q14 14 28 0 M140 420 q14 14 28 0 q14 14 28 0" fill="none" stroke="#7A5A3E" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "so-dua-co-chi": {
    look: { skin: "#F3CFA6", sleeve: "#4A2340", legs: "#F3CFA6", shoe: "#2E2420" },
    headY: 100,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3CFA6";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 176, mouthY: 256, browColor: INK };
      return (
        <g>
          {/* Búi tóc cao, trâm cài */}
          <ellipse cx="180" cy="74" rx="56" ry="42" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <path d="M124 52 L250 96 M136 36 L236 110" stroke="#E3B23C" strokeWidth="8" strokeLinecap="round" />
          <circle cx="250" cy="96" r="10" fill="#E3B23C" stroke={INK} strokeWidth="4" />
          <FaceBase skin={skin} />
          <path d="M88 186 C76 92 284 92 272 186 Q250 140 180 140 Q110 140 88 186 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          {/* Khuyên tai tròn to */}
          <circle cx="94" cy="246" r="12" fill="#E3B23C" stroke={INK} strokeWidth="4" />
          <circle cx="266" cy="246" r="12" fill="#E3B23C" stroke={INK} strokeWidth="4" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Lông mi cong */}
          <path d="M134 192 l-10 -8 M226 192 l10 -8" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B8402E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo tứ thân sẫm, váy dài sẫm, thắt lưng sáng */}
        <path d="M112 312 Q180 292 248 312 L274 482 Q180 498 86 482 Z" fill="#4A2340" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 352 L210 304" fill="#E3B23C" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="108" y="400" width="144" height="18" rx="6" fill="#E3B23C" stroke={INK} strokeWidth="6" />
        <path d="M200 418 L214 470 M220 418 L240 466" stroke="#E3B23C" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "so-dua-co-ut": {
    look: { skin: "#FAD2B0", sleeve: "#F2EBDD", legs: "#FAD2B0", shoe: "#6B4423" },
    headY: 90,
    Head: ({ expr, talk, blink }) => {
      const skin = "#FAD2B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 206, browY: 180, mouthY: 256, browColor: INK };
      return (
        <g>
          {/* Tóc dài buông sau lưng */}
          <path d="M96 170 Q70 260 104 330 L150 300 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <FaceBase skin={skin} />
          <path d="M90 184 C80 100 280 100 270 184 Q240 150 180 152 Q120 150 90 184 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          {/* Khăn mỏ quạ sáng, chóp nhọn trên trán */}
          <path d="M84 160 Q180 70 276 160 L262 128 Q180 40 98 128 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M180 92 L172 54 L196 84 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="124" cy="234" rx="12" ry="7" fill="#F2A08A" opacity="0.8" />
          <ellipse cx="236" cy="234" rx="12" ry="7" fill="#F2A08A" opacity="0.8" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy nâu, áo tứ thân sáng mở vạt, yếm đỏ */}
        <path d="M110 420 L250 420 L270 484 L90 484 Z" fill="#6B4423" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M112 312 Q180 292 248 312 L244 430 L116 430 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 306 L180 344 L210 306 L206 420 L154 420 Z" fill="#B8402E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="110" y="414" width="140" height="16" rx="6" fill="#6B4423" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "so-dua-chang-trai": {
    look: { skin: "#F3CFA6", sleeve: "#F2EBDD", legs: "#2E2420", shoe: "#2E2420" },
    headY: 116,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3CFA6";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 174, mouthY: 254, browColor: INK };
      return (
        <g>
          <circle cx="180" cy="92" r="24" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <FaceBase skin={skin} />
          <path d="M88 168 C82 86 278 86 272 168 Q236 136 200 150 Q180 132 160 150 Q124 136 88 168 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo the sáng dài, thắt lưng tối, cổ áo chéo */}
        <path d="M114 312 Q180 292 246 312 L262 480 Q180 494 98 480 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L196 392" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <rect x="110" y="404" width="140" height="22" rx="8" fill="#2E2420" stroke={INK} strokeWidth="6" />
        <path d="M216 426 L224 470" stroke="#2E2420" strokeWidth="10" strokeLinecap="round" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- đạo cụ

/** Gradient riêng của file (id tiền tố "t4b-"), kèm trong mọi đạo cụ / phông để vẽ ở đâu cũng có. */
const T4bDefs: React.FC = () => (
  <defs>
    <linearGradient id="t4b-carton" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#E2B47A" />
      <stop offset="1" stopColor="#A9713E" />
    </linearGradient>
    <linearGradient id="t4b-orange" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#F6A64A" />
      <stop offset="1" stopColor="#C8641E" />
    </linearGradient>
    <radialGradient id="t4b-hen" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#B8703E" />
      <stop offset="1" stopColor="#6E3A1E" />
    </radialGradient>
    <radialGradient id="t4b-coco" cx="0.34" cy="0.28" r="0.85">
      <stop offset="0" stopColor="#9A6A3E" />
      <stop offset="0.65" stopColor="#6B4423" />
      <stop offset="1" stopColor="#3E2614" />
    </radialGradient>
    <radialGradient id="t4b-cow" cx="0.35" cy="0.3" r="0.85">
      <stop offset="0" stopColor="#F6E6C4" />
      <stop offset="1" stopColor="#C9AE7E" />
    </radialGradient>
    <radialGradient id="t4b-white" cx="0.35" cy="0.3" r="0.85">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.7" stopColor="#F3EEE2" />
      <stop offset="1" stopColor="#CFC4AC" />
    </radialGradient>
    <linearGradient id="t4b-screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#B9A88C" />
      <stop offset="1" stopColor="#7E6E58" />
    </linearGradient>
    <linearGradient id="t4b-flood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#B4906A" />
      <stop offset="1" stopColor="#6E5034" />
    </linearGradient>
    <linearGradient id="t4b-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F4DFAE" />
      <stop offset="1" stopColor="#D9B67E" />
    </linearGradient>
    <linearGradient id="t4b-hay" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#F4CF6A" />
      <stop offset="1" stopColor="#C08A26" />
    </linearGradient>
  </defs>
);

const Box: React.FC<{ x?: number; y?: number; w?: number; h?: number; label?: string; mirrored?: boolean }> = ({
  x = 0,
  y = 0,
  w = 160,
  h = 112,
  label,
  mirrored = false,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx="6" fill="url(#t4b-carton)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    {/* Mép nắp gấp, mặt bên tối */}
    <path d={`M${-w / 2 + 4} ${-h + 14} L${w / 2 - 4} ${-h + 14}`} stroke="#8A5A2E" strokeWidth="4" opacity="0.7" />
    <rect x={w / 2 - 22} y={-h + 4} width="18" height={h - 8} fill="#7A4A22" opacity="0.25" />
    {/* Băng keo */}
    <rect x="-14" y={-h} width="28" height={h} fill="#F2D9A8" stroke={INK} strokeWidth="4" />
    <path d={`M${-w / 2 + 12} -12 L${-w / 2 + 12} ${-h + 24}`} stroke="#F6D7A6" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    {label ? (
      <Unmirror mirrored={mirrored}>
        <rect x={-w / 2 + 10} y={-h * 0.94} width={w - 20} height={h * 0.34} rx="4" fill="#FFF6E2" stroke={INK} strokeWidth="4" />
        <Lines text={label} cy={-h * 0.77} width={w - 34} max={28} color="#A8362A" font={TEXT_FONT} />
      </Unmirror>
    ) : null}
  </g>
);

const RiceSack: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-2} rx={64} />
    <path d="M-50 0 Q-62 -60 -40 -86 L40 -86 Q62 -60 50 0 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-40 -86 Q-44 -100 -30 -104 Q0 -96 30 -104 Q44 -100 40 -86" fill="#E9D3AA" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-34 -78 Q-44 -40 -34 -10" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
    <text x="4" y="-36" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="26" fill="#A8362A">
      GẠO
    </text>
  </g>
);

const Truck: React.FC = () => (
  <g>
    <T4bDefs />
    <SoftShadow cy={-2} rx={330} ry={30} />
    {/* Thùng xe gỗ chở hàng */}
    <rect x="-280" y="-300" width="390" height="220" rx="10" fill="url(#w-wood)" stroke={INK} strokeWidth="9" />
    {[-230, -170, -110, -50, 10, 70].map((bx) => (
      <line key={bx} x1={bx} y1="-292" x2={bx} y2="-88" stroke="#5E3A20" strokeWidth="4" opacity="0.5" />
    ))}
    <Box x={-200} y={-170} w={120} h={86} />
    <Box x={-75} y={-170} w={120} h={86} />
    <Box x={45} y={-170} w={100} h={86} />
    <Box x={-140} y={-256} w={110} h={86} />
    <Box x={-20} y={-256} w={110} h={86} />
    {/* Băng rôn */}
    <path d="M-262 -300 L-262 -376 M88 -300 L88 -376" stroke={INK} strokeWidth="7" />
    <path d="M-272 -376 L98 -376 L98 -314 L-272 -314 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <text x="-87" y="-330" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="42" fill="#FFF3D6">
      CỨU TRỢ
    </text>
    {/* Cabin vàng nghệ */}
    <path d="M118 -80 L118 -250 Q118 -256 126 -256 L218 -256 L272 -172 L272 -80 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M136 -236 L210 -236 L248 -178 L136 -178 Z" fill="#F6E9CF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M150 -226 L176 -226 L150 -190 Z" fill="#FFFFFF" opacity="0.7" />
    <path d="M150 -150 L190 -150" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <rect x="252" y="-124" width="26" height="22" rx="4" fill="#FFF3CF" stroke={INK} strokeWidth="5" />
    <rect x="-292" y="-92" width="580" height="30" rx="8" fill="url(#w-dark)" stroke={INK} strokeWidth="7" />
    {/* Bánh xe */}
    {[-190, 0, 190].map((x) => (
      <g key={x}>
        <circle cx={x} cy="-48" r="48" fill="url(#w-dark)" stroke={INK} strokeWidth="7" />
        <circle cx={x} cy="-48" r="20" fill="url(#w-metal)" stroke={INK} strokeWidth="5" />
        <path d={`M${x - 28} -74 Q${x - 40} -50 ${x - 30} -30`} fill="none" stroke="#6E6A64" strokeWidth="5" strokeLinecap="round" />
      </g>
    ))}
  </g>
);

export const props: Record<PropTuan4B, PropDef> = {
  "lu-mi-goi": {
    mode: "upright",
    draw: ({ mirrored }) => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={96} />
        <Box label="MÌ GÓI" mirrored={mirrored} />
      </g>
    ),
  },
  "lu-quan-ao": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Bọc vải chấm bi buộc nút trên đỉnh, áo đỏ thò ra mép */}
        <SoftShadow cy={-2} rx={104} />
        <path d="M-96 -60 L-124 -50 L-114 -18 L-88 -28 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-20 -118 Q-58 -160 -40 -170 Q-18 -164 -6 -126 Z M20 -118 Q58 -160 40 -170 Q18 -164 6 -126 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-90 -40 Q-100 -120 0 -124 Q100 -120 90 -40 Q84 0 0 0 Q-84 0 -90 -40 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M60 -100 Q90 -60 74 -14 Q40 0 0 0 Q60 -30 60 -100 Z" fill="#B89466" opacity="0.35" />
        {[
          [-50, -80],
          [-10, -40],
          [40, -86],
          [56, -30],
          [-56, -30],
          [10, -96],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="9" fill={PAL.blueGlaze} />
        ))}
        <path d="M-12 -126 Q0 -136 12 -126" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <Shine d="M-66 -96 Q-74 -70 -68 -44" opacity={0.6} />
      </g>
    ),
  },
  "lu-ao-phao": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={96} />
        {/* Áo phao: hai vạt phồng cam, sọc phản quang kem, khoá tối */}
        <path d="M-74 -150 L-30 -150 Q-20 -112 -6 -100 L-6 0 L-78 0 Q-92 -80 -74 -150 Z" fill="url(#t4b-orange)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M74 -150 L30 -150 Q20 -112 6 -100 L6 0 L78 0 Q92 -80 74 -150 Z" fill="url(#t4b-orange)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-84 -66 L-6 -66 M6 -66 L84 -66 M-84 -30 L-6 -30 M6 -30 L84 -30" stroke={INK} strokeWidth="16" />
        <path d="M-82 -66 L-8 -66 M8 -66 L82 -66 M-82 -30 L-8 -30 M8 -30 L82 -30" stroke="#FFF3D6" strokeWidth="9" />
        <rect x="-16" y="-58" width="32" height="20" rx="4" fill="url(#w-dark)" stroke={INK} strokeWidth="4" />
        <rect x="-16" y="-22" width="32" height="20" rx="4" fill="url(#w-dark)" stroke={INK} strokeWidth="4" />
        <Shine d="M-62 -136 Q-72 -110 -70 -84" opacity={0.6} />
      </g>
    ),
  },
  "lu-xe-cuu-tro": { mode: "upright", draw: () => <Truck /> },
  "lu-ti-vi": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={170} />
        {/* Kệ gỗ */}
        <path d="M-130 -126 L-130 0 M130 -126 L130 0" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <path d="M-130 -126 L-130 0 M130 -126 L130 0" stroke="#8A5530" strokeWidth="9" strokeLinecap="round" />
        <rect x="-140" y="-56" width="280" height="14" rx="5" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
        <rect x="-150" y="-150" width="300" height="24" rx="6" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
        {/* Ăng-ten */}
        <path d="M0 -380 L-70 -460 M0 -380 L60 -470" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <circle cx="-70" cy="-460" r="7" fill="url(#w-brass)" stroke={INK} strokeWidth="3" />
        <circle cx="60" cy="-470" r="7" fill="url(#w-brass)" stroke={INK} strokeWidth="3" />
        {/* Thân ti vi cũ vỏ gỗ */}
        <rect x="-160" y="-390" width="320" height="240" rx="24" fill="url(#w-wood-h)" stroke={INK} strokeWidth="8" />
        <rect x="-136" y="-368" width="230" height="196" rx="20" fill="url(#t4b-screen)" stroke={INK} strokeWidth="6" />
        {/* Màn hình: mái nhà nhô trên nước lũ, mưa */}
        <path d="M-90 -250 L-50 -290 L-10 -250 Z M10 -246 L44 -280 L78 -246 Z" fill={PAL.tile} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M-136 -250 Q-100 -262 -64 -250 T8 -250 T80 -250 L94 -250 L94 -188 Q94 -172 78 -172 L-120 -172 Q-136 -172 -136 -188 Z" fill="#7A5A3A" stroke={INK} strokeWidth="4" />
        {[-120, -80, -40, 0, 40, 80].map((x) => (
          <line key={x} x1={x} y1="-356" x2={x - 14} y2="-300" stroke="#F6E9CF" strokeWidth="4" strokeLinecap="round" />
        ))}
        <path d="M-120 -350 Q-60 -366 -10 -356" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
        <circle cx="128" cy="-320" r="13" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <circle cx="128" cy="-276" r="13" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        {[-226, -212, -198].map((y) => (
          <line key={y} x1="114" y1={y} x2="142" y2={y} stroke="#5E3A20" strokeWidth="4" strokeLinecap="round" />
        ))}
      </g>
    ),
  },
  "vit-trung": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={170} />
        {/* Nửa vỏ trứng vỡ, mép răng cưa, đốm lấm tấm */}
        <path d="M-150 -150 L-118 -118 L-90 -160 L-56 -116 L-20 -164 L16 -118 L52 -162 L86 -116 L118 -154 L150 -116 Q160 0 0 0 Q-160 0 -150 -150 Z" fill="url(#t4b-white)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[
          [-90, -70],
          [-30, -40],
          [40, -80],
          [96, -46],
          [0, -100],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="8" fill="#C9B08A" />
        ))}
        <Shine d="M-120 -110 Q-124 -60 -96 -30" opacity={0.8} />
        <path d="M190 -6 L212 -36 L236 -10 Z M-200 -4 L-222 -30 L-180 -24 Z" fill="url(#t4b-white)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "vit-vit": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={110} />
        {/* Vịt trắng quay sang phải, mắt cau có, há mỏ quạc */}
        <path d="M-40 -6 L-48 0 M-20 -6 L-12 0" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M-40 -6 L-48 0 M-20 -6 L-12 0" stroke="#E8A13A" strokeWidth="9" strokeLinecap="round" />
        <path d="M-104 -120 L-140 -150 L-118 -96 Z" fill="url(#t4b-white)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="-20" cy="-74" rx="96" ry="64" fill="url(#t4b-white)" stroke={INK} strokeWidth="8" />
        <path d="M-80 -86 Q-30 -40 30 -80 Q-10 -60 -80 -86 Z" fill="#E3D8C0" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M40 -100 Q50 -150 54 -170" fill="none" stroke={INK} strokeWidth="52" strokeLinecap="round" />
        <path d="M40 -100 Q50 -150 54 -170" fill="none" stroke="#FBF7EE" strokeWidth="38" strokeLinecap="round" />
        <circle cx="60" cy="-190" r="40" fill="url(#t4b-white)" stroke={INK} strokeWidth="7" />
        <path d="M90 -200 L150 -206 L144 -190 L92 -186 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M92 -180 L140 -172 L136 -160 L90 -168 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M56 -222 L84 -208" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <circle cx="72" cy="-198" r="7" fill={INK} />
        <Shine d="M-80 -116 Q-40 -132 0 -126" opacity={0.7} />
      </g>
    ),
  },
  "vit-ga": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={104} />
        {/* Gà mái nâu sẫm quay sang phải, mào đỏ, mắt cau có */}
        <path d="M-30 -10 L-36 0 M10 -10 L16 0" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M-30 -10 L-36 0 M10 -10 L16 0" stroke="#E8A13A" strokeWidth="9" strokeLinecap="round" />
        <path d="M-90 -100 Q-150 -170 -120 -200 Q-110 -150 -70 -130 Z" fill="#4A2A16" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-80 -110 Q-130 -150 -134 -176 Q-104 -140 -66 -128 Z" fill="#2F6A4A" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="-10" cy="-80" rx="88" ry="70" fill="url(#t4b-hen)" stroke={INK} strokeWidth="8" />
        <path d="M-56 -96 Q-10 -46 34 -92 Q-6 -70 -56 -96 Z" fill="#5C341C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="54" cy="-170" r="42" fill="url(#t4b-hen)" stroke={INK} strokeWidth="7" />
        <path d="M24 -204 Q30 -236 46 -214 Q56 -240 66 -212 Q80 -232 82 -200 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M92 -176 L126 -164 L92 -152 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M86 -146 Q96 -124 80 -126 Z" fill={PAL.lacquer} stroke={INK} strokeWidth="4" />
        <path d="M50 -196 L78 -184" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <circle cx="68" cy="-174" r="7" fill={INK} />
        <Shine d="M-70 -122 Q-30 -142 10 -136" opacity={0.35} />
      </g>
    ),
  },
  "so-dua": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={130} />
        {/* Quả dừa tròn, xơ dừa, ba "mắt" dừa trên đỉnh, mặt hiền */}
        <ellipse cx="0" cy="-118" rx="122" ry="118" fill="url(#t4b-coco)" stroke={INK} strokeWidth="9" />
        <path d="M-80 -200 Q-110 -120 -84 -40 M80 -200 Q110 -120 84 -40 M-30 -230 Q-50 -130 -30 -10 M30 -230 Q50 -130 30 -10" fill="none" stroke="#3E2614" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        <Shine d="M-86 -180 Q-104 -140 -96 -96" opacity={0.4} />
        <circle cx="-22" cy="-210" r="8" fill="#2A1A0E" />
        <circle cx="22" cy="-210" r="8" fill="#2A1A0E" />
        <circle cx="0" cy="-226" r="8" fill="#2A1A0E" />
        <ellipse cx="-38" cy="-128" rx="22" ry="26" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <ellipse cx="38" cy="-128" rx="22" ry="26" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <circle cx="-34" cy="-124" r="10" fill={INK} />
        <circle cx="42" cy="-124" r="10" fill={INK} />
        <circle cx="-30" cy="-128" r="3" fill="#FFFFFF" />
        <circle cx="46" cy="-128" r="3" fill="#FFFFFF" />
        <path d="M-30 -74 Q0 -50 30 -74" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="-74" cy="-92" rx="14" ry="8" fill="#F2A08A" opacity="0.7" />
        <ellipse cx="74" cy="-92" rx="14" ry="8" fill="#F2A08A" opacity="0.7" />
      </g>
    ),
  },
  "so-dua-bo": {
    mode: "upright",
    draw: () => (
      <g>
        <T4bDefs />
        <SoftShadow cy={-2} rx={230} ry={30} />
        {/* Bò béo màu kem, đốm nâu, cúi đầu gặm cỏ bên phải */}
        {[-110, -60, 60, 110].map((x) => (
          <g key={x}>
            <rect x={x - 16} y="-80" width="32" height="80" rx="10" fill="url(#t4b-cow)" stroke={INK} strokeWidth="6" />
            <rect x={x - 16} y="-16" width="32" height="16" rx="5" fill="#5C341C" stroke={INK} strokeWidth="5" />
          </g>
        ))}
        <path d="M-150 -150 Q-200 -120 -186 -70" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <path d="M-186 -70 l-10 20 l18 -6 Z" fill="#5C341C" stroke={INK} strokeWidth="4" />
        <ellipse cx="0" cy="-140" rx="160" ry="84" fill="url(#t4b-cow)" stroke={INK} strokeWidth="8" />
        <path d="M-80 -210 Q-40 -190 -60 -150 Q-100 -140 -110 -180 Z M30 -130 Q70 -150 80 -110 Q40 -80 20 -100 Z" fill="#7A4A2A" />
        <Shine d="M-110 -190 Q-50 -214 20 -210" opacity={0.6} />
        <path d="M140 -170 Q190 -110 196 -40" fill="none" stroke={INK} strokeWidth="64" strokeLinecap="round" />
        <path d="M140 -170 Q190 -110 196 -40" fill="none" stroke="#E8D3A8" strokeWidth="50" strokeLinecap="round" />
        <path d="M170 -96 L150 -130 M226 -92 L250 -124" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <path d="M170 -96 L150 -130 M226 -92 L250 -124" stroke="#F6E9CF" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="200" cy="-46" rx="46" ry="38" fill="url(#t4b-cow)" stroke={INK} strokeWidth="7" />
        <ellipse cx="206" cy="-20" rx="34" ry="18" fill="#F2B8A0" stroke={INK} strokeWidth="5" />
        <circle cx="196" cy="-22" r="4" fill="#8A4A3A" />
        <circle cx="216" cy="-22" r="4" fill="#8A4A3A" />
        <circle cx="188" cy="-56" r="6" fill={INK} />
        <GrassTuft x={196} y={2} s={0.55} />
      </g>
    ),
  },
  "so-dua-sao": {
    mode: "extend",
    draw: () => (
      <g>
        {/* Sáo trúc: với tư thế tay `hold`, đầu sáo kề đúng miệng; lỗ bấm; nốt nhạc bay ra cuối sáo */}
        <g transform="rotate(36)">
          <rect x="-11" y="-262" width="22" height="322" rx="10" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" />
          <path d="M-4 -250 L-4 50" stroke="#FFF3CF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          {[-150, -100, -60, -20, 20].map((y) => (
            <circle key={y} cx="0" cy={y} r="5" fill={INK} />
          ))}
          <path d="M-11 -180 L11 -180 M-11 40 L11 40" stroke="#8A5A2E" strokeWidth="6" />
        </g>
        {[
          [120, 40],
          [190, 0],
          [170, 100],
        ].map(([x, y]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="0" rx="14" ry="10" fill={PAL.earth} stroke={INK} strokeWidth="3" transform="rotate(-20)" />
            <path d="M12 -4 L12 -46 L30 -36" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </g>
    ),
  },
  "so-dua-gio-com": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Quai giỏ qua tay, giỏ tre đựng nắm cơm, lá chuối */}
        <path d="M-56 4 Q-50 -44 0 -44 Q50 -44 56 4" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <path d="M-56 4 Q-50 -44 0 -44 Q50 -44 56 4" fill="none" stroke="#C9A24E" strokeWidth="7" strokeLinecap="round" />
        <path d="M10 -6 Q50 -30 70 4 Z" fill="url(#w-leaf)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="-16" cy="0" rx="36" ry="24" fill="url(#w-glaze)" stroke={INK} strokeWidth="5" />
        <path d="M-70 4 L70 4 L56 70 L-56 70 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-64 26 L64 26 M-60 48 L60 48 M-30 4 L-26 70 M0 4 L0 70 M30 4 L26 70" stroke="#8C6A2A" strokeWidth="4" />
        <path d="M-56 12 L-48 62" stroke="#FFF3CF" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Mưa xiên (nét kem mờ), đều theo seed cố định. */
const Rain: React.FC<{ n?: number; y0?: number; y1?: number; opacity?: number }> = ({ n = 46, y0 = 120, y1 = 1300, opacity = 0.55 }) => (
  <g opacity={opacity}>
    {Array.from({ length: n }, (_, i) => {
      const x = (i * 211) % 1120;
      const y = y0 + ((i * 137) % (y1 - y0));
      return <line key={i} x1={x} y1={y} x2={x - 20} y2={y + 64} stroke="#F6E9CF" strokeWidth="4" strokeLinecap="round" />;
    })}
  </g>
);

/** Mây mưa nâu xám có viền. */
const StormCloud: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M-170 30 Q-190 -10 -140 -20 Q-130 -70 -70 -60 Q-40 -100 20 -80 Q70 -110 110 -60 Q170 -66 172 -16 Q200 0 180 30 Z"
      fill="#7E6E60"
      stroke="#4E3E32"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <path d="M-150 28 Q-60 6 30 22 Q110 6 178 28 Z" fill="#5E5046" opacity="0.6" />
    <path d="M-120 -16 Q-80 -40 -40 -30" fill="none" stroke="#A89584" strokeWidth="6" strokeLinecap="round" />
  </g>
);

/** Nhà phố ống hai tầng (mặt tiền), chân ở (x, FLOOR). */
const ShopFront: React.FC<{ x: number; w: number; top: number; wall: string }> = ({ x, w, top, wall }) => (
  <g>
    <rect x={x} y={top} width={w} height={FLOOR - top} fill={wall} stroke={INK} strokeWidth="7" />
    <rect x={x} y={top} width={w} height={FLOOR - top} fill="#5E3A20" opacity="0.12" />
    {/* Cửa sổ tầng trên có chớp xanh rêu */}
    <rect x={x + w / 2 - 50} y={top + 50} width="100" height="120" fill="#4A2E18" stroke={INK} strokeWidth="6" />
    <rect x={x + w / 2 - 92} y={top + 50} width="40" height="120" fill="#6E8A5A" stroke={INK} strokeWidth="5" />
    <rect x={x + w / 2 + 52} y={top + 50} width="40" height="120" fill="#6E8A5A" stroke={INK} strokeWidth="5" />
    <rect x={x + 10} y={top + 186} width={w - 20} height="14" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
    {/* Mái hiên ngói */}
    <path d={`M${x - 10} ${top + 270} L${x + 20} ${top + 220} L${x + w - 20} ${top + 220} L${x + w + 10} ${top + 270} Z`} fill="url(#w-tile)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {/* Cửa dưới (khép, tối) */}
    <rect x={x + 30} y={top + 300} width={w - 60} height={FLOOR - top - 300} fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
    {Array.from({ length: 3 }, (_, i) => (
      <line key={i} x1={x + 30 + ((w - 60) * (i + 1)) / 4} y1={top + 300} x2={x + 30 + ((w - 60) * (i + 1)) / 4} y2={FLOOR} stroke="#5E3A20" strokeWidth="4" />
    ))}
  </g>
);

/** Điểm gom hàng cứu trợ ở phố: mặt tiền nhà ấm, biển "ĐIỂM NHẬN HÀNG", cửa cuốn mở thấy kho hàng, chồng thùng, bao gạo hai bên. */
const DiemGom: React.FC = () => (
  <>
    <T4bDefs />
    <WarmSky id="t4b-dg-sky" h={FLOOR} sun={[880, 200]} />
    {/* Hai nhà bên (hậu cảnh) */}
    <ShopFront x={-80} w={260} top={360} wall="#E6C9A0" />
    <ShopFront x={900} w={260} top={320} wall="#D9B98A" />
    {/* Nhà chính */}
    <rect x="150" y="250" width="780" height={FLOOR - 250} fill="url(#t4b-wall)" stroke={INK} strokeWidth="9" />
    <rect x="150" y="250" width="780" height="34" fill="url(#w-wood)" stroke={INK} strokeWidth="7" />
    {/* Mái hiên ngói che biển */}
    <path d="M120 600 L170 540 L910 540 L960 600 Q540 612 120 600 Z" fill="url(#w-tile)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {Array.from({ length: 16 }, (_, i) => (
      <line key={i} x1={180 + i * 46} y1="546" x2={150 + i * 50} y2="598" stroke="#7E3324" strokeWidth="3" opacity="0.5" />
    ))}
    {/* Biển hiệu sơn mài */}
    <rect x="200" y="330" width="680" height="140" rx="12" fill="url(#w-lacquer)" stroke={INK} strokeWidth="9" />
    <rect x="216" y="346" width="648" height="108" rx="8" fill="none" stroke={PAL.gold} strokeWidth="5" />
    <text x="540" y="422" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="64" fill="#FFF3D6">
      ĐIỂM NHẬN HÀNG
    </text>
    {/* Cửa cuốn kéo lên: trong kho sáng ấm, kệ hàng */}
    <rect x="210" y="640" width="660" height={FLOOR - 640} fill="#5A3A24" stroke={INK} strokeWidth="8" />
    <rect x="210" y="640" width="660" height={FLOOR - 640} fill="url(#w-glow)" opacity="0.55" />
    {[820, 980].map((y) => (
      <rect key={y} x="230" y={y} width="620" height="16" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
    ))}
    {[
      [280, 820, 90, 70],
      [380, 820, 80, 60],
      [700, 820, 90, 70],
      [800, 820, 70, 56],
      [300, 980, 100, 80],
      [760, 980, 110, 80],
    ].map(([bx, by, bw, bh]) => (
      <Box key={`${bx}-${by}`} x={bx} y={by} w={bw} h={bh} />
    ))}
    <rect x="200" y="620" width="680" height="40" rx="6" fill="url(#w-metal)" stroke={INK} strokeWidth="7" />
    {[630, 642].map((y) => (
      <line key={y} x1="210" y1={y} x2="870" y2={y} stroke="#8F8F88" strokeWidth="3" />
    ))}
    {/* Đèn lồng treo hiên */}
    {[160, 920].map((x) => (
      <g key={x}>
        <line x1={x} y1="600" x2={x} y2="640" stroke={INK} strokeWidth="4" />
        <ellipse cx={x} cy="672" rx="26" ry="32" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
        <rect x={x - 14} y="638" width="28" height="8" fill={PAL.gold} stroke={INK} strokeWidth="3" />
      </g>
    ))}
    <Floor color="#C9A27A" line="#B08A62" />
    {/* Tiền cảnh: chồng thùng, bao gạo ở hai mép */}
    <SoftShadow cx={110} cy={FLOOR} rx={130} />
    <SoftShadow cx={980} cy={FLOOR} rx={130} />
    <Box x={110} y={FLOOR} w={170} h={120} />
    <Box x={115} y={FLOOR - 120} w={150} h={110} />
    <Box x={100} y={FLOOR - 230} w={130} h={100} label="MÌ GÓI" />
    <Box x={985} y={FLOOR} w={170} h={120} />
    <Box x={975} y={FLOOR - 120} w={150} h={110} label="ÁO PHAO" />
    <RiceSack x={250} y={FLOOR + 6} />
    <RiceSack x={850} y={FLOOR + 6} s={0.95} />
    <PotPlant x={60} y={FLOOR + 220} s={0.9} kind="palm" />
  </>
);

/** Làng ngập: trời mưa nâu xám, mái ngói đỏ nhô trên nước lũ phù sa, cây chìm nửa thân, bờ đê phía trước. */
const VungNgap: React.FC = () => (
  <>
    <T4bDefs />
    <WarmSky id="t4b-vn-sky" h={FLOOR} top="#8E7E6C" bottom="#C9B394" sun={[860, 260]} />
    <StormCloud x={180} y={260} s={1.1} />
    <StormCloud x={620} y={200} s={1.3} />
    <StormCloud x={960} y={330} s={0.9} />
    <DistantTrees y={820} color="#8E9670" line="#6E6250" />
    <Bamboo x={60} y={900} s={0.6} />
    <Bamboo x={1020} y={900} s={0.55} flip />
    {/* Nhà ngói ngập tới cửa */}
    <VillageHouse x={290} y={990} s={0.5} />
    <VillageHouse x={820} y={970} s={0.42} />
    <Tree x={560} y={940} s={0.4} tone="far" />
    {/* Nước lũ phù sa */}
    <path d={`M-20 880 Q270 868 540 880 Q810 892 1100 880 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="url(#t4b-flood)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-20 892 Q270 880 540 892 Q810 904 1100 892" fill="none" stroke="#E2C9A2" strokeWidth="6" opacity="0.6" />
    {[930, 990, 1050, 1110].map((y, i) => (
      <path
        key={y}
        d={Array.from({ length: 9 }, (_, k) => `${k === 0 ? "M" : ""}${-40 + k * 130 + (i % 2) * 65} ${y} q30 -12 60 0`).join(" ")}
        fill="none"
        stroke="#D9BE94"
        strokeWidth="6"
        strokeLinecap="round"
        opacity={0.8 - i * 0.1}
      />
    ))}
    {/* Đồ trôi: thúng, cành cây */}
    <ellipse cx="660" cy="1000" rx="46" ry="14" fill="url(#w-turmeric)" stroke={INK} strokeWidth="5" />
    <path d="M150 1060 L260 1040 M200 1050 l20 -24" stroke={INK} strokeWidth="9" strokeLinecap="round" />
    <path d="M150 1060 L260 1040 M200 1050 l20 -24" stroke="#7A4A2A" strokeWidth="4" strokeLinecap="round" />
    {/* Bờ đê đất phía trước */}
    <path d={`M-20 1170 Q300 1150 540 1166 Q800 1182 1100 1160 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="#9A7A52" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <Floor color="#8E6E48" line="#7A5C3C" />
    <GrassTuft x={60} y={1260} s={1.1} color="#7F9A57" />
    <GrassTuft x={1020} y={1290} s={1.2} color="#7F9A57" flip />
    {/* Vũng nước trên đê */}
    <ellipse cx="200" cy="1500" rx="120" ry="20" fill="#B4906A" opacity="0.7" />
    <ellipse cx="880" cy="1420" rx="90" ry="14" fill="#B4906A" opacity="0.7" />
    <Rain />
  </>
);

/** Chuồng gỗ mái ngói, chân ở (x, y). */
const Coop: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SoftShadow cy={-4} rx={240} ry={26} />
    <rect x="-190" y="-380" width="380" height="380" fill="url(#w-wood-h)" stroke={INK} strokeWidth="8" />
    {[-140, -90, -40, 10, 60, 110, 160].map((bx) => (
      <line key={bx} x1={bx} y1="-376" x2={bx} y2="-4" stroke="#5E3A20" strokeWidth="4" opacity="0.6" />
    ))}
    <rect x="-190" y="-380" width="380" height="40" fill="#3A2416" opacity="0.3" />
    {/* Lỗ cửa vòm, cầu thang ván */}
    <path d="M-60 -120 L-60 -210 Q0 -270 60 -210 L60 -120 Z" fill="#2A170C" stroke={INK} strokeWidth="7" />
    <rect x="-90" y="-122" width="180" height="16" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
    <path d="M-40 -110 L-90 0 M40 -110 L-10 0" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    <path d="M-40 -110 L-90 0 M40 -110 L-10 0" stroke="#B87C48" strokeWidth="7" strokeLinecap="round" />
    {/* Ổ rơm thò ra cửa */}
    <path d="M-50 -124 Q0 -150 50 -124 Z" fill="url(#t4b-hay)" stroke={INK} strokeWidth="4" />
    <g transform="translate(0 -360)">
      <TileRoof w={480} top={160} h={150} />
    </g>
  </g>
);

/** Sân chuồng nông trại: chuồng gỗ mái ngói, rào tre, đống rơm, ao nhỏ, đồi và cây xa. */
const SanChuong: React.FC = () => (
  <>
    <T4bDefs />
    <WarmSky id="t4b-sc-sky" h={FLOOR} sun={[860, 360]} />
    <VCloud x={280} y={300} s={1} />
    <VCloud x={640} y={220} s={0.7} />
    <FarMountains peaks={[[300, 700, 280], [760, 660, 320]]} foot={900} color="#D8C29C" shade="#BFA57E" line="#9A8262" opacity={0.85} />
    <Hills id="t4b-sc-h1" y={880} amp={50} waves={2} phase={1} top="#B9CC86" base="#8DAA5E" line="#6E5A3E" sw={5} />
    <Tree x={700} y={1000} s={0.5} tone="far" />
    <Tree x={960} y={1010} s={0.45} tone="far" flip />
    <Hills id="t4b-sc-h2" y={1020} amp={24} waves={2} phase={2.5} top="#A9C77A" base="#86A158" />
    <Coop x={230} y={FLOOR} s={0.9} />
    <BambooFence x0={470} x1={1080} y={1150} h={100} />
    {/* Đống rơm có cọc */}
    <g transform="translate(940 1240)">
      <SoftShadow cy={-4} rx={150} />
      <path d="M0 -300 L0 -200" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <path d="M0 -300 L0 -200" stroke="#8A5530" strokeWidth="7" strokeLinecap="round" />
      <path d="M-120 0 Q-130 -150 0 -210 Q130 -150 120 0 Z" fill="url(#t4b-hay)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      {[-80, -40, 0, 40, 80].map((hx) => (
        <path key={hx} d={`M${hx * 0.3} -196 Q${hx} -110 ${hx * 1.3} -6`} fill="none" stroke="#B07A22" strokeWidth="4" opacity="0.7" />
      ))}
      <path d="M-80 -120 Q-50 -170 -10 -190" fill="none" stroke="#FFF0B8" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
    </g>
    {/* Ao nhỏ */}
    <ellipse cx="640" cy="1196" rx="150" ry="30" fill="#7EA8A4" stroke={INK} strokeWidth="6" />
    <path d="M560 1192 q30 -8 60 0 M650 1204 q30 -8 60 0" fill="none" stroke="#F4ECD6" strokeWidth="4" strokeLinecap="round" />
    <Floor color="#B88A5A" line="#A07548" />
    <GrassTuft x={50} y={1300} s={1.1} />
    <GrassTuft x={1040} y={1340} s={1.2} flip />
    {/* Vài hạt thóc rơi trên sân */}
    {[
      [380, 1320],
      [420, 1336],
      [700, 1310],
      [650, 1350],
    ].map(([gx, gy]) => (
      <ellipse key={`${gx}${gy}`} cx={gx} cy={gy} rx="6" ry="3.5" fill={PAL.turmeric} stroke={INK} strokeWidth="2" />
    ))}
    <SkyRays from={[860, 360]} opacity={0.1} />
  </>
);

/** Hồ mùa xuân: nắng ấm, núi và cây xa, mặt hồ, đàn thiên nga trắng, lau sậy hai mép, bờ cỏ. */
const Ho: React.FC = () => (
  <>
    <T4bDefs />
    <WarmSky id="t4b-ho-sky" h={FLOOR} sun={[800, 420]} />
    <VCloud x={240} y={300} s={1.1} />
    <FarMountains peaks={[[160, 660, 280], [560, 720, 260], [940, 640, 300]]} foot={880} color="#D8C29C" shade="#BFA57E" line="#9A8262" />
    <Hills id="t4b-ho-h1" y={850} amp={40} waves={3} phase={0.3} top="#B9CC86" base="#8DAA5E" line="#6E5A3E" sw={5} bottom={900} />
    <Tree x={120} y={900} s={0.38} tone="far" />
    <Tree x={900} y={900} s={0.34} tone="far" flip />
    <WaterBand id="t4b-ho-water" y0={890} y1={1170} ripples={12} />
    {/* Đàn thiên nga xa, có bóng nước */}
    {[
      [520, 1000, 0.9],
      [680, 1040, 0.75],
      [820, 990, 0.65],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="-10" cy="6" rx="70" ry="8" fill="#4E7E86" opacity="0.5" />
        <path d="M-60 0 Q-70 -40 0 -36 L40 -30 Q60 0 -60 0 Z" fill="url(#t4b-white)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M30 -32 Q20 -80 44 -100 Q60 -106 66 -94" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M30 -32 Q20 -80 44 -100 Q60 -106 66 -94" fill="none" stroke="#FBF7EE" strokeWidth="8" strokeLinecap="round" />
        <path d="M64 -98 L86 -90 L66 -88 Z" fill="url(#t4b-orange)" stroke={INK} strokeWidth="4" />
      </g>
    ))}
    <path d={`M-20 1170 Q300 1150 540 1172 Q800 1192 1100 1166 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="#9DB86A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <Floor color="#9DB86A" line="#86A158" />
    <Reeds x={70} y={1250} s={1.05} />
    <Reeds x={1010} y={1250} s={0.95} flip />
    <HangingLeaves side={-1} y={-20} />
    <GrassTuft x={250} y={1440} s={1.2} />
    <GrassTuft x={850} y={1500} s={1.3} flip />
    <SkyRays from={[800, 420]} opacity={0.1} />
  </>
);

/** Đồi cỏ chăn bò: đồi xanh nhiều lớp, nhà tranh xa, hai cây mắc võng đào bên phải, hoa cỏ. */
const DoiCo: React.FC = () => (
  <>
    <T4bDefs />
    <WarmSky id="t4b-dc-sky" h={FLOOR} sun={[260, 380]} />
    <VCloud x={620} y={300} s={1.1} />
    <VCloud x={900} y={420} s={0.7} />
    <FarMountains peaks={[[260, 720, 300], [700, 690, 340]]} foot={900} color="#D8C29C" shade="#BFA57E" line="#9A8262" opacity={0.85} />
    <Hills id="t4b-dc-h1" y={840} amp={70} waves={2} phase={0.4} top="#BFD08A" base="#8DAA5E" line="#6E5A3E" sw={5} />
    <ThatchHut x={200} y={900} s={0.38} />
    <Tree x={420} y={890} s={0.3} tone="far" />
    <Hills id="t4b-dc-h2" y={1000} amp={36} waves={2} phase={2} top="#A9C77A" base="#7FA557" />
    <BambooFence x0={-20} x1={260} y={1150} h={90} />
    {/* Hai cây có võng đào */}
    <Tree x={890} y={FLOOR} s={0.62} />
    <Tree x={1070} y={FLOOR} s={0.55} flip />
    <path d="M908 900 Q980 1010 1052 900" fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
    <path d="M908 900 Q980 1010 1052 900" fill="none" stroke="#D97A6A" strokeWidth="10" strokeLinecap="round" />
    <path d="M930 930 Q980 990 1030 930" fill="none" stroke="#F6E9CF" strokeWidth="3" opacity="0.7" />
    <Floor color="#9DB86A" line="#86A158" />
    {/* Hoa cỏ */}
    {[
      [120, 1300],
      [300, 1360],
      [520, 1290],
      [700, 1380],
      [980, 1310],
    ].map(([fx, fy], i) => (
      <g key={fx}>
        <path d={`M${fx} ${fy} l0 22`} stroke={PAL.leafDark} strokeWidth="4" />
        <circle cx={fx} cy={fy} r="10" fill={i % 2 ? PAL.turmeric : "#F6E9CF"} stroke={INK} strokeWidth="3" />
        <circle cx={fx} cy={fy} r="3.5" fill={PAL.earth} />
      </g>
    ))}
    <GrassTuft x={40} y={1280} s={1.2} />
    <GrassTuft x={1040} y={1460} s={1.3} flip />
    <SkyRays from={[260, 380]} opacity={0.1} />
  </>
);

export const scenes: Record<SceneTuan4B, React.FC> = {
  "lu-diem-gom": DiemGom,
  "lu-vung-ngap": VungNgap,
  "vit-san-chuong": SanChuong,
  "vit-ho": Ho,
  "so-dua-doi": DoiCo,
};
