import { Request, Response } from "express";
import { getAvailableHoursUseCase } from "src/useCases/hours/getAllHours";

export const getAvailableHours = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await getAvailableHoursUseCase();

    res.status(200).json(courses);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error getting hours", error });
    return;
  }
};