import { Turn } from "src/entities/types/firebaseTypes";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase.config";

const turnsCollection = db.collection("turns");

export class TurnRepository {
  async getTurns(userId: string): Promise<Turn[]> {
    const snapshot = await turnsCollection.where("userId", "==", userId).get();

    return snapshot.docs.map(
      (doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Turn[];
  }

  async createTurn(turn: Turn): Promise<string> {
    const { date, id, ...rest } = turn;

    const turnRef = await turnsCollection.add({
      date: new Date(date).toISOString().split("T")[0],
      createdAt: new Date(),
      id: uuidv4(),
      ...rest,
    });

    return turnRef.id;
  }

  async updateTurn(id: string, turnData: Partial<Turn>): Promise<void> {
    const turnRef = turnsCollection.doc(id);
    const turnDoc = await turnRef.get();

    if (!turnDoc.exists) {
      throw new Error("Turn does not exist");
    }

    await turnRef.update({ ...turnData, updatedAt: new Date() });
  }
}

export const turnRepository = new TurnRepository();
