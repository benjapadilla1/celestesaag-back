#!/usr/bin/env node

/**
 * This script helps convert firebase-admin-key.json to a Railway-compatible environment variable
 *
 * Usage:
 *   node scripts/generate-env-variable.js
 *
 * This will output the JSON as a single-line string that you can copy directly into Railway
 */

const fs = require("fs");
const path = require("path");

const keyPath = path.join(__dirname, "..", "firebase-admin-key.json");

try {
  // Read the JSON file
  const keyContent = fs.readFileSync(keyPath, "utf8");

  // Parse it to validate
  const keyObject = JSON.parse(keyContent);

  // Convert back to single-line JSON string
  const singleLineJson = JSON.stringify(keyObject);

  console.log("\n=".repeat(80));
  console.log("📋 FIREBASE_ADMIN_KEY Environment Variable");
  console.log("=".repeat(80));
  console.log(
    "\nCopy the following value into Railway as FIREBASE_ADMIN_KEY:\n"
  );
  console.log(singleLineJson);
  console.log("\n" + "=".repeat(80));
  console.log("\n✅ Instructions:");
  console.log("1. Go to Railway Dashboard → Your Backend Service → Variables");
  console.log('2. Click "New Variable"');
  console.log("3. Name: FIREBASE_ADMIN_KEY");
  console.log("4. Value: Paste the JSON string above");
  console.log('5. Click "Add"');
  console.log("\n⚠️  Important: Paste the ENTIRE string including { and }");
  console.log("=".repeat(80) + "\n");

  // Also save to a file for easier copying
  const outputPath = path.join(__dirname, "..", "firebase-env-variable.txt");
  fs.writeFileSync(outputPath, singleLineJson);
  console.log(`\n📁 Also saved to: ${outputPath}\n`);
} catch (error) {
  console.error("❌ Error:", error.message);
  console.error(
    "\nMake sure firebase-admin-key.json exists in the backend directory"
  );
  process.exit(1);
}
