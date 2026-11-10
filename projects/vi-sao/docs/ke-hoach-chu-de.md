# Kế hoạch chủ đề các tuần tiếp theo · Ông Ơi, Vì Sao?

Tài liệu đề xuất chủ đề cho tuần 2 trở đi, sau tuần 1 "Bầu trời và thời tiết". Không lặp lại các câu của tuần 1 (bầu trời xanh, hoàng hôn, mây trắng/mây đen, mưa, cầu vồng, sấm chớp, ban đêm).

> **Đã triển khai (10/11/2026):** tuần 2–7 đã viết thành tập 8–49 trong `src/episodes/tuan-2.ts` … `tuan-7.ts`. Kịch bản là nguồn chính xác; bảng dưới đây là kế hoạch ban đầu. Các câu đã đổi khi kiểm chứng lại:
>
> | Kế hoạch | Thay bằng | Lý do |
> | --- | --- | --- |
> | Vì sao ngựa vằn có sọc | #11 Vì sao cá voi phun nước trên đầu | Khoa học còn tranh luận về lý do có sọc; nguồn thứ hai không đọc được |
> | Vì sao lá cây màu xanh | #29 Vì sao cây xấu hổ cụp lá khi bị chạm | Nguồn cho thấy cách giải thích quen thuộc ("màu xanh là phần cây không dùng") là sai; trùng mạch ánh sáng màu của tuần 1 |
> | Vì sao thấy trăng ban ngày | #18 Vì sao Mặt Trăng có vết đen loang lổ (hiểu lầm: chú Cuội ngồi gốc cây đa) | Chỉ còn 1 nguồn đọc được, trùng ý với #17 |
> | Vũng nước bốc hơi | #39 Vì sao nước biển lúc dâng lên, lúc rút xuống | Trùng ý với #4 "Mưa từ đâu ra?" |
> | Hắt xì tim có ngừng không | #25 Vì sao mình hắt xì hơi (hiểu lầm: có người nhắc tên) | Thiếu nguồn thứ hai; ý "tim ngừng" dễ làm trẻ lo |
>
>
> **Thay vòng 2 (10/11/2026), siết chuẩn nguồn:** chỉ dùng nguồn của tổ chức (cơ quan nhà nước, đại học, bảo tàng, sở thú, bệnh viện), không dùng tạp chí/báo (National Geographic, Scientific American, BBC, Science News, Smithsonian Magazine…); mỗi câu thoại phải có nguồn viết thẳng, không suy luận. 15 tập không đạt đã đổi sang câu khác; bảng đối chiếu câu → trích nguồn lưu khi soát. Tập #8 hồng hạc giữ chủ đề, bỏ nguồn NatGeo Kids.
>
> | # | Câu cũ | Câu mới |
> | --- | --- | --- |
> | 5 | Vì sao có cầu vồng sau mưa? | Vì sao trời nóng mà vẫn có mưa đá? |
> | 9 | Vì sao lạc đà có cái bướu trên lưng? | Vì sao con bò cứ nhai đi nhai lại mãi? |
> | 10 | Vì sao người ta nói đà điểu vùi đầu xuống cát? | Vì sao tắc kè bò trên trần nhà mà không rơi? |
> | 11 | Vì sao cá voi phun nước trên đầu? | Vì sao gấu trúc ăn tre gần như cả ngày? |
> | 13 | Vì sao dơi bay trong đêm mà không đâm vào cây? | Vì sao mắt mèo sáng lên trong đêm? |
> | 17 | Vì sao ban ngày không thấy sao? | Vì sao có sao băng vụt qua bầu trời? |
> | 21 | Vì sao Sao Hoả màu đỏ? | Vành đai của Sao Thổ làm bằng gì? |
> | 24 | Vì sao mình bị nấc cụt? | Vì sao mình đổ mồ hôi? |
> | 27 | Vì sao bụng sôi ọc ọc? | Vì sao mình nổi da gà? |
> | 29 | Vì sao cây xấu hổ cụp lá khi bị chạm? | Vì sao cây bắt ruồi lại ăn côn trùng? |
> | 33 | Vì sao thân cây chuối bóc ra từng lớp mà không có gỗ? | Vì sao quả ớt lại cay? |
> | 38 | Vì sao biển có sóng? | Giọt mưa thật ra có hình gì? |
> | 39 | Vì sao nước biển lúc dâng lên, lúc rút xuống? | Vì sao con nhện nước đi được trên mặt nước? |
> | 45 | Vì sao để chuối cạnh trái cây khác thì chúng chín nhanh hơn? | Vì sao cất đồ ăn vào tủ lạnh thì lâu hỏng hơn? |
> | 47 | Vì sao hạt ngô nổ thành bỏng? | Vì sao thìa inox sờ vào thấy lạnh hơn thìa gỗ? |

> Các câu bụng sôi, nước ngọt có ga, chuối làm trái cây chín nhanh đã tìm được nguồn thứ hai nên giữ lại. Thứ tự trong tuần được sắp lại để câu hỏi cuối mỗi tập nối sang tập sau.

**Cách kiểm tra nguồn.** Mọi link trong bảng đã được tải bằng `curl` (User-Agent Mozilla) ngày 10/11/2026, trả về HTTP 200. Nội dung được trích ra và đọc để xác nhận trang có đúng ý giải thích, và có bác bỏ hiểu lầm hoặc cho thấy vì sao nó sai. Link nào chặn truy cập tự động thì không dùng (danh sách ở mục 6).

**Ký hiệu trạng thái:**

- ✅ Có ít nhất 2 nguồn uy tín mở được và đều chứa nội dung giải thích.
- ⚠️ Một phần: nguồn thứ hai chỉ xác nhận một phần. Cần tìm thêm nguồn trước khi làm tập.
- ❌ Thiếu nguồn: chỉ có 1 nguồn mở được. Chưa được làm tập.

---

## 1. Xếp hạng chủ đề

Thang điểm 1–5, điểm càng cao càng tốt. Điểm "an toàn" cao nghĩa là ít rủi ro trẻ bắt chước nguy hiểm hoặc bị sợ.

| Hạng | Chủ đề | Trẻ quan tâm | Hấp dẫn khi làm hoạt hình (hình vui, twist) | Dễ kiểm chứng | An toàn | Tổng /20 | Câu đủ 2 nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Con vật kỳ lạ** | 5 | 5 | 4 | 5 | **19** | 7/7 ✅ |
| 2 | **Vũ trụ quanh mình** | 4 | 4 | 5 | 5 | **18** | 7/7 ✅ |
| 3 | **Cơ thể mình** | 5 | 5 | 3 | 4 | **17** | 5/7 (1 ⚠️, 1 ❌) |
| 4 | **Cây cối và trái cây** | 3 | 5 | 4 | 5 | **17** | 7/7 ✅ (+1 dự phòng) |
| 5 | **Nước quanh ta** | 3 | 4 | 5 | 4 | **16** | 7/7 ✅ |
| 6 | **Căn bếp nhà mình** | 4 | 4 | 3 | 3 | **14** | 5/7 (2 ❌) |

**Lý do xếp hạng:**

- **Con vật** đứng đầu: các khảo sát phụ huynh đều thấy câu hỏi về con vật và thiên nhiên chiếm nhiều nhất (mục 2). Mỗi câu có một twist rõ, chẳng hạn bướu lạc đà chứa mỡ chứ không chứa nước, hay đà điểu không vùi đầu. Nhân vật con vật dễ vẽ vui, và chủ đề gần như không có rủi ro bắt chước.
- **Vũ trụ** có nguồn tốt nhất (NASA, NOAA, đại học), trẻ rất tò mò. Điểm trừ là một số câu trừu tượng (quỹ đạo, độ nghiêng), khó vẽ hơn.
- **Cơ thể mình** rất gần gũi và nhiều twist: máu luôn đỏ, ngón tay nhăn do thần kinh, không tự cù được. Nhưng nhiều trang y khoa cho trẻ em (KidsHealth, Library of Congress) chặn truy cập tự động nên khó đủ 2 nguồn. Phải tránh hình ảnh kim tiêm và máu chảy.
- **Cây cối** có twist rất mạnh: cây được làm phần lớn từ không khí, cây chuối không phải cây gỗ, cà chua là quả. Trẻ ít tự hỏi về cây hơn về con vật nên mức quan tâm thấp hơn.
- **Nước quanh ta** dễ kiểm chứng và dễ làm thí nghiệm ở nhà có người lớn. Một số câu gần với chủ đề thời tiết của tuần 1 (vũng nước bốc hơi, biển xanh), nên xếp xa tuần 1.
- **Căn bếp** gần gũi nhưng nhiều hoạt động có dao, nồi nóng, dầu nóng, nên phải có cảnh báo người lớn làm. 2 câu còn thiếu nguồn.

