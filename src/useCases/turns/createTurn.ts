import { Turn } from "src/entities/types/firebaseTypes";
import { TurnRepository } from "../../repositories/turnRepository";

export const createTurnUseCase = async (
  turnData: Turn,
  repository: TurnRepository
): Promise<string> => {
  if (
    !turnData.userId ||
    !turnData.serviceId ||
    !turnData.date ||
    !turnData.hour
  ) {
    throw new Error("All fields are required.");
  }

  return await repository.createTurn(turnData);
};
