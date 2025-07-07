# Tài liệu kỹ thuật jsGB

## Kiến trúc tổng quan

jsGB được thiết kế theo mô hình modular, mỗi component mô phỏng một phần cụ thể của phần cứng GameBoy:

```
┌─────────────────────────────────────────────────────────┐
│                    jsGB Core                            │
├─────────────────────────────────────────────────────────┤
│  Z80 CPU  │  MMU  │  GPU  │  Timer  │  Input  │  Log   │
└─────────────────────────────────────────────────────────┘
```

## Chi tiết các module

### 1. Z80 CPU Core (z80.js)

#### Cấu trúc registers
```javascript
Z80._r = {
    a: 0,    // Accumulator
    b: 0,    // Register B
    c: 0,    // Register C  
    d: 0,    // Register D
    e: 0,    // Register E
    h: 0,    // Register H
    l: 0,    // Register L
    f: 0,    // Flags register
    sp: 0,   // Stack Pointer
    pc: 0,   // Program Counter
    i: 0,    // Interrupt register
    r: 0,    // Refresh register
    m: 0,    // Machine cycles
    ime: 0   // Interrupt Master Enable
}
```

#### Chức năng chính
- **Instruction execution**: Thực thi các opcode Z80
- **Interrupt handling**: Xử lý ngắt VBlank, Timer, etc.
- **Clock management**: Quản lý timing và cycles
- **Halt/Stop states**: Xử lý trạng thái tạm dừng

#### Chu trình thực thi
1. Fetch instruction từ memory (MMU.rb)
2. Decode và execute instruction
3. Cập nhật registers và flags
4. Tăng Program Counter
5. Xử lý interrupts nếu có

### 2. Memory Management Unit (mmu.js)

#### Bản đồ memory GameBoy
```
0x0000-0x3FFF: ROM Bank 0 (16KB)
0x4000-0x7FFF: ROM Bank 1-N (16KB, switchable)
0x8000-0x9FFF: Video RAM (8KB)
0xA000-0xBFFF: External RAM (8KB, switchable)
0xC000-0xDFFF: Work RAM (8KB)
0xE000-0xFDFF: Echo RAM (mirror of Work RAM)
0xFE00-0xFE9F: Object Attribute Memory (OAM)
0xFEA0-0xFEFF: Unused
0xFF00-0xFF7F: I/O Registers
0xFF80-0xFFFE: High RAM (Zero Page)
0xFFFF: Interrupt Enable Register
```

#### Memory Banking (MBC1)
- **ROM Banking**: Chuyển đổi giữa các ROM bank (1-127)
- **RAM Banking**: Chuyển đổi giữa các RAM bank (0-3)
- **Banking modes**: Mode 0 (ROM) và Mode 1 (RAM)

#### Chức năng chính
- `rb(addr)`: Đọc byte từ địa chỉ
- `wb(addr, val)`: Ghi byte vào địa chỉ
- `rw(addr)`: Đọc word (2 bytes)
- `ww(addr, val)`: Ghi word (2 bytes)

### 3. Graphics Processing Unit (gpu.js)

#### Cấu trúc dữ liệu
```javascript
GPU = {
    _vram: [],        // Video RAM (8KB)
    _oam: [],         // Object Attribute Memory
    _tilemap: [],     // Tile data cache
    _palette: {       // Color palettes
        bg: [],       // Background palette
        obj0: [],     // Object palette 0
        obj1: []      // Object palette 1
    }
}
```

#### LCD Controller Registers
- **LCDC (0xFF40)**: LCD Control
- **STAT (0xFF41)**: LCD Status
- **SCY/SCX (0xFF42/43)**: Background scroll
- **LY (0xFF44)**: Current scanline
- **LYC (0xFF45)**: LY Compare

#### Rendering pipeline
1. **Mode 0**: H-Blank (204 cycles)
2. **Mode 1**: V-Blank (4560 cycles)
3. **Mode 2**: OAM Search (80 cycles)
4. **Mode 3**: Pixel Transfer (172 cycles)

#### Tile system
- **Tile size**: 8x8 pixels, 2 bits per pixel
- **Tile maps**: 32x32 tiles (256x256 pixels)
- **Sprites**: 8x8 hoặc 8x16 pixels, tối đa 40 sprites

