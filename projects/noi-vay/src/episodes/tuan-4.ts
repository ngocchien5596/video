import { cd, makeEpisode, tc } from "./make.ts";

const week = 4;
const theme = "Cư xử, gia đình";

export const TUAN_4 = [
  makeEpisode({
    day: 6,
    week,
    theme,
    idiom: "Trâu buộc ghét trâu ăn",
    meaning: "Chê thói mình kém thế, lỡ vận thì sinh ra ganh tị, gièm pha người được hưởng hơn mình.",
    question: "Lúc nào bạn thấy mình dễ thành \"trâu buộc\" nhất?",
    hook: {
      shot: "TC ngồi ở bàn học, chân buộc hờ sợi dây thừng vào chân bàn, bấm điện thoại liên tục",
      lines: [tc("Phẫn nộ. Phẫn nộ. Bấm phẫn nộ hết!")],
    },
    ask: "Ai làm gì mà mày bấm phẫn nộ ầm ầm thế?",
    misread: {
      shot: "TC đội sừng trâu bằng giấy, nhìn ảnh bạn ăn lẩu trên điện thoại, kêu \"ò\" rồi bấm phẫn nộ từng ảnh",
      lines: [
        tc("Mẹ cấm cháu ra ngoài để ôn thi, thế là cháu thành con trâu bị buộc rồi. Cháu buộc luôn dây vào chân cho đúng vai!"),
        tc("Còn thằng bạn đăng ảnh đi ăn lẩu, nó chính là con trâu đang ăn! Đúng luật thì cháu phải ghét nó chứ!"),
        tc("Cháu kêu ò ò ba tiếng rồi, bấm phẫn nộ luôn cả mười hai ảnh!"),
        cd("Nhập vai con trâu giỏi thế, sao mày không nhập vai đứa ôn thi đi hử?"),
      ],
    },
    explain:
      "Con trâu bị buộc ở cọc, bụng thì đói meo, nhìn con khác thong thả gặm cỏ thì sinh lòng ghen ghét. Ông bà mượn chuyện ấy để chê cái thói ghen ăn tức ở đấy. Lúc mình kém thế, lỡ vận thì hay đâm ra ganh tị, gièm pha người được hưởng hơn mình, dù người ta có làm gì mình đâu. Nói gọn lại, mình lỡ vận thì lo mà gỡ, chứ đừng quay sang ghét người đang được ăn.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): điện vua, Cám ướm chiếc hài không vừa, giậm chân; Tấm đi vừa hài, được đội mũ phượng làm hoàng hậu; nhà tranh ban đêm, dì ghẻ và Cám chống nạnh tức tối, chụm đầu bày mưu, Cám mơ đội mũ phượng",
      memory: { label: "TRUYỆN CỔ TÍCH: TẤM CÁM" },
      lines: [
        cd("Như mẹ con Cám trong truyện Tấm Cám ấy. Cám ướm mãi chiếc hài mà không vừa, còn Tấm thì đi vừa khít, nên được vua cưới làm hoàng hậu."),
        cd("Thế là hai mẹ con ghen tức đỏ cả mắt, ngày đêm bày mưu hại Tấm, mong cho Cám được vào cung thế chỗ Tấm."),
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
        tc("Thi xong rồi! Cháu đăng ngay ảnh đi ăn lẩu đây!"),
        cd("Ông thì đang ăn kiêng, cả tuần nay toàn húp cháo trắng..."),
        cd("Phẫn nộ."),
      ],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    idiom: "Bán anh em xa mua láng giềng gần",
    meaning: "Hàng xóm ở gần, lúc cần giúp được nhanh hơn họ hàng ở xa, nên phải quý tình láng giềng.",
    question: "Lần gần nhất hàng xóm giúp bạn một việc là việc gì?",
    hook: {
      shot: "Ảnh chụp màn hình tin rao trên chợ online: \"pass anh họ, còn mới\"",
      lines: [tc("Pass gấp ông anh họ bên Úc. Còn mới, ít dùng, bao ship!")],
    },
    ask: "Mày rao bán cái gì trên chợ online thế hử?",
    misread: {
      shot: "TC chụp ảnh anh họ trong khung video call để đăng bán, rồi cầm xấp tiền sang gõ cửa chú hàng xóm",
      lines: [
        tc("Anh họ cháu ở tận bên Úc, mười năm mới gặp một lần. Cháu để giá hữu nghị ạ."),
        tc("Có tiền rồi thì cháu sang hỏi mua chú hàng xóm. Chú ơi, cháu muốn mua chú làm láng giềng, chú lấy bao nhiêu ạ?"),
        tc("Chú không chịu! Cháu bù thêm cả cái máy lọc nước, thế là chú đóng sập cửa luôn!"),
        cd("Người ta là người chứ có phải máy giặt cũ đâu mà mua với bán!"),
      ],
    },
    explain:
      "Bán với mua là ông bà nói ví von thôi, chứ ai lại đi bán người thật bao giờ. Họ hàng ở xa, nhà có việc gấp thì về sao kịp? Hàng xóm ở ngay sát vách, tối lửa tắt đèn có nhau, ốm đau thì có người đỡ đần. Nói gọn lại, anh em ở xa không giúp kịp bằng láng giềng ở gần, thế nên phải biết quý tình láng giềng. Mà ông không bảo cháu bỏ anh em họ hàng đâu nhé.",
    example: {
      shot: "Phòng trọ nửa đêm, cô gái sốt nằm đắp chăn, chị phòng bên bưng bát cháo sang",
      lines: [
        cd("Như cái đứa đi thuê trọ, nửa đêm bị sốt cao chẳng hạn. Bố mẹ ở tận quê thì cũng chỉ gọi điện hỏi han được thôi."),
        cd("Thế mà chị phòng bên lại mang thuốc sang, còn nấu cho nó một bát cháo nóng."),
      ],
    },
    punchline: {
      shot: "TC mang đĩa ổi sang nhà bên, quay về ôm nồi chè to; cảnh cuối TC cầm cái nồi rỗng đứng trước cửa hàng xóm",
      lines: [
        tc("Ông ơi! Cháu mang đĩa ổi sang biếu chị hàng xóm, thế mà chị gửi lại cho cháu hẳn một nồi chè!"),
        cd("Thế mai mày định mang gì sang hử?"),
        tc("Cháu bê cái nồi to nhất nhà sang, để trống thế thôi, xem chị đổ đầy cho cháu cái gì ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    idiom: "Một con ngựa đau cả tàu bỏ cỏ",
    meaning: "Một người trong tập thể gặp chuyện thì cả tập thể cùng lo lắng, sẻ chia.",
    question: "Lần gần nhất cả nhóm cùng lo cho một người là chuyện gì?",
    hook: {
      shot: "TC đội mũ trưởng tàu, thổi còi, hất từng bó cỏ khỏi đoàn tàu hỏa đồ chơi",
      lines: [tc("Toàn bộ hành khách chú ý! Từ hôm nay cả đoàn tàu bỏ cỏ!")],
    },
    ask: "Mày hất cỏ khỏi đoàn tàu làm cái gì thế?",
    misread: {
      shot: "Con ngựa gỗ quấn băng ở chân; TC lần lượt dỡ cỏ khỏi tàu hỏa, tàu thủy, tàu vũ trụ đồ chơi; loa sân ga đọc thông báo",
      lines: [
        tc("Ông ơi, con ngựa gỗ của cháu bị trẹo chân rồi. Thế là cả đoàn tàu phải dỡ cỏ!"),
        tc("Cháu bắt cả tàu thủy với tàu vũ trụ phải nhịn cỏ luôn!"),
        tc("Loa sân ga còn thông báo là chuyến tàu bị hoãn vì có một con ngựa đau!"),
        cd("Tàu hỏa nó có ăn cỏ bao giờ đâu mà bỏ!"),
      ],
    },
    explain:
      "Tàu ở đây là cái máng cỏ trong chuồng ngựa, rộng ra là cả chuồng ngựa đấy, chứ có phải tàu hỏa đâu. Người xưa bảo, một con ngựa ốm là cả chuồng cũng bồn chồn, bỏ ăn theo. Người cũng thế đấy, nói gọn lại là một người gặp chuyện thì cả nhóm cùng lo, cùng sẻ chia.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): làng ngập trong mưa lũ; điểm nhận hàng, người ôm thùng mì, bọc quần áo, áo phao; xe tải cứu trợ chở hàng vào vùng ngập; người ở xa đứng trước ti vi xem tin lũ, bỏ bát cơm xuống",
      memory: { label: "CHUYỆN THẬT: MÙA LŨ" },
      lines: [
        cd("Như mỗi mùa lũ ấy, một vùng bị ngập là cả nước cùng xắn tay vào giúp, người gom mì gói, quần áo, áo phao, người lái xe chở hàng vào tận nơi."),
        cd("Người ở xa chưa giúp được gì thì cũng ngồi canh tin, thương đến mức bỏ cả bữa."),
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
        tc("Cháu hiểu rồi! Ông đau lưng thì cả nhà phải bỏ cỏ."),
        tc("Cháu nghỉ học, mẹ nghỉ làm, bố nghỉ nấu cơm, cả nhà nằm cạnh ông luôn!"),
        cd("Thế đứa nào đi mua thuốc cho ông?!"),
      ],
    },
  }),

  makeEpisode({
    day: 13,
    week,
    theme,
    idiom: "Tai vách mạch dừng",
    meaning: "Chuyện tưởng kín vẫn có thể bị nghe thấy và lan ra, nên nói chuyện riêng phải cẩn thận.",
    question: "Bạn từng bị lộ chuyện chỉ vì nói ở chỗ tưởng là kín chưa?",
    hook: {
      shot: "TC chiếu đèn bàn vào bức tường như phòng thẩm vấn",
      lines: [tc("Tường ơi, tối qua mày nghe được những gì? Khai mau!")],
    },
    ask: "Mày đang tra hỏi bức tường đấy à?",
    misread: {
      shot: "TC dán mười cái tai giả lên tường, rồi đeo ống nghe áp vào tường như bác sĩ",
      lines: [
        tc("Vách có tai thì phải cho nó nghe chứ ông. Cháu dán thêm mười cái tai giả đây!"),
        tc("Còn mạch thì cháu đo rồi. Tường nhà mình mạch đập bảy mươi nhịp một phút, khỏe re!"),
        tc("Mà sao lại là dừng? À, nói xong phải dừng ngay, không thì tường đi mách!"),
        cd("Trời đất ơi, nó còn đi khám sức khỏe cho cái tường!"),
      ],
    },
    explain:
      "Ngày xưa vách nhà trát bằng đất, bên trong có nan tre làm cốt, gọi là dừng. Dừng mà có mạch, tức là có khe hở, thì vách như có tai đấy. Nói gọn lại, chuyện tưởng kín vẫn có thể lọt ra ngoài, nên nói chuyện riêng phải cẩn thận. Có sách còn ghi là tai vách mạch rừng, nhưng ý thì vẫn thế cả thôi.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): cung điện Hy Lạp, vua Mi-đát bỏ mũ lộ đôi tai lừa, đội mũ giấu lại, thợ cạo cầm kéo trố mắt; bãi đất ven sông, thợ cạo đào hố nói thầm rồi lấp lại, lau sậy mọc lên, gió thổi ra chữ \"VUA CÓ TAI LỪA!\", vua chạy ra hốt hoảng",
      memory: { label: "THẦN THOẠI: VUA MI-ĐÁT" },
      lines: [
        cd("Như chuyện vua Mi-đát trong thần thoại Hy Lạp ấy, vua bị mọc đôi tai lừa, phải giấu kỹ dưới mũ, chỉ có mỗi ông thợ cạo là biết."),
        cd("Ông thợ cạo không nhịn nổi, bèn đào một cái hố, ghé miệng thì thầm bí mật xuống rồi lấp đất lại. Ai ngờ lau sậy mọc lên, gió thổi qua là rì rào nói lại, thế là cả nước đều biết vua có tai lừa!"),
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
        tc("Thế từ nay chuyện riêng cháu viết ra giấy cho kín nhé!"),
        cd("Để ông xem nào... Ông ơi, cháu lỡ làm vỡ cái ấm trà của ông... Hả? CÁI ẤM NÀO?!"),
        tc("Ông đọc to thế, tường nghe hết rồi còn đâu!"),
      ],
    },
  }),

  makeEpisode({
    day: 15,
    week,
    theme,
    idiom: "Ăn ốc nói mò",
    meaning: "Nói không có căn cứ, chẳng biết rõ mà cứ đoán mò, phán bừa.",
    question: "Tin đồn vô căn cứ nào về bạn khiến bạn dở khóc dở cười nhất?",
    hook: {
      shot: "TC bịt mắt, ngồi trước rổ ốc luộc, mút chùn chụt",
      lines: [tc("Cháu mút một con ốc là biết luôn tương lai của một người.")],
    },
    ask: "Mày bịt mắt ngồi ăn ốc làm gì thế?",
    misread: {
      shot: "TC bịt mắt thò tay mò trong rổ, mỗi lần bốc được một thứ lại phán to; cuối cùng bốc trúng lọ mắm đổ lên áo CĐ",
      lines: [
        tc("Ăn ốc thì phải nói, mà nói thì phải mò. Cháu bịt mắt mò trong rổ, bốc trúng cái gì thì nói cái ấy!"),
        tc("Bốc được con ốc to thì chị kia sắp lấy chồng! Còn con ốc bé tí thì anh kia sắp bị mất ví!"),
        tc("Ơ, bốc trúng lọ mắm rồi... ông sắp bị dính mắm đấy!"),
        cd("Đúng được mỗi câu ấy, vì mày vừa đổ mắm lên áo ông rồi đấy, cái thằng này!"),
      ],
    },
    explain:
      "Câu này chê người nói chẳng có căn cứ gì, không biết rõ mà cứ phán bừa. Có người giải thích thế này. Ốc nằm tít dưới bùn, nước thì đục ngầu, người mò ốc có thấy gì đâu, sờ được con nào hay con ấy. Nói mò cũng thế, nhẹ thì thành chuyện phiếm, nặng thì thành tin đồn làm khổ người ta. Nói gọn lại, chưa biết chắc thì đừng có phán, cháu ạ.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đầu làng, con voi to đứng giữa, hai ông thầy bói (ông béo mắt nhắm, ông gầy kính đen) chống gậy dò tới; ông béo sờ vòi, ông gầy sờ đuôi, ông béo sờ chân voi; hai ông cãi nhau rồi vung gậy đánh nhau \"BỐP!\"",
      memory: { label: "NGỤ NGÔN: THẦY BÓI XEM VOI" },
      lines: [
        cd("Cứ như năm ông thầy bói mù trong truyện Thầy bói xem voi ấy, mỗi ông sờ một chỗ. Người thì bảo voi sun sun như con đỉa, người bảo tun tủn như cái chổi sể cùn, người lại bảo sừng sững như cột đình."),
        cd("Chẳng ông nào nhìn thấy được cả con voi, thế mà ông nào cũng quả quyết mình đúng, cãi nhau rồi đánh nhau tơi bời."),
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
        tc("Từ giờ cháu nói gì cũng phải có căn cứ. Ông ơi, ông sinh năm bao nhiêu ạ?"),
        cd("Năm 1950 chứ sao, hỏi làm gì hử?"),
        tc("Sai bét! Cháu có căn cứ hẳn hoi nhé, một bình luận ẩn danh bảo ông sinh năm 1802 cơ!"),
      ],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    idiom: "Ma cũ bắt nạt ma mới",
    meaning: "Người đến trước cậy thâm niên, đem người mới đến ra sai vặt, làm khó.",
    question: "Ngày đầu đi làm hay vào ký túc xá, bạn được \"ma cũ\" đối xử thế nào?",
    hook: {
      shot: "TC trùm chăn trắng kiểu ma hoạt hình dễ thương, đeo thẻ thực tập, lướt vào văn phòng",
      lines: [tc("Ngày đầu đi làm, cháu phải hóa trang thành ma cho đúng thủ tục.")],
    },
    ask: "Đi thực tập mà mày trùm chăn trắng thế kia à?",
    misread: {
      shot: "Con ma cũ hoạt hình tròn trịa sai TC ôm chồng giấy photo, xách cơm hộp; TC giơ đèn pin định chiếu",
      lines: [
        tc("Công ty có một con ma cũ, làm ở đấy những ba năm rồi cơ! Nó sai cháu photo hẳn hai trăm trang giấy."),
        tc("Nó bắt cháu pha trà, xách cơm hộp, còn bắt cháu tập kêu u u cho chuẩn nữa!"),
        tc("Tức quá, cháu cầm đèn pin chiếu thẳng vào nó, cho con ma cũ biến mất luôn!"),
        cd("Người ta là chị trưởng nhóm đấy, chiếu đèn vào mặt người ta là mày bị cho nghỉ việc luôn!"),
      ],
    },
    explain:
      "Chữ ma ở đây chỉ là nói ví von thôi, để chỉ người ta đấy. Ma cũ là người đến trước, ma mới là đứa mới vào. Câu này chê những kẻ cậy mình ở lâu, cứ lôi người mới ra sai vặt, làm khó người ta đủ đường. Nói gọn lại, ở lâu hơn không có nghĩa là được quyền bắt nạt người mới đâu nhé.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): sân chuồng, vịt con lông xám chui ra từ vỏ trứng; vịt, gà mái, gà tây xúm lại mổ, xua đuổi; gà tây chống nạnh ra oai; bên hồ mùa xuân, vịt con hoá thiên nga trắng",
      memory: { label: "CỔ TÍCH: VỊT CON XẤU XÍ" },
      lines: [
        cd("Như truyện Vịt con xấu xí ấy. Chú vịt con vừa nở ra đã bị cả sân chuồng, nào vịt, nào gà, nào gà tây, xúm vào mổ rồi xua đuổi."),
        cd("Con nào cũng cậy mình ở sân này từ trước, bắt nạt đứa mới đến, đâu có biết sau này nó lớn lên lại hóa thành thiên nga cơ chứ."),
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
        { line: 0, at: 0.58, items: [{ id: "vit", prop: "vit-vit", x: 0.5 }], fx: { kind: "bop", on: "TC", text: "QUẠC!" } },
        // "gà": con gà mái
        {
          line: 0,
          at: 0.65,
          items: [
            { id: "vit", prop: "vit-vit", x: 0.5 },
            { id: "ga", prop: "vit-ga", x: 0.3 },
          ],
        },
        // "gà tây": gà tây xoè đuôi đi vào
        { line: 0, at: 0.71, cd: { x: 0.14, arms: "up2", expr: "angry" }, fx: { kind: "anger", on: "CD" } },
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
        tc("Thế là một năm trôi qua, giờ cháu thành ma cũ rồi nhé! Em mới vào à?"),
        tc("Em có cần anh đi photo hộ gì không?"),
        cd("Ơ kìa, thế rốt cuộc ai bắt nạt ai hử?"),
        tc("Cháu bị người ta sai vặt mãi thành quen tay rồi ông ạ, giờ muốn dừng cũng chẳng dừng được!"),
      ],
    },
  }),

  makeEpisode({
    day: 26,
    week,
    theme,
    idiom: "Tốt gỗ hơn tốt nước sơn",
    meaning: "Chất lượng, phẩm chất bên trong quan trọng hơn vẻ đẹp bên ngoài.",
    question: "Bạn từng chọn nhầm thứ gì chỉ vì nó quá đẹp bên ngoài?",
    hook: {
      shot: "Cửa hàng nội thất, âm gõ \"cốc cốc\", TC đeo ống nghe áp vào cánh tủ",
      lines: [tc("Suỵt. Cháu đang khám bệnh cho cái tủ.")],
    },
    ask: "Đi mua cái tủ mà mày làm như bác sĩ thế?",
    misread: {
      shot: "TC gõ tủ hồng lấp lánh nghe \"bộp\", gõ tủ cũ sờn nghe \"cốc\", rồi quay sang gõ vào cái ví của CĐ",
      lines: [
        tc("Cái tủ hồng lấp lánh này gõ vào nghe bộp bộp, rỗng ruột rồi. Loại!"),
        tc("Còn cái tủ cũ xấu xí này gõ vào nghe cốc cốc, chắc nịch luôn. Chốt!"),
        tc("Giờ cháu gõ thử cái ví của ông... Ơ, rỗng tuếch!"),
        cd("Ví ông rỗng là tại mày vừa mua ba cái tủ chứ còn gì!"),
      ],
    },
    explain:
      "Gỗ là cái cốt, đồ có bền hay không là ở cái gỗ cả. Nước sơn chỉ là lớp áo bên ngoài, có đẹp mấy thì rồi cũng có ngày bong ra. Nói gọn lại, cái tốt bên trong mới quý hơn cái mã bên ngoài. Nhưng ông không bảo là cháu khỏi cần chăm chút bề ngoài đâu nhé.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đồi cỏ, Sọ Dừa tròn như quả dừa, con bò béo gặm cỏ; hai cô chị đi tới chỉ trỏ chê bai; cô út xách giỏ cơm, Sọ Dừa hoá chàng trai khôi ngô thổi sáo, rồi đội mũ trạng nguyên",
      memory: { label: "TRUYỆN CỔ TÍCH: SỌ DỪA" },
      lines: [
        cd("Như truyện Sọ Dừa ấy, cậu sinh ra không chân không tay, tròn như quả dừa, chăn bò cho phú ông giỏi lắm, vậy mà hai cô chị vẫn chê bai."),
        cd("Chỉ có cô út là nhìn ra được, bên trong lớp sọ dừa ấy là một chàng trai khôi ngô, thổi sáo rất hay, mà về sau chàng còn đỗ trạng nguyên."),
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
      shot: "TC mở trang cá nhân mạng xã hội, thay ảnh đại diện bằng tấm phim X-quang",
      lines: [
        tc("Thế thì cháu xóa hết ảnh đã chỉnh sửa trên trang cá nhân của cháu!"),
        tc("Rồi cháu thay bằng một tấm ảnh chụp X-quang luôn!"),
        cd("Ai bảo mày đi khoe xương hả?"),
        tc("Thì bên trong cháu tốt thật mà ông!"),
      ],
    },
  }),

  makeEpisode({
    day: 28,
    week,
    theme,
    idiom: "Mật ngọt chết ruồi",
    meaning: "Lời ngon ngọt, món lợi bày sẵn trước mắt có khi lại là cái bẫy.",
    question: "Lời mời ngon ngọt nào trên mạng suýt làm bạn mắc bẫy?",
    hook: {
      shot: "TC đeo găng tay, cầm chổi quét sơn và hũ mật ong to như đi phun thuốc",
      lines: [tc("Hết bình xịt rồi! Cháu chuyển sang diệt ruồi bằng mật ong!")],
    },
    ask: "Mày cầm hũ mật đi khắp nhà làm gì thế hử?",
    misread: {
      shot: "TC quét mật lên bàn, lên cửa, lên ghế; đàn kiến xếp hàng kéo vào; CĐ ngồi xuống ghế thì dính chặt",
      lines: [
        tc("Cháu bôi mật lên bàn, ruồi bay tới là dính chân, thế là xong phim. Lại còn rẻ hơn bình xịt nữa!"),
        tc("Cháu bôi thêm lên cửa, lên ghế, lên cả cánh quạt cho chắc ăn!"),
        tc("Ơ, ruồi thì chưa thấy con nào, mà kiến cả xóm đã kéo sang ăn tiệc rồi!"),
        cd("Cái thằng này! Ông vừa ngồi xuống ghế là dính chặt luôn rồi đây này!"),
      ],
    },
    explain:
      "Con ruồi ham ngọt, sà vào hũ mật là bị dính chân, chết luôn ở đấy. Người cũng thế thôi, lời ngon ngọt hay món lợi bày sẵn trước mắt có khi lại chính là cái bẫy. Thế nên gặp lời nịnh quá mức, lời hứa lãi cao hay quà miễn phí trên mạng là phải dè chừng. Nói gọn lại, nghe càng sướng tai thì càng phải tỉnh táo đấy.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): rừng, quạ đen ngậm miếng pho mát đứng trên cành cây; cáo đi tới dưới gốc, khen lông đẹp giọng hay; quạ khoái chí há mỏ hát, pho mát rơi, cáo đớp gọn rồi cười đắc ý, quạ tròn mắt",
      memory: { label: "NGỤ NGÔN: QUẠ VÀ CÁO" },
      lines: [
        cd("Như con quạ trong truyện Quạ và Cáo ấy, đang ngậm miếng pho mát trên cành thì cáo đứng dưới gốc khen nó lông đẹp, khen giọng hay."),
        cd("Quạ sướng quá, há mỏ ra hát, thế là miếng pho mát rơi tọt ngay vào miệng cáo."),
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
        cd("Hôm nay cháu ông ngoan quá cơ."),
        tc("Ông khen ngọt thế này... chắc lại định nhờ cháu rửa bát chứ gì?"),
        cd("Rửa luôn cả cái ghế ông đang ngồi nữa nhé."),
      ],
    },
  }),

  makeEpisode({
    day: 30,
    week,
    theme: "Tổng kết",
    idiom: "Học ăn, học nói, học gói, học mở",
    meaning: "Ăn uống, nói năng, cư xử đều phải học; gói, mở là biết lúc giữ kín, lúc mở lời cho khéo.",
    question: "Trong 30 câu vừa qua, câu nào bạn từng hiểu sai lâu nhất?",
    hook: {
      shot: "TC ngồi giữa núi 30 hộp quà, vừa thắt nơ xong một hộp lại xé ra mở",
      lines: [tc("Ba mươi hộp quà cháu gói xong cả rồi. Giờ thì cháu mở hết ra!")],
    },
    ask: "Gói xong lại mở, mày định làm thế đến bao giờ?",
    misread: {
      shot: "Nhanh từng cảnh: TC ăn hết nồi bánh chưng, nói liên tục, gói cả cái điều khiển ti vi, rồi mở hộp quà ghi tên CĐ",
      lines: [
        tc("Học ăn thì cháu ăn hết cả nồi bánh chưng. Học nói thì cháu nói từ sáng đến giờ!"),
        tc("Còn học gói á? Cháu gói luôn cả cái điều khiển ti vi rồi!"),
        tc("Mở thì dễ nhất! Cháu mở luôn hộp quà sinh nhật của ông, mà còn chưa đến ngày cơ!"),
        cd("Mày mở cả quà của ông thì ông còn bất ngờ cái gì nữa!"),
      ],
    },
    explain:
      "Gói với mở ở đây đâu chỉ là gói bánh, mở quà. Gói là biết gói ghém cho gọn, chuyện cần kín thì giữ kín. Mở là biết lúc nào nên mở lời, nói sao cho khéo. Nói gọn lại, từ miếng ăn, lời nói đến cách cư xử, cái gì cũng phải học, kể cả những việc tưởng chừng nhỏ nhặt nhất.",
    example: {
      shot: "Montage nhanh các cảnh hay nhất của 29 tập trước, dừng ở CĐ và TC ngồi cạnh nhau",
      lines: [
        cd("Ví như cháu biết được chuyện riêng của bạn thì phải gói lại mà giữ, đừng có đem lên nhóm chat. Thấy đồng nghiệp làm tốt thì mở lời mà khen một câu."),
        cd("Mà cháu xem, ba mươi câu ông bà để lại, gom lại cũng chỉ là dạy mình học cách sống với nhau thôi."),
      ],
    },
    punchline: {
      shot: "TC trao cho CĐ hộp quà cuối cùng; CĐ mở ra, rút một tờ hóa đơn dài",
      lines: [
        tc("Hộp cuối cùng này, cháu gói tặng ông đấy!"),
        cd("Ơ, cái hóa đơn ba mươi hộp quà... sao lại ghi tên ông hả cái thằng này?!"),
        tc("Cháu học gói xong rồi đấy. Còn phần trả tiền thì ông học nhé!"),
      ],
    },
  }),
];
