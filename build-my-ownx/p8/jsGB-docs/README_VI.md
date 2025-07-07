# jsGB: Trình giả lập GameBoy bằng JavaScript

## Tổng quan

jsGB là một trình giả lập GameBoy được viết hoàn toàn bằng JavaScript, được thiết kế để chạy trực tiếp trong trình duyệt web. Đây là một dự án mã nguồn mở cho phép bạn chơi các game GameBoy cổ điển ngay trên trình duyệt.

## Tính năng hiện tại

### ✅ Đã hoàn thành
- **CPU Z80**: Đã được mô phỏng hoàn chỉnh, bao gồm các opcode CB-page
- **Đồ họa**: Hỗ trợ background và sprite
- **Bàn phím**: Hoạt động đầy đủ
- **Ngắt (Interrupts)**: Hỗ trợ VBlank và timer interrupts

### ⚠️ Đang phát triển
- **Timer**: Chưa được kiểm tra đầy đủ
- **Windows**: Chưa được triển khai

### ❌ Chưa hỗ trợ
- **Âm thanh**: Chưa được triển khai
- **Một số opcode**: Có thể thiếu một số opcode "không chính thức"

## Cấu trúc dự án

```
jsGB/
├── index.html          # Giao diện chính của trình giả lập
├── js/                 # Thư mục chứa các module JavaScript
│   ├── z80.js         # CPU Z80 core
│   ├── mmu.js         # Memory Management Unit
│   ├── gpu.js         # Graphics Processing Unit
│   ├── key.js         # Xử lý bàn phím
│   ├── timer.js       # Bộ đếm thời gian
│   ├── log.js         # Hệ thống logging
│   ├── tabs.js        # Quản lý tab giao diện
│   ├── fileread.js    # Đọc file ROM
│   └── xhr.js         # AJAX utilities
├── tests/             # Thư mục chứa ROM test
│   ├── opus5.gb
│   └── ttt.gb
├── README             # Tài liệu gốc (tiếng Anh)
└── LICENSE            # Giấy phép
```

## Hướng dẫn sử dụng

### Khởi chạy trình giả lập

1. Mở file `index.html` trong trình duyệt web
2. Trình giả lập sẽ tự động khởi tạo và sẵn sàng sử dụng

### Điều khiển game

| Phím trên bàn phím | Nút GameBoy |
|-------------------|-------------|
| Mũi tên ←→↑↓      | D-Pad       |
| Z                 | A           |
| X                 | B           |
| Space             | Select      |
| Enter             | Start       |

### Giao diện debug

Trình giả lập cung cấp giao diện debug với 3 tab:

1. **Messages**: Hiển thị log hệ thống
2. **Debugger**: Xem trạng thái CPU và memory
3. **Tile View**: Xem dữ liệu tile graphics

### Các chức năng điều khiển

- **Reset**: Khởi động lại trình giả lập
- **Run/Pause**: Chạy hoặc tạm dừng game
- **Step**: Thực thi từng instruction (debug mode)
- **Load ROM**: Tải file ROM game (mặc định: `/tests/tetris.gb`)
- **Breakpoint**: Đặt điểm dừng tại địa chỉ memory cụ thể

## Kiến trúc kỹ thuật

### CPU (Z80.js)
- Mô phỏng bộ xử lý Z80 của GameBoy (có khác biệt so với Z80 chuẩn)
- Quản lý registers: A, B, C, D, E, H, L, F, SP, PC
- Xử lý instruction set và timing
- Hỗ trợ interrupts và halt states

### Memory Management Unit (MMU.js)
- Quản lý bản đồ memory của GameBoy
- Xử lý ROM banking (MBC1)
- Quản lý VRAM, WRAM, ERAM, ZRAM
- Tích hợp BIOS boot sequence

### Graphics Processing Unit (GPU.js)
- Render background và sprites
- Quản lý VRAM và OAM
- Xử lý palettes và tile data
- Hỗ trợ LCD controller registers

### Input Handler (KEY.js)
- Xử lý input từ bàn phím
- Mapping phím máy tính sang GameBoy controls
- Quản lý joypad registers

### Timer System (TIMER.js)
- Quản lý các bộ đếm thời gian của GameBoy
- Xử lý timer interrupts
- Hỗ trợ các chế độ đếm khác nhau

## Trình duyệt được hỗ trợ

- Firefox 3.6+
- Opera 10+
- Các trình duyệt hiện đại khác (Chrome, Safari, Edge)

## Cách phát triển

### Thêm ROM mới
1. Đặt file ROM (.gb) vào thư mục `tests/`
2. Cập nhật đường dẫn trong input "Load" trên giao diện
3. Nhấn Reset để tải ROM mới

### Debug và phát triển
- Sử dụng tab "Debugger" để theo dõi trạng thái CPU
- Đặt breakpoint để dừng tại instruction cụ thể
- Xem tile data trong tab "Tile View"
- Theo dõi log trong tab "Messages"

## Hạn chế hiện tại

1. **ROM Loading**: Hiện tại chỉ hỗ trợ load ROM cố định, chưa có dialog chọn file
2. **Sound**: Chưa hỗ trợ âm thanh
3. **Window Layer**: Chưa hỗ trợ window graphics layer
4. **Save States**: Chưa hỗ trợ lưu/load trạng thái game

## Đóng góp

Dự án này được phát triển bởi cộng đồng. Bạn có thể đóng góp bằng cách:

1. Báo cáo lỗi (bugs)
2. Đề xuất tính năng mới
3. Cải thiện code
4. Viết tài liệu

## Tài liệu tham khảo

- Pan/ATX, nocash et al: Padocs DMG specification document
- Sean Young, Vrije University: Z80 opcode map
- Mostek Inc: Z80 timings
- Pat Fagan: Diffsheet from Z80 to GameBoy Z80
- Kevin Matney, UIUC: Microscopic dump of DMG BIOS

## Giấy phép

Xem file LICENSE để biết thêm chi tiết về giấy phép sử dụng.
