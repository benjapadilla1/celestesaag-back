import admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

let serviceAccount;
let firebaseInitialized = false;

try {
  // First, try to load from file (for production deployments with uploaded file)
  const filePath = path.join(process.cwd(), "firebase-admin-key.json");

  if (fs.existsSync(filePath)) {
    console.log("📁 Loading Firebase credentials from file...");
    const fileContent = fs.readFileSync(filePath, "utf8");
    serviceAccount = JSON.parse(fileContent);
    console.log("✅ Firebase credentials loaded from file");
    console.log("📋 Project ID:", serviceAccount.project_id);
  }
  // Fallback to environment variable
  else if (process.env.FIREBASE_ADMIN_KEY) {
    console.log("📝 Parsing FIREBASE_ADMIN_KEY from environment...");

    // Parse the JSON string from environment variable
    let rawKey = process.env.FIREBASE_ADMIN_KEY;

    // Handle escaped newlines in private_key
    try {
      serviceAccount = JSON.parse(rawKey);
    } catch (firstError) {
      console.log("⚠️ First parse failed, trying to unescape...");
      // Try unescaping if it's double-escaped
      rawKey = rawKey.replace(/\\n/g, "\n").replace(/\\"/g, '"');
      serviceAccount = JSON.parse(rawKey);
    }

    // Ensure private_key has proper newlines
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(
        /\\n/g,
        "\n"
      );
    }

    console.log("✅ FIREBASE_ADMIN_KEY parsed successfully from environment");
    console.log("📋 Project ID:", serviceAccount.project_id);
  } else {
    console.warn(
      "⚠️ No Firebase credentials found (neither file nor environment variable)"
    );
    serviceAccount = null;
  }
} catch (error) {
  console.error("❌ Firebase configuration error:", error);
  if (process.env.FIREBASE_ADMIN_KEY) {
    console.error(
      "Raw key preview:",
      process.env.FIREBASE_ADMIN_KEY?.substring(0, 100) + "..."
    );
  }
  serviceAccount = null;
}

if (serviceAccount && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase initialized successfully");
    firebaseInitialized = true;
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    console.warn("⚠️ App will continue without Firebase");
  }
} else if (!serviceAccount) {
  console.warn("⚠️ Firebase not initialized - missing configuration");
}

// Create a proper fallback that logs errors but doesn't crash
const db = firebaseInitialized
  ? admin.firestore()
  : ({
      collection: () => {
        console.error("❌ Attempted to use Firebase when not initialized");
        return {
          get: async () => ({ docs: [] }),
          doc: () => ({
            get: async () => ({ exists: false }),
            set: async () =>
              console.warn("⚠️ Firebase write attempted but not initialized"),
            update: async () =>
              console.warn("⚠️ Firebase update attempted but not initialized"),
            delete: async () =>
              console.warn("⚠️ Firebase delete attempted but not initialized"),
          }),
          add: async () => {
            console.warn("⚠️ Firebase add attempted but not initialized");
            return { id: "mock-id" };
          },
        };
      },
    } as any);

export { db, firebaseInitialized };
export default admin;
