/** Tuần 2 "Thiên Đường Kiến Thức": các bài toán cổ đại đo bằng công cụ thô sơ (tập 3 Thales có cảnh vẽ riêng). */
import { makeEpisode, nar } from "./make.ts";

const week = 2;
const theme = "Hình học cổ đại & Vũ trụ";

export const TUAN_2 = [
  makeEpisode({
    day: 3,
    week,
    theme,
    title: "Đo chiều cao Đại Kim Tự Tháp chỉ bằng một chiếc cọc",
    hudTitle: "ĐO KIM TỰ THÁP BẰNG MỘT CHIẾC CỌC",
    textbook: "Toán 8 · Định lý Thales",
    era: "Giza, Ai Cập · 600 TCN",
    question: "Hồi đi học, bạn có từng thắc mắc học Định lý Thales để làm gì ngoài đời thực không?",
    sources: [
      { title: "SGK Toán lớp 8 — Định lý Thales trong tam giác", url: "https://hanhtrangso.nxbgd.vn/" },
      { title: "Britannica — Thales of Miletus", url: "https://www.britannica.com/biography/Thales-of-Miletus" },
      { title: "MacTutor (ĐH St Andrews) — Thales of Miletus", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Thales/" },
    ],
    hook: {
      shot: "Sa mạc Giza năm 600 TCN, Đại kim tự tháp Cheops xoay 2.5D (câu 1); đường cao vàng và 'H = ?' hiện ra (câu 2); Milo (vai Thales) bước vào, cầm 1 chiếc cọc gỗ (câu 3)",
      lines: [
        nar(
          "Thử quay về Ai Cập 2.600 năm trước, khi Đại kim tự tháp Cheops đã sừng sững giữa sa mạc suốt hai nghìn năm.",
          "Thử quay về Ai Cập hai nghìn sáu trăm năm trước, khi Đại kim tự tháp Kê ốp đã sừng sững giữa sa mạc suốt hai nghìn năm.",
        ),
        nar(
          "Nó cao đến mức đứng dưới chân tháp mà ngước lên, chẳng ai đo nổi bằng thước dây. Vậy rốt cuộc nó cao bao nhiêu?",
          "Nó cao đến mức đứng dưới chân tháp mà ngước lên, chẳng ai đo nổi bằng thước dây. Vậy rốt cuộc nó cao bao nhiêu?",
        ),
        nar(
          "Thế nhưng, nhà thông thái Hy Lạp Thales đã giải gọn bài toán ấy, chỉ với một chiếc cọc gỗ. Bạn đoán xem, ông làm thế nào?",
          "Thế nhưng, nhà thông thái Hy Lạp Tha lét đã giải gọn bài toán ấy, chỉ với một chiếc cọc gỗ. Bạn đoán xem, ông làm thế nào?",
        ),
      ],
    },
    barrier: {
      shot: "Milo trèo lên đỉnh thả dây dọc sườn nghiêng (câu 1); dây hóa đỏ, đường cao H thẳng đứng hiện ra, dấu ✖ (câu 2); chuyển sang cắt lớp X-quang 2,3 triệu khối đá đè tâm đáy O, dấu ✖ (câu 3)",
      lines: [
        nar(
          "Cách đầu tiên ai cũng nghĩ tới là trèo lên đỉnh, thả sợi dây thừng xuống đất, rồi đo xem dây dài bao nhiêu.",
          "Cách đầu tiên ai cũng nghĩ tới là trèo lên đỉnh, thả sợi dây thừng xuống đất, rồi đo xem dây dài bao nhiêu.",
        ),
        nar(
          "Nghe thì hợp lý, nhưng cách này sai ngay từ gốc. Mặt tháp vát nghiêng, nên dây chỉ đo được độ dài sườn dốc, chứ không phải chiều cao thẳng đứng của tháp.",
          "Nghe thì hợp lý, nhưng cách này sai ngay từ gốc. Mặt tháp vát nghiêng, nên dây chỉ đo được độ dài sườn dốc, chứ không phải chiều cao thẳng đứng của tháp.",
        ),
        nar(
          "Thế còn đo thẳng từ đỉnh xuống tâm đáy thì sao? Cũng đành chịu thôi, vì tâm đáy bị chôn kín dưới khối tháp được xếp từ khoảng 2,3 triệu tảng đá.",
          "Thế còn đo thẳng từ đỉnh xuống tâm đáy thì sao? Cũng đành chịu thôi, vì tâm đáy bị chôn kín dưới khối tháp được xếp từ khoảng hai phẩy ba triệu tảng đá.",
        ),
      ],
    },
    eureka: {
      shot: "Bóng kim tự tháp dài dần trên cát (câu 1); cọc cắm xuống, tia nắng Mặt Trời song song (câu 2); nắng nghiêng 45°, bóng cọc dài bằng cọc (câu 3); hạ mặt bằng đáy 230m ở Tầng 2B, cộng 115m + 31,6m = 146,6m (câu 4)",
      lines: [
        nar(
          "Cứ đo trực tiếp thì kiểu gì cũng bế tắc. Thế là Thales thôi nhìn khối đá, mà quay sang nhìn cái bóng của nó trên cát.",
          "Cứ đo trực tiếp thì kiểu gì cũng bế tắc. Thế là Tha lét thôi nhìn khối đá, mà quay sang nhìn cái bóng của nó trên cát.",
        ),
        nar(
          "Rồi ông cắm một chiếc cọc thẳng đứng xuống cát. Mặt Trời ở rất xa, nên mọi tia nắng chiếu xuống đều song song.",
          "Rồi ông cắm một chiếc cọc thẳng đứng xuống cát. Mặt Trời ở rất xa, nên mọi tia nắng chiếu xuống đều song song.",
        ),
        nar(
          "Tương truyền, Thales kiên nhẫn chờ tới lúc nắng nghiêng đúng 45°, khi bóng chiếc cọc dài đúng bằng chính chiếc cọc!",
          "Tương truyền, Tha lét kiên nhẫn chờ tới lúc nắng nghiêng đúng bốn mươi lăm độ, khi bóng chiếc cọc dài đúng bằng chính chiếc cọc!",
        ),
        nar(
          "Lúc ấy, bóng tháp tính từ tâm đáy cũng dài đúng bằng chiều cao tháp. Nửa cạnh đáy là 115 mét, phần bóng nhô ra thêm chừng 31 mét rưỡi, cộng lại tháp cao khoảng 146 mét rưỡi!",
          "Lúc ấy, bóng tháp tính từ tâm đáy cũng dài đúng bằng chiều cao tháp. Nửa cạnh đáy là một trăm mười lăm mét, phần bóng nhô ra thêm chừng ba mươi mốt mét rưỡi, cộng lại tháp cao khoảng một trăm bốn mươi sáu mét rưỡi!",
        ),
      ],
    },
    theorem: {
      shot: "Cắm cọc ở mút bóng tháp (câu 1); hai tam giác đồng dạng (tháp + bóng tháp, cọc + bóng cọc), cọc DE trượt về song song BC (câu 2); trang Toán 8 mở ra, công thức tỉ lệ ở Tầng 2B (câu 3)",
      lines: [
        nar(
          "Có điều, đâu phải lúc nào cũng chờ được nắng như thế. Theo sử gia Plutarch, Thales còn có một cách khác nữa, là cắm một chiếc cọc ngay ở mút bóng tháp, rồi so hai cái bóng với nhau.",
          "Có điều, đâu phải lúc nào cũng chờ được nắng như thế. Theo sử gia Pờ lu tác, Tha lét còn có một cách khác nữa, là cắm một chiếc cọc ngay ở mút bóng tháp, rồi so hai cái bóng với nhau.",
        ),
        nar(
          "Tháp và cọc cùng đứng thẳng, tia nắng lại song song, nên ta có hai tam giác đồng dạng. Bóng tháp dài gấp bao nhiêu lần bóng cọc, thì tháp cũng cao gấp bấy nhiêu lần cọc.",
          "Tháp và cọc cùng đứng thẳng, tia nắng lại song song, nên ta có hai tam giác đồng dạng. Bóng tháp dài gấp bao nhiêu lần bóng cọc, thì tháp cũng cao gấp bấy nhiêu lần cọc.",
        ),
        nar(
          "Đó chính là Định lý Thales mà bạn từng học ở lớp 8. Nói gọn lại, bóng dài gấp mấy lần bóng cọc thì vật cũng cao gấp mấy lần cọc, miễn là bóng tháp còn nhô ra khỏi chân tháp!",
          "Đó chính là Định lý Tha lét mà bạn từng học ở lớp tám. Nói gọn lại, bóng dài gấp mấy lần bóng cọc thì vật cũng cao gấp mấy lần cọc, miễn là bóng tháp còn nhô ra khỏi chân tháp!",
        ),
      ],
    },
    realworld: {
      shot: "Rừng rậm tối không có bóng nắng, Milo đội mũ kiểm lâm bối rối trước cây lim cổ thụ (câu 1); giơ thước ngắm chữ L tạo góc 45° lên ngọn cây, hiện khoảng cách d và chiều cao mắt (câu 2)",
      lines: [
        nar(
          "Thế nếu bạn đứng giữa rừng rậm, chẳng có lấy một vệt nắng, thì định lý này có bó tay không?",
          "Thế nếu bạn đứng giữa rừng rậm, chẳng có lấy một vệt nắng, thì định lý này có bó tay không?",
        ),
        nar(
          "Không hề! Người kiểm lâm cầm một chiếc thước chữ L có hai cạnh bằng nhau, lùi dần cho tới khi ngắm trúng ngọn cây theo góc 45°. Khi ấy, khoảng cách từ chỗ đứng tới gốc cây, cộng với chiều cao tầm mắt, chính là chiều cao của cây.",
          "Không hề! Người kiểm lâm cầm một chiếc thước chữ en lờ có hai cạnh bằng nhau, lùi dần cho tới khi ngắm trúng ngọn cây theo góc bốn mươi lăm độ. Khi ấy, khoảng cách từ chỗ đứng tới gốc cây, cộng với chiều cao tầm mắt, chính là chiều cao của cây.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Mặt Trăng quay quanh Trái Đất (câu 1), rồi Trái Đất – Mặt Trăng – Mặt Trời thẳng hàng trong Nhật thực toàn phần với tỉ lệ đồng dạng khoảng 1/400 (câu 2); kết: cảnh lùi xa, Thales đoán trước nhật thực, quay về chiếc cọc gỗ và cái bóng (câu 3)",
      lines: [
        nar(
          "Kỳ diệu hơn nữa, nếu kéo dài đường thẳng của Thales ra ngoài khí quyển, bạn sẽ chạm tới bí mật của nhật thực toàn phần.",
          "Kỳ diệu hơn nữa, nếu kéo dài đường thẳng của Tha lét ra ngoài khí quyển, bạn sẽ chạm tới bí mật của nhật thực toàn phần.",
        ),
        nar(
          "Mặt Trời rộng gấp khoảng 400 lần Mặt Trăng, nhưng Mặt Trời cũng ở xa ta hơn Mặt Trăng chừng ấy lần. Hai tam giác đồng dạng khổng lồ ấy khiến Mặt Trăng che vừa khít Mặt Trời.",
          "Mặt Trời rộng gấp khoảng bốn trăm lần Mặt Trăng, nhưng Mặt Trời cũng ở xa ta hơn Mặt Trăng chừng ấy lần. Hai tam giác đồng dạng khổng lồ ấy khiến Mặt Trăng che vừa khít Mặt Trời.",
        ),
        nar(
          "Hóa ra, muốn đo một kỳ quan thì đâu cần thang cao hay thước dài. Chỉ cần một chiếc cọc gỗ, một cái bóng, và một cái đầu biết nhìn ra tỉ lệ.",
          "Hóa ra, muốn đo một kỳ quan thì đâu cần thang cao hay thước dài. Chỉ cần một chiếc cọc gỗ, một cái bóng, và một cái đầu biết nhìn ra tỉ lệ.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 4,
    week,
    theme,
    title: "Đo chu vi Trái Đất 2.200 năm trước bằng một cái giếng và một chiếc cọc",
    hudTitle: "ĐO TRÁI ĐẤT BẰNG MỘT CHIẾC CỌC",
    textbook: "Toán 7 · Hai đường thẳng song song",
    era: "Alexandria, Ai Cập · khoảng 240 TCN",
    question: "Nếu Trái Đất to gấp đôi, bóng cọc ở Alexandria sẽ lệch nhiều hơn hay ít hơn 7,2°?",
    sources: [
      { title: "MacTutor (ĐH St Andrews) — Eratosthenes of Cyrene", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Eratosthenes/" },
      { title: "Strabo, Geography 17.1.48 — giếng ở Syene (LacusCurtius, ĐH Chicago)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/17A3*.html" },
      { title: "Ohio State University, Astronomy 161 — Eratosthenes measures the Earth", url: "https://www.astronomy.ohio-state.edu/~thompson/161/measearth.html" },
      { title: "Toán 7 Kết nối tri thức, Bài 10 — Tính chất hai đường thẳng song song (HĐ2 tr. 52)", url: "https://www.vietjack.com/toan-7-kn/hd2-trang-52-toan-7-tap-1.jsp" },
      { title: "NOAA — What is the difference between a nautical mile and a knot?", url: "https://oceanservice.noaa.gov/facts/nauticalmile_knot.html" },
      { title: "NASA — Sun Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html" },
      { title: "HISTORY — Magellan's expedition circumnavigates globe (1522)", url: "https://www.history.com/this-day-in-history/september-6/magellans-expedition-circumnavigates-globe" },
    ],
    hook: {
      shot: "Alexandria khoảng 240 TCN, Milo (vai Eratosthenes) đứng cạnh quả địa cầu có dấu hỏi, bên cạnh một cái giếng đá và một chiếc cọc đo bóng; câu cuối Milo chỉ tay xuống ô bình luận",
      lines: [
        nar(
          "Hơn 2.200 năm trước, người Hy Lạp đã biết Trái Đất có hình cầu. Nhưng quả cầu ấy to cỡ nào?",
          "Hơn hai nghìn hai trăm năm trước, người Hy Lạp đã biết Trái Đất có hình cầu. Nhưng quả cầu ấy to cỡ nào?",
        ),
        nar(
          "Vậy mà Eratosthenes đã đo được nó, chẳng cần bước chân ra khỏi Ai Cập.",
          "Vậy mà Ê ra tốt xờ ten đã đo được nó, chẳng cần bước chân ra khỏi Ai Cập.",
        ),
        nar(
          "Trong tay ông chỉ có một cái giếng, một chiếc cọc và một quãng đường. Bạn đoán xem ông làm cách nào?",
          "Trong tay ông chỉ có một cái giếng, một chiếc cọc và một quãng đường. Bạn đoán xem ông làm cách nào?",
        ),
      ],
    },
    barrier: {
      shot: "Milo cầm cuộn dây định đi vòng quanh quả địa cầu, bị đại dương mênh mông chắn lối (✖); mốc thời gian 240 TCN → 1522 chạy qua",
      lines: [
        nar(
          "Muốn biết chu vi quả cầu, cách dễ nghĩ nhất là đi trọn một vòng quanh nó rồi đo.",
          "Muốn biết chu vi quả cầu, cách dễ nghĩ nhất là đi trọn một vòng quanh nó rồi đo.",
        ),
        nar(
          "Nhưng với Trái Đất thì không làm thế được, biển cả và đất lạ đã chắn hết mọi lối.",
          "Nhưng với Trái Đất thì không làm thế được, biển cả và đất lạ đã chắn hết mọi lối.",
        ),
        nar(
          "Phải gần 1.800 năm sau, đoàn thuyền của Magellan mới lần đầu đi hết được một vòng quanh Trái Đất.",
          "Phải gần một nghìn tám trăm năm sau, đoàn thuyền của Ma gien lăng mới lần đầu đi hết được một vòng quanh Trái Đất.",
        ),
      ],
    },
    eureka: {
      shot: "Trưa Hạ chí: ở Syene nắng rọi thẳng đáy giếng, cọc không bóng; ở Alexandria cọc đổ bóng, tia nắng lệch khỏi cọc 7,2° = 1/50 vòng tròn; các tia nắng vẽ song song",
      lines: [
        nar(
          "Eratosthenes thì khác, ông chỉ đo một khúc nhỏ của vòng tròn ấy thôi.",
          "Ê ra tốt xờ ten thì khác, ông chỉ đo một khúc nhỏ của vòng tròn ấy thôi.",
        ),
        nar(
          "Sách cổ chép rằng ở Syene, cứ đến trưa ngày Hạ chí là nắng rọi xuống tận đáy giếng, và chiếc cọc không hề có bóng.",
          "Sách cổ chép rằng ở Xi ê nê, cứ đến trưa ngày Hạ chí là nắng rọi xuống tận đáy giếng, và chiếc cọc không hề có bóng.",
        ),
        nar(
          "Cũng trưa hôm ấy, ở Alexandria, chiếc cọc vẫn đổ bóng, tia nắng lệch khỏi cọc một góc 7,2°.",
          "Cũng trưa hôm ấy, ở A lếch xan đờ ri a, chiếc cọc vẫn đổ bóng, tia nắng lệch khỏi cọc một góc bảy phẩy hai độ.",
        ),
        nar(
          "Vì sao vậy? Vì Mặt Trời ở rất xa, tia nắng chiếu tới hai nơi gần như song song, nên bóng cọc lệch đi chỉ là do mặt đất cong.",
          "Vì sao vậy? Vì Mặt Trời ở rất xa, tia nắng chiếu tới hai nơi gần như song song, nên bóng cọc lệch đi chỉ là do mặt đất cong.",
        ),
      ],
    },
    theorem: {
      shot: "Mặt cắt Trái Đất: kéo dài hai cọc gặp nhau ở tâm; tia nắng ở Alexandria song song đường cọc Syene, cọc Alexandria là cát tuyến, tô hai góc so le trong 7,2°; trang Toán 7 mở ra, 5.000 × 50 = 250.000 stadion; câu cuối: thước 39.000–46.000 km đặt cạnh mốc 40.000 km",
      lines: [
        nar(
          "Bây giờ, thử kéo dài hai chiếc cọc xuống, chúng sẽ gặp nhau ở tâm Trái Đất. Khi ấy, cọc ở Alexandria cắt hai đường song song, một là tia nắng, một là cọc ở Syene kéo dài.",
          "Bây giờ, thử kéo dài hai chiếc cọc xuống, chúng sẽ gặp nhau ở tâm Trái Đất. Khi ấy, cọc ở A lếch xan đờ ri a cắt hai đường song song, một là tia nắng, một là cọc ở Xi ê nê kéo dài.",
        ),
        nar(
          "Hai góc so le trong thì bằng nhau, nên góc ở tâm cũng là 7,2°. Đó là tính chất hai đường thẳng song song mà bạn đã học ở lớp 7.",
          "Hai góc so le trong thì bằng nhau, nên góc ở tâm cũng là bảy phẩy hai độ. Đó là tính chất hai đường thẳng song song mà bạn đã học ở lớp bảy.",
        ),
        nar(
          "Góc ấy bằng 1/50 vòng tròn. Mà Syene cách Alexandria khoảng 5.000 stadion, nên cả vòng Trái Đất phải dài gấp 50 lần quãng ấy.",
          "Góc ấy bằng một phần năm mươi vòng tròn. Mà Xi ê nê cách A lếch xan đờ ri a khoảng năm nghìn xờ ta đi ông, nên cả vòng Trái Đất phải dài gấp năm mươi lần quãng ấy.",
        ),
        nar(
          "Tùy cách quy đổi stadion, con số ấy vào khoảng 39 đến 46 nghìn km, rất gần 40.000 km ta đo được ngày nay.",
          "Tùy cách quy đổi xờ ta đi ông, con số ấy vào khoảng ba mươi chín đến bốn mươi sáu nghìn cây số, rất gần bốn mươi nghìn cây số ta đo được ngày nay.",
        ),
      ],
    },
    realworld: {
      shot: "Milo trên tàu buồm ban đêm giơ thước đo góc ngắm sao Bắc Cực; tàu chạy về phía bắc, sao nhô cao thêm 1°, thước hải đồ ghi 111 km ≈ 60 hải lý",
      lines: [
        nar(
          "Người đi biển thì làm theo chiều ngược lại, đo góc để tính ra quãng đường. Ánh sao Bắc Cực chiếu tới tàu cũng song song, y như tia nắng.",
          "Người đi biển thì làm theo chiều ngược lại, đo góc để tính ra quãng đường. Ánh sao Bắc Cực chiếu tới tàu cũng song song, y như tia nắng.",
        ),
        nar(
          "Tàu chạy thẳng về phía bắc, cứ thấy sao Bắc Cực nhô cao thêm 1° là đã đi thêm chừng 111 km.",
          "Tàu chạy thẳng về phía bắc, cứ thấy sao Bắc Cực nhô cao thêm một độ là đã đi thêm chừng một trăm mười một cây số.",
        ),
        nar(
          "Đơn vị hải lý cũng ra đời từ đó, dài xấp xỉ một phần sáu mươi độ vĩ độ.",
          "Đơn vị hải lý cũng ra đời từ đó, dài xấp xỉ một phần sáu mươi độ vĩ độ.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: từ Trái Đất kẻ hai tia tới hai mép Mặt Trời cách 150 triệu km, góc 0,53°; vòng tròn bán kính 150 triệu km dài 940 triệu km; kết: quay về cái giếng không bóng và chiếc cọc có bóng",
      lines: [
        nar(
          "Nói gọn lại, góc lệch là mấy phần vòng tròn thì quãng đường là bấy nhiêu phần chu vi. Chính tỉ lệ ấy, nay còn giúp ta đo được cả Mặt Trời.",
          "Nói gọn lại, góc lệch là mấy phần vòng tròn thì quãng đường là bấy nhiêu phần chu vi. Chính tỉ lệ ấy, nay còn giúp ta đo được cả Mặt Trời.",
        ),
        nar(
          "Mặt Trời cách ta khoảng 150 triệu km, vậy mà chỉ chiếm một góc chừng 1/675 vòng tròn trên trời.",
          "Mặt Trời cách ta khoảng một trăm năm mươi triệu cây số, vậy mà chỉ chiếm một góc chừng một phần sáu trăm bảy mươi lăm vòng tròn trên trời.",
        ),
        nar(
          "Một vòng tròn có bán kính bằng khoảng cách ấy thì dài chừng 940 triệu km. Đem chia cho 675, ta được bề rộng của Mặt Trời là gần 1,4 triệu km.",
          "Một vòng tròn có bán kính bằng khoảng cách ấy thì dài chừng chín trăm bốn mươi triệu cây số. Đem chia cho sáu trăm bảy mươi lăm, ta được bề rộng của Mặt Trời là gần một phẩy bốn triệu cây số.",
        ),
        nar(
          "Tất cả bắt đầu từ một cái giếng ngập nắng, một chiếc cọc có bóng, và một người biết đổi góc lệch thành quãng đường.",
          "Tất cả bắt đầu từ một cái giếng ngập nắng, một chiếc cọc có bóng, và một người biết đổi góc lệch thành quãng đường.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 5,
    week,
    theme,
    title: "Sợi dây 12 nút, tấm bảng đất sét 3.600 năm & Định lý Pythagoras",
    hudTitle: "GÓC VUÔNG TỪ SỢI DÂY 12 NÚT",
    textbook: "Toán 8 · Định lý Pythagoras",
    era: "Sippar, Lưỡng Hà · 1900–1600 TCN",
    question: "Nếu hai cạnh góc tường dài 6 mét và 8 mét, đường chéo phải dài bao nhiêu mét thì góc ấy vuông?",
    sources: [
      { title: "UNSW Sydney — Australian mathematician reveals world's oldest example of applied geometry (tấm bảng Si.427)", url: "https://www.unsw.edu.au/news/2021/08/australian-mathematician-reveals-world-s-oldest-example-of-appli" },
      { title: "ScienceDaily — Mathematician reveals world's oldest example of applied geometry (Mansfield, Foundations of Science 2021)", url: "https://www.sciencedaily.com/releases/2021/08/210804123503.htm" },
      { title: "MacTutor (ĐH St Andrews) — Pythagoras of Samos", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Pythagoras/" },
      { title: "SGK Toán 8 Kết nối tri thức — Bài 35: Định lí Pythagore và ứng dụng (lý thuyết)", url: "https://vietjack.com/toan-8-kn/ly-thuyet-bai-35-dinh-li-pythagore-va-ung-dung.jsp" },
      { title: "JLC — Snapping Layout Lines for Walls (phương pháp 3-4-5)", url: "https://www.jlconline.com/Training-the-Trades/snapping-layout-lines-for-walls_o?o=1" },
      { title: "NASA — International Space Station (độ cao khoảng 250 dặm)", url: "https://www.nasa.gov/International%20Space%20Station/" },
      { title: "NASA NSSDC — Earth Fact Sheet (bán kính trung bình 6.371 km)", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
    ],
    hook: {
      shot: "Câu 1–2: Milo cầm sợi dây 12 nút trước nền kim tự tháp, dấu hỏi lớn hiện trên sợi dây. Câu 3: cảnh lật sang một cánh đồng Lưỡng Hà rộng. Câu 4: hiện tấm bảng đất sét nhỏ vừa lòng bàn tay",
      lines: [
        nar(
          "Có lẽ bạn từng nghe chuyện người Ai Cập cổ đại dùng sợi dây 12 nút để kẻ góc vuông cho kim tự tháp.",
          "Có lẽ bạn từng nghe chuyện người Ai Cập cổ đại dùng sợi dây mười hai nút để kẻ góc vuông cho kim tự tháp.",
        ),
        nar(
          "Nghe thì hợp lý, nhưng đó chỉ là giả thuyết có từ thế kỷ 19 thôi, chưa có văn bản Ai Cập nào ghi lại cả.",
          "Nghe thì hợp lý, nhưng đó chỉ là giả thuyết có từ thế kỷ mười chín thôi, chưa có văn bản Ai Cập nào ghi lại cả.",
        ),
        nar(
          "Còn bài toán thì có thật. Giữa cánh đồng rộng, làm sao kẻ được góc vuông thật chuẩn?",
          "Còn bài toán thì có thật. Giữa cánh đồng rộng, làm sao kẻ được góc vuông thật chuẩn?",
        ),
        nar(
          "Manh mối nằm trên một tấm bảng đất sét hơn 3.600 năm tuổi.",
          "Manh mối nằm trên một tấm bảng đất sét hơn ba nghìn sáu trăm năm tuổi.",
        ),
      ],
    },
    barrier: {
      shot: "Thành Sippar cổ: Câu 1: Milo vai người đo đất đứng giữa thửa ruộng. Câu 2: hàng chà là ở ranh giới. Câu 3: Milo nheo mắt ngắm góc rồi ướm góc viên gạch. Câu 4: đường ranh kéo dài 100 m lệch dần 1°, hở ra 1,75 m và một dải tam giác đỏ ~87 m² (✖)",
      lines: [
        nar(
          "Tấm bảng ấy được đào lên ở Sippar, nay thuộc Iraq. Nó do một người đo đất vẽ ra khi chia lại ruộng.",
          "Tấm bảng ấy được đào lên ở Xíp pa, nay thuộc I rắc. Nó do một người đo đất vẽ ra khi chia lại ruộng.",
        ),
        nar(
          "Thời ấy, đất đai là chuyện lớn lắm. Có tấm bảng còn ghi cả vụ hai người quyền thế tranh nhau một hàng chà là.",
          "Thời ấy, đất đai là chuyện lớn lắm. Có tấm bảng còn ghi cả vụ hai người quyền thế tranh nhau một hàng chà là.",
        ),
        nar(
          "Muốn kẻ góc vuông, cách dễ nghĩ nhất là ngắm bằng mắt, hoặc ướm theo góc viên gạch.",
          "Muốn kẻ góc vuông, cách dễ nghĩ nhất là ngắm bằng mắt, hoặc ướm theo góc viên gạch.",
        ),
        nar(
          "Nhưng chỉ cần lệch 1 độ thôi, cuối đường ranh dài 100 mét đã chệch ra gần 2 mét. Thế là cả một mảnh đất bị lấn mất!",
          "Nhưng chỉ cần lệch một độ thôi, cuối đường ranh dài một trăm mét đã chệch ra gần hai mét. Thế là cả một mảnh đất bị lấn mất!",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: Milo bỏ việc ngắm góc, cầm dây đo độ dài. Câu 2–3: trên tấm bảng hiện hình chữ nhật cạnh 3 và 4 với đường chéo 5. Câu 4: Milo căng sợi dây 12 nút thành tam giác 3 – 4 – 5 khoảng nút, góc vuông sáng lên. Câu 5: phóng to thành 30 – 40 – 50 m",
      lines: [
        nar(
          "Người đo đất Babylon thì khác. Họ không đo góc, mà đo độ dài, vì đo độ dài cho chuẩn dễ hơn nhiều.",
          "Người đo đất Ba bi lon thì khác. Họ không đo góc, mà đo độ dài, vì đo độ dài cho chuẩn dễ hơn nhiều.",
        ),
        nar(
          "Theo nhà toán học Daniel Mansfield, người giải mã tấm bảng, họ dùng những bộ ba số đặc biệt.",
          "Theo nhà toán học Đa ni en Men phiu, người giải mã tấm bảng, họ dùng những bộ ba số đặc biệt.",
        ),
        nar(
          "Bộ đơn giản nhất là 3, 4, 5. Một hình chữ nhật có hai cạnh dài 3 và 4 thì đường chéo dài đúng 5.",
          "Bộ đơn giản nhất là ba, bốn, năm. Một hình chữ nhật có hai cạnh dài ba và bốn thì đường chéo dài đúng năm.",
        ),
        nar(
          "Bạn có thể thử với sợi dây 12 nút cách đều, căng thành tam giác ba cạnh dài 3, 4 và 5 khoảng nút, thì góc giữa hai cạnh ngắn tự khắc vuông.",
          "Bạn có thể thử với sợi dây mười hai nút cách đều, căng thành tam giác ba cạnh dài ba, bốn và năm khoảng nút, thì góc giữa hai cạnh ngắn tự khắc vuông.",
        ),
        nar(
          "Nếu làm to hẳn lên, cho cạnh dài nhất tới 50 mét thì sao? Dây có lệch 5 phân, góc cũng chỉ sai chừng một phần tám độ.",
          "Nếu làm to hẳn lên, cho cạnh dài nhất tới năm mươi mét thì sao? Dây có lệch năm phân, góc cũng chỉ sai chừng một phần tám độ.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1–2: ba hình vuông dựng trên ba cạnh tam giác 3 – 4 – 5: 9 ô + 16 ô xếp vừa khít 25 ô. Câu 3–4: trang Toán 8 mở ra với Định lý Pythagoras đảo rồi thuận ở Tầng 2B",
      lines: [
        nar(
          "Vì sao bộ ba ấy lần nào cũng cho góc vuông? Thử bình phương từng số xem.",
          "Vì sao bộ ba ấy lần nào cũng cho góc vuông? Thử bình phương từng số xem.",
        ),
        nar(
          "3 bình phương là 9, 4 bình phương là 16. Cộng lại được 25, vừa khít 5 bình phương!",
          "Ba bình phương là chín, bốn bình phương là mười sáu. Cộng lại được hai mươi lăm, vừa khít năm bình phương!",
        ),
        nar(
          "Nói gọn lại, đó chính là Định lý Pythagoras đảo ở lớp 8. Tam giác nào có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì tam giác ấy vuông.",
          "Nói gọn lại, đó chính là Định lý Pi ta go đảo ở lớp tám. Tam giác nào có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì tam giác ấy vuông.",
        ),
        nar(
          "Còn chiều thuận thì nói rằng ở tam giác vuông, bình phương cạnh huyền luôn bằng tổng bình phương hai cạnh kia. Định lý mang tên Pythagoras, dù ông sinh sau tấm bảng hơn nghìn năm.",
          "Còn chiều thuận thì nói rằng ở tam giác vuông, bình phương cạnh huyền luôn bằng tổng bình phương hai cạnh kia. Định lý mang tên Pi ta go, dù ông sinh sau tấm bảng hơn nghìn năm.",
        ),
      ],
    },
    realworld: {
      shot: "Công trường hiện đại: Câu 1–2: Milo đội mũ bảo hộ, căng thước dây 3 m và 4 m dọc hai đường tường. Câu 3: kéo thước chéo đúng 5 m; bên cạnh hiện các bội 6 – 8 – 10 và 9 – 12 – 15 m cho tường dài",
      lines: [
        nar(
          "Mẹo cổ ấy đến nay vẫn sống khỏe trên các công trường.",
          "Mẹo cổ ấy đến nay vẫn sống khỏe trên các công trường.",
        ),
        nar(
          "Muốn góc tường vuông, thợ xây đo dọc một bên 3 mét, bên kia 4 mét, đánh dấu lại, rồi kéo thước nối hai vạch.",
          "Muốn góc tường vuông, thợ xây đo dọc một bên ba mét, bên kia bốn mét, đánh dấu lại, rồi kéo thước nối hai vạch.",
        ),
        nar(
          "Nếu đường chéo đúng 5 mét thì góc đã vuông. Tường dài hơn thì cứ nhân cả ba số lên.",
          "Nếu đường chéo đúng năm mét thì góc đã vuông. Tường dài hơn thì cứ nhân cả ba số lên.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Câu 1: trạm vũ trụ quốc tế cao ~400 km nhìn về chân trời. Câu 2: tia nhìn sượt mép Trái Đất, ô vuông nhỏ đánh dấu góc vuông giữa tia nhìn và bán kính 6.371 km; cạnh huyền 6.771 km. Câu 3: hiện kết quả ~2.300 km. Câu 4: cảnh thu về tấm bảng đất sét và sợi dây 12 nút căng thành tam giác 3 – 4 – 5",
      lines: [
        nar(
          "Thử tưởng tượng bạn ở trạm vũ trụ quốc tế, cao chừng 400 km. Chân trời cách bạn bao xa?",
          "Thử tưởng tượng bạn ở trạm vũ trụ quốc tế, cao chừng bốn trăm cây số. Chân trời cách bạn bao xa?",
        ),
        nar(
          "Tia nhìn sượt qua mép Trái Đất thì vuông góc với bán kính, còn cạnh huyền là bán kính cộng thêm 400 km. Một tam giác vuông khổng lồ!",
          "Tia nhìn sượt qua mép Trái Đất thì vuông góc với bán kính, còn cạnh huyền là bán kính cộng thêm bốn trăm cây số. Một tam giác vuông khổng lồ!",
        ),
        nar(
          "Áp dụng chiều thuận của định lý rồi khai căn, chân trời hóa ra cách bạn chừng 2.300 km.",
          "Áp dụng chiều thuận của định lý rồi khai căn, chân trời hóa ra cách bạn chừng hai nghìn ba trăm cây số.",
        ),
        nar(
          "Ai mà ngờ, phép tính tầm nhìn từ quỹ đạo lại bắt nguồn từ một tấm bảng đất sét của người đo đất xưa.",
          "Ai mà ngờ, phép tính tầm nhìn từ quỹ đạo lại bắt nguồn từ một tấm bảng đất sét của người đo đất xưa.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 6,
    week,
    theme,
    title: "Đào hầm xuyên núi từ hai đầu — Làm sao hai đội gặp nhau giữa lòng đá?",
    hudTitle: "ĐÀO HẦM XUYÊN NÚI TỪ HAI ĐẦU",
    textbook: "Toán 10 · Định lý côsin & Định lý sin",
    era: "Đảo Samos, Hy Lạp · thế kỷ 6 TCN",
    question: "Đứng ở cửa hầm A, muốn biết hướng đào, bạn cần đo những gì ngoài trời?",
    sources: [
      { title: "Tom M. Apostol — The Tunnel of Samos, Engineering & Science (Caltech), 2004", url: "https://calteches.library.caltech.edu/689/2/Samos.pdf" },
      { title: "Toán 10 Kết nối tri thức — Bài 6. Hệ thức lượng trong tam giác (có Bài 3.11 đường hầm xuyên núi)", url: "https://loigiaihay.com/bai-6-he-thuc-luong-trong-tam-giac-toan-10-ket-noi-tri-thuc-e24966.html" },
      { title: "Les Bâtisseurs du Tunnel sous la Manche — Jonctions et percée (1/12/1990)", url: "https://batisseurs-tunnel.com/?p=3845" },
      { title: "MacTutor (ĐH St Andrews) — Nicolas Louis de Lacaille", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Lacaille/" },
      { title: "MacTutor (ĐH St Andrews) — Joseph-Jérôme Lefrançais de Lalande", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Lalande/" },
    ],
    hook: {
      shot: "Đảo Samos thế kỷ 6 TCN, mặt cắt núi đá vôi. Câu 1: Milo (vai Eupalinos) đứng trước núi. Câu 2: hai đội thợ cầm cuốc, búa, đục ở hai cửa hầm A và B. Câu 3–4: hai mũi hầm tiến vào lòng núi tối, Milo đứng giữa nhìn theo, dấu hỏi lớn",
      lines: [
        nar(
          "Hơn 2.500 năm trước, trên đảo Samos, kỹ sư Eupalinos phải đục một đường hầm dẫn nước xuyên qua núi, dài hơn 1 km.",
          "Hơn hai nghìn năm trăm năm trước, trên đảo Xa mốt, kỹ sư Ơ pa li nốt phải đục một đường hầm dẫn nước xuyên qua núi, dài hơn một cây số.",
        ),
        nar(
          "Hai đội thợ cùng lúc đục vào từ hai phía núi, trong tay chỉ có cuốc, búa và cái đục.",
          "Hai đội thợ cùng lúc đục vào từ hai phía núi, trong tay chỉ có cuốc, búa và cái đục.",
        ),
        nar(
          "Giữa lòng đá tối om, chẳng đội nào thấy đội kia. Làm sao họ biết phải đào hướng nào để gặp nhau?",
          "Giữa lòng đá tối om, chẳng đội nào thấy đội kia. Làm sao họ biết phải đào hướng nào để gặp nhau?",
        ),
        nar(
          "Nếu đứng ở cửa hầm, bạn sẽ đo những gì? Thử nghĩ trước khi xem tiếp nhé.",
          "Nếu đứng ở cửa hầm, bạn sẽ đo những gì? Thử nghĩ trước khi xem tiếp nhé.",
        ),
      ],
    },
    barrier: {
      shot: "Câu 1: hai đội nhắm chừng mà đào. Câu 2: hai mũi hầm rộng 2 m; mũi phía Bắc lệch 1° so với đường đúng, sau khoảng 500 m hai đầu hầm cách nhau khoảng 9 m và trượt qua nhau (✖). Câu 3: chiếc la bàn bị gạch chéo (✖)",
      lines: [
        nar(
          "Cách dễ nghĩ nhất là mỗi đội cứ nhắm chừng phía bên kia mà đào.",
          "Cách dễ nghĩ nhất là mỗi đội cứ nhắm chừng phía bên kia mà đào.",
        ),
        nar(
          "Nhưng chỉ cần lệch 1 độ thôi, tới giữa núi mũi hầm đã trượt khỏi hướng đúng chừng 9 mét. Thế là thành hai cái hang cụt.",
          "Nhưng chỉ cần lệch một độ thôi, tới giữa núi mũi hầm đã trượt khỏi hướng đúng chừng chín mét. Thế là thành hai cái hang cụt.",
        ),
        nar(
          "Dùng la bàn ư? Thời ấy làm gì đã có. Mà có đi nữa, bạn vẫn phải biết cửa bên kia ở hướng nào.",
          "Dùng la bàn ư? Thời ấy làm gì đã có. Mà có đi nữa, bạn vẫn phải biết cửa bên kia ở hướng nào.",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: mặt cắt núi, dấu hỏi trên hầm Eupalinos. Câu 2: Milo (vai Heron) xuất hiện. Câu 3: nhìn từ trên cao, Milo đi vòng chân núi từ cửa A sang cửa B theo những đoạn Đông–Tây, Bắc–Nam vuông góc; cộng lại thành hai cạnh góc vuông, cạnh huyền AB xuyên núi chính là đường hầm. Câu 4: hai tam giác nhỏ cùng hình dạng cắm cọc ở hai cửa",
      lines: [
        nar(
          "Vậy Eupalinos đã làm thế nào? Thật ra chẳng ai biết chắc, vì không còn ghi chép nào cả.",
          "Vậy Ơ pa li nốt đã làm thế nào? Thật ra chẳng ai biết chắc, vì không còn ghi chép nào cả.",
        ),
        nar(
          "Hơn 500 năm sau, kỹ sư Heron ở Alexandria mới viết ra một lời giải. Đã không nhìn xuyên qua núi được, thì ta đi vòng quanh núi.",
          "Hơn năm trăm năm sau, kỹ sư Hê rông ở A lếch xan đờ ri a mới viết ra một lời giải. Đã không nhìn xuyên qua núi được, thì ta đi vòng quanh núi.",
        ),
        nar(
          "Bạn đi vòng từ cửa A sang cửa B, chỉ rẽ góc vuông, rồi cộng riêng các quãng Đông Tây và Bắc Nam. Thế là bạn có hai cạnh góc vuông, còn cạnh huyền chính là đường hầm.",
          "Bạn đi vòng từ cửa a sang cửa bê, chỉ rẽ góc vuông, rồi cộng riêng các quãng Đông Tây và Bắc Nam. Thế là bạn có hai cạnh góc vuông, còn cạnh huyền chính là đường hầm.",
        ),
        nar(
          "Rồi ở mỗi cửa, dựng một tam giác nhỏ cùng hình dạng với tam giác ấy, thế là mỗi đội có một hàng cọc chỉ đúng hướng đào.",
          "Rồi ở mỗi cửa, dựng một tam giác nhỏ cùng hình dạng với tam giác ấy, thế là mỗi đội có một hàng cọc chỉ đúng hướng đào.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: tam giác vuông của Heron biến thành tam giác ABC bất kỳ, mốc C trên sườn núi nhìn thấy cả hai cửa A, B. Câu 2: đo CA, CB và góc C, hiện công thức định lý côsin tính AB. Câu 3: định lý sin tính góc A, mũi tên hướng đào. Câu 4: trang Toán 10 mở ra",
      lines: [
        nar(
          "Thế nhưng đi vòng mà toàn rẽ góc vuông thì vừa mệt vừa dễ sai. Thật ra tam giác đâu cần phải vuông, chỉ cần một mốc C nhìn thấy cả hai cửa.",
          "Thế nhưng đi vòng mà toàn rẽ góc vuông thì vừa mệt vừa dễ sai. Thật ra tam giác đâu cần phải vuông, chỉ cần một mốc xê nhìn thấy cả hai cửa.",
        ),
        nar(
          "Bạn đo hai quãng từ C tới hai cửa, cùng góc kẹp giữa chúng, rồi định lý côsin sẽ cho ngay chiều dài đường hầm AB.",
          "Bạn đo hai quãng từ xê tới hai cửa, cùng góc kẹp giữa chúng, rồi định lý cô sin sẽ cho ngay chiều dài đường hầm a bê.",
        ),
        nar(
          "Có AB rồi, định lý sin lại cho ra góc ở cửa A, tức hướng mũi đào so với đường ngắm tới C.",
          "Có a bê rồi, định lý sin lại cho ra góc ở cửa a, tức hướng mũi đào so với đường ngắm tới xê.",
        ),
        nar(
          "Nói gọn lại, đo hai cạnh và một góc ở ngoài núi là tính được hướng đào bên trong. Đó chính là Định lý côsin và Định lý sin trong Toán lớp 10.",
          "Nói gọn lại, đo hai cạnh và một góc ở ngoài núi là tính được hướng đào bên trong. Đó chính là Định lý cô sin và Định lý sin trong Toán lớp mười.",
        ),
      ],
    },
    realworld: {
      shot: "Mặt cắt eo biển Manche: Câu 1: hai máy khoan từ bờ Anh và bờ Pháp tiến vào dưới đáy biển. Câu 2: trên mặt đất, lưới tam giác đo đạc nối mốc hai bờ, vệ tinh phía trên. Câu 3: hai mũi hầm dịch vụ gặp nhau năm 1990",
      lines: [
        nar(
          "Ngày nay, đường hầm eo biển Manche nối Anh với Pháp cũng được đào từ hai phía, trong đó gần 38 km nằm dưới đáy biển.",
          "Ngày nay, đường hầm eo biển Măng sơ nối Anh với Pháp cũng được đào từ hai phía, trong đó gần ba mươi tám cây số nằm dưới đáy biển.",
        ),
        nar(
          "Người ta nối các mốc đo ở hai bờ vào cùng một lưới tam giác, rồi mới tính hướng cho từng máy khoan.",
          "Người ta nối các mốc đo ở hai bờ vào cùng một lưới tam giác, rồi mới tính hướng cho từng máy khoan.",
        ),
        nar(
          "Khi hai mũi của đường hầm dịch vụ ở giữa gặp nhau, chúng chỉ lệch có vài chục phân thôi!",
          "Khi hai mũi của đường hầm dịch vụ ở giữa gặp nhau, chúng chỉ lệch có vài chục phân thôi!",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Câu 1: Mặt Trăng xa tít phía trên. Câu 2: Berlin và Mũi Hảo Vọng là hai đầu cạnh đáy gần 10.000 km. Câu 3: hai tia ngắm cùng chụm vào Mặt Trăng thành một tam giác khổng lồ. Câu 4: quay về hai đội thợ Samos gặp nhau trong lòng núi",
      lines: [
        nar(
          "Còn nếu đích đến là Mặt Trăng, nơi không thước dây nào kéo tới được thì sao?",
          "Còn nếu đích đến là Mặt Trăng, nơi không thước dây nào kéo tới được thì sao?",
        ),
        nar(
          "Năm 1751, Lacaille ở Mũi Hảo Vọng và Lalande ở Berlin cùng ngắm Mặt Trăng, từ hai nơi cách xa nhau.",
          "Năm một nghìn bảy trăm năm mươi mốt, La cai ở Mũi Hảo Vọng và La lăng ở Béc lin cùng ngắm Mặt Trăng, từ hai nơi cách xa nhau.",
        ),
        nar(
          "Đã biết cạnh đáy và hai góc ngắm ở hai đầu, thì định lý sin sẽ cho ra khoảng cách tới Mặt Trăng. Vẫn là chiếc tam giác ấy, chỉ to hơn rất nhiều.",
          "Đã biết cạnh đáy và hai góc ngắm ở hai đầu, thì định lý sin sẽ cho ra khoảng cách tới Mặt Trăng. Vẫn là chiếc tam giác ấy, chỉ to hơn rất nhiều.",
        ),
        nar(
          "Hai đội thợ Samos đã gặp được nhau giữa lòng núi, không phải nhờ đôi mắt nhìn xuyên qua đá, mà có lẽ là nhờ một tam giác vẽ bên ngoài núi.",
          "Hai đội thợ Xa mốt đã gặp được nhau giữa lòng núi, không phải nhờ đôi mắt nhìn xuyên qua đá, mà có lẽ là nhờ một tam giác vẽ bên ngoài núi.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 7,
    week,
    theme,
    title: "Chiếc vương miện vàng & Lực đẩy Archimedes",
    hudTitle: "VƯƠNG MIỆN VÀNG CÓ PHA BẠC KHÔNG?",
    textbook: "KHTN 8 · Lực đẩy Archimedes",
    era: "Syracuse, đảo Sicily · khoảng 250 TCN",
    question: "Cùng nặng 1 kg, khi nhúng vào nước, thỏi vàng ròng hay vương miện pha bạc bị nước đẩy lên mạnh hơn?",
    sources: [
      { title: "SGK KHTN 8 Kết nối tri thức — Bài 17. Lực đẩy Archimedes", url: "https://loigiaihay.com/giai-khoa-hoc-tu-nhien-8-bai-17-luc-day-archimedes-trang-73-74-75-ket-noi-tri-thuc-a135334.html" },
      { title: "Vitruvius, De Architectura, Quyển IX — chuyện vương miện (C. Rorres, ĐH New York)", url: "https://www.math.nyu.edu/~crorres/Archimedes/Crown/Vitruvius.html" },
      { title: "Galileo, La Bilancetta (1586) — phương pháp cân trong nước (C. Rorres, ĐH New York)", url: "https://www.math.nyu.edu/~crorres/Archimedes/Crown/bilancetta.html" },
      { title: "The Golden Crown — tính chênh mực nước và chênh cân (C. Rorres, ĐH New York)", url: "https://www.math.nyu.edu/~crorres/Archimedes/Crown/CrownIntro.html" },
      { title: "MacTutor (ĐH St Andrews) — Archimedes of Syracuse", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Archimedes/" },
      { title: "SAGE Encyclopedia of Obesity — Hydrodensitometry", url: "https://sk.sagepub.com/ency/edvol/embed/obesity/chpt/hydrodensitometry" },
      { title: "NASA Science — Saturn Facts", url: "https://science.nasa.gov/saturn/facts/" },
      { title: "NASA NSSDC — Saturn Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html" },
    ],
    hook: {
      shot: "Cung điện Syracuse thế kỷ 3 TCN, vua Hiero II cầm chiếc vương miện lá vàng, người thợ kim hoàn khúm núm (câu 1–2); Milo (vai Archimedes) được gọi tới, dấu hỏi lớn trên vương miện (câu 3–4)",
      lines: [
        nar(
          "Chuyện kể rằng, hơn 2.200 năm trước, vua Hiero II của thành Syracuse đặt thợ làm chiếc vương miện vàng ròng để dâng thần.",
          "Chuyện kể rằng, hơn hai nghìn hai trăm năm trước, vua Hi ê rông thứ hai của thành Xi ra cút đặt thợ làm chiếc vương miện vàng ròng để dâng thần.",
        ),
        nar(
          "Khi giao tới, vương miện nặng đúng bằng số vàng vua đưa. Thế nhưng có lời tố rằng người thợ đã lén bớt vàng, bù vào chừng ấy bạc.",
          "Khi giao tới, vương miện nặng đúng bằng số vàng vua đưa. Thế nhưng có lời tố rằng người thợ đã lén bớt vàng, bù vào chừng ấy bạc.",
        ),
        nar(
          "Nhà vua nhờ Archimedes vạch trần chuyện này, mà đồ dâng thần thì không được nấu chảy, cũng chẳng được cưa ra.",
          "Nhà vua nhờ Ác si mét vạch trần chuyện này, mà đồ dâng thần thì không được nấu chảy, cũng chẳng được cưa ra.",
        ),
        nar(
          "Vậy làm sao biết bên trong có bạc? Nếu là bạn, bạn sẽ làm gì?",
          "Vậy làm sao biết bên trong có bạc? Nếu là bạn, bạn sẽ làm gì?",
        ),
      ],
    },
    barrier: {
      shot: "Cân khô hai bên bằng nhau tăm tắp (✖) ở câu 1; hai khối cùng nặng, khối bạc to gần gấp đôi khối vàng ở câu 2; cây thước bất lực trước những chiếc lá vàng uốn lượn (✖) ở câu 3",
      lines: [
        nar(
          "Ai cũng nghĩ ngay tới cái cân. Nhưng cân chẳng ích gì, vì bớt bao nhiêu vàng thì bù bấy nhiêu bạc, cân nặng vẫn y như cũ.",
          "Ai cũng nghĩ ngay tới cái cân. Nhưng cân chẳng ích gì, vì bớt bao nhiêu vàng thì bù bấy nhiêu bạc, cân nặng vẫn y như cũ.",
        ),
        nar(
          "Chỗ khác nhau nằm ở độ to. Hai khối to bằng nhau thì khối bạc chỉ nặng chừng nửa khối vàng, nên cùng một cân nặng, vương miện có pha bạc sẽ to hơn.",
          "Chỗ khác nhau nằm ở độ to. Hai khối to bằng nhau thì khối bạc chỉ nặng chừng nửa khối vàng, nên cùng một cân nặng, vương miện có pha bạc sẽ to hơn.",
        ),
        nar(
          "Vậy thử đo thể tích xem sao? Khổ nỗi, với hàng chục chiếc lá vàng uốn lượn, chẳng cây thước nào đo nổi.",
          "Vậy thử đo thể tích xem sao? Khổ nỗi, với hàng chục chiếc lá vàng uốn lượn, chẳng cây thước nào đo nổi.",
        ),
      ],
    },
    eureka: {
      shot: "Bồn tắm nước tràn, Milo reo EUREKA (câu 1); bình nước rộng 20 cm chỉ dâng chênh 0,4 mm, soi kính lúp (câu 2); cân đòn treo vương miện và thỏi vàng cùng 1 kg, nhúng vào chậu nước (câu 3); cán cân nghiêng về phía thỏi vàng, nhãn 13 g (câu 4)",
      lines: [
        nar(
          "Tương truyền, lời giải đến ngay trong bồn tắm. Archimedes để ý thấy mình ngâm người xuống bao nhiêu thì nước tràn ra bấy nhiêu, rồi reo lên, Eureka!",
          "Tương truyền, lời giải đến ngay trong bồn tắm. Ác si mét để ý thấy mình ngâm người xuống bao nhiêu thì nước tràn ra bấy nhiêu, rồi reo lên, Ơ rê ca!",
        ),
        nar(
          "Nhưng đong lượng nước tràn ra thì khó lắm. Kể cả vương miện bị tráo tới ba lạng bạc, thả vào một bình rộng cỡ gang tay, nước cũng chỉ dâng thêm chưa tới nửa mm.",
          "Nhưng đong lượng nước tràn ra thì khó lắm. Kể cả vương miện bị tráo tới ba lạng bạc, thả vào một bình rộng cỡ gang tay, nước cũng chỉ dâng thêm chưa tới nửa mi li mét.",
        ),
        nar(
          "Năm 1586, Galileo đoán rằng Archimedes đã dùng một chiếc cân. Cứ treo vương miện ở một đầu, thỏi vàng nặng y hệt ở đầu kia, rồi nhúng cả hai vào nước.",
          "Năm một nghìn năm trăm tám mươi sáu, Ga li lê đoán rằng Ác si mét đã dùng một chiếc cân. Cứ treo vương miện ở một đầu, thỏi vàng nặng y hệt ở đầu kia, rồi nhúng cả hai vào nước.",
        ),
        nar(
          "Cân nghiêng ngay về phía thỏi vàng. Vương miện to hơn nên bị nước đẩy lên mạnh hơn. Nó có pha bạc!",
          "Cân nghiêng ngay về phía thỏi vàng. Vương miện to hơn nên bị nước đẩy lên mạnh hơn. Nó có pha bạc!",
        ),
      ],
    },
    theorem: {
      shot: "Cận cảnh chậu nước: mũi tên lực đẩy hướng lên dưới vương miện dài hơn dưới thỏi vàng (câu 1); khối nước 13 cm³ tách ra đặt lên đĩa cân 13 g (câu 2); trang KHTN 8 mở ra, công thức FA = d · V (câu 3)",
      lines: [
        nar(
          "Vì sao nước lại thiên vị như thế? Đó là vì vật chìm trong nước luôn bị đẩy lên một lực, đúng bằng trọng lượng của phần nước mà nó chiếm chỗ.",
          "Vì sao nước lại thiên vị như thế? Đó là vì vật chìm trong nước luôn bị đẩy lên một lực, đúng bằng trọng lượng của phần nước mà nó chiếm chỗ.",
        ),
        nar(
          "Vương miện chiếm chỗ nhiều hơn thỏi vàng chừng 13 cm³ nước, nên được nước nâng thêm chừng 13 gam.",
          "Vương miện chiếm chỗ nhiều hơn thỏi vàng chừng mười ba xen ti mét khối nước, nên được nước nâng thêm chừng mười ba gam.",
        ),
        nar(
          "Lực ấy chính là lực đẩy Archimedes mà bạn đã học ở lớp 8. Nói gọn lại, vật chiếm chỗ trong nước càng nhiều thì bị đẩy lên càng mạnh.",
          "Lực ấy chính là lực đẩy Ác si mét mà bạn đã học ở lớp tám. Nói gọn lại, vật chiếm chỗ trong nước càng nhiều thì bị đẩy lên càng mạnh.",
        ),
      ],
    },
    realworld: {
      shot: "Phòng thí nghiệm thể thao: Milo (vai kỹ thuật viên) cân một vận động viên trên cạn, rồi cân khi người đó ngồi ghế treo chìm hẳn trong bể nước (câu 1–2); hai khối cùng nặng, khối mỡ to hơn khối cơ (câu 3)",
      lines: [
        nar(
          "Mẹo cân trong nước ấy ngày nay vẫn được dùng để đo tỉ lệ mỡ trong cơ thể, gọi là phép cân thủy tĩnh.",
          "Mẹo cân trong nước ấy ngày nay vẫn được dùng để đo tỉ lệ mỡ trong cơ thể, gọi là phép cân thủy tĩnh.",
        ),
        nar(
          "Bạn được cân trên cạn, rồi cân lại khi đã chìm hẳn trong bể. Hai lần cân chênh nhau bao nhiêu thì cơ thể đã chiếm chỗ chừng ấy nước.",
          "Bạn được cân trên cạn, rồi cân lại khi đã chìm hẳn trong bể. Hai lần cân chênh nhau bao nhiêu thì cơ thể đã chiếm chỗ chừng ấy nước.",
        ),
        nar(
          "Hai khối to bằng nhau thì mỡ nhẹ hơn cơ hay xương. Nên nếu cùng cân nặng, người nhiều mỡ sẽ to hơn, bị đẩy lên mạnh hơn, và cân dưới nước thì nhẹ hơn.",
          "Hai khối to bằng nhau thì mỡ nhẹ hơn cơ hay xương. Nên nếu cùng cân nặng, người nhiều mỡ sẽ to hơn, bị đẩy lên mạnh hơn, và cân dưới nước thì nhẹ hơn.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Sao Thổ đặt cạnh 95 quả Trái Đất trên đĩa cân (câu 1); số 0,69 g/cm³ so với nước (câu 2); Sao Thổ nổi lềnh bềnh trong một bồn tắm khổng lồ (câu 3); kết: thu về chậu nước, chiếc cân và vương miện nguyên vẹn (câu 4)",
      lines: [
        nar(
          "Thử đem phép so ấy ra vũ trụ. Sao Thổ nặng gấp khoảng 95 lần Trái Đất.",
          "Thử đem phép so ấy ra vũ trụ. Sao Thổ nặng gấp khoảng chín mươi lăm lần Trái Đất.",
        ),
        nar(
          "Vậy mà nó to đến mức, khối lượng riêng trung bình còn nhỏ hơn cả nước!",
          "Vậy mà nó to đến mức, khối lượng riêng trung bình còn nhỏ hơn cả nước!",
        ),
        nar(
          "Mà vật như thế thì đều nổi trên nước. Nên NASA mới nói vui rằng, nếu có một bồn tắm đủ lớn, Sao Thổ sẽ lềnh bềnh trên mặt nước.",
          "Mà vật như thế thì đều nổi trên nước. Nên Na sa mới nói vui rằng, nếu có một bồn tắm đủ lớn, Sao Thổ sẽ lềnh bềnh trên mặt nước.",
        ),
        nar(
          "Còn để bắt quả tang người thợ năm xưa, chỉ cần một chiếc cân với một chậu nước, mà vương miện vẫn nguyên vẹn.",
          "Còn để bắt quả tang người thợ năm xưa, chỉ cần một chiếc cân với một chậu nước, mà vương miện vẫn nguyên vẹn.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 8,
    week,
    theme,
    title: "Đường cong nhanh nhất: vì sao máng thẳng không về đích trước?",
    hudTitle: "ĐƯỜNG THẲNG CÓ PHẢI NHANH NHẤT?",
    textbook: "Vật lí 10 · Định luật bảo toàn cơ năng",
    era: "Châu Âu · Lời thách đố năm 1696",
    question: "Vì sao máng cong dốc đứng lúc đầu lại thắng máng thẳng ngắn hơn?",
    sources: [
      { title: "MacTutor (ĐH St Andrews) — The brachistochrone problem", url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Brachistochrone/" },
      { title: "MacTutor (ĐH St Andrews) — Christiaan Huygens", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Huygens/" },
      { title: "Linda Hall Library — Scientist of the Day: Christiaan Huygens", url: "https://www.lindahall.org/about/news/scientist-of-the-day/christian-huygens/" },
      { title: "Klotz, The Gravity Tunnel in a Non-Uniform Earth, Am. J. Phys. 83, 231 (2015)", url: "https://arxiv.org/abs/1308.1342" },
      { title: "Vật lí 10 Kết nối tri thức — Bài 26: Cơ năng và định luật bảo toàn cơ năng", url: "https://www.vietjack.com/vat-li-10-kn/ly-thuyet-bai-26-co-nang-va-dinh-luat-bao-toan-co-nang.jsp" },
    ],
    hook: {
      shot: "Điểm A trên cao và điểm B thấp hơn lệch sang bên, ba máng trượt trống chờ viên bi (câu 1); Milo vai Johann Bernoulli cầm tờ tạp chí năm 1696 (câu 2); viên bi đặt ở A, máng thẳng gắn dấu hỏi (câu 3)",
      lines: [
        nar(
          "Thả viên bi từ điểm A trên cao xuống điểm B thấp hơn. Phải uốn máng thành hình gì thì bi mới về đích nhanh nhất?",
          "Thả viên bi từ điểm A trên cao xuống điểm Bê thấp hơn. Phải uốn máng thành hình gì thì bi mới về đích nhanh nhất?",
        ),
        nar(
          "Năm 1696, Bernoulli đem đúng câu hỏi này ra thách đố giới toán học châu Âu.",
          "Năm một nghìn sáu trăm chín mươi sáu, Béc nu li đem đúng câu hỏi này ra thách đố giới toán học châu Âu.",
        ),
        nar(
          "Bạn đoán là đường thẳng, vì nó ngắn nhất? Vậy mà nó không về nhất đâu.",
          "Bạn đoán là đường thẳng, vì nó ngắn nhất? Vậy mà nó không về nhất đâu.",
        ),
      ],
    },
    barrier: {
      shot: "Máng thẳng A–B dốc đều thoai thoải, bi bò chậm (✖) ở câu 1; máng gãy rơi thẳng đứng rồi chạy ngang, bi nhanh nhưng đường quá dài (✖) ở câu 2; Galileo 1638 vẽ cung tròn, gắn dấu hỏi ở câu 3",
      lines: [
        nar(
          "Đường thẳng đúng là ngắn nhất, nhưng nó dốc thoai thoải suốt cả quãng, nên bi tăng tốc chậm.",
          "Đường thẳng đúng là ngắn nhất, nhưng nó dốc thoai thoải suốt cả quãng, nên bi tăng tốc chậm.",
        ),
        nar(
          "Vậy cho bi rơi thẳng đứng trước, rồi mới chạy ngang thì sao? Nhanh thật, nhưng quãng đường lại dài ra quá nhiều.",
          "Vậy cho bi rơi thẳng đứng trước, rồi mới chạy ngang thì sao? Nhanh thật, nhưng quãng đường lại dài ra quá nhiều.",
        ),
        nar(
          "Ngay cả Galileo cũng từng đoán nhầm rằng cung tròn là nhanh nhất.",
          "Ngay cả Ga li lê cũng từng đoán nhầm rằng cung tròn là nhanh nhất.",
        ),
      ],
    },
    eureka: {
      shot: "Tia sáng bẻ hướng qua các lớp (câu 1); chồng lên là các lớp mỏng nằm ngang, viên bi bẻ hướng qua từng lớp và vẽ ra đường cycloid (câu 2); bánh xe lăn với một điểm đỏ trên vành vạch đúng đường ấy, bi trên máng cycloid về B trước (câu 3); góc khung: Newton bên ngọn nến, đồng hồ chỉ 4 giờ sáng (câu 4)",
      lines: [
        nar(
          "Bernoulli nảy ra một ý bất ngờ, là coi viên bi như tia sáng. Ánh sáng đi qua những lớp mà nó lúc nhanh lúc chậm, luôn tự bẻ hướng để tới đích sớm nhất.",
          "Béc nu li nảy ra một ý bất ngờ, là coi viên bi như tia sáng. Ánh sáng đi qua những lớp mà nó lúc nhanh lúc chậm, luôn tự bẻ hướng để tới đích sớm nhất.",
        ),
        nar(
          "Mà viên bi thì càng xuống sâu càng nhanh. Cứ cho bi bẻ hướng như thế qua vô số lớp mỏng, thế là Bernoulli tìm ra đường cycloid.",
          "Mà viên bi thì càng xuống sâu càng nhanh. Cứ cho bi bẻ hướng như thế qua vô số lớp mỏng, thế là Béc nu li tìm ra đường xi cờ lô ít.",
        ),
        nar(
          "Đó là đường mà một điểm trên vành bánh xe vạch ra khi bánh xe lăn. Nó dốc đứng lúc đầu cho bi lấy đà, rồi mới thoải dần tới điểm B.",
          "Đó là đường mà một điểm trên vành bánh xe vạch ra khi bánh xe lăn. Nó dốc đứng lúc đầu cho bi lấy đà, rồi mới thoải dần tới điểm Bê.",
        ),
        nar(
          "Còn Newton, theo chuyện kể lại, nhận được đề bài lúc vừa đi làm về, thức tới bốn giờ sáng thì đã giải xong.",
          "Còn Niu tơn, theo chuyện kể lại, nhận được đề bài lúc vừa đi làm về, thức tới bốn giờ sáng thì đã giải xong.",
        ),
      ],
    },
    theorem: {
      shot: "Trang Vật lí 10 mở ra (câu 1); viên bi ở độ sâu h dưới điểm thả trên ba máng khác nhau, cả ba đều có cùng tốc độ v, công thức mgh = ½mv² → v = √(2gh) ở Tầng 2B (câu 2); bi trên máng cycloid vượt lên sớm (câu 3)",
      lines: [
        nar(
          "Nhưng vì sao xuống càng sâu, bi lại càng nhanh? Đó là nhờ định luật bảo toàn cơ năng trong Vật lí 10 đấy.",
          "Nhưng vì sao xuống càng sâu, bi lại càng nhanh? Đó là nhờ định luật bảo toàn cơ năng trong Vật lí lớp mười đấy.",
        ),
        nar(
          "Nếu coi bi trượt không ma sát, thì thế năng mất bao nhiêu sẽ thành động năng bấy nhiêu. Nên cứ xuống tới cùng một độ sâu, bi luôn đạt cùng một tốc độ, dù máng uốn kiểu gì.",
          "Nếu coi bi trượt không ma sát, thì thế năng mất bao nhiêu sẽ thành động năng bấy nhiêu. Nên cứ xuống tới cùng một độ sâu, bi luôn đạt cùng một tốc độ, dù máng uốn kiểu gì.",
        ),
        nar(
          "Nói cách khác, máng nào cho bi xuống sâu sớm thì bi sớm chạy nhanh. Đường cycloid vừa cho bi xuống sâu sớm, vừa không bắt bi đi quá xa.",
          "Nói cách khác, máng nào cho bi xuống sâu sớm thì bi sớm chạy nhanh. Đường xi cờ lô ít vừa cho bi xuống sâu sớm, vừa không bắt bi đi quá xa.",
        ),
      ],
    },
    realworld: {
      shot: "Ba viên bi thả ở ba độ cao khác nhau trên máng cycloid cùng chạm đáy một lúc (câu 1–3); chuyển sang đồng hồ quả lắc Huygens năm 1673 với hai má kim loại cong hình cycloid kẹp dây treo (câu 4)",
      lines: [
        nar(
          "Và đây mới là chỗ thú vị. Bernoulli sững sờ khi thấy Huygens đã dùng chính đường cong này từ trước.",
          "Và đây mới là chỗ thú vị. Béc nu li sững sờ khi thấy Huy ghen đã dùng chính đường cong này từ trước.",
        ),
        nar(
          "Trên máng cycloid, thả cùng lúc mấy viên bi ở những độ cao khác nhau, chúng sẽ tới đáy cùng lúc. Nghe vô lý, đúng không?",
          "Trên máng xi cờ lô ít, thả cùng lúc mấy viên bi ở những độ cao khác nhau, chúng sẽ tới đáy cùng lúc. Nghe vô lý, đúng không?",
        ),
        nar(
          "Bí mật là thả càng cao thì đoạn đầu càng dốc, bi lao càng nhanh, vừa đủ bù cho quãng đường dài hơn.",
          "Bí mật là thả càng cao thì đoạn đầu càng dốc, bi lao càng nhanh, vừa đủ bù cho quãng đường dài hơn.",
        ),
        nar(
          "Nhờ tính chất ấy, Huygens làm đồng hồ quả lắc có hai má cong hình cycloid kẹp hai bên dây treo. Thế là quả lắc dù đưa rộng hay hẹp thì mỗi nhịp vẫn dài như nhau.",
          "Nhờ tính chất ấy, Huy ghen làm đồng hồ quả lắc có hai má cong hình xi cờ lô ít kẹp hai bên dây treo. Thế là quả lắc dù đưa rộng hay hẹp thì mỗi nhịp vẫn dài như nhau.",
        ),
      ],
    },
    cosmic: {
      shot: "Cắt đôi Trái Đất: hầm thẳng Hà Nội – TP Hồ Chí Minh nông, 42 phút (câu 1–2); hầm cong cùng họ cycloid chúi sâu khoảng 360 km, 14 phút (câu 3); kết: thu nhỏ về viên bi lao dốc trên máng cycloid ở đầu tập (câu 4)",
      lines: [
        nar(
          "Còn nếu phóng bài toán lên tầm cả một hành tinh thì sao? Giả sử ta đào một đường hầm xuyên lòng đất từ Hà Nội tới TP Hồ Chí Minh, rồi thả vào đó một toa tàu không động cơ.",
          "Còn nếu phóng bài toán lên tầm cả một hành tinh thì sao? Giả sử ta đào một đường hầm xuyên lòng đất từ Hà Nội tới Thành phố Hồ Chí Minh, rồi thả vào đó một toa tàu không động cơ.",
        ),
        nar(
          "Trên lý thuyết, nếu coi Trái Đất đặc đều và không có ma sát, toa tàu đi hầm thẳng mất chừng 42 phút.",
          "Trên lý thuyết, nếu coi Trái Đất đặc đều và không có ma sát, toa tàu đi hầm thẳng mất chừng bốn mươi hai phút.",
        ),
        nar(
          "Còn hầm nhanh nhất lại là đường cong cùng họ với cycloid, chúi xuống thật sâu rồi mới vòng lên, chỉ mất chừng 14 phút.",
          "Còn hầm nhanh nhất lại là đường cong cùng họ với xi cờ lô ít, chúi xuống thật sâu rồi mới vòng lên, chỉ mất chừng mười bốn phút.",
        ),
        nar(
          "Từ chiếc máng nhỏ tới hầm xuyên Trái Đất, bí quyết vẫn chỉ có một. Muốn viên bi về đích sớm, hãy cho nó lao dốc thật sớm.",
          "Từ chiếc máng nhỏ tới hầm xuyên Trái Đất, bí quyết vẫn chỉ có một. Muốn viên bi về đích sớm, hãy cho nó lao dốc thật sớm.",
        ),
      ],
    },
  }),
];
