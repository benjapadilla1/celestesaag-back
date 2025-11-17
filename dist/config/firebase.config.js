"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseInitialized = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let serviceAccount;
let firebaseInitialized = false;
exports.firebaseInitialized = firebaseInitialized;
try {
    if (!process.env.FIREBASE_ADMIN_KEY) {
        console.warn("⚠️ FIREBASE_ADMIN_KEY environment variable is not set");
        serviceAccount = null;
    }
    else {
        serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
    }
}
catch (error) {
    console.error("❌ Firebase configuration error:", error);
    serviceAccount = null;
}
if (serviceAccount && !firebase_admin_1.default.apps.length) {
    try {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
        });
        console.log("✅ Firebase initialized successfully");
        exports.firebaseInitialized = firebaseInitialized = true;
    }
    catch (error) {
        console.error("❌ Firebase initialization failed:", error);
        console.warn("⚠️ App will continue without Firebase");
    }
}
else if (!serviceAccount) {
    console.warn("⚠️ Firebase not initialized - missing configuration");
}
const db = firebaseInitialized
    ? firebase_admin_1.default.firestore()
    : {
        collection: () => {
            throw new Error("Firebase not initialized");
        },
    };
exports.db = db;
exports.default = firebase_admin_1.default;
