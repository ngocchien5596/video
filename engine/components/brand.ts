import { loadFont as loadBangers } from "@remotion/google-fonts/Bangers";
import { loadFont as loadBeVietnam } from "@remotion/google-fonts/BeVietnamPro";
import type { BeatKind, Speaker } from "../lib/types.ts";

export const TITLE_FONT = loadBangers("normal", {
  weights: ["400"],
  subsets: ["latin", "vietnamese"],
}).fontFamily;

export const TEXT_FONT = loadBeVietnam("normal", {
  weights: ["700", "900"],
  subsets: ["latin", "vietnamese"],
}).fontFamily;

export const COLORS = {
  ink: "#14121F",
  idiom: "#FFD93D",
  paper: "#FFF8E7",
  red: "#E5484D",
  white: "#FFFFFF",
};

export const SPEAKERS: Record<Speaker, { name: string; color: string }> = {
  CD: { name: "CỤ ĐỒ", color: "#FFD93D" },
  TC: { name: "THẰNG CHÁU", color: "#7FE3FF" },
  NARRATOR: { name: "", color: "#FFFFFF" },
};

/** Màu nền animatic theo từng nhịp (nhịp lạ dùng màu mặc định). */
export const DEFAULT_BEAT_STYLE = { label: "", bg: ["#3B1F6B", "#14121F"] as [string, string] };
export const BEAT_STYLE: Record<BeatKind, { label: string; bg: [string, string] }> = {
  hook: { label: "HOOK", bg: ["#3B1F6B", "#14121F"] },
  title: { label: "ĐẶT CÂU", bg: ["#6B3A1F", "#14121F"] },
  misread: { label: "HIỂU SAI", bg: ["#1F4B6B", "#14121F"] },
  flip: { label: "LẬT NGHĨA", bg: ["#6B1F2A", "#14121F"] },
  example: { label: "VÍ DỤ", bg: ["#1F6B44", "#14121F"] },
  punchline: { label: "PUNCHLINE", bg: ["#6B5A1F", "#14121F"] },
};

/**
 * Vùng an toàn trên khung 1080×1920: tránh thanh trên, cột nút bên phải
 * và phần caption phía dưới của TikTok / YouTube Shorts.
 */
export const SAFE = {
  top: 170,
  bottom: 1480,
  left: 70,
  right: 170,
};

export const outline = (px: number, color = COLORS.ink) => ({
  paintOrder: "stroke fill" as const,
  WebkitTextStroke: `${px}px ${color}`,
});
