# Trình Duyệt Web Tùy Chỉnh - Tài Liệu

Một trình duyệt web hoàn chỉnh được xây dựng từ đầu bằng vanilla JavaScript, bao gồm phân tích HTML, tạo kiểu CSS, tính toán bố cục và hiển thị canvas.

## Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Kiến Trúc](#kiến-trúc)
3. [Các Thành Phần](#các-thành-phần)
4. [Bắt Đầu](#bắt-đầu)
5. [Sử Dụng](#sử-dụng)
6. [Kiểm Thử](#kiểm-thử)
7. [Tham Khảo API](#tham-khảo-api)
8. [Ví Dụ](#ví-dụ)
9. [Đóng Góp](#đóng-góp)

## Tổng Quan

Dự án này triển khai một engine trình duyệt web có thể phân tích HTML và CSS, tính toán kiểu dáng, tính toán bố cục và hiển thị nội dung lên canvas. Nó minh họa các khái niệm cơ bản đằng sau các trình duyệt web hiện đại.

### Tính Năng

- **Bộ Phân Tích HTML**: Chuyển đổi chuỗi HTML thành cây DOM với khôi phục lỗi
- **Bộ Phân Tích CSS**: Phân tích CSS với khớp selector và tính toán độ ưu tiên
- **Engine Kiểu Dáng**: Áp dụng quy tắc CSS với cascading và kế thừa
- **Engine Bố Cục**: Tính toán vị trí phần tử sử dụng mô hình hộp CSS
- **Engine Hiển Thị**: Vẽ nội dung lên canvas với màu sắc, viền và văn bản
- **Công Cụ Debug**: Giao diện debug tích hợp cho phát triển

### Hỗ Trợ Trình Duyệt

Trình duyệt hỗ trợ một tập con các tính năng HTML và CSS:

**Phần Tử HTML**: div, p, h1-h6, span, a, strong, em, ul, ol, li, img, br, hr
**Thuộc Tính CSS**: color, background-color, font-size, font-family, font-weight, margin, padding, border, width, height, display
**Selector CSS**: element, class, ID, attribute selectors

## Kiến Trúc

Trình duyệt tuân theo pipeline hiển thị truyền thống:

```
HTML Input → Bộ Phân Tích HTML → Cây DOM
CSS Input → Bộ Phân Tích CSS → Stylesheet
                ↓
Cây DOM + Stylesheet → Engine Kiểu Dáng → Cây Có Kiểu
                ↓
Cây Có Kiểu → Engine Bố Cục → Cây Bố Cục
                ↓
Cây Bố Cục → Engine Hiển Thị → Đầu Ra Canvas
```

### Các Thành Phần Cốt Lõi

1. **HTMLParser**: Tokenize và phân tích HTML thành cây DOM
2. **CSSParser**: Phân tích quy tắc CSS và tính toán độ ưu tiên selector
3. **StyleEngine**: Khớp selector và áp dụng kiểu với kế thừa
4. **LayoutEngine**: Tính toán vị trí và kích thước sử dụng mô hình hộp
5. **RenderEngine**: Hiển thị đầu ra cuối cùng lên canvas

## Các Thành Phần

### Bộ Phân Tích HTML

Bộ phân tích HTML chuyển đổi chuỗi HTML thành cây các node DOM.

**Tính Năng:**
- Phân tích phần tử với thuộc tính
- Xử lý node văn bản
- Phân tích comment
- Hỗ trợ thẻ tự đóng
- Khôi phục lỗi cho HTML không đúng định dạng
- Tên thẻ không phân biệt chữ hoa thường

**Ví Dụ:**
```javascript
const parser = new HTMLParser();
const result = parser.parse('<div class="container">Xin chào</div>');
console.log(result.document); // Cây DOM
console.log(result.errors);   // Lỗi phân tích
```

### Bộ Phân Tích CSS

Bộ phân tích CSS xử lý quy tắc CSS và phân tích selector.

**Tính Năng:**
- Phân tích quy tắc với nhiều selector
- Phân tích khai báo với cờ important
- Tính toán độ ưu tiên selector
- Xử lý comment
- Khôi phục lỗi cho CSS không hợp lệ

**Ví Dụ:**
```javascript
const parser = new CSSParser();
const result = parser.parse('.container { color: red; }');
console.log(result.stylesheet); // Đối tượng stylesheet
console.log(result.errors);     // Lỗi phân tích
```

### Engine Kiểu Dáng

Engine kiểu dáng áp dụng quy tắc CSS cho các phần tử DOM.

**Tính Năng:**
- Khớp selector (element, class, ID, attribute)
- Sắp xếp quy tắc dựa trên độ ưu tiên
- Kế thừa kiểu
- Kiểu mặc định của trình duyệt
- Hỗ trợ kiểu inline

**Ví Dụ:**
```javascript
const styleEngine = new StyleEngine();
const styledTree = styleEngine.computeStyles(domTree, stylesheet);
```

### Engine Bố Cục

Engine bố cục tính toán vị trí và kích thước phần tử.

**Tính Năng:**
- Triển khai mô hình hộp CSS
- Bố cục block và inline
- Tính toán margin, padding, border
- Tính toán width/height tự động
- Đo lường văn bản

**Ví Dụ:**
```javascript
const layoutEngine = new LayoutEngine();
const layoutTree = layoutEngine.layout(styledTree, viewport);
```

### Engine Hiển Thị

Engine hiển thị vẽ bố cục lên canvas.

**Tính Năng:**
- Hiển thị nền và viền
- Hiển thị văn bản với font
- Phân tích màu (tên, hex, rgb)
- Tối ưu hóa danh sách hiển thị
- Khả năng xuất SVG

**Ví Dụ:**
```javascript
const renderEngine = new RenderEngine(canvas);
renderEngine.render(layoutTree);
```

## Bắt Đầu

### Yêu Cầu Tiên Quyết

- Trình duyệt web hiện đại với hỗ trợ HTML5 Canvas
- Không cần thư viện bên ngoài

### Cài Đặt

1. Clone hoặc tải xuống các file dự án
2. Mở `index.html` trong trình duyệt web
3. Bắt đầu nhập nội dung HTML trong thanh địa chỉ

### Cấu Trúc Dự Án

```
browser/
├── index.html          # Giao diện trình duyệt chính
├── style.css          # Kiểu UI trình duyệt
├── js/
│   ├── main.js         # Tích hợp trình duyệt
│   ├── html-parser.js  # Phân tích HTML
│   ├── css-parser.js   # Phân tích CSS
│   ├── style-engine.js # Tính toán kiểu
│   ├── layout-engine.js# Tính toán bố cục
│   └── render-engine.js# Hiển thị canvas
├── tests/
│   ├── test-runner.html# Giao diện test
│   └── *.test.js       # File test
├── examples/
│   ├── simple.html     # Ví dụ đơn giản
│   └── complex.html    # Ví dụ phức tạp
└── docs/
    ├── README-en.md    # Tài liệu tiếng Anh
    └── README-vi.md    # Tài liệu tiếng Việt
```

## Sử Dụng

### Sử Dụng Cơ Bản

1. Mở `index.html` trong trình duyệt
2. Nhập nội dung HTML trong thanh địa chỉ
3. Nhấp "Go" để hiển thị nội dung
4. Sử dụng panel debug để kiểm tra DOM, CSS và bố cục

### Ví Dụ HTML Input

```html
<div style="background: #f0f0f0; padding: 20px;">
    <h1 style="color: #333;">Chào Mừng</h1>
    <p class="intro">Đây là đoạn văn với <strong>văn bản đậm</strong>.</p>
</div>
```

### Ví Dụ CSS

```css
.intro {
    color: #666;
    font-style: italic;
    margin: 16px 0;
}

strong {
    color: #000;
    font-weight: bold;
}
```

### Tính Năng Debug

- **Cây DOM**: Xem cấu trúc HTML đã phân tích
- **Quy Tắc CSS**: Xem quy tắc CSS được áp dụng và độ ưu tiên
- **Bố Cục**: Kiểm tra vị trí và kích thước đã tính toán
- **Console**: Xem lỗi phân tích và thông báo debug

## Kiểm Thử

### Chạy Test

1. Mở `tests/test-runner.html` trong trình duyệt
2. Nhấp "Run All Tests" để thực thi bộ test
3. Xem kết quả cho từng thành phần

### Phạm Vi Test

- Bộ Phân Tích HTML: 15 test case
- Bộ Phân Tích CSS: 16 test case
- Engine Kiểu Dáng: 13 test case
- Engine Bố Cục: 11 test case
- Engine Hiển Thị: 12 test case

### Viết Test

```javascript
testRunner.addTest('Tên Test', () => {
    // Triển khai test
    testRunner.assertEqual(actual, expected);
    testRunner.assertNotNull(value);
    testRunner.assert(condition);
});
```

## Tham Khảo API

### HTMLParser

```javascript
class HTMLParser {
    parse(html: string): { document: DocumentNode, errors: string[] }
}
```

### CSSParser

```javascript
class CSSParser {
    parse(css: string): { stylesheet: Stylesheet, errors: string[] }
}
```

### StyleEngine

```javascript
class StyleEngine {
    computeStyles(domTree: DocumentNode, stylesheet: Stylesheet): StyledNode
}
```

### LayoutEngine

```javascript
class LayoutEngine {
    layout(styledNode: StyledNode, containingBlock: Rect): LayoutBox
}
```

### RenderEngine

```javascript
class RenderEngine {
    constructor(canvas: HTMLCanvasElement)
    render(layoutBox: LayoutBox): void
    exportSVG(): string
}
```

## Ví Dụ

### Trang Đơn Giản

Xem `examples/simple.html` cho ví dụ cơ bản minh họa:
- Cấu trúc HTML cơ bản
- Tạo kiểu CSS với class
- Định dạng văn bản
- Màu nền và viền

### Trang Phức Tạp

Xem `examples/complex.html` cho ví dụ nâng cao có:
- Kỹ thuật bố cục CSS hiện đại
- Mẫu thiết kế responsive
- Selector phức tạp
- Nhiều phần nội dung

## Đóng Góp

### Hướng Dẫn Phát Triển

1. Tuân theo kiểu code và pattern hiện có
2. Thêm test cho tính năng mới
3. Cập nhật tài liệu cho thay đổi API
4. Test trên các trình duyệt khác nhau

### Hạn Chế Đã Biết

- Hỗ trợ CSS selector hạn chế (không có pseudo-class, combinator)
- Bố cục văn bản cơ bản (không có xuống dòng)
- Không thực thi JavaScript
- Chỉ hiển thị canvas (không thao tác DOM)

### Cải Tiến Tương Lai

- Hỗ trợ CSS flexbox và grid
- Bố cục văn bản nâng cao với xuống dòng
- Tải và hiển thị hình ảnh
- Hỗ trợ phần tử form
- Tích hợp JavaScript engine

## Giấy Phép

Dự án này dành cho mục đích giáo dục và minh họa các khái niệm triển khai trình duyệt web.
