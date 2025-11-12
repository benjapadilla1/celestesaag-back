import { Service } from "src/entities/types/firebaseTypes";
import { ServiceRepository } from "../../repositories/serviceRepository";

export const updateServiceUseCase = async (
  id: string,
  serviceData: Partial<Service>,
  repository: ServiceRepository
) => {
  return await repository.updateService(id, serviceData);
};
