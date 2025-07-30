# Solve?

## 📌 Kiểu dữ liệu trong thiết kế schema

### 1. Footprint & Storage Efficiency
- Với hàng chục triệu bản ghi, việc chọn `INT` thay vì `BIGINT` giúp tiết kiệm bao nhiêu bộ nhớ? Có đáng không?
    - Nếu hiện tại id là INT và > 2 tỷ records thì sao?
        - Online Schema Change: tạo table mới với BIGINT, copy data, rename table, drop old table.
        - Vì thay đổi size nên ALTER sẽ gây block full table
- `VARCHAR(255)` vs `TEXT`: khi nào nên dùng cái nào? Ảnh hưởng đến index và sort như thế nào?
- Sử dụng `BOOLEAN` có thực sự chiếm 1 byte trên PostgreSQL/MySQL? Có nên dùng `ENUM` thay cho `VARCHAR` không?
- Kiểu `DATE`, `TIMESTAMP`, `UNIX TIME INT` – khác nhau như thế nào về kích thước và hiệu năng truy vấn?

### 2. CPU & I/O Cost
- So sánh chi phí CPU và I/O giữa truy vấn bảng có `BIGINT` vs `INT` làm khóa chính?
- Tác động của kiểu dữ liệu đến kích thước index là gì? (Hint: `UUID` làm PK nặng hơn `INT` gấp 3–4 lần)
- Kiểu dữ liệu ảnh hưởng như thế nào đến caching (cache line alignment, index fit in memory)?

### 3. Index & Query Plan Impact
- Kiểu `TEXT` hoặc `JSONB` có thể được index như thế nào? 
  - Partial Index? 
  - GIN/GiST in Pg, MySQL recommend apply CDC with external tools
  - Text index in mongoDB
  - Fuzzy search, full-text search
- Nếu một cột thường lọc theo range, kiểu `DATETIME` hay `INT` tốt hơn? Tại sao?
- Composite index với cột `VARCHAR(200)` ảnh hưởng gì tới performance nếu sort/join?

### 4. Evolution & Migration
- Việc thay đổi kiểu dữ liệu từ `VARCHAR(100)` sang `TEXT` hoặc `INT → BIGINT` có downtime không? Tác động đến hệ thống hiện tại?
- Có chiến lược nào để migrate kiểu dữ liệu zero-downtime không?
- Dùng kiểu cố định ngay từ đầu (ví dụ: `BIGINT`) có thực sự “an toàn” hơn về lâu dài?

### 5. Semantics & Correctness
- Kiểu `ENUM` giúp enforce business logic tốt hơn không? Có nên dùng ở DB layer không?
- Khi nào nên để application kiểm tra logic thay vì rely vào kiểu dữ liệu trong schema?
- Sử dụng kiểu dữ liệu `NUMERIC` thay vì `FLOAT/DOUBLE` có ảnh hưởng gì tới accuracy trong use-case tài chính?
  - IEEE 754

### 6. Special Case – UUID, JSONB, ARRAY
- UUID v4 vs INT làm primary key: So sánh về performance và index bloat?
- Khi nào nên sử dụng `JSONB` thay vì chia table nhỏ? (Trade-off giữa flexibility và truy vấn chậm)
- `ARRAY` trong PostgreSQL có nên dùng không? Có ảnh hưởng gì đến normal form, query planner?

### 7. Real-World Benchmarking
- Bạn có từng benchmark hai bảng giống nhau, chỉ khác kiểu dữ liệu để đo hiệu năng không?
- Có hiểu và biết cách dùng các công cụ như `pgbench`, `sysbench`, `EXPLAIN ANALYZE`, `perf top`?

## 🚀 Checklist – Kiểm soát I/O & Giảm Latency ở Scale lớn (High-Throughput DB)

### 1. Cấu trúc dữ liệu & Storage Engine
- Hiểu rõ storage engine đang dùng (PostgreSQL: heap, MySQL: InnoDB/B+Tree...)
- Tránh random I/O bằng cách dùng access pattern tuần tự (bulk insert, scan theo index)
- Giảm block churn bằng thiết kế bảng nhỏ gọn (narrow table)

### 2. Index & Access Path
- Index fit into memory? Nếu không → tăng random I/O
  - Cách hoạt động cụ thể của B-tree traversal và I/O page.
