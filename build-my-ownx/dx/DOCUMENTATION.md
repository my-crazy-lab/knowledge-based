# 📚 3D Engine Documentation

## 🎯 Tổng quan

Đây là một 3D engine hoàn chỉnh được viết bằng pure JavaScript và HTML, không sử dụng thư viện ngoài. Engine implement software rasterization và tất cả các tính năng 3D từ đầu.

## 📁 Cấu trúc File

### 🧮 `math3d.js` - Thư viện Toán học 3D

**Mục đích**: Cung cấp các class và phép toán cơ bản cho 3D graphics

**Classes chính**:

#### `Vector3`
- **Chức năng**: Biểu diễn vector 3D (x, y, z)
- **Methods quan trọng**:
  - `add(v)`: Cộng vector
  - `subtract(v)`: Trừ vector  
  - `multiply(scalar)`: Nhân với số vô hướng
  - `dot(v)`: Tích vô hướng (dot product)
  - `cross(v)`: Tích có hướng (cross product)
  - `normalize()`: Chuẩn hóa vector (độ dài = 1)
  - `length()`: Tính độ dài vector

#### `Matrix4`
- **Chức năng**: Ma trận 4x4 cho homogeneous coordinates
- **Methods quan trọng**:
  - `multiply(m)`: Nhân ma trận
  - `transformVector3(v)`: Transform vector 3D
  - `translation(x,y,z)`: Tạo ma trận dịch chuyển
  - `rotationX/Y/Z(angle)`: Tạo ma trận xoay
  - `scaling(x,y,z)`: Tạo ma trận scale
  - `perspective(fov, aspect, near, far)`: Ma trận phối cảnh
  - `orthographic(...)`: Ma trận trực giao
  - `lookAt(eye, target, up)`: Ma trận view camera

#### `Quaternion`
- **Chức năng**: Biểu diễn rotation không bị gimbal lock
- **Methods quan trọng**:
  - `multiply(q)`: Nhân quaternion
  - `normalize()`: Chuẩn hóa
  - `fromAxisAngle(axis, angle)`: Tạo từ trục-góc
  - `toMatrix4()`: Chuyển thành ma trận rotation

---

### 🎨 `renderer.js` - Hệ thống Render

**Mục đích**: Software rasterization, vẽ pixels lên canvas

**Classes chính**:

#### `Renderer`
- **Chức năng**: Quản lý canvas, z-buffer, và vẽ primitives
- **Properties**:
  - `canvas`: HTML5 Canvas element
  - `ctx`: 2D rendering context
  - `zBuffer`: Mảng depth testing
  - `imageData`: Pixel data để manipulate trực tiếp
- **Methods quan trọng**:
  - `clear()`: Xóa màn hình và z-buffer
  - `setPixel(x, y, z, color)`: Vẽ pixel với depth test
  - `drawLine(p1, p2, color)`: Vẽ đường thẳng (Bresenham)
  - `fillTriangle(v1, v2, v3, color)`: Fill tam giác (barycentric)
  - `drawTriangleWireframe()`: Vẽ wireframe tam giác
  - `ndcToScreen(ndc)`: Chuyển NDC sang screen coordinates
  - `present()`: Hiển thị frame lên canvas

#### `Vertex`
- **Chức năng**: Biểu diễn đỉnh 3D với position, normal, color

#### `Triangle`
- **Chức năng**: Biểu diễn tam giác với 3 vertices
- **Methods**: `getNormal()`: Tính normal của mặt

#### `Mesh`
- **Chức năng**: Tập hợp vertices và triangles tạo thành 3D object
- **Methods**: `calculateVertexNormals()`: Tính vertex normals

---

### 🌳 `scene.js` - Hệ thống Scene Graph

**Mục đích**: Quản lý hierarchy và transform của objects trong scene

**Classes chính**:

#### `SceneNode`
- **Chức năng**: Node trong scene graph tree
- **Properties**:
  - `position, rotation, scale`: Transform properties
  - `localMatrix, worldMatrix`: Ma trận transform
  - `children[]`: Các node con
  - `parent`: Node cha
  - `mesh`: Geometry để render
- **Methods quan trọng**:
  - `addChild(child)`: Thêm node con
  - `setPosition/Rotation/Scale()`: Set transform
  - `translate/rotate()`: Transform relative
  - `updateLocalMatrix()`: Cập nhật ma trận local
  - `updateWorldMatrix()`: Cập nhật ma trận world (recursive)
  - `traverse(callback)`: Duyệt tree
  - `lookAt(target)`: Quay về hướng target

#### `Camera` extends `SceneNode`
- **Chức năng**: Camera với projection settings
- **Properties**:
  - `fov, aspect, near, far`: Perspective parameters
  - `projectionType`: 'perspective' hoặc 'orthographic'
- **Methods**:
  - `getViewMatrix()`: Tính view matrix
  - `getProjectionMatrix()`: Tính projection matrix
  - `setPerspective/setOrthographic()`: Set projection

#### `Light` extends `SceneNode`
- **Chức năng**: Nguồn sáng
- **Properties**:
  - `type`: 'directional', 'point', 'spot'
  - `color, intensity`: Màu và cường độ
  - `range`: Phạm vi (point/spot light)

#### `Scene`
- **Chức năng**: Quản lý toàn bộ scene
- **Methods**:
  - `addCamera/Light/Object()`: Thêm objects
  - `setActiveCamera()`: Set camera hiện tại
  - `getRenderableObjects()`: Lấy objects có thể render

---

### 💡 `lighting.js` - Hệ thống Ánh sáng

**Mục đích**: Tính toán lighting theo Phong model

**Classes chính**:

