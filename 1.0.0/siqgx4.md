# Overview

- Phần lớn các cuộc tấn công vào ứng dụng web đều liên quan đến việc gửi dữ liệu đầu vào được "chế tạo" để gây ra các sự kiện mà nhà thiết kế ứng dụng không dự đoán hoặc không mong muốn
- có một khoảng cách rất lớn giữa việc tạo ra mã chạy được và mã an toàn.
- Nhiều ứng dụng web được tạo ra bởi những người có ý tốt nhưng đơn giản là thiếu kiến thức và kinh nghiệm để nhận biết được những điểm mà vấn đề bảo mật có thể phát sinh.
- Công Nghệ Bị Khai Thác Quá Mức
    - Nhiều công nghệ cốt lõi được sử dụng trong các ứng dụng web ngày nay được phát triển từ thời điểm mà bối cảnh của World Wide Web còn rất khác. 
    - Kể từ đó, chúng đã bị đẩy đi quá xa khỏi mục đích ban đầu, ví dụ như việc sử dụng JavaScript làm phương thức truyền dữ liệu trong nhiều ứng dụng dựa trên AJAX. 
    - Khi kỳ vọng về chức năng của ứng dụng web tăng lên nhanh chóng, thì các công nghệ dùng để hiện thực những chức năng đó lại không bắt kịp, buộc phải kéo giãn và thích nghi với yêu cầu mới. 
    - Không có gì ngạc nhiên khi điều này dẫn đến các lỗ hổng bảo mật xuất hiện do những hệ quả không lường trước.
- 
    ```sql
    input: ' OR 1=1-- 
    pass: (bỏ trống)
    ```
    ```sql
    SELECT * FROM users WHERE username = '' OR 1=1--' AND password = ''
    ```
- Việc chống lại các loại tấn công khác nhau có thể yêu cầu các kiểm tra mâu thuẫn nhau. Ví dụ:
    - Ngăn XSS thì cần mã hóa ký tự > thành &gt;
    - Ngăn Command Injection thì phải chặn ký tự như & hoặc ; → Không thể xử lý tất cả các loại tấn công chỉ tại một nơi duy nhất.
- Ví dụ về lọc không đệ quy
    - Ví dụ, để chống lại một số cuộc tấn công cross-site scripting (XSS), ứng dụng có thể cố gắng loại bỏ biểu thức: `<script>`
    - Tuy nhiên, kẻ tấn công có thể vượt qua bộ lọc này bằng cách gửi đầu vào như sau: `<scr<script>ipt>`
- Audit Logs: Sau một vụ việc, (Audit Logs) nhật ký kiểm tra hiệu quả phải có khả năng giúp chủ sở hữu ứng dụng hiểu rõ:
    - Chính xác điều gì đã xảy ra
    - Những lỗ hổng nào (nếu có) đã bị khai thác
    - Liệu kẻ tấn công có truy cập trái phép vào dữ liệu hay thực hiện hành động không được phép hay không
    - Và trong mức độ có thể, xác định được danh tính của kẻ tấn công
- Những sự kiện bất thường thường được theo dõi bao gồm:
    - *Bất thường trong hành vi sử dụng*, ví dụ như một lượng lớn yêu cầu từ cùng một IP hoặc người dùng, dấu hiệu của tấn công tự động (scripted attack).
    - *Bất thường trong nghiệp vụ*, như số lượng chuyển tiền bất thường từ hoặc đến một tài khoản.
    - *Yêu cầu chứa chuỗi tấn công* đã biết.
    - *Yêu cầu có dữ liệu bị chỉnh sửa mà đáng ra không thể sửa*, như các trường ẩn.
- HTTP
    - Phương thức GET được thiết kế để truy xuất tài nguyên
    - Phương thức POST được thiết kế để thực hiện các hành động
