/**
 * Sơ đồ "Vì sao mình đổ mồ hôi?" (4 bước):
 *   0  Chạy nhảy, ra nắng: não nhận ra người nóng hơn bình thường
 *   1  Não báo cho tuyến mồ hôi trong da, mồ hôi được đẩy ra mặt da
 *   2  Mồ hôi bay hơi khỏi da, da và người mát đi
 *   3  Mùi hôi do vi khuẩn sống sẵn trên da biến đổi mồ hôi; tắm rửa là hết mùi
 * Nguồn: Cleveland Clinic (Sweat; Body Odor), Harvard Health Publishing, Ohio State University Wexner Medical Center.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, Drop, INK, Kid, Label, Sun } from "./common.tsx";
import { BRAIN, NERVE, Tag, Zigzag } from "./w4-parts.tsx";

const CAPTIONS = ["Người nóng lên: não nhận ra ngay", "Tuyến mồ hôi đẩy mồ hôi ra da", "Mồ hôi bay hơi: người mát đi", "Mùi hôi là do vi khuẩn trên da"];

const KID = { x: 150, y: 330 };
const SKIN = { x0: 330, x1: 680, top: 200, bottom: 330 };
const GLANDS = [400, 505, 610];
const GERM = "#5DBB63";

/** Tuyến mồ hôi: búi ống cuộn dưới da, ống dẫn thẳng lên mặt da. */
const Gland: React.FC<{ x: number; glow: number }> = ({ x, glow }) => (
  <g>
    <line x1={x} y1={SKIN.top} x2={x} y2={SKIN.bottom - 42} stroke={INK} strokeWidth="9" />
    <line x1={x} y1={SKIN.top} x2={x} y2={SKIN.bottom - 42} stroke="#BFE3F7" strokeWidth="4" />
    <path
      d={`M${x} ${SKIN.bottom - 42} c-22 0 -22 16 0 16 c22 0 22 16 0 16 c-22 0 -22 -16 0 -16`}
      fill="none"
      stroke={glow > 0 ? NERVE : "#7FB6E0"}
      strokeWidth="7"
      strokeLinecap="round"
    />
  </g>
);

