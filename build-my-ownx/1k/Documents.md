# Tiny Package Manager (TPM) - Technical Documentation

## Overview

This document provides a comprehensive technical overview of the Tiny Package Manager (TPM), a simplified implementation of a package manager similar to npm or Yarn. The purpose is educational - to demonstrate how package managers work under the hood.

## Architecture Overview

The TPM follows a modular architecture with clear separation of concerns:

```
┌─────────────────┐
│   CLI (tpm.js)  │
└─────────┬───────┘
          │
┌─────────▼───────┐
│ PackageManager  │ ◄─── Main Orchestrator
└─────────┬───────┘
          │
          ├─── RegistryClient     (npm registry communication)
          ├─── DependencyResolver (dependency tree resolution)
          ├─── PackageInstaller   (download & extract packages)
          ├─── LockFile          (reproducible installs)
          ├─── LifecycleRunner   (pre/post install scripts)
          └─── BinLinker         (executable symlinks)
```

## Core Components

### 1. PackageManager (src/PackageManager.js)

**Purpose**: Main orchestrator that coordinates all package management operations.

**Key Methods**:
- `install()`: Installs all dependencies from package.json
- `add(packageSpec)`: Adds a new package to dependencies
- `readPackageJson()`: Reads and parses package.json
- `writePackageJson()`: Writes updated package.json

**Workflow**:
1. Read package.json
2. Check if lock file exists and is valid
3. Resolve dependencies (from lock file or fresh resolution)
4. Run preinstall scripts
5. Install packages
6. Create binary symlinks
7. Run postinstall scripts

### 2. RegistryClient (src/RegistryClient.js)

**Purpose**: Handles communication with the npm registry.

**Key Methods**:
- `getPackageMetadata(packageName)`: Fetches package metadata from registry
- `downloadTarball(tarballUrl, destination)`: Downloads package tarball
- `getBestVersion(metadata, versionRange)`: Resolves version ranges

**Implementation Details**:
- Uses HTTPS module for registry communication
- Registry URL: `https://registry.npmjs.org`
- Simplified version resolution (uses latest for all ranges)

### 3. DependencyResolver (src/DependencyResolver.js)

**Purpose**: Resolves dependency trees and handles version conflicts.

**Key Methods**:
- `resolveDependencies(packageJson)`: Resolves all dependencies
- `resolveDependency(packageName, versionRange)`: Resolves single dependency
- `getResolvedMetadata(packageName)`: Gets cached metadata

**Algorithm**:
1. Start with direct dependencies from package.json
2. For each dependency, fetch metadata from registry
3. Recursively resolve transitive dependencies
4. Use "first wins" strategy for conflict resolution
5. Build flattened dependency tree

**Conflict Resolution**:
- Simple strategy: first version encountered wins
- Real implementations use semver to find compatible versions
- Prevents infinite loops with visited set

### 4. PackageInstaller (src/PackageInstaller.js)

**Purpose**: Downloads and extracts packages to node_modules.

**Key Methods**:
- `installPackage(packageName, version, metadata)`: Installs single package
- `installPackages(dependencyTree, resolvedMetadata)`: Installs multiple packages
- `extractPackage(tarballPath, extractPath)`: Extracts tarball

**Installation Process**:
1. Create node_modules directory if needed
2. Skip if package already installed
3. Download tarball from registry
4. Extract to package directory (strip top-level 'package' folder)
5. Clean up temporary files

### 5. LockFile (src/LockFile.js)

**Purpose**: Manages lock files for reproducible installs.

**Key Methods**:
- `read()`: Reads existing lock file
- `write(dependencyTree, resolvedMetadata)`: Writes lock file
- `isValid(packageJson)`: Validates lock file against package.json
- `getDependencyTree()`: Extracts dependency tree from lock file

**Lock File Format** (tpm-lock.json):
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

**Purpose**: Executes lifecycle scripts (preinstall, postinstall).

**Key Methods**:
- `runPreinstall()`: Runs preinstall script
- `runPostinstall()`: Runs postinstall script
- `runScript(scriptName)`: Runs specific script
- `executeCommand(command)`: Executes shell command

