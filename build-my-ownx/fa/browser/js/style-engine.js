/**
 * Style Engine - Applies CSS rules to DOM elements
 */

class StyleEngine {
    constructor() {
        this.defaultStyles = this.getDefaultStyles();
    }

    computeStyles(domTree, stylesheet) {
        const styledTree = this.createStyledTree(domTree, stylesheet);
        return styledTree;
    }

    createStyledTree(node, stylesheet, parentStyles = null) {
        if (node.type === 'text' || node.type === 'comment' || node.type === 'doctype') {
            return new StyledNode(node, {}, []);
        }

        if (node.type === 'document') {
            const children = node.children.map(child => 
                this.createStyledTree(child, stylesheet, parentStyles)
            );
            return new StyledNode(node, {}, children);
        }

        // Get styles for this element
        const styles = this.getElementStyles(node, stylesheet, parentStyles);
        
        // Create styled children
        const children = node.children.map(child => 
            this.createStyledTree(child, stylesheet, styles)
        );

        return new StyledNode(node, styles, children);
    }

    getElementStyles(element, stylesheet, parentStyles) {
        const styles = {};
        
        // Start with default styles
        Object.assign(styles, this.getDefaultStylesForElement(element.tagName));
        
        // Apply inherited styles from parent
        if (parentStyles) {
            Object.assign(styles, this.getInheritedStyles(parentStyles));
        }
        
        // Apply matching CSS rules
        const matchingRules = this.getMatchingRules(element, stylesheet);
        
        // Sort by specificity
        matchingRules.sort((a, b) => {
            const specA = a.selector.specificity.value;
            const specB = b.selector.specificity.value;
            return specA - specB;
        });
        
        // Apply declarations in order of specificity
        for (const match of matchingRules) {
            for (const declaration of match.rule.declarations) {
                styles[declaration.property] = declaration.value;
            }
        }
        
        // Apply inline styles (highest specificity)
        if (element.attributes && element.attributes.style) {
            const inlineStyles = this.parseInlineStyles(element.attributes.style);
            Object.assign(styles, inlineStyles);
        }
        
        return styles;
    }

    getMatchingRules(element, stylesheet) {
        const matches = [];
        
        for (const rule of stylesheet.rules) {
            for (const selector of rule.selectors) {
                if (this.selectorMatches(selector, element)) {
                    matches.push({ selector, rule });
                }
            }
        }
        
        return matches;
    }

    selectorMatches(selector, element) {
        // Simple selector matching - only supports single part selectors for now
        if (selector.parts.length !== 1) {
            return false; // Complex selectors not implemented
        }
        
        const part = selector.parts[0];
        
        // Check tag name
        if (part.tagName && part.tagName !== '*' && part.tagName !== element.tagName) {
            return false;
        }
        
        // Check ID
        if (part.id && element.attributes.id !== part.id) {
            return false;
        }
        
        // Check classes
        if (part.classes.length > 0) {
            const elementClasses = (element.attributes.class || '').split(/\s+/).filter(c => c);
            for (const className of part.classes) {
                if (!elementClasses.includes(className)) {
                    return false;
                }
            }
        }
        
        // Check attributes
        for (const attr of part.attributes) {
            if (!this.attributeMatches(attr, element)) {
                return false;
            }
        }
        
        return true;
    }

    attributeMatches(attrSelector, element) {
        const attrValue = element.attributes[attrSelector.name];
        
        if (!attrSelector.operator) {
            // Just check if attribute exists
            return attrValue !== undefined;
        }
        
        if (attrValue === undefined) {
            return false;
        }
        
        switch (attrSelector.operator) {
            case '=':
                return attrValue === attrSelector.value;
            case '~=':
                return attrValue.split(/\s+/).includes(attrSelector.value);
            case '|=':
                return attrValue === attrSelector.value || attrValue.startsWith(attrSelector.value + '-');
            case '^=':
                return attrValue.startsWith(attrSelector.value);
            case '$=':
                return attrValue.endsWith(attrSelector.value);
            case '*=':
                return attrValue.includes(attrSelector.value);
            default:
                return false;
        }
    }

