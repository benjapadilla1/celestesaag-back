import { CourseRepository } from "../../repositories/courseRepository";

export const getCoursesUseCase = async (courseRepository: CourseRepository) => {
  return await courseRepository.getAllCourses();
};