/** Vi khuẩn hoạt hình nhỏ (tròn xanh, mắt to). */
const Germ: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y}) scale(1.35)`}>
    {[0, 60, 120, 180, 240, 300].map((a) => {
      const r = (a * Math.PI) / 180;
      return <line key={a} x1={Math.cos(r) * 10} y1={Math.sin(r) * 10} x2={Math.cos(r) * 16} y2={Math.sin(r) * 16} stroke={INK} strokeWidth="3" strokeLinecap="round" />;
    })}
    <circle r={11} fill={GERM} stroke={INK} strokeWidth="3" />
    <circle cx={-4} cy={-3} r={2.2} fill={INK} />
    <circle cx={4} cy={-3} r={2.2} fill={INK} />
  </g>
);

export const SweatBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const hot = appear(0, 2, 16);
  const push = appear(1, 0, 20);
  const evap = appear(2, 0, 24);
  const smell = appear(3, 0, 14);
  const only = (k: number, v: number) => (step === k ? v : 0);
  // Mức nóng (0..1): tăng ở bước 0, giảm khi mồ hôi bay hơi.
  const heat = hot * (1 - 0.8 * evap);
  const bob = step === 0 ? Math.abs(Math.sin(frame / 5)) * -8 : 0;
  // Giọt mồ hôi trên mặt da: nhô lên ở bước 1, nhỏ dần ở bước 2.
  const dropS = push * (1 - 0.55 * evap);

  return (
    <g>
      {/* Bé chạy dưới nắng, não, nhiệt kế */}
      <Sun x={70} y={95} r={30} pulse={1 + 0.04 * Math.sin(frame / 6)} />
      <g transform={`translate(0 ${bob})`}>
        <Kid x={KID.x} y={KID.y} s={1.7} />
        <ellipse cx={KID.x} cy={KID.y - 165} rx={18} ry={12} fill={BRAIN} stroke={INK} strokeWidth="3" opacity={hot} />
        {step <= 1 ? <circle cx={KID.x} cy={KID.y - 165} r={24} fill="none" stroke={NERVE} strokeWidth="5" opacity={hot * (0.5 + 0.5 * Math.sin(frame / 4))} /> : null}
        {/* Hơi nóng quanh người */}
        {[-55, 55].map((dx) => (
          <path key={dx} d={`M${KID.x + dx} ${KID.y - 60} q-8 -12 0 -24 q8 -12 0 -24`} fill="none" stroke="#E5484D" strokeWidth="5" strokeLinecap="round" opacity={heat} />
        ))}
      </g>
      {/* Nhiệt kế */}
      <g opacity={hot}>
        <rect x={252} y={110} width={22} height={150} rx={11} fill="#FFFFFF" stroke={INK} strokeWidth="4" />
        <rect x={258} y={250 - 130 * (0.25 + 0.7 * heat)} width={10} height={130 * (0.25 + 0.7 * heat)} rx={5} fill="#E5484D" />
        <circle cx={263} cy={270} r={18} fill="#E5484D" stroke={INK} strokeWidth="4" />
      </g>

      {/* Lát cắt da với tuyến mồ hôi (từ bước 1) */}
      {step >= 1 ? (
        <g opacity={push}>
          <rect x={SKIN.x0} y={SKIN.top} width={SKIN.x1 - SKIN.x0} height={SKIN.bottom - SKIN.top} fill="#F8D2B0" stroke={INK} strokeWidth="6" />
          {GLANDS.map((x) => (
            <Gland key={x} x={x} glow={step === 1 ? 1 : 0} />
          ))}
          {step === 1 ? <Zigzag x1={KID.x + 30} y1={KID.y - 165} x2={GLANDS[0] - 20} y2={SKIN.bottom - 30} p={appear(1, 0, 14)} teeth={10} /> : null}
          {GLANDS.map((x, i) => (
            <Drop key={x} x={x + (i === 1 ? 0 : 0)} y={SKIN.top - 14 * dropS} s={2.2 * dropS} />
          ))}
          {/* Bước 2: hơi nước bay lên */}
          {step >= 2
            ? GLANDS.map((x, i) => (
                <path
                  key={x}
                  d={`M${x} ${SKIN.top - 40 - 10 * Math.sin(frame / 6 + i)} q-10 -12 0 -24 q10 -12 0 -24`}
                  fill="none"
                  stroke="#7FC8F8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity={evap * (1 - smell)}
                />
              ))
            : null}
        </g>
      ) : null}

      {/* Bước 3: vi khuẩn bên giọt mồ hôi, làn mùi; bọt xà phòng */}
      {smell > 0 ? (
        <g opacity={smell}>
          {GLANDS.map((x, i) => (
            <g key={x}>
              <Germ x={x + 36} y={SKIN.top - 20} />
              <path d={`M${x + 36} ${SKIN.top - 50} q-8 -10 0 -20 q8 -10 0 -20`} fill="none" stroke="#8FA36B" strokeWidth="5" strokeLinecap="round" transform={`translate(0 ${-3 * Math.sin(frame / 6 + i)})`} />
            </g>
          ))}
        </g>
      ) : null}

      {/* Nhãn bên phải */}
      <Tag x={830} y={150} text="NÓNG LÊN!" size={26} color="#C0392B" opacity={only(0, hot)} />
      <Tag x={830} y={215} text="NÃO NHẬN RA" size={24} color="#B07A00" opacity={only(0, hot)} />

      <Tag x={830} y={150} text="NÃO BÁO!" size={24} color="#B07A00" opacity={only(1, push)} />
      <Tag x={830} y={215} text="TUYẾN MỒ HÔI" size={24} color="#2C5FAD" opacity={only(1, push)} />
      <Tag x={830} y={280} text="ĐẨY RA MẶT DA" size={22} opacity={only(1, push)} />

      <Tag x={830} y={170} text="BAY HƠI" size={26} color="#2C5FAD" opacity={only(2, evap)} />
      <Label x={830} y={250} text="MÁT ĐI!" size={36} color="#2C5FAD" opacity={only(2, evap)} />

      <Tag x={805} y={150} text="VI KHUẨN TRÊN DA" size={20} color="#2E7D32" opacity={smell} />
      <Tag x={805} y={210} text="MỒ HÔI: KHÔNG MÙI" size={20} opacity={smell} />
      <Tag x={805} y={275} text="TẮM RỬA LÀ HẾT MÙI" size={20} color="#2C5FAD" opacity={smell} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
