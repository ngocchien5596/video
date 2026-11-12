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
import { Floor, FLOOR, INK, Lines, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";

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
    look: { skin: "#E2A574", sleeve: "#ECE6D6", legs: "#2B3A55", shoe: "#1E1B2E", arm: 26 },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const skin = "#E2A574";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 178, mouthY: 258, browColor: INK };
      return (
        <g>
          <FaceBase skin={skin} />
          {/* Mũ lưỡi trai tối, lưỡi trai chìa về phía trước */}
          <path d="M90 160 C88 76 272 76 270 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M150 156 Q240 140 330 160 Q300 178 160 172 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <circle cx="180" cy="88" r="9" fill="#ECE6D6" stroke={INK} strokeWidth="4" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Ria mép rậm */}
          <path d="M140 238 Q180 222 220 238 Q200 248 180 244 Q160 248 140 238 Z" fill="#1E1B2E" stroke={INK} strokeWidth="4" />
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
    look: { skin: "#FAD2B0", sleeve: "#FAD2B0", legs: "#C9CED6", shoe: "#1E1B2E" },
    headY: 60,
    Head: ({ expr, talk, blink }) => {
      const skin = "#FAD2B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 210, browY: 184, mouthY: 258, browColor: INK };
      return (
        <g>
          <FaceBase skin={skin} />
          {/* Tóc ngắn tối dưới vành nón */}
          <path d="M92 190 C84 120 276 120 268 190 Q236 160 180 164 Q124 160 92 190 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" />
          {/* Nón lá trắng */}
          <path d="M40 160 L180 22 L320 160 Q180 186 40 160 Z" fill="#F4ECD2" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          <path d="M84 150 L180 46 M130 160 L180 46 M230 160 L180 46 M276 150 L180 46" fill="none" stroke="#C9B98A" strokeWidth="4" />
          <path d="M64 150 Q180 172 296 150" fill="none" stroke="#C9B98A" strokeWidth="5" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="126" cy="236" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
          <ellipse cx="234" cy="236" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
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
    look: { skin: "#FFFFFF", sleeve: "#FFFFFF", legs: "#1E1B2E", shoe: "#1E1B2E", arm: 30 },
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
          <path d="M222 122 Q244 130 236 152 Q222 168 212 150 Z" fill="#1E1B2E" stroke={INK} strokeWidth="4" />
          <ellipse cx="190" cy="142" rx="50" ry="42" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
          <path d="M222 122 Q240 134 232 152 Q222 160 216 150 Z" fill="#1E1B2E" />
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
          <path d="M162 214 L198 214 L180 246 Z" fill="#E8C547" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
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
    look: { skin: "#F3CFA6", sleeve: "#4A2340", legs: "#F3CFA6", shoe: "#1E1B2E" },
    headY: 100,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3CFA6";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 204, browY: 176, mouthY: 256, browColor: INK };
      return (
        <g>
          {/* Búi tóc cao, trâm cài */}
          <ellipse cx="180" cy="74" rx="56" ry="42" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <path d="M124 52 L250 96 M136 36 L236 110" stroke="#E8C547" strokeWidth="8" strokeLinecap="round" />
          <circle cx="250" cy="96" r="10" fill="#E8C547" stroke={INK} strokeWidth="4" />
          <FaceBase skin={skin} />
          <path d="M88 186 C76 92 284 92 272 186 Q250 140 180 140 Q110 140 88 186 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Khuyên tai tròn to */}
          <circle cx="94" cy="246" r="12" fill="#E8C547" stroke={INK} strokeWidth="4" />
          <circle cx="266" cy="246" r="12" fill="#E8C547" stroke={INK} strokeWidth="4" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Lông mi cong */}
          <path d="M134 192 l-10 -8 M226 192 l10 -8" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#C0392B" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo tứ thân sẫm, váy dài sẫm, thắt lưng sáng */}
        <path d="M112 312 Q180 292 248 312 L274 482 Q180 498 86 482 Z" fill="#4A2340" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 352 L210 304" fill="#E8C547" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="108" y="400" width="144" height="18" rx="6" fill="#E8C547" stroke={INK} strokeWidth="6" />
        <path d="M200 418 L214 470 M220 418 L240 466" stroke="#E8C547" strokeWidth="6" strokeLinecap="round" />
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
          <path d="M96 170 Q70 260 104 330 L150 300 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <FaceBase skin={skin} />
          <path d="M90 184 C80 100 280 100 270 184 Q240 150 180 152 Q120 150 90 184 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Khăn mỏ quạ sáng, chóp nhọn trên trán */}
          <path d="M84 160 Q180 70 276 160 L262 128 Q180 40 98 128 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M180 92 L172 54 L196 84 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="124" cy="234" rx="12" ry="7" fill="#FF8FA3" opacity="0.8" />
          <ellipse cx="236" cy="234" rx="12" ry="7" fill="#FF8FA3" opacity="0.8" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#D62828" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy nâu, áo tứ thân sáng mở vạt, yếm đỏ */}
        <path d="M110 420 L250 420 L270 484 L90 484 Z" fill="#6B4423" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M112 312 Q180 292 248 312 L244 430 L116 430 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 306 L180 344 L210 306 L206 420 L154 420 Z" fill="#C0392B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="110" y="414" width="140" height="16" rx="6" fill="#6B4423" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "so-dua-chang-trai": {
    look: { skin: "#F3CFA6", sleeve: "#F2EBDD", legs: "#1E1B2E", shoe: "#1E1B2E" },
    headY: 116,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3CFA6";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 174, mouthY: 254, browColor: INK };
      return (
        <g>
          <circle cx="180" cy="92" r="24" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <FaceBase skin={skin} />
          <path d="M88 168 C82 86 278 86 272 168 Q236 136 200 150 Q180 132 160 150 Q124 136 88 168 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
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
        <rect x="110" y="404" width="140" height="22" rx="8" fill="#1E1B2E" stroke={INK} strokeWidth="6" />
        <path d="M216 426 L224 470" stroke="#1E1B2E" strokeWidth="10" strokeLinecap="round" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- đạo cụ

const Box: React.FC<{ x?: number; y?: number; w?: number; h?: number; label?: string; mirrored?: boolean }> = ({
  x = 0,
  y = 0,
  w = 160,
  h = 112,
  label,
  mirrored = false,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx="6" fill="#C8934E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <rect x="-14" y={-h} width="28" height={h} fill="#E8C98E" stroke={INK} strokeWidth="4" />
    {label ? (
      <Unmirror mirrored={mirrored}>
        <rect x={-w / 2 + 10} y={-h * 0.94} width={w - 20} height={h * 0.34} rx="4" fill="#FFF8E7" stroke={INK} strokeWidth="4" />
        <Lines text={label} cy={-h * 0.77} width={w - 34} max={28} color="#B22222" font={TEXT_FONT} />
      </Unmirror>
    ) : null}
  </g>
);

const Truck: React.FC = () => (
  <g>
    {/* Thùng xe chở hàng */}
    <rect x="-280" y="-300" width="390" height="220" rx="10" fill="#E8E4D8" stroke={INK} strokeWidth="9" />
    <Box x={-200} y={-170} w={120} h={86} />
    <Box x={-75} y={-170} w={120} h={86} />
    <Box x={45} y={-170} w={100} h={86} />
    <Box x={-140} y={-256} w={110} h={86} />
    <Box x={-20} y={-256} w={110} h={86} />
    {/* Băng rôn */}
    <rect x="-262" y="-370" width="350" height="62" rx="6" fill="#B22222" stroke={INK} strokeWidth="7" />
    <text x="-87" y="-327" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="42" fill="#FFF8E7">
      CỨU TRỢ
    </text>
    <path d="M-262 -370 L-262 -300 M88 -370 L88 -300" stroke={INK} strokeWidth="6" />
    {/* Cabin bên phải */}
    <path d="M118 -80 L118 -250 L220 -250 L270 -170 L270 -80 Z" fill="#3D7BD9" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M136 -232 L212 -232 L248 -176 L136 -176 Z" fill="#CDEFFC" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="252" y="-120" width="26" height="22" rx="4" fill="#FFE27A" stroke={INK} strokeWidth="5" />
    <rect x="-292" y="-92" width="580" height="30" rx="8" fill="#3A3A48" stroke={INK} strokeWidth="7" />
    {/* Bánh xe */}
    {[-190, 0, 190].map((x) => (
      <g key={x}>
        <circle cx={x} cy="-48" r="48" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
        <circle cx={x} cy="-48" r="18" fill="#C9CED6" stroke={INK} strokeWidth="5" />
      </g>
    ))}
  </g>
);

export const props: Record<PropTuan4B, PropDef> = {
  "lu-mi-goi": {
    mode: "upright",
    draw: ({ mirrored }) => <Box label="MÌ GÓI" mirrored={mirrored} />,
  },
  "lu-quan-ao": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Bọc vải chấm bi buộc nút trên đỉnh, áo thò ra mép */}
        <path d="M-20 -118 Q-58 -160 -40 -170 Q-18 -164 -6 -126 Z M20 -118 Q58 -160 40 -170 Q18 -164 6 -126 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-90 -40 Q-100 -120 0 -124 Q100 -120 90 -40 Q84 0 0 0 Q-84 0 -90 -40 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[
          [-50, -80],
          [-10, -40],
          [40, -86],
          [56, -30],
          [-56, -30],
          [10, -96],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="9" fill="#2E6FB8" />
        ))}
        <path d="M-96 -60 L-122 -50 L-112 -20 L-88 -28 Z" fill="#B22222" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "lu-ao-phao": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Áo phao: hai vạt phồng, sọc phản quang sáng, khoá tối */}
        <path d="M-74 -150 L-30 -150 Q-20 -112 -6 -100 L-6 0 L-78 0 Q-92 -80 -74 -150 Z" fill="#F28C28" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M74 -150 L30 -150 Q20 -112 6 -100 L6 0 L78 0 Q92 -80 74 -150 Z" fill="#F28C28" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-84 -66 L-6 -66 M6 -66 L84 -66 M-84 -30 L-6 -30 M6 -30 L84 -30" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M-84 -66 L-6 -66 M6 -66 L84 -66 M-84 -30 L-6 -30 M6 -30 L84 -30" stroke={INK} strokeWidth="2" />
        <rect x="-16" y="-58" width="32" height="20" rx="4" fill="#1E1B2E" stroke={INK} strokeWidth="4" />
        <rect x="-16" y="-22" width="32" height="20" rx="4" fill="#1E1B2E" stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  "lu-xe-cuu-tro": { mode: "upright", draw: () => <Truck /> },
  "lu-ti-vi": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Kệ gỗ */}
        <rect x="-150" y="-150" width="300" height="24" rx="6" fill="#8B5A2B" stroke={INK} strokeWidth="7" />
        <path d="M-130 -126 L-130 0 M130 -126 L130 0" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M-130 -126 L-130 0 M130 -126 L130 0" stroke="#8B5A2B" strokeWidth="8" strokeLinecap="round" />
        {/* Ăng-ten */}
        <path d="M0 -380 L-70 -460 M0 -380 L60 -470" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        {/* Thân ti vi cũ */}
        <rect x="-160" y="-390" width="320" height="240" rx="24" fill="#5C4128" stroke={INK} strokeWidth="8" />
        <rect x="-136" y="-368" width="230" height="196" rx="20" fill="#9FB4C7" stroke={INK} strokeWidth="6" />
        {/* Màn hình: mái nhà nhô trên nước lũ, mưa */}
        <path d="M-90 -250 L-50 -290 L-10 -250 Z M10 -246 L44 -280 L78 -246 Z" fill="#7A2E22" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M-136 -250 Q-100 -262 -64 -250 T8 -250 T80 -250 L94 -250 L94 -188 Q94 -172 78 -172 L-120 -172 Q-136 -172 -136 -188 Z" fill="#5A6E80" stroke={INK} strokeWidth="4" />
        {[-120, -80, -40, 0, 40, 80].map((x) => (
          <line key={x} x1={x} y1="-356" x2={x - 14} y2="-300" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        ))}
        <circle cx="128" cy="-320" r="13" fill="#C9CED6" stroke={INK} strokeWidth="4" />
        <circle cx="128" cy="-276" r="13" fill="#C9CED6" stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  "vit-trung": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Nửa vỏ trứng vỡ, mép răng cưa, đốm lấm tấm */}
        <path d="M-150 -150 L-118 -118 L-90 -160 L-56 -116 L-20 -164 L16 -118 L52 -162 L86 -116 L118 -154 L150 -116 Q160 0 0 0 Q-160 0 -150 -150 Z" fill="#F7F3E6" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[
          [-90, -70],
          [-30, -40],
          [40, -80],
          [96, -46],
          [0, -100],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="8" fill="#C9B98A" />
        ))}
        <path d="M190 -6 L212 -36 L236 -10 Z M-200 -4 L-222 -30 L-180 -24 Z" fill="#F7F3E6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "vit-vit": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Vịt trắng quay sang phải, mắt cau có, há mỏ quạc */}
        <path d="M-40 -6 L-48 0 M-20 -6 L-12 0" stroke="#E8A13A" strokeWidth="10" strokeLinecap="round" />
        <path d="M-104 -120 L-140 -150 L-118 -96 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="-20" cy="-74" rx="96" ry="64" fill="#FFFFFF" stroke={INK} strokeWidth="8" />
        <path d="M-60 -90 Q-20 -60 20 -84" fill="none" stroke="#C9CED6" strokeWidth="7" strokeLinecap="round" />
        <path d="M40 -100 Q50 -150 54 -170" fill="none" stroke={INK} strokeWidth="52" strokeLinecap="round" />
        <path d="M40 -100 Q50 -150 54 -170" fill="none" stroke="#FFFFFF" strokeWidth="38" strokeLinecap="round" />
        <circle cx="60" cy="-190" r="40" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
        <path d="M90 -200 L150 -206 L144 -190 L92 -186 Z" fill="#E8A13A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M92 -180 L140 -172 L136 -160 L90 -168 Z" fill="#E8A13A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M56 -222 L84 -208" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <circle cx="72" cy="-198" r="7" fill={INK} />
      </g>
    ),
  },
  "vit-ga": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Gà mái nâu sẫm quay sang phải, mào đỏ, mắt cau có */}
        <path d="M-30 -10 L-36 0 M10 -10 L16 0" stroke="#E8A13A" strokeWidth="10" strokeLinecap="round" />
        <path d="M-90 -100 Q-150 -170 -120 -200 Q-110 -150 -70 -130 Z" fill="#5C4128" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="-10" cy="-80" rx="88" ry="70" fill="#8B4A2B" stroke={INK} strokeWidth="8" />
        <path d="M-50 -90 Q-10 -56 30 -90" fill="none" stroke="#5C4128" strokeWidth="8" strokeLinecap="round" />
        <circle cx="54" cy="-170" r="42" fill="#8B4A2B" stroke={INK} strokeWidth="7" />
        <path d="M24 -204 Q30 -236 46 -214 Q56 -240 66 -212 Q80 -232 82 -200 Z" fill="#B22222" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M92 -176 L126 -164 L92 -152 Z" fill="#E8C547" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M86 -146 Q96 -124 80 -126 Z" fill="#B22222" stroke={INK} strokeWidth="4" />
        <path d="M50 -196 L78 -184" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <circle cx="68" cy="-174" r="7" fill={INK} />
      </g>
    ),
  },
  "so-dua": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Quả dừa tròn, xơ dừa, ba "mắt" dừa trên đỉnh, mặt hiền */}
        <ellipse cx="0" cy="-118" rx="122" ry="118" fill="#6B4423" stroke={INK} strokeWidth="9" />
        <path d="M-80 -200 Q-110 -120 -84 -40 M80 -200 Q110 -120 84 -40 M-30 -230 Q-50 -130 -30 -10 M30 -230 Q50 -130 30 -10" fill="none" stroke="#4A2E18" strokeWidth="5" strokeLinecap="round" />
        <circle cx="-22" cy="-210" r="8" fill="#2A1A0E" />
        <circle cx="22" cy="-210" r="8" fill="#2A1A0E" />
        <circle cx="0" cy="-226" r="8" fill="#2A1A0E" />
        <ellipse cx="-38" cy="-128" rx="22" ry="26" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <ellipse cx="38" cy="-128" rx="22" ry="26" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <circle cx="-34" cy="-124" r="10" fill={INK} />
        <circle cx="42" cy="-124" r="10" fill={INK} />
        <path d="M-30 -74 Q0 -50 30 -74" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="-74" cy="-92" rx="14" ry="8" fill="#FF8FA3" opacity="0.7" />
        <ellipse cx="74" cy="-92" rx="14" ry="8" fill="#FF8FA3" opacity="0.7" />
      </g>
    ),
  },
  "so-dua-bo": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Bò béo sáng màu, đốm tối, cúi đầu gặm cỏ bên phải */}
        {[-110, -60, 60, 110].map((x) => (
          <rect key={x} x={x - 16} y="-80" width="32" height="80" rx="10" fill="#E8D3A8" stroke={INK} strokeWidth="6" />
        ))}
        <path d="M-150 -150 Q-200 -120 -186 -70" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="0" cy="-140" rx="160" ry="84" fill="#E8D3A8" stroke={INK} strokeWidth="8" />
        <path d="M-80 -210 Q-40 -190 -60 -150 Q-100 -140 -110 -180 Z M30 -130 Q70 -150 80 -110 Q40 -80 20 -100 Z" fill="#3A2A1E" />
        <path d="M140 -170 Q190 -110 196 -40" fill="none" stroke={INK} strokeWidth="64" strokeLinecap="round" />
        <path d="M140 -170 Q190 -110 196 -40" fill="none" stroke="#E8D3A8" strokeWidth="50" strokeLinecap="round" />
        <path d="M170 -96 L150 -130 M226 -92 L250 -124" stroke="#F2EBDD" strokeWidth="12" strokeLinecap="round" />
        <ellipse cx="200" cy="-46" rx="46" ry="38" fill="#E8D3A8" stroke={INK} strokeWidth="7" />
        <ellipse cx="206" cy="-20" rx="34" ry="18" fill="#F2B8A0" stroke={INK} strokeWidth="5" />
        <circle cx="188" cy="-56" r="6" fill={INK} />
        <path d="M168 0 l10 -26 l10 26 M210 0 l8 -22 l10 22" fill="#4FA85A" stroke={INK} strokeWidth="4" />
      </g>
    ),
  },
  "so-dua-sao": {
    mode: "extend",
    draw: () => (
      <g>
        {/* Sáo trúc: với tư thế tay `hold`, đầu sáo kề đúng miệng; lỗ bấm; nốt nhạc bay ra cuối sáo */}
        <g transform="rotate(36)">
          <rect x="-11" y="-262" width="22" height="322" rx="10" fill="#D9C27A" stroke={INK} strokeWidth="6" />
          {[-150, -100, -60, -20, 20].map((y) => (
            <circle key={y} cx="0" cy={y} r="5" fill={INK} />
          ))}
          <path d="M-11 -180 L11 -180 M-11 40 L11 40" stroke="#8C6A2A" strokeWidth="5" />
        </g>
        {[
          [120, 40],
          [190, 0],
          [170, 100],
        ].map(([x, y]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="0" rx="14" ry="10" fill={INK} transform="rotate(-20)" />
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
        <ellipse cx="-16" cy="0" rx="36" ry="24" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <path d="M10 -6 Q50 -30 70 4 Z" fill="#4FA85A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-70 4 L70 4 L56 70 L-56 70 Z" fill="#C9A24E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-64 26 L64 26 M-60 48 L60 48 M-30 4 L-26 70 M0 4 L0 70 M30 4 L26 70" stroke="#8C6A2A" strokeWidth="4" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Điểm gom hàng cứu trợ ở phố: tường nhà, biển "ĐIỂM NHẬN HÀNG", chồng thùng, bao gạo. */
const DiemGom: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#C9CED6" />
    {/* Mặt tiền nhà, cửa cuốn kéo lên */}
    <rect x="40" y="330" width="1000" height={FLOOR - 330} fill="#E8DCC0" stroke={INK} strokeWidth="9" />
    <rect x="160" y="620" width="760" height={FLOOR - 620} fill="#4A4A58" stroke={INK} strokeWidth="8" />
    {[650, 680, 710].map((y) => (
      <line key={y} x1="160" y1={y} x2="920" y2={y} stroke="#6E6E7C" strokeWidth="5" />
    ))}
    {/* Biển */}
    <rect x="210" y="420" width="660" height="120" rx="10" fill="#B22222" stroke={INK} strokeWidth="9" />
    <text x="540" y="500" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="64" fill="#FFF8E7">
      ĐIỂM NHẬN HÀNG
    </text>
    {/* Hàng đã gom: chồng thùng hai bên, bao gạo */}
    <Box x={150} y={FLOOR} w={170} h={120} />
    <Box x={150} y={FLOOR - 120} w={150} h={110} />
    <Box x={140} y={FLOOR - 230} w={130} h={100} />
    <Box x={940} y={FLOOR} w={170} h={120} />
    <Box x={950} y={FLOOR - 120} w={140} h={110} />
    {[
      [330, 0],
      [420, 0],
      [375, -80],
    ].map(([x, y]) => (
      <g key={`${x}${y}`} transform={`translate(${x} ${FLOOR + y})`}>
        <path d="M-50 0 Q-60 -60 -40 -86 L40 -86 Q60 -60 50 0 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-40 -86 L-30 -100 L30 -100 L40 -86" fill="none" stroke={INK} strokeWidth="6" />
        <text x="0" y="-36" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="26" fill="#B22222">
          GẠO
        </text>
      </g>
    ))}
    <Floor color="#8A8F99" line="#7B7F8A" />
  </>
);

/** Làng ngập: trời mưa xám, nhà ngập tới cửa sổ, cây chìm nửa thân, đường đê phía trước. */
const VungNgap: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#7E8794" />
    {/* Mây đen */}
    {[
      [200, 360],
      [560, 320],
      [900, 380],
    ].map(([x, y]) => (
      <g key={x} transform={`translate(${x} ${y})`} fill="#5A6170" stroke={INK} strokeWidth="6">
        <ellipse cx="0" cy="0" rx="150" ry="56" />
        <ellipse cx="-80" cy="20" rx="90" ry="44" />
        <ellipse cx="90" cy="18" rx="96" ry="46" />
      </g>
    ))}
    {/* Nhà ngập: chỉ còn mái và nửa trên tường */}
    {[
      [200, 760, 1],
      [560, 740, 1.15],
      [900, 780, 0.95],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
        <rect x="-120" y="0" width="240" height="200" fill="#D9CBAA" stroke={INK} strokeWidth="8" />
        <rect x="-70" y="40" width="60" height="60" fill="#3A3A48" stroke={INK} strokeWidth="6" />
        <rect x="20" y="40" width="60" height="60" fill="#3A3A48" stroke={INK} strokeWidth="6" />
        <path d="M-160 10 L0 -110 L160 10 Z" fill="#7A2E22" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      </g>
    ))}
    {/* Cây chìm nửa thân */}
    <rect x="370" y="760" width="30" height="200" fill="#5C4128" stroke={INK} strokeWidth="6" />
    <ellipse cx="385" cy="740" rx="70" ry="60" fill="#3F6B45" stroke={INK} strokeWidth="7" />
    {/* Nước lũ đục, sóng */}
    <rect x="0" y="880" width="1080" height={FLOOR - 880} fill="#4E4434" />
    {[910, 980, 1050, 1120, 1180].map((y, i) => (
      <path
        key={y}
        d={Array.from({ length: 10 }, (_, k) => `${k === 0 ? "M" : ""}${-40 + k * 120 + (i % 2) * 60} ${y} q30 -16 60 0`).join(" ")}
        fill="none"
        stroke="#B8A888"
        strokeWidth="7"
        strokeLinecap="round"
      />
    ))}
    <line x1="0" y1="880" x2="1080" y2="880" stroke={INK} strokeWidth="7" />
    {/* Mưa */}
    {Array.from({ length: 40 }, (_, i) => {
      const x = (i * 211) % 1100;
      const y = 300 + ((i * 137) % 860);
      return <line key={i} x1={x} y1={y} x2={x - 22} y2={y + 70} stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />;
    })}
    <Floor color="#6B5A3E" line="#5C4D35" />
  </>
);

/** Sân chuồng nông trại: chuồng gỗ, hàng rào, ao nhỏ, đống rơm. */
const SanChuong: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#BFE3F2" />
    <circle cx="880" cy="360" r="60" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    {/* Chuồng gỗ mái nhọn */}
    <rect x="60" y="600" width="380" height={FLOOR - 600} fill="#9C5B2E" stroke={INK} strokeWidth="9" />
    {[110, 160, 210, 260, 310, 360, 410].map((x) => (
      <line key={x} x1={x} y1="600" x2={x} y2={FLOOR} stroke="#7A4421" strokeWidth="5" />
    ))}
    <path d="M30 620 L250 440 L470 620 Z" fill="#5C3A1E" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M190 860 L190 760 Q250 700 310 760 L310 860 Z" fill="#2A1A0E" stroke={INK} strokeWidth="7" />
    <rect x="160" y="860" width="180" height="16" fill="#C9A24E" stroke={INK} strokeWidth="5" />
    {/* Hàng rào gỗ */}
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={480 + i * 76} y="900" width="22" height={FLOOR - 900} fill="#C9A07A" stroke={INK} strokeWidth="5" />
    ))}
    <rect x="470" y="940" width="620" height="18" fill="#C9A07A" stroke={INK} strokeWidth="5" />
    <rect x="470" y="1020" width="620" height="18" fill="#C9A07A" stroke={INK} strokeWidth="5" />
    {/* Đống rơm và ao nhỏ */}
    <path d="M820 1240 Q830 1100 920 1090 Q1010 1100 1020 1240 Z" fill="#E8C547" stroke={INK} strokeWidth="7" />
    <ellipse cx="640" cy="1200" rx="150" ry="34" fill="#6EC6F0" stroke={INK} strokeWidth="6" />
    <Floor color="#B08A5A" line="#9C7A4E" />
  </>
);

