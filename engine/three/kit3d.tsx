/**
 * Bộ dựng cảnh 3D low-poly (three.js qua @remotion/three) cho sân khấu giấy da:
 * trời, máy quay, nhân vật que 3D, vật liệu, cây, xe, chữ số nổi kiểu phim tài liệu hoạt hình.
 * Mọi thứ là hàm của khung hình, không có trạng thái, để render lặp lại đúng y hệt.
 */
import React, { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { TEXT_FONT } from "../components/brand.ts";

export type V3 = [number, number, number];
export type Cam = { pos: V3; look: V3; fov?: number };

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** 0..1 trong đoạn [a, b], làm mượt hai đầu. */
export const sm = (x: number, a: number, b: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({
  pos: lerp3(a.pos, b.pos, t),
  look: lerp3(a.look, b.look, t),
  fov: lerp(a.fov ?? 40, b.fov ?? 40, t),
});
/** Nảy lên: 0 → vượt 1 một chút → 1. */
export const popIn = (x: number, a: number, d = 0.35) => {
  const t = clamp01((x - a) / d);
  if (t >= 1) return 1;
  return 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
};
/** Số giả ngẫu nhiên cố định theo hạt giống. */
export const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

/** Đặt máy quay mỗi khung hình. */
export const CamRig: React.FC<{ cam: Cam }> = ({ cam }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.position.set(...cam.pos);
  c.up.set(0, 1, 0);
  c.lookAt(...cam.look);
  if (c.fov !== (cam.fov ?? 40)) {
    c.fov = cam.fov ?? 40;
    c.updateProjectionMatrix();
  }
  c.updateMatrixWorld();
  return null;
};

/** Chiếu điểm 3D ra toạ độ điểm ảnh trong khung (để đặt chữ số nổi). */
export const project = (cam: Cam, p: V3, w: number, h: number): [number, number, boolean] => {
  const c = new THREE.PerspectiveCamera(cam.fov ?? 40, w / h, 0.1, 1000);
  c.position.set(...cam.pos);
  c.lookAt(...cam.look);
  c.updateMatrixWorld();
  const v = new THREE.Vector3(...p).project(c);
  return [((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h, v.z < 1];
};

/** Ánh sáng ban ngày + sương xa. */
export const DayLights: React.FC<{ fog?: [number, number]; fogColor?: string; shadowSize?: number; sun?: V3 }> = ({
  fog = [60, 190],
  fogColor = "#CFE5F4",
  shadowSize = 40,
  sun = [-18, 34, 22],
}) => (
  <>
    <fog attach="fog" args={[fogColor, fog[0], fog[1]]} />
    <hemisphereLight args={["#F4FAFF", "#7E9B62", 1.7]} />
    <directionalLight
      position={sun}
      intensity={2.6}
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0006}
      shadow-camera-left={-shadowSize}
      shadow-camera-right={shadowSize}
      shadow-camera-top={shadowSize}
      shadow-camera-bottom={-shadowSize}
      shadow-camera-far={140}
    />
  </>
);

/** Trời xanh có mây vệt (HTML, nằm dưới khung 3D trong suốt). */
export const Sky: React.FC<{ drift: number; tint?: string }> = ({ drift, tint }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: tint ?? "linear-gradient(180deg, #2F86DB 0%, #63A9EA 38%, #A9D3F3 62%, #D3E9F7 78%)",
      overflow: "hidden",
    }}
  >
    {tint
      ? null
      : CLOUDS.map(([x, y, w, h, o], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ((x + drift * (0.6 + (i % 3) * 0.25)) % 1300) - 200,
              top: y,
              width: w,
              height: h,
              borderRadius: "50%",
              background: `rgba(255,255,255,${o})`,
              filter: "blur(7px)",
              transform: "rotate(-8deg)",
            }}
          />
        ))}
  </div>
);
const CLOUDS: [number, number, number, number, number][] = [
  [40, 40, 260, 34, 0.85],
  [360, 70, 180, 26, 0.75],
  [620, 30, 300, 40, 0.8],
  [880, 110, 210, 28, 0.7],
  [150, 150, 320, 30, 0.65],
  [520, 180, 240, 24, 0.6],
  [980, 220, 180, 22, 0.55],
  [260, 250, 200, 20, 0.5],
  [760, 300, 260, 22, 0.45],
];

