/**
 * Mảnh ghép dùng chung cho ảnh bìa tập, ảnh bìa playlist và ảnh kênh của ba series sân khấu, phong cách tranh dân gian
 * ấm (đồng bộ với phông sân khấu engine/stage và thẻ chữ engine/components/warm.ts): phông cảnh làng cắt khung,
 * con rối đứng tạo dáng, biển gỗ tên series, dấu son số tập, thẻ vàng nghệ cho câu chính.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import type { Expr, PropRef, SceneId } from "../lib/stage-types.ts";
import { Puppet, PUPPET_H, PUPPET_W } from "../stage/Character.tsx";
import { ARM_POSES } from "../stage/poses.ts";
import { SceneBackground } from "../stage/scenes.tsx";
import { TEXT_FONT } from "./brand.ts";
import { HEAD_FONT, paperCard, plaque, sealStamp, turmericCard, WARM, warmOutline } from "./warm.ts";

export { PUPPET_H, PUPPET_W };

/** Dáng đứng của một con rối trên ảnh tĩnh. */
export type DollLook = { expr: Expr; arms: keyof typeof ARM_POSES; hand?: PropRef | null; head?: PropRef | null; tilt?: number; talk?: number };

/** Con rối đứng yên (khung PUPPET_W × PUPPET_H, đáy là mặt sàn), kèm bóng mềm dưới chân. */
export const Doll: React.FC<{ who: "CD" | "TC"; look: DollLook; mirrored?: boolean; shadow?: boolean }> = ({ who, look, mirrored = false, shadow = true }) => (
  <>
    {shadow ? <ellipse cx={PUPPET_W / 2} cy={PUPPET_H - 12} rx={who === "CD" ? 150 : 130} ry="20" fill={WARM.ink} opacity="0.28" /> : null}
    <Puppet
      who={who}
      expr={look.expr}
      arms={ARM_POSES[look.arms]}
      hand={look.hand ?? null}
      head={look.head ?? null}
      face={null}
      back={null}
      talk={look.talk ?? 0.35}
      blink={false}
      legSwing={0}
      headTilt={look.tilt ?? 0}
      mirrored={mirrored}
    />
  </>
);

/**
 * Phông cảnh sân khấu (khung gốc 1080×1920) cắt theo `view` [x, y, w, h], phủ kín khung chứa.
 * `children` vẽ chồng lên theo toạ độ của cảnh (ví dụ con rối đứng trên mặt sàn FLOOR = 1240).
 * `veil`: phủ một lớp kem mờ cho chữ nổi hơn (0..1).
 */
export const SceneLayer: React.FC<{ scene: SceneId; view: [number, number, number, number]; veil?: number; children?: React.ReactNode }> = ({
  scene,
  view,
  veil = 0,
  children,
}) => (
  <svg viewBox={view.join(" ")} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
    <SceneBackground id={scene} />
    {veil > 0 ? <rect x="0" y="0" width="1080" height="1920" fill={WARM.paper} opacity={veil} /> : null}
    {children}
  </svg>
);

