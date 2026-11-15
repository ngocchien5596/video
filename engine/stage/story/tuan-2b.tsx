/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 2b (Nói vậy). Tên khai báo ở engine/lib/story/tuan-2b.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 *
 * Truyện: Sơn Tinh, Thủy Tinh (tập 12) · Vẽ rắn thêm chân (tập 13) · Lợn cưới, áo mới (tập 14).
 */
import React from "react";
import type { PropTuan2B, RoleTuan2B, SceneTuan2B } from "../../lib/story/tuan-2b.ts";
import { Floor, FLOOR, LINE as INK, type PropDef } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";
import {
  Bamboo,
  BambooFence,
  BrickYard,
  Canopy,
  Cloud as VCloud,
  DistantTrees,
  FarMountains,
  GrassTuft,
  Hills,
  Jar,
  PAL,
  PotPlant,
  Reeds,
  Shine,
  SoftShadow,
  SkyRays,
  ThatchHut,
  TileRoof,
  WarmSky,
} from "../village.tsx";

// ---------------------------------------------------------------- phần vẽ dùng chung

/** Mặt + tai người (khung đầu như vai mẫu). */
const Face: React.FC<{ skin: string; ears?: boolean }> = ({ skin, ears = true }) => (
  <>
    {ears ? (
      <>
        <ellipse cx="92" cy="208" rx="15" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
        <ellipse cx="268" cy="208" rx="15" ry="20" fill={skin} stroke={INK} strokeWidth="6" />
      </>
    ) : null}
    <rect x="92" y="112" width="176" height="178" rx="74" fill={skin} stroke={INK} strokeWidth="7" />
  </>
);

/** Áo dài chấm gót (thân y 300–490). */
const Robe: React.FC<{ fill: string; children?: React.ReactNode }> = ({ fill, children }) => (
  <g>
    <path d="M116 312 Q180 292 244 312 L264 482 Q180 496 96 482 Z" fill={fill} stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {children}
  </g>
);

/** Hoa nhỏ năm cánh (hoa văn áo mới). */
const Flower: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 9 }) => (
  <g>
    {[0, 72, 144, 216, 288].map((a) => (
      <circle
        key={a}
        cx={x + Math.sin((a * Math.PI) / 180) * r}
        cy={y - Math.cos((a * Math.PI) / 180) * r}
        r={r * 0.62}
        fill="#2E2420"
      />
    ))}
    <circle cx={x} cy={y} r={r * 0.5} fill="#E3B23C" />
  </g>
);

// ---------------------------------------------------------------- vai

const SKIN = "#F3D2AA";

