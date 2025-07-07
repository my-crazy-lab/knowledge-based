# 📦 3D Graphics Basics and Engine Components

## 🧠 Toán học cơ bản trong 3D

### Ma trận trong không gian 3D
- **Model Matrix**: Xác định vị trí, xoay, scale của vật thể trong thế giới.
- **View Matrix**: Biến đổi toàn bộ thế giới theo góc nhìn của camera (thường dùng `lookAt()`).
- **Projection Matrix**: Biến đổi không gian 3D thành 2D (perspective hoặc orthographic).

### Vector & Phép biến đổi
- **Vector 3D**: Biểu diễn vị trí, hướng đi, tốc độ...
- **Phép nhân ma trận với vector**: Để biến đổi toạ độ từ local → world → camera → screen.

---

## 🧠 Toán học nâng cao

### 📐 Phép chiếu Orthographic
- Không có phối cảnh (không có “gần to, xa nhỏ”).
- Thường dùng trong CAD, bản đồ, UI 2D trong không gian 3D.

### 🧭 Quaternions
- Biểu diễn xoay 3D không bị gimbal lock.
- Hữu ích trong animation và chuyển hướng camera mượt mà.

### 🔦 Normal Vector
- Vector vuông góc với mặt tam giác → tính toán hướng ánh sáng tới.
- Rất quan trọng để đổ bóng đúng.

### 🧮 Dot / Cross Product
- **Dot product**: Tính cos(góc) giữa 2 vector → dùng trong chiếu sáng.
- **Cross product**: Tính vector vuông góc → dùng để xác định hướng “Right” cho camera hoặc pháp tuyến.

---

## 🎨 Đồ họa máy tính

### 🎭 Shader
- Chương trình chạy trên GPU.
- **Vertex shader**: xử lý điểm đỉnh (vertex).
- **Fragment shader**: tô màu từng pixel.
- Viết bằng **GLSL, HLSL, Metal**.

### 🧵 Texture Mapping
- Gán hình ảnh (texture) vào bề mặt 3D.
- Dùng UV mapping (tọa độ 2D) để ánh xạ ảnh lên mesh.

### 💡 Lighting Models
- **Phong**: mô hình chiếu sáng cơ bản.
- **Blinn-Phong**: hiệu suất tốt hơn, ánh sáng đẹp.
- **PBR (Physically Based Rendering)**: mô phỏng ánh sáng vật lý chân thực.

---

## ⚙️ Kỹ thuật phần mềm

### 🌳 Scene Graph
- Cấu trúc cây cha-con giúp quản lý vật thể và quan hệ.
- Ví dụ: Xe hơi → bánh xe là con của thân xe.

### 🧩 Entity Component System (ECS)
- **Entity**: đối tượng (không chứa dữ liệu).
- **Component**: dữ liệu đơn (Position, Render, AI...).
- **System**: xử lý các component cùng loại.
- Hiệu quả và tối ưu cache hơn OOP.

### 📂 Resource Loader
- Tải model (.obj, .fbx), texture (.png), animation, shader.
- Giúp engine hoạt động linh hoạt, không bị hardcoded.

---

## 🧮 Tối ưu hóa

### 🙈 Culling
- **Frustum Culling**: loại vật thể ngoài vùng nhìn camera.
- **Backface Culling**: bỏ mặt sau của mesh (không nhìn thấy).
- **Occlusion Culling**: bỏ vật thể bị vật khác che.

### 🧊 Level of Detail (LOD)
- Dùng mesh đơn giản hơn khi vật thể ở xa → giảm số polygon.
- Giúp game open world chạy mượt hơn.

### 📦 GPU Batching
- Gộp nhiều vật thể giống nhau vào 1 lệnh vẽ (draw call).
- Giảm chi phí CPU gửi lệnh xuống GPU.
