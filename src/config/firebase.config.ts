import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string);

if (!serviceAccount) {
  throw new Error(
    "⚠️ No se encontró la clave FIREBASE_ADMIN_KEY en las variables de entorno."
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
export default admin;