/** Ánh nắng chiều ấm phủ trên / dưới khung (gradient), làm nền cho chữ. */
export const Glow: React.FC<{ from?: "top" | "bottom" | "left"; strength?: number; reach?: string }> = ({ from = "top", strength = 0.85, reach = "45%" }) => {
  const dir = from === "top" ? "180deg" : from === "bottom" ? "0deg" : "90deg";
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${dir}, rgba(251,241,220,${strength}) 0%, rgba(251,241,220,${strength * 0.6}) calc(${reach} * 0.6), rgba(251,241,220,0) ${reach})`,
      }}
    />
  );
};

/** Biển gỗ treo (như biển tên trong bản thiết kế nhân vật): ván gỗ viền nâu, chữ kem viền nâu. */
export const WoodSign: React.FC<{ children: React.ReactNode; size: number; rotate?: number; style?: React.CSSProperties }> = ({
  children,
  size,
  rotate = -1.5,
  style,
}) => (
  <div
    style={{
      display: "inline-block",
      position: "relative",
      padding: `${size * 0.22}px ${size * 0.55}px ${size * 0.12}px`,
      background: "linear-gradient(180deg, #C08A55 0%, #9A6236 45%, #7B4B28 100%)",
      border: `${Math.max(4, size * 0.09)}px solid ${WARM.ink}`,
      borderRadius: size * 0.28,
      boxShadow: `inset 0 ${size * 0.06}px 0 rgba(255,226,170,0.45), inset 0 -${size * 0.07}px 0 rgba(58,36,22,0.35), 0 ${size * 0.1}px 0 ${WARM.woodDark}, 0 ${size * 0.18}px ${size * 0.4}px rgba(58,36,22,0.35)`,
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.12,
      color: WARM.cream,
      rotate: `${rotate}deg`,
      ...warmOutline(size * 0.1),
      ...style,
    }}
  >
    {/* Vân gỗ */}
    <div
      style={{
        position: "absolute",
        inset: size * 0.12,
        borderRadius: size * 0.18,
        border: `${Math.max(2, size * 0.035)}px solid rgba(58,36,22,0.25)`,
        pointerEvents: "none",
      }}
    />
    {children}
  </div>
);

/** Dấu son số tập (ví dụ "#1"). */
export const SealTag: React.FC<{ children: React.ReactNode; size: number; rotate?: number }> = ({ children, size, rotate = -6 }) => (
  <div
    style={{
      ...sealStamp(Math.max(5, size * 0.1), size * 0.2),
      display: "inline-block",
      padding: `${size * 0.12}px ${size * 0.32}px 0`,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.1,
      rotate: `${rotate}deg`,
    }}
  >
    {children}
  </div>
);

/** Thẻ vàng nghệ cho câu chính (thành ngữ, câu hỏi, tên chỗ lạ). */
export const MainCard: React.FC<{ children: React.ReactNode; size: number; rotate?: number; style?: React.CSSProperties }> = ({
  children,
  size,
  rotate = 1.5,
  style,
}) => (
  <div
    style={{
      ...turmericCard(Math.max(5, size * 0.08), size * 0.26),
      padding: `${size * 0.2}px ${size * 0.3}px ${size * 0.12}px`,
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.1,
      rotate: `${rotate}deg`,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Dải giấy dó ghi một câu ngắn (khẩu hiệu). */
export const PaperRibbon: React.FC<{ children: React.ReactNode; size: number; rotate?: number }> = ({ children, size, rotate = -1 }) => (
  <div
    style={{
      ...paperCard(Math.max(4, size * 0.1), size * 0.4),
      display: "inline-block",
      padding: `${size * 0.3}px ${size * 0.7}px`,
      fontFamily: TEXT_FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.25,
      rotate: `${rotate}deg`,
    }}
  >
    {children}
  </div>
);

/** Nhãn nhỏ đỏ son / gỗ (ví dụ "📍 Đà Lạt"). */
export const Tag: React.FC<{ children: React.ReactNode; size: number; fill?: string; rotate?: number }> = ({ children, size, fill = WARM.son, rotate = -2 }) => (
  <div
    style={{
      ...plaque(fill, Math.max(4, size * 0.1), size * 0.3),
      display: "inline-block",
      padding: `${size * 0.1}px ${size * 0.5}px 0`,
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.3,
      rotate: `${rotate}deg`,
    }}
  >
    {children}
  </div>
);

/**
 * Ảnh bìa tập 1080×1920 dùng chung: phông cảnh của series, biển gỗ tên series + dấu son số tập ở trên,
 * câu chính trên thẻ vàng nghệ, khẩu hiệu trên dải giấy, Cụ Đồ và Thằng Cháu đứng ở nửa dưới.
 * Chữ quan trọng nằm trong khung 3:4 ở giữa (y 240–1680) để lưới hồ sơ TikTok cắt vẫn đọc được.
 */
export const WarmCover: React.FC<{
  scene: SceneId;
  series: string;
  day: number;
  title: string;
  tagline: string;
  /** Nhãn nhỏ trên câu chính (ví dụ địa danh). */
  tag?: string;
  cd: DollLook;
  tc: DollLook;
}> = ({ scene, series, day, title, tagline, tag, cd, tc }) => {
  const titleSize = title.length > 30 ? 84 : title.length > 18 ? 96 : 112;
  const S = 1.42;
  const FEET = 1730;
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.paper }}>
      <SceneLayer scene={scene} view={[0, 0, 1080, 1920]} />
      <Glow from="top" strength={0.8} reach="50%" />
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(${300 - (PUPPET_W * S) / 2} ${FEET - PUPPET_H * S}) scale(${S})`}>
          <Doll who="CD" look={cd} />
        </g>
        <g transform={`translate(${790 - (PUPPET_W * S) / 2} ${FEET - PUPPET_H * S}) scale(${S})`}>
          <Doll who="TC" look={tc} mirrored />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 26,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <WoodSign size={46}>{series}</WoodSign>
          <SealTag size={58}>#{day}</SealTag>
        </div>
        {tag ? <Tag size={46}>{tag}</Tag> : null}
        <MainCard size={titleSize} style={{ marginTop: tag ? -6 : 10 }}>
          {title}
        </MainCard>
        <PaperRibbon size={44}>{tagline}</PaperRibbon>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Ảnh bìa playlist dùng chung. Khung ngang (1280×720) xếp chữ bên trái, hai ông cháu bên phải trước sân nhà;
 * khung vuông / dọc xếp chữ ở trên, hai ông cháu ở dưới. `title(size)` vẽ tên series theo cỡ chữ gốc.
 */
