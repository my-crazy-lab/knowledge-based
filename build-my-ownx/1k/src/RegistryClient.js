const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Client for interacting with npm registry
 */
class RegistryClient {
  constructor() {
    this.registryUrl = 'https://registry.npmjs.org';
  }

  /**
   * Fetch package metadata from npm registry
   * @param {string} packageName - Name of the package
   * @returns {Promise<Object>} Package metadata
   */
  async getPackageMetadata(packageName) {
    return new Promise((resolve, reject) => {
      const url = `${this.registryUrl}/${packageName}`;
      
      https.get(url, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const metadata = JSON.parse(data);
            resolve(metadata);
          } catch (error) {
            reject(new Error(`Failed to parse package metadata: ${error.message}`));
          }
        });
      }).on('error', (error) => {
        reject(new Error(`Failed to fetch package metadata: ${error.message}`));
      });
    });
  }

  /**
   * Download package tarball
   * @param {string} tarballUrl - URL of the package tarball
   * @param {string} destination - Where to save the tarball
   * @returns {Promise<void>}
   */
  async downloadTarball(tarballUrl, destination) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(destination);
      
      https.get(tarballUrl, (response) => {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
        
        file.on('error', (error) => {
          fs.unlink(destination, () => {}); // Clean up on error
          reject(error);
        });
      }).on('error', (error) => {
        reject(new Error(`Failed to download tarball: ${error.message}`));
      });
    });
  }

  /**
   * Get the best version that satisfies the version range
   * @param {Object} packageMetadata - Package metadata from registry
   * @param {string} versionRange - Version range (e.g., "^1.0.0", "latest")
   * @returns {string} Best matching version
   */
  getBestVersion(packageMetadata, versionRange = 'latest') {
    if (versionRange === 'latest') {
      return packageMetadata['dist-tags'].latest;
    }
    
    // For simplicity, we'll just use the latest version for any range
    // In a real implementation, you'd use semver to resolve ranges
    return packageMetadata['dist-tags'].latest;
  }
}

module.exports = RegistryClient;
