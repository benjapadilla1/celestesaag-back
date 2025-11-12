import { getAvailableHours } from "src/repositories/availableHoursRepository";

export const getAvailableHoursUseCase = async () => {
  return await getAvailableHours();
};
