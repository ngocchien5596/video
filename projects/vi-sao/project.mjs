/**
 * Phần riêng của series "Ông Ơi, Vì Sao?" cho công cụ dòng lệnh và bot:
 * tên nhịp, chỗ sửa được, ràng buộc kiểm chứng (đủ nguồn), hướng dẫn cho Claude, gói đăng bài.
 * Cấu hình chỉnh tay (lịch, hashtag...) nằm trong project.json cùng thư mục.
 */
import { esc } from "../../tools/bot/telegram.mjs";

export { buildPublishKit } from "./publish.mjs";

/** Thứ tự và tên hiển thị của 5 nhịp. */
export const beats = {
  hook: "CÂU HỎI",
  guess: "ĐOÁN THỬ",
  explain: "GIẢI THÍCH",
  recap: "TÓM LẠI",
  outro: "HỎI TIẾP",
};

export const headline = (episode) => episode.ask;
export const teaserLabel = "Câu hỏi tiếp";

export const fields = (episode) => [
  { code: "sai", label: "Hiểu lầm phổ biến", text: episode.myth, key: "myth" },
  { code: "dap", label: "Trả lời một câu", text: episode.answer, key: "answer" },
  { code: "hoi", label: "Câu hỏi cuối video", text: episode.question, key: "question" },
];

/** Câu tóm lại (nhịp 4) tự sinh từ "answer": sửa bằng mã "dap". */
export const isGenerated = (episode, code) => code === "4.1" && episode.beats[3]?.kind === "recap";
export const generatedNote = "🔒 = câu tự sinh từ “Trả lời một câu” (mã dap).";

/** Nguồn kiểm chứng và lứa tuổi, hiện trong tin nhắn kịch bản. */
export const extraInfo = (episode) => [
  `<b>Lứa tuổi:</b> ${esc(episode.ages ?? "")}`,
  `<b>Nguồn (${episode.sources?.length ?? 0}):</b>`,
  ...(episode.sources ?? []).map((s) => `• <a href="${esc(s.url)}">${esc(s.title)}</a>`),
];

export const sheetInfo = (episode) => [
  `**Lứa tuổi:** ${episode.ages}`,
  `**Nguồn:** ${(episode.sources ?? []).map((s) => `[${s.title}](${s.url})`).join(" · ")}`,
];

/**
 * Lỗi chặn xuất video: mỗi tập phải có ít nhất 2 nguồn có link, có hiểu lầm để bóc và câu trả lời.
 * (Quy trình kiểm chứng: projects/vi-sao/docs/series-bible.md)
 */
export const validate = (episode) => {
  const errors = [];
  const sources = (episode.sources ?? []).filter((s) => /^https?:\/\//.test(s.url ?? "") && s.title?.trim());
  if (sources.length < 2) errors.push(`Cần ít nhất 2 nguồn kiểm chứng có link (đang có ${sources.length}).`);
  if (!episode.myth?.trim()) errors.push("Thiếu hiểu lầm phổ biến (myth).");
  if (!episode.answer?.trim()) errors.push("Thiếu câu trả lời một câu (answer).");
  return errors;
};

export const ai = {
  role:
    `Bạn là biên kịch kiêm đạo diễn hoạt hình của series video ngắn khoa học cho trẻ 5–9 tuổi và phụ huynh "Ông Ơi, Vì Sao?". ` +
    `Thằng Cháu hỏi một câu "vì sao", Cụ Đồ giải thích đúng khoa học, ngắn, dễ hiểu.`,
  rules: [
    `Không đổi day, week, theme. Giữ đủ các trường ask, myth, answer, sources, ages, question, hook, guess, explain, outro.`,
    `CHÍNH XÁC LÀ TRÊN HẾT: chỉ nói điều có trong nguồn (sources). Không thêm số liệu, tên khoa học hay khẳng định mới nếu không có nguồn; cần thì hỏi lại đạo diễn. Không đơn giản hoá đến mức sai.`,
    `Mỗi tập một ý chính. Mỗi câu giải thích một bước. Từ ngữ quen thuộc với trẻ 5–9 tuổi, so sánh bằng đồ vật quen thuộc. Cả tập dưới 45 giây khi đọc.`,
    `Nhịp 4 (TÓM LẠI) tự sinh từ "answer": muốn đổi câu tóm lại thì sửa "answer".`,
    `Không nội dung đáng sợ, không khuyến khích hành động nguy hiểm (nhìn thẳng mặt trời, thí nghiệm với lửa, điện...).`,
    `Bảng minh hoạ: dùng kênh "board" trong stage với id và bước có trong danh sách BẢNG MINH HOẠ; mỗi bước phải khớp câu đang nói. Không có sơ đồ phù hợp thì nói rõ trong tóm tắt.`,
  ],
  bible: "docs/series-bible.md",
  spec: "src/episodes/make.ts",
  extraDocs: ["docs/bang-minh-hoa.md"],
};
