# Kafka 4.0 có gì mới?

- remove zookeeper
- new protocol for consumer balance
- queue for share groups
- >=java17

# Nếu không consistency, có nên dùng Kafka? khi nao chon kafka

- Real-time Streaming
- Tích hợp và đồng bộ
- Event-Driven Architecture
- log, metrics

# KRaft vs Zookeeper

| Tiêu chí                       | **ZooKeeper**                                    | **KRaft (Kafka Raft)**                                        |
| ------------------------------ | ------------------------------------------------ | ------------------------------------------------------------- |
| **Quản lý metadata**           | Tách biệt, do ZooKeeper đảm nhiệm                | Tích hợp trong Kafka thông qua quorum controller              |
| **Cơ chế đồng thuận**          | ZAB (ZooKeeper Atomic Broadcast)                 | Raft (biến thể sự kiện của Raft)                              |
| **Kiến trúc triển khai**       | Cần cụm ZooKeeper riêng biệt                     | Không cần ZooKeeper; Kafka tự quản lý metadata                |
| **Quản lý controller**         | Một controller duy nhất, được chọn qua ZooKeeper | Quorum controller với nhiều node, hỗ trợ failover nhanh       |
| **Tính nhất quán metadata**    | Phụ thuộc vào trạng thái ZooKeeper               | Dựa trên log sự kiện và snapshot nội bộ của Kafka             |
| **Hiệu suất & độ trễ**         | Có thể bị giới hạn khi mở rộng quy mô            | Cải thiện hiệu suất, giảm độ trễ và tăng khả năng mở rộng     |
| **Độ phức tạp vận hành**       | Cần quản lý và giám sát ZooKeeper riêng          | Đơn giản hóa vận hành với một hệ thống duy nhất               |
| **Khả năng mở rộng phân vùng** | Giới hạn khoảng 200.000 phân vùng                | Hỗ trợ hàng triệu phân vùng nhờ quản lý metadata hiệu quả hơn |


# Cơ chế hoạt động của KRaft

- Quorum Controller
- Raft Protocol
- Event-Sourced Metadata

