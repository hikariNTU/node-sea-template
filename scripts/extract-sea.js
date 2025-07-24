const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const imageName = process.argv[2];
const platform = process.argv[3];

if (!imageName || !platform) {
  console.error("Usage: node scripts/extract-sea.js <image-name> <platform>");
  process.exit(1);
}

const executableName = `app-${platform}`;
const distDir = path.join(__dirname, "..", "dist");
const outputPath = path.join(distDir, executableName);

console.log(`Extracting executable for ${platform} from ${imageName}...`);

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a temporary container
const containerId = execSync(`docker create ${imageName}`).toString().trim();

try {
  // Copy the executable from the container
  // The executable is at /app/dist/app in the final image stage
  execSync(`docker cp ${containerId}:/app/dist/app "${outputPath}"`);
} finally {
  // Remove the temporary container
  execSync(`docker rm ${containerId}`);
}

console.log(
  `Executable extracted to ${path.relative(process.cwd(), outputPath)}`
);
