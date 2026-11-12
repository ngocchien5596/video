/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 3 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-3.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 */
import type React from "react";
import type { Expr } from "../../lib/stage-types.ts";
import type { PropTuan3, RoleTuan3, SceneTuan3 } from "../../lib/story/tuan-3.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, INK, Lines, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";

type HeadProps = { expr: Expr; talk: number; blink: boolean };

/** Mắt + mày + miệng theo toạ độ cho trước. */
const Face: React.FC<HeadProps & { g: FaceGeo; big?: boolean; lip?: string }> = ({ expr, talk, blink, g, big = false, lip = "#8B1E24" }) => (
  <>
    <Brows expr={expr} g={g} />
    <Eyes expr={expr} g={g} blink={blink} big={big} />
    <Mouth expr={expr} y={g.mouthY} talk={talk} color={lip} />
  </>
);

/** Tai người hai bên + khuôn mặt tròn. */
const PlainHead: React.FC<{ skin: string; rx?: number }> = ({ skin, rx = 74 }) => (
  <>
    <ellipse cx="92" cy="208" rx="15" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
    <ellipse cx="268" cy="208" rx="15" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
    <rect x="92" y="112" width="176" height="178" rx={rx} fill={skin} stroke={INK} strokeWidth="7" />
  </>
);

// ================================================================ vai

