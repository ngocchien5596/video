/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 3 (Nói vậy). Tên khai báo ở engine/lib/story/tuan-3.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 */
import type React from "react";
import type { Expr } from "../../lib/stage-types.ts";
import type { PropTuan3, RoleTuan3, SceneTuan3 } from "../../lib/story/tuan-3.ts";
import { TEXT_FONT } from "../../components/brand.ts";
import { Floor, FLOOR, LINE as INK, Lines, type PropDef, Unmirror } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";
import { Bamboo, Canopy, Cloud as VCloud, DistantTrees, FarMountains, GrassTuft, Hills, PAL, Reeds, SoftShadow, SkyRays, Tree, VillageHouse, WarmSky, WaterBand } from "../village.tsx";

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
          <path d="M86 166 C78 82 282 82 274 166 Q236 138 180 142 Q124 138 86 166 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
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
    look: { skin: "#F3CFA6", sleeve: "#3B2A4A", legs: "#3B2A4A", shoe: "#2E2420" },
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
          <path d="M88 160 C84 100 276 100 272 160 Q230 146 180 148 Q130 146 88 160 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <rect x="82" y="128" width="196" height="30" rx="10" fill="#E3B23C" stroke={INK} strokeWidth="7" />
          {[120, 160, 200, 240].map((x) => (
            <circle key={x} cx={x} cy="143" r="6" fill="#8E3B2F" />
          ))}
          <Face {...p} g={g} />
          {/* Ria và râu dài đen */}
          <path d="M140 232 Q180 218 220 232 Q206 242 180 238 Q154 242 140 232 Z" fill="#2E2420" stroke={INK} strokeWidth="4" />
          <path d="M150 270 Q180 384 210 270 Q180 282 150 270 Z" fill="#2E2420" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        <path d="M112 312 Q180 292 248 312 L270 482 Q180 498 90 482 Z" fill="#3B2A4A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 350 L210 304" fill="none" stroke="#E3B23C" strokeWidth="9" strokeLinecap="round" />
        <path d="M96 470 Q180 484 264 470" fill="none" stroke="#E3B23C" strokeWidth="8" />
        <rect x="104" y="400" width="152" height="22" rx="6" fill="#E3B23C" stroke={INK} strokeWidth="6" />
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
    look: { skin: "#F3CFA6", sleeve: "#5B6B7A", legs: "#F2EBDD", shoe: "#2E2420" },
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
    look: { skin: "#F6C89F", sleeve: "#C79A62", legs: "#2E2A2A", shoe: "#2E2420" },
    headY: 92,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 206, browY: 178, mouthY: 254, browColor: INK };
      return (
        <g>
          <PlainHead skin="#F6C89F" />
          {/* Khăn mỏ quạ đen, mỏ nhọn trước trán */}
          <path d="M80 176 C70 80 290 80 280 176 Q230 150 180 160 Q130 150 80 176 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M150 104 L180 58 L214 104 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M84 168 L60 236 L94 220 Z" fill="#2E2420" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Face {...p} g={g} big lip="#B8402E" />
          <ellipse cx="128" cy="234" rx="11" ry="7" fill="#F2A08A" opacity="0.6" />
          <ellipse cx="232" cy="234" rx="11" ry="7" fill="#F2A08A" opacity="0.6" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Váy đen */}
        <path d="M118 420 L242 420 L262 482 Q180 494 98 482 Z" fill="#2E2A2A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {/* Yếm đỏ + áo tứ thân mở vạt */}
        <path d="M120 312 Q180 296 240 312 L236 430 L124 430 Z" fill="#B8402E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M112 312 Q138 302 158 300 L150 436 L114 436 Z" fill="#C79A62" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M248 312 Q222 302 202 300 L210 436 L246 436 Z" fill="#C79A62" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="112" y="414" width="136" height="18" rx="6" fill="#7FA557" stroke={INK} strokeWidth="5" />
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
          <Face {...p} g={g} big lip="#B8402E" />
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
    look: { skin: "#FAD2B0", sleeve: "#E9EEF2", legs: "#3B4A6B", shoe: "#2E2420", arm: 20 },
    headY: 120,
    Head: (p) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 176, mouthY: 252, browColor: INK };
      return (
        <g>
          {/* Hai búi tóc trái đào */}
          {[126, 234].map((x) => (
            <g key={x}>
              <circle cx={x} cy="96" r="28" fill="#2E2420" stroke={INK} strokeWidth="7" />
              <path d={`M${x - 26} 112 Q${x} 124 ${x + 26} 112`} fill="none" stroke="#B8402E" strokeWidth="8" strokeLinecap="round" />
            </g>
          ))}
          <PlainHead skin="#FAD2B0" rx={80} />
          <path d="M86 170 C76 80 284 80 274 170 Q246 132 200 140 Q190 160 170 140 Q120 132 86 170 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Face {...p} g={g} big lip="#D62828" />
          <ellipse cx="126" cy="232" rx="11" ry="7" fill="#F2A08A" opacity="0.75" />
          <ellipse cx="234" cy="232" rx="11" ry="7" fill="#F2A08A" opacity="0.75" />
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
    look: { skin: "#EFC9A2", sleeve: "#3E3530", legs: "#3E3530", shoe: "#2E2420", arm: 20 },
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

/** Gradient riêng của đạo cụ / phông tuần 3 (tiền tố t3-). */
const T3Defs: React.FC = () => (
  <defs>
    <radialGradient id="t3-melon" cx="0.36" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#5E9A4E" />
      <stop offset="0.6" stopColor="#3E7A3A" />
      <stop offset="1" stopColor="#24502A" />
    </radialGradient>
    <radialGradient id="t3-ele" cx="0.38" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#BDB3A6" />
      <stop offset="0.65" stopColor="#9C9184" />
      <stop offset="1" stopColor="#776C60" />
    </radialGradient>
    <radialGradient id="t3-stone" cx="0.35" cy="0.25" r="0.85">
      <stop offset="0" stopColor="#C9BFAF" />
      <stop offset="0.6" stopColor="#A39886" />
      <stop offset="1" stopColor="#7A6F60" />
    </radialGradient>
    <radialGradient id="t3-grain" cx="0.4" cy="0.3" r="0.8">
      <stop offset="0" stopColor="#FBE08A" />
      <stop offset="0.6" stopColor="#E3B23C" />
      <stop offset="1" stopColor="#B07A22" />
    </radialGradient>
    <radialGradient id="t3-earth" cx="0.4" cy="0.25" r="0.85">
      <stop offset="0" stopColor="#C99A68" />
      <stop offset="0.6" stopColor="#9A6A40" />
      <stop offset="1" stopColor="#6E4626" />
    </radialGradient>
    <linearGradient id="t3-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#9CC3BC" />
      <stop offset="1" stopColor="#4F8890" />
    </linearGradient>
    <linearGradient id="t3-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#F2D9A6" />
      <stop offset="1" stopColor="#D9B27A" />
    </linearGradient>
    <linearGradient id="t3-snow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FBF4E6" />
      <stop offset="1" stopColor="#E6D8C2" />
    </linearGradient>
    <linearGradient id="t3-bird" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7A6656" />
      <stop offset="1" stopColor="#4A3A2E" />
    </linearGradient>
  </defs>
);

/** Quả dưa hấu vỏ xanh sọc, đáy ở (0, 0). */
const Melon: React.FC<{ sw?: number }> = ({ sw = 7 }) => (
  <g>
    <SoftShadow cy={-4} rx={92} />
    <ellipse cx="0" cy="-62" rx="82" ry="62" fill="url(#t3-melon)" stroke={INK} strokeWidth={sw} />
    {[-52, -20, 14, 46].map((x) => (
      <path key={x} d={`M${x} -118 q${12 + x * 0.1} 20 ${x * 0.06} 40 q-14 20 0 40 q8 12 ${x * 0.08} 26`} fill="none" stroke="#1E4224" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
    ))}
    <path d="M-56 -92 Q-40 -114 -10 -118" fill="none" stroke="#B9D98A" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
    <path d="M0 -124 q-6 -16 6 -26" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
    <path d="M0 -124 q-6 -16 6 -26" fill="none" stroke="#7A5A30" strokeWidth="4" strokeLinecap="round" />
  </g>
);

/** Đầu sóng nhỏ màu kem (che đáy thuyền, mép nước). */
const Waves: React.FC<{ x0: number; x1: number; y: number; fill?: string }> = ({ x0, x1, y, fill = "url(#t3-sea)" }) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += 60) d += ` q15 -18 30 -18 q15 0 30 18`;
  return (
    <g>
      <path d={`${d} L${x1} ${y + 30} L${x0} ${y + 30} Z`} fill={fill} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#F4ECD6" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    </g>
  );
};

