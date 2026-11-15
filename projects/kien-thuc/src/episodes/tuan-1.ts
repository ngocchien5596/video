/**
 * Tuần 1 "Thiên Đường Kiến Thức": nghịch lý và tin đồn khoa học (tập 1 Monty Hall, tập 2 sét và ô tô có cảnh vẽ riêng).
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
      { title: "Marc Mangel, Francisco J. Samaniego — Abraham Wald's Work on Aircraft Survivability, Journal of the American Statistical Association 79(386), 1984", url: "https://www.jstor.org/stable/2288257" },
      { title: "American Mathematical Society, Feature Column (Bill Casselman, 6/2016) — The Legend of Abraham Wald", url: "https://www.ams.org/samplings/feature-column/fc-2016-06" },
    ],
    hook: {
      shot: "Sân khấu giấy da dựng thành trường quay truyền hình kiểu Mỹ thập niên 1990: ba cánh cửa gỗ lớn đánh số 1, 2, 3. Câu 1–2: Milo (vai người chơi) đứng giữa, sau lưng là trang tạp chí PARADE 1990 bay vào, có cột 'Ask Marilyn' gạch chân dòng 'NÊN ĐỔI CỬA'; hàng nghìn phong bì thư đổ ào xuống như mưa, con số '~1.000 TIẾN SĨ' đóng dấu đỏ. Câu 3: sau ba cánh cửa thoáng hiện bóng một chiếc xe và hai con dê, Milo chỉ vào cửa 1 (khung sáng vàng). Câu 4: người dẫn chương trình (bóng đen đeo nơ, tay cầm thẻ ghi 'TÔI BIẾT CHỖ CÓ DÊ') mở cửa 3, một con dê ló đầu ra kêu, rồi chìa tay mời đổi. Câu 5: bảng gỗ bật lên giữa màn hình: 'ĐỔI? / GIỮ?' kèm mũi tên chỉ xuống ô bình luận.",
      lines: [
        nar(
          "Năm 1990, một câu trả lời trên tạp chí Parade khiến chừng một nghìn tiến sĩ cầm bút viết thư phản đối.",
          "Năm một nghìn chín trăm chín mươi, một câu trả lời trên tạp chí Pa-rết khiến chừng một nghìn tiến sĩ cầm bút viết thư phản đối.",
        ),
        nar(
          "Người viết là Marilyn vos Savant. Cô khẳng định rằng trong trò chơi ba cánh cửa, đổi cửa thì khả năng thắng cao gấp đôi.",
          "Người viết là Ma-ri-lin vốt Xa-văng. Cô khẳng định rằng trong trò chơi ba cánh cửa, đổi cửa thì khả năng thắng cao gấp đôi.",
        ),
        nar(
          "Luật chơi là thế này nhé. Sau ba cánh cửa là một chiếc xe và hai con dê. Bạn được chọn một cửa.",
          "Luật chơi là thế này nhé. Sau ba cánh cửa là một chiếc xe và hai con dê. Bạn được chọn một cửa.",
        ),
        nar(
          "Người dẫn chương trình biết xe ở đâu, nên trong hai cửa còn lại, anh ta bao giờ cũng mở một cửa có dê, rồi hỏi bạn có muốn đổi sang cửa kia không.",
          "Người dẫn chương trình biết xe ở đâu, nên trong hai cửa còn lại, anh ta bao giờ cũng mở một cửa có dê, rồi hỏi bạn có muốn đổi sang cửa kia không.",
        ),
        nar(
          "Nếu là bạn, bạn sẽ đổi cửa hay giữ nguyên? Ghi vào bình luận trước khi xem tiếp nhé!",
          "Nếu là bạn, bạn sẽ đổi cửa hay giữ nguyên? Ghi vào bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Núi thư chất cao sau lưng Milo; vài lá thư bung ra, hiện dòng viết tay 'CÒN 2 CỬA → 50/50!' và chữ ký 'Ph.D.'. Câu 2: hai cửa còn đóng (1 và 2) hiện nhãn '50%' và '50%' rung rinh, rồi một dấu ✖ đỏ lớn đóng lên hai nhãn đó. Câu 3: chân dung khắc gỗ của nhà toán học Paul Erdős khoanh tay lắc đầu, nhãn 'KHÔNG TIN'; chuyển sang một chiếc máy tính đời cũ màn hình xanh hiện bộ đếm số ván chạy vùn vụt.",
      lines: [
        nar(
          "Thư cứ thế đổ về. Theo nhà tâm lý học Steven Pinker kể lại, cả thảy có chừng 10.000 lá thư, phần lớn đều bảo cô sai.",
          "Thư cứ thế đổ về. Theo nhà tâm lý học Xti-vơn Pinh-cơ kể lại, cả thảy có chừng mười nghìn lá thư, phần lớn đều bảo cô sai.",
        ),
        nar(
          "Lý lẽ của họ nghe rất xuôi tai. Chỉ còn hai cửa đang đóng, xe nằm sau một trong hai cửa ấy, vậy mỗi cửa có năm mươi phần trăm cơ hội, đúng không?",
          "Lý lẽ của họ nghe rất xuôi tai. Chỉ còn hai cửa đang đóng, xe nằm sau một trong hai cửa ấy, vậy mỗi cửa có năm mươi phần trăm cơ hội, đúng không?",
        ),
        nar(
          "Ngay cả nhà toán học lừng danh Paul Erdős cũng phản đối. Phải đến khi tận mắt xem máy tính chơi thử rất nhiều ván, ông mới chịu tin.",
          "Ngay cả nhà toán học lừng danh Pôn Ẹc-đốt cũng phản đối. Phải đến khi tận mắt xem máy tính chơi thử rất nhiều ván, ông mới chịu tin.",
        ),
      ],
    },
    eureka: {
      shot: "Bảng phấn chia ba hàng ngang, mỗi hàng là một bộ ba cánh cửa nhỏ 1-2-3; ở cả ba hàng, Milo (vai người chơi) dán ngôi sao vàng lên cửa 1. Câu 1: ba hàng lần lượt hiện bóng chiếc xe ở cửa 1, cửa 2, cửa 3 (nhãn 'XE Ở CỬA 1 / 2 / 3'). Câu 2: hàng 'XE Ở CỬA 2', người dẫn mở cửa 3, con dê ló ra, nhãn 'BẮT BUỘC'; mũi tên từ cửa 1 nhảy sang cửa 2, dấu ✔ xanh 'ĐỔI → THẮNG'. Câu 3: hàng 'XE Ở CỬA 3', người dẫn mở cửa 2, mũi tên nhảy sang cửa 3, dấu ✔ xanh. Câu 4: hàng 'XE Ở CỬA 1', người dẫn mở một cửa dê bất kỳ, đổi thì dấu ✖ đỏ 'ĐỔI → THUA'; cột tổng kết bên phải đếm '✔ ✔ ✖', bật số 'ĐỔI THẮNG 2/3 · GIỮ 1/3'.",
      lines: [
        nar(
          "Vậy ai đúng? Cách chắc nhất là xét hết mọi khả năng. Giả sử bạn luôn chọn cửa 1, còn xe có thể nằm sau cửa 1, cửa 2 hoặc cửa 3.",
          "Vậy ai đúng? Cách chắc nhất là xét hết mọi khả năng. Giả sử bạn luôn chọn cửa một, còn xe có thể nằm sau cửa một, cửa hai hoặc cửa ba.",
        ),
        nar(
          "Nếu xe ở cửa 2 thì sao? Người dẫn không được mở trúng xe, nên buộc phải mở cửa 3. Bạn đổi sang cửa 2, thế là thắng!",
          "Nếu xe ở cửa hai thì sao? Người dẫn không được mở trúng xe, nên buộc phải mở cửa ba. Bạn đổi sang cửa hai, thế là thắng!",
        ),
        nar(
          "Còn nếu xe ở cửa 3, người dẫn lại buộc phải mở cửa 2. Bạn đổi sang cửa 3, thế là lại thắng nữa!",
          "Còn nếu xe ở cửa ba, người dẫn lại buộc phải mở cửa hai. Bạn đổi sang cửa ba, thế là lại thắng nữa!",
        ),
        nar(
          "Chỉ khi xe nằm ngay sau cửa 1 thì bạn đổi cửa mới bị thua. Trong ba trường hợp, đổi cửa thắng tới hai. Vậy đổi cửa thì thắng 2/3 số lần, còn giữ nguyên chỉ thắng 1/3.",
          "Chỉ khi xe nằm ngay sau cửa một thì bạn đổi cửa mới bị thua. Trong ba trường hợp, đổi cửa thắng tới hai. Vậy đổi cửa thì thắng hai phần ba số lần, còn giữ nguyên chỉ thắng một phần ba.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: bảng gỗ lớn chỉ một dòng chữ to 'ĐỔI = THẮNG KHI LẦN ĐẦU CHỌN SAI'; bên dưới ba cánh cửa, hai cửa dê tô đỏ nhãn 'CHỌN SAI: 2/3', một cửa xe nhãn 'CHỌN ĐÚNG: 1/3'. Câu 2: người dẫn (bóng đen đeo nơ) giơ thẻ 'TÔI BIẾT · KHÔNG MỞ TRÚNG XE'; rồi cảnh phụ: người dẫn trượt vỏ chuối, ngã đẩy bừa một cánh cửa, ra dê, nhãn 'MỞ BỪA → 1/2 · 1/2' (in nhỏ 'Rosenthal, 2008'). Câu 3: Milo (vai học giả, cầm phấn) viết công thức P(A|B) = P(A∩B) : P(B), chữ B được khoanh và chú thích 'B = người dẫn mở cửa 3'; mép cuốn vở Toán 12 hiện dòng 'Xác suất có điều kiện'.",
      lines: [
        nar(
          "Nói gọn lại, đổi cửa sẽ thắng mỗi khi bạn chọn sai ngay từ đầu. Mà sau ba cánh cửa có tới hai con dê, nên bạn chọn sai tới 2/3 số lần.",
          "Nói gọn lại, đổi cửa sẽ thắng mỗi khi bạn chọn sai ngay từ đầu. Mà sau ba cánh cửa có tới hai con dê, nên bạn chọn sai tới hai phần ba số lần.",
        ),
        nar(
          "Mấu chốt là người dẫn biết xe ở đâu và không bao giờ mở trúng xe. Nếu anh ta mở bừa một cửa mà tình cờ ra con dê, thì lúc ấy mới thật sự là năm mươi năm mươi.",
          "Mấu chốt là người dẫn biết xe ở đâu và không bao giờ mở trúng xe. Nếu anh ta mở bừa một cửa mà tình cờ ra con dê, thì lúc ấy mới thật sự là năm mươi năm mươi.",
        ),
        nar(
          "Khi biết thêm một thông tin mới, ta phải tính lại xác suất. Đó chính là xác suất có điều kiện mà bạn được học trong Toán lớp 12.",
          "Khi biết thêm một thông tin mới, ta phải tính lại xác suất. Đó chính là xác suất có điều kiện mà bạn được học trong Toán lớp mười hai.",
        ),
      ],
    },
    cosmic: {
      shot: "Câu 1: camera bay ra xa, sân bay dã chiến thời Thế chiến II tông giấy da cũ, nhãn 'THẾ CHIẾN II'; từng chiếc máy bay ném bom hạ cánh, Milo (vai thợ máy, cầm sổ) đi dọc đếm vết đạn. Câu 2: hình chiếu từ trên xuống một chiếc máy bay, chấm đỏ vết đạn hiện dần dày đặc ở thân và cánh, quanh bốn động cơ trống trơn; mũi tên 'BỌC GIÁP Ở ĐÂY?' chỉ vào chỗ nhiều chấm. Câu 3: chân dung khắc gỗ nhà thống kê 'ABRAHAM WALD', mũi tên đỏ đảo chiều chỉ vào các động cơ trống, nhãn 'BỌC GIÁP CHỖ KHÔNG CÓ LỖ THỦNG'. Câu 4: bầu trời có vài chiếc máy bay bốc khói ở động cơ, rơi xuống không trở về, dấu 'KHÔNG AI ĐẾM ĐƯỢC'; chấm đỏ trên động cơ hiện mờ như bóng ma. Câu 5: chia đôi khung, trái là ba cánh cửa với người dẫn chọn cửa mở, phải là đoàn máy bay trở về đi qua một cái phễu lọc, nhãn 'ĐÃ QUA CHỌN LỌC'. Câu 6: camera kéo về trường quay, cánh cửa người dẫn chừa lại sáng vàng, Milo đặt tay lên tay nắm cửa.",
      lines: [
        nar(
          "Và đây mới là chỗ thú vị. Có một câu chuyện nổi tiếng thời Thế chiến thứ hai, khi người ta đếm vết đạn trên những chiếc máy bay ném bom trở về.",
          "Và đây mới là chỗ thú vị. Có một câu chuyện nổi tiếng thời Thế chiến thứ hai, khi người ta đếm vết đạn trên những chiếc máy bay ném bom trở về.",
        ),
        nar(
          "Thân và cánh máy bay bị thủng lỗ chỗ, còn quanh động cơ thì gần như không có lỗ nào. Ai cũng nghĩ là phải bọc thêm giáp vào những chỗ bị thủng nhiều.",
          "Thân và cánh máy bay bị thủng lỗ chỗ, còn quanh động cơ thì gần như không có lỗ nào. Ai cũng nghĩ là phải bọc thêm giáp vào những chỗ bị thủng nhiều.",
        ),
        nar(
          "Nhà thống kê Abraham Wald thì nói ngược lại. Theo ông, phải bọc giáp ở chính những chỗ không có lỗ thủng.",
          "Nhà thống kê Abraham Wald thì nói ngược lại. Theo ông, phải bọc giáp ở chính những chỗ không có lỗ thủng.",
        ),
        nar(
          "Vì sao ư? Những chiếc bị trúng đạn vào động cơ đã mãi mãi không bay trở về được. Thế nên chẳng ai có thể đếm vết đạn trên những chiếc ấy cả.",
          "Vì sao ư? Những chiếc bị trúng đạn vào động cơ đã mãi mãi không bay trở về được. Thế nên chẳng ai có thể đếm vết đạn trên những chiếc ấy cả.",
        ),
        nar(
          "Cũng giống như cái cửa nào được chọn để mở, những chiếc máy bay được đem ra để thống kê chỉ là 1 phần, chưa phản ánh tất cả sự thật.",
          "Cũng giống như cái cửa nào được chọn để mở, những chiếc máy bay được đem ra để thống kê chỉ là một phần, chưa phản ánh tất cả sự thật.",
        ),
        nar(
          "Thông tin nào cũng cần phải chắt lọc. Bạn phải biết nó đến từ đâu, bản chất thật sự là gì thì số liệu mới thể hiện đúng ý nghĩa của nó.",
          "Thông tin nào cũng cần phải chắt lọc. Bạn phải biết nó đến từ đâu, bản chất thật sự là gì thì số liệu mới thể hiện đúng ý nghĩa của nó.",
        ),
      ],
    },
  }),

  makeEpisode({
    day: 2,
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
          "Câu trả lời quen thuộc là nhờ bốn chiếc lốp cao su cách điện nên dòng điện không xuống được đất.",
          "Câu trả lời quen thuộc là nhờ bốn chiếc lốp cao su cách điện nên dòng điện không xuống được đất.",
        ),
        nar(
          "Còn bạn thì sao? Tin được, tin đồn, hay còn tùy? Ghi vào bình luận trước khi xem tiếp nhé!",
          "Còn bạn thì sao? Tin được, tin đồn, hay còn tùy? Ghi vào bình luận trước khi xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Câu 1: bên trái sân khấu hiện đôi găng tay cao su của thợ điện, dấu tích xanh 'CÁCH ĐIỆN ✔'. Câu 2: Milo (vai người kiểm tra lời đồn, cầm sổ ghi chép) lật một tờ giấy da có tiêu đề 'LỜI ĐỒN VỀ SÉT · CƠ QUAN KHÍ TƯỢNG QUỐC GIA MỸ', dòng 'Lốp cao su bảo vệ bạn khỏi sét' bị đóng dấu đỏ 'LỜI ĐỒN'. Câu 3: khung dựng đứng: đám mây giông ở trên, mặt đất ở dưới, tia sét ngoằn ngoèo nối hai bên, cột thước bên cạnh ghi 'HÀNG KM KHÔNG KHÍ = CHẤT CÁCH ĐIỆN'; ở chân tia sét, một lớp lốp mỏng xíu đặt cạnh để so, nhãn 'LỐP'. Câu 4: cắt lớp chiếc lốp cho thấy các sợi lõi thép bên trong, dòng điện vàng luồn qua sợi thép xuống đất, lốp xì khói, dấu ✖ đỏ lên chữ 'CAO SU CHẶN SÉT'.",
      lines: [
        nar(
          "Nghe thì xuôi tai. Cao su đúng là chất cách điện, thợ điện vẫn đeo găng cao su đấy thôi.",
          "Nghe thì xuôi tai. Cao su đúng là chất cách điện, thợ điện vẫn đeo găng cao su đấy thôi.",
        ),
        nar(
          "Thế nhưng Cơ quan Khí tượng Quốc gia Mỹ lại xếp lời giải thích này vào hàng lời đồn.",
          "Thế nhưng Cơ quan Khí tượng Quốc gia Mỹ lại xếp lời giải thích này vào hàng lời đồn.",
        ),
        nar(
          "Thử nghĩ xem. Không khí cũng cách điện, vậy mà sét vẫn xé toạc hàng cây số không khí. Thêm chút cao su ở bánh xe thì thấm vào đâu?",
          "Thử nghĩ xem. Không khí cũng cách điện, vậy mà sét vẫn xé toạc hàng cây số không khí. Thêm chút cao su ở bánh xe thì thấm vào đâu?",
        ),
        nar(
          "Họ còn cho biết, sét hay phá hỏng luôn cả lốp, khi nó luồn qua lõi thép xuống đất.",
          "Họ còn cho biết, sét hay phá hỏng luôn cả lốp, khi nó luồn qua lõi thép xuống đất.",
        ),
      ],
    },
    eureka: {
      shot: "Chuyển về giảng đường Viện Hoàng gia London năm 1836, hàng ghế gỗ hình móng ngựa. Câu 1: mở đầu bằng chiếc ô tô dưới mưa mờ dần, lớp vỏ xe sáng viền lên một nhịp, dấu hỏi 'THỨ GÌ CHE CHỞ?', rồi tan sang giảng đường. Câu 2: Milo (vai Faraday, áo đuôi tôm, kính bảo hộ trên trán) đứng cạnh một khung gỗ lập phương cao gấp đôi người, thước đo cạnh ghi '≈ 3,7 m'. Câu 3: bàn tay vẽ tua nhanh đan lưới dây đồng quanh khung, phủ giấy, rồi dán các dải lá thiếc lấp lánh khắp các mặt; nhãn 'VỎ KIM LOẠI'. Câu 4: Milo bước vào trong lồng; bên ngoài một máy phát tĩnh điện quay, tia lửa và chùm điện xanh tím phóng tóe khắp mặt ngoài lồng; chữ viết tay 'theo chính Faraday kể lại'. Câu 5: cận cảnh bên trong: Milo cầm điện nghiệm hai lá vàng khép im và một ngọn nến cháy đứng thẳng, gương mặt Eureka; mặt cắt lồng cho thấy các dấu cộng chỉ nằm ở lớp vỏ ngoài, bên trong trống trơn, nhãn lớn 'BÊN TRONG: 0'.",
      lines: [
        nar(
          "Vậy thứ gì mới thật sự che chở người trong xe? Chính là lớp vỏ bao quanh họ.",
          "Vậy thứ gì mới thật sự che chở người trong xe? Chính là lớp vỏ bao quanh họ.",
        ),
        nar(
          "Năm 1836, tại Viện Hoàng gia London, Faraday dựng một chiếc lồng lập phương, mỗi cạnh khoảng 3,7 mét.",
          "Năm một nghìn tám trăm ba mươi sáu, tại Viện Hoàng gia Luân Đôn, Pha ra đây dựng một chiếc lồng lập phương, mỗi cạnh khoảng ba phẩy bảy mét.",
        ),
        nar(
          "Khung gỗ được đan lưới dây đồng, phủ giấy, rồi dán thêm những dải lá thiếc, biến cả chiếc lồng thành một lớp vỏ kim loại.",
          "Khung gỗ được đan lưới dây đồng, phủ giấy, rồi dán thêm những dải lá thiếc, biến cả chiếc lồng thành một lớp vỏ kim loại.",
        ),
        nar(
          "Theo chính Faraday kể lại, ông vào ở hẳn trong lồng, trong khi mặt ngoài lồng bị nạp điện cực mạnh. Tia lửa phóng tóe ra bốn phía.",
          "Theo chính Pha ra đây kể lại, ông vào ở hẳn trong lồng, trong khi mặt ngoài lồng bị nạp điện cực mạnh. Tia lửa phóng tóe ra bốn phía.",
        ),
        nar(
          "Vậy mà ở bên trong, chiếc điện nghiệm vẫn nằm im, ngọn nến vẫn cháy bình thường. Điện chỉ nằm lại ở lớp vỏ bên ngoài thôi!",
          "Vậy mà ở bên trong, chiếc điện nghiệm vẫn nằm im, ngọn nến vẫn cháy bình thường. Điện chỉ nằm lại ở lớp vỏ bên ngoài thôi!",
        ),
      ],
    },
    theorem: {
      shot: "Quay lại chiếc ô tô dưới mưa, nay vẽ dạng mặt cắt. Câu 1: hai cột chữ viết tay hiện ra hai bên xe: 'VẬT DẪN ĐIỆN: thanh nhôm, sắt, đồng' và 'VẬT CÁCH ĐIỆN: cao su, nhựa, gỗ khô', tiêu đề nhỏ 'KHTN 8 · Bài 21'. Câu 2: lớp vỏ thép của xe phát sáng thành khung lồng giống lồng Faraday vừa rồi; tia sét đánh vào nóc, dòng điện vàng chạy men theo mái, xuống thành xe, vòng qua khoang ngồi rồi qua bánh xuống đất; Milo ngồi trong xe, hai tay đặt trên đùi, không chạm thành cửa; công thức hiện 'Sét → vỏ kim loại → đất'. Câu 3: đặt cạnh nhau một chiếc ô tô mui trần đã kéo mui vải và một chiếc xe vỏ sợi thủy tinh, cả hai đóng dấu ✖ đỏ 'KHÔNG BẢO VỆ'.",
      lines: [
        nar(
          "Bạn còn nhớ bài học về vật dẫn điện và vật cách điện hồi lớp 8 chứ? Kim loại thì dẫn điện, còn cao su thì cách điện.",
          "Bạn còn nhớ bài học về vật dẫn điện và vật cách điện hồi lớp tám chứ? Kim loại thì dẫn điện, còn cao su thì cách điện.",
        ),
        nar(
          "Vỏ kim loại của ô tô kín chính là một chiếc lồng Faraday. Dòng điện của sét chạy men theo mái và thành xe, vòng qua khoang ngồi rồi xuống đất.",
          "Vỏ kim loại của ô tô kín chính là một chiếc lồng Pha ra đây. Dòng điện của sét chạy men theo mái và thành xe, vòng qua khoang ngồi rồi xuống đất.",
        ),
        nar(
          "Vì thế, ô tô mui trần dù đã kéo mui vải lên, hay xe có vỏ sợi thủy tinh, đều không che chở được cho bạn đâu.",
          "Vì thế, ô tô mui trần dù đã kéo mui vải lên, hay xe có vỏ sợi thủy tinh, đều không che chở được cho bạn đâu.",
        ),
      ],
    },
    realworld: {
      shot: "Cánh đồng lúa Việt Nam chiều giông, mây đen kéo tới. Câu 1: Milo (vai người đi đường, mặc áo mưa, đội mũ bảo hiểm) chạy xe máy trên bờ ruộng; viền chấm chấm vẽ quanh người Milo rồi biến mất, chữ 'KHÔNG CÓ VỎ = KHÔNG CÓ LỒNG'. Câu 2: tiếng sấm vẽ thành chữ 'ÙNG ÙNG'; từ đám mây kéo ra một vòng tròn bán kính ghi '≈ 16 km', Milo nằm trong vòng; nhãn 'NGHE SẤM = ĐANG TRONG TẦM SÉT'. Câu 3: Milo dừng xe, bước ra xa chiếc xe máy; một cây đa đứng một mình giữa đồng và cột điện bên đường bị đóng dấu ✖ đỏ; mũi tên xanh chỉ về phía một ngôi nhà gạch kiên cố và một chiếc ô tô mui kín, dấu ✔. Câu 4: Milo đứng trong hiên nhà nhìn ra, đồng hồ cát lật ngược, chữ '30 PHÚT SAU TIẾNG SẤM CUỐI'.",
      lines: [
        nar(
          "Thế còn xe máy thì sao? Nó chẳng có lớp vỏ nào bọc quanh người, nên làm gì có lồng Faraday!",
          "Thế còn xe máy thì sao? Nó chẳng có lớp vỏ nào bọc quanh người, nên làm gì có lồng Pha ra đây!",
        ),
        nar(
          "Đang đi giữa đồng mà nghe thấy sấm, là bạn đã ở trong tầm sét rồi đấy. Sét có thể đánh xa tới 16 km, tính từ cơn giông.",
          "Đang đi giữa đồng mà nghe thấy sấm, là bạn đã ở trong tầm sét rồi đấy. Sét có thể đánh xa tới mười sáu cây số, tính từ cơn giông.",
        ),
        nar(
          "Cơ quan khí tượng Mỹ khuyên bạn nên xuống xe, vào ngay một ngôi nhà kiên cố hoặc một chiếc ô tô mui kín. Ở Việt Nam, ngành phòng chống thiên tai cũng dặn đừng trú dưới gốc cây, và nhớ tránh xa cột điện.",
          "Cơ quan khí tượng Mỹ khuyên bạn nên xuống xe, vào ngay một ngôi nhà kiên cố hoặc một chiếc ô tô mui kín. Ở Việt Nam, ngành phòng chống thiên tai cũng dặn đừng trú dưới gốc cây, và nhớ tránh xa cột điện.",
        ),
        nar(
          "Rồi phải chờ ít nhất 30 phút sau tiếng sấm cuối cùng thì hẵng đi tiếp nhé.",
          "Rồi phải chờ ít nhất ba mươi phút sau tiếng sấm cuối cùng thì hẵng đi tiếp nhé.",
        ),
      ],
    },
    cosmic: {
      shot: "Phóng lên bầu trời: một chiếc máy bay chở khách bay xuyên qua tầng mây giông, Milo (vai kỹ sư hàng không, kính bảo hộ kéo xuống) ngồi cạnh cửa sổ. Câu 1: tia sét đánh vào mũi máy bay, bảng số hiện '> 1 LẦN / NĂM / MỖI MÁY BAY'. Câu 2: dòng điện vàng chạy dọc lớp vỏ nhôm từ mũi tới đuôi rồi thoát vào không trung; cận cảnh bánh xe máy bay đang thu gọn trong thân, chữ viết tay 'chẳng bánh nào chạm đất!'. Câu 3: thu về chiếc ô tô mui kín trên đường quê; con dấu đỏ lớn 'TIN ĐỒN!' đóng xuống bốn chiếc lốp, rồi lớp vỏ xe sáng lên thành khung lồng Faraday ôm lấy Milo đang ngồi bên trong; danh sách nguồn chạy ở chân màn hình.",
      lines: [
        nar(
          "Bằng chứng rõ nhất ở trên trời. Theo kỹ sư Edward Rupke, trung bình mỗi máy bay chở khách ở Mỹ bị sét đánh hơn một lần mỗi năm.",
          "Bằng chứng rõ nhất ở trên trời. Theo kỹ sư Ét uốt Rúp kơ, trung bình mỗi máy bay chở khách ở Mỹ bị sét đánh hơn một lần mỗi năm.",
        ),
        nar(
          "Dòng điện chạy dọc lớp vỏ nhôm, từ mũi hay đầu cánh tới đuôi, rồi thoát ra không trung. Mà máy bay thì chẳng có chiếc bánh nào chạm đất cả!",
          "Dòng điện chạy dọc lớp vỏ nhôm, từ mũi hay đầu cánh tới đuôi, rồi thoát ra không trung. Mà máy bay thì chẳng có chiếc bánh nào chạm đất cả!",
        ),
        nar(
          "Vậy phán quyết là, tin đồn! Nói gọn lại, thứ giữ bạn an toàn không phải là bốn chiếc lốp, mà là lớp vỏ kim loại, chính chiếc lồng Faraday mà bạn đang ngồi bên trong.",
          "Vậy phán quyết là, tin đồn! Nói gọn lại, thứ giữ bạn an toàn không phải là bốn chiếc lốp, mà là lớp vỏ kim loại, chính chiếc lồng Pha ra đây mà bạn đang ngồi bên trong.",
        ),
      ],
    },
  }),
];