export const roles: Record<RoleTuan3, Role> = {
  // ------------------------------------------------ Ve và Kiến
  "ve-kien-ve": {
    look: { skin: "#DCE6CB", sleeve: "#C3D1AB", legs: "#B3C398", shoe: "#5E6E48", arm: 18 },
    headY: 100,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 122, eyeR: 238, eyeY: 176, browY: 128, mouthY: 254, browColor: INK };
      return (
        <g>
          {/* Râu ngắn */}
          <path d="M160 122 Q146 76 118 66 M200 122 Q214 76 242 66" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="180" cy="210" rx="96" ry="86" fill="#DCE6CB" stroke={INK} strokeWidth="7" />
          {/* Vằn trên trán */}
          <path d="M150 140 Q180 128 210 140 M156 160 Q180 150 204 160" fill="none" stroke="#8FA36F" strokeWidth="6" strokeLinecap="round" />
          {/* Hai mắt lồi to */}
          <circle cx={g.eyeL} cy={g.eyeY} r="36" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
          <circle cx={g.eyeR} cy={g.eyeY} r="36" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
          <Face {...p} g={g} big />
          <ellipse cx="128" cy="236" rx="11" ry="7" fill="#9FB27E" />
          <ellipse cx="232" cy="236" rx="11" ry="7" fill="#9FB27E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Cánh mỏng trong suốt sau lưng */}
        <path d="M134 318 Q40 330 6 470 Q70 470 140 380 Z" fill="#FFFFFF" fillOpacity="0.75" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M134 330 Q70 380 30 456 M120 350 Q90 420 60 466" fill="none" stroke="#8FA36F" strokeWidth="4" />
        <path d="M144 316 Q76 300 36 400 Q90 404 150 350 Z" fill="#FFFFFF" fillOpacity="0.75" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Thân có đốt */}
        <path d="M118 312 Q180 292 242 312 L246 440 Q180 486 114 440 Z" fill="#B3C398" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[352, 386, 420].map((y) => (
          <path key={y} d={`M${122} ${y} Q180 ${y + 14} ${238} ${y}`} fill="none" stroke="#5E6E48" strokeWidth="6" strokeLinecap="round" />
        ))}
      </g>
    ),
  },
  "ve-kien-kien": {
    look: { skin: "#5A2E1E", sleeve: "#5A2E1E", legs: "#4A2418", shoe: "#2A1510", arm: 16 },
    headY: 112,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 154, eyeR: 208, eyeY: 206, browY: 176, mouthY: 252, browColor: INK };
      return (
        <g>
          {/* Hai râu cong có chấm */}
          <path d="M150 128 Q126 56 78 62 M210 128 Q234 56 282 62" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
          <circle cx="78" cy="62" r="14" fill="#5A2E1E" stroke={INK} strokeWidth="6" />
          <circle cx="282" cy="62" r="14" fill="#5A2E1E" stroke={INK} strokeWidth="6" />
          <ellipse cx="180" cy="204" rx="94" ry="92" fill="#5A2E1E" stroke={INK} strokeWidth="7" />
          <path d="M120 150 Q150 128 186 130" fill="none" stroke="#8A4B33" strokeWidth="8" strokeLinecap="round" />
          {/* Mặt sáng để thấy mắt */}
          <ellipse cx="182" cy="222" rx="68" ry="60" fill="#E2B48A" stroke={INK} strokeWidth="6" />
          <Face {...p} g={g} big />
          {/* Hàm kiến */}
          <path d="M162 280 Q170 298 180 290 Q190 298 198 280" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Bụng kiến to phía sau */}
        <ellipse cx="96" cy="430" rx="74" ry="56" fill="#4A2418" stroke={INK} strokeWidth="8" />
        <path d="M60 404 Q72 430 60 458 M92 380 Q106 430 92 482" fill="none" stroke="#7A3F28" strokeWidth="6" strokeLinecap="round" />
        {/* Ngực */}
        <ellipse cx="184" cy="384" rx="64" ry="86" fill="#5A2E1E" stroke={INK} strokeWidth="8" />
        <path d="M150 330 Q184 316 216 330" fill="none" stroke="#8A4B33" strokeWidth="7" strokeLinecap="round" />
        <rect x="128" y="428" width="112" height="22" rx="8" fill="#2A1510" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },

  // ------------------------------------------------ Mai An Tiêm
  "an-tiem": {
    look: { skin: "#E0A877", sleeve: "#EDE3CC", legs: "#3A3030", shoe: "#E0A877", arm: 26 },
    headY: 110,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 202, browY: 174, mouthY: 254, browColor: INK };
      return (
        <g>
          <PlainHead skin="#E0A877" />
          {/* Tóc ngắn */}
          <path d="M86 166 C78 82 282 82 274 166 Q236 138 180 142 Q124 138 86 166 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Khăn sáng buộc ngang trán, nút sau gáy */}
          <path d="M86 156 Q180 128 274 156" fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
          <path d="M86 156 Q180 128 274 156" fill="none" stroke="#F2EBDD" strokeWidth="16" strokeLinecap="round" />
          <path d="M120 146 l10 14 M160 138 l10 14 M200 138 l10 14 M240 146 l10 14" stroke="#7A6A55" strokeWidth="5" strokeLinecap="round" />
          <path d="M88 158 L46 140 L58 176 Z M88 162 L50 200 L82 196 Z" fill="#F2EBDD" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Face {...p} g={g} lip="#B03A2E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M120 420 L240 420 L248 470 L112 470 Z" fill="#3A3030" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M114 312 Q180 292 246 312 L242 432 L118 432 Z" fill="#EDE3CC" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M180 304 L180 430" stroke="#B8AA8C" strokeWidth="6" />
        {[340, 372, 404].map((y) => (
          <circle key={y} cx="192" cy={y} r="5" fill="#7A6A55" />
        ))}
        <rect x="114" y="414" width="132" height="20" rx="6" fill="#7A6A55" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
  "an-tiem-vua-hung": {
    look: { skin: "#F3CFA6", sleeve: "#3B2A4A", legs: "#3B2A4A", shoe: "#1E1B2E" },
    headY: 40,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 200, browY: 172, mouthY: 248, browColor: INK };
      return (
        <g>
          {/* Mũ lông chim cao */}
          {[-56, -28, 0, 28, 56].map((dx, i) => (
            <path
              key={dx}
              d={`M${180 + dx * 0.9} 140 Q${180 + dx * 1.6 - 22} ${70 - (i % 2) * 10} ${180 + dx * 1.9} ${12 + Math.abs(dx) * 0.6} Q${180 + dx * 1.6 + 22} ${74 - (i % 2) * 10} ${180 + dx * 0.9 + 8} 140 Z`}
              fill="#F2EBDD"
              stroke={INK}
              strokeWidth="6"
              strokeLinejoin="round"
            />
          ))}
          <PlainHead skin="#F3CFA6" />
          <path d="M88 160 C84 100 276 100 272 160 Q230 146 180 148 Q130 146 88 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <rect x="82" y="128" width="196" height="30" rx="10" fill="#E8C547" stroke={INK} strokeWidth="7" />
          {[120, 160, 200, 240].map((x) => (
            <circle key={x} cx={x} cy="143" r="6" fill="#8E3B2F" />
          ))}
          <Face {...p} g={g} />
          {/* Ria và râu dài đen */}
          <path d="M140 232 Q180 218 220 232 Q206 242 180 238 Q154 242 140 232 Z" fill="#1E1B2E" stroke={INK} strokeWidth="4" />
          <path d="M150 270 Q180 384 210 270 Q180 282 150 270 Z" fill="#1E1B2E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M112 312 Q180 292 248 312 L270 482 Q180 498 90 482 Z" fill="#3B2A4A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 350 L210 304" fill="none" stroke="#E8C547" strokeWidth="9" strokeLinecap="round" />
        <path d="M96 470 Q180 484 264 470" fill="none" stroke="#E8C547" strokeWidth="8" />
        <rect x="104" y="400" width="152" height="22" rx="6" fill="#E8C547" stroke={INK} strokeWidth="6" />
        <circle cx="180" cy="411" r="16" fill="#8E3B2F" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },

  // ------------------------------------------------ Đẽo cày giữa đường
  "deo-cay-anh": {
    look: { skin: "#E2A574", sleeve: "#7A4E2D", legs: "#F2EBDD", shoe: "#E2A574", arm: 24 },
    headY: 92,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 176, mouthY: 254, browColor: INK };
      return (
        <g>
          <PlainHead skin="#E2A574" />
          {/* Khăn đầu rìu tối, mỏ khăn nhô trước trán */}
          <path d="M84 170 C76 70 284 70 276 170 Q230 150 180 152 Q130 150 84 170 Z" fill="#2E2A2A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M90 150 Q180 120 270 150 M96 126 Q180 96 264 126" fill="none" stroke="#55504A" strokeWidth="6" />
          <path d="M196 92 L234 60 L232 104 Z" fill="#2E2A2A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Face {...p} g={g} lip="#B03A2E" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M120 420 L240 420 L248 470 L112 470 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M114 312 Q180 292 246 312 L242 432 L118 432 Z" fill="#7A4E2D" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M152 304 L180 340 L208 304" fill="none" stroke="#E2A574" strokeWidth="9" strokeLinecap="round" />
        <path d="M114 418 Q180 430 246 418" fill="none" stroke="#2E2A2A" strokeWidth="14" strokeLinecap="round" />
      </g>
    ),
  },
  "deo-cay-ong-lao": {
    look: { skin: "#F3CFA6", sleeve: "#5B6B7A", legs: "#F2EBDD", shoe: "#1E1B2E" },
    headY: 40,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 176, mouthY: 246, browColor: "#8A8A8A" };
      return (
        <g>
          <PlainHead skin="#F3CFA6" />
          <Face {...p} g={g} />
          {/* Râu bạc dài */}
          <path d="M140 228 Q180 216 220 228 Q206 238 180 234 Q154 238 140 228 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <path d="M146 266 Q180 400 214 266 Q180 280 146 266 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          {/* Nón lá */}
          <path d="M120 178 Q180 270 240 178" fill="none" stroke="#C9A24E" strokeWidth="5" />
          <path d="M28 176 L180 36 L332 176 Q180 196 28 176 Z" fill="#E8D9A8" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          {[0.3, 0.55, 0.8].map((t) => (
            <path key={t} d={`M${180 - 152 * t} ${36 + 140 * t} Q180 ${36 + 158 * t} ${180 + 152 * t} ${36 + 140 * t}`} fill="none" stroke="#B79F63" strokeWidth="5" />
          ))}
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M114 312 Q180 292 246 312 L264 480 Q180 494 96 480 Z" fill="#5B6B7A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M180 300 L180 482" stroke="#46535F" strokeWidth="6" />
        <rect x="108" y="404" width="144" height="16" rx="6" fill="#2E2A2A" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
  "deo-cay-ba": {
    look: { skin: "#F6C89F", sleeve: "#C79A62", legs: "#2E2A2A", shoe: "#1E1B2E" },
    headY: 92,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 206, browY: 178, mouthY: 254, browColor: INK };
      return (
        <g>
          <PlainHead skin="#F6C89F" />
          {/* Khăn mỏ quạ đen, mỏ nhọn trước trán */}
          <path d="M80 176 C70 80 290 80 280 176 Q230 150 180 160 Q130 150 80 176 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M150 104 L180 58 L214 104 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M84 168 L60 236 L94 220 Z" fill="#1E1B2E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Face {...p} g={g} big lip="#C0392B" />
          <ellipse cx="128" cy="234" rx="11" ry="7" fill="#FF8FA3" opacity="0.6" />
          <ellipse cx="232" cy="234" rx="11" ry="7" fill="#FF8FA3" opacity="0.6" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy đen */}
        <path d="M118 420 L242 420 L262 482 Q180 494 98 482 Z" fill="#2E2A2A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Yếm đỏ + áo tứ thân mở vạt */}
        <path d="M120 312 Q180 296 240 312 L236 430 L124 430 Z" fill="#C0392B" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M112 312 Q138 302 158 300 L150 436 L114 436 Z" fill="#C79A62" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M248 312 Q222 302 202 300 L210 436 L246 436 Z" fill="#C79A62" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="112" y="414" width="136" height="18" rx="6" fill="#3FA34D" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },

  // ------------------------------------------------ Rùa và Thỏ
  "tho-rua-tho": {
    look: { skin: "#FFFFFF", sleeve: "#FFFFFF", legs: "#FFFFFF", shoe: "#F2D0D6", arm: 20 },
    headY: 120,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 148, eyeR: 212, eyeY: 196, browY: 162, mouthY: 262, browColor: INK };
      return (
        <g>
          {/* Hai tai dài dựng đứng */}
          <g transform="rotate(-12 140 120)">
            <ellipse cx="140" cy="44" rx="30" ry="92" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
            <ellipse cx="140" cy="50" rx="14" ry="66" fill="#F2B8C2" />
          </g>
          <g transform="rotate(14 222 120)">
            <ellipse cx="222" cy="40" rx="30" ry="92" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
            <ellipse cx="222" cy="46" rx="14" ry="66" fill="#F2B8C2" />
          </g>
          <ellipse cx="180" cy="206" rx="94" ry="86" fill="#FFFFFF" stroke={INK} strokeWidth="7" />
          <Face {...p} g={g} big lip="#C0392B" />
          {/* Mũi hồng, ria, răng thỏ */}
          <path d="M168 232 L192 232 L180 246 Z" fill="#E86A86" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M150 244 L96 236 M150 252 L98 260 M210 244 L264 236 M210 252 L262 260" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <rect x="169" y="266" width="22" height="18" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <line x1="180" y1="266" x2="180" y2="284" stroke={INK} strokeWidth="3" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Đuôi bông */}
        <circle cx="104" cy="448" r="26" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
        <path d="M116 312 Q180 292 244 312 L250 450 Q180 490 110 450 Z" fill="#FFFFFF" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Áo ba lỗ đua tối màu, số 1 */}
        <path d="M134 308 L134 336 Q180 352 226 336 L226 308 L248 318 L246 430 L114 430 L112 318 Z" fill="#2B3A55" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="150" y="358" width="60" height="52" rx="6" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <path d="M172 372 L184 364 L184 402" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  "tho-rua-rua": {
    look: { skin: "#A9C98A", sleeve: "#A9C98A", legs: "#A9C98A", shoe: "#7DA05A", arm: 26 },
    headY: 124,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 152, eyeR: 212, eyeY: 200, browY: 170, mouthY: 252, browColor: INK };
      return (
        <g>
          <ellipse cx="184" cy="206" rx="90" ry="82" fill="#A9C98A" stroke={INK} strokeWidth="7" />
          <circle cx="130" cy="150" r="9" fill="#7DA05A" />
          <circle cx="156" cy="136" r="6" fill="#7DA05A" />
          <circle cx="232" cy="146" r="8" fill="#7DA05A" />
          <Face {...p} g={g} />
          {/* Mí mắt trễ: vẻ chậm rãi */}
          {p.expr === "neutral" || p.expr === "smug" ? (
            <path d="M134 196 Q152 180 170 196 M194 196 Q212 180 230 196" fill="#A9C98A" stroke={INK} strokeWidth="5" />
          ) : null}
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Mai rùa to sau lưng */}
        <ellipse cx="136" cy="392" rx="104" ry="118" fill="#3E4A2A" stroke={INK} strokeWidth="9" />
        <path d="M136 300 L170 330 L160 380 L112 380 L102 330 Z M112 380 L92 430 M160 380 L180 430 M102 330 L50 340 M170 330 L218 320 M136 300 L136 280" fill="none" stroke="#8A9A5E" strokeWidth="7" strokeLinejoin="round" />
        <path d="M54 420 Q136 470 220 420" fill="none" stroke="#8A9A5E" strokeWidth="7" />
        {/* Yếm bụng sáng */}
        <ellipse cx="214" cy="392" rx="46" ry="88" fill="#E8D9A0" stroke={INK} strokeWidth="7" />
        {[350, 384, 418].map((y) => (
          <line key={y} x1="174" y1={y} x2="254" y2={y} stroke="#B9A86A" strokeWidth="5" />
        ))}
      </g>
    ),
  },

  // ------------------------------------------------ Mài sắt nên kim
  "ly-bach": {
    look: { skin: "#FAD2B0", sleeve: "#E9EEF2", legs: "#3B4A6B", shoe: "#1E1B2E", arm: 20 },
    headY: 120,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 176, mouthY: 252, browColor: INK };
      return (
        <g>
          {/* Hai búi tóc trái đào */}
          {[126, 234].map((x) => (
            <g key={x}>
              <circle cx={x} cy="96" r="28" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
              <path d={`M${x - 26} 112 Q${x} 124 ${x + 26} 112`} fill="none" stroke="#C0392B" strokeWidth="8" strokeLinecap="round" />
            </g>
          ))}
          <PlainHead skin="#FAD2B0" rx={80} />
          <path d="M86 170 C76 80 284 80 274 170 Q246 132 200 140 Q190 160 170 140 Q120 132 86 170 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Face {...p} g={g} big lip="#D62828" />
          <ellipse cx="126" cy="232" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
          <ellipse cx="234" cy="232" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M118 312 Q180 294 242 312 L248 452 Q180 466 112 452 Z" fill="#E9EEF2" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Cổ áo giao lĩnh tối */}
        <path d="M150 304 L214 392 M210 304 L176 352" fill="none" stroke="#3B4A6B" strokeWidth="12" strokeLinecap="round" />
        <rect x="114" y="404" width="132" height="22" rx="6" fill="#3B4A6B" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
  "ly-bach-ba-lao": {
    look: { skin: "#EFC9A2", sleeve: "#3E3530", legs: "#3E3530", shoe: "#1E1B2E", arm: 20 },
    headY: 96,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 154, eyeR: 212, eyeY: 206, browY: 178, mouthY: 254, browColor: "#9A9A9A" };
      return (
        <g>
          {/* Búi tóc bạc sau gáy, trâm cài */}
          <circle cx="100" cy="128" r="36" fill="#F4F4F4" stroke={INK} strokeWidth="7" />
          <line x1="58" y1="110" x2="140" y2="140" stroke="#B5892A" strokeWidth="8" strokeLinecap="round" />
          <PlainHead skin="#EFC9A2" />
          <path d="M84 176 C76 82 284 82 276 168 Q236 136 184 140 Q128 140 84 176 Z" fill="#F4F4F4" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M120 120 Q160 108 200 112 M150 102 Q190 94 230 104" fill="none" stroke="#C9C9C9" strokeWidth="5" />
          <Face {...p} g={g} lip="#7A2E22" />
          {/* Nếp nhăn */}
          <path d="M116 230 q8 10 0 20 M244 230 q-8 10 0 20 M162 160 q18 -6 36 0" fill="none" stroke="#B9875F" strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M114 312 Q180 292 246 312 L262 482 Q180 494 98 482 Z" fill="#3E3530" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Khăn vắt vai sáng */}
        <path d="M126 312 Q180 334 236 312 L222 340 Q180 356 140 340 Z" fill="#D8CFC0" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <rect x="108" y="410" width="144" height="16" rx="6" fill="#6B5A4E" stroke={INK} strokeWidth="5" />
      </g>
    ),
  },
};

