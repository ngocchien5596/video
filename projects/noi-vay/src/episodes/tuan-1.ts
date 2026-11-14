import { cd, makeEpisode, tc } from "./make.ts";

const week = 1;
const theme = "Ăn uống";

export const TUAN_1 = [
  makeEpisode({
    day: 1,
    week,
    theme,
    idiom: "Ăn cháo đá bát",
    meaning: "Vô ơn, được người khác giúp đỡ xong lại quay lưng nói xấu hoặc đối xử tệ với họ.",
    question: "Bạn từng giúp ai hết lòng, xong lại bị chính người đó quay lưng chưa?",
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
        cd("Mày đá vỡ hết bát thì trưa nay cả nhà ăn cơm bằng gì?!"),
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
        // "ăn cơm bằng gì?!"
        { line: 2, at: 0.71, camera: "wide", cd: { move: "idle" }, tc: { expr: "shock", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
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
      shot: "HỒI ỨC (TV đen trắng): quán rượu, Lý Thông lân la kết nghĩa với Thạch Sanh vác củi; miếu cổ, Thạch Sanh chém chằn tinh, bắn đại bàng; Lý Thông cướp đầu chằn tinh, đội mũ quan; cửa hang, Lý Thông đẩy tảng đá lấp hang",
      memory: { label: "TRUYỆN CỔ TÍCH: THẠCH SANH" },
      lines: [
        cd("Như Lý Thông trong truyện Thạch Sanh ấy: vốn chỉ là kẻ bán rượu tầm thường, thấy Thạch Sanh khỏe mạnh nên lân la kết nghĩa anh em để lợi dụng."),
        cd("Sau khi Thạch Sanh diệt chằn tinh và đại bàng, lập công lớn, Lý Thông không những cướp công, mà còn nhẫn tâm lấp cửa hang, hòng giết hại người em đã hết lòng giúp mình!"),
      ],
      // Cụ Đồ đóng Thạch Sanh, Thằng Cháu đóng Lý Thông.
      stage: [
        // "Như Lý Thông trong truyện Thạch Sanh ấy": quán rượu, Lý Thông ôm chum rượu
        {
          line: 0,
          cut: true,
          scene: "tavern",
          camera: "wide",
          cd: { role: "thach-sanh", x: -0.25, hand: "axe", back: "firewood", head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "ly-thong", x: 0.66, hand: "wine-jar", back: null, head: null, face: null, arms: "hold", expr: "smug", move: "idle" },
          items: [],
        },
        // "vốn chỉ là kẻ bán rượu tầm thường": mời khách
        { line: 0, at: 0.27, camera: "TC", tc: { hand: null, arms: "wave", expr: "happy", move: "bounce" } },
        // "thấy Thạch Sanh khỏe mạnh": Thạch Sanh vác củi đi vào
        { line: 0, at: 0.5, camera: "wide", cd: { x: 0.28, expr: "happy" }, tc: { arms: "down", expr: "neutral", move: "idle" } },
        { line: 0, at: 0.62, cd: { arms: "raise" }, tc: { expr: "shock" }, fx: [{ kind: "sparkle", on: "CD" }, { kind: "exclaim", on: "TC" }] },
        // "nên lân la kết nghĩa anh em": sán lại gần, tay bắt mặt mừng
        { line: 0, at: 0.72, cd: { arms: "down" }, tc: { x: 0.52, arms: "wave", expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
        // "để lợi dụng": quay ra cười nham hiểm
        { line: 0, at: 0.92, camera: "TC", tc: { arms: "hips", expr: "smug" }, fx: { kind: "exclaim", on: "TC", text: "HÌ HÌ" } },

        // "Sau khi Thạch Sanh diệt chằn tinh": miếu cổ trong rừng đêm
        {
          line: 1,
          cut: true,
          scene: "temple",
          camera: "wide",
          cd: { x: 0.26, back: null, hand: "axe", arms: "raise", expr: "angry" },
          tc: { x: 1.4, hand: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "chan", prop: "python-demon", x: 0.72, scale: 0.9 }],
        },
        { line: 1, at: 0.1, cd: { arms: "hit", move: "jump" }, fx: { kind: "bop", on: "CD", text: "XẢ!" } },
        { line: 1, at: 0.17, cd: { arms: "down", move: "idle", expr: "happy" }, items: [] },
        // "và đại bàng": giương cung bắn
        { line: 1, at: 0.2, cd: { hand: "bow", arms: "raise", expr: "angry" }, items: [{ id: "ob", prop: "eagle", x: 0.7 }] },
        { line: 1, at: 0.27, fx: { kind: "bop", on: "CD", text: "VÚT!" } },
        // "lập công lớn": giơ đầu chằn tinh
        { line: 1, at: 0.31, cd: { hand: "demon-head", arms: "hold2", expr: "happy", move: "bounce" }, items: [], fx: { kind: "sparkle", on: "CD" } },
        // "Lý Thông không những cướp công": đi vào, giật lấy đầu chằn tinh, đội mũ quan
        { line: 1, at: 0.37, tc: { x: 0.64, expr: "smug" } },
        {
          line: 1,
          at: 0.47,
          cd: { hand: null, arms: "shrug", expr: "confused", move: "idle" },
          tc: { hand: "demon-head", arms: "hold2", head: "mandarin-hat", move: "bounce" },
          fx: [{ kind: "sparkle", on: "TC" }, { kind: "question", on: "CD" }],
        },
        // "mà còn nhẫn tâm lấp cửa hang": Thạch Sanh dưới hang, Lý Thông đẩy tảng đá
        {
          line: 1,
          at: 0.55,
          cut: true,
          scene: "cave",
          camera: "wide",
          cd: { x: 0.27, hand: null, arms: "up2", expr: "shock", move: "idle" },
          tc: { x: 0.9, hand: null, arms: "hit", expr: "angry", move: "idle" },
          items: [{ id: "da", prop: "boulder", x: 0.64, scale: 1.1, front: true }],
        },
        { line: 1, at: 0.64, tc: { x: 0.6 }, items: [{ id: "da", prop: "boulder", x: 0.28, scale: 1.1, front: true }], fx: { kind: "bop", on: "TC", text: "ẦM!" } },
        { line: 1, at: 0.7, cut: true, cd: { x: -0.4 } },
        // "hòng giết hại người em đã hết lòng giúp mình!": phủi tay, cười đắc ý
        { line: 1, at: 0.8, camera: "TC", tc: { arms: "hips", expr: "smug" } },
        { line: 1, at: 0.94, camera: "wide", tc: { arms: "shrug" }, fx: { kind: "exclaim", on: "TC", text: "HỪ!" } },
      ],
    },
    punchline: {
      shot: "TC ôm cái bát vào lòng, lấy chăn đắp cho cái bát trên ghế sofa",
      lines: [
        tc("Cháu sợ mang tiếng vô ơn lắm! Ăn cháo xong cháu đắp chăn ru cái bát ngủ luôn..."),
        tc("...Cháu rửa bát bằng nước lạnh, cháu sợ bát nó cảm lạnh ông ạ, hay là đống bát trong bồn ông rửa hộ cháu nhé!"),
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
        // "Cháu rửa bát bằng nước lạnh": sợ, run
        { line: 1, tc: { expr: "sad", move: "tremble" } },
        // "bát nó cảm lạnh": mồ hôi
        { line: 1, at: 0.4, fx: { kind: "sweat", on: "TC" } },
        // "đống bát trong bồn ông rửa hộ cháu nhé!": đẩy chồng bát bẩn sang ông
        {
          line: 1,
          at: 0.64,
          camera: "wide",
          tc: { arms: "point", expr: "smug", move: "idle" },
          items: [
            { id: "goi", prop: "pillow", x: 0.86 },
            { id: "chong", prop: "bowls", x: 0.5 },
          ],
        },
        {
          line: 1,
          at: 0.8,
          items: [
            { id: "goi", prop: "pillow", x: 0.86 },
            { id: "chong", prop: "bowls", x: 0.36 },
          ],
        },
        { line: 1, at: 0.92, cd: { expr: "angry", move: "tremble" }, tc: { expr: "happy", move: "bounce" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 2,
    week,
    theme,
    idiom: "Ăn trông nồi ngồi trông hướng",
    meaning: "Ăn uống cho đúng mực, đi đứng ngồi đúng vị trí, cư xử hợp với hoàn cảnh và người xung quanh.",
    question: "Đi liên hoan, bạn là người hay gắp cho cả bàn hay là người được gắp cho?",
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
    ask: "Xoay chóng cả mặt, mày làm trò gì đấy cháu?",
    answer: "À, không có gì đâu. Cháu làm theo câu Ăn trông nồi ngồi trông hướng ạ!",
    misread: {
      shot: "TC chỉnh ghế theo la bàn, hai tay ôm khư khư nồi cơm điện, mắt nhìn CĐ đầy cảnh giác",
      lines: [
        tc("Ngồi trông hướng là phải tra la bàn cho chuẩn hướng Đông Nam!"),
        tc("Còn ăn trông nồi là cháu phải ôm chặt nồi cơm để canh chừng, kẻo có ai ăn vụng!"),
        cd("Vớ vẩn, đã ai làm gì đâu, đã ai động vào đâu mà sợ ăn vụng!"),
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
        // "Vớ vẩn, đã ai làm gì đâu, đã ai động vào đâu"
        { line: 2, camera: "CD", cd: { expr: "angry", arms: "point" }, fx: { kind: "anger", on: "CD" } },
        { line: 2, at: 0.65, camera: "wide", cd: { move: "shake" }, tc: { expr: "shock" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble", hand: null } },
      // "Ăn trông nồi là ăn cho đúng mực: để ý cơm canh còn nhiều hay ít"
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
      // "mọi người đã ăn chưa, đừng ăn lấn phần ai"
      { line: 1, at: 0.25, camera: "wide", cd: { arms: "wave", expr: "happy" } },
      // "Ngồi trông hướng là xem mình ngồi đâu cho hợp"
      { line: 1, at: 0.42, cd: { arms: "raise", expr: "neutral" }, tc: { arms: "down", expr: "neutral" } },
      // "nhất là khi có người lớn": Cụ Đồ tự chỉ mình, vuốt râu đắc ý
      { line: 1, at: 0.6, camera: "CD", cd: { arms: "hips", expr: "smug" }, fx: { kind: "sparkle", on: "CD" } },
      // "Ra xe buýt hay ở công ty cũng vậy"
      { line: 1, at: 0.7, camera: "wide", cd: { arms: "point", expr: "neutral" }, tc: { expr: "confused" } },
      // "đi, đứng, ngồi phải biết vị trí của mình"
      { line: 1, at: 0.93, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Ăn trông nồi là ăn cho đúng mực: để ý cơm canh còn nhiều hay ít, mọi người đã ăn chưa, đừng ăn lấn phần ai. Ngồi trông hướng là xem mình ngồi đâu cho hợp, nhất là khi có người lớn. Ra xe buýt hay ở công ty cũng vậy: đi, đứng, ngồi phải biết vị trí của mình.",
    example: {
      shot: "Bữa liên hoan công ty, đĩa gà rán giữa bàn; TC gắp liền mấy miếng, rồi balo của TC vứt bừa trên bàn chiếm cả chỗ ngồi của ông",
      lines: [
        cd("Như đi liên hoan công ty, đĩa gà bốn miếng cho cả bàn, mày gắp một mình ba miếng là không 'trông nồi'. Đồ mày vứt bừa bộn trên bàn hết cả chỗ ngồi của người khác là không 'trông hướng'!"),
      ],
      stage: [
        // "Như đi liên hoan công ty, đĩa gà bốn miếng cho cả bàn"
        { line: 0, camera: "wide", cd: { arms: "point", expr: "neutral" }, tc: { hand: null, arms: "down", expr: "neutral" }, items: [{ id: "ga", prop: "chicken-plate", x: 0.5, on: "table" }] },
        // "mày gắp một mình ba miếng"
        { line: 0, at: 0.32, tc: { hand: "drumstick", arms: "hold", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        // "là không 'trông nồi'"
        { line: 0, at: 0.46, cd: { expr: "angry" }, tc: { expr: "shock", move: "idle" }, fx: { kind: "anger", on: "CD" } },
        // "Đồ mày vứt bừa bộn trên bàn hết cả chỗ ngồi của người khác": balo của TC chiếm luôn chỗ ngồi của ông
        {
          line: 0,
          at: 0.56,
          tc: { arms: "hips", expr: "smug", move: "bounce" },
          items: [
            { id: "ga", prop: "chicken-plate", x: 0.5, on: "table" },
            { id: "balo", prop: "backpack", x: 0.3, on: "table" },
          ],
          fx: { kind: "sweat", on: "CD" },
        },
        // "là không 'trông hướng'!"
        { line: 0, at: 0.9, camera: "CD", cd: { arms: "point", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "exclaim", on: "CD" } },
      ],
    },
    punchline: {
      // Lách luật: TC bắt quả tang ông bằng chính bài ông vừa dạy, ông ngượng trả miếng gà; rồi TC có "lý do hợp lệ" để ăn nốt. Cụ Đồ cứng họng, không nói câu nào.
      shot: "CĐ lén gắp miếng gà, TC nhắc 'trông nồi' nên ông ngượng đặt lại; điện thoại reo 'ting ting' báo tin nhắn, TC giơ điện thoại 'bố mẹ nhắn là về muộn' rồi bê nốt đĩa gà, cười 'cháu xin nhé hi hi', CĐ há miệng cứng họng",
      lines: [
        // Sau câu này lặng một nhịp: điện thoại "ting ting" báo tin nhắn mới của bố mẹ.
        { ...tc("Ông ơi, trông nồi ạ! Đĩa còn hai miếng, phần bố mẹ cháu chưa về đấy."), pauseAfter: 1.3 },
        tc("À, bố mẹ cháu vừa nhắn là về muộn, dặn cháu ăn luôn cho khỏi nguội ạ. Cháu xin nhé hi hi!"),
      ],
      stage: [
        // Cụ Đồ lén gắp miếng gà lên, khoái chí
        {
          line: 0,
          camera: "wide",
          cd: { hand: "drumstick", arms: "hold", expr: "happy", move: "idle" },
          tc: { hand: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "ga", prop: "chicken-plate-1", x: 0.5, on: "table" }],
        },
        // "Ông ơi, trông nồi ạ!": TC chỉ tay nhắc
        { line: 0, at: 0.15, camera: "TC", tc: { arms: "point", expr: "smug" }, fx: { kind: "exclaim", on: "TC" } },
        // "Đĩa còn hai miếng, phần bố mẹ cháu chưa về": ông ngượng, đặt miếng gà lại
        { line: 0, at: 0.45, camera: "CD", cd: { expr: "shock" }, fx: { kind: "sweat", on: "CD" } },
        {
          line: 0,
          at: 0.75,
          camera: "wide",
          cd: { hand: null, arms: "down", expr: "sad" },
          tc: { arms: "hips", expr: "happy" },
          items: [{ id: "ga", prop: "chicken-plate-2", x: 0.5, on: "table" }],
        },
        // Lặng: điện thoại reo "ting ting", TC rút điện thoại ra xem, Cụ Đồ ngơ ngác
        {
          line: 0,
          inPause: true,
          at: 0.05,
          camera: "wide",
          tc: { hand: "phone", arms: "raise", expr: "shock", move: "idle" },
          fx: { kind: "exclaim", on: "TC", text: "TING!" },
          sfx: { file: "tin-nhan.wav", volume: 0.9 },
        },
        { line: 0, inPause: true, at: 0.6, camera: "wide", cd: { expr: "confused" }, tc: { expr: "happy" }, fx: { kind: "question", on: "CD" } },
        // "À, bố mẹ cháu vừa nhắn là về muộn": TC giơ điện thoại cho ông xem
        { line: 1, tc: { hand: "phone", arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        // "ăn luôn cho khỏi nguội ạ.": bê nốt đĩa gà
        {
          line: 1,
          at: 0.5,
          camera: "wide",
          tc: { hand: "chicken-plate-2", arms: "hold2", expr: "happy", move: "bounce" },
          items: [],
        },
        // "Cháu xin nhé hi hi!": TC cười đắc ý, ôm đĩa gà nhảy lên
        { line: 1, at: 0.77, camera: "TC", tc: { expr: "smug", move: "jump" }, fx: { kind: "hearts", on: "TC" } },
        // Cụ Đồ há miệng định cãi mà cứng họng
        { line: 1, at: 0.92, camera: "CD", cd: { expr: "shock", move: "tremble" }, tc: { move: "idle" }, fx: { kind: "exclaim", on: "CD", text: "..." } },
      ],
    },
  }),

  makeEpisode({
    day: 3,
    week,
    theme,
    idiom: "Có thực mới vực được đạo",
    meaning: "Phải đủ ăn đủ mặc mới giữ được đạo lý, lo được việc lớn; muốn người theo mình phải lo cái ăn cho họ.",
    question: "Bạn có làm việc nổi khi đang đói không, hay phải ăn no mới 'khởi động' được?",
    hook: {
      shot: "Sân sau, TC đứng sát mép vực, ném từng cái bánh bao xuống, bên cạnh là đĩa bánh bao",
      lines: [tc("Cái thứ bốn mươi chín này... Cố lên, sắp lấp đầy được cái vực rồi ông ơi!")],
      stage: [
        // Cầm bánh bao, đứng cạnh đĩa bánh
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.2, expr: "confused" },
          tc: { x: 0.6, hand: "bun", arms: "raise", expr: "smug", move: "idle" },
          items: [{ id: "dia", prop: "bun-plate", x: 0.4 }],
        },
        // Ném bánh bao bay ra khỏi khung
        {
          line: 0,
          at: 0.3,
          tc: { hand: null, arms: "hit" },
          items: [
            { id: "dia", prop: "bun-plate", x: 0.4 },
            { id: "nem", prop: "bun", x: 0.72 },
          ],
        },
        {
          line: 0,
          at: 0.45,
          items: [
            { id: "dia", prop: "bun-plate", x: 0.4 },
            { id: "nem", prop: "bun", x: 1.3 },
          ],
          fx: { kind: "exclaim", on: "TC", text: "49!" },
        },
        // "Cố lên, sắp lấp đầy được cái vực rồi ông ơi!"
        { line: 0, at: 0.7, camera: "TC", tc: { arms: "up2", expr: "happy", move: "bounce" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { arms: "hips", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "neutral" }, tc: { arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Bánh bao nóng hổi không ăn, mày mang ra ném xuống vực làm trò gì đấy cháu?",
    answer: "Cháu làm theo lời ông dạy: Có thực mới vực được đạo ạ!",
    misread: {
      shot: "TC xếp bánh bao thành cây cầu bắc qua vực, đến cái thứ năm mươi thì đói quá ngồi ăn luôn cả cầu",
      lines: [
        tc("Thì 'thực' là đồ ăn, 'vực' là cái vực thẳm, còn 'đạo' là con đường! Có đồ ăn lấp kín vực thì mới có đường mà đi chứ ạ!"),
        tc("Khổ nỗi cứ lấp đến cái thứ năm mươi là cháu lại đói bụng quá, thế là ngồi chén sạch cả cầu, giờ lại phải lấp lại từ đầu!"),
        cd("Ối giời ơi! Mày vừa xây cầu vừa ăn thế này thì đến Tết sang năm cũng chẳng qua nổi cái vực!"),
      ],
      stage: [
        // "Thì 'thực' là đồ ăn, 'vực' là cái vực thẳm, còn 'đạo' là con đường!"
        { line: 0, camera: "TC", tc: { arms: "point", expr: "smug", move: "idle" }, items: [] },
        { line: 0, at: 0.35, camera: "wide", cd: { expr: "confused" }, tc: { expr: "shock" }, fx: { kind: "sweat", on: "TC" } },
        // "Có đồ ăn lấp kín vực"
        { line: 0, at: 0.56, tc: { hand: "bun-plate", arms: "hold2", expr: "happy", move: "bounce" } },
        // "thì mới có đường mà đi chứ ạ!": xếp bánh bao thành cầu
        {
          line: 0,
          at: 0.8,
          tc: { hand: null, arms: "up2", move: "jump" },
          items: [
            { id: "c1", prop: "bun", x: 0.8 },
            { id: "c2", prop: "bun", x: 0.88 },
            { id: "c3", prop: "bun", x: 0.96 },
          ],
          fx: { kind: "sparkle", on: "TC" },
        },
        // "Khổ nỗi cứ lấp đến cái thứ năm mươi là cháu lại đói bụng quá"
        { line: 1, camera: "TC", tc: { arms: "down", expr: "sad", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
        // "thế là ngồi chén sạch cả cầu"
        { line: 1, at: 0.48, camera: "wide", tc: { hand: "bun", arms: "hold", expr: "happy", move: "bounce" }, items: [], fx: { kind: "hearts", on: "TC" } },
        // "giờ lại phải lấp lại từ đầu!"
        { line: 1, at: 0.78, tc: { hand: null, arms: "shrug", expr: "confused", move: "idle" }, fx: { kind: "question", on: "TC" } },
        // "Ối giời ơi! Mày vừa xây cầu vừa ăn thế này"
        { line: 2, camera: "CD", cd: { arms: "point", expr: "angry", move: "shake" }, fx: { kind: "anger", on: "CD" } },
        // "thì đến Tết sang năm cũng chẳng qua nổi cái vực!"
        { line: 2, at: 0.6, camera: "wide", cd: { move: "idle" }, tc: { expr: "shock" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble" } },
      // "Chữ 'thực' đúng là cái ăn": giơ cái bánh bao
      { line: 1, camera: "CD", cd: { x: 0.3, hand: "bun", arms: "raise", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" }, items: [] },
      // "nhưng 'vực' là nâng đỡ cho đứng vững"
      { line: 1, at: 0.14, cd: { hand: null, arms: "up2" } },
      // "còn 'đạo' là đạo lý làm người."
      { line: 1, at: 0.28, camera: "wide", cd: { hand: "fan", arms: "point", expr: "neutral" } },
      // "Có ăn có mặc thì người ta mới giữ được đạo lý"
      { line: 1, at: 0.42, cd: { arms: "wave", expr: "happy" }, tc: { expr: "neutral" } },
      // "mới đủ sức làm việc lớn."
      { line: 1, at: 0.62, cd: { arms: "raise" }, fx: { kind: "sparkle", on: "CD" } },
      // "Muốn ai theo mình, cũng phải lo cho họ cái no trước đã!": chìa bánh bao cho Thằng Cháu
      { line: 1, at: 0.74, cd: { hand: "bun", arms: "point", expr: "smug" }, tc: { expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
      { line: 1, at: 0.94, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Chữ 'thực' đúng là cái ăn, nhưng 'vực' là nâng đỡ cho đứng vững, còn 'đạo' là đạo lý làm người. Có ăn có mặc thì người ta mới giữ được đạo lý, mới đủ sức làm việc lớn. Muốn ai theo mình, cũng phải lo cho họ cái no trước đã!",
    flipShot: "Cụ Đồ gõ quạt, cầm cái bánh bao giơ lên giải thích rồi đưa cho Thằng Cháu",
    example: {
      shot: "HỒI ỨC (TV đen trắng): làng Phù Đổng, bà con nghe tin giặc Ân, cậu bé Gióng giơ tay xin đi đánh giặc, ôm bát cơm ăn mãi không no; bà con bưng thúng gạo tới, nong cơm nong cà bày đầy sân; Gióng vươn vai thành tráng sĩ; bãi chiến chân núi, tráng sĩ cưỡi ngựa sắt phun lửa, vung roi sắt đánh giặc Ân chạy mất",
      memory: { label: "TRUYỀN THUYẾT: THÁNH GIÓNG" },
      lines: [
        cd("Như chuyện Thánh Gióng ngày xưa ấy: nghe tin có giặc Ân, cậu bé lên ba xin đi đánh giặc, nhưng ăn mãi không no, cả làng phải góp gạo thổi cơm nuôi: bảy nong cơm, ba nong cà!"),
        cd("Nhờ ăn đủ no, đủ sức, Gióng mới vươn vai thành tráng sĩ, cưỡi ngựa sắt đánh tan giặc Ân đấy thôi!"),
      ],
      // Thằng Cháu đóng Gióng; Cụ Đồ đóng bà con trong làng, rồi đóng giặc Ân.
      stage: [
        // "Như chuyện Thánh Gióng ngày xưa ấy": làng Phù Đổng
        {
          line: 0,
          cut: true,
          scene: "giong-village",
          camera: "wide",
          cd: { role: "giong-villager", x: 0.24, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "giong-boy", x: 0.76, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // "nghe tin có giặc Ân"
        { line: 0, at: 0.16, cd: { arms: "up2", expr: "shock", move: "tremble" }, fx: { kind: "exclaim", on: "CD", text: "GIẶC ÂN!" } },
        // "cậu bé lên ba xin đi đánh giặc"
        { line: 0, at: 0.3, camera: "TC", cd: { arms: "down", move: "idle" }, tc: { arms: "raise", expr: "angry", move: "jump" }, fx: { kind: "exclaim", on: "TC", text: "CON ĐI!" } },
        // "nhưng ăn mãi không no": ôm bát cơm ăn
        { line: 0, at: 0.5, camera: "wide", cd: { expr: "neutral" }, tc: { hand: "bowl", arms: "hold", expr: "happy", move: "bounce" } },
        { line: 0, at: 0.6, tc: { expr: "sad", move: "idle" }, fx: { kind: "exclaim", on: "TC", text: "ĐÓI!" } },
        // "cả làng phải góp gạo thổi cơm nuôi": bà con bưng thúng gạo tới
        { line: 0, at: 0.7, cd: { x: 0.28, hand: "giong-rice-basket", arms: "hold2", expr: "happy" }, fx: { kind: "hearts", on: "CD" } },
        // "bảy nong cơm, ba nong cà!"
        {
          line: 0,
          at: 0.85,
          cd: { hand: null, arms: "point" },
          tc: { expr: "happy", move: "bounce" },
          items: [
            { id: "com", prop: "giong-nong-com", x: 0.46, scale: 0.85 },
            { id: "ca", prop: "giong-nong-ca", x: 0.6, scale: 0.75, front: true },
          ],
          fx: { kind: "sparkle", on: "TC" },
        },

        // "Nhờ ăn đủ no, đủ sức": xoa bụng
        { line: 1, camera: "TC", tc: { hand: null, arms: "hips", expr: "happy", move: "idle" }, fx: { kind: "hearts", on: "TC" } },
        // "Gióng mới vươn vai"
        { line: 1, at: 0.28, camera: "wide", tc: { arms: "up2", expr: "angry", move: "jump" }, fx: { kind: "sparkle", on: "TC" } },
        // "thành tráng sĩ"
        { line: 1, at: 0.45, cut: true, tc: { role: "giong-hero", arms: "hips", expr: "smug", move: "idle" }, cd: { expr: "shock", arms: "up2" }, fx: { kind: "bop", on: "TC", text: "VÙNG!" } },
        // "cưỡi ngựa sắt": bãi chiến chân núi
        {
          line: 1,
          at: 0.6,
          cut: true,
          scene: "giong-battle",
          camera: "wide",
          tc: { x: 0.26, hand: "giong-iron-rod", arms: "raise", expr: "angry", move: "idle" },
          cd: { role: "giong-enemy", x: 0.82, hand: null, arms: "hips", expr: "angry", move: "idle" },
          items: [{ id: "ngua", prop: "giong-iron-horse", x: 0.26, scale: 0.85, front: true }],
        },
        // "đánh tan giặc Ân đấy thôi!"
        { line: 1, at: 0.78, tc: { x: 0.4, arms: "hit" }, items: [{ id: "ngua", prop: "giong-iron-horse", x: 0.4, scale: 0.85, front: true }], cd: { expr: "shock", move: "tremble" }, fx: { kind: "bop", on: "CD", text: "BỐP!" } },
        { line: 1, at: 0.9, tc: { arms: "raise", expr: "happy" }, cd: { x: 1.4, arms: "up2", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC kéo đĩa bánh bao về phía mình, rồi ôm gối đi ngủ trưa",
      lines: [
        tc("À cháu hiểu rồi! Phải ăn thật no mới lo được việc lớn. Thế ông cho cháu ăn thêm mười cái bánh bao nữa nhé!"),
        cd("Ừ, ăn xong thì định lo việc lớn gì nào?"),
        tc("Dạ, việc lớn nhất buổi trưa: đi ngủ trưa ạ!"),
      ],
      stage: [
        // "À cháu hiểu rồi! Phải ăn thật no mới lo được việc lớn."
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.68, hand: "bun", arms: "hold", expr: "smug", move: "idle" },
          items: [{ id: "dia", prop: "bun-plate", x: 0.45, on: "table" }],
        },
        // "Thế ông cho cháu ăn thêm mười cái bánh bao nữa nhé!": kéo đĩa về phía mình
        { line: 0, at: 0.56, tc: { expr: "happy", move: "bounce" }, items: [{ id: "dia", prop: "bun-plate", x: 0.6, on: "table" }], fx: { kind: "hearts", on: "TC" } },
        // "Ừ, ăn xong thì định lo việc lớn gì nào?"
        { line: 1, camera: "CD", cd: { arms: "hips", expr: "confused" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
        // "Dạ, việc lớn nhất buổi trưa: đi ngủ trưa ạ!"
        {
          line: 2,
          cut: true,
          scene: "home",
          camera: "wide",
          tc: { hand: "pillow", arms: "hold2", expr: "happy", move: "idle" },
          items: [],
          fx: { kind: "question", on: "TC", text: "Zzz" },
        },
        { line: 2, at: 0.5, cd: { expr: "angry", arms: "up2", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
        { line: 2, at: 0.82, camera: "TC", fx: { kind: "question", on: "TC", text: "Zzz" } },
      ],
    },
  }),

  makeEpisode({
    day: 4,
    week,
    theme,
    idiom: "Há miệng chờ sung",
    meaning: "Lười biếng, ỷ lại, không chịu bỏ công mà chỉ chờ may mắn hoặc chờ người khác làm sẵn cho hưởng.",
    question: "Có việc gì bạn đang 'há miệng chờ sung', biết là nên tự làm mà vẫn chưa làm không?",
    hook: {
      shot: "Sân vườn, TC đứng ngửa cổ há miệng thật to dưới gốc cây sung, hai tay giơ lên trời",
      lines: [tc("Suỵt! Ông đứng xa ra, bữa trưa của cháu sắp rơi vào mồm rồi!")],
      stage: [
        // Há miệng dưới gốc sung
        {
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.22, expr: "confused" },
          tc: { x: 0.6, arms: "up2", expr: "shock", move: "idle" },
          items: [{ id: "sung", prop: "plant", x: 0.84, scale: 1.5 }],
        },
        // "bữa trưa của cháu sắp rơi vào mồm rồi!"
        { line: 0, at: 0.5, camera: "TC", tc: { move: "tremble" }, fx: { kind: "exclaim", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { arms: "hips", expr: "confused" }, tc: { move: "idle" }, fx: { kind: "question", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "neutral" }, tc: { arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Đứng ngửa cổ dưới gốc sung cả buổi làm gì?",
    misread: {
      shot: "TC há miệng chờ mãi chỉ rơi một chiếc lá; TC giơ đơn đặt cơm ghi 'NÉM VÀO MỒM', cái bánh bao bay vào trúng mặt",
      lines: [
        tc("Ông dạy há miệng chờ sung mà! Cháu há hai tiếng rồi, chưa rơi quả nào, chỉ rơi... một chiếc lá!"),
        tc("Nên cháu nâng cấp: đặt cơm online, dặn shipper ném thẳng vào miệng cháu cho tiện!"),
        cd("Người ta giao hàng chứ có phải ném bóng rổ đâu mà ném trúng mồm mày!"),
      ],
      stage: [
        // "Ông dạy há miệng chờ sung mà!"
        { line: 0, camera: "TC", tc: { arms: "up2", expr: "shock", move: "idle" } },
        // "Cháu há hai tiếng rồi"
        { line: 0, at: 0.3, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
        // "chưa rơi quả nào"
        { line: 0, at: 0.55, camera: "wide", cd: { expr: "neutral" }, fx: { kind: "question", on: "TC" } },
        // "chỉ rơi... một chiếc lá!"
        { line: 0, at: 0.8, tc: { arms: "shrug", expr: "confused" }, fx: { kind: "bop", on: "TC", text: "LÁ!" } },
        // "Nên cháu nâng cấp"
        { line: 1, camera: "TC", tc: { arms: "point", expr: "smug", move: "bounce" }, fx: { kind: "exclaim", on: "TC" } },
        // "đặt cơm online, dặn shipper ném thẳng vào miệng cháu"
        { line: 1, at: 0.3, tc: { hand: { id: "paper", text: "GHI CHÚ:\nNÉM VÀO MỒM" }, arms: "hold", move: "idle" } },
        // Bánh bao bay vào từ ngoài khung...
        {
          line: 1,
          at: 0.68,
          camera: "wide",
          tc: { hand: null, arms: "up2", expr: "shock" },
          items: [
            { id: "sung", prop: "plant", x: 0.84, scale: 1.5 },
            { id: "banh", prop: "bun", x: 1.3 },
          ],
        },
        // ...trúng mặt
        {
          line: 1,
          at: 0.84,
          tc: { move: "tremble" },
          items: [
            { id: "sung", prop: "plant", x: 0.84, scale: 1.5 },
            { id: "banh", prop: "bun", x: 0.79 },
          ],
          fx: { kind: "bop", on: "TC", text: "BỘP!" },
        },
        // "Người ta giao hàng chứ có phải ném bóng rổ đâu"
        { line: 2, camera: "CD", cd: { arms: "point", expr: "angry", move: "shake" }, tc: { move: "idle" }, fx: { kind: "anger", on: "CD" } },
        // "mà ném trúng mồm mày!"
        { line: 2, at: 0.6, camera: "wide", cd: { move: "idle" }, tc: { arms: "down", expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble" } },
      // "Sung chín thì rụng"
      {
        line: 1,
        camera: "CD",
        cd: { x: 0.3, arms: "point", expr: "neutral", move: "idle" },
        tc: { move: "idle", expr: "confused" },
        items: [{ id: "sung", prop: "plant", x: 0.84, scale: 1.5 }],
      },
      // "nhưng đâu có rụng trúng miệng ai": Thằng Cháu há miệng chờ
      { line: 1, at: 0.11, camera: "wide", tc: { arms: "up2", expr: "shock" } },
      // "Câu này chê người lười biếng, ỷ lại, không chịu bỏ công"
      { line: 1, at: 0.3, cd: { arms: "hips", expr: "angry" }, tc: { arms: "down", expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
      // "mà chỉ ngồi chờ may mắn, hoặc chờ người khác làm sẵn cho mình hưởng!"
      { line: 1, at: 0.62, cd: { arms: "wave", expr: "neutral" } },
      { line: 1, at: 0.93, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Sung chín thì rụng, nhưng đâu có rụng trúng miệng ai. Câu này chê người lười biếng, ỷ lại, không chịu bỏ công mà chỉ ngồi chờ may mắn, hoặc chờ người khác làm sẵn cho mình hưởng!",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đường làng, anh chàng lười nằm ngửa trên manh chiếu dưới gốc sung, há miệng; quả sung rơi chệch ra ngoài; người qua đường đội nón lá dùng chân đẩy quả sung vào miệng anh ta; anh lười ngậm sung, giơ nắm đấm chê 'LƯỜI THẾ!'",
      memory: { label: "TRUYỆN CƯỜI: HÁ MIỆNG CHỜ SUNG" },
      lines: [
        cd("Như anh chàng lười trong truyện cười dân gian ấy: nằm ngửa dưới gốc sung, há miệng chờ quả rụng vào, mà quả nào cũng rơi chệch ra ngoài."),
        cd("Có người đi qua, anh nhờ nhặt hộ bỏ vào miệng. Người kia lấy ngón chân kẹp quả sung nhét vào, thế mà anh còn chê người ta lười!"),
      ],
      // Anh chàng lười là đạo cụ nằm trên sàn; Cụ Đồ đóng người qua đường, Thằng Cháu đứng ngoài khung.
      stage: [
        // "Như anh chàng lười trong truyện cười dân gian ấy": nằm ngửa dưới gốc sung
        {
          line: 0,
          cut: true,
          scene: "sung-tree",
          camera: "wide",
          cd: { role: "sung-passerby", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: null, x: -0.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "luoi", prop: "sung-lazy-man", x: 0.44 }],
        },
        // "há miệng chờ quả rụng vào": quả sung rơi
        {
          line: 0,
          at: 0.55,
          items: [
            { id: "luoi", prop: "sung-lazy-man", x: 0.44 },
            { id: "q1", prop: "sung-fig-fall", x: 0.33 },
          ],
        },
        // "mà quả nào cũng rơi chệch ra ngoài"
        {
          line: 0,
          at: 0.68,
          items: [
            { id: "luoi", prop: "sung-lazy-man", x: 0.44 },
            { id: "q1", prop: "sung-fig", x: 0.43 },
          ],
        },
        {
          line: 0,
          at: 0.78,
          items: [
            { id: "luoi", prop: "sung-lazy-man", x: 0.44 },
            { id: "q1", prop: "sung-fig", x: 0.43 },
            { id: "q2", prop: "sung-fig-fall", x: 0.24 },
          ],
        },
        {
          line: 0,
          at: 0.9,
          items: [
            { id: "luoi", prop: "sung-lazy-man", x: 0.44 },
            { id: "q1", prop: "sung-fig", x: 0.43 },
            { id: "q2", prop: "sung-fig", x: 0.13 },
          ],
        },
        // "Có người đi qua": người đội nón lá đi vào
        { line: 1, cd: { x: 0.7 } },
        // "anh nhờ nhặt hộ bỏ vào miệng"
        { line: 1, at: 0.18, cd: { expr: "confused" }, fx: { kind: "question", on: "CD" } },
        // "Người kia lấy ngón chân kẹp quả sung": không thèm cúi, chống nạnh, đứng sát quả sung
        { line: 1, at: 0.38, cd: { x: 0.52, arms: "hips", expr: "smug" } },
        { line: 1, at: 0.55, cd: { move: "bounce" }, fx: { kind: "bop", on: "CD", text: "KẸP!" } },
        // "nhét vào": quả sung bị đẩy tới miệng
        {
          line: 1,
          at: 0.64,
          cd: { move: "idle" },
          items: [
            { id: "luoi", prop: "sung-lazy-man", x: 0.44 },
            { id: "q1", prop: "sung-fig", x: 0.35 },
            { id: "q2", prop: "sung-fig", x: 0.13 },
          ],
        },
        // "thế mà anh còn chê người ta lười!": ngậm sung, giơ nắm đấm
        {
          line: 1,
          at: 0.72,
          cd: { x: 0.62, arms: "shrug", expr: "shock" },
          items: [
            { id: "luoi", prop: "sung-lazy-angry", x: 0.44 },
            { id: "q2", prop: "sung-fig", x: 0.13 },
          ],
          fx: { kind: "surprise", on: "CD" },
        },
        { line: 1, at: 0.88, cd: { expr: "confused" } },
      ],
    },
    punchline: {
      shot: "TC bê nguyên chậu cây sung về, rồi ngửa cổ há miệng chờ Cụ Đồ hái và đút",
      lines: [
        tc("Cháu hiểu rồi! Không chờ sung rụng nữa, cháu tự đi lấy, bê cả cây về đây ạ!"),
        cd("Ơ... thế giờ làm gì?"),
        tc("Giờ ông hái hộ cháu, rửa sạch, đút tận miệng nhé. Cháu há sẵn rồi!"),
      ],
      stage: [
        // "Cháu hiểu rồi! Không chờ sung rụng nữa, cháu tự đi lấy"
        {
          line: 0,
          cut: true,
          scene: "yard",
          camera: "wide",
          cd: { x: 0.25, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 1.2, arms: "up2", expr: "smug", move: "bounce" },
          items: [{ id: "sung", prop: "plant", x: 1.35, scale: 1.2 }],
        },
        // "bê cả cây về đây ạ!": đẩy chậu sung vào giữa sân
        {
          line: 0,
          at: 0.4,
          tc: { x: 0.68 },
          items: [{ id: "sung", prop: "plant", x: 0.5, scale: 1.2 }],
        },
        { line: 0, at: 0.75, cd: { expr: "shock", arms: "up2" }, fx: { kind: "surprise", on: "CD" } },
        // "Ơ... thế giờ làm gì?"
        { line: 1, camera: "CD", cd: { arms: "hips", expr: "confused" }, tc: { arms: "down", move: "idle" }, fx: { kind: "question", on: "CD" } },
        // "Giờ ông hái hộ cháu, rửa sạch, đút tận miệng nhé."
        { line: 2, camera: "wide", tc: { arms: "point", expr: "happy" } },
        // "Cháu há sẵn rồi!"
        { line: 2, at: 0.72, camera: "TC", tc: { arms: "up2", expr: "shock", move: "idle" }, fx: { kind: "exclaim", on: "TC", text: "AAA!" } },
        { line: 2, at: 0.9, camera: "wide", cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 5,
    week,
    theme,
    idiom: "Ăn xổi ở thì",
    meaning: "Sống tạm bợ, làm việc qua quýt cho xong, chỉ cốt lợi trước mắt mà không tính chuyện lâu dài.",
    question: "Việc gần nhất bạn 'ăn xổi' cho kịp hạn, rồi sau đó phải làm lại từ đầu là gì?",
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
      // "Ăn xổi là như cà muối xổi, muối vội để ăn ngay."
      { line: 1, camera: "CD", cd: { x: 0.3, hand: "fan", arms: "point", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" }, items: [{ id: "leu", prop: "tent", x: 0.84 }] },
      // "Ở thì là ở tạm một thời.": chỉ cái lều
      { line: 1, at: 0.26, camera: "wide", cd: { arms: "point", expr: "smug" }, fx: { kind: "question", on: "TC" } },
      // "Câu này chê lối sống tạm bợ: làm gì cũng qua quýt cho xong"
      { line: 1, at: 0.4, cd: { arms: "wave", expr: "angry" } },
      // "chỉ cốt lợi trước mắt, chẳng tính chuyện lâu dài!"
      { line: 1, at: 0.8, cd: { expr: "neutral" }, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
      { line: 1, at: 0.95, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Ăn xổi là như cà muối xổi, muối vội để ăn ngay. Ở thì là ở tạm một thời. Câu này chê lối sống tạm bợ: làm gì cũng qua quýt cho xong, chỉ cốt lợi trước mắt, chẳng tính chuyện lâu dài!",
    flipShot: "Cụ Đồ ngồi phịch xuống ghế, tịch thu cái đồng hồ báo thức",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đồng cỏ, heo anh dựng vội nhà rơm, nhà gỗ rồi nhảy cẫng đi chơi, heo út khuân gạch xây nhà gạch; sói đến thổi bay nhà rơm, đổ nhà gỗ, heo anh chạy mất; sói thổi nhà gạch đến hụt hơi, nhà vẫn đứng vững",
      memory: { label: "TRUYỆN CỔ TÍCH: BA CHÚ HEO CON" },
      lines: [
        cd("Như truyện Ba chú heo con ấy: hai anh lớn dựng vội nhà rơm, nhà gỗ cho xong để còn rong chơi, chỉ chú út chịu khó xây nhà gạch."),
        cd("Sói đến, phù một hơi là bay nhà rơm, đổ nhà gỗ, hai anh chạy tóe khói sang nhà em. Riêng nhà gạch thì sói thổi đến hụt hơi vẫn đứng vững!"),
      ],
      // Thằng Cháu đóng heo anh; Cụ Đồ đóng heo út, rồi đóng sói.
      stage: [
        // "Như truyện Ba chú heo con ấy: hai anh lớn": heo anh ôm bó rơm
        {
          line: 0,
          cut: true,
          scene: "heo-meadow",
          camera: "wide",
          cd: { role: "heo-ut", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "heo-anh", x: 0.36, hand: "heo-straw-bundle", back: null, head: null, face: null, arms: "hold2", expr: "happy", move: "idle" },
          items: [],
        },
        // "dựng vội nhà rơm"
        { line: 0, at: 0.36, tc: { move: "bounce" }, items: [{ id: "rom", prop: "heo-straw-house", x: 0.16, scale: 0.95 }], fx: { kind: "sparkle", on: "TC" } },
        // "nhà gỗ"
        {
          line: 0,
          at: 0.46,
          tc: { hand: "heo-plank", arms: "hold", move: "idle" },
          items: [
            { id: "rom", prop: "heo-straw-house", x: 0.16, scale: 0.95 },
            { id: "go", prop: "heo-wood-house", x: 0.5, scale: 0.95 },
          ],
        },
        // "cho xong để còn rong chơi"
        { line: 0, at: 0.56, tc: { x: 0.33, hand: null, arms: "wave", expr: "happy", move: "jump" }, fx: { kind: "exclaim", on: "TC", text: "XONG!" } },
        // "chỉ chú út chịu khó": khuân gạch đi vào
        { line: 0, at: 0.72, tc: { arms: "down", move: "idle" }, cd: { x: 0.68, hand: "heo-brick", arms: "hold2", expr: "neutral" }, fx: { kind: "sweat", on: "CD" } },
        // "xây nhà gạch"
        {
          line: 0,
          at: 0.88,
          cd: { x: 0.62, hand: null, arms: "raise", expr: "happy" },
          items: [
            { id: "rom", prop: "heo-straw-house", x: 0.16, scale: 0.95 },
            { id: "go", prop: "heo-wood-house", x: 0.5, scale: 0.95 },
            { id: "gach", prop: "heo-brick-house", x: 0.84, scale: 0.95 },
          ],
          fx: { kind: "sparkle", on: "CD" },
        },

        // "Sói đến": Cụ Đồ đóng sói, đi vào từ bên trái
        {
          line: 1,
          cut: true,
          camera: "wide",
          cd: { role: "soi", x: -0.3, hand: null, arms: "hips", expr: "angry", move: "idle" },
          tc: { x: 0.92, hand: null, arms: "down", expr: "neutral", move: "idle" },
          items: [
            { id: "rom", prop: "heo-straw-house", x: 0.4, scale: 1.15 },
            { id: "go", prop: "heo-wood-house", x: 0.76, scale: 1.15 },
          ],
        },
        { line: 1, at: 0.01, cd: { x: 0.14 }, fx: { kind: "exclaim", on: "CD", text: "GỪ!" } },
        // "phù một hơi"
        { line: 1, at: 0.07, cd: { arms: "up2", expr: "shock", move: "shake" }, fx: { kind: "bop", on: "CD", text: "PHÙ!" } },
        // "là bay nhà rơm"
        {
          line: 1,
          at: 0.19,
          tc: { expr: "shock", move: "tremble" },
          items: [
            { id: "rom", prop: "heo-straw-ruin", x: 0.4, scale: 1.15 },
            { id: "go", prop: "heo-wood-house", x: 0.76, scale: 1.15 },
          ],
        },
        // "đổ nhà gỗ"
        { line: 1, at: 0.27, cd: { x: 0.3, arms: "up2", move: "shake" }, fx: { kind: "bop", on: "CD", text: "PHÙ!" } },
        {
          line: 1,
          at: 0.31,
          items: [
            { id: "rom", prop: "heo-straw-ruin", x: 0.4, scale: 1.15 },
            { id: "go", prop: "heo-wood-ruin", x: 0.76, scale: 1.15 },
          ],
        },
        // "hai anh chạy tóe khói sang nhà em"
        { line: 1, at: 0.4, cd: { arms: "hips", expr: "smug", move: "idle" }, tc: { x: 1.35, move: "bounce" }, fx: { kind: "sweat", on: "TC" } },
        // "Riêng nhà gạch": cả nhà heo trốn trong nhà gạch
        {
          line: 1,
          at: 0.61,
          cut: true,
          camera: "wide",
          cd: { x: 0.18, arms: "hips", expr: "angry", move: "idle" },
          tc: { x: 0.9, arms: "hips", expr: "smug", move: "idle" },
          items: [{ id: "gach", prop: "heo-brick-house", x: 0.56, scale: 1.25 }],
        },
        // "thì sói thổi"
        { line: 1, at: 0.75, cd: { arms: "up2", expr: "shock", move: "shake" }, fx: { kind: "bop", on: "CD", text: "PHÙÙÙ!" } },
        // "đến hụt hơi"
        { line: 1, at: 0.83, cd: { arms: "down", expr: "sad", move: "tremble" }, fx: { kind: "sweat", on: "CD" } },
        // "vẫn đứng vững!"
        { line: 1, at: 0.92, tc: { arms: "raise", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC giơ quyển 'KẾ HOẠCH 30 NĂM', rồi chìa tờ giấy vay 5 triệu cho Cụ Đồ ký",
      lines: [
        tc("Từ nay cháu tính chuyện lâu dài, không ăn xổi nữa!"),
        cd("Giỏi lắm!"),
        tc("Nên cháu vay ông 5 triệu, hẹn 30 năm nữa trả. Thế mới gọi là kế hoạch dài hạn!"),
      ],
      stage: [
        // "Từ nay cháu tính chuyện lâu dài"
        {
          line: 0,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.64, hand: { id: "book", text: "30 NĂM" }, arms: "hold2", expr: "smug", move: "idle" },
          items: [],
        },
        // "Giỏi lắm!"
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, fx: { kind: "sparkle", on: "CD" } },
        // "Nên cháu vay ông 5 triệu"
        { line: 2, camera: "TC", cd: { arms: "down" }, tc: { hand: { id: "paper", text: "VAY ÔNG\n5 TRIỆU" }, arms: "hold", expr: "happy", move: "bounce" } },
        // "hẹn 30 năm nữa trả": chìa giấy sang ông
        { line: 2, at: 0.35, camera: "wide", tc: { x: 0.54, move: "idle" } },
        { line: 2, at: 0.52, cd: { expr: "shock", arms: "up2" }, fx: { kind: "surprise", on: "CD" } },
        // "Thế mới gọi là kế hoạch dài hạn!"
        { line: 2, at: 0.68, tc: { x: 0.64, expr: "smug" } },
        { line: 2, at: 0.88, cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    idiom: "Ăn cơm nhà vác tù và hàng tổng",
    meaning: "Bỏ công lo việc chung, việc người khác, có khi bỏ bê việc nhà, mà chẳng được lợi lộc gì.",
    question: "Ở chỗ bạn làm hay học, ai là người hay 'vác tù và' lo việc chung nhất?",
    hook: {
      shot: "Phòng khách, TC đeo balo, còng lưng đẩy cái tủ lạnh ra cửa",
      lines: [tc("Tránh đường ông ơi! Cháu vác tủ lạnh đi phục vụ cả phố!")],
      stage: [
        // Đeo balo, còng lưng đẩy tủ lạnh
        {
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.2, expr: "shock" },
          tc: { x: 0.52, back: "backpack", arms: "up2", expr: "angry", move: "tremble" },
          items: [{ id: "tu", prop: "fridge", x: 0.74, scale: 1.1 }],
        },
        // "Cháu vác tủ lạnh đi phục vụ cả phố!"
        { line: 0, at: 0.5, tc: { x: 0.64 }, items: [{ id: "tu", prop: "fridge", x: 0.86, scale: 1.1 }], fx: { kind: "sweat", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { arms: "point", expr: "angry" }, tc: { move: "idle" }, fx: { kind: "anger", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "confused" }, tc: { arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Cơm vừa ăn xong, mày khiêng tủ lạnh đi đâu?",
    misread: {
      shot: "TC ăn xong bát cơm, ra sân ôm chồng bát và tờ 'ĐƠN HÀNG CẢ PHỐ'; cắt về phòng khách, TC lại đẩy tủ lạnh",
      lines: [
        tc("Ăn cơm nhà xong thì đi vác hàng tổng, tức là khuân hàng cho cả tổng kho, miễn phí!"),
        tc("Còn tù và chắc là cái tủ và... cái gì đó. Nên cháu vác luôn cái tủ!"),
        cd("Mày vác tủ lạnh đi, tối nay ông ướp cá vào túi áo à?!"),
      ],
      stage: [
        // "Ăn cơm nhà xong"
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.22, arms: "down", expr: "neutral" },
          tc: { x: 0.66, back: null, hand: "bowl", arms: "hold", expr: "happy", move: "idle" },
          items: [{ id: "mam", prop: "rice-tray", x: 0.45, on: "table" }],
        },
        // "là phải đi vác hàng tổng"
        {
          line: 0,
          at: 0.25,
          cut: true,
          scene: "yard",
          tc: { back: "backpack", hand: "bowls", arms: "hold2", expr: "smug", move: "bounce" },
          items: [],
          fx: { kind: "exclaim", on: "TC" },
        },
        // "tức là khuân hàng cho cả tổng kho"
        { line: 0, at: 0.52, tc: { hand: { id: "paper", text: "ĐƠN HÀNG\nCẢ PHỐ" }, arms: "raise", move: "tremble" }, cd: { expr: "confused" }, fx: { kind: "sweat", on: "TC" } },
        // "miễn phí!"
        { line: 0, at: 0.82, camera: "TC", tc: { hand: null, arms: "shrug", expr: "happy", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
        // "Còn tù và"
        { line: 1, camera: "TC", tc: { arms: "hips", expr: "confused" }, fx: { kind: "question", on: "TC" } },
        // "chắc là cái tủ và... cái gì đó"
        { line: 1, at: 0.25, tc: { expr: "smug" }, fx: { kind: "exclaim", on: "TC", text: "TỦ!" } },
        // "Nên cháu vác luôn cái tủ!": cắt về phòng khách
        {
          line: 1,
          at: 0.68,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.2, arms: "up2", expr: "shock" },
          tc: { x: 0.52, arms: "up2", expr: "angry", move: "tremble" },
          items: [{ id: "tu", prop: "fridge", x: 0.74, scale: 1.1 }],
          fx: { kind: "surprise", on: "CD" },
        },
        // "Mày vác tủ lạnh đi"
        { line: 2, camera: "CD", cd: { arms: "point", expr: "angry", move: "shake" }, tc: { move: "idle" }, fx: { kind: "anger", on: "CD" } },
        // "tối nay ông ướp cá vào túi áo à?!"
        { line: 2, at: 0.6, camera: "wide", cd: { move: "idle" }, tc: { arms: "down", expr: "shock" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { x: 0.64, back: null, move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble" } },
      // "Tù và là cái kèn sừng trâu hoặc vỏ ốc."
      { line: 1, camera: "CD", cd: { x: 0.3, arms: "raise", expr: "neutral", move: "idle" }, tc: { move: "idle", expr: "confused" }, items: [{ id: "tu", prop: "fridge", x: 0.86, scale: 1.1 }] },
      // "Ngày xưa anh mõ phải thổi tù và báo việc làng khắp tổng"
      { line: 1, at: 0.17, cd: { arms: "wave" } },
      // "tức là nhiều làng gộp lại"
      { line: 1, at: 0.41, camera: "wide", cd: { arms: "raise", expr: "happy" } },
      // "Câu này trách người lo việc chung, việc người"
      { line: 1, at: 0.61, cd: { arms: "point", expr: "neutral" }, tc: { expr: "sad" }, fx: { kind: "sweat", on: "TC" } },
      // "hăng hơn việc nhà, tốn công mà chẳng được gì."
      { line: 1, at: 0.81, cd: { arms: "shrug", expr: "sad" } },
      { line: 1, at: 0.94, tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Tù và là cái kèn sừng trâu hoặc vỏ ốc. Ngày xưa anh mõ phải thổi tù và báo việc làng khắp tổng, tức là nhiều làng gộp lại, mà chẳng ai trả công. Câu này trách người lo việc chung, việc người hăng hơn việc nhà, tốn công mà chẳng được gì.",
    example: {
      shot: "Văn phòng: TC đặt trà sữa, nhắc sinh nhật, sửa máy in cho cả phòng",
      lines: [
        cd("Như ở công ty, mày tự nhận đặt trà sữa, nhắc sinh nhật, sửa máy in cho cả phòng. Lương không thêm đồng nào, nhưng ai cũng quý. Miễn là việc mình vẫn xong!"),
      ],
      stage: [
        // "Như ở công ty, mày tự nhận đặt trà sữa"
        {
          line: 0,
          cut: true,
          scene: { id: "classroom", text: "PHÒNG\nKINH DOANH" },
          camera: "wide",
          cd: { x: 0.27, hand: null, arms: "point", expr: "neutral" },
          tc: { x: 0.66, hand: { id: "paper", text: "ĐẶT 12 LY\nTRÀ SỮA" }, arms: "hold", expr: "happy", move: "bounce" },
          items: [],
        },
        // "nhắc sinh nhật"
        { line: 0, at: 0.25, tc: { hand: { id: "paper", text: "MAI SINH\nNHẬT SẾP" } }, fx: { kind: "hearts", on: "TC" } },
        // "sửa máy in cho cả phòng"
        { line: 0, at: 0.38, tc: { hand: null, arms: "up2", move: "jump" }, fx: { kind: "sweat", on: "TC" } },
        // "Lương không thêm đồng nào"
        { line: 0, at: 0.55, camera: "TC", tc: { arms: "shrug", expr: "sad", move: "idle" }, fx: { kind: "question", on: "TC", text: "+0Đ" } },
        // "nhưng ai cũng quý"
        { line: 0, at: 0.72, camera: "wide", tc: { expr: "happy" }, cd: { expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
        // "Miễn là việc mình vẫn xong!"
        { line: 0, at: 0.86, camera: "CD", cd: { arms: "raise", expr: "neutral" }, fx: { kind: "exclaim", on: "CD" } },
      ],
    },
    punchline: {
      shot: "Trời còn tối, TC giơ đồng hồ 5:00 thổi kèn báo thức cả xóm, Cụ Đồ giật mình bật dậy",
      lines: [
        tc("Cháu hiểu rồi! Từ mai cháu nhận việc chung cho cả xóm!"),
        cd("Ngoan! Việc gì?"),
        tc("Thổi kèn báo thức cả xóm lúc 5 giờ sáng. Miễn phí, không ai nhờ ạ!"),
      ],
      stage: [
        // "Cháu hiểu rồi! Từ mai cháu nhận việc chung"
        {
          line: 0,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.27, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.66, hand: null, arms: "raise", expr: "smug", move: "bounce" },
          items: [],
        },
        // "Ngoan! Việc gì?"
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { move: "idle" }, fx: { kind: "sparkle", on: "CD" } },
        // "Thổi kèn báo thức cả xóm lúc 5 giờ sáng"
        {
          line: 2,
          cut: true,
          scene: "night",
          camera: "wide",
          cd: { arms: "down", expr: "neutral" },
          tc: { hand: { id: "alarm-clock", text: "5:00" }, arms: "raise", expr: "happy", move: "jump" },
          fx: { kind: "exclaim", on: "TC", text: "TUUU!" },
        },
        { line: 2, at: 0.45, cd: { expr: "shock", arms: "up2", move: "jump" }, fx: { kind: "surprise", on: "CD" } },
        // "Miễn phí, không ai nhờ ạ!"
        { line: 2, at: 0.75, camera: "TC", tc: { expr: "smug", move: "bounce" } },
        { line: 2, at: 0.9, camera: "wide", cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),

  makeEpisode({
    day: 7,
    week,
    theme,
    idiom: "Chó treo mèo đậy",
    meaning: "Có của phải biết cất giữ cẩn thận, cảnh giác kẻ gian, và phòng mỗi thứ đúng cách của nó.",
    question: "Đồ gì của bạn hay bị 'mượn mà không trả' nhất: sạc điện thoại, ô hay hộp cơm trong tủ lạnh?",
    hook: {
      shot: "Phòng khách, con Vàng bị buộc đai vải treo lủng lẳng từ trần nhà xuống, con Mướp bị chụp lồng bàn tre nhưng thò đầu ra ngoài; TC hai tay giữ dây kéo",
      lines: [tc("Ông ơi ra giữ hộ cháu sợi dây với, con Vàng dạo này béo quá, cháu kéo muốn đứt cả hơi mới lên được đấy!")],
      stage: [
        // Con Vàng treo lủng lẳng giữa nhà, con Mướp bị úp lồng bàn góc phải
        {
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { x: 0.18, expr: "shock" },
          tc: { x: 0.64, arms: "up2", expr: "smug", move: "bounce" },
          items: [
            { id: "vang", prop: { id: "cho-vang-treo", text: "GÂU?!" }, x: 0.44, scale: 0.92 },
            { id: "muop", prop: { id: "meo-muop-day", text: "MEO!" }, x: 0.84, scale: 0.82 },
          ],
        },
        // "cháu kéo muốn đứt cả hơi mới lên được đấy!"
        { line: 0, at: 0.52, camera: "TC", tc: { arms: "raise", expr: "happy", move: "idle" }, fx: { kind: "sweat", on: "TC" } },
      ],
    },
    titleStage: [
      { line: 0, camera: "CD", cd: { expr: "angry", arms: "hips" }, tc: { move: "idle" }, fx: { kind: "anger", on: "CD" } },
      { line: 1, camera: "wide", cd: { arms: "down", expr: "confused" }, tc: { arms: "raise", expr: "smug", move: "bounce" } },
    ],
    ask: "Ơ kìa cái thằng này! Ông bảo mày ở nhà trông mâm cơm, làm sao lại lôi chó mèo ra hành hạ thế kia?",
    answer: "Đâu, cháu có hành hạ gì đâu! Cháu đang làm đúng theo lời ông dặn là Chó treo mèo đậy đấy chứ ạ!",
    misread: {
      shot: "TC khoe con Mướp đã bị úp lồng bàn thì sau lưng TC con Mướp lách ra chạy vào bếp; TC quay sang khoe con Vàng đang treo thì con Vàng giãy đứt dây rơi xuống đất rồi phóng theo vào bếp; hai ông cháu chạy vào bếp thấy chó đang gặm thịt dưới đất, mèo ngồi trên bàn chén sạch đĩa cá kho",
      lines: [
        tc("Thì đấy nhé, con Mướp đang nằm ngủ, cháu lấy luôn cái lồng bàn úp vào người nó cho kín, thế là xong phần 'mèo đậy'!"),
        tc("Còn con Vàng thì cháu buộc võng kéo tít lên cao thế này... Ơ kìa, nó giãy đứt cả dây rồi! Vàng ơi đứng lại, sao cả hai đứa lại phóng hết vào bếp thế kia?!"),
        cd("Ối giời ơi là giời! Mày treo với đậy kiểu đấy thì hỏng rồi! Vừa sổng vào bếp một cái là con Vàng đã ngoạm ngay miếng thịt để dưới đất, còn con Mướp thì nhảy tót lên bàn chén sạch đĩa cá kho rồi kia kìa!"),
      ],
      stage: [
        {
          line: 0,
          camera: "wide",
          cd: { expr: "confused" },
          tc: { x: 0.62, arms: "point", expr: "smug", move: "idle" },
          items: [
            { id: "vang", prop: "cho-vang-treo", x: 0.42, scale: 0.92 },
            { id: "muop", prop: { id: "meo-muop-day", text: "MEO!" }, x: 0.84, scale: 0.82 },
          ],
        },
        {
          line: 0,
          at: 0.6,
          tc: { arms: "hips", expr: "happy", move: "bounce" },
          items: [
            { id: "vang", prop: "cho-vang-treo", x: 0.42, scale: 0.92 },
            { id: "muop", prop: { id: "meo-muop", text: "MEO!" }, x: 0.86, scale: 0.85 },
          ],
          fx: { kind: "sparkle", on: "TC" },
        },
        {
          line: 0,
          at: 0.82,
          items: [
            { id: "vang", prop: "cho-vang-treo", x: 0.42, scale: 0.92 },
            { id: "muop", prop: "meo-muop", x: 1.3, scale: 0.85 },
          ],
        },
        {
          line: 1,
          camera: "wide",
          tc: { x: 0.62, arms: "raise", expr: "smug", move: "idle" },
          items: [{ id: "vang", prop: { id: "cho-vang-treo", text: "GÂU!" }, x: 0.44, scale: 0.92 }],
        },
        {
          line: 1,
          at: 0.38,
          cd: { expr: "shock", arms: "up2" },
          tc: { expr: "shock", arms: "up2", move: "jump" },
          items: [{ id: "vang", prop: { id: "cho-vang", text: "GÂU!" }, x: 0.44, scale: 0.9 }],
          fx: { kind: "bop", on: "TC", text: "PHỰT!" },
        },
        {
          line: 1,
          at: 0.64,
          tc: { x: 0.74, arms: "point", expr: "shock", move: "shake" },
          items: [{ id: "vang", prop: "cho-vang", x: 1.3, scale: 0.9 }],
          fx: { kind: "sweat", on: "TC" },
        },
        {
          line: 2,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.22, arms: "point", expr: "angry", move: "shake" },
          tc: { x: 0.82, arms: "down", expr: "neutral", move: "idle" },
          items: [
            { id: "vang", prop: "cho-vang-an", x: 0.42, scale: 0.9, front: true },
            { id: "muop", prop: "meo-muop-an", x: 0.62, on: "table", scale: 0.88 },
          ],
          fx: { kind: "anger", on: "CD" },
        },
        { line: 2, at: 0.55, cd: { move: "idle" }, tc: { arms: "up2", expr: "shock", move: "tremble" }, fx: { kind: "surprise", on: "TC" } },
      ],
    },
    flipStage: [
      { line: 0, camera: "wide", cd: { x: 0.42, hand: "fan", arms: "hit", expr: "angry", move: "idle" }, tc: { x: 0.72, move: "idle", arms: "down" } },
      { line: 0, at: 0.3, fx: { kind: "bop", on: "TC" }, tc: { expr: "shock", move: "tremble" } },
      {
        line: 1,
        camera: "CD",
        cd: { x: 0.24, arms: "point", expr: "neutral", move: "idle" },
        tc: { x: 0.78, move: "idle", expr: "confused" },
        items: [],
      },
      {
        line: 1,
        at: 0.26,
        camera: "wide",
        cd: { hand: "fan", arms: "raise", expr: "smug" },
        items: [
          { id: "gio", prop: "gio-thit-treo", x: 0.46, scale: 0.9 },
          { id: "vang", prop: { id: "cho-vang", text: "ẲNG..." }, x: 0.44, scale: 0.85, front: true },
        ],
      },
      {
        line: 1,
        at: 0.48,
        cd: { hand: "fan", arms: "point", expr: "neutral" },
        items: [
          { id: "gio", prop: "gio-thit-treo", x: 0.42, scale: 0.9 },
          { id: "vang", prop: "cho-vang", x: 0.38, scale: 0.82, front: true },
          { id: "noi", prop: "rice-cooker", x: 0.54, on: "table" },
          { id: "muop", prop: { id: "meo-muop", text: "MEO?" }, x: 0.68, on: "table", scale: 0.78 },
        ],
        fx: { kind: "sparkle", on: "CD" },
      },
      { line: 1, at: 0.72, cd: { arms: "wave", expr: "happy" }, tc: { expr: "neutral" } },
      { line: 1, at: 0.94, camera: "wide", tc: { expr: "happy", arms: "raise" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
    ],
    explain:
      "Người xưa bảo treo với đậy là nói chuyện cất giữ đồ ăn thức uống trong nhà, chứ ai bảo mày đi treo con chó lên trần nhà bao giờ! Con chó nó không biết trèo, thì thức ăn phải treo lên cao; còn con mèo nó leo trèo giỏi, thì nồi cá, bát canh phải đậy vung, úp lồng bàn cho thật kỹ. Nói rộng ra là có của ăn của để thì phải biết giữ gìn, mà mỗi thứ lại phải có một cách trông coi khác nhau thì mới không bị mất!",
    flipShot: "Cụ Đồ gõ quạt, chỉ vào giỏ thịt treo cao trên đầu con Vàng rồi chỉ vào nồi cá đậy kín trước mặt con Mướp",
    example: {
      shot: "Lớp học / văn phòng: điện thoại cài mật khẩu, tiền giấy tờ cất trong balo, cho mượn bút hay sạc thì ghi vào sổ đòi ngay",
      lines: [
        cd("Giống như chuyện mày đi học, đi làm hàng ngày ấy: điện thoại với máy tính thì phải cài mật khẩu cho cẩn thận, tiền nong giấy tờ thì phải cất vào ngăn kéo trong cặp, còn mấy thứ như cái bút hay cục sạc mà cho bạn mượn là phải nhớ đòi ngay, chứ cứ vứt lung tung là hôm trước hôm sau chẳng còn cái nào!"),
      ],
      stage: [
        {
          line: 0,
          cut: true,
          scene: { id: "classroom", text: "CÁCH\nGIỮ ĐỒ" },
          camera: "wide",
          cd: { x: 0.27, hand: null, arms: "point", expr: "neutral" },
          tc: { x: 0.68, hand: "phone", arms: "hold", expr: "smug", move: "idle" },
          items: [],
          fx: { kind: "exclaim", on: "TC", text: "****" },
        },
        { line: 0, at: 0.34, tc: { hand: null, back: "backpack", arms: "hips", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        {
          line: 0,
          at: 0.58,
          tc: { hand: { id: "paper", text: "SỔ ĐÒI ĐỒ\nCHO MƯỢN" }, arms: "raise", expr: "smug", move: "idle" },
          fx: { kind: "exclaim", on: "TC" },
        },
        { line: 0, at: 0.84, camera: "CD", cd: { arms: "raise", expr: "happy" }, tc: { back: null }, fx: { kind: "sparkle", on: "CD" } },
      ],
    },
    punchline: {
      shot: "Trong bếp, giỏ thịt đã treo cao trước mặt con Vàng, nồi cá đậy kín trước mặt con Mướp; CĐ chỉ cái tủ lạnh bị dán bìa carton và quấn băng dính chữ X 'CẤM MỞ!', TC cười bảo để phòng người hay lục tủ ăn đêm",
      lines: [
        tc("À, thế thì cháu hiểu rồi! Bây giờ giỏ thịt cháu treo tít lên cao cho con Vàng đứng dưới nhìn thèm chơi, còn nồi cá kho trên bàn cháu cũng đậy vung kín mít để con Mướp chịu chết luôn!"),
        cd("Ừ, thế mới là biết nghe lời chứ! Ơ... mà sao cái tủ lạnh đằng kia mày lại lấy bìa với băng dính dán chằng chịt vào làm gì thế hả?"),
        tc("Dạ, trong ngăn mát có đĩa đùi gà rán phần của cháu. Con Vàng với con Mướp thì làm gì biết mở cửa tủ lạnh... chỗ đấy là cháu phải dán kỹ để đề phòng có người đêm hôm hay dậy lục tủ ăn vụng ông ạ!"),
      ],
      stage: [
        {
          line: 0,
          cut: true,
          scene: "kitchen",
          camera: "wide",
          cd: { x: 0.2, hand: "fan", arms: "down", expr: "neutral" },
          tc: { x: 0.62, hand: null, back: null, arms: "raise", expr: "smug", move: "bounce" },
          items: [
            { id: "gio", prop: "gio-thit-treo", x: 0.38, scale: 0.85 },
            { id: "vang", prop: "cho-vang", x: 0.36, scale: 0.78, front: true },
            { id: "noi", prop: "rice-cooker", x: 0.48, on: "table" },
            { id: "muop", prop: "meo-muop", x: 0.76, on: "table", scale: 0.75 },
          ],
        },
        { line: 0, at: 0.52, tc: { arms: "point", expr: "happy", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
        { line: 1, camera: "CD", cd: { arms: "raise", expr: "happy" }, fx: { kind: "sparkle", on: "CD" } },
        {
          line: 1,
          at: 0.32,
          camera: "wide",
          cd: { arms: "point", expr: "confused" },
          tc: { x: 0.56, expr: "smug" },
          items: [
            { id: "vang", prop: "cho-vang", x: 0.36, scale: 0.78, front: true },
            { id: "noi", prop: "rice-cooker", x: 0.42, on: "table" },
            { id: "tu", prop: { id: "fridge", text: "CẤM MỞ!" }, x: 0.86, scale: 1.1 },
          ],
          fx: { kind: "question", on: "CD" },
        },
        { line: 2, camera: "TC", tc: { arms: "hips", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        { line: 2, at: 0.34, camera: "wide", tc: { arms: "shrug", expr: "smug", move: "idle" } },
        { line: 2, at: 0.58, tc: { arms: "point", expr: "happy", move: "bounce" }, cd: { arms: "up2", expr: "shock" }, fx: { kind: "sweat", on: "CD" } },
        { line: 2, at: 0.88, cd: { expr: "angry", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
      ],
    },
  }),
];
