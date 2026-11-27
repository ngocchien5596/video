/**
 * Gói đăng bài của series "Thiên Đường Kiến Thức" (`kien-thuc` / `kt`).
 */
import { BASE_CHECKLIST, pick, tags } from "../../tools/bot/publish.mjs";

/** Câu đầu / câu cuối của hồi mở đầu: chính là câu móc và câu đặt cược người xem nghe trong 5 giây đầu. */
const hookLines = (e) => e.beats?.[0]?.lines?.map((l) => l.text) ?? [];
const opener = (e) => hookLines(e)[0] ?? e.title;
const bet = (e) => {
  const lines = hookLines(e);
  return lines.length > 1 ? lines[lines.length - 1] : e.question;
};
/** Tiêu đề HUD viết hoa → viết thường cho câu văn ("BÚA HAY LÔNG CHIM…" → "Búa hay lông chim…"). */
const sentence = (s) => (s && s === s.toLocaleUpperCase("vi") ? s.charAt(0) + s.slice(1).toLocaleLowerCase("vi") : s);
const subject = (e) => e.textbook.split(" · ")[0].replace(/\s*\d+$/, "");
/** "Vật lí · Chuyển động ném" → "chuyện chuyển động ném trong Vật lí" (tập cũ có số lớp thì bỏ số). */
const lesson = (e) => {
  const [subj, name] = e.textbook.split(" · ");
  const s = subj.replace(/\s*\d+$/, "");
  return name ? `chuyện ${name.charAt(0).toLocaleLowerCase("vi")}${name.slice(1)} trong ${s}` : s;
};
/** Thêm dấu chấm nếu câu chưa có dấu kết. */
const stop = (s) => (/[.?!…]$/.test(s) ? s : `${s}.`);
/** Tag môn học theo môn của tập (tag ngách cỡ vừa, xem docs/hashtag.md). */
const SUBJECT_TAG = { "Toán": "toanhoc", "Vật lí": "vatly", "Hoá học": "hoahoc", "Hóa học": "hoahoc", "Sinh học": "sinhhoc", "KHTN": "khoahoc" };
const subjectTag = (e) => SUBJECT_TAG[subject(e).replace(/\s*\d+$/, "")] ?? "khoahoc";

// Từ khoá chủ đề đứng đầu; đuôi câu gợi tò mò nhưng không hứa điều video không có.
const TITLES = [
  (e) => e.title,
  (e) => `${e.title} Bạn đoán đúng không?`,
  (e) => `${e.title} Bài học ${subject(e)} mà ít ai để ý`,
];

const TIKTOK_OPENERS = [
  (e) => `${opener(e)} 🤯`,
  (e) => `${opener(e)} Chuyện có thật đấy 👀`,
  (e) => `${e.title} Nghe xong mới thấy ${subject(e)} hay thế nào 😮`,
];

export const buildPublishKit = (episode, next, { cfg, startDate = null }) => {
  const day = episode.day;
  const theme = cfg.themeHashtags?.[episode.theme] ?? [];
  // Thứ tự: tag lớn sát ngách, tag môn học, tag series, rồi tag phụ / chủ đề tuần (xem docs/hashtag.md).
  const allTags = (max) => tags([cfg.hashtags[0], subjectTag(episode), ...cfg.hashtags.slice(1), ...theme], max);

  // Tiêu đề chỉ chứa chữ (từ khoá tìm kiếm); YouTube tự đưa 3 hashtag đầu trong mô tả lên cạnh tiêu đề, #Shorts không bắt buộc.
  let ytTitle = pick(TITLES, day)(episode);
  if (ytTitle.length > 100) ytTitle = episode.title;

  const ytDescription = [
    opener(episode),
    bet(episode),
    "",
    `Xem hết video để biết đáp án, và vì sao chuyện này lại là ${lesson(episode)}.`,
    `“${cfg.seriesName}”: những câu đố, những lời đồn khoa học được giải bằng hình vẽ dễ hiểu, nối với bài học trên lớp.`,
    next ? `Tập sau: ${stop(sentence(next))}` : "",
    "",
    "Nguồn tham khảo:",
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
    bet(episode),
    allTags(cfg.maxHashtagsTiktok).join(" "),
  ].join("\n");

  return {
    day,
    title: episode.title,
    when: cfg.postTime || null,
    ytTitle,
    ytDescription,
    tiktokCaption,
    pinned: `${episode.question}${next ? `\nTập sau: ${stop(sentence(next))} Đoán trước xem nào!` : ""}`,
    checklist: [
      ...BASE_CHECKLIST,
      "Kiểm tra thẻ chữ và phụ đề không bị nút TikTok / Shorts che",
      "Nghe thử giọng NARRATOR đọc tên riêng và ký hiệu toán học đã mượt chưa",
      "Độ dài video dưới 180 giây (chuẩn YouTube Shorts 3 phút)",
    ],
  };
};
