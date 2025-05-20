> Cấu trúc dữ liệu không khóa (lockless data structures) là một lĩnh vực quan trọng trong lập trình song song, cho phép nhiều luồng truy cập và sửa đổi dữ liệu chung mà không cần sử dụng cơ chế khóa truyền thống. Điều này giúp giảm thiểu tắc nghẽn và cải thiện hiệu suất trong các hệ thống đa luồng.

# Compare-and-Swap (CAS)

- CAS là một phép toán nguyên tử so sánh giá trị hiện tại của một biến với một giá trị mong đợi và, nếu chúng khớp, cập nhật biến đó với một giá trị mới. Đây là nền tảng cho nhiều thuật toán không khóa.

# Các mức độ không khóa

- Obstruction-free: Đảm bảo tiến trình nếu không có sự cạnh tranh từ các luồng khác.
- Lock-free: Đảm bảo rằng ít nhất một luồng sẽ tiến triển trong một khoảng thời gian hữu hạn.
- Wait-free: Đảm bảo rằng tất cả các luồng sẽ hoàn thành trong một số bước hữu hạn

| Tính chất            | Obstruction-Free         | Lock-Free           | Wait-Free         |
| -------------------- | ------------------------ | ------------------- | ----------------- |
| Có tiến triển không? | ✅ (nếu không tranh chấp) | ✅ (ít nhất 1 luồng) | ✅ (mọi luồng)     |
| Chống deadlock       | ✅                        | ✅                   | ✅                 |
| Chống starvation     | ❌                        | ❌                   | ✅                 |
| Hiệu suất            | Trung bình               | Cao                 | Thấp / khó tối ưu |
| Dễ triển khai        | Dễ                       | Trung bình          | Rất khó           |


# Pros and solutions

| Vấn đề        | Giải pháp chính                                   |
| ------------- | ------------------------------------------------- |
| **ABA**       | - Dùng version/timestamp (AtomicStampedReference) |
|               | - Tagged pointers / Pointer + version struct      |
|               | - Dùng thư viện lock-free đã xử lý ABA            |
| **Spin loop** | - Backoff strategy (sleep/yield/PAUSE)            |
|               | - Cấu trúc dữ liệu giảm tranh chấp                |
|               | - Hybrid: CAS + fallback mutex                    |
