# Tài liệu API jsGB

## Tổng quan

Tài liệu này mô tả chi tiết các API và interface của jsGB emulator. Mỗi module cung cấp các function và property để tương tác với hệ thống.

## jsGB Core Object

### jsGB.reset()
Khởi tạo lại toàn bộ hệ thống emulator.

```javascript
jsGB.reset();
```

**Chức năng:**
- Reset tất cả modules (CPU, MMU, GPU, Timer, Key, Log)
- Thiết lập initial state cho GameBoy
- Load ROM từ input field
- Khởi tạo giao diện debug

### jsGB.run()
Bắt đầu chạy emulator với tốc độ real-time.

```javascript
jsGB.run();
```

**Chức năng:**
- Bắt đầu main loop với interval 1ms
- Cập nhật UI button thành "Pause"
- Set Z80._stop = 0

### jsGB.pause()
Tạm dừng emulator.

```javascript
jsGB.pause();
```

**Chức năng:**
- Dừng main loop interval
- Set Z80._stop = 1
- Cập nhật debug display
- Cập nhật UI button thành "Run"

### jsGB.step()
Thực thi một instruction duy nhất (debug mode).

```javascript
jsGB.step();
```

**Chức năng:**
- Execute một CPU instruction
- Xử lý interrupts nếu có
- Cập nhật GPU và Timer
- Refresh debug display

### jsGB.frame()
Thực thi một frame hoàn chỉnh (~17556 cycles).

```javascript
jsGB.frame();
```

**Return:** Không có
**Side effects:** Cập nhật FPS counter

## Z80 CPU Module

### Z80.reset()
Reset CPU về trạng thái ban đầu.

```javascript
Z80.reset();
```

**Chức năng:**
- Clear tất cả registers
- Reset clock counters
- Set IME = 1
- Reset halt/stop flags

### Z80.exec()
Thực thi một instruction.

```javascript
Z80.exec();
```

**Chức năng:**
- Fetch opcode từ PC
- Execute instruction
- Cập nhật PC và clock
- Increment refresh register

### Z80._r (Registers)
Object chứa tất cả CPU registers.

```javascript
Z80._r = {
    a: 0,      // Accumulator (8-bit)
    b: 0,      // Register B (8-bit)
    c: 0,      // Register C (8-bit)
    d: 0,      // Register D (8-bit)
    e: 0,      // Register E (8-bit)
    h: 0,      // Register H (8-bit)
    l: 0,      // Register L (8-bit)
    f: 0,      // Flags register (8-bit)
    sp: 0,     // Stack Pointer (16-bit)
    pc: 0,     // Program Counter (16-bit)
    i: 0,      // Interrupt register (8-bit)
    r: 0,      // Refresh register (8-bit)
    m: 0,      // Machine cycles for last instruction
    ime: 0     // Interrupt Master Enable flag
}
```

### Z80._clock
Object quản lý timing.

```javascript
Z80._clock = {
    m: 0       // Total machine cycles
}
```

## Memory Management Unit (MMU)

### MMU.reset()
Reset memory system.

```javascript
MMU.reset();
```

**Chức năng:**
- Clear tất cả RAM areas
- Reset banking state
- Set BIOS mode
- Clear interrupt flags

### MMU.load(file)
Load ROM file vào memory.

```javascript
MMU.load('/path/to/rom.gb');
```

**Parameters:**
- `file` (string): Đường dẫn đến ROM file

**Chức năng:**
- Đọc ROM data
- Detect cartridge type
- Setup memory banking

### MMU.rb(addr)
Đọc byte từ địa chỉ memory.

```javascript
var value = MMU.rb(0x8000);
```

**Parameters:**
- `addr` (number): Địa chỉ memory (0x0000-0xFFFF)

**Returns:** 
- (number): Giá trị byte tại địa chỉ

### MMU.wb(addr, val)
Ghi byte vào địa chỉ memory.

```javascript
MMU.wb(0x8000, 0xFF);
```

