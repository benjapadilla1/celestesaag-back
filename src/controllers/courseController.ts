import { Request, Response } from "express";
import { courseRepository } from "../repositories/courseRepository";
import { createCourseUseCase } from "../useCases/courses/createCourse";
import { deleteCourseUseCase } from "../useCases/courses/deleteCourse";
import { getCourseByIdUseCase } from "../useCases/courses/getCourseById";
import { getCoursesUseCase } from "../useCases/courses/getCourses";
import { updateCourseUseCase } from "../useCases/courses/updateCourse";

export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📚 Getting all courses...");
    const courses = await getCoursesUseCase(courseRepository);
    console.log(`📚 Found ${courses.length} courses`);

    res.status(200).json(courses);
    return;
  } catch (error) {
    console.error("❌ Error getting courses:", error);
    res
      .status(500)
      .json({
        message: "Error getting courses",
        error: error instanceof Error ? error.message : String(error),
      });

    return;
  }
};

export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = await getCourseByIdUseCase(req.params.id, courseRepository);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.status(200).json(course);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error getting course", error });
    return;
  }
};

export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceId = await createCourseUseCase(req.body, courseRepository);

    res
      .status(201)
      .json({ id: serviceId, message: "Course successfully created" });
    return;
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await updateCourseUseCase(req.params.id, req.body, courseRepository);

    res.status(200).json({ message: "Course successfully updated" });
    return;
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteCourseUseCase(req.params.id, courseRepository);

    res.status(200).json({ message: "Course successfully deleted" });
    return;
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
