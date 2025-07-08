/**
 * Render Engine - Paints the layout to a canvas
 */

class RenderEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.displayList = [];
    }

    render(layoutBox) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Build display list
        this.displayList = [];
        this.buildDisplayList(layoutBox);
        
        // Paint display list
        this.paintDisplayList();
    }

    buildDisplayList(layoutBox) {
        this.renderBackground(layoutBox);
        this.renderBorders(layoutBox);
        this.renderText(layoutBox);
        
        // Render children
        for (const child of layoutBox.children) {
            this.buildDisplayList(child);
        }
    }

    renderBackground(layoutBox) {
        const backgroundColor = layoutBox.styledNode.getStyle('background-color');
        
        if (backgroundColor && backgroundColor !== 'transparent') {
            const rect = layoutBox.borderBox();
            this.displayList.push(new DisplayCommand('rect', {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
                color: backgroundColor
            }));
        }
    }

    renderBorders(layoutBox) {
        const borderColor = layoutBox.styledNode.getStyle('border-color') || 'black';
        const borderStyle = layoutBox.styledNode.getStyle('border-style') || 'solid';
        
        if (borderStyle !== 'none') {
            const border = layoutBox.dimensions.border;
            const rect = layoutBox.borderBox();
            
            // Top border
            if (border.top > 0) {
                this.displayList.push(new DisplayCommand('rect', {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: border.top,
                    color: borderColor
                }));
            }
            
            // Right border
            if (border.right > 0) {
                this.displayList.push(new DisplayCommand('rect', {
                    x: rect.x + rect.width - border.right,
                    y: rect.y,
                    width: border.right,
                    height: rect.height,
                    color: borderColor
                }));
            }
            
            // Bottom border
            if (border.bottom > 0) {
                this.displayList.push(new DisplayCommand('rect', {
                    x: rect.x,
                    y: rect.y + rect.height - border.bottom,
                    width: rect.width,
                    height: border.bottom,
                    color: borderColor
                }));
            }
            
            // Left border
            if (border.left > 0) {
                this.displayList.push(new DisplayCommand('rect', {
                    x: rect.x,
                    y: rect.y,
                    width: border.left,
                    height: rect.height,
                    color: borderColor
                }));
            }
        }
    }

    renderText(layoutBox) {
        if (layoutBox.boxType === 'text' && layoutBox.styledNode.node.text) {
            const text = layoutBox.styledNode.node.text.trim();
            if (text) {
                const color = layoutBox.styledNode.getStyle('color') || 'black';
                const fontSize = layoutBox.styledNode.getStyle('font-size') || '16px';
                const fontFamily = layoutBox.styledNode.getStyle('font-family') || 'serif';
                const fontWeight = layoutBox.styledNode.getStyle('font-weight') || 'normal';
                const fontStyle = layoutBox.styledNode.getStyle('font-style') || 'normal';
                
                this.displayList.push(new DisplayCommand('text', {
                    x: layoutBox.dimensions.content.x,
                    y: layoutBox.dimensions.content.y + this.parseLength(fontSize) * 0.8, // Baseline adjustment
                    text: text,
                    color: color,
                    font: `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`
                }));
            }
        }
    }

    paintDisplayList() {
        for (const command of this.displayList) {
            this.paintCommand(command);
        }
    }

    paintCommand(command) {
        switch (command.type) {
            case 'rect':
                this.paintRect(command.data);
                break;
            case 'text':
                this.paintText(command.data);
                break;
        }
    }

    paintRect(data) {
        this.ctx.fillStyle = this.parseColor(data.color);
        this.ctx.fillRect(data.x, data.y, data.width, data.height);
    }

    paintText(data) {
        this.ctx.fillStyle = this.parseColor(data.color);
        this.ctx.font = data.font;
        this.ctx.fillText(data.text, data.x, data.y);
    }

    parseColor(color) {
        if (!color) return 'black';
        
        // Handle named colors
        const namedColors = {
            'black': '#000000',
            'white': '#ffffff',
            'red': '#ff0000',
            'green': '#008000',
            'blue': '#0000ff',
            'yellow': '#ffff00',
            'cyan': '#00ffff',
            'magenta': '#ff00ff',
            'gray': '#808080',
            'grey': '#808080',
            'orange': '#ffa500',
            'purple': '#800080',
            'brown': '#a52a2a',
            'pink': '#ffc0cb',
            'transparent': 'rgba(0,0,0,0)'
        };
        
        if (namedColors[color.toLowerCase()]) {
            return namedColors[color.toLowerCase()];
        }
        
        // Handle hex colors
        if (color.startsWith('#')) {
            return color;
        }
        
        // Handle rgb/rgba colors
        if (color.startsWith('rgb')) {
            return color;
        }
        
        // Default to black
        return 'black';
    }

    parseLength(value) {
        if (typeof value === 'number') {
            return value;
        }
        
        if (typeof value !== 'string') {
            return 16; // Default font size
        }
        
        value = value.trim();
        
        if (value.endsWith('px')) {
            return parseFloat(value.slice(0, -2)) || 16;
        }
        
        if (value.endsWith('em')) {
            const em = parseFloat(value.slice(0, -2)) || 1;
            return em * 16; // Assume 16px base font size
        }
        
        const num = parseFloat(value);
        return isNaN(num) ? 16 : num;
    }

    // Debug method to visualize layout boxes
    renderDebugBoxes(layoutBox, color = 'red') {
        const rect = layoutBox.dimensions.content;
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        
        // Render padding box
        const paddingBox = layoutBox.paddingBox();
        this.ctx.strokeStyle = 'blue';
        this.ctx.strokeRect(paddingBox.x, paddingBox.y, paddingBox.width, paddingBox.height);
        
        // Render border box
        const borderBox = layoutBox.borderBox();
        this.ctx.strokeStyle = 'green';
        this.ctx.strokeRect(borderBox.x, borderBox.y, borderBox.width, borderBox.height);
        
        // Render margin box
        const marginBox = layoutBox.marginBox();
        this.ctx.strokeStyle = 'orange';
        this.ctx.strokeRect(marginBox.x, marginBox.y, marginBox.width, marginBox.height);
        
        // Render children
        for (const child of layoutBox.children) {
            this.renderDebugBoxes(child, color);
        }
    }

    // Export display list as SVG
    exportSVG() {
        let svg = `<svg width="${this.canvas.width}" height="${this.canvas.height}" xmlns="http://www.w3.org/2000/svg">`;
        
        for (const command of this.displayList) {
            switch (command.type) {
                case 'rect':
                    svg += `<rect x="${command.data.x}" y="${command.data.y}" width="${command.data.width}" height="${command.data.height}" fill="${this.parseColor(command.data.color)}" />`;
                    break;
                case 'text':
                    svg += `<text x="${command.data.x}" y="${command.data.y}" fill="${this.parseColor(command.data.color)}" font="${command.data.font}">${command.data.text}</text>`;
                    break;
            }
        }
        
        svg += '</svg>';
        return svg;
    }

    // Get display list for debugging
    getDisplayList() {
        return this.displayList.map(command => ({
            type: command.type,
            data: { ...command.data }
        }));
    }
}

class DisplayCommand {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    toString() {
        return `${this.type}: ${JSON.stringify(this.data)}`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RenderEngine, DisplayCommand };
}
