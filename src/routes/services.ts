import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../controllers/serviceController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getAllServices));
router.get("/:id", asyncHandler(getServiceById));
router.post("/", asyncHandler(createService));
router.put("/:id", asyncHandler(updateService));
router.delete("/:id", asyncHandler(deleteService));

export default router;
