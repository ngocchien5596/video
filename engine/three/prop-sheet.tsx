/**
 * Bảng đạo cụ của một tập 3D: mỗi đạo cụ chính đặt trên một bệ, xoay chậm, nhìn cận, có tên ở dưới.
 * Dùng để soát hình dạng, tỉ lệ, chất liệu so với "thẻ đối tượng" trước khi xem cả cảnh
 * (bước 4 trong projects/kien-thuc/docs/dung-canh-3d.md). Chỉ để duyệt nội bộ, không vào video.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { CamRig, DayLights, lambert, project, type Cam } from "./kit3d.tsx";
import { TEXT_FONT } from "../components/brand.ts";

export type PropItem = {
  /** Tên vật (đúng như trong thẻ đối tượng). */
  name: string;
  /** Mô hình, gốc đặt ở đáy vật, giữa. */
  node: React.ReactNode;
  /** Kích thước lớn nhất của vật (để phóng vừa ô). */
  size: number;
  /** Tâm vật cao bao nhiêu so với gốc (mặc định size/2). */
  center?: number;
};

const SIDE = 1080;

export const PropSheet: React.FC<{ items: PropItem[]; title: string }> = ({ items, title }) => {
  const frame = useCurrentFrame();
  const cols = Math.ceil(Math.sqrt(items.length));
  const rows = Math.ceil(items.length / cols);
  const cell = 4.4;
  const w = cols * cell;
  const h = rows * cell;
  const cam: Cam = { pos: [0, h * 1.15 + 3.5, h * 0.95 + 3.5], look: [0, 0.6, 0.3], fov: 34 };
  const at = (i: number): [number, number] => [(i % cols) * cell - w / 2 + cell / 2, Math.floor(i / cols) * cell - h / 2 + cell / 2];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #DCE8F2 0%, #F4F1E8 70%)" }}>
      <ThreeCanvas width={SIDE} height={SIDE} shadows gl={{ antialias: true, alpha: true }} camera={{ fov: 32 }}>
        <CamRig cam={cam} />
        <DayLights sun={[-6, 12, 8]} shadowSize={w + 4} fog={[200, 400]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#E9E4D6")}>
          <planeGeometry args={[100, 100]} />
        </mesh>
        {items.map((it, i) => {
          const [x, z] = at(i);
          const k = 2.3 / it.size;
          return (
            <group key={i} position={[x, 0, z]}>
              <mesh position={[0, 0.05, 0]} receiveShadow material={lambert("#CFC6B2")}>
                <cylinderGeometry args={[1.7, 1.75, 0.1, 32]} />
              </mesh>
              <group position={[0, 0.1, 0]} rotation={[0, frame * 0.025 + i, 0]} scale={k}>
                {it.node}
              </group>
            </group>
          );
        })}
      </ThreeCanvas>
      {items.map((it, i) => {
        const [x, z] = at(i);
        const [px, py] = project(cam, [x, 0, z + 1.85], SIDE, SIDE);
        return (
          <div
            key={i}
            style={{ position: "absolute", left: px, top: py, transform: "translate(-50%, 0)", fontFamily: TEXT_FONT, fontWeight: 800, fontSize: 30, color: "#2B2B2B", whiteSpace: "nowrap" }}
          >
            {it.name}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 30, top: 24, fontFamily: TEXT_FONT, fontWeight: 900, fontSize: 40, color: "#2B2B2B" }}>{title}</div>
    </AbsoluteFill>
  );
};