/** Hồ mùa xuân: nắng, cây xa, mặt hồ, lau sậy, đàn thiên nga trắng xa xa. */
const Ho: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#CDEFFC" />
    <circle cx="820" cy="380" r="70" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <path d={`M0 820 Q160 700 320 800 Q480 690 660 790 Q840 700 1080 800 L1080 900 L0 900 Z`} fill="#4FA85A" stroke={INK} strokeWidth="7" />
    <rect x="0" y="880" width="1080" height={FLOOR - 880} fill="#5A9FD6" />
    <line x1="0" y1="880" x2="1080" y2="880" stroke={INK} strokeWidth="7" />
    {[940, 1010, 1080, 1150].map((y, i) => (
      <path key={y} d={`M${100 + i * 70} ${y} q40 -12 80 0 M${560 - i * 50} ${y + 20} q40 -12 80 0`} fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    ))}
    {/* Đàn thiên nga xa */}
    {[
      [560, 960, 0.9],
      [700, 990, 0.75],
      [840, 950, 0.65],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-60 0 Q-70 -40 0 -36 L40 -30 Q60 0 -60 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M30 -32 Q20 -80 44 -100 Q60 -106 66 -94" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M30 -32 Q20 -80 44 -100 Q60 -106 66 -94" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        <path d="M64 -98 L86 -90 L66 -88 Z" fill="#F28C28" stroke={INK} strokeWidth="4" />
      </g>
    ))}
    {/* Lau sậy hai bên */}
    {[40, 80, 120, 960, 1000, 1040].map((x, i) => (
      <g key={x}>
        <line x1={x} y1={FLOOR} x2={x + (i % 2 ? 10 : -10)} y2={920 + (i % 3) * 40} stroke="#3F6B45" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx={x + (i % 2 ? 10 : -10)} cy={940 + (i % 3) * 40} rx="11" ry="32" fill="#6B4423" stroke={INK} strokeWidth="5" />
      </g>
    ))}
    <Floor color="#6DBE45" line="#5DAA3A" />
  </>
);

