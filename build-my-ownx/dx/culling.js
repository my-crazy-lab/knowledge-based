// Culling System - Frustum and backface culling for performance optimization
// Removes objects and triangles that are not visible to improve rendering performance

class Plane {
    constructor(normal, distance) {
        this.normal = normal.normalize(); // Normal vector
        this.distance = distance;         // Distance from origin
    }

    // Create plane from three points
    static fromPoints(p1, p2, p3) {
        const v1 = p2.subtract(p1);
        const v2 = p3.subtract(p1);
        const normal = v1.cross(v2).normalize();
        const distance = normal.dot(p1);
        return new Plane(normal, distance);
    }

    // Distance from point to plane (positive = in front, negative = behind)
    distanceToPoint(point) {
        return this.normal.dot(point) - this.distance;
    }

    // Check if point is in front of plane
    isPointInFront(point) {
        return this.distanceToPoint(point) > 0;
    }
}

class BoundingBox {
    constructor(min = null, max = null) {
        this.min = min || new Vector3(Infinity, Infinity, Infinity);
        this.max = max || new Vector3(-Infinity, -Infinity, -Infinity);
    }

    // Expand bounding box to include point
    expandToInclude(point) {
        this.min.x = Math.min(this.min.x, point.x);
        this.min.y = Math.min(this.min.y, point.y);
        this.min.z = Math.min(this.min.z, point.z);
        
        this.max.x = Math.max(this.max.x, point.x);
        this.max.y = Math.max(this.max.y, point.y);
        this.max.z = Math.max(this.max.z, point.z);
    }

    // Get center point
    getCenter() {
        return new Vector3(
            (this.min.x + this.max.x) * 0.5,
            (this.min.y + this.max.y) * 0.5,
            (this.min.z + this.max.z) * 0.5
        );
    }

    // Get size
    getSize() {
        return this.max.subtract(this.min);
    }

    // Get all 8 corners of the bounding box
    getCorners() {
        return [
            new Vector3(this.min.x, this.min.y, this.min.z),
            new Vector3(this.max.x, this.min.y, this.min.z),
            new Vector3(this.min.x, this.max.y, this.min.z),
            new Vector3(this.max.x, this.max.y, this.min.z),
            new Vector3(this.min.x, this.min.y, this.max.z),
            new Vector3(this.max.x, this.min.y, this.max.z),
            new Vector3(this.min.x, this.max.y, this.max.z),
            new Vector3(this.max.x, this.max.y, this.max.z)
        ];
    }

    // Transform bounding box by matrix
    transform(matrix) {
        const corners = this.getCorners();
        const transformedBox = new BoundingBox();
        
        corners.forEach(corner => {
            const transformedCorner = matrix.transformVector3(corner);
            transformedBox.expandToInclude(transformedCorner);
        });
        
        return transformedBox;
    }
}

class Frustum {
    constructor() {
        this.planes = []; // 6 planes: near, far, left, right, top, bottom
    }

    // Extract frustum planes from view-projection matrix
    extractFromMatrix(viewProjectionMatrix) {
        const m = viewProjectionMatrix.elements;
        
        // Extract planes from matrix (Gribb/Hartmann method)
        this.planes = [
            // Left plane
            new Plane(
                new Vector3(m[3] + m[0], m[7] + m[4], m[11] + m[8]),
                m[15] + m[12]
            ),
            // Right plane
            new Plane(
                new Vector3(m[3] - m[0], m[7] - m[4], m[11] - m[8]),
                m[15] - m[12]
            ),
            // Bottom plane
            new Plane(
                new Vector3(m[3] + m[1], m[7] + m[5], m[11] + m[9]),
                m[15] + m[13]
            ),
            // Top plane
            new Plane(
                new Vector3(m[3] - m[1], m[7] - m[5], m[11] - m[9]),
                m[15] - m[13]
            ),
            // Near plane
            new Plane(
                new Vector3(m[3] + m[2], m[7] + m[6], m[11] + m[10]),
                m[15] + m[14]
            ),
            // Far plane
            new Plane(
                new Vector3(m[3] - m[2], m[7] - m[6], m[11] - m[10]),
                m[15] - m[14]
            )
        ];

        // Normalize planes
        this.planes.forEach(plane => {
            const length = plane.normal.length();
            plane.normal = plane.normal.multiply(1 / length);
            plane.distance = plane.distance / length;
        });
    }

    // Test if point is inside frustum
    containsPoint(point) {
        return this.planes.every(plane => plane.isPointInFront(point));
    }

    // Test if bounding box intersects frustum
    intersectsBoundingBox(boundingBox) {
        const corners = boundingBox.getCorners();
        
        for (let plane of this.planes) {
            let allBehind = true;
            
            // Check if all corners are behind this plane
            for (let corner of corners) {
                if (plane.isPointInFront(corner)) {
                    allBehind = false;
                    break;
                }
            }
            
            // If all corners are behind any plane, the box is outside
            if (allBehind) {
                return false;
            }
        }
        
        return true; // Box intersects or is inside frustum
    }