- Sử dụng covering index để tránh truy cập data page
- Partial index cho hot subset giúp giảm scan full index
- Tránh index không cần thiết (I/O overhead khi write/update)

### 3. Caching & Buffer Pool
- Theo dõi cache hit ratio (buffer pool hit %)
- Tối ưu working set vừa đủ để cache vào memory
- Dùng Redis/memcached nếu access pattern phù hợp
- Cân nhắc pinned table/index vào memory nếu hệ quản trị hỗ trợ (Oracle, SQL Server...)

### 4. Sequential vs Random Access
- Tránh access theo UUID → gây random seek (so với auto-increment INT hoặc time-based ID)
- Bulk update/delete gây I/O spike → dùng batching và throttling
- Dùng table partitioning để tránh full scan toàn bảng

### 5. WAL (Write-Ahead Logging) & Checkpoint
- Theo dõi WAL size growth, checkpoint interval, checkpoint spikes
- Tối ưu wal_buffers, wal_compression, wal_writer_delay (DB-specific tuning)
- Tránh large uncommitted transactions → tăng WAL pressure

### 6. Vacuum & Bloat (PostgreSQL)
- Tối ưu autovacuum thresholds để không làm chậm query
- Theo dõi dead tuples, % table bloat, index bloat
- Partitioning hoặc time-based table rotation để tránh update nhiều trên cùng page

### 7. Read-Write Path Separation
- Replica cho read-heavy workload → giảm latency & IOPS trên primary
- Logical sharding: ghi vào node khác, đọc từ node khác
- Background job tách khỏi real-time transaction (outbox pattern, async jobs)

### 8. Hardware / IOPS Layer
- Theo dõi IOPS, latency per operation (via cloud metrics, e.g. AWS CloudWatch, `iostat`, `vmstat`)
- SSD vs HDD ảnh hưởng rõ rệt đến random access latency
- Định kỳ stress-test DB dưới tải cao để biết giới hạn IOPS, buffer pool, flush rate

### 9. Query Design & Batching
- Tránh N+1 queries → dùng JOIN, subquery, preloading
- Batch insert/update/delete theo nhóm nhỏ (ví dụ: 500–1000 record/lần)
- Tối ưu pagination để tránh offset lớn (seek pagination với WHERE + ORDER BY)

## ❓Câu hỏi đào sâu – Hiểu nguyên nhân và kiểm soát I/O

- [ ] Tại sao index quá lớn không fit memory lại làm chậm truy vấn dù đã có index?
- [ ] Nếu query cache hit cao mà vẫn chậm, vấn đề là gì? Có thể là I/O storm từ checkpoint?
- [ ] Điều gì xảy ra nếu VACUUM chạy trong giờ cao điểm? Tác động đến latency?
- [ ] Truy vấn đọc có thể gây ghi vào disk không? (Hint: temporary sort, spill to disk)
- [ ] Làm sao phát hiện I/O bound query vs CPU bound query?
- [ ] WAL log có thể gây chậm insert không? Tại sao?
- [ ] Offset-based pagination chậm khi nào? Seek-pagination có giải pháp gì?

## 🗂️ Checklist – Composite, Partial, and Covering Index Optimization

### 1. Composite Index (Multi-column Index)
- [ ] Đặt đúng thứ tự cột theo tần suất lọc (`WHERE` trước, `ORDER BY` sau)
- [ ] Tránh tạo index có cột ít selectivity đứng trước (vd: status, type)
- [ ] Hiểu “leftmost prefix” rule – query phải dùng từ cột đầu tiên của index
- [ ] Dùng composite index thay vì nhiều index đơn để tránh index merge scan chậm

### 2. Partial Index (Conditional Index)
- [ ] Chỉ tạo index cho subset dữ liệu được truy cập nhiều (ví dụ: `WHERE is_active = true`)
- [ ] Giảm kích thước index và tăng tốc độ write/update
- [ ] Cần phân tích trước access pattern để tránh miss index khi query không match điều kiện

### 3. Covering Index (Index-only Scan)
- [ ] Index bao gồm tất cả cột trong `SELECT` → tránh truy cập bảng chính
- [ ] Giảm I/O vì query chỉ cần đọc index
- [ ] Tốt với read-heavy, latency-sensitive query (vd: mobile API)
- [ ] Cân nhắc trade-off: index lớn hơn → tăng thời gian ghi

