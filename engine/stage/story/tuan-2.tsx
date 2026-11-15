/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 2 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-2.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 *
 * Tập 8 (Bạch Đằng 938): bd-* · tập 9 (Công Minh Nghi gảy đàn cho trâu): cmn-* · tập 11 (nỏ thần Cổ Loa): adv-*.
 */
import type React from "react";
import { TEXT_FONT } from "../../components/brand.ts";
import type { PropTuan2, RoleTuan2, SceneTuan2 } from "../../lib/story/tuan-2.ts";
import { FLOOR, Floor, LINE as INK, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";
import { Bamboo, Cloud as VCloud, DistantTrees, FarMountains, GrassTuft, Hills, PAL, Reeds, SoftShadow, ThatchHut, TileRoof, Tree, WarmSky, WaterBand } from "../village.tsx";

/** Hai tai người hai bên đầu. */
const Ears: React.FC<{ skin: string; x1?: number; x2?: number; y?: number }> = ({ skin, x1 = 94, x2 = 266, y = 208 }) => (
  <>
    <ellipse cx={x1} cy={y} rx="14" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
    <ellipse cx={x2} cy={y} rx="14" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
  </>
);

/** Dải sóng nước: đường lượn từ x0 tới x1 ở độ cao y. */
const wave = (x0: number, x1: number, y: number, step = 100, amp = 16) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += step) d += ` q${step / 4} ${-amp} ${step / 2} 0 t${step / 2} 0`;
  return d;
};

// ================================================================ vai

