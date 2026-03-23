## build AI ML

* [_Neural Networks - The Nature of Code_](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh) [video]

## Programming

### Assembly

- (10/24) https://github.com/cfenollosa/os-tutorial?tab=readme-ov-file
- [**Assembly**: _Baking Pi – Operating Systems Development_](http://www.cl.cam.ac.uk/projects/raspberrypi/tutorials/os/index.html)

### Rust

**Blocking TCP Server**
- Core Server
    - [x]  Create TCP listener
        - [ ]  create socket
        - [ ]  config socket option
        - [ ]  prepare address structure
        - [ ]  bind socket
        - [ ]  start listening
        - [ ]  validate listener state
        - [ ]  error edge case to verify
        - [ ] cleanup on failure
    - [ ]  Accept incoming connections
        - [ ] Validate listen fd
        - [ ] Accept connection
        - [ ] Handle retryable errors
        - [ ] Handle fatal errors
        - [ ] Apply post-accept config
        - [ ] Verify client fd
    - [ ]  Implement echo logic
        - [ ] Read from client
        - [ ] Handle partial read
        - [ ] Write back to client
        - [ ] Handle partial write
        - [ ] Detect EOF
    - [ ]  Handle client disconnect
        - [ ] Detect graceful close
        - [ ] Detect abnormal close
        - [ ] Close client fd
        - [ ] Release resources
    - [ ]  Add proper error handling
        - [ ] Check all syscall returns
        - [ ] Classify retry vs fatal
        - [ ] Prevent fd leak
        - [ ] Avoid busy loop
    - [ ]  Add logging (connection open/close)
        - [ ] Log server start
        - [ ] Log connection open
        - [ ] Log connection close
        - [ ] Log errors
- Multi-thread (thread-per-connection)
    - [ ]  Spawn thread per accepted connection
    - [ ]  Ensure stream ownership moved correctly
    - [ ]  Handle thread panic safely
    - [ ]  Limit max concurrent threads (optional guard)
    - [ ]  Measure active thread count
- Robustness
    - [ ]  Handle partial reads
    - [ ]  Handle partial writes
    - [ ]  Add graceful shutdown (CTRL+C handling)
    - [ ]  Set TCP_NODELAY (optional test)
    - [ ]  Set socket read/write timeout
**Async Version (Tokio)**
- Setup
    - [ ]  Add tokio dependency
    - [ ]  Use #[tokio::main]
    - [ ]  Replace std::net with tokio::net
    - [ ]  Replace blocking read/write with async version
- Async Handling
    - [ ]  Spawn async task per connection
    - [ ]  Use non-blocking read loop
    - [ ]  Handle connection close properly
    - [ ]  Avoid large buffer reallocation
    - [ ]  Verify no blocking calls inside async context
- Event Loop Understanding
    - [ ]  Confirm epoll is used (Linux)
    - [ ]  Validate single-thread runtime
    - [ ]  Validate multi-thread runtime
    - [ ]  Compare task count vs OS thread count
**Throughput Benchmark**
- Benchmark Tooling
    - [ ]  Choose benchmarking client (wrk / custom client / bombardier)
    - [ ]  Create load generator for raw TCP
    - [ ]  Support configurable concurrency
    - [ ]  Support configurable message size
    - [ ]  Measure requests/sec
    - [ ]  Measure latency (avg, p95, p99)
- Metrics Collection
    - [ ]  Record CPU usage
    - [ ]  Record memory usage
    - [ ]  Record context switches
    - [ ]  Record open file descriptors
    - [ ]  Record network throughput (MB/s)
- Test Matrix
    - [ ]  1 connection
    - [ ]  100 connections
    - [ ]  1k connections
    - [ ]  10k connections (if possible)
    Test both:
    - [ ]  Blocking multi-thread
    - [ ]  Tokio single-thread runtime
    - [ ]  Tokio multi-thread runtime
**Deeper System Insight**
    - [ ]  Compare thread count vs connection count
    - [ ]  Measure thread stack memory impact
    - [ ]  Test ulimit -n limit
    - [ ]  Observe TIME_WAIT behavior
    - [ ]  Profile with perf
    - [ ]  Profile with flamegraph

**OwnX**

- [**Rust**: _Writing an OS in Rust_](https://os.phil-opp.com/)
- [**Rust**: _Tokio docs_](https://tokio.rs/tokio/tutorial/setup)

* Building a DNS server: https://github.com/EmilHernvall/dnsguide/blob/master/README.md
* WebGL: https://www.chinedufn.com/3d-webgl-basic-water-tutorial/
* Build Your Own Text Editor: https://philippflenker.com/hecto/
* Parser Combinators: https://bodil.lol/parser-combinators/
* Build a Language VM: https://blog.subnetzero.io/post/building-language-vm-part-00
* Making a RISC-V Operating System: https://osblog.stephenmarz.com/
* Game Boy emulator: https://jeremybanks.github.io/0dmg/
* Building A Blockchain in Rust: https://hackernoon.com/building-a-blockchain-in-rust-and-substrate-a-step-by-step-guide-for-developers-kc223ybp

### C++

* [**C++**: _Build Your Own Redis from Scratch_](https://build-your-own.org/redis)

* [**C++**: _Let's Make a Voxel Engine_](https://sites.google.com/site/letsmakeavoxelengine/home)
* [**C++**: _How OpenGL works: software rendering in 500 lines of code_](https://github.com/ssloy/tinyrenderer/wiki)

* NES Emulator From Scratch: https://www.youtube.com/playlist?list=PLrOv9FMX8xJHqMvSGB_9G9nZZ_4IgteYf
* The art of emulation programming: http://www.codeslinger.co.uk/index.html
* How to write an emulator (CHIP-8 interpreter): https://multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/
* Rasterization Algorithm: https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/overview-rasterization-algorithm.html
* Ray Tracing: https://raytracing.github.io/books/RayTracingInOneWeekend.html
* Lode's Computer Graphics Tutorial: https://lodev.org/cgtutor/raycasting.html
* 3D Computer Graphics: https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing/how-does-it-work.html
* Game Engine: https://www.youtube.com/playlist?list=PLlrATfBNZ98dC-V-N3m0Go4deliWHPFwT
* Writing a Linux Debugger: https://tartanllama.xyz/posts/writing-a-linux-debugger/setup/

* How a 64k intro is made: https://www.lofibucket.com/articles/64k_intro.html
* How X Window Managers Work: https://jichu4n.com/posts/how-x-window-managers-work-and-how-to-write-one-part-i/
* open source VR headset: https://github.com/relativty/Relativty
* Writing Your Own Toy Compiler: https://gnuu.org/2009/09/18/writing-your-own-toy-compiler/
* 3D Physics Engine: https://www.youtube.com/playlist?list=PLEETnX-uPtBXm1KEr_2zQ6K_0hoGH6JJ0
* Custom Physics Engine: https://code.tutsplus.com/series/how-to-create-a-custom-physics-engine--gamedev-12715
* Writing a Bootloader: http://3zanders.co.uk/2017/10/13/writing-a-bootloader/
* Write your own Operating System: https://www.youtube.com/playlist?list=PLHh55M_Kq4OApWScZyPl5HhgsTJS9MZ6M
* Reconstructing Cave Story: https://www.youtube.com/playlist?list=PL006xsVEsbKjSKBmLu1clo85yLrwjY67X
* Beginning Game Programming: https://lazyfoo.net/tutorials/SDL/
* OpenGL Breakout: https://learnopengl.com/In-Practice/2D-Game/Breakout

### C

* [**C**: _Let's Build a Simple Database_](https://cstack.github.io/db_tutorial/)

* [**C**: _Build your own VPN/Virtual Switch_](https://github.com/peiyuanix/build-your-own-zerotier)

* [**C**: _How to create an OS from scratch_](https://github.com/cfenollosa/os-tutorial)

* [**C**: _Let's code a TCP/IP stack_](http://www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/)
* [**C**: _Beej's Guide to Network Programming_](http://beej.us/guide/bgnet/)

* [**C**: _Write your Own Virtual Machine_](https://justinmeiners.github.io/lc3-vm/)

* [**C**: _Home-grown bytecode interpreters_](https://medium.com/bumble-tech/home-grown-bytecode-interpreters-51e12d59b25c)
* [**C**: _Build Your Own Shell_](https://github.com/tokenrove/build-your-own-shell)

* [**C**: _How to Write a Video Player in Less Than 1000 Lines_](http://dranger.com/ffmpeg/ffmpeg.html)
* [**C**: _Sol - An MQTT broker from scratch_](https://codepr.github.io/posts/sol-mqtt-broker)
* [**C**: _Build Your Own Lisp: Learn C and build your own programming language in 1000 lines of code_](http://www.buildyourownlisp.com/)

* Bitwise: https://www.youtube.com/watch?v=ZjwvMcP3Nf0&list=PLU94OURih-CiP4WxKSMt3UcwMSDM3aTtX
* Build Your Own Text Editor: https://viewsourcecode.org/snaptoken/kilo/
* Regular Expression Matching: 
    - https://swtch.com/~rsc/regexp/regexp1.html
    - https://www.cs.princeton.edu/courses/archive/spr09/cos333/beautiful.html
* A Compiler Writing Journey: 
    - https://github.com/DoctorWkt/acwj
    - https://github.com/lotabout/Let-s-build-a-compiler
* simple interpreter : https://github.com/lotabout/write-a-C-interpreter
* Writing a Simple Garbage Collector: 
    - https://maplant.com/2020-04-25-Writing-a-Simple-Garbage-Collector-in-C.html
    - https://journal.stuffwithstuff.com/2013/12/08/babys-first-garbage-collector/
* write a Kernel with keyboard and screen support: https://arjunsreedharan.org/post/99370248137/kernels-201-lets-write-a-kernel-with-keyboard
* Raspberry Pi: https://github.com/s-matyukevich/raspberry-pi-os
* Hack The Virtual Memory: https://blog.holbertonschool.com/hack-the-virtual-memory-c-strings-proc/
* Malloc: https://danluu.com/malloc-tutorial/
* a minimal multi-tasking OS kernel for ARM: https://github.com/jserv/mini-arm-os
* Coding a Rogue/Nethack RPG: https://www.youtube.com/playlist?list=PLkTXsX7igf8erbWGYT4iSAhpnJLJ0Nk5G
* Program an NES game: https://nesdoug.com/
* Writing a Game Boy emulator: https://cturt.github.io/cinoop.html
* Linux containers: https://blog.lizzie.io/linux-containers-in-500-loc.html
* Write a System Call: https://brennan.io/2016/11/14/kernel-dev-ep3/
* An ffmpeg and SDL: http://dranger.com/ffmpeg/ffmpeg.html
* Write hash table: https://github.com/jamesroutley/write-a-hash-table

### Java

* :ok: [**Java**: _Creating JVM Language_](http://jakubdziworski.github.io/categories.html#Enkel-ref)
* II 5 [**Java**: _Crafting interpreters: A handbook for making programming languages_](http://www.craftinginterpreters.com/)

## Build database

- https://cstack.github.io/db_tutorial/

## Challenges

- BugFreeDB
- ProofDB
- Sociaty simulator

## Simulator

- AI ML
- Distributed databases
- Data-warehousing
- Distributed system
    - Micro services

### Temporal

Question: 
- Deterministic replay tại sao cực khó
- Durable execution khác queue thế nào
- Exactly-once illusion thực sự ra sao
- Failure handling ở orchestration layer
- Temporal trade-off consistency vs throughput


# Make

```
                ┌───────────────┐
                │   SOURCES     │
                │               │
                │ Reddit        │
                │ Twitter       │
                │ News sites    │
                │ Forums        │
                │ GitHub        │
                └───────┬───────┘
                        │
                many custom crawlers
                        │
        ┌───────────────┼────────────────┐
        │               │                │
   reddit crawler   twitter crawler   news crawler
        │               │                │
        └───────────────┴────────────────┘
                        │
                parsing + cleaning
                        │
                schema normalization
                        │
                     queue
                 (Kafka / Redis)
                        │
                   processing
                (embedding / NLP)
                        │
                     storage
             (ClickHouse / Elastic)
             
 -------------------------------------------------------
 
                 ┌───────────────┐
                 │    SOURCES    │
                 │               │
                 │ Reddit        │
                 │ Twitter       │
                 │ News sites    │
                 │ Forums        │
                 │ GitHub        │
                 └───────┬───────┘
                         │
                   Aggregators
         ┌───────────────┼────────────────┐
         │               │                │
       RSSHub          GDELT          GH Archive
         │               │                │
         └───────────────┴────────────────┘
                         │
                     unified feeds
                         │
                     collectors
                         │
                 normalization layer
                         │
                        queue
                    (Kafka / Redis)
                         │
                     processing
                  (embedding / NLP)
                         │
                       storage
               (ClickHouse / Elastic)             
```

https://github.com/praw-dev/praw

https://github.com/JustAnotherArchivist/snscrape

https://github.com/codelucas/newspaper

http://gdeltproject.org/

https://github.com/DIYgod/RSSHub

system ingest:

```
reddit
twitter
news
github
forums
```

Real-time pipeline detect:

```
emerging technology
global events
memes
security incidents
```

Không phải news aggregator.

Mà là:

```
early signal detector
```

Distributed pipeline kiểu:

```
stream ingest
topic detection
clustering
trend emergence
```

Rất giống research về **information diffusion**

---

```jsx
data sources
      ↓
 ingestion layer
      ↓
 data warehouse
      ↓
 indexing layer
      ↓
 search engine
      ↓
 analytics / dashboard
```

# Read

https://github.com/cockroachdb/cockroach

https://github.com/apache/flink

https://github.com/apple/foundationdb

https://github.com/redpanda-data/redpanda

https://github.com/temporalio/temporal

## 1️⃣ Compute systems

Đây là phần bạn đang nghĩ tới với `minh-cloud`.

Các component:

```
job queue
worker system
scheduler
resource allocator
```

Project tương ứng:

```
task queue
worker pool
job scheduler
```

Concept:

```
backpressure
retry
priority scheduling
resource allocation
```

---

## 2️⃣ Coordination systems

Distributed systems cần **coordination**.

Problem:

```
ai là leader?
ai giữ lock?
node nào còn sống?
```

Project:

```
distributed lock
leader election
service registry
```

Concept:

```
heartbeat
consensus basics
failure detection
```

System nổi tiếng:

- Apache ZooKeeper
- etcd

---

## 3️⃣ Networking systems

Rất nhiều system design nằm ở **network layer**.

Project:

```
build simple RPC framework
build load balancer
build service discovery
```

Concept:

```
retry
timeout
circuit breaker
connection pooling
```

System liên quan:

- gRPC
- NGINX

---

## 4️⃣ Storage systems

Đây là phần **deep nhất**.

Project:

```
key-value store
LSM tree
write ahead log
replication
```

Concept:

```
durability
consistency
compaction
indexing
```

System thực:

- RocksDB
- LevelDB

# Review book

## Data intensive

35/613: Describing Performance

### goal

- read by Eng, learn Eng + review knowledge
- exercise: new concept -> practices
- nắm >80% để interview

### note

- 3 important concerns in software system
    - reliability
    - scalability
    - maintainability

### practices

- 
