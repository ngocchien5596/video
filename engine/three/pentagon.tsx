/**
 * Lầu Năm Góc low-poly và khung cảnh quanh nó (đường, bãi xe, hồ, sông, cây, phố xa), dùng cho tập 16.
 * Đơn vị: vòng ngoài cùng (E) bán kính 8,8; tâm ở gốc toạ độ; máy quay mặc định nhìn từ phía nam (+z).
 */
import React, { useMemo } from "react";
import * as THREE from "three";
import { Box, lambert, ngon, ParkingLot, ringGeo, rng, Road, Trees, type V3, windowWall } from "./kit3d.tsx";

export const R_IN = [3.6, 4.7, 5.8, 6.9, 8.0];
export const R_W = 0.8;
export const R_OUT = R_IN.map((r) => r + R_W);
export const RING_H = 1.0;
const AP = Math.cos(Math.PI / 5);
/** Hướng (x, z) tới trung điểm cạnh thứ k và hướng dọc cạnh. */
export const sideDir = (k: number) => {
  const a = ((90 + 36 + k * 72) * Math.PI) / 180;
  const d: [number, number] = [Math.cos(a), -Math.sin(a)];
  const t: [number, number] = [-d[1], d[0]];
  return { a, d, t };
};
/** Mười hành lang: hai hành lang mỗi cạnh, cắt ngang các vòng. */
export const CORRIDORS = Array.from({ length: 10 }, (_, i) => {
  const k = Math.floor(i / 2);
  const off = i % 2 === 0 ? -1.35 : 1.35;
  const { a, d, t } = sideDir(k);
  const r0 = R_IN[0] * AP;
  const r1 = R_OUT[4] * AP;
  return {
    a,
    from: [d[0] * r0 + t[0] * off, d[1] * r0 + t[1] * off] as [number, number],
    to: [d[0] * r1 + t[0] * off, d[1] * r1 + t[1] * off] as [number, number],
  };
});