export const roles: Record<RoleTuan2, Role> = {
  "ngo-quyen": {
    look: { skin: "#E9B98C", sleeve: "#8E2B22", legs: "#3A2A1E", shoe: "#2E2420", arm: 26 },
    headY: 112,
    Head: ({ expr, talk, blink }) => {
      const skin = "#E9B98C";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 196, browY: 166, mouthY: 250, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="94" y="110" width="172" height="180" rx="74" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Tóc + khăn chít đầu đỏ thắt nút trước trán */}
          <path d="M88 164 C80 80 280 80 272 164 Q230 146 180 148 Q130 146 88 164 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <path d="M84 150 C84 84 276 84 276 150 Q180 120 84 150 Z" fill="#B0302A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M96 128 Q180 102 264 128" fill="none" stroke="#7A1E18" strokeWidth="6" />
          <path d="M162 96 Q150 60 176 62 Q200 60 196 96 Z" fill="#B0302A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M88 150 Q60 170 58 214 M90 146 Q50 150 40 188" fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
          <path d="M88 150 Q60 170 58 214 M90 146 Q50 150 40 188" fill="none" stroke="#B0302A" strokeWidth="10" strokeLinecap="round" />
          {/* Râu quai nón ngắn */}
          <path d="M100 222 Q104 300 180 304 Q256 300 260 222 Q244 270 214 272 Q180 262 146 272 Q116 270 100 222 Z" fill="#2E2420" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
          <path d="M146 234 Q180 220 214 234" fill="none" stroke="#2E2420" strokeWidth="9" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy giáp xẻ, quần sẫm */}
        <path d="M112 420 L248 420 L262 482 L180 470 L98 482 Z" fill="#8E2B22" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Áo giáp vảy sáng màu */}
        <path d="M112 312 Q180 290 248 312 L244 432 L116 432 Z" fill="#E3DCC6" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[340, 370, 400].map((y) =>
          [130, 158, 186, 214].map((x) => (
            <path key={`${x}-${y}`} d={`M${x} ${y} q14 16 28 0`} fill="none" stroke="#8C8470" strokeWidth="5" strokeLinecap="round" />
          )),
        )}
        {/* Hộ tâm kính */}
        <circle cx="180" cy="352" r="26" fill="#B4B9C2" stroke={INK} strokeWidth="6" />
        <circle cx="180" cy="352" r="10" fill="#F2F2F2" stroke={INK} strokeWidth="4" />
        {/* Giáp vai */}
        <path d="M100 330 Q110 296 152 304 L138 346 Z M260 330 Q250 296 208 304 L222 346 Z" fill="#8C8470" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="110" y="420" width="140" height="20" rx="6" fill="#2E2420" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },

  "luu-hoang-thao": {
    look: { skin: "#F3D3B0", sleeve: "#2E2A3A", legs: "#5A4E6E", shoe: "#2E2420" },
    headY: 100,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3D3B0";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 200, browY: 172, mouthY: 252, browColor: INK };
      return (
        <g>
          <rect x="98" y="116" width="164" height="176" rx="70" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Chỏm lông trên mũ */}
          <path d="M180 40 Q150 -6 186 -30 Q176 4 206 -10 Q190 22 200 46 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          {/* Mũ trụ nhọn sẫm, hai vạt che tai */}
          <path d="M84 170 Q80 70 180 40 Q280 70 276 170 Q230 150 180 152 Q130 150 84 170 Z" fill="#2E2A3A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M84 166 L76 250 Q94 262 108 250 L108 170 Z M276 166 L284 250 Q266 262 252 250 L252 170 Z" fill="#2E2A3A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M90 160 Q180 132 270 160" fill="none" stroke="#C9CED6" strokeWidth="10" strokeLinecap="round" />
          <path d="M180 48 L180 140" stroke="#C9CED6" strokeWidth="7" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Ria mỏng rủ */}
          <path d="M176 232 Q150 236 138 262 M184 232 Q210 236 222 262" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M112 420 L248 420 L262 480 L98 480 Z" fill="#5A4E6E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Giáp tối có đinh tán sáng */}
        <path d="M112 312 Q180 290 248 312 L244 432 L116 432 Z" fill="#3A3550" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[340, 372, 404].map((y) => (
          <line key={y} x1="122" y1={y} x2="238" y2={y} stroke="#6A6385" strokeWidth="6" />
        ))}
        {[136, 180, 224].map((x) => [356, 388].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#E8E2D0" stroke={INK} strokeWidth="3" />))}
        <path d="M146 302 L180 326 L214 302" fill="none" stroke="#E8E2D0" strokeWidth="9" strokeLinecap="round" />
        <rect x="110" y="420" width="140" height="18" rx="6" fill="#C9CED6" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },

  "cong-minh-nghi": {
    look: { skin: "#F3D3B0", sleeve: "#F2EBDD", legs: "#F2EBDD", shoe: "#2E2420", arm: 28 },
    headY: 70,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3D3B0";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 200, browY: 172, mouthY: 246, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="96" y="120" width="168" height="170" rx="72" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Mũ cao đen của người học trò / nhạc sư */}
          <path d="M120 150 L126 40 Q180 26 234 40 L240 150 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M86 160 Q180 124 274 160 L268 136 Q180 104 92 136 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="128" y="62" width="104" height="12" fill="#6A6385" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Râu dài bạc */}
          <path d="M138 252 Q180 238 222 252 Q216 300 196 340 Q186 380 180 396 Q174 380 164 340 Q144 300 138 252 Z" fill="#F7F7F7" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M180 270 L180 370 M162 280 L170 340 M198 280 L190 340" stroke="#C8C8C8" strokeWidth="4" strokeLinecap="round" />
          <path d="M144 236 Q180 222 216 236 Q200 246 180 242 Q160 246 144 236 Z" fill="#F7F7F7" stroke={INK} strokeWidth="5" />
          <Mouth expr={expr} y={g.mouthY + 4} talk={talk} color="#8B1E24" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo rộng sáng màu, đai sẫm */}
        <path d="M114 312 Q180 292 246 312 L268 482 Q180 494 92 482 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M146 302 L180 352 L214 302" fill="none" stroke="#2E2420" strokeWidth="12" strokeLinecap="round" />
        <rect x="106" y="404" width="148" height="22" rx="8" fill="#2E2420" stroke={INK} strokeWidth="6" />
        <path d="M200 426 L208 470 M214 426 L226 466" stroke="#2E2420" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
  },

  "con-trau": {
    look: { skin: "#5B5550", sleeve: "#5B5550", legs: "#5B5550", shoe: "#24201C", arm: 28 },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const hide = "#5B5550";
      const perk = expr === "happy" || expr === "shock";
      const g: FaceGeo = { eyeL: 146, eyeR: 214, eyeY: 186, browY: 158, mouthY: 270, browColor: "#E8DFC8" };
      return (
        <g>
          {/* Sừng cong to */}
          <path d="M110 140 Q40 140 30 60 Q60 100 104 104 Z M250 140 Q320 140 330 60 Q300 100 256 104 Z" fill="#E8DFC8" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          {/* Tai: cụp ngang, vểnh lên khi vui / giật mình */}
          {perk ? (
            <path d="M104 150 L60 80 L124 126 Z M256 150 L300 80 L236 126 Z" fill={hide} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          ) : (
            <path d="M100 168 L36 196 L104 200 Z M260 168 L324 196 L256 200 Z" fill={hide} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          )}
          <rect x="94" y="110" width="172" height="186" rx="70" fill={hide} stroke={INK} strokeWidth="7" />
          {/* Chỏm lông trán */}
          <path d="M150 116 Q180 98 210 116 Q196 132 180 126 Q164 132 150 116 Z" fill="#3E3A36" stroke={INK} strokeWidth="5" />
          {/* Lòng trắng mắt để thấy mắt trên mặt sẫm */}
          <ellipse cx={g.eyeL} cy={g.eyeY} rx="20" ry="18" fill="#F2F2F2" stroke={INK} strokeWidth="5" />
          <ellipse cx={g.eyeR} cy={g.eyeY} rx="20" ry="18" fill="#F2F2F2" stroke={INK} strokeWidth="5" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Mõm sáng, hai lỗ mũi */}
          <ellipse cx="180" cy="252" rx="74" ry="50" fill="#C9BBA8" stroke={INK} strokeWidth="7" />
          <ellipse cx="154" cy="240" rx="9" ry="12" fill={INK} />
          <ellipse cx="206" cy="240" rx="9" ry="12" fill={INK} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Đuôi có chùm lông */}
        <path d="M118 420 Q70 430 62 486" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M118 420 Q70 430 62 486" fill="none" stroke="#5B5550" strokeWidth="8" strokeLinecap="round" />
        <path d="M62 478 Q44 506 52 520 Q62 506 66 520 Q76 506 70 482 Z" fill="#24201C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Thân sẫm, bụng sáng */}
        <path d="M112 312 Q180 290 248 312 L252 470 Q180 486 108 470 Z" fill="#5B5550" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <ellipse cx="180" cy="400" rx="46" ry="58" fill="#8E857C" />
      </g>
    ),
  },

  "an-duong-vuong": {
    look: { skin: "#F0CBA2", sleeve: "#E3B23C", legs: "#F2EBDD", shoe: "#2E2420", arm: 26 },
    headY: 104,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F0CBA2";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 196, browY: 168, mouthY: 244, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="96" y="114" width="168" height="174" rx="72" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Mũ miện: thân mũ, tấm phẳng trên đỉnh, tua ngọc rủ trước sau */}
          <path d="M98 158 Q96 92 180 88 Q264 92 262 158 Q180 134 98 158 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="66" y="64" width="228" height="26" rx="6" fill="#2E2420" stroke={INK} strokeWidth="6" />
          <path d="M90 110 Q180 92 270 110" fill="none" stroke="#E3B23C" strokeWidth="8" />
          {[78, 98, 262, 282].map((x) => (
            <g key={x}>
              <line x1={x} y1="90" x2={x} y2="146" stroke={INK} strokeWidth="4" />
              {[104, 120, 136].map((y) => (
                <circle key={y} cx={x} cy={y} r="6" fill="#F2F2F2" stroke={INK} strokeWidth="3" />
              ))}
            </g>
          ))}
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          {/* Râu dài */}
          <path d="M146 262 Q180 252 214 262 Q206 320 180 356 Q154 320 146 262 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M178 228 Q148 232 128 252 M182 228 Q212 232 232 252" fill="none" stroke="#2E2420" strokeWidth="9" strokeLinecap="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo bào vàng viền sẫm, đai ngọc */}
        <path d="M114 312 Q180 292 246 312 L268 482 Q180 494 92 482 Z" fill="#E3B23C" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 344 L210 304" fill="none" stroke="#7A2E22" strokeWidth="10" strokeLinecap="round" />
        <circle cx="180" cy="372" r="24" fill="none" stroke="#7A2E22" strokeWidth="6" />
        <path d="M166 372 Q180 356 194 372 Q180 388 166 372" fill="none" stroke="#7A2E22" strokeWidth="5" />
        <rect x="104" y="410" width="152" height="22" rx="8" fill="#7A2E22" stroke={INK} strokeWidth="6" />
        {[130, 160, 200, 230].map((x) => (
          <circle key={x} cx={x} cy="421" r="6" fill="#F2F2F2" stroke={INK} strokeWidth="3" />
        ))}
        <path d="M98 470 Q180 482 262 470" fill="none" stroke="#7A2E22" strokeWidth="8" />
      </g>
    ),
  },

  "trong-thuy": {
    look: { skin: "#F6D5B5", sleeve: "#2B3A55", legs: "#2B3A55", shoe: "#2E2420" },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F6D5B5";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 202, browY: 172, mouthY: 252, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="96" y="116" width="168" height="174" rx="76" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Búi tóc cao cài trâm */}
          <ellipse cx="180" cy="86" rx="34" ry="30" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <line x1="122" y1="80" x2="244" y2="92" stroke={INK} strokeWidth="14" strokeLinecap="round" />
          <line x1="122" y1="80" x2="244" y2="92" stroke="#E8E2D0" strokeWidth="7" strokeLinecap="round" />
          <path d="M88 176 C78 92 282 92 272 176 Q260 140 220 134 Q180 150 140 134 Q100 140 88 176 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          {/* Lọn tóc mai rủ */}
          <path d="M224 140 Q246 170 236 200" fill="none" stroke="#2E2420" strokeWidth="8" strokeLinecap="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo dài sẫm, cổ viền sáng chéo, đai sáng */}
        <path d="M116 312 Q180 292 244 312 L264 482 Q180 494 96 482 Z" fill="#2B3A55" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M144 304 L206 400" stroke="#E8E2D0" strokeWidth="12" strokeLinecap="round" />
        <path d="M214 304 L192 340" stroke="#E8E2D0" strokeWidth="12" strokeLinecap="round" />
        <rect x="106" y="412" width="148" height="18" rx="6" fill="#E8E2D0" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
};

