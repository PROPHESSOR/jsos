var fs = require('fs');
var path = require('path');
var os = require('os');
var package = require('../package.json');
var releaseId = package.kernelVersion;

console.log('### version "' + package.version + '" (release #' + releaseId.toString(16) + ')');

// Write kernel version
var configKernel = path.join(__dirname, '../src/kernel/version-autogenerated.h');
try {
  fs.writeFileSync(configKernel, String(releaseId) + os.EOL);
} catch (e) {
  // Ignore this when running on installed package that contains js code only
}

// Write runtimecorelib.json
var configCorelib = path.join(__dirname, '../runtimecorelib.json');
var corelib = {
  kernelVersion: releaseId
};
fs.writeFileSync(configCorelib, JSON.stringify(corelib, null, 2) + os.EOL);
