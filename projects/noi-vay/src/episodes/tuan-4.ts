import { cd, makeEpisode, tc } from "./make.ts";

const week = 4;
const theme = "Cư xử, gia đình";

export const TUAN_4 = [
  makeEpisode({
    day: 22,
    week,
    theme,
    idiom: "Bán anh em xa mua láng giềng gần",
    meaning: "Hàng xóm ở gần giúp được lúc cần hơn họ hàng ở xa.",
    question: "Hàng xóm nhà bạn thế nào?",
    hook: {
      shot: "Ảnh chụp màn hình tin rao \"pass anh họ, còn mới\"",
      lines: [tc("Pass gấp anh họ ở nước ngoài, còn mới.")],
    },
    ask: "Mày rao bán cái gì thế?",
    misread: {
      shot: "TC đăng tin, rồi sang hỏi giá \"mua\" bác hàng xóm",
      lines: [tc("Bác ơi, bác bán mình bao nhiêu ạ?"), tc("Cháu đổi anh họ lấy bác nhé.")],
    },
    explain: "Bán anh em xa mua láng giềng gần là hàng xóm ở gần, lúc cần giúp nhanh hơn họ hàng ở xa.",
    example: {
      shot: "Cảnh mất điện nửa đêm",
      lines: [cd("Nửa đêm mất điện, cô hàng xóm cho mượn đèn pin, còn nhóm chat họ hàng chỉ thả tim.")],
    },
    punchline: {
      shot: "TC mang đĩa hoa quả sang, quay về với một đĩa to hơn",
      lines: [tc("Cháu lãi rồi!")],
    },
  }),

  makeEpisode({
    day: 23,
    week,
    theme,
    idiom: "Gần mực thì đen, gần đèn thì rạng",
    meaning: "Chơi với ai, ở môi trường nào thì dễ bị ảnh hưởng theo đó.",
    question: "Ai là \"cái đèn\" trong đời bạn?",
    hook: {
      shot: "Bật tắt đèn liên tục, mặt TC đổi màu",
      lines: [tc("Đen. Sáng. Đen. Sáng.")],
    },
    ask: "Mặt mày sao lúc đen lúc trắng thế?",
    misread: {
      shot: "TC ngồi cạnh lọ mực thì mặt đen xì, ngồi cạnh đèn thì phát sáng",
      lines: [tc("Ngồi đây thì đen."), tc("Ngồi đây thì rạng. Cháu chọn đèn!")],
    },
    explain: "Gần mực thì đen là chơi với ai, ở đâu thì dễ bị nhiễm theo đó. Nên chọn chỗ tốt mà gần.",
    example: {
      shot: "Cảnh phòng gym và cảnh quán nhậu",
      lines: [cd("Chơi với nhóm hay đi gym thì tự nhiên dậy sớm, chơi với nhóm hay nhậu thì ngược lại.")],
    },
    punchline: {
      shot: "TC ôm cái đèn bàn đi ngủ",
      lines: [tc("Cháu gần đèn cả đêm.")],
    },
  }),

  makeEpisode({
    day: 24,
    week,
    theme,
    idiom: "Tốt gỗ hơn tốt nước sơn",
    meaning: "Phẩm chất bên trong quan trọng hơn vẻ ngoài.",
    question: "Bạn chọn \"gỗ\" hay \"nước sơn\"?",
    hook: {
      shot: "Âm gõ \"cốc cốc\", TC áp tai vào tủ",
      lines: [tc("Suỵt, cháu đang nghe gỗ.")],
    },
    ask: "Mua cái tủ mà làm như bác sĩ thế?",
    misread: {
      shot: "TC gõ thử từng cái tủ, rồi gõ luôn vào đầu người bán hàng",
      lines: [tc("Tủ này rỗng. Tủ này chắc."), tc("Anh bán hàng này... cũng chắc.")],
    },
    explain: "Tốt gỗ hơn tốt nước sơn là bên trong tốt mới quan trọng, bề ngoài đẹp chưa đủ.",
    example: {
      shot: "Cảnh lướt ảnh mạng xã hội",
      lines: [cd("Như người đăng ảnh lung linh, ngoài đời thì hay đến muộn và không giữ lời.")],
    },
    punchline: {
      shot: "TC cầm chiếc điện thoại ốp lưng lấp lánh, giơ búa (đạo cụ)",
      lines: [tc("Để xem bên trong có tốt không.")],
    },
  }),

  makeEpisode({
    day: 25,
    week,
    theme,
    idiom: "Cái nết đánh chết cái đẹp",
    meaning: "Tính nết tốt đáng quý hơn nhan sắc.",
    question: "Nết nào ở người khác khiến bạn mến nhất?",
    hook: {
      shot: "Tiếng chuông võ đài, TC cầm mic như bình luận viên",
      lines: [tc("Trận đấu thế kỷ: Cái Nết gặp Cái Đẹp!")],
    },
    ask: "Ai đánh nhau với ai?",
    misread: {
      shot: "Võ đài: \"Cái Nết\" đấu \"Cái Đẹp\", TC bình luận kiểu bóng đá",
      lines: [tc("Cái Đẹp đang tạo dáng... Cái Nết tung cú đấm!"), tc("Cái Đẹp đo ván rồi!")],
    },
    explain: "Cái nết đánh chết cái đẹp là tính nết tốt quý hơn đẹp. Đẹp mà nết xấu thì cũng chẳng ai thương.",
    example: {
      shot: "Cảnh phòng chờ phỏng vấn",
      lines: [cd("Đi phỏng vấn, người cười chào bảo vệ được nhận, người sành điệu nhưng cáu kỉnh bị loại.")],
    },
    punchline: {
      shot: "TC soi gương",
      lines: [tc("Vậy cháu giữ cả hai."), tc("... Cháu giữ cái nết thôi.")],
    },
  }),

  makeEpisode({
    day: 26,
    week,
    theme,
    idiom: "Con hơn cha là nhà có phúc",
    meaning: "Con cháu giỏi hơn cha mẹ là niềm vui, là phúc của cả nhà.",
    question: "Bạn đã \"hơn\" bố mẹ ở mục nào?",
    hook: {
      shot: "Mâm cỗ bên cạnh bàn cờ, pháo hoa điện tử",
      lines: [tc("Cháu thắng bố rồi! Mở tiệc!")],
    },
    ask: "Tiệc gì to thế?",
    misread: {
      shot: "Cả nhà bày mâm cỗ, TC phát biểu như nhận giải",
      lines: [tc("Con hơn cha là nhà có phúc."), tc("Hôm nay nhà mình có phúc to!")],
    },
    explain: "Con hơn cha là con cái giỏi giang hơn bố mẹ, đó là niềm vui của cả nhà, chứ không phải chuyện thắng thua.",
    example: {
      shot: "Cảnh bố cầm điện thoại, con chỉ",
      lines: [cd("Như bố không biết chuyển khoản, con chỉ một lần là biết, bố đi khoe khắp xóm.")],
    },
    punchline: {
      shot: "CĐ thắng TC ván cờ",
      lines: [tc("Vậy cháu hơn ông là nhà có phúc gấp đôi."), cd("Chiếu tướng!")],
    },
  }),

  makeEpisode({
    day: 27,
    week,
    theme,
    idiom: "Trâu buộc ghét trâu ăn",
    meaning: "Mình gặp cảnh khó thì ghen tị với người được hưởng hơn mình.",
    question: "Lần cuối bạn thấy \"trâu buộc\" là bao giờ?",
    hook: {
      shot: "Chữ \"TRÂU BỊ BUỘC\" đóng trên đầu TC đang ngồi góc phòng",
      lines: [tc("Sao nó được uống trà sữa?")],
    },
    ask: "Ngồi góc nhà làm gì đấy?",
    misread: {
      shot: "TC bị phạt ngồi góc, nhìn bạn ăn trà sữa, lần lượt thả \"phẫn nộ\" vào ảnh của bạn",
      lines: [tc("Phẫn nộ. Phẫn nộ. Phẫn nộ."), tc("Cháu là trâu bị buộc mà.")],
    },
    explain: "Trâu buộc ghét trâu ăn là mình bị kẹt thì đâm ra ghét người đang sung sướng hơn mình.",
    example: {
      shot: "Cảnh văn phòng, đồng nghiệp nhận thông báo tăng lương",
      lines: [cd("Như đồng nghiệp được tăng lương, mình đi nói \"chắc nhờ quan hệ\".")],
    },
    punchline: {
      shot: "TC gõ comment \"chúc mừng\" nhưng nghiến răng",
      lines: [tc("Vậy cháu chúc mừng bạn..."), tc("CHÚC. MỪNG.")],
    },
  }),

  makeEpisode({
    day: 28,
    week,
    theme,
    idiom: "Lời nói chẳng mất tiền mua",
    meaning:
      "Nói năng nhẹ nhàng, chọn lời dễ nghe thì ai cũng vui. Câu sau: \"Lựa lời mà nói cho vừa lòng nhau\".",
    question: "Câu khen nào bạn nhớ nhất?",
    hook: {
      shot: "Quầy rau ngoài chợ",
      lines: [tc("Cô ơi, cháu trả bằng 3 câu khen nhé.")],
    },
    ask: "Mày trả tiền kiểu gì thế?",
    misread: {
      shot: "TC trả tiền bằng lời khen, người bán thối lại \"cảm ơn\" thay tiền lẻ",
      lines: [tc("Cô xinh. Rau tươi. Chợ đẹp."), tc("Cô thối cháu hai câu cảm ơn ạ.")],
    },
    explain: "Lời nói chẳng mất tiền mua là nói khéo chẳng tốn gì, nên lựa lời mà nói cho vừa lòng nhau.",
    example: {
      shot: "Cảnh góp ý bài cho đồng nghiệp, so sánh hai cách nói",
      lines: [cd("\"Cái này dở\" và \"Chỗ này sửa thêm thì hay hơn\". Cùng một ý, khác hẳn cảm giác.")],
    },
    punchline: {
      shot: "TC khen CĐ, CĐ đứng hình",
      lines: [tc("Ông trẻ như mới 80!"), cd("Ông năm nay 75.")],
    },
  }),

  makeEpisode({
    day: 29,
    week,
    theme,
    idiom: "Thùng rỗng kêu to",
    meaning: "Người ít hiểu biết hay khoe khoang, nói to nhất.",
    question: "Tag một \"thùng rỗng\" bạn biết (đùa thôi nhé)",
    hook: {
      shot: "Tiếng \"BOONG\" vang to",
      lines: [tc("Nghe chưa? To chưa?")],
    },
    ask: "Gõ cái thùng làm gì?",
    misread: {
      shot: "TC gõ thùng rỗng nghe \"BOONG\", gõ thùng đầy nghe \"bịch\", rồi quay sang \"gõ\" một anh đang khoe",
      lines: [tc("Thùng rỗng: BOONG. Thùng đầy: bịch."), tc("Anh này... BOONG.")],
    },
    explain: "Thùng rỗng kêu to là người biết ít lại hay nói to, khoe nhiều. Người hiểu nhiều thường ít khoe.",
    example: {
      shot: "Cảnh bàn tiệc, một anh cầm mic",
      lines: [cd("Anh bạn cầm mic bàn về công nghệ, người làm kỹ sư thật thì ngồi im lặng.")],
    },
    punchline: {
      shot: "TC im lặng suốt bữa ăn để chứng minh mình \"đầy\"",
      lines: [cd("Nói gì đi chứ!"), tc("BOONG!")],
    },
  }),

  makeEpisode({
    day: 30,
    week,
    theme: "Tổng kết",
    idiom: "Uống nước nhớ nguồn",
    meaning: "Biết ơn nguồn cội, ông bà tổ tiên và những người đi trước.",
    question: "Comment câu bạn muốn xem ở mùa 2!",
    hook: {
      shot: "TC cầm chai nước, đeo balo leo núi",
      lines: [tc("Cháu đi tìm nguồn của chai nước này.")],
    },
    ask: "Lại đi tìm gì nữa đấy?",
    misread: {
      shot: "TC leo lên núi tìm suối, cầm chai đối chiếu với từng dòng nước",
      lines: [tc("Suối này không phải."), tc("Suối này... cũng không phải.")],
    },
    explain: "Uống nước nhớ nguồn là có được hôm nay thì phải nhớ ơn những người đã làm nên nó.",
    example: {
      shot: "Montage 5 giây cảnh hay nhất của 29 tập trước",
      lines: [cd("Như tụi tôi có 30 ngày này là nhờ các bạn đã xem.")],
    },
    punchline: {
      shot: "CĐ và TC cúi đầu chào",
      lines: [cd("Cảm ơn các bạn đã xem 30 ngày."), tc("Hẹn gặp ở mùa 2!")],
    },
  }),
];
