import type { Moment } from "../../../../engine/lib/stage-types.ts";
import { cd, makeEpisode, tc } from "./make.ts";

const week = 9;
const theme = "Giao thông quanh ta";

const recapStage: Moment[] = [
  { line: 0, board: null, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", move: "idle" } },
];

export const TUAN_9 = [
  makeEpisode({
    day: 46,
    week,
    theme,
    ask: "Trên sông không có đèn giao thông, sao tàu thuyền không đâm nhau?",
    myth: "Sông nước rộng thênh thang, tàu thuyền muốn đi đâu thì đi, cứ bấm còi là người ta tự né.",
    answer: "Tàu thuyền nói chuyện với nhau bằng tiếng còi, và nhìn đèn đỏ đèn xanh trên thân tàu để biết ai phải nhường ai.",
    sources: [
      {
        title: "Luật Giao thông đường thủy nội địa 2004 (số 23/2004/QH11), Điều 40, 46, 47",
        url: "https://hethongphapluat.com/luat-giao-thong-duong-thuy-noi-dia-2004/dieu-46",
      },
      {
        title: "Tổ chức Hàng hải Quốc tế (IMO): Công ước quốc tế về phòng ngừa đâm va trên biển (COLREGs 1972)",
        url: "https://www.imo.org/en/About/Conventions/Pages/COLREG.aspx",
      },
      {
        title: "Deutsche Flagge (Bộ Giao thông Đức): How long does it take for a large ship to come to a stop?",
        url: "https://www.deutsche-flagge.de/en/yarn-q-a/how-long-does-it-take-for-a-large-ship-to-come-to-a-stop",
      },
    ],
    question: "Nếu được lái tàu một ngày, bạn muốn bấm còi chào ai đầu tiên?",
    hook: {
      shot: "Bến sông, Thằng Cháu chỉ ra sông thắc mắc chẳng thấy cột đèn giao thông nào",
      lines: [tc("Ông ơi, ngoài đường thì có đèn xanh đèn đỏ, chứ trên sông chẳng có cái đèn nào. Sao tàu thuyền không đâm vào nhau hả ông?")],
      stage: [
        {
          cut: true,
          scene: "bd-river",
          camera: "wide",
          cd: { x: 0.26, expr: "neutral", arms: "down", hand: null, move: "idle" },
          tc: { x: 0.66, hand: null, arms: "point", expr: "confused", move: "idle" },
          items: [],
        },
        { at: 0.55, camera: "TC", tc: { arms: "raise" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    guess: {
      shot: "Thằng Cháu đoán tàu cứ bấm còi inh ỏi là người ta tự né; Cụ Đồ bảo trên sông có luật hẳn hoi, còi tàu là cả một bộ mật mã",
      lines: [
        tc("Hay là sông rộng quá, cứ bấm còi inh ỏi lên là người ta tự né hả ông?"),
        cd("Bậy nào! Trên sông cũng có luật hẳn hoi, mà tiếng còi tàu còn là cả một bộ mật mã đấy."),
      ],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "smug", move: "bounce" } },
        { line: 0, at: 0.6, tc: { arms: "hold", expr: "happy", move: "shake" }, fx: { kind: "exclaim", on: "TC", text: "TUÝT!" } },
        { line: 1, camera: "CD", cd: { arms: "hips", expr: "angry" }, tc: { arms: "down", move: "idle" } },
        { line: 1, at: 0.55, camera: "wide", cd: { arms: "raise", expr: "smug" }, tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    explain: {
      shot: "Bảng minh hoạ: mã còi (ngắn = chấm, dài = gạch): rẽ phải, rẽ trái, lùi; chào nhau; người ngã xuống nước; tàu nhìn từ trên xuống với đèn đỏ mạn trái, đèn xanh mạn phải, tàu chìa đèn đỏ thì mình nhường; tàu dài 350 m trôi hơn 5 km mới dừng",
      lines: [
        cd("Tàu đâu có xi nhan như xe máy, nên phải bấm còi thay. Một tiếng ngắn là rẽ phải, hai tiếng là rẽ trái, ba tiếng là đang lùi."),
        cd("Ba tiếng dài thì là chào nhau đấy. Còn nghe ba ngắn, ba dài, ba ngắn là có người ngã xuống nước rồi!"),
        cd("Ban đêm thì nhìn đèn hai bên mạn tàu, bên trái đỏ, bên phải xanh. Tàu kia mà chìa đèn đỏ về phía mình, thì mình phải nhường, y như gặp đèn đỏ ngoài đường vậy!"),
        tc("Ơ, thế tàu gặp đèn đỏ thì có phanh kít lại như xe máy không ông?"),
        cd("Tàu làm gì có phanh mà kít! Tàu dài ba trăm rưỡi mét đang chạy hết tốc lực, muốn dừng có khi phải trôi thêm hơn năm cây số đấy."),
      ],
      stage: [
        { line: 0, camera: "wide", board: { id: "w9-waterway", step: 0 }, cd: { arms: "point", expr: "neutral", move: "idle" }, tc: { arms: "down", expr: "confused", move: "idle" } },
        { line: 0, at: 0.55, tc: { expr: "happy" }, fx: { kind: "sparkle", on: "TC" } },
        { line: 1, board: { id: "w9-waterway", step: 1 }, cd: { arms: "wave", expr: "happy" }, tc: { expr: "happy" } },
        { line: 1, at: 0.55, cd: { arms: "raise", expr: "neutral" }, tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
        { line: 2, board: { id: "w9-waterway", step: 2 }, cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused", move: "idle" } },
        { line: 2, at: 0.65, cd: { expr: "happy" }, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
        { line: 3, camera: "TC", tc: { arms: "hold", expr: "smug", move: "bounce" }, fx: { kind: "question", on: "TC" } },
        { line: 4, board: { id: "w9-waterway", step: 3 }, camera: "wide", cd: { arms: "hips", expr: "smug" }, tc: { arms: "down", expr: "shock", move: "idle" } },
        { line: 4, at: 0.6, tc: { expr: "shock", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    recapStage,
    outro: {
      shot: "Thằng Cháu xin ông kể thêm chuyện khác, Cụ Đồ hẹn lần sau (không nói trước chủ đề)",
      lines: [tc("Hay quá ông ạ! Mai ông lại kể cho cháu nghe chuyện khác nữa nhé?"), cd("Được chứ! Cháu cứ hỏi, rồi ông kể dần cho.")],
      stage: [
        { line: 0, camera: "TC", tc: { arms: "raise", expr: "happy" }, fx: { kind: "question", on: "TC" } },
        { line: 1, camera: "wide", cd: { arms: "wave", expr: "happy" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
      ],
    },
  }),
];
