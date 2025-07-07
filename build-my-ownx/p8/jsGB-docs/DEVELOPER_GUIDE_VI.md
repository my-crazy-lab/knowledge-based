# Hướng dẫn phát triển jsGB

## Thiết lập môi trường phát triển

### Yêu cầu hệ thống
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Text editor hoặc IDE (VS Code, Sublime Text, etc.)
- Web server cục bộ (optional, cho việc load ROM files)

### Cấu trúc thư mục
```
jsGB/
├── index.html          # Entry point
├── js/                 # Core modules
├── tests/             # Test ROMs
├── docs/              # Documentation
└── README_VI.md       # Vietnamese README
```

## Quy trình phát triển

### 1. Thiết lập local development

```bash
# Clone repository
git clone <repository-url>
cd jsGB

# Khởi chạy local server (Python)
python -m http.server 8000

# Hoặc sử dụng Node.js
npx http-server

# Truy cập http://localhost:8000
```

### 2. Code structure và conventions

#### Naming conventions
- **Global objects**: Uppercase (Z80, MMU, GPU, etc.)
- **Private properties**: Prefix với underscore (_vram, _registers)
- **Functions**: camelCase (checkline, updatetile)
- **Constants**: UPPERCASE (TIMER_FREQ, LCD_WIDTH)

#### Module pattern
```javascript
MODULE_NAME = {
    // Private properties
    _property: value,
    
    // Public methods
    reset: function() {
        // Reset module state
    },
    
    // Core functionality
    mainFunction: function() {
        // Implementation
    }
};
```

### 3. Debugging và testing

#### Browser Developer Tools
```javascript
// Console debugging
console.log('CPU State:', Z80._r);
console.log('Memory at 0x8000:', MMU.rb(0x8000));

// Breakpoint trong code
debugger; // Dừng execution tại đây
```

#### Custom debug functions
```javascript
// Thêm vào jsGB object
jsGB.debugCPU = function() {
    console.log('A:', Z80._r.a.toString(16));
    console.log('PC:', Z80._r.pc.toString(16));
    console.log('SP:', Z80._r.sp.toString(16));
};

// Gọi từ console
jsGB.debugCPU();
```

## Thêm tính năng mới

### 1. Thêm opcode mới

#### Bước 1: Định nghĩa opcode
```javascript
// Trong z80.js, thêm vào Z80._ops
Z80._ops.NEW_OPCODE = function() {
    // Implementation
    Z80._r.m = 1; // Set machine cycles
    Z80._r.t = 4; // Set clock cycles
};
```

#### Bước 2: Map opcode
```javascript
// Trong Z80._map array
Z80._map[0xXX] = Z80._ops.NEW_OPCODE;
```

#### Bước 3: Test opcode
```javascript
// Tạo test case
function testNewOpcode() {
    Z80.reset();
    Z80._r.pc = 0x100;
    MMU.wb(0x100, 0xXX); // Opcode byte
    Z80.exec();
    
    // Verify results
    console.assert(Z80._r.a === expectedValue);
}
```

### 2. Thêm I/O register mới

#### Trong MMU.js
```javascript
// Read function
case 0xFFXX: 
    return NEW_MODULE.rb(addr);

// Write function  
case 0xFFXX:
    NEW_MODULE.wb(addr, val);
    break;
```

#### Tạo module mới
```javascript
NEW_MODULE = {
    _register: 0,
    
    rb: function(addr) {
        switch(addr) {
            case 0xFFXX: return NEW_MODULE._register;
        }
    },
    
    wb: function(addr, val) {
        switch(addr) {
            case 0xFFXX: NEW_MODULE._register = val; break;
        }
    }
};
```

### 3. Cải thiện GPU rendering

#### Thêm layer mới
```javascript
GPU.renderNewLayer = function() {
    // Get layer data
    var layerData = GPU.getLayerData();
    
    // Render to canvas
    for(var y = 0; y < 144; y++) {
        for(var x = 0; x < 160; x++) {
            var pixel = layerData[y][x];
            GPU.setPixel(x, y, pixel);
        }
    }
};
```

#### Tích hợp vào render pipeline
```javascript
GPU.checkline = function() {
    // Existing code...
    
    if(GPU._curline === 144) {
        // V-Blank start
        GPU.renderNewLayer();
    }
};
```

## Testing và Quality Assurance

### 1. Unit testing

#### Test CPU instructions
```javascript
function testCPUInstructions() {
    var tests = [
        {opcode: 0x3E, setup: {}, expect: {a: 0xFF}},
        {opcode: 0x06, setup: {}, expect: {b: 0xFF}},
        // More tests...
    ];
    
    tests.forEach(function(test) {
        Z80.reset();
        // Setup initial state
        Object.assign(Z80._r, test.setup);
        
        // Execute instruction
        MMU.wb(Z80._r.pc, test.opcode);
        Z80.exec();
        
        // Verify results
        Object.keys(test.expect).forEach(function(reg) {
            console.assert(Z80._r[reg] === test.expect[reg], 
                `Test failed for opcode 0x${test.opcode.toString(16)}`);
        });
    });
}
```