- Định dạng chung của URL: `protocol://hostname[:port]/[path/]file[?param=value]`
- REST: Mặc dù các URL chứa tham số trong chuỗi truy vấn (query string) đã tuân thủ các ràng buộc của REST, nhưng thuật ngữ "REST-style URL" thường được sử dụng để chỉ một URL chứa các tham số trong đường dẫn của URL thay vì trong chuỗi truy vấn
    - `http://wahh-app.com/search?make=ford&model=pinto`
    - `http://wahh-app.com/search/ford/pinto`
- HTTPS về cơ bản là cùng một giao thức lớp ứng dụng như HTTP nhưng được truyền qua một cơ chế bảo mật, đó là SSL (Secure Sockets Layer)
    - SSL đã bị thay thế hoàn toàn bởi TLS (Transport Layer Security), nhưng thuật ngữ TLS vẫn thường được gọi theo tên cũ là SSL.  
- **URL Encoding** được sử dụng để mã hóa bất kỳ ký tự nào gây vấn đề trong tập mở rộng ASCII để có thể truyền tải an toàn qua HTTP
    - `%3d` — dấu bằng =
    - `%25` — dấu phần trăm %
    - `%20` or `+` — dấu cách
    - `%0a` — dòng mới (new line)
    - `%00` — byte null
- **Unicode Encoding**
    - `%u2215` — dấu gạch chéo /
    - `%u00e9` — ký tự é
    - Trong bối cảnh tấn công ứng dụng web, mã hóa Unicode đặc biệt đáng quan tâm vì nó đôi khi có thể được sử dụng để vượt qua các cơ chế kiểm tra đầu vào
- **HTML Encoding**
    - &quot; — dấu ngoặc kép ",
    - &apos; — dấu nháy đơn ',
    - &amp; — dấu &,
    - &lt; — dấu <,
    - &gt; — dấu >.
    - Khi bạn đang kiểm tra lỗ hổng XSS (cross-site scripting), mối quan tâm chính với mã hóa HTML là xem ứng dụng có mã hóa dữ liệu đầu vào từ người dùng không 
- **Base64 Encoding**
    - Dữ liệu đầu vào được chia thành các khối 3 byte.
    - Mỗi khối chia thành 4 đoạn, mỗi đoạn có 6 bit.
    - 6 bit = 64 tổ hợp → mỗi đoạn có thể biểu diễn bằng 1 trong 64 ký tự.
    - Bảng ký tự Base64 bao gồm: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`

## Lập bản đồ ứng dụng
    - Duyệt web thủ công và spidering có định hướng người dùng để liệt kê nội dung và chức năng hiển thị của ứng dụng.
    - Sử dụng brute-force kết hợp với suy luận và trực giác con người để khám phá nội dung ẩn càng nhiều càng tốt.
    - Phân tích thông minh ứng dụng để xác định các chức năng chính, hành vi, cơ chế bảo mật, và công nghệ được sử dụng.
    - Đánh giá bề mặt tấn công của ứng dụng, làm nổi bật những chức năng và hành vi có tiềm năng nhất để kiểm tra lỗ hổng sâu hơn.

## Bypassing Client-Side Controls

- Thông thường, các lập trình viên của ứng dụng giả định rằng cơ chế truyền dữ liệu sẽ đảm bảo dữ liệu không bị sửa đổi trong quá trình truyền qua client.
    - mọi dữ liệu được gửi từ client tới server đều nằm trong sự kiểm soát của người dùng, vì vậy giả định rằng dữ liệu sẽ không bị thay đổi là sai lầm và thường khiến ứng dụng dễ bị khai thác tấn công.
- Nếu client không giao tiếp với server để quyết định kết quả, ứng dụng này chắc chắn có lỗ hổng.

# Attack application

- Nếu bạn có thể giải mã token phiên, dù điều này không cho phép bạn xâm nhập ngay vào phiên của người dùng khác, nhưng bạn có thể hiểu được cấu trúc rõ ràng của token. Điều này rất hữu ích khi thực hiện tấn công bit-flipping để thay đổi nội dung của token và thay đổi người dùng mục tiêu.
- 
