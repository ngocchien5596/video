/**
 * Tập 17 "Bắn một viên, thả một viên": cảnh 3D low-poly (quy trình projects/kien-thuc/docs/dung-canh-3d.md).
 * Trường bắn ngoài trời chạy dọc trục +x; người bắn đứng ở gốc, quay mặt về +x.
 * Viên đạn phóng to cho dễ nhìn; thời gian rơi được làm chậm (quay chậm).
 */
import React from "react";
import * as THREE from "three";
import { Arrow3, Ask, BigNum, Box, Clock, lambert, lerp, ngon, popIn, Puff, rng, sm, Stick, Trees, type Cam, type V3 } from "../three/kit3d.tsx";
import { BeamRoad, H, makeStage3D, orbit, P, W, type ShotFn } from "../three/stage.tsx";
import { Bullet, Cannon, Cannonball, IN_HAND_Q, Pistol } from "../three/weapons.tsx";
import type { PropItem } from "../three/prop-sheet.tsx";

void ngon;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/* ---------- Đạo cụ ---------- */

/** Máy bay chở hàng, mũi hướng +x. */
const CargoPlane: React.FC<{ p: V3; s?: number; prop: number; door?: number }> = ({ p, s = 1, prop, door = 0 }) => (
  <group position={p} scale={s}>
    <mesh rotation={[0, 0, -Math.PI / 2]} castShadow material={lambert("#8E9AA3")}>
      <capsuleGeometry args={[0.7, 5, 6, 14]} />
    </mesh>
    <Box p={[0.3, 0.35, 0]} s={[1.3, 0.12, 8.5]} c="#7D8992" />
    <Box p={[-2.8, 0.4, 0]} s={[0.8, 0.08, 2.8]} c="#7D8992" />
    <Box p={[-2.9, 1.1, 0]} s={[0.9, 1.4, 0.1]} c="#7D8992" />
    <Box p={[2.75, 0.25, 0]} s={[0.5, 0.25, 0.9]} c="#2E3A44" />
    {[-2.6, -1.3, 1.3, 2.6].map((z) => (
      <group key={z} position={[0.75, 0.15, z]}>
        <mesh rotation={[0, 0, -Math.PI / 2]} material={lambert("#5F6B74")}>
          <cylinderGeometry args={[0.22, 0.25, 0.9, 10]} />
        </mesh>
        <group position={[0.5, 0, 0]} rotation={[prop, 0, 0]}>
          <Box p={[0, 0, 0]} s={[0.04, 1.3, 0.12]} c="#2B2B2B" shadow={false} />
        </group>
      </group>
    ))}
    <Box p={[-2.2, -0.55 - door * 0.15, 0]} s={[1.2, 0.08, 1.0]} c="#6C7880" />
  </group>
);

/** Thùng hàng. */
const Crate: React.FC<{ p: V3; ry?: number }> = ({ p, ry = 0 }) => (
  <group position={p} rotation={[0, ry, 0]}>
    <Box p={[0, 0, 0]} s={[1, 0.8, 0.8]} c="#C7914F" />
    {[-0.45, 0.45].map((x) => (
      <Box key={x} p={[x, 0, 0]} s={[0.1, 0.84, 0.84]} c="#8C5A2B" />
    ))}
    <Box p={[0, 0, 0]} s={[1.04, 0.1, 0.84]} c="#8C5A2B" />
  </group>
);

/** Trạm vũ trụ. */
const ISS: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <group scale={s}>
    <Box p={[0, 0, 0]} s={[6, 0.25, 0.25]} c="#C9CDD1" />
    {[-2.6, -1.6, 1.6, 2.6].map((x) =>
      [-1, 1].map((sd) => <Box key={`${x}${sd}`} p={[x, 0, sd * 1.5]} s={[0.7, 0.04, 2.6]} c="#C79A2E" />),
    )}
    {[-0.9, 0, 0.9].map((z, i) => (
      <mesh key={z} position={[0.2 * i - 0.2, -0.1, z]} rotation={[Math.PI / 2, 0, 0]} material={lambert("#EEF0F2")}>
        <cylinderGeometry args={[0.32, 0.32, 1.0, 12]} />
      </mesh>
    ))}
    <Box p={[0, -0.1, 0]} s={[0.4, 0.4, 2.4]} c="#E6E8EA" />
    {[-1, 1].map((sd) => (
      <Box key={sd} p={[0, 0.5, sd * 0.6]} s={[0.8, 0.03, 0.6]} c="#E7E9EB" />
    ))}
  </group>
);

/* ---------- Trường bắn ---------- */

const RANGE_TREES: [number, number, number][] = (() => {
  const r = rng(7);
  const out: [number, number, number][] = [];
  while (out.length < 220) {
    const x = -30 + r() * 110;
    const z = -11 - r() * 45;
    out.push([x, z, 0.8 + r() * 0.9]);
  }
  while (out.length < 300) out.push([30 + r() * 40, -10 + r() * 30, 0.8 + r() * 0.9]);
  return out;
})();

