# Problem around me

## Key

- Gốc rễ (nguyên lý, lịch sử hình thành)
- Ứng dụng (thực tế, liên ngành)
- Phản biện (ai nói ngược lại, tại sao?)
- Rong (Overview)| Sau (Deep)

## Bộ câu hỏi gợi trí tò mò

- Tìm điều mới, tăng emotion lên dễ khơi tò mò.
- Điều này có thể được làm theo cách khác không?
- Nay có gì lạ không, mới không, bí không?

## Thinker

## Topics for speaking

- 

## Searcher

- 10 ideas to use the code generation
- tai sao phép chia % tương đối tốn CPU hơn các phép tính nhị phân (bit).
- He thong realtime nhu stock hoat dong nhu the nao? build ntn?
- Some reasons DOM render slowly?
- :white_check_mark: render html nhieu phan tu take more times:
    - Table 1000 rows need lazy loading?
    - Or just need for image and large html?
- :white_check_mark: tai sao ung dung cua consistent hashing la: redis, distributed database like cassanra, load bnnalancing, cdn
- :white_check_mark: đọc source socket io testing chrome extension
- :white_check_mark: đọc dozzle xem nó realtime logs ntn
- :white_check_mark: docker compose run đồng thời? hoạt động bên dưới khi image build thành container name?
- :white_check_mark: ColBert?
- :white_check_mark: cách tính(best practices) confidence trong AIML cho prompt engineer
- :white_check_mark: Meteor call before pubsub is better than pure pubsub?
- :white_check_mark: Xử lý song song quy mô lớn (MPP – Massive Parallel Processing)
- :white_check_mark: 3 loai luu tru: 
    - Block
    - File
    - Object
- :white_check_mark: Lưu trữ gắn trực tiếp (DAS) và băng từ
- :white_check_mark: bảo vệ dữ liệu với RAID va cac loai
- :white_check_mark: Kafka deep diving: tai sao can, can khi nao
- :white_check_mark: Suy nghi ve solution cho RAG va prompt workflow sau 1 ngay lam viec nhu 1 real ai engineer
- :white_check_mark: feature của torch
- :white_check_mark: define questions for jinja2
- :white_check_mark: Conda là gì
- :white_check_mark: SQL lưu trữ như thế nào? có giống noSQL? lưu theo row hay column
- :white_check_mark: Objects.keys | Object.values  co tinh la loop khong
- :white_check_mark: 1 package lớn có ảnh hưởng tốc độ truyền, như payload trong http body A = 2x B
- :white_check_mark: Dung RAG nhung van khong dat ket qua mong muon khi documents nhieu va cau hoi cua User chi tiet
- :white_check_mark: List feature of Langgraph
- :white_check_mark: Optimize STT TTS and trace the bug in App: Audio detect bad in some cases (when demo)
- :white_check_mark: Cách xử lý tiếng ồn hoặc các kỹ thậut lọc âm trong speech to text?
- :white_check_mark: Write function check GPU when run model.
- :white_check_mark: write 5 agentic ai pattern for real use case.
- :white_check_mark: langchain for know what is advantage
- :white_check_mark: su dung voice co can Speech to text? Hay co model co the hieu audio va generate sang text? tuong tu nhu Vision language mode?
- :white_check_mark: Cach hieu cac thong so cua MontiAPM 
- :white_check_mark: How process bar work? how it detect the workload to estimate time?
- :white_check_mark: tai sao enable secure dns co the su dung medium? cloufare 1.1.1.1 tren browser la gi?
- :white_check_mark: pnpm update: https://github.com/pnpm/pnpm/releases?page=3
- :white_check_mark: compare peerDependencies & dependencies? when conflict?
- :white_check_mark: [Kafka 4.0 có gì mới?](./1.0.0/akmmi6.md)
- :white_check_mark: Explain: `nohup ollama pull llama4:latest > ollama_pull.log 2>&1 &` & `tail -f ollama.log`
- :white_check_mark: more details: `/etc/systemd/system/ollama.service`
- :white_check_mark: [các thuật toán liên quan cấu trúc dữ liệu không khóa (lockless data structures)](./1.0.0/byxj6f.md)
- :white_check_mark: Cac model hien tai khac nhau nhu the nao
- :white_check_mark: logic trong prompt va logic code trong orchestrator?
- :white_check_mark: [MongoDB questions checklist](./1.0.0/d886qg.md)
- :white_check_mark: [Best practices work with file transfer?](./1.0.0/lsdy45.md)
- :white_check_mark: why the redirect work in chrome, but not work in safari and opera
    - Browser Caching and Redirect Behavior
    - SSL Certificate and HTTPS Configuration
    - Reverse Proxy Configuration 
    - Content Security Policy (CSP)
