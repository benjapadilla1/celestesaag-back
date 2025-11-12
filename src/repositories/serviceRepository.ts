import { Service } from "src/entities/types/firebaseTypes";
import { db } from "../config/firebase.config";

const servicesCollection = db.collection("services");

export class ServiceRepository {
  async getAllServices(): Promise<Service[]> {
    const snapshot = await servicesCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];
  }

  async getServiceById(id: string): Promise<Service | null> {
    const doc = await servicesCollection.doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Service) : null;
  }

  async createService(service: Service): Promise<string> {
    const serviceRef = await servicesCollection.add({
      ...service,
      createdAt: new Date(),
    });
    return serviceRef.id;
  }

  async updateService(
    id: string,
    serviceData: Partial<Service>
  ): Promise<void> {
    const serviceRef = servicesCollection.doc(id);
    const serviceDoc = await serviceRef.get();

    if (!serviceDoc.exists) {
      throw new Error("Service does not exist");
    }

    await serviceRef.update({ ...serviceData, updatedAt: new Date() });
  }

  async deleteService(id: string): Promise<void> {
    const serviceRef = servicesCollection.doc(id);
    const serviceDoc = await serviceRef.get();

    if (!serviceDoc.exists) {
      throw new Error("Service does not exist");
    }

    await serviceRef.delete();
  }
}

export const serviceRepository = new ServiceRepository();
