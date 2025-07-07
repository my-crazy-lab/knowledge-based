# Tài liệu jsGB - Chỉ mục tiếng Việt

## Tổng quan

Đây là bộ tài liệu hoàn chỉnh bằng tiếng Việt cho dự án jsGB - trình giả lập GameBoy được viết bằng JavaScript. Tài liệu được chia thành các phần chính để phục vụ cho các đối tượng người dùng khác nhau.

## Cấu trúc tài liệu

### 📖 Tài liệu cho người dùng cuối

#### [README_VI.md](./README_VI.md)
**Mô tả:** Tài liệu giới thiệu tổng quan về dự án
**Đối tượng:** Người dùng cuối, người mới bắt đầu
**Nội dung:**
- Giới thiệu về jsGB
- Tính năng hiện tại và kế hoạch
- Hướng dẫn sử dụng cơ bản
- Cấu trúc dự án
- Điều khiển game
- Giao diện debug
- Yêu cầu hệ thống

### 🔧 Tài liệu kỹ thuật

#### [TECHNICAL_DOCS_VI.md](./TECHNICAL_DOCS_VI.md)
**Mô tả:** Tài liệu kỹ thuật chi tiết về kiến trúc hệ thống
**Đối tượng:** Lập trình viên, kỹ sư phần mềm
**Nội dung:**
- Kiến trúc tổng quan
- Chi tiết từng module (Z80, MMU, GPU, Timer, Input)
- Memory mapping
- Interrupt system
- Rendering pipeline
- Performance optimization
- Debug features

#### [API_REFERENCE_VI.md](./API_REFERENCE_VI.md)
**Mô tả:** Tài liệu tham khảo API đầy đủ
**Đối tượng:** Lập trình viên cần tích hợp hoặc mở rộng
**Nội dung:**
- API của tất cả modules
- Function signatures và parameters
- Return values và side effects
- Constants và enums
- Error handling
- Ví dụ sử dụng

### 👨‍💻 Tài liệu phát triển

#### [DEVELOPER_GUIDE_VI.md](./DEVELOPER_GUIDE_VI.md)
**Mô tả:** Hướng dẫn phát triển và đóng góp cho dự án
**Đối tượng:** Contributors, maintainers
**Nội dung:**
- Thiết lập môi trường phát triển
- Code conventions và best practices
- Quy trình thêm tính năng mới
- Testing và quality assurance
- Debugging tools
- Optimization guidelines
- Contribution workflow

## Hướng dẫn đọc tài liệu

### Cho người dùng mới
1. Bắt đầu với [README_VI.md](./README_VI.md) để hiểu tổng quan
2. Làm theo hướng dẫn sử dụng để chạy emulator
3. Khám phá các tính năng debug

### Cho lập trình viên muốn hiểu codebase
1. Đọc [README_VI.md](./README_VI.md) để nắm context
2. Tham khảo [TECHNICAL_DOCS_VI.md](./TECHNICAL_DOCS_VI.md) để hiểu kiến trúc
3. Sử dụng [API_REFERENCE_VI.md](./API_REFERENCE_VI.md) khi cần chi tiết API

### Cho contributors
1. Đọc tất cả tài liệu trên
2. Làm theo [DEVELOPER_GUIDE_VI.md](./DEVELOPER_GUIDE_VI.md) để setup môi trường
3. Tuân thủ coding standards và testing guidelines

## Cấu trúc file trong dự án

```
jsGB/
├── README_VI.md              # Tài liệu chính (tiếng Việt)
├── TECHNICAL_DOCS_VI.md      # Tài liệu kỹ thuật
├── API_REFERENCE_VI.md       # Tham khảo API
├── DEVELOPER_GUIDE_VI.md     # Hướng dẫn phát triển
├── DOCS_INDEX_VI.md          # File này - chỉ mục tài liệu
├── README                    # Tài liệu gốc (tiếng Anh)
├── LICENSE                   # Giấy phép
├── index.html                # Entry point của ứng dụng
├── js/                       # Source code
│   ├── z80.js               # CPU emulation
│   ├── mmu.js               # Memory management
│   ├── gpu.js               # Graphics processing
│   ├── key.js               # Input handling
│   ├── timer.js             # Timer system
│   ├── log.js               # Logging system
│   ├── tabs.js              # UI tab management
│   ├── fileread.js          # File reading utilities
│   └── xhr.js               # AJAX utilities
└── tests/                    # Test ROMs
    ├── opus5.gb
    └── ttt.gb
```

