const fs = require('fs');
const path = require('path');
const tar = require('tar');
const RegistryClient = require('./RegistryClient');

/**
 * Handles downloading and extracting packages
 */
class PackageInstaller {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.nodeModulesPath = path.join(projectRoot, 'node_modules');
    this.registryClient = new RegistryClient();
  }

  /**
   * Install a package to node_modules
   * @param {string} packageName - Name of the package
   * @param {string} version - Version to install
   * @param {Object} metadata - Package metadata from registry
   * @returns {Promise<void>}
   */
  async installPackage(packageName, version, metadata) {
    const versionMetadata = metadata.versions[version];
    if (!versionMetadata) {
      throw new Error(`Version ${version} not found for package ${packageName}`);
    }

    const packageDir = path.join(this.nodeModulesPath, packageName);
    
    // Create node_modules directory if it doesn't exist
    if (!fs.existsSync(this.nodeModulesPath)) {
      fs.mkdirSync(this.nodeModulesPath, { recursive: true });
    }

    // Skip if package is already installed
    if (fs.existsSync(packageDir)) {
      console.log(`Package ${packageName}@${version} already installed`);
      return;
    }

    console.log(`Installing ${packageName}@${version}...`);

    // Download tarball
    const tarballUrl = versionMetadata.dist.tarball;
    const tempTarball = path.join(this.nodeModulesPath, `${packageName}-${version}.tgz`);
    
    try {
      await this.registryClient.downloadTarball(tarballUrl, tempTarball);
      
      // Extract tarball
      await this.extractPackage(tempTarball, packageDir);
      
      // Clean up tarball
      fs.unlinkSync(tempTarball);
      
      console.log(`Successfully installed ${packageName}@${version}`);
    } catch (error) {
      // Clean up on error
      if (fs.existsSync(tempTarball)) {
        fs.unlinkSync(tempTarball);
      }
      if (fs.existsSync(packageDir)) {
        fs.rmSync(packageDir, { recursive: true, force: true });
      }
      throw error;
    }
  }

  /**
   * Extract a package tarball to the specified directory
   * @param {string} tarballPath - Path to the tarball
   * @param {string} extractPath - Where to extract the package
   * @returns {Promise<void>}
   */
  async extractPackage(tarballPath, extractPath) {
    return new Promise((resolve, reject) => {
      // Create extraction directory
      if (!fs.existsSync(extractPath)) {
        fs.mkdirSync(extractPath, { recursive: true });
      }

      // Extract tarball
      tar.extract({
        file: tarballPath,
        cwd: extractPath,
        strip: 1 // Remove the top-level 'package' directory
      })
      .then(() => resolve())
      .catch((error) => reject(new Error(`Failed to extract package: ${error.message}`)));
    });
  }

  /**
   * Install multiple packages
   * @param {Map} dependencyTree - Map of package names to versions
   * @param {Map} resolvedMetadata - Map of resolved package metadata
   * @returns {Promise<void>}
   */
  async installPackages(dependencyTree, resolvedMetadata) {
    for (const [packageName, version] of dependencyTree) {
      const metadata = resolvedMetadata.get(`${packageName}@${version}`);
      if (!metadata) {
        throw new Error(`No metadata found for ${packageName}@${version}`);
      }
      
      await this.installPackage(packageName, version, metadata);
    }
  }

  /**
   * Check if a package is already installed
   * @param {string} packageName - Name of the package
   * @returns {boolean} True if package is installed
   */
  isPackageInstalled(packageName) {
    const packageDir = path.join(this.nodeModulesPath, packageName);
    return fs.existsSync(packageDir);
  }
}

module.exports = PackageInstaller;
