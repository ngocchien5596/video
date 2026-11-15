/**
 * Ảnh nhận diện của kênh "Lớp Học Cụ Đồ" (chứa mọi series): ảnh đại diện và ảnh bìa kênh YouTube.
 * Đổi tên kênh / dòng giới thiệu ở CHANNEL_NAME, CHANNEL_TAGLINE rồi xuất lại.
 *
 *   npx remotion still src/index.ts Kenh-AnhDaiDien out/kenh/anh-dai-dien.png
 *   npx remotion still src/index.ts Kenh-BiaYouTube out/kenh/bia-youtube.png
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { Doll, PaperRibbon, PUPPET_H, PUPPET_W, QuestionMark, type DollLook, WoodSign } from "../engine/components/warm-art.tsx";
import { WARM, warmOutline } from "../engine/components/warm.ts";
import { Bamboo, BrickYard, Cloud, DistantTrees, Jar, PotPlant, Tree, VillageHouse, WarmDefs, WarmSky } from "../engine/stage/village.tsx";

export const CHANNEL_NAME = ["LỚP HỌC", "CỤ ĐỒ"];
export const CHANNEL_TAGLINE = "Mỗi ngày hiểu đúng thêm một điều";

const CD_LOOK: DollLook = { expr: "smug", arms: "raise", hand: "fan", tilt: -4, talk: 0.4 };
const TC_LOOK: DollLook = { expr: "confused", arms: "hold2", hand: { id: "book", text: "VỞ GHI" }, tilt: 6, talk: 0.4 };

/** Nắng chiều toả từ tâm (nền ảnh đại diện / hình mờ). */
const SUN_BG = `radial-gradient(circle at 50% 42%, #FFF3D2 0%, ${WARM.turmericLight} 38%, ${WARM.turmeric} 66%, #B8763A 100%)`;

/** Tia nắng mờ toả từ tâm. */
const Rays: React.FC<{ cx: number; cy: number; r: number; rays?: number }> = ({ cx, cy, r, rays = 20 }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: rays }, (_, i) => {
      const a = (i * Math.PI * 2) / rays;
      const b = a + Math.PI / rays;
      return <path key={i} d={`M0 0 L${Math.cos(a) * r} ${Math.sin(a) * r} L${Math.cos(b) * r} ${Math.sin(b) * r} Z`} fill="#FFF8E6" opacity="0.18" />;
    })}
  </g>
);

/**
 * Ảnh đại diện 800×800. Nền tảng cắt thành hình tròn và hiện rất nhỏ (cỡ 40px),
 * nên chỉ có hai khuôn mặt to trên nền nắng vàng nghệ, không chữ; mọi thứ quan trọng nằm trong vòng tròn giữa.
 */
export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{ background: SUN_BG }}>
    <svg viewBox="0 0 800 800" width="100%" height="100%">
      <Rays cx={400} cy={340} r={700} />
      {/* Hai con rối phóng to, chỉ thấy đầu và vai */}
      <g transform={`translate(${400 - PUPPET_W * 1.45 + 95} 175) scale(1.45)`}>
        <Doll who="CD" look={{ ...CD_LOOK, arms: "down", hand: null, talk: 0.5 }} shadow={false} />
      </g>
      <g transform={`translate(${400 - 75} 215) scale(1.45)`}>
        <Doll who="TC" look={{ ...TC_LOOK, arms: "down", hand: null, talk: 0.3 }} mirrored shadow={false} />
      </g>
      <QuestionMark x={615} y={250} size={160} />
    </svg>
  </AbsoluteFill>
);

/**
 * Hình mờ video YouTube (Tuỳ chỉnh > Thương hiệu > Hình mờ video): 150×150, PNG nền trong suốt, tối đa 1 MB.
 * Hiện nhỏ ở góc phải dưới khung phát, rê chuột vào thì hiện nút Đăng ký. Chỉ có mặt Cụ Đồ trên tròn vàng nghệ, không chữ.
 */
export const ChannelWatermark: React.FC = () => (
  <AbsoluteFill>
    <svg viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <clipPath id="wm-circle">
          <circle cx="150" cy="150" r="138" />
        </clipPath>
        <radialGradient id="wm-sun" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#FFF3D2" />
          <stop offset="0.55" stopColor={WARM.turmericLight} />
          <stop offset="1" stopColor={WARM.turmeric} />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="138" fill="url(#wm-sun)" />
      <g clipPath="url(#wm-circle)">
        <g transform={`translate(${150 - (PUPPET_W * 0.8) / 2} -22) scale(0.8)`}>
          <Doll who="CD" look={{ ...CD_LOOK, arms: "down", hand: null, talk: 0.5 }} shadow={false} />
        </g>
      </g>
      <circle cx="150" cy="150" r="138" fill="none" stroke={WARM.ink} strokeWidth="12" />
    </svg>
  </AbsoluteFill>
);

