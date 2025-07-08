/**
 * Layout Engine - Calculates positions and sizes using CSS box model
 */

class LayoutEngine {
    constructor() {
        this.defaultFontSize = 16;
    }

    layout(styledNode, containingBlock) {
        const layoutBox = this.buildLayoutTree(styledNode);
        this.calculateLayout(layoutBox, containingBlock);
        return layoutBox;
    }

    buildLayoutTree(styledNode) {
        const display = styledNode.getStyle('display') || 'block';
        
        if (styledNode.node.type === 'text') {
            return new LayoutBox('text', styledNode, []);
        }
        
        if (styledNode.node.type === 'document') {
            const children = styledNode.children
                .map(child => this.buildLayoutTree(child))
                .filter(box => box !== null);
            return new LayoutBox('block', styledNode, children);
        }
        
        if (display === 'none') {
            return null;
        }
        
        let boxType;
        if (display === 'block') {
            boxType = 'block';
        } else if (display === 'inline') {
            boxType = 'inline';
        } else if (display === 'inline-block') {
            boxType = 'inline-block';
        } else {
            boxType = 'block'; // Default
        }
        
        const children = styledNode.children
            .map(child => this.buildLayoutTree(child))
            .filter(box => box !== null);
        
        return new LayoutBox(boxType, styledNode, children);
    }

    calculateLayout(layoutBox, containingBlock) {
        switch (layoutBox.boxType) {
            case 'block':
                this.layoutBlock(layoutBox, containingBlock);
                break;
            case 'inline':
                this.layoutInline(layoutBox, containingBlock);
                break;
            case 'inline-block':
                this.layoutInlineBlock(layoutBox, containingBlock);
                break;
            case 'text':
                this.layoutText(layoutBox, containingBlock);
                break;
        }
    }

    layoutBlock(layoutBox, containingBlock) {
        // Calculate width
        this.calculateBlockWidth(layoutBox, containingBlock);
        
        // Calculate position
        this.calculateBlockPosition(layoutBox, containingBlock);
        
        // Layout children
        this.layoutBlockChildren(layoutBox);
        
        // Calculate height
        this.calculateBlockHeight(layoutBox);
    }

    calculateBlockWidth(layoutBox, containingBlock) {
        const style = layoutBox.styledNode.styles;
        
        // Get margin, border, padding values
        const marginLeft = this.parseLength(style['margin-left'] || style['margin'] || '0');
        const marginRight = this.parseLength(style['margin-right'] || style['margin'] || '0');
        const borderLeft = this.parseLength(style['border-left-width'] || '0');
        const borderRight = this.parseLength(style['border-right-width'] || '0');
        const paddingLeft = this.parseLength(style['padding-left'] || style['padding'] || '0');
        const paddingRight = this.parseLength(style['padding-right'] || style['padding'] || '0');
        
        const total = marginLeft + borderLeft + paddingLeft + paddingRight + borderRight + marginRight;
        
        // Width calculation
        const widthStyle = style['width'];
        let width;
        
        if (widthStyle && widthStyle !== 'auto') {
            width = this.parseLength(widthStyle);
        } else {
            width = containingBlock.content.width - total;
        }
        
        layoutBox.dimensions.content.width = Math.max(0, width);
        layoutBox.dimensions.padding.left = paddingLeft;
        layoutBox.dimensions.padding.right = paddingRight;
        layoutBox.dimensions.border.left = borderLeft;
        layoutBox.dimensions.border.right = borderRight;
        layoutBox.dimensions.margin.left = marginLeft;
        layoutBox.dimensions.margin.right = marginRight;
    }

    calculateBlockPosition(layoutBox, containingBlock) {
        const style = layoutBox.styledNode.styles;
        
        const marginTop = this.parseLength(style['margin-top'] || style['margin'] || '0');
        const marginBottom = this.parseLength(style['margin-bottom'] || style['margin'] || '0');
        const borderTop = this.parseLength(style['border-top-width'] || '0');
        const borderBottom = this.parseLength(style['border-bottom-width'] || '0');
        const paddingTop = this.parseLength(style['padding-top'] || style['padding'] || '0');
        const paddingBottom = this.parseLength(style['padding-bottom'] || style['padding'] || '0');
        
        layoutBox.dimensions.margin.top = marginTop;
        layoutBox.dimensions.margin.bottom = marginBottom;
        layoutBox.dimensions.border.top = borderTop;
        layoutBox.dimensions.border.bottom = borderBottom;
        layoutBox.dimensions.padding.top = paddingTop;
        layoutBox.dimensions.padding.bottom = paddingBottom;
        
        layoutBox.dimensions.content.x = containingBlock.content.x +
            layoutBox.dimensions.margin.left +
            layoutBox.dimensions.border.left +
            layoutBox.dimensions.padding.left;
        
        layoutBox.dimensions.content.y = containingBlock.content.y +
            containingBlock.content.height +
            layoutBox.dimensions.margin.top +
            layoutBox.dimensions.border.top +
            layoutBox.dimensions.padding.top;
    }

