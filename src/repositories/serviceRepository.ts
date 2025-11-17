import { Service } from "src/entities/types/firebaseTypes";
import { db, firebaseInitialized } from "../config/firebase.config";

const servicesCollection = db.collection("services");

export class ServiceRepository {
  async getAllServices(): Promise<Service[]> {
    if (!firebaseInitialized) {
      console.warn("⚠️ Firebase not initialized, returning empty array");
      return [];
    }

    try {
      const snapshot = await servicesCollection.get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
    } catch (error) {
      console.error("❌ Error getting all services:", error);
      throw error;
    }
  }

  async getServiceById(id: string): Promise<Service | null> {
    if (!firebaseInitialized) {
      console.warn("⚠️ Firebase not initialized");
      return null;
    }

    try {
      const doc = await servicesCollection.doc(id).get();
      return doc.exists ? ({ id: doc.id, ...doc.data() } as Service) : null;
    } catch (error) {
      console.error(`❌ Error getting service ${id}:`, error);
      throw error;
    }
  }

  async createService(service: Service): Promise<string> {
    if (!firebaseInitialized) {
      throw new Error("Firebase not initialized - cannot create service");
    }

    try {
      const serviceRef = await servicesCollection.add({
        ...service,
        createdAt: new Date(),
      });
      return serviceRef.id;
    } catch (error) {
      console.error("❌ Error creating service:", error);
      throw error;
    }
  }

  async updateService(
    id: string,
    serviceData: Partial<Service>
  ): Promise<void> {
    if (!firebaseInitialized) {
      throw new Error("Firebase not initialized - cannot update service");
    }

    try {
      const serviceRef = servicesCollection.doc(id);
      const serviceDoc = await serviceRef.get();

      if (!serviceDoc.exists) {
        throw new Error("Service does not exist");
      }

      await serviceRef.update({ ...serviceData, updatedAt: new Date() });
    } catch (error) {
      console.error(`❌ Error updating service ${id}:`, error);
      throw error;
    }
  }

  async deleteService(id: string): Promise<void> {
    if (!firebaseInitialized) {
      throw new Error("Firebase not initialized - cannot delete service");
    }

    try {
      const serviceRef = servicesCollection.doc(id);
      const serviceDoc = await serviceRef.get();

      if (!serviceDoc.exists) {
        throw new Error("Service does not exist");
      }

      await serviceRef.delete();
    } catch (error) {
      console.error(`❌ Error deleting service ${id}:`, error);
      throw error;
    }
  }
}

export const serviceRepository = new ServiceRepository();
