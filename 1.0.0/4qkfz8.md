# Câu hỏi đào sâu RabbitMQ Setup & Basics

### ✅ Cài đặt RabbitMQ (Docker hoặc bản native)
1. Những khác biệt, ưu và nhược điểm khi triển khai RabbitMQ trên Docker so với bản native? Khi nào nên dùng từng cách?
2. Làm thế nào để cấu hình RabbitMQ trên Docker để đạt hiệu suất tối ưu và bảo mật?
3. Các tham số cấu hình quan trọng khi khởi tạo RabbitMQ cần lưu ý là gì? (vd: memory limits, disk thresholds, file descriptors…)

### ✅ Viết producer + consumer mẫu (Node.js/Python/Java)
4. Những design pattern phổ biến khi xây dựng producer và consumer để đảm bảo tính scale và resilience?
5. Làm sao xử lý lỗi và retry hiệu quả trong producer và consumer mà không gây message duplication?
6. Cách thiết kế consumer để xử lý message đồng thời (concurrency) nhưng vẫn đảm bảo thứ tự và idempotency?

### ✅ Gửi và nhận JSON message, xử lý lỗi cơ bản
7. Các tiêu chuẩn encoding/serialization khi gửi JSON qua RabbitMQ và cách tránh lỗi parsing?
8. Khi nhận message lỗi hoặc malformed JSON, chiến lược xử lý lỗi hợp lý để không làm tắc queue là gì?
9. Làm sao để logging và monitoring lỗi message một cách hiệu quả trong hệ thống producer-consumer?

### ✅ Hiểu cách RabbitMQ hoạt động: exchanges, queues, bindings
10. Mô hình luồng message trong RabbitMQ hoạt động ra sao từ producer đến consumer qua exchange và binding?
11. Làm thế nào để chọn loại exchange phù hợp với use case cụ thể của hệ thống?
12. Phân tích cách hoạt động của routing key và binding key trong direct vs topic exchange?

### ✅ Thực hành các loại exchange: fanout, direct, topic, headers
13. So sánh ưu, nhược điểm và use case của từng loại exchange: fanout, direct, topic, headers.
14. Làm thế nào để thiết kế mô hình routing phức tạp sử dụng nhiều loại exchange cùng lúc?
15. Các vấn đề về performance hoặc scaling có thể gặp khi sử dụng fanout exchange với số lượng consumer lớn?

### ✅ Phân biệt durable queue, transient queue, message persistence
16. Các ảnh hưởng về độ bền (durability) của queue và message tới tính sẵn sàng và mất dữ liệu khi broker restart?
17. Khi nào nên sử dụng durable queue và persistent message, khi nào nên chọn transient?
18. Tác động của việc bật/tắt message persistence tới hiệu suất tổng thể?

### ✅ Thiết lập và xử lý acknowledgment, message requeue, dead-letter queue
19. Cách hoạt động của cơ chế manual vs auto acknowledgment trong RabbitMQ và tác động đến reliability?
20. Khi nào và làm thế nào để requeue message một cách an toàn mà không gây infinite retry loop?
21. Thiết kế dead-letter queue để xử lý message lỗi hiệu quả, các best practice cho việc phân loại và xử lý DLQ?
22. Làm thế nào để giám sát và cảnh báo các message rơi vào DLQ để kịp thời xử lý?

# Câu hỏi đào sâu Advanced RabbitMQ Concepts

### ✅ Thiết kế mô hình routing phức tạp cho nhiều loại message
1. Làm thế nào để thiết kế một hệ thống routing đa tầng, kết hợp nhiều loại exchange (direct, topic, headers) để phân phối message chính xác?
2. Các chiến lược quản lý routing key và binding key khi số lượng topic hoặc loại message tăng lên đáng kể?
3. Làm sao để tránh bottleneck hoặc điểm nghẽn trong mô hình routing phức tạp?
4. Khi nào nên dùng headers exchange thay vì topic exchange? Những trade-off cụ thể?

