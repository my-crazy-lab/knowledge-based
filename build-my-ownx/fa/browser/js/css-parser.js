/**
 * CSS Parser - Converts CSS string into stylesheet rules
 */

class CSSParser {
    constructor() {
        this.position = 0;
        this.input = '';
        this.errors = [];
    }

    parse(css) {
        this.position = 0;
        this.input = css.trim();
        this.errors = [];
        
        try {
            const stylesheet = this.parseStylesheet();
            return {
                stylesheet,
                errors: this.errors
            };
        } catch (error) {
            this.errors.push(`Parse error: ${error.message}`);
            return {
                stylesheet: new Stylesheet([]),
                errors: this.errors
            };
        }
    }

    parseStylesheet() {
        const rules = [];
        
        while (!this.isEOF()) {
            this.skipWhitespaceAndComments();
            if (this.isEOF()) break;
            
            try {
                const rule = this.parseRule();
                if (rule) {
                    rules.push(rule);
                }
            } catch (error) {
                this.addError(error.message);
                this.skipToNextRule();
            }
        }
        
        return new Stylesheet(rules);
    }

    parseRule() {
        const selectors = this.parseSelectors();
        
        this.skipWhitespaceAndComments();
        
        if (this.peek() !== '{') {
            throw new Error('Expected "{" after selectors');
        }
        
        this.consume('{');
        
        const declarations = this.parseDeclarations();
        
        this.skipWhitespaceAndComments();
        
        if (this.peek() !== '}') {
            throw new Error('Expected "}" after declarations');
        }
        
        this.consume('}');
        
        return new Rule(selectors, declarations);
    }

    parseSelectors() {
        const selectors = [];
        
        do {
            this.skipWhitespaceAndComments();
            const selector = this.parseSelector();
            if (selector) {
                selectors.push(selector);
            }
            
            this.skipWhitespaceAndComments();
            
            if (this.peek() === ',') {
                this.consume(',');
            } else {
                break;
            }
        } while (!this.isEOF());
        
        return selectors;
    }

    parseSelector() {
        const parts = [];
        
        while (!this.isEOF() && this.peek() !== ',' && this.peek() !== '{') {
            this.skipWhitespaceAndComments();
            
            if (this.peek() === ',' || this.peek() === '{') {
                break;
            }
            
            const part = this.parseSelectorPart();
            if (part) {
                parts.push(part);
            }
        }
        
        return new Selector(parts);
    }

    parseSelectorPart() {
        let tagName = null;
        let id = null;
        const classes = [];
        const attributes = [];
        
        // Parse tag name
        if (this.isTagNameStart(this.peek())) {
            tagName = this.parseTagName();
        }
        
        // Parse id, classes, and attributes
        while (!this.isEOF() && (this.peek() === '#' || this.peek() === '.' || this.peek() === '[')) {
            if (this.peek() === '#') {
                this.consume('#');
                id = this.parseIdentifier();
            } else if (this.peek() === '.') {
                this.consume('.');
                classes.push(this.parseIdentifier());
            } else if (this.peek() === '[') {
                attributes.push(this.parseAttributeSelector());
            }
        }
        
        // Universal selector
        if (this.peek() === '*') {
            this.consume('*');
            tagName = '*';
        }
        
        if (!tagName && !id && classes.length === 0 && attributes.length === 0) {
            return null;
        }
        
        return new SelectorPart(tagName, id, classes, attributes);
    }

    parseAttributeSelector() {
        this.consume('[');
        this.skipWhitespaceAndComments();
        
        const name = this.parseIdentifier();
        let operator = null;
        let value = null;
        
        this.skipWhitespaceAndComments();
        
        if (this.peek() === '=' || (this.peek() === '~' && this.peek(1) === '=') ||
            (this.peek() === '|' && this.peek(1) === '=') || (this.peek() === '^' && this.peek(1) === '=') ||
            (this.peek() === '$' && this.peek(1) === '=') || (this.peek() === '*' && this.peek(1) === '=')) {
            
            if (this.peek(1) === '=') {
                operator = this.consume() + this.consume();
            } else {
                operator = this.consume();
            }
            
            this.skipWhitespaceAndComments();
            value = this.parseAttributeValue();
        }
        
        this.skipWhitespaceAndComments();
        
        if (this.peek() !== ']') {
            throw new Error('Expected "]" in attribute selector');
        }
        
        this.consume(']');
        
        return new AttributeSelector(name, operator, value);
    }

    parseAttributeValue() {
        if (this.peek() === '"' || this.peek() === "'") {
            return this.parseString();
        } else {
            return this.parseIdentifier();
        }
    }

    parseDeclarations() {
        const declarations = [];
        
        while (!this.isEOF() && this.peek() !== '}') {
            this.skipWhitespaceAndComments();
            
            if (this.peek() === '}') {
                break;
            }
            
            try {
                const declaration = this.parseDeclaration();
                if (declaration) {
                    declarations.push(declaration);
                }
            } catch (error) {
                this.addError(error.message);
                this.skipToNextDeclaration();
            }
            
            this.skipWhitespaceAndComments();
            
            if (this.peek() === ';') {
                this.consume(';');
            }
        }
        
        return declarations;
    }

