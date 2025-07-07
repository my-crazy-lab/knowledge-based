#!/usr/bin/env node

/**
 * CLI entry point for Tiny Package Manager
 */

const PackageManager = require('../src/PackageManager');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const pm = new PackageManager(process.cwd());
  
  try {
    switch (command) {
      case 'install':
        console.log('Installing dependencies...');
        await pm.install();
        console.log('Installation complete!');
        break;
        
      case 'add':
        if (!args[1]) {
          console.error('Usage: tpm add <package-name>');
          process.exit(1);
        }
        console.log(`Adding package: ${args[1]}`);
        await pm.add(args[1]);
        console.log('Package added successfully!');
        break;
        
      default:
        console.log('Tiny Package Manager (TPM)');
        console.log('Usage:');
        console.log('  tpm install    - Install dependencies from package.json');
        console.log('  tpm add <pkg>  - Add a new package');
        break;
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
