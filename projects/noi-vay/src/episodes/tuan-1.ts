import { cd, makeEpisode, tc } from "./make.ts";

const week = 1;
const theme = "Ăn uống";

export const TUAN_1 = [
  makeEpisode({
    day: 1,
    week,
    theme,
    idiom: "Ăn quả nhớ kẻ trồng cây",
    meaning: "Được hưởng điều tốt đẹp thì phải biết ơn người đã vất vả làm ra cho mình.",
    question: "Hôm nay ai là người nấu cơm cho bạn ăn? Nhớ cảm ơn nhé!",
    hook: {
      shot: "TC đội mũ thám tử, cầm kính lúp soi quả xoài, đeo balo chuẩn bị lên đường",
      lines: [tc("Tìm ra manh mối của 'kẻ trồng cây' rồi ông ơi!")],
      stage: [
        {
          cut: true,
          scene: "home",
          cd: { x: 0.26 },
          tc: { x: 1.2, head: "detective-hat", back: "backpack", hand: "magnifier", arms: "hold", expr: "smug" },
          items: [{ id: "xoai", prop: "mango", x: 0.47 }],
        },
        { line: 0, tc: { x: 0.64 } },
        { line: 0, at: 0.5, camera: "TC", tc: { arms: "point", expr: "happy", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "wide", cd: { expr: "confused", arms: "hips" }, tc: { arms: "hold", expr: "neutral", move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, cd: { expr: "neutral", arms: "down" }, tc: { arms: "raise", expr: "happy", move: "bounce" } },
    ],
    ask: "Mày soi cái gì đấy?",
    misread: {
      shot: "TC ăn xoài xong giơ lệnh truy nã 'Kẻ trồng xoài', soi quả xoài rồi chỉ thẳng vào Cụ Đồ; Cụ Đồ cãi lại rằng hạt xoài là do TC nhổ ra, TC sững người, cầm lệnh truy nã tên mình và giơ hai tay xin tự thú",
      lines: [
        tc("Ông dặn ăn quả phải nhớ kẻ trồng cây. Chữ 'kẻ' nghe như 'kẻ gian', nên cháu lập hồ sơ truy nã luôn!"),
        cd("Truy nã ai?!"),
        tc("Manh mối đây! Quả xoài này hái từ cây ngoài vườn. Ông! Kẻ trồng cây chính là ông!"),
        cd("Ông chỉ tưới thôi! Hạt xoài là mày nhổ ra năm ngoái đấy!"),
        tc("Vậy kẻ trồng cây là cháu?! Cháu xin tự thú!"),
      ],
      stage: [
        // "Ông dặn ăn quả phải nhớ kẻ trồng cây": vừa gặm xoài vừa nói
        { line: 0, camera: "TC", tc: { hand: "mango-bitten", arms: "hold", expr: "smug", move: "idle" }, items: [] },
        // "Chữ 'kẻ' nghe như 'kẻ gian'"
        { line: 0, at: 0.39, tc: { expr: "shock", move: "shake" }, fx: { kind: "anger", on: "TC" } },
        // "nên cháu lập hồ sơ truy nã luôn!"
        { line: 0, at: 0.65, tc: { hand: { id: "sign", text: "TRUY NÃ KẺ TRỒNG XOÀI" }, arms: "hold2", expr: "angry", move: "bounce" } },
        // "Truy nã ai?!"
        { line: 1, camera: "CD", cd: { expr: "shock", arms: "up2", move: "jump" }, tc: { move: "idle", expr: "neutral" }, fx: { kind: "surprise", on: "CD" } },
        // "Manh mối đây!": cầm kính lúp soi quả xoài
        {
          line: 2,
          camera: "wide",
          cd: { expr: "confused", arms: "down", move: "idle" },
          tc: { hand: "magnifier", arms: "hold", expr: "smug" },
          items: [{ id: "xoai", prop: "mango-bitten", x: 0.47 }],
          fx: { kind: "exclaim", on: "TC" },
        },
        // "Quả xoài này hái từ cây ngoài vườn"
        { line: 2, at: 0.17, camera: "TC", tc: { move: "bounce" } },
        // "Ông! Kẻ trồng cây": quay sang chỉ thẳng Cụ Đồ
        { line: 2, at: 0.61, camera: "wide", tc: { arms: "point", expr: "angry", move: "idle" }, fx: { kind: "exclaim", on: "TC" } },
        // "chính là ông!": giơ lệnh truy nã, Cụ Đồ run
        {
          line: 2,
          at: 0.83,
          cd: { expr: "shock", arms: "up2", move: "tremble" },
          tc: { hand: { id: "sign", text: "TRUY NÃ KẺ TRỒNG XOÀI" }, arms: "hold2", expr: "smug", move: "bounce" },
          fx: { kind: "sweat", on: "CD" },
        },
        // "Ông chỉ tưới thôi!": Cụ Đồ tức, chỉ lại Thằng Cháu
        { line: 3, camera: "CD", cd: { expr: "angry", arms: "point", move: "idle" }, tc: { move: "idle", expr: "confused" }, fx: { kind: "anger", on: "CD" } },
        // "là mày nhổ ra năm ngoái đấy!": Thằng Cháu sững người
        { line: 3, at: 0.54, camera: "TC", tc: { expr: "shock", move: "shake" }, fx: { kind: "surprise", on: "TC" } },
        // "Vậy kẻ trồng cây là cháu?!": lệnh truy nã giờ ghi tên mình
        { line: 4, camera: "TC", tc: { hand: { id: "sign", text: "TRUY NÃ: CHÁU" }, arms: "hold2", expr: "shock", move: "idle" } },
        // "Cháu xin tự thú!": giơ hai tay đầu hàng
        {
          line: 4,
          at: 0.6,
          camera: "wide",
          cd: { expr: "confused", arms: "down" },
          tc: { arms: "up2", expr: "sad", move: "tremble" },
          fx: [
            { kind: "sweat", on: "TC" },
            { kind: "question", on: "CD" },
          ],
        },
      ],
    },
    flipStage: [
      // Cụ Đồ tiến tới, vung quạt
      { line: 0, camera: "wide", cd: { x: 0.42, arms: "hit", expr: "angry" }, tc: { move: "idle", arms: "down" } },
      {
        line: 0,
        at: 0.3,
        fx: { kind: "bop", on: "TC" },
        tc: { expr: "shock", move: "tremble", face: null, hand: null },
        items: [{ id: "xoai-roi", prop: "mango-bitten", x: 0.82 }],
      },
      // Giảng nghĩa thật
      { line: 1, camera: "CD", cd: { x: 0.3, arms: "point", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" } },
      { line: 1, at: 0.45, camera: "wide", cd: { arms: "wave", expr: "happy" } },
      { line: 1, at: 0.85, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Chữ 'kẻ' ngày xưa nghĩa là 'người' thôi! Câu này dặn mình: được hưởng cái gì tốt đẹp thì phải biết ơn người đã vất vả làm ra.",
    example: {
      shot: "Cảnh mâm cơm gia đình và lớp học",
      lines: [
        cd("Như bát cơm mình ăn, là mồ hôi bác nông dân cấy gặt, là bố mẹ đi làm vất vả mới mua được gạo. Có bài học hay là nhờ thầy cô dạy dỗ. Ăn xong, học xong, phải biết cảm ơn!"),
      ],
      stage: [
        // "Như bát cơm mình ăn"
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.27, arms: "point", expr: "happy" },
          tc: { x: 0.69, head: null, back: null, hand: "bowl", arms: "hold", expr: "happy", move: "idle" },
          items: [{ id: "mam", prop: "rice-tray", x: 0.5, on: "table" }],
        },
        // "là mồ hôi bác nông dân cấy gặt"
        { line: 0, at: 0.12, cd: { expr: "neutral" }, tc: { expr: "confused" }, fx: { kind: "sweat", on: "TC" } },
        // "là bố mẹ đi làm vất vả mới mua được gạo"
        { line: 0, at: 0.31, cd: { arms: "raise" }, tc: { arms: "hold2", expr: "neutral" } },
        // "Có bài học hay là nhờ thầy cô dạy dỗ"
        {
          line: 0,
          at: 0.57,
          cut: true,
          scene: { id: "classroom", text: "CẢM ƠN\nTHẦY CÔ!" },
          cd: { arms: "raise", expr: "neutral" },
          tc: { hand: "book", arms: "hold2", expr: "neutral" },
          items: [],
        },
        // "Ăn xong, học xong, phải biết cảm ơn!"
        {
          line: 0,
          at: 0.81,
          cut: true,
          scene: "kitchen",
          cd: { arms: "down", expr: "happy" },
          tc: { hand: null, arms: "hold2", expr: "happy" },
          items: [{ id: "mam", prop: "rice-tray", x: 0.5, on: "table" }],
          fx: { kind: "hearts", on: "TC" },
        },
      ],
    },
    punchline: {
      shot: "TC ôm nồi cơm điện cảm ơn rối rít, rồi đẩy chồng bát bẩn sang phía Cụ Đồ",
      lines: [
        tc("Cháu hiểu rồi! Ăn cơm phải nhớ ơn người nấu, cảm ơn bác nồi cơm điện ạ!"),
        tc("Còn ông chỉ bấm nút thôi, nên ông rửa bát nhé!"),
      ],
      stage: [
        // "Cháu hiểu rồi! Ăn cơm phải nhớ ơn người nấu"
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.27, expr: "happy", arms: "down" },
          tc: { x: 0.69, hand: null, arms: "point", expr: "smug", move: "idle" },
          items: [
            { id: "noi", prop: "rice-cooker", x: 0.48, on: "table" },
            { id: "bat", prop: "bowls", x: 0.68, on: "table" },
          ],
        },
        // "cảm ơn bác nồi cơm điện ạ!": ôm nồi cơm cảm ơn
        {
          line: 0,
          at: 0.59,
          tc: { hand: "rice-cooker", arms: "hold2", expr: "happy", move: "bounce" },
          cd: { expr: "confused" },
          items: [{ id: "bat", prop: "bowls", x: 0.68, on: "table" }],
          fx: [
            { kind: "hearts", on: "TC" },
            { kind: "question", on: "CD" },
          ],
        },
        // "Còn ông chỉ bấm nút thôi"
        { line: 1, camera: "CD", cd: { expr: "shock" }, tc: { move: "idle", expr: "smug" }, fx: { kind: "sweat", on: "CD" } },
        // "nên ông rửa bát nhé!": đẩy chồng bát sang phía Cụ Đồ
        {
          line: 1,
          at: 0.55,
          camera: "wide",
          tc: { x: 0.6 },
          items: [{ id: "bat", prop: "bowls", x: 0.27, on: "table" }],
        },
        { line: 1, at: 0.85, cd: { expr: "angry", move: "tremble" }, tc: { x: 0.69, expr: "happy", move: "bounce" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 2,
    week,
    theme,
    idiom: "Ăn trông nồi ngồi trông hướng",
    meaning: "Ăn uống, đi đứng phải lịch sự, biết quan tâm và nhường nhịn mọi người xung quanh.",
    question: "Món gì trên mâm cơm làm bạn dễ 'quên trông nồi' nhất?",
    hook: {
      shot: "Bàn ăn có đĩa đùi gà rán, TC cầm la bàn xoay ghế liên tục",
      lines: [tc("Lệch 15 độ Bắc... Thảo nào ăn cơm mãi không thấy no!")],
      stage: [
        // Xoay ghế liên tục theo la bàn trước đĩa gà rán
        {
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.26, expr: "confused" },
          tc: { x: 0.69, hand: "compass", arms: "hold", expr: "confused", move: "shake" },
          items: [{ id: "ga", prop: "chicken-plate", x: 0.5, on: "table" }],
        },
        // "Thảo nào ăn cơm mãi không thấy no!"
        { line: 0, at: 0.45, camera: "TC", tc: { expr: "sad", move: "idle" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { expr: "confused", arms: "hips" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "neutral" }, tc: { arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Xoay chóng cả mặt, làm trò gì đấy?",
    misread: {
      shot: "TC chỉnh ghế theo la bàn, hai tay ôm khư khư nồi cơm điện, mắt nhìn CĐ đầy cảnh giác",
      lines: [
        tc("Ngồi trông hướng là phải tra la bàn cho chuẩn hướng Đông Nam!"),
        tc("Còn ăn trông nồi là cháu phải ôm chặt nồi cơm để canh chừng, kẻo có ai ăn vụng!"),
        cd("Ông ăn cơm nhà ông mà mày canh như canh trộm thế à?!"),
      ],
      stage: [
        // "Ngồi trông hướng là phải tra la bàn"
        { line: 0, camera: "TC", tc: { hand: "compass", arms: "hold", expr: "smug", move: "idle" } },
        // "cho chuẩn hướng Đông Nam!"
        { line: 0, at: 0.6, tc: { move: "jump", expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        // "Còn ăn trông nồi là cháu phải ôm chặt nồi cơm"
        {
          line: 1,
          camera: "wide",
          tc: { hand: "rice-cooker", arms: "hold2", expr: "neutral", move: "idle" },
          items: [{ id: "ga", prop: "chicken-plate", x: 0.5, on: "table" }],
        },
        // "để canh chừng": mắt nhìn Cụ Đồ đầy cảnh giác
        { line: 1, at: 0.55, tc: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "TC" } },
        // "kẻo có ai ăn vụng!"
        { line: 1, at: 0.78, cd: { expr: "confused" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
        // "Ông ăn cơm nhà ông mà mày canh như canh trộm"
        { line: 2, camera: "CD", cd: { expr: "angry", arms: "point" }, fx: { kind: "anger", on: "CD" } },
        { line: 2, at: 0.65, camera: "wide", cd: { move: "shake" }, tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble", hand: null } },
      // "Trông nồi là để ý xem cơm canh còn nhiều hay ít"
      {
        line: 1,
        camera: "CD",
        cd: { x: 0.3, arms: "point", expr: "neutral", move: "idle" },
        tc: { move: "idle", expr: "confused" },
        items: [
          { id: "ga", prop: "chicken-plate", x: 0.5, on: "table" },
          { id: "noi", prop: "rice-cooker", x: 0.72, on: "table" },
        ],
      },
      // "mà chừa phần cho cả nhà"
      { line: 1, at: 0.4, camera: "wide", cd: { arms: "wave", expr: "happy" } },
      // "Ngồi trông hướng là ngồi ngay ngắn, lịch sự"
      { line: 1, at: 0.62, cd: { arms: "raise" }, tc: { arms: "down", expr: "neutral" } },
      { line: 1, at: 0.9, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Trông nồi là để ý xem cơm canh còn nhiều hay ít mà chừa phần cho cả nhà. Ngồi trông hướng là ngồi ngay ngắn, lịch sự, không chắn lối đi.",
    example: {
      shot: "Cảnh ăn đùi gà rán cùng gia đình, bạn bè",
      lines: [
        cd("Như đĩa gà rán có 4 miếng cho 4 người, mày chén một mình 3 miếng là không 'trông nồi'. Vừa ăn vừa gác chân lên ghế là không 'trông hướng'!"),
      ],
      stage: [
        // "Như đĩa gà rán có 4 miếng cho 4 người"
        { line: 0, camera: "wide", cd: { arms: "point", expr: "neutral" }, tc: { hand: null, arms: "down", expr: "neutral" }, items: [{ id: "ga", prop: "chicken-plate", x: 0.5, on: "table" }] },
        // "mày chén một mình 3 miếng"
        { line: 0, at: 0.3, tc: { hand: "drumstick", arms: "hold", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        // "là không 'trông nồi'"
        { line: 0, at: 0.52, cd: { expr: "angry" }, tc: { expr: "shock", move: "idle" }, fx: { kind: "anger", on: "CD" } },
        // "Vừa ăn vừa gác chân lên ghế"
        { line: 0, at: 0.66, tc: { arms: "hips", expr: "smug", move: "bounce" }, fx: { kind: "sweat", on: "CD" } },
        // "là không 'trông hướng'!"
        { line: 0, at: 0.87, camera: "CD", cd: { arms: "point", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "exclaim", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC gắp 1 miếng gà vào bát CĐ, rồi bê nguyên đĩa gà còn lại chạy biến",
      lines: [
        tc("Cháu trông kỹ rồi! Nồi cơm vẫn còn đầy nên cháu nhường ông trông nồi..."),
        tc("...còn cháu xin phép trông hộ ông đĩa gà rán ạ!"),
      ],
      stage: [
        // "Cháu trông kỹ rồi! Nồi cơm vẫn còn đầy"
        {
          line: 0,
          camera: "wide",
          cd: { expr: "neutral", arms: "down" },
          tc: { hand: null, arms: "point", expr: "smug", move: "idle" },
          items: [
            { id: "noi", prop: "rice-cooker", x: 0.45, on: "table" },
            { id: "ga", prop: "chicken-plate", x: 0.62, on: "table" },
          ],
        },
        // "nên cháu nhường ông trông nồi": đẩy nồi cơm sang phía ông
        {
          line: 0,
          at: 0.6,
          cd: { expr: "happy" },
          items: [
            { id: "noi", prop: "rice-cooker", x: 0.27, on: "table" },
            { id: "ga", prop: "chicken-plate", x: 0.62, on: "table" },
          ],
        },
        // "còn cháu xin phép trông hộ ông đĩa gà rán": bê nguyên đĩa gà
        { line: 1, camera: "TC", tc: { hand: "chicken-plate", arms: "hold2", expr: "happy" }, items: [{ id: "noi", prop: "rice-cooker", x: 0.27, on: "table" }] },
        // ...rồi chạy biến
        { line: 1, at: 0.5, camera: "wide", tc: { x: 1.25, move: "bounce" }, cd: { expr: "shock", arms: "up2", move: "jump" }, fx: { kind: "surprise", on: "CD" } },
        { line: 1, at: 0.9, cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 3,
    week,
    theme,
    idiom: "Ăn cháo đá bát",
    meaning: "Vô ơn, được người khác giúp đỡ xong lại quay lưng nói xấu hoặc đối xử tệ với họ.",
    question: "Bạn từng cho ai mượn bút hay đồ chơi mà lúc đòi lại còn bị giận chưa?",
    hook: {
      shot: "TC mặc áo cầu thủ, đặt cái bát nhựa xuống sân, lùi lại lấy đà như chuẩn bị sút phạt",
      lines: [tc("Lùi ra sau hàng rào đi ông, quả này cháu sút căng đấy!")],
      stage: [
        // Đặt bát nhựa xuống sân như đặt bóng sút phạt
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.2, expr: "confused" },
          tc: { x: 0.6, arms: "point", expr: "smug" },
          items: [{ id: "bat", prop: "bowl-empty", x: 0.43 }],
        },
        // "quả này cháu sút căng đấy!": lùi lại lấy đà
        { line: 0, at: 0.45, tc: { x: 0.8, arms: "hips", expr: "angry" } },
        { line: 0, at: 0.85, camera: "TC", tc: { move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { expr: "confused", arms: "point" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down" }, tc: { arms: "raise", expr: "happy", move: "bounce" } },
    ],
    ask: "Mang bát ăn cơm ra sân làm gì?",
    misread: {
      shot: "TC húp xong cháo, đặt bát nhựa xuống sút tung lên trời, rồi xếp tiếp một hàng bát nhựa",
      lines: [
        tc("Thì ông dạy thế nào cháu làm đúng thế đấy! Ăn xong bát cháo là phải sút một cú thật đẹp!"),
        tc("Sáng nay cháu ăn hai bát, nên phải đá đủ hai quả mới đúng luật!"),
        cd("Mày đá vỡ hết bát thì trưa nay cả nhà ăn cơm bằng vung nồi à?!"),
      ],
      stage: [
        // "Thì ông dạy thế nào cháu làm đúng thế đấy!": cầm bát húp
        { line: 0, camera: "TC", tc: { x: 0.62, hand: "bowl-empty", arms: "hold2", expr: "smug", move: "idle" }, items: [] },
        // "Ăn xong bát cháo"
        { line: 0, at: 0.5, tc: { expr: "happy" }, fx: { kind: "sparkle", on: "TC" } },
        // "là phải sút một cú thật đẹp!": đặt bát xuống, sút bay
        { line: 0, at: 0.68, camera: "wide", tc: { hand: null, arms: "down" }, items: [{ id: "bat", prop: "bowl-empty", x: 0.52 }] },
        { line: 0, at: 0.8, tc: { arms: "up2", move: "jump" }, items: [{ id: "bat", prop: "bowl-empty", x: 1.3 }], fx: { kind: "bop", on: "TC", text: "SÚT!" } },
        { line: 0, at: 0.9, cd: { expr: "shock", arms: "up2" }, fx: { kind: "surprise", on: "CD" } },
        // "Sáng nay cháu ăn hai bát": xếp tiếp một hàng bát
        {
          line: 1,
          camera: "wide",
          cd: { arms: "down", expr: "confused" },
          tc: { arms: "raise", expr: "smug", move: "idle" },
          items: [
            { id: "b1", prop: "bowl-empty", x: 0.42 },
            { id: "b2", prop: "bowl-empty", x: 0.52 },
          ],
        },
        // "nên phải đá đủ hai quả mới đúng luật!"
        { line: 1, at: 0.5, camera: "TC", tc: { expr: "happy", move: "bounce" }, fx: { kind: "exclaim", on: "TC", text: "2!" } },
        // "Mày đá vỡ hết bát"
        { line: 2, camera: "CD", cd: { expr: "angry", arms: "point", move: "shake" }, tc: { move: "idle" }, fx: { kind: "anger", on: "CD" } },
        // "ăn cơm bằng vung nồi à?!"
        { line: 2, at: 0.6, camera: "wide", cd: { move: "idle" }, tc: { expr: "shock", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      // Cụ Đồ cầm chổi đỡ cái bát như thủ môn bắt bóng
      { line: 0, camera: "wide", cd: { x: 0.36, hand: "broom", arms: "up2", expr: "angry", move: "jump" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.4, items: [{ id: "b1", prop: "bowl-empty", x: 0.42 }], fx: { kind: "exclaim", on: "CD", text: "BẮT!" } },
      { line: 0, at: 0.7, cd: { hand: "bowl-empty", arms: "hold", expr: "smug", move: "idle" }, items: [], fx: { kind: "sparkle", on: "CD" } },
      // "Ngày xưa lúc đói được người ta thương, cho bát cháo ăn"
      { line: 1, camera: "CD", cd: { x: 0.3, expr: "neutral" }, tc: { expr: "confused", move: "idle" } },
      // "Ăn no xong lại đá tung cái bát đi"
      { line: 1, at: 0.33, camera: "wide", tc: { expr: "smug", move: "bounce" } },
      // "nghĩa là kẻ vô ơn"
      { line: 1, at: 0.56, cd: { hand: "fan", arms: "point", expr: "angry" }, tc: { expr: "shock", move: "idle" }, fx: { kind: "anger", on: "CD" } },
      // "được bạn giúp xong lại quay ra đối xử tệ với bạn!"
      { line: 1, at: 0.85, tc: { expr: "sad", arms: "down" }, fx: { kind: "sweat", on: "TC" } },
    ],
    explain:
      "Ngày xưa lúc đói được người ta thương, cho bát cháo ăn. Ăn no xong lại đá tung cái bát đi — nghĩa là kẻ vô ơn, được bạn giúp xong lại quay ra đối xử tệ với bạn!",
    flipShot: "Cụ Đồ dùng chổi đỡ cái bát nhựa như thủ môn bắt bóng",
    example: {
      shot: "Cảnh bàn học ở lớp, cho bạn mượn bút",
      lines: [
        cd("Như ở lớp quên mang bút, bạn tốt bụng cho mượn bút làm bài kiểm tra. Thế mà hết giờ không cảm ơn, còn làm hỏng bút rồi đổ thừa tại bút của bạn dởm!"),
      ],
      stage: [
        // "Như ở lớp quên mang bút"
        {
          line: 0,
          cut: true,
          scene: { id: "classroom", text: "KIỂM TRA\nTOÁN" },
          camera: "wide",
          cd: { x: 0.27, hand: null, arms: "down", expr: "neutral" },
          tc: { x: 0.68, hand: null, arms: "shrug", expr: "sad", move: "idle" },
          items: [],
        },
        // "bạn tốt bụng cho mượn bút"
        { line: 0, at: 0.2, cd: { hand: "pen", arms: "hold", expr: "happy" } },
        { line: 0, at: 0.32, cd: { hand: null, arms: "down" }, tc: { hand: "pen", arms: "hold", expr: "happy" } },
        // "Thế mà hết giờ không cảm ơn"
        { line: 0, at: 0.6, tc: { expr: "smug" }, cd: { expr: "confused" }, fx: { kind: "question", on: "CD" } },
        // "còn làm hỏng bút"
        { line: 0, at: 0.78, tc: { hand: null, expr: "shock" }, fx: { kind: "bop", on: "TC", text: "RẮC!" } },
        // "rồi đổ thừa tại bút của bạn dởm!"
        { line: 0, at: 0.88, camera: "TC", tc: { arms: "point", expr: "angry" }, cd: { expr: "angry" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC ôm cái bát vào lòng, lấy chăn đắp cho cái bát trên ghế sofa",
      lines: [
        tc("Cháu sợ mang tiếng vô ơn lắm! Ăn cháo xong cháu đắp chăn ru cái bát ngủ luôn..."),
        tc("...Rửa nước lạnh bát nó cảm lạnh ông ạ, đống bát trong bồn ông rửa hộ cháu nhé!"),
      ],
      stage: [
        // "Cháu sợ mang tiếng vô ơn lắm!": ôm cái bát vào lòng
        {
          line: 0,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.66, hand: "bowl-empty", arms: "hold2", expr: "sad", move: "idle" },
          items: [],
        },
        // "đắp chăn ru cái bát ngủ luôn"
        { line: 0, at: 0.5, camera: "TC", tc: { expr: "happy", move: "bounce" }, items: [{ id: "goi", prop: "pillow", x: 0.86 }], fx: { kind: "hearts", on: "TC" } },
        // "Rửa nước lạnh bát nó cảm lạnh ông ạ"
        { line: 1, tc: { expr: "sad", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
        // "đống bát trong bồn ông rửa hộ cháu nhé!": đẩy chồng bát bẩn sang ông
        {
          line: 1,
          at: 0.5,
          camera: "wide",
          tc: { arms: "point", expr: "smug", move: "idle" },
          items: [
            { id: "goi", prop: "pillow", x: 0.86 },
            { id: "chong", prop: "bowls", x: 0.5 },
          ],
        },
        {
          line: 1,
          at: 0.72,
          items: [
            { id: "goi", prop: "pillow", x: 0.86 },
            { id: "chong", prop: "bowls", x: 0.36 },
          ],
        },
        { line: 1, at: 0.9, cd: { expr: "angry", move: "tremble" }, tc: { expr: "happy", move: "bounce" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 4,
    week,
    theme,
    idiom: "Ăn cây nào rào cây nấy",
    meaning: "Gắn bó với gia đình, trường lớp, tập thể nào thì phải biết yêu quý, giữ gìn và bảo vệ nơi đó.",
    question: "Ở trường hoặc ở nhà, góc nào là nơi bạn yêu thích nhất?",
    hook: {
      shot: "TC bê bìa carton và băng dính quấn kín quanh cái tủ lạnh trong bếp",
      lines: [tc("Cấm ai lại gần! Khu vực này đã được cháu rào kín!")],
      stage: [
        // Tủ lạnh quấn bìa carton và băng dính, Thằng Cháu đứng chắn
        {
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.22, expr: "confused" },
          tc: { x: 0.58, arms: "up2", expr: "angry", move: "bounce" },
          items: [{ id: "tu", prop: { id: "fridge", text: "CẤM\nLẠI GẦN" }, x: 0.84, scale: 1.2 }],
        },
        // "Khu vực này đã được cháu rào kín!"
        { line: 0, at: 0.5, camera: "TC", tc: { arms: "hips", expr: "smug", move: "idle" }, fx: { kind: "exclaim", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { expr: "confused", arms: "point" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down" }, tc: { arms: "raise", expr: "happy", move: "bounce" } },
    ],
    ask: "Mày dán kín cái tủ lạnh làm gì?",
    misread: {
      shot: "TC chỉ cây ổi ngoài sân bị quấn dây, chậu cà chua bị cắm que rào, rồi đứng chắn trước tủ lạnh",
      lines: [
        tc("Trưa nay cháu ăn ổi nên cháu rào cây ổi. Cháu ăn canh cà chua nên cháu rào luôn chậu cà chua!"),
        tc("Mà nãy cháu vừa ăn kem trong tủ lạnh... nên cháu phải rào luôn cái tủ lạnh cho chắc!"),
        cd("Thế tối nay mẹ mày mở tủ lạnh nấu cơm kiểu gì hả cháu?!"),
      ],
      stage: [
        // "Trưa nay cháu ăn ổi nên cháu rào cây ổi"
        {
          line: 0,
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.2, expr: "confused", arms: "down" },
          tc: { x: 0.48, arms: "point", expr: "smug", move: "idle" },
          items: [{ id: "oi", prop: { id: "plant", text: "CÂY ỔI" }, x: 0.82, scale: 1.25 }],
        },
        { line: 0, at: 0.35, camera: "TC", tc: { move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
        // "Cháu ăn canh cà chua nên cháu rào luôn chậu cà chua!"
        {
          line: 0,
          at: 0.5,
          camera: "wide",
          tc: { x: 0.4, move: "idle" },
          items: [
            { id: "oi", prop: { id: "plant", text: "CÂY ỔI" }, x: 0.82, scale: 1.25 },
            { id: "cachua", prop: { id: "plant", text: "CÀ CHUA" }, x: 0.6, scale: 0.85 },
          ],
        },
        { line: 0, at: 0.82, cd: { expr: "shock" }, fx: { kind: "question", on: "CD" } },
        // "Mà nãy cháu vừa ăn kem trong tủ lạnh"
        {
          line: 1,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.22, expr: "confused" },
          tc: { x: 0.6, arms: "hips", expr: "smug" },
          items: [{ id: "tu", prop: { id: "fridge", text: "CẤM\nLẠI GẦN" }, x: 0.84, scale: 1.2 }],
        },
        // "nên cháu phải rào luôn cái tủ lạnh cho chắc!": đứng chắn trước tủ
        { line: 1, at: 0.6, camera: "TC", tc: { arms: "up2", expr: "angry", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
        // "Thế tối nay mẹ mày mở tủ lạnh nấu cơm kiểu gì"
        { line: 2, camera: "CD", cd: { arms: "hips", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "anger", on: "CD" } },
        { line: 2, at: 0.6, camera: "wide", tc: { expr: "shock", arms: "down", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble", hand: null } },
      // "Cây cho mình quả ngọt thì mình rào chắn, chăm sóc cho cây"
      { line: 1, camera: "CD", cd: { x: 0.3, arms: "point", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" } },
      // "Ý ông bà là mình sống trong gia đình nào, học ở trường lớp nào"
      { line: 1, at: 0.32, camera: "wide", cd: { arms: "wave", expr: "happy" } },
      // "thì phải biết yêu thương, giữ gìn và bảo vệ nơi đó!"
      { line: 1, at: 0.72, tc: { expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
      { line: 1, at: 0.92, tc: { arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Cây cho mình quả ngọt thì mình rào chắn, chăm sóc cho cây. Ý ông bà là mình sống trong gia đình nào, học ở trường lớp nào thì phải biết yêu thương, giữ gìn và bảo vệ nơi đó!",
    example: {
      shot: "Cảnh sân trường, cổ vũ đá bóng lớp",
      lines: [
        cd("Như mày học lớp 5A thì phải giữ lớp sạch đẹp, cổ vũ cho đội bóng của lớp mình. Đang đá cho lớp 5A mà chạy sang... reo hò khi đội bạn ghi bàn là dở rồi!"),
      ],
      stage: [
        // "Như mày học lớp 5A thì phải giữ lớp sạch đẹp": quét lớp
        {
          line: 0,
          cut: true,
          scene: { id: "classroom", text: "LỚP 5A" },
          camera: "wide",
          cd: { x: 0.27, arms: "point", expr: "happy" },
          tc: { x: 0.68, hand: "broom", arms: "hold2", expr: "happy", move: "bounce" },
          items: [],
        },
        // "cổ vũ cho đội bóng của lớp mình"
        {
          line: 0,
          at: 0.32,
          cut: true,
          scene: "yard",
          cd: { arms: "down" },
          tc: { x: 0.62, hand: { id: "paper", text: "5A\nCỐ LÊN!" }, arms: "hold2", expr: "happy", move: "bounce" },
          items: [{ id: "bong", prop: "ball", x: 0.45 }],
          fx: { kind: "sparkle", on: "TC" },
        },
        // "Đang đá cho lớp 5A mà chạy sang..."
        { line: 0, at: 0.66, tc: { x: 0.86, hand: null, arms: "down", move: "idle" } },
        // "reo hò khi đội bạn ghi bàn": bóng bay vào lưới đội mình
        { line: 0, at: 0.76, tc: { arms: "up2", move: "jump" }, items: [{ id: "bong", prop: "ball", x: -0.2 }], fx: { kind: "exclaim", on: "TC", text: "VÀO!" } },
        // "là dở rồi!"
        { line: 0, at: 0.9, camera: "CD", cd: { expr: "angry", arms: "hips" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC cầm dây ruy-băng quấn quanh người Cụ Đồ, dán giấy 'CỦA CHÁU' lên áo ông",
      lines: [
        tc("Hay quá! Ngày nào cháu cũng được ăn kẹo từ túi áo của ông..."),
        tc("...nên cháu phải rào ông lại, không cho đứa hàng xóm nào sang xin kẹo ông nữa!"),
      ],
      stage: [
        // "Hay quá! Ngày nào cháu cũng được ăn kẹo từ túi áo của ông"
        {
          line: 0,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.3, hand: "fan", arms: "down", expr: "happy" },
          tc: { x: 0.66, hand: "candy", arms: "hold", expr: "happy", move: "bounce" },
          items: [],
          fx: { kind: "hearts", on: "TC" },
        },
        // "nên cháu phải rào ông lại": cầm tờ "CỦA CHÁU"
        { line: 1, camera: "TC", tc: { hand: { id: "paper", text: "CỦA CHÁU" }, arms: "hold", expr: "smug", move: "idle" } },
        // dán lên người ông
        { line: 1, at: 0.3, camera: "wide", tc: { x: 0.46, hand: null, arms: "up2", expr: "happy", move: "bounce" }, cd: { expr: "shock", face: { id: "paper", text: "CỦA CHÁU" } }, fx: { kind: "surprise", on: "CD" } },
        // "không cho đứa hàng xóm nào sang xin kẹo ông nữa!": đứng gác trước mặt ông
        { line: 1, at: 0.6, tc: { x: 0.58, arms: "up2", expr: "angry", move: "idle" }, fx: { kind: "exclaim", on: "TC" } },
        { line: 1, at: 0.9, cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 5,
    week,
    theme,
    idiom: "Ăn xổi ở thì",
    meaning: "Làm việc qua quýt, tạm bợ cho xong chuyện trước mắt mà không chịu cố gắng lâu dài.",
    question: "Ai từng để bài tập về nhà đến tối Chủ nhật mới cuống cuồng làm?",
    hook: {
      shot: "TC dựng lều vải nhỏ giữa phòng khách, cầm đồng hồ báo thức, ôm gối chạy qua chạy lại",
      lines: [tc("Hết 5 phút rồi! Chuyển nhà sang gầm bàn ăn thôi!")],
      stage: [
        // Lều vải giữa phòng khách, đồng hồ báo thức reo
        {
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.2, expr: "confused" },
          tc: { x: 0.56, hand: { id: "alarm-clock", text: "5'" }, arms: "hold", expr: "shock", move: "shake" },
          items: [{ id: "leu", prop: "tent", x: 0.84 }],
        },
        // "Chuyển nhà sang gầm bàn ăn thôi!": ôm gối chạy
        { line: 0, at: 0.35, tc: { x: 0.5, hand: "pillow", arms: "hold2", expr: "happy", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { arms: "hips", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "neutral" }, tc: { x: 0.64, hand: null, arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Nhà cửa đàng hoàng sao cứ chui lủi thế?",
    misread: {
      shot: "TC chấm quả dưa chuột vào muối đếm 1-2-3 rồi ăn luôn, sau đó bê gối chạy theo tiếng đồng hồ",
      lines: [
        tc("Dưa chuột cháu chấm muối 3 giây là ăn luôn, gọi là ăn dưa muối xổi!"),
        tc("Còn 'ở thì' là mỗi giờ cháu ở một góc: 8 giờ ở sofa, 9 giờ chui gầm bàn, 10 giờ ra hiên đứng!"),
        cd("Mày tập làm du mục ngay trong phòng khách đấy à?!"),
      ],
      stage: [
        // "Dưa chuột cháu chấm muối"
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "TC",
          cd: { x: 0.27, expr: "neutral" },
          tc: { x: 0.68, hand: "cucumber", arms: "hold", expr: "smug", move: "idle" },
          items: [{ id: "muoi", prop: "bowl", x: 0.54, on: "table" }],
        },
        // "3 giây là ăn luôn"
        { line: 0, at: 0.38, fx: { kind: "exclaim", on: "TC", text: "1-2-3!" } },
        { line: 0, at: 0.55, tc: { expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        // "Còn 'ở thì' là mỗi giờ cháu ở một góc"
        {
          line: 1,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.2, expr: "confused" },
          tc: { x: 0.5, hand: { id: "alarm-clock", text: "8:00" }, arms: "hold", expr: "smug", move: "idle" },
          items: [
            { id: "leu", prop: "tent", x: 0.84 },
            { id: "goi", prop: "pillow", x: 0.76 },
          ],
        },
        // "8 giờ ở sofa, 9 giờ chui gầm bàn"
        { line: 1, at: 0.45, tc: { x: 0.74, hand: { id: "alarm-clock", text: "9:00" }, move: "bounce" } },
        // "10 giờ ra hiên đứng!"
        { line: 1, at: 0.8, tc: { x: 0.5, hand: { id: "alarm-clock", text: "10:00" } }, cd: { expr: "shock" }, fx: { kind: "question", on: "CD" } },
        // "Mày tập làm du mục ngay trong phòng khách"
        { line: 2, camera: "CD", cd: { arms: "point", expr: "angry" }, tc: { x: 0.62, move: "idle" }, fx: { kind: "anger", on: "CD" } },
        { line: 2, at: 0.6, camera: "wide", tc: { expr: "shock" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      // Cụ Đồ tịch thu cái đồng hồ báo thức
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble", hand: null } },
      { line: 0, at: 0.7, cd: { hand: { id: "alarm-clock", text: "STOP" }, arms: "raise", expr: "smug" }, fx: { kind: "exclaim", on: "CD" } },
      // "Muối xổi là làm vội để ăn ngay"
      { line: 1, camera: "CD", cd: { x: 0.3, hand: "fan", arms: "point", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" }, items: [{ id: "leu", prop: "tent", x: 0.84 }] },
      // "Câu này nhắc nhở đừng làm việc qua quýt"
      { line: 1, at: 0.5, camera: "wide", cd: { arms: "wave", expr: "angry" } },
      // "mà lười rèn luyện lâu dài!"
      { line: 1, at: 0.84, cd: { expr: "neutral" }, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
      { line: 1, at: 0.95, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Muối xổi là làm vội để ăn ngay. Ở thì là ở tạm bợ theo mùa. Câu này nhắc nhở đừng làm việc qua quýt, đối phó cho xong chuyện trước mắt mà lười rèn luyện lâu dài!",
    flipShot: "Cụ Đồ ngồi phịch xuống ghế, tịch thu cái đồng hồ báo thức",
    example: {
      shot: "Cảnh học bài đối phó sát giờ kiểm tra",
      lines: [
        cd("Như cả tuần mải chơi không chịu học, sát giờ kiểm tra mới mở vở học vẹt vài dòng. Hôm đó may thì nhớ, hôm sau hỏi lại là quên sạch sành sanh!"),
      ],
      stage: [
        // "Như cả tuần mải chơi không chịu học"
        {
          line: 0,
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.25, arms: "point", expr: "neutral" },
          tc: { x: 0.66, hand: null, arms: "up2", expr: "happy", move: "jump" },
          items: [{ id: "bong", prop: "ball", x: 0.48 }],
        },
        // "sát giờ kiểm tra mới mở vở học vẹt vài dòng"
        {
          line: 0,
          at: 0.25,
          cut: true,
          scene: { id: "classroom", text: "KIỂM TRA" },
          cd: { arms: "down" },
          tc: { hand: "book", arms: "hold2", expr: "shock", move: "tremble" },
          items: [],
          fx: { kind: "sweat", on: "TC" },
        },
        // "Hôm đó may thì nhớ"
        { line: 0, at: 0.58, tc: { hand: { id: "paper", text: "9 ĐIỂM" }, arms: "hold", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        // "hôm sau hỏi lại là quên sạch sành sanh!"
        { line: 0, at: 0.75, camera: "CD", cd: { arms: "point", expr: "confused" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
        { line: 0, at: 0.86, camera: "TC", tc: { hand: null, arms: "shrug", expr: "confused" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC mở sách lớp 12 nhìn đúng 2 giây rồi gấp lại cái bốp, ôm quả bóng chạy đi",
      lines: [
        tc("Từ nay cháu quyết tâm tính chuyện lâu dài, không ăn xổi nữa!"),
        cd("Giỏi lắm!"),
        tc("Cháu vừa đọc trước bìa sách lớp 12 rồi, giờ cháu đi đá bóng đến năm 18 tuổi là vừa đẹp!"),
      ],
      stage: [
        // "Từ nay cháu quyết tâm tính chuyện lâu dài": mở sách lớp 12
        {
          line: 0,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.64, hand: { id: "book", text: "LỚP 12" }, arms: "hold2", expr: "smug", move: "idle" },
          items: [{ id: "bong", prop: "ball", x: 0.88 }],
        },
        // "Giỏi lắm!"
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, fx: { kind: "sparkle", on: "CD" } },
        // "Cháu vừa đọc trước bìa sách lớp 12 rồi": gấp sách cái bốp
        { line: 2, camera: "TC", cd: { arms: "down" }, tc: { expr: "happy" }, fx: { kind: "bop", on: "TC", text: "BỐP!" } },
        // "giờ cháu đi đá bóng": ôm bóng chạy
        { line: 2, at: 0.35, camera: "wide", tc: { x: 0.8, hand: "ball", arms: "hold2", move: "bounce" }, items: [] },
        { line: 2, at: 0.6, tc: { x: 1.25 } },
        // "đến năm 18 tuổi là vừa đẹp!"
        { line: 2, at: 0.8, cd: { expr: "angry", arms: "up2", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    idiom: "Ăn vóc học hay",
    meaning: "Ăn uống đầy đủ giúp cơ thể cao lớn khỏe mạnh, chăm chỉ học tập giúp đầu óc thông minh.",
    question: "Món ăn nào của bố mẹ giúp bạn có nhiều năng lượng học bài nhất?",
    hook: {
      shot: "Trước mặt có 5 vỏ hộp sữa, TC cầm bài kiểm tra 4 điểm, lấy thước dây đo vòng bụng",
      lines: [tc("Lạ thật! Bụng tăng 3 phân rồi mà sao điểm vẫn 4 thế này?!")],
      stage: [
        // Năm vỏ hộp sữa trên bàn, cầm bài kiểm tra 4 điểm
        {
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.24, expr: "neutral" },
          tc: { x: 0.68, hand: { id: "paper", text: "4 ĐIỂM" }, arms: "hold", expr: "confused" },
          items: [
            { id: "s1", prop: "milk", x: 0.38, on: "table", scale: 0.8 },
            { id: "s2", prop: "milk", x: 0.43, on: "table", scale: 0.8 },
            { id: "s3", prop: "milk", x: 0.48, on: "table", scale: 0.8 },
            { id: "s4", prop: "milk", x: 0.53, on: "table", scale: 0.8 },
            { id: "s5", prop: "milk", x: 0.58, on: "table", scale: 0.8 },
          ],
        },
        // "mà sao điểm vẫn 4 thế này?!"
        { line: 0, at: 0.5, camera: "TC", tc: { expr: "sad", move: "shake" }, fx: { kind: "question", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { expr: "confused", arms: "hips" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down" }, tc: { hand: null, arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Đo bụng với điểm kiểm tra thì liên quan gì?",
    misread: {
      shot: "Cắt cảnh nhanh: TC vừa gặm đùi gà vừa áp quyển sách Toán lên bụng, mặt ngơ ngác",
      lines: [
        tc("Ông bảo 'ăn vóc học hay' còn gì! Cháu tưởng cứ ăn cho vóc dáng to khỏe là chữ tự khắc hay!"),
        tc("Tối qua trước khi kiểm tra Toán, cháu ăn liền 2 bát cơm, uống 3 hộp sữa mà vào lớp đầu vẫn trống rỗng!"),
        cd("Mày nạp vào bụng chứ có nạp vào đầu đâu!"),
      ],
      stage: [
        // "Ông bảo 'ăn vóc học hay' còn gì!": gặm đùi gà
        { line: 0, camera: "TC", tc: { hand: "drumstick", arms: "hold", expr: "smug", move: "idle" } },
        // "Cháu tưởng cứ ăn cho vóc dáng to khỏe"
        { line: 0, at: 0.5, tc: { move: "bounce", expr: "happy" }, fx: { kind: "sparkle", on: "TC" } },
        // "là chữ tự khắc hay!": áp quyển sách Toán lên bụng
        { line: 0, at: 0.82, tc: { hand: { id: "book", text: "TOÁN" }, arms: "hold2", move: "idle" } },
        // "Tối qua trước khi kiểm tra Toán, cháu ăn liền 2 bát cơm"
        { line: 1, camera: "wide", tc: { hand: "bowl", arms: "hold", expr: "happy", move: "bounce" } },
        // "uống 3 hộp sữa"
        { line: 1, at: 0.55, tc: { hand: "milk" }, fx: { kind: "hearts", on: "TC" } },
        // "mà vào lớp đầu vẫn trống rỗng!"
        {
          line: 1,
          at: 0.72,
          cut: true,
          scene: { id: "classroom", text: "KIỂM TRA\nTOÁN" },
          cd: { x: 0.24 },
          tc: { hand: null, arms: "shrug", expr: "confused", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC" },
        },
        // "Mày nạp vào bụng chứ có nạp vào đầu đâu!"
        { line: 2, camera: "CD", cd: { arms: "point", expr: "angry" }, fx: { kind: "anger", on: "CD" } },
        { line: 2, at: 0.6, camera: "wide", tc: { expr: "shock", arms: "down" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble", hand: null } },
      // "Ăn vóc là ăn uống đủ chất để có sức vóc khỏe mạnh"
      { line: 1, camera: "CD", cd: { x: 0.3, arms: "point", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" } },
      { line: 1, at: 0.12, camera: "wide", tc: { hand: "bowl", arms: "hold", expr: "happy" } },
      // "Học hay là phải chịu khó học hành"
      { line: 1, at: 0.48, tc: { hand: { id: "book", text: "TOÁN" }, arms: "hold2", expr: "neutral" } },
      // "Hai việc phải đi đôi với nhau"
      { line: 1, at: 0.7, cd: { arms: "wave", expr: "happy" } },
      // "chứ ăn không thay cho học được!"
      { line: 1, at: 0.92, tc: { hand: null, arms: "raise", expr: "happy" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Ăn vóc là ăn uống đủ chất để có sức vóc khỏe mạnh. Học hay là phải chịu khó học hành mới biết điều hay lẽ phải. Hai việc phải đi đôi với nhau, chứ ăn không thay cho học được!",
    example: {
      shot: "Cảnh ăn sáng đầy đủ rồi ngồi vào bàn học",
      lines: [
        cd("Muốn học tốt thì sáng phải ăn đủ bữa cho khỏe người, rồi có sức mới ngồi vào bàn giải toán, đọc sách được."),
      ],
      stage: [
        // "Muốn học tốt thì sáng phải ăn đủ bữa"
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.27, arms: "point", expr: "happy" },
          tc: { x: 0.68, hand: "bowl", arms: "hold", expr: "happy", move: "idle" },
          items: [{ id: "mam", prop: "rice-tray", x: 0.5, on: "table" }],
        },
        // "cho khỏe người"
        { line: 0, at: 0.4, tc: { hand: null, arms: "up2", move: "jump" }, fx: { kind: "sparkle", on: "TC" } },
        // "rồi có sức mới ngồi vào bàn giải toán, đọc sách được"
        {
          line: 0,
          at: 0.55,
          cut: true,
          scene: { id: "classroom", text: "2 + 2 = 4" },
          cd: { arms: "down" },
          tc: { hand: { id: "book", text: "TOÁN" }, arms: "hold2", expr: "neutral", move: "idle" },
          items: [],
        },
        { line: 0, at: 0.85, tc: { expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC đặt quyển vở cạnh đĩa bánh bao, tay trái cầm bánh, tay phải cầm bút",
      lines: [
        tc("À, ăn với học phải đi đôi! Vậy cứ giải xong 1 phép tính là cháu phải ăn 1 cái bánh bao..."),
        tc("...Bài về nhà có 20 phép tính, ông đi hấp gấp cho cháu 20 cái bánh bao đi ạ!"),
      ],
      stage: [
        // Quyển vở cạnh đĩa bánh bao, tay cầm bút
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.68, hand: "pen", arms: "hold", expr: "smug", move: "idle" },
          items: [
            { id: "vo", prop: { id: "book", text: "BÀI VỀ NHÀ" }, x: 0.42, on: "table" },
            { id: "banh", prop: "bun-plate", x: 0.6, on: "table" },
          ],
        },
        // "là cháu phải ăn 1 cái bánh bao"
        { line: 0, at: 0.6, tc: { hand: "bun", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        // "Bài về nhà có 20 phép tính"
        { line: 1, camera: "TC", tc: { hand: { id: "paper", text: "20\nPHÉP TÍNH" }, arms: "hold", expr: "smug", move: "idle" } },
        // "ông đi hấp gấp cho cháu 20 cái bánh bao đi ạ!"
        { line: 1, at: 0.45, camera: "wide", tc: { hand: null, arms: "point", expr: "happy", move: "bounce" }, cd: { expr: "shock", arms: "up2" }, fx: { kind: "surprise", on: "CD" } },
        { line: 1, at: 0.85, cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 7,
    week,
    theme,
    idiom: "Ăn có nhai, nói có nghĩ",
    meaning: "Làm gì cũng phải cẩn thận: ăn thì nhai kỹ, nói thì suy nghĩ trước để lời nói lịch sự, không làm ai buồn.",
    question: "Hết tuần 1 rồi! Câu thành ngữ nào từ ngày 1 đến ngày 7 làm bạn cười nhiều nhất?",
    hook: {
      shot: "Đồng hồ bấm giờ hiện 'NHAI LẦN 99', TC phồng má nhai 1 hạt cơm, mặt siêu nghiêm túc",
      lines: [tc("98... 99... 100! Xong một hạt cơm!")],
      stage: [
        // Đồng hồ bấm giờ hiện số lần nhai, phồng má nhai một hạt cơm
        {
          cut: true,
          scene: "kitchen",
          camera: "TC",
          cd: { x: 0.26, expr: "confused" },
          tc: { x: 0.68, hand: { id: "alarm-clock", text: "99" }, arms: "hold", expr: "neutral", move: "bounce" },
          items: [{ id: "bat", prop: "bowl", x: 0.5, on: "table" }],
        },
        // "100! Xong một hạt cơm!"
        { line: 0, at: 0.4, camera: "wide", tc: { hand: { id: "alarm-clock", text: "100" }, arms: "raise", expr: "happy", move: "jump" }, fx: { kind: "exclaim", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { arms: "hips", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "neutral" }, tc: { hand: null, arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Một hạt cơm mà nhai từ sáng tới trưa thế?",
    misread: {
      shot: "TC chống cằm nhắm mắt nghĩ 10 giây, nói chậm như ốc sên, CĐ ngủ gật luôn trên bàn",
      lines: [
        cd("Thế trưa nay mày muốn ăn món gì?"),
        tc("Để... cháu... nghĩ... kỹ... đã... Cháu... muốn... ăn... trứng... rán..."),
        cd("Mày nghĩ xong câu nói thì trứng trong chảo cháy thành than rồi con ạ!"),
      ],
      stage: [
        // "Thế trưa nay mày muốn ăn món gì?"
        { line: 0, camera: "CD", cd: { arms: "point", expr: "happy" }, tc: { arms: "down", move: "idle" } },
        // "Để... cháu... nghĩ... kỹ... đã...": nhắm mắt nghĩ, nói chậm như ốc sên
        { line: 1, camera: "TC", cd: { arms: "down" }, tc: { arms: "hips", expr: "confused" }, fx: { kind: "question", on: "TC", text: "..." } },
        // Cụ Đồ ngủ gật
        { line: 1, at: 0.3, camera: "wide", cd: { expr: "sad" }, fx: { kind: "question", on: "CD", text: "Zzz" } },
        { line: 1, at: 0.62, fx: { kind: "question", on: "CD", text: "Zzz" } },
        // "trứng... rán..."
        { line: 1, at: 0.88, tc: { arms: "raise", expr: "happy" }, fx: { kind: "exclaim", on: "TC" } },
        // "Mày nghĩ xong câu nói": giật mình tỉnh
        { line: 2, camera: "CD", cd: { expr: "shock", move: "jump" }, fx: { kind: "surprise", on: "CD" } },
        // "thì trứng trong chảo cháy thành than rồi con ạ!"
        { line: 2, at: 0.35, camera: "wide", cd: { hand: "pan", arms: "hold", expr: "angry", move: "idle" }, tc: { expr: "shock", arms: "down" }, fx: [{ kind: "anger", on: "CD" }, { kind: "sweat", on: "TC" }] },
      ],
    },
    flipStage: [
      // Cụ Đồ gõ quạt xuống bàn
      { line: 0, camera: "wide", cd: { x: 0.4, hand: "fan", arms: "hit", expr: "angry" }, tc: { move: "idle" } },
      { line: 0, at: 0.3, fx: { kind: "exclaim", on: "CD", text: "CỘP!" }, tc: { expr: "shock", move: "jump" } },
      // "Ăn có nhai là ăn từ tốn, nhai kỹ cho khỏi nghẹn"
      { line: 1, camera: "CD", cd: { x: 0.3, arms: "point", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" } },
      { line: 1, at: 0.08, camera: "wide", tc: { hand: "bowl", arms: "hold", expr: "happy", move: "bounce" } },
      // "Nói có nghĩ là trước khi mở lời phải nghĩ xem câu đó có lễ phép không"
      { line: 1, at: 0.44, cd: { arms: "wave", expr: "happy" }, tc: { hand: null, arms: "down", expr: "neutral", move: "idle" } },
      // "có làm bạn bè hay ông bà buồn không"
      { line: 1, at: 0.66, cd: { expr: "sad" } },
      // "chứ không phải nói chậm như rùa bò!"
      { line: 1, at: 0.84, cd: { arms: "point", expr: "angry" }, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
      { line: 1, at: 0.96, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Ăn có nhai là ăn từ tốn, nhai kỹ cho khỏi nghẹn. Nói có nghĩ là trước khi mở lời phải nghĩ xem câu đó có lễ phép không, có làm bạn bè hay ông bà buồn không — chứ không phải nói chậm như rùa bò!",
    flipShot: "Cụ Đồ giật mình tỉnh dậy, gõ nhẹ quạt lên bàn",
    example: {
      shot: "Cảnh nói chuyện với bạn bè ở lớp và người lớn ở nhà",
      lines: [
        cd("Như thấy bạn mới cắt tóc ngắn, đừng buột miệng trêu chọc làm bạn xấu hổ. Lúc đang giận dỗi cũng phải nghĩ kỹ, đừng nói lời hỗn hào với người lớn."),
      ],
      stage: [
        // "Như thấy bạn mới cắt tóc ngắn"
        {
          line: 0,
          cut: true,
          scene: { id: "classroom", text: "GIỜ RA CHƠI" },
          camera: "wide",
          cd: { x: 0.27, arms: "down", expr: "neutral" },
          tc: { x: 0.68, arms: "point", expr: "smug", move: "bounce" },
          items: [],
        },
        // "đừng buột miệng trêu chọc"
        { line: 0, at: 0.25, cd: { arms: "raise", expr: "angry" }, tc: { arms: "down", expr: "shock", move: "idle" }, fx: { kind: "exclaim", on: "CD", text: "SUỴT!" } },
        // "làm bạn xấu hổ"
        { line: 0, at: 0.42, cd: { arms: "down", expr: "neutral" }, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
        // "Lúc đang giận dỗi"
        { line: 0, at: 0.55, cut: true, scene: "home", tc: { expr: "angry", arms: "hips", move: "shake" }, fx: { kind: "anger", on: "TC" } },
        // "cũng phải nghĩ kỹ"
        { line: 0, at: 0.68, tc: { expr: "confused", arms: "down", move: "idle" }, fx: { kind: "question", on: "TC" } },
        // "đừng nói lời hỗn hào với người lớn"
        { line: 0, at: 0.82, cd: { expr: "happy" }, tc: { expr: "neutral" } },
      ],
    },
    punchline: {
      shot: "TC đứng khoanh tay, nhắm mắt đếm 3 giây rồi mở mắt cười hì hì nhìn Cụ Đồ",
      lines: [
        tc("Cháu vừa suy nghĩ cực kỳ kỹ suốt 3 giây rồi mới nói câu này đấy ạ..."),
        cd("Câu gì?"),
        tc("...Ông đẹp trai nhất nhà, nên ông cho cháu xin 10 nghìn mua kem nhé!"),
      ],
      stage: [
        // "Cháu vừa suy nghĩ cực kỳ kỹ suốt 3 giây": khoanh tay nhắm mắt đếm
        {
          line: 0,
          cut: true,
          scene: "home",
          camera: "TC",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.66, arms: "hips", expr: "neutral", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC", text: "1, 2, 3" },
        },
        { line: 0, at: 0.6, tc: { expr: "smug" } },
        // "Câu gì?"
        { line: 1, camera: "CD", cd: { arms: "hips", expr: "confused" }, fx: { kind: "question", on: "CD" } },
        // "Ông đẹp trai nhất nhà": cười hì hì
        { line: 2, camera: "wide", tc: { arms: "point", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        { line: 2, at: 0.25, cd: { arms: "down", expr: "happy" }, fx: { kind: "sparkle", on: "CD" } },
        // "nên ông cho cháu xin 10 nghìn mua kem nhé!": chìa tay xin
        { line: 2, at: 0.45, tc: { arms: "hold", expr: "smug", move: "idle" } },
        { line: 2, at: 0.8, cd: { expr: "shock", arms: "up2" }, fx: { kind: "sweat", on: "CD" } },
      ],
    },
  }),
];
