/**
 * Tuần 1 "Thiên Đường Kiến Thức": 5 chủ đề điểm cao nhất trong bảng chấm
 * (research_notes/Thiên đường kiến thức/kho-chu-de-va-xu-huong.md, mục 7), đăng trước.
 * Tập 3 và 5 theo định dạng "Tin được hay Tin đồn?" (hồi cuối kết bằng phán quyết).
 */
import { makeEpisode, nar } from "./make.ts";

const week = 1;
const theme = "Nghịch lý & Tin đồn khoa học";

export const TUAN_1 = [
  makeEpisode({
    day: 1,
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
      { title: "Scientific American (Allison Parshall, 2024) — See Why Everyone Gets the Monty Hall Puzzle Wrong", url: "https://www.scientificamerican.com/article/why-almost-everyone-gets-the-monty-hall-probability-puzzle-wrong/" },
      { title: "Jeffrey S. Rosenthal — Monty Hall, Monty Fall, Monty Crawl, Math Horizons, 9/2008 (người dẫn mở bừa thì 1/2)", url: "https://www.probability.ca/jeff/writing/montyfall.pdf" },
      { title: "Stone, Keller, Kratzke, Strumpfer — Search for the Wreckage of Air France Flight AF 447, Statistical Science 29(1), 2014", url: "https://arxiv.org/abs/1405.4720" },
      { title: "MIT Technology Review — How Statisticians Found Air France Flight 447 Two Years After It Crashed Into the Atlantic", url: "https://www.technologyreview.com/2014/05/27/13283/how-statisticians-found-air-france-flight-447-two-years-after-it-crashed-into-atlantic/" },
    ],
    hook: {
      shot: "Sân khấu giấy da dựng thành trường quay truyền hình kiểu Mỹ thập niên 1990: ba cánh cửa gỗ lớn đánh số 1, 2, 3. Câu 1–2: Milo (vai người chơi) đứng giữa, sau lưng là trang tạp chí PARADE 1990 bay vào, có cột 'Ask Marilyn' gạch chân dòng 'NÊN ĐỔI CỬA'; hàng nghìn phong bì thư đổ ào xuống như mưa, con số '~1.000 TIẾN SĨ' đóng dấu đỏ. Câu 3: sau ba cánh cửa thoáng hiện bóng một chiếc xe và hai con dê, Milo chỉ vào cửa 1 (khung sáng vàng). Câu 4: người dẫn chương trình (bóng đen đeo nơ, tay cầm thẻ ghi 'TÔI BIẾT CHỖ CÓ DÊ') mở cửa 3, một con dê ló đầu ra kêu, rồi chìa tay mời đổi. Câu 5: bảng gỗ bật lên giữa màn hình: 'ĐỔI? / GIỮ?' kèm mũi tên chỉ xuống ô bình luận.",
      lines: [
        nar(
          "Năm 1990, một câu trả lời trên tạp chí Parade khiến chừng một nghìn tiến sĩ cầm bút viết thư phản đối.",
          "Năm một nghìn chín trăm chín mươi, một câu trả lời trên tạp chí Pa-rết khiến chừng một nghìn tiến sĩ cầm bút viết thư phản đối.",
        ),
        nar(
          "Người viết là Marilyn vos Savant. Cô khẳng định trong trò chơi ba cánh cửa, đổi cửa thì thắng gấp đôi.",
          "Người viết là Ma-ri-lin vốt Xa-văng. Cô khẳng định trong trò chơi ba cánh cửa, đổi cửa thì thắng gấp đôi.",
        ),
        nar(
          "Luật chơi thế này. Sau ba cánh cửa là một chiếc xe và hai con dê. Bạn chọn một cửa.",
          "Luật chơi thế này. Sau ba cánh cửa là một chiếc xe và hai con dê. Bạn chọn một cửa.",
        ),
        nar(
          "Người dẫn biết xe ở đâu, luôn mở một cửa còn lại có dê, rồi mời bạn đổi.",
          "Người dẫn biết xe ở đâu, luôn mở một cửa còn lại có dê, rồi mời bạn đổi.",
        ),
        nar(
          "Nếu là bạn, bạn đổi hay giữ? Ghi vào bình luận trước khi xem tiếp nhé!",
          "Nếu là bạn, bạn đổi hay giữ? Ghi vào bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Núi thư chất cao sau lưng Milo; vài lá thư bung ra, hiện dòng viết tay 'CÒN 2 CỬA → 50/50!' và chữ ký 'Ph.D.'. Câu 2: hai cửa còn đóng (1 và 2) hiện nhãn '50%' và '50%' rung rinh, rồi một dấu ✖ đỏ lớn đóng lên hai nhãn đó. Câu 3: chân dung khắc gỗ của nhà toán học Paul Erdős khoanh tay lắc đầu, nhãn 'KHÔNG TIN'; chuyển sang một chiếc máy tính đời cũ màn hình xanh hiện bộ đếm số ván chạy vùn vụt.",
      lines: [
        nar(
          "Thư cứ thế đổ về. Theo nhà tâm lý học Steven Pinker kể lại, cả thảy chừng 10.000 lá, phần lớn bảo cô sai.",
          "Thư cứ thế đổ về. Theo nhà tâm lý học Xti-vơn Pinh-cơ kể lại, cả thảy chừng mười nghìn lá, phần lớn bảo cô sai.",
        ),
        nar(
          "Lý lẽ nghe rất xuôi. Chỉ còn hai cửa đóng, xe ở một trong hai, vậy mỗi cửa năm mươi phần trăm, đúng không?",
          "Lý lẽ nghe rất xuôi. Chỉ còn hai cửa đóng, xe ở một trong hai, vậy mỗi cửa năm mươi phần trăm, đúng không?",
        ),
        nar(
          "Ngay cả nhà toán học lừng danh Paul Erdős cũng phản đối. Phải xem trò chơi mô phỏng lặp đi lặp lại, ông mới chịu tin.",
          "Ngay cả nhà toán học lừng danh Pôn Ẹc-đốt cũng phản đối. Phải xem trò chơi mô phỏng lặp đi lặp lại, ông mới chịu tin.",
        ),
      ],
    },
    eureka: {
      shot: "Bảng phấn chia ba hàng ngang, mỗi hàng là một bộ ba cánh cửa nhỏ 1-2-3; ở cả ba hàng, Milo (vai người chơi) dán ngôi sao vàng lên cửa 1. Câu 1: ba hàng lần lượt hiện bóng chiếc xe ở cửa 1, cửa 2, cửa 3 (nhãn 'XE Ở CỬA 1 / 2 / 3'). Câu 2: hàng 'XE Ở CỬA 2', người dẫn mở cửa 3, con dê ló ra, nhãn 'BẮT BUỘC'; mũi tên từ cửa 1 nhảy sang cửa 2, dấu ✔ xanh 'ĐỔI → THẮNG'. Câu 3: hàng 'XE Ở CỬA 3', người dẫn mở cửa 2, mũi tên nhảy sang cửa 3, dấu ✔ xanh. Câu 4: hàng 'XE Ở CỬA 1', người dẫn mở một cửa dê bất kỳ, đổi thì dấu ✖ đỏ 'ĐỔI → THUA'; cột tổng kết bên phải đếm '✔ ✔ ✖', bật số 'ĐỔI THẮNG 2/3 · GIỮ 1/3'. Câu 5: thoáng cảnh bức tường 100 cửa nhỏ, 98 cửa bật mở ra dê, chừa lại đúng một cửa phát sáng, Milo nhìn cửa của mình rồi nhìn cửa phát sáng, gãi đầu.",
      lines: [
        nar(
          "Vậy ai đúng? Cách chắc nhất là xét hết mọi khả năng. Giả sử bạn luôn chọn cửa 1, còn xe có thể nằm sau cửa 1, cửa 2 hoặc cửa 3.",
          "Vậy ai đúng? Cách chắc nhất là xét hết mọi khả năng. Giả sử bạn luôn chọn cửa một, còn xe có thể nằm sau cửa một, cửa hai hoặc cửa ba.",
        ),
        nar(
          "Xe ở cửa 2? Người dẫn không được mở trúng xe, nên buộc phải mở cửa 3. Bạn đổi sang cửa 2, thắng!",
          "Xe ở cửa hai? Người dẫn không được mở trúng xe, nên buộc phải mở cửa ba. Bạn đổi sang cửa hai, thắng!",
        ),
        nar(
          "Xe ở cửa 3? Người dẫn buộc phải mở cửa 2. Bạn đổi sang cửa 3, lại thắng!",
          "Xe ở cửa ba? Người dẫn buộc phải mở cửa hai. Bạn đổi sang cửa ba, lại thắng!",
        ),
        nar(
          "Chỉ khi xe nằm ngay cửa 1, đổi mới thua. Ba trường hợp, đổi thắng hai. Vậy đổi thắng 2/3, giữ chỉ thắng 1/3.",
          "Chỉ khi xe nằm ngay cửa một, đổi mới thua. Ba trường hợp, đổi thắng hai. Vậy đổi thắng hai phần ba, giữ chỉ thắng một phần ba.",
        ),
        nar(
          "Vẫn thấy lạ? Thử với 100 cửa. Bạn chọn một, người dẫn mở 98 cửa có dê, chừa lại đúng một cửa. Bạn còn muốn giữ cửa của mình không?",
          "Vẫn thấy lạ? Thử với một trăm cửa. Bạn chọn một, người dẫn mở chín mươi tám cửa có dê, chừa lại đúng một cửa. Bạn còn muốn giữ cửa của mình không?",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: bảng gỗ lớn chỉ một dòng chữ to 'ĐỔI = THẮNG KHI LẦN ĐẦU CHỌN SAI'; bên dưới ba cánh cửa, hai cửa dê tô đỏ nhãn 'CHỌN SAI: 2/3', một cửa xe nhãn 'CHỌN ĐÚNG: 1/3'. Câu 2: người dẫn (bóng đen đeo nơ) giơ thẻ 'TÔI BIẾT · KHÔNG MỞ TRÚNG XE'; rồi cảnh phụ: người dẫn trượt vỏ chuối, ngã đẩy bừa một cánh cửa, ra dê, nhãn 'MỞ BỪA → 1/2 · 1/2' (in nhỏ 'Rosenthal, 2008'). Câu 3: Milo (vai học giả, cầm phấn) viết công thức P(A|B) = P(A∩B) : P(B), chữ B được khoanh và chú thích 'B = người dẫn mở cửa 3'; mép cuốn vở Toán 12 hiện dòng 'Xác suất có điều kiện'.",
      lines: [
        nar(
          "Nói gọn lại, đổi cửa sẽ thắng mỗi khi lần chọn đầu tiên của bạn sai. Mà ba cửa có tới hai con dê, nên bạn chọn sai tới 2/3 số lần.",
          "Nói gọn lại, đổi cửa sẽ thắng mỗi khi lần chọn đầu tiên của bạn sai. Mà ba cửa có tới hai con dê, nên bạn chọn sai tới hai phần ba số lần.",
        ),
        nar(
          "Mấu chốt là người dẫn biết xe ở đâu và không bao giờ mở trúng xe. Nếu anh ta mở bừa mà tình cờ ra dê, lúc ấy mới thật sự là năm mươi năm mươi.",
          "Mấu chốt là người dẫn biết xe ở đâu và không bao giờ mở trúng xe. Nếu anh ta mở bừa mà tình cờ ra dê, lúc ấy mới thật sự là năm mươi năm mươi.",
        ),
        nar(
          "Biết thêm một thông tin thì phải tính lại xác suất. Đó chính là xác suất có điều kiện mà bạn học trong Toán lớp 12.",
          "Biết thêm một thông tin thì phải tính lại xác suất. Đó chính là xác suất có điều kiện mà bạn học trong Toán lớp mười hai.",
        ),
      ],
    },
    realworld: {
      shot: "Câu 1: chuyển sang bàn ăn gia đình, ba chiếc cốc úp ngược, Milo giấu một đồng xu dưới một cốc. Câu 2: Milo đổi vai làm người dẫn (đeo nơ), bạn ngồi đối diện chọn một cốc; Milo nhìn thấy đồng xu nên lật đúng một cốc trống, bong bóng ý nghĩ 'CHỌN SAI THÌ TÔI KHÔNG CÒN LỰA CHỌN'. Câu 3: bảng đếm vạch phấn 'ĐỔI ✔' tăng dần lên khoảng hai phần ba số ván, nhãn '30 VÁN'; mũi tên chỉ xuống ô bình luận 'KẾT QUẢ CỦA BẠN?'.",
      lines: [
        nar(
          "Không tin thì thử ngay tại nhà. Úp ba cái cốc xuống bàn, giấu một đồng xu dưới một cốc, rủ một người bạn làm người chơi.",
          "Không tin thì thử ngay tại nhà. Úp ba cái cốc xuống bàn, giấu một đồng xu dưới một cốc, rủ một người bạn làm người chơi.",
        ),
        nar(
          "Còn bạn làm người dẫn. Bạn sẽ thấy ngay, hễ bạn mình chọn trúng cốc trống, bạn chẳng còn lựa chọn nào, buộc phải chừa lại đúng cốc có xu.",
          "Còn bạn làm người dẫn. Bạn sẽ thấy ngay, hễ bạn mình chọn trúng cốc trống, bạn chẳng còn lựa chọn nào, buộc phải chừa lại đúng cốc có xu.",
        ),
        nar(
          "Chơi ba mươi ván, ván nào bạn mình cũng đổi, rồi đếm xem thắng bao nhiêu ván. Kể kết quả vào bình luận nhé!",
          "Chơi ba mươi ván, ván nào bạn mình cũng đổi, rồi đếm xem thắng bao nhiêu ván. Kể kết quả vào bình luận nhé!",
        ),
      ],
    },
    cosmic: {
      shot: "Câu 1: camera bay vút ra xa, bản đồ giấy da Đại Tây Dương giữa Brazil và châu Phi, dấu chấm đỏ 'VỊ TRÍ CUỐI · 1/6/2009', vòng tròn bán kính 40 hải lý chia ô lưới phủ màu đậm nhạt như bản đồ nhiệt; bốn mảng ô lần lượt được tô sọc 'ĐÃ DÒ · HỤT'. Câu 2: các mảng đã dò nhạt màu đi, trong khi một vùng khác đậm dần lên (giống cửa người dẫn chừa lại phát sáng). Câu 3: Milo (vai nhà thám hiểm biển, đội mũ phao) thả robot lặn xuống đúng ô đậm nhất; đèn pha soi thấy mảnh thân máy bay dưới đáy, nhãn 'HƠN 4.000 M · 4/2011 · 1 TUẦN'. Câu 4: camera kéo ngược về trường quay, ba cánh cửa hiện lại, cánh cửa người dẫn chừa lại sáng lên vàng ánh, Milo đặt tay lên tay nắm cửa.",
      lines: [
        nar(
          "Và đây mới là chỗ thú vị. Năm 2009, chuyến bay Air France 447 chở 228 người rơi xuống Đại Tây Dương. Bốn đợt tìm kiếm gần hai năm đều trắng tay.",
          "Và đây mới là chỗ thú vị. Năm hai nghìn không trăm linh chín, chuyến bay E Phờ-răng bốn bốn bảy chở hai trăm hai mươi tám người rơi xuống Đại Tây Dương. Bốn đợt tìm kiếm gần hai năm đều trắng tay.",
        ),
        nar(
          "Nhóm chuyên gia Metron coi mỗi lần tìm hụt là thông tin mới, hệt như người dẫn mở một cửa có dê. Vùng đã dò hạ xác suất, vùng chưa dò tăng lên.",
          "Nhóm chuyên gia Mê-trôn coi mỗi lần tìm hụt là thông tin mới, hệt như người dẫn mở một cửa có dê. Vùng đã dò hạ xác suất, vùng chưa dò tăng lên.",
        ),
        nar(
          "Tháng 4 năm 2011, chỉ sau một tuần dò theo bản đồ mới, xác máy bay hiện ra ở độ sâu hơn 4.000 mét.",
          "Tháng tư năm hai nghìn không trăm mười một, chỉ sau một tuần dò theo bản đồ mới, xác máy bay hiện ra ở độ sâu hơn bốn nghìn mét.",
        ),
        nar(
          "Lần sau gặp hai cửa đóng, hãy nhớ cánh cửa người dẫn cố tình chừa lại.",
          "Lần sau gặp hai cửa đóng, hãy nhớ cánh cửa người dẫn cố tình chừa lại.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 2,
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
      shot: "Mở thẳng vào cận cảnh hai bàn tay găng trắng của phi hành gia: tay phải cầm chiếc búa địa chất bằng nhôm, tay trái cầm một chiếc lông chim ưng dài; nền là bụi xám Mặt Trăng, bầu trời đen, mô-đun đổ bộ Falcon và xe tự hành phía xa. Câu 2: lùi ra, Milo trong bộ đồ du hành, kính đồng thau gài trên mũ (vai David Scott), đứng ở vùng Hadley; thẻ ngày '2/8/1971 · APOLLO 15' đóng dấu xuống góc giấy da. Câu 3: hình đóng băng ngay khoảnh khắc buông tay, Milo quay ra giơ tấm bảng ba ô 'BÚA? · LÔNG CHIM? · CÙNG LÚC?', mũi tên nhấp nháy chỉ xuống khung bình luận.",
      lines: [
        nar(
          "Thả cùng lúc một chiếc búa và một chiếc lông chim, cái nào chạm đất trước? Ai cũng đáp ngay, chiếc búa!",
          "Thả cùng lúc một chiếc búa và một chiếc lông chim, cái nào chạm đất trước? Ai cũng đáp ngay, chiếc búa!",
        ),
        nar(
          "Thế nhưng ngày 2/8/1971, phi hành gia David Scott của Apollo 15 đã làm đúng phép thử ấy trên Mặt Trăng, ngay trước ống kính máy quay.",
          "Thế nhưng ngày hai tháng tám năm một nghìn chín trăm bảy mươi mốt, phi hành gia Đây-vít Xcốt của A-pô-lô mười lăm đã làm đúng phép thử ấy trên Mặt Trăng, ngay trước ống kính máy quay.",
        ),
        nar(
          "Bạn cược gì nào? Búa, lông chim, hay cả hai chạm đất cùng lúc? Ghi vào bình luận trước khi xem tiếp nhé!",
          "Bạn cược gì nào? Búa, lông chim, hay cả hai chạm đất cùng lúc? Ghi vào bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Chuyển về sân Trái Đất: Milo (áo sơ mi xanh, ghi-lê rêu) thả cùng lúc một hòn đá và một chiếc lá; hòn đá rơi thẳng 'cộp', chiếc lá chao lượn mãi; tờ giấy thả sau cũng lượn lờ. Câu 2: lật trang giấy da sang Athens cổ, Milo (vai Aristotle, áo choàng trắng) viết lên cuộn giấy dòng chữ 'NẶNG GẤP ĐÔI → RƠI NHANH GẤP ĐÔI', bên cạnh hai quả cầu 1 kg và 2 kg với mũi tên tốc độ dài gấp đôi. Câu 3: dòng chữ được đóng khung vàng, xếp chồng lên nhiều cuốn sách cổ có nhãn thế kỷ, như được dạy lại qua bao đời.",
      lines: [
        nar(
          "Trực giác ấy chẳng hề ngớ ngẩn. Ngoài đời, hòn đá luôn rơi nhanh hơn chiếc lá, còn tờ giấy thì chao lượn mãi mới chạm đất.",
          "Trực giác ấy chẳng hề ngớ ngẩn. Ngoài đời, hòn đá luôn rơi nhanh hơn chiếc lá, còn tờ giấy thì chao lượn mãi mới chạm đất.",
        ),
        nar(
          "Hơn 2.300 năm trước, nhà triết học Hy Lạp Aristotle cũng nghĩ vậy. Theo ông, vật rơi nhanh tỉ lệ với sức nặng của nó.",
          "Hơn hai nghìn ba trăm năm trước, nhà triết học Hy Lạp A-ri-xtốt cũng nghĩ vậy. Theo ông, vật rơi nhanh tỉ lệ với sức nặng của nó.",
        ),
        nar(
          "Nặng gấp đôi thì rơi nhanh gấp đôi. Nghe hợp lý đến mức suốt nhiều thế kỷ, ý ấy được dạy như một chân lý.",
          "Nặng gấp đôi thì rơi nhanh gấp đôi. Nghe hợp lý đến mức suốt nhiều thế kỷ, ý ấy được dạy như một chân lý.",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: tháp nghiêng Pisa vẽ mờ như tranh cũ, Milo (vai Galileo) đứng trên đỉnh cầm hai quả cầu, con dấu đỏ 'TƯƠNG TRUYỀN' đóng chéo lên cảnh; một cuốn sách nhỏ ghi 'VIVIANI kể lại' bay qua. Câu 2: gạch bỏ cảnh tháp, chuyển vào xưởng, máng gỗ nghiêng dài, Milo thả viên bi đồng lăn xuống, nhịp quả lắc tích tắc. Câu 3: vạch quãng đường hiện theo nhịp: '1 nhịp → 1', '2 nhịp → 4', '3 nhịp → 9'. Câu 4: cắt về Mặt Trăng, quay chậm cú thả, búa và lông chim song song rơi xuống, chạm bụi cùng một khung hình; bụi tung lên, Milo-Scott dang tay, bong bóng thoại 'GALILEO ĐÃ ĐÚNG!'.",
      lines: [
        nar(
          "Người lật lại ý ấy là Galileo. Tương truyền, ông thả hai quả cầu từ tháp nghiêng Pisa, nhưng chuyện này do học trò Viviani kể lại, và nhiều sử gia nghi ngờ.",
          "Người lật lại ý ấy là Ga-li-lê. Tương truyền, ông thả hai quả cầu từ tháp nghiêng Pi-da, nhưng chuyện này do học trò Vi-vi-a-ni kể lại, và nhiều sử gia nghi ngờ.",
        ),
        nar(
          "Điều có ghi chép là một thí nghiệm khéo hơn. Khoảng năm 1604, Galileo cho bi lăn xuống máng nghiêng, làm chậm cú rơi để kịp đo.",
          "Điều có ghi chép là một thí nghiệm khéo hơn. Khoảng năm một nghìn sáu trăm linh tư, Ga-li-lê cho bi lăn xuống máng nghiêng, làm chậm cú rơi để kịp đo.",
        ),
        nar(
          "Cú rơi nhanh dần đều. Sau hai nhịp, bi đi xa gấp bốn, sau ba nhịp, gấp chín. Galileo kết luận, không có không khí cản, mọi vật rơi nhanh như nhau.",
          "Cú rơi nhanh dần đều. Sau hai nhịp, bi đi xa gấp bốn, sau ba nhịp, gấp chín. Ga-li-lê kết luận, không có không khí cản, mọi vật rơi nhanh như nhau.",
        ),
        nar(
          "Và trên Mặt Trăng, nơi gần như không có không khí, búa và lông chim chạm đất cùng lúc! Scott reo lên, điều đó chứng tỏ ngài Galileo đã đúng.",
          "Và trên Mặt Trăng, nơi gần như không có không khí, búa và lông chim chạm đất cùng lúc! Xcốt reo lên, điều đó chứng tỏ ngài Ga-li-lê đã đúng.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: trở lại sân Trái Đất, quanh chiếc lông chim đang rơi hiện các mũi tên nhỏ của không khí đẩy ngược lên; Milo (vai học giả, kính đồng thau kéo xuống mắt) dùng chiếc bơm tay hút hết khí trong một ống thủy tinh dài, các mũi tên biến mất, chỉ còn một mũi tên trọng lực P hướng xuống trên cả búa lẫn lông. Câu 2: công thức s = ½gt² mọc ra từ hai vệt rơi song song. Câu 3: bảng so sánh hai cột 'TRÁI ĐẤT g ≈ 9,8 m/s²' và 'MẶT TRĂNG g ≈ 1,62 m/s²', thước đo cao 1,6 m, đồng hồ đếm đến 1,4 giây. Câu 4: cuốn Vật lí 10 mở ra ở Bài 10, trang mở đầu có hình búa và lông chim.",
      lines: [
        nar(
          "Vậy cái gì làm lông chim rơi chậm? Thủ phạm là sức cản không khí. Bỏ không khí đi, vật chỉ còn chịu trọng lực, và đó là rơi tự do.",
          "Vậy cái gì làm lông chim rơi chậm? Thủ phạm là sức cản không khí. Bỏ không khí đi, vật chỉ còn chịu trọng lực, và đó là rơi tự do.",
        ),
        nar(
          "Ở cùng một nơi, mọi vật rơi tự do đều nhanh dần với cùng gia tốc g, dù nặng hay nhẹ. Quãng rơi là s = ½gt².",
          "Ở cùng một nơi, mọi vật rơi tự do đều nhanh dần với cùng gia tốc giê, dù nặng hay nhẹ. Quãng rơi là ét bằng một phần hai giê tê bình phương.",
        ),
        nar(
          "Mặt Trăng hút yếu hơn nhiều, g chỉ khoảng 1,62 m/s². Vì thế từ độ cao 1,6 mét, búa và lông chim cùng rơi mất chừng 1,4 giây.",
          "Mặt Trăng hút yếu hơn nhiều, giê chỉ khoảng một phẩy sáu hai mét trên giây bình phương. Vì thế từ độ cao một phẩy sáu mét, búa và lông chim cùng rơi mất chừng một phẩy bốn giây.",
        ),
        nar(
          "Đó chính là bài Sự rơi tự do trong Vật lí lớp 10, và bài học ấy mở đầu bằng chính cú thả này.",
          "Đó chính là bài Sự rơi tự do trong Vật lí lớp mười, và bài học ấy mở đầu bằng chính cú thả này.",
        ),
      ],
    },
    realworld: {
      shot: "Câu 1: bàn học ở nhà, Milo thả riêng một cuốn sách và một tờ giấy phẳng, sách 'bộp' xuống trước, giấy lượn lờ (✖). Câu 2: Milo đặt tờ giấy nằm phẳng trên mặt cuốn sách, thả, quay chậm: luồng gió vẽ bằng nét chì bị cuốn sách rẽ sang hai bên, sách và giấy chạm bàn cùng lúc (✔). Câu 3: chuyển cảnh mặt cắt dọc một giếng sâu dưới lòng đất của trung tâm NASA Glenn, ống thép dài, nhãn '132 m · gần như chân không', khối thí nghiệm rơi từ đỉnh, đồng hồ góc màn hình chạy đến '5,18 giây'.",
      lines: [
        nar(
          "Muốn tự kiểm chứng? Bạn thử được ngay ở nhà. Thả riêng một cuốn sách và một tờ giấy, cuốn sách sẽ xuống trước.",
          "Muốn tự kiểm chứng? Bạn thử được ngay ở nhà. Thả riêng một cuốn sách và một tờ giấy, cuốn sách sẽ xuống trước.",
        ),
        nar(
          "Giờ đặt tờ giấy nằm phẳng trên cuốn sách rồi thả. Cuốn sách rẽ không khí cho tờ giấy, và cả hai chạm đất cùng lúc!",
          "Giờ đặt tờ giấy nằm phẳng trên cuốn sách rồi thả. Cuốn sách rẽ không khí cho tờ giấy, và cả hai chạm đất cùng lúc!",
        ),
        nar(
          "Ở quy mô lớn, tháp rơi của NASA Glenn cho thiết bị rơi 132 mét trong ống thép hút gần hết khí, được 5,18 giây gần như không trọng lượng.",
          "Ở quy mô lớn, tháp rơi của Na-sa Gờ-len cho thiết bị rơi một trăm ba mươi hai mét trong ống thép hút gần hết khí, được năm phẩy một tám giây gần như không trọng lượng.",
        ),
      ],
    },
    cosmic: {
      shot: "Câu 1: phóng ra vũ trụ, Trái Đất xanh tròn trên nền đen, trạm vũ trụ quốc tế ISS bay ngang. Câu 2: nhãn 'trọng lực ≈ 90%'; Milo phi hành gia lơ lửng trong trạm, dấu hỏi lớn bên cạnh. Câu 3: nhãn '≈ 28.000 km/h', vẽ đường cong: một mũi tên rơi thẳng xuống cộng một mũi tên lao ngang tạo thành quỹ đạo tròn ôm lấy Trái Đất; phóng vào trong trạm, chiếc búa và chiếc lông chim lơ lửng song song cạnh Milo. Câu 4: thu nhỏ dần về bụi xám Mặt Trăng, khung hình cuối là búa và lông chim nằm cạnh nhau trên mặt bụi, chữ viết tay 'CÙNG MỘT LÚC'.",
      lines: [
        nar(
          "Và ngay lúc này, có một thứ khổng lồ cũng đang rơi tự do. Đó là trạm vũ trụ quốc tế ISS!",
          "Và ngay lúc này, có một thứ khổng lồ cũng đang rơi tự do. Đó là trạm vũ trụ quốc tế ai ét ét!",
        ),
        nar(
          "Theo NASA, ở độ cao của trạm, trọng lực vẫn còn khoảng 90% so với mặt đất. Vậy sao các phi hành gia lại lơ lửng?",
          "Theo Na-sa, ở độ cao của trạm, trọng lực vẫn còn khoảng chín mươi phần trăm so với mặt đất. Vậy sao các phi hành gia lại lơ lửng?",
        ),
        nar(
          "Bởi trạm lao ngang khoảng 28.000 km/h, cứ rơi mà mãi hụt mặt đất cong. Người và đồ vật bên trong rơi cùng nhau, nên trông như lơ lửng.",
          "Bởi trạm lao ngang khoảng hai mươi tám nghìn ki-lô-mét mỗi giờ, cứ rơi mà mãi hụt mặt đất cong. Người và đồ vật bên trong rơi cùng nhau, nên trông như lơ lửng.",
        ),
        nar(
          "Chính quy luật ấy giữ trạm trên quỹ đạo, và đưa chiếc búa cùng chiếc lông chim chạm bụi Mặt Trăng trong cùng một khoảnh khắc.",
          "Chính quy luật ấy giữ trạm trên quỹ đạo, và đưa chiếc búa cùng chiếc lông chim chạm bụi Mặt Trăng trong cùng một khoảnh khắc.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 3,
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
      shot: "Căn bếp Việt buổi sáng trên sân khấu giấy da: bát cơm nguội úp đĩa trên bàn, nồi cơm điện bên cạnh, đồng hồ treo tường chỉ 7 giờ. Câu 1: Milo (vai người nội trợ, đeo tạp dề trên áo ghi-lê) đứng giữa hai bong bóng lời bật lần lượt: trái 'ĂN BAO NĂM CÓ SAO ĐÂU', phải 'ĐỂ QUA ĐÊM LÀ THÀNH ĐỘC'. Câu 2: kim đồng hồ quay ngược về lúc tắt bếp tối qua, dòng chữ viết tay 'mấy tiếng đầu…'. Câu 3: Milo giơ tấm bảng ba ô 'TIN ĐƯỢC / TIN ĐỒN / TÙY?', mũi tên chỉ xuống ô bình luận. Chuyển cảnh: bát cơm phóng to dần.",
      lines: [
        nar(
          "Một bát cơm nguội qua đêm đủ chia cả nhà làm hai phe. Người bảo ăn bao năm có sao đâu, người bảo để qua đêm là thành độc.",
          "Một bát cơm nguội qua đêm đủ chia cả nhà làm hai phe. Người bảo ăn bao năm có sao đâu, người bảo để qua đêm là thành độc.",
        ),
        nar(
          "Vậy ai đúng? Hóa ra điều quyết định không nằm ở lúc hâm cơm, mà ở mấy tiếng đầu tiên sau khi tắt bếp.",
          "Vậy ai đúng? Hóa ra điều quyết định không nằm ở lúc hâm cơm, mà ở mấy tiếng đầu tiên sau khi tắt bếp.",
        ),
        nar(
          "Bạn chọn Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp nhé!",
          "Bạn chọn Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Sân khấu chia đôi. Câu 1–2, bên trái: nồi cơm sôi sùng sục, nhãn 'ĐÃ NẤU CHÍN = SẠCH?' rồi đóng dấu ✖ đỏ khi một hạt gạo phóng to lộ ra chấm nhỏ có vỏ dày, nhãn 'BÀO TỬ BACILLUS CEREUS'. Câu 3, bên phải: chảo hâm cơm bốc khói, nhãn 'HÂM LẠI LÀ HỎNG?' rồi gạch chéo, thay bằng mũi tên chỉ ngược về tủ bếp có chữ 'CẤT THẾ NÀO MỚI LÀ CHUYỆN'. Milo (vai thanh tra an toàn thực phẩm, cầm sổ ghi chép) gãi đầu nhìn hai bên.",
      lines: [
        nar(
          "Phe yên tâm có lý do hẳn hoi. Nấu chín và hâm nóng thường giết được vi khuẩn, nên nồi cơm đã sôi kỹ tưởng như sạch hẳn.",
          "Phe yên tâm có lý do hẳn hoi. Nấu chín và hâm nóng thường giết được vi khuẩn, nên nồi cơm đã sôi kỹ tưởng như sạch hẳn.",
        ),
        nar(
          "Vậy mà theo hệ thống y tế NHS của Anh, gạo sống có thể mang bào tử vi khuẩn Bacillus cereus. Và bào tử ấy sống sót qua nồi cơm.",
          "Vậy mà theo hệ thống y tế en hát ét của Anh, gạo sống có thể mang bào tử vi khuẩn Ba-xi-lút xê-rê-út. Và bào tử ấy sống sót qua nồi cơm.",
        ),
        nar(
          "Còn phe lo sợ chỉ đúng một nửa. Cơ quan Tiêu chuẩn Thực phẩm Anh nói rắc rối không nằm ở việc hâm lại, mà ở cách cất cơm trước khi hâm.",
          "Còn phe lo sợ chỉ đúng một nửa. Cơ quan Tiêu chuẩn Thực phẩm Anh nói rắc rối không nằm ở việc hâm lại, mà ở cách cất cơm trước khi hâm.",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: mô hình nhỏ, bào tử vẽ như hạt nhỏ mặc áo giáp đồng thau. Hai nhiệt kế đứng cạnh nhau: nhiệt kế nồi cơm dừng ở 100 °C, nhiệt kế nồi hấp công nghiệp lên 121 °C kèm đồng hồ cát 3 phút; bào tử chỉ vỡ áo ở nhiệt kế thứ hai. Câu 2: cơm nằm trên bàn bếp ban đêm, bào tử cởi áo, nảy mầm. Câu 3–4: chia đôi liên tục theo nhịp đồng hồ 20 phút; bộ đếm chạy 1 → 2 → 4 → … → 16.777.216, nhãn 'LÝ THUYẾT · ĐIỀU KIỆN LÝ TƯỞNG · 8 GIỜ = 24 LẦN CHIA'. Milo (vai nhà nghiên cứu, kính bảo hộ hạ xuống mắt) há hốc. Câu 5: những chấm nhỏ màu cam (độc tố) lơ lửng quanh hạt cơm; ngọn lửa chảo bùng lên nhưng chấm cam vẫn còn, nhãn 'HÂM NÓNG KHÔNG XÓA ĐƯỢC'.",
      lines: [
        nar(
          "Vì sao bào tử lì đến thế? Vì nó như mặc áo giáp. Theo Trung tâm An toàn Thực phẩm Hồng Kông, muốn diệt nó phải đun tới 121 độ C suốt 3 phút.",
          "Vì sao bào tử lì đến thế? Vì nó như mặc áo giáp. Theo Trung tâm An toàn Thực phẩm Hồng Kông, muốn diệt nó phải đun tới một trăm hai mươi mốt độ xê suốt ba phút.",
        ),
        nar(
          "Nồi cơm nhà mình chỉ sôi quanh 100 độ, nên bào tử vẫn nằm im. Để cơm ở nhiệt độ phòng, chúng nảy mầm và sinh sôi.",
          "Nồi cơm nhà mình chỉ sôi quanh một trăm độ, nên bào tử vẫn nằm im. Để cơm ở nhiệt độ phòng, chúng nảy mầm và sinh sôi.",
        ),
        nar(
          "Nhanh cỡ nào? Trên lý thuyết, cứ 20 phút vi khuẩn lại chia đôi.",
          "Nhanh cỡ nào? Trên lý thuyết, cứ hai mươi phút vi khuẩn lại chia đôi.",
        ),
        nar(
          "Một đêm 8 tiếng là 24 lần chia. Từ một con, sáng ra đã thành hơn 16 triệu.",
          "Một đêm tám tiếng là hai mươi tư lần chia. Từ một con, sáng ra đã thành hơn mười sáu triệu.",
        ),
        nar(
          "Vi khuẩn càng đông, độc tố tiết ra càng nhiều. Và theo NHS, hâm nóng lại không xóa được thứ độc tố này.",
          "Vi khuẩn càng đông, độc tố tiết ra càng nhiều. Và theo en hát ét, hâm nóng lại không xóa được thứ độc tố này.",
        ),
      ],
    },
    theorem: {
      shot: "Bảng giấy da của học giả: Milo (vai thầy giáo Sinh học) vẽ tế bào vi khuẩn với nội bào tử vỏ dày bên trong, nhãn 'NỘI BÀO TỬ'; góc trên hiện thẻ 'SINH HỌC 10 · BÀI 21'. Câu 2: bên cạnh, một vi khuẩn E. coli tách đôi, đồng hồ ghi '20 PHÚT = THỜI GIAN THẾ HỆ'. Câu 3: công thức N = N₀ · 2ⁿ mọc ra từ dãy tế bào nhân đôi, n = 24 gắn với kết quả hơn 16 triệu ở hồi trước.",
      lines: [
        nar(
          "Bộ áo giáp và phép chia đôi ấy, bạn đã gặp trong Sinh học lớp 10, ở Bài 21, Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật.",
          "Bộ áo giáp và phép chia đôi ấy, bạn đã gặp trong Sinh học lớp mười, ở Bài hai mươi mốt, Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật.",
        ),
        nar(
          "Sách gọi lớp áo giáp là nội bào tử, giúp vi khuẩn sống qua lúc bất lợi, và lấy ví dụ E. coli cứ 20 phút phân chia một lần.",
          "Sách gọi lớp áo giáp là nội bào tử, giúp vi khuẩn sống qua lúc bất lợi, và lấy ví dụ e cô-li cứ hai mươi phút phân chia một lần.",
        ),
        nar(
          "Khoảng 20 phút ấy gọi là thời gian thế hệ. Sau n lần chia, số tế bào bằng số ban đầu nhân hai mũ n. Hai mũ 24 chính là hơn 16 triệu lúc nãy.",
          "Khoảng hai mươi phút ấy gọi là thời gian thế hệ. Sau en lần chia, số tế bào bằng số ban đầu nhân hai mũ en. Hai mũ hai mươi tư chính là hơn mười sáu triệu lúc nãy.",
        ),
      ],
    },
    realworld: {
      shot: "Bếp nhà, Milo (vai người nội trợ) làm từng bước, mỗi bước bật một thẻ số. Câu 1–2: 1) xới cơm khỏi nồi cơm điện ra ba hộp nông, đồng hồ cát '1 GIỜ'; 2) đặt hộp vào tủ lạnh, cửa tủ đóng lại. Câu 3: 3) lịch bàn lật một trang, nhãn '≤ 24 GIỜ'; 4) chảo cơm rang bốc hơi đều, nhãn 'NÓNG BỐC HƠI · CHỈ 1 LẦN'. Góc dưới: nguồn 'Food Standards Scotland · NHS'.",
      lines: [
        nar(
          "Biết thủ phạm rồi, cách phòng lại khá đơn giản. Cơ quan Tiêu chuẩn Thực phẩm Scotland khuyên làm nguội cơm thật nhanh, lý tưởng là trong vòng 1 giờ.",
          "Biết thủ phạm rồi, cách phòng lại khá đơn giản. Cơ quan Tiêu chuẩn Thực phẩm Xcốt-len khuyên làm nguội cơm thật nhanh, lý tưởng là trong vòng một giờ.",
        ),
        nar(
          "Đừng để cơm nằm mãi trong nồi. Xới ra, chia thành phần nhỏ cho mau nguội, rồi cất ngay vào tủ lạnh.",
          "Đừng để cơm nằm mãi trong nồi. Xới ra, chia thành phần nhỏ cho mau nguội, rồi cất ngay vào tủ lạnh.",
        ),
        nar(
          "Ăn trong vòng 24 giờ, hâm đến khi nóng bốc hơi đều từ trong ra ngoài, và chỉ hâm một lần thôi nhé.",
          "Ăn trong vòng hai mươi tư giờ, hâm đến khi nóng bốc hơi đều từ trong ra ngoài, và chỉ hâm một lần thôi nhé.",
        ),
      ],
    },
    cosmic: {
      shot: "Câu 1: phóng ra quy mô thành phố, bếp nhà hàng lớn với những khay cơm rang nấu sẵn cho giờ trưa. Câu 2: một thước nhiệt độ khổng lồ dựng đứng: vùng trên 60 °C tô đỏ ấm 'GIỮ NÓNG', vùng 4 °C trở xuống tô xanh 'GIỮ LẠNH', khoảng giữa tô xám có chữ 'ĐỪNG LỬNG LƠ'. Câu 3: thu về căn bếp mở đầu, bát cơm nguội trên bàn, Milo giơ con dấu đồng hạ xuống giấy da: 'TÙY!'. Dòng nhỏ dưới con dấu: 'Nguội nhanh · tủ lạnh · 24 giờ · hâm 1 lần'. Câu 4: kim đồng hồ treo tường lùi về lúc tắt bếp, giữ hình. Hiện nguồn ở góc.",
      lines: [
        nar(
          "Ở nhà hàng, chuyện còn lớn hơn. Năm 2022, Trung tâm An toàn Thực phẩm Hồng Kông kể về cơm rang của một nhà hàng ở đây chứa quá nhiều Bacillus cereus.",
          "Ở nhà hàng, chuyện còn lớn hơn. Năm hai nghìn không trăm hai mươi hai, Trung tâm An toàn Thực phẩm Hồng Kông kể về cơm rang của một nhà hàng ở đây chứa quá nhiều Ba-xi-lút xê-rê-út.",
        ),
        nar(
          "Nên họ dặn, cơm nấu sẵn phải giữ nóng trên 60 độ, hoặc cất tủ lạnh từ 4 độ trở xuống. Đừng để nó lửng lơ ở giữa.",
          "Nên họ dặn, cơm nấu sẵn phải giữ nóng trên sáu mươi độ, hoặc cất tủ lạnh từ bốn độ trở xuống. Đừng để nó lửng lơ ở giữa.",
        ),
        nar(
          "Phán quyết, Tùy! Cơm nguội vẫn ăn được, nếu nó vào tủ lạnh nhanh và lên chảo trong 24 giờ.",
          "Phán quyết, Tùy! Cơm nguội vẫn ăn được, nếu nó vào tủ lạnh nhanh và lên chảo trong hai mươi tư giờ.",
        ),
        nar(
          "Bởi số phận của nó đã được định đoạt từ mấy tiếng đầu tiên, ngay sau khi bạn tắt bếp.",
          "Bởi số phận của nó đã được định đoạt từ mấy tiếng đầu tiên, ngay sau khi bạn tắt bếp.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 4,
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
      shot: "Câu 1: mở thẳng vào cận cảnh, bàn tay cầm bút lông ngỗng vẽ một chiếc giá treo cổ nhỏ lên mặt ngoài một lá thư đầy ký hiệu lạ, góc thẻ hiện 1586. Câu 2: lùi máy, dinh thự Chartley nơi Mary bị giam lỏng, Mary ngồi viết, lá thư được nhét vào nút một thùng bia và lăn ra cổng. Câu 3–4: Milo (vai Phelippes) đứng bên bàn giải mã, giơ bảng hai mặt CÓ / KHÔNG, chữ viết tay hiện: ĐẾM CÓ ĐỦ KHÔNG?",
      lines: [
        nar(
          "Năm 1586, một người giải mã phục vụ nữ hoàng Anh cầm bút, vẽ một chiếc giá treo cổ nhỏ lên mặt ngoài một lá thư mật.",
          "Năm một nghìn năm trăm tám mươi sáu, một người giải mã phục vụ nữ hoàng Anh cầm bút, vẽ một chiếc giá treo cổ nhỏ lên mặt ngoài một lá thư mật.",
        ),
        nar(
          "Đó là thư của Nữ hoàng Mary xứ Scotland, viết toàn ký hiệu lạ, giấu trong một thùng bia.",
          "Đó là thư của Nữ hoàng Mê-ri xứ Xcốt-len, viết toàn ký hiệu lạ, giấu trong một thùng bia.",
        ),
        nar(
          "Vậy mà chìa khóa đầu tiên để mở nó lại là việc ai cũng làm được. Đếm.",
          "Vậy mà chìa khóa đầu tiên để mở nó lại là việc ai cũng làm được. Đếm.",
        ),
        nar(
          "Chỉ đếm chữ cái thôi, liệu có đủ phá một mật thư hoàng gia? Chọn Có hay Không ở bình luận trước khi xem tiếp nhé!",
          "Chỉ đếm chữ cái thôi, liệu có đủ phá một mật thư hoàng gia? Chọn Có hay Không ở bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Câu 1–2: Milo trải bảng chữ cái A đến Z, cạnh đó là hàng ký hiệu của bản mã; hai hàng tráo qua tráo lại chóng mặt, bộ đếm trên góc nhảy tới 26! ≈ 4 × 10²⁶ (✖). Câu 3: một cỗ máy tưởng tượng thử 1 tỉ cách mỗi giây, đồng hồ cát chảy mãi, nhãn hơn 12 tỉ năm đặt cạnh thanh tuổi vũ trụ 13,8 tỉ năm (✖). Câu 4: trang mã của Mary có cả ký hiệu thay cho nguyên từ, Mary mỉm cười tự tin.",
      lines: [
        nar(
          "Nếu được giao lá thư ấy, phản xạ đầu tiên của nhiều người là thử từng cách thay chữ, cho tới khi ra nghĩa.",
          "Nếu được giao lá thư ấy, phản xạ đầu tiên của nhiều người là thử từng cách thay chữ, cho tới khi ra nghĩa.",
        ),
        nar(
          "Nghe thì hợp lý. Nhưng chỉ một bảng thay 26 chữ cái đơn giản đã có khoảng 400 triệu tỉ tỉ cách xếp.",
          "Nghe thì hợp lý. Nhưng chỉ một bảng thay hai mươi sáu chữ cái đơn giản đã có khoảng bốn trăm triệu tỉ tỉ cách xếp.",
        ),
        nar(
          "Thử một tỉ cách mỗi giây, bạn vẫn cần hơn 12 tỉ năm. Gần bằng tuổi vũ trụ.",
          "Thử một tỉ cách mỗi giây, bạn vẫn cần hơn mười hai tỉ năm. Gần bằng tuổi vũ trụ.",
        ),
        nar(
          "Mà bản mã của Mary còn có ký hiệu riêng cho cả những từ hay dùng. Bà tin chắc không ai đọc nổi.",
          "Mà bản mã của Mê-ri còn có ký hiệu riêng cho cả những từ hay dùng. Bà tin chắc không ai đọc nổi.",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: chuyển về Baghdad khoảng năm 850, Milo (vai al-Kindi) trong thư viện Nhà Thông thái, gạch từng que đếm dưới mỗi chữ cái của một trang sách, chữ viết tay hiện ĐỪNG THỬ, HÃY ĐẾM. Câu 2: các que đếm dựng thành cột, thẻ số hiện E ≈ 13%, J + Q + X + Z < 1%. Câu 3: bật lại năm 1586, Milo (vai Phelippes) xếp các ký hiệu của thư Mary thành hàng, ký hiệu nhiều que nhất phát sáng và được dán nhãn E. Câu 4: từng từ quen lộ dần trên lá thư như mảnh ghép, Milo reo lên.",
      lines: [
        nar(
          "Thế nhưng có một lối khác, nằm sẵn trong sách của học giả al-Kindi ở Baghdad từ khoảng năm 850. Đừng thử, hãy đếm.",
          "Thế nhưng có một lối khác, nằm sẵn trong sách của học giả an Kin-đi ở Bát-đa từ khoảng năm tám trăm năm mươi. Đừng thử, hãy đếm.",
        ),
        nar(
          "Ngôn ngữ nào cũng có vài chữ cái được dùng nhiều hơn hẳn. Trong tiếng Anh, chữ E chiếm khoảng 13% số chữ, còn J, Q, X, Z cộng lại chưa tới 1%.",
          "Ngôn ngữ nào cũng có vài chữ cái được dùng nhiều hơn hẳn. Trong tiếng Anh, chữ e chiếm khoảng mười ba phần trăm số chữ, còn các chữ gi, kiu, ích, dét cộng lại chưa tới một phần trăm.",
        ),
        nar(
          "Thomas Phelippes làm đúng như thế. Đếm các ký hiệu trong thư của Mary, gán ký hiệu hay gặp nhất cho chữ hay gặp nhất, rồi đoán dần từng từ quen theo ngữ cảnh.",
          "Tô-mát Phê-líp làm đúng như thế. Đếm các ký hiệu trong thư của Mê-ri, gán ký hiệu hay gặp nhất cho chữ hay gặp nhất, rồi đoán dần từng từ quen theo ngữ cảnh.",
        ),
        nar(
          "Đếm thôi thì chưa đủ, nhưng đó là chìa khóa đầu tiên. Và bản mã tưởng bất khả xâm phạm bắt đầu vỡ ra từng mảnh.",
          "Đếm thôi thì chưa đủ, nhưng đó là chìa khóa đầu tiên. Và bản mã tưởng bất khả xâm phạm bắt đầu vỡ ra từng mảnh.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: những que đếm của Milo tự gom thành một bảng hai dòng, hàng trên là chữ cái, hàng dưới là số lần xuất hiện; trang Toán 9 mở ra. Câu 2: dòng định nghĩa sáng lên: Tần số = số lần xuất hiện; các con số mọc lên thành biểu đồ tần số dạng cột, cột E cao nhất ghi 127 trên tổng 1.000 chữ. Câu 3: hai biểu đồ đặt cạnh nhau, của bản mã và của tiếng Anh, mũi tên nối cột cao với cột cao.",
      lines: [
        nar(
          "Việc al-Kindi dạy chính là lập bảng tần số, đúng bài Bảng tần số và biểu đồ tần số trong Toán lớp 9.",
          "Việc an Kin-đi dạy chính là lập bảng tần số, đúng bài Bảng tần số và biểu đồ tần số trong Toán lớp chín.",
        ),
        nar(
          "Tần số của một giá trị là số lần nó xuất hiện. Lấy một nghìn chữ cái tiếng Anh, cột E sẽ cao khoảng 127, cao nhất cả bảng.",
          "Tần số của một giá trị là số lần nó xuất hiện. Lấy một nghìn chữ cái tiếng Anh, cột e sẽ cao khoảng một trăm hai mươi bảy, cao nhất cả bảng.",
        ),
        nar(
          "Giờ đặt biểu đồ của bản mã cạnh biểu đồ của ngôn ngữ. Cột cao sẽ khớp với cột cao, và mật thư bắt đầu lộ mặt.",
          "Giờ đặt biểu đồ của bản mã cạnh biểu đồ của ngôn ngữ. Cột cao sẽ khớp với cột cao, và mật thư bắt đầu lộ mặt.",
        ),
      ],
    },
    realworld: {
      shot: "Câu 1: bàn phòng khách hôm nay, Milo (vai người chơi) mở hộp cờ Scrabble; lồng khung tờ trang nhất New York Times cũ, những vòng bút chì khoanh quanh chữ cái. Câu 2: Milo đổ 100 quân chữ ra bàn rồi xếp thành biểu đồ cột theo chữ cái, cột E 12 quân cao vọt, mỗi quân E ghi 1 điểm; Q và Z đứng lẻ loi mỗi chữ một quân. Câu 3: Milo đặt một quân E lên bàn cờ, nháy mắt.",
      lines: [
        nar(
          "Phép đếm ấy vẫn sống trong hộp cờ Scrabble. Người sáng chế Alfred Butts đã tính tần số chữ cái từ trang nhất báo New York Times.",
          "Phép đếm ấy vẫn sống trong hộp cờ Xcra-bồ. Người sáng chế An-phrét Bát đã tính tần số chữ cái từ trang nhất báo Niu Oóc Tai-mơ.",
        ),
        nar(
          "Thế nên trong 100 quân chữ, E có tới 12 quân và chỉ được 1 điểm. Còn Q và Z, mỗi chữ chỉ một quân, điểm cao ngất.",
          "Thế nên trong một trăm quân chữ, chữ e có tới mười hai quân và chỉ được một điểm. Còn chữ kiu và chữ dét, mỗi chữ chỉ một quân, điểm cao ngất.",
        ),
        nar(
          "Lần tới xếp chữ, hãy nhớ rằng bạn đang chơi trên một bảng tần số.",
          "Lần tới xếp chữ, hãy nhớ rằng bạn đang chơi trên một bảng tần số.",
        ),
      ],
    },
    cosmic: {
      shot: "Câu 1: phóng to, màn hình kho lưu trữ số của Thư viện Quốc gia Pháp, hàng chục lá thư mật bay ra xếp thành bức tường, nhãn 57 LÁ THƯ · 1578–1584. Câu 2: Milo chỉ vào một chữ E tách thành nhiều ký hiệu khác nhau, biểu đồ tần số các cột cao bị san phẳng dần. Câu 3: máy tính chạy dòng ký hiệu, bộ đếm hơn 150.000 ký hiệu, rồi chữ Pháp hiện ra, nhãn khoảng 50.000 từ. Câu 4–5: thu về lá thư năm 1586 và chiếc giá treo cổ nhỏ bằng mực trên mặt ngoài.",
      lines: [
        nar(
          "Câu chuyện chưa dừng ở đó. Năm 2023, ba nhà giải mã nghiệp dư tìm thấy 57 lá thư mật khác của Mary, trong kho số của Thư viện Quốc gia Pháp.",
          "Câu chuyện chưa dừng ở đó. Năm hai nghìn không trăm hai mươi ba, ba nhà giải mã nghiệp dư tìm thấy năm mươi bảy lá thư mật khác của Mê-ri, trong kho số của Thư viện Quốc gia Pháp.",
        ),
        nar(
          "Những lá thư này, viết từ 1578 đến 1584, dùng mã đồng âm. Một chữ hay gặp được viết bằng nhiều ký hiệu, để san phẳng các cột tần số.",
          "Những lá thư này, viết từ một nghìn năm trăm bảy mươi tám đến một nghìn năm trăm tám mươi tư, dùng mã đồng âm. Một chữ hay gặp được viết bằng nhiều ký hiệu, để san phẳng các cột tần số.",
        ),
        nar(
          "Nhóm phải nhờ phần mềm giải mã xử lý hơn 150.000 ký hiệu, mới đọc lại được khoảng 50.000 từ.",
          "Nhóm phải nhờ phần mềm giải mã xử lý hơn một trăm năm mươi nghìn ký hiệu, mới đọc lại được khoảng năm mươi nghìn từ.",
        ),
        nar(
          "Còn với Mary, mọi chuyện đã khép lại từ lâu. Bà bị kết tội và bị xử tử năm 1587.",
          "Còn với Mê-ri, mọi chuyện đã khép lại từ lâu. Bà bị kết tội và bị xử tử năm một nghìn năm trăm tám mươi bảy.",
        ),
        nar(
          "Và tất cả bắt đầu từ chiếc giá treo cổ nhỏ trên lá thư năm 1586, vẽ ra sau một phép đếm.",
          "Và tất cả bắt đầu từ chiếc giá treo cổ nhỏ trên lá thư năm một nghìn năm trăm tám mươi sáu, vẽ ra sau một phép đếm.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 5,
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
          "Một tia sét đánh trúng nóc chiếc ô tô mui kín. Vậy mà người ngồi bên trong thường vẫn bình an. Vì sao nhỉ?",
          "Một tia sét đánh trúng nóc chiếc ô tô mui kín. Vậy mà người ngồi bên trong thường vẫn bình an. Vì sao nhỉ?",
        ),
        nar(
          "Câu trả lời quen thuộc là, nhờ bốn chiếc lốp cao su cách điện, nên dòng điện không xuống được đất.",
          "Câu trả lời quen thuộc là, nhờ bốn chiếc lốp cao su cách điện, nên dòng điện không xuống được đất.",
        ),
        nar(
          "Còn bạn thì sao? Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp nhé!",
          "Còn bạn thì sao? Tin được, Tin đồn hay Tùy? Ghi vào bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Câu 1: bên trái sân khấu hiện đôi găng tay cao su của thợ điện, dấu tích xanh 'CÁCH ĐIỆN ✔'. Câu 2: Milo (vai người kiểm tra lời đồn, cầm sổ ghi chép) lật một tờ giấy da có tiêu đề 'LỜI ĐỒN VỀ SÉT · CƠ QUAN KHÍ TƯỢNG QUỐC GIA MỸ', dòng 'Lốp cao su bảo vệ bạn khỏi sét' bị đóng dấu đỏ 'LỜI ĐỒN'. Câu 3: khung dựng đứng: đám mây giông ở trên, mặt đất ở dưới, tia sét ngoằn ngoèo nối hai bên, cột thước bên cạnh ghi 'HÀNG KM KHÔNG KHÍ = CHẤT CÁCH ĐIỆN'; ở chân tia sét, một lớp lốp mỏng xíu đặt cạnh để so, nhãn 'LỐP'. Câu 4: cắt lớp chiếc lốp cho thấy các sợi lõi thép bên trong, dòng điện vàng luồn qua sợi thép xuống đất, lốp xì khói, dấu ✖ đỏ lên chữ 'CAO SU CHẶN SÉT'.",
      lines: [
        nar(
          "Nghe thì rất xuôi tai. Cao su đúng là chất cách điện, thợ điện vẫn đeo găng cao su đấy thôi.",
          "Nghe thì rất xuôi tai. Cao su đúng là chất cách điện, thợ điện vẫn đeo găng cao su đấy thôi.",
        ),
        nar(
          "Thế nhưng Cơ quan Khí tượng Quốc gia Mỹ lại xếp lời giải thích này vào hàng lời đồn.",
          "Thế nhưng Cơ quan Khí tượng Quốc gia Mỹ lại xếp lời giải thích này vào hàng lời đồn.",
        ),
        nar(
          "Thử nghĩ mà xem. Không khí cũng cách điện, vậy mà tia sét vẫn xé toạc cả quãng không khí dài hàng cây số. Thêm một lớp cao su dưới bánh xe thì thấm vào đâu?",
          "Thử nghĩ mà xem. Không khí cũng cách điện, vậy mà tia sét vẫn xé toạc cả quãng không khí dài hàng cây số. Thêm một lớp cao su dưới bánh xe thì thấm vào đâu?",
        ),
        nar(
          "Cơ quan này còn cho biết, sét hay phá hỏng luôn cả lốp, khi nó luồn qua lớp lõi thép bên trong để xuống đất.",
          "Cơ quan này còn cho biết, sét hay phá hỏng luôn cả lốp, khi nó luồn qua lớp lõi thép bên trong để xuống đất.",
        ),
      ],
    },
    eureka: {
      shot: "Chuyển về giảng đường Viện Hoàng gia London năm 1836, hàng ghế gỗ hình móng ngựa. Câu 1: mở đầu bằng chiếc ô tô dưới mưa mờ dần, lớp vỏ xe sáng viền lên một nhịp, dấu hỏi 'THỨ GÌ CHE CHỞ?', rồi tan sang giảng đường. Câu 2: Milo (vai Faraday, áo đuôi tôm, kính bảo hộ trên trán) đứng cạnh một khung gỗ lập phương cao gấp đôi người, thước đo cạnh ghi '≈ 3,7 m'. Câu 3: bàn tay vẽ tua nhanh đan lưới dây đồng quanh khung, phủ giấy, rồi dán các dải lá thiếc lấp lánh khắp các mặt; nhãn 'VỎ KIM LOẠI'. Câu 4: Milo bước vào trong lồng; bên ngoài một máy phát tĩnh điện quay, tia lửa và chùm điện xanh tím phóng tóe khắp mặt ngoài lồng; chữ viết tay 'theo chính Faraday kể lại'. Câu 5: cận cảnh bên trong: Milo cầm điện nghiệm hai lá vàng khép im và một ngọn nến cháy đứng thẳng, gương mặt Eureka; mặt cắt lồng cho thấy các dấu cộng chỉ nằm ở lớp vỏ ngoài, bên trong trống trơn, nhãn lớn 'BÊN TRONG: 0'.",
      lines: [
        nar(
          "Vậy thứ gì mới thật sự che chở người trong xe? Hóa ra là chính lớp vỏ bao quanh họ.",
          "Vậy thứ gì mới thật sự che chở người trong xe? Hóa ra là chính lớp vỏ bao quanh họ.",
        ),
        nar(
          "Năm 1836, tại Viện Hoàng gia ở London, Michael Faraday dựng một chiếc lồng lập phương, mỗi cạnh khoảng 3,7 mét.",
          "Năm một nghìn tám trăm ba mươi sáu, tại Viện Hoàng gia ở Luân Đôn, Mai-cơn Pha-ra-đây dựng một chiếc lồng lập phương, mỗi cạnh khoảng ba phẩy bảy mét.",
        ),
        nar(
          "Khung gỗ được đan lưới dây đồng, phủ giấy và lá thiếc, thành một lớp vỏ kim loại kín.",
          "Khung gỗ được đan lưới dây đồng, phủ giấy và lá thiếc, thành một lớp vỏ kim loại kín.",
        ),
        nar(
          "Theo chính Faraday kể lại, ông vào sống ngay trong lồng, trong khi mặt ngoài bị nạp điện cực mạnh. Tia lửa phóng tóe ra khắp nơi.",
          "Theo chính Pha-ra-đây kể lại, ông vào sống ngay trong lồng, trong khi mặt ngoài bị nạp điện cực mạnh. Tia lửa phóng tóe ra khắp nơi.",
        ),
        nar(
          "Vậy mà bên trong, điện nghiệm lá vàng và ngọn nến không hề có dấu hiệu gì. Điện chỉ nằm lại ở lớp vỏ bên ngoài!",
          "Vậy mà bên trong, điện nghiệm lá vàng và ngọn nến không hề có dấu hiệu gì. Điện chỉ nằm lại ở lớp vỏ bên ngoài!",
        ),
      ],
    },
    theorem: {
      shot: "Quay lại chiếc ô tô dưới mưa, nay vẽ dạng mặt cắt. Câu 1: hai cột chữ viết tay hiện ra hai bên xe: 'VẬT DẪN ĐIỆN: thanh nhôm, sắt, đồng' và 'VẬT CÁCH ĐIỆN: cao su, nhựa, gỗ khô', tiêu đề nhỏ 'KHTN 8 · Bài 21'. Câu 2: lớp vỏ thép của xe phát sáng thành khung lồng giống lồng Faraday vừa rồi; tia sét đánh vào nóc, dòng điện vàng chạy men theo mái, xuống thành xe, vòng qua khoang ngồi rồi qua bánh xuống đất; Milo ngồi trong xe, hai tay đặt trên đùi, không chạm thành cửa; công thức hiện 'Sét → vỏ kim loại → đất'. Câu 3: đặt cạnh nhau một chiếc ô tô mui trần đã kéo mui vải và một chiếc xe vỏ sợi thủy tinh, cả hai đóng dấu ✖ đỏ 'KHÔNG BẢO VỆ'.",
      lines: [
        nar(
          "Bạn còn nhớ bài vật dẫn điện, vật cách điện trong Khoa học tự nhiên lớp 8 chứ? Kim loại thì dẫn điện, còn cao su thì cách điện.",
          "Bạn còn nhớ bài vật dẫn điện, vật cách điện trong Khoa học tự nhiên lớp tám chứ? Kim loại thì dẫn điện, còn cao su thì cách điện.",
        ),
        nar(
          "Vỏ kim loại của ô tô kín cũng chính là một chiếc lồng Faraday. Dòng điện của tia sét chạy men theo mái và thành xe, vòng qua khoang ngồi rồi xuống đất.",
          "Vỏ kim loại của ô tô kín cũng chính là một chiếc lồng Pha-ra-đây. Dòng điện của tia sét chạy men theo mái và thành xe, vòng qua khoang ngồi rồi xuống đất.",
        ),
        nar(
          "Cũng vì thế, ô tô mui trần, kể cả khi đã kéo mui, hay xe vỏ sợi thủy tinh đều không che chở được bạn.",
          "Cũng vì thế, ô tô mui trần, kể cả khi đã kéo mui, hay xe vỏ sợi thủy tinh đều không che chở được bạn.",
        ),
      ],
    },
    realworld: {
      shot: "Cánh đồng lúa Việt Nam chiều giông, mây đen kéo tới. Câu 1: Milo (vai người đi đường, mặc áo mưa, đội mũ bảo hiểm) chạy xe máy trên bờ ruộng; viền chấm chấm vẽ quanh người Milo rồi biến mất, chữ 'KHÔNG CÓ VỎ = KHÔNG CÓ LỒNG'. Câu 2: tiếng sấm vẽ thành chữ 'ÙNG ÙNG'; từ đám mây kéo ra một vòng tròn bán kính ghi '≈ 16 km', Milo nằm trong vòng; nhãn 'NGHE SẤM = ĐANG TRONG TẦM SÉT'. Câu 3: Milo dừng xe, bước ra xa chiếc xe máy; một cây đa đứng một mình giữa đồng và cột điện bên đường bị đóng dấu ✖ đỏ; mũi tên xanh chỉ về phía một ngôi nhà gạch kiên cố và một chiếc ô tô mui kín, dấu ✔. Câu 4: Milo đứng trong hiên nhà nhìn ra, đồng hồ cát lật ngược, chữ '30 PHÚT SAU TIẾNG SẤM CUỐI'.",
      lines: [
        nar(
          "Thế còn xe máy thì sao? Xe máy chẳng có lớp vỏ nào bọc quanh người, nên chẳng có lồng Faraday nào cả.",
          "Thế còn xe máy thì sao? Xe máy chẳng có lớp vỏ nào bọc quanh người, nên chẳng có lồng Pha-ra-đây nào cả.",
        ),
        nar(
          "Đang đi giữa đồng mà nghe tiếng sấm, tức là bạn đã ở trong tầm sét rồi đấy. Sét có thể đánh xa khoảng 16 km tính từ cơn giông.",
          "Đang đi giữa đồng mà nghe tiếng sấm, tức là bạn đã ở trong tầm sét rồi đấy. Sét có thể đánh xa khoảng mười sáu ki-lô-mét tính từ cơn giông.",
        ),
        nar(
          "Cơ quan khí tượng Mỹ khuyên rời xe, vào ngay nhà kiên cố hoặc ô tô mui kín. Phòng chống thiên tai Việt Nam cũng dặn đừng trú dưới gốc cây, và tránh xa cột điện.",
          "Cơ quan khí tượng Mỹ khuyên rời xe, vào ngay nhà kiên cố hoặc ô tô mui kín. Phòng chống thiên tai Việt Nam cũng dặn đừng trú dưới gốc cây, và tránh xa cột điện.",
        ),
        nar(
          "Rồi chờ ít nhất 30 phút sau tiếng sấm cuối cùng hãy đi tiếp nhé.",
          "Rồi chờ ít nhất ba mươi phút sau tiếng sấm cuối cùng hãy đi tiếp nhé.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng lên bầu trời: một chiếc máy bay chở khách bay xuyên qua tầng mây giông, Milo (vai kỹ sư hàng không, kính bảo hộ kéo xuống) ngồi cạnh cửa sổ. Câu 1: tia sét đánh vào mũi máy bay, bảng số hiện '> 1 LẦN / NĂM / MỖI MÁY BAY'. Câu 2: dòng điện vàng chạy dọc lớp vỏ nhôm từ mũi tới đuôi rồi thoát vào không trung; cận cảnh bánh xe máy bay đang thu gọn trong thân, chữ viết tay 'chẳng bánh nào chạm đất!'. Câu 3: thu về chiếc ô tô mui kín trên đường quê; con dấu đỏ lớn 'TIN ĐỒN!' đóng xuống bốn chiếc lốp, rồi lớp vỏ xe sáng lên thành khung lồng Faraday ôm lấy Milo đang ngồi bên trong; danh sách nguồn chạy ở chân màn hình.",
      lines: [
        nar(
          "Bằng chứng rõ nhất lại ở trên trời. Theo kỹ sư chống sét Edward Rupke, trung bình mỗi máy bay chở khách ở Mỹ bị sét đánh hơn một lần mỗi năm.",
          "Bằng chứng rõ nhất lại ở trên trời. Theo kỹ sư chống sét Ét-uốt Rúp-kơ, trung bình mỗi máy bay chở khách ở Mỹ bị sét đánh hơn một lần mỗi năm.",
        ),
        nar(
          "Dòng điện chạy dọc lớp vỏ nhôm, từ mũi hay đầu cánh tới đuôi, rồi thoát đi. Trong khi đó, máy bay chẳng có chiếc bánh nào chạm đất cả!",
          "Dòng điện chạy dọc lớp vỏ nhôm, từ mũi hay đầu cánh tới đuôi, rồi thoát đi. Trong khi đó, máy bay chẳng có chiếc bánh nào chạm đất cả!",
        ),
        nar(
          "Vậy phán quyết là, Tin đồn! Thứ giữ bạn an toàn không phải bốn chiếc lốp, mà là lớp vỏ kim loại, chiếc lồng Faraday bạn đang ngồi bên trong.",
          "Vậy phán quyết là, Tin đồn! Thứ giữ bạn an toàn không phải bốn chiếc lốp, mà là lớp vỏ kim loại, chiếc lồng Pha-ra-đây bạn đang ngồi bên trong.",
        ),
      ],
    },
  }),
];