export const roles: Record<RoleTuan2B, Role> = {
  "son-tinh": {
    look: { skin: SKIN, sleeve: "#E3DCC0", legs: "#2F5A30", shoe: "#2E2420", arm: 26 },
    headY: 40,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 200, browY: 170, mouthY: 250, browColor: INK };
      return (
        <g>
          <Face skin={SKIN} />
          <path d="M86 162 C80 92 280 92 274 162 Q230 142 180 144 Q130 142 86 162 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          {/* Mũ ba đỉnh núi, đỉnh phủ tuyết */}
          <path d="M92 140 L122 62 L150 108 L180 22 L210 108 L238 62 L268 140 Z" fill="#2F5A30" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M111 90 L122 62 L133 90 Z M166 62 L180 22 L194 62 Z M227 90 L238 62 L249 90 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <rect x="88" y="128" width="184" height="22" rx="8" fill="#E3B23C" stroke={INK} strokeWidth="6" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Râu quai nón ngắn */}
          <path d="M118 262 Q130 300 180 304 Q230 300 242 262 Q226 286 180 288 Q134 286 118 262 Z" fill="#2E2420" stroke={INK} strokeWidth="4" />
        </g>
      );
    },
    Torso: () => (
      <Robe fill="#E3DCC0">
        {/* Gấu áo thêu dãy núi */}
        <path d="M104 482 L134 432 L164 482 Z M150 486 L180 426 L210 486 Z M196 482 L226 432 L256 482 Z" fill="#2F5A30" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M150 304 L180 344 L210 304" fill="none" stroke="#2F5A30" strokeWidth="9" strokeLinecap="round" />
        <rect x="108" y="384" width="144" height="20" rx="6" fill="#2F5A30" stroke={INK} strokeWidth="6" />
      </Robe>
    ),
  },
  "thuy-tinh": {
    look: { skin: "#CFE0E6", sleeve: "#1F3E66", legs: "#12263F", shoe: "#0B1626", arm: 26 },
    headY: 50,
    Head: ({ expr, talk, blink }) => {
      const skin = "#CFE0E6";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 200, browY: 168, mouthY: 248, browColor: INK };
      return (
        <g>
          {/* Tai vây cá */}
          <path d="M98 186 L48 150 L62 198 L44 240 L98 228 Z" fill="#2E6C8E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M262 186 L312 150 L298 198 L316 240 L262 228 Z" fill="#2E6C8E" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <Face skin={skin} ears={false} />
          {/* Tóc dựng như ngọn sóng, bọt trắng ở đầu sóng */}
          <path
            d="M84 166 C68 112 88 70 124 58 Q110 92 138 98 Q128 50 174 30 Q160 72 192 80 Q198 36 240 40 Q216 66 236 90 Q276 86 276 166 Q240 132 180 138 Q120 132 84 166 Z"
            fill="#183A5C"
            stroke={INK}
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path d="M124 58 q-14 4 -12 18 M174 30 q-16 8 -10 22 M240 40 q-16 2 -16 16" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#5A1E2E" />
          {/* Râu gợn sóng */}
          <path d="M136 270 Q146 304 162 292 Q172 326 188 302 Q204 324 212 292 Q228 302 226 270 Q180 284 136 270 Z" fill="#183A5C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <Robe fill="#1F3E66">
        {[430, 462].map((y) => (
          <path key={y} d={`M108 ${y} q19 -16 38 0 t38 0 t38 0 t38 0`} fill="none" stroke="#9CC9E8" strokeWidth="6" strokeLinecap="round" />
        ))}
        <path d="M150 304 L180 344 L210 304" fill="none" stroke="#9CC9E8" strokeWidth="8" strokeLinecap="round" />
        <rect x="108" y="384" width="144" height="20" rx="6" fill="#2E6C8E" stroke={INK} strokeWidth="6" />
      </Robe>
    ),
  },
  "so-khach-ruou": {
    look: { skin: SKIN, sleeve: "#E6E1D3", legs: "#5C4128", shoe: "#2E2420", arm: 26 },
    headY: 70,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 196, browY: 168, mouthY: 248, browColor: "#555555" };
      return (
        <g>
          <Face skin={SKIN} />
          <path d="M86 160 C80 84 280 84 274 160 Q230 136 180 138 Q130 136 86 160 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          {/* Búi tóc cài trâm */}
          <circle cx="180" cy="80" r="28" fill="#2E2420" stroke={INK} strokeWidth="7" />
          <path d="M122 74 L242 90" stroke={INK} strokeWidth="14" strokeLinecap="round" />
          <path d="M122 74 L242 90" stroke="#E3B23C" strokeWidth="7" strokeLinecap="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Ria rủ và râu dài bạc */}
          <path d="M180 230 Q150 230 136 256 M180 230 Q210 230 224 256" fill="none" stroke="#DADADA" strokeWidth="9" strokeLinecap="round" />
          <path d="M150 272 Q170 280 180 280 Q190 280 210 272 Q206 340 180 370 Q154 340 150 272 Z" fill="#E6E6E6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </g>
      );
    },
    Torso: () => (
      <Robe fill="#E6E1D3">
        {/* Cổ áo giao lĩnh */}
        <path d="M144 304 L206 392 M216 304 L170 360" fill="none" stroke="#5C4128" strokeWidth="12" strokeLinecap="round" />
        <rect x="108" y="392" width="144" height="22" rx="6" fill="#8E3B2F" stroke={INK} strokeWidth="6" />
      </Robe>
    ),
  },
  "so-khach-chan": {
    look: { skin: "#F6D5B0", sleeve: "#3A2F4A", legs: "#E6E1D3", shoe: "#2E2420", arm: 24 },
    headY: 92,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F6D5B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 176, mouthY: 254, browColor: INK };
      return (
        <g>
          <Face skin={skin} />
          {/* Mũ tròn đen có núm */}
          <path d="M84 160 C84 66 276 66 276 160 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="80" y="146" width="200" height="22" rx="10" fill="#3A2F4A" stroke={INK} strokeWidth="6" />
          <circle cx="180" cy="76" r="14" fill="#B8402E" stroke={INK} strokeWidth="5" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
          {/* Ria mảnh vểnh */}
          <path d="M178 236 Q152 240 138 222 M182 236 Q208 240 222 222" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <Robe fill="#3A2F4A">
        <path d="M144 304 L206 392 M216 304 L170 360" fill="none" stroke="#F2EBDD" strokeWidth="12" strokeLinecap="round" />
        <rect x="108" y="392" width="144" height="22" rx="6" fill="#E3B23C" stroke={INK} strokeWidth="6" />
      </Robe>
    ),
  },
  "ao-moi": {
    look: { skin: "#F6D5B0", sleeve: "#FAFAF5", legs: "#2B2B3A", shoe: "#2E2420", arm: 26 },
    headY: 76,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F6D5B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 202, browY: 174, mouthY: 252, browColor: INK };
      return (
        <g>
          <Face skin={skin} />
          <path d="M86 162 C80 86 280 86 274 162 Q230 140 180 142 Q130 140 86 162 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          {/* Búi tó củ hành */}
          <path d="M150 96 Q180 40 210 96 Z" fill="#2E2420" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="126" cy="232" rx="11" ry="7" fill="#F2A08A" opacity="0.75" />
          <ellipse cx="234" cy="232" rx="11" ry="7" fill="#F2A08A" opacity="0.75" />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#B03A2E" />
        </g>
      );
    },
    Torso: () => (
      <Robe fill="#FAFAF5">
        {[
          [140, 360],
          [210, 352],
          [176, 420],
          [126, 448],
          [234, 452],
          [190, 470],
        ].map(([x, y]) => (
          <Flower key={`${x}-${y}`} x={x} y={y} />
        ))}
        {/* Cổ áo vàng, khuy áo */}
        <path d="M146 304 Q180 330 214 304" fill="none" stroke="#E3B23C" strokeWidth="12" strokeLinecap="round" />
        <path d="M146 304 Q180 330 214 304" fill="none" stroke={INK} strokeWidth="3" />
        <rect x="108" y="390" width="144" height="16" rx="6" fill="#E3B23C" stroke={INK} strokeWidth="5" />
      </Robe>
    ),
  },
  "tim-lon": {
    look: { skin: "#E2A574", sleeve: "#5C4128", legs: "#D9CBB0", shoe: "#E2A574", arm: 26 },
    headY: 92,
    Head: ({ expr, talk, blink }) => {
      const skin = "#E2A574";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 178, mouthY: 254, browColor: INK };
      return (
        <g>
          <Face skin={skin} />
          <path d="M86 162 C80 92 280 92 274 162 Q230 142 180 144 Q130 142 86 162 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
          {/* Khăn quấn đầu, nút khăn chổng lên */}
          <path d="M84 150 Q180 106 276 150 L272 176 Q180 136 88 176 Z" fill="#7A5A3A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          <path d="M236 132 Q262 92 282 108 Q270 124 252 140 Z" fill="#7A5A3A" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
          {/* Giọt mồ hôi trên trán */}
          <path d="M236 176 Q228 192 236 198 Q244 192 236 176 Z" fill="#BFE6FF" stroke={INK} strokeWidth="3" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          <path d="M150 276 q30 10 60 0" fill="none" stroke="#9C6B3C" strokeWidth="4" strokeDasharray="2 8" strokeLinecap="round" />
        </g>
      );
    },
    Torso: () => (
      <g>
        {/* Quần xắn ống sáng màu, áo nâu ngắn */}
        <path d="M120 420 L240 420 L248 468 L112 468 Z" fill="#D9CBB0" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M112 312 Q180 292 248 312 L246 438 L114 438 Z" fill="#5C4128" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M150 304 L180 340 L210 304" fill="none" stroke="#3B2A1A" strokeWidth="7" strokeLinecap="round" />
        {[356, 384, 412].map((y) => (
          <circle key={y} cx="182" cy={y} r="5" fill="#D9CBB0" stroke={INK} strokeWidth="3" />
        ))}
        <path d="M140 380 l20 10 M214 360 l-14 14" stroke="#3B2A1A" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- đạo cụ

/** Gradient riêng của đạo cụ tuần 2b (objectBoundingBox, khai báo kèm mỗi đạo cụ dùng). */
const PropDefs: React.FC = () => (
  <defs>
    <linearGradient id="t2b-hide" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#B4AAA0" />
      <stop offset="1" stopColor="#6F665E" />
    </linearGradient>
    <linearGradient id="t2b-cream" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FBF3E2" />
      <stop offset="1" stopColor="#D9CBB0" />
    </linearGradient>
    <linearGradient id="t2b-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#EAD7AE" />
      <stop offset="1" stopColor="#C4A574" />
    </linearGradient>
    <linearGradient id="t2b-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5E8E96" />
      <stop offset="1" stopColor="#2E4E5E" />
    </linearGradient>
    <linearGradient id="t2b-hill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8FB062" />
      <stop offset="1" stopColor="#4E7A3A" />
    </linearGradient>
    <linearGradient id="t2b-skirt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#5A3E52" />
      <stop offset="1" stopColor="#2E2030" />
    </linearGradient>
  </defs>
);

/** Ô đất cát vẽ rắn: `legs` = rắn có chân, `snake` = đã vẽ rắn. */
const SandTray: React.FC<{ snake?: boolean; legs?: boolean }> = ({ snake, legs }) => (
  <g>
    <PropDefs />
    <SoftShadow cy={-2} rx={200} ry={20} />
    <path d="M-150 -180 L150 -180 L180 0 L-180 0 Z" fill="url(#t2b-sand)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M-150 -180 L150 -180 L154 -160 L-154 -160 Z" fill="#8A6A3E" opacity="0.35" />
    <path d="M-120 -140 l14 6 M100 -26 l18 4 M-70 -20 l12 -4 M130 -150 l10 4 M-150 -40 l14 -2" stroke="#A8895A" strokeWidth="5" strokeLinecap="round" />
    {[
      [-110, -30],
      [60, -150],
      [140, -60],
    ].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r="6" fill="#A8895A" stroke={INK} strokeWidth="3" />
    ))}
    {snake ? (
      <g>
        {legs
          ? [-112, -60, -4, 48].map((x) => (
              <g key={x}>
                <path d={`M${x} -92 l-10 50`} stroke="#4A2E1E" strokeWidth="12" strokeLinecap="round" />
                <path d={`M${x - 10} -42 l-18 4 M${x - 10} -42 l2 16 M${x - 10} -42 l16 8`} stroke="#4A2E1E" strokeWidth="7" strokeLinecap="round" />
              </g>
            ))
          : null}
        <path d="M-136 -96 q34 -50 68 0 t68 0 t68 0" fill="none" stroke="#4A2E1E" strokeWidth="18" strokeLinecap="round" />
        <path d="M-136 -96 q34 -50 68 0 t68 0 t68 0" fill="none" stroke="#E9D3AA" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <ellipse cx="92" cy="-98" rx="38" ry="26" fill="#E2CA9A" stroke="#4A2E1E" strokeWidth="11" />
        <circle cx="100" cy="-106" r="7" fill="#4A2E1E" />
        <path d="M128 -96 l26 -4 M142 -98 l12 -12 M142 -98 l14 8" stroke="#B8402E" strokeWidth="6" strokeLinecap="round" />
      </g>
    ) : null}
  </g>
);