### ✅ Xử lý concurrency và prefetch count để tối ưu consumer throughput
5. Tác động của prefetch count đến hiệu năng và độ ổn định của consumer trong các workloads đa dạng?
6. Làm thế nào để thiết lập concurrency giữa nhiều consumer mà vẫn tránh tình trạng message starvation hoặc out-of-order processing?
7. Các vấn đề thường gặp khi tăng concurrency hoặc prefetch count quá cao và cách khắc phục?
8. Làm sao để theo dõi và điều chỉnh prefetch count động theo tải thực tế?

### ✅ Triển khai các pattern phổ biến: RPC, work queues, pub-sub
9. Thiết kế và triển khai RPC pattern với RabbitMQ: các thách thức về độ trễ và scalability?
10. Cách xử lý work queue để đảm bảo load balancing và fault tolerance cho các job nặng?
11. Khi nào nên dùng pub-sub pattern và làm sao để xử lý các consumer không đồng bộ hoặc offline?
12. Những điểm cần lưu ý khi kết hợp nhiều pattern trong cùng một hệ thống message queue?

### ✅ Quản lý và monitor RabbitMQ (management plugin, metrics, alerts)
13. Các chỉ số quan trọng cần theo dõi trên RabbitMQ để phát hiện sớm vấn đề về performance và reliability?
14. Thiết lập alert hiệu quả cho các tình trạng queue tăng đột biến, consumer không hoạt động, hoặc message backlog?
15. Làm sao để thu thập và phân tích logs, metrics để tối ưu hiệu suất RabbitMQ?
16. Kinh nghiệm sử dụng các công cụ monitoring bên ngoài như Prometheus, Grafana cho RabbitMQ?

### ✅ Xử lý lỗi, retry strategy, backoff và DLQ nâng cao
17. Các chiến lược retry phổ biến (immediate retry, delayed retry, exponential backoff) và cách lựa chọn phù hợp theo loại lỗi?
18. Thiết kế hệ thống DLQ hiệu quả để không gây nghẽn và dễ dàng quản lý các message lỗi lâu dài?
19. Làm sao để tránh retry loop vô hạn, đồng thời giữ được tính reliable của message processing?
20. Kết hợp giữa DLQ và alerting để chủ động phát hiện và xử lý các message bị lỗi?

### ✅ Bảo mật RabbitMQ: TLS, authentication, permission, network isolation
21. Triển khai TLS trong RabbitMQ để bảo vệ dữ liệu truyền tải và các best practice cần tuân thủ?
22. Các phương pháp authentication trong RabbitMQ, ưu nhược điểm của từng phương pháp (username/password, LDAP, OAuth…)
23. Quản lý permission chi tiết trên RabbitMQ để giới hạn quyền truy cập resource cho từng user hoặc service?
24. Cách thiết kế mạng riêng, firewall rules, VPN hoặc VPC để đảm bảo an toàn cho RabbitMQ trong môi trường production?
25. Các kịch bản bảo mật phổ biến khi triển khai RabbitMQ và cách phòng chống (DoS attacks, unauthorized access, man-in-the-middle…)

# Câu hỏi đào sâu Kafka Setup & Basics

### Cài đặt Kafka cluster (Docker, Confluent Platform)
1. So sánh ưu nhược điểm khi triển khai Kafka trên Docker so với bản cài đặt trực tiếp (native)?
2. Các thành phần cấu hình quan trọng khi setup Kafka cluster để đảm bảo high availability và scalability?
3. Làm thế nào để cấu hình Kafka broker để tối ưu hiệu suất và giảm thiểu downtime?
4. Các bước cần thiết để thiết lập multi-broker Kafka cluster, bao gồm cả ZooKeeper (hoặc Kafka Raft metadata mode)?

