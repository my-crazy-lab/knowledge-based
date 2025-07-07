// 3D Renderer - Software rasterization pipeline
// Handles vertex transformation, projection, and triangle rasterization

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Z-buffer for depth testing
        this.zBuffer = new Float32Array(this.width * this.height);
        
        // Image data for pixel manipulation
        this.imageData = this.ctx.createImageData(this.width, this.height);
        this.pixels = this.imageData.data;
        
        this.clearColor = { r: 0, g: 0, b: 0, a: 255 };
    }

    // Clear the screen and z-buffer
    clear() {
        // Clear z-buffer
        this.zBuffer.fill(Infinity);
        
        // Clear pixels
        for (let i = 0; i < this.pixels.length; i += 4) {
            this.pixels[i] = this.clearColor.r;     // R
            this.pixels[i + 1] = this.clearColor.g; // G
            this.pixels[i + 2] = this.clearColor.b; // B
            this.pixels[i + 3] = this.clearColor.a; // A
        }
    }

    // Set clear color
    setClearColor(r, g, b, a = 255) {
        this.clearColor = { r, g, b, a };
    }

    // Convert normalized device coordinates to screen coordinates
    ndcToScreen(ndc) {
        return new Vector3(
            (ndc.x + 1) * 0.5 * this.width,
            (1 - ndc.y) * 0.5 * this.height,  // Flip Y axis
            ndc.z
        );
    }

    // Set pixel with depth testing
    setPixel(x, y, z, color) {
        x = Math.floor(x);
        y = Math.floor(y);
        
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        
        const index = y * this.width + x;
        
        // Depth test
        if (z < this.zBuffer[index]) {
            this.zBuffer[index] = z;
            
            const pixelIndex = index * 4;
            this.pixels[pixelIndex] = color.r;
            this.pixels[pixelIndex + 1] = color.g;
            this.pixels[pixelIndex + 2] = color.b;
            this.pixels[pixelIndex + 3] = color.a || 255;
        }
    }

    // Draw a line using Bresenham's algorithm
    drawLine(p1, p2, color) {
        let x0 = Math.floor(p1.x);
        let y0 = Math.floor(p1.y);
        let x1 = Math.floor(p2.x);
        let y1 = Math.floor(p2.y);
        
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            // Interpolate Z value
            const t = Math.sqrt((x0 - p1.x) ** 2 + (y0 - p1.y) ** 2) / 
                     Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
            const z = p1.z + (p2.z - p1.z) * t;
            
            this.setPixel(x0, y0, z, color);
            
            if (x0 === x1 && y0 === y1) break;
            
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    // Barycentric coordinates for triangle rasterization
    barycentric(p, a, b, c) {
        const v0 = { x: c.x - a.x, y: c.y - a.y };
        const v1 = { x: b.x - a.x, y: b.y - a.y };
        const v2 = { x: p.x - a.x, y: p.y - a.y };

        const dot00 = v0.x * v0.x + v0.y * v0.y;
        const dot01 = v0.x * v1.x + v0.y * v1.y;
        const dot02 = v0.x * v2.x + v0.y * v2.y;
        const dot11 = v1.x * v1.x + v1.y * v1.y;
        const dot12 = v1.x * v2.x + v1.y * v2.y;

        const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        return { u, v, w: 1 - u - v };
    }

    // Fill triangle using barycentric coordinates
    fillTriangle(v1, v2, v3, color) {
        // Find bounding box
        const minX = Math.max(0, Math.floor(Math.min(v1.x, v2.x, v3.x)));
        const maxX = Math.min(this.width - 1, Math.ceil(Math.max(v1.x, v2.x, v3.x)));
        const minY = Math.max(0, Math.floor(Math.min(v1.y, v2.y, v3.y)));
        const maxY = Math.min(this.height - 1, Math.ceil(Math.max(v1.y, v2.y, v3.y)));

        // Rasterize triangle
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const bary = this.barycentric({ x, y }, v1, v2, v3);
                
                // Check if point is inside triangle
                if (bary.u >= 0 && bary.v >= 0 && bary.w >= 0) {
                    // Interpolate Z value
                    const z = v1.z * bary.w + v2.z * bary.u + v3.z * bary.v;
                    this.setPixel(x, y, z, color);
                }
            }
        }
    }

    // Draw wireframe triangle
    drawTriangleWireframe(v1, v2, v3, color) {
        this.drawLine(v1, v2, color);
        this.drawLine(v2, v3, color);
        this.drawLine(v3, v1, color);
    }

    // Present the rendered frame to canvas
    present() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    // Resize renderer
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.zBuffer = new Float32Array(width * height);
        this.imageData = this.ctx.createImageData(width, height);
        this.pixels = this.imageData.data;
    }
}

// Vertex structure
class Vertex {
    constructor(position, normal = null, color = null) {
        this.position = position;  // Vector3
        this.normal = normal;      // Vector3
        this.color = color;        // {r, g, b, a}
    }
}

// Triangle/Face structure
class Triangle {
    constructor(v1, v2, v3) {
        this.vertices = [v1, v2, v3];
    }

    // Calculate face normal
    getNormal() {
        const v1 = this.vertices[0].position;
        const v2 = this.vertices[1].position;
        const v3 = this.vertices[2].position;
        
        const edge1 = v2.subtract(v1);
        const edge2 = v3.subtract(v1);
        
        return edge1.cross(edge2).normalize();
    }
}

// Mesh structure
class Mesh {
    constructor(vertices, triangles) {
        this.vertices = vertices;    // Array of Vertex
        this.triangles = triangles;  // Array of Triangle
        this.transform = new Matrix4(); // Model matrix
    }

    // Calculate vertex normals (average of adjacent face normals)
    calculateVertexNormals() {
        // Initialize normals to zero
        this.vertices.forEach(vertex => {
            vertex.normal = new Vector3(0, 0, 0);
        });

        // Accumulate face normals
        this.triangles.forEach(triangle => {
            const faceNormal = triangle.getNormal();
            triangle.vertices.forEach(vertex => {
                vertex.normal = vertex.normal.add(faceNormal);
            });
        });

        // Normalize
        this.vertices.forEach(vertex => {
            vertex.normal = vertex.normal.normalize();
        });
    }
}

// Export classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Renderer, Vertex, Triangle, Mesh };
}
