import { Request, Response } from "express";
import { serviceRepository } from "../repositories/serviceRepository";
import { createServiceUseCase } from "../useCases/services/createService";
import { deleteServiceUseCase } from "../useCases/services/deleteService";
import { getServiceByIdUseCase } from "../useCases/services/getServiceById";
import { getServicesUseCase } from "../useCases/services/getServices";
import { updateServiceUseCase } from "../useCases/services/updateService";

export const getAllServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const services = await getServicesUseCase(serviceRepository);

    res.status(200).json(services);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error getting services", error });

    return;
  }
};

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const service = await getServiceByIdUseCase(
      req.params.id,
      serviceRepository
    );
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }

    res.status(200).json(service);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error getting service", error });
    return;
  }
};

export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceId = await createServiceUseCase(req.body, serviceRepository);

    res
      .status(201)
      .json({ id: serviceId, message: "Service successfully created" });
    return;
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    return;
  }
};

export const updateService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await updateServiceUseCase(req.params.id, req.body, serviceRepository);

    res.status(200).json({ message: "Service successfully updated" });
    return;
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    return;
  }
};

export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteServiceUseCase(req.params.id, serviceRepository);

    res.status(200).json({ message: "Service successfully deleted" });
    return;
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    return;
  }
};
