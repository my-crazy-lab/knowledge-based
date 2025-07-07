# Tiny Package Manager (TPM)

> A very simple demo and guide for explaining how package managers work.

## Introduction

As a JavaScript developer, you may use package managers like [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) frequently.

However, do you know how a package manager works? Or, you may be curious about how to build a package manager.

Well, the purpose of this guide is not to let you re-invent a new wheel. There is no need to do that because both npm and Yarn are mature and stable enough. The purpose is just to explain how a package manager works under the hood. You can read the code, and the comments will explain how it works.

Note: To simplify the guide and make it as simple as possible, this demo doesn't handle some edge cases and catch errors and exceptions. If you are really curious about that, it's recommended to read the source code of [npm](https://github.com/npm/npm) or [Yarn](https://github.com/yarnpkg/yarn).

## Features

- [x] Download packages to `node_modules` directory.
- [x] Simple CLI.
- [x] Simply resolve dependency conflicts.
- [x] Flatten dependencies tree.
- [x] Support lock file. (Like `yarn.lock` or `package-lock.json`)
- [x] Add a new package through CLI. (Like `yarn add` or `npm i <package>` command)
- [x] Run lifecycle scripts. (`preinstall` and `postinstall`)
- [x] Symlink the `bin` files.

## Installation

1. Clone or download this repository
2. Navigate to the `1k` directory
3. Install dependencies: `npm install`
4. Make the CLI executable: `chmod +x bin/tpm.js`

## Usage

### Install Dependencies

To install all dependencies from `package.json`:

```bash
node bin/tpm.js install
```

### Add a New Package

To add a new package to your project:

```bash
node bin/tpm.js add lodash
node bin/tpm.js add lodash@4.17.21
```

### Example

There's an example project in the `example/` directory. To test the package manager:

```bash
cd example
node ../bin/tpm.js install
node index.js
```

## Architecture

The tiny package manager consists of several modules:

### Core Components

1. **PackageManager** (`src/PackageManager.js`) - Main orchestrator class
2. **RegistryClient** (`src/RegistryClient.js`) - Handles communication with npm registry
3. **DependencyResolver** (`src/DependencyResolver.js`) - Resolves dependency tree and conflicts
4. **PackageInstaller** (`src/PackageInstaller.js`) - Downloads and extracts packages
5. **LockFile** (`src/LockFile.js`) - Manages lock file for reproducible installs
6. **LifecycleRunner** (`src/LifecycleRunner.js`) - Runs preinstall/postinstall scripts
7. **BinLinker** (`src/BinLinker.js`) - Creates symlinks for executable files

### How It Works

1. **Dependency Resolution**: Reads `package.json` and recursively resolves all dependencies
2. **Conflict Resolution**: Uses a simple "first wins" strategy for version conflicts
3. **Flattening**: All dependencies are installed at the top level of `node_modules`
4. **Lock File**: Creates `tpm-lock.json` to ensure reproducible installs
5. **Package Installation**: Downloads tarballs from npm registry and extracts them
6. **Lifecycle Scripts**: Runs `preinstall` and `postinstall` scripts
7. **Binary Linking**: Creates symlinks in `node_modules/.bin` for executable files

## File Structure

```
1k/
├── package.json          # Package configuration
├── index.js             # Main entry point
├── bin/
│   └── tpm.js          # CLI executable
├── src/
│   ├── PackageManager.js    # Main orchestrator
│   ├── RegistryClient.js    # npm registry client
│   ├── DependencyResolver.js # Dependency resolution
│   ├── PackageInstaller.js  # Package installation
│   ├── LockFile.js         # Lock file management
│   ├── LifecycleRunner.js  # Script execution
│   └── BinLinker.js        # Binary symlinks
└── example/
    ├── package.json     # Example project
    └── index.js        # Example code
```

## Limitations

This is a simplified implementation for educational purposes. It doesn't handle:

- Complex version range resolution (uses latest for all ranges)
- Peer dependencies
- Optional dependencies
- Package hoisting optimization
- Security vulnerabilities
- Network retries and error handling
- Package integrity verification
- Workspaces/monorepos
- Private registries with authentication

## License

MIT
