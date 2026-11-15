import React from "react";
import { useVideoConfig } from "remotion";
import { MainCard, PaperRibbon, QuestionMark, WarmPlaylist, WoodSign } from "../../../engine/components/warm-art.tsx";

/** Tên series: "ÔNG ƠI," trên biển gỗ, "VÌ SAO?" trên thẻ vàng nghệ. */
const Title: React.FC<{ size: number; wide: boolean }> = ({ size, wide }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-start" : "center", gap: size * 0.1 }}>
    <WoodSign size={size * 0.6} rotate={-2}>
      ÔNG ƠI,
    </WoodSign>
    <MainCard size={size * 1.05} rotate={-3} style={{ marginLeft: wide ? size * 0.3 : 0 }}>
      VÌ SAO?
    </MainCard>
  </div>
);

/**
 * Ảnh bìa playlist của series "Ông Ơi, Vì Sao?".
 * Khung ngang (1280×720, YouTube) xếp chữ bên trái, nhân vật bên phải; khung vuông xếp chữ ở trên, nhân vật ở dưới.
 */
export const PlaylistCover: React.FC = () => {
  const { width, height } = useVideoConfig();
  const wide = width > height;
  return (
    <WarmPlaylist
      width={width}
      height={height}
      title={(size) => <Title size={size} wide={wide} />}
      tagline={<PaperRibbon size={wide ? 30 : width * 0.034}>Hỏi tưởng dễ, đáp cho đúng</PaperRibbon>}
      cd={{ expr: "happy", arms: "raise", hand: "magnifier", tilt: -4, talk: 0.6 }}
      tc={{ expr: "confused", arms: "raise", tilt: 6, talk: 0.5 }}
      extra={({ tcX, top, s }) => (
        <>
          <QuestionMark x={tcX + (wide ? 95 : 130) * s} y={top + 80 * s} size={(wide ? 120 : 150) * s} />
          {wide ? null : <QuestionMark x={tcX - 10 * s} y={top - 10 * s} size={90 * s} rotate={-14} color="#F6E9CF" />}
        </>
      )}
    />
  );
};
