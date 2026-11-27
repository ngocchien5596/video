/**
 * Đạo cụ vũ khí low-poly dựng theo hình dạng vật thật (thẻ đối tượng trong projects/kien-thuc/docs/dung-canh-3d.md):
 * - Bullet: đầu đạn súng ngắn (không có vỏ đạn) bọc đồng, thân trụ, mũi tròn kiểu ogive, đáy vát, rãnh viền.
 * - Pistol: súng ngắn kiểu M1911: khối trượt có rãnh, nòng, báng gỗ chéo, vòng cò, cò, đầu ngắm.
 * - Cannon: đại bác cổ nòng gang (đai gia cố, núm đuôi, miệng loe) trên giá gỗ hai bánh xe nan bọc sắt.
 * - Cannonball: quả đạn pháo gang đặc.
 * Vật liệu kim loại dùng MeshStandardMaterial để có độ bóng.
 */
import React from "react";
import * as THREE from "three";
import { lambert, type V3 } from "./kit3d.tsx";

const cache = new Map<string, unknown>();
const memo = <T,>(k: string, make: () => T): T => {
  if (!cache.has(k)) cache.set(k, make());
  return cache.get(k) as T;
};
/** Kim loại / vật liệu có độ bóng. */
export const metal = (color: string, metalness = 0.55, roughness = 0.32, emissive = "#000000") =>
  memo(`m:${color}:${metalness}:${roughness}:${emissive}`, () => new THREE.MeshStandardMaterial({ color, metalness, roughness, emissive }));
const glass = (color: string, opacity: number) =>
  memo(`g:${color}:${Math.round(opacity * 20)}`, () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: Math.round(opacity * 20) / 20, depthWrite: false }));

/* ---------- Viên đạn ---------- */

/** Mặt cắt đầu đạn (bán kính, chiều cao) với chiều dài 1, đường kính 0,72. */
const bulletGeo = () =>
  memo("bullet", () => {
    // .45 ACP mũi tròn: đường kính ≈ 0,62 chiều dài; thân trụ ≈ 45% chiều dài, có rãnh viền; mũi ogive thon dần.
    const R = 0.29;
    const pts: THREE.Vector2[] = [new THREE.Vector2(0, 0), new THREE.Vector2(R * 0.84, 0), new THREE.Vector2(R, 0.04)];
    pts.push(new THREE.Vector2(R, 0.3), new THREE.Vector2(R * 0.94, 0.32), new THREE.Vector2(R * 0.94, 0.36), new THREE.Vector2(R, 0.38), new THREE.Vector2(R, 0.54));
    for (let i = 1; i <= 16; i++) {
      const t = i / 16;
      const y = 0.54 + 0.46 * t;
      const r = R * Math.pow(Math.max(0, 1 - t * t), 0.55) * (1 - 0.12 * t);
      pts.push(new THREE.Vector2(i === 16 ? 0 : Math.max(r, 0.015), y));
    }
    const g = new THREE.LatheGeometry(pts, 28);
    g.computeVertexNormals();
    return g;
  });

/**
 * Đầu đạn dài `len`, mũi hướng `dir` (mặc định +x). `trail`: độ dài vệt khí phía sau.
 * `ghost`: vẽ mờ (ảnh chụp liên tiếp). `shadowY`: vẽ bóng tròn mờ trên mặt đất ở độ cao này.
 */
export const Bullet: React.FC<{ p: V3; len?: number; dir?: V3; trail?: number; ghost?: number; shadowY?: number }> = ({ p, len = 0.33, dir = [1, 0, 0], trail = 0, ghost, shadowY }) => {
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...dir).normalize());
  const mat = ghost !== undefined ? glass("#D98A52", ghost) : metal("#C9824F", 0.55, 0.3, "#2A1206");
  const h = shadowY === undefined ? 0 : p[1] - shadowY;
  return (
    <>
      <group position={p} quaternion={q}>
        <mesh geometry={bulletGeo()} material={mat} scale={len} position={[0, -len / 2, 0]} castShadow={ghost === undefined} />
        {trail > 0.01 ? (
          <mesh position={[0, -len / 2 - trail / 2, 0]} material={glass("#FFF1B8", 0.7)}>
            <cylinderGeometry args={[len * 0.3, 0.0, trail, 14, 1, true]} />
          </mesh>
        ) : null}
      </group>
      {shadowY !== undefined && h > -0.01 ? (
        <mesh position={[p[0], shadowY + 0.02, p[2]]} rotation={[-Math.PI / 2, 0, 0]} material={glass("#1E1A14", Math.max(0.12, 0.45 - h * 0.07))}>
          <circleGeometry args={[len * (0.5 + h * 0.05), 20]} />
        </mesh>
      ) : null}
    </>
  );
};