### 4. Input Handler (key.js)

#### Joypad register (0xFF00)
```
Bit 7-6: Unused
Bit 5: P15 Select Action buttons (0=Select)
Bit 4: P14 Select Direction buttons (0=Select)
Bit 3: P13 Down or Start (0=Pressed)
Bit 2: P12 Up or Select (0=Pressed)
Bit 1: P11 Left or B (0=Pressed)
Bit 0: P10 Right or A (0=Pressed)
```

#### Key mapping
```javascript
// Direction keys
case 39: // Right arrow → Right
case 37: // Left arrow → Left  
case 38: // Up arrow → Up
case 40: // Down arrow → Down

// Action keys
case 90: // Z → A button
case 88: // X → B button
case 32: // Space → Select
case 13: // Enter → Start
```

### 5. Timer System (timer.js)

#### Timer registers
- **DIV (0xFF04)**: Divider register (16384 Hz)
- **TIMA (0xFF05)**: Timer counter
- **TMA (0xFF06)**: Timer modulo
- **TAC (0xFF07)**: Timer control

#### Timer frequencies
```javascript
switch(TIMER._tac & 3) {
    case 0: // 4096 Hz (64 cycles)
    case 1: // 262144 Hz (1 cycle)
    case 2: // 65536 Hz (4 cycles)
    case 3: // 16384 Hz (16 cycles)
}
```

### 6. Logging System (log.js)

#### Chức năng
- Ghi log với timestamp
- Hiển thị trên giao diện debug
- Theo dõi hoạt động của các module

## Chu trình chính (Main Loop)

```javascript
function frame() {
    var fclock = Z80._clock.m + 17556; // Target cycles per frame
    
    do {
        // Execute CPU instruction
        if(Z80._halt) {
            Z80._r.m = 1;
        } else {
            Z80._map[MMU.rb(Z80._r.pc++)]();
            Z80._r.pc &= 65535;
        }
        
        // Handle interrupts
        if(Z80._r.ime && MMU._ie && MMU._if) {
            // Process interrupt
        }
        
        // Update subsystems
        Z80._clock.m += Z80._r.m;
        GPU.checkline();
        TIMER.inc();
        
    } while(Z80._clock.m < fclock);
}
```

## Interrupt System

### Interrupt types
1. **V-Blank (Bit 0)**: Khi LCD vào V-Blank period
2. **LCD STAT (Bit 1)**: LCD status interrupts
3. **Timer (Bit 2)**: Timer overflow
4. **Serial (Bit 3)**: Serial transfer complete
5. **Joypad (Bit 4)**: Joypad input

### Interrupt handling
```javascript
if(Z80._r.ime && MMU._ie && MMU._if) {
    Z80._halt = 0;
    Z80._r.ime = 0;
    var ifired = MMU._ie & MMU._if;
    
    if(ifired & 1) {        // V-Blank
        MMU._if &= 0xFE;
        Z80._ops.RST40();
    }
    // ... other interrupts
}
```

## Performance Optimization

### Timing accuracy
- **CPU cycles**: Mỗi instruction có timing chính xác
- **Frame rate**: ~60 FPS (16.67ms per frame)
- **Cycle budget**: 17556 cycles per frame

### Memory access optimization
- Cache tile data để tránh re-decode
- Optimize sprite rendering
- Efficient memory mapping

## Debug Features

### Register viewer
- Hiển thị real-time CPU registers
- I/O register monitoring
- Memory inspection

### Tile viewer
- Xem tile graphics data
- Navigate qua tile numbers
- Visual tile representation

### Breakpoint system
- Dừng execution tại PC address
- Single-step debugging
- Trace execution

## Tương thích ROM

### Supported cartridge types
- **No MBC**: Simple ROM only
- **MBC1**: Memory Bank Controller 1
- **Future**: MBC2, MBC3, MBC5

### ROM loading
- Binary file reading via BinFileReader
- Automatic cartridge type detection
- Memory bank initialization

## Hạn chế và cải tiến

### Hiện tại chưa hỗ trợ
- Sound Processing Unit (SPU)
- Window layer rendering
- Color GameBoy features
- Save state functionality

### Kế hoạch phát triển
- Implement sound system
- Add window layer support
- Improve timing accuracy
- Add more MBC types
- Save/load states