// ================================================================ đạo cụ

export const props: Record<PropTuan3, PropDef> = {
  // ------------------------------------------------ Ve và Kiến
  "ve-kien-dan": {
    mode: "extend",
    draw: () => (
      <g transform="rotate(-55)">
        {/* Bầu đàn tròn ôm sát người, cần đàn chĩa lên */}
        <rect x="-9" y="-10" width="18" height="140" rx="6" fill="#7A4421" stroke={INK} strokeWidth="6" />
        <path d="M-9 110 l-16 -6 M9 96 l16 -6 M-9 84 l-16 -6" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <circle cx="0" cy="-10" r="54" fill="#C9A24E" stroke={INK} strokeWidth="7" />
        <circle cx="0" cy="-10" r="14" fill="#3B1E1E" />
        <line x1="-4" y1="-60" x2="-4" y2="120" stroke="#3B1E1E" strokeWidth="3" />
        <line x1="4" y1="-60" x2="4" y2="120" stroke="#3B1E1E" strokeWidth="3" />
        <rect x="-20" y="-58" width="40" height="9" rx="3" fill="#3B1E1E" />
      </g>
    ),
  },
  "ve-kien-hat-thoc": {
    mode: "upright",
    draw: () => (
      <g transform="rotate(16 0 -60)">
        <path d="M0 -150 Q52 -110 48 -50 Q40 0 0 4 Q-40 0 -48 -50 Q-52 -110 0 -150 Z" fill="#E8C547" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M0 -140 Q12 -70 0 -4" fill="none" stroke="#B5892A" strokeWidth="6" />
        <path d="M0 -150 L4 -180" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "ve-kien-dong-thoc": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-160 0 Q-120 -150 0 -170 Q120 -150 160 0 Z" fill="#E8C547" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {[
          [-90, -40], [-40, -70], [20, -50], [80, -36], [-60, -110], [0, -120], [60, -100], [-10, -20], [110, -14], [-120, -12],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="12" ry="20" transform={`rotate(${(i % 3) * 30 - 30} ${x} ${y})`} fill="#F6DD7A" stroke="#B5892A" strokeWidth="4" />
        ))}
      </g>
    ),
  },

  // ------------------------------------------------ Mai An Tiêm
  "an-tiem-dua": {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <g>
        <ellipse cx="0" cy="-62" rx="82" ry="62" fill="#2E6B34" stroke={INK} strokeWidth="7" />
        {[-52, -20, 14, 46].map((x) => (
          <path key={x} d={`M${x} -120 q14 20 0 40 q-14 20 0 40 q10 14 2 30`} fill="none" stroke="#9BC06B" strokeWidth="8" strokeLinecap="round" />
        ))}
        <path d="M0 -124 q-6 -16 6 -26" fill="none" stroke="#5C4128" strokeWidth="6" strokeLinecap="round" />
        <Unmirror mirrored={mirrored}>
          <rect x="-58" y="-80" width="116" height="38" rx="10" fill="#2E6B34" stroke="#FFF3C4" strokeWidth="3" />
          <Lines text={text ?? "AN TIÊM"} cy={-61} width={104} max={28} color="#FFF3C4" font={TEXT_FONT} />
        </Unmirror>
      </g>
    ),
  },
  "an-tiem-cuoc": {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-14" x2="0" y2="170" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-14" x2="0" y2="170" stroke="#9C6B3C" strokeWidth="10" strokeLinecap="round" />
        <path d="M-6 150 L70 132 L84 186 L-6 176 Z" fill="#8A8F99" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M70 138 L80 180" stroke="#C9CED6" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "an-tiem-chim": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -820)">
        <path d="M-10 0 Q-80 -80 -170 -50 Q-110 -24 -120 10 Q-60 0 -10 20 Z" fill="#4A4A5A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M10 0 Q80 -90 170 -60 Q110 -30 120 6 Q60 0 10 20 Z" fill="#4A4A5A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <ellipse cx="0" cy="10" rx="42" ry="30" fill="#5E5E70" stroke={INK} strokeWidth="7" />
        <circle cx="46" cy="-6" r="24" fill="#5E5E70" stroke={INK} strokeWidth="7" />
        <circle cx="52" cy="-12" r="5" fill="#FFFFFF" />
        <path d="M66 -6 L92 2 L66 10 Z" fill="#FFB22C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-40 14 L-80 30 L-46 30 Z" fill="#4A4A5A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Hạt rơi */}
        {[
          [90, 60], [76, 130], [96, 200], [80, 270],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="9" ry="13" fill="#1E1B2E" stroke="#FFFFFF" strokeWidth="3" />
        ))}
      </g>
    ),
  },
  "an-tiem-ruong-dua": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-260 -10 Q-180 -60 -100 -20 Q-20 20 60 -30 Q140 -70 260 -14" fill="none" stroke="#2C5A37" strokeWidth="10" strokeLinecap="round" />
        {[-230, -150, -60, 30, 120, 210].map((x, i) => (
          <path key={x} d={`M${x} ${-30 - (i % 2) * 14} q-30 -40 0 -64 q30 24 0 64 Z`} fill="#4FA85A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        ))}
        {[-170, 0, 170].map((x, i) => (
          <g key={x} transform={`translate(${x} 0) scale(${0.62 - (i % 2) * 0.06})`}>
            <ellipse cx="0" cy="-58" rx="80" ry="58" fill="#2E6B34" stroke={INK} strokeWidth="9" />
            {[-46, -14, 18, 50].map((sx) => (
              <path key={sx} d={`M${sx} -110 q14 20 0 40 q-14 20 0 40`} fill="none" stroke="#9BC06B" strokeWidth="9" strokeLinecap="round" />
            ))}
          </g>
        ))}
      </g>
    ),
  },
  "an-tiem-thuyen": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Buồm */}
        <line x1="0" y1="-90" x2="0" y2="-470" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <line x1="0" y1="-90" x2="0" y2="-470" stroke="#7A4421" strokeWidth="7" strokeLinecap="round" />
        <path d="M10 -450 Q150 -330 150 -150 L10 -150 Z" fill="#F2EBDD" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[-400, -340, -280, -220].map((y) => (
          <line key={y} x1="12" y1={y} x2={Math.min(146, 60 + (y + 460) * 0.6)} y2={y} stroke="#B9A88A" strokeWidth="5" />
        ))}
        <path d="M0 -470 L-50 -456 L0 -440 Z" fill="#C0392B" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Thân thuyền */}
        <path d="M-200 -110 L200 -110 Q180 -30 120 -10 L-130 -10 Q-190 -40 -200 -110 Z" fill="#7A4421" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-186 -80 L188 -80" stroke="#C9A24E" strokeWidth="7" />
        <circle cx="-140" cy="-60" r="12" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
        {/* Sóng che đáy thuyền */}
        <path d="M-240 -20 q30 -18 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 L240 10 L-240 10 Z" fill="#2F86C9" stroke="#FFFFFF" strokeWidth="5" />
      </g>
    ),
  },

  // ------------------------------------------------ Đẽo cày giữa đường
  "deo-cay-go": {
    mode: "upright",
    draw: () => (
      <g>
        <rect x="-190" y="-120" width="360" height="120" rx="20" fill="#9C6B3C" stroke={INK} strokeWidth="8" />
        <path d="M-160 -90 Q-60 -100 40 -84 M-150 -40 Q-40 -54 100 -36" fill="none" stroke="#6B4423" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="170" cy="-60" rx="40" ry="60" fill="#D9AE74" stroke={INK} strokeWidth="8" />
        <ellipse cx="170" cy="-60" rx="24" ry="38" fill="none" stroke="#9C6B3C" strokeWidth="5" />
        <ellipse cx="170" cy="-60" rx="9" ry="14" fill="none" stroke="#9C6B3C" strokeWidth="5" />
      </g>
    ),
  },
  "deo-cay-cay": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Bắp cày cong vươn ra trước */}
        <path d="M-70 -190 Q60 -240 200 -150" fill="none" stroke={INK} strokeWidth="30" strokeLinecap="round" />
        <path d="M-70 -190 Q60 -240 200 -150" fill="none" stroke="#C08A52" strokeWidth="18" strokeLinecap="round" />
        {/* Tay cày */}
        <path d="M-150 -330 L-40 -20" fill="none" stroke={INK} strokeWidth="30" strokeLinecap="round" />
        <path d="M-150 -330 L-40 -20" fill="none" stroke="#C08A52" strokeWidth="18" strokeLinecap="round" />
        <path d="M-180 -330 L-120 -330" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        {/* Chân cày + lưỡi sắt */}
        <path d="M-70 -34 L80 -34 L80 -4 L-70 -4 Z" fill="#C08A52" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M76 -40 L150 -14 L76 2 Z" fill="#8A8F99" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M30 -34 L50 -170" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      </g>
    ),
  },
  "deo-cay-voi": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Chân */}
        {[-150, -70, 60, 140].map((x) => (
          <rect key={x} x={x - 30} y="-180" width="60" height="180" rx="16" fill="#8E949C" stroke={INK} strokeWidth="8" />
        ))}
        {/* Đuôi */}
        <path d="M-210 -290 Q-250 -230 -240 -180" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="-20" cy="-290" rx="210" ry="140" fill="#9AA0A8" stroke={INK} strokeWidth="9" />
        {/* Đầu, vòi, ngà, tai */}
        <circle cx="200" cy="-350" r="100" fill="#9AA0A8" stroke={INK} strokeWidth="9" />
        <path d="M270 -310 Q320 -200 300 -110 Q296 -70 330 -76" fill="none" stroke={INK} strokeWidth="56" strokeLinecap="round" />
        <path d="M270 -310 Q320 -200 300 -110 Q296 -70 330 -76" fill="none" stroke="#9AA0A8" strokeWidth="40" strokeLinecap="round" />
        <path d="M250 -290 Q300 -250 330 -270" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M250 -290 Q300 -250 330 -270" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        <path d="M150 -420 Q60 -400 70 -300 Q80 -220 160 -250 Z" fill="#7F858E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <circle cx="236" cy="-370" r="10" fill={INK} />
      </g>
    ),
  },
  "deo-cay-vun": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Mẩu cày gãy */}
        <path d="M-120 -16 L60 -90" stroke={INK} strokeWidth="30" strokeLinecap="round" />
        <path d="M-120 -16 L60 -90" stroke="#C08A52" strokeWidth="18" strokeLinecap="round" />
        <path d="M60 -90 l10 -20 l8 22 l14 -10" fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Vụn gỗ */}
        {[
          [-170, -10], [-110, -40], [-40, -20], [20, -8], [90, -30], [150, -12], [-80, -6], [120, -50], [190, -6], [-200, -30],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} l26 -${10 + (i % 3) * 6} l10 18 Z`} fill="#D9AE74" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        ))}
      </g>
    ),
  },

  // ------------------------------------------------ Rùa và Thỏ
  "tho-rua-dich": {
    mode: "upright",
    draw: ({ text }) => (
      <g>
        {[-210, 210].map((x) => (
          <rect key={x} x={x - 14} y="-560" width="28" height="560" rx="8" fill="#F2EBDD" stroke={INK} strokeWidth="7" />
        ))}
        <rect x="-220" y="-560" width="440" height="120" rx="10" fill="#FFFFFF" stroke={INK} strokeWidth="8" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={-216 + i * 40} y={i % 2 ? -470 : -462} width="20" height="20" fill={INK} />
        ))}
        <g transform="translate(0 0)">
          <Lines text={text ?? "ĐÍCH"} cy={-516} width={380} max={70} color={INK} font={TEXT_FONT} />
        </g>
      </g>
    ),
  },
  "tho-rua-cay": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-50 0 Q-30 -160 -40 -360 L40 -360 Q30 -160 50 0 Z" fill="#6B4423" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <ellipse cx="0" cy="-470" rx="230" ry="160" fill="#2C5A37" stroke={INK} strokeWidth="9" />
        <ellipse cx="-130" cy="-400" rx="110" ry="80" fill="#2C5A37" stroke={INK} strokeWidth="9" />
        <ellipse cx="140" cy="-396" rx="110" ry="80" fill="#2C5A37" stroke={INK} strokeWidth="9" />
        <path d="M-120 -520 Q-60 -580 20 -570" fill="none" stroke="#4E8A55" strokeWidth="12" strokeLinecap="round" />
      </g>
    ),
  },

  // ------------------------------------------------ Mài sắt nên kim
  "ly-bach-thanh-sat": {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-15" y="-40" width="30" height="230" rx="8" fill="#5E646D" stroke={INK} strokeWidth="7" />
        <line x1="-4" y1="-30" x2="-4" y2="180" stroke="#A9AFB8" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  "ly-bach-kim": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M-8 -20 L8 -20 L2 190 L-2 190 Z" fill="#E6E9EE" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="0" cy="-4" rx="3.5" ry="9" fill={INK} />
        <path d="M40 110 L48 130 L68 138 L48 146 L40 166 L32 146 L12 138 L32 130 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M-40 60 L-35 74 L-22 79 L-35 84 L-40 98 L-45 84 L-58 79 L-45 74 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
    ),
  },
  "ly-bach-da-mai": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-170 0 L-180 -80 Q-150 -130 -40 -134 L120 -130 Q176 -120 180 -70 L174 0 Z" fill="#8A8F99" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        <path d="M-150 -110 Q0 -124 150 -108" fill="none" stroke="#C9CED6" strokeWidth="10" strokeLinecap="round" />
        <path d="M-120 -50 L-80 -70 M40 -40 L90 -66" fill="none" stroke="#5E626B" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
};

// ================================================================ phông

/** Bầu trời gradient. */
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

const Cloud: React.FC<{ x: number; y: number; s: number; fill?: string }> = ({ x, y, s, fill = "#FFFFFF" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
    <ellipse cx="0" cy="0" rx="90" ry="40" />
    <ellipse cx="-60" cy="12" rx="60" ry="30" />
    <ellipse cx="64" cy="10" rx="64" ry="32" />
  </g>
);

/** Đồng cỏ mùa hè, tổ kiến bên phải. */
const VeKienHe: React.FC = () => (
  <>
    <Sky id="t3-he-sky" top="#5FB8EA" bottom="#D4F1FD" />
    <circle cx="880" cy="380" r="84" fill="#FFE27A" stroke="#FFC93C" strokeWidth="14" />
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i * Math.PI) / 5;
      return <line key={i} x1={880 + Math.cos(a) * 110} y1={380 + Math.sin(a) * 110} x2={880 + Math.cos(a) * 150} y2={380 + Math.sin(a) * 150} stroke="#FFC93C" strokeWidth="10" strokeLinecap="round" />;
    })}
    <Cloud x={300} y={420} s={0.9} />
    <path d={`M0 980 Q270 900 540 960 Q810 1010 1080 940 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#7CC456" stroke={INK} strokeWidth="6" />
    {/* Cây xanh bên trái */}
    <path d={`M90 ${FLOOR} Q110 900 90 720 L170 720 Q150 900 180 ${FLOOR} Z`} fill="#6B4423" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <ellipse cx="130" cy="620" rx="190" ry="150" fill="#3E8E47" stroke={INK} strokeWidth="8" />
    <ellipse cx="40" cy="700" rx="100" ry="70" fill="#3E8E47" stroke={INK} strokeWidth="8" />
    {/* Tổ kiến ụ đất */}
    <path d={`M780 ${FLOOR} Q840 1080 930 1070 Q1020 1080 1080 ${FLOOR} Z`} fill="#A67B4F" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <ellipse cx="930" cy="1130" rx="30" ry="22" fill="#3B2414" stroke={INK} strokeWidth="5" />
    {/* Hoa cỏ */}
    {[320, 470, 640].map((x, i) => (
      <g key={x} transform={`translate(${x} ${1150 - (i % 2) * 30})`}>
        <line x1="0" y1="0" x2="0" y2="60" stroke="#2C5A37" strokeWidth="6" />
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
        <circle cx="0" cy="0" r="6" fill="#FFC93C" />
      </g>
    ))}
    <Floor color="#6DBE45" line="#5DAA3A" />
  </>
);