// ================================================================ đạo cụ

/** Một cây cọc gỗ đầu bịt sắt, đáy ở (0,0), mũi hướng lên. */
const Stake: React.FC<{ h: number }> = ({ h }) => (
  <g>
    <rect x="-14" y={-h + 40} width="28" height={h - 40} fill="url(#w-wood-h)" stroke={INK} strokeWidth="6" />
    <path d={`M-14 ${-h + 56} L14 ${-h + 70} M-14 ${-h / 2} L14 ${-h / 2 + 12}`} stroke="#5E3A20" strokeWidth="4" />
    <path d={`M-6 ${-h + 50} L-6 -6`} stroke="#E2B07A" strokeWidth="3" opacity="0.6" />
    <path d={`M-18 ${-h + 44} L18 ${-h + 44} L0 ${-h - 6} Z`} fill="url(#w-dark)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d={`M-6 ${-h + 36} L0 ${-h + 6}`} stroke="#D8D2C4" strokeWidth="5" strokeLinecap="round" />
  </g>
);

/** Thân thuyền chiến Nam Hán (mũi bên trái): mạn gỗ sẫm, khiên tròn dọc mạn. */
const Warship: React.FC = () => (
  <g transform="translate(0 90)">
    <path
      d="M-300 -250 L300 -250 Q320 -258 326 -290 L340 -284 Q340 -190 290 -150 L-250 -150 Q-310 -180 -340 -280 Q-370 -320 -350 -350 L-332 -340 Q-330 -280 -300 -250 Z"
      fill="url(#w-wood-dark)"
      stroke={INK}
      strokeWidth="9"
      strokeLinejoin="round"
    />
    <path d="M-290 -214 L300 -214 M-270 -182 L290 -182" stroke="#3A2416" strokeWidth="6" />
    <path d="M-300 -240 L300 -240" stroke="#B87C48" strokeWidth="4" opacity="0.6" />
    <rect x="-310" y="-268" width="636" height="22" rx="8" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
    {[-230, -150, 150, 230].map((x) => (
      <g key={x}>
        <circle cx={x} cy="-226" r="24" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
        <circle cx={x} cy="-226" r="12" fill="none" stroke="#8A5A1E" strokeWidth="3" />
        <circle cx={x} cy="-226" r="5" fill={INK} />
      </g>
    ))}
    {/* Mắt thuyền ở mũi */}
    <circle cx="-310" cy="-262" r="13" fill="#FBF1DC" stroke={INK} strokeWidth="5" />
    <circle cx="-314" cy="-262" r="5" fill={INK} />
  </g>
);

/** Bóng nói tròn có đuôi (đáy đuôi về phía dưới trái). */
const Bubble: React.FC<{ rx: number }> = ({ rx }) => (
  <>
    <ellipse cx="6" cy="10" rx={rx} ry="110" fill="#3A2416" opacity="0.18" />
    <path d="M-60 90 L-100 170 L0 96 Z" fill="#FFF8E8" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <ellipse cx="0" cy="0" rx={rx} ry="110" fill="url(#w-paper)" stroke={INK} strokeWidth="8" />
    <path d="M-60 92 L-14 92" stroke="#F4E6C8" strokeWidth="12" />
    <path d={`M${-rx * 0.7} -50 Q${-rx * 0.4} -92 0 -96`} fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
  </>
);

const TEXT = { fontFamily: TEXT_FONT, fontWeight: 900 } as const;

