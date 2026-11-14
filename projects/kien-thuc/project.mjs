/**
 * Phần riêng của series "Thiên Đường Kiến Thức" (`kien-thuc` / `kt`) cho CLI và Telegram Bot:
 * công thức 6 hồi (hook → barrier → eureka → theorem → realworld → cosmic).
 */
import { esc } from "../../tools/bot/telegram.mjs";

export { buildPublishKit } from "./publish.mjs";

/** Thứ tự và tên hiển thị của 6 hồi. */
export const beats = {
  hook: "BÀI TOÁN LỚN",
  barrier: "NGÕ CỤT",
  eureka: "EUREKA",
  theorem: "ĐỊNH LÝ SGK",
  realworld: "THỰC CHIẾN",
  cosmic: "VŨ TRỤ & KẾT",
};

export const headline = (episode) => episode.title;
export const teaserLabel = "Bài toán tiếp theo";

export const fields = (episode) => [
  { code: "hud", label: "Tiêu đề HUD", text: episode.hudTitle, key: "hudTitle" },
  { code: "sgk", label: "Liên hệ SGK", text: episode.textbook, key: "textbook" },
  { code: "thoi", label: "Bối cảnh lịch sử", text: episode.era, key: "era" },
  { code: "hoi", label: "Câu hỏi cuối video", text: episode.question, key: "question" },
];

export const isGenerated = () => false;
export const generatedNote = "";
export const stageStatus = () => "🎭 Có sân khấu Giấy cổ & Hình học + nhân vật Milo";

export const extraInfo = (episode) => [
  `<b>Bối cảnh:</b> ${esc(episode.era)}`,
  `<b>Sách giáo khoa:</b> ${esc(episode.textbook)}`,
  `<b>Nguồn (${episode.sources?.length ?? 0}):</b>`,
  ...(episode.sources ?? []).map((s) => `• <a href="${esc(s.url)}">${esc(s.title)}</a>`),
];

export const sheetInfo = (episode) => [
  `**Nguồn:** ${(episode.sources ?? []).map((s) => `[${s.title}](${s.url})`).join(" · ")}`,
];

export const validate = (episode) => {
  const errors = [];
  if (!episode.title?.trim()) errors.push("Thiếu tiêu đề tập (title).");
  if (!episode.textbook?.trim()) errors.push("Thiếu liên hệ Sách giáo khoa (textbook).");
  if (!episode.question?.trim()) errors.push("Thiếu câu hỏi cuối video (question).");
  return errors;
};

export const ai = {
  role:
    `Bạn là biên kịch kiêm đạo diễn hình học của series "Thiên Đường Kiến Thức": kể lại cách các nhà bác học cổ đại/cận đại ` +
    `giải quyết những bài toán vĩ đại bằng công cụ thô sơ, kết nối với định lý trong Sách giáo khoa Toán – Lý và mở rộng ra quy mô Vũ trụ. ` +
    `Dùng 1 giọng kể duy nhất (NARRATOR), trầm ấm, cuốn hút.`,
  rules: [
    `Không đổi day, week, theme. Giữ đủ các trường title, hudTitle, textbook, era, question, sources, hook, barrier, eureka, theorem, realworld, cosmic.`,
    `Mỗi câu thoại có text (hiển thị phụ đề ngắn gọn, dùng ký hiệu toán học chuẩn) và tts (viết thuần chữ tiếng Việt để AI đọc mượt không vấp số hay ký hiệu).`,
    `Thời lượng mục tiêu từ 110 đến 170 giây (dưới 180 giây để đăng được YouTube Shorts 3 phút, trên 60 giây cho TikTok).`,
  ],
  bible: "docs/series-bible.md",
  spec: "src/episodes/make.ts",
  extraDocs: [],
};