/** Thanh nối hai điểm trên mặt phẳng ngang (dùng vẽ viền sáng, hành lang). */
export const Beam: React.FC<{ a: [number, number]; b: [number, number]; y: number; w: number; h: number; mat: THREE.Material; shadow?: boolean }> = ({ a, b, y, w, h, mat, shadow = false }) => {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  return (
    <mesh position={[(a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2]} rotation={[0, -Math.atan2(dz, dx), 0]} material={mat} castShadow={shadow} receiveShadow={shadow}>
      <boxGeometry args={[Math.hypot(dx, dz) + w * 0.3, h, w]} />
    </mesh>
  );
};

const GOLD = new THREE.Color("#FFD23F");
const glowMat = (base: string) => {
  const m = new THREE.MeshLambertMaterial({ color: base, flatShading: true });
  return m;
};
const setGlow = (m: THREE.MeshLambertMaterial, base: string, k: number) => {
  m.color.set(base).lerp(GOLD, k);
  m.emissive.set("#000000").lerp(new THREE.Color("#7A5A00"), k);
};

export type PentagonProps = {
  /** Độ nhô lên của từng vòng (A..E). */
  lift?: number[];
  /** Độ sáng vàng mái từng vòng. */
  hi?: number[];
  /** Độ cao đã xây của từng vòng (0..1). */
  build?: number[];
  /** Độ sáng từng hành lang (10). */
  halls?: number[];
  /** Vạt (cạnh) được tô sáng và độ sáng. */
  wedge?: [number, number];
  at?: [number, number];
  stand?: boolean;
};

export const Pentagon: React.FC<PentagonProps> = ({ lift = [0, 0, 0, 0, 0], hi = [0, 0, 0, 0, 0], build = [1, 1, 1, 1, 1], halls, wedge, at = [0, 0], stand = true }) => {
  const roofs = useMemo(() => R_IN.map(() => glowMat("#D9D8D1")), []);
  const hallMats = useMemo(() => CORRIDORS.map(() => glowMat("#CFCEC6")), []);
  const wall = windowWall();
  roofs.forEach((m, i) => setGlow(m, "#D9D8D1", Math.max(hi[i] ?? 0, wedge ? 0 : 0)));
  hallMats.forEach((m, i) => setGlow(m, "#CFCEC6", halls?.[i] ?? 0));
  const allBuilt = build.every((b) => b >= 1);
  return (
    <group position={[at[0], 0, at[1]]}>
      {/* sân cỏ giữa và quảng trường */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#7DBB55")}>
        <circleGeometry args={[R_IN[0] + 0.2, 5, Math.PI / 2]} />
      </mesh>
      {[0, 1, 2, 3, 4].map((k) => {
        const { d } = sideDir(k);
        return <Beam key={k} a={[0, 0]} b={[d[0] * 2.9, d[1] * 2.9]} y={0.06} w={0.22} h={0.02} mat={lambert("#E7E0CF")} />;
      })}
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={lambert("#9B3D3A")}>
        <ringGeometry args={[0.72, 0.9, 32]} />
      </mesh>
      <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#E7E0CF")}>
        <circleGeometry args={[0.72, 32]} />
      </mesh>
      {stand ? <Kiosk p={[0, 0.07, 0]} s={0.55} /> : null}
      {COURT_TREES.map(([x, z, s], i) => (
        <mesh key={i} position={[x, 0.45 * s, z]} castShadow material={lambert(i % 2 ? "#4E9A3E" : "#62B14A")}>
          <icosahedronGeometry args={[0.45 * s, 1]} />
        </mesh>
      ))}
      {/* năm vòng nhà */}
      {R_IN.map((r, i) => {
        const b = build[i] ?? 1;
        if (b <= 0.001) return null;
        return (
          <group key={i} position={[0, (lift[i] ?? 0) + 0.05, 0]} scale={[1, b, 1]}>
            <mesh geometry={ringGeo(5, r, r + R_W, RING_H)} material={[roofs[i], wall]} castShadow receiveShadow />
          </group>
        );
      })}
      {/* mười hành lang nối các vòng */}
      {allBuilt
        ? CORRIDORS.map((c, i) => <Beam key={i} a={c.from} b={c.to} y={0.05 + RING_H * 0.42 + Math.min(...lift) * 0} w={0.34} h={RING_H * 0.84} mat={hallMats[i]} shadow />)
        : null}
      {/* vạt được tô */}
      {wedge && wedge[1] > 0 ? <WedgeGlow k={wedge[0]} t={wedge[1]} /> : null}
    </group>
  );
};

const COURT_TREES: [number, number, number][] = (() => {
  const r = rng(77);
  const out: [number, number, number][] = [];
  while (out.length < 26) {
    const a = r() * Math.PI * 2;
    const d = 1.3 + r() * 1.5;
    const x = Math.cos(a) * d;
    const z = Math.sin(a) * d;
    // tránh lối đi
    const near = [0, 1, 2, 3, 4].some((k) => {
      const { d: dd } = sideDir(k);
      const along = x * dd[0] + z * dd[1];
      const perp = Math.abs(-x * dd[1] + z * dd[0]);
      return along > 0 && perp < 0.35;
    });
    if (!near) out.push([x, z, 0.6 + r() * 0.5]);
  }
  return out;
})();

/** Viền vàng ôm một vạt (một cạnh) của toà nhà. */
const WedgeGlow: React.FC<{ k: number; t: number }> = ({ k, t }) => {
  const v0 = ngon(5, R_OUT[4] + 0.15);
  const v1 = ngon(5, R_IN[0] - 0.1);
  // cạnh k nối đỉnh k và k+1 theo cùng chiều với sideDir
  const i0 = k % 5;
  const i1 = (k + 1) % 5;
  const mat = lambert("#FFD23F", { emissive: new THREE.Color("#8A6400") });
  const y = RING_H + 0.12;
  const s = t;
  const pts: [number, number][] = [v0[i0], v0[i1], v1[i1], v1[i0]];
  return (
    <group>
      {pts.map((p, i) => (
        <Beam key={i} a={p} b={pts[(i + 1) % 4]} y={y} w={0.22 * s} h={0.08} mat={mat} />
      ))}
    </group>
  );
};

/** Quầy xúc xích: căn nhà nhỏ mái chóp xanh. `big` thêm cây xúc xích khổng lồ trên mái. */
export const Kiosk: React.FC<{ p: V3; s?: number; big?: boolean; ry?: number }> = ({ p, s = 1, big = false, ry = Math.PI / 4 }) => (
  <group position={p} scale={s} rotation={[0, 0, 0]}>
    <group rotation={[0, ry, 0]}>
      <Box p={[0, 0.42, 0]} s={[1.3, 0.84, 1.3]} c="#F4F1E6" />
      <Box p={[0, 0.12, 0]} s={[1.34, 0.24, 1.34]} c="#2E8B57" />
      <Box p={[0, 0.84, 0]} s={[1.38, 0.06, 1.38]} c="#2E8B57" />
    </group>
    <mesh position={[0, 1.22, 0]} castShadow material={lambert("#3FA36B")}>
      <coneGeometry args={[1.12, 0.7, 4]} />
    </mesh>
    <mesh position={[0, 1.62, 0]} material={lambert("#F4F1E6")}>
      <sphereGeometry args={[0.07, 8, 6]} />
    </mesh>
    {big ? (
      <group position={[0, 1.72, 0]} rotation={[0, 0.2, 0]}>
        <group scale={3.2} rotation={[0, 0, 0]}>
          <mesh material={lambert("#E3A955")} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.75]}>
            <capsuleGeometry args={[0.09, 0.32, 4, 10]} />
          </mesh>
          <mesh position={[0, 0.03, 0]} material={lambert("#B8452E")} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.06, 0.42, 4, 10]} />
          </mesh>
          <mesh position={[0, 0.09, 0]} material={lambert("#F2C230")} rotation={[0, 0, Math.PI / 2]} scale={[0.3, 1, 0.4]}>
            <capsuleGeometry args={[0.03, 0.3, 3, 6]} />
          </mesh>
        </group>
      </group>
    ) : null}
  </group>
);

