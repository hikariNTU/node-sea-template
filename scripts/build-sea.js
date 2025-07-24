const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "..", "dist");
const executableName = "app";
const nodeVersion = process.version;
console.log(`Node.js version: ${nodeVersion}`);
console.log(`Output directory: ${outputDir}`);
console.log(`Executable name: ${executableName}`);
console.log(`Platform: ${process.platform} (${process.arch})`);

// 1. Create the blob
const seaConfigPath = path.join(__dirname, "..", "sea-config.json");
console.log(`Creating SEA blob using config at ${seaConfigPath}`);
execSync(`node --experimental-sea-config ${seaConfigPath}`);

// 2. Copy the node executable
const nodePath = process.execPath;
const executablePath = path.join(outputDir, executableName);
fs.copyFileSync(nodePath, executablePath);
if (process.platform === "darwin") {
  console.log(`[Darwin Detected] Removing signature from ${executablePath}`);
  execSync(`codesign --remove-signature ${executablePath}`);
}
fs.chmodSync(executablePath, 0o755);
// 3. Inject the blob
let postjectCommand = `npx postject ${executablePath} NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`;
if (process.platform === "darwin") {
  console.log(
    `[Darwin Detected] Using postject with --macho-segment-name NODE_SEA`
  );
  postjectCommand += " --macho-segment-name NODE_SEA";
}
execSync(postjectCommand, { cwd: outputDir });

// 4. Sign the executable on macOS
if (process.platform === "darwin") {
  console.log(
    `[Darwin Detected] Signing the SEA executable at ${executablePath}`
  );
  execSync(`codesign --sign - ${executablePath}`);
}

console.log(`SEA created at ${executablePath}`);
