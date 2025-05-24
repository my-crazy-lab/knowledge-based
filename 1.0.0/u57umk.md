# Understanding LLMs

- LLM không đọc từng chữ cái đơn lẻ
- tách thành một chuỗi các phần nhỏ gồm nhiều chữ cái gọi là token
- Các token này thường dài ba đến bốn ký tự, nhưng cũng có những token dài hơn cho các từ hoặc chuỗi ký tự phổ biến.
- LLM thường khá kiên cường với lỗi chính tả vì chúng đã quen với những lỗi này trong tập dữ liệu huấn luyện.
- LLM không thể chậm lại và xem xét từng chữ cái
- Bên trong, LLM không trực tiếp biến văn bản thành văn bản, cũng không trực tiếp biến token thành token. Thực tế, nó lấy nhiều token đầu vào để tạo ra một token đầu ra duy nhất. 
- Mô hình liên tục thực hiện thao tác này để dự đoán token tiếp theo, tích lũy các token đơn lẻ này cho đến khi tạo ra một đoạn văn bản phù hợp.
- **Mô hình Tự hồi quy (Auto-Regressive Models)**: Mỗi lượt chạy qua LLM sẽ cho bạn token tiếp theo có xác suất cao nhất. Sau đó token này được ghép vào prompt, và LLM lại thực hiện một lượt nữa để dự đoán token tiếp theo dựa trên prompt mới, cứ thế tiếp tục
- khả năng nhận biết lỗi và quay lại sửa lỗi phải do người thiết kế ứng dụng — chính bạn — cung cấp.
- LLM rất giỏi nhận dạng mẫu, nên đôi khi (do tình cờ) tạo ra một mẫu và không thể tìm điểm dừng hợp lý để thoát khỏi nó.
- Mô hình thường trả về chúng dưới dạng logprobs (tức là, logarit tự nhiên của xác suất của token). Logprob càng cao, mô hình càng coi token này là có khả năng xảy ra cao hơn.

## Transformer

- là hàng ngàn "minibrain". Tất cả đều giống nhau về cấu trúc, và mỗi cái thực hiện một nhiệm vụ rất tương tự
- Thực tế, các minibrain là bản sao của nhau: logic xử lý của chúng là giống nhau, và tất cả những gì khác biệt chỉ là các đầu vào: token mà chúng bắt đầu và các kết quả trung gian mà chúng nhận được từ các minibrain ở bên trái
- “các kết quả trung gian” được chia sẻ giữa các minibrains. Cách mà chúng được chia sẻ được gọi là cơ chế chú ý - đây là sự đổi mới quan trọng của kiến trúc transformer cho các LLM. Chú ý là một cách để truyền thông tin giữa các minibrains.
- cách mà nó hoạt động
    1. Mỗi minibrain có một số điều mà nó muốn biết, vì vậy nó gửi một vài câu hỏi, với hy vọng chúng có thể được một minibrain khác trả lời
    2. Mỗi minibrain có một số thông tin mà nó có thể chia sẻ, vì vậy nó gửi một vài mục với hy vọng rằng chúng có thể hữu ích cho một minibrain khác
    3. Mỗi câu hỏi được ghép nối với câu trả lời phù hợp nhất
    4. Câu trả lời phù hợp nhất cho mỗi câu hỏi được tiết lộ cho minibrain đã đặt câu hỏi. Thông tin chỉ chảy từ trái sang phải. Thông tin chỉ chảy từ dưới lên trên. Trong các LLM hiện đại, cơ chế Q&A này tuân theo một ràng buộc nữa, được gọi là masking: không phải tất cả các minibrain đều có thể trả lời một câu hỏi; chỉ có những minibrain ở bên trái của minibrain đặt câu hỏi mới có thể trả lời. Và một minibrain không bao giờ được thông báo liệu câu trả lời của nó có được sử dụng hay không, vì vậy các minibrain bên phải không bao giờ có thể ảnh hưởng đến các minibrain bên trái. 
    > Sự song song cho phép tăng tốc độ, nhưng cách tính toán theo hình tam giác này sẽ bị gián đoạn khi mô hình chuyển từ việc đọc lời nhắc (prompt) sang việc tạo ra phần hoàn thành (completion). Mô hình phải chờ cho đến khi một token được xử lý hoàn toàn trước khi chọn token tiếp theo và tính toán trạng thái đầu tiên của "minibrain" mới. Đây là lý do tại sao LLMs nhanh hơn rất nhiều trong việc đọc qua một lời nhắc dài so với việc tạo ra một phần hoàn thành dài. 
- chỉ đọc qua văn bản một lần và không thể nhìn lại.
- Vì vậy, trong khi các "minibrains" đang xử lý đoạn văn một lần duy nhất, họ không biết rằng đặc điểm quan trọng mà họ nên tách biệt là số lượng từ, vì yêu cầu đó xuất hiện dưới văn bản của chương. Họ đang bận rộn xem xét các ý nghĩa ngữ nghĩa, tông và phong cách, cùng với vô vàn đặc điểm bề ngoài, và không dành sự chú ý đầy đủ cho điều duy nhất mà cuối cùng sẽ quan trọng. Đó là lý do tại sao thứ tự là rất quan trọng trong việc thiết kế yêu cầu - nó có thể dễ dàng tạo ra sự khác biệt giữa một yêu cầu hoạt động và một yêu cầu thất bại

# Chat & Complete

- Khi mô hình được điều chỉnh mạnh cho vai trò trợ lý ảo, nó có thể mất dần hiệu quả ở những tác vụ khác.
- Nhiều mô hình LLM không công bố rõ dữ liệu huấn luyện, để tránh bị khai thác (ví dụ: jailbreak).
Nhưng bạn vẫn có thể hỏi trực tiếp mô hình về loại tài liệu mà nó quen thuộc.
- 