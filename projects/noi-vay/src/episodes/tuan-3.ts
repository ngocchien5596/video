import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Học hành, công việc, tiền bạc";

export const TUAN_3 = [
  makeEpisode({
    day: 9,
    week,
    theme,
    idiom: "Muốn ăn hét phải đào giun",
    meaning: "Muốn hưởng thành quả thì phải chịu bỏ công sức, chuẩn bị từ trước.",
    question: "Thành quả nào bạn từng phải chuẩn bị rất lâu mới có được?",
    hook: {
      shot: "Ban công chung cư buổi tối, TC cầm xẻng nhỏ đào chậu hoa, rồi chúi đầu vào cái hố gào thật to",
      lines: [tc("Đào được con thứ ba rồi! Giờ cháu được hét tiếp nhé!")],
    },
    ask: "Đêm hôm khuya khoắt, mày đào chậu hoa rồi gào cái gì thế hử?",
    misread: {
      shot: "TC xếp từng con giun vào hộp, mỗi con lại cầm micro karaoke hét một câu; hàng xóm bên cạnh bịt tai, đèn các căn hộ lần lượt bật sáng",
      lines: [
        tc("Ông bà bảo muốn ăn hét phải đào giun mà! Cháu đang thèm hét cho đã đây!"),
        tc("Đào một con giun là được hét một câu. Đào đủ năm con là cháu hét được nguyên một bài karaoke luôn!"),
        cd("Bảo vệ gọi lên ba lần rồi đấy! Ông cũng sắp hét theo mày đây!"),
      ],
    },
    explain:
      "Hét ở đây là con chim hét cơ, trông na ná chim sáo, mà nó mê ăn giun lắm. Muốn bẫy được nó thì phải đào giun làm mồi trước đã. Nói gọn lại, có làm thì mới có ăn!",
    example: {
      shot: "HỒI ỨC (TV đen trắng): vua Hùng chỉ tay đày Mai An Tiêm ra đảo hoang; An Tiêm cầm cuốc phát cỏ; chim thả hạt lạ, chàng gieo thành ruộng dưa; ôm quả dưa khắc tên thả xuống biển, thuyền buôn cập đảo",
      memory: { label: "SỰ TÍCH: DƯA HẤU MAI AN TIÊM" },
      lines: [
        cd("Cứ như Mai An Tiêm trong sự tích dưa hấu ấy. Bị vua Hùng đày ra đảo hoang, chàng chẳng ngồi than thở gì mà tự tay phát cỏ, cuốc đất luôn."),
        cd("Thấy chim thả xuống mấy hạt lạ, chàng nhặt về gieo, chăm mãi mới thành cả một ruộng dưa ngọt lịm. Chàng khắc tên mình lên quả dưa rồi thả xuống biển, thế là thuyền buôn tìm ra tận đảo để đổi hàng!"),
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
        tc("À! Muốn có cái gì thì phải chuẩn bị mồi từ trước!"),
        tc("Thế nên cháu gửi CV kèm luôn một hộp giun tươi. Công ty nào mê giun là gọi cháu ngay!"),
        cd("Cái thằng này! Mày đi xin việc hay đi bẫy chim thế hả?"),
      ],
    },
  }),

  makeEpisode({
    day: 12,
    week,
    theme,
    idiom: "Vung tay quá trán",
    meaning: "Chê tiêu xài quá tay, vượt khả năng tài chính; rộng ra là làm gì cũng quá đà.",
    question: "Đợt sale nào từng khiến bạn vung tay quá trán nhất?",
    hook: {
      shot: "TC đeo băng trán thể thao đứng trước gương, vung mạnh cánh tay lên rồi bốp một cái trúng ngay trán mình",
      lines: [tc("Ui da! Lần này thì cháu vung tay quá trán chuẩn luôn rồi nhé!")],
    },
    ask: "Từ sáng đến giờ mày cứ tự vả vào trán là sao hả?",
    misread: {
      shot: "TC dán một vạch kẻ trên trán; lần một vung tới mắt, lần hai qua trán, lần ba đứng nhón chân vung chạm cả bóng đèn trần, bóng đèn lắc lư",
      lines: [
        tc("Cháu đang luyện vung tay quá trán đấy ông! Tay phải vượt hẳn qua trán thì mới đạt chuẩn cơ!"),
        tc("Lúc đầu cháu mới vung tới ngang mắt, rồi lên ngang trán, giờ thì với tới cả bóng đèn rồi nhé!"),
        tc("Cháu còn mở cả lớp online, ai vung qua được vạch trên trán là cháu cấp chứng chỉ luôn!"),
        cd("Trán mày sưng như quả ổi rồi kìa, tha cho nó đi con ơi!"),
      ],
    },
    explain:
      "Có cách giải thích là người xưa hay lấy thân mình làm mức đo. Tay giơ tới trán là đã cao lắm rồi, vung quá trán là vượt giới hạn của mình đấy. Câu này chủ yếu là chê những người tiêu xài quá tay, kiếm được mười mà tiêu tới những mười lăm. Nói gọn lại, tiêu quá sức mình, hay rộng ra là làm việc gì mà quá đà, thì đều là vung tay quá trán đấy, cháu ạ!",
    example: {
      shot: "Màn hình giỏ hàng online dài vượt khung hình; giữa tháng quẹt thẻ tín dụng, cuối tháng ngồi húp mì gói nhìn lịch chờ lương",
      lines: [
        cd("Ví như lương tháng có mười triệu, đầu tháng thấy sale là bấm đặt lia lịa, giỏ hàng kéo mãi chẳng hết."),
        cd("Mới giữa tháng đã phải quẹt thẻ tín dụng, đến cuối tháng thì ôm gói mì ngồi chờ lương."),
      ],
    },
    punchline: {
      shot: "TC ngồi trước điện thoại, tay giơ thấp đúng tầm lông mày, bấm nút đặt hàng; giỏ hàng vẫn hiện số 20",
      lines: [
        tc("Cháu hiểu rồi! Từ giờ mỗi lần bấm đặt hàng, cháu chỉ giơ tay tới lông mày thôi."),
        cd("Thế giỏ hàng còn bao nhiêu món hử?"),
        tc("Vẫn hai mươi món ạ! Nhưng mà tư thế thì tiết kiệm lắm ông ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 14,
    week,
    theme,
    idiom: "Năng nhặt chặt bị",
    meaning: "Chăm chỉ góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều.",
    question: "Khoản tiết kiệm nhỏ mỗi ngày nào của bạn đã thành số tiền đáng kể?",
    hook: {
      shot: "TC ngồi đè lên một cái bị cói căng phồng, quấn dây thừng hết vòng này đến vòng khác, cắn răng siết thật mạnh",
      lines: [tc("Vòng thứ bảy rồi! Thế này mới gọi là chặt bị chứ!")],
    },
    ask: "Mày nhét cái gì trong đấy mà buộc những bảy vòng thế hử?",
    misread: {
      shot: "TC mở bị đổ ra cả núi đồ: túi nilon siêu thị, đũa dùng một lần, gói tương ớt, gói mẫu thử, móc treo quần áo",
      lines: [
        tc("Cháu đang thực hành năng nhặt chặt bị đấy ông! Cái gì miễn phí là cháu nhặt tuốt."),
        tc("Túi nilon siêu thị, đũa dùng một lần, gói tương ớt, mẫu thử dầu gội... Nhặt xong là phải buộc bị thật chặt kẻo rơi mất!"),
        cd("Chặt bị là cái bị được nhét đầy chặt, chứ có ai bảo mày buộc cho chặt đâu!"),
      ],
    },
    explain:
      "Năng tức là chăm, là thường xuyên đấy cháu ạ. Còn bị là cái túi đan bằng cói, có quai xách, mà phải nhặt mãi thì cái bị mới đầy chặt lên được. Nói gọn lại, cứ chịu khó góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều. Tiền bạc, kiến thức hay kinh nghiệm cũng thế cả thôi.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): bờ suối dưới chân núi, cậu bé Lý Bạch vứt sách trốn học; bà lão mài thanh sắt trên tảng đá, bảo để làm kim; bà giơ cây kim lấp lánh; cậu ôm sách quay về học",
      memory: { label: "TÍCH XƯA: MÀI SẮT NÊN KIM" },
      lines: [
        cd("Như chuyện cậu bé Lý Bạch ngày xưa ấy. Tương truyền cậu trốn học ra bờ suối chơi, thì gặp một bà lão đang mài thanh sắt to, hỏi ra mới biết bà mài để làm cây kim!"),
        cd("Bà nói cứ mỗi ngày mài một chút, mài mãi thì thanh sắt cũng thành cây kim. Cậu bé hiểu ra, liền quay về nhà, ngày nào cũng chịu khó học thêm vài chữ, rồi về sau trở thành một nhà thơ lớn đấy."),
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
        tc("Cháu làm rồi ông ơi! Mỗi ngày cháu bỏ heo năm nghìn, hết tháng là được trăm rưỡi."),
        tc("Thế là cháu đập heo, làm ngay cốc trà sữa size to nhất, tự thưởng cho mình vì đã kiên trì cả tháng!"),
      ],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    idiom: "Nước đến chân mới nhảy",
    meaning: "Chê thói chần chừ, không lo trước, việc đến sát nút mới cuống cuồng làm nên dễ hỏng.",
    question: "Deadline nào bạn từng làm xong chỉ vài phút trước giờ nộp?",
    hook: {
      shot: "Phòng trọ, TC ngồi trên giường lướt điện thoại, hai chân thả hờ trên một xô nước đang được vòi nước rót dần",
      lines: [tc("Còn đúng 5 phân nữa thôi, nước chạm chân là cháu nhảy!")],
    },
    ask: "Cái thằng này, ngồi canh cái xô nước làm gì thế hử?",
    misread: {
      shot: "TC nằm lướt điện thoại cạnh xô nước sắp tràn; nước vừa chạm ngón chân, TC bật dậy nhảy tưng tưng, nước bắn khắp phòng",
      lines: [
        tc("Thì ông bà dạy thế còn gì, nước chưa đến chân thì việc gì phải nhảy hả ông!"),
        tc("Nước chưa tới thì cháu cứ nằm lướt điện thoại, nước vừa chạm vào chân là cháu bật tưng lên như lò xo!"),
        tc("Cháu còn cài cả báo thức nhé, nước vừa chạm ngón chân cái là nhạc nhảy tự bật lên luôn!"),
        cd("Ngập hết phòng trọ rồi kìa! Chủ nhà sắp nhảy lên đây bây giờ!"),
      ],
    },
    explain:
      "Nước dâng tới chân rồi mới nhảy lên tránh thì muộn mất rồi còn gì! Câu này chê cái thói chần chừ, không lo trước, việc gì cũng để sát nút mới cuống cuồng làm. Như cháu đấy, cứ sát ngày thi mới lôi sách ra ôn! Nói gọn lại, việc gì cũng phải lo từ trước.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đồng cỏ mùa hè, ve ôm đàn ca hát, kiến hì hục tha thóc về tổ; mùa đông tuyết rơi, ve run rẩy đói meo, chạy sang gõ cửa nhà kiến xin ăn",
      memory: { label: "NGỤ NGÔN: VE VÀ KIẾN" },
      lines: [
        cd("Cháu có nhớ con ve trong truyện Ve và Kiến không? Suốt mùa hè nó chỉ ôm đàn ca hát, mặc kệ bầy kiến hì hục tha thóc về tổ."),
        cd("Đến lúc gió bấc thổi về, cây cối trụi hết lá, bụng thì đói meo, bấy giờ ve mới cuống cuồng chạy sang gõ cửa nhà kiến xin ăn đấy!"),
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
        tc("À, cháu hiểu rồi! Tức là phải nhảy từ sớm chứ gì!"),
        tc("Thế nên cháu dặn thằng bạn cùng phòng rồi, cứ sáng thứ Hai là dội nguyên xô nước vào chân cháu."),
        tc("Thế là tuần nào cháu cũng nhảy từ sớm nhé ông!"),
      ],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    idiom: "Học thầy không tày học bạn",
    meaning: "Học thầy rất quý, nhưng học hỏi từ bạn bè, đồng nghiệp cũng gần gũi và hiệu quả không kém.",
    question: "Mẹo hay nhất bạn từng học được từ bạn bè hay đồng nghiệp là gì?",
    hook: {
      shot: "Văn phòng, TC ngồi sát cạnh một đồng nghiệp, mở cuốn sổ đề 'BÍ KÍP SƯ PHỤ', vừa liếc vừa ghi lia lịa",
      lines: [tc("Đúng chín giờ mười lăm, sư phụ ngáp một cái. Thế là cháu cũng ngáp theo!")],
    },
    ask: "Mày gọi đồng nghiệp là sư phụ, rồi ngồi chép lia lịa cái gì thế?",
    misread: {
      shot: "TC bắt chước y hệt đồng nghiệp: cùng cốc cà phê đen, giấu tám ngón tay vào túi để gõ phím bằng hai ngón, rồi đặt tờ đơn nghỉ phép lên bàn sếp ngay sau bạn",
      lines: [
        tc("Ông bà dạy là học thầy không tày học bạn mà! Tày là gì thì cháu chịu, nhưng đã học bạn thì phải giống y hệt chứ!"),
        tc("Sư phụ gõ phím có mỗi hai ngón tay, thế là cháu giấu luôn tám ngón còn lại vào túi quần."),
        tc("Hôm nay sư phụ xin nghỉ phép, thế là cháu cũng nộp đơn nghỉ theo luôn!"),
        cd("Cái hay thì không học, lại đi học cả cái khoản nghỉ phép, ông chịu mày!"),
      ],
    },
    explain:
      "Tày tức là bằng đấy cháu ạ. Nghe thì cứ tưởng ông bà bảo học thầy chẳng bằng học bạn, nhưng ý là bạn bè, đồng nghiệp gần gũi, hỏi bao nhiêu cũng chẳng ngại, nên học được cả những cái thầy chưa kịp chỉ. Nói gọn lại, học thầy để có cái nền vững, học bạn để hiểu sâu thêm.",
    example: {
      shot: "Nhân viên mới lúng túng trước bảng Excel; đồng nghiệp ngồi cạnh kéo ghế sang chỉ vài phím tắt, bảng tính chạy vèo vèo",
      lines: [
        cd("Ví như cháu mới vào công ty, gặp cái hàm Excel không hiểu mà lại chẳng dám hỏi sếp."),
        cd("Thế mà đồng nghiệp ngồi cạnh chỉ cho có năm phút, mách thêm mấy phím tắt, thế là cả tuần ấy cháu làm việc nhanh gấp đôi!"),
      ],
    },
    punchline: {
      shot: "TC hớn hở giơ điện thoại khoe lời mời kết bạn đã được chấp nhận, rồi màn hình hiện liền một loạt tin nhắn giao việc",
      lines: [
        tc("Cháu tính kỹ rồi nhé! Học bạn còn hơn học thầy, thế nên cháu kết bạn với sếp luôn!"),
        cd("Thế sếp có chịu kết bạn với mày không hử?"),
        tc("Sếp đồng ý ngay ạ! Xong sếp giao luôn cho cháu gấp đôi việc!"),
      ],
    },
  }),

  makeEpisode({
    day: 23,
    week,
    theme,
    idiom: "Đẽo cày giữa đường",
    meaning: "Chê người không có chủ kiến, ai bảo gì cũng nghe theo nên cuối cùng hỏng việc.",
    question: "Bạn từng sửa một bài làm theo góp ý của quá nhiều người đến mức hỏng chưa?",
    hook: {
      shot: "Hành lang khu trọ chật hẹp, TC kê ghế ngồi chính giữa, ôm khúc gỗ to cầm cái bào gỗ; hàng xóm xách xe đạp phải nghiêng người lách qua",
      lines: [tc("Mọi người chịu khó đi vòng giúp cháu nhé! Cháu đang làm nghề truyền thống ạ!")],
    },
    ask: "Ơ hay, sao mày bày gỗ chắn hết lối đi thế này?",
    misread: {
      shot: "TC cầm thước dây đo hai bên tường, dịch khúc gỗ từng phân cho thật chính giữa; phía sau người xếp hàng chờ qua mỗi lúc một dài",
      lines: [
        tc("Ông bà dặn đẽo cày giữa đường mà ông! Đẽo trong phòng là sai lời ông bà ngay!"),
        tc("Cháu lấy thước đo hẳn hoi nhé, lệch một phân thôi là cháu dời ghế ngay."),
        tc("Chiều nay cháu dọn ra giữa cầu thang, chỗ ấy vừa chính giữa hơn lại vừa thoáng!"),
        cd("Cả khu trọ phải trèo qua khúc gỗ mới đi làm được, ông xin mày đấy!"),
      ],
    },
    explain:
      "Câu này lấy từ một truyện ngụ ngôn đấy. Đẽo cày ngay giữa chỗ người qua kẻ lại thì ai chẳng góp một câu? Nói gọn lại, ông bà chê người không có chủ kiến, ai bảo gì cũng nghe theo, để rồi rốt cuộc hỏng hết cả việc.",
    example: {
      shot: "HỒI ỨC (TV đen trắng): đường làng, anh thợ dốc vốn mua khúc gỗ, ngồi đẽo cày; ông lão bảo cao quá, anh đẽo thấp; bà hàng xóm bảo thấp quá, anh đẽo cao; ông lão bảo đẽo thật to để cày bằng voi; cái cày to khổng lồ rồi thành đống vụn gỗ",
      memory: { label: "NGỤ NGÔN: ĐẼO CÀY GIỮA ĐƯỜNG" },
      lines: [
        cd("Như anh chàng trong truyện Đẽo cày giữa đường ấy. Anh ta dốc hết vốn ra mua gỗ, rồi ngồi ngay bên đường đẽo cày, ai đi qua góp ý gì anh cũng nghe theo."),
        cd("Người này bảo cao quá, anh liền đẽo cho thấp. Người kia chê thấp quá, anh lại đẽo cho cao. Đến khi có người bảo đẽo to gấp mấy lần để còn cày bằng voi, anh cũng răm rắp làm theo, thế là hỏng sạch cả đống gỗ!"),
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
        tc("Cháu hiểu rồi! Từ giờ cháu sống có chủ kiến, chẳng nghe ai hết!"),
        cd("Cái thằng này, ai góp ý đúng thì vẫn phải nghe chứ!"),
        tc("Cháu không nghe đâu! Kể cả câu ông vừa nói cũng thế!"),
      ],
    },
  }),

  makeEpisode({
    day: 25,
    week,
    theme,
    idiom: "Đầu voi đuôi chuột",
    meaning: "Việc mở đầu rầm rộ, hoành tráng nhưng kết thúc nhỏ bé hoặc bỏ dở giữa chừng.",
    question: "Kế hoạch đầu năm nào của bạn đang ở đoạn đuôi chuột?",
    hook: {
      shot: "TC áp điện thoại lên tai, nói rất nghiêm túc, phía sau là tấm ảnh shop thú cưng",
      lines: [tc("Alo shop ạ? Cho cháu một con đầu voi đuôi chuột, ship trong 2 tiếng nhé!")],
    },
    ask: "Mày đặt con gì mà nghe lạ hoắc thế?",
    misread: {
      shot: "TC ghép một cái đầu voi bằng thùng carton to tướng với sợi dây sạc làm đuôi; đầu voi chắn kín cửa phòng trọ, chỉ cái đuôi nằm lọt trong phòng",
      lines: [
        tc("Ông bà nói đầu voi đuôi chuột thì chắc phải có con này chứ ông!"),
        tc("Shop bảo hết hàng, thế là cháu tự ghép luôn. Đầu voi thì cháu làm bằng thùng carton, còn đuôi thì lấy luôn sợi dây sạc!"),
        tc("Mỗi tội cái đầu to quá, không lọt qua được cửa, thế là đầu thì nằm ngoài ngõ, còn đuôi lại nằm trong phòng."),
        cd("Phòng trọ có mười lăm mét vuông mà mày nuôi cả con voi, ông chịu mày thật đấy!"),
      ],
    },
    explain:
      "Câu này chê những việc lúc mở đầu thì rầm rộ, hoành tráng lắm, nhưng càng về sau càng teo dần, rồi kết thúc lèo tèo hoặc bỏ dở giữa chừng. Nói gọn lại là đầu thì to mà đuôi thì bé tí. Mấy cái kế hoạch đầu năm hay mắc bệnh này lắm đấy!",
    example: {
      shot: "HỒI ỨC (TV đen trắng): vạch xuất phát, thỏ vênh váo chống nạnh cạnh rùa; thỏ phóng vèo đi, rùa lũi thũi bò theo; thỏ lăn ra ngủ dưới gốc cây, rùa bò qua; thỏ tỉnh dậy thì rùa đã đứng dưới cổng ĐÍCH",
      memory: { label: "NGỤ NGÔN: RÙA VÀ THỎ" },
      lines: [
        cd("Cứ như con thỏ trong truyện Rùa và Thỏ ấy. Vừa xuất phát là nó đã phóng như bay, bỏ rùa lại tít tận đằng sau."),
        cd("Mới chạy được nửa đường, thỏ ta đã chủ quan lăn ra ngủ dưới gốc cây, bỏ mặc cuộc đua. Đến lúc tỉnh dậy thì chú rùa chậm chạp kia đã về tới đích mất rồi!"),
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
        tc("Cháu hiểu rồi! Năm nay cháu chơi kiểu đầu chuột đuôi chuột."),
        tc("Mục tiêu cả năm là tập gym đúng một buổi. Đầu đã bé thì đuôi cũng bé, thế thì còn bỏ dở kiểu gì được nữa!"),
      ],
    },
  }),
];
