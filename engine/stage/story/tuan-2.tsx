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
import { FLOOR, Floor, INK, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";

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
    look: { skin: "#E9B98C", sleeve: "#8E2B22", legs: "#3A2A1E", shoe: "#1E1B2E", arm: 26 },
    headY: 112,
    Head: ({ expr, talk, blink }) => {
      const skin = "#E9B98C";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 196, browY: 166, mouthY: 250, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="94" y="110" width="172" height="180" rx="74" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Tóc + khăn chít đầu đỏ thắt nút trước trán */}
          <path d="M88 164 C80 80 280 80 272 164 Q230 146 180 148 Q130 146 88 164 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <path d="M84 150 C84 84 276 84 276 150 Q180 120 84 150 Z" fill="#B0302A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M96 128 Q180 102 264 128" fill="none" stroke="#7A1E18" strokeWidth="6" />
          <path d="M162 96 Q150 60 176 62 Q200 60 196 96 Z" fill="#B0302A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M88 150 Q60 170 58 214 M90 146 Q50 150 40 188" fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
          <path d="M88 150 Q60 170 58 214 M90 146 Q50 150 40 188" fill="none" stroke="#B0302A" strokeWidth="10" strokeLinecap="round" />
          {/* Râu quai nón ngắn */}
          <path d="M100 222 Q104 300 180 304 Q256 300 260 222 Q244 270 214 272 Q180 262 146 272 Q116 270 100 222 Z" fill="#1E1B2E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
          <path d="M146 234 Q180 220 214 234" fill="none" stroke="#1E1B2E" strokeWidth="9" strokeLinecap="round" />
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
        <rect x="110" y="420" width="140" height="20" rx="6" fill="#1E1B2E" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },

  "luu-hoang-thao": {
    look: { skin: "#F3D3B0", sleeve: "#2E2A3A", legs: "#5A4E6E", shoe: "#1E1B2E" },
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
    look: { skin: "#F3D3B0", sleeve: "#F2EBDD", legs: "#F2EBDD", shoe: "#1E1B2E", arm: 28 },
    headY: 70,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F3D3B0";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 200, browY: 172, mouthY: 246, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="96" y="120" width="168" height="170" rx="72" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Mũ cao đen của người học trò / nhạc sư */}
          <path d="M120 150 L126 40 Q180 26 234 40 L240 150 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M86 160 Q180 124 274 160 L268 136 Q180 104 92 136 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
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
        <path d="M146 302 L180 352 L214 302" fill="none" stroke="#1E1B2E" strokeWidth="12" strokeLinecap="round" />
        <rect x="106" y="404" width="148" height="22" rx="8" fill="#1E1B2E" stroke={INK} strokeWidth="6" />
        <path d="M200 426 L208 470 M214 426 L226 466" stroke="#1E1B2E" strokeWidth="8" strokeLinecap="round" />
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
    look: { skin: "#F0CBA2", sleeve: "#E8C547", legs: "#F2EBDD", shoe: "#1E1B2E", arm: 26 },
    headY: 104,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F0CBA2";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 196, browY: 168, mouthY: 244, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="96" y="114" width="168" height="174" rx="72" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Mũ miện: thân mũ, tấm phẳng trên đỉnh, tua ngọc rủ trước sau */}
          <path d="M98 158 Q96 92 180 88 Q264 92 262 158 Q180 134 98 158 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="66" y="64" width="228" height="26" rx="6" fill="#1E1B2E" stroke={INK} strokeWidth="6" />
          <path d="M90 110 Q180 92 270 110" fill="none" stroke="#E8C547" strokeWidth="8" />
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
          <path d="M146 262 Q180 252 214 262 Q206 320 180 356 Q154 320 146 262 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M178 228 Q148 232 128 252 M182 228 Q212 232 232 252" fill="none" stroke="#1E1B2E" strokeWidth="9" strokeLinecap="round" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Áo bào vàng viền sẫm, đai ngọc */}
        <path d="M114 312 Q180 292 246 312 L268 482 Q180 494 92 482 Z" fill="#E8C547" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
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
    look: { skin: "#F6D5B5", sleeve: "#2B3A55", legs: "#2B3A55", shoe: "#1E1B2E" },
    headY: 120,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F6D5B5";
      const g: FaceGeo = { eyeL: 152, eyeR: 208, eyeY: 202, browY: 172, mouthY: 252, browColor: INK };
      return (
        <g>
          <Ears skin={skin} />
          <rect x="96" y="116" width="168" height="174" rx="76" fill={skin} stroke={INK} strokeWidth="7" />
          {/* Búi tóc cao cài trâm */}
          <ellipse cx="180" cy="86" rx="34" ry="30" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <line x1="122" y1="80" x2="244" y2="92" stroke={INK} strokeWidth="14" strokeLinecap="round" />
          <line x1="122" y1="80" x2="244" y2="92" stroke="#E8E2D0" strokeWidth="7" strokeLinecap="round" />
          <path d="M88 176 C78 92 282 92 272 176 Q260 140 220 134 Q180 150 140 134 Q100 140 88 176 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          {/* Lọn tóc mai rủ */}
          <path d="M224 140 Q246 170 236 200" fill="none" stroke="#1E1B2E" strokeWidth="8" strokeLinecap="round" />
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
    <rect x="-14" y={-h + 40} width="28" height={h - 40} fill="#8B5A2B" stroke={INK} strokeWidth="6" />
    <path d={`M-14 ${-h + 56} L14 ${-h + 70} M-14 ${-h / 2} L14 ${-h / 2 + 12}`} stroke="#5C3A1E" strokeWidth="4" />
    <path d={`M-18 ${-h + 44} L18 ${-h + 44} L0 ${-h - 6} Z`} fill="#2E3038" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d={`M-6 ${-h + 36} L0 ${-h + 6}`} stroke="#C9CED6" strokeWidth="5" strokeLinecap="round" />
  </g>
);

