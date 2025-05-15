# Vocabulary

- The rise of Cloud computing
- Large Product Assortment

# Overview

- Elasticity refers to the ability to increase or decrease resources arbitrarily.
- Provisioning refers to the ability to acquire new hardware or software resources
- While elasticity refers to the ability to increase or decrease resources arbitrarily, on
demand refers to the ability to provision at any time
- Metered: Another central tenet of the cloud is the ability to pay for what you use.
- Deployment Models
    - Public cloud 
    - Private cloud
    - Hybrid cloud
- Dù người dùng nói họ muốn nhiều tính năng hơn, nhưng thực tế cho thấy họ đánh giá cao hiệu suất hơn, hoặc ít nhất là quan tâm ngang bằng.
- Một số nhà cung cấp bị ảnh hưởng nặng vì họ phục vụ cùng một ngành:
    - Vào những ngày này, lưu lượng có thể tăng gấp hàng trăm lần so với trung bình.
    - Thêm nữa, CDN chỉ có vài điểm máy chủ (endpoints) tại mỗi quốc gia, nên sự kiện lớn như El Buen Fin có thể khiến toàn bộ hạ tầng tại Mexico bị quá tải.
- Nếu bạn muốn xử lý các đợt tăng đột biến (spike) trong lưu lượng, chi phí xây dựng sẵn toàn bộ hạ tầng chỉ để sử dụng vài lần trong năm là cực kỳ cao so với việc dùng cloud.

# CDN

## Throttling

- Ví dụ, nếu bạn triển khai 500 máy chủ và mỗi máy chủ có thể phục vụ 10.000 người dùng đồng thời, bạn sẽ biết rằng hệ thống của bạn không thể xử lý quá 5.000.000 người dùng cùng lúc. Trong trường hợp đó, việc cho phép thêm người dùng truy cập vào hệ thống là vô ích vì bạn biết chắc rằng nó sẽ không hoạt động.
- CDN mang lại khả năng giới hạn lưu lượng (throttling), cho phép người dùng thứ 5.000.001 được chuyển hướng đến một “phòng chờ” ảo
    - Tối thiểu, những phòng chờ này sẽ cung cấp các thông báo hữu ích về tình hình hiện tại, kèm theo ước tính thời gian truy cập lại được.
- Ngoài việc ánh xạ tên miền về địa chỉ IP, DNS còn có thể được sử dụng để gán người dùng đến trung tâm dữ liệu phù hợp
    - **Global Server Load Balancing (GSLB)**: vận hành trên nhiều trung tâm dữ liệu, bạn cần có cách để phân chia người dùng về đúng nơi
- Không nhất thiết, nhưng rất thường xuyên, các nhà cung cấp CDN cũng cung cấp dịch vụ DNS — đặc biệt là DNS hiệu suất cao và có khả năng cân bằng tải toàn cầu (GSLB).

# Security

## PCI DSS

> Tiêu chuẩn bảo mật dữ liệu ngành thẻ thanh toán (Payment Card Industry Data Security Standard – PCI DSS)

- là một sáng kiến hợp tác giữa các tổ chức thẻ lớn như Visa, MasterCard, Discover, American Express và JCB, nhằm đưa ra một tiêu chuẩn thống nhất cho tất cả các đơn vị chấp nhận thanh toán thẻ.
- định nghĩa của PCI, “đơn vị chấp nhận thanh toán” là bất kỳ tổ chức nào xử lý thông tin thẻ tín dụng hoặc thông tin nhận dạng cá nhân (PII) liên quan đến thẻ tín dụng.

## ISO 27001

>  mô tả một mô hình hệ thống quản lý an ninh thông tin (Information Security Management System – ISMS), được công bố lần đầu vào năm 2005 bởi Tổ chức Tiêu chuẩn hóa Quốc tế (ISO).

- để công khai tuyên bố rằng mình tuân thủ, bạn phải được bên thứ ba được ISO công nhận kiểm toán và xác nhận.

## FedRAMP

> được thiết kế riêng để đảm bảo bảo mật cho dịch vụ điện toán đám mây được chính phủ Mỹ sử dụng. (Tương đương tại Anh là G-Cloud.)

## Compare

| Tiêu chuẩn    | Phạm vi chính                      | Loại hình           | Mục tiêu chính                            |
| ------------- | ---------------------------------- | ------------------- | ----------------------------------------- |
| **PCI DSS**   | Bảo mật dữ liệu thẻ tín dụng       | Hướng dẫn thực tiễn | Tuân thủ yêu cầu của các tổ chức thẻ      |
| **ISO 27001** | Quản lý an ninh thông tin tổng thể | Hệ thống quản lý    | Tạo khuôn khổ kiểm soát an ninh linh hoạt |
| **FedRAMP**   | Bảo mật cloud cho chính phủ Hoa Kỳ | Checklist thực hành | Đảm bảo bảo mật cloud theo chuẩn NIST     |

## Phòng thủ theo chiều sâu (Defense in Depth)

> Cách tiếp cận bảo mật của bạn nên có nhiều lớp (layered)

| **Lớp**                    | **Biện pháp bảo vệ**                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| **Chính sách / Kế hoạch**  | Hệ thống quản lý an ninh thông tin                                                            |
| **Vật lý**                 | Bảo mật vật lý của nhà cung cấp cloud; phần cứng chống giả mạo                                |
| **Vòng ngoài (Perimeter)** | Chống tấn công DDoS, Mạng phân phối nội dung (CDN), reverse proxy, tường lửa, bộ cân bằng tải |
| **Mạng**                   | VLAN, tường lửa, subnet không định tuyến, VPN                                                 |
| **Máy chủ (Host)**         | Hypervisor, iptables/nftables, tăng cường hệ điều hành                                        |
| **Ứng dụng**               | Kiến trúc ứng dụng, môi trường chạy, truyền thông bảo mật qua SSL/TLS                         |
| **Dữ liệu**                | Mã hóa dữ liệu                                                                                |

> Lưu ý: Phòng thủ theo chiều sâu có thể bị lạm dụng. Mỗi lớp bảo mật làm tăng độ phức tạp và độ trễ, đồng thời cần người quản lý.

