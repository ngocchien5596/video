# Bảng minh hoạ (sơ đồ)

Sơ đồ hiện trong khung trắng ở nửa trên màn hình, đổi bước theo lời Cụ Đồ. Dùng trong phần diễn (`stage`) qua kênh `board`:

```ts
{ line: 0, at: 0.45, board: { id: "sky-blue", step: 1 } }   // hiện / đổi bước
{ line: 0, board: null }                                       // cất bảng
```

Mã nguồn sơ đồ: `projects/vi-sao/src/boards/`. Thêm sơ đồ mới thì tạo file trong thư mục đó, đăng ký id trong `boards/index.ts` và ghi vào bảng dưới.

## Danh sách

### `sky-blue`: Vì sao bầu trời màu xanh

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Mặt trời chiếu một tia nắng trắng | "Ánh nắng trông màu trắng" |
| 1 | Tia nắng hoá thành dải bảy màu | "gồm đủ các màu cầu vồng" |
| 2 | Hiện nhiều hạt khí li ti | "đi qua vô số hạt khí li ti" |
| 3 | Mũi tên xanh bắn ra mọi hướng từ hạt khí; đỏ, cam, vàng đi thẳng | "ánh sáng xanh bị hắt văng ra khắp nơi" |
| 4 | Nền chuyển xanh, ánh xanh từ nhiều hướng vào mắt | "nhìn chỗ nào trên trời cũng gặp ánh sáng xanh" |

### `sunset`: Vì sao hoàng hôn lại đỏ cam

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Mặt trời trên cao, mũi tên ngắn xuyên lớp không khí | "Buổi trưa… nắng chỉ đi một quãng ngắn" |
| 1 | Mặt trời sát chân trời, mũi tên dài | "Buổi chiều… nắng phải đi một quãng rất dài" |
| 2 | Mũi tên xanh bị hắt khỏi đường đi | "màu xanh bị các hạt khí hắt văng đi hết" |
| 3 | Lớp không khí ngả cam, chữ "ĐỎ, CAM!" ở mắt | "Chỉ còn màu đỏ, màu cam tới được mắt" |

### `clouds`: Vì sao mây trắng mà mây mưa lại đen

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Đám mây + kính lúp thấy giọt nước li ti | "Mây là vô số giọt nước li ti" |
| 1 | Nắng vào mây, bung ra đủ màu như nhau | "hắt đều mọi màu… mây trông trắng" |
| 2 | Mũi tên hắt lên trên, sang hai bên; đáy mây xám | "xuống tới đáy mây thì còn rất ít" |
| 3 | Giọt trong kính lúp to ra, đáy mây tối hơn, có mưa | "Mây mưa có giọt nước to hơn… đáy mây càng tối" |

### `rain`: Mưa từ đâu ra

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Hơi nước (nét đứt, "vô hình") bốc lên từ biển | "nước bốc hơi thành hơi nước bay lên" |
| 1 | Mây hình thành trên cao, chấm li ti | "biến thành giọt nước li ti… tạo thành mây" |
| 2 | Chấm trong mây to dần | "các giọt nước nhập vào nhau, to dần" |
| 3 | Giọt mưa rơi xuống đồi, mũi tên chảy về biển | "rơi xuống thành mưa, rồi lại chảy về sông, biển" |

### `rainbow`: Vì sao có cầu vồng sau mưa

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Mặt trời sau lưng bé, mưa phía trước | "mặt trời phải ở sau lưng mình, còn mưa ở phía trước" |
| 1 | Giọt mưa phóng to, tia nắng bẻ cong tách 3 màu | "bị bẻ cong, tách ra thành nhiều màu" |
| 2 | Tia màu dội mặt sau giọt rồi đi về phía mắt | "dội vào mặt sau giọt nước, rồi đi ra" |
| 3 | Vòng cung cầu vồng hiện phía trước | "mình thấy một vòng cung nhiều màu" |

### `thunder`: Vì sao thấy chớp trước rồi mới nghe sấm

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Tia chớp, vòng không khí nóng nở ra | "làm không khí quanh nó nở bung ra" |
| 1 | Chữ "ẦM!", nhãn "CHỚP + SẤM: CÙNG LÚC" | "tạo ra tiếng nổ ầm ầm, đó chính là sấm" |
| 2 | Mũi tên ánh sáng bay ngay tới mắt | "bay tới mắt mình gần như ngay lập tức" |
| 3 | Sóng âm tím đi chậm tới tai | "tiếng sấm đi chậm hơn nhiều" |

### `night`: Vì sao ban đêm trời tối

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Mặt trời chiếu Trái Đất (nửa sáng, nửa tối), mũi tên quay | "Trái Đất… luôn tự quay" |
| 1 | Lá cờ "MÌNH" quay đủ một vòng | "Mỗi ngày, Trái Đất quay đủ một vòng" |
| 2 | Cờ ở phía sáng, nhãn "NGÀY" | "quay về phía mặt trời… ban ngày" |
| 3 | Cờ quay sang phía tối, nhãn "ĐÊM" | "quay sang phía bên kia… ban đêm" |