/* ---------- Vật liệu dùng chung (tạo một lần trong trình duyệt) ---------- */

const cache = new Map<string, unknown>();
const memo = <T,>(key: string, make: () => T): T => {
  if (!cache.has(key)) cache.set(key, make());
  return cache.get(key) as T;
};

export const lambert = (color: string, extra: THREE.MeshLambertMaterialParameters = {}) =>
  memo(`l:${color}:${JSON.stringify(extra)}`, () => new THREE.MeshLambertMaterial({ color, flatShading: true, ...extra }));
export const basic = (color: string) => memo(`b:${color}`, () => new THREE.MeshBasicMaterial({ color }));

const canvasTex = (key: string, w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, repeat?: [number, number]) =>
  memo(`t:${key}`, () => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d")!);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    if (repeat) t.repeat.set(...repeat);
    return t;
  });

/** Tường có hàng cửa sổ. */
export const windowWall = (color = "#F1EFE8", glass = "#3E4B57", repeat: [number, number] = [3.4, 4.6]) =>
  memo(`ww:${color}:${glass}:${repeat}`, () =>
    new THREE.MeshLambertMaterial({
      map: canvasTex(
        `win:${color}:${glass}:${repeat}`,
        64,
        64,
        (g) => {
          g.fillStyle = color;
          g.fillRect(0, 0, 64, 64);
          g.fillStyle = glass;
          g.fillRect(20, 18, 24, 26);
          g.fillStyle = "rgba(255,255,255,0.35)";
          g.fillRect(20, 18, 24, 5);
        },
        repeat,
      ),
    }),
  );

/** Sàn gạch ô vuông. */
export const tileFloor = (a = "#D9D3C6", b = "#BDB6A7", repeat: [number, number] = [6, 6]) =>
  memo(`tf:${a}:${b}:${repeat}`, () =>
    new THREE.MeshLambertMaterial({
      map: canvasTex(
        `tile:${a}:${b}:${repeat}`,
        128,
        128,
        (g) => {
          g.fillStyle = a;
          g.fillRect(0, 0, 128, 128);
          g.fillStyle = b;
          g.fillRect(0, 0, 64, 64);
          g.fillRect(64, 64, 64, 64);
          g.strokeStyle = "rgba(0,0,0,0.08)";
          g.lineWidth = 2;
          g.strokeRect(0, 0, 128, 128);
        },
        repeat,
      ),
    }),
  );

/** Bãi đỗ xe: nhựa đường có vạch. */
export const parkingMat = (repeat: [number, number]) =>
  memo(`pk:${repeat}`, () =>
    new THREE.MeshLambertMaterial({
      map: canvasTex(
        `pk:${repeat}`,
        64,
        64,
        (g) => {
          g.fillStyle = "#7E848A";
          g.fillRect(0, 0, 64, 64);
          g.fillStyle = "rgba(255,255,255,0.55)";
          for (let i = 0; i < 8; i++) g.fillRect(i * 8, 0, 1.5, 24);
          for (let i = 0; i < 8; i++) g.fillRect(i * 8, 40, 1.5, 24);
        },
        repeat,
      ),
    }),
  );

/* ---------- Hình khối ---------- */

/** Đỉnh đa giác đều trên mặt đất (x, z), đỉnh đầu chĩa về phía xa (−z). */
export const ngon = (n: number, r: number, rot = 0): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((90 + rot + (i * 360) / n) * Math.PI) / 180;
    return [Math.cos(a) * r, -Math.sin(a) * r];
  });

/** Vành đa giác đều đùn cao (năm vòng nhà). Nhóm 0 mặt trên/dưới, nhóm 1 tường. */
export const ringGeo = (n: number, rIn: number, rOut: number, h: number) =>
  memo(`ring:${n}:${rIn}:${rOut}:${h}`, () => {
    const pts = (r: number) => Array.from({ length: n }, (_, i) => {
      const a = ((90 + (i * 360) / n) * Math.PI) / 180;
      return new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r);
    });
    const shape = new THREE.Shape(pts(rOut));
    if (rIn > 0) shape.holes.push(new THREE.Path(pts(rIn)));
    const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    return g;
  });

