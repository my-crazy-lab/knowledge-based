# Job hopping 9/2025

## Database

- [Thiết kế Physical Schema chịu tải cao](./1.0.0/c2gn4i/README.md)

## API - HTTP
- [Xây dựng REST API chuẩn cấp Production cho hệ thống lớn](./1.0.0/9w5kku.md)

## Caching
- [Cache-aside với Redis cho REST API](./1.0.0/q0h2zj.md)

## Message Queue

- [Producer-Consumer với RabbitMQ](./1.0.0/4qkfz8.md)

## Clean Arch, Patterns

- [Implement Clean Architecture (Onion/Hexagonal)](./1.0.0/6e1imr.md)

## cloud + CI/CD

- [CD Pipeline: Auto deploy dev/staging với feature branch, tạo Dockerfile chuẩn production, tích hợp Secret Management](./1.0.0/9luvs1.md)

## Monitoring & Logging

- [Tích hợp log tập trung với ELK / Loki](./1.0.0/44enpa.md)

## Microservices

- [Service Discovery & Load Balancing](./1.0.0/8hy0x3.md)

## [Browser - JS - Nodejs](./1.0.0/3q2t07.md)

## Other resources

- :white_check_mark: ByteByteGoHq/system-design-101
    - :white_check_mark: Google File System
    - :white_check_mark: https://bytebytego.com/guides/what-are-the-most-important-aws-services-to-learn/
        - :white_check_mark: DynamoDB
        - :white_check_mark: Lambda
        - :white_check_mark: S3
        - :white_check_mark: Elastic compute cloud EC2
        - :white_check_mark: Fargate
        - :white_check_mark: ECS
        - :white_check_mark: ENI
        - :white_check_mark: EBS
        - :white_check_mark: EFS
        - :white_check_mark: ELB
        - :white_check_mark: FSx
        - :white_check_mark: Cloudfont
        - :white_check_mark: RDS
        - :white_check_mark: Aurora
        - :white_check_mark: SNS
        - :white_check_mark: SQS
        - :white_check_mark: MQ
        - :white_check_mark: Route53
        - :white_check_mark: VPC
        - :white_check_mark: Transit gateway
        - :white_check_mark: DMS
        - :white_check_mark: Snowball
        - :white_check_mark: DataSync
        - :white_check_mark: SageMaker
        - :white_check_mark: Lex
        - :white_check_mark: Rekognition
        - :white_check_mark: Cloud Map
        - :white_check_mark: AWS Secrets Manager / SSM Parameter Store
        - :white_check_mark: CodePipeline + CodeDeploy
    - :white_check_mark: https://bytebytego.com/guides/api-web-development
    - :white_check_mark: https://bytebytego.com/guides/technical-interviews
    - :white_check_mark: https://bytebytego.com/guides/caching-performance
    - :white_check_mark: https://bytebytego.com/guides/devops-cicd/
    - :white_check_mark: https://bytebytego.com/guides/security/
    - :white_check_mark: https://bytebytego.com/guides/cloud-distributed-systems
    - :white_check_mark: https://bytebytego.com/guides/database-and-storage
    - :white_check_mark: https://bytebytego.com/guides/computer-fundamentals
    - :white_check_mark: https://bytebytego.com/guides/software-architecture
- :white_check_mark: some infra need diving
    - [x]  Avro
    - [x]  **Service discovery**
    - [x]  **Istio / Linkerd** → service mesh
    - [x]  Resiliency patterns
    - [x]  Serverless Computing
        - [x]  AWS Lambda
        - [x]  Supabase Functions
        - [x]  Cloudflare Workers
        - [x]  **OpenFaaS / Knative** (open-source serverless)
        - [x]  Netlify
- [x]  Event types, lifecycles
- [x]  Streaming
- [x]  **Exactly-once, at-least-once** semantics
- [x]  **CAP Theorem** (Consistency, Availability, Partition Tolerance).
- [x]  **Strong vs eventual consistency**.
- [x]  chunking - long pulling
- [x]  hmac - blob/some binary type
- [x]  socket
    1. Nếu muốn gửi file lớn qua WebSocket, bạn chọn cách nào (binary frames, chunking, stream API…)?
    2. Làm sao scale WebSocket server để phục vụ hàng triệu kết nối (load balancing, sticky session, pub/sub backend)?
    3. Giải thích sự khác biệt khi triển khai WebSocket trên **single server** và **multi-node cluster**.
    4. Khi nào bạn cần dùng **Redis pub/sub, Kafka, NATS** để hỗ trợ WebSocket backend?
    5. Cách tổ chức **rooms/channels** trong WebSocket server? (giống chat app).
    6. Làm sao broadcast một event đến **tất cả clients** mà không gây nghẽn?
    7. Giải thích sự khác biệt giữa **WebSocket** và **Raw TCP socket**.
    8. Tại sao WebSocket không built-in hỗ trợ **multiplexing** như HTTP/2, và có giải pháp nào thay thế?
    9. Ưu/nhược điểm khi dùng WebSocket để stream dữ liệu so với **gRPC bidirectional streaming**.
    10. WebSocket qua proxy hoặc firewall có vấn đề gì? Cách khắc phục?
    11. Tại sao một số hệ thống chọn **QUIC/HTTP3** thay cho WebSocket/TCP?
- [x]  Partition & replication Kafka
- [x]  **Saga Pattern** (orchestration vs choreography)
- [x]  **CQRS + Event Sourcing**.
- [x]  **Outbox Pattern** (DB + message broker integration)
- [x] Patterns & anti-patterns in DS and MS from  case study
- :white_check_mark: Mongodb
    1. MongoDB lưu dữ liệu theo **BSON**. Tại sao chọn BSON thay vì JSON hay binary khác? Ưu/nhược về performance và storage?
    2. WiredTiger storage engine tối ưu đọc/ghi bằng cơ chế **document-level locking** thay vì collection/db lock. Ưu/nhược điểm?
    3. Tại sao MongoDB lại thiết kế **Oplog (operation log)** thay vì **WAL** truyền thống như Postgres?
    1. Làm sao tối ưu query khi MongoDB không có JOIN như RDBMS? Bạn sẽ chọn **denormalization** hay **manual reference**?
    2. Giải thích cơ chế **covered query** và lợi ích của nó.
    3. TTL index và partial index dùng trong trường hợp nào để giảm storage?
    1. Election trong MongoDB dựa trên cơ chế gì (Raft-like)? Tại sao cần quorum?
    2. Khi một secondary bị lag lâu → vượt oplog window → cần **initial sync**. Tại sao? Hệ quả thực tế khi DB rất lớn?
    3. Nếu primary commit write với `w:1`, sau đó crash trước khi replicate → chuyện gì xảy ra với dữ liệu?
    4. So sánh `w:majority` và `journaled writes`. Khi nào cần cả hai?
    1. So sánh **range-based sharding** và **hashed sharding**. Với workload nào nên chọn cái nào?
    2. Nếu chọn shard key là `createdAt` (tăng dần), tại sao dễ gây **hotspot shard**? Giải pháp nào khắc phục?
    3. Khi **chunk migration** xảy ra, làm sao MongoDB đảm bảo consistency (client đọc/ghi không bị lẫn lộn)?
    4. Config server trong sharded cluster: nếu mất quorum thì cluster còn hoạt động không?
    1. MongoDB hỗ trợ multi-document transaction từ 4.0. So sánh transaction của MongoDB với ACID transaction trong Postgres.
    2. Khi transaction span nhiều shards, MongoDB xử lý thế nào? Ảnh hưởng performance ra sao?
    3. MongoDB cung cấp **read concern** (local, majority, linearizable). So sánh và trade-off về latency vs consistency.
    1. Nếu primary chết → secondary bầu lên làm primary. Trường hợp replication lag, dữ liệu mới commit có bị mất không?
    2. Khi restore từ backup lớn (TB-level), những challenge chính là gì (oplog replay, consistency, downtime)?
    3. Nếu cluster có nhiều datacenter (multi-region replica set), bạn chọn **read/write concern** như thế nào để cân bằng giữa durability và latency?
    1. MongoDB có hỗ trợ **change stream**. Nó hoạt động dựa vào Oplog. Nếu Oplog quá ngắn, chuyện gì xảy ra với consumer change stream?
    2. Khi cần audit log toàn hệ thống, bạn sẽ chọn **Event Sourcing bằng MongoDB** hay chỉ rely vào Oplog? Tại sao?
    3. Làm thế nào migrate cluster từ **non-sharded → sharded** mà không downtime?
    4. Khi cluster MongoDB trên cloud (Atlas) bị hotspot shard → bạn giải quyết thế nào?
