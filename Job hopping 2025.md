# Job hopping 9/2025

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
- Replication, sharding, partitioning
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

- Failover & recovery trong DB cluster (Postgres Patroni / MongoDB ReplicaSet)
1. Patroni dựa vào etcd/Consul/Zookeeper để election. Vậy tại sao Postgres không tự có election như MongoDB? Ưu/nhược của cách tách rời DCS (Distributed Consensus Store)?
2. Trong MongoDB ReplicaSet, election dùng Raft-like algorithm. Bạn có thể giải thích chi tiết quorum, majority vote và cách nó tránh split-brain?
3. So sánh WAL replication trong Postgres với Oplog replication trong MongoDB: điểm khác biệt về **granularity**, **durability**, và **performance**.
1. Điều kiện nào gây ra split brain trong Postgres Patroni? Patroni tránh thế nào khi network partition xảy ra?
2. MongoDB xử lý tình huống network partition (primary bị mất liên lạc với một số secondary) ra sao để tránh hai primary tồn tại cùng lúc?
3. Giả sử replication lag = 10s, primary chết → một secondary được bầu lên. Điều gì xảy ra với 10s dữ liệu chưa replicate? Có cách nào đảm bảo không mất dữ liệu?
1. Khi một node quay lại sau downtime dài, tại sao Postgres có thể dùng WAL để catch-up còn MongoDB có thể phải initial sync toàn bộ dữ liệu?
2. Nếu schema thay đổi (ALTER TABLE ở Postgres, hoặc collection validator ở MongoDB), failover + recovery có những rủi ro gì?
3. Postgres synchronous replication đảm bảo consistency mạnh hơn, nhưng trade-off về latency thế nào? Bạn triển khai async hay sync trong production? Vì sao?
1. Tại sao Patroni thường đi kèm với PgBouncer/HAProxy? So sánh với cơ chế client driver tự reconnect của MongoDB. Ưu/nhược của mỗi approach?
2. Khi failover xảy ra, Postgres cần thời gian replay WAL, trong khi MongoDB dựa vào Oplog. Cái nào nhanh hơn trong workload write-heavy? Vì sao?
3. Nếu có workload đọc nhiều, bạn sẽ thiết kế read-scaling trên Patroni như thế nào? Có khác gì với việc đọc từ secondary trong MongoDB ReplicaSet?
1. Nếu cả cluster (Postgres hoặc MongoDB) restart cùng lúc, làm sao xác định được primary nào sẽ lên trước?
2. Trong trường hợp disk corruption hoặc node bị rollback dữ liệu (e.g., failover + clock skew), bạn xử lý thế nào để tránh phục hồi dữ liệu sai?
3. Có tình huống nào bạn **không nên** dùng Patroni hay ReplicaSet, mà nên chọn giải pháp khác (ví dụ Postgres Citus, MongoDB Sharded Cluster, CockroachDB, Yugabyte)?

- Elastic Search
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

- Redis
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

- SQL - PostgreSQL
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
