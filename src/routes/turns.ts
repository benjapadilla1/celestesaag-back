import { Router } from "express";
import { createTurn, getUserTurns, updateTurn } from "../controllers/turnController";

const router = Router();

router.get("/:userId", getUserTurns);

router.post("/", createTurn);

router.put("/:id", updateTurn);

export default router;
