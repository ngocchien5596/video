/**
 * Phần riêng của series "Ông Ơi, Chỗ Này Lạ Lắm!" cho công cụ dòng lệnh và bot:
 * tên nhịp, chỗ sửa được, ràng buộc kiểm chứng (đủ nguồn), hướng dẫn cho Claude, gói đăng bài.
 * Cấu hình chỉnh tay (lịch, hashtag...) nằm trong project.json cùng thư mục.
 */
import { esc } from "../../tools/bot/telegram.mjs";

export { buildPublishKit } from "./publish.mjs";

/** Thứ tự và tên hiển thị của 6 nhịp. */
export const beats = {
  hook: "NGHỊCH LÝ",
  call: "GỌI ÔNG",
  guess: "ĐOÁN SAI",
  reason: "LÝ DO",
  twist: "BƯỚC NGOẶT",
  chot: "CHỐT",
};

export const headline = (episode) => episode.title;
export const teaserLabel = "Chỗ lạ tiếp theo";

export const fields = (episode) => [
  { code: "noi", label: "Nơi chốn", text: episode.place, key: "place" },
  { code: "hoi", label: "Câu hỏi cuối video", text: episode.question, key: "question" },
];

export const isGenerated = () => false;
export const generatedNote = "";

/** Nguồn kiểm chứng và thẻ số liệu, hiện trong tin nhắn kịch bản. */
export const extraInfo = (episode) => [
  `<b>Kiểu tương tác:</b> ${episode.interaction === "binh-luan" ? "kéo bình luận" : "kéo thả tim"}`,
  `<b>Thẻ số liệu:</b> ${(episode.facts ?? []).map((f) => `${esc(f.big)} (${esc(f.label)})`).join(" · ") || "chưa có"}`,
  `<b>Nguồn (${episode.sources?.length ?? 0}):</b>`,
  ...(episode.sources ?? []).map((s) => `• <a href="${esc(s.url)}">${esc(s.title)}</a>`),
];

export const sheetInfo = (episode) => [
  `**Tương tác:** ${episode.interaction === "binh-luan" ? "kéo bình luận" : "kéo thả tim"}`,
  `**Thẻ số liệu:** ${(episode.facts ?? []).map((f) => `${f.big} (${f.label})`).join(" · ")}`,
  `**Nguồn:** ${(episode.sources ?? []).map((s) => `[${s.title}](${s.url})`).join(" · ")}`,
];

/** Lỗi chặn xuất video: ít nhất 2 nguồn có link, có câu hỏi cuối video. (docs/series-bible.md, mục Kiểm chứng) */
export const validate = (episode) => {
  const errors = [];
  const sources = (episode.sources ?? []).filter((s) => /^https?:\/\//.test(s.url ?? "") && s.title?.trim());
  if (sources.length < 2) errors.push(`Cần ít nhất 2 nguồn kiểm chứng có link (đang có ${sources.length}).`);
  if (!episode.question?.trim()) errors.push("Thiếu câu hỏi cuối video (question).");
  return errors;
};

export const ai = {
  role:
    `Bạn là biên kịch kiêm đạo diễn hoạt hình của series video ngắn "Ông Ơi, Chỗ Này Lạ Lắm!": Thằng Cháu đi khắp Việt Nam, gặp một điều lạ có thật ` +
    `(nơi chốn, công trình, quy định, phong tục, thiên nhiên), gọi video hỏi Cụ Đồ; Ông kể chuyện ngắn, có số liệu, có bước ngoặt, chốt bằng một thành ngữ. ` +
    `Người xem từ 13 tuổi trở lên và người lớn.`,
  rules: [
    `Không đổi day, week, theme. Giữ đủ các trường title, place, sources, question, interaction, facts, hook, call, guess, reason, twist, chot.`,
    `CHÍNH XÁC LÀ TRÊN HẾT: chỉ nói điều có trong nguồn (sources); quy định, số liệu ghi đúng mốc thời gian. Điều chưa chắc thì nói "theo báo…" hoặc "có thuyết cho rằng…". Không bịa lý do.`,
    `Giữ khung 6 nhịp và quy tắc giữ chân người xem trong docs/series-bible.md: câu đầu là nghịch lý; nhịp gọi Ông loại trước cách giải thích dễ đoán; nhịp bước ngoặt mở bằng câu kéo lại ("Nhưng lạ nhất lại là…"); nhịp chốt nhắc lại hình ảnh mở đầu và kết bằng thành ngữ. Mỗi tập một câu hỏi lớn, tối đa 4 con số. Cả tập dưới 60 giây khi đọc (khoảng 160–190 chữ).`,
    `Khung gọi video: kênh "call" trong stage (true = Ông trong khung điện thoại, Cháu cầm "phone"); camera "CD" khi đang gọi = phóng to khung để Ông kể. Mỗi con số quan trọng có thẻ số liệu (facts).`,
    `Không chính trị, không biên giới / biển đảo tranh chấp, không chê vùng miền, không dựng như bản tin / phóng sự báo chí. Bản đồ Việt Nam (nếu có) phải có Hoàng Sa, Trường Sa.`,
  ],
  bible: "docs/series-bible.md",
  spec: "src/episodes/make.ts",
  extraDocs: [],
};