/* ---------- Súng ngắn ---------- */

/** Súng ngắn dài khoảng `len`, nòng hướng +x, báng chúc xuống −y. Gốc ở chỗ tay cầm (trên báng). */
export const Pistol: React.FC<{ len?: number; flash?: number }> = ({ len = 0.34, flash = 0 }) => {
  const s = len;
  const steel = metal("#3E444B", 0.6, 0.35);
  const dark = metal("#2A2E33", 0.5, 0.45);
  const wood = lambert("#7A4526");
  return (
    <group scale={s}>
      {/* khối trượt có rãnh, nòng, đầu ngắm */}
      <mesh position={[0.18, 0.12, 0]} material={steel} castShadow>
        <boxGeometry args={[0.92, 0.15, 0.1]} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-0.2 + i * 0.03, 0.12, 0.052]} material={dark}>
          <boxGeometry args={[0.012, 0.12, 0.004]} />
        </mesh>
      ))}
      <mesh position={[0.66, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} material={dark}>
        <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
      </mesh>
      <mesh position={[0.69, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} material={lambert("#0E0F10")}>
        <cylinderGeometry args={[0.022, 0.022, 0.01, 10]} />
      </mesh>
      <mesh position={[0.58, 0.21, 0]} material={dark}>
        <boxGeometry args={[0.03, 0.035, 0.02]} />
      </mesh>
      <mesh position={[-0.24, 0.21, 0]} material={dark}>
        <boxGeometry args={[0.05, 0.035, 0.07]} />
      </mesh>
      {/* khung dưới, vòng cò, cò */}
      <mesh position={[0.18, 0.02, 0]} material={dark}>
        <boxGeometry args={[0.8, 0.07, 0.085]} />
      </mesh>
      <mesh position={[0.06, -0.06, 0]} material={dark}>
        <torusGeometry args={[0.075, 0.012, 6, 16, Math.PI]} />
      </mesh>
      <mesh position={[0.04, -0.04, 0]} rotation={[0, 0, 0.3]} material={steel}>
        <boxGeometry args={[0.018, 0.07, 0.02]} />
      </mesh>
      {/* báng chéo có ốp gỗ */}
      <group position={[-0.14, -0.13, 0]} rotation={[0, 0, -0.22]}>
        <mesh material={dark} castShadow>
          <boxGeometry args={[0.17, 0.34, 0.08]} />
        </mesh>
        {[-1, 1].map((sd) => (
          <mesh key={sd} position={[0, 0.0, sd * 0.042]} material={wood}>
            <boxGeometry args={[0.14, 0.28, 0.01]} />
          </mesh>
        ))}
      </group>
      {flash > 0.01 ? (
        <group position={[0.8, 0.1, 0]} scale={flash}>
          <mesh material={memo("flash", () => new THREE.MeshBasicMaterial({ color: "#FFE27A", transparent: true, opacity: 0.95 }))}>
            <icosahedronGeometry args={[0.12, 0]} />
          </mesh>
          <mesh position={[0.1, 0, 0]} scale={[2.2, 0.6, 0.6]} material={memo("flash2", () => new THREE.MeshBasicMaterial({ color: "#FFB000", transparent: true, opacity: 0.8 }))}>
            <icosahedronGeometry args={[0.08, 0]} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
};

/** Hướng một vật dựng theo +x (nòng) / +y (lên) vào cánh tay người que (tay chỉ về −y cục bộ, +z cục bộ là phía trên). */
export const IN_HAND_Q = (() => {
  const m = new THREE.Matrix4().makeBasis(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(-1, 0, 0));
  return new THREE.Quaternion().setFromRotationMatrix(m);
})();

/* ---------- Đại bác và đạn pháo ---------- */

const barrelGeo = () =>
  memo("barrel", () => {
    const pts: [number, number][] = [
      [0, -0.08],
      [0.07, -0.07],
      [0.08, -0.03],
      [0.05, 0.0],
      [0.19, 0.02],
      [0.21, 0.06],
      [0.2, 0.12],
      [0.18, 0.14],
      [0.18, 0.4],
      [0.19, 0.42],
      [0.19, 0.48],
      [0.16, 0.5],
      [0.15, 1.05],
      [0.17, 1.1],
      [0.2, 1.18],
      [0.2, 1.24],
      [0.17, 1.26],
      [0.09, 1.26],
      [0.09, 1.0],
      [0, 1.0],
    ];
    const g = new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 28);
    g.computeVertexNormals();
    return g;
  });

/** Bánh xe gỗ có nan, vành bọc sắt, nằm trong mặt phẳng xy. */
const Wheel: React.FC<{ r: number }> = ({ r }) => (
  <group>
    <mesh material={metal("#3B3F44", 0.5, 0.45)}>
      <torusGeometry args={[r, r * 0.08, 8, 28]} />
    </mesh>
    <mesh material={lambert("#7A4E2A")}>
      <torusGeometry args={[r * 0.9, r * 0.07, 6, 28]} />
    </mesh>
    {Array.from({ length: 8 }, (_, i) => (
      <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]} material={lambert("#8C5A30")}>
        <boxGeometry args={[r * 1.8, r * 0.09, r * 0.09]} />
      </mesh>
    ))}
    <mesh rotation={[Math.PI / 2, 0, 0]} material={lambert("#6A4022")}>
      <cylinderGeometry args={[r * 0.18, r * 0.18, r * 0.35, 12]} />
    </mesh>
  </group>
);