export const props: Record<PropTuan2B, PropDef> = {
  "st-elephant": {
    mode: "upright",
    draw: () => (
      <g>
        <PropDefs />
        <SoftShadow cx={20} cy={-4} rx={300} ry={30} />
        {/* Đuôi */}
        <path d="M-230 -280 Q-280 -240 -262 -180" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <path d="M-230 -280 Q-280 -240 -262 -180" fill="none" stroke="#8A8078" strokeWidth="6" strokeLinecap="round" />
        <path d="M-262 -184 l-10 22 M-262 -184 l4 24 M-262 -184 l14 18" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        {/* Chân (hai chân xa tối hơn) */}
        {[-170, -90, 40, 116].map((x, i) => (
          <g key={x}>
            <rect x={x - 32} y="-170" width="64" height="170" rx="18" fill={i % 2 ? "url(#t2b-hide)" : "#6F665E"} stroke={INK} strokeWidth="8" />
            {[-18, 0, 18].map((d) => (
              <path key={d} d={`M${x + d - 8} -4 q8 -14 16 0`} fill="#F1E6D0" stroke={INK} strokeWidth="3" />
            ))}
            <path d={`M${x - 20} -110 q20 8 40 0 M${x - 20} -90 q20 8 40 0`} fill="none" stroke="#5A524C" strokeWidth="3" opacity="0.6" />
          </g>
        ))}
        <ellipse cx="-30" cy="-250" rx="220" ry="140" fill="url(#t2b-hide)" stroke={INK} strokeWidth="9" />
        <path d="M-200 -300 Q-120 -380 0 -384" fill="none" stroke="#D6CEC4" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
        {/* Tấm vải phủ lưng */}
        <path d="M-150 -370 Q-30 -400 90 -370 L80 -250 Q-30 -230 -140 -250 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-120 -340 Q-30 -360 60 -340 L56 -280 Q-30 -266 -116 -280 Z" fill="none" stroke="#E3B23C" strokeWidth="5" />
        <circle cx="-30" cy="-310" r="16" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
        <path d="M-140 -262 Q-30 -242 80 -262" fill="none" stroke="url(#w-brass)" strokeWidth="10" />
        {[-120, -90, -60, -30, 0, 30, 60].map((x) => (
          <path key={x} d={`M${x} ${-252 + Math.abs(x + 30) * 0.08} l0 18`} stroke="#E3B23C" strokeWidth="5" strokeLinecap="round" />
        ))}
        {/* Đầu, tai */}
        <circle cx="200" cy="-310" r="110" fill="url(#t2b-hide)" stroke={INK} strokeWidth="9" />
        <path d="M150 -380 Q60 -360 70 -270 Q90 -200 160 -230 Z" fill="#7E756D" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M130 -350 Q96 -320 104 -270" fill="none" stroke="#C9A99A" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
        <circle cx="240" cy="-340" r="10" fill={INK} />
        <circle cx="243" cy="-344" r="3" fill="#FFFFFF" />
        <path d="M222 -362 q16 -8 32 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        {/* Chín cái ngà xoè ra */}
        {Array.from({ length: 9 }, (_, i) => {
          const a = ((-62 + i * 16) * Math.PI) / 180;
          const bx = 262;
          const by = -280 + i * 7;
          const tx = bx + Math.cos(a) * 120;
          const ty = by + Math.sin(a) * 120;
          return (
            <path
              key={i}
              d={`M${bx} ${by - 8} Q${(bx + tx) / 2 + 6} ${(by + ty) / 2 - 14} ${tx} ${ty} Q${(bx + tx) / 2 - 6} ${(by + ty) / 2 + 10} ${bx} ${by + 8} Z`}
              fill="url(#t2b-cream)"
              stroke={INK}
              strokeWidth="5"
              strokeLinejoin="round"
            />
          );
        })}
        {/* Vòi */}
        <path d="M290 -260 Q330 -150 300 -60 Q290 -30 320 -30" fill="none" stroke={INK} strokeWidth="58" strokeLinecap="round" />
        <path d="M290 -260 Q330 -150 300 -60 Q290 -30 320 -30" fill="none" stroke="#978D84" strokeWidth="44" strokeLinecap="round" />
        {[-200, -170, -140, -110, -80].map((y) => (
          <path key={y} d={`M${290 + (y + 200) * 0.05} ${y} q14 6 28 0`} fill="none" stroke="#5A524C" strokeWidth="4" opacity="0.6" />
        ))}
      </g>
    ),
  },
  "st-rooster": {
    mode: "upright",
    draw: () => (
      <g>
        <PropDefs />
        <SoftShadow cy={-4} rx={110} ry={16} />
        {/* Đuôi cong nhiều màu */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path d={`M-60 ${-170 + i * 14} Q${-180 + i * 12} ${-310 + i * 40} ${-150 + i * 20} ${-120 + i * 20}`} fill="none" stroke={INK} strokeWidth={34 - i * 5} strokeLinecap="round" />
            <path
              d={`M-60 ${-170 + i * 14} Q${-180 + i * 12} ${-310 + i * 40} ${-150 + i * 20} ${-120 + i * 20}`}
              fill="none"
              stroke={["#2E4A3A", "#3E6A4A", "#8E2B22", "#C9452F"][i]}
              strokeWidth={22 - i * 4}
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Chân: chín cái cựa nhọn */}
        {[
          { x: -22, n: 4 },
          { x: 26, n: 5 },
        ].map(({ x, n }) => (
          <g key={x}>
            <line x1={x} y1="-110" x2={x} y2="-6" stroke={INK} strokeWidth="16" strokeLinecap="round" />
            <line x1={x} y1="-110" x2={x} y2="-6" stroke="#E3A631" strokeWidth="8" strokeLinecap="round" />
            {Array.from({ length: n }, (_, i) => (
              <path key={i} d={`M${x - 4} ${-96 + i * 18} L${x - 30} ${-90 + i * 18} L${x - 4} ${-86 + i * 18} Z`} fill="url(#t2b-cream)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            ))}
            <path d={`M${x} -6 l26 4 M${x} -6 l-8 6 M${x} -6 l14 8`} stroke={INK} strokeWidth="7" strokeLinecap="round" />
          </g>
        ))}
        <ellipse cx="0" cy="-160" rx="84" ry="66" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" />
        {/* Cánh */}
        <path d="M-50 -176 Q0 -200 46 -168 Q30 -120 -20 -120 Q-50 -130 -50 -176 Z" fill="#8A2C22" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-36 -150 q20 8 40 0 M-30 -134 q20 8 40 0" fill="none" stroke="#E3A631" strokeWidth="4" strokeLinecap="round" />
        <path d="M-60 -196 Q-30 -220 10 -218" fill="none" stroke="#F0A08A" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
        {/* Cổ, đầu, mào, mỏ */}
        <path d="M30 -200 Q50 -250 60 -270 L100 -260 Q90 -210 70 -180 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M52 -244 l20 6 M48 -226 l22 6 M44 -208 l22 6" stroke="#B07A1E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="82" cy="-282" r="36" fill="url(#w-turmeric)" stroke={INK} strokeWidth="7" />
        <path d="M54 -310 q8 -30 20 -4 q8 -30 20 -4 q10 -26 18 4 Z" fill="#C9302C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M112 -290 L142 -278 L112 -268 Z" fill="#F0B040" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M106 -262 q6 22 -8 24 q-8 -10 -2 -24" fill="#C9302C" stroke={INK} strokeWidth="4" />
        <circle cx="92" cy="-290" r="6" fill={INK} />
        <circle cx="94" cy="-292" r="2" fill="#FFFFFF" />
      </g>
    ),
  },
  "st-horse": {
    mode: "upright",
    draw: () => (
      <g>
        <PropDefs />
        <SoftShadow cx={0} cy={-4} rx={250} ry={26} />
        {/* Đuôi */}
        <path d="M-180 -250 Q-260 -200 -230 -90" fill="none" stroke={INK} strokeWidth="40" strokeLinecap="round" />
        <path d="M-180 -250 Q-260 -200 -230 -90" fill="none" stroke="#5A2E24" strokeWidth="26" strokeLinecap="round" />
        <path d="M-196 -230 Q-240 -190 -224 -110" fill="none" stroke="#8A4A34" strokeWidth="6" strokeLinecap="round" />
        {/* Chân, móng */}
        {[-150, -96, 70, 124].map((x, i) => (
          <g key={x}>
            <rect x={x - 18} y="-180" width="36" height="164" rx="12" fill={i % 2 ? "url(#t2b-cream)" : "#CFC3AC"} stroke={INK} strokeWidth="7" />
            <rect x={x - 22} y="-26" width="44" height="26" rx="6" fill="url(#w-dark)" stroke={INK} strokeWidth="5" />
          </g>
        ))}
        <ellipse cx="-20" cy="-230" rx="180" ry="92" fill="url(#t2b-cream)" stroke={INK} strokeWidth="9" />
        <path d="M-160 -270 Q-80 -316 30 -310" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
        {/* Yên đỏ */}
        <path d="M-80 -320 Q-20 -332 40 -318 L36 -250 Q-20 -240 -76 -252 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M-76 -262 Q-20 -250 36 -262" fill="none" stroke="#E3B23C" strokeWidth="6" />
        {/* Cổ, đầu */}
        <path d="M90 -290 L170 -440 L240 -400 L170 -220 Z" fill="url(#t2b-cream)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <ellipse cx="236" cy="-410" rx="92" ry="44" fill="url(#t2b-cream)" stroke={INK} strokeWidth="8" transform="rotate(28 236 -410)" />
        <path d="M168 -462 L176 -510 L200 -466 Z" fill="#E9DCC2" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <circle cx="222" cy="-438" r="8" fill={INK} />
        <circle cx="224" cy="-441" r="2.5" fill="#FFFFFF" />
        <circle cx="300" cy="-374" r="6" fill={INK} />
        {/* Dây cương */}
        <path d="M196 -446 L280 -362 M204 -400 L286 -400" fill="none" stroke="#8E2B22" strokeWidth="6" strokeLinecap="round" />
        {/* Bờm chín túm */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = 90 + i * 10;
          const y = -280 - i * 22;
          return <path key={i} d={`M${x} ${y} Q${x - 50} ${y - 6} ${x - 44} ${y - 34} Q${x - 20} ${y - 20} ${x + 10} ${y - 16} Z`} fill={i % 2 ? "#5A2E24" : "#7A3E2E"} stroke={INK} strokeWidth="4" strokeLinejoin="round" />;
        })}
      </g>
    ),
  },
  "st-mi-nuong": {
    mode: "upright",
    draw: () => (
      <g>
        <PropDefs />
        <SoftShadow cy={-4} rx={120} ry={16} />
        {/* Tóc dài sau lưng */}
        <path d="M-70 -500 Q-90 -380 -50 -300 L70 -300 Q90 -380 70 -500 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
        {/* Váy dài */}
        <path d="M-60 -270 L60 -270 L96 0 L-96 0 Z" fill="url(#t2b-skirt)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-40 -250 L-66 -20" stroke="#7A5A70" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        <path d="M-90 -24 L90 -24" stroke="#E3B23C" strokeWidth="6" />
        {/* Áo tứ thân, yếm, thắt lưng */}
        <path d="M-66 -410 Q0 -428 66 -410 L70 -250 L-70 -250 Z" fill="url(#t2b-cream)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-30 -416 L0 -370 L30 -416 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <rect x="-74" y="-284" width="148" height="22" rx="8" fill="url(#w-turmeric)" stroke={INK} strokeWidth="6" />
        <path d="M-20 -262 L-30 -170 M20 -262 L30 -170" stroke="#E3A631" strokeWidth="10" strokeLinecap="round" />
        {/* Tay buông */}
        {[-1, 1].map((s) => (
          <g key={s}>
            <path d={`M${s * 62} -400 L${s * 82} -300`} stroke={INK} strokeWidth="32" strokeLinecap="round" />
            <path d={`M${s * 62} -400 L${s * 82} -300`} stroke="#EFE3CC" strokeWidth="20" strokeLinecap="round" />
            <circle cx={s * 84} cy="-292" r="13" fill="#F6D5B0" stroke={INK} strokeWidth="5" />
          </g>
        ))}
        {/* Đầu */}
        <ellipse cx="0" cy="-484" rx="72" ry="78" fill="#F6D5B0" stroke={INK} strokeWidth="7" />
        <path d="M-74 -480 C-80 -580 80 -580 74 -480 Q40 -520 -10 -514 Q-50 -510 -74 -480 Z" fill="#2E2420" stroke={INK} strokeWidth="7" />
        <path d="M-40 -540 Q-10 -556 20 -548" fill="none" stroke="#6A5448" strokeWidth="5" strokeLinecap="round" />
        {/* Vương miện nhỏ */}
        <path d="M-40 -552 L-30 -590 L-12 -562 L0 -600 L12 -562 L30 -590 L40 -552 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="0" cy="-566" r="6" fill="#C9302C" stroke={INK} strokeWidth="3" />
        <circle cx="-34" cy="-482" r="7" fill={INK} />
        <circle cx="12" cy="-482" r="7" fill={INK} />
        <path d="M-48 -500 q10 -8 20 0 M-2 -500 q10 -8 20 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="-50" cy="-458" rx="10" ry="6" fill="#F2A08A" />
        <ellipse cx="22" cy="-458" rx="10" ry="6" fill="#F2A08A" />
        <path d="M-26 -446 Q-12 -432 2 -446" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "st-hill-held": {
    mode: "upright",
    draw: () => (
      // Vẽ cao hơn bàn tay để quả đồi nằm trên đầu người nâng.
      <g transform="translate(-70 -240)">
        <PropDefs />
        <path d="M-160 0 Q-120 -150 -20 -170 Q60 -230 150 -110 Q170 -60 160 0 Z" fill="url(#t2b-hill)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-160 0 L160 0 L150 26 Q0 40 -150 26 Z" fill="url(#w-clay)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-120 16 l20 4 M-20 22 l24 2 M80 16 l20 -2" stroke="#5C341C" strokeWidth="4" strokeLinecap="round" />
        <Canopy blobs={[[-70, -150, 26], [-44, -140, 20]]} sw={5} />
        <Canopy blobs={[[30, -190, 28], [56, -176, 20]]} sw={5} />
        <Canopy blobs={[[100, -120, 24]]} sw={5} />
        <path d="M-110 -60 Q-60 -90 -10 -70" fill="none" stroke="#C3D49C" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
  },
  "st-hill": {
    mode: "upright",
    draw: () => (
      <g>
        <PropDefs />
        <SoftShadow cy={-4} rx={250} ry={24} />
        <path d="M-220 0 Q-200 -200 -60 -250 Q20 -360 130 -240 Q220 -170 220 0 Z" fill="url(#t2b-hill)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        <path d="M-60 -250 Q20 -360 130 -240 Q60 -280 10 -270 Z" fill="#A9C77A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M60 -250 Q160 -160 170 0 L220 0 Q220 -170 130 -240 Z" fill="#3A5A2C" opacity="0.35" />
        <Canopy blobs={[[-140, -170, 30], [-112, -156, 22]]} sw={5} />
        <Canopy blobs={[[-40, -230, 30], [-14, -214, 22]]} sw={5} />
        <Canopy blobs={[[70, -280, 30]]} sw={5} />
        <Canopy blobs={[[150, -170, 30], [176, -150, 20]]} sw={5} />
        <Canopy blobs={[[0, -120, 32], [30, -104, 22]]} sw={5} />
        <path d="M-170 -60 l30 -20 l30 16 M60 -70 l30 -24 l34 20" fill="none" stroke="#3A5430" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  "st-wave": {
    mode: "upright",
    draw: () => (
      <g>
        <PropDefs />
        {/* Ngọn sóng cuộn về bên trái */}
        <path
          d="M260 0 L260 -300 Q200 -420 60 -420 Q-80 -420 -160 -330 Q-200 -280 -170 -240 Q-130 -280 -80 -260 Q-120 -220 -100 -180 Q-50 -220 0 -190 Q-60 -140 -40 -90 Q-160 -80 -240 0 Z"
          fill="url(#t2b-sea)"
          stroke={INK}
          strokeWidth="9"
          strokeLinejoin="round"
        />
        <path d="M200 -340 Q120 -390 20 -380" fill="none" stroke="#9CC3C0" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
        <path d="M-160 -330 Q-80 -400 40 -396 Q-40 -370 -90 -330 Q-130 -320 -160 -330 Z" fill="#F4ECD6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {[
          [60, -300],
          [140, -200],
          [40, -120],
          [170, -80],
        ].map(([x, y]) => (
          <path key={`${x}`} d={`M${x - 40} ${y} q20 -24 40 0 t40 0`} fill="none" stroke="#B9D4CC" strokeWidth="9" strokeLinecap="round" />
        ))}
        {[
          [-170, -246, 16],
          [-104, -192, 14],
          [-46, -100, 14],
          [-210, -30, 18],
        ].map(([x, y, r]) => (
          <circle key={`${x}`} cx={x} cy={y} r={r} fill="#F4ECD6" stroke={INK} strokeWidth="5" />
        ))}
      </g>
    ),
  },
  "so-flask": {
    mode: "upright",
    draw: () => (
      <g>
        <SoftShadow cy={-2} rx={76} ry={12} />
        <path d="M-16 -150 L16 -150 L18 -110 Q66 -90 62 -46 Q58 0 0 0 Q-58 0 -62 -46 Q-66 -90 -18 -110 Z" fill="url(#w-glaze)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-22" y="-166" width="44" height="20" rx="6" fill="url(#w-lacquer)" stroke={INK} strokeWidth="5" />
        <path d="M-50 -60 Q0 -40 50 -60" fill="none" stroke={PAL.blueGlaze} strokeWidth="8" strokeLinecap="round" />
        <path d="M-40 -82 Q0 -66 40 -82" fill="none" stroke={PAL.blueGlaze} strokeWidth="6" strokeLinecap="round" />
        <rect x="-16" y="-48" width="32" height="32" fill="url(#w-lacquer)" stroke={INK} strokeWidth="4" transform="rotate(45 0 -32)" />
        <Shine d="M-40 -80 Q-48 -50 -36 -24" opacity={0.7} />
      </g>
    ),
  },
  "so-stick": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M0 -14 L4 168" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M0 -14 L4 168" stroke="#9A6236" strokeWidth="8" strokeLinecap="round" />
        <path d="M-2 -6 L2 150" stroke="#C48D57" strokeWidth="3" strokeLinecap="round" />
        <path d="M2 50 L-22 30" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        <path d="M2 50 L-22 30" stroke="#9A6236" strokeWidth="4" strokeLinecap="round" />
        <path d="M-26 26 q-10 -6 -8 -16 q10 2 12 12 Z" fill={PAL.leaf} stroke={INK} strokeWidth="3" />
      </g>
    ),
  },
  "so-sand": { mode: "upright", draw: () => <SandTray /> },
  "so-sand-snake": { mode: "upright", draw: () => <SandTray snake /> },
  "so-sand-legs": { mode: "upright", draw: () => <SandTray snake legs /> },
  "ao-moi-flap": {
    mode: "extend",
    draw: () => (
      <g>
        <PropDefs />
        <path d="M-22 -12 L22 -12 L58 150 Q0 168 -58 150 Z" fill="url(#t2b-cream)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-10 0 L-40 140" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        <path d="M14 0 L40 146" stroke="#C9B48E" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <Flower x={-18} y={70} />
        <Flower x={26} y={118} />
        <Flower x={-30} y={134} r={7} />
        <path d="M-58 150 Q0 168 58 150" fill="none" stroke="url(#w-brass)" strokeWidth="9" />
      </g>
    ),
  },
  "pig-rope": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M0 -10 Q30 40 0 80 Q-30 120 6 160" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M0 -10 Q30 40 0 80 Q-30 120 6 160" fill="none" stroke="#C8934E" strokeWidth="9" strokeLinecap="round" />
        <path d="M0 -10 Q30 40 0 80 Q-30 120 6 160" fill="none" stroke="#7A4A2A" strokeWidth="9" strokeLinecap="butt" strokeDasharray="4 10" />
        {/* Đầu dây đứt tưa */}
        <path d="M6 160 l-14 22 M6 160 l2 26 M6 160 l16 20" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <path d="M6 160 l-14 22 M6 160 l2 26 M6 160 l16 20" stroke="#C8934E" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Cột gỗ sơn son có chân tảng đá (đáy ở FLOOR). */
const LacquerPost: React.FC<{ x: number; top: number; w?: number }> = ({ x, top, w = 70 }) => (
  <g>
    <rect x={x - w / 2} y={top} width={w} height={FLOOR - 40 - top} fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" />
    <rect x={x - w / 2 + 10} y={top + 10} width="10" height={FLOOR - 70 - top} fill="#E27A5E" opacity="0.45" />
    <rect x={x + w / 2 - 18} y={top + 4} width="12" height={FLOOR - 64 - top} fill="#5A1A12" opacity="0.35" />
    <path d={`M${x - w / 2 - 14} ${FLOOR} L${x - w / 2 - 6} ${FLOOR - 44} L${x + w / 2 + 6} ${FLOOR - 44} L${x + w / 2 + 14} ${FLOOR} Z`} fill="#B9AD98" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
  </g>
);

/** Đèn lồng đỏ treo (tâm ở x, dây từ y0). */
const Lantern: React.FC<{ x: number; y0: number; y: number }> = ({ x, y0, y }) => (
  <g>
    <line x1={x} y1={y0} x2={x} y2={y - 52} stroke={INK} strokeWidth="5" />
    <circle cx={x} cy={y} r="90" fill="url(#w-glow)" opacity="0.6" />
    <rect x={x - 22} y={y - 62} width="44" height="14" rx="4" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
    <ellipse cx={x} cy={y} rx="46" ry="54" fill="url(#w-lacquer)" stroke={INK} strokeWidth="7" />
    <path d={`M${x} ${y - 52} L${x} ${y + 52} M${x - 26} ${y - 44} Q${x - 46} ${y} ${x - 26} ${y + 44} M${x + 26} ${y - 44} Q${x + 46} ${y} ${x + 26} ${y + 44}`} fill="none" stroke="#7A2318" strokeWidth="4" />
    <ellipse cx={x - 16} cy={y - 18} rx="10" ry="18" fill="#FFD9A0" opacity="0.5" />
    <rect x={x - 18} y={y + 48} width="36" height="12" rx="3" fill="url(#w-brass)" stroke={INK} strokeWidth="4" />
    <path d={`M${x - 10} ${y + 60} l-4 40 M${x} ${y + 60} l0 46 M${x + 10} ${y + 60} l4 40`} stroke="#C9452F" strokeWidth="5" strokeLinecap="round" />
  </g>
);

/** Mặt trống đồng (hoa văn ngôi sao, vòng tròn, chim Lạc giản lược). */
const BronzeDrum: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 130 }) => (
  <g transform={`translate(${x} ${y}) scale(${r / 130})`}>
    <circle r="150" fill="url(#w-glow)" opacity="0.55" />
    <circle r="130" fill="url(#w-brass)" stroke={INK} strokeWidth="9" />
    <circle r="112" fill="none" stroke="#8A5A1A" strokeWidth="5" />
    <circle r="78" fill="none" stroke="#8A5A1A" strokeWidth="5" />
    {Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 10;
      return <path key={i} transform={`rotate(${(a * 180) / Math.PI})`} d="M-10 -96 q10 -10 22 -4 l8 -6 l-2 10 q-10 8 -26 2 Z" fill="#8A5A1A" />;
    })}
    <polygon
      points={Array.from({ length: 28 }, (_, i) => {
        const rr = i % 2 === 0 ? 58 : 20;
        const a = (Math.PI * i) / 14;
        return `${Math.sin(a) * rr},${-Math.cos(a) * rr}`;
      }).join(" ")}
      fill="#FBE3A0"
      stroke={INK}
      strokeWidth="4"
    />
    <path d="M-90 -60 Q-60 -100 -10 -112" fill="none" stroke="#FFF3CF" strokeWidth="9" strokeLinecap="round" opacity="0.6" />
  </g>
);

/** Cung điện vua Hùng: nhà sàn gỗ mái cong hình thuyền, trống đồng trên vách, vua Hùng ngồi ngai trên bệ (giữa, phía sau). */
const HungPalace: React.FC = () => (
  <>
    <defs>
      <linearGradient id="t2b-hp-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7A4A2A" />
        <stop offset="0.5" stopColor="#A87146" />
        <stop offset="1" stopColor="#8A5530" />
      </linearGradient>
      <linearGradient id="t2b-hp-out" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F3C98A" />
        <stop offset="1" stopColor="#FCEFD2" />
      </linearGradient>
      <linearGradient id="t2b-hp-curtain" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8A2C22" />
        <stop offset="0.5" stopColor="#C8503C" />
        <stop offset="1" stopColor="#8A2C22" />
      </linearGradient>
    </defs>
    {/* Hậu cảnh: vách ván gỗ */}
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#t2b-hp-wall)" />
    {Array.from({ length: 14 }, (_, i) => (
      <line key={i} x1={i * 80 + 20} y1="200" x2={i * 80 + 20} y2={FLOOR} stroke="#5E3A20" strokeWidth="4" opacity="0.55" />
    ))}
    {/* Hai ô cửa sổ nhìn ra đồi núi */}
    {[130, 950].map((wx) => (
      <g key={wx}>
        <rect x={wx - 80} y="560" width="160" height="220" fill="url(#t2b-hp-out)" stroke={INK} strokeWidth="8" />
        <path d={`M${wx - 80} 720 Q${wx - 30} 650 ${wx} 690 Q${wx + 40} 640 ${wx + 80} 700 L${wx + 80} 780 L${wx - 80} 780 Z`} fill="#A9C77A" stroke="#6E5A3E" strokeWidth="4" />
        <path d={`M${wx - 80} 750 Q${wx} 720 ${wx + 80} 760 L${wx + 80} 780 L${wx - 80} 780 Z`} fill="#7FA557" />
        {[-40, 0, 40].map((d) => (
          <rect key={d} x={wx + d - 6} y="560" width="12" height="220" fill="url(#w-wood-h)" stroke={INK} strokeWidth="3" />
        ))}
        <rect x={wx - 92} y="770" width="184" height="20" fill="url(#w-wood)" stroke={INK} strokeWidth="6" />
      </g>
    ))}
    {/* Trống đồng trên vách */}
    <BronzeDrum x={540} y={470} />
    {/* Rèm đỏ buộc hai bên trống */}
    {[-1, 1].map((sd) => (
      <path
        key={sd}
        d={`M${540 + sd * 170} 240 L${540 + sd * 290} 240 Q${540 + sd * 300} 480 ${540 + sd * 250} 640 Q${540 + sd * 230} 560 ${540 + sd * 200} 520 Q${540 + sd * 170} 380 ${540 + sd * 170} 240 Z`}
        fill="url(#t2b-hp-curtain)"
        stroke={INK}
        strokeWidth="7"
        strokeLinejoin="round"
      />
    ))}
    {/* Mái cong hình thuyền (trong nhà nhìn lên): xà và mái gỗ */}
    <path d="M-40 0 L1120 0 L1120 200 Q1000 160 880 210 Q540 290 200 210 Q80 160 -40 200 Z" fill="url(#w-wood-dark)" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} x1={i * 100 - 10} y1="0" x2={i * 100 + (i - 5.5) * 6} y2={200 + Math.cos(((i - 5.5) / 6) * Math.PI) * 30} stroke="#3A2416" strokeWidth="5" opacity="0.5" />
    ))}
    <path d="M-40 200 Q80 160 200 210 Q540 290 880 210 Q1000 160 1120 200" fill="none" stroke="url(#w-brass)" strokeWidth="14" />
    {/* Hoa văn răng cưa trên xà */}
    <path d={Array.from({ length: 22 }, (_, i) => `M${i * 50 + 10} ${236 + Math.cos(((i - 10.5) / 11) * Math.PI) * 26} l12 18 l12 -18`).join(" ")} fill="none" stroke="#E3B23C" strokeWidth="5" opacity="0.8" />
    {/* Bệ cao, ngai vàng (trung cảnh) */}
    <SoftShadow cx={540} cy={FLOOR - 4} rx={300} ry={30} />
    <rect x="300" y="1120" width="480" height={FLOOR - 1120} fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    <rect x="330" y="1010" width="420" height="110" fill="url(#w-wood)" stroke={INK} strokeWidth="8" />
    <rect x="330" y="1010" width="420" height="14" fill="#E2B07A" opacity="0.5" />
    <rect x="300" y="1120" width="480" height="14" fill="#E2B07A" opacity="0.5" />
    {[380, 540, 700].map((x) => (
      <rect key={x} x={x - 40} y="1150" width="80" height="60" rx="6" fill="none" stroke="#5E3A20" strokeWidth="5" />
    ))}
    <path d="M430 1010 L430 690 Q540 630 650 690 L650 1010 Z" fill="url(#w-turmeric)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M458 1000 L458 704 Q540 660 622 704 L622 1000" fill="none" stroke="#9A6A1A" strokeWidth="5" />
    <Shine d="M450 980 L450 712" opacity={0.4} />
    {/* Vua Hùng ngồi trên ngai */}
    <path d="M470 1010 L484 830 Q540 806 596 830 L610 1010 Z" fill="url(#w-lacquer)" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M540 830 L540 1010" stroke="#E3B23C" strokeWidth="8" />
    <path d="M490 900 Q540 920 590 900" fill="none" stroke="#E3B23C" strokeWidth="6" />
    <rect x="452" y="986" width="56" height="24" rx="8" fill="#2E2420" stroke={INK} strokeWidth="5" />
    <rect x="572" y="986" width="56" height="24" rx="8" fill="#2E2420" stroke={INK} strokeWidth="5" />
    <circle cx="540" cy="772" r="50" fill="#F3D2AA" stroke={INK} strokeWidth="7" />
    {/* Mũ lông chim kiểu Lạc Việt */}
    {[-50, -28, -8, 12, 32, 52].map((dx, i) => (
      <g key={dx}>
        <path d={`M${540 + dx * 0.5} 736 Q${540 + dx * 1.4} ${680 - (i % 2) * 20} ${540 + dx * 1.8} ${640 - (i % 2) * 24}`} fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" />
        <path d={`M${540 + dx * 0.5} 736 Q${540 + dx * 1.4} ${680 - (i % 2) * 20} ${540 + dx * 1.8} ${640 - (i % 2) * 24}`} fill="none" stroke={i % 2 ? "#E3A631" : "#8E3B2A"} strokeWidth="6" strokeLinecap="round" />
      </g>
    ))}
    <path d="M490 750 Q540 712 590 750 L590 732 Q540 696 490 732 Z" fill="url(#w-brass)" stroke={INK} strokeWidth="6" />
    <circle cx="522" cy="772" r="6" fill={INK} />
    <circle cx="558" cy="772" r="6" fill={INK} />
    <ellipse cx="510" cy="790" rx="9" ry="5" fill="#F2A08A" opacity="0.7" />
    <ellipse cx="570" cy="790" rx="9" ry="5" fill="#F2A08A" opacity="0.7" />
    <path d="M516 798 Q540 860 564 798 Q540 806 516 798 Z" fill="#FFF8E8" stroke={INK} strokeWidth="5" />
    {/* Cột son hai bên (tiền cảnh đóng khung) */}
    <LacquerPost x={50} top={190} w={80} />
    <LacquerPost x={1030} top={190} w={80} />
    <Floor color="#9A6236" line="#7B4B28" />
    {/* Chum đồng hai mép tiền cảnh */}
    <Jar x={120} y={1330} s={0.85} />
    <Jar x={960} y={1330} s={0.85} />
  </>
);

