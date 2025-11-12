# Distributed Systems & System Design

- (3/5) Distributed Systems: Concepts and Design – Coulouris et al
    - 203/1067
    - boring. better when read by overview knowledge
    - 1 2 3 4
    - 5 6
    - 7 8 9 10
    - 11 12 13
    - 14 15
    - 16 17 18
    - 19 20 21
- (4/5) Distributed Systems: Principles and Paradigms – Tanenbaum & van Steen 
    - 88/705
    - cung cap nền tảng lý thuyết vững chắc, đặc biệt cho mục đích học thuật hoặc nghiên cứu
    - 2 3 4 5
    - 6 7 8 9
    - 10 11 12 13
    - 14
- (4/5) Introduction to Reliable and Secure Distributed Programming – Cachin et al. (2011)
    - 40/388
- (5/5) Distributed Algorithms – Nancy A. Lynch (1996)
    - 26/440
- https://aosabook.org/en/
    - The Architecture of Open Source Applications
    - [Chapter 3](./1.0.0/kep0z3.md)

# Foundations

- Java Concurrency In Practice
    - 89/235
- DSA
    - https://www.interviewbit.com/blog/data-structures-and-algorithms-books/?utm_source=chatgpt.com
- Git 
    - http://gitlet.maryrosecook.com/docs/gitlet.html
    - https://maryrosecook.com/blog/post/git-from-the-inside-out
- Go
    - https://github.com/teivah/100-go-mistakes
    - https://goperf.dev/

# Database Systems & Data Infrastructure

- (2/5) Data-Intensive Text Processing with MapReduce – Jimmy Lin 
    - 54/175
    - Need practice with Hadoop for strong understanding
- https://cstack.github.io/db_tutorial/
    - Part 1/15

# Security & Reliability Engineering

- The Web Application Hacker's Handbook
    - [1 :arrow_right: 368](./1.0.0/siqgx4.md)
- [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/)
    - 1 :arrow_right: 20 Chapter 10
- https://cryptopals.com/
- https://security-books.notion.site/

# Specialized mainstream: low level engineer

- (6.0/10) Linux from scratch book
    - 31/385
    - tự tay xây dựng một hệ thống Linux từ con số 0
- (7.0/10) Operating Systems: Design and Implementation (MINIX)
    - 90/629 (1071)
    - Đọc để review lại components trong OS
    - Dạy nền OS + code MINIX minh họa
- (8.0/10) Linux Kernel Development – Robert Love
    - 38/433 (468)
    - Cách lập trình và hiểu kernel Linux thực tế
    - Goal: Viết, sửa, test kernel thực tế
- (7.5/10) Modern Operating Systems – Andrew S. Tanenbaum
    - 1/1137
    - Nguyên lý hệ điều hành tổng quát (đa nền tảng)
    - Goal: Hiểu nguyên lý, cơ chế, mô hình
- (9.0/10) Understanding the Linux Kernel – Bovet & Cesati
    - 1/944
    - Giải phẫu kernel Linux ở mức chi tiết vi mô
    - Goal: Nghiên cứu sâu nội bộ Linux

- (7.0/10) Computer Organization and Design – Patterson & Hennessy (cho RISC-V hoặc ARM)
    - 125/642 (689)
    - Kiến trúc máy tính, CPU, ALU, MIPS, pipeline
    - Hiểu CPU làm gì khi chạy lệnh, cơ chế pipeline, register, cache.
- (7.5/10) Computer Systems A Programmer’s Perspective
    - 60/1067 (1105)
    - hiểu cách chương trình được biểu diễn trên máy
    - Rất cân bằng, có các phòng thí nghiệm đi kèm
    - lệnh switch có luôn hiệu quả hơn if-else không? Lệnh while có nhanh hơn for không? Truy cập con trỏ có nhanh hơn chỉ số mảng không? Tại sao vòng lặp chạy nhanh hơn khi cộng vào biến cục bộ thay vì tham số truyền theo tham chiếu?
- (9.5/10) Computer Architecture: A Quantitative Approach – Hennessy & Patterson
    - 30/1357
    - Giải thích cách thiết kế phần cứng và kiến trúc máy tính để đạt hiệu năng cao
    
- (8.5/10) Compilers: Principles, Techniques, and Tools (Dragon Book)
    - 64/930 (947)
    - Giải thích nguyên lý, thuật toán và lý thuyết nền tảng của biên dịch
- (8.5/10) Engineering a Compiler – Cooper & Torczon
    - 26/788 (825)
    - Trình bày kỹ thuật thiết kế và triển khai compiler hiện đại.
    - Người muốn viết compiler, interpreter, VM

