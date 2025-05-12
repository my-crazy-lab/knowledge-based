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
