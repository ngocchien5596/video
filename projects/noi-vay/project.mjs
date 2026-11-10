/**
 * Phần riêng của series "Nói Vậy Mà Không Phải Vậy" mà công cụ dòng lệnh và bot cần biết:
 * tên nhịp, chỗ sửa được, câu tự sinh, hướng dẫn cho Claude khi sửa kịch bản, gói đăng bài.
 * Cấu hình chỉnh tay (giờ thông báo, hashtag...) nằm trong project.json cùng thư mục.
 */
export { buildPublishKit } from "./publish.mjs";

/** Thứ tự và tên hiển thị của 6 nhịp. */
export const beats = {
  hook: "HOOK",
  title: "ĐẶT CÂU",
  misread: "HIỂU SAI",
  flip: "LẬT NGHĨA",
  example: "VÍ DỤ",
  punchline: "PUNCHLINE",
};

/** Tiêu đề ngắn của một tập (câu thành ngữ). */
export const headline = (episode) => episode.idiom;

/** Nhãn của dòng hẹn tập sau, ví dụ "Mai là câu: …". */
export const teaserLabel = "Mai là câu";

/** Các trường sửa được ngoài thoại: mã, nhãn, giá trị, tên trường trong makeEpisode. */
export const fields = (episode) => [
  { code: "nghia", label: "Nghĩa thật", text: episode.meaning, key: "meaning" },
  { code: "hoi", label: "Câu hỏi cuối video", text: episode.question, key: "question" },
];

/** Trường đổi thì phải cập nhật tracker / cảnh báo tập trước (dòng "Mai là câu"). */
export const titleKey = "idiom";

/** Câu tự sinh từ khuôn (không sửa trực tiếp được): thoại 2.2, cảnh 2.c, câu cửa miệng 4.1. */
export const isGenerated = (episode, code) => {
  const t = episode.beats[1]?.kind === "title" ? 2 : -1;
  const f = episode.beats[3]?.kind === "flip" ? 4 : -1;
  return code === `${t}.2` || code === `${t}.c` || code === `${f}.1`;
};
export const generatedNote = "🔒 = câu tự sinh từ câu thành ngữ / câu cửa miệng, sửa trong repo.";

/** Dòng thông tin thêm trong tin nhắn kịch bản (HTML đã escape bởi bot). */
export const extraInfo = () => [];

/** Lỗi chặn xuất video (ví dụ thiếu nguồn). Series này không có ràng buộc thêm. */
export const validate = () => [];

/** Hướng dẫn riêng cho Claude khi sửa kịch bản qua bot. */
export const ai = {
  role: `Bạn là biên kịch kiêm đạo diễn hoạt hình của series video ngắn hài "Nói Vậy Mà Không Phải Vậy" (giải nghĩa thành ngữ, tục ngữ).`,
  rules: [
    `Không đổi day, week, theme. Giữ đủ các trường hook, ask, misread, explain, example, punchline.`,
    `Nhịp 2 (ĐẶT CÂU) tự sinh từ "ask" và "idiom"; nhịp 4 (LẬT NGHĨA) tự sinh từ câu cửa miệng + "explain".`,
    `Nghĩa thật (meaning), câu hỏi (question) chỉ đổi khi được yêu cầu hoặc khi thoại đổi làm chúng sai.`,
    `Giữ giọng nhân vật (xem quy tắc series). Cả tập phải dưới 60 giây khi đọc.`,
  ],
  bible: "docs/series-bible.md",
  spec: "src/episodes/make.ts",
};
