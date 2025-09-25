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
- [x]  Partition & replication Kafka
- [x]  **Saga Pattern** (orchestration vs choreography)
- [x]  **CQRS + Event Sourcing**.
- [x]  **Outbox Pattern** (DB + message broker integration)
- [x] Patterns & anti-patterns in DS and MS from  case study
- Mongodb
    1. MongoDB lưu dữ liệu theo **BSON**. Tại sao chọn BSON thay vì JSON hay binary khác? Ưu/nhược về performance và storage?
    2. WiredTiger storage engine tối ưu đọc/ghi bằng cơ chế **document-level locking** thay vì collection/db lock. Ưu/nhược điểm?
    3. Tại sao MongoDB lại thiết kế **Oplog (operation log)** thay vì **WAL** truyền thống như Postgres?
    1. Làm sao tối ưu query khi MongoDB không có JOIN như RDBMS? Bạn sẽ chọn **denormalization** hay **manual reference**?
    2. Giải thích cơ chế **covered query** và lợi ích của nó.
    3. TTL index và partial index dùng trong trường hợp nào để giảm storage?