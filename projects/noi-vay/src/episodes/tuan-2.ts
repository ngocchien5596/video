import { cd, makeEpisode, tc } from "./make.ts";

const week = 2;
const theme = "Con vật";

export const TUAN_2 = [
  makeEpisode({
    day: 8,
    week,
    theme,
    idiom: "Thả con săn sắt bắt con cá rô",
    meaning: "Chịu bỏ ra cái lợi nhỏ trước để thu về cái lợi lớn hơn.",
    question: "Bạn từng chịu thiệt một chút lúc đầu để sau này được nhiều hơn chưa?",
    hook: {
      shot: "Bờ ao, TC buộc nguyên thanh sắt to vào cần câu, quăng tõm xuống nước",
      lines: [tc("Ông tránh ra! Cháu đang dùng thanh sắt này làm mồi câu cá rô!")],
    },
    ask: "Câu cá ai lại móc thanh sắt bao giờ?",
    misread: {
      shot: "TC đeo kính bảo hộ, cầm cục nam châm to đi quanh bếp; nồi, chìa khóa, kính của CĐ bay dính vào",
      lines: [
        tc("Thì phải đi săn sắt trước đã! Cháu lùng hết sắt vụn trong nhà rồi."),
        tc("Cái nồi, chùm chìa khóa, cả cặp kính của ông cũng là sắt. Thả hết xuống ao!"),
        cd("Cá rô chưa thấy đâu, nhà mình sắp thành bãi phế liệu rồi đấy!"),
      ],
    },
    explain:
      "Săn sắt là một loài cá bé tí ở ruộng, nhỏ hơn cá rô. Dùng con cá bé làm mồi để bắt con cá to hơn, tức là chịu bỏ cái lợi nhỏ để được cái lợi lớn. Còn bỏ to lấy nhỏ thì là thả con cá rô, vồ con săn sắt.",
    example: {
      shot: "Quán trà sữa mới mở treo biển tặng ly đầu tiên, khách xếp hàng, tháng sau vẫn quay lại",
      lines: [
        cd("Như quán trà sữa mới mở tặng mỗi người ly đầu tiên. Mất vài trăm ly, đổi lại một xóm khách quen uống cả năm."),
      ],
    },
    punchline: {
      shot: "TC hai tay dâng CĐ một cái kẹo mút, mắt lấp lánh nhìn cái điện thoại trên bàn",
      lines: [
        tc("Cháu hiểu rồi! Cháu biếu ông cái kẹo mút này..."),
        tc("...ông cho cháu cái điện thoại mới nhé!"),
        cd("Mày thả con săn sắt mà đòi bắt cá voi à?"),
      ],
    },
  }),

  makeEpisode({
    day: 9,
    week,
    theme,
    idiom: "Đàn gảy tai trâu",
    meaning: "Nói điều hay với người không hiểu hoặc không chịu nghe thì chỉ phí công.",
    question: "Có chuyện gì bạn đã nói cả chục lần mà người kia vẫn như chưa nghe thấy?",
    hook: {
      shot: "Giữa đồng, TC dựng sân khấu mini, dàn loa to đùng, ôm ukulele hướng về con trâu đồ chơi",
      lines: [tc("Anh Trâu ơi, cháu thuê nguyên dàn loa chỉ để hát riêng cho anh đấy!")],
    },
    ask: "Mày mở liveshow cho ai nghe thế?",
    misread: {
      shot: "TC đổi từ đàn sang thổi sáo, rồi gõ trống ầm ĩ sát tai con trâu đồ chơi",
      lines: [
        tc("Nhạc trữ tình không thích à? Thế em chuyển sang nhạc sàn nhé!"),
        tc("Gảy đứt cả ba dây đàn rồi mà sao mặt anh Trâu vẫn đơ ra thế này?"),
        cd("Nó là trâu nhựa! Mà trâu thật thì cũng chỉ mê tiếng cắt cỏ thôi!"),
      ],
    },
    explain:
      "Con trâu đâu biết thưởng thức tiếng đàn. Ông bà ví việc mình nói điều hay ý đẹp với người không hiểu, hoặc người cứ bỏ ngoài tai, thì nói mấy cũng bằng không. Đôi khi chẳng phải lỗi con trâu, mà là mình chọn nhầm người nghe.",
    example: {
      shot: "Màn hình nhóm chat: một tin nhắn kế hoạch dài dằng dặc, cả nhóm thả tim, rồi một tin nhắn hỏi lại",
      lines: [
        cd("Như mày gửi vào nhóm chat kế hoạch đi chơi dài ba trang. Cả nhóm thả tim. Năm phút sau có đứa hỏi: Ơ thế mai đi đâu?"),
      ],
    },
    punchline: {
      shot: "CĐ giảng xong quay lại thì thấy TC đeo tai nghe to đùng, nhún nhảy hát",
      lines: [
        cd("Đúng là... đàn gảy tai cháu!"),
        tc("Hả? Ông vừa khen cháu đánh đàn hay ạ?"),
      ],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    idiom: "Mèo mù vớ cá rán",
    meaning: "Tình cờ gặp may bất ngờ, chứ không phải nhờ tài giỏi hay công sức của mình.",
    question: "Pha ăn may đỉnh nhất mà bạn từng gặp là gì?",
    hook: {
      shot: "TC đeo bờm tai mèo, buộc khăn bịt mắt, bò quanh bàn ăn khịt khịt mũi",
      lines: [tc("Meo... Cháu ngửi thấy mùi cá rán ở đâu đây rồi!")],
    },
    ask: "Mắt sáng trưng sao lại bịt khăn làm gì?",
    misread: {
      shot: "TC bịt mắt quờ quạng trên bàn ăn: vớ trúng quả ớt, vớ trúng râu CĐ, rồi mới chạm đĩa cá",
      lines: [
        tc("Vớ được rồi! Ơ, cay quá, quả ớt! Vớ lại nào... Á, cái này là râu của ông!"),
        tc("Đây rồi, đĩa cá rán! Cháu đúng là siêu mèo mù săn mồi!"),
        cd("Đĩa cá để ngay trước mặt, mở mắt ra mà gắp, mò thế đổ cả mâm bây giờ!"),
      ],
    },
    explain:
      "Con mèo mù thì bắt chuột sao nổi, vậy mà tình cờ vớ được miếng cá rán người ta để quên. Câu này chỉ sự ăn may, trúng mánh bất ngờ chứ chẳng phải tài giỏi gì.",
    example: {
      shot: "Phòng phỏng vấn, ứng viên trẻ lén liếc ghi chú, nhà tuyển dụng gật gù",
      lines: [
        cd("Như đi phỏng vấn, bị hỏi trúng đúng câu duy nhất mình đọc tối qua. Được nhận xong lại đi khoe mình là thiên tài."),
      ],
    },
    punchline: {
      shot: "TC buộc chặt khăn bịt mắt, ngón tay bấm bừa trên điện thoại, màn hình hiện 'Ứng tuyển thành công'",
      lines: [
        tc("Hay quá! Thế cháu bịt mắt rải hồ sơ bừa, kiểu gì cũng vớ được việc ngon!"),
        tc("Ơ... cháu vừa trúng tuyển làm mèo cho tiệm cà phê mèo ông ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    idiom: "Nuôi ong tay áo",
    meaning: "Hết lòng giúp đỡ, che chở kẻ xấu để rồi chính họ quay lại làm hại mình.",
    question: "Bạn từng chỉ hết nghề cho ai, rồi bị chính người đó giành mất việc chưa?",
    hook: {
      shot: "TC mặc áo khoác rộng, cầm ống hút đút nước đường vào trong ống tay áo",
      lines: [tc("Uống miếng nước đường cho ngọt giọng nhé bé Ong!")],
    },
    ask: "Mày giấu con gì trong ống tay áo đấy?",
    misread: {
      shot: "TC vỗ về ống tay áo, lôi ra con ong nhồi bông, rồi bất ngờ ôm tay nhảy dựng lên",
      lines: [
        tc("Cháu nuôi thú cưng trong tay áo, vừa ấm vừa tiện, đi đâu cũng có bạn!"),
        tc("Ui da! Sao ăn no mật rồi lại chích chủ nhân sưng vù cả tay thế này?"),
        cd("Ai đời lại rước con ong vào ống tay áo mình bao giờ!"),
      ],
    },
    explain:
      "Câu đầy đủ là: nuôi ong tay áo, nuôi cáo trong nhà. Mình thương, mình che chở người ta ngay sát bên cạnh, rồi chính người ta quay lại làm hại mình.",
    example: {
      shot: "Văn phòng: một người kiên nhẫn chỉ việc cho đồng nghiệp mới; cảnh sau, người mới đứng thuyết trình nhận công trước sếp",
      lines: [
        cd("Như mày tận tình chỉ việc cho đồng nghiệp mới, đưa cả tài liệu của mình. Đến buổi họp, nó nhận hết công, còn nói mày làm chậm."),
      ],
    },
    punchline: {
      shot: "TC bỏ con ong xuống, cầm con cua đồ chơi nhét vào túi quần, mặt tỉnh bơ",
      lines: [
        tc("Ông nói đúng, nuôi ong bị đốt đau lắm!"),
        tc("Từ mai cháu chuyển sang nuôi cua trong túi quần cho an toàn ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 12,
    week,
    theme,
    idiom: "Con gà tức nhau tiếng gáy",
    meaning: "Ganh tị, hơn thua với nhau, không chịu kém ai dù chỉ là chuyện nhỏ nhặt.",
    question: "Bạn từng hơn thua với ai chuyện gì mà giờ nghĩ lại thấy buồn cười?",
    hook: {
      shot: "Đồng hồ chỉ 5 giờ sáng, TC cầm loa đứng trên ghế gáy vang nhà",
      lines: [tc("Ò ó o o o!")],
    },
    ask: "Mới tờ mờ sáng, làm loạn gì thế?",
    misread: {
      shot: "TC chỉ ra cửa sổ mặt đầy quyết tâm, hít hơi gáy to hơn tiếng gà hàng xóm",
      lines: [
        tc("Con gà trống nhà bên vừa gáy 3 tiếng trêu ngươi cháu!"),
        tc("Cháu phải gáy trả 10 tiếng thật vang cho nó biết ai mới là giọng ca vàng xóm này!"),
        cd("Nó là gà thì nó gáy, mày là người đi thi gáy với gà làm gì?"),
      ],
    },
    explain:
      "Hai con gà trống nghe nhau gáy là tức, cứ cố gáy to hơn cho bằng được. Câu này nói chuyện người với người ganh tị, thấy ai hơn mình một chút là phải hơn thua, dù chẳng đáng gì.",
    example: {
      shot: "Màn hình ứng dụng chạy bộ: bạn thân khoe 5 km, cảnh sau TC chạy 6 km, về ôm đầu gối nhăn nhó",
      lines: [
        cd("Như đứa bạn khoe sáng nay chạy được 5 cây số. Thế là mình đau đầu gối vẫn cố chạy 6 cây, chỉ để đăng ảnh cho bõ tức."),
      ],
    },
    punchline: {
      shot: "TC khoanh tay gật gù, rồi giơ ngón tay đếm với Cụ Đồ",
      lines: [
        tc("Cháu hiểu rồi, không thèm hơn thua nữa! Nhưng sáng giờ cháu khen ông 2 câu, ông mới khen cháu 1 câu..."),
        tc("...Ông phải khen bù cháu 3 câu đi kẻo cháu tức!"),
      ],
    },
  }),

  makeEpisode({
    day: 13,
    week,
    theme,
    idiom: "Vẽ rắn thêm chân",
    meaning: "Việc đã xong, đã ổn rồi mà còn bày thêm cái thừa, làm hỏng cả việc.",
    question: "Bạn từng thêm thắt chi tiết thừa nào để rồi làm hỏng cả việc chưa?",
    hook: {
      shot: "Tay vẽ tua nhanh trên giấy A3, con rắn mọc ra hàng loạt chân kỳ quặc",
      lines: [tc("Thêm 4 cái chân, thêm đôi giày thể thao, thêm cái ván trượt!")],
    },
    ask: "Vẽ con gì mà trông như quái vật thế?",
    misread: {
      shot: "TC giơ bức tranh con rắn có 8 chân đi giày, mặt đầy tự hào",
      lines: [
        tc("Cuộc thi bảo ai vẽ rắn nhanh nhất thì thắng! Cháu xong đầu tiên, thấy còn thừa thời gian..."),
        tc("...nên cháu tặng kèm con rắn 8 cái chân cho nó chạy nhanh hơn!"),
        cd("Rắn làm gì có chân! Ban giám khảo tưởng mày vẽ con rết đi giày đấy!"),
      ],
    },
    explain:
      "Chuyện xưa kể mấy người thi vẽ rắn để giành một bình rượu. Người vẽ xong trước lại ngứa tay vẽ thêm chân, thế là mất phần. Ý nói việc đã ổn mà cứ bày thêm cái thừa thì hỏng bét.",
    example: {
      shot: "Màn hình máy chiếu: slide gọn gàng, rồi chữ bay lượn, pháo hoa, nhạc nền; sếp nheo mắt xoa thái dương",
      lines: [
        cd("Như bộ slide đã gọn gàng, đủ ý. Mày cố thêm chữ bay lượn, pháo hoa với nhạc nền. Sếp xem xong chỉ nhớ mỗi cái chóng mặt."),
      ],
    },
    punchline: {
      shot: "TC lấy cục tẩy chà mạnh làm rách giấy, rồi cầm bút vẽ đè lên chỗ rách",
      lines: [
        tc("Cháu xóa chân rắn rồi! Nhưng tẩy mạnh quá, giấy thủng một lỗ..."),
        tc("...nên cháu vẽ thêm đôi cánh đại bàng che lỗ thủng ông nhé!"),
      ],
    },
  }),

  makeEpisode({
    day: 14,
    week,
    theme,
    idiom: "Mèo khen mèo dài đuôi",
    meaning: "Tự khen mình, hoặc người cùng phe khen lẫn nhau, chẳng khách quan chút nào.",
    question: "Lời khen nào trên mạng khiến bạn nghi là mèo khen mèo nhất?",
    hook: {
      shot: "TC gắn cái đuôi mèo giả dài lê thê, xoay người trước gương, tự vỗ tay",
      lines: [tc("Trời ơi, ai mà có cái đuôi đẹp thế này! À, là cháu!")],
    },
    ask: "Mày đứng trước gương tự vỗ tay cái gì thế?",
    misread: {
      shot: "TC lấy thước dây đo đuôi, nối thêm đoạn nữa; con mèo bên cạnh cũng ngoe nguẩy đuôi, hai đuôi quấn vào nhau làm TC ngã oạch",
      lines: [
        tc("Cháu nối đuôi dài 2 mét rồi! Mèo ơi, khen anh đi!"),
        tc("Đấy, nó kêu meo là khen đuôi cháu dài. Cháu khen lại đuôi nó dài. Hai đứa khen nhau từ sáng!"),
        cd("Khen nhau đến mức đuôi quấn vào nhau ngã sấp mặt rồi kìa!"),
      ],
    },
    explain:
      "Mèo thì đuôi dài là chuyện bình thường, có gì mà khen. Câu này chê người tự khen mình, hoặc người cùng phe cứ tâng bốc nhau, nghe chẳng khách quan tí nào.",
    example: {
      shot: "Màn hình trang bán hàng: toàn đánh giá 5 sao từ tài khoản cùng họ; khách thật đứng ngoài cửa lắc đầu",
      lines: [
        cd("Như quán mới mở, chủ quán tự chấm 5 sao, họ hàng vào bình luận ngon nhất thành phố. Còn khách thật thì chưa ai bước vào."),
      ],
    },
    punchline: {
      shot: "TC cầm hai cái điện thoại, màn hình chi chít tài khoản phụ, bấm like liên tục",
      lines: [
        tc("Cháu hiểu rồi! Từ giờ cháu không tự like ảnh của mình nữa."),
        tc("Cháu lập 5 tài khoản phụ để like hộ!"),
        cd("Thế là năm con mèo khen một cái đuôi!"),
      ],
    },
  }),
];
