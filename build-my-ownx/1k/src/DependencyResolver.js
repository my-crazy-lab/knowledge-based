const RegistryClient = require('./RegistryClient');

/**
 * Resolves dependencies and creates a flattened dependency tree
 */
class DependencyResolver {
  constructor() {
    this.registryClient = new RegistryClient();
    this.resolved = new Map(); // packageName@version -> metadata
    this.dependencyTree = new Map(); // packageName -> version
  }

  /**
   * Resolve all dependencies for a package.json
   * @param {Object} packageJson - The package.json content
   * @returns {Promise<Map>} Resolved dependency tree
   */
  async resolveDependencies(packageJson) {
    const dependencies = packageJson.dependencies || {};
    
    // Reset state
    this.resolved.clear();
    this.dependencyTree.clear();
    
    // Resolve each dependency
    for (const [packageName, versionRange] of Object.entries(dependencies)) {
      await this.resolveDependency(packageName, versionRange);
    }
    
    return this.dependencyTree;
  }

  /**
   * Resolve a single dependency and its transitive dependencies
   * @param {string} packageName - Name of the package
   * @param {string} versionRange - Version range
   * @param {Set} visited - Set of visited packages to prevent cycles
   * @returns {Promise<void>}
   */
  async resolveDependency(packageName, versionRange, visited = new Set()) {
    // Prevent infinite loops
    const key = `${packageName}@${versionRange}`;
    if (visited.has(key)) {
      return;
    }
    visited.add(key);

    // Check if we already resolved this package
    if (this.dependencyTree.has(packageName)) {
      // Simple conflict resolution: use the first version we encounter
      // In a real implementation, you'd use semver to find compatible versions
      return;
    }

    try {
      // Fetch package metadata
      const metadata = await this.registryClient.getPackageMetadata(packageName);
      const version = this.registryClient.getBestVersion(metadata, versionRange);
      
      // Store the resolved version
      this.dependencyTree.set(packageName, version);
      this.resolved.set(`${packageName}@${version}`, metadata);
      
      // Get the specific version metadata
      const versionMetadata = metadata.versions[version];
      if (!versionMetadata) {
        throw new Error(`Version ${version} not found for package ${packageName}`);
      }
      
      // Resolve transitive dependencies
      const transitiveDeps = versionMetadata.dependencies || {};
      for (const [depName, depRange] of Object.entries(transitiveDeps)) {
        await this.resolveDependency(depName, depRange, new Set(visited));
      }
      
    } catch (error) {
      console.error(`Failed to resolve dependency ${packageName}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get the resolved metadata for a package
   * @param {string} packageName - Name of the package
   * @returns {Object|null} Package metadata
   */
  getResolvedMetadata(packageName) {
    const version = this.dependencyTree.get(packageName);
    if (!version) return null;
    
    return this.resolved.get(`${packageName}@${version}`);
  }

  /**
   * Get the dependency tree as a plain object
   * @returns {Object} Dependency tree
   */
  getDependencyTree() {
    return Object.fromEntries(this.dependencyTree);
  }
}

module.exports = DependencyResolver;
