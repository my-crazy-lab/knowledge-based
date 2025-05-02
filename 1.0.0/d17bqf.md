# History

- **Local Multiplayer Games**
    - được thiết kế để hai hoặc nhiều người chơi cùng chơi trên một máy tính
- Trò chơi nhiều người chơi qua mạng thời kỳ đầu
    - Những trò chơi nhiều người chơi qua mạng đầu tiên được chạy trên các mạng nhỏ gồm các máy tính trung tâm (mainframe). 
    - Điều phân biệt trò chơi nhiều người chơi qua mạng với trò chơi nhiều người chơi cục bộ là việc có hai hoặc nhiều máy tính kết nối với nhau trong một phiên chơi đang diễn ra
- ![This is a screenshot](/images/Figure11.png)  
    - **Platform Packet Module** 
        - Một “packet” là một tập dữ liệu định dạng được gửi qua mạng.
        - Trong mô hình Tribes, mô-đun này là lớp thấp nhất và là lớp duy nhất phụ thuộc vào nền tảng cụ thể
        - Về bản chất, đây là một lớp bao cho các API socket tiêu chuẩn, có khả năng xây dựng và gửi nhiều định dạng gói dữ liệu khác nhau
    - **Connection Manager**
        - trừu tượng hóa kết nối giữa hai máy tính qua mạng
        - Tầng này vẫn chưa đảm bảo độ tin cậy, nghĩa là không cam kết dữ liệu gửi đi sẽ được nhận
        - Tuy nhiên, nó đảm bảo thông báo trạng thái truyền dữ liệu, tức là có thể xác minh được yêu cầu gửi đi có thành công hay không
        - Việc xác nhận này được thực hiện bằng một cửa sổ trượt sử dụng trường bit để đánh dấu các gói đã được xác nhận
    - **Stream Manager**
        - gửi dữ liệu đến connection manager
        - xác định tốc độ truyền dữ liệu tối đa cho phép, phụ thuộc vào chất lượng kết nối Internet.
    - **Event Manager**
        - duy trì một hàng đợi các sự kiện do mô phỏng trong game tạo ra
        - Các sự kiện này có thể được coi như RPC
    - **Ghost Manager**
        - là hệ thống quan trọng nhất để hỗ trợ lên đến 128 người chơi.
        - Nhiệm vụ chính của nó là "bóng ma hóa" (ghost) các đối tượng động – tức là sao chép thông tin trạng thái đối tượng từ máy chủ đến client, nhưng chỉ những đối tượng liên quan đến client.
        - Có hai mức độ ưu tiên:
            - "Cần biết" (need to know): ưu tiên cao nhất.
            - "Nên biết" (should know): ưu tiên thấp hơn.
        - Ghost manager phải đảm bảo rằng dữ liệu mới nhất luôn được gửi đi, vì thông tin như máu, đạn, vũ khí phải luôn được cập nhật chính xác.
    - **Move Manager**
        - chịu trách nhiệm gửi dữ liệu di chuyển của người chơi càng nhanh càng tốt.
        - Move manager có mức ưu tiên cao nhất, và khi có dữ liệu, stream manager sẽ luôn chèn nó vào gói tin trước.
        - Mỗi client chịu trách nhiệm gửi thông tin di chuyển của mình đến máy chủ, sau đó máy chủ sẽ mô phỏng lại chuyển động và gửi xác nhận trở lại cho client.
    - **Datablock manager**: xử lý việc truyền tải các đối tượng tĩnh hơn như trụ pháo (turret) – những đối tượng không thường xuyên thay đổi vị trí nhưng vẫn quan trọng để tương tác.
- Trong khi đó, Age of Empires (1997) sử dụng mô hình deterministic lockstep. 
    - Các máy kết nối peer-to-peer và thay vì gửi thông tin đơn vị, chỉ gửi các lệnh điều khiển. Các máy sẽ tự mô phỏng dựa trên các lệnh đó.
    - Để đồng bộ, hệ thống dùng bộ đếm lượt để gom lệnh trong một khoảng thời gian (ví dụ 200ms) rồi gửi đi. Các lệnh chỉ được thực hiện sau 2 lượt, đảm bảo mọi máy có đủ thời gian nhận lệnh.
    - Cuối cùng, để đảm bảo tính xác định, các yếu tố như trình tạo số ngẫu nhiên (PRNG) cũng phải được đồng bộ seed và số lần gọi trên mọi máy.

# Network (5 layers for game ecosystem)

 ![This is a screenshot](/images/Figure23.png)  

- **The Physical Layer**
    - cung cấp một kết nối vật lý giữa các máy tính trong mạng (hoặc "host")
    -  Cáp xoắn đôi Cat 6, dây điện thoại, cáp đồng trục và cáp quang đều là các ví dụ về phương tiện vật lý có thể cung cấp kết nối mà lớp vật lý yêu cầu.
    - Lưu ý rằng kết nối vật lý không nhất thiết phải là hữu hình. Như bất kỳ ai dùng điện thoại di động, máy tính bảng hay máy tính xách tay đều biết, sóng vô tuyến cũng là một phương tiện vật lý hoàn toàn hợp lệ để truyền thông tin.
