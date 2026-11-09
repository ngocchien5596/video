import { cd, makeEpisode, tc } from "./make.ts";

const week = 2;
const theme = "Con vật";

export const TUAN_2 = [
  makeEpisode({
    day: 8,
    week,
    theme,
    idiom: "Ếch ngồi đáy giếng",
    meaning: "Hiểu biết còn ít ỏi, hạn hẹp nhưng lại chủ quan, tưởng mình cái gì cũng biết.",
    question: "Lần đầu tiên bước ra khỏi 'đáy giếng', điều gì làm bạn bất ngờ nhất?",
    hook: {
      shot: "TC chui vào cái thùng carton tròn, đội rổ nhựa lên đầu, cầm ống nhòm giấy nhìn lên trần nhà",
      lines: [tc("Báo cáo! Bầu trời hôm nay chỉ to đúng bằng cái vung nồi!")],
    },
    ask: "Chui vào thùng giấy ngắm cái gì đấy?",
    misread: {
      shot: "TC ôm con ếch đồ chơi ngồi trong thùng giấy, chỉ tay lên miệng thùng vẻ đắc ý",
      lines: [
        tc("Ông nhìn xem, ngồi dưới đáy thùng nhìn lên thấy bầu trời bé tí!"),
        tc("Cháu với con ếch này đã nhìn thấu toàn bộ vũ trụ, thành nhà thông thái biết tuốt rồi!"),
        cd("Mày bỏ cái thùng ra khỏi đầu xem bầu trời nó rộng cỡ nào!"),
      ],
    },
    explain:
      "Chuyện xưa kể con ếch sống dưới đáy giếng sâu, nhìn lên chỉ thấy khoảng trời bé bằng cái vung mà tưởng thế là cả bầu trời. Ý nói người mới biết một chút đã vội kiêu căng, khoác lác!",
    example: {
      shot: "Cảnh lớp học, một bạn khoanh tay vênh mặt",
      lines: [
        cd("Như mới học thuộc bảng cửu chương 2 đã đi khoe khắp xóm là giải được cả toán lớp 12, ai chỉ bảo thêm cũng không thèm nghe!"),
      ],
    },
    punchline: {
      shot: "TC bước ra khỏi thùng giấy, trèo lên cái ghế đẩu thấp lè tè đứng chống nạnh",
      lines: [
        tc("Thế cháu không ngồi đáy giếng nữa!"),
        tc("Cháu trèo lên ghế đẩu cao thêm 20 phân là thành thông thái nhất nhà rồi ông nhỉ?"),
      ],
    },
  }),

  makeEpisode({
    day: 9,
    week,
    theme,
    idiom: "Đàn gảy tai trâu",
    meaning: "Nói điều hay, khuyên bảo tận tình cho người không hiểu hoặc cố tình bỏ ngoài tai thì cũng uổng công.",
    question: "Ở nhà bố mẹ hay phải nhắc đi nhắc lại bạn chuyện gì nhất?",
    hook: {
      shot: "TC ôm đàn ukulele gảy tưng bừng trước mặt con trâu đồ chơi",
      lines: [tc("Nào anh Trâu, vào nhịp đi! Một, hai, ba... quẩy lên!")],
    },
    ask: "Mày mở liveshow cho ai nghe thế?",
    misread: {
      shot: "TC đổi từ đàn sang thổi sáo, gõ trống ầm ĩ sát tai con trâu đồ chơi",
      lines: [
        tc("Nhạc cổ điển không thích à? Thế chuyển sang nhạc thiếu nhi nhé!"),
        tc("Gảy đứt cả dây đàn rồi mà sao mặt anh Trâu vẫn đơ ra thế này?!"),
        cd("Nó là trâu nhựa, mà có là trâu thật thì nó cũng chỉ thích nghe tiếng cắt cỏ thôi!"),
      ],
    },
    explain:
      "Con trâu đâu có biết thưởng thức tiếng đàn! Ông bà ví chuyện mình nói lời hay ý đẹp, khuyên bảo tận tình mà người nghe cứ bỏ ngoài tai, chẳng chịu tiếp thu.",
    example: {
      shot: "Cảnh mẹ gọi đi tắm học bài, con vẫn dán mắt vào tivi",
      lines: [
        cd("Giống hệt lúc mẹ gọi khản cổ: 'Tắt tivi đi tắm rồi học bài đi con!', mà mắt mày vẫn dán vào màn hình như không nghe thấy gì!"),
      ],
    },
    punchline: {
      shot: "CĐ vừa giảng xong quay lại thì thấy TC đang đeo tai nghe to đùng, nhún nhảy hát",
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
    meaning: "Tình cờ gặp may mắn bất ngờ chứ không phải nhờ tài giỏi hay công sức của mình.",
    question: "Pha 'ăn may' đỉnh nhất trong lớp học của bạn là gì?",
    hook: {
      shot: "TC đeo bờm tai mèo, buộc khăn bịt mắt, bò quanh bàn ăn khịt khịt mũi",
      lines: [tc("Meo... Mùi cá rán thơm phức đâu đây rồi!")],
    },
    ask: "Mắt sáng trưng sao lại bịt khăn làm gì?",
    misread: {
      shot: "TC bịt mắt quờ quạng trên bàn ăn: vớ trúng quả ớt, vớ trúng tay CĐ, rồi mới chạm đĩa cá",
      lines: [
        tc("Vớ được rồi! Ơ... cay quá, quả ớt! Vớ lại nào... Á, cái này là râu của ông!"),
        tc("Đây rồi, đĩa cá rán! Cháu đúng là siêu mèo mù săn mồi!"),
        cd("Đĩa cá để ngay trước mặt, mở mắt ra mà gắp chứ mò mẫm đổ hết mâm cơm bây giờ!"),
      ],
    },
    explain:
      "Con mèo bị mù không bắt được chuột, tình cờ vớ được miếng cá rán người ta để quên. Câu này chỉ sự ăn may bất ngờ, tình cờ trúng mánh chứ chẳng phải tài giỏi gì!",
    example: {
      shot: "Cảnh làm bài trắc nghiệm trong lớp",
      lines: [
        cd("Như đi kiểm tra không thuộc bài, nhắm mắt khoanh bừa câu trắc nghiệm mà trúng, thế rồi đi khoe ầm lên là mình thông minh xuất chúng!"),
      ],
    },
    punchline: {
      shot: "TC buộc chặt khăn bịt mắt lại, tay cầm bút chì quờ quạng trên vở",
      lines: [
        tc("Tuyệt vời! Vậy tối nay cháu cứ bịt mắt làm bài tập về nhà, kiểu gì cũng 'vớ' được điểm 10!"),
        cd("Mày vớ được cây chổi của mẹ thì có!"),
      ],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    idiom: "Nuôi ong tay áo",
    meaning: "Thương yêu, giúp đỡ hết lòng kẻ xấu để rồi chính họ quay lại làm hại mình.",
    question: "Bạn từng nhiệt tình giúp bạn mà lại bị trêu ngược lại chưa?",
    hook: {
      shot: "TC mặc áo khoác rộng, cầm ống hút đút nước đường vào trong ống tay áo",
      lines: [tc("Uống miếng nước đường cho ngọt giọng nhé bé Ong!")],
    },
    ask: "Mày giấu con gì trong ống tay áo đấy?",
    misread: {
      shot: "TC vỗ về ống tay áo, lôi ra con ong nhồi bông rồi bất ngờ ôm tay nhảy dựng lên",
      lines: [
        tc("Cháu đang tập nuôi thú cưng trong tay áo cho ấm áp, đi đâu cũng có bạn!"),
        tc("Ui da! Sao ăn no mật rồi lại chích cho chủ nhân sưng vù cả tay thế này?!"),
        cd("Ai đời lại rước con ong vào trong ống tay áo mình bao giờ!"),
      ],
    },
    explain:
      "Câu đầy đủ là 'Nuôi ong tay áo, nuôi cáo trong nhà'. Ý nói mình thương yêu, giúp đỡ người ta hết lòng, mà người ta lại không biết điều, quay ngược lại làm hại mình.",
    example: {
      shot: "Cảnh hai học sinh ngồi cùng bàn",
      lines: [
        cd("Như có đứa bạn lười học, mày tận tình giảng bài, cho mượn đủ thứ đồ dùng. Đến lúc vào lớp nó lại đi đặt điều nói xấu mày với cô giáo!"),
      ],
    },
    punchline: {
      shot: "TC bỏ con ong xuống, cầm con cua đồ chơi nhét vào túi quần",
      lines: [
        tc("Ông nói đúng, nuôi ong bị đốt đau lắm!"),
        tc("Từ mai cháu chuyển sang... nuôi cua trong túi quần cho an toàn ông ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 12,
    week,
    theme,
    idiom: "Con gà tức nhau tiếng gáy",
    meaning: "Thấy người khác có gì là tức khí, ganh đua hơn thua vì những chuyện nhỏ nhặt.",
    question: "Bạn và đứa bạn thân hay 'thi đua' nhau chuyện buồn cười gì nhất?",
    hook: {
      shot: "Đồng hồ chỉ 5:00 sáng, TC cầm loa đồ chơi đứng trên ghế gáy vang nhà",
      lines: [tc("Ò Ó O O O...!")],
    },
    ask: "Mới tờ mờ sáng, làm loạn gì thế?",
    misread: {
      shot: "TC chỉ ra ngoài cửa sổ mặt đầy quyết tâm, hít hơi gáy to hơn tiếng gà hàng xóm",
      lines: [
        tc("Con gà trống nhà bác Tư vừa gáy 3 tiếng trêu ngươi cháu!"),
        tc("Cháu phải gáy trả lễ 10 tiếng thật vang cho nó biết ai mới là giọng ca vàng xóm này!"),
        cd("Nó là con gà thì nó gáy, mày là học sinh đi thi gáy với gà làm cái gì?!"),
      ],
    },
    explain:
      "Hai con gà trống nghe nhau gáy là tức khí, cố gáy to hơn để hơn thua. Ông bà khuyên mình đừng vì tính hiếu thắng, tị nạnh chuyện cỏn con mà ganh đua vô ích.",
    example: {
      shot: "Cảnh hai bạn học sinh khoe hộp bút mới",
      lines: [
        cd("Như ở lớp thấy bạn có hộp bút 2 tầng, mình cũng phải về đòi mẹ mua bằng được hộp bút 3 tầng có đèn nhấp nháy chỉ để đem ra khoe cho bõ tức!"),
      ],
    },
    punchline: {
      shot: "TC khoanh tay gật gù, rồi giơ ngón tay đếm với Cụ Đồ",
      lines: [
        tc("Cháu hiểu rồi, không thèm hơn thua nữa! Nhưng sáng giờ cháu khen ông 2 câu mà ông mới khen cháu 1 câu..."),
        tc("...Ông phải khen bù cho cháu 3 câu đi kẻo cháu tức!"),
      ],
    },
  }),

  makeEpisode({
    day: 13,
    week,
    theme,
    idiom: "Vẽ rắn thêm chân",
    meaning: "Việc đã xong, đã tốt rồi mà lại bày vẽ làm thêm chuyện thừa thãi khiến hỏng cả việc.",
    question: "Bạn từng 'làm màu' thêm chi tiết thừa nào khiến bài kiểm tra hoặc món đồ bị hỏng chưa?",
    hook: {
      shot: "Tay vẽ tua nhanh trên giấy A3, con rắn mọc ra hàng loạt chân kỳ quặc",
      lines: [tc("Thêm 4 cái chân, thêm đôi giày thể thao, thêm cái ván trượt!")],
    },
    ask: "Cô giao vẽ con gì mà trông như quái vật thế?",
    misread: {
      shot: "TC giơ bức tranh con rắn có 8 cái chân đi giày bata, mặt đầy tự hào",
      lines: [
        tc("Cô giáo bảo thi ai vẽ rắn nhanh nhất! Cháu vẽ xong đầu tiên, thấy còn dư thời gian..."),
        tc("...nên cháu vẽ khuyến mãi cho con rắn 8 cái chân để nó chạy đi bắt chuột cho lẹ!"),
        cd("Rắn làm gì có chân! Vẽ thế này cô giáo tưởng mày vẽ con rết đi giày đấy!"),
      ],
    },
    explain:
      "Xưa có người thi vẽ rắn, vẽ xong sớm nhất nhưng lại ngứa tay vẽ thêm chân, thế là bị xử thua! Ý nói việc đã tốt, đã đủ rồi mà cứ bày vẽ làm thêm cái thừa thì lại đâm ra hỏng bét.",
    example: {
      shot: "Cảnh viết bài tập làm văn",
      lines: [
        cd("Như bài văn tả con mèo đã viết gọn gàng đủ ý rồi, lại cố bịa thêm đoạn 'con mèo nhà em biết lái máy bay chiến đấu' cho dài, thế là bị cô trừ điểm!"),
      ],
    },
    punchline: {
      shot: "TC lấy cục tẩy chà mạnh làm rách giấy, rồi cầm bút vẽ đè lên chỗ rách",
      lines: [
        tc("Cháu xóa chân rắn đi rồi! Nhưng tẩy mạnh quá giấy bị thủng một lỗ..."),
        tc("...nên cháu vẽ thêm đôi cánh đại bàng che lỗ thủng ông nhé!"),
      ],
    },
  }),

  makeEpisode({
    day: 14,
    week,
    theme,
    idiom: "Cá không ăn muối cá ươn",
    meaning:
      "Trẻ con không nghe lời khuyên bảo của ông bà, cha mẹ thì dễ mắc lỗi, hư hỏng. Câu đầy đủ: 'Cá không ăn muối cá ươn, con cãi cha mẹ trăm đường con hư'.",
    question: "Lời dặn nào của ông bà, bố mẹ mà bạn nhớ nhất?",
    hook: {
      shot: "TC cầm thìa muối dỗ dành con cá đồ chơi trong chậu",
      lines: [tc("Há miệng ra nào cá ơi, làm một thìa muối cho ngoan nào!")],
    },
    ask: "Mày cho cá ăn muối thật đấy à?",
    misread: {
      shot: "TC làm động tác 'máy bay bay' đút thìa muối cho con cá nhựa",
      lines: [
        tc("Ông bảo cá không ăn muối thì bị ươn còn gì!"),
        tc("Cháu thương con cá vàng quá nên mỗi bữa bắt nó ăn 3 thìa muối hạt cho nó tươi mãi không ươn!"),
        cd("Cá đang bơi mà mày bắt ăn muối mặn chát thế thì nó xỉu trước khi ươn đấy!"),
      ],
    },
    explain:
      "Cá đánh bắt về phải ướp muối mới giữ được lâu, không bị ươn hỏng. Ông bà mượn chuyện con cá để dặn câu sau: 'Con cãi cha mẹ trăm đường con hư' — không nghe lời người lớn dạy bảo thì dễ làm sai!",
    example: {
      shot: "Cảnh trời mưa lạnh, mẹ đưa áo ấm và áo mưa",
      lines: [
        cd("Như trời lạnh mẹ dặn mặc áo ấm, đi học dặn mang áo mưa mà cứ cãi bướng không nghe, đến lúc ướt nhẹp về sụt sịt cảm cúm là tự làm khổ mình!"),
      ],
    },
    punchline: {
      shot: "TC đứng nghiêm chào kiểu đội viên, mặt tỉnh bơ",
      lines: [
        tc("Từ giây phút này cháu xin nghe lời ông răm rắp, không cãi nửa lời!"),
        cd("Ngoan lắm!"),
        tc("Giờ ông ra lệnh cho cháu... đi ăn kem và được nghỉ quét nhà đi ông!"),
      ],
    },
  }),
];
