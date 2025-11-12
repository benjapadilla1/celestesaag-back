import { ServiceRepository } from "../../repositories/serviceRepository";

export const getServicesUseCase = async (serviceRepository: ServiceRepository) => {
  return await serviceRepository.getAllServices();
};
