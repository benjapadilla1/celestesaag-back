"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseInitialized = exports.getDb = exports.initializeFirebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let db = null;
let firebaseInitialized = false;
exports.firebaseInitialized = firebaseInitialized;
const initializeFirebase = () => {
    if (firebaseInitialized) {
        return { db, initialized: true };
    }
    try {
        if (!process.env.FIREBASE_ADMIN_KEY) {
            console.warn("⚠️ FIREBASE_ADMIN_KEY environment variable is not set");
            return { db: null, initialized: false };
        }
        const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
        if (!firebase_admin_1.default.apps.length) {
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(serviceAccount),
            });
            console.log("✅ Firebase initialized successfully");
        }
        db = firebase_admin_1.default.firestore();
        exports.firebaseInitialized = firebaseInitialized = true;
        return { db, initialized: true };
    }
    catch (error) {
        console.error("❌ Firebase initialization failed:", error);
        console.warn("⚠️ App will continue without Firebase");
        return { db: null, initialized: false };
    }
};
exports.initializeFirebase = initializeFirebase;
// Safe db getter that initializes on first use
const getDb = () => {
    if (!firebaseInitialized) {
        const result = (0, exports.initializeFirebase)();
        return result.db;
    }
    return db;
};
exports.getDb = getDb;
exports.default = firebase_admin_1.default;
