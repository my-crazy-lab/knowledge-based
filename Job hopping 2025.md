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
- some infra need diving
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
