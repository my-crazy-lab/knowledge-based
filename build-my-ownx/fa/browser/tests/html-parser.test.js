/**
 * HTML Parser Tests
 */

function registerHTMLParserTests(testRunner) {
    testRunner.addTest('HTML Parser - Parse simple element', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<div>Hello</div>');
        
        testRunner.assertNotNull(result.document);
        testRunner.assertEqual(result.document.children.length, 1);
        testRunner.assertEqual(result.document.children[0].tagName, 'div');
        testRunner.assertEqual(result.document.children[0].children.length, 1);
        testRunner.assertEqual(result.document.children[0].children[0].text, 'Hello');
    });

    testRunner.addTest('HTML Parser - Parse element with attributes', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<div id="test" class="container">Content</div>');
        
        const element = result.document.children[0];
        testRunner.assertEqual(element.tagName, 'div');
        testRunner.assertEqual(element.attributes.id, 'test');
        testRunner.assertEqual(element.attributes.class, 'container');
    });

    testRunner.addTest('HTML Parser - Parse nested elements', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<div><p>Paragraph</p><span>Span</span></div>');
        
        const div = result.document.children[0];
        testRunner.assertEqual(div.children.length, 2);
        testRunner.assertEqual(div.children[0].tagName, 'p');
        testRunner.assertEqual(div.children[1].tagName, 'span');
    });

    testRunner.addTest('HTML Parser - Parse self-closing tags', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<img src="test.jpg" /><br/>');
        
        testRunner.assertEqual(result.document.children.length, 2);
        testRunner.assertEqual(result.document.children[0].tagName, 'img');
        testRunner.assertEqual(result.document.children[1].tagName, 'br');
    });

    testRunner.addTest('HTML Parser - Parse comments', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<!-- This is a comment --><div>Content</div>');
        
        testRunner.assertEqual(result.document.children.length, 2);
        testRunner.assertEqual(result.document.children[0].type, 'comment');
        testRunner.assertEqual(result.document.children[0].comment, ' This is a comment ');
    });

    testRunner.addTest('HTML Parser - Parse doctype', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<!DOCTYPE html><html><body></body></html>');
        
        testRunner.assertEqual(result.document.children[0].type, 'doctype');
    });

    testRunner.addTest('HTML Parser - Handle malformed HTML', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<div><p>Unclosed paragraph<div>Another div</div></div>');
        
        // Should still parse something reasonable
        testRunner.assertNotNull(result.document);
        testRunner.assert(result.document.children.length > 0);
    });

    testRunner.addTest('HTML Parser - Parse quoted attributes', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<div title="Hello World" data-value=\'test\'>Content</div>');
        
        const element = result.document.children[0];
        testRunner.assertEqual(element.attributes.title, 'Hello World');
        testRunner.assertEqual(element.attributes['data-value'], 'test');
    });

    testRunner.addTest('HTML Parser - Parse boolean attributes', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<input type="checkbox" checked disabled>');
        
        const element = result.document.children[0];
        testRunner.assertEqual(element.attributes.checked, '');
        testRunner.assertEqual(element.attributes.disabled, '');
    });

    testRunner.addTest('HTML Parser - Handle empty input', () => {
        const parser = new HTMLParser();
        const result = parser.parse('');
        
        testRunner.assertNotNull(result.document);
        testRunner.assertEqual(result.document.children.length, 0);
    });

    testRunner.addTest('HTML Parser - Handle whitespace', () => {
        const parser = new HTMLParser();
        const result = parser.parse('  <div>  <p>  Text  </p>  </div>  ');
        
        const div = result.document.children[0];
        testRunner.assertEqual(div.tagName, 'div');
        testRunner.assertEqual(div.children.length, 1);
        testRunner.assertEqual(div.children[0].tagName, 'p');
    });

    testRunner.addTest('HTML Parser - Parse complex document', () => {
        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Test Page</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1 id="title">Welcome</h1>
                    <div class="content">
                        <p>This is a paragraph.</p>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                        </ul>
                    </div>
                    <!-- Footer -->
                    <footer>
                        <p>&copy; 2024</p>
                    </footer>
                </body>
            </html>
        `;
        
        const parser = new HTMLParser();
        const result = parser.parse(html);
        
        testRunner.assertNotNull(result.document);
        testRunner.assert(result.document.children.length > 0);
        
        // Find HTML element
        const htmlElement = result.document.children.find(child => child.tagName === 'html');
        testRunner.assertNotNull(htmlElement);
        
        // Check for head and body
        const head = htmlElement.children.find(child => child.tagName === 'head');
        const body = htmlElement.children.find(child => child.tagName === 'body');
        testRunner.assertNotNull(head);
        testRunner.assertNotNull(body);
    });

    testRunner.addTest('HTML Parser - Error recovery', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<div><p>Unclosed<div>Another</div>');
        
        // Should recover and parse what it can
        testRunner.assertNotNull(result.document);
        testRunner.assert(result.document.children.length > 0);
    });

    testRunner.addTest('HTML Parser - Case insensitive tags', () => {
        const parser = new HTMLParser();
        const result = parser.parse('<DIV><P>Content</P></DIV>');
        
        const div = result.document.children[0];
        testRunner.assertEqual(div.tagName, 'div'); // Should be lowercase
        testRunner.assertEqual(div.children[0].tagName, 'p');
    });
}
