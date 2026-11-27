/**
 * Gói đăng bài của "Đoán Xem Là Ai". Tiêu đề, caption KHÔNG lộ tên nhân vật (lộ thì hết đoán);
 * tên chỉ có trong bình luận ghim kèm nguồn, đăng sau khi video lên.
 */
import { BASE_CHECKLIST, pick, tags } from "../../tools/bot/publish.mjs";

const TITLES = [
  (e) => `${e.title}. Bạn đoán ra là ai không?`,
  (e) => `Đoán xem là ai: ${e.title}`,
];

const TIKTOK_OPENERS = [
  (e) => `${e.title}. Bạn đoán ra ở gợi ý nào? 🤔`,
  (e) => `Từng gợi ý một, bạn đoán được đây là ai không? 🖌️`,
];

export const buildPublishKit = (episode, next, { cfg }) => {
  const day = episode.day;
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  const allTags = (max) => tags([...cfg.hashtags, ...theme], max);

  let ytTitle = pick(TITLES, day)(episode);
  if (ytTitle.length > 100) ytTitle = "Đoán xem là ai? Nghe từng gợi ý rồi đoán thử";

  const ytDescription = [
    `${episode.title}. Nghe từng gợi ý và thử đoán xem đây là ai, đáp án ở cuối video.`,
    "",
    `Series “${cfg.seriesName}”: mỗi tập kể dòng đời một nhân vật lịch sử, gợi ý đi từ khó tới dễ.`,
    "",
    "Nguồn tham khảo:",
    ...episode.sources.map((s) => `• ${s.title}: ${s.url}`),
    "",
    cfg.aiNote,
    "",
    allTags(cfg.maxHashtagsYoutube).join(" "),
  ].join("\n");

  // Câu hỏi cuối video có thể nhắc đáp án (vd "…trong Truyện Kiều?"): chỉ để ở bình luận ghim, không đưa vào caption.
  const tiktokCaption = [pick(TIKTOK_OPENERS, day)(episode), "Bạn đoán ra ở gợi ý nào?", allTags(cfg.maxHashtagsTiktok).join(" ")].join("\n");

  return {
    day,
    title: episode.title,
    when: cfg.postTime || null,
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: `Đáp án: ${episode.person} (${episode.known}). ${episode.question}\n📚 Nguồn: ${episode.sources.map((s) => s.url).join(" · ")}`,
    checklist: [
      ...BASE_CHECKLIST,
      "YouTube: Đối tượng → “Không, nội dung này không dành cho trẻ em”",
      "Tiêu đề, caption, ảnh bìa không lộ tên nhân vật",
      "Mở lại các link nguồn, kiểm tra năm tháng còn đúng",
    ],
  };
};