/** Khối hộp có đổ bóng. */
export const Box: React.FC<{ p: V3; s: V3; c: string | THREE.Material; ry?: number; shadow?: boolean }> = ({ p, s, c, ry = 0, shadow = true }) => (
  <mesh position={p} rotation={[0, ry, 0]} castShadow={shadow} receiveShadow material={typeof c === "string" ? lambert(c) : c}>
    <boxGeometry args={s} />
  </mesh>
);

/** Rừng cây tròn (instanced). */
export const Trees: React.FC<{ spots: [number, number, number][]; color?: string; dark?: string; snow?: boolean }> = ({ spots, color = "#5FAE45", dark = "#3F8F3A", snow = false }) => {
  const { geo, mat, mats } = useMemo(() => {
    const geo = snow ? new THREE.ConeGeometry(0.6, 1.8, 7) : new THREE.IcosahedronGeometry(0.75, 1);
    return { geo, mat: lambert(color), mats: lambert(dark) };
  }, [snow, color, dark]);
  const half = Math.ceil(spots.length / 2);
  const make = (list: [number, number, number][], m: THREE.Material, key: string) => (
    <instancedMesh
      key={key}
      args={[geo, m, list.length]}
      castShadow
      ref={(im) => {
        if (!im) return;
        const o = new THREE.Object3D();
        list.forEach(([x, z, s], i) => {
          o.position.set(x, (snow ? 0.9 : 0.75) * s, z);
          o.scale.set(s, s, s);
          o.updateMatrix();
          im.setMatrixAt(i, o.matrix);
        });
        im.instanceMatrix.needsUpdate = true;
      }}
    />
  );
  return (
    <>
      {make(spots.slice(0, half), mat, "a")}
      {make(spots.slice(half), mats, "b")}
    </>
  );
};

const CAR_COLORS = ["#C0392B", "#2C3E50", "#ECF0F1", "#2E86C1", "#7F8C8D", "#F4D03F", "#1B2631", "#D5D8DC", "#922B21", "#ECF0F1"];
/** Bãi xe kín chỗ (instanced, mỗi xe một màu). */
export const ParkingLot: React.FC<{ x: number; z: number; w: number; d: number; fill?: number; seed?: number }> = ({ x, z, w, d, fill = 0.92, seed = 1 }) => {
  const cars = useMemo(() => {
    const r = rng(seed);
    const out: [number, number, string][] = [];
    for (let row = 0; row * 0.62 < d - 0.4; row++)
      for (let col = 0; col * 0.32 < w - 0.3; col++) if (r() < fill) out.push([x - w / 2 + 0.2 + col * 0.32, z - d / 2 + 0.3 + row * 0.62, CAR_COLORS[Math.floor(r() * CAR_COLORS.length)]]);
    return out;
  }, [x, z, w, d, fill, seed]);
  const geo = useMemo(() => new THREE.BoxGeometry(0.2, 0.14, 0.36), []);
  const mat = useMemo(() => new THREE.MeshLambertMaterial({ color: "#ffffff" }), []);
  return (
    <>
      <mesh position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={parkingMat([w / 2.6, d / 1.25])}>
        <planeGeometry args={[w, d]} />
      </mesh>
      <instancedMesh
        args={[geo, mat, cars.length]}
        ref={(im) => {
          if (!im) return;
          const o = new THREE.Object3D();
          const c = new THREE.Color();
          cars.forEach(([cx, cz, col], i) => {
            o.position.set(cx, 0.09, cz);
            o.updateMatrix();
            im.setMatrixAt(i, o.matrix);
            im.setColorAt(i, c.set(col));
          });
          im.instanceMatrix.needsUpdate = true;
          if (im.instanceColor) im.instanceColor.needsUpdate = true;
        }}
      />
    </>
  );
};