export const props: Record<PropTuan2, PropDef> = {
  // ------------------------------------------------ Bạch Đằng 938
  "bd-stakes": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={250} ry={30} />
        {[
          [-170, 140, -10],
          [-90, 160, -6],
          [-10, 150, -12],
          [70, 165, -4],
          [150, 145, -9],
        ].map(([x, h, r]) => (
          <g key={x} transform={`translate(${x} 0) rotate(${r})`}>
            <Stake h={h} />
          </g>
        ))}
        <path d="M-230 4 Q-120 -26 0 -16 Q120 -26 230 4 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-160 -8 q20 -6 40 0 M60 -10 q20 -6 40 0" fill="none" stroke="#C98A55" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
  },
  "bd-stake": {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-12" y="-20" width="24" height="200" rx="6" fill="url(#w-wood-h)" stroke={INK} strokeWidth="6" />
        <path d="M-4 -6 L-4 170" stroke="#E2B07A" strokeWidth="3" opacity="0.6" />
        <path d="M-12 40 L12 50 M-12 110 L12 120" stroke="#5E3A20" strokeWidth="4" />
        <path d="M-16 176 L16 176 L0 226 Z" fill="url(#w-dark)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-4 184 L0 210" stroke="#D8D2C4" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "bd-tide": {
    mode: "upright",
    draw: () => (
      <g>
        <defs>
          <linearGradient id="t2-tide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8FB4AC" />
            <stop offset="0.35" stopColor="#5F8C8C" />
            <stop offset="1" stopColor="#3E6670" />
          </linearGradient>
        </defs>
        <path d={`${wave(-1400, 1400, -80, 120, 16)} L1400 900 L-1400 900 Z`} fill="url(#t2-tide)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Mũi cọc lờ mờ dưới nước, khớp bãi cọc đặt ở x 0.6 và 0.86 khi nước đặt ở x 0.5 */}
        {[108, 389].map((cx) =>
          [-150, -80, -10, 60, 140].map((dx, i) => (
            <path key={cx + dx} d={`M${cx + dx - 14} ${-14 + (i % 2) * 8} L${cx + dx} ${-58 + (i % 2) * 8} L${cx + dx + 14} ${-14 + (i % 2) * 8} Z`} fill="#2A3A3E" opacity="0.35" />
          )),
        )}
        {[-40, 0, 60].map((y, i) => (
          <path key={y} d={wave(-1340 + i * 60, 1400, y, 160, 14)} fill="none" stroke="#E6EBD6" strokeWidth={7 - i} strokeLinecap="round" opacity={0.8 - i * 0.2} />
        ))}
        <path d={wave(-1400, 1400, -72, 120, 16)} fill="none" stroke="#F4ECD6" strokeWidth="6" opacity="0.6" />
      </g>
    ),
  },
  "bd-boat": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 90)">
        {/* Cờ đuôi nheo ở đuôi thuyền */}
        <line x1="-170" y1="-200" x2="-170" y2="-380" stroke={INK} strokeWidth="10" strokeLinecap="round" />
        <line x1="-170" y1="-200" x2="-170" y2="-380" stroke="#8A5530" strokeWidth="4" strokeLinecap="round" />
        <path d="M-170 -380 Q-130 -376 -90 -360 Q-130 -350 -170 -334 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path
          d="M-200 -226 L180 -226 Q214 -236 226 -284 L244 -278 Q236 -176 170 -150 L-160 -150 Q-200 -170 -200 -226 Z"
          fill="url(#w-wood)"
          stroke={INK}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path d="M-186 -196 L196 -196 M-170 -170 L180 -170" stroke="#5E3A20" strokeWidth="5" />
        <path d="M-180 -212 L200 -212" stroke="#E2B07A" strokeWidth="4" opacity="0.6" />
        <rect x="-206" y="-238" width="410" height="18" rx="7" fill="url(#w-wood-h)" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "bd-warship": { mode: "upright", draw: () => <Warship /> },
  "bd-sail": {
    mode: "upright",
    draw: () => (
      <g>
        <line x1="170" y1="-100" x2="170" y2="-880" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <line x1="170" y1="-100" x2="170" y2="-880" stroke="#9A6236" strokeWidth="10" strokeLinecap="round" />
        <path d="M60 -800 L270 -780 L290 -330 L40 -350 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M170 -790 L170 -340 L290 -330 L270 -780 Z" fill="#B8956A" opacity="0.3" />
        {[-700, -600, -500, -410].map((y) => (
          <line key={y} x1="50" y1={y} x2="282" y2={y + 18} stroke="#6E4324" strokeWidth="7" />
        ))}
        <path d="M170 -878 L10 -866 L20 -812 L170 -824 Z" fill="url(#w-dark)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <text x="92" y="-834" textAnchor="middle" fontSize="30" fill="#FBF1DC" {...TEXT}>
          NAM HÁN
        </text>
      </g>
    ),
  },
  "bd-wreck": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={380} ry={36} />
        {/* Cột buồm gãy đổ nghiêng */}
        <line x1="150" y1="-150" x2="330" y2="-420" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <line x1="150" y1="-150" x2="330" y2="-420" stroke="#9A6236" strokeWidth="10" strokeLinecap="round" />
        <path d="M300 -470 L400 -330 L350 -300 L250 -430 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M275 -450 L375 -315" stroke="#6E4324" strokeWidth="5" />
        {/* Nửa thuyền trái, chúc mũi */}
        <g transform="rotate(-9 -100 -60)">
          <path d="M-330 -230 L60 -230 L80 -170 L50 -120 L70 -60 L-230 -60 Q-300 -100 -330 -230 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <rect x="-336" y="-246" width="400" height="20" rx="8" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
          <path d="M-310 -180 L60 -180 M-280 -120 L60 -120" stroke="#3A2416" strokeWidth="6" />
        </g>
        {/* Nửa thuyền phải, chổng đuôi */}
        <g transform="rotate(12 200 -60)">
          <path d="M120 -230 L330 -230 Q350 -150 300 -60 L130 -60 L104 -120 L140 -170 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <rect x="114" y="-246" width="230" height="20" rx="8" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
          <path d="M120 -180 L330 -180 M128 -120 L320 -120" stroke="#3A2416" strokeWidth="6" />
        </g>
        {/* Cọc đâm xuyên mạn thuyền */}
        {[
          [-200, 250, -6],
          [-40, 270, 4],
          [230, 260, -8],
        ].map(([x, h, r]) => (
          <g key={x} transform={`translate(${x} 0) rotate(${r})`}>
            <Stake h={h} />
          </g>
        ))}
        {/* Mảnh gỗ văng */}
        <path d="M-40 -330 l40 -14 l6 16 l-40 14 Z M100 -360 l34 10 l-4 16 l-34 -10 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-90 -300 l-20 -26 M70 -320 l10 -30 M160 -300 l26 -20" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        {/* Bùn lòng sông */}
        <path d="M-380 10 Q-200 -50 0 -36 Q200 -50 400 10 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-260 -14 q30 -8 60 0 M120 -20 q30 -8 60 0" fill="none" stroke="#C98A55" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },

  // ------------------------------------------------ Công Minh Nghi gảy đàn cho trâu
  "cmn-qin": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={200} ry={20} />
        <g transform="rotate(-10 0 -70)">
          <path d="M-180 -96 Q-186 -60 -170 -44 L170 -44 Q190 -60 182 -96 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M-170 -88 Q0 -100 172 -88" fill="none" stroke="#C48D57" strokeWidth="4" opacity="0.7" />
          {[-84, -74, -64, -54].map((y) => (
            <line key={y} x1="-160" y1={y} x2="166" y2={y} stroke="#FBF1DC" strokeWidth="3" />
          ))}
          <rect x="-176" y="-100" width="22" height="58" rx="4" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
          <rect x="150" y="-100" width="22" height="58" rx="4" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
          {[-100, -20, 60].map((x) => (
            <circle key={x} cx={x} cy="-92" r="5" fill="url(#w-brass)" stroke={INK} strokeWidth="2" />
          ))}
        </g>
      </g>
    ),
  },
  "cmn-notes": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -700)">
        <path d="M-200 80 Q-100 -20 0 40 Q100 100 200 0" fill="none" stroke="#B87C48" strokeWidth="5" strokeDasharray="14 14" strokeLinecap="round" />
        {[
          [-150, 20, 1],
          [-30, -40, 2],
          [110, 10, 1],
          [40, -150, 2],
        ].map(([x, y, n]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(-12)`}>
            <ellipse cx="0" cy="0" rx="22" ry="16" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="4" />
            <ellipse cx="-6" cy="-5" rx="8" ry="4" fill="#FFFFFF" opacity="0.45" />
            <line x1="18" y1="-4" x2="18" y2="-80" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            {n === 2 ? (
              <>
                <ellipse cx="62" cy="10" rx="22" ry="16" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="4" />
                <ellipse cx="56" cy="5" rx="8" ry="4" fill="#FFFFFF" opacity="0.45" />
                <line x1="80" y1="6" x2="80" y2="-70" stroke={INK} strokeWidth="7" strokeLinecap="round" />
                <path d="M18 -80 L80 -70 L80 -54 L18 -64 Z" fill={INK} />
              </>
            ) : (
              <path d="M18 -80 Q48 -60 40 -30" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            )}
          </g>
        ))}
      </g>
    ),
  },
  "cmn-buzz": {
    mode: "upright",
    draw: ({ mirrored }) => (
      <g transform="translate(0 -690) scale(0.9)">
        <Bubble rx={210} />
        {/* Con muỗi */}
        <g transform="translate(-120 -10)">
          <ellipse cx="-14" cy="-26" rx="22" ry="14" fill="#F4ECD6" stroke={INK} strokeWidth="4" transform="rotate(-30 -14 -26)" />
          <ellipse cx="14" cy="-28" rx="22" ry="14" fill="#F4ECD6" stroke={INK} strokeWidth="4" transform="rotate(30 14 -28)" />
          <ellipse cx="0" cy="0" rx="30" ry="12" fill="url(#w-dark)" stroke={INK} strokeWidth="3" />
          <circle cx="34" cy="-4" r="11" fill="url(#w-dark)" stroke={INK} strokeWidth="3" />
          <line x1="42" y1="-2" x2="72" y2="10" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M-14 8 l-12 26 M0 10 l-4 28 M14 8 l6 26" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
        <Unmirror mirrored={mirrored}>
          <text x="50" y="18" textAnchor="middle" fontSize="54" fill={INK} {...TEXT}>
            VO VE...
          </text>
        </Unmirror>
      </g>
    ),
  },
  "cmn-calf-call": {
    mode: "upright",
    draw: ({ mirrored }) => (
      <g transform="translate(0 -690) scale(0.9)">
        <Bubble rx={220} />
        {/* Đầu con nghé */}
        <g transform="translate(-130 0)">
          <path d="M-40 -30 L-70 -20 L-40 -6 Z M40 -30 L70 -20 L40 -6 Z" fill="#8E7A66" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="0" cy="-6" rx="44" ry="50" fill="#8E7A66" stroke={INK} strokeWidth="5" />
          <ellipse cx="-14" cy="-26" rx="16" ry="12" fill="#B8A48A" opacity="0.7" />
          <ellipse cx="0" cy="24" rx="30" ry="20" fill="#E9D8BE" stroke={INK} strokeWidth="4" />
          <circle cx="-16" cy="-16" r="6" fill={INK} />
          <circle cx="16" cy="-16" r="6" fill={INK} />
          <ellipse cx="0" cy="30" rx="10" ry="8" fill={INK} />
        </g>
        <Unmirror mirrored={mirrored}>
          <text x="54" y="18" textAnchor="middle" fontSize="54" fill={INK} {...TEXT}>
            NGHÉ Ọ!
          </text>
        </Unmirror>
      </g>
    ),
  },
  "cmn-grass": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={60} ry={10} />
        {[-30, -16, -4, 8, 20, 32].map((x, i) => (
          <path key={x} d={`M${x / 3} 0 Q${x} -50 ${x * 1.8} ${-90 - (i % 2) * 20}`} fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        ))}
        {[-30, -16, -4, 8, 20, 32].map((x, i) => (
          <path key={x} d={`M${x / 3} 0 Q${x} -50 ${x * 1.8} ${-90 - (i % 2) * 20}`} fill="none" stroke={i % 2 ? PAL.leaf : PAL.leafDark} strokeWidth="7" strokeLinecap="round" />
        ))}
        {[-16, 8].map((x) => (
          <path key={x} d={`M${x / 3} -10 Q${x} -50 ${x * 1.6} -70`} fill="none" stroke={PAL.leafLight} strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>
    ),
  },

  // ------------------------------------------------ An Dương Vương, nỏ thần
  "adv-mi-chau": {
    mode: "upright",
    draw: () => (
      <g transform="scale(1.05)">
        <SoftShadow cy={-4} rx={100} ry={16} />
        {/* Tóc dài sau lưng */}
        <path d="M-56 -400 Q-80 -300 -62 -230 L10 -230 L10 -400 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Váy dài sáng màu, khăn choàng */}
        <defs>
          <linearGradient id="t2-mc-dress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F8E0DA" />
            <stop offset="1" stopColor="#D9A8A8" />
          </linearGradient>
        </defs>
        <path d="M-50 -270 Q0 -286 50 -270 L84 -10 Q0 6 -84 -10 Z" fill="url(#t2-mc-dress)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-36 -250 L-62 -24" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
        <path d="M-60 -6 Q0 8 60 -6" fill="none" stroke="#A8362A" strokeWidth="8" />
        <rect x="-54" y="-200" width="108" height="18" rx="6" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
        <path d="M-10 -184 L-20 -80 M10 -184 L24 -90" stroke="#A8362A" strokeWidth="8" strokeLinecap="round" />
        {/* Hai tay chắp trước bụng */}
        <path d="M-44 -258 Q-60 -200 -10 -170 M44 -258 Q60 -200 10 -170" fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
        <path d="M-44 -258 Q-60 -200 -10 -170 M44 -258 Q60 -200 10 -170" fill="none" stroke="#F2D4CC" strokeWidth="16" strokeLinecap="round" />
        <circle cx="0" cy="-168" r="16" fill="#F6D5B5" stroke={INK} strokeWidth="5" />
        {/* Đầu */}
        <circle cx="4" cy="-336" r="64" fill="#F6D5B5" stroke={INK} strokeWidth="7" />
        <path d="M-60 -330 Q-66 -404 4 -406 Q70 -404 68 -350 Q40 -380 4 -370 Q-30 -380 -60 -330 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="4" cy="-420" rx="34" ry="24" fill="#2E2420" stroke={INK} strokeWidth="6" />
        <path d="M-26 -430 L36 -416" stroke="#E3A631" strokeWidth="8" strokeLinecap="round" />
        <circle cx="40" cy="-430" r="9" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <circle cx="-14" cy="-336" r="7" fill={INK} />
        <circle cx="26" cy="-336" r="7" fill={INK} />
        <ellipse cx="-24" cy="-312" rx="9" ry="5" fill="#F2A08A" opacity="0.7" />
        <ellipse cx="36" cy="-312" rx="9" ry="5" fill="#F2A08A" opacity="0.7" />
        <path d="M-6 -306 Q6 -296 18 -306" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "adv-crossbow": {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-14" y="-30" width="28" height="200" rx="8" fill="url(#w-wood-h)" stroke={INK} strokeWidth="6" />
        <path d="M-120 110 Q-60 170 0 166 Q60 170 120 110" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M-120 110 Q-60 170 0 166 Q60 170 120 110" fill="none" stroke="#D9A23A" strokeWidth="10" strokeLinecap="round" />
        <path d="M-110 116 Q-60 158 -10 160" fill="none" stroke="#F5CF6A" strokeWidth="3" strokeLinecap="round" />
        <path d="M-120 110 L0 40 L120 110" fill="none" stroke={INK} strokeWidth="4" />
        <path d="M-10 20 L0 40 L10 20 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <line x1="0" y1="40" x2="0" y2="200" stroke={INK} strokeWidth="6" />
        <path d="M-12 196 L0 224 L12 196 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "adv-crossbow-rack": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={140} ry={20} />
        {/* Hào quang nỏ thần */}
        <circle cx="0" cy="-330" r="170" fill="url(#w-glow)" opacity="0.8" />
        {[-60, -30, 0, 30, 60].map((a) => (
          <line key={a} x1="0" y1="-330" x2={Math.sin((a * Math.PI) / 180) * 190} y2={-330 - Math.cos((a * Math.PI) / 180) * 190} stroke="#E3A631" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        ))}
        {/* Giá gỗ */}
        <path d="M-100 0 L-60 -280 M100 0 L60 -280" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M-100 0 L-60 -280 M100 0 L60 -280" stroke="#9A6236" strokeWidth="12" strokeLinecap="round" />
        <rect x="-110" y="-292" width="220" height="24" rx="6" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
        {/* Nỏ nằm ngang trên giá */}
        <rect x="-150" y="-322" width="270" height="26" rx="8" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
        <path d="M-140 -314 L110 -314" stroke="#E2B07A" strokeWidth="3" opacity="0.7" />
        <path d="M100 -430 Q160 -370 162 -310 Q160 -250 100 -190" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M100 -430 Q160 -370 162 -310 Q160 -250 100 -190" fill="none" stroke="#D9A23A" strokeWidth="10" strokeLinecap="round" />
        <path d="M100 -430 L-60 -310 L100 -190" fill="none" stroke={INK} strokeWidth="4" />
        <path d="M-80 -296 L-60 -270 L-40 -296 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
    ),
  },
  "adv-trigger": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -10)">
        <circle cx="0" cy="-60" r="110" fill="url(#w-glow)" />
        {/* Hào quang */}
        {[-60, -30, 0, 30, 60].map((a) => (
          <line key={a} x1="0" y1="-70" x2={Math.sin((a * Math.PI) / 180) * 110} y2={-70 - Math.cos((a * Math.PI) / 180) * 110} stroke="#E3A631" strokeWidth="6" strokeLinecap="round" />
        ))}
        {/* Lẫy hình móng rùa vàng: gan bàn chân và ba vuốt cong to */}
        <path d="M-40 0 Q-50 -50 0 -60 Q50 -50 40 0 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[-30, 0, 30].map((x) => (
          <path key={x} d={`M${x - 13} -50 Q${x - 12} -110 ${x + 14} -124 Q${x + 2} -96 ${x + 13} -52 Z`} fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        ))}
        <path d="M-22 -24 Q0 -36 22 -24" fill="none" stroke="#9A6A1E" strokeWidth="5" strokeLinecap="round" />
        <path d="M-28 -12 Q-30 -40 -6 -48" fill="none" stroke="#FFF3CF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </g>
    ),
  },
  "adv-army": {
    mode: "upright",
    draw: ({ mirrored }) => (
      <g>
        <SoftShadow cy={-4} rx={300} ry={30} />
        {/* Hàng giáo */}
        {[-230, -110, 10, 90, 210].map((x) => (
          <g key={x}>
            <line x1={x} y1="-150" x2={x + 20} y2="-620" stroke={INK} strokeWidth="10" strokeLinecap="round" />
            <line x1={x} y1="-150" x2={x + 20} y2="-620" stroke="#8A5530" strokeWidth="4" strokeLinecap="round" />
            <path d={`M${x + 12} -610 L${x + 22} -660 L${x + 32} -608 Z`} fill="url(#w-metal)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          </g>
        ))}
        {/* Cờ */}
        {[
          [-170, -720],
          [150, -780],
        ].map(([x, y]) => (
          <g key={x}>
            <line x1={x} y1="-200" x2={x} y2={y} stroke={INK} strokeWidth="11" strokeLinecap="round" />
            <line x1={x} y1="-200" x2={x} y2={y} stroke="#8A5530" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${x} ${y} L${x - 150} ${y + 20} L${x - 150} ${y + 150} L${x} ${y + 130} Z`} fill="url(#w-dark)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <path d={`M${x - 150} ${y + 20} L${x - 150} ${y + 150} L${x - 130} ${y + 148} L${x - 130} ${y + 18} Z`} fill="#A8362A" />
            <Unmirror mirrored={mirrored}>
              <text x={mirrored ? -(x - 75) : x - 75} y={y + 86} textAnchor="middle" fontSize="34" fill="#F6E9CF" {...TEXT}>
                TRIỆU
              </text>
            </Unmirror>
          </g>
        ))}
        {/* Lính đội mũ nhọn */}
        {[
          [-200, -260],
          [-60, -300],
          [80, -270],
          [220, -290],
        ].map(([x, y]) => (
          <g key={x}>
            <path d={`M${x - 70} 0 L${x - 56} ${y + 70} Q${x} ${y + 50} ${x + 56} ${y + 70} L${x + 70} 0 Z`} fill="#5A4A3E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
            <path d={`M${x + 20} ${y + 64} L${x + 40} 0 L${x + 70} 0 L${x + 56} ${y + 70} Z`} fill="#3A2E26" opacity="0.5" />
            <path d={`M${x - 40} ${y + 110} L${x + 40} ${y + 110}`} stroke="#8A5530" strokeWidth="8" />
            <circle cx={x} cy={y} r="46" fill="#F3D3B0" stroke={INK} strokeWidth="6" />
            <path d={`M${x - 54} ${y - 6} Q${x} ${y - 100} ${x + 54} ${y - 6} Z`} fill="url(#w-dark)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <circle cx={x + 14} cy={y + 6} r="5" fill={INK} />
            <path d={`M${x + 4} ${y - 10} l20 6`} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
      </g>
    ),
  },
};

