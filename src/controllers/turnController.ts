import { Request, Response } from "express";
import { turnRepository } from "../repositories/turnRepository";
import { createTurnUseCase } from "../useCases/turns/createTurn";
import { getTurnsUseCase } from "../useCases/turns/getUserTurns";
import { updateTurnUseCase } from "../useCases/turns/updateTurn";

export const getUserTurns = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const turns = await getTurnsUseCase(userId, turnRepository);
    res.status(200).json(turns);
    return
  } catch (error) {
    res.status(500).json({ message: "Error getting turns", error });
    return
  }
};

export const createTurn = async (req: Request, res: Response): Promise<void> => {
  try {
    const turnId = await createTurnUseCase(req.body, turnRepository);
    res
      .status(201)
      .json({ id: turnId, message: "Turn was successfully created" });
      return
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    return
  }
};

export const updateTurn = async (req: Request, res: Response): Promise<void> => {
  try {
    await updateTurnUseCase(req.params.id, req.body, turnRepository);
    res.status(200).json({ message: "Turn was successfully updated" });
    return
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    return
  }
};
