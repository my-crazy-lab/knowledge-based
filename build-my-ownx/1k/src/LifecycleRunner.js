const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Runs lifecycle scripts (preinstall, postinstall)
 */
class LifecycleRunner {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.packageJsonPath = path.join(projectRoot, 'package.json');
  }

  /**
   * Run preinstall script if it exists
   * @returns {Promise<void>}
   */
  async runPreinstall() {
    await this.runScript('preinstall');
  }

  /**
   * Run postinstall script if it exists
   * @returns {Promise<void>}
   */
  async runPostinstall() {
    await this.runScript('postinstall');
  }

  /**
   * Run a specific script from package.json
   * @param {string} scriptName - Name of the script to run
   * @returns {Promise<void>}
   */
  async runScript(scriptName) {
    try {
      const packageJson = this.readPackageJson();
      const scripts = packageJson.scripts || {};
      
      if (!scripts[scriptName]) {
        // No script to run, which is fine
        return;
      }

      console.log(`Running ${scriptName} script: ${scripts[scriptName]}`);
      
      await this.executeCommand(scripts[scriptName]);
      
      console.log(`${scriptName} script completed successfully`);
    } catch (error) {
      console.error(`Failed to run ${scriptName} script: ${error.message}`);
      // Don't throw error for lifecycle scripts to avoid breaking installation
    }
  }

  /**
   * Execute a shell command
   * @param {string} command - Command to execute
   * @returns {Promise<void>}
   */
  executeCommand(command) {
    return new Promise((resolve, reject) => {
      // Parse command and arguments
      const parts = command.split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);

      const child = spawn(cmd, args, {
        cwd: this.projectRoot,
        stdio: 'inherit',
        shell: true
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command exited with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to execute command: ${error.message}`));
      });
    });
  }

  /**
   * Run lifecycle scripts for installed packages
   * @param {Map} dependencyTree - Installed packages
   * @returns {Promise<void>}
   */
  async runPackageLifecycleScripts(dependencyTree) {
    const nodeModulesPath = path.join(this.projectRoot, 'node_modules');
    
    for (const [packageName] of dependencyTree) {
      const packagePath = path.join(nodeModulesPath, packageName);
      const packageJsonPath = path.join(packagePath, 'package.json');
      
      if (!fs.existsSync(packageJsonPath)) {
        continue;
      }

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const scripts = packageJson.scripts || {};
        
        // Run postinstall script for the package
        if (scripts.postinstall) {
          console.log(`Running postinstall for ${packageName}...`);
          
          const child = spawn('npm', ['run', 'postinstall'], {
            cwd: packagePath,
            stdio: 'inherit',
            shell: true
          });

          await new Promise((resolve, reject) => {
            child.on('close', (code) => {
              if (code === 0) {
                resolve();
              } else {
                console.warn(`Postinstall script for ${packageName} failed with code ${code}`);
                resolve(); // Don't fail the entire installation
              }
            });

            child.on('error', (error) => {
              console.warn(`Failed to run postinstall for ${packageName}: ${error.message}`);
              resolve(); // Don't fail the entire installation
            });
          });
        }
      } catch (error) {
        console.warn(`Failed to read package.json for ${packageName}: ${error.message}`);
      }
    }
  }

  /**
   * Read package.json file
   * @returns {Object} Package.json content
   */
  readPackageJson() {
    try {
      if (!fs.existsSync(this.packageJsonPath)) {
        return {};
      }
      
      const content = fs.readFileSync(this.packageJsonPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`Failed to read package.json: ${error.message}`);
      return {};
    }
  }
}

module.exports = LifecycleRunner;