/** Đoạn đường nhựa có vạch giữa. */
export const Road: React.FC<{ a: [number, number]; b: [number, number]; w?: number }> = ({ a, b, w = 1.4 }) => {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const len = Math.hypot(dx, dz);
  const ry = -Math.atan2(dz, dx);
  const mid: V3 = [(a[0] + b[0]) / 2, 0.03, (a[1] + b[1]) / 2];
  return (
    <group position={mid} rotation={[0, ry, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={lambert("#5B6067")}>
        <planeGeometry args={[len + w, w]} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} material={basic("#E9E3C8")}>
        <planeGeometry args={[len, 0.05]} />
      </mesh>
    </group>
  );
};

/* ---------- Nhân vật que 3D ---------- */

export type Outfit = "none" | "officer" | "general" | "worker" | "suit" | "seller";
const OUTFIT: Record<Outfit, { body?: string; hat?: "cap" | "hard" | "paper"; hatColor?: string }> = {
  none: {},
  officer: { body: "#1F3A6B", hat: "cap", hatColor: "#F3F1EA" },
  general: { body: "#6B7A3A", hat: "cap", hatColor: "#5E6B33" },
  worker: { body: "#F08A24", hat: "hard", hatColor: "#F6C431" },
  suit: { body: "#22324F", hat: "cap", hatColor: "#1C2333" },
  seller: { body: "#FFFFFF", hat: "paper", hatColor: "#FFFFFF" },
};

/**
 * Người que: đầu tròn to viền đen, mắt chấm, thân áo, tay chân nét đen.
 * `walk` là pha bước chân (radian, tăng dần khi đi), `look` quay đầu, `arm` giơ tay phải (0..1).
 */
export const Stick: React.FC<{
  p: V3;
  ry?: number;
  s?: number;
  outfit?: Outfit;
  skin?: string;
  walk?: number;
  look?: number;
  arm?: number;
  hold?: React.ReactNode;
  /** Giơ tay trái (0..1) và vật cầm ở tay trái. */
  armL?: number;
  holdL?: React.ReactNode;
  sit?: boolean;
}> = ({ p, ry = 0, s = 1, outfit = "none", skin = "#FFFFFF", walk, look = 0, arm = 0, hold, armL = 0, holdL, sit = false }) => {
  const o = OUTFIT[outfit];
  const sw = walk === undefined ? 0 : Math.sin(walk) * 0.55;
  const bob = walk === undefined ? 0 : Math.abs(Math.cos(walk)) * 0.04;
  const line = basic("#1A1A1A");
  const limb = (key: string, at: V3, rx: number, rz: number, len: number) => (
    <group key={key} position={at} rotation={[rx, 0, rz]}>
      <mesh position={[0, -len / 2, 0]} material={line}>
        <cylinderGeometry args={[0.035, 0.035, len, 6]} />
      </mesh>
      <mesh position={[0, -len, 0.04]} material={line}>
        <boxGeometry args={[0.09, 0.06, 0.16]} />
      </mesh>
    </group>
  );
  return (
    <group position={[p[0], p[1] + bob, p[2]]} rotation={[0, ry, 0]} scale={s}>
      {/* chân */}
      {sit ? (
        <>
          {limb("l1", [-0.08, 0.72, 0], Math.PI / 2, 0, 0.42)}
          {limb("l2", [0.08, 0.72, 0], Math.PI / 2, 0, 0.42)}
        </>
      ) : (
        <>
          {limb("l1", [-0.08, 0.72, 0], sw, 0, 0.72)}
          {limb("l2", [0.08, 0.72, 0], -sw, 0, 0.72)}
        </>
      )}
      {/* thân */}
      {o.body ? (
        <mesh position={[0, 0.98, 0]} castShadow material={lambert(o.body)}>
          <cylinderGeometry args={[0.15, 0.19, 0.56, 10]} />
        </mesh>
      ) : (
        <mesh position={[0, 0.98, 0]} material={line}>
          <cylinderGeometry args={[0.035, 0.035, 0.56, 6]} />
        </mesh>
      )}
      {/* tay */}
      <group position={[-0.17, 1.2, 0]} rotation={[-sw * 0.8 - armL * 1.9, 0, -0.18 - armL * 0.1]}>
        <mesh position={[0, -0.25, 0]} material={line}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
        </mesh>
        {holdL ? <group position={[0, -0.52, 0.05]}>{holdL}</group> : null}
      </group>
      <group position={[0.17, 1.2, 0]} rotation={[sw * 0.8 - arm * 1.9, 0, 0.18 + arm * 0.1]}>
        <mesh position={[0, -0.25, 0]} material={line}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
        </mesh>
        {hold ? <group position={[0, -0.52, 0.05]}>{hold}</group> : null}
      </group>
      {/* đầu */}
      <group position={[0, 1.55, 0]} rotation={[0, look, 0]}>
        <mesh castShadow material={lambert(skin)}>
          <sphereGeometry args={[0.3, 20, 16]} />
        </mesh>
        <mesh scale={1.1} material={memo("outline", () => new THREE.MeshBasicMaterial({ color: "#151515", side: THREE.BackSide }))}>
          <sphereGeometry args={[0.3, 20, 16]} />
        </mesh>
        <mesh position={[-0.1, 0.04, 0.27]} material={line}>
          <sphereGeometry args={[0.04, 8, 6]} />
        </mesh>
        <mesh position={[0.1, 0.04, 0.27]} material={line}>
          <sphereGeometry args={[0.04, 8, 6]} />
        </mesh>
        {o.hat === "cap" ? (
          <group position={[0, 0.22, 0]}>
            <mesh material={lambert(o.hatColor!)}>
              <cylinderGeometry args={[0.31, 0.26, 0.16, 16]} />
            </mesh>
            <mesh position={[0, -0.06, 0.2]} rotation={[0.25, 0, 0]} material={lambert("#1C1C1C")}>
              <boxGeometry args={[0.36, 0.03, 0.2]} />
            </mesh>
            <mesh position={[0, 0.01, 0.27]} material={lambert("#E6B93A")}>
              <boxGeometry args={[0.1, 0.07, 0.04]} />
            </mesh>
          </group>
        ) : o.hat === "hard" ? (
          <mesh position={[0, 0.1, 0]} material={lambert(o.hatColor!)}>
            <sphereGeometry args={[0.32, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        ) : o.hat === "paper" ? (
          <mesh position={[0, 0.27, 0]} material={lambert(o.hatColor!)}>
            <boxGeometry args={[0.5, 0.14, 0.2]} />
          </mesh>
        ) : null}
      </group>
    </group>
  );
};

/** Bánh mì kẹp xúc xích. */
export const HotDog: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <group scale={s} rotation={[0, 0, Math.PI / 2]}>
    <mesh material={lambert("#E3A955")} scale={[1, 1, 0.75]}>
      <capsuleGeometry args={[0.09, 0.32, 4, 10]} />
    </mesh>
    <mesh position={[0, 0, 0.05]} material={lambert("#B8452E")}>
      <capsuleGeometry args={[0.06, 0.42, 4, 10]} />
    </mesh>
    <mesh position={[0.0, 0, 0.115]} material={lambert("#F2C230")} scale={[0.4, 1, 0.3]}>
      <capsuleGeometry args={[0.03, 0.3, 3, 6]} />
    </mesh>
  </group>
);

/** Mũi tên 3D từ `from` theo hướng `dir` (đã chuẩn hoá hoặc không), dài `len`. */
export const Arrow3: React.FC<{ from: V3; dir: V3; len: number; color: string; r?: number }> = ({ from, dir, len, color, r = 0.06 }) => {
  if (len <= 0.01) return null;
  const d = new THREE.Vector3(...dir).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  const head = Math.min(len * 0.45, r * 5);
  const m = lambert(color, { emissive: new THREE.Color(color).multiplyScalar(0.35) });
  return (
    <group position={from} quaternion={q}>
      <mesh position={[0, (len - head) / 2, 0]} material={m}>
        <cylinderGeometry args={[r, r, len - head, 10]} />
      </mesh>
      <mesh position={[0, len - head / 2, 0]} material={m}>
        <coneGeometry args={[r * 2.4, head, 12]} />
      </mesh>
    </group>
  );
};

/** Bụi tung lên khi vật chạm đất: `k` 0..1 từ lúc chạm. */
export const Puff: React.FC<{ p: V3; k: number; s?: number; color?: string }> = ({ p, k, s = 1, color = "#D9C9A3" }) => {
  if (k <= 0 || k >= 1) return null;
  const o = Math.round((1 - k) * 10) / 10;
  const m = lambert(color, { transparent: true, opacity: o });
  return (
    <group position={p} scale={s}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = (i / 7) * Math.PI * 2;
        const r = 0.15 + k * 0.6;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.1 + k * 0.25 + (i % 2) * 0.08, Math.sin(a) * r]} material={m}>
            <icosahedronGeometry args={[0.14 + k * 0.12, 0]} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ---------- Lớp phủ HTML ---------- */

/** Chữ số to trắng viền đậm kiểu video tài liệu. */
export const BigNum: React.FC<{ x: number; y: number; size?: number; k?: number; color?: string; children: React.ReactNode }> = ({ x, y, size = 96, k = 1, color = "#FFFFFF", children }) =>
  k <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${k})`,
        fontFamily: TEXT_FONT,
        fontWeight: 900,
        fontSize: size,
        color,
        WebkitTextStroke: `${size * 0.12}px #1E2630`,
        paintOrder: "stroke fill",
        whiteSpace: "nowrap",
        letterSpacing: 1,
        filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.35))",
      }}
    >
      {children}
    </div>
  );

