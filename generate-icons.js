// generate-icons.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const iconDir = path.join(__dirname, "public", "icons");
if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

// Creates a simple colored square as placeholder icon
async function generateIcon(size, filename) {
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 33, g: 150, b: 243, alpha: 1 }, // #2196F3 blue
    },
  })
    .png()
    .toFile(path.join(iconDir, filename));
  console.log(`✅ Created ${filename} (${size}x${size})`);
}

async function main() {
  await generateIcon(192, "icon-192x192.png");
  await generateIcon(512, "icon-512x512.png");
  await generateIcon(144, "icon-144x144.png"); // Required for installability
  console.log("🎉 All icons generated in public/icons/");
}

main().catch(console.error);
const screenshotDir = path.join(__dirname, "public", "screenshots");
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

// Desktop screenshot (1280x720)
await sharp({
  create: {
    width: 1280, height: 720, channels: 4,
    background: { r: 245, g: 245, b: 245, alpha: 1 },
  },
}).png().toFile(path.join(screenshotDir, "desktop.png"));
console.log("✅ Created desktop.png");

// Mobile screenshot (390x844)
await sharp({
  create: {
    width: 390, height: 844, channels: 4,
    background: { r: 245, g: 245, b: 245, alpha: 1 },
  },
}).png().toFile(path.join(screenshotDir, "mobile.png"));
console.log("✅ Created mobile.png");