import { Router } from "express";
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../controllers/serviceController";

const router = Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
