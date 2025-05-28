# Ontology

## So sánh Ontology với Taxonomy và Schema

| Tiêu chí       | Ontology                                                                              | Taxonomy                                                 | Schema                                                                       |
| -------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Định nghĩa** | Mô hình tri thức định nghĩa các khái niệm, thuộc tính, quan hệ và luật trong một miền | Cấu trúc phân cấp phân loại các khái niệm hoặc đối tượng | Cấu trúc dữ liệu định nghĩa cách tổ chức dữ liệu (ví dụ: cơ sở dữ liệu, XML) |
| **Phạm vi**    | Rộng và phức tạp, mô tả chi tiết quan hệ và thuộc tính                                | Hẹp hơn, tập trung vào quan hệ phân loại (cha - con)     | Tập trung vào cấu trúc dữ liệu, không mô tả quan hệ phức tạp                 |
| **Quan hệ**    | Nhiều loại quan hệ khác nhau (không chỉ phân loại)                                    | Quan hệ phân loại dạng cây (hierarchy)                   | Quan hệ giữa các trường dữ liệu, bảng dữ liệu                                |
| **Mục đích**   | Mô tả tri thức, hỗ trợ suy luận, tìm kiếm thông minh                                  | Phân loại, tổ chức thông tin thành hệ thống phân cấp     | Định nghĩa cấu trúc lưu trữ và truy xuất dữ liệu                             |
| **Phức tạp**   | Cao (bao gồm khái niệm, thuộc tính, quan hệ, luật)                                    | Thấp (chỉ phân loại theo cấp bậc)                        | Trung bình (cấu trúc dữ liệu, ràng buộc)                                     |

## RDF, OWL, RDFS 

| Thành phần | Mục đích chính                                 | Khả năng biểu diễn                                     | Độ phức tạp |
| ---------- | ---------------------------------------------- | ------------------------------------------------------ | ----------- |
| **RDF**    | Biểu diễn dữ liệu theo dạng triples            | Mô tả thực thể và quan hệ đơn giản                     | Thấp        |
| **RDFS**   | Định nghĩa cấu trúc dữ liệu, lớp và thuộc tính | Phân cấp lớp, thuộc tính, mô tả vốn từ vựng đơn giản   | Trung bình  |
| **OWL**    | Mô tả ontology phức tạp, hỗ trợ suy luận       | Mô tả các quan hệ phức tạp, ràng buộc và luật suy luận | Cao         |

## Use case in NLP and Sematic web

| Ứng dụng       | Mô tả                                                                                     | Ví dụ thực tế                   |
|----------------|-------------------------------------------------------------------------------------------|--------------------------------|
| **Trong NLP**  |                                                                                           |                                |
| Hiểu ngữ nghĩa | Ontology giúp máy tính hiểu ý nghĩa và mối quan hệ giữa các từ, cụm từ trong văn bản.      | Giải quyết đa nghĩa từ, chatbot thông minh |
| Trích xuất thông tin | Cấu trúc giúp xác định thực thể, thuộc tính, quan hệ trong văn bản để trích xuất dữ liệu. | Tạo dữ liệu huấn luyện AI       |
| Chatbot & trợ lý ảo | Hỗ trợ hiểu domain chuyên sâu, trả lời chính xác dựa trên kiến thức có cấu trúc.          | Trợ lý ảo, chatbot doanh nghiệp |
| **Trên Web**    |                                                                                           |                                |
| Định nghĩa dữ liệu có cấu trúc | Mô tả dữ liệu trên web để máy tính hiểu thay vì chỉ xử lý văn bản thô.                 | Schema.org                      |
| Tìm kiếm thông minh | Giúp công cụ tìm kiếm hiểu ngữ cảnh và trả kết quả chính xác hơn.                         | Google Rich Snippets            |
| Liên kết dữ liệu | Cho phép dữ liệu từ nhiều nguồn khác nhau liên kết và hiểu chung.                         | DBpedia                        |
| Tự động hóa tích hợp dữ liệu | Tự động hóa xử lý và tích hợp dữ liệu từ các hệ thống khác nhau.                       | Semantic Web applications       |

# Agents

## Reactive vs Cognitive