    parseDeclaration() {
        const property = this.parseProperty();
        
        this.skipWhitespaceAndComments();
        
        if (this.peek() !== ':') {
            throw new Error('Expected ":" after property name');
        }
        
        this.consume(':');
        
        this.skipWhitespaceAndComments();
        
        const value = this.parseValue();
        
        let important = false;
        this.skipWhitespaceAndComments();
        
        if (this.peek() === '!' && this.input.substr(this.position, 10) === '!important') {
            this.position += 10;
            important = true;
        }
        
        return new Declaration(property, value, important);
    }

    parseProperty() {
        return this.parseIdentifier();
    }

    parseValue() {
        let value = '';
        let depth = 0;
        
        while (!this.isEOF()) {
            const char = this.peek();
            
            if (char === '(') {
                depth++;
            } else if (char === ')') {
                depth--;
            } else if (depth === 0 && (char === ';' || char === '}' || char === '!')) {
                break;
            }
            
            value += this.consume();
        }
        
        return value.trim();
    }

    parseTagName() {
        let name = '';
        while (!this.isEOF() && this.isTagNameChar(this.peek())) {
            name += this.consume();
        }
        return name.toLowerCase();
    }

    parseIdentifier() {
        let identifier = '';
        
        if (this.isIdentifierStart(this.peek())) {
            identifier += this.consume();
        }
        
        while (!this.isEOF() && this.isIdentifierChar(this.peek())) {
            identifier += this.consume();
        }
        
        return identifier;
    }

    parseString() {
        const quote = this.consume(); // " or '
        let string = '';
        
        while (!this.isEOF() && this.peek() !== quote) {
            if (this.peek() === '\\') {
                this.consume(); // Skip backslash
                if (!this.isEOF()) {
                    string += this.consume(); // Add escaped character
                }
            } else {
                string += this.consume();
            }
        }
        
        if (this.peek() === quote) {
            this.consume();
        }
        
        return string;
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

    skipWhitespaceAndComments() {
        while (!this.isEOF()) {
            if (/\s/.test(this.peek())) {
                this.position++;
            } else if (this.peek() === '/' && this.peek(1) === '*') {
                this.skipComment();
            } else {
                break;
            }
        }
    }

    skipComment() {
        this.consume('/');
        this.consume('*');
        
        while (!this.isEOF()) {
            if (this.peek() === '*' && this.peek(1) === '/') {
                this.consume('*');
                this.consume('/');
                break;
            }
            this.consume();
        }
    }

    skipToNextRule() {
        let depth = 0;
        while (!this.isEOF()) {
            const char = this.peek();
            if (char === '{') {
                depth++;
            } else if (char === '}') {
                if (depth === 0) {
                    this.consume();
                    break;
                }
                depth--;
            }
            this.consume();
        }
    }

    skipToNextDeclaration() {
        while (!this.isEOF() && this.peek() !== ';' && this.peek() !== '}') {
            this.consume();
        }
    }

    isTagNameStart(char) {
        return /[a-zA-Z_]/.test(char);
    }

    isTagNameChar(char) {
        return /[a-zA-Z0-9\-_]/.test(char);
    }

    isIdentifierStart(char) {
        return /[a-zA-Z_\-]/.test(char);
    }

    isIdentifierChar(char) {
        return /[a-zA-Z0-9\-_]/.test(char);
    }

    addError(message) {
        this.errors.push(`${message} at position ${this.position}`);
    }
}

// CSS AST Classes
class Stylesheet {
    constructor(rules) {
        this.rules = rules;
    }

    toString() {
        return this.rules.map(rule => rule.toString()).join('\n\n');
    }
}

class Rule {
    constructor(selectors, declarations) {
        this.selectors = selectors;
        this.declarations = declarations;
    }

    toString() {
        const selectorStr = this.selectors.map(s => s.toString()).join(', ');
        const declarationStr = this.declarations.map(d => '  ' + d.toString()).join('\n');
        return `${selectorStr} {\n${declarationStr}\n}`;
    }
}

class Selector {
    constructor(parts) {
        this.parts = parts;
        this.specificity = this.calculateSpecificity();
    }

    calculateSpecificity() {
        let a = 0; // IDs
        let b = 0; // Classes, attributes, pseudo-classes
        let c = 0; // Elements and pseudo-elements
        
        for (const part of this.parts) {
            if (part.id) a++;
            b += part.classes.length + part.attributes.length;
            if (part.tagName && part.tagName !== '*') c++;
        }
        
        return { a, b, c, value: a * 100 + b * 10 + c };
    }

    toString() {
        return this.parts.map(part => part.toString()).join(' ');
    }
}

class SelectorPart {
    constructor(tagName, id, classes, attributes) {
        this.tagName = tagName;
        this.id = id;
        this.classes = classes;
        this.attributes = attributes;
    }

    toString() {
        let result = this.tagName || '';
        if (this.id) result += `#${this.id}`;
        result += this.classes.map(cls => `.${cls}`).join('');
        result += this.attributes.map(attr => attr.toString()).join('');
        return result;
    }
}

class AttributeSelector {
    constructor(name, operator, value) {
        this.name = name;
        this.operator = operator;
        this.value = value;
    }

    toString() {
        if (this.operator && this.value) {
            return `[${this.name}${this.operator}"${this.value}"]`;
        }
        return `[${this.name}]`;
    }
}

class Declaration {
    constructor(property, value, important = false) {
        this.property = property;
        this.value = value;
        this.important = important;
    }

    toString() {
        const importantStr = this.important ? ' !important' : '';
        return `${this.property}: ${this.value}${importantStr};`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        CSSParser, Stylesheet, Rule, Selector, SelectorPart, 
        AttributeSelector, Declaration 
    };
}