- :white_check_mark: Kafka
    1. Kafka lưu message ở disk nhưng lại cực nhanh, tại sao? Giải thích cơ chế **append-only log + sequential I/O + OS page cache + zero-copy (sendfile)**.
    2. So sánh **Kafka log segment** với **WAL (write-ahead log)** trong database. Điểm giống và khác?
    1. Producer gửi message theo **acks=0,1,all** khác nhau thế nào về **durability** và **throughput**?
    2. Khi enable **idempotent producer**, Kafka xử lý duplicate thế nào? Có còn cần `acks=all` không?
    3. Producer batch message như thế nào? Trade-off giữa **linger.ms**, **batch.size** và latency?
    1. Consumer group đảm bảo **scale-out** và **fault tolerance** như thế nào?
    2. Khi rebalance xảy ra, có vấn đề gì về performance và message processing? Giải thích chi tiết **rebalance protocol**.
    3. Offset được commit auto vs manual khác nhau thế nào? Khi nào nên dùng `enable.auto.commit=false`?
    4. Tại sao consumer phải **idempotent** khi xử lý? Cho ví dụ thực chiến.
    1. Kafka cung cấp **at-most-once, at-least-once, exactly-once** như thế nào?
    2. Khi crash sau commit offset nhưng trước khi xử lý xong message, chuyện gì xảy ra? Đây là case nào?
    3. EOS (Exactly Once Semantics) trong Kafka dựa vào cơ chế gì (idempotent producer + transactional API)? Hạn chế nào trong thực tế?
    1. Kafka broker nào giữ metadata? Tại sao **Kafka không dùng ZooKeeper nữa (KIP-500)**?
    2. Khi một broker giữ leader partition chết, Kafka làm sao chọn leader mới? Có rủi ro mất dữ liệu không?
    3. ISR (In-Sync Replica) là gì? Nếu follower lag → bị kick khỏi ISR thì ảnh hưởng thế nào đến durability?
    1. Nếu có 1 topic với 100 partition, nhưng chỉ 5 consumer trong cùng group, chuyện gì xảy ra? Nếu có 200 consumer thì sao?
    2. Message ordering trong Kafka có đảm bảo không? Trong trường hợp nào ordering bị phá vỡ?
    3. Khi throughput cực lớn (hàng triệu msg/s), bottleneck thường nằm ở đâu (producer, broker, network, consumer)? Bạn sẽ tối ưu thế nào?
    4. So sánh Kafka với RabbitMQ / Pulsar: tại sao Kafka phù hợp với event streaming hơn?
    1. Nếu replication factor = 3, một broker chết và ISR chỉ còn 1 → Kafka có cho leader election không? Tùy config nào?
    2. Bạn có 1 topic lưu giữ dữ liệu 7 ngày, nếu consumer down 10 ngày rồi restart → chuyện gì xảy ra? Làm sao xử lý?
    3. Kafka log compaction hoạt động thế nào? Khác gì với log retention theo thời gian/dung lượng?
    4. Khi deploy Kafka trên cloud (EKS/GKE), vấn đề lớn nhất về **network & storage** là gì?
- :white_check_mark: Replication, sharding, partitioning
    1. Khi một **Primary** trong replica set chết, election diễn ra thế nào? Các điều kiện để một secondary được bầu làm primary?
    2. Nếu replication lag lớn, dữ liệu mới ghi vào primary có bị mất khi failover không? (write concern ảnh hưởng thế nào?)
    3. Tại sao MongoDB không replication toàn bộ dữ liệu mà chỉ dùng **Oplog**? Oplog khác gì WAL của Postgres?
    4. Trường hợp một secondary bị tách khỏi cluster lâu ngày (oplog window vượt quá) → khi quay lại sẽ cần full resync. Điều này ảnh hưởng gì đến cluster lớn?
    1. So sánh **range sharding** và **hashed sharding** trong MongoDB. Trường hợp nào range tốt hơn, hashed tốt hơn?
    2. Điều gì xảy ra khi shard key được chọn không tốt (ví dụ: `createdAt` tăng dần)? Hệ quả về **hotspot shard** là gì?
    3. Khi chunk migration xảy ra (balancer chạy), làm sao MongoDB đảm bảo consistency (ngăn client đọc/ghi dữ liệu sai trong lúc chunk đang move)?
    4. Nếu một shard trong cluster bị down lâu dài, hệ thống có còn phục vụ query không? Query nào fail, query nào vẫn chạy được?
    1. MongoDB quyết định khi nào phải split chunk? Khi nào cần move chunk? Bạn có thể can thiệp thủ công không?
    2. Chunk migration có thể gây **write amplification**. Tại sao? Và làm sao tránh cluster bị quá tải khi có hàng ngàn chunks cần rebalance?
    1. Khi vừa có **replication** vừa có **sharding**, failover + rebalancing xảy ra cùng lúc thì có conflict gì không?
    2. Nếu config servers trong sharded cluster mất quorum thì chuyện gì xảy ra? Cluster còn query được không?
    3. Bạn sẽ thiết kế monitoring như thế nào để detect:
        - Replication lag bất thường?
        - Chunk migration backlog?
        - Hotspot shard?
    4. Làm thế nào để migrate một cluster từ non-sharded → sharded mà không downtime?
    1. Giả sử bạn có 1B documents trong collection **Orders**. Bạn sẽ chọn shard key nào và tại sao? (gợi ý: `orderId`, `userId`, `region`, `createdAt`)
    2. Nếu cần **multi-document transaction** trên nhiều shards, MongoDB xử lý thế nào? Hiệu năng bị ảnh hưởng ra sao?
    3. Trong workload đọc-heavy (analytics) thì có nên sharding hay chỉ replication? Khi nào sharding gây **overhead nhiều hơn lợi ích**?
    4. Bạn có thể giải thích sự khác biệt giữa **mongos routing** và **application-level routing** (client biết shard key, tự chọn shard)? Ưu/nhược của mỗi cách?
    5. Tại sao MongoDB **không hỗ trợ thay đổi shard key sau khi đã sharded**? Có cách workaround nào trong thực tế?
    6. Với cluster MongoDB trên cloud (Atlas), bạn sẽ tối ưu thế nào để tránh **chi phí tăng vọt khi scale-out** bằng sharding?
