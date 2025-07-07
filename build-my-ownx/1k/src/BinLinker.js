const fs = require('fs');
const path = require('path');

/**
 * Creates symlinks for executable files in package bin directories
 */
class BinLinker {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.nodeModulesPath = path.join(projectRoot, 'node_modules');
    this.binPath = path.join(this.nodeModulesPath, '.bin');
  }

  /**
   * Create symlinks for all binary files in installed packages
   * @param {Map} dependencyTree - Installed packages
   * @param {Map} resolvedMetadata - Package metadata
   * @returns {Promise<void>}
   */
  async linkBinaries(dependencyTree, resolvedMetadata) {
    // Create .bin directory if it doesn't exist
    if (!fs.existsSync(this.binPath)) {
      fs.mkdirSync(this.binPath, { recursive: true });
    }

    for (const [packageName, version] of dependencyTree) {
      await this.linkPackageBinaries(packageName, version, resolvedMetadata);
    }
  }

  /**
   * Create symlinks for a specific package's binaries
   * @param {string} packageName - Name of the package
   * @param {string} version - Version of the package
   * @param {Map} resolvedMetadata - Package metadata
   * @returns {Promise<void>}
   */
  async linkPackageBinaries(packageName, version, resolvedMetadata) {
    const packagePath = path.join(this.nodeModulesPath, packageName);
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const bin = packageJson.bin;

      if (!bin) {
        return; // No binaries to link
      }

      if (typeof bin === 'string') {
        // Single binary with package name
        await this.createSymlink(packageName, bin, packagePath);
      } else if (typeof bin === 'object') {
        // Multiple binaries
        for (const [binName, binPath] of Object.entries(bin)) {
          await this.createSymlink(binName, binPath, packagePath);
        }
      }
    } catch (error) {
      console.warn(`Failed to link binaries for ${packageName}: ${error.message}`);
    }
  }

  /**
   * Create a symlink for a binary file
   * @param {string} binName - Name of the binary
   * @param {string} binPath - Relative path to the binary within the package
   * @param {string} packagePath - Absolute path to the package
   * @returns {Promise<void>}
   */
  async createSymlink(binName, binPath, packagePath) {
    const sourcePath = path.join(packagePath, binPath);
    const targetPath = path.join(this.binPath, binName);

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.warn(`Binary file not found: ${sourcePath}`);
      return;
    }

    try {
      // Remove existing symlink if it exists
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }

      // Make source file executable
      fs.chmodSync(sourcePath, '755');

      // Create symlink
      if (process.platform === 'win32') {
        // On Windows, create a batch file instead of symlink
        await this.createWindowsBatch(binName, sourcePath);
      } else {
        // On Unix-like systems, create a symlink
        fs.symlinkSync(sourcePath, targetPath);
      }

      console.log(`Created symlink: ${binName} -> ${sourcePath}`);
    } catch (error) {
      console.warn(`Failed to create symlink for ${binName}: ${error.message}`);
    }
  }

  /**
   * Create a Windows batch file (alternative to symlinks on Windows)
   * @param {string} binName - Name of the binary
   * @param {string} sourcePath - Path to the source binary
   * @returns {Promise<void>}
   */
  async createWindowsBatch(binName, sourcePath) {
    const batchPath = path.join(this.binPath, `${binName}.cmd`);
    const batchContent = `@echo off\nnode "${sourcePath}" %*\n`;

    try {
      fs.writeFileSync(batchPath, batchContent);
      console.log(`Created batch file: ${batchPath}`);
    } catch (error) {
      throw new Error(`Failed to create batch file: ${error.message}`);
    }
  }

  /**
   * Remove all symlinks in the .bin directory
   * @returns {void}
   */
  cleanBinDirectory() {
    if (!fs.existsSync(this.binPath)) {
      return;
    }

    try {
      const files = fs.readdirSync(this.binPath);
      for (const file of files) {
        const filePath = path.join(this.binPath, file);
        fs.unlinkSync(filePath);
      }
      console.log('Cleaned .bin directory');
    } catch (error) {
      console.warn(`Failed to clean .bin directory: ${error.message}`);
    }
  }

  /**
   * Check if a binary is available
   * @param {string} binName - Name of the binary
   * @returns {boolean} True if binary is available
   */
  isBinaryAvailable(binName) {
    const binPath = path.join(this.binPath, binName);
    const batchPath = path.join(this.binPath, `${binName}.cmd`);
    
    return fs.existsSync(binPath) || fs.existsSync(batchPath);
  }
}

module.exports = BinLinker;
