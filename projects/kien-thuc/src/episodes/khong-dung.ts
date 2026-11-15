/**
 * Kịch bản KHÔNG DÙNG (chủ kênh bỏ ngày 15/11/2026): búa và lông chim, cơm nguội, thư mật Mary.
 * Không nằm trong index.ts nên không xuất, không hiện trong bot; giữ lại để tham khảo / dùng lại sau.
 * Cảnh vẽ riêng tương ứng: engine/parchment/ep02.tsx, ep03.tsx, ep04.tsx (đã gỡ đăng ký).
 */
import { makeEpisode, nar } from "./make.ts";

const week = 1;
const theme = "Nghịch lý & Tin đồn khoa học";

export const KHONG_DUNG = [
  makeEpisode({
    day: 2,
    week,
    theme,
    title: "Thả búa và lông chim trên Mặt Trăng: cái nào chạm đất trước?",
    hudTitle: "BÚA HAY LÔNG CHIM CHẠM ĐẤT TRƯỚC?",
    textbook: "Vật lí 10 · Sự rơi tự do",
    era: "Mặt Trăng, vùng Hadley · 2/8/1971",
    question: "Đố bạn: trên Mặt Trăng, thả một vật từ cùng độ cao thì nó rơi lâu gấp mấy lần ở Trái Đất?",
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
          "Thế nhưng năm 1971, phi hành gia David Scott của Apollo 15 đã làm đúng phép thử ấy trên Mặt Trăng, trước ống kính truyền hình.",
          "Thế nhưng năm một nghìn chín trăm bảy mươi mốt, phi hành gia Đây-vít Xcốt của A-pô-lô mười lăm đã làm đúng phép thử ấy trên Mặt Trăng, trước ống kính truyền hình.",
        ),
        nar(
          "Bạn cược gì nào? Búa, lông chim, hay cả hai cùng lúc? Ghi vào bình luận rồi hẵng xem tiếp nhé!",
          "Bạn cược gì nào? Búa, lông chim, hay cả hai cùng lúc? Ghi vào bình luận rồi hẵng xem tiếp nhé!",
        ),
      ],
    },
    barrier: {
      shot: "Chuyển về sân Trái Đất: Milo (áo sơ mi xanh, ghi-lê rêu) thả cùng lúc một hòn đá và một chiếc lá; hòn đá rơi thẳng 'cộp', chiếc lá chao lượn mãi; tờ giấy thả sau cũng lượn lờ. Câu 2: lật trang giấy da sang Athens cổ, Milo (vai Aristotle, áo choàng trắng) viết lên cuộn giấy dòng chữ 'NẶNG GẤP ĐÔI → RƠI NHANH GẤP ĐÔI', bên cạnh hai quả cầu 1 kg và 2 kg với mũi tên tốc độ dài gấp đôi. Câu 3: dòng chữ được đóng khung vàng, xếp chồng lên nhiều cuốn sách cổ có nhãn thế kỷ, như được dạy lại qua bao đời.",
      lines: [
        nar(
          "Trực giác ấy đâu có ngớ ngẩn. Ngoài đời, hòn đá rơi nhanh hơn chiếc lá, còn tờ giấy thì chao lượn mãi mới chạm đất.",
          "Trực giác ấy đâu có ngớ ngẩn. Ngoài đời, hòn đá rơi nhanh hơn chiếc lá, còn tờ giấy thì chao lượn mãi mới chạm đất.",
        ),
        nar(
          "Hơn 2.300 năm trước, triết gia Hy Lạp Aristotle cũng nghĩ vậy. Theo ông, vật rơi nhanh tỉ lệ với sức nặng.",
          "Hơn hai nghìn ba trăm năm trước, triết gia Hy Lạp A-ri-xtốt cũng nghĩ vậy. Theo ông, vật rơi nhanh tỉ lệ với sức nặng.",
        ),
        nar(
          "Nặng gấp đôi thì rơi nhanh gấp đôi. Nghe hợp lý đến mức suốt nhiều thế kỷ, ý ấy được dạy như chân lý.",
          "Nặng gấp đôi thì rơi nhanh gấp đôi. Nghe hợp lý đến mức suốt nhiều thế kỷ, ý ấy được dạy như chân lý.",
        ),
      ],
    },
    eureka: {
      shot: "Câu 1: tháp nghiêng Pisa vẽ mờ như tranh cũ, Milo (vai Galileo) đứng trên đỉnh cầm hai quả cầu, con dấu đỏ 'TƯƠNG TRUYỀN' đóng chéo lên cảnh; một cuốn sách nhỏ ghi 'VIVIANI kể lại' bay qua. Câu 2: gạch bỏ cảnh tháp, chuyển vào xưởng, máng gỗ nghiêng dài, Milo thả viên bi đồng lăn xuống, nhịp quả lắc tích tắc. Câu 3: vạch quãng đường hiện theo nhịp: '1 nhịp → 1', '2 nhịp → 4', '3 nhịp → 9'. Câu 4: cắt về Mặt Trăng, quay chậm cú thả, búa và lông chim song song rơi xuống, chạm bụi cùng một khung hình; bụi tung lên, Milo-Scott dang tay, bong bóng thoại 'GALILEO ĐÃ ĐÚNG!'.",
      lines: [
        nar(
          "Người lật ngược ý ấy là Galileo. Chuyện ông thả hai quả cầu từ tháp nghiêng Pisa chỉ là tương truyền, do học trò Viviani kể lại.",
          "Người lật ngược ý ấy là Ga-li-lê. Chuyện ông thả hai quả cầu từ tháp nghiêng Pi-da chỉ là tương truyền, do học trò Vi-vi-a-ni kể lại.",
        ),
        nar(
          "Đáng tin hơn là chiếc máng nghiêng. Khoảng năm 1604, Galileo cho bi lăn xuống dốc, làm chậm cú rơi để kịp đo.",
          "Đáng tin hơn là chiếc máng nghiêng. Khoảng năm một nghìn sáu trăm linh tư, Ga-li-lê cho bi lăn xuống dốc, làm chậm cú rơi để kịp đo.",
        ),
        nar(
          "Bi lăn nhanh dần đều. Nhịp đầu đi một gang, hai nhịp đi bốn gang, ba nhịp chín gang. Galileo còn khẳng định, không có không khí cản, mọi vật rơi như nhau.",
          "Bi lăn nhanh dần đều. Nhịp đầu đi một gang, hai nhịp đi bốn gang, ba nhịp chín gang. Ga-li-lê còn khẳng định, không có không khí cản, mọi vật rơi như nhau.",
        ),
        nar(
          "Còn trên Mặt Trăng gần như không có không khí, búa và lông chim chạm đất cùng lúc! Scott bình luận, điều đó chứng tỏ ngài Galileo đã đúng.",
          "Còn trên Mặt Trăng gần như không có không khí, búa và lông chim chạm đất cùng lúc! Xcốt bình luận, điều đó chứng tỏ ngài Ga-li-lê đã đúng.",
        ),
      ],
    },
    theorem: {
      shot: "Câu 1: trở lại sân Trái Đất, quanh chiếc lông chim đang rơi hiện các mũi tên nhỏ của không khí đẩy ngược lên; Milo (vai học giả, kính đồng thau kéo xuống mắt) dùng chiếc bơm tay hút hết khí trong một ống thủy tinh dài, các mũi tên biến mất, chỉ còn một mũi tên trọng lực P hướng xuống trên cả búa lẫn lông. Câu 2: công thức s = ½gt² mọc ra từ hai vệt rơi song song, kèm dòng 't ×2 → s ×4'. Câu 3: bảng so sánh hai cột 'TRÁI ĐẤT g ≈ 9,8 m/s²' và 'MẶT TRĂNG g ≈ 1,62 m/s²' (huy hiệu '≈ 1/6'), thước đo cao 1,6 m, đồng hồ đếm đến 1,4 giây. Câu 4: cuốn Vật lí 10 mở ra ở Bài 10, trang mở đầu có hình búa và lông chim.",
      lines: [
        nar(
          "Vậy cái gì làm lông chim rơi chậm? Thủ phạm là sức cản không khí. Bỏ không khí đi, vật chỉ còn chịu trọng lực, đó gọi là rơi tự do.",
          "Vậy cái gì làm lông chim rơi chậm? Thủ phạm là sức cản không khí. Bỏ không khí đi, vật chỉ còn chịu trọng lực, đó gọi là rơi tự do.",
        ),
        nar(
          "Ở cùng một nơi, vật nặng hay nhẹ đều rơi tự do với cùng gia tốc g. Rơi lâu gấp đôi thì đi xa gấp bốn, đúng như viên bi của Galileo.",
          "Ở cùng một nơi, vật nặng hay nhẹ đều rơi tự do với cùng gia tốc giê. Rơi lâu gấp đôi thì đi xa gấp bốn, đúng như viên bi của Ga-li-lê.",
        ),
        nar(
          "Mặt Trăng hút yếu hơn, g chỉ bằng chừng một phần sáu ở Trái Đất. Nên cú thả ngang tầm vai ấy mất hơn một giây.",
          "Mặt Trăng hút yếu hơn, giê chỉ bằng chừng một phần sáu ở Trái Đất. Nên cú thả ngang tầm vai ấy mất hơn một giây.",
        ),
        nar(
          "Bài Sự rơi tự do trong Vật lí lớp 10 mở đầu bằng chính cú thả này đấy.",
          "Bài Sự rơi tự do trong Vật lí lớp mười mở đầu bằng chính cú thả này đấy.",
        ),
      ],
    },
    realworld: {
      shot: "Câu 1: bàn học ở nhà, Milo thả riêng một cuốn sách và một tờ giấy phẳng, sách 'bộp' xuống trước, giấy lượn lờ (✖). Câu 2: Milo đặt tờ giấy nằm phẳng trên mặt cuốn sách, thả, quay chậm: luồng gió vẽ bằng nét chì bị cuốn sách rẽ sang hai bên, sách và giấy chạm bàn cùng lúc (✔).",
      lines: [
        nar(
          "Muốn tự kiểm chứng? Thử ngay ở nhà nhé. Thả riêng cuốn sách và tờ giấy, sách xuống trước.",
          "Muốn tự kiểm chứng? Thử ngay ở nhà nhé. Thả riêng cuốn sách và tờ giấy, sách xuống trước.",
        ),
        nar(
          "Giờ đặt tờ giấy nằm phẳng trên cuốn sách rồi thả. Cuốn sách rẽ không khí cho tờ giấy, và cả hai chạm đất cùng lúc!",
          "Giờ đặt tờ giấy nằm phẳng trên cuốn sách rồi thả. Cuốn sách rẽ không khí cho tờ giấy, và cả hai chạm đất cùng lúc!",
        ),
      ],
    },
    cosmic: {
      shot: "Câu 1: phóng ra vũ trụ, Trái Đất xanh tròn trên nền đen, trạm vũ trụ quốc tế ISS bay ngang. Câu 2: nhãn 'trọng lực ≈ 90%'; Milo phi hành gia lơ lửng trong trạm, dấu hỏi lớn bên cạnh. Câu 3: nhãn '≈ 28.000 km/h', vẽ đường cong: một mũi tên rơi thẳng xuống cộng một mũi tên lao ngang tạo thành quỹ đạo tròn ôm lấy Trái Đất; phóng vào trong trạm, chiếc búa và chiếc lông chim lơ lửng song song cạnh Milo. Câu 4: thu nhỏ dần về bụi xám Mặt Trăng, khung hình cuối là búa và lông chim nằm cạnh nhau trên mặt bụi, chữ viết tay 'CÙNG MỘT LÚC'.",
      lines: [
        nar(
          "Ngay lúc này, một thứ khổng lồ cũng đang rơi tự do. Đó là trạm vũ trụ quốc tế ISS!",
          "Ngay lúc này, một thứ khổng lồ cũng đang rơi tự do. Đó là trạm vũ trụ quốc tế ai ét ét!",
        ),
        nar(
          "Theo NASA, ở độ cao của trạm, trọng lực vẫn còn khoảng 90% so với mặt đất. Vậy sao phi hành gia lại lơ lửng?",
          "Theo Na-sa, ở độ cao của trạm, trọng lực vẫn còn khoảng chín mươi phần trăm so với mặt đất. Vậy sao phi hành gia lại lơ lửng?",
        ),
        nar(
          "Bởi trạm lao ngang khoảng 28.000 km/h, cứ rơi mà mãi hụt mặt đất cong. Người và đồ bên trong rơi cùng trạm, nên trông như lơ lửng.",
          "Bởi trạm lao ngang khoảng hai mươi tám nghìn ki-lô-mét mỗi giờ, cứ rơi mà mãi hụt mặt đất cong. Người và đồ bên trong rơi cùng trạm, nên trông như lơ lửng.",
        ),
        nar(
          "Nói gọn lại, không có không khí cản thì nặng hay nhẹ, mọi thứ đều rơi như nhau, từ chiếc lông chim đến cả trạm vũ trụ.",
          "Nói gọn lại, không có không khí cản thì nặng hay nhẹ, mọi thứ đều rơi như nhau, từ chiếc lông chim đến cả trạm vũ trụ.",
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
];
