# Câu hỏi nghiên cứu sâu về Audacity

## 1. Kiến trúc tổng thể của Audacity
- Tại sao Audacity không có kiến trúc tổng thể rõ ràng? Điều này ảnh hưởng thế nào đến việc phát triển và mở rộng phần mềm?
- Các chiến lược để cải thiện cấu trúc mã trong các dự án mã nguồn mở lớn như Audacity là gì?

## 2. Các thư viện quan trọng
- PortAudio hoạt động thế nào? Làm sao nó cung cấp giao diện âm thanh đa nền tảng?
- wxWidgets so với các thư viện GUI khác như Qt hoặc GTK+ có ưu nhược điểm gì?
- LADSPA và VAMP API là gì? Chúng hoạt động ra sao trong hệ thống plugin của Audacity?

## 3. Quản lý plugin và ảnh hưởng bản quyền
- Giới hạn bản quyền đã ảnh hưởng thế nào đến việc tích hợp các thư viện như FFTW hay plugin VST?
- Audacity xử lý việc tải các thư viện bên ngoài (dynamic loading) như thế nào?

## 4. Vấn đề đa kênh âm thanh
- Giải pháp tổng quát cho hỗ trợ nhiều kênh âm thanh (surround sound) trong phần mềm xử lý âm thanh là gì?
- Iterator hoạt động như thế nào và tại sao nó là lựa chọn tốt hơn cho việc duyệt kênh âm thanh?

## 5. Quản lý tài nguyên và bảo mật
- Tại sao Audacity quyết định không hỗ trợ kết nối TCP/IP? Những rủi ro bảo mật nào có thể phát sinh nếu không làm vậy?
- Những kỹ thuật khác để tăng cường bảo mật trong phần mềm xử lý âm thanh là gì?

## 6. Thiết kế giao diện người dùng với wxWidgets
- Làm thế nào wxWidgets đảm bảo giao diện đa nền tảng có trải nghiệm đồng nhất?
- Sizers hoạt động như thế nào để tự động điều chỉnh bố cục giao diện?
- Những khó khăn thường gặp khi thiết kế giao diện với wxWidgets là gì?

## 7. Tối ưu hóa và quản lý mã GUI
- Các phương pháp hay nhất để quản lý mã GUI tránh lặp lại và khó bảo trì?
- Tại sao biên dịch dialog vào mã thay vì dùng file resource có thể mang lại lợi ích?

## Câu hỏi về ShuttleGui Layer
1. ShuttleGui là gì và nó giúp giải quyết vấn đề gì trong code?  
2. Vai trò chính của lớp ShuttleGui là gì?  
3. Trong đoạn ví dụ về ShuttleGui, các lệnh `StartStatic` và `EndStatic` dùng để làm gì?  
4. Tại sao trong code lại sử dụng cặp dấu ngoặc nhọn và indent mặc dù không bắt buộc?  
5. Code sau comment "// GUI Structure" có nhiệm vụ gì ngoài việc tạo giao diện?  
6. Vì sao Audacity không sử dụng lớp toolbar có sẵn của wxWidgets?  

## Câu hỏi về TrackPanel
7. TrackPanel trong Audacity có chức năng gì?  
8. Các thành phần cấu thành nên TrackPanel bao gồm những gì?  
9. Tại sao các panel, track và thước đo trong TrackPanel không phải là các thành phần wxWidgets riêng biệt?  
10. Theo đoạn văn, điểm yếu của thiết kế TrackPanel hiện tại là gì?  
11. Tại sao việc sử dụng sizers của wxWidgets cho TrackPanel lại chưa khả thi?  
12. Những vấn đề gặp phải khi chuyển GUI components thành wxWidgets components là gì?  
13. Vì sao wxWidgets chậm khi có nhiều widget?  
14. Giải pháp được đề xuất để cải thiện TrackPanel là gì?  
15. Tại sao ý tưởng refactor TrackPanel vẫn chưa được thực hiện?  

## Câu hỏi về thư viện PortAudio
16. PortAudio cung cấp chức năng gì cho Audacity?  
17. PortAudio giúp Audacity giải quyết vấn đề gì khi làm việc trên nhiều hệ điều hành?  
18. Quá trình gửi và nhận dữ liệu âm thanh trong Audacity diễn ra như thế nào?  
19. Có bao nhiêu thread chính tham gia xử lý âm thanh trong Audacity và nhiệm vụ của từng thread là gì?  
20. Tại sao thread của PortAudio phải rất nhanh nhạy?  
21. Thread thứ hai do lớp AudioIO tạo ra đảm nhiệm những công việc gì?  
22. Tại sao không thể thực hiện việc đọc/ghi đĩa trong callback của PortAudio?  
23. Cách hai thread giao tiếp với nhau như thế nào để tránh sử dụng mutex đắt tiền?  
24. Tần suất cập nhật GUI của Audacity là bao nhiêu lần mỗi giây và tại sao nó được thực hiện như vậy?  
25. Theo bạn, thiết kế với ba thread riêng biệt như vậy có phải là thiết kế tốt không? Tại sao?  
26. Vì sao Audacity phải chấp nhận copy dữ liệu nhiều lần trong bộ nhớ thay vì dùng con trỏ buffer?  

