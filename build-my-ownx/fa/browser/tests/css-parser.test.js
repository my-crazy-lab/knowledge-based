/**
 * CSS Parser Tests
 */

function registerCSSParserTests(testRunner) {
    testRunner.addTest('CSS Parser - Parse simple rule', () => {
        const parser = new CSSParser();
        const result = parser.parse('p { color: red; }');
        
        testRunner.assertNotNull(result.stylesheet);
        testRunner.assertEqual(result.stylesheet.rules.length, 1);
        
        const rule = result.stylesheet.rules[0];
        testRunner.assertEqual(rule.selectors.length, 1);
        testRunner.assertEqual(rule.selectors[0].parts[0].tagName, 'p');
        testRunner.assertEqual(rule.declarations.length, 1);
        testRunner.assertEqual(rule.declarations[0].property, 'color');
        testRunner.assertEqual(rule.declarations[0].value, 'red');
    });

    testRunner.addTest('CSS Parser - Parse multiple selectors', () => {
        const parser = new CSSParser();
        const result = parser.parse('h1, h2, h3 { font-weight: bold; }');
        
        const rule = result.stylesheet.rules[0];
        testRunner.assertEqual(rule.selectors.length, 3);
        testRunner.assertEqual(rule.selectors[0].parts[0].tagName, 'h1');
        testRunner.assertEqual(rule.selectors[1].parts[0].tagName, 'h2');
        testRunner.assertEqual(rule.selectors[2].parts[0].tagName, 'h3');
    });

    testRunner.addTest('CSS Parser - Parse class selector', () => {
        const parser = new CSSParser();
        const result = parser.parse('.container { width: 100%; }');
        
        const selector = result.stylesheet.rules[0].selectors[0];
        testRunner.assertEqual(selector.parts[0].classes.length, 1);
        testRunner.assertEqual(selector.parts[0].classes[0], 'container');
    });

    testRunner.addTest('CSS Parser - Parse ID selector', () => {
        const parser = new CSSParser();
        const result = parser.parse('#header { background: blue; }');
        
        const selector = result.stylesheet.rules[0].selectors[0];
        testRunner.assertEqual(selector.parts[0].id, 'header');
    });

    testRunner.addTest('CSS Parser - Parse combined selectors', () => {
        const parser = new CSSParser();
        const result = parser.parse('div.container#main { margin: 0; }');
        
        const part = result.stylesheet.rules[0].selectors[0].parts[0];
        testRunner.assertEqual(part.tagName, 'div');
        testRunner.assertEqual(part.classes[0], 'container');
        testRunner.assertEqual(part.id, 'main');
    });

    testRunner.addTest('CSS Parser - Parse attribute selectors', () => {
        const parser = new CSSParser();
        const result = parser.parse('input[type="text"] { border: 1px solid gray; }');
        
        const part = result.stylesheet.rules[0].selectors[0].parts[0];
        testRunner.assertEqual(part.tagName, 'input');
        testRunner.assertEqual(part.attributes.length, 1);
        testRunner.assertEqual(part.attributes[0].name, 'type');
        testRunner.assertEqual(part.attributes[0].operator, '=');
        testRunner.assertEqual(part.attributes[0].value, 'text');
    });

    testRunner.addTest('CSS Parser - Parse multiple declarations', () => {
        const parser = new CSSParser();
        const result = parser.parse('div { color: red; background: blue; margin: 10px; }');
        
        const declarations = result.stylesheet.rules[0].declarations;
        testRunner.assertEqual(declarations.length, 3);
        testRunner.assertEqual(declarations[0].property, 'color');
        testRunner.assertEqual(declarations[1].property, 'background');
        testRunner.assertEqual(declarations[2].property, 'margin');
    });

    testRunner.addTest('CSS Parser - Parse important declarations', () => {
        const parser = new CSSParser();
        const result = parser.parse('p { color: red !important; }');
        
        const declaration = result.stylesheet.rules[0].declarations[0];
        testRunner.assertEqual(declaration.important, true);
    });

    testRunner.addTest('CSS Parser - Parse comments', () => {
        const parser = new CSSParser();
        const result = parser.parse('/* Comment */ p { color: red; } /* Another comment */');
        
        testRunner.assertEqual(result.stylesheet.rules.length, 1);
        testRunner.assertEqual(result.stylesheet.rules[0].selectors[0].parts[0].tagName, 'p');
    });

    testRunner.addTest('CSS Parser - Parse complex values', () => {
        const parser = new CSSParser();
        const result = parser.parse('div { background: url("image.jpg") no-repeat center; }');
        
        const declaration = result.stylesheet.rules[0].declarations[0];
        testRunner.assertEqual(declaration.property, 'background');
        testRunner.assert(declaration.value.includes('url("image.jpg")'));
    });

    testRunner.addTest('CSS Parser - Calculate specificity', () => {
        const parser = new CSSParser();
        const result = parser.parse('#header .nav li a { color: blue; }');
        
        const selector = result.stylesheet.rules[0].selectors[0];
        testRunner.assertEqual(selector.specificity.a, 1); // 1 ID
        testRunner.assertEqual(selector.specificity.b, 1); // 1 class
        testRunner.assertEqual(selector.specificity.c, 2); // 2 elements (li, a)
    });

    testRunner.addTest('CSS Parser - Handle malformed CSS', () => {
        const parser = new CSSParser();
        const result = parser.parse('p { color red; background: }');
        
        // Should handle errors gracefully
        testRunner.assertNotNull(result.stylesheet);
        testRunner.assert(result.errors.length > 0);
    });

    testRunner.addTest('CSS Parser - Parse universal selector', () => {
        const parser = new CSSParser();
        const result = parser.parse('* { margin: 0; }');
        
        const selector = result.stylesheet.rules[0].selectors[0];
        testRunner.assertEqual(selector.parts[0].tagName, '*');
    });

    testRunner.addTest('CSS Parser - Parse pseudo-classes (basic)', () => {
        const parser = new CSSParser();
        const result = parser.parse('a:hover { color: red; }');
        
        // Basic parsing - pseudo-classes not fully implemented
        const selector = result.stylesheet.rules[0].selectors[0];
        testRunner.assertEqual(selector.parts[0].tagName, 'a');
    });

    testRunner.addTest('CSS Parser - Parse multiple rules', () => {
        const css = `
            body { margin: 0; padding: 0; }
            .header { background: #333; color: white; }
            #footer { text-align: center; }
        `;
        
        const parser = new CSSParser();
        const result = parser.parse(css);
        
        testRunner.assertEqual(result.stylesheet.rules.length, 3);
        testRunner.assertEqual(result.stylesheet.rules[0].selectors[0].parts[0].tagName, 'body');
        testRunner.assertEqual(result.stylesheet.rules[1].selectors[0].parts[0].classes[0], 'header');
        testRunner.assertEqual(result.stylesheet.rules[2].selectors[0].parts[0].id, 'footer');
    });

    testRunner.addTest('CSS Parser - Handle empty CSS', () => {
        const parser = new CSSParser();
        const result = parser.parse('');
        
        testRunner.assertNotNull(result.stylesheet);
        testRunner.assertEqual(result.stylesheet.rules.length, 0);
    });

    testRunner.addTest('CSS Parser - Parse attribute operators', () => {
        const parser = new CSSParser();
        const result = parser.parse('a[href^="https"] { color: green; }');
        
        const attr = result.stylesheet.rules[0].selectors[0].parts[0].attributes[0];
        testRunner.assertEqual(attr.name, 'href');
        testRunner.assertEqual(attr.operator, '^=');
        testRunner.assertEqual(attr.value, 'https');
    });
}