**Lịch gợi ý:** tuần 2 Con vật → tuần 3 Vũ trụ → tuần 4 Cơ thể mình (dùng 5 câu đủ nguồn, bổ sung nguồn cho 2 câu còn lại trước) → tuần 5 Cây cối → tuần 6 Nước quanh ta → tuần 7 Căn bếp (bổ sung nguồn trước).

---

## 2. Bằng chứng về những gì trẻ hay hỏi

| Nguồn | Nội dung chính liên quan | Ý nghĩa cho series |
| --- | --- | --- |
| Frazier, Gelman & Wellman (2009), *Preschoolers' search for explanatory information within adult–child conversation*, Child Development 80(6) — [PMC2784636](https://pmc.ncbi.nlm.nih.gov/articles/PMC2784636/) | Trẻ 2–5 tuổi khi được giải thích thì hay đồng ý và **hỏi tiếp** câu mới cùng chủ đề. Khi không được giải thích thì hỏi lại câu cũ hoặc tự đưa ra lời giải thích. Trẻ chủ động tìm lời giải thích nguyên nhân chứ không chỉ cần sự chú ý. | Ủng hộ cấu trúc "giải thích thật rồi hỏi tiếp": câu hỏi tiếp cuối tập khớp với cách trẻ phản ứng khi hài lòng. |
| Callanan & Oakes (1992), *Preschoolers' questions and parents' explanations: Causal thinking in everyday activity*, Cognitive Development 7(2) — tóm tắt trong bài Frazier et al. 2009 ở trên | Nhật ký 2 tuần của các mẹ có con 3–5 tuổi: trẻ từ 3 tuổi đã hỏi "vì sao", "sao lại thế" về **hiện tượng cơ học, tự nhiên và xã hội**. Kiểu giải thích phụ huynh dùng nhiều nhất là **giải thích cơ chế (mô tả các bước trung gian)**. | Ủng hộ cách giải thích 3–4 bước của Cụ Đồ: đó là kiểu giải thích tự nhiên nhất trong các cuộc trò chuyện thật. |
| Chouinard (2007), *Children's questions: a mechanism for cognitive development*, Monographs SRCD 72(1) — [PubMed 17394580](https://pubmed.ncbi.nlm.nih.gov/17394580/) | Theo trích dẫn trong Frazier et al. 2009: trẻ mẫu giáo hỏi rất nhiều câu, và nội dung câu hỏi theo sát sự phát triển hiểu biết của trẻ. *(Trang PubMed chặn truy cập tự động; chưa đọc trực tiếp bản tóm tắt nên không trích số liệu.)* | Câu hỏi của trẻ là công cụ học thật, nên câu trả lời cần đúng khoa học, không chỉ vui. |
| Legare, Sobel & Callanan (2017), *Causal learning is collaborative: Examining explanation and exploration in social contexts*, Psychonomic Bulletin & Review — [PMC10409598](https://pmc.ncbi.nlm.nih.gov/articles/PMC10409598/) | Nhắc lại các nghiên cứu nhật ký câu hỏi "vì sao" và cho thấy kết quả lặp lại ở gia đình gốc Mexico. | Thói quen hỏi "vì sao" không chỉ có ở một nền văn hoá. |
| Khảo sát The Goddard School / OnePoll (2023), 2.000 phụ huynh có con 0–6 tuổi — [goddardschool.com](https://www.goddardschool.com/news/2023/power-of-a-question) | **76%** câu hỏi là để hiểu thế giới xung quanh (**con vật/thiên nhiên**, thời sự, chuyện trong nhà). 64% về môn học (toán, đọc, khoa học). *(Khảo sát do trường mầm non tư đặt hàng, mẫu online, nên chỉ để tham khảo.)* | Con vật và thiên nhiên nên được ưu tiên. |
| Ask Dr. Universe, dự án giáo dục khoa học của Washington State University — [askdruniverse.wsu.edu](https://askdruniverse.wsu.edu/about/) | Trang trả lời câu hỏi thật của trẻ, ghi tên và tuổi người hỏi. Các câu dùng trong kế hoạch này: không tự cù được (Malcolm, 3 tuổi), bụng sôi (Jules, 5), hành cay mắt (Kera, 5), đom đóm (Asher, 7), nấc cụt (William, 9), nước ngọt có ga (Emily, 9), biển mặn (Alysin, 10), bánh mì nở (Skye, 10). | Bằng chứng trực tiếp rằng trẻ 3–10 tuổi thật sự hỏi đúng các câu này. |
| Các trang hỏi–đáp khác của đại học | Illinois Physics Van ghi tuổi người hỏi: "Vì sao tàu nổi?" (10 tuổi), "Vì sao biển xanh?" (14 tuổi). Bài của Binghamton University về ngón tay nhăn kể nghiên cứu bắt đầu từ "câu hỏi của một đứa trẻ". NASA Space Place và Caltech Cool Cosmos đều có mục hỏi–đáp vũ trụ cho trẻ. | Thêm bằng chứng câu hỏi có thật. |
| Common Sense Media & Đại học Michigan (2020), *Young Kids and YouTube* — [thông cáo](https://www.commonsensemedia.org/press-releases/as-online-videos-dominate-young-kids-screen-time-youtube-exposes-them-to-age-inappropriate-content) | Phân tích hơn 1.600 video trẻ dưới 8 tuổi xem: 24% được xếp loại giáo dục, nhưng **chỉ khoảng 4% có giá trị giáo dục cao**; 76% có giá trị giáo dục yếu hoặc không có. | Khoảng trống thị trường: video ngắn giải thích đúng và đúng tầm tuổi còn hiếm. |

**Giới hạn:**

- Không tìm được số liệu uy tín, công khai về xu hướng nội dung khoa học thiếu nhi trên TikTok hoặc YouTube Shorts (lượt xem theo chủ đề). Phần "trẻ quan tâm" trong bảng xếp hạng dựa vào các nghiên cứu và khảo sát ở trên, không dựa vào số liệu nền tảng.
- Wonderopolis không truy cập được bằng curl (hết thời gian chờ), nên không dùng.

---

## 3. Chi tiết 6 chủ đề

Mỗi câu gồm: câu hỏi, hiểu lầm phổ biến kèm bằng chứng bác bỏ dễ thấy, câu trả lời một câu, sơ đồ từng bước, nguồn và trạng thái. Phần "Lưu ý khi viết" ghi các chỗ dễ nói sai.

### 3.1. Con vật kỳ lạ (hạng 1) — 7/7 ✅

| # | Câu hỏi | Hiểu lầm → bằng chứng | Trả lời một câu | Sơ đồ minh hoạ | Nguồn | TT |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Vì sao chim hồng hạc màu hồng? | Hồng hạc sinh ra đã có lông hồng. → Màu hồng đậm hay nhạt tuỳ vào thứ hồng hạc ăn. | Hồng hạc màu hồng vì thức ăn của nó (tảo, tôm tép nhỏ) có sắc tố đỏ cam giống trong cà rốt. | ① Tảo và tôm tép nhỏ chứa sắc tố đỏ cam (carotenoid)<br>② Hồng hạc ăn chúng<br>③ Sắc tố đi vào lông<br>④ Ăn càng nhiều, lông càng hồng | [San Diego Zoo – Flamingo](https://animals.sandiegozoo.org/animals/flamingo)<br>[Smithsonian's National Zoo – American flamingo](https://nationalzoo.si.edu/animals/american-flamingo)<br>[National Geographic Kids – Flamingo](https://kids.nationalgeographic.com/animals/birds/facts/flamingo) | ✅ |
| A2 | Vì sao lạc đà có bướu? | Bướu lạc đà chứa nước. → San Diego Zoo nói thẳng: bướu chứa mỡ, không chứa nước. | Bướu lạc đà là kho mỡ dự trữ năng lượng cho những ngày thiếu ăn. | ① Ăn no: mỡ dồn vào bướu<br>② Đi sa mạc thiếu ăn: dùng dần mỡ làm năng lượng<br>③ Bướu xẹp nhỏ lại<br>④ Ăn đủ trở lại: bướu căng lên | [San Diego Zoo – Camel](https://animals.sandiegozoo.org/animals/camel)<br>[Smithsonian's National Zoo – Getting Over the Hump](https://nationalzoo.si.edu/global-health-program/news/getting-over-hump-camel-care-kenya) | ✅ |
| A3 | Vì sao người ta nói đà điểu vùi đầu xuống cát? | Đà điểu sợ thì vùi đầu xuống cát. → Vùi đầu thì đà điểu không thở được. | Đà điểu không vùi đầu: nó nằm rạp cổ sát đất để trốn, và cúi đầu xuống hố để trở trứng, nhìn từ xa tưởng là vùi đầu. | ① Đà điểu đào hố làm tổ<br>② Mỗi ngày cúi đầu xuống hố trở trứng vài lần<br>③ Gặp nguy mà không chạy được: nằm rạp, cổ sát đất<br>④ Nhìn từ xa: tưởng đầu biến mất trong cát | [San Diego Zoo – Ostrich](https://animals.sandiegozoo.org/animals/ostrich)<br>[National Geographic Kids – Animal Myths Busted](https://kids.nationalgeographic.com/nature/article/animal-myths-busted) | ✅ |
| A4 | Vì sao ngựa vằn có sọc? | Sọc giúp ngựa vằn ngụy trang trốn sư tử. → Ngựa vằn sống ở đồng cỏ trống, nơi sọc không giúp ngụy trang. | Các nhà khoa học cho rằng sọc chủ yếu giúp ngựa vằn bớt bị ruồi hút máu đốt. | ① Đồng cỏ châu Phi có nhiều ruồi hút máu<br>② Ruồi bay tới sọc đen trắng thì bị rối, khó đáp xuống<br>③ Ngựa vằn bị đốt ít hơn các loài sống cạnh<br>④ Ít bị đốt thì ít mất máu, ít bệnh | [Princeton Insights – Why the Zebra Got its Stripes](https://insights.princeton.edu/2023/12/evolution-of-zebra-stripes/)<br>[Smithsonian Magazine – How the Zebra Got Its Stripes](https://www.smithsonianmag.com/smart-news/how-zebra-got-its-stripes-according-science-180950367/) | ✅ |
| A5 | Vì sao cú quay đầu được rất xa? | Cú quay đầu được trọn một vòng 360°. → Cú chỉ quay được khoảng 270°. | Cú có số đốt sống cổ gấp đôi người nên quay đầu được khoảng ba phần tư vòng, chưa đủ một vòng. | ① Cổ người có 7 đốt sống<br>② Cổ cú có 14 đốt sống<br>③ Nhờ vậy cú quay đầu được khoảng 270°<br>④ 270° là ba phần tư vòng, chưa tới 360° | [Illinois Vet Med – Owl Oddities](https://vetmed.illinois.edu/vetmed-wildlife-blog/owl-oddities/)<br>[WSU Vet Med – Great horned owl](https://vetmed.wsu.edu/eugene-great-horned-owl/) | ✅ |
| A6 | Vì sao dơi bay trong đêm mà không đâm vào cây? | Dơi bị mù nên phải bay mò. → Dơi ăn quả dùng mắt (và mũi) để tìm thức ăn. | Dơi không mù; nhiều loài dơi nhỏ còn "nghe đường" bằng tiếng vang. | ① Dơi kêu ra sóng âm<br>② Âm thanh dội lại khi chạm cây hay côn trùng<br>③ Tai dơi nghe tiếng vang<br>④ Dơi biết vật ở đâu, kể cả trong bóng tối | [National Geographic Kids – Bat myths busted](https://kids.nationalgeographic.com/nature/article/bat-myths-busted)<br>[West Texas A&M (C. Baird) – Why are bats blind?](https://www.wtamu.edu/~cbaird/sq/2013/04/09/why-are-bats-blind/) | ✅ |
| A7 | Vì sao đom đóm phát sáng? | Trong bụng đom đóm có lửa hay bóng đèn nóng. → Ánh sáng đom đóm gần như không toả nhiệt. | Đom đóm phát sáng nhờ một phản ứng hoá học trong bụng, tạo ra ánh sáng "mát", và nháy đèn để tìm bạn. | ① Bụng đom đóm có "đèn" chứa luciferin và luciferase<br>② Đom đóm cho ôxy vào đèn<br>③ Phản ứng hoá học tạo ra ánh sáng, gần như không nóng<br>④ Nháy đèn để tìm bạn | [Ask Dr. Universe (WSU) – fireflies](https://askdruniverse.wsu.edu/2023/08/31/makes-fireflies-light-night/)<br>[National Park Service – Fireflies, Great Smoky Mountains](https://www.nps.gov/grsm/learn/nature/fireflies.htm) | ✅ |

**Lưu ý khi viết:**

- **A4:** nói "các nhà khoa học cho rằng", vì vẫn còn nghiên cứu khác (ví dụ giả thuyết sọc giúp làm mát). Đừng khẳng định chắc 100%.
- **A6:** thêm thẻ cuối cho phụ huynh: "Không chạm tay vào dơi".
- **A7:** nhắc "ngắm đom đóm, đừng bắt nhốt".

### 3.2. Vũ trụ quanh mình (hạng 2) — 7/7 ✅

| # | Câu hỏi | Hiểu lầm → bằng chứng | Trả lời một câu | Sơ đồ minh hoạ | Nguồn | TT |
| --- | --- | --- | --- | --- | --- | --- |
| V1 | Vì sao có mùa nóng, mùa lạnh? | Mùa hè vì Trái Đất ở gần Mặt Trời. → Nửa bắc Trái Đất đang mùa đông vào tháng 1, đúng lúc Trái Đất gần Mặt Trời nhất. | Vì trục Trái Đất nghiêng, nên trong năm mỗi nửa Trái Đất lần lượt nhận nắng chiếu thẳng hơn hay xiên hơn. | ① Trái Đất đi vòng quanh Mặt Trời với trục nghiêng<br>② Nửa nghiêng về phía Mặt Trời: nắng chiếu thẳng → mùa hè<br>③ Nửa kia: nắng xiên → mùa đông<br>④ Nửa vòng sau, hai nửa đổi chỗ | [NASA Space Place – What Causes the Seasons?](https://spaceplace.nasa.gov/seasons/en/)<br>[NOAA NESDIS – Why Does Earth Have Seasons?](https://www.nesdis.noaa.gov/about/k-12-education/understanding-our-planet/why-does-earth-have-seasons)<br>[weather.gov – What Causes the Seasons?](https://www.weather.gov/fsd/season) | ✅ |
| V2 | Vì sao Mặt Trăng lúc tròn lúc khuyết? | Bóng Trái Đất che Mặt Trăng. → Bóng Trái Đất che Mặt Trăng gọi là nguyệt thực; đó là hiện tượng khác, hiếm khi xảy ra. | Mặt Trời luôn chiếu sáng một nửa Mặt Trăng; Mặt Trăng đi vòng quanh Trái Đất nên mình thấy phần sáng đó lúc nhiều lúc ít. | ① Mặt Trời chiếu sáng một nửa Mặt Trăng<br>② Mặt Trăng đi vòng quanh Trái Đất<br>③ Đứng ở Trái Đất, mình thấy phần sáng nhiều hay ít tuỳ vị trí<br>④ Thấy hết là trăng tròn, thấy một chút là trăng khuyết | [NASA Space Place – Moon Phases](https://spaceplace.nasa.gov/moon-phases/en/)<br>[University of Hawaiʻi – Weird Science: Phases of the Moon](https://manoa.hawaii.edu/exploringourfluidearth/physical/tides/tide-formation-gravitational-pull/weird-science-phases-moon)<br>[Lunar and Planetary Institute – Moon Phases Misconceptions](https://www.lpi.usra.edu/education/pre_service_edu/PhasesMisconceptions.shtml) | ✅ |
| V3 | Vì sao ngôi sao lấp lánh? | Ngôi sao tự nhấp nháy, lúc bật lúc tắt. → Phần lớn ngôi sao chiếu sáng đều; sao gần chân trời lấp lánh nhiều hơn sao trên đỉnh đầu. | Không khí chuyển động bẻ cong ánh sao lung tung trên đường tới mắt mình, nên sao trông như nhấp nháy. | ① Ngôi sao phát ra ánh sáng đều<br>② Ánh sáng đi qua lớp không khí đang chuyển động<br>③ Các túi khí bẻ cong ánh sáng lúc lệch lúc thẳng<br>④ Mắt thấy sao lúc sáng lúc mờ | [NASA StarChild – Why do stars twinkle?](https://starchild.gsfc.nasa.gov/docs/StarChild/questions/question26.html)<br>[NASA Imagine the Universe – Ask an Astrophysicist](https://imagine.gsfc.nasa.gov/ask_astro/night_sky.html) | ✅ |
| V4 | Vì sao ban ngày không thấy sao? | Ban ngày các ngôi sao tắt hay "đi ngủ". → Ban ngày mình vẫn thấy một ngôi sao: Mặt Trời. | Các ngôi sao vẫn ở đó, nhưng bầu trời ban ngày sáng quá nên ánh sao mờ bị lấn mất. | ① Ban ngày sao vẫn ở trên trời<br>② Mặt Trời làm cả bầu trời sáng rực<br>③ Ánh sao yếu bị chìm trong ánh sáng đó<br>④ Trời tối thì sao hiện ra | [NASA – Why Can You See the Moon During the Day? (We Asked a NASA Scientist)](https://www.nasa.gov/solar-system/why-can-you-see-the-moon-during-the-day-we-asked-a-nasa-scientist-episode-19/)<br>[NASA Cosmicopia – Ask Us: Stars](https://cosmicopia.gsfc.nasa.gov/qa_star.html) | ✅ |
| V5 | Vì sao có hôm thấy Mặt Trăng giữa ban ngày? | Mặt Trăng chỉ xuất hiện ban đêm. → Đây là hiểu lầm được Lunar and Planetary Institute liệt kê; nhiều buổi sáng vẫn thấy trăng trên trời xanh. | Mặt Trăng phản chiếu ánh nắng đủ sáng để thấy cả ngày lẫn đêm, miễn là nó đang ở đúng phần bầu trời. | ① Mặt Trăng không tự phát sáng mà phản chiếu nắng<br>② Mặt Trăng đi vòng quanh Trái Đất nên giờ mọc thay đổi mỗi ngày<br>③ Có hôm nó ở trên trời khi Mặt Trời cũng đang ở trên trời<br>④ Trăng sáng hơn sao nhiều nên vẫn thấy được giữa trời xanh | [NASA – We Asked a NASA Scientist, Ep. 19](https://www.nasa.gov/solar-system/why-can-you-see-the-moon-during-the-day-we-asked-a-nasa-scientist-episode-19/)<br>[Lunar and Planetary Institute – Moon Phases Misconceptions](https://www.lpi.usra.edu/education/pre_service_edu/PhasesMisconceptions.shtml) | ✅ |
| V6 | Vì sao phi hành gia bay lơ lửng trong tàu vũ trụ? | Ngoài vũ trụ không có trọng lực. → Chính trọng lực giữ Mặt Trăng quay quanh Trái Đất. | Tàu và phi hành gia đang cùng rơi vòng quanh Trái Đất, nên trông như lơ lửng. | ① Trọng lực vẫn kéo tàu về phía Trái Đất<br>② Tàu bay ngang rất nhanh nên vừa rơi vừa vòng qua Trái Đất<br>③ Người và đồ vật trong tàu cũng rơi cùng lúc<br>④ Cùng rơi với nhau nên trông như lơ lửng | [NASA – What Is Microgravity? (K–4)](https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-k-4/)<br>[West Texas A&M (C. Baird) – Why is there no gravity in space?](https://www.wtamu.edu/~cbaird/sq/2012/12/18/why-is-there-no-gravity-in-space/) | ✅ |
| V7 | Vì sao Sao Hoả màu đỏ? | Tên là "Hoả" nên Sao Hoả nóng như lửa. → Sao Hoả là sa mạc lạnh, nhiệt độ trung bình khoảng −85°F (khoảng −65°C). | Đất đá Sao Hoả chứa sắt bị gỉ, giống cái đinh để lâu ngoài mưa. | ① Đất Sao Hoả có sắt<br>② Sắt bị gỉ thành màu đỏ cam<br>③ Gió thổi bụi gỉ bay khắp nơi, cả lên bầu trời<br>④ Nhìn từ xa, cả hành tinh đỏ | [NASA Space Place – All About Mars](https://spaceplace.nasa.gov/all-about-mars/en/)<br>[NASA Science – Mars Facts](https://science.nasa.gov/mars/facts/)<br>[Caltech Cool Cosmos – Why is Mars reddish?](https://coolcosmos.ipac.caltech.edu/ask/69-Why-is-Mars-reddish) | ✅ |

**Lưu ý khi viết:**

- **V1:** miền Nam Việt Nam có mùa mưa và mùa khô chứ không có bốn mùa. Nên đặt bối cảnh "miền Bắc" hoặc "nhiều nơi trên thế giới". Nguồn chỉ nói nắng chiếu "thẳng hơn hay xiên hơn"; đừng thêm ý "ngày dài hơn" nếu không trích nguồn khác.
- **V6:** NASA khuyên tránh nói "không trọng lượng" hay "không trọng lực". Dùng "rơi cùng nhau".
- **V7:** ESA (2025) đang bàn lại loại gỉ sắt cụ thể. Chỉ nói "sắt bị gỉ", không nêu tên khoáng chất.

### 3.3. Cơ thể mình (hạng 3) — 5/7 đủ nguồn

| # | Câu hỏi | Hiểu lầm → bằng chứng | Trả lời một câu | Sơ đồ minh hoạ | Nguồn | TT |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | Vì sao gân xanh trên tay màu xanh mà máu lại đỏ? | Máu trong tĩnh mạch màu xanh. → Bị xước tay ở đâu thì máu chảy ra cũng đỏ. | Máu luôn màu đỏ; tĩnh mạch trông xanh vì cách ánh sáng đi qua da rồi dội lại mắt mình. | ① Ánh sáng nhiều màu chiếu vào da<br>② Ánh đỏ đi sâu hơn vào da<br>③ Ánh xanh chỉ vào nông và phần lớn dội ngược ra<br>④ Mắt thấy tĩnh mạch hơi xanh, dù máu bên trong vẫn đỏ sẫm | [Ask A Biologist (Arizona State Univ.) – Do humans have blue blood?](https://askabiologist.asu.edu/questions/is-blood-blue)<br>[West Texas A&M (C. Baird) – Why are veins blue?](https://www.wtamu.edu/~cbaird/sq/2012/12/18/why-are-veins-blue/) | ✅ |
| B2 | Vì sao ngâm nước lâu thì ngón tay nhăn nheo? | Da hút nước nên nhăn. → Nếu hút nước thì ngón tay phải phồng tròn; người bị tổn thương dây thần kinh ở tay thì ngâm nước không nhăn. | Nhăn là do hệ thần kinh ra lệnh cho mạch máu ở đầu ngón tay co lại. | ① Tay ngâm nước một lúc<br>② Dây thần kinh ra lệnh mạch máu đầu ngón co lại<br>③ Đầu ngón bớt "đầy" đi<br>④ Da nhăn lại như quả nho thành nho khô | [West Texas A&M (C. Baird) – Why do my fingers… become wrinkled?](https://www.wtamu.edu/~cbaird/sq/2015/02/18/why-do-my-fingers-absorb-water-and-become-wrinkled/)<br>[Binghamton University News – fingers wrinkle the same way](https://www.binghamton.edu/news/story/5547/do-your-fingers-wrinkle-the-same-way-every-time-youre-in-the-water-too-long-new-research-says-yes)<br>[UTMB Medical Discovery News – Why Do We Prune in Water?](https://www.utmb.edu/mdnews/welcome/episode/why-do-we-prune-in-water) | ✅ |
| B3 | Vì sao mình bị nấc cụt? | Tiếng "hức" phát ra từ bụng. → Tiếng "hức" phát ra ở cổ họng, nơi có dây thanh. | Cơ hoành dưới phổi giật một cái kéo không khí vào thật nhanh, dây thanh đóng sập lại thành tiếng "hức". | ① Cơ hoành (dưới phổi) bị kích thích, ví dụ do ăn quá nhanh<br>② Cơ hoành giật xuống → hít vào thật nhanh<br>③ Dây thanh đóng sập lại để chặn hơi<br>④ "Hức!" | [Ask Dr. Universe (WSU) – Why do we get hiccups?](https://askdruniverse.wsu.edu/2022/03/25/why-do-we-get-hiccups/)<br>[Cleveland Clinic – Hiccups](https://my.clevelandclinic.org/health/diseases/17672-hiccups) | ✅ |
| B4 | Vì sao ăn kem nhanh lại bị buốt đầu? | Não bị lạnh cóng. → Cơn buốt đến từ vòm miệng, và hết sau vài chục giây. | Đồ lạnh chạm vòm miệng làm mạch máu ở đó đổi kích thước rất nhanh, dây thần kinh báo đau và mình cảm thấy đau ở đầu. | ① Kem lạnh chạm vòm miệng<br>② Mạch máu ở vòm miệng thay đổi kích thước rất nhanh<br>③ Dây thần kinh báo "đau!"<br>④ Não cảm thấy cơn đau ở trán, rồi hết nhanh | [Harvard Health – What causes brain freeze?](https://www.health.harvard.edu/diseases-and-conditions/what-causes-brain-freeze)<br>[Virginia Tech News – Neuroscientist explains brain freeze](https://news.vt.edu/articles/2023/05/Brain_freeze_expert.html) | ✅ |
| B5 | Vì sao mình không tự cù mình được? | Tại mình "không có máu buồn". → Cũng người đó, để người khác cù thì vẫn nhột. | Não đoán trước cú cù của chính tay mình nên giảm cảm giác nhột. | ① Tay mình chuẩn bị cù<br>② Não (tiểu não) đoán trước cảm giác sắp tới<br>③ Cảm giác thật khớp với dự đoán → não giảm cảm giác<br>④ Không bất ngờ → không nhột | [Ask Dr. Universe (WSU) – Why can't we tickle ourselves?](https://askdruniverse.wsu.edu/2024/10/31/why-cant-we-tickle-ourselves/)<br>[Neuroscience for Kids (Univ. of Washington) – Tickling](https://faculty.washington.edu/chudler/funny.html) | ✅ |
| B6 | Vì sao bụng sôi ọc ọc? | Bụng kêu vì trong bụng trống rỗng, không có gì. → Thật ra trong ruột luôn có nước và khí đang được đẩy đi. | Cơ ruột bóp đẩy nước và khí đi nên phát ra tiếng; lúc đói bụng rỗng, không có gì giảm tiếng nên kêu to hơn. | ① Cơ ở ruột bóp, đẩy nước và khí đi<br>② Nước và khí chuyển động phát ra tiếng<br>③ Lúc đói, cơ thể tiết hormone báo "chuẩn bị có đồ ăn", ruột bóp mạnh hơn<br>④ Bụng rỗng nên tiếng to hơn | [Ask Dr. Universe (WSU) – Why does my tummy rumble?](https://askdruniverse.wsu.edu/2025/10/16/tummy-rumble-im-hungry/)<br>[Pitt Med – Tween Science: Hangry?](https://www.pittmed.pitt.edu/news/real-tween-kids-science-summer-hangry-pitt-med) *(chỉ xác nhận phần hormone ghrelin và tên gọi borborygmi)* | ⚠️ |
| B7 | Hắt xì hơi thì tim có ngừng đập không? | Mỗi lần hắt xì tim ngừng đập một nhịp. → Tim không ngừng; áp lực trong ngực chỉ làm nhịp tim đổi một chút. | Tim không ngừng khi hắt xì, chỉ có nhịp tim thay đổi rất ngắn nên mình tưởng tim "hẫng" một nhịp. | ① Hắt xì làm áp lực trong ngực thay đổi nhanh<br>② Nhịp tim đổi một chút<br>③ Mình cảm thấy như "hẫng" một nhịp<br>④ Tim vẫn đập tiếp | [Cleveland Clinic – Does your heart stop when you sneeze?](https://health.clevelandclinic.org/does-your-heart-stop-when-you-sneeze)<br>*Nguồn thứ hai (Library of Congress, UCSB ScienceLine, Northwell) chặn truy cập tự động* | ❌ |

**Lưu ý khi viết:**

- **B1:** không vẽ kim tiêm hay máu chảy. Dùng hình đèn pin chiếu qua da. Nên thêm câu ASU nói rõ: với một số màu da, tĩnh mạch trông xanh rõ hơn.
- **B3:** đừng gợi ý "doạ cho giật mình để hết nấc", vì trẻ dễ bắt chước doạ bạn.
- **B4:** các nguồn mô tả khác nhau chuyện mạch máu co hay giãn. Chỉ nói "thay đổi kích thước rất nhanh". Nếu muốn khuyên "ăn chậm" thì cần kiểm tra lại trong nguồn trước khi đưa vào.
- **B6 và B7:** cần tìm thêm nguồn trước khi làm tập.

### 3.4. Cây cối và trái cây (hạng 4) — 7/7 ✅

| # | Câu hỏi | Hiểu lầm → bằng chứng | Trả lời một câu | Sơ đồ minh hoạ | Nguồn | TT |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Vì sao lá cây màu xanh? | Lá xanh vì cây cần và dùng ánh sáng màu xanh. → Ngược lại: màu xanh chính là phần ánh sáng cây không dùng. | Chất diệp lục hút ánh đỏ và xanh dương để làm thức ăn, còn ánh xanh lá thì dội lại mắt mình. | ① Ánh nắng có đủ các màu<br>② Diệp lục hút ánh đỏ và xanh dương để làm thức ăn<br>③ Ánh xanh lá không dùng nên bị dội lại<br>④ Mắt thấy lá màu xanh | [John Innes Centre – Why are plants green?](https://jic.ac.uk/blog/why-are-plants-green/)<br>[University of Minnesota – Inside Leaves](https://open.lib.umn.edu/horticulture/chapter/5-1-inside-leaves/) | ✅ |
| C2 | Vì sao lá cây chuyển vàng rồi rụng? | Trời lạnh hay sương giá "sơn" lá thành vàng. → Màu vàng cam đã có sẵn trong lá từ mùa hè; sương giá sớm còn làm màu đỏ kém đẹp đi. | Khi ngày ngắn lại, chất diệp lục xanh bị phân huỷ, để lộ ra màu vàng cam vốn có sẵn trong lá. | ① Lá có diệp lục xanh và sắc tố vàng cam<br>② Mùa hè diệp lục nhiều, che mất màu vàng<br>③ Ngày ngắn lại, lá ngừng làm thức ăn, diệp lục phân huỷ<br>④ Màu vàng cam lộ ra; màu đỏ là sắc tố mới làm vào mùa thu | [SUNY ESF – Why Leaves Change Color](https://www.esf.edu/eis/eis-leaves-color-change.php)<br>[Ask A Biologist (ASU) – Why do leaves change color?](https://askabiologist.asu.edu/questions/why-do-leaves-change-color) | ✅ |
| C3 | Cây to như thế là lớn lên từ đâu ra? | Cây "ăn đất" để lớn. → Thí nghiệm cây liễu trồng chậu: cây nặng thêm rất nhiều mà đất trong chậu hao rất ít. | Phần lớn thân cây được làm từ khí cacbonic lấy trong không khí, cộng với nước và năng lượng ánh nắng. | ① Lá hút khí cacbonic từ không khí<br>② Rễ hút nước từ đất<br>③ Ánh nắng giúp lá ghép chúng thành đường, rồi thành gỗ, lá, rễ<br>④ Đất chủ yếu giữ cây đứng vững và cho một ít khoáng | [Ask A Biologist (ASU) – The Recipe for Plant Growth](https://askabiologist.asu.edu/recipe-plant-growth)<br>[CSU Northridge – Plant Mass](http://www.csun.edu/scied/2-longitudinal/plant_mass/index.htm) | ✅ |
| C4 | Vì sao hoa hướng dương quay theo Mặt Trời? | Hoa hướng dương lúc nào cũng xoay theo Mặt Trời. → Hoa đã nở to thì đứng yên, luôn quay về hướng đông. | Chỉ cây hướng dương non mới xoay theo Mặt Trời nhờ "đồng hồ" bên trong; hoa đã lớn thì quay cố định về hướng đông. | ① Sáng: cây non hướng về phía đông<br>② Ban ngày: ngọn nghiêng dần theo Mặt Trời sang tây<br>③ Ban đêm: quay ngược về đông chờ bình minh<br>④ Khi nở hoa: đứng yên quay về đông, sáng sớm ấm nhanh nên nhiều côn trùng đến thụ phấn | [Cambridge University Botanic Garden – Sunflower](https://www.botanic.cam.ac.uk/learning/trails/plant-rhythms/sunflower/)<br>[Takács et al. 2022, Frontiers in Plant Science (PMC) – Mature Sunflower Inflorescences Face Geographical East](https://pmc.ncbi.nlm.nih.gov/articles/PMC8969559/) | ✅ |
| C5 | Vì sao thân cây chuối bóc ra từng lớp mà không có gỗ? | Cây chuối là cây thân gỗ như cây xoài. → "Thân" chuối bóc ra được từng lớp bẹ lá; cây gỗ thì không bóc được như vậy. | Cây chuối là cây thân thảo khổng lồ; "thân" của nó là các bẹ lá cuộn chặt vào nhau. | ① Lá chuối mọc ra từ gốc<br>② Phần bẹ của lá cuộn chặt quanh nhau<br>③ Nhiều lớp bẹ chồng lên thành "thân giả" cao to<br>④ Bóc ra thì thấy từng lớp, không có gỗ | [Oxford Botanic Garden & Herbaria – Plants 400: Musa textilis](https://herbaria.plants.ox.ac.uk/bol/plants400/Profiles/MN/Musatext)<br>[NC State Extension – Musa acuminata](https://plants.ces.ncsu.edu/plants/musa-acuminata/) | ✅ |
| C6 | Vì sao cà chua là quả mà người ta nấu như rau? | Cà chua là rau. → Cà chua có hạt bên trong và mọc ra từ bông hoa, giống quả táo hay quả dưa hấu. | Theo cách nhà khoa học xếp loại cây, cà chua là quả vì mọc từ hoa và chứa hạt; trong bếp người ta nấu nó như rau. | ① Cây cà chua ra hoa<br>② Hoa phát triển thành quả<br>③ Trong quả có hạt → là quả<br>④ Đầu bếp nấu nó trong món mặn nên gọi là rau | [Iowa State Extension – Is a tomato a fruit or a vegetable?](https://yardandgarden.extension.iastate.edu/faq/tomato-fruit-or-vegetable)<br>[University of Maine Extension – Fruit or Vegetable?](https://extension.umaine.edu/food-health/2024/04/15/fruit-or-vegetable/) | ✅ |
| C7 | Vì sao xương rồng có gai? | Gai là để đâm người, còn xương rồng thì không có lá. → Gai chính là lá đã biến đổi. | Gai xương rồng là lá biến thành, giúp cây giữ nước trong sa mạc: che bóng, chắn gió khô và chống bị ăn. | ① Lá to làm cây mất nhiều nước<br>② Xương rồng có lá biến thành gai rất nhỏ<br>③ Gai che bóng, chắn gió khô cho thân<br>④ Thân xanh làm nhiệm vụ của lá: làm thức ăn | [Duke Gardens – Five Ways Plants Adapt To Heat](https://gardens.duke.edu/garden-talk/five-ways-plants-adapt-to-heat/)<br>[National Park Service – Cacti (Arches)](https://www.nps.gov/arch/learn/nature/cacti.htm) | ✅ |

**Câu dự phòng:**

| # | Câu hỏi | Hiểu lầm | Trả lời một câu | Nguồn | TT |
| --- | --- | --- | --- | --- | --- |
| C8 | Vì sao cây xấu hổ cụp lá khi bị chạm? | Cây biết xấu hổ hay sợ hãi. | Khi bị chạm, tế bào ở gốc lá mất nước rất nhanh nên lá cụp xuống. | [Oxford Plants 400 – Mimosa pudica](https://herbaria.plants.ox.ac.uk/bol/plants400/Profiles/MN/Mimosa)<br>[Notre Dame – The plant that hates to be touched](https://sites.nd.edu/biomechanics-in-the-wild/2021/04/07/the-plant-that-hates-to-be-touched/) *(blog môn học, nguồn phụ)* | ✅ |

**Lưu ý khi viết:**

- **C2:** ở Việt Nam có thể minh hoạ bằng lá bàng. Nhưng nguồn nói về cây ôn đới, nên không khẳng định cơ chế riêng cho cây bàng.
- **C5:** không nói "chuối là cỏ". Nguồn nói "cây thân thảo" (herbaceous), không phải họ cỏ.
- **C7:** có cảnh báo "không sờ gai".

### 3.5. Nước quanh ta (hạng 5) — 7/7 ✅

| # | Câu hỏi | Hiểu lầm → bằng chứng | Trả lời một câu | Sơ đồ minh hoạ | Nguồn | TT |
| --- | --- | --- | --- | --- | --- | --- |
| N1 | Vì sao cục đá lại nổi trên nước? | Vật rắn thì nặng hơn chất lỏng, đá nổi chỉ vì có bọt khí bên trong. → Hầu hết các chất khi đông lại thì đặc hơn và chìm; nước thì ngược lại. | Khi đông thành đá, nước nở ra, các phân tử xếp thưa hơn nên đá nhẹ hơn lượng nước choán cùng chỗ. | ① Phân tử nước lỏng chen chúc nhau<br>② Khi đông, chúng nắm tay nhau thành khung có nhiều khoảng trống<br>③ Cùng lượng nước nhưng đá chiếm nhiều chỗ hơn<br>④ Đá nhẹ hơn nước cùng thể tích → nổi; ao hồ đóng băng từ mặt trên | [Lunar and Planetary Institute – All About Water and Ice](https://www.lpi.usra.edu/education/explore/ice/background/allAboutWater/)<br>[Univ. of Alaska Fairbanks Geophysical Institute – Freezing of Water](https://www.gi.alaska.edu/alaska-science-forum/freezing-water) | ✅ |
| N2 | Vì sao cốc nước đá lại "đổ mồ hôi"? | Nước thấm qua thành cốc ra ngoài. → Gần miệng cốc, phía trên mặt nước, cũng không thấy giọt nước rỉ qua. | Hơi nước vô hình trong không khí chạm vào thành cốc lạnh thì đọng lại thành giọt. | ① Không khí luôn có hơi nước vô hình<br>② Không khí chạm cốc lạnh thì bị lạnh đi<br>③ Hơi nước đọng lại thành giọt nhỏ<br>④ Trời càng ẩm, cốc càng "đổ mồ hôi" | [NOAA JetStream – Sweatin' to the Coldies](https://www.noaa.gov/jetstream/ll-sweatin)<br>[Ohio State Univ. – Beyond Penguins: Common Misconceptions](https://beyondpenguins.ehe.osu.edu/issue/water-ice-and-snow/common-misconceptions-about-states-and-changes-of-matter-and-the-water-cycle)<br>[TERC Inquiry Project – Condensation Concept Cartoon](https://inquiryproject.terc.edu/curriculum/curriculum5/concept_cartoon/condensation/index.html) | ✅ |
| N3 | Nước sông ngọt chảy ra biển, vì sao biển lại mặn? | Nước sông không có tí muối nào, muối có sẵn trong biển từ đầu. → Nước sông cũng có một ít muối, chỉ là rất ít nên mình không nếm ra. | Mưa hoà tan một ít muối từ đá trên đất liền, sông mang ra biển; nước biển bốc hơi nhưng muối ở lại nên tích dần. | ① Mưa rơi xuống đá, hoà tan một chút muối<br>② Sông suối mang muối ra biển<br>③ Nước biển bốc hơi thành mây, muối ở lại<br>④ Rất rất lâu → biển mặn | [NOAA Ocean Service – Why is the ocean salty?](https://oceanservice.noaa.gov/facts/whysalty.html)<br>[Woods Hole Oceanographic Institution – What makes the ocean salty?](https://www.whoi.edu/ocean-learning-hub/ocean-facts/what-makes-the-ocean-salty/)<br>[Ask Dr. Universe (WSU) – Oceans: Why are they salty?](https://askdruniverse.wsu.edu/2016/04/18/oceans-why-are-they-salty/) | ✅ |
| N4 | Vì sao nước biển màu xanh? | Biển xanh vì soi bóng bầu trời. → Illinois Physics Van gọi thẳng đây là "hiểu lầm phổ biến": màu xanh đến từ chính nước. *(Cần chọn thêm một bằng chứng dễ thấy có trong nguồn.)* | Nước hút bớt ánh đỏ, cam, vàng của nắng, còn lại ánh xanh dội về mắt mình. | ① Ánh nắng có đủ màu đi vào nước biển<br>② Nước hút ánh đỏ, cam, vàng<br>③ Ánh xanh còn lại bị tán xạ, dội ra<br>④ Mắt thấy biển xanh | [NOAA Ocean Service – Why is the ocean blue?](https://oceanservice.noaa.gov/facts/oceanblue.html)<br>[Illinois Physics Van – Why the Ocean is Blue](https://van.physics.illinois.edu/ask/listing/22358)<br>[Scripps Institution of Oceanography (UCSD) – Why is the ocean blue?](https://scripps.ucsd.edu/news/voyager-why-ocean-blue) | ✅ |
| N5 | Vì sao biển có sóng? | Sóng là nước từ ngoài khơi chạy ào vào bờ. → NOAA: nước không đi theo sóng; sóng chỉ mang năng lượng đi. | Gió thổi trên mặt biển tạo ra sóng; sóng truyền năng lượng đi rất xa, còn nước chủ yếu nhấp nhô tại chỗ. | ① Gió thổi, cọ vào mặt nước<br>② Mặt nước gợn lên thành sóng<br>③ Gió càng mạnh, thổi càng lâu thì sóng càng to<br>④ Sóng chuyển năng lượng vào bờ, nước thì nhấp nhô | [NOAA Ocean Service – What causes ocean waves?](https://oceanservice.noaa.gov/facts/wavesinocean.html)<br>[NOAA JetStream – Ocean Waves](https://www.noaa.gov/jetstream/ocean/waves) | ✅ |
| N6 | Vũng nước sau mưa biến đi đâu mất? | Nước biến mất, hoặc thấm hết xuống đất. → Bát nước để ngoài trời cũng vơi dần, dù bát không thấm nước. | Nước bốc hơi thành hơi nước vô hình bay vào không khí, không hề biến mất. | ① Nắng và gió làm nước ấm lên<br>② Từng chút nước tách ra thành hơi nước<br>③ Hơi nước quá nhỏ, quá thưa nên không nhìn thấy<br>④ Vũng nước nhỏ dần rồi khô | [TERC Inquiry Project – Evaporation Concept Cartoon](https://inquiryproject.terc.edu/curriculum/curriculum5/concept_cartoon/evaporation/index.html)<br>[Ohio State Univ. – Beyond Penguins: Common Misconceptions](https://beyondpenguins.ehe.osu.edu/issue/water-ice-and-snow/common-misconceptions-about-states-and-changes-of-matter-and-the-water-cycle) | ✅ |
| N7 | Tàu bằng sắt nặng thế sao không chìm? | Vật nặng thì chìm. → Cái tô thả vào chậu nước thì nổi, cái tàu thật nặng hơn rất nhiều cũng nổi. | Tàu có rất nhiều khoảng không khí bên trong, nên nhẹ hơn lượng nước choán cùng chỗ, và nước đẩy nó nổi lên. | ① Tàu đè xuống, đẩy nước sang hai bên<br>② Nước bị đẩy thì đẩy ngược tàu lên<br>③ Tàu rỗng, nhiều không khí, nên nhẹ hơn khối nước cùng thể tích<br>④ Lực đẩy thắng → tàu nổi; cục sắt đặc thì chìm | [Illinois Physics Van – Why do Ships Float?](https://van.physics.illinois.edu/ask/listing/2174)<br>[Michigan State Univ. Open Books – Archimedes' Principle](https://openbooks.lib.msu.edu/collegephysics1/chapter/archimedes-principle-2/) | ✅ |

**Lưu ý khi viết:**

- **N4:** liên quan tập "bầu trời xanh" của tuần 1. Có thể nhắc lại một câu: "khác với bầu trời…". Nhưng không nói "biển xanh hoàn toàn không liên quan bầu trời", vì phản chiếu có góp một phần nhỏ.
- **N5:** không nhắc thuỷ triều hay sóng thần, vì sóng thần là chủ đề đáng sợ.
- **N6:** gần với chủ đề mưa của tuần 1. Nên xếp cách tuần 1 vài tuần.
- **N7:** thí nghiệm thả bát vào chậu cần người lớn đi cùng. Không cho trẻ chơi gần ao hồ.

### 3.6. Căn bếp nhà mình (hạng 6) — 5/7 đủ nguồn

| # | Câu hỏi | Hiểu lầm → bằng chứng | Trả lời một câu | Sơ đồ minh hoạ | Nguồn | TT |
| --- | --- | --- | --- | --- | --- | --- |
| K1 | Vì sao thái hành lại cay mắt? | Mùi hăng của hành làm cay mắt. → Củ hành để nguyên chưa cắt thì không làm ai chảy nước mắt; chỉ khi cắt mới sinh ra chất gây cay. | Thái hành làm vỡ tế bào, tạo ra một chất khí bay lên mắt, và mắt tiết nước mắt để rửa nó đi. | ① Dao làm vỡ tế bào củ hành<br>② Enzyme biến chất có lưu huỳnh thành một chất khí<br>③ Khí bay lên, chạm vào mắt<br>④ Dây thần kinh ở mắt báo → chảy nước mắt | [Ask Dr. Universe (WSU) – Onions: Why do they make us cry?](https://askdruniverse.wsu.edu/2016/08/22/onions-make-us-cry/)<br>[Univ. of Illinois Extension – Preparing Onions](https://extension.illinois.edu/gardening/preparing-onions)<br>[Smithsonian Magazine – Cut onions without crying](https://www.smithsonianmag.com/smart-news/whats-the-best-way-to-cut-onions-without-crying-new-research-suggests-that-thin-sharp-blades-are-key-to-minimizing-tears-180986650/) | ✅ |
| K2 | Vì sao táo cắt ra để lâu bị thâm? | Táo thâm là táo bị hỏng, bẩn, không ăn được. → Táo vừa cắt vẫn trắng, chỉ chỗ mặt cắt để ngoài không khí mới thâm; táo thâm vẫn ăn được. | Cắt táo làm enzyme trong tế bào gặp ôxy ngoài không khí, tạo ra chất màu nâu. | ① Dao cắt vỡ tế bào táo<br>② Enzyme bên trong tràn ra mặt cắt<br>③ Enzyme cùng ôxy trong không khí biến đổi các chất trong táo<br>④ Sinh ra chất màu nâu | [UW–Madison News – Why do apple slices turn brown?](https://news.wisc.edu/curiosities-why-do-apple-slices-turn-brown/)<br>[Tufts Health & Nutrition Letter – Why do sliced fruits turn brown?](https://www.nutritionletter.tufts.edu/ask-experts/q-why-do-sliced-fruits-turn-brown-when-sitting-for-a-period-of-time-at-room-temperature-is-it-safe-to-eat-brown-fruit/) | ✅ |
| K3 | Vì sao bột bánh mì lại phồng lên? | Bột phồng vì mình nhào không khí vào. → Thí nghiệm của Exploratorium: men nở trong chai nước đường tự làm quả bóng bay trên miệng chai phồng lên, không cần ai nhào. | Men nở (một loại nấm rất nhỏ) ăn đường trong bột và thải ra khí CO₂, khí bị giữ lại thành bong bóng làm bột phồng lên. | ① Men nở ăn đường trong bột<br>② Men thải ra khí CO₂<br>③ Khí bị giữ lại trong bột thành hàng nghìn bong bóng nhỏ<br>④ Bột phồng to như quả bóng bay | [Exploratorium – Yeast-Air Balloons](https://www.exploratorium.edu/explore/cooking/activity/yeast-air-balloons)<br>[Colorado State Univ. SOURCE – the yeast around us](https://source.colostate.edu/what-every-new-baker-should-know-about-the-yeast-all-around-us/)<br>[Ask Dr. Universe (WSU) – Why does bread expand in the oven?](https://askdruniverse.wsu.edu/2026/04/30/bread-expand-oven/) | ✅ |
| K4 | Nước sôi thì bong bóng ở đâu ra? | Bong bóng là không khí. → Đại học Ohio State xếp ý này vào danh sách hiểu lầm hay gặp ở học sinh: bong bóng khi sôi là hơi nước. | Bong bóng to khi nước sôi là hơi nước, tức nước đã biến thành khí ngay trong nồi. | ① Đáy nồi nóng nhất<br>② Nước ở đáy biến thành hơi<br>③ Hơi nước gom thành bong bóng, nổi lên<br>④ Lên tới mặt nước thì vỡ, hơi bay ra | [Ohio State Univ. – Beyond Penguins: Common Misconceptions](https://beyondpenguins.ehe.osu.edu/issue/water-ice-and-snow/common-misconceptions-about-states-and-changes-of-matter-and-the-water-cycle)<br>[Univ. of Maryland – Boiling, Atmospheric Pressure, and Vapor Pressure](https://terpconnect.umd.edu/~wbreslyn/chemistry/pressure/index-pressure.html)<br>[Illinois Physics Van – What is in the Bubbles When Water Boils?](https://van.physics.illinois.edu/ask/listing/29573) | ✅ |
| K5 | Vì sao hạt ngô nổ thành bỏng? | Trong hạt ngô có không khí, nóng lên thì nổ. → Hạt ngô bị khô quá thì không nổ được; muốn nổ phải còn đủ nước. | Nước trong hạt ngô bị đun nóng thành hơi, đẩy lớp vỏ cứng cho tới khi vỡ tung. | ① Trong hạt ngô có một ít nước<br>② Đun nóng: nước thành hơi nước<br>③ Vỏ cứng giữ hơi lại, áp lực tăng dần<br>④ Vỏ vỡ "bụp", ruột phồng ra thành bỏng | [Univ. of Illinois Extension – What makes popcorn pop?](https://extension.illinois.edu/blogs/ilriverhort/2017-10-06-enjoy-locally-grown-popcorn-spoon-river-drive)<br>[MIT Angles – Edible Magic](http://cmsw.mit.edu/angles/2016/edible-magic/) *(bài viết sinh viên MIT, nguồn phụ)* | ✅ |
| K6 | Vì sao nước ngọt có ga sủi bọt khi mở nắp? | Bọt là không khí lọt vào chai. | Khí CO₂ được nén vào nước ở áp suất cao; mở nắp thì áp suất giảm, khí thoát ra thành bọt. | ① Nhà máy nén khí CO₂ vào nước<br>② Nắp kín giữ áp suất cao, khí tan trong nước<br>③ Mở nắp: áp suất giảm<br>④ Khí thoát ra thành bong bóng | [Ask Dr. Universe (WSU) – Soda: Why does it fizz?](https://askdruniverse.wsu.edu/2016/05/09/soda-why-does-it-fizz/)<br>*Nguồn thứ hai (Open University, UCSB ScienceLine, Univ. of Arkansas) chặn truy cập hoặc đã chuyển trang* | ❌ |
| K7 | Vì sao để chuối cạnh trái cây khác thì chúng chín nhanh hơn? | Trái cây chín chỉ do để lâu hay do nắng. | Chuối nhả ra một chất khí (ethylene) làm trái cây ở gần chín nhanh hơn. | ① Chuối chín nhả khí ethylene<br>② Khí lan sang trái cây bên cạnh<br>③ Khí "ra hiệu" cho trái cây bắt đầu chín<br>④ Để riêng thì chín chậm hơn | [Univ. of Nebraska–Lincoln Food – Prolonging the life of bananas](https://food.unl.edu/article/prolonging-life-bananas/)<br>*Nguồn thứ hai (Clemson HGIC, UT Austin) chặn truy cập* | ❌ |

**Lưu ý khi viết:**

- **Cả chủ đề:** mỗi tập có thẻ "Người lớn cầm dao / đun bếp, bé chỉ quan sát".
- **K1:** một nguồn (Illinois Extension) nói khí biến thành axit sunfuric trong mắt, nhưng chưa có nguồn độc lập xác nhận. Không đưa ý này vào.
- **K4:** bong bóng nhỏ lúc mới đun là không khí hoà tan. Nói rõ là bong bóng to khi đã sôi mới là hơi nước.
- **K5:** dầu nóng và nồi nóng. Thêm ghi chú cho phụ huynh: bỏng ngô dễ gây hóc với trẻ nhỏ.
- **K6 và K7:** cần thêm nguồn thứ hai. Có thể thay bằng câu khác nếu không tìm được.

---

## 4. Câu dự phòng (chưa đưa vào tuần)

| Câu hỏi | Hiểu lầm | Trạng thái nguồn | Ghi chú |
| --- | --- | --- | --- |
| Mặt Trời thật ra màu gì? | Mặt Trời màu vàng. | ✅ [Stanford Solar Center](https://solar-center.stanford.edu/activities/SunColor/GreenSun.html)<br>✅ [NASA APOD – All the Colors of the Sun](https://science.nasa.gov/image-article/apod-2015-june-28-all-the-colors-of-the-sun/) | Twist hay (Mặt Trời màu trắng), nhưng **trẻ có thể nhìn thẳng Mặt Trời để kiểm tra**. Chỉ làm nếu có cảnh báo rõ "không bao giờ nhìn thẳng Mặt Trời" và không dùng câu "con thử nhìn xem". |
| Vì sao Mặt Trăng cứ đi theo mình khi ngồi ô tô? | Mặt Trăng đuổi theo mình. | ❌ Chỉ có [Caltech Cool Cosmos](https://coolcosmos.ipac.caltech.edu/ask/177-Why-does-the-Moon-follow-me-when-I-move-) | Câu trẻ rất hay hỏi. Cần thêm một nguồn. |
| Vì sao tắc kè hoa đổi màu? | Chỉ để ngụy trang. | ❌ Chỉ có [National Geographic](https://www.nationalgeographic.com/animals/article/chameleon-camouflage-color-change-myth-news) | Khoa học có nhiều sắc thái: tắc kè hoa vẫn ngụy trang được một phần. Dễ nói sai. |
| Vì sao rắn thè lưỡi? | Lưỡi rắn để đốt hay chích. | ❌ Chỉ có [UConn Today](https://today.uconn.edu/2021/06/smelling-in-stereo-the-real-reason-snakes-have-flicking-forked-tongues/) (NHM chặn) | Rắn có thể làm trẻ sợ. |
| Vì sao quay vòng vòng xong bị chóng mặt? | Não bị lắc. | ❌ Nguồn mở được chỉ nói chung về dịch tai trong | Trẻ dễ bắt chước quay rồi ngã (xem mục 5). |

---

## 5. Câu NÊN TRÁNH và lý do

| Câu hỏi | Lý do tránh |
| --- | --- |
| Vì sao cắt tóc, cắt móng tay không đau? | **Dễ bắt chước nguy hiểm**: trẻ tự cầm kéo cắt tóc, cắt móng. |
| Vì sao quay vòng vòng thì chóng mặt? | **Dễ bắt chước**: trẻ quay để "thử" rồi ngã. Thiếu nguồn mở được. |
| Vì sao mèo rơi luôn tiếp đất bằng bốn chân? | **Dễ bắt chước**: trẻ thả mèo từ trên cao để thử. |
| Vì sao bò tót lao vào tấm vải đỏ? | Gắn với đấu bò (**bạo lực với động vật**). |
| Mặt Trời màu gì / vì sao không nhìn được Mặt Trời? | **Nguy cơ hỏng mắt** nếu trẻ thử nhìn. Chỉ làm khi có cảnh báo mạnh (xem mục 4). |
| Vì sao nam châm hút sắt? (dùng viên nam châm nhỏ) | **Nguy cơ nuốt nam châm nhỏ**, rất nguy hiểm. Nếu làm, chỉ vẽ nam châm to gắn tủ lạnh. |
| Coca + Mentos, "núi lửa" giấm và baking soda | **Dễ bắt chước** gây bắn và bẩn; có thể bắn vào mắt. |
| Vì sao ăn ớt thấy nóng? | Trẻ dễ thử ăn ớt cay. Nguồn cho trẻ hiếm (chủ yếu tài liệu chuyên ngành). |
| Vì sao khủng long tuyệt chủng? | **Đáng sợ** (cái chết hàng loạt, thiên thạch). Giả thuyết vẫn tranh luận. |
| Lỗ đen là gì, có hút Trái Đất không? | **Đáng sợ**, khó đơn giản hoá mà không sai. |
| Vì sao người già tóc bạc rồi mất? / Em bé từ đâu ra? | **Chủ đề nhạy cảm** (cái chết, giới tính). Thuộc trách nhiệm của phụ huynh. |
| Vì sao cá mập cắn người / rắn có nọc độc? | **Đáng sợ**, liên quan thương tích. |
| Vì sao mình ngáp, vì sao ngáp lây? | **Khoa học chưa ngã ngũ**, dễ nói sai. |
| Vì sao hươu cao cổ cổ dài? | **Còn tranh cãi** giữa các giả thuyết (ăn lá cao hay đánh nhau). |
| Cá vàng chỉ nhớ được 3 giây? | Bác bỏ thì hay, nhưng chưa tìm được nguồn uy tín mở được. **Dễ sai.** |
| Hắt xì có làm tim ngừng? (B7) | Tạm giữ vì thiếu nguồn. Ý "tim ngừng đập" có thể làm trẻ nhạy cảm lo lắng, nên mở đầu bằng câu trấn an. |

**Nguyên tắc chung:**

- Tránh mọi câu mà câu trả lời gợi trẻ "thử làm" với dao, lửa, nước sôi, độ cao, mắt nhìn Mặt Trời hay động vật thật.
- Với câu khoa học còn tranh luận (ngựa vằn, tắc kè hoa, buốt óc), chỉ nói phần các nguồn thống nhất, và dùng "các nhà khoa học cho rằng".

---

## 6. Các trang đã thử nhưng không dùng được (để lần sau khỏi thử lại)

| Trang | Tình trạng khi kiểm tra (10/11/2026) |
| --- | --- |
| Library of Congress – Everyday Mysteries (loc.gov) | 403, Cloudflare chặn cả curl và công cụ web |
| Britannica và Britannica Kids | 403 |
| KidsHealth (kidshealth.org/en/kids/…) | 200 nhưng nội dung tải bằng JavaScript, không đọc được |
| USGS Water Science School / FAQ | 202, trang thử thách chống bot |
| Natural History Museum London (nhm.ac.uk/discover) | 403 |
| Kew (kew.org, powo.science.kew.org) | 403 |
| UCSB ScienceLine (scienceline.ucsb.edu) | Hết thời gian chờ |
| UC Davis News (ucdavis.edu/news) | 403 |
| Smithsonian (si.edu/stories, ssec.si.edu, scienceinprek.si.edu) | 403. Riêng nationalzoo.si.edu thì vào được |
| Open University (open.edu), Northwell, Columbia Go Ask Alice, Clemson HGIC | 403 |
| Wonderopolis | Hết thời gian chờ |

Các trang trên có thể vẫn mở bình thường trên trình duyệt. Nếu người làm kịch bản mở được bằng tay và thấy đúng nội dung, có thể thêm làm nguồn thứ hai cho các câu ⚠️ và ❌, nhất là Library of Congress cho câu B7 (hắt xì).
