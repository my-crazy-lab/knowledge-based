# Storage and Retrieval

- Bất kỳ loại chỉ mục nào cũng làm chậm quá trình ghi, vì chỉ mục cũng cần được cập nhật mỗi khi dữ liệu được ghi.

## Hash indexes

- phù hợp với các tình huống mà mỗi khóa được cập nhật thường xuyên
    - Ví dụ, khóa có thể là URL của một video mèo, còn giá trị là số lần nó được phát (mỗi lần người dùng nhấn nút play, số lần được tăng thêm).
    - Trong loại workload này, có rất nhiều thao tác ghi, nhưng không có quá nhiều khóa riêng biệt — tức là số lượng ghi trên mỗi khóa rất lớn, nhưng tổng số khóa có thể được giữ trong bộ nhớ.
- Vậy làm sao để không đầy đĩa?
    - Một giải pháp là chia log thành nhiều đoạn (segment) có kích thước nhất định:
        - Khi một segment đạt đến kích thước giới hạn, chúng ta đóng tệp hiện tại và ghi tiếp vào một tệp segment mới.
        - Sau đó, chúng ta thực hiện nén lại (loại bỏ các khóa trùng lặp, chỉ giữ lại bản ghi mới nhất của mỗi khóa) các segment này
    - compaction thường giúp giảm kích thước segment khá nhiều, chúng ta có thể gộp (merge) nhiều segment cùng lúc khi nén
        - run at background thread
- Bảng băm phải nằm hoàn toàn trong bộ nhớ, nên nếu bạn có quá nhiều khóa, thì không thể dùng cách này.
- Tại sao lại ghi nối tiếp (append-only)
    - Ghi nối tiếp và gộp segment là ghi tuần tự, nhanh hơn rất nhiều so với ghi ngẫu nhiên, nhất là trên ổ cứng quay truyền thống.
    - Đơn giản hóa xử lý đồng thời và phục hồi sau sự cố:
    - Gộp segment cũ giúp tránh việc tệp bị phân mảnh theo thời gian.

## SSTable(Sorted String Table) & LSM (LSM-Trees)

-  SSTable có một số lợi thế lớn so với các đoạn log sử dụng chỉ mục băm
    - Gộp các đoạn (segment) rất đơn giản và hiệu quả, ngay cả khi các file lớn hơn bộ nhớ sẵn có. Cách tiếp cận giống như thuật toán mergesort
- duy trì SSTable trong bộ nhớ
    - Khi một lệnh ghi đến, thêm nó vào một cấu trúc cây cân bằng trong bộ nhớ (ví dụ, một cây đỏ-đen). Cấu trúc này gọi là memtable.
    - Khi memtable lớn hơn một ngưỡng nhất định (thường là vài megabyte), ghi nó ra đĩa dưới dạng một file SSTable. Việc này thực hiện rất hiệu quả vì cây đã giữ các cặp key-value theo thứ tự.
    - File SSTable mới sẽ trở thành đoạn dữ liệu gần nhất (mới nhất). Trong lúc file SSTable đang được ghi ra, các ghi mới vẫn tiếp tục được thêm vào một memtable mới.
    - Để xử lý truy vấn đọc, đầu tiên kiểm tra trong memtable, sau đó đến file đoạn mới nhất trên đĩa, rồi các đoạn cũ hơn, v.v.
    - Thỉnh thoảng, chạy quá trình gộp và nén (compaction) trong nền để gộp các file đoạn lại và loại bỏ các giá trị bị ghi đè hoặc bị xóa.

### Tạo LSM-Tree từ SSTables

`Thuật toán mô tả ở đây chính là cách mà LevelDB và RocksDB hoạt động`

- Một chỉ mục toàn văn bản phức tạp hơn nhiều so với chỉ mục key-value, nhưng vẫn dựa trên một ý tưởng giống nhau: cho một từ trong truy vấn tìm kiếm, tìm tất cả các tài liệu chứa từ đó. 
- Điều này được thực hiện bằng cấu trúc key-value, trong đó key là từ (term) và value là danh sách ID của các tài liệu chứa từ đó (postings list). 
- Trong Lucene, ánh xạ từ từ đến postings list được lưu trong các file tương tự SSTable và được gộp dần trong nền khi cần.

