// Primitive Mesh Generators - Create basic 3D shapes
// Provides functions to generate common geometric primitives

class Primitives {
    // Create a cube mesh
    static createCube(size = 1) {
        const s = size / 2;
        const vertices = [
            // Front face
            new Vertex(new Vector3(-s, -s,  s), new Vector3(0, 0, 1)),
            new Vertex(new Vector3( s, -s,  s), new Vector3(0, 0, 1)),
            new Vertex(new Vector3( s,  s,  s), new Vector3(0, 0, 1)),
            new Vertex(new Vector3(-s,  s,  s), new Vector3(0, 0, 1)),
            // Back face
            new Vertex(new Vector3(-s, -s, -s), new Vector3(0, 0, -1)),
            new Vertex(new Vector3(-s,  s, -s), new Vector3(0, 0, -1)),
            new Vertex(new Vector3( s,  s, -s), new Vector3(0, 0, -1)),
            new Vertex(new Vector3( s, -s, -s), new Vector3(0, 0, -1))
        ];
        
        const triangles = [
            // Front face
            new Triangle(vertices[0], vertices[1], vertices[2]),
            new Triangle(vertices[0], vertices[2], vertices[3]),
            // Back face
            new Triangle(vertices[4], vertices[5], vertices[6]),
            new Triangle(vertices[4], vertices[6], vertices[7]),
            // Top face
            new Triangle(vertices[3], vertices[2], vertices[6]),
            new Triangle(vertices[3], vertices[6], vertices[5]),
            // Bottom face
            new Triangle(vertices[0], vertices[7], vertices[1]),
            new Triangle(vertices[0], vertices[4], vertices[7]),
            // Right face
            new Triangle(vertices[1], vertices[7], vertices[6]),
            new Triangle(vertices[1], vertices[6], vertices[2]),
            // Left face
            new Triangle(vertices[0], vertices[3], vertices[5]),
            new Triangle(vertices[0], vertices[5], vertices[4])
        ];
        
        const mesh = new Mesh(vertices, triangles);
        mesh.calculateVertexNormals();
        return mesh;
    }

    // Create a sphere mesh
    static createSphere(radius = 1, segments = 16, rings = 8) {
        const vertices = [];
        const triangles = [];
        
        // Generate vertices
        for (let ring = 0; ring <= rings; ring++) {
            const phi = Math.PI * ring / rings;
            const y = Math.cos(phi) * radius;
            const ringRadius = Math.sin(phi) * radius;
            
            for (let segment = 0; segment <= segments; segment++) {
                const theta = 2 * Math.PI * segment / segments;
                const x = Math.cos(theta) * ringRadius;
                const z = Math.sin(theta) * ringRadius;
                
                const position = new Vector3(x, y, z);
                const normal = position.normalize();
                vertices.push(new Vertex(position, normal));
            }
        }
        
        // Generate triangles
        for (let ring = 0; ring < rings; ring++) {
            for (let segment = 0; segment < segments; segment++) {
                const current = ring * (segments + 1) + segment;
                const next = current + segments + 1;
                
                // First triangle
                triangles.push(new Triangle(
                    vertices[current],
                    vertices[next],
                    vertices[current + 1]
                ));
                
                // Second triangle
                triangles.push(new Triangle(
                    vertices[current + 1],
                    vertices[next],
                    vertices[next + 1]
                ));
            }
        }
        
        return new Mesh(vertices, triangles);
    }

