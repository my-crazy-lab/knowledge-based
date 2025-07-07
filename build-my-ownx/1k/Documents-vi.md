# Tiny Package Manager (TPM) - Tài Liệu Kỹ Thuật

## Tổng Quan

Tài liệu này cung cấp một cái nhìn tổng quan kỹ thuật về Tiny Package Manager (TPM), một triển khai đơn giản của package manager tương tự như npm hoặc Yarn. Mục đích là giáo dục - để minh họa cách các package manager hoạt động bên dưới.

## Kiến Trúc Tổng Quan

TPM tuân theo kiến trúc modular với sự phân tách rõ ràng các mối quan tâm:

```
┌─────────────────┐
│   CLI (tpm.js)  │
└─────────┬───────┘
          │
┌─────────▼───────┐
│ PackageManager  │ ◄─── Điều phối chính
└─────────┬───────┘
          │
          ├─── RegistryClient     (giao tiếp với npm registry)
          ├─── DependencyResolver (giải quyết cây dependency)
          ├─── PackageInstaller   (tải xuống & giải nén package)
          ├─── LockFile          (cài đặt có thể tái tạo)
          ├─── LifecycleRunner   (script pre/post install)
          └─── BinLinker         (symlink cho executable)
```

## Các Thành Phần Cốt Lõi

### 1. PackageManager (src/PackageManager.js)

**Mục đích**: Điều phối chính để phối hợp tất cả các hoạt động quản lý package.

**Phương thức chính**:
- `install()`: Cài đặt tất cả dependencies từ package.json
- `add(packageSpec)`: Thêm package mới vào dependencies
- `readPackageJson()`: Đọc và phân tích package.json
- `writePackageJson()`: Ghi package.json đã cập nhật

**Quy trình làm việc**:
1. Đọc package.json
2. Kiểm tra xem lock file có tồn tại và hợp lệ không
3. Giải quyết dependencies (từ lock file hoặc giải quyết mới)
4. Chạy script preinstall
5. Cài đặt packages
6. Tạo symlink binary
7. Chạy script postinstall

### 2. RegistryClient (src/RegistryClient.js)

**Mục đích**: Xử lý giao tiếp với npm registry.

**Phương thức chính**:
- `getPackageMetadata(packageName)`: Lấy metadata package từ registry
- `downloadTarball(tarballUrl, destination)`: Tải xuống package tarball
- `getBestVersion(metadata, versionRange)`: Giải quyết version ranges

**Chi tiết triển khai**:
- Sử dụng module HTTPS để giao tiếp với registry
- URL Registry: `https://registry.npmjs.org`
- Giải quyết version đơn giản (sử dụng latest cho tất cả ranges)

### 3. DependencyResolver (src/DependencyResolver.js)

**Mục đích**: Giải quyết cây dependency và xử lý xung đột version.

**Phương thức chính**:
- `resolveDependencies(packageJson)`: Giải quyết tất cả dependencies
- `resolveDependency(packageName, versionRange)`: Giải quyết dependency đơn lẻ
- `getResolvedMetadata(packageName)`: Lấy metadata đã cache

**Thuật toán**:
1. Bắt đầu với direct dependencies từ package.json
2. Với mỗi dependency, lấy metadata từ registry
3. Đệ quy giải quyết transitive dependencies
4. Sử dụng chiến lược "first wins" để giải quyết xung đột
5. Xây dựng cây dependency phẳng

**Giải quyết xung đột**:
- Chiến lược đơn giản: version đầu tiên gặp sẽ thắng
- Triển khai thực tế sử dụng semver để tìm version tương thích
- Ngăn chặn vòng lặp vô hạn với visited set

### 4. PackageInstaller (src/PackageInstaller.js)

**Mục đích**: Tải xuống và giải nén packages vào node_modules.

