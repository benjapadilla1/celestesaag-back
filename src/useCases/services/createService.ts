import { Service } from "src/entities/types/firebaseTypes";
import { ServiceRepository } from "../../repositories/serviceRepository";

export const createServiceUseCase = async (
  serviceData: Service,
  repository: ServiceRepository
): Promise<string> => {
  if (!serviceData.price || !serviceData.name) {
    throw new Error("All fields are required.");
  }

  return await repository.createService(serviceData);
};