/** Thân thuyền chiến Nam Hán (mũi bên trái): mạn gỗ sẫm, khiên tròn dọc mạn. */
const Warship: React.FC = () => (
  <g transform="translate(0 90)">
    <path
      d="M-300 -250 L300 -250 Q320 -258 326 -290 L340 -284 Q340 -190 290 -150 L-250 -150 Q-310 -180 -340 -280 Q-370 -320 -350 -350 L-332 -340 Q-330 -280 -300 -250 Z"
      fill="#5A3A22"
      stroke={INK}
      strokeWidth="9"
      strokeLinejoin="round"
    />
    <path d="M-290 -214 L300 -214 M-270 -182 L290 -182" stroke="#3E2716" strokeWidth="6" />
    <rect x="-310" y="-268" width="636" height="22" rx="8" fill="#8C6A44" stroke={INK} strokeWidth="6" />
    {[-230, -150, 150, 230].map((x) => (
      <g key={x}>
        <circle cx={x} cy="-226" r="24" fill="#D9D2BE" stroke={INK} strokeWidth="6" />
        <circle cx={x} cy="-226" r="7" fill={INK} />
      </g>
    ))}
    {/* Mắt thuyền ở mũi */}
    <circle cx="-310" cy="-262" r="13" fill="#F2F2F2" stroke={INK} strokeWidth="5" />
    <circle cx="-314" cy="-262" r="5" fill={INK} />
  </g>
);

const TEXT = { fontFamily: TEXT_FONT, fontWeight: 900 } as const;

