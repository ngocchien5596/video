import React from "react";
import { useCurrentFrame } from "remotion";
import { PARCHMENT } from "./ParchmentHud.tsx";

export type StickmanProps = {
  x: number;
  y: number;
  scale?: number;
  role?: "ancient" | "ranger" | "worker" | "sailor" | "scholar";
  pose?: "idle" | "think" | "point" | "eureka" | "aimL";
  badge?: string;
  /** Tiến độ đi vào cảnh 0 → 1 (mặc định 1 = đã đứng yên tại chỗ). Đang đi thì nhún bước. */
  enter?: number;
  /** Đi vào từ cách vị trí đứng bao nhiêu px (âm = từ bên trái). Mặc định 320 (từ bên phải). */
  from?: number;
  /** Đang nói / hào hứng: nhún người, vung tay theo nhịp. Mặc định true. */
  lively?: boolean;
};

const OUTLINE = "#2B1A0E";
const SKIN = "#EBB892";
const SKIN_SHADOW = "#D69B72";
const HAIR = "#4B2E1B";
const HAIR_LIGHT = "#6B4329";
const SHIRT = "#8CA4BC";
const VEST = "#6B7346";
const VEST_DARK = "#525934";
const PANTS = "#C2A682";
const CUFF = "#D8C2A3";
const BOOT = "#6E4326";
const LEATHER = "#5E361B";
const BRASS = "#E0AD46";

/**
 * Nhân vật MILO — The Young Inventor (dựng theo thiết kế `projects/kien-thuc/docs/kich-ban/nhan_vat.jpg`):
 * - Tóc nâu rối + Kính bảo hộ bằng đồng (Brass Goggles) đeo trên trán
 * - Áo sơ mi xanh xắn tay + Áo ghi-lê xanh rêu (Olive Vest) may túi chỉ nổi + cúc đồng
 * - Túi đeo chéo bằng da (Tool Satchel) đựng cờ-lê, tua-vít bên hông
 * - Quần kaki nâu sáng xắn gấu + Giày bốt da cổ lông
 * - Biểu cảm gương mặt: Curious / Thinking / Excited (Eureka) / Happy + Chớp mắt & Nhịp thở tự nhiên.
 * Gốc tọa độ (x, y) đặt tại điểm chạm mặt đất giữa hai bàn chân.
 */