export const WarmPlaylist: React.FC<{
  width: number;
  height: number;
  scene?: SceneId;
  title: (size: number) => React.ReactNode;
  tagline: React.ReactNode;
  cd: DollLook;
  tc: DollLook;
  /** Vẽ thêm theo toạ độ cảnh (ví dụ dấu hỏi trên đầu Cháu). Tâm hai con rối: cdX, tcX; đỉnh đầu: top. */
  extra?: (at: { cdX: number; tcX: number; top: number; s: number }) => React.ReactNode;
}> = ({ width, height, scene = "yard", title, tagline, cd, tc, extra }) => {
  const wide = width > height;
  // Toạ độ trong cảnh 1080×1920: mặt sàn FLOOR = 1240, con rối đứng gần máy hơn một chút (chân thấp hơn sàn).
  const view: [number, number, number, number] = wide ? [0, 650, 1080, 607] : [0, 420, 1080, (1080 * height) / width];
  const s = wide ? 0.86 : 1.0;
  const feet = wide ? 1236 : 420 + (1080 * height) / width - 26;
  const cdX = wide ? 700 : 330;
  const tcX = wide ? 935 : 770;
  const top = feet - PUPPET_H * s;
  const k = width / 1280;
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.paper }}>
      <SceneLayer scene={scene} view={view}>
        <g transform={`translate(${cdX - (PUPPET_W * s) / 2} ${top}) scale(${s})`}>
          <Doll who="CD" look={cd} />
        </g>
        <g transform={`translate(${tcX - (PUPPET_W * s) / 2} ${top}) scale(${s})`}>
          <Doll who="TC" look={tc} mirrored />
        </g>
        {extra?.({ cdX, tcX, top, s })}
      </SceneLayer>
      {wide ? (
        <>
          <Glow from="left" strength={0.92} reach="62%" />
          <div
            style={{
              position: "absolute",
              left: 56 * k,
              top: 0,
              bottom: 0,
              width: "54%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 30 * k,
            }}
          >
            {title(118 * k)}
            {tagline}
          </div>
        </>
      ) : (
        <>
          <Glow from="top" strength={0.9} reach="52%" />
          <div
            style={{
              position: "absolute",
              top: height * 0.045,
              left: 40,
              right: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: height * 0.022,
            }}
          >
            {title(width * 0.105)}
            {tagline}
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};

/** Dấu hỏi vẽ trong SVG (chữ tròn, viền nâu). */
export const QuestionMark: React.FC<{ x: number; y: number; size: number; rotate?: number; color?: string }> = ({ x, y, size, rotate = 12, color = WARM.turmericLight }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontFamily={HEAD_FONT}
    fontWeight={800}
    fontSize={size}
    fill={color}
    stroke={WARM.ink}
    strokeWidth={size / 10}
    strokeLinejoin="round"
    paintOrder="stroke"
    transform={`rotate(${rotate} ${x} ${y})`}
  >
    ?
  </text>
);
