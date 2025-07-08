/**
 * HTML Parser - Converts HTML string into DOM tree
 */

class HTMLParser {
    constructor() {
        this.position = 0;
        this.input = '';
        this.errors = [];
    }

    parse(html) {
        this.position = 0;
        this.input = html.trim();
        this.errors = [];
        
        try {
            const document = this.parseDocument();
            return {
                document,
                errors: this.errors
            };
        } catch (error) {
            this.errors.push(`Parse error: ${error.message}`);
            return {
                document: this.createErrorDocument(),
                errors: this.errors
            };
        }
    }

    parseDocument() {
        const document = new DocumentNode();
        
        while (!this.isEOF()) {
            this.skipWhitespace();
            if (this.isEOF()) break;
            
            const node = this.parseNode();
            if (node) {
                document.appendChild(node);
            }
        }
        
        return document;
    }

    parseNode() {
        this.skipWhitespace();
        
        if (this.isEOF()) return null;
        
        if (this.peek() === '<') {
            if (this.peek(1) === '!') {
                if (this.peek(2) === '-' && this.peek(3) === '-') {
                    return this.parseComment();
                } else {
                    return this.parseDoctype();
                }
            } else if (this.peek(1) === '/') {
                // Closing tag - should be handled by parent
                return null;
            } else {
                return this.parseElement();
            }
        } else {
            return this.parseText();
        }
    }

    parseElement() {
        this.consume('<');
        
        const tagName = this.parseTagName();
        if (!tagName) {
            this.addError('Expected tag name');
            return this.createTextNode('<');
        }
        
        const attributes = this.parseAttributes();
        
        this.skipWhitespace();
        
        // Check for self-closing tag
        if (this.peek() === '/' && this.peek(1) === '>') {
            this.consume('/');
            this.consume('>');
            return new ElementNode(tagName, attributes, []);
        }
        
        if (this.peek() !== '>') {
            this.addError('Expected ">" after tag');
            return this.createTextNode(`<${tagName}`);
        }
        
        this.consume('>');
        
        // Parse children for non-void elements
        const children = [];
        if (!this.isVoidElement(tagName)) {
            while (!this.isEOF()) {
                this.skipWhitespace();
                
                // Check for closing tag
                if (this.peek() === '<' && this.peek(1) === '/') {
                    const closeTagStart = this.position;
                    this.consume('<');
                    this.consume('/');
                    const closeTagName = this.parseTagName();
                    this.skipWhitespace();
                    
                    if (closeTagName === tagName && this.peek() === '>') {
                        this.consume('>');
                        break;
                    } else {
                        // Invalid closing tag, treat as text
                        this.position = closeTagStart;
                        const textNode = this.parseText();
                        if (textNode) children.push(textNode);
                    }
                } else {
                    const child = this.parseNode();
                    if (child) children.push(child);
                    else break;
                }
            }
        }
        
        return new ElementNode(tagName, attributes, children);
    }

    parseTagName() {
        let name = '';
        while (!this.isEOF() && this.isTagNameChar(this.peek())) {
            name += this.consume();
        }
        return name.toLowerCase();
    }

    parseAttributes() {
        const attributes = {};
        
        while (!this.isEOF()) {
            this.skipWhitespace();
            
            if (this.peek() === '>' || this.peek() === '/') {
                break;
            }
            
            const attr = this.parseAttribute();
            if (attr) {
                attributes[attr.name] = attr.value;
            } else {
                // Skip invalid character
                this.consume();
            }
        }
        
        return attributes;
    }

    parseAttribute() {
        const name = this.parseAttributeName();
        if (!name) return null;
        
        this.skipWhitespace();
        
        if (this.peek() === '=') {
            this.consume('=');
            this.skipWhitespace();
            const value = this.parseAttributeValue();
            return { name: name.toLowerCase(), value };
        } else {
            // Boolean attribute
            return { name: name.toLowerCase(), value: '' };
        }
    }

    parseAttributeName() {
        let name = '';
        while (!this.isEOF() && this.isAttributeNameChar(this.peek())) {
            name += this.consume();
        }
        return name;
    }

    parseAttributeValue() {
        const quote = this.peek();
        if (quote === '"' || quote === "'") {
            this.consume(quote);
            let value = '';
            while (!this.isEOF() && this.peek() !== quote) {
                value += this.consume();
            }
            if (this.peek() === quote) {
                this.consume(quote);
            }
            return value;
        } else {
            // Unquoted value
            let value = '';
            while (!this.isEOF() && this.isUnquotedValueChar(this.peek())) {
                value += this.consume();
            }
            return value;
        }
    }