- :white_check_mark: Failover & recovery trong DB cluster (Postgres Patroni / MongoDB ReplicaSet)
    1. Patroni dựa vào etcd/Consul/Zookeeper để election. Vậy tại sao Postgres không tự có election như MongoDB? Ưu/nhược của cách tách rời DCS (Distributed Consensus Store)?
    2. Trong MongoDB ReplicaSet, election dùng Raft-like algorithm. Bạn có thể giải thích chi tiết quorum, majority vote và cách nó tránh split-brain?
    3. So sánh WAL replication trong Postgres với Oplog replication trong MongoDB: điểm khác biệt về **granularity**, **durability**, và **performance**.
    2. MongoDB xử lý tình huống network partition (primary bị mất liên lạc với một số secondary) ra sao để tránh hai primary tồn tại cùng lúc?
    3. Giả sử replication lag = 10s, primary chết → một secondary được bầu lên. Điều gì xảy ra với 10s dữ liệu chưa replicate? Có cách nào đảm bảo không mất dữ liệu?
    1. Khi một node quay lại sau downtime dài, tại sao Postgres có thể dùng WAL để catch-up còn MongoDB có thể phải initial sync toàn bộ dữ liệu?
    2. Nếu schema thay đổi (ALTER TABLE ở Postgres, hoặc collection validator ở MongoDB), failover + recovery có những rủi ro gì?
    1. Tại sao Patroni thường đi kèm với PgBouncer/HAProxy? So sánh với cơ chế client driver tự reconnect của MongoDB. Ưu/nhược của mỗi approach?
    2. Khi failover xảy ra, Postgres cần thời gian replay WAL, trong khi MongoDB dựa vào Oplog. Cái nào nhanh hơn trong workload write-heavy? Vì sao?
    3. Nếu có workload đọc nhiều, bạn sẽ thiết kế read-scaling trên Patroni như thế nào? Có khác gì với việc đọc từ secondary trong MongoDB ReplicaSet?
    1. Nếu cả cluster (Postgres hoặc MongoDB) restart cùng lúc, làm sao xác định được primary nào sẽ lên trước?
    2. Trong trường hợp disk corruption hoặc node bị rollback dữ liệu (e.g., failover + clock skew), bạn xử lý thế nào để tránh phục hồi dữ liệu sai?
- :white_check_mark: Elastic Search
    1. Elasticsearch lưu dữ liệu bằng **Lucene inverted index**. Giải thích inverted index khác gì so với B-Tree/RDBMS index?
    2. Tại sao Elasticsearch là **near real-time** chứ không phải real-time? Vai trò của **refresh interval** và **translog**?
    3. Khi ghi document, Elasticsearch vừa ghi vào **segment file** vừa ghi vào **translog**. Giải thích cơ chế này để đảm bảo durability.
    4. Merge segment là gì? Tại sao cần merge, và tác động đến performance ra sao?
    1. Một index trong ES chia thành **primary shards** và **replica shards**. Replica có tác dụng gì ngoài HA?
    2. Nếu có 5 primary shards và replication factor = 1, cluster có 3 nodes, Elasticsearch phân phối shard như thế nào?
    3. Khi một node chết, Elasticsearch thực hiện shard reallocation như thế nào? Có rủi ro mất dữ liệu không?
    4. Tại sao shard size quá nhỏ hay quá lớn đều gây vấn đề performance? Thực tế shard size bao nhiêu GB là hợp lý?
    1. Giải thích **search request flow**: từ client → coordinator node → query phase → fetch phase.
    2. Elasticsearch có đảm bảo **read-your-write consistency** không? Tại sao đôi khi vừa index xong không query thấy?
    3. So sánh **term query** và **match query**. Khi nào dùng keyword field vs text field?
    4. Khi index có nhiều replicas, query được gửi đến tất cả replicas. Cơ chế **search preference (_primary, _replica, _only_nodes, _shards)** ảnh hưởng thế nào đến kết quả và performance?
    1. Khi ingest dữ liệu cực lớn (hàng trăm GB/ngày), làm sao tối ưu bulk indexing? (số threads, batch size, refresh interval, replicas).
    2. `doc_values` trong Elasticsearch là gì? Tại sao ảnh hưởng lớn đến **sorting & aggregations**?
    3. Khi query aggregations nặng, ES có thể OOM. Tại sao? Làm sao tối ưu aggregations với data lớn?
    4. Giải thích cơ chế **fielddata cache**. Tại sao dùng `text` field trong sort/aggregation dễ gây OOM?
    1. Khi cluster mất quorum (số master-eligible nodes < quorum), chuyện gì xảy ra? Vì sao quorum quan trọng để tránh split-brain?
    2. Nếu một primary shard mất, ES có thể promote replica shard thành primary. Nhưng nếu replica shard cũng stale (outdated), điều gì xảy ra?
    3. Khi restart cluster với hàng trăm GB index, quá trình **cluster recovery** diễn ra thế nào? Tại sao có thể mất hàng giờ?
    4. Snapshot/Restore trong Elasticsearch hoạt động ra sao? Có đảm bảo point-in-time consistency không?
    1. Tại sao Elasticsearch **không nên** dùng như primary OLTP database? Các anti-pattern thường gặp?
    2. Khi index có nhiều field dynamic, mapping explosion là gì và gây hậu quả gì?
    3. Nếu cluster Elasticsearch bị **hot node** (một node chịu tải query/index nhiều hơn), cách xử lý?
    4. Giải thích **scroll API** và **search_after**. Khi nào dùng cái nào cho pagination?
    5. Khi upgrade version Elasticsearch, tại sao phải reindex trong một số trường hợp? Có cách nào tránh không?
- :white_check_mark: Debezium
    1. Debezium là gì? Giải thích cơ chế **Change Data Capture (CDC)** và cách Debezium áp dụng CDC.
    2. Giải thích kiến trúc Debezium: Connector, Kafka Connect, Source, Event, Offset Storage.
    4. Giải thích cách Debezium **track changes trong transaction log**. Debezium sử dụng gì để đảm bảo **exactly-once semantics**?
    5. Debezium vs các công cụ CDC khác (Maxwell, GoldenGate). Điểm mạnh & hạn chế của Debezium?
    8. Bạn sẽ cấu hình Debezium connector để **filter table/column** như thế nào?
    9. Debezium hỗ trợ **snapshot vs incremental**. Giải thích cách snapshot hoạt động và khi nào nên dùng.
    10. Connector bị lỗi hoặc bị pause. Làm thế nào Debezium đảm bảo **data consistency** sau khi resume?
    11. Debezium gửi change events tới Kafka. Giải thích cách **schema evolution** được quản lý với Kafka + Avro/JSON.
    12. Bạn sẽ thiết kế **Kafka topic partitioning & keying** để đảm bảo ordering và scalability cho Debezium events?
    13. Làm thế nào để xử lý **duplicate events** trong Kafka consumer khi dùng Debezium?
    15. Bạn sẽ tích hợp Debezium với **Kafka Streams / ksqlDB / Flink** để build streaming pipeline ra sao?
    16. Khi database lớn và có nhiều transaction, làm sao để **tune Debezium connector** cho performance?
    17. Giải thích cách **batch size, polling interval, heartbeat interval** ảnh hưởng tới latency và throughput.
    18. Debezium có thể gặp vấn đề **long-running snapshot**. Làm sao để tối ưu và giảm downtime?
    19. Bạn sẽ monitor Debezium connector health, lag, errors như thế nào?
    20. Khi Debezium gửi lượng event lớn tới Kafka, bạn sẽ **tối ưu consumer processing & retention** như thế nào?
    21. Bạn sẽ deploy Debezium như standalone connector hay embedded trong Kafka Connect? Ưu nhược điểm?
    22. Làm thế nào để đảm bảo Debezium connector **high availability & fault tolerance**?
    23. Debezium cần config **offset storage**. Bạn sẽ chọn đâu: Kafka topic hay database, và lý do?
    24. Khi database schema thay đổi (add/drop column), Debezium xử lý ra sao và bạn cần lưu ý gì?
    25. Bạn sẽ backup và restore **offsets & connector configs** trong production như thế nào?
    27. Bạn sẽ xử lý **network partition / Kafka outage / DB failover** khi Debezium đang chạy?
    28. Giải thích cách **transactional integrity** được giữ khi CDC từ DB sang Kafka.
    29. Làm sao để test Debezium pipeline trong staging mà vẫn đảm bảo dữ liệu production an toàn?
    30. Bạn sẽ thiết kế pipeline **Debezium → Kafka → downstream systems (clickhouse, warehouse, cache…)** để đảm bảo low-latency và exactly-once processing?
