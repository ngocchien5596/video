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
      shot: "TC ăn xoài xong giơ lệnh truy nã 'Kẻ trồng xoài', rồi chỉ hạt xoài vừa vứt ngoài vườn, hoảng hốt giơ hai tay xin ra đầu thú",
      lines: [
        tc("Ông dặn ăn quả phải nhớ kẻ trồng cây. Chữ 'kẻ' nghe như 'kẻ gian', nên cháu lập hồ sơ truy nã luôn!"),
        cd("Truy nã ai?!"),
        tc("Khoan! Cháu vừa vứt hạt xoài ra vườn. Nhỡ nó mọc thành cây, thì kẻ trồng cây chính là cháu!"),
        tc("Thôi, cháu ra đầu thú đây ông ạ!"),
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
        // "Khoan! Cháu vừa vứt hạt xoài ra vườn": chỉ hạt xoài dưới đất
        {
          line: 2,
          camera: "wide",
          cd: { expr: "confused", arms: "down", move: "idle" },
          tc: { hand: null, arms: "point", expr: "neutral" },
          items: [{ id: "hat", prop: "mango-bitten", x: 0.85 }],
          fx: { kind: "exclaim", on: "TC" },
        },
        // "Nhỡ nó mọc thành cây"
        { line: 2, at: 0.4, tc: { expr: "confused", arms: "down" }, fx: { kind: "question", on: "TC" } },
        // "thì kẻ trồng cây chính là cháu!"
        { line: 2, at: 0.65, camera: "TC", tc: { expr: "shock", move: "tremble" } },
        // "Thôi, cháu ra đầu thú đây ông ạ!": giơ hai tay đầu hàng
        { line: 3, camera: "wide", tc: { arms: "up2", expr: "sad", move: "tremble" } },
        { line: 3, at: 0.25, cd: { expr: "shock" }, fx: { kind: "sweat", on: "CD" } },
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
    },
    ask: "Xoay chóng cả mặt, làm trò gì đấy?",
    misread: {
      shot: "TC chỉnh ghế theo la bàn, hai tay ôm khư khư nồi cơm điện, mắt nhìn CĐ đầy cảnh giác",
      lines: [
        tc("Ngồi trông hướng là phải tra la bàn cho chuẩn hướng Đông Nam!"),
        tc("Còn ăn trông nồi là cháu phải ôm chặt nồi cơm để canh chừng, kẻo có ai ăn vụng!"),
        cd("Ông ăn cơm nhà ông mà mày canh như canh trộm thế à?!"),
      ],
    },
    explain:
      "Trông nồi là để ý xem cơm canh còn nhiều hay ít mà chừa phần cho cả nhà. Ngồi trông hướng là ngồi ngay ngắn, lịch sự, không chắn lối đi.",
    example: {
      shot: "Cảnh ăn đùi gà rán cùng gia đình, bạn bè",
      lines: [
        cd("Như đĩa gà rán có 4 miếng cho 4 người, mày chén một mình 3 miếng là không 'trông nồi'. Vừa ăn vừa gác chân lên ghế là không 'trông hướng'!"),
      ],
    },
    punchline: {
      shot: "TC gắp 1 miếng gà vào bát CĐ, rồi bê nguyên đĩa gà còn lại chạy biến",
      lines: [
        tc("Cháu trông kỹ rồi! Nồi cơm vẫn còn đầy nên cháu nhường ông trông nồi..."),
        tc("...còn cháu xin phép trông hộ ông đĩa gà rán ạ!"),
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
    },
    ask: "Mang bát ăn cơm ra sân làm gì?",
    misread: {
      shot: "TC húp xong cháo, đặt bát nhựa xuống sút tung lên trời, rồi xếp tiếp một hàng bát nhựa",
      lines: [
        tc("Thì ông dạy thế nào cháu làm đúng thế đấy! Ăn xong bát cháo là phải sút một cú thật đẹp!"),
        tc("Sáng nay cháu ăn hai bát, nên phải đá đủ hai quả mới đúng luật!"),
        cd("Mày đá vỡ hết bát thì trưa nay cả nhà ăn cơm bằng vung nồi à?!"),
      ],
    },
    explain:
      "Ngày xưa lúc đói được người ta thương, cho bát cháo ăn. Ăn no xong lại đá tung cái bát đi — nghĩa là kẻ vô ơn, được bạn giúp xong lại quay ra đối xử tệ với bạn!",
    flipShot: "Cụ Đồ dùng chổi đỡ cái bát nhựa như thủ môn bắt bóng",
    example: {
      shot: "Cảnh bàn học ở lớp, cho bạn mượn bút",
      lines: [
        cd("Như ở lớp quên mang bút, bạn tốt bụng cho mượn bút làm bài kiểm tra. Thế mà hết giờ không cảm ơn, còn làm hỏng bút rồi đổ thừa tại bút của bạn dởm!"),
      ],
    },
    punchline: {
      shot: "TC ôm cái bát vào lòng, lấy chăn đắp cho cái bát trên ghế sofa",
      lines: [
        tc("Cháu sợ mang tiếng vô ơn lắm! Ăn cháo xong cháu đắp chăn ru cái bát ngủ luôn..."),
        tc("...Rửa nước lạnh bát nó cảm lạnh ông ạ, đống bát trong bồn ông rửa hộ cháu nhé!"),
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
    },
    ask: "Mày dán kín cái tủ lạnh làm gì?",
    misread: {
      shot: "TC chỉ cây ổi ngoài sân bị quấn dây, chậu cà chua bị cắm que rào, rồi đứng chắn trước tủ lạnh",
      lines: [
        tc("Trưa nay cháu ăn ổi nên cháu rào cây ổi. Cháu ăn canh cà chua nên cháu rào luôn chậu cà chua!"),
        tc("Mà nãy cháu vừa ăn kem trong tủ lạnh... nên cháu phải rào luôn cái tủ lạnh cho chắc!"),
        cd("Thế tối nay mẹ mày mở tủ lạnh nấu cơm kiểu gì hả cháu?!"),
      ],
    },
    explain:
      "Cây cho mình quả ngọt thì mình rào chắn, chăm sóc cho cây. Ý ông bà là mình sống trong gia đình nào, học ở trường lớp nào thì phải biết yêu thương, giữ gìn và bảo vệ nơi đó!",
    example: {
      shot: "Cảnh sân trường, cổ vũ đá bóng lớp",
      lines: [
        cd("Như mày học lớp 5A thì phải giữ lớp sạch đẹp, cổ vũ cho đội bóng của lớp mình. Đang đá cho lớp 5A mà chạy sang... reo hò khi đội bạn ghi bàn là dở rồi!"),
      ],
    },
    punchline: {
      shot: "TC cầm dây ruy-băng quấn quanh người Cụ Đồ, dán giấy 'CỦA CHÁU' lên áo ông",
      lines: [
        tc("Hay quá! Ngày nào cháu cũng được ăn kẹo từ túi áo của ông..."),
        tc("...nên cháu phải rào ông lại, không cho đứa hàng xóm nào sang xin kẹo ông nữa!"),
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
    },
    ask: "Nhà cửa đàng hoàng sao cứ chui lủi thế?",
    misread: {
      shot: "TC chấm quả dưa chuột vào muối đếm 1-2-3 rồi ăn luôn, sau đó bê gối chạy theo tiếng đồng hồ",
      lines: [
        tc("Dưa chuột cháu chấm muối 3 giây là ăn luôn, gọi là ăn dưa muối xổi!"),
        tc("Còn 'ở thì' là mỗi giờ cháu ở một góc: 8 giờ ở sofa, 9 giờ chui gầm bàn, 10 giờ ra hiên đứng!"),
        cd("Mày tập làm du mục ngay trong phòng khách đấy à?!"),
      ],
    },
    explain:
      "Muối xổi là làm vội để ăn ngay. Ở thì là ở tạm bợ theo mùa. Câu này nhắc nhở đừng làm việc qua quýt, đối phó cho xong chuyện trước mắt mà lười rèn luyện lâu dài!",
    flipShot: "Cụ Đồ ngồi phịch xuống ghế, tịch thu cái đồng hồ báo thức",
    example: {
      shot: "Cảnh học bài đối phó sát giờ kiểm tra",
      lines: [
        cd("Như cả tuần mải chơi không chịu học, sát giờ kiểm tra mới mở vở học vẹt vài dòng. Hôm đó may thì nhớ, hôm sau hỏi lại là quên sạch sành sanh!"),
      ],
    },
    punchline: {
      shot: "TC mở sách lớp 12 nhìn đúng 2 giây rồi gấp lại cái bốp, ôm quả bóng chạy đi",
      lines: [
        tc("Từ nay cháu quyết tâm tính chuyện lâu dài, không ăn xổi nữa!"),
        cd("Giỏi lắm!"),
        tc("Cháu vừa đọc trước bìa sách lớp 12 rồi, giờ cháu đi đá bóng đến năm 18 tuổi là vừa đẹp!"),
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
    },
    ask: "Đo bụng với điểm kiểm tra thì liên quan gì?",
    misread: {
      shot: "Cắt cảnh nhanh: TC vừa gặm đùi gà vừa áp quyển sách Toán lên bụng, mặt ngơ ngác",
      lines: [
        tc("Ông bảo 'ăn vóc học hay' còn gì! Cháu tưởng cứ ăn cho vóc dáng to khỏe là chữ tự khắc hay!"),
        tc("Tối qua trước khi kiểm tra Toán, cháu ăn liền 2 bát cơm, uống 3 hộp sữa mà vào lớp đầu vẫn trống rỗng!"),
        cd("Mày nạp vào bụng chứ có nạp vào đầu đâu!"),
      ],
    },
    explain:
      "Ăn vóc là ăn uống đủ chất để có sức vóc khỏe mạnh. Học hay là phải chịu khó học hành mới biết điều hay lẽ phải. Hai việc phải đi đôi với nhau, chứ ăn không thay cho học được!",
    example: {
      shot: "Cảnh ăn sáng đầy đủ rồi ngồi vào bàn học",
      lines: [
        cd("Muốn học tốt thì sáng phải ăn đủ bữa cho khỏe người, rồi có sức mới ngồi vào bàn giải toán, đọc sách được."),
      ],
    },
    punchline: {
      shot: "TC đặt quyển vở cạnh đĩa bánh bao, tay trái cầm bánh, tay phải cầm bút",
      lines: [
        tc("À, ăn với học phải đi đôi! Vậy cứ giải xong 1 phép tính là cháu phải ăn 1 cái bánh bao..."),
        tc("...Bài về nhà có 20 phép tính, ông đi hấp gấp cho cháu 20 cái bánh bao đi ạ!"),
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
    },
    ask: "Một hạt cơm mà nhai từ sáng tới trưa thế?",
    misread: {
      shot: "TC chống cằm nhắm mắt nghĩ 10 giây, nói chậm như ốc sên, CĐ ngủ gật luôn trên bàn",
      lines: [
        cd("Thế trưa nay mày muốn ăn món gì?"),
        tc("Để... cháu... nghĩ... kỹ... đã... Cháu... muốn... ăn... trứng... rán..."),
        cd("Mày nghĩ xong câu nói thì trứng trong chảo cháy thành than rồi con ạ!"),
      ],
    },
    explain:
      "Ăn có nhai là ăn từ tốn, nhai kỹ cho khỏi nghẹn. Nói có nghĩ là trước khi mở lời phải nghĩ xem câu đó có lễ phép không, có làm bạn bè hay ông bà buồn không — chứ không phải nói chậm như rùa bò!",
    flipShot: "Cụ Đồ giật mình tỉnh dậy, gõ nhẹ quạt lên bàn",
    example: {
      shot: "Cảnh nói chuyện với bạn bè ở lớp và người lớn ở nhà",
      lines: [
        cd("Như thấy bạn mới cắt tóc ngắn, đừng buột miệng trêu chọc làm bạn xấu hổ. Lúc đang giận dỗi cũng phải nghĩ kỹ, đừng nói lời hỗn hào với người lớn."),
      ],
    },
    punchline: {
      shot: "TC đứng khoanh tay, nhắm mắt đếm 3 giây rồi mở mắt cười hì hì nhìn Cụ Đồ",
      lines: [
        tc("Cháu vừa suy nghĩ cực kỳ kỹ suốt 3 giây rồi mới nói câu này đấy ạ..."),
        cd("Câu gì?"),
        tc("...Ông đẹp trai nhất nhà, nên ông cho cháu xin 10 nghìn mua kem nhé!"),
      ],
    },
  }),
];