## Thuật ngữ và từ viết tắt

### Thuật ngữ GameBoy
- **DMG**: Dot Matrix Game (tên code của GameBoy gốc)
- **ROM**: Read-Only Memory (cartridge game)
- **RAM**: Random Access Memory
- **VRAM**: Video RAM (memory cho graphics)
- **OAM**: Object Attribute Memory (sprite data)
- **MBC**: Memory Bank Controller (chip quản lý banking)
- **LCD**: Liquid Crystal Display
- **PPU**: Picture Processing Unit (tương đương GPU)

### Thuật ngữ kỹ thuật
- **Opcode**: Operation code (mã lệnh CPU)
- **Register**: Thanh ghi CPU
- **Interrupt**: Ngắt
- **Scanline**: Dòng quét màn hình
- **V-Blank**: Vertical blanking period
- **H-Blank**: Horizontal blanking period
- **Tile**: Khối đồ họa 8x8 pixel
- **Sprite**: Object đồ họa di động
- **Palette**: Bảng màu

### Viết tắt trong code
- **PC**: Program Counter
- **SP**: Stack Pointer
- **IME**: Interrupt Master Enable
- **IE**: Interrupt Enable
- **IF**: Interrupt Flag
- **LCDC**: LCD Control
- **STAT**: LCD Status
- **LY**: LCD Y-coordinate
- **LYC**: LY Compare

## Quy ước đặt tên

### Trong tài liệu
- **Module names**: Viết hoa (Z80, MMU, GPU)
- **Function names**: camelCase (checkline, updatetile)
- **Property names**: _underscore cho private (_vram, _registers)
- **Constants**: UPPER_CASE (LCD_WIDTH, TIMER_FREQ)

### Trong code comments
- Sử dụng tiếng Anh cho code comments để consistency
- Sử dụng tiếng Việt cho user-facing documentation
- JSDoc format cho function documentation

## Cập nhật tài liệu

### Khi thêm tính năng mới
1. Cập nhật [README_VI.md](./README_VI.md) nếu ảnh hưởng đến user experience
2. Thêm chi tiết kỹ thuật vào [TECHNICAL_DOCS_VI.md](./TECHNICAL_DOCS_VI.md)
3. Document API mới trong [API_REFERENCE_VI.md](./API_REFERENCE_VI.md)
4. Cập nhật development workflow trong [DEVELOPER_GUIDE_VI.md](./DEVELOPER_GUIDE_VI.md)

### Quy trình review tài liệu
1. Technical accuracy check
2. Language và grammar review
3. Consistency với existing docs
4. User experience validation

## Liên kết hữu ích

### Tài liệu GameBoy
- [Pan Docs](https://gbdev.io/pandocs/) - Tài liệu kỹ thuật GameBoy
- [GameBoy CPU Manual](http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf)
- [GameBoy Memory Map](https://gbdev.io/pandocs/Memory_Map.html)

### JavaScript Resources
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

### Emulation Resources
- [Emulation General Wiki](http://emulation.gametechwiki.com/)
- [Blargg's Test ROMs](https://github.com/retrio/gb-test-roms)
- [GameBoy Development Community](https://gbdev.io/)

## Đóng góp cho tài liệu

### Báo cáo lỗi trong tài liệu
- Tạo issue với label "documentation"
- Mô tả rõ phần nào không chính xác
- Đề xuất cách sửa nếu có thể

### Đề xuất cải thiện
- Tạo pull request với changes
- Giải thích lý do thay đổi
- Đảm bảo consistency với style guide

### Translation guidelines
- Giữ technical terms bằng tiếng Anh khi cần thiết
- Sử dụng thuật ngữ tiếng Việt phù hợp
- Đảm bảo accuracy của technical content

---

**Lưu ý:** Tài liệu này được cập nhật thường xuyên. Vui lòng kiểm tra version mới nhất trước khi sử dụng.
