import { cd, makeEpisode, tc } from "./make.ts";

const week = 4;
const theme = "Cư xử, gia đình";

export const TUAN_4 = [
  makeEpisode({
    day: 22,
    week,
    theme,
    idiom: "Bán anh em xa mua láng giềng gần",
    meaning: "Hàng xóm ở gần, lúc cần giúp được nhanh hơn họ hàng ở xa, nên phải quý tình láng giềng.",
    question: "Lần gần nhất hàng xóm giúp bạn một việc là việc gì?",
    hook: {
      shot: "Ảnh chụp màn hình tin rao trên chợ online: \"pass anh họ, còn mới\"",
      lines: [tc("Pass gấp ông anh họ bên Úc. Còn mới, ít dùng, bao ship!")],
    },
    ask: "Mày đăng bán cái gì lên chợ online thế?",
    misread: {
      shot: "TC chụp ảnh anh họ trong khung video call để đăng bán, rồi cầm xấp tiền sang gõ cửa chú hàng xóm",
      lines: [
        tc("Anh họ cháu ở tận Úc, mười năm gặp một lần. Cháu bán giá hữu nghị."),
        tc("Có tiền rồi, cháu sang hỏi mua chú hàng xóm. Chú ơi, chú bán mình bao nhiêu ạ?"),
        tc("Chú không bán. Cháu trả thêm cái máy lọc nước, chú vẫn đóng cửa!"),
        cd("Người ta là người, có phải máy giặt cũ đâu mà mua với bán!"),
      ],
    },
    explain:
      "Câu này không bảo bán người thật đâu. Ý là họ hàng ở xa, lúc có việc gấp chẳng về kịp. Còn hàng xóm ở ngay sát vách, tối lửa tắt đèn có nhau. Nên phải quý, phải giữ tình láng giềng.",
    example: {
      shot: "Phòng trọ nửa đêm, cô gái sốt nằm đắp chăn, chị phòng bên bưng bát cháo sang",
      lines: [
        cd("Như bạn thuê trọ, nửa đêm sốt cao. Bố mẹ ở quê chỉ gọi điện hỏi được."),
        cd("Chị phòng bên mang thuốc sang, còn nấu cho bát cháo nóng."),
      ],
    },
    punchline: {
      shot: "TC mang đĩa ổi sang nhà bên, quay về ôm nồi chè to; cảnh cuối TC cầm cái nồi rỗng đứng trước cửa hàng xóm",
      lines: [
        tc("Cháu mang sang chị hàng xóm một đĩa ổi, chị gửi lại cả nồi chè!"),
        cd("Thế mai mày định mang gì sang?"),
        tc("Mang cái nồi không sang, xem chị đổ đầy gì ạ."),
      ],
    },
  }),

  makeEpisode({
    day: 23,
    week,
    theme,
    idiom: "Tai vách mạch dừng",
    meaning: "Chuyện tưởng kín vẫn có thể bị nghe thấy và lan ra, nên nói chuyện riêng phải giữ lời.",
    question: "Bạn từng bị lộ chuyện chỉ vì nói ở chỗ tưởng là kín chưa?",
    hook: {
      shot: "TC chiếu đèn bàn vào bức tường như phòng thẩm vấn",
      lines: [tc("Tường ơi, tối qua mày nghe được những gì? Khai mau!")],
    },
    ask: "Mày đang tra hỏi bức tường đấy à?",
    misread: {
      shot: "TC dán mười cái tai giả lên tường, rồi đeo ống nghe áp vào tường như bác sĩ",
      lines: [
        tc("Vách có tai thì phải nghe. Cháu dán thêm mười cái tai giả."),
        tc("Còn mạch thì cháu đo rồi. Tường nhà mình mạch đập bảy mươi, khỏe re!"),
        tc("Mà sao lại là dừng? À, nói xong phải dừng ngay, không thì tường đi mách!"),
        cd("Trời ơi, nó còn khám sức khỏe cho cái tường!"),
      ],
    },
    explain:
      "Ngày xưa vách nhà trát bằng đất, bên trong là nan tre đan làm cốt, gọi là dừng. Vách mỏng, có khe, ngoài sân nghe được hết. Ý là chuyện tưởng kín vẫn lọt ra ngoài, nên nói chuyện riêng phải giữ lời. Dạng gốc là dừng, nhiều người quen nói là rừng.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): cung điện Hy Lạp, vua Mi-đát bỏ mũ lộ đôi tai lừa, đội mũ giấu lại, thợ cạo cầm kéo trố mắt; bãi đất ven sông, thợ cạo đào hố nói thầm rồi lấp lại, lau sậy mọc lên, gió thổi ra chữ \"VUA CÓ TAI LỪA!\", vua chạy ra hốt hoảng",
      memory: { label: "THẦN THOẠI: VUA MI-ĐÁT" },
      lines: [
        cd("Như vua Mi-đát trong thần thoại Hy Lạp ấy: có đôi tai lừa, giấu kỹ dưới mũ, chỉ người thợ cạo biết."),
        cd("Ông thợ cạo không nhịn được, đào hố nói thầm vào rồi lấp đất lại. Ai ngờ lau sậy mọc lên, gió thổi rì rào, cả nước biết vua có tai lừa."),
      ],
      // Cụ Đồ đóng vua Mi-đát, Thằng Cháu đóng thợ cạo.
      stage: [
        // "Như vua Mi-đát trong thần thoại Hy Lạp ấy": vua đội mũ, oai vệ trong cung
        {
          line: 0,
          cut: true,
          scene: "midas-cung",
          camera: "wide",
          cd: { role: "midas-vua", x: 0.3, hand: null, back: null, head: "midas-mu", face: null, arms: "hips", expr: "smug", move: "idle" },
          tc: { role: "midas-tho-cao", x: 1.4, hand: "midas-keo", back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // "có đôi tai lừa": bỏ mũ, lộ tai
        { line: 0, at: 0.43, camera: "CD", cd: { head: null, arms: "shrug", expr: "sad" }, fx: { kind: "surprise", on: "CD" } },
        // "giấu kỹ dưới mũ": đội mũ lại, liếc ngang
        { line: 0, at: 0.6, cd: { head: "midas-mu", arms: "up2", expr: "smug", move: "bounce" } },
        // "chỉ người thợ cạo biết": thợ cạo vào, vua bỏ mũ cho cắt tóc, thợ cạo trố mắt
        { line: 0, at: 0.75, camera: "wide", cd: { head: null, arms: "down", expr: "neutral", move: "idle" }, tc: { x: 0.66, arms: "hold" } },
        { line: 0, at: 0.9, tc: { expr: "shock", move: "tremble" }, fx: { kind: "exclaim", on: "TC" } },

        // "Ông thợ cạo không nhịn được": ra bãi vắng, run bần bật vì ngứa miệng
        {
          line: 1,
          cut: true,
          scene: "midas-dong-co",
          camera: "TC",
          cd: { x: -0.4, head: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { x: 0.68, hand: null, arms: "up2", expr: "confused", move: "tremble" },
          items: [],
          fx: { kind: "sweat", on: "TC" },
        },
        // "đào hố": cầm xẻng đào
        { line: 1, at: 0.2, camera: "wide", tc: { hand: "midas-xeng", arms: "hit", expr: "angry", move: "idle" }, items: [{ id: "ho", prop: "midas-ho", x: 0.5 }], fx: { kind: "bop", on: "TC", text: "XÚC!" } },
        // "nói thầm vào": ghé xuống hố thì thầm
        { line: 1, at: 0.27, tc: { hand: null, arms: "hold", expr: "happy" }, fx: { kind: "exclaim", on: "TC", text: "TAI LỪA..." } },
        // "rồi lấp đất lại": lấp hố
        { line: 1, at: 0.38, tc: { hand: "midas-xeng", arms: "hit", expr: "smug" }, items: [{ id: "u", prop: "midas-u-dat", x: 0.5 }] },
        // "Ai ngờ lau sậy mọc lên"
        { line: 1, at: 0.53, tc: { hand: null, arms: "down", expr: "shock" }, items: [{ id: "lau", prop: "midas-lau-say", x: 0.47 }], fx: { kind: "exclaim", on: "TC" } },
        // "gió thổi rì rào": lau sậy nói ra bí mật
        { line: 1, at: 0.67, items: [{ id: "lau", prop: { id: "midas-lau-say", text: "VUA CÓ TAI LỪA!" }, x: 0.47 }], tc: { arms: "up2", move: "tremble" }, fx: { kind: "sweat", on: "TC" } },
        // "cả nước biết vua có tai lừa": vua chạy ra ôm đầu
        { line: 1, at: 0.79, cd: { x: 0.12, arms: "up2", expr: "shock", move: "tremble" }, tc: { expr: "sad" }, fx: { kind: "surprise", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC đưa tờ giấy gấp nhỏ cho CĐ, CĐ mở ra đọc to, tròn mắt",
      lines: [
        tc("Từ nay chuyện riêng cháu viết ra giấy cho kín."),
        cd("Ông ơi, cháu lỡ làm vỡ cái ấm trà của ông... CÁI ẤM NÀO?!"),
        tc("Ông đọc to thế, tường nghe hết rồi!"),
      ],
    },
  }),

  makeEpisode({
    day: 24,
    week,
    theme,
    idiom: "Ăn ốc nói mò",
    meaning: "Nói không có căn cứ, chẳng biết rõ mà cứ đoán mò, phán bừa.",
    question: "Tin đồn vô căn cứ nào về bạn khiến bạn dở khóc dở cười nhất?",
    hook: {
      shot: "TC bịt mắt, ngồi trước rổ ốc luộc, mút chùn chụt",
      lines: [tc("Cháu mút một con ốc là biết luôn tương lai của một người.")],
    },
    ask: "Bịt mắt ngồi ăn ốc làm gì thế?",
    misread: {
      shot: "TC bịt mắt thò tay mò trong rổ, mỗi lần bốc được một thứ lại phán to; cuối cùng bốc trúng lọ mắm đổ lên áo CĐ",
      lines: [
        tc("Ăn ốc thì phải nói, mà nói thì phải mò. Nhắm mắt mò rổ, trúng gì nói nấy."),
        tc("Ốc to: chị kia sắp cưới. Ốc bé: anh kia sắp mất ví."),
        tc("Lọ mắm: ông sắp dính mắm!"),
        cd("Đúng mỗi câu này, vì mày vừa đổ mắm lên áo ông!"),
      ],
    },
    explain:
      "Ăn ốc nói mò là nói không có căn cứ, chẳng biết gì cũng phán bừa. Có cách giải thích là mò ốc dưới nước đục, chẳng nhìn thấy gì, mò được đâu hay đấy. Nói năng kiểu đó dễ gây hiểu lầm, có khi làm khổ người khác.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đầu làng, con voi to đứng giữa, hai ông thầy bói (ông béo mắt nhắm, ông gầy kính đen) chống gậy dò tới; ông béo sờ vòi, ông gầy sờ đuôi, ông béo sờ chân voi; hai ông cãi nhau rồi vung gậy đánh nhau \"BỐP!\"",
      memory: { label: "NGỤ NGÔN: THẦY BÓI XEM VOI" },
      lines: [
        cd("Như năm ông thầy bói mù trong truyện Thầy bói xem voi ấy: mỗi ông sờ một chỗ, rồi phán voi sun sun như con đỉa, tun tủn như cái chổi sể cùn, sừng sững như cột đình."),
        cd("Chẳng ai thấy cả con voi, thế mà ai cũng quả quyết mình đúng, cãi nhau rồi đánh nhau tơi bời."),
      ],
      // Cụ Đồ đóng thầy bói béo (sờ vòi, chân), Thằng Cháu đóng thầy bói gầy (sờ đuôi).
      stage: [
        // "Như năm ông thầy bói mù": chống gậy dò đường tới chỗ con voi
        {
          line: 0,
          cut: true,
          scene: "thay-boi-lang",
          camera: "wide",
          cd: { role: "thay-boi-beo", x: -0.3, hand: "thay-boi-gay-truc", back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "thay-boi-gay", x: 1.3, hand: "thay-boi-gay-truc", back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "voi", prop: "thay-boi-voi", x: 0.52 }],
        },
        { line: 0, at: 0.06, cd: { x: 0.08 }, tc: { x: 0.88 } },
        // "mỗi ông sờ một chỗ": bỏ gậy, giơ tay sờ
        { line: 0, at: 0.35, cd: { hand: null, arms: "point", expr: "confused" }, tc: { hand: null, arms: "point", expr: "confused" }, fx: [{ kind: "question", on: "CD" }, { kind: "question", on: "TC" }] },
        // "sun sun như con đỉa": ông béo sờ vòi
        { line: 0, at: 0.53, camera: "CD", cd: { arms: "hold", expr: "smug", move: "bounce" }, fx: { kind: "exclaim", on: "CD", text: "ĐỈA!" } },
        // "tun tủn như cái chổi sể cùn": ông gầy sờ đuôi
        { line: 0, at: 0.68, camera: "TC", cd: { move: "idle" }, tc: { arms: "raise", expr: "smug", move: "bounce" }, fx: { kind: "exclaim", on: "TC", text: "CHỔI!" } },
        // "sừng sững như cột đình": ông béo sờ chân voi
        { line: 0, at: 0.86, camera: "wide", cd: { x: 0.3, arms: "point", expr: "shock" }, tc: { move: "idle", arms: "hips" }, fx: { kind: "exclaim", on: "CD", text: "CỘT ĐÌNH!" } },

        // "Chẳng ai thấy cả con voi": nhún vai, ngơ ngác
        { line: 1, camera: "wide", cd: { x: 0.24, arms: "shrug", expr: "confused" }, tc: { x: 0.78, arms: "shrug", expr: "confused" }, fx: [{ kind: "question", on: "CD" }, { kind: "question", on: "TC" }] },
        // "ai cũng quả quyết mình đúng": chống nạnh
        { line: 1, at: 0.3, cd: { arms: "hips", expr: "smug" }, tc: { arms: "hips", expr: "smug" } },
        // "cãi nhau": chỉ mặt nhau
        { line: 1, at: 0.64, cd: { x: 0.34, arms: "point", expr: "angry", move: "shake" }, tc: { x: 0.66, arms: "point", expr: "angry", move: "shake" }, fx: [{ kind: "anger", on: "CD" }, { kind: "anger", on: "TC" }] },
        // "rồi đánh nhau tơi bời": vung gậy (diễn nhẹ, kiểu hoạt hình)
        { line: 1, at: 0.79, cd: { hand: "thay-boi-gay-truc", arms: "hit", move: "jump" }, tc: { hand: "thay-boi-gay-truc", arms: "hit", move: "jump" }, fx: { kind: "bop", on: "TC", text: "BỐP!" } },
        { line: 1, at: 0.89, fx: { kind: "bop", on: "CD", text: "CỐP!" } },
        { line: 1, at: 0.97, cd: { arms: "down", expr: "sad", move: "tremble" }, tc: { arms: "down", expr: "sad", move: "tremble" }, fx: [{ kind: "sweat", on: "CD" }, { kind: "sweat", on: "TC" }] },
      ],
    },
    punchline: {
      shot: "TC giơ điện thoại, chỉ vào một bình luận ẩn danh trên màn hình",
      lines: [
        tc("Từ nay cháu nói gì cũng phải có căn cứ. Ông ơi, ông sinh năm bao nhiêu?"),
        cd("Năm 1950."),
        tc("Sai! Căn cứ hẳn hoi: một bình luận ẩn danh bảo ông sinh năm 1802."),
      ],
    },
  }),

  makeEpisode({
    day: 25,
    week,
    theme,
    idiom: "Mật ngọt chết ruồi",
    meaning: "Lời ngon ngọt, món lợi bày sẵn trước mắt có khi lại là cái bẫy.",
    question: "Lời mời ngon ngọt nào trên mạng suýt làm bạn mắc bẫy?",
    hook: {
      shot: "TC đeo găng tay, cầm chổi quét sơn và hũ mật ong to như đi phun thuốc",
      lines: [tc("Bình xịt hết rồi. Cháu chuyển sang diệt ruồi bằng mật ong!")],
    },
    ask: "Mày cầm hũ mật đi khắp nhà làm gì?",
    misread: {
      shot: "TC quét mật lên bàn, lên cửa, lên ghế; đàn kiến xếp hàng kéo vào; CĐ ngồi xuống ghế thì dính chặt",
      lines: [
        tc("Bôi mật lên bàn, ruồi bay tới, dính chân, xong phim. Rẻ hơn bình xịt!"),
        tc("Cháu bôi thêm lên cửa, lên ghế, lên cả cánh quạt cho chắc."),
        tc("Giờ ruồi chưa thấy đâu, mà kiến cả xóm kéo sang ăn tiệc."),
        cd("Ông vừa ngồi xuống ghế. Giờ ông dính chặt rồi đây này!"),
      ],
    },
    explain:
      "Mật ngọt chết ruồi là lời ngon ngọt, món lợi bày sẵn trước mắt có khi lại là cái bẫy. Ruồi ham ngọt, sà vào là dính, không ra được nữa. Người cũng vậy, nghe lời đường mật mà không tỉnh táo thì dễ mắc lừa.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): rừng, quạ đen ngậm miếng pho mát đứng trên cành cây; cáo đi tới dưới gốc, khen lông đẹp giọng hay; quạ khoái chí há mỏ hát, pho mát rơi, cáo đớp gọn rồi cười đắc ý, quạ tròn mắt",
      memory: { label: "NGỤ NGÔN: QUẠ VÀ CÁO" },
      lines: [
        cd("Như con quạ trong truyện Quạ và Cáo ấy: đang ngậm miếng pho mát trên cành, cáo đứng dưới gốc khen lông đẹp, khen giọng hay."),
        cd("Quạ sướng quá há mỏ ra hát, miếng pho mát rơi tọt vào miệng cáo."),
      ],
      // Cụ Đồ đóng quạ, Thằng Cháu đóng cáo.
      stage: [
        // "Như con quạ trong truyện Quạ và Cáo ấy": quạ đứng trên cành
        {
          line: 0,
          cut: true,
          scene: "qua-cao-rung",
          camera: "wide",
          cd: { role: "qua-cao-qua", x: 0.27, hand: null, back: null, head: null, face: "qua-cao-pho-mat-mo", arms: "down", expr: "smug", move: "idle" },
          tc: { role: "qua-cao-cao", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // "đang ngậm miếng pho mát trên cành"
        { line: 0, at: 0.33, camera: "CD", cd: { move: "bounce" }, fx: { kind: "sparkle", on: "CD" } },
        // "cáo đứng dưới gốc": cáo đi vào, nhìn lên thèm thuồng
        { line: 0, at: 0.56, camera: "wide", cd: { move: "idle" }, tc: { x: 0.7, expr: "smug", arms: "hips" } },
        // "khen lông đẹp"
        { line: 0, at: 0.76, tc: { arms: "point", expr: "happy", move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
        // "khen giọng hay": quạ phổng mũi
        { line: 0, at: 0.88, tc: { arms: "wave" }, cd: { arms: "hips", move: "bounce" }, fx: [{ kind: "exclaim", on: "TC", text: "HAY QUÁ!" }, { kind: "sparkle", on: "CD" }] },

        // "Quạ sướng quá": dang cánh
        { line: 1, camera: "CD", cd: { arms: "up2", move: "bounce" }, tc: { move: "idle" }, fx: { kind: "hearts", on: "CD" } },
        // "há mỏ ra hát": pho mát rơi khỏi mỏ
        { line: 1, at: 0.24, camera: "wide", cd: { face: null, expr: "happy" }, items: [{ id: "pm", prop: "qua-cao-pho-mat", x: 0.5 }], fx: { kind: "exclaim", on: "CD", text: "QUÁ!" } },
        // "rơi tọt vào miệng cáo": cáo đớp gọn
        { line: 1, at: 0.66, camera: "TC", tc: { face: "qua-cao-pho-mat-cao", arms: "hips", expr: "smug", move: "bounce" }, items: [], fx: { kind: "sparkle", on: "TC" } },
        // quạ tròn mắt
        { line: 1, at: 0.9, camera: "wide", cd: { arms: "down", expr: "shock", move: "idle" }, fx: { kind: "surprise", on: "CD" } },
      ],
    },
    punchline: {
      shot: "CĐ vẫn dính trên ghế, cười hiền khen TC; TC nheo mắt nghi ngờ",
      lines: [
        cd("Hôm nay cháu ông ngoan quá."),
        tc("Ông khen ngọt thế này... chắc định nhờ cháu rửa bát đúng không?"),
        cd("Rửa luôn cả cái ghế ông đang ngồi nữa."),
      ],
    },
  }),

  makeEpisode({
    day: 26,
    week,
    theme,
    idiom: "Trâu buộc ghét trâu ăn",
    meaning: "Mình gặp cảnh không như ý thì sinh ra ghen tị với người đang được hưởng hơn mình.",
    question: "Lúc nào bạn thấy mình dễ thành \"trâu buộc\" nhất?",
    hook: {
      shot: "TC ngồi ở bàn học, chân buộc hờ sợi dây thừng vào chân bàn, bấm điện thoại liên tục",
      lines: [tc("Phẫn nộ. Phẫn nộ. Bấm phẫn nộ hết!")],
    },
    ask: "Ai làm gì mà mày bấm phẫn nộ ầm ầm thế?",
    misread: {
      shot: "TC đội sừng trâu bằng giấy, nhìn ảnh bạn ăn lẩu trên điện thoại, kêu \"ò\" rồi bấm phẫn nộ từng ảnh",
      lines: [
        tc("Cháu bị mẹ cấm ra ngoài để ôn thi, tức là trâu đang bị buộc. Cháu buộc dây vào chân cho đúng vai."),
        tc("Thằng bạn đăng ảnh đi ăn lẩu, tức là trâu đang ăn. Theo luật, cháu phải ghét nó."),
        tc("Cháu đã kêu ò ba tiếng và bấm phẫn nộ mười hai ảnh."),
        cd("Mày nhập vai con trâu giỏi thế, sao không nhập vai đứa ôn thi?"),
      ],
    },
    explain:
      "Ngày xưa con trâu bị buộc ở cọc, nhìn con khác thong thả gặm cỏ thì bực bội. Ý câu là mình gặp cảnh không như ý thì đâm ra ghen tị với người đang được hưởng. Ông bà nói ra để mình tự soi lại, chứ không phải để làm theo.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): điện vua, Cám ướm chiếc hài không vừa, giậm chân; Tấm đi vừa hài, được đội mũ phượng làm hoàng hậu; nhà tranh ban đêm, dì ghẻ và Cám chống nạnh tức tối, chụm đầu bày mưu, Cám mơ đội mũ phượng",
      memory: { label: "TRUYỆN CỔ TÍCH: TẤM CÁM" },
      lines: [
        cd("Như mẹ con Cám trong truyện Tấm Cám ấy: Cám thử chiếc hài không vừa, còn Tấm đi vừa, được vua cưới làm hoàng hậu."),
        cd("Thế là hai mẹ con ghen tức đỏ mắt, ngày đêm bày mưu hại Tấm, mong Cám được vào cung thay."),
      ],
      // Cụ Đồ đóng Tấm rồi dì ghẻ, Thằng Cháu đóng Cám.
      stage: [
        // "Như mẹ con Cám trong truyện Tấm Cám ấy": điện vua, Cám cầm chiếc hài, Tấm đứng nép
        {
          line: 0,
          cut: true,
          scene: "tam-cam-cung",
          camera: "wide",
          cd: { role: "tam-cam-tam", x: 0.26, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "tam-cam-cam", x: 0.68, hand: "tam-cam-hai", back: null, head: null, face: null, arms: "hold", expr: "smug", move: "idle" },
          items: [],
        },
        // "Cám thử chiếc hài không vừa": ướm mãi không vừa, giậm chân
        { line: 0, at: 0.4, camera: "TC", tc: { arms: "hit", expr: "angry", move: "shake" }, fx: { kind: "exclaim", on: "TC", text: "KHÔNG VỪA!" } },
        // "còn Tấm đi vừa": hài sang tay Tấm
        { line: 0, at: 0.61, camera: "wide", cd: { hand: "tam-cam-hai", arms: "hold", expr: "happy" }, tc: { hand: null, arms: "down", expr: "shock", move: "idle" }, fx: { kind: "sparkle", on: "CD" } },
        // "được vua cưới làm hoàng hậu": đội mũ phượng
        { line: 0, at: 0.76, camera: "CD", cd: { hand: null, head: "tam-cam-mu-phuong", arms: "up2", move: "bounce" }, fx: { kind: "hearts", on: "CD" } },
        { line: 0, at: 0.93, camera: "wide", cd: { move: "idle" }, tc: { arms: "hips", expr: "angry" }, fx: { kind: "anger", on: "TC" } },

        // "Thế là hai mẹ con ghen tức đỏ mắt": nhà tranh ban đêm
        {
          line: 1,
          cut: true,
          scene: "tam-cam-nha",
          camera: "wide",
          cd: { role: "tam-cam-di-ghe", x: 0.3, hand: null, head: null, arms: "hips", expr: "angry", move: "idle" },
          tc: { x: 0.7, hand: null, head: null, arms: "hips", expr: "angry", move: "idle" },
          items: [],
          fx: [{ kind: "anger", on: "CD" }, { kind: "anger", on: "TC" }],
        },
        // "ngày đêm bày mưu hại Tấm": chụm đầu thì thầm
        { line: 1, at: 0.42, cd: { x: 0.36, arms: "point", expr: "smug" }, tc: { x: 0.62, arms: "shrug", expr: "smug" }, fx: { kind: "exclaim", on: "CD", text: "HỪ HỪ..." } },
        // "mong Cám được vào cung thay": Cám mơ đội mũ phượng
        { line: 1, at: 0.72, camera: "TC", tc: { head: "tam-cam-mu-phuong", arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "TC" } },
        { line: 1, at: 0.9, camera: "wide", cd: { arms: "hips", expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC thi xong, giơ nồi lẩu chụp ảnh đăng; bên cạnh CĐ đang ăn kiêng, cầm bát cháo trắng, bấm điện thoại",
      lines: [
        tc("Thi xong rồi! Cháu đăng ảnh ăn lẩu đây."),
        cd("Ông đang ăn kiêng, cả tuần cháo trắng..."),
        cd("Phẫn nộ."),
      ],
    },
  }),

  makeEpisode({
    day: 27,
    week,
    theme,
    idiom: "Một con ngựa đau cả tàu bỏ cỏ",
    meaning: "Một người trong tập thể gặp chuyện thì cả tập thể cùng lo lắng, sẻ chia.",
    question: "Lần gần nhất cả nhóm cùng lo cho một người là chuyện gì?",
    hook: {
      shot: "TC đội mũ trưởng tàu, thổi còi, hất từng bó cỏ khỏi đoàn tàu hỏa đồ chơi",
      lines: [tc("Toàn bộ hành khách chú ý! Từ hôm nay cả đoàn tàu bỏ cỏ!")],
    },
    ask: "Mày hất cỏ ra khỏi đoàn tàu làm gì?",
    misread: {
      shot: "Con ngựa gỗ quấn băng ở chân; TC lần lượt dỡ cỏ khỏi tàu hỏa, tàu thủy, tàu vũ trụ đồ chơi; loa sân ga đọc thông báo",
      lines: [
        tc("Con ngựa gỗ của cháu bị trẹo chân. Thế là cả đoàn tàu phải dỡ cỏ."),
        tc("Cháu bắt cả tàu thủy, tàu ngầm, tàu vũ trụ nhịn cỏ luôn."),
        tc("Loa sân ga thông báo: chuyến tàu bị hoãn, lý do là có một con ngựa đau."),
        cd("Tàu hỏa nó có ăn cỏ bao giờ đâu mà bỏ!"),
      ],
    },
    explain:
      "Chữ tàu ở đây là chuồng ngựa, chỗ đặt máng cỏ, không phải tàu hỏa. Một con ngựa ốm, cả chuồng lo lắng, không buồn ăn. Ý câu là một người trong tập thể gặp chuyện thì mọi người cùng lo, cùng sẻ chia.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): làng ngập trong mưa lũ; điểm nhận hàng, người ôm thùng mì, bọc quần áo, áo phao; xe tải cứu trợ chở hàng vào vùng ngập; người ở xa đứng trước ti vi xem tin lũ, bỏ bát cơm xuống",
      memory: { label: "CHUYỆN THẬT: MÙA LŨ" },
      lines: [
        cd("Như mỗi mùa lũ ấy: một vùng bị ngập, cả nước người gom mì gói, người gom quần áo, áo phao, rồi lái xe chở hàng vào tận nơi."),
        cd("Người ở xa chưa giúp được gì cũng ngồi canh tin, thương đến bỏ cả bữa."),
      ],
      // Cụ Đồ đóng bác tài xế, Thằng Cháu đóng bạn tình nguyện; cảnh cuối cả hai là người ở xa xem tin.
      stage: [
        // "Như mỗi mùa lũ ấy: một vùng bị ngập": làng ngập trong mưa
        {
          line: 0,
          cut: true,
          scene: "lu-vung-ngap",
          camera: "wide",
          cd: { role: "lu-tai-xe", x: -0.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "lu-tinh-nguyen", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [],
        },
        // "cả nước người gom mì gói": điểm nhận hàng, bạn tình nguyện ôm thùng mì
        {
          line: 0,
          at: 0.3,
          cut: true,
          scene: "lu-diem-gom",
          camera: "wide",
          cd: { x: 0.3, arms: "down", expr: "neutral" },
          tc: { x: 0.7, hand: "lu-mi-goi", arms: "hold2", expr: "happy", move: "bounce" },
          items: [],
        },
        // "người gom quần áo": bác tài ôm bọc quần áo
        { line: 0, at: 0.5, cd: { hand: "lu-quan-ao", arms: "hold2", expr: "happy", move: "bounce" }, tc: { move: "idle" } },
        // "áo phao": bạn tình nguyện giơ áo phao
        { line: 0, at: 0.6, cd: { move: "idle" }, tc: { hand: "lu-ao-phao", arms: "hold2", move: "jump" }, fx: { kind: "sparkle", on: "TC" } },
        // "rồi lái xe chở hàng": xe tải cứu trợ lăn bánh vào làng ngập
        {
          line: 0,
          at: 0.72,
          cut: true,
          scene: "lu-vung-ngap",
          camera: "wide",
          cd: { x: -0.4, hand: null, arms: "down", move: "idle" },
          tc: { x: 1.4, hand: null, arms: "down", move: "idle" },
          items: [{ id: "xe", prop: "lu-xe-cuu-tro", x: -0.35 }],
        },
        { line: 0, at: 0.76, items: [{ id: "xe", prop: "lu-xe-cuu-tro", x: 0.36 }] },
        // "vào tận nơi": bạn tình nguyện ôm thùng mì xuống phát
        { line: 0, at: 0.88, tc: { x: 0.8, hand: "lu-mi-goi", arms: "hold2", expr: "happy" }, fx: { kind: "hearts", on: "TC" } },

        // "Người ở xa chưa giúp được gì": hai người ở xa, cầm bát cơm, đứng trước ti vi
        {
          line: 1,
          cut: true,
          scene: "home",
          camera: "wide",
          cd: { role: null, x: 0.18, hand: "bowl", arms: "hold", expr: "neutral", move: "idle" },
          tc: { role: null, x: 0.82, hand: "bowl", arms: "hold", expr: "neutral", move: "idle" },
          items: [{ id: "tv", prop: "lu-ti-vi", x: 0.5, scale: 1.15 }],
        },
        // "cũng ngồi canh tin": lo lắng nhìn ti vi
        { line: 1, at: 0.4, cd: { expr: "sad" }, tc: { expr: "shock" }, fx: [{ kind: "sweat", on: "CD" }, { kind: "exclaim", on: "TC" }] },
        // "thương đến bỏ cả bữa": đặt bát xuống, không buồn ăn
        {
          line: 1,
          at: 0.65,
          cd: { hand: null, arms: "down", expr: "sad" },
          tc: { hand: null, arms: "down", expr: "sad", move: "tremble" },
          items: [
            { id: "tv", prop: "lu-ti-vi", x: 0.5, scale: 1.15 },
            { id: "b1", prop: "bowl", x: 0.06 },
            { id: "b2", prop: "bowl", x: 0.95 },
          ],
        },
        { line: 1, at: 0.85, camera: "TC", tc: { move: "idle" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    punchline: {
      shot: "CĐ chống lưng kêu đau; cả nhà nằm thành hàng quanh CĐ, không ai nhúc nhích",
      lines: [
        tc("Cháu hiểu rồi. Ông đau lưng thì cả nhà phải bỏ cỏ."),
        tc("Cháu nghỉ học, mẹ nghỉ làm, bố nghỉ nấu cơm, cả nhà nằm cạnh ông!"),
        cd("Thế ai đi mua thuốc cho ông?!"),
      ],
    },
  }),

  makeEpisode({
    day: 28,
    week,
    theme,
    idiom: "Ma cũ bắt nạt ma mới",
    meaning: "Người đến trước cậy thâm niên, đem người mới đến ra sai vặt, làm khó.",
    question: "Ngày đầu đi làm hay vào ký túc xá, bạn được \"ma cũ\" đối xử thế nào?",
    hook: {
      shot: "TC trùm chăn trắng kiểu ma hoạt hình dễ thương, đeo thẻ thực tập, lướt vào văn phòng",
      lines: [tc("Ngày đầu đi làm, cháu phải hóa trang thành ma cho đúng thủ tục.")],
    },
    ask: "Đi thực tập mà trùm chăn trắng thế kia à?",
    misread: {
      shot: "Con ma cũ hoạt hình tròn trịa sai TC ôm chồng giấy photo, xách cơm hộp; TC giơ đèn pin định chiếu",
      lines: [
        tc("Công ty có một con ma cũ, ba năm kinh nghiệm. Nó sai cháu photo hai trăm trang."),
        tc("Nó bắt cháu pha trà, xách cơm hộp, tập kêu u u cho chuẩn."),
        tc("Cháu tức quá, cháu cầm đèn pin chiếu cho ma cũ biến mất!"),
        cd("Người ta là chị trưởng nhóm, chiếu đèn vào mặt là mày nghỉ việc đấy!"),
      ],
    },
    explain:
      "Ma ở đây là cách nói ví von, chỉ người. Ma cũ là người đến trước, ma mới là người mới đến. Câu này chê người cậy mình có thâm niên, đem người mới ra sai vặt, làm khó.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): sân chuồng, vịt con lông xám chui ra từ vỏ trứng; vịt, gà mái, gà tây xúm lại mổ, xua đuổi; gà tây chống nạnh ra oai; bên hồ mùa xuân, vịt con hoá thiên nga trắng",
      memory: { label: "CỔ TÍCH: VỊT CON XẤU XÍ" },
      lines: [
        cd("Như truyện Vịt con xấu xí ấy: chú vịt vừa nở đã bị cả sân chuồng, vịt, gà, gà tây, xúm vào mổ, xua đuổi."),
        cd("Con nào cũng cậy mình ở sân trước, bắt nạt đứa mới đến, đâu biết sau này nó lớn lên thành thiên nga."),
      ],
      // Thằng Cháu đóng vịt con (rồi thiên nga), Cụ Đồ đóng gà tây bắt nạt.
      stage: [
        // "Như truyện Vịt con xấu xí ấy": sân chuồng, vịt con đứng trong vỏ trứng
        {
          line: 0,
          cut: true,
          scene: "vit-san-chuong",
          camera: "wide",
          cd: { role: "ga-tay", x: -0.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "vit-con-xau", x: 0.62, hand: null, back: null, head: null, face: null, arms: "down", expr: "confused", move: "idle" },
          items: [{ id: "trung", prop: "vit-trung", x: 0.62, front: true }],
        },
        // "chú vịt vừa nở": nhảy ra khỏi vỏ trứng
        { line: 0, at: 0.27, camera: "TC", tc: { arms: "up2", expr: "happy", move: "jump" }, fx: { kind: "sparkle", on: "TC" } },
        // "đã bị cả sân chuồng": cả sân quay ra nhìn
        { line: 0, at: 0.42, camera: "wide", tc: { x: 0.75, arms: "down", expr: "shock", move: "idle" }, items: [], fx: { kind: "exclaim", on: "TC" } },
        // "vịt": con vịt lao tới
        { line: 0, at: 0.55, items: [{ id: "vit", prop: "vit-vit", x: 0.5 }], fx: { kind: "bop", on: "TC", text: "QUẠC!" } },
        // "gà": con gà mái
        {
          line: 0,
          at: 0.62,
          items: [
            { id: "vit", prop: "vit-vit", x: 0.5 },
            { id: "ga", prop: "vit-ga", x: 0.3 },
          ],
        },
        // "gà tây": gà tây xoè đuôi đi vào
        { line: 0, at: 0.68, cd: { x: 0.14, arms: "up2", expr: "angry" }, fx: { kind: "anger", on: "CD" } },
        // "xúm vào mổ": cả bọn dồn tới mổ
        {
          line: 0,
          at: 0.8,
          cd: { arms: "hit" },
          tc: { expr: "sad", move: "tremble" },
          items: [
            { id: "vit", prop: "vit-vit", x: 0.58 },
            { id: "ga", prop: "vit-ga", x: 0.42 },
          ],
          fx: { kind: "bop", on: "TC", text: "MỔ!" },
        },
        // "xua đuổi": vịt con chạy dạt ra mép sân
        { line: 0, at: 0.92, cd: { x: 0.18, arms: "point" }, tc: { x: 0.86, move: "idle" }, fx: { kind: "sweat", on: "TC" } },

        // "Con nào cũng cậy mình ở sân trước": gà tây chống nạnh ra oai
        {
          line: 1,
          camera: "CD",
          cd: { arms: "hips", expr: "smug", move: "bounce" },
          fx: { kind: "exclaim", on: "CD", text: "HỪ!" },
        },
        // "bắt nạt đứa mới đến": chỉ mặt, vịt con co rúm
        { line: 1, at: 0.36, camera: "wide", cd: { arms: "point", expr: "angry", move: "idle" }, tc: { expr: "sad", move: "tremble" }, fx: { kind: "anger", on: "CD" } },
        // "đâu biết sau này nó lớn lên": bên hồ mùa xuân, vịt con ngơ ngác
        {
          line: 1,
          at: 0.58,
          cut: true,
          scene: "vit-ho",
          camera: "wide",
          cd: { x: -0.4, arms: "down", expr: "neutral", move: "idle" },
          tc: { x: 0.5, arms: "down", expr: "sad", move: "idle" },
          items: [],
        },
        // "thành thiên nga": hoá thiên nga trắng, dang cánh
        {
          line: 1,
          at: 0.82,
          tc: { role: "thien-nga", arms: "up2", expr: "happy", move: "bounce" },
          fx: { kind: "sparkle", on: "TC" },
        },
        { line: 1, at: 0.94, camera: "TC", fx: { kind: "hearts", on: "TC" } },
      ],
    },
    punchline: {
      shot: "Một năm sau, TC có thẻ nhân viên chính thức; bạn thực tập mới bước vào, TC vội đỡ lấy chồng giấy",
      lines: [
        tc("Một năm rồi, giờ cháu là ma cũ. Em mới vào à?"),
        tc("Em có cần anh đi photo hộ gì không?"),
        cd("Ơ kìa, thế ai bắt nạt ai?"),
        tc("Cháu làm quen tay quá, giờ không dừng được."),
      ],
    },
  }),

  makeEpisode({
    day: 29,
    week,
    theme,
    idiom: "Tốt gỗ hơn tốt nước sơn",
    meaning: "Chất lượng, phẩm chất bên trong quan trọng hơn vẻ đẹp bên ngoài.",
    question: "Bạn từng chọn nhầm thứ gì chỉ vì nó quá đẹp bên ngoài?",
    hook: {
      shot: "Cửa hàng nội thất, âm gõ \"cốc cốc\", TC đeo ống nghe áp vào cánh tủ",
      lines: [tc("Suỵt. Cháu đang khám bệnh cho cái tủ.")],
    },
    ask: "Đi mua tủ mà làm như bác sĩ thế?",
    misread: {
      shot: "TC gõ tủ hồng lấp lánh nghe \"bộp\", gõ tủ cũ sờn nghe \"cốc\", rồi quay sang gõ vào cái ví của CĐ",
      lines: [
        tc("Cái tủ hồng lấp lánh này gõ nghe bộp bộp, rỗng ruột. Loại!"),
        tc("Cái tủ cũ xấu xí này gõ nghe cốc cốc, chắc nịch. Chốt!"),
        tc("Giờ cháu gõ thử cái ví của ông... nghe rỗng tuếch."),
        cd("Ví ông rỗng là vì mày vừa mua ba cái tủ!"),
      ],
    },
    explain:
      "Đồ gỗ mà gỗ tốt thì dùng được mấy chục năm, còn nước sơn đẹp đến đâu cũng có ngày bong. Ý câu là phẩm chất bên trong quan trọng hơn vẻ đẹp bên ngoài. Câu này dùng cho cả đồ vật lẫn con người.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đồi cỏ, Sọ Dừa tròn như quả dừa, con bò béo gặm cỏ; hai cô chị đi tới chỉ trỏ chê bai; cô út xách giỏ cơm, Sọ Dừa hoá chàng trai khôi ngô thổi sáo, rồi đội mũ trạng nguyên",
      memory: { label: "TRUYỆN CỔ TÍCH: SỌ DỪA" },
      lines: [
        cd("Như truyện Sọ Dừa ấy: sinh ra không chân không tay, tròn như quả dừa, chăn bò cho phú ông rất giỏi, vậy mà hai cô chị vẫn chê bai."),
        cd("Chỉ cô út thấy được bên trong là chàng trai khôi ngô thổi sáo hay, về sau còn đỗ trạng nguyên."),
      ],
      // Câu 1: Cụ Đồ và Thằng Cháu đóng hai cô chị. Câu 2: Thằng Cháu đóng cô út, Cụ Đồ đóng chàng trai Sọ Dừa.
      stage: [
        // "Như truyện Sọ Dừa ấy: sinh ra không chân không tay": quả dừa có mặt giữa đồi
        {
          line: 0,
          cut: true,
          scene: "so-dua-doi",
          camera: "wide",
          cd: { role: "so-dua-co-chi", x: -0.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "so-dua-co-chi", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "sd", prop: "so-dua", x: 0.5 }],
        },
        // "tròn như quả dừa": lăn một vòng
        { line: 0, at: 0.4, items: [{ id: "sd", prop: "so-dua", x: 0.32 }] },
        // "chăn bò cho phú ông rất giỏi": con bò béo tròn gặm cỏ bên cạnh
        {
          line: 0,
          at: 0.52,
          items: [
            { id: "sd", prop: "so-dua", x: 0.26 },
            { id: "bo", prop: "so-dua-bo", x: 0.66, scale: 0.9 },
          ],
        },
        // "vậy mà hai cô chị vẫn chê bai": hai cô chị đi tới chỉ trỏ
        {
          line: 0,
          at: 0.76,
          cd: { x: 0.25, expr: "smug" },
          tc: { x: 0.75, expr: "smug" },
          items: [{ id: "sd", prop: "so-dua", x: 0.5 }],
        },
        {
          line: 0,
          at: 0.88,
          cd: { arms: "point", expr: "angry" },
          tc: { arms: "point", expr: "smug" },
          fx: [
            { kind: "exclaim", on: "CD", text: "XẤU!" },
            { kind: "exclaim", on: "TC", text: "EO!" },
          ],
        },

        // "Chỉ cô út thấy được bên trong": cô út xách giỏ cơm lên đồi
        {
          line: 1,
          cut: true,
          scene: "so-dua-doi",
          camera: "wide",
          cd: { role: "so-dua-chang-trai", x: -0.4, arms: "down", expr: "happy", move: "idle" },
          tc: { role: "so-dua-co-ut", x: 0.78, hand: "so-dua-gio-com", arms: "hold", expr: "happy", move: "idle" },
          items: [{ id: "sd", prop: "so-dua", x: 0.38 }],
        },
        { line: 1, at: 0.16, fx: { kind: "hearts", on: "TC" } },
        // "là chàng trai khôi ngô": vỏ dừa biến mất, hiện ra chàng trai
        {
          line: 1,
          at: 0.33,
          cut: true,
          cd: { x: 0.36 },
          tc: { expr: "shock" },
          items: [],
          fx: [
            { kind: "sparkle", on: "CD" },
            { kind: "exclaim", on: "TC" },
          ],
        },
        // "thổi sáo hay": thổi sáo, nốt nhạc bay
        { line: 1, at: 0.53, cd: { hand: "so-dua-sao", arms: "hold", move: "bounce" }, tc: { expr: "happy" }, fx: { kind: "hearts", on: "TC" } },
        // "về sau còn đỗ trạng nguyên": đội mũ trạng nguyên
        {
          line: 1,
          at: 0.7,
          camera: "CD",
          cd: { hand: null, head: "mandarin-hat", arms: "up2", expr: "happy", move: "bounce" },
          tc: { hand: null, arms: "wave" },
          fx: { kind: "sparkle", on: "CD" },
        },
        { line: 1, at: 0.9, camera: "wide", tc: { move: "bounce" }, fx: { kind: "hearts", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC mở ứng dụng hẹn hò, thay ảnh đại diện bằng tấm phim X-quang",
      lines: [
        tc("Vậy cháu xóa hết ảnh chỉnh sửa trên hồ sơ hẹn hò."),
        tc("Thay bằng một tấm ảnh chụp X-quang!"),
        cd("Ai bảo mày khoe xương?"),
        tc("Bên trong tốt mà ông!"),
      ],
    },
  }),

  makeEpisode({
    day: 30,
    week,
    theme: "Tổng kết",
    idiom: "Học ăn, học nói, học gói, học mở",
    meaning: "Cách ăn, cách nói, cách cư xử đều phải học dần; gói, mở còn là biết giữ ý, biết lúc nói lúc giữ kín.",
    question: "Trong 30 câu vừa qua, câu nào bạn từng hiểu sai lâu nhất?",
    hook: {
      shot: "TC ngồi giữa núi 30 hộp quà, vừa thắt nơ xong một hộp lại xé ra mở",
      lines: [tc("Ba mươi hộp quà gói xong rồi. Giờ cháu mở hết ra!")],
    },
    ask: "Gói xong lại mở, mày định làm thế đến bao giờ?",
    misread: {
      shot: "Nhanh từng cảnh: TC ăn hết nồi bánh chưng, nói liên tục, gói cả cái điều khiển ti vi, rồi mở hộp quà ghi tên CĐ",
      lines: [
        tc("Học ăn, cháu ăn hết nồi bánh chưng. Học nói, cháu nói từ sáng đến giờ."),
        tc("Học gói, cháu gói cả cái điều khiển ti vi."),
        tc("Học mở, cháu mở cả hộp quà sinh nhật của ông chưa đến ngày."),
        cd("Mở cả quà của ông thì ông còn bất ngờ gì nữa!"),
      ],
    },
    explain:
      "Gói, mở ở đây không chỉ là gói bánh, mở quà. Gói là biết giữ ý, chuyện cần kín thì giữ kín. Mở là biết lúc nào nên nói, nói sao cho phải. Cả câu ý là ăn ở, cư xử đều phải học dần, kể cả việc tưởng nhỏ.",
    example: {
      shot: "Montage nhanh các cảnh hay nhất của 29 tập trước, dừng ở CĐ và TC ngồi cạnh nhau",
      lines: [
        cd("Như biết chuyện riêng của bạn thì gói lại, đừng đưa lên nhóm chat. Thấy đồng nghiệp làm tốt thì mở lời khen."),
        cd("Ba mươi câu ông bà, gom lại cũng là học cách sống với nhau."),
      ],
    },
    punchline: {
      shot: "TC trao cho CĐ hộp quà cuối cùng; CĐ mở ra, rút một tờ hóa đơn dài",
      lines: [
        tc("Hộp cuối cùng, cháu gói tặng ông."),
        cd("Hóa đơn ba mươi hộp quà... ghi tên ông?!"),
        tc("Cháu học gói xong rồi. Phần trả tiền, ông học nhé!"),
      ],
    },
  }),
];
