import { cd, makeEpisode, tc } from "./make.ts";

const week = 1;
const theme = "Ăn uống";

export const TUAN_1 = [
  makeEpisode({
    day: 1,
    week,
    theme,
    idiom: "Ăn quả nhớ kẻ trồng cây",
    meaning: "Hưởng thành quả thì phải biết ơn người đã tạo ra nó.",
    question: "Bạn muốn nhớ ơn ai nhất?",
    hook: {
      shot: "TC cầm quả xoài và bản đồ, đeo balo",
      lines: [tc("Cháu đang đi tìm ông trồng cây xoài này từ năm 1990.")],
    },
    ask: "Đi đâu đấy?",
    misread: {
      shot: "TC gõ cửa từng nhà, đưa giấy \"biên bản tri ân\" có chữ ký",
      lines: [
        tc("Cho cháu hỏi, năm 1990 bác có trồng xoài không?"),
        tc("Cháu ăn 3 quả, nhớ bác 3 lần, bác ký vào đây ạ."),
      ],
    },
    explain: "Được hưởng cái gì thì nhớ ơn người làm ra cái đó.",
    example: {
      shot: "Cảnh công sở",
      lines: [
        cd("Như mày được thăng chức nhờ chị trưởng phòng cũ kèm cặp, thì Tết phải nhớ gọi điện hỏi thăm chị ấy."),
      ],
    },
    punchline: {
      shot: "TC bấm điện thoại, CĐ ôm trán",
      lines: [tc("Vâng, cháu gọi cho Grab ngay, nhờ anh ấy chở cháu về được.")],
    },
  }),

  makeEpisode({
    day: 2,
    week,
    theme,
    idiom: "Ăn trông nồi ngồi trông hướng",
    meaning:
      "Ăn uống, cư xử phải biết ý tứ: xem nồi còn bao nhiêu để chừa phần người khác, ngồi đúng chỗ của mình.",
    question: "Ai từng gặp đồng nghiệp kiểu này?",
    hook: {
      shot: "Bàn ăn, TC cầm la bàn xoay ghế liên tục",
      lines: [tc("Hướng Đông Nam, chuẩn rồi.")],
    },
    ask: "Chưa ăn đã làm gì thế?",
    misread: {
      shot: "TC nhìn nồi cơm không chớp mắt, zoom cận mắt, nhạc căng thẳng",
      lines: [tc("Nồi ơi, ta đang trông ngươi."), tc("Ai định lấy cơm thì phải qua cháu.")],
    },
    explain:
      "Trông nồi là xem còn bao nhiêu mà chừa phần người khác. Ngồi trông hướng là ngồi cho đúng chỗ.",
    example: {
      shot: "Cảnh ăn lẩu cùng công ty",
      lines: [
        cd("Đi ăn với sếp mà gắp hết bò Mỹ là không trông nồi. Ngồi ghế chủ tọa là không trông hướng."),
      ],
    },
    punchline: {
      shot: "TC gắp miếng bò cuối cùng, rồi lúng túng đặt lại",
      lines: [tc("Cháu trông thấy rồi, nồi hết sạch.")],
    },
  }),

  makeEpisode({
    day: 3,
    week,
    theme,
    idiom: "Ăn cháo đá bát",
    meaning: "Vô ơn, quay lưng hoặc hại lại người đã giúp mình.",
    question: "Tag đứa bạn từng \"chấm 1 điểm\" bạn!",
    hook: {
      shot: "Tiếng \"xoảng\", màn hình rung, cái bát nhựa bay ra khỏi khung hình",
      lines: [],
    },
    ask: "Trời ơi, làm gì đấy?",
    misread: {
      shot: "TC luyện đá bát như cầu thủ sút phạt, tua chậm, giọng bình luận viên",
      lines: [tc("Cháo này ngon, cháu phải đá mạnh để cảm ơn."), tc("VÀÀÀO!")],
    },
    explain:
      "Ăn cháo đá bát là người ta giúp mình, mình lại quay ra hại người ta. Là vô ơn đấy.",
    flipShot: "Cụ Đồ đưa chổi ra cản",
    example: {
      shot: "Cảnh nhóm bài tập",
      lines: [cd("Như đứa được bạn cho chép bài, đến lúc đánh giá nhóm lại chấm bạn 1 điểm.")],
    },
    punchline: {
      shot: "TC bưng bát cháo mới, nhìn nó",
      lines: [tc("Vậy cháu ăn cháo xong ôm bát ngủ cùng cho nó khỏi buồn.")],
    },
  }),

  makeEpisode({
    day: 4,
    week,
    theme,
    idiom: "Ăn cây nào rào cây nấy",
    meaning:
      "Hưởng lợi ở đâu thì gắn bó, bảo vệ nơi đó. Có khi để khen sự trung thành, có khi để chê kẻ chỉ bênh phe mình.",
    question: "Theo bạn câu này là khen hay chê?",
    hook: {
      shot: "TC vác cuộn lưới B40 vào khung hình",
      lines: [tc("Tránh ra, việc gấp!")],
    },
    ask: "Lưới để làm gì?",
    misread: {
      shot: "TC rào cây ổi, rồi rào luôn cây rau muống, rồi rào luôn cái tủ lạnh",
      lines: [
        tc("Cháu ăn ổi, rào ổi. Ăn rau, rào rau."),
        tc("Hôm qua cháu ăn đồ trong tủ lạnh..."),
      ],
    },
    explain:
      "Ăn lương chỗ nào thì gắn bó, bảo vệ chỗ đó. Đừng ăn của người ta rồi đi nói xấu người ta.",
    example: {
      shot: "Cảnh nhân viên văn phòng",
      lines: [cd("Đang làm công ty A mà lên mạng khen công ty đối thủ rầm rộ là không ổn.")],
    },
    punchline: {
      shot: "TC dán ảnh sếp lên tường, dựng lưới B40 quanh ảnh",
      lines: [tc("Cháu rào sếp lại luôn.")],
    },
  }),

  makeEpisode({
    day: 5,
    week,
    theme,
    idiom: "Ăn xổi ở thì",
    meaning: "Sống tạm bợ, chỉ tính lợi trước mắt, không lo chuyện lâu dài.",
    question: "Bạn từng bị quán nào \"chém\" chưa?",
    hook: {
      shot: "TC kéo vali đầy đồ, tay cầm lọ dưa",
      lines: [tc("Năm nay cháu chuyển nhà 47 lần rồi.")],
    },
    ask: "Sao thế?",
    misread: {
      shot: "TC chỉ ăn dưa muối xổi, xem ứng dụng thời tiết rồi đổi nhà theo mùa",
      lines: [tc("Trời nắng ở nhà này, trời mưa dọn sang nhà kia."), tc("Cháu ở theo thì mà.")],
    },
    explain: "Ăn xổi ở thì là làm gì cũng chỉ tính bây giờ, không nghĩ cho sau này.",
    flipShot: "Cụ Đồ ngồi phịch xuống vali",
    example: {
      shot: "Cảnh cửa hàng",
      lines: [
        cd("Như quán bán đắt, phục vụ cục, chém khách du lịch một lần. Lời ngay hôm nay, mai là vắng khách."),
      ],
    },
    punchline: {
      shot: "TC mở lọ dưa mới",
      lines: [
        tc("Vậy cháu muối dưa ba tháng cho nó lâu dài."),
        cd("Đúng rồi!"),
        tc("... nên ăn luôn lọ này cho đỡ phí."),
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    idiom: "Ăn vóc học hay",
    meaning: "Ăn uống đầy đủ thì khỏe, chăm học thì giỏi. Không thứ nào thay được thứ nào.",
    question: "Món ăn bạn nhớ nhất mùa thi?",
    hook: {
      shot: "Cân điện tử hiện +5kg, bảng điểm ghi 3 điểm",
      lines: [tc("Sao lại thế này?")],
    },
    ask: "Tháng này mày làm gì?",
    misread: {
      shot: "Phối cảnh nhanh: TC ăn phở, trà sữa, bánh mì, mở sách nhưng ngủ gục",
      lines: [tc("Mỗi bát phở là một điểm."), tc("Cháu ăn 10 bát, phải được 10 điểm chứ.")],
    },
    explain: "Ăn thì cho người khỏe, học thì cho đầu giỏi. Ăn không thay được học đâu.",
    example: {
      shot: "Cảnh ôn thi",
      lines: [cd("Mùa thi thì ăn uống đủ bữa để có sức, rồi còn phải ngồi vào bàn mà học.")],
    },
    punchline: {
      shot: "TC bê chồng sách vào bếp, quyển sách dính đầy nước phở",
      lines: [tc("Hiểu rồi, cháu vừa ăn vừa học.")],
    },
  }),

  makeEpisode({
    day: 7,
    week,
    theme,
    idiom: "Ăn có nhai, nói có nghĩ",
    meaning: "Làm gì cũng phải cẩn thận. Ăn thì nhai kỹ, nói thì nghĩ trước để không làm người khác buồn.",
    question: "Hết tuần 1! Câu nào bạn thích nhất?",
    hook: {
      shot: "Đồng hồ bấm giờ, chữ \"NHAI LẦN 87\", TC nhai mặt nghiêm trọng",
      lines: [],
    },
    ask: "Xong chưa?",
    misread: {
      shot: "TC nói chậm như video tua 0.25x, CĐ ngủ gật, lịch trên tường lật sang ngày khác",
      lines: [tc("Cháu... đang... nghĩ... trước... khi... nói...")],
    },
    explain:
      "Nghĩ trước khi nói là để đừng nói câu làm người ta tổn thương, chứ không phải nói chậm.",
    flipShot: "Cụ Đồ giật mình dậy",
    example: {
      shot: "Cảnh bình luận trên mạng",
      lines: [cd("Trước khi gõ comment chê người ta béo hay xấu, đếm đến 3 đã.")],
    },
    punchline: {
      shot: "TC cầm điện thoại đếm rồi bấm gửi, CĐ nhìn màn hình",
      lines: [tc("1... 2... 3..."), cd("Mày vừa chê ông à?")],
    },
  }),
];
