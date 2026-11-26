/**
 * Khung sân khấu 3D dùng chung cho các tập dựng cảnh 3D (Kiến Thức từ tập 16).
 * Một tập chỉ cần khai báo danh sách cú máy theo nhịp: `{ hook: [câu 1, câu 2...], barrier: [...] }`,
 * mỗi cú máy là hàm `(t, u) => Shot` (t giây từ đầu câu, u = phần câu đã đọc 0..1), rồi gọi `makeStage3D`.
 * Hướng dẫn quy trình: projects/kien-thuc/docs/dung-canh-3d.md
 */
import React from "react";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { CamRig, DayLights, lambert, project, Sky, type Cam, type V3 } from "./kit3d.tsx";

/** Kích thước tấm sân khấu (LAYOUT.stage của khung giấy da). */
export const W = 900;
export const H = 786;

export type Stage3DProps = { beatKind: string; lineIndex: number; lineFrame: number; lineDur: number; fps: number; frame: number };

export type Shot = {
  cam: Cam;
  /** Vật thể 3D trong cảnh. */
  world: React.ReactNode;
  /** Lớp phủ HTML/SVG (số to, đồng hồ, khung ngắm...), toạ độ điểm ảnh trong sân khấu W×H. */
  over?: React.ReactNode;
  sky?: "day" | "space";
  light?: "day" | "indoor" | "space" | "snow";
  /** Phủ trắng 0..1 để cắt cảnh giữa câu. */
  flash?: number;
};
/** Một cú máy cho một câu: t giây từ đầu câu, u phần câu đã đọc (0..1). */
export type ShotFn = (t: number, u: number) => Shot;
export type ShotBook = Record<string, ShotFn[]>;

/** Chiếu điểm 3D ra điểm ảnh trong sân khấu (để đặt số liệu, dấu hỏi...). */
export const P = (cam: Cam, p: V3) => project(cam, p, W, H);
/** Máy quay bay vòng quanh `look`. */
export const orbit = (ang: number, r: number, h: number, look: V3 = [0, 0, 0], fov = 40): Cam => ({
  pos: [Math.sin(ang) * r + look[0], h, Math.cos(ang) * r + look[2]],
  look,
  fov,
});
/** Nhìn gần như thẳng từ trên xuống (`tilt` nghiêng nhẹ về phía nam). */
export const top = (h: number, look: V3 = [0, 0, 0], tilt = 0.01, fov = 40): Cam => ({ pos: [look[0], h, look[2] + tilt * h], look, fov });
export const goldMat = () => lambert("#FFD23F", { emissive: new THREE.Color("#8A6400") });

/** Dải phẳng nằm trên mặt đất nối hai điểm (đường, lối đi). */
export const BeamRoad: React.FC<{ a: [number, number]; b: [number, number]; mat: THREE.Material; w?: number; y?: number }> = ({ a, b, mat, w = 1.6, y = 0.04 }) => {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  return (
    <group position={[(a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2]} rotation={[0, -Math.atan2(dz, dx), 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={mat}>
        <planeGeometry args={[Math.hypot(dx, dz), w]} />
      </mesh>
    </group>
  );
};
/** Thanh sáng nổi ở độ cao `y` nối hai điểm (viền tô, đường đi). */
export const BeamY: React.FC<{ a: [number, number]; b: [number, number]; mat: THREE.Material; w?: number; y: number }> = ({ a, b, mat, w = 0.3, y }) => {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  return (
    <mesh position={[(a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2]} rotation={[0, -Math.atan2(dz, dx), 0]} material={mat}>
      <boxGeometry args={[Math.hypot(dx, dz) + w, 0.1, w]} />
    </mesh>
  );
};

const Lights: React.FC<{ kind: Shot["light"] }> = ({ kind }) => {
  if (kind === "indoor")
    return (
      <>
        <hemisphereLight args={["#FFFFFF", "#C9BFA8", 1.9]} />
        <directionalLight
          position={[-6, 14, 10]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          shadow-bias={-0.0006}
        />
      </>
    );
  if (kind === "space")
    return (
      <>
        <hemisphereLight args={["#FFFFFF", "#7E9B62", 1.6]} />
        <directionalLight position={[-30, 200, 60]} intensity={2.6} />
      </>
    );
  if (kind === "snow") return <DayLights fog={[30, 90]} fogColor="#DCEAF5" shadowSize={20} />;
  return <DayLights />;
};

/** Tạo sân khấu 3D của một tập từ sổ cú máy. Câu chưa có cú máy dùng cú cuối của nhịp đó. */
export const makeStage3D = (book: ShotBook): React.FC<Stage3DProps> => {
  const Stage: React.FC<Stage3DProps> = ({ beatKind, lineIndex, lineFrame, lineDur, fps, frame }) => {
    const list = book[beatKind] ?? book.hook ?? Object.values(book)[0];
    const fn = list[Math.min(lineIndex, list.length - 1)];
    const t = lineFrame / fps;
    const u = Math.min(1, t / Math.max(0.5, lineDur));
    const shot = fn(t, u);
    // Đầu mỗi câu (trừ câu mở màn): hoà nhẹ từ trắng để chuyển cảnh mềm.
    const enter = beatKind === "hook" && lineIndex === 0 ? 0 : (1 - Math.min(1, lineFrame / 7)) * 0.85;
    const flash = Math.max(shot.flash ?? 0, enter);
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {shot.sky === "space" ? (
          <Sky drift={0} tint="radial-gradient(ellipse at 50% 120%, #1D3F78 0%, #0B1530 60%, #050A18 100%)" />
        ) : (
          <Sky drift={frame * 0.6} />
        )}
        <ThreeCanvas
          width={W}
          height={H}
          shadows
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          camera={{ fov: 40, near: 0.1, far: 600 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <CamRig cam={shot.cam} />
          <Lights kind={shot.light} />
          {shot.world}
        </ThreeCanvas>
        {shot.over ? <div style={{ position: "absolute", inset: 0 }}>{shot.over}</div> : null}
        {flash > 0.001 ? <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash }} /> : null}
      </div>
    );
  };
  return Stage;
};