/** Đồng hồ kim quay. */
export const Clock: React.FC<{ x: number; y: number; r?: number; turn: number; k?: number }> = ({ x, y, r = 56, turn, k = 1 }) =>
  k <= 0 ? null : (
    <svg style={{ position: "absolute", left: x - r - 8, top: y - r - 8, transform: `scale(${k})` }} width={2 * r + 16} height={2 * r + 16}>
      <g transform={`translate(${r + 8} ${r + 8})`}>
        <circle r={r} fill="#FFFFFF" stroke="#1E2630" strokeWidth={8} />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={0} y1={-r + 8} x2={0} y2={-r + (i % 3 === 0 ? 20 : 14)} stroke="#1E2630" strokeWidth={i % 3 === 0 ? 5 : 3} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke="#1E2630" strokeWidth={7} strokeLinecap="round" transform={`rotate(${turn * 30})`} />
        <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke="#D7372E" strokeWidth={4} strokeLinecap="round" transform={`rotate(${turn * 360})`} />
        <circle r={6} fill="#1E2630" />
      </g>
    </svg>
  );

/** Khung ngắm vệ tinh (góc vuông xanh + tâm). */
export const Reticle: React.FC<{ w: number; h: number; k: number; red?: number }> = ({ w, h, k, red = 0 }) => {
  const c = red > 0.5 ? "#FF4B3E" : "#7CFFB0";
  const m = 46;
  const L = 70;
  return (
    <svg style={{ position: "absolute", inset: 0, opacity: k }} width={w} height={h}>
      {[
        [m, m, 1, 1],
        [w - m, m, -1, 1],
        [m, h - m, 1, -1],
        [w - m, h - m, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path key={i} d={`M${x} ${y + sy * L} L${x} ${y} L${x + sx * L} ${y}`} fill="none" stroke={c} strokeWidth={6} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={m - 18} y1={h / 2 - 160 + i * 40} x2={m - 4} y2={h / 2 - 160 + i * 40} stroke={c} strokeWidth={3} opacity={0.7} />
      ))}
      <g transform={`translate(${w / 2} ${h / 2})`} stroke={c} strokeWidth={4} fill="none">
        <circle r={54 - red * 10} />
        <line x1={-90} y1={0} x2={-30} y2={0} />
        <line x1={30} y1={0} x2={90} y2={0} />
        <line x1={0} y1={-90} x2={0} y2={-30} />
        <line x1={0} y1={30} x2={0} y2={90} />
      </g>
    </svg>
  );
};

/** Dấu hỏi tròn đỏ nảy lên. */
export const Ask: React.FC<{ x: number; y: number; k: number; size?: number }> = ({ x, y, k, size = 92 }) =>
  k <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${k})`,
        fontFamily: TEXT_FONT,
        fontWeight: 900,
        fontSize: size,
        color: "#F05A3A",
        WebkitTextStroke: `${size * 0.1}px #FFFFFF`,
        paintOrder: "stroke fill",
        filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.3))",
      }}
    >
      ?
    </div>
  );
