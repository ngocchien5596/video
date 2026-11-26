/** Phòng trong nhà kiểu sân khấu hở mái (thấy trời): sàn gạch, tường, cửa, bàn, cờ, đường dốc. */
import React from "react";
import * as THREE from "three";
import { Box, lambert, tileFloor, type V3 } from "./kit3d.tsx";

/** Sàn + tường sau + hai tường bên, cao `h`. */
export const Room: React.FC<{ w: number; d: number; h?: number; wall?: string; dado?: string; floor?: [string, string]; sides?: boolean }> = ({
  w,
  d,
  h = 3,
  wall = "#D8ECE6",
  dado = "#A9D3CC",
  floor = ["#DAD4C7", "#BDB6A7"],
  sides = true,
}) => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={tileFloor(floor[0], floor[1], [w / 2, d / 2])}>
      <planeGeometry args={[w, d]} />
    </mesh>
    <Box p={[0, h / 2, -d / 2]} s={[w, h, 0.2]} c={wall} />
    <Box p={[0, 0.55, -d / 2 + 0.11]} s={[w, 0.08, 0.04]} c={dado} shadow={false} />
    <Box p={[0, 0.25, -d / 2 + 0.11]} s={[w, 0.5, 0.03]} c={dado} shadow={false} />
    <Box p={[0, h + 0.05, -d / 2]} s={[w + 0.1, 0.12, 0.3]} c="#F4F4EF" />
    {sides
      ? [-1, 1].map((sx) => (
          <group key={sx}>
            <Box p={[(sx * w) / 2, h / 2, 0]} s={[0.2, h, d]} c={wall} />
            <Box p={[(sx * w) / 2, h + 0.05, 0]} s={[0.3, 0.12, d + 0.1]} c="#F4F4EF" />
          </group>
        ))
      : null}
  </group>
);

/** Cánh cửa gỗ có khung và biển trắng, gắn trên tường hướng +z. */
export const Door: React.FC<{ p: V3; ry?: number; color?: string }> = ({ p, ry = 0, color = "#C98B3E" }) => (
  <group position={p} rotation={[0, ry, 0]}>
    <Box p={[0, 1.05, 0]} s={[1.05, 2.15, 0.08]} c="#8E5D24" />
    <Box p={[0, 1.02, 0.05]} s={[0.9, 2.0, 0.06]} c={color} />
    <Box p={[0, 1.55, 0.09]} s={[0.42, 0.16, 0.02]} c="#FFFFFF" shadow={false} />
    <mesh position={[0.32, 1.0, 0.1]} material={lambert("#E8C35A")}>
      <sphereGeometry args={[0.05, 8, 6]} />
    </mesh>
  </group>
);

/** Đèn tròn treo tường. */
export const WallLamp: React.FC<{ p: V3 }> = ({ p }) => (
  <mesh position={p} material={lambert("#FFF6D8", { emissive: new THREE.Color("#7A6A3A") })}>
    <sphereGeometry args={[0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
  </mesh>
);

/** Cờ Mỹ đơn giản trên cột. */
export const Flag: React.FC<{ p: V3; wave: number }> = ({ p, wave }) => (
  <group position={p}>
    <mesh position={[0, 1.2, 0]} material={lambert("#B9A06A")}>
      <cylinderGeometry args={[0.03, 0.03, 2.4, 6]} />
    </mesh>
    <group position={[0.45, 2.05, 0]} rotation={[0, Math.sin(wave) * 0.15, 0]}>
      {Array.from({ length: 7 }, (_, i) => (
        <Box key={i} p={[0, 0.3 - i * 0.09, 0]} s={[0.9, 0.09, 0.02]} c={i % 2 ? "#FFFFFF" : "#C8323A"} shadow={false} />
      ))}
      <Box p={[-0.22, 0.17, 0.015]} s={[0.42, 0.32, 0.02]} c="#2B3E7A" shadow={false} />
    </group>
  </group>
);

/** Bàn làm việc gỗ. */
export const Desk: React.FC<{ p: V3 }> = ({ p }) => (
  <group position={p}>
    <Box p={[0, 0.78, 0]} s={[2.0, 0.1, 0.95]} c="#6B3F22" />
    <Box p={[0, 0.4, 0.38]} s={[1.9, 0.72, 0.08]} c="#5A331B" />
    <Box p={[-0.9, 0.4, 0]} s={[0.12, 0.76, 0.9]} c="#5A331B" />
    <Box p={[0.9, 0.4, 0]} s={[0.12, 0.76, 0.9]} c="#5A331B" />
    <Box p={[0.5, 0.86, 0]} s={[0.4, 0.05, 0.3]} c="#F4F1E6" />
    <mesh position={[-0.6, 0.92, -0.1]} material={lambert("#2E7D4F")}>
      <cylinderGeometry args={[0.05, 0.07, 0.18, 8]} />
    </mesh>
  </group>
);

/** Đường dốc thoai thoải có lan can, đi lên theo +x. */
export const Ramp: React.FC<{ p: V3; len: number; rise: number; w?: number }> = ({ p, len, rise, w = 2.4 }) => {
  const ang = Math.atan2(rise, len);
  const L = Math.hypot(len, rise);
  return (
    <group position={p} rotation={[0, 0, ang]}>
      <Box p={[L / 2, -0.1, 0]} s={[L, 0.2, w]} c="#CFC9BC" />
      {Array.from({ length: Math.floor(L / 0.9) }, (_, i) => (
        <Box key={i} p={[0.45 + i * 0.9, 0.01, 0]} s={[0.12, 0.02, w * 0.92]} c="#E5B92E" shadow={false} />
      ))}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Box p={[L / 2, 0.9, (s * w) / 2]} s={[L, 0.06, 0.06]} c="#B8BDC2" />
          {Array.from({ length: Math.floor(L / 1.2) + 1 }, (_, i) => (
            <Box key={i} p={[i * 1.2, 0.45, (s * w) / 2]} s={[0.06, 0.9, 0.06]} c="#B8BDC2" shadow={false} />
          ))}
        </group>
      ))}
    </group>
  );
};
