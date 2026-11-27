/**
 * Phần riêng của series "Đoán Xem Là Ai" cho công cụ dòng lệnh và bot:
 * tên nhịp, kiểm chứng (đủ nguồn), hướng dẫn cho Claude, gói đăng bài.
 * Cấu hình chỉnh tay nằm trong project.json; bible: docs/series-bible.md.
 */
import { esc } from "../../tools/bot/telegram.mjs";

export { buildPublishKit } from "./publish.mjs";

/** Thứ tự và tên hiển thị của 4 nhịp. */
export const beats = {
  mo: "MƠ HỒ",
  thu: "THU HẸP",
  chot: "GẦN CHỐT",
  khep: "KHÉP LẠI",
};

/** Tên dùng cho tên file và tin nhắn nội bộ (bài đăng không lộ tên, xem publish.mjs). */
export const headline = (episode) => episode.person;
export const teaserLabel = "Tiếp theo";

export const fields = (episode) => [
  { code: "ten", label: "Nhân vật", text: episode.person, key: "person" },
  { code: "tieude", label: "Tiêu đề đăng bài", text: episode.title, key: "title" },
  { code: "hoi", label: "Câu hỏi cuối video", text: episode.question, key: "question" },
];

export const isGenerated = () => false;
export const generatedNote = "";

export const extraInfo = (episode) => [
  `<b>Lật đáp án:</b> ${esc(episode.person)} · ${esc(episode.known)}`,
  `<b>Nguồn (${episode.sources?.length ?? 0}):</b>`,
  ...(episode.sources ?? []).map((s) => `• <a href="${esc(s.url)}">${esc(s.title)}</a>`),
];

export const sheetInfo = (episode) => [
  `**Nhân vật:** ${episode.person} · ${episode.known}`,
  `**Nguồn:** ${(episode.sources ?? []).map((s) => `[${s.title}](${s.url})`).join(" · ")}`,
];

/** Lỗi chặn xuất video: ít nhất 2 nguồn có link; đúng một khoảng dừng đoán; mỗi câu có hình. */
export const validate = (episode) => {
  const errors = [];
  const sources = (episode.sources ?? []).filter((s) => /^https?:\/\//.test(s.url ?? "") && s.title?.trim());
  if (sources.length < 2) errors.push(`Cần ít nhất 2 nguồn kiểm chứng có link (đang có ${sources.length}).`);
  const pauses = episode.beats.flatMap((b) => b.lines).filter((l) => (l.pauseAfter ?? 0) >= 3);
  if (pauses.length !== 1) errors.push(`Cần đúng một khoảng dừng đoán 3 giây sau gợi ý cuối (đang có ${pauses.length}).`);
  const noScene = episode.beats.flatMap((b) => b.lines).filter((l) => !l.scene?.ink);
  if (noScene.length) errors.push(`${noScene.length} câu chưa có hình (scene.ink).`);
  return errors;
};

export const ai = {
  role:
    `Bạn là biên kịch kiêm đạo diễn của series video ngắn "Đoán Xem Là Ai": một người dẫn kể dòng đời một nhân vật lịch sử, ` +
    `gợi ý đi từ khó tới dễ, có một cú lừa có chủ đích, dừng 3 giây cho người xem đoán rồi mới lộ tên. Người xem từ 13 tuổi trở lên.`,
  rules: [
    `Không đổi day, week, person. Giữ đủ bốn nhịp mo, thu, chot, khep và trường scene của mỗi câu.`,
    `CHÍNH XÁC LÀ TRÊN HẾT: chỉ nói điều có trong nguồn đã đọc (docs/nghien-cuu/ngay-XX.md); giai thoại giữ "tương truyền" / "theo … kể lại"; chỗ nguồn vênh thì nói tránh.`,
    `Không lộ tên hay tác phẩm trước câu lật đáp án. Đúng một khoảng dừng đoán (pauseAfter 3) ở câu gợi ý cuối. Câu người dẫn không mở bằng "Ông".`,
    `Câu kết quay về hình ảnh câu mở; không kêu gọi theo dõi, không hé tập sau.`,
  ],
  bible: "docs/series-bible.md",
  spec: "src/episodes/make.ts",
  extraDocs: [],
};