/** Mùa đông: trời xám, tuyết, cây trụi lá, nhà kiến có cửa tròn bên phải. */
const VeKienDong: React.FC = () => (
  <>
    <Sky id="t3-dong-sky" top="#7D8796" bottom="#C9D0DA" />
    <Cloud x={260} y={360} s={1.3} fill="#9AA3B0" />
    <Cloud x={760} y={330} s={1.1} fill="#9AA3B0" />
    {/* Gió bấc */}
    {[520, 620, 720].map((y, i) => (
      <path key={y} d={`M${200 + i * 60} ${y} q80 -30 160 0 t160 0 q40 -10 30 -40`} fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
    ))}
    <path d={`M0 1000 Q300 960 560 1000 Q820 1040 1080 990 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#EEF2F6" stroke={INK} strokeWidth="6" />
    {/* Cây trụi lá */}
    <g stroke={INK} strokeLinecap="round" fill="none">
      <path d={`M130 ${FLOOR} L140 720 M140 860 L60 740 M140 800 L230 690 M140 740 L100 640 M230 690 L270 640 M60 740 L30 700`} strokeWidth="26" />
      <path d={`M130 ${FLOOR} L140 720 M140 860 L60 740 M140 800 L230 690 M140 740 L100 640 M230 690 L270 640 M60 740 L30 700`} stroke="#6B4423" strokeWidth="14" />
    </g>
    <path d="M44 732 q20 -14 36 4 M206 698 q22 -12 34 6" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
    {/* Nhà kiến: ụ đất phủ tuyết, cửa tròn, ống khói */}
    <rect x="950" y="760" width="44" height="120" fill="#7A4E2D" stroke={INK} strokeWidth="7" />
    <path d="M972 740 q-30 -40 0 -80 q30 -40 0 -80" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
    <path d={`M700 ${FLOOR} Q720 820 900 800 Q1080 800 1100 ${FLOOR} Z`} fill="#A67B4F" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M730 950 Q760 820 900 806 Q1060 806 1090 900 Q1000 860 900 870 Q800 870 730 950 Z" fill="#FFFFFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d={`M818 ${FLOOR} L818 1040 Q886 950 954 1040 L954 ${FLOOR} Z`} fill="#5C3A1E" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <circle cx="930" cy="1130" r="9" fill="#E8C547" stroke={INK} strokeWidth="4" />
    <circle cx="760" cy="1000" r="34" fill="#FFE9A0" stroke={INK} strokeWidth="7" />
    <path d="M760 966 L760 1034 M726 1000 L794 1000" stroke={INK} strokeWidth="5" />
    {/* Tuyết rơi */}
    {Array.from({ length: 34 }, (_, i) => (
      <circle key={i} cx={(i * 211) % 1080} cy={300 + ((i * 337) % 880)} r={i % 3 === 0 ? 9 : 6} fill="#FFFFFF" stroke="#9AA3B0" strokeWidth="2" />
    ))}
    <Floor color="#E3E9F0" line="#C9D2DC" />
  </>
);

/** Đảo hoang: bãi cát bên trái, biển bên phải. */
const AnTiemDao: React.FC = () => (
  <>
    <Sky id="t3-dao-sky" top="#6EC6F0" bottom="#D6F2FD" />
    <circle cx="860" cy="360" r="70" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <Cloud x={420} y={420} s={0.8} />
    {/* Biển */}
    <rect x="0" y="780" width="1080" height={FLOOR - 780} fill="#2F86C9" />
    <rect x="0" y="780" width="1080" height="10" fill="#1F6FB2" />
    {[860, 960, 1060, 1160].map((y, i) => (
      <path
        key={y}
        d={`M${480 + i * 40} ${y} q45 -16 90 0 t90 0 t90 0 t90 0 t90 0 t90 0 t90 0`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        opacity={0.4 + i * 0.12}
      />
    ))}
    {/* Đảo cát và vách đá */}
    <path d={`M0 900 Q300 860 520 960 Q650 1030 720 ${FLOOR} L0 ${FLOOR} Z`} fill="#EBC685" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M0 900 L0 640 Q60 600 120 660 Q170 610 230 700 L260 900 Z" fill="#8A8F99" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M40 700 L90 760 M160 720 L200 800" stroke="#5E626B" strokeWidth="7" strokeLinecap="round" />
    {/* Cây dừa */}
    <path d={`M350 1010 Q330 820 400 640`} fill="none" stroke={INK} strokeWidth="34" strokeLinecap="round" />
    <path d={`M350 1010 Q330 820 400 640`} fill="none" stroke="#9C6B3C" strokeWidth="22" strokeLinecap="round" />
    {[
      "M400 640 Q300 560 220 620 Q300 600 400 650",
      "M400 640 Q480 540 590 590 Q490 590 400 650",
      "M400 640 Q360 520 280 500 Q370 560 396 648",
      "M400 640 Q470 640 520 730 Q450 680 400 650",
    ].map((d, i) => (
      <path key={i} d={d} fill="#3E8E47" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    ))}
    {/* Sàn: cát bên trái, nước bên phải */}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="#2F86C9" />
    <path d={`M0 ${FLOOR} L720 ${FLOOR} Q760 1400 700 1920 L0 1920 Z`} fill="#EBC685" />
    <rect x="0" y={FLOOR - 6} width="720" height="12" fill={INK} />
    <path d={`M720 ${FLOOR} q45 -16 90 0 t90 0 t90 0 t90 0`} fill="none" stroke="#FFFFFF" strokeWidth="6" />
  </>
);

/** Đường làng: lũy tre hai bên, đồng lúa xa. */
const DeoCayDuong: React.FC = () => (
  <>
    <Sky id="t3-lang-sky" top="#7CC8EE" bottom="#E2F5FD" />
    <Cloud x={520} y={380} s={1} />
    <Cloud x={200} y={500} s={0.6} />
    {/* Đồng lúa xa */}
    <path d={`M0 900 L1080 880 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#9CCB5E" stroke={INK} strokeWidth="6" />
    {[940, 1000, 1070, 1150].map((y) => (
      <line key={y} x1="0" y1={y} x2="1080" y2={y - 16} stroke="#7FB046" strokeWidth="8" />
    ))}
    {/* Lũy tre */}
    {[
      [60, 1],
      [980, 1.1],
    ].map(([x, s]) => (
      <g key={x} transform={`translate(${x} ${FLOOR}) scale(${s})`}>
        {[-50, -10, 30, 70].map((dx, i) => (
          <path key={dx} d={`M${dx} 0 Q${dx + (i % 2 ? 30 : -30)} -300 ${dx + (i % 2 ? 60 : -40)} -640`} fill="none" stroke="#5E8C3E" strokeWidth="16" strokeLinecap="round" />
        ))}
        <ellipse cx="0" cy="-620" rx="150" ry="110" fill="#3E7A3A" stroke={INK} strokeWidth="7" />
        <ellipse cx="-70" cy="-480" rx="90" ry="70" fill="#3E7A3A" stroke={INK} strokeWidth="7" />
        <ellipse cx="80" cy="-470" rx="90" ry="70" fill="#3E7A3A" stroke={INK} strokeWidth="7" />
      </g>
    ))}
    {/* Đường đất */}
    <path d={`M380 880 L560 880 L900 ${FLOOR} L100 ${FLOOR} Z`} fill="#C9A06A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <Floor color="#B08A5C" line="#9C784C" />
  </>
);

/** Đường đua qua đồng cỏ, cờ xuất phát bên trái. */
const ThoRuaDongCo: React.FC = () => (
  <>
    <Sky id="t3-dua-sky" top="#6EC6F0" bottom="#DDF4FD" />
    <circle cx="880" cy="340" r="64" fill="#FFE27A" stroke="#FFD24A" strokeWidth="10" />
    <Cloud x={330} y={400} s={0.9} />
    <path d={`M0 900 Q200 760 420 880 Q640 760 860 860 Q980 800 1080 840 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#8CC964" stroke={INK} strokeWidth="6" />
    <path d={`M0 1040 Q360 980 700 1030 Q900 1060 1080 1020 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#6DBE45" stroke={INK} strokeWidth="6" />
    {/* Đường đất */}
    <path d={`M0 1150 Q540 1110 1080 1150 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#D9B27A" stroke={INK} strokeWidth="6" />
    {/* Cờ xuất phát */}
    <line x1="60" y1={FLOOR} x2="60" y2="820" stroke={INK} strokeWidth="12" strokeLinecap="round" />
    <rect x="60" y="820" width="120" height="84" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].map((c) => ((r + c) % 2 ? <rect key={`${r}${c}`} x={60 + c * 30} y={820 + r * 28} width="30" height="28" fill={INK} /> : null)),
    )}
    <Floor color="#C9A06A" line="#B48C58" />
  </>
);

/** Bờ suối dưới chân núi. */
const LyBachSuoi: React.FC = () => (
  <>
    <Sky id="t3-suoi-sky" top="#9FD3EE" bottom="#EAF6FB" />
    {/* Núi xa */}
    <path d="M0 900 L140 560 L260 760 L420 480 L600 800 L760 540 L900 760 L1080 600 L1080 960 L0 960 Z" fill="#8FA7B8" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M420 480 L380 560 L420 540 L460 570 Z M760 540 L726 600 L762 586 L796 606 Z" fill="#FFFFFF" />
    <path d={`M0 950 Q300 900 600 940 Q850 970 1080 930 L1080 ${FLOOR} L0 ${FLOOR} Z`} fill="#7CC456" stroke={INK} strokeWidth="6" />
    {/* Suối chảy */}
    <path d={`M0 1040 Q300 1000 560 1050 Q800 1090 1080 1040 L1080 1150 Q800 1190 540 1150 Q280 1110 0 1150 Z`} fill="#5BAEE0" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    {[1070, 1110].map((y, i) => (
      <path key={y} d={`M${60 + i * 80} ${y} q40 -12 80 0 M${420 + i * 60} ${y + 10} q40 -12 80 0 M${780 - i * 40} ${y + 6} q40 -12 80 0`} fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    ))}
    {/* Liễu bên phải */}
    <path d={`M960 1050 Q940 820 990 640`} fill="none" stroke={INK} strokeWidth="34" strokeLinecap="round" />
    <path d={`M960 1050 Q940 820 990 640`} fill="none" stroke="#6B4423" strokeWidth="22" strokeLinecap="round" />
    <ellipse cx="980" cy="600" rx="170" ry="110" fill="#4E8A55" stroke={INK} strokeWidth="8" />
    {[860, 900, 1040, 1080].map((x, i) => (
      <path key={x} d={`M${x} 640 Q${x - 10} 760 ${x + 6} ${860 + (i % 2) * 40}`} fill="none" stroke="#3E7A3A" strokeWidth="9" strokeLinecap="round" />
    ))}
    {/* Đá cuội bờ suối */}
    {[[120, 1200, 40], [300, 1214, 26], [760, 1206, 34], [900, 1218, 22]].map(([x, y, r], i) => (
      <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill="#A9AFB8" stroke={INK} strokeWidth="5" />
    ))}
    <Floor color="#B5A58A" line="#A09076" />
  </>
);

export const scenes: Record<SceneTuan3, React.FC> = {
  "ve-kien-he": VeKienHe,
  "ve-kien-dong": VeKienDong,
  "an-tiem-dao": AnTiemDao,
  "deo-cay-duong": DeoCayDuong,
  "tho-rua-dong-co": ThoRuaDongCo,
  "ly-bach-suoi": LyBachSuoi,
};