- :white_check_mark: Redis
    1. Redis là in-memory database nhưng vẫn hỗ trợ persistence. So sánh chi tiết **RDB snapshot** vs **AOF (Append Only File)**. Khi nào chọn cái nào?
    2. Redis sử dụng **single-threaded event loop**. Tại sao lại chọn thiết kế này thay vì multi-threaded? Ưu/nhược điểm?
    3. Cơ chế **IO Multiplexing (epoll/kqueue)** trong Redis hoạt động thế nào để đạt throughput cao?
    4. Redis lưu dữ liệu theo **data structures** (String, List, Hash, Set, ZSet, HyperLogLog, Stream). Giải thích cách ZSet được implement bằng **skiplist + hash**.
    1. Redis replication mặc định là **async**. Khi primary crash, có thể mất dữ liệu. Redis 6+ hỗ trợ **PSYNC2** – giải thích cơ chế và lợi ích.
    2. Khi failover bằng Redis Sentinel, làm sao tránh split-brain? Các kịch bản nào vẫn gây ra split-brain?
    3. Redis cluster phân mảnh dữ liệu bằng **hash slot**. Cơ chế map key → slot → node hoạt động thế nào?
    4. Khi một node trong Redis cluster chết, hệ thống có còn hoạt động không? Query nào fail, query nào vẫn chạy được?
    1. RDB snapshot gây **fork()** → copy-on-write. Tại sao điều này có thể gây latency spike hoặc OOM? Giải pháp?
    2. Khi Redis khởi động lại với cả RDB và AOF, nó dùng thứ tự nào để recover dữ liệu?
    3. Nếu AOF bị corrupted (truncate chưa kịp flush), Redis xử lý thế nào? Có rủi ro mất dữ liệu không?
    1. Redis transaction (`MULTI/EXEC`) có đảm bảo isolation không? Vì sao Redis không phải là full ACID DB?
    2. So sánh **optimistic locking (WATCH)** và **Lua scripting** để đảm bảo atomic operation. Khi nào chọn cái nào?
    3. Redis Streams hỗ trợ **consumer group**. Cơ chế offset tracking của Redis Streams khác Kafka offset tracking ở đâu?
    1. Tại sao Redis thường nhanh hơn Memcached, mặc dù cả hai đều in-memory?
    2. Khi key size quá lớn (big hash, big list), Redis có thể gây block event loop. Giải thích tại sao và cách khắc phục.
    3. Redis hỗ trợ **pipelines**. Tại sao pipeline cải thiện throughput? Trade-off về latency thế nào?
    4. Eviction policy trong Redis (LRU, LFU, random, noeviction) khác nhau thế nào? Trường hợp nào chọn LFU thay vì LRU?
    1. Redis Sentinel làm leader election thế nào? Tại sao quorum quá thấp có thể gây mất an toàn dữ liệu?
    2. Khi cluster rebalance (move slot giữa nodes), Redis đảm bảo consistency thế nào với key đang bị migrate?
    3. Bạn có 1 cluster Redis với 3 master + 3 replica, replication lag tăng cao khi write-heavy. Giải pháp nào để giảm lag?
    1. Tại sao Redis cluster không hỗ trợ multi-key operation trên các keys thuộc **khác hash slot**? Cách workaround?
    2. Khi Redis dùng làm cache, làm sao xử lý **cache stampede** (nhiều client cùng query khi key expire)?
    3. Nếu Redis được dùng để lưu session trong web app global (multi-region), vấn đề consistency sẽ phát sinh gì?
    4. Redis có thể dùng làm **primary DB** không? Trong tình huống nào là hợp lý, tình huống nào là anti-pattern?
- :white_check_mark: dbt
    1. DBT hoạt động theo mô hình ELT. Bạn hãy giải thích rõ ELT khác ETL ở điểm nào và lợi ích khi dùng DBT trong ELT?
    2. DBT chỉ làm transform trong data warehouse. Giải thích cách DBT tương tác với data warehouse như Snowflake, BigQuery, Redshift.
    3. DBT models được tổ chức như thế nào? Giải thích sự khác biệt giữa **table model, view model và ephemeral model**.
    4. DBT sử dụng Jinja templates trong SQL. Bạn hãy giải thích ưu nhược điểm của việc dùng Jinja trong DBT models.
    5. Trong DBT, lineage của dữ liệu được quản lý thế nào? Nó hỗ trợ gì cho documentation và debugging?
    6. Bạn sẽ tạo **incremental model** trong DBT như thế nào và khi nào nên dùng incremental thay vì full-refresh?
    7. Giải thích sự khác nhau giữa **ref() và source() trong DBT**. Khi nào nên dùng source()?
    8. DBT cho phép viết **macros**. Hãy nêu ví dụ macro phức tạp bạn từng viết hoặc có thể viết để reuse logic.
    9. Khi làm nhiều model liên quan lẫn nhau, DBT build models theo thứ tự nào? Bạn có thể can thiệp thứ tự này không?
    10. Trong DBT, nếu một model bị lỗi, DBT sẽ xử lý thế nào? Làm thế nào để debug hiệu quả?
    11. DBT có cơ chế test dữ liệu built-in. Hãy kể các loại test có sẵn và giải thích cách chúng bảo vệ dữ liệu.
    12. Bạn sẽ viết **custom test** trong DBT như thế nào? Nêu ví dụ thực tế.
    13. Khi dữ liệu warehouse bị duplicate hoặc null, làm sao DBT test và alert kịp thời?
    14. DBT supports snapshot. Giải thích snapshot là gì và khi nào nên dùng snapshot thay vì incremental model.
    15. Bạn có chiến lược nào để kiểm tra **referential integrity giữa nhiều bảng trong DBT**?
    16. DBT Cloud khác DBT Core ở điểm gì? Khi nào nên dùng Cloud, khi nào Core là đủ?
    17. Giải thích cách tích hợp DBT vào CI/CD pipelines (GitHub Actions, Airflow, Prefect).
    18. Nếu bạn có nhiều environment (dev/test/prod), bạn sẽ quản lý cấu hình DBT profiles như thế nào?
    19. Bạn sẽ version-control DBT project ra sao để team cùng làm việc trên models và macros?
    20. Khi chạy DBT trong production, bạn có cách nào tối ưu **run time & performance** của các models?
    21. Làm thế nào để tối ưu **query performance của DBT models trên warehouse**?
    22. DBT incremental model có thể gặp vấn đề duplicate key. Bạn sẽ giải quyết thế nào?
    23. Khi warehouse có hàng trăm bảng, bạn quản lý dependency và execution time thế nào trong DBT?
    25. DBT có thể kết hợp với **streaming data** không? Nếu có, bạn sẽ thiết kế pipeline ra sao?