export const props: Record<PropTuan3, PropDef> = {
  // ------------------------------------------------ Ve và Kiến
  "ve-kien-dan": {
    mode: "extend",
    draw: () => (
      <g transform="rotate(-55)">
        <T3Defs />
        {/* Cần đàn gỗ, phím, trục lên dây */}
        <rect x="-10" y="-10" width="20" height="142" rx="6" fill="url(#w-wood-h)" stroke={INK} strokeWidth="6" />
        {[30, 54, 78].map((y) => (
          <line key={y} x1="-8" y1={y} x2="8" y2={y} stroke="#F2D9A6" strokeWidth="3" />
        ))}
        <path d="M-10 112 l-16 -6 M10 98 l16 -6 M-10 86 l-16 -6" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <path d="M-10 112 l-16 -6 M10 98 l16 -6 M-10 86 l-16 -6" stroke="#C08A55" strokeWidth="3" strokeLinecap="round" />
        {/* Bầu đàn tròn (đàn nguyệt) */}
        <circle cx="0" cy="-10" r="56" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" />
        <circle cx="0" cy="-10" r="44" fill="none" stroke="#A8362A" strokeWidth="4" opacity="0.7" />
        <circle cx="0" cy="-10" r="13" fill="#3A2416" />
        <path d="M-40 -34 Q-30 -54 -8 -60" fill="none" stroke="#FFF3D0" strokeWidth="6" strokeLinecap="round" opacity="0.75" />
        <line x1="-4" y1="-56" x2="-4" y2="124" stroke="#FBF1DC" strokeWidth="2.5" />
        <line x1="4" y1="-56" x2="4" y2="124" stroke="#FBF1DC" strokeWidth="2.5" />
        <rect x="-22" y="-58" width="44" height="10" rx="3" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="3" />
      </g>
    ),
  },
  "ve-kien-hat-thoc": {
    mode: "upright",
    draw: () => (
      <g>
        <T3Defs />
        <SoftShadow cy={-2} rx={60} />
        <g transform="rotate(16 0 -60)">
          <path d="M0 -150 Q52 -110 48 -50 Q40 0 0 4 Q-40 0 -48 -50 Q-52 -110 0 -150 Z" fill="url(#t3-grain)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M0 -140 Q14 -70 0 -4" fill="none" stroke="#A8761E" strokeWidth="5" />
          <path d="M-26 -110 Q-36 -70 -28 -34" fill="none" stroke="#FFF3C4" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
          <path d="M0 -150 L4 -182" stroke={INK} strokeWidth="7" strokeLinecap="round" />
          <path d="M0 -150 L4 -182" stroke="#C9A24E" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    ),
  },
  "ve-kien-dong-thoc": {
    mode: "upright",
    draw: () => (
      <g>
        <T3Defs />
        <SoftShadow cy={-4} rx={190} ry={30} />
        <path d="M-160 0 Q-120 -150 0 -170 Q120 -150 160 0 Z" fill="url(#t3-grain)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M30 -166 Q120 -140 156 -4 L160 0 Q60 -10 40 -40 Q90 -100 30 -166 Z" fill="#A8761E" opacity="0.35" />
        {[
          [-90, -40], [-40, -70], [20, -50], [80, -36], [-60, -110], [0, -120], [60, -100], [-10, -20], [110, -14], [-120, -12], [-20, -150], [40, -140],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="11" ry="18" transform={`rotate(${(i % 3) * 30 - 30} ${x} ${y})`} fill="#F8DF86" stroke="#A8761E" strokeWidth="4" />
        ))}
        <path d="M-110 -70 Q-80 -130 -30 -152" fill="none" stroke="#FFF3C4" strokeWidth="9" strokeLinecap="round" opacity="0.6" />
      </g>
    ),
  },

  // ------------------------------------------------ Mai An Tiêm
  "an-tiem-dua": {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <g>
        <T3Defs />
        <Melon />
        <Unmirror mirrored={mirrored}>
          <rect x="-58" y="-80" width="116" height="38" rx="10" fill="#2E5A30" stroke="#FFF3C4" strokeWidth="3" />
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
        <line x1="0" y1="-14" x2="0" y2="170" stroke="#9A6236" strokeWidth="10" strokeLinecap="round" />
        <line x1="-2" y1="-6" x2="-2" y2="160" stroke="#D9A46A" strokeWidth="3" strokeLinecap="round" />
        <rect x="-12" y="140" width="24" height="26" rx="4" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="5" />
        <path d="M-6 150 L70 132 L84 186 L-6 176 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M70 140 L80 178" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      </g>
    ),
  },
  "an-tiem-chim": {
    mode: "upright",
    draw: () => (
      <g transform="translate(0 -820)">
        <T3Defs />
        <path d="M-10 0 Q-80 -80 -170 -50 Q-110 -24 -120 10 Q-60 0 -10 20 Z" fill="url(#t3-bird)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-40 -16 Q-90 -50 -140 -46 M-50 0 Q-90 -20 -120 -14" fill="none" stroke="#A8927E" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 0 Q80 -90 170 -60 Q110 -30 120 6 Q60 0 10 20 Z" fill="url(#t3-bird)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M40 -20 Q90 -60 146 -58 M50 -2 Q90 -26 120 -20" fill="none" stroke="#A8927E" strokeWidth="4" strokeLinecap="round" />
        <path d="M-40 14 L-84 32 L-46 32 Z" fill="#4A3A2E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="0" cy="10" rx="44" ry="30" fill="#6E5A4A" stroke={INK} strokeWidth="7" />
        <ellipse cx="4" cy="20" rx="26" ry="14" fill="#E9D3AA" opacity="0.8" />
        <circle cx="46" cy="-6" r="24" fill="#6E5A4A" stroke={INK} strokeWidth="7" />
        <circle cx="52" cy="-12" r="6" fill="#FFF8E8" stroke={INK} strokeWidth="2" />
        <circle cx="54" cy="-12" r="3" fill={INK} />
        <path d="M66 -6 L94 2 L66 10 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Hạt rơi */}
        {[
          [90, 60], [76, 130], [96, 200], [80, 270],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="9" ry="13" fill="#3A2416" stroke="#F6E9CF" strokeWidth="3" />
        ))}
      </g>
    ),
  },
  "an-tiem-ruong-dua": {
    mode: "upright",
    draw: () => (
      <g>
        <T3Defs />
        {/* Luống cát vun */}
        <path d="M-280 4 Q-260 -30 -200 -34 L200 -34 Q260 -30 280 4 Z" fill="url(#t3-earth)" stroke={INK} strokeWidth="6" strokeLinejoin="round" opacity="0.9" />
        <path d="M-260 -10 Q-180 -60 -100 -20 Q-20 20 60 -30 Q140 -70 260 -14" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <path d="M-260 -10 Q-180 -60 -100 -20 Q-20 20 60 -30 Q140 -70 260 -14" fill="none" stroke="#6E9446" strokeWidth="7" strokeLinecap="round" />
        {[-230, -150, -60, 30, 120, 210].map((x, i) => (
          <path key={x} d={`M${x} ${-30 - (i % 2) * 14} q-34 -40 0 -68 q34 26 0 68 Z`} fill={i % 2 ? PAL.leaf : PAL.leafDark} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        ))}
        {[-170, 0, 170].map((x, i) => (
          <g key={x} transform={`translate(${x} 0) scale(${0.62 - (i % 2) * 0.06})`}>
            <Melon sw={9} />
          </g>
        ))}
      </g>
    ),
  },
  "an-tiem-thuyen": {
    mode: "upright",
    draw: () => (
      <g>
        <T3Defs />
        {/* Cột buồm, buồm vải nâu kem có nẹp tre */}
        <line x1="0" y1="-90" x2="0" y2="-470" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <line x1="0" y1="-90" x2="0" y2="-470" stroke="#9A6236" strokeWidth="8" strokeLinecap="round" />
        <path d="M10 -450 Q150 -330 150 -150 L10 -150 Z" fill="url(#w-paper)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[-400, -340, -280, -220].map((y) => (
          <line key={y} x1="12" y1={y} x2={Math.min(146, 60 + (y + 460) * 0.6)} y2={y} stroke="#B98A55" strokeWidth="6" />
        ))}
        <path d="M40 -420 Q70 -330 70 -170" fill="none" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
        <path d="M0 -470 L-52 -456 L0 -440 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {/* Thân thuyền gỗ, mắt thuyền */}
        <path d="M-200 -110 L200 -110 Q180 -30 120 -10 L-130 -10 Q-190 -40 -200 -110 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-194 -96 L196 -96" stroke="#D9A46A" strokeWidth="5" opacity="0.8" />
        <path d="M-186 -74 L188 -74" stroke="#D9A23A" strokeWidth="8" />
        <path d="M-186 -74 L188 -74" stroke={INK} strokeWidth="2" opacity="0.5" />
        <ellipse cx="-140" cy="-52" rx="16" ry="11" fill="#FBF1DC" stroke={INK} strokeWidth="4" />
        <circle cx="-136" cy="-52" r="5" fill={INK} />
        <Waves x0={-250} x1={250} y={-12} />
      </g>
    ),
  },

  // ------------------------------------------------ Đẽo cày giữa đường
  "deo-cay-go": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={220} ry={26} />
        <rect x="-190" y="-120" width="360" height="120" rx="20" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
        <path d="M-160 -96 Q-60 -106 40 -90 M-150 -46 Q-40 -60 100 -42 M-120 -20 Q0 -28 120 -18" fill="none" stroke="#5E3A20" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        <path d="M-170 -104 Q-40 -112 140 -104" fill="none" stroke="#E2B07A" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="170" cy="-60" rx="40" ry="60" fill="#E9C48E" stroke={INK} strokeWidth="8" />
        <ellipse cx="170" cy="-60" rx="26" ry="40" fill="none" stroke="#B98A55" strokeWidth="4" />
        <ellipse cx="170" cy="-60" rx="12" ry="18" fill="none" stroke="#B98A55" strokeWidth="4" />
        <path d="M-60 -120 q-6 -30 14 -40 q10 20 -4 40" fill={PAL.leaf} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
    ),
  },
  "deo-cay-cay": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={170} ry={20} />
        {/* Bắp cày cong vươn ra trước */}
        <path d="M-70 -190 Q60 -240 200 -150" fill="none" stroke={INK} strokeWidth="30" strokeLinecap="round" />
        <path d="M-70 -190 Q60 -240 200 -150" fill="none" stroke="#B87C48" strokeWidth="18" strokeLinecap="round" />
        <path d="M-60 -196 Q60 -238 180 -168" fill="none" stroke="#E2B07A" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        {/* Tay cày */}
        <path d="M-150 -330 L-40 -20" fill="none" stroke={INK} strokeWidth="30" strokeLinecap="round" />
        <path d="M-150 -330 L-40 -20" fill="none" stroke="#9A6236" strokeWidth="18" strokeLinecap="round" />
        <path d="M-148 -316 L-50 -40" fill="none" stroke="#D9A46A" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <path d="M-180 -330 L-120 -330" stroke={INK} strokeWidth="24" strokeLinecap="round" />
        <path d="M-180 -330 L-120 -330" stroke="#7B4B28" strokeWidth="12" strokeLinecap="round" />
        {/* Chân cày + lưỡi sắt */}
        <path d="M-70 -34 L80 -34 L80 -4 L-70 -4 Z" fill="url(#w-wood)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M76 -40 L150 -14 L76 2 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M30 -34 L50 -170" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M30 -34 L50 -170" stroke="#7B4B28" strokeWidth="7" strokeLinecap="round" />
      </g>
    ),
  },
  "deo-cay-voi": {
    mode: "upright",
    draw: () => (
      <g>
        <T3Defs />
        <SoftShadow cy={-4} rx={300} ry={30} />
        {/* Chân sau (tối hơn) */}
        {[-70, 140].map((x) => (
          <rect key={x} x={x - 30} y="-190" width="60" height="190" rx="16" fill="#83786C" stroke={INK} strokeWidth="8" />
        ))}
        {/* Đuôi */}
        <path d="M-210 -290 Q-250 -230 -240 -180" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
        <path d="M-210 -290 Q-250 -230 -240 -180" fill="none" stroke="#9C9184" strokeWidth="4" strokeLinecap="round" />
        <path d="M-248 -186 l-6 22 l12 -6 l6 14 l4 -24 Z" fill="#3A2416" />
        <ellipse cx="-20" cy="-290" rx="210" ry="140" fill="url(#t3-ele)" stroke={INK} strokeWidth="9" />
        <path d="M-180 -340 Q-120 -410 -20 -420" fill="none" stroke="#D8CFC2" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
        {/* Chân trước */}
        {[-150, 60].map((x) => (
          <g key={x}>
            <rect x={x - 30} y="-180" width="60" height="180" rx="16" fill="#9C9184" stroke={INK} strokeWidth="8" />
            {[-16, 0, 16].map((d) => (
              <path key={d} d={`M${x + d - 7} -4 q7 -12 14 0`} fill="#F1E6D2" stroke={INK} strokeWidth="3" />
            ))}
          </g>
        ))}
        {/* Đầu, vòi, ngà, tai */}
        <circle cx="200" cy="-350" r="100" fill="url(#t3-ele)" stroke={INK} strokeWidth="9" />
        <path d="M270 -310 Q320 -200 300 -110 Q296 -70 330 -76" fill="none" stroke={INK} strokeWidth="56" strokeLinecap="round" />
        <path d="M270 -310 Q320 -200 300 -110 Q296 -70 330 -76" fill="none" stroke="#9C9184" strokeWidth="40" strokeLinecap="round" />
        {[-260, -220, -180, -140].map((y) => (
          <path key={y} d={`M${296 + (y + 260) * 0.05} ${y} q-14 4 -24 -2`} fill="none" stroke="#6E6458" strokeWidth="4" strokeLinecap="round" />
        ))}
        <path d="M250 -290 Q300 -250 330 -270" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M250 -290 Q300 -250 330 -270" fill="none" stroke="#FBF1DC" strokeWidth="12" strokeLinecap="round" />
        <path d="M150 -420 Q60 -400 70 -300 Q80 -220 160 -250 Z" fill="#8A7F72" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M130 -390 Q90 -360 100 -300" fill="none" stroke="#C7A99A" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
        <circle cx="236" cy="-370" r="11" fill={INK} />
        <circle cx="240" cy="-374" r="3.5" fill="#FFFFFF" />
        <path d="M220 -398 q16 -10 30 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "deo-cay-vun": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={230} ry={22} />
        {/* Mẩu cày gãy */}
        <path d="M-120 -16 L60 -90" stroke={INK} strokeWidth="30" strokeLinecap="round" />
        <path d="M-120 -16 L60 -90" stroke="#9A6236" strokeWidth="18" strokeLinecap="round" />
        <path d="M-110 -26 L50 -92" stroke="#D9A46A" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <path d="M60 -90 l10 -20 l8 22 l14 -10" fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {/* Vụn gỗ */}
        {[
          [-170, -10], [-110, -40], [-40, -20], [20, -8], [90, -30], [150, -12], [-80, -6], [120, -50], [190, -6], [-200, -30],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} l26 -${10 + (i % 3) * 6} l10 18 Z`} fill={i % 2 ? "#E9C48E" : "#C08A55"} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
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
          <g key={x}>
            <SoftShadow cx={x} cy={-2} rx={40} />
            <rect x={x - 15} y="-560" width="30" height="560" rx="8" fill="url(#w-wood-h)" stroke={INK} strokeWidth="7" />
            {[-420, -260, -100].map((y) => (
              <line key={y} x1={x - 13} y1={y} x2={x + 13} y2={y} stroke="#5E3A20" strokeWidth="4" />
            ))}
          </g>
        ))}
        {/* Dây cờ đuôi nheo dưới băng rôn */}
        <path d="M-210 -432 Q0 -392 210 -432" fill="none" stroke={INK} strokeWidth="4" />
        {[-170, -120, -70, -20, 30, 80, 130, 180].map((x, i) => {
          const y = -430 + 40 * (1 - Math.pow(x / 210, 2)) - 2;
          return <path key={x} d={`M${x - 14} ${y - 6} L${x + 14} ${y - 6} L${x} ${y + 24} Z`} fill={["#B8513A", "#E3A631", "#7FA557"][i % 3]} stroke={INK} strokeWidth="3" strokeLinejoin="round" />;
        })}
        <rect x="-226" y="-566" width="452" height="124" rx="10" fill="url(#w-paper)" stroke={INK} strokeWidth="8" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={-216 + i * 40} y={i % 2 ? -474 : -466} width="20" height="20" fill={INK} />
        ))}
        <Lines text={text ?? "ĐÍCH"} cy={-516} width={380} max={70} color="#8E2C22" font={TEXT_FONT} />
      </g>
    ),
  },
  "tho-rua-cay": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-4} rx={200} ry={28} />
        <Tree x={0} y={0} s={1.15} />
      </g>
    ),
  },

  // ------------------------------------------------ Mài sắt nên kim
  "ly-bach-thanh-sat": {
    mode: "extend",
    draw: () => (
      <g>
        <rect x="-16" y="-40" width="32" height="230" rx="8" fill="url(#w-dark)" stroke={INK} strokeWidth="7" />
        <line x1="-6" y1="-28" x2="-6" y2="178" stroke="#B8B2A8" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        <path d="M6 30 l4 10 M8 110 l-4 12" stroke="#8A5530" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </g>
    ),
  },
  "ly-bach-kim": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M-8 -20 L8 -20 L2 190 L-2 190 Z" fill="url(#w-metal)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="0" cy="-4" rx="3.5" ry="9" fill={INK} />
        <path d="M-3 20 L-1 150" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 110 L48 130 L68 138 L48 146 L40 166 L32 146 L12 138 L32 130 Z" fill="#FFE9A0" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M-40 60 L-35 74 L-22 79 L-35 84 L-40 98 L-45 84 L-58 79 L-45 74 Z" fill="#FFE9A0" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
    ),
  },
  "ly-bach-da-mai": {
    mode: "upright",
    draw: () => (
      <g>
        <T3Defs />
        <SoftShadow cy={-4} rx={210} ry={26} />
        <path d="M-170 0 L-180 -80 Q-150 -130 -40 -134 L120 -130 Q176 -120 180 -70 L174 0 Z" fill="url(#t3-stone)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        {/* Mặt mài lõm, bóng nước */}
        <path d="M-130 -116 Q0 -96 140 -114" fill="none" stroke="#6E6458" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <path d="M-150 -110 Q0 -128 150 -110" fill="none" stroke="#F1E6D2" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
        <path d="M-120 -50 L-80 -70 M40 -40 L90 -66" fill="none" stroke="#6E6458" strokeWidth="6" strokeLinecap="round" />
        {/* Rêu chân đá */}
        <path d="M-176 -20 Q-150 -40 -120 -16 Q-100 -34 -70 -4 L-174 0 Z" fill={PAL.leafDark} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M120 -6 Q140 -30 172 -14 L174 0 L118 0 Z" fill={PAL.leaf} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
    ),
  },
};

// ================================================================ phông

/** Bông hoa dại nhỏ (cánh kem, nhụy nghệ), gốc ở (x, y). */
const WildFlower: React.FC<{ x: number; y: number; s?: number; petal?: string }> = ({ x, y, s = 1, petal = "#FBF1DC" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 Q4 -30 0 -60" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
    <path d="M0 0 Q4 -30 0 -60" fill="none" stroke={PAL.leafDark} strokeWidth="4" strokeLinecap="round" />
    <path d="M2 -24 q16 -14 26 -4 q-12 10 -26 4 Z" fill={PAL.leaf} stroke={INK} strokeWidth="3" />
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="0" cy="-74" rx="8" ry="13" transform={`rotate(${a} 0 -62)`} fill={petal} stroke={INK} strokeWidth="3" />
    ))}
    <circle cx="0" cy="-62" r="7" fill={PAL.turmeric} stroke={INK} strokeWidth="3" />
  </g>
);

/** Đồng cỏ mùa hè: núi xa, đồi, cây nhãn bên trái, tổ kiến ụ đất bên phải, hoa dại. */
const VeKienHe: React.FC = () => (
  <>
    <WarmSky id="t3-he-sky" h={FLOOR} top="#F2C27A" bottom="#FCEBC4" sun={[860, 380]} />
    <VCloud x={320} y={360} s={1} />
    <VCloud x={640} y={520} s={0.6} />
    <FarMountains peaks={[[300, 760, 280], [700, 720, 320]]} foot={940} color="#D8C29C" shade="#BFA57E" line="#9A8262" />
    <Hills id="t3-he-h1" y={910} amp={50} waves={2} phase={1} top="#BCD08A" base="#93AE62" line="#6E5A3E" sw={5} />
    <Tree x={620} y={980} s={0.38} tone="far" />
    <Hills id="t3-he-h2" y={1020} amp={30} waves={2} phase={2.4} top="#A9C77A" base="#86A85A" />
    <Floor color="#A3BC6C" line="#8CA75A" />
    {/* Cây nhãn to bên trái */}
    <Tree x={110} y={FLOOR + 10} s={0.95} />
    {/* Tổ kiến ụ đất bên phải */}
    <SoftShadow cx={930} cy={FLOOR} rx={200} ry={24} />
    <path d={`M780 ${FLOOR + 6} Q830 1090 930 1074 Q1040 1080 1090 ${FLOOR + 6} Z`} fill="url(#t3-earth)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M820 1170 Q860 1100 920 1090" fill="none" stroke="#E2B98A" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
    <ellipse cx="930" cy="1126" rx="30" ry="22" fill="#3A2416" stroke={INK} strokeWidth="5" />
    {[[870, 1190], [990, 1160], [1030, 1210]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="5" fill="#6E4626" />
    ))}
    <WildFlower x={300} y={FLOOR - 4} s={0.9} />
    <WildFlower x={720} y={FLOOR - 6} s={0.8} petal="#F2B8A0" />
    <GrassTuft x={260} y={1420} s={1.2} />
    <GrassTuft x={830} y={1470} s={1.3} flip />
    <WildFlower x={120} y={1500} s={1.3} petal="#F2B8A0" />
    <WildFlower x={980} y={1560} s={1.2} />
    <SkyRays from={[860, 380]} opacity={0.12} />
  </>
);

/** Mùa đông: trời xám ấm, tuyết, cây trụi lá bên trái, nhà kiến ụ đất phủ tuyết bên phải (cửa sổ sáng đèn). */
const VeKienDong: React.FC = () => (
  <>
    <T3Defs />
    <WarmSky id="t3-dong-sky" h={FLOOR} top="#B5A897" bottom="#EDE3D3" sun={[820, 300]} />
    <VCloud x={260} y={360} s={1.4} color="#E3D8C8" />
    <VCloud x={780} y={420} s={1.1} color="#E3D8C8" />
    <FarMountains peaks={[[220, 760, 300], [620, 700, 300], [980, 780, 240]]} foot={980} color="#CFC3B2" shade="#B3A694" line="#948672" snow />
    <Hills id="t3-dong-h1" y={980} amp={40} waves={2} phase={0.5} top="#FBF4E6" base="#E6D8C2" line="#8A7458" sw={5} />
    {/* Gió bấc */}
    {[540, 640, 740].map((y, i) => (
      <path key={y} d={`M${220 + i * 60} ${y} q80 -30 160 0 t160 0 q40 -10 30 -40`} fill="none" stroke="#FFF8EA" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
    ))}
    <Floor color="#EDE3D3" line="#D6C8B2" />
    {/* Cây trụi lá có tuyết đọng */}
    <g strokeLinecap="round" fill="none">
      <path d={`M130 ${FLOOR} L140 720 M140 860 L60 740 M140 800 L230 690 M140 740 L100 640 M230 690 L270 640 M60 740 L30 700`} stroke={INK} strokeWidth="28" />
      <path d={`M130 ${FLOOR} L140 720 M140 860 L60 740 M140 800 L230 690 M140 740 L100 640 M230 690 L270 640 M60 740 L30 700`} stroke="#7B4B28" strokeWidth="16" />
      <path d={`M126 ${FLOOR - 20} L134 760`} stroke="#A9764A" strokeWidth="5" />
    </g>
    <path d="M42 734 q20 -16 38 4 M204 698 q24 -14 36 6 M90 652 q12 -10 22 0 M248 650 q12 -10 24 0" fill="none" stroke="#FFF8EA" strokeWidth="11" strokeLinecap="round" />
    {/* Nhà kiến: ống khói, ụ đất, mái tuyết, cửa tròn, cửa sổ đèn */}
    <rect x="950" y="760" width="46" height="120" fill="#A9553C" stroke={INK} strokeWidth="7" />
    <path d="M944 760 q29 -18 58 0" fill="#FFF8EA" stroke={INK} strokeWidth="5" />
    <path d="M972 740 q-30 -40 0 -80 q30 -40 0 -80" fill="none" stroke="#FFF8EA" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
    <SoftShadow cx={900} cy={FLOOR} rx={240} ry={26} />
    <path d={`M700 ${FLOOR + 6} Q720 820 900 800 Q1080 800 1100 ${FLOOR + 6} Z`} fill="url(#t3-earth)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M730 950 Q760 820 900 806 Q1060 806 1090 900 Q1000 860 900 870 Q800 870 730 950 Z" fill="url(#t3-snow)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M770 900 q10 26 0 40 M1040 880 q8 20 0 34" fill="none" stroke="#FFF8EA" strokeWidth="10" strokeLinecap="round" />
    <path d={`M818 ${FLOOR + 6} L818 1040 Q886 950 954 1040 L954 ${FLOOR + 6} Z`} fill="url(#w-wood)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    {[850, 886, 922].map((x) => (
      <line key={x} x1={x} y1="1000" x2={x} y2={FLOOR} stroke="#5E3A20" strokeWidth="4" opacity="0.6" />
    ))}
    <circle cx="930" cy="1130" r="9" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
    <circle cx="760" cy="1000" r="70" fill="url(#w-glow)" />
    <circle cx="760" cy="1000" r="34" fill="#F4C55A" stroke={INK} strokeWidth="7" />
    <path d="M760 966 L760 1034 M726 1000 L794 1000" stroke={INK} strokeWidth="5" />
    {/* Tuyết rơi */}
    {Array.from({ length: 34 }, (_, i) => (
      <circle key={i} cx={(i * 211) % 1080} cy={300 + ((i * 337) % 880)} r={i % 3 === 0 ? 9 : 6} fill="#FFF8EA" stroke="#B3A694" strokeWidth="2" />
    ))}
    {/* Ụ tuyết tiền cảnh hai mép */}
    <path d="M-20 1300 Q60 1236 160 1276 Q210 1296 224 1340 L-20 1340 Z" fill="url(#t3-snow)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M1100 1310 Q1010 1240 920 1284 Q886 1304 876 1344 L1100 1344 Z" fill="url(#t3-snow)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
  </>
);

/** Đảo hoang: bãi cát bên trái, vách đá, cây dừa; biển bên phải (thuyền ghé ở x ≈ 0.86). */
const AnTiemDao: React.FC = () => (
  <>
    <T3Defs />
    <WarmSky id="t3-dao-sky" h={FLOOR} top="#F3C98A" bottom="#FCEFD2" sun={[860, 520]} />
    <VCloud x={420} y={380} s={0.9} />
    <VCloud x={900} y={260} s={0.6} />
    {/* Biển và đảo xa */}
    <path d="M560 790 Q620 730 690 760 Q740 720 800 790 Z" fill="#B9AE92" stroke="#8A7458" strokeWidth="4" strokeLinejoin="round" />
    <path d="M900 790 Q940 760 990 790 Z" fill="#B9AE92" stroke="#8A7458" strokeWidth="4" strokeLinejoin="round" />
    <WaterBand id="t3-dao-sea" y0={786} y1={FLOOR} top="#A9C6BC" bottom="#5E8E96" ripples={12} />
    <path d="M800 800 L920 800" stroke="#FFF3D6" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
    {/* Chim hải âu */}
    <path d="M620 520 q14 -14 28 0 q14 -14 28 0 M720 470 q10 -10 20 0 q10 -10 20 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    {/* Đảo cát và vách đá */}
    <path d={`M0 900 Q300 860 520 960 Q650 1030 720 ${FLOOR} L0 ${FLOOR} Z`} fill="url(#t3-sand)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M40 920 Q220 900 400 960" fill="none" stroke="#FFF3D6" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
    <path d="M0 910 L0 640 Q60 600 120 660 Q170 610 230 700 L270 910 Q130 930 0 910 Z" fill="url(#t3-stone)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M40 700 L90 760 M160 720 L200 800 M100 820 L150 860" stroke="#7A6F60" strokeWidth="7" strokeLinecap="round" />
    <path d="M20 680 Q60 640 110 676" fill="none" stroke="#E9DFCE" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
    <path d="M200 700 q20 -30 40 -10 q14 -20 30 0" fill={PAL.leaf} stroke={INK} strokeWidth="4" />
    {/* Cây dừa */}
    <SoftShadow cx={350} cy={1012} rx={90} ry={14} />
    <path d="M350 1010 Q330 820 400 640" fill="none" stroke={INK} strokeWidth="34" strokeLinecap="round" />
    <path d="M350 1010 Q330 820 400 640" fill="none" stroke="#9A6236" strokeWidth="22" strokeLinecap="round" />
    {[980, 940, 900, 860, 820, 780, 740, 700].map((y, i) => (
      <path key={y} d={`M${338 + i * 6 - 10} ${y} q12 6 22 0`} fill="none" stroke="#5E3A20" strokeWidth="4" strokeLinecap="round" />
    ))}
    {[
      ["M400 640 Q300 560 220 620 Q300 600 400 650", PAL.leafDark],
      ["M400 640 Q480 540 590 590 Q490 590 400 650", PAL.leaf],
      ["M400 640 Q360 520 280 500 Q370 560 396 648", PAL.leaf],
      ["M400 640 Q470 640 520 730 Q450 680 400 650", PAL.leafDark],
      ["M400 640 Q440 530 500 500 Q450 560 404 646", PAL.leafLight],
    ].map(([d, c], i) => (
      <path key={i} d={d} fill={c} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    ))}
    {[[388, 656], [410, 662], [398, 676]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="14" fill="url(#w-clay)" stroke={INK} strokeWidth="4" />
    ))}
    {/* Sàn: cát bên trái, nước bên phải */}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#t3-sea)" />
    <path d={`M0 ${FLOOR} L720 ${FLOOR} Q760 1400 700 1920 L0 1920 Z`} fill="url(#t3-sand)" />
    <path d={`M720 ${FLOOR} Q760 1400 700 1920`} fill="none" stroke="#FFF3D6" strokeWidth="10" opacity="0.8" />
    {[1300, 1420, 1560, 1720].map((y, i) => (
      <path key={y} d={`M${780 + i * 10} ${y} q30 -12 60 0 t60 0 t60 0`} fill="none" stroke="#F4ECD6" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    ))}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#floor-shade-t3)" />
    <defs>
      <linearGradient id="floor-shade-t3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.2" />
        <stop offset="0.3" stopColor="#3A2416" stopOpacity="0" />
        <stop offset="1" stopColor="#2A170C" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <rect x="0" y={FLOOR - 4} width="720" height="8" fill={INK} opacity="0.85" />
    {/* Vỏ sò, khóm cỏ tiền cảnh */}
    <path d="M200 1500 q20 -30 40 0 Z M420 1620 q16 -24 32 0 Z" fill="#F2B8A0" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <GrassTuft x={60} y={1400} s={1.2} />
  </>
);

/** Đường làng: lũy tre hai mép, nhà ngói xa, đồng lúa, đường đất giữa. */
const DeoCayDuong: React.FC = () => (
  <>
    <WarmSky id="t3-lang-sky" h={FLOOR} sun={[700, 360]} />
    <VCloud x={300} y={340} s={1} />
    <VCloud x={820} y={480} s={0.6} />
    <DistantTrees y={880} />
    <VillageHouse x={760} y={900} s={0.3} />
    {/* Đồng lúa */}
    <Hills id="t3-lang-ruong" y={900} amp={10} waves={1} top="#C9CF7A" base="#9DB65A" line="#6E5A3E" sw={5} />
    {[950, 1010, 1080, 1160].map((y, i) => (
      <path key={y} d={`M-20 ${y} Q540 ${y - 20} 1100 ${y}`} fill="none" stroke="#7E9B48" strokeWidth={4 + i * 2} opacity="0.7" />
    ))}
    {Array.from({ length: 16 }, (_, i) => (
      <path key={i} d={`M${30 + i * 68} ${1120 + (i % 3) * 30} q-6 -24 0 -36 m0 36 q6 -24 14 -32`} fill="none" stroke={PAL.leafDark} strokeWidth="4" strokeLinecap="round" />
    ))}
    {/* Đường đất hội tụ */}
    <path d={`M470 900 L560 900 Q700 1050 920 ${FLOOR} L120 ${FLOOR} Q360 1050 470 900 Z`} fill="#D9B27A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d={`M500 920 Q420 1060 260 ${FLOOR}`} fill="none" stroke="#B98A55" strokeWidth="5" opacity="0.6" />
    <path d={`M540 920 Q640 1060 780 ${FLOOR}`} fill="none" stroke="#B98A55" strokeWidth="5" opacity="0.6" />
    <Floor color="#C9A06A" line="#B48C58" />
    <Bamboo x={70} y={FLOOR + 20} s={0.95} />
    <Bamboo x={1010} y={FLOOR + 20} s={1} flip />
    <GrassTuft x={210} y={FLOOR + 4} s={0.9} />
    <GrassTuft x={880} y={FLOOR + 4} s={0.9} flip />
    <GrassTuft x={140} y={1520} s={1.3} />
    <GrassTuft x={960} y={1460} s={1.2} flip />
  </>
);

/** Đường đua qua đồng cỏ: đồi lượn, cây xa, cờ xuất phát bên trái, đường đất. */
const ThoRuaDongCo: React.FC = () => (
  <>
    <WarmSky id="t3-dua-sky" h={FLOOR} sun={[860, 360]} />
    <VCloud x={330} y={380} s={1} />
    <VCloud x={620} y={260} s={0.6} />
    <FarMountains peaks={[[200, 760, 260], [560, 700, 300], [940, 740, 260]]} foot={920} color="#D8C29C" shade="#BFA57E" line="#9A8262" />
    <Hills id="t3-dua-h1" y={880} amp={70} waves={2} phase={0.3} top="#BCD08A" base="#93AE62" line="#6E5A3E" sw={5} />
    <Tree x={820} y={960} s={0.4} tone="far" />
    <Tree x={380} y={990} s={0.32} tone="far" flip />
    <Hills id="t3-dua-h2" y={1040} amp={36} waves={2} phase={1.7} top="#A9C77A" base="#86A85A" />
    {/* Đường đất */}
    <path d={`M-20 1150 Q540 1110 1100 1150 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="#D9B27A" stroke={INK} strokeWidth="6" />
    <path d="M60 1170 Q540 1136 1020 1170" fill="none" stroke="#F2D9A6" strokeWidth="6" opacity="0.7" strokeLinecap="round" />
    <Floor color="#C9A06A" line="#B48C58" />
    {/* Cờ xuất phát */}
    <SoftShadow cx={60} cy={FLOOR} rx={40} />
    <line x1="60" y1={FLOOR} x2="60" y2="800" stroke={INK} strokeWidth="16" strokeLinecap="round" />
    <line x1="60" y1={FLOOR} x2="60" y2="800" stroke="#9A6236" strokeWidth="8" strokeLinecap="round" />
    <path d="M66 820 Q130 806 190 822 L190 906 Q130 890 66 904 Z" fill="#FBF1DC" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].map((c) => ((r + c) % 2 ? <rect key={`${r}${c}`} x={66 + c * 31} y={824 + r * 26} width="31" height="26" fill="#3A2416" /> : null)),
    )}
    <circle cx="60" cy="796" r="12" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
    <GrassTuft x={170} y={FLOOR + 2} s={0.9} />
    <GrassTuft x={980} y={FLOOR + 2} s={1} flip />
    <GrassTuft x={120} y={1500} s={1.3} />
    <GrassTuft x={940} y={1560} s={1.3} flip />
  </>
);