### Optimization

- LSM-tree có thể chậm khi tra cứu các key không tồn tại
    - bạn phải kiểm tra memtable, rồi các đoạn từ mới đến cũ (có thể phải đọc từ đĩa mỗi lần) trước khi chắc chắn key không tồn tại.
    - Bloom filter: cho biết rằng một key không tồn tại, từ đó giúp tránh nhiều lần đọc đĩa không cần thiết.
- Cũng có nhiều chiến lược khác nhau để xác định thứ tự và thời điểm gộp SSTable. Hai chiến lược phổ biến nhất là:
    - Size-tiered compaction (nén theo kích thước): các SSTable nhỏ và mới sẽ được gộp dần vào các SSTable lớn và cũ hơn.
    - Leveled compaction (nén theo tầng): phạm vi key được chia nhỏ thành các SSTable nhỏ hơn, và dữ liệu cũ được chuyển vào các “tầng” riêng biệt, giúp quá trình gộp diễn ra từ từ và ít tốn dung lượng đĩa.
    - LevelDB và RocksDB dùng leveled compaction (do đó có chữ "Level"), HBase dùng size-tiered, và Cassandra hỗ trợ cả hai.
- ý tưởng cơ bản của LSM-tree — giữ một chuỗi các SSTable được gộp dần trong nền — vẫn đơn giản và hiệu quả
- LSM-tree có thể hỗ trợ tốc độ ghi rất cao.

## BTree

- Cấu trúc chỉ mục được sử dụng rộng rãi nhất là B-tree 
- Tương tự như SSTable, B-tree giữ các cặp key-value được sắp xếp theo khóa, điều này cho phép thực hiện truy vấn theo khóa và truy vấn phạm vi (range queries) hiệu quả. Nhưng sự tương đồng gần như dừng lại ở đó: B-tree có một triết lý thiết kế rất khác.
- Các chỉ mục theo cấu trúc log phân chia cơ sở dữ liệu thành các đoạn có kích thước thay đổi, thường là vài MB trở lên, và luôn ghi đoạn đó một cách tuần tự. Ngược lại, B-tree chia cơ sở dữ liệu thành các khối cố định (fixed-size blocks) hoặc trang (pages) – truyền thống là 4 KB, đôi khi lớn hơn – và đọc/ghi từng trang một.
- Thiết kế này gần gũi hơn với phần cứng lưu trữ thực tế, vì đĩa cứng cũng được chia thành các khối có kích thước cố định.
- Bản chất của việc ghi dữ liệu trong B-tree là ghi đè lên các trang đã tồn tại trên đĩa. Điều này trái ngược hoàn toàn với các chỉ mục dạng log, vốn chỉ thêm mới (append) vào file
- một số thao tác yêu cầu cập nhật nhiều trang cùng lúc (ví dụ như khi tách trang). Nếu xảy ra crash sau khi chỉ một số trang được ghi, có thể dẫn đến chỉ mục bị hỏng.
    - Để phòng tránh điều đó, các cài đặt B-tree thường đi kèm với WAL (Write-Ahead Log) – một file ghi đè dạng append. Mỗi thay đổi trong B-tree phải được ghi vào log này trước khi áp dụng thực tế. Sau khi crash, log sẽ được dùng để phục hồi B-tree về trạng thái nhất quán.
- Tối ưu hóa B-tree
    - Copy-on-write: thay vì ghi đè trang cũ, ghi một bản mới rồi cập nhật con trỏ. LMDB dùng cách này. Rất hiệu quả cho kiểm soát đồng thời (concurrency).
    - Rút gọn khóa trong các trang nội bộ để tiết kiệm dung lượng và tăng hệ số phân nhánh.
    - Sắp xếp trang lá theo thứ tự trên đĩa để quét phạm vi nhanh hơn. Tuy nhiên, rất khó giữ được điều này khi cây thay đổi. Trong khi đó, LSM-tree dễ làm điều này hơn vì luôn ghi theo từng đoạn lớn.
    - Liên kết các trang lá bằng con trỏ trái–phải, giúp duyệt tuần tự nhanh hơn mà không cần quay lại các trang cha.
    - Biến thể như Fractal Tree áp dụng một số ý tưởng từ cấu trúc log để giảm số lần seek đĩa.

