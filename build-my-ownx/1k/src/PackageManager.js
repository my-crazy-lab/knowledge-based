const fs = require('fs');
const path = require('path');
const DependencyResolver = require('./DependencyResolver');
const PackageInstaller = require('./PackageInstaller');
const LockFile = require('./LockFile');
const LifecycleRunner = require('./LifecycleRunner');
const BinLinker = require('./BinLinker');

/**
 * Main Package Manager class that orchestrates all operations
 */
class PackageManager {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.packageJsonPath = path.join(projectRoot, 'package.json');
    
    this.dependencyResolver = new DependencyResolver();
    this.packageInstaller = new PackageInstaller(projectRoot);
    this.lockFile = new LockFile(projectRoot);
    this.lifecycleRunner = new LifecycleRunner(projectRoot);
    this.binLinker = new BinLinker(projectRoot);
  }

  /**
   * Install all dependencies from package.json
   * @returns {Promise<void>}
   */
  async install() {
    const packageJson = this.readPackageJson();
    
    console.log('Resolving dependencies...');
    
    // Check if we can use the lock file
    let dependencyTree;
    let resolvedMetadata = new Map();
    
    if (this.lockFile.exists() && this.lockFile.isValid(packageJson)) {
      console.log('Using existing lock file...');
      dependencyTree = this.lockFile.getDependencyTree();
      
      // We still need to get metadata for installation
      for (const [packageName, version] of dependencyTree) {
        try {
          const metadata = await this.dependencyResolver.registryClient.getPackageMetadata(packageName);
          resolvedMetadata.set(`${packageName}@${version}`, metadata);
        } catch (error) {
          console.error(`Failed to get metadata for ${packageName}: ${error.message}`);
        }
      }
    } else {
      console.log('Resolving dependencies from package.json...');
      dependencyTree = await this.dependencyResolver.resolveDependencies(packageJson);
      
      // Get resolved metadata
      for (const [packageName, version] of dependencyTree) {
        const metadata = this.dependencyResolver.getResolvedMetadata(packageName);
        if (metadata) {
          resolvedMetadata.set(`${packageName}@${version}`, metadata);
        }
      }
      
      // Update lock file
      this.lockFile.write(dependencyTree, resolvedMetadata);
    }

    // Run preinstall scripts
    await this.lifecycleRunner.runPreinstall();

    // Install packages
    console.log('Installing packages...');
    await this.packageInstaller.installPackages(dependencyTree, resolvedMetadata);

    // Create bin symlinks
    console.log('Creating bin symlinks...');
    await this.binLinker.linkBinaries(dependencyTree, resolvedMetadata);

    // Run postinstall scripts
    await this.lifecycleRunner.runPostinstall();
  }

  /**
   * Add a new package to dependencies
   * @param {string} packageSpec - Package specification (e.g., "lodash" or "lodash@4.17.21")
   * @returns {Promise<void>}
   */
  async add(packageSpec) {
    const [packageName, versionRange] = packageSpec.includes('@') && !packageSpec.startsWith('@')
      ? packageSpec.split('@')
      : [packageSpec, 'latest'];

    console.log(`Adding ${packageName}@${versionRange}...`);

    // Get package metadata to validate it exists
    const metadata = await this.dependencyResolver.registryClient.getPackageMetadata(packageName);
    const version = this.dependencyResolver.registryClient.getBestVersion(metadata, versionRange);

    // Update package.json
    const packageJson = this.readPackageJson();
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
    
    packageJson.dependencies[packageName] = versionRange === 'latest' ? `^${version}` : versionRange;
    this.writePackageJson(packageJson);

    console.log(`Added ${packageName}@${version} to package.json`);

    // Install the new package and its dependencies
    await this.install();
  }

  /**
   * Read package.json file
   * @returns {Object} Package.json content
   */
  readPackageJson() {
    try {
      if (!fs.existsSync(this.packageJsonPath)) {
        throw new Error('package.json not found');
      }
      
      const content = fs.readFileSync(this.packageJsonPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read package.json: ${error.message}`);
    }
  }

  /**
   * Write package.json file
   * @param {Object} packageJson - Package.json content
   * @returns {void}
   */
  writePackageJson(packageJson) {
    try {
      fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2));
    } catch (error) {
      throw new Error(`Failed to write package.json: ${error.message}`);
    }
  }
}

module.exports = PackageManager;
