/** Nhận diện riêng của series "Đoán Xem Là Ai" (docs/series-bible.md, mục 2). */
import { loadFont as loadNotoSerif } from "@remotion/google-fonts/NotoSerif";

export const PROJECT_ID = "doan-xem";
export const SERIES_NAME = "ĐOÁN XEM LÀ AI";

/** Font có chân: tên nhân vật, tên series. Phụ đề dùng TEXT_FONT (không chân) của engine. */
export const NAME_FONT = loadNotoSerif("normal", { weights: ["700", "900"], subsets: ["latin", "vietnamese"] }).fontFamily;

/** Bảng màu chung: giấy dó, mực, son. Màu nhấn lấy theo từng tập (episode.accent). */
export const INK = {
  paper: "#EFE4CC",
  paperDeep: "#E2D3B3",
  stain: "#C9B48A",
  ink: "#1E1A16",
  inkSoft: "#4A433B",
  wash: "#8C8272",
  cinnabar: "#B8322A",
  roller: "#5A3A22",
} as const;