/** Núi Tản Viên giữa mưa bão (trời tím nâu, chớp vàng), nước dâng bên phải; tiền cảnh đá và lau rạp gió hai mép. */
const StMountain: React.FC = () => (
  <>
    <defs>
      <linearGradient id="t2b-st-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3E2A3A" />
        <stop offset="0.6" stopColor="#7A5258" />
        <stop offset="1" stopColor="#B38A74" />
      </linearGradient>
      <linearGradient id="t2b-st-mt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7F9A5A" />
        <stop offset="1" stopColor="#3E5A34" />
      </linearGradient>
      <linearGradient id="t2b-st-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6E8A88" />
        <stop offset="1" stopColor="#3E5560" />
      </linearGradient>
      <radialGradient id="t2b-st-flash" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFE7A8" stopOpacity="0.55" />
        <stop offset="1" stopColor="#FFE7A8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#t2b-st-sky)" />
    <circle cx="800" cy="520" r="320" fill="url(#t2b-st-flash)" />
    {/* Mây bão cuộn (hậu cảnh) */}
    {[
      [180, 300, 1.4],
      [600, 250, 1.6],
      [980, 340, 1.3],
      [400, 420, 1],
    ].map(([x, y, s]) => (
      <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-120 20 Q-130 -10 -96 -14 Q-90 -48 -50 -40 Q-30 -70 10 -56 Q40 -76 70 -46 Q110 -50 112 -16 Q140 -10 130 20 Z" fill="#5A3E4E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M-80 4 Q-40 -8 0 4 Q40 -8 80 4" fill="none" stroke="#8A6670" strokeWidth="5" strokeLinecap="round" />
      </g>
    ))}
    {/* Chớp */}
    <path d="M830 380 L780 520 L830 512 L784 650" fill="none" stroke={INK} strokeWidth="20" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M830 380 L780 520 L830 512 L784 650" fill="none" stroke="#FFE08A" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" />
    {/* Núi xa mờ */}
    <FarMountains peaks={[[500, 640, 220], [760, 700, 200]]} foot={940} color="#8A6E70" shade="#6E5560" line="#4A3440" />
    {/* Núi Tản Viên ba đỉnh bên trái (trung cảnh) */}
    <path d={`M-20 ${FLOOR} L-20 760 Q60 640 110 560 Q150 600 200 680 Q250 560 310 500 Q370 600 420 690 Q460 640 500 610 Q580 900 640 ${FLOOR} Z`} fill="url(#t2b-st-mt)" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M110 560 Q90 700 40 800 M310 500 Q300 640 230 760 M500 610 Q480 760 430 860" fill="none" stroke="#9BB46E" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
    {[
      [90, 820, 50],
      [230, 880, 56],
      [380, 940, 60],
      [150, 1000, 64],
      [480, 1060, 60],
    ].map(([x, y, r], i) => (
      <Canopy key={i} blobs={[[x, y, r], [x + r * 0.8, y + 10, r * 0.75]]} base="#5E7E44" light="#86A060" dark="#3A5430" sw={5} />
    ))}
    {/* Nước dâng bên phải */}
    <path d={`M560 ${FLOOR} Q590 980 620 930 Q700 880 800 920 Q900 960 1000 910 L1100 900 L1100 ${FLOOR} Z`} fill="url(#t2b-st-sea)" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    {[960, 1040, 1120, 1190].map((y, i) => (
      <path key={y} d={`M${640 + i * 14} ${y} q30 -22 60 0 t60 0 t60 0 t60 0 t60 0 t60 0`} fill="none" stroke="#E8DCC0" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
    ))}
    {[
      [700, 912],
      [880, 930],
      [1040, 900],
    ].map(([x, y]) => (
      <path key={x} d={`M${x - 40} ${y + 6} Q${x - 10} ${y - 30} ${x + 30} ${y - 10} Q${x} ${y - 6} ${x - 4} ${y + 10} Z`} fill="#F4ECD6" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    ))}
    {/* Mưa xiên */}
    {Array.from({ length: 40 }, (_, i) => {
      const x = (i * 157) % 1120;
      const y = 300 + ((i * 263) % 900);
      return <line key={i} x1={x} y1={y} x2={x - 26} y2={y + 70} stroke="#F2DCC0" strokeWidth="4" opacity="0.55" strokeLinecap="round" />;
    })}
    <Floor color="#7A6648" line="#655238" />
    {/* Vũng nước trên sàn */}
    <ellipse cx="300" cy="1420" rx="120" ry="16" fill="#8E9A90" opacity="0.5" />
    <ellipse cx="820" cy="1520" rx="150" ry="18" fill="#8E9A90" opacity="0.45" />
    {/* Tiền cảnh: đá và lau rạp gió */}
    <path d={`M-20 ${FLOOR + 60} Q0 1150 70 1140 Q130 1130 150 1200 Q160 ${FLOOR + 40} 120 ${FLOOR + 70} Z`} fill="#8A7A66" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M30 1170 Q70 1150 110 1170" fill="none" stroke="#B5A68E" strokeWidth="6" strokeLinecap="round" />
    <g transform={`rotate(-12 1020 ${FLOOR + 20})`}>
      <Reeds x={1020} y={FLOOR + 20} s={0.9} flip />
    </g>
    <GrassTuft x={190} y={FLOOR + 40} s={1.1} color="#6E8A4E" />
  </>
);