/* ---------- Khung cảnh quanh toà nhà ---------- */

type Rect = [number, number, number, number];
const LOTS: { x: number; z: number; w: number; d: number; seed: number }[] = [
  { x: -1, z: 17, w: 26, d: 8, seed: 3 },
  { x: 16, z: -9, w: 9, d: 12, seed: 5 },
  { x: -17, z: -6, w: 7, d: 10, seed: 8 },
];
const ROADS: [[number, number], [number, number], number][] = [
  [[-60, 12], [60, 12], 1.4],
  [[-60, 22.5], [60, 22.5], 1.8],
  [[-13.2, 60], [-11.5, -60], 2.2],
  [[-10.8, 60], [-9.1, -60], 1.2],
  [[-60, -14], [60, -17], 1.4],
  [[11.5, 60], [11.5, -14], 1.2],
  [[22, 40], [29, -24], 1.6],
  [[-60, 40], [60, 34], 1.6],
];
const inRect = (x: number, z: number, r: Rect) => x > r[0] && x < r[1] && z > r[2] && z < r[3];
const distSeg = (x: number, z: number, a: [number, number], b: [number, number]) => {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz)));
  return Math.hypot(x - a[0] - t * dx, z - a[1] - t * dz);
};
export const LAGOON = { x: 25, z: -27, r: 7 };
const RIVER_Z = [-36, -52];

const TREE_SPOTS: [number, number, number][] = (() => {
  const r = rng(11);
  const out: [number, number, number][] = [];
  let guard = 0;
  while (out.length < 1100 && guard++ < 20000) {
    const x = (r() - 0.5) * 130;
    const z = -34 + r() * 90;
    if (Math.hypot(x, z) < 11) continue;
    if (LOTS.some((l) => inRect(x, z, [l.x - l.w / 2 - 0.6, l.x + l.w / 2 + 0.6, l.z - l.d / 2 - 0.6, l.z + l.d / 2 + 0.6]))) continue;
    if (ROADS.some(([a, b, w]) => distSeg(x, z, a, b) < w / 2 + 0.9)) continue;
    if (Math.hypot(x - LAGOON.x, z - LAGOON.z) < LAGOON.r + 0.8) continue;
    if (r() < 0.35 && Math.hypot(x, z) < 26) continue;
    out.push([x, z, 0.55 + r() * 0.6]);
  }
  return out;
})();