    // Create a cylinder mesh
    static createCylinder(radius = 1, height = 2, segments = 16) {
        const vertices = [];
        const triangles = [];
        const halfHeight = height / 2;
        
        // Generate vertices for top and bottom circles
        for (let i = 0; i <= segments; i++) {
            const angle = 2 * Math.PI * i / segments;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            // Bottom vertex
            vertices.push(new Vertex(
                new Vector3(x, -halfHeight, z),
                new Vector3(x / radius, 0, z / radius).normalize()
            ));
            
            // Top vertex
            vertices.push(new Vertex(
                new Vector3(x, halfHeight, z),
                new Vector3(x / radius, 0, z / radius).normalize()
            ));
        }
        
        // Center vertices for caps
        const bottomCenter = vertices.length;
        vertices.push(new Vertex(new Vector3(0, -halfHeight, 0), new Vector3(0, -1, 0)));
        const topCenter = vertices.length;
        vertices.push(new Vertex(new Vector3(0, halfHeight, 0), new Vector3(0, 1, 0)));
        
        // Generate side triangles
        for (let i = 0; i < segments; i++) {
            const bottom1 = i * 2;
            const top1 = i * 2 + 1;
            const bottom2 = ((i + 1) % segments) * 2;
            const top2 = ((i + 1) % segments) * 2 + 1;
            
            // Side quad (two triangles)
            triangles.push(new Triangle(vertices[bottom1], vertices[bottom2], vertices[top1]));
            triangles.push(new Triangle(vertices[top1], vertices[bottom2], vertices[top2]));
            
            // Bottom cap
            triangles.push(new Triangle(
                vertices[bottomCenter],
                vertices[bottom1],
                vertices[bottom2]
            ));
            
            // Top cap
            triangles.push(new Triangle(
                vertices[topCenter],
                vertices[top2],
                vertices[top1]
            ));
        }
        
        return new Mesh(vertices, triangles);
    }

    // Create a plane mesh
    static createPlane(width = 2, height = 2, widthSegments = 1, heightSegments = 1) {
        const vertices = [];
        const triangles = [];
        
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        
        // Generate vertices
        for (let y = 0; y <= heightSegments; y++) {
            for (let x = 0; x <= widthSegments; x++) {
                const u = x / widthSegments;
                const v = y / heightSegments;
                
                const position = new Vector3(
                    (u - 0.5) * width,
                    0,
                    (v - 0.5) * height
                );
                
                const normal = new Vector3(0, 1, 0);
                vertices.push(new Vertex(position, normal));
            }
        }
        
        // Generate triangles
        for (let y = 0; y < heightSegments; y++) {
            for (let x = 0; x < widthSegments; x++) {
                const a = y * (widthSegments + 1) + x;
                const b = y * (widthSegments + 1) + x + 1;
                const c = (y + 1) * (widthSegments + 1) + x;
                const d = (y + 1) * (widthSegments + 1) + x + 1;
                
                // First triangle
                triangles.push(new Triangle(vertices[a], vertices[c], vertices[b]));
                
                // Second triangle
                triangles.push(new Triangle(vertices[b], vertices[c], vertices[d]));
            }
        }
        
        return new Mesh(vertices, triangles);
    }

    // Create a pyramid mesh
    static createPyramid(base = 1, height = 1) {
        const halfBase = base / 2;
        
        const vertices = [
            // Base vertices
            new Vertex(new Vector3(-halfBase, 0, -halfBase), new Vector3(0, -1, 0)),
            new Vertex(new Vector3( halfBase, 0, -halfBase), new Vector3(0, -1, 0)),
            new Vertex(new Vector3( halfBase, 0,  halfBase), new Vector3(0, -1, 0)),
            new Vertex(new Vector3(-halfBase, 0,  halfBase), new Vector3(0, -1, 0)),
            // Apex
            new Vertex(new Vector3(0, height, 0), new Vector3(0, 1, 0))
        ];
        
        const triangles = [
            // Base (two triangles)
            new Triangle(vertices[0], vertices[2], vertices[1]),
            new Triangle(vertices[0], vertices[3], vertices[2]),
            // Sides
            new Triangle(vertices[0], vertices[1], vertices[4]),
            new Triangle(vertices[1], vertices[2], vertices[4]),
            new Triangle(vertices[2], vertices[3], vertices[4]),
            new Triangle(vertices[3], vertices[0], vertices[4])
        ];
        
        const mesh = new Mesh(vertices, triangles);
        mesh.calculateVertexNormals();
        return mesh;
    }