- (9.0/10) The Art of Multiprocessor Programming 
    - 49/529
    - Giải thích từ gốc đến ngọn cách các thuật toán đa luồng hoạt động và làm sao đảm bảo tính đúng đắn
- (9.0/10) C++ Concurrency in Action
    - 38/337 (530)
    - Dạy cách viết mã C++ song song hiện đại – từ cơ bản đến nâng cao

- (9.0/10) The Art of Computer Systems Performance Analysis (Raj Jain)
    - Cung cấp phương pháp luận đánh giá hiệu năng một cách khoa học, tránh sai lầm thống kê

- (6.5/10) Programming Embedded Systems in C and C++ – Michael Barr
    - 22/187
    - Nắm cách lập trình device-level thực tế
    - Thiên về: Thực hành, cần phần cứng
- (8.0/10) Designing Embedded Systems (PIC / ARM)
    - Thực hành, phần cứng, firmware
    - Embedded developers mới bắt đầu
    - Nhiều project, code ngoại vi, giao tiếp phần cứng

- https://browser.engineering/
- https://www.gabrielgambetta.com/computer-graphics-from-scratch/00-introduction.html
- https://webrtcforthecurious.com/#who-this-book-is-for

# CS technologies

- Reverse Engineering
    - (3/10) Reverse Engineering for Beginners
        - 28/898 (943) 3.1
        - truyền cảm hứng cho bạn cải tiến các kỹ thuật hiện có
        - Hướng tới người muốn học phân tích mã nhị phân, hiểu code không có source
    - (5/10) Hacking: The Art of Exploitation - Jon Erickson
        - 51/463 (492) 0x260
        - Rất vui, dễ đọc, talk about common software, overview
        - Hướng tới người muốn hiểu cách tấn công hoạt động từ cấp thấp đến cấp cao.
- Malware Analysis
    - (6/10) Practical Malware Analysis
        - 1/802
        - Lab cực chất, có file mẫu chạy được.
        - Dễ áp dụng công việc SOC/DFIR.
        - Cân bằng lý thuyết + thực hành.
        - Dù cũ nhưng 90% vẫn đúng.
- Robot operation system
    - (2/10) A Gentle Introduction to ROS
        - 21/153
        - Dạy tư duy ROS (publish/subscribe).
        - Có code C++ & Python.
    - (5/10) ROS by Example
        - 1/280
        - Có video YouTube kèm.
        - Phù hợp người mới 0 kinh nghiệm.
        - Miễn phí sample code trên GitHub.
- Quant / HFT (High-Frequency Trading)
    - (4/10) (For trading) Quantitative Trading: How to Build Your Own Algorithmic Trading Business
        - 53/190
        - phù hợp nếu bạn muốn hiểu “làm thế nào để vận hành một business/trading desk” hơn là “hệ thống cực nhanh”
        - mong muốn “thiết kế hệ thống HFT, network, latency, hardware, co‑location” thì vẫn sẽ thiếu
    - (6/10) (For trading) Algorithmic Trading
        - 1/225
        - Dạy cointegration thực tế (pairs trading).
        - tập trung hơn vào chiến lược, back‑testing, quant logic thay vì “hệ thống HFT tốc độ cao”
- Continuous Delivery: Reliable Software Releases Through Build, Test, and Deployment Automation
    - 1/497
- Clean Architecture
    - 1/429
- Quantum Computing : A Gentle Introduction 
    - 24/389: Pending, need physical foundation
    
# Out of technology

- Brain
    - Friedenberg_Cognitive science
        - 26/483
        - Bao quát toàn diện các cách tiếp cận cổ điển và hiện đại.
        - Nhấn mạnh lý thuyết + đánh giá phê phán.
    - Mind: Introduction to Cognitive Science
        - 1/279
        - Tập trung vào cách máy tính mô phỏng tâm trí (logic, rules, concepts, analogies, connections).
        - Đánh giá ưu/nhược điểm của các mô hình tính toán.
- Physics
    - Stuff Matters
        - 15/196
- Business
    - Think and grow rich
    - Atomic habits
    - The Loopholes of the Rich: How the Rich Legally Make More Money and Pay Less Tax

# Papers

