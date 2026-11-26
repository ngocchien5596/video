/**
 * Sơ đồ "Vì sao phi hành gia bay lơ lửng trong tàu vũ trụ?" (4 bước):
 *   0  Trạm bay cao khoảng 400 km, sức hút ở đó vẫn còn khoảng 90%
 *   1  Trạm lao ngang khoảng 28.000 km/giờ: rơi đến đâu mặt đất cong đi đến đấy, không chạm đất
 *   2  Khoảng 90 phút rơi hết một vòng; người và đồ vật trong trạm cùng rơi
 *   3  Như trò chơi rơi tự do: cùng rơi thì quả bóng trông như lơ lửng
 * Nguồn: NASA (What Is Microgravity? K-4; Space Station Facts and Figures),
 * West Texas A&M (C. Baird: Why is there no gravity in space?).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { appearer, Arrow, Caption, INK, Kid } from "./common.tsx";
import { Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Sức hút ở đó vẫn rất mạnh", "Lao ngang thật nhanh: rơi mãi không chạm đất", "90 phút rơi hết một vòng", "Cùng rơi: trông như lơ lửng!"];

const RED = "#E5484D";
const SEA = "#3D7BD9";
const LAND = "#6DBE45";

/** Trái Đất to, chỉ thấy phần chỏm ở dưới bảng. */
const E = { x: 480, y: 760, r: 520 };
const ORBIT = 630;

/** Trạm vũ trụ: thân + hai tấm pin. */
const Station: React.FC<{ x: number; y: number; angle?: number; s?: number }> = ({ x, y, angle = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
    <rect x="-50" y="-13" width="32" height="26" fill={SEA} stroke={INK} strokeWidth="3" />
    <rect x="18" y="-13" width="32" height="26" fill={SEA} stroke={INK} strokeWidth="3" />
    <rect x="-18" y="-17" width="36" height="34" rx="7" fill="#E8ECF0" stroke={INK} strokeWidth="4" />
  </g>
);

const Ball: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 20 }) => <circle cx={x} cy={y} r={r} fill={RED} stroke={INK} strokeWidth="5" />;

const Big: React.FC<{ x: number; y: number; text: string; size: number; color?: string; opacity?: number }> = ({ x, y, text, size, color = INK, opacity = 1 }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={size} fill={color} opacity={opacity}>
    {text}
  </text>
);

/** Toạ độ trên quỹ đạo, góc tính từ đỉnh (độ, dương = sang phải). */
const onOrbit = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: E.x + Math.sin(a) * ORBIT, y: E.y - Math.cos(a) * ORBIT };
};

const BigEarth: React.FC<{ orbit: number }> = ({ orbit }) => (
  <g>
    <circle cx={E.x} cy={E.y} r={E.r} fill={SEA} stroke={INK} strokeWidth="7" />
    <path d="M330 262 q70 -40 150 -6 q-20 46 -120 40 z M560 250 q60 -10 100 30 q-50 16 -100 -30 z" fill={LAND} />
    <circle cx={E.x} cy={E.y} r={ORBIT} fill="none" stroke={INK} strokeWidth="4" strokeDasharray="12 10" opacity={orbit} />
  </g>
);