- :white_check_mark: [Build encode/decode base64 with non blocking patternn](./1.0.0/r85a1o.md)
- :white_check_mark: python là ngôn ngữ single thread hay multi thread?
    - GIL – Global Interpreter Lock Python (CPython – trình thông dịch phổ biến nhất của Python) có một cơ chế gọi là GIL (Global Interpreter Lock). GIL chỉ cho phép một thread thực thi mã Python tại một thời điểm, ngay cả khi có nhiều luồng đang chạy.
    → Điều này có nghĩa là:
    - Với tác vụ CPU-bound (xử lý nặng CPU): Multi-thread trong Python không mang lại hiệu quả cao, vì các luồng bị GIL giới hạn.
    - Với tác vụ I/O-bound (đọc/ghi file, network, chờ kết quả): Multi-thread vẫn hiệu quả, vì trong thời gian chờ I/O, GIL được nhường cho luồng khác.
    - Lí do:
    - CPython — là phiên bản phổ biến nhất của Python — sử dụng reference counting (đếm số tham chiếu) để quản lý bộ nhớ.
    - Vấn đề:
        - Khi nhiều luồng cùng truy cập và thay đổi số tham chiếu của một đối tượng Python (vd: một biến hoặc danh sách), nếu không có cơ chế đồng bộ hóa (synchronization), thì rất dễ gây race condition → kết quả sai, rò rỉ bộ nhớ, hoặc crash
    - Giải pháp:
        - GIL được tạo ra để bảo vệ các thao tác không an toàn, như tăng/giảm bộ đếm tham chiếu, đảm bảo rằng chỉ một luồng được thực thi mã Python tại một thời điểm
    - Dùng multiprocessing: Thư viện multiprocessing tạo ra nhiều processes (tiến trình) riêng biệt, mỗi tiến trình có GIL riêng. Phù hợp cho tác vụ CPU-bound.
    - Dùng async/await (asynchronous programming): Hiệu quả cho tác vụ I/O-bound mà không cần dùng nhiều threads.

| Tiêu chí            | CPU-bound                         | I/O-bound                               |
| ------------------- | --------------------------------- | --------------------------------------- |
| Tài nguyên giới hạn | CPU                               | Thiết bị I/O (disk, network...)         |
| Thời gian "chờ"     | Ít hoặc không có                  | Nhiều thời gian chờ dữ liệu phản hồi    |
| Xử lý song song     | Dùng `multiprocessing` hiệu quả   | Dùng `asyncio` / `async/await` hiệu quả |
| Bị GIL ảnh hưởng?   | Có (trừ khi dùng multiprocessing) | Ít (vì thời gian chờ có thể nhường GIL) |

- :white_check_mark: work with .wav
    - Model use wav instead mp3 because(size of mp3 < wav): chất lượng cao hơn, không nén -> tốt trong huấn luyện, tổng hợp, xử lý tín hiệu	
- :white_check_mark: LLm just smart and take workflow by prompt?
- :white_check_mark: mono repo: best practices, why choose? pros / cons
- :white_check_mark: Which steps when pushing private key in git host
    - Xóa key khỏi Git history with git fitter
    - Cách hoạt động kỹ thuật bên trong:
        - Quét toàn bộ commit trong lịch sử Git (từ commit đầu tiên đến hiện tại)
        - Với mỗi commit:
        - Bóc tách toàn bộ nội dung của commit (file, thư mục, metadata…)
        - Nếu file private_key.pem tồn tại → loại bỏ nó
        - Commit mới được tạo ra, có nội dung giống commit cũ nhưng KHÔNG có file đó
        - Gán lại toàn bộ lịch sử: các commit mới được nối lại giống như lịch sử gốc
        - Tạo một repo mới trong thư mục .git với lịch sử sạch → thay thế repo cũ
- :white_check_mark: how Elastic search sync into MongoDB?
- :white_check_mark: how nrock and zerotrust cloudfare work, for private IP into public IP
    - Long-lived tunnel = kết nối TCP từ máy bạn mở ra ngoài, giữ sống liên tục.
    - Server ngrok không cần gọi vào, chỉ gửi dữ liệu ngược lại qua đường đã mở.
    - Nhờ đó, bạn có thể expose server local ra Internet mà không cần public IP hay mở port.
- :white_check_mark: cấu trúc dữ liệu không khóa (lockless data structures) LÀ GÌ?
    - Cấu trúc dữ liệu không khóa (lockless data structures) là những cấu trúc dữ liệu được thiết kế để cho phép nhiều luồng (threads) truy cập và thao tác đồng thời mà không cần sử dụng cơ chế khóa (lock) như mutex hay semaphore để bảo vệ sự đồng bộ.

# Chaining

# Systematization