## Câu hỏi phần 2.6 - BlockFiles

1. Thách thức lớn khi Audacity hỗ trợ chèn và xóa trong các bản ghi âm dài là gì?  
2. Tại sao việc chèn âm thanh vào đầu một tệp duy nhất trên đĩa lại gây mất thời gian và ảnh hưởng đến hiệu suất?  
3. Audacity giải quyết vấn đề này bằng cách nào?  
4. BlockFiles trong Audacity thường có kích thước khoảng bao nhiêu?  
5. File chính của Audacity có đuôi mở rộng là gì và nó chứa gì?  
6. Lợi ích của việc chia âm thanh thành nhiều BlockFiles là gì?  
7. Kích thước BlockFiles ảnh hưởng thế nào đến số lần truy cập đĩa và việc sao chép khi chèn/xóa?  
8. BlockFiles có khoảng trống nội bộ không? Và điều gì xảy ra khi chèn hoặc xóa dữ liệu?  
9. Cơ chế đếm tham chiếu (reference counting) trong BlockFiles hoạt động ra sao?  
10. Tại sao Audacity không cần thu gom rác (garbage collection) trong BlockFiles?  
11. BlockFiles còn được dùng để làm gì ngoài việc lưu trữ âm thanh?  
12. Audacity xử lý bản ghi dài khi hiển thị trên màn hình bằng cách nào?  
13. BlockFiles có thể tham chiếu đến các đoạn con của tệp âm thanh ngoài Audacity không?  
14. Tại sao việc người dùng xóa tệp .wav gốc lại là một vấn đề?  
15. Vấn đề của BlockFiles trên hệ điều hành Windows là gì và cách giải quyết?  
16. Tại sao việc người dùng di chuyển tệp .aup mà quên di chuyển thư mục BlockFiles lại gây ra lỗi?  
17. Đề xuất nào được nêu ra để cải thiện cấu trúc dự án Audacity?

## Câu hỏi phần 2.7 - Scripting

1. Audacity hỗ trợ scripting qua giao diện nào?  
2. Các lệnh và phản hồi trong scripting được truyền theo định dạng nào?  
3. Điều kiện gì để một ngôn ngữ scripting có thể điều khiển Audacity?  
4. Plugin scripting trong Audacity có chức năng gì và nó xử lý dữ liệu như thế nào?  
5. Rủi ro bảo mật khi dùng plugin scripting là gì?  
6. Plugin scripting được phân phối dưới dạng nào và người dùng cần làm gì để sử dụng?  
7. Đề xuất nào được đưa ra trên wiki để cải thiện giao tiếp giữa các tiến trình?  
8. Tính năng scripting bắt nguồn từ dự án nào và có tên gọi gì?  
9. CleanSpeech cung cấp những tính năng gì?  
10. Tại sao CleanSpeech được tích hợp lại thành batch chains trong Audacity?  
11. Batch chains hoạt động như thế nào và tại sao không thêm điều kiện hoặc phép tính?  
12. Có những lợi ích gì khi tránh tạo phiên bản phân nhánh riêng biệt (fork) của Audacity?  
13. Cách nào được dùng để ẩn các mục menu nhằm tạo giao diện đơn giản hơn?  
14. Tính năng scripting và batch chains đã mở đường cho điều gì trong Audacity?

## Câu hỏi phần 2.8 - Real-Time Effects

1. Audacity có hỗ trợ hiệu ứng âm thanh thời gian thực không?  
2. Người dùng Audacity thường yêu cầu gì về hiệu ứng thời gian thực?  
3. Thách thức khi triển khai hiệu ứng thời gian thực trên nhiều loại máy là gì?  
4. Giải pháp dự phòng cho máy tính yếu trong việc xử lý hiệu ứng là gì?  
5. Những giới hạn hiện tại của Audacity cần được loại bỏ để hỗ trợ hiệu ứng thời gian thực là gì?  
6. Tính năng “on demand loading” hoạt động như thế nào?  
7. Tại sao on demand loading được coi là bước tiến quan trọng để hỗ trợ hiệu ứng thời gian thực?  
8. Các hiệu ứng thời gian thực cần thêm những đặc điểm gì để hoạt động chính xác (ví dụ như hiệu ứng echo)?  
9. Làm thế nào để các tham số hiệu ứng có thể thay đổi khi âm thanh đang phát?  
10. Việc triển khai on demand loading trước giúp ích gì cho quá trình phát triển hiệu ứng thời gian thực?