- Raft consensus https://raft.github.io/raft.pdf
- Memcached https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.8562-6/240873052_277412237132971_6278324660880331641_n.pdf?_nc_cat=101&ccb=1-7&_nc_sid=e280be&_nc_ohc=nlPPMfWAHpEQ7kNvwGgvgSD&_nc_oc=AdlzMkxnR1C8jNWjRUe75M1hIN7jNu4e9MVHsMKRZX9VWADL4fUyBOoRj-dJQP_souE&_nc_zt=14&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=ZSjT3c_fUkpFwG8vyKhCtQ&oh=00_AfZiyoO2PT_nLr_wO304eU3rCPwvrJoj29sWVut9FCuuIw&oe=68E13002
- Borg cluster (k8s) https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43438.pdf
- Flink https://www.researchgate.net/publication/308993790_Apache_Flink_Stream_and_Batch_Processing_in_a_Single_Engine
- Time, Clocks, and the Ordering of Events in a Distributed System https://lamport.azurewebsites.net/pubs/time-clocks.pdf
- GGFile system https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf
- Geo distributed https://dl.acm.org/doi/pdf/10.1145/3477132.3483546
- Distributed system tracing https://static.googleusercontent.com/media/research.google.com/en//archive/papers/dapper-2010-1.pdf
- Zanzibar paper → global system for managing access control lists
- Monarch paper → time series db
- Cross language service https://thrift.apache.org/static/files/thrift-20070401.pdf
- Recommendation system https://web.stanford.edu/~rezab/papers/wtf_overview.pdf
- Goto harmful https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf

- DynamoDB https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf
- Cassandra https://www.cs.cornell.edu/projects/ladis2009/papers/lakshman-ladis2009.pdf
- LSM-tree DB https://www.vldb.org/pvldb/vol13/p3217-matsunobu.pdf
- https://www.foundationdb.org/files/fdb-paper.pdf
- Aurora https://web.stanford.edu/class/cs245/readings/aurora.pdf
- BigTable https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf
- MapReduce https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf
- GG distributed db https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf

- Neuron network https://arxiv.org/abs/1706.03762
- Vector DB https://arxiv.org/pdf/2310.11703

# Book I love or must read again

- :white_check_mark: Designing Data-Intensive Applications
    - [91 :arrow_right: 106](./1.0.0/tkzqg5.md)
    - [107 :arrow_right: 222](./1.0.0/4mw4a3.md)
    - [222 :arrow_right: 295](./1.0.0/o70doc.md)
    - [295 :arrow_right: 371](./1.0.0/n20071.md)
    - [372 :arrow_right: 410](./1.0.0/o6n1x2.md)
- :white_check_mark: Software Architecture The Hard Parts
    - [1 :arrow_right: DONE](./1.0.0/3pm1sl.md)