**Script Execution**:
- Uses child_process.spawn for script execution
- Inherits stdio for real-time output
- Non-blocking: script failures don't break installation
- Supports both project and package-level scripts

### 7. BinLinker (src/BinLinker.js)

**Purpose**: Creates symlinks for executable files.

**Key Methods**:
- `linkBinaries(dependencyTree, resolvedMetadata)`: Links all binaries
- `linkPackageBinaries(packageName, version)`: Links package binaries
- `createSymlink(binName, binPath, packagePath)`: Creates individual symlink

**Binary Linking Process**:
1. Create .bin directory in node_modules
2. For each package, read bin field from package.json
3. Create symlinks from .bin to actual executable files
4. Make files executable (chmod 755)
5. On Windows, create .cmd batch files instead of symlinks

## Data Flow

### Installation Flow

```
package.json → DependencyResolver → Registry API
     ↓                ↓                  ↓
Lock File ←── Dependency Tree ←── Package Metadata
     ↓                ↓                  ↓
Validation → PackageInstaller → Download & Extract
     ↓                ↓                  ↓
Scripts ←─── BinLinker ←────── node_modules
```

### Add Package Flow

```
CLI Command → PackageManager → RegistryClient
     ↓              ↓              ↓
Validate → Update package.json → Install Flow
```

## File System Layout

### Before Installation
```
project/
├── package.json
└── (other project files)
```

### After Installation
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
└── (other project files)
```

## Error Handling

### Registry Errors
- Network failures during metadata fetch
- Package not found (404 errors)
- Invalid JSON responses

### Installation Errors
- Disk space issues
- Permission problems
- Corrupted tarballs

### Script Errors
- Lifecycle script failures (non-blocking)
- Missing script interpreters
- Script timeout issues

## Performance Considerations

### Optimization Strategies
1. **Parallel Downloads**: Could download multiple packages simultaneously
2. **Caching**: Could cache package metadata and tarballs
3. **Incremental Updates**: Only update changed dependencies
4. **Compression**: Use gzip for faster downloads

### Current Limitations
- Sequential package installation
- No metadata caching
- No download resumption
- No integrity verification

## Security Considerations

### Current Implementation
- Downloads from official npm registry only
- No integrity verification
- No signature validation
- Executes lifecycle scripts without sandboxing

### Production Requirements
- Package integrity verification (checksums)
- Signature validation
- Sandboxed script execution
- Audit for known vulnerabilities
- Private registry authentication

## Comparison with Real Package Managers

### npm
- Complex version resolution with semver
- Package hoisting optimization
- Extensive caching mechanisms
- Security auditing
- Workspaces support

### Yarn
- Deterministic installs
- Offline mode
- Parallel downloads
- Plug'n'Play mode
- Zero-installs

### TPM (This Implementation)
- Simplified for educational purposes
- Basic dependency resolution
- No advanced optimizations
- Demonstrates core concepts

## Extension Points

### Possible Enhancements
1. **Semver Support**: Proper version range resolution
2. **Peer Dependencies**: Handle peer dependency warnings
3. **Dev Dependencies**: Separate development dependencies
4. **Scripts**: Support more lifecycle scripts
5. **Caching**: Add metadata and package caching
6. **Parallel Processing**: Concurrent downloads and installs
7. **Progress Indicators**: Show installation progress
8. **Workspaces**: Support for monorepos

## Testing Strategy

### Unit Tests
- Test each module independently
- Mock external dependencies (registry, file system)
- Test error conditions

### Integration Tests
- Test complete installation workflows
- Test with real packages from npm registry
- Test lock file functionality

### Example Test Cases
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

## Conclusion

This tiny package manager demonstrates the core concepts behind tools like npm and Yarn. While simplified, it covers the essential functionality:

- Dependency resolution and conflict handling
- Package downloading and extraction
- Lock files for reproducible installs
- Lifecycle script execution
- Binary symlink creation

The modular architecture makes it easy to understand each component's responsibility and how they work together to provide a complete package management solution.