/** Sân nhà quan nước Sở: nhà chính mái ngói cong, cột son, đèn lồng, tường hoa; sân lát gạch, chậu cây hai mép. */
const SoCourtyard: React.FC = () => (
  <>
    <WarmSky id="t2b-so-sky" h={FLOOR} sun={[880, 300]} />
    <VCloud x={240} y={250} s={0.9} />
    <DistantTrees y={760} />
    {/* Nhà chính phía sau */}
    <rect x="150" y="560" width="780" height="300" fill="#E9D3AA" stroke={INK} strokeWidth="8" />
    <rect x="150" y="560" width="780" height="50" fill="#5E3A20" opacity="0.3" />
    {[300, 440, 640, 780].map((x) => (
      <g key={x}>
        <rect x={x - 54} y="620" width="108" height="240" fill="url(#w-wood)" stroke={INK} strokeWidth="5" />
        <rect x={x - 44} y="632" width="88" height="100" fill="#3A2416" opacity="0.85" />
        {[-22, 0, 22].map((d) => (
          <line key={d} x1={x + d} y1="632" x2={x + d} y2="732" stroke="#B57A47" strokeWidth="4" />
        ))}
      </g>
    ))}
    {[170, 370, 540, 710, 910].map((x) => (
      <rect key={x} x={x - 16} y="580" width="32" height="280" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" />
    ))}
    {/* Bức hoành */}
    <rect x="460" y="610" width="160" height="56" rx="6" fill="url(#w-lacquer)" stroke={INK} strokeWidth="6" />
    <rect x="470" y="620" width="140" height="36" rx="4" fill="none" stroke="#E3B23C" strokeWidth="4" />
    <g transform="translate(540 580)">
      <TileRoof w={900} top={600} h={170} />
    </g>
    {/* Tường hoa thấp phía trước (trung cảnh) */}
    <rect x="-20" y="900" width="1120" height={FLOOR - 900} fill="#F1E2C2" stroke={INK} strokeWidth="7" />
    <rect x="-20" y="900" width="1120" height="26" fill="#5E3A20" opacity="0.25" />
    {[160, 400, 680, 920].map((x) => (
      <g key={x}>
        <circle cx={x} cy="1040" r="56" fill="#C8B08A" stroke={INK} strokeWidth="6" />
        <path d={`M${x - 40} 1040 L${x + 40} 1040 M${x} 1000 L${x} 1080 M${x - 28} 1012 L${x + 28} 1068 M${x + 28} 1012 L${x - 28} 1068`} stroke="#8A6A44" strokeWidth="6" />
      </g>
    ))}
    <path d="M-30 910 L1110 910 L1110 870 Q540 850 -30 870 Z" fill="url(#w-tile)" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    {Array.from({ length: 23 }, (_, i) => (
      <path key={i} d={`M${i * 50 - 10} 870 q25 14 50 0`} fill="none" stroke="#7E3324" strokeWidth="4" opacity="0.7" />
    ))}
    {/* Đèn lồng */}
    <Lantern x={300} y0={590} y={690} />
    <Lantern x={780} y0={590} y={690} />
    <BrickYard yTop={FLOOR} />
    <rect x="0" y={FLOOR - 4} width="1080" height="8" fill={INK} opacity="0.85" />
    {/* Chậu cây hai mép tiền cảnh */}
    <PotPlant x={80} y={1330} s={1} kind="palm" />
    <PotPlant x={1000} y={1330} s={1} kind="palm" />
  </>
);

