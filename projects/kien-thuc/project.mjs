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
  theorem: "NGUYÊN LÝ",
  realworld: "THỰC CHIẾN",
  cosmic: "VŨ TRỤ & KẾT",
};

export const headline = (episode) => episode.title;
export const teaserLabel = "Tiếp theo";

export const fields = (episode) => [
  { code: "hud", label: "Tiêu đề HUD", text: episode.hudTitle, key: "hudTitle" },
  { code: "mon", label: "Môn · chủ đề", text: episode.textbook, key: "textbook" },
  { code: "thoi", label: "Bối cảnh lịch sử", text: episode.era, key: "era" },
  { code: "hoi", label: "Câu hỏi cuối video", text: episode.question, key: "question" },
];

export const isGenerated = () => false;
export const generatedNote = "";
export const stageStatus = () => "🎭 Có sân khấu Giấy cổ & Hình học + nhân vật Milo";

export const extraInfo = (episode) => [
  `<b>Bối cảnh:</b> ${esc(episode.era)}`,
  `<b>Môn · chủ đề:</b> ${esc(episode.textbook)}`,
  `<b>Nguồn (${episode.sources?.length ?? 0}):</b>`,
  ...(episode.sources ?? []).map((s) => `• <a href="${esc(s.url)}">${esc(s.title)}</a>`),
];

export const sheetInfo = (episode) => [
  `**Nguồn:** ${(episode.sources ?? []).map((s) => `[${s.title}](${s.url})`).join(" · ")}`,
];

export const validate = (episode) => {
  const errors = [];
  if (!episode.title?.trim()) errors.push("Thiếu tiêu đề tập (title).");
  if (!episode.textbook?.trim()) errors.push("Thiếu môn · chủ đề (textbook).");
  if (!episode.question?.trim()) errors.push("Thiếu câu hỏi cuối video (question).");
  return errors;
};

export const ai = {
  role:
    `Bạn là biên kịch kiêm đạo diễn hình học của series "Thiên Đường Kiến Thức": kể lại cách các nhà bác học cổ đại/cận đại ` +
    `giải quyết những bài toán vĩ đại bằng công cụ thô sơ, giải thích bằng nguyên lý Toán – Lý – Khoa học và mở rộng ra quy mô Vũ trụ. Không tra hay nhắc sách giáo khoa; trường textbook ghi môn · chủ đề, không ghi lớp. ` +
    `Dùng 1 giọng kể duy nhất (NARRATOR), trầm ấm, cuốn hút.`,
  rules: [
    `Không đổi day, week, theme. Giữ đủ các trường title, hudTitle, textbook, era, question, sources, hook, barrier, eureka, theorem, cosmic (realworld có thể bỏ nếu tập không cần).`,
    `Mỗi câu thoại có text (hiển thị phụ đề ngắn gọn, dùng ký hiệu toán học chuẩn) và tts (viết thuần chữ tiếng Việt để AI đọc mượt không vấp số hay ký hiệu).`,
    `Thời lượng mục tiêu từ 110 đến 170 giây (dưới 180 giây để đăng được YouTube Shorts 3 phút, trên 60 giây cho TikTok).`,
  ],
  bible: "docs/series-bible.md",
  spec: "src/episodes/make.ts",
  extraDocs: [],
};