#### Test memory operations
```javascript
function testMemory() {
    MMU.reset();
    
    // Test write/read
    MMU.wb(0xC000, 0xAB);
    console.assert(MMU.rb(0xC000) === 0xAB);
    
    // Test banking
    MMU.wb(0x2000, 0x01); // Switch ROM bank
    console.assert(MMU._romoffs === 0x4000);
}
```

### 2. Integration testing

#### Test với ROM thực
```javascript
function testWithROM(romPath) {
    jsGB.reset();
    document.getElementById('file').value = romPath;
    MMU.load(romPath);
    
    // Run for specific number of frames
    for(var i = 0; i < 60; i++) {
        jsGB.frame();
    }
    
    // Verify state
    console.log('Test completed, CPU state:', Z80._r);
}
```

### 3. Performance testing

#### Measure frame rate
```javascript
function measurePerformance() {
    var startTime = performance.now();
    var frameCount = 0;
    
    var testInterval = setInterval(function() {
        jsGB.frame();
        frameCount++;
        
        if(frameCount >= 600) { // 10 seconds at 60fps
            var endTime = performance.now();
            var actualFPS = frameCount / ((endTime - startTime) / 1000);
            console.log('Average FPS:', actualFPS);
            clearInterval(testInterval);
        }
    }, 16.67); // Target 60fps
}
```

## Optimization Guidelines

### 1. Memory access optimization

#### Cache frequently accessed data
```javascript
// Bad: Multiple memory reads
for(var i = 0; i < 100; i++) {
    var value = MMU.rb(0x8000 + i);
    processValue(value);
}

// Good: Batch read
var data = [];
for(var i = 0; i < 100; i++) {
    data[i] = MMU.rb(0x8000 + i);
}
for(var i = 0; i < 100; i++) {
    processValue(data[i]);
}
```

#### Use typed arrays cho performance
```javascript
// Thay vì array thông thường
GPU._vram = [];

// Sử dụng Uint8Array
GPU._vram = new Uint8Array(8192);
```

### 2. Rendering optimization

#### Dirty region tracking
```javascript
GPU._dirtyRegions = [];

GPU.markDirty = function(x, y, width, height) {
    GPU._dirtyRegions.push({x: x, y: y, w: width, h: height});
};

GPU.renderDirtyRegions = function() {
    GPU._dirtyRegions.forEach(function(region) {
        GPU.renderRegion(region.x, region.y, region.w, region.h);
    });
    GPU._dirtyRegions = [];
};
```

### 3. CPU optimization

#### Instruction caching
```javascript
Z80._instructionCache = {};

Z80.exec = function() {
    var opcode = MMU.rb(Z80._r.pc++);
    
    if(!Z80._instructionCache[opcode]) {
        Z80._instructionCache[opcode] = Z80._map[opcode];
    }
    
    Z80._instructionCache[opcode]();
};
```

## Debugging Tools

### 1. Memory viewer
```javascript
jsGB.memoryViewer = function(start, length) {
    var output = '';
    for(var i = 0; i < length; i += 16) {
        var addr = start + i;
        var line = addr.toString(16).padStart(4, '0') + ': ';
        
        for(var j = 0; j < 16 && (i + j) < length; j++) {
            var byte = MMU.rb(addr + j);
            line += byte.toString(16).padStart(2, '0') + ' ';
        }
        
        output += line + '\n';
    }
    console.log(output);
};
```

### 2. Instruction tracer
```javascript
jsGB.enableTrace = function() {
    Z80._originalExec = Z80.exec;
    Z80.exec = function() {
        var opcode = MMU.rb(Z80._r.pc);
        console.log(`PC: ${Z80._r.pc.toString(16)}, Opcode: ${opcode.toString(16)}`);
        Z80._originalExec();
    };
};
```

### 3. Performance profiler
```javascript
jsGB.profiler = {
    _times: {},
    
    start: function(name) {
        this._times[name] = performance.now();
    },
    
    end: function(name) {
        var elapsed = performance.now() - this._times[name];
        console.log(`${name}: ${elapsed.toFixed(2)}ms`);
    }
};
```

## Contribution Guidelines

### 1. Code style
- Sử dụng 2 spaces cho indentation
- Semicolon bắt buộc
- Camel case cho function names
- Meaningful variable names

### 2. Documentation
- Comment cho complex algorithms
- JSDoc cho public functions
- Update README khi thêm features

### 3. Testing
- Test mọi new features
- Regression testing
- Performance impact assessment

### 4. Git workflow
```bash
# Tạo feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Add new feature: description"

# Push và tạo pull request
git push origin feature/new-feature
```