/** Trường bắn: lối cát dọc +x, bờ đất phía xa, bờ chắn cuối, cọc mốc, bia, mái che chỗ đứng bắn. Phía máy quay (+z) để trống. */
const Range: React.FC = () => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#8CC860")}>
      <planeGeometry args={[400, 400]} />
    </mesh>
    <mesh position={[12, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#D8C59A")}>
      <planeGeometry args={[40, 9]} />
    </mesh>
    <mesh position={[12, 0.4, -7]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.8]} castShadow receiveShadow material={lambert("#74B24E")}>
      <cylinderGeometry args={[1.2, 1.6, 44, 6]} />
    </mesh>
    <mesh position={[29, 1.2, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow material={lambert("#6AA646")}>
      <cylinderGeometry args={[2, 2.6, 16, 6]} />
    </mesh>
    {Array.from({ length: 5 }, (_, i) => (
      <group key={i} position={[4 + i * 4, 0, 4.2]}>
        <Box p={[0, 0.35, 0]} s={[0.14, 0.7, 0.14]} c="#FFFFFF" />
        <Box p={[0, 0.62, 0]} s={[0.16, 0.16, 0.16]} c="#D94A3D" />
      </group>
    ))}
    {[-3, 0, 3].map((z) => (
      <group key={z} position={[25, 0, z]}>
        <Box p={[0, 0.7, 0]} s={[0.12, 1.4, 0.12]} c="#8C5A2B" />
        <mesh position={[0, 1.7, 0]} rotation={[0, -Math.PI / 2, 0]} material={lambert("#FFFFFF")}>
          <circleGeometry args={[0.8, 24]} />
        </mesh>
        <mesh position={[-0.01, 1.7, 0]} rotation={[0, -Math.PI / 2, 0]} material={lambert("#D94A3D")}>
          <ringGeometry args={[0.35, 0.55, 24]} />
        </mesh>
        <mesh position={[-0.02, 1.7, 0]} rotation={[0, -Math.PI / 2, 0]} material={lambert("#D94A3D")}>
          <circleGeometry args={[0.15, 16]} />
        </mesh>
      </group>
    ))}
    {/* bục bắn gỗ */}
    <Box p={[-0.6, PLAT / 2, 0]} s={[2, PLAT, 2.2]} c="#B07A45" />
    <Box p={[-0.6, PLAT + 0.04, 0]} s={[2.1, 0.08, 2.3]} c="#8C5A2B" />
    {[-1, 1].map((sd) => (
      <Box key={sd} p={[-0.6, PLAT + 0.5, sd * 1.12]} s={[2, 0.06, 0.06]} c="#8C5A2B" />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <Box key={i} p={[-1.55 - 0.02, 0.25 + i * 0.5, 1.25]} s={[0.5, 0.06, 0.5]} c="#9A6A3A" />
    ))}
    <Box p={[-4.5, 0.45, 3.5]} s={[0.9, 0.08, 1.4]} c="#A0703F" />
    <Box p={[-4.5, 0.22, 3.5]} s={[0.8, 0.44, 0.1]} c="#7A5230" />
    <Trees spots={RANGE_TREES} />
  </group>
);

/* ---------- Người bắn và hai viên đạn ---------- */

/** Bục bắn cao PLAT, người đứng trên bục để quãng rơi rõ trong khung. */
const PLAT = 2.5;
const Y0 = 1.2 + PLAT;
const MUZZLE: V3 = [0.86, Y0, -0.2];
const HAND: V3 = [0.55, Y0, 0.2];
const D_FAR = 7.5;
/** Góc máy ngang bao trọn từ bục bắn tới chỗ viên bắn chạm đất. */
const SIDE = (a = 0, r = 13.5): Cam => orbit(a, r, 2.4, [3.9, 2.0, 0], 40);
/** Vị trí viên bắn và viên thả ở thời điểm f (0..1 của thời gian rơi). */
const fired = (f: number): V3 => [MUZZLE[0] + D_FAR * f, Y0 * (1 - f * f) + 0.08, MUZZLE[2]];
const dropped = (f: number): V3 => [HAND[0], Y0 * (1 - f * f) + 0.08, HAND[2]];

const Shooter: React.FC<{ flash?: number; holding?: boolean }> = ({ flash = 0, holding = true }) => (
  <Stick
    p={[0, PLAT, 0]}
    ry={Math.PI / 2}
    outfit="worker"
    arm={0.82}
    hold={
      <group quaternion={IN_HAND_Q}>
        <group position={[0.04, 0.0, 0]}>
          <Pistol flash={flash} />
        </group>
      </group>
    }
    armL={0.82}
    holdL={holding ? <Bullet p={[0, 0, 0.08]} dir={[0, 0, 1]} len={0.14} /> : null}
  />
);

/** Cảnh bắn: `f` tiến độ rơi (0..1), `trail` độ dài vệt viên bắn. */
const shotScene = (f: number, flash: number, extra?: React.ReactNode) => (
  <>
    <Range />
    <Shooter flash={flash} holding={f <= 0} />
    {f > 0 ? <Bullet p={fired(Math.min(1, f))} trail={Math.min(2.2, f * D_FAR)} shadowY={0} /> : null}
    {f > 0 ? <Bullet p={dropped(Math.min(1, f))} shadowY={0} /> : null}
    {extra}
  </>
);

/* ---------- Trái Đất và khẩu đại bác của Newton ---------- */

const EARTH_R = 20;
const earthGeo = (() => {
  let g: THREE.BufferGeometry | null = null;
  return () => {
    if (g) return g;
    const geo = new THREE.IcosahedronGeometry(EARTH_R, 5).toNonIndexed();
    const pos = geo.getAttribute("position");
    const col = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i += 3) {
      const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3 / EARTH_R;
      const y = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3 / EARTH_R;
      const z = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3 / EARTH_R;
      const h = Math.sin(i * 12.9898) * 43758.5453;
      const n = Math.sin(x * 3.1 + 1.3) * Math.cos(y * 2.7 - 0.4) + Math.sin(z * 4.3 + x * 1.7) * 0.7 + Math.cos(y * 5.1 + z * 2.9) * 0.45 + Math.sin((x + z) * 7.3) * 0.25 + (h - Math.floor(h) - 0.5) * 0.25;
      if (y < -0.9) c.set("#F2F5F8");
      else if (n > 0.35 || y > 0.7) c.set(n > 0.9 ? "#5E9A3C" : "#78B84E");
      else c.set(n > 0.15 ? "#3C93D1" : "#2D7FC0");
      for (let k = 0; k < 3; k++) col.set([c.r, c.g, c.b], (i + k) * 3);
    }
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    geo.computeVertexNormals();
    g = geo;
    return g;
  };
})();
const earthMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });

