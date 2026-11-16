import type { Moment } from "../../../../engine/lib/stage-types.ts";
import { cd, makeEpisode, tc } from "./make.ts";

const week = 8;
const theme = "Máy móc, công nghệ quanh ta";

const recapStage: Moment[] = [
  { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle", hand: null } },
];

/** Tập cuối danh sách: Thằng Cháu xin kể tiếp, Cụ Đồ hẹn kể dần. */
const nextStage: Moment[] = [
  { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
  { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
];

export const TUAN_8 = [
  makeEpisode({
    day: 4,
    week,
    theme,
    ask: "Vì sao Claude lúc đang nghĩ lại hiện toàn chữ lạ?",
    myth: "Mấy chữ lạ là do máy bị lỗi, hoặc máy đang làm đúng việc mà chữ ấy nói.",
    answer: "Chữ chạy báo máy vẫn đang làm cho mình yên tâm chờ, còn Claude đổi liên tục giữa gần hai trăm chữ vui.",
    sources: [
      {
        title: "Nielsen Norman Group (Katie Sherwin, 2014): Progress Indicators Make a Slow System Less Insufferable",
        url: "https://www.nngroup.com/articles/progress-indicators/",
      },
      {
        title: "Buell & Norton (Harvard Business School, 2011): The Labor Illusion: How Operational Transparency Increases Perceived Value, Management Science",
        url: "https://doi.org/10.1287/mnsc.1110.1376",
      },
      { title: "Claude Code Docs (Anthropic): Settings reference, mục spinnerVerbs", url: "https://code.claude.com/docs/en/settings-reference" },
    ],
    question: "Bạn từng thấy Claude hiện chữ nào buồn cười nhất lúc đang nghĩ?",
    hook: {
      shot: "Phòng khách, Thằng Cháu cầm điện thoại chờ AI trả lời, gãi đầu thắc mắc",
      lines: [tc("Ông ơi, ChatGPT hay Gemini lúc nghĩ chỉ hiện chữ “Thinking”, là “đang nghĩ”. Sao Claude lại hiện toàn chữ lạ hoắc thế ạ?")],
      stage: [
        {
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral", arms: "down", hand: null },
          tc: { x: 0.66, hand: "phone", arms: "hold", expr: "happy", move: "idle" },
          items: [],
        },
        { at: 0.55, camera: "TC", tc: { expr: "confused" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    guess: {
      shot: "Thằng Cháu kể chữ Brewing (pha trà, cầm chén trà) và Moonwalking (nhảy lướt lùi), đoán máy bị lỗi; Cụ Đồ bảo đó chỉ là chữ vui báo máy vẫn đang chạy",
      lines: [
        tc("Lúc thì “Brewing” là đang pha trà, lúc lại “Moonwalking” là nhảy lướt lùi. Hay máy bị lỗi hả ông?"),
        cd("Lỗi đâu mà lỗi! Chữ vui thôi, để báo máy vẫn đang chạy đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { hand: "tea-cup", arms: "hold", expr: "happy", move: "idle" } },
        { line: 0, at: 0.4, camera: "wide", tc: { hand: null, arms: "up2", expr: "smug", move: "shake" }, fx: { kind: "sparkle", on: "TC" } },
        { line: 0, at: 0.75, tc: { hand: "phone", arms: "hold", expr: "confused", move: "idle" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" } },
        { line: 1, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: màn hình đứng im 'TREO RỒI À?' rồi ngôi sao nhấp nháy 'Đang chạy...'; hai trang web: trang trả kết quả ngay và trang cho xem đang tìm, người ta chọn trang chậm; màn hình đổi chữ nấu nướng, nhảy nhót, Clauding, '187 CHỮ'; chữ Thinking hiện ra 'CÓ CẢ CHỮ NÀY!'",
      lines: [
        cd("Máy trả lời có khi mất cả phút. Màn hình đứng im thì tưởng máy treo, nên phải có chữ chạy cho yên tâm."),
        cd("Nghiên cứu ở Harvard còn thấy, cho xem máy đang làm gì thì người ta thà chờ lâu, còn hơn có kết quả ngay."),
        cd("Claude thì giấu sẵn một trăm tám mươi bảy chữ, toàn nấu nướng, nhảy nhót, có cả “Clauding”, lấy luôn tên mình làm chữ!"),
        cd("Với cả Claude cũng hiển thị chữ “Thinking” mà! Còn vì sao chọn chữ vui thì hãng chưa nói rõ."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w8-spinner", step: 0 }, cd: { arms: "point", expr: "neutral" }, tc: { hand: null, arms: "down", expr: "confused", move: "idle" } },
        { line: 0, at: 0.45, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
        { line: 0, at: 0.65, board: { id: "w8-spinner", step: 1 }, cd: { arms: "wave", expr: "happy" }, tc: { expr: "happy" } },
        { line: 1, board: { id: "w8-spinner", step: 2 }, cd: { arms: "raise", expr: "neutral" }, tc: { expr: "confused" } },
        { line: 1, at: 0.6, tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
        { line: 2, board: { id: "w8-spinner", step: 3 }, cd: { arms: "point", expr: "smug" }, tc: { expr: "happy", move: "bounce" } },
        { line: 2, at: 0.7, fx: { kind: "sparkle", on: "TC" } },
        { line: 3, board: { id: "w8-spinner", step: 4 }, cd: { arms: "point", expr: "happy" }, tc: { expr: "shock", move: "idle" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 3, at: 0.55, cd: { arms: "hips", expr: "neutral" }, tc: { arms: "up2", expr: "happy", move: "bounce" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu xin ông kể tiếp chuyện khác, Cụ Đồ gật đầu hẹn kể dần",
      lines: [tc("Ông ơi, mai ông lại kể cho cháu một chuyện vì sao nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: nextStage,
    },
  }),
];