## Comparing B-Trees and LSM-Trees

- nguyên tắc chung, LSM-tree thường nhanh hơn trong các thao tác ghi, trong khi B-tree lại được cho là nhanh hơn trong các thao tác đọc 
    - Việc đọc thường chậm hơn trên LSM-tree vì cần phải kiểm tra nhiều cấu trúc dữ liệu và các SSTable ở các giai đoạn khác nhau của quá trình nén (compaction).
- B-tree cons:
    - B-tree phải ghi mỗi phần dữ liệu ít nhất hai lần: một lần vào write-ahead log (WAL) và một lần vào trang của cây, và có thể thêm một lần nữa khi các trang bị tách ra
    - Ngoài ra còn có chi phí phát sinh khi phải ghi toàn bộ một trang mặc dù chỉ thay đổi vài byte trong trang đó
    - Một số engine lưu trữ thậm chí còn ghi đè cùng một trang hai lần để tránh việc cập nhật một phần trang nếu xảy ra mất điện
- Hiện tượng một thao tác ghi vào cơ sở dữ liệu dẫn đến nhiều lần ghi ra đĩa trong suốt vòng đời của dữ liệu được gọi là **write amplification**. 
    - Đây là mối lo đặc biệt đối với ổ SSD, vì SSD chỉ có thể ghi đè các khối dữ liệu một số lần nhất định trước khi bị hao mòn.
    - Với các ứng dụng có tần suất ghi cao, điểm nghẽn hiệu năng có thể là tốc độ ghi của cơ sở dữ liệu ra đĩa.
    - write amplification có ảnh hưởng trực tiếp tới hiệu năng: hệ thống càng ghi nhiều vào đĩa thì càng xử lý được ít thao tác ghi mỗi giây trong băng thông đĩa có sẵn.
    - LSM-tree thường có khả năng duy trì tốc độ ghi cao hơn B-tree, một phần là do write amplification thấp hơn, và một phần là vì chúng ghi tuần tự các file SSTable, thay vì phải ghi đè nhiều trang như B-tree
- LSM-tree không bị giới hạn bởi cấu trúc trang và thường xuyên viết lại SSTable để loại bỏ phân mảnh, nên chúng có chi phí lưu trữ thấp hơn, đặc biệt khi sử dụng nén theo cấp độ (leveled compaction)
- LSM-tree cons:
    - quá trình nén (compaction) đôi khi có thể làm giảm hiệu năng của các thao tác đọc và ghi đang diễn ra
    - có thể xảy ra tình trạng một truy vấn cần phải đợi đĩa hoàn thành một tác vụ nén tốn tài nguyên
    - Một vấn đề khác liên quan đến nén xảy ra khi tốc độ ghi rất cao: băng thông ghi của đĩa cần được chia sẻ giữa ghi ban đầu (ghi log và flush memtable xuống đĩa) và các luồng nén đang chạy nền
        - Khi ghi vào một database còn trống, toàn bộ băng thông có thể dùng cho ghi ban đầu, nhưng khi database càng lớn thì càng cần nhiều băng thông để thực hiện nén
        - Nếu tốc độ ghi quá cao và cấu hình nén không hợp lý, có thể xảy ra tình trạng nén không theo kịp tốc độ ghi đến.
        - Thông thường, các engine dựa trên SSTable không tự động giới hạn tốc độ ghi vào, ngay cả khi nén không kịp xử lý, vì vậy cần có giám sát rõ ràng để phát hiện tình huống này
- Một lợi thế của B-tree là mỗi khóa chỉ tồn tại ở đúng một vị trí trong chỉ mục, trong khi một engine lưu trữ dạng log có thể chứa nhiều bản sao của cùng một khóa trong các segment khác nhau. Điều này làm cho B-tree trở nên hấp dẫn hơn trong các hệ quản trị CSDL có yêu cầu mạnh mẽ về giao dịch (transaction) 