    parseInlineStyles(styleText) {
        const styles = {};
        const declarations = styleText.split(';');
        
        for (const declaration of declarations) {
            const colonIndex = declaration.indexOf(':');
            if (colonIndex > 0) {
                const property = declaration.substring(0, colonIndex).trim();
                const value = declaration.substring(colonIndex + 1).trim();
                styles[property] = value;
            }
        }
        
        return styles;
    }

    getInheritedStyles(parentStyles) {
        const inherited = {};
        const inheritableProperties = [
            'color', 'font-family', 'font-size', 'font-weight', 'font-style',
            'line-height', 'text-align', 'text-decoration', 'text-transform',
            'letter-spacing', 'word-spacing', 'white-space'
        ];
        
        for (const property of inheritableProperties) {
            if (parentStyles[property]) {
                inherited[property] = parentStyles[property];
            }
        }
        
        return inherited;
    }

    getDefaultStyles() {
        return {
            'display': 'block',
            'color': 'black',
            'background-color': 'transparent',
            'font-family': 'serif',
            'font-size': '16px',
            'font-weight': 'normal',
            'font-style': 'normal',
            'text-align': 'left',
            'text-decoration': 'none',
            'margin': '0',
            'padding': '0',
            'border': 'none',
            'width': 'auto',
            'height': 'auto'
        };
    }

    getDefaultStylesForElement(tagName) {
        const defaults = {};
        
        switch (tagName) {
            case 'h1':
                defaults['font-size'] = '32px';
                defaults['font-weight'] = 'bold';
                defaults['margin'] = '16px 0';
                break;
            case 'h2':
                defaults['font-size'] = '24px';
                defaults['font-weight'] = 'bold';
                defaults['margin'] = '14px 0';
                break;
            case 'h3':
                defaults['font-size'] = '20px';
                defaults['font-weight'] = 'bold';
                defaults['margin'] = '12px 0';
                break;
            case 'h4':
                defaults['font-size'] = '18px';
                defaults['font-weight'] = 'bold';
                defaults['margin'] = '10px 0';
                break;
            case 'h5':
                defaults['font-size'] = '16px';
                defaults['font-weight'] = 'bold';
                defaults['margin'] = '8px 0';
                break;
            case 'h6':
                defaults['font-size'] = '14px';
                defaults['font-weight'] = 'bold';
                defaults['margin'] = '6px 0';
                break;
            case 'p':
                defaults['margin'] = '16px 0';
                break;
            case 'div':
                defaults['display'] = 'block';
                break;
            case 'span':
                defaults['display'] = 'inline';
                break;
            case 'a':
                defaults['color'] = 'blue';
                defaults['text-decoration'] = 'underline';
                defaults['display'] = 'inline';
                break;
            case 'strong':
            case 'b':
                defaults['font-weight'] = 'bold';
                defaults['display'] = 'inline';
                break;
            case 'em':
            case 'i':
                defaults['font-style'] = 'italic';
                defaults['display'] = 'inline';
                break;
            case 'ul':
            case 'ol':
                defaults['margin'] = '16px 0';
                defaults['padding-left'] = '40px';
                break;
            case 'li':
                defaults['display'] = 'list-item';
                break;
            case 'img':
                defaults['display'] = 'inline-block';
                break;
            case 'br':
                defaults['display'] = 'block';
                defaults['height'] = '1em';
                break;
            case 'hr':
                defaults['display'] = 'block';
                defaults['height'] = '1px';
                defaults['background-color'] = 'gray';
                defaults['margin'] = '8px 0';
                break;
            default:
                defaults['display'] = 'block';
        }
        
        return defaults;
    }
}

class StyledNode {
    constructor(node, styles, children) {
        this.node = node;
        this.styles = styles;
        this.children = children;
    }

    getStyle(property) {
        return this.styles[property];
    }

    hasStyle(property) {
        return property in this.styles;
    }

    toString(indent = 0) {
        const nodeStr = this.node.toString ? this.node.toString(0) : this.node.type;
        const styleStr = Object.entries(this.styles)
            .map(([prop, value]) => `${prop}: ${value}`)
            .join('; ');
        
        let result = ' '.repeat(indent) + `${nodeStr}`;
        if (styleStr) {
            result += ` [${styleStr}]`;
        }
        
        if (this.children.length > 0) {
            result += '\n';
            result += this.children.map(child => child.toString(indent + 2)).join('\n');
        }
        
        return result;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StyleEngine, StyledNode };
}