| Tiêu chí                             | Reactive Agent                                                                                        | Cognitive Agent                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Đặc điểm chính**                   | Phản ứng trực tiếp với môi trường dựa trên các quy tắc có sẵn, không lưu trữ trạng thái hoặc kế hoạch | Có khả năng suy nghĩ, lập kế hoạch, lưu trữ trạng thái và học hỏi từ môi trường |
| **Bộ nhớ**                           | Không hoặc rất hạn chế                                                                                | Có bộ nhớ để lưu trữ thông tin, trạng thái và lịch sử hành động                 |
| **Khả năng lập kế hoạch**            | Không có, chỉ phản ứng theo các kích thích hiện tại                                                   | Có khả năng dự đoán, lên kế hoạch cho các hành động trong tương lai             |
| **Độ phức tạp**                      | Đơn giản, dễ thiết kế và thực hiện                                                                    | Phức tạp, cần nhiều tài nguyên tính toán hơn                                    |
| **Phản ứng với thay đổi môi trường** | Nhanh, dựa trên các quy tắc cố định                                                                   | Linh hoạt, có thể thay đổi hành vi dựa trên học hỏi và kế hoạch                 |
| **Ví dụ**                            | Robot dò đường, hệ thống điều khiển đơn giản                                                          | Trợ lý ảo như Siri, hệ thống AI chơi cờ, chatbot nâng cao                       |


# Neural network

## Genetic Algorithm

> dựa trên cơ chế chọn lọc tự nhiên và di truyền học

1. Khởi tạo quần thể: Tạo ngẫu nhiên một tập hợp cá thể (mỗi cá thể là một lời giải tiềm năng).
2. Đánh giá fitness: Xác định mức độ “phù hợp” của mỗi cá thể với bài toán.
3. Chọn lọc (Selection): Chọn các cá thể ưu tú làm cha mẹ cho thế hệ mới.
4. Giao phối (Crossover): Kết hợp thông tin từ cha mẹ để tạo ra con cái.
5. Đột biến (Mutation): Thay đổi ngẫu nhiên một phần của cá thể để tăng sự đa dạng.
6. Thay thế thế hệ: Quần thể mới thay thế quần thể cũ, quá trình lặp lại đến khi đạt điều kiện dừng.

## Evolution Strategy  

> Mục tiêu là tìm cực trị (cực đại hoặc cực tiểu) của hàm mục tiêu bằng cách mô phỏng quá trình tiến hóa tự nhiên: sinh sản, đột biến, chọn lọc.

## Genetic Algorithm vs Evolution Strategy

- Với bài toán liên tục, các biến đầu vào có thể nhận vô số giá trị nằm giữa hai điểm, nên việc thay đổi dần dần theo số thực (như trong ES) là hợp lý, giúp thuật toán “đi dần” tới nghiệm tối ưu.
- Với bài toán rời rạc, các biến chỉ nhận giá trị tách biệt (ví dụ 0 hoặc 1), việc thêm nhiễu số thực không hợp lý vì kết quả sẽ ra giá trị không thuộc tập cho phép. GA dùng phép toán bit-flip, crossover giúp dễ dàng “điều chỉnh” cá thể theo cách phù hợp với không gian rời rạc.

| Tiêu chí                               | Genetic Algorithm (GA)                                                   | Evolution Strategy (ES)                                                           |
| -------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Đối tượng tối ưu hóa**               | Chủ yếu dùng cho các bài toán tối ưu hóa rời rạc hoặc kết hợp            | Thường dùng cho bài toán tối ưu hóa liên tục (số thực)                            |
| **Mã hóa cá thể (representation)**     | Mã hóa thường là chuỗi bit hoặc chuỗi ký tự (binary hoặc symbol strings) | Mã hóa là vector số thực (real-valued vectors)                                    |
| **Phương pháp tái tổ hợp (crossover)** | Thường sử dụng crossover làm phép lai giữa các cá thể                    | Ít dùng crossover, tập trung vào đột biến (mutation) với biến thể kích thước bước |
| **Đột biến (mutation)**                | Thường là bit-flip hoặc thay đổi nhỏ trên mã nhị phân                    | Đột biến trên vector số thực, thường theo phân phối Gaussian với sigma điều chỉnh |
| **Chọn lọc (selection)**               | Chọn lọc dựa trên fitness, dùng các phương pháp như roulette, tournament | Chọn lọc dựa trên fitness, thường là chọn μ cá thể tốt nhất từ λ cá thể sinh ra   |
| **Thể hiện cá thể**                    | Mã hóa rời rạc hoặc hỗn hợp                                              | Mã hóa số thực, dễ điều chỉnh tham số đột biến                                    |
| **Đặc điểm nổi bật**                   | Tập trung mạnh vào tái tổ hợp để tạo ra đa dạng cá thể mới               | Tập trung vào điều chỉnh bước nhảy đột biến để tìm kiếm tối ưu                    |
| **Ứng dụng phổ biến**                  | Tối ưu hóa hàm rời rạc, bài toán combinatorial                           | Tối ưu hóa liên tục, điều khiển, học máy                                          |