/** Vùng an toàn của ảnh bìa YouTube 2560×1440: chỉ phần giữa 1546×423 hiện trên mọi thiết bị. */
const SAFE_BANNER = { w: 1546, h: 423 };
/** Mép trên sân gạch trên ảnh bìa: ngay mép dưới vùng an toàn. */
const GROUND = (1440 + 423) / 2;

/**
 * Ảnh bìa kênh YouTube 2560×1440: nền là sân nhà ngói của Cụ Đồ, tên kênh trên biển gỗ ở giữa,
 * hai nhân vật hai bên; tên kênh và hai nhân vật nằm trọn trong vùng an toàn 1546×423 (điện thoại chỉ hiện phần này).
 */
export const ChannelBanner: React.FC = () => {
  const top = (1440 - SAFE_BANNER.h) / 2;
  const left = (2560 - SAFE_BANNER.w) / 2;
  const s = (SAFE_BANNER.h - 6) / PUPPET_H;
  return (
    <AbsoluteFill style={{ backgroundColor: WARM.paper }}>
      {/* Sân nhà ngói vẽ bằng bộ vẽ làng quê của sân khấu: nhà ba gian rộng bằng vùng an toàn, thềm nhà ngay mép dưới
          vùng an toàn; trời, rặng cây xa và sân gạch kéo ngang hết khổ 2560. */}
      <svg viewBox="0 0 2560 1440" width="100%" height="100%" style={{ position: "absolute" }}>
        <WarmDefs />
        <g transform={`scale(${2560 / 1080} 1)`}>
          <WarmSky id="banner-sky" h={GROUND} sun={[-999, -999]} />
          <DistantTrees y={GROUND - 330} />
          <BrickYard yTop={GROUND} horizon={GROUND - 420} />
        </g>
        <Cloud x={420} y={150} s={1.6} />
        <Cloud x={2150} y={120} s={1.3} />
        <Bamboo x={420} y={GROUND + 10} s={1.25} />
        <Bamboo x={2150} y={GROUND + 10} s={1.25} flip />
        <Tree x={170} y={GROUND + 40} s={1.5} />
        <Tree x={2400} y={GROUND + 40} s={1.4} flip />
        <VillageHouse x={1280} y={GROUND} s={1.5} />
        <PotPlant x={480} y={GROUND + 60} s={1.1} />
        <PotPlant x={2090} y={GROUND + 60} s={1.1} kind="palm" />
        <Jar x={2290} y={GROUND + 90} s={1.1} />
      </svg>
      {/* Dải nắng kem giữa khung cho chữ và nhân vật nổi lên */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(251,241,220,0) 22%, rgba(251,241,220,0.4) ${(top / 1440) * 100 + 4}%, rgba(251,241,220,0.4) ${((top + SAFE_BANNER.h) / 1440) * 100 - 4}%, rgba(251,241,220,0) 82%)`,
        }}
      />
      <svg viewBox="0 0 2560 1440" width="100%" height="100%" style={{ position: "absolute" }}>
        <g transform={`translate(${left} ${top}) scale(${s})`}>
          <Doll who="CD" look={CD_LOOK} />
        </g>
        <g transform={`translate(${left + SAFE_BANNER.w - PUPPET_W * s} ${top}) scale(${s})`}>
          <Doll who="TC" look={TC_LOOK} mirrored />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top,
          height: SAFE_BANNER.h,
          left: left + PUPPET_W * s,
          right: left + PUPPET_W * s,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 14,
        }}
      >
        <WoodSign size={114} rotate={-2}>
          <span style={{ fontSize: 68, letterSpacing: 8 }}>{CHANNEL_NAME[0]}</span>
          <br />
          <span style={{ color: WARM.turmericLight, ...warmOutline(10) }}>{CHANNEL_NAME[1]}</span>
        </WoodSign>
        <PaperRibbon size={40} rotate={1.5}>
          {CHANNEL_TAGLINE}
        </PaperRibbon>
      </div>
    </AbsoluteFill>
  );
};