/** Cổng nhà quê: trời chiều, rặng cây xa, nhà tranh bên trái, bụi tre bên phải, cổng tre ở x ≈ 670, rào tre. */
const VillageGate: React.FC = () => (
  <>
    <WarmSky id="t2b-vg-sky" h={FLOOR} sun={[200, 330]} />
    <VCloud x={620} y={300} s={1} />
    <VCloud x={900} y={200} s={0.6} />
    <DistantTrees y={820} />
    <Hills id="t2b-vg-h" y={960} amp={40} waves={2} phase={1} top="#B9CC86" base="#8DAA5E" line="#6E5A3E" sw={5} />
    {/* Bụi tre bên phải (hậu cảnh) */}
    <Bamboo x={960} y={1120} s={1} />
    <Bamboo x={860} y={1100} s={0.75} flip />
    {/* Nhà tranh bên trái */}
    <ThatchHut x={200} y={1150} s={0.95} />
    {/* Rào tre và cổng tre (x ≈ 670) */}
    <BambooFence x0={380} x1={540} y={1180} />
    <BambooFence x0={800} x1={1100} y={1180} />
    {[560, 780].map((x) => (
      <g key={x}>
        <rect x={x - 18} y="760" width="36" height={1200 - 760} rx="8" fill="#C9A24E" stroke={INK} strokeWidth="7" />
        <rect x={x - 10} y="770" width="8" height="420" fill="#F0D488" opacity="0.6" />
        {[860, 980, 1100].map((y) => (
          <line key={y} x1={x - 18} y1={y} x2={x + 18} y2={y} stroke={INK} strokeWidth="5" />
        ))}
      </g>
    ))}
    <path d="M510 776 Q600 700 670 690 Q740 700 830 776 Q760 770 670 760 Q580 770 510 776 Z" fill="#D9A84E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    {[540, 590, 640, 700, 750, 800].map((x) => (
      <path key={x} d={`M${670 + (x - 670) * 0.2} 700 Q${x} 730 ${x} 768`} fill="none" stroke="#A9762E" strokeWidth="4" />
    ))}
    <rect x="530" y="770" width="280" height="20" rx="6" fill="#A9853A" stroke={INK} strokeWidth="6" />
    <Floor color="#C9A877" line="#B08F60" />
    {/* Lối đất từ cổng ra */}
    <path d={`M600 ${FLOOR} L740 ${FLOOR} L900 1920 L440 1920 Z`} fill="#D9BC8A" opacity="0.45" />
    {/* Tiền cảnh */}
    <GrassTuft x={60} y={FLOOR + 30} s={1.2} />
    <GrassTuft x={1030} y={FLOOR + 40} s={1.3} flip />
    <GrassTuft x={180} y={1460} s={1.1} />
    <SkyRays from={[200, 330]} opacity={0.07} />
  </>
);

export const scenes: Record<SceneTuan2B, React.FC> = {
  "hung-palace": HungPalace,
  "st-mountain": StMountain,
  "so-courtyard": SoCourtyard,
  "village-gate": VillageGate,
};