**Parameters:**
- `addr` (number): Địa chỉ memory (0x0000-0xFFFF)
- `val` (number): Giá trị byte (0x00-0xFF)

### MMU.rw(addr)
Đọc word (2 bytes) từ memory.

```javascript
var value = MMU.rw(0x8000); // Đọc từ 0x8000 và 0x8001
```

**Parameters:**
- `addr` (number): Địa chỉ bắt đầu

**Returns:**
- (number): Giá trị 16-bit (little-endian)

### MMU.ww(addr, val)
Ghi word (2 bytes) vào memory.

```javascript
MMU.ww(0x8000, 0x1234);
```

**Parameters:**
- `addr` (number): Địa chỉ bắt đầu
- `val` (number): Giá trị 16-bit

## Graphics Processing Unit (GPU)

### GPU.reset()
Reset graphics system.

```javascript
GPU.reset();
```

**Chức năng:**
- Clear VRAM và OAM
- Reset palettes
- Clear tile cache
- Reset LCD state

### GPU.checkline()
Xử lý một scanline của LCD.

```javascript
GPU.checkline();
```

**Chức năng:**
- Cập nhật LCD mode
- Render scanline nếu cần
- Trigger interrupts
- Cập nhật LY register

### GPU.rb(addr)
Đọc GPU register.

```javascript
var lcdc = GPU.rb(0xFF40);
```

**Parameters:**
- `addr` (number): Địa chỉ register

**Returns:**
- (number): Giá trị register

### GPU.wb(addr, val)
Ghi GPU register.

```javascript
GPU.wb(0xFF40, 0x91); // Enable LCD
```

**Parameters:**
- `addr` (number): Địa chỉ register
- `val` (number): Giá trị mới

### GPU.updatetile(addr, val)
Cập nhật tile data khi VRAM thay đổi.

```javascript
GPU.updatetile(0x1000, 0xFF);
```

**Parameters:**
- `addr` (number): VRAM address
- `val` (number): New value

### GPU._vram
Video RAM array (8KB).

```javascript
GPU._vram[0x1000] = 0xFF; // Direct VRAM access
```

### GPU._oam
Object Attribute Memory array (160 bytes).

```javascript
GPU._oam[0] = 0x50; // Sprite Y position
```

## Input Handler (KEY)

### KEY.reset()
Reset input system.

```javascript
KEY.reset();
```

### KEY.rb()
Đọc joypad register.

```javascript
var joypad = KEY.rb();
```

**Returns:**
- (number): Joypad state

### KEY.wb(val)
Ghi joypad control register.

```javascript
KEY.wb(0x10); // Select direction keys
```

**Parameters:**
- `val` (number): Control value

### KEY.keydown(event)
Xử lý key press event.

```javascript
window.onkeydown = KEY.keydown;
```

**Parameters:**
- `event` (KeyboardEvent): Browser keyboard event

### KEY.keyup(event)
Xử lý key release event.

```javascript
window.onkeyup = KEY.keyup;
```

**Parameters:**
- `event` (KeyboardEvent): Browser keyboard event

## Timer System (TIMER)

### TIMER.reset()
Reset timer system.

```javascript
TIMER.reset();
```

### TIMER.inc()
Increment timer counters.

```javascript
TIMER.inc();
```

**Chức năng:**
- Cập nhật main clock
- Increment DIV register
- Check timer overflow
- Trigger timer interrupt

### TIMER.rb(addr)
Đọc timer register.

```javascript
var div = TIMER.rb(0xFF04);
```

**Parameters:**
- `addr` (number): Register address

**Returns:**
- (number): Register value

### TIMER.wb(addr, val)
Ghi timer register.

```javascript
TIMER.wb(0xFF07, 0x04); // Enable timer
```

**Parameters:**
- `addr` (number): Register address
- `val` (number): New value

## Logging System (LOG)

### LOG.reset()
Reset logging system.

```javascript
LOG.reset();
```

### LOG.out(module, message)
Ghi log message.

