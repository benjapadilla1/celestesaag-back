import { Turn } from "src/entities/types/firebaseTypes";
import { TurnRepository } from "../../repositories/turnRepository";

export const getTurnsUseCase = async (
  userId: string,
  repository: TurnRepository
): Promise<Turn[]> => {
  if (!userId) {
    throw new Error("A user id is required.");
  }

  return await repository.getTurns(userId);
};