export const props: Record<PropTuan2, PropDef> = {
  // ------------------------------------------------ Bạch Đằng 938
  "bd-stakes": {
    mode: "upright",
    draw: () => (
      <g>
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
        <path d="M-230 4 Q-120 -26 0 -16 Q120 -26 230 4 Z" fill="#6B5C46" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      </g>
    ),
  },
  "bd-stake": {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-12" y="-20" width="24" height="200" rx="6" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
        <path d="M-16 176 L16 176 L0 226 Z" fill="#2E3038" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-4 184 L0 210" stroke="#C9CED6" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "bd-tide": {
    mode: "upright",
    draw: () => (
      <g>
        <path d={`${wave(-1400, 1400, -80, 120, 16)} L1400 900 L-1400 900 Z`} fill="#4F7FA8" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Mũi cọc lờ mờ dưới nước, khớp bãi cọc đặt ở x 0.6 và 0.86 khi nước đặt ở x 0.5 */}
        {[108, 389].map((cx) =>
          [-150, -80, -10, 60, 140].map((dx, i) => (
            <path key={cx + dx} d={`M${cx + dx - 14} ${-14 + (i % 2) * 8} L${cx + dx} ${-58 + (i % 2) * 8} L${cx + dx + 14} ${-14 + (i % 2) * 8} Z`} fill="#1E2A3A" opacity="0.35" />
          )),
        )}
        {[-40, 0].map((y, i) => (
          <path key={y} d={wave(-1340 + i * 60, 1400, y, 160, 14)} fill="none" stroke="#9CC2E0" strokeWidth="7" strokeLinecap="round" opacity={0.8 - i * 0.2} />
        ))}
      </g>
    ),
  },
  "bd-boat": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 90)">
        {/* Cờ đuôi nheo ở đuôi thuyền */}
        <line x1="-170" y1="-200" x2="-170" y2="-380" stroke={INK} strokeWidth="8" />
        <path d="M-170 -380 L-90 -360 L-170 -334 Z" fill="#B0302A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path
          d="M-200 -226 L180 -226 Q214 -236 226 -284 L244 -278 Q236 -176 170 -150 L-160 -150 Q-200 -170 -200 -226 Z"
          fill="#B08A5A"
          stroke={INK}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path d="M-186 -196 L196 -196 M-170 -170 L180 -170" stroke="#7A5A34" strokeWidth="5" />
        <rect x="-206" y="-238" width="410" height="18" rx="7" fill="#E3D2B0" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "bd-warship": { mode: "upright", draw: () => <Warship /> },
  "bd-sail": {
    mode: "upright",
    draw: () => (
      <g>
        <line x1="170" y1="-100" x2="170" y2="-880" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="170" y1="-100" x2="170" y2="-880" stroke="#8C6A44" strokeWidth="9" strokeLinecap="round" />
        <path d="M60 -800 L270 -780 L290 -330 L40 -350 Z" fill="#E3D6B8" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[-700, -600, -500, -410].map((y) => (
          <line key={y} x1="50" y1={y} x2="282" y2={y + 18} stroke="#5A3A22" strokeWidth="7" />
        ))}
        <path d="M170 -878 L10 -866 L20 -812 L170 -824 Z" fill="#1E1B2E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <text x="92" y="-834" textAnchor="middle" fontSize="30" fill="#F2F2F2" {...TEXT}>
          NAM HÁN
        </text>
      </g>
    ),
  },
  "bd-wreck": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Cột buồm gãy đổ nghiêng */}
        <line x1="150" y1="-150" x2="330" y2="-420" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="150" y1="-150" x2="330" y2="-420" stroke="#8C6A44" strokeWidth="9" strokeLinecap="round" />
        <path d="M300 -470 L400 -330 L350 -300 L250 -430 Z" fill="#E3D6B8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Nửa thuyền trái, chúc mũi */}
        <g transform="rotate(-9 -100 -60)">
          <path d="M-330 -230 L60 -230 L80 -170 L50 -120 L70 -60 L-230 -60 Q-300 -100 -330 -230 Z" fill="#5A3A22" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <rect x="-336" y="-246" width="400" height="20" rx="8" fill="#8C6A44" stroke={INK} strokeWidth="6" />
          <path d="M-310 -180 L60 -180 M-280 -120 L60 -120" stroke="#3E2716" strokeWidth="6" />
        </g>
        {/* Nửa thuyền phải, chổng đuôi */}
        <g transform="rotate(12 200 -60)">
          <path d="M120 -230 L330 -230 Q350 -150 300 -60 L130 -60 L104 -120 L140 -170 Z" fill="#5A3A22" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <rect x="114" y="-246" width="230" height="20" rx="8" fill="#8C6A44" stroke={INK} strokeWidth="6" />
          <path d="M120 -180 L330 -180 M128 -120 L320 -120" stroke="#3E2716" strokeWidth="6" />
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
        <path d="M-40 -330 l40 -14 l6 16 l-40 14 Z M100 -360 l34 10 l-4 16 l-34 -10 Z" fill="#8C6A44" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-90 -300 l-20 -26 M70 -320 l10 -30 M160 -300 l26 -20" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        {/* Bùn lòng sông */}
        <path d="M-380 10 Q-200 -50 0 -36 Q200 -50 400 10 Z" fill="#6B5C46" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      </g>
    ),
  },

  // ------------------------------------------------ Công Minh Nghi gảy đàn cho trâu
  "cmn-qin": {
    mode: "upright",
    draw: () => (
      <g transform="rotate(-10 0 -70)">
        <path d="M-180 -96 Q-186 -60 -170 -44 L170 -44 Q190 -60 182 -96 Z" fill="#5C3A1E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[-84, -74, -64, -54].map((y) => (
          <line key={y} x1="-160" y1={y} x2="166" y2={y} stroke="#F2EBDD" strokeWidth="3" />
        ))}
        <rect x="-176" y="-100" width="22" height="58" rx="4" fill="#8B5A2B" stroke={INK} strokeWidth="5" />
        <rect x="150" y="-100" width="22" height="58" rx="4" fill="#8B5A2B" stroke={INK} strokeWidth="5" />
        {[-100, -20, 60].map((x) => (
          <circle key={x} cx={x} cy="-92" r="5" fill="#F2F2F2" stroke={INK} strokeWidth="2" />
        ))}
      </g>
    ),
  },
  "cmn-notes": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -700)">
        <path d="M-200 80 Q-100 -20 0 40 Q100 100 200 0" fill="none" stroke={INK} strokeWidth="5" strokeDasharray="14 14" strokeLinecap="round" />
        {[
          [-150, 20, 1],
          [-30, -40, 2],
          [110, 10, 1],
          [40, -150, 2],
        ].map(([x, y, n]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(-12)`}>
            <ellipse cx="0" cy="0" rx="22" ry="16" fill={INK} />
            <line x1="18" y1="-4" x2="18" y2="-80" stroke={INK} strokeWidth="7" strokeLinecap="round" />
            {n === 2 ? (
              <>
                <ellipse cx="62" cy="10" rx="22" ry="16" fill={INK} />
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
        <path d="M-60 90 L-100 170 L0 96 Z" fill="#FFFFFF" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <ellipse cx="0" cy="0" rx="210" ry="110" fill="#FFFFFF" stroke={INK} strokeWidth="8" />
        <path d="M-60 92 L-14 92" stroke="#FFFFFF" strokeWidth="12" />
        {/* Con muỗi */}
        <g transform="translate(-120 -10)">
          <ellipse cx="-14" cy="-26" rx="22" ry="14" fill="#DCE8F0" stroke={INK} strokeWidth="4" transform="rotate(-30 -14 -26)" />
          <ellipse cx="14" cy="-28" rx="22" ry="14" fill="#DCE8F0" stroke={INK} strokeWidth="4" transform="rotate(30 14 -28)" />
          <ellipse cx="0" cy="0" rx="30" ry="12" fill={INK} />
          <circle cx="34" cy="-4" r="11" fill={INK} />
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
        <path d="M-60 90 L-100 170 L0 96 Z" fill="#FFFFFF" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <ellipse cx="0" cy="0" rx="220" ry="110" fill="#FFFFFF" stroke={INK} strokeWidth="8" />
        <path d="M-60 92 L-14 92" stroke="#FFFFFF" strokeWidth="12" />
        {/* Đầu con nghé */}
        <g transform="translate(-130 0)">
          <path d="M-40 -30 L-70 -20 L-40 -6 Z M40 -30 L70 -20 L40 -6 Z" fill="#8E857C" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="0" cy="-6" rx="44" ry="50" fill="#8E857C" stroke={INK} strokeWidth="5" />
          <ellipse cx="0" cy="24" rx="30" ry="20" fill="#E3D6C4" stroke={INK} strokeWidth="4" />
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
        {[-30, -16, -4, 8, 20, 32].map((x, i) => (
          <path
            key={x}
            d={`M${x / 3} 0 Q${x} -50 ${x * 1.8} ${-90 - (i % 2) * 20}`}
            fill="none"
            stroke={INK}
            strokeWidth="14"
            strokeLinecap="round"
          />
        ))}
        {[-30, -16, -4, 8, 20, 32].map((x, i) => (
          <path key={x} d={`M${x / 3} 0 Q${x} -50 ${x * 1.8} ${-90 - (i % 2) * 20}`} fill="none" stroke="#7FAE55" strokeWidth="7" strokeLinecap="round" />
        ))}
      </g>
    ),
  },

  // ------------------------------------------------ An Dương Vương, nỏ thần
  "adv-mi-chau": {
    mode: "upright",
    draw: () => (
      <g transform="scale(1.05)">
        {/* Tóc dài sau lưng */}
        <path d="M-56 -400 Q-80 -300 -62 -230 L10 -230 L10 -400 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Váy dài sáng màu, khăn choàng */}
        <path d="M-50 -270 Q0 -286 50 -270 L84 -10 Q0 6 -84 -10 Z" fill="#F4D6DC" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-60 -6 Q0 8 60 -6" fill="none" stroke="#B05A6E" strokeWidth="8" />
        <rect x="-54" y="-200" width="108" height="18" rx="6" fill="#B05A6E" stroke={INK} strokeWidth="5" />
        <path d="M-10 -184 L-20 -80 M10 -184 L24 -90" stroke="#B05A6E" strokeWidth="8" strokeLinecap="round" />
        {/* Hai tay chắp trước bụng */}
        <path d="M-44 -258 Q-60 -200 -10 -170 M44 -258 Q60 -200 10 -170" fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
        <path d="M-44 -258 Q-60 -200 -10 -170 M44 -258 Q60 -200 10 -170" fill="none" stroke="#F4D6DC" strokeWidth="16" strokeLinecap="round" />
        <circle cx="0" cy="-168" r="16" fill="#F6D5B5" stroke={INK} strokeWidth="5" />
        {/* Đầu */}
        <circle cx="4" cy="-336" r="64" fill="#F6D5B5" stroke={INK} strokeWidth="7" />
        <path d="M-60 -330 Q-66 -404 4 -406 Q70 -404 68 -350 Q40 -380 4 -370 Q-30 -380 -60 -330 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="4" cy="-420" rx="34" ry="24" fill="#1E1B2E" stroke={INK} strokeWidth="6" />
        <path d="M-26 -430 L36 -416" stroke="#E8C547" strokeWidth="8" strokeLinecap="round" />
        <circle cx="40" cy="-430" r="9" fill="#E8C547" stroke={INK} strokeWidth="4" />
        <circle cx="-14" cy="-336" r="7" fill={INK} />
        <circle cx="26" cy="-336" r="7" fill={INK} />
        <ellipse cx="-24" cy="-312" rx="9" ry="5" fill="#FF8FA3" opacity="0.7" />
        <ellipse cx="36" cy="-312" rx="9" ry="5" fill="#FF8FA3" opacity="0.7" />
        <path d="M-6 -306 Q6 -296 18 -306" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "adv-crossbow": {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-14" y="-30" width="28" height="200" rx="8" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
        <path d="M-120 110 Q-60 170 0 166 Q60 170 120 110" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M-120 110 Q-60 170 0 166 Q60 170 120 110" fill="none" stroke="#C9A24E" strokeWidth="10" strokeLinecap="round" />
        <path d="M-120 110 L0 40 L120 110" fill="none" stroke={INK} strokeWidth="4" />
        <path d="M-10 20 L0 40 L10 20 Z" fill="#E8C547" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <line x1="0" y1="40" x2="0" y2="200" stroke={INK} strokeWidth="6" />
        <path d="M-12 196 L0 224 L12 196 Z" fill="#C9CED6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ),
  },
  "adv-crossbow-rack": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Hào quang nỏ thần */}
        {[-60, -30, 0, 30, 60].map((a) => (
          <line key={a} x1="0" y1="-330" x2={Math.sin((a * Math.PI) / 180) * 190} y2={-330 - Math.cos((a * Math.PI) / 180) * 190} stroke="#E8C547" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        ))}
        {/* Giá gỗ */}
        <path d="M-100 0 L-60 -280 M100 0 L60 -280" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M-100 0 L-60 -280 M100 0 L60 -280" stroke="#8B5A2B" strokeWidth="12" strokeLinecap="round" />
        <rect x="-110" y="-292" width="220" height="24" rx="6" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
        {/* Nỏ nằm ngang trên giá */}
        <rect x="-150" y="-322" width="270" height="26" rx="8" fill="#8B5A2B" stroke={INK} strokeWidth="6" />
        <path d="M100 -430 Q160 -370 162 -310 Q160 -250 100 -190" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path d="M100 -430 Q160 -370 162 -310 Q160 -250 100 -190" fill="none" stroke="#C9A24E" strokeWidth="10" strokeLinecap="round" />
        <path d="M100 -430 L-60 -310 L100 -190" fill="none" stroke={INK} strokeWidth="4" />
        <path d="M-80 -296 L-60 -270 L-40 -296 Z" fill="#E8C547" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
    ),
  },
  "adv-trigger": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -10)">
        {/* Hào quang */}
        {[-60, -30, 0, 30, 60].map((a) => (
          <line key={a} x1="0" y1="-70" x2={Math.sin((a * Math.PI) / 180) * 110} y2={-70 - Math.cos((a * Math.PI) / 180) * 110} stroke="#E8C547" strokeWidth="6" strokeLinecap="round" />
        ))}
        {/* Lẫy hình móng rùa vàng: gan bàn chân và ba vuốt cong to */}
        <path d="M-40 0 Q-50 -50 0 -60 Q50 -50 40 0 Z" fill="#E8C547" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[-30, 0, 30].map((x) => (
          <path key={x} d={`M${x - 13} -50 Q${x - 12} -110 ${x + 14} -124 Q${x + 2} -96 ${x + 13} -52 Z`} fill="#F7E7A8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        ))}
        <path d="M-22 -24 Q0 -36 22 -24" fill="none" stroke="#B5892A" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "adv-army": {
    mode: "upright",
    draw: ({ mirrored }) => (
      <g>
        {/* Hàng giáo */}
        {[-230, -110, 10, 90, 210].map((x) => (
          <g key={x}>
            <line x1={x} y1="-150" x2={x + 20} y2="-620" stroke={INK} strokeWidth="9" />
            <path d={`M${x + 12} -610 L${x + 22} -660 L${x + 32} -608 Z`} fill="#C9CED6" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          </g>
        ))}
        {/* Cờ */}
        {[
          [-170, -720],
          [150, -780],
        ].map(([x, y]) => (
          <g key={x}>
            <line x1={x} y1="-200" x2={x} y2={y} stroke={INK} strokeWidth="10" />
            <path d={`M${x} ${y} L${x - 150} ${y + 20} L${x - 150} ${y + 150} L${x} ${y + 130} Z`} fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <Unmirror mirrored={mirrored}>
              <text x={mirrored ? -(x - 75) : x - 75} y={y + 86} textAnchor="middle" fontSize="34" fill="#F2F2F2" {...TEXT}>
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
            <path d={`M${x - 70} 0 L${x - 56} ${y + 70} Q${x} ${y + 50} ${x + 56} ${y + 70} L${x + 70} 0 Z`} fill="#4A4458" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
            <circle cx={x} cy={y} r="46" fill="#F3D3B0" stroke={INK} strokeWidth="6" />
            <path d={`M${x - 54} ${y - 6} Q${x} ${y - 100} ${x + 54} ${y - 6} Z`} fill="#2E2A3A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
            <circle cx={x + 14} cy={y + 6} r="5" fill={INK} />
            <path d={`M${x + 4} ${y - 10} l20 6`} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
      </g>
    ),
  },
};

// ================================================================ phông

/** Sông Bạch Đằng lúc triều rút: núi đá xa, lau sậy hai bờ, lòng sông bùn. */
const BachDang: React.FC = () => (
  <>
    <defs>
      <linearGradient id="bd-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B9D3E8" />
        <stop offset="1" stopColor="#EEF4F8" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#bd-sky)" />
    {/* Núi đá vôi xa */}
    <path
      d="M-20 900 L-20 640 Q30 520 90 640 Q130 470 200 600 Q260 560 300 680 Q360 440 430 620 Q480 700 540 660 Q600 500 670 640 Q720 560 780 690 Q840 430 900 600 Q960 520 1100 640 L1100 900 Z"
      fill="#8F9AA8"
      stroke={INK}
      strokeWidth="8"
      strokeLinejoin="round"
    />
    <path d="M180 620 L200 700 M420 640 L440 740 M880 620 L900 720" stroke="#6F7A88" strokeWidth="6" strokeLinecap="round" />
    {/* Mặt sông xa */}
    <rect x="0" y="880" width="1080" height="210" fill="#6F9CC2" stroke={INK} strokeWidth="6" />
    {[930, 990, 1050].map((y, i) => (
      <path key={y} d={wave(-40 + i * 50, 1100, y, 140, 10)} fill="none" stroke="#CFE2F0" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    ))}
    {/* Bãi bùn lòng sông lúc triều rút */}
    <path d={`M0 1090 Q270 1070 540 1084 Q810 1098 1080 1080 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#8C7B62" stroke={INK} strokeWidth="6" />
    <ellipse cx="300" cy="1170" rx="120" ry="18" fill="#6F9CC2" opacity="0.7" />
    <ellipse cx="820" cy="1150" rx="90" ry="14" fill="#6F9CC2" opacity="0.7" />
    {/* Lau sậy hai bờ */}
    {[20, 50, 80, 110, 990, 1020, 1050].map((x, i) => (
      <g key={x}>
        <path d={`M${x} ${FLOOR} Q${x + 6} 1060 ${x + (i % 2 ? 18 : -12)} ${900 + (i % 3) * 30}`} fill="none" stroke="#5E6B3A" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx={x + (i % 2 ? 18 : -12)} cy={890 + (i % 3) * 30} rx="9" ry="30" fill="#A8925E" stroke={INK} strokeWidth="4" />
      </g>
    ))}
    <Floor color="#7A6A52" line="#6B5C46" />
  </>
);

/** Đồng cỏ: đồi xa, ruộng, cây to bên phải. */
const Field: React.FC = () => (
  <>
    <defs>
      <linearGradient id="cmn-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#A9D6F2" />
        <stop offset="1" stopColor="#E9F6FC" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#cmn-sky)" />
    <ellipse cx="220" cy="380" rx="90" ry="40" fill="#FFFFFF" opacity="0.9" />
    <ellipse cx="290" cy="360" rx="70" ry="40" fill="#FFFFFF" opacity="0.9" />
    {/* Đồi xa */}
    <path d={`M-20 1000 Q160 760 380 900 Q560 740 760 880 Q920 780 1100 900 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="#8DBF6A" stroke={INK} strokeWidth="7" />
    {/* Bờ ruộng */}
    <path d={`M-20 1040 Q540 1000 1100 1040 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="#B7D58A" stroke={INK} strokeWidth="6" />
    {[1090, 1150].map((y) => (
      <path key={y} d={`M-20 ${y} Q540 ${y - 30} 1100 ${y}`} fill="none" stroke="#93B86A" strokeWidth="6" />
    ))}
    {/* Cây to */}
    <path d={`M930 ${FLOOR} Q950 1000 920 820 L1000 820 Q990 1000 1010 ${FLOOR} Z`} fill="#6B4A2E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <ellipse cx="960" cy="640" rx="200" ry="170" fill="#4E7A3A" stroke={INK} strokeWidth="8" />
    <ellipse cx="820" cy="720" rx="110" ry="90" fill="#5E8C3E" stroke={INK} strokeWidth="8" />
    {/* Bụi cỏ */}
    {[70, 420, 640].map((x) => (
      <path key={x} d={`M${x - 30} ${FLOOR} q10 -50 20 0 q10 -60 20 0 q10 -50 20 0`} fill="#5E8C3E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    ))}
    <Floor color="#7FAE55" line="#6E9C48" />
  </>
);

/** Thành Cổ Loa: luỹ đất nhiều vòng, cổng thành có lầu hai tầng mái, cờ. */
const CoLoa: React.FC = () => (
  <>
    <defs>
      <linearGradient id="adv-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#C7DCEB" />
        <stop offset="1" stopColor="#F4F1E6" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#adv-sky)" />
    {/* Ba vòng luỹ đất xa dần */}
    <path d="M-20 820 Q540 740 1100 820 L1100 1000 L-20 1000 Z" fill="#B59A6C" stroke={INK} strokeWidth="7" />
    <path d="M-20 900 Q540 830 1100 900 L1100 1080 L-20 1080 Z" fill="#9C8058" stroke={INK} strokeWidth="7" />
    <path d={`M-20 1000 Q540 940 1100 1000 L1100 ${FLOOR} L-20 ${FLOOR} Z`} fill="#BFA474" stroke={INK} strokeWidth="7" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M-20 ${830 + i * 85} Q540 ${752 + i * 85} 1100 ${830 + i * 85}`} fill="none" stroke="#6E8A4A" strokeWidth="10" />
    ))}
    {/* Cổng thành và lầu */}
    <rect x="400" y="760" width="280" height="300" fill="#C9B48A" stroke={INK} strokeWidth="8" />
    {[800, 860, 920, 980].map((y) => (
      <line key={y} x1="400" y1={y} x2="680" y2={y} stroke="#A8916A" strokeWidth="5" />
    ))}
    <path d="M470 1060 L470 900 Q540 840 610 900 L610 1060 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
    <rect x="430" y="640" width="220" height="110" fill="#8E3B2F" stroke={INK} strokeWidth="7" />
    <path d="M370 680 Q540 600 710 680 L680 650 Q540 560 400 650 Z" fill="#3E2A20" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M390 770 Q540 700 690 770 L664 742 Q540 676 416 742 Z" fill="#3E2A20" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <rect x="465" y="680" width="150" height="50" fill="#F4F1E6" stroke={INK} strokeWidth="5" />
    <text x="540" y="716" textAnchor="middle" fontSize="30" fill={INK} {...TEXT}>
      CỔ LOA
    </text>
    {/* Cờ trên lầu */}
    {[400, 680].map((x) => (
      <g key={x}>
        <line x1={x} y1="660" x2={x} y2="480" stroke={INK} strokeWidth="8" />
        <path d={`M${x} 480 L${x + 90} 500 L${x} 540 Z`} fill="#B0302A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
    ))}
    <Floor color="#A88B5E" line="#957A50" />
  </>
);

export const scenes: Record<SceneTuan2, React.FC> = {
  "bd-river": BachDang,
  "cmn-field": Field,
  "adv-citadel": CoLoa,
};