// ================================================================ phông

/** Vũng nước đọng trên bãi bùn, phản chiếu trời. */
const Puddle: React.FC<{ x: number; y: number; rx: number }> = ({ x, y, rx }) => (
  <g>
    <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.14} fill="#A9C4BC" stroke={INK} strokeWidth="4" />
    <path d={`M${x - rx * 0.5} ${y - 2} q${rx * 0.2} -5 ${rx * 0.4} 0`} fill="none" stroke="#F4ECD6" strokeWidth="4" strokeLinecap="round" />
  </g>
);

/** Sông Bạch Đằng lúc triều rút: núi đá vôi xa, mặt sông, bãi bùn có vũng nước, lau sậy hai mép (tiền cảnh). */
const BachDang: React.FC = () => (
  <>
    <WarmSky id="t2-bd-sky" h={FLOOR} sun={[300, 380]} top="#EFC285" />
    <VCloud x={760} y={300} s={1} />
    <VCloud x={160} y={520} s={0.6} />
    {/* Núi đá vôi xa hai lớp */}
    <FarMountains
      peaks={[
        [60, 620, 130],
        [250, 560, 120],
        [430, 660, 110],
        [640, 590, 130],
        [860, 540, 140],
        [1040, 640, 110],
      ]}
      foot={900}
      color="#D9C6A2"
      shade="#BBA47E"
      line="#9A8262"
    />
    <FarMountains
      peaks={[
        [150, 720, 150],
        [520, 760, 140],
        [950, 700, 170],
      ]}
      foot={900}
      color="#BFAE86"
      shade="#9F8D68"
      line="#7E6B4C"
    />
    <Hills id="t2-bd-bank" y={880} amp={20} waves={2} phase={1.2} bottom={940} top="#A9BC7A" base="#8DA463" line="#6E5A3E" sw={5} />
    {/* Mặt sông */}
    <WaterBand id="t2-bd-water" y0={920} y1={1090} top="#A9C2B4" bottom="#6E9692" ripples={10} />
    {/* Thuyền nhỏ xa */}
    <g transform="translate(760 990) scale(0.5)">
      <path d="M-90 0 L90 0 Q100 -6 106 -24 L-106 -24 Q-100 -6 -90 0 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      <path d="M-40 -24 Q0 -70 40 -24 Z" fill="#C9A24E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    </g>
    {/* Bãi bùn lòng sông lúc triều rút */}
    <defs>
      <linearGradient id="t2-bd-mud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#A89070" />
        <stop offset="1" stopColor="#7E6448" />
      </linearGradient>
    </defs>
    <path d={`M-20 1090 Q270 1068 540 1084 Q810 1100 1100 1078 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="url(#t2-bd-mud)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-20 1100 Q270 1080 540 1096 Q810 1112 1100 1090" fill="none" stroke="#C9B08A" strokeWidth="5" opacity="0.7" />
    <Puddle x={330} y={1160} rx={120} />
    <Puddle x={800} y={1140} rx={90} />
    <Puddle x={560} y={1206} rx={70} />
    <Floor color="#8A7052" line="#765E44" />
    {/* Tiền cảnh: lau sậy hai mép, đá cuội, vũng nước */}
    <Reeds x={60} y={1260} s={1.25} />
    <Reeds x={150} y={1270} s={0.9} flip />
    <Reeds x={1010} y={1260} s={1.2} flip />
    <Reeds x={930} y={1280} s={0.8} />
    <ellipse cx="200" cy="1500" rx="130" ry="18" fill="#A9C4BC" stroke={INK} strokeWidth="4" opacity="0.8" />
    {[
      [120, 1420, 26],
      [900, 1460, 32],
      [950, 1440, 18],
    ].map(([x, y, r]) => (
      <ellipse key={x} cx={x} cy={y} rx={r} ry={r * 0.6} fill="url(#w-clay)" stroke={INK} strokeWidth="4" />
    ))}
  </>
);

/** Cánh đồng: núi xa, đồi, nhà tranh xa, ruộng lúa có bờ, bụi tre bên trái, cây to bên phải. */
const Field: React.FC = () => (
  <>
    <WarmSky id="t2-cmn-sky" h={FLOOR} sun={[640, 420]} />
    <VCloud x={220} y={330} s={1.1} />
    <VCloud x={860} y={260} s={0.7} />
    <FarMountains
      peaks={[
        [200, 700, 280],
        [620, 740, 260],
        [960, 680, 260],
      ]}
      foot={920}
      color="#D8C29C"
      shade="#BFA57E"
      line="#9A8262"
    />
    <Hills id="t2-cmn-h1" y={880} amp={50} waves={2} phase={0.3} top="#B9CC86" base="#93AE64" line="#6E5A3E" sw={5} />
    <DistantTrees y={930} color="#9DB57A" line="#7A6A4A" />
    <ThatchHut x={600} y={985} s={0.3} />
    <Tree x={420} y={990} s={0.3} tone="far" />
    {/* Ruộng lúa xanh, bờ ruộng cong */}
    <defs>
      <linearGradient id="t2-cmn-paddy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B7CF7E" />
        <stop offset="1" stopColor="#8DAE58" />
      </linearGradient>
    </defs>
    <path d={`M-20 1000 Q540 970 1100 1000 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="url(#t2-cmn-paddy)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {[1050, 1110, 1180].map((y, i) => (
      <path key={y} d={`M-20 ${y} Q540 ${y - 26} 1100 ${y}`} fill="none" stroke="#C9A877" strokeWidth={8 + i * 3} />
    ))}
    {[1028, 1082, 1148, 1218].map((y, r) =>
      Array.from({ length: 14 }, (_, i) => {
        const x = 30 + i * 78 + (r % 2) * 38;
        const h = 10 + r * 4;
        return <path key={`${r}-${i}`} d={`M${x - h / 2} ${y} l${h / 2} ${-h} l${h / 2} ${h}`} fill="none" stroke="#6E9446" strokeWidth={3 + r} strokeLinecap="round" />;
      }),
    )}
    <Floor color="#9DB86A" line="#86A158" />
    {/* Bụi tre bên trái, cây to bên phải (ở mép, không che giữa) */}
    <Bamboo x={70} y={1250} s={0.85} />
    <Tree x={990} y={1250} s={1} flip />
    <GrassTuft x={260} y={1300} s={1.1} />
    <GrassTuft x={760} y={1330} s={1.2} flip />
    <GrassTuft x={120} y={1480} s={1.4} />
    <GrassTuft x={980} y={1520} s={1.5} flip />
  </>
);