/** Đồi cỏ chăn bò: đồi xanh, hai cây có mắc võng bên trái, mây. */
const DoiCo: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#BFE3F2" />
    {[
      [280, 380, 1],
      [760, 440, 0.8],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF" stroke={INK} strokeWidth="5">
        <ellipse cx="-60" cy="12" rx="60" ry="30" />
        <ellipse cx="64" cy="10" rx="64" ry="32" />
        <ellipse cx="0" cy="0" rx="90" ry="40" />
      </g>
    ))}
    <path d={`M-20 ${FLOOR} L-20 860 Q260 700 560 840 Q820 720 1100 820 L1100 ${FLOOR} Z`} fill="#6DBE45" stroke={INK} strokeWidth="8" />
    <path d={`M-20 ${FLOOR} L-20 990 Q400 900 1100 1000 L1100 ${FLOOR} Z`} fill="#5DAA3A" stroke={INK} strokeWidth="6" />
    {/* Hai cây có võng đào */}
    {[900, 1040].map((x) => (
      <g key={x}>
        <rect x={x - 18} y="760" width="36" height={FLOOR - 760} fill="#6B4423" stroke={INK} strokeWidth="7" />
        <ellipse cx={x} cy="720" rx="90" ry="80" fill="#3F8B45" stroke={INK} strokeWidth="7" />
      </g>
    ))}
    <path d="M918 880 Q970 980 1022 880" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
    <path d="M918 880 Q970 980 1022 880" fill="none" stroke="#E8857A" strokeWidth="9" strokeLinecap="round" />
    {/* Hoa cỏ */}
    {[120, 300, 520, 700].map((x, i) => (
      <circle key={x} cx={x} cy={1060 + (i % 2) * 60} r="9" fill="#FFE27A" stroke={INK} strokeWidth="3" />
    ))}
    <Floor color="#5DAA3A" line="#4F9632" />
  </>
);

export const scenes: Record<SceneTuan4B, React.FC> = {
  "lu-diem-gom": DiemGom,
  "lu-vung-ngap": VungNgap,
  "vit-san-chuong": SanChuong,
  "vit-ho": Ho,
  "so-dua-doi": DoiCo,
};
