/**
 * Tập 16 "Lầu Năm Góc": cảnh 3D low-poly (three.js) theo lối video tài liệu hoạt hình:
 * máy quay bay trên toà nhà, số liệu nổi to, cảnh trong nhà hở mái thấy trời.
 * Mỗi câu (`beatKind`, `lineIndex`) là một cú máy; thời điểm tính theo phần câu đã đọc (`u` 0..1) để khớp giọng.
 */
import React from "react";
import * as THREE from "three";
import { Ask, BigNum, Box, Clock, HotDog, lambert, lerp, lerpCam, ngon, popIn, Reticle, rng, sm, Stick, type Cam, type V3 } from "../three/kit3d.tsx";
import { BeamRoad, BeamY as BeamAt, goldMat, H, makeStage3D, orbit, P, top, W, type Shot, type ShotFn } from "../three/stage.tsx";
import { Campus, CORRIDORS, Kiosk, Pentagon, R_IN, R_OUT, R_W, RING_H, sideDir } from "../three/pentagon.tsx";
import { Desk, Door, Flag, Ramp, Room, WallLamp } from "../three/interior.tsx";

const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");
const clampP = (x: number) => Math.min(1, Math.max(0, x));
/** Viền sáng nằm trên mái toà nhà. */
const BeamY: React.FC<{ a: [number, number]; b: [number, number]; mat: THREE.Material; w?: number }> = (p) => <BeamAt {...p} y={RING_H + 0.15} />;

/* ---------- Đám đông, thị trấn ---------- */

const CROWD = (() => {
  const r = rng(5);
  return Array.from({ length: 140 }, () => ({ x: -11 + r() * 22, z: 13.5 + r() * 7, d: r() }));
})();
const Crowd: React.FC<{ k: number }> = ({ k }) => (
  <>
    {k <= 0
      ? null
      : CROWD.map((c, i) => {
          const p = (k * 1.6 - c.d * 0.6 + 1) % 1;
          const z = lerp(c.z, R_OUT[4] * 0.81 + 0.3, p);
          const x = lerp(c.x, c.x * 0.55, p);
          return (
            <mesh key={i} position={[x, 0.18, z]} material={lambert(i % 3 ? "#26303A" : "#3B5C8C")}>
              <capsuleGeometry args={[0.07, 0.16, 3, 6]} />
            </mesh>
          );
        })}
  </>
);

/** Thị trấn nhỏ trên đảo cỏ để so số dân. */
const Town: React.FC<{ k: number; p: V3 }> = ({ k, p }) =>
  k <= 0 ? null : (
    <group position={p} scale={k}>
      <mesh position={[0, -0.5, 0]} castShadow material={lambert("#8B6A45")}>
        <cylinderGeometry args={[3.2, 2.4, 1, 8]} />
      </mesh>
      <mesh position={[0, 0.02, 0]} material={lambert("#7CC25A")}>
        <cylinderGeometry args={[3.25, 3.25, 0.06, 8]} />
      </mesh>
      {(
        [
          [-1.6, -0.8, "#E85D4A"],
          [-0.3, -1.6, "#F1C94B"],
          [1.2, -0.9, "#5B8DD6"],
          [-1.0, 0.8, "#E89A4A"],
          [0.6, 0.6, "#E85D4A"],
          [1.8, 0.6, "#F4F1E6"],
          [-2.2, 0.4, "#5B8DD6"],
          [0.1, 1.8, "#F1C94B"],
        ] as [number, number, string][]
      ).map(([x, z, c], i) => (
        <group key={i} position={[x, 0, z]}>
          <Box p={[0, 0.3, 0]} s={[0.7, 0.6, 0.6]} c="#F6F1E4" />
          <mesh position={[0, 0.8, 0]} rotation={[0, Math.PI / 4, 0]} castShadow material={lambert(c)}>
            <coneGeometry args={[0.6, 0.45, 4]} />
          </mesh>
        </group>
      ))}
    </group>
  );

/* ---------- Thi công ---------- */

const Crane: React.FC<{ p: V3; ry: number; k: number }> = ({ p, ry, k }) =>
  k <= 0.001 ? null : (
    <group position={p} rotation={[0, ry, 0]} scale={[1, k, 1]}>
      <Box p={[0, 2.2, 0]} s={[0.22, 4.4, 0.22]} c="#F2B92B" />
      <Box p={[0.9, 4.4, 0]} s={[3.6, 0.18, 0.18]} c="#F2B92B" />
      <Box p={[-0.9, 4.2, 0]} s={[0.5, 0.4, 0.4]} c="#6A6F75" />
      <Box p={[2.3, 3.6, 0]} s={[0.02, 1.6, 0.02]} c="#333333" shadow={false} />
    </group>
  );

const sandCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(14, 0.4, -42), new THREE.Vector3(9, 16, -22), new THREE.Vector3(2.5, 1.2, -6));
const sandTube = new THREE.TubeGeometry(sandCurve, 80, 0.35, 8, false);
const SandArc: React.FC<{ k: number; t: number }> = ({ k, t }) => {
  if (k <= 0) return null;
  sandTube.setDrawRange(0, Math.floor((sandTube.index!.count / 6) * k) * 6);
  return (
    <>
      <Box p={[14, 0.3, -42]} s={[3, 0.5, 1.2]} c="#8C5A3C" />
      <Box p={[13.4, 0.9, -42]} s={[0.8, 0.8, 0.8]} c="#E9E4D8" />
      <mesh geometry={sandTube} material={lambert("#FFD23F", { emissive: new THREE.Color("#8A6400") })} />
      {Array.from({ length: 24 }, (_, i) => {
        const s = ((i / 24 + t * 0.45) % 1) * k;
        const v = sandCurve.getPoint(s);
        return (
          <mesh key={i} position={[v.x, v.y, v.z]} material={lambert("#E8C25A")}>
            <icosahedronGeometry args={[0.6, 0]} />
          </mesh>
        );
      })}
    </>
  );
};

