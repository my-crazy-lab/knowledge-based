// Scene Graph System - Hierarchical scene management
// Manages 3D objects in a tree structure with parent-child relationships

class SceneNode {
    constructor(name = "Node") {
        this.name = name;
        this.children = [];
        this.parent = null;
        
        // Transform properties
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Quaternion(0, 0, 0, 1);
        this.scale = new Vector3(1, 1, 1);
        
        // Matrices
        this.localMatrix = new Matrix4();
        this.worldMatrix = new Matrix4();
        
        // Renderable component
        this.mesh = null;
        this.visible = true;
        
        this.updateLocalMatrix();
    }

    // Add child node
    addChild(child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        
        child.parent = this;
        this.children.push(child);
        child.updateWorldMatrix();
    }

    // Remove child node
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.parent = null;
        }
    }

    // Set position
    setPosition(x, y, z) {
        this.position = new Vector3(x, y, z);
        this.updateLocalMatrix();
    }

    // Set rotation from Euler angles
    setRotation(x, y, z) {
        const qx = Quaternion.fromAxisAngle(new Vector3(1, 0, 0), x);
        const qy = Quaternion.fromAxisAngle(new Vector3(0, 1, 0), y);
        const qz = Quaternion.fromAxisAngle(new Vector3(0, 0, 1), z);
        
        this.rotation = qz.multiply(qy).multiply(qx).normalize();
        this.updateLocalMatrix();
    }

    // Set scale
    setScale(x, y, z) {
        this.scale = new Vector3(x, y, z);
        this.updateLocalMatrix();
    }

    // Translate by offset
    translate(x, y, z) {
        this.position = this.position.add(new Vector3(x, y, z));
        this.updateLocalMatrix();
    }

    // Rotate by angles
    rotate(x, y, z) {
        const qx = Quaternion.fromAxisAngle(new Vector3(1, 0, 0), x);
        const qy = Quaternion.fromAxisAngle(new Vector3(0, 1, 0), y);
        const qz = Quaternion.fromAxisAngle(new Vector3(0, 0, 1), z);
        
        const deltaRotation = qz.multiply(qy).multiply(qx);
        this.rotation = this.rotation.multiply(deltaRotation).normalize();
        this.updateLocalMatrix();
    }

    // Update local transformation matrix
    updateLocalMatrix() {
        const translationMatrix = Matrix4.translation(this.position.x, this.position.y, this.position.z);
        const rotationMatrix = this.rotation.toMatrix4();
        const scaleMatrix = Matrix4.scaling(this.scale.x, this.scale.y, this.scale.z);
        
        this.localMatrix = translationMatrix.multiply(rotationMatrix).multiply(scaleMatrix);
        this.updateWorldMatrix();
    }

    // Update world transformation matrix
    updateWorldMatrix() {
        if (this.parent) {
            this.worldMatrix = this.parent.worldMatrix.multiply(this.localMatrix);
        } else {
            this.worldMatrix = this.localMatrix.clone();
        }
        
        // Update children
        this.children.forEach(child => {
            child.updateWorldMatrix();
        });
    }

    // Traverse scene graph with callback
    traverse(callback) {
        callback(this);
        this.children.forEach(child => {
            child.traverse(callback);
        });
    }

    // Find node by name
    findByName(name) {
        if (this.name === name) return this;
        
        for (let child of this.children) {
            const found = child.findByName(name);
            if (found) return found;
        }
        
        return null;
    }

    // Get world position
    getWorldPosition() {
        return this.worldMatrix.transformVector3(new Vector3(0, 0, 0));
    }

    // Look at target
    lookAt(target, up = new Vector3(0, 1, 0)) {
        const position = this.getWorldPosition();
        const direction = target.subtract(position).normalize();
        const right = direction.cross(up).normalize();
        const newUp = right.cross(direction).normalize();
        
        // Create rotation matrix from basis vectors
        const rotMatrix = new Matrix4();
        rotMatrix.set(
            right.x, newUp.x, -direction.x, 0,
            right.y, newUp.y, -direction.y, 0,
            right.z, newUp.z, -direction.z, 0,
            0, 0, 0, 1
        );
        
        // Convert to quaternion (simplified approach)
        // This is a basic implementation - more robust quaternion extraction would be better
        const trace = rotMatrix.elements[0] + rotMatrix.elements[5] + rotMatrix.elements[10];
        if (trace > 0) {
            const s = Math.sqrt(trace + 1) * 2;
            this.rotation = new Quaternion(
                (rotMatrix.elements[9] - rotMatrix.elements[6]) / s,
                (rotMatrix.elements[2] - rotMatrix.elements[8]) / s,
                (rotMatrix.elements[4] - rotMatrix.elements[1]) / s,
                0.25 * s
            );
        } else {
            // Fallback for edge cases
            this.rotation = new Quaternion(0, 0, 0, 1);
        }
        
        this.updateLocalMatrix();
    }
}