const Earth: React.FC<{ mountain?: boolean; smoke?: number }> = ({ mountain = true, smoke = 0 }) => (
  <group>
    <mesh geometry={earthGeo()} material={earthMat} />
    <mesh material={lambert("#BFE3FF", { transparent: true, opacity: 0.18 })}>
      <sphereGeometry args={[EARTH_R + 0.8, 32, 24]} />
    </mesh>
    {mountain ? (
      <group position={[0, EARTH_R - 0.4, 0]}>
        <mesh position={[0, 2.05, 0]} castShadow material={lambert("#8B7A62")}>
          <cylinderGeometry args={[1.25, 2.6, 4.1, 7]} />
        </mesh>
        <mesh position={[0, 4.3, 0]} material={lambert("#FFFFFF")}>
          <cylinderGeometry args={[1.0, 1.28, 0.42, 7]} />
        </mesh>
        <Cannon p={[-0.35, 4.51, 0]} s={1.25} elev={0.02} smoke={smoke} />
      </group>
    ) : null}
  </group>
);

/** Quỹ đạo khẩu đại bác: tích phân số trong mặt phẳng xy, bắn ngang từ đỉnh núi với tỉ lệ `k` của tốc độ vòng tròn. */
const TOP = EARTH_R - 0.4 + 4.51 + 0.6;
const PATHS = [0.42, 0.62, 0.8, 1.0].map((k) => {
  const GM = 1;
  let x = 0.75;
  let y = TOP;
  let vx = k * Math.sqrt(GM / TOP);
  let vy = 0;
  const pts: V3[] = [[x, y, 0]];
  const dt = 0.5;
  for (let i = 0; i < 4000; i++) {
    const r = Math.hypot(x, y);
    const a = GM / (r * r);
    vx += (-x / r) * a * dt;
    vy += (-y / r) * a * dt;
    x += vx * dt;
    y += vy * dt;
    pts.push([x, y, 0]);
    if (Math.hypot(x, y) < EARTH_R + 0.1) break;
    if (k >= 1 && i > 10 && Math.atan2(x, y) < 0 && Math.atan2(pts[pts.length - 2][0], pts[pts.length - 2][1]) > 0 && x < 0.5 && y > 0) break;
  }
  return pts;
});
const tubeCache = new Map<string, THREE.TubeGeometry>();
/** Vệt sáng dạng ống theo quãng đường đã bay (tới phần `f`), quả đạn pháo ở đầu vệt. */
const Trail: React.FC<{ pts: V3[]; f: number; color: string; ball?: boolean; id: number }> = ({ pts, f, color, ball = true, id }) => {
  if (f <= 0) return null;
  const q = Math.max(2, Math.round(Math.min(1, f) * 120));
  const n = Math.max(1, Math.floor(((pts.length - 1) * q) / 120));
  const key = `${id}:${q}`;
  if (!tubeCache.has(key)) {
    const step = Math.max(1, Math.floor(n / 80));
    const sel = pts.slice(0, n + 1).filter((_, i) => i % step === 0 || i === n).map((p) => new THREE.Vector3(...p));
    if (sel.length < 2) sel.push(sel[0].clone().add(new THREE.Vector3(0.01, 0, 0)));
    tubeCache.set(key, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sel), Math.max(8, sel.length * 2), 0.12, 8, false));
  }
  return (
    <>
      <mesh geometry={tubeCache.get(key)} material={lambert(color, { emissive: new THREE.Color(color).multiplyScalar(0.45) })} />
      {ball ? <Cannonball p={pts[n]} r={0.42} /> : null}
    </>
  );
};