- :white_check_mark: Clickhouse
    1. Giải thích kiến trúc của ClickHouse: MergeTree, parts, segments, background merges.
    2. ClickHouse là **columnar database**. Hãy giải thích ưu điểm và nhược điểm so với row-based database.
    3. Giải thích cơ chế **MergeTree**: primary key, partition key, index granularity.
    4. ClickHouse hỗ trợ replication và distributed tables. Hãy giải thích cách hoạt động của **ReplicatedMergeTree**.
    5. ClickHouse xử lý **OLAP workloads** khác OLTP workloads ra sao?
    6. Bạn sẽ thiết kế schema ClickHouse cho dữ liệu log hàng tỷ rows/ngày. Hãy chọn **table engine, partitioning, primary key**.
    7. So sánh các table engine: **MergeTree, CollapsingMergeTree, SummingMergeTree, AggregatingMergeTree, TinyLog, StripeLog**. Khi nào dùng từng loại?
    8. Giải thích cách ClickHouse sử dụng **partition key và primary key** để optimize query.
    9. Làm thế nào để giảm **data duplication và storage size** khi thiết kế table?
    10. Bạn sẽ implement **materialized views** trong ClickHouse để cải thiện performance query như thế nào?
    11. Giải thích cách ClickHouse thực hiện **vectorized execution** và **columnar storage** để tăng tốc query.
    12. So sánh **JOINs trong ClickHouse**: ANY INNER JOIN, ALL LEFT JOIN, GLOBAL JOIN. Khi nào dùng JOIN local vs distributed?
    13. Giải thích cách ClickHouse tối ưu **aggregation queries** với SummingMergeTree / AggregatingMergeTree.
    14. Làm sao để xử lý **high-cardinality dimensions** mà vẫn giữ hiệu suất query?
    15. Giải thích **primary key index, skip index, data skipping** trong ClickHouse và cách dùng chúng để optimize queries.
    16. Giải thích cách hoạt động của **ReplicatedMergeTree** và cách đảm bảo consistency giữa replicas.
    17. Khi triển khai cluster ClickHouse, bạn sẽ cấu hình **sharding & replication** như thế nào để balance load và fault tolerance?
    18. Làm thế nào để monitor **replication lag & failures** trong ClickHouse cluster?
    19. Giải thích cách **distributed table** kết hợp với MergeTree tables. Khi nào nên dùng distributed table?
    20. Bạn sẽ xử lý **node failure** và recovery trong ClickHouse cluster ra sao?
    21. ClickHouse hỗ trợ ingestion từ Kafka, RabbitMQ, hoặc batch files. Bạn sẽ thiết kế pipeline ingestion ra sao cho dữ liệu lớn & realtime?
    22. Giải thích **Buffer table engine** và khi nào nên dùng để ingest dữ liệu nhanh.
    23. Làm sao để xử lý **duplicate data** khi ingest từ nhiều source vào MergeTree?
    24. Bạn sẽ implement **materialized views hoặc aggregation tables** để giảm latency cho OLAP queries như thế nào?
    25. Giải thích cách ClickHouse xử lý **TTL / data expiration** trên table.
    26. Làm thế nào để debug **slow queries** trong ClickHouse? Nêu các tools và query system tables.
    27. Bạn sẽ tối ưu query cho **JOIN nhiều bảng lớn** hoặc high-cardinality keys như thế nào?
    28. Giải thích cách ClickHouse xử lý **memory management & query limits**.
    29. Làm sao để monitor **disk usage, merges, background tasks** trong ClickHouse cluster?
    30. Bạn sẽ thiết kế chiến lược **backup & restore** trong ClickHouse cluster như thế nào?
- :white_check_mark: kvrocks
    - Giải thích kiến trúc của Kvrocks
        - Kvrocks được cấu trúc nội bộ như thế nào?
        - Các thành phần chính là gì (lớp mạng, bộ thực thi lệnh, bộ lưu trữ RocksDB)?
        - Kvrocks khác gì so với Redis trong quản lý bộ nhớ và cơ chế lưu trữ?
    - Tại sao RocksDB được chọn làm công cụ lưu trữ cho Kvrocks?
        - Ưu điểm của thiết kế cây LSM (Log-Structured Merge Tree) là gì?
        - RocksDB xử lý dữ liệu lớn hiệu quả hơn so với các hệ thống trong bộ nhớ như thế nào?
    - Mô tả luồng dữ liệu từ khi client gửi lệnh ghi đến khi dữ liệu được ghi xuống đĩa
        - Từ `SET key value` → ghi vào WAL → lưu vào Memtable → tạo tệp SST.
    - Kvrocks lưu trữ các cấu trúc dữ liệu của Redis trong RocksDB như thế nào?
        - Hash  
        - ZSet (Sorted Set)  
        - List  
        - Set  
        - String  
    - Vai trò của **namespace** là gì và Kvrocks cô lập dữ liệu ra sao?
        - Cách Kvrocks hỗ trợ nhiều không gian tên (multi-tenant).
        - Cách cô lập dữ liệu của các ứng dụng hoặc người dùng khác nhau.
    - Kvrocks xử lý **TTL (time-to-live)** nội bộ như thế nào?
        - Cơ chế quản lý thời gian sống của key.
        - Khi nào key hết hạn và bị xóa khỏi RocksDB.
    - Mô tả cách Kvrocks triển khai **replication (sao chép dữ liệu)** và đảm bảo tính nhất quán
        - Giao thức sao chép (master–replica).
        - Cách xử lý độ trễ và đảm bảo dữ liệu đồng bộ.
    - Kvrocks hỗ trợ **giao thức Redis** như thế nào trong khi sử dụng RocksDB?
        - Cách Kvrocks duy trì tương thích hoàn toàn với các client Redis.
        - Lớp chuyển đổi giữa Redis command → RocksDB operation.
    - Nguyên lý ghi tuần tự, lưu tạm vào Memtable và hợp nhất (compaction) thành SST.
    - Chức năng, vai trò và mối liên hệ giữa WAL, Memtable và SST.
    - Ảnh hưởng của compaction tới hiệu năng đọc/ghi.
    - Compaction ảnh hưởng đến hiệu năng và độ trễ của Kvrocks như thế nào?
        - Khi nào compaction gây nghẽn.
        - Cách tối ưu để giảm tác động.
    - Kvrocks sử dụng **column families** của RocksDB như thế nào?
        - Cách Kvrocks tách dữ liệu theo loại cấu trúc (hash, zset, metadata…).
    - Các tham số cấu hình RocksDB thường được tinh chỉnh trong Kvrocks
        - write_buffer_size, max_background_jobs, compaction_style, block_cache_size, v.v.
    - Theo dõi hiệu năng RocksDB
        - Các chỉ số như: write stalls, compaction stats, memtable usage, I/O latency.
    - Kvrocks đảm bảo **persistence** và **durability** như thế nào?
        - Dữ liệu được ghi vào WAL và đồng bộ xuống SST.
        - Cách đảm bảo không mất dữ liệu khi crash.
    - So sánh giữa **AOF/RDB của Redis** và **RocksDB persistence trong Kvrocks**
        - Redis: snapshot/AOF tốn RAM và CPU.
        - Kvrocks: RocksDB xử lý bền vững theo cơ chế WAL + LSM-tree.
    - Mô hình sao chép của Kvrocks
        - Là đồng bộ, bất đồng bộ hay bán đồng bộ?
        - Cách xử lý lag và fallback.
    - Kvrocks xử lý **replication lag** hoặc **failover** ra sao?
    - Cơ chế phát hiện và khôi phục replica chậm.
        - Khi node master hỏng, quá trình bầu leader mới diễn ra thế nào.
    - Cách khôi phục dữ liệu Kvrocks khi bị **corruption** hoặc lỗi đĩa
    - Mô tả **topology cluster** của Kvrocks và cách các node giao tiếp
        - Mô hình leader–follower, nhân bản, phân vùng dữ liệu.
    - So sánh giữa **Kvrocks replication** và **Redis Sentinel-based replication**
        - Kvrocks có cơ chế sao chép riêng, không phụ thuộc Sentinel.
        - Ưu và nhược điểm của từng mô hình.
    - Cách tinh chỉnh Kvrocks để đạt throughput ghi cao
        - Tối ưu batch write, memtable, và compaction threads.
    - Các tùy chọn RocksDB cho SSD
        - compaction_style = level/universal  
        - write_buffer_size, target_file_size_base, max_background_jobs.
    - Cách xử lý **write amplification** trong hệ thống dựa trên RocksDB
    - Cân bằng bộ nhớ giữa RocksDB block cache và OS page cache
    - Các **metrics** cần theo dõi trong môi trường sản xuất
    - Phát hiện và giảm thiểu **compaction stalls**
        - Giám sát IO throughput, tăng thread background, dùng universal compaction.
    - Xử lý **replica lag** hoặc tràn backlog
        - Điều chỉnh replication buffer, batch size, hoặc tốc độ gửi dữ liệu.
    - Đánh giá hiệu năng Kvrocks
    - Cách ánh xạ các kiểu dữ liệu Redis sang RocksDB
        - String → key-value  
        - Hash → key prefix + field  
        - Set → prefix + member  
        - ZSet → composite key (score + member)  
        - List → index key
    - Dựa trên khóa mã hóa (score, member) để hỗ trợ range scan.
    - Sử dụng prefix (namespace + type + key) để tránh va chạm và hỗ trợ quét phạm vi.
    - Sử dụng iterator và range scan trên SST files.
    - Các node master–replica, cấu hình replication, giám sát trạng thái.
    - Hiện tại chủ yếu là **thủ công (manual)** hoặc dùng proxy layer.
    - Cơ chế bắt kịp tự động (catch-up) bằng cách đồng bộ lại từ WAL/SST.
    - Dùng backup RocksDB snapshot hoặc công cụ dump/restore.
    - Tùy chọn fsync, WAL sync interval, và compaction mode.
    - Dùng nhiều replica, heartbeat check, và proxy chuyển hướng.
    - compression (zstd/snappy), write_buffer_size, block_cache_size, max_background_jobs.
    - So sánh Kvrocks với Redis + RDB/AOF
    - So sánh Kvrocks với Redis on Flash hoặc Redis Enterprise
        - Kvrocks dùng RocksDB (mở nguồn), Redis Enterprise dùng module thương mại.
        - Kvrocks linh hoạt hơn nhưng ít tính năng phân tán tự động.
    - So sánh Kvrocks với các hệ thống dựa trên RocksDB khác (TiKV, BadgerDB)
        - Kvrocks: tương thích Redis.  
        - TiKV: phân tán theo Raft.  
        - BadgerDB: dành cho ứng dụng Go nhúng.
    - Khi nào **không nên** dùng Kvrocks
        - Khi yêu cầu độ trễ cực thấp (Redis thuần in-memory tốt hơn).
        - Khi cần cluster tự động mở rộng.
    - Thiết kế hệ thống lai **Kvrocks + ClickHouse**
        - Kvrocks làm lớp cache key-value nhanh.  
        - ClickHouse xử lý phân tích dữ liệu lớn (analytics).
    - Cân bằng shard, replication, caching layer.
    - Dùng bán đồng bộ, batch replication.
    - Cơ chế quorum hoặc version vector.
    - Compaction scheduling, tune background threads.
    - Dùng key prefix theo userID / timestamp.
