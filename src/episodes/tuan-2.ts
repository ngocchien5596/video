import { cd, makeEpisode, tc } from "./make.ts";

const week = 2;
const theme = "Con vật";

export const TUAN_2 = [
  makeEpisode({
    day: 8,
    week,
    theme,
    idiom: "Ếch ngồi đáy giếng",
    meaning: "Hiểu biết hạn hẹp mà tưởng mình biết hết.",
    question: "Bạn từng gặp \"con ếch\" nào?",
    hook: {
      shot: "TC cầm mic phỏng vấn, chĩa vào xô nước",
      lines: [tc("Xin chào, đây là bản tin từ đáy giếng.")],
    },
    ask: "Mày nói chuyện với cái xô à?",
    misread: {
      shot: "TC phỏng vấn con ếch đồ chơi trong xô nước, tự lồng tiếng cho ếch",
      lines: [
        tc("Thưa anh Ếch, bầu trời to cỡ nào ạ?"),
        tc("(giọng ếch) To bằng miệng xô. Tôi biết hết rồi."),
      ],
    },
    explain: "Ếch ngồi đáy giếng là biết có một tí mà tưởng mình biết cả thế giới.",
    example: {
      shot: "Cảnh văn phòng, anh đồng nghiệp đứng giảng",
      lines: [cd("Như anh đồng nghiệp xem đúng một video TikTok rồi đi dạy cả phòng cách đầu tư.")],
    },
    punchline: {
      shot: "TC chui vào chăn xem điện thoại",
      lines: [tc("Vậy cháu ra khỏi giếng!"), tc("Ra chăn là được rồi.")],
    },
  }),

  makeEpisode({
    day: 9,
    week,
    theme,
    idiom: "Đàn gảy tai trâu",
    meaning: "Nói hay đến mấy mà người nghe không hiểu hoặc không muốn nghe thì cũng phí công.",
    question: "Bạn từng là \"người gảy đàn\" hay \"con trâu\"?",
    hook: {
      shot: "Tiếng đàn nhã nhạc, chèn tiếng \"òò\" của trâu",
      lines: [tc("Trâu ơi, nghe bài này đi.")],
    },
    ask: "Mày mở nhạc cho ai thế?",
    misread: {
      shot: "TC mở nhạc giao hưởng cho ảnh con trâu, đổi sang rap, bolero, trâu vẫn nhai cỏ",
      lines: [tc("Giao hưởng không thích à? Rap nhé?"), tc("Bolero luôn! Sao vẫn nhai cỏ thế?")],
    },
    explain: "Đàn gảy tai trâu là nói cho người không hiểu, hoặc không chịu nghe. Nói mấy cũng phí.",
    example: {
      shot: "Cảnh văn phòng, cạnh máy in",
      lines: [cd("Như giải thích cách dùng máy in cho sếp lần thứ 7.")],
    },
    punchline: {
      shot: "CĐ giảng xong quay lại, TC đang đeo tai nghe",
      lines: [cd("Đàn gảy tai... cháu.")],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    idiom: "Mèo mù vớ cá rán",
    meaning: "Gặp may bất ngờ, không phải nhờ tài năng.",
    question: "Pha \"mèo mù vớ cá rán\" may nhất đời bạn?",
    hook: {
      shot: "TC đeo kính râm đen kịt, hai tay dò dẫm trong bếp",
      lines: [tc("Cá rán ơi, mày ở đâu?")],
    },
    ask: "Mắt mũi làm sao thế?",
    misread: {
      shot: "TC bịt mắt vớ nhầm cái dép, cái lược, rồi vớ trúng đĩa cá của CĐ",
      lines: [tc("Cái này... dép."), tc("Cái này... lược."), tc("A! Cá rán! Cháu giỏi quá!")],
    },
    explain: "Mèo mù vớ cá rán là tự nhiên gặp may, chứ chẳng phải giỏi giang gì.",
    example: {
      shot: "Cảnh phòng thi",
      lines: [cd("Như khoanh bừa trắc nghiệm mà đậu, rồi đi khoe là do học giỏi.")],
    },
    punchline: {
      shot: "TC cầm bút, bịt mắt",
      lines: [tc("Vậy cháu bịt mắt đi thi luôn.")],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    idiom: "Nuôi ong tay áo",
    meaning: "Chăm lo, giúp đỡ kẻ mà sau này quay lại hại mình.",
    question: "Đừng nêu tên, kể lại chuyện thôi!",
    hook: {
      shot: "TC giơ tay áo, bên trong là con ong nhồi bông",
      lines: [tc("Giới thiệu bé Ong, sống trong tay áo cháu.")],
    },
    ask: "Mày nuôi cái gì trong đấy?",
    misread: {
      shot: "TC cho ong ăn, kể chuyện, hát ru. Cuối cùng âm \"đốt!\" vang lên",
      lines: [tc("Bé Ong ăn mật nhé, ngủ ngoan nhé."), tc("Ui da! Sao lại đốt cháu?")],
    },
    explain: "Nuôi ong tay áo là mình hết lòng lo cho người ta, rồi chính người đó quay lại hại mình.",
    example: {
      shot: "Cảnh văn phòng, phòng họp",
      lines: [cd("Như chỉ bài cho đồng nghiệp mới, rồi người đó đem ý tưởng của mình đi báo cáo sếp.")],
    },
    punchline: {
      shot: "TC bê ra một con gấu bông",
      lines: [tc("Vậy cháu nuôi gấu.")],
    },
  }),

  makeEpisode({
    day: 12,
    week,
    theme,
    idiom: "Con gà tức nhau tiếng gáy",
    meaning: "Ganh đua, sĩ diện với nhau vì những chuyện nhỏ nhặt.",
    question: "Nhà bạn có công trình karaoke nào không?",
    hook: {
      shot: "Đồng hồ 5:00, tiếng gáy giật mình",
      lines: [tc("Ò Ó O!")],
    },
    ask: "Mới 5 giờ sáng, gì thế?",
    misread: {
      shot: "TC và CĐ thi gáy, ngày càng to, hàng xóm ném dép qua cửa sổ",
      lines: [tc("Ông gáy to thế? Cháu gáy to hơn!"), cd("Ò Ó O!"), tc("Ò Ó Oooo!")],
    },
    explain: "Con gà tức nhau tiếng gáy là ganh nhau, sĩ diện với nhau vì mấy chuyện cỏn con.",
    example: {
      shot: "Cảnh hai nhà hàng xóm, hai dàn loa",
      lines: [cd("Như hai nhà hàng xóm thi nhau mở karaoke to hơn.")],
    },
    punchline: {
      shot: "TC gáy nhỏ, CĐ gáy to hơn theo bản năng",
      lines: [tc("Ò ó o."), cd("Ò Ó O!")],
    },
  }),

  makeEpisode({
    day: 13,
    week,
    theme,
    idiom: "Vẽ rắn thêm chân",
    meaning: "Làm thêm việc thừa, thành ra hỏng việc.",
    question: "Bạn từng \"vẽ rắn thêm chân\" vụ gì?",
    hook: {
      shot: "Tay vẽ tua nhanh, con rắn ngày càng kỳ quặc",
      lines: [tc("Thêm chân cho đẹp!")],
    },
    ask: "Mày vẽ con gì thế?",
    misread: {
      shot: "TC vẽ con rắn, thêm chân, giày, rồi xe máy, cuối cùng thành con khủng long",
      lines: [tc("Thêm chân. Thêm giày. Thêm xe máy."), tc("Xong! Con rắn đẹp nhất thế giới.")],
    },
    explain: "Vẽ rắn thêm chân là việc đã xong rồi còn làm thêm cái thừa, thành ra hỏng.",
    example: {
      shot: "Cảnh trình chiếu slide",
      lines: [cd("Như slide báo cáo đã ổn, còn thêm 12 hiệu ứng chuyển cảnh, sếp không đọc được chữ.")],
    },
    punchline: {
      shot: "TC tẩy chân rắn, tờ giấy rách",
      lines: [tc("Hiểu rồi, cháu xóa chân đi.")],
    },
  }),

  makeEpisode({
    day: 14,
    week,
    theme,
    idiom: "Cá không ăn muối cá ươn",
    meaning:
      "Con không nghe lời khuyên của cha mẹ, người lớn thì dễ hư. Câu đầy đủ: \"Cá không ăn muối cá ươn, con cãi cha mẹ trăm đường con hư\".",
    question: "Lời dặn nào của bố mẹ bạn thấm nhất?",
    hook: {
      shot: "TC cầm thìa muối, dí vào miệng con cá đồ chơi",
      lines: [tc("Cá ơi, ăn muối đi, cá ơi.")],
    },
    ask: "Mày làm cái trò gì thế?",
    misread: {
      shot: "TC dỗ con cá ăn muối như dỗ con nít ăn cơm, bay máy bay, hát dỗ",
      lines: [tc("Một thìa vì ông, một thìa vì bà."), tc("Không ăn là ươn đấy nhé!")],
    },
    explain:
      "Câu đầy đủ là: con cãi cha mẹ trăm đường con hư. Không chịu nghe lời khuyên thì dễ hỏng.",
    example: {
      shot: "Cảnh trời mưa, trước cửa văn phòng",
      lines: [cd("Như mẹ dặn mang áo mưa, không nghe, ướt nhẹp ngay trước buổi phỏng vấn.")],
    },
    punchline: {
      shot: "TC chắp tay ngoan ngoãn",
      lines: [tc("Vậy từ nay cháu nghe lời ông hết!"), cd("Tốt!"), tc("Ông cho cháu tiền đi.")],
    },
  }),
];
