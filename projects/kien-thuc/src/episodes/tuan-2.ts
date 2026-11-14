/**
 * Tuần 2 "Thiên Đường Kiến Thức": 5 chủ đề điểm cao nhất trong bảng chấm
 * (research_notes/Thiên đường kiến thức/kho-chu-de-va-xu-huong.md, mục 7).
 * Tập 9 và 11 theo định dạng "Tin được hay Tin đồn?" (hồi cuối kết bằng phán quyết).
 */
import { makeEpisode, nar } from "./make.ts";

const week = 2;
const theme = "Nghịch lý & Tin đồn khoa học";

export const TUAN_2 = [
  makeEpisode({
    day: 7,
    week,
    theme,
    title: "Ngàn tiến sĩ nói cô ấy sai: đổi cửa hay giữ?",
    hudTitle: "NGÀN TIẾN SĨ NÓI CÔ ẤY SAI",
    textbook: "Toán 12 · Xác suất có điều kiện",
    era: "Hoa Kỳ · năm 1990",
    question: "Đố bạn: có 4 cửa, người dẫn biết chỗ có dê và mở 2 cửa có dê. Nếu đổi sang cửa còn đóng kia, bạn thắng với xác suất bao nhiêu?",
    sources: [
      { title: "SGK Toán 12 Kết nối tri thức — Bài 18. Xác suất có điều kiện (loigiaihay)", url: "https://loigiaihay.com/bai-18-xac-suat-co-dieu-kien-toan-12-ket-noi-tri-thuc-e35964.html" },
      { title: "Mục lục SGK Toán 12 Kết nối tri thức — Chương VI. Xác suất có điều kiện (loigiaihay)", url: "https://loigiaihay.com/sgk-toan-12-ket-noi-tri-thuc-c1783.html" },
      { title: "Steven Pinker, Behavioral Scientist — Why You Should Always Switch: The Monty Hall Problem (trích sách Rationality)", url: "https://behavioralscientist.org/steven-pinker-rationality-why-you-should-always-switch-the-monty-hall-problem-finally-explained/" },
      { title: "Tom Rocks Maths (ĐH Oxford) — The Origins of the Monty Hall Problem", url: "https://tomrocksmaths.com/2021/02/27/monty-hall-origins" },
      { title: "National Cancer Institute — Cancer Screening Overview (PDQ), Patient Version", url: "https://www.cancer.gov/about-cancer/screening/patient-screening-overview-pdq" },
      { title: "Stone, Keller, Kratzke, Strumpfer — Search for the Wreckage of Air France Flight AF 447, Statistical Science 29(1), 2014", url: "https://arxiv.org/abs/1405.4720" },
      { title: "MIT Technology Review — How Statisticians Found Air France Flight 447 Two Years After It Crashed Into the Atlantic", url: "https://www.technologyreview.com/2014/05/27/13283/how-statisticians-found-air-france-flight-447-two-years-after-it-crashed-into-atlantic/" },
    ],
    hook: {
      shot: "Sân khấu giấy da dựng thành trường quay truyền hình kiểu Mỹ thập niên 1990: ba cánh cửa gỗ lớn đánh số 1, 2, 3. Milo (vai người chơi) đứng giữa, sau lưng là trang tạp chí PARADE 1990 bay vào, có cột 'Ask Marilyn' gạch chân dòng 'NÊN ĐỔI CỬA'. Hàng nghìn phong bì thư đổ ào xuống như mưa, con số '~1.000 TIẾN SĨ' đóng dấu đỏ. Chuyển: Milo chỉ vào cửa 1 (khung sáng vàng); người dẫn chương trình (bóng đen đeo nơ, tay cầm thẻ ghi 'TÔI BIẾT CHỖ CÓ DÊ') mở cửa 3, một con dê ló đầu ra kêu. Bảng gỗ bật lên giữa màn hình: 'ĐỔI? / GIỮ?' kèm mũi tên chỉ xuống ô bình luận.",
      lines: [
        nar(
          "Năm 1990, Marilyn vos Savant viết trên tạp chí Parade: trong câu đố ba cánh cửa, đổi cửa thì thắng gấp đôi. Khoảng 1.000 tiến sĩ viết thư bảo cô ấy sai.",
          "Năm một nghìn chín trăm chín mươi, Ma-ri-lin vốt Xa-văng viết trên tạp chí Pa-rết: trong câu đố ba cánh cửa, đổi cửa thì thắng gấp đôi. Khoảng một nghìn tiến sĩ viết thư bảo cô ấy sai.",
        ),
        nar(
          "Đề như sau: một cửa có xe, hai cửa có dê. Bạn chọn một cửa. Người dẫn biết chỗ có dê, luôn mở một cửa còn lại có dê, rồi mời bạn đổi.",
          "Đề như sau: một cửa có xe, hai cửa có dê. Bạn chọn một cửa. Người dẫn biết chỗ có dê, luôn mở một cửa còn lại có dê, rồi mời bạn đổi.",
        ),
        nar(
          "Bạn chọn đổi hay giữ? Ghi vào bình luận trước khi xem tiếp!",
          "Bạn chọn đổi hay giữ? Ghi vào bình luận trước khi xem tiếp!",
        ),
      ],
    },
    barrier: {
      shot: "Núi thư chất cao sau lưng Milo; vài lá thư bung ra, hiện dòng viết tay 'CÒN 2 CỬA → 50/50!' và chữ ký 'Ph.D.'. Hai cửa còn đóng (1 và 2) hiện nhãn '50%' và '50%' rung rinh, rồi một dấu ✖ đỏ lớn đóng lên hai nhãn đó. Chân dung khắc gỗ của nhà toán học Paul Erdős khoanh tay lắc đầu, nhãn 'KHÔNG TIN'. Chuyển: một chiếc máy tính đời cũ màn hình xanh hiện bộ đếm số ván chạy vùn vụt.",
      lines: [
        nar(
          "Theo nhà tâm lý học Steven Pinker kể lại, cả thảy chừng 10.000 lá thư đổ về, phần lớn khẳng định cô ấy sai.",
          "Theo nhà tâm lý học Xti-vơn Pinh-cơ kể lại, cả thảy chừng mười nghìn lá thư đổ về, phần lớn khẳng định cô ấy sai.",
        ),
        nar(
          "Lý lẽ nghe rất xuôi: còn hai cửa đóng, xe ở một trong hai, vậy mỗi cửa năm mươi phần trăm.",
          "Lý lẽ nghe rất xuôi: còn hai cửa đóng, xe ở một trong hai, vậy mỗi cửa năm mươi phần trăm.",
        ),
        nar(
          "Ngay cả nhà toán học lừng danh Paul Erdős cũng phản đối, và chỉ chịu tin khi xem trò chơi được mô phỏng lặp đi lặp lại.",
          "Ngay cả nhà toán học lừng danh Pôn Ẹc-đốt cũng phản đối, và chỉ chịu tin khi xem trò chơi được mô phỏng lặp đi lặp lại.",
        ),
      ],
    },
    eureka: {
      shot: "Camera lùi xa: ba cửa nhân lên thành một bức tường 100 cánh cửa nhỏ xếp 10 × 10. Milo dán ngôi sao vàng lên cửa số 1, nhãn '1%'. Người dẫn đi dọc tường, bật mở liền 98 cửa, con dê nào cũng ló đầu ra (hiệu ứng domino), chỉ chừa cửa số 73 đóng, nhãn '99%' phát sáng. Milo đeo kính đồng thau, há hốc mồm. Chuyển cảnh thu về 3 cửa: nhãn '1/3' trên cửa đã chọn, '2/3' trên cửa còn lại. Cuối cùng một bảng tính điểm như bảng phấn: 'GIỮ: ~100 ván thắng' và 'ĐỔI: ~200 ván thắng' trên '300 VÁN', vạch đếm chạy tăng dần.",
      lines: [
        nar(
          "Mẹo là phóng to lên 100 cửa. Bạn chọn một cửa, người dẫn biết hết, mở liền 98 cửa có dê, chỉ chừa lại đúng một cửa.",
          "Mẹo là phóng to lên một trăm cửa. Bạn chọn một cửa, người dẫn biết hết, mở liền chín mươi tám cửa có dê, chỉ chừa lại đúng một cửa.",
        ),
        nar(
          "Cửa bạn chọn lúc đầu chỉ có 1 phần trăm cơ hội. Cửa người dẫn cố tình chừa lại gom trọn 99 phần trăm kia!",
          "Cửa bạn chọn lúc đầu chỉ có một phần trăm cơ hội. Cửa người dẫn cố tình chừa lại gom trọn chín mươi chín phần trăm kia!",
        ),
        nar(
          "Ba cửa cũng vậy: giữ thắng 1/3, đổi thắng 2/3. Chơi 300 ván, người giữ thắng chừng 100 ván, người đổi thắng chừng 200 ván.",
          "Ba cửa cũng vậy: giữ thắng một phần ba, đổi thắng hai phần ba. Chơi ba trăm ván, người giữ thắng chừng một trăm ván, người đổi thắng chừng hai trăm ván.",
        ),
      ],
    },
    theorem: {
      shot: "Bảng cây ba nhánh mọc ra từ dưới sàn: 'XE Ở CỬA 1 · 1/3', 'XE Ở CỬA 2 · 1/3', 'XE Ở CỬA 3 · 1/3'. Nhánh cửa 1 tách đôi 'MỞ 2: 1/2' và 'MỞ 3: 1/2'; nhánh cửa 2 chỉ có một mũi tên đậm 'BẮT BUỘC MỞ 3'; nhánh cửa 3 mờ đi vì không thể mở 3. Milo (vai học giả, tay cầm phấn) khoanh hai nhánh có 'MỞ 3': 1/6 và 1/3, cộng lại 1/2. Công thức mọc ra từ hình ở tầng dưới: P(A|B) = P(A∩B) : P(B), rồi hai dòng '1/6 : 1/2 = 1/3' và '1/3 : 1/2 = 2/3'. Cuối hồi, mép một cuốn vở Toán 12 hiện dòng 'Xác suất có điều kiện'.",
      lines: [
        nar(
          "Chìa khóa là người dẫn không mở bừa. Xe ở cửa bạn chọn thì anh ta mở cửa nào cũng được; nếu không, anh ta buộc phải chừa đúng cửa có xe.",
          "Chìa khóa là người dẫn không mở bừa. Xe ở cửa bạn chọn thì anh ta mở cửa nào cũng được; nếu không, anh ta buộc phải chừa đúng cửa có xe.",
        ),
        nar(
          "Bạn chọn cửa 1, người dẫn mở cửa 3. Khi đã biết vậy, xe ở cửa 1 có xác suất 1/6 chia 1/2, tức 1/3; ở cửa 2 là 1/3 chia 1/2, tức 2/3.",
          "Bạn chọn cửa một, người dẫn mở cửa ba. Khi đã biết vậy, xe ở cửa một có xác suất một phần sáu chia một phần hai, tức một phần ba; ở cửa hai là một phần ba chia một phần hai, tức hai phần ba.",
        ),
        nar(
          "Đó là xác suất có điều kiện mà bạn học trong Toán lớp 12: xác suất của A khi biết B bằng xác suất cả A lẫn B chia xác suất của B.",
          "Đó là xác suất có điều kiện mà bạn học trong Toán lớp mười hai: xác suất của a khi biết bê bằng xác suất cả a lẫn bê chia xác suất của bê.",
        ),
      ],
    },
    realworld: {
      shot: "Chuyển sang phòng xét nghiệm: Milo mặc áo blouse trắng (vai kỹ thuật viên) đứng trước bảng 1.000 hình người tí hon xếp ô vuông. Một hình người tô đỏ (người bệnh) gắn nhãn '+'; thêm 10 hình người xanh rải rác cũng nhấp nháy nhãn '+' kèm chữ 'BÁO NHẦM'. Vòng tròn gom 11 dấu '+' lại, phân số '1/11 ≈ 9%' bật lên. Góc màn hình hiện dòng chữ nhỏ 'Ví dụ giả định'. Cuối cảnh, một ống nghiệm thứ hai được đặt lên khay, nhãn 'XÉT NGHIỆM THÊM'.",
      lines: [
        nar(
          "Cùng phép tính ấy có trong phòng xét nghiệm. Giả sử một bệnh gặp ở 1 trong 1.000 người, xét nghiệm luôn phát hiện người bệnh, nhưng báo nhầm 1 trong 100 người khỏe.",
          "Cùng phép tính ấy có trong phòng xét nghiệm. Giả sử một bệnh gặp ở một trong một nghìn người, xét nghiệm luôn phát hiện người bệnh, nhưng báo nhầm một trong một trăm người khỏe.",
        ),
        nar(
          "Trong 1.000 người: 1 người bệnh dương tính, chừng 10 người khỏe bị báo nhầm. Biết mình dương tính, khả năng bệnh thật chỉ khoảng 1 phần 11.",
          "Trong một nghìn người: một người bệnh dương tính, chừng mười người khỏe bị báo nhầm. Biết mình dương tính, khả năng bệnh thật chỉ khoảng một phần mười một.",
        ),
        nar(
          "Theo Viện Ung thư Quốc gia Hoa Kỳ, xét nghiệm sàng lọc có thể báo bất thường dù không có bệnh, nên thường phải làm thêm xét nghiệm.",
          "Theo Viện Ung thư Quốc gia Hoa Kỳ, xét nghiệm sàng lọc có thể báo bất thường dù không có bệnh, nên thường phải làm thêm xét nghiệm.",
        ),
      ],
    },
    cosmic: {
      shot: "Camera bay vút ra xa: bản đồ giấy da Đại Tây Dương giữa Brazil và châu Phi, dấu chấm đỏ 'VỊ TRÍ CUỐI · 1/6/2009', vòng tròn bán kính 40 hải lý chia ô lưới phủ màu đậm nhạt như bản đồ nhiệt. Bốn mảng ô lần lượt được tô sọc 'ĐÃ DÒ · HỤT' và nhạt màu đi, trong khi một vùng khác đậm dần lên (giống cửa người dẫn chừa lại phát sáng). Milo (vai nhà thám hiểm biển, đội mũ phao) thả robot lặn xuống đúng ô đậm nhất; đèn pha soi thấy mảnh thân máy bay dưới đáy, nhãn 'HƠN 4.000 M · 4/2011 · 1 TUẦN'. Kết: camera kéo ngược về trường quay, ba cánh cửa hiện lại, cánh cửa người dẫn chừa lại sáng lên vàng ánh, Milo đặt tay lên tay nắm cửa.",
      lines: [
        nar(
          "Giờ phóng ra Đại Tây Dương. Năm 2009, chuyến bay Air France 447 mang 228 người rơi xuống biển; bốn đợt tìm kiếm gần hai năm đều trắng tay.",
          "Giờ phóng ra Đại Tây Dương. Năm hai nghìn không trăm linh chín, chuyến bay E Phờ-răng bốn bốn bảy mang hai trăm hai mươi tám người rơi xuống biển; bốn đợt tìm kiếm gần hai năm đều trắng tay.",
        ),
        nar(
          "Nhóm chuyên gia Metron coi mỗi lần tìm hụt là thông tin mới, như người dẫn mở một cửa có dê: vùng đã dò hạ xác suất, vùng chưa dò tăng lên.",
          "Nhóm chuyên gia Mê-trôn coi mỗi lần tìm hụt là thông tin mới, như người dẫn mở một cửa có dê: vùng đã dò hạ xác suất, vùng chưa dò tăng lên.",
        ),
        nar(
          "Tháng 4 năm 2011, chỉ sau một tuần dò theo bản đồ mới, xác máy bay hiện ra ở độ sâu hơn 4.000 mét. Lần sau gặp hai cửa đóng, hãy nhớ cánh cửa người dẫn cố tình chừa lại.",
          "Tháng tư năm hai nghìn không trăm mười một, chỉ sau một tuần dò theo bản đồ mới, xác máy bay hiện ra ở độ sâu hơn bốn nghìn mét. Lần sau gặp hai cửa đóng, hãy nhớ cánh cửa người dẫn cố tình chừa lại.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 8,
    week,
    theme,
    title: "Thả búa và lông chim trên Mặt Trăng: cái nào chạm đất trước?",
    hudTitle: "BÚA HAY LÔNG CHIM CHẠM ĐẤT TRƯỚC?",
    textbook: "Vật lí 10 · Sự rơi tự do",
    era: "Mặt Trăng, vùng Hadley · 2/8/1971",
    question: "Nếu hút sạch không khí trong phòng bạn rồi thả cùng lúc một quả bóng bàn và một quả tạ, cái nào chạm sàn trước?",
    sources: [
      { title: "SGK Vật lí 10 Kết nối tri thức — Bài 10. Sự rơi tự do, phần khởi động trang 44 (VietJack)", url: "https://vietjack.com/vat-li-10-kn/khoi-dong-trang-44-vat-li-10.jsp" },
      { title: "NASA NSSDC — The Apollo 15 Hammer-Feather Drop", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html" },
      { title: "NASA Science — The Apollo 15 Hammer-Feather Drop", url: "https://science.nasa.gov/resource/the-apollo-15-hammer-feather-drop/" },
      { title: "Apollo Lunar Surface Journal — Apollo 15 EVA-3 Closeout, 167:22", url: "https://www.apollojournals.org/alsj/a15/a15.clsout3.html" },
      { title: "NASA — Apollo 15 mission", url: "https://www.nasa.gov/mission/apollo-15/" },
      { title: "NASA NSSDC — Moon Fact Sheet", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html" },
      { title: "Stanford Encyclopedia of Philosophy — Galileo Galilei", url: "https://plato.stanford.edu/entries/galileo/" },
      { title: "MacTutor (ĐH St Andrews) — Galileo Galilei", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Galileo/" },
      { title: "Linda Hall Library — Scientist of the Day: Vincenzo Viviani", url: "https://www.lindahall.org/about/news/scientist-of-the-day/vincenzo-viviani/" },
      { title: "Museo Galileo — Inclined plane", url: "https://catalogue.museogalileo.it/object/InclinedPlane.html" },
      { title: "NASA Glenn — Reduced Gravity Drop Towers", url: "https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/reduced-gravity-drop-towers-and-test-rigs" },
      { title: "NASA — What Is Microgravity?", url: "https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/" },
    ],
    hook: {
      shot: "Mở thẳng vào cận cảnh hai bàn tay găng trắng của phi hành gia: tay phải cầm chiếc búa địa chất bằng nhôm, tay trái cầm một chiếc lông chim ưng dài; nền là bụi xám Mặt Trăng, bầu trời đen, mô-đun đổ bộ Falcon và xe tự hành phía xa. Lùi ra: Milo trong bộ đồ du hành, kính đồng thau gài trên mũ (vai David Scott), đứng ở vùng Hadley; thẻ ngày '2/8/1971 · APOLLO 15' đóng dấu xuống góc giấy da. Câu 3: hình đóng băng ngay khoảnh khắc buông tay, Milo quay ra giơ tấm bảng ba ô 'BÚA? · LÔNG CHIM? · CÙNG LÚC?', mũi tên nhấp nháy chỉ xuống khung bình luận.",
      lines: [
        nar(
          "Thả cùng lúc một chiếc búa và một chiếc lông chim, cái nào chạm đất trước? Ai cũng đáp ngay: chiếc búa!",
          "Thả cùng lúc một chiếc búa và một chiếc lông chim, cái nào chạm đất trước? Ai cũng đáp ngay: chiếc búa!",
        ),
        nar(
          "Ngày 2/8/1971, phi hành gia David Scott của Apollo 15 đã làm đúng phép thử ấy trên Mặt Trăng, ngay trước ống kính máy quay.",
          "Ngày hai tháng tám năm một nghìn chín trăm bảy mươi mốt, phi hành gia Đây-vít Xcốt của A-pô-lô mười lăm đã làm đúng phép thử ấy trên Mặt Trăng, ngay trước ống kính máy quay.",
        ),
        nar(
          "Bạn cược búa, lông chim, hay cả hai chạm đất cùng lúc? Ghi vào bình luận trước khi xem tiếp!",
          "Bạn cược búa, lông chim, hay cả hai chạm đất cùng lúc? Ghi vào bình luận trước khi xem tiếp!",
        ),
      ],
    },
    barrier: {
      shot: "Chuyển về sân Trái Đất: Milo (áo sơ mi xanh, ghi-lê rêu) thả cùng lúc một hòn đá và một chiếc lá; hòn đá rơi thẳng 'cộp', chiếc lá chao lượn mãi; tờ giấy thả sau cũng lượn lờ. Chuyển cảnh lật trang giấy da sang Athens cổ: Milo (vai Aristotle, áo choàng trắng) viết lên cuộn giấy dòng chữ 'NẶNG GẤP ĐÔI → RƠI NHANH GẤP ĐÔI', bên cạnh hai quả cầu 1 kg và 2 kg với mũi tên tốc độ dài gấp đôi. Câu 3: dòng chữ được đóng khung vàng, xếp chồng lên nhiều cuốn sách cổ có nhãn thế kỷ, như được dạy lại qua bao đời.",
      lines: [
        nar(
          "Trực giác ấy không hề ngớ ngẩn: ngoài đời, hòn đá luôn rơi nhanh hơn chiếc lá, còn tờ giấy thì chao lượn mãi mới chạm đất.",
          "Trực giác ấy không hề ngớ ngẩn: ngoài đời, hòn đá luôn rơi nhanh hơn chiếc lá, còn tờ giấy thì chao lượn mãi mới chạm đất.",
        ),
        nar(
          "Hơn 2.300 năm trước, nhà triết học Hy Lạp Aristotle cũng nghĩ vậy: theo ông, vật rơi nhanh tỉ lệ với sức nặng của nó.",
          "Hơn hai nghìn ba trăm năm trước, nhà triết học Hy Lạp A-ri-xtốt cũng nghĩ vậy: theo ông, vật rơi nhanh tỉ lệ với sức nặng của nó.",
        ),
        nar(
          "Nặng gấp đôi thì rơi nhanh gấp đôi, nghe hợp lý đến mức suốt nhiều thế kỷ, ý ấy được dạy như chân lý.",
          "Nặng gấp đôi thì rơi nhanh gấp đôi, nghe hợp lý đến mức suốt nhiều thế kỷ, ý ấy được dạy như chân lý.",
        ),
      ],
    },
    eureka: {
      shot: "Tháp nghiêng Pisa vẽ mờ như tranh cũ, Milo (vai Galileo) đứng trên đỉnh cầm hai quả cầu, con dấu đỏ 'TƯƠNG TRUYỀN' đóng chéo lên cảnh; một cuốn sách nhỏ ghi 'VIVIANI kể lại' bay qua. Gạch bỏ cảnh tháp, chuyển vào xưởng: máng gỗ nghiêng dài, Milo thả viên bi đồng lăn xuống, nhịp quả lắc tích tắc; vạch quãng đường hiện theo nhịp: '1 nhịp → 1', '2 nhịp → 4', '3 nhịp → 9'. Câu 4: cắt về Mặt Trăng, quay chậm cú thả, búa và lông chim song song rơi xuống, chạm bụi cùng một khung hình; bụi tung lên, Milo-Scott dang tay, bong bóng thoại 'GALILEO ĐÃ ĐÚNG!'.",
      lines: [
        nar(
          "Tương truyền, Galileo từng thả hai quả cầu từ tháp nghiêng Pisa, nhưng chuyện ấy do học trò Viviani kể lại, và nhiều sử gia nghi ngờ.",
          "Tương truyền, Ga-li-lê từng thả hai quả cầu từ tháp nghiêng Pi-da, nhưng chuyện ấy do học trò Vi-vi-a-ni kể lại, và nhiều sử gia nghi ngờ.",
        ),
        nar(
          "Điều có ghi chép là thí nghiệm khéo hơn: khoảng năm 1604, Galileo cho bi lăn xuống máng nghiêng để làm chậm cú rơi cho kịp đo.",
          "Điều có ghi chép là thí nghiệm khéo hơn: khoảng năm một nghìn sáu trăm linh tư, Ga-li-lê cho bi lăn xuống máng nghiêng để làm chậm cú rơi cho kịp đo.",
        ),
        nar(
          "Cú rơi nhanh dần đều: sau 2 nhịp, bi đi xa gấp 4; sau 3 nhịp, gấp 9. Và Galileo kết luận: không có không khí cản, mọi vật rơi nhanh như nhau.",
          "Cú rơi nhanh dần đều: sau hai nhịp, bi đi xa gấp bốn; sau ba nhịp, gấp chín. Và Ga-li-lê kết luận: không có không khí cản, mọi vật rơi nhanh như nhau.",
        ),
        nar(
          "Trên Mặt Trăng gần như không có không khí, búa và lông chim chạm đất cùng lúc! Scott reo lên: điều đó chứng tỏ ngài Galileo đã đúng.",
          "Trên Mặt Trăng gần như không có không khí, búa và lông chim chạm đất cùng lúc! Xcốt reo lên: điều đó chứng tỏ ngài Ga-li-lê đã đúng.",
        ),
      ],
    },
    theorem: {
      shot: "Trở lại sân Trái Đất: quanh chiếc lông chim đang rơi hiện các mũi tên nhỏ của không khí đẩy ngược lên; Milo (vai học giả, kính đồng thau kéo xuống mắt) dùng chiếc bơm tay hút hết khí trong một ống thủy tinh dài, các mũi tên biến mất, chỉ còn một mũi tên trọng lực P hướng xuống trên cả búa lẫn lông. Cuốn Vật lí 10 mở ra ở Bài 10, công thức s = ½gt² mọc ra từ hai vệt rơi song song. Câu 3: bảng so sánh hai cột 'TRÁI ĐẤT g ≈ 9,8 m/s²' và 'MẶT TRĂNG g ≈ 1,62 m/s²', thước đo cao 1,6 m, đồng hồ đếm đến 1,4 giây.",
      lines: [
        nar(
          "Thủ phạm làm lông chim rơi chậm là sức cản không khí. Bỏ không khí đi, vật chỉ còn chịu trọng lực: đó là rơi tự do.",
          "Thủ phạm làm lông chim rơi chậm là sức cản không khí. Bỏ không khí đi, vật chỉ còn chịu trọng lực: đó là rơi tự do.",
        ),
        nar(
          "Ở cùng một nơi, mọi vật rơi tự do đều nhanh dần với cùng gia tốc g, quãng rơi s = ½gt², dù nặng hay nhẹ.",
          "Ở cùng một nơi, mọi vật rơi tự do đều nhanh dần với cùng gia tốc giê, quãng rơi ét bằng một phần hai giê tê bình phương, dù nặng hay nhẹ.",
        ),
        nar(
          "Mặt Trăng hút yếu, g chỉ khoảng 1,62 m/s², nên từ độ cao 1,6 mét, búa và lông chim cùng rơi mất chừng 1,4 giây.",
          "Mặt Trăng hút yếu, giê chỉ khoảng một phẩy sáu hai mét trên giây bình phương, nên từ độ cao một phẩy sáu mét, búa và lông chim cùng rơi mất chừng một phẩy bốn giây.",
        ),
        nar(
          "Đó chính là Sự rơi tự do mà bạn học trong Vật lí lớp 10, bài mở đầu bằng chính cú thả này.",
          "Đó chính là Sự rơi tự do mà bạn học trong Vật lí lớp mười, bài mở đầu bằng chính cú thả này.",
        ),
      ],
    },
    realworld: {
      shot: "Bàn học ở nhà: Milo thả riêng một cuốn sách và một tờ giấy phẳng, sách 'bộp' xuống trước, giấy lượn lờ (✖). Rồi Milo đặt tờ giấy nằm phẳng trên mặt cuốn sách, thả, quay chậm: luồng gió vẽ bằng nét chì bị cuốn sách rẽ sang hai bên, sách và giấy chạm bàn cùng lúc (✔). Câu 3: chuyển cảnh mặt cắt dọc một giếng sâu dưới lòng đất của trung tâm NASA Glenn, ống thép dài, nhãn '132 m · gần như chân không', khối thí nghiệm rơi từ đỉnh, đồng hồ góc màn hình chạy đến '5,18 giây'.",
      lines: [
        nar(
          "Bạn thử được ngay ở nhà: thả riêng cuốn sách và tờ giấy, sách xuống trước. Giờ đặt tờ giấy nằm phẳng trên cuốn sách rồi thả.",
          "Bạn thử được ngay ở nhà: thả riêng cuốn sách và tờ giấy, sách xuống trước. Giờ đặt tờ giấy nằm phẳng trên cuốn sách rồi thả.",
        ),
        nar(
          "Cuốn sách rẽ không khí cho tờ giấy, và cả hai chạm đất cùng lúc!",
          "Cuốn sách rẽ không khí cho tờ giấy, và cả hai chạm đất cùng lúc!",
        ),
        nar(
          "Ở quy mô lớn, tháp rơi của NASA Glenn cho thiết bị rơi 132 mét trong ống thép hút gần hết khí, được 5,18 giây gần như không trọng lượng.",
          "Ở quy mô lớn, tháp rơi của Na-sa Gờ-len cho thiết bị rơi một trăm ba mươi hai mét trong ống thép hút gần hết khí, được năm phẩy một tám giây gần như không trọng lượng.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra vũ trụ: Trái Đất xanh tròn trên nền đen, trạm vũ trụ quốc tế ISS bay ngang; nhãn 'trọng lực ≈ 90%' và '≈ 28.000 km/h'. Vẽ đường cong: một mũi tên rơi thẳng xuống cộng một mũi tên lao ngang tạo thành quỹ đạo tròn ôm lấy Trái Đất. Phóng vào trong trạm: Milo phi hành gia lơ lửng cạnh chiếc búa và chiếc lông chim cũng lơ lửng song song. Câu 3: thu nhỏ dần về bụi xám Mặt Trăng, khung hình cuối là búa và lông chim nằm cạnh nhau trên mặt bụi, chữ viết tay 'CÙNG MỘT LÚC'.",
      lines: [
        nar(
          "Phóng to nữa: trạm vũ trụ quốc tế ISS cũng đang rơi tự do! Theo NASA, ở độ cao của trạm, trọng lực vẫn còn khoảng 90% so với mặt đất.",
          "Phóng to nữa: trạm vũ trụ quốc tế ai ét ét cũng đang rơi tự do! Theo Na-sa, ở độ cao của trạm, trọng lực vẫn còn khoảng chín mươi phần trăm so với mặt đất.",
        ),
        nar(
          "Nhưng trạm lao ngang khoảng 28.000 km/h, nên cứ rơi mà mãi hụt mặt đất cong. Người và đồ vật bên trong rơi cùng nhau, nên trông như lơ lửng.",
          "Nhưng trạm lao ngang khoảng hai mươi tám nghìn ki-lô-mét mỗi giờ, nên cứ rơi mà mãi hụt mặt đất cong. Người và đồ vật bên trong rơi cùng nhau, nên trông như lơ lửng.",
        ),
        nar(
          "Cùng quy luật ấy giữ trạm trên quỹ đạo, và đã đưa chiếc búa cùng chiếc lông chim chạm bụi Mặt Trăng trong cùng một khoảnh khắc.",
          "Cùng quy luật ấy giữ trạm trên quỹ đạo, và đã đưa chiếc búa cùng chiếc lông chim chạm bụi Mặt Trăng trong cùng một khoảnh khắc.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 9,
    week,
    theme,
    title: "Cơm nguội để qua đêm ăn có sao không?",
    hudTitle: "CƠM NGUỘI QUA ĐÊM: TIN HAY ĐỒN?",
    textbook: "Sinh học 10 · Sinh trưởng ở vi sinh vật",
    era: "Căn bếp mỗi nhà · Tin được hay Tin đồn?",
    question: "Món cơm rang nhà bạn thường dùng cơm nguội để từ lúc nào?",
    sources: [
      { title: "Food Standards Scotland — Rice: cooling and storing cooked rice", url: "https://www.foodstandards.gov.scot/consumers/food-safety/at-home/rice" },
      { title: "NHS — Starchy foods and carbohydrates: storing rice", url: "https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/" },
      { title: "Food Standards Agency / GOV.UK — Home food fact checker: rice", url: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker" },
      { title: "Centre for Food Safety Hồng Kông — Food Safety Focus số 193 (8/2022): Heat-stable Toxins from Bacillus cereus and Staphylococcus aureus", url: "https://cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_193_01.html" },
      { title: "Sinh học 10 Kết nối tri thức — Bài 21. Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật", url: "https://loigiaihay.com/ly-thuyet-trao-doi-chat-sinh-truong-va-sinh-san-o-vi-sinh-vat-sinh-10-ket-noi-tri-thuc-a116338.html" },
    ],
    hook: {
      shot: "Căn bếp Việt buổi sáng trên sân khấu giấy da: bát cơm nguội úp đĩa trên bàn, nồi cơm điện bên cạnh, đồng hồ treo tường chỉ 7 giờ. Milo (vai người nội trợ, đeo tạp dề trên áo ghi-lê) đứng giữa hai bong bóng lời: trái 'ĂN BAO NĂM CÓ SAO ĐÂU', phải 'ĐỂ QUA ĐÊM LÀ THÀNH ĐỘC'. Câu 2: kim đồng hồ quay ngược về lúc tắt bếp tối qua, dòng chữ viết tay 'mấy tiếng đầu…'. Câu 3: Milo giơ tấm bảng ba ô 'TIN ĐƯỢC / TIN ĐỒN / TÙY?', mũi tên chỉ xuống ô bình luận. Chuyển cảnh: bát cơm phóng to dần.",
      lines: [
        nar(
          "Bát cơm nguội để qua đêm: người bảo ăn bao năm có sao đâu, người bảo để qua đêm là thành độc.",
          "Bát cơm nguội để qua đêm: người bảo ăn bao năm có sao đâu, người bảo để qua đêm là thành độc.",
        ),
        nar(
          "Ai đúng? Điều quyết định lại không nằm ở lúc hâm cơm, mà ở mấy tiếng đầu tiên sau khi tắt bếp.",
          "Ai đúng? Điều quyết định lại không nằm ở lúc hâm cơm, mà ở mấy tiếng đầu tiên sau khi tắt bếp.",
        ),
        nar(
          "Bạn chọn Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp!",
          "Bạn chọn Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp!",
        ),
      ],
    },
    barrier: {
      shot: "Sân khấu chia đôi. Bên trái: nồi cơm sôi sùng sục, nhãn 'ĐÃ NẤU CHÍN = SẠCH?' rồi đóng dấu ✖ đỏ khi một hạt gạo phóng to lộ ra chấm nhỏ có vỏ dày, nhãn 'BÀO TỬ BACILLUS CEREUS'. Bên phải: chảo hâm cơm bốc khói, nhãn 'HÂM LẠI LÀ HỎNG?' rồi gạch chéo, thay bằng mũi tên chỉ ngược về tủ bếp có chữ 'CẤT THẾ NÀO MỚI LÀ CHUYỆN'. Milo (vai thanh tra an toàn thực phẩm, cầm sổ ghi chép) gãi đầu nhìn hai bên.",
      lines: [
        nar(
          "Phe yên tâm có lý do thật: nấu chín và hâm nóng thường giết được vi khuẩn, nên cơm đã sôi kỹ tưởng như sạch hẳn.",
          "Phe yên tâm có lý do thật: nấu chín và hâm nóng thường giết được vi khuẩn, nên cơm đã sôi kỹ tưởng như sạch hẳn.",
        ),
        nar(
          "Nhưng theo hệ thống y tế NHS của Anh, gạo sống có thể mang bào tử vi khuẩn Bacillus cereus, và bào tử ấy sống sót qua nồi cơm.",
          "Nhưng theo hệ thống y tế en hát ét của Anh, gạo sống có thể mang bào tử vi khuẩn Ba-xi-lút xê-rê-út, và bào tử ấy sống sót qua nồi cơm.",
        ),
        nar(
          "Phe lo sợ cũng chỉ đúng một nửa: Cơ quan Tiêu chuẩn Thực phẩm Anh nói rắc rối không do việc hâm lại, mà do cách cất cơm trước khi hâm.",
          "Phe lo sợ cũng chỉ đúng một nửa: Cơ quan Tiêu chuẩn Thực phẩm Anh nói rắc rối không do việc hâm lại, mà do cách cất cơm trước khi hâm.",
        ),
      ],
    },
    eureka: {
      shot: "Mô hình nhỏ: bào tử vẽ như hạt nhỏ mặc áo giáp đồng thau. Hai nhiệt kế đứng cạnh nhau: nhiệt kế nồi cơm dừng ở 100 °C, nhiệt kế nồi hấp công nghiệp lên 121 °C kèm đồng hồ cát 3 phút; bào tử chỉ vỡ áo ở nhiệt kế thứ hai. Rồi cơm nằm trên bàn bếp ban đêm: bào tử cởi áo, nảy mầm, chia đôi liên tục theo nhịp đồng hồ 20 phút; bộ đếm chạy 1 → 2 → 4 → … → 16.777.216, nhãn 'LÝ THUYẾT · ĐIỀU KIỆN LÝ TƯỞNG · 8 GIỜ = 24 LẦN CHIA'. Milo (vai nhà nghiên cứu, kính bảo hộ hạ xuống mắt) há hốc. Cuối cảnh: những chấm nhỏ màu cam (độc tố) lơ lửng quanh hạt cơm; ngọn lửa chảo bùng lên nhưng chấm cam vẫn còn, nhãn 'HÂM NÓNG KHÔNG XÓA ĐƯỢC'.",
      lines: [
        nar(
          "Bào tử như mặc áo giáp. Theo Trung tâm An toàn Thực phẩm Hồng Kông, muốn diệt nó phải đun tới 121 độ C suốt 3 phút.",
          "Bào tử như mặc áo giáp. Theo Trung tâm An toàn Thực phẩm Hồng Kông, muốn diệt nó phải đun tới một trăm hai mươi mốt độ xê suốt ba phút.",
        ),
        nar(
          "Nồi cơm nhà mình chỉ sôi quanh 100 độ, nên bào tử vẫn nằm im trong cơm. Để cơm ở nhiệt độ phòng, chúng nảy mầm và sinh sôi.",
          "Nồi cơm nhà mình chỉ sôi quanh một trăm độ, nên bào tử vẫn nằm im trong cơm. Để cơm ở nhiệt độ phòng, chúng nảy mầm và sinh sôi.",
        ),
        nar(
          "Thử tính trên lý thuyết: một vi khuẩn cứ 20 phút chia đôi, qua một đêm 8 tiếng là 24 lần chia, thành hơn 16 triệu con.",
          "Thử tính trên lý thuyết: một vi khuẩn cứ hai mươi phút chia đôi, qua một đêm tám tiếng là hai mươi tư lần chia, thành hơn mười sáu triệu con.",
        ),
        nar(
          "Vi khuẩn càng đông càng tiết nhiều độc tố, và theo NHS, hâm nóng lại không xóa được độc tố này.",
          "Vi khuẩn càng đông càng tiết nhiều độc tố, và theo en hát ét, hâm nóng lại không xóa được độc tố này.",
        ),
      ],
    },
    theorem: {
      shot: "Bảng giấy da của học giả: Milo (vai thầy giáo Sinh học) vẽ tế bào vi khuẩn với nội bào tử vỏ dày bên trong, nhãn 'NỘI BÀO TỬ'. Bên cạnh, một vi khuẩn E. coli tách đôi, đồng hồ ghi '20 PHÚT = THỜI GIAN THẾ HỆ'. Công thức N = N₀ · 2ⁿ mọc ra từ dãy tế bào nhân đôi, n = 24 gắn với kết quả hơn 16 triệu ở hồi trước. Góc trên: thẻ 'SINH HỌC 10 · BÀI 21'.",
      lines: [
        nar(
          "Đó chính là Bài 21, Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật, mà bạn học trong Sinh học lớp 10.",
          "Đó chính là Bài hai mươi mốt, Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật, mà bạn học trong Sinh học lớp mười.",
        ),
        nar(
          "Sách gọi lớp áo giáp kia là nội bào tử, giúp vi khuẩn sống qua lúc bất lợi, và lấy ví dụ vi khuẩn E. coli cứ 20 phút lại phân chia một lần.",
          "Sách gọi lớp áo giáp kia là nội bào tử, giúp vi khuẩn sống qua lúc bất lợi, và lấy ví dụ vi khuẩn e cô-li cứ hai mươi phút lại phân chia một lần.",
        ),
        nar(
          "Khoảng 20 phút ấy gọi là thời gian thế hệ, và sau n lần chia, số tế bào bằng số ban đầu nhân hai mũ n.",
          "Khoảng hai mươi phút ấy gọi là thời gian thế hệ, và sau en lần chia, số tế bào bằng số ban đầu nhân hai mũ en.",
        ),
      ],
    },
    realworld: {
      shot: "Bếp nhà, Milo (vai người nội trợ) làm từng bước, mỗi bước bật một thẻ số: 1) xới cơm khỏi nồi cơm điện ra ba hộp nông, đồng hồ cát '1 GIỜ'; 2) đặt hộp vào tủ lạnh, cửa tủ đóng lại; 3) lịch bàn lật một trang, nhãn '≤ 24 GIỜ'; 4) chảo cơm rang bốc hơi đều, nhãn 'NÓNG BỐC HƠI · CHỈ 1 LẦN'. Góc dưới: nguồn 'Food Standards Scotland · NHS'.",
      lines: [
        nar(
          "Vậy mẹo nằm ở việc rút ngắn quãng cơm nằm ở nhiệt độ phòng. Cơ quan Tiêu chuẩn Thực phẩm Scotland khuyên làm nguội cơm thật nhanh, lý tưởng là trong vòng 1 giờ.",
          "Vậy mẹo nằm ở việc rút ngắn quãng cơm nằm ở nhiệt độ phòng. Cơ quan Tiêu chuẩn Thực phẩm Xcốt-len khuyên làm nguội cơm thật nhanh, lý tưởng là trong vòng một giờ.",
        ),
        nar(
          "Xới cơm ra khỏi nồi, chia thành phần nhỏ cho mau nguội, rồi cất ngay vào tủ lạnh.",
          "Xới cơm ra khỏi nồi, chia thành phần nhỏ cho mau nguội, rồi cất ngay vào tủ lạnh.",
        ),
        nar(
          "Ăn trong vòng 24 giờ, hâm đến khi nóng bốc hơi đều từ trong ra ngoài, và chỉ hâm một lần thôi.",
          "Ăn trong vòng hai mươi tư giờ, hâm đến khi nóng bốc hơi đều từ trong ra ngoài, và chỉ hâm một lần thôi.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng ra quy mô thành phố: bếp nhà hàng lớn với những khay cơm rang nấu sẵn cho giờ trưa. Một thước nhiệt độ khổng lồ dựng đứng: vùng trên 60 °C tô đỏ ấm 'GIỮ NÓNG', vùng 4 °C trở xuống tô xanh 'GIỮ LẠNH', khoảng giữa tô xám có chữ 'ĐỪNG LỬNG LƠ'. Rồi thu về căn bếp mở đầu: bát cơm nguội trên bàn, Milo giơ con dấu đồng hạ xuống giấy da: 'TÙY!'. Dòng nhỏ dưới con dấu: 'Nguội nhanh · tủ lạnh · 24 giờ · hâm 1 lần'. Hiện nguồn ở góc.",
      lines: [
        nar(
          "Phóng to lên cỡ nhà hàng: năm 2022, Trung tâm An toàn Thực phẩm Hồng Kông kể chuyện cơm rang của một nhà hàng ở đây chứa quá nhiều Bacillus cereus.",
          "Phóng to lên cỡ nhà hàng: năm hai nghìn không trăm hai mươi hai, Trung tâm An toàn Thực phẩm Hồng Kông kể chuyện cơm rang của một nhà hàng ở đây chứa quá nhiều Ba-xi-lút xê-rê-út.",
        ),
        nar(
          "Nên họ dặn: cơm nấu sẵn phải giữ nóng trên 60 độ, hoặc cất tủ lạnh từ 4 độ trở xuống, đừng để lửng lơ ở giữa.",
          "Nên họ dặn: cơm nấu sẵn phải giữ nóng trên sáu mươi độ, hoặc cất tủ lạnh từ bốn độ trở xuống, đừng để lửng lơ ở giữa.",
        ),
        nar(
          "Phán quyết: Tùy! Bát cơm nguội ăn được nếu nó vào tủ lạnh nhanh và lên chảo trong 24 giờ, vì điều quyết định là mấy tiếng đầu sau khi tắt bếp.",
          "Phán quyết: Tùy! Bát cơm nguội ăn được nếu nó vào tủ lạnh nhanh và lên chảo trong hai mươi tư giờ, vì điều quyết định là mấy tiếng đầu sau khi tắt bếp.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 10,
    week,
    theme,
    title: "Đếm chữ cái để kết án một nữ hoàng",
    hudTitle: "ĐẾM CHỮ CÁI ĐỂ KẾT ÁN NỮ HOÀNG",
    textbook: "Toán 9 · Bảng tần số và biểu đồ tần số",
    era: "Chartley, nước Anh · năm 1586",
    question: "Nếu là Mary, bạn sẽ giấu chữ E thế nào để người giải mã đếm mãi không ra?",
    sources: [
      { title: "British Library — The Gallows Letter", url: "https://www.bl.uk/stories/blogs/posts/the-gallows-letter" },
      { title: "Simon Singh — Arab code breakers (al-Kindi, phân tích tần số, Phelippes)", url: "https://simonsingh.net/media/articles/maths-and-science/arab-code-breakers" },
      { title: "Simon Singh, The Black Chamber — Mary Queen of Scots (bản mã nomenclator)", url: "https://simonsingh.com/The_Black_Chamber/maryqueenofscots.html" },
      { title: "MacTutor (ĐH St Andrews) — Al-Kindi", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Al-Kindi/" },
      { title: "SGK Toán 9 Kết nối tri thức — Bài 22. Bảng tần số và biểu đồ tần số", url: "https://loigiaihay.com/bai-22-bang-tan-so-va-bieu-do-tan-so-toan-9-ket-noi-tri-thuc-e34975.html" },
      { title: "NASPA — SCRABBLE History (Alfred Butts đếm chữ trên New York Times)", url: "https://scrabbleplayers.org/w/SCRABBLE_History" },
      { title: "Play Scrabble — How many letter tiles are there in Scrabble", url: "https://playscrabble.com/news-blog/how-many-letter-tiles-are-there-in-scrabble-and-how-to-best-use-scrabble-tiles-in-a-game" },
      { title: "Scientific American — Scientists decipher 57 letters from Mary, Queen of Scots", url: "https://www.scientificamerican.com/article/scientists-decipher-50-letters-from-mary-queen-of-scotts-before-her-beheading1/" },
      { title: "The Register — Codebreakers crack Mary, Queen of Scots letters (2023)", url: "https://www.theregister.com/2023/02/09/codebreakers_mary_queen_of_scots/" },
      { title: "NASA Science — WMAP: tuổi vũ trụ 13,77 tỉ năm", url: "https://science.nasa.gov/mission/wmap/wmap-overview/" },
    ],
    hook: {
      shot: "Mở thẳng vào cận cảnh: bàn tay cầm bút lông ngỗng vẽ một chiếc giá treo cổ nhỏ lên mặt ngoài một lá thư đầy ký hiệu lạ, góc thẻ hiện 1586. Lùi máy: dinh thự Chartley nơi Mary bị giam lỏng, Mary ngồi viết, lá thư được nhét vào nút một thùng bia và lăn ra cổng. Milo (vai Phelippes) đứng bên bàn giải mã, giơ bảng hai mặt CÓ / KHÔNG, chữ viết tay hiện: ĐẾM CÓ ĐỦ KHÔNG?",
      lines: [
        nar(
          "Năm 1586, người giải mã phục vụ nữ hoàng Anh vẽ một chiếc giá treo cổ lên mặt ngoài lá thư mật của Nữ hoàng Mary xứ Scotland.",
          "Năm một nghìn năm trăm tám mươi sáu, người giải mã phục vụ nữ hoàng Anh vẽ một chiếc giá treo cổ lên mặt ngoài lá thư mật của Nữ hoàng Mê-ri xứ Xcốt-len.",
        ),
        nar(
          "Lá thư viết toàn ký hiệu lạ, giấu trong thùng bia. Vậy mà chìa khoá đầu tiên để mở nó lại là việc ai cũng làm được: đếm.",
          "Lá thư viết toàn ký hiệu lạ, giấu trong thùng bia. Vậy mà chìa khoá đầu tiên để mở nó lại là việc ai cũng làm được: đếm.",
        ),
        nar(
          "Đếm chữ cái có đủ để phá một mật thư hoàng gia không? Chọn Có hay Không ở bình luận trước khi xem tiếp!",
          "Đếm chữ cái có đủ để phá một mật thư hoàng gia không? Chọn Có hay Không ở bình luận trước khi xem tiếp!",
        ),
      ],
    },
    barrier: {
      shot: "Milo trải bảng chữ cái A đến Z, cạnh đó là hàng ký hiệu của bản mã; hai hàng tráo qua tráo lại chóng mặt, bộ đếm trên góc nhảy tới 26! ≈ 4 × 10²⁶ (✖). Một cỗ máy tưởng tượng thử 1 tỉ cách mỗi giây, đồng hồ cát chảy mãi, nhãn hơn 12 tỉ năm đặt cạnh thanh tuổi vũ trụ 13,8 tỉ năm (✖). Cuối cảnh: trang mã của Mary có cả ký hiệu thay cho nguyên từ, Mary mỉm cười tự tin.",
      lines: [
        nar(
          "Lối nghĩ dễ sai là phải thử từng cách thay chữ cho tới khi ra nghĩa.",
          "Lối nghĩ dễ sai là phải thử từng cách thay chữ cho tới khi ra nghĩa.",
        ),
        nar(
          "Nhưng chỉ một bảng thay 26 chữ cái đơn giản đã có khoảng 400 triệu tỉ tỉ cách xếp. Thử một tỉ cách mỗi giây, bạn vẫn cần hơn 12 tỉ năm, gần bằng tuổi vũ trụ.",
          "Nhưng chỉ một bảng thay hai mươi sáu chữ cái đơn giản đã có khoảng bốn trăm triệu tỉ tỉ cách xếp. Thử một tỉ cách mỗi giây, bạn vẫn cần hơn mười hai tỉ năm, gần bằng tuổi vũ trụ.",
        ),
        nar(
          "Bản mã của Mary còn có ký hiệu riêng cho cả những từ hay dùng, nên bà tin chắc không ai đọc nổi.",
          "Bản mã của Mê-ri còn có ký hiệu riêng cho cả những từ hay dùng, nên bà tin chắc không ai đọc nổi.",
        ),
      ],
    },
    eureka: {
      shot: "Chuyển về Baghdad khoảng năm 850: Milo (vai al-Kindi) trong thư viện Nhà Thông thái, gạch từng que đếm dưới mỗi chữ cái của một trang sách, chữ viết tay hiện ĐỪNG THỬ, HÃY ĐẾM. Bật lại năm 1586: Milo (vai Phelippes) xếp các ký hiệu của thư Mary thành hàng, ký hiệu nhiều que nhất phát sáng và được dán nhãn E; thẻ số hiện E ≈ 13%, J + Q + X + Z < 1%. Từng từ quen lộ dần trên lá thư như mảnh ghép, Milo reo lên.",
      lines: [
        nar(
          "Bí quyết đã có từ khoảng năm 850, trong sách của học giả al-Kindi ở Baghdad: đừng thử, hãy đếm.",
          "Bí quyết đã có từ khoảng năm tám trăm năm mươi, trong sách của học giả an Kin-đi ở Bát-đa: đừng thử, hãy đếm.",
        ),
        nar(
          "Mỗi ngôn ngữ có vài chữ cái được dùng nhiều hơn hẳn. Trong tiếng Anh, chữ E chiếm khoảng 13% số chữ, còn J, Q, X, Z cộng lại chưa tới 1%.",
          "Mỗi ngôn ngữ có vài chữ cái được dùng nhiều hơn hẳn. Trong tiếng Anh, chữ e chiếm khoảng mười ba phần trăm số chữ, còn các chữ gi, kiu, ích, dét cộng lại chưa tới một phần trăm.",
        ),
        nar(
          "Thomas Phelippes đếm các ký hiệu trong thư của Mary, gán ký hiệu hay gặp nhất cho chữ hay gặp nhất, rồi đoán dần những từ quen theo ngữ cảnh.",
          "Tô-mát Phê-líp đếm các ký hiệu trong thư của Mê-ri, gán ký hiệu hay gặp nhất cho chữ hay gặp nhất, rồi đoán dần những từ quen theo ngữ cảnh.",
        ),
        nar(
          "Đếm chưa đủ, nhưng là chìa khoá đầu tiên: bản mã tưởng bất khả xâm phạm vỡ ra từng mảnh.",
          "Đếm chưa đủ, nhưng là chìa khoá đầu tiên: bản mã tưởng bất khả xâm phạm vỡ ra từng mảnh.",
        ),
      ],
    },
    theorem: {
      shot: "Những que đếm của Milo tự gom thành một bảng hai dòng: hàng trên là chữ cái, hàng dưới là số lần xuất hiện; rồi các con số mọc lên thành biểu đồ tần số dạng cột, cột E cao nhất ghi 127 trên tổng 1.000 chữ. Trang Toán 9 mở ra, dòng định nghĩa sáng lên: Tần số = số lần xuất hiện. Cuối cảnh: hai biểu đồ đặt cạnh nhau, của bản mã và của tiếng Anh, mũi tên nối cột cao với cột cao.",
      lines: [
        nar(
          "Việc al-Kindi dạy chính là lập bảng tần số: tần số của một giá trị là số lần giá trị đó xuất hiện trong mẫu dữ liệu.",
          "Việc an Kin-đi dạy chính là lập bảng tần số: tần số của một giá trị là số lần giá trị đó xuất hiện trong mẫu dữ liệu.",
        ),
        nar(
          "Lấy một nghìn chữ cái tiếng Anh, cột E trên biểu đồ tần số sẽ cao khoảng 127, cao nhất.",
          "Lấy một nghìn chữ cái tiếng Anh, cột e trên biểu đồ tần số sẽ cao khoảng một trăm hai mươi bảy, cao nhất.",
        ),
        nar(
          "Đó là Bảng tần số và biểu đồ tần số mà bạn học trong Toán lớp 9: đặt biểu đồ của bản mã cạnh biểu đồ của ngôn ngữ, cột cao sẽ khớp cột cao.",
          "Đó là Bảng tần số và biểu đồ tần số mà bạn học trong Toán lớp chín: đặt biểu đồ của bản mã cạnh biểu đồ của ngôn ngữ, cột cao sẽ khớp cột cao.",
        ),
      ],
    },
    realworld: {
      shot: "Bàn phòng khách hôm nay: Milo (vai người chơi) mở hộp cờ Scrabble, đổ 100 quân chữ ra bàn rồi xếp thành biểu đồ cột theo chữ cái, cột E 12 quân cao vọt, mỗi quân E ghi 1 điểm; Q và Z đứng lẻ loi mỗi chữ một quân. Lồng khung: tờ trang nhất New York Times cũ, những vòng bút chì khoanh quanh chữ cái.",
      lines: [
        nar(
          "Cùng phép đếm ấy đang nằm trong hộp cờ Scrabble. Người sáng chế Alfred Butts đã tính tần số chữ cái từ trang nhất báo New York Times.",
          "Cùng phép đếm ấy đang nằm trong hộp cờ Xcra-bồ. Người sáng chế An-phrét Bát đã tính tần số chữ cái từ trang nhất báo Niu Oóc Tai-mơ.",
        ),
        nar(
          "Trong 100 quân chữ, E có tới 12 quân và chỉ được 1 điểm, còn Q và Z mỗi chữ chỉ có một quân, điểm cao ngất.",
          "Trong một trăm quân chữ, chữ e có tới mười hai quân và chỉ được một điểm, còn chữ kiu và chữ dét mỗi chữ chỉ có một quân, điểm cao ngất.",
        ),
        nar(
          "Lần tới xếp chữ, bạn đang chơi trên một bảng tần số.",
          "Lần tới xếp chữ, bạn đang chơi trên một bảng tần số.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng to: màn hình kho lưu trữ số của Thư viện Quốc gia Pháp, hàng chục lá thư mật bay ra xếp thành bức tường, nhãn 57 LÁ THƯ · 1578–1584. Milo chỉ vào một chữ E tách thành nhiều ký hiệu khác nhau, biểu đồ tần số các cột cao bị san phẳng dần. Máy tính chạy dòng ký hiệu, bộ đếm hơn 150.000 ký hiệu, rồi chữ Pháp hiện ra, nhãn khoảng 50.000 từ. Kết: thu về lá thư năm 1586 và chiếc giá treo cổ nhỏ bằng mực trên mặt ngoài.",
      lines: [
        nar(
          "Năm 2023, ba nhà giải mã nghiệp dư tìm thấy 57 lá thư mật khác của Mary, viết từ 1578 đến 1584, trong kho số của Thư viện Quốc gia Pháp.",
          "Năm hai nghìn không trăm hai mươi ba, ba nhà giải mã nghiệp dư tìm thấy năm mươi bảy lá thư mật khác của Mê-ri, viết từ một nghìn năm trăm bảy mươi tám đến một nghìn năm trăm tám mươi tư, trong kho số của Thư viện Quốc gia Pháp.",
        ),
        nar(
          "Những lá thư này dùng mã đồng âm: một chữ hay gặp được viết bằng nhiều ký hiệu khác nhau, để san phẳng các cột tần số.",
          "Những lá thư này dùng mã đồng âm: một chữ hay gặp được viết bằng nhiều ký hiệu khác nhau, để san phẳng các cột tần số.",
        ),
        nar(
          "Nhóm phải nhờ phần mềm giải mã xử lý hơn 150.000 ký hiệu, mới đọc lại được khoảng 50.000 từ.",
          "Nhóm phải nhờ phần mềm giải mã xử lý hơn một trăm năm mươi nghìn ký hiệu, mới đọc lại được khoảng năm mươi nghìn từ.",
        ),
        nar(
          "Mary bị kết tội và bị xử tử năm 1587. Còn mọi chuyện bắt đầu từ chiếc giá treo cổ nhỏ trên lá thư năm 1586, vẽ ra sau một phép đếm.",
          "Mê-ri bị kết tội và bị xử tử năm một nghìn năm trăm tám mươi bảy. Còn mọi chuyện bắt đầu từ chiếc giá treo cổ nhỏ trên lá thư năm một nghìn năm trăm tám mươi sáu, vẽ ra sau một phép đếm.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 11,
    week,
    theme,
    title: "Ngồi trong ô tô an toàn khi có sét là nhờ lốp cao su?",
    hudTitle: "Ô TÔ AN TOÀN KHI SÉT NHỜ LỐP?",
    textbook: "KHTN 8 · Dòng điện, nguồn điện",
    era: "Viện Hoàng gia London 1836 · Tin được hay Tin đồn?",
    question: "Đi xe máy giữa đồng gặp giông, ở quê bạn người ta hay trú ở đâu?",
    sources: [
      { title: "NWS (Upton, NY) — Lightning Safety Awareness Week: rubber tires myth, convertibles, motorcycles, trees, 30 minutes", url: "https://www.weather.gov/okx/LightningSafetyAwarenessWeek" },
      { title: "NWS — Lightning and Cars: dòng sét đi qua vỏ kim loại, qua lõi thép của lốp xuống đất", url: "https://www.weather.gov/safety/lightning-cars" },
      { title: "NWS — Lightning Science Overview: không khí là chất cách điện; sét đánh xa tới 10 dặm", url: "https://www.weather.gov/safety/lightning-science-overview" },
      { title: "NWS — Lightning Myths: trú dưới cây là nguy hiểm", url: "https://www.weather.gov/safety/lightning-myths" },
      { title: "NWS (Jackson, MS) — Lightning safety: get off and away from motorcycles", url: "https://www.weather.gov/jan/swpw_lightning" },
      { title: "Royal Institution — Our history: 1836, Faraday invented the Faraday cage in the Ri Theatre", url: "https://www.rigb.org/about-us/our-history" },
      { title: "Michael Faraday, Experimental Researches in Electricity, Vol. 1, mục 1173–1174 (Project Gutenberg)", url: "https://www.gutenberg.org/ebooks/14986" },
      { title: "Scientific American — What happens when lightning strikes an airplane? (Edward J. Rupke, Lightning Technologies)", url: "https://www.scientificamerican.com/article/what-happens-when-lightni/" },
      { title: "Phòng chống thiên tai Việt Nam — Làm thế nào để phòng tránh sét khi ở ngoài trời và khi ở trong nhà?", url: "https://phongchongthientai.mard.gov.vn/Pages/lam-the-nao-de-phong-tranh-set-khi-o-ngoai-troi-va-khi-o-trong-nha.aspx" },
      { title: "SGK KHTN 8 Kết nối tri thức — Bài 21. Dòng điện, nguồn điện: vật dẫn điện, vật cách điện (VietJack)", url: "https://vietjack.com/khoa-hoc-tu-nhien-8-kn/bai-21-dong-dien-nguon-dien.jsp" },
    ],
    hook: {
      shot: "Đêm giông trên sân khấu giấy da: con đường quê chạy giữa cánh đồng, một chiếc ô tô mui kín đang đỗ, mưa xiên. Milo (vai tài xế, kính bảo hộ kéo xuống mắt) ngồi sau vô lăng. Câu 1: tia sét vẽ tay đánh trúng nóc xe, chớp trắng toàn khung, rồi hiện lại Milo vẫn ngồi nguyên, chớp mắt ngơ ngác; dấu hỏi lớn trên nóc xe. Câu 2: camera lia xuống bốn bánh xe, bốn chiếc lốp được tô đậm, chú thích viết tay 'CAO SU = CÁCH ĐIỆN?'. Câu 3: Milo giơ tấm bảng ba ô 'TIN ĐƯỢC / TIN ĐỒN / TÙY?', mũi tên chỉ xuống ô bình luận. Chuyển cảnh: zoom vào một chiếc lốp.",
      lines: [
        nar(
          "Sét đánh trúng một chiếc ô tô mui kín, vậy mà người ngồi bên trong thường vẫn bình an. Vì sao?",
          "Sét đánh trúng một chiếc ô tô mui kín, vậy mà người ngồi bên trong thường vẫn bình an. Vì sao?",
        ),
        nar(
          "Câu trả lời ai cũng thuộc: nhờ bốn chiếc lốp cao su cách điện, dòng điện không xuống được đất.",
          "Câu trả lời ai cũng thuộc: nhờ bốn chiếc lốp cao su cách điện, dòng điện không xuống được đất.",
        ),
        nar(
          "Bạn chọn Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp!",
          "Bạn chọn Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp!",
        ),
      ],
    },
    barrier: {
      shot: "Câu 1: bên trái sân khấu hiện đôi găng tay cao su của thợ điện, dấu tích xanh 'CÁCH ĐIỆN ✔'. Câu 2: Milo (vai người kiểm tra lời đồn, cầm sổ ghi chép) lật một tờ giấy da có tiêu đề 'LỜI ĐỒN VỀ SÉT · CƠ QUAN KHÍ TƯỢNG QUỐC GIA MỸ', dòng 'Lốp cao su bảo vệ bạn khỏi sét' bị đóng dấu đỏ 'LỜI ĐỒN'. Câu 3: khung dựng đứng: đám mây giông ở trên, mặt đất ở dưới, tia sét ngoằn ngoèo nối hai bên, cột thước bên cạnh ghi 'HÀNG KM KHÔNG KHÍ = CHẤT CÁCH ĐIỆN'; ở chân tia sét, một lớp lốp mỏng xíu đặt cạnh để so, nhãn 'LỐP'. Câu 4: cắt lớp chiếc lốp cho thấy các sợi lõi thép bên trong, dòng điện vàng luồn qua sợi thép xuống đất, lốp xì khói, dấu ✖ đỏ lên chữ 'CAO SU CHẶN SÉT'.",
      lines: [
        nar(
          "Lời giải thích nghe rất hợp lý, vì cao su đúng là chất cách điện, thợ điện vẫn đeo găng cao su.",
          "Lời giải thích nghe rất hợp lý, vì cao su đúng là chất cách điện, thợ điện vẫn đeo găng cao su.",
        ),
        nar(
          "Nhưng Cơ quan Khí tượng Quốc gia Mỹ gọi đó là một lời đồn.",
          "Nhưng Cơ quan Khí tượng Quốc gia Mỹ gọi đó là một lời đồn.",
        ),
        nar(
          "Không khí cũng là chất cách điện, vậy mà tia sét vẫn xé toạc cả quãng không khí dài hàng cây số. Thêm một lớp cao su dưới bánh xe thì thấm vào đâu.",
          "Không khí cũng là chất cách điện, vậy mà tia sét vẫn xé toạc cả quãng không khí dài hàng cây số. Thêm một lớp cao su dưới bánh xe thì thấm vào đâu.",
        ),
        nar(
          "Theo cơ quan này, sét còn hay phá hỏng lốp khi luồn qua lớp lõi thép bên trong để xuống đất.",
          "Theo cơ quan này, sét còn hay phá hỏng lốp khi luồn qua lớp lõi thép bên trong để xuống đất.",
        ),
      ],
    },
    eureka: {
      shot: "Chuyển về giảng đường Viện Hoàng gia London năm 1836, hàng ghế gỗ hình móng ngựa. Câu 1: Milo (vai Faraday, áo đuôi tôm, kính bảo hộ trên trán) đứng cạnh một khung gỗ lập phương cao gấp đôi người, thước đo cạnh ghi '≈ 3,7 m'. Câu 2: bàn tay vẽ tua nhanh đan lưới dây đồng quanh khung, phủ giấy, rồi dán các dải lá thiếc lấp lánh khắp các mặt; nhãn 'VỎ KIM LOẠI'. Câu 3: Milo bước vào trong lồng; bên ngoài một máy phát tĩnh điện quay, tia lửa và chùm điện xanh tím phóng tóe khắp mặt ngoài lồng; chữ viết tay 'theo chính Faraday kể lại'. Câu 4: cận cảnh bên trong: Milo cầm điện nghiệm hai lá vàng khép im và một ngọn nến cháy đứng thẳng, gương mặt Eureka; mặt cắt lồng cho thấy các dấu cộng chỉ nằm ở lớp vỏ ngoài, bên trong trống trơn, nhãn lớn 'BÊN TRONG: 0'.",
      lines: [
        nar(
          "Bí mật thật nằm ở thứ bao quanh bạn. Năm 1836, tại Viện Hoàng gia ở London, Michael Faraday dựng một chiếc lồng lập phương, mỗi cạnh khoảng 3,7 mét.",
          "Bí mật thật nằm ở thứ bao quanh bạn. Năm một nghìn tám trăm ba mươi sáu, tại Viện Hoàng gia ở Luân Đôn, Mai-cơn Pha-ra-đây dựng một chiếc lồng lập phương, mỗi cạnh khoảng ba phẩy bảy mét.",
        ),
        nar(
          "Khung gỗ đan lưới dây đồng, phủ giấy và lá thiếc, thành một lớp vỏ kim loại kín.",
          "Khung gỗ đan lưới dây đồng, phủ giấy và lá thiếc, thành một lớp vỏ kim loại kín.",
        ),
        nar(
          "Theo chính Faraday kể lại, ông vào sống trong đó, trong khi mặt ngoài lồng bị nạp điện cực mạnh, tia lửa phóng tóe ra khắp nơi.",
          "Theo chính Pha-ra-đây kể lại, ông vào sống trong đó, trong khi mặt ngoài lồng bị nạp điện cực mạnh, tia lửa phóng tóe ra khắp nơi.",
        ),
        nar(
          "Vậy mà điện nghiệm lá vàng và ngọn nến bên trong không hề có dấu hiệu gì. Điện chỉ nằm ở lớp vỏ bên ngoài!",
          "Vậy mà điện nghiệm lá vàng và ngọn nến bên trong không hề có dấu hiệu gì. Điện chỉ nằm ở lớp vỏ bên ngoài!",
        ),
      ],
    },
    theorem: {
      shot: "Quay lại chiếc ô tô dưới mưa, nay vẽ dạng mặt cắt. Câu 1: hai cột chữ viết tay hiện ra hai bên xe: 'VẬT DẪN ĐIỆN: thanh nhôm, sắt, đồng' và 'VẬT CÁCH ĐIỆN: cao su, nhựa, gỗ khô', tiêu đề nhỏ 'KHTN 8 · Bài 21'. Câu 2: lớp vỏ thép của xe phát sáng thành khung lồng giống lồng Faraday vừa rồi; tia sét đánh vào nóc, dòng điện vàng chạy men theo mái, xuống thành xe, vòng qua khoang ngồi rồi qua bánh xuống đất; Milo ngồi trong xe, hai tay đặt trên đùi, không chạm thành cửa; công thức hiện 'Sét → vỏ kim loại → đất'. Câu 3: đặt cạnh nhau một chiếc ô tô mui trần đã kéo mui vải và một chiếc xe vỏ sợi thủy tinh, cả hai đóng dấu ✖ đỏ 'KHÔNG BẢO VỆ'.",
      lines: [
        nar(
          "Kim loại dẫn điện, cao su thì cách điện: đó là vật dẫn điện và vật cách điện mà bạn học trong Khoa học tự nhiên lớp 8.",
          "Kim loại dẫn điện, cao su thì cách điện: đó là vật dẫn điện và vật cách điện mà bạn học trong Khoa học tự nhiên lớp tám.",
        ),
        nar(
          "Vỏ ô tô kín bằng kim loại chính là một chiếc lồng Faraday: dòng điện của tia sét chạy men theo mái và thành xe, vòng qua khoang ngồi rồi xuống đất.",
          "Vỏ ô tô kín bằng kim loại chính là một chiếc lồng Pha-ra-đây: dòng điện của tia sét chạy men theo mái và thành xe, vòng qua khoang ngồi rồi xuống đất.",
        ),
        nar(
          "Vì thế ô tô mui trần, kể cả khi đã kéo mui, hay xe vỏ sợi thủy tinh đều không bảo vệ bạn.",
          "Vì thế ô tô mui trần, kể cả khi đã kéo mui, hay xe vỏ sợi thủy tinh đều không bảo vệ bạn.",
        ),
      ],
    },
    realworld: {
      shot: "Cánh đồng lúa Việt Nam chiều giông, mây đen kéo tới. Câu 1: Milo (vai người đi đường, mặc áo mưa, đội mũ bảo hiểm) chạy xe máy trên bờ ruộng; viền chấm chấm vẽ quanh người Milo rồi biến mất, chữ 'KHÔNG CÓ VỎ = KHÔNG CÓ LỒNG'. Câu 2: tiếng sấm vẽ thành chữ 'ÙNG ÙNG'; từ đám mây kéo ra một vòng tròn bán kính ghi '≈ 16 km', Milo nằm trong vòng; nhãn 'NGHE SẤM = ĐANG TRONG TẦM SÉT'. Câu 3: Milo dừng xe, bước ra xa chiếc xe máy; một cây đa đứng một mình giữa đồng và cột điện bên đường bị đóng dấu ✖ đỏ; mũi tên xanh chỉ về phía một ngôi nhà gạch kiên cố và một chiếc ô tô mui kín, dấu ✔. Câu 4: Milo đứng trong hiên nhà nhìn ra, đồng hồ cát lật ngược, chữ '30 PHÚT SAU TIẾNG SẤM CUỐI'.",
      lines: [
        nar(
          "Còn xe máy thì sao? Xe máy không có vỏ bọc quanh người, nên chẳng có lồng Faraday nào cả.",
          "Còn xe máy thì sao? Xe máy không có vỏ bọc quanh người, nên chẳng có lồng Pha-ra-đây nào cả.",
        ),
        nar(
          "Đang đi giữa đồng mà nghe sấm, nghĩa là bạn đã ở trong tầm sét, vì sét có thể đánh xa khoảng 16 km tính từ cơn giông.",
          "Đang đi giữa đồng mà nghe sấm, nghĩa là bạn đã ở trong tầm sét, vì sét có thể đánh xa khoảng mười sáu ki-lô-mét tính từ cơn giông.",
        ),
        nar(
          "Cơ quan khí tượng Mỹ khuyên rời xe, vào ngay nhà kiên cố hoặc ô tô mui kín. Trang Phòng chống thiên tai Việt Nam cũng dặn đừng trú dưới gốc cây, tránh xa cột điện.",
          "Cơ quan khí tượng Mỹ khuyên rời xe, vào ngay nhà kiên cố hoặc ô tô mui kín. Trang Phòng chống thiên tai Việt Nam cũng dặn đừng trú dưới gốc cây, tránh xa cột điện.",
        ),
        nar(
          "Và chờ ít nhất 30 phút sau tiếng sấm cuối cùng rồi mới đi tiếp.",
          "Và chờ ít nhất ba mươi phút sau tiếng sấm cuối cùng rồi mới đi tiếp.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng lên bầu trời: một chiếc máy bay chở khách bay xuyên qua tầng mây giông, Milo (vai kỹ sư hàng không, kính bảo hộ kéo xuống) ngồi cạnh cửa sổ. Câu 1: tia sét đánh vào mũi máy bay, bảng số hiện '> 1 LẦN / NĂM / MỖI MÁY BAY'. Câu 2: dòng điện vàng chạy dọc lớp vỏ nhôm từ mũi tới đuôi rồi thoát vào không trung; cận cảnh bánh xe máy bay đang thu gọn trong thân, chữ viết tay 'chẳng bánh nào chạm đất!'. Câu 3: thu về chiếc ô tô mui kín trên đường quê; con dấu đỏ lớn 'TIN ĐỒN!' đóng xuống bốn chiếc lốp, rồi lớp vỏ xe sáng lên thành khung lồng Faraday ôm lấy Milo đang ngồi bên trong; danh sách nguồn chạy ở chân màn hình.",
      lines: [
        nar(
          "Phóng lên bầu trời: theo kỹ sư chống sét Edward Rupke, trung bình mỗi máy bay chở khách ở Mỹ bị sét đánh hơn một lần mỗi năm.",
          "Phóng lên bầu trời: theo kỹ sư chống sét Ét-uốt Rúp-kơ, trung bình mỗi máy bay chở khách ở Mỹ bị sét đánh hơn một lần mỗi năm.",
        ),
        nar(
          "Dòng điện chạy dọc lớp vỏ nhôm từ mũi hay đầu cánh tới đuôi rồi thoát đi, trong khi máy bay chẳng có chiếc bánh nào chạm đất!",
          "Dòng điện chạy dọc lớp vỏ nhôm từ mũi hay đầu cánh tới đuôi rồi thoát đi, trong khi máy bay chẳng có chiếc bánh nào chạm đất!",
        ),
        nar(
          "Phán quyết: Tin đồn! Ô tô kín an toàn không nhờ bốn chiếc lốp, mà nhờ lớp vỏ kim loại, chiếc lồng Faraday mà bạn đang ngồi bên trong.",
          "Phán quyết: Tin đồn! Ô tô kín an toàn không nhờ bốn chiếc lốp, mà nhờ lớp vỏ kim loại, chiếc lồng Pha-ra-đây mà bạn đang ngồi bên trong.",
        ),
      ],
    },
  }),
];