```javascript
LOG.out('CPU', 'Instruction executed');
```

**Parameters:**
- `module` (string): Tên module
- `message` (string): Log message

**Chức năng:**
- Thêm timestamp
- Hiển thị trên debug panel
- Format: `{timestamp} [module] message`

## Tab Management (tabMagic)

### tabMagic.init()
Khởi tạo tab system.

```javascript
tabMagic.init();
```

### tabMagic.sw(tabId)
Chuyển đổi tab.

```javascript
tabMagic.sw('tab_registers');
```

**Parameters:**
- `tabId` (string): ID của tab cần hiển thị

## File Reading (BinFileReader)

### new BinFileReader(fileURL)
Tạo file reader instance.

```javascript
var reader = new BinFileReader('/tests/tetris.gb');
```

**Parameters:**
- `fileURL` (string): Đường dẫn file

### reader.getFileSize()
Lấy kích thước file.

```javascript
var size = reader.getFileSize();
```

**Returns:**
- (number): File size in bytes

### reader.readString(length, offset)
Đọc string từ file.

```javascript
var data = reader.readString(1024, 0);
```

**Parameters:**
- `length` (number): Số bytes cần đọc
- `offset` (number): Vị trí bắt đầu

**Returns:**
- (string): File data

## Constants và Enums

### Memory Map Constants
```javascript
const MEMORY_MAP = {
    ROM_BANK_0: 0x0000,      // 0x0000-0x3FFF
    ROM_BANK_N: 0x4000,      // 0x4000-0x7FFF
    VRAM: 0x8000,            // 0x8000-0x9FFF
    EXTERNAL_RAM: 0xA000,    // 0xA000-0xBFFF
    WORK_RAM: 0xC000,        // 0xC000-0xDFFF
    OAM: 0xFE00,             // 0xFE00-0xFE9F
    IO_REGISTERS: 0xFF00,    // 0xFF00-0xFF7F
    HIGH_RAM: 0xFF80,        // 0xFF80-0xFFFE
    INTERRUPT_ENABLE: 0xFFFF
};
```

### LCD Mode Constants
```javascript
const LCD_MODES = {
    HBLANK: 0,        // Mode 0
    VBLANK: 1,        // Mode 1
    OAM_SEARCH: 2,    // Mode 2
    PIXEL_TRANSFER: 3 // Mode 3
};
```

### Interrupt Flags
```javascript
const INTERRUPTS = {
    VBLANK: 0x01,     // Bit 0
    LCD_STAT: 0x02,   // Bit 1
    TIMER: 0x04,      // Bit 2
    SERIAL: 0x08,     // Bit 3
    JOYPAD: 0x10      // Bit 4
};
```

## Error Handling

### Common Errors
- **FileLoadFailed**: ROM file không thể load
- **EOFReached**: Đọc quá end of file
- **InvalidOpcode**: CPU gặp opcode không hỗ trợ
- **MemoryAccessViolation**: Truy cập memory không hợp lệ

### Error Handling Pattern
```javascript
try {
    MMU.load('/path/to/rom.gb');
} catch(error) {
    LOG.out('ERROR', 'Failed to load ROM: ' + error.message);
}
```

## Ví dụ sử dụng

### Khởi chạy emulator cơ bản
```javascript
// Reset và load ROM
jsGB.reset();
document.getElementById('file').value = '/tests/tetris.gb';
MMU.load('/tests/tetris.gb');

// Bắt đầu chạy
jsGB.run();
```

### Debug CPU state
```javascript
// Pause emulator
jsGB.pause();

// Kiểm tra registers
console.log('A:', Z80._r.a.toString(16));
console.log('PC:', Z80._r.pc.toString(16));

// Single step
jsGB.step();
```

### Theo dõi memory
```javascript
// Đọc VRAM
var tileData = [];
for(var i = 0; i < 16; i++) {
    tileData[i] = MMU.rb(0x8000 + i);
}

// Ghi log
LOG.out('DEBUG', 'Tile data: ' + tileData.join(','));
```
