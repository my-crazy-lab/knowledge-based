// 3D Engine - Main engine class that coordinates all systems
// Integrates math, rendering, scene management, lighting, and culling

class Engine3D {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);
        this.scene = new Scene();
        this.lightingCalculator = new LightingCalculator();
        this.cullingSystem = new CullingSystem();
        
        // Engine state
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        
        // Rendering options
        this.renderMode = 'solid'; // 'wireframe', 'solid', 'lit'
        this.enableLighting = true;
        this.enableCulling = true;
        
        // Performance tracking
        this.performanceStats = {
            frameTime: 0,
            renderTime: 0,
            cullingTime: 0,
            lightingTime: 0
        };
        
        this.setupDefaultScene();
    }

    // Setup a default scene with camera and light
    setupDefaultScene() {
        // Create default camera
        const camera = new Camera("DefaultCamera");
        camera.setPosition(0, 0, 5);
        camera.setPerspective(Math.PI / 4, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.scene.addCamera(camera);
        
        // Create default light
        const light = new Light("DefaultLight", 'directional');
        light.setPosition(2, 2, 2);
        light.lookAt(new Vector3(0, 0, 0));
        light.intensity = 1.0;
        this.scene.addLight(light);
    }

    // Start the engine
    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    // Stop the engine
    stop() {
        this.isRunning = false;
    }

    // Main game loop
    gameLoop() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
        
        // Update FPS counter
        this.frameCount++;
        if (this.frameCount % 60 === 0) {
            this.fps = Math.round(1 / this.deltaTime);
        }
        
        const frameStartTime = performance.now();
        
        // Update scene
        this.update();
        
        // Render scene
        this.render();
        
        this.performanceStats.frameTime = performance.now() - frameStartTime;
        
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }

    // Update scene
    update() {
        this.scene.update();
    }

    // Render the scene
    render() {
        const renderStartTime = performance.now();
        
        // Clear the screen
        this.renderer.clear();
        
        if (!this.scene.activeCamera) return;
        
        // Update culling system
        if (this.enableCulling) {
            const cullingStartTime = performance.now();
            this.cullingSystem.resetStats();
            this.cullingSystem.updateFrustum(this.scene.activeCamera);
            this.performanceStats.cullingTime = performance.now() - cullingStartTime;
        }
        
        // Get renderable objects
        let renderableObjects = this.scene.getRenderableObjects();
        
        // Perform frustum culling
        if (this.enableCulling) {
            renderableObjects = this.cullingSystem.frustumCullObjects(renderableObjects);
        }
        
        // Get camera matrices
        const viewMatrix = this.scene.activeCamera.getViewMatrix();
        const projectionMatrix = this.scene.activeCamera.getProjectionMatrix();
        const viewProjectionMatrix = projectionMatrix.multiply(viewMatrix);
        const cameraPosition = this.scene.activeCamera.getWorldPosition();
        
        // Render each object
        renderableObjects.forEach(object => {
            this.renderObject(object, viewProjectionMatrix, cameraPosition);
        });
        
        // Present the frame
        this.renderer.present();
        
        this.performanceStats.renderTime = performance.now() - renderStartTime;
    }

    // Render a single object
    renderObject(object, viewProjectionMatrix, cameraPosition) {
        const mesh = object.mesh;
        if (!mesh) return;
        
        // Transform vertices to world space
        const worldVertices = mesh.vertices.map(vertex => {
            const worldPos = object.worldMatrix.transformVector3(vertex.position);
            const worldNormal = vertex.normal ? 
                object.worldMatrix.transformVector3(vertex.normal).normalize() : null;
            
            return new Vertex(worldPos, worldNormal, vertex.color);
        });
        
        // Create triangles with world-space vertices
        let triangles = mesh.triangles.map(triangle => {
            // Find the indices of the vertices in the original mesh
            const v0Index = mesh.vertices.indexOf(triangle.vertices[0]);
            const v1Index = mesh.vertices.indexOf(triangle.vertices[1]);
            const v2Index = mesh.vertices.indexOf(triangle.vertices[2]);

            const worldTriangle = new Triangle(
                worldVertices[v0Index],
                worldVertices[v1Index],
                worldVertices[v2Index]
            );
            return worldTriangle;
        });
        
        // Perform backface culling
        if (this.enableCulling) {
            triangles = this.cullingSystem.backfaceCullTriangles(triangles, cameraPosition);
        }
        
        // Transform to screen space and render
        triangles.forEach(triangle => {
            this.renderTriangle(triangle, viewProjectionMatrix, cameraPosition);
        });
    }

    // Render a single triangle
    renderTriangle(triangle, viewProjectionMatrix, cameraPosition) {
        // Transform vertices to screen space
        const screenVertices = triangle.vertices.map(vertex => {
            const clipSpace = viewProjectionMatrix.transformVector3(vertex.position);
            return this.renderer.ndcToScreen(clipSpace);
        });
        
        // Calculate colors based on render mode
        let colors = [
            { r: 0, g: 255, b: 0, a: 255 },  // Bright green
            { r: 0, g: 255, b: 0, a: 255 },
            { r: 0, g: 255, b: 0, a: 255 }
        ];
        
        if (this.renderMode === 'lit' && this.enableLighting) {
            const lightingStartTime = performance.now();
            
            // Calculate lighting for each vertex
            colors = triangle.vertices.map(vertex => {
                // Use a default material if none specified
                const material = new Material();
                material.diffuse = new Vector3(0.8, 0.4, 0.4); // Red-ish color
                
                return this.lightingCalculator.calculatePhongLighting(
                    vertex, material, this.scene.lights, cameraPosition
                );
            });
            
            this.performanceStats.lightingTime += performance.now() - lightingStartTime;
        }
        
        // Render based on mode
        if (this.renderMode === 'wireframe') {
            const wireframeColor = { r: 0, g: 255, b: 0, a: 255 };  // Bright green
            this.renderer.drawTriangleWireframe(
                screenVertices[0], screenVertices[1], screenVertices[2], wireframeColor
            );
        } else {
            // Solid or lit rendering
            if (colors.length === 3) {
                // For now, use the first vertex color for the whole triangle
                // In a more advanced renderer, we would interpolate colors across the triangle
                this.renderer.fillTriangle(
                    screenVertices[0], screenVertices[1], screenVertices[2], colors[0]
                );
            }
        }
    }

    // Create primitive meshes
    createCube(size = 1) {
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
        
        return new Mesh(vertices, triangles);
    }

    // Set render mode
    setRenderMode(mode) {
        this.renderMode = mode;
    }

    // Toggle lighting
    toggleLighting() {
        this.enableLighting = !this.enableLighting;
    }

    // Toggle culling
    toggleCulling() {
        this.enableCulling = !this.enableCulling;
    }

    // Get performance statistics
    getStats() {
        return {
            fps: this.fps,
            frameTime: this.performanceStats.frameTime.toFixed(2) + 'ms',
            renderTime: this.performanceStats.renderTime.toFixed(2) + 'ms',
            cullingStats: this.cullingSystem.getStats()
        };
    }

    // Resize engine
    resize(width, height) {
        this.renderer.resize(width, height);
        if (this.scene.activeCamera) {
            this.scene.activeCamera.aspect = width / height;
        }
    }
}

// Export class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Engine3D };
}
