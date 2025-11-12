import { Course } from "src/entities/types/firebaseTypes";
import { CourseRepository } from "../../repositories/courseRepository";

export const createCourseUseCase = async (
  courseData: Course,
  repository: CourseRepository
): Promise<string> => {
  // if (!courseData.price || !courseData.name) {
  //   throw new Error("All fields are required.");
  // }

  return await repository.createCourse(courseData);
};
