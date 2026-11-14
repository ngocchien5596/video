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
      { title: "VnExpress: Đà Lạt sẽ lắp đèn xanh đèn đỏ (11/3/2021)", url: "https://vnexpress.net/da-lat-se-lap-den-xanh-den-do-4246962.html" },
      {
        title: "Báo Pháp Luật Việt Nam: Người Đà Lạt ngỡ ngàng với đèn xanh đèn đỏ (18/11/2021)",
        url: "https://baophapluat.vn/nguoi-da-lat-ngo-ngang-voi-den-xanh-den-do-post422402.html",
      },
      {
        title: "Việt Nam News: Đà Lạt gets 1st traffic signal, more planned (8/10/2021)",
        url: "https://vietnamnews.vn/society/1055420/da-lat-gets-1st-traffic-signal-more-planned.html",
      },
    ],
    facts: [
      { beat: "call", big: "GẦN 100 NĂM", label: "Đà Lạt không có một cột đèn giao thông nào" },
      { beat: "twist", line: 1, big: "ÍT NHẤT 4 LẦN", label: "công an đề xuất lắp đèn trong 12 năm, đều không được chấp thuận" },
      { beat: "twist", line: 2, big: "HƠN 7 TRIỆU", label: "lượt khách mỗi năm, cuối tuần, lễ Tết là kẹt xe" },
      { beat: "twist", line: 3, big: "CUỐI 2021", label: "đèn xanh đèn đỏ bắt đầu chạy thử ở các nút giao" },
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
      shot: "Ông kể (khung gọi phóng to); cảnh dốc có xe máy leo, đèn đỏ tưởng tượng bắt dừng giữa dốc; TC làm động tác bóp phanh mỏi tay",
      lines: [
        cd("Đà Lạt toàn đường dốc. Đang leo mà gặp đèn đỏ, xe phải dừng giữa dốc thì rất nguy hiểm."),
        tc("Thảo nào! Bắt dừng xe giữa con dốc thế này thì giữ phanh mỏi cả tay."),
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
        // "giữ phanh mỏi cả tay": TC làm động tác bóp phanh, run tay
        { line: 1, tc: { arms: "hold2", expr: "sad", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    twist: {
      shot: "Ông bảo lý do lạ nhất là con người; ngã tư xe đi chậm; công an đề xuất 4 lần không được; khách đông, kẹt xe; cuối 2021 đèn chạy thử, những ngày đầu lúng túng, có xe vượt đèn đỏ; ý kiến người dân: bất tiện nhưng cần thiết",
      lines: [
        cd("Nhưng lý do lạ nhất lại nằm ở con người."),
        cd("Người Đà Lạt quen đi chậm, không lấn làn, không có gì phải vội. Mười hai năm, công an ít nhất bốn lần đề xuất lắp đèn, đều không được chấp thuận."),
        cd("Có điều, mỗi năm Đà Lạt đón hơn 7 triệu lượt khách, xe cộ ngày càng đông, cứ cuối tuần, lễ Tết là kẹt."),
        cd("Cuối năm 2021, đèn xanh đèn đỏ bắt đầu chạy thử. Những ngày đầu nhiều người lúng túng, dừng quá vạch, có xe còn vượt đèn đỏ, cảnh sát giao thông phải đứng hướng dẫn."),
        cd("Một chị ở Đà Lạt nói với báo: chờ đèn đỏ khá là bất tiện, nhưng về lâu dài thì rất cần thiết."),
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
        // "công an ít nhất bốn lần đề xuất lắp đèn, đều không được chấp thuận"
        { line: 1, at: 0.62, tc: { expr: "shock", arms: "up2" }, fx: { kind: "surprise", on: "TC" } },
        // "hơn 7 triệu lượt khách, xe cộ ngày càng đông": xe nối đuôi nhau kẹt ở ngã tư
        {
          line: 2,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.62, scale: 0.7 },
            { id: "xe2", prop: { id: "cl-xe-may", text: "vang" }, x: 0.84, scale: 0.65 },
            { id: "xe4", prop: { id: "cl-xe-may", text: "xanh" }, x: 0.12, scale: 0.68 },
          ],
          tc: { arms: "down", expr: "shock", move: "idle" },
        },
        { line: 2, at: 0.7, tc: { arms: "hips", expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
        // "Cuối năm 2021, đèn xanh đèn đỏ bắt đầu chạy thử"
        {
          line: 3,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.78, scale: 0.7 },
            { id: "den", prop: { id: "cl-den-giao-thong", text: "do" }, x: 0.16, scale: 0.75 },
          ],
          tc: { arms: "down", expr: "happy" },
          fx: { kind: "exclaim", on: "TC" },
        },
        // "nhiều người lúng túng, dừng quá vạch"
        { line: 3, at: 0.3, tc: { expr: "confused", move: "shake" }, fx: { kind: "question", on: "TC" } },
        // "có xe còn vượt đèn đỏ": một xe lao qua khi đèn đang đỏ
        {
          line: 3,
          at: 0.55,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.78, scale: 0.7 },
            { id: "den", prop: { id: "cl-den-giao-thong", text: "do" }, x: 0.16, scale: 0.75 },
            { id: "xe5", prop: { id: "cl-xe-may", text: "vang" }, x: 0.5, scale: 0.65 },
          ],
          tc: { expr: "shock", move: "idle", arms: "up2" },
          fx: { kind: "surprise", on: "TC" },
        },
        {
          line: 3,
          at: 0.75,
          items: [
            { id: "xe1", prop: { id: "cl-xe-may", text: "do" }, x: 0.78, scale: 0.7 },
            { id: "den", prop: { id: "cl-den-giao-thong", text: "do" }, x: 0.16, scale: 0.75 },
            { id: "xe5", prop: { id: "cl-xe-may", text: "vang" }, x: 1.35, scale: 0.65 },
          ],
          tc: { arms: "point", expr: "angry" },
        },
        // Ý kiến người dân: bất tiện nhưng cần thiết
        // Giữ toàn cảnh (khung gọi nhỏ) để không che thẻ "CUỐI 2021"; TC gật gù đồng tình.
        { line: 4, cd: { expr: "neutral", arms: "raise" }, tc: { arms: "down", expr: "happy", move: "bounce" } },
        { line: 4, at: 0.6, cd: { expr: "happy", arms: "point" }, fx: { kind: "sparkle", on: "CD" } },
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
