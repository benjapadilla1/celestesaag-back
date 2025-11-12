import { Turn } from "src/entities/types/firebaseTypes";
import { TurnRepository } from "../../repositories/turnRepository";

export const updateTurnUseCase = async (
  id: string,
  turnData: Partial<Turn>,
  repository: TurnRepository
): Promise<void> => {
  if (
    !turnData.userId &&
    !turnData.serviceId &&
    !turnData.date &&
    !turnData.hour
  ) {
    throw new Error("At least one field is required to update a turn.");
  }

  await repository.updateTurn(id, turnData);
};
