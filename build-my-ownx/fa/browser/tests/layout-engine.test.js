/**
 * Layout Engine Tests
 */

function registerLayoutEngineTests(testRunner) {
    testRunner.addTest('Layout Engine - Basic block layout', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div>Content</div>').document;
        const stylesheet = cssParser.parse('div { width: 200px; height: 100px; }').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        
        testRunner.assertNotNull(layoutTree);
        const divBox = layoutTree.children[0];
        testRunner.assertEqual(divBox.dimensions.content.width, 200);
        testRunner.assertEqual(divBox.dimensions.content.height, 100);
    });

    testRunner.addTest('Layout Engine - Margin and padding', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div>Content</div>').document;
        const stylesheet = cssParser.parse(`
            div { 
                width: 200px; 
                height: 100px; 
                margin: 10px; 
                padding: 20px; 
            }
        `).stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const divBox = layoutTree.children[0];
        
        testRunner.assertEqual(divBox.dimensions.content.width, 200);
        testRunner.assertEqual(divBox.dimensions.content.height, 100);
        testRunner.assertEqual(divBox.dimensions.margin.top, 10);
        testRunner.assertEqual(divBox.dimensions.padding.top, 20);
    });

    testRunner.addTest('Layout Engine - Auto width calculation', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div>Content</div>').document;
        const stylesheet = cssParser.parse('div { margin: 10px; padding: 20px; }').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const divBox = layoutTree.children[0];
        
        // Width should be calculated as viewport width minus margins and padding
        const expectedWidth = 800 - (10 + 20) * 2; // left and right margins + padding
        testRunner.assertEqual(divBox.dimensions.content.width, expectedWidth);
    });

    testRunner.addTest('Layout Engine - Nested elements', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div><p>Paragraph</p></div>').document;
        const stylesheet = cssParser.parse(`
            div { width: 400px; padding: 20px; }
            p { width: 200px; margin: 10px; }
        `).stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const divBox = layoutTree.children[0];
        const pBox = divBox.children[0];
        
        testRunner.assertEqual(divBox.dimensions.content.width, 400);
        testRunner.assertEqual(pBox.dimensions.content.width, 200);
        
        // P should be positioned inside div's content area
        testRunner.assertEqual(pBox.dimensions.content.x, divBox.dimensions.content.x + pBox.dimensions.margin.left);
    });

    testRunner.addTest('Layout Engine - Text layout', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<p>Hello World</p>').document;
        const stylesheet = cssParser.parse('p { font-size: 16px; }').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const pBox = layoutTree.children[0];
        const textBox = pBox.children[0];
        
        testRunner.assertNotNull(textBox);
        testRunner.assert(textBox.dimensions.content.width > 0);
        testRunner.assert(textBox.dimensions.content.height > 0);
    });

    testRunner.addTest('Layout Engine - Length parsing', () => {
        const layoutEngine = new LayoutEngine();
        
        testRunner.assertEqual(layoutEngine.parseLength('10px'), 10);
        testRunner.assertEqual(layoutEngine.parseLength('2em'), 32); // 2 * 16px default
        testRunner.assertEqual(layoutEngine.parseLength('50%'), 150); // 50% of 300px assumption
        testRunner.assertEqual(layoutEngine.parseLength('0'), 0);
        testRunner.assertEqual(layoutEngine.parseLength('auto'), 0);
        testRunner.assertEqual(layoutEngine.parseLength(20), 20);
    });

    testRunner.addTest('Layout Engine - Box model calculations', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div>Content</div>').document;
        const stylesheet = cssParser.parse(`
            div { 
                width: 200px; 
                height: 100px; 
                margin: 10px; 
                padding: 15px; 
                border: 2px solid black;
            }
        `).stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const divBox = layoutTree.children[0];
        
        // Test box model methods
        const paddingBox = divBox.paddingBox();
        const borderBox = divBox.borderBox();
        const marginBox = divBox.marginBox();
        
        testRunner.assertEqual(paddingBox.width, 200 + 15 * 2); // content + padding
        testRunner.assertEqual(borderBox.width, 200 + 15 * 2 + 2 * 2); // + border
        testRunner.assertEqual(marginBox.width, 200 + 15 * 2 + 2 * 2 + 10 * 2); // + margin
    });

    testRunner.addTest('Layout Engine - Inline layout', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<span>Inline text</span>').document;
        const stylesheet = cssParser.parse('span { display: inline; }').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const spanBox = layoutTree.children[0];
        
        testRunner.assertEqual(spanBox.boxType, 'inline');
        testRunner.assert(spanBox.dimensions.content.height > 0);
    });

    testRunner.addTest('Layout Engine - Display none', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div><p style="display: none;">Hidden</p><span>Visible</span></div>').document;
        const stylesheet = cssParser.parse('').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const layoutTree = layoutEngine.buildLayoutTree(styledTree);
        const divBox = layoutTree.children[0];
        
        // Should only have one child (span), p should be filtered out
        testRunner.assertEqual(divBox.children.length, 1);
        testRunner.assertEqual(divBox.children[0].styledNode.node.tagName, 'span');
    });

    testRunner.addTest('Layout Engine - Vertical layout', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div><p>First</p><p>Second</p></div>').document;
        const stylesheet = cssParser.parse('p { height: 50px; margin: 10px 0; }').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        const divBox = layoutTree.children[0];
        const firstP = divBox.children[0];
        const secondP = divBox.children[1];
        
        // Second paragraph should be positioned below the first
        testRunner.assert(secondP.dimensions.content.y > firstP.dimensions.content.y);
    });

    testRunner.addTest('Layout Engine - Complex layout', () => {
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const html = `
            <div class="container">
                <header>
                    <h1>Title</h1>
                </header>
                <main>
                    <p>Content paragraph</p>
                    <div class="sidebar">
                        <p>Sidebar content</p>
                    </div>
                </main>
            </div>
        `;
        
        const css = `
            .container { width: 800px; padding: 20px; }
            header { height: 80px; margin-bottom: 20px; }
            h1 { font-size: 24px; margin: 0; }
            main { background: #f0f0f0; }
            p { margin: 16px 0; }
            .sidebar { width: 200px; padding: 10px; }
        `;
        
        const dom = htmlParser.parse(html).document;
        const stylesheet = cssParser.parse(css).stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 1000, height: 800 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        
        testRunner.assertNotNull(layoutTree);
        // Should handle complex layout without errors
        testRunner.assert(layoutTree.children.length > 0);
    });
}