- **The Link Layer**
    - Nhiệm vụ của nó là cung cấp phương thức giao tiếp giữa các host được kết nối vật lý với nhau. 
    - Điều này có nghĩa là lớp liên kết phải cung cấp một cách để host nguồn đóng gói thông tin và truyền qua lớp vật lý sao cho host đích có thể nhận và giải mã được thông tin.
    - đơn vị truyền tải là frame (khung). Các host sử dụng lớp liên kết để gửi các frame cho nhau
    - nhiệm vụ của lớp liên kết bao gồm:
        - Xác định cách một host có thể được định danh để frame có thể gửi đúng đích;
        - Xác định định dạng của frame bao gồm địa chỉ đích và dữ liệu cần gửi;
        - Xác định kích thước tối đa của một frame để các lớp cao hơn biết lượng dữ liệu có thể gửi trong một lần;
        - Xác định cách để chuyển đổi một frame thành tín hiệu điện tử có thể gửi qua lớp vật lý và có khả năng được nhận bởi host đích.
    - nhiều yếu tố ảnh hưởng đến việc tín hiệu điện tử thực sự có đến được đích mà không bị hỏng hay không. Sự gián đoạn trong phương tiện vật lý, nhiễu điện, hoặc lỗi thiết bị đều có thể khiến frame bị mất và không bao giờ đến nơi. 
    - Lớp liên kết không đảm bảo kiểm tra hay gửi lại dữ liệu nếu bị lỗi. Vì lý do này, giao tiếp ở lớp liên kết được gọi là không đáng tin cậy.
- **The Network Layer**
    - lớp liên kết có một số hạn chế cần phải có một lớp cao hơn để giải quyết:
        - cần một hệ thống địa chỉ có thể cấu hình dễ dàng nằm trên địa chỉ MAC.
        - Lớp liên kết không hỗ trợ chia nhỏ Internet thành các mạng khu vực cục bộ
        - Lớp liên kết không hỗ trợ giao tiếp giữa các host sử dụng các giao thức lớp liên kết khác nhau.
    - Nhiệm vụ của lớp mạng là cung cấp một cơ sở hạ tầng địa chỉ logic trên lớp liên kết, để phần cứng của host có thể được thay thế dễ dàng, các nhóm host có thể được phân tách thành các mạng con, và các host trên các mạng con xa, sử dụng các giao thức lớp liên kết khác nhau và các phương tiện vật lý khác nhau có thể gửi tin nhắn cho nhau.
- **The Transport Layer**
    - Trong khi công việc của lớp mạng là tạo điều kiện cho việc giao tiếp giữa các host ở các mạng từ xa, công việc của lớp vận chuyển là cho phép giao tiếp giữa các tiến trình riêng lẻ trên các host đó.
    - Vì có thể có nhiều tiến trình đang chạy trên một host duy nhất, việc chỉ biết rằng Host A đã gửi một gói tin IP đến Host B là chưa đủ: Khi Host B nhận gói tin IP, nó cần biết tiến trình nào sẽ nhận nội dung gói tin để xử lý tiếp. Để giải quyết vấn đề này, lớp vận chuyển giới thiệu khái niệm *cổng*
    - tất cả các cổng đều là số 16 bit
    - cổng từ 1024 đến 49151 được gọi là cổng người dùng hoặc cổng đã đăng ký
    - Cổng từ 0 đến 1023 được gọi là cổng hệ thống hoặc cổng dự trữ. 
        - hầu hết các hệ điều hành chỉ cho phép các tiến trình cấp root gắn vào các cổng hệ thống
        - yêu cầu mức độ bảo mật cao hơn.
    - các cổng từ 49152 đến 65535 được gọi là cổng động.
- Ở đỉnh tầng là **The Application Layer**, nơi chứa các giao thức như DHCP, DNS, và cả mã trò chơi của bạn.

# Latency

- ít nhất năm nguồn độ trễ khác, một số trong đó không thuộc quyền kiểm soát của bạn
    - Độ trễ lấy mẫu đầu vào
    - Độ trễ trong pipeline render
    - Độ trễ trong pipeline render đa luồng
    - VSync
        - Để tránh hiện tượng xé hình, việc thay đổi hình ảnh hiển thị trên thẻ đồ họa chỉ xảy ra trong khoảng thời gian vertical blanking interval của màn hình là một thực tiễn phổ biến. 
        - Cách này giúp màn hình không hiển thị một phần của một khung hình và một phần của khung hình tiếp theo cùng lúc. 
    - Độ trễ hiển thị
    - Thời gian phản hồi của pixel

## Network Latency

- bốn loại độ trễ chính
    - Độ trễ xử lý: Thời gian dành cho việc kiểm tra địa chỉ nguồn và xác định tuyến đường phù hợp
    - Độ trễ truyền tải: Thời gian dành cho việc ghi các bit vào phương tiện vật lý 
    - Độ trễ xếp hàng: Thời gian dành cho việc kiểm tra địa chỉ nguồn và xác định tuyến đường phù hợp
    - Độ trễ lan truyền: bất kể phương tiện vật lý là gì, thông tin không thể di chuyển nhanh hơn tốc độ ánh sáng