const space = { sky: "space" as const, light: "space" as const };

/* ---------- Các cú máy ---------- */

const HOOK: ShotFn[] = [
  // 1. Một tay cầm súng, tay kia giơ viên đạn ngang độ cao
  (t, u) => {
    const cam: Cam = { pos: [lerp(1.4, 0.9, u), 1.5 + PLAT, lerp(3.2, 2.5, u)], look: [0.55, 1.15 + PLAT, 0], fov: 40 };
    return {
      cam,
      world: shotScene(0, 0),
    };
  },
  // 2. Bóp cò, buông tay
  (t, u) => {
    const f = sm(u, 0.3, 0.92);
    const flash = u > 0.3 && u < 0.36 ? 1.5 : 0;
    const k2 = sm(u, 0.25, 0.6);
    const cam: Cam = { pos: [lerp(1.2, 5, k2), lerp(1.6 + PLAT, 3, k2), lerp(3.8, 11, k2)], look: [lerp(0.6, 4.5, k2), lerp(3.6, 1.9, k2), 0], fov: 42 };
    return { cam, world: shotScene(f, flash, <Puff p={[HAND[0], 0, HAND[2]]} k={(u - 0.92) / 0.08} s={0.6} />) };
  },
  // 3. Viên nào chạm đất trước? (dừng hình giữa không trung)
  (t, u) => {
    const cam = SIDE(lerp(0.1, -0.06, u), 12.5);
    const f = 0.45;
    const [ax, ay] = P(cam, fired(f));
    const [bx, by] = P(cam, dropped(f));
    return {
      cam,
      world: shotScene(f, 0),
      over: (
        <>
          <Ask x={ax} y={ay - 70} k={popIn(u, 0.15)} size={80} />
          <Ask x={bx} y={by - 70} k={popIn(u, 0.3)} size={80} />
        </>
      ),
    };
  },
];