#### `Material`
- **Chức năng**: Định nghĩa material properties
- **Properties**:
  - `ambient, diffuse, specular`: Màu ambient/diffuse/specular
  - `shininess`: Độ bóng (specular exponent)
  - `emissive`: Màu phát sáng

#### `LightingCalculator`
- **Chức năng**: Tính toán Phong lighting
- **Methods quan trọng**:
  - `calculatePhongLighting()`: Tính lighting cho vertex
  - `calculateLightContribution()`: Tính contribution từ 1 light
  - `calculateBlinnPhongSpecular()`: Blinn-Phong specular
  - `reflect()`: Phản xạ vector
  - `interpolateColors()`: Nội suy màu

#### `Materials`
- **Chức năng**: Predefined materials (Metal, Plastic, Gold, etc.)

---

### 🧮 `culling.js` - Hệ thống Culling

**Mục đích**: Loại bỏ objects/triangles không nhìn thấy để tối ưu

**Classes chính**:

#### `Plane`
- **Chức năng**: Biểu diễn mặt phẳng 3D
- **Methods**: `distanceToPoint()`, `isPointInFront()`

#### `BoundingBox`
- **Chức năng**: Hộp bao quanh object
- **Methods**: `expandToInclude()`, `getCorners()`, `transform()`

#### `Frustum`
- **Chức năng**: View frustum của camera (6 mặt phẳng)
- **Methods**:
  - `extractFromMatrix()`: Tính frustum từ view-projection matrix
  - `containsPoint()`: Kiểm tra point trong frustum
  - `intersectsBoundingBox()`: Kiểm tra box intersect frustum

#### `CullingSystem`
- **Chức năng**: Quản lý tất cả culling operations
- **Methods**:
  - `updateFrustum()`: Cập nhật frustum từ camera
  - `frustumCullObjects()`: Frustum culling objects
  - `backfaceCullTriangles()`: Backface culling triangles
  - `occlusionCull()`: Occlusion culling (đơn giản)

---

### 🧩 `primitives.js` - Tạo Primitive Shapes

**Mục đích**: Generate các hình 3D cơ bản

**Class `Primitives`** (static methods):
- `createCube(size)`: Tạo hình lập phương
- `createSphere(radius, segments, rings)`: Tạo hình cầu
- `createCylinder(radius, height, segments)`: Tạo hình trụ
- `createPlane(width, height, segments)`: Tạo mặt phẳng
- `createPyramid(base, height)`: Tạo hình chóp
- `createTorus(majorRadius, minorRadius, segments)`: Tạo hình xuyến
- `createIcosahedron(radius)`: Tạo hình 20 mặt

---

### ⚙️ `engine3d.js` - Engine Chính

**Mục đích**: Tích hợp tất cả systems, quản lý game loop

**Class `Engine3D`**:
- **Properties**:
  - `renderer`: Renderer instance
  - `scene`: Scene instance  
  - `lightingCalculator`: Lighting calculator
  - `cullingSystem`: Culling system
  - `renderMode`: 'wireframe', 'solid', 'lit'
- **Methods quan trọng**:
  - `start/stop()`: Bắt đầu/dừng engine
  - `gameLoop()`: Main game loop
  - `update()`: Update scene
  - `render()`: Render frame
  - `renderObject()`: Render 1 object
  - `renderTriangle()`: Render 1 triangle
  - `createCube()`: Tạo cube (helper method)

**Render Pipeline**:
1. Clear screen
2. Update culling frustum
3. Get renderable objects
4. Frustum cull objects
5. For each object:
   - Transform vertices to world space
   - Create triangles
   - Backface cull triangles
   - Transform to screen space
   - Render triangles

---

### 🎮 `index.html` - Demo Application

**Mục đích**: Interactive demo showcase tất cả features

**Features**:
- **UI Controls**: Render mode, shape selection, toggles
- **Camera Controls**: Mouse rotation, WASD movement, zoom
- **Real-time Stats**: FPS, render time, culling stats
- **Feature Checklist**: Hiển thị implemented features

**JavaScript Logic**:
- Engine initialization
- Shape creation và switching
- Camera controls (mouse + keyboard)
- UI event handlers
- Animation loop
- Performance monitoring

---

## 🔄 Luồng Hoạt động

### Initialization
1. Tạo Engine3D với canvas
2. Setup default scene (camera + light)
3. Tạo primitive shape
4. Add vào scene
5. Start game loop

### Game Loop (mỗi frame)
1. **Update**: Cập nhật scene transforms
2. **Culling**: Update frustum, cull objects
3. **Render**: 
   - Clear screen
   - For each visible object:
     - Transform vertices
     - Cull triangles
     - Rasterize triangles
   - Present frame

### Rendering Pipeline
```
3D Vertices → World Transform → View Transform → 
Projection → NDC → Screen Coordinates → Rasterization
```

---

## 🎯 Tính năng Đã Implement

✅ **3D Math**: Vector3, Matrix4, Quaternion
✅ **Transformations**: Model/View/Projection matrices  
✅ **Projections**: Perspective & Orthographic
✅ **Rendering**: Software rasterization với Z-buffer
✅ **Scene Graph**: Hierarchical transforms
✅ **Lighting**: Phong model với multiple lights
✅ **Culling**: Frustum + Backface culling
✅ **Primitives**: 6 loại hình cơ bản
✅ **Materials**: Predefined material system
✅ **Camera**: Free camera với controls
✅ **Performance**: Real-time stats monitoring

## 🚀 Cách Sử dụng

1. Mở `index.html` trong browser
2. Sử dụng mouse để rotate camera
3. WASD để di chuyển camera
4. Chọn shapes từ dropdown
5. Toggle render modes và settings
6. Monitor performance stats

Engine hoàn toàn self-contained, không cần server hay dependencies!
