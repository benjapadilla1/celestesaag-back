import { Router } from "express";
import { getAvailableHours } from "src/controllers/availableHoursController";

const router = Router();

router.get("/", getAvailableHours);

export default router;