/** Bờ suối dưới chân núi: núi xa, đồi, suối chảy, liễu bên phải, lau sậy, đá cuội. */
const LyBachSuoi: React.FC = () => (
  <>
    <T3Defs />
    <WarmSky id="t3-suoi-sky" h={FLOOR} sun={[260, 380]} />
    <VCloud x={700} y={340} s={0.9} />
    <FarMountains peaks={[[140, 560, 220], [420, 480, 260], [760, 540, 260], [1000, 620, 200]]} foot={960} color="#CDB898" shade="#B09A78" line="#8A7458" snow />
    <Hills id="t3-suoi-h1" y={950} amp={40} waves={2} phase={1.1} top="#BCD08A" base="#93AE62" line="#6E5A3E" sw={5} />
    <WaterBand id="t3-suoi-water" y0={1040} y1={1150} ripples={8} />
    <path d={`M-20 1150 Q300 1130 540 1152 Q800 1170 1100 1146 L1100 ${FLOOR + 10} L-20 ${FLOOR + 10} Z`} fill="#C9B48E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <Floor color="#C9B48E" line="#B19C78" />
    {/* Liễu bên phải */}
    <SoftShadow cx={970} cy={1160} rx={120} ry={18} />
    <path d="M960 1160 Q940 900 990 640" fill="none" stroke={INK} strokeWidth="36" strokeLinecap="round" />
    <path d="M960 1160 Q940 900 990 640" fill="none" stroke="#7B4B28" strokeWidth="24" strokeLinecap="round" />
    <path d="M952 1120 Q936 900 976 700" fill="none" stroke="#B87C48" strokeWidth="6" strokeLinecap="round" />
    <Canopy blobs={[[900, 600, 90], [1010, 570, 110], [1080, 640, 80], [960, 670, 80]]} />
    {[840, 880, 930, 1000, 1050].map((x, i) => (
      <g key={x}>
        <path d={`M${x} 640 Q${x - 14} 760 ${x + 6} ${860 + (i % 2) * 50}`} fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
        <path d={`M${x} 640 Q${x - 14} 760 ${x + 6} ${860 + (i % 2) * 50}`} fill="none" stroke={PAL.leaf} strokeWidth="5" strokeLinecap="round" />
      </g>
    ))}
    <Reeds x={60} y={1170} s={0.8} />
    {/* Đá cuội bờ suối */}
    {[[120, 1214, 40], [300, 1226, 26], [700, 1220, 30], [860, 1228, 22]].map(([x, y, r], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={r} ry={r * 0.6} fill="url(#t3-stone)" stroke={INK} strokeWidth="5" />
        <path d={`M${x - r * 0.5} ${y - r * 0.25} q${r * 0.3} -${r * 0.2} ${r * 0.6} -${r * 0.1}`} fill="none" stroke="#F1E6D2" strokeWidth="4" strokeLinecap="round" />
      </g>
    ))}
    <GrassTuft x={200} y={1480} s={1.2} />
    <GrassTuft x={980} y={1420} s={1.2} flip />
    <SkyRays from={[260, 380]} opacity={0.1} />
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
