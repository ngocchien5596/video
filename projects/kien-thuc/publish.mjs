/**
 * Gói đăng bài của series "Thiên Đường Kiến Thức" (`kien-thuc` / `kt`).
 */
import { BASE_CHECKLIST, pick, postWhen, tags } from "../../tools/bot/publish.mjs";

const TITLES = [
  (e) => `${e.title} (${e.textbook})`,
  (e) => `${e.hudTitle}: Bí mật từ ${e.textbook} 🤯`,
  (e) => `Học ${e.textbook} để làm gì ngoài đời thực?`,
];

const TIKTOK_OPENERS = [
  (e) => `${e.title} 🤯 Hóa ra định lý trong ${e.textbook} quyền năng đến vậy!`,
  (e) => `📐 ${e.era}: ${e.title}`,
  (e) => `Lưu lại ngay để thấy vẻ đẹp thực sự của ${e.textbook} ✨`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  const allTags = (max) =>
    tags([...cfg.hashtags.slice(0, 2), ...theme.slice(0, 1), ...cfg.hashtags.slice(2), ...theme.slice(1)], max);

  let ytTitle = `${pick(TITLES, day)(episode)} #Shorts`;
  if (ytTitle.length > 100) ytTitle = `${episode.hudTitle} (${episode.textbook}) #Shorts`;

  const ytDescription = [
    `${episode.title} — Liên hệ ${episode.textbook}.`,
    "",
    `Tập ${day} của series “${cfg.seriesName}”: Giải mã các bài toán vĩ đại trong lịch sử khoa học bằng trực quan hình học và kết nối với Sách giáo khoa.`,
    next ? `Bài toán tiếp theo: ${next}` : "",
    "",
    "Nguồn & Tài liệu tham khảo:",
    ...(episode.sources ?? []).map((s) => `• ${s.title}: ${s.url}`),
    "",
    cfg.aiNote,
    "",
    allTags(cfg.maxHashtagsYoutube).join(" "),
  ]
    .filter((l, i, all) => !(l === "" && all[i - 1] === ""))
    .join("\n");

  const tiktokCaption = [
    pick(TIKTOK_OPENERS, day)(episode),
    episode.question,
    allTags(cfg.maxHashtagsTiktok).join(" "),
  ].join("\n");

  return {
    day,
    title: episode.title,
    when: postWhen(startDate, day, cfg.postTime),
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: `${episode.question}${next ? `\n📐 Tập tiếp theo: ${next}` : ""}`,
    checklist: [
      ...BASE_CHECKLIST,
      "Kiểm tra công thức trên bảng Tầng 2B và phụ đề Tầng 3 không bị nút TikTok/Shorts che",
      "Nghe thử giọng NARRATOR đọc tên riêng và ký hiệu toán học đã mượt chưa",
      "Độ dài video dưới 180 giây (chuẩn YouTube Shorts 3 phút)",
    ],
  };
};
