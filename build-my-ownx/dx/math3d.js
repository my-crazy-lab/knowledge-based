// 3D Math Library - Core mathematical operations for 3D graphics
// No external dependencies - pure JavaScript implementation

/**
 * Vector3 class for 3D vector operations
 */
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Vector addition
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    // Vector subtraction
    subtract(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    // Scalar multiplication
    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    // Dot product
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    // Cross product
    cross(v) {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    // Vector length/magnitude
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    // Normalize vector (unit vector)
    normalize() {
        const len = this.length();
        if (len === 0) return new Vector3(0, 0, 0);
        return new Vector3(this.x / len, this.y / len, this.z / len);
    }

    // Distance to another vector
    distanceTo(v) {
        return this.subtract(v).length();
    }

    // Clone vector
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    // Convert to array
    toArray() {
        return [this.x, this.y, this.z];
    }

    // String representation
    toString() {
        return `Vector3(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
    }
}

/**
 * Matrix4 class for 4x4 matrix operations (homogeneous coordinates)
 */
class Matrix4 {
    constructor() {
        // Initialize as identity matrix
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    // Set matrix elements
    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        this.elements = [
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33
        ];
        return this;
    }

    // Create identity matrix
    identity() {
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        return this;
    }

    // Matrix multiplication
    multiply(m) {
        const a = this.elements;
        const b = m.elements;
        const result = new Matrix4();
        const c = result.elements;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                c[i * 4 + j] = 
                    a[i * 4 + 0] * b[0 * 4 + j] +
                    a[i * 4 + 1] * b[1 * 4 + j] +
                    a[i * 4 + 2] * b[2 * 4 + j] +
                    a[i * 4 + 3] * b[3 * 4 + j];
            }
        }
        return result;
    }

    // Transform a Vector3 (treating as homogeneous coordinate with w=1)
    transformVector3(v) {
        const x = v.x, y = v.y, z = v.z;
        const e = this.elements;

        const w = e[3] * x + e[7] * y + e[11] * z + e[15]; // w component

        if (Math.abs(w) < 0.0001) {
            // Avoid division by zero
            return new Vector3(
                e[0] * x + e[4] * y + e[8] * z + e[12],
                e[1] * x + e[5] * y + e[9] * z + e[13],
                e[2] * x + e[6] * y + e[10] * z + e[14]
            );
        }

        return new Vector3(
            (e[0] * x + e[4] * y + e[8] * z + e[12]) / w,
            (e[1] * x + e[5] * y + e[9] * z + e[13]) / w,
            (e[2] * x + e[6] * y + e[10] * z + e[14]) / w
        );
    }

    // Clone matrix
    clone() {
        const result = new Matrix4();
        result.elements = [...this.elements];
        return result;
    }

    // Translation matrix
    static translation(x, y, z) {
        const matrix = new Matrix4();
        matrix.set(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        );
        return matrix;
    }

    // Scaling matrix
    static scaling(x, y, z) {
        const matrix = new Matrix4();
        matrix.set(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        );
        return matrix;
    }

    // Rotation matrix around X axis
    static rotationX(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const matrix = new Matrix4();
        matrix.set(
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1
        );
        return matrix;
    }

    // Rotation matrix around Y axis
    static rotationY(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const matrix = new Matrix4();
        matrix.set(
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1
        );
        return matrix;
    }

    // Rotation matrix around Z axis
    static rotationZ(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const matrix = new Matrix4();
        matrix.set(
            cos, -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return matrix;
    }

    // Perspective projection matrix
    static perspective(fov, aspect, near, far) {
        const f = 1.0 / Math.tan(fov * 0.5);
        const rangeInv = 1.0 / (near - far);

        const matrix = new Matrix4();
        matrix.set(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv,
            0, 0, -1, 0
        );
        return matrix;
    }

    // Orthographic projection matrix
    static orthographic(left, right, bottom, top, near, far) {
        const matrix = new Matrix4();
        matrix.set(
            2 / (right - left), 0, 0, -(right + left) / (right - left),
            0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
            0, 0, -2 / (far - near), -(far + near) / (far - near),
            0, 0, 0, 1
        );
        return matrix;
    }

    // Look-at view matrix
    static lookAt(eye, target, up) {
        const zAxis = eye.subtract(target).normalize();
        const xAxis = up.cross(zAxis).normalize();
        const yAxis = zAxis.cross(xAxis);

        const matrix = new Matrix4();
        matrix.set(
            xAxis.x, xAxis.y, xAxis.z, -xAxis.dot(eye),
            yAxis.x, yAxis.y, yAxis.z, -yAxis.dot(eye),
            zAxis.x, zAxis.y, zAxis.z, -zAxis.dot(eye),
            0, 0, 0, 1
        );
        return matrix;
    }
}

/**
 * Quaternion class for rotation representation
 */
class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // Quaternion multiplication
    multiply(q) {
        return new Quaternion(
            this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
            this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
            this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w,
            this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
        );
    }

    // Normalize quaternion
    normalize() {
        const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (len === 0) return new Quaternion(0, 0, 0, 1);
        return new Quaternion(this.x / len, this.y / len, this.z / len, this.w / len);
    }

    // Create quaternion from axis-angle rotation
    static fromAxisAngle(axis, angle) {
        const halfAngle = angle * 0.5;
        const s = Math.sin(halfAngle);
        const normalizedAxis = axis.normalize();
        
        return new Quaternion(
            normalizedAxis.x * s,
            normalizedAxis.y * s,
            normalizedAxis.z * s,
            Math.cos(halfAngle)
        );
    }

    // Convert to rotation matrix
    toMatrix4() {
        const matrix = new Matrix4();
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;

        matrix.set(
            1 - (yy + zz), xy - wz, xz + wy, 0,
            xy + wz, 1 - (xx + zz), yz - wx, 0,
            xz - wy, yz + wx, 1 - (xx + yy), 0,
            0, 0, 0, 1
        );

        return matrix;
    }

    // Clone quaternion
    clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Vector3, Matrix4, Quaternion };
}
