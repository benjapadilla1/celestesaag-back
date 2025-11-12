import { ServiceRepository } from "../../repositories/serviceRepository";

export const getServiceByIdUseCase = async (id: string, repository: ServiceRepository) => {
  return await repository.getServiceById(id);
};