### 4. Index Evaluation & Maintenance
- [ ] Dùng `EXPLAIN` để xác định query có sử dụng đúng index không
- [ ] Theo dõi index scan vs seq scan (PostgreSQL: `pg_stat_user_tables`, `pg_stat_user_indexes`)
- [ ] Xóa index không được dùng thường xuyên (index bloat, ghi chậm)
- [ ] Kiểm tra index overlap – tránh tạo nhiều index gần giống nhau

### 5. Index on Expressions & Functions
- [ ] Dùng index trên biểu thức nếu query thường xuyên lọc theo hàm (vd: `lower(email)`)
- [ ] PostgreSQL: `CREATE INDEX ON users (lower(email));`
- [ ] Chỉ nên dùng nếu thật sự có lợi vì sẽ tạo index riêng biệt

## ❓Câu hỏi tự kiểm tra chuyên sâu

### Composite Index
- [ ] Query `WHERE status = 'active' AND created_at > NOW() - 7d` có tận dụng index `(created_at, status)` không?
- [ ] Nếu đổi thứ tự index thành `(status, created_at)`, chuyện gì xảy ra?
- [ ] Có nên tạo nhiều index cho từng tổ hợp? Làm sao đo tính hiệu quả?

### Partial Index
- [ ] Nếu chỉ 10% bản ghi có `status = 'active'`, partial index giúp gì?
- [ ] Điều gì xảy ra nếu query không luôn có điều kiện phù hợp partial index?
- [ ] Có công cụ/tình huống nào giúp phát hiện query bị “miss” partial index không?

### Covering Index
- [ ] `SELECT id, name FROM users WHERE email = ?` có thể dùng index-only scan không?
- [ ] Nếu có thêm `created_at` trong SELECT mà index không có → có fallback về table scan không?
- [ ] Trong workload write-heavy, có nên lạm dụng covering index không?

### Tuning & Trade-offs
- [ ] Làm sao xác định khi nào nên thay index đơn bằng composite index?
- [ ] Bao nhiêu index là “quá nhiều”? Có rule-of-thumb hoặc chỉ số theo dõi không?
- [ ] Việc thêm một index mới ảnh hưởng như thế nào đến write TPS và VACUUM?

## 🧩 Checklist – Normalized vs. Denormalized Schema Design

### 1. Hiểu rõ đặc điểm chuẩn hóa
- [ ] Biết áp dụng các dạng chuẩn từ 1NF đến 3NF (và 5NF nếu cần)
- [ ] Dùng chuẩn hóa để loại bỏ redundancy, tránh data inconsistency
- [ ] Phân tích functional dependency trước khi chia bảng
- [ ] Chuẩn hóa giúp dễ maintain, hỗ trợ transactional update chính xác

### 2. Khi nào nên Denormalize?
- [ ] Khi cần tăng hiệu suất truy vấn read-heavy (dashboard, analytics, API response)
- [ ] Khi số lượng join quá nhiều → gây chậm (JOIN trên bảng lớn)
- [ ] Khi hệ thống phân tán không dễ thực hiện JOIN cross-node
- [ ] Khi tính chính xác real-time không cần thiết (VD: cache, materialized view)

### 3. Các hình thức denormalization
- [ ] Lưu dư thừa field (ví dụ: tên user trong đơn hàng)
- [ ] Embed sub-object (JSON/JSONB field trong PostgreSQL, Mongo)
- [ ] Tạo pre-joined materialized table / view
- [ ] Snapshot dữ liệu từ service khác (Data Duplication across boundaries)

### 4. Đánh giá trade-off kỹ lưỡng
- [ ] Denormalization tạo ra vấn đề đồng bộ dữ liệu? Có cần job sync định kỳ?
- [ ] Có cần transactional consistency không? (Nếu có → phải dùng outbox, saga...)
- [ ] Có nên để client đọc từ view đã pre-computed để giảm JOIN thời gian thực?
- [ ] Có batch job nào sẵn sàng refresh data định kỳ để đảm bảo tính đúng?