### Producer và consumer mẫu, gửi/nhận JSON message
5. Các best practice khi thiết kế producer để gửi message JSON đảm bảo độ tin cậy và hiệu suất?
6. Làm sao xử lý serialization/deserialization message JSON hiệu quả, tránh lỗi parsing hoặc mất dữ liệu?
7. Thiết kế consumer sao cho có thể xử lý message JSON bất thường hoặc lỗi mà không gây crash hệ thống?
8. Xử lý lỗi trong producer/consumer như retry, dead-letter topic trong Kafka như thế nào?

### Hiểu architecture Kafka: topic, partitions, brokers, consumer groups
9. Giải thích vai trò của topic, partition trong Kafka và ảnh hưởng của số partition tới throughput và ordering?
10. Làm thế nào broker quản lý metadata và đảm bảo tính nhất quán giữa các node trong cluster?
11. Cách hoạt động của consumer groups trong việc phân phối và cân bằng tải giữa các consumer?
12. Làm sao xử lý tình trạng consumer lag và các nguyên nhân phổ biến gây ra lag?

### Tìm hiểu cơ chế phân phối message, offset commit và consumer lag
13. Phân tích cách Kafka đảm bảo message delivery theo chế độ at-least-once, at-most-once và exactly-once?
14. Các phương pháp commit offset (auto commit, manual commit) và ưu nhược điểm của từng cách?
15. Làm thế nào để phát hiện và xử lý trường hợp consumer bị lag lâu ngày hoặc mất kết nối?
16. Ảnh hưởng của offset commit không đồng bộ hoặc lỗi commit đến tính nhất quán dữ liệu?

# Câu hỏi đào sâu Advanced Kafka Concepts

### Thiết kế topic, phân vùng, và replication phù hợp cho scale lớn
1. Làm sao xác định số lượng partition tối ưu cho topic dựa trên throughput và yêu cầu ordering?
2. Tác động của số lượng partition đến latency, resource sử dụng và khả năng mở rộng?
3. Khi nào và làm thế nào để thiết kế replication factor phù hợp để đảm bảo độ bền và high availability?
4. Các trade-off giữa consistency, availability, và partition tolerance (CAP theorem) trong cấu hình Kafka replication?

### Xử lý message ordering, exactly-once và at-least-once delivery
5. Các thách thức khi giữ ordering message trong topic có nhiều partition?
6. Làm thế nào để đảm bảo tính exactly-once trong pipeline Kafka, bao gồm producer, broker, và consumer?
7. Ưu và nhược điểm của delivery semantics: at-least-once, at-most-once, và exactly-once?
8. Thiết kế và xử lý idempotency trong consumer để hỗ trợ exactly-once processing?

### Tối ưu throughput và latency: batching, compression, acks config
9. Tác động của việc cấu hình batch size và linger.ms đến hiệu suất producer?
10. So sánh các phương pháp compression (gzip, snappy, lz4, zstd) trong Kafka về tốc độ và độ nén?
11. Vai trò của acks trong producer (acks=0, 1, all) và ảnh hưởng đến độ tin cậy và throughput?
12. Các kỹ thuật giảm latency trong pipeline Kafka mà không ảnh hưởng đến reliability?

### Stream processing với Kafka Streams hoặc ksqlDB
13. So sánh ưu điểm và hạn chế của Kafka Streams và ksqlDB trong xử lý stream real-time?
14. Các pattern phổ biến trong xử lý stream như windowing, joins, aggregations, và cách triển khai hiệu quả?
15. Làm sao để xử lý fault tolerance và stateful processing trong Kafka Streams?
16. Giám sát và tuning performance cho ứng dụng stream processing?

### Monitor Kafka với Prometheus, Grafana, Kafka Manager
17. Những metrics quan trọng nhất để theo dõi sức khỏe và hiệu suất của Kafka cluster?
18. Thiết lập cảnh báo hiệu quả cho các tình huống broker down, topic lag tăng cao, hoặc consumer thất bại?
19. Phân tích log và trace Kafka để xác định nguyên nhân lỗi hoặc bottleneck?
20. Các công cụ và phương pháp best practice để giám sát Kafka trong production?

