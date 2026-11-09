import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Học hành, tiền bạc";

export const TUAN_3 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    idiom: "Nước đến chân mới nhảy",
    meaning: "Việc đến sát nút mới lo, chần chừ trước đó.",
    question: "Deadline sát nút nhất của bạn?",
    hook: {
      shot: "Màn hình chia đôi: nước dâng, TC vẫn nằm lướt điện thoại",
      lines: [tc("Còn sớm mà, từ từ.")],
    },
    ask: "Nước lênh láng rồi kìa!",
    misread: {
      shot: "Nước tràn dần trên sàn, chạm chân thì TC bật dậy nhảy dây",
      lines: [tc("Chưa tới, chưa tới..."), tc("Tới rồi! Nhảy! Nhảy!")],
    },
    explain: "Nước đến chân mới nhảy là cứ để việc sát nút mới cuống lên lo.",
    example: {
      shot: "Cảnh 23:58, màn hình nộp bài, biểu tượng mất wifi",
      lines: [cd("Như 23 giờ 58 mới nộp bài hạn 23 giờ 59, đúng lúc wifi mất.")],
    },
    punchline: {
      shot: "Chữ \"MAI\" nhân lên 7 lần theo đồng hồ quay nhanh",
      lines: [tc("Từ mai cháu làm sớm."), tc("Mai. Mai. Mai...")],
    },
  }),

  makeEpisode({
    day: 16,
    week,
    theme,
    idiom: "Có công mài sắt có ngày nên kim",
    meaning: "Kiên trì lâu dài thì việc khó mấy cũng làm được.",
    question: "Chuỗi ngày dài nhất của bạn là bao nhiêu?",
    hook: {
      shot: "Chữ \"NGÀY 214 MÀI SẮT\", TC mài thanh sắt",
      lines: [tc("Sắp thành kim rồi.")],
    },
    ask: "Mày mài cái gì cả năm nay thế?",
    misread: {
      shot: "Tua nhanh TC mài sắt qua các mùa, cuối cùng chạy ra tiệm tạp hóa",
      lines: [tc("Mài mãi vẫn là thanh sắt."), tc("Thôi, mua hộp kim 10 nghìn cho nhanh.")],
    },
    explain: "Có công mài sắt là chịu khó kiên trì, việc khó mấy rồi cũng xong.",
    example: {
      shot: "Cảnh gặp khách nước ngoài",
      lines: [cd("Như học tiếng Anh mỗi ngày 15 phút, một năm sau nói chuyện được với khách.")],
    },
    punchline: {
      shot: "TC mở ứng dụng học tiếng Anh: chuỗi 1 ngày, mở lại đã về 0",
      lines: [tc("Chuỗi 1 ngày rồi!"), tc("Ơ... về 0 rồi.")],
    },
  }),

  makeEpisode({
    day: 17,
    week,
    theme,
    idiom: "Một cây làm chẳng nên non",
    meaning:
      "Một mình không làm nên việc lớn, phải đoàn kết. Câu sau: \"Ba cây chụm lại nên hòn núi cao\".",
    question: "Tag đồng đội \"gánh team\" của bạn!",
    hook: {
      shot: "Chậu cây bé xíu cạnh ảnh núi Fansipan",
      lines: [tc("Lớn lên thành núi nhé.")],
    },
    ask: "Mày chờ cái chậu cây làm gì?",
    misread: {
      shot: "TC ngồi đợi chậu cây thành núi, đo chiều cao mỗi ngày",
      lines: [tc("Một tuần rồi vẫn chưa thành núi."), tc("Hay cháu tưới thêm nước?")],
    },
    explain:
      "Một cây làm chẳng nên non là một mình thì không làm nổi việc lớn. Ba cây chụm lại mới nên hòn núi cao.",
    example: {
      shot: "Cảnh nhóm 5 người, một người làm",
      lines: [cd("Như bài tập nhóm 5 người, một người làm, bốn người \"đã xem\".")],
    },
    punchline: {
      shot: "TC gom 3 chậu cây chụm lại, đứng chờ",
      lines: [tc("Bao giờ thành núi ạ?")],
    },
  }),

  makeEpisode({
    day: 18,
    week,
    theme,
    idiom: "Tiền nào của nấy",
    meaning: "Giá bao nhiêu thì chất lượng bấy nhiêu.",
    question: "Pha \"nhận hàng\" tệ nhất của bạn?",
    hook: {
      shot: "Tiếng \"bốp\", chiếc đế giày bay ra khỏi khung hình",
      lines: [tc("Đôi giày 50 nghìn của cháu!")],
    },
    ask: "Giày gì mà bay đế thế?",
    misread: {
      shot: "TC đi 3 bước đế bay, mua ô 30 nghìn, gió thổi lộn ngược",
      lines: [tc("Giày 50 nghìn: 3 bước."), tc("Ô 30 nghìn: 1 cơn gió.")],
    },
    explain: "Tiền nào của nấy là mua rẻ thì chất lượng cũng rẻ, đừng đòi đồ tốt.",
    example: {
      shot: "Cảnh mở hộp hàng online",
      lines: [cd("Như đặt áo \"giống hình 100%\" trên mạng, nhận về cái áo cho búp bê.")],
    },
    punchline: {
      shot: "TC mua cốc trà sữa 90 nghìn, vẫn làm đổ",
      lines: [tc("Vậy cháu mua đồ đắt cho chắc!"), tc("Ơ... đổ rồi.")],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    idiom: "Năng nhặt chặt bị",
    meaning: "Chăm tích góp từng chút thì sẽ thành nhiều.",
    question: "Bạn đang tiết kiệm cho món gì?",
    hook: {
      shot: "TC kéo bao tải to hơn người vào khung hình",
      lines: [tc("Sắp chặt bị rồi!")],
    },
    ask: "Bao gì to thế?",
    misread: {
      shot: "TC nhặt nắp chai, kẹp giấy, dây thun, nhét đầy bao tải",
      lines: [tc("Một cái nắp chai. Một cái kẹp giấy."), tc("Năng nhặt là chặt bị mà ông.")],
    },
    explain: "Năng nhặt chặt bị là chăm góp từng chút một thì lâu dần thành nhiều.",
    example: {
      shot: "Cảnh quán trà sữa, heo đất",
      lines: [cd("Mỗi ngày bớt một cốc trà sữa 30 nghìn, một năm có hơn 10 triệu.")],
    },
    punchline: {
      shot: "Ngày 30, TC đập heo đất",
      lines: [tc("Đủ tiền rồi! Cháu đi mua... trà sữa.")],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    idiom: "Đi một ngày đàng học một sàng khôn",
    meaning: "Đi nhiều, trải nghiệm nhiều thì học được nhiều điều.",
    question: "Chuyến đi dạy bạn nhiều nhất?",
    hook: {
      shot: "TC cầm cái sàng gạo, đồng hồ đếm bước chạy",
      lines: [tc("Cháu đi 30 nghìn bước rồi, sàng vẫn trống.")],
    },
    ask: "Cầm sàng đi đâu đấy?",
    misread: {
      shot: "TC đi bộ cả ngày, ngửa sàng lên trời đợi \"khôn\" rơi vào",
      lines: [tc("Khôn ơi, rơi vào đây."), tc("Chưa có hạt khôn nào cả.")],
    },
    explain: "Đi một ngày đàng là đi đây đi đó, gặp nhiều chuyện thì tự khắc khôn ra.",
    example: {
      shot: "Cảnh đi phượt, sửa xe bên đường",
      lines: [cd("Đi phượt lần đầu mới biết tự sửa xe, hỏi đường, tiêu tiền.")],
    },
    punchline: {
      shot: "TC chụp 500 tấm sống ảo, gãi đầu",
      lines: [tc("Cháu đi du lịch rồi!"), cd("Đi đâu?"), tc("... Cháu không nhớ.")],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    idiom: "Học thầy không tày học bạn",
    meaning: "Học từ bạn bè xung quanh cũng quan trọng, có khi hiệu quả hơn học thầy.",
    question: "Điều hay nhất bạn học từ bạn bè?",
    hook: {
      shot: "Hai đứa cầm tay cầm chơi game, chú thích \"buổi học thứ 15\"",
      lines: [tc("Hôm nay học combo mới.")],
    },
    ask: "Sao không đi học thêm?",
    misread: {
      shot: "TC bỏ lớp học thêm, ghi chép chăm chú lúc bạn chơi game",
      lines: [tc("Thầy dạy chán lắm."), tc("Học bạn mới tiến bộ, cháu lên rank rồi!")],
    },
    explain: "Học thầy không tày học bạn là bạn bè giỏi cũng dạy mình được nhiều, nhưng phải chọn bạn mà học.",
    example: {
      shot: "Cảnh văn phòng, hai người cùng nhìn bảng tính",
      lines: [cd("Nhờ bạn cùng phòng chỉ mẹo Excel 5 phút, hiểu hơn học cả buổi.")],
    },
    punchline: {
      shot: "TC chỉ vào CĐ",
      lines: [cd("Chọn bạn mà học!"), tc("Cháu chọn ông, ông làm bạn cháu nhé.")],
    },
  }),
];