# Use case

## Apply into speech recognition

| Mô hình             | Đặc điểm chính                      | Mô hình tiêu biểu          |
| ------------------- | ----------------------------------- | -------------------------- |
| CNN + RNN + CTC     | Truyền thống, đơn giản, dễ hiểu     | DeepSpeech                 |
| Seq2Seq + Attention | Decoder nhìn toàn bộ context        | Listen-Attend-Spell        |
| Transformer         | Attention-based, nhanh và chính xác | SpeechTransformer, Whisper |
| Conformer           | State-of-the-art hiện tại           | Google Conformer, ESPnet   |

## NPL + Ontology

| Mục tiêu                         | Vai trò của NLP                  | Vai trò của Ontology                      |
| -------------------------------- | -------------------------------- | ----------------------------------------- |
| Hiểu câu hỏi người dùng          | Xử lý ngôn ngữ tự nhiên (NLU)    | Cung cấp tri thức nền (domain knowledge)  |
| Mapping câu hỏi → tri thức       | Named Entity Recognition, Intent | Dạng formal hóa: lớp, thuộc tính, quan hệ |
| Truy vấn và suy luận câu trả lời | Trích thông tin, sinh câu        | Truy vấn bằng SPARQL, suy diễn logic      |

## Recommendation system

| **Kỹ thuật AI**                           | **Mô tả ngắn**                                                            | **Ứng dụng cụ thể trong hệ thống gợi ý**                          |
| ----------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 🔢 **Deep Learning**                      | Dùng mạng neural để học biểu diễn phức tạp                                | DeepFM, AutoRec, Neural Collaborative Filtering (NCF)             |
| 🧠 **Reinforcement Learning**             | Gợi ý tối ưu theo phản hồi dài hạn của người dùng                         | Gợi ý theo chuỗi tương tác, đa lượt click                         |
| 🌐 **Graph Neural Networks**              | Mô hình hóa người dùng – sản phẩm như đồ thị và học theo ngữ cảnh lân cận | PinSage (Pinterest), LightGCN, GraphRec                           |
| 🧩 **Embedding học sâu**                  | Biểu diễn người dùng, item dưới dạng vector không gian ngữ nghĩa          | Word2Vec, Item2Vec, BERT embeddings (cho nội dung)                |
| 🧭 **Context-aware Models**               | Tận dụng ngữ cảnh như thời gian, vị trí, thiết bị, lịch sử                | DIN, DIEN (Alibaba), Tại thời điểm click                          |
| 🗣️ **Natural Language Processing (NLP)**  | Hiểu nội dung mô tả sản phẩm, review người dùng                           | Dùng BERT, GPT để trích rút đặc trưng nội dung gợi ý              |
| 🧠 **Knowledge Graph + Reasoning**        | Sử dụng ontology và tri thức liên kết để gợi ý có logic                   | Gợi ý sản phẩm liên quan có quan hệ tri thức (như Ontology-based) |
| 🔄 **Meta-learning / Few-shot**           | Học nhanh từ dữ liệu ít – cho user mới hoặc item mới                      | Cold-start recommendation                                         |
| 🧪 **Causal Inference**                   | Hiểu nguyên nhân thay vì chỉ dựa vào tương quan                           | Phân biệt gợi ý tốt do nội dung hay chỉ do vị trí hiển thị        |