/** Một vòng luỹ đất: mặt luỹ phủ cỏ, sườn đất có gradient. */
const Rampart: React.FC<{ y: number; bottom: number; id: string; top: string; base: string }> = ({ y, bottom, id, top, base }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={base} />
      </linearGradient>
    </defs>
    <path d={`M-20 ${y} Q540 ${y - 80} 1100 ${y} L1100 ${bottom} L-20 ${bottom} Z`} fill={`url(#${id})`} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d={`M-20 ${y + 2} Q540 ${y - 78} 1100 ${y + 2} L1100 ${y + 22} Q540 ${y - 58} -20 ${y + 22} Z`} fill="#8DAA5E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
  </>
);

/** Thành Cổ Loa: vòng luỹ đất, cổng thành có lầu hai tầng mái ngói, cờ đỏ; tre hai mép. */
const CoLoa: React.FC = () => (
  <>
    <WarmSky id="t2-adv-sky" h={FLOOR} sun={[860, 360]} />
    <VCloud x={240} y={300} s={1} />
    <FarMountains
      peaks={[
        [160, 690, 260],
        [880, 660, 300],
      ]}
      foot={860}
      color="#D8C29C"
      shade="#BFA57E"
      line="#9A8262"
      opacity={0.9}
    />
    <Rampart y={850} bottom={1000} id="t2-adv-r1" top="#CDB088" base="#B0916A" />
    <Rampart y={930} bottom={1080} id="t2-adv-r2" top="#C2A27A" base="#9E7F5A" />
    {/* Cổng thành xây đá ong */}
    <SoftShadow cx={540} cy={1070} rx={220} ry={20} />
    <rect x="400" y="790" width="280" height="280" fill="#D7C29A" stroke={INK} strokeWidth="8" />
    {[830, 870, 910, 950, 990, 1030].map((y, i) => (
      <g key={y}>
        <line x1="400" y1={y} x2="680" y2={y} stroke="#A8916A" strokeWidth="4" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <line key={k} x1={420 + k * 50 + (i % 2) * 25} y1={y} x2={420 + k * 50 + (i % 2) * 25} y2={y - 40} stroke="#A8916A" strokeWidth="3" />
        ))}
      </g>
    ))}
    <rect x="640" y="790" width="40" height="280" fill="#5E3A20" opacity="0.22" />
    <path d="M470 1070 L470 920 Q540 860 610 920 L610 1070 Z" fill="#3A2416" stroke={INK} strokeWidth="7" />
    <path d="M482 1066 L482 926 Q540 876 598 926" fill="none" stroke="#E9A94A" strokeWidth="4" opacity="0.5" />
    {/* Lầu */}
    <rect x="440" y="680" width="200" height="110" fill="#8A2C22" stroke={INK} strokeWidth="7" />
    {[456, 624].map((x) => (
      <rect key={x} x={x - 8} y="690" width="16" height="100" fill="url(#w-lacquer)" stroke={INK} strokeWidth="4" />
    ))}
    <rect x="438" y="694" width="204" height="66" rx="6" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" />
    <rect x="448" y="704" width="184" height="46" rx="3" fill="none" stroke="url(#w-brass)" strokeWidth="4" />
    <text x="540" y="743" textAnchor="middle" fontSize="44" fill="#FBE3A0" {...TEXT}>
      CỔ LOA
    </text>
    <g transform="translate(540 800) scale(0.36)">
      <TileRoof w={900} top={640} h={150} />
    </g>
    <g transform="translate(540 690) scale(0.26)">
      <TileRoof w={900} top={540} h={190} />
    </g>
    {/* Cờ trên lầu */}
    {[420, 660].map((x) => (
      <g key={x}>
        <line x1={x} y1="790" x2={x} y2="520" stroke={INK} strokeWidth="10" strokeLinecap="round" />
        <line x1={x} y1="790" x2={x} y2="520" stroke="#8A5530" strokeWidth="5" strokeLinecap="round" />
        <path d={`M${x} 524 Q${x + 50} 510 ${x + 100} 540 Q${x + 60} 556 ${x} 580 Z`} fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx={x} cy="516" r="8" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
      </g>
    ))}
    {/* Vòng luỹ gần nhất */}
    <Rampart y={1080} bottom={FLOOR + 10} id="t2-adv-r3" top="#C9AE84" base="#A88B60" />
    <Floor color="#B4966A" line="#9E8058" />
    {/* Tiền cảnh: tre hai mép, cỏ */}
    <Bamboo x={20} y={1260} s={0.9} />
    <Bamboo x={1060} y={1260} s={0.8} flip />
    <GrassTuft x={200} y={1320} s={1.1} />
    <GrassTuft x={880} y={1340} s={1.2} flip />
    <GrassTuft x={140} y={1520} s={1.4} flip />
  </>
);

export const scenes: Record<SceneTuan2, React.FC> = {
  "bd-river": BachDang,
  "cmn-field": Field,
  "adv-citadel": CoLoa,
};