export const Stickman: React.FC<StickmanProps> = ({
  x,
  y,
  scale = 1,
  pose = "idle",
  badge,
  enter = 1,
  from = 320,
  lively = true,
}) => {
  const frame = useCurrentFrame();
  const walking = enter < 0.999;
  const breath = Math.sin(frame * 0.12) * 2.2 + (lively && !walking ? Math.abs(Math.sin(frame * 0.22)) * -4 : 0);
  const headTilt =
    pose === "think" ? -5 + Math.sin(frame * 0.08) * 3 : pose === "eureka" ? 3 + Math.sin(frame * 0.3) * 4 : Math.sin(frame * 0.07) * 3.5;
  const blink = frame % 95 >= 91;
  // Đi vào: trượt từ `from`, nhún theo bước chân, người hơi nghiêng về phía trước.
  const dx = (1 - enter) * from;
  const step = walking ? -Math.abs(Math.sin(frame * 0.5)) * 16 : 0;
  // Eureka: nhảy cẫng lên liên tục.
  const hop = pose === "eureka" && lively && !walking ? -Math.abs(Math.sin(frame * 0.2)) * 26 : 0;
  const lean = walking ? (from > 0 ? -6 : 6) : Math.sin(frame * 0.05) * 1.5;
  // Tay trước vung theo nhịp nói.
  const armSwing = lively ? Math.sin(frame * 0.18) * (pose === "point" ? 9 : pose === "aimL" ? 2 : 6) : 0;

  return (
    <g transform={`translate(${x + dx}, ${y + step + hop}) scale(${scale}) rotate(${lean})`}>
      <defs>
        <radialGradient id="milo-face-grad" cx="45%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#F5CBA7" />
          <stop offset="70%" stopColor={SKIN} />
          <stop offset="100%" stopColor={SKIN_SHADOW} />
        </radialGradient>
        <linearGradient id="milo-vest-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7A8352" />
          <stop offset="100%" stopColor={VEST} />
        </linearGradient>
        <linearGradient id="milo-brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="55%" stopColor={BRASS} />
          <stop offset="100%" stopColor="#9E7020" />
        </linearGradient>
      </defs>

      {/* Bóng đổ мяг dưới mặt đất */}
      <ellipse cx={0} cy={4 - step - hop} rx={46 + (step + hop) * 0.6} ry={10} fill="rgba(0,0,0,0.38)" />

      {/* ==================== HAI CHÂN & GIÀY BỐT DA ==================== */}
      <g>
        {/* Ống quần trái & phải */}
        <path
          d="M -28 -96 L -8 -96 L -6 -30 L -32 -30 Z"
          fill={PANTS}
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        <path
          d="M 8 -96 L 28 -96 L 32 -30 L 6 -30 Z"
          fill={PANTS}
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        {/* Gấu quần xắn (Rolled Cuffs) */}
        <rect x={-34} y={-36} width={30} height={12} rx={4} fill={CUFF} stroke={OUTLINE} strokeWidth={2.8} />
        <rect x={4} y={-36} width={30} height={12} rx={4} fill={CUFF} stroke={OUTLINE} strokeWidth={2.8} />

        {/* Cổ giày lông cừu (Shearling Trim) */}
        <rect x={-33} y={-25} width={28} height={8} rx={4} fill="#D9C3A4" stroke={OUTLINE} strokeWidth={2.2} />
        <rect x={5} y={-25} width={28} height={8} rx={4} fill="#D9C3A4" stroke={OUTLINE} strokeWidth={2.2} />

        {/* Giày bốt da nâu (Worn Boots) */}
        <path
          d="M -34 -18 L -6 -18 L -4 -2 L -42 -2 Q -44 -14 -34 -18 Z"
          fill={BOOT}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <path
          d="M 6 -18 L 34 -18 Q 44 -14 42 -2 L 4 -2 L 6 -18 Z"
          fill={BOOT}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* Đế giày khắc rãnh */}
        <rect x={-43} y={-4} width={40} height={6} rx={2.5} fill="#361F10" stroke={OUTLINE} strokeWidth={2} />
        <rect x={3} y={-4} width={40} height={6} rx={2.5} fill="#361F10" stroke={OUTLINE} strokeWidth={2} />
        {/* Dây giày */}
        <line x1={-26} y1={-14} x2={-16} y2={-14} stroke={CUFF} strokeWidth={2} />
        <line x1={-28} y1={-10} x2={-18} y2={-10} stroke={CUFF} strokeWidth={2} />
        <line x1={16} y1={-14} x2={26} y2={-14} stroke={CUFF} strokeWidth={2} />
        <line x1={18} y1={-10} x2={28} y2={-10} stroke={CUFF} strokeWidth={2} />
      </g>

      {/* ==================== THÂN MÌNH, ÁO GHI-LÊ & TÚI ĐỒ NGHỀ ==================== */}
      <g transform={`translate(0, ${breath})`}>
        {/* Cánh tay sau (Tay trái nhân vật) */}
        {pose === "eureka" ? (
          <g>
            <path d="M -30 -158 Q -58 -182 -52 -214" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M -30 -158 Q -58 -182 -52 -214" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={-52} cy={-220} r={10} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
          </g>
        ) : (
          <g>
            <path d="M -32 -156 Q -52 -132 -36 -104" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M -32 -156 Q -52 -132 -36 -104" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={-34} cy={-100} r={9.5} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
          </g>
        )}

        {/* Áo sơ mi xanh bên trong */}
        <path
          d="M -32 -170 L 32 -170 L 34 -92 L -34 -92 Z"
          fill={SHIRT}
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        {/* Cổ áo sơ mi chữ V */}
        <polygon points="-14,-172 0,-152 14,-172" fill={SKIN} stroke={OUTLINE} strokeWidth={2.5} />
        <polygon points="-18,-172 -6,-152 -22,-158" fill="#A3B9CE" stroke={OUTLINE} strokeWidth={2.2} />
        <polygon points="18,-172 6,-152 22,-158" fill="#A3B9CE" stroke={OUTLINE} strokeWidth={2.2} />

        {/* Áo ghi-lê xanh rêu (Olive Utility Vest) */}
        <path
          d="M -34 -168 L -10 -168 L -8 -90 L -36 -92 Z"
          fill="url(#milo-vest-grad)"
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        <path
          d="M 10 -168 L 34 -168 L 36 -92 L 8 -90 Z"
          fill="url(#milo-vest-grad)"
          stroke={OUTLINE}
          strokeWidth={3.2}
          strokeLinejoin="round"
        />
        {/* Đường chỉ may nổi & 2 túi hộp trước ngực (Stitched Pockets) */}
        <rect
          x={-31}
          y={-136}
          width={19}
          height={22}
          rx={3}
          fill={VEST_DARK}
          stroke="#C8CE9E"
          strokeWidth={1.6}
          strokeDasharray="3 2"
        />
        <rect
          x={12}
          y={-136}
          width={19}
          height={22}
          rx={3}
          fill={VEST_DARK}
          stroke="#C8CE9E"
          strokeWidth={1.6}
          strokeDasharray="3 2"
        />
        {/* Cúc đồng trên túi áo */}
        <circle cx={-21.5} cy={-131} r={2.6} fill={BRASS} stroke={OUTLINE} strokeWidth={1.2} />
        <circle cx={21.5} cy={-131} r={2.6} fill={BRASS} stroke={OUTLINE} strokeWidth={1.2} />

        {/* Dây đeo chéo bằng da & Túi đồ nghề (Tool Satchel) */}
        <path
          d="M 24 -168 L -34 -96"
          stroke={OUTLINE}
          strokeWidth={13}
          strokeLinecap="round"
        />
        <path
          d="M 24 -168 L -34 -96"
          stroke={LEATHER}
          strokeWidth={8.5}
          strokeLinecap="round"
        />
        <line
          x1={22}
          y1={-166}
          x2={-32}
          y2={-98}
          stroke="#C99666"
          strokeWidth={1.4}
          strokeDasharray="4 3"
        />

        {/* Túi da đeo hông trái kèm dụng cụ cơ khí nhỏ (cờ-lê, tua-vít) */}
        <g transform="translate(-40, -96)">
          {/* Cờ-lê và tua-vít nhô lên khỏi miệng túi */}
          <rect x={-10} y={-22} width={5} height={14} rx={2} fill="#B0BEC5" stroke={OUTLINE} strokeWidth={1.8} />
          <circle cx={-7.5} cy={-24} r={4.5} fill="#B0BEC5" stroke={OUTLINE} strokeWidth={1.8} />
          <rect x={0} y={-20} width={5} height={12} rx={2} fill="#D4883A" stroke={OUTLINE} strokeWidth={1.8} />
          <rect x={-16} y={-10} width={30} height={32} rx={7} fill={LEATHER} stroke={OUTLINE} strokeWidth={3} />
          <path
            d="M -14 -8 L 12 -8 L 10 6 L -12 6 Z"
            fill="#734423"
            stroke="#C99666"
            strokeWidth={1.4}
            strokeDasharray="3 2"
          />
          <circle cx={-1} cy={1} r={3} fill={BRASS} stroke={OUTLINE} strokeWidth={1.2} />
        </g>

        {/* ==================== ĐẦU, TÓC RỐI & KÍNH BẢO HỘ ĐỒNG (MILO HEAD) ==================== */}
        <g transform={`translate(0, -174) rotate(${headTilt})`}>
          {/* Cổ */}
          <rect x={-9} y={-6} width={18} height={14} rx={6} fill={SKIN_SHADOW} stroke={OUTLINE} strokeWidth={2.5} />

          {/* Hai tai */}
          <ellipse cx={-45} cy={-44} rx={10} ry={13} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
          <ellipse cx={-44} cy={-44} rx={5} ry={7} fill={SKIN_SHADOW} />
          <ellipse cx={45} cy={-44} rx={10} ry={13} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
          <ellipse cx={44} cy={-44} rx={5} ry={7} fill={SKIN_SHADOW} />

          {/* Khuôn mặt tròn bầu ấm áp */}
          <rect
            x={-42}
            y={-92}
            width={84}
            height={84}
            rx={38}
            fill="url(#milo-face-grad)"
            stroke={OUTLINE}
            strokeWidth={3.4}
          />

          {/* Má hồng ấm */}
          <ellipse cx={-25} cy={-36} rx={10} ry={6} fill="#E08266" opacity={0.55} />
          <ellipse cx={25} cy={-36} rx={10} ry={6} fill="#E08266" opacity={0.55} />

          {/* Đôi mắt to tròn nâu sẫm (Curious / Excited / Thinking / Happy) */}
          {blink ? (
            <>
              <path d="M -26 -48 Q -16 -42 -6 -48" fill="none" stroke={OUTLINE} strokeWidth={3.5} strokeLinecap="round" />
              <path d="M 6 -48 Q 16 -42 26 -48" fill="none" stroke={OUTLINE} strokeWidth={3.5} strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Mắt trái */}
              <ellipse cx={-17} cy={-49} rx={10.5} ry={11.5} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.6} />
              <circle cx={-15.5} cy={-49} r={7.2} fill="#4A2A14" />
              <circle cx={-15.5} cy={-49} r={4} fill="#1E1008" />
              <circle cx={-18} cy={-52} r={2.6} fill="#FFFFFF" />
              <circle cx={-13} cy={-46} r={1.3} fill="#FFFFFF" />

              {/* Mắt phải */}
              <ellipse cx={17} cy={-49} rx={10.5} ry={11.5} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2.6} />
              <circle cx={18.5} cy={-49} r={7.2} fill="#4A2A14" />
              <circle cx={18.5} cy={-49} r={4} fill="#1E1008" />
              <circle cx={16} cy={-52} r={2.6} fill="#FFFFFF" />
              <circle cx={21} cy={-46} r={1.3} fill="#FFFFFF" />
            </>
          )}

          {/* Lông mày nâu dày biểu cảm */}
          {pose === "think" ? (
            <>
              <path d="M -28 -64 Q -17 -69 -7 -63" fill="none" stroke={HAIR} strokeWidth={4.5} strokeLinecap="round" />
              <path d="M 7 -61 Q 17 -64 28 -59" fill="none" stroke={HAIR} strokeWidth={4.5} strokeLinecap="round" />
            </>
          ) : pose === "eureka" ? (
            <>
              <path d="M -28 -66 Q -17 -73 -7 -66" fill="none" stroke={HAIR} strokeWidth={4.5} strokeLinecap="round" />
              <path d="M 7 -66 Q 17 -73 28 -66" fill="none" stroke={HAIR} strokeWidth={4.5} strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M -28 -63 Q -17 -68 -7 -63" fill="none" stroke={HAIR} strokeWidth={4.5} strokeLinecap="round" />
              <path d="M 7 -63 Q 17 -68 28 -63" fill="none" stroke={HAIR} strokeWidth={4.5} strokeLinecap="round" />
            </>
          )}

          {/* Chiếc mũi tròn nhỏ nhắn */}
          <ellipse cx={0} cy={-40} rx={6.5} ry={5} fill="#DF9E76" stroke={OUTLINE} strokeWidth={2.2} />

          {/* Miệng theo biểu cảm (Thinking / Excited / Happy) */}
          {pose === "think" ? (
            <path d="M -8 -24 Q 2 -27 10 -23" fill="none" stroke={OUTLINE} strokeWidth={3.2} strokeLinecap="round" />
          ) : pose === "eureka" ? (
            <path
              d="M -13 -27 Q 0 -13 13 -27 Z"
              fill="#9E2A2B"
              stroke={OUTLINE}
              strokeWidth={2.8}
              strokeLinejoin="round"
            />
          ) : (
            <path d="M -12 -26 Q 0 -17 13 -26" fill="none" stroke={OUTLINE} strokeWidth={3.2} strokeLinecap="round" />
          )}

          {/* Mái tóc nâu rối đặc trưng của Milo */}
          <path
            d="M -46 -62
               C -54 -88, -32 -114, -14 -108
               L -6 -120 L 4 -109
               L 16 -121 L 24 -106
               C 42 -110, 54 -86, 46 -62
               Q 34 -78, 16 -74
               Q 0 -82, -16 -74
               Q -34 -78, -46 -62 Z"
            fill={HAIR}
            stroke={OUTLINE}
            strokeWidth={3.2}
            strokeLinejoin="round"
          />
          {/* Các lọn tóc sáng tạo khối */}
          <path
            d="M -28 -96 Q -14 -108 0 -96 M 6 -98 Q 20 -108 32 -92"
            fill="none"
            stroke={HAIR_LIGHT}
            strokeWidth={3.5}
            strokeLinecap="round"
          />

          {/* KÍNH BẢO HỘ ĐỒNG (BRASS GOGGLES) ĐEO TRÊN TRÁN */}
          <g transform="translate(0, -84)">
            {/* Dây da đeo kính */}
            <path d="M -43 4 Q 0 -6 43 4" fill="none" stroke={LEATHER} strokeWidth={8} strokeLinecap="round" />
            <path d="M -43 4 Q 0 -6 43 4" fill="none" stroke={OUTLINE} strokeWidth={2.2} />
            {/* Khớp nối giữa 2 mắt kính */}
            <rect x={-6} y={-5} width={12} height={7} rx={2} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.2} />
            {/* Mắt kính đồng bên trái */}
            <circle cx={-19} cy={0} r={14.5} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.8} />
            <circle cx={-19} cy={0} r={9.5} fill="#253035" stroke={OUTLINE} strokeWidth={2} />
            <path d="M -24 -4 Q -20 -8 -15 -5" fill="none" stroke="#FFF8E7" strokeWidth={2.2} strokeLinecap="round" opacity={0.8} />
            {/* Mắt kính đồng bên phải */}
            <circle cx={19} cy={0} r={14.5} fill="url(#milo-brass-grad)" stroke={OUTLINE} strokeWidth={2.8} />
            <circle cx={19} cy={0} r={9.5} fill="#253035" stroke={OUTLINE} strokeWidth={2} />
            <path d="M 14 -4 Q 18 -8 23 -5" fill="none" stroke="#FFF8E7" strokeWidth={2.2} strokeLinecap="round" opacity={0.8} />
          </g>

          {/* Bong bóng cảm xúc / huy hiệu phía trên đầu */}
          {badge ? (
            <g transform="translate(0, -142)">
              <rect
                x={-56}
                y={-26}
                width={112}
                height={36}
                rx={12}
                fill={PARCHMENT.gold}
                stroke={OUTLINE}
                strokeWidth={3}
              />
              <text
                x={0}
                y={-1}
                textAnchor="middle"
                fill={OUTLINE}
                fontSize={21}
                fontWeight={900}
                fontFamily="sans-serif"
              >
                {badge}
              </text>
            </g>
          ) : null}
        </g>

        {/* ==================== CÁNH TAY TRƯỚC (THEO TƯ THẾ DIỄN) ==================== */}
        <g transform={`rotate(${armSwing} 30 -156)`}>
        {pose === "point" ? (
          <g>
            <path d="M 30 -156 Q 52 -152 68 -176" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M 30 -156 Q 52 -152 68 -176" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={72} cy={-180} r={10} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
          </g>
        ) : pose === "think" ? (
          /* Tư thế chống cằm suy nghĩ đúng như ảnh "Thinking" trong nhan_vat.jpg */
          <g>
            <path d="M 30 -156 Q 48 -136 14 -186" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M 30 -156 Q 48 -136 14 -186" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={10} cy={-190} r={10} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
          </g>
        ) : pose === "eureka" ? (
          <g>
            <path d="M 30 -158 Q 58 -182 52 -214" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M 30 -158 Q 58 -182 52 -214" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={52} cy={-220} r={10} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
          </g>
        ) : pose === "aimL" ? (
          /* Tư thế giơ thước ngắm chữ L ngang tầm mắt */
          <g>
            <path d="M 30 -156 Q 52 -166 56 -196" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M 30 -156 Q 52 -166 56 -196" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={56} cy={-200} r={9.5} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
            <polyline
              points="48,-206 86,-206 86,-244"
              fill="none"
              stroke={PARCHMENT.gold}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ) : (
          /* Tư thế mặc định: một tay giữ quai túi đeo chéo như ảnh chính của Milo */
          <g>
            <path d="M 32 -156 Q 46 -130 26 -102" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
            <path d="M 32 -156 Q 46 -130 26 -102" fill="none" stroke={SHIRT} strokeWidth={16} strokeLinecap="round" />
            <circle cx={24} cy={-98} r={9.5} fill={SKIN} stroke={OUTLINE} strokeWidth={2.8} />
          </g>
        )}
        </g>
      </g>
    </g>
  );
};
