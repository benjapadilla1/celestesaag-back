import { ServiceRepository } from "../../repositories/serviceRepository";

export const deleteServiceUseCase = async (id: string, repository: ServiceRepository) => {
  return await repository.deleteService(id);
};
