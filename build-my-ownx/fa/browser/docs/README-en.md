# Custom Web Browser - Documentation

A complete web browser implementation built from scratch using vanilla JavaScript, featuring HTML parsing, CSS styling, layout calculation, and canvas rendering.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Components](#components)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Testing](#testing)
7. [API Reference](#api-reference)
8. [Examples](#examples)
9. [Contributing](#contributing)

## Overview

This project implements a functional web browser engine that can parse HTML and CSS, compute styles, calculate layout, and render content to a canvas. It demonstrates the fundamental concepts behind modern web browsers.

### Features

- **HTML Parser**: Converts HTML strings into DOM trees with error recovery
- **CSS Parser**: Parses CSS with selector matching and specificity calculation
- **Style Engine**: Applies CSS rules with cascading and inheritance
- **Layout Engine**: Calculates element positions using the CSS box model
- **Render Engine**: Paints content to canvas with colors, borders, and text
- **Debug Tools**: Built-in debugging interface for development

### Browser Support

The browser supports a subset of HTML and CSS features:

**HTML Elements**: div, p, h1-h6, span, a, strong, em, ul, ol, li, img, br, hr
**CSS Properties**: color, background-color, font-size, font-family, font-weight, margin, padding, border, width, height, display
**CSS Selectors**: element, class, ID, attribute selectors

## Architecture

The browser follows a traditional rendering pipeline:

```
HTML Input → HTML Parser → DOM Tree
CSS Input → CSS Parser → Stylesheet
                ↓
DOM Tree + Stylesheet → Style Engine → Styled Tree
                ↓
Styled Tree → Layout Engine → Layout Tree
                ↓
Layout Tree → Render Engine → Canvas Output
```

### Core Components

1. **HTMLParser**: Tokenizes and parses HTML into a DOM tree
2. **CSSParser**: Parses CSS rules and calculates selector specificity
3. **StyleEngine**: Matches selectors and applies styles with inheritance
4. **LayoutEngine**: Calculates positions and sizes using box model
5. **RenderEngine**: Renders the final output to a canvas

## Components

### HTML Parser

The HTML parser converts HTML strings into a tree of DOM nodes.

**Features:**
- Element parsing with attributes
- Text node handling
- Comment parsing
- Self-closing tag support
- Error recovery for malformed HTML
- Case-insensitive tag names

**Example:**
```javascript
const parser = new HTMLParser();
const result = parser.parse('<div class="container">Hello</div>');
console.log(result.document); // DOM tree
console.log(result.errors);   // Parse errors
```

### CSS Parser

The CSS parser handles CSS rules and selector parsing.

**Features:**
- Rule parsing with multiple selectors
- Declaration parsing with important flags
- Selector specificity calculation
- Comment handling
- Error recovery for invalid CSS

**Example:**
```javascript
const parser = new CSSParser();
const result = parser.parse('.container { color: red; }');
console.log(result.stylesheet); // Stylesheet object
console.log(result.errors);     // Parse errors
```

### Style Engine

The style engine applies CSS rules to DOM elements.

**Features:**
- Selector matching (element, class, ID, attribute)
- Specificity-based rule ordering
- Style inheritance
- Default browser styles
- Inline style support

**Example:**
```javascript
const styleEngine = new StyleEngine();
const styledTree = styleEngine.computeStyles(domTree, stylesheet);
```

### Layout Engine

The layout engine calculates element positions and sizes.

**Features:**
- CSS box model implementation
- Block and inline layout
- Margin, padding, border calculations
- Auto width/height calculation
- Text measurement

**Example:**
```javascript
const layoutEngine = new LayoutEngine();
const layoutTree = layoutEngine.layout(styledTree, viewport);
```

### Render Engine

The render engine paints the layout to a canvas.

**Features:**
- Background and border rendering
- Text rendering with fonts
- Color parsing (named, hex, rgb)
- Display list optimization
- SVG export capability

**Example:**
```javascript
const renderEngine = new RenderEngine(canvas);
renderEngine.render(layoutTree);
```

## Getting Started

### Prerequisites

- Modern web browser with HTML5 Canvas support
- No external dependencies required

### Installation

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Start entering HTML content in the address bar

### Project Structure

```
browser/
├── index.html          # Main browser interface
├── style.css          # Browser UI styles
├── js/
│   ├── main.js         # Browser integration
│   ├── html-parser.js  # HTML parsing
│   ├── css-parser.js   # CSS parsing
│   ├── style-engine.js # Style computation
│   ├── layout-engine.js# Layout calculation
│   └── render-engine.js# Canvas rendering
├── tests/
│   ├── test-runner.html# Test interface
│   └── *.test.js       # Test files
├── examples/
│   ├── simple.html     # Simple example
│   └── complex.html    # Complex example
└── docs/
    ├── README-en.md    # English documentation
    └── README-vi.md    # Vietnamese documentation
```

## Usage

### Basic Usage

1. Open `index.html` in your browser
2. Enter HTML content in the address bar
3. Click "Go" to render the content
4. Use debug panels to inspect DOM, CSS, and layout

### Example HTML Input

```html
<div style="background: #f0f0f0; padding: 20px;">
    <h1 style="color: #333;">Welcome</h1>
    <p class="intro">This is a paragraph with <strong>bold text</strong>.</p>
</div>
```

### Example CSS

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

### Debug Features

- **DOM Tree**: View the parsed HTML structure
- **CSS Rules**: See applied CSS rules and specificity
- **Layout**: Inspect calculated positions and sizes
- **Console**: View parsing errors and debug messages

## Testing

### Running Tests

1. Open `tests/test-runner.html` in your browser
2. Click "Run All Tests" to execute the test suite
3. View results for each component

### Test Coverage

- HTML Parser: 15 test cases
- CSS Parser: 16 test cases  
- Style Engine: 13 test cases
- Layout Engine: 11 test cases
- Render Engine: 12 test cases

### Writing Tests

```javascript
testRunner.addTest('Test Name', () => {
    // Test implementation
    testRunner.assertEqual(actual, expected);
    testRunner.assertNotNull(value);
    testRunner.assert(condition);
});
```

## API Reference

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

## Examples

### Simple Page

See `examples/simple.html` for a basic example demonstrating:
- Basic HTML structure
- CSS styling with classes
- Text formatting
- Background colors and borders

### Complex Page

See `examples/complex.html` for an advanced example featuring:
- Modern CSS layout techniques
- Responsive design patterns
- Complex selectors
- Multiple content sections

## Contributing

### Development Guidelines

1. Follow existing code style and patterns
2. Add tests for new features
3. Update documentation for API changes
4. Test across different browsers

### Known Limitations

- Limited CSS selector support (no pseudo-classes, combinators)
- Basic text layout (no line wrapping)
- No JavaScript execution
- Canvas-only rendering (no DOM manipulation)

### Future Enhancements

- CSS flexbox and grid support
- Advanced text layout with line wrapping
- Image loading and rendering
- Form element support
- JavaScript engine integration

## License

This project is for educational purposes and demonstrates web browser implementation concepts.