### 5. Đánh giá theo Use Case cụ thể
- [ ] API latency yêu cầu < 100ms? Denormalized có thể là lựa chọn hợp lý
- [ ] Truy vấn analytics (group by, aggregate) → ưu tiên schema dạng wide-table
- [ ] Dữ liệu cần phân tán theo tenant, theo khu vực → giảm JOIN giữa các shard
- [ ] Trường hợp cần full ACID và integrity → ưu tiên normalized + transaction chuẩn

### 6. Các pattern hỗ trợ
- [ ] Dùng Materialized View để giữ performance nhưng vẫn tránh query quá nặng
- [ ] CDC (Change Data Capture) để sync giữa bảng normalized và bảng denormalized
- [ ] Outbox Pattern để đảm bảo sync giữa service A (normalized) → service B (denormalized copy)
- [ ] Dual-write alerting để phát hiện sai lệch trong bảng gốc vs bảng copy

## ❓Self-Assessment – Suy luận và đánh đổi

- [ ] Dữ liệu bạn thiết kế có bao nhiêu quan hệ 1-N hoặc N-N? Có thật sự cần JOIN khi truy vấn không?
- [ ] Hệ thống của bạn read-heavy hay write-heavy? (Write-heavy thường chọn normalized)
- [ ] Khi denormalized, bạn có cơ chế nào để cập nhật dữ liệu đúng lúc? (trigger, job, CDC?)
- [ ] Nếu có conflict giữa tốc độ và tính đúng đắn – team bạn ưu tiên cái nào? Có rõ ràng không?
- [ ] Bạn có sẵn sàng chấp nhận “eventual consistency” nếu chọn phi chuẩn hóa?
- [ ] Query join 4–5 bảng với mỗi bảng vài triệu bản ghi: nên dùng bảng gộp sẵn hay tối ưu index join?
- [ ] Dữ liệu người dùng hiển thị kèm avatar, số bài viết, điểm thành viên → tất cả join hay lưu cache dưới dạng bảng `user_profile_view`?

| Tiêu chí          | Normalized           | Denormalized                          |
| ----------------- | -------------------- | ------------------------------------- |
| Tính toàn vẹn     | ✅ Cao                | ⚠️ Dễ lệch                            |
| Tốc độ đọc        | ⚠️ Nhiều join → chậm | ✅ Nhanh                               |
| Tốc độ ghi        | ✅ Tốt                | ⚠️ Phức tạp (multi write)             |
| Tách biệt concern | ✅ Dễ tổ chức         | ⚠️ Duplicated logic                   |
| Thích hợp cho     | OLTP (transactional) | OLAP (reporting, analytics), API read |
| Dễ shard DB       | ⚠️ JOIN bị giới hạn  | ✅ Tách node dễ hơn                    |

## 🔥 Checklist – Hotspot & Skewed Access Pattern

### 1. Nhận diện pattern không đều
- [ ] Có bảng hoặc shard nào ghi đọc nhiều hơn hẳn phần còn lại?
- [ ] Truy cập dồn vào một vài giá trị `user_id`, `product_id`, `tenant_id`?
- [ ] Có nhiều ghi vào một row (counter, inventory, leaderboard)?
- [ ] Load chủ yếu đến từ một time range gần nhất? (recent-only writes)

### 2. Phát hiện tại runtime
- [ ] Theo dõi phân phối truy cập theo key (histogram/tracing)
- [ ] Kiểm tra log/metrics: lock wait time, write latency, IOPS per shard
- [ ] Tìm xem có thread pool hoặc worker queue nào tắc ở một shard

### 3. Pattern phổ biến gây hotspot
- [ ] Auto-increment ID → insert toàn bộ vào cuối → I/O hotspot, index bloat
- [ ] Order by created_at DESC LIMIT 10 → scan trên partition mới nhất
- [ ] Access theo user ID trong các hệ thống multi-tenant
- [ ] Ghi log, audit, hoặc event stream vào cùng bảng, không phân vùng