- Postgres (cơ hội tốt review lại DS + lock)
    1. PostgreSQL xử lý **ACID** thế nào? Giải thích cơ chế **MVCC** (Multi-Version Concurrency Control).
    2. Giải thích các **isolation levels** trong PostgreSQL: **Read Committed, Repeatable Read, Serializable**. Trade-off về **performance vs consistency**.
    3. Khi 2 transaction update cùng một row, cơ chế nào giúp tránh **lost update**?
    4. Giải thích **Serializable Snapshot Isolation (SSI)** trong PostgreSQL. Khi nào conflict xảy ra?
    5. PostgreSQL xử lý **deadlock detection** như thế nào?
    6. **Savepoints**: sử dụng ra sao và tác dụng trong rollback một phần transaction.
    7. So sánh **locking row-level vs table-level**. Khi nào nên dùng `FOR UPDATE`, `FOR SHARE`?
    8. Khi transaction **crash hoặc server crash**, PostgreSQL recover dữ liệu ra sao? Vai trò của **WAL (Write-Ahead Log)**.
    9. Giải thích cách **checkpoint** hoạt động trong PostgreSQL, và ảnh hưởng tới I/O.
    10. **Long-running transaction** ảnh hưởng gì tới **VACUUM** và bloat?
    1. Các loại index PostgreSQL hỗ trợ: **B-Tree, Hash, GiST, GIN, SP-GiST, BRIN**. Ưu/nhược điểm & use case.
    2. Khi nào nên dùng **partial index** hoặc **expression index**?
    3. Giải thích **covering index (INCLUDE clause)** và tác dụng.
    4. PostgreSQL chọn index như thế nào khi query có nhiều condition (`AND`, `OR`)?
    5. **Multicolumn index**: tác dụng khi query chỉ filter 1 column, hay filter các column khác nhau.
    6. **Index-only scan** là gì? Khi nào có thể xảy ra?
    7. Khi index bị bloat, PostgreSQL xử lý ra sao? Tác động của **REINDEX** và **VACUUM FULL**.
    8. So sánh **B-Tree vs BRIN index** cho data lớn và sequential.
    9. Giải thích cách **GIN index** optimize search text/array.
    1. Khác nhau giữa **view bình thường và materialized view**. Khi nào nên dùng materialized view?
    2. Cách **refresh materialized view**: concurrent vs non-concurrent. Ưu/nhược điểm.
    3. PostgreSQL xử lý **recursive view / CTE** ra sao?
    4. View có ảnh hưởng gì tới **query planner/optimizer**?
    5. Giải thích cách **updatable view** hoạt động, và giới hạn của nó.
1. PostgreSQL **query planner** và **executor** hoạt động như thế nào?
2. Giải thích output của **EXPLAIN / EXPLAIN ANALYZE**: Seq Scan, Index Scan, Bitmap Heap Scan.
3. Khi PostgreSQL chọn **Seq Scan thay vì Index Scan**, nguyên nhân có thể là gì?
4. **Nested Loop vs Hash Join vs Merge Join**: khi nào PostgreSQL chọn mỗi loại join?
5. Giải thích **parallel query execution** trong PostgreSQL.
6. PostgreSQL estimate **row count** ra sao? Khi nào estimate sai (statistics outdated)?
7. Giải thích **CTE materialization vs inline** (PostgreSQL 12+).
8. Khi query có nhiều filter và join, PostgreSQL chọn **join order** dựa trên **cost model** như thế nào?
1. PostgreSQL lưu trữ row trong **heap file**, giải thích cách hoạt động của **tup_id (ctid)**.
2. Cách PostgreSQL **treat deleted rows / dead tuples** và VACUUM.
3. Giải thích cách **WAL ensures durability**.
4. Checkpoint frequency, effect on **fsync and latency**.
5. **Hot Update** là gì? Khi nào PostgreSQL không tạo new tuple.
6. So sánh **Heap-only Tuple (HOT)** vs bình thường, ảnh hưởng tới I/O.
7. PostgreSQL xử lý **transaction rollback** bằng WAL như thế nào.
1. **Long running transaction** + MVCC → bloat & vacuum problems.
2. **Serializable transaction** bị abort: cách ứng dụng handle retry.
3. **Partial index + NULL values** → hiệu quả ra sao?
4. **GIN index + jsonb**: tối ưu query key presence.
5. Giải thích **table partitioning** và ảnh hưởng tới planner / index.
6. Khi **query lớn join nhiều partition** → performance implication.
    1. PostgreSQL hỗ trợ **synchronous vs asynchronous replication** như thế nào?
    2. Trường hợp **primary crash**, replica nào sẽ được promote? Làm sao đảm bảo **no data loss**?
    3. Khi **replica lag**, các read-only query trên standby có ảnh hưởng gì tới consistency?
    4. Giải thích **hot standby + streaming replication** workflow.
    5. Làm thế nào để **detect replica divergence / failover safely**?
    6. So sánh **physical vs logical replication**: ưu nhược điểm, khi nào dùng.
    7. Khi **multi-primary / BDR (Bi-Directional Replication)** xảy ra conflict → PostgreSQL xử lý thế nào?
    1. PostgreSQL không native sharding; nhưng khi dùng **Citus** hoặc partitioning:
        - Query planner xử lý **distributed join / aggregation** như thế nào?
        - Worker nodes / coordinator node giao tiếp ra sao?
    2. **Distributed transactions across nodes**: cơ chế **2-phase commit** trong Citus.
    3. **Conflict resolution** trong multi-node write (Citus / BDR) → cách tránh lost update.
    4. Khi partitioned table query across multiple nodes → network cost, join strategy, caching.
    5. Tác động của **replica + distributed query** tới latency và throughput.
    6. Khi **resharding / repartitioning**: dữ liệu di chuyển, impact tới queries và transaction.
    1. WAL propagation tới standby trong **synchronous replication** đảm bảo **consistency ra sao**?
    2. Khi dùng **logical replication**:
        - Conflict resolution, order guarantee giữa publisher / subscriber.
        - Giải thích **replication slot** & role trong preventing WAL loss.
    3. Khi **long replication lag** → ảnh hưởng gì tới failover và read consistency.
    4. **Checkpoint + WAL + replication** → tổng hợp để đảm bảo **durable, consistent state across nodes**.
    1. **Parallel query execution** trên một node vs nhiều nodes: cost model, coordinator, worker nodes.
    2. Khi join table lớn giữa nodes khác nhau → network shuffle, redistribution strategy.
    3. **Query planner** estimate row count across nodes → làm sao tránh skew / bad plan.
    4. **Partition-wise join / aggregate**: mechanism, benefits, limitations.
    5. Khi **remote data source / foreign table (FDW)** query → planner estimate và execution ra sao.
    1. Khi **primary + synchronous standby fail together** → cách thiết kế failover để **no data loss**.
    2. **Point-in-time recovery (PITR)** trong môi trường distributed.
    3. Khi **replica diverged** do network partition → cách detect và reconcile.
    4. Trade-off giữa **high availability vs strong consistency** trong PostgreSQL replication.
    1. **Distributed deadlocks**: khi transaction lock trên nhiều nodes → detection & resolution.
    2. **Distributed VACUUM / bloat management** → khi partitioned / sharded table.
    3. **Hot standby streaming replication + read scaling**: làm sao giữ snapshot isolation.
    4. **Multi-shard transaction + 2PC**: latency, rollback, and retry strategies.
    5. **Logical replication lag + long-running transaction** → risk for PITR or conflict.
    1. MVCC overhead → long-running transaction gây bloat và VACUUM pressure.
    2. Lock contention → row-level vs table-level locks.
    3. Serializable / Repeatable Read → higher latency, potential for transaction abort.
    4. Savepoints / nested transactions → small overhead, nhưng nhiều nested → memory/CPU cost.
    1. Heap storage & HOT tuples → reduce I/O for updates.
    2. WAL → extra write overhead for durability.
    3. Checkpoint frequency → impacts I/O spikes and latency.
    4. Vacuum / autovacuum → performance cost if delayed.