const CITY: [number, number, number, number, string][] = (() => {
  const r = rng(21);
  const out: [number, number, number, number, string][] = [];
  for (let i = 0; i < 160; i++) {
    const x = (r() - 0.5) * 160;
    const z = -58 - r() * 40;
    out.push([x, z, 1.2 + r() * 2.5, 0.8 + r() * (Math.abs(x) < 30 ? 3 : 6), r() < 0.5 ? "#E9E6DE" : "#CFD3D6"]);
  }
  return out;
})();

/** Mặt đất, đường, bãi xe, hồ, sông, cây, phố xa. `plain` chỉ giữ nền cỏ nhạt. */
export const Campus: React.FC<{ plain?: number; trees?: boolean }> = ({ plain = 0, trees = true }) => {
  const ground = useMemo(() => new THREE.MeshLambertMaterial({ color: "#86C45E" }), []);
  ground.color.set("#86C45E").lerp(new THREE.Color("#BBDD8C"), plain);
  const full = plain < 0.5;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={ground}>
        <planeGeometry args={[400, 400]} />
      </mesh>
      {full ? (
        <>
          <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#9ACF6E")}>
            <circleGeometry args={[11, 5, Math.PI / 2]} />
          </mesh>
          {ROADS.map(([a, b, w], i) => (
            <Road key={i} a={a} b={b} w={w} />
          ))}
          {[
            [-12, 30, 5],
            [-12, 4, 3.4],
          ].map(([x, z, r], i) => (
            <mesh key={i} position={[x, 0.025, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#5B6067")}>
              <ringGeometry args={[r - 0.7, r, 40]} />
            </mesh>
          ))}
          {LOTS.map((l, i) => (
            <ParkingLot key={i} {...l} />
          ))}
          <mesh position={[LAGOON.x, 0.03, LAGOON.z]} rotation={[-Math.PI / 2, 0, 0]} material={lambert("#E8DFC0")}>
            <circleGeometry args={[LAGOON.r + 0.5, 40]} />
          </mesh>
          <mesh position={[LAGOON.x, 0.04, LAGOON.z]} rotation={[-Math.PI / 2, 0, 0]} material={lambert("#3E95CF")}>
            <circleGeometry args={[LAGOON.r, 40]} />
          </mesh>
          <Box p={[LAGOON.x - 2, 0.15, LAGOON.z + 1]} s={[1.2, 0.25, 0.45]} c="#FFFFFF" ry={0.4} />
          <mesh position={[0, 0.035, (RIVER_Z[0] + RIVER_Z[1]) / 2]} rotation={[-Math.PI / 2, 0, 0]} material={lambert("#3E8FC8")}>
            <planeGeometry args={[400, RIVER_Z[0] - RIVER_Z[1]]} />
          </mesh>
          <mesh position={[0, 0.03, RIVER_Z[0] + 0.4]} rotation={[-Math.PI / 2, 0, 0]} material={lambert("#E8DFC0")}>
            <planeGeometry args={[400, 1.6]} />
          </mesh>
          {trees ? <Trees spots={TREE_SPOTS} /> : null}
          {CITY.map(([x, z, w, h, c], i) => (
            <Box key={i} p={[x, h / 2, z]} s={[w, h, w * 0.8]} c={c} shadow={false} />
          ))}
          <Box p={[-4, 6, -66]} s={[0.9, 12, 0.9]} c="#F2F0EA" shadow={false} />
          <mesh position={[-4, 12.4, -66]} material={lambert("#F2F0EA")}>
            <coneGeometry args={[0.64, 0.9, 4]} />
          </mesh>
        </>
      ) : null}
    </group>
  );
};