## Scheduling

| Thành phần GA                 | Ý nghĩa trong lập lịch                                       |
| ----------------------------- | ------------------------------------------------------------ |
| 🧬 **Cá thể (chromosome)**    | Một lịch biểu cụ thể (gán job cho thời gian/tài nguyên)      |
| 🔄 **Lai ghép (crossover)**   | Trộn 2 lịch để tạo lịch mới                                  |
| ✂️ **Đột biến (mutation)**     | Đổi ngẫu nhiên 1 phần lịch để tránh local optimum            |
| 🧪 **Hàm đánh giá (fitness)** | Đo độ tốt của lịch (tổng thời gian, vi phạm ràng buộc, v.v.) |

# Khai thác dữ liệu

- Data mining: là quá trình sử dụng thuật toán, kỹ thuật thống kê và trí tuệ nhân tạo để phát hiện ra các mẫu (patterns), quy luật, mối quan hệ ẩn trong dữ liệu lớn mà con người khó nhận biết thủ công.
- Data Analysis: là quá trình xử lý, biến đổi và trực quan hóa dữ liệu để trả lời câu hỏi cụ thể hoặc hỗ trợ ra quyết định.

| Tiêu chí              | Khai phá dữ liệu (Data Mining)           | Phân tích dữ liệu (Data Analysis)            |
| --------------------- | ---------------------------------------- | -------------------------------------------- |
| 🎯 Mục tiêu chính     | Khám phá tri thức ẩn, mẫu chưa biết      | Trả lời câu hỏi cụ thể, kiểm định giả thuyết |
| 🧠 Tính phức tạp      | Cao, cần kiến thức ML, thống kê nâng cao | Vừa đến thấp, thường là thống kê cơ bản      |
| ⚙️ Công cụ/kỹ thuật    | Decision Trees, SVM, Clustering, Apriori | Excel, Pandas, Tableau, Regression           |
| 📈 Kết quả            | Mô hình, luật, nhóm, điểm bất thường     | Báo cáo, biểu đồ, bảng thống kê              |
| 💡 Khả năng dự đoán   | Có (ML-based)                            | Ít hoặc không có                             |
| 🧪 Tính khám phá      | Mạnh – phát hiện thông tin chưa biết     | Hạn chế – dựa trên giả thuyết sẵn có         |
| 🛠️ Ứng dụng phổ biến  | Phát hiện gian lận, gợi ý sản phẩm       | Phân tích doanh thu, hiệu suất nhân viên     |

## CRISP-DM (Cross-Industry Standard Process for Data Mining) 

> là một phương pháp luận chuẩn cho quy trình triển khai dự án khai phá dữ liệu (Data Mining).

Goal:
  - Tạo quy trình rõ ràng, dễ theo dõi cho dự án Data Mining.
  - Đảm bảo các bước triển khai logic, lặp lại được, hiệu quả.
  - Giúp kết nối chặt chẽ giữa nghiệp vụ và kỹ thuật.

| Bước                          | Mục đích chính                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1. **Business Understanding** | Hiểu rõ mục tiêu, yêu cầu của dự án từ góc độ nghiệp vụ. Xác định các vấn đề cần giải quyết và tiêu chí thành công. |
| 2. **Data Understanding**     | Thu thập dữ liệu ban đầu, đánh giá chất lượng dữ liệu, nhận diện các vấn đề (missing, outliers, noise).             |
| 3. **Data Preparation**       | Làm sạch, biến đổi, lựa chọn dữ liệu phù hợp để xây dựng mô hình. Bao gồm: xử lý missing, feature engineering.      |
| 4. **Modeling**               | Áp dụng các thuật toán khai phá dữ liệu, thử nhiều mô hình để tìm mô hình tốt nhất.                                 |
| 5. **Evaluation**             | Đánh giá mô hình theo tiêu chí đã đặt ra, kiểm tra xem mô hình có đáp ứng mục tiêu nghiệp vụ không.                 |
| 6. **Deployment**             | Triển khai mô hình vào thực tế: báo cáo, hệ thống tự động, dashboard, hoặc tích hợp vào ứng dụng.                   |
