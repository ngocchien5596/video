import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Học hành, công việc, tiền bạc";

export const TUAN_3 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    idiom: "Nước đến chân mới nhảy",
    meaning: "Chê thói chần chừ, việc để đến sát giờ chót mới cuống cuồng lo làm.",
    question: "Deadline nào bạn từng làm xong chỉ vài phút trước giờ nộp?",
    hook: {
      shot: "Phòng trọ, TC ngồi trên giường lướt điện thoại, hai chân thả hờ trên một xô nước đang được vòi nước rót dần",
      lines: [tc("Còn đúng 5 phân nữa thôi, nước chạm chân là cháu nhảy!")],
    },
    ask: "Mày ngồi canh cái xô nước làm gì thế?",
    misread: {
      shot: "TC nằm lướt điện thoại cạnh xô nước sắp tràn; nước vừa chạm ngón chân, TC bật dậy nhảy tưng tưng, nước bắn khắp phòng",
      lines: [
        tc("Ông bà dạy nước đến chân mới nhảy mà ông!"),
        tc("Nước chưa đến thì cháu cứ nằm lướt điện thoại, chạm chân một cái là bật như lò xo."),
        tc("Cháu còn cài báo thức: nước chạm ngón cái là nhạc nhảy tự bật!"),
        cd("Ngập cả phòng trọ rồi, chủ nhà sắp nhảy lên đây kìa!"),
      ],
    },
    explain:
      "Ngày xưa lũ dâng đến chân mới chạy thì đã muộn. Câu này chê thói chần chừ, việc gì cũng để sát nút mới cuống cuồng làm, nên vừa vội vừa dễ hỏng.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đồng cỏ mùa hè, ve ôm đàn ca hát, kiến hì hục tha thóc về tổ; mùa đông tuyết rơi, ve run rẩy đói meo, chạy sang gõ cửa nhà kiến xin ăn",
      memory: { label: "NGỤ NGÔN: VE VÀ KIẾN" },
      lines: [
        cd("Như con ve trong truyện ngụ ngôn Ve và Kiến ấy: suốt mùa hè chỉ ôm đàn ca hát, mặc kệ bầy kiến hì hục tha thóc về tổ."),
        cd("Đến khi gió bấc thổi, cây trụi lá, bụng đói meo, ve mới cuống cuồng chạy sang gõ cửa nhà kiến xin ăn."),
      ],
      // Thằng Cháu đóng con ve, Cụ Đồ đóng con kiến.
      stage: [
        // "Như con ve trong truyện ngụ ngôn Ve và Kiến ấy": đồng cỏ mùa hè, ve ôm đàn
        {
          line: 0,
          cut: true,
          scene: "ve-kien-he",
          camera: "wide",
          cd: { role: "ve-kien-kien", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "ve-kien-ve", x: 0.3, hand: "ve-kien-dan", back: null, head: null, face: null, arms: "hold", expr: "happy", move: "idle" },
          items: [{ id: "dong", prop: "ve-kien-dong-thoc", x: 0.92, scale: 0.5 }],
        },
        // "suốt mùa hè chỉ ôm đàn ca hát"
        { line: 0, at: 0.38, camera: "TC", tc: { move: "bounce", expr: "smug" }, fx: { kind: "exclaim", on: "TC", text: "LA LA!" } },
        // "mặc kệ bầy kiến hì hục tha thóc về tổ": kiến vác hạt thóc đi vào
        { line: 0, at: 0.62, camera: "wide", cd: { x: 0.74, hand: "ve-kien-hat-thoc", arms: "hold2", expr: "angry" }, fx: { kind: "sweat", on: "CD" } },
        {
          line: 0,
          at: 0.86,
          cd: { hand: null, arms: "hips", expr: "happy" },
          items: [{ id: "dong", prop: "ve-kien-dong-thoc", x: 0.92, scale: 0.8 }],
          fx: [{ kind: "sparkle", on: "CD" }, { kind: "exclaim", on: "TC", text: "LA LA!" }],
        },

        // "Đến khi gió bấc thổi": mùa đông, ve run cầm cập, kiến ở trong nhà
        {
          line: 1,
          cut: true,
          scene: "ve-kien-dong",
          camera: "wide",
          cd: { x: 1.4, hand: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { x: 0.28, hand: null, arms: "hold2", expr: "sad", move: "tremble" },
          items: [],
        },
        // "cây trụi lá, bụng đói meo"
        { line: 1, at: 0.3, camera: "TC", fx: [{ kind: "sweat", on: "TC" }, { kind: "exclaim", on: "TC", text: "ĐÓI..." }] },
        // "ve mới cuống cuồng chạy sang"
        { line: 1, at: 0.48, camera: "wide", tc: { x: 0.58, arms: "up2", expr: "shock", move: "idle" }, fx: { kind: "exclaim", on: "TC" } },
        // "gõ cửa nhà kiến"
        { line: 1, at: 0.72, tc: { arms: "hit", expr: "sad" }, fx: { kind: "bop", on: "TC", text: "CỐC CỐC!" } },
        // "xin ăn": kiến ra mở cửa
        { line: 1, at: 0.84, cut: true, cd: { x: 0.84, arms: "hips", expr: "confused" }, tc: { arms: "hold2", expr: "sad", move: "tremble" }, fx: { kind: "question", on: "CD" } },
      ],
    },
    punchline: {
      shot: "Sáng thứ Hai, TC đứng trong chậu, giơ tay ra hiệu cho bạn cùng phòng dội nguyên xô nước vào chân mình",
      lines: [
        tc("Cháu hiểu rồi, phải nhảy sớm!"),
        tc("Nên cháu nhờ bạn cùng phòng, cứ sáng thứ Hai là dội một xô vào chân cháu."),
        tc("Thế là tuần nào cháu cũng nhảy từ sớm ông ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 16,
    week,
    theme,
    idiom: "Muốn ăn hét phải đào giun",
    meaning: "Muốn hưởng thành quả thì phải chịu bỏ công sức, chuẩn bị từ trước.",
    question: "Thành quả nào bạn từng phải chuẩn bị rất lâu mới có được?",
    hook: {
      shot: "Ban công chung cư buổi tối, TC cầm xẻng nhỏ đào chậu hoa, rồi chúi đầu vào cái hố gào thật to",
      lines: [tc("Đào được con thứ ba rồi, giờ cháu được hét tiếp!")],
    },
    ask: "Đêm hôm mày đào chậu hoa rồi gào cái gì thế?",
    misread: {
      shot: "TC xếp từng con giun vào hộp, mỗi con lại cầm micro karaoke hét một câu; hàng xóm bên cạnh bịt tai, đèn các căn hộ lần lượt bật sáng",
      lines: [
        tc("Sách bảo muốn ăn hét phải đào giun. Cháu thèm hét cho đã!"),
        tc("Đào một con giun được hét một câu. Năm con là đủ cả bài karaoke!"),
        cd("Bảo vệ gọi lên ba lần rồi, ông cũng muốn hét theo đây!"),
      ],
    },
    explain:
      "Hét ở đây là con chim hét, lông đen, to hơn chim sáo và rất mê ăn giun. Muốn bẫy chim hét thì phải đào giun làm mồi trước. Ý là muốn có thành quả thì phải chịu bỏ công chuẩn bị.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): vua Hùng chỉ tay đày Mai An Tiêm ra đảo hoang; An Tiêm cầm cuốc phát cỏ; chim thả hạt lạ, chàng gieo thành ruộng dưa; ôm quả dưa khắc tên thả xuống biển, thuyền buôn cập đảo",
      memory: { label: "SỰ TÍCH: DƯA HẤU MAI AN TIÊM" },
      lines: [
        cd("Như Mai An Tiêm trong sự tích dưa hấu ấy: bị vua Hùng đày ra đảo hoang, chàng không ngồi than mà tự phát cỏ, cuốc đất."),
        cd("Thấy chim thả hạt lạ, chàng nhặt về gieo, chăm thành cả ruộng dưa ngọt lịm, còn khắc tên lên quả thả xuống biển, thuyền buôn tìm ra tận đảo đổi hàng."),
      ],
      // Cụ Đồ đóng Mai An Tiêm, Thằng Cháu đóng vua Hùng.
      stage: [
        // "Như Mai An Tiêm trong sự tích dưa hấu ấy": đảo hoang, vua Hùng và An Tiêm
        {
          line: 0,
          cut: true,
          scene: "an-tiem-dao",
          camera: "wide",
          cd: { role: "an-tiem", x: 0.22, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "an-tiem-vua-hung", x: 0.52, hand: null, back: null, head: null, face: null, arms: "hips", expr: "angry", move: "idle" },
          items: [],
        },
        // "bị vua Hùng đày ra đảo hoang"
        { line: 0, at: 0.37, tc: { arms: "point" }, cd: { expr: "shock" }, fx: { kind: "anger", on: "TC" } },
        { line: 0, at: 0.52, tc: { x: 1.4, arms: "down" }, cd: { expr: "sad" }, fx: { kind: "sweat", on: "CD" } },
        // "chàng không ngồi than mà tự phát cỏ, cuốc đất"
        { line: 0, at: 0.66, camera: "CD", cd: { hand: "an-tiem-cuoc", arms: "raise", expr: "angry" } },
        { line: 0, at: 0.8, camera: "wide", cd: { arms: "hit", move: "bounce" }, fx: { kind: "bop", on: "CD", text: "PHẬP!" } },

        // "Thấy chim thả hạt lạ": chim bay qua, hạt rơi
        { line: 1, cd: { hand: null, arms: "point", expr: "shock", move: "idle" }, items: [{ id: "chim", prop: "an-tiem-chim", x: 0.5 }], fx: { kind: "exclaim", on: "CD" } },
        // "chàng nhặt về gieo"
        { line: 1, at: 0.16, cd: { x: 0.18, arms: "hold", expr: "happy" }, items: [] },
        // "chăm thành cả ruộng dưa ngọt lịm"
        { line: 1, at: 0.28, cd: { arms: "up2", move: "bounce" }, items: [{ id: "ruong", prop: "an-tiem-ruong-dua", x: 0.4, scale: 0.9 }], fx: { kind: "hearts", on: "CD" } },
        // "còn khắc tên lên quả"
        {
          line: 1,
          at: 0.52,
          camera: "CD",
          cd: { hand: "an-tiem-dua", arms: "hold2", move: "idle" },
          fx: { kind: "sparkle", on: "CD" },
        },
        // "thả xuống biển": ra mép nước, quả dưa trôi đi
        { line: 1, at: 0.6, camera: "wide", cd: { x: 0.56 } },
        {
          line: 1,
          at: 0.68,
          cd: { hand: null, arms: "point" },
          items: [
            { id: "ruong", prop: "an-tiem-ruong-dua", x: 0.4, scale: 0.9 },
            { id: "qua", prop: "an-tiem-dua", x: 0.76, scale: 0.8 },
          ],
        },
        {
          line: 1,
          at: 0.74,
          items: [
            { id: "ruong", prop: "an-tiem-ruong-dua", x: 0.4, scale: 0.9 },
            { id: "qua", prop: "an-tiem-dua", x: 1.3, scale: 0.8 },
            { id: "thuyen", prop: "an-tiem-thuyen", x: 1.4, scale: 0.8 },
          ],
        },
        // "thuyền buôn tìm ra tận đảo đổi hàng"
        {
          line: 1,
          at: 0.8,
          items: [
            { id: "ruong", prop: "an-tiem-ruong-dua", x: 0.3, scale: 0.9 },
            { id: "thuyen", prop: "an-tiem-thuyen", x: 0.86, scale: 0.8 },
          ],
        },
        { line: 1, at: 0.88, cd: { arms: "wave", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "CD" } },
      ],
    },
    punchline: {
      shot: "TC đứng ở quầy bưu điện, đặt lên bàn phong bì CV kèm một hộp nhựa có lỗ thở, bên trong lúc nhúc giun",
      lines: [
        tc("Cháu hiểu rồi, muốn có thì phải chuẩn bị mồi!"),
        tc("Nên cháu gửi CV kèm luôn một hộp giun tươi. Công ty nào mê giun là gọi cháu ngay!"),
        cd("Mày đi xin việc hay đi tuyển chim thế hả?"),
      ],
    },
  }),

  makeEpisode({
    day: 17,
    week,
    theme,
    idiom: "Đẽo cày giữa đường",
    meaning: "Chê người không có chủ kiến, ai bảo gì cũng nghe theo nên cuối cùng hỏng việc.",
    question: "Bạn từng sửa một bài làm theo góp ý của quá nhiều người đến mức hỏng chưa?",
    hook: {
      shot: "Hành lang khu trọ chật hẹp, TC kê ghế ngồi chính giữa, ôm khúc gỗ to cầm cái bào gỗ; hàng xóm xách xe đạp phải nghiêng người lách qua",
      lines: [tc("Mọi người đi vòng giúp cháu nhé, cháu đang làm nghề truyền thống!")],
    },
    ask: "Sao mày bày gỗ chắn hết lối đi thế này?",
    misread: {
      shot: "TC cầm thước dây đo hai bên tường, dịch khúc gỗ từng phân cho thật chính giữa; phía sau người xếp hàng chờ qua mỗi lúc một dài",
      lines: [
        tc("Ông bà dặn đẽo cày giữa đường mà ông! Đẽo trong phòng là sai bài."),
        tc("Cháu đo thước hẳn hoi, lệch một phân là dời ghế ngay."),
        tc("Chiều nay cháu chuyển ra giữa cầu thang, giữa hơn mà lại thoáng!"),
        cd("Cả khu trọ phải trèo qua khúc gỗ đi làm, ông xin mày đấy!"),
      ],
    },
    explain:
      "Câu này lấy từ một truyện ngụ ngôn: đẽo cày ngay giữa chỗ người qua kẻ lại thì ai cũng góp một câu. Ý là chê người không có chủ kiến, ai bảo gì cũng nghe theo nên cuối cùng hỏng việc.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đường làng, anh thợ dốc vốn mua khúc gỗ, ngồi đẽo cày; ông lão bảo cao quá, anh đẽo thấp; bà hàng xóm bảo thấp quá, anh đẽo cao; ông lão bảo đẽo thật to để cày bằng voi; cái cày to khổng lồ rồi thành đống vụn gỗ",
      memory: { label: "NGỤ NGÔN: ĐẼO CÀY GIỮA ĐƯỜNG" },
      lines: [
        cd("Như anh chàng trong truyện ngụ ngôn Đẽo cày giữa đường ấy: dốc hết vốn mua gỗ, ngồi bên đường đẽo cày, ai đi qua góp ý cũng nghe."),
        cd("Người bảo cao quá, anh đẽo thấp; người bảo thấp quá, anh đẽo cao; có người bảo đẽo to gấp mấy lần để cày bằng voi, thế là hỏng cả đống gỗ."),
      ],
      // Cụ Đồ đóng anh thợ đẽo cày, Thằng Cháu đóng người qua đường (ông lão, bà hàng xóm).
      stage: [
        // "Như anh chàng trong truyện ngụ ngôn Đẽo cày giữa đường ấy": đường làng, khúc gỗ
        {
          line: 0,
          cut: true,
          scene: "deo-cay-duong",
          camera: "wide",
          cd: { role: "deo-cay-anh", x: 0.26, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "deo-cay-ong-lao", x: 1.4, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          items: [{ id: "go", prop: "deo-cay-go", x: 0.56, scale: 0.9 }],
        },
        // "dốc hết vốn mua gỗ"
        { line: 0, at: 0.41, cd: { arms: "up2", expr: "happy", move: "bounce" }, fx: { kind: "sparkle", on: "CD" } },
        // "ngồi bên đường đẽo cày"
        {
          line: 0,
          at: 0.59,
          cd: { hand: "axe", arms: "hit", expr: "angry", move: "idle" },
          items: [{ id: "cay", prop: "deo-cay-cay", x: 0.55, scale: 0.8 }],
          fx: { kind: "bop", on: "CD", text: "CỘC CỘC!" },
        },
        // "ai đi qua góp ý cũng nghe": ông lão đi tới
        { line: 0, at: 0.76, tc: { x: 0.8, arms: "point", expr: "confused" }, cd: { arms: "down", expr: "neutral" } },
        { line: 0, at: 0.9, cd: { expr: "happy", move: "bounce" } },

        // "Người bảo cao quá"
        { line: 1, cd: { move: "idle" }, tc: { arms: "point", expr: "confused" }, fx: { kind: "exclaim", on: "TC", text: "CAO QUÁ!" } },
        // "anh đẽo thấp"
        {
          line: 1,
          at: 0.13,
          cd: { arms: "hit", expr: "angry" },
          items: [{ id: "cay", prop: "deo-cay-cay", x: 0.55, scale: 0.5 }],
          fx: { kind: "bop", on: "CD", text: "CỘC!" },
        },
        // "người bảo thấp quá": bà hàng xóm đi qua
        {
          line: 1,
          at: 0.22,
          cut: true,
          cd: { arms: "down", expr: "neutral" },
          tc: { role: "deo-cay-ba", x: 0.8, arms: "point", expr: "confused" },
          fx: { kind: "exclaim", on: "TC", text: "THẤP QUÁ!" },
        },
        // "anh đẽo cao"
        {
          line: 1,
          at: 0.34,
          cd: { arms: "hit", expr: "angry" },
          items: [{ id: "cay", prop: "deo-cay-cay", x: 0.55, scale: 1.05 }],
          fx: { kind: "bop", on: "CD", text: "CỘC!" },
        },
        // "có người bảo đẽo to gấp mấy lần để cày bằng voi"
        {
          line: 1,
          at: 0.44,
          cut: true,
          cd: { arms: "down", expr: "confused" },
          tc: { role: "deo-cay-ong-lao", x: 0.78, arms: "up2", expr: "happy" },
          fx: { kind: "exclaim", on: "TC", text: "TO NỮA!" },
        },
        {
          line: 1,
          at: 0.62,
          tc: { x: 0.9, arms: "point" },
          items: [{ id: "voi", prop: "deo-cay-voi", x: 0.52, scale: 0.72 }],
          fx: { kind: "exclaim", on: "CD" },
        },
        // "thế là": đẽo cái cày khổng lồ
        {
          line: 1,
          at: 0.78,
          cd: { arms: "hit", expr: "angry" },
          items: [{ id: "cay", prop: "deo-cay-cay", x: 0.55, scale: 2 }],
          fx: { kind: "bop", on: "CD", text: "CỘC CỘC!" },
        },
        // "hỏng cả đống gỗ"
        {
          line: 1,
          at: 0.9,
          camera: "CD",
          cd: { hand: null, arms: "shrug", expr: "sad" },
          tc: { arms: "shrug", expr: "confused" },
          items: [{ id: "vun", prop: "deo-cay-vun", x: 0.55 }],
          fx: { kind: "sweat", on: "CD" },
        },
      ],
    },
    punchline: {
      shot: "TC đeo tai nghe chụp to, khoanh tay quay lưng lại, Cụ Đồ đứng sau phe phẩy quạt nói vọng vào",
      lines: [
        tc("Cháu hiểu rồi! Từ nay cháu có chủ kiến, không nghe ai cả."),
        cd("Ừ, nhưng góp ý đúng thì vẫn nên nghe."),
        tc("Cháu không nghe! Kể cả câu ông vừa nói!"),
      ],
    },
  }),

  makeEpisode({
    day: 18,
    week,
    theme,
    idiom: "Đầu voi đuôi chuột",
    meaning: "Việc mở đầu rầm rộ, hoành tráng nhưng kết thúc nhỏ bé hoặc bỏ dở giữa chừng.",
    question: "Kế hoạch đầu năm nào của bạn đang ở đoạn đuôi chuột?",
    hook: {
      shot: "TC áp điện thoại lên tai, nói rất nghiêm túc, phía sau là tấm ảnh shop thú cưng",
      lines: [tc("Alo shop ạ? Cho cháu một con đầu voi đuôi chuột, giao trong 2 giờ!")],
    },
    ask: "Mày đặt con gì mà nghe lạ thế?",
    misread: {
      shot: "TC ghép một cái đầu voi bằng thùng carton to tướng với sợi dây sạc làm đuôi; đầu voi chắn kín cửa phòng trọ, chỉ cái đuôi nằm lọt trong phòng",
      lines: [
        tc("Ông bà nói đầu voi đuôi chuột thì chắc phải có con này chứ ông!"),
        tc("Shop bảo hết hàng, nên cháu tự ghép: đầu voi bằng thùng carton, đuôi là sợi dây sạc."),
        tc("Có điều đầu to quá không lọt cửa, nên đầu ở ngoài ngõ, đuôi nằm trong phòng."),
        cd("Phòng trọ mười lăm mét vuông mà mày nuôi cả con voi, ông chịu!"),
      ],
    },
    explain:
      "Đây là lối so sánh: đầu to như voi, đuôi bé như chuột. Câu này chê việc mở đầu thì hoành tráng, rầm rộ, càng về sau càng nhỏ dần rồi bỏ dở giữa chừng.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): vạch xuất phát, thỏ vênh váo chống nạnh cạnh rùa; thỏ phóng vèo đi, rùa lũi thũi bò theo; thỏ lăn ra ngủ dưới gốc cây, rùa bò qua; thỏ tỉnh dậy thì rùa đã đứng dưới cổng ĐÍCH",
      memory: { label: "NGỤ NGÔN: RÙA VÀ THỎ" },
      lines: [
        cd("Như con thỏ trong truyện ngụ ngôn Rùa và Thỏ ấy: vừa xuất phát đã phóng như bay, bỏ rùa lại tít đằng sau."),
        cd("Được nửa đường, thỏ chủ quan lăn ra ngủ dưới gốc cây, bỏ dở cuộc đua; tỉnh dậy thì rùa chậm chạp đã về đích từ lâu."),
      ],
      // Thằng Cháu đóng con thỏ, Cụ Đồ đóng con rùa.
      stage: [
        // "Như con thỏ trong truyện ngụ ngôn Rùa và Thỏ ấy": vạch xuất phát
        {
          line: 0,
          cut: true,
          scene: "tho-rua-dong-co",
          camera: "wide",
          cd: { role: "tho-rua-rua", x: 0.24, hand: null, back: null, head: null, face: null, arms: "down", expr: "neutral", move: "idle" },
          tc: { role: "tho-rua-tho", x: 0.56, hand: null, back: null, head: null, face: null, arms: "hips", expr: "smug", move: "idle" },
          items: [],
        },
        { line: 0, at: 0.25, camera: "TC", tc: { move: "bounce" }, fx: { kind: "exclaim", on: "TC", text: "HÌ HÌ" } },
        // "vừa xuất phát đã phóng như bay"
        { line: 0, at: 0.46, camera: "wide", tc: { arms: "up2", move: "jump", expr: "happy" }, fx: { kind: "bop", on: "TC", text: "XUẤT PHÁT!" } },
        { line: 0, at: 0.62, cut: true, tc: { x: 1.4, move: "idle" }, cd: { expr: "shock" }, fx: { kind: "exclaim", on: "CD", text: "VÈO!" } },
        // "bỏ rùa lại tít đằng sau": rùa lũi thũi bò theo
        { line: 0, at: 0.75, camera: "CD", cd: { x: 0.42, expr: "sad" }, fx: { kind: "sweat", on: "CD" } },

        // "Được nửa đường, thỏ chủ quan lăn ra ngủ dưới gốc cây"
        {
          line: 1,
          cut: true,
          camera: "wide",
          cd: { x: -0.4, expr: "neutral" },
          tc: { x: 0.64, arms: "hips", expr: "smug", move: "idle" },
          items: [{ id: "cay", prop: "tho-rua-cay", x: 0.74 }],
        },
        { line: 1, at: 0.14, tc: { arms: "down", expr: "happy" }, fx: { kind: "exclaim", on: "TC", text: "Zzz" } },
        // "bỏ dở cuộc đua": rùa bò qua
        { line: 1, at: 0.36, cd: { x: 0.3 }, fx: { kind: "exclaim", on: "TC", text: "Zzz" } },
        // "tỉnh dậy thì rùa chậm chạp đã về đích từ lâu"
        {
          line: 1,
          at: 0.6,
          cut: true,
          cd: { x: 0.72, arms: "up2", expr: "happy", move: "bounce" },
          tc: { x: 0.22, arms: "down", expr: "shock", move: "idle" },
          items: [
            { id: "cay", prop: "tho-rua-cay", x: 0.14 },
            { id: "dich", prop: "tho-rua-dich", x: 0.74 },
          ],
          fx: { kind: "exclaim", on: "TC" },
        },
        { line: 1, at: 0.85, cd: { arms: "wave" }, tc: { arms: "shrug", expr: "sad" }, fx: [{ kind: "sparkle", on: "CD" }, { kind: "sweat", on: "TC" }] },
      ],
    },
    punchline: {
      shot: "TC giơ tờ giấy ghi 'Mục tiêu năm nay: tập gym 1 buổi', mặt rạng rỡ như vừa giành giải",
      lines: [
        tc("Cháu hiểu rồi! Năm nay cháu chơi đầu chuột đuôi chuột."),
        tc("Mục tiêu cả năm: tập gym đúng một buổi. Đầu nhỏ đuôi nhỏ, không bao giờ bỏ dở!"),
      ],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    idiom: "Năng nhặt chặt bị",
    meaning: "Chăm chỉ góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều.",
    question: "Khoản tiết kiệm nhỏ mỗi ngày nào của bạn đã thành số tiền đáng kể?",
    hook: {
      shot: "TC ngồi đè lên một cái bị cói căng phồng, quấn dây thừng hết vòng này đến vòng khác, cắn răng siết thật mạnh",
      lines: [tc("Vòng thứ bảy rồi, thế này mới đúng chuẩn chặt bị!")],
    },
    ask: "Mày nhét cái gì vào mà buộc bảy vòng thế?",
    misread: {
      shot: "TC mở bị đổ ra cả núi đồ: túi nilon siêu thị, đũa dùng một lần, gói tương ớt, gói mẫu thử, móc treo quần áo",
      lines: [
        tc("Cháu thực hành năng nhặt chặt bị đấy ông! Cái gì miễn phí là cháu nhặt."),
        tc("Túi nilon siêu thị, đũa dùng một lần, gói tương ớt, mẫu thử dầu gội. Nhặt xong phải buộc bị thật chặt kẻo rơi!"),
        cd("Chặt bị là đầy chặt cái bị, chứ ai bảo mày buộc cho chặt!"),
      ],
    },
    explain:
      "Năng là chăm, thường xuyên. Bị là cái túi đan bằng cói ngày xưa, chặt bị là đầy ắp cả túi. Ý là chịu khó góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): bờ suối dưới chân núi, cậu bé Lý Bạch vứt sách trốn học; bà lão mài thanh sắt trên tảng đá, bảo để làm kim; bà giơ cây kim lấp lánh; cậu ôm sách quay về học",
      memory: { label: "TÍCH XƯA: MÀI SẮT NÊN KIM" },
      lines: [
        cd("Như chuyện cậu bé Lý Bạch ngày xưa ấy: trốn học ra bờ suối, gặp bà lão đang mài một thanh sắt to, bảo là để làm cây kim."),
        cd("Bà bảo mỗi ngày mài một chút, góp lâu sắt cũng thành kim; cậu hiểu ra, quay về ngày học thêm vài chữ, sau thành nhà thơ lớn."),
      ],
      // Thằng Cháu đóng cậu bé Lý Bạch, Cụ Đồ đóng bà lão.
      stage: [
        // "Như chuyện cậu bé Lý Bạch ngày xưa ấy": bờ suối, cậu bé ôm sách, bà lão mài sắt
        {
          line: 0,
          cut: true,
          scene: "ly-bach-suoi",
          camera: "wide",
          cd: { role: "ly-bach-ba-lao", x: 0.7, hand: "ly-bach-thanh-sat", back: null, head: null, face: null, arms: "hold", expr: "neutral", move: "idle" },
          tc: { role: "ly-bach", x: 0.22, hand: { id: "book", text: "SÁCH" }, back: null, head: null, face: null, arms: "hold2", expr: "sad", move: "idle" },
          items: [{ id: "da", prop: "ly-bach-da-mai", x: 0.8, scale: 0.8, front: true }],
        },
        // "trốn học ra bờ suối": vứt sách, nhảy chân sáo
        {
          line: 0,
          at: 0.31,
          tc: { hand: null, arms: "up2", expr: "happy", move: "bounce" },
          items: [
            { id: "da", prop: "ly-bach-da-mai", x: 0.8, scale: 0.8, front: true },
            { id: "sach", prop: { id: "book", text: "SÁCH" }, x: 0.08, scale: 0.8 },
          ],
          fx: { kind: "exclaim", on: "TC", text: "CHƠI THÔI!" },
        },
        // "gặp bà lão đang mài một thanh sắt to"
        { line: 0, at: 0.48, camera: "CD", tc: { x: 0.4, move: "idle", expr: "confused" }, cd: { arms: "hit" }, fx: { kind: "bop", on: "CD", text: "KÈN KẸT!" } },
        // "bảo là để làm cây kim"
        { line: 0, at: 0.8, camera: "wide", cd: { arms: "raise", expr: "happy" }, tc: { expr: "shock" }, fx: { kind: "question", on: "TC" } },

        // "Bà bảo mỗi ngày mài một chút"
        { line: 1, camera: "CD", cd: { arms: "hit", expr: "neutral" }, tc: { arms: "down", move: "idle", expr: "confused" }, fx: { kind: "bop", on: "CD", text: "KÈN KẸT!" } },
        // "góp lâu sắt cũng thành kim"
        { line: 1, at: 0.25, camera: "wide", cd: { hand: "ly-bach-kim", arms: "raise", expr: "happy" }, fx: { kind: "sparkle", on: "CD" } },
        // "cậu hiểu ra"
        { line: 1, at: 0.46, tc: { expr: "happy" }, fx: { kind: "exclaim", on: "TC", text: "À!" } },
        // "quay về ngày học thêm vài chữ": nhặt lại sách, ôm sách học
        {
          line: 1,
          at: 0.57,
          camera: "TC",
          tc: { hand: { id: "book", text: "SÁCH" }, arms: "hold2", move: "bounce" },
          items: [{ id: "da", prop: "ly-bach-da-mai", x: 0.8, scale: 0.8, front: true }],
        },
        // "sau thành nhà thơ lớn"
        { line: 1, at: 0.82, camera: "wide", tc: { hand: { id: "book", text: "THƠ" }, arms: "raise", expr: "smug", move: "idle" }, fx: { kind: "sparkle", on: "TC" } },
      ],
    },
    punchline: {
      shot: "TC đập con heo đất, ôm đống tiền lẻ chạy thẳng ra quầy trà sữa, chỉ vào cốc size to nhất",
      lines: [
        tc("Cháu làm rồi! Mỗi ngày bỏ heo năm nghìn, hết tháng được trăm rưỡi."),
        tc("Thế là cháu đập heo mua ngay cốc trà sữa to nhất, thưởng cho sự kiên trì!"),
      ],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    idiom: "Vung tay quá trán",
    meaning: "Tiêu xài quá tay, vượt quá khả năng tài chính của mình.",
    question: "Đợt sale nào từng khiến bạn vung tay quá trán nhất?",
    hook: {
      shot: "TC đeo băng trán thể thao đứng trước gương, vung mạnh cánh tay lên rồi bốp một cái trúng ngay trán mình",
      lines: [tc("Ui da! Lần này quá trán chuẩn luôn!")],
    },
    ask: "Mày tự vả vào trán từ sáng đến giờ là sao?",
    misread: {
      shot: "TC dán một vạch kẻ trên trán; lần một vung tới mắt, lần hai qua trán, lần ba đứng nhón chân vung chạm cả bóng đèn trần, bóng đèn lắc lư",
      lines: [
        tc("Cháu luyện vung tay quá trán đấy ông. Tay phải vượt khỏi trán mới đạt!"),
        tc("Lúc đầu cháu vung ngang mắt, rồi ngang trán, giờ đã chạm được cả bóng đèn."),
        tc("Cháu còn mở lớp online, ai vung qua vạch trên trán là được cấp chứng chỉ!"),
        cd("Trán mày sưng như quả ổi rồi, tha cho nó đi con ơi!"),
      ],
    },
    explain:
      "Vung tay quá trán là vung quá đà, quá tầm của mình. Ông bà ví với chuyện tiêu tiền: chi tiêu vượt quá khả năng, kiếm được mười mà tiêu mười lăm.",
    example: {
      shot: "Màn hình giỏ hàng online dài vượt khung hình; giữa tháng quẹt thẻ tín dụng, cuối tháng ngồi húp mì gói nhìn lịch chờ lương",
      lines: [
        cd("Như lương mười triệu, đầu tháng thấy sale là bấm đặt liên tục, giỏ hàng kéo mãi không hết."),
        cd("Giữa tháng đã quẹt thẻ tín dụng, cuối tháng ăn mì gói chờ lương."),
      ],
    },
    punchline: {
      shot: "TC ngồi trước điện thoại, tay giơ thấp đúng tầm lông mày, bấm nút đặt hàng; giỏ hàng vẫn hiện số 20",
      lines: [
        tc("Cháu hiểu rồi! Từ nay mỗi lần bấm đặt hàng, cháu chỉ giơ tay đến lông mày thôi."),
        cd("Thế giỏ hàng còn bao nhiêu món?"),
        tc("Vẫn hai mươi món ạ, nhưng tư thế rất tiết kiệm!"),
      ],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    idiom: "Học thầy không tày học bạn",
    meaning: "Học thầy rất quý, nhưng học hỏi từ bạn bè, đồng nghiệp cũng gần gũi và hiệu quả không kém.",
    question: "Mẹo hay nhất bạn từng học được từ bạn bè hay đồng nghiệp là gì?",
    hook: {
      shot: "Văn phòng, TC ngồi sát cạnh một đồng nghiệp, mở cuốn sổ đề 'BÍ KÍP SƯ PHỤ', vừa liếc vừa ghi lia lịa",
      lines: [tc("Chín giờ mười lăm, sư phụ ngáp. Cháu ngáp theo!")],
    },
    ask: "Mày gọi đồng nghiệp là sư phụ rồi ngồi chép cái gì thế?",
    misread: {
      shot: "TC bắt chước y hệt đồng nghiệp: cùng cốc cà phê đen, giấu tám ngón tay vào túi để gõ phím bằng hai ngón, rồi đặt tờ đơn nghỉ phép lên bàn sếp ngay sau bạn",
      lines: [
        tc("Ông bà dạy học thầy không tày học bạn. Tày là gì cháu chưa rõ, nhưng học bạn thì phải giống hệt!"),
        tc("Bạn ấy gõ phím bằng hai ngón, cháu cũng giấu tám ngón vào túi."),
        tc("Hôm nay bạn ấy xin nghỉ phép, thế là cháu cũng xin nghỉ theo!"),
        cd("Học ai không học, mày học cả cái đơn nghỉ phép, ông chịu!"),
      ],
    },
    explain:
      "Tày nghĩa là bằng. Học từ bạn bè, đồng nghiệp rất quý vì gần gũi, hỏi nhiều cũng không ngại. Nhưng ông bà cũng dạy không thầy đố mày làm nên: học thầy để có nền, học bạn để hiểu sâu thêm.",
    example: {
      shot: "Nhân viên mới lúng túng trước bảng Excel; đồng nghiệp ngồi cạnh kéo ghế sang chỉ vài phím tắt, bảng tính chạy vèo vèo",
      lines: [
        cd("Như mới vào công ty, có hàm Excel không dám hỏi sếp."),
        cd("Đồng nghiệp ngồi cạnh chỉ năm phút, kèm mấy phím tắt, thế là cả tuần làm nhanh gấp đôi."),
      ],
    },
    punchline: {
      shot: "TC hớn hở giơ điện thoại khoe lời mời kết bạn đã được chấp nhận, rồi màn hình hiện liền một loạt tin nhắn giao việc",
      lines: [
        tc("Cháu tính rồi: học bạn hơn học thầy, nên cháu kết bạn với sếp luôn!"),
        cd("Thế sếp đồng ý chưa?"),
        tc("Dạ, sếp vừa chấp nhận kết bạn, rồi giao cho cháu gấp đôi việc!"),
      ],
    },
  }),
];