    layoutBlockChildren(layoutBox) {
        for (const child of layoutBox.children) {
            this.calculateLayout(child, layoutBox.dimensions);
            
            // Update containing block height to include this child
            layoutBox.dimensions.content.height += child.marginBox().height;
        }
    }

    calculateBlockHeight(layoutBox) {
        const style = layoutBox.styledNode.styles;
        const heightStyle = style['height'];
        
        if (heightStyle && heightStyle !== 'auto') {
            layoutBox.dimensions.content.height = this.parseLength(heightStyle);
        }
        // If height is auto, it's already calculated by children
    }

    layoutInline(layoutBox, containingBlock) {
        // Simplified inline layout
        layoutBox.dimensions.content.x = containingBlock.content.x;
        layoutBox.dimensions.content.y = containingBlock.content.y;
        layoutBox.dimensions.content.width = 0;
        layoutBox.dimensions.content.height = this.parseLength('1em');
        
        for (const child of layoutBox.children) {
            this.calculateLayout(child, layoutBox.dimensions);
            layoutBox.dimensions.content.width += child.dimensions.content.width;
        }
    }

    layoutInlineBlock(layoutBox, containingBlock) {
        // Treat as block for internal layout, but inline for positioning
        this.layoutBlock(layoutBox, containingBlock);
    }

    layoutText(layoutBox, containingBlock) {
        const text = layoutBox.styledNode.node.text || '';
        const fontSize = this.parseLength(layoutBox.styledNode.getStyle('font-size') || '16px');
        
        // Simple text measurement (approximation)
        const charWidth = fontSize * 0.6; // Rough approximation
        const lineHeight = fontSize * 1.2;
        
        layoutBox.dimensions.content.x = containingBlock.content.x;
        layoutBox.dimensions.content.y = containingBlock.content.y;
        layoutBox.dimensions.content.width = text.length * charWidth;
        layoutBox.dimensions.content.height = lineHeight;
    }

    parseLength(value) {
        if (typeof value === 'number') {
            return value;
        }
        
        if (typeof value !== 'string') {
            return 0;
        }
        
        value = value.trim();
        
        if (value === '0' || value === 'auto') {
            return 0;
        }
        
        // Parse pixels
        if (value.endsWith('px')) {
            return parseFloat(value.slice(0, -2)) || 0;
        }
        
        // Parse em (relative to font size)
        if (value.endsWith('em')) {
            const em = parseFloat(value.slice(0, -2)) || 0;
            return em * this.defaultFontSize;
        }
        
        // Parse percentage (simplified - relative to containing block)
        if (value.endsWith('%')) {
            const percent = parseFloat(value.slice(0, -1)) || 0;
            return percent / 100 * 300; // Simplified assumption
        }
        
        // Try to parse as number
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    }
}

class LayoutBox {
    constructor(boxType, styledNode, children) {
        this.boxType = boxType;
        this.styledNode = styledNode;
        this.children = children;
        this.dimensions = new Dimensions();
    }

    paddingBox() {
        return this.dimensions.content.expandedBy(this.dimensions.padding);
    }

    borderBox() {
        return this.paddingBox().expandedBy(this.dimensions.border);
    }

    marginBox() {
        return this.borderBox().expandedBy(this.dimensions.margin);
    }

    toString(indent = 0) {
        const nodeStr = this.styledNode.node.toString ? 
            this.styledNode.node.toString(0) : this.styledNode.node.type;
        const dimStr = `${this.dimensions.content.width}x${this.dimensions.content.height} at (${this.dimensions.content.x}, ${this.dimensions.content.y})`;
        
        let result = ' '.repeat(indent) + `${this.boxType}: ${nodeStr} [${dimStr}]`;
        
        if (this.children.length > 0) {
            result += '\n';
            result += this.children.map(child => child.toString(indent + 2)).join('\n');
        }
        
        return result;
    }
}

class Dimensions {
    constructor() {
        this.content = new Rect(0, 0, 0, 0);
        this.padding = new EdgeSizes();
        this.border = new EdgeSizes();
        this.margin = new EdgeSizes();
    }
}

class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    expandedBy(edge) {
        return new Rect(
            this.x - edge.left,
            this.y - edge.top,
            this.width + edge.left + edge.right,
            this.height + edge.top + edge.bottom
        );
    }
}

class EdgeSizes {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LayoutEngine, LayoutBox, Dimensions, Rect, EdgeSizes };
}
