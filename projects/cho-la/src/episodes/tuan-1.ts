/**
 * Tuần 1 (tập thử) "Ông Ơi, Chỗ Này Lạ Lắm!". Khung 6 nhịp và quy tắc: projects/cho-la/docs/series-bible.md.
 * Kho chủ đề và nguồn: research_notes/Ông ơi chỗ này lạ lắm/kho-chu-de.md.
 */
import { cd, type ChoLaEpisode, makeEpisode, tc } from "./make.ts";

const week = 1;

export const TUAN_1: ChoLaEpisode[] = [
  makeEpisode({
    day: 1,
    week,
    theme: "Đường sá và công trình",
    title: "Thành phố trăm năm không có đèn đỏ",
    place: "Đà Lạt",
    interaction: "binh-luan",
    question: "Quê bạn có ngã tư nào không đèn mà xe vẫn đi êm không? Kể tên nghe với!",
    sources: [
      { title: "VnExpress: Lên núi học đi (6/7/2017)", url: "https://vnexpress.net/len-nui-hoc-di-3609420.html" },
      {
        title: "Báo Pháp Luật Việt Nam: Người Đà Lạt ngỡ ngàng với đèn xanh đèn đỏ (18/11/2021)",
        url: "https://baophapluat.vn/nguoi-da-lat-ngo-ngang-voi-den-xanh-den-do-post422402.html",
      },
    ],
    facts: [
      { beat: "call", big: "GẦN 100 NĂM", label: "Đà Lạt không có một cột đèn giao thông nào" },
      { beat: "twist", line: 1, big: "ÍT NHẤT 4 LẦN", label: "công an xin lắp đèn trong 12 năm, đều không được" },
      { beat: "twist", line: 2, big: "14/11/2021", label: "đèn xanh đèn đỏ lần đầu bật lên, ở 5 nút giao" },
    ],
    hook: {
      shot: "Ngã tư Đà Lạt không có đèn, xe máy đi qua lại, TC đứng giữa vỉa hè ngơ ngác chỉ lên chỗ trống",
      lines: [tc("Ông ơi, thành phố gì mà gần trăm năm không có nổi một cái đèn đỏ?")],
      stage: [
        {
          cut: true,
          scene: "cl-nga-tu",
          camera: "wide",
          call: false,
          cd: { role: null, x: -0.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: null, x: 0.42, hand: null, back: null, head: null, face: null, arms: "up2", expr: "shock", move: "idle" },
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: -0.3, scale: 0.7 },
            { id: "xe2", prop: { id: "cl-xe-may", text: "vang" }, x: 1.3, scale: 0.65 },
          ],
        },
        // Xe cứ thế đi qua ngã tư
        {
          line: 0,
          at: 0.15,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.78, scale: 0.7 },
            { id: "xe2", prop: { id: "cl-xe-may", text: "vang" }, x: 1.3, scale: 0.65 },
          ],
        },
        // "không có nổi một cái đèn đỏ?"
        { line: 0, at: 0.6, camera: "TC", tc: { arms: "point", expr: "confused" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    call: {
      shot: "Chuông gọi, TC giơ điện thoại, khung gọi video của Ông bật lên ở góc",
      lines: [cd("Đà Lạt đấy cháu. Mà không phải vì thiếu tiền đâu nhé.")],
      stage: [
        { camera: "wide", call: true, tc: { hand: "phone", arms: "raise", expr: "happy", move: "idle" }, cd: { expr: "smug", arms: "down" } },
        {
          line: 0,
          at: 0.5,
          cd: { arms: "raise" },
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 1.35, scale: 0.7 },
            { id: "xe2", prop: { id: "cl-xe-may", text: "vang" }, x: 0.2, scale: 0.65 },
          ],
        },
      ],
    },
    guess: {
      shot: "TC đoán do sương mù, Ông gạt đi; cảnh chuyển sang con dốc sau lưng TC",
      lines: [tc("Cháu biết! Sương mù dày quá, lắp đèn cũng chẳng ai nhìn thấy!"), cd("Sai bét. Cháu quay lại nhìn con dốc sau lưng kia.")],
      stage: [
        { line: 0, tc: { arms: "point", expr: "smug", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 1, tc: { move: "idle", expr: "shock" }, cd: { expr: "angry", arms: "point" }, fx: { kind: "sweat", on: "TC" } },
        // "nhìn con dốc sau lưng kia": quay sang con dốc
        { line: 1, at: 0.6, cut: true, scene: "cl-da-lat-doc", items: [], tc: { x: 0.34, arms: "down", expr: "confused" } },
      ],
    },
    reason: {
      shot: "Ông kể (khung gọi phóng to); cảnh dốc có xe máy leo, đèn đỏ tưởng tượng bắt dừng giữa dốc; TC leo dốc thở dốc",
      lines: [
        cd("Đà Lạt toàn đường dốc. Đang leo mà gặp đèn đỏ, xe phải dừng giữa dốc thì rất nguy hiểm."),
        tc("Thảo nào, cháu đi bộ thôi mà đã thở không ra hơi!"),
      ],
      stage: [
        // Ông kể: khung gọi phóng to
        { line: 0, camera: "CD", cd: { expr: "neutral", arms: "point" } },
        // "Đang leo mà gặp đèn đỏ": xe leo dốc, đèn đỏ hiện ra
        {
          line: 0,
          at: 0.4,
          camera: "wide",
          items: [
            { id: "xe3", prop: { id: "cl-xe-may", text: "xanh" }, x: 0.72, scale: 0.75 },
            { id: "den", prop: { id: "cl-den-giao-thong", text: "do" }, x: 0.92, scale: 0.6 },
          ],
        },
        // "dừng giữa dốc thì rất nguy hiểm"
        { line: 0, at: 0.75, fx: { kind: "exclaim", on: "TC", text: "NGUY!" }, tc: { expr: "shock" } },
        // TC thở dốc
        { line: 1, items: [], tc: { arms: "hips", expr: "sad", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    twist: {
      shot: "Ông bảo lý do lạ nhất là con người; ngã tư xe đi chậm, không lấn làn; thẻ số 4 lần; đèn xanh đỏ lần đầu bật lên năm 2021",
      lines: [
        cd("Nhưng lý do lạ nhất lại nằm ở con người."),
        cd("Người Đà Lạt quen đi chậm, không lấn làn, không có gì phải vội. Mười hai năm, công an ít nhất bốn lần xin lắp đèn, đều không được."),
        cd("Mãi đến tháng 11 năm 2021, đèn xanh đèn đỏ mới lần đầu bật lên. Nhiều người còn lúng túng không biết xử lý sao."),
      ],
      stage: [
        { line: 0, camera: "CD", cd: { expr: "smug", arms: "raise" }, fx: { kind: "sparkle", on: "CD" } },
        // Ngã tư: xe đi chậm rãi, không lấn làn
        {
          line: 1,
          cut: true,
          scene: "cl-nga-tu",
          camera: "wide",
          tc: { x: 0.4, move: "idle", arms: "down", expr: "neutral" },
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: -0.2, scale: 0.7 },
            { id: "xe2", prop: { id: "cl-xe-may", text: "vang" }, x: 1.25, scale: 0.65 },
          ],
        },
        {
          line: 1,
          at: 0.2,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.2, scale: 0.7 },
            { id: "xe2", prop: { id: "cl-xe-may", text: "vang" }, x: 0.84, scale: 0.65 },
          ],
          tc: { expr: "happy" },
        },
        // "công an ít nhất bốn lần xin lắp đèn, đều không được"
        { line: 1, at: 0.62, tc: { expr: "shock", arms: "up2" }, fx: { kind: "surprise", on: "TC" } },
        // "Mãi đến tháng 11 năm 2021": đèn bật lên
        {
          line: 2,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.78, scale: 0.7 },
            { id: "den", prop: { id: "cl-den-giao-thong", text: "do" }, x: 0.16, scale: 0.75 },
          ],
          tc: { arms: "down", expr: "neutral" },
          fx: { kind: "exclaim", on: "TC" },
        },
        // "Nhiều người còn lúng túng"
        { line: 2, at: 0.65, tc: { expr: "confused", move: "shake" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    chot: {
      shot: "TC đứng chờ đèn đỏ ở ngã tư, đèn chuyển xanh; Ông chốt bằng thành ngữ",
      lines: [tc("Thế là thành phố trăm năm không vội, giờ cũng phải học đứng chờ."), cd("Ừ. Chậm mà chắc, cháu ạ.")],
      stage: [
        { line: 0, tc: { arms: "hips", expr: "smug", move: "idle" } },
        {
          line: 0,
          at: 0.7,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 1.3, scale: 0.7 },
            { id: "den", prop: { id: "cl-den-giao-thong", text: "xanh" }, x: 0.16, scale: 0.75 },
          ],
          fx: { kind: "sparkle", on: "TC" },
        },
        { line: 1, camera: "CD", cd: { expr: "happy", arms: "raise" }, fx: { kind: "hearts", on: "CD" } },
      ],
    },
  }),
];