export const FloatBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);

  return (
    <g>
      {/* Bước 0: cao 400 km, sức hút còn 90% */}
      {step === 0 ? (
        <g>
          <BigEarth orbit={0} />
          <Station x={480} y={130} s={1.6} />
          <Arrow x1={480} y1={162} x2={480} y2={232} color={RED} width={8} p={appear(0, 10, 16)} />
          <g opacity={appear(0, 20, 14)}>
            <line x1={600} y1={130} x2={600} y2={238} stroke={INK} strokeWidth="4" strokeDasharray="8 8" />
            <Tag x={700} y={184} text="400 km" size={32} />
          </g>
          <g opacity={appear(0, 45, 14)}>
            <Big x={190} y={110} text="Sức hút còn" size={34} />
            <Big x={190} y={185} text="90%" size={72} color={RED} />
          </g>
        </g>
      ) : null}

      {/* Bước 1: lao ngang thật nhanh, rơi theo đường cong */}
      {step === 1
        ? (() => {
            const deg = -30 + ((stepFrame * 0.8) % 60);
            const st = onOrbit(deg);
            const a = (deg * Math.PI) / 180;
            const tx = Math.cos(a);
            const ty = Math.sin(a);
            const dx = -Math.sin(a);
            const dy = Math.cos(a);
            return (
              <g>
                <BigEarth orbit={0.6} />
                {/* Đường bay thẳng nếu không có sức hút */}
                <line x1={st.x} y1={st.y} x2={st.x + tx * 190} y2={st.y + ty * 190} stroke="#8A97A6" strokeWidth="5" strokeDasharray="10 10" />
                <Station x={st.x} y={st.y} angle={deg} s={1.4} />
                <Arrow x1={st.x + dx * 30} y1={st.y + dy * 30} x2={st.x + dx * 90} y2={st.y + dy * 90} color={RED} width={6} />
                <Tag x={190} y={95} text="28.000 km/giờ" size={30} opacity={appear(1, 10, 14)} color={SEA} />
                <Big x={800} y={105} text="Rơi mà" size={32} opacity={appear(1, 60, 14)} color={RED} />
                <Big x={800} y={145} text="không chạm đất!" size={32} opacity={appear(1, 60, 14)} color={RED} />
              </g>
            );
          })()
        : null}

      {/* Bước 2: 90 phút một vòng; bên trong trạm, người và bóng cùng rơi */}
      {step === 2
        ? (() => {
            const a = ((frame % 90) / 90) * Math.PI * 2;
            const bob = 6 * Math.sin(frame / 10);
            return (
              <g>
                <Tag x={200} y={72} text="90 phút / vòng" size={28} color={SEA} />
                <circle cx={200} cy={228} r={78} fill={SEA} stroke={INK} strokeWidth="5" />
                <path d="M150 200 q40 -30 80 -4 q-14 30 -70 26 z" fill={LAND} />
                <circle cx={200} cy={228} r={112} fill="none" stroke={INK} strokeWidth="4" strokeDasharray="10 8" opacity={0.6} />
                <Station x={200 + Math.sin(a) * 112} y={228 - Math.cos(a) * 112} angle={(a * 180) / Math.PI} s={0.8} />

                <g opacity={appear(2, 20, 14)}>
                  <rect x={410} y={70} width={500} height={265} rx={26} fill="#E8ECF0" stroke={INK} strokeWidth="6" />
                  <g transform={`translate(0 ${bob})`}>
                    <Kid x={540} y={300} s={1.45} />
                    <Ball x={720} y={165} r={24} />
                  </g>
                  <Arrow x1={610} y1={190} x2={610} y2={275} color={RED} width={6} />
                  <Arrow x1={720} y1={200} x2={720} y2={262} color={RED} width={6} />
                  <Tag x={820} y={110} text="CÙNG RƠI" size={30} color={RED} opacity={appear(2, 45, 14)} />
                </g>
              </g>
            );
          })()
        : null}

      {/* Bước 3: trò chơi rơi tự do, quả bóng lơ lửng trước mặt */}
      {step === 3
        ? (() => {
            const fall = ((frame % 54) / 54) * 120;
            return (
              <g>
                <rect x={470} y={52} width={30} height={296} fill="#C9D3DC" stroke={INK} strokeWidth="5" />
                <g transform={`translate(0 ${fall})`}>
                  <rect x={515} y={58} width={300} height={170} rx={18} fill="#FFF3B0" stroke={INK} strokeWidth="6" />
                  <Kid x={600} y={220} s={1.2} />
                  <Ball x={730} y={115} r={24} />
                </g>
                {[860, 890].map((x) => (
                  <line key={x} x1={x} y1={90 + fall} x2={x} y2={40 + fall} stroke={INK} strokeWidth="5" strokeLinecap="round" opacity={0.5} />
                ))}
                <Big x={225} y={135} text="Người với bóng" size={32} />
                <Big x={225} y={175} text="cùng rơi" size={32} />
                <Tag x={225} y={250} text="BÓNG LƠ LỬNG!" size={32} color={RED} opacity={appear(3, 40, 14)} />
              </g>
            );
          })()
        : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