const BARRIER: ShotFn[] = [
  // 4. Nhiều người nghĩ viên bắn lơ lửng lâu hơn
  (t, u) => {
    const cam = orbit(0.05, 15, 2.6, [5, 2.0, 0], 40);
    const f = sm(u, 0.05, 0.6);
    // đường tưởng tượng: bay thẳng rồi mới rơi ở xa
    const dream = Array.from({ length: 30 }, (_, i) => {
      const s = i / 29;
      return [MUZZLE[0] + 10 * s, Y0 - (s > 0.65 ? Math.pow((s - 0.65) / 0.35, 2) * (Y0 - 0.1) : 0), MUZZLE[2]] as V3;
    });
    const shown = Math.floor(sm(u, 0.1, 0.7) * 30);
    const [x, y] = P(cam, [9.5, 4.8, 0]);
    return {
      cam,
      world: (
        <>
          <Range />
          <Shooter holding={false} />
          <Bullet p={dropped(f)} shadowY={0} />
          <Puff p={[HAND[0], 0, HAND[2]]} k={(u - 0.6) / 0.25} s={0.6} />
          {dream.slice(0, shown).map((p, i) => (
            <mesh key={i} position={p} material={lambert("#FFFFFF", { transparent: true, opacity: 0.8 })}>
              <sphereGeometry args={[0.12, 6, 5]} />
            </mesh>
          ))}
          {shown > 0 ? <Bullet p={dream[Math.max(0, shown - 1)]} shadowY={0} /> : null}
        </>
      ),
      over: <Ask x={x} y={y} k={popIn(u, 0.72)} size={84} />,
    };
  },
  // 5. MythBusters mang súng ngắn thật ra trường bắn
  (t, u) => {
    const cam = orbit(lerp(-0.6, 0.4, u), 2.2, 1.6, [-4.5, 0.5, 3.5], 40);
    return {
      cam,
      world: (
        <>
          <Range />
          <group position={[-4.45, 0.53, 3.4]} rotation={[0, t * 0.35, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
              <Pistol len={0.62} />
            </group>
          </group>
          {[0, 1, 2].map((i) => (
            <Bullet key={i} p={[-4.75 + i * 0.1, 0.57, 3.95]} dir={[0, 1, 0]} len={0.11} />
          ))}
        </>
      ),
    };
  },
];

const EUREKA: ShotFn[] = [
  // 7. Chạm đất cách nhau chưa tới 0,04 giây; ngắn hơn một khung hình phim
  (t, u) => {
    const cam = SIDE(lerp(0.0, 0.06, u));
    const f = sm(u, 0.02, 0.4) * 0.999 + (u > 0.4 ? 0.001 : 0);
    const land = (u - 0.4) / 0.25;
    const [x, y] = P(cam, [3.9, 4.9, 0]);
    const film = sm(u, 0.6, 0.7);
    return {
      cam,
      world: shotScene(f, 0, (
        <>
          <Puff p={[MUZZLE[0] + D_FAR, 0, MUZZLE[2]]} k={land} s={1.6} />
          <Puff p={[HAND[0], 0, HAND[2]]} k={land} s={1.6} />
        </>
      )),
      over: (
        <>
          <BigNum x={x} y={y} size={92} k={popIn(u, 0.42) * (1 - sm(u, 0.58, 0.62))}>
            {"< 0,04 giây"}
          </BigNum>
          {film > 0 ? (
            <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: film }}>
              <g transform={`translate(${W / 2 - 330} ${H / 2 - 110})`}>
                <rect width={660} height={220} rx={10} fill="#1B1B1B" />
                {Array.from({ length: 12 }, (_, i) => (
                  <g key={i}>
                    <rect x={14 + i * 54} y={10} width={30} height={16} rx={3} fill="#EDEDED" />
                    <rect x={14 + i * 54} y={194} width={30} height={16} rx={3} fill="#EDEDED" />
                  </g>
                ))}
                {[0, 1, 2].map((i) => (
                  <rect key={i} x={20 + i * 215} y={40} width={190} height={140} fill={i === 1 ? "#FFF3C4" : "#5C6670"} stroke={i === 1 ? "#FFD23F" : "none"} strokeWidth={8} />
                ))}
                {[-40, 40].map((dx) => (
                  <g key={dx} transform={`translate(${330 + dx} 140)`}>
                    <ellipse rx={30} ry={12} fill="#D9C9A3" />
                    <circle cy={-14} r={10} fill="#D9A441" />
                  </g>
                ))}
              </g>
            </svg>
          ) : null}
        </>
      ),
    };
  },
  // 8. Lực hút chỉ kéo xuống
  (t, u) => {
    const cam = SIDE(0, 11);
    const f = 0.42;
    const g = sm(u, 0.2, 0.4) * 1.1;
    const hz = sm(u, 0.55, 0.7) * 2.2;
    return {
      cam,
      world: shotScene(f, 0, (
        <>
          <Arrow3 from={dropped(f)} dir={[0, -1, 0]} len={g} color="#E8403A" r={0.07} />
          <Arrow3 from={fired(f)} dir={[0, -1, 0]} len={g} color="#E8403A" r={0.07} />
          <Arrow3 from={fired(f)} dir={[1, 0, 0]} len={hz} color="#3BA3E6" r={0.07} />
        </>
      )),
    };
  },
  // 9. Mỗi khoảnh khắc tụt xuống y như nhau, viên bắn vừa rơi vừa trôi ngang
  (t, u) => {
    const cam = SIDE(0);
    const steps = 6;
    const shown = Math.floor(sm(u, 0.05, 0.7) * steps + 0.001);
        const gold = lambert("#FFD23F", { emissive: new THREE.Color("#8A6400") });
    return {
      cam,
      world: (
        <>
          <Range />
          <Shooter holding={false} />
          {Array.from({ length: shown + 1 }, (_, i) => {
            const f = i / steps;
            const a = fired(f);
            const b = dropped(f);
            return (
              <group key={i}>
                <Bullet p={a} ghost={i === shown ? 1 : 0.45} />
                <Bullet p={b} ghost={i === shown ? 1 : 0.45} />
                <mesh position={[(a[0] + b[0]) / 2, a[1], 0]} material={gold}>
                  <boxGeometry args={[a[0] - b[0], 0.04, 0.04]} />
                </mesh>
              </group>
            );
          })}
        </>
      ),
    };
  },
];

const THEOREM: ShotFn[] = [
  // 10. Ngang đều, dọc rơi tự do, độc lập
  (t, u) => {
    const cam = SIDE(0);
    const f = sm(u, 0.05, 0.95);
    const a = fired(f);
    const d = dropped(f);
    const dots = Array.from({ length: 7 }, (_, i) => fired((i / 6) * f));
    const m = lambert("#FFFFFF", { transparent: true, opacity: 0.75 });
    return {
      cam,
      world: (
        <>
          <Range />
          <Shooter holding={false} />
          {dots.map((p, i) => (
            <mesh key={i} position={p} material={m}>
              <sphereGeometry args={[0.12, 6, 5]} />
            </mesh>
          ))}
          <Bullet p={a} shadowY={0} />
          <Arrow3 from={a} dir={[1, 0, 0]} len={3 - 1.9 * f} color="#3BA3E6" r={0.09} />
          {/* bóng chiếu: trên mặt đất chạy đều, trên cột thẳng đứng rơi dần */}
          <mesh position={[a[0], 0.04, 1.4]} material={lambert("#3BA3E6")}>
            <sphereGeometry args={[0.16, 10, 8]} />
          </mesh>
          {/* phần rơi thẳng đứng: viên thả từ tay người que, luôn cùng độ cao với viên bắn */}
          {Array.from({ length: 7 }, (_, i) => dropped((i / 6) * f)).map((p, i) => (
            <mesh key={`d${i}`} position={p} material={m}>
              <sphereGeometry args={[0.12, 6, 5]} />
            </mesh>
          ))}
          <Bullet p={d} shadowY={0} />
          {d[1] > 0.45 ? <Arrow3 from={d} dir={[0, -1, 0]} len={Math.min(1.1, d[1] - 0.25)} color="#E8403A" r={0.09} /> : null}
          <Box p={[(d[0] + a[0]) / 2, a[1], (d[2] + a[2]) / 2]} s={[Math.max(0.01, a[0] - d[0] - 0.4), 0.03, 0.03]} c="#FFFFFF" shadow={false} />
        </>
      ),
    };
  },
  // 11. Cùng độ cao, ném mạnh hay thả nhẹ đều chạm đất cùng lúc
  (t, u) => {
    const cam = orbit(0.0, 11, 2.2, [4.4, 0.8, 0], 40);
    const f = sm(u, 0.25, 0.85);
    const speeds = [0, 2.6, 5.2, 8];
    const cols = ["#D9A441", "#E8403A", "#3BA3E6", "#5FAE45"];
    const land = (u - 0.85) / 0.15;
    const [cx, cy] = P(cam, [4.4, 3.2, 0]);
    return {
      cam,
      world: (
        <>
          <Range />
          {speeds.map((v, i) => {
            const p: V3 = [0.6 + v * f, 1.2 * (1 - f * f) + 0.1, -1.5 + i];
            return (
              <group key={i}>
                <mesh position={p} material={lambert(cols[i])} castShadow>
                  <sphereGeometry args={[0.3, 12, 10]} />
                </mesh>
                <Puff p={[0.6 + v, 0, -1.5 + i]} k={land} s={0.8} />
              </group>
            );
          })}
          <Box p={[0.3, 0.6, 0]} s={[0.6, 1.2, 4.6]} c="#A0703F" />
        </>
      ),
      over: <Clock x={cx} y={cy - 60} r={52} turn={f * 2} k={popIn(u, 0.2)} />,
    };
  },
];

