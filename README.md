# Books

- Data Science for Business
    - [48 :arrow_right: 67](./1.0.0/cxn9wz.md)
    - [68 :arrow_right: 96](./1.0.0/s2nnpb.md)
    - [97 :arrow_right: 119](./1.0.0/inkjdo.md)
- Designing Data-Intensive Applications
    - [91 :arrow_right: 106](./1.0.0/tkzqg5.md)
    - [107 :arrow_right: 222](./1.0.0/4mw4a3.md)
    - [222 :arrow_right: 295](./1.0.0/o70doc.md)
    - [295 :arrow_right: 371](./1.0.0/n20071.md)
    - [372 :arrow_right: 410](./1.0.0/o6n1x2.md)
    - [411 :arrow_right: ](./1.0.0/.md)
- Refactoring - Improving the Design of Existing Code
- Learning Domain-driven design
    - [29 :arrow_right: 58](./1.0.0/hxzy09.md)
    - [59 :arrow_right: 86](./1.0.0/qqo5s7.md)
    - [87 :arrow_right: 162](./1.0.0/sohwje.md)
    - [163 :arrow_right: 201](./1.0.0/j4kegr.md)
    - [202 :arrow_right: done](./1.0.0/c7dq63.md)
    - [Summary](./1.0.0/wfu2jf.md)
- :white_check_mark: Machine Learning Yearning (Vi)
    - [1 :arrow_right: 60](./1.0.0/w3y60i.md)
- The Web Application Hacker's Handbook
    - [1 :arrow_right: 358](./1.0.0/siqgx4.md)
- :white_check_mark: Multiplayer Game Programming: Architecting Networked Games
    - [Done](./1.0.0/d17bqf.md)
- eCommerce in the Cloud
    - [1 :arrow_right: 207](./1.0.0/jmzd7s.md)
- :white_check_mark: gemini for google workspace prompting guide 101
    - [1 :arrow_right: DONE](./1.0.0/9w5kku.md)

# System design

# AI ML

# Algorithm

# Mobile

## React Native

- **`mdzu7u`**
    - [Performance Overview](https://reactnative.dev/docs/performance)
    - [JavaScript Environment](https://reactnative.dev/docs/performance)
    - [Native platform](https://reactnative.dev/docs/native-platform)

## Metro

- **`bly5bk`**
    - [Metro docs](https://metrobundler.dev/docs/bundling): Bundle, caching, module resolution, source map format

# Web

## React

- **`522nan`**
    - [Update some new hooks](https://react.dev/reference/react/hooks)
- **`j85yn5`**
    - [Some news api react](https://react.dev/reference/react/apis)
    - [Some news api react-dom](https://react.dev/reference/react-dom)

# Game

# Database

## SQL

- [Anatomy Of A SQL Engine](./1.0.0/zc8ms2.md)

# OS

# Server (BE)

## Nodejs

- **`y5s9eb`**
    - [Compare web stream and nodejs stream](https://betterstack.com/community/guides/scaling-nodejs/nodejs-streams-vs-web-streams-api/)

# Desktop app

# Blockchain

# Dev Sec ML Ops

# Cyber security

# English

## Vocabulary

- [27 04 25](./1.0.0/yagy18.md)
- [30 04 25](./1.0.0/d9vx1k.md)
- [07 05 25](./1.0.0/e1jj8d.md)

# Problem around me

- :white_check_mark: [MongoDB questions checklist](./1.0.0/d886qg.md)
- :white_check_mark: [Best practices work with file transfer?](./1.0.0/lsdy45.md)
- :white_check_mark: why the redirect work in chrome, but not work in safari and opera
    - Browser Caching and Redirect Behavior
    - SSL Certificate and HTTPS Configuration
    - Reverse Proxy Configuration 
    - Content Security Policy (CSP)
- :white_check_mark: [Build encode/decode base64 with non blocking patternn](./1.0.0/r85a1o.md)
- Meteor call before pubsub is better than pure pubsub?
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
- LLm just smart and take workflow by prompt?
- ai generate documents
- mono repo: best practices, why choose? pros / cons
- i want do more about prompting, and practices more about ai :D
- i want do more about prompting, and practices more about ai :))
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
- realtime remix
- how Elastic search sync into MongoDB?
- how nrock and zerotrust cloudfare work, for private IP into public IP
- dbt, Spark, Airflow technical debt
- :white_check_mark: cấu trúc dữ liệu không khóa (lockless data structures) LÀ GÌ?
    - Cấu trúc dữ liệu không khóa (lockless data structures) là những cấu trúc dữ liệu được thiết kế để cho phép nhiều luồng (threads) truy cập và thao tác đồng thời mà không cần sử dụng cơ chế khóa (lock) như mutex hay semaphore để bảo vệ sự đồng bộ.
- các thuật toán liên quan cấu trúc dữ liệu không khóa (lockless data structures)

# Lessons learned

# Tech market
