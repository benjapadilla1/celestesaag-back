import { Course } from "src/entities/types/firebaseTypes";
import { CourseRepository } from "../../repositories/courseRepository";

export const updateCourseUseCase = async (
  id: string,
  serviceData: Partial<Course>,
  repository: CourseRepository
) => {
  return await repository.updateCourse(id, serviceData);
};
