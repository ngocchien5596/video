import React from "react";
import { useVideoConfig } from "remotion";
import { PaperRibbon, QuestionMark, SealTag, WarmPlaylist, WoodSign } from "../../../engine/components/warm-art.tsx";

/** Tên series: "NÓI VẬY MÀ KHÔNG" trên biển gỗ, "PHẢI VẬY!" đóng dấu son. */
const Title: React.FC<{ size: number; wide: boolean }> = ({ size, wide }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-start" : "center", gap: size * 0.12 }}>
    <WoodSign size={size * 0.62} rotate={-2}>
      NÓI VẬY
      <br />
      MÀ KHÔNG
    </WoodSign>
    <div style={{ marginLeft: wide ? size * 0.6 : 0 }}>
      <SealTag size={size * 0.62} rotate={-5}>
        PHẢI VẬY!
      </SealTag>
    </div>
  </div>
);

/**
 * Ảnh bìa playlist của cả series.
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
      tagline={<PaperRibbon size={wide ? 30 : width * 0.034}>Series hiểu đúng thành ngữ mỗi ngày</PaperRibbon>}
      cd={{ expr: "smug", arms: "raise", hand: "fan", tilt: -4, talk: 0.6 }}
      tc={{ expr: "confused", arms: "hold2", hand: { id: "book", text: "THÀNH NGỮ" }, tilt: 6, talk: 0.3 }}
      extra={({ tcX, top, s }) => <QuestionMark x={tcX + (wide ? 95 : 120) * s} y={top + 70 * s} size={(wide ? 120 : 150) * s} />}
    />
  );
};
