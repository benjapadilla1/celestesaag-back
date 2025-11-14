import admin from "firebase-admin";

let db: any = null;
let firebaseInitialized = false;

export const initializeFirebase = () => {
  if (firebaseInitialized) {
    return { db, initialized: true };
  }

  try {
    if (!process.env.FIREBASE_ADMIN_KEY) {
      console.warn("⚠️ FIREBASE_ADMIN_KEY environment variable is not set");
      return { db: null, initialized: false };
    }

    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("✅ Firebase initialized successfully");
    }

    db = admin.firestore();
    firebaseInitialized = true;
    return { db, initialized: true };
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    console.warn("⚠️ App will continue without Firebase");
    return { db: null, initialized: false };
  }
};

// Safe db getter that initializes on first use
export const getDb = () => {
  if (!firebaseInitialized) {
    const result = initializeFirebase();
    return result.db;
  }
  return db;
};

export { firebaseInitialized };
export default admin;
