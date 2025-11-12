import { Turn } from "src/entities/types/firebaseTypes";
import { db } from "../config/firebase.config";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getBookedTurnsForTomorrow = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedTomorrow = formatDate(tomorrow);
  const turnsCollection = db.collection("turns");

  const snapshot = await turnsCollection
    .where("date", "==", formattedTomorrow)
    .get();

  if (snapshot.empty) {
    console.log("No hay turnos para mañana.");
    return [];
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Turn[];
};