- MySQL
1. Giải thích kiến trúc tổng thể của MySQL — gồm SQL Layer, Storage Engine Layer, và vai trò của mỗi phần.
2. MySQL xử lý một câu lệnh `SELECT` như thế nào từ khi nhận đến khi trả kết quả?
3. Sự khác biệt giữa InnoDB và MyISAM về cơ chế lưu trữ, khóa, và transaction.
4. Redo Log, Undo Log, và Binary Log khác nhau thế nào? Tại sao cần cả ba?
5. InnoDB Buffer Pool là gì? Cách hoạt động của LRU trong đó ra sao?
6. Giải thích cơ chế *doublewrite buffer* trong InnoDB.
7. MySQL optimizer hoạt động thế nào khi chọn execution plan?
8. Thế nào là *cost-based optimization* trong MySQL? Làm sao để phân tích plan?
9. Giải thích cơ chế metadata lock (MDL) và tác động của nó khi DDL chạy song song với DML.
10. MySQL lưu metadata (table schema, indexes, constraints) ở đâu và như thế nào trong phiên bản 8.x?
1. Khi nào một index **không được sử dụng** dù tồn tại?
2. Sự khác nhau giữa `EXPLAIN` và `EXPLAIN ANALYZE`. Khi nào nên dùng từng cái?
3. `EXPLAIN` có thể sai hoặc gây hiểu lầm trong trường hợp nào?
4. Phân biệt `index merge`, `range scan`, và `ref` trong plan output.
5. Khi nào nên dùng **covering index**, và làm sao để thiết kế nó tối ưu?
6. Tác động của `JOIN buffer` và `sort buffer` size tới hiệu năng.
7. Sự khác biệt giữa `LIMIT OFFSET` và `keyset pagination` về hiệu năng.
8. Nêu ví dụ truy vấn có thể “đánh lừa” optimizer và cần hint để tối ưu.
9. Cách đo thời gian từng bước query thực thi mà không chỉ dựa vào tổng thời gian.
10. Khi nào nên bật/tắt `query cache` (hoặc tương tự trong MySQL 8.x)?
1. Giải thích 4 mức **isolation level** và ảnh hưởng của từng mức.
2. MVCC trong InnoDB hoạt động như thế nào?
3. Row-level locking được thực hiện ra sao trong InnoDB?
4. Sự khác nhau giữa **intention locks** và **record locks**?
5. Deadlock detection trong InnoDB hoạt động thế nào?
6. Cách xử lý deadlock tự động trong code ứng dụng.
7. Khi nào MySQL lock **gap**, và hậu quả của nó là gì?
8. Làm sao để debug tình trạng **lock contention** trên production?
9. Giải thích `SHOW ENGINE INNODB STATUS` và cách đọc phần “LATEST DETECTED DEADLOCK”.
10. Vì sao MySQL vẫn có thể bị *phantom reads* ở REPEATABLE READ?
1. Giải thích 3 loại replication: statement-based, row-based, mixed. Ưu/nhược điểm?
2. Khi replication delay xảy ra, nguyên nhân phổ biến là gì?
3. Cơ chế replication trong MySQL 8.x hoạt động thế nào (GTID vs non-GTID)?
4. Cách phát hiện và xử lý **replica lag** trong hệ thống lớn.
5. Làm sao đảm bảo tính nhất quán dữ liệu giữa master và replica?
6. Khi nào nên chọn semi-sync replication?
7. Làm sao để migrate từ master–slave sang group replication mà không downtime?
8. Khác biệt giữa backup logic (`mysqldump`) và physical (`xtrabackup`).
9. Cách restore nhanh hàng chục TB dữ liệu MySQL.
10. Kịch bản thực tế: Một replica bị hỏng GTID, làm sao khôi phục mà không mất dữ liệu?
1. Khi nào bạn chọn **sharding** thay vì **replication**?
2. Làm sao để thiết kế schema MySQL có thể mở rộng hàng tỷ record?
3. Partitioning có ảnh hưởng gì đến index và query optimizer?
4. So sánh hash vs range partitioning.
5. Làm sao để thiết kế schema tránh *hotspot* write (VD: auto_increment)?
6. Khi nào nên dùng `uuid` thay vì `auto_increment`, và tác động đến performance?
7. Làm sao đảm bảo consistency giữa MySQL và cache layer (Redis)?
8. Nếu 1 bảng có 500 triệu record, bạn làm gì để query top 100 mới nhất nhanh nhất?
9. Cách đánh giá và tối ưu I/O khi MySQL chạy trên SSD vs HDD.
10. Thực tế: khi hệ thống MySQL bị quá tải CPU, bạn sẽ kiểm tra và tối ưu theo thứ tự nào?
1. Một transaction update 1000 record và bị crash giữa chừng — điều gì xảy ra sau khi restart?
2. Bạn phát hiện `SELECT` bị chậm bất thường, CPU cao, I/O cao — mô hình điều tra chi tiết?
3. Làm sao xử lý lỗi replication “Duplicate key on update” trong row-based replication?
4. Khi nào nên sử dụng `READ COMMITTED` thay vì `REPEATABLE READ`?
5. MySQL server load cao do quá nhiều connection. Cách giải quyết lâu dài?
6. Một bảng log có 2 tỷ dòng, cần purge định kỳ — giải pháp tối ưu không lock toàn bảng?
7. Khi nào nên dùng `MEMORY` engine, và rủi ro đi kèm?
8. MySQL crash recovery hoạt động thế nào (các bước cụ thể)?
9. Làm sao để monitor slow queries hiệu quả trên production (tool & kỹ thuật)?
10. Cách đảm bảo query plan không “thoái hóa” sau khi upgrade MySQL version?
    - Viết truy vấn để tìm top 3 sản phẩm có doanh thu cao nhất trong từng tháng (tối ưu hóa tốt).
    - Cho log table 100 triệu dòng (user_id, action, timestamp). Làm sao để tìm unique users mỗi ngày nhanh nhất?
    - Làm sao phát hiện index không được sử dụng?
    - Viết script SQL + shell để backup & verify tự động mỗi ngày.
    - Thiết kế schema lưu versioning cho dữ liệu (soft delete + history table).
