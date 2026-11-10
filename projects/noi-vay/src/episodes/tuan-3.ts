import { cd, makeEpisode, tc } from "./make.ts";

const week = 3;
const theme = "Học hành, tiền bạc";

export const TUAN_3 = [
  makeEpisode({
    day: 15,
    week,
    theme,
    idiom: "Nước đến chân mới nhảy",
    meaning: "Thói quen chần chừ, để mọi việc đến sát giờ cuối cùng mới cuống cuồng lo làm.",
    question: "Bạn từng đợi đến tối Chủ nhật mới nhớ ra bài tập vẽ hoặc thủ công chưa?",
    hook: {
      shot: "TC mặc quần xắn cao, cầm chậu nước đổ từng cốc xuống sàn cạnh bàn chân mình",
      lines: [tc("Sắp chạm ngón chân cái rồi, chuẩn bị bật nhảy nhé!")],
    },
    ask: "Mày đổ nước ra nhà làm cái trò gì thế?",
    misread: {
      shot: "Nước vừa chạm đầu ngón chân, TC lập tức nhảy lò cò tưng bừng khắp phòng",
      lines: [
        tc("Cháu đang luyện phản xạ 'nước đến chân mới nhảy' đấy ông ạ!"),
        tc("Nước chưa chạm chân là tuyệt đối đứng im, vừa chạm một cái là nhảy cao hai mét!"),
        cd("Mày làm ướt nhẹp cả sàn nhà thế này thì mẹ mày về nhảy dựng lên trước đấy!"),
      ],
    },
    explain:
      "Ngày xưa nước lũ dâng lên tận chân mới vội vàng nhảy chạy là quá muộn! Câu này chê thói quen lề mề, có việc cứ để đó chơi đã, đợi đến phút chót mới cuống cuồng làm.",
    example: {
      shot: "Cảnh 10 giờ tối Chủ nhật, học sinh mếu máo tìm giấy màu thủ công",
      lines: [
        cd("Như cô giáo dặn chuẩn bị giấy màu, hồ dán từ thứ Hai, cả tuần cứ bảo 'từ từ', đến 10 giờ đêm Chủ nhật mới khóc thét vì tiệm tạp hóa đóng cửa hết rồi!"),
      ],
    },
    punchline: {
      shot: "TC ngồi ngay ngắn vào bàn học, nhưng trước mặt là tấm lịch ghi 'Lịch bắt đầu chăm học: Ngày mai'",
      lines: [
        tc("Cháu chừa rồi! Từ giờ cháu sẽ làm bài tập từ sớm, không đợi nước đến chân nữa!"),
        cd("Thế làm bài hôm nay luôn đi!"),
        tc("Dạ... kế hoạch làm sớm của cháu bắt đầu từ... ngày mai ông ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 16,
    week,
    theme,
    idiom: "Có công mài sắt có ngày nên kim",
    meaning: "Kiên trì, nhẫn nại cố gắng mỗi ngày thì việc khó đến mấy cuối cùng cũng thành công.",
    question: "Môn học hay kỹ năng nào bạn đã kiên trì tập luyện lâu nhất?",
    hook: {
      shot: "Chữ 'NGÀY THỨ 100', TC cầm cục đá mài cật lực một cái thìa inox",
      lines: [tc("Cố lên, mài thêm 3 năm nữa là thành cây kim khâu áo cho bà rồi!")],
    },
    ask: "Mày lấy thìa ăn cơm của ông ra mài cái gì đấy?",
    misread: {
      shot: "TC mài cái thìa toát mồ hôi hột, rồi bất lực nhìn cái thìa vẫn to đùng",
      lines: [
        tc("Trong sách kể bà cụ mài thỏi sắt thành kim! Nhà mình không có thỏi sắt nên cháu lấy tạm cái thìa của ông!"),
        tc("Mà sao cháu mài mỏi nhừ cả tay suốt 15 phút rồi nó vẫn chưa bé lại thành cây kim nhỉ?!"),
        cd("Mày mài hết bộ thìa nhà mình thì lấy gì múc canh hả cháu?!"),
      ],
    },
    explain:
      "Thỏi sắt to thế mà kiên trì mài mãi còn thành cây kim nhỏ xíu được! Ý ông bà khuyên mình: làm việc gì khó, chỉ cần chịu khó rèn luyện từng chút một mỗi ngày thì nhất định sẽ thành công.",
    example: {
      shot: "Cảnh tập viết chữ đẹp hoặc tập nhảy dây, đá cầu",
      lines: [
        cd("Như lúc mới tập đá cầu hay luyện chữ đẹp, ngày đầu chỉ tâng được 1 quả, nhưng ngày nào cũng kiên trì tập 15 phút thì cuối tháng đá vèo vèo cả trăm quả!"),
      ],
    },
    punchline: {
      shot: "TC đặt đồng hồ bấm giờ đúng 10 giây, viết được đúng 1 chữ rồi ngả lưng nằm nghỉ",
      lines: [
        tc("Cháu hiểu rồi, phải kiên trì từng chút mỗi ngày!"),
        tc("Hôm nay cháu viết 1 chữ cái, mài sắt từ từ đến Tết năm sau là xong bài tập làm văn ông nhé!"),
      ],
    },
  }),

  makeEpisode({
    day: 17,
    week,
    theme,
    idiom: "Một cây làm chẳng nên non",
    meaning:
    "Một mình đơn lẻ thì khó làm nên việc lớn, phải biết đoàn kết cùng bạn bè. Câu đầy đủ: 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao'.",
    question: "Trò chơi nào ở trường phải có đủ hội bạn thân chơi cùng mới vui?",
    hook: {
      shot: "TC đặt một chậu cây cảnh nhỏ xíu lên bàn, cầm thước kẻ đo rồi thở dài",
      lines: [tc("Nuôi mãi mà chẳng thấy biến thành ngọn núi gì cả!")],
    },
    ask: "Cây cảnh thì làm sao thành núi được mà đo?",
    misread: {
      shot: "TC bê thêm 2 chậu cây nhỏ xíu nữa xếp sát vào nhau, đứng khoanh tay chờ đợi",
      lines: [
        tc("Ông dạy 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao' còn gì!"),
        tc("Cháu chụm đủ 3 chậu cây vào nhau từ sáng tới giờ rồi, sao nó vẫn chưa mọc thành núi Fansipan hả ông?!"),
        cd("Chữ 'non' ở đây là núi non, rừng lớn, nhưng không phải cứ xếp 3 cái chậu là đất tự phồng lên đâu!"),
      ],
    },
    explain:
    "Một cái cây đứng trơ trọi thì không tạo thành rừng núi được, nhiều cây tụ họp lại mới thành rừng lớn! Ý nói một người làm một mình thì yếu sức, phải biết đoàn kết, chung tay cùng tập thể mới làm được việc lớn.",
    example: {
      shot: "Cảnh trực nhật lớp học hoặc kéo co tập thể",
      lines: [
        cd("Như trực nhật lớp học, một mình mày vừa quét lớp vừa lau bảng, kê bàn thì bở hơi tai. Nhưng cả tổ 5 bạn cùng chia nhau làm thì 10 phút là lớp sạch bong!"),
      ],
    },
    punchline: {
      shot: "TC gọi 2 đứa bạn hàng xóm sang đứng chụm đầu vào nhau trước quyển vở bài tập",
      lines: [
        tc("Đoàn kết là sức mạnh! Bài toán này có 3 câu..."),
        tc("...Cháu làm nhiệm vụ viết họ tên, bạn Bi chép đề, bạn Bo giải toán là thành 'hòn núi điểm 10' luôn!"),
      ],
    },
  }),

  makeEpisode({
    day: 18,
    week,
    theme,
    idiom: "Tiền nào của nấy",
    meaning: "Giá trị món đồ thường tương xứng với công sức hoặc số tiền bỏ ra, đừng ham rẻ mà mua phải đồ kém chất lượng.",
    question: "Bạn từng mua món đồ chơi giá rẻ nào mà mới cầm lên đã hỏng chưa?",
    hook: {
      shot: "TC cầm siêu nhân nhựa vừa giơ lên tạo dáng thì cánh tay siêu nhân rụng rời",
      lines: [tc("Ơ kìa! Siêu nhân giải cứu thế giới gì mà chưa bay đã rụng tay rồi?!")],
    },
    ask: "Siêu nhân gì mà mỏng manh thế?",
    misread: {
      shot: "TC dán tờ tiền 2 nghìn lên người con robot, dán tờ 5 nghìn lên chiếc xe đồ chơi",
      lines: [
        tc("Tại cháu chưa dán tiền lên đồ chơi đấy ông ạ! Ông bảo 'tiền nào của nấy' mà!"),
        tc("Tờ tiền màu xanh thì dán vào siêu nhân xanh, tờ tiền màu đỏ thì dán vào xe cứu hỏa!"),
        cd("Cất ngay tiền lẻ vào heo đất! Ai bảo mày lấy tiền làm nhãn vở dán đồ chơi thế?!"),
      ],
    },
    explain:
      "Của ở đây là của cải, đồ vật! Tiền nào của nấy nghĩa là món đồ tốt, bền đẹp thì phải tốn nhiều công sức, nhiều tiền hơn; còn ham đồ quá rẻ, làm ẩu thì rất nhanh hỏng.",
    example: {
      shot: "Cảnh chọn mua bút và vở ở hiệu sách",
      lines: [
        cd("Như mua cục tẩy có 1 nghìn đồng nhìn thì to, nhưng tẩy đến đâu đen nhẻm trang vở đến đấy, không thể sạch bằng cục tẩy tốt được!"),
      ],
    },
    punchline: {
      shot: "TC chìa tay ra trước mặt Cụ Đồ với vẻ mặt vô cùng nghiêm túc",
      lines: [
        tc("Ông nói chuẩn quá! 'Tiền nào của nấy' — hôm nay ông thưởng cho cháu 2 nghìn thì cháu đấm lưng nhẹ..."),
        tc("...Còn ông thưởng 10 nghìn là có ngay gói đấm lưng VIP khuyến mãi quạt mát luôn ạ!"),
      ],
    },
  }),

  makeEpisode({
    day: 19,
    week,
    theme,
    idiom: "Năng nhặt chặt bị",
    meaning: "Chăm chỉ tích góp từng chút nhỏ nhặt mỗi ngày thì lâu dần sẽ có được số lượng lớn.",
    question: "Bạn đang nuôi heo đất để dành mua món đồ gì đấy?",
    hook: {
      shot: "TC ôm cái túi vải to đùng, dùng dây thừng buộc thắt nút thật chặt",
      lines: [tc("Buộc chặt cứng thế này mới đúng chuẩn 'chặt bị'!")],
    },
    ask: "Mày nhét cái gì vào túi mà buộc bảy tám vòng thế?",
    misread: {
      shot: "TC đổ từ trong túi ra toàn lá cây khô, sỏi đá, vỏ kẹo, nắp chai nhựa",
      lines: [
        tc("Cháu thực hành 'năng nhặt chặt bị' đấy ông! Đi học về thấy cái gì rơi trên đường là cháu nhặt hết!"),
        tc("Nào là lá bàng khô, hòn sỏi, que kem... nhặt xong phải lấy dây buộc cái bị thật chặt kẻo nó rơi!"),
        cd("Chặt bị là đầy chặt cả túi, chứ không phải nhặt rác về rồi buộc thắt nút cái túi lại!"),
      ],
    },
    explain:
      "Chữ 'năng' là chăm chỉ, thường xuyên; 'bị' là cái túi cói ngày xưa, 'chặt bị' là đầy ắp cả túi! Ý khuyên mình biết tiết kiệm, góp nhặt từng chút nhỏ mỗi ngày thì lâu dần sẽ thành nhiều.",
    example: {
      shot: "Cảnh bỏ tiền lẻ vào heo đất và gom giấy vụn Kế hoạch nhỏ",
      lines: [
        cd("Như mỗi ngày bỏ vào heo đất 2 nghìn tiền mừng tuổi hay tiền thưởng, hoặc gom từng tờ báo cũ làm Kế hoạch nhỏ, cuối năm mở ra là đủ mua cả bộ truyện tranh mơ ước!"),
      ],
    },
    punchline: {
      shot: "TC cầm con heo đất nhựa lắc lắc bên tai Cụ Đồ, kêu lọc cọc đúng 1 đồng xu",
      lines: [
        tc("Cháu bắt đầu 'năng nhặt' từ hôm nay luôn! Cháu có cái bụng con heo đất rồi..."),
        tc("...Giờ ông cho cháu 'nhặt' tờ tiền đầu tiên từ ví của ông để làm vốn nhé!"),
      ],
    },
  }),

  makeEpisode({
    day: 20,
    week,
    theme,
    idiom: "Đi một ngày đàng học một sàng khôn",
    meaning: "Chịu khó đi nhiều nơi, quan sát và trải nghiệm thực tế thì sẽ mở mang thêm nhiều kiến thức bổ ích.",
    question: "Chuyến đi chơi hay dã ngoại nào của trường làm bạn nhớ mãi?",
    hook: {
      shot: "TC đội mũ tai bèo, hai tay bưng cái sàng gạo (hoặc cái rổ lớn) đi vòng quanh sân",
      lines: [tc("Đi bộ mỏi nhừ cả chân rồi mà cái sàng vẫn trống trơn!")],
    },
    ask: "Mày bưng cái rổ đi hứng cái gì ngoài sân đấy?",
    misread: {
      shot: "TC vừa đi đều bước vừa ngửa cái rổ lên trời chờ đợi, thỉnh thoảng ngó vào rổ",
      lines: [
        tc("Cháu đang đi một ngày đàng để hứng 'một sàng khôn' đây ông!"),
        tc("Cháu đi 50 vòng quanh sân rồi mà mới hứng được có 3 chiếc lá rụng, chưa thấy 'cục khôn' nào rơi xuống rổ cả!"),
        cd("Làm gì có cục khôn nào rơi từ trên cây xuống cho mày hứng!"),
      ],
    },
    explain:
      "'Đàng' là đường đi, 'sàng' là cái sàng tre đan để sàng gạo! Ông bà ví von: chịu khó bước ra ngoài đi đây đi đó, mắt thấy tai nghe nhiều điều thực tế thì đầu óc sẽ mở mang, học được bao nhiêu điều khôn ngoan.",
    example: {
      shot: "Cảnh học sinh đi dã ngoại bảo tàng, trang trại",
      lines: [
        cd("Như đi dã ngoại cùng lớp ra trang trại, tận mắt thấy cây lúa lớn thế nào, con trâu ăn cỏ ra sao — nhớ nhanh và thú vị hơn chỉ ngồi lì trong phòng đọc sách!"),
      ],
    },
    punchline: {
      shot: "TC khoác balo, cầm rổ đứng ngay cửa phòng khách vẫy tay",
      lines: [
        tc("Ông nói chí lý! Vậy chiều nay cháu xin phép nghỉ ở nhà quét sân..."),
        tc("...để đi 'một ngày đàng' ra tiệm tạp hóa đầu ngõ học một sàng khôn ông nhé!"),
      ],
    },
  }),

  makeEpisode({
    day: 21,
    week,
    theme,
    idiom: "Học thầy không tày học bạn",
    meaning: "Ngoài việc học thầy cô trên lớp, học hỏi từ bạn bè trang lứa cũng rất gần gũi, dễ hiểu và hiệu quả.",
    question: "Bạn thân ở lớp đã từng chỉ cho bạn 'bí kíp' học tập hay trò chơi thú vị nào?",
    hook: {
      shot: "TC ngồi khoanh tay nghiêm trang trước mặt đứa bạn, đặt quyển sổ ghi 'BÍ KÍP ĐÁ CẦU'",
      lines: [tc("Xin sư phụ truyền dạy tuyệt chiêu tâng cầu bằng đầu gối!")],
    },
    ask: "Sao lại gọi bạn cùng lớp là sư phụ thế kia?",
    misread: {
      shot: "TC cầm thước kẻ đo chiều cao của bạn, rồi chép từng hành động kỳ quặc của bạn vào sổ",
      lines: [
        tc("Ông bảo 'học thầy không tày học bạn'! Chữ 'tày' cháu không biết là gì nhưng chắc chắn là phải bắt chước bạn 100%!"),
        tc("Bạn ấy ngoáy mũi bằng tay trái, cháu cũng ghi vào vở để tập ngoáy mũi tay trái cho giống!"),
        cd("Ấy chết! Học là học cái giỏi của bạn, chứ ai bảo mày học cả tật xấu ngoáy mũi!"),
      ],
    },
    explain:
      "Chữ 'tày' ngày xưa nghĩa là 'bằng'! Thầy cô dạy cho mình kiến thức nền tảng rất quý, nhưng bạn bè cùng lứa lại gần gũi, đôi khi giảng bài cho nhau bằng cách nói của học trò thì lại dễ hiểu bất ngờ!",
    example: {
      shot: "Cảnh hai bạn học sinh chỉ bài cho nhau trong giờ ra chơi",
      lines: [
        cd("Như có bài toán đố trên lớp mày còn ngại chưa dám hỏi lại thầy, giờ ra chơi nhờ bạn lớp trưởng giảng lại 5 phút bằng hình vẽ que tính là hiểu thông suốt ngay!"),
      ],
    },
    punchline: {
      shot: "TC khoác vai Cụ Đồ cười híp mắt",
      lines: [
        cd("Nhưng nhớ là phải chọn bạn tốt, bạn giỏi mà học nhé!"),
        tc("Cháu chọn được người bạn vừa thông thái vừa nhiều tiền lẻ nhất xóm rồi... Từ hôm nay ông làm bạn thân cùng bàn của cháu nhé!"),
      ],
    },
  }),
];
