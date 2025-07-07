const fs = require('fs');
const path = require('path');

/**
 * Manages lock file for reproducible installs
 */
class LockFile {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.lockFilePath = path.join(projectRoot, 'tpm-lock.json');
  }

  /**
   * Read the lock file
   * @returns {Object|null} Lock file content or null if doesn't exist
   */
  read() {
    try {
      if (!fs.existsSync(this.lockFilePath)) {
        return null;
      }
      
      const content = fs.readFileSync(this.lockFilePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`Failed to read lock file: ${error.message}`);
      return null;
    }
  }

  /**
   * Write the lock file
   * @param {Map} dependencyTree - Resolved dependency tree
   * @param {Map} resolvedMetadata - Resolved package metadata
   * @returns {void}
   */
  write(dependencyTree, resolvedMetadata) {
    const lockData = {
      version: 1,
      lockfileVersion: 1,
      requires: true,
      dependencies: {}
    };

    // Convert dependency tree to lock file format
    for (const [packageName, version] of dependencyTree) {
      const metadata = resolvedMetadata.get(`${packageName}@${version}`);
      if (!metadata) continue;

      const versionMetadata = metadata.versions[version];
      if (!versionMetadata) continue;

      lockData.dependencies[packageName] = {
        version: version,
        resolved: versionMetadata.dist.tarball,
        integrity: versionMetadata.dist.integrity || versionMetadata.dist.shasum,
        requires: versionMetadata.dependencies || {}
      };
    }

    try {
      fs.writeFileSync(this.lockFilePath, JSON.stringify(lockData, null, 2));
      console.log('Lock file updated');
    } catch (error) {
      console.error(`Failed to write lock file: ${error.message}`);
    }
  }

  /**
   * Check if the lock file is valid for the current package.json
   * @param {Object} packageJson - Current package.json content
   * @returns {boolean} True if lock file is valid
   */
  isValid(packageJson) {
    const lockData = this.read();
    if (!lockData) return false;

    const dependencies = packageJson.dependencies || {};
    
    // Check if all dependencies from package.json are in lock file
    for (const packageName of Object.keys(dependencies)) {
      if (!lockData.dependencies[packageName]) {
        return false;
      }
    }

    // Check if lock file has extra dependencies not in package.json
    for (const packageName of Object.keys(lockData.dependencies)) {
      if (!dependencies[packageName]) {
        // This could be a transitive dependency, which is okay
        continue;
      }
    }

    return true;
  }

  /**
   * Get dependency tree from lock file
   * @returns {Map|null} Dependency tree or null if lock file doesn't exist
   */
  getDependencyTree() {
    const lockData = this.read();
    if (!lockData) return null;

    const dependencyTree = new Map();
    
    for (const [packageName, packageData] of Object.entries(lockData.dependencies)) {
      dependencyTree.set(packageName, packageData.version);
    }

    return dependencyTree;
  }

  /**
   * Check if lock file exists
   * @returns {boolean} True if lock file exists
   */
  exists() {
    return fs.existsSync(this.lockFilePath);
  }

  /**
   * Delete the lock file
   * @returns {void}
   */
  delete() {
    if (fs.existsSync(this.lockFilePath)) {
      fs.unlinkSync(this.lockFilePath);
    }
  }
}

module.exports = LockFile;