**Phương thức chính**:
- `installPackage(packageName, version, metadata)`: Cài đặt package đơn lẻ
- `installPackages(dependencyTree, resolvedMetadata)`: Cài đặt nhiều packages
- `extractPackage(tarballPath, extractPath)`: Giải nén tarball

**Quy trình cài đặt**:
1. Tạo thư mục node_modules nếu cần
2. Bỏ qua nếu package đã được cài đặt
3. Tải xuống tarball từ registry
4. Giải nén vào thư mục package (loại bỏ thư mục 'package' cấp cao nhất)
5. Dọn dẹp các file tạm thời

### 5. LockFile (src/LockFile.js)

**Mục đích**: Quản lý lock files để cài đặt có thể tái tạo.

**Phương thức chính**:
- `read()`: Đọc lock file hiện có
- `write(dependencyTree, resolvedMetadata)`: Ghi lock file
- `isValid(packageJson)`: Xác thực lock file với package.json
- `getDependencyTree()`: Trích xuất cây dependency từ lock file

**Định dạng Lock File** (tpm-lock.json):
```json
{
  "version": 1,
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "package-name": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/package/-/package-1.0.0.tgz",
      "integrity": "sha512-...",
      "requires": {
        "dependency": "^2.0.0"
      }
    }
  }
}
```

### 6. LifecycleRunner (src/LifecycleRunner.js)

**Mục đích**: Thực thi lifecycle scripts (preinstall, postinstall).

**Phương thức chính**:
- `runPreinstall()`: Chạy script preinstall
- `runPostinstall()`: Chạy script postinstall
- `runScript(scriptName)`: Chạy script cụ thể
- `executeCommand(command)`: Thực thi lệnh shell

**Thực thi Script**:
- Sử dụng child_process.spawn để thực thi script
- Kế thừa stdio để output thời gian thực
- Non-blocking: lỗi script không làm hỏng cài đặt
- Hỗ trợ cả script cấp project và package

### 7. BinLinker (src/BinLinker.js)

**Mục đích**: Tạo symlinks cho các file executable.

**Phương thức chính**:
- `linkBinaries(dependencyTree, resolvedMetadata)`: Link tất cả binaries
- `linkPackageBinaries(packageName, version)`: Link package binaries
- `createSymlink(binName, binPath, packagePath)`: Tạo symlink riêng lẻ

**Quy trình Binary Linking**:
1. Tạo thư mục .bin trong node_modules
2. Với mỗi package, đọc trường bin từ package.json
3. Tạo symlinks từ .bin đến các file executable thực tế
4. Làm cho files có thể thực thi (chmod 755)
5. Trên Windows, tạo file batch .cmd thay vì symlinks

## Luồng Dữ Liệu

### Luồng Cài Đặt

```
package.json → DependencyResolver → Registry API
     ↓                ↓                  ↓
Lock File ←── Dependency Tree ←── Package Metadata
     ↓                ↓                  ↓
Validation → PackageInstaller → Download & Extract
     ↓                ↓                  ↓
Scripts ←─── BinLinker ←────── node_modules
```

### Luồng Thêm Package

```
CLI Command → PackageManager → RegistryClient
     ↓              ↓              ↓
Validate → Update package.json → Install Flow
```

## Cấu Trúc File System

### Trước Khi Cài Đặt
```
project/
├── package.json
└── (các file project khác)
```

### Sau Khi Cài Đặt
```
project/
├── package.json
├── tpm-lock.json
├── node_modules/
│   ├── .bin/
│   │   ├── executable1 → ../package1/bin/cli.js
│   │   └── executable2 → ../package2/bin/tool.js
│   ├── package1/
│   │   ├── package.json
│   │   ├── index.js
│   │   └── bin/cli.js
│   └── package2/
│       ├── package.json
│       └── lib/
└── (các file project khác)
```

## Xử Lý Lỗi

### Lỗi Registry
- Lỗi mạng khi lấy metadata
- Package không tìm thấy (lỗi 404)
- Phản hồi JSON không hợp lệ

