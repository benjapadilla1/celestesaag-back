import { db } from 'src/config/firebase.config';

const availableHoursCollection = db.collection("availableHours");

export const getAvailableHours = async (): Promise<string[]> => {
  const snapshot = await availableHoursCollection.get();
  const availableHours: string[] = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.availableHours) {
      availableHours.push(...data.availableHours);
    }
  });

  return availableHours;
};