/* ---------- Bối cảnh phụ ---------- */

/** Toà chọc trời kiểu art deco. */
const Tower: React.FC<{ p: V3; k: number }> = ({ p, k }) =>
  k <= 0.001 ? null : (
    <group position={p} scale={[1, k, 1]}>
      <Box p={[0, 4.5, 0]} s={[3.2, 9, 2.6]} c="#C9CED3" />
      <Box p={[0, 10, 0]} s={[2.4, 2, 2]} c="#BFC5CB" />
      <Box p={[0, 11.8, 0]} s={[1.6, 1.6, 1.4]} c="#B7BDC4" />
      <Box p={[0, 13.1, 0]} s={[0.9, 1, 0.8]} c="#AEB5BC" />
      <mesh position={[0, 14.6, 0]} material={lambert("#AEB5BC")}>
        <cylinderGeometry args={[0.06, 0.25, 2, 6]} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i} p={[-1.2 + i * 0.34, 4.6, 1.31]} s={[0.12, 8.6, 0.02]} c="#8E98A3" shadow={false} />
      ))}
    </group>
  );

/** Toà nhà mái vòm (toà Quốc hội). */
const Capitol: React.FC<{ p: V3; ry: number; s: number }> = ({ p, ry, s }) =>
  s <= 0.001 ? null : (
    <group position={p} rotation={[0, ry, 0]} scale={s}>
      <Box p={[0, 0.45, 0]} s={[8, 0.9, 2.2]} c="#F7F5EF" />
      <Box p={[0, 1.0, 0]} s={[2.8, 0.4, 2.4]} c="#F2EFE6" />
      <mesh position={[0, 1.5, 0]} castShadow material={lambert("#F7F5EF")}>
        <cylinderGeometry args={[0.9, 1.0, 0.8, 16]} />
      </mesh>
      <mesh position={[0, 1.9, 0]} castShadow material={lambert("#F7F5EF")}>
        <sphereGeometry args={[0.95, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh position={[0, 3.0, 0]} material={lambert("#F7F5EF")}>
        <cylinderGeometry args={[0.15, 0.2, 0.5, 8]} />
      </mesh>
    </group>
  );

/** Vệ tinh. */
const Satellite: React.FC<{ p: V3; ry: number }> = ({ p, ry }) => (
  <group position={p} rotation={[0.25, ry, 0.1]}>
    <mesh material={lambert("#D9B44A")}>
      <cylinderGeometry args={[0.9, 0.9, 2.4, 12]} />
    </mesh>
    <mesh position={[0, -1.4, 0]} material={lambert("#8E959C")}>
      <cylinderGeometry args={[0.6, 0.9, 0.5, 12]} />
    </mesh>
    {[-1, 1].map((s) => (
      <group key={s}>
        <Box p={[s * 2.6, 0.2, 0]} s={[3.4, 1.3, 0.06]} c="#2D5BA8" shadow={false} />
        <Box p={[s * 1.1, 0.2, 0]} s={[0.6, 0.1, 0.1]} c="#8E959C" shadow={false} />
      </group>
    ))}
    <mesh position={[0, 1.6, 0]} material={lambert("#BFC3C7")}>
      <cylinderGeometry args={[0.04, 0.04, 1.2, 6]} />
    </mesh>
  </group>
);

/** Tên lửa nhô lên từ hầm (`k` 0..1), nghiêng `tilt`. */
const Missile: React.FC<{ p: V3; k: number; tilt: number }> = ({ p, k, tilt }) => (
  <group position={[p[0], p[1] + k * 3.6 - 3.8, p[2]]} rotation={[tilt, 0, 0]}>
    <mesh position={[0, 1.6, 0]} castShadow material={lambert("#F2F2EE")}>
      <cylinderGeometry args={[0.32, 0.32, 3.2, 14]} />
    </mesh>
    <mesh position={[0, 3.65, 0]} castShadow material={lambert("#C9302C")}>
      <coneGeometry args={[0.32, 0.9, 14]} />
    </mesh>
    <mesh position={[0, 2.4, 0]} material={lambert("#C9302C")}>
      <cylinderGeometry args={[0.33, 0.33, 0.25, 14]} />
    </mesh>
    {[0, 1, 2, 3].map((i) => (
      <Box key={i} p={[Math.cos((i * Math.PI) / 2) * 0.42, 0.3, Math.sin((i * Math.PI) / 2) * 0.42]} s={[0.3, 0.6, 0.05]} ry={(-i * Math.PI) / 2} c="#C9302C" />
    ))}
  </group>
);

const SNOW_TREES = (() => {
  const r = rng(31);
  const out: [number, number, number][] = [];
  while (out.length < 90) {
    const x = (r() - 0.5) * 60;
    const z = -40 + r() * 46;
    if (Math.abs(x) < 6 && z > -8) continue;
    out.push([x, z, 0.8 + r() * 0.7]);
  }
  return out;
})();
const SnowField: React.FC<{ k: number; tilt: number }> = ({ k, tilt }) => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#F2F5F8")}>
      <planeGeometry args={[300, 300]} />
    </mesh>
    {SNOW_TREES.map(([x, z, s], i) => (
      <group key={i} position={[x, 0, z]} scale={s}>
        <mesh position={[0, 1.1, 0]} castShadow material={lambert(i % 2 ? "#2F7A4A" : "#3B8C55")}>
          <coneGeometry args={[0.7, 1.8, 7]} />
        </mesh>
        <mesh position={[0, 1.75, 0]} material={lambert("#FFFFFF")}>
          <coneGeometry args={[0.36, 0.6, 7]} />
        </mesh>
      </group>
    ))}
    {[-2.4, 2.4].map((x, i) => (
      <group key={i}>
        <mesh position={[x, 0.02, 0]} material={lambert("#3A3F45")}>
          <cylinderGeometry args={[0.8, 0.8, 0.06, 20]} />
        </mesh>
        <mesh position={[x + sm(k, 0, 0.25) * 1.7, 0.08, 0]} material={lambert("#9AA1A8")}>
          <cylinderGeometry args={[0.85, 0.85, 0.12, 20]} />
        </mesh>
        <Missile p={[x, 0, 0]} k={sm(k, 0.2, 0.7)} tilt={-tilt} />
      </group>
    ))}
  </group>
);

const cutCache = new Map<number, THREE.ShapeGeometry>();
/** Mặt cắt khối đất, khoét ô cửa hầm theo độ mở `k`. */
const cutFace = (k: number) => {
  const q = Math.round(Math.min(1, Math.max(0, k)) * 40) / 40;
  if (!cutCache.has(q)) {
    const sh = new THREE.Shape([new THREE.Vector2(-4, -1.6), new THREE.Vector2(4, -1.6), new THREE.Vector2(4, 1.6), new THREE.Vector2(-4, 1.6)]);
    if (q > 0.01) {
      const w = 2.6 * q;
      const h = 0.9 * q;
      const cy = -0.15;
      sh.holes.push(new THREE.Path([new THREE.Vector2(-w, cy - h), new THREE.Vector2(w, cy - h), new THREE.Vector2(w, cy + h), new THREE.Vector2(-w, cy + h)]));
    }
    cutCache.set(q, new THREE.ShapeGeometry(sh));
  }
  return cutCache.get(q)!;
};

/** Nửa khối đất cắt ngang dưới quảng trường, mặt cắt quay về máy quay, căn hầm tưởng tượng lộ ra. */
const Diorama: React.FC<{ bunker: number }> = ({ bunker }) => (
  <group>
    <mesh position={[0, -1.6, 0]} castShadow material={lambert("#9A6B43")}>
      <cylinderGeometry args={[4, 4, 3.2, 40, 1, false, Math.PI / 2, Math.PI]} />
    </mesh>
    <mesh position={[0, -1.6, 0]} geometry={cutFace(bunker)} material={lambert("#8A5D39")} />
    <mesh position={[0, 0.0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#7DBB55")}>
      <circleGeometry args={[4.02, 40, 0, Math.PI]} />
    </mesh>
    <mesh position={[0, 0.02, -1.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#E7E0CF")}>
      <circleGeometry args={[1.1, 32]} />
    </mesh>
    <Kiosk p={[0, 0.02, -1.2]} s={0.8} />
    {bunker > 0.001 ? (
      <group position={[0, -1.75, 0.02]} scale={[bunker, bunker, 1]}>
        <Box p={[0, 0, -1.2]} s={[5.2, 1.8, 0.1]} c="#2C3E50" shadow={false} />
        <Box p={[0, -0.9, -0.6]} s={[5.2, 0.1, 1.2]} c="#3B4B5B" shadow={false} />
        <Box p={[-2.6, 0, -0.6]} s={[0.1, 1.8, 1.2]} c="#22313F" shadow={false} />
        <Box p={[2.6, 0, -0.6]} s={[0.1, 1.8, 1.2]} c="#22313F" shadow={false} />
        <Box p={[0, 0.9, -0.6]} s={[5.2, 0.1, 1.2]} c="#22313F" shadow={false} />
        <Box p={[0, 0.1, -1.12]} s={[2.6, 0.9, 0.04]} c="#BFD9EA" shadow={false} />
        <Box p={[0, -0.62, -0.6]} s={[1.4, 0.45, 0.6]} c="#2E7D4F" />
        <Box p={[0, 1.4, -1.2]} s={[0.4, 1.0, 0.4]} c="#3A4752" shadow={false} />
        <Stick p={[-1.4, -0.85, -0.5]} s={0.5} outfit="general" ry={0.5} />
        <Stick p={[1.4, -0.85, -0.5]} s={0.5} outfit="general" ry={-0.5} />
      </group>
    ) : null}
    {Array.from({ length: 7 }, (_, i) => {
      const a = 0.25 + (i / 6) * (Math.PI - 0.5);
      return (
        <mesh key={i} position={[Math.cos(a) * 3.2, 0.45, -Math.sin(a) * 3.2]} castShadow material={lambert(i % 2 ? "#4E9A3E" : "#62B14A")}>
          <icosahedronGeometry args={[0.45, 1]} />
        </mesh>
      );
    })}
  </group>
);

/* ---------- Đường đi giữa hai điểm xa nhau ---------- */
const PATH: [number, number][] = [CORRIDORS[5].to, CORRIDORS[5].from, [0, 0], CORRIDORS[0].from, CORRIDORS[0].to];
const along = (u: number): [number, number] => {
  const segs = PATH.slice(1).map((p, i) => Math.hypot(p[0] - PATH[i][0], p[1] - PATH[i][1]));
  let d = u * segs.reduce((a, b) => a + b, 0);
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) {
      const t = d / segs[i];
      return [lerp(PATH[i][0], PATH[i + 1][0], t), lerp(PATH[i][1], PATH[i + 1][1], t)];
    }
    d -= segs[i];
  }
  return PATH[PATH.length - 1];
};

/* ---------- Các cú máy ---------- */

const world = (pent: React.ComponentProps<typeof Pentagon> = {}, extra?: React.ReactNode) => (
  <>
    <Campus />
    <Pentagon {...pent} />
    {extra}
  </>
);

const HOOK: ShotFn[] = [
  // 1. Năm toà nhà lồng vào nhau
  (t, u) => {
    const cam = orbit(lerp(-0.5, 0.15, u), lerp(36, 32, u), lerp(14, 11, u), [0, 1.5, -6]);
    const up = sm(u, 0.42, 0.62) * (1 - sm(u, 0.9, 1));
    const lift = [4, 3, 2, 1, 0].map((n) => up * n * 1.1);
    const hi = [0, 1, 2, 3, 4].map((i) => sm(u, 0.45 + i * 0.07, 0.5 + i * 0.07) * (1 - sm(u, 0.82, 0.95)) * 0.85);
    return { cam, world: world({ lift, hi }) };
  },
  // 2. 23.000 người
  (t, u) => {
    const cam = orbit(lerp(0.15, 0.4, u), 32, 12, [3, 1.5, -2]);
    const n = sm(u, 0.05, 0.45);
    const [x, y] = P(cam, [0, 3.5, -2]);
    return {
      cam,
      world: world(
        {},
        <>
          <Crowd k={u} />
          <Town k={popIn(u, 0.55, 0.3) * 0.75} p={[17, 3.5, 6]} />
        </>,
      ),
      over: (
        <BigNum x={x} y={y} size={104} k={popIn(u, 0.05)}>
          {fmt(23000 * n)}
        </BigNum>
      ),
    };
  },
  // 3. Vào trong xem nhé
  (t, u) => {
    const k = sm(u, 0, 1);
    const cam: Cam = { pos: [lerp(4, 0, k), lerp(15, 3.0, k), lerp(26, 10.2, k)], look: [0, lerp(0, 0.7, k), lerp(0, 7, k)], fov: 40 };
    return { cam, world: world(), flash: sm(u, 0.85, 1) };
  },
];

const PLOT: [number, number][] = [
  [0.4, -12.2],
  [11.8, -3.6],
  [7.6, 10.4],
  [-7.9, 10.2],
  [-12.3, -3.2],
];

const BARRIER: ShotFn[] = [
  // 4. Khu đất bị đường bao quanh, méo thành năm cạnh
  (t, u) => {
    const cam = top(44, [0, 0, 0], 0.22);
    const roads = sm(u, 0.05, 0.35);
    const sides = [0, 1, 2, 3, 4].map((i) => sm(u, 0.42 + i * 0.09, 0.5 + i * 0.09));
    const v = ngon(5, R_OUT[4] + 0.1);
    const road = lambert("#5B6067");
    return {
      cam,
      world: (
        <>
          <Campus plain={1} />
          <Pentagon />
          {roads > 0
            ? PLOT.map((p, i) => {
                const q = PLOT[(i + 1) % 5];
                const A: [number, number] = [p[0] - (q[0] - p[0]) * 0.35, p[1] - (q[1] - p[1]) * 0.35];
                const B: [number, number] = [q[0] + (q[0] - p[0]) * 0.35, q[1] + (q[1] - p[1]) * 0.35];
                return <BeamRoad key={i} a={A} b={[lerp(A[0], B[0], roads), lerp(A[1], B[1], roads)]} mat={road} />;
              })
            : null}
          {sides.map((s, i) =>
            s > 0 ? <BeamY key={i} a={v[i]} b={[lerp(v[i][0], v[(i + 1) % 5][0], s), lerp(v[i][1], v[(i + 1) % 5][1], s)]} mat={goldMat()} /> : null,
          )}
        </>
      ),
      over: (
        <>
          {sides.map((s, i) => {
            const mx = ((v[i][0] + v[(i + 1) % 5][0]) / 2) * 1.2;
            const mz = ((v[i][1] + v[(i + 1) % 5][1]) / 2) * 1.2;
            const [x, y] = P(cam, [mx, 1, mz]);
            return (
              <BigNum key={i} x={x} y={y} size={66} k={popIn(s, 0.6, 0.4)}>
                {i + 1}
              </BigNum>
            );
          })}
        </>
      ),
    };
  },
  // 5. Dời đi chỗ khác, không kịp vẽ lại
  (t, u) => {
    const mv = sm(u, 0.12, 0.6);
    const cam = top(50, [lerp(0, -8, mv), 0, 0], 0.22);
    const v = ngon(5, R_OUT[4] + 0.1).map(([x, z]) => [x - 16 * mv, z + 2 * mv] as [number, number]);
    const glow = sm(u, 0.62, 0.72);
    const [cx, cy] = P(cam, [-16, 3, -11]);
    return {
      cam,
      world: (
        <>
          <Campus plain={1} />
          {PLOT.map((p, i) => {
            const q = PLOT[(i + 1) % 5];
            return <BeamRoad key={i} a={[p[0] - (q[0] - p[0]) * 0.35, p[1] - (q[1] - p[1]) * 0.35]} b={[q[0] + (q[0] - p[0]) * 0.35, q[1] + (q[1] - p[1]) * 0.35]} mat={lambert("#5B6067")} />;
          })}
          <Pentagon at={[-16 * mv, 2 * mv]} />
          {glow > 0 ? v.map((p, i) => <BeamY key={i} a={p} b={v[(i + 1) % 5]} mat={goldMat()} w={0.3 * glow} />) : null}
        </>
      ),
      over: <Clock x={cx} y={cy} r={60} turn={sm(u, 0.55, 1) * 3} k={popIn(u, 0.55)} />,
    };
  },
  // 6. Xây 16 tháng, bê tông, cát sông
  (t, u) => {
    const cam = lerpCam(orbit(0.55, 28, 15, [0, 0, -2]), { pos: [26, 19, 24], look: [6, 0, -16], fov: 42 }, sm(u, 0.5, 0.75));
    const build = [0, 1, 2, 3, 4].map((i) => sm(u, 0.04 + i * 0.07, 0.16 + i * 0.07));
    const crane = 1 - sm(u, 0.48, 0.56);
    const months = sm(u, 0.04, 0.42);
    const [x, y] = P(cam, [0, 4, -2]);
    return {
      cam,
      world: world(
        { build },
        <>
          <Crane p={[5, 0, 3]} ry={0.3} k={crane * sm(u, 0, 0.06)} />
          <Crane p={[-6, 0, -1]} ry={2.2} k={crane * sm(u, 0.02, 0.08)} />
          <Crane p={[1, 0, -7]} ry={-1.2} k={crane * sm(u, 0.04, 0.1)} />
          <SandArc k={sm(u, 0.6, 0.78)} t={t} />
        </>,
      ),
      over: (
        <BigNum x={x} y={y} size={92} k={popIn(u, 0.06) * (1 - sm(u, 0.46, 0.5))}>
          {`${Math.max(1, Math.round(16 * months))} tháng`}
        </BigNum>
      ),
    };
  },
  // 7. Đường dốc thay thang máy
  (t, u) => {
    const cam: Cam = { pos: [lerp(-1.5, 0.2, u), 3.4, 9.5], look: [0.8, 1.4, 0], fov: 46 };
    const p = sm(u, 0.05, 0.95);
    const L = 9;
    const rise = 2.2;
    const x = -4.5 + p * L * 0.92;
    const y = ((x + 4.5) / L) * rise;
    return {
      cam,
      light: "indoor",
      world: (
        <>
          <Room w={14} d={8} h={4.2} wall="#E8E4DA" dado="#C9C2B2" />
          <Ramp p={[-4.5, 0, 0]} len={L} rise={rise} />
          <Box p={[6, rise / 2, 0]} s={[3, rise, 3]} c="#D6D0C3" />
          <Door p={[-5.5, 0, -3.88]} />
          <WallLamp p={[2, 3.4, -3.86]} />
          <WallLamp p={[-2, 3.4, -3.86]} />
          <group position={[x, y, 0.2]} rotation={[0, 0, Math.atan2(rise, L)]}>
            <Box p={[0.55, 0.35, 0]} s={[0.9, 0.12, 0.6]} c="#7D8790" />
            <Box p={[0.55, 0.62, 0]} s={[0.7, 0.42, 0.5]} c="#C79B5B" />
            {[-0.25, 0.25].map((z) => (
              <mesh key={z} position={[0.55, 0.18, z]} rotation={[Math.PI / 2, 0, 0]} material={lambert("#222222")}>
                <cylinderGeometry args={[0.12, 0.12, 0.08, 10]} />
              </mesh>
            ))}
          </group>
          <Stick p={[x - 0.6, y - 0.1, 0.2]} ry={Math.PI / 2} outfit="worker" walk={t * 7} arm={0.45} />
        </>
      ),
    };
  },
];

const EUREKA: ShotFn[] = [
  // 8. Vòng A, vòng E, phòng các vị tướng
  (t, u) => {
    if (u < 0.62) {
      const cam = orbit(lerp(-0.2, 0.2, u / 0.62), 26, 22, [0, 0, 0]);
      const a = sm(u, 0.08, 0.16) * (1 - sm(u, 0.3, 0.36));
      const e = sm(u, 0.3, 0.38);
      const [ax, ay] = P(cam, [0, RING_H + 0.3, R_IN[0] * 0.81 + 0.4]);
      const [ex, ey] = P(cam, [0, RING_H + 0.3, R_IN[4] * 0.81 + 0.4]);
      return {
        cam,
        world: world({ hi: [a, 0, 0, 0, e] }),
        over: (
          <>
            <BigNum x={ax} y={ay - 10} size={80} k={popIn(u, 0.1) * (1 - sm(u, 0.32, 0.36))}>
              A
            </BigNum>
            <BigNum x={ex} y={ey + 20} size={80} k={popIn(u, 0.32)}>
              E
            </BigNum>
          </>
        ),
        flash: sm(u, 0.58, 0.62),
      };
    }
    const k = sm(u, 0.62, 1);
    const cam: Cam = { pos: [lerp(-0.5, 0.3, k), lerp(2.2, 1.9, k), lerp(5.4, 4.3, k)], look: [0, 1.45, -1.5], fov: 44 };
    return {
      cam,
      light: "indoor",
      flash: 1 - sm(u, 0.62, 0.68),
      world: (
        <>
          <Room w={9} d={7} h={3.6} wall="#E9E2CF" dado="#B9A77F" floor={["#2F4D7A", "#2B4672"]} />
          <mesh position={[0, 0.02, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#A8282F")}>
            <planeGeometry args={[5.2, 4]} />
          </mesh>
          <group position={[0, 0, -3.38]}>
            <Box p={[0, 1.9, 0.02]} s={[4.6, 2.1, 0.06]} c="#9DD1F2" shadow={false} />
            <Box p={[0, 1.15, 0.05]} s={[4.6, 0.6, 0.04]} c="#5FAE45" shadow={false} />
            <Box p={[0, 1.9, 0.09]} s={[0.12, 2.2, 0.06]} c="#FFFFFF" />
            {[-2.3, 2.3].map((x) => (
              <Box key={x} p={[x, 1.9, 0.09]} s={[0.12, 2.2, 0.06]} c="#FFFFFF" />
            ))}
            <Box p={[0, 3.0, 0.09]} s={[4.7, 0.12, 0.06]} c="#FFFFFF" />
            <Box p={[0, 0.8, 0.12]} s={[4.8, 0.12, 0.2]} c="#FFFFFF" />
          </group>
          <Flag p={[-3.3, 0, -2.6]} wave={t * 2} />
          <Flag p={[3.0, 0, -2.6]} wave={t * 2 + 1} />
          <Box p={[0, 1.0, -1.6]} s={[0.7, 1.0, 0.12]} c="#4A2A18" />
          <Box p={[0, 0.5, -1.25]} s={[0.7, 0.1, 0.6]} c="#4A2A18" />
          <Stick p={[0, 0.1, -1.15]} sit outfit="general" look={Math.sin(t * 1.3) * 0.35} />
          <Desk p={[0, 0, 0]} />
        </>
      ),
    };
  },
  // 9. Mười hành lang, 28 km, 7 phút
  (t, u) => {
    const cam = top(30, [0, 0, 0.5], 0.42);
    const halls = CORRIDORS.map((_, i) => sm(u, 0.02 + i * 0.025, 0.05 + i * 0.025) * (1 - sm(u, 0.55, 0.6)));
    const rings = sm(u, 0.34, 0.4) * (1 - sm(u, 0.55, 0.6));
    const km = sm(u, 0.35, 0.52);
    const walk = sm(u, 0.62, 0.93);
    const [wx, wz] = along(walk);
    const [x, y] = P(cam, [0, 2, 0]);
    const [kx, ky] = P(cam, [R_OUT[4] * 0.62, 2, -R_OUT[4] * 0.72]);
    const trail = Array.from({ length: 24 }, (_, i) => along((walk * i) / 23));
    return {
      cam,
      world: world(
        { halls, hi: [rings, rings, rings, rings, rings] },
        walk > 0 ? (
          <>
            {trail.map(([a, b], i) => (
              <mesh key={i} position={[a, RING_H + 0.25, b]} material={goldMat()}>
                <sphereGeometry args={[0.13, 8, 6]} />
              </mesh>
            ))}
            <mesh position={[wx, RING_H + 0.45, wz]} material={lambert("#E8403A", { emissive: new THREE.Color("#5A0E0B") })}>
              <sphereGeometry args={[0.38, 14, 10]} />
            </mesh>
          </>
        ) : null,
      ),
      over: (
        <>
          <BigNum x={x} y={y} size={96} k={popIn(u, 0.36) * (1 - sm(u, 0.55, 0.6))}>
            {`${Math.round(28 * km)} km`}
          </BigNum>
          <BigNum x={x} y={y} size={104} k={popIn(u, 0.62)}>
            {`${Math.max(0, Math.round(7 * walk))} phút`}
          </BigNum>
          <Clock x={kx} y={ky} r={52} turn={walk * 7} k={popIn(u, 0.62)} />
        </>
      ),
    };
  },
];

const THEOREM: ShotFn[] = [
  // 10. Ngũ giác đều: cạnh bằng nhau, góc bằng nhau, thêm cạnh thành gần tròn
  (t, u) => {
    const cam = top(31, [0, 0, 0], 0.02);
    const draw = sm(u, 0.04, 0.26);
    const n = u < 0.66 ? 5 : u < 0.74 ? 6 : u < 0.81 ? 8 : u < 0.88 ? 12 : 48;
    const pts = ngon(n, R_OUT[4] + 0.3).map(([x, z]) => P(cam, [x, RING_H, z]));
    const per = pts.length;
    const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z";
    const ticks = sm(u, 0.28, 0.36) * (n === 5 ? 1 : 0);
    const arcs = sm(u, 0.4, 0.48) * (n === 5 ? 1 : 0);
    const len = pts.reduce((a, p, i) => a + Math.hypot(p[0] - pts[(i + 1) % per][0], p[1] - pts[(i + 1) % per][1]), 0);
    return {
      cam,
      world: world(),
      over: (
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <path d={d} fill="rgba(255,210,63,0.14)" stroke="#FFD23F" strokeWidth={9} strokeLinejoin="round" strokeDasharray={`${len * draw + 0.01} ${len + 10}`} />
          {pts.map(([x, y], i) => {
            if (n !== 5) return null;
            const [x2, y2] = pts[(i + 1) % 5];
            const [px, py] = pts[(i + 4) % 5];
            const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI;
            const a1 = Math.atan2(py - y, px - x);
            const a2 = Math.atan2(y2 - y, x2 - x);
            const R = 36;
            return (
              <g key={i}>
                <g transform={`translate(${(x + x2) / 2} ${(y + y2) / 2}) rotate(${ang})`} opacity={ticks}>
                  <line x1={-7} y1={-18} x2={-7} y2={18} stroke="#FFFFFF" strokeWidth={7} />
                  <line x1={7} y1={-18} x2={7} y2={18} stroke="#FFFFFF" strokeWidth={7} />
                </g>
                <path
                  d={`M${x + Math.cos(a1) * R} ${y + Math.sin(a1) * R} A${R} ${R} 0 0 ${Math.sin(a2 - a1) > 0 ? 1 : 0} ${x + Math.cos(a2) * R} ${y + Math.sin(a2) * R}`}
                  fill="none"
                  stroke="#FF6B5A"
                  strokeWidth={8}
                  opacity={arcs}
                />
              </g>
            );
          })}
        </svg>
      ),
    };
  },
];

/** Dãy cửa nhà vệ sinh; `wall` vách ngăn giữa (0..1), `mix` hai nhóm đi lại chung. */
const restroom = (t: number, wall: number, mix: number, flash: number): Shot => {
  const cam: Cam = { pos: [0, 3.2, 9.2], look: [0, 1.2, -1], fov: 46 };
  const moving = mix > 0.001 && mix < 0.999;
  const L: [number, number, number, "worker" | "suit"][] = [
    [-3.8, 1.2, -0.6, "worker"],
    [-2.4, 2.6, 1.2, "suit"],
  ];
  const R: [number, number, number, "officer" | "none"][] = [
    [3.8, 1.4, 0.6, "officer"],
    [2.4, 2.4, -1.2, "none"],
  ];
  return {
    cam,
    light: "indoor",
    flash,
    world: (
      <>
        <Room w={12} d={8} h={3.4} />
        {[-4.6, -3.2, -1.8, 1.8, 3.2, 4.6].map((x) => (
          <Door key={x} p={[x, 0, -3.88]} />
        ))}
        <WallLamp p={[-2.5, 2.9, -3.86]} />
        <WallLamp p={[2.5, 2.9, -3.86]} />
        {wall > 0.01 ? <Box p={[0, (3.0 * wall) / 2, -0.5]} s={[0.18, 3.0 * wall, 6.8]} c="#9AA6AE" /> : null}
        {L.map(([x, z, tx, o], i) => (
          <Stick key={`l${i}`} p={[lerp(x, tx, mix), 0, z]} ry={moving ? Math.PI / 2 : 0.2} walk={moving ? t * 7 + i : undefined} outfit={o} />
        ))}
        {R.map(([x, z, tx, o], i) => (
          <Stick key={`r${i}`} p={[lerp(x, tx, mix), 0, z]} ry={moving ? -Math.PI / 2 : -0.2} walk={moving ? t * 7 + i : undefined} skin="#7A4B2A" outfit={o} />
        ))}
      </>
    ),
  };
};

const CORRIDOR_DOORS = Array.from({ length: 10 }, (_, i) => -i * 3.2);
const REALWORLD: ShotFn[] = [
  // 11. Eisenhower đi lạc
  (t, u) => {
    const z = lerp(-5, 0.5, sm(u, 0, 0.6));
    const cam: Cam = { pos: [0.5, 2.5, z + 5.2], look: [0, 1.4, z - 4], fov: 48 };
    const looking = Math.sin(t * 3.4) * 0.9 * sm(u, 0.35, 0.5);
    const [qx, qy] = P(cam, [0, 2.6, z]);
    return {
      cam,
      light: "indoor",
      world: (
        <>
          <group position={[0, 0, -12]}>
            <Room w={4.4} d={40} h={3.2} wall="#DCEBE5" dado="#A7CFC6" />
          </group>
          {CORRIDOR_DOORS.map((dz, i) => (
            <group key={i}>
              <Door p={[-2.08, 0, dz + 2]} ry={Math.PI / 2} />
              <Door p={[2.08, 0, dz + 0.4]} ry={-Math.PI / 2} />
              <WallLamp p={[-2.06, 2.7, dz + 0.6]} />
            </group>
          ))}
          <Stick p={[0, 0, z]} outfit="general" walk={u < 0.6 ? t * 7 : undefined} look={looking} />
        </>
      ),
      over: <Ask x={qx + 70} y={qy - 40} k={popIn(u, 0.5)} />,
    };
  },
  // 12. Gấp đôi Empire State; toà Quốc hội vừa một vạt
  (t, u) => {
    const cam = orbit(lerp(-0.12, 0.12, u), 34, 13, [0, 3, -4]);
    const tw = sm(u, 0.04, 0.3) * (1 - sm(u, 0.46, 0.56));
    const cap = popIn(u, 0.62, 0.3) * 0.82;
    const { d } = sideDir(2);
    const mid: V3 = [d[0] * 6.2, RING_H + 0.1, d[1] * 6.2];
    const [x, y] = P(cam, [0, 8, -3]);
    return {
      cam,
      world: world(
        { wedge: [2, sm(u, 0.58, 0.64)] },
        <>
          <Tower p={[-11, 0, -3]} k={tw} />
          <Tower p={[11, 0, -3]} k={tw} />
          <Capitol p={mid} ry={0} s={cap} />
        </>,
      ),
      over: (
        <BigNum x={x} y={y} size={100} k={popIn(u, 0.2) * (1 - sm(u, 0.44, 0.5))}>
          ×2
        </BigNum>
      ),
    };
  },
  // 13. 284 nhà vệ sinh, luật bắt dùng riêng
  (t, u) => {
    if (u < 0.45) {
      const cam = orbit(0.1, 26, 24, [0, 0, 0]);
      const n = Math.round(284 * sm(u, 0.04, 0.38));
      const [x, y] = P(cam, [0, 3, 0]);
      const blue = lambert("#3BA3E6", { emissive: new THREE.Color("#0B3A5C") });
      return {
        cam,
        world: world(
          {},
          LOO.slice(0, n).map(([a, b], i) => (
            <mesh key={i} position={[a, RING_H + 0.18, b]} material={blue}>
              <sphereGeometry args={[0.16, 8, 6]} />
            </mesh>
          )),
        ),
        over: (
          <BigNum x={x} y={y} size={104} k={popIn(u, 0.04)}>
            {n}
          </BigNum>
        ),
        flash: sm(u, 0.42, 0.45),
      };
    }
    return restroom(t, sm(u, 0.55, 0.72), 0, 1 - sm(u, 0.45, 0.5));
  },
  // 14. Không chia khu, dùng chung
  (t, u) => restroom(t, 1 - sm(u, 0.08, 0.35), sm(u, 0.35, 0.95), 0),
];
const LOO: [number, number][] = (() => {
  const r = rng(9);
  return Array.from({ length: 284 }, () => {
    const ring = Math.floor(r() * 5);
    const a = r() * Math.PI * 2;
    const rr = (R_IN[ring] + R_W / 2) * 0.9;
    return [Math.cos(a) * rr, Math.sin(a) * rr] as [number, number];
  });
})();

/* ---------- Kết: quầy xúc xích ---------- */

const NOON = (() => {
  const r = rng(41);
  return Array.from({ length: 36 }, () => ({ k: Math.floor(r() * 5), off: (r() - 0.5) * 0.4, d: r() }));
})();

const COSMIC: ShotFn[] = [
  // 15. Quầy xúc xích giữa sân; vệ tinh; đúng trưa người kéo vào
  (t, u) => {
    if (u < 0.3) {
      const k = sm(u, 0, 0.3);
      const cam: Cam = { pos: [lerp(3, 1.2, k), lerp(16, 3.2, k), lerp(16, 4.6, k)], look: [0, 0.4, 0], fov: 42 };
      return { cam, world: world(), flash: sm(u, 0.27, 0.3) };
    }
    if (u < 0.5) {
      const k = sm(u, 0.3, 0.5);
      const cam: Cam = { pos: [lerp(-2, 2, k), 150, 26], look: [0, 0, 0], fov: 40 };
      return {
        cam,
        sky: "space",
        light: "space",
        flash: Math.max(1 - sm(u, 0.3, 0.33), sm(u, 0.47, 0.5)),
        world: (
          <>
            {world()}
            <Satellite p={[lerp(-5, 3, k), 136, 23.6]} ry={0.6 + k * 0.4} />
          </>
        ),
      };
    }
    const k = sm(u, 0.5, 1);
    const cam = top(lerp(13, 9, k), [0, 0, 0], 0.02);
    const walkers = NOON.map((w) => {
      const p = clampP(k * 1.4 - w.d * 0.5);
      const { d, t: tt } = sideDir(w.k);
      const r = lerp(3.0, 0.5, p);
      return { x: d[0] * r + tt[0] * w.off * (1 - p), z: d[1] * r + tt[1] * w.off * (1 - p), ry: Math.atan2(-d[0], -d[1]), p };
    });
    return {
      cam,
      flash: 1 - sm(u, 0.5, 0.53),
      world: world(
        {},
        walkers.map((w, i) => (w.p < 1 ? <Stick key={i} p={[w.x, 0.07, w.z]} ry={w.ry} s={0.28} outfit="officer" walk={t * 9 + i} /> : null)),
      ),
      over: (
        <>
          <Reticle w={W} h={H} k={1} />
          <Clock x={W - 120} y={H - 120} r={52} turn={12} k={popIn(u, 0.55)} />
        </>
      ),
    };
  },
  // 16. Lối xuống hầm bí mật; hai quả tên lửa
  (t, u) => {
    if (u < 0.42) {
      const k = sm(u, 0, 0.42);
      const cam: Cam = { pos: [lerp(3.5, 1.5, k), lerp(3.2, 1.6, k), 11], look: [0, -0.9, -1], fov: 42 };
      const [qx, qy] = P(cam, [0, -1.2, -1]);
      return {
        cam,
        flash: sm(u, 0.39, 0.42),
        world: <Diorama bunker={popIn(u, 0.12, 0.35)} />,
        over: <Ask x={qx + 170} y={qy - 70} k={popIn(u, 0.2)} />,
      };
    }
    if (u < 0.82) {
      const k = sm(u, 0.42, 0.82);
      const cam: Cam = { pos: [lerp(-2.5, 2.5, k), lerp(2.6, 3.6, k), 10], look: [0, 2.6, -1], fov: 44 };
      return {
        cam,
        light: "snow",
        flash: Math.max(1 - sm(u, 0.42, 0.45), sm(u, 0.79, 0.82)),
        world: <SnowField k={k} tilt={sm(k, 0.7, 1) * 0.35} />,
      };
    }
    const cam = top(lerp(30, 16, sm(u, 0.82, 1)), [0, 0, 0], 0.03);
    return {
      cam,
      flash: 1 - sm(u, 0.82, 0.85),
      world: world(),
      over: <Reticle w={W} h={H} k={1} red={1} />,
    };
  },
  // 17. Chỉ bán xúc xích thôi
  (t, u) => {
    const cam = orbit(lerp(0.5, 0.15, u), 7.2, 2.6, [0, 1.3, 0], 44);
    return {
      cam,
      world: (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#7DBB55")}>
            <planeGeometry args={[200, 200]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#E7E0CF")}>
            <circleGeometry args={[4, 40]} />
          </mesh>
          {[0, 1, 2, 3, 4].map((k) => {
            const { d } = sideDir(k);
            return <BeamRoad key={k} a={[d[0] * 3.5, d[1] * 3.5]} b={[d[0] * 40, d[1] * 40]} mat={lambert("#E7E0CF")} w={1.6} />;
          })}
          {Array.from({ length: 30 }, (_, i) => {
            const a = (i / 30) * Math.PI * 2 + 0.1;
            const r = 6 + (i % 3) * 2.5;
            return (
              <mesh key={i} position={[Math.cos(a) * r, 0.9, Math.sin(a) * r]} castShadow material={lambert(i % 2 ? "#4E9A3E" : "#62B14A")}>
                <icosahedronGeometry args={[0.9, 1]} />
              </mesh>
            );
          })}
          <Box p={[0, 2.2, -22]} s={[60, 4.4, 3]} c="#EFEDE6" />
          <Kiosk p={[0, 0.02, 0]} s={1.5} big ry={0} />
          <Stick p={[0, 0.45, -0.2]} s={0.85} outfit="seller" />
          <Stick p={[1.2, 0.02, 1.5]} ry={-0.4} outfit="officer" arm={sm(u, 0.2, 0.4)} hold={<HotDog s={1.4} />} />
          <Stick p={[-1.4, 0.02, 1.7]} ry={0.5} outfit="general" arm={sm(u, 0.35, 0.55)} hold={<HotDog s={1.4} />} />
        </>
      ),
    };
  },
];

/** Sân khấu 3D của tập 16 (đăng ký ở engine/parchment/stages3d.ts). */
export const Ep16Stage = makeStage3D({ hook: HOOK, barrier: BARRIER, eureka: EUREKA, theorem: THEOREM, realworld: REALWORLD, cosmic: COSMIC });