    parseText() {
        let text = '';
        while (!this.isEOF() && this.peek() !== '<') {
            text += this.consume();
        }
        
        if (text.trim()) {
            return new TextNode(text);
        }
        return null;
    }

    parseComment() {
        this.consume('<');
        this.consume('!');
        this.consume('-');
        this.consume('-');
        
        let comment = '';
        while (!this.isEOF()) {
            if (this.peek() === '-' && this.peek(1) === '-' && this.peek(2) === '>') {
                this.consume('-');
                this.consume('-');
                this.consume('>');
                break;
            }
            comment += this.consume();
        }
        
        return new CommentNode(comment);
    }

    parseDoctype() {
        // Simple doctype parsing
        let doctype = '';
        while (!this.isEOF() && this.peek() !== '>') {
            doctype += this.consume();
        }
        if (this.peek() === '>') {
            this.consume('>');
        }
        return new DoctypeNode(doctype);
    }

    // Helper methods
    isEOF() {
        return this.position >= this.input.length;
    }

    peek(offset = 0) {
        const pos = this.position + offset;
        return pos < this.input.length ? this.input[pos] : '';
    }

    consume(expected = null) {
        if (this.isEOF()) {
            throw new Error('Unexpected end of input');
        }
        
        const char = this.input[this.position++];
        
        if (expected && char !== expected) {
            throw new Error(`Expected '${expected}', got '${char}'`);
        }
        
        return char;
    }

    skipWhitespace() {
        while (!this.isEOF() && /\s/.test(this.peek())) {
            this.position++;
        }
    }

    isTagNameChar(char) {
        return /[a-zA-Z0-9\-_]/.test(char);
    }

    isAttributeNameChar(char) {
        return /[a-zA-Z0-9\-_:]/.test(char);
    }

    isUnquotedValueChar(char) {
        return !/[\s>\/=]/.test(char);
    }

    isVoidElement(tagName) {
        const voidElements = [
            'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
            'link', 'meta', 'param', 'source', 'track', 'wbr'
        ];
        return voidElements.includes(tagName);
    }

    addError(message) {
        this.errors.push(`${message} at position ${this.position}`);
    }

    createErrorDocument() {
        const doc = new DocumentNode();
        doc.appendChild(new ElementNode('html', {}, [
            new ElementNode('body', {}, [
                new TextNode('Parse Error: Could not parse HTML')
            ])
        ]));
        return doc;
    }

    createTextNode(text) {
        return new TextNode(text);
    }
}

// DOM Node Classes
class Node {
    constructor(type) {
        this.type = type;
        this.parent = null;
        this.children = [];
    }

    appendChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    toString(indent = 0) {
        return ' '.repeat(indent) + this.type;
    }
}

class DocumentNode extends Node {
    constructor() {
        super('document');
    }
}

class ElementNode extends Node {
    constructor(tagName, attributes = {}, children = []) {
        super('element');
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
        children.forEach(child => child.parent = this);
    }

    toString(indent = 0) {
        const attrs = Object.entries(this.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        const attrStr = attrs ? ` ${attrs}` : '';
        
        let result = ' '.repeat(indent) + `<${this.tagName}${attrStr}>`;
        
        if (this.children.length > 0) {
            result += '\n';
            result += this.children.map(child => child.toString(indent + 2)).join('\n');
            result += '\n' + ' '.repeat(indent) + `</${this.tagName}>`;
        }
        
        return result;
    }
}

class TextNode extends Node {
    constructor(text) {
        super('text');
        this.text = text;
    }

    toString(indent = 0) {
        return ' '.repeat(indent) + `"${this.text.trim()}"`;
    }
}

class CommentNode extends Node {
    constructor(comment) {
        super('comment');
        this.comment = comment;
    }

    toString(indent = 0) {
        return ' '.repeat(indent) + `<!-- ${this.comment} -->`;
    }
}

class DoctypeNode extends Node {
    constructor(doctype) {
        super('doctype');
        this.doctype = doctype;
    }

    toString(indent = 0) {
        return ' '.repeat(indent) + `<!${this.doctype}>`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HTMLParser, ElementNode, TextNode, CommentNode, DoctypeNode, DocumentNode };
}
