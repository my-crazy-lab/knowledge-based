/**
 * Style Engine Tests
 */

function registerStyleEngineTests(testRunner) {
    testRunner.addTest('Style Engine - Apply basic styles', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<p>Hello</p>').document;
        const stylesheet = cssParser.parse('p { color: red; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        testRunner.assertNotNull(styledTree);
        const pElement = styledTree.children[0];
        testRunner.assertEqual(pElement.getStyle('color'), 'red');
    });

    testRunner.addTest('Style Engine - Selector matching', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<div class="container"><p id="intro">Hello</p></div>').document;
        const stylesheet = cssParser.parse(`
            .container { background: blue; }
            #intro { color: red; }
            p { font-size: 16px; }
        `).stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const divElement = styledTree.children[0];
        const pElement = divElement.children[0];
        
        testRunner.assertEqual(divElement.getStyle('background'), 'blue');
        testRunner.assertEqual(pElement.getStyle('color'), 'red');
        testRunner.assertEqual(pElement.getStyle('font-size'), '16px');
    });

    testRunner.addTest('Style Engine - Specificity ordering', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<p id="special" class="highlight">Text</p>').document;
        const stylesheet = cssParser.parse(`
            p { color: black; }
            .highlight { color: blue; }
            #special { color: red; }
        `).stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const pElement = styledTree.children[0];
        
        // ID selector should win (highest specificity)
        testRunner.assertEqual(pElement.getStyle('color'), 'red');
    });

    testRunner.addTest('Style Engine - Inheritance', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<div><p>Text</p></div>').document;
        const stylesheet = cssParser.parse('div { color: blue; font-family: Arial; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const divElement = styledTree.children[0];
        const pElement = divElement.children[0];
        
        // Color should be inherited
        testRunner.assertEqual(pElement.getStyle('color'), 'blue');
        testRunner.assertEqual(pElement.getStyle('font-family'), 'Arial');
    });

    testRunner.addTest('Style Engine - Default styles', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<h1>Heading</h1>').document;
        const stylesheet = cssParser.parse('').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const h1Element = styledTree.children[0];
        
        // Should have default h1 styles
        testRunner.assertEqual(h1Element.getStyle('font-size'), '32px');
        testRunner.assertEqual(h1Element.getStyle('font-weight'), 'bold');
    });

    testRunner.addTest('Style Engine - Inline styles', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<p style="color: green; font-size: 20px;">Text</p>').document;
        const stylesheet = cssParser.parse('p { color: red; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const pElement = styledTree.children[0];
        
        // Inline styles should override CSS rules
        testRunner.assertEqual(pElement.getStyle('color'), 'green');
        testRunner.assertEqual(pElement.getStyle('font-size'), '20px');
    });

    testRunner.addTest('Style Engine - Class matching', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<div class="container main">Content</div>').document;
        const stylesheet = cssParser.parse(`
            .container { background: blue; }
            .main { color: white; }
        `).stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const divElement = styledTree.children[0];
        
        testRunner.assertEqual(divElement.getStyle('background'), 'blue');
        testRunner.assertEqual(divElement.getStyle('color'), 'white');
    });

    testRunner.addTest('Style Engine - Attribute matching', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<input type="text" name="username">').document;
        const stylesheet = cssParser.parse('input[type="text"] { border: 1px solid gray; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const inputElement = styledTree.children[0];
        
        testRunner.assertEqual(inputElement.getStyle('border'), '1px solid gray');
    });

    testRunner.addTest('Style Engine - Multiple class matching', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<div class="box red large">Content</div>').document;
        const stylesheet = cssParser.parse(`
            .box { display: block; }
            .red { color: red; }
            .large { font-size: 24px; }
        `).stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const divElement = styledTree.children[0];
        
        testRunner.assertEqual(divElement.getStyle('display'), 'block');
        testRunner.assertEqual(divElement.getStyle('color'), 'red');
        testRunner.assertEqual(divElement.getStyle('font-size'), '24px');
    });

    testRunner.addTest('Style Engine - Non-inheritable properties', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<div><p>Text</p></div>').document;
        const stylesheet = cssParser.parse('div { margin: 20px; padding: 10px; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const divElement = styledTree.children[0];
        const pElement = divElement.children[0];
        
        // Margin and padding should not be inherited
        testRunner.assertEqual(divElement.getStyle('margin'), '20px');
        testRunner.assert(!pElement.hasStyle('margin') || pElement.getStyle('margin') === '0');
    });

    testRunner.addTest('Style Engine - Universal selector', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<div><p>Text</p><span>More text</span></div>').document;
        const stylesheet = cssParser.parse('* { margin: 0; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        const divElement = styledTree.children[0];
        const pElement = divElement.children[0];
        const spanElement = divElement.children[1];
        
        testRunner.assertEqual(divElement.getStyle('margin'), '0');
        testRunner.assertEqual(pElement.getStyle('margin'), '0');
        testRunner.assertEqual(spanElement.getStyle('margin'), '0');
    });

    testRunner.addTest('Style Engine - Text nodes', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const dom = htmlParser.parse('<p>Hello <strong>world</strong>!</p>').document;
        const stylesheet = cssParser.parse('p { color: blue; }').stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        // Should handle text nodes without errors
        testRunner.assertNotNull(styledTree);
        testRunner.assert(styledTree.children.length > 0);
    });

    testRunner.addTest('Style Engine - Complex document', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        
        const html = `
            <html>
                <body>
                    <header class="main-header">
                        <h1 id="title">Welcome</h1>
                    </header>
                    <main>
                        <p class="intro">Introduction text</p>
                        <div class="content">
                            <p>Regular paragraph</p>
                        </div>
                    </main>
                </body>
            </html>
        `;
        
        const css = `
            body { font-family: Arial; color: #333; }
            .main-header { background: #f0f0f0; }
            #title { color: #000; font-size: 28px; }
            .intro { font-style: italic; }
            .content p { margin: 16px 0; }
        `;
        
        const dom = htmlParser.parse(html).document;
        const stylesheet = cssParser.parse(css).stylesheet;
        
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        testRunner.assertNotNull(styledTree);
        // Should process complex document without errors
        testRunner.assert(styledTree.children.length > 0);
    });
}