### Bảo mật Kafka: ACL, SSL, SASL
21. Cách cấu hình SSL/TLS để mã hóa dữ liệu truyền trong Kafka cluster?
22. Các phương pháp authentication phổ biến trong Kafka và ưu nhược điểm (SASL/PLAIN, SCRAM, GSSAPI/Kerberos…)?
23. Thiết lập và quản lý Access Control Lists (ACL) để kiểm soát quyền truy cập topic, nhóm consumer, broker?
24. Làm sao để thiết kế mạng an toàn, phòng chống các tấn công như man-in-the-middle, DoS trong môi trường Kafka?
25. Các kịch bản bảo mật thực tế gặp phải khi triển khai Kafka và cách xử lý?

# Câu hỏi đào sâu Cross-cutting Concerns

### So sánh RabbitMQ vs Kafka về use case, performance, reliability
1. RabbitMQ và Kafka khác nhau thế nào về kiến trúc và mô hình message delivery?
2. Trong những trường hợp nào RabbitMQ phù hợp hơn Kafka và ngược lại?
3. So sánh về throughput, latency và khả năng mở rộng của hai hệ thống này?
4. Tính bền vững (durability) và khả năng xử lý lỗi của RabbitMQ và Kafka khác nhau ra sao?
5. Cách lựa chọn phù hợp khi xây dựng hệ thống microservices sử dụng message queue?

### Xây dựng retry/backoff và dead-letter queue pattern trong cả 2 hệ thống
6. Các chiến lược retry/backoff phổ biến trong RabbitMQ và Kafka có điểm gì khác biệt?
7. Làm thế nào để thiết kế dead-letter queue (DLQ) hiệu quả, dễ quản lý trong từng hệ thống?
8. Cách xử lý các message lỗi hoặc không thể xử lý được mà không làm gián đoạn hệ thống?
9. Làm sao để tránh retry loop vô hạn trong pipeline xử lý message?

### Thiết kế hệ thống resilient, scalable với message queue
10. Các nguyên tắc thiết kế để đảm bảo hệ thống message queue chịu lỗi và dễ mở rộng?
11. Cách phân bổ workload hợp lý giữa nhiều consumer để tối ưu throughput và tránh overload?
12. Thiết kế fallback hoặc circuit breaker pattern khi message queue không khả dụng?
13. Cách kết hợp message queue với các thành phần khác trong kiến trúc microservices (e.g. API Gateway, DB)?

### Xử lý dữ liệu lớn, high throughput message pipeline
14. Các kỹ thuật tối ưu để xử lý khối lượng message lớn với độ trễ thấp?
15. Làm thế nào để cân bằng giữa throughput và độ tin cậy khi thiết kế pipeline?
16. Kỹ thuật batch processing, partitioning, và parallelism áp dụng thế nào trong từng hệ thống?
17. Quản lý backpressure và tình trạng message backlog hiệu quả?

### Thiết lập logging, tracing cho message flows (OpenTelemetry, Zipkin)
18. Các cách tích hợp logging và distributed tracing vào pipeline message queue?
19. Làm sao để theo dõi flow của message xuyên qua nhiều service và queue?
20. Thiết kế alert và dashboard theo dõi hoạt động message queue dựa trên logs/traces?
21. Giải pháp xử lý vấn đề tracing dữ liệu nhạy cảm hoặc dữ liệu lớn trong message payload?

### Đào tạo, document quy trình vận hành và troubleshooting
22. Các nội dung quan trọng cần đưa vào tài liệu vận hành message queue trong team?
23. Cách xây dựng quy trình phát hiện, phân tích và xử lý sự cố message queue hiệu quả?
24. Kỹ thuật đào tạo team mới hoặc chuyển giao kiến thức về message queue?
25. Những kinh nghiệm thực tế khi vận hành RabbitMQ và Kafka trong môi trường production?
