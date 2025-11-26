import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/courseController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getAllCourses));
router.get("/:id", asyncHandler(getCourseById));
router.post("/", asyncHandler(createCourse));
router.put("/:id", asyncHandler(updateCourse));
router.delete("/:id", asyncHandler(deleteCourse));

export default router;