- :white_check_mark: The Phoenix Project
- :white_check_mark: (Little OS book from build own X)[https://littleosbook.github.io/]
- :white_check_mark: Systems Performance: Enterprise and the Cloud
- :white_check_mark: Database internals
    - Talk about the Storage Engine from sciences and lab, more new algorithm from lab
    - Must have when want to deep dive and build Database engine 

# Completed

- :white_check_mark: (5.5/10) The Elements of Computing Systems
    - Mechanism
    - CA + Assembler + VM
    - High-level language + Compiler + OS
- :white_check_mark: Operating Systems - Three Easy Pieces
    - Virtualization
    - Concurrentcy
    - Persistence
- :white_check_mark: Kafka Papers https://www.microsoft.com/en-us/research/wp-content/uploads/2017/09/Kafka.pdf
- :white_check_mark: https://kb.databasedesignbook.com/
    - Database design case studies
    - Classic relational modeling topics
    - SQL
- :white_check_mark: (6.5/10) Computer Networking: A Top-Down Approach (8th) 
    - Chapter 6 The Link Layer and LANs
    - Chapter 7 Wireless and Mobile Networks
    - Chapter 8 Security in Computer Networks (skimming)
- :white_check_mark: Release It
- :white_check_mark: devops trouble linux best practices
- :white_check_mark: Designing Distributed Systems
- :white_check_mark: Effective DevOps
- :white_check_mark: Cloud Native Pattern
- :white_check_mark: Cloud Architecture Patterns
- :white_check_mark: Interconnecting Smart Objects with IP: The Next Internet
    - Nice book about IoT and IP, I read a haft of it and learn about the charactics of IoT, and somethings arround it.
    - It's more diving about IP and protocols for IoT, can review again in the future.
- :white_check_mark: VR Book Human-Centered Design for Virtual Reality
- :white_check_mark: Design It
- :white_check_mark: High Performance Browser Networking
- :white_check_mark: Infrastructure as Code: Managing Servers in the Cloud
- :white_check_mark: Obserbility Engineering
- :white_check_mark: The Unicorn Project
- :white_check_mark: Company of One
- :white_check_mark: Make: Bootstrapper's handbook
- :white_check_mark: The Clean startup
- :white_check_mark: Machine Learning Engineering
- :white_check_mark: deep-learning-for-vision-systems
    - [1 :arrow_right: DONE](./1.0.0/sfhs65.md)
- :white_check_mark: THE STARTUP CTO'S HANDBOOK
- :white_check_mark: document software architecture
    - [1 :arrow_right: 250](./1.0.0/7si7e0.md) Not need read.
- :white_check_mark: Introducing MLOps
    - [1 :arrow_right: DONE](./1.0.0/qbmjfb.md)
- :white_check_mark: Building Microservices
- :white_check_mark: Solution Architecture handbook
    - [1 :arrow_right: DONE](./1.0.0/bsyxxk.md) Defining the modernization approach
- :white_check_mark: Learning Domain-driven design
    - [29 :arrow_right: 58](./1.0.0/hxzy09.md)
    - [59 :arrow_right: 86](./1.0.0/qqo5s7.md)
    - [87 :arrow_right: 162](./1.0.0/sohwje.md)
    - [163 :arrow_right: 201](./1.0.0/j4kegr.md)
    - [202 :arrow_right: done](./1.0.0/c7dq63.md)
    - [Summary](./1.0.0/wfu2jf.md)
- :white_check_mark: Prompt Engineering for LLMs
    - [1 :arrow_right: DONE](./1.0.0/u57umk.md)
- :white_check_mark: Machine Learning Yearning (Vi)
    - [1 :arrow_right: 60](./1.0.0/w3y60i.md)
- :white_check_mark: Multiplayer Game Programming: Architecting Networked Games
    - [1 :arrow_right: Done](./1.0.0/d17bqf.md)
- :white_check_mark: eCommerce in the Cloud
    - [1 :arrow_right: DONE](./1.0.0/jmzd7s.md) chapter 11
- :white_check_mark: gemini for google workspace prompting guide 101
- :white_check_mark: DevOps Handbook
- :white_check_mark: The Analytics Setup Guidebook
- :white_check_mark: Generative AI in practice: 100+ amazing ways

# Cancel

- :x: Speech and Language Processing
    - [1 :arrow_right: 400](./1.0.0/x7r2ri.md)
- :x: The Data Warehouse Toolkit, 3rd Edition
    - 1 :arrow_right: 37
- :x: Data Science for Business
    - [48 :arrow_right: 67](./1.0.0/cxn9wz.md)
    - [68 :arrow_right: 96](./1.0.0/s2nnpb.md)
    - [97 :arrow_right: 119](./1.0.0/inkjdo.md)
- :x: Advanced Signal Processing in Wearable Sensors for Health Monitoring 40/208
- :x: Blockchain Revolution `63/324`
    -  khong phai sach sau ve technical
- :x: Autonomous Driving
    - Technical, Legal and Social Aspects 81/698
- :x: 5G and Beyond `74/310`
    - tập hợp các nghiên cứu (các research paper hoặc book chapter) được biên soạn lại thành một tài liệu học thuật, giống như một sách chuyên khảo (edited volume)
- :x: The Art of Scalability
    - Talk more about the art of business, not software
- :x: Java Threads - 3rd Edition 
    - outdated
- :x: Refactoring Databases: Evolutionary Database Design
    - It's ok but for directory of situations (AI can help)
- :x: Software Architecture in Practice
    - Chưa cần, đọc chán quá
    - Kiến trúc đã trở thành một phần quan trọng trong quá trình thiết kế và là chủ đề chính của cuốn sách này
- :x: Domain-Driven Design Tackling Complexity in the Heart of Software
    - Chưa cần, đọc chán quá
    - Để tạo ra phần mềm có giá trị, chúng ta phải vận dụng một kho tri thức liên quan đến các hoạt động mà phần mềm sẽ tham gia. Lượng kiến thức cần thiết có thể rất lớn. Khối lượng và độ phức tạp của thông tin có thể gây choáng ngợp. Đây là lúc nhóm phát triển có thể sử dụng mô hình hóa để xử lý tình trạng quá tải đó. 
    - Mô hình là một dạng tri thức được đơn giản hóa có chọn lọc và cấu trúc có chủ ý. Một mô hình phù hợp giúp làm sáng tỏ thông tin và áp dụng nó vào vấn đề.
    - Mô hình miền không phải là một sơ đồ cụ thể; nó là ý tưởng mà sơ đồ muốn truyền đạt. Nó không chỉ là kiến thức trong đầu chuyên gia miền; nó là sự trừu tượng có tổ chức và chọn lọc của kiến thức đó.
- :x: Patterns of Enterprise Application Architecture
    - Chưa cần, đọc chán quá
    - trình bày quan điểm của mình về các phần chính của một ứng dụng doanh nghiệp và các quyết định mà tôi ước gì có thể làm đúng ngay từ đầu
    - tập trung vào ứng dụng doanh nghiệp, vì vậy các mẫu thiết kế tôi trình bày ở đây đều liên quan đến loại ứng dụng này