    // Test if sphere intersects frustum
    intersectsSphere(center, radius) {
        for (let plane of this.planes) {
            const distance = plane.distanceToPoint(center);
            if (distance < -radius) {
                return false; // Sphere is completely behind this plane
            }
        }
        return true;
    }
}

class CullingSystem {
    constructor() {
        this.frustum = new Frustum();
        this.enableFrustumCulling = true;
        this.enableBackfaceCulling = true;
        
        // Statistics
        this.stats = {
            totalObjects: 0,
            culledObjects: 0,
            totalTriangles: 0,
            culledTriangles: 0
        };
    }

    // Reset statistics
    resetStats() {
        this.stats = {
            totalObjects: 0,
            culledObjects: 0,
            totalTriangles: 0,
            culledTriangles: 0
        };
    }

    // Update frustum from camera
    updateFrustum(camera) {
        const viewMatrix = camera.getViewMatrix();
        const projectionMatrix = camera.getProjectionMatrix();
        const viewProjectionMatrix = projectionMatrix.multiply(viewMatrix);
        
        this.frustum.extractFromMatrix(viewProjectionMatrix);
    }

    // Perform frustum culling on objects
    frustumCullObjects(objects) {
        if (!this.enableFrustumCulling) return objects;
        
        const visibleObjects = [];
        
        objects.forEach(object => {
            this.stats.totalObjects++;
            
            if (object.mesh) {
                // Calculate world-space bounding box
                const boundingBox = this.calculateBoundingBox(object.mesh);
                const worldBoundingBox = boundingBox.transform(object.worldMatrix);
                
                // Test against frustum
                if (this.frustum.intersectsBoundingBox(worldBoundingBox)) {
                    visibleObjects.push(object);
                } else {
                    this.stats.culledObjects++;
                }
            } else {
                // No mesh, include by default
                visibleObjects.push(object);
            }
        });
        
        return visibleObjects;
    }

    // Perform backface culling on triangles
    backfaceCullTriangles(triangles, cameraPosition) {
        if (!this.enableBackfaceCulling) return triangles;
        
        const visibleTriangles = [];
        
        triangles.forEach(triangle => {
            this.stats.totalTriangles++;
            
            // Calculate face normal
            const normal = triangle.getNormal();
            
            // Get triangle center
            const center = triangle.vertices[0].position
                .add(triangle.vertices[1].position)
                .add(triangle.vertices[2].position)
                .multiply(1/3);
            
            // Vector from triangle to camera
            const toCamera = cameraPosition.subtract(center).normalize();
            
            // If normal points away from camera, cull the triangle
            if (normal.dot(toCamera) > 0) {
                visibleTriangles.push(triangle);
            } else {
                this.stats.culledTriangles++;
            }
        });
        
        return visibleTriangles;
    }

    // Calculate bounding box for a mesh
    calculateBoundingBox(mesh) {
        const boundingBox = new BoundingBox();
        
        mesh.vertices.forEach(vertex => {
            boundingBox.expandToInclude(vertex.position);
        });
        
        return boundingBox;
    }

    // Occlusion culling (simplified - checks if object is behind another)
    occlusionCull(objects, cameraPosition) {
        // This is a simplified implementation
        // A real occlusion culling system would use depth buffers or hierarchical Z-buffers
        
        const visibleObjects = [];
        
        objects.forEach((object, index) => {
            let isOccluded = false;
            const objectCenter = object.getWorldPosition();
            const distanceToCamera = objectCenter.distanceTo(cameraPosition);
            
            // Check if this object is occluded by any closer object
            for (let i = 0; i < objects.length; i++) {
                if (i === index) continue;
                
                const otherObject = objects[i];
                const otherCenter = otherObject.getWorldPosition();
                const otherDistance = otherCenter.distanceTo(cameraPosition);
                
                // If other object is closer and in similar direction
                if (otherDistance < distanceToCamera) {
                    const dirToObject = objectCenter.subtract(cameraPosition).normalize();
                    const dirToOther = otherCenter.subtract(cameraPosition).normalize();
                    
                    // Simple angle check (could be improved with proper occlusion testing)
                    if (dirToObject.dot(dirToOther) > 0.9) {
                        isOccluded = true;
                        break;
                    }
                }
            }
            
            if (!isOccluded) {
                visibleObjects.push(object);
            }
        });
        
        return visibleObjects;
    }

    // Get culling statistics
    getStats() {
        return {
            ...this.stats,
            objectCullRate: this.stats.totalObjects > 0 ? 
                (this.stats.culledObjects / this.stats.totalObjects * 100).toFixed(1) + '%' : '0%',
            triangleCullRate: this.stats.totalTriangles > 0 ? 
                (this.stats.culledTriangles / this.stats.totalTriangles * 100).toFixed(1) + '%' : '0%'
        };
    }
}

// Export classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Plane, BoundingBox, Frustum, CullingSystem };
}
