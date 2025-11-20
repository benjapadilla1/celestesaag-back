import admin from "firebase-admin";

let serviceAccount;
let firebaseInitialized = false;

try {
  if (!process.env.FIREBASE_ADMIN_KEY) {
    console.warn("⚠️ FIREBASE_ADMIN_KEY environment variable is not set");
    serviceAccount = null;
  } else {
    console.log("📝 Parsing FIREBASE_ADMIN_KEY...");

    // Parse the JSON string from environment variable
    let rawKey = process.env.FIREBASE_ADMIN_KEY;

    // Handle escaped newlines in private_key
    // Railway might escape the JSON, so we need to handle both cases
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

    console.log("✅ FIREBASE_ADMIN_KEY parsed successfully");
    console.log("📋 Project ID:", serviceAccount.project_id);
  }
} catch (error) {
  console.error("❌ Firebase configuration error:", error);
  console.error(
    "Raw key preview:",
    process.env.FIREBASE_ADMIN_KEY?.substring(0, 100) + "..."
  );
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