    // Create a torus mesh
    static createTorus(majorRadius = 1, minorRadius = 0.3, majorSegments = 16, minorSegments = 8) {
        const vertices = [];
        const triangles = [];
        
        // Generate vertices
        for (let i = 0; i <= majorSegments; i++) {
            const u = i / majorSegments * Math.PI * 2;
            
            for (let j = 0; j <= minorSegments; j++) {
                const v = j / minorSegments * Math.PI * 2;
                
                const x = (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
                const y = minorRadius * Math.sin(v);
                const z = (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);
                
                const position = new Vector3(x, y, z);
                
                // Calculate normal
                const center = new Vector3(majorRadius * Math.cos(u), 0, majorRadius * Math.sin(u));
                const normal = position.subtract(center).normalize();
                
                vertices.push(new Vertex(position, normal));
            }
        }
        
        // Generate triangles
        for (let i = 0; i < majorSegments; i++) {
            for (let j = 0; j < minorSegments; j++) {
                const a = i * (minorSegments + 1) + j;
                const b = (i + 1) * (minorSegments + 1) + j;
                const c = i * (minorSegments + 1) + j + 1;
                const d = (i + 1) * (minorSegments + 1) + j + 1;
                
                // First triangle
                triangles.push(new Triangle(vertices[a], vertices[b], vertices[c]));
                
                // Second triangle
                triangles.push(new Triangle(vertices[c], vertices[b], vertices[d]));
            }
        }
        
        return new Mesh(vertices, triangles);
    }

    // Create an icosahedron mesh (20-sided polyhedron)
    static createIcosahedron(radius = 1) {
        const t = (1.0 + Math.sqrt(5.0)) / 2.0; // Golden ratio
        const vertices = [
            new Vertex(new Vector3(-1,  t,  0).normalize().multiply(radius)),
            new Vertex(new Vector3( 1,  t,  0).normalize().multiply(radius)),
            new Vertex(new Vector3(-1, -t,  0).normalize().multiply(radius)),
            new Vertex(new Vector3( 1, -t,  0).normalize().multiply(radius)),
            new Vertex(new Vector3( 0, -1,  t).normalize().multiply(radius)),
            new Vertex(new Vector3( 0,  1,  t).normalize().multiply(radius)),
            new Vertex(new Vector3( 0, -1, -t).normalize().multiply(radius)),
            new Vertex(new Vector3( 0,  1, -t).normalize().multiply(radius)),
            new Vertex(new Vector3( t,  0, -1).normalize().multiply(radius)),
            new Vertex(new Vector3( t,  0,  1).normalize().multiply(radius)),
            new Vertex(new Vector3(-t,  0, -1).normalize().multiply(radius)),
            new Vertex(new Vector3(-t,  0,  1).normalize().multiply(radius))
        ];
        
        // Set normals (for sphere, normal = position normalized)
        vertices.forEach(vertex => {
            vertex.normal = vertex.position.normalize();
        });
        
        const triangles = [
            // 5 faces around point 0
            new Triangle(vertices[0], vertices[11], vertices[5]),
            new Triangle(vertices[0], vertices[5], vertices[1]),
            new Triangle(vertices[0], vertices[1], vertices[7]),
            new Triangle(vertices[0], vertices[7], vertices[10]),
            new Triangle(vertices[0], vertices[10], vertices[11]),
            // 5 adjacent faces
            new Triangle(vertices[1], vertices[5], vertices[9]),
            new Triangle(vertices[5], vertices[11], vertices[4]),
            new Triangle(vertices[11], vertices[10], vertices[2]),
            new Triangle(vertices[10], vertices[7], vertices[6]),
            new Triangle(vertices[7], vertices[1], vertices[8]),
            // 5 faces around point 3
            new Triangle(vertices[3], vertices[9], vertices[4]),
            new Triangle(vertices[3], vertices[4], vertices[2]),
            new Triangle(vertices[3], vertices[2], vertices[6]),
            new Triangle(vertices[3], vertices[6], vertices[8]),
            new Triangle(vertices[3], vertices[8], vertices[9]),
            // 5 adjacent faces
            new Triangle(vertices[4], vertices[9], vertices[5]),
            new Triangle(vertices[2], vertices[4], vertices[11]),
            new Triangle(vertices[6], vertices[2], vertices[10]),
            new Triangle(vertices[8], vertices[6], vertices[7]),
            new Triangle(vertices[9], vertices[8], vertices[1])
        ];
        
        return new Mesh(vertices, triangles);
    }
}

// Export class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Primitives };
}
