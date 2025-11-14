import admin from "firebase-admin";

let serviceAccount;
let firebaseInitialized = false;

try {
  if (!process.env.FIREBASE_ADMIN_KEY) {
    console.warn("⚠️ FIREBASE_ADMIN_KEY environment variable is not set");
    serviceAccount = null;
  } else {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  }
} catch (error) {
  console.error("❌ Firebase configuration error:", error);
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

const db = firebaseInitialized
  ? admin.firestore()
  : ({
      collection: () => {
        throw new Error("Firebase not initialized");
      },
    } as any);

export { db, firebaseInitialized };
export default admin;
