# 🚀 Hướng Dẫn Chạy Web Browser

## 📋 Yêu Cầu Hệ Thống

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần cài đặt thêm gì khác

## 🎯 Cách 1: Chạy Browser Trực Tiếp

### Bước 1: Mở Browser
```bash
# Mở file trong trình duyệt
open build-my-ownx/fa/browser/index.html
# Hoặc double-click vào file index.html
```

### Bước 2: Sử dụng Dropdown Examples
1. Nhìn vào thanh địa chỉ, bạn sẽ thấy dropdown "Load Example..."
2. Chọn một trong các options:
   - **Simple Example**: Ví dụ cơ bản với HTML/CSS đơn giản
   - **Complex Example**: Ví dụ phức tạp với layout hiện đại
   - **Test Page**: Trang test các tính năng cơ bản

### Bước 3: Xem Kết Quả
- Nội dung sẽ được render trên canvas
- Sử dụng debug panels để xem:
  - DOM Tree: Cấu trúc HTML đã parse
  - CSS Rules: Các quy tắc CSS được áp dụng
  - Layout: Thông tin bố cục và kích thước
  - Console: Log và error messages

## 🎯 Cách 2: Nhập HTML Trực Tiếp

### Ví Dụ Đơn Giản
Copy và paste vào thanh địa chỉ:
```html
<div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
    <h1 style="color: #333; text-align: center;">Xin Chào!</h1>
    <p style="color: #666; font-size: 16px;">Đây là một ví dụ đơn giản.</p>
    <div style="background: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 4px;">
        Button Example
    </div>
</div>
```

### Ví Dụ Với CSS Internal
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 600px; background: white; padding: 30px; border-radius: 10px; }
        .title { color: #2196F3; font-size: 28px; margin-bottom: 20px; }
        .content { color: #555; line-height: 1.6; }
        .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">Custom Browser Demo</h1>
        <div class="content">
            <p>Browser này hỗ trợ:</p>
            <ul>
                <li>HTML parsing</li>
                <li>CSS styling</li>
                <li>Layout calculation</li>
                <li>Canvas rendering</li>
            </ul>
        </div>
        <div class="highlight">
            <strong>Lưu ý:</strong> Đây là highlight box với border màu vàng.
        </div>
    </div>
</body>
</html>
```

## 🧪 Cách 3: Chạy Tests

### Mở Test Runner
```bash
# Mở file test trong trình duyệt
open build-my-ownx/fa/browser/tests/test-runner.html
```

### Chạy Tests
1. Click button "Run All Tests"
2. Xem kết quả test cho từng component:
   - ✅ HTML Parser: 15 tests
   - ✅ CSS Parser: 16 tests
   - ✅ Style Engine: 13 tests
   - ✅ Layout Engine: 11 tests
   - ✅ Render Engine: 12 tests

## 🎨 Các Tính Năng Được Hỗ Trợ

### HTML Elements
- `div`, `p`, `h1-h6`, `span`, `a`
- `strong`, `em`, `ul`, `ol`, `li`
- `img`, `br`, `hr`

### CSS Properties
- **Colors**: `color`, `background-color`
- **Typography**: `font-family`, `font-size`, `font-weight`, `font-style`
- **Box Model**: `margin`, `padding`, `border`, `width`, `height`
- **Layout**: `display` (block, inline, inline-block)
- **Text**: `text-align`, `text-decoration`

### CSS Selectors
- **Element**: `p`, `div`, `h1`
- **Class**: `.container`, `.highlight`
- **ID**: `#header`, `#main`
- **Attribute**: `[type="text"]`, `[class*="btn"]`

## 🔧 Debug Features

### DOM Tree Panel
- Xem cấu trúc HTML đã được parse
- Hiển thị attributes và text nodes
- Indent để thể hiện hierarchy

### CSS Rules Panel
- Danh sách tất cả CSS rules
- Hiển thị selectors và declarations
- Thông tin về specificity

### Layout Panel
- Thông tin về box model
- Positions và dimensions
- Margin, padding, border values

### Console Panel
- Parse errors và warnings
- Debug messages
- Timestamp cho mỗi log entry

## 🚨 Troubleshooting

### Browser Không Hiển Thị Gì
1. Kiểm tra Console tab để xem errors
2. Đảm bảo HTML syntax đúng
3. Thử với ví dụ đơn giản trước

### CSS Không Được Áp Dụng
1. Kiểm tra CSS syntax trong CSS Rules panel
2. Xem specificity conflicts
3. Đảm bảo selectors match với elements

### Layout Bị Lỗi
1. Xem Layout panel để debug box model
2. Kiểm tra width/height calculations
3. Verify margin/padding values

## 📱 Tips & Tricks

### Performance
- Browser hoạt động tốt nhất với HTML < 1000 lines
- Tránh CSS rules quá phức tạp
- Sử dụng simple selectors cho performance tốt hơn

### Best Practices
- Luôn bắt đầu với `<!DOCTYPE html>`
- Sử dụng proper HTML structure
- Test với Simple Example trước khi thử Complex

### Keyboard Shortcuts
- `Enter` trong address bar = Click "Go"
- Refresh browser page để reset state
- Use browser dev tools để debug JavaScript errors

## 🎓 Learning Resources

### Hiểu Browser Engine
1. Chạy Simple Example và xem DOM Tree
2. Modify CSS và observe changes trong Layout panel
3. Experiment với different selectors

### Advanced Usage
1. Thử Complex Example để hiểu advanced features
2. Run tests để hiểu internal workings
3. Read source code trong js/ folder

Chúc bạn khám phá vui vẻ với custom web browser! 🎉