### Lỗi Cài Đặt
- Vấn đề về dung lượng đĩa
- Vấn đề về quyền
- Tarball bị hỏng

### Lỗi Script
- Lỗi lifecycle script (non-blocking)
- Thiếu script interpreters
- Vấn đề timeout script

## Cân Nhắc Về Hiệu Suất

### Chiến Lược Tối Ưu
1. **Tải Xuống Song Song**: Có thể tải xuống nhiều packages đồng thời
2. **Caching**: Có thể cache metadata và tarballs của package
3. **Cập Nhật Tăng Dần**: Chỉ cập nhật dependencies đã thay đổi
4. **Nén**: Sử dụng gzip để tải xuống nhanh hơn

### Hạn Chế Hiện Tại
- Cài đặt package tuần tự
- Không có metadata caching
- Không có khả năng tiếp tục tải xuống
- Không có xác minh tính toàn vẹn

## Cân Nhắc Về Bảo Mật

### Triển Khai Hiện Tại
- Chỉ tải xuống từ npm registry chính thức
- Không có xác minh tính toàn vẹn
- Không có xác thực chữ ký
- Thực thi lifecycle scripts mà không có sandboxing

### Yêu Cầu Production
- Xác minh tính toàn vẹn package (checksums)
- Xác thực chữ ký
- Thực thi script trong sandbox
- Kiểm tra các lỗ hổng đã biết
- Xác thực private registry

## So Sánh Với Package Managers Thực Tế

### npm
- Giải quyết version phức tạp với semver
- Tối ưu hóa package hoisting
- Cơ chế caching mở rộng
- Kiểm tra bảo mật
- Hỗ trợ workspaces

### Yarn
- Cài đặt xác định
- Chế độ offline
- Tải xuống song song
- Chế độ Plug'n'Play
- Zero-installs

### TPM (Triển Khai Này)
- Đơn giản hóa cho mục đích giáo dục
- Giải quyết dependency cơ bản
- Không có tối ưu hóa nâng cao
- Minh họa các khái niệm cốt lõi

## Điểm Mở Rộng

### Cải Tiến Có Thể
1. **Hỗ Trợ Semver**: Giải quyết version range đúng cách
2. **Peer Dependencies**: Xử lý cảnh báo peer dependency
3. **Dev Dependencies**: Tách biệt development dependencies
4. **Scripts**: Hỗ trợ thêm lifecycle scripts
5. **Caching**: Thêm metadata và package caching
6. **Xử Lý Song Song**: Tải xuống và cài đặt đồng thời
7. **Chỉ Báo Tiến Trình**: Hiển thị tiến trình cài đặt
8. **Workspaces**: Hỗ trợ cho monorepos

## Chiến Lược Testing

### Unit Tests
- Test từng module độc lập
- Mock các dependency bên ngoài (registry, file system)
- Test các điều kiện lỗi

### Integration Tests
- Test quy trình cài đặt hoàn chỉnh
- Test với packages thực từ npm registry
- Test chức năng lock file

### Ví Dụ Test Cases
```javascript
// Test dependency resolution
await resolver.resolveDependencies({
  dependencies: { "lodash": "^4.17.21" }
});

// Test package installation
await installer.installPackage("lodash", "4.17.21", metadata);

// Test lock file creation
lockFile.write(dependencyTree, resolvedMetadata);
```

## Kết Luận

Package manager nhỏ này minh họa các khái niệm cốt lõi đằng sau các công cụ như npm và Yarn. Mặc dù được đơn giản hóa, nó bao gồm chức năng thiết yếu:

- Giải quyết dependency và xử lý xung đột
- Tải xuống và giải nén package
- Lock files để cài đặt có thể tái tạo
- Thực thi lifecycle script
- Tạo binary symlink

Kiến trúc modular giúp dễ hiểu trách nhiệm của từng thành phần và cách chúng làm việc cùng nhau để cung cấp một giải pháp quản lý package hoàn chỉnh.