const REALWORLD: ShotFn[] = [
  // 12. Máy bay chở hàng bay ngang ở 490 m
  (t, u) => {
    const px = lerp(-30, 10, u);
    const cam: Cam = { pos: [px - 4, 24, 30], look: [px + 5, 15, 0], fov: 42 };
    const [x, y] = P(cam, [px, 10, 0]);
    const line = sm(u, 0.35, 0.6);
    return {
      cam,
      world: (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#8CC860")}>
            <planeGeometry args={[600, 600]} />
          </mesh>
          <Trees spots={RANGE_TREES.map(([a, b, c]) => [a * 2 - 40, b * 1.5, c * 2.2])} />
          <CargoPlane p={[px, 20, 0]} s={2} prop={t * 40} />
          {line > 0 ? <Box p={[px, 10 * line, 0]} s={[0.12, 20 * line, 0.12]} c="#FFFFFF" shadow={false} /> : null}
        </>
      ),
      over: (
        <BigNum x={x + 90} y={y} size={88} k={popIn(u, 0.45)}>
          490 m
        </BigNum>
      ),
    };
  },
  // 13. Thùng hàng rơi 10 giây, trôi ngang 1 km
  (t, u) => {
    const f = sm(u, 0.12, 0.78);
    const px = lerp(-14, 36, u);
    const rx = -14 + 50 * 0.12;
    const cx = rx + (36 - 14 - 0) * 0 + (px - rx) * (f > 0 ? 1 : 0);
    const crateX = f > 0 ? rx + (lerp(-14, 36, lerp(0.12, 0.78, f)) - rx) : px;
    void cx;
    const crateY = f > 0 ? 19 * (1 - f * f) + 0.4 : 19;
    const cam: Cam = { pos: [lerp(-2, 16, u), 18, 40], look: [lerp(6, 16, u), 8, 0], fov: 44 };
    const land = (u - 0.78) / 0.15;
    const kmK = sm(u, 0.8, 0.9);
    const [mx, my] = P(cam, [(rx + crateX) / 2, 1.5, 0]);
    return {
      cam,
      world: (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#8CC860")}>
            <planeGeometry args={[600, 600]} />
          </mesh>
          <Trees spots={RANGE_TREES.map(([a, b, c]) => [a * 2 - 40, b * 1.5 - 10, c * 2.2])} />
          <CargoPlane p={[px, 20, 0]} s={2} prop={t * 40} door={sm(u, 0.02, 0.1)} />
          <group position={[crateX, crateY, 0]} scale={2}>
            <Crate p={[0, 0, 0]} ry={f * 0.6} />
          </group>
          <Puff p={[crateX, 0, 0]} k={land} s={2} />
          {kmK > 0 ? <BeamRoad a={[rx, 0.6]} b={[lerp(rx, crateX, kmK), 0.6]} mat={lambert("#FFD23F", { emissive: new THREE.Color("#8A6400") })} w={0.5} y={0.1} /> : null}
          {kmK > 0 ? <Box p={[rx, 1, 0.6]} s={[0.15, 2, 0.15]} c="#FFFFFF" shadow={false} /> : null}
        </>
      ),
      over: (
        <>
          <Clock x={110} y={110} r={50} turn={f * 10 / 12} k={popIn(u, 0.12)} />
          <BigNum x={270} y={112} size={70} k={popIn(u, 0.15)}>
            {`${Math.round(10 * f)} giây`}
          </BigNum>
          <BigNum x={mx} y={my - 40} size={84} k={popIn(u, 0.86)}>
            1 km
          </BigNum>
        </>
      ),
    };
  },
];

