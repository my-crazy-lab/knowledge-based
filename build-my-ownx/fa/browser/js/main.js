/**
 * Main Browser Application - Integrates all components
 */

class Browser {
    constructor() {
        this.htmlParser = new HTMLParser();
        this.cssParser = new CSSParser();
        this.styleEngine = new StyleEngine();
        this.layoutEngine = new LayoutEngine();
        
        this.canvas = document.getElementById('browser-canvas');
        this.renderEngine = new RenderEngine(this.canvas);
        
        this.history = [];
        this.currentIndex = -1;
        
        this.initializeUI();
        this.loadDefaultPage();
    }

    initializeUI() {
        // Address bar
        const urlInput = document.getElementById('url-input');
        const goBtn = document.getElementById('go-btn');
        
        goBtn.addEventListener('click', () => {
            this.navigate(urlInput.value);
        });
        
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigate(urlInput.value);
            }
        });
        
        // Navigation buttons
        document.getElementById('back-btn').addEventListener('click', () => {
            this.goBack();
        });
        
        document.getElementById('forward-btn').addEventListener('click', () => {
            this.goForward();
        });
        
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.refresh();
        });
        
        // Debug tabs
        const debugTabs = document.querySelectorAll('.debug-tab');
        debugTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchDebugTab(tab.dataset.tab);
            });
        });

        // Example selector
        const exampleSelect = document.getElementById('example-select');
        exampleSelect.addEventListener('change', () => {
            if (exampleSelect.value) {
                this.loadExample(exampleSelect.value);
                exampleSelect.value = ''; // Reset selection
            }
        });
    }

    navigate(input) {
        this.log('Navigating to: ' + input);
        
        try {
            let html, css = '';
            
            // Check if input is a URL or HTML content
            if (input.startsWith('http://') || input.startsWith('https://')) {
                // For demo purposes, we'll just show an error
                this.logError('URL loading not implemented. Please enter HTML content directly.');
                return;
            } else {
                // Treat as HTML content
                html = input;
                
                // Extract CSS from style tags
                const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
                if (styleMatches) {
                    css = styleMatches.map(match => 
                        match.replace(/<\/?style[^>]*>/gi, '')
                    ).join('\n');
                }
            }
            
            this.renderPage(html, css);
            
            // Add to history
            this.addToHistory(input);
            
        } catch (error) {
            this.logError('Navigation failed: ' + error.message);
        }
    }

    renderPage(html, css = '') {
        try {
            this.log('Parsing HTML...');
            const htmlResult = this.htmlParser.parse(html);
            
            if (htmlResult.errors.length > 0) {
                htmlResult.errors.forEach(error => this.logError('HTML: ' + error));
            }
            
            this.log('Parsing CSS...');
            const cssResult = this.cssParser.parse(css);
            
            if (cssResult.errors.length > 0) {
                cssResult.errors.forEach(error => this.logError('CSS: ' + error));
            }
            
            this.log('Computing styles...');
            const styledTree = this.styleEngine.computeStyles(htmlResult.document, cssResult.stylesheet);
            
            this.log('Calculating layout...');
            const viewport = {
                content: {
                    x: 0,
                    y: 0,
                    width: this.canvas.width,
                    height: 0
                }
            };
            const layoutTree = this.layoutEngine.layout(styledTree, viewport);
            
            this.log('Rendering...');
            this.renderEngine.render(layoutTree);
            
            // Update debug panels
            this.updateDebugPanels(htmlResult.document, cssResult.stylesheet, layoutTree);
            
            this.log('Page rendered successfully!');
            
        } catch (error) {
            this.logError('Rendering failed: ' + error.message);
            console.error(error);
        }
    }

    updateDebugPanels(domTree, stylesheet, layoutTree) {
        // DOM Tree
        document.getElementById('dom-tree').textContent = domTree.toString();
        
        // CSS Rules
        document.getElementById('css-rules').textContent = stylesheet.toString();
        
        // Layout Tree
        document.getElementById('layout-tree').textContent = layoutTree.toString();
    }

    addToHistory(url) {
        // Remove any forward history
        this.history = this.history.slice(0, this.currentIndex + 1);
        
        // Add new entry
        this.history.push(url);
        this.currentIndex++;
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update address bar
        document.getElementById('url-input').value = url;
    }

    goBack() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const url = this.history[this.currentIndex];
            document.getElementById('url-input').value = url;
            this.navigate(url);
        }
    }

    goForward() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            const url = this.history[this.currentIndex];
            document.getElementById('url-input').value = url;
            this.navigate(url);
        }
    }

    refresh() {
        if (this.currentIndex >= 0) {
            const url = this.history[this.currentIndex];
            this.navigate(url);
        }
    }

    updateNavigationButtons() {
        document.getElementById('back-btn').disabled = this.currentIndex <= 0;
        document.getElementById('forward-btn').disabled = this.currentIndex >= this.history.length - 1;
    }

    switchDebugTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.debug-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update content sections
        document.querySelectorAll('.debug-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tabName}-debug`).classList.add('active');
    }

    loadExample(exampleName) {
        let html = '';

        switch (exampleName) {
            case 'simple':
                html = this.getSimpleExample();
                break;
            case 'complex':
                html = this.getComplexExample();
                break;
            case 'test':
                html = this.getTestExample();
                break;
            default:
                return;
        }

        document.getElementById('url-input').value = html;
        this.navigate(html);
    }

    getSimpleExample() {
        return `<!DOCTYPE html>
<html>
<head>
    <title>Simple Example</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; }
        h1 { color: #333; text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        p { line-height: 1.6; margin-bottom: 15px; color: #555; }
        .highlight { background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .button { background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 4px; margin: 10px 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Simple Web Page Example</h1>
        <p>This is a simple example demonstrating basic HTML and CSS features.</p>
        <div class="highlight">
            <strong>Note:</strong> This is a highlighted section with custom styling.
        </div>
        <p>You can test different HTML and CSS features by entering them in the address bar above.</p>
        <div style="text-align: center;">
            <span class="button">Sample Button</span>
        </div>
    </div>
</body>
</html>`;
    }

    getComplexExample() {
        return `<!DOCTYPE html>
<html>
<head>
    <title>Complex Example</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .header { background: rgba(255, 255, 255, 0.95); padding: 20px 0; }
        .nav { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #667eea; }
        .main { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .hero { text-align: center; background: white; padding: 60px 40px; border-radius: 20px; margin-bottom: 40px; }
        .hero h1 { font-size: 48px; margin-bottom: 20px; color: #667eea; }
        .hero p { font-size: 18px; color: #666; margin: 0 auto 30px; }
        .features { display: block; }
        .feature-card { background: white; padding: 30px; border-radius: 15px; margin: 20px 0; }
        .feature-card h3 { font-size: 24px; margin-bottom: 15px; color: #333; }
        .feature-card p { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">CustomBrowser</div>
        </nav>
    </header>
    <main class="main">
        <section class="hero">
            <h1>Web Browser from Scratch</h1>
            <p>A complete web browser implementation built with vanilla JavaScript.</p>
        </section>
        <section class="features">
            <div class="feature-card">
                <h3>HTML Parser</h3>
                <p>Robust HTML parsing with support for elements, attributes, comments, and error recovery.</p>
            </div>
            <div class="feature-card">
                <h3>CSS Engine</h3>
                <p>Complete CSS parser with selector matching and specificity calculation.</p>
            </div>
            <div class="feature-card">
                <h3>Layout System</h3>
                <p>CSS box model implementation with proper margin, padding, and border calculations.</p>
            </div>
        </section>
    </main>
</body>
</html>`;
    }

    getTestExample() {
        return `<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .red { color: red; }
        .blue { color: blue; }
        .large { font-size: 24px; }
        #special { background-color: yellow; padding: 10px; }
        .box { border: 2px solid black; padding: 15px; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>Browser Test Page</h1>
    <p class="red">This text should be red.</p>
    <p class="blue large">This text should be blue and large.</p>
    <div id="special">This div has a yellow background.</div>
    <div class="box">
        <h2>Box with Border</h2>
        <p>This content is inside a bordered box with padding and margin.</p>
        <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
        </ul>
    </div>
    <p>Text with <strong>bold</strong> and <em>italic</em> formatting.</p>
</body>
</html>`;
    }

    loadDefaultPage() {
        const defaultHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Custom Browser</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
        }
        .content {
            background-color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .feature {
            margin: 15px 0;
            padding: 10px;
            border-left: 4px solid #4CAF50;
            background-color: #f9f9f9;
        }
        .code {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Custom Web Browser</h1>
        <p>Built from scratch with JavaScript</p>
    </div>
    
    <div class="content">
        <h2>Features Implemented</h2>
        
        <div class="feature">
            <h3>HTML Parser</h3>
            <p>Parses HTML into a DOM tree with support for elements, attributes, text, and comments.</p>
        </div>
        
        <div class="feature">
            <h3>CSS Parser</h3>
            <p>Parses CSS with selector matching and specificity calculation.</p>
        </div>
        
        <div class="feature">
            <h3>Style Engine</h3>
            <p>Applies CSS rules to DOM elements with cascading and inheritance.</p>
        </div>
        
        <div class="feature">
            <h3>Layout Engine</h3>
            <p>Calculates element positions and sizes using the CSS box model.</p>
        </div>
        
        <div class="feature">
            <h3>Render Engine</h3>
            <p>Paints the layout to a canvas with support for colors, borders, and text.</p>
        </div>
    </div>
    
    <div class="content">
        <h2>Try It Out</h2>
        <p>Enter HTML content in the address bar above to see it rendered!</p>
        
        <div class="code">
&lt;h1 style="color: blue;"&gt;Hello World!&lt;/h1&gt;
&lt;p&gt;This is a test paragraph.&lt;/p&gt;
        </div>
    </div>
</body>
</html>`;
        
        document.getElementById('url-input').value = defaultHTML;
        this.navigate(defaultHTML);
    }

    log(message) {
        const console = document.getElementById('console-output');
        const logEntry = document.createElement('div');
        logEntry.className = 'console-log console-info';
        logEntry.textContent = `[INFO] ${new Date().toLocaleTimeString()}: ${message}`;
        console.appendChild(logEntry);
        console.scrollTop = console.scrollHeight;
    }

    logError(message) {
        const console = document.getElementById('console-output');
        const logEntry = document.createElement('div');
        logEntry.className = 'console-log console-error';
        logEntry.textContent = `[ERROR] ${new Date().toLocaleTimeString()}: ${message}`;
        console.appendChild(logEntry);
        console.scrollTop = console.scrollHeight;
    }

    logWarn(message) {
        const console = document.getElementById('console-output');
        const logEntry = document.createElement('div');
        logEntry.className = 'console-log console-warn';
        logEntry.textContent = `[WARN] ${new Date().toLocaleTimeString()}: ${message}`;
        console.appendChild(logEntry);
        console.scrollTop = console.scrollHeight;
    }
}

// Initialize browser when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.browser = new Browser();
});
