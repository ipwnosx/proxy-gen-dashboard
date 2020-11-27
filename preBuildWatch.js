const fs = require('fs-extra');

// change this to directory you are outputting build to
const pluginAppDir = process.argv[2];

// empty out dir
fs.emptyDirSync(pluginAppDir);