/** Đại bác cổ, nòng hướng +x, nâng góc `elev` (radian). Cao khoảng 0,8·s. `smoke` 0..1 khói ở miệng nòng. */
export const Cannon: React.FC<{ p: V3; s?: number; elev?: number; smoke?: number; ry?: number }> = ({ p, s = 1, elev = 0.08, smoke = 0, ry = 0 }) => (
  <group position={p} scale={s} rotation={[0, ry, 0]}>
    {/* hai má giá gỗ */}
    {[-1, 1].map((sd) => (
      <mesh key={sd} position={[-0.15, 0.3, sd * 0.2]} castShadow material={lambert("#8C5A30")}>
        <boxGeometry args={[0.9, 0.22, 0.07]} />
      </mesh>
    ))}
    <mesh position={[-0.55, 0.12, 0]} rotation={[0, 0, 0.35]} castShadow material={lambert("#7A4E2A")}>
      <boxGeometry args={[0.6, 0.1, 0.36]} />
    </mesh>
    <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal("#3B3F44", 0.5, 0.45)}>
      <cylinderGeometry args={[0.035, 0.035, 0.62, 8]} />
    </mesh>
    {[-1, 1].map((sd) => (
      <group key={`w${sd}`} position={[0, 0.3, sd * 0.29]}>
        <Wheel r={0.3} />
      </group>
    ))}
    {/* nòng gang */}
    <group position={[0.0, 0.46, 0]} rotation={[0, 0, -Math.PI / 2 + elev]}>
      <mesh geometry={barrelGeo()} material={metal("#2F3439", 0.65, 0.38)} castShadow position={[0, -0.45, 0]} />
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal("#2F3439", 0.65, 0.38)}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 10]} />
      </mesh>
    </group>
    {smoke > 0 && smoke < 1 ? (
      <group position={[0.85 + smoke * 0.6, 0.5 + smoke * 0.25, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[i * 0.12 * smoke, Math.sin(i * 2.1) * 0.1, Math.cos(i * 1.7) * 0.1]} material={glass("#F2F2F2", (1 - smoke) * 0.85)}>
            <icosahedronGeometry args={[0.12 + smoke * 0.25, 1]} />
          </mesh>
        ))}
      </group>
    ) : null}
  </group>
);

/** Quả đạn pháo gang đặc. */
export const Cannonball: React.FC<{ p: V3; r?: number }> = ({ p, r = 0.12 }) => (
  <mesh position={p} material={metal("#2B2F33", 0.7, 0.3)} castShadow>
    <sphereGeometry args={[r, 20, 14]} />
  </mesh>
);
