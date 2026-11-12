/**
 * Hình vẽ vai / đạo cụ / phông cho cảnh hồi ức tuần 2b (Nói vậy). Tên khai báo ở engine/lib/story/tuan-2b.ts.
 * Mẫu cách vẽ: vai Thạch Sanh, Lý Thông trong engine/stage/Character.tsx; đạo cụ truyện cuối engine/stage/props.tsx;
 * phông Tavern / Temple / Cave trong engine/stage/scenes.tsx.
 *
 * Truyện: Sơn Tinh, Thủy Tinh (tập 12) · Vẽ rắn thêm chân (tập 13) · Lợn cưới, áo mới (tập 14).
 */
import React from "react";
import type { PropTuan2B, RoleTuan2B, SceneTuan2B } from "../../lib/story/tuan-2b.ts";
import { Floor, FLOOR, INK, type PropDef } from "../draw.tsx";
import { Brows, Eyes, type FaceGeo, Mouth, type Role } from "../face.tsx";

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
        fill="#1E1B2E"
      />
    ))}
    <circle cx={x} cy={y} r={r * 0.5} fill="#E8C547" />
  </g>
);

// ---------------------------------------------------------------- vai

const SKIN = "#F3D2AA";

export const roles: Record<RoleTuan2B, Role> = {
  "son-tinh": {
    look: { skin: SKIN, sleeve: "#E3DCC0", legs: "#2F5A30", shoe: "#1E1B2E", arm: 26 },
    headY: 40,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 200, browY: 170, mouthY: 250, browColor: INK };
      return (
        <g>
          <Face skin={SKIN} />
          <path d="M86 162 C80 92 280 92 274 162 Q230 142 180 144 Q130 142 86 162 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Mũ ba đỉnh núi, đỉnh phủ tuyết */}
          <path d="M92 140 L122 62 L150 108 L180 22 L210 108 L238 62 L268 140 Z" fill="#2F5A30" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <path d="M111 90 L122 62 L133 90 Z M166 62 L180 22 L194 62 Z M227 90 L238 62 L249 90 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <rect x="88" y="128" width="184" height="22" rx="8" fill="#E8C547" stroke={INK} strokeWidth="6" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big={false} />
          <Mouth expr={expr} y={g.mouthY} talk={talk} color="#8B1E24" />
          {/* Râu quai nón ngắn */}
          <path d="M118 262 Q130 300 180 304 Q230 300 242 262 Q226 286 180 288 Q134 286 118 262 Z" fill="#1E1B2E" stroke={INK} strokeWidth="4" />
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
    look: { skin: SKIN, sleeve: "#E6E1D3", legs: "#5C4128", shoe: "#1E1B2E", arm: 26 },
    headY: 70,
    Head: ({ expr, talk, blink }) => {
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 196, browY: 168, mouthY: 248, browColor: "#555555" };
      return (
        <g>
          <Face skin={SKIN} />
          <path d="M86 160 C80 84 280 84 274 160 Q230 136 180 138 Q130 136 86 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Búi tóc cài trâm */}
          <circle cx="180" cy="80" r="28" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          <path d="M122 74 L242 90" stroke={INK} strokeWidth="14" strokeLinecap="round" />
          <path d="M122 74 L242 90" stroke="#E8C547" strokeWidth="7" strokeLinecap="round" />
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
    look: { skin: "#F6D5B0", sleeve: "#3A2F4A", legs: "#E6E1D3", shoe: "#1E1B2E", arm: 24 },
    headY: 92,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F6D5B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 204, browY: 176, mouthY: 254, browColor: INK };
      return (
        <g>
          <Face skin={skin} />
          {/* Mũ tròn đen có núm */}
          <path d="M84 160 C84 66 276 66 276 160 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <rect x="80" y="146" width="200" height="22" rx="10" fill="#3A2F4A" stroke={INK} strokeWidth="6" />
          <circle cx="180" cy="76" r="14" fill="#C0392B" stroke={INK} strokeWidth="5" />
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
        <rect x="108" y="392" width="144" height="22" rx="6" fill="#E8C547" stroke={INK} strokeWidth="6" />
      </Robe>
    ),
  },
  "ao-moi": {
    look: { skin: "#F6D5B0", sleeve: "#FAFAF5", legs: "#2B2B3A", shoe: "#1E1B2E", arm: 26 },
    headY: 76,
    Head: ({ expr, talk, blink }) => {
      const skin = "#F6D5B0";
      const g: FaceGeo = { eyeL: 150, eyeR: 210, eyeY: 202, browY: 174, mouthY: 252, browColor: INK };
      return (
        <g>
          <Face skin={skin} />
          <path d="M86 162 C80 86 280 86 274 162 Q230 140 180 142 Q130 140 86 162 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
          {/* Búi tó củ hành */}
          <path d="M150 96 Q180 40 210 96 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
          <Brows expr={expr} g={g} />
          <Eyes expr={expr} g={g} blink={blink} big />
          <ellipse cx="126" cy="232" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
          <ellipse cx="234" cy="232" rx="11" ry="7" fill="#FF8FA3" opacity="0.75" />
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
        <path d="M146 304 Q180 330 214 304" fill="none" stroke="#E8C547" strokeWidth="12" strokeLinecap="round" />
        <path d="M146 304 Q180 330 214 304" fill="none" stroke={INK} strokeWidth="3" />
        <rect x="108" y="390" width="144" height="16" rx="6" fill="#E8C547" stroke={INK} strokeWidth="5" />
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
          <path d="M86 162 C80 92 280 92 274 162 Q230 142 180 144 Q130 142 86 162 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
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

/** Ô đất cát vẽ rắn: `legs` = rắn có chân, `snake` = đã vẽ rắn. */
const SandTray: React.FC<{ snake?: boolean; legs?: boolean }> = ({ snake, legs }) => (
  <g>
    <path d="M-150 -180 L150 -180 L180 0 L-180 0 Z" fill="#D8C49A" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    <path d="M-120 -160 l14 6 M100 -26 l18 4 M-70 -20 l12 -4" stroke="#B5A07A" strokeWidth="5" strokeLinecap="round" />
    {snake ? (
      <g>
        {legs
          ? [-112, -60, -4, 48].map((x) => (
              <g key={x}>
                <path d={`M${x} -92 l-10 50`} stroke={INK} strokeWidth="12" strokeLinecap="round" />
                <path d={`M${x - 10} -42 l-18 4 M${x - 10} -42 l2 16 M${x - 10} -42 l16 8`} stroke={INK} strokeWidth="7" strokeLinecap="round" />
              </g>
            ))
          : null}
        <path d="M-136 -96 q34 -50 68 0 t68 0 t68 0" fill="none" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <ellipse cx="92" cy="-98" rx="38" ry="26" fill="#D8C49A" stroke={INK} strokeWidth="11" />
        <circle cx="100" cy="-106" r="7" fill={INK} />
        <path d="M128 -96 l26 -4 M142 -98 l12 -12 M142 -98 l14 8" stroke="#C0392B" strokeWidth="6" strokeLinecap="round" />
      </g>
    ) : null}
  </g>
);

export const props: Record<PropTuan2B, PropDef> = {
  "st-elephant": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Đuôi */}
        <path d="M-230 -280 Q-280 -240 -262 -180" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
        {/* Chân */}
        {[-170, -90, 40, 116].map((x) => (
          <rect key={x} x={x - 32} y="-170" width="64" height="170" rx="18" fill="#8A8F99" stroke={INK} strokeWidth="8" />
        ))}
        <ellipse cx="-30" cy="-250" rx="220" ry="140" fill="#8A8F99" stroke={INK} strokeWidth="9" />
        {/* Tấm vải phủ lưng */}
        <path d="M-150 -370 Q-30 -400 90 -370 L80 -250 Q-30 -230 -140 -250 Z" fill="#8E2B22" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-140 -262 Q-30 -242 80 -262" fill="none" stroke="#E8C547" strokeWidth="8" />
        {/* Đầu, tai */}
        <circle cx="200" cy="-310" r="110" fill="#8A8F99" stroke={INK} strokeWidth="9" />
        <path d="M150 -380 Q60 -360 70 -270 Q90 -200 160 -230 Z" fill="#6E737C" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <circle cx="240" cy="-340" r="10" fill={INK} />
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
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth="5"
              strokeLinejoin="round"
            />
          );
        })}
        {/* Vòi */}
        <path d="M290 -260 Q330 -150 300 -60 Q290 -30 320 -30" fill="none" stroke={INK} strokeWidth="58" strokeLinecap="round" />
        <path d="M290 -260 Q330 -150 300 -60 Q290 -30 320 -30" fill="none" stroke="#8A8F99" strokeWidth="44" strokeLinecap="round" />
      </g>
    ),
  },
  "st-rooster": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Đuôi cong */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M-60 ${-170 + i * 14} Q${-170 + i * 10} ${-300 + i * 40} ${-150 + i * 20} ${-120 + i * 20}`}
            fill="none"
            stroke={INK}
            strokeWidth={30 - i * 4}
            strokeLinecap="round"
          />
        ))}
        {/* Chân: chín cái cựa nhọn */}
        {[
          { x: -22, n: 4 },
          { x: 26, n: 5 },
        ].map(({ x, n }) => (
          <g key={x}>
            <line x1={x} y1="-110" x2={x} y2="-6" stroke={INK} strokeWidth="16" strokeLinecap="round" />
            <line x1={x} y1="-110" x2={x} y2="-6" stroke="#FFB22C" strokeWidth="8" strokeLinecap="round" />
            {Array.from({ length: n }, (_, i) => (
              <path key={i} d={`M${x - 4} ${-96 + i * 18} L${x - 30} ${-90 + i * 18} L${x - 4} ${-86 + i * 18} Z`} fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            ))}
            <path d={`M${x} -6 l26 4 M${x} -6 l-8 6 M${x} -6 l14 8`} stroke={INK} strokeWidth="7" strokeLinecap="round" />
          </g>
        ))}
        <ellipse cx="0" cy="-160" rx="84" ry="66" fill="#C0392B" stroke={INK} strokeWidth="8" />
        <path d="M-40 -170 Q0 -130 40 -164" fill="none" stroke="#7A2318" strokeWidth="8" strokeLinecap="round" />
        {/* Cổ, đầu, mào, mỏ */}
        <path d="M30 -200 Q50 -250 60 -270 L100 -260 Q90 -210 70 -180 Z" fill="#E8C547" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <circle cx="82" cy="-282" r="36" fill="#E8C547" stroke={INK} strokeWidth="7" />
        <path d="M54 -310 q8 -30 20 -4 q8 -30 20 -4 q10 -26 18 4 Z" fill="#D62828" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M112 -290 L142 -278 L112 -268 Z" fill="#FFB22C" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M106 -262 q6 22 -8 24 q-8 -10 -2 -24" fill="#D62828" stroke={INK} strokeWidth="4" />
        <circle cx="92" cy="-290" r="6" fill={INK} />
      </g>
    ),
  },
  "st-horse": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Đuôi */}
        <path d="M-180 -250 Q-260 -200 -230 -90" fill="none" stroke={INK} strokeWidth="34" strokeLinecap="round" />
        {/* Chân, móng */}
        {[-150, -96, 70, 124].map((x) => (
          <g key={x}>
            <rect x={x - 18} y="-180" width="36" height="164" rx="12" fill="#E6E1D3" stroke={INK} strokeWidth="7" />
            <rect x={x - 22} y="-26" width="44" height="26" rx="6" fill="#1E1B2E" stroke={INK} strokeWidth="5" />
          </g>
        ))}
        <ellipse cx="-20" cy="-230" rx="180" ry="92" fill="#E6E1D3" stroke={INK} strokeWidth="9" />
        {/* Cổ, đầu */}
        <path d="M90 -290 L170 -440 L240 -400 L170 -220 Z" fill="#E6E1D3" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <ellipse cx="236" cy="-410" rx="92" ry="44" fill="#E6E1D3" stroke={INK} strokeWidth="8" transform="rotate(28 236 -410)" />
        <path d="M168 -462 L176 -510 L200 -466 Z" fill="#E6E1D3" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <circle cx="222" cy="-438" r="8" fill={INK} />
        <circle cx="300" cy="-374" r="6" fill={INK} />
        {/* Bờm chín túm */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = 90 + i * 10;
          const y = -280 - i * 22;
          return <path key={i} d={`M${x} ${y} Q${x - 50} ${y - 6} ${x - 44} ${y - 34} Q${x - 20} ${y - 20} ${x + 10} ${y - 16} Z`} fill="#3B1E1E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />;
        })}
      </g>
    ),
  },
  "st-mi-nuong": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Tóc dài sau lưng */}
        <path d="M-70 -500 Q-90 -380 -50 -300 L70 -300 Q90 -380 70 -500 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
        {/* Váy dài */}
        <path d="M-60 -270 L60 -270 L96 0 L-96 0 Z" fill="#3B2A3E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        {/* Áo tứ thân, yếm, thắt lưng */}
        <path d="M-66 -410 Q0 -428 66 -410 L70 -250 L-70 -250 Z" fill="#F2EBDD" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-30 -416 L0 -370 L30 -416 Z" fill="#C0392B" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <rect x="-74" y="-284" width="148" height="22" rx="8" fill="#E8C547" stroke={INK} strokeWidth="6" />
        <path d="M-20 -262 L-30 -170 M20 -262 L30 -170" stroke="#E8C547" strokeWidth="10" strokeLinecap="round" />
        {/* Tay buông */}
        {[-1, 1].map((s) => (
          <g key={s}>
            <path d={`M${s * 62} -400 L${s * 82} -300`} stroke={INK} strokeWidth="32" strokeLinecap="round" />
            <path d={`M${s * 62} -400 L${s * 82} -300`} stroke="#F2EBDD" strokeWidth="20" strokeLinecap="round" />
            <circle cx={s * 84} cy="-292" r="13" fill="#F6D5B0" stroke={INK} strokeWidth="5" />
          </g>
        ))}
        {/* Đầu quay sang trái */}
        <ellipse cx="0" cy="-484" rx="72" ry="78" fill="#F6D5B0" stroke={INK} strokeWidth="7" />
        <path d="M-74 -480 C-80 -580 80 -580 74 -480 Q40 -520 -10 -514 Q-50 -510 -74 -480 Z" fill="#1E1B2E" stroke={INK} strokeWidth="7" />
        {/* Vương miện nhỏ */}
        <path d="M-40 -552 L-30 -590 L-12 -562 L0 -600 L12 -562 L30 -590 L40 -552 Z" fill="#E8C547" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx="-34" cy="-482" r="7" fill={INK} />
        <circle cx="12" cy="-482" r="7" fill={INK} />
        <path d="M-48 -500 q10 -8 20 0 M-2 -500 q10 -8 20 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="-50" cy="-458" rx="10" ry="6" fill="#FF8FA3" />
        <ellipse cx="22" cy="-458" rx="10" ry="6" fill="#FF8FA3" />
        <path d="M-26 -446 Q-12 -432 2 -446" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
  "st-hill-held": {
    mode: "upright",
    draw: () => (
      // Vẽ cao hơn bàn tay để quả đồi nằm trên đầu người nâng.
      <g transform="translate(-70 -240)">
        <path d="M-160 0 Q-120 -150 -20 -170 Q60 -230 150 -110 Q170 -60 160 0 Z" fill="#4E7A3A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
        <path d="M-160 0 L160 0 L150 26 L-150 26 Z" fill="#6B4423" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        {[
          [-70, -150],
          [30, -190],
          [100, -120],
        ].map(([x, y]) => (
          <g key={x}>
            <line x1={x} y1={y + 40} x2={x} y2={y + 6} stroke={INK} strokeWidth="8" />
            <circle cx={x} cy={y} r="24" fill="#2F5A30" stroke={INK} strokeWidth="6" />
          </g>
        ))}
        <path d="M-110 -60 Q-60 -90 -10 -70" fill="none" stroke="#9BC06B" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
  },
  "st-hill": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-220 0 Q-200 -200 -60 -250 Q20 -360 130 -240 Q220 -170 220 0 Z" fill="#4E7A3A" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
        <path d="M-60 -250 Q20 -360 130 -240 Q60 -280 10 -270 Z" fill="#6B8F4E" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {[
          [-140, -170],
          [-40, -230],
          [70, -280],
          [150, -170],
          [0, -120],
        ].map(([x, y]) => (
          <g key={`${x}`}>
            <line x1={x} y1={y + 46} x2={x} y2={y + 6} stroke={INK} strokeWidth="9" />
            <circle cx={x} cy={y} r="28" fill="#2F5A30" stroke={INK} strokeWidth="6" />
          </g>
        ))}
        <path d="M-170 -60 l30 -20 l30 16 M60 -70 l30 -24 l34 20" fill="none" stroke="#2F4A26" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
  "st-wave": {
    mode: "upright",
    draw: () => (
      <g>
        {/* Ngọn sóng cuộn về bên trái */}
        <path
          d="M260 0 L260 -300 Q200 -420 60 -420 Q-80 -420 -160 -330 Q-200 -280 -170 -240 Q-130 -280 -80 -260 Q-120 -220 -100 -180 Q-50 -220 0 -190 Q-60 -140 -40 -90 Q-160 -80 -240 0 Z"
          fill="#1F4E79"
          stroke={INK}
          strokeWidth="9"
          strokeLinejoin="round"
        />
        <path d="M-160 -330 Q-80 -400 40 -396 Q-40 -370 -90 -330 Q-130 -320 -160 -330 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        {[
          [60, -300],
          [140, -200],
          [40, -120],
          [170, -80],
        ].map(([x, y]) => (
          <path key={`${x}`} d={`M${x - 40} ${y} q20 -24 40 0 t40 0`} fill="none" stroke="#9CC9E8" strokeWidth="9" strokeLinecap="round" />
        ))}
        {[
          [-170, -246, 16],
          [-104, -192, 14],
          [-46, -100, 14],
          [-210, -30, 18],
        ].map(([x, y, r]) => (
          <circle key={`${x}`} cx={x} cy={y} r={r} fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        ))}
      </g>
    ),
  },
  "so-flask": {
    mode: "upright",
    draw: () => (
      <g>
        <path d="M-16 -150 L16 -150 L18 -110 Q66 -90 62 -46 Q58 0 0 0 Q-58 0 -62 -46 Q-66 -90 -18 -110 Z" fill="#E6E1D3" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-22" y="-166" width="44" height="20" rx="6" fill="#8E3B2F" stroke={INK} strokeWidth="5" />
        <path d="M-50 -60 Q0 -40 50 -60" fill="none" stroke="#2E6C8E" strokeWidth="8" strokeLinecap="round" />
        <path d="M-40 -82 Q0 -66 40 -82" fill="none" stroke="#2E6C8E" strokeWidth="6" strokeLinecap="round" />
        <rect x="-16" y="-48" width="32" height="32" fill="#C0392B" stroke={INK} strokeWidth="4" transform="rotate(45 0 -32)" />
      </g>
    ),
  },
  "so-stick": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M0 -14 L4 168" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M0 -14 L4 168" stroke="#9C6B3C" strokeWidth="8" strokeLinecap="round" />
        <path d="M2 50 L-22 30" stroke={INK} strokeWidth="7" strokeLinecap="round" />
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
        <path d="M-22 -12 L22 -12 L58 150 Q0 168 -58 150 Z" fill="#FAFAF5" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <Flower x={-18} y={70} />
        <Flower x={26} y={118} />
        <Flower x={-30} y={134} r={7} />
        <path d="M-58 150 Q0 168 58 150" fill="none" stroke="#E8C547" strokeWidth="8" />
      </g>
    ),
  },
  "pig-rope": {
    mode: "extend",
    draw: () => (
      <g>
        <path d="M0 -10 Q30 40 0 80 Q-30 120 6 160" fill="none" stroke={INK} strokeWidth="16" strokeLinecap="round" />
        <path d="M0 -10 Q30 40 0 80 Q-30 120 6 160" fill="none" stroke="#C8934E" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 6" />
        {/* Đầu dây đứt tưa */}
        <path d="M6 160 l-14 22 M6 160 l2 26 M6 160 l16 20" stroke="#9C6B3C" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
  },
};

// ---------------------------------------------------------------- phông

/** Cung điện vua Hùng. */
const HungPalace: React.FC = () => (
  <>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="#D9C7A0" />
    {/* Mặt trống đồng trên vách */}
    <g transform="translate(540 430)">
      <circle r="130" fill="#B08A3E" stroke={INK} strokeWidth="9" />
      <circle r="100" fill="none" stroke="#7A5A22" strokeWidth="6" />
      <circle r="66" fill="none" stroke="#7A5A22" strokeWidth="6" />
      <polygon
        points={Array.from({ length: 28 }, (_, i) => {
          const r = i % 2 === 0 ? 52 : 18;
          const a = (Math.PI * i) / 14;
          return `${Math.sin(a) * r},${-Math.cos(a) * r}`;
        }).join(" ")}
        fill="#FFE27A"
        stroke={INK}
        strokeWidth="4"
      />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 8;
        return <path key={i} d={`M${Math.sin(a) * 74} ${-Math.cos(a) * 74} l${Math.sin(a + 1) * 18} ${-Math.cos(a + 1) * 18}`} stroke="#7A5A22" strokeWidth="6" strokeLinecap="round" />;
      })}
    </g>
    {/* Mái hiên */}
    <path d="M-20 0 L1100 0 L1100 230 Q540 290 -20 230 Z" fill="#7A2E22" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M-20 200 Q540 260 1100 200" fill="none" stroke="#E8C547" strokeWidth="10" />
    {/* Cột đỏ */}
    {[80, 1000].map((x) => (
      <g key={x}>
        <rect x={x - 34} y="240" width="68" height={FLOOR - 240} fill="#8E2B22" stroke={INK} strokeWidth="8" />
        <rect x={x - 44} y={FLOOR - 50} width="88" height="50" fill="#B9A27A" stroke={INK} strokeWidth="7" />
      </g>
    ))}
    {/* Bệ cao, ngai vàng */}
    <rect x="330" y="1010" width="420" height={FLOOR - 1010} fill="#8B5A2B" stroke={INK} strokeWidth="8" />
    <rect x="300" y="1120" width="480" height={FLOOR - 1120} fill="#9C6B3C" stroke={INK} strokeWidth="8" />
    <path d="M440 1010 L440 690 Q540 640 640 690 L640 1010 Z" fill="#C9A24E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    {/* Vua Hùng ngồi trên ngai */}
    <path d="M470 1010 L484 830 Q540 806 596 830 L610 1010 Z" fill="#7A2E22" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d="M540 830 L540 1010" stroke="#E8C547" strokeWidth="8" />
    <rect x="452" y="986" width="56" height="24" rx="8" fill="#1E1B2E" stroke={INK} strokeWidth="5" />
    <rect x="572" y="986" width="56" height="24" rx="8" fill="#1E1B2E" stroke={INK} strokeWidth="5" />
    <circle cx="540" cy="772" r="50" fill="#F3D2AA" stroke={INK} strokeWidth="7" />
    {/* Mũ lông chim kiểu Lạc Việt */}
    {[-50, -28, -8, 12, 32, 52].map((dx, i) => (
      <path key={dx} d={`M${540 + dx * 0.5} 736 Q${540 + dx * 1.4} ${680 - (i % 2) * 20} ${540 + dx * 1.8} ${640 - (i % 2) * 24}`} fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
    ))}
    <path d="M490 750 Q540 712 590 750 L590 732 Q540 696 490 732 Z" fill="#E8C547" stroke={INK} strokeWidth="6" />
    <circle cx="522" cy="772" r="6" fill={INK} />
    <circle cx="558" cy="772" r="6" fill={INK} />
    <path d="M516 798 Q540 860 564 798 Q540 806 516 798 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
    <Floor color="#8C6B42" line="#7A5C38" />
  </>
);

/** Núi Tản Viên giữa mưa bão, biển nước bên phải. */
const StMountain: React.FC = () => (
  <>
    <defs>
      <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#262C3E" />
        <stop offset="1" stopColor="#66718A" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#st-sky)" />
    {/* Mây đen */}
    {[
      [200, 330],
      [620, 300],
      [960, 360],
    ].map(([x, y]) => (
      <g key={x} transform={`translate(${x} ${y})`} fill="#3A4258" stroke={INK} strokeWidth="6">
        <ellipse cx="0" cy="0" rx="130" ry="50" />
        <ellipse cx="-80" cy="16" rx="80" ry="40" />
        <ellipse cx="90" cy="14" rx="90" ry="42" />
      </g>
    ))}
    {/* Chớp */}
    <path d="M820 390 L770 520 L820 510 L780 640" fill="none" stroke="#FFE27A" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" />
    {/* Mưa xiên */}
    {Array.from({ length: 26 }, (_, i) => {
      const x = (i * 157) % 1100;
      const y = 420 + ((i * 263) % 640);
      return <line key={i} x1={x} y1={y} x2={x - 26} y2={y + 70} stroke="#C9D6E8" strokeWidth="4" opacity="0.7" strokeLinecap="round" />;
    })}
    {/* Núi Tản Viên ba đỉnh bên trái */}
    <path d={`M-20 ${FLOOR} L-20 760 L110 560 L200 680 L310 500 L420 690 L500 610 L640 ${FLOOR} Z`} fill="#2F5A30" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M110 560 L150 620 M310 500 L350 570 M500 610 L530 650" fill="none" stroke="#6B8F4E" strokeWidth="10" strokeLinecap="round" />
    {/* Biển nước bên phải */}
    <path d={`M560 ${FLOOR} L600 920 Q700 880 800 920 T1000 910 L1100 900 L1100 ${FLOOR} Z`} fill="#1F4E79" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    {[960, 1040, 1120].map((y, i) => (
      <path key={y} d={`M${640 + i * 20} ${y} q30 -22 60 0 t60 0 t60 0 t60 0 t60 0 t60 0`} fill="none" stroke="#9CC9E8" strokeWidth="7" strokeLinecap="round" />
    ))}
    <Floor color="#5E5A42" line="#4F4B36" />
  </>
);

/** Sân nhà quan nước Sở ngày xưa. */
const SoCourtyard: React.FC = () => (
  <>
    <defs>
      <linearGradient id="so-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F2D7A6" />
        <stop offset="1" stopColor="#F8EBD0" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#so-sky)" />
    {/* Mái đình mái cong */}
    <path d="M60 470 Q40 420 10 410 Q200 420 300 320 L780 320 Q880 420 1070 410 Q1040 420 1020 470 Q540 430 60 470 Z" fill="#3A3F4A" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
    <path d="M300 320 Q540 290 780 320" fill="none" stroke="#5E6470" strokeWidth="8" />
    {[200, 880].map((x) => (
      <rect key={x} x={x - 26} y="452" width="52" height="300" fill="#8E2B22" stroke={INK} strokeWidth="8" />
    ))}
    {/* Đèn lồng */}
    {[360, 720].map((x) => (
      <g key={x}>
        <line x1={x} y1="446" x2={x} y2="490" stroke={INK} strokeWidth="5" />
        <ellipse cx={x} cy="540" rx="44" ry="52" fill="#C0392B" stroke={INK} strokeWidth="7" />
        <path d={`M${x} 490 L${x} 590 M${x - 26} 498 Q${x - 44} 540 ${x - 26} 584 M${x + 26} 498 Q${x + 44} 540 ${x + 26} 584`} fill="none" stroke="#7A2318" strokeWidth="4" />
        <rect x={x - 18} y="586" width="36" height="12" fill="#E8C547" stroke={INK} strokeWidth="4" />
      </g>
    ))}
    {/* Tường gạch xám có mái ngói */}
    <rect x="0" y="760" width="1080" height={FLOOR - 760} fill="#A3A6AD" />
    {Array.from({ length: 8 }, (_, r) =>
      Array.from({ length: 10 }, (__, c) => (
        <rect key={`${r}-${c}`} x={c * 120 - (r % 2) * 60} y={780 + r * 58} width="120" height="58" fill="none" stroke="#878A92" strokeWidth="4" />
      )),
    )}
    <path d="M-20 790 L1100 790 L1100 740 Q540 720 -20 740 Z" fill="#3A3F4A" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <Floor color="#CDB892" line="#B8A27A" />
  </>
);

/** Cổng nhà quê: rặng tre, nhà tranh, cổng tre. */
const VillageGate: React.FC = () => (
  <>
    <defs>
      <linearGradient id="vg-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9FD3EE" />
        <stop offset="1" stopColor="#E3F4FB" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height={FLOOR} fill="url(#vg-sky)" />
    <circle cx="160" cy="360" r="56" fill="#FFE27A" stroke="#FFD24A" strokeWidth="8" />
    {/* Rặng tre */}
    {[860, 920, 990, 1050].map((x, i) => (
      <path key={x} d={`M${x} ${FLOOR} Q${x - 20} 800 ${x - 60 + i * 10} ${420 + i * 30}`} fill="none" stroke="#3E6B2E" strokeWidth="14" strokeLinecap="round" />
    ))}
    {[
      [820, 470],
      [900, 420],
      [990, 500],
      [1060, 440],
      [870, 600],
      [1020, 650],
    ].map(([x, y]) => (
      <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="90" ry="44" fill="#4F8A3A" stroke={INK} strokeWidth="6" />
    ))}
    {/* Nhà tranh bên trái */}
    <rect x="40" y="820" width="340" height={FLOOR - 820} fill="#D9C39A" stroke={INK} strokeWidth="8" />
    <rect x="150" y="930" width="110" height={FLOOR - 930} fill="#5C4128" stroke={INK} strokeWidth="7" />
    <path d="M-10 840 L210 640 L430 840 Z" fill="#B08A3E" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
    {Array.from({ length: 10 }, (_, i) => (
      <line key={i} x1={20 + i * 42} y1={836} x2={60 + i * 30} y2={700 + Math.abs(5 - i) * 18} stroke="#8C6A2A" strokeWidth="5" />
    ))}
    {/* Hàng rào tre */}
    {Array.from({ length: 16 }, (_, i) => {
      const x = 440 + i * 40;
      if (x > 560 && x < 780) return null;
      return <rect key={i} x={x} y="1010" width="24" height={FLOOR - 1010} fill="#C9A24E" stroke={INK} strokeWidth="5" />;
    })}
    <rect x="420" y="1050" width="160" height="14" fill="#9C7A3A" stroke={INK} strokeWidth="4" />
    <rect x="760" y="1050" width="330" height="14" fill="#9C7A3A" stroke={INK} strokeWidth="4" />
    {/* Cổng tre (x ≈ 670) */}
    {[560, 780].map((x) => (
      <g key={x}>
        <rect x={x - 18} y="700" width="36" height={FLOOR - 700} fill="#C9A24E" stroke={INK} strokeWidth="7" />
        {[820, 960, 1100].map((y) => (
          <line key={y} x1={x - 18} y1={y} x2={x + 18} y2={y} stroke={INK} strokeWidth="5" />
        ))}
      </g>
    ))}
    <path d="M520 712 L670 640 L820 712 Z" fill="#B08A3E" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <rect x="530" y="706" width="280" height="20" fill="#9C7A3A" stroke={INK} strokeWidth="6" />
    <Floor color="#B89B6A" line="#A3875A" />
  </>
);

export const scenes: Record<SceneTuan2B, React.FC> = {
  "hung-palace": HungPalace,
  "st-mountain": StMountain,
  "so-courtyard": SoCourtyard,
  "village-gate": VillageGate,
};