const ORBIT_CAM = (ang: number, d = 68): Cam => ({ pos: [Math.sin(ang) * 10, 6 + Math.cos(ang) * 2, d], look: [0, 4, 0], fov: 40 });

const COSMIC: ShotFn[] = [
  // 14. Khẩu đại bác của Newton trên đỉnh núi rất cao
  (t, u) => {
    const k = sm(u, 0.0, 1);
    const k2 = sm(u, 0.35, 1);
    const cam: Cam = { pos: [lerp(1.6, 6, k2), lerp(EARTH_R + 4.9, EARTH_R + 9, k2), lerp(3.6, 30, k2)], look: [lerp(0.1, 0, k2), lerp(EARTH_R + 4.35, EARTH_R, k2), 0], fov: 40 };
    void k;
    return { cam, ...space, world: <Earth /> };
  },
  // 15. Bắn càng mạnh càng rơi xa, tới lúc rơi vòng quanh
  (t, u) => {
    const cam = ORBIT_CAM(lerp(-0.1, 0.1, u));
    const seg = [0.0, 0.22, 0.44, 0.66, 1.0];
    return {
      cam,
      ...space,
      world: (
        <>
          <Earth smoke={Math.max(...seg.slice(0, 4).map((a) => (u > a && u < a + 0.12 ? (u - a) / 0.12 : 0)))} />
          {PATHS.map((pts, i) => (
            <Trail key={i} id={i} pts={pts} f={sm(u, seg[i] + 0.02, seg[i + 1] - 0.02)} color={["#FF8A65", "#FFD23F", "#9CCC65", "#4FC3F7"][i]} ball={u < seg[i + 1] + 0.05 || i === 3} />
          ))}
        </>
      ),
    };
  },
  // 16. Trạm vũ trụ cũng đang rơi như thế, 28.000 km/h
  (t, u) => {
    const cam = ORBIT_CAM(0.05, 70);
    const ang = lerp(0.3, 1.6, u);
    const r = EARTH_R + 6;
    const pos: V3 = [Math.sin(ang) * r, Math.cos(ang) * r, 0];
    const [x, y] = P(cam, [0, 0, 0]);
    const ring = Array.from({ length: 90 }, (_, i) => {
      const a = (i / 90) * Math.PI * 2;
      return [Math.sin(a) * r, Math.cos(a) * r, 0] as V3;
    });
    return {
      cam,
      ...space,
      world: (
        <>
          <Earth mountain={false} />
          {ring.map((p, i) => (
            <mesh key={i} position={p} material={lambert("#4FC3F7", { emissive: new THREE.Color("#1A5A7A") })}>
              <sphereGeometry args={[0.1, 6, 5]} />
            </mesh>
          ))}
          <group position={pos} rotation={[0, 0, -ang]}>
            <ISS s={1.8} />
          </group>
        </>
      ),
      over: (
        <BigNum x={x} y={y} size={84} k={popIn(u, 0.35)}>
          28.000 km/h
        </BigNum>
      ),
    };
  },
  // 17. Ở độ cao ấy lực hút vẫn còn chừng 9/10; vậy sao trạm không rơi xuống?
  (t, u) => {
    const r = EARTH_R + 6;
    const ang = lerp(-0.42, -0.32, u);
    const pos: V3 = [Math.sin(ang) * r, Math.cos(ang) * r, 0];
    const down: V3 = [-Math.sin(ang), -Math.cos(ang), 0];
    const cam: Cam = { pos: [lerp(-4, -3, u), 16, 40], look: [-4, 16, 0], fov: 40 };
    const grow = sm(u, 0.1, 0.4);
    const mid: V3 = [pos[0] + down[0] * 4.5, pos[1] + down[1] * 4.5, 0];
    const [nx, ny] = P(cam, mid);
    const [qx, qy] = P(cam, pos);
    return {
      cam,
      ...space,
      world: (
        <>
          <Earth mountain={false} />
          <group position={pos} rotation={[0, 0, -ang]}>
            <ISS s={1.4} />
          </group>
          <Arrow3 from={[pos[0] + down[0] * 1.4, pos[1] + down[1] * 1.4, 0]} dir={down} len={0.3 + grow * 3.4} color="#E8403A" r={0.32} />
        </>
      ),
      over: (
        <>
          <BigNum x={nx + 150} y={ny} size={84} k={popIn(u, 0.3)}>
            9/10
          </BigNum>
          <Ask x={qx + 130} y={qy - 60} k={popIn(u, 0.72)} size={84} />
        </>
      ),
    };
  },
  // 18. Lao ngang nhanh tới mức rơi bao nhiêu thì mặt đất cong đi bấy nhiêu:
  // trạm đứng yên trong lúc hiện đường thẳng (nếu không có lực hút) và mũi tên rơi, rồi trôi theo vòng tới đúng chỗ mũi tên rơi xuống.
  (t, u) => {
    const r = EARTH_R + 6;
    const L = 10;
    const a0 = -0.16;
    const a1 = a0 + Math.atan(L / r);
    const cam: Cam = { pos: [2.2, r + 1, 25], look: [2.2, r - 4.5, 0], fov: 40 };
    const at = (x: number): V3 => [Math.sin(x) * r, Math.cos(x) * r, 0];
    const p0 = at(a0);
    const tan: V3 = [Math.cos(a0), -Math.sin(a0), 0];
    const tip: V3 = [p0[0] + tan[0] * L, p0[1] + tan[1] * L, 0];
    const fall = Math.hypot(r, L) - r;
    const dTip = Math.hypot(tip[0], tip[1]);
    const toC: V3 = [-tip[0] / dTip, -tip[1] / dTip, 0];
    const k1 = sm(u, 0.06, 0.3);
    const k2 = sm(u, 0.3, 0.48);
    const k3 = sm(u, 0.52, 0.9);
    const a = lerp(a0, a1, k3);
    const arc = Array.from({ length: 70 }, (_, i) => at(-0.55 + i * 0.016));
    const n = 16;
    const line = Array.from({ length: n }, (_, i) => [p0[0] + tan[0] * (i / (n - 1)) * L, p0[1] + tan[1] * (i / (n - 1)) * L, 0] as V3);
    const dot = (c: string, o = 1) => lambert(c, { transparent: o < 1, opacity: o, emissive: new THREE.Color(c).multiplyScalar(0.35) });
    return {
      cam,
      ...space,
      world: (
        <>
          <Earth mountain={false} />
          {arc.map((q, i) => (
            <mesh key={i} position={q} material={dot("#9CCC65", 0.85)}>
              <sphereGeometry args={[0.1, 6, 5]} />
            </mesh>
          ))}
          {k1 > 0
            ? line.slice(0, Math.max(1, Math.round(n * k1))).map((q, i) => (
                <mesh key={`l${i}`} position={q} material={dot("#4FC3F7", 0.95)}>
                  <sphereGeometry args={[0.13, 6, 5]} />
                </mesh>
              ))
            : null}
          {k1 > 0.97 ? <Arrow3 from={tip} dir={tan} len={1.2} color="#4FC3F7" r={0.2} /> : null}
          {k2 > 0 ? <Arrow3 from={tip} dir={toC} len={Math.max(0.05, fall * k2)} color="#E8403A" r={0.2} /> : null}
          <group position={at(a)} rotation={[0, 0, -a]}>
            <group rotation={[1.0, 0, 0]}>
              <ISS s={0.7} />
            </group>
          </group>
        </>
      ),
    };
  },
  // 19. Trạm vũ trụ giống một viên đạn rơi mãi
  (t, u) => {
    const cam = ORBIT_CAM(lerp(0.1, -0.15, u), lerp(62, 80, u));
    const ang = lerp(1.6, 2.6, u);
    const r = EARTH_R + 6;
    const at = (a: number): V3 => [Math.sin(a) * r, Math.cos(a) * r, 0];
    return {
      cam,
      ...space,
      world: (
        <>
          <Earth mountain={false} />
          <group position={at(ang)} rotation={[0, 0, -ang]}>
            <ISS s={1.8} />
          </group>
          <group position={at(ang + 0.55)} rotation={[0, 0, -(ang + 0.55)]}>
            <Bullet p={[0, 0, 0]} len={1.6} />
          </group>
          {Array.from({ length: 40 }, (_, i) => {
            const a = ang + 0.55 - (i / 40) * 1.2;
            return (
              <mesh key={i} position={at(a)} material={lambert("#FFE27A", { transparent: true, opacity: clamp01(1 - i / 40) })}>
                <sphereGeometry args={[0.12, 6, 5]} />
              </mesh>
            );
          })}
        </>
      ),
    };
  },
];