### 4. Cách xử lý & thiết kế phòng ngừa
- [ ] Dùng key hashing / salted key để phân tán truy cập (user123 → user123#1, user123#2)
- [ ] Random ID (UUID v4) thay vì sequential ID nếu cần phân tán insert
- [ ] Partition theo thời gian + rotate partition định kỳ (vd: daily table per month)
- [ ] Shard dựa trên hash(user_id) hoặc tenant_id nếu skew nặng

### 5. Mitigation kỹ thuật
- [ ] Dùng Redis `INCR` để tách ghi counter khỏi DB chính
- [ ] Pre-aggregate hoặc queue hóa dữ liệu để giảm ghi đồng thời
- [ ] Background job gom ghi nhiều record lại (batching, debouncing)
- [ ] Cân bằng lại shard nếu skew quá cao (manual resharding, consistent hashing)

### 6. Tools & metrics nên theo dõi
- [ ] IOPS / QPS / latency theo shard (trong Prometheus, CloudWatch, etc.)
- [ ] DB lock contention metrics (PostgreSQL: `pg_locks`, `pg_stat_activity`)
- [ ] Cache hit rate theo key group – nếu cache bị hotspot sẽ có eviction nhanh

## ❓Câu hỏi tự kiểm tra hiểu biết sâu

- [ ] Có bao nhiêu bảng trong hệ thống bạn có khả năng trở thành bottleneck do access skew?
- [ ] Khi `ORDER BY created_at DESC LIMIT 10`, hệ thống của bạn xử lý thế nào khi có hàng tỷ bản ghi?
- [ ] Trong hệ thống phân tán, bạn làm sao để tránh shard chứa quá nhiều data hoặc quá nhiều traffic?
- [ ] Nếu bạn dùng auto-increment ID → có dẫn đến insert hotspot ở cuối bảng không?
- [ ] Có từng gặp lock contention do nhiều transaction update cùng một row? Cách bạn xử lý?
- [ ] Nếu có top 1% user account chiếm 70% traffic, bạn thiết kế schema và cache như thế nào?
- [ ] Làm sao để phát hiện access skew trước khi hệ thống chậm rõ rệt?

## 🧟 Checklist – Data Bloat & Dead Tuples (MVCC Systems)

### 1. Nhận biết triệu chứng bloat
- [ ] Query ngày càng chậm dù dữ liệu không tăng
- [ ] Disk usage tăng bất thường nhưng `row_count` không đổi
- [ ] EXPLAIN cho thấy Seq Scan dù có index
- [ ] VACUUM logs cho thấy dead tuples nhiều

### 2. Cơ chế gây bloat
- [ ] DB dùng MVCC → mỗi UPDATE / DELETE tạo bản ghi cũ (dead tuple)
- [ ] Nếu VACUUM không chạy kịp → dead tuples không bị reclaim
- [ ] Index bloat do dead index entries (UPDATE index column hoặc DELETE)

### 3. Giám sát & đo đạc
- [ ] PostgreSQL: theo dõi `pg_stat_user_tables.dead_tup` và `pgstattuple` extension
- [ ] So sánh size thực tế vs. expected (`pg_table_size` vs `count(*)`)
- [ ] Dùng `pg_repack` để phân tích index bloat

### 4. VACUUM & Autovacuum tuning
- [ ] Điều chỉnh `autovacuum_vacuum_threshold`, `scale_factor` theo bảng lớn
- [ ] Dùng `vacuum_cost_limit` & `vacuum_cost_delay` để tránh làm nghẽn hệ thống
- [ ] Cân nhắc manual `VACUUM ANALYZE` định kỳ trên bảng critical

### 5. Partitioning để hạn chế bloat
- [ ] Partition bảng lớn theo `time`, `user_id`, etc. → VACUUM nhanh, bloat localized
- [ ] Xoá dữ liệu cũ bằng DROP PARTITION thay vì DELETE

### 6. Xử lý index bloat
- [ ] Reindex định kỳ bảng lớn có update/delete thường xuyên
- [ ] Cân nhắc bỏ index ít dùng – mỗi index bị UPDATE gây overhead

### 7. Migration & Table Rewrite
- [ ] Dùng `CLUSTER` hoặc `pg_repack` để tái tổ chức bảng mà không downtime
- [ ] Tránh `VACUUM FULL` trong production nếu không thể chấp nhận lock

### 8. Tránh tạo bloat ngay từ đầu
- [ ] Tránh UPDATE heavy trên bảng có nhiều text / blob → dùng append-only hoặc write-ahead table
- [ ] Ghi đè bằng INSERT + soft-delete nếu access pattern phù hợp
- [ ] Định nghĩa trigger để archive dữ liệu cũ sang bảng riêng

## ❓Câu hỏi để tự kiểm tra hiểu biết chuyên sâu

- [ ] Bạn có biết UPDATE thực chất là DELETE + INSERT trong PostgreSQL?
- [ ] Autovacuum trong PostgreSQL chạy dựa trên logic gì? Có ảnh hưởng gì tới latency?
- [ ] Khi nào cần dùng `VACUUM FULL` vs. `pg_repack`? Ưu/nhược điểm của mỗi cách?
- [ ] Có nên tạo trigger VACUUM riêng cho bảng critical không? Rủi ro là gì?
- [ ] Bạn có dashboard nào hiển thị dead tuples theo thời gian?
- [ ] Đã từng gặp index bloat mà EXPLAIN không dùng index? Giải pháp?
- [ ] Làm sao xác định một bảng đang có bloat nguy hiểm nếu không nhìn thấy trong performance chart?

| Công cụ                      | Mục đích                               |
| ---------------------------- | -------------------------------------- |
| `pgstattuple`                | Ước lượng bloat của table/index        |
| `pg_stat_user_tables`        | Số lượng dead tuples theo bảng         |
| `pg_repack`                  | Repack table/index mà không downtime   |
| `VACUUM VERBOSE`             | Hiển thị chi tiết reclaim              |
| `EXPLAIN (ANALYZE, BUFFERS)` | Xác định full scan, index inefficiency |

| Nếu...                                           | Thì...                     |
| ------------------------------------------------ | -------------------------- |
| `dead_tuples > 20% row_count`                    | → cần VACUUM gấp           |
| Index size > 2x data size                        | → có thể bị index bloat    |
| `last_autovacuum` cách đây > 1 ngày với bảng hot | → cần tuning scale\_factor |

## 📏 Checklist – Row/Block Size Limitation

### 1. Hiểu giới hạn vật lý
- [ ] Biết rõ page size/block size mặc định của hệ quản trị DB (PostgreSQL: 8KB, MySQL InnoDB: 16KB)
- [ ] Hiểu rằng một row không nên vượt quá page size → sẽ bị TOAST (Postgres) hoặc overflow (InnoDB)
- [ ] Kiểu TEXT/BLOB lớn có thể tách ra khỏi main page → tăng I/O

### 2. Tối ưu kích thước row
- [ ] Tránh dùng quá nhiều cột TEXT/BLOB trong một row
- [ ] Dùng `VARCHAR(n)` thay vì `TEXT` nếu có thể để tối ưu planner
- [ ] Cân nhắc split bảng thành phần nóng (hot) và lạnh (cold) – vertical partitioning
- [ ] Giới hạn số lượng cột (PostgreSQL giới hạn ~1600, MySQL ~1017 tuỳ storage format)

### 3. Phân tích hệ quả khi row quá to
- [ ] Row lớn → ít row fit vào 1 block → tăng I/O và cache miss
- [ ] UPDATE row lớn → tạo dead tuples to → bloat nhanh hơn
- [ ] Index on large column → index to, gây write chậm và cache pressure
- [ ] Query thường xuyên sort trên cột lớn → spill to disk

### 4. Chiến lược thiết kế để tránh vi phạm
- [ ] Bỏ BLOB ra khỏi bảng chính → lưu đường dẫn (VD: S3 URL) hoặc sang bảng riêng
- [ ] Dùng JSONB chỉ khi thực sự cần flexibility, không nên lạm dụng
- [ ] Thiết kế cấu trúc row phù hợp cho “hot path” vs “archive path”
- [ ] Lưu dữ liệu lớn như audit log, attachment, content body ra bảng riêng liên kết bằng foreign key

### 5. Theo dõi & phát hiện sớm
- [ ] Sử dụng `pg_column_size()` và `pg_total_relation_size()` để đo row size
- [ ] Theo dõi table scan performance, cache hit ratio, block read %
- [ ] Theo dõi query có `TOAST fetch` nhiều (PostgreSQL)

### 6. Tối ưu hóa TOAST (PostgreSQL specific)
- [ ] Cấu hình TOAST threshold nếu bạn muốn chủ động nén hoặc tránh nén
- [ ] TOAST compression ảnh hưởng đến CPU/I/O trade-off – cần đo

## ❓Câu hỏi để kiểm tra hiểu biết sâu

- [ ] Một row 10KB sẽ được lưu như thế nào trong PostgreSQL? (TOAST behavior)
- [ ] Nếu UPDATE một row lớn, có bao nhiêu byte ghi xuống disk? Có tạo dead tuple lớn không?
- [ ] Vertical partitioning có giúp gì nếu query thường xuyên truy cập 3/50 cột?
- [ ] Khi nào nên dùng TEXT / BLOB trong bảng chính, khi nào nên di chuyển?
- [ ] Index trên `VARCHAR(2000)` có thực sự hiệu quả không? Tại sao thường không?
- [ ] Làm sao để đo size của từng row trong bảng? Làm sao biết bảng nào có row to bất thường?
- [ ] Nếu bảng bạn chiếm 200GB nhưng row_count chỉ ~1 triệu – chuyện gì đang xảy ra?

## ⚙️ Checklist – Schema Change Cost in Large DBs

### 1. Hiểu tác động của schema change
- [ ] Biết rõ loại schema change nào gây lock table (ADD COLUMN có default, DROP COLUMN, ALTER TYPE)
- [ ] Đánh giá tác động downtime: có gây lock table, ảnh hưởng transaction không?
- [ ] Hiểu hệ quản trị DB support change online / offline như thế nào? (PostgreSQL, MySQL, etc.)

### 2. Chiến lược chuẩn bị trước migration
- [ ] Đánh giá quy mô dữ liệu cần thay đổi (row count, table size)
- [ ] Tạo backup, snapshot để rollback trong trường hợp failure
- [ ] Phân tích ảnh hưởng với các service downstream (API, reporting, batch jobs)

### 3. Các chiến thuật giảm thiểu downtime
- [ ] Sử dụng **Zero-Downtime Migration Patterns**:  
  - Thêm cột mới NULLABLE trước  
  - Viết code song song: đọc/ghi cả cũ và mới  
  - Dần migrate dữ liệu trong background  
  - Sau cùng, chuyển read/write sang cột mới  
  - Xóa cột cũ sau khi confirm an toàn
- [ ] Dùng **pt-online-schema-change** (MySQL), **gh-ost**, **pg_repack** (PostgreSQL)
- [ ] Dùng schema versioning & feature flags kết hợp deploy code & DB

### 4. Đối phó với schema migration phức tạp
- [ ] Phân chia migration thành các bước nhỏ, đơn giản
- [ ] Giới hạn batch update trong transaction nhỏ
- [ ] Dùng job chạy batch ngoài giờ cao điểm
- [ ] Đo lường & theo dõi thời gian thực hiện từng bước

### 5. Phân tích các loại thay đổi schema phổ biến & rủi ro
- [ ] ADD COLUMN có default không NULL → gây rewrite toàn bảng
- [ ] CHANGE DATA TYPE → có thể gây full rewrite hoặc lock
- [ ] DROP COLUMN → có thể gây lock hoặc làm trigger bloat
- [ ] CREATE INDEX → có thể chạy concurrently không? (PostgreSQL có CONCURRENTLY)
- [ ] Thay đổi PRIMARY KEY hoặc UNIQUE constraints → rất phức tạp

### 6. Backup & Recovery
- [ ] Luôn đảm bảo có backup full hoặc incremental trước migration
- [ ] Có kế hoạch rollback rõ ràng nếu migration thất bại

### 7. Tài liệu & communication
- [ ] Document đầy đủ từng bước migration, impact, thời gian dự kiến
- [ ] Thông báo tới team dev, QA, Ops về downtime & risk
- [ ] Có plan test post-migration (data correctness, perf regression)

## ❓Câu hỏi tự đánh giá

- [ ] Bạn đã bao giờ làm migration bảng > 1 tỷ bản ghi chưa? Chiến lược của bạn là gì?
- [ ] Làm sao để thêm một cột NOT NULL có default trong bảng lớn mà không lock table?
- [ ] Bạn biết những công cụ nào hỗ trợ migration online cho MySQL/PostgreSQL?
- [ ] Cách xử lý code khi database schema thay đổi (feature flag, dual read/write)?
- [ ] Có khi nào bạn phải rollback migration? Làm sao để rollback an toàn?
- [ ] Bạn có đo đạc ảnh hưởng migration tới latency, throughput trong hệ thống không?
- [ ] Khi migration làm tăng IO rất nhiều, bạn có biện pháp nào để giảm thiểu ảnh hưởng?

| Công cụ / Kỹ thuật                | Mô tả                                           |
| --------------------------------- | ----------------------------------------------- |
| pt-online-schema-change (Percona) | Thay đổi schema online trên MySQL               |
| gh-ost (GitHub)                   | Tool thay đổi schema online, hạn chế lock       |
| pg\_repack (PostgreSQL)           | Xóa bloat, tái cấu trúc bảng không lock         |
| CONCURRENTLY Index (PostgreSQL)   | Tạo index không lock table                      |
| Feature Flags + Dual Writes       | Code hỗ trợ schema song song, gradual migration |

## 🔍 Checklist – Cardinality & Selectivity Awareness

### 1. Hiểu rõ khái niệm
- [ ] Biết định nghĩa Cardinality & Selectivity
- [ ] Biết cách đo cardinality & selectivity trên các cột chính (PK, FK, indexed columns)
- [ ] Hiểu ảnh hưởng của cardinality thấp vs cao đến index usage

### 2. Đo đạc & phân tích dữ liệu
- [ ] Dùng thống kê DB (PostgreSQL `ANALYZE`, MySQL `ANALYZE TABLE`) để thu thập stats
- [ ] Xem số distinct values (`COUNT(DISTINCT col)`) và phân phối dữ liệu
- [ ] Hiểu skew trong phân phối giá trị ảnh hưởng đến selectivity

### 3. Ứng dụng trong thiết kế index
- [ ] Chỉ tạo index trên các cột có cardinality cao (ví dụ status boolean thường không hiệu quả)
- [ ] Dùng composite index hợp lý với cột có selectivity cao đứng trước
- [ ] Cân nhắc partial index cho các điều kiện filter phổ biến với selectivity cao
- [ ] Tránh index trên cột có selectivity thấp (ví dụ: gender, boolean, trạng thái rất phổ biến)

### 4. Viết query tối ưu dựa trên awareness này
- [ ] Dùng filter có selectivity cao để giảm lượng data scan
- [ ] Kiểm tra kế hoạch query (`EXPLAIN ANALYZE`) để xem DB chọn index nào
- [ ] Dùng statistics hints hoặc reindex nếu stats không phản ánh đúng thực tế

### 5. Giám sát và cập nhật statistics
- [ ] Đảm bảo chạy analyze định kỳ, nhất là sau batch insert/update/delete lớn
- [ ] Theo dõi query plan thay đổi sau khi stats update
- [ ] Dùng extension hoặc công cụ bên ngoài để theo dõi skew & distribution

### 6. Các vấn đề phổ biến
- [ ] Index không được dùng do stats sai hoặc cardinality thay đổi nhiều
- [ ] Query plan chọn full scan do selectivity thực tế thấp hơn dự kiến
- [ ] Phân phối dữ liệu bị skew khiến một số index trở nên kém hiệu quả
- [ ] Cardinality ảo (ví dụ dữ liệu null nhiều, default values)

## ❓Câu hỏi tự đánh giá

- [ ] Cardinality của cột `status` (boolean) cao hay thấp? Nên index không?
- [ ] Làm sao DB sử dụng cardinality để chọn plan scan index hay sequential scan?
- [ ] Bạn biết cách xem selectivity trong `EXPLAIN` output như thế nào?
- [ ] Có trường hợp nào composite index không được dùng do thứ tự cột không phù hợp?
- [ ] Khi dữ liệu phân phối skewed, bạn làm gì để cải thiện performance?
- [ ] Dữ liệu NULL nhiều có ảnh hưởng như thế nào đến cardinality và index?
- [ ] Bạn đã bao giờ tái tạo thống kê (ANALYZE) để cải thiện query plan chưa?

| Công cụ / Lệnh                      | Mục đích                                  |
| ----------------------------------- | ----------------------------------------- |
| `ANALYZE` (PostgreSQL/MySQL)        | Thu thập thống kê bảng                    |
| `EXPLAIN ANALYZE`                   | Xem query plan và selectivity             |
| `pg_stats` view (PostgreSQL)        | Thống kê chi tiết cardinality & histogram |
| `SHOW INDEX` / `SHOW STATS` (MySQL) | Kiểm tra index stats                      |
| `COUNT(DISTINCT column)`            | Xác định cardinality thủ công             |