// Camera class extending SceneNode
class Camera extends SceneNode {
    constructor(name = "Camera") {
        super(name);
        
        // Camera properties
        this.fov = Math.PI / 4; // 45 degrees
        this.aspect = 1;
        this.near = 0.1;
        this.far = 1000;
        
        // Projection type
        this.projectionType = 'perspective'; // 'perspective' or 'orthographic'
        
        // Orthographic bounds
        this.left = -1;
        this.right = 1;
        this.bottom = -1;
        this.top = 1;
    }

    // Get view matrix
    getViewMatrix() {
        // Inverse of world matrix gives view matrix
        const pos = this.getWorldPosition();
        const forward = this.worldMatrix.transformVector3(new Vector3(0, 0, -1)).subtract(pos).normalize();
        const up = this.worldMatrix.transformVector3(new Vector3(0, 1, 0)).subtract(pos).normalize();
        const target = pos.add(forward);
        
        return Matrix4.lookAt(pos, target, up);
    }

    // Get projection matrix
    getProjectionMatrix() {
        if (this.projectionType === 'perspective') {
            return Matrix4.perspective(this.fov, this.aspect, this.near, this.far);
        } else {
            return Matrix4.orthographic(this.left, this.right, this.bottom, this.top, this.near, this.far);
        }
    }

    // Set perspective projection
    setPerspective(fov, aspect, near, far) {
        this.projectionType = 'perspective';
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }

    // Set orthographic projection
    setOrthographic(left, right, bottom, top, near, far) {
        this.projectionType = 'orthographic';
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        this.near = near;
        this.far = far;
    }
}

// Light class extending SceneNode
class Light extends SceneNode {
    constructor(name = "Light", type = 'directional') {
        super(name);
        
        this.type = type; // 'directional', 'point', 'spot'
        this.color = new Vector3(1, 1, 1);
        this.intensity = 1.0;
        
        // Point/Spot light properties
        this.range = 10.0;
        
        // Spot light properties
        this.spotAngle = Math.PI / 4;
        this.spotPenumbra = 0.1;
    }

    // Get light direction (for directional lights)
    getDirection() {
        return this.worldMatrix.transformVector3(new Vector3(0, 0, -1))
                   .subtract(this.getWorldPosition()).normalize();
    }
}

// Scene class to manage the scene graph
class Scene {
    constructor() {
        this.root = new SceneNode("Root");
        this.cameras = [];
        this.lights = [];
        this.activeCamera = null;
    }

    // Add camera to scene
    addCamera(camera) {
        this.cameras.push(camera);
        this.root.addChild(camera);
        
        if (!this.activeCamera) {
            this.activeCamera = camera;
        }
    }

    // Add light to scene
    addLight(light) {
        this.lights.push(light);
        this.root.addChild(light);
    }

    // Add object to scene
    addObject(object) {
        this.root.addChild(object);
    }

    // Set active camera
    setActiveCamera(camera) {
        this.activeCamera = camera;
    }

    // Update scene (call this every frame)
    update() {
        this.root.updateWorldMatrix();
    }

    // Get all renderable objects
    getRenderableObjects() {
        const objects = [];
        this.root.traverse(node => {
            if (node.mesh && node.visible) {
                objects.push(node);
            }
        });
        return objects;
    }
}

// Export classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SceneNode, Camera, Light, Scene };
}
