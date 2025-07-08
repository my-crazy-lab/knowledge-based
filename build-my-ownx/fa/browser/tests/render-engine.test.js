/**
 * Render Engine Tests
 */

function registerRenderEngineTests(testRunner) {
    testRunner.addTest('Render Engine - Initialize with canvas', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        testRunner.assertNotNull(renderEngine.canvas);
        testRunner.assertNotNull(renderEngine.ctx);
        testRunner.assertEqual(renderEngine.displayList.length, 0);
    });

    testRunner.addTest('Render Engine - Build display list', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create a simple layout box
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const dom = htmlParser.parse('<div>Hello</div>').document;
        const stylesheet = cssParser.parse('div { background-color: red; color: blue; }').stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        
        renderEngine.buildDisplayList(layoutTree.children[0]);
        
        testRunner.assert(renderEngine.displayList.length > 0);
    });

    testRunner.addTest('Render Engine - Color parsing', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        testRunner.assertEqual(renderEngine.parseColor('red'), '#ff0000');
        testRunner.assertEqual(renderEngine.parseColor('blue'), '#0000ff');
        testRunner.assertEqual(renderEngine.parseColor('#ff0000'), '#ff0000');
        testRunner.assertEqual(renderEngine.parseColor('rgb(255, 0, 0)'), 'rgb(255, 0, 0)');
        testRunner.assertEqual(renderEngine.parseColor('transparent'), 'rgba(0,0,0,0)');
        testRunner.assertEqual(renderEngine.parseColor('invalid'), 'black');
    });

    testRunner.addTest('Render Engine - Length parsing', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        testRunner.assertEqual(renderEngine.parseLength('16px'), 16);
        testRunner.assertEqual(renderEngine.parseLength('2em'), 32);
        testRunner.assertEqual(renderEngine.parseLength('20'), 20);
        testRunner.assertEqual(renderEngine.parseLength(24), 24);
        testRunner.assertEqual(renderEngine.parseLength('invalid'), 16);
    });

    testRunner.addTest('Render Engine - Background rendering', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create a mock layout box with background
        const mockStyledNode = {
            getStyle: (prop) => prop === 'background-color' ? 'red' : null
        };
        
        const mockLayoutBox = {
            styledNode: mockStyledNode,
            borderBox: () => ({ x: 10, y: 20, width: 100, height: 50 }),
            children: []
        };
        
        renderEngine.renderBackground(mockLayoutBox);
        
        testRunner.assertEqual(renderEngine.displayList.length, 1);
        testRunner.assertEqual(renderEngine.displayList[0].type, 'rect');
        testRunner.assertEqual(renderEngine.displayList[0].data.color, 'red');
    });

    testRunner.addTest('Render Engine - Text rendering', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create a mock text layout box
        const mockStyledNode = {
            node: { text: 'Hello World' },
            getStyle: (prop) => {
                switch (prop) {
                    case 'color': return 'blue';
                    case 'font-size': return '16px';
                    case 'font-family': return 'Arial';
                    case 'font-weight': return 'normal';
                    case 'font-style': return 'normal';
                    default: return null;
                }
            }
        };
        
        const mockLayoutBox = {
            boxType: 'text',
            styledNode: mockStyledNode,
            dimensions: {
                content: { x: 10, y: 20 }
            },
            children: []
        };
        
        renderEngine.renderText(mockLayoutBox);
        
        testRunner.assertEqual(renderEngine.displayList.length, 1);
        testRunner.assertEqual(renderEngine.displayList[0].type, 'text');
        testRunner.assertEqual(renderEngine.displayList[0].data.text, 'Hello World');
        testRunner.assertEqual(renderEngine.displayList[0].data.color, 'blue');
    });

    testRunner.addTest('Render Engine - Border rendering', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create a mock layout box with borders
        const mockStyledNode = {
            getStyle: (prop) => {
                switch (prop) {
                    case 'border-color': return 'black';
                    case 'border-style': return 'solid';
                    default: return null;
                }
            }
        };
        
        const mockLayoutBox = {
            styledNode: mockStyledNode,
            borderBox: () => ({ x: 10, y: 20, width: 100, height: 50 }),
            dimensions: {
                border: { top: 2, right: 2, bottom: 2, left: 2 }
            },
            children: []
        };
        
        renderEngine.renderBorders(mockLayoutBox);
        
        // Should create 4 border rectangles
        testRunner.assertEqual(renderEngine.displayList.length, 4);
        testRunner.assert(renderEngine.displayList.every(cmd => cmd.type === 'rect'));
    });

    testRunner.addTest('Render Engine - SVG export', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Add some display commands
        renderEngine.displayList.push(new DisplayCommand('rect', {
            x: 10, y: 20, width: 100, height: 50, color: 'red'
        }));
        
        renderEngine.displayList.push(new DisplayCommand('text', {
            x: 15, y: 35, text: 'Hello', color: 'blue', font: 'Arial 16px'
        }));
        
        const svg = renderEngine.exportSVG();
        
        testRunner.assert(svg.includes('<svg'));
        testRunner.assert(svg.includes('<rect'));
        testRunner.assert(svg.includes('<text'));
        testRunner.assert(svg.includes('</svg>'));
    });

    testRunner.addTest('Render Engine - Display list access', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        renderEngine.displayList.push(new DisplayCommand('rect', {
            x: 0, y: 0, width: 100, height: 100, color: 'red'
        }));
        
        const displayList = renderEngine.getDisplayList();
        
        testRunner.assertEqual(displayList.length, 1);
        testRunner.assertEqual(displayList[0].type, 'rect');
        testRunner.assertEqual(displayList[0].data.color, 'red');
    });

    testRunner.addTest('Render Engine - Full rendering pipeline', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create a complete layout tree
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const html = '<div style="background: red; color: white;">Hello <span>World</span>!</div>';
        const css = 'div { padding: 10px; } span { font-weight: bold; }';
        
        const dom = htmlParser.parse(html).document;
        const stylesheet = cssParser.parse(css).stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        
        // This should not throw any errors
        renderEngine.render(layoutTree);
        
        testRunner.assert(renderEngine.displayList.length > 0);
    });

    testRunner.addTest('Render Engine - Empty content handling', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create empty layout tree
        const mockLayoutBox = {
            styledNode: { getStyle: () => null },
            borderBox: () => ({ x: 0, y: 0, width: 0, height: 0 }),
            dimensions: { border: { top: 0, right: 0, bottom: 0, left: 0 } },
            children: []
        };
        
        renderEngine.render(mockLayoutBox);
        
        // Should handle empty content without errors
        testRunner.assert(renderEngine.displayList.length >= 0);
    });

    testRunner.addTest('Render Engine - Complex document rendering', () => {
        const canvas = createMockCanvas();
        const renderEngine = new RenderEngine(canvas);
        
        // Create a complex document
        const htmlParser = new HTMLParser();
        const cssParser = new CSSParser();
        const styleEngine = new StyleEngine();
        const layoutEngine = new LayoutEngine();
        
        const html = `
            <div class="container">
                <h1>Title</h1>
                <p class="intro">Introduction paragraph with <strong>bold text</strong>.</p>
                <div class="content">
                    <p>Regular paragraph</p>
                    <ul>
                        <li>List item 1</li>
                        <li>List item 2</li>
                    </ul>
                </div>
            </div>
        `;
        
        const css = `
            .container { background: #f0f0f0; padding: 20px; }
            h1 { color: #333; border-bottom: 2px solid #ccc; }
            .intro { font-style: italic; color: #666; }
            strong { color: #000; }
            .content { background: white; padding: 15px; }
            ul { margin: 10px 0; }
            li { margin: 5px 0; }
        `;
        
        const dom = htmlParser.parse(html).document;
        const stylesheet = cssParser.parse(css).stylesheet;
        const styledTree = styleEngine.computeStyles(dom, stylesheet);
        
        const viewport = {
            content: { x: 0, y: 0, width: 800, height: 600 }
        };
        
        const layoutTree = layoutEngine.layout(styledTree, viewport);
        
        // Should render complex document without errors
        renderEngine.render(layoutTree);
        
        testRunner.assert(renderEngine.displayList.length > 0);
        
        // Should have various types of display commands
        const rectCommands = renderEngine.displayList.filter(cmd => cmd.type === 'rect');
        const textCommands = renderEngine.displayList.filter(cmd => cmd.type === 'text');
        
        testRunner.assert(rectCommands.length > 0);
        testRunner.assert(textCommands.length > 0);
    });

    testRunner.addTest('Display Command - String representation', () => {
        const command = new DisplayCommand('rect', {
            x: 10, y: 20, width: 100, height: 50, color: 'red'
        });
        
        const str = command.toString();
        testRunner.assert(str.includes('rect'));
        testRunner.assert(str.includes('10'));
        testRunner.assert(str.includes('red'));
    });
}