- Java
    1. Phân biệt **`==` vs `equals()`** trong Java. Khi nào nên override `equals()` và `hashCode()`?
    2. `String`, `StringBuilder`, `StringBuffer`: điểm khác biệt, thread-safety và hiệu năng.
    3. **Autoboxing / unboxing** có thể gây vấn đề gì không? Cho ví dụ.
    4. Giải thích **immutability** trong Java. Lợi ích và cách tạo class immutable.
    5. Phân biệt **abstract class vs interface** (Java 8+) và **default methods**.
    6. `final`, `finally`, `finalize()` khác nhau như thế nào?
    7. **Varargs** hoạt động thế nào bên dưới JVM?
    8. **Generics type erasure** là gì? Tại sao phải có?
    9. Sự khác nhau giữa **`List<?>`, `List<Object>`, `List<T>`**.
    10. So sánh **HashMap vs TreeMap vs LinkedHashMap**: khi nào dùng mỗi loại?
    11. **ConcurrentHashMap internals**: làm sao thread-safe mà không lock toàn bộ map?
    12. Sự khác nhau giữa **`ArrayList` vs `LinkedList`** về performance.
    13. Viết code để **thread-safe iterate + modify collection**.
    14. Phân biệt **`synchronized` vs ReentrantLock**. Khi nào dùng lock fairness?
    15. `volatile` làm gì? Khi nào phải dùng `Atomic` classes?
    16. **Thread pools**: CachedPool vs FixedPool vs ScheduledPool. Khi nào dùng?
    17. **Deadlock, livelock, starvation** là gì? Làm sao debug?
    18. Giải thích **fork/join framework** và **parallel streams**.
    19. **CompletableFuture** vs traditional Future. Async exception handling thế nào?
    20. `ThreadLocal` là gì, ưu nhược điểm, use case.
    21. Giải thích **JVM memory model**: heap, stack, metaspace, permgen.
    22. **Garbage Collection**: Serial, Parallel, G1, ZGC – ưu/nhược điểm.
    23. **Strong, weak, soft, phantom references** và use case.
    24. **Escape analysis**: JVM optimize local objects ra sao?
    25. Memory leak trong Java: nguyên nhân phổ biến.
    26. Profiling Java app: công cụ và cách đọc heap / thread dump.
    27. `String` concatenation – compile-time vs runtime.
    28. JIT compiler hoạt động ra sao? Hotspot method optimization.
    29. Caching strategies: soft references vs guava cache vs Caffeine.
    30. Làm sao tối ưu **stream processing và lambda expressions**.
    31. **Reflection**: dùng reflection như thế nào và rủi ro.
    32. **Annotations**: custom annotation, retention policy, proxy usage.
    33. **Serialization**: default vs custom `readObject/writeObject`.
    34. Java Modules (JPMS): lợi ích và hạn chế.
    35. **Reactive programming** trong Java (Project Reactor, RxJava).
    36. Singleton pattern: lazy vs eager, thread-safe cách implement.
    37. Factory, Builder, Strategy, Observer – ví dụ thực tế.
    38. **Immutable object pattern** và lợi ích trong concurrency.
    39. **Dependency Injection** và cách implement không dùng framework.
    40. Microservices design: patterns liên quan caching, resiliency, async messaging.
    41. Khi nào nên override `equals` nhưng không override `compareTo`?
    42. Sự khác nhau giữa `HashSet` và `TreeSet` trong ordering và performance.
    43. Khi nào `synchronized` không đủ để bảo vệ shared state?
    44. Sự khác nhau giữa **fail-fast vs fail-safe iterators**.
    45. Viết code demo **ABA problem** trong concurrency và cách giải quyết.
- SpringBoot
    1. Giải thích **Spring Boot autoconfiguration** hoạt động thế nào? `@ConditionalOn...` dùng ra sao?
    2. `@SpringBootApplication` thực sự là gì? Có bao nhiêu annotation được composite?
    3. Spring Boot **starter** là gì và cách nó hoạt động?
    4. Giải thích **bean lifecycle**: instantiation, dependency injection, post-processing, destruction.
    5. Phân biệt **singleton, prototype, request, session scoped beans**. Khi nào dùng mỗi loại?
    6. **Profile** trong Spring Boot: cách cấu hình và override properties cho nhiều môi trường.
    7. Giải thích **constructor injection vs field injection vs setter injection**: ưu/nhược điểm.
    8. **Circular dependency** trong Spring là gì? Làm sao phát hiện và giải quyết?
    9. `@Transactional` hoạt động như thế nào? Proxy-based hay AspectJ-based?
    10. Giải thích **Spring AOP**: proxy, pointcut, advice.
    11. Làm thế nào để **custom annotation** và áp dụng aspect cho nó?
    12. **Spring Data JPA**: cách `CrudRepository` / `JpaRepository` hoạt động?
    13. Viết query **dynamic với Specification hoặc Criteria API**.
    14. Phân biệt **EntityManager vs JdbcTemplate vs NamedParameterJdbcTemplate**.
    15. Làm thế nào Spring Boot **quản lý transactions** với multiple datasources?
    16. **Optimistic vs Pessimistic locking** trong Spring Data JPA.
    17. Cấu hình **JWT authentication** trong Spring Boot.
    18. So sánh **method security (`@PreAuthorize`) vs URL security**.
    19. Cách Spring Security **prevents CSRF, XSS, Session Fixation**.
    20. Custom **UserDetailsService** và **PasswordEncoder**.
    21. Giải thích **filter chain trong Spring Security**.
    22. `@RestController` vs `@Controller` + `@ResponseBody`.
    23. Spring Boot **error handling**: `@ControllerAdvice` và `ResponseEntityExceptionHandler`.
    24. Giải thích **HATEOAS** và cách implement trong Spring Boot.
    25. **Asynchronous request handling**: `@Async`, `DeferredResult`, `CompletableFuture`.
    26. Spring Boot support **WebSocket / STOMP** – cách setup.
    27. Spring Boot với **Kafka/RabbitMQ**: cách cấu hình producer/consumer và error handling.
    28. Spring Boot **caching abstraction**: `@Cacheable`, `@CacheEvict`, `@CachePut`.
    29. Tối ưu **startup time** của Spring Boot application.
    30. Làm thế nào để **profile slow queries / performance bottleneck**.
    31. **Lazy vs Eager initialization** trong Spring Boot.
    32. Spring Boot actuator: **health, metrics, info, custom endpoints**.
    33. Phân biệt **unit test vs integration test** trong Spring Boot.
    34. Cách test **controllers** với MockMvc và @WebMvcTest.
    35. Test **services with @MockBean vs real repository**.
    36. Test **asynchronous methods** annotated with `@Async`.
    37. Làm sao để **mock SecurityContext** trong Spring Boot tests.
    38. Cấu hình **multi-tenancy** trong Spring Boot với JPA.
    39. Cách implement **retry logic** với Spring Retry hoặc AOP.
    40. Khi nào nên dùng **functional bean registration** vs annotation-based configuration.
    41. Cách Spring Boot xử lý **configuration properties binding** (`@ConfigurationProperties`).
    42. Giải thích **Spring Boot DevTools**: hot reload hoạt động thế nào?
