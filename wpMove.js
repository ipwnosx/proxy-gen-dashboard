/**
 * This script moves the angular dist files to the path you specify
 */

const fs = require('fs-extra');

const distDir = './dist/proxyGenDashboard';

// The pnp wordpress plugin
// picks up the files from your theme directory in the pnp/app directory if it exists.
// So that's likely where you would want to set this directory to. This script is 
// run after production build. This dir is set via argument in package.json script.
const destinationDir = process.argv[2];

// empty out dir
fs.emptyDirSync(destinationDir);

fs.copySync(distDir, destinationDir, {overwrite: true});

console.log('Moved prod build to destination dir!');