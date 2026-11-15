/**
 * Nhận diện chữ / thẻ chữ phong cách tranh dân gian Việt hiện đại, ấm áp (đồng bộ với sân khấu engine/stage/village.tsx
 * và bản thiết kế nhân vật projects/CD_TC.png): giấy dó kem, gỗ nâu, viền nâu đậm, vàng nghệ, đỏ son, men lam.
 * Dùng cho thẻ chữ của ba series sân khấu (Nói vậy, Vì sao, Chỗ lạ), ảnh bìa và ảnh kênh.
 * Series Kiến thức (engine/parchment) có bộ riêng, không dùng file này.
 */
import type React from "react";
import { loadFont as loadBaloo } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadBarlowCondensed } from "@remotion/google-fonts/BarlowCondensed";

/** Chữ tiêu đề: tròn, đậm, ấm, đủ dấu tiếng Việt, đọc rõ trên điện thoại. */
export const HEAD_FONT = loadBaloo("normal", {
  weights: ["800"],
  subsets: ["latin", "vietnamese"],
}).fontFamily;

/** Chữ tiêu đề hẹp (tiêu đề tập trên thanh trên cùng): đậm, to mà vẫn vừa một dòng với câu hỏi dài. */
export const BAR_FONT = loadBarlowCondensed("normal", {
  weights: ["800"],
  subsets: ["latin", "vietnamese"],
}).fontFamily;

export const WARM = {
  /** Viền / chữ: nâu đen ấm (trùng LINE của sân khấu). */
  ink: "#3A2416",
  /** Giấy dó. */
  paper: "#FBF1DC",
  paperDeep: "#EED9AE",
  /** Chữ sáng trên nền tối / viền nâu. */
  cream: "#FFF7E6",
  turmeric: "#E3A631",
  turmericLight: "#F6CB5E",
  /** Đỏ son (con dấu, nhãn nhấn mạnh). */
  son: "#B8382A",
  sonDark: "#8A2C22",
  wood: "#9A6236",
  woodDark: "#5E3A20",
  /** Xanh men lam (nhãn "hiểu lầm"). */
  glaze: "#2F5D9A",
  /** Xanh lá dịu (nhãn "tóm lại"). */
  leaf: "#4E7A3A",
};

/** Viền chữ nâu (chữ sáng trên nền bất kỳ). */
export const warmOutline = (px: number, color = WARM.ink) => ({
  paintOrder: "stroke fill" as const,
  WebkitTextStroke: `${px}px ${color}`,
});

/** Bóng đổ của thẻ: gờ gỗ đậm bên dưới + bóng mềm. */
const lift = (px: number) => `0 ${px}px 0 ${WARM.woodDark}, 0 ${px + 8}px ${px * 3}px rgba(58,36,22,0.38)`;

/** Thẻ giấy dó: nền kem loang, viền nâu, đường chỉ trong mảnh, gờ gỗ bên dưới. */
export const paperCard = (border = 6, radius = 24): React.CSSProperties => ({
  background: `linear-gradient(165deg, #FFF9EC 0%, ${WARM.paper} 55%, ${WARM.paperDeep} 100%)`,
  border: `${border}px solid ${WARM.ink}`,
  borderRadius: radius,
  boxShadow: `inset 0 0 0 6px rgba(255,249,236,0.9), inset 0 0 0 9px rgba(192,138,85,0.55), ${lift(7)}`,
  color: WARM.ink,
});

/** Thẻ vàng nghệ (câu chính, con số to). */
export const turmericCard = (border = 7, radius = 24): React.CSSProperties => ({
  background: `linear-gradient(180deg, ${WARM.turmericLight} 0%, ${WARM.turmeric} 100%)`,
  border: `${border}px solid ${WARM.ink}`,
  borderRadius: radius,
  boxShadow: `inset 0 4px 0 rgba(255,240,190,0.75), inset 0 -5px 0 rgba(150,90,20,0.3), ${lift(7)}`,
  color: WARM.ink,
});

/** Nhãn / biển gỗ nhỏ, chữ kem. `fill` đổi màu nền (đỏ son, men lam, xanh lá...). */
export const plaque = (fill: string = WARM.wood, border = 5, radius = 14): React.CSSProperties => ({
  background: `linear-gradient(180deg, color-mix(in srgb, ${fill} 82%, #FFFFFF) 0%, ${fill} 55%, color-mix(in srgb, ${fill} 80%, #000000) 100%)`,
  border: `${border}px solid ${WARM.ink}`,
  borderRadius: radius,
  boxShadow: `inset 0 3px 0 rgba(255,255,255,0.25), 0 5px 0 rgba(58,36,22,0.55)`,
  color: WARM.cream,
});

/** Con dấu đỏ son kiểu ấn triện: viền đôi, nền giấy, chữ son. */
export const sealStamp = (border = 9, radius = 14): React.CSSProperties => ({
  border: `${border}px solid ${WARM.son}`,
  borderRadius: radius,
  backgroundColor: "rgba(255,247,230,0.94)",
  boxShadow: `inset 0 0 0 5px rgba(255,247,230,0.94), inset 0 0 0 ${5 + Math.round(border / 2)}px ${WARM.son}, 0 6px 16px rgba(58,36,22,0.3)`,
  color: WARM.son,
  fontFamily: HEAD_FONT,
});