/** Sân khấu 3D của tập 17 (đăng ký ở engine/parchment/stages3d.ts). */
export const Ep17Stage = makeStage3D({ hook: HOOK, barrier: BARRIER, eureka: EUREKA, theorem: THEOREM, realworld: REALWORLD, cosmic: COSMIC });

/** Đạo cụ chính của tập 17 (bảng đạo cụ KienThuc-DaoCu-17). */
export const Ep17Props: PropItem[] = [
  { name: "Đầu đạn súng ngắn", node: <Bullet p={[0, 0.14, 0]} dir={[0, 1, 0]} len={0.28} />, size: 0.3 },
  { name: "Súng ngắn", node: <group position={[0, 0.2, 0]}><Pistol len={0.7} /></group>, size: 0.75 },
  { name: "Khẩu đại bác", node: <Cannon p={[0, 0, 0]} s={1} />, size: 1.5 },
  { name: "Quả đạn pháo", node: <Cannonball p={[0, 0.12, 0]} r={0.12} />, size: 0.28 },
  { name: "Máy bay chở hàng", node: <CargoPlane p={[0, 1, 0]} s={1} prop={0.4} />, size: 8.5 },
  { name: "Thùng hàng", node: <Crate p={[0, 0.4, 0]} />, size: 1.1 },
  { name: "Trạm vũ trụ", node: <group position={[0, 1.5, 0]}><ISS s={1} /></group>, size: 6 },